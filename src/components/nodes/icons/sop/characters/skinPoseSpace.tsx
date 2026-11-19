import React from 'react';
import { gearPath, type Pt } from '../../geoHelpers';
import { StraightArrow } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { SkinArmBase } from '../kits/skinArm';
import { SolverBrain } from '../kits/solverBrain';

/**
 * Skin and Pose-Space arms.
 * Shared kits: `SkinArmBase` (`kits/skinArm.tsx`, also used by the muscle icons),
 * `PoseSpaceArmBase` and `PoseSpaceBadgeFrame` (private to this file),
 * and `SolverBrain` (reused from `kits/solverBrain.tsx`).
 */

const OUTLINE = '#262626';

const DEFORM_ARROW_TR_FROM: Pt = [11.6, 10.6];

const DEFORM_ARROW_TR_TIP: Pt = [14.8, 7.2];

const DEFORM_ARROW_BL_FROM: Pt = [6.6, 15.6];

const DEFORM_ARROW_BL_TIP: Pt = [3.4, 19.0];

const SOLIDIFY_MESH_LINES = [
  'M4.2,6.4 L7.2,4.4 L10.0,6.8 L6.6,9.6 Z',
  'M4.2,6.4 L6.6,9.6 L3.8,10.6',
  'M6.6,9.6 L10.0,6.8 L11.4,10.4 L7.6,12.8 Z',
  'M6.6,9.6 L7.6,12.8 L4.6,12.4',
  'M10.0,6.8 L12.0,8.6 L11.4,10.4',
].join(' ');

/**
 * Shared golden-tan flexed muscular arm used across the Pose-Space Deform and Edit icons.
 * Matches the silhouette and shading of the approved Pose-Space Deform Combine drawing.
 */
const PoseSpaceArmBase: React.FC<{ uid: string; shiftX?: number }> = ({ uid, shiftX = 0 }) => (
  <>
    <defs>
      <radialGradient id={`${uid}-ps-arm`} cx="45%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#ffddaa" />
        <stop offset="60%" stopColor="#e9b96e" />
        <stop offset="100%" stopColor="#955d03" />
      </radialGradient>
    </defs>
    <path
      transform={shiftX ? `translate(${shiftX}, 0)` : undefined}
      d="M9.8,2.2 C12.4,1.8 15,3 15.2,5.2 C15.2,7.2 13.4,8.5 11.2,8.2 C9.8,8 8.8,7.2 8.4,6.2 C7.6,7.2 7.6,10.2 8.4,13.2 C9.8,11.8 12.4,11.6 15,12.5 C18,13.6 19.2,16.4 17.8,19.4 C13.8,21.8 9.1,21.8 6.1,19.8 C3.2,19.4 1.6,18.2 1.6,15.8 C1.6,12.5 3.4,8.2 6,3.8 C7,2.6 8.4,2.4 9.8,2.2 Z"
      fill={`url(#${uid}-ps-arm)`}
      stroke="#6c4402"
      strokeWidth="0.95"
      strokeLinejoin="round"
    />
  </>
);

/**
 * Shared lower-right dark circular action badge used by Pose-Space Deform Combine, Edit, and
 * Edit Configure.
 */
const PoseSpaceBadgeFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <g>
    <circle cx="16.5" cy="14.8" r="4.8" fill="#1a1a1a" stroke="#eeeeec" strokeWidth="1" />
    {children}
  </g>
);

/**
 * Skin and Pose-Space operators: the arm.
 */
