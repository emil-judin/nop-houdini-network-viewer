import React from 'react';
import { roundedRectPath } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { MUSCLE_TONES, MusclePropertiesPanel, MuscleSpindle, type MuscleTone, MuscleTorso } from '../kits/muscle';
import { SolverBrain } from '../kits/solverBrain';

/**
 * Tissue and Otis.
 * Reuses `MuscleSpindle`, `MusclePropertiesPanel`, `MuscleTorso`, and `SolverBrain`.
 */

const OUTLINE = '#262626';

const FRANKEN_TONE: MuscleTone = {
  highlight: '#a6eb98',
  body: '#52d638',
  shadow: '#2d7a21',
  striation: '#2d7a21',
};

/**
 * Isometric 2:1 layered tissue block (pink skin top with pores, pale dermis, yellow fat,
 * red striated muscle). Drawn in local space centered near `(0, 0)`.
 */
const TissueBlock: React.FC<{
  cx?: number;
  cy?: number;
  scale?: number;
}> = ({ cx = 12, cy = 12, scale = 1 }) => {
  const sw = 1.1 / scale;
  const innerSw = 0.7 / scale;

  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`} strokeLinejoin="round" strokeLinecap="round">
      {/* Top face (skin) */}
      <polygon points="0,-7.2 7.6,-3.4 0,0.4 -7.6,-3.4" fill="#ffb8b2" />
      {/* Skin pores */}
      <circle cx="-2.4" cy="-3.6" r="0.55" fill="#ffffff" />
      <circle cx="0.6" cy="-5.0" r="0.5" fill="#ffffff" />
      <circle cx="2.8" cy="-3.2" r="0.55" fill="#ffffff" />
      <circle cx="-0.4" cy="-2.2" r="0.48" fill="#ffffff" />
      <circle cx="1.6" cy="-1.4" r="0.45" fill="#ffffff" />

      {/* Layer 1: dermis (left & right faces, y + 0..2.4) */}
      <polygon points="-7.6,-3.4 0,0.4 0,2.8 -7.6,-1.0" fill="#f7c8ca" />
      <polygon points="0,0.4 7.6,-3.4 7.6,-1.0 0,2.8" fill="#e89ca0" />

      {/* Layer 2: yellow fat (y + 2.4..4.8) */}
      <polygon points="-7.6,-1.0 0,2.8 0,5.2 -7.6,1.4" fill="#ffe47a" />
      <polygon points="0,2.8 7.6,-1.0 7.6,1.4 0,5.2" fill="#f2c438" />
      <circle cx="-4.8" cy="1.5" r="0.45" fill="#d49a18" />
      <circle cx="-2.2" cy="2.8" r="0.45" fill="#d49a18" />
      <circle cx="2.8" cy="2.6" r="0.45" fill="#d49a18" />
      <circle cx="5.2" cy="1.4" r="0.45" fill="#d49a18" />

      {/* Layer 3: red muscle (y + 4.8..8.0) */}
      <polygon points="-7.6,1.4 0,5.2 0,8.4 -7.6,4.6" fill="#e03228" />
      <polygon points="0,5.2 7.6,1.4 7.6,4.6 0,8.4" fill="#a81f18" />
      <path d="M-6.4,3.2 L-1.2,5.8 M1.2,5.8 L6.4,3.2" fill="none" stroke="#ff7066" strokeWidth={0.65 / scale} />

      {/* Layer dividers and center vertical edge */}
      <path
        d="M-7.6,-3.4 L0,0.4 L7.6,-3.4 M-7.6,-1.0 L0,2.8 L7.6,-1.0 M-7.6,1.4 L0,5.2 L7.6,1.4 M0,0.4 V8.4"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={innerSw}
      />
      {/* Outer silhouette */}
      <polygon
        points="0,-7.2 7.6,-3.4 7.6,4.6 0,8.4 -7.6,4.6 -7.6,-3.4"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={sw}
      />
    </g>
  );
};

/**
 * Isometric 2:1 tissue solidify block: pink skin top transitioning into a triangulated
 * wireframe lower half (blue for Vellum, purple for Otis).
 */
const TissueSolidifyBlock: React.FC<{
  variant: 'blue' | 'purple';
}> = ({ variant }) => {
  const leftFill = variant === 'blue' ? '#dce9f8' : '#edd6fc';
  const rightFill = variant === 'blue' ? '#8fc2ff' : '#d896f2';
  const wireLeft = variant === 'blue' ? '#3672c4' : '#9b59b6';
  const wireRight = variant === 'blue' ? '#265394' : '#6f3688';

  return (
    <g transform="translate(12 12) scale(1.02)" strokeLinejoin="round" strokeLinecap="round">
      {/* Top skin face */}
      <polygon points="0,-7.2 7.6,-3.4 0,0.4 -7.6,-3.4" fill="#ffb8b2" />
      <circle cx="-2.4" cy="-3.6" r="0.55" fill="#ffffff" />
      <circle cx="0.6" cy="-5.0" r="0.5" fill="#ffffff" />
      <circle cx="2.8" cy="-3.2" r="0.55" fill="#ffffff" />
      <circle cx="-0.4" cy="-2.2" r="0.48" fill="#ffffff" />
      <circle cx="1.6" cy="-1.4" r="0.45" fill="#ffffff" />

      {/* Upper skin band (y + 0..2.4) */}
      <polygon points="-7.6,-3.4 0,0.4 0,2.8 -7.6,-1.0" fill="#f7c8ca" />
      <polygon points="0,0.4 7.6,-3.4 7.6,-1.0 0,2.8" fill="#e89ca0" />

      {/* Lower wireframe faces (y + 2.4..8.0) */}
      <polygon points="-7.6,-1.0 0,2.8 0,8.4 -7.6,4.6" fill={leftFill} />
      <polygon points="0,2.8 7.6,-1.0 7.6,4.6 0,8.4" fill={rightFill} />

      {/* Triangulated wireframe lines on left face */}
      <path
        d="M-7.6,1.8 L0,5.6 M-3.8,0.9 V6.5 M-7.6,-1.0 L-3.8,6.5 M-3.8,0.9 L0,8.4 M-7.6,4.6 L-3.8,0.9 M-3.8,6.5 L0,2.8"
        fill="none"
        stroke={wireLeft}
        strokeWidth="0.72"
      />
      {/* Triangulated wireframe lines on right face */}
      <path
        d="M0,5.6 L7.6,1.8 M3.8,0.9 V6.5 M0,2.8 L3.8,6.5 M3.8,0.9 L7.6,4.6 M0,8.4 L3.8,0.9 M3.8,6.5 L7.6,-1.0"
        fill="none"
        stroke={wireRight}
        strokeWidth="0.72"
      />

      {/* Top skin edge & center vertical edge */}
      <path
        d="M-7.6,-3.4 L0,0.4 L7.6,-3.4 M-7.6,-1.0 L0,2.8 L7.6,-1.0 M0,0.4 V8.4"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="0.75"
      />
      {/* Outer silhouette */}
      <polygon
        points="0,-7.2 7.6,-3.4 7.6,4.6 0,8.4 -7.6,4.6 -7.6,-3.4"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="1.08"
      />
    </g>
  );
};

/**
 * Tissue and Otis operators.
 */
export const TISSUE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.tissueproperties',
    label: 'Tissue Properties Vellum',
    family: 'sop',
    description:
      'Layered isometric tissue block with a green-bordered property panel card at top-left and a callout dot.',
    types: ['tissueproperties'],
    icons: ['sop_tissueproperties'],
    refKey: 'SOP_tissueproperties',
    render: () => (
      <>
        <TissueBlock cx={13.5} cy={13.8} scale={0.84} />
        <MusclePropertiesPanel accent="#58c848" targetX={12.0} targetY={12.6} />
      </>
    ),
  },
  {
    id: 'sop.tissuepropertiesotis',
    label: 'Tissue Properties Otis',
    family: 'sop',
    description:
      'Layered isometric tissue block with a purple-bordered Otis property panel card at top-left and a callout dot.',
    types: ['tissuepropertiesotis'],
    icons: ['sop_tissuepropertiesotis'],
    refKey: 'SOP_tissuepropertiesotis',
    render: () => (
      <>
        <TissueBlock cx={13.5} cy={13.8} scale={0.84} />
        <MusclePropertiesPanel accent="#9b59b6" targetX={12.0} targetY={12.6} />
      </>
    ),
  },
  {
    id: 'sop.tissuesolidify',
    label: 'Tissue Solidify',
    family: 'sop',
    description:
      'Isometric tissue block with a pink skin top transitioning into a blue triangulated wireframe lower half.',
    types: ['tissuesolidify'],
    icons: ['sop_tissuesolidify'],
    refKey: 'SOP_tissuesolidify',
    render: () => <TissueSolidifyBlock variant="blue" />,
  },
  {
    id: 'sop.tissuesolidifyotis',
    label: 'Tissue Solidify Otis',
    family: 'sop',
    description:
      'Isometric tissue block with a pink skin top transitioning into a purple triangulated wireframe lower half.',
    types: ['tissuesolidifyotis'],
    icons: ['sop_tissuesolidifyotis'],
    refKey: 'SOP_tissuesolidifyotis',
    render: () => <TissueSolidifyBlock variant="purple" />,
  },
  {
    id: 'sop.tissuesolvervellum',
    label: 'Tissue Solver Vellum',
    family: 'sop',
    description:
      'Layered isometric tissue block in the upper-left paired with the pink symmetrical solver brain in the lower-right.',
    types: ['tissuesolvervellum'],
    icons: ['sop_tissuesolvervellum'],
    refKey: 'SOP_tissuesolvervellum',
    render: () => (
      <>
        <TissueBlock cx={10.2} cy={10.6} scale={0.82} />
        <SolverBrain cx={16.0} cy={16.2} scale={0.8} />
      </>
    ),
  },
  {
    id: 'sop.otisconfiguremuscleandtissue',
    label: 'Otis Muscle and Tissue Configure',
    family: 'sop',
    description:
      'Bent arm with a grey skeletal hand, red striated forearm muscle, and purple upper-arm tissue wrap, paired with a purple-bordered property card at top-right.',
    types: ['otisconfiguremuscleandtissue'],
    icons: ['sop_otisconfiguremuscleandtissue'],
    refKey: 'SOP_otisconfiguremuscleandtissue',
    render: () => {
      const cardX = 10.6;
      const cardY = 2.2;
      const cardW = 10.8;
      const cardH = 6.4;
      const targetX = cardX + 4.4;
      const targetY = 14.8;
      const callout = `M${targetX},${cardY + cardH} L${targetX},${targetY}`;

      return (
        <g strokeLinejoin="round" strokeLinecap="round">
          {/* Grey skeletal hand on upper-left */}
          <path
            d="M4.2,8.8 L3.2,5.8 L4.0,5.4 L5.0,8.0 L4.6,4.4 L5.6,4.2 L6.0,7.8 L6.4,4.4 L7.4,4.6 L6.8,8.2 L7.8,6.2 L8.6,6.6 L7.0,9.4 Z"
            fill="#eef2f7"
            stroke={OUTLINE}
            strokeWidth="0.9"
          />
          {/* Red striated forearm curving down to elbow */}
          <path
            d="M4.6,9.2 C4.8,14.2 6.8,18.8 10.2,19.8 C11.8,20.2 13.0,19.0 13.2,17.2 C10.4,17.2 8.2,14.2 7.2,9.0 Z"
            fill="#e03228"
            stroke={OUTLINE}
            strokeWidth="1.0"
          />
          <path
            d="M5.7,10.6 C6.0,14.2 7.6,17.2 10.0,18.2 M6.6,10.2 C7.2,13.6 8.6,16.2 11.0,17.4"
            fill="none"
            stroke="#ffb8b2"
            strokeWidth="0.7"
          />
          {/* Purple upper-arm tissue sleeve */}
          <path
            d="M10.4,19.8 C13.8,20.4 17.4,17.0 18.6,12.2 L14.4,11.0 C13.6,14.0 11.6,16.2 9.8,16.8 C9.2,17.8 9.4,19.2 10.4,19.8 Z"
            fill={MUSCLE_TONES.purple.body}
            stroke={OUTLINE}
            strokeWidth="1.0"
          />
          <path
            d="M14.8,11.8 C14.2,14.4 12.6,16.6 10.8,17.6"
            fill="none"
            stroke={MUSCLE_TONES.purple.highlight}
            strokeWidth="0.85"
          />

          {/* Top-right purple property card + cased callout */}
          <CasedStroke d={callout} color="#9b59b6" width={1.0} casing={2.1} />
          <circle cx={targetX} cy={targetY} r="1.15" fill="#ffffff" stroke={OUTLINE} strokeWidth="0.85" />
          <path
            d={roundedRectPath(cardX, cardY, cardW, cardH, 1.1)}
            fill="#ffffff"
            stroke={OUTLINE}
            strokeWidth="1.05"
          />
          <path
            d={roundedRectPath(cardX + 0.55, cardY + 0.55, cardW - 1.1, cardH - 1.1, 0.7)}
            fill="none"
            stroke="#9b59b6"
            strokeWidth="0.8"
          />
          <circle cx={cardX + 3.0} cy={cardY + 3.2} r="1.7" fill="#c0c7d1" stroke={OUTLINE} strokeWidth="0.6" />
          <path
            d={`M${cardX + 3.0},${cardY + 3.2} L${cardX + 3.0},${cardY + 1.5} A1.7,1.7 0 0,1 ${cardX + 4.65},${cardY + 3.6} Z`}
            fill="#9b59b6"
          />
          <rect x={cardX + 5.6} y={cardY + 1.8} width="3.5" height="1.1" rx="0.3" fill="#5aa2f2" />
          <rect x={cardX + 5.6} y={cardY + 3.5} width="2.6" height="1.1" rx="0.3" fill="#89929e" />
        </g>
      );
    },
  },
  {
    id: 'sop.otissolver',
    label: 'Otis Solver',
    family: 'sop',
    description:
      'Red muscular upper-body figure on the left paired with the pink symmetrical solver brain in the lower-right.',
    types: ['otissolver'],
    icons: ['sop_otissolver'],
    refKey: 'SOP_otissolver',
    render: () => (
      <>
        <MuscleTorso cx={9.4} cy={11.8} scale={0.98} fill="#ff7066" highlight="#ffb8b2" shadow="#a81f18" pose="bust" />
        <SolverBrain cx={16.0} cy={16.4} scale={0.8} />
      </>
    ),
  },
  {
    id: 'sop.vellumconfiguremuscles',
    label: 'Vellum Configure Muscles',
    family: 'sop',
    description: 'Red muscular upper-body figure centered on the canvas.',
    types: ['vellumconfiguremuscles'],
    icons: ['sop_vellumconfiguremuscles'],
    refKey: 'SOP_vellumconfiguremuscles',
    render: () => (
      <MuscleTorso cx={12.0} cy={12.4} scale={1.18} fill="#ff7066" highlight="#ffb8b2" shadow="#a81f18" pose="bust" />
    ),
  },
  {
    id: 'sop.vellumconfiguretissue',
    label: 'Vellum Configure Tissue',
    family: 'sop',
    description: 'Layered isometric tissue block (skin, fat, and muscle) centered on the canvas.',
    types: ['vellumconfiguretissue'],
    icons: ['sop_vellumconfiguretissue'],
    refKey: 'SOP_vellumconfiguretissue',
    render: () => <TissueBlock cx={12.0} cy={12.2} scale={1.02} />,
  },
  {
    id: 'sop.frankenmuscle',
    label: 'Franken Muscle',
    family: 'sop',
    description:
      'Diagonal green striated muscle spindle from bottom-left to top-right with rounded white and grey tendon tips and dark stitch marks.',
    types: ['frankenmuscle'],
    icons: ['sop_frankenmuscle'],
    refKey: 'SOP_frankenmuscle',
    render: () => (
      <g strokeLinejoin="round" strokeLinecap="round">
        <MuscleSpindle cx={12} cy={12} len={22} width={8.6} angleDeg={-45} tone={FRANKEN_TONE} />
        {/* Dark stitch seam and cross-ticks along the belly */}
        <g transform="translate(12 12) rotate(-45)">
          <path
            d="M-6.4,0.2 Q0,-0.4 6.4,0.2 M-4.4,-1.8 L-3.8,2.0 M-1.6,-2.2 L-1.0,1.8 M1.4,-2.2 L2.0,1.8 M4.2,-1.8 L4.8,1.8"
            fill="none"
            stroke={OUTLINE}
            strokeWidth="0.8"
          />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.frankenmusclepaint',
    label: 'Franken Muscle Paint',
    family: 'sop',
    description:
      'Diagonal wooden paintbrush with green sparkles on the upper-left painting a small green patch near a white tendon tip, with dark stitch lines extending to the left.',
    types: ['frankenmusclepaint'],
    icons: ['sop_frankenmusclepaint'],
    refKey: 'SOP_frankenmusclepaint',
    render: () => (
      <g strokeLinejoin="round" strokeLinecap="round">
        {/* Pale tendon tip on bottom-right */}
        <path
          d="M13.6,17.4 C16.4,16.8 19.2,17.4 19.8,18.8 C20.0,20.0 17.2,20.8 13.6,20.4 Z"
          fill="#ffffff"
          stroke={OUTLINE}
          strokeWidth="0.95"
        />
        {/* Small green painted patch only near the white tendon end */}
        <path
          d="M10.2,18.6 C11.2,16.4 14.0,16.4 15.4,17.8 C16.0,18.6 15.8,20.4 14.4,20.8 C12.6,21.4 10.6,20.6 10.2,18.6 Z"
          fill="#52d638"
          stroke={OUTLINE}
          strokeWidth="1.0"
        />
        {/* Stitches extending across the unpainted muscle outline on the left */}
        <path
          d="M4.0,19.4 Q8.4,17.0 13.2,19.0 M5.0,17.4 L6.2,20.2 M7.4,16.6 L8.2,19.8 M10.0,16.8 L10.6,20.0 M12.4,17.4 L12.8,20.2"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="0.85"
        />
        {/* Green sparkles on upper-left */}
        <path
          d="M5.6,9.0 L6.3,10.7 L8.0,11.4 L6.3,12.1 L5.6,13.8 L4.9,12.1 L3.2,11.4 L4.9,10.7 Z"
          fill="#a6eb98"
          stroke={OUTLINE}
          strokeWidth="0.65"
        />
        <path
          d="M8.8,6.2 L9.4,7.5 L10.7,8.1 L9.4,8.7 L8.8,10.0 L8.2,8.7 L6.9,8.1 L8.2,7.5 Z"
          fill="#a6eb98"
          stroke={OUTLINE}
          strokeWidth="0.65"
        />
        {/* Diagonal paintbrush */}
        <path
          d="M9.4,2.8 C10.4,2.0 11.8,2.3 12.4,3.3 L16.4,12.2 L13.6,13.5 L9.2,4.3 C8.9,3.7 9.0,3.1 9.4,2.8 Z"
          fill="#ffb066"
          stroke={OUTLINE}
          strokeWidth="1.0"
        />
        <line x1="10.8" y1="3.8" x2="14.8" y2="12.0" stroke="#ffe47a" strokeWidth="1.0" />
        {/* Ferrule */}
        <polygon points="13.6,13.5 16.4,12.2 17.2,14.2 14.4,15.5" fill="#ffffff" stroke={OUTLINE} strokeWidth="0.9" />
        {/* Bristle tip */}
        <path
          d="M14.4,15.5 L17.2,14.2 L18.0,18.2 C16.4,18.0 15.0,16.8 14.4,15.5 Z"
          fill="#52d638"
          stroke={OUTLINE}
          strokeWidth="0.9"
        />
      </g>
    ),
  },
];
