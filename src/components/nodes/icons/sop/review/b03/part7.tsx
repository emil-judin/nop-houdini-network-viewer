import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_03_PART_7: OperatorIconDef[] = [
  {
    id: 'sop.vopnet',

    label: 'VOP Network',

    family: 'sop',

    description: '3D V-shaped purple prism.',
    refKey: 'NETWORKS_vop',
    types: ['vopnet'],
    icons: ['networks_vop'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-vop-l`} x1="4" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ad7fa8" />
            <stop offset="1" stopColor="#75507b" />
          </linearGradient>
          <linearGradient id={`${uid}-vop-r`} x1="12" y1="5" x2="20" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#894f99" />
            <stop offset="1" stopColor="#5c3566" />
          </linearGradient>
        </defs>
        {/* 3D V-shaped purple prism */}
        <path
          d="M3.2 4.5L7.6 3.5L12 14.8L16.4 3.5L20.8 4.5L13.8 20.5H10.2L3.2 4.5Z"
          fill={`url(#${uid}-vop-l)`}
          stroke="#361f3c"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M12 14.8L16.4 3.5L20.8 4.5L13.8 20.5H12V14.8Z"
          fill={`url(#${uid}-vop-r)`}
          stroke="#361f3c"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {/* Top facet highlights */}
        <path d="M3.6 4.6L7.4 3.7L9.5 9.2L5.8 10.2L3.6 4.6Z" fill="#d3b8d8" opacity="0.65" />
        {/* Bright yellow-orange spark / lightning bolt */}
        <path
          d="M14.8 3.2L9.2 11.2H13.2L9.8 20.2L17.8 10.2H13.5L14.8 3.2Z"
          fill="#fce94f"
          stroke="#c45100"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.walkonsurface',

    label: 'Walk on Surface',

    family: 'sop',

    description: 'Curved 3D surface patch.',
    refKey: 'SOP_walkonsurface',
    types: ['walkonsurface'],
    icons: ['sop_walkonsurface'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-wos-surf`} x1="3" y1="6" x2="21" y2="19" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#eeeeec" />
            <stop offset="0.6" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#979b88" />
          </linearGradient>
        </defs>
        {/* Curved 3D surface patch */}
        <path
          d="M2.5 14.5C5.5 9.2 10.5 6.8 16.5 6.5L21.5 11.5C16.2 12.2 11.5 15.2 8.2 19.8L2.5 14.5Z"
          fill={`url(#${uid}-wos-surf)`}
          stroke="#555753"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Faint surface wireframe grid */}
        <path
          d="M5.4 17.1C8.5 12.1 13.4 9.5 19 9M6.5 11.2L12.2 16.4M11.5 8.2L17.2 13.4"
          fill="none"
          stroke="#888a85"
          strokeWidth="0.55"
        />
        {/* Red footsteps walking across surface */}
        <ellipse cx="6.8" cy="14.6" rx="1.2" ry="0.65" transform="rotate(-32 6.8 14.6)" fill="#ef2929" stroke="#a40000" strokeWidth="0.45" />
        <ellipse cx="9.8" cy="13.8" rx="1.2" ry="0.65" transform="rotate(-28 9.8 13.8)" fill="#ef2929" stroke="#a40000" strokeWidth="0.45" />
        <ellipse cx="12.2" cy="11.2" rx="1.2" ry="0.65" transform="rotate(-24 12.2 11.2)" fill="#ef2929" stroke="#a40000" strokeWidth="0.45" />
        <ellipse cx="15.4" cy="10.4" rx="1.2" ry="0.65" transform="rotate(-18 15.4 10.4)" fill="#ef2929" stroke="#a40000" strokeWidth="0.45" />
        <ellipse cx="17.6" cy="8.2" rx="1.15" ry="0.6" transform="rotate(-15 17.6 8.2)" fill="#ef2929" stroke="#a40000" strokeWidth="0.45" />
      </g>
    ),
  },
  {
    id: 'sop.weightarraybiharmonic',

    label: 'Weight Array Biharmonic',

    family: 'sop',

    description: 'Curved grey trapezoid surface.',
    refKey: 'SOP_weightarraybiharmonic',
    types: ['weightarraybiharmonic', 'weightarrayinterpolate'],
    icons: ['sop_weightarraybiharmonic', 'sop_weightarrayinterpolate'],
    render: () => (
      <g>
        {/* Curved grey trapezoid surface */}
        <path
          d="M5.2 4.2C9.8 5.2 14.2 5.2 18.8 4.2L21.5 18.8C15.2 20.2 8.8 20.2 2.5 18.8L5.2 4.2Z"
          fill="#d6d9d2"
          stroke="#555753"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Biharmonic weight circles array (spectral heatmap) */}
        <circle cx="8" cy="7.5" r="1.25" fill="#ef6a6a" stroke="#a40000" strokeWidth="0.45" />
        <circle cx="12" cy="7.8" r="1.25" fill="#fcaf3e" stroke="#ce5c00" strokeWidth="0.45" />
        <circle cx="16" cy="7.5" r="1.25" fill="#edd400" stroke="#c4a000" strokeWidth="0.45" />

        <circle cx="7.2" cy="11.8" r="1.35" fill="#fcaf3e" stroke="#ce5c00" strokeWidth="0.45" />
        <circle cx="12" cy="12.1" r="1.35" fill="#73d216" stroke="#4e9a06" strokeWidth="0.45" />
        <circle cx="16.8" cy="11.8" r="1.35" fill="#729fcf" stroke="#204a87" strokeWidth="0.45" />

        <circle cx="6.4" cy="16.2" r="1.45" fill="#edd400" stroke="#c4a000" strokeWidth="0.45" />
        <circle cx="12" cy="16.6" r="1.45" fill="#729fcf" stroke="#204a87" strokeWidth="0.45" />
        <circle cx="17.6" cy="16.2" r="1.45" fill="#ef6a6a" stroke="#a40000" strokeWidth="0.45" />
      </g>
    ),
  },
  {
    id: 'sop.windingnumber',

    label: 'Winding Number',

    family: 'sop',

    description: 'Outer winding ribbon.',
    refKey: 'SOP_windingnumber',
    types: ['windingnumber'],
    icons: ['sop_windingnumber'],
    render: () => (
      <g>
        {/* Outer winding ribbon */}
        <path
          d="M12 3.2C6.4 3.2 2.8 7.4 2.8 12.4C2.8 17.5 6.8 20.8 12.2 20.8C17.6 20.8 21.2 17.2 21.2 12.2C21.2 7.5 17.5 4.5 13.2 5.2C9.2 5.8 6.8 9.2 7.2 12.8C7.6 16.2 10.4 17.8 13.4 17.2C16.2 16.6 17.6 14.2 16.8 11.5C16.1 9.2 13.6 8.4 11.6 9.5"
          fill="none"
          stroke="#262626"
          strokeWidth="3.1"
          strokeLinecap="round"
        />
        <path
          d="M12 3.2C6.4 3.2 2.8 7.4 2.8 12.4C2.8 17.5 6.8 20.8 12.2 20.8C17.6 20.8 21.2 17.2 21.2 12.2C21.2 7.5 17.5 4.5 13.2 5.2C9.2 5.8 6.8 9.2 7.2 12.8C7.6 16.2 10.4 17.8 13.4 17.2C16.2 16.6 17.6 14.2 16.8 11.5C16.1 9.2 13.6 8.4 11.6 9.5"
          fill="none"
          stroke="#edd400"
          strokeWidth="1.65"
          strokeLinecap="round"
        />
        {/* Query point at center */}
        <circle cx="12.2" cy="12.8" r="1.6" fill="#ef2929" stroke="#262626" strokeWidth="0.65" />
      </g>
    ),
  },
];
