import React from 'react';
import { type Pt, pts, roundedRectPath } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import { DiagonalBone } from './bone';

/** Color ramp for a muscle belly: highlight, body, shadow and fiber striation. */
export interface MuscleTone {
  highlight: string;
  body: string;
  shadow: string;
  striation: string;
}

/** Standard red (Vellum/default) and purple (Otis) muscle palettes. */
export const MUSCLE_TONES = {
  red: {
    highlight: '#ff7066',
    body: '#e03228',
    shadow: '#a81f18',
    striation: '#a81f18',
  },
  purple: {
    highlight: '#d896f2',
    body: '#9b59b6',
    shadow: '#5b2873',
    striation: '#5b2873',
  },
} as const satisfies Record<string, MuscleTone>;

/**
 * Striated fusiform muscle spindle with rounded white tendon tips tucked behind the belly,
 * upper highlight and lower shadow bands, and dark curved fiber lines. Drawn horizontally in
 * local space centered at `(0, 0)`, then placed at `(cx, cy)` rotated by `angleDeg` and scaled
 * by `scale`.
 */
export const MuscleSpindle: React.FC<{
  cx?: number;
  cy?: number;
  len?: number;
  width?: number;
  angleDeg?: number;
  scale?: number;
  tone?: MuscleTone;
}> = ({ cx = 12, cy = 12, len = 22, width = 7.2, angleDeg = -45, scale = 1, tone = MUSCLE_TONES.red }) => {
  const sx = len / 22;
  const sy = width / 7.2;
  const sw = 1.05 / scale;
  const tsw = 0.9 / scale;
  const p = (x: number, y: number) => `${(x * sx).toFixed(2)},${(y * sy).toFixed(2)}`;

  return (
    <g
      transform={`translate(${cx} ${cy}) rotate(${angleDeg}) scale(${scale})`}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {/* Left and right rounded white tendon tips tucked behind the muscle belly */}
      <path
        d={`M${p(-7.1, -1.25)} C${p(-9.4, -1.55)} ${p(-10.9, -0.9)} ${p(-10.9, 0)} C${p(-10.9, 0.9)} ${p(-9.4, 1.55)} ${p(-7.1, 1.25)} Z`}
        fill="#f2f4f7"
        stroke="#262626"
        strokeWidth={tsw}
      />
      <path
        d={`M${p(7.1, -1.25)} C${p(9.4, -1.55)} ${p(10.9, -0.9)} ${p(10.9, 0)} C${p(10.9, 0.9)} ${p(9.4, 1.55)} ${p(7.1, 1.25)} Z`}
        fill="#f2f4f7"
        stroke="#262626"
        strokeWidth={tsw}
      />
      {/* Main muscle belly */}
      <path
        d={`M${p(-7.4, -1.3)} C${p(-4.0, -4.1)} ${p(4.0, -4.1)} ${p(7.4, -1.3)} C${p(8.1, -0.45)} ${p(8.1, 0.45)} ${p(7.4, 1.3)} C${p(4.0, 4.1)} ${p(-4.0, 4.1)} ${p(-7.4, 1.3)} C${p(-8.1, 0.45)} ${p(-8.1, -0.45)} ${p(-7.4, -1.3)} Z`}
        fill={tone.body}
        stroke="#262626"
        strokeWidth={sw}
      />
      {/* Upper-left highlight band (bright enough to read on dark node bodies) */}
      <path
        d={`M${p(-6.4, -0.9)} C${p(-3.2, -3.5)} ${p(3.2, -3.5)} ${p(6.4, -0.9)} C${p(3.2, -0.2)} ${p(-3.2, -0.2)} ${p(-6.4, -0.9)} Z`}
        fill={tone.highlight}
      />
      {/* Lower-right shadow band */}
      <path
        d={`M${p(-6.2, 0.95)} C${p(-2.8, 3.45)} ${p(2.8, 3.45)} ${p(6.2, 0.95)} C${p(2.8, 2.15)} ${p(-2.8, 2.15)} ${p(-6.2, 0.95)} Z`}
        fill={tone.shadow}
        opacity="0.65"
      />
      {/* Dark fiber striation lines */}
      <path
        d={`M${p(-5.3, -0.1)} Q${p(0, -0.95)} ${p(5.3, -0.1)} M${p(-4.6, 1.1)} Q${p(0, 0.55)} ${p(4.6, 1.1)}`}
        fill="none"
        stroke={tone.striation}
        strokeWidth={0.65 / scale}
        strokeLinecap="round"
      />
    </g>
  );
};

