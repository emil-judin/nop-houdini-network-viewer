import React from 'react';
import { type Pt, pts, r2 } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { SolverBrain } from '../kits/solverBrain';

const TEAL_LIGHT = '#5fd3c8';

const TEAL_MID = '#14a5b4';

const TEAL_DARK = '#0d6e78';

/**
 * Shared diagonal teal pushpin pointing down-left, used by `sop.vellumconstraints`
 * and `sop.vellumattachconstraints`.
 */
const VellumPushpin: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({ cx = 12, cy = 12, scale = 1 }) => {
  const transform = scale === 1 ? `translate(${cx}, ${cy})` : `translate(${cx}, ${cy}) scale(${scale})`;
  return (
    <g transform={transform} strokeLinejoin="round">
      {/* Silver needle pointing down-left */}
      <polygon points="-2.6,1.8 -7.8,7.8 -1.8,2.6" fill="#eef2f7" stroke="#262626" strokeWidth="0.9" />
      {/* Pin base flange */}
      <ellipse
        cx="0"
        cy="0"
        rx="4.1"
        ry="2.3"
        transform="translate(-1.5, 1.5) rotate(45)"
        fill={TEAL_MID}
        stroke="#262626"
        strokeWidth="1.0"
      />
      {/* Cylindrical neck */}
      <polygon points="-3.0,0.0 1.4,-4.4 4.4,-1.4 0.0,3.0" fill={TEAL_MID} stroke="#262626" strokeWidth="1.0" />
      <polygon points="-2.4,-0.2 1.2,-3.8 2.4,-2.6 -1.2,1.0" fill={TEAL_LIGHT} stroke="none" />
      {/* Cap underside rim */}
      <ellipse
        cx="0"
        cy="0"
        rx="4.9"
        ry="2.7"
        transform="translate(3.3, -3.3) rotate(45)"
        fill={TEAL_DARK}
        stroke="#262626"
        strokeWidth="1.0"
      />
      {/* Cap lit top face */}
      <ellipse
        cx="0"
        cy="0"
        rx="4.8"
        ry="2.6"
        transform="translate(4.2, -4.2) rotate(45)"
        fill={TEAL_LIGHT}
        stroke="#262626"
        strokeWidth="1.0"
      />
    </g>
  );
};

/**
 * Shared draped teal cloth sheet, used by `sop.vellumdrape`.
 */
const VellumClothDrape: React.FC = () => (
  <g strokeLinejoin="round">
    {/* Dark inner underside hem */}
    <path
      d="M5.6,17.4 Q8.4,15.4 12.0,17.0 Q15.6,15.4 18.4,17.4 L17.6,19.4 Q12.0,18.2 6.4,19.4 Z"
      fill={TEAL_DARK}
      stroke="#262626"
      strokeWidth="0.95"
    />
    {/* Main draped cloth silhouette (brighter lit teal on front) */}
    <path
      d="M8.6,5.2 C10.4,4.0 13.6,4.0 15.4,5.2 C17.6,8.2 19.2,13.0 19.8,17.4 C17.8,18.8 15.8,18.4 14.4,16.8 C13.0,18.6 11.0,18.6 9.6,16.8 C8.2,18.4 6.2,18.8 4.2,17.4 C4.8,13.0 6.4,8.2 8.6,5.2 Z"
      fill={TEAL_LIGHT}
      stroke="#262626"
      strokeWidth="1.05"
    />
    {/* Right shadow fold */}
    <path
      d="M14.2,5.6 C15.0,5.2 15.4,5.4 15.4,5.4 C17.4,8.4 18.8,13.0 19.4,17.0 C17.6,18.2 15.8,17.8 14.4,16.4 C14.6,13.0 14.4,9.2 14.2,5.6 Z"
      fill={TEAL_MID}
      stroke="none"
    />
    {/* Vertical fold creases */}
    <path
      d="M10.4,8.4 C9.8,11.6 9.6,14.6 9.6,16.8 M14.2,8.4 C14.6,11.6 14.6,14.6 14.4,16.8"
      fill="none"
      stroke={TEAL_DARK}
      strokeWidth="0.9"
      strokeLinecap="round"
    />
  </g>
);

