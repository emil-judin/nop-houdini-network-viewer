import { CasedStroke } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import {
  KINEFX_BLUE_DARK,
  KINEFX_BLUE_LIGHT,
  KINEFX_BLUE_MID,
  KINEFX_GREEN,
  KINEFX_OUTLINE,
  KinefxGearBadge,
  KinefxJointLimb,
  KinefxSkeletonFigure,
  KinefxStandingFigure,
} from '../../kits/kinefx';

/**
 * KineFX IK and retargeting operators.
 */
export const KINEFX_IK_RETARGET_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.fullbodyik',
    label: 'Full Body IK',
    family: 'sop',
    description: 'Dynamic lunging blue KineFX figure with one arm reaching forward-right and a light-blue rim.',
    types: ['fullbodyik'],
    icons: ['sop_kinefx-fullbodyik'],
    refKey: 'SOP_kinefx-fullbodyik',
    render: () => (
      <g strokeLinejoin="round">
        <circle cx="11.4" cy="4.4" r="1.8" fill={KINEFX_BLUE_MID} stroke={KINEFX_OUTLINE} strokeWidth="1.0" />
        <path
          d="M9.6,7.0 L13.4,7.0 L19.6,6.4 L19.6,7.8 L14.0,9.0 L13.0,13.2 L16.8,20.6 L14.8,20.8 L11.4,15.0 L7.4,20.8 L5.6,20.2 L9.2,12.8 L9.2,9.2 L6.0,13.2 L4.6,12.2 L8.2,7.8 Z"
          fill={KINEFX_BLUE_MID}
          stroke={KINEFX_OUTLINE}
          strokeWidth="1.05"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.fbikconfiguretargets',
    label: 'Full Body IK Configure Targets',
    family: 'sop',
    description:
      'Upper bent blue arm and equally thick lower neutral blue arm with five-fingered hand on the left and connected green joints, framing a red-and-white bullseye target between them.',
    types: ['fbikconfiguretargets'],
    icons: ['sop_kinefx-fbikconfiguretargets'],
    refKey: 'SOP_kinefx-fbikconfiguretargets',
    render: () => (
      <g strokeLinejoin="round">
        {/* Lower neutral arm with 5-fingered hand and thinner black outlines */}
        <g transform="translate(13.6 17.9) scale(1.12) translate(-13.6 -18.4)">
          <path
            d="M10.4,18.0 L15.2,18.0 L19.2,15.6 L20.4,17.8 L15.8,20.6 L10.4,20.6 Z"
            fill={KINEFX_BLUE_MID}
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.6"
          />
          <path
            d="M10.4,18.1 L8.6,17.2 L7.8,17.8 L9.1,18.5 L7.0,18.1 L6.9,18.8 L9.0,19.1 L6.8,19.3 L6.9,20.0 L9.1,19.7 L7.2,20.5 L7.6,21.2 L9.5,20.2 L8.8,21.5 L9.6,21.8 L10.6,20.4 Z"
            fill={KINEFX_BLUE_MID}
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.6"
          />
          <path
            d="M10.4,19.3 L15.2,19.3 L19.0,17.0"
            fill="none"
            stroke={KINEFX_GREEN}
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <circle cx="10.4" cy="19.3" r="1.25" fill={KINEFX_GREEN} stroke={KINEFX_OUTLINE} strokeWidth="0.6" />
          <circle cx="15.2" cy="19.3" r="1.25" fill={KINEFX_GREEN} stroke={KINEFX_OUTLINE} strokeWidth="0.6" />
          <circle cx="19.0" cy="17.0" r="1.25" fill={KINEFX_GREEN} stroke={KINEFX_OUTLINE} strokeWidth="0.6" />
        </g>
        {/* Upper bent arm with thinner black outlines */}
        <KinefxJointLimb x={13.2} y={9.6} scale={0.82} connectJoints strokeWidth={0.62} />
        {/* Red-and-white bullseye target between the two arms */}
        <circle cx="6.8" cy="13.0" r="3.5" fill="#ffffff" stroke={KINEFX_OUTLINE} strokeWidth="0.95" />
        <circle cx="6.8" cy="13.0" r="2.15" fill="none" stroke="#e03228" strokeWidth="1.15" />
        <circle cx="6.8" cy="13.0" r="0.85" fill={KINEFX_BLUE_DARK} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.ikchains',
    label: 'IK Chains',
    family: 'sop',
    description:
      'Upper bent blue arm and equally thick lower neutral blue arm with five-fingered hand on the left and connected green joints, framing a black round gear badge between them.',
    types: ['ikchains'],
    icons: ['sop_kinefx-ikchains', 'sop_kinefx-ikchains-2.0'],
    refKey: 'SOP_kinefx-ikchains',
    render: () => (
      <g strokeLinejoin="round">
        {/* Lower neutral arm with 5-fingered hand and thinner black outlines */}
        <g transform="translate(13.6 17.9) scale(1.12) translate(-13.6 -18.4)">
          <path
            d="M10.4,18.0 L15.2,18.0 L19.2,15.6 L20.4,17.8 L15.8,20.6 L10.4,20.6 Z"
            fill={KINEFX_BLUE_MID}
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.6"
          />
          <path
            d="M10.4,18.1 L8.6,17.2 L7.8,17.8 L9.1,18.5 L7.0,18.1 L6.9,18.8 L9.0,19.1 L6.8,19.3 L6.9,20.0 L9.1,19.7 L7.2,20.5 L7.6,21.2 L9.5,20.2 L8.8,21.5 L9.6,21.8 L10.6,20.4 Z"
            fill={KINEFX_BLUE_MID}
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.6"
          />
          <path
            d="M10.4,19.3 L15.2,19.3 L19.0,17.0"
            fill="none"
            stroke={KINEFX_GREEN}
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <circle cx="10.4" cy="19.3" r="1.25" fill={KINEFX_GREEN} stroke={KINEFX_OUTLINE} strokeWidth="0.6" />
          <circle cx="15.2" cy="19.3" r="1.25" fill={KINEFX_GREEN} stroke={KINEFX_OUTLINE} strokeWidth="0.6" />
          <circle cx="19.0" cy="17.0" r="1.25" fill={KINEFX_GREEN} stroke={KINEFX_OUTLINE} strokeWidth="0.6" />
        </g>
        {/* Upper bent arm with thinner black outlines */}
        <KinefxJointLimb x={13.2} y={9.6} scale={0.82} connectJoints strokeWidth={0.62} />
        <KinefxGearBadge
          cx={6.8}
          cy={13.0}
          r={3.5}
          bgFill="#111111"
          showRing={false}
          gearScale={0.92}
          gearStroke={false}
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.reversefoot',
    label: 'Reverse Foot',
    family: 'sop',
    description:
      'Orange lower leg wider at the top angled into a dark grey sneaker with a vertical heel and white sole.',
    types: ['reversefoot'],
    icons: ['sop_kinefx-reversefoot'],
    refKey: 'SOP_kinefx-reversefoot',
    render: () => (
      <g strokeLinejoin="round">
        {/* Orange shin thicker at the top */}
        <polygon
          points="13.8,3.0 19.8,4.2 13.8,14.2 10.2,12.6"
          fill="#ee8624"
          stroke={KINEFX_OUTLINE}
          strokeWidth="1.05"
        />
        {/* Sneaker body with more vertical back/heel */}
        <path
          d="M9.8,11.8 L14.4,13.2 L17.6,18.4 L17.6,20.0 L5.8,16.4 L6.4,14.2 Z"
          fill="#5a616b"
          stroke={KINEFX_OUTLINE}
          strokeWidth="1.05"
        />
        {/* White sole */}
        <path
          d="M5.6,16.2 L17.6,19.8 L17.2,21.0 L5.2,17.4 Z"
          fill="#eef2f7"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.85"
        />
        {/* White laces */}
        <path
          d="M12.6,14.0 L14.2,13.4 M14.0,15.2 L15.6,14.6"
          stroke="#ffffff"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.stabilizejoint',
    label: 'Stabilize Joint',
    family: 'sop',
    description:
      'Bent blue bone limb with five-fingered hand, connected green joints, a solid red circle at the elbow, and a dashed red arc well to the left continuing behind the hand.',
    types: ['stabilizejoint'],
    icons: ['sop_kinefx-stabilizejoint'],
    refKey: 'SOP_kinefx-stabilizejoint',
    render: () => (
      <g strokeLinejoin="round">
        {/* Dashed red arc shifted left and continuing behind the hand */}
        <path
          d="M10.0,20.6 C3.4,19.4 2.2,11.2 6.8,4.6"
          fill="none"
          stroke={KINEFX_OUTLINE}
          strokeWidth="1.65"
          strokeDasharray="1.8 1.4"
        />
        <path
          d="M10.0,20.6 C3.4,19.4 2.2,11.2 6.8,4.6"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.0"
          strokeDasharray="1.8 1.4"
        />
        <KinefxJointLimb connectJoints />
        {/* Solid red circle at elbow without inner white line */}
        <circle cx="11.4" cy="17.2" r="2.2" fill="#e03228" stroke={KINEFX_OUTLINE} strokeWidth="0.85" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.biped_setup',
    label: 'Biped Setup',
    family: 'sop',
    description: 'Standing blue figure in a T-pose encircled by two bright green horizontal halo rings.',
    types: ['biped_setup'],
    icons: ['sop_kinefx-biped_setup'],
    refKey: 'SOP_kinefx-biped_setup',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxStandingFigure x={12} y={12} scale={0.96} pose="tpose" />
        {/* Two green halo rings around waist/knees */}
        <CasedStroke d="M5.4,13.6 A6.6,2.0 0 1,0 18.6,13.6" color={KINEFX_GREEN} width={1.1} />
        <CasedStroke d="M6.2,16.8 A5.8,1.8 0 1,0 17.8,16.8" color={KINEFX_GREEN} width={1.1} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.biped_retarget',
    label: 'Biped Retarget',
    family: 'sop',
    description:
      'Tall blue KineFX figure on the left and a smaller orange figure on the right in matching dynamic poses.',
    types: ['biped_retarget'],
    icons: ['sop_kinefx-biped_retarget'],
    refKey: 'SOP_kinefx-biped_retarget',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxSkeletonFigure x={8.8} y={11.8} scale={0.78} showJoints={false} fill={KINEFX_BLUE_MID} />
        <KinefxSkeletonFigure x={16.2} y={13.2} scale={0.62} showJoints={false} fill="#ee8624" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.fktransfer',
    label: 'FK Transfer',
    family: 'sop',
    description:
      'Simplified rounded green cactus on the left in the same pose as the blue KineFX figure on the right, with feet aligned vertically.',
    types: ['fktransfer'],
    icons: ['sop_kinefx-fktransfer'],
    refKey: 'SOP_kinefx-fktransfer',
    render: () => (
      <g strokeLinejoin="round">
        {/* Larger simplified rounded green cactus matching the KinefxSkeletonFigure pose and aligned feet */}
        <g transform="translate(8.8 11.8) scale(0.85) translate(-12 -12)">
          <path
            d="M11.4,2.4 C12.8,2.4 13.6,3.4 13.6,5.0 V6.6 H14.8 Q15.4,6.6 15.4,6.0 V4.8 C15.4,3.8 17.0,3.8 17.0,4.8 V7.6 Q17.0,9.2 15.2,9.2 H13.6 V12.4 L19.8,18.8 C20.6,19.6 19.6,21.0 18.6,20.2 L13.4,15.2 L11.4,13.4 L8.8,16.0 L7.8,20.2 C7.4,21.2 5.6,21.0 6.0,19.8 L7.2,14.8 L9.4,12.2 V9.4 H7.2 L5.4,11.6 C4.6,12.4 3.4,11.4 4.2,10.4 L6.4,7.6 H9.4 V5.0 C9.4,3.4 10.2,2.4 11.4,2.4 Z"
            fill={KINEFX_GREEN}
            stroke={KINEFX_OUTLINE}
            strokeWidth={1.12}
          />
        </g>
        <KinefxSkeletonFigure x={15.7} y={12.4} scale={0.75} showJoints={false} fill={KINEFX_BLUE_MID} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.dynamicwarp',
    label: 'Dynamic Warp',
    family: 'sop',
    description:
      'Symmetric yellow two-loop ribbon fold with grey radial frame dividers across the left downward U-loop and right upward arch, three dark-outlined yellow double-blocks with grey center seams, and red vertical warp ticks in the left and right gaps.',
    types: ['dynamicwarp'],
    icons: ['sop_kinefx-dynamicwarp'],
    refKey: 'SOP_kinefx-dynamicwarp',
    render: () => (
      <g strokeLinejoin="round">
        <path
          d="M4.6,12.0 C4.6,18.8 11.2,18.8 11.2,12.0"
          fill="none"
          stroke={KINEFX_OUTLINE}
          strokeWidth="3.6"
          strokeLinecap="butt"
        />
        <path
          d="M4.6,12.0 C4.6,18.8 11.2,18.8 11.2,12.0"
          fill="none"
          stroke="#f2c438"
          strokeWidth="1.9"
          strokeLinecap="butt"
        />
        {/* 4 evenly spaced grey radial frame divider stripes filling exact yellow stripe width */}
        <path
          d="M4.59,15.96 L6.25,15.04 M6.55,17.77 L7.29,16.03 M9.25,17.77 L8.51,16.03 M11.21,15.96 L9.55,15.04"
          stroke="#6e747c"
          strokeWidth="0.65"
          strokeLinecap="butt"
        />
        <path
          d="M12.8,12.0 C12.8,5.2 19.4,5.2 19.4,12.0"
          fill="none"
          stroke={KINEFX_OUTLINE}
          strokeWidth="3.6"
          strokeLinecap="butt"
        />
        <path
          d="M12.8,12.0 C12.8,5.2 19.4,5.2 19.4,12.0"
          fill="none"
          stroke="#f2c438"
          strokeWidth="1.9"
          strokeLinecap="butt"
        />
        {/* Mirrored 4 evenly spaced grey radial frame divider stripes filling exact yellow stripe width */}
        <path
          d="M19.41,8.04 L17.75,8.96 M17.45,6.23 L16.71,7.97 M14.75,6.23 L15.49,7.97 M12.79,8.04 L14.45,8.96"
          stroke="#6e747c"
          strokeWidth="0.65"
          strokeLinecap="butt"
        />
        {/* Left double-block with grey middle divider */}
        <rect x="2.2" y="10.4" width="4.2" height="3.2" fill="#f2c438" stroke={KINEFX_OUTLINE} strokeWidth="0.85" />
        <line x1="4.3" y1="10.8" x2="4.3" y2="13.2" stroke="#6e747c" strokeWidth="0.7" />
        {/* Middle double-block with grey middle divider at x=12.0 */}
        <rect x="9.95" y="10.4" width="4.1" height="3.2" fill="#f2c438" stroke={KINEFX_OUTLINE} strokeWidth="0.85" />
        <line x1="12.0" y1="10.8" x2="12.0" y2="13.2" stroke="#6e747c" strokeWidth="0.7" />
        {/* Right double-block with grey middle divider */}
        <rect x="17.6" y="10.4" width="4.2" height="3.2" fill="#f2c438" stroke={KINEFX_OUTLINE} strokeWidth="0.85" />
        <line x1="19.7" y1="10.8" x2="19.7" y2="13.2" stroke="#6e747c" strokeWidth="0.7" />
        <path
          d="M7.7,10.6 V13.4 M8.6,11.0 V13.0 M15.4,11.0 V13.0 M16.3,10.6 V13.4"
          stroke="#e03228"
          strokeWidth="0.65"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.smoothmotion',
    label: 'Smooth Motion',
    family: 'sop',
    description:
      'Upper-body blue figure cropped at the hips with translucent dark-outlined light-blue and white motion sweeps from the shoulders, with the left sweeps mirrored vertically.',
    types: ['smoothmotion'],
    icons: ['sop_kinefx-smoothmotion'],
    refKey: 'SOP_kinefx-smoothmotion',
    render: () => (
      <g strokeLinejoin="round">
        {/* Left ghost trails mirrored vertically across horizontal midline with matching translucent outlines */}
        <g opacity={0.65}>
          <path
            d="M9.6,10.8 C6.2,13.4 3.6,12.2 2.8,9.6"
            fill="none"
            stroke={KINEFX_OUTLINE}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M9.6,10.8 C6.2,13.4 3.6,12.2 2.8,9.6"
            fill="none"
            stroke={KINEFX_BLUE_LIGHT}
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </g>
        <g opacity={0.8}>
          <path
            d="M9.2,9.2 C6.0,10.2 4.0,8.4 3.4,5.8"
            fill="none"
            stroke={KINEFX_OUTLINE}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M9.2,9.2 C6.0,10.2 4.0,8.4 3.4,5.8"
            fill="none"
            stroke="#eef2f7"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </g>
        {/* Right ghost trails with matching translucent outlines */}
        <g opacity={0.65}>
          <path
            d="M14.4,8.2 C17.8,5.6 20.4,6.8 21.2,9.4"
            fill="none"
            stroke={KINEFX_OUTLINE}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M14.4,8.2 C17.8,5.6 20.4,6.8 21.2,9.4"
            fill="none"
            stroke={KINEFX_BLUE_LIGHT}
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </g>
        <g opacity={0.8}>
          <path
            d="M14.8,9.8 C18.0,8.8 20.0,10.6 20.6,13.2"
            fill="none"
            stroke={KINEFX_OUTLINE}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M14.8,9.8 C18.0,8.8 20.0,10.6 20.6,13.2"
            fill="none"
            stroke="#eef2f7"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </g>
        {/* Cropped upper-body blue figure */}
        <circle cx="12" cy="5.4" r="2.0" fill={KINEFX_BLUE_MID} stroke={KINEFX_OUTLINE} strokeWidth="0.95" />
        <path
          d="M8.8,8.4 C7.4,8.8 6.4,11.4 6.2,15.8 L7.8,16.0 L8.8,12.2 L9.4,19.4 H14.6 L15.2,12.2 L16.2,16.0 L17.8,15.8 C17.6,11.4 16.6,8.8 15.2,8.4 Z"
          fill={KINEFX_BLUE_MID}
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.95"
        />
      </g>
    ),
  },
];
