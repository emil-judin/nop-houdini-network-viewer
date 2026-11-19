import { arrowHead, gearPath, pts, roundedRectPath } from '../../../geoHelpers';
import { CasedStroke } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import {
  KINEFX_BLUE_LIGHT,
  KINEFX_BLUE_MID,
  KINEFX_GREEN,
  KINEFX_OUTLINE,
  KinefxClipStrip,
  KinefxGearBadge,
  KinefxRunner,
} from '../../kits/kinefx';

/**
 * KineFX motion clip and mixer operators.
 */
export const KINEFX_MOTION_CLIP_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.motionclipblend',
    label: 'MotionClip Blend',
    family: 'sop',
    description: 'Three jumping blue and pale-blue figures connected by bright green blend arcs.',
    types: ['motionclipblend'],
    icons: ['sop_kinefx-motionclipblend'],
    refKey: 'SOP_kinefx-motionclipblend',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxRunner x={6.4} y={13.0} scale={0.76} fill={KINEFX_BLUE_MID} opacity={0.82} />
        <KinefxRunner x={17.6} y={13.0} scale={0.76} fill={KINEFX_BLUE_MID} opacity={0.82} flip />
        <KinefxRunner x={12.0} y={9.6} scale={0.86} fill={KINEFX_BLUE_MID} />
        <CasedStroke d="M5.4,19.4 Q12.0,15.6 18.6,19.4" color={KINEFX_GREEN} width={1.3} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionclipcycle',
    label: 'MotionClip Cycle',
    family: 'sop',
    description: 'Row of ghosted blue running figures above a curved red cycle arrow looping back to the left.',
    types: ['motionclipcycle'],
    icons: ['sop_kinefx-motionclipcycle'],
    refKey: 'SOP_kinefx-motionclipcycle',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxClipStrip x={12.0} y={10.2} scale={1.0} count={4} />
        <CasedStroke d="M18.6,14.2 C20.4,17.8 14.0,19.8 6.4,17.4" color="#ff7066" width={1.75} />
        <polygon
          points={pts(arrowHead([4.0, 16.0], [7.6, 17.8], 2.9, 1.8))}
          fill="#ff7066"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.8"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionclipextract',
    label: 'MotionClip Extract',
    family: 'sop',
    description:
      'Row of ghosted blue running figures facing right with the middle two figures drawn in white with green dotted outlines.',
    types: ['motionclipextract'],
    icons: ['sop_kinefx-motionclipextract'],
    refKey: 'SOP_kinefx-motionclipextract',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxRunner x={6.4} y={12.0} scale={0.82} fill={KINEFX_BLUE_MID} opacity={0.55} />
        <KinefxRunner x={17.6} y={12.0} scale={0.82} fill={KINEFX_BLUE_MID} opacity={0.55} />
        {[10.0, 13.8].map((px) => (
          <g key={px} transform={`translate(${px} 12.0) scale(0.82)`}>
            <circle
              cx="0.6"
              cy="-5.8"
              r="1.65"
              fill="#ffffff"
              stroke="#58c848"
              strokeWidth="0.85"
              strokeDasharray="1.1 0.8"
            />
            <path
              d="M-1.0,-3.8 C0.6,-4.0 2.0,-3.2 2.1,-1.6 L4.2,-0.2 L3.2,1.2 L1.4,-0.2 L1.4,2.0 L4.4,5.8 L2.4,6.6 L0.0,3.0 L-2.4,6.6 L-4.4,5.7 L-1.6,1.8 L-1.6,-0.2 L-3.6,1.4 L-4.6,0.2 L-2.2,-2.6 Z"
              fill="#ffffff"
              stroke="#58c848"
              strokeWidth="0.9"
              strokeDasharray="1.1 0.8"
            />
          </g>
        ))}
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionclipextractkeyposes',
    label: 'MotionClip Extract Key Poses',
    family: 'sop',
    description:
      'Two dark-blue running figures facing each other with a glowing light-blue horizontal bar between them.',
    types: ['motionclipextractkeyposes'],
    icons: ['sop_kinefx-motionclipextractkeyposes'],
    refKey: 'SOP_kinefx-motionclipextractkeyposes',
    render: () => (
      <g strokeLinejoin="round">
        <rect
          x="7.8"
          y="10.4"
          width="8.4"
          height="2.2"
          rx="0.8"
          fill={KINEFX_BLUE_LIGHT}
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.75"
        />
        <KinefxRunner x={6.4} y={12.6} scale={0.86} fill="#c0c7d1" />
        <KinefxRunner x={17.6} y={12.6} scale={0.86} fill="#c0c7d1" flip />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionclipposedelete',
    label: 'MotionClip Pose Delete',
    family: 'sop',
    description: 'Two blue running figures flanking a red silhouette figure with a bold red X below it.',
    types: ['motionclipposedelete'],
    icons: ['sop_kinefx-motionclipposedelete', 'sop_kinefx-motionclipposedelete-2.0'],
    refKey: 'SOP_kinefx-motionclipposedelete',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxRunner x={6.0} y={12.8} scale={0.86} fill={KINEFX_BLUE_MID} />
        <KinefxRunner x={18.0} y={12.8} scale={0.86} fill={KINEFX_BLUE_MID} />
        <KinefxRunner x={12.0} y={9.8} scale={0.8} fill="#ff7066" />
        <CasedStroke d="M9.8,15.6 L14.2,20.0 M14.2,15.6 L9.8,20.0" color="#ff7066" width={1.5} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionclipposeinsert',
    label: 'MotionClip Pose Insert',
    family: 'sop',
    description:
      'Two blue running figures flanking a bright green silhouette figure with a green upward chevron below it.',
    types: ['motionclipposeinsert'],
    icons: ['sop_kinefx-motionclipposeinsert'],
    refKey: 'SOP_kinefx-motionclipposeinsert',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxRunner x={6.2} y={12.8} scale={0.8} fill={KINEFX_BLUE_MID} />
        <KinefxRunner x={17.8} y={12.8} scale={0.8} fill={KINEFX_BLUE_MID} />
        <KinefxRunner x={12.0} y={9.8} scale={0.78} fill={KINEFX_GREEN} />
        <CasedStroke d="M9.6,19.4 L12.0,16.8 L14.4,19.4" color={KINEFX_GREEN} width={1.5} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionclipsequence',
    label: 'MotionClip Sequence',
    family: 'sop',
    description:
      'Blue walking figure on the left, bright green plus sign in the center, and a green leaping figure on the upper right.',
    types: ['motionclipsequence'],
    icons: ['sop_kinefx-motionclipsequence'],
    refKey: 'SOP_kinefx-motionclipsequence',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxRunner x={6.4} y={14.0} scale={0.88} fill={KINEFX_BLUE_MID} />
        <KinefxRunner x={17.6} y={9.6} scale={0.82} fill={KINEFX_GREEN} />
        <CasedStroke d="M10.0,12.2 H14.4 M12.2,10.0 V14.4" color={KINEFX_GREEN} width={1.55} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionclipupdate',
    label: 'MotionClip Update',
    family: 'sop',
    description: 'Row of ghosted blue running figures above a white two-arrow circular refresh glyph.',
    types: ['motionclipupdate'],
    icons: ['sop_kinefx-motionclipupdate'],
    refKey: 'SOP_kinefx-motionclipupdate',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxClipStrip x={12.0} y={9.6} scale={0.9} count={4} />
        <rect
          x="7.8"
          y="13.4"
          width="8.4"
          height="7.4"
          rx="1.2"
          fill="#2e3338"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.9"
        />
        <path
          d="M9.4,16.6 A2.8,2.8 0 0,1 14.4,15.4 M14.6,17.6 A2.8,2.8 0 0,1 9.6,18.8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <polygon points="15.2,16.0 13.6,15.6 14.8,14.2" fill="#ffffff" />
        <polygon points="8.8,18.2 10.4,18.6 9.2,20.0" fill="#ffffff" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionmixer',
    label: 'Motion Mixer',
    family: 'sop',
    description:
      'Inverted leaping blue figure with a curved motion swoop arc shaded from yellow on the left to red on the right.',
    types: ['motionmixer'],
    icons: ['sop_kinefx-motionmixer'],
    refKey: 'SOP_kinefx-motionmixer',
    render: (uid) => (
      <g strokeLinejoin="round">
        <defs>
          <linearGradient id={`${uid}-swoop`} x1="0%" y1="60%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffe47a" />
            <stop offset="50%" stopColor="#ee8624" />
            <stop offset="100%" stopColor="#e03228" />
          </linearGradient>
        </defs>
        <path
          d="M4.2,13.6 C5.2,6.4 12.6,3.2 19.6,5.2 C14.6,5.8 8.4,8.6 4.2,13.6 Z"
          fill={`url(#${uid}-swoop)`}
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.9"
        />
        <g transform="rotate(145 12.6 13.0)">
          <KinefxRunner x={12.6} y={13.0} scale={1.08} fill={KINEFX_BLUE_MID} />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionmixerfetch',
    label: 'Motion Mixer Fetch',
    family: 'sop',
    description: 'Inverted leaping blue figure on the lower left with a silver-grey gear on the upper right.',
    types: ['motionmixerfetch'],
    icons: ['sop_kinefx-motionmixerfetch'],
    refKey: 'SOP_kinefx-motionmixerfetch',
    render: () => (
      <g strokeLinejoin="round">
        <g transform="rotate(145 9.2 14.2)">
          <KinefxRunner x={9.2} y={14.2} scale={0.92} fill={KINEFX_BLUE_MID} />
        </g>
        <path d={gearPath(16.6, 7.6, 8, 4.5, 3.1)} fill="#eef2f7" stroke={KINEFX_OUTLINE} strokeWidth="0.9" />
        <circle cx="16.6" cy="7.6" r="1.4" fill="#5a616b" stroke={KINEFX_OUTLINE} strokeWidth="0.7" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.configureclipinfo',
    label: 'Configure Clip Info',
    family: 'sop',
    description:
      'Row of ghosted blue running figures on the upper left with a dark round gear badge at the lower right.',
    types: ['configureclipinfo'],
    icons: ['sop_kinefx-configureclipinfo'],
    refKey: 'SOP_kinefx-configureclipinfo',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxClipStrip x={10.2} y={9.8} scale={0.9} count={4} />
        <KinefxGearBadge cx={16.8} cy={16.8} r={4.8} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.extractlocomotion',
    label: 'Extract Locomotion',
    family: 'sop',
    description: 'Generic runner in a white tank top and blue shorts running left on a grey treadmill.',
    types: ['extractlocomotion', 'motionclipextractlocomotion'],
    icons: ['sop_kinefx-extractlocomotion', 'sop_kinefx-motionclipextractlocomotion'],
    refKey: 'SOP_kinefx-extractlocomotion',
    render: () => (
      <g strokeLinejoin="round">
        {/* Treadmill frame */}
        <path
          d="M4.6,18.2 H18.2 M17.0,18.2 L18.8,9.2 H16.4"
          fill="none"
          stroke={KINEFX_OUTLINE}
          strokeWidth="2.0"
          strokeLinecap="round"
        />
        <path
          d="M4.6,18.2 H18.2 M17.0,18.2 L18.8,9.2 H16.4"
          fill="none"
          stroke="#c0c7d1"
          strokeWidth="1.0"
          strokeLinecap="round"
        />
        <path
          d={roundedRectPath(4.0, 17.6, 15.6, 2.4, 1.1)}
          fill="#c0c7d1"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.95"
        />
        {/* Runner with natural running arm swing */}
        <path
          d="M10.0,8.6 L7.6,7.4 L8.6,5.8 M12.2,8.6 L14.8,10.6 L13.4,12.2"
          fill="none"
          stroke={KINEFX_OUTLINE}
          strokeWidth="2.0"
          strokeLinecap="round"
        />
        <path
          d="M10.0,8.6 L7.6,7.4 L8.6,5.8 M12.2,8.6 L14.8,10.6 L13.4,12.2"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="11.4" cy="5.6" r="1.6" fill="#ee8624" stroke={KINEFX_OUTLINE} strokeWidth="0.85" />
        <path
          d="M10.2,7.6 L12.6,7.6 L12.4,12.2 L14.8,16.2 L13.4,16.8 L11.2,13.0 L8.8,16.8 L7.4,16.0 L9.8,12.0 Z"
          fill="#f2f4f7"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.85"
        />
        <path
          d="M9.8,11.6 L12.4,11.6 L12.8,13.6 L9.6,13.6 Z"
          fill={KINEFX_BLUE_MID}
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.7"
        />
      </g>
    ),
  },
];
