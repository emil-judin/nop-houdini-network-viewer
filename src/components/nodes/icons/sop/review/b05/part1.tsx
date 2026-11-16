import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 5 Part 1 (icons 10 to 19): volume SOP icons.
 */
export const BATCH_05_PART_1: OperatorIconDef[] = [
  {
    id: 'sop.volumeramp',
    label: 'Volume Ramp',
    family: 'sop',
    description:
      'Fluffy volume cloud split vertically between grey-white on the left and a blue-to-yellow color ramp on the right.',
    types: ['volumeramp'],
    icons: ['sop_volumeramp'],
    refKey: 'SOP_volumeramp',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-vr-r`}>
            <rect x="12" y="0" width="12" height="24" />
          </clipPath>
        </defs>
        <path
          d="M6.8,18.5 C4.5,18.5 3,16.8 3,14.6 C3,13.1 3.8,11.8 5,11.2 C4.7,10.5 4.5,9.7 4.5,9 C4.5,6.8 6.4,5 8.8,5 C9.6,5 10.3,5.2 10.9,5.6 C11.6,4 13.2,3 15,3 C16.9,3 18.5,4 19.2,5.6 C20.6,5.3 22,6.6 22,8.5 C22,9.3 21.7,10.1 21.1,10.7 C22.1,11.6 22.3,13.2 21.5,14.5 C21.8,16.1 20.5,17.8 18.7,18 C17.8,19.3 16,19.8 14.5,19 C13.3,20.2 11.4,20.4 10,19.2 C9,19.5 7.8,19 6.8,18.5 Z"
          fill="#e6e7e4"
          stroke="#51534f"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <circle cx="8.8" cy="9.2" r="2.6" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="9.2" cy="14" r="2.4" fill="#ffffff" fillOpacity="0.75" />
        <g clipPath={`url(#${uid}-vr-r)`}>
          <path
            d="M6.8,18.5 C4.5,18.5 3,16.8 3,14.6 C3,13.1 3.8,11.8 5,11.2 C4.7,10.5 4.5,9.7 4.5,9 C4.5,6.8 6.4,5 8.8,5 C9.6,5 10.3,5.2 10.9,5.6 C11.6,4 13.2,3 15,3 C16.9,3 18.5,4 19.2,5.6 C20.6,5.3 22,6.6 22,8.5 C22,9.3 21.7,10.1 21.1,10.7 C22.1,11.6 22.3,13.2 21.5,14.5 C21.8,16.1 20.5,17.8 18.7,18 C17.8,19.3 16,19.8 14.5,19 C13.3,20.2 11.4,20.4 10,19.2 C9,19.5 7.8,19 6.8,18.5 Z"
            fill="#87b7ff"
            stroke="#3280c5"
            strokeWidth="0.95"
            strokeLinejoin="round"
          />
          <circle cx="15" cy="8.2" r="2.8" fill="#fff887" fillOpacity="0.85" />
          <circle cx="17.2" cy="13" r="2.8" fill="#fff887" fillOpacity="0.8" />
          <circle cx="13.8" cy="14.5" r="2.4" fill="#88c7ff" fillOpacity="0.8" />
        </g>
        <line x1="12" y1="2.2" x2="12" y2="21.2" stroke="#5d5b58" strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'sop.volumerasterize',
    label: 'Volume Rasterize',
    family: 'sop',
    description:
      'Fluffy grey-white volume cloud with a diagonal orange-red pencil drawing across the lower right.',
    types: ['volumerasterize'],
    icons: ['sop_volumerasterize'],
    refKey: 'SOP_volumerasterize',
    render: () => (
      <>
        <path
          d="M6.5,18.2 C4.3,18.2 2.8,16.6 2.8,14.5 C2.8,13 3.6,11.7 4.8,11.1 C4.5,10.4 4.3,9.6 4.3,8.9 C4.3,6.7 6.2,5 8.5,5 C9.3,5 10,5.2 10.6,5.6 C11.3,4 12.8,3 14.6,3 C16.4,3 18,4 18.7,5.6 C20.1,5.3 21.4,6.6 21.4,8.4 C21.4,9.2 21.1,10 20.5,10.6 C21.5,11.5 21.7,13 20.9,14.2 C21.2,15.8 19.9,17.5 18.2,17.7 C17.3,19 15.5,19.4 14.1,18.7 C12.9,19.8 11,20 9.7,18.9 C8.7,19.2 7.5,18.7 6.5,18.2 Z"
          fill="#d3d7cf"
          stroke="#51534f"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="9" r="2.7" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="14.2" cy="7.8" r="2.8" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="10.2" cy="13.8" r="2.5" fill="#ffffff" fillOpacity="0.75" />
        <g stroke="#590b08" strokeWidth="0.8" strokeLinejoin="round">
          <polygon points="18.8,7.2 21.2,9.6 14.6,16.2 12.2,13.8" fill="#e96712" />
          <polygon points="19.8,6.2 22.2,8.6 21.2,9.6 18.8,7.2" fill="#ffd1d1" />
          <polygon points="12.2,13.8 14.6,16.2 10.8,17.6" fill="#f5e1c1" />
          <polygon points="11.6,15.8 12.6,16.8 10.8,17.6" fill="#CB1009" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumerasterizeattributes',
    label: 'Volume Rasterize Attributes',
    family: 'sop',
    description:
      'Cluster of grey-blue attribute points on the left half transitioning across a vertical split into a fluffy volume cloud on the right.',
    types: ['volumerasterizeattributes'],
    icons: ['sop_volumerasterizeattributes'],
    refKey: 'SOP_volumerasterizeattributes',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-vra-r`}>
            <rect x="12" y="0" width="12" height="24" />
          </clipPath>
        </defs>
        <g fill="#8d9a9e" stroke="#2e3436" strokeWidth="0.65">
          <circle cx="6.2" cy="5.5" r="1.4" />
          <circle cx="9.6" cy="4.2" r="1.4" />
          <circle cx="4.2" cy="9.2" r="1.4" />
          <circle cx="7.6" cy="8.2" r="1.4" />
          <circle cx="10.4" cy="7.5" r="1.4" />
          <circle cx="4" cy="13" r="1.4" />
          <circle cx="7.2" cy="12" r="1.4" />
          <circle cx="10.2" cy="11.2" r="1.4" />
          <circle cx="5.6" cy="16.5" r="1.4" />
          <circle cx="8.8" cy="15.5" r="1.4" />
          <circle cx="9.8" cy="19" r="1.4" />
        </g>
        <g clipPath={`url(#${uid}-vra-r)`}>
          <path
            d="M6.8,18.8 C4.5,18.8 3,17 3,14.8 C3,13.3 3.8,12 5,11.4 C4.7,10.7 4.5,9.9 4.5,9.2 C4.5,7 6.4,5.2 8.8,5.2 C9.6,5.2 10.3,5.4 10.9,5.8 C11.6,4.2 13.2,3.2 15,3.2 C16.9,3.2 18.5,4.2 19.2,5.8 C20.6,5.5 22,6.8 22,8.7 C22,9.5 21.7,10.3 21.1,10.9 C22.1,11.8 22.3,13.4 21.5,14.7 C21.8,16.3 20.5,18 18.7,18.2 C17.8,19.5 16,20 14.5,19.2 C13.3,20.4 11.4,20.6 10,19.4 C9,19.7 7.8,19.2 6.8,18.8 Z"
            fill="#d3d7cf"
            stroke="#51534f"
            strokeWidth="0.95"
            strokeLinejoin="round"
          />
          <circle cx="15" cy="8.2" r="2.8" fill="#ffffff" fillOpacity="0.85" />
          <circle cx="17" cy="13.2" r="2.6" fill="#ffffff" fillOpacity="0.8" />
        </g>
        <line x1="12" y1="2.2" x2="12" y2="21.5" stroke="#2e3436" strokeWidth="0.85" />
      </>
    ),
  },
  {
    id: 'sop.volumerasterizecurve',
    label: 'Volume Rasterize Curve',
    family: 'sop',
    description:
      'Chain of fluffy volume puffs following an S-curve with a dark spline curve running through its center.',
    types: ['volumerasterizecurve'],
    icons: ['sop_volumerasterizecurve'],
    refKey: 'SOP_volumerasterizecurve',
    render: () => (
      <>
        <g fill="#d3d7cf" stroke="#51534f" strokeWidth="0.85" strokeLinejoin="round">
          <circle cx="5.2" cy="5.2" r="3" />
          <circle cx="8.8" cy="6.2" r="2.8" />
          <circle cx="11.2" cy="9.5" r="2.8" />
          <circle cx="12.2" cy="13.2" r="2.8" />
          <circle cx="14.8" cy="16.5" r="2.9" />
          <circle cx="18.8" cy="18.2" r="3" />
        </g>
        <g fill="#ffffff" fillOpacity="0.85">
          <circle cx="5" cy="4.8" r="1.9" />
          <circle cx="8.6" cy="5.8" r="1.8" />
          <circle cx="11" cy="9.2" r="1.8" />
          <circle cx="12" cy="13" r="1.8" />
          <circle cx="14.6" cy="16.2" r="1.9" />
          <circle cx="18.5" cy="17.8" r="2" />
        </g>
        <path
          d="M3.8,4.5 C7.5,4.8 11.2,7 11.6,11.5 C12,15.8 15.2,18 20.2,18.8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M3.8,4.5 C7.5,4.8 11.2,7 11.6,11.5 C12,15.8 15.2,18 20.2,18.8"
          fill="none"
          stroke="#2e3436"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.volumerasterizehair',
    label: 'Volume Rasterize Hair',
    family: 'sop',
    description:
      'Amber scalp patch with dark hair strands on the left and soft grey-white volume-rasterized hair plumes on the right.',
    types: ['volumerasterizehair'],
    icons: ['sop_volumerasterizehair'],
    refKey: 'SOP_volumerasterizehair',
    render: () => (
      <>
        <g fill="#d3d7cf" stroke="#888a85" strokeWidth="0.7" strokeLinejoin="round">
          <path d="M12.5,14.5 C11.8,10.5 12.5,6.5 14.8,4.2 C15.8,3.5 16.5,4.2 16.5,5 C14.6,7.5 14.2,11.2 14.8,14.5 Z" />
          <path d="M15.2,15 C15,11 16.2,7.2 18.8,5.2 C19.8,4.6 20.4,5.4 20.2,6.2 C18,8.5 17.2,11.8 17.5,15.2 Z" />
          <path d="M17.5,16.2 C18,12.8 19.5,9.8 21.8,8.2 C22.5,7.8 22.8,8.6 22.5,9.4 C20.5,11.2 19.5,13.8 19.4,16.5 Z" />
        </g>
        <g fill="none" stroke="#2e3436" strokeWidth="1.25" strokeLinecap="round">
          <path d="M5,15 C4.2,11.2 5.2,7.5 7.5,5.2" />
          <path d="M7.5,15.5 C6.8,11.5 8,7.8 10.5,5.5" />
          <path d="M10,15.8 C9.8,12 11,8.8 13,6.8" />
        </g>
        <path
          d="M2,19.8 C8.5,18.6 15.5,18.6 22,19.8 L19.5,14.2 C14.5,13 9.5,13 4.5,14.2 Z"
          fill="#c17d11"
          stroke="#8f5902"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.volumerasterizelattice',
    label: 'Volume Rasterize Lattice',
    family: 'sop',
    description:
      'Bright green puffy volume cloud silhouette over a blue 3D wireframe lattice.',
    types: ['volumerasterizelattice'],
    icons: ['sop_volumerasterizelattice'],
    refKey: 'SOP_volumerasterizelattice',
    render: () => (
      <>
        <path
          d="M4.2,17.2 C2.2,16 1.8,13.2 2.8,10.8 C3.6,8.8 5.5,7.6 7,7.5 C7.8,4.2 10.5,2.5 13,3.2 C14.2,3.5 15,4.2 15.6,5 C17,4.6 18.5,5.2 19.2,6.4 C20.8,6.5 22,7.8 21.8,9.4 C21.6,10.8 20.5,11.8 19.2,12.3 L6.5,17.6 C5.6,18 4.8,17.7 4.2,17.2 Z"
          fill="#73d216"
          stroke="#275917"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="6.5,17.6 19.5,12.2 20.2,8.8 15.5,6.8 12,9.5 6.8,12.5"
          fill="#3465a4"
          stroke="#173662"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#b4cce5" strokeWidth="0.6">
          <path d="M10.5,10.2 L13.8,12.2 L13.5,14.8" />
          <path d="M14,8 L17.2,9.8 L16.8,13.2" />
          <path d="M6.8,14.8 L19.8,9.5" />
        </g>
        <path
          d="M3.2,14.5 C3.5,11.2 5.5,9.2 7.8,9 C8.6,5.8 11,4.2 13.5,4.8"
          fill="none"
          stroke="#d6f5b8"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.volumerasterizeparticles',
    label: 'Volume Rasterize Particles',
    family: 'sop',
    description:
      'Five small volume cloudlets, each surrounding a blue particle dot with a short motion streak.',
    types: ['volumerasterizeparticles'],
    icons: ['sop_volumerasterizeparticles'],
    refKey: 'SOP_volumerasterizeparticles',
    render: () => {
      const pts: [number, number][] = [
        [6, 6.2],
        [11.8, 8.8],
        [17.5, 5.8],
        [7.5, 15.5],
        [16.8, 16.5],
      ];
      return (
        <>
          {pts.map(([cx, cy], idx) => (
            <g key={idx}>
              <circle
                cx={cx}
                cy={cy}
                r="3.6"
                fill="#d3d7cf"
                stroke="#5d5b58"
                strokeWidth="0.75"
              />
              <circle cx={cx - 0.6} cy={cy - 0.6} r="2.2" fill="#ffffff" fillOpacity="0.8" />
              <line
                x1={cx - 1.8}
                y1={cy - 2.2}
                x2={cx}
                y2={cy}
                stroke="#88a9c3"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle
                cx={cx + 0.3}
                cy={cy + 0.3}
                r="1.2"
                fill="#2E659E"
                stroke="#152a4c"
                strokeWidth="0.55"
              />
            </g>
          ))}
        </>
      );
    },
  },
  {
    id: 'sop.volumerasterizepoints',
    label: 'Volume Rasterize Points',
    family: 'sop',
    description:
      'Five small volume cloudlets, each centered on a dark geometry point.',
    types: ['volumerasterizepoints'],
    icons: ['sop_volumerasterizepoints'],
    refKey: 'SOP_volumerasterizepoints',
    render: () => {
      const pts: [number, number][] = [
        [6, 6.2],
        [11.8, 8.8],
        [17.5, 5.8],
        [7.5, 15.5],
        [16.8, 16.5],
      ];
      return (
        <>
          {pts.map(([cx, cy], idx) => (
            <g key={idx}>
              <circle
                cx={cx}
                cy={cy}
                r="3.6"
                fill="#d3d7cf"
                stroke="#5d5b58"
                strokeWidth="0.75"
              />
              <circle cx={cx - 0.6} cy={cy - 0.6} r="2.2" fill="#ffffff" fillOpacity="0.8" />
              <circle
                cx={cx}
                cy={cy}
                r="1.2"
                fill="#404040"
                stroke="#262626"
                strokeWidth="0.55"
              />
            </g>
          ))}
        </>
      );
    },
  },
  {
    id: 'sop.volumereduce',
    label: 'Volume Reduce',
    family: 'sop',
    description:
      'Fluffy volume cloud at top-left with an orange-red arrow pointing down to a numeric 3.14 badge.',
    types: ['volumereduce'],
    icons: ['sop_volumereduce'],
    refKey: 'SOP_volumereduce',
    render: () => (
      <>
        <path
          d="M4.8,13.5 C3.1,13.5 1.8,12.2 1.8,10.5 C1.8,9.4 2.4,8.4 3.3,7.9 C3.1,7.4 3,6.8 3,6.2 C3,4.5 4.4,3.2 6.2,3.2 C6.8,3.2 7.3,3.4 7.8,3.7 C8.3,2.5 9.5,1.8 10.9,1.8 C12.3,1.8 13.5,2.5 14,3.7 C15.1,3.5 16.1,4.5 16.1,5.9 C16.1,6.5 15.8,7.1 15.4,7.5 C16.1,8.2 16.3,9.4 15.7,10.4 C15.9,11.6 14.9,12.9 13.5,13.1 C12.8,14.1 11.5,14.4 10.3,13.8 C9.4,14.7 8,14.8 7,13.9 C6.2,14.2 5.4,13.9 4.8,13.5 Z"
          fill="#d3d7cf"
          stroke="#51534f"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <circle cx="6.8" cy="6.8" r="2.1" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="10.5" cy="5.8" r="2.2" fill="#ffffff" fillOpacity="0.85" />
        <polygon
          points="5.5,13.8 8.2,16.5 9.5,15.2 10.2,19.8 5.6,19.2 6.9,17.9 4.2,15.2"
          fill="#e96712"
          stroke="#590b08"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <rect
          x="11"
          y="13.8"
          width="11.2"
          height="6.8"
          rx="1"
          fill="#ffffff"
          stroke="#5d5b58"
          strokeWidth="0.8"
        />
        <text
          x="16.6"
          y="18.8"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="4.8"
          fontWeight="bold"
          fill="#262626"
        >
          3.14
        </text>
      </>
    ),
  },
  {
    id: 'sop.volumeresample',
    label: 'Volume Resample',
    family: 'sop',
    description:
      'Isometric white volume cube subdivided by a bright green 3x3 voxel grid.',
    types: ['volumeresample'],
    icons: ['sop_volumeresample'],
    refKey: 'SOP_volumeresample',
    render: () => (
      <>
        <polygon
          points="10,2 3,6.5 3.5,17.5 14,21.5 21,15.5 21.5,5"
          fill="#ffffff"
          fillOpacity="0.85"
          stroke="#4e9a06"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polygon points="10,2 21.5,5 14.5,10 3,6.5" fill="#f5f5f4" />
        <polygon points="3,6.5 14.5,10 14,21.5 3.5,17.5" fill="#e6e7e4" />
        <polygon points="14.5,10 21.5,5 21,15.5 14,21.5" fill="#d3d7cf" />
        <g fill="none" stroke="#4e9a06" strokeWidth="0.65">
          <polyline points="3,6.5 14.5,10 21.5,5" />
          <line x1="14.5" y1="10" x2="14" y2="21.5" />
          <line x1="6.8" y1="7.7" x2="6.9" y2="18.8" />
          <line x1="10.6" y1="8.8" x2="10.4" y2="20.1" />
          <line x1="16.8" y1="8.3" x2="16.4" y2="19.5" />
          <line x1="19.2" y1="6.7" x2="18.7" y2="17.5" />
          <polyline points="3.2,10.2 14.3,13.8 21.3,8.5" />
          <polyline points="3.3,13.8 14.2,17.6 21.1,12" />
          <line x1="5.4" y1="5" x2="16.8" y2="8.3" />
          <line x1="7.7" y1="3.5" x2="19.2" y2="6.7" />
          <line x1="13.8" y1="3" x2="6.8" y2="7.7" />
          <line x1="17.6" y1="4" x2="10.6" y2="8.8" />
        </g>
      </>
    ),
  },
];
