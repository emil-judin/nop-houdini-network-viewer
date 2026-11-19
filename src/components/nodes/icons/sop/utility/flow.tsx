import type { OperatorIconDef } from '../../iconTypes';

const OUTLINE = '#262626';

/**
 * Network flow operators: merge, null, output, switch, subnet and code.
 */
export const FLOW_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.merge',
    label: 'Merge',
    family: 'sop',
    description:
      'Large white teacup at the top-left and a big teacup on a saucer at the center-right, a lone saucer at the bottom-left, and two thick red arrows (dark red edges) curving from the top cup and the bottom saucer into the middle cup.',
    types: ['merge'],
    refKey: 'SOP_merge',
    sizePx: 22,
    render: (uid) => {
      const handle = (d: string) => (
        <>
          <path d={d} fill="none" stroke="#3a3a3a" strokeWidth="1.3" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#dfe4ea" strokeWidth="0.55" strokeLinecap="round" />
        </>
      );
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-china`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#d6dae0" />
              <stop offset="100%" stopColor="#8a9098" />
            </linearGradient>
            <linearGradient id={`${uid}-saucer`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#b4bac2" />
            </linearGradient>
          </defs>
          <g transform="translate(12 12) scale(0.92) translate(-12 -12)" strokeLinejoin="round">
            {/* Top-left cup (no saucer) */}
            {handle('M10.4 1.8C12.6 0.2 14 1.5 12.9 3.4C12.3 4.4 11.1 4.9 9.8 5.1')}
            <path d="M3.6 6.2L3.3 7.1H8L7.6 6.2Z" fill="#9aa0a8" stroke="#3a3a3a" strokeWidth="0.5" />
            <path
              d="M0.3 1.2C0.3 4.3 2.2 6.1 4.2 6.3H7C9 6.1 10.8 4.3 10.8 1.2Z"
              fill={`url(#${uid}-china)`}
              stroke="#3a3a3a"
              strokeWidth="0.6"
            />
            <ellipse cx="5.55" cy="1.2" rx="5.25" ry="0.75" fill="#f4f6f9" stroke="#3a3a3a" strokeWidth="0.5" />

            {/* Middle cup on its saucer */}
            <ellipse
              cx="14"
              cy="15.7"
              rx="8"
              ry="1.8"
              fill={`url(#${uid}-saucer)`}
              stroke="#3a3a3a"
              strokeWidth="0.6"
            />
            {handle('M19.9 9.9C22.5 8.6 24 10.1 23.1 12C22.5 13.2 21 13.8 19.3 13.8')}
            <path d="M12.2 16.2L11.8 17H16.2L15.8 16.2Z" fill="#9aa0a8" stroke="#3a3a3a" strokeWidth="0.5" />
            <path
              d="M7.6 9.3C7.6 13.1 10 16.1 12.6 16.3H15.4C18 16.1 20.4 13.1 20.4 9.3Z"
              fill={`url(#${uid}-china)`}
              stroke="#3a3a3a"
              strokeWidth="0.6"
            />
            <ellipse cx="14" cy="9.3" rx="6.4" ry="0.85" fill="#f4f6f9" stroke="#3a3a3a" strokeWidth="0.5" />

            {/* Lone saucer at the bottom-left */}
            <ellipse
              cx="6.6"
              cy="21.7"
              rx="6.3"
              ry="1.6"
              fill={`url(#${uid}-saucer)`}
              stroke="#3a3a3a"
              strokeWidth="0.6"
            />
            <ellipse cx="6.6" cy="21.8" rx="2.6" ry="0.5" fill="#e4e8ee" stroke="#9aa0a8" strokeWidth="0.3" />

            {/* Thick red merge arrows */}
            <path
              d="M7.2 2.7C9.6 2.5 11.4 3.4 12.4 5.6"
              fill="none"
              stroke="#5a0808"
              strokeWidth="3.1"
              strokeLinecap="round"
            />
            <path
              d="M7.2 2.7C9.6 2.5 11.4 3.4 12.4 5.6"
              fill="none"
              stroke="#d01818"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <polygon points="16.3,4.8 8.8,7.2 14.3,9.4" fill="#d01818" stroke="#5a0808" strokeWidth="0.6" />
            <path
              d="M7.2 21.8C9.4 21.6 11.6 20.8 13 19.6"
              fill="none"
              stroke="#5a0808"
              strokeWidth="3.1"
              strokeLinecap="round"
            />
            <path
              d="M7.2 21.8C9.4 21.6 11.6 20.8 13 19.6"
              fill="none"
              stroke="#d01818"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <polygon points="15.2,17.1 10.9,18.6 16,21.1" fill="#d01818" stroke="#5a0808" strokeWidth="0.6" />
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.null',
    label: 'Null',
    family: 'sop',
    description: 'Transparent-center disc with a soft light grey radial rim and a dark-and-light dashed ring.',
    types: ['null'],
    refKey: 'SOP_null',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-rim`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="48%" stopColor="#eef2f7" stopOpacity="0.35" />
            <stop offset="82%" stopColor="#d8dee6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b4bcc8" stopOpacity="0.95" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="8.0" fill={`url(#${uid}-rim)`} stroke="#e6ebf0" strokeWidth="2.0" />
        <circle cx="12" cy="12" r="8.0" fill="none" stroke="#262626" strokeWidth="2.0" strokeDasharray="1.4 1.75" />
      </>
    ),
  },
  {
    id: 'sop.output',
    label: 'Output',
    family: 'sop',
    description: 'Black-and-white checkered racing flag waving on a light metal pole.',
    types: ['output'],
    refKey: 'SOP_output',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-flag`}>
            <path d="M5.5 3.8C9 1.8 12 5 15 4C17.5 3.2 19.5 4 21 5L19.5 14C18 13 16 14.5 13 15C10 15.5 8.5 13.5 7.3 13.3Z" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-flag)`}>
          <rect x="4" y="0" width="19" height="17" fill="#ffffff" />
          <g transform="translate(5.5 2) skewY(6)" fill="#1e1e1e">
            <rect x="0" y="0" width="4" height="4" />
            <rect x="8" y="0" width="4" height="4" />
            <rect x="4" y="4" width="4" height="4" />
            <rect x="12" y="4" width="4" height="4" />
            <rect x="0" y="8" width="4" height="4" />
            <rect x="8" y="8" width="4" height="4" />
          </g>
        </g>
        <path
          d="M5.5 3.8C9 1.8 12 5 15 4C17.5 3.2 19.5 4 21 5L19.5 14C18 13 16 14.5 13 15C10 15.5 8.5 13.5 7.3 13.3Z"
          fill="none"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Flag pole */}
        <line x1="5.2" y1="3" x2="8.5" y2="21.5" stroke="#262626" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="5.2" y1="3" x2="8.5" y2="21.5" stroke="#c0c7d1" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.switch',
    label: 'Switch',
    family: 'sop',
    description:
      'Three indicator lights (two grey, one lit red) above a slider switch with a ribbed knob pushed to the right.',
    types: ['switch'],
    refKey: 'SOP_switch',
    render: () => (
      <>
        <circle cx="8" cy="5.5" r="1.7" fill="#6a717c" stroke="#262626" strokeWidth="1" />
        <circle cx="12" cy="5.5" r="1.7" fill="#6a717c" stroke="#262626" strokeWidth="1" />
        <circle cx="16" cy="5.5" r="2.6" fill="#ffb070" fillOpacity="0.55" />
        <circle cx="16" cy="5.5" r="1.7" fill="#ee5a24" stroke="#262626" strokeWidth="1" />
        <rect x="2.5" y="10.5" width="19" height="8" rx="2" fill="#c0c7d1" stroke="#262626" strokeWidth="1.3" />
        <rect x="4.5" y="13.4" width="6" height="2.2" fill="#3a3f47" />
        <rect x="11.5" y="10" width="10" height="9" rx="2" fill="#dfe4ea" stroke="#262626" strokeWidth="1.6" />
        <path d="M14.5 12V17M16.5 12V17M18.5 12V17" stroke="#89929e" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'sop.switchif',
    label: 'Switch-If',
    family: 'sop',
    description:
      'Grey signpost with an upper blue arrow sign pointing left and a lower green sign pointing right, each with a white question mark.',
    types: ['switchif'],
    icons: ['sop_switchif'],
    refKey: 'SOP_switchif',
    render: () => (
      <>
        <rect x="10.6" y="2.6" width="2.8" height="18.8" rx="0.8" fill="#c0c7d1" stroke={OUTLINE} strokeWidth="1.0" />
        <rect x="12.2" y="3.1" width="0.9" height="17.8" fill="#89929e" />
        <polygon
          points="6.8,11.8 17.4,11.8 21.2,14.8 17.4,17.8 6.8,17.8"
          fill="#58c848"
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        <text
          x="13.2"
          y="16.4"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="5.0"
          fontWeight="700"
          fontFamily="sans-serif"
        >
          ?
        </text>
        <polygon
          points="6.6,4.8 17.2,4.8 17.2,10.8 6.6,10.8 2.8,7.8"
          fill="#3672c4"
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        <text
          x="10.8"
          y="9.4"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="5.0"
          fontWeight="700"
          fontFamily="sans-serif"
        >
          ?
        </text>
      </>
    ),
  },
  {
    id: 'sop.split',
    label: 'Split',
    family: 'sop',
    description: 'Yellow diamond road sign with black arrows that fork.',
    types: ['split'],
    refKey: 'SOP_split',
    sizePx: 22,
    render: () => (
      <>
        <polygon points="12,1.8 22.2,12 12,22.2 1.8,12" fill="#e5c329" stroke="#232323" strokeWidth="1.3" />
        <path d="M10.5,5.5V16M10.5,10.5L16,13.5" fill="none" stroke="#141414" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="10.5,18.8 7.5,14.5 13.5,14.5" fill="#141414" />
        <polygon points="18.2,14.8 14,15.4 16,11.2" fill="#141414" />
      </>
    ),
  },
  {
    id: 'sop.subnet',
    label: 'Subnetwork / Custom HDA',
    family: 'sop',
    description:
      'Open cardboard box with flaps folded outward and a dark interior: the container for subnetworks and custom HDAs.',
    types: ['subnet'],
    refKey: 'SOP_subnet',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          {/* Back flap */}
          <polygon points="6.5,7 17.5,7 16.5,3 7.5,3" fill="#e8b55a" />
          {/* Dark interior */}
          <polygon points="6.5,7 17.5,7 19.5,10 4.5,10" fill="#7a4f16" />
          {/* Side flaps */}
          <polygon points="6.5,7 4.5,10 1,8.5 2.5,5.5" fill="#f0c574" />
          <polygon points="17.5,7 19.5,10 23,8.5 21.5,5.5" fill="#e2ac50" />
          {/* Box front */}
          <polygon points="4.5,10 19.5,10 19.5,20.5 4.5,20.5" fill="#d99b38" />
          {/* Front flap folded down */}
          <polygon points="4.5,10 19.5,10 18.5,13 5.5,13" fill="#f5d08a" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.cacheif',
    label: 'Cache-If',
    family: 'sop',
    description: 'Grey disk drive box with a large red question mark rising above it.',
    types: ['cacheif'],
    icons: ['sop_cacheif'],
    refKey: 'SOP_cacheif',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
          <polygon points="5.5,10.5 18.5,10.5 21,16 3,16" fill="#eef2f7" />
          <rect x="3" y="16" width="18" height="4.5" fill="#c0c7d1" />
          <rect x="5" y="17.3" width="10" height="2" fill="#3a3f47" strokeWidth="0.9" />
        </g>
        <path
          d="M9.2,6.2 C9.2,3.5 14.8,3.2 14.8,6.5 C14.8,8.5 12,8.8 12,11.2"
          fill="none"
          stroke="#262626"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        <path
          d="M9.2,6.2 C9.2,3.5 14.8,3.2 14.8,6.5 C14.8,8.5 12,8.8 12,11.2"
          fill="none"
          stroke="#e03228"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="12" cy="14.2" r="1.4" fill="#e03228" stroke="#262626" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.error',
    label: 'Error',
    family: 'sop',
    description: 'Round dark grey bomb with a tilted neck cap, short fuse and bright yellow spark.',
    types: ['error'],
    icons: ['sop_error'],
    refKey: 'SOP_error',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-bomb`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#89929e" />
            <stop offset="55%" stopColor="#3a3f47" />
            <stop offset="100%" stopColor="#262626" />
          </radialGradient>
        </defs>
        <circle cx="10.2" cy="14.5" r="5.8" fill={`url(#${uid}-bomb)`} stroke="#262626" strokeWidth="1.2" />
        <polygon
          points="12.2,8.5 15.2,10.5 13.8,12.2 10.8,10.2"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M14.2,9.2 L16.5,6.8" stroke="#262626" strokeWidth="1.4" strokeLinecap="round" />
        <polygon
          points="17.2,2.5 18,5.2 20.8,4.2 18.8,6.5 21,8.5 18,8 17.2,10.8 16.2,8 13.5,8.5 15.5,6.5 13.8,4.2 16.4,5.2"
          fill="#ffe47a"
          stroke="#ee8624"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.python',
    label: 'Python',
    family: 'sop',
    description:
      'Two interlocking rounded snake shapes turned 180 degrees to each other: blue at the top left, yellow at the bottom right, each with a small white eye in its head (vendor logo, redrawn).',
    // Houdini draws Python Snippet and Table Import with the same picture as Python.
    types: ['python', 'pythonsnippet', 'tableimport'],
    icons: ['misc_python'],
    refKey: 'SOP_python',
    render: () => (
      <>
        {/* Blue snake: head at the top, body across the middle, tail down the left */}
        <path
          d="M9 2H13.5Q15.5 2 15.5 4V9.5Q15.5 11.5 13.5 11.5H8.5Q6.5 11.5 6.5 13.5V15.5H4.5Q2.5 15.5 2.5 13.5V9.5Q2.5 7.5 4.5 7.5H11V6.5H7V4Q7 2 9 2Z"
          fill="#3672c4"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="4.2" r="0.95" fill="#ffffff" stroke="#262626" strokeWidth="0.6" />
        {/* Yellow snake: the blue one turned 180 degrees around the center */}
        <path
          d="M15 22H10.5Q8.5 22 8.5 20V14.5Q8.5 12.5 10.5 12.5H15.5Q17.5 12.5 17.5 10.5V8.5H19.5Q21.5 8.5 21.5 10.5V14.5Q21.5 16.5 19.5 16.5H13V17.5H17V20Q17 22 15 22Z"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <circle cx="15" cy="19.8" r="0.95" fill="#ffffff" stroke="#262626" strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'sop.opencl',
    label: 'OpenCL',
    family: 'sop',
    description: 'High-speed gauge arc segmented from green through yellow to red with a silver indicator needle.',
    types: ['opencl'],
    icons: ['sop_opencl'],
    refKey: 'SOP_opencl',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.35" strokeLinejoin="round">
          <path d="M2.2,16.2 A10,10 0 0,1 3.6,11.2 L6.8,12.8 A6.4,6.4 0 0,0 5.8,16.2 Z" fill="#018148" />
          <path d="M3.9,10.6 A10,10 0 0,1 7.2,6.8 L9.4,9.6 A6.4,6.4 0 0,0 7.2,12.2 Z" fill="#80c244" />
          <path d="M7.8,6.4 A10,10 0 0,1 12.4,5 L12.4,8.6 A6.4,6.4 0 0,0 9.8,9.4 Z" fill="#c1d62f" />
          <path d="M13,5 A10,10 0 0,1 17.5,6.6 L15.4,9.5 A6.4,6.4 0 0,0 13,8.6 Z" fill="#f0c61d" />
          <path d="M18,7 A10,10 0 0,1 20.8,10.8 L17.6,12.4 A6.4,6.4 0 0,0 15.8,9.8 Z" fill="#f96920" />
          <path d="M21,11.4 A10,10 0 0,1 21.8,16.2 L18.2,16.2 A6.4,6.4 0 0,0 17.8,13 Z" fill="#ed2c2f" />
        </g>
        <polygon
          points="11.2,16.4 19.6,10.4 12.6,17.8"
          fill="#cbcac8"
          stroke="#2e3436"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="16.8" r="1.6" fill="#939297" stroke="#2e3436" strokeWidth="0.65" />
      </>
    ),
  },
];
