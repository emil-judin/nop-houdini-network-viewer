import type { HoudiniRampData } from '../../schema/types';

/** One ramp point with its value as a list of channels (1 for float ramps, 3 for color ramps). */
interface RampPoint {
  key: number;
  value: number[];
  basis: string;
}

/** Ramp points sorted by position (Houdini allows them in any order). */
export function sortedRampPoints(ramp: HoudiniRampData): RampPoint[] {
  return ramp.keys
    .map((key, i) => {
      const value = ramp.values[i];
      return { key, value: Array.isArray(value) ? [...value] : [value ?? 0], basis: ramp.basis[i] ?? 'Linear' };
    })
    .sort((a, b) => a.key - b.key);
}

/**
 * Evaluates a ramp at position `t` (`0..1`), returning one number per channel.
 *
 * Interpolation follows each point's basis: `Constant` holds the value, `Linear` blends linearly,
 * every smooth basis (`CatmullRom`, `MonotoneCubic`, `Bezier`, `BSpline`, `Hermite`) is drawn as a
 * Catmull-Rom spline through the points (`MonotoneCubic` clamped between its two points so it never
 * overshoots). This is a display approximation of Houdini's curves.
 */
export function evaluateRamp(points: RampPoint[], t: number): number[] {
  if (points.length === 0) return [0];
  if (t <= points[0].key) return points[0].value;
  const last = points[points.length - 1];
  if (t >= last.key) return last.value;

  let i = 0;
  while (i < points.length - 2 && t >= points[i + 1].key) i += 1;
  const a = points[i];
  const b = points[i + 1];
  const span = b.key - a.key;
  const u = span > 0 ? (t - a.key) / span : 0;

  if (a.basis === 'Constant') return a.value;
  if (a.basis === 'Linear') return a.value.map((v, c) => v + (b.value[c] - v) * u);

  const before = points[i - 1]?.value ?? a.value;
  const after = points[i + 2]?.value ?? b.value;
  const u2 = u * u;
  const u3 = u2 * u;
  return a.value.map((p1, c) => {
    const p0 = before[c];
    const p2 = b.value[c];
    const p3 = after[c];
    const value =
      0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3);
    return a.basis === 'MonotoneCubic' ? Math.min(Math.max(value, Math.min(p1, p2)), Math.max(p1, p2)) : value;
  });
}
