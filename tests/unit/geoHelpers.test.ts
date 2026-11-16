import { describe, expect, it } from 'vitest';
import {
  arrowHead,
  ellipsePt,
  gearPath,
  isoBoxFaces,
  quadPt,
  roundedRectPath,
  tiltedTorus,
} from '../../src/components/nodes/icons/geoHelpers';

describe('icon geometry helpers (docs/ICON_ART_BIBLE.md section 9, stage 2)', () => {
  it('builds isometric boxes with a 2:1 top face that share edges', () => {
    const f = isoBoxFaces(12, 2, 8, 9);
    expect(f.top).toEqual([
      [12, 2],
      [20, 6],
      [12, 10],
      [4, 6],
    ]);
    // The left and right faces meet at the front vertical edge below the front top vertex.
    expect(f.left[1]).toEqual(f.top[2]);
    expect(f.right[0]).toEqual(f.top[2]);
    expect(f.left[2]).toEqual(f.right[3]);
  });

  it('points arrowheads from the shaft toward the tip with a symmetric base', () => {
    const [tip, a, b] = arrowHead([10, 0], [0, 0], 3, 2);
    expect(tip).toEqual([10, 0]);
    expect(a[0]).toBeCloseTo(7);
    expect(b[0]).toBeCloseTo(7);
    expect(a[1]).toBeCloseTo(-b[1]);
    expect(Math.abs(a[1])).toBeCloseTo(2);
  });

  it('samples ellipses in screen space (90 degrees is down)', () => {
    const p = ellipsePt(12, 12, 6, 3, 90);
    expect(p[0]).toBeCloseTo(12);
    expect(p[1]).toBeCloseTo(15);
  });

  it('interpolates quads bilinearly', () => {
    expect(quadPt([[0, 0], [10, 0], [10, 10], [0, 10]], 0.5, 0.5)).toEqual([5, 5]);
  });

  it('keeps tilted torus rings between the hole and the outer rim', () => {
    const t = tiltedTorus(12, 12, 10, 7);
    const inner = t.ring(0, 0);
    const outer = t.ring(1, 0);
    expect(outer[0]).toBeCloseTo(22);
    expect(inner[0]).toBeLessThan(outer[0]);
    expect(t.body.match(/M/g)).toHaveLength(2);
  });

  it('emits closed gear and rounded rectangle outlines with finite numbers', () => {
    const gear = gearPath(12, 12, 8, 5, 4);
    expect(gear.startsWith('M')).toBe(true);
    expect(gear.endsWith('Z')).toBe(true);
    expect(gear.match(/L/g)).toHaveLength(8 * 4 - 1);
    expect(roundedRectPath(2, 2, 20, 20, 3)).not.toMatch(/NaN/);
  });
});
