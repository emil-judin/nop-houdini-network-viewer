import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_06_PART_8: OperatorIconDef[] = [
  {
    id: 'sop.guidemask',

    label: 'Guide Mask',

    family: 'sop',

    description: 'Curved grey skin patch.',
    refKey: 'SOP_guidemask',
    types: ['guidemask'],
    icons: ['sop_guidemask'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-skin`} x1="2" y1="15" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#888a85" />
          </linearGradient>
        </defs>
        {/* Curved grey skin patch */}
        <path
          d="M 2 19.5 Q 12 16.5 22 19.5 L 18.5 13 Q 12 11.5 5.5 13 Z"
          fill={`url(#${uid}-skin)`}
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Masked region ellipse on skin */}
        <ellipse
          cx="12"
          cy="16.2"
          rx="5.2"
          ry="2.1"
          fill="#ffffff"
          fillOpacity="0.6"
          stroke="#ef2929"
          strokeWidth="0.8"
          strokeDasharray="1.6 1"
        />
        {/* Outer unmasked dimmed guides */}
        <g fill="none" stroke="#c4a000" strokeWidth="1.5" strokeLinecap="round" opacity="0.55">
          <path d="M 5.5 15.5 C 5 11.5 5.8 8 7.2 5" />
          <path d="M 18.5 15.5 C 19 11.5 18.2 8 16.8 5" />
        </g>
        {/* Active masked guides inside red dashed region */}
        <g fill="none" stroke="#ef2929" strokeWidth="1.9" strokeLinecap="round">
          <path d="M 9.8 16 C 9.2 11 10 6.8 11.5 3" />
          <path d="M 12.2 16.5 C 12 11.5 12.5 7 13.8 3.2" />
          <path d="M 14.5 15.8 C 14.5 11.2 15 7.2 16.2 3.8" />
        </g>
        <g fill="none" stroke="#fce94f" strokeWidth="1.1" strokeLinecap="round">
          <path d="M 9.8 16 C 9.2 11 10 6.8 11.5 3" />
          <path d="M 12.2 16.5 C 12 11.5 12.5 7 13.8 3.2" />
          <path d="M 14.5 15.8 C 14.5 11.2 15 7.2 16.2 3.8" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.guidepartition',

    label: 'Guide Partition',

    family: 'sop',

    description: 'Grey head sphere.',
    refKey: 'SOP_guidepartition',
    types: ['guidepartition'],
    icons: ['sop_guidepartition'],
    render: (uid) => (
      <g>
        <defs>
          <radialGradient id={`${uid}-head`} cx="11" cy="14" r="8" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#eeeeec" />
            <stop offset="0.7" stopColor="#dbdbd7" />
            <stop offset="1" stopColor="#868679" />
          </radialGradient>
        </defs>
        {/* Grey head sphere */}
        <ellipse cx="12" cy="13.5" rx="7.5" ry="8" fill={`url(#${uid}-head)`} stroke="#454545" strokeWidth="0.85" />
        {/* Left hair partition mass */}
        <path
          d="M 11.5 4 C 7 4.2 4 7.5 4.2 12.5 C 4.4 15.5 5.5 17.5 6.8 18.5 C 6.8 15 7.5 12.5 11.2 10.5 Z"
          fill="#666666"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Right hair partition mass */}
        <path
          d="M 13.2 4 C 17.8 4.5 20.2 8 19.8 13 C 19.5 15.8 18.2 17.8 17 18.8 C 16.8 15.2 15.8 12.5 12.8 10.5 Z"
          fill="#b7b7b7"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Hair strand detail lines */}
        <g fill="none" stroke="#474747" strokeWidth="0.6" strokeLinecap="round">
          <path d="M 11 6.5 C 8 7.2 6 9.5 5.5 13" />
          <path d="M 13.5 6.5 C 16.5 7.2 18.2 9.5 18.5 13" />
        </g>
        {/* Bright red center parting line */}
        <path
          d="M 12.2 3.2 C 12 6 12 8.8 12 11.5"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.guidereduce',

    label: 'Guide Reduce',

    family: 'sop',

    description: 'Isometric grey skin slab.',
    refKey: 'SOP_guidereduce',
    types: ['guidereduce'],
    icons: ['sop_guidereduce'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-slab`} x1="2" y1="13" x2="22" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#888a85" />
          </linearGradient>
        </defs>
        {/* Isometric grey skin slab */}
        <polygon
          points="12,11.5 22,16.5 12,21.5 2,16.5"
          fill={`url(#${uid}-slab)`}
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Dense blue hair clump on left */}
        <path
          d="M 7.5 16.5 L 10.5 18.2 L 12.5 16 L 14 10 C 15.5 7.5 17 6.5 18 6.5 C 15.5 5.5 12.5 6.5 10.5 9.5 C 9 11.5 8 14 7.5 16.5 Z"
          fill="#3465a4"
          stroke="#12335b"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#b6dafc" strokeWidth="0.65" strokeLinecap="round">
          <path d="M 9 16 C 9.8 12.5 11.5 9.5 14.5 7.5" />
          <path d="M 10.8 16.8 C 11.5 13.5 13 10.5 16 8.2" />
        </g>
        {/* Reduced single golden guide curve on right */}
        <path
          d="M 15.5 14.5 C 15.5 10 16.5 6.5 19.2 3.2"
          fill="none"
          stroke="#856d00"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 15.5 14.5 C 15.5 10 16.5 6.5 19.2 3.2"
          fill="none"
          stroke="#fce94f"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.guideskinattriblookup',

    label: 'Guide Skin Attribute Lookup',

    family: 'sop',

    description: 'Curved skin patch with color attribute gradient.',
    refKey: 'SOP_guideskinattriblookup',
    types: ['guideskinattriblookup'],
    icons: ['sop_guideskinattriblookup'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-skin`} x1="2" y1="15" x2="22" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#729fcf" />
            <stop offset="0.5" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#fce94f" />
          </linearGradient>
        </defs>
        {/* Curved skin patch with color attribute gradient */}
        <path
          d="M 2 19.5 Q 12 16.5 22 19.5 L 18.5 13 Q 12 11.5 5.5 13 Z"
          fill={`url(#${uid}-skin)`}
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Left hair guides inheriting blue skin attribute */}
        <g fill="none" stroke="#204a87" strokeWidth="1.9" strokeLinecap="round">
          <path d="M 6 16 C 5.2 11.5 6 7.5 7.5 4" />
          <path d="M 9 15.5 C 8.2 11 9 7 10.5 3.5" />
        </g>
        <g fill="none" stroke="#729fcf" strokeWidth="1.1" strokeLinecap="round">
          <path d="M 6 16 C 5.2 11.5 6 7.5 7.5 4" />
          <path d="M 9 15.5 C 8.2 11 9 7 10.5 3.5" />
        </g>
        {/* Center hair guide inheriting neutral tan attribute */}
        <path d="M 12.2 15.8 C 11.8 11.2 12.5 7 14 3.5" fill="none" stroke="#633812" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M 12.2 15.8 C 11.8 11.2 12.5 7 14 3.5" fill="none" stroke="#e9cfb5" strokeWidth="1.1" strokeLinecap="round" />
        {/* Right hair guides inheriting yellow skin attribute */}
        <g fill="none" stroke="#c4a000" strokeWidth="1.9" strokeLinecap="round">
          <path d="M 15.5 16 C 15.2 11.5 16 7.5 17.5 4" />
          <path d="M 18.2 16.5 C 18 12 18.8 8 20.2 4.8" />
        </g>
        <g fill="none" stroke="#fce94f" strokeWidth="1.1" strokeLinecap="round">
          <path d="M 15.5 16 C 15.2 11.5 16 7.5 17.5 4" />
          <path d="M 18.2 16.5 C 18 12 18.8 8 20.2 4.8" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.guidesurface',

    label: 'Guide Surface',

    family: 'sop',

    description: 'Isometric grey skin slab.',
    refKey: 'SOP_guidesurface',
    types: ['guidesurface'],
    icons: ['sop_guidesurface'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-surf`} x1="6" y1="16" x2="18" y2="4" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3465a4" />
            <stop offset="1" stopColor="#729fcf" />
          </linearGradient>
        </defs>
        {/* Isometric grey skin slab */}
        <polygon
          points="12,11.5 22,16.5 12,21.5 2,16.5"
          fill="#d3d7cf"
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Lofted blue guide ribbon surface */}
        <path
          d="M 7.5 16.5 C 8.5 11.5 10.5 7.5 13.5 4.5 L 19.5 7.5 C 16.5 10.5 14.5 14.5 13.5 19.5 Z"
          fill={`url(#${uid}-surf)`}
          fillOpacity="0.8"
          stroke="#12335b"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {/* Red guide curves framing the surface */}
        <g fill="none" stroke="#ef2929" strokeWidth="1.25" strokeLinecap="round">
          <path d="M 7.5 16.5 C 8.5 11.5 10.5 7.5 13.5 4.5" />
          <path d="M 10.5 18 C 11.5 13 13.5 9 16.5 6" />
          <path d="M 13.5 19.5 C 14.5 14.5 16.5 10.5 19.5 7.5" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.guidetangentspace',

    label: 'Guide Tangent Space',

    family: 'sop',

    description: 'Curved grey skin patch.',
    refKey: 'SOP_guidetangentspace',
    types: ['guidetangentspace'],
    icons: ['sop_guidetangentspace'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-skin`} x1="2" y1="15" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#888a85" />
          </linearGradient>
        </defs>
        {/* Curved grey skin patch */}
        <path
          d="M 2 20 Q 12 17 22 20 L 18.5 14 Q 12 12.5 5.5 14 Z"
          fill={`url(#${uid}-skin)`}
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Thick yellow guide curve */}
        <path
          d="M 13.5 17.5 C 13.5 12 12 7 5.5 3.5"
          fill="none"
          stroke="#c4a000"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M 13.5 17.5 C 13.5 12 12 7 5.5 3.5"
          fill="none"
          stroke="#fef4a7"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Tangent & normal vectors along guide curve */}
        <g strokeLinecap="round">
          {/* Bottom point tangent/normal */}
          <line x1="13.5" y1="15.5" x2="13.5" y2="10.5" stroke="#ef2929" strokeWidth="1.1" />
          <line x1="13.5" y1="15.5" x2="18.5" y2="15.5" stroke="#3465a4" strokeWidth="1.1" />
          <circle cx="13.5" cy="15.5" r="1.2" fill="#ef2929" />
          {/* Upper point tangent/normal */}
          <line x1="11.2" y1="8.2" x2="8.5" y2="3.5" stroke="#ef2929" strokeWidth="1.1" />
          <line x1="11.2" y1="8.2" x2="15.8" y2="5.5" stroke="#3465a4" strokeWidth="1.1" />
          <circle cx="11.2" cy="8.2" r="1.2" fill="#ef2929" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.guidetransfer',

    label: 'Guide Transfer',

    family: 'sop',

    description: 'Left source head with golden-brown hair.',
    refKey: 'SOP_guidetransfer',
    types: ['guidetransfer'],
    icons: ['sop_guidetransfer'],
    render: () => (
      <g>
        {/* Left source head with golden-brown hair */}
        <ellipse cx="6.8" cy="12.5" rx="4.2" ry="5.5" fill="#e9b96e" stroke="#603c01" strokeWidth="0.75" />
        <path
          d="M 2.5 13 C 2 9 3.5 5.5 6.8 5.2 C 9.8 5 11.5 8 11.2 12.5 C 10.5 9.5 9 8 6.8 8 C 4.5 8 3.2 9.8 2.5 13 Z"
          fill="#c17d11"
          stroke="#603c01"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {/* Right target head receiving transferred groom */}
        <ellipse cx="17.2" cy="14.5" rx="4.2" ry="5.5" fill="#d3d7cf" stroke="#555753" strokeWidth="0.75" />
        <path
          d="M 13 15 C 12.5 11 14 7.5 17.2 7.2 C 20.2 7 21.8 10 21.5 14.5 C 20.8 11.5 19.2 10 17.2 10 C 15 10 13.8 11.8 13 15 Z"
          fill="#e2a340"
          stroke="#603c01"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {/* Orange-red curved transfer arrow */}
        <path
          d="M 8.5 4.5 Q 13 1.5 16.5 5"
          fill="none"
          stroke="#590b08"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M 8.5 4.5 Q 13 1.5 16.5 5"
          fill="none"
          stroke="#f57900"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <polygon
          points="18.2,6.8 14.2,5.8 16.8,3"
          fill="#ef0909"
          stroke="#590b08"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.guideutility',

    label: 'Guide Utility',

    family: 'sop',

    description: 'Isometric grey skin slab.',
    refKey: 'SOP_guideutility',
    types: ['guideutility'],
    icons: ['sop_guideutility'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-slab`} x1="2" y1="13" x2="22" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#888a85" />
          </linearGradient>
        </defs>
        {/* Isometric grey skin slab */}
        <polygon
          points="12,12 22,17 12,22 2,17"
          fill={`url(#${uid}-slab)`}
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Blue hair clump */}
        <path
          d="M 9 16.5 L 12 18.2 L 14 16 L 15.5 9.5 C 17 7 18.5 6 19.5 6 C 16.5 5 13.5 6 11.5 9 C 10 11 9.5 14 9 16.5 Z"
          fill="#3465a4"
          stroke="#12335b"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#b6dafc" strokeWidth="0.65" strokeLinecap="round">
          <path d="M 10.5 16 C 11.2 12.5 13 9.5 16 7.2" />
          <path d="M 12.2 16.8 C 13 13.5 14.5 10.5 17.5 8" />
        </g>
        {/* Utility wrench badge on top left */}
        <path
          d="M 4.5 4.5 L 6.2 6.2 L 5.2 7.2 L 3.5 5.5 C 2.8 6.5 3 7.8 4 8.6 C 4.8 9.2 6 9.2 6.8 8.6 L 10.2 12 L 11.6 10.6 L 8.2 7.2 C 8.8 6.4 8.8 5.2 8 4.4 C 7.2 3.4 5.8 3.2 4.5 4.5 Z"
          fill="#eeeeec"
          stroke="#2e3436"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.guidevolume',

    label: 'Guide Volume',

    family: 'sop',

    description: 'Isometric grey skin slab.',
    refKey: 'SOP_guidevolume',
    types: ['guidevolume'],
    icons: ['sop_guidevolume'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-slab`} x1="2" y1="13" x2="22" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#888a85" />
          </linearGradient>
        </defs>
        {/* Isometric grey skin slab */}
        <polygon
          points="12,12 22,17 12,22 2,17"
          fill={`url(#${uid}-slab)`}
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Blue hair clump inside volume */}
        <path
          d="M 9 16.5 L 12 18.2 L 14 16 L 15.5 9.5 C 17 7 18.5 6 19.5 6 C 16.5 5 13.5 6 11.5 9 C 10 11 9.5 14 9 16.5 Z"
          fill="#3465a4"
          stroke="#12335b"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Green wireframe guide volume cage */}
        <g fill="none" stroke="#8ae234" strokeWidth="0.8" strokeLinejoin="round">
          <polygon points="12,3 19.5,6.5 12,10 4.5,6.5" />
          <polygon points="12,11 19.5,14.5 12,18 4.5,14.5" />
          <line x1="4.5" y1="6.5" x2="4.5" y2="14.5" />
          <line x1="19.5" y1="6.5" x2="19.5" y2="14.5" />
          <line x1="12" y1="10" x2="12" y2="18" />
        </g>
        {/* Red center guide curve */}
        <path d="M 12 17 C 12.5 12 14 8 16.5 5" fill="none" stroke="#ef2929" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'sop.haircardgen',

    label: 'Hair Card Generate',

    family: 'sop',

    description: 'Grey head and neck bust.',
    refKey: 'SOP_haircardgen',
    types: ['haircardgen'],
    icons: ['sop_haircardgen'],
    render: (uid) => (
      <g>
        <defs>
          <radialGradient id={`${uid}-bust`} cx="10" cy="11" r="9" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#afafaf" />
            <stop offset="1" stopColor="#595e55" />
          </radialGradient>
        </defs>
        {/* Grey head and neck bust */}
        <path
          d="M 8.5 17.5 L 7.5 22 L 16.5 22 L 15.5 16.5 Z"
          fill="#8c8c8c"
          stroke="#373c32"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <path
          d="M 18.5 10.5 C 18.2 14.5 17 18 14.5 19.5 C 12.5 20.8 8.5 21.8 7 20.2 C 5.5 18.5 4 14.5 3.6 12 C 3 6.8 6 2.2 10 1.8 C 14 1.4 18.8 5 18.5 10.5 Z"
          fill={`url(#${uid}-bust)`}
          stroke="#373c32"
          strokeWidth="0.85"
        />
        {/* Layered polygon hair cards (yellow and white ribbons) */}
        <path
          d="M 8.5 2.5 C 5 4.5 3.5 9.5 4.5 15.5 L 8 16 C 7.2 10.5 8.2 6 11 3.5 Z"
          fill="#fce94f"
          stroke="#8c7800"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <path
          d="M 11.2 5.8 C 14.2 7.5 12 10.8 13.5 13.5 L 16.8 13.2 C 15 10.8 16.8 5.8 13.2 4 Z"
          fill="#ffffff"
          stroke="#555753"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <path
          d="M 10 3 C 10.8 5.2 13.8 5 15.5 7 C 17.5 9 19 14 19 14 L 21.2 13.2 C 21.2 13.2 19.5 7 17.5 5.5 C 15.8 4 12.5 3.2 12 1.8 Z"
          fill="#fef4a9"
          stroke="#8c7800"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
];
