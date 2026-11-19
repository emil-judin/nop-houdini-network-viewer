import { type Pt, pts, tiltedTorus } from '../../geoHelpers';

export const TORUS_BODY = tiltedTorus(12, 12.3, 9.5, 6.6, 0.36, 0.22);

export const polyPath = (list: readonly Pt[], close = false): string =>
  `M${pts(list).replace(/ /g, ' L')}${close ? ' Z' : ''}`;

export const ringArc = (fn: (d: number) => Pt, a0: number, a1: number, step: number): Pt[] => {
  const out: Pt[] = [];
  const dir = a1 >= a0 ? 1 : -1;
  for (let d = a0; dir > 0 ? d <= a1 : d >= a1; d += dir * step) {
    out.push(fn(d));
  }
  if (out.length === 0 || out[out.length - 1] !== fn(a1)) {
    out.push(fn(a1));
  }
  return out;
};

export const TORUS_MID = polyPath(
  [...ringArc((d) => TORUS_BODY.ring(0.5, d), 5, 175, 8), ...ringArc((d) => TORUS_BODY.ring(1.05, d), 175, 5, 8)],
  true,
);

export const TORUS_SHADOW = polyPath(
  [...ringArc((d) => TORUS_BODY.ring(0.8, d), 30, 150, 8), ...ringArc((d) => TORUS_BODY.ring(1.05, d), 150, 30, 8)],
  true,
);
