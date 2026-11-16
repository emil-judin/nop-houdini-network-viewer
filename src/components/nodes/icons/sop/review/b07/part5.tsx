import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_07_PART_5: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.characterpack',
    label: 'Character Pack',
    family: 'sop',
    description:
      'Three orange streams from above converging through a grey funnel cone into a single bottom stream.',
    types: ['characterpack'],
    icons: ['sop_kinefx-characterpack'],
    refKey: 'SOP_kinefx-characterpack',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-cp`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#babdb6" />
            <stop offset="100%" stopColor="#888a85" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Three incoming orange streams */}
          <path
            d="M5,2.5 C7.5,5.5 9.5,8.5 10,11.5 M12,2.2 V11.5 M19,2.5 C16.5,5.5 14.5,8.5 14,11.5"
            fill="none"
            stroke="#262626"
            strokeWidth="2.1"
          />
          <path
            d="M5,2.5 C7.5,5.5 9.5,8.5 10,11.5 M12,2.2 V11.5 M19,2.5 C16.5,5.5 14.5,8.5 14,11.5"
            fill="none"
            stroke="#f57900"
            strokeWidth="1.15"
          />
          {/* Outgoing single orange stream */}
          <line x1="12" y1="16.5" x2="12" y2="21.8" stroke="#262626" strokeWidth="2.2" />
          <line x1="12" y1="16.5" x2="12" y2="21.8" stroke="#f57900" strokeWidth="1.25" />
          {/* Funnel cone body */}
          <path d="M5,8.5 L10.2,17.2 H13.8 L19,8.5 Z" fill={`url(#${uid}-cp)`} strokeWidth="1.0" />
          {/* Top ellipse rim */}
          <ellipse cx="12" cy="8.5" rx="7" ry="2.8" fill="#e1e4df" strokeWidth="1.0" />
          <ellipse cx="12" cy="8.5" rx="5.2" ry="1.8" fill="#888a85" strokeWidth="0.65" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.characterunpack',
    label: 'Character Unpack',
    family: 'sop',
    description:
      'Single orange stream from above entering an inverted grey funnel cone and splitting into three bottom streams.',
    types: ['characterunpack'],
    icons: ['sop_kinefx-characterunpack'],
    refKey: 'SOP_kinefx-characterunpack',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-cup`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#babdb6" />
            <stop offset="100%" stopColor="#888a85" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Incoming single orange stream */}
          <line x1="12" y1="2.2" x2="12" y2="7.5" stroke="#262626" strokeWidth="2.2" />
          <line x1="12" y1="2.2" x2="12" y2="7.5" stroke="#f57900" strokeWidth="1.25" />
          {/* Three outgoing orange streams */}
          <path
            d="M10,14.5 C9.5,17.5 7.5,19.8 5,21.5 M12,14.5 V21.8 M14,14.5 C14.5,17.5 16.5,19.8 19,21.5"
            fill="none"
            stroke="#262626"
            strokeWidth="2.1"
          />
          <path
            d="M10,14.5 C9.5,17.5 7.5,19.8 5,21.5 M12,14.5 V21.8 M14,14.5 C14.5,17.5 16.5,19.8 19,21.5"
            fill="none"
            stroke="#f57900"
            strokeWidth="1.15"
          />
          {/* Inverted funnel cone */}
          <path d="M10.2,6.8 L5,15.5 H19 L13.8,6.8 Z" fill={`url(#${uid}-cup)`} strokeWidth="1.0" />
          <ellipse cx="12" cy="15.5" rx="7" ry="2.6" fill="#e1e4df" strokeWidth="1.0" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.computerigpose',
    label: 'Compute Rig Pose',
    family: 'sop',
    description:
      'Blue posed humanoid figure with a green skeleton rig and a calculator badge at bottom-right.',
    types: ['computerigpose'],
    icons: ['sop_kinefx-computerigpose'],
    refKey: 'SOP_kinefx-computerigpose',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Blue posed humanoid with green skeleton */}
          <circle cx="10.5" cy="4" r="1.8" fill="#729fcf" strokeWidth="0.85" />
          <path
            d="M4.5,7.5 L10.5,6.8 L16.5,5.5 L16.8,7.2 L12.5,8.5 L12.2,13.5 L14.5,19.8 L12.5,20.2 L10.5,14.8 L8.2,20.2 L6.2,19.8 L8.8,13.5 L8.5,8.5 L4.8,9.2 Z"
            fill="#3465a4"
            strokeWidth="0.95"
          />
          <path d="M10.5,7.5 V13.5 M7,8.2 L10.5,7.8 L14,7" fill="none" stroke="#8ae234" strokeWidth="1.0" />
          {/* Calculator badge at bottom-right */}
          <rect x="14.2" y="12.5" width="7" height="8.8" rx="0.8" fill="#d2d2cc" strokeWidth="0.9" />
          <rect x="15.4" y="13.7" width="4.6" height="2" fill="#8dbf14" stroke="none" />
          <g fill="#262626" stroke="none">
            <rect x="15.4" y="16.6" width="1.2" height="1.2" />
            <rect x="17.1" y="16.6" width="1.2" height="1.2" />
            <rect x="18.8" y="16.6" width="1.2" height="1.2" />
            <rect x="15.4" y="18.5" width="1.2" height="1.2" />
            <rect x="17.1" y="18.5" width="1.2" height="1.2" />
            <rect x="18.8" y="18.5" width="1.2" height="1.2" />
          </g>
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.computetransform',
    label: 'Compute Transform',
    family: 'sop',
    description:
      '3D rotation gimbal sphere with green, red, and blue rings beside a calculator badge.',
    types: ['computetransform'],
    icons: ['sop_kinefx-computetransform'],
    refKey: 'SOP_kinefx-computetransform',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Gimbal sphere */}
          <circle cx="9.8" cy="9.8" r="7.2" fill="#ffffff" fillOpacity="0.35" stroke="#262626" strokeWidth="1.8" />
          <circle cx="9.8" cy="9.8" r="7.2" fill="none" stroke="#8ae234" strokeWidth="1.0" />
          <ellipse cx="9.8" cy="9.8" rx="7.2" ry="2.4" transform="rotate(15 9.8 9.8)" fill="none" stroke="#3672c4" strokeWidth="0.95" />
          <ellipse cx="9.8" cy="9.8" rx="3" ry="7.2" transform="rotate(15 9.8 9.8)" fill="none" stroke="#e03228" strokeWidth="0.95" />
          {/* Calculator badge at bottom-right */}
          <rect x="13.8" y="12" width="7.4" height="9.2" rx="0.8" fill="#d2d2cc" strokeWidth="0.95" />
          <rect x="15" y="13.2" width="5" height="2.1" fill="#8dbf14" stroke="none" />
          <g fill="#262626" stroke="none">
            <rect x="15" y="16.2" width="1.3" height="1.3" />
            <rect x="16.8" y="16.2" width="1.3" height="1.3" />
            <rect x="18.6" y="16.2" width="1.3" height="1.3" />
            <rect x="15" y="18.2" width="1.3" height="1.3" />
            <rect x="16.8" y="18.2" width="1.3" height="1.3" />
            <rect x="18.6" y="18.2" width="1.3" height="1.3" />
          </g>
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.configureclipinfo',
    label: 'Configure Clip Info',
    family: 'sop',
    description:
      'Running blue motion-clip figure with a green motion arc and a clip range info bar.',
    types: ['configureclipinfo'],
    icons: ['sop_kinefx-configureclipinfo'],
    refKey: 'SOP_kinefx-configureclipinfo',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Green motion trail */}
          <path d="M3.5,11 C7,7.5 11.5,7 16,9.5" fill="none" stroke="#262626" strokeWidth="2.0" />
          <path d="M3.5,11 C7,7.5 11.5,7 16,9.5" fill="none" stroke="#8ae234" strokeWidth="1.1" />
          {/* Running blue figure */}
          <circle cx="14.5" cy="4.2" r="1.8" fill="#729fcf" strokeWidth="0.85" />
          <path
            d="M9.5,8 L13.5,6.8 L18,9 M13.2,7 L11.8,12 L15.5,15.5 M11.8,12 L7.5,15"
            fill="none"
            stroke="#262626"
            strokeWidth="2.5"
          />
          <path
            d="M9.5,8 L13.5,6.8 L18,9 M13.2,7 L11.8,12 L15.5,15.5 M11.8,12 L7.5,15"
            fill="none"
            stroke="#729fcf"
            strokeWidth="1.4"
          />
          {/* Clip timeline info bar at bottom */}
          <rect x="3" y="17.5" width="18" height="3.2" rx="0.6" fill="#d0dfef" strokeWidth="0.9" />
          <rect x="6.5" y="17.5" width="9" height="3.2" fill="#8ae234" strokeWidth="0.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.configurejointlimits',
    label: 'Configure Joint Limits',
    family: 'sop',
    description:
      'Bent blue limb with a green rig bone and a red pie-sector joint rotation limit fan.',
    types: ['configurejointlimits', 'configurejoints'],
    icons: ['sop_kinefx-configurejointlimits', 'sop_kinefx-configurejoints'],
    refKey: 'SOP_kinefx-configurejointlimits',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Red joint angle limit sector */}
          <path
            d="M12.8,16.5 L6.5,7.2 A10.5,10.5 0 0 1 18.2,7.5 Z"
            fill="#fabfbf"
            stroke="#a40000"
            strokeWidth="0.9"
          />
          <path d="M8.2,9.8 A7.5,7.5 0 0 1 16.5,10" fill="none" stroke="#ef2929" strokeWidth="1.1" />
          {/* Bent blue limb */}
          <path
            d="M4.8,9.5 C5.8,8.2 7.5,8.5 8.5,10 L12.8,16 L18.2,10.5 C19.5,9.2 21,10.2 20.6,12.2 C20,14.2 15.5,19.2 13.8,20.5 C12.4,21.2 11,20.8 9.8,19.2 L4.5,12.2 C3.8,11.2 4,10.2 4.8,9.5 Z"
            fill="#729fcf"
            strokeWidth="1.05"
          />
          {/* Green internal rig bone and joint */}
          <polyline points="6.8,11.2 12.5,18.2 18.8,12" fill="none" stroke="#262626" strokeWidth="2.0" />
          <polyline points="6.8,11.2 12.5,18.2 18.8,12" fill="none" stroke="#8ae234" strokeWidth="1.1" />
          <circle cx="12.5" cy="18.2" r="1.4" fill="#d0f3ae" strokeWidth="0.75" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.configurerigvis',
    label: 'Configure Rig Visualizers',
    family: 'sop',
    description:
      'Blue humanoid figure displaying red, green, and white wireframe rig visualizer gizmos.',
    types: ['configurerigvis'],
    icons: ['sop_kinefx-configurerigvis', 'sop_kinefx-configurerigvis-2.0'],
    refKey: 'SOP_kinefx-configurerigvis',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Blue humanoid rig */}
          <path
            d="M12,5.5 V14 M6.5,9.5 L12,8.5 L17.5,9.5 M12,14 L9,20 M12,14 L15,20"
            fill="none"
            stroke="#262626"
            strokeWidth="2.5"
          />
          <path
            d="M12,5.5 V14 M6.5,9.5 L12,8.5 L17.5,9.5 M12,14 L9,20 M12,14 L15,20"
            fill="none"
            stroke="#608bc3"
            strokeWidth="1.4"
          />
          {/* Red head visualizer diamond */}
          <polygon points="12,2 15,4.2 12,6.4 9,4.2" fill="#ef2929" fillOpacity="0.65" strokeWidth="0.85" />
          {/* Green torso box visualizer */}
          <polygon points="8.8,9.2 15.2,8.5 15.5,12.2 9.2,12.8" fill="#7be028" fillOpacity="0.6" strokeWidth="0.85" />
          {/* White foot visualizers */}
          <polygon points="7,19.5 10.5,19.5 10,21.2 6.5,21.2" fill="#ffffff" strokeWidth="0.75" />
          <polygon points="13.5,19.5 17,19.5 17.5,21.2 14,21.2" fill="#ffffff" strokeWidth="0.75" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.deletejoints',
    label: 'Delete Joints',
    family: 'sop',
    description:
      'Bent blue limb with an internal green rig bone and a red X deleting the joint.',
    types: ['deletejoints'],
    icons: ['sop_kinefx-deletejoints'],
    refKey: 'SOP_kinefx-deletejoints',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Bent blue limb */}
          <path
            d="M4.8,9.5 C5.8,8.2 7.5,8.5 8.5,10 L12.8,15.5 L18.2,10 C19.5,8.8 21,9.8 20.6,11.8 C20,13.8 15.5,18.8 13.8,20.2 C12.4,21 11,20.5 9.8,19 L4.5,12 C3.8,11 4,10 4.8,9.5 Z"
            fill="#729fcf"
            strokeWidth="1.05"
          />
          {/* Green internal rig bone */}
          <polyline points="6.8,11 12.5,17.8 18.8,11.5" fill="none" stroke="#262626" strokeWidth="2.0" />
          <polyline points="6.8,11 12.5,17.8 18.8,11.5" fill="none" stroke="#8ae234" strokeWidth="1.1" />
          {/* Red delete X above joint */}
          <path d="M9.5,3.5 L15.5,9.5 M15.5,3.5 L9.5,9.5" stroke="#262626" strokeWidth="2.6" />
          <path d="M9.5,3.5 L15.5,9.5 M15.5,3.5 L9.5,9.5" stroke="#e03228" strokeWidth="1.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.dynamicwarp',
    label: 'Dynamic Warp',
    family: 'sop',
    description:
      'Warped hourglass and clock dial in grey and yellow-gold with a red timing needle.',
    types: ['dynamicwarp'],
    icons: ['sop_kinefx-dynamicwarp'],
    refKey: 'SOP_kinefx-dynamicwarp',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Warped hourglass/clock body */}
          <path
            d="M4,4.5 C4,2.8 13,2.8 13,4.5 C13,7.5 10.2,9.5 10.2,11.8 C10.2,14 13,16 13,19 C13,20.8 4,20.8 4,19 C4,16 6.8,14 6.8,11.8 C6.8,9.5 4,7.5 4,4.5 Z"
            fill="#d3d7cf"
            strokeWidth="1.0"
          />
          {/* Yellow-gold time warp ribbon */}
          <path
            d="M8.5,9.5 L15.5,9.5 L15.5,6.5 L21,11.5 L15.5,16.5 L15.5,13.5 L8.5,13.5 Z"
            fill="#fce94f"
            strokeWidth="0.95"
          />
          {/* Sand inside bulbs */}
          <path d="M5.5,6.5 H11.5 L8.5,10.2 Z" fill="#edd400" stroke="none" />
          <path d="M5.2,18.8 H11.8 L8.5,14.5 Z" fill="#c4a000" stroke="none" />
          {/* Red warp accent */}
          <circle cx="8.5" cy="11.5" r="1.2" fill="#ef2929" strokeWidth="0.7" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.extractlocomotion',
    label: 'Extract Locomotion',
    family: 'sop',
    description:
      'Striding character in a white shirt and blue shorts above a forward locomotion ground arrow.',
    types: ['extractlocomotion', 'motionclipextractlocomotion'],
    icons: ['sop_kinefx-extractlocomotion', 'sop_kinefx-motionclipextractlocomotion'],
    refKey: 'SOP_kinefx-extractlocomotion',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Ground locomotion arrow */}
          <polygon
            points="3,18.2 15.5,18.2 15.5,16.6 21,19.2 15.5,21.8 15.5,20.2 3,20.2"
            fill="#d3d7cf"
            strokeWidth="0.85"
          />
          {/* Head */}
          <circle cx="13.5" cy="3.8" r="1.7" fill="#c17d11" strokeWidth="0.85" />
          {/* Arms and legs */}
          <path
            d="M8.5,7.8 L12.5,6.5 L16.5,8.5 M10.5,12.5 L6.5,16.5 M13,12.5 L16.5,16.5"
            fill="none"
            stroke="#262626"
            strokeWidth="2.3"
          />
          <path
            d="M8.5,7.8 L12.5,6.5 L16.5,8.5 M10.5,12.5 L6.5,16.5 M13,12.5 L16.5,16.5"
            fill="none"
            stroke="#c17d11"
            strokeWidth="1.2"
          />
          {/* White shirt */}
          <polygon points="10.8,5.8 14.2,6.2 13.5,10.2 9.8,9.8" fill="#eeeeec" strokeWidth="0.85" />
          {/* Blue shorts */}
          <polygon points="9.8,9.8 13.5,10.2 14,13.2 9.2,12.8" fill="#6294ca" strokeWidth="0.85" />
        </g>
      </>
    ),
  },
];
