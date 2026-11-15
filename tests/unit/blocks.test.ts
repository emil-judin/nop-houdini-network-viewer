import { describe, expect, it } from 'vitest';
import {
  BLOCK_ID_PREFIX,
  convertGraphToReactFlow,
  isDottedWire,
  type HoudiniSopFlowNodeData,
  type HoudiniWireFlowEdgeData,
} from '../../src/schema/converter';
import { blockMethodLabel } from '../../src/schema/blockLabels';
import { findBlocks } from '../../src/schema/blockUnderlays';
import type { HoudiniNodeData } from '../../src/schema/types';
import { graph, node, wire } from './networkFixtures';

/** A string parameter tuple for tests. */
const parm = (name: string, value: string) => ({ name, label: name, val: [value], expr: [null] });

/** The For-Each Point loop of the Circuit Gen demo: begin, metadata begin, copy, end. */
function forEachPoint(endClass = 'point') {
  return graph({
    nodes: [
      node({ name: 'scatter1', pos: [0, 2] }),
      node({
        name: 'foreach_begin4',
        type: 'block_begin',
        pos: [0, 1],
        parms: [parm('method', 'piece'), parm('blockpath', '../foreach_end4')],
      }),
      node({
        name: 'foreach_begin4_metadata1',
        type: 'block_begin',
        pos: [3, 1],
        parms: [parm('method', 'metadata'), parm('blockpath', '../foreach_end4')],
      }),
      node({ name: 'copytopoints4', type: 'copytopoints::2.0', pos: [0, 0], maxInputs: 2 }),
      node({
        name: 'foreach_end4',
        type: 'block_end',
        pos: [0, -1],
        color: [0.75, 0.4, 0],
        parms: [parm('method', 'merge'), parm('class', endClass), parm('blockpath', '../foreach_begin4')],
      }),
      node({ name: 'null1', pos: [0, -2] }),
    ],
    wires: [
      wire('scatter1', 'foreach_begin4'),
      wire('foreach_begin4', 'copytopoints4', 0, 1),
      wire('copytopoints4', 'foreach_end4'),
      wire('foreach_end4', 'null1'),
    ],
  });
}

const names = (nodes: HoudiniNodeData[]) => nodes.map((n) => n.name).sort();

describe('For-Each blocks', () => {
  it('a block holds its begins, its end and the nodes wired between them', () => {
    const level = forEachPoint();
    const blocks = findBlocks(level, new Set(level.nodes.map((n) => n.name)));
    expect(blocks).toHaveLength(1);
    expect(names(blocks[0].members)).toEqual(
      ['copytopoints4', 'foreach_begin4', 'foreach_begin4_metadata1', 'foreach_end4'].sort(),
    );
  });

  it('the underlay is drawn below the wires in the Block End color', () => {
    const { nodes } = convertGraphToReactFlow(forEachPoint());
    const underlay = nodes.find((n) => n.id === `${BLOCK_ID_PREFIX}foreach_end4`);
    expect(underlay?.zIndex).toBe(-5);
    expect(underlay?.selectable).toBe(false);
    expect(underlay?.data.color).toEqual([0.75, 0.4, 0]);
  });
});

describe('Block method labels', () => {
  const label = (level: ReturnType<typeof graph>, name: string) => {
    const byName = new Map(level.nodes.map((n) => [n.name, n]));
    return blockMethodLabel(byName.get(name) as HoudiniNodeData, (n) => byName.get(n), level.path);
  };

  it('shows the method of each block node like Houdini', () => {
    const level = forEachPoint();
    expect(label(level, 'foreach_begin4')).toBe('Point');
    expect(label(level, 'foreach_begin4_metadata1')).toBe('Metadata');
    expect(label(level, 'foreach_end4')).toBe('Merge');
    expect(label(level, 'copytopoints4')).toBeNull();
  });

  it('a piece begin follows the Piece Elements of its end', () => {
    expect(label(forEachPoint('primitive'), 'foreach_begin4')).toBe('Piece');
  });

  it('parameters left out of a compact export read as the Houdini defaults', () => {
    const level = graph({
      nodes: [node({ name: 'repeat_begin1', type: 'block_begin' }), node({ name: 'repeat_end1', type: 'block_end' })],
    });
    expect(label(level, 'repeat_begin1')).toBe('Feedback');
    expect(label(level, 'repeat_end1')).toBe('Feedback');
  });

  it('compile blocks have no method label', () => {
    const level = graph({ nodes: [node({ name: 'compile_begin1', type: 'compile_begin' })] });
    expect(label(level, 'compile_begin1')).toBeNull();
  });

  it('the label reaches the node data', () => {
    const { nodes } = convertGraphToReactFlow(forEachPoint());
    const end = nodes.find((n) => n.id === 'foreach_end4');
    expect((end?.data as HoudiniSopFlowNodeData).descriptiveText).toBe('Merge');
  });
});

describe('Dotted wires', () => {
  it('NOP-WIRE-005: only the target points input of Copy to Points is dotted', () => {
    const level = forEachPoint();
    level.nodes.push(node({ name: 'merge1', maxInputs: 2 }));
    level.wires.push(wire('scatter1', 'merge1', 0, 1));
    const { edges } = convertGraphToReactFlow(level);
    const dotted = edges.filter((e) => (e.data as HoudiniWireFlowEdgeData).dotted).map((e) => e.source);
    expect(dotted).toEqual(['foreach_begin4']);
  });

  it('versioned Copy to Points types count too', () => {
    expect(isDottedWire(node({ name: 'c', type: 'copytopoints::2.0' }), 1)).toBe(true);
    expect(isDottedWire(node({ name: 'c', type: 'copytopoints' }), 0)).toBe(false);
    expect(isDottedWire(undefined, 1)).toBe(false);
  });
});
