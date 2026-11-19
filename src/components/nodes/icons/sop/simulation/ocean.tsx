import React from 'react';
import { lerpPt, type Pt, pts, r2, roundedRectPath } from '../../geoHelpers';
import { ShadedSphere, SPHERE_TONES } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { SolverBrain } from '../kits/solverBrain';

/**
 * 6 ocean, whitewater, and particle-trail SOP icons.
 * Spec: `work/specs/ocean.md` in nop-icon-pipeline.
 */

const OUTLINE = '#262626';

const WHITE = '#ffffff';

const FOAM_ICE = '#eef2f7';

const SKY_LIGHT = '#8fc2ff';

const WATER_MID = '#5aa2f2';

const WATER_DEEP = '#2e74c4';

const TEAL_LIGHT = '#5fd3c8';

const TEAL_MID = '#14a5b4';

const TEAL_DARK = '#0d6e78';

const STONE_LIGHT = '#e8c48a';

const STONE_AMBER = '#ee8624';

const STONE_MID = '#a8783c';

const STONE_DARK = '#7e5828';

const RED = '#e03228';

const ORANGE = '#ee8624';

const YELLOW = '#f2c438';

/**
 * Shared breaking blue ocean wave with a rippled puddle base, frothy white scalloped foam
 * blanket up over the crest, a craggy brown stone rendered on top of the upper foam, and
 * splash droplets. Reused unchanged by `sop.whitewaterpostprocess` and `sop.whitewatersolver`.
 */
