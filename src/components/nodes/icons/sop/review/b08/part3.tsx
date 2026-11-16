import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 8, Part 3 (icons 30 to 39): built-in Houdini SOP icons under review.
 */
export const BATCH_08_PART_3: OperatorIconDef[] = [
  {
    id: 'sop.agentvellumunpack',
    label: 'Agent Vellum Unpack',
    family: 'sop',
    description:
      'Blue crowd agent character wearing a draped red Vellum cloth cape with a gold collar.',
    types: ['agentvellumunpack'],
    icons: ['sop_agentvellumunpack'],
    refKey: 'SOP_agentvellumunpack',
    render: () => (
      <g>
        {/* Flowing red Vellum cape behind the agent */}
        <path
          d="M11.5,7.5 C7.5,8.5 4.2,12.5 3.2,18.8 C6.8,19.8 10.5,19.5 14,18.2 Z"
          fill="#ef2929"
          stroke="#a40000"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Blue crowd agent figure */}
        <circle cx="13.5" cy="4.2" r="2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M10.5,7.5 L16.5,7.5 L19,12.5 L17.4,13.2 L15.8,9.8 L15.4,14.5 L17.6,21 L15.6,21.4 L13.5,15.8 L11.4,21.4 L9.4,21 L11.6,14.5 L11.2,9.8 L9.6,13.2 L8,12.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Gold/yellow Vellum tunic/collar */}
        <path
          d="M10.5,7.5 H16.5 L15.8,12.8 H11.2 Z"
          fill="#edd400"
          stroke="#937703"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.crowdassignlayers',
    label: 'Crowd Assign Layers',
    family: 'sop',
    description:
      'Three crowd agents assigned distinct colored equipment layers in red, yellow, and green.',
    types: ['crowdassignlayers'],
    icons: ['sop_crowdassignlayers'],
    refKey: 'SOP_crowdassignlayers',
    render: () => (
      <g>
        {/* Left agent with green layer */}
        <circle cx="6.2" cy="6.2" r="1.7" fill="#d0dfef" stroke="#204a87" strokeWidth="0.75" />
        <path
          d="M3.5,9 H8.8 L9.8,14 H8.2 V19.5 H4.2 V14 H2.6 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <rect x="4" y="9" width="4.4" height="4.2" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.65" />
        {/* Right agent with yellow layer */}
        <circle cx="17.8" cy="6.2" r="1.7" fill="#d0dfef" stroke="#204a87" strokeWidth="0.75" />
        <path
          d="M15.2,9 H20.5 L21.4,14 H19.8 V19.5 H15.8 V14 H14.2 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <rect x="15.6" y="9" width="4.4" height="4.2" fill="#fce94f" stroke="#c4a000" strokeWidth="0.65" />
        {/* Center foreground agent with red layer */}
        <circle cx="12" cy="4.5" r="2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M8.8,7.8 H15.2 L16.8,13.5 H14.8 V21 H9.2 V13.5 H7.2 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <rect x="9.2" y="7.8" width="5.6" height="5.2" fill="#ef2929" stroke="#a40000" strokeWidth="0.7" />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpath',
    label: 'Crowd MotionPath',
    family: 'sop',
    description:
      'Blue crowd agent walking along a winding bright-green S-curve motion path on the ground.',
    types: ['crowdmotionpath'],
    icons: ['sop_crowdmotionpath'],
    refKey: 'SOP_crowdmotionpath',
    render: () => (
      <g>
        {/* Winding green S-curve motion path on the ground */}
        <path
          d="M3.5,10.5 C14,10.5 20.5,12 19.5,14 C18.5,15.8 4.5,16.5 4.5,18.5 C4.5,20.2 14,21.2 19.5,21.2"
          fill="none"
          stroke="#408b09"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M3.5,10.5 C14,10.5 20.5,12 19.5,14 C18.5,15.8 4.5,16.5 4.5,18.5 C4.5,20.2 14,21.2 19.5,21.2"
          fill="none"
          stroke="#7be028"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Blue walking crowd agent */}
        <circle cx="12" cy="4.2" r="2" fill="#d0dfef" stroke="#193774" strokeWidth="0.85" />
        <path
          d="M8.8,7.2 L15.2,7.2 L17.8,11.8 L16.2,12.5 L14.4,9.5 L14,13.8 L16.5,20.2 L14.5,20.6 L12,15 L9.5,20.6 L7.5,20.2 L10,13.8 L9.6,9.5 L7.8,12.5 L6.2,11.8 Z"
          fill="#608bc3"
          stroke="#193774"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpatharcinglayer',
    label: 'Crowd MotionPath Arcing Layer',
    family: 'sop',
    description:
      'Blue crowd agent flanked by two curved green turn-arc arrows indicating arcing motion path layers.',
    types: ['crowdmotionpatharcinglayer'],
    icons: ['sop_crowdmotionpatharcinglayer'],
    refKey: 'SOP_crowdmotionpatharcinglayer',
    render: () => (
      <g>
        {/* Left and right green arcing arrows */}
        <path
          d="M8.5,11 C3,11 2,6.5 7,4.2"
          fill="none"
          stroke="#4e9a06"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M8.5,11 C3,11 2,6.5 7,4.2"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <polygon points="8.5,3.5 5.2,2.8 6.5,6" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.55" />
        <path
          d="M15.5,11 C21,11 22,6.5 17,4.2"
          fill="none"
          stroke="#4e9a06"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M15.5,11 C21,11 22,6.5 17,4.2"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <polygon points="15.5,3.5 18.8,2.8 17.5,6" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.55" />
        {/* Center blue crowd agent */}
        <circle cx="12" cy="4.5" r="2" fill="#d0dfef" stroke="#193774" strokeWidth="0.85" />
        <path
          d="M8.8,7.6 L15.2,7.6 L17.6,12.5 L16,13.2 L14.4,10 L14,14.2 L16.4,20.8 L14.4,21.2 L12,15.5 L9.6,21.2 L7.6,20.8 L10,14.2 L9.6,10 L8,13.2 L6.4,12.5 Z"
          fill="#608bc3"
          stroke="#193774"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpathavoid',
    label: 'Crowd MotionPath Avoid',
    family: 'sop',
    description:
      'Blue crowd agent following a green motion path that curves around an orange obstacle cylinder.',
    types: ['crowdmotionpathavoid'],
    icons: ['sop_crowdmotionpathavoid'],
    refKey: 'SOP_crowdmotionpathavoid',
    render: () => (
      <g>
        {/* Green avoidance path arrow on ground */}
        <path
          d="M2.5,13.5 C7.5,16 13.5,16 19.5,15.5"
          fill="none"
          stroke="#4e9a06"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M2.5,13.5 C7.5,16 13.5,16 19.5,15.5"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <polygon
          points="22,15.5 18.2,13.2 18.5,17.8"
          fill="#8ae234"
          stroke="#4e9a06"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        {/* Orange obstacle cylinder on the left */}
        <path
          d="M3.2,15.5 V20 C3.2,21 5.2,21.6 7.5,21.6 C9.8,21.6 11.8,21 11.8,20 V15.5 Z"
          fill="#f57900"
          stroke="#ce5c00"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <ellipse
          cx="7.5"
          cy="15.5"
          rx="4.3"
          ry="1.4"
          fill="#fcaf3e"
          stroke="#ce5c00"
          strokeWidth="0.8"
        />
        {/* Striding blue crowd agent avoiding obstacle */}
        <circle cx="13.5" cy="3.8" r="1.9" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M10.5,6.8 L16.5,6.8 L18.8,11.2 L17.2,11.8 L15.6,9 L15.2,13 L17.5,19 L15.6,19.4 L13.5,14.2 L11.4,19.4 L9.5,19 L11.8,13 L11.4,9 L9.8,11.8 L8.2,11.2 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpathedit',
    label: 'Crowd MotionPath Edit',
    family: 'sop',
    description:
      'Blue crowd agent on a green S-curve motion path with yellow editable control points.',
    types: ['crowdmotionpathedit'],
    icons: ['sop_crowdmotionpathedit'],
    refKey: 'SOP_crowdmotionpathedit',
    render: () => (
      <g>
        {/* Winding green S-curve motion path */}
        <path
          d="M3.5,10.5 C14,10.5 20.5,12 19.5,14 C18.5,15.8 4.5,16.5 4.5,18.5 C4.5,20.2 14,21.2 19.5,21.2"
          fill="none"
          stroke="#408b09"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M3.5,10.5 C14,10.5 20.5,12 19.5,14 C18.5,15.8 4.5,16.5 4.5,18.5 C4.5,20.2 14,21.2 19.5,21.2"
          fill="none"
          stroke="#7be028"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Yellow edit control points along path */}
        <rect x="17.8" y="12.5" width="2.8" height="2.8" fill="#ecef52" stroke="#262626" strokeWidth="0.65" />
        <rect x="3.2" y="17" width="2.8" height="2.8" fill="#ecef52" stroke="#262626" strokeWidth="0.65" />
        <rect x="17.8" y="19.6" width="2.8" height="2.8" fill="#ecef52" stroke="#262626" strokeWidth="0.65" />
        {/* Blue crowd agent */}
        <circle cx="11.2" cy="4.2" r="2" fill="#d0dfef" stroke="#193774" strokeWidth="0.85" />
        <path
          d="M8,7.2 L14.4,7.2 L17,11.8 L15.4,12.5 L13.6,9.5 L13.2,13.8 L15.6,20.2 L13.6,20.6 L11.2,15 L8.8,20.6 L6.8,20.2 L9.2,13.8 L8.8,9.5 L7,12.5 L5.4,11.8 Z"
          fill="#608bc3"
          stroke="#193774"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpathevaluate',
    label: 'Crowd MotionPath Evaluate',
    family: 'sop',
    description:
      'Running blue crowd agent highlighted with a bright-green evaluated pose outline.',
    types: ['crowdmotionpathevaluate', 'motionclipevaluate'],
    icons: ['sop_crowdmotionpathevaluate', 'sop_kinefx-motionclipevaluate'],
    refKey: 'SOP_crowdmotionpathevaluate',
    render: () => (
      <g>
        {/* Bright-green evaluated pose halo */}
        <circle cx="13" cy="4.5" r="2.6" fill="none" stroke="#8ae234" strokeWidth="1.4" />
        <path
          d="M7.5,8.2 L18.5,6.8 L20.8,11.2 L16.2,10.2 L14.8,14.5 L19.5,20.2 L13,15.8 L7.2,21 L10.2,14.2 L9.8,10.2 L5.2,11.8 Z"
          fill="none"
          stroke="#8ae234"
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
        {/* Running blue crowd agent */}
        <circle cx="13" cy="4.5" r="2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M7.5,8.2 L18.5,6.8 L20.8,11.2 L19,11.8 L16.2,9.2 L14.8,14.5 L19.5,20.2 L17.5,21 L13,15.8 L7.2,21 L5.5,20 L10.2,14.2 L10.5,9.8 L5.8,12 L4.5,10.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpathfollow',
    label: 'Crowd MotionPath Follow',
    family: 'sop',
    description:
      'Running blue crowd agent guided between two parallel green motion-path arrows on the ground.',
    types: ['crowdmotionpathfollow'],
    icons: ['sop_crowdmotionpathfollow'],
    refKey: 'SOP_crowdmotionpathfollow',
    render: () => (
      <g>
        {/* Parallel green path boundary arrows on ground */}
        <path
          d="M6.5,14.5 L20,18.5 M2.2,16.2 L15.5,21.2"
          fill="none"
          stroke="#4e9a06"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M6.5,14.5 L20,18.5 M2.2,16.2 L15.5,21.2"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <polygon points="22,19.2 18.8,16.5 18.2,19.8" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.55" />
        <polygon points="17.5,21.8 14.3,19.2 13.7,22.2" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.55" />
        {/* Striding blue crowd agent */}
        <circle cx="12" cy="4.2" r="2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M8.5,7.2 L15.5,7.2 L18.2,11.8 L16.5,12.5 L14.6,9.5 L14.2,13.5 L16.8,19.5 L14.8,20 L12,14.8 L9.2,20 L7.2,19.5 L9.8,13.5 L9.4,9.5 L7.5,12.5 L5.8,11.8 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpathlayer',
    label: 'Crowd MotionPath Layer',
    family: 'sop',
    description:
      'Blue crowd agent walking over a gray base motion path and a red layered motion path above it.',
    types: ['crowdmotionpathlayer'],
    icons: ['sop_crowdmotionpathlayer'],
    refKey: 'SOP_crowdmotionpathlayer',
    render: () => (
      <g>
        {/* Base gray motion path */}
        <path
          d="M2.5,18.5 C8,16.5 16,20.5 21.5,18.5"
          fill="none"
          stroke="#888a85"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Red layered motion path */}
        <path
          d="M2.5,14.5 C8,12.5 16,16.5 21.5,14.5"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Blue crowd agent */}
        <circle cx="12" cy="4.2" r="2" fill="#d0dfef" stroke="#193774" strokeWidth="0.85" />
        <path
          d="M8.8,7.2 L15.2,7.2 L17.8,11.8 L16.2,12.5 L14.4,9.5 L14,13.8 L16.5,20.5 L14.5,21 L12,15.2 L9.5,21 L7.5,20.5 L10,13.8 L9.6,9.5 L7.8,12.5 L6.2,11.8 Z"
          fill="#608bc3"
          stroke="#193774"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpathretime',
    label: 'Crowd MotionPath Retime',
    family: 'sop',
    description:
      'Running blue crowd agent with faded ghost motion-trail echoes and a green retimed pose.',
    types: ['crowdmotionpathretime', 'motionclipretime'],
    icons: ['sop_crowdmotionpathretime', 'sop_kinefx-motionclipretime'],
    refKey: 'SOP_crowdmotionpathretime',
    render: () => (
      <g>
        {/* Faded trailing ghost figure */}
        <g opacity="0.38">
          <circle cx="8.5" cy="5.2" r="1.8" fill="#729fcf" stroke="#204a87" strokeWidth="0.7" />
          <path
            d="M4.5,8.5 L12.5,7.8 L14,11.5 L10.2,14.5 L13.5,19.8 L8.5,16 L4.2,20.2 L6.8,14.2 Z"
            fill="#729fcf"
            stroke="#204a87"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
        </g>
        {/* Foreground running blue agent */}
        <circle cx="14.5" cy="4.5" r="2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M9.5,8.2 L19.5,6.8 L21.5,11 L19.8,11.6 L17.2,9.2 L15.8,14.5 L20.2,20.2 L18.2,21 L14.2,15.8 L8.8,21 L7.2,20 L11.5,14.2 L11.8,9.8 L7.5,11.8 L6.2,10.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Green retime speed lines */}
        <path
          d="M2.5,9.5 H6.5 M2,13.5 H6.8 M3,17.5 H7.2"
          stroke="#8ae234"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
    ),
  },
];
