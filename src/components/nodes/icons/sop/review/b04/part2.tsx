import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 4, Part 2 (icons 20 to 29): built-in Houdini SOP icons under review.
 */
export const BATCH_04_PART_2: OperatorIconDef[] = [
  {
    id: 'sop.grouptransfer',
    label: 'Group Transfer',
    family: 'sop',
    description:
      'Brown limb on the left and green limb on the right, each with a glowing orange-yellow group band, linked by a white transfer arrow.',
    types: ['grouptransfer'],
    icons: ['sop_grouptransfer'],
    refKey: 'SOP_grouptransfer',
    render: () => (
      <>
        {/* Left brown limb with orange group band */}
        <path
          d="M10.5,2.5 C10,6.5 8.5,11 6.5,14.5 L3,19.5 L4.8,21 L6.5,18.5 L6.2,21.5 L8,21.5 L8.8,16 C10.2,12.5 11.5,7.5 11.8,2.5 Z"
          fill="#a8783c"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polygon points="7.5,10 10.6,10.5 9.2,15 6.2,14.2" fill="#ee8624" stroke="#e03228" strokeWidth="0.7" />
        {/* Right green limb with yellow-orange group band */}
        <path
          d="M13.5,2.5 C14,6.5 15.5,11 17.5,14.5 L21,19.5 L19.2,21 L17.5,18.5 L17.8,21.5 L16,21.5 L15.2,16 C13.8,12.5 12.5,7.5 12.2,2.5 Z"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polygon points="16.5,10 13.4,10.5 14.8,15 17.8,14.2" fill="#f2c438" stroke="#ee8624" strokeWidth="0.7" />
        {/* White transfer arrow */}
        <polygon
          points="8.8,12.5 12.5,12.5 12.5,10.8 15.8,13.5 12.5,16.2 12.5,14.5 8.8,14.5"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.name',
    label: 'Name',
    family: 'sop',
    description:
      'Tilted rectangular name badge with a blue header bar reading Hi and a white lower card with two dotted text lines.',
    types: ['name'],
    icons: ['sop_name'],
    refKey: 'SOP_name',
    render: () => (
      <g transform="rotate(-14 12 12)">
        <rect
          x="2.2"
          y="4.5"
          width="19.6"
          height="15"
          rx="1.8"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.2"
        />
        <path
          d="M2.2,6.3 C2.2,5.3 3,4.5 4,4.5 H20 C21,4.5 21.8,5.3 21.8,6.3 V11 H2.2 Z"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="1.1"
        />
        <text
          x="12"
          y="9.4"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="5.2"
          fontWeight="bold"
          fill="#ffffff"
        >
          Hi
        </text>
        <line x1="5" y1="14.2" x2="19" y2="14.2" stroke="#262626" strokeWidth="1.2" strokeDasharray="1.3 1.2" />
        <line x1="5" y1="16.8" x2="16.5" y2="16.8" stroke="#262626" strokeWidth="1.2" strokeDasharray="1.3 1.2" />
      </g>
    ),
  },
  {
    id: 'sop.pointcapture',
    label: 'Point Capture',
    family: 'sop',
    description:
      'Vertical orange organic tube containing a two-segment internal bone chain and yellow captured point spheres along its side.',
    types: ['pointcapture'],
    icons: ['sop_pointcapture'],
    refKey: 'SOP_pointcapture',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-tube`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="60%" stopColor="#ee8624" />
            <stop offset="100%" stopColor="#c25e12" />
          </linearGradient>
        </defs>
        {/* Organic orange tube */}
        <path
          d="M7.5,4.2 C7.8,2.5 16.5,2.5 17,4.8 C17.5,7 14.5,11.5 14.2,15 C14,18 15,20.5 11.8,21.5 C8.5,22 7.5,19.5 7.5,16 C7.5,12.5 8.8,9.5 7.5,4.2 Z"
          fill={`url(#${uid}-tube)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Top ellipse rim */}
        <ellipse cx="12.2" cy="4.4" rx="4.6" ry="1.5" fill="#ffe47a" stroke="#262626" strokeWidth="0.8" />
        {/* Internal bone chain */}
        <g stroke="#262626" strokeWidth="0.65" strokeLinejoin="round">
          <polygon points="11.8,5.8 13,7.2 11.2,12.5 10.2,11.2" fill="#eef2f7" />
          <polygon points="10.8,12.8 12,14 11.4,19.2 10.2,18" fill="#8fc2ff" />
        </g>
        {/* Yellow captured points */}
        <g fill="#f2c438" stroke="#262626" strokeWidth="0.55">
          <circle cx="15.8" cy="8.2" r="0.95" />
          <circle cx="14.4" cy="11.5" r="0.95" />
          <circle cx="13.8" cy="15" r="0.95" />
          <circle cx="13.6" cy="18.2" r="0.95" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.pointcloudiso',
    label: 'Point Cloud Iso',
    family: 'sop',
    description:
      'Scattered grey point spheres at upper-left transitioning into a curved orange iso-surface covered with bright yellow point spheres at lower-right.',
    types: ['pointcloudiso', 'pointcloudsurface'],
    icons: ['sop_pointcloudiso', 'sop_pointcloudsurface'],
    refKey: 'SOP_pointcloudiso',
    render: () => (
      <>
        {/* Scattered grey point cloud */}
        <g fill="#c0c7d1" stroke="#262626" strokeWidth="0.6">
          <circle cx="4.5" cy="6.5" r="1.1" />
          <circle cx="8.2" cy="4.2" r="1.1" />
          <circle cx="12.5" cy="5.2" r="1.1" />
          <circle cx="6.2" cy="10.2" r="1.1" />
          <circle cx="10.2" cy="8.5" r="1.1" />
          <circle cx="14.5" cy="8.2" r="1.1" />
          <circle cx="3.8" cy="14.2" r="1.1" />
          <circle cx="7.8" cy="13.8" r="1.1" />
          <circle cx="5.2" cy="18.2" r="1.1" />
        </g>
        {/* Orange iso-surface */}
        <path
          d="M7.5,21.2 C11,19.5 13.5,13.5 13.8,10.8 C16.2,11.5 19.5,11.2 21.8,9 C20.8,13.5 19.2,17.2 17,19.8 C14.5,22.2 10.5,21.8 7.5,21.2 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Yellow surface points */}
        <g fill="#f2c438" stroke="#262626" strokeWidth="0.55">
          <circle cx="14.2" cy="12.2" r="1" />
          <circle cx="17.8" cy="12" r="1" />
          <circle cx="20.2" cy="10.8" r="1" />
          <circle cx="12.5" cy="15.8" r="1" />
          <circle cx="15.8" cy="15.5" r="1" />
          <circle cx="18.6" cy="15" r="1" />
          <circle cx="10.2" cy="19.5" r="1" />
          <circle cx="13.8" cy="19.2" r="1" />
          <circle cx="16.8" cy="18.4" r="1" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.pointcloudmeasure',
    label: 'Point Cloud Measure',
    family: 'sop',
    description:
      'Dotted grey point-cloud cylinder in the background with a yellow-and-orange tape measure extending its white measuring tape across the front.',
    types: ['pointcloudmeasure'],
    icons: ['sop_pointcloudmeasure'],
    refKey: 'SOP_pointcloudmeasure',
    render: () => (
      <>
        {/* Dotted cylinder point cloud */}
        <ellipse
          cx="11.2"
          cy="6.5"
          rx="6.5"
          ry="2.3"
          fill="none"
          stroke="#5a616b"
          strokeWidth="1.1"
          strokeDasharray="1.1 1.4"
        />
        <path
          d="M4.7,6.5 V15 C4.7,16.5 7.6,17.6 11.2,17.6"
          fill="none"
          stroke="#5a616b"
          strokeWidth="1.1"
          strokeDasharray="1.1 1.4"
        />
        <line x1="17.7" y1="6.5" x2="17.7" y2="11.5" stroke="#5a616b" strokeWidth="1.1" strokeDasharray="1.1 1.4" />
        {/* White pulled-out tape strip */}
        <polygon
          points="7.2,17.5 14.5,19.5 14.5,21.2 7.2,19.2"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Tape measure housing */}
        <path
          d="M14,14.5 C14,12.2 16,11 18.2,11.5 C20.5,12 21.5,14 21.5,16.8 L21.5,20.2 L14,21.2 Z"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <circle cx="17.8" cy="16.2" r="2.3" fill="#ee8624" stroke="#262626" strokeWidth="0.8" />
        <circle cx="17.8" cy="16.2" r="0.9" fill="#f2c438" />
      </>
    ),
  },
  {
    id: 'sop.pointcloudnormal',
    label: 'Point Cloud Normal',
    family: 'sop',
    description:
      'Seven blue point cloud spheres arranged in a ring and center, each projecting a bright red normal line outward.',
    types: ['pointcloudnormal'],
    icons: ['sop_pointcloudnormal'],
    refKey: 'SOP_pointcloudnormal',
    render: () => (
      <>
        {/* Red normal vectors with dark casing */}
        <g stroke="#262626" strokeWidth="2.1" strokeLinecap="round">
          <line x1="6.2" y1="7" x2="2.5" y2="3.8" />
          <line x1="12" y1="5.2" x2="11.2" y2="1.8" />
          <line x1="17.8" y1="7" x2="21.5" y2="3.8" />
          <line x1="12" y1="11.5" x2="8.5" y2="9.5" />
          <line x1="6.2" y1="15.8" x2="2.5" y2="19" />
          <line x1="12" y1="17.8" x2="11.2" y2="21.5" />
          <line x1="17.8" y1="15.8" x2="21.5" y2="19" />
        </g>
        <g stroke="#e03228" strokeWidth="1.15" strokeLinecap="round">
          <line x1="6.2" y1="7" x2="2.5" y2="3.8" />
          <line x1="12" y1="5.2" x2="11.2" y2="1.8" />
          <line x1="17.8" y1="7" x2="21.5" y2="3.8" />
          <line x1="12" y1="11.5" x2="8.5" y2="9.5" />
          <line x1="6.2" y1="15.8" x2="2.5" y2="19" />
          <line x1="12" y1="17.8" x2="11.2" y2="21.5" />
          <line x1="17.8" y1="15.8" x2="21.5" y2="19" />
        </g>
        {/* Blue point spheres */}
        <g fill="#5aa2f2" stroke="#262626" strokeWidth="0.85">
          <circle cx="6.2" cy="7" r="1.45" />
          <circle cx="12" cy="5.2" r="1.45" />
          <circle cx="17.8" cy="7" r="1.45" />
          <circle cx="12" cy="11.5" r="1.45" />
          <circle cx="6.2" cy="15.8" r="1.45" />
          <circle cx="12" cy="17.8" r="1.45" />
          <circle cx="17.8" cy="15.8" r="1.45" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.pointcloudreduce',
    label: 'Point Cloud Reduce',
    family: 'sop',
    description:
      'Dotted blue point-cloud cylinder outline marked with three red X crosses where points are culled.',
    types: ['pointcloudreduce'],
    icons: ['sop_pointcloudreduce'],
    refKey: 'SOP_pointcloudreduce',
    render: () => (
      <>
        <ellipse
          cx="12"
          cy="6.5"
          rx="7.5"
          ry="2.6"
          fill="none"
          stroke="#3672c4"
          strokeWidth="1.2"
          strokeDasharray="1.2 1.5"
        />
        <path
          d="M4.5,6.5 V16 C4.5,17.8 7.8,19.2 12,19.2 C16.2,19.2 19.5,17.8 19.5,16 V6.5"
          fill="none"
          stroke="#3672c4"
          strokeWidth="1.2"
          strokeDasharray="1.2 1.5"
        />
        {/* Red X marks with dark casing */}
        <g stroke="#262626" strokeWidth="2.3" strokeLinecap="round">
          <path d="M16.2,4.5 L19.2,7.5 M19.2,4.5 L16.2,7.5" />
          <path d="M5.8,9.8 L8.8,12.8 M8.8,9.8 L5.8,12.8" />
          <path d="M12.2,16.5 L15.2,19.5 M15.2,16.5 L12.2,19.5" />
        </g>
        <g stroke="#e03228" strokeWidth="1.25" strokeLinecap="round">
          <path d="M16.2,4.5 L19.2,7.5 M19.2,4.5 L16.2,7.5" />
          <path d="M5.8,9.8 L8.8,12.8 M8.8,9.8 L5.8,12.8" />
          <path d="M12.2,16.5 L15.2,19.5 M15.2,16.5 L12.2,19.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.pointdeform',
    label: 'Point Deform',
    family: 'sop',
    description:
      'Bent orange cylinder surrounded by a grey deformation lattice wireframe with light green control points.',
    types: ['pointdeform'],
    icons: ['sop_pointdeform'],
    refKey: 'SOP_pointdeform',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-cyl`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="55%" stopColor="#ee8624" />
            <stop offset="100%" stopColor="#c25e12" />
          </linearGradient>
        </defs>
        {/* Bent orange cylinder */}
        <path
          d="M10.5,2.5 C15.8,6.8 19.5,13 19.8,19.8 C19.8,21.2 17.5,22.2 14.8,22.2 C12,22.2 9.8,21.2 9.8,19.8 C9.8,16.5 8.8,12.5 3,8.2 Z"
          fill={`url(#${uid}-cyl)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <ellipse
          cx="6.8"
          cy="5.4"
          rx="4.6"
          ry="1.8"
          transform="rotate(-36 6.8 5.4)"
          fill="#ffe47a"
          stroke="#262626"
          strokeWidth="0.9"
        />
        {/* Grey lattice cage lines */}
        <g fill="none" stroke="#89929e" strokeWidth="0.7" strokeDasharray="1.3 1">
          <path d="M12,2 C17.5,6.5 21,13 21.2,20.2" />
          <path d="M2.2,9.2 C8,13.5 8.5,16.8 8.5,20.5" />
          <ellipse cx="13.5" cy="12.5" rx="5.5" ry="2" transform="rotate(-20 13.5 12.5)" />
        </g>
        {/* Lattice control points */}
        <g fill="#58c848" stroke="#262626" strokeWidth="0.55">
          <circle cx="11.5" cy="2.5" r="0.95" />
          <circle cx="17.8" cy="10.2" r="0.95" />
          <circle cx="8.5" cy="14" r="0.95" />
          <circle cx="20.5" cy="19.5" r="0.95" />
          <circle cx="9.2" cy="20.2" r="0.95" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.pointgenerate',
    label: 'Point Generate',
    family: 'sop',
    description:
      'Four grey polygon quads arranged in a 2x2 grid, each with bright orange point spheres generated at its corners.',
    types: ['pointgenerate'],
    icons: ['sop_pointgenerate'],
    refKey: 'SOP_pointgenerate',
    render: () => (
      <>
        {/* Four grey quads */}
        <g fill="#c0c7d1" stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <polygon points="4.2,4.5 9.2,4 9.8,9.2 4.8,9.8" />
          <polygon points="13.8,5.2 18.8,4.6 19.4,9.8 14.4,10.4" />
          <polygon points="4.5,14.2 9.5,13.6 10.1,18.8 5.1,19.4" />
          <polygon points="14.2,14.8 19.2,14.2 19.8,19.4 14.8,20" />
        </g>
        {/* Orange corner points */}
        <g fill="#ee8624" stroke="#262626" strokeWidth="0.6">
          <circle cx="4.2" cy="4.5" r="1.15" />
          <circle cx="9.2" cy="4" r="1.15" />
          <circle cx="9.8" cy="9.2" r="1.15" />
          <circle cx="4.8" cy="9.8" r="1.15" />

          <circle cx="13.8" cy="5.2" r="1.15" />
          <circle cx="18.8" cy="4.6" r="1.15" />
          <circle cx="19.4" cy="9.8" r="1.15" />
          <circle cx="14.4" cy="10.4" r="1.15" />

          <circle cx="4.5" cy="14.2" r="1.15" />
          <circle cx="9.5" cy="13.6" r="1.15" />
          <circle cx="10.1" cy="18.8" r="1.15" />
          <circle cx="5.1" cy="19.4" r="1.15" />

          <circle cx="14.2" cy="14.8" r="1.15" />
          <circle cx="19.2" cy="14.2" r="1.15" />
          <circle cx="19.8" cy="19.4" r="1.15" />
          <circle cx="14.8" cy="20" r="1.15" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.pointjitter',
    label: 'Point Jitter',
    family: 'sop',
    description:
      'Three-tone isometric grey subdivided cube with jaggedly jittered vertices and crumpled wireframe edges.',
    types: ['pointjitter'],
    icons: ['sop_pointjitter'],
    refKey: 'SOP_pointjitter',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          {/* Top face */}
          <polygon
            points="11.5,2 16.5,3.8 21.8,5.5 17.5,9 11.8,9.8 6.2,8 2.2,6.2 7.2,4.5"
            fill="#eef2f7"
          />
          {/* Left face */}
          <polygon
            points="2.2,6.2 6.2,8 11.8,9.8 11.8,15 13,18.8 11.8,22 6.5,20.5 3.5,16.5 3,11.5"
            fill="#c0c7d1"
          />
          {/* Right face */}
          <polygon
            points="11.8,9.8 17.5,9 21.8,5.5 22,12 20.8,18.2 16.8,20.2 11.8,22 13,18.8 11.8,15"
            fill="#89929e"
          />
        </g>
        {/* Jittered internal mesh lines */}
        <g fill="none" stroke="#262626" strokeWidth="0.6" strokeLinejoin="round">
          <polyline points="7.2,4.5 11.2,6.5 17.5,9 16.2,14.8 16.8,20.2" />
          <polyline points="16.5,3.8 11.2,6.5 6.2,8 7.5,14.2 6.5,20.5" />
          <polyline points="3,11.5 7.5,14.2 11.8,15 16.2,14.8 22,12" />
        </g>
      </>
    ),
  },
];
