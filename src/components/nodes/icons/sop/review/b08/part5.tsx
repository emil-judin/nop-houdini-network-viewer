import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 8, Part 5 (icons 50 to 59): built-in Houdini SOP icons under review.
 */
export const BATCH_08_PART_5: OperatorIconDef[] = [
  {
    id: 'sop.apex.configurecharacter',
    label: 'APEX Configure Character',
    family: 'sop',
    description:
      'Blue character figure with bright-green rig joints and a silver configuration gear badge.',
    types: ['configurecharacter'],
    icons: ['sop_apex-configurecharacter'],
    refKey: 'SOP_apex-configurecharacter',
    render: () => (
      <g>
        {/* Striding blue character on the left */}
        <circle cx="9.8" cy="4.2" r="2.1" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M6.2,7.5 L13.4,7.5 L16.2,12.5 L14.5,13.2 L12.5,9.8 L12,14.2 L14.8,20.5 L12.6,21.2 L9.8,15.5 L7,21.2 L4.8,20.5 L7.6,14.2 L7.1,9.8 L5.1,13.2 L3.4,12.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Internal green rig joints */}
        <circle cx="9.8" cy="8.8" r="1" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.55" />
        <circle cx="9.8" cy="14" r="1" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.55" />
        {/* Configuration gear at bottom-right */}
        <circle
          cx="18"
          cy="17.5"
          r="3.4"
          fill="#d3d7cf"
          stroke="#2c2c2c"
          strokeWidth="0.9"
          strokeDasharray="1.5 0.9"
        />
        <circle cx="18" cy="17.5" r="2.4" fill="#d3d7cf" stroke="#555753" strokeWidth="0.7" />
        <circle cx="18" cy="17.5" r="1" fill="#2c2c2c" />
      </g>
    ),
  },
  {
    id: 'sop.apex.configurecontrols',
    label: 'APEX Configure Controls',
    family: 'sop',
    description:
      'Amber marionette controller hand above green control strings attached to a posed blue character.',
    types: ['configurecontrols', 'controlextract', 'controlupdateparms'],
    icons: [
      'sop_apex-configurecontrols',
      'sop_apex-controlextract',
      'sop_apex-controlupdateparms',
    ],
    refKey: 'SOP_apex-configurecontrols',
    render: () => (
      <g>
        {/* Amber puppeteer hand at top */}
        <path
          d="M7.5,3 C10.5,2.2 15.5,2.2 18.8,3.2 C19.5,3.8 18.2,4.8 16.5,5 L18.5,6.2 C18.2,7 16.5,6.8 14.5,5.8 L15.5,7.8 C14.8,8.2 13.5,7.2 12.5,5.8 L11,7.5 C10,7.5 9.8,6.2 9.5,5.2 L7.5,7.2 C6.5,7.2 6.2,5.5 7.5,3 Z"
          fill="#f4dcb6"
          stroke="#8f5902"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Green control strings descending to character */}
        <g stroke="#73d216" strokeWidth="0.8" strokeDasharray="1.3 0.9">
          <line x1="8" y1="6.8" x2="6.2" y2="14.5" />
          <line x1="12.5" y1="6.8" x2="12" y2="10.5" />
          <line x1="16.8" y1="6.5" x2="18.2" y2="14.5" />
        </g>
        {/* Posed blue character below */}
        <circle cx="12" cy="10.2" r="1.8" fill="#d0dfef" stroke="#204a87" strokeWidth="0.8" />
        <path
          d="M8.8,12.8 H15.2 L18.5,15.2 L17.2,16.2 L14.5,14.2 L14.2,17.5 L16,21.5 H14 L12,18.2 L10,21.5 H8 L9.8,17.5 L9.5,14.2 L6.8,16.2 L5.5,15.2 Z"
          fill="#b2cbe5"
          stroke="#204a87"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.configuregraph',
    label: 'APEX Configure Graph',
    family: 'sop',
    description:
      'Purple APEX graph grid panel with green FK bone links and a metallic configuration gear.',
    types: ['configuregraph'],
    icons: ['sop_apex-configuregraph'],
    refKey: 'SOP_apex-configuregraph',
    render: () => (
      <g>
        {/* Purple APEX graph grid panel */}
        <rect
          x="2.2"
          y="4.5"
          width="15.5"
          height="13.2"
          rx="1"
          fill="#ad7fa8"
          stroke="#262626"
          strokeWidth="0.85"
        />
        <g stroke="#cc9ac9" strokeWidth="0.5">
          <line x1="6" y1="4.5" x2="6" y2="17.7" />
          <line x1="10" y1="4.5" x2="10" y2="17.7" />
          <line x1="14" y1="4.5" x2="14" y2="17.7" />
          <line x1="2.2" y1="9" x2="17.7" y2="9" />
          <line x1="2.2" y1="13.5" x2="17.7" y2="13.5" />
        </g>
        {/* Green and yellow bone links */}
        <path
          d="M10,2.5 V13.5 M6,11.5 L10,8.2 L14,11.5"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="8.2" r="1.2" fill="#eeeeec" stroke="#262626" strokeWidth="0.6" />
        {/* Configuration gear at bottom-right */}
        <circle
          cx="18.2"
          cy="17.5"
          r="3.4"
          fill="#dce6e9"
          stroke="#3d4d66"
          strokeWidth="0.9"
          strokeDasharray="1.5 0.9"
        />
        <circle cx="18.2" cy="17.5" r="2.4" fill="#8ea3b2" stroke="#3d4d66" strokeWidth="0.65" />
        <circle cx="18.2" cy="17.5" r="1" fill="#3d4d66" />
      </g>
    ),
  },
  {
    id: 'sop.apex.graph',
    label: 'APEX Graph ',
    family: 'sop',
    description:
      'Purple APEX graph grid panel overlaid with connected green, yellow, and orange rig graph nodes.',
    types: ['graph'],
    icons: ['sop_apex-graph'],
    refKey: 'SOP_apex-graph',
    render: () => (
      <g>
        {/* Purple APEX graph grid panel */}
        <rect
          x="3.5"
          y="4.5"
          width="17"
          height="14"
          rx="1"
          fill="#ad7fa8"
          stroke="#262626"
          strokeWidth="0.9"
        />
        <g stroke="#cc9ac9" strokeWidth="0.5">
          <line x1="7.8" y1="4.5" x2="7.8" y2="18.5" />
          <line x1="12" y1="4.5" x2="12" y2="18.5" />
          <line x1="16.2" y1="4.5" x2="16.2" y2="18.5" />
          <line x1="3.5" y1="9.2" x2="20.5" y2="9.2" />
          <line x1="3.5" y1="13.8" x2="20.5" y2="13.8" />
        </g>
        {/* Graph connections and nodes */}
        <path
          d="M7.2,8.5 L12,11.5 L16.8,8.5 M12,11.5 V16.2"
          fill="none"
          stroke="#4e9a06"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="7.2" cy="8.5" r="1.5" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.65" />
        <circle cx="16.8" cy="8.5" r="1.5" fill="#f57900" stroke="#8f5902" strokeWidth="0.65" />
        <circle cx="12" cy="11.5" r="1.5" fill="#edd400" stroke="#8f5902" strokeWidth="0.65" />
        <circle cx="12" cy="16.2" r="1.5" fill="#eeeeec" stroke="#3465a4" strokeWidth="0.65" />
      </g>
    ),
  },
  {
    id: 'sop.apex.invokegraph',
    label: 'APEX Invoke Graph',
    family: 'sop',
    description:
      'Purple APEX graph grid panel with a green node graph and an orange play/invoke badge in the upper-right.',
    types: ['sceneinvoke'],
    icons: ['sop_apex-invokegraph', 'sop_apex-sceneinvoke'],
    refKey: 'SOP_apex-invokegraph',
    render: () => (
      <g>
        {/* Purple APEX graph grid panel */}
        <rect
          x="2.5"
          y="5.5"
          width="16"
          height="13.5"
          rx="1"
          fill="#ad7fa8"
          stroke="#262626"
          strokeWidth="0.85"
        />
        <g stroke="#cc9ac9" strokeWidth="0.5">
          <line x1="6.5" y1="5.5" x2="6.5" y2="19" />
          <line x1="10.5" y1="5.5" x2="10.5" y2="19" />
          <line x1="14.5" y1="5.5" x2="14.5" y2="19" />
          <line x1="2.5" y1="10" x2="18.5" y2="10" />
          <line x1="2.5" y1="14.5" x2="18.5" y2="14.5" />
        </g>
        {/* Green graph wire and nodes */}
        <path
          d="M6,14.5 L10.5,10 L14.5,14.5"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="6" cy="14.5" r="1.3" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
        <circle cx="10.5" cy="10" r="1.3" fill="#eeeeec" stroke="#4e9a06" strokeWidth="0.6" />
        <circle cx="14.5" cy="14.5" r="1.3" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
        {/* Orange invoke/play badge at top-right */}
        <rect
          x="13.8"
          y="2.2"
          width="8"
          height="6.2"
          rx="1.2"
          fill="#f57900"
          stroke="#ce5c00"
          strokeWidth="0.8"
        />
        <polygon points="16.5,3.6 19.8,5.3 16.5,7" fill="#ffffff" />
      </g>
    ),
  },
  {
    id: 'sop.apex.layoutgraph',
    label: 'APEX Layout Graph',
    family: 'sop',
    description:
      'Connected green and yellow graph nodes being arranged neatly into a layout.',
    types: ['layoutgraph'],
    icons: ['sop_apex-layoutgraph'],
    refKey: 'SOP_apex-layoutgraph',
    render: () => (
      <g>
        {/* Graph layout wires */}
        <path
          d="M6.5,6.5 H14.5 M6.5,6.5 L6.5,16.5 H14.5 M14.5,6.5 L18.5,11.5 L14.5,16.5"
          fill="none"
          stroke="#555753"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Graph nodes arranged on grid */}
        <rect
          x="3.5"
          y="4.2"
          width="5.2"
          height="3.8"
          rx="0.7"
          fill="#8ae234"
          stroke="#4e9a06"
          strokeWidth="0.8"
        />
        <rect
          x="11.8"
          y="4.2"
          width="5.2"
          height="3.8"
          rx="0.7"
          fill="#fce94f"
          stroke="#8f5902"
          strokeWidth="0.8"
        />
        <rect
          x="3.5"
          y="14.5"
          width="5.2"
          height="3.8"
          rx="0.7"
          fill="#eeeeec"
          stroke="#555753"
          strokeWidth="0.8"
        />
        <rect
          x="11.8"
          y="14.5"
          width="5.2"
          height="3.8"
          rx="0.7"
          fill="#8ae234"
          stroke="#4e9a06"
          strokeWidth="0.8"
        />
        <rect
          x="16.2"
          y="9.5"
          width="5.2"
          height="3.8"
          rx="0.7"
          fill="#babdb6"
          stroke="#555753"
          strokeWidth="0.8"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.mapcharacter',
    label: 'APEX Map Character',
    family: 'sop',
    description:
      'Red-outlined source character mapped via green arrows to a blue target character rig.',
    types: ['mapcharacter', 'mappoints'],
    icons: ['sop_apex-mapcharacter', 'sop_kinefx-mappoints'],
    refKey: 'SOP_apex-mapcharacter',
    render: () => (
      <g>
        {/* Left character outlined in red */}
        <circle cx="7" cy="4.5" r="1.9" fill="#d3d7cf" stroke="#ef2929" strokeWidth="0.85" />
        <path
          d="M4,7.5 H10 L11.8,12 L10.2,12.6 L9.2,9.8 L8.8,14 L10.6,20.5 L8.8,20.8 L7,15.5 L5.2,20.8 L3.4,20.5 L5.2,14 L4.8,9.8 L3.8,12.6 L2.2,12 Z"
          fill="#babdb6"
          stroke="#ef2929"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Right blue character */}
        <circle cx="17" cy="4.5" r="1.9" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M14,7.5 H20 L21.8,12 L20.2,12.6 L19.2,9.8 L18.8,14 L20.6,20.5 L18.8,20.8 L17,15.5 L15.2,20.8 L13.4,20.5 L15.2,14 L14.8,9.8 L13.8,12.6 L12.2,12 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Green mapping arrow between characters */}
        <path
          d="M8.5,11.5 H14.5"
          stroke="#4e9a06"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8.5,11.5 H14.5"
          stroke="#8ae234"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <polygon points="16.2,11.5 13.5,9.5 13.5,13.5" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.55" />
      </g>
    ),
  },
  {
    id: 'sop.apex.mergegraph',
    label: 'APEX Merge Graph',
    family: 'sop',
    description:
      'Purple APEX graph grid panel with two green and orange node branches merging into one output.',
    types: ['mergegraph'],
    icons: ['sop_apex-mergegraph'],
    refKey: 'SOP_apex-mergegraph',
    render: () => (
      <g>
        {/* Purple APEX graph grid panel */}
        <rect
          x="3"
          y="4.5"
          width="18"
          height="14.5"
          rx="1"
          fill="#ad7fa8"
          stroke="#262626"
          strokeWidth="0.9"
        />
        <g stroke="#cc9ac9" strokeWidth="0.5">
          <line x1="7.5" y1="4.5" x2="7.5" y2="19" />
          <line x1="12" y1="4.5" x2="12" y2="19" />
          <line x1="16.5" y1="4.5" x2="16.5" y2="19" />
          <line x1="3" y1="9.3" x2="21" y2="9.3" />
          <line x1="3" y1="14.1" x2="21" y2="14.1" />
        </g>
        {/* Merging branches inside graph */}
        <path
          d="M7.5,7.2 L12,11.8 L16.5,7.2 M12,11.8 V16.8"
          fill="none"
          stroke="#4e9a06"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="5.8" y="5.8" width="3.4" height="2.4" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.65" />
        <rect x="14.8" y="5.8" width="3.4" height="2.4" fill="#f57900" stroke="#ce5c00" strokeWidth="0.65" />
        <circle cx="12" cy="11.8" r="1.5" fill="#eeeeec" stroke="#262626" strokeWidth="0.65" />
        <rect x="10.2" y="15.8" width="3.6" height="2.4" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.65" />
      </g>
    ),
  },
  {
    id: 'sop.apex.rigpose',
    label: 'APEX Rig Pose ',
    family: 'sop',
    description:
      'Posed blue character figure suspended by vertical strings from bright-green rig pose control dots.',
    types: ['rigpose'],
    icons: ['sop_apex-rigpose', 'sop_kinefx-rigpose'],
    refKey: 'SOP_apex-rigpose',
    render: () => (
      <g>
        {/* Vertical pose control strings */}
        <g stroke="#888a85" strokeWidth="0.75">
          <line x1="5.5" y1="2.5" x2="5.5" y2="11" />
          <line x1="12.5" y1="1.8" x2="12.5" y2="6.5" />
          <line x1="18.5" y1="2.8" x2="18.5" y2="10.5" />
        </g>
        {/* Green control pins */}
        <g fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6">
          <circle cx="5.5" cy="8" r="1.1" />
          <circle cx="12.5" cy="3.5" r="1.1" />
          <circle cx="18.5" cy="7.5" r="1.1" />
        </g>
        {/* Posed blue character */}
        <circle cx="12.5" cy="6.8" r="2" fill="#d0dfef" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M8.8,9.8 L16.2,9.8 L19.2,7.8 L20.2,9.2 L16,12 L15.5,15.5 L18.2,21 L16,21.5 L12.5,16.5 L9,21.5 L6.8,21 L9.5,15.5 L9,12 L4.5,10.2 L5.5,8.8 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.sceneaddanimation',
    label: 'APEX Scene Add Animation',
    family: 'sop',
    description:
      'Dark slate scene monitor screen displaying a running bright-green animated character.',
    types: ['sceneaddanimation', 'sceneimportanimation'],
    icons: ['sop_apex-sceneaddanimation', 'sop_apex-sceneimportanimation'],
    refKey: 'SOP_apex-sceneaddanimation',
    render: () => (
      <g>
        {/* Slate scene monitor frame */}
        <rect
          x="2"
          y="3.2"
          width="20"
          height="16.8"
          rx="1.8"
          fill="#555753"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <rect
          x="3.4"
          y="4.6"
          width="17.2"
          height="14"
          rx="1"
          fill="#888a85"
          stroke="#2e3436"
          strokeWidth="0.6"
        />
        {/* Running bright-green animated figure inside screen */}
        <circle cx="13.5" cy="7.2" r="1.6" fill="#cef3aa" stroke="#4e9a06" strokeWidth="0.7" />
        <path
          d="M8.5,10.2 L14,9.5 L17.8,11.5 L16.5,12.5 L13.8,11 L12.8,14 L16.8,17.2 L15.5,18 L11.8,15.2 L8.5,17.8 L7.2,16.8 L10.8,13.8 L11.2,11 L8.5,11.5 Z"
          fill="#8ae234"
          stroke="#4e9a06"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
];
