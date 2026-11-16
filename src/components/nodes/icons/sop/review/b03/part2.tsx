import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_03_PART_2: OperatorIconDef[] = [
  {
    id: 'sop.stash',
    label: 'Stash',
    family: 'sop',
    description:
      'Angled 3D floppy disk cartridge in grey with a silver shutter and white label.',
    types: ['stash'],
    icons: ['sop_stash'],
    refKey: 'SOP_stash',
    render: () => (
      <>
        {/* 3D floppy disk body */}
        <polygon
          points="3.5,2.2 20.8,1.8 19.6,19.2 5.8,22.0 3.8,16.5"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Recessed white label area */}
        <polygon
          points="6.2,4.2 19.2,3.8 18.4,17.5 7.4,19.6"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        {/* Metal shutter at bottom-left */}
        <polygon
          points="8.8,12.8 15.8,11.6 15.4,18.1 8.8,19.3"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        {/* Label lines */}
        <path
          d="M 8.5 6.8 L 17.0 6.4 M 8.5 9.2 L 15.5 8.8"
          fill="none"
          stroke="#5a616b"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.stitch',
    label: 'Stitch',
    family: 'sop',
    description:
      'Two dark curved edges pulled together across the middle by red stitch arcs and orange arrows.',
    types: ['stitch'],
    icons: ['sop_stitch'],
    refKey: 'SOP_stitch',
    render: () => (
      <>
        {/* Left and right curved edges */}
        <path
          d="M 1.8 19.5 C 2.8 16.5 4.5 14.5 6.5 13.0 M 22.2 19.5 C 21.2 16.5 19.5 14.5 17.5 13.0"
          fill="none"
          stroke="#262626"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Red stitch bridge arcs */}
        <path
          d="M 5.0 14.5 C 9.2 11.2 14.8 11.2 19.0 14.5 M 3.2 17.2 C 8.5 13.8 15.5 13.8 20.8 17.2"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Inward orange-red pull arrows */}
        <polygon
          points="10.8,8.5 6.8,6.5 7.6,10.5"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="13.2,8.5 17.2,6.5 16.4,10.5"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.stroke',
    label: 'Stroke',
    family: 'sop',
    description:
      'Sweeping blue paintbrush stroke curving from upper left to lower right.',
    types: ['stroke'],
    icons: ['sop_stroke'],
    refKey: 'SOP_stroke',
    render: () => (
      <>
        {/* Main blue brush stroke silhouette */}
        <path
          d="M 2.2 10.2 C 1.8 7.5 3.4 5.2 6.0 5.5 C 9.8 6.0 13.5 8.5 17.2 10.8 C 19.5 12.2 21.8 13.8 22.2 15.8 C 20.2 15.6 18.8 14.8 17.6 15.2 C 19.2 16.4 21.2 17.2 21.6 18.6 C 18.5 18.4 15.5 16.8 12.5 15.0 C 8.8 12.8 5.2 11.8 2.2 10.2 Z"
          fill="#3672c4"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Lighter blue highlight streak inside brush stroke */}
        <path
          d="M 4.5 7.8 C 8.5 8.4 13.0 11.0 17.5 13.8"
          fill="none"
          stroke="#8fc2ff"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.surfacedeform',
    label: 'Surface Deform',
    family: 'sop',
    description:
      'Green driver surface on the left deforming a blue 3D mesh on the right with a red arrow.',
    types: ['surfacedeform'],
    icons: ['sop_surfacedeform'],
    refKey: 'SOP_surfacedeform',
    render: () => (
      <>
        {/* Green driver surface patch on left */}
        <path
          d="M 2.0 14.5 C 3.2 9.5 6.2 6.2 9.5 6.8 L 10.5 17.8 C 7.2 18.5 3.8 17.2 2.0 14.5 Z"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Deformed blue 3D organic mesh on right */}
        <path
          d="M 12.5 7.5 C 13.2 4.2 16.8 3.5 19.2 5.8 C 20.8 7.4 19.8 10.2 21.2 12.0 C 22.4 13.5 21.2 15.6 19.4 16.2 C 19.0 18.5 17.2 20.5 14.8 19.8 C 12.2 19.0 11.5 13.2 12.5 7.5 Z"
          fill="#3672c4"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Light blue highlight on organic mesh */}
        <path
          d="M 14.5 9.8 C 16.2 9.0 18.2 9.5 18.8 11.2"
          fill="none"
          stroke="#8fc2ff"
          strokeWidth="1.0"
          strokeLinecap="round"
        />
        {/* Red deform arrow in center */}
        <polygon
          points="14.2,12.2 9.8,9.8 10.4,14.6"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.switchif',
    label: 'Switch-If',
    family: 'sop',
    description:
      'Vertical grey signpost with angled blue and green directional blades and a white question mark.',
    types: ['switchif'],
    icons: ['sop_switchif'],
    refKey: 'SOP_switchif',
    render: () => (
      <>
        {/* Vertical post */}
        <rect
          x="9.0"
          y="2.0"
          width="6.0"
          height="20.0"
          rx="0.6"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Upper-left angled blade (blue) */}
        <polygon
          points="2.0,9.5 4.2,5.5 21.0,2.5 21.0,8.2 3.5,11.2"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Lower-right angled blade (green with question mark) */}
        <polygon
          points="2.5,10.5 19.5,14.0 22.0,17.8 18.8,21.2 2.5,16.8"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Question mark on green blade */}
        <text
          x="11.8"
          y="18.2"
          textAnchor="middle"
          fontSize="6.8"
          fontWeight="800"
           fontFamily="sans-serif"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="0.45"
          paintOrder="stroke"
        >
          ?
        </text>
      </>
    ),
  },
  {
    id: 'sop.tangentfield',
    label: 'Tangent Field',
    family: 'sop',
    description:
      'Angled 3D grey block with an elliptical control ring and red tangent flow arrows across its top.',
    types: ['tangentfield'],
    icons: ['sop_tangentfield'],
    refKey: 'SOP_tangentfield',
    render: () => (
      <>
        {/* 3D curved wedge block */}
        <path
          d="M 21.8 3.8 L 2.0 11.5 V 17.5 C 2.0 19.5 6.8 21.8 12.8 21.2 C 16.2 20.8 18.2 19.2 19.4 16.8 L 21.8 3.8 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Top elliptical tangent control ring */}
        <ellipse
          cx="12.8"
          cy="9.2"
          rx="4.6"
          ry="2.5"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.85"
        />
        {/* Red tangent field arrows */}
        <polygon points="10.2,8.2 12.8,7.4 11.8,9.6" fill="#e03228" />
        <polygon points="14.5,10.2 17.0,9.2 15.8,11.4" fill="#e03228" />
        <polygon points="6.2,13.5 9.2,12.5 8.0,15.0" fill="#e03228" />
        <polygon points="11.5,14.8 14.5,13.8 13.2,16.2" fill="#e03228" />
        <polygon points="7.5,17.8 10.5,16.8 9.2,19.2" fill="#e03228" />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_capybara',
    label: 'Test Geometry: Capybara',
    family: 'sop',
    description:
      'Warm brown capybara in side profile with a blunt rectangular snout and small ear.',
    types: ['testgeometry_capybara'],
    icons: ['sop_testgeometry_capybara'],
    refKey: 'SOP_testgeometry_capybara',
    render: () => (
      <>
        {/* Capybara body and blunt head silhouette */}
        <path
          d="M 3.2 19.8 L 4.0 15.2 C 3.8 11.5 5.5 8.5 8.8 7.8 L 12.8 6.8 C 13.5 5.2 14.8 4.2 16.2 4.5 C 18.2 4.5 20.8 5.2 21.6 6.8 C 22.2 8.2 22.0 10.5 20.8 11.5 C 19.5 12.2 18.0 12.0 17.2 13.2 L 16.8 19.8 H 14.4 L 14.0 15.8 C 11.8 16.2 9.2 16.2 7.2 15.6 L 6.2 19.8 Z"
          fill="#866c4d"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Lighter brown back/cheek highlight */}
        <path
          d="M 6.0 11.5 C 8.0 9.2 11.5 8.2 15.0 7.8 C 17.5 7.5 19.5 7.8 20.2 9.2"
          fill="none"
          stroke="#a99d91"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Small ear and eye */}
        <circle cx="15.2" cy="5.4" r="1.1" fill="#5b4329" stroke="#262626" strokeWidth="0.65" />
        <circle cx="18.2" cy="7.2" r="0.7" fill="#262626" />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_crag',
    label: 'Test Geometry: Crag',
    family: 'sop',
    description:
      'Dark rocky golem bust with glowing green cracks between its stone boulders.',
    types: ['testgeometry_crag'],
    icons: ['sop_testgeometry_crag'],
    refKey: 'SOP_testgeometry_crag',
    render: () => (
      <>
        {/* Crag rocky silhouette */}
        <polygon
          points="5.8,3.2 10.5,2.2 14.8,3.5 19.5,6.2 21.2,11.8 19.2,16.5 17.8,21.5 6.8,21.5 4.2,16.2 2.8,10.5"
          fill="#58554e"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Lighter rock plates */}
        <polygon
          points="6.5,4.5 10.5,3.5 13.2,6.5 8.5,8.2"
          fill="#8c8476"
        />
        <polygon
          points="14.2,5.5 18.5,7.2 19.2,11.5 14.5,10.8"
          fill="#827b6e"
        />
        {/* Glowing neon-green energy seams */}
        <path
          d="M 10.5 3.2 L 12.2 8.5 L 8.2 11.5 L 9.8 16.8 L 7.8 21.0 M 12.2 8.5 L 16.8 11.5 L 15.2 16.5 L 17.2 21.0 M 4.2 11.2 L 8.2 11.5"
          fill="none"
          stroke="#58c848"
          strokeWidth="0.95"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_otto',
    label: 'Test Geometry: Otto',
    family: 'sop',
    description:
      'Round-bellied clay character with outstretched arms wearing purple shorts.',
    types: ['testgeometry_otto'],
    icons: ['sop_testgeometry_otto'],
    refKey: 'SOP_testgeometry_otto',
    render: () => (
      <>
        {/* Otto clay body silhouette */}
        <circle
          cx="12.0"
          cy="5.2"
          r="2.6"
          fill="#ca8b6f"
          stroke="#262626"
          strokeWidth="0.9"
        />
        <path
          d="M 4.2 11.2 L 8.5 8.2 H 15.5 L 19.8 11.2 L 18.4 13.0 L 15.8 11.0 C 16.5 13.5 16.2 16.2 15.0 17.5 L 14.8 21.5 H 12.6 L 12.0 18.2 L 11.4 21.5 H 9.2 L 9.0 17.5 C 7.8 16.2 7.5 13.5 8.2 11.0 L 5.6 13.0 Z"
          fill="#af7763"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Purple shorts */}
        <path
          d="M 8.2 14.5 H 15.8 L 15.2 18.5 H 12.4 L 12.0 16.8 L 11.6 18.5 H 8.8 Z"
          fill="#c975fb"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_pighead',
    label: 'Test Geometry: Pig Head',
    family: 'sop',
    description:
      'Terracotta pig head in three-quarter left profile with upright ears and a flat snout.',
    types: ['testgeometry_pighead'],
    icons: ['sop_testgeometry_pighead'],
    refKey: 'SOP_testgeometry_pighead',
    render: () => (
      <>
        {/* Pig head silhouette */}
        <path
          d="M 3.2 12.5 C 2.2 11.2 3.2 9.5 5.2 8.5 C 6.2 6.8 7.5 5.8 9.2 5.2 L 9.8 2.2 C 11.2 2.0 12.2 3.8 13.2 5.2 C 15.5 5.8 18.2 6.2 20.5 7.2 C 21.2 8.5 19.2 9.5 18.8 10.5 C 20.5 12.2 21.2 14.8 19.8 17.2 C 18.2 19.5 14.2 21.2 10.2 21.2 C 7.2 21.2 5.5 18.8 5.2 16.2 C 4.5 14.8 4.0 13.6 3.2 12.5 Z"
          fill="#956358"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Snout disk and ear inner crease */}
        <ellipse
          cx="4.5"
          cy="11.2"
          rx="1.4"
          ry="2.0"
          transform="rotate(-18 4.5 11.2)"
          fill="#98827c"
          stroke="#262626"
          strokeWidth="0.75"
        />
        <path
          d="M 8.5 10.2 C 9.5 9.5 11.0 9.8 11.5 10.8 M 14.5 8.5 L 18.5 8.2"
          fill="none"
          stroke="#2f1916"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </>
    ),
  },
];
