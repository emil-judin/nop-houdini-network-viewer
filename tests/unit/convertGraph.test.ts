import { describe, expect, it } from 'vitest';
import mergeOutOfOrder from '../../fixtures/edge-cases/merge-out-of-order.json';
import idCollisions from '../../fixtures/edge-cases/id-collisions.json';
import {
  BOX_ID_PREFIX,
  DOT_ID_PREFIX,
  HOUDINI_UNIT_TO_PX,
  SUBNET_INPUT_ID_PREFIX,
  convertGraphToReactFlow,
  houdiniRgbTitleColor,
  houdiniRgbToCss,
  normalizeNetworkDocument,
  type HoudiniOutsideStubsFlowNodeData,
  type HoudiniWireFlowEdgeData,
} from '../../src/schema/converter';
import { graph, node, wire } from './networkFixtures';

/** One output label per output, like an export. */
const labels = (count: number) => Array.from({ length: count }, (_, index) => `Output ${index + 1}`);

const byId = (nodes: ReturnType<typeof convertGraphToReactFlow>['nodes'], id: string) => nodes.find((n) => n.id === id);

describe('convertGraphToReactFlow: coordinates', () => {
  it('uses 100 pixels per network unit', () => {
    expect(HOUDINI_UNIT_TO_PX).toBe(100);
  });

  it('NOP-CONV-010: operator nodes invert Y and use the 100 x 30 node box', () => {
    const { nodes } = convertGraphToReactFlow(graph({ nodes: [node({ name: 'box1', pos: [1, 2] })] }));
    const box = byId(nodes, 'box1');
    expect(box?.position.x).toBe(100);
    expect(box?.position.y).toBeCloseTo(-230, 9);
    expect([box?.initialWidth, box?.initialHeight]).toEqual([100, 30]);
    expect(box?.selectable).toBe(true);
    expect(box?.draggable).toBe(false);
    expect(box?.zIndex).toBe(10);
  });

  it('NOP-CONV-011: routing dots are centered on their position', () => {
    const { nodes } = convertGraphToReactFlow(graph({ dots: [{ name: '__dot1', pos: [2, -1] }] }));
    const dot = byId(nodes, `${DOT_ID_PREFIX}__dot1`);
    expect(dot?.position).toEqual({ x: 190.5, y: 90.5 });
    expect([dot?.initialWidth, dot?.initialHeight]).toEqual([19, 19]);
    expect(dot?.selectable).toBe(false);
    expect(dot?.zIndex).toBe(12);
  });

  it('NOP-CONV-012: an expanded network box draws its 29px header above its body', () => {
    const { nodes } = convertGraphToReactFlow(
      graph({ boxes: [{ name: 'b', comment: '', pos: [0, 0], size: [3, 2], color: [0.5, 0.5, 0.5] }] }),
    );
    const box = byId(nodes, `${BOX_ID_PREFIX}b`);
    expect(box?.position).toEqual({ x: 0, y: -229 });
    expect([box?.initialWidth, box?.initialHeight]).toEqual([300, 229]);
    expect(box?.selectable).toBe(false);
    expect(box?.zIndex).toBe(-20);
  });

  it('NOP-CONV-013: a minimized network box is only its header and hides its items', () => {
    const { nodes, edges } = convertGraphToReactFlow(
      graph({
        nodes: [node({ name: 'a' }), node({ name: 'b', pos: [0, -1] })],
        dots: [{ name: '__dot1', pos: [1, 0] }],
        boxes: [{ name: 'box', comment: '', pos: [0, 0], size: [2, 0], color: [0.5, 0.5, 0.5], minimized: true, items: ['a', '__dot1'] }],
        wires: [wire('a', 'b'), wire('__dot1', 'b')],
      }),
    );
    const box = byId(nodes, `${BOX_ID_PREFIX}box`);
    expect(box?.initialHeight).toBe(29);
    expect(box?.position.y).toBe(-29);
    expect(byId(nodes, 'a')).toBeUndefined();
    expect(byId(nodes, `${DOT_ID_PREFIX}__dot1`)).toBeUndefined();
    expect(byId(nodes, 'b')).toBeDefined();
    expect(edges).toEqual([]);
  });

  it('NOP-CONV-014: network box and sticky note minimum sizes', () => {
    const { nodes } = convertGraphToReactFlow(
      graph({
        boxes: [{ name: 'b', comment: '', pos: [0, 0], size: [0.1, 0.1], color: [0.5, 0.5, 0.5] }],
        stickies: [{ name: 's', text: '', pos: [0, 0], size: [0.1, 0.1], color: [1, 1, 0.6] }],
      }),
    );
    const box = byId(nodes, `${BOX_ID_PREFIX}b`);
    expect(box?.initialWidth).toBe(80);
    expect(box?.initialHeight).toBe(29 + 40);
    const sticky = byId(nodes, 'sticky:s');
    expect([sticky?.initialWidth, sticky?.initialHeight]).toEqual([90, 40]);
  });

  it('NOP-CONV-015: a minimized sticky note is a 22px header', () => {
    const { nodes } = convertGraphToReactFlow(
      graph({ stickies: [{ name: 's', text: '', pos: [1, 1], size: [2, 1], color: [1, 1, 0.6], minimized: true }] }),
    );
    const sticky = byId(nodes, 'sticky:s');
    expect(sticky?.initialHeight).toBe(22);
    expect(sticky?.position.y).toBe(-122);
    expect(sticky?.zIndex).toBe(-10);
  });

  it('NOP-CONV-016: subnet inputs become synthetic nodes', () => {
    const { nodes } = convertGraphToReactFlow(graph({ subnetInputs: [{ name: '1', num: 0, pos: [0, 1] }] }));
    const input = byId(nodes, `${SUBNET_INPUT_ID_PREFIX}1`);
    expect(input?.type).toBe('houdiniSubnetInput');
    expect(input?.position).toEqual({ x: 0, y: -130 });
    expect([input?.initialWidth, input?.initialHeight]).toEqual([100, 30]);
    expect(input?.zIndex).toBe(5);
  });

  it('A-01: only operator nodes are focusable, labelled, in top-to-bottom order', () => {
    const { nodes } = convertGraphToReactFlow(
      graph({
        nodes: [
          node({ name: 'low', pos: [0, -2] }),
          node({ name: 'top_right', pos: [3, 1] }),
          node({ name: 'top_left', pos: [0, 1], label: 'Merge', type: 'merge' }),
        ],
        dots: [{ name: 'd', pos: [0, 0] }],
      }),
    );
    const operators = nodes.filter((n) => n.type === 'houdiniSop');
    expect(operators.map((n) => n.id)).toEqual(['top_left', 'top_right', 'low']);
    expect(operators.every((n) => n.focusable === true)).toBe(true);
    expect(operators[0].ariaLabel).toBe('Merge node top_left');
    expect(nodes.filter((n) => n.type !== 'houdiniSop').every((n) => n.focusable === false)).toBe(true);
  });
});

