import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_03_PART_3: OperatorIconDef[] = [
  {
    id: 'sop.testgeometry_rubbertoy',
    label: 'Test Geometry: Rubber Toy',
    family: 'sop',
    description:
      'Blue and cyan rubber toy sea-dragon with dorsal crests and outstretched flippers.',
    types: ['testgeometry_rubbertoy'],
    icons: ['sop_testgeometry_rubbertoy'],
    refKey: 'SOP_testgeometry_rubbertoy',
    render: () => (
      <>
        {/* Rubber toy body silhouette */}
        <path
          d="M 9.8 2.8 C 11.2 2.2 12.2 4.2 13.4 5.2 C 14.8 6.2 15.2 8.2 13.6 9.5 C 15.5 9.4 17.2 7.8 18.8 8.2 C 20.2 8.8 19.6 11.2 19.8 13.2 C 20.2 14.8 22.0 15.2 21.8 16.8 C 21.5 18.2 19.2 18.4 18.8 19.4 C 19.8 20.2 21.2 21.2 19.8 21.8 C 17.2 21.5 14.8 20.2 12.2 20.8 C 8.8 21.5 5.8 20.0 3.8 17.5 C 2.0 17.2 1.5 15.5 3.2 14.5 C 5.2 13.8 5.8 12.2 4.2 10.8 C 3.0 9.5 3.5 7.2 5.4 6.5 C 6.8 5.2 8.2 3.5 9.8 2.8 Z"
          fill="#2ba3d1"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Cyan belly/crest highlights */}
        <path
          d="M 8.2 8.2 C 10.2 7.2 11.8 8.2 11.8 10.2 C 11.8 12.8 13.8 15.2 16.5 16.2"
          fill="none"
          stroke="#55c6d4"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* Eye */}
        <circle cx="10.8" cy="6.8" r="0.85" fill="#ffffff" stroke="#262626" strokeWidth="0.55" />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_shaderball',
    label: 'Test Geometry: Shader Ball',
    family: 'sop',
    description:
      'Glossy cyan-blue shader ball on a dark grey circular pedestal base.',
    types: ['testgeometry_shaderball'],
    icons: ['sop_testgeometry_shaderball'],
    refKey: 'SOP_testgeometry_shaderball',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ball`} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#63fbd9" />
            <stop offset="50%" stopColor="#168fc8" />
            <stop offset="100%" stopColor="#044a89" />
          </radialGradient>
        </defs>
        {/* Pedestal base */}
        <ellipse
          cx="12.0"
          cy="18.8"
          rx="6.8"
          ry="2.8"
          fill="#5a616b"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <ellipse
          cx="12.0"
          cy="17.4"
          rx="6.2"
          ry="2.4"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="0.85"
        />
        {/* Glossy cyan-blue shader ball */}
        <path
          d="M 5.2 11.2 C 5.2 6.8 8.2 3.5 12.0 3.5 C 15.8 3.5 18.8 6.8 18.8 11.2 C 18.8 14.8 16.2 17.5 12.0 17.5 C 7.8 17.5 5.2 14.8 5.2 11.2 Z"
          fill={`url(#${uid}-ball)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Inner shader ball cutout */}
        <ellipse
          cx="13.5"
          cy="11.8"
          rx="2.6"
          ry="2.2"
          fill="#262626"
          stroke="#63fbd9"
          strokeWidth="0.65"
        />
        {/* Specular highlight */}
        <ellipse
          cx="9.2"
          cy="7.2"
          rx="1.8"
          ry="1.0"
          transform="rotate(-25 9.2 7.2)"
          fill="#ffffff"
          fillOpacity="0.85"
        />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_squab',
    label: 'Test Geometry: Squab',
    family: 'sop',
    description:
      'Grey-brown crustacean squab creature with a bulbous shell and splayed legs.',
    types: ['testgeometry_squab'],
    icons: ['sop_testgeometry_squab'],
    refKey: 'SOP_testgeometry_squab',
    render: () => (
      <>
        {/* Bulbous carapace body on upper right */}
        <path
          d="M 8.5 9.2 C 8.5 5.8 12.2 3.5 16.5 3.5 C 19.8 3.5 21.8 5.2 21.2 7.5 C 20.5 9.8 18.5 12.5 15.5 13.8 C 12.5 15.0 9.2 13.2 8.5 9.2 Z"
          fill="#86827b"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Splayed tentacles/legs toward lower left */}
        <path
          d="M 9.5 11.2 L 2.2 14.5 M 10.5 12.5 L 3.0 17.8 M 12.0 13.5 L 6.2 20.2 M 13.8 13.8 L 9.8 21.5 M 15.5 13.2 L 16.8 18.2"
          fill="none"
          stroke="#262626"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M 9.5 11.2 L 2.2 14.5 M 10.5 12.5 L 3.0 17.8 M 12.0 13.5 L 6.2 20.2 M 13.8 13.8 L 9.8 21.5 M 15.5 13.2 L 16.8 18.2"
          fill="none"
          stroke="#9c9997"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        {/* Shell ridge highlight */}
        <path
          d="M 11.2 7.5 C 13.5 5.8 16.8 5.5 19.0 6.5"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_templatebody',
    label: 'Test Geometry: Template Body',
    family: 'sop',
    description:
      'Neutral grey human mannequin figure standing in an A-pose.',
    types: ['testgeometry_templatebody'],
    icons: ['sop_testgeometry_templatebody'],
    refKey: 'SOP_testgeometry_templatebody',
    render: () => (
      <>
        {/* Head */}
        <circle
          cx="12.0"
          cy="3.6"
          r="1.8"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.85"
        />
        {/* Torso, arms in A-pose, and legs */}
        <path
          d="M 9.2 6.0 H 14.8 L 19.2 12.8 L 17.8 13.6 L 14.5 8.5 L 14.2 13.2 L 15.2 21.5 H 13.2 L 12.0 14.5 L 10.8 21.5 H 8.8 L 9.8 13.2 L 9.5 8.5 L 6.2 13.6 L 4.8 12.8 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_templatehead',
    label: 'Test Geometry: Template Head',
    family: 'sop',
    description:
      'Neutral grey sculpted human head and neck bust in three-quarter profile.',
    types: ['testgeometry_templatehead'],
    icons: ['sop_testgeometry_templatehead'],
    refKey: 'SOP_testgeometry_templatehead',
    render: () => (
      <>
        {/* Sculpted head and neck bust silhouette */}
        <path
          d="M 11.8 2.2 C 15.5 2.2 18.0 4.8 17.8 8.5 C 17.6 11.2 16.5 13.5 15.2 14.8 L 15.8 17.5 L 19.2 19.5 L 17.8 21.5 H 6.5 L 5.2 19.5 L 8.5 17.5 L 8.8 14.8 C 6.8 13.8 5.5 11.8 5.8 9.2 C 6.0 5.0 8.5 2.2 11.8 2.2 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Brow, nose, and jawline shading */}
        <path
          d="M 7.8 8.5 H 12.5 M 10.0 8.5 L 9.2 11.8 L 10.8 12.2 M 8.8 14.8 C 10.8 15.6 13.2 15.6 15.2 14.8"
          fill="none"
          stroke="#5a616b"
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_tommy',
    label: 'Test Geometry: Tommy',
    family: 'sop',
    description:
      'Muscular soldier figure in A-pose with terracotta skin, dark helmet, and olive trousers.',
    types: ['testgeometry_tommy'],
    icons: ['sop_testgeometry_tommy'],
    refKey: 'SOP_testgeometry_tommy',
    render: () => (
      <>
        {/* Helmet and head */}
        <circle
          cx="12.0"
          cy="4.0"
          r="2.0"
          fill="#c9998a"
          stroke="#262626"
          strokeWidth="0.85"
        />
        <path
          d="M 9.8 3.6 C 9.8 2.0 14.2 2.0 14.2 3.6 Z"
          fill="#4f4530"
          stroke="#262626"
          strokeWidth="0.75"
        />
        {/* Muscular torso and arms */}
        <path
          d="M 8.5 6.2 H 15.5 L 19.8 12.2 L 18.0 13.4 L 15.0 9.0 L 14.6 13.2 H 9.4 L 9.0 9.0 L 6.0 13.4 L 4.2 12.2 Z"
          fill="#c9998a"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Olive-drab trousers and boots */}
        <path
          d="M 9.4 13.2 H 14.6 L 15.4 21.5 H 13.0 L 12.0 15.8 L 11.0 21.5 H 8.6 Z"
          fill="#4f4530"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.testsim_ragdoll',
    label: 'Test Simulation: Ragdoll',
    family: 'sop',
    description:
      'Flailing ragdoll dummy with articulated orange and blue limbs.',
    types: ['testsim_ragdoll'],
    icons: ['sop_testsim_ragdoll'],
    refKey: 'SOP_testsim_ragdoll',
    render: () => (
      <>
        {/* Ragdoll head */}
        <circle
          cx="11.2"
          cy="4.2"
          r="2.2"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.9"
        />
        {/* Orange torso and outstretched arms */}
        <path
          d="M 3.5 8.8 L 9.2 6.8 L 14.5 7.5 L 20.5 4.2"
          fill="none"
          stroke="#262626"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 3.5 8.8 L 9.2 6.8 L 14.5 7.5 L 20.5 4.2"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Pelvis / torso block */}
        <polygon
          points="9.2,6.8 14.5,7.5 13.2,13.8 8.2,12.8"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Flailing blue legs */}
        <path
          d="M 8.8 13.0 L 4.5 19.8 M 12.8 13.5 L 18.8 18.5"
          fill="none"
          stroke="#262626"
          strokeWidth="3.0"
          strokeLinecap="round"
        />
        <path
          d="M 8.8 13.0 L 4.5 19.8 M 12.8 13.5 L 18.8 18.5"
          fill="none"
          stroke="#3672c4"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.texturefeature',
    label: 'Texture Feature',
    family: 'sop',
    description:
      'Two 3D blue blocks with bright green feature corner points.',
    types: ['texturefeature'],
    icons: ['sop_texturefeature'],
    refKey: 'SOP_texturefeature',
    render: () => (
      <>
        {/* Left angled blue block */}
        <polygon
          points="2.2,8.8 10.2,4.2 14.2,6.5 6.2,11.2"
          fill="#8fc2ff"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2.2,8.8 6.2,11.2 6.2,15.2 2.2,12.8"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="6.2,11.2 14.2,6.5 14.2,10.5 6.2,15.2"
          fill="#3672c4"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Right vertical blue pillar */}
        <polygon
          points="13.2,6.2 17.5,3.8 21.5,6.0 17.2,8.5"
          fill="#8fc2ff"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="13.2,6.2 17.2,8.5 17.2,19.8 13.2,17.4"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="17.2,8.5 21.5,6.0 21.5,17.2 17.2,19.8"
          fill="#3672c4"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Green feature corner dots */}
        <circle cx="13.2" cy="6.2" r="1.2" fill="#58c848" stroke="#262626" strokeWidth="0.6" />
        <circle cx="21.5" cy="6.0" r="1.2" fill="#58c848" stroke="#262626" strokeWidth="0.6" />
        <circle cx="17.2" cy="19.8" r="1.2" fill="#58c848" stroke="#262626" strokeWidth="0.6" />
        <circle cx="6.2" cy="11.2" r="1.2" fill="#58c848" stroke="#262626" strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'sop.texturemaskpaint',
    label: 'Texture Mask Paint',
    family: 'sop',
    description:
      '3D white sphere with its bottom half painted in red mask by a yellow-handled brush.',
    types: ['texturemaskpaint'],
    icons: ['sop_texturemaskpaint'],
    refKey: 'SOP_texturemaskpaint',
    render: () => (
      <>
        {/* Sphere base (white/grey upper half) */}
        <ellipse
          cx="10.8"
          cy="11.8"
          rx="7.2"
          ry="8.2"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1.0"
        />
        {/* Red painted mask on lower half */}
        <path
          d="M 3.7 12.8 C 5.8 13.8 8.2 13.5 10.5 12.6 C 12.8 11.8 15.5 12.2 17.9 11.8 C 17.6 16.5 14.6 20.0 10.8 20.0 C 7.0 20.0 4.0 16.8 3.7 12.8 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Paintbrush at right */}
        <polygon
          points="16.8,9.8 21.8,3.2 22.6,4.2 18.2,11.0"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <path
          d="M 14.5 12.5 C 15.0 10.8 16.0 9.8 17.5 10.4 C 17.0 12.0 15.8 12.8 14.5 12.5 Z"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.textureopticalflow',
    label: 'Texture Optical Flow',
    family: 'sop',
    description:
      'Rounded grid frame with a dark moving silhouette and red, green, and orange optical flow arrows.',
    types: ['textureopticalflow', 'volumeopticalflow'],
    icons: ['sop_textureopticalflow', 'sop_volumeopticalflow'],
    refKey: 'SOP_textureopticalflow',
    render: () => (
      <>
        {/* Rounded screen frame */}
        <rect
          x="2.0"
          y="3.5"
          width="20.0"
          height="17.0"
          rx="2.6"
          fill="#d0d6e0"
          stroke="#262626"
          strokeWidth="1.0"
        />
        {/* Subtle vertical grid lines */}
        <path
          d="M 7.0 4.0 V 20.0 M 12.0 4.0 V 20.0 M 17.0 4.0 V 20.0"
          fill="none"
          stroke="#89929e"
          strokeWidth="0.55"
        />
        {/* Dark silhouette shape */}
        <path
          d="M 6.0 15.5 C 7.5 12.5 11.2 12.0 13.2 9.5 C 14.5 7.5 16.5 6.8 17.5 8.5 C 18.2 11.2 15.8 15.5 12.5 17.2 C 9.2 18.2 5.5 17.5 6.0 15.5 Z"
          fill="#262626"
        />
        {/* Optical flow arrows (red, green, orange) */}
        <path
          d="M 5.5 9.5 L 10.5 7.5 M 9.0 6.5 L 10.8 7.4 L 9.6 9.2"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 13.5 14.5 L 18.5 12.5 M 17.0 11.5 L 18.8 12.4 L 17.6 14.2"
          fill="none"
          stroke="#58c848"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 8.5 16.5 L 13.5 14.5"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </>
    ),
  },
];