const WhitewaterWave: React.FC<{
  cx?: number;
  cy?: number;
  scale?: number;
}> = ({ cx = 12, cy = 12, scale = 1 }) => {
  const transform = scale === 1 ? `translate(${cx}, ${cy})` : `translate(${cx}, ${cy}) scale(${scale})`;
  const sw = (w: number): string => String(r2(w / scale));
  return (
    <g transform={transform} strokeLinejoin="round">
      {/* Shallow blue water puddle base */}
      <path
        d="M-7.8,5.0 C-9.2,6.6 -7.4,8.7 -4.0,8.4 C-1.6,8.2 0.0,9.3 2.8,8.7 C6.0,8.0 9.0,6.6 8.4,4.4 C8.0,3.0 5.4,3.2 3.6,3.8 L-5.0,4.0 C-6.6,4.2 -7.0,4.5 -7.8,5.0 Z"
        fill={WATER_MID}
        stroke={OUTLINE}
        strokeWidth={sw(0.95)}
      />
      <path
        d="M-6.0,6.5 C-3.4,7.5 -0.2,7.5 3.2,7.2 C5.2,7.0 7.0,6.1 7.3,5.0"
        fill="none"
        stroke={WATER_DEEP}
        strokeWidth={sw(0.75)}
        strokeLinecap="round"
      />
      {/* Breaking blue ocean wave curling boldly to the right */}
      <path
        d="M-6.8,5.2 C-6.6,-1.2 -4.0,-6.8 1.0,-7.2 C4.8,-7.4 7.8,-5.0 8.8,-1.8 C6.8,-2.8 4.8,-2.2 4.1,-0.4 C3.5,1.2 5.0,2.6 6.8,3.4 C6.8,4.6 5.2,5.4 3.4,5.6 L-5.2,5.6 Z"
        fill={WATER_MID}
        stroke={OUTLINE}
        strokeWidth={sw(1.0)}
      />
      {/* Bright sky-blue upper-left wave flank */}
      <path d="M-5.8,4.0 C-5.4,-1.0 -3.2,-5.6 0.6,-6.2 C-1.2,-3.8 -3.0,0.2 -3.8,4.2 Z" fill={SKY_LIGHT} stroke="none" />
      {/* Shadowed deep-blue inner curl cavity on the right */}
      <path
        d="M2.2,-5.4 C5.0,-5.4 7.4,-3.8 8.3,-1.9 C6.4,-2.7 4.5,-2.1 3.9,-0.4 C3.3,1.3 4.8,2.6 6.4,3.4 C6.0,4.4 4.8,5.0 3.0,5.2 L1.2,5.0 C0.8,1.2 1.2,-2.6 2.2,-5.4 Z"
        fill={WATER_DEEP}
        stroke="none"
      />
      <path
        d="M2.8,-4.0 C4.8,-4.2 6.2,-3.2 7.0,-1.8 M2.8,2.8 C3.9,3.5 5.0,3.8 6.0,3.5"
        fill="none"
        stroke={WATER_MID}
        strokeWidth={sw(0.8)}
        strokeLinecap="round"
      />
      <path
        d="M-6.8,5.2 C-6.6,-1.2 -4.0,-6.8 1.0,-7.2 C4.8,-7.4 7.8,-5.0 8.8,-1.8 C6.8,-2.8 4.8,-2.2 4.1,-0.4 C3.5,1.2 5.0,2.6 6.8,3.4 C6.8,4.6 5.2,5.4 3.4,5.6 L-5.2,5.6 Z"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={sw(1.0)}
      />
      {/* Frothy white scalloped foam blanket arching across the top crest and splash front */}
      <path
        d="M-5.0,-2.8 C-4.4,-5.8 -1.8,-7.8 1.2,-7.6 C3.8,-7.4 5.8,-5.6 6.2,-3.2 C4.2,-3.5 2.6,-2.8 1.8,-1.5 C0.8,0.0 1.4,1.6 3.0,2.6 C4.2,3.4 3.8,5.2 2.2,5.8 C0.8,6.2 -0.6,5.8 -1.6,5.0 C-2.8,5.8 -4.4,5.4 -5.4,4.4 C-6.2,3.6 -5.8,1.8 -4.4,1.2 C-5.4,-0.2 -5.4,-1.6 -5.0,-2.8 Z"
        fill={WHITE}
        stroke={OUTLINE}
        strokeWidth={sw(0.95)}
      />
      {/* Shaded pale blue foam pockets for volume and splash depth */}
      <path
        d="M-4.2,3.8 C-3.2,4.6 -2.0,4.4 -1.4,3.8 C-0.2,4.6 1.2,4.8 2.2,4.2 C2.8,3.8 2.8,3.2 2.2,2.6 C1.0,3.2 -0.2,3.0 -1.4,2.2 C-2.4,3.0 -3.4,3.0 -4.2,2.4 Z"
        fill={FOAM_ICE}
        stroke="none"
      />
      <path
        d="M-2.8,2.2 C-1.8,2.8 -0.6,2.6 0.4,1.8"
        fill="none"
        stroke={WATER_MID}
        strokeWidth={sw(0.72)}
        strokeLinecap="round"
      />
      {/* Brown stone positioned and layered directly on top of the upper white foam */}
      <path
        d="M-2.8,-2.0 C-3.1,-3.8 -2.2,-5.4 -1.1,-6.5 C-0.3,-7.3 0.9,-7.3 1.7,-6.2 C2.5,-5.0 2.9,-3.4 2.4,-1.7 C1.6,-0.8 0.6,-0.6 -0.3,-1.0 C-1.2,-0.5 -2.3,-0.9 -2.8,-2.0 Z"
        fill={STONE_MID}
        stroke={OUTLINE}
        strokeWidth={sw(0.95)}
      />
      {/* Lit upper-left facet on the brown stone */}
      <path
        d="M-2.0,-2.2 C-2.2,-3.6 -1.5,-5.0 -0.7,-6.0 C-0.1,-6.7 0.5,-6.6 0.8,-5.8 C0.0,-4.9 -0.4,-3.4 -0.4,-1.5 C-1.2,-1.3 -1.8,-1.6 -2.0,-2.2 Z"
        fill={STONE_LIGHT}
        stroke="none"
      />
      <path
        d="M-1.1,-1.8 C-1.1,-3.4 -0.5,-4.9 0.2,-5.9 C0.8,-5.1 1.1,-3.6 0.9,-1.5 C0.1,-1.2 -0.5,-1.4 -1.1,-1.8 Z"
        fill={STONE_AMBER}
        stroke="none"
      />
      {/* Shadowed right facet on the brown stone */}
      <path
        d="M0.6,-6.1 C1.5,-5.1 2.1,-3.6 1.8,-1.9 C1.3,-1.2 0.6,-1.0 0.0,-1.3 C0.4,-3.0 0.6,-4.6 0.6,-6.1 Z"
        fill={STONE_DARK}
        stroke="none"
      />
      <path
        d="M-2.8,-2.0 C-3.1,-3.8 -2.2,-5.4 -1.1,-6.5 C-0.3,-7.3 0.9,-7.3 1.7,-6.2 C2.5,-5.0 2.9,-3.4 2.4,-1.7 C1.6,-0.8 0.6,-0.6 -0.3,-1.0 C-1.2,-0.5 -2.3,-0.9 -2.8,-2.0 Z"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={sw(0.95)}
      />
      {/* Two bold white splash droplets readable at 21px */}
      <circle cx="-7.2" cy="-1.2" r="1.1" fill={WHITE} stroke={OUTLINE} strokeWidth={sw(0.75)} />
      <circle cx="6.4" cy="-5.2" r="1.0" fill={WHITE} stroke={OUTLINE} strokeWidth={sw(0.75)} />
    </g>
  );
};

