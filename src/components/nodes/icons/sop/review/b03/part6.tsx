import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_03_PART_6: OperatorIconDef[] = [
  {
    id: 'sop.unsubdivide',
    label: 'Unsubdivide',
    family: 'sop',
    description:
      'Stepped 3D grey mesh with fine pink subdivision lines simplified into bold dark coarse quads.',
    types: ['unsubdivide'],
    icons: ['sop_unsubdivide'],
    refKey: 'SOP_unsubdivide',
    render: () => (
      <>
        {/* Coarse stepped 3D mesh silhouette */}
        <polygon
          points="1.8,11.2 7.2,6.5 14.2,4.8 22.0,9.5 18.5,14.5 15.2,19.2 10.5,17.5 4.8,18.5"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Fine pink subdivision grid inside */}
        <path
          d="M 4.5 8.8 L 12.8 18.2 M 10.8 5.6 L 16.8 16.8 M 3.2 14.8 L 19.5 11.8"
          fill="none"
          stroke="#e8888b"
          strokeWidth="0.65"
        />
        {/* Bold coarse quad edges */}
        <path
          d="M 7.2 6.5 L 10.5 17.5 M 14.2 4.8 L 15.2 19.2 M 1.8 11.2 L 10.5 11.0 L 18.5 14.5"
          fill="none"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.texture',
    label: 'UV Texture',
    family: 'sop',
    description:
      'Sphere mapped with a dark-and-light spherical UV checkerboard grid.',
    types: ['texture'],
    icons: ['sop_texture'],
    refKey: 'SOP_texture',
    render: () => (
      <>
        {/* Base light sphere */}
        <circle
          cx="12.0"
          cy="12.0"
          r="9.8"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Dark checkerboard patches on sphere */}
        <path
          d="M 12.0 2.2 C 14.5 2.2 16.5 5.0 16.8 8.5 L 12.0 8.5 Z M 7.2 8.5 L 12.0 8.5 V 13.5 H 7.0 C 6.8 11.5 7.0 9.8 7.2 8.5 Z M 12.0 13.5 H 16.8 C 16.5 16.2 15.2 18.5 12.0 18.5 Z M 2.4 13.5 H 7.0 C 7.4 16.2 8.8 18.5 10.5 21.4 C 6.0 20.5 2.8 17.2 2.4 13.5 Z M 16.8 8.5 H 21.4 C 21.8 10.2 21.8 11.8 21.5 13.5 H 16.8 Z"
          fill="#3a3f47"
        />
        {/* Spherical latitude/longitude lines */}
        <ellipse cx="12.0" cy="12.0" rx="4.8" ry="9.8" fill="none" stroke="#262626" strokeWidth="0.65" />
        <ellipse cx="12.0" cy="12.0" rx="9.8" ry="3.8" fill="none" stroke="#262626" strokeWidth="0.65" />
        <line x1="12.0" y1="2.2" x2="12.0" y2="21.8" stroke="#262626" strokeWidth="0.65" />
      </>
    ),
  },
  {
    id: 'sop.visibility',
    label: 'Visibility',
    family: 'sop',
    description:
      'Open human eye with a white sclera, green iris, and dark pupil with a white catchlight.',
    types: ['visibility'],
    icons: ['sop_visibility'],
    refKey: 'SOP_visibility',
    render: () => (
      <>
        {/* Eye almond outline and white sclera */}
        <path
          d="M 1.8 12.2 C 6.5 5.2 17.5 5.2 22.2 12.2 C 17.5 19.2 6.5 19.2 1.8 12.2 Z"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Green iris */}
        <circle
          cx="11.5"
          cy="12.2"
          r="4.6"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.9"
        />
        {/* Dark pupil */}
        <circle cx="11.5" cy="12.2" r="2.2" fill="#262626" />
        {/* White specular catchlight */}
        <circle cx="10.2" cy="10.8" r="0.95" fill="#ffffff" />
      </>
    ),
  },
  {
    id: 'sop.visualize',
    label: 'Visualize Properties',
    family: 'sop',
    description:
      '3D stepped mesh shaded with a rainbow heatmap gradient from magenta to yellow.',
    types: ['visualize'],
    icons: ['sop_visualize'],
    refKey: 'SOP_visualize',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-heat`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff74bf" />
            <stop offset="35%" stopColor="#70b2df" />
            <stop offset="70%" stopColor="#b2f06a" />
            <stop offset="100%" stopColor="#fbcf67" />
          </linearGradient>
        </defs>
        {/* Rainbow heatmap mesh */}
        <polygon
          points="1.8,11.2 7.2,6.5 14.2,4.8 22.0,9.5 18.5,14.5 15.2,19.2 10.5,17.5 4.8,18.5"
          fill={`url(#${uid}-heat)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Internal wireframe lines */}
        <path
          d="M 7.2 6.5 L 10.5 17.5 M 14.2 4.8 L 15.2 19.2 M 1.8 11.2 L 10.5 11.0 L 18.5 14.5"
          fill="none"
          stroke="#262626"
          strokeWidth="0.65"
          strokeOpacity="0.6"
        />
      </>
    ),
  },
  {
    id: 'sop.paintcolorvolume',
    label: 'Volume Paint Color',
    family: 'sop',
    description:
      'Layered purple volume cloud on the left painted by an orange-handled brush with a cyan tip.',
    types: ['paintcolorvolume'],
    icons: ['sop_paintcolorvolume'],
    refKey: 'SOP_paintcolorvolume',
    render: () => (
      <>
        {/* Outer dashed purple volume boundary */}
        <path
          d="M 8.2 2.2 C 11.0 3.5 11.5 6.2 10.5 8.2 C 9.5 10.2 8.2 12.2 9.2 15.2 C 10.2 17.8 11.5 19.8 9.5 21.2 C 6.8 22.2 2.2 19.5 2.0 12.5 C 1.8 6.5 5.2 1.2 8.2 2.2 Z"
          fill="#ad7fa8"
          fillOpacity="0.35"
          stroke="#262626"
          strokeWidth="0.85"
          strokeDasharray="1.8 1.0"
        />
        {/* Inner dense purple volume core */}
        <path
          d="M 7.6 4.5 C 9.2 5.5 9.2 7.5 8.2 9.5 C 7.0 11.8 7.5 14.8 8.8 16.8 C 9.5 18.0 8.5 19.5 6.8 19.2 C 4.5 18.2 3.4 15.0 3.6 11.5 C 3.8 7.8 5.8 3.8 7.6 4.5 Z"
          fill="#ad7fa8"
          stroke="#262626"
          strokeWidth="0.75"
        />
        {/* Paintbrush handle and ferrule */}
        <polygon
          points="14.5,14.2 21.2,6.2 22.2,7.2 16.0,15.5"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="12.5,16.8 14.5,14.2 16.0,15.5 13.8,18.0"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        {/* Cyan brush tip */}
        <path
          d="M 8.8 20.0 C 10.2 17.5 11.5 16.2 13.2 17.0 C 13.8 18.5 12.0 20.2 8.8 20.0 Z"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.paintfogvolume',
    label: 'Volume Paint Fog',
    family: 'sop',
    description:
      'Layered white-and-grey fog volume on the left painted by an orange-handled brush with a cyan tip.',
    types: ['paintfogvolume'],
    icons: ['sop_paintfogvolume'],
    refKey: 'SOP_paintfogvolume',
    render: () => (
      <>
        {/* Outer dashed grey fog volume boundary */}
        <path
          d="M 8.2 2.2 C 11.0 3.5 11.5 6.2 10.5 8.2 C 9.5 10.2 8.2 12.2 9.2 15.2 C 10.2 17.8 11.5 19.8 9.5 21.2 C 6.8 22.2 2.2 19.5 2.0 12.5 C 1.8 6.5 5.2 1.2 8.2 2.2 Z"
          fill="#c0c7d1"
          fillOpacity="0.45"
          stroke="#262626"
          strokeWidth="0.85"
          strokeDasharray="1.8 1.0"
        />
        {/* Inner dense white fog volume core */}
        <path
          d="M 7.6 4.5 C 9.2 5.5 9.2 7.5 8.2 9.5 C 7.0 11.8 7.5 14.8 8.8 16.8 C 9.5 18.0 8.5 19.5 6.8 19.2 C 4.5 18.2 3.4 15.0 3.6 11.5 C 3.8 7.8 5.8 3.8 7.6 4.5 Z"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.75"
        />
        {/* Paintbrush handle and ferrule */}
        <polygon
          points="14.5,14.2 21.2,6.2 22.2,7.2 16.0,15.5"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="12.5,16.8 14.5,14.2 16.0,15.5 13.8,18.0"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        {/* Cyan brush tip */}
        <path
          d="M 8.8 20.0 C 10.2 17.5 11.5 16.2 13.2 17.0 C 13.8 18.5 12.0 20.2 8.8 20.0 Z"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.paintsdfvolume',
    label: 'Volume Paint SDF',
    family: 'sop',
    description:
      'Smooth blue-grey SDF volume on the left painted by an orange-handled brush with a cyan tip.',
    types: ['paintsdfvolume'],
    icons: ['sop_paintsdfvolume'],
    refKey: 'SOP_paintsdfvolume',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-sdf`} cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="60%" stopColor="#8fc2ff" />
            <stop offset="100%" stopColor="#3672c4" />
          </radialGradient>
        </defs>
        {/* Smooth SDF volume with dashed blue contour */}
        <path
          d="M 8.2 2.2 C 11.0 3.5 11.5 6.2 10.5 8.2 C 9.5 10.2 8.2 12.2 9.2 15.2 C 10.2 17.8 11.5 19.8 9.5 21.2 C 6.8 22.2 2.2 19.5 2.0 12.5 C 1.8 6.5 5.2 1.2 8.2 2.2 Z"
          fill={`url(#${uid}-sdf)`}
          stroke="#262626"
          strokeWidth="0.95"
          strokeDasharray="2.0 1.0"
        />
        {/* Paintbrush handle and ferrule */}
        <polygon
          points="14.5,14.2 21.2,6.2 22.2,7.2 16.0,15.5"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="12.5,16.8 14.5,14.2 16.0,15.5 13.8,18.0"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        {/* Cyan brush tip */}
        <path
          d="M 8.8 20.0 C 10.2 17.5 11.5 16.2 13.2 17.0 C 13.8 18.5 12.0 20.2 8.8 20.0 Z"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