/**
 * Small UI property card at top-left with a pie chart, two data bars, and a cased callout line
 * pointing down to a dot at `(targetX, targetY)`.
 */
export const MusclePropertiesPanel: React.FC<{
  accent: string;
  targetX?: number;
  targetY?: number;
}> = ({ accent, targetX = 11.4, targetY = 12.6 }) => {
  const x = 2.2;
  const y = 2.2;
  const w = 10.6;
  const h = 6.4;
  const callout = `M${x + 4.4},${y + h} L${x + 4.4},${y + h + 2.1} L${targetX},${targetY}`;

  return (
    <g strokeLinejoin="round">
      <CasedStroke d={callout} color={accent} width={1.0} casing={2.1} />
      <circle cx={targetX} cy={targetY} r="1.15" fill="#ffffff" stroke="#262626" strokeWidth="0.85" />
      <path d={roundedRectPath(x, y, w, h, 1.1)} fill="#ffffff" stroke="#262626" strokeWidth="1.05" />
      <path
        d={roundedRectPath(x + 0.55, y + 0.55, w - 1.1, h - 1.1, 0.7)}
        fill="none"
        stroke={accent}
        strokeWidth="0.8"
      />
      {/* Pie chart */}
      <circle cx={x + 3.0} cy={y + 3.2} r="1.7" fill="#c0c7d1" stroke="#262626" strokeWidth="0.6" />
      <path d={`M${x + 3.0},${y + 3.2} L${x + 3.0},${y + 1.5} A1.7,1.7 0 0,1 ${x + 4.65},${y + 3.6} Z`} fill={accent} />
      {/* Data bars */}
      <rect x={x + 5.6} y={y + 1.8} width="3.5" height="1.1" rx="0.3" fill="#5aa2f2" />
      <rect x={x + 5.6} y={y + 3.5} width="2.6" height="1.1" rx="0.3" fill="#89929e" />
    </g>
  );
};

/**
 * Two-segment bent blue limb on the right side of the canvas, used by the Muscle Tension Lines
 * family. Joint centers are exposed via `BENT_LIMB_JOINTS` so tension lines connect cleanly.
 */
export const BENT_LIMB_JOINTS = {
  top: [11.6, 4.4] as Pt,
  knee: [16.8, 10.6] as Pt,
  bottom: [11.6, 17.8] as Pt,
};

export const BentBlueLimb: React.FC<{ offsetX?: number }> = ({ offsetX = 0 }) => {
  const [tx, ty] = BENT_LIMB_JOINTS.top;
  const [kx, ky] = BENT_LIMB_JOINTS.knee;
  const [bx, by] = BENT_LIMB_JOINTS.bottom;

  return (
    <g transform={`translate(${offsetX} 0)`} strokeLinejoin="round" strokeLinecap="round">
      {/* Upper thigh segment */}
      <path
        d={`M${tx - 1.6},${ty - 0.5} C${tx - 0.6},${ty - 2.1} ${tx + 2.2},${ty - 1.8} ${tx + 2.8},${ty - 0.2} L${kx + 1.8},${ky - 1.1} C${kx + 2.3},${ky + 0.3} ${kx + 1.6},${ky + 1.9} ${kx + 0.1},${ky + 1.8} L${kx - 1.8},${ky + 0.5} Z`}
        fill="#5aa2f2"
        stroke="#262626"
        strokeWidth="1.05"
      />
      {/* Upper thigh highlight wedge */}
      <polygon
        points={`${tx + 0.6},${ty - 0.9} ${tx + 2.1},${ty - 0.3} ${kx + 1.3},${ky - 0.6} ${kx + 0.3},${ky - 0.2}`}
        fill="#8fc2ff"
      />
      {/* Lower shin & foot segment */}
      <path
        d={`M${kx - 0.2},${ky - 1.4} C${kx + 1.4},${ky - 1.3} ${kx + 2.1},${ky + 0.2} ${kx + 1.3},${ky + 1.6} L${bx + 1.4},${by + 0.6} C${bx + 2.8},${by + 1.1} ${bx + 3.0},${by + 2.4} ${bx + 1.2},${by + 2.5} L${bx - 1.0},${by + 2.2} C${bx - 1.8},${by + 2.0} ${bx - 1.6},${by + 0.8} ${bx - 1.1},${by - 0.3} Z`}
        fill="#5aa2f2"
        stroke="#262626"
        strokeWidth="1.05"
      />
      {/* Lower shin highlight wedge */}
      <polygon
        points={`${kx + 0.4},${ky + 0.2} ${kx + 1.3},${ky + 0.9} ${bx + 0.8},${by + 0.4} ${bx},${by - 0.1}`}
        fill="#8fc2ff"
      />
    </g>
  );
};

