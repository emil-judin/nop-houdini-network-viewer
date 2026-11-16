import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 8, Part 0 (icons 0 to 9): built-in Houdini SOP icons under review.
 */
export const BATCH_08_PART_0: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.rop_fbxcharacteroutput',
    label: 'ROP FBX Character Output',
    family: 'sop',
    description:
      'Blue KineFX character figure with yellow-highlighted joints stepping toward an open doorway on the right with a red export arrow.',
    types: ['rop_fbxcharacteroutput'],
    icons: ['sop_kinefx-rop_fbxcharacteroutput'],
    refKey: 'SOP_kinefx-rop_fbxcharacteroutput',
    render: () => (
      <g>
        {/* Open doorway on the right */}
        <polygon
          points="15.5,4.2 20.5,2 20.5,22 15.5,19.8"
          fill="#d3d7cf"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="16.5,5.2 19.6,3.6 19.6,20.4 16.5,18.8"
          fill="#555753"
          stroke="#262626"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <rect
          x="20"
          y="1.8"
          width="1.6"
          height="20.4"
          fill="#888a85"
          stroke="#262626"
          strokeWidth="0.8"
        />
        {/* Blue KineFX character silhouette */}
        <circle cx="8" cy="5.2" r="2" fill="#729fcf" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M5.2,8.5 L10.8,8.5 L12.5,13 L10.8,13.5 L9.8,10.5 L9.5,14.5 L11.5,19.8 L9.6,20.2 L8,15.5 L6.4,20.2 L4.5,19.8 L6.5,14.5 L6.2,10.5 L5.2,13.5 L3.5,13 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Yellow KineFX rig joints */}
        <circle cx="8" cy="9.5" r="0.9" fill="#fce94f" stroke="#c4a000" strokeWidth="0.55" />
        <circle cx="8" cy="14" r="0.9" fill="#fce94f" stroke="#c4a000" strokeWidth="0.55" />
        {/* Red output arrow pointing right into doorway */}
        <polygon
          points="10.5,11.2 14.5,11.2 14.5,9.5 17.8,12.2 14.5,14.9 14.5,13.2 10.5,13.2"
          fill="#ef2929"
          stroke="#a40000"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rop_gltfcharacteroutput',
    label: 'ROP GLTF Character Output',
    family: 'sop',
    description:
      'Blue KineFX character figure with yellow-highlighted joints stepping toward an open doorway on the right with a red export arrow.',
    types: ['rop_gltfcharacteroutput'],
    icons: ['sop_kinefx-rop_gltfcharacteroutput'],
    refKey: 'SOP_kinefx-rop_gltfcharacteroutput',
    render: () => (
      <g>
        {/* Open doorway on the right */}
        <polygon
          points="15.5,4.2 20.5,2 20.5,22 15.5,19.8"
          fill="#d3d7cf"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="16.5,5.2 19.6,3.6 19.6,20.4 16.5,18.8"
          fill="#555753"
          stroke="#262626"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <rect
          x="20"
          y="1.8"
          width="1.6"
          height="20.4"
          fill="#888a85"
          stroke="#262626"
          strokeWidth="0.8"
        />
        {/* Blue KineFX character silhouette */}
        <circle cx="8" cy="5.2" r="2" fill="#729fcf" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M5.2,8.5 L10.8,8.5 L12.5,13 L10.8,13.5 L9.8,10.5 L9.5,14.5 L11.5,19.8 L9.6,20.2 L8,15.5 L6.4,20.2 L4.5,19.8 L6.5,14.5 L6.2,10.5 L5.2,13.5 L3.5,13 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Yellow KineFX rig joints */}
        <circle cx="8" cy="9.5" r="0.9" fill="#fce94f" stroke="#c4a000" strokeWidth="0.55" />
        <circle cx="8" cy="14" r="0.9" fill="#fce94f" stroke="#c4a000" strokeWidth="0.55" />
        {/* Red output arrow pointing right into doorway */}
        <polygon
          points="10.5,11.2 14.5,11.2 14.5,9.5 17.8,12.2 14.5,14.9 14.5,13.2 10.5,13.2"
          fill="#ef2929"
          stroke="#a40000"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.scenecharacterexport',
    label: 'Scene Character Export',
    family: 'sop',
    description:
      'Blue KineFX character figure with yellow joints and a red export arrow pointing right toward an open doorway.',
    types: ['scenecharacterexport'],
    icons: ['sop_kinefx-scenecharacterexport'],
    refKey: 'SOP_kinefx-scenecharacterexport',
    render: () => (
      <g>
        {/* Open doorway on the right */}
        <polygon
          points="15.5,4.2 20.5,2 20.5,22 15.5,19.8"
          fill="#d3d7cf"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="16.5,5.2 19.6,3.6 19.6,20.4 16.5,18.8"
          fill="#555753"
          stroke="#262626"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <rect
          x="20"
          y="1.8"
          width="1.6"
          height="20.4"
          fill="#888a85"
          stroke="#262626"
          strokeWidth="0.8"
        />
        {/* Blue KineFX character silhouette */}
        <circle cx="7.8" cy="5.2" r="2" fill="#729fcf" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M5,8.5 L10.6,8.5 L12.3,13 L10.6,13.5 L9.6,10.5 L9.3,14.5 L11.3,19.8 L9.4,20.2 L7.8,15.5 L6.2,20.2 L4.3,19.8 L6.3,14.5 L6,10.5 L5,13.5 L3.3,13 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <circle cx="7.8" cy="9.5" r="0.9" fill="#fce94f" stroke="#c4a000" strokeWidth="0.55" />
        <circle cx="7.8" cy="14" r="0.9" fill="#fce94f" stroke="#c4a000" strokeWidth="0.55" />
        {/* Red export arrow */}
        <polygon
          points="10.5,11.2 14.5,11.2 14.5,9.5 17.8,12.2 14.5,14.9 14.5,13.2 10.5,13.2"
          fill="#ef2929"
          stroke="#a40000"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.scenecharacterimport',
    label: 'Scene Character Import',
    family: 'sop',
    description:
      'Open doorway on the left with a red import arrow pointing right toward a blue KineFX character figure with yellow joints.',
    types: ['scenecharacterimport'],
    icons: ['sop_kinefx-scenecharacterimport'],
    refKey: 'SOP_kinefx-scenecharacterimport',
    render: () => (
      <g>
        {/* Open doorway on the left */}
        <polygon
          points="8.5,4.2 3.5,2 3.5,22 8.5,19.8"
          fill="#d3d7cf"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="7.5,5.2 4.4,3.6 4.4,20.4 7.5,18.8"
          fill="#555753"
          stroke="#262626"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <rect
          x="2.4"
          y="1.8"
          width="1.6"
          height="20.4"
          fill="#888a85"
          stroke="#262626"
          strokeWidth="0.8"
        />
        {/* Blue KineFX character silhouette on the right */}
        <circle cx="16.5" cy="5.2" r="2" fill="#729fcf" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M13.7,8.5 L19.3,8.5 L21,13 L19.3,13.5 L18.3,10.5 L18,14.5 L20,19.8 L18.1,20.2 L16.5,15.5 L14.9,20.2 L13,19.8 L15,14.5 L14.7,10.5 L13.7,13.5 L12,13 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <circle cx="16.5" cy="9.5" r="0.9" fill="#fce94f" stroke="#c4a000" strokeWidth="0.55" />
        <circle cx="16.5" cy="14" r="0.9" fill="#fce94f" stroke="#c4a000" strokeWidth="0.55" />
        {/* Red import arrow pointing right from doorway */}
        <polygon
          points="6.2,11.2 10.2,11.2 10.2,9.5 13.5,12.2 10.2,14.9 10.2,13.2 6.2,13.2"
          fill="#ef2929"
          stroke="#a40000"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.secondarymotion',
    label: 'Secondary Motion',
    family: 'sop',
    description:
      'Character head in profile with a swinging amber ponytail and red secondary-motion arc arrows.',
    types: ['secondarymotion'],
    icons: ['sop_kinefx-secondarymotion'],
    refKey: 'SOP_kinefx-secondarymotion',
    render: () => (
      <g>
        {/* Ghosted secondary motion trail of ponytail */}
        <path
          d="M12.5,6.5 C16.5,5.5 20.5,8.5 21.5,13.5 C18.5,12.5 16,10.5 12.5,8.5 Z"
          fill="#fce94f"
          opacity="0.45"
          stroke="#c4a000"
          strokeWidth="0.6"
          strokeDasharray="1.2 1"
        />
        {/* Character head and neck */}
        <path
          d="M5,20.5 L6.5,15.5 C4.5,14.5 3.5,12 3.8,9.2 C4.2,6 6.8,4 9.8,4.2 C12.5,4.4 14,6.5 13.8,9.5 C13.5,12.5 11.8,14.8 9.8,15.5 L10.8,20.5 Z"
          fill="#d3d7cf"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Amber hair cap and swinging ponytail */}
        <path
          d="M4,9.5 C4,5.8 6.8,3.6 10.2,4 C11.8,4.2 13,5.2 13.4,6.8 C11.2,6.2 8.2,6.8 5.5,9.5 Z"
          fill="#e9b96e"
          stroke="#8f5902"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <path
          d="M12.8,6.8 C16.5,7.2 19.2,11 19.5,16.5 C16.5,15.2 14.8,12.2 12.6,9.2 Z"
          fill="#e9b96e"
          stroke="#8f5902"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Hair tie joint */}
        <circle cx="12.8" cy="7.8" r="1.1" fill="#ef2929" stroke="#262626" strokeWidth="0.65" />
        {/* Red motion arc */}
        <path
          d="M21.2,9.5 A9,9 0 0 1 20.5,18.5"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <polygon points="20.2,19.5 19.5,17.2 21.8,17.8" fill="#ef2929" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.skeleton',
    label: 'Skeleton',
    family: 'sop',
    description:
      'Blue 3D humanoid figure silhouette containing an internal bright-green KineFX joint and bone skeleton.',
    types: ['skeleton'],
    icons: ['sop_kinefx-skeleton'],
    refKey: 'SOP_kinefx-skeleton',
    render: () => (
      <g>
        {/* Translucent blue character body */}
        <circle
          cx="12"
          cy="4.2"
          r="2.1"
          fill="#d0dfef"
          stroke="#204a87"
          strokeWidth="0.85"
        />
        <path
          d="M7.5,7.5 L16.5,7.5 L19.8,13.2 L18,14.2 L15.5,9.8 L15,14.2 L17.5,21.2 L15.2,21.6 L12,15.5 L8.8,21.6 L6.5,21.2 L9,14.2 L8.5,9.8 L6,14.2 L4.2,13.2 Z"
          fill="#d0dfef"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Green internal skeleton bones */}
        <path
          d="M12,4.5 V14.2 M8.2,8.5 H15.8 M8.2,8.5 L5.2,13.5 M15.8,8.5 L18.8,13.5 M12,14.2 L9.5,15.2 L7.8,21 M12,14.2 L14.5,15.2 L16.2,21"
          fill="none"
          stroke="#4e9a06"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12,4.5 V14.2 M8.2,8.5 H15.8 M8.2,8.5 L5.2,13.5 M15.8,8.5 L18.8,13.5 M12,14.2 L9.5,15.2 L7.8,21 M12,14.2 L14.5,15.2 L16.2,21"
          fill="none"
          stroke="#8ae234"
          strokeWidth="0.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Green joint dots */}
        <g fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6">
          <circle cx="12" cy="8.5" r="1.1" />
          <circle cx="8.2" cy="8.5" r="1" />
          <circle cx="15.8" cy="8.5" r="1" />
          <circle cx="12" cy="14.2" r="1.1" />
          <circle cx="7.8" cy="21" r="0.95" />
          <circle cx="16.2" cy="21" r="0.95" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.kinefx.skeletonblend',
    label: 'Skeleton Blend',
    family: 'sop',
    description:
      'Blue KineFX character rig blending between a green skeleton pose on the left and an orange skeleton pose on the right.',
    types: ['skeletonblend'],
    icons: [
      'sop_kinefx-skeletonblend',
      'sop_kinefx-skeletonblend-2.0',
      'sop_kinefx-skeletonblend-3.0',
    ],
    refKey: 'SOP_kinefx-skeletonblend',
    render: () => (
      <g>
        {/* Orange target skeleton pose on the right */}
        <path
          d="M14.8,4.5 L14.5,13.5 M11.5,8.8 L18.5,8.2 L20.8,12.8 M14.5,13.5 L12.5,20.5 M14.5,13.5 L19.8,20.2"
          fill="none"
          stroke="#ce5c00"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill="#fcaf3e" stroke="#ce5c00" strokeWidth="0.6">
          <circle cx="14.8" cy="4.5" r="1.2" />
          <circle cx="14.6" cy="8.5" r="1.1" />
          <circle cx="18.5" cy="8.2" r="1" />
          <circle cx="14.5" cy="13.5" r="1.1" />
          <circle cx="19.8" cy="20.2" r="1.1" />
        </g>
        {/* Translucent blue character body */}
        <circle
          cx="9.5"
          cy="4.5"
          r="2"
          fill="#d0dfef"
          stroke="#204a87"
          strokeWidth="0.8"
        />
        <path
          d="M5.8,7.8 L13.2,7.8 L15.8,13 L14.2,13.8 L12.2,10 L11.8,14 L14,20.8 L12,21.2 L9.5,15.2 L7,21.2 L5,20.8 L7.2,14 L6.8,10 L4.8,13.8 L3.2,13 Z"
          fill="#d0dfef"
          fillOpacity="0.88"
          stroke="#204a87"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Green skeleton inside character */}
        <path
          d="M9.5,4.8 V14 M6.5,8.6 H12.5 M6.5,8.6 L4,13.2 M12.5,8.6 L15,13.2 M9.5,14 L6,20.8 M9.5,14 L13,20.8"
          fill="none"
          stroke="#4e9a06"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill="#8ae234" stroke="#4e9a06" strokeWidth="0.55">
          <circle cx="9.5" cy="8.6" r="1" />
          <circle cx="9.5" cy="14" r="1" />
          <circle cx="6" cy="20.8" r="0.9" />
          <circle cx="13" cy="20.8" r="0.9" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.kinefx.skeletonmirror',
    label: 'Skeleton Mirror',
    family: 'sop',
    description:
      'Front-facing blue humanoid torso split by a vertical mirror axis with green skeleton bones mirrored across left and right.',
    types: ['skeletonmirror'],
    icons: ['sop_kinefx-skeletonmirror'],
    refKey: 'SOP_kinefx-skeletonmirror',
    render: () => (
      <g>
        {/* Symmetric blue humanoid torso and arms */}
        <circle cx="12" cy="4.5" r="2.2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M7,8 L17,8 L21.2,13.5 L19.5,14.8 L16.2,10.5 L15.5,16.5 L17,21.2 L14.5,21.2 L13.2,17.2 H10.8 L9.5,21.2 L7,21.2 L8.5,16.5 L7.8,10.5 L4.5,14.8 L2.8,13.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Left green skeleton */}
        <path
          d="M12,9 L7.8,9.5 L3.8,14 M12,9 V15.5 L8.2,20.8"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right mirrored skeleton */}
        <path
          d="M12,9 L16.2,9.5 L20.2,14 M12,15.5 L15.8,20.8"
          fill="none"
          stroke="#eeeeec"
          strokeWidth="1.1"
          strokeDasharray="1.4 1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Joints */}
        <circle cx="7.8" cy="9.5" r="1.1" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
        <circle cx="3.8" cy="14" r="1" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
        <circle cx="16.2" cy="9.5" r="1.1" fill="#eeeeec" stroke="#204a87" strokeWidth="0.6" />
        <circle cx="20.2" cy="14" r="1" fill="#eeeeec" stroke="#204a87" strokeWidth="0.6" />
        {/* Center vertical mirror plane line */}
        <line
          x1="12"
          y1="1.8"
          x2="12"
          y2="22.2"
          stroke="#262626"
          strokeWidth="1.1"
          strokeDasharray="1.8 1.3"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.smoothmotion',
    label: 'Smooth Motion',
    family: 'sop',
    description:
      'Outstretched blue character arms and shoulders with a smooth arc trajectory above a faded ghost pose.',
    types: ['smoothmotion'],
    icons: ['sop_kinefx-smoothmotion'],
    refKey: 'SOP_kinefx-smoothmotion',
    render: () => (
      <g>
        {/* Upper ghosted motion pose */}
        <path
          d="M2.5,9.5 C6,7.5 9,8 12,8 C15,8 18,7.5 21.5,9.5"
          fill="none"
          stroke="#babdb6"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Smooth motion curve */}
        <path
          d="M3,6.2 Q12,2.5 21,6.2"
          fill="none"
          stroke="#729fcf"
          strokeWidth="1.1"
          strokeDasharray="1.6 1.1"
          strokeLinecap="round"
        />
        {/* Main blue character head, shoulders, and outstretched arms */}
        <circle cx="12" cy="9.5" r="2.3" fill="#d0dfef" stroke="#193774" strokeWidth="0.85" />
        <path
          d="M2.2,12.5 L8.8,12.2 L12,12.2 L15.2,12.2 L21.8,12.5 L21.5,14.5 L15.2,14.5 L14.8,21 H9.2 L8.8,14.5 L2.5,14.5 Z"
          fill="#729fcf"
          stroke="#193774"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Highlight chest/shoulders */}
        <path
          d="M9.2,13.2 H14.8 L14.4,17.5 H9.6 Z"
          fill="#d0dfef"
          stroke="none"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.stabilizejoint',
    label: 'Stabilize Joint',
    family: 'sop',
    description:
      'Bent blue character arm and hand with a stabilized green elbow/wrist joint and a red curved rotation arrow.',
    types: ['stabilizejoint'],
    icons: ['sop_kinefx-stabilizejoint'],
    refKey: 'SOP_kinefx-stabilizejoint',
    render: () => (
      <g>
        {/* Red stabilization arc arrow */}
        <path
          d="M4.2,20.2 A10,10 0 0 1 14.8,7.8"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <polygon points="16.2,8 13.8,6.5 14.2,9.2" fill="#ef2929" />
        {/* Forearm and upper arm */}
        <path
          d="M6.2,9.2 L12,18.8 C12.8,20 14.5,20.2 15.8,19.2 L21.5,13.5 C22.2,12.5 22,10.5 21,9.8 L13.8,16 L8.8,7.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Hand silhouette at top-left */}
        <path
          d="M5.2,8.5 C4.2,7.2 3.5,5.5 4.2,4.5 C4.8,3.8 5.8,5.2 6.2,5.8 L5.5,3.2 C6,2.6 6.8,3.2 7.2,5.2 L7.5,2.8 C8.2,2.5 8.6,3.5 8.5,5.8 L9.5,4.2 C10,4.2 9.8,6.2 8.8,7.8 Z"
          fill="#fabfbf"
          stroke="#a40000"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {/* Stabilized green joint */}
        <ellipse
          cx="7.5"
          cy="8.4"
          rx="2.1"
          ry="1.2"
          transform="rotate(-32 7.5 8.4)"
          fill="#8ae234"
          stroke="#262626"
          strokeWidth="0.75"
        />
      </g>
    ),
  },
];