/**
 * Single wide curved ocean wave crest with broad concave upturned wings for `sop.oceansource`.
 */
const WaveScallop: React.FC<{ x: number; y: number; fill: string }> = ({ x, y, fill }) => (
  <path
    d="M0,-2.2 C1.1,-0.9 2.4,-0.3 3.8,-0.7 C2.9,1.1 1.5,2.2 0,2.7 C-1.5,2.2 -2.9,1.1 -3.8,-0.7 C-2.4,-0.3 -1.1,-0.9 0,-2.2 Z"
    transform={`translate(${x}, ${y})`}
    fill={fill}
    stroke={OUTLINE}
    strokeWidth="0.96"
    strokeLinejoin="round"
  />
);

/**
 * Samples a 4-point wide Z-shaped spine with crisp curved corners and offsets perpendicular
 * half-widths using a cubic ease-in taper so the ribbon keeps its bold sweeping geometry and
 * vivid fill along its curves before narrowing at the tail tip.
 */
const taperedTrailPath = (spine: readonly [Pt, Pt, Pt, Pt], startHw: number, endHw: number, maxT = 1): string => {
  const [p0, p1, p2, p3] = spine;
  const pull = (a: Pt, b: Pt, dist: number): Pt => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return lerpPt(a, b, Math.min(0.28, dist / len));
  };
  const c1a = pull(p1, p0, 1.5);
  const c1b = pull(p1, p2, 1.5);
  const c2a = pull(p2, p1, 1.5);
  const c2b = pull(p2, p3, 1.5);

  const samples: Pt[] = [];
  const pushLine = (a: Pt, b: Pt, steps: number): void => {
    for (let i = 0; i < steps; i += 1) samples.push(lerpPt(a, b, i / steps));
  };
  const pushQuad = (a: Pt, ctrl: Pt, b: Pt, steps: number): void => {
    for (let i = 0; i < steps; i += 1) {
      const t = i / steps;
      const m = 1 - t;
      samples.push([
        m * m * a[0] + 2 * m * t * ctrl[0] + t * t * b[0],
        m * m * a[1] + 2 * m * t * ctrl[1] + t * t * b[1],
      ]);
    }
  };

  pushLine(p0, c1a, 6);
  pushQuad(c1a, p1, c1b, 6);
  pushLine(c1b, c2a, 6);
  pushQuad(c2a, p2, c2b, 6);
  pushLine(c2b, p3, 9);
  samples.push(p3);

  const count = Math.max(3, Math.round(samples.length * maxT));
  const sub = samples.slice(0, count);
  const left: Pt[] = [];
  const right: Pt[] = [];

  for (let i = 0; i < sub.length; i += 1) {
    const prev = sub[Math.max(0, i - 1)];
    const next = sub[Math.min(sub.length - 1, i + 1)];
    const dx = next[0] - prev[0];
    const dy = next[1] - prev[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const u = i / (sub.length - 1);
    const hw = startHw + (endHw - startHw) * (u * u * u);
    left.push([sub[i][0] + nx * hw, sub[i][1] + ny * hw]);
    right.push([sub[i][0] - nx * hw, sub[i][1] - ny * hw]);
  }

  const ring = [...left, ...right.reverse()];
  return `M${pts(ring).replace(/ /g, ' L')} Z`;
};

