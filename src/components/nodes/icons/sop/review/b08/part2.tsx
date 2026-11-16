import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 8, Part 2 (icons 20 to 29): built-in Houdini SOP icons under review.
 */
export const BATCH_08_PART_2: OperatorIconDef[] = [
  {
    id: 'sop.agentconfigurejoints',
    label: 'Agent Configure Joints',
    family: 'sop',
    description:
      'Segmented orange crowd agent figure with a translucent blue joint-limit cone around the shoulder joint.',
    types: ['agentconfigurejoints'],
    icons: ['sop_agentconfigurejoints'],
    refKey: 'SOP_agentconfigurejoints',
    render: () => (
      <g>
        {/* Translucent blue joint limit cone */}
        <polygon
          points="9,8.2 2.2,4.2 2.2,12.5"
          fill="#729fcf"
          fillOpacity="0.35"
          stroke="#204a87"
          strokeWidth="0.7"
        />
        <ellipse
          cx="2.6"
          cy="8.3"
          rx="1.2"
          ry="4.1"
          fill="#729fcf"
          fillOpacity="0.45"
          stroke="#204a87"
          strokeWidth="0.75"
        />
        {/* Segmented orange agent body */}
        <g fill="#f4b167" stroke="#66330d" strokeWidth="0.8" strokeLinejoin="round">
          <ellipse cx="13" cy="4.2" rx="2" ry="2.2" fill="#f3d196" />
          <rect x="10" y="6.8" width="6" height="7.4" rx="2.2" fill="#ee8424" />
          <path d="M10,7.5 L5,10.5 C4.2,11.2 5,12.5 5.8,11.8 L10.2,9.2 Z" />
          <path d="M16,7.5 L20.2,12 C21,12.8 20,14 19.2,13.2 L15.8,9.5 Z" />
          <rect x="9.8" y="14.2" width="2.6" height="7.2" rx="1.2" />
          <rect x="13.6" y="14.2" width="2.6" height="7.2" rx="1.2" />
        </g>
        {/* Highlighted red joint pivot */}
        <circle cx="9.8" cy="8.2" r="1.2" fill="#ef2929" stroke="#262626" strokeWidth="0.6" />
      </g>
    ),
  },
  {
    id: 'sop.agentconstraintnetwork',
    label: 'Agent Constraint Network',
    family: 'sop',
    description:
      'Interlocking gray ragdoll bone links connected by red and blue constraint pins.',
    types: ['agentconstraintnetwork'],
    icons: ['sop_agentconstraintnetwork'],
    refKey: 'SOP_agentconstraintnetwork',
    render: () => (
      <g>
        {/* Back gray bone link */}
        <path
          d="M5,6.5 C5,4.2 8.5,4.2 10.5,6.2 L18.5,14.2 C20.5,16.2 17.5,19.5 15.5,17.5 L7.5,9.5 C5.5,7.5 5,8 5,6.5 Z"
          fill="#babdb6"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Upper cross link */}
        <ellipse
          cx="14.5"
          cy="7.2"
          rx="5.5"
          ry="2.4"
          transform="rotate(-18 14.5 7.2)"
          fill="#d3d7cf"
          stroke="#262626"
          strokeWidth="0.85"
        />
        {/* Lower cross link */}
        <ellipse
          cx="9.5"
          cy="16.8"
          rx="5.5"
          ry="2.4"
          transform="rotate(-18 9.5 16.8)"
          fill="#d3d7cf"
          stroke="#262626"
          strokeWidth="0.85"
        />
        {/* Constraint network lines and pins */}
        <line
          x1="9.5"
          y1="16.8"
          x2="14.5"
          y2="7.2"
          stroke="#ef2929"
          strokeWidth="1.2"
          strokeDasharray="1.5 1"
        />
        <circle cx="14.5" cy="7.2" r="1.5" fill="#427dd2" stroke="#204a87" strokeWidth="0.7" />
        <circle cx="9.5" cy="16.8" r="1.5" fill="#ef5429" stroke="#ca0000" strokeWidth="0.7" />
      </g>
    ),
  },
  {
    id: 'sop.agentdefinitioncache',
    label: 'Agent Definition Cache',
    family: 'sop',
    description:
      'Blue crowd agent figure above a silver disk cache drive with a green status LED.',
    types: ['agentdefinitioncache'],
    icons: ['sop_agentdefinitioncache'],
    refKey: 'SOP_agentdefinitioncache',
    render: () => (
      <g>
        {/* Blue agent figure in upper half */}
        <circle cx="10.5" cy="3.8" r="1.8" fill="#d0dfef" stroke="#204a87" strokeWidth="0.8" />
        <path
          d="M7.2,6.5 L13.8,6.5 L15.5,10.8 L14,11.4 L12.8,8.8 L12.5,13.5 H8.5 L8.2,8.8 L7,11.4 L5.5,10.8 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Perspective disk drive cache box at bottom */}
        <polygon
          points="6.5,12.5 18.5,12.5 21.2,17.8 3.8,17.8"
          fill="#e4e4e4"
          stroke="#535353"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <rect
          x="3.8"
          y="17.8"
          width="17.4"
          height="3.8"
          rx="0.6"
          fill="#bbbbbb"
          stroke="#535353"
          strokeWidth="0.9"
        />
        {/* Drive slot and green LED */}
        <rect x="5.5" y="19" width="6.5" height="1.4" fill="#838383" />
        <circle cx="18.5" cy="19.7" r="0.9" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.5" />
      </g>
    ),
  },
  {
    id: 'sop.agentlayer',
    label: 'Agent Layer',
    family: 'sop',
    description:
      'Blue crowd agent torso equipped with a gold shoulder guard and a purple prop shield layer.',
    types: ['agentlayer'],
    icons: ['sop_agentlayer'],
    refKey: 'SOP_agentlayer',
    render: () => (
      <g>
        {/* Blue crowd agent head and torso */}
        <circle cx="14" cy="5.2" r="2.5" fill="#d0dfef" stroke="#204a87" strokeWidth="0.9" />
        <path
          d="M9.2,9.2 C9.2,8.2 11,7.8 14,7.8 C17,7.8 19.2,8.5 20.2,11 L21.2,19.8 H9.5 L8.2,13.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Gold/amber shoulder armor layer */}
        <path
          d="M14.5,8.2 C17.8,8.2 20.5,9.8 21.2,12.5 C18.5,12.8 16.2,11.8 14.5,10.2 Z"
          fill="#e9b96e"
          stroke="#8f5902"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Purple/plum shield/equipment layer on left arm */}
        <path
          d="M4.2,11.5 C4.2,9 7.5,8.5 10.5,10.2 C11.2,13.8 9.8,17.5 6.8,18.5 C4.5,17.2 4.2,14.2 4.2,11.5 Z"
          fill="#ad7fa8"
          stroke="#5c3566"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <circle cx="7.4" cy="13.8" r="1.2" fill="#fce94f" stroke="#8f5902" strokeWidth="0.6" />
      </g>
    ),
  },
  {
    id: 'sop.agentlookat',
    label: 'Agent Look At',
    family: 'sop',
    description:
      'Blue crowd agent head and shoulders turning to look along a red sightline toward a target.',
    types: ['agentlookat'],
    icons: ['crowds_agentlookat', 'sop_agentlookat'],
    refKey: 'SOP_agentlookat',
    render: () => (
      <g>
        {/* Agent shoulders and torso */}
        <path
          d="M2.5,19.5 C3,15.5 6,13.5 10.5,13.5 C15,13.5 17.8,15.5 18.5,19.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Agent head turned toward upper-right */}
        <circle
          cx="10.5"
          cy="8.5"
          r="3.8"
          fill="#d0dfef"
          stroke="#204a87"
          strokeWidth="0.9"
        />
        {/* Eye/gaze direction line and red target */}
        <line
          x1="12.5"
          y1="7.8"
          x2="19.5"
          y2="5.2"
          stroke="#ef2929"
          strokeWidth="1.15"
          strokeDasharray="1.5 1"
          strokeLinecap="round"
        />
        <circle cx="20.2" cy="4.8" r="1.6" fill="#ef2929" stroke="#a40000" strokeWidth="0.7" />
      </g>
    ),
  },
  {
    id: 'sop.agentmetadata',
    label: 'Agent Metadata',
    family: 'sop',
    description:
      'Blue crowd agent alongside bright-green metadata list lines.',
    types: ['agentmetadata'],
    icons: ['sop_agentmetadata'],
    refKey: 'SOP_agentmetadata',
    render: () => (
      <g>
        {/* Blue crowd agent on the right */}
        <circle cx="15" cy="4.8" r="2.1" fill="#d0dfef" stroke="#193774" strokeWidth="0.85" />
        <path
          d="M11.2,8.2 L18.8,8.2 L21.2,13.2 L19.5,14 L17.8,10.5 L17.4,15 L19.5,21 L17.4,21.4 L15,16 L12.6,21.4 L10.5,21 L12.6,15 L12.2,10.5 L10.5,14 L8.8,13.2 Z"
          fill="#729fcf"
          stroke="#193774"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Green metadata card / rows on the left */}
        <rect
          x="2.2"
          y="4.5"
          width="7.2"
          height="9.2"
          rx="1"
          fill="#193774"
          stroke="#262626"
          strokeWidth="0.75"
        />
        <line x1="3.6" y1="6.8" x2="8" y2="6.8" stroke="#8ae234" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="3.6" y1="9.1" x2="7.2" y2="9.1" stroke="#8ae234" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="3.6" y1="11.4" x2="8" y2="11.4" stroke="#8ae234" strokeWidth="1.1" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'sop.agentrelationship',
    label: 'Agent Relationship',
    family: 'sop',
    description:
      'Large parent crowd agent and smaller child crowd agent holding hands to show hierarchical agent relationships.',
    types: ['agentrelationship'],
    icons: ['sop_agentrelationship'],
    refKey: 'SOP_agentrelationship',
    render: () => (
      <g>
        {/* Large parent agent on the right */}
        <circle cx="16.5" cy="4.5" r="2.2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M13,7.8 L20,7.8 L21.8,13.2 L20,13.8 L18.8,10.2 L18.5,14.8 L20.2,21.2 L18,21.2 L16.5,16 L15,21.2 L12.8,21.2 L14.2,14.8 L13.8,10.5 L11.5,14.2 L10.2,13.2 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Smaller child agent on the left */}
        <circle cx="6.5" cy="9.2" r="1.7" fill="#d0dfef" stroke="#204a87" strokeWidth="0.8" />
        <path
          d="M3.8,11.8 L9.2,11.8 L11.2,14.2 L10.2,15 L8.5,13.5 L8.2,16.8 L9.5,21.2 L7.8,21.2 L6.5,17.8 L5.2,21.2 L3.5,21.2 L4.8,16.8 L4.5,13.5 L3.2,15.8 L2,15 Z"
          fill="#c4d7eb"
          stroke="#204a87"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.agentterrainadaptation',
    label: 'Agent Terrain Adaptation',
    family: 'sop',
    description:
      'Blue crowd agent walking uphill with legs adapting to a stepped amber terrain slope.',
    types: ['adapttoterrain', 'agentterrainadaptation'],
    icons: ['sop_agentterrainadaptation', 'sop_kinefx-adapttoterrain'],
    refKey: 'SOP_agentterrainadaptation',
    render: () => (
      <g>
        {/* Stepped amber terrain slope at bottom */}
        <path
          d="M2,13.5 L8.5,13.5 L12.5,16.5 L17.5,16.5 L21.8,20.5 V21.8 H2 Z"
          fill="#e9b96e"
          stroke="#8f5902"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M2,15.5 H7.5 L11.5,18.5 H16.5 L20,21.8 H2 Z"
          fill="#c17d11"
          stroke="none"
        />
        {/* Striding blue agent adapting feet to steps */}
        <circle cx="13.5" cy="3.8" r="2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M10.2,6.8 L16.5,6.8 L19.2,11.2 L17.6,12 L15.5,8.8 L15,12.5 L18,16.5 L16,16.8 L13.2,13.2 L10.2,13.5 L8.2,13.5 L11.2,10.8 L11,8.8 L8.5,11.5 L7,10.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.agenttransformgroup',
    label: 'Agent Transform Group',
    family: 'sop',
    description:
      'Blue crowd agent with its upper torso and arm joints highlighted in red and green as a transform group.',
    types: ['agenttransformgroup'],
    icons: ['sop_agenttransformgroup'],
    refKey: 'SOP_agenttransformgroup',
    render: () => (
      <g>
        {/* Ground shadow */}
        <ellipse cx="12" cy="21" rx="7.5" ry="1.5" fill="#babdb6" opacity="0.55" />
        {/* Striding blue humanoid agent */}
        <circle cx="12" cy="4.2" r="2.2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.9" />
        <path
          d="M8,7.6 L15.5,7.6 L19,12.8 L17.2,13.6 L14.5,9.8 L14,14.2 L17.5,20.5 L15.2,21.2 L11.8,15.5 L8.5,21.2 L6.4,20.5 L9.5,14.2 L9,9.8 L6.2,13.8 L4.5,12.8 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Highlighted red transform group on right arm and shoulder */}
        <path
          d="M12,8.8 L15.2,8.8 L18.2,13.2"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="8.8" r="1.2" fill="#ef2929" stroke="#262626" strokeWidth="0.6" />
        <circle cx="15.2" cy="8.8" r="1.1" fill="#ef2929" stroke="#262626" strokeWidth="0.6" />
        {/* Unselected green lower joint */}
        <circle cx="12" cy="14.2" r="1" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
      </g>
    ),
  },
  {
    id: 'sop.agentunpack',
    label: 'Agent Unpack',
    family: 'sop',
    description:
      'Open cardboard package box with a red upward arrow unpacking a character.',
    types: ['agentunpack', 'packcharacter', 'unpackcharacter'],
    icons: ['sop_agentunpack', 'sop_apex-packcharacter', 'sop_apex-unpackcharacter'],
    refKey: 'SOP_agentunpack',
    render: () => (
      <g>
        {/* Box lower body */}
        <polygon
          points="3.5,12.5 13.5,11.2 19.5,15.5 19.5,20.2 9.5,21.8 3.5,17.2"
          fill="#a5ae9d"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Open cardboard box flaps */}
        <polygon
          points="3.5,12.5 7.5,7.2 17.5,6.2 13.5,11.2"
          fill="#c8a142"
          stroke="#442b01"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon
          points="13.5,11.2 17.5,6.2 22,10.2 19.5,15.5"
          fill="#ab8832"
          stroke="#442b01"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Red unpack arrow rising from the box */}
        <polygon
          points="10.2,14.5 10.2,7.5 7.8,7.5 11.8,2.5 15.8,7.5 13.4,7.5 13.4,14.5"
          fill="#ef2929"
          stroke="#660d0b"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
];
