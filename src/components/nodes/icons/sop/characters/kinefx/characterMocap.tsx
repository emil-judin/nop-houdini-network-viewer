import { arrowHead, isoBoxFaces, pts, roundedRectPath } from '../../../geoHelpers';
import { CursorArrow } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import {
  Clapperboard,
  KINEFX_BLUE_LIGHT,
  KINEFX_GREEN_MID,
  KINEFX_OUTLINE,
  KinefxClipStrip,
  KinefxDoorFrame,
  KinefxJointLimb,
  KinefxStandingFigure,
} from '../../kits/kinefx';
import { OpenSuitcase } from '../../kits/pack';

const CHAR_DRIVE = isoBoxFaces(12, 13.0, 6.0, 2.5);

/**
 * KineFX character, motion capture and agent bridge operators.
 */
export const KINEFX_CHARACTER_MOCAP_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.characterio',
    label: 'Character I/O',
    family: 'sop',
    description: 'Standing blue KineFX figure with green joints mounted on an isometric grey hard drive box.',
    types: ['characterio'],
    icons: ['sop_kinefx-characterio'],
    refKey: 'SOP_kinefx-characterio',
    render: () => (
      <g strokeLinejoin="round">
        {/* Isometric grey hard drive box matching sop.agentdefinitioncache */}
        <polygon points={pts(CHAR_DRIVE.top)} fill="#eef2f7" stroke={KINEFX_OUTLINE} strokeWidth="0.95" />
        <polygon points={pts(CHAR_DRIVE.left)} fill="#c0c7d1" stroke={KINEFX_OUTLINE} strokeWidth="0.95" />
        <polygon points={pts(CHAR_DRIVE.right)} fill="#89929e" stroke={KINEFX_OUTLINE} strokeWidth="0.95" />
        <line x1="15.0" y1="18.3" x2="15.0" y2="19.5" stroke={KINEFX_OUTLINE} strokeWidth="0.8" />
        <line x1="16.4" y1="17.6" x2="16.4" y2="18.8" stroke={KINEFX_OUTLINE} strokeWidth="0.8" />
        <KinefxStandingFigure x={12} y={9.4} scale={0.74} showJoints />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.scenecharacterexport',
    label: 'Scene Character Export',
    family: 'sop',
    description:
      'Dark grey cinema clapperboard on the left and a blue KineFX figure stepping through a yellow door frame on the right.',
    types: ['scenecharacterexport'],
    icons: ['sop_kinefx-scenecharacterexport'],
    refKey: 'SOP_kinefx-scenecharacterexport',
    render: () => (
      <KinefxDoorFrame direction="out">
        <Clapperboard x={7.6} y={13.0} scale={0.95} />
      </KinefxDoorFrame>
    ),
  },
  {
    id: 'sop.kinefx.scenecharacterimport',
    label: 'Scene Character Import',
    family: 'sop',
    description:
      'Blue KineFX figure stepping through a yellow door frame on the left with a dark grey cinema clapperboard on the right.',
    types: ['scenecharacterimport'],
    icons: ['sop_kinefx-scenecharacterimport'],
    refKey: 'SOP_kinefx-scenecharacterimport',
    render: () => (
      <KinefxDoorFrame direction="in">
        <Clapperboard x={16.4} y={13.0} scale={0.95} />
      </KinefxDoorFrame>
    ),
  },
  {
    id: 'sop.kinefx.mocapimport',
    label: 'Mocap Import',
    family: 'sop',
    description: 'Dark grey mocap-suit figure in a dynamic hopping pose covered with white optical marker dots.',
    types: ['mocapimport'],
    icons: ['sop_kinefx-mocapimport'],
    refKey: 'SOP_kinefx-mocapimport',
    render: () => (
      <g strokeLinejoin="round">
        <circle cx="10.4" cy="4.8" r="1.8" fill="#89929e" stroke={KINEFX_OUTLINE} strokeWidth="1.05" />
        <path
          d="M8.6,7.4 L6.4,5.0 L5.2,6.2 L7.8,9.4 L9.2,12.6 L6.8,16.8 L8.4,17.8 L11.0,13.8 L14.4,15.6 L15.6,20.2 L17.4,19.8 L16.2,14.2 L12.4,11.8 L12.4,8.6 L15.8,6.2 L14.6,4.8 L11.4,7.4 Z"
          fill="#89929e"
          stroke={KINEFX_OUTLINE}
          strokeWidth="1.05"
        />
        {[
          [10.4, 4.4],
          [6.2, 5.8],
          [15.0, 5.6],
          [10.4, 8.6],
          [11.0, 12.2],
          [7.6, 17.0],
          [16.2, 19.6],
        ].map(([mx, my], idx) => (
          <circle key={idx} cx={mx} cy={my} r="1.05" fill="#ffffff" stroke={KINEFX_OUTLINE} strokeWidth="0.65" />
        ))}
      </g>
    ),
  },
  {
    id: 'sop.kinefx.mocapstream',
    label: 'Mocap Stream',
    family: 'sop',
    description:
      'Green broadcast screen with white scanlines, a dark mocap-suit figure with white markers, and a white play triangle at the lower right.',
    types: ['mocapstream'],
    icons: ['sop_kinefx-mocapstream'],
    refKey: 'SOP_kinefx-mocapstream',
    render: () => (
      <g strokeLinejoin="round">
        <path
          d={roundedRectPath(2.8, 4.4, 18.4, 14.8, 2.0)}
          fill={KINEFX_GREEN_MID}
          stroke={KINEFX_OUTLINE}
          strokeWidth="1.05"
        />
        <path
          d="M4.2,8.2 H19.8 M4.2,11.8 H19.8 M4.2,15.4 H19.8"
          stroke="#ffffff"
          strokeWidth="0.7"
          strokeOpacity="0.55"
        />
        {/* Dark mocap figure */}
        <circle cx="11.4" cy="7.4" r="1.4" fill="#3a3f47" stroke={KINEFX_OUTLINE} strokeWidth="0.8" />
        <path
          d="M9.6,9.4 L6.8,7.4 L6.0,8.4 L8.8,10.8 L9.6,13.6 L8.0,17.8 L9.6,18.2 L11.4,14.6 L13.4,18.2 L15.0,17.8 L13.4,13.6 L14.2,10.8 L17.0,8.4 L16.2,7.4 L13.4,9.4 Z"
          fill="#3a3f47"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.85"
        />
        {[
          [11.4, 7.4],
          [6.8, 8.0],
          [16.0, 8.0],
          [11.4, 12.6],
          [8.8, 17.4],
          [14.2, 17.4],
        ].map(([mx, my], idx) => (
          <circle key={idx} cx={mx} cy={my} r="0.6" fill="#ffffff" />
        ))}
        {/* Play arrow at lower right */}
        <polygon points="15.8,13.2 20.6,15.8 15.8,18.4" fill="#ffffff" stroke={KINEFX_OUTLINE} strokeWidth="0.85" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.agentanimationunpack',
    label: 'Agent Animation Unpack',
    family: 'sop',
    description: 'Open brown and gold suitcase with a row of ghosted blue running figures emerging to the right.',
    types: ['agentanimationunpack'],
    icons: ['sop_kinefx-agentanimationunpack'],
    refKey: 'SOP_kinefx-agentanimationunpack',
    render: () => (
      <OpenSuitcase x={10.2} y={14.0} scale={0.86}>
        <KinefxClipStrip x={4.6} y={-4.6} scale={0.78} count={3} strokeWidth={1.15} />
      </OpenSuitcase>
    ),
  },
  {
    id: 'sop.kinefx.agentcharacterunpack',
    label: 'Agent Character Unpack',
    family: 'sop',
    description:
      'Open brown and gold suitcase with a standing blue KineFX figure and green joints emerging on the right.',
    types: ['agentcharacterunpack'],
    icons: ['sop_kinefx-agentcharacterunpack'],
    refKey: 'SOP_kinefx-agentcharacterunpack',
    render: () => (
      <g strokeLinejoin="round">
        <OpenSuitcase x={10.2} y={14.0} scale={0.86} />
        <KinefxStandingFigure x={16.2} y={11.8} scale={0.8} showJoints />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.agentfromrig',
    label: 'Agent from Rig',
    family: 'sop',
    description: 'Standing blue KineFX figure with green joints and a soft light-blue outer glow.',
    types: ['agentfromrig'],
    icons: ['sop_kinefx-agentfromrig'],
    refKey: 'SOP_kinefx-agentfromrig',
    render: () => (
      <g strokeLinejoin="round">
        {/* Soft light-blue aura without a second black outline */}
        <g transform="translate(12 12) scale(1.06) translate(-12 -12)" opacity="0.45">
          <circle cx="12" cy="4.6" r="2.2" fill={KINEFX_BLUE_LIGHT} />
          <path
            d="M9.2,7.4 C7.4,7.8 6.4,10.4 5.8,13.8 L7.4,14.2 L8.8,10.6 L9.6,13.8 L8.6,20.6 L10.7,20.6 L12.0,15.2 L13.3,20.6 L15.4,20.6 L14.4,13.8 L15.2,10.6 L16.6,14.2 L18.2,13.8 C17.6,10.4 16.6,7.8 14.8,7.4 Z"
            fill={KINEFX_BLUE_LIGHT}
          />
        </g>
        <KinefxStandingFigure x={12} y={12} scale={0.94} showJoints />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.agentposefromrig',
    label: 'Agent Pose from Rig',
    family: 'sop',
    description:
      'Bent blue bone limb with five-fingered hand, connected green joints, a dotted two-way curved red arrow above and left of the hand, and a white cursor arrow clicking the elbow.',
    types: ['agentposefromrig'],
    icons: ['sop_kinefx-agentposefromrig'],
    refKey: 'SOP_kinefx-agentposefromrig',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxJointLimb connectJoints />
        {/* Dotted two-way curved red arrow shifted up and left around the hand, inside 1.5..22.5 */}
        <g transform="translate(-0.1 -0.1)">
          <path
            d="M3.4,8.4 A4.4,4.4 0 0,1 8.8,3.2"
            fill="none"
            stroke={KINEFX_OUTLINE}
            strokeWidth="1.65"
            strokeDasharray="1.5 1.2"
          />
          <path
            d="M3.4,8.4 A4.4,4.4 0 0,1 8.8,3.2"
            fill="none"
            stroke="#e03228"
            strokeWidth="1.0"
            strokeDasharray="1.5 1.2"
          />
          <polygon
            points={pts(arrowHead([3.0, 9.6], [3.8, 7.4], 1.8, 1.1))}
            fill="#e03228"
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.6"
          />
          <polygon
            points={pts(arrowHead([10.0, 3.2], [7.8, 3.2], 1.8, 1.1))}
            fill="#e03228"
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.6"
          />
        </g>
        <CursorArrow x={8.8} y={12.8} s={0.95} />
      </g>
    ),
  },
];