const TRAIL_DEFS: readonly {
  spine: readonly [Pt, Pt, Pt, Pt];
  color: string;
  core: string;
  coreMaxT: number;
}[] = [
  {
    spine: [
      [5.0, 10.6],
      [11.8, 12.6],
      [5.6, 16.2],
      [17.8, 20.8],
    ],
    color: RED,
    core: '#ff7066',
    coreMaxT: 0.86,
  },
  {
    spine: [
      [9.6, 4.0],
      [15.6, 7.2],
      [10.2, 9.8],
      [18.4, 14.8],
    ],
    color: ORANGE,
    core: '#ffe47a',
    coreMaxT: 0.84,
  },
  {
    spine: [
      [15.6, 4.4],
      [20.8, 7.6],
      [15.8, 10.2],
      [21.2, 14.2],
    ],
    color: YELLOW,
    core: '#ffe47a',
    coreMaxT: 0.8,
  },
];

const OCEAN_SOURCE_GRID: readonly Pt[] = [
  [12.0, 7.6],
  [8.9, 9.5],
  [15.1, 9.5],
  [5.9, 11.4],
  [12.0, 11.4],
  [18.1, 11.4],
  [8.9, 13.3],
  [15.1, 13.3],
  [12.0, 15.2],
];

/**
 * Ocean and whitewater operators.
 */
