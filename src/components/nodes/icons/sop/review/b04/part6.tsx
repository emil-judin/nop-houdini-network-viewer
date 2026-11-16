import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 4, Part 6 (icons 60 to 69): built-in Houdini SOP icons under review.
 */
export const BATCH_04_PART_6: OperatorIconDef[] = [
  {
    id: 'sop.ml_posedeserialize',
    label: 'ML Pose Deserialize',
    family: 'sop',
    description:
      'Orange binary 10 digits on the left and a grey articulated robot figure leaping dynamically to the right.',
    types: ['ml_posedeserialize'],
    icons: ['sop_ml_posedeserialize'],
    refKey: 'SOP_ml_posedeserialize',
    render: () => (
      <>
        {/* Orange binary digits on left */}
        <text x="2.2" y="13.5" fontFamily="sans-serif" fontSize="5.2" fontWeight="bold" fill="#ee8624">
          10
        </text>
        <text x="2.2" y="19.5" fontFamily="sans-serif" fontSize="5.2" fontWeight="bold" fill="#ee8624">
          11
        </text>
        {/* Articulated leaping robot figure */}
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <circle cx="12.5" cy="6.2" r="2" fill="#eef2f7" />
          <polygon points="10.2,8.5 14.8,9.2 13.5,14.2 9.5,13.5" fill="#c0c7d1" />
          {/* Arms raised */}
          <polyline points="10.2,9 7.2,6.5 6.5,3.5" fill="none" strokeWidth="1.8" strokeLinecap="round" />
          <polyline points="10.2,9 7.2,6.5 6.5,3.5" fill="none" stroke="#eef2f7" strokeWidth="0.9" strokeLinecap="round" />
          <polyline points="14.5,9.5 18.2,7.8 20.2,4.8" fill="none" strokeWidth="1.8" strokeLinecap="round" />
          <polyline points="14.5,9.5 18.2,7.8 20.2,4.8" fill="none" stroke="#eef2f7" strokeWidth="0.9" strokeLinecap="round" />
          {/* Legs */}
          <polyline points="10.2,13.8 7.5,17.5 8.5,21" fill="none" strokeWidth="1.9" strokeLinecap="round" />
          <polyline points="10.2,13.8 7.5,17.5 8.5,21" fill="none" stroke="#c0c7d1" strokeWidth="1" strokeLinecap="round" />
          <polyline points="13.2,14 16.5,16.5 14.5,20.2" fill="none" strokeWidth="1.9" strokeLinecap="round" />
          <polyline points="13.2,14 16.5,16.5 14.5,20.2" fill="none" stroke="#89929e" strokeWidth="1" strokeLinecap="round" />
        </g>
        <circle cx="12" cy="11.2" r="0.9" fill="#5aa2f2" />
      </>
    ),
  },
  {
    id: 'sop.ml_poseserialize',
    label: 'ML Pose Serialize',
    family: 'sop',
    description:
      'Grey articulated robot figure leaping dynamically on the left with green binary 10 digits on the right.',
    types: ['ml_poseserialize'],
    icons: ['sop_ml_poseserialize'],
    refKey: 'SOP_ml_poseserialize',
    render: () => (
      <>
        {/* Green binary digits on right */}
        <text x="15.2" y="13.5" fontFamily="sans-serif" fontSize="5.2" fontWeight="bold" fill="#58c848">
          10
        </text>
        <text x="15.2" y="19.5" fontFamily="sans-serif" fontSize="5.2" fontWeight="bold" fill="#58c848">
          01
        </text>
        {/* Articulated leaping robot figure */}
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <circle cx="10.5" cy="6.2" r="2" fill="#eef2f7" />
          <polygon points="8.2,8.5 12.8,9.2 11.5,14.2 7.5,13.5" fill="#c0c7d1" />
          {/* Arms raised */}
          <polyline points="8.2,9 5.2,6.5 4.5,3.5" fill="none" strokeWidth="1.8" strokeLinecap="round" />
          <polyline points="8.2,9 5.2,6.5 4.5,3.5" fill="none" stroke="#eef2f7" strokeWidth="0.9" strokeLinecap="round" />
          <polyline points="12.5,9.5 16.2,7.8 18.2,4.8" fill="none" strokeWidth="1.8" strokeLinecap="round" />
          <polyline points="12.5,9.5 16.2,7.8 18.2,4.8" fill="none" stroke="#eef2f7" strokeWidth="0.9" strokeLinecap="round" />
          {/* Legs */}
          <polyline points="8.2,13.8 5.5,17.5 6.5,21" fill="none" strokeWidth="1.9" strokeLinecap="round" />
          <polyline points="8.2,13.8 5.5,17.5 6.5,21" fill="none" stroke="#c0c7d1" strokeWidth="1" strokeLinecap="round" />
          <polyline points="11.2,14 14.5,16.5 12.5,20.2" fill="none" strokeWidth="1.9" strokeLinecap="round" />
          <polyline points="11.2,14 14.5,16.5 12.5,20.2" fill="none" stroke="#89929e" strokeWidth="1" strokeLinecap="round" />
        </g>
        <circle cx="10" cy="11.2" r="0.9" fill="#5aa2f2" />
      </>
    ),
  },
  {
    id: 'sop.ml_regressionproximity',
    label: 'ML Regression Proximity',
    family: 'sop',
    description:
      'Green radar proximity disc with concentric rings around a central blue point sphere and a second blue point sphere near the rim.',
    types: ['ml_regressionproximity', 'proximity'],
    icons: ['sop_ml_regressionproximity', 'sop_proximity'],
    refKey: 'SOP_ml_regressionproximity',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-prox`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#58c848" />
            <stop offset="65%" stopColor="#8ae234" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#eef2f7" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="9.8" fill={`url(#${uid}-prox)`} stroke="#262626" strokeWidth="0.9" />
        <circle cx="12" cy="12" r="6.8" fill="none" stroke="#58c848" strokeWidth="0.7" />
        <circle cx="12" cy="12" r="3.8" fill="none" stroke="#262626" strokeWidth="0.6" strokeOpacity="0.5" />
        <circle cx="12" cy="12" r="1.45" fill="#5aa2f2" stroke="#262626" strokeWidth="0.85" />
        <circle cx="18.2" cy="13.2" r="1.45" fill="#5aa2f2" stroke="#262626" strokeWidth="0.85" />
      </>
    ),
  },
  {
    id: 'sop.ml_volumetileinference',
    label: 'ML Volume Tile Inference',
    family: 'sop',
    description:
      'Faceted grey polyhedral ONNX crystal sphere with dark wireframe edges and vertex nodes (vendor logo, redrawn).',
    types: ['ml_volumetileinference', 'onnx'],
    icons: ['sop_ml_volumetileinference', 'sop_onnx'],
    refKey: 'SOP_ml_volumetileinference',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="9.2,2.2 17.8,4.2 21.5,11.5 16.5,20.5 6.2,19.5 2.5,11.2" fill="#eef2f7" />
          <polygon points="9.2,2.2 17.8,4.2 7.5,8.8" fill="#ffffff" />
          <polygon points="17.8,4.2 21.5,11.5 16.2,15.5" fill="#c0c7d1" />
          <polygon points="7.5,8.8 16.2,15.5 6.2,19.5" fill="#eef2f7" />
          <polygon points="16.2,15.5 21.5,11.5 16.5,20.5" fill="#89929e" />
          <polygon points="7.5,8.8 16.2,15.5 17.8,4.2" fill="#c0c7d1" />
          <polygon points="2.5,11.2 7.5,8.8 6.2,19.5" fill="#c0c7d1" />
          <polygon points="6.2,19.5 16.2,15.5 16.5,20.5" fill="#89929e" />
        </g>
        <g fill="#262626">
          <circle cx="9.2" cy="2.2" r="0.85" />
          <circle cx="17.8" cy="4.2" r="0.85" />
          <circle cx="21.5" cy="11.5" r="0.85" />
          <circle cx="16.5" cy="20.5" r="0.85" />
          <circle cx="6.2" cy="19.5" r="0.85" />
          <circle cx="2.5" cy="11.2" r="0.85" />
          <circle cx="7.5" cy="8.8" r="0.85" />
          <circle cx="16.2" cy="15.5" r="0.85" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.ml_volumeupres',
    label: 'ML Volume Upres',
    family: 'sop',
    description:
      'Faceted grey polyhedron on the left transitioning into a dense green 3D voxel grid cage on the right.',
    types: ['ml_volumeupres'],
    icons: ['sop_ml_volumeupres'],
    refKey: 'SOP_ml_volumeupres',
    render: () => (
      <>
        {/* Left faceted polyhedron */}
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <polygon points="6.8,2.5 12,2.5 12,19.5 3.5,19.5 2,8.2" fill="#eef2f7" />
          <polygon points="2,8.2 7.5,9.5 6.8,2.5" fill="#ffffff" />
          <polygon points="2,8.2 7.5,9.5 3.5,19.5" fill="#c0c7d1" />
          <polygon points="7.5,9.5 12,13.5 3.5,19.5" fill="#89929e" />
        </g>
        {/* Right green high-res voxel grid */}
        <polygon
          points="12,2.5 17.5,2.5 21.8,6.5 20.2,19.5 12,19.5"
          fill="#eef2f7"
          fillOpacity="0.65"
          stroke="#58c848"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <g stroke="#58c848" strokeWidth="0.65">
          <line x1="15.2" y1="2.5" x2="18.2" y2="6.5" />
          <line x1="18.2" y1="6.5" x2="17" y2="19.5" />
          <line x1="12" y1="6.5" x2="21.8" y2="6.5" />
          <line x1="12" y1="10.8" x2="21.2" y2="10.8" />
          <line x1="12" y1="15.2" x2="20.7" y2="15.2" />
          <line x1="15" y1="6.5" x2="14.5" y2="19.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.object_merge',
    label: 'Object Merge',
    family: 'sop',
    description:
      'Two stacked blue-header window frames with a bold red arrow merging downward into a 3D grey cube.',
    types: ['object_merge'],
    icons: ['sop_object_merge'],
    refKey: 'SOP_object_merge',
    render: () => (
      <>
        {/* Back window */}
        <rect x="2" y="2" width="13.5" height="10.5" rx="1" fill="#eef2f7" stroke="#262626" strokeWidth="0.95" />
        <rect x="2" y="2" width="13.5" height="2.6" rx="0.8" fill="#5aa2f2" stroke="#262626" strokeWidth="0.8" />
        {/* Front window */}
        <rect x="7.5" y="9.2" width="14.5" height="12.5" rx="1" fill="#f2f4f7" stroke="#262626" strokeWidth="1" />
        <rect x="7.5" y="9.2" width="14.5" height="2.6" rx="0.8" fill="#3672c4" stroke="#262626" strokeWidth="0.85" />
        {/* 3D cube inside front window */}
        <g stroke="#262626" strokeWidth="0.75" strokeLinejoin="round">
          <polygon points="14.8,13 18.8,14.8 14.8,16.6 10.8,14.8" fill="#eef2f7" />
          <polygon points="10.8,14.8 14.8,16.6 14.8,20.5 10.8,18.6" fill="#c0c7d1" />
          <polygon points="14.8,16.6 18.8,14.8 18.8,18.6 14.8,20.5" fill="#89929e" />
        </g>
        {/* Red merge arrow */}
        <polygon
          points="7.2,5.2 10.8,5.2 10.8,8.8 12.8,8.8 9,13.2 5.2,8.8 7.2,8.8"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.objnet',
    label: 'Object Network',
    family: 'sop',
    description:
      'Director film clapperboard with a dark slate body and a tilted black-and-white striped clap stick open at the top.',
    types: ['objnet'],
    icons: ['networks_scene'],
    refKey: 'NETWORKS_scene',
    render: () => (
      <>
        {/* Tilted top clapper stick */}
        <g transform="rotate(-12 3 9.5)" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <rect x="2.5" y="5.8" width="18.5" height="3.2" rx="0.6" fill="#f2f4f7" />
          <g fill="#262626" stroke="none">
            <polygon points="4.5,5.8 7.2,5.8 5.8,9 3.1,9" />
            <polygon points="9.5,5.8 12.2,5.8 10.8,9 8.1,9" />
            <polygon points="14.5,5.8 17.2,5.8 15.8,9 13.1,9" />
          </g>
          <rect x="2.5" y="5.8" width="18.5" height="3.2" rx="0.6" fill="none" />
        </g>
        {/* Bottom clapper bar */}
        <rect x="2.5" y="9.5" width="19" height="3" fill="#f2f4f7" stroke="#262626" strokeWidth="0.95" />
        <g fill="#262626">
          <polygon points="4.5,9.5 7.2,9.5 8.6,12.5 5.9,12.5" />
          <polygon points="9.5,9.5 12.2,9.5 13.6,12.5 10.9,12.5" />
          <polygon points="14.5,9.5 17.2,9.5 18.6,12.5 15.9,12.5" />
        </g>
        {/* Dark slate board */}
        <rect x="2.5" y="12.5" width="19" height="9" rx="0.8" fill="#5a616b" stroke="#262626" strokeWidth="1.05" />
        <g stroke="#eef2f7" strokeWidth="0.75" strokeLinecap="round">
          <line x1="4.5" y1="15.5" x2="19.5" y2="15.5" />
          <line x1="4.5" y1="18.5" x2="19.5" y2="18.5" />
          <line x1="9.5" y1="15.5" x2="9.5" y2="18.5" />
          <line x1="15" y1="15.5" x2="15" y2="18.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rop_fbx',
    label: 'ROP FBX Output',
    family: 'sop',
    description:
      'Stylized dark motion figure above a black banner reading FBX in white letters (vendor logo, redrawn).',
    types: ['rop_fbx'],
    icons: ['rop_fbx'],
    refKey: 'ROP_fbx',
    render: () => (
      <>
        {/* Stylized dancing/motion figure */}
        <g fill="none" stroke="#f2f4f7" strokeWidth="2.4" strokeLinecap="round">
          <path d="M7.5,14.5 C10.5,9.2 14.5,5.2 18.8,2.2" />
          <path d="M8.2,4.2 C8.2,10.2 12.5,11.5 17.2,11.8" />
        </g>
        <g fill="none" stroke="#262626" strokeWidth="1.35" strokeLinecap="round">
          <path d="M7.5,14.5 C10.5,9.2 14.5,5.2 18.8,2.2" />
          <path d="M8.2,4.2 C8.2,10.2 12.5,11.5 17.2,11.8" />
        </g>
        <circle cx="11.2" cy="4.2" r="1.5" fill="#262626" stroke="#f2f4f7" strokeWidth="0.6" />
        {/* Black FBX banner */}
        <rect x="2.5" y="15.8" width="19" height="6" rx="0.8" fill="#262626" />
        <text
          x="12"
          y="20.4"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="5.4"
          fontWeight="bold"
          fill="#ffffff"
        >
          FBX
        </text>
      </>
    ),
  },
  {
    id: 'sop.rop_geometry',
    label: 'ROP Geometry Output',
    family: 'sop',
    description:
      'Classic geometry primitives trio: a blue 3D cylinder on the left, a red sphere at back-right, and a yellow cone in front.',
    types: ['rop_geometry', 'sopnet'],
    icons: ['obj_geo', 'rop_geometry'],
    refKey: 'ROP_geometry',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-sph`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="50%" stopColor="#e03228" />
            <stop offset="100%" stopColor="#7c0000" />
          </radialGradient>
        </defs>
        {/* Red sphere at back-right */}
        <circle cx="15.8" cy="9.5" r="5" fill={`url(#${uid}-sph)`} stroke="#262626" strokeWidth="1.05" />
        {/* Blue cylinder on left */}
        <path
          d="M2.2,5.5 V15 C2.2,16.5 4.4,17.8 7,17.8 C9.6,17.8 11.8,16.5 11.8,15 V5.5 Z"
          fill="#3672c4"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <ellipse cx="7" cy="5.5" rx="4.8" ry="1.8" fill="#8fc2ff" stroke="#262626" strokeWidth="1" />
        {/* Yellow cone in front-center */}
        <path
          d="M12.2,8.5 L6.8,19.5 C6.8,21 9.2,22 12.2,22 C15.2,22 17.6,21 17.6,19.5 Z"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path d="M12.2,8.5 L12.2,22 C15.2,22 17.6,21 17.6,19.5 Z" fill="#d49a18" />
        <path
          d="M12.2,8.5 L6.8,19.5 C6.8,21 9.2,22 12.2,22 C15.2,22 17.6,21 17.6,19.5 Z"
          fill="none"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.usdapexsceneimport',
    label: 'USD APEX Scene Import (Beta)',
    family: 'sop',
    description:
      'Perspective wooden LOP stage platform at the bottom with a blue articulated character figure posing on top.',
    types: ['usdapexsceneimport'],
    icons: ['sop_usdapexsceneimport'],
    refKey: 'SOP_usdapexsceneimport',
    render: () => (
      <>
        {/* Wooden LOP stage at bottom */}
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="5.5,14.5 18.5,14.5 21.5,19.8 2.5,19.8" fill="#f2c438" />
          <polygon points="2.5,19.8 21.5,19.8 20.5,22 3.5,22" fill="#c89a5a" />
        </g>
        <g stroke="#a8783c" strokeWidth="0.55">
          <line x1="9" y1="14.5" x2="7.2" y2="19.8" />
          <line x1="12" y1="14.5" x2="12" y2="19.8" />
          <line x1="15" y1="14.5" x2="16.8" y2="19.8" />
        </g>
        {/* Articulated blue/grey figure standing on stage */}
        <circle cx="12" cy="4.2" r="1.7" fill="#3672c4" stroke="#262626" strokeWidth="0.85" />
        <g stroke="#262626" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="6.2" x2="12" y2="11.5" />
          <line x1="7.5" y1="8.8" x2="16.5" y2="8.8" />
          <line x1="12" y1="11.5" x2="9.2" y2="17.2" />
          <line x1="12" y1="11.5" x2="14.8" y2="17.2" />
        </g>
        <g stroke="#5aa2f2" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="6.2" x2="12" y2="11.5" />
          <line x1="7.5" y1="8.8" x2="16.5" y2="8.8" />
          <line x1="12" y1="11.5" x2="9.2" y2="17.2" />
          <line x1="12" y1="11.5" x2="14.8" y2="17.2" />
        </g>
      </>
    ),
  },
];
