import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_03_PART_9: OperatorIconDef[] = [
  {
    id: 'sop.attribfade',

    label: 'Attribute Fade',

    family: 'sop',

    description: 'Lower grey cylinder base.',
    refKey: 'SOP_attribfade',
    types: ['attribfade'],
    icons: ['sop_attribfade'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-af-base`} x1="3" y1="15" x2="21" y2="15" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#eeeeec" />
            <stop offset="0.6" stopColor="#d4d4cf" />
            <stop offset="1" stopColor="#858577" />
          </linearGradient>
          <linearGradient id={`${uid}-af-top`} x1="12" y1="2" x2="12" y2="16" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffd1b5" stopOpacity="0.35" />
            <stop offset="0.5" stopColor="#f64200" stopOpacity="0.85" />
            <stop offset="1" stopColor="#c50f0f" />
          </linearGradient>
        </defs>
        {/* Lower grey cylinder base */}
        <path
          d="M4.2 13.2C4.2 11.2 7.7 9.5 12 9.5C16.3 9.5 19.8 11.2 19.8 13.2L20.4 17.5C20.4 19.8 16.6 21.5 12 21.5C7.4 21.5 3.6 19.8 3.6 17.5L4.2 13.2Z"
          fill={`url(#${uid}-af-base)`}
          stroke="#2e3436"
          strokeWidth="0.85"
        />
        <ellipse cx="12" cy="13.2" rx="7.5" ry="3.2" fill="#eeeeec" opacity="0.6" />
        {/* Upper fading red-orange attribute column */}
        <path
          d="M6.4 5.2C6.4 3.4 8.9 2.2 12 2.2C15.1 2.2 17.6 3.4 17.6 5.2L18.2 12.2C18.2 14.2 15.4 15.8 12 15.8C8.6 15.8 5.8 14.2 5.8 12.2L6.4 5.2Z"
          fill={`url(#${uid}-af-top)`}
          stroke="#a40000"
          strokeWidth="0.8"
        />
        <ellipse cx="12" cy="5.2" rx="5.5" ry="2.2" fill="#ffd1b5" stroke="#ffa6a6" strokeWidth="0.55" />
      </g>
    ),
  },
  {
    id: 'sop.attribfill',

    label: 'Attribute Fill',

    family: 'sop',

    description: '3D stepped slab mesh.',
    refKey: 'SOP_attribfill',
    types: ['attribfill'],
    icons: ['sop_attribfill'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-afil-r`} x1="6" y1="8" x2="18" y2="17" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ef2929" />
            <stop offset="1" stopColor="#a40000" />
          </linearGradient>
        </defs>
        {/* 3D stepped slab mesh */}
        <path
          d="M1.8 11.2L10.8 6.2L22.2 11.2V14.2L11.5 19.8L1.8 14.5V11.2Z"
          fill="#dbdfd9"
          stroke="#4a4f4f"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Filled red attribute region in center of slab */}
        <path
          d="M6.2 11.2L11.2 8.5L17.2 11.2L11.5 14.2L6.2 11.2Z"
          fill={`url(#${uid}-afil-r)`}
          stroke="#a40000"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        {/* Side thickness highlight */}
        <path d="M1.8 11.2L11.5 16.5L22.2 11.2M11.5 16.5V19.8" fill="none" stroke="#555753" strokeWidth="0.65" />
        {/* Warm gold-brown fill droplet / applicator above */}
        <path
          d="M12 2.5C12 2.5 15.2 6.2 15.2 8.2C15.2 9.9 13.8 11.2 12 11.2C10.2 11.2 8.8 9.9 8.8 8.2C8.8 6.2 12 2.5 12 2.5Z"
          fill="#e9b96e"
          stroke="#8f5902"
          strokeWidth="0.8"
        />
      </g>
    ),
  },
  {
    id: 'sop.attribfrommap',

    label: 'Attribute from Map',

    family: 'sop',

    description: 'Curved 3D diamond surface patch.',
    refKey: 'SOP_attribfrommap',
    types: ['attribfrommap'],
    icons: ['sop_attribfrommap'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-afm-bg`} x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#e6e5a9" />
            <stop offset="0.35" stopColor="#8ed0ca" />
            <stop offset="0.7" stopColor="#be9ed0" />
            <stop offset="1" stopColor="#ccabab" />
          </linearGradient>
        </defs>
        {/* Curved 3D diamond surface patch */}
        <path
          d="M1.8 8.5C6.2 5.6 10.2 3.5 13.6 2.2C17.2 5.1 20.1 7.8 22.4 11.6C17.6 14.3 13.2 18.2 9.2 21.8C6.6 16.8 4.2 12.2 1.8 8.5Z"
          fill={`url(#${uid}-afm-bg)`}
          stroke="#2e3436"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Subtle internal grid lines */}
        <path
          d="M5.5 6.4L13.5 18.2M9.5 4.2L17.8 15.2M4.2 12.2L16.8 5.2M6.8 16.8L19.5 8.5"
          fill="none"
          stroke="#2e3436"
          strokeWidth="0.5"
          opacity="0.35"
        />
        {/* Sampled vertex attribute dots */}
        <circle cx="8.2" cy="9.8" r="1.3" fill="#e7f990" stroke="#a07100" strokeWidth="0.6" />
        <circle cx="13.8" cy="7.2" r="1.3" fill="#5efff2" stroke="#005441" strokeWidth="0.6" />
        <circle cx="11.2" cy="14.2" r="1.3" fill="#63cfff" stroke="#204a87" strokeWidth="0.6" />
        <circle cx="16.2" cy="11.8" r="1.3" fill="#e7f990" stroke="#a07100" strokeWidth="0.6" />
      </g>
    ),
  },
  {
    id: 'sop.attribfromparm',

    label: 'Attribute from Parameters',

    family: 'sop',

    description: 'Callout speech bubble.',
    refKey: 'SOP_attribfromparm',
    types: ['attribfromparm'],
    icons: ['sop_attribfromparm'],
    render: () => (
      <g>
        {/* Callout speech bubble */}
        <path
          d="M6.8 2.2H21.5V12.8H17.5L5.2 18.2L10.5 12.8H6.8V2.2Z"
          fill="#eeeeec"
          stroke="#2e3436"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Parameter UI rows & sliders inside bubble */}
        <rect x="8.8" y="4.5" width="10.5" height="2.2" rx="0.5" fill="#999e93" stroke="#5c5c5c" strokeWidth="0.55" />
        <rect x="13.2" y="4.2" width="2.2" height="2.8" rx="0.4" fill="#3f3fff" />
        <rect x="8.8" y="8.2" width="10.5" height="2.2" rx="0.5" fill="#999e93" stroke="#5c5c5c" strokeWidth="0.55" />
        <rect x="10.8" y="7.9" width="2.2" height="2.8" rx="0.4" fill="#3f3fff" />
        {/* Green point sphere at bottom-left */}
        <circle cx="4.8" cy="18.8" r="2.6" fill="#9db029" stroke="#2e3436" strokeWidth="0.85" />
        <circle cx="4.1" cy="18.1" r="0.85" fill="#dfeaa1" />
      </g>
    ),
  },
  {
    id: 'sop.attribfrompieces',

    label: 'Attribute from Pieces',

    family: 'sop',

    description: 'Top attribute callout box pointing down.',
    refKey: 'SOP_attribfrompieces',
    types: ['attribfrompieces'],
    icons: ['sop_attribfrompieces'],
    render: () => (
      <g>
        {/* Top attribute callout box pointing down */}
        <path
          d="M7.5 2.2H16.5V9.2H13.4L12 12.2L10.6 9.2H7.5V2.2Z"
          fill="#eeeeec"
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path d="M9.5 4.8H14.5M9.5 6.8H13.2" fill="none" stroke="#555753" strokeWidth="0.8" strokeLinecap="round" />
        {/* Piece spheres below (blue, red, yellow) */}
        <circle cx="6.2" cy="16.8" r="2.8" fill="#edd400" stroke="#c4a000" strokeWidth="0.8" />
        <circle cx="5.4" cy="16" r="0.85" fill="#ffffff" />

        <circle cx="17.8" cy="16.8" r="2.8" fill="#ED2728" stroke="#CB1009" strokeWidth="0.8" />
        <circle cx="17" cy="16" r="0.85" fill="#F8C9CA" />

        <circle cx="12" cy="18.5" r="3" fill="#3A80B8" stroke="#1D3E63" strokeWidth="0.85" />
        <circle cx="11.1" cy="17.6" r="0.95" fill="#ffffff" />
      </g>
    ),
  },
  {
    id: 'sop.attribfromvolume',

    label: 'Attribute from Volume',

    family: 'sop',

    description: 'Fluffy grey volume cloud.',
    refKey: 'SOP_attribfromvolume',
    types: ['attribfromvolume'],
    icons: ['sop_attribfromvolume'],
    render: () => (
      <g>
        {/* Fluffy grey volume cloud */}
        <path
          d="M6.2 16.5C3.8 16.5 2.2 14.8 2.2 12.6C2.2 10.8 3.4 9.3 5.1 8.8C5.4 6.2 7.6 4.2 10.4 4.2C12.5 4.2 14.3 5.3 15.2 7C15.8 6.8 16.5 6.6 17.2 6.6C19.8 6.6 21.8 8.6 21.8 11.2C21.8 13.6 20.1 15.6 17.8 15.8"
          fill="#c4c5c2"
          stroke="#51534f"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <circle cx="8.5" cy="9.5" r="2.4" fill="#eeeeec" opacity="0.65" />
        <circle cx="14.2" cy="10.2" r="2.8" fill="#888a85" opacity="0.45" />
        {/* Extracted attribute callout & orange-red arrow at bottom */}
        <path
          d="M11.5 11.2L15.8 16.5H13.2V21.2H9.8V16.5H7.2L11.5 11.2Z"
          fill="#e96712"
          stroke="#590b08"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.attribinterpolate',

    label: 'Attribute Interpolate',

    family: 'sop',

    description: 'Interpolated quad polygon.',
    refKey: 'SOP_attribinterpolate',
    types: ['attribinterpolate'],
    icons: ['sop_attribinterpolate'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-ai-quad`} x1="3" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ef2929" />
            <stop offset="0.55" stopColor="#e88c03" />
            <stop offset="1" stopColor="#eeeeec" />
          </linearGradient>
        </defs>
        {/* Interpolated quad polygon */}
        <path
          d="M3.2 4.5L20.8 2.8L19.8 20.5L5.2 20.2L3.2 4.5Z"
          fill={`url(#${uid}-ai-quad)`}
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* 4 corner vertex circles */}
        <circle cx="3.2" cy="4.5" r="1.5" fill="#eeeeec" stroke="#2e3436" strokeWidth="0.65" />
        <circle cx="20.8" cy="2.8" r="1.5" fill="#eeeeec" stroke="#2e3436" strokeWidth="0.65" />
        <circle cx="5.2" cy="20.2" r="1.5" fill="#eeeeec" stroke="#2e3436" strokeWidth="0.65" />
        <circle cx="19.8" cy="20.5" r="1.5" fill="#eeeeec" stroke="#2e3436" strokeWidth="0.65" />
        {/* Interior interpolation arrow */}
        <path
          d="M5.5 14.8L11.5 9.8L10.2 7.8L15.8 8.2L13.8 13.5L12.5 11.5L6.5 16.5Z"
          fill="#fdcd87"
          stroke="#760000"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.attribmirror',

    label: 'Attribute Mirror',

    family: 'sop',

    description: 'Shaded right mirror half.',
    refKey: 'SOP_attribmirror',
    types: ['attribmirror'],
    icons: ['sop_attribmirror'],
    render: () => (
      <g>
        {/* Shaded right mirror half */}
        <rect x="12" y="2" width="10" height="20" rx="1" fill="#A1ACB3" opacity="0.45" />
        {/* Center mirror plane axis */}
        <line x1="12" y1="1.8" x2="12" y2="22.2" stroke="#eeeeec" strokeWidth="1.6" />
        <line x1="12" y1="1.8" x2="12" y2="22.2" stroke="#2e3436" strokeWidth="0.75" strokeDasharray="1.8 1.2" />
        {/* Left callout bubble & green point */}
        <path
          d="M2.2 3.2L10.2 7.2V12.2L7.5 13.5L8.2 18.2L4.5 13.8L2.2 15V3.2Z"
          fill="#d3d7cf"
          stroke="#2e3436"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <circle cx="8.2" cy="19.2" r="1.8" fill="#9db029" stroke="#2e3436" strokeWidth="0.7" />
        {/* Mirrored right callout bubble & green point */}
        <path
          d="M21.8 3.2L13.8 7.2V12.2L16.5 13.5L15.8 18.2L19.5 13.8L21.8 15V3.2Z"
          fill="#eeeeec"
          stroke="#555753"
          strokeWidth="0.75"
          strokeLinejoin="round"
          opacity="0.85"
        />
        <circle cx="15.8" cy="19.2" r="1.8" fill="#9db029" stroke="#2e3436" strokeWidth="0.7" opacity="0.85" />
      </g>
    ),
  },
  {
    id: 'sop.attribnoise',

    label: 'Attribute Noise',

    family: 'sop',

    description: 'Callout speech bubble.',
    refKey: 'SOP_attribnoise',
    types: ['attribnoise'],
    icons: ['sop_attribnoise'],
    render: () => (
      <g>
        {/* Callout speech bubble */}
        <path
          d="M6.2 2.2H21.5V13.2H16.8L4.8 18.2L10.2 13.2H6.2V2.2Z"
          fill="#d3d7cf"
          stroke="#2e3436"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Multi-directional red & blue noise arrows inside callout */}
        <path
          d="M8.5 7.5L11.5 4.5M11.5 4.5H9.2M11.5 4.5V6.8"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.2 5.2L18.5 8.5M18.5 8.5H16.2M18.5 8.5V6.2"
          fill="none"
          stroke="#115971"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.8 11.2L11.2 9.5M11.2 9.5L13.2 8.2M11.2 9.5L12.5 11.4"
          fill="none"
          stroke="#cc0000"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Green point sphere at bottom-left */}
        <circle cx="4.8" cy="18.8" r="2.6" fill="#9db029" stroke="#2e3436" strokeWidth="0.85" />
        <circle cx="4.1" cy="18.1" r="0.85" fill="#dfeaa1" />
      </g>
    ),
  },
  {
    id: 'sop.attribpaint',

    label: 'Attribute Paint',

    family: 'sop',

    description: 'Curved 3D diamond mesh patch.',
    refKey: 'SOP_attribpaint',
    types: ['attribpaint'],
    icons: ['sop_attribpaint'],
    render: () => (
      <g>
        {/* Curved 3D diamond mesh patch */}
        <path
          d="M1.8 10.2C6.2 7.2 10.2 5.2 13.6 3.8C17.2 6.6 20.1 9.4 22.2 13.2C17.5 15.8 13.2 19.2 9.2 22C6.6 17.5 4.2 13.5 1.8 10.2Z"
          fill="#e9dfd1"
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Painted blue attribute stroke across mesh */}
        <path
          d="M5.8 13.5C8.5 10.8 12.2 9.8 15.8 11.5"
          fill="none"
          stroke="#5682c3"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M5.8 13.5C8.5 10.8 12.2 9.8 15.8 11.5"
          fill="none"
          stroke="#8bb0d8"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Paintbrush handle, ferrule, and bristles */}
        <path
          d="M13.5 8.5L20.2 2.2L21.8 3.8L15.2 10.2Z"
          fill="#ea8113"
          stroke="#5c3307"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <path
          d="M12.2 9.8L13.5 8.5L15.2 10.2L13.8 11.5Z"
          fill="#dddddd"
          stroke="#555753"
          strokeWidth="0.6"
        />
        <path
          d="M9.8 11.8C10.8 10.2 11.5 9.8 12.2 9.8L13.8 11.5C12.8 12.2 11.2 12.4 9.8 11.8Z"
          fill="#2e3436"
        />
      </g>
    ),
  },
];