export const OCEAN_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.oceanevaluate',
    label: 'Ocean Evaluate',
    family: 'sop',
    description:
      'Three-dimensional aqua-teal wave cross-section block whose flat right water shelf connects along a smooth inner curve to the upper-right crest tip.',
    types: ['oceanevaluate', 'oceanspectrum'],
    icons: ['sop_oceanevaluate', 'sop_oceanspectrum'],
    refKey: 'SOP_oceanevaluate',
    render: () => (
      <g strokeLinejoin="round">
        {/* Shadowed dark-teal right end wall of the flat water block */}
        <polygon points="17.2,21.0 20.6,18.4 20.6,11.2 17.2,13.8" fill={TEAL_DARK} stroke={OUTLINE} strokeWidth="1.0" />
        {/* Lit 3D flat water top shelf connecting in a smooth curve from its left uppermost corner to the uppermost right corner of the wave top */}
        <path
          d="M11.8,13.8 L17.2,13.8 L20.6,11.2 L15.2,11.2 C12.6,9.4 13.8,5.4 20.4,5.0 L17.2,7.4 C11.2,7.6 9.6,11.6 11.8,13.8 Z"
          fill={TEAL_LIGHT}
          stroke={OUTLINE}
          strokeWidth="0.95"
        />
        {/* Subtle inner crease where the flat water shelf begins curving up the inner wave wall */}
        <line x1="12.0" y1="13.6" x2="15.0" y2="11.3" stroke={TEAL_MID} strokeWidth="0.75" strokeLinecap="round" />
        {/* Lit upper-back curling wave hood */}
        <path
          d="M5.2,9.8 C7.6,5.0 11.6,2.8 16.4,2.8 C18.8,2.8 20.4,3.8 20.4,5.0 L17.2,7.4 C17.0,5.6 15.2,4.8 12.8,5.0 C9.6,5.2 6.8,7.2 5.2,9.8 Z"
          fill={TEAL_LIGHT}
          stroke={OUTLINE}
          strokeWidth="1.0"
        />
        {/* Crisp pale foam highlight along the curling upper crest */}
        <path
          d="M11.6,4.2 C14.4,3.2 17.6,3.4 19.6,4.6 L17.2,6.2 C15.6,5.0 13.4,4.8 11.2,5.0 Z"
          fill={FOAM_ICE}
          stroke="none"
        />
        {/* Broad mid-teal front cross-section face */}
        <path
          d="M2.8,21.0 C3.0,12.8 6.4,5.4 12.6,4.6 C15.8,4.2 17.6,5.8 17.2,7.4 C11.2,7.6 9.6,11.6 11.8,13.8 L17.2,13.8 L17.2,21.0 Z"
          fill={TEAL_MID}
          stroke={OUTLINE}
          strokeWidth="1.1"
        />
        {/* Upper-left front bevel highlight */}
        <path d="M4.2,18.4 C4.4,12.0 7.2,6.8 12.0,5.6 C8.8,7.2 6.0,12.2 5.2,18.4 Z" fill={TEAL_LIGHT} stroke="none" />
      </g>
    ),
  },
  {
    id: 'sop.oceanfoam',
    label: 'Ocean Foam',
    family: 'sop',
    description:
      'Top-down rounded square ocean tile with light aqua water caustics beneath a sweeping white scalloped wave foam crest.',
    types: ['oceanfoam'],
    icons: ['sop_oceanfoam'],
    refKey: 'SOP_oceanfoam',
    render: (uid) => (
      <g strokeLinejoin="round">
        <defs>
          <clipPath id={`${uid}-foam-clip`}>
            <path d={roundedRectPath(3.0, 3.0, 18.0, 18.0, 1.4)} />
          </clipPath>
          <linearGradient id={`${uid}-foam-bg`} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor={WATER_DEEP} />
            <stop offset="52%" stopColor={TEAL_MID} />
            <stop offset="100%" stopColor={TEAL_DARK} />
          </linearGradient>
        </defs>
        <g clipPath={`url(#${uid}-foam-clip)`}>
          <rect x="3" y="3" width="18" height="18" fill={`url(#${uid}-foam-bg)`} />
          {/* Deep ocean shadow trough ahead of the top-down wave crest */}
          <path
            d="M3.0,18.2 C7.8,17.8 12.4,15.6 15.6,12.2 C18.2,9.4 19.8,6.2 21.0,3.0 L21.0,21.0 L3.0,21.0 Z"
            fill={TEAL_DARK}
          />
          {/* Simplified bright aqua water caustics web in the lower-right and upper-left water */}
          <path
            fill={TEAL_LIGHT}
            fillRule="evenodd"
            d="M9.6,16.4 C11.6,14.8 14.2,14.0 16.8,14.4 C18.6,12.6 19.8,10.2 21.2,8.4 L21.2,19.8 C19.4,20.2 17.2,20.6 14.8,20.6 C12.2,20.6 9.8,19.8 8.0,18.6 C8.4,17.8 8.9,17.0 9.6,16.4 Z M11.4,17.6 C10.4,18.2 11.2,19.4 13.0,19.4 C14.8,19.4 15.8,18.2 15.0,17.2 C14.2,16.2 12.4,16.8 11.4,17.6 Z M16.8,15.6 C16.0,16.4 16.8,18.0 18.2,18.2 C19.6,18.4 20.4,17.0 19.8,15.8 C19.2,14.6 17.6,14.8 16.8,15.6 Z M17.8,11.6 C17.0,12.4 17.6,13.6 18.8,13.6 C20.0,13.6 20.6,12.4 20.0,11.4 C19.4,10.6 18.4,10.8 17.8,11.6 Z M2.8,3.0 L13.4,3.0 C12.0,5.2 9.8,7.0 7.2,8.2 C5.6,9.0 4.2,10.2 2.8,11.6 Z M4.6,4.6 C3.8,5.4 4.2,7.2 5.6,7.4 C7.2,7.6 8.8,6.2 8.4,4.8 C8.0,3.6 5.6,3.8 4.6,4.6 Z"
          />
          {/* Trailing lacy ice-white sea foam cells behind the wave crest */}
          <path
            fill={FOAM_ICE}
            fillRule="evenodd"
            d="M2.6,12.4 C5.4,10.8 8.4,9.0 10.6,6.6 C12.4,4.8 13.8,3.6 15.2,2.8 L19.8,2.8 C18.8,6.4 16.8,9.8 14.0,12.6 C10.8,15.8 6.8,17.8 2.6,18.4 Z M5.2,12.6 C4.2,13.4 4.8,15.0 6.4,14.8 C8.0,14.6 9.2,13.2 8.4,12.0 C7.6,11.0 6.0,11.8 5.2,12.6 Z M10.6,8.2 C9.6,9.2 10.4,10.8 11.8,10.4 C13.2,10.0 14.2,8.4 13.4,7.4 C12.6,6.4 11.4,7.4 10.6,8.2 Z"
          />
          {/* Bold white scalloped wave foam crest on top */}
          <path
            d="M2.6,15.6 C5.2,15.0 7.6,13.6 9.6,11.6 C12.0,9.2 14.0,6.2 15.4,2.8 L19.6,2.8 C19.2,5.6 17.8,8.0 15.6,9.4 C16.0,11.2 14.6,13.0 12.4,13.6 C11.8,15.4 9.8,16.8 7.4,16.8 C5.8,18.0 4.0,18.4 2.6,18.0 Z"
            fill={WHITE}
            stroke={OUTLINE}
            strokeWidth="0.78"
          />
        </g>
        <path d={roundedRectPath(3.0, 3.0, 18.0, 18.0, 1.4)} fill="none" stroke={OUTLINE} strokeWidth="1.05" />
      </g>
    ),
  },
  {
    id: 'sop.oceansource',
    label: 'Ocean Source',
    family: 'sop',
    description:
      'Wide 2:1 isometric patch of nine overlapping blue ocean wave crests with concave wings and pale crest highlights.',
    types: ['oceansource', 'oceanwaves'],
    icons: ['sop_oceansource', 'sop_oceanwaves'],
    refKey: 'SOP_oceansource',
    render: (uid) => (
      <g strokeLinejoin="round">
        <defs>
          <linearGradient id={`${uid}-wave-scale`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={WHITE} />
            <stop offset="28%" stopColor={FOAM_ICE} />
            <stop offset="52%" stopColor={SKY_LIGHT} />
            <stop offset="82%" stopColor={WATER_MID} />
            <stop offset="100%" stopColor={WATER_DEEP} />
          </linearGradient>
        </defs>
        {OCEAN_SOURCE_GRID.map(([x, y], idx) => (
          <WaveScallop key={idx} x={x} y={y} fill={`url(#${uid}-wave-scale)`} />
        ))}
      </g>
    ),
  },
  {
    id: 'sop.whitewaterpostprocess',
    label: 'Whitewater Post-Process',
    family: 'sop',
    description:
      'Breaking blue ocean wave with a frothy white foam blanket and splash droplets, topped by a craggy brown stone resting on the upper foam.',
    types: ['whitewaterpostprocess', 'whitewatersource'],
    icons: ['sop_whitewaterpostprocess', 'sop_whitewatersource'],
    refKey: 'SOP_whitewaterpostprocess',
    render: () => <WhitewaterWave cx={12} cy={12} scale={1} />,
  },
  {
    id: 'sop.whitewatersolver',
    label: 'Whitewater Solver',
    family: 'sop',
    description:
      'Breaking blue whitewater wave with a brown stone on top of its upper white foam crest and a pink solver brain in the lower-right foreground.',
    types: ['whitewatersolver'],
    icons: ['sop_whitewatersolver'],
    refKey: 'SOP_whitewatersolver',
    render: () => (
      <g strokeLinejoin="round">
        <WhitewaterWave cx={10.8} cy={11.0} scale={0.88} />
        <SolverBrain cx={15.4} cy={15.8} scale={0.8} />
      </g>
    ),
  },
  {
    id: 'sop.particletrail',
    label: 'Particle Trail',
    family: 'sop',
    description:
      'Three metallic grey particle spheres streaking upward-left, trailing parallel red, orange and yellow diagonal Z-shaped ribbons.',
    types: ['particletrail'],
    icons: ['sop_particletrail'],
    refKey: 'SOP_particletrail',
    render: (uid) => (
      <g strokeLinejoin="round">
        {TRAIL_DEFS.map(({ spine, color, core, coreMaxT }, idx) => (
          <g key={idx}>
            <path
              d={taperedTrailPath(spine, 1.48, 0.34)}
              fill={color}
              stroke={OUTLINE}
              strokeWidth="0.82"
              paintOrder="stroke"
            />
            <path d={taperedTrailPath(spine, 0.72, 0.14, coreMaxT)} fill={core} stroke="none" />
          </g>
        ))}
        {TRAIL_DEFS.map(({ spine }, idx) => (
          <ShadedSphere
            key={idx}
            id={`${uid}-p${idx}`}
            cx={spine[0][0]}
            cy={spine[0][1]}
            r={1.48}
            tones={SPHERE_TONES.grey}
            strokeWidth={0.78}
          />
        ))}
      </g>
    ),
  },
];