/** Builds a 12-scallop rosette path around `(cx, cy)`. */
const rosettePath = (cx: number, cy: number, rOuter: number, rInner: number, lobes = 12): string => {
  const parts: string[] = [];
  const step = (Math.PI * 2) / lobes;
  for (let i = 0; i < lobes; i += 1) {
    const a0 = i * step - Math.PI / 2;
    const a1 = a0 + step;
    const am = (a0 + a1) / 2;
    const p0: Pt = [cx + Math.cos(a0) * rInner, cy + Math.sin(a0) * rInner];
    const pm: Pt = [cx + Math.cos(am) * rOuter, cy + Math.sin(am) * rOuter];
    const p1: Pt = [cx + Math.cos(a1) * rInner, cy + Math.sin(a1) * rInner];
    if (i === 0) parts.push(`M${r2(p0[0])},${r2(p0[1])}`);
    parts.push(`Q${r2(pm[0])},${r2(pm[1])} ${r2(p1[0])},${r2(p1[1])}`);
  }
  return `${parts.join(' ')} Z`;
};

/**
 * Builds a 3D extruded sine-wave ribbon standing on the ground plane from back-left to
 * front-right, split at `dx/dt = 0` turning points into back-to-front monotone faces.
 */
const buildExtrudedRibbon = (): { d: string; front: boolean }[] => {
  const N = 64;
  const samples: { x: number; yTop: number; yBot: number }[] = [];
  for (let i = 0; i <= N; i += 1) {
    const t = i / N;
    const xBase = 7.4 + 8.2 * t;
    const yBase = 6.8 + 11.6 * t;
    const amp = 4.4 + 2.8 * t;
    const phase = t * Math.PI * 2.45 - 0.9;
    const x = xBase + amp * Math.sin(phase);
    const yBot = yBase - 0.16 * amp * Math.cos(phase);
    const h = 2.6 + 3.4 * t;
    samples.push({ x, yTop: yBot - h, yBot });
  }

  // Split into monotone x-segments at turning points where dx changes sign
  const segments: { start: number; end: number; front: boolean }[] = [];
  let segStart = 0;
  let dir = samples[1].x >= samples[0].x ? 1 : -1;
  for (let i = 1; i < N; i += 1) {
    const nextDir = samples[i + 1].x >= samples[i].x ? 1 : -1;
    if (nextDir !== dir) {
      segments.push({ start: segStart, end: i, front: dir > 0 });
      segStart = i;
      dir = nextDir;
    }
  }
  segments.push({ start: segStart, end: N, front: dir > 0 });

  return segments.map(({ start, end, front }) => {
    const topPts: Pt[] = [];
    const botPts: Pt[] = [];
    for (let i = start; i <= end; i += 1) {
      topPts.push([samples[i].x, samples[i].yTop]);
      botPts.push([samples[i].x, samples[i].yBot]);
    }
    const ring = [...topPts, ...botPts.reverse()];
    return { d: `M${pts(ring).replace(/ /g, ' L')} Z`, front };
  });
};

const RIBBON_FACES = buildExtrudedRibbon();

/**
 * Vellum, grain and cloth operators.
 */
