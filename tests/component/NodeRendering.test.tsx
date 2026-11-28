// @vitest-environment jsdom
import { render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { resolveOperatorIcon } from '../../src/components/nodes/icons/iconRegistry';
import { OperatorIconGlyph } from '../../src/components/nodes/icons/OperatorSvgIcon';
import { LABEL_SIZE_STYLES } from '../../src/components/nodes/labelSizeStyles';
import { getNodeShapeDef, pointsToSvgPath } from '../../src/components/nodes/shapes/nodeShapes';
import { BOX_ID_PREFIX, DOT_ID_PREFIX, STICKY_ID_PREFIX, SUBNET_INPUT_ID_PREFIX } from '../../src/schema/convertGraph';
import { houdiniRgbScaledToCss, houdiniRgbToCss, houdiniRgbToRgbaCss } from '../../src/schema/converter';
import type { HoudiniNetworkDocument, HoudiniNodeData } from '../../src/schema/types';
import { graph, node } from '../unit/networkFixtures';
import { documentOf, nodeElement } from './inspectorHelpers';
import { renderNetwork } from './viewerHelpers';

afterEach(() => {
  document.body.innerHTML = '';
});

/** Renders one operator node and returns its element. */
async function renderNode(overrides: Partial<HoudiniNodeData> & { name: string }, doc: Partial<HoudiniNetworkDocument> = {}) {
  await renderNetwork({ ...documentOf([node(overrides)]), ...doc });
  return drawing(overrides.name);
}

/** The node drawing inside React Flow's wrapper element. */
const drawing = (name: string) => nodeElement(name)?.firstElementChild as HTMLElement;

/** Outline of the node body: the border path drawn last in the body SVG. */
const bodyOutline = (element: HTMLElement) =>
  [...element.querySelectorAll(':scope > svg > path')].at(-1)?.getAttribute('d');

/** Fill colors of the flag slots that are filled. */
const flagFills = (element: HTMLElement) =>
  [...element.querySelectorAll('g[clip-path] path')].map((path) => path.getAttribute('fill')).filter((fill) => fill !== 'none');

/** The floating label column right of the body. */
const labelColumn = (element: HTMLElement) => element.querySelector<HTMLElement>(':scope > div.absolute.top-1\\/2') as HTMLElement;

const item = (id: string) => document.querySelector<HTMLElement>(`.react-flow__node[data-id="${id}"] > div, .react-flow__node[data-id="${id}"] > svg`) as HTMLElement;

describe('operator nodes', () => {
  it.each([
    ['', 'rect'],
    ['rect', 'rect'],
    ['wave', 'wave'],
    ['cigar', 'cigar'],
    ['chevron_down', 'chevron_down'],
    ['unknownshape', 'rect'],
  ])('NOP-NODE-001: shape "%s" draws the "%s" outline', async (shape, expected) => {
    const element = await renderNode({ name: 'n1', shape });
    expect(bodyOutline(element)).toBe(pointsToSvgPath(getNodeShapeDef(expected).outline, true));
  });

  it('NOP-NODE-002: a custom shape from the document is used when it has an outline', async () => {
    const outline = [
      [0, 0],
      [1, 0],
      [0.9, 0.3],
      [0.1, 0.3],
    ];
    const element = await renderNode({ name: 'n1', shape: 'myshape' }, { customShapes: { myshape: { outline } } });
    expect(bodyOutline(element)).toBe(pointsToSvgPath(outline as Array<[number, number]>, true));
  });

  it('NOP-NODE-013: an exported custom shape draws its flag slots, divider lines and icon box', async () => {
    type Point = [number, number];
    const hexagon = {
      name: 'studio_hexagon',
      outline: [[0, 0.15], [0.08, 0.3], [0.92, 0.3], [1, 0.15], [0.92, 0], [0.08, 0]] as Point[],
      flags: {
        '0': { outline: [[0.08, 0], [0, 0.15], [0.08, 0.3], [0.15, 0.3], [0.12, 0]] as Point[], edge: [[0.15, 0.3], [0.12, 0]] as Point[] },
        '3': { outline: [[0.88, 0], [0.85, 0.3], [0.92, 0.3], [1, 0.15], [0.92, 0]] as Point[], edge: [[0.88, 0], [0.85, 0.3]] as Point[] },
      },
      inputs: [[0.5, 0.385, 90]],
      outputs: [[0.5, -0.085, 270]],
      icon: [[0.4, 0.04], [0.6, 0.26]] as Point[],
    };
    const flags = { bypass: true, display: true, render: false, template: false, lock: false };
    const element = await renderNode({ name: 'n1', shape: 'studio_hexagon', icon: 'SOP_box', flags }, { customShapes: { studio_hexagon: hexagon } });
    expect(bodyOutline(element)).toBe(pointsToSvgPath(hexagon.outline, true));
    const filled = [...element.querySelectorAll('g[clip-path] path')].filter((path) => path.getAttribute('fill') !== 'none');
    expect(filled.map((path) => [path.getAttribute('d'), path.getAttribute('fill')])).toEqual([
      [pointsToSvgPath(hexagon.flags['0'].outline, true), '#ead02a'],
      [pointsToSvgPath(hexagon.flags['3'].outline, true), '#3098e5'],
    ]);
    const paths = [...element.querySelectorAll('path')].map((path) => path.getAttribute('d'));
    expect(paths).toContain(pointsToSvgPath(hexagon.flags['0'].edge, false));
    expect(paths).toContain(pointsToSvgPath(hexagon.flags['3'].edge, false));
    const iconBox = element.querySelector('svg[viewBox="0 0 24 24"]')?.parentElement as HTMLElement;
    expect(iconBox.style.left).toBe('40px');
    expect(Number.parseFloat(iconBox.style.width)).toBeCloseTo(20);
  });

  it.each([
    ['bypass', '#ead02a'],
    ['lock', '#d94040'],
    ['softLock', '#d94040'],
    ['template', '#d45ca8'],
    ['selectableTemplate', '#d45ca8'],
    ['display', '#3098e5'],
    ['render', '#3098e5'],
  ])('NOP-NODE-003: the %s flag fills its slot in %s, clipped to the body', async (flag, color) => {
    const flags = { bypass: false, display: false, render: false, template: false, lock: false, [flag]: true };
    const element = await renderNode({ name: 'n1', flags });
    expect(flagFills(element)).toEqual([color]);
    const clip = element.querySelector('g[clip-path]')?.getAttribute('clip-path');
    expect(clip).toMatch(/^url\(#nop-node-body-/);
  });

  it('NOP-NODE-004: a bypassed node is faded but opaque, with a grey name, dim icon and darker connectors', async () => {
    const flags = { bypass: true, display: false, render: false, template: false, lock: false };
    const element = await renderNode({ name: 'n1', flags, color: [0.8, 0.8, 0.8] });
    const canvas = 0x24 / 255;
    const blended = canvas + (0.8 - canvas) * 0.16;
    const fill = element.querySelector(':scope > svg > path')?.getAttribute('fill');
    expect(fill).toBe(houdiniRgbToCss([blended, blended, blended]));
    expect(element.querySelector('[class*="text-[#727272]"]')?.textContent).toBe('n1');
    expect(element.querySelector('.opacity-65')).not.toBeNull();
    const connector = element.querySelector<HTMLElement>('.react-flow__handle.source') as HTMLElement;
    expect(connector.style.backgroundColor).toBe('rgb(86, 86, 86)');
  });

  it('NOP-NODE-005: a selected node gets the yellow outline band and a darker border', async () => {
    const element = await renderNode({ name: 'n1' });
    expect(element.querySelector('[stroke="#ffd400"]')).toBeNull();
    (nodeElement('n1') as HTMLElement).click();
    await waitFor(() => expect(drawing('n1').querySelector('[stroke="#ffd400"]')).not.toBeNull());
    expect([...drawing('n1').querySelectorAll(':scope > svg > path')].at(-1)?.getAttribute('stroke')).toBe('#0a0a0a');
  });

  it('NOP-NODE-006: the name floats 9 pixels right of the body', async () => {
    const element = await renderNode({ name: 'box1', type: 'box', label: 'Box' });
    const labels = labelColumn(element);
    expect(labels.style.left).toBe('109px');
    expect(labels.textContent).toBe('box1');
  });

  it('NOP-NODE-006: "transform1" of type "xform" shows no type label', async () => {
    // Houdini names new `xform` nodes `transform1`, so the name is still the default one
    const element = await renderNode({ name: 'transform1', type: 'xform', label: 'Transform' });
    expect(labelColumn(element).textContent).toBe('transform1');
  });

  it.each([
    ['assign_ram_to_prims', 'attribwrangle', 'Attribute Wrangle', true],
    ['attribwrangle2', 'attribwrangle', 'Attribute Wrangle', false],
    ['lot_subdivision1', 'labs::lot_subdivision::2.0', 'Labs Lot Subdivision', false],
    ['this_is_a_test', 'xform', 'Transform', true],
    ['group1', 'groupcreate', 'Group Create', false],
    ['copy1', 'copyxform', 'Copy and Transform', false],
    // Houdini shows the label above the names the For-Each tools give (`foreach_begin1`, not `block_begin1`)
    ['foreach_begin1', 'block_begin', 'Block Begin', true],
  ])('NOP-NODE-007: %s of type %s shows its type label: %s', async (name, type, label, shown) => {
    const element = await renderNode({ name, type, label });
    expect(labelColumn(element).textContent?.includes(label)).toBe(shown);
  });

  it.each([
    ['emjud::rounded_brick::1.0', 'locked', 'Locked digital asset'],
    ['emjud::pebble_scatter::1.0', 'unlocked', 'Unlocked digital asset (editable)'],
    ['box', null, null],
    ['attribwrangle', 'locked', 'Locked digital asset'],
    ['box', undefined, null],
  ] as const)('NOP-NODE-008: type %s with hdaState %s shows the badge %s', async (type, hdaState, badge) => {
    const overrides: Partial<HoudiniNodeData> & { name: string } = { name: 'n1', type };
    if (hdaState !== undefined) overrides.hdaState = hdaState;
    const element = await renderNode(overrides);
    const titles = [...labelColumn(element).querySelectorAll('svg title')].map((title) => title.textContent);
    expect(titles).toEqual(badge ? [badge] : []);
  });

  it.each(['labs::thicken::1.0', 'copytopoints::2.0'])(
    'NOP-NODE-008: an older export without hdaState shows no padlock for %s',
    async (type) => {
      const element = await renderNode({ name: 'n1', type });
      expect(labelColumn(element).querySelectorAll('svg title')).toHaveLength(0);
    },
  );

  it('NOP-NODE-009: a navigable subnetwork shows the subnet badge', async () => {
    const element = await renderNode({
      name: 'subnet1',
      type: 'subnet',
      isSubnetwork: true,
      children: graph({ path: '/obj/geo1/subnet1', nodes: [node({ name: 'inner' })] }),
    });
    const titles = [...labelColumn(element).querySelectorAll('svg title')].map((title) => title.textContent);
    expect(titles).toEqual(['Subnetwork: double-click to dive in']);
  });

  it('NOP-NODE-010: a visible comment is shown under the name, truncated at 240 pixels', async () => {
    const element = await renderNode({ name: 'n1', comment: 'cache here', showComment: true });
    const comment = [...labelColumn(element).querySelectorAll('span')].find((span) => span.textContent === 'cache here');
    expect(comment?.className).toContain('max-w-[240px]');
    expect(comment?.className).toContain('truncate');
  });

  it('NOP-NODE-012: a comment with showComment false is not shown on the canvas', async () => {
    const element = await renderNode({ name: 'n1', comment: 'cache here', showComment: false });
    expect(labelColumn(element).textContent).not.toContain('cache here');
  });

  it.each([
    ['small', '14.5px', '11px'],
    ['medium', '17px', '12.5px'],
    ['large', '20px', '14px'],
  ] as const)('NOP-NODE-011: label size %s draws names at %s and type labels at %s', async (size, name, type) => {
    expect(LABEL_SIZE_STYLES[size].nameText).toBe(`text-[${name}]`);
    expect(LABEL_SIZE_STYLES[size].typeText).toBe(`text-[${type}]`);
    await renderNetwork(documentOf([node({ name: 'renamed_wrangle', type: 'attribwrangle', label: 'Attribute Wrangle' })]), { labelSize: size });
    const spans = [...labelColumn(drawing('renamed_wrangle')).querySelectorAll('span')];
    expect(spans.find((span) => span.textContent === 'renamed_wrangle')?.className).toContain(`text-[${name}]`);
    expect(spans.find((span) => span.textContent === 'Attribute Wrangle')?.className).toContain(`text-[${type}]`);
  });
});

describe('connectors', () => {
  it.each([
    [0, 0, 0],
    [1, 1, 0],
    [4, 4, 0],
    [5, 0, 16],
    [9999, 0, 16],
  ])('NOP-NODE-020: maxInputs %i gives %i round inputs and %i hidden multi-input handles', async (maxInputs, round, multi) => {
    const element = await renderNode({ name: 'n1', maxInputs, inputLabels: [] });
    const inputs = [...element.querySelectorAll<HTMLElement>('.react-flow__handle.target')];
    expect(inputs.filter((h) => h.dataset.handleid?.startsWith('in-multi-'))).toHaveLength(multi);
    const roundInputs = inputs.filter((h) => !h.dataset.handleid?.startsWith('in-multi-'));
    expect(roundInputs).toHaveLength(round);
    expect(new Set(roundInputs.map((h) => h.style.left)).size).toBe(round);
    expect(element.querySelector(':scope > svg > g:not([clip-path])') !== null).toBe(multi > 0);
  });

  it('NOP-NODE-021: connector tooltips show the input labels, and "Output 1" without output labels', async () => {
    const element = await renderNode({ name: 'n1', inputLabels: ['Geometry to Process'], outputLabels: [] });
    expect(element.querySelector('.react-flow__handle.target')?.getAttribute('title')).toBe('Geometry to Process');
    expect(element.querySelector('.react-flow__handle.source')?.getAttribute('title')).toBe('Output 1');
  });

  it.each([
    [6, 6],
    [10, 10],
    [12, 10],
  ])('NOP-NODE-022: maxOutputs %i draws %i separate output connectors', async (maxOutputs, drawn) => {
    const outputLabels = Array.from({ length: maxOutputs }, (_, index) => `Output ${index + 1}`);
    const element = await renderNode({ name: 'n1', maxOutputs, outputLabels });
    const outputs = [...element.querySelectorAll<HTMLElement>('.react-flow__handle.source')];
    expect(outputs).toHaveLength(drawn);
    expect(new Set(outputs.map((output) => output.style.left)).size).toBe(drawn);
    // Like Houdini, the dots shrink instead of overlapping (6 outputs keep the full 10 pixels)
    const lefts = outputs.map((output) => parseFloat(output.style.left));
    const size = parseFloat(outputs[0].style.width);
    expect(size).toBe(maxOutputs === 6 ? 10 : 6);
    for (let i = 1; i < lefts.length; i++) expect(lefts[i] - lefts[i - 1]).toBeGreaterThan(size);
  });

  it('NOP-NODE-022: an older export of a subnet (maxOutputs 11, one output label) shows one output', async () => {
    const element = await renderNode({ name: 'details', type: 'subnet', maxOutputs: 11, outputLabels: ['Output 1'] });
    expect(element.querySelectorAll('.react-flow__handle.source')).toHaveLength(1);
    expect(element.querySelector<HTMLElement>('.react-flow__handle.source')?.style.width).toBe('10px');
  });

  it('NOP-NODE-022: a file without output labels keeps its maxOutputs', async () => {
    const element = await renderNode({ name: 'n1', maxOutputs: 2, outputLabels: [] });
    expect(element.querySelectorAll('.react-flow__handle.source')).toHaveLength(2);
  });

  it('NOP-NODE-023: a node without outputs (ROP Geometry Output) has no output connector', async () => {
    const element = await renderNode({ name: 'rop_geometry1', type: 'rop_geometry', maxOutputs: 0, outputLabels: [] });
    expect(element.querySelectorAll('.react-flow__handle.source')).toHaveLength(0);
    expect(element.querySelectorAll('.react-flow__handle.target')).toHaveLength(1);
  });
});

describe('icons', () => {
  it('NOP-NODE-030: a custom asset icon is an image, so no script inside it can run', async () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><script>window.hacked = true</script><path d="M0 0h1v1z"/></svg>';
    const element = await renderNode({ name: 'n1', type: 'me::tool::1.0', icon: 'opdef:/me::Sop/tool::1.0?IconSVG' }, {
      icons: { 'opdef:/me::Sop/tool::1.0?IconSVG': svg },
    });
    const image = element.querySelector('img');
    expect(image?.getAttribute('src')).toMatch(/^data:image\/svg\+xml/);
    expect(document.querySelector('script')).toBeNull();
    expect((window as unknown as { hacked?: boolean }).hacked).toBeUndefined();
  });

  it('NOP-NODE-031: a built-in operator gets the original NOP drawing, in the shape icon box', async () => {
    const def = resolveOperatorIcon('box', 'SOP_box', false);
    expect(def.id).toBe('sop.box');
    const { container } = render(<OperatorIconGlyph def={def} />);
    const drawing = [...container.querySelectorAll('path')].map((path) => path.getAttribute('d'));
    const element = await renderNode({ name: 'box1', type: 'box', icon: 'SOP_box' });
    const icon = element.querySelector('svg[viewBox="0 0 24 24"]') as SVGSVGElement;
    expect([...icon.querySelectorAll('path')].map((path) => path.getAttribute('d'))).toEqual(drawing);
    const [[minX], [maxX]] = getNodeShapeDef('rect').icon as [[number, number], [number, number]];
    const box = icon.parentElement as HTMLElement;
    expect(box.style.left).toBe(`${minX * 100}px`);
    expect(box.style.width).toBe(`${(maxX - minX) * 100}px`);
  });
});

describe('other items', () => {
  it('NOP-NODE-040: network box look, open and minimized', async () => {
    const color: [number, number, number] = [0.52, 0.52, 0.52];
    await renderNetwork(
      {
        ...documentOf([]),
        root: graph({
          nodes: [node({ name: 'n1' })],
          boxes: [
            { name: '__netbox1', comment: 'LOOP', pos: [0, 0], size: [3, 2], color, minimized: false, items: ['n1'] },
            { name: '__netbox2', comment: 'MIN', pos: [5, 0], size: [3, 0], color, minimized: true, items: [] },
          ],
        }),
      },
      {},
      'n1',
    );
    const open = item(`${BOX_ID_PREFIX}__netbox1`);
    const header = open.firstElementChild as HTMLElement;
    expect(header.style.backgroundColor).toBe(houdiniRgbScaledToCss(color, 0.86));
    expect(open.style.backgroundColor).toBe(houdiniRgbToRgbaCss(color, 0.5));
    const title = [...header.querySelectorAll('span')].find((span) => span.textContent === 'LOOP') as HTMLElement;
    expect(title.className).toContain('text-[18px]');
    expect(header.style.color).toBe('rgb(0, 0, 0)');

    const minimized = item(`${BOX_ID_PREFIX}__netbox2`);
    expect(minimized.style.backgroundColor).toBe('transparent');
    expect(minimized.querySelectorAll('span[aria-hidden="true"].bg-black')).toHaveLength(2);
  });

  it('NOP-NODE-042: sticky note look, keeping line breaks', async () => {
    const color: [number, number, number] = [1, 0.969, 0.525];
    await renderNetwork({
      ...documentOf([]),
      root: graph({
        nodes: [node({ name: 'n1' })],
        stickies: [{ name: '__stickynote1', text: 'TODO\nlater', pos: [0, 0], size: [3, 2], color, minimized: false }],
      }),
    }, {}, 'n1');
    const note = item(`${STICKY_ID_PREFIX}__stickynote1`);
    expect(note.style.backgroundColor).toBe(houdiniRgbScaledToCss(color, 0.74));
    expect((note.firstElementChild as HTMLElement).style.backgroundColor).toBe(houdiniRgbScaledToCss(color, 0.915));
    const text = note.lastElementChild as HTMLElement;
    expect(text.textContent).toBe('TODO\nlater');
    expect(text.style.color).toBe('rgb(17, 17, 17)');
    expect(text.className).toContain('text-[20px]');
    expect(text.className).toContain('whitespace-pre-wrap');
  });

  it('NOP-NODE-046: a minimized sticky note shows only its header with a plus', async () => {
    await renderNetwork({
      ...documentOf([]),
      root: graph({
        nodes: [node({ name: 'n1' })],
        stickies: [{ name: '__stickynote1', text: 'hidden text', pos: [0, 0], size: [3, 0], color: [1, 0.969, 0.525], minimized: true }],
      }),
    }, {}, 'n1');
    const note = item(`${STICKY_ID_PREFIX}__stickynote1`);
    expect(note.textContent).not.toContain('hidden text');
    expect(note.querySelectorAll('.bg-black')).toHaveLength(2);
  });

  it('NOP-NODE-043: a sticky note without background shows only its text', async () => {
    await renderNetwork({
      ...documentOf([]),
      root: graph({
        nodes: [node({ name: 'n1' })],
        stickies: [{ name: '__stickynote1', text: 'plain', pos: [0, 0], size: [3, 2], color: [1, 0.969, 0.525], drawBackground: false }],
      }),
    }, {}, 'n1');
    const note = item(`${STICKY_ID_PREFIX}__stickynote1`);
    expect(note.style.backgroundColor).toBe('transparent');
    expect(note.querySelector('[aria-hidden="true"]')).toBeNull();
    expect(note.textContent).toBe('plain');
  });

  it('NOP-NODE-044: a subnet input shows its number and the parent input name', async () => {
    await renderNetwork({
      ...documentOf([]),
      root: graph({
        nodes: [node({ name: 'n1' })],
        subnetInputs: [{ name: '1', num: 0, pos: [0, 2], inputName: 'transform1' }],
      }),
    }, {}, 'n1');
    const input = item(`${SUBNET_INPUT_ID_PREFIX}1`);
    expect(input.textContent).toContain('Sub-Network Input #1');
    expect(input.textContent).toContain('transform1');
  });

  it('NOP-NODE-045: text from the file is shown as text, never as markup', async () => {
    await renderNetwork({
      ...documentOf([]),
      root: graph({
        nodes: [node({ name: 'n1', comment: '<b>bold</b>', showComment: true })],
        stickies: [{ name: '__stickynote1', text: '<img src=x onerror=alert(1)>', pos: [0, 0], size: [3, 2], color: [1, 0.969, 0.525] }],
      }),
    }, {}, 'n1');
    const note = item(`${STICKY_ID_PREFIX}__stickynote1`);
    expect(note.textContent).toBe('<img src=x onerror=alert(1)>');
    expect(note.querySelector('img')).toBeNull();
    expect(labelColumn(drawing('n1')).querySelector('b')).toBeNull();
  });

  it('NOP-NODE-047: a dot never shows its internal name', async () => {
    await renderNetwork({
      ...documentOf([]),
      root: graph({ nodes: [node({ name: 'n1' })], dots: [{ name: '__dot1', pos: [0, -2] }] }),
    }, {}, 'n1');
    const dot = document.querySelector(`.react-flow__node[data-id="${DOT_ID_PREFIX}__dot1"]`) as HTMLElement;
    expect(dot).not.toBeNull();
    // No tooltip anywhere in the dot, and no visible text
    expect([dot, ...dot.querySelectorAll('*')].filter((element) => element.hasAttribute('title'))).toEqual([]);
    expect(dot.textContent).toBe('');
  });
});
