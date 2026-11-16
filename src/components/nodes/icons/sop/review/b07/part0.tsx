import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_07_PART_0: OperatorIconDef[] = [
  {
    id: 'sop.frankenmuscle',
    label: 'Franken Muscle',
    family: 'sop',
    description:
      'Diagonal green muscle spindle with white tendon tips, dark cross-stitches, and metallic neck bolts.',
    types: ['frankenmuscle'],
    icons: ['sop_frankenmuscle'],
    refKey: 'SOP_frankenmuscle',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-fm`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b1fa46" />
            <stop offset="55%" stopColor="#87cb09" />
            <stop offset="100%" stopColor="#4e7f07" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Neck bolts */}
          <rect x="6.2" y="6.8" width="3.2" height="2" rx="0.4" transform="rotate(-45 7.8 7.8)" fill="#b5babe" strokeWidth="0.85" />
          <rect x="14.6" y="15.2" width="3.2" height="2" rx="0.4" transform="rotate(-45 16.2 16.2)" fill="#5b6772" strokeWidth="0.85" />
          {/* White tendon ends */}
          <path
            d="M3,21 C3.8,19.2 5,18 6.8,17.2 C6,19 4.8,20.2 3,21 Z"
            fill="#ffffff"
            strokeWidth="0.95"
          />
          <path
            d="M21,3 C20.2,4.8 19,6 17.2,6.8 C18,5 19.2,3.8 21,3 Z"
            fill="#ffffff"
            strokeWidth="0.95"
          />
          {/* Green muscle belly */}
          <path
            d="M5.2,18.8 C6.8,14.2 10.5,9.5 15.2,6.8 C17,5.8 18.2,5.2 19,5 C18.8,5.8 18.2,7 17.2,8.8 C14.5,13.5 9.8,17.2 5.2,18.8 Z"
            fill={`url(#${uid}-fm)`}
            strokeWidth="1.05"
          />
          {/* Striations and Franken-stitches */}
          <path d="M7.5,16.5 C10.2,13.2 13.2,10.2 16.5,7.5" fill="none" stroke="#4e7f07" strokeWidth="0.65" />
          <path d="M9.5,10.5 L13.5,14.5" fill="none" stroke="#262626" strokeWidth="0.85" />
          <path d="M9.2,12.2 L11.2,10.2 M10.8,13.8 L12.8,11.8 M12.2,14.8 L14.2,12.8" fill="none" stroke="#262626" strokeWidth="0.7" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.frankenmusclepaint',
    label: 'Franken Muscle Paint',
    family: 'sop',
    description:
      'Diagonal muscle spindle being painted green by a wooden paintbrush with green plus sparkles.',
    types: ['frankenmusclepaint'],
    icons: ['sop_frankenmusclepaint'],
    refKey: 'SOP_frankenmusclepaint',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-fmp`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#da3e62" />
            <stop offset="50%" stopColor="#f587a5" />
            <stop offset="55%" stopColor="#a6eb26" />
            <stop offset="100%" stopColor="#57a40a" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Muscle spindle */}
          <path
            d="M3.2,20.2 C5,15.5 8.5,11 13.5,7.5 L16.2,5.5 L14.5,8.5 C11,13.5 6.5,17 3.2,20.2 Z"
            fill={`url(#${uid}-fmp)`}
            strokeWidth="1.0"
          />
          {/* White tendon tips */}
          <circle cx="3.5" cy="19.8" r="1.2" fill="#ffffff" strokeWidth="0.8" />
          <circle cx="15.8" cy="5.8" r="1.2" fill="#ffffff" strokeWidth="0.8" />
          {/* Green sparkles */}
          <path d="M6.5,7.5 H9.5 M8,6 V9" stroke="#262626" strokeWidth="1.4" />
          <path d="M6.5,7.5 H9.5 M8,6 V9" stroke="#a6eb26" strokeWidth="0.8" />
          <path d="M4,11.5 H6.2 M5.1,10.4 V12.6" stroke="#262626" strokeWidth="1.3" />
          <path d="M4,11.5 H6.2 M5.1,10.4 V12.6" stroke="#87cb09" strokeWidth="0.7" />
          {/* Paintbrush */}
          <path
            d="M14.2,12.8 L20.5,16.2 C21.4,16.7 21.6,17.8 20.8,18.5 C20,19.2 18.9,19 18.2,18.2 L12.8,14.4 Z"
            fill="#c17d11"
            strokeWidth="0.95"
          />
          <polygon points="12.2,11.8 14.5,12.8 13,14.6 11,13.4" fill="#d1d1d1" strokeWidth="0.85" />
          <path
            d="M8.8,11.2 C10.2,10.8 11.5,11.2 12.4,12 L11.2,13.6 C10,13.2 9,12.2 8.8,11.2 Z"
            fill="#a6eb26"
            strokeWidth="0.9"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.muscleadjustvolume',
    label: 'Muscle Adjust Volume',
    family: 'sop',
    description:
      'Striated pink-and-crimson muscle spindle with white tendon tips and blue outward volume expansion curves.',
    types: ['muscleadjustvolume'],
    icons: ['sop_muscleadjustvolume'],
    refKey: 'SOP_muscleadjustvolume',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mav`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f79ab3" />
            <stop offset="50%" stopColor="#e85f82" />
            <stop offset="100%" stopColor="#900004" />
          </linearGradient>
        </defs>
        {/* Blue volume expansion outline arcs */}
        <path
          d="M5.2,13.5 C6.2,9.2 9.2,6.2 13.5,5.2 M18.8,10.5 C17.8,14.8 14.8,17.8 10.5,18.8"
          fill="none"
          stroke="#262626"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M5.2,13.5 C6.2,9.2 9.2,6.2 13.5,5.2 M18.8,10.5 C17.8,14.8 14.8,17.8 10.5,18.8"
          fill="none"
          stroke="#729fcf"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* White tendon ends */}
          <polygon points="3.2,19.2 5,20.8 7.5,18.5 5.5,16.5" fill="#e9e9e6" strokeWidth="0.9" />
          <polygon points="19.2,3.2 20.8,5 18.5,7.5 16.5,5.5" fill="#e9e9e6" strokeWidth="0.9" />
          {/* Plump muscle belly */}
          <path
            d="M5.5,16.8 C6.8,11.5 11.5,6.8 16.8,5.5 L18.5,7.2 C17.2,12.5 12.5,17.2 7.2,18.5 Z"
            fill={`url(#${uid}-mav)`}
            strokeWidth="1.05"
          />
          {/* Striation lines */}
          <path
            d="M6.8,17.2 C9.5,13 13,9.5 17.2,6.8 M8,17.8 C11.5,14.5 14.5,11.5 17.8,8"
            fill="none"
            stroke="#900004"
            strokeWidth="0.6"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.muscleautotensionlines',
    label: 'Muscle Auto Tension Lines',
    family: 'sop',
    description:
      'Dark blue flexed arm and muscle contour overlaid with glowing green auto-tension lines.',
    types: ['muscleautotensionlines'],
    icons: ['sop_muscleautotensionlines'],
    refKey: 'SOP_muscleautotensionlines',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-matl`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#608bc3" />
            <stop offset="55%" stopColor="#285092" />
            <stop offset="100%" stopColor="#031a41" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Blue muscle and arm silhouette */}
          <path
            d="M8.5,3.2 C6.8,4.5 6.5,7.2 9.2,10.5 L6.2,14.5 C4.8,16.5 5.5,19.2 8.2,20.5 C11.2,21.5 15.2,19.8 17.5,16.5 C19.5,13.5 19.2,10.2 16.8,7.2 L11.5,3.2 C10.5,2.6 9.3,2.7 8.5,3.2 Z"
            fill={`url(#${uid}-matl)`}
            strokeWidth="1.05"
          />
          {/* Green tension lines */}
          <path
            d="M9.5,4.5 C11.5,7.5 14.5,10 16.8,11.8 M8.2,6.8 C10.5,9.5 13.2,12 15.8,14.2 M8,16.2 C10.5,17.8 13.5,17.5 15.8,15.5"
            fill="none"
            stroke="#262626"
            strokeWidth="1.7"
          />
          <path
            d="M9.5,4.5 C11.5,7.5 14.5,10 16.8,11.8 M8.2,6.8 C10.5,9.5 13.2,12 15.8,14.2 M8,16.2 C10.5,17.8 13.5,17.5 15.8,15.5"
            fill="none"
            stroke="#7be028"
            strokeWidth="0.95"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.muscleconstraintpropertiesotis',
    label: 'Muscle Constraint Properties Otis',
    family: 'sop',
    description:
      'Diagonal white bone and red muscle joined by a green downward constraint arrow and Otis property bars.',
    types: ['muscleconstraintpropertiesotis'],
    icons: ['sop_muscleconstraintpropertiesotis'],
    refKey: 'SOP_muscleconstraintpropertiesotis',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Diagonal bone on left */}
          <path
            d="M3.2,6.8 C2.4,5.6 3,4.2 4.3,4.2 C5.2,4.2 5.6,4.7 6.2,4.3 C6.7,3.8 6.8,3 7.8,3 C9,3 9.6,4.4 8.8,5.6 L12.8,12.5 C14,12.5 14.8,13.5 14.2,14.8 C13.6,15.8 12.4,15.6 11.8,16.2 C11.2,16.8 11.4,17.8 10.2,18.2 C9,18.6 8,17.4 8.4,16.2 L4.5,9.2 C3.4,9 2.6,8 3.2,6.8 Z"
            fill="#e9e9e6"
            strokeWidth="0.95"
          />
          {/* Red muscle spindle on right */}
          <path
            d="M12.5,12.2 C14.5,9.5 17.8,7.8 20.8,7.5 C20.5,10.5 18.8,13.8 16,16.2 C13.8,18 11.2,19.2 9.2,19.8 C9.8,17.5 10.8,14.5 12.5,12.2 Z"
            fill="#cb1b41"
            strokeWidth="0.95"
          />
          <path d="M13.5,13.5 C15.5,11.5 17.5,10 19.5,9" fill="none" stroke="#f79ab3" strokeWidth="0.7" />
          {/* Green downward constraint arrow */}
          <polygon
            points="10.8,2.5 13.2,2.5 13.2,6.5 15,6.5 12,9.8 9,6.5 10.8,6.5"
            fill="#7be028"
            strokeWidth="0.9"
          />
          {/* Bottom property slider bars */}
          <rect x="13.5" y="17.5" width="7.5" height="2" rx="0.5" fill="#abafa6" strokeWidth="0.8" />
          <rect x="16" y="17" width="2" height="3" rx="0.4" fill="#7be028" strokeWidth="0.75" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.muscleconstraintpropertiesvellum',
    label: 'Muscle Constraint Properties Vellum',
    family: 'sop',
    description:
      'Diagonal white bone and red muscle with a green constraint arrow and Vellum spring links.',
    types: ['muscleconstraintpropertiesvellum'],
    icons: ['sop_muscleconstraintpropertiesvellum'],
    refKey: 'SOP_muscleconstraintpropertiesvellum',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Diagonal bone on left */}
          <path
            d="M3.2,6.8 C2.4,5.6 3,4.2 4.3,4.2 C5.2,4.2 5.6,4.7 6.2,4.3 C6.7,3.8 6.8,3 7.8,3 C9,3 9.6,4.4 8.8,5.6 L12.8,12.5 C14,12.5 14.8,13.5 14.2,14.8 C13.6,15.8 12.4,15.6 11.8,16.2 C11.2,16.8 11.4,17.8 10.2,18.2 C9,18.6 8,17.4 8.4,16.2 L4.5,9.2 C3.4,9 2.6,8 3.2,6.8 Z"
            fill="#d1d5db"
            strokeWidth="0.95"
          />
          {/* Red muscle spindle on right */}
          <path
            d="M12.5,12.2 C14.5,9.5 17.8,7.8 20.8,7.5 C20.5,10.5 18.8,13.8 16,16.2 C13.8,18 11.2,19.2 9.2,19.8 C9.8,17.5 10.8,14.5 12.5,12.2 Z"
            fill="#e03228"
            strokeWidth="0.95"
          />
          {/* Vellum constraint zig-zag links */}
          <polyline
            points="8.2,10.5 11.2,10.2 9.8,12.8 12.8,12.5"
            fill="none"
            stroke="#7be028"
            strokeWidth="0.9"
          />
          {/* Green downward constraint arrow */}
          <polygon
            points="10.8,2.5 13.2,2.5 13.2,6.5 15,6.5 12,9.8 9,6.5 10.8,6.5"
            fill="#64cc13"
            strokeWidth="0.9"
          />
          {/* Vellum constraint nodes */}
          <circle cx="15" cy="18.5" r="1.5" fill="#7be028" strokeWidth="0.8" />
          <circle cx="19.5" cy="18.5" r="1.5" fill="#e9e9e6" strokeWidth="0.8" />
          <line x1="16.5" y1="18.5" x2="18" y2="18.5" stroke="#262626" strokeWidth="1.1" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.muscledeform',
    label: 'Muscle Deform',
    family: 'sop',
    description:
      'Dark slate arm silhouette with a red-and-orange internal muscle spindle deforming a warm skin contour.',
    types: ['muscledeform'],
    icons: ['sop_muscledeform'],
    refKey: 'SOP_muscledeform',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-md`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ed2829" />
            <stop offset="60%" stopColor="#e86712" />
            <stop offset="100%" stopColor="#cb1009" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Dark slate arm hull */}
          <path
            d="M17.2,2.8 C13.5,2.5 7.5,7.2 2.8,15.5 L6.5,21.2 C9.5,19.5 14.5,19.2 17.5,16.5 C20,14.2 20.2,9.5 21.5,6.2 Z"
            fill="#29333f"
            strokeWidth="1.05"
          />
          {/* Warm skin bulge */}
          <path
            d="M4.5,13.2 C7.8,7.8 12.2,4.8 16.5,4.2"
            fill="none"
            stroke="#fad296"
            strokeWidth="1.2"
          />
          {/* Red-orange muscle spindle inside */}
          <path
            d="M5.5,17.8 C7.2,13.5 11.2,8.8 15.8,6.2 L18.5,5.2 L17.2,8 C14.8,12.5 10.2,16.5 5.5,17.8 Z"
            fill={`url(#${uid}-md)`}
            strokeWidth="0.95"
          />
          {/* White tendon tips */}
          <circle cx="5.5" cy="17.8" r="1" fill="#ffffff" strokeWidth="0.7" />
          <circle cx="18.2" cy="5.4" r="1" fill="#ffffff" strokeWidth="0.7" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.muscledeintersect',
    label: 'Muscle Deintersect',
    family: 'sop',
    description:
      'Two adjacent pink-red muscle spindles separated along a clean blue non-intersecting channel.',
    types: ['muscledeintersect'],
    icons: ['sop_muscledeintersect'],
    refKey: 'SOP_muscledeintersect',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mdi`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fa9db5" />
            <stop offset="55%" stopColor="#e45674" />
            <stop offset="100%" stopColor="#a40000" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Left muscle spindle */}
          <path
            d="M4.5,3 C3.2,7.8 2.8,13.5 5.2,18.2 L7.8,20.8 L8.5,18 C7.8,13.5 8.5,8.5 6.8,3.2 Z"
            fill={`url(#${uid}-mdi)`}
            strokeWidth="1.0"
          />
          {/* Right muscle spindle */}
          <path
            d="M15.2,3.2 C13.5,8.5 14.2,13.5 13.5,18 L14.2,20.8 L16.8,18.2 C19.2,13.5 18.8,7.8 17.5,3 Z"
            fill={`url(#${uid}-mdi)`}
            strokeWidth="1.0"
          />
          {/* White tendon caps */}
          <rect x="4.5" y="2.4" width="2.5" height="2" rx="0.5" fill="#eeeeec" strokeWidth="0.75" />
          <rect x="15" y="2.4" width="2.5" height="2" rx="0.5" fill="#eeeeec" strokeWidth="0.75" />
          <rect x="6.2" y="19" width="2.5" height="2" rx="0.5" fill="#eeeeec" strokeWidth="0.75" />
          <rect x="13.3" y="19" width="2.5" height="2" rx="0.5" fill="#eeeeec" strokeWidth="0.75" />
          {/* Blue deintersection separation line */}
          <path d="M11,2.5 C11.5,8.5 10.5,15.5 11,21.5" fill="none" stroke="#262626" strokeWidth="2.0" />
          <path d="M11,2.5 C11.5,8.5 10.5,15.5 11,21.5" fill="none" stroke="#729fcf" strokeWidth="1.1" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.muscleflex',
    label: 'Muscle Flex',
    family: 'sop',
    description:
      'Blue flexed arm silhouette with a bulging pink-and-crimson bicep muscle spindle.',
    types: ['muscleflex'],
    icons: ['sop_muscleflex'],
    refKey: 'SOP_muscleflex',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mf`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fa9db5" />
            <stop offset="50%" stopColor="#e45674" />
            <stop offset="100%" stopColor="#a40000" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Blue flexed arm silhouette */}
          <path
            d="M3,8.5 C2,10.5 2.5,13.5 4.8,15.5 C6.8,18.5 10.5,20.5 14.5,20.8 C17.8,20.5 19.8,17.5 21,13.5 C21.8,10.5 21.8,6.5 21.2,3.8 L18.5,3.5 L17.8,7.2 L19.2,9.5 C18.2,12.2 16.2,14.2 13.5,15.5 C12.5,12.2 9.8,10.5 6.8,9.8 C5.5,7.8 4,7.2 3,8.5 Z"
            fill="#00255d"
            strokeWidth="1.05"
          />
          <path
            d="M4.2,9.5 C6.5,10 10.5,11.5 12.2,15.5"
            fill="none"
            stroke="#729fcf"
            strokeWidth="0.8"
          />
          {/* Bulging pink/red bicep spindle */}
          <path
            d="M7.5,15.8 C8.5,12.2 11.8,9.8 15.8,9.5 C17.2,9.5 18.2,10 18.8,10.8 C17.8,14.5 14.8,17.2 10.8,17.5 C9.2,17.5 8,16.8 7.5,15.8 Z"
            fill={`url(#${uid}-mf)`}
            strokeWidth="1.0"
          />
          {/* White tendon ends */}
          <circle cx="7.6" cy="15.8" r="1.1" fill="#eeeeec" strokeWidth="0.75" />
          <circle cx="18.5" cy="10.6" r="1.1" fill="#eeeeec" strokeWidth="0.75" />
          {/* Striation curve */}
          <path d="M9.2,15.5 C11.5,13 14.5,11.5 17.2,11" fill="none" stroke="#a40000" strokeWidth="0.65" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.muscleid',
    label: 'Muscle ID',
    family: 'sop',
    description:
      'Diagonal red muscle spindle with white tendon tips and a light grey ID badge.',
    types: ['muscleid'],
    icons: ['sop_muscleid'],
    refKey: 'SOP_muscleid',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mid`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8170f" />
            <stop offset="55%" stopColor="#cb1009" />
            <stop offset="100%" stopColor="#7f0c07" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* White tendon ends */}
          <path d="M2.8,21.2 C3.8,19.2 5,18 6.8,17.2 C6,19 4.8,20.2 2.8,21.2 Z" fill="#ffffff" strokeWidth="0.95" />
          <path d="M21.2,2.8 C20.2,4.8 19,6 17.2,6.8 C18,5 19.2,3.8 21.2,2.8 Z" fill="#ffffff" strokeWidth="0.95" />
          {/* Red muscle belly */}
          <path
            d="M5,19 C6.8,14.2 10.5,9.5 15.2,6.8 C17,5.8 18.2,5.2 19,5 C18.8,5.8 18.2,7 17.2,8.8 C14.5,13.5 9.8,17.2 5,19 Z"
            fill={`url(#${uid}-mid)`}
            strokeWidth="1.05"
          />
          <path d="M7.5,16.5 C10.5,13.2 13.2,10.5 16.5,7.5" fill="none" stroke="#7f0c07" strokeWidth="0.65" />
          {/* ID tag badge */}
          <rect x="11.5" y="13" width="9.5" height="6.5" rx="1" fill="#eef2f7" strokeWidth="0.95" />
          <line x1="13.5" y1="15" x2="13.5" y2="17.5" stroke="#262626" strokeWidth="1.1" />
          <path d="M15.8,15 H17.5 C18.4,15 19,15.5 19,16.25 C19,17 18.4,17.5 17.5,17.5 H15.8 Z" fill="none" stroke="#262626" strokeWidth="0.95" />
        </g>
      </>
    ),
  },
];
