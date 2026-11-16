import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 4, Part 0 (icons 0 to 9): built-in Houdini SOP icons under review.
 */
export const BATCH_04_PART_0: OperatorIconDef[] = [
  {
    id: 'sop.attribrandomize',
    label: 'Attribute Randomize',
    family: 'sop',
    description:
      'Shaded grey attribute pin at bottom-left with a white speech-bubble tag containing an isometric 3D die with dark pips.',
    types: ['attribrandomize', 'ml_attribgenerate'],
    icons: ['sop_attribrandomize', 'sop_ml_attribgenerate'],
    refKey: 'SOP_attribrandomize',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pin`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        <path
          d="M7 2H21.5V14.5H13.5L6.5 18.5L9.5 14.5H7Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <circle cx="4.8" cy="19.2" r="2.8" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.1" />
        {/* Isometric 3D die inside bubble */}
        <g stroke="#262626" strokeWidth="0.75" strokeLinejoin="round">
          <polygon points="14.2,3.2 19.2,4.8 14.8,6.8 9.8,5.2" fill="#ffffff" />
          <polygon points="9.8,5.2 14.8,6.8 14.8,12.5 9.8,10.6" fill="#c0c7d1" />
          <polygon points="14.8,6.8 19.2,4.8 19.2,10.5 14.8,12.5" fill="#89929e" />
        </g>
        <g fill="#262626">
          <circle cx="14.5" cy="5" r="0.55" />
          <circle cx="11.5" cy="7.2" r="0.55" />
          <circle cx="13.2" cy="9.6" r="0.55" />
          <circle cx="16.2" cy="7.3" r="0.55" />
          <circle cx="18" cy="6.5" r="0.55" />
          <circle cx="17" cy="8.6" r="0.55" />
          <circle cx="16.2" cy="10.4" r="0.55" />
          <circle cx="18" cy="9.6" r="0.55" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.attribremap',
    label: 'Attribute Remap',
    family: 'sop',
    description:
      'Isometric orange diamond plane with white point dots at the base and a tilted vertical graph card above showing blue and red remap curves.',
    types: ['attribremap'],
    icons: ['sop_attribremap'],
    refKey: 'SOP_attribremap',
    render: () => (
      <>
        <polygon
          points="12,12.8 21.5,17.2 12,21.8 2.5,17.2"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <g fill="#f2f4f7" stroke="#262626" strokeWidth="0.55">
          <circle cx="12" cy="13.2" r="0.85" />
          <circle cx="16.5" cy="15.2" r="0.85" />
          <circle cx="20.5" cy="17.2" r="0.85" />
          <circle cx="7.5" cy="15.2" r="0.85" />
          <circle cx="3.5" cy="17.2" r="0.85" />
          <circle cx="12" cy="17.2" r="0.85" />
          <circle cx="7.5" cy="19.2" r="0.85" />
          <circle cx="16.5" cy="19.2" r="0.85" />
          <circle cx="12" cy="21.2" r="0.85" />
        </g>
        <polygon
          points="5.5,2.2 19.2,6.2 19.2,14.8 5.5,10.8"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <line x1="6.5" y1="9.8" x2="18.2" y2="7" stroke="#3672c4" strokeWidth="1" strokeLinecap="round" />
        <path
          d="M6.5,9.8 C10,11 11.5,4.5 14.5,6.5 C16.5,7.8 17.2,11.5 18.2,7"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <g fill="#f2f4f7" stroke="#262626" strokeWidth="0.55">
          <circle cx="6.5" cy="9.8" r="0.8" />
          <circle cx="11.2" cy="7.2" r="0.8" />
          <circle cx="15" cy="7.5" r="0.8" />
          <circle cx="18.2" cy="7" r="0.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.attribute',
    label: 'Attribute Rename',
    family: 'sop',
    description:
      'Shaded grey attribute pin at bottom-left with a clean blank white speech-bubble tag pointing down to the pin.',
    types: ['attribute'],
    icons: ['sop_attribute'],
    refKey: 'SOP_attribute',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pin`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        <path
          d="M8.2 2.5H21.5V12H14.5L6.8 17.5L10.5 12H8.2Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M9.5 4H20.2V10.5H14" fill="none" stroke="#c0c7d1" strokeWidth="0.7" strokeLinejoin="round" />
        <circle cx="5" cy="19" r="3.1" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.15" />
      </>
    ),
  },
  {
    id: 'sop.attribreorient',
    label: 'Attribute Reorient',
    family: 'sop',
    description:
      'Shaded grey attribute pin at bottom-left with a white speech-bubble tag and a grey cogwheel gear inside the bubble.',
    types: ['attribreorient'],
    icons: ['sop_attribreorient'],
    refKey: 'SOP_attribreorient',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pin`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        <path
          d="M7.8 2.2H21.5V13H14.2L6.8 17.8L10.2 13H7.8Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <circle cx="5" cy="19" r="3" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.1" />
        {/* 8-tooth gear */}
        <path
          d="M15.4,4.2 H16.6 L16.9,5.5 L17.9,5.9 L19,5.1 L19.8,5.9 L19,7 L19.4,8 L20.7,8.3 V9.5 L19.4,9.8 L19,10.8 L19.8,11.9 L19,12.7 L17.9,11.9 L16.9,12.3 L16.6,13.6 H15.4 L15.1,12.3 L14.1,11.9 L13,12.7 L12.2,11.9 L13,10.8 L12.6,9.8 L11.3,9.5 V8.3 L12.6,8 L13,7 L12.2,5.9 L13,5.1 L14.1,5.9 L15.1,5.5 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="8.9" r="1.7" fill="#f2f4f7" stroke="#262626" strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'sop.attribsort',
    label: 'Attribute Sort',
    family: 'sop',
    description:
      'Shaded grey attribute pin at bottom-left with a white speech-bubble tag containing a red double-headed vertical sort arrow.',
    types: ['attribsort'],
    icons: ['sop_attribsort'],
    refKey: 'SOP_attribsort',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pin`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        <path
          d="M7.5 2H21.5V13.8H14.2L6.8 18L10.2 13.8H7.5Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <circle cx="5" cy="19" r="3" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.1" />
        <polygon
          points="14.8,3.4 17.8,6.2 15.8,6.2 15.8,9.6 17.8,9.6 14.8,12.4 11.8,9.6 13.8,9.6 13.8,6.2 11.8,6.2"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.attribstringedit',
    label: 'Attribute String Edit',
    family: 'sop',
    description:
      'Shaded grey attribute pin at bottom-left with a white speech-bubble tag showing dark letters ab and an orange vertical edit cursor.',
    types: ['attribstringedit'],
    icons: ['sop_attribstringedit'],
    refKey: 'SOP_attribstringedit',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pin`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        <path
          d="M7 2.2H21.5V13.5H13.8L6.8 18L10 13.5H7Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <circle cx="4.8" cy="19.2" r="2.9" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.1" />
        <text
          x="12.5"
          y="10.4"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="6.8"
          fontWeight="bold"
          fill="#262626"
        >
          ab
        </text>
        <path
          d="M17.2,4.2 H19.2 M18.2,4.2 V11.4 M17.2,11.4 H19.2"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.attribswap',
    label: 'Attribute Swap',
    family: 'sop',
    description:
      'Two speech-bubble attribute tags (blue-grey top-left and white bottom-right) linked by two opposing curved orange-red swap arrows.',
    types: ['attribswap'],
    icons: ['sop_attribswap'],
    refKey: 'SOP_attribswap',
    render: () => (
      <>
        {/* Top-left blue-grey tag */}
        <path
          d="M2.2 2.5H14.5V10.5H9.2L8.2 16.5L5.2 10.5H2.2Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Bottom-right white tag */}
        <path
          d="M9.5 9.5H21.8V17.5H18.5L15.5 22L14.5 17.5H9.5Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Top-right curved swap arrow */}
        <path
          d="M11.5,5.5 C16.5,4.2 19.5,6.8 18.8,11.5"
          fill="none"
          stroke="#262626"
          strokeWidth="3.1"
          strokeLinecap="round"
        />
        <path
          d="M11.5,5.5 C16.5,4.2 19.5,6.8 18.8,11.5"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <polygon
          points="16.2,10.8 21.2,11.2 18.2,14.2"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Bottom-left curved swap arrow */}
        <path
          d="M12.5,16.5 C7.5,17.8 4.5,15.2 5.2,10.5"
          fill="none"
          stroke="#262626"
          strokeWidth="3.1"
          strokeLinecap="round"
        />
        <path
          d="M12.5,16.5 C7.5,17.8 4.5,15.2 5.2,10.5"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <polygon
          points="2.8,11.2 7.8,10.8 5.8,7.8"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.attribtransfer',
    label: 'Attribute Transfer',
    family: 'sop',
    description:
      'Slanted grey platform with a glowing yellow-orange transfer streak leading to an orange sphere, and a speech-bubble tag with an arrow at top-right.',
    types: ['attribtransfer'],
    icons: ['sop_attribtransfer'],
    refKey: 'SOP_attribtransfer',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ball`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffe47a" />
            <stop offset="55%" stopColor="#ee8624" />
            <stop offset="100%" stopColor="#c25e12" />
          </radialGradient>
        </defs>
        {/* Slanted 3D platform */}
        <polygon
          points="2.2,11.5 11.5,8.5 21.5,15.2 10.8,19.8"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <polygon
          points="2.2,11.5 10.8,19.8 10.8,21.8 2.2,15.5"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <polygon
          points="10.8,19.8 21.5,15.2 21.5,17 10.8,21.8"
          fill="#5a616b"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Yellow-orange transfer beam */}
        <polygon
          points="5.5,9.5 8.5,8.5 15.8,15.2 11.8,17.2"
          fill="#f2c438"
          stroke="#c25e12"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        {/* Orange sphere */}
        <circle cx="14.2" cy="14.2" r="2.7" fill={`url(#${uid}-ball)`} stroke="#262626" strokeWidth="1" />
        {/* Top-right speech bubble tag with orange arrow */}
        <path
          d="M14 2H21.8V8.2H18L15.2 11.8L16 8.2H14Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M15.6,6.2 C16.5,4.2 18.2,4 19.8,5.2" fill="none" stroke="#ee8624" strokeWidth="1.3" strokeLinecap="round" />
        <polygon points="19.5,3.8 20.8,6 18.5,6" fill="#ee8624" />
      </>
    ),
  },
  {
    id: 'sop.attribtransferbyuv',
    label: 'Attribute Transfer by UV',
    family: 'sop',
    description:
      'Two stylized head busts side by side (left head segmented into blue, yellow, and red UV patches; right head blue) connected by a dashed arc arrow.',
    types: ['attribtransferbyuv'],
    icons: ['sop_attribtransferbyuv'],
    refKey: 'SOP_attribtransferbyuv',
    render: () => (
      <>
        {/* Dashed transfer arrow on top */}
        <path
          d="M7.5,6.8 C10,3 14,3 16.5,6.5"
          fill="none"
          stroke="#262626"
          strokeWidth="1.2"
          strokeDasharray="1.6 1.3"
          strokeLinecap="round"
        />
        <polygon points="17.2,7.2 14.8,6.5 16.8,4.6" fill="#262626" />
        {/* Left head: colorful UV patches */}
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <ellipse cx="3" cy="14.2" rx="1.1" ry="1.8" fill="#e03228" />
          <ellipse cx="11" cy="14.2" rx="1.1" ry="1.8" fill="#e03228" />
          <path d="M7,8 C4.5,8 3.2,10.2 3.4,14 C3.6,17.5 5.2,19.8 7,19.8 C8.8,19.8 10.4,17.5 10.6,14 C10.8,10.2 9.5,8 7,8 Z" fill="#3672c4" />
          <path d="M7,8 C5,8 3.6,9.8 3.5,12.5 L7,13.5 L10.5,12.5 C10.4,9.8 9,8 7,8 Z" fill="#f2c438" />
          <path d="M7,8 L7,19.8" stroke="#262626" strokeWidth="0.65" />
        </g>
        {/* Right head: blue target */}
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <ellipse cx="13" cy="14.2" rx="1.1" ry="1.8" fill="#3672c4" />
          <ellipse cx="21" cy="14.2" rx="1.1" ry="1.8" fill="#3672c4" />
          <path d="M17,8 C14.5,8 13.2,10.2 13.4,14 C13.6,17.5 15.2,19.8 17,19.8 C18.8,19.8 20.4,17.5 20.6,14 C20.8,10.2 19.5,8 17,8 Z" fill="#8fc2ff" />
          <path d="M17,8 C18.8,8 20.4,10.2 20.6,14 C20.4,17.5 18.8,19.8 17,19.8 Z" fill="#5aa2f2" stroke="none" />
          <path d="M17,8 C14.5,8 13.2,10.2 13.4,14 C13.6,17.5 15.2,19.8 17,19.8 C18.8,19.8 20.4,17.5 20.6,14 C20.8,10.2 19.5,8 17,8 Z" fill="none" />
        </g>
        <g fill="#3672c4">
          <circle cx="15.6" cy="13.5" r="0.7" />
          <circle cx="18.4" cy="13.5" r="0.7" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.attribvop',
    label: 'Attribute VOP',
    family: 'sop',
    description:
      'Shaded grey attribute pin at bottom-left with a white speech-bubble tag and a faceted purple-and-orange VOP crystal overlapping the right.',
    types: ['attribvop'],
    icons: ['sop_attribvop'],
    refKey: 'SOP_attribvop',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pin`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        <path
          d="M4.5 2H20.5V13.2H15.2L7.5 17.5L9.2 13.2H4.5Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <circle cx="5.5" cy="18.8" r="3.2" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.1" />
        {/* VOP V-crystal */}
        <g stroke="#262626" strokeWidth="0.8" strokeLinejoin="round">
          <polygon points="10.2,4.8 13.8,3.2 15.8,8.5 17.8,3.2 21.4,4.8 15.8,14.2" fill="#894f98" />
          <polygon points="13.8,3.2 15.8,8.5 17.8,3.2 15.8,5.2" fill="#ee8624" />
          <polygon points="10.2,4.8 13.8,3.2 15.8,8.5 15.8,14.2" fill="#c666bc" />
        </g>
      </>
    ),
  },
];
