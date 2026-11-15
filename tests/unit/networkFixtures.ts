import type { HoudiniNetworkGraph, HoudiniNodeData } from '../../src/schema/types';

/** A valid operator node for tests; `overrides` replace any field. */
export function node(overrides: Partial<HoudiniNodeData> & { name: string }): HoudiniNodeData {
  return {
    type: 'box',
    label: 'Box',
    icon: 'SOP_box',
    pos: [0, 0],
    size: [1.1296, 0.2824],
    color: [0.8, 0.8, 0.8],
    shape: 'rect',
    flags: { bypass: false, display: false, render: false, template: false, lock: false },
    maxInputs: 1,
    inputLabels: ['Input 1'],
    maxOutputs: 1,
    outputLabels: ['Output 1'],
    comment: '',
    isSubnetwork: false,
    parms: [],
    ...overrides,
  };
}

/** A network level for tests; `overrides` replace any list. */
export function graph(overrides: Partial<HoudiniNetworkGraph> = {}): HoudiniNetworkGraph {
  return {
    path: '/obj/geo1',
    type: 'geo',
    nodes: [],
    dots: [],
    boxes: [],
    stickies: [],
    wires: [],
    subnetInputs: [],
    ...overrides,
  };
}

/** A wire for tests. */
export function wire(from: string, to: string, fromOutput = 0, toInput = 0) {
  return { from, to, fromOutput, toInput };
}
