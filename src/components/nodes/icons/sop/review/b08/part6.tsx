import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 8, Part 6 (icons 60 to 66): built-in Houdini SOP icons under review.
 */
export const BATCH_08_PART_6: OperatorIconDef[] = [
  {
    id: 'sop.apex.sceneaddcamera',
    label: 'APEX Scene Add Camera',
    family: 'sop',
    description:
      'Slate-blue cinema camera with dual film reels on top and an angled matte-box lens hood on the right.',
    types: ['camera', 'cameraimport', 'sceneaddcamera'],
    icons: ['sop_apex-sceneaddcamera', 'sop_camera', 'sop_cameraimport'],
    refKey: 'SOP_apex-sceneaddcamera',
    render: () => (
      <g>
        {/* Dual film reels */}
        <circle cx="9.8" cy="6.2" r="3.4" fill="#80898f" stroke="#0f212c" strokeWidth="0.9" />
        <circle cx="9.8" cy="6.2" r="1" fill="#0f212c" />
        <circle cx="5.2" cy="12" r="3.2" fill="#80898f" stroke="#0f212c" strokeWidth="0.9" />
        <circle cx="5.2" cy="12" r="1" fill="#0f212c" />
        {/* Camera body */}
        <rect
          x="7.5"
          y="9.2"
          width="7.2"
          height="6.8"
          rx="1.2"
          fill="#5a666e"
          stroke="#0f212c"
          strokeWidth="0.95"
        />
        {/* Matte-box lens hood on the right */}
        <polygon
          points="14.7,10.5 21.5,7.8 20.8,16.5 14.7,14.5"
          fill="#80898f"
          stroke="#0f212c"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.sceneaddcharacter',
    label: 'APEX Scene Add Character',
    family: 'sop',
    description:
      'Purple APEX graph grid panel with green bone links and an orange add-character badge.',
    types: ['sceneaddcharacter', 'sceneaddprop'],
    icons: ['sop_apex-sceneaddcharacter', 'sop_apex-sceneaddprop'],
    refKey: 'SOP_apex-sceneaddcharacter',
    render: () => (
      <g>
        {/* Purple APEX graph grid panel */}
        <rect
          x="2.5"
          y="4.8"
          width="16"
          height="13.8"
          rx="1"
          fill="#ad7fa8"
          stroke="#262626"
          strokeWidth="0.85"
        />
        <g stroke="#cc9ac9" strokeWidth="0.5">
          <line x1="6.5" y1="4.8" x2="6.5" y2="18.6" />
          <line x1="10.5" y1="4.8" x2="10.5" y2="18.6" />
          <line x1="14.5" y1="4.8" x2="14.5" y2="18.6" />
          <line x1="2.5" y1="9.4" x2="18.5" y2="9.4" />
          <line x1="2.5" y1="14" x2="18.5" y2="14" />
        </g>
        {/* Green bone links inside graph */}
        <path
          d="M10.5,2.5 V11.5 M6,12.5 L10.5,9.5 L15,12.5"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="10.5" cy="9.5" r="1.2" fill="#eeeeec" stroke="#4e9a06" strokeWidth="0.6" />
        {/* Orange plus badge at bottom-right */}
        <circle cx="18" cy="17.2" r="3.6" fill="#f57900" stroke="#ce5c00" strokeWidth="0.8" />
        <path
          d="M18,15.2 V19.2 M16,17.2 H20"
          stroke="#ffffff"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.sceneanimate',
    label: 'APEX Scene Animate',
    family: 'sop',
    description:
      'Purple APEX graph grid panel with animated green FK bones and an orange keyframe curve.',
    types: ['sceneanimate'],
    icons: ['sop_apex-sceneanimate'],
    refKey: 'SOP_apex-sceneanimate',
    render: () => (
      <g>
        {/* Purple APEX graph grid panel */}
        <rect
          x="2.2"
          y="6.2"
          width="17.5"
          height="14.5"
          rx="1"
          fill="#ad7fa8"
          stroke="#262626"
          strokeWidth="0.85"
        />
        <g stroke="#cc9ac9" strokeWidth="0.5">
          <line x1="6.5" y1="6.2" x2="6.5" y2="20.7" />
          <line x1="11" y1="6.2" x2="11" y2="20.7" />
          <line x1="15.5" y1="6.2" x2="15.5" y2="20.7" />
          <line x1="2.2" y1="11" x2="19.7" y2="11" />
          <line x1="2.2" y1="15.8" x2="19.7" y2="15.8" />
        </g>
        {/* Green FK bone chain */}
        <path
          d="M10.5,3 V12.5 L6.5,16.5 M10.5,12.5 L15,16.5"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10.5" cy="12.5" r="1.2" fill="#eeeeec" stroke="#4e9a06" strokeWidth="0.6" />
        {/* Orange animation arc at top-right */}
        <path
          d="M14.5,4 C17.5,3.5 20.5,5.5 21,9.5"
          fill="none"
          stroke="#f57900"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <polygon points="21,11.2 19.2,8.8 22.2,8.8" fill="#f57900" />
      </g>
    ),
  },
  {
    id: 'sop.apex.scenecopyanimation',
    label: 'APEX Scene Copy Animation',
    family: 'sop',
    description:
      'Purple animation folder opening to reveal copied orange and white animation clip pages.',
    types: ['scenecopyanimation'],
    icons: ['sop_apex-scenecopyanimation'],
    refKey: 'SOP_apex-scenecopyanimation',
    render: () => (
      <g>
        {/* Back purple folder */}
        <path
          d="M2.2,5.2 L7.5,4 L9,5.8 L16.2,4.2 L17.5,16.5 L3.5,19.8 Z"
          fill="#ad7fa8"
          stroke="#5c3566"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Copied white and orange animation sheets */}
        <rect
          x="8.2"
          y="6.8"
          width="10.2"
          height="11.5"
          rx="0.8"
          fill="#f3f7f8"
          stroke="#525b66"
          strokeWidth="0.8"
        />
        <rect
          x="11.2"
          y="9.2"
          width="10.2"
          height="11.5"
          rx="0.8"
          fill="#fcd18f"
          stroke="#ce5c0b"
          strokeWidth="0.85"
        />
        {/* Running figure silhouette on copied sheet */}
        <circle cx="16.5" cy="12.2" r="1.2" fill="#e96712" />
        <path
          d="M14,14.5 L18.8,14 L16.5,16.5 L18.5,19 M16.5,16.5 L14.2,19"
          fill="none"
          stroke="#ce5c0b"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.scenemerge',
    label: 'APEX Scene Merge',
    family: 'sop',
    description:
      'Two framed scene cards with blue characters merging together via a bright-green and yellow arrow.',
    types: ['scenemerge'],
    icons: ['sop_apex-scenemerge'],
    refKey: 'SOP_apex-scenemerge',
    render: () => (
      <g>
        {/* Left scene card */}
        <rect
          x="2"
          y="3.5"
          width="10.5"
          height="13.5"
          rx="0.8"
          fill="#eeeeec"
          stroke="#204a87"
          strokeWidth="0.8"
        />
        <rect x="3.2" y="4.8" width="8.1" height="9.8" fill="#d0dfef" />
        <circle cx="7.2" cy="7.2" r="1.3" fill="#285092" />
        <path d="M5.2,9.2 H9.2 L8.5,13.8 H5.9 Z" fill="#608bc3" />
        {/* Right scene card */}
        <rect
          x="11.5"
          y="7"
          width="10.5"
          height="13.5"
          rx="0.8"
          fill="#eeeeec"
          stroke="#204a87"
          strokeWidth="0.8"
        />
        <rect x="12.7" y="8.3" width="8.1" height="9.8" fill="#d0dfef" />
        <circle cx="16.8" cy="10.7" r="1.3" fill="#285092" />
        <path d="M14.8,12.7 H18.8 L18.1,17.3 H15.5 Z" fill="#608bc3" />
        {/* Green/yellow merge arrow */}
        <polygon
          points="7.5,14.5 12.5,14.5 12.5,12.8 15.8,15.5 12.5,18.2 12.5,16.5 7.5,16.5"
          fill="#7be028"
          stroke="#00255d"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.script',
    label: 'APEX Script',
    family: 'sop',
    description:
      'Purple APEX graph grid panel with green bone links and a dark script console badge.',
    types: [],
    icons: ['sop_apex-script'],
    refKey: 'SOP_apex-script',
    render: () => (
      <g>
        {/* Purple APEX graph grid panel */}
        <rect
          x="2.2"
          y="4.5"
          width="15.5"
          height="13.2"
          rx="1"
          fill="#ad7fa8"
          stroke="#262626"
          strokeWidth="0.85"
        />
        <g stroke="#cc9ac9" strokeWidth="0.5">
          <line x1="6" y1="4.5" x2="6" y2="17.7" />
          <line x1="10" y1="4.5" x2="10" y2="17.7" />
          <line x1="14" y1="4.5" x2="14" y2="17.7" />
          <line x1="2.2" y1="9" x2="17.7" y2="9" />
          <line x1="2.2" y1="13.5" x2="17.7" y2="13.5" />
        </g>
        {/* Green bone links inside graph */}
        <path
          d="M10,2.5 V11.5 M6,11.5 L10,8.2 L14,11.5"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="10" cy="8.2" r="1.2" fill="#eeeeec" stroke="#262626" strokeWidth="0.6" />
        {/* Dark script console window at bottom-right */}
        <rect
          x="11.5"
          y="12.5"
          width="10.2"
          height="8.5"
          rx="1"
          fill="#302e48"
          stroke="#eeeeec"
          strokeWidth="0.75"
        />
        <path
          d="M13.5,15 L15.5,16.6 L13.5,18.2 M16.5,18.2 H19.5"
          fill="none"
          stroke="#b6ffa7"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.channelprimitivesfrommotionclip',
    label: 'Channel Primitives from MotionClip',
    family: 'sop',
    description:
      'Running blue character with a faded motion trail and bright-green animation channel wave curves.',
    types: ['channelprimitivesfrommotionclip', 'motionclip'],
    icons: ['sop_apex-channelprimitivesfrommotionclip', 'sop_kinefx-motionclip'],
    refKey: 'SOP_apex-channelprimitivesfrommotionclip',
    render: () => (
      <g>
        {/* Faded ghost pose behind */}
        <g opacity="0.35">
          <circle cx="8.2" cy="5.2" r="1.8" fill="#729fcf" stroke="#204a87" strokeWidth="0.7" />
          <path
            d="M4.2,8.5 L12.2,7.8 L13.8,11.5 L10,14.5 L13.2,19.8 L8.2,16 L4,20.2 L6.5,14.2 Z"
            fill="#729fcf"
            stroke="#204a87"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
        </g>
        {/* Running blue character */}
        <circle cx="14.5" cy="4.5" r="2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M9.5,8.2 L19.5,6.8 L21.5,11 L19.8,11.6 L17.2,9.2 L15.8,14.5 L20.2,20.2 L18.2,21 L14.2,15.8 L8.8,21 L7.2,20 L11.5,14.2 L11.8,9.8 L7.5,11.8 L6.2,10.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Green animation channel sine wave across bottom */}
        <path
          d="M2.2,16.5 C5,12.5 8,20.5 11,16.5 C14,12.5 17,20.5 21.5,16.5"
          fill="none"
          stroke="#4e9a06"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M2.2,16.5 C5,12.5 8,20.5 11,16.5 C14,12.5 17,20.5 21.5,16.5"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </g>
    ),
  },
];
