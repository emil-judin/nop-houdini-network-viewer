import React from 'react';
import { arrowHead, pts, roundedRectPath, type Pt } from './geoHelpers';

/**
 * Reusable drawing kits for operator icons (Stage 2 of the icon workflow in
 * `docs/ICON_ART_BIBLE.md`): cased strokes, shaded spheres, corner badges and the cursor badge.
 * Family-specific kits (suitcase, dice, trays) live next to their icons and build on these.
 */

/**
 * A light or colored line drawn twice so it reads on any node color: a dark `#262626` casing
 * about 1.8 times wider, then the colored stroke on top.
 */
export const CasedStroke: React.FC<{
  d: string;
  color: string;
  width?: number;
  casing?: number;
  linecap?: 'round' | 'butt' | 'square';
}> = ({ d, color, width = 1.3, casing, linecap = 'round' }) => (
  <g fill="none" strokeLinecap={linecap} strokeLinejoin="round">
    <path d={d} stroke="#262626" strokeWidth={casing ?? width * 1.8} />
    <path d={d} stroke={color} strokeWidth={width} />
  </g>
);

/** Three-stop color ramp for a shaded sphere: highlight, body and shadow. */
export type SphereTones = readonly [string, string, string];

/** Grey, blue, orange and red sphere tones from the palette. */
export const SPHERE_TONES = {
  grey: ['#ffffff', '#b4bcc8', '#5a616b'],
  blue: ['#8fc2ff', '#3672c4', '#2e5a9a'],
  orange: ['#ffb066', '#ee8624', '#c25e12'],
  red: ['#ff7066', '#e03228', '#a81f18'],
  yellow: ['#ffe47a', '#f2c438', '#d49a18'],
} as const satisfies Record<string, SphereTones>;

/**
 * Sphere lit from the upper left (radial gradient) with a dark outline. `id` must be unique in
 * the icon (prefix it with the render `uid`).
 */
export const ShadedSphere: React.FC<{
  id: string;
  cx: number;
  cy: number;
  r: number;
  tones?: SphereTones;
  strokeWidth?: number;
}> = ({ id, cx, cy, r, tones = SPHERE_TONES.grey, strokeWidth = 0.9 }) => (
  <>
    <defs>
      <radialGradient id={id} cx="35%" cy="32%" r="65%">
        <stop offset="0%" stopColor={tones[0]} />
        <stop offset="55%" stopColor={tones[1]} />
        <stop offset="100%" stopColor={tones[2]} />
      </radialGradient>
    </defs>
    <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} stroke="#262626" strokeWidth={strokeWidth} />
  </>
);

/** Corner slots for badges, as the top-left corner of a 10 by 10 badge box. */
export const BADGE_SLOTS = {
  br: [12, 12],
  tr: [12, 2],
  tl: [2, 2],
  bl: [2, 12],
} as const satisfies Record<string, Pt>;

/**
 * Dark rounded-square badge (Houdini's attribute type tiles) in a corner slot. Children are drawn
 * in badge space: a `0 0 10 10` grid.
 */
export const CornerBadge: React.FC<{
  slot?: keyof typeof BADGE_SLOTS;
  size?: number;
  fill?: string;
  children?: React.ReactNode;
}> = ({ slot = 'br', size = 10, fill = '#2e3338', children }) => {
  const [x, y] = BADGE_SLOTS[slot];
  const s = size / 10;
  return (
    <g transform={`translate(${x + (10 - size)} ${y + (10 - size)}) scale(${s})`}>
      <path d={roundedRectPath(0.5, 0.5, 9, 9, 2.2)} fill={fill} stroke="#262626" strokeWidth={1 / s} />
      {children}
    </g>
  );
};

/**
 * White mouse-pointer arrow with a dark outline, its tip at `(x, y)`, scaled by `s` (1 is about 7
 * units tall). Used as the "pick or edit" cue on Unpack style icons.
 */
export const CursorArrow: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => {
  const local: Pt[] = [
    [0, 0],
    [0, 6.6],
    [1.6, 5.1],
    [2.7, 7.4],
    [3.9, 6.8],
    [2.8, 4.6],
    [4.9, 4.5],
  ];
  return (
    <polygon
      points={pts(local.map(([px, py]) => [x + px * s, y + py * s] as Pt))}
      fill="#ffffff"
      stroke="#262626"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
  );
};

/**
 * Generic standing human figure (no likeness): round head, shoulders, arms at the sides and two
 * legs. `(x, y)` is the hip center, `s` scales it (1 is about 15 units tall).
 */
export const GenericFigure: React.FC<{ x: number; y: number; s?: number; fill?: string }> = ({
  x,
  y,
  s = 1,
  fill = '#f2f4f7',
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill} stroke="#262626" strokeWidth={0.95 / s} strokeLinejoin="round">
    <path d="M-1.1,-6.6 L1.1,-6.6 C2.8,-6.6 3.6,-5.8 3.8,-4.4 L4.4,0.2 L2.9,0.4 L2.3,-3 L2.3,4.6 L0.9,4.6 L0.4,0.8 L-0.4,0.8 L-0.9,4.6 L-2.3,4.6 L-2.3,-3 L-2.9,0.4 L-4.4,0.2 L-3.8,-4.4 C-3.6,-5.8 -2.8,-6.6 -1.1,-6.6 Z" />
    <circle cx="0" cy="-8.7" r="1.9" />
  </g>
);

/**
 * Straight arrow with a cased shaft and an outlined triangular head, from `from` to `tip`.
 */
export const StraightArrow: React.FC<{ from: Pt; tip: Pt; color: string; width?: number; head?: number }> = ({
  from,
  tip,
  color,
  width = 1.6,
  head = 3,
}) => {
  const tri = arrowHead(tip, from, head, head * 0.62);
  const shaftEnd: Pt = [(tri[1][0] + tri[2][0]) / 2, (tri[1][1] + tri[2][1]) / 2];
  return (
    <>
      <CasedStroke d={`M${pts([from])} L${pts([shaftEnd])}`} color={color} width={width} linecap="butt" />
      <polygon points={pts(tri)} fill={color} stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
    </>
  );
};
