import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_03_PART_5: OperatorIconDef[] = [
  {
    id: 'sop.trace',
    label: 'Trace',
    family: 'sop',
    description:
      'Tilted grey image card with a dark silhouette in back and a 3D orange-red traced shape lifted in front.',
    types: ['trace'],
    icons: ['sop_trace'],
    refKey: 'SOP_trace',
    render: () => (
      <>
        {/* Tilted image card in back */}
        <polygon
          points="1.8,8.5 16.5,3.2 21.2,16.2 6.5,21.5"
          fill="#d0d6e0"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Dark silhouette printed on card */}
        <circle cx="9.8" cy="9.8" r="2.2" fill="#5a616b" />
        <path
          d="M 6.8 16.8 L 8.0 12.2 H 12.2 L 14.5 14.5 Z"
          fill="#5a616b"
        />
        {/* Extruded 3D orange-red traced figure in front */}
        <circle
          cx="13.5"
          cy="8.5"
          r="2.4"
          fill="#ffb066"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path
          d="M 9.8 17.5 L 11.2 11.5 H 16.0 L 19.5 14.5 L 14.8 16.5 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.trail',
    label: 'Trail',
    family: 'sop',
    description:
      'Orange sphere at upper right with a curved amber trail of ghosted spheres sweeping from lower left.',
    types: ['trail'],
    icons: ['sop_trail'],
    refKey: 'SOP_trail',
    render: () => (
      <>
        {/* Sweeping motion trail ribbon */}
        <path
          d="M 2.0 19.5 C 7.5 13.5 12.2 6.5 18.8 3.5 L 20.5 8.2 C 14.2 10.8 9.8 16.5 5.2 21.8 Z"
          fill="#ffb066"
          fillOpacity="0.65"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Ghost trail spheres */}
        <circle
          cx="4.8"
          cy="18.2"
          r="2.5"
          fill="#ffb066"
          fillOpacity="0.65"
          stroke="#262626"
          strokeWidth="0.7"
        />
        <circle
          cx="9.6"
          cy="13.2"
          r="2.6"
          fill="#ee8624"
          fillOpacity="0.75"
          stroke="#262626"
          strokeWidth="0.75"
        />
        <circle
          cx="14.5"
          cy="8.6"
          r="2.7"
          fill="#ee8624"
          fillOpacity="0.85"
          stroke="#262626"
          strokeWidth="0.85"
        />
        {/* Leading solid orange sphere */}
        <circle
          cx="19.2"
          cy="5.8"
          r="2.9"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.0"
        />
        <circle cx="18.2" cy="4.8" r="0.85" fill="#ffffff" />
      </>
    ),
  },
  {
    id: 'sop.xformaxis',
    label: 'Transform Axis',
    family: 'sop',
    description:
      'Tilted grey diamond plane with red transform axes and curved red rotation arcs.',
    types: ['xformaxis'],
    icons: ['sop_xformaxis'],
    refKey: 'SOP_xformaxis',
    render: () => (
      <>
        {/* Tilted grey diamond plane */}
        <polygon
          points="5.2,9.5 12.2,6.2 19.2,9.5 12.2,12.8"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Vertical axis arrow */}
        <path
          d="M 12.2 2.2 V 9.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <polygon
          points="12.2,1.8 14.0,4.8 10.4,4.8"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        {/* Curved red rotation arcs underneath */}
        <path
          d="M 3.5 9.8 C 6.5 17.5 15.5 21.0 20.5 17.5 M 3.5 17.5 C 8.5 21.0 17.5 17.5 20.5 9.8"
          fill="none"
          stroke="#262626"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M 3.5 9.8 C 6.5 17.5 15.5 21.0 20.5 17.5 M 3.5 17.5 C 8.5 21.0 17.5 17.5 20.5 9.8"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.xformbyattrib',
    label: 'Transform by Attribute',
    family: 'sop',
    description:
      'Wireframe sphere with a green outer ring, blue meridian arcs, and a red horizontal axis arrow.',
    types: ['xformbyattrib'],
    icons: ['sop_xformbyattrib'],
    refKey: 'SOP_xformbyattrib',
    render: () => (
      <>
        {/* Green outer sphere ring with dark casing */}
        <circle
          cx="11.5"
          cy="12.0"
          r="9.0"
          fill="#eef2f7"
          fillOpacity="0.25"
          stroke="#262626"
          strokeWidth="1.9"
        />
        <circle
          cx="11.5"
          cy="12.0"
          r="9.0"
          fill="none"
          stroke="#58c848"
          strokeWidth="1.05"
        />
        {/* Blue equator and meridian arcs */}
        <ellipse
          cx="11.5"
          cy="12.0"
          rx="9.0"
          ry="4.2"
          fill="none"
          stroke="#3672c4"
          strokeWidth="0.9"
        />
        <ellipse
          cx="11.5"
          cy="12.0"
          rx="4.2"
          ry="9.0"
          fill="none"
          stroke="#3672c4"
          strokeWidth="0.9"
        />
        {/* Red horizontal axis arrow */}
        <path
          d="M 11.5 12.0 H 21.5"
          fill="none"
          stroke="#262626"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 11.5 12.0 H 21.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* Blue vertical axis line */}
        <path
          d="M 11.5 12.0 V 21.5"
          fill="none"
          stroke="#3672c4"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.triangulate2d',
    label: 'Triangulate2D',
    family: 'sop',
    description:
      'Curved 2D orange sheet subdivided into triangles by dark brown mesh edges.',
    types: ['triangulate2d'],
    icons: ['sop_triangulate2d', 'sop_triangulate2d-2.0', 'sop_triangulate2d-3.0'],
    refKey: 'SOP_triangulate2d',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-tri`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="100%" stopColor="#ee8624" />
          </linearGradient>
        </defs>
        {/* Curved 2D orange sheet */}
        <path
          d="M 2.2 2.5 C 7.5 4.5 16.5 4.5 21.8 2.0 L 21.8 20.2 C 16.5 22.5 7.5 22.5 2.8 20.2 Z"
          fill={`url(#${uid}-tri)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Horizontal, vertical, and diagonal triangulation edges */}
        <path
          d="M 2.4 8.5 C 7.5 10.5 16.5 10.5 21.8 8.0 M 2.6 14.5 C 7.5 16.5 16.5 16.5 21.8 14.0 M 8.8 3.6 V 21.4 M 15.2 3.6 V 21.4 M 2.2 2.5 L 8.8 9.6 L 15.2 15.6 L 21.8 20.2 M 8.8 3.6 L 15.2 9.6 L 21.8 14.0 M 2.4 8.5 L 8.8 15.6 L 15.2 21.4"
          fill="none"
          stroke="#7e3b08"
          strokeWidth="0.65"
        />
      </>
    ),
  },
  {
    id: 'sop.tribez',
    label: 'TriBezier',
    family: 'sop',
    description:
      'Curved 3D grey triangular Bezier patch with internal curved isolines.',
    types: ['tribez'],
    icons: ['sop_tribez'],
    refKey: 'SOP_tribez',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-bez`} cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="65%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </radialGradient>
        </defs>
        {/* Curved triangular Bezier patch */}
        <path
          d="M 19.5 2.0 C 9.2 3.5 3.5 8.8 1.8 15.5 C 4.8 19.8 10.2 21.8 17.2 22.2 C 16.0 15.5 16.2 7.2 19.5 2.0 Z"
          fill={`url(#${uid}-bez)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Internal curved Bezier isolines */}
        <path
          d="M 9.8 5.8 C 8.2 10.5 9.4 17.2 11.2 20.8 M 9.8 5.8 C 11.2 7.2 14.0 8.5 16.6 8.5 M 4.5 11.0 C 6.8 14.2 13.5 16.0 16.2 16.0 M 5.5 18.2 C 7.0 15.8 14.2 9.8 16.6 8.5"
          fill="none"
          stroke="#5a616b"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.tridivide',
    label: 'TriDivide',
    family: 'sop',
    description:
      'Large triangle subdivided from its center into three shaded orange triangles.',
    types: ['tridivide'],
    icons: ['sop_tridivide'],
    refKey: 'SOP_tridivide',
    render: () => (
      <>
        {/* Offset shadow triangle */}
        <polygon
          points="2.8,15.5 22.2,22.2 19.0,3.8"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Top-left subdivided light-orange triangle */}
        <polygon
          points="1.8,13.0 11.8,8.2 16.8,1.8"
          fill="#ffb066"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Bottom subdivided mid-orange triangle */}
        <polygon
          points="1.8,13.0 11.8,8.2 20.8,20.2"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Right subdivided dark-orange triangle */}
        <polygon
          points="20.8,20.2 11.8,8.2 16.8,1.8"
          fill="#c25e12"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.udimlist',
    label: 'UDIM List',
    family: 'sop',
    description:
      'Two-by-two grid of yellow, blue, purple, and coral UDIM tiles.',
    types: ['udimlist'],
    icons: ['sop_udimlist'],
    refKey: 'SOP_udimlist',
    render: () => (
      <>
        {/* Top-left yellow tile */}
        <rect
          x="2.2"
          y="2.2"
          width="9.8"
          height="9.8"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Top-right blue tile */}
        <rect
          x="12.0"
          y="2.2"
          width="9.8"
          height="9.8"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Bottom-left purple tile */}
        <rect
          x="2.2"
          y="12.0"
          width="9.8"
          height="9.8"
          fill="#a34999"
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Bottom-right coral-red tile */}
        <rect
          x="12.0"
          y="12.0"
          width="9.8"
          height="9.8"
          fill="#fb6767"
          stroke="#262626"
          strokeWidth="0.95"
        />
      </>
    ),
  },
  {
    id: 'sop.unix',
    label: 'Unix Command',
    family: 'sop',
    description:
      'Grey terminal monitor with a dark green phosphor screen and bright green command prompt.',
    types: ['unix'],
    icons: ['sop_unix'],
    refKey: 'SOP_unix',
    render: () => (
      <>
        {/* Monitor outer casing */}
        <rect
          x="1.8"
          y="2.8"
          width="20.4"
          height="18.4"
          rx="2.4"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Dark green phosphor screen */}
        <rect
          x="4.0"
          y="5.0"
          width="16.0"
          height="13.2"
          rx="1.0"
          fill="#1f2816"
          stroke="#262626"
          strokeWidth="0.85"
        />
        {/* Bright green command prompt `>_` */}
        <path
          d="M 6.5 8.2 L 9.2 10.2 L 6.5 12.2 M 10.5 12.2 H 14.2"
          fill="none"
          stroke="#58c848"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
