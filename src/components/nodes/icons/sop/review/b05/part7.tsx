import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_05_PART_7: OperatorIconDef[] = [
  {
    id: 'sop.heightfield_visualize',

    label: 'HeightField Visualize',

    family: 'sop',

    description: 'Isometric terrain base with elevation ramp.',
    refKey: 'SOP_heightfield_visualize',
    types: ['heightfield_visualize'],
    icons: ['sop_heightfield_visualize'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-vis`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#729fcf" />
            <stop offset="48%" stopColor="#e9b96e" />
            <stop offset="85%" stopColor="#c17d11" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        {/* Isometric terrain base with elevation ramp */}
        <path
          d="M2,15 L8,11.5 L12,6.2 L16,11.5 L22,15 L12,20.5 Z"
          fill={`url(#${uid}-vis)`}
          stroke="#204a87"
          strokeWidth={0.95}
          strokeLinejoin="round"
        />
        {/* Mid elevation contour */}
        <polygon
          points="5.5,14.2 9,10.8 12,6.2 15,10.8 18.5,14.2 12,17.5"
          fill="#e9b96e"
          fillOpacity={0.65}
          stroke="#8f5902"
          strokeWidth={0.65}
          strokeLinejoin="round"
        />
        {/* Peak elevation contour */}
        <polygon
          points="8.8,11 12,6.2 15.2,11 12,12.8"
          fill="#c17d11"
          stroke="#8f5902"
          strokeWidth={0.65}
          strokeLinejoin="round"
        />
        <polygon
          points="10.4,8.6 12,6.2 13.6,8.6 12,9.5"
          fill="#ffffff"
          stroke="#8f5902"
          strokeWidth={0.5}
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.flipboundary',

    label: 'FLIP Boundary',

    family: 'sop',

    description: 'Left spout pouring blue water.',
    refKey: 'SOP_flipboundary',
    types: ['flipboundary'],
    icons: ['sop_flipboundary'],
    render: () => (
      <g>
        {/* Left spout pouring blue water */}
        <polygon
          points="2,4.5 7,2.5 9.2,5.2 4.2,7.2"
          fill="#babdb6"
          stroke="#555753"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <path
          d="M6.8,5.8 C8.5,8.5 9.2,12 9.5,15.5 L6.2,15.5 C6,12 5.2,9 4.5,6.8 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth={0.75}
        />
        {/* Right spout pouring amber liquid */}
        <polygon
          points="22,4.5 17,2.5 14.8,5.2 19.8,7.2"
          fill="#babdb6"
          stroke="#555753"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <path
          d="M17.2,5.8 C15.5,8.5 14.8,12 14.5,15.5 L17.8,15.5 C18,12 18.8,9 19.5,6.8 Z"
          fill="#e1ab5b"
          stroke="#8f5902"
          strokeWidth={0.75}
        />
        {/* Swirling combined pool at bottom */}
        <path
          d="M2.5,16.5 C5.5,14.5 9,15 12,16 C15,17 18.5,14.5 21.5,16.5 C20.5,19.8 16.5,21.5 12,21.5 C7.5,21.5 3.5,19.8 2.5,16.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        <path
          d="M12,16 C15,17 18.5,14.5 21.5,16.5 C20.5,19.5 17,21.2 13,21.4 C13.8,19.5 13.2,17.5 12,16 Z"
          fill="#e1ab5b"
          stroke="#8f5902"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.flipcollide',

    label: 'FLIP Collide',

    family: 'sop',

    description: 'Rushing blue fluid wave from upper-right.',
    refKey: 'SOP_flipcollide',
    types: ['flipcollide'],
    icons: ['sop_flipcollide'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-wave`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9edbe8" />
            <stop offset="55%" stopColor="#729fcf" />
            <stop offset="100%" stopColor="#204a87" />
          </linearGradient>
        </defs>
        {/* Rushing blue fluid wave from upper-right */}
        <path
          d="M13,3.5 L21.5,8 L15,18.5 L5.5,13.5 C8.5,11 11,7.5 13,3.5 Z"
          fill={`url(#${uid}-wave)`}
          stroke="#204a87"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* White/cyan splash crest */}
        <path
          d="M5.5,11.5 C7.5,9.5 10.5,10 12.5,12 C14.5,14 14.5,17 12.5,19"
          fill="none"
          stroke="#eef8fc"
          strokeWidth={1.1}
          strokeLinecap="round"
        />
        {/* Brown rocks at lower-left colliding with wave */}
        <polygon
          points="2.5,16.5 5.2,12.5 9.2,14.2 8.5,19.2 3.5,20"
          fill="#e9b96e"
          stroke="#8f5902"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        <polygon
          points="7.5,18 10.5,15.5 13.8,17.2 12.8,21 8.2,21.2"
          fill="#c17d11"
          stroke="#694201"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.flipcontainer',

    label: 'FLIP Container',

    family: 'sop',

    description: 'Tilted cylindrical glass container body.',
    refKey: 'SOP_flipcontainer',
    types: ['flipcontainer'],
    icons: ['sop_flipcontainer'],
    render: () => (
      <g>
        {/* Tilted cylindrical glass container body */}
        <path
          d="M6.5,5.5 L16.5,8.2 L13.8,19.5 C13.2,21 7.2,19.5 4.2,17 L6.5,5.5 Z"
          fill="#eeeeec"
          fillOpacity={0.55}
          stroke="#555753"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Blue water inside tilted container */}
        <path
          d="M5.4,11.2 C8.5,10.5 11.8,12.8 15.2,12.2 L13.8,19.5 C12.5,20.8 6.8,19.5 4.2,17 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        <ellipse
          cx="10.3"
          cy="11.7"
          rx="4.9"
          ry="1.5"
          transform="rotate(10 10.3 11.7)"
          fill="#9edbe8"
          stroke="#204a87"
          strokeWidth={0.65}
        />
        {/* Top rim ellipse of pitcher */}
        <ellipse
          cx="11.5"
          cy="6.8"
          rx="5.2"
          ry="1.6"
          transform="rotate(15 11.5 6.8)"
          fill="none"
          stroke="#555753"
          strokeWidth={0.9}
        />
        {/* Splash droplets near spout */}
        <circle cx="18.8" cy="6.2" r="1.1" fill="#729fcf" stroke="#204a87" strokeWidth={0.6} />
        <circle cx="20.5" cy="8.5" r="0.85" fill="#9edbe8" stroke="#204a87" strokeWidth={0.55} />
      </g>
    ),
  },
  {
    id: 'sop.flipsource',

    label: 'FLIP DOP Source',

    family: 'sop',

    description: 'Curved metallic faucet pipe at top-left.',
    refKey: 'SOP_flipsource',
    types: ['flipsource'],
    icons: ['sop_flipsource'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-pipe`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eef2f6" />
            <stop offset="55%" stopColor="#9aa6b2" />
            <stop offset="100%" stopColor="#525b66" />
          </linearGradient>
        </defs>
        {/* Curved metallic faucet pipe at top-left */}
        <path
          d="M2.5,5.5 L9.5,5.5 C13.2,5.5 15.5,7.8 15.5,11.2 L10.8,11.2 C10.8,9.8 10,9.2 8.8,9.2 L2.5,9.2 Z"
          fill={`url(#${uid}-pipe)`}
          stroke="#2e3436"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Pipe nozzle collar */}
        <rect
          x="9.8"
          y="10.5"
          width="6.6"
          height="2.1"
          rx="0.6"
          fill="#ccd5dd"
          stroke="#2e3436"
          strokeWidth={0.8}
        />
        {/* Downward blue fluid arrow from nozzle */}
        <polygon
          points="11.2,12.6 15,12.6 15,17.2 17.8,17.2 13.1,21.5 8.4,17.2 11.2,17.2"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.flipsolver',

    label: 'FLIP Solver',

    family: 'sop',

    description: 'Tan canyon banks flanking waterfall.',
    refKey: 'SOP_flipsolver',
    types: ['flipsolver'],
    icons: ['sop_flipsolver'],
    render: () => (
      <g>
        {/* Tan canyon banks flanking waterfall */}
        <polygon
          points="2,6.5 9,3.5 18.5,7.5 11.5,11.5"
          fill="#f0d09e"
          stroke="#8f5902"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <polygon
          points="2,6.5 6.5,9 6.5,16.5 2,14"
          fill="#c17d11"
          stroke="#8f5902"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
        {/* Blue waterfall stream */}
        <path
          d="M6.2,5.2 L12.5,3.2 L15.5,6.8 L11.5,9.5 L11.5,18.5 L6.2,16.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        <path
          d="M8.5,6.5 L8.5,15.5 M10.2,7.8 L10.2,16.5"
          stroke="#eef8fc"
          strokeWidth={0.65}
          strokeLinecap="round"
        />
        {/* Pink solver brain at lower-right */}
        <path
          d="M11.5,15.5 C11.5,13.2 13.2,11.8 15.5,11.8 C16.2,11 17.8,11 18.8,11.8 C20.5,12.2 21.5,13.8 21.2,15.6 C21.8,17.2 20.8,19 19,19.4 C18,20.2 16,20.2 14.8,19.5 C12.8,19.5 11.2,17.8 11.5,15.5 Z"
          fill="#f4b1b3"
          stroke="#8c3b3b"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        <path
          d="M14,14.2 C15.2,13.5 16.8,13.8 17.5,15 M13.5,16.8 C15,16.2 17,16.5 18.5,17.5 M16.2,12.2 C16.2,14.2 15.8,16.2 15.8,18.8"
          fill="none"
          stroke="#a64b4b"
          strokeWidth={0.6}
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.flipvolumecombine',

    label: 'FLIP Volume Combine',

    family: 'sop',

    description: 'Back volume cloud lobe.',
    refKey: 'SOP_flipvolumecombine',
    types: ['flipvolumecombine', 'volumemerge'],
    icons: ['sop_flipvolumecombine', 'sop_volumemerge'],
    render: (uid) => (
      <g>
        <defs>
          <radialGradient id={`${uid}-cloud`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#d3d7cf" />
            <stop offset="100%" stopColor="#888a85" />
          </radialGradient>
        </defs>
        {/* Back volume cloud lobe */}
        <path
          d="M5.5,12.5 C4,10.2 5.2,7 7.8,6.5 C8.8,4.2 12,3.8 13.8,5.5 C16.2,4.8 18.8,6.5 18.8,9.2 C20.8,10.2 21.2,13 19.5,14.8 Z"
          fill={`url(#${uid}-cloud)`}
          stroke="#555753"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        {/* Front combined volume cloud puff */}
        <path
          d="M3.5,16.2 C2.2,14.2 3.2,11.5 5.8,11 C7,8.8 10.2,8.5 12,10.2 C14.2,9 17.2,10.2 17.8,12.6 C20.2,13.2 21.2,15.8 19.8,17.8 C18.8,19.5 16.2,20 14.2,19.2 C12.5,20.5 9.5,20.5 7.8,19 C5.5,19.5 3.8,18.2 3.5,16.2 Z"
          fill={`url(#${uid}-cloud)`}
          stroke="#555753"
          strokeWidth={0.95}
          strokeLinejoin="round"
        />
        {/* Internal puff contour highlights */}
        <path
          d="M7.5,13.5 C8.8,12.2 11,12.2 12.2,13.5 M12.8,14.5 C14.2,13.5 16,14 16.8,15.5"
          fill="none"
          stroke="#888a85"
          strokeWidth={0.65}
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.fluidcompress',

    label: 'Fluid Compress',

    family: 'sop',

    description: 'Top vise jaw & screw.',
    refKey: 'SOP_fluidcompress',
    types: ['fluidcompress'],
    icons: ['sop_fluidcompress'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-fluid`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a3d0ff" />
            <stop offset="55%" stopColor="#5092ff" />
            <stop offset="100%" stopColor="#204a87" />
          </linearGradient>
        </defs>
        {/* Top vise jaw & screw */}
        <rect x="10.2" y="2" width="3.6" height="3.2" fill="#888a85" stroke="#2e3436" strokeWidth={0.75} />
        <polygon
          points="5,5.2 19,5.2 17.2,8.2 6.8,8.2"
          fill="#babdb6"
          stroke="#2e3436"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        {/* Compressed blue fluid block in middle */}
        <path
          d="M6.8,8.2 C5.2,10.2 5.2,13.8 6.8,15.8 L17.2,15.8 C18.8,13.8 18.8,10.2 17.2,8.2 Z"
          fill={`url(#${uid}-fluid)`}
          stroke="#204a87"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        <path
          d="M8.5,10.2 C10.5,11.2 13.5,11.2 15.5,10.2 M8.5,13.8 C10.5,12.8 13.5,12.8 15.5,13.8"
          fill="none"
          stroke="#eef8fc"
          strokeWidth={0.7}
          strokeLinecap="round"
        />
        {/* Bottom vise jaw & base */}
        <polygon
          points="6.8,15.8 17.2,15.8 19,18.8 5,18.8"
          fill="#babdb6"
          stroke="#2e3436"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        <rect x="10.2" y="18.8" width="3.6" height="3.2" fill="#888a85" stroke="#2e3436" strokeWidth={0.75} />
      </g>
    ),
  },
  {
    id: 'sop.mpmcollider',

    label: 'MPM Collider',

    family: 'sop',

    description: 'Isometric grey collider slab at bottom.',
    refKey: 'SOP_mpmcollider',
    types: ['mpmcollider'],
    icons: ['sop_mpmcollider'],
    render: () => (
      <g>
        {/* Isometric grey collider slab at bottom */}
        <polygon
          points="2.5,16.5 12,12.5 21.5,16.5 12,21"
          fill="#babdb6"
          stroke="#555753"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Splattered purple ice-cream scoop on slab */}
        <path
          d="M6.8,15.2 C6.2,13.2 8,11.5 10.2,11.8 C11.5,10.5 14,10.8 15,12.5 C16.8,13 17.5,14.8 16.2,16.2 C14.8,17.5 8.2,17.5 6.8,15.2 Z"
          fill="#ad7fa8"
          stroke="#5c3566"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        {/* Tilted waffle cone at upper-right */}
        <polygon
          points="12.2,11.2 20.5,3.5 16.8,14.2"
          fill="#e0aa5b"
          stroke="#8f5902"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        <line x1="14.5" y1="9.2" x2="17.8" y2="11.5" stroke="#8f5902" strokeWidth={0.55} />
        <line x1="16.5" y1="7.2" x2="18.8" y2="8.8" stroke="#8f5902" strokeWidth={0.55} />
      </g>
    ),
  },
  {
    id: 'sop.mpmcontainer',

    label: 'MPM Container',

    family: 'sop',

    description: 'Cardboard box back flaps.',
    refKey: 'SOP_mpmcontainer',
    types: ['mpmcontainer'],
    icons: ['sop_mpmcontainer'],
    render: () => (
      <g>
        {/* Cardboard box back flaps */}
        <polygon
          points="5.5,9.5 12,6.5 10.2,4.2 3.5,7.2"
          fill="#c17d11"
          stroke="#7b4706"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
        <polygon
          points="12,6.5 18.5,9.5 20.5,7.2 13.8,4.2"
          fill="#b06a10"
          stroke="#7b4706"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
        {/* White/blue granular snow mound inside box */}
        <path
          d="M6,10.2 C7.5,7.2 10,6.2 12,6.2 C14,6.2 16.5,7.2 18,10.2 L12,13.2 Z"
          fill="#ffffff"
          stroke="#729fcf"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        {/* Cardboard box front-left and front-right walls */}
        <polygon
          points="5.5,9.5 12,12.8 12,20.5 5.5,17.2"
          fill="#e0aa5b"
          stroke="#7b4706"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        <polygon
          points="12,12.8 18.5,9.5 18.5,17.2 12,20.5"
          fill="#b06a10"
          stroke="#7b4706"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        {/* Open front flaps */}
        <polygon
          points="5.5,9.5 12,12.8 9.8,15.5 3.2,12.2"
          fill="#f0d09e"
          stroke="#7b4706"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
        <polygon
          points="12,12.8 18.5,9.5 20.8,12.2 14.2,15.5"
          fill="#e0aa5b"
          stroke="#7b4706"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
      </g>
    ),
  },
];
