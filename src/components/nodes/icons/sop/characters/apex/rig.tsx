import { roundedRectPath } from '../../../geoHelpers';
import { CasedStroke } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import {
  APEX_GREEN,
  APEX_OUTLINE,
  APEX_WOOD_DARK,
  APEX_WOOD_LIGHT,
  APEX_WOOD_MID,
  ApexWoodenMannequin,
} from '../../kits/apex';
import {
  KINEFX_BLUE_DARK,
  KINEFX_BLUE_LIGHT,
  KINEFX_BLUE_MID,
  KinefxRunner,
  KinefxStandingFigure,
} from '../../kits/kinefx';

/**
 * Five brand-new dynamic skeleton pose variants (v2) for `sop.apex.animationfromskeleton`.
 */
const ANIM_FROM_SKELETON_V2_VARIANTS: ReadonlyArray<{
  name: string;
  render: () => React.ReactNode;
}> = [
  {
    name: 'V1 Tapered Bone Silhouette',
    render: () => (
      <g strokeLinejoin="round" transform="translate(0 0.6)">
        {/* Overhead arcing arm rotated 30 deg CCW (to the left) around left shoulder (10.4, 7.8) */}
        <g transform="rotate(-30 10.4 7.8)">
          <path d="M10.4,7.8 L6.6,4.4 L7.6,3.2 L11.4,6.6 Z" fill="#ffffff" stroke={APEX_OUTLINE} strokeWidth="0.9" />
          <g transform="translate(-1.0 -0.58) rotate(-20 7.0 4.2)">
            <path d="M6.8,4.2 L11.8,2.4 L12.2,3.6 L7.2,5.4 Z" fill="#ffffff" stroke={APEX_OUTLINE} strokeWidth="0.9" />
          </g>
        </g>
        {/* Skull + jaw with two eye sockets */}
        <path
          d="M7.4,5.8 C7.4,4.0 9.4,3.4 10.8,4.2 C12.0,5.0 12.0,6.6 10.8,7.6 L9.8,8.2 L8.0,7.8 Z"
          fill="#ffffff"
          stroke={APEX_OUTLINE}
          strokeWidth="0.9"
        />
        <circle cx="8.7" cy="5.6" r="0.45" fill={APEX_OUTLINE} />
        <circle cx="10.3" cy="5.5" r="0.45" fill={APEX_OUTLINE} />
        {/* Down-reaching right arm (~3/4 length), rendered behind the ribcage, rotated 30 deg CCW around right shoulder */}
        <g transform="rotate(-30 11.1 9.7)">
          <path
            d="M11.6,9.2 L14.4,12.6 L13.4,13.6 L10.6,10.2 Z"
            fill="#ffffff"
            stroke={APEX_OUTLINE}
            strokeWidth="0.9"
          />
          <path
            d="M14.2,12.6 L17.8,15.2 L16.8,16.2 L13.2,13.6 Z"
            fill="#ffffff"
            stroke={APEX_OUTLINE}
            strokeWidth="0.9"
          />
        </g>
        {/* Barrel ribcage */}
        <path
          d="M7.8,8.2 C10.8,7.4 13.2,9.0 12.4,12.4 L9.0,14.0 L6.6,11.2 Z"
          fill="#ffffff"
          stroke={APEX_OUTLINE}
          strokeWidth="0.9"
        />
        <path
          d="M7.8,9.4 L11.4,9.8 M7.4,10.8 L11.2,11.2 M7.8,12.2 L10.6,12.4"
          fill="none"
          stroke={APEX_OUTLINE}
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        {/* Pelvis */}
        <path d="M6.6,13.6 L11.0,13.6 L10.2,16.0 L6.4,15.6 Z" fill="#eef2f7" stroke={APEX_OUTLINE} strokeWidth="0.9" />
        {/* Kneeling back leg */}
        <path d="M7.4,15.0 L4.2,17.8 L5.4,19.0 L8.6,16.2 Z" fill="#ffffff" stroke={APEX_OUTLINE} strokeWidth="0.9" />
        <path d="M5.0,17.4 L11.0,19.6 L10.4,21.0 L4.4,18.8 Z" fill="#ffffff" stroke={APEX_OUTLINE} strokeWidth="0.9" />
        {/* Bent front leg */}
        <path d="M9.8,14.4 L14.4,13.4 L14.6,14.8 L10.0,15.8 Z" fill="#ffffff" stroke={APEX_OUTLINE} strokeWidth="0.9" />
        <path
          d="M13.4,14.2 L14.4,20.4 L15.8,20.2 L14.8,14.0 Z"
          fill="#ffffff"
          stroke={APEX_OUTLINE}
          strokeWidth="0.9"
        />
      </g>
    ),
  },
  {
    name: 'V2 Dark-Jointed Contrast',
    render: () => (
      <g strokeLinejoin="round">
        <CasedStroke d="M11.2,7.6 L15.4,4.0 L9.2,2.8" color="#ffffff" width={1.2} casing={2.2} />
        <ellipse cx="9.2" cy="6.0" rx="2.0" ry="1.8" fill="#ffffff" stroke={APEX_OUTLINE} strokeWidth="0.95" />
        <circle cx="10.0" cy="5.8" r="0.5" fill={APEX_OUTLINE} />
        <path
          d="M7.6,8.2 C10.6,7.2 12.8,8.8 11.8,12.4 L8.6,14.0 L6.8,11.4 Z"
          fill="#5a616b"
          stroke={APEX_OUTLINE}
          strokeWidth="0.95"
        />
        <path
          d="M7.4,9.2 H11.6 M7.2,10.8 H11.4 M7.8,12.4 H10.8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path d={roundedRectPath(6.6, 13.8, 3.8, 2.0, 0.7)} fill="#c0c7d1" stroke={APEX_OUTLINE} strokeWidth="0.85" />
        <CasedStroke d="M11.8,9.6 L15.4,14.4 L19.6,19.2" color="#ffffff" width={1.2} casing={2.2} />
        <CasedStroke d="M7.4,15.6 L4.4,18.4 L10.6,20.6" color="#ffffff" width={1.25} casing={2.25} />
        <CasedStroke d="M9.8,15.2 L14.2,14.2 L15.2,20.4" color="#ffffff" width={1.25} casing={2.25} />
        {[
          [15.4, 4.0],
          [15.4, 14.4],
          [4.4, 18.4],
          [14.2, 14.2],
        ].map(([jx, jy], idx) => (
          <circle key={idx} cx={jx} cy={jy} r="0.85" fill="#c0c7d1" stroke={APEX_OUTLINE} strokeWidth="0.7" />
        ))}
      </g>
    ),
  },
  {
    name: 'V3 Dramatic Overhead Arc',
    render: () => (
      <g strokeLinejoin="round">
        <CasedStroke d="M11.0,7.8 Q17.4,4.2 12.4,2.4 Q9.4,2.0 7.6,3.4" color="#ffffff" width={1.2} casing={2.2} />
        <ellipse cx="8.6" cy="6.4" rx="1.95" ry="1.75" fill="#ffffff" stroke={APEX_OUTLINE} strokeWidth="0.95" />
        <circle cx="9.4" cy="6.2" r="0.45" fill={APEX_OUTLINE} />
        <path
          d="M7.6,8.4 C10.4,7.6 12.4,9.2 11.6,12.4 L8.6,14.0 L6.6,11.6 Z"
          fill="#ffffff"
          stroke={APEX_OUTLINE}
          strokeWidth="0.95"
        />
        <path d="M7.8,10.0 L10.8,10.4 M7.4,11.6 L10.4,12.0" fill="none" stroke={APEX_OUTLINE} strokeWidth="0.75" />
        <path d={roundedRectPath(6.4, 13.8, 3.6, 2.0, 0.7)} fill="#eef2f7" stroke={APEX_OUTLINE} strokeWidth="0.85" />
        <CasedStroke d="M11.6,9.8 L15.8,14.2 L20.0,18.8" color="#ffffff" width={1.2} casing={2.2} />
        <CasedStroke d="M7.4,15.6 L4.0,18.0 L9.4,20.8" color="#ffffff" width={1.25} casing={2.25} />
        <CasedStroke d="M9.6,15.0 L14.4,14.6 L15.4,20.8" color="#ffffff" width={1.25} casing={2.25} />
      </g>
    ),
  },
  {
    name: 'V4 Thick Cartoon Skeleton',
    render: () => (
      <g strokeLinejoin="round">
        <CasedStroke d="M11.4,7.4 L15.6,4.0 L10.2,2.8" color="#ffffff" width={1.55} casing={2.7} />
        <circle cx="9.2" cy="5.8" r="2.2" fill="#ffffff" stroke={APEX_OUTLINE} strokeWidth="1.05" />
        <circle cx="10.2" cy="5.6" r="0.55" fill={APEX_OUTLINE} />
        <path
          d="M7.4,8.2 C10.6,7.4 12.8,9.0 12.0,12.6 L8.6,14.2 L6.6,11.4 Z"
          fill="#ffffff"
          stroke={APEX_OUTLINE}
          strokeWidth="1.05"
        />
        <path d="M7.8,10.0 H11.2 M7.4,11.8 H10.8" fill="none" stroke={APEX_OUTLINE} strokeWidth="0.85" />
        <CasedStroke d="M11.6,9.8 L15.6,14.4 L19.6,19.0" color="#ffffff" width={1.55} casing={2.7} />
        <CasedStroke d="M7.6,14.8 L4.4,18.2 L10.2,20.4" color="#ffffff" width={1.65} casing={2.8} />
        <CasedStroke d="M9.8,14.6 L14.2,14.2 L15.4,20.4" color="#ffffff" width={1.65} casing={2.8} />
      </g>
    ),
  },
  {
    name: 'V5 Side-Profile Kneel',
    render: () => (
      <g strokeLinejoin="round">
        <CasedStroke d="M10.4,7.6 L14.4,4.2 L9.4,2.8" color="#ffffff" width={1.2} casing={2.2} />
        <ellipse cx="8.6" cy="5.8" rx="1.9" ry="1.75" fill="#ffffff" stroke={APEX_OUTLINE} strokeWidth="0.95" />
        <circle cx="9.4" cy="5.6" r="0.45" fill={APEX_OUTLINE} />
        <path
          d="M7.4,8.0 C9.8,7.4 11.6,9.0 11.0,12.2 L8.4,13.8 L6.6,11.4 Z"
          fill="#ffffff"
          stroke={APEX_OUTLINE}
          strokeWidth="0.95"
        />
        <path d="M7.6,9.6 H10.4 M7.4,11.2 H10.2" fill="none" stroke={APEX_OUTLINE} strokeWidth="0.7" />
        <path d={roundedRectPath(6.6, 13.6, 3.2, 1.8, 0.6)} fill="#c0c7d1" stroke={APEX_OUTLINE} strokeWidth="0.85" />
        <CasedStroke d="M10.8,9.8 L14.8,14.6 L19.0,19.4" color="#ffffff" width={1.2} casing={2.2} />
        <CasedStroke d="M7.4,15.4 L4.2,18.8 L9.8,20.8" color="#ffffff" width={1.25} casing={2.25} />
        <CasedStroke d="M9.4,14.8 L13.8,13.6 L14.6,20.6" color="#ffffff" width={1.25} casing={2.25} />
      </g>
    ),
  },
];

