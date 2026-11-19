import React from 'react';
import { type Pt, pts, r2 } from '../../geoHelpers';

export const framePath = (cx: number, cy: number, w: number, h: number, skew: number, border: number): string => {
  const hw = w / 2;
  const hh = h / 2;
  const hs = skew / 2;
  const outer: Pt[] = [
    [cx - hw, cy - hh - hs],
    [cx + hw, cy - hh + hs],
    [cx + hw, cy + hh + hs],
    [cx - hw, cy + hh - hs],
  ];
  const iw = hw - border;
  const ih = hh - border;
  const is = (iw / hw) * hs;
  const inner: Pt[] = [
    [cx - iw, cy - ih - is],
    [cx + iw, cy - ih + is],
    [cx + iw, cy + ih + is],
    [cx - iw, cy + ih - is],
  ];
  return `M${pts(outer).replace(/ /g, ' L')} Z M${pts(inner).replace(/ /g, ' L')} Z`;
};

export const STACK_LAYERS: ReadonlyArray<{ dx: number; dy: number; fill: string }> = [
  { dx: 1.9, dy: -1.6, fill: '#eef2f7' },
  { dx: 0, dy: 0, fill: '#8fc2ff' },
  { dx: -1.9, dy: 1.6, fill: '#5aa2f2' },
];

/**
 * Three stacked bright-blue hollow square USD layer frames in 3/4 isometric perspective.
 * Centered at `(x, y)` with optional `scale`.
 */
export const UsdLayerStack: React.FC<{ x?: number; y?: number; scale?: number }> = ({ x = 12, y = 12, scale = 1 }) => {
  const sw = r2(0.75 / scale);
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {STACK_LAYERS.map((layer) => (
        <path
          key={layer.fill}
          d={framePath(layer.dx, layer.dy, 9.6, 9.2, 2.2, 2.0)}
          fill={layer.fill}
          fillRule="evenodd"
          stroke="#262626"
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      ))}
    </g>
  );
};

/**
 * Dark circular badge with a crisp outer outline and light inner ring so it reads on both light
 * and dark node bodies. Children are drawn in local coordinates centered at `(0, 0)`.
 */
export const UsdRoundBadge: React.FC<{
  cx?: number;
  cy?: number;
  r?: number;
  children?: React.ReactNode;
}> = ({ cx = 16.8, cy = 16.8, r = 4.6, children }) => (
  <g transform={`translate(${cx} ${cy})`}>
    <circle cx="0" cy="0" r={r} fill="#2e3338" stroke="#262626" strokeWidth="0.95" />
    <circle cx="0" cy="0" r={r2(r - 0.55)} fill="none" stroke="#f2f4f7" strokeWidth="0.6" />
    {children}
  </g>
);

export const starPoints = (cx: number, cy: number, rOuter: number, rInner: number): string => {
  const out: Pt[] = [];
  for (let i = 0; i < 10; i += 1) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const r = i % 2 === 0 ? rOuter : rInner;
    out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return pts(out);
};

/**
 * White ceramic mug with a right-side handle, dark rim interior, and light-blue star emblem.
 * Centered at `(x, y)` with optional `scale`.
 */
export const UsdComponentCup: React.FC<{ uid: string; x?: number; y?: number; scale?: number }> = ({
  uid,
  x = 12,
  y = 12,
  scale = 1,
}) => {
  const gradId = `${uid}-usd-cup`;
  const sw = r2(0.95 / scale);
  const innerSw = r2(0.75 / scale);
  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="15%" x2="100%" y2="85%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#eef2f7" />
          <stop offset="100%" stopColor="#89929e" />
        </linearGradient>
      </defs>
      <g transform={`translate(${x} ${y}) scale(${scale})`} strokeLinejoin="round">
        <path
          d="M4.2,-3.2 C7.8,-3.4 8.2,2.8 3.6,3.1 L3.3,1.6 C6.0,1.4 5.8,-1.8 4.0,-1.7 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth={sw}
        />
        <path
          d="M-5.4,-5.0 L5.4,-5.0 C5.2,1.6 4.0,5.8 0,5.8 C-4.0,5.8 -5.2,1.6 -5.4,-5.0 Z"
          fill={`url(#${gradId})`}
          stroke="#262626"
          strokeWidth={sw}
        />
        <ellipse cx="0" cy="-5.0" rx="5.4" ry="1.65" fill="#eef2f7" stroke="#262626" strokeWidth={sw} />
        <ellipse cx="0" cy="-5.0" rx="4.0" ry="0.95" fill="#5a616b" stroke="#262626" strokeWidth={innerSw} />
        <polygon points={starPoints(0, 1.3, 3.4, 1.55)} fill="#5aa2f2" stroke="#262626" strokeWidth={innerSw} />
      </g>
    </>
  );
};
