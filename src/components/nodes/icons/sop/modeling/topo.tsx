import React from 'react';
import { isoBoxFaces, type Pt, pts } from '../../geoHelpers';
import { StraightArrow } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

/**
 * The Topo family.
 *
 * Shared kit: `TopoMask` draws a generic smooth light-blue front-facing face mask with small
 * side ears, eye slits, nose/mouth hint, and configurable black topology landmark dots.
 * Reused by `sop.topoflow` (paired masks) and `sop.topoflowsample` (single large mask).
 */

const OUTLINE = '#262626';

const BLUE_HI = '#8fc2ff';

const BLUE_MID = '#5aa2f2';

const BLUE_SHAD = '#3672c4';

const BLUE_DEEP = '#2e5a9a';

/**
 * Generic smooth light-blue face mask in local coordinates centered at `(0, 0)` (roughly
 * `-7..7` wide by `-9.5..9.5` tall), scaled by `scale` and placed at `(cx, cy)`.
 */
const TopoMask: React.FC<{
  gradId: string;
  cx: number;
  cy: number;
  scale?: number;
  dots: readonly Pt[];
  dotR?: number;
}> = ({ gradId, cx, cy, scale = 1, dots, dotR = 0.72 }) => {
  const sw = 1.05 / scale;
  const earSw = 0.9 / scale;
  const slitSw = 0.75 / scale;
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`} strokeLinejoin="round">
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="78%">
          <stop offset="0%" stopColor={BLUE_HI} />
          <stop offset="68%" stopColor={BLUE_MID} />
          <stop offset="100%" stopColor={BLUE_SHAD} />
        </radialGradient>
      </defs>
      {/* Left and right ears */}
      <ellipse cx="-6.3" cy="0.3" rx="1.25" ry="2.2" fill={BLUE_MID} stroke={OUTLINE} strokeWidth={earSw} />
      <ellipse cx="6.3" cy="0.3" rx="1.25" ry="2.2" fill={BLUE_SHAD} stroke={OUTLINE} strokeWidth={earSw} />
      {/* Smooth generic oval face */}
      <path
        d="M0,-8.8 C4.1,-8.8 6.0,-5.8 5.9,-1.4 C5.8,3.4 3.4,8.7 0,8.9 C-3.4,8.7 -5.8,3.4 -5.9,-1.4 C-6.0,-5.8 -4.1,-8.8 0,-8.8 Z"
        fill={`url(#${gradId})`}
        stroke={OUTLINE}
        strokeWidth={sw}
      />
      {/* Subtle eye slits */}
      <ellipse cx="-2.4" cy="-1.2" rx="1.15" ry="0.65" fill={BLUE_DEEP} stroke={OUTLINE} strokeWidth={slitSw} />
      <ellipse cx="2.4" cy="-1.2" rx="1.15" ry="0.65" fill={BLUE_DEEP} stroke={OUTLINE} strokeWidth={slitSw} />
      {/* Nose bridge and mouth hint */}
      <path
        d="M0,-0.4 L0,2.3 M-1.4,5.0 Q0,5.6 1.4,5.0"
        fill="none"
        stroke={BLUE_DEEP}
        strokeWidth={slitSw}
        strokeLinecap="round"
      />
      {/* Black topology landmark dots */}
      {dots.map(([dx, dy], idx) => (
        <circle key={idx} cx={dx} cy={dy} r={dotR} fill={OUTLINE} />
      ))}
    </g>
  );
};

const FLOW_MASK_DOTS: readonly Pt[] = [
  [0, -6.2],
  [-3.2, -4.6],
  [3.2, -4.6],
  [-3.6, 1.8],
  [3.6, 1.8],
  [-1.9, 3.3],
  [1.9, 3.3],
  [0, 6.9],
];

