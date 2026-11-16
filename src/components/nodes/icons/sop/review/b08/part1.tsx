import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 8, Part 1 (icons 10 to 19): built-in Houdini SOP icons under review.
 */
export const BATCH_08_PART_1: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.usdanimimport',
    label: 'UsdSkel Animation Import',
    family: 'sop',
    description:
      'Open doorway on the left with a red import arrow pointing right toward an animated KineFX character rig with yellow joints.',
    types: ['usdanimimport'],
    icons: ['sop_kinefx-usdanimimport'],
    refKey: 'SOP_kinefx-usdanimimport',
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
        {/* Animated KineFX character on the right */}
        <circle cx="16.5" cy="5" r="2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M13.5,8.2 L19.5,8.2 L21.2,12.5 L19.6,13.2 L18.4,10.2 L18,14.2 L20.4,19.8 L18.5,20.2 L16.5,15.5 L14.5,20.2 L12.6,19.8 L15,14.2 L14.6,10.2 L13.4,13.2 L11.8,12.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Yellow animated joints */}
        <path
          d="M16.5,8.5 V14.2 M14.2,9 H18.8"
          stroke="#fce94f"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="16.5" cy="9" r="1" fill="#fce94f" stroke="#c4a000" strokeWidth="0.55" />
        <circle cx="16.5" cy="14.2" r="1" fill="#fce94f" stroke="#c4a000" strokeWidth="0.55" />
        {/* Red import arrow */}
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
    id: 'sop.kinefx.usdcharacterimport',
    label: 'UsdSkel Character Import',
    family: 'sop',
    description:
      'Open doorway on the left with a red import arrow pointing right toward a blue UsdSkel character figure with yellow joints.',
    types: ['usdcharacterimport'],
    icons: ['sop_kinefx-usdcharacterimport'],
    refKey: 'SOP_kinefx-usdcharacterimport',
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
        {/* Blue character figure */}
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
        {/* Red import arrow */}
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
    id: 'sop.kinefx.usdskinimport',
    label: 'UsdSkel Skin Import',
    family: 'sop',
    description:
      'Open doorway on the left with a red import arrow pointing right toward a light-blue UsdSkel character skin mesh.',
    types: ['usdskinimport'],
    icons: ['sop_kinefx-usdskinimport'],
    refKey: 'SOP_kinefx-usdskinimport',
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
        {/* Light-blue character skin mesh on the right */}
        <circle cx="16.5" cy="5.2" r="2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M13.7,8.5 L19.3,8.5 L21,13 L19.3,13.5 L18.3,10.5 L18,14.5 L20,19.8 L18.1,20.2 L16.5,15.5 L14.9,20.2 L13,19.8 L15,14.5 L14.7,10.5 L13.7,13.5 L12,13 Z"
          fill="#d0dfef"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Subtle mesh skin topology lines */}
        <path
          d="M14.8,11.2 H18.2 M15,13.8 H18"
          stroke="#729fcf"
          strokeWidth="0.65"
        />
        {/* Red import arrow */}
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
    id: 'sop.kinefx.visrig',
    label: 'Visualize Rig',
    family: 'sop',
    description:
      'Blue KineFX character figure with a circular magnifying lens over the torso revealing bright-green rig bones and joints.',
    types: ['visrig'],
    icons: ['sop_kinefx-visrig'],
    refKey: 'SOP_kinefx-visrig',
    render: () => (
      <g>
        {/* Blue humanoid figure */}
        <circle cx="11" cy="4.2" r="2.1" fill="#729fcf" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M6.8,7.6 L15.2,7.6 L18.2,13 L16.5,13.8 L14.2,9.8 L13.8,14.2 L16,21.2 L13.8,21.6 L11,15.5 L8.2,21.6 L6,21.2 L8.2,14.2 L7.8,9.8 L5.5,13.8 L3.8,13 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Magnifying glass handle */}
        <line
          x1="15.8"
          y1="14.8"
          x2="21.2"
          y2="20.2"
          stroke="#262626"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="15.8"
          y1="14.8"
          x2="21.2"
          y2="20.2"
          stroke="#888a85"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Magnifying glass lens showing internal rig */}
        <circle
          cx="12"
          cy="11.2"
          r="5"
          fill="#d0dfef"
          stroke="#262626"
          strokeWidth="1.1"
        />
        {/* Green rig bones and joints inside lens */}
        <path
          d="M11,7.2 V15 M8,9.2 L11,9.5 L15.5,9.2 M11,14 L9,15.5 M11,14 L13.5,15.5"
          fill="none"
          stroke="#4e9a06"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle cx="11" cy="9.5" r="1.15" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
        <circle cx="11" cy="13.8" r="1.15" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
        <circle cx="14.5" cy="9.3" r="0.95" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
      </g>
    ),
  },
  {
    id: 'sop.agent',
    label: 'Agent',
    family: 'sop',
    description:
      'Striding blue 3D crowd agent character with internal bright-green rig joints.',
    types: ['agent', 'agentprep', 'agentproxy'],
    icons: ['sop_agent', 'sop_agentprep', 'sop_agentproxy'],
    refKey: 'SOP_agent',
    render: () => (
      <g>
        {/* Ground shadow */}
        <ellipse cx="12" cy="21" rx="7.5" ry="1.6" fill="#babdb6" opacity="0.55" />
        {/* Striding blue humanoid agent */}
        <circle cx="12" cy="4.2" r="2.2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.9" />
        <path
          d="M8,7.6 L15.5,7.6 L19,12.8 L17.2,13.6 L14.5,9.8 L14,14.2 L17.5,20.5 L15.2,21.2 L11.8,15.5 L8.5,21.2 L6.4,20.5 L9.5,14.2 L9,9.8 L6.2,13.8 L4.5,12.8 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Internal green rig bones and joints */}
        <path
          d="M12,8.5 V14.2 L15.8,20.2 M12,14.2 L7.8,20.2 M8.8,8.8 H14.8"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="8.8" r="1.1" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
        <circle cx="12" cy="14.2" r="1.1" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
      </g>
    ),
  },
  {
    id: 'sop.agentaddmldeformer',
    label: 'Agent Add ML Deformer',
    family: 'sop',
    description:
      'Three blue crowd agent figures in formation representing an agent group with an ML deformer.',
    types: ['agentaddmldeformer'],
    icons: ['sop_agentaddmldeformer'],
    refKey: 'SOP_agentaddmldeformer',
    render: () => (
      <g>
        {/* Back-left agent */}
        <circle cx="6.5" cy="6.2" r="1.6" fill="#c4d7eb" stroke="#204a87" strokeWidth="0.75" />
        <path
          d="M4,9 L9,9 L10.2,13.5 L8.6,13.8 L8,18.5 H5 L4.4,13.8 L2.8,13.5 Z"
          fill="#c4d7eb"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        {/* Back-right agent */}
        <circle cx="17.5" cy="6.2" r="1.6" fill="#c4d7eb" stroke="#204a87" strokeWidth="0.75" />
        <path
          d="M15,9 L20,9 L21.2,13.5 L19.6,13.8 L19,18.5 H16 L15.4,13.8 L13.8,13.5 Z"
          fill="#c4d7eb"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        {/* Foreground center agent */}
        <circle cx="12" cy="4.5" r="2" fill="#d0dfef" stroke="#00255d" strokeWidth="0.9" />
        <path
          d="M8.5,7.8 L15.5,7.8 L17.8,13.2 L16,13.8 L14.5,10.2 L14.2,14.8 L16,21.2 L14,21.5 L12,16.2 L10,21.5 L8,21.2 L9.8,14.8 L9.5,10.2 L8,13.8 L6.2,13.2 Z"
          fill="#729fcf"
          stroke="#00255d"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Deformer lattice lines across chest */}
        <path
          d="M9.5,9.5 L14.5,13.5 M14.5,9.5 L9.5,13.5 M9.2,11.5 H14.8"
          stroke="#d0dfef"
          strokeWidth="0.65"
        />
      </g>
    ),
  },
  {
    id: 'sop.agentclip',
    label: 'Agent Clip',
    family: 'sop',
    description:
      'Wavy filmstrip ribbon with sprocket holes framing a dark striding crowd agent silhouette.',
    types: ['agentclip'],
    icons: ['sop_agentclip'],
    refKey: 'SOP_agentclip',
    render: () => (
      <g>
        {/* Wavy filmstrip background */}
        <path
          d="M2.2,9.5 C6,4.5 11,4.5 14.5,7.5 L18.2,20.2 C14,17.2 9,17.5 5.2,21.8 Z"
          fill="#4a4c48"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Inner bright film frame */}
        <path
          d="M5.2,9.2 C7.8,6.8 11.2,6.8 13.5,8.6 L16,17.4 C13.5,15.8 10,16 7.4,18.4 Z"
          fill="#eeeeec"
          stroke="#555753"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        {/* Sprocket holes along film edges */}
        <g fill="#eeeeec">
          <circle cx="4" cy="10.2" r="0.55" />
          <circle cx="4.8" cy="13.2" r="0.55" />
          <circle cx="5.6" cy="16.2" r="0.55" />
          <circle cx="6.4" cy="19.2" r="0.55" />
          <circle cx="14.2" cy="9.5" r="0.55" />
          <circle cx="15" cy="12.5" r="0.55" />
          <circle cx="15.8" cy="15.5" r="0.55" />
          <circle cx="16.6" cy="18.5" r="0.55" />
        </g>
        {/* Striding crowd agent in foreground */}
        <circle cx="14.5" cy="6.2" r="1.8" fill="#555753" stroke="#eeeeec" strokeWidth="0.7" />
        <path
          d="M11.5,9.2 L17.5,8.8 L20.5,13.5 L18.8,14.2 L16.8,11 L16.5,15.2 L19.2,21 L17.2,21.5 L14.5,16.5 L12,21.5 L10,20.8 L12.8,15.2 L12.5,11 L10.5,14 L9,13 Z"
          fill="#2e3436"
          stroke="#eeeeec"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.agentclipproperties',
    label: 'Agent Clip Properties',
    family: 'sop',
    description:
      'Blue walking crowd agent on the left next to yellow and orange animation clip timeline bars on the right.',
    types: ['agentclipproperties', 'agentedit'],
    icons: ['sop_agentclipproperties', 'sop_agentedit'],
    refKey: 'SOP_agentclipproperties',
    render: () => (
      <g>
        {/* Blue walking agent on the left */}
        <circle cx="8.2" cy="4.5" r="2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M5,7.8 L11.4,7.8 L13.8,12.8 L12.2,13.5 L10.6,10.2 L10.2,14.5 L12.6,20.8 L10.6,21.2 L8.2,15.8 L5.8,21.2 L3.8,20.8 L6.2,14.5 L5.8,10.2 L4.2,13.5 L2.6,12.8 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Clip property bars on the right */}
        <rect
          x="14.2"
          y="5.2"
          width="7.6"
          height="3.2"
          rx="0.8"
          fill="#ecef52"
          stroke="#a2a437"
          strokeWidth="0.8"
        />
        <rect
          x="15.2"
          y="10.2"
          width="6.6"
          height="3.2"
          rx="0.8"
          fill="#fcaf3e"
          stroke="#ce5c00"
          strokeWidth="0.8"
        />
        <rect
          x="14.2"
          y="15.2"
          width="7.6"
          height="3.2"
          rx="0.8"
          fill="#d9daa5"
          stroke="#a2a437"
          strokeWidth="0.8"
        />
      </g>
    ),
  },
  {
    id: 'sop.agentcliptransitiongraph',
    label: 'Agent Clip Transition Graph',
    family: 'sop',
    description:
      'Blue walking crowd agent on the left connected to a clip transition graph with red arrows on the right.',
    types: ['agentcliptransitiongraph', 'testsim_crowdtransition'],
    icons: ['sop_agentcliptransitiongraph', 'sop_testsim_crowdtransition'],
    refKey: 'SOP_agentcliptransitiongraph',
    render: () => (
      <g>
        {/* Blue walking agent on the left */}
        <circle cx="7.8" cy="4.5" r="2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M4.6,7.8 L11,7.8 L13.4,12.8 L11.8,13.5 L10.2,10.2 L9.8,14.5 L12.2,20.8 L10.2,21.2 L7.8,15.8 L5.4,21.2 L3.4,20.8 L5.8,14.5 L5.4,10.2 L3.8,13.5 L2.2,12.8 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Transition graph edges (red arrows) */}
        <path
          d="M16,6.5 L20,11.5 L16,17.5"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Transition graph nodes */}
        <circle cx="15.8" cy="6.2" r="1.9" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <circle cx="20.2" cy="11.8" r="1.9" fill="#729fcf" stroke="#204a87" strokeWidth="0.85" />
        <circle cx="15.8" cy="17.8" r="1.9" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
      </g>
    ),
  },
  {
    id: 'sop.agentcollisionlayer',
    label: 'Agent Collision Layer',
    family: 'sop',
    description:
      'Crowd agent encased in segmented orange collision capsules around the head, torso, arms, and legs.',
    types: ['agentcollisionlayer'],
    icons: ['sop_agentcollisionlayer'],
    refKey: 'SOP_agentcollisionlayer',
    render: () => (
      <g>
        {/* Guide arc */}
        <path
          d="M4,12 C6,6 18,6 20,12"
          fill="none"
          stroke="#729fcf"
          strokeWidth="0.75"
          strokeDasharray="1.4 1"
        />
        {/* Orange collision capsules */}
        <g fill="#f4b167" stroke="#66330d" strokeWidth="0.8" strokeLinejoin="round">
          {/* Head capsule */}
          <ellipse cx="12" cy="4.2" rx="2" ry="2.2" fill="#f3d196" />
          {/* Torso capsule */}
          <rect x="9" y="6.8" width="6" height="7.4" rx="2.2" fill="#ee8424" />
          {/* Left arm capsule */}
          <path d="M8.8,7.4 L4.5,12.2 C3.8,13 4.8,14.2 5.6,13.4 L9.2,9.5 Z" />
          {/* Right arm capsule */}
          <path d="M15.2,7.4 L19.5,12.2 C20.2,13 19.2,14.2 18.4,13.4 L14.8,9.5 Z" />
          {/* Left leg capsule */}
          <rect x="8.8" y="14.2" width="2.6" height="7.2" rx="1.2" />
          {/* Right leg capsule */}
          <rect x="12.6" y="14.2" width="2.6" height="7.2" rx="1.2" />
        </g>
        {/* Highlight bands on collision capsules */}
        <line x1="9.6" y1="10.5" x2="14.4" y2="10.5" stroke="#f3d196" strokeWidth="0.7" />
      </g>
    ),
  },
];
