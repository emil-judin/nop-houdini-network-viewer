import { roundedRectPath } from '../../../geoHelpers';
import type { OperatorIconDef } from '../../../iconTypes';
import { APEX_GREEN, APEX_OUTLINE, APEX_PURPLE_LIGHT, APEX_PURPLE_MID } from '../../kits/apex';
import { FEATHER_TONES, FeatherVane } from '../../kits/feather';
import { KINEFX_BLUE_DARK, KINEFX_BLUE_MID, KinefxStandingFigure } from '../../kits/kinefx';

/**
 * APEX scene operators.
 */
export const APEX_SCENE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.apex.sceneaddanimation',
    label: 'APEX Scene Add Animation',
    family: 'sop',
    description:
      'Rounded cream-grey CRT monitor with a dark screen displaying a glowing green skeleton figure and green UI bars.',
    types: ['sceneaddanimation', 'sceneimportanimation'],
    icons: ['sop_apex-sceneaddanimation', 'sop_apex-sceneimportanimation'],
    refKey: 'SOP_apex-sceneaddanimation',
    render: () => (
      <g strokeLinejoin="round">
        {/* Outer monitor bezel */}
        <path d={roundedRectPath(2.4, 3.6, 19.2, 16.8, 2.8)} fill="#eef2f7" stroke={APEX_OUTLINE} strokeWidth="1.05" />
        {/* Inner dark screen */}
        <path d={roundedRectPath(4.2, 5.4, 15.6, 13.2, 1.8)} fill="#3a3f47" stroke={APEX_OUTLINE} strokeWidth="0.9" />
        {/* Left & right green UI bars */}
        <rect x="5.4" y="8.2" width="2.2" height="2.0" rx="0.3" fill={APEX_GREEN} />
        <path d="M5.4,11.6 H7.6 M5.4,13.2 H7.2" stroke={APEX_GREEN} strokeWidth="0.7" strokeLinecap="round" />
        <path
          d="M16.4,9.0 H18.4 M16.4,10.8 H18.4 M16.4,12.6 H18.4"
          stroke={APEX_GREEN}
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        {/* Glowing green skeleton on screen */}
        <circle cx="12.0" cy="7.6" r="1.15" fill={APEX_GREEN} />
        <path
          d="M12.0,8.8 V13.2 M9.8,9.8 H14.2 M9.8,9.8 L8.8,12.8 M14.2,9.8 L15.2,12.8 M10.6,13.2 H13.4 M10.6,13.2 L10.0,17.2 M13.4,13.2 L14.0,17.2"
          fill="none"
          stroke={APEX_GREEN}
          strokeWidth="0.95"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.sceneaddcamera',
    label: 'APEX Scene Add Camera',
    family: 'sop',
    description:
      'Dark grey cinema movie camera facing right with two top film reels, rectangular body, and a flared lens hood.',
    types: ['camera', 'cameraimport', 'sceneaddcamera'],
    icons: ['sop_apex-sceneaddcamera', 'sop_camera', 'sop_cameraimport'],
    refKey: 'SOP_apex-sceneaddcamera',
    render: () => (
      <g strokeLinejoin="round">
        {/* Back film reel */}
        <circle cx="6.2" cy="8.4" r="3.4" fill="#89929e" stroke={APEX_OUTLINE} strokeWidth="0.95" />
        <circle cx="6.2" cy="8.4" r="1.4" fill="#eef2f7" stroke={APEX_OUTLINE} strokeWidth="0.75" />
        {/* Front film reel */}
        <circle cx="11.8" cy="6.6" r="3.4" fill="#c0c7d1" stroke={APEX_OUTLINE} strokeWidth="0.95" />
        <circle cx="11.8" cy="6.6" r="1.4" fill="#eef2f7" stroke={APEX_OUTLINE} strokeWidth="0.75" />
        {/* Camera body */}
        <path d={roundedRectPath(5.0, 10.6, 9.6, 6.8, 0.8)} fill="#89929e" stroke={APEX_OUTLINE} strokeWidth="1.0" />
        <rect
          x="6.4"
          y="12.0"
          width="5.2"
          height="3.8"
          rx="0.4"
          fill="#c0c7d1"
          stroke={APEX_OUTLINE}
          strokeWidth="0.7"
        />
        {/* Flared lens hood on right */}
        <polygon
          points="14.6,12.2 21.2,9.8 21.2,17.8 14.6,15.4"
          fill="#89929e"
          stroke={APEX_OUTLINE}
          strokeWidth="1.0"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.scenecopyanimation',
    label: 'APEX Scene Copy Animation',
    family: 'sop',
    description:
      'Two overlapping pale-purple open folders with white sheets inside, and a blue KineFX standing figure in the lower-right foreground.',
    types: ['scenecopyanimation'],
    icons: ['sop_apex-scenecopyanimation'],
    refKey: 'SOP_apex-scenecopyanimation',
    render: () => (
      <g strokeLinejoin="round">
        {/* Back purple folder */}
        <path
          d="M3.2,4.4 L7.4,3.8 L8.4,4.8 L13.8,4.0 L14.6,13.6 L4.0,15.6 Z"
          fill={APEX_PURPLE_MID}
          stroke={APEX_OUTLINE}
          strokeWidth="0.9"
        />
        <polygon points="4.0,15.6 5.0,8.2 15.0,6.2 14.6,13.6" fill="#ffffff" stroke={APEX_OUTLINE} strokeWidth="0.85" />
        {/* Front purple folder */}
        <path
          d="M5.6,9.2 L9.8,8.6 L10.8,9.6 L16.2,8.8 L17.0,18.6 L6.4,20.6 Z"
          fill={APEX_PURPLE_LIGHT}
          stroke={APEX_OUTLINE}
          strokeWidth="0.9"
        />
        <polygon
          points="6.4,20.6 7.4,13.2 17.4,11.2 17.0,18.6"
          fill="#ffffff"
          stroke={APEX_OUTLINE}
          strokeWidth="0.85"
        />
        {/* Blue standing KineFX figure at lower right */}
        <KinefxStandingFigure x={16.8} y={14.8} scale={0.68} fill={KINEFX_BLUE_DARK} />
      </g>
    ),
  },
  {
    id: 'sop.apex.scenemerge',
    label: 'APEX Scene Merge',
    family: 'sop',
    description:
      'Two tilted white-bordered snapshot cards (left with a yellow background, right with a green background) showing blue figures joined in the center by an orange notched tape strip.',
    types: ['scenemerge'],
    icons: ['sop_apex-scenemerge'],
    refKey: 'SOP_apex-scenemerge',
    render: () => (
      <g strokeLinejoin="round">
        {/* Left tilted snapshot card: yellow background -> figure -> white polaroid border on top */}
        <g transform="translate(7.4 11.4) rotate(-6)">
          <rect x="-3.8" y="-4.6" width="7.6" height="8.4" fill="#f2c438" />
          <KinefxStandingFigure x={0} y={0.4} scale={0.46} fill={KINEFX_BLUE_MID} />
          <polygon points="-1.2,-2.8 1.2,-2.8 0,-4.6" fill="#e03228" stroke={APEX_OUTLINE} strokeWidth="0.6" />
          <path
            d="M-4.4,-5.2 H4.4 V5.2 H-4.4 Z M-3.4,-4.2 V3.4 H3.4 V-4.2 Z"
            fill="#ffffff"
            fillRule="evenodd"
            stroke={APEX_OUTLINE}
            strokeWidth="0.85"
          />
        </g>
        {/* Right tilted snapshot card: green background -> figure -> white polaroid border on top */}
        <g transform="translate(16.6 12.6) rotate(8)">
          <rect x="-3.8" y="-4.6" width="7.6" height="8.4" fill="#52d638" />
          <KinefxStandingFigure x={0} y={0.4} scale={0.46} fill={KINEFX_BLUE_DARK} />
          <ellipse cx="0" cy="-2.6" rx="2.0" ry="0.7" fill="#f2c438" stroke={APEX_OUTLINE} strokeWidth="0.6" />
          <path
            d="M-4.4,-5.2 H4.4 V5.2 H-4.4 Z M-3.4,-4.2 V3.4 H3.4 V-4.2 Z"
            fill="#ffffff"
            fillRule="evenodd"
            stroke={APEX_OUTLINE}
            strokeWidth="0.85"
          />
        </g>
        {/* Orange notched tape strip in center */}
        <polygon
          points="10.2,8.4 13.8,8.4 13.4,10.0 13.8,11.8 13.4,13.6 13.8,15.4 10.2,15.4 10.6,13.6 10.2,11.8 10.6,10.0"
          fill="#ee8624"
          stroke={APEX_OUTLINE}
          strokeWidth="0.85"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.addgroom',
    label: 'APEX Add Groom',
    family: 'sop',
    description: 'Single curved purple feather with notched barbs and a white central quill, tilted slightly right.',
    types: [
      'addgroom',
      'featherinstancepool',
      'feathermatchuncondensed',
      'feathermindist',
      'feathernoise',
      'feathernormalize',
      'featherray',
      'featherresample',
      'feathersurface',
      'feathersurfaceblend',
      'feathertemplateassign',
      'featheruncondense',
      'featherutility',
    ],
    icons: [
      'sop_apex-addgroom',
      'sop_featherinstancepool',
      'sop_feathermatchuncondensed',
      'sop_feathermindist',
      'sop_feathernoise',
      'sop_feathernormalize',
      'sop_featherray',
      'sop_featherresample',
      'sop_feathersurface',
      'sop_feathersurfaceblend',
      'sop_feathertemplateassign',
      'sop_featheruncondense',
      'sop_featherutility',
    ],
    refKey: 'SOP_apex-addgroom',
    render: () => <FeatherVane transform="translate(12 12) rotate(12)" tones={FEATHER_TONES.purple} clumped />,
  },
  {
    id: 'sop.apex.addwrinkles',
    label: 'APEX Add Wrinkles',
    family: 'sop',
    description:
      'Sitting wrinkled tan Shar-Pei dog facing left in profile, with prominent skin folds along its neck and back and a dark muzzle.',
    types: ['addwrinkles', 'wrinkledeformer'],
    icons: ['sop_apex-addwrinkles', 'sop_wrinkledeformer'],
    refKey: 'SOP_apex-addwrinkles',
    render: () => (
      <g strokeLinejoin="round">
        {/* Curled tail */}
        <path
          d="M17.4,15.2 C19.8,14.2 21.0,12.4 19.8,10.6 C18.8,11.4 18.2,12.8 16.8,14.0 Z"
          fill="#c89a5a"
          stroke={APEX_OUTLINE}
          strokeWidth="0.95"
        />
        {/* Sitting Shar-Pei dog body, head, front leg, and haunch */}
        <path
          d="M5.6,5.8 C6.8,4.2 9.4,4.2 10.6,5.8 L12.0,9.0 C13.6,10.6 15.8,12.4 17.4,14.4 C18.4,16.2 18.0,18.6 16.2,19.6 L15.8,20.8 L11.4,20.8 L12.2,19.2 L9.4,19.2 L9.0,20.8 L6.2,20.8 L6.8,16.8 L6.6,12.4 C5.4,11.4 5.2,10.2 5.4,9.4 L3.4,8.8 C3.0,7.8 3.4,6.4 4.6,6.0 Z"
          fill="#c89a5a"
          stroke={APEX_OUTLINE}
          strokeWidth="1.0"
        />
        {/* Dark boxy muzzle */}
        <path
          d="M4.6,6.0 L3.4,6.8 L3.4,8.8 L5.4,9.4 C6.0,8.2 5.6,6.8 4.6,6.0 Z"
          fill="#3a3f47"
          stroke={APEX_OUTLINE}
          strokeWidth="0.85"
        />
        {/* Dark floppy ear */}
        <path
          d="M8.0,6.0 C9.2,5.8 9.8,7.0 9.0,8.8 C7.8,8.6 7.4,7.2 8.0,6.0 Z"
          fill="#7e5828"
          stroke={APEX_OUTLINE}
          strokeWidth="0.8"
        />
        {/* Front leg separation line */}
        <path d="M9.0,14.4 L9.4,19.2" fill="none" stroke={APEX_OUTLINE} strokeWidth="0.8" strokeLinecap="round" />
        {/* Lower body wrinkle fold arcs only (no brown lines near head/neck) */}
        <path
          d="M10.0,13.0 C12.0,13.8 13.8,13.2 14.8,11.8 M11.6,15.2 C13.6,16.0 15.4,15.4 16.6,14.0 M12.8,17.4 C14.6,18.0 16.2,17.4 17.0,16.2"
          fill="none"
          stroke="#7e5828"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </g>
    ),
  },
];