describe('convertGraphToReactFlow: wires', () => {
  it('NOP-CONV-020: a wire from a subnet input is rewired to the synthetic node', () => {
    const { edges } = convertGraphToReactFlow(
      graph({ nodes: [node({ name: 'xform1' })], subnetInputs: [{ name: '1', num: 0, pos: [0, 1] }], wires: [wire('1', 'xform1')] }),
    );
    expect(edges[0].source).toBe(`${SUBNET_INPUT_ID_PREFIX}1`);
    expect(edges[0].sourceHandle).toBe('out-0');
  });

  it('NOP-CONV-021: input and output indexes are clamped to existing connectors', () => {
    const { edges } = convertGraphToReactFlow(
      graph({ nodes: [node({ name: 'a', maxOutputs: 1 }), node({ name: 'b', maxInputs: 2 })], wires: [wire('a', 'b', 3, 5)] }),
    );
    expect([edges[0].sourceHandle, edges[0].targetHandle]).toEqual(['out-0', 'in-1']);
  });

  it('NOP-NODE-022: wires from outputs 5 to 10 of an asset keep their own connector', () => {
    const level = graph({
      nodes: [
        node({ name: 'asset', maxOutputs: 10, outputLabels: labels(10) }),
        node({ name: 'damaged', maxOutputs: 12, outputLabels: labels(12) }),
        node({ name: 'b' }),
        node({ name: 'c' }),
        node({ name: 'd' }),
      ],
      wires: [wire('asset', 'b', 4), wire('asset', 'c', 9), wire('damaged', 'd', 11)],
    });
    // A damaged file with more than 10 outputs ends at the last drawn connector
    expect(convertGraphToReactFlow(level).edges.map((edge) => edge.sourceHandle)).toEqual(['out-4', 'out-9', 'out-9']);
  });

  it('NOP-NODE-022: an older subnet export (maxOutputs 11, one output label) wires from its one output', () => {
    const level = graph({
      nodes: [node({ name: 'details', type: 'subnet', maxOutputs: 11, outputLabels: ['Output 1'] }), node({ name: 'b' })],
      wires: [wire('details', 'b', 0)],
    });
    expect(convertGraphToReactFlow(level).edges.map((edge) => edge.sourceHandle)).toEqual(['out-0']);
  });

  it('NOP-CONV-022: wires between dots use the single dot handles', () => {
    const { edges } = convertGraphToReactFlow(
      graph({ dots: [{ name: '__dot1', pos: [0, 0] }, { name: '__dot2', pos: [0, -1] }], wires: [wire('__dot1', '__dot2')] }),
    );
    expect([edges[0].sourceHandle, edges[0].targetHandle]).toEqual(['out-0', 'in-0']);
    const data = edges[0].data as HoudiniWireFlowEdgeData;
    expect([data.sourceIsDot, data.targetIsDot]).toEqual([true, true]);
  });

  it.each([
    [1, ['in-multi-7']],
    [2, ['in-multi-3', 'in-multi-12']],
    [3, ['in-multi-3', 'in-multi-8', 'in-multi-12']],
  ])('NOP-CONV-023: %i wires into a multi-input node fan out across the bar', (count, handles) => {
    const sources = Array.from({ length: count }, (_, i) => node({ name: `s${i}`, pos: [i, 1] }));
    const { edges } = convertGraphToReactFlow(
      graph({
        nodes: [...sources, node({ name: 'merge1', type: 'merge', maxInputs: 9999 })],
        wires: sources.map((s, i) => wire(s.name, 'merge1', 0, i)),
      }),
    );
    expect(edges.map((e) => e.targetHandle)).toEqual(handles);
  });

  it('NOP-CONV-024: nodes with at most 4 inputs keep discrete connectors', () => {
    const { edges } = convertGraphToReactFlow(
      graph({ nodes: [node({ name: 'a' }), node({ name: 'wrangle1', maxInputs: 4 })], wires: [wire('a', 'wrangle1', 0, 3)] }),
    );
    expect(edges[0].targetHandle).toBe('in-3');
  });

  it('NOP-CONV-025: multi-input fan-out follows the input order, not the file order', () => {
    const doc = normalizeNetworkDocument(mergeOutOfOrder);
    const { edges } = convertGraphToReactFlow(doc.root);
    const handleOf = (source: string) => edges.find((e) => e.source === source)?.targetHandle;
    // src0 goes into input 0 (leftmost), src3 into input 3 (rightmost)
    expect(handleOf('src0')).toBe('in-multi-3');
    expect(handleOf('src1')).toBe('in-multi-6');
    expect(handleOf('src2')).toBe('in-multi-9');
    expect(handleOf('src3')).toBe('in-multi-12');
  });

  it('NOP-CONV-032: wires to items outside the selection become stubs toward those items, not edges', () => {
    const level = graph({
      nodes: [node({ name: 'noise1', pos: [0, 0] }), node({ name: 'copy1', type: 'copytopoints', maxInputs: 2, pos: [0, -1] })],
      dots: [{ name: '__dot1', pos: [0, -3] }],
      wires: [wire('noise1', 'copy1', 0, 0)],
      outsideWires: [
        { to: 'noise1', toInput: 0, pos: [-2, 1] },
        // Into the target points input of Copy to Points: dotted, like the real wire would be
        { to: 'copy1', toInput: 1, pos: [3, 0.5], dot: true },
        { from: 'copy1', fromOutput: 0, pos: [-1, -2], type: 'merge', input: 0 },
        // Into the target points input of a Copy to Points outside: dotted too
        { from: 'copy1', fromOutput: 0, pos: [1, -2], type: 'copytopoints::2.0', input: 1 },
        { to: '__dot1', toInput: 0 },
        { from: '__dot1', fromOutput: 0, pos: [2, -4] },
      ],
    });
    const { nodes, edges } = convertGraphToReactFlow(level, undefined, undefined, 'medium', 'rounded');
    expect(edges).toHaveLength(1);
    const stubs = (id: string) => byId(nodes, `stubs:${id}`)?.data as unknown as HoudiniOutsideStubsFlowNodeData | undefined;
    // The far end is the outside item's output (a node's bottom middle, a dot's center) or input (a node's top middle)
    expect(stubs('noise1')).toEqual({
      item: 'noise1',
      itemIsDot: false,
      wireStyle: 'rounded',
      stubs: [{ handle: 'in-0', direction: 'in', far: { x: -150, y: -91.5 }, farIsDot: false, dotted: false }],
    });
    // One stub per wire: two outside nodes fed from the same output get two stubs
    expect(stubs('copy1')?.stubs).toEqual([
      { handle: 'in-1', direction: 'in', far: { x: 300, y: -50 }, farIsDot: true, dotted: true },
      { handle: 'out-0', direction: 'out', far: { x: -50, y: 161.5 }, farIsDot: false, dotted: false },
      { handle: 'out-0', direction: 'out', far: { x: 150, y: 161.5 }, farIsDot: false, dotted: true },
    ]);
    // Without a position (older files) the stub has no far end and runs straight
    expect(stubs(`${DOT_ID_PREFIX}__dot1`)?.stubs).toEqual([
      { handle: 'in-0', direction: 'in', far: undefined, farIsDot: false, dotted: false },
      { handle: 'out-0', direction: 'out', far: { x: 250, y: 361.5 }, farIsDot: false, dotted: false },
    ]);
    expect(stubs(`${DOT_ID_PREFIX}__dot1`)?.item).toBe(`${DOT_ID_PREFIX}__dot1`);
    expect(byId(nodes, 'copy1')?.ariaLabel).toMatch(/wired to nodes outside this export$/);
    // The stubs node frames the item and its stubs on every side, for Fit, under the wires and taking no clicks
    const box = byId(nodes, 'stubs:noise1');
    expect(box?.position.x).toBeCloseTo(-50.5, 9);
    expect(box?.width).toBeCloseTo(100 + 2 * 50.5, 9);
    expect(box?.height).toBeCloseTo(30 + 2 * 50.5, 9);
    expect(box).toMatchObject({ type: 'houdiniOutsideStubs', zIndex: 3, selectable: false, focusable: false, style: { pointerEvents: 'none' } });
    expect(byId(nodes, 'stubs:merge1')).toBeUndefined();
  });

  it('NOP-CONV-033: inputs wired from outside take their place in the multi-input fan-out', () => {
    const { nodes, edges } = convertGraphToReactFlow(
      graph({
        nodes: [node({ name: 'a' }), node({ name: 'merge1', type: 'merge', maxInputs: 9999 })],
        wires: [wire('a', 'merge1', 0, 1)],
        outsideWires: [
          { to: 'merge1', toInput: 0 },
          { to: 'merge1', toInput: 2 },
        ],
      }),
    );
    expect(edges[0].targetHandle).toBe('in-multi-8');
    const data = byId(nodes, 'stubs:merge1')?.data as unknown as HoudiniOutsideStubsFlowNodeData;
    expect(data.stubs.map((stub) => stub.handle)).toEqual(['in-multi-3', 'in-multi-12']);
  });

  it('NOP-CONV-026: the chosen wire style is passed to every edge', () => {
    const { edges } = convertGraphToReactFlow(
      graph({ nodes: [node({ name: 'a' }), node({ name: 'b' }), node({ name: 'c' })], wires: [wire('a', 'b'), wire('b', 'c'), wire('a', 'c')] }),
      undefined,
      undefined,
      'medium',
      'rounded',
    );
    expect(edges).toHaveLength(3);
    for (const edge of edges) {
      expect(edge.type).toBe('houdiniWire');
      expect(edge.zIndex).toBe(4);
      expect((edge.data as HoudiniWireFlowEdgeData).wireStyle).toBe('rounded');
    }
  });

  it('NOP-CONV-027: items of different kinds may share a name', () => {
    const doc = normalizeNetworkDocument(idCollisions);
    const { nodes, edges } = convertGraphToReactFlow(doc.root);
    const ids = nodes.map((n) => n.id);
    expect(ids).toEqual(expect.arrayContaining(['__dot1', '__netbox1', `${DOT_ID_PREFIX}__dot1`, `${BOX_ID_PREFIX}__netbox1`]));
    expect(new Set(ids).size).toBe(ids.length);
    // The wire names "__dot1": an operator node of that name wins over the dot
    expect(edges[0].source).toBe('__dot1');
  });

  it('skips wires to items that are not in the export', () => {
    const { edges } = convertGraphToReactFlow(graph({ nodes: [node({ name: 'a' })], wires: [wire('a', 'missing')] }));
    expect(edges).toEqual([]);
  });

  it('NOP-NODE-023: a wire out of a node without outputs (a broken file) is skipped', () => {
    const level = graph({
      nodes: [node({ name: 'rop', maxOutputs: 0, outputLabels: [] }), node({ name: 'b' })],
      wires: [wire('rop', 'b')],
    });
    expect(convertGraphToReactFlow(level).edges).toEqual([]);
  });

  it('NOP-CONV-006:an icon named "constructor" does not read Object.prototype', () => {
    const { nodes } = convertGraphToReactFlow(graph({ nodes: [node({ name: 'n', icon: 'constructor' })] }), {});
    expect((nodes[0].data as { iconSvg?: unknown }).iconSvg).toBeUndefined();
  });
});

describe('houdiniRgbToCss', () => {
  it.each([
    [[0.8, 0.8, 0.8], 'rgb(204, 204, 204)'],
    [[1.5, -1, 0.5], 'rgb(255, 0, 128)'],
    [undefined, 'rgb(204, 204, 204)'],
    [[0.5, 0.5], 'rgb(204, 204, 204)'],
  ])('NOP-CONV-030: %j is %s', (rgb, css) => {
    expect(houdiniRgbToCss(rgb as [number, number, number] | undefined)).toBe(css);
  });
});

describe('houdiniRgbTitleColor', () => {
  it.each([
    // Houdini's default grey box header (0.52 darkened to 86%) keeps its black title
    [[0.447, 0.447, 0.447], '#000000'],
    [[0.9, 0.85, 0.3], '#000000'],
    // A dark blue header: black would have only about 2.4:1 contrast
    [[0.215, 0.301, 0.43], '#f0f0f0'],
    [[0.1, 0.1, 0.1], '#f0f0f0'],
  ] as const)('NOP-CONV-031: a header in %j gets a %s title', (rgb, text) => {
    expect(houdiniRgbTitleColor([...rgb])).toBe(text);
  });
});
