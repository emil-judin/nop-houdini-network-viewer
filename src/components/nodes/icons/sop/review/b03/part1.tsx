import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_03_PART_1: OperatorIconDef[] = [
  {
    id: 'sop.curveclay',
    label: 'Spline Curve Clay',
    family: 'sop',
    description:
      'Tan 3D clay surface deformed along a bright red-and-white spline curve with an upward red arrow.',
    types: ['curveclay'],
    icons: ['sop_curveclay'],
    refKey: 'SOP_curveclay',
    render: () => (
      <>
        {/* Clay base patch top face */}
        <polygon
          points="1.8,13.0 8.2,5.8 22.2,9.5 14.5,17.0"
          fill="#ccc5aa"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Clay front-left thickness */}
        <polygon
          points="1.8,13.0 14.5,17.0 14.5,21.8 2.2,18.2"
          fill="#9f905c"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Clay front-right thickness */}
        <polygon
          points="14.5,17.0 22.2,9.5 21.8,14.4 14.5,21.8"
          fill="#6d633f"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Prominent spline curve ridge */}
        <path
          d="M 4.5 13.8 C 9.2 6.8 14.2 6.8 18.8 11.6"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="2.0"
          strokeLinecap="round"
        />
        <path
          d="M 4.5 13.8 C 9.2 6.8 14.2 6.8 18.8 11.6"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
        {/* Red upward pull arrow */}
        <polygon
          points="13.0,1.8 15.4,6.4 10.4,5.4"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.fillet',
    label: 'Spline Fillet',
    family: 'sop',
    description:
      'Two dark curves joined across the top by a red fillet arc with square endpoints and tangent arrows.',
    types: ['fillet'],
    icons: ['sop_fillet'],
    refKey: 'SOP_fillet',
    render: () => (
      <>
        {/* Left and right input curves */}
        <path
          d="M 2.0 20.5 C 3.4 15.5 5.4 13.2 7.5 11.5 M 22.0 20.5 C 20.6 15.5 18.6 13.2 16.5 11.5"
          fill="none"
          stroke="#262626"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        {/* Red fillet bridge arc */}
        <path
          d="M 7.5 11.5 C 10.5 9.2 13.5 9.2 16.5 11.5"
          fill="none"
          stroke="#262626"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <path
          d="M 7.5 11.5 C 10.5 9.2 13.5 9.2 16.5 11.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Tangent handle lines and arrows */}
        <path
          d="M 7.5 11.5 L 10.2 6.8 M 16.5 11.5 L 13.8 6.8"
          fill="none"
          stroke="#a40000"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
        <polygon
          points="11.0,5.2 10.8,8.2 8.4,6.8"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        <polygon
          points="13.0,5.2 15.6,6.8 13.2,8.2"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        {/* Join point squares */}
        <rect
          x="6.2"
          y="10.2"
          width="2.6"
          height="2.6"
          fill="#262626"
          stroke="#e03228"
          strokeWidth="0.8"
        />
        <rect
          x="15.2"
          y="10.2"
          width="2.6"
          height="2.6"
          fill="#262626"
          stroke="#e03228"
          strokeWidth="0.8"
        />
      </>
    ),
  },
  {
    id: 'sop.fit',
    label: 'Spline Fit',
    family: 'sop',
    description:
      'Smooth red spline curve fitted through four grey control points.',
    types: ['fit'],
    icons: ['sop_fit'],
    refKey: 'SOP_fit',
    render: () => (
      <>
        {/* Fitted red curve with dark casing */}
        <path
          d="M 2.2 13.0 C 4.2 6.8 7.5 4.0 11.5 6.8 C 14.2 8.6 16.0 12.2 18.5 15.2 C 20.8 18.0 22.0 15.5 22.0 12.8"
          fill="none"
          stroke="#262626"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <path
          d="M 2.2 13.0 C 4.2 6.8 7.5 4.0 11.5 6.8 C 14.2 8.6 16.0 12.2 18.5 15.2 C 20.8 18.0 22.0 15.5 22.0 12.8"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        {/* Data points */}
        <circle cx="3.2" cy="12.5" r="1.6" fill="#c0c7d1" stroke="#262626" strokeWidth="0.85" />
        <circle cx="8.2" cy="5.8" r="1.6" fill="#c0c7d1" stroke="#262626" strokeWidth="0.85" />
        <circle cx="19.2" cy="16.2" r="1.6" fill="#c0c7d1" stroke="#262626" strokeWidth="0.85" />
        <circle cx="21.5" cy="13.0" r="1.6" fill="#c0c7d1" stroke="#262626" strokeWidth="0.85" />
      </>
    ),
  },
  {
    id: 'sop.profile',
    label: 'Spline Profile',
    family: 'sop',
    description:
      'Curved blue-grey surface patch with a dashed red oval profile curve resting on it.',
    types: ['profile'],
    icons: ['sop_profile'],
    refKey: 'SOP_profile',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-surf`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#bfd0dc" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        {/* Curved surface patch */}
        <path
          d="M 1.8 11.2 C 5.2 8.0 8.6 4.8 13.2 4.8 L 22.2 11.0 C 17.8 12.0 11.8 16.8 9.2 19.8 Z"
          fill={`url(#${uid}-surf)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Profile oval on surface */}
        <ellipse
          cx="11.5"
          cy="11.0"
          rx="4.8"
          ry="2.6"
          transform="rotate(-22 11.5 11.0)"
          fill="#ffffff"
          fillOpacity="0.35"
          stroke="#eef2f7"
          strokeWidth="1.6"
        />
        <ellipse
          cx="11.5"
          cy="11.0"
          rx="4.8"
          ry="2.6"
          transform="rotate(-22 11.5 11.0)"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.0"
          strokeDasharray="2.0 1.2"
        />
      </>
    ),
  },
  {
    id: 'sop.project',
    label: 'Spline Project',
    family: 'sop',
    description:
      'Oval spline curve projecting an orange translucent beam down onto a curved blue-grey surface.',
    types: ['project'],
    icons: ['sop_project'],
    refKey: 'SOP_project',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-surf`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#bfd0dc" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        {/* Curved surface patch at bottom */}
        <path
          d="M 1.8 12.4 C 5.2 9.2 8.6 6.2 13.2 6.2 L 22.2 12.2 C 17.8 13.2 11.8 17.8 9.2 20.8 Z"
          fill={`url(#${uid}-surf)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Projected red dashed oval on surface */}
        <ellipse
          cx="13.2"
          cy="12.2"
          rx="5.2"
          ry="2.6"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.0"
          strokeDasharray="2.0 1.2"
        />
        {/* Orange translucent projection curtain */}
        <path
          d="M 8.5 5.4 L 8.0 12.2 C 9.8 14.4 16.5 14.4 18.4 12.2 L 19.6 5.4 Z"
          fill="#ee8624"
          fillOpacity="0.45"
          stroke="#c25e12"
          strokeWidth="0.65"
        />
        {/* Source spline oval floating at top */}
        <ellipse
          cx="14.0"
          cy="5.2"
          rx="5.6"
          ry="2.6"
          fill="#ffb066"
          fillOpacity="0.4"
          stroke="#262626"
          strokeWidth="1.5"
        />
        <ellipse
          cx="14.0"
          cy="5.2"
          rx="5.6"
          ry="2.6"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="0.9"
        />
      </>
    ),
  },
  {
    id: 'sop.surfsect',
    label: 'Spline Surfsect',
    family: 'sop',
    description:
      'Vertical grey cylinder intersecting an angled blue cylinder with a highlighted seam.',
    types: ['surfsect'],
    icons: ['sop_surfsect'],
    refKey: 'SOP_surfsect',
    render: () => (
      <>
        {/* Vertical grey cylinder */}
        <path
          d="M 3.0 4.8 V 16.8 C 3.0 18.8 5.8 20.4 9.2 20.4 C 12.6 20.4 15.4 18.8 15.4 16.8 V 4.8 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <ellipse
          cx="9.2"
          cy="4.8"
          rx="6.2"
          ry="2.8"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Intersecting blue cylinder on right */}
        <path
          d="M 10.2 10.5 L 18.5 6.8 C 20.2 6.2 21.8 8.0 21.8 10.8 C 21.8 13.6 20.4 16.0 18.5 16.8 L 10.2 19.2 C 8.5 17.0 8.5 12.8 10.2 10.5 Z"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Red intersection curve */}
        <path
          d="M 10.2 10.5 C 12.2 12.8 12.2 16.8 10.2 19.2"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.trim',
    label: 'Spline Trim',
    family: 'sop',
    description:
      'Curved blue-grey surface patch with a semicircular notch trimmed out of its lower-right edge.',
    types: ['trim'],
    icons: ['sop_trim'],
    refKey: 'SOP_trim',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-surf`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#bfd0dc" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        {/* Surface patch with semicircular cutout */}
        <path
          d="M 1.8 11.4 C 5.2 8.2 8.6 5.2 13.0 5.2 L 22.2 11.0 C 20.8 11.2 19.5 11.6 18.6 12.2 C 16.8 10.5 13.2 9.8 11.0 11.4 C 8.5 13.2 9.8 16.2 11.5 17.2 C 10.2 18.0 9.5 19.2 8.8 20.0 Z"
          fill={`url(#${uid}-surf)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Highlighted orange/red trimmed edge */}
        <path
          d="M 18.6 12.2 C 16.8 10.5 13.2 9.8 11.0 11.4 C 8.5 13.2 9.8 16.2 11.5 17.2"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.splitbypointattrib',
    label: 'Split by Point Attribute',
    family: 'sop',
    description:
      'Orange and green 3D pyramid facets splitting apart along point attribute seams.',
    types: ['splitbypointattrib'],
    icons: ['sop_splitbypointattrib'],
    refKey: 'SOP_splitbypointattrib',
    render: () => (
      <>
        {/* Base diamond */}
        <polygon
          points="2.0,15.8 11.5,11.5 22.0,15.8 12.2,21.5"
          fill="#c25e12"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Left split orange facet */}
        <polygon
          points="2.0,15.5 10.2,4.2 11.2,11.5"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Right split green/lime facet */}
        <polygon
          points="12.5,4.0 22.0,15.5 12.2,11.5"
          fill="#9db029"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Front split golden-orange facet */}
        <polygon
          points="12.0,8.2 21.8,15.8 12.2,21.5"
          fill="#ffb066"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Colored attribute dots at split vertices */}
        <circle cx="10.2" cy="4.2" r="1.3" fill="#ee8624" stroke="#262626" strokeWidth="0.7" />
        <circle cx="12.5" cy="4.0" r="1.3" fill="#58c848" stroke="#262626" strokeWidth="0.7" />
        <circle cx="12.0" cy="8.2" r="1.3" fill="#ffe47a" stroke="#262626" strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.spraypaint',
    label: 'Spray Paint',
    family: 'sop',
    description:
      'Tilted metallic aerosol can spraying a mist of red paint droplets.',
    types: ['spraypaint'],
    icons: ['sop_spraypaint'],
    refKey: 'SOP_spraypaint',
    render: () => (
      <>
        {/* Tilted spray can body */}
        <path
          d="M 8.5 5.2 L 15.5 9.2 L 8.8 20.8 C 5.8 21.6 2.2 19.5 1.8 16.8 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Spray can dome and nozzle */}
        <ellipse
          cx="12.0"
          cy="7.2"
          rx="4.2"
          ry="2.2"
          transform="rotate(30 12.0 7.2)"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <rect
          x="11.8"
          y="3.8"
          width="2.4"
          height="2.4"
          rx="0.5"
          transform="rotate(30 13.0 5.0)"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.8"
        />
        {/* Red spray mist dots */}
        <circle cx="16.8" cy="4.5" r="1.1" fill="#e03228" stroke="#262626" strokeWidth="0.55" />
        <circle cx="19.5" cy="3.5" r="1.3" fill="#e03228" stroke="#262626" strokeWidth="0.55" />
        <circle cx="20.8" cy="6.8" r="1.2" fill="#e03228" stroke="#262626" strokeWidth="0.55" />
        <circle cx="18.2" cy="8.2" r="1.0" fill="#e03228" stroke="#262626" strokeWidth="0.55" />
        <circle cx="21.5" cy="10.2" r="1.1" fill="#e03228" stroke="#262626" strokeWidth="0.55" />
      </>
    ),
  },
  {
    id: 'sop.sprite',
    label: 'Sprite',
    family: 'sop',
    description:
      'Three golden star sprites with sweeping light trails streaming from the upper right.',
    types: ['sprite'],
    icons: ['sop_sprite'],
    refKey: 'SOP_sprite',
    render: () => (
      <>
        {/* Sweeping trails from upper right */}
        <path
          d="M 21.8 2.2 C 15.2 2.2 9.5 4.8 5.2 8.2 L 9.5 13.2 C 12.5 7.8 17.5 3.8 21.8 2.2 Z"
          fill="#ffe47a"
          fillOpacity="0.65"
          stroke="#262626"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <path
          d="M 22.0 4.2 C 18.0 4.5 14.5 7.2 12.5 10.8 L 17.2 15.8 C 18.2 10.5 19.8 6.8 22.0 4.2 Z"
          fill="#ffe47a"
          fillOpacity="0.65"
          stroke="#262626"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {/* Top-left star sprite */}
        <polygon
          points="6.5,4.8 7.5,7.0 9.8,7.3 8.1,8.9 8.5,11.2 6.5,10.1 4.5,11.2 4.9,8.9 3.2,7.3 5.5,7.0"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Bottom-left star sprite */}
        <polygon
          points="8.2,13.2 9.2,15.4 11.5,15.7 9.8,17.3 10.2,19.6 8.2,18.5 6.2,19.6 6.6,17.3 4.9,15.7 7.2,15.4"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Right star sprite */}
        <polygon
          points="15.8,9.8 16.8,12.0 19.1,12.3 17.4,13.9 17.8,16.2 15.8,15.1 13.8,16.2 14.2,13.9 12.5,12.3 14.8,12.0"
          fill="#ffe47a"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
