import { describe, expect, it } from 'vitest';
import { getFlagEdgePaths, getFlagInteriorEdgePaths, getNodeShapeDef } from '../../src/components/nodes/shapes/nodeShapes';

describe('flag area lines', () => {
  it('NOP-NODE-050: the round circle shape gets an inner ring and four spokes', () => {
    const circle = getNodeShapeDef('circle');
    for (const slot of ['0', '1', '2', '3']) {
      const region = circle.flags?.[slot];
      // The shape file has no divider lines for it, and the old guess found none
      expect(getFlagEdgePaths(region)).toEqual([]);
      // One unbroken line per quarter: spoke, quarter of the inner ring, spoke
      const paths = getFlagInteriorEdgePaths(region, circle.outline);
      expect(paths).toHaveLength(1);
      expect(paths[0].split('L').length).toBeGreaterThan(5);
    }
  });

  it('NOP-NODE-051: shapes with divider lines of their own keep exactly those', () => {
    const rect = getNodeShapeDef('rect');
    expect(getFlagEdgePaths(rect.flags?.['0'])).toHaveLength(1);
    expect(getFlagInteriorEdgePaths(undefined, rect.outline)).toEqual([]);
  });
});