/**
 * Five top-hand variants for `sop.apex.configurecontrols` (mannequin and green lines stay fixed).
 */
const CONFIGURE_CONTROLS_HAND_VARIANTS: ReadonlyArray<{
  name: string;
  renderHand: () => React.ReactNode;
}> = [
  {
    name: 'V1 Open Spread Palm',
    renderHand: () => (
      <g strokeLinejoin="round">
        <path
          d="M7.0,4.0 C9.6,2.2 14.2,2.2 17.0,3.8 L19.6,5.4 L18.6,6.6 L15.4,4.8 L17.8,7.6 L16.6,8.4 L13.8,5.6 L14.6,9.2 L13.2,9.4 L12.2,5.8 L11.8,9.4 L10.4,9.4 L10.6,5.8 L8.8,8.6 L7.6,7.8 L9.2,5.2 L5.8,6.4 L5.0,5.0 Z"
          fill="#5aa2f2"
          stroke={APEX_OUTLINE}
          strokeWidth="0.95"
        />
        <path d="M8.6,4.0 C10.8,3.0 13.4,3.0 15.2,4.0 L13.6,5.0 L10.2,5.0 Z" fill="#8fc2ff" />
      </g>
    ),
  },
  {
    name: 'V2 Cased-Stroke Fingers',
    renderHand: () => (
      <g strokeLinejoin="round">
        <CasedStroke
          d="M10.4,4.8 L6.2,6.4 M10.8,5.0 L8.0,8.6 M11.8,5.2 L11.4,9.4 M12.8,5.0 L14.8,9.0 M13.6,4.6 L17.6,7.4"
          color="#5aa2f2"
          width={1.15}
          casing={2.25}
        />
        <ellipse cx="12.0" cy="4.2" rx="4.2" ry="1.8" fill="#8fc2ff" stroke={APEX_OUTLINE} strokeWidth="0.95" />
      </g>
    ),
  },
  {
    name: 'V3 Angled Marionette Grip',
    renderHand: () => (
      <g strokeLinejoin="round">
        <path
          d="M5.4,4.2 C7.8,2.4 13.6,2.2 17.8,4.0 L19.2,5.6 L15.2,4.8 L17.6,7.4 L16.2,8.2 L13.4,5.8 L14.2,8.8 L12.6,9.0 L11.6,5.8 L10.8,8.8 L9.4,8.6 L9.8,5.6 L6.8,7.4 L5.8,6.4 Z"
          fill="#3672c4"
          stroke={APEX_OUTLINE}
          strokeWidth="0.95"
        />
        <path d="M7.6,3.8 C10.4,2.8 14.2,3.0 16.4,4.2 L14.2,5.2 L9.2,5.0 Z" fill="#5aa2f2" />
      </g>
    ),
  },
  {
    name: 'V4 Bold Light-Blue Hand',
    renderHand: () => (
      <path
        d="M6.4,4.2 C9.4,2.4 14.4,2.4 17.4,4.0 L19.4,5.6 L18.2,6.8 L15.2,5.0 L17.2,8.0 L15.8,8.8 L13.4,5.8 L14.0,9.4 L12.6,9.4 L11.8,5.8 L11.2,9.4 L9.8,9.2 L10.2,5.8 L8.0,8.4 L6.8,7.6 L8.6,5.2 L5.4,6.2 Z"
        fill="#8fc2ff"
        stroke={APEX_OUTLINE}
        strokeWidth="1.05"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'V5 KineFX Scaled Hand',
    renderHand: () => (
      <g transform="translate(11.6 5.6) rotate(150) scale(2.1 1.6) translate(-6.6 -5.8)">
        <path
          d="M5.4,7.6 L4.0,6.0 L4.5,5.4 L5.5,6.3 L4.4,3.8 L5.2,3.4 L6.3,5.8 L6.2,3.0 L7.1,3.0 L7.2,5.8 L7.9,3.3 L8.8,3.6 L8.1,6.2 L9.2,5.5 L9.6,6.2 L7.8,8.4 Z"
          fill="#8fc2ff"
          stroke={APEX_OUTLINE}
          strokeWidth="0.52"
        />
      </g>
    ),
  },
];

/**
 * APEX rig and character operators.
 */
export const APEX_RIG_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.apex.autorigbuilder',
    label: 'APEX AutoRig Builder',
    family: 'sop',
    description:
      'Open tan cardboard box filled with wooden artist mannequin parts sticking out the top, with a wooden limb lying horizontally in front.',
    types: ['autorigbuilder'],
    icons: ['sop_apex-autorigbuilder'],
    refKey: 'SOP_apex-autorigbuilder',
    render: () => (
      <g strokeLinejoin="round">
        {/* Back box interior */}
        <polygon points="5.2,9.4 18.8,9.4 18.8,12.2 5.2,12.2" fill="#7e5828" stroke={APEX_OUTLINE} strokeWidth="0.9" />
        {/* Wooden mannequin parts sticking out */}
        <path d="M7.2,9.8 L5.6,4.0 L7.2,3.6 L9.0,9.8 Z" fill={APEX_WOOD_MID} stroke={APEX_OUTLINE} strokeWidth="0.85" />
        <ellipse cx="11.4" cy="6.8" rx="2.3" ry="2.8" fill={APEX_WOOD_LIGHT} stroke={APEX_OUTLINE} strokeWidth="0.9" />
        <path
          d="M14.2,9.8 L15.0,4.6 L17.6,5.2 L16.2,9.8 Z"
          fill={APEX_WOOD_MID}
          stroke={APEX_OUTLINE}
          strokeWidth="0.85"
        />
        {/* Box front body */}
        <rect x="5.0" y="10.2" width="14.0" height="7.6" fill="#c89a5a" stroke={APEX_OUTLINE} strokeWidth="0.95" />
        {/* Left & right open flaps */}
        <polygon points="5.0,10.2 2.4,8.0 5.4,7.4 7.6,10.2" fill="#e8c48a" stroke={APEX_OUTLINE} strokeWidth="0.85" />
        <polygon
          points="19.0,10.2 21.6,8.0 18.6,7.4 16.4,10.2"
          fill="#e8c48a"
          stroke={APEX_OUTLINE}
          strokeWidth="0.85"
        />
        {/* Front folded flap */}
        <polygon
          points="5.0,10.2 19.0,10.2 18.2,13.4 5.8,13.4"
          fill="#a8783c"
          stroke={APEX_OUTLINE}
          strokeWidth="0.85"
        />
        {/* Foreground horizontal wooden limb */}
        <path
          d="M4.6,18.8 L11.4,18.6 L11.4,20.8 L4.6,20.6 Z"
          fill={APEX_WOOD_LIGHT}
          stroke={APEX_OUTLINE}
          strokeWidth="0.85"
        />
        <circle cx="11.8" cy="19.7" r="1.1" fill={APEX_WOOD_DARK} stroke={APEX_OUTLINE} strokeWidth="0.75" />
        <path
          d="M12.6,18.6 L19.0,18.8 L19.0,20.6 L12.6,20.8 Z"
          fill={APEX_WOOD_MID}
          stroke={APEX_OUTLINE}
          strokeWidth="0.85"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.autorigcomponent',
    label: 'APEX Autorig Component',
    family: 'sop',
    description:
      'Standing three-tone wooden artist mannequin with segmented torso, ball-jointed limbs, and arms angled outward.',
    types: ['autorigcomponent', 'testgeometry_electra'],
    icons: ['sop_apex-autorigcomponent', 'sop_testgeometry_electra'],
    refKey: 'SOP_apex-autorigcomponent',
    render: () => <ApexWoodenMannequin x={12} y={12.2} scale={0.98} />,
  },
  {
    id: 'sop.apex.configurecharacter',
    label: 'APEX Configure Character',
    family: 'sop',
    description:
      'Blue KineFX standing figure with green skeleton joints on the left, paired with a white-grey cylindrical spool and a blue upward-arching horizontal slider stripe at the lower right.',
    types: ['configurecharacter'],
    icons: ['sop_apex-configurecharacter'],
    refKey: 'SOP_apex-configurecharacter',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxStandingFigure x={7.4} y={12.0} scale={0.86} showJoints fill={KINEFX_BLUE_DARK} />
        {/* Longer upward-arching blue sweep rendered BEHIND the white-grey spool */}
        <path
          d="M11.6,16.8 Q16.6,11.6 21.6,16.8"
          fill="none"
          stroke={KINEFX_BLUE_DARK}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* White-grey cylindrical spool at lower right */}
        <path
          d="M13.0,14.6 L13.0,19.4 C13.0,20.6 19.8,20.6 19.8,19.4 L19.8,14.6 Z"
          fill="#c0c7d1"
          stroke={APEX_OUTLINE}
          strokeWidth="0.9"
        />
        <ellipse cx="16.4" cy="14.6" rx="3.4" ry="1.4" fill="#eef2f7" stroke={APEX_OUTLINE} strokeWidth="0.9" />
      </g>
    ),
  },
  {
    id: 'sop.apex.configurecontrols',
    label: 'APEX Configure Controls',
    family: 'sop',
    description:
      'Large blue five-fingered puppeteer hand at the top with green control strings descending to a small tan wooden artist mannequin below.',
    types: ['configurecontrols', 'controlextract', 'controlupdateparms'],
    icons: ['sop_apex-configurecontrols', 'sop_apex-controlextract', 'sop_apex-controlupdateparms'],
    refKey: 'SOP_apex-configurecontrols',
    render: () => (
      <g strokeLinejoin="round">
        {/* Green control strings */}
        <CasedStroke d="M7.4,6.2 L9.6,14.4" color={APEX_GREEN} width={1.0} casing={1.8} />
        <CasedStroke d="M12.0,6.2 L12.0,13.0" color={APEX_GREEN} width={1.0} casing={1.8} />
        <CasedStroke d="M16.4,6.4 L14.4,14.4" color={APEX_GREEN} width={1.0} casing={1.8} />
        {/* Smaller wooden mannequin below */}
        <ApexWoodenMannequin x={12.0} y={16.1} scale={0.6} />
        {/* Top hand (V5 active, moved further up) */}
        {CONFIGURE_CONTROLS_HAND_VARIANTS[4].renderHand()}
      </g>
    ),
  },
  {
    id: 'sop.apex.mapcharacter',
    label: 'APEX Map Character',
    family: 'sop',
    description:
      'Two side-by-side outlined human figures: a white figure with red outline and white joint dots on the left, and a dark grey figure with green outline and green joint dots on the right.',
    types: ['mapcharacter', 'mappoints'],
    icons: ['sop_apex-mapcharacter', 'sop_kinefx-mappoints'],
    refKey: 'SOP_apex-mapcharacter',
    render: () => {
      const renderFigure = (cx: number, fill: string, outline: string, jointFill: string) => (
        <g transform={`translate(${cx} 12.2) scale(0.92) translate(-12 -12)`} strokeLinejoin="round">
          <circle cx="12" cy="4.4" r="1.9" fill={fill} stroke={outline} strokeWidth="1.1" />
          <path
            d="M9.4,7.2 C7.8,7.6 6.8,10.2 6.2,13.6 L7.8,14.0 L9.0,10.4 L9.8,13.8 L8.8,20.8 L10.8,20.8 L12.0,15.2 L13.2,20.8 L15.2,20.8 L14.2,13.8 L15.0,10.4 L16.2,14.0 L17.8,13.6 C17.2,10.2 16.2,7.6 14.6,7.2 Z"
            fill={fill}
            stroke={outline}
            strokeWidth="1.1"
          />
          {[
            [12.0, 7.6],
            [9.6, 8.6],
            [14.4, 8.6],
            [7.0, 13.6],
            [17.0, 13.6],
            [10.2, 16.4],
            [13.8, 16.4],
            [9.8, 20.2],
            [14.2, 20.2],
          ].map(([jx, jy], idx) => (
            <circle key={idx} cx={jx} cy={jy} r="1.1" fill={jointFill} stroke={APEX_OUTLINE} strokeWidth="0.7" />
          ))}
        </g>
      );
      return (
        <g>
          {renderFigure(7.8, '#eef2f7', '#e03228', '#ffffff')}
          {renderFigure(16.2, '#5a616b', APEX_OUTLINE, APEX_GREEN)}
        </g>
      );
    },
  },
  {
    id: 'sop.apex.rigpose',
    label: 'APEX Rig Pose',
    family: 'sop',
    description:
      'Blue KineFX figure in a dynamic running pose holding two vertical green control bars, with the right green bar ending right at the right hand.',
    types: ['rigpose'],
    icons: ['sop_apex-rigpose', 'sop_kinefx-rigpose'],
    refKey: 'SOP_apex-rigpose',
    render: () => (
      <g strokeLinejoin="round">
        {/* Right vertical green control bar ending right at the right hand */}
        <CasedStroke d="M18.8,4.2 V9.8" color={APEX_GREEN} width={1.25} casing={2.3} />
        {/* Left vertical green control bar */}
        <CasedStroke d="M7.2,5.6 V18.8" color={APEX_GREEN} width={1.25} casing={2.3} />
        {/* Dynamic running blue figure (right hand overlaps and ends the right bar) */}
        <circle cx="12.2" cy="5.0" r="1.75" fill="#8fc2ff" stroke={APEX_OUTLINE} strokeWidth="0.95" />
        <path
          d="M10.4,7.4 L14.2,7.4 L16.6,10.0 L18.8,8.8 L19.6,10.2 L16.2,12.2 L14.2,10.2 L13.6,13.6 L16.8,16.8 L14.8,20.8 L13.0,20.0 L14.4,17.0 L11.8,14.6 L9.8,17.4 L10.6,21.0 L8.6,21.2 L7.6,16.8 L10.0,13.2 L10.4,10.0 L7.6,11.6 L6.4,10.2 L9.4,8.0 Z"
          fill={KINEFX_BLUE_MID}
          stroke={APEX_OUTLINE}
          strokeWidth="0.95"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.addcharacterpicker',
    label: 'APEX Add Character Picker',
    family: 'sop',
    description:
      'Front-facing blue KineFX figure with white-filled, green-outlined rectangular picker control blocks on the chest, shoulders, hands, pelvis, knees, and feet.',
    types: ['addcharacterpicker'],
    icons: ['sop_apex-addcharacterpicker'],
    refKey: 'SOP_apex-addcharacterpicker',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxStandingFigure x={12} y={12} scale={1.04} fill={KINEFX_BLUE_LIGHT} />
        {[
          [10.2, 7.6, 3.6, 2.4], // chest
          [7.4, 7.6, 2.2, 2.2], // L shoulder
          [14.4, 7.6, 2.2, 2.2], // R shoulder
          [5.4, 12.6, 2.0, 2.2], // L hand
          [16.6, 12.6, 2.0, 2.2], // R hand
          [10.4, 11.4, 3.2, 2.0], // pelvis
          [8.4, 15.8, 2.2, 2.0], // L knee
          [13.4, 15.8, 2.2, 2.0], // R knee
          [8.0, 19.6, 2.6, 1.8], // L foot
          [13.4, 19.6, 2.6, 1.8], // R foot
        ].map(([bx, by, bw, bh], idx) => (
          <rect
            key={idx}
            x={bx}
            y={by}
            width={bw}
            height={bh}
            rx="0.3"
            fill="#ffffff"
            stroke={APEX_GREEN}
            strokeWidth="1.0"
          />
        ))}
      </g>
    ),
  },
  {
    id: 'sop.apex.animationfromskeleton',
    label: 'APEX Animation from Skeleton',
    family: 'sop',
    description:
      'White articulated bone skeleton in a dynamic kneeling lunge facing right, with one arm arcing high overhead and the other reaching down-right.',
    types: ['animationfromskeleton'],
    icons: ['sop_apex-animationfromskeleton'],
    refKey: 'SOP_apex-animationfromskeleton',
    render: () => <>{ANIM_FROM_SKELETON_V2_VARIANTS[0].render()}</>,
  },
  {
    id: 'sop.apex.channelprimitivesfrommotionclip',
    label: 'Channel Primitives from MotionClip',
    family: 'sop',
    description: 'Row of four ghosted blue running figures fading in opacity from left to right.',
    types: ['channelprimitivesfrommotionclip', 'motionclip'],
    icons: ['sop_apex-channelprimitivesfrommotionclip', 'sop_kinefx-motionclip'],
    refKey: 'SOP_apex-channelprimitivesfrommotionclip',
    render: () => (
      <g>
        {[0, 1, 2, 3].map((i) => (
          <KinefxRunner
            key={i}
            x={6.6 + i * 3.6}
            y={12.0}
            scale={0.9}
            fill={KINEFX_BLUE_LIGHT}
            opacity={0.55 + i * 0.15}
          />
        ))}
      </g>
    ),
  },
];
