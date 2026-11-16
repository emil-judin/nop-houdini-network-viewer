import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_07_PART_1: OperatorIconDef[] = [
  {
    id: 'sop.musclemerge',
    label: 'Muscle Merge',
    family: 'sop',
    description:
      'Two curved pink-and-crimson muscle spindles merging into a single shared tendon with a blue seam.',
    types: ['musclemerge'],
    icons: ['sop_musclemerge'],
    refKey: 'SOP_musclemerge',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mm`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fad6df" />
            <stop offset="50%" stopColor="#d83252" />
            <stop offset="100%" stopColor="#a40000" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Upper/right muscle spindle */}
          <path
            d="M8.5,3.2 C12.5,5.5 16.5,9.8 19.2,15.5 L20.8,19.2 L17.2,18.2 C12.2,14.5 9.5,9.5 6.8,4.8 Z"
            fill={`url(#${uid}-mm)`}
            strokeWidth="1.0"
          />
          {/* Lower/left muscle spindle merging in */}
          <path
            d="M3.2,6.8 C6.8,11.5 11.2,15.8 17.2,18.2 L20.5,19.5 L18.2,20.8 C11.5,19.2 5.8,14.5 2.5,8.8 Z"
            fill={`url(#${uid}-mm)`}
            strokeWidth="1.0"
          />
          {/* White tendon caps */}
          <circle cx="7.6" cy="4" r="1.2" fill="#eeeeec" strokeWidth="0.75" />
          <circle cx="3" cy="7.8" r="1.2" fill="#eeeeec" strokeWidth="0.75" />
          <polygon points="17.8,17.8 21.2,18.8 20.2,21.2 16.8,19.8" fill="#eeeeec" strokeWidth="0.85" />
          {/* Blue merge seam */}
          <path d="M8.2,10.2 C11.5,13.5 14.5,16.2 18.2,18.2" fill="none" stroke="#262626" strokeWidth="1.8" />
          <path d="M8.2,10.2 C11.5,13.5 14.5,16.2 18.2,18.2" fill="none" stroke="#729fcf" strokeWidth="1.0" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.musclemirror',
    label: 'Muscle Mirror',
    family: 'sop',
    description:
      'Isometric yellow-framed mirror plane reflecting a blue flexed arm muscle across the center.',
    types: ['musclemirror'],
    icons: ['sop_musclemirror'],
    refKey: 'SOP_musclemirror',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Left original arm muscle */}
          <path
            d="M2.5,11.5 C2.5,9 4,7.8 5.5,8.5 C6.5,9 7,10.8 7.5,12.5 L10.5,11.5 L10.5,15.5 C7.5,16.5 4,15 2.5,11.5 Z"
            fill="#3465a4"
            strokeWidth="0.95"
          />
          {/* Diagonal isometric mirror plane */}
          <polygon
            points="10,2.5 20.5,6.2 20.5,20.5 10,16.8"
            fill="#b2cbe5"
            strokeWidth="1.05"
          />
          <polygon
            points="10,2.5 11.5,1.8 21.5,5.5 20.5,6.2"
            fill="#fce94f"
            strokeWidth="0.85"
          />
          <polygon
            points="20.5,6.2 21.5,5.5 21.5,19.8 20.5,20.5"
            fill="#c4a000"
            strokeWidth="0.85"
          />
          {/* Reflected blue arm muscle on the mirror */}
          <path
            d="M11.8,10.5 C12,8.5 13.5,8 14.8,9 C15.8,9.8 16.2,11.5 16.8,12.8 C17.5,11.2 18,9.2 18.2,7.5 L19.5,8.2 C19.5,12 18.8,15.8 17,16.5 C14.8,16 12.2,13.5 11.8,10.5 Z"
            fill="#00255d"
            strokeWidth="0.9"
          />
          <path d="M13,9.8 C14.5,10.5 15.5,12.5 16.2,14.5" fill="none" stroke="#729fcf" strokeWidth="0.7" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.musclepaint',
    label: 'Muscle Paint',
    family: 'sop',
    description:
      'Horizontal pink-and-red muscle spindle below an angled wooden paintbrush applying crimson paint.',
    types: ['musclepaint'],
    icons: ['sop_musclepaint'],
    refKey: 'SOP_musclepaint',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mp`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f587a5" />
            <stop offset="50%" stopColor="#da3f63" />
            <stop offset="100%" stopColor="#900004" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Horizontal muscle spindle at bottom */}
          <rect x="2.2" y="15.2" width="2.4" height="2.6" rx="0.5" fill="#e9e9e6" strokeWidth="0.85" />
          <rect x="19.4" y="15.2" width="2.4" height="2.6" rx="0.5" fill="#e9e9e6" strokeWidth="0.85" />
          <path
            d="M4.2,15.4 C7.2,13.2 10,12.5 12,12.5 C14,12.5 16.8,13.2 19.8,15.4 V17.6 C16.8,19.8 14,20.5 12,20.5 C10,20.5 7.2,19.8 4.2,17.6 Z"
            fill={`url(#${uid}-mp)`}
            strokeWidth="1.05"
          />
          <path d="M6,16.5 C9.5,15.2 14.5,15.2 18,16.5" fill="none" stroke="#900004" strokeWidth="0.65" />
          {/* Wooden paintbrush at top */}
          <path
            d="M13.5,6.2 L20.2,3 C21.1,2.6 21.8,3.4 21.3,4.3 L16.2,9.2 Z"
            fill="#c17d11"
            strokeWidth="0.95"
          />
          <polygon points="11.8,7.2 13.8,6 16.2,9 14.2,10.2" fill="#abafa6" strokeWidth="0.85" />
          <path
            d="M8.2,11.2 C9.2,9.2 10.5,7.8 12,7.2 L14.2,10 C12.5,11.2 10.2,11.8 8.2,11.2 Z"
            fill="#da3f63"
            strokeWidth="0.95"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.musclepreroll',
    label: 'Muscle Preroll',
    family: 'sop',
    description:
      'Blue initial limb pose on the left and pink-red active muscle limb on the right linked by a green preroll arrow.',
    types: ['musclepreroll'],
    icons: ['sop_musclepreroll'],
    refKey: 'SOP_musclepreroll',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Left blue preroll limb */}
          <path
            d="M4.5,4.5 L8,4.5 C8.5,8 8.2,11.5 7.8,15.5 L9.5,17.2 L5.2,17.8 L5.5,14.5 C5,11 4.2,7.8 4.5,4.5 Z"
            fill="#608bc3"
            strokeWidth="0.95"
          />
          {/* Right pink/red active muscle limb */}
          <path
            d="M14.5,6.5 L18,6.5 C19.2,10 19,13.5 18.2,17.5 L20.2,19.2 L15.5,19.8 L15.8,16.5 C14.5,13 13.8,9.8 14.5,6.5 Z"
            fill="#f47b9c"
            strokeWidth="0.95"
          />
          <path d="M16.2,8.5 C17.2,11 17.2,13.5 16.5,16" fill="none" stroke="#900004" strokeWidth="0.8" />
          {/* Green preroll transition arrow */}
          <polygon
            points="9.2,9.8 12.2,9.8 12.2,8.2 15,11 12.2,13.8 12.2,12.2 9.2,12.2"
            fill="#7be028"
            strokeWidth="0.85"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.musclepropertiesotis',
    label: 'Muscle Properties Otis',
    family: 'sop',
    description:
      'Diagonal pink-and-crimson muscle spindle with a green downward arrow and purple-blue Otis wave overlay.',
    types: ['musclepropertiesotis'],
    icons: ['sop_musclepropertiesotis'],
    refKey: 'SOP_musclepropertiesotis',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mpo`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f587a5" />
            <stop offset="50%" stopColor="#dd87f5" />
            <stop offset="100%" stopColor="#900004" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* White tendon tips */}
          <polygon points="3.2,19.2 5,20.8 7.5,18.5 5.5,16.5" fill="#ffffff" strokeWidth="0.9" />
          <polygon points="19.2,3.2 20.8,5 18.5,7.5 16.5,5.5" fill="#ffffff" strokeWidth="0.9" />
          {/* Diagonal muscle spindle */}
          <path
            d="M5.5,16.8 C6.8,11.5 11.5,6.8 16.8,5.5 L18.5,7.2 C17.2,12.5 12.5,17.2 7.2,18.5 Z"
            fill={`url(#${uid}-mpo)`}
            strokeWidth="1.05"
          />
          <path d="M7.2,16.8 C10.2,13 13,10.2 16.8,7.2" fill="none" stroke="#900004" strokeWidth="0.65" />
          {/* Green downward property arrow at top-left */}
          <polygon
            points="5.2,2.5 7.8,2.5 7.8,6.2 9.5,6.2 6.5,9.5 3.5,6.2 5.2,6.2"
            fill="#8ae234"
            strokeWidth="0.9"
          />
          {/* Blue Otis slider bar at bottom-right */}
          <rect x="13" y="16.5" width="8" height="2.4" rx="0.6" fill="#729fcf" strokeWidth="0.85" />
          <circle cx="17" cy="17.7" r="1.6" fill="#8ae234" strokeWidth="0.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.muscleproperties',
    label: 'Muscle Properties Vellum',
    family: 'sop',
    description:
      'Diagonal pink-and-crimson muscle spindle with a green downward arrow and blue Vellum constraint nodes.',
    types: ['muscleproperties'],
    icons: ['sop_muscleproperties'],
    refKey: 'SOP_muscleproperties',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mpv`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f587a5" />
            <stop offset="55%" stopColor="#f17495" />
            <stop offset="100%" stopColor="#900004" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* White tendon tips */}
          <polygon points="3.2,19.2 5,20.8 7.5,18.5 5.5,16.5" fill="#ffffff" strokeWidth="0.9" />
          <polygon points="19.2,3.2 20.8,5 18.5,7.5 16.5,5.5" fill="#ffffff" strokeWidth="0.9" />
          {/* Diagonal muscle spindle */}
          <path
            d="M5.5,16.8 C6.8,11.5 11.5,6.8 16.8,5.5 L18.5,7.2 C17.2,12.5 12.5,17.2 7.2,18.5 Z"
            fill={`url(#${uid}-mpv)`}
            strokeWidth="1.05"
          />
          <path d="M7.2,16.8 C10.2,13 13,10.2 16.8,7.2" fill="none" stroke="#900004" strokeWidth="0.65" />
          {/* Green downward property arrow at top-left */}
          <polygon
            points="5.2,2.5 7.8,2.5 7.8,6.2 9.5,6.2 6.5,9.5 3.5,6.2 5.2,6.2"
            fill="#73d216"
            strokeWidth="0.9"
          />
          {/* Blue Vellum spring/node badge at bottom-right */}
          <line x1="14" y1="18" x2="19.5" y2="18" stroke="#204a87" strokeWidth="1.4" />
          <circle cx="14.2" cy="18" r="1.6" fill="#729fcf" strokeWidth="0.85" />
          <circle cx="19.5" cy="18" r="1.6" fill="#729fcf" strokeWidth="0.85" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.musclesolidify',
    label: 'Muscle Solidify',
    family: 'sop',
    description:
      'Diagonal pink-and-crimson muscle spindle transitioning into a faceted blue tetrahedral mesh on the upper half.',
    types: ['musclesolidify'],
    icons: ['sop_musclesolidify'],
    refKey: 'SOP_musclesolidify',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* White tendon ends */}
          <polygon points="3.2,19.2 5,20.8 7.5,18.5 5.5,16.5" fill="#ffffff" strokeWidth="0.9" />
          <polygon points="19.2,3.2 20.8,5 18.5,7.5 16.5,5.5" fill="#ffffff" strokeWidth="0.9" />
          {/* Lower-left pink/red smooth muscle half */}
          <path
            d="M5.5,16.8 C6.2,13.5 8.5,10.2 11.5,8.2 L15.8,12.5 C13.8,15.5 10.5,17.8 7.2,18.5 Z"
            fill="#e86082"
            strokeWidth="1.05"
          />
          <path d="M6.8,17.2 C8.5,14.8 10.5,12.5 12.8,10.5" fill="none" stroke="#900004" strokeWidth="0.65" />
          {/* Upper-right blue solidified tetrahedral mesh half */}
          <path
            d="M11.5,8.2 C13.5,6.8 15.2,6 16.8,5.5 L18.5,7.2 C18,8.8 17.2,10.5 15.8,12.5 Z"
            fill="#729fcf"
            strokeWidth="1.05"
          />
          <path
            d="M11.5,8.2 L15.2,7.8 L13.8,10.5 Z M15.2,7.8 L18.2,7.5 L15.8,12.5 L13.8,10.5 Z"
            fill="none"
            stroke="#262626"
            strokeWidth="0.65"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.musclesolvervellum',
    label: 'Muscle Solver Vellum',
    family: 'sop',
    description:
      'Dynamic running anatomical figure made of pink-and-crimson muscle spindles and pale tendons.',
    types: ['musclesolvervellum'],
    icons: ['sop_musclesolvervellum'],
    refKey: 'SOP_musclesolvervellum',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Head */}
          <circle cx="15.5" cy="4.2" r="2" fill="#f992ad" strokeWidth="0.9" />
          {/* Torso muscle spindle */}
          <path
            d="M14.2,6.2 C15.8,7.2 16.2,9.8 14.5,12.5 C12.8,14.5 10.8,14.5 9.8,13.2 C9.2,10.8 11.2,7.2 14.2,6.2 Z"
            fill="#d83252"
            strokeWidth="0.95"
          />
          {/* Arms */}
          <path d="M14.5,7.2 L19.5,9.5 L21,7.5" fill="none" stroke="#262626" strokeWidth="2.4" />
          <path d="M14.5,7.2 L19.5,9.5 L21,7.5" fill="none" stroke="#f58fa8" strokeWidth="1.3" />
          <path d="M12.5,7.2 L7.8,6.5 L6,9.2" fill="none" stroke="#262626" strokeWidth="2.4" />
          <path d="M12.5,7.2 L7.8,6.5 L6,9.2" fill="none" stroke="#f58fa8" strokeWidth="1.3" />
          {/* Front and back running legs */}
          <path d="M12.8,13.2 L16.8,16.5 L14.5,21" fill="none" stroke="#262626" strokeWidth="2.6" />
          <path d="M12.8,13.2 L16.8,16.5 L14.5,21" fill="none" stroke="#d83252" strokeWidth="1.5" />
          <path d="M10.2,13 L6.8,16.8 L3,16.2" fill="none" stroke="#262626" strokeWidth="2.6" />
          <path d="M10.2,13 L6.8,16.8 L3,16.2" fill="none" stroke="#e96985" strokeWidth="1.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.muscletensionlines',
    label: 'Muscle Tension Lines',
    family: 'sop',
    description:
      'Dark blue flexed limb with bright green tension lines spanning the upper and lower muscle groups.',
    types: ['muscletensionlines'],
    icons: ['sop_muscletensionlines'],
    refKey: 'SOP_muscletensionlines',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mtl`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#608bc3" />
            <stop offset="55%" stopColor="#285092" />
            <stop offset="100%" stopColor="#00255d" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Blue flexed limb */}
          <path
            d="M9.5,2.8 C7.5,4.2 7.5,7 10.5,10.5 L7.8,15.2 C6.5,17.2 7.2,19.8 10,20.8 C12.8,21.5 16.5,19.5 18.2,16.2 C20,12.8 19.5,9.8 17.2,7 L12.5,2.8 C11.5,2.2 10.3,2.3 9.5,2.8 Z"
            fill={`url(#${uid}-mtl)`}
            strokeWidth="1.05"
          />
          {/* Green tension fiber lines */}
          <path
            d="M10.2,4.2 L16.5,10.5 M9,6.2 L15.5,12.8 M9.5,15.5 L15.8,15.5 M9.2,17.8 L14.5,17.8"
            fill="none"
            stroke="#262626"
            strokeWidth="1.7"
          />
          <path
            d="M10.2,4.2 L16.5,10.5 M9,6.2 L15.5,12.8 M9.5,15.5 L15.8,15.5 M9.2,17.8 L14.5,17.8"
            fill="none"
            stroke="#8ae234"
            strokeWidth="0.95"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.muscletensionlinesactivate',
    label: 'Muscle Tension Lines Activate',
    family: 'sop',
    description:
      'Dark blue flexed limb with bright green tension lines and a glowing green activation bolt.',
    types: ['muscletensionlinesactivate'],
    icons: ['sop_muscletensionlinesactivate'],
    refKey: 'SOP_muscletensionlinesactivate',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mtla`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#608bc3" />
            <stop offset="55%" stopColor="#285092" />
            <stop offset="100%" stopColor="#00255d" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Blue flexed limb */}
          <path
            d="M7.5,2.8 C5.5,4.2 5.5,7 8.5,10.5 L5.8,15.2 C4.5,17.2 5.2,19.8 8,20.8 C10.8,21.5 14.5,19.5 16.2,16.2 C18,12.8 17.5,9.8 15.2,7 L10.5,2.8 C9.5,2.2 8.3,2.3 7.5,2.8 Z"
            fill={`url(#${uid}-mtla)`}
            strokeWidth="1.05"
          />
          {/* Green tension lines */}
          <path
            d="M8.2,4.2 L14.5,10.5 M7,6.2 L13.5,12.8 M7.5,16.2 L13.8,16.2"
            fill="none"
            stroke="#262626"
            strokeWidth="1.7"
          />
          <path
            d="M8.2,4.2 L14.5,10.5 M7,6.2 L13.5,12.8 M7.5,16.2 L13.8,16.2"
            fill="none"
            stroke="#8ae234"
            strokeWidth="0.95"
          />
          {/* Activation lightning/spark badge on right */}
          <polygon
            points="18.5,3 15.5,8.2 18.2,8.2 16.5,13.5 21.5,7.2 18.8,7.2"
            fill="#8ae234"
            strokeWidth="0.85"
          />
        </g>
      </>
    ),
  },
];
