import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_03_PART_4: OperatorIconDef[] = [
  {
    id: 'sop.timeblend',
    label: 'Time Blend',
    family: 'sop',
    description:
      'Silver-blue clock face with a blended red-orange sector between two clock hands.',
    types: ['timeblend'],
    icons: ['sop_timeblend'],
    refKey: 'SOP_timeblend',
    render: () => (
      <>
        {/* Outer clock bezel */}
        <circle
          cx="12.0"
          cy="12.0"
          r="9.6"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Inner clock face */}
        <circle
          cx="12.0"
          cy="12.0"
          r="7.8"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.75"
        />
        {/* Blended red-orange time sector */}
        <path
          d="M 12.0 12.0 L 12.0 5.2 A 6.8 6.8 0 0 1 17.8 15.4 Z"
          fill="#ee8624"
          fillOpacity="0.65"
        />
        <path
          d="M 12.0 12.0 L 16.8 7.2 A 6.8 6.8 0 0 1 17.8 15.4 Z"
          fill="#e03228"
          fillOpacity="0.7"
        />
        {/* Clock hands */}
        <path
          d="M 12.0 12.0 V 5.5 M 12.0 12.0 L 17.2 15.0"
          fill="none"
          stroke="#262626"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <circle cx="12.0" cy="12.0" r="1.2" fill="#262626" />
      </>
    ),
  },
  {
    id: 'sop.timeshift',
    label: 'Time Shift',
    family: 'sop',
    description:
      'Silver-blue clock face with a curved red arrow shifting the clock hand.',
    types: ['timeshift'],
    icons: ['sop_timeshift'],
    refKey: 'SOP_timeshift',
    render: () => (
      <>
        {/* Outer clock bezel */}
        <circle
          cx="12.0"
          cy="12.0"
          r="9.6"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Inner clock face */}
        <circle
          cx="12.0"
          cy="12.0"
          r="7.8"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.75"
        />
        {/* Clock hands */}
        <path
          d="M 12.0 12.0 L 9.2 6.8 M 12.0 12.0 L 16.5 14.5"
          fill="none"
          stroke="#262626"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        {/* Red shift arc and arrowhead */}
        <path
          d="M 9.8 6.5 A 5.8 5.8 0 0 1 17.2 10.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <polygon
          points="18.2,12.2 15.2,10.5 18.0,8.8"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <circle cx="12.0" cy="12.0" r="1.2" fill="#262626" />
      </>
    ),
  },
  {
    id: 'sop.toonshaderattribs',
    label: 'Toon Shader Attributes',
    family: 'sop',
    description:
      'Cel-shaded golden-yellow sombrero hat with hard flat highlight and shadow bands.',
    types: ['toonshaderattribs'],
    icons: ['sop_toonshaderattribs'],
    refKey: 'SOP_toonshaderattribs',
    render: () => (
      <>
        {/* Outer dark-gold brim shadow */}
        <ellipse
          cx="12.0"
          cy="13.5"
          rx="10.0"
          ry="6.8"
          fill="#987b00"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Mid-tone bright yellow toon band */}
        <path
          d="M 2.5 11.8 C 4.2 14.2 7.8 15.2 12.0 15.2 C 16.2 15.2 19.8 14.2 21.5 11.8 C 21.2 15.8 17.0 18.5 12.0 18.5 C 7.0 18.5 2.8 15.8 2.5 11.8 Z"
          fill="#f2c438"
        />
        {/* Raised crown of hat */}
        <path
          d="M 8.2 10.5 C 7.5 8.5 5.5 7.5 5.5 6.8 C 5.5 5.2 8.5 4.2 12.0 4.2 C 15.5 4.2 18.5 5.2 18.5 6.8 C 18.5 7.5 16.5 8.5 15.8 10.5 Z"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Hard-edged pale yellow toon highlights */}
        <ellipse cx="12.0" cy="6.8" rx="2.6" ry="1.4" fill="#ffe47a" />
        <ellipse cx="12.0" cy="14.2" rx="4.2" ry="1.5" fill="#ffe47a" />
      </>
    ),
  },
  {
    id: 'sop.topnet',
    label: 'TOP Geometry',
    family: 'sop',
    description:
      'Yellow-orange TOPs work cap with a striped orange band and curved visor.',
    types: ['topnet', 'topnetmgr'],
    icons: ['networks_top', 'networks_topgeometry'],
    refKey: 'NETWORKS_topgeometry',
    render: () => (
      <>
        {/* Yellow cap crown */}
        <path
          d="M 3.8 14.8 L 2.2 6.2 C 5.8 3.8 11.8 2.5 18.2 3.2 L 19.2 12.8 Z"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Orange hatband */}
        <path
          d="M 3.6 13.5 C 8.5 12.0 14.0 11.2 19.2 11.5 L 19.6 14.0 C 14.2 13.8 8.8 14.6 3.8 16.0 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Visor / bill extending to right */}
        <path
          d="M 5.2 15.6 L 19.6 13.8 C 21.4 13.6 22.4 14.6 21.8 16.0 C 20.5 17.8 16.5 18.8 11.2 18.5 Z"
          fill="#d49a18"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.torus',
    label: 'Torus',
    family: 'sop',
    description:
      '3D grey torus ring in perspective with wireframe contour rings.',
    types: ['torus'],
    icons: ['sop_torus'],
    refKey: 'SOP_torus',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-torus`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        {/* Torus outer silhouette with central hole (even-odd fill rule) */}
        <path
          d="M 12.0 5.2 C 6.0 5.2 1.8 8.4 1.8 12.4 C 1.8 16.4 6.0 19.6 12.0 19.6 C 18.0 19.6 22.2 16.4 22.2 12.4 C 22.2 8.4 18.0 5.2 12.0 5.2 Z M 12.0 10.4 C 14.8 10.4 17.0 11.4 17.0 12.2 C 17.0 13.0 14.8 13.8 12.0 13.8 C 9.2 13.8 7.0 13.0 7.0 12.2 C 7.0 11.4 9.2 10.4 12.0 10.4 Z"
          fill={`url(#${uid}-torus)`}
          fillRule="evenodd"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Inner wireframe latitude/longitude contours */}
        <ellipse
          cx="12.0"
          cy="11.8"
          rx="7.8"
          ry="4.2"
          fill="none"
          stroke="#5a616b"
          strokeWidth="0.6"
        />
        <path
          d="M 7.0 12.2 C 5.5 11.2 4.5 9.8 5.2 8.2 M 17.0 12.2 C 18.5 11.2 19.5 9.8 18.8 8.2 M 12.0 13.8 V 19.5 M 12.0 5.2 V 10.4"
          fill="none"
          stroke="#5a616b"
          strokeWidth="0.6"
        />
      </>
    ),
  },
];