/**
 * Tilted anatomical white-and-grey bone on the left side of the canvas, reusing `DiagonalBone`
 * from `kits/bone.tsx` for the Muscle Constraint Properties icons.
 */
export const AnatomicalBone: React.FC = () => (
  <g transform="translate(7.4 12.2) scale(0.75) rotate(112) translate(-12 -12)">
    <DiagonalBone />
  </g>
);

/**
 * Generic muscular upper-body figure (no real person likeness: simplified geometric head/neck,
 * broad shoulders, and muscular chest). Supports `'bust'` (for solver) and `'flex'` (double-bicep
 * pose for transfer).
 */
export const MuscleTorso: React.FC<{
  cx?: number;
  cy?: number;
  scale?: number;
  fill: string;
  highlight: string;
  shadow: string;
  pose?: 'bust' | 'flex';
}> = ({ cx = 12, cy = 12, scale = 1, fill, highlight, shadow, pose = 'bust' }) => {
  const sw = 1.0 / scale;

  if (pose === 'flex') {
    const armLeft: Pt[] = [
      [-4.2, -1.8],
      [-7.6, -2.0],
      [-8.8, -5.6],
      [-7.0, -7.0],
      [-5.6, -5.8],
      [-6.3, -3.5],
      [-4.0, -3.4],
    ];
    const armRight: Pt[] = armLeft.map(([x, y]) => [-x, y] as Pt);
    return (
      <g transform={`translate(${cx} ${cy}) scale(${scale})`} strokeLinejoin="round" strokeLinecap="round">
        {/* Flexed arms */}
        <polygon points={pts(armLeft)} fill={fill} stroke="#262626" strokeWidth={sw} />
        <polygon points={pts(armRight)} fill={fill} stroke="#262626" strokeWidth={sw} />
        {/* Broad torso */}
        <path
          d="M-4.4,-3.2 C-2.2,-4.0 2.2,-4.0 4.4,-3.2 L3.4,4.2 L-3.4,4.2 Z"
          fill={fill}
          stroke="#262626"
          strokeWidth={sw}
        />
        {/* Neck / simplified head stub */}
        <circle cx="0" cy="-5.3" r="1.65" fill={highlight} stroke="#262626" strokeWidth={sw} />
        {/* Pectoral and bicep highlights */}
        <path
          d="M-3.1,-1.5 Q-1.5,-0.5 -0.3,-1.2 M0.3,-1.2 Q1.5,-0.5 3.1,-1.5"
          fill="none"
          stroke={shadow}
          strokeWidth={0.75 / scale}
        />
        <path d="M-3.2,-2.7 Q-1.6,-3.2 0,-2.8" fill="none" stroke={highlight} strokeWidth={0.75 / scale} />
      </g>
    );
  }

  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`} strokeLinejoin="round" strokeLinecap="round">
      {/* Torso + bent arms */}
      <path
        d="M-4.8,-2.8 C-6.4,-2.4 -7.0,-0.4 -6.6,2.2 L-5.2,5.6 L-3.6,5.2 L-4.4,2.2 L-3.6,0.2 L-3.2,6.0 L3.2,6.0 L3.6,0.2 L4.4,2.2 L3.6,5.2 L5.2,5.6 L6.6,2.2 C7.0,-0.4 6.4,-2.4 4.8,-2.8 C2.4,-3.6 -2.4,-3.6 -4.8,-2.8 Z"
        fill={fill}
        stroke="#262626"
        strokeWidth={sw}
      />
      {/* Simplified geometric head */}
      <circle cx="0" cy="-5.8" r="2.1" fill={highlight} stroke="#262626" strokeWidth={sw} />
      {/* Chest and abs definition */}
      <path
        d="M-3.0,-1.0 Q-1.5,-0.1 -0.3,-0.9 M0.3,-0.9 Q1.5,-0.1 3.0,-1.0 M0,-0.6 V4.2 M-1.4,1.6 H1.4 M-1.2,3.4 H1.2"
        fill="none"
        stroke={shadow}
        strokeWidth={0.7 / scale}
      />
    </g>
  );
};