export const VELLUM_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.vellumconstraints',
    label: 'Vellum Constraints',
    family: 'sop',
    description: 'Diagonal teal pushpin pointing down-left with a silver needle and flat circular cap.',
    types: ['vellumconstraints'],
    icons: ['sop_vellumconstraints'],
    refKey: 'SOP_vellumconstraints',
    render: () => <VellumPushpin />,
  },
  {
    id: 'sop.vellumconstraints_grain',
    label: 'Vellum Configure Grain',
    family: 'sop',
    description: 'Mound of teal rounded grain capsules at the bottom with two falling grains and motion streaks above.',
    types: ['vellumconstraints_grain'],
    icons: ['sop_vellumconstraints_grain'],
    refKey: 'SOP_vellumconstraints_grain',
    render: () => (
      <g strokeLinejoin="round">
        {/* Motion streaks */}
        <path d="M10.4,2.8 V5.4 M13.6,2.4 V5.0" fill="none" stroke="#262626" strokeWidth="0.95" strokeLinecap="round" />
        {/* Falling grains */}
        <ellipse
          cx="10.0"
          cy="7.8"
          rx="2.0"
          ry="1.2"
          transform="rotate(-22 10.0 7.8)"
          fill={TEAL_LIGHT}
          stroke="#262626"
          strokeWidth="0.85"
        />
        <ellipse
          cx="14.0"
          cy="9.8"
          rx="2.0"
          ry="1.2"
          transform="rotate(18 14.0 9.8)"
          fill={TEAL_LIGHT}
          stroke="#262626"
          strokeWidth="0.85"
        />
        {/* Back row of grain mound */}
        <ellipse cx="7.4" cy="15.0" rx="2.7" ry="1.65" fill={TEAL_MID} stroke="#262626" strokeWidth="0.85" />
        <ellipse cx="12.0" cy="14.0" rx="2.8" ry="1.7" fill={TEAL_MID} stroke="#262626" strokeWidth="0.85" />
        <ellipse cx="16.6" cy="15.2" rx="2.7" ry="1.65" fill={TEAL_MID} stroke="#262626" strokeWidth="0.85" />
        {/* Middle row */}
        <ellipse cx="9.2" cy="17.0" rx="2.9" ry="1.75" fill={TEAL_LIGHT} stroke="#262626" strokeWidth="0.85" />
        <ellipse cx="14.8" cy="17.0" rx="2.9" ry="1.75" fill={TEAL_MID} stroke="#262626" strokeWidth="0.85" />
        {/* Front row */}
        <ellipse cx="5.8" cy="18.8" rx="2.7" ry="1.65" fill={TEAL_LIGHT} stroke="#262626" strokeWidth="0.85" />
        <ellipse cx="11.8" cy="19.0" rx="2.9" ry="1.7" fill={TEAL_LIGHT} stroke="#262626" strokeWidth="0.85" />
        <ellipse cx="17.8" cy="18.8" rx="2.7" ry="1.65" fill={TEAL_LIGHT} stroke="#262626" strokeWidth="0.85" />
      </g>
    ),
  },
  {
    id: 'sop.vellumattachconstraints',
    label: 'Vellum Attach Constraints',
    family: 'sop',
    description:
      'Diagonal teal pushpin with a round black attach badge at bottom-right showing a rounded teal cloth dome topped by a coral sphere.',
    types: ['vellumattachconstraints'],
    icons: ['sop_vellumattachconstraints'],
    refKey: 'SOP_vellumattachconstraints',
    render: () => (
      <g strokeLinejoin="round">
        <VellumPushpin cx={10.8} cy={10.8} scale={0.88} />
        {/* Round attach badge */}
        <circle cx="16.8" cy="16.8" r="5.1" fill="#262626" stroke="#eef2f7" strokeWidth="0.9" />
        {/* Rounded teal cloth dome filling bottom of badge */}
        <path
          d="M12.9,19.4 C13.6,16.4 14.8,14.2 16.8,14.2 C18.8,14.2 20.0,16.4 20.7,19.4 A4.6,4.6 0 0,1 12.9,19.4 Z"
          fill={TEAL_MID}
          stroke="#262626"
          strokeWidth="0.7"
        />
        <path
          d="M12.9,19.4 C13.6,16.4 14.8,14.2 16.8,14.2 L16.8,21.0 A4.6,4.6 0 0,1 12.9,19.4 Z"
          fill={TEAL_LIGHT}
          stroke="none"
        />
        {/* Coral sphere with white rim at apex */}
        <circle cx="16.8" cy="13.8" r="1.55" fill="#ff7066" stroke="#eef2f7" strokeWidth="0.65" />
      </g>
    ),
  },
  {
    id: 'sop.vellumconstraintproperty',
    label: 'Vellum Constraint Properties',
    family: 'sop',
    description:
      'Single extruded teal ribbon curving across the ground like an increasing-amplitude sine wave from back-left to front-right.',
    types: ['vellumconstraintproperty'],
    icons: ['sop_vellumconstraintproperty'],
    refKey: 'SOP_vellumconstraintproperty',
    render: () => (
      <g strokeLinejoin="round">
        {RIBBON_FACES.map((face, idx) => (
          <path key={idx} d={face.d} fill={face.front ? TEAL_LIGHT : TEAL_DARK} stroke="#262626" strokeWidth="1.05" />
        ))}
      </g>
    ),
  },
  {
    id: 'sop.vellumsolver',
    label: 'Vellum Solver',
    family: 'sop',
    description: 'Pink solver brain with a pale-teal cloth sheet draped over its upper-left side.',
    types: ['vellumsolver'],
    icons: ['sop_vellumsolver'],
    refKey: 'SOP_vellumsolver',
    render: () => (
      <g strokeLinejoin="round">
        <SolverBrain cx={13.2} cy={13.6} scale={0.96} />
        {/* Inner shadow fold of draped cloth */}
        <path
          d="M4.2,16.8 C4.6,13.0 6.2,9.0 9.6,7.2 L12.0,9.4 C8.8,11.2 7.8,14.6 7.4,18.4 Z"
          fill={TEAL_MID}
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Draped pale-teal cloth hood */}
        <path
          d="M4.2,16.8 C4.4,11.4 7.2,6.4 13.6,5.8 C16.2,5.6 18.2,6.6 19.4,8.2 C16.8,7.6 13.6,8.0 11.2,10.0 C8.4,12.2 7.6,15.6 7.4,18.4 C6.2,18.2 5.0,17.6 4.2,16.8 Z"
          fill={TEAL_LIGHT}
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path
          d="M9.8,7.8 C8.2,9.8 7.0,12.6 6.2,16.4"
          fill="none"
          stroke={TEAL_DARK}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.vellumdrape',
    label: 'Vellum Drape',
    family: 'sop',
    description: 'Teal cloth sheet draped in vertical folds over an unseen form with a wavy hem.',
    types: ['vellumdrape'],
    icons: ['sop_vellumdrape'],
    refKey: 'SOP_vellumdrape',
    render: () => <VellumClothDrape />,
  },
  {
    id: 'sop.vellumbrush',
    label: 'Vellum Brush',
    family: 'sop',
    description:
      'Wrinkled teal cloth sheet with pinched folds at the bottom, a dashed red brush ring, and a sharpened grey pencil poking into the center.',
    types: ['vellumbrush'],
    icons: ['sop_vellumbrush'],
    refKey: 'SOP_vellumbrush',
    render: () => (
      <g strokeLinejoin="round">
        {/* Wrinkled teal cloth sheet with wavy corners and folds */}
        <path
          d="M2.8,16.6 C4.4,14.4 6.2,13.4 8.6,12.6 C11.4,12.4 14.4,12.4 17.4,13.4 C19.2,14.2 20.6,15.6 21.2,17.2 C19.0,17.8 17.2,17.6 15.6,19.4 C13.8,18.8 11.4,19.2 9.2,20.4 C7.2,19.2 4.8,19.0 2.8,16.6 Z"
          fill={TEAL_MID}
          stroke="#262626"
          strokeWidth="1.1"
        />
        {/* Lit cloth fold ridges */}
        <path
          d="M4.4,16.2 C6.4,14.6 9.2,13.6 12.6,13.8 C15.6,14.0 18.0,15.2 19.6,16.6 C17.2,16.8 15.2,17.2 13.4,18.2 C11.4,17.4 8.8,17.6 6.4,18.4 C5.2,17.6 4.6,16.8 4.4,16.2 Z"
          fill={TEAL_LIGHT}
          stroke="none"
        />
        {/* Cloth crease lines */}
        <path
          d="M6.4,18.2 C7.8,17.2 9.0,16.6 10.2,16.2 M14.8,18.6 C14.6,17.4 14.2,16.6 13.6,16.0"
          fill="none"
          stroke={TEAL_DARK}
          strokeWidth="0.85"
          strokeLinecap="round"
        />
        {/* Dashed red brush influence ring (kept as is) */}
        <ellipse
          cx="11.4"
          cy="15.4"
          rx="3.4"
          ry="1.7"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.0"
          strokeDasharray="1.8 1.2"
        />
        {/* Sharpened grey pencil */}
        <polygon points="12.2,12.2 15.4,4.2 17.2,4.9 13.8,12.9" fill="#eef2f7" stroke="#262626" strokeWidth="0.95" />
        <polygon points="13.0,12.5 16.3,4.5 17.2,4.9 13.8,12.9" fill="#89929e" stroke="none" />
        {/* Pencil cone and dark tip */}
        <polygon points="12.2,12.2 13.8,12.9 11.4,15.4" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
        <polygon points="11.9,14.2 12.5,14.5 11.4,15.4" fill="#262626" stroke="none" />
      </g>
    ),
  },
  {
    id: 'sop.vellumio',
    label: 'Vellum I/O',
    family: 'sop',
    description: 'Open white file folder with a curved teal arrow arcing up and right over the front cover.',
    types: ['vellumio'],
    icons: ['sop_vellumio'],
    refKey: 'SOP_vellumio',
    render: () => (
      <g strokeLinejoin="round">
        {/* Folder back flap */}
        <polygon
          points="3.4,6.4 8.4,6.4 9.8,8.0 17.4,8.0 17.4,18.4 3.4,18.4"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.0"
        />
        {/* Sheet inside */}
        <rect x="5.0" y="8.8" width="11.0" height="8.0" fill="#ffffff" stroke="#262626" strokeWidth="0.85" />
        {/* Tilted front cover */}
        <polygon points="3.4,18.4 6.0,10.6 19.6,10.6 17.4,18.4" fill="#eef2f7" stroke="#262626" strokeWidth="1.0" />
        {/* Curved teal I/O arrow */}
        <path
          d="M11.6,12.4 C12.4,8.8 15.8,7.4 18.8,8.8 L19.8,7.2 L20.8,11.8 L16.2,12.2 L17.4,10.6 C15.2,9.8 13.4,10.6 12.6,12.8 Z"
          fill={TEAL_MID}
          stroke="#262626"
          strokeWidth="0.95"
        />
      </g>
    ),
  },
  {
    id: 'sop.vellumpostprocess',
    label: 'Vellum Post-Process',
    family: 'sop',
    description:
      'Symmetric scalloped teal award rosette centered at (12, 12) with a white inner disc, mirrored star dots, and a centered diagonal teal banner.',
    types: ['vellumpostprocess'],
    icons: ['sop_vellumpostprocess'],
    refKey: 'SOP_vellumpostprocess',
    render: () => (
      <g strokeLinejoin="round">
        {/* Scalloped outer rosette */}
        <path d={rosettePath(12, 12, 9.2, 7.6, 12)} fill={TEAL_LIGHT} stroke="#262626" strokeWidth="0.95" />
        {/* Inner white disc */}
        <circle cx="12" cy="12" r="6.2" fill="#ffffff" stroke="#262626" strokeWidth="0.9" />
        {/* Strictly 180-deg symmetric star dots around (12, 12) */}
        <circle cx="9.1" cy="8.9" r="0.7" fill={TEAL_DARK} />
        <circle cx="11.3" cy="7.8" r="0.8" fill={TEAL_DARK} />
        <circle cx="13.8" cy="7.6" r="0.7" fill={TEAL_DARK} />
        <circle cx="14.9" cy="15.1" r="0.7" fill={TEAL_DARK} />
        <circle cx="12.7" cy="16.2" r="0.8" fill={TEAL_DARK} />
        <circle cx="10.2" cy="16.4" r="0.7" fill={TEAL_DARK} />
        {/* Strictly symmetric folded banner ends */}
        <polygon points="3.55,15.7 5.6,17.0 6.0,15.05" fill={TEAL_DARK} stroke="#262626" strokeWidth="0.8" />
        <polygon points="20.45,8.3 18.4,7.0 18.0,8.95" fill={TEAL_DARK} stroke="#262626" strokeWidth="0.8" />
        {/* Centered diagonal teal banner symmetric around (12, 12) */}
        <polygon
          points="2.85,13.1 20.45,8.3 21.15,10.9 3.55,15.7"
          fill={TEAL_MID}
          stroke="#262626"
          strokeWidth="0.95"
        />
      </g>
    ),
  },
  {
    id: 'sop.vellumrefframe',
    label: 'Vellum Reference Frame',
    family: 'sop',
    description:
      'Eight-corner elongated tilted blue wireframe rectangular prism with four green balls inside white borders.',
    types: ['vellumrefframe'],
    icons: ['sop_vellumrefframe'],
    refKey: 'SOP_vellumrefframe',
    render: () => {
      // 8 corners of an elongated 1.7:1 tilted rectangular prism (fitted inside 1.5..22.5 safe margin)
      const bTop: Pt = [12.4, 2.7];
      const bRight: Pt = [18.0, 8.1];
      const bBot: Pt = [8.4, 17.5];
      const bLeft: Pt = [2.8, 12.1];
      const fTop: Pt = [14.8, 6.2];
      const fRight: Pt = [20.4, 11.6];
      const fBot: Pt = [10.8, 21.0];
      const fLeft: Pt = [5.2, 15.6];
      return (
        <g strokeLinejoin="round">
          {/* Translucent prism silhouette */}
          <polygon
            points={pts([bTop, bRight, fRight, fBot, fLeft, bLeft])}
            fill="#8fc2ff"
            fillOpacity="0.25"
            stroke="none"
          />
          {/* Back interior wireframe edges */}
          <CasedStroke
            d={`M${pts([bLeft])} L${pts([bBot])} L${pts([bRight])} M${pts([bBot])} L${pts([fBot])}`}
            color="#3672c4"
            width={0.9}
            casing={1.6}
          />
          {/* Four green balls with white borders on the elongated faces */}
          <circle cx="11.2" cy="7.2" r="1.2" fill="#58c848" stroke="#ffffff" strokeWidth="0.85" />
          <circle cx="7.4" cy="11.0" r="1.2" fill="#58c848" stroke="#ffffff" strokeWidth="0.85" />
          <circle cx="16.2" cy="11.2" r="1.2" fill="#58c848" stroke="#ffffff" strokeWidth="0.85" />
          <circle cx="12.2" cy="15.0" r="1.2" fill="#58c848" stroke="#ffffff" strokeWidth="0.85" />
          {/* Outer + front wireframe edges (all 8 corners connected) */}
          <CasedStroke
            d={`M${pts([bTop])} L${pts([bRight])} L${pts([fRight])} L${pts([fBot])} L${pts([fLeft])} L${pts([bLeft])} Z M${pts([bTop])} L${pts([fTop])} L${pts([fRight])} M${pts([fTop])} L${pts([fLeft])} M${pts([bRight])} L${pts([fTop])} M${pts([bLeft])} L${pts([fLeft])}`}
            color="#5aa2f2"
            width={1.05}
            casing={1.85}
          />
        </g>
      );
    },
  },
  {
    id: 'sop.vellumrestblend',
    label: 'Vellum Rest Blend',
    family: 'sop',
    description:
      'Three vertical teal panels from back-left to front-right: long flat back panel, gently bowed middle panel, and deeply curved front panel.',
    types: ['vellumrestblend'],
    icons: ['sop_vellumrestblend'],
    refKey: 'SOP_vellumrestblend',
    render: () => (
      <g strokeLinejoin="round">
        {/* Flat back panel (longer) */}
        <polygon points="2.8,5.6 9.6,3.2 9.6,14.6 2.8,17.0" fill={TEAL_LIGHT} stroke="#262626" strokeWidth="0.95" />
        {/* Gently bowed middle panel */}
        <path
          d="M7.2,8.2 Q10.8,6.6 13.6,8.2 L13.6,18.0 Q10.8,16.4 7.2,18.0 Z"
          fill={TEAL_MID}
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Deeply curved front panel (without darker inner shadow) */}
        <path
          d="M11.8,12.0 C12.2,7.8 19.2,7.6 20.8,12.2 L20.8,20.0 C19.2,16.0 12.6,16.2 11.8,20.2 Z"
          fill={TEAL_LIGHT}
          stroke="#262626"
          strokeWidth="0.95"
        />
      </g>
    ),
  },
  {
    id: 'sop.vellumxformpieces',
    label: 'Vellum Transform Pieces',
    family: 'sop',
    description: 'Seven purple kite pieces all oriented toward the upper-left over a soft blue center glow.',
    types: ['vellumxformpieces'],
    icons: ['sop_vellumxformpieces'],
    refKey: 'SOP_vellumxformpieces',
    render: (uid) => {
      const kites: readonly [number, number][] = [
        [7.6, 5.4],
        [15.4, 5.2],
        [5.2, 11.6],
        [11.8, 10.8],
        [18.2, 11.6],
        [8.4, 17.4],
        [15.6, 17.6],
      ];
      return (
        <g strokeLinejoin="round">
          <defs>
            <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8fc2ff" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#8fc2ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Soft blue glow in the middle */}
          <circle cx="12" cy="12" r="9.6" fill={`url(#${uid}-glow)`} stroke="none" />
          {/* Purple kites all oriented toward upper-left (-42 deg) */}
          {kites.map(([kx, ky], idx) => (
            <g key={idx} transform={`translate(${kx}, ${ky}) rotate(-42)`}>
              <line x1="0" y1="1.6" x2="0" y2="3.5" stroke="#262626" strokeWidth="0.9" strokeLinecap="round" />
              <polygon
                points="0,-2.9 2.8,0.8 0,1.9 -2.8,0.8"
                fill={idx % 2 === 0 ? '#d2b8f5' : '#b894e6'}
                stroke="#262626"
                strokeWidth="0.85"
              />
            </g>
          ))}
        </g>
      );
    },
  },
  {
    id: 'sop.agentvellumunpack',
    label: 'Agent Vellum Unpack',
    family: 'sop',
    description: 'Generic standing figure in a blue suit and yellow boots with a red cape billowing to the left.',
    types: ['agentvellumunpack'],
    icons: ['sop_agentvellumunpack'],
    refKey: 'SOP_agentvellumunpack',
    render: () => (
      <g strokeLinejoin="round">
        {/* Billowing red cape */}
        <path
          d="M13.6,7.0 C9.2,7.4 4.8,9.8 3.0,14.6 C5.8,16.2 8.8,17.0 12.2,17.2 L14.6,11.0 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path d="M12.4,8.0 C9.0,8.8 6.0,11.0 4.6,13.8 C6.8,14.6 9.0,15.2 10.8,15.4 Z" fill="#ff7066" stroke="none" />
        {/* Yellow boots */}
        <polygon points="12.6,17.4 14.5,17.4 14.5,20.6 12.0,20.6" fill="#f2c438" stroke="#262626" strokeWidth="0.85" />
        <polygon points="15.0,17.4 16.9,17.4 18.0,20.6 15.0,20.6" fill="#f2c438" stroke="#262626" strokeWidth="0.85" />
        {/* Blue suit body */}
        <path
          d="M12.8,7.4 L16.6,7.4 L18.2,12.2 L16.8,12.8 L16.2,10.6 L16.8,17.4 L15.0,17.4 L14.6,13.6 L14.2,17.4 L12.4,17.4 L12.8,10.6 Z"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Yellow belt */}
        <line x1="12.8" y1="12.4" x2="16.4" y2="12.4" stroke="#f2c438" strokeWidth="1.1" />
        {/* Smooth generic head */}
        <circle cx="14.7" cy="4.8" r="2.0" fill="#5aa2f2" stroke="#262626" strokeWidth="0.95" />
      </g>
    ),
  },
  {
    id: 'sop.grainsource',
    label: 'Grain Source',
    family: 'sop',
    description: 'Pile of light yellow grain capsules enclosed inside a dashed red circle.',
    types: ['grainsource'],
    icons: ['sop_grainsource'],
    refKey: 'SOP_grainsource',
    render: () => (
      <>
        <circle
          cx="12"
          cy="12"
          r="8.5"
          fill="#ffe47a"
          fillOpacity="0.25"
          stroke="#e03228"
          strokeWidth="1.2"
          strokeDasharray="1.8 1.2"
        />
        <g fill="#ffe47a" stroke="#262626" strokeWidth="0.9">
          <ellipse cx="8" cy="12.5" rx="2.4" ry="1.3" transform="rotate(-20 8 12.5)" />
          <ellipse cx="12.5" cy="11.5" rx="2.4" ry="1.3" transform="rotate(15 12.5 11.5)" />
          <ellipse cx="16.2" cy="13" rx="2.2" ry="1.3" transform="rotate(-25 16.2 13)" />
          <ellipse cx="7.5" cy="16" rx="2.4" ry="1.3" transform="rotate(10 7.5 16)" />
          <ellipse cx="12" cy="15.2" rx="2.5" ry="1.3" transform="rotate(-12 12 15.2)" />
          <ellipse cx="15.8" cy="16.5" rx="2.4" ry="1.3" transform="rotate(18 15.8 16.5)" />
          <ellipse cx="11.5" cy="18.2" rx="2.5" ry="1.3" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.clothcapture',
    label: 'Cloth Capture',
    family: 'sop',
    description: 'Orange short-sleeve shirt divided by dark seam lines into polygon panels.',
    types: ['clothcapture'],
    icons: ['sop_clothcapture'],
    refKey: 'SOP_clothcapture',
    render: () => (
      <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M8.5,3.5 L12,5.2 L15.5,3.5 L20.5,7.5 L18,11.5 L16,10 V20.5 H8 V10 L6,11.5 L3.5,7.5 Z" fill="#ee8624" />
        <polygon points="12,5.2 15.5,3.5 20.5,7.5 18,11.5 16,10 16,20.5 12,20.5" fill="#ffb066" />
        <path d="M12,5.2 V20.5 M12,11.5 L16,10 M12,15 L16,15" fill="none" strokeWidth="1" />
      </g>
    ),
  },
  {
    id: 'sop.clothdeform',
    label: 'Cloth Deform',
    family: 'sop',
    description: 'Orange polygon shirt with a bold white left-pointing arrow across the chest.',
    types: ['clothdeform'],
    icons: ['sop_clothdeform'],
    refKey: 'SOP_clothdeform',
    render: () => (
      <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M8.5,3.5 L12,5.2 L15.5,3.5 L20.5,7.5 L18,11.5 L16,10 V20.5 H8 V10 L6,11.5 L3.5,7.5 Z" fill="#ee8624" />
        <polygon points="12,5.2 15.5,3.5 20.5,7.5 18,11.5 16,10 16,20.5 12,20.5" fill="#ffb066" />
        <polygon
          points="7,12 11.5,8 11.5,10.2 16.5,10.2 16.5,13.8 11.5,13.8 11.5,16"
          fill="#f2f4f7"
          strokeWidth="1.1"
        />
      </g>
    ),
  },
];
