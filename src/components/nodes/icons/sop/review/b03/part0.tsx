import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_03_PART_0: OperatorIconDef[] = [
  {
    id: 'sop.shotsculpt',
    label: 'Shot Sculpt',
    family: 'sop',
    description:
      'Teal sculpted bust with a red sculpt adjustment curve and two blue shot timeline bars at the bottom.',
    types: ['shotsculpt'],
    icons: ['sop_shotsculpt'],
    refKey: 'SOP_shotsculpt',
    render: () => (
      <>
        {/* Left teal sculpted bust */}
        <circle
          cx="8.2"
          cy="6.5"
          r="2.6"
          fill="#a0dbce"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path
          d="M 3.2 16.5 C 3.2 12.6 5.4 10.5 8.2 10.5 C 11.0 10.5 13.2 12.6 13.2 16.5 Z"
          fill="#77a69d"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Right ghosted/sculpted pose bust */}
        <circle
          cx="16.2"
          cy="5.8"
          r="2.4"
          fill="#caebe4"
          stroke="#262626"
          strokeWidth="0.85"
        />
        <path
          d="M 12.0 16.5 C 12.2 12.3 14.0 10.0 16.5 10.0 C 19.0 10.0 20.8 12.3 21.0 16.5 Z"
          fill="#bce6dc"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Sculpt delta arc */}
        <path
          d="M 9.8 5.2 Q 12.5 2.6 14.8 4.4"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Shot timeline bars at bottom */}
        <rect
          x="2.2"
          y="18.4"
          width="9.2"
          height="3.0"
          rx="0.7"
          fill="#729fcf"
          stroke="#262626"
          strokeWidth="0.9"
        />
        <rect
          x="12.6"
          y="18.4"
          width="9.2"
          height="3.0"
          rx="0.7"
          fill="#3672c4"
          stroke="#262626"
          strokeWidth="0.9"
        />
      </>
    ),
  },
  {
    id: 'sop.smooth',
    label: 'Smooth',
    family: 'sop',
    description:
      'Grey mesh transitioning from jagged peaks on the left to a smooth bell curve on the right with a red top profile.',
    types: ['smooth'],
    icons: ['sop_smooth', 'sop_smooth-2.0'],
    refKey: 'SOP_smooth',
    render: () => (
      <>
        {/* Shaded mesh body */}
        <path
          d="M 2.0 12.5 L 4.2 6.8 L 6.8 10.2 L 9.4 5.8 L 11.8 8.2 C 13.8 5.0 16.2 5.0 18.2 8.5 C 19.6 11.2 20.8 14.2 22.0 15.2 L 14.5 18.5 L 11.5 20.5 L 8.2 19.2 L 5.2 15.8 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Internal wireframe lines */}
        <path
          d="M 4.2 6.8 L 8.2 19.2 M 9.4 5.8 L 11.5 20.5 M 15.5 6.0 C 14.8 10.5 14.6 14.5 14.5 18.5 M 5.2 15.8 L 11.8 12.2 C 14.5 10.8 17.5 11.2 20.2 13.0"
          fill="none"
          stroke="#5a616b"
          strokeWidth="0.65"
        />
        {/* Bold red top profile curve (jagged to smooth) */}
        <path
          d="M 2.0 12.5 L 4.2 6.8 L 6.8 10.2 L 9.4 5.8 L 11.8 8.2 C 13.8 5.0 16.2 5.0 18.2 8.5 C 19.6 11.2 20.8 14.2 22.0 15.2"
          fill="none"
          stroke="#262626"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 2.0 12.5 L 4.2 6.8 L 6.8 10.2 L 9.4 5.8 L 11.8 8.2 C 13.8 5.0 16.2 5.0 18.2 8.5 C 19.6 11.2 20.8 14.2 22.0 15.2"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.softpeak',
    label: 'Soft Peak',
    family: 'sop',
    description:
      'Mesh surface with a warm orange-red soft peak pulled upward by a central arrow.',
    types: ['softpeak'],
    icons: ['sop_softpeak'],
    refKey: 'SOP_softpeak',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-peak`} cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#e03228" />
            <stop offset="45%" stopColor="#ee8624" />
            <stop offset="100%" stopColor="#c0c7d1" />
          </radialGradient>
        </defs>
        {/* Upward pull arrow */}
        <path
          d="M 12.0 2.0 L 15.2 5.2 H 13.3 V 9.2 H 10.7 V 5.2 H 8.8 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Soft peaked mesh surface */}
        <path
          d="M 2.0 15.2 C 6.2 14.0 8.8 8.2 12.0 8.2 C 15.2 8.2 17.8 14.0 22.0 15.2 L 12.0 20.8 Z"
          fill={`url(#${uid}-peak)`}
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Internal mesh contour lines */}
        <path
          d="M 6.5 17.7 C 9.0 14.0 10.5 10.5 12.0 10.5 C 13.5 10.5 15.0 14.0 17.5 17.7 M 5.2 14.2 Q 12.0 17.2 18.8 14.2 M 12.0 8.2 V 20.8"
          fill="none"
          stroke="#262626"
          strokeWidth="0.6"
          strokeOpacity="0.65"
        />
      </>
    ),
  },
  {
    id: 'sop.solidify',
    label: 'Solidify',
    family: 'sop',
    description:
      'Grey 3D shell with a cutaway opening revealing red inner walls being solidified.',
    types: ['solidify'],
    icons: ['sop_solidify'],
    refKey: 'SOP_solidify',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-shell`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#5a616b" />
          </linearGradient>
        </defs>
        {/* Outer rounded 3D shell */}
        <ellipse
          cx="12.0"
          cy="12.5"
          rx="10.0"
          ry="7.8"
          fill={`url(#${uid}-shell)`}
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Red cutaway interior cavity */}
        <ellipse
          cx="12.2"
          cy="10.8"
          rx="5.5"
          ry="3.6"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.9"
        />
        {/* Solidified facet wedges inside */}
        <path
          d="M 6.8 11.2 Q 9.5 8.2 12.0 10.8 L 12.0 14.4 Q 8.5 14.0 6.8 11.2 Z"
          fill="#ffb066"
          stroke="#262626"
          strokeWidth="0.65"
        />
        <path
          d="M 12.0 7.2 V 14.4 M 8.5 8.2 L 15.8 13.2"
          fill="none"
          stroke="#262626"
          strokeWidth="0.65"
        />
      </>
    ),
  },
  {
    id: 'sop.solver',
    label: 'Solver',
    family: 'sop',
    description:
      'Pink stylized brain in side profile with a bright yellow-gold spark at the top.',
    types: ['solver'],
    icons: ['sop_solver'],
    refKey: 'SOP_solver',
    render: () => (
      <>
        {/* Pink brain silhouette */}
        <path
          d="M 6.8 17.5 C 4.2 17.5 2.5 15.6 2.8 13.2 C 2.4 10.8 4.0 8.5 6.5 8.0 C 7.8 6.2 10.8 5.5 13.8 6.0 C 17.2 6.4 20.2 8.6 20.8 11.5 C 21.6 14.0 20.2 16.8 17.6 17.6 C 15.8 18.2 14.2 19.2 12.2 19.2 C 10.2 19.2 8.8 17.6 6.8 17.5 Z"
          fill="#f4b1b3"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Brain gyri/sulci folds */}
        <path
          d="M 6.5 11.2 C 8.5 10.2 10.8 11.0 12.0 12.8 M 10.2 8.2 C 12.8 8.0 15.2 9.4 16.0 11.6 M 7.2 14.5 C 9.8 14.2 12.2 15.5 14.5 14.8 M 14.2 12.2 C 16.2 12.0 17.8 13.2 18.2 14.8"
          fill="none"
          stroke="#8a3b42"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        {/* Yellow solver spark / idea star at top-left */}
        <path
          d="M 9.5 2.2 L 10.5 4.5 L 12.8 5.2 L 10.5 6.0 L 9.5 8.2 L 8.5 6.0 L 6.2 5.2 L 8.5 4.5 Z"
          fill="#ffe47a"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.spiral',
    label: 'Spiral',
    family: 'sop',
    description:
      'Archimedean spiral winding outward from the center in orange and light grey.',
    types: ['spiral'],
    icons: ['sop_spiral'],
    refKey: 'SOP_spiral',
    render: () => (
      <>
        {/* Dark outer casing */}
        <path
          d="M 11.8 12.2 C 11.2 11.5 11.8 10.2 12.8 10.4 C 14.4 10.8 15.0 12.8 14.0 14.2 C 12.5 16.2 9.4 16.2 7.8 14.2 C 5.8 11.6 6.4 7.6 9.2 5.8 C 12.6 3.5 17.4 4.8 19.2 8.4 C 21.4 12.6 19.4 18.2 14.8 20.0 C 9.6 22.0 3.6 19.2 2.4 13.6 C 1.4 8.6 4.0 3.6 8.8 2.2"
          fill="none"
          stroke="#262626"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        {/* Orange spiral curve */}
        <path
          d="M 11.8 12.2 C 11.2 11.5 11.8 10.2 12.8 10.4 C 14.4 10.8 15.0 12.8 14.0 14.2 C 12.5 16.2 9.4 16.2 7.8 14.2 C 5.8 11.6 6.4 7.6 9.2 5.8 C 12.6 3.5 17.4 4.8 19.2 8.4 C 21.4 12.6 19.4 18.2 14.8 20.0 C 9.6 22.0 3.6 19.2 2.4 13.6 C 1.4 8.6 4.0 3.6 8.8 2.2"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.align',
    label: 'Spline Align',
    family: 'sop',
    description:
      'Two 3D spline blocks aligned along a highlighted red vertical seam.',
    types: ['align'],
    icons: ['sop_align'],
    refKey: 'SOP_align',
    render: () => (
      <>
        {/* Left spline block */}
        <polygon
          points="2.2,8.5 8.8,6.5 14.5,8.2 7.8,10.2"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="2.2,8.5 7.8,10.2 7.8,19.2 2.2,17.2"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="7.8,10.2 14.5,8.2 14.5,17.0 7.8,19.2"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Right aligned spline block */}
        <polygon
          points="9.5,9.5 16.0,7.5 21.8,9.2 15.2,11.2"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="9.5,9.5 15.2,11.2 15.2,20.2 9.5,18.2"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="15.2,11.2 21.8,9.2 21.8,18.0 15.2,20.2"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Red alignment seam between blocks */}
        <path
          d="M 9.5 9.5 L 15.2 11.2 V 20.2"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.basis',
    label: 'Spline Basis',
    family: 'sop',
    description:
      'S-shaped spline curve with vertical red knot tick marks and grey control points.',
    types: ['basis'],
    icons: ['sop_basis'],
    refKey: 'SOP_basis',
    render: () => (
      <>
        {/* Vertical red knot tick lines */}
        <path
          d="M 2.5 6.5 V 17.5 M 9.0 2.0 V 7.5 M 15.2 16.5 V 22.0 M 21.5 6.5 V 17.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.0"
          strokeLinecap="round"
        />
        {/* Spline curve with dark casing */}
        <path
          d="M 2.5 11.2 C 9.2 2.0 15.2 22.0 21.5 11.8"
          fill="none"
          stroke="#262626"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 2.5 11.2 C 9.2 2.0 15.2 22.0 21.5 11.8"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* Knot dots */}
        <circle cx="2.5" cy="11.2" r="1.6" fill="#c0c7d1" stroke="#262626" strokeWidth="0.85" />
        <circle cx="9.0" cy="7.2" r="1.6" fill="#5aa2f2" stroke="#262626" strokeWidth="0.85" />
        <circle cx="15.2" cy="16.4" r="1.6" fill="#5aa2f2" stroke="#262626" strokeWidth="0.85" />
        <circle cx="21.5" cy="11.8" r="1.6" fill="#c0c7d1" stroke="#262626" strokeWidth="0.85" />
      </>
    ),
  },
  {
    id: 'sop.cap',
    label: 'Spline Cap',
    family: 'sop',
    description:
      'Vertical grey cylinder sealed at the top with a blue elliptical cap.',
    types: ['cap'],
    icons: ['sop_cap'],
    refKey: 'SOP_cap',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-body`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#5a616b" />
          </linearGradient>
        </defs>
        {/* Cylinder body */}
        <path
          d="M 4.5 6.2 V 17.5 C 4.5 20.2 7.8 22.0 12.0 22.0 C 16.2 22.0 19.5 20.2 19.5 17.5 V 6.2 Z"
          fill={`url(#${uid}-body)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Blue top cap */}
        <ellipse
          cx="12.0"
          cy="6.2"
          rx="7.5"
          ry="4.2"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Inner highlight ring on cap */}
        <ellipse
          cx="12.0"
          cy="6.2"
          rx="5.8"
          ry="2.9"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="0.65"
          strokeOpacity="0.8"
        />
      </>
    ),
  },
  {
    id: 'sop.clay',
    label: 'Spline Clay',
    family: 'sop',
    description:
      'Tan 3D clay surface patch pulled upward by a red arrow.',
    types: ['clay'],
    icons: ['sop_clay'],
    refKey: 'SOP_clay',
    render: () => (
      <>
        {/* Clay base patch top face */}
        <polygon
          points="1.8,12.8 8.2,5.5 22.2,9.2 14.5,16.8"
          fill="#ccc5aa"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Clay front-left thickness */}
        <polygon
          points="1.8,12.8 14.5,16.8 14.5,21.8 2.2,18.2"
          fill="#9f905c"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Clay front-right thickness */}
        <polygon
          points="14.5,16.8 22.2,9.2 21.8,14.2 14.5,21.8"
          fill="#6d633f"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Deformed spline curve on surface */}
        <path
          d="M 5.2 13.2 Q 11.5 6.8 18.2 11.2"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Red upward pull arrow */}
        <polygon
          points="13.2,2.0 15.6,6.8 10.6,5.8"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
