import { describe, expect, it } from 'vitest';
import { findNodes, matchNodePath, nodeSearchTest } from '../../src/schema/findNodes';
import { graph, node } from './networkFixtures';

/** `/obj/geo1` with `box1`, the subnetwork `inner` (holding `Sphere_Main` and `box_deep`) and `merge1`. */
const root = graph({
  nodes: [
    node({ name: 'box1' }),
    node({
      name: 'inner',
      type: 'subnet',
      isSubnetwork: true,
      children: graph({
        path: '/obj/geo1/inner',
        nodes: [node({ name: 'Sphere_Main', type: 'sphere' }), node({ name: 'box_deep', type: 'emjud::box_tool::1.0' })],
      }),
    }),
    node({ name: 'merge1', type: 'merge' }),
  ],
});

const names = (query: string) => findNodes(root, query).map((match) => match.node.name);

describe('node search', () => {
  it('NOP-FIND-010: finds names and operator types in every level, in document order', () => {
    expect(names('box')).toEqual(['box1', 'box_deep']);
    expect(names('sphere')).toEqual(['Sphere_Main']);
    expect(names('subnet')).toEqual(['inner']);
    expect(names('box_tool')).toEqual(['box_deep']);
  });

  it('NOP-FIND-010: the search ignores case and surrounding spaces, and an empty search finds nothing', () => {
    expect(names('  SPHERE_main ')).toEqual(['Sphere_Main']);
    expect(names('')).toEqual([]);
    expect(names('   ')).toEqual([]);
    expect(names('nothing')).toEqual([]);
  });

  it('NOP-FIND-011: Houdini wildcards match the whole name or type', () => {
    expect(names('box*')).toEqual(['box1', 'box_deep']);
    expect(names('*1')).toEqual(['box1', 'merge1']);
    expect(names('merge?')).toEqual(['merge1']);
    expect(names('ox*')).toEqual([]);
    // Other regular expression characters are plain text
    expect(nodeSearchTest('a.b*')?.('axb1')).toBe(false);
    expect(nodeSearchTest('a.b*')?.('a.b1')).toBe(true);
  });

  it('NOP-FIND-012: a match knows its level and full Houdini path', () => {
    const [match] = findNodes(root, 'deep');
    expect(match.path).toEqual(['inner']);
    expect(matchNodePath(match)).toBe('/obj/geo1/inner/box_deep');
    expect(findNodes(root, 'merge')[0].path).toEqual([]);
  });
});
