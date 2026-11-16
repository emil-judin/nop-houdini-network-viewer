import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_07_PART_7: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.ikchains',

    label: 'IK Chains',

    family: 'sop',

    description: 'Bent blue limb cylinder.',
    refKey: 'SOP_kinefx-ikchains',
    types: ['ikchains'],
    icons: ['sop_kinefx-ikchains', 'sop_kinefx-ikchains-2.0'],
    render: () => (
      <g>
        {/* Bent blue limb cylinder */}
        <path
          d="M9.5 4.5V15H20"
          fill="none"
          stroke="#204a87"
          strokeWidth="5.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 4.5V15H20"
          fill="none"
          stroke="#729fcf"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dashed coral IK solver line between root and end effector */}
        <line
          x1="9.5"
          y1="4.5"
          x2="19.5"
          y2="15"
          stroke="#f57f7f"
          strokeWidth="0.95"
          strokeDasharray="1.6 1.2"
        />
        {/* Green internal IK chain bones and joints */}
        <path
          d="M9.5 4.5V15H19.5"
          fill="none"
          stroke="#4e9a06"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="4.5" r="1.4" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.65" />
        <circle cx="9.5" cy="15" r="1.5" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.65" />
        <circle cx="19.5" cy="15" r="1.5" fill="#d0f3ae" stroke="#4e9a06" strokeWidth="0.65" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.jointcapturebiharmonic',

    label: 'Joint Capture Biharmonic',

    family: 'sop',

    description: 'Blue character mesh.',
    refKey: 'SOP_kinefx-jointcapturebiharmonic',
    types: ['jointcapturebiharmonic'],
    icons: ['sop_kinefx-jointcapturebiharmonic'],
    render: () => (
      <g>
        {/* Blue character mesh */}
        <circle cx="12" cy="4.2" r="2" fill="#729fcf" stroke="#204a87" strokeWidth="0.8" />
        <path
          d="M5 8.5H19V10.8H14.8V14.8L16.2 21H13.6L12 16L10.4 21H7.8L9.2 14.8V10.8H5Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Biharmonic red/pink heat weight bands */}
        <rect x="9.3" y="9" width="5.4" height="4.8" rx="0.8" fill="#ed9991" stroke="#a40000" strokeWidth="0.55" />
        <rect x="10.2" y="10.2" width="3.6" height="2.4" rx="0.5" fill="#fbe7e4" />
        {/* Internal bone line and joints */}
        <line x1="12" y1="6.8" x2="12" y2="15" stroke="#2e3436" strokeWidth="1" />
        <circle cx="12" cy="9.5" r="1.1" fill="#eeeeec" stroke="#2e3436" strokeWidth="0.6" />
        <circle cx="12" cy="14.2" r="1.1" fill="#eeeeec" stroke="#2e3436" strokeWidth="0.6" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.mocapimport',

    label: 'Mocap Import',

    family: 'sop',

    description: 'Dark mocap suit figure in action pose.',
    refKey: 'SOP_kinefx-mocapimport',
    types: ['mocapimport'],
    icons: ['sop_kinefx-mocapimport'],
    render: () => (
      <g>
        {/* Dark mocap suit figure in action pose */}
        <circle cx="12.2" cy="4.8" r="2" fill="#2e3436" stroke="#231f20" strokeWidth="0.7" />
        <path
          d="M6.5 3.5L9.2 8.8L15.2 8.2L17.5 3.2M12.2 7V14L8.5 20.5M12.2 14L16.2 20"
          fill="none"
          stroke="#2e3436"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Optical mocap tracking markers */}
        <circle cx="12.2" cy="4.2" r="0.75" fill="#ffffff" />
        <circle cx="6.5" cy="3.5" r="0.85" fill="#b2cbe5" stroke="#3465a4" strokeWidth="0.4" />
        <circle cx="17.5" cy="3.2" r="0.85" fill="#b2cbe5" stroke="#3465a4" strokeWidth="0.4" />
        <circle cx="9.2" cy="8.8" r="0.8" fill="#ffffff" />
        <circle cx="15.2" cy="8.2" r="0.8" fill="#ffffff" />
        <circle cx="12.2" cy="11.2" r="0.85" fill="#729fcf" />
        <circle cx="12.2" cy="14" r="0.8" fill="#ffffff" />
        <circle cx="10.2" cy="17.2" r="0.8" fill="#729fcf" />
        <circle cx="14.4" cy="17" r="0.8" fill="#729fcf" />
        <circle cx="8.5" cy="20.5" r="0.85" fill="#ffffff" />
        <circle cx="16.2" cy="20" r="0.85" fill="#ffffff" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.mocapstream',

    label: 'Mocap Stream',

    family: 'sop',

    description: 'Stream display screen with green scanlines.',
    refKey: 'SOP_kinefx-mocapstream',
    types: ['mocapstream'],
    icons: ['sop_kinefx-mocapstream'],
    render: () => (
      <g>
        {/* Stream display screen with green scanlines */}
        <rect x="2" y="3.5" width="20" height="16.5" rx="2.2" fill="#4e9a06" stroke="#2e3436" strokeWidth="0.85" />
        <line x1="2.8" y1="6.8" x2="21.2" y2="6.8" stroke="#8ae234" strokeWidth="1" />
        <line x1="2.8" y1="9.8" x2="21.2" y2="9.8" stroke="#a3e85f" strokeWidth="1" />
        <line x1="2.8" y1="12.8" x2="21.2" y2="12.8" stroke="#8ae234" strokeWidth="1" />
        <line x1="2.8" y1="15.8" x2="21.2" y2="15.8" stroke="#a3e85f" strokeWidth="1" />
        {/* Dark mocap figure inside screen */}
        <circle cx="12" cy="6.8" r="1.6" fill="#2e3436" />
        <path
          d="M7.8 9.8L12 10.2L16.2 8.8M12 8.8V14.5L9.2 19M12 14.5L14.8 19"
          fill="none"
          stroke="#2e3436"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* White optical mocap markers */}
        <circle cx="12" cy="6.6" r="0.65" fill="#ffffff" />
        <circle cx="7.8" cy="9.8" r="0.65" fill="#ffffff" />
        <circle cx="16.2" cy="8.8" r="0.65" fill="#ffffff" />
        <circle cx="12" cy="11.8" r="0.7" fill="#729fcf" />
        <circle cx="10.2" cy="16.5" r="0.65" fill="#ffffff" />
        <circle cx="13.8" cy="16.5" r="0.65" fill="#ffffff" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionmixer',

    label: 'Motion Mixer',

    family: 'sop',

    description: 'Swirling multi-track motion arcs.',
    refKey: 'SOP_kinefx-motionmixer',
    types: ['motionmixer'],
    icons: ['sop_kinefx-motionmixer'],
    render: () => (
      <g>
        {/* Swirling multi-track motion arcs */}
        <path d="M3 14C4.5 6 11 2.5 18 4.5" fill="none" stroke="#3465a4" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M4.5 16.5C6.5 9 12 5.5 18.5 7" fill="none" stroke="#729fcf" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M6.5 18.5C8.5 12 13 8.8 19 9.8" fill="none" stroke="#8ae234" strokeWidth="1.2" strokeLinecap="round" />
        {/* Dynamic running figure in orange/gold/blue */}
        <circle cx="17.5" cy="7.5" r="1.7" fill="#fce94f" stroke="#f57900" strokeWidth="0.7" />
        <path
          d="M16.5 9.5L14 14L10.5 12.8M15.8 11L20 12.5M14 14L17.2 17L16 21M14 14L10.2 18L7.5 20.5"
          fill="none"
          stroke="#f57900"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 9.5L14 14L10.5 12.8M15.8 11L20 12.5M14 14L17.2 17L16 21M14 14L10.2 18L7.5 20.5"
          fill="none"
          stroke="#fce94f"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionmixerfetch',

    label: 'Motion Mixer Fetch',

    family: 'sop',

    description: 'Swirling motion arcs shifted left.',
    refKey: 'SOP_kinefx-motionmixerfetch',
    types: ['motionmixerfetch'],
    icons: ['sop_kinefx-motionmixerfetch'],
    render: () => (
      <g>
        {/* Swirling motion arcs shifted left */}
        <path d="M2 13.5C3.5 6 9 2.5 15 4.5" fill="none" stroke="#3465a4" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3.5 16C5.2 9 10 5.5 15.5 7" fill="none" stroke="#729fcf" strokeWidth="1.3" strokeLinecap="round" />
        {/* Running figure */}
        <circle cx="14" cy="7.5" r="1.6" fill="#fce94f" stroke="#f57900" strokeWidth="0.65" />
        <path
          d="M13.2 9.5L11 13.8L8 12.5M12.5 11L16 12.2M11 13.8L13.8 16.8L12.8 20.5M11 13.8L7.5 17.5L5.2 20"
          fill="none"
          stroke="#f57900"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.2 9.5L11 13.8L8 12.5M12.5 11L16 12.2M11 13.8L13.8 16.8L12.8 20.5M11 13.8L7.5 17.5L5.2 20"
          fill="none"
          stroke="#fce94f"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Fetch downward arrow on right */}
        <path
          d="M19 10V19.5M16.5 17L19 19.8L21.5 17"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionclipblend',

    label: 'MotionClip Blend',

    family: 'sop',

    description: 'Dashed motion-blend interpolation arcs.',
    refKey: 'SOP_kinefx-motionclipblend',
    types: ['motionclipblend'],
    icons: ['sop_kinefx-motionclipblend'],
    render: () => (
      <g>
        {/* Dashed motion-blend interpolation arcs */}
        <path
          d="M6.5 6.5C10.5 5.2 14.5 5.2 18 6.8M4.5 12.5C9 11 14 11 19.5 12.8M4 19C9 17 14.5 17 20 19.5"
          fill="none"
          stroke="#d0dfef"
          strokeWidth="0.85"
          strokeDasharray="1.5 1.2"
        />
        {/* Ghost prior pose on left */}
        <circle cx="8.5" cy="6.2" r="1.4" fill="#c4d7eb" stroke="#3465a4" strokeWidth="0.6" opacity="0.7" />
        <path
          d="M8 8L6.5 12.5L4 11.5M6.5 12.5L8.5 16L7.5 19.5M6.5 12.5L4.2 16.5"
          fill="none"
          stroke="#729fcf"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        {/* Primary blended running figure on right with green skeleton */}
        <circle cx="16.5" cy="5.8" r="1.8" fill="#729fcf" stroke="#204a87" strokeWidth="0.75" />
        <path
          d="M15.8 7.8L13.5 13L10 11.5M15 9.5L19.5 11L21 9M13.5 13L17 16L15.8 20.5M13.5 13L9.8 17L7 20"
          fill="none"
          stroke="#204a87"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.8 7.8L13.5 13L10 11.5M15 9.5L19.5 11L21 9M13.5 13L17 16L15.8 20.5M13.5 13L9.8 17L7 20"
          fill="none"
          stroke="#8ae234"
          strokeWidth="0.95"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionclipcycle',

    label: 'MotionClip Cycle',

    family: 'sop',

    description: 'Running blue motion-clip figure.',
    refKey: 'SOP_kinefx-motionclipcycle',
    types: ['motionclipcycle'],
    icons: ['sop_kinefx-motionclipcycle'],
    render: () => (
      <g>
        {/* Running blue motion-clip figure */}
        <circle cx="14.5" cy="5.2" r="1.8" fill="#729fcf" stroke="#204a87" strokeWidth="0.75" />
        <path
          d="M13.8 7.2L11.8 12.2L8.5 10.8M13.2 8.8L17.5 10.2L19 8.5M11.8 12.2L15 15.2L14 19.8M11.8 12.2L8.2 16.2L6 19"
          fill="none"
          stroke="#204a87"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.8 7.2L11.8 12.2L8.5 10.8M13.2 8.8L17.5 10.2L19 8.5M11.8 12.2L15 15.2L14 19.8M11.8 12.2L8.2 16.2L6 19"
          fill="none"
          stroke="#8ae234"
          strokeWidth="0.95"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Red elliptical cycle arrow looping around figure */}
        <path
          d="M18.5 12C20.5 12.8 21.8 14 21.8 15.5C21.8 18 17.4 20 12 20C6.6 20 2.2 18 2.2 15.5C2.2 14.2 3.3 13 5.2 12.2"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <polygon points="6.8,11.8 3.8,11.2 4.8,13.8" fill="#ef2929" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionclipextract',

    label: 'MotionClip Extract',

    family: 'sop',

    description: 'Faded background motion trail poses.',
    refKey: 'SOP_kinefx-motionclipextract',
    types: ['motionclipextract'],
    icons: ['sop_kinefx-motionclipextract'],
    render: () => (
      <g>
        {/* Faded background motion trail poses */}
        <path
          d="M5.5 8.5L4 13L2.5 17.5M19.5 8.5L18 13L16.5 17.5"
          fill="none"
          stroke="#729fcf"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.55"
        />
        {/* Central extracted pose with bold dark/white highlight */}
        <circle cx="13" cy="5.5" r="1.9" fill="#729fcf" stroke="#204a87" strokeWidth="0.85" />
        <path
          d="M12.2 7.8L10.2 13L6.8 11.5M11.6 9.5L16 11L17.5 9M10.2 13L13.5 16L12.5 20.5M10.2 13L6.8 17L4.5 20"
          fill="none"
          stroke="#204a87"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.2 7.8L10.2 13L6.8 11.5M11.6 9.5L16 11L17.5 9M10.2 13L13.5 16L12.5 20.5M10.2 13L6.8 17L4.5 20"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionclipextractkeyposes',

    label: 'MotionClip Extract Key Poses',

    family: 'sop',

    description: 'Horizontal clip timeline bar.',
    refKey: 'SOP_kinefx-motionclipextractkeyposes',
    types: ['motionclipextractkeyposes'],
    icons: ['sop_kinefx-motionclipextractkeyposes'],
    render: () => (
      <g>
        {/* Horizontal clip timeline bar */}
        <rect x="3" y="9.5" width="18" height="2.2" rx="0.6" fill="#2671aa" stroke="#2e3436" strokeWidth="0.6" />
        {/* Left dark/muted pose */}
        <circle cx="6.5" cy="5.2" r="1.4" fill="#34393b" />
        <path
          d="M6.2 7L5 11.8L3.2 16.5M5 11.8L7.5 16.5"
          fill="none"
          stroke="#34393b"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Center extracted bright cyan key pose */}
        <circle cx="12.5" cy="4.8" r="1.6" fill="#41d9e5" stroke="#2671aa" strokeWidth="0.6" />
        <path
          d="M12 6.8L10.5 11.8L8 10.5M11.5 8.5L15 9.8M10.5 11.8L13.2 15.2L12.2 19.5M10.5 11.8L7.8 16L6 19"
          fill="none"
          stroke="#2671aa"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6.8L10.5 11.8L8 10.5M11.5 8.5L15 9.8M10.5 11.8L13.2 15.2L12.2 19.5M10.5 11.8L7.8 16L6 19"
          fill="none"
          stroke="#41d9e5"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right extracted bright cyan key pose */}
        <circle cx="18.5" cy="5.2" r="1.5" fill="#41d9e5" stroke="#2671aa" strokeWidth="0.6" />
        <path
          d="M18 7.2L16.8 11.8L19.5 16.2M16.8 11.8L14.5 16.5"
          fill="none"
          stroke="#41d9e5"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
];