const SAMPLE_MASK_DOTS: readonly Pt[] = [
  [0, -6.8],
  [-3.2, -5.8],
  [3.2, -5.8],
  [-4.2, -3.4],
  [0, -3.6],
  [4.2, -3.4],
  [-4.1, 1.5],
  [4.1, 1.5],
  [-2.2, 3.1],
  [2.2, 3.1],
  [-2.7, 5.8],
  [2.7, 5.8],
  [0, 7.2],
];

const LANDMARK_PLINTH = isoBoxFaces(12, 14.7, 5.3, 1.9);

/**
 * Topo operators: topology flow, landmarks and transfer.
 */
export const TOPO_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.topoflow',
    label: 'Topo Flow',
    family: 'sop',
    description:
      'Two generic smooth light-blue face masks side by side, each marked with black topology landmark dots.',
    types: ['topoflow'],
    icons: ['sop_topoflow'],
    refKey: 'SOP_topoflow',
    render: (uid) => (
      <>
        <TopoMask gradId={`${uid}-l`} cx={6.7} cy={12} scale={0.62} dots={FLOW_MASK_DOTS} dotR={0.95} />
        <TopoMask gradId={`${uid}-r`} cx={17.3} cy={12} scale={0.62} dots={FLOW_MASK_DOTS} dotR={0.95} />
      </>
    ),
  },
  {
    id: 'sop.topoflowsample',
    label: 'Topo Flow Sample',
    family: 'sop',
    description: 'A single large generic smooth light-blue face mask covered with black topology landmark sample dots.',
    types: ['topoflowsample'],
    icons: ['sop_topoflowsample'],
    refKey: 'SOP_topoflowsample',
    render: (uid) => <TopoMask gradId={`${uid}-m`} cx={12} cy={12} scale={1.0} dots={SAMPLE_MASK_DOTS} dotR={0.76} />,
  },
  {
    id: 'sop.topolandmark',
    label: 'Topo Landmark',
    family: 'sop',
    description:
      'A red and white striped lighthouse standing on a yellow isometric plinth with a dark gallery ring, glowing yellow lantern room, and red dome cap.',
    types: ['topolandmark'],
    icons: ['sop_topolandmark'],
    refKey: 'SOP_topolandmark',
    render: (uid) => {
      const towerPath = 'M9.3,7.2 L14.7,7.2 L16.3,17.8 L7.7,17.8 Z';
      const bands: Array<{ y0: number; y1: number; fill: string }> = [
        { y0: 15.5, y1: 18.0, fill: '#ffffff' },
        { y0: 13.4, y1: 15.5, fill: '#e03228' },
        { y0: 11.2, y1: 13.4, fill: '#ffffff' },
        { y0: 9.2, y1: 11.2, fill: '#e03228' },
        { y0: 7.0, y1: 9.2, fill: '#ffffff' },
      ];
      return (
        <g strokeLinejoin="round">
          <defs>
            <clipPath id={`${uid}-tower`}>
              <path d={towerPath} />
            </clipPath>
          </defs>
          {/* Isometric yellow-gold plinth */}
          <polygon points={pts(LANDMARK_PLINTH.top)} fill="#ffe47a" stroke={OUTLINE} strokeWidth="0.95" />
          <polygon points={pts(LANDMARK_PLINTH.left)} fill="#f2c438" stroke={OUTLINE} strokeWidth="0.95" />
          <polygon points={pts(LANDMARK_PLINTH.right)} fill="#d49a18" stroke={OUTLINE} strokeWidth="0.95" />
          {/* Striped tapered tower without thick internal dividers */}
          <g clipPath={`url(#${uid}-tower)`}>
            {bands.map((b, i) => (
              <rect key={i} x="7.0" y={b.y0} width="10" height={b.y1 - b.y0 + 0.1} fill={b.fill} />
            ))}
          </g>
          <path d={towerPath} fill="none" stroke={OUTLINE} strokeWidth="1.05" />
          {/* Dark grey gallery deck */}
          <rect x="8.6" y="6.2" width="6.8" height="1.1" rx="0.3" fill="#3a3f47" stroke={OUTLINE} strokeWidth="0.9" />
          {/* Glowing yellow lantern room */}
          <rect x="9.6" y="3.9" width="4.8" height="2.3" fill="#ffe47a" stroke={OUTLINE} strokeWidth="0.9" />
          {/* Red dome cap and finial */}
          <path d="M9.2,3.9 Q12,2.1 14.8,3.9 Z" fill="#e03228" stroke={OUTLINE} strokeWidth="0.95" />
          <line x1="12" y1="2.4" x2="12" y2="2.0" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" />
        </g>
      );
    },
  },
  {
    id: 'sop.toposlidebycurverefs',
    label: 'Topo Slide By Curve Refs',
    family: 'sop',
    description:
      'A generic smooth blue three-quarter head bust facing right with a small orange nose-shaped curve marker on the left, a red lip mark centered on the blue neck, and a short bright green arrow pointing right across the lower cheek.',
    types: ['toposlidebycurverefs'],
    icons: ['sop_toposlidebycurverefs'],
    refKey: 'SOP_toposlidebycurverefs',
    render: (uid) => (
      <g strokeLinejoin="round">
        <defs>
          <radialGradient id={`${uid}-head`} cx="35%" cy="30%" r="72%">
            <stop offset="0%" stopColor={BLUE_HI} />
            <stop offset="55%" stopColor={BLUE_MID} />
            <stop offset="100%" stopColor={BLUE_SHAD} />
          </radialGradient>
        </defs>
        {/* Generic smooth 3/4 head bust */}
        <path
          d="M9.0,17.7 L8.7,21.0 C10.4,21.8 13.4,21.8 15.0,20.9 L14.5,17.2 C16.3,16.5 17.5,15.0 17.7,13.5 L18.6,12.9 C19.0,12.5 18.8,11.7 17.9,10.9 L17.6,9.4 C17.7,5.2 15.2,2.4 11.7,2.4 C7.9,2.4 5.7,5.4 6.1,9.7 C6.4,13.3 7.6,16.0 9.0,17.7 Z"
          fill={`url(#${uid}-head)`}
          stroke={OUTLINE}
          strokeWidth="1.05"
        />
        {/* Subtle brow and eye shadow on the right cheek */}
        <path
          d="M13.3,8.6 Q15.0,8.2 16.4,8.9"
          fill="none"
          stroke={BLUE_DEEP}
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <ellipse cx="14.9" cy="9.9" rx="0.9" ry="0.55" fill={BLUE_DEEP} />
        {/* Orange nose-shaped curve marker on the left */}
        <path
          d="M5.6,10.4 C4.4,10.6 4.3,13.8 5.8,14.3 C6.9,14.6 7.5,13.4 7.2,11.9 C7.0,10.8 6.3,10.3 5.6,10.4 Z"
          fill="#ee8624"
          stroke={OUTLINE}
          strokeWidth="0.9"
        />
        {/* Red lip accent centered on the blue neck */}
        <path
          d="M10.5,18.7 C11.4,18.1 12.9,18.5 12.6,19.5 C12.3,20.2 10.8,20.3 10.2,19.7 C9.9,19.3 10.0,18.9 10.5,18.7 Z"
          fill="#e03228"
          stroke={OUTLINE}
          strokeWidth="0.8"
        />
        {/* Short bright green right-pointing arrow across the lower cheek */}
        <StraightArrow from={[7.8, 12.2]} tip={[14.7, 12.2]} color="#58c848" width={2.0} head={3.4} />
      </g>
    ),
  },
  {
    id: 'sop.topotransfer',
    label: 'Topo Transfer',
    family: 'sop',
    description:
      'Two generic smooth blue head busts back to back across a central vertical seam: an angular left-facing profile on the left and a sharp-featured three-quarter head on the right.',
    types: ['topotransfer'],
    icons: ['sop_topotransfer'],
    refKey: 'SOP_topotransfer',
    render: (uid) => (
      <g strokeLinejoin="round">
        <defs>
          <linearGradient id={`${uid}-l`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={BLUE_HI} />
            <stop offset="65%" stopColor={BLUE_MID} />
            <stop offset="100%" stopColor={BLUE_SHAD} />
          </linearGradient>
          <linearGradient id={`${uid}-r`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={BLUE_MID} />
            <stop offset="65%" stopColor={BLUE_SHAD} />
            <stop offset="100%" stopColor={BLUE_DEEP} />
          </linearGradient>
        </defs>
        {/* Left generic head profile facing left */}
        <path
          d="M11.6,4.0 C8.2,4.0 6.1,6.0 5.9,8.9 L4.0,12.2 L5.7,12.9 L5.4,14.5 L6.2,15.3 C6.1,16.5 6.8,17.3 8.1,17.4 L8.1,20.2 L11.6,20.2 Z"
          fill={`url(#${uid}-l)`}
          stroke={OUTLINE}
          strokeWidth="1.05"
        />
        {/* Subtle eye hint on left profile */}
        <path d="M6.4,9.8 L7.7,9.8" fill="none" stroke={BLUE_DEEP} strokeWidth="0.75" strokeLinecap="round" />
        {/* Right generic angular 3/4 head facing right */}
        <path
          d="M12.4,4.0 L17.6,4.0 L19.1,6.6 L18.7,9.8 L20.4,12.4 L18.8,13.1 L19.0,14.3 L18.3,15.0 L18.5,15.8 L17.6,17.4 L15.8,17.6 L15.8,20.2 L12.4,20.2 Z"
          fill={`url(#${uid}-r)`}
          stroke={OUTLINE}
          strokeWidth="1.05"
        />
        {/* Single brow and eye on the right-facing cheek */}
        <path d="M16.4,9.0 L18.5,9.1" fill="none" stroke={OUTLINE} strokeWidth="0.7" strokeLinecap="round" />
        <ellipse cx="17.4" cy="10.1" rx="0.8" ry="0.45" fill={BLUE_HI} stroke={OUTLINE} strokeWidth="0.65" />
        {/* Central vertical seam */}
        <line x1="12" y1="3.4" x2="12" y2="20.7" stroke={OUTLINE} strokeWidth="1.0" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'sop.topobuild',
    label: 'TopoBuild',
    family: 'sop',
    description: 'Clean blue-outlined quad cage (new topology) placed over a pink high-resolution sculpt.',
    types: ['topobuild'],
    refKey: 'SOP_topobuild',
    render: () => (
      <>
        {/* High-res sculpt */}
        <path
          d="M6 9C8 4 13 3.5 16 5C19 3.5 22.5 7 21.5 11C22.5 14.5 19 17.5 15.5 16.5C12 18 7.5 16 6 13Z"
          fill="#f3dede"
          stroke="#c04848"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M13 5.5C15 8 15 12 13.5 16.5M17.5 5C19 8 19.5 12 18 16.2M8 7.5C12 9 17 9 21.5 9.5M7 12.5C11 13.5 16 13.5 21.8 13"
          fill="none"
          stroke="#e07a7a"
          strokeWidth="0.6"
        />
        {/* New quad topology cage */}
        <g stroke="#1d3c5e" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="2.5,10 8.5,7 13,9.5 7,12.5" fill="#eef2f7" />
          <polygon points="2.5,10 7,12.5 7,19.5 2.5,17" fill="#dfe4ea" />
          <polygon points="7,12.5 13,9.5 13,16.5 7,19.5" fill="#c0c7d1" />
        </g>
        <path
          d="M5.5 8.5L10 11M4.75 11.25L10.75 8.25M4.75 11.25V18.25M2.5 13.5L7 16M10 11V18M7 16L13 13"
          fill="none"
          stroke="#2e5a8c"
          strokeWidth="0.8"
        />
      </>
    ),
  },
];
