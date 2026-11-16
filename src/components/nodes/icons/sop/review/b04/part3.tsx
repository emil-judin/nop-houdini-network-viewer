import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 4, Part 3 (icons 30 to 39): built-in Houdini SOP icons under review.
 */
export const BATCH_04_PART_3: OperatorIconDef[] = [
  {
    id: 'sop.pointreplicate',
    label: 'Point Replicate',
    family: 'sop',
    description:
      'Tilted grey quad with two grey seed points surrounded by a dense cluster of replicated orange point spheres.',
    types: ['pointreplicate'],
    icons: ['sop_pointreplicate'],
    refKey: 'SOP_pointreplicate',
    render: () => (
      <>
        {/* Grey polygon quad */}
        <polygon
          points="3.5,14.5 10.5,8.2 15.2,13.5 8.2,19.8"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Replicated orange points */}
        <g fill="#ee8624" stroke="#262626" strokeWidth="0.6">
          <circle cx="6.5" cy="6.2" r="1.35" />
          <circle cx="11.2" cy="4.8" r="1.25" />
          <circle cx="15.2" cy="6.5" r="1.35" />
          <circle cx="4.2" cy="10.2" r="1.25" />
          <circle cx="14.5" cy="10.5" r="1.45" />
          <circle cx="18.8" cy="9.8" r="1.3" />
          <circle cx="11.8" cy="14.2" r="1.45" />
          <circle cx="17.2" cy="14.5" r="1.5" />
          <circle cx="6.2" cy="18.2" r="1.3" />
          <circle cx="11.2" cy="18.8" r="1.45" />
          <circle cx="15.5" cy="18.5" r="1.35" />
        </g>
        {/* Two grey seed points */}
        <g fill="#eef2f7" stroke="#262626" strokeWidth="0.7">
          <circle cx="9.8" cy="10.2" r="1.5" />
          <circle cx="7.5" cy="14.5" r="1.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.pointvelocity',
    label: 'Point Velocity',
    family: 'sop',
    description:
      'Dark speedometer dial gauge with light green tick marks around the upper arc and a white needle pointing up-right.',
    types: ['pointvelocity'],
    icons: ['sop_pointvelocity'],
    refKey: 'SOP_pointvelocity',
    render: () => (
      <>
        {/* Speedometer body */}
        <path
          d="M3,18.5 C2.2,16.8 1.8,14.8 1.8,12.8 C1.8,7.2 6.4,2.6 12,2.6 C17.6,2.6 22.2,7.2 22.2,12.8 C22.2,14.8 21.8,16.8 21,18.5 Z"
          fill="#262626"
          stroke="#262626"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <path
          d="M4,17.5 C3.4,16.1 3,14.5 3,12.8 C3,7.9 7,3.9 12,3.9 C17,3.9 21,7.9 21,12.8 C21,14.5 20.6,16.1 20,17.5 Z"
          fill="#3a3f47"
        />
        {/* Green tick marks */}
        <g stroke="#58c848" strokeWidth="0.9" strokeLinecap="round">
          <line x1="4.6" y1="14.5" x2="6.2" y2="14.1" />
          <line x1="5.2" y1="10.2" x2="6.7" y2="10.9" />
          <line x1="8" y1="6.6" x2="9" y2="8" />
          <line x1="12" y1="5.2" x2="12" y2="6.9" />
          <line x1="16" y1="6.6" x2="15" y2="8" />
          <line x1="18.8" y1="10.2" x2="17.3" y2="10.9" />
          <line x1="19.4" y1="14.5" x2="17.8" y2="14.1" />
        </g>
        {/* Needle */}
        <polygon points="11.4,15 18.2,10.2 12.6,16.2" fill="#f2f4f7" />
        <circle cx="12" cy="15.5" r="1.6" fill="#f2c438" stroke="#262626" strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.pointweld',
    label: 'Point Weld',
    family: 'sop',
    description:
      'Two angled grey metal plates being fused at a glowing yellow-white weld point by a welding torch from top-right.',
    types: ['pointweld'],
    icons: ['sop_pointweld'],
    refKey: 'SOP_pointweld',
    render: () => (
      <>
        {/* Two metal plates meeting at center */}
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="2.5,8.2 7.5,10 10.2,15.5 5.8,19.8 1.5,18.2" fill="#eef2f7" />
          <polygon points="10.2,15.5 14.8,11.2 19,12.8 17.8,22 13.2,21.5" fill="#c0c7d1" />
        </g>
        {/* Welding torch at top-right */}
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <polygon points="18.5,2.2 21.8,4.8 17.2,8.8 14.8,6.8" fill="#5a616b" />
          <polygon points="14.8,6.8 17.2,8.8 13.8,11.5 12.5,10.2" fill="#89929e" />
        </g>
        {/* Glowing weld spark */}
        <path
          d="M10.2,12.2 L10.8,14.5 L13,13.5 L11.4,15.2 L13.2,16.8 L10.8,16.2 L10,18.5 L9.4,16.2 L7,16.8 L8.8,15.2 L7.2,13.5 L9.4,14.5 Z"
          fill="#ffe47a"
          stroke="#ee8624"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <circle cx="10.2" cy="15.4" r="1.3" fill="#ffffff" />
      </>
    ),
  },
  {
    id: 'sop.pointsfromvolume',
    label: 'Points from Volume',
    family: 'sop',
    description:
      'Fluffy light-grey volume cloud silhouette filled with a regular 4x4 grid of bright yellow point spheres.',
    types: ['pointsfromvolume'],
    icons: ['sop_pointsfromvolume'],
    refKey: 'SOP_pointsfromvolume',
    render: () => (
      <>
        {/* Fluffy volume cloud */}
        <path
          d="M6.5,19.8 C3.8,19.8 2,17.8 2,15.2 C2,13.6 2.8,12.2 4,11.4 C3.2,10.4 3,9 3.5,7.6 C4.2,5.6 6.2,4.4 8.4,4.8 C9.4,3.1 11.2,2 13.4,2 C16.2,2 18.6,3.8 19.2,6.4 C21,7 22.2,8.8 22.2,10.8 C22.2,12.4 21.4,13.8 20.2,14.6 C20.8,15.6 21,16.8 20.5,18 C19.8,19.8 18,20.8 16,20.4 C14.8,21.5 13.2,22 11.4,22 C9.4,22 7.6,21.1 6.5,19.8 Z"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* 4x4 grid of yellow volume points */}
        <g fill="#f2c438" stroke="#262626" strokeWidth="0.55">
          <circle cx="7.5" cy="7.5" r="1.05" />
          <circle cx="10.5" cy="7.5" r="1.05" />
          <circle cx="13.5" cy="7.5" r="1.05" />
          <circle cx="16.5" cy="7.5" r="1.05" />

          <circle cx="7.5" cy="10.5" r="1.05" />
          <circle cx="10.5" cy="10.5" r="1.05" />
          <circle cx="13.5" cy="10.5" r="1.05" />
          <circle cx="16.5" cy="10.5" r="1.05" />

          <circle cx="7.5" cy="13.5" r="1.05" />
          <circle cx="10.5" cy="13.5" r="1.05" />
          <circle cx="13.5" cy="13.5" r="1.05" />
          <circle cx="16.5" cy="13.5" r="1.05" />

          <circle cx="7.5" cy="16.5" r="1.05" />
          <circle cx="10.5" cy="16.5" r="1.05" />
          <circle cx="13.5" cy="16.5" r="1.05" />
          <circle cx="16.5" cy="16.5" r="1.05" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.primitive',
    label: 'Primitive Properties',
    family: 'sop',
    description:
      'Single isometric orange polygon diamond with a warm highlight border.',
    types: ['primitive'],
    icons: ['sop_primitive'],
    refKey: 'SOP_primitive',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-prim`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="100%" stopColor="#ee8624" />
          </linearGradient>
        </defs>
        <polygon
          points="12,5.5 22,12 12,18.5 2,12"
          fill={`url(#${uid}-prim)`}
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <polygon
          points="12,7 20,12 12,17 4,12"
          fill="none"
          stroke="#ffe47a"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.uvautoseam',
    label: 'UV Auto Seam',
    family: 'sop',
    description:
      'Tan teddy bear sitting upright with dashed red UV seam lines along its head, torso, arms, and legs.',
    types: ['uvautoseam'],
    icons: ['sop_uvautoseam'],
    refKey: 'SOP_uvautoseam',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          {/* Ears */}
          <circle cx="7.8" cy="4.2" r="2" fill="#a8783c" />
          <circle cx="16.2" cy="4.2" r="2" fill="#a8783c" />
          {/* Arms */}
          <ellipse cx="6.2" cy="12" rx="2.8" ry="1.8" transform="rotate(-25 6.2 12)" fill="#c89a5a" />
          <ellipse cx="17.8" cy="12" rx="2.8" ry="1.8" transform="rotate(25 17.8 12)" fill="#c89a5a" />
          {/* Torso */}
          <ellipse cx="12" cy="14.2" rx="4.5" ry="5.2" fill="#c89a5a" />
          {/* Legs */}
          <ellipse cx="7.8" cy="18.8" rx="2.8" ry="2.2" transform="rotate(-15 7.8 18.8)" fill="#e8c48a" />
          <ellipse cx="16.2" cy="18.8" rx="2.8" ry="2.2" transform="rotate(15 16.2 18.8)" fill="#e8c48a" />
          {/* Head */}
          <circle cx="12" cy="7.5" r="4.4" fill="#e8c48a" />
        </g>
        {/* Snout and eyes */}
        <ellipse cx="12" cy="8.8" rx="1.8" ry="1.3" fill="#f2f4f7" stroke="#262626" strokeWidth="0.6" />
        <circle cx="12" cy="8.4" r="0.6" fill="#262626" />
        <circle cx="10.3" cy="6.8" r="0.55" fill="#262626" />
        <circle cx="13.7" cy="6.8" r="0.55" fill="#262626" />
        {/* Red UV seam lines */}
        <g fill="none" stroke="#e03228" strokeWidth="1" strokeDasharray="1.3 0.9" strokeLinecap="round">
          <path d="M12,3.2 V7.2" />
          <path d="M9,10.5 C11,11.5 13,11.5 15,10.5" />
          <path d="M12,11.2 V18.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.uvbrush',
    label: 'UV Brush',
    family: 'sop',
    description:
      '4x4 black-and-white UV checkerboard with a warped region encircled by a dashed red brush ring.',
    types: ['uvbrush'],
    icons: ['sop_uvbrush'],
    refKey: 'SOP_uvbrush',
    render: () => (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" fill="#f2f4f7" stroke="#262626" strokeWidth="1.15" />
        {/* Checkerboard dark cells (warped in upper-right) */}
        <g fill="#262626">
          <rect x="2.5" y="2.5" width="4.75" height="4.75" />
          <rect x="7.25" y="7.25" width="4.75" height="4.75" />
          <rect x="2.5" y="12" width="4.75" height="4.75" />
          <rect x="7.25" y="16.75" width="4.75" height="4.75" />
          <rect x="16.75" y="16.75" width="4.75" height="4.75" />
          {/* Warped cells */}
          <path d="M12,2.5 H16.75 C16.5,5.2 15.2,6.8 13.8,7.8 L12,7.25 Z" />
          <path d="M16.75,7.25 L21.5,7.25 V12 H16.75 C15.5,10.5 15.2,8.8 16.75,7.25 Z" />
          <path d="M12,12 L15.5,11.2 L16.75,16.75 H12 Z" />
        </g>
        {/* Red brush circle */}
        <circle
          cx="14.6"
          cy="9.4"
          r="5.6"
          fill="none"
          stroke="#f2f4f7"
          strokeWidth="2"
        />
        <circle
          cx="14.6"
          cy="9.4"
          r="5.6"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.25"
          strokeDasharray="1.6 1.2"
        />
      </>
    ),
  },
  {
    id: 'sop.uvedit',
    label: 'UV Edit',
    family: 'sop',
    description:
      '2x2 black-and-white UV checkerboard with its center vertex pulled up-right by a white mouse pointer.',
    types: ['uvedit'],
    icons: ['sop_uvedit'],
    refKey: 'SOP_uvedit',
    render: () => (
      <>
        <rect x="2.5" y="2.5" width="18.5" height="18.5" fill="#f2f4f7" stroke="#262626" strokeWidth="1.15" />
        {/* Two dark warped quads */}
        <polygon points="11.5,2.5 21,2.5 21,12.2 13,10.5" fill="#262626" />
        <polygon points="2.5,12.2 13,10.5 11.5,21 2.5,21" fill="#262626" />
        <line x1="11.5" y1="2.5" x2="13" y2="10.5" stroke="#262626" strokeWidth="0.7" />
        <line x1="2.5" y1="12.2" x2="13" y2="10.5" stroke="#262626" strokeWidth="0.7" />
        {/* Mouse pointer arrow */}
        <polygon
          points="13,10.5 13.8,20.2 16.2,17.8 18.5,22 20.4,21 18,16.8 21.2,16.2"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.uvflatten',
    label: 'UV Flatten',
    family: 'sop',
    description:
      'Isometric 3D checkerboard cube with red dashed seam lines and red-handled scissors cutting along the top seam.',
    types: ['uvflatten'],
    icons: ['sop_uvflatten', 'sop_uvflatten-2.0', 'sop_uvflatten-3.0'],
    refKey: 'SOP_uvflatten',
    render: () => (
      <>
        {/* Isometric checkerboard cube */}
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon points="12.5,2.2 21.5,6.5 10.5,10.2 3,5.5" fill="#c0c7d1" />
          <polygon points="3,5.5 10.5,10.2 10.5,21.5 3.8,16.2" fill="#eef2f7" />
          <polygon points="10.5,10.2 21.5,6.5 20.5,17.8 10.5,21.5" fill="#262626" />
        </g>
        {/* Checkerboard cells on cube */}
        <polygon points="3,5.5 6.8,7.8 6.8,13.5 3.4,10.8" fill="#262626" />
        <polygon points="6.8,13.5 10.5,15.8 10.5,21.5 6.8,18.6" fill="#262626" />
        <polygon points="10.5,10.2 16,8.4 15.8,14 10.5,15.8" fill="#89929e" />
        <polygon points="15.8,14 21,12.2 20.5,17.8 15.6,19.6" fill="#89929e" />
        {/* Red dashed seam lines */}
        <polyline
          points="21.5,6.5 10.5,10.2 10.5,21.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.2"
          strokeDasharray="1.5 1"
        />
        {/* Scissors cutting top-left */}
        <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <polygon points="7.5,6.8 13.5,4.2 12.2,6.5 7.5,8.2" fill="#eef2f7" />
          <polygon points="7.5,6.8 9.8,12.8 8.2,12.2 6.5,7.5" fill="#c0c7d1" />
          <circle cx="4.8" cy="4.2" r="2" fill="none" stroke="#e03228" strokeWidth="1.4" />
          <circle cx="4.5" cy="9.2" r="2" fill="none" stroke="#e03228" strokeWidth="1.4" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.uvflattenfrompoints',
    label: 'UV Flatten from Points',
    family: 'sop',
    description:
      'Golden-orange Stanford bunny silhouette with a dashed red UV seam line and white point markers along its back and ear.',
    types: ['uvflattenfrompoints'],
    icons: ['sop_uvflattenfrompoints'],
    refKey: 'SOP_uvflattenfrompoints',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-bunny`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffe47a" />
            <stop offset="55%" stopColor="#ee8624" />
            <stop offset="100%" stopColor="#c25e12" />
          </radialGradient>
        </defs>
        {/* Bunny silhouette */}
        <path
          d="M8.5,9.5 C6.5,5.5 7.2,2.2 9.2,2.5 C10.5,2.8 11,5.2 11.2,7.2 C12.5,5.2 14.5,3.5 15.8,4.5 C16.8,5.4 15.5,7.8 13.8,9.8 C17.8,10.5 21,13.5 20.8,17.2 C21.8,17.8 22,19.5 20.5,20.2 C18.5,21.2 11.5,21.2 7.5,20.5 C5.5,20.2 5.2,18.8 6.5,18 C5.5,16.5 5.8,14.5 7.2,13.5 C4.8,13.2 3.8,11.5 4.8,9.8 C5.6,8.5 7.2,8.5 8.5,9.5 Z"
          fill={`url(#${uid}-bunny)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Red seam line along ear and back */}
        <path
          d="M9,3.2 C9.8,6.5 11.5,9.5 15.2,11.5 C18,13 19.5,15.5 19.5,18.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.15"
          strokeDasharray="1.4 1"
          strokeLinecap="round"
        />
        {/* Seam points */}
        <g fill="#f2f4f7" stroke="#262626" strokeWidth="0.6">
          <circle cx="9.2" cy="4.2" r="0.95" />
          <circle cx="11.5" cy="9.2" r="0.95" />
          <circle cx="15.8" cy="11.8" r="0.95" />
          <circle cx="19.2" cy="16.2" r="0.95" />
        </g>
      </>
    ),
  },
];
