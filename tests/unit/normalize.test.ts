import { describe, expect, it } from 'vitest';
import malformed from '../../fixtures/edge-cases/malformed.json';
import prototypeKeys from '../../fixtures/edge-cases/prototype-keys.json';
import schema2 from '../../fixtures/edge-cases/schema-2.json';
import parametersExample from '../../fixtures/examples/parameters-network.json';
import { normalizeGraph, normalizeNetworkDocument } from '../../src/schema/normalize';

describe('normalizeNetworkDocument', () => {
  it('NOP-CONV-001: keeps a valid full document unchanged in content', () => {
    const doc = normalizeNetworkDocument(parametersExample);
    expect(doc.root.nodes).toHaveLength(parametersExample.root.nodes.length);
    expect(doc.root.path).toBe(parametersExample.root.path);
    expect(doc.schemaVersion).toBe(parametersExample.schemaVersion);
    // Normalizing twice gives the same result
    expect(normalizeNetworkDocument(doc)).toEqual(doc);
  });

  it('NOP-CONV-002: wraps a flat diagnostic dump into a document', () => {
    const doc = normalizeNetworkDocument({ nodes: [{ name: 'box1', type: 'box', pos: [0, 0] }] });
    expect(doc.schemaVersion).toBe('1.0.0');
    expect(doc.root.path).toBe('/obj/geo1');
    expect(doc.root.context).toBe('Sop');
    expect(doc.root.dots).toEqual([]);
    expect(doc.root.boxes).toEqual([]);
    expect(doc.root.stickies).toEqual([]);
    expect(doc.root.wires).toEqual([]);
    expect(doc.root.subnetInputs).toEqual([]);
    expect(normalizeNetworkDocument({ path: '/obj/x', nodes: [] }).root.path).toBe('/obj/x');
  });

  it.each([
    [null, 'expected an object'],
    ['hello', 'expected an object'],
    [[1, 2], 'expected an object'],
    [{ root: { nodes: 5 } }, '"root.nodes" must be a list of nodes'],
    [{ foo: 1 }, 'Unrecognized Houdini network JSON format'],
  ])('NOP-CONV-003: rejects %j with a readable message', (input, message) => {
    expect(() => normalizeNetworkDocument(input)).toThrow(message);
  });

  it.each(['1.0.0', '1.3.0', '1.4.0', '1.9.4'])('NOP-CONV-004: accepts schema %s', (version) => {
    expect(() => normalizeNetworkDocument({ schemaVersion: version, root: { nodes: [] } })).not.toThrow();
  });

  it('NOP-CONV-004: refuses a newer major schema', () => {
    expect(() => normalizeNetworkDocument(schema2)).toThrow(/made by a newer NOP exporter.*this viewer reads schema 1\.x/);
  });

  it('NOP-CONV-005: drops damaged items instead of crashing', () => {
    const doc = normalizeNetworkDocument(malformed);
    const names = doc.root.nodes.map((n) => n.name);
    // null, 5, "box1" (a string) and a node without a name are dropped
    expect(names).toEqual(['box1', 'subnet1', 'bad_pos']);

    const box = doc.root.nodes[0];
    const size = box.parms?.find((p) => p.name === 'size');
    expect(size?.val).toEqual([1]);
    expect(size?.expr).toEqual([null]);
    // A ramp without keys is dropped, the parameter stays
    expect(box.parms?.find((p) => p.name === 'ramp')?.ramp).toBeUndefined();
    // A parameter without a name is dropped
    expect(box.parms?.map((p) => p.name)).toEqual(['size', 'ramp', 't']);
    // Values that are not strings, numbers or booleans become text; a single expression string is not a list
    const t = box.parms?.find((p) => p.name === 't');
    expect(t?.val).toEqual([1, '[object Object]', '']);
    expect(t?.expr).toEqual([null, null, null]);

    const subnet = doc.root.nodes[1];
    expect(subnet.children?.nodes).toEqual([]);

    const bad = doc.root.nodes[2];
    expect(bad.pos).toEqual([0, 0]);
    expect(bad.color).toEqual([0.8, 0.8, 0.8]);
    expect(bad.flags.display).toBe(false);
    expect(bad.maxInputs).toBe(1);

    // Dots without names and broken wires are dropped, other lists are repaired
    expect(doc.root.dots).toEqual([]);
    expect(doc.root.wires).toEqual([{ from: 'box1', to: 'missing_node', fromOutput: 0, toInput: 0 }]);
    expect(doc.root.boxes[0].size).toEqual([2.5, 1.5]);
    expect(doc.root.stickies[0].text).toBe('');
  });

  it('keeps only string icons and object custom shapes', () => {
    const doc = normalizeNetworkDocument({
      root: { nodes: [] },
      icons: { a: '<svg/>', b: 5, constructor: '<svg id="c"/>' },
      customShapes: { s: { outline: [] }, t: 'x' },
    });
    expect(Object.keys(doc.icons ?? {})).toEqual(['a', 'constructor']);
    expect(Object.keys(doc.customShapes ?? {})).toEqual(['s']);
  });

  it('NOP-CONV-006: names that match built-in object properties are plain data', () => {
    const doc = normalizeNetworkDocument(prototypeKeys);
    expect(doc.root.nodes.map((n) => n.name)).toEqual(['constructor', '__proto__']);
    expect(Object.getPrototypeOf(doc.root.nodes[1])).toBe(Object.prototype);
  });

  it('NOP-CONV-034: outside wires keep only their documented fields and sane numbers', () => {
    const level = normalizeGraph({
      nodes: [],
      outsideWires: [
        { to: 'a', toInput: -2, name: 'grid1', type: 'grid', pos: [1.5, -2], dot: true },
        { from: 'b', fromOutput: 1.7, count: 3, pos: ['x', 2], dot: 'yes' },
        { count: 4 },
        'junk',
      ],
    });
    expect(level.outsideWires).toEqual([
      { to: 'a', toInput: 0, pos: [1.5, -2], dot: true },
      // A broken position is dropped, not zeroed, so the stub runs straight instead of toward the origin
      { from: 'b', fromOutput: 1 },
    ]);
    expect(normalizeGraph({ nodes: [] }).outsideWires).toBeUndefined();
  });

  it('limits subnetwork nesting', () => {
    let graph: Record<string, unknown> = { nodes: [] };
    for (let i = 0; i < 100; i++) {
      graph = { nodes: [{ name: `n${i}`, isSubnetwork: true, children: graph }] };
    }
    let depth = 0;
    let level = normalizeGraph(graph);
    while (level.nodes[0]?.children) {
      level = level.nodes[0].children;
      depth += 1;
    }
    expect(depth).toBe(64);
  });
});