export const SKIN_POSE_SPACE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.skindeform',
    label: 'Skin Deform',
    family: 'sop',
    description: 'Bent blue muscular arm with a curled fist, a striated red bicep patch, and two green outward arrows.',
    types: ['skindeform'],
    icons: ['sop_skindeform'],
    refKey: 'SOP_skindeform',
    render: (uid) => (
      <>
        <SkinArmBase uid={uid} />
        <path
          d="M5.2,7.2 C6.8,6.2 9.4,7.2 11.4,10.0 C12.8,12.0 13.0,14.6 11.6,16.0 C10.0,17.2 7.4,15.8 5.6,13.2 C4.2,11.0 4.0,8.2 5.2,7.2 Z"
          fill="#ff7066"
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M6.0,9.0 C7.8,10.0 9.4,11.8 10.6,14.2 M7.2,8.0 C8.8,9.2 10.4,11.0 11.6,13.2"
          fill="none"
          stroke="#a81f18"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        <StraightArrow from={DEFORM_ARROW_TR_FROM} tip={DEFORM_ARROW_TR_TIP} color="#58c848" width={1.35} head={2.8} />
        <StraightArrow from={DEFORM_ARROW_BL_FROM} tip={DEFORM_ARROW_BL_TIP} color="#58c848" width={1.35} head={2.8} />
      </>
    ),
  },
  {
    id: 'sop.skinproperties',
    label: 'Skin Properties',
    family: 'sop',
    description:
      '90-degree flexed L-shaped arm with a blue hand, vertical dotted grey forearm, orange elbow bend, horizontal purple band, and rounded tan upper arm.',
    types: ['skinproperties'],
    icons: ['sop_skinproperties'],
    refKey: 'SOP_skinproperties',
    render: () => (
      <>
        {/* Blue hand at top-left */}
        <path
          d="M5.2,8.8 L4.0,7.0 C3.6,6.3 4.3,5.7 4.9,6.2 L5.4,6.7 L5.2,3.8 C5.2,3.1 6.1,3.0 6.3,3.8 L6.6,5.8 L7.0,3.2 C7.1,2.5 8.0,2.5 8.0,3.3 L7.9,5.8 L8.6,3.9 C8.9,3.2 9.7,3.5 9.4,4.3 L8.6,8.8 Z"
          fill="#3672c4"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Vertical dotted grey forearm sleeve */}
        <rect
          x="5.2"
          y="8.8"
          width="3.4"
          height="5.6"
          rx="0.4"
          fill="#eef2f7"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <g fill="#5a616b">
          <circle cx="6.5" cy="10.4" r="0.5" />
          <circle cx="7.4" cy="12.0" r="0.5" />
          <circle cx="6.4" cy="13.2" r="0.5" />
        </g>
        {/* 90-degree orange elbow bend */}
        <path
          d="M5.2,14.4 L8.6,14.4 C8.8,15.4 9.5,15.8 10.8,15.8 L10.8,19.4 C7.2,19.4 5.2,17.8 5.2,14.4 Z"
          fill="#ee8624"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Horizontal purple lower-bicep band */}
        <path
          d="M10.8,15.8 L15.0,15.4 L15.0,19.4 L10.8,19.4 Z"
          fill="#8d68b8"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Rounded tan upper-arm cuff */}
        <path
          d="M15.0,15.4 C17.4,14.8 19.6,15.2 20.6,16.8 C21.2,18.0 20.4,19.6 18.6,19.6 L15.0,19.4 Z"
          fill="#e9b96e"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.skinsolidify',
    label: 'Skin Solidify',
    family: 'sop',
    description:
      'Bent blue muscular arm with a curled fist and a white triangulated mesh over the upper-left shoulder.',
    types: ['skinsolidify'],
    icons: ['sop_skinsolidify'],
    refKey: 'SOP_skinsolidify',
    render: (uid) => (
      <>
        <SkinArmBase uid={uid} />
        <path
          d={SOLIDIFY_MESH_LINES}
          fill="none"
          stroke="#eef2f7"
          strokeWidth="0.85"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.skinsolvervellum',
    label: 'Skin Solver Vellum',
    family: 'sop',
    description:
      'Frontal symmetric blue stick figure with a uniform equidistant yellow halo on the left and a pink solver brain on the lower right.',
    types: ['skinsolvervellum'],
    icons: ['sop_skinsolvervellum'],
    refKey: 'SOP_skinsolvervellum',
    render: () => (
      <>
        {/* Frontal symmetric stick figure with uniform equidistant yellow halo (+0.65) and dark casing (+1.35) */}
        <g strokeLinejoin="round" strokeLinecap="round">
          {/* Outer dark casing (r = 1.3 + 1.35 = 2.65, strokeWidth = 1.3 + 2.7 = 4.0) */}
          <circle cx="7.4" cy="4.8" r="2.65" fill={OUTLINE} />
          <path
            d="M7.4,6.4 L7.4,13.0 M4.2,11.2 L7.4,8.2 L10.6,11.2 M4.6,19.4 L7.4,13.0 L10.2,19.4"
            fill="none"
            stroke={OUTLINE}
            strokeWidth="4.0"
          />
          {/* Uniform yellow halo (r = 1.3 + 0.65 = 1.95, strokeWidth = 1.3 + 1.3 = 2.6) */}
          <circle cx="7.4" cy="4.8" r="1.95" fill="#f2c438" />
          <path
            d="M7.4,6.4 L7.4,13.0 M4.2,11.2 L7.4,8.2 L10.6,11.2 M4.6,19.4 L7.4,13.0 L10.2,19.4"
            fill="none"
            stroke="#f2c438"
            strokeWidth="2.6"
          />
          {/* Blue stick figure (r = 1.3, strokeWidth = 1.3) */}
          <circle cx="7.4" cy="4.8" r="1.3" fill="#2e5a9a" />
          <path
            d="M7.4,6.4 L7.4,13.0 M4.2,11.2 L7.4,8.2 L10.6,11.2 M4.6,19.4 L7.4,13.0 L10.2,19.4"
            fill="none"
            stroke="#2e5a9a"
            strokeWidth="1.3"
          />
        </g>
        <SolverBrain cx={15.8} cy={15.8} scale={0.82} />
      </>
    ),
  },
  {
    id: 'sop.posespacedeform',
    label: 'Pose-Space Deform',
    family: 'sop',
    description: 'Golden-tan flexed muscular arm.',
    types: ['posespacedeform'],
    icons: ['sop_posespacedeform'],
    refKey: 'SOP_posespacedeform',
    render: (uid) => <PoseSpaceArmBase uid={uid} shiftX={1.6} />,
  },
  {
    id: 'sop.posespaceeditconfigure',
    label: 'Pose-Space Edit Configure',
    family: 'sop',
    description: 'Golden-tan flexed muscular arm with a black-and-white gear badge on the lower right.',
    types: ['posespaceeditconfigure'],
    icons: ['sop_posespaceeditconfigure'],
    refKey: 'SOP_posespaceeditconfigure',
    render: (uid) => (
      <>
        <PoseSpaceArmBase uid={uid} shiftX={0.5} />
        <PoseSpaceBadgeFrame>
          <path d={gearPath(16.5, 14.8, 8, 3.6, 2.35)} fill="#ffffff" />
          <circle cx="16.5" cy="14.8" r="1.25" fill="#1a1a1a" />
        </PoseSpaceBadgeFrame>
      </>
    ),
  },
  {
    id: 'sop.posespacedeformcombine',
    label: 'Pose-Space Deform Combine',
    family: 'sop',
    description: 'Golden-tan flexed muscular arm with a black-and-white plus badge on the lower right.',
    types: ['posespacedeformcombine'],
    icons: ['sop_posespacedeformcombine'],
    refKey: 'SOP_posespacedeformcombine',
    render: (uid) => (
      <>
        <PoseSpaceArmBase uid={uid} />
        <PoseSpaceBadgeFrame>
          <g stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round">
            <line x1="16.5" y1="12.2" x2="16.5" y2="17.4" />
            <line x1="13.9" y1="14.8" x2="19.1" y2="14.8" />
          </g>
        </PoseSpaceBadgeFrame>
      </>
    ),
  },
  {
    id: 'sop.posespaceedit',
    label: 'Pose-Space Edit',
    family: 'sop',
    description: 'Golden-tan flexed muscular arm with a black-and-white edit pencil badge on the lower right.',
    types: ['posespaceedit'],
    icons: ['sop_posespaceedit'],
    refKey: 'SOP_posespaceedit',
    render: (uid) => (
      <>
        <PoseSpaceArmBase uid={uid} />
        <PoseSpaceBadgeFrame>
          <polygon
            points="14.2,17.2 14.8,15.2 17.6,12.4 19,13.8 16.2,16.6"
            fill="#e3e3e3"
            stroke="#7c7c7c"
            strokeWidth="0.45"
            strokeLinejoin="round"
          />
        </PoseSpaceBadgeFrame>
      </>
    ),
  },
  {
    id: 'sop.posescope',
    label: 'Pose Scope',
    family: 'sop',
    description:
      'Circular green oscilloscope screen displaying a bright pose waveform linked to a cased 3-axis coordinate gizmo.',
    types: ['posescope'],
    icons: ['sop_posescope'],
    refKey: 'SOP_posescope',
    render: () => (
      <>
        <ellipse
          cx="9.4"
          cy="12.2"
          rx="7.3"
          ry="8.3"
          transform="rotate(-18 9.4 12.2)"
          fill="#1b3d20"
          stroke="#262626"
          strokeWidth="1.15"
        />
        <g stroke="#58c848" strokeWidth="0.45" strokeOpacity="0.4">
          <line x1="5" y1="8.5" x2="14" y2="12" />
          <line x1="4" y1="12" x2="14.5" y2="16" />
          <line x1="7" y1="5.5" x2="7" y2="18.5" />
          <line x1="11.5" y1="6.5" x2="11.5" y2="19" />
        </g>
        <path
          d="M3.2,8.2 C4.2,11.8 5.2,12.5 6.8,9.8 C8.4,7.2 8.2,15.8 10.6,16.5 C12.8,17.2 14,10.2 17.8,12"
          fill="none"
          stroke="#112614"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M3.2,8.2 C4.2,11.8 5.2,12.5 6.8,9.8 C8.4,7.2 8.2,15.8 10.6,16.5 C12.8,17.2 14,10.2 17.8,12"
          fill="none"
          stroke="#58c848"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <g stroke="#262626" strokeWidth="2.1" strokeLinecap="round">
          <line x1="17.8" y1="12" x2="17.8" y2="7.5" />
          <line x1="17.8" y1="12" x2="21.8" y2="13.5" />
          <line x1="17.8" y1="12" x2="14.8" y2="14.8" />
        </g>
        <g strokeWidth="1.05" strokeLinecap="round">
          <line x1="17.8" y1="12" x2="17.8" y2="7.5" stroke="#58c848" />
          <line x1="17.8" y1="12" x2="21.8" y2="13.5" stroke="#e03228" />
          <line x1="17.8" y1="12" x2="14.8" y2="14.8" stroke="#5aa2f2" />
        </g>
      </>
    ),
  },
];
