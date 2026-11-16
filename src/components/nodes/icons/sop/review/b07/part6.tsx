import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_07_PART_6: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.fbxanimimport',

    label: 'FBX Animation Import',

    family: 'sop',

    description: 'FBX badge at top-left (vendor logo, redrawn).',
    refKey: 'SOP_kinefx-fbxanimimport',
    types: ['fbxanimimport'],
    icons: ['sop_kinefx-fbxanimimport'],
    render: () => (
      <g>
        {/* FBX badge at top-left (vendor logo, redrawn) */}
        <rect x="2" y="2" width="10.5" height="6" rx="1.2" fill="#e9b96e" stroke="#2e3436" strokeWidth="0.7" />
        <path
          d="M3.5 6.8V3.2H5.5M3.5 5H5.1M6.3 6.8V3.2H7.6C8.1 3.2 8.4 3.5 8.4 3.9C8.4 4.3 8.1 4.6 7.6 4.8C8.2 4.9 8.5 5.3 8.5 5.8C8.5 6.4 8.1 6.8 7.5 6.8H6.3ZM9.3 3.2L11.3 6.8M11.3 3.2L9.3 6.8"
          fill="none"
          stroke="#2e3436"
          strokeWidth="0.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Green motion trails behind figure */}
        <path d="M4 14.5C6.5 13.8 9 13.8 11.5 14.5M5 17.5C7.5 16.8 9.8 16.8 12 17.5" fill="none" stroke="#8ae234" strokeWidth="1.1" strokeLinecap="round" />
        {/* Running blue motion-clip figure */}
        <circle cx="16.5" cy="6.5" r="1.8" fill="#729fcf" stroke="#204a87" strokeWidth="0.75" />
        <path
          d="M15.8 8.5L13.5 13.5L10.5 12M15.2 10L19.5 11.5L21 9.5M13.5 13.5L16.8 16.5L15.5 21M13.5 13.5L10 17.5L7.5 20.5"
          fill="none"
          stroke="#204a87"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.8 8.5L13.5 13.5L10.5 12M15.2 10L19.5 11.5L21 9.5M13.5 13.5L16.8 16.5L15.5 21M13.5 13.5L10 17.5L7.5 20.5"
          fill="none"
          stroke="#729fcf"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Import arrow at bottom-left */}
        <path d="M2.5 19.5H7.5M5.8 17.8L7.8 19.5L5.8 21.2" fill="none" stroke="#ef2929" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.fbxcharacterimport',

    label: 'FBX Character Import',

    family: 'sop',

    description: 'Left file/portal doorway.',
    refKey: 'SOP_kinefx-fbxcharacterimport',
    types: ['fbxcharacterimport'],
    icons: ['sop_kinefx-fbxcharacterimport'],
    render: () => (
      <g>
        {/* Left file/portal doorway */}
        <path d="M2.5 4.5L7.5 2.5V19.5L2.5 21.5Z" fill="#d3d7cf" stroke="#2e3436" strokeWidth="0.8" strokeLinejoin="round" />
        <path d="M3.8 6L6.2 5V18L3.8 19Z" fill="#555753" />
        {/* FBX micro badge on portal (vendor logo, redrawn) */}
        <rect x="2" y="2" width="7.5" height="4.2" rx="0.9" fill="#e9b96e" stroke="#2e3436" strokeWidth="0.6" />
        <path d="M3 5.2V3H4.3M3 4.1H4M5 5.2V3H5.9C6.3 3 6.5 3.3 6.5 3.6C6.5 3.9 6.3 4.1 6 4.1C6.4 4.2 6.6 4.5 6.6 4.8C6.6 5.1 6.3 5.2 5.9 5.2H5ZM7.2 3L8.5 5.2M8.5 3L7.2 5.2" fill="none" stroke="#2e3436" strokeWidth="0.55" strokeLinecap="round" />
        {/* Import arrow */}
        <path d="M6.5 12H11.5M9.8 10L11.8 12L9.8 14" fill="none" stroke="#ef2929" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Blue character figure with internal green rig */}
        <circle cx="16.5" cy="5" r="2" fill="#729fcf" stroke="#204a87" strokeWidth="0.8" />
        <path
          d="M12 9.5H21M16.5 7.5V14.5M14.5 14.5L13.5 21M18.5 14.5L19.5 21"
          fill="none"
          stroke="#204a87"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 9.5H21M16.5 7.5V14.5M14.5 14.5L13.5 21M18.5 14.5L19.5 21"
          fill="none"
          stroke="#729fcf"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Internal green skeleton joints */}
        <path d="M13 9.5H20M16.5 8V14.5L14 19.5M16.5 14.5L19 19.5" fill="none" stroke="#4e9a06" strokeWidth="0.7" />
        <circle cx="16.5" cy="9.5" r="0.9" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.5" />
        <circle cx="16.5" cy="14.5" r="0.9" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.5" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.fbxskinimport',

    label: 'FBX Skin Import',

    family: 'sop',

    description: 'Left file/portal doorway.',
    refKey: 'SOP_kinefx-fbxskinimport',
    types: ['fbxskinimport'],
    icons: ['sop_kinefx-fbxskinimport'],
    render: () => (
      <g>
        {/* Left file/portal doorway */}
        <path d="M2.5 4.5L7.5 2.5V19.5L2.5 21.5Z" fill="#d3d7cf" stroke="#2e3436" strokeWidth="0.8" strokeLinejoin="round" />
        <path d="M3.8 6L6.2 5V18L3.8 19Z" fill="#555753" />
        {/* FBX micro badge (vendor logo, redrawn) */}
        <rect x="2" y="2" width="7.5" height="4.2" rx="0.9" fill="#e9b96e" stroke="#2e3436" strokeWidth="0.6" />
        <path d="M3 5.2V3H4.3M3 4.1H4M5 5.2V3H5.9C6.3 3 6.5 3.3 6.5 3.6C6.5 3.9 6.3 4.1 6 4.1C6.4 4.2 6.6 4.5 6.6 4.8C6.6 5.1 6.3 5.2 5.9 5.2H5ZM7.2 3L8.5 5.2M8.5 3L7.2 5.2" fill="none" stroke="#2e3436" strokeWidth="0.55" strokeLinecap="round" />
        {/* Import arrow */}
        <path d="M6.5 12H11.5M9.8 10L11.8 12L9.8 14" fill="none" stroke="#ef2929" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Solid blue skin mesh silhouette */}
        <circle cx="16.5" cy="5" r="2" fill="#729fcf" stroke="#204a87" strokeWidth="0.8" />
        <path
          d="M12 8.5H21V10.5H18.5V14.5L19.8 21H17.5L16.5 15.8L15.5 21H13.2L14.5 14.5V10.5H12Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Subtle skin wireframe contours */}
        <path d="M14.5 10.5H18.5M14.5 12.8H18.5" fill="none" stroke="#eeeeec" strokeWidth="0.55" opacity="0.75" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.fktransfer',

    label: 'FK Transfer',

    family: 'sop',

    description: 'Source rig figure on top-left.',
    refKey: 'SOP_kinefx-fktransfer',
    types: ['fktransfer'],
    icons: ['sop_kinefx-fktransfer'],
    render: () => (
      <g>
        {/* Source rig figure on top-left */}
        <circle cx="7" cy="4.2" r="1.6" fill="#729fcf" stroke="#204a87" strokeWidth="0.7" />
        <path
          d="M3.5 7.8H10.5M7 6V11.5M5.5 11.5L4.5 16.5M8.5 11.5L9.5 16.5"
          fill="none"
          stroke="#204a87"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path
          d="M3.5 7.8H10.5M7 6V11.5M5.5 11.5L4.5 16.5M8.5 11.5L9.5 16.5"
          fill="none"
          stroke="#729fcf"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Target rig figure on bottom-right */}
        <circle cx="17" cy="8.2" r="1.6" fill="#729fcf" stroke="#204a87" strokeWidth="0.7" />
        <path
          d="M13.5 11.8H20.5M17 10V15.5M15.5 15.5L14.5 20.5M18.5 15.5L19.5 20.5"
          fill="none"
          stroke="#204a87"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path
          d="M13.5 11.8H20.5M17 10V15.5M15.5 15.5L14.5 20.5M18.5 15.5L19.5 20.5"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Curved green FK transfer arrow */}
        <path d="M9.5 5.5C12.5 5.2 14.2 6.2 15 8M13.2 7.8L15.2 8.2L15.2 6.2" fill="none" stroke="#4e9a06" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 5.5C12.5 5.2 14.2 6.2 15 8M13.2 7.8L15.2 8.2L15.2 6.2" fill="none" stroke="#8ae234" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.fullbodyik',

    label: 'Full Body IK',

    family: 'sop',

    description: 'Dynamic posed blue character body.',
    refKey: 'SOP_kinefx-fullbodyik',
    types: ['fullbodyik'],
    icons: ['sop_kinefx-fullbodyik'],
    render: () => (
      <g>
        {/* Dynamic posed blue character body */}
        <circle cx="12" cy="4.2" r="2" fill="#729fcf" stroke="#204a87" strokeWidth="0.8" />
        <path
          d="M5.5 7.5L12 9L18.5 6.8M12 6.5V13.8M12 13.8L8.2 20.2M12 13.8L16.2 19.8"
          fill="none"
          stroke="#204a87"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 7.5L12 9L18.5 6.8M12 6.5V13.8M12 13.8L8.2 20.2M12 13.8L16.2 19.8"
          fill="none"
          stroke="#729fcf"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Internal green skeleton */}
        <path d="M5.5 7.5L12 9L18.5 6.8M12 9V13.8L8.2 20.2M12 13.8L16.2 19.8" fill="none" stroke="#4e9a06" strokeWidth="0.75" />
        {/* Red/orange IK effector pins on hands, pelvis, and feet */}
        <circle cx="5.2" cy="7.5" r="1.5" fill="#ef2929" stroke="#eeeeec" strokeWidth="0.6" />
        <circle cx="18.8" cy="6.8" r="1.5" fill="#ef2929" stroke="#eeeeec" strokeWidth="0.6" />
        <circle cx="12" cy="13.8" r="1.5" fill="#8ae234" stroke="#2e3436" strokeWidth="0.6" />
        <circle cx="8" cy="20.2" r="1.5" fill="#ef2929" stroke="#eeeeec" strokeWidth="0.6" />
        <circle cx="16.4" cy="19.8" r="1.5" fill="#ef2929" stroke="#eeeeec" strokeWidth="0.6" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.fbikconfiguretargets',

    label: 'Full Body IK Configure Targets',

    family: 'sop',

    description: 'Bent blue limb segment.',
    refKey: 'SOP_kinefx-fbikconfiguretargets',
    types: ['fbikconfiguretargets'],
    icons: ['sop_kinefx-fbikconfiguretargets'],
    render: () => (
      <g>
        {/* Bent blue limb segment */}
        <path
          d="M7 3.5V15.5H18.5"
          fill="none"
          stroke="#204a87"
          strokeWidth="5.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 3.5V15.5H18.5"
          fill="none"
          stroke="#729fcf"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Internal green IK bones */}
        <path d="M7 4V15.5H18" fill="none" stroke="#4e9a06" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="4" r="1.3" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
        <circle cx="7" cy="15.5" r="1.5" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
        {/* Coral-red target effector crosshair at wrist/ankle */}
        <circle cx="18.5" cy="15.5" r="2.6" fill="#ef2929" stroke="#a40000" strokeWidth="0.75" />
        <path d="M18.5 11.5V19.5M14.5 15.5H22.5" stroke="#ef2929" strokeWidth="0.9" strokeLinecap="round" />
        <circle cx="18.5" cy="15.5" r="1" fill="#eeeeec" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.gltfanimimport',

    label: 'GLTF Animation Import',

    family: 'sop',

    description: 'glTF badge at top-left (vendor logo, redrawn).',
    refKey: 'SOP_kinefx-gltfanimimport',
    types: ['gltfanimimport'],
    icons: ['sop_kinefx-gltfanimimport'],
    render: () => (
      <g>
        {/* glTF badge at top-left (vendor logo, redrawn) */}
        <rect x="2" y="2" width="10.5" height="6" rx="1.2" fill="#8ae234" stroke="#2e3436" strokeWidth="0.7" />
        <path
          d="M4.8 4.2C4.1 4.2 3.6 4.7 3.6 5.4C3.6 6.1 4.1 6.6 4.8 6.6C5.4 6.6 5.7 6.2 5.7 5.6H4.8M6.6 3.2V6.6M7.6 3.4H9.6M8.6 3.4V6.6M10.3 6.6V3.4H11.7M10.3 5H11.4"
          fill="none"
          stroke="#2e3436"
          strokeWidth="0.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Green motion trails */}
        <path d="M4 14.5C6.5 13.8 9 13.8 11.5 14.5M5 17.5C7.5 16.8 9.8 16.8 12 17.5" fill="none" stroke="#8ae234" strokeWidth="1.1" strokeLinecap="round" />
        {/* Running blue motion-clip figure */}
        <circle cx="16.5" cy="6.5" r="1.8" fill="#729fcf" stroke="#204a87" strokeWidth="0.75" />
        <path
          d="M15.8 8.5L13.5 13.5L10.5 12M15.2 10L19.5 11.5L21 9.5M13.5 13.5L16.8 16.5L15.5 21M13.5 13.5L10 17.5L7.5 20.5"
          fill="none"
          stroke="#204a87"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.8 8.5L13.5 13.5L10.5 12M15.2 10L19.5 11.5L21 9.5M13.5 13.5L16.8 16.5L15.5 21M13.5 13.5L10 17.5L7.5 20.5"
          fill="none"
          stroke="#729fcf"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Import arrow at bottom-left */}
        <path d="M2.5 19.5H7.5M5.8 17.8L7.8 19.5L5.8 21.2" fill="none" stroke="#ef2929" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.gltfcharacterimport',

    label: 'GLTF Character Import',

    family: 'sop',

    description: 'Left file/portal doorway.',
    refKey: 'SOP_kinefx-gltfcharacterimport',
    types: ['gltfcharacterimport'],
    icons: ['sop_kinefx-gltfcharacterimport'],
    render: () => (
      <g>
        {/* Left file/portal doorway */}
        <path d="M2.5 4.5L7.5 2.5V19.5L2.5 21.5Z" fill="#d3d7cf" stroke="#2e3436" strokeWidth="0.8" strokeLinejoin="round" />
        <path d="M3.8 6L6.2 5V18L3.8 19Z" fill="#555753" />
        {/* glTF micro badge (vendor logo, redrawn) */}
        <rect x="2" y="2" width="7.8" height="4.2" rx="0.9" fill="#8ae234" stroke="#2e3436" strokeWidth="0.6" />
        <path d="M3.2 3.2V5.2H4.2M5 3.2H6.4M5.7 3.2V5.2M7.2 5.2V3.2H8.4M7.2 4.2H8.1" fill="none" stroke="#2e3436" strokeWidth="0.55" strokeLinecap="round" />
        {/* Import arrow */}
        <path d="M6.5 12H11.5M9.8 10L11.8 12L9.8 14" fill="none" stroke="#ef2929" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Blue character figure with internal green rig */}
        <circle cx="16.5" cy="5" r="2" fill="#729fcf" stroke="#204a87" strokeWidth="0.8" />
        <path
          d="M12 9.5H21M16.5 7.5V14.5M14.5 14.5L13.5 21M18.5 14.5L19.5 21"
          fill="none"
          stroke="#204a87"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 9.5H21M16.5 7.5V14.5M14.5 14.5L13.5 21M18.5 14.5L19.5 21"
          fill="none"
          stroke="#729fcf"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M13 9.5H20M16.5 8V14.5L14 19.5M16.5 14.5L19 19.5" fill="none" stroke="#4e9a06" strokeWidth="0.7" />
        <circle cx="16.5" cy="9.5" r="0.9" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.5" />
        <circle cx="16.5" cy="14.5" r="0.9" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.5" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.gltfskinimport',

    label: 'GLTF Skin Import',

    family: 'sop',

    description: 'Left file/portal doorway.',
    refKey: 'SOP_kinefx-gltfskinimport',
    types: ['gltfskinimport'],
    icons: ['sop_kinefx-gltfskinimport'],
    render: () => (
      <g>
        {/* Left file/portal doorway */}
        <path d="M2.5 4.5L7.5 2.5V19.5L2.5 21.5Z" fill="#d3d7cf" stroke="#2e3436" strokeWidth="0.8" strokeLinejoin="round" />
        <path d="M3.8 6L6.2 5V18L3.8 19Z" fill="#555753" />
        {/* glTF micro badge (vendor logo, redrawn) */}
        <rect x="2" y="2" width="7.8" height="4.2" rx="0.9" fill="#8ae234" stroke="#2e3436" strokeWidth="0.6" />
        <path d="M3.2 3.2V5.2H4.2M5 3.2H6.4M5.7 3.2V5.2M7.2 5.2V3.2H8.4M7.2 4.2H8.1" fill="none" stroke="#2e3436" strokeWidth="0.55" strokeLinecap="round" />
        {/* Import arrow */}
        <path d="M6.5 12H11.5M9.8 10L11.8 12L9.8 14" fill="none" stroke="#ef2929" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Solid blue skin mesh silhouette */}
        <circle cx="16.5" cy="5" r="2" fill="#729fcf" stroke="#204a87" strokeWidth="0.8" />
        <path
          d="M12 8.5H21V10.5H18.5V14.5L19.8 21H17.5L16.5 15.8L15.5 21H13.2L14.5 14.5V10.5H12Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path d="M14.5 10.5H18.5M14.5 12.8H18.5" fill="none" stroke="#eeeeec" strokeWidth="0.55" opacity="0.75" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.groupjoints',

    label: 'Group Joints',

    family: 'sop',

    description: 'Bent blue limb.',
    refKey: 'SOP_kinefx-groupjoints',
    types: ['groupjoints'],
    icons: ['sop_kinefx-groupjoints'],
    render: () => (
      <g>
        {/* Bent blue limb */}
        <path
          d="M8.5 3.5V14.5L18.5 18.5"
          fill="none"
          stroke="#204a87"
          strokeWidth="5.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 3.5V14.5L18.5 18.5"
          fill="none"
          stroke="#729fcf"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Internal green bone chain */}
        <path d="M8.5 4V14.5L18 18.3" fill="none" stroke="#4e9a06" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.5" cy="4" r="1.3" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
        <circle cx="18" cy="18.3" r="1.3" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.6" />
        {/* Dashed orange/yellow selection box around the middle joint */}
        <rect
          x="4"
          y="10"
          width="9"
          height="9"
          rx="1"
          fill="#fce94f"
          fillOpacity="0.22"
          stroke="#fcaf3e"
          strokeWidth="0.95"
          strokeDasharray="1.8 1.2"
        />
        {/* Highlighted selected joint */}
        <circle cx="8.5" cy="14.5" r="2.1" fill="#fcaf3e" stroke="#ce5c00" strokeWidth="0.75" />
      </g>
    ),
  },
];
