import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_07_PART_8: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.motionclipposedelete',

    label: 'MotionClip Pose Delete',

    family: 'sop',

    description: 'Motion trail arcs.',
    refKey: 'SOP_kinefx-motionclipposedelete',
    types: ['motionclipposedelete'],
    icons: ['sop_kinefx-motionclipposedelete', 'sop_kinefx-motionclipposedelete-2.0'],
    render: () => (
      <g>
        {/* Motion trail arcs */}
        <path d="M3.5 9.5C9 7.8 15 7.8 20.5 9.5M3.5 16.5C9 14.8 15 14.8 20.5 16.5" fill="none" stroke="#d0dfef" strokeWidth="0.8" strokeDasharray="1.5 1.2" />
        {/* Left & right blue poses */}
        <circle cx="5.5" cy="6.2" r="1.3" fill="#729fcf" stroke="#204a87" strokeWidth="0.6" />
        <path d="M5.2 7.8L4 12.5L2.5 17M4 12.5L6.5 17" fill="none" stroke="#3465a4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18.5" cy="6.2" r="1.3" fill="#729fcf" stroke="#204a87" strokeWidth="0.6" />
        <path d="M18.2 7.8L17 12.5L15.5 17M17 12.5L19.5 17" fill="none" stroke="#3465a4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Center red pose being deleted */}
        <circle cx="12" cy="5.2" r="1.6" fill="#ef2929" stroke="#a40000" strokeWidth="0.7" />
        <path
          d="M11.5 7.2L10.2 12.2L7.8 10.8M11 8.8L14.5 10.2M10.2 12.2L13 15.5L12 19.8M10.2 12.2L7.5 16.2L5.8 19.2"
          fill="none"
          stroke="#a40000"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 7.2L10.2 12.2L7.8 10.8M11 8.8L14.5 10.2M10.2 12.2L13 15.5L12 19.8M10.2 12.2L7.5 16.2L5.8 19.2"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionclipposeinsert',

    label: 'MotionClip Pose Insert',

    family: 'sop',

    description: 'Motion trail arcs.',
    refKey: 'SOP_kinefx-motionclipposeinsert',
    types: ['motionclipposeinsert'],
    icons: ['sop_kinefx-motionclipposeinsert'],
    render: () => (
      <g>
        {/* Motion trail arcs */}
        <path d="M3.5 9.5C9 7.8 15 7.8 20.5 9.5M3.5 16.5C9 14.8 15 14.8 20.5 16.5" fill="none" stroke="#d0dfef" strokeWidth="0.8" strokeDasharray="1.5 1.2" />
        {/* Left & right blue poses */}
        <circle cx="5.5" cy="6.2" r="1.3" fill="#729fcf" stroke="#204a87" strokeWidth="0.6" />
        <path d="M5.2 7.8L4 12.5L2.5 17M4 12.5L6.5 17" fill="none" stroke="#3465a4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18.5" cy="6.2" r="1.3" fill="#729fcf" stroke="#204a87" strokeWidth="0.6" />
        <path d="M18.2 7.8L17 12.5L15.5 17M17 12.5L19.5 17" fill="none" stroke="#3465a4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Center bright green inserted pose */}
        <circle cx="12" cy="5.2" r="1.6" fill="#8ae234" stroke="#356f00" strokeWidth="0.7" />
        <path
          d="M11.5 7.2L10.2 12.2L7.8 10.8M11 8.8L14.5 10.2M10.2 12.2L13 15.5L12 19.8M10.2 12.2L7.5 16.2L5.8 19.2"
          fill="none"
          stroke="#356f00"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 7.2L10.2 12.2L7.8 10.8M11 8.8L14.5 10.2M10.2 12.2L13 15.5L12 19.8M10.2 12.2L7.5 16.2L5.8 19.2"
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
    id: 'sop.kinefx.motionclipsequence',

    label: 'MotionClip Sequence',

    family: 'sop',

    description: 'Sequence transition curve.',
    refKey: 'SOP_kinefx-motionclipsequence',
    types: ['motionclipsequence'],
    icons: ['sop_kinefx-motionclipsequence'],
    render: () => (
      <g>
        {/* Sequence transition curve */}
        <path d="M4 17.5C8.5 16.5 13 13.5 18.5 9.5" fill="none" stroke="#d0dfef" strokeWidth="0.9" strokeDasharray="1.6 1.2" />
        {/* First clip: blue running figure on bottom-left */}
        <circle cx="8" cy="7.5" r="1.5" fill="#729fcf" stroke="#204a87" strokeWidth="0.65" />
        <path
          d="M7.5 9.2L6 13.8L3.5 12.8M7 10.8L10.5 12M6 13.8L8.5 16.8L7.5 20.5M6 13.8L3.5 17.5L2 20"
          fill="none"
          stroke="#204a87"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 9.2L6 13.8L3.5 12.8M7 10.8L10.5 12M6 13.8L8.5 16.8L7.5 20.5M6 13.8L3.5 17.5L2 20"
          fill="none"
          stroke="#729fcf"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Second clip: green leaping figure on top-right */}
        <circle cx="17" cy="4.2" r="1.5" fill="#8ae234" stroke="#356f00" strokeWidth="0.65" />
        <path
          d="M16.5 6L15 10.5L12.5 9.2M16 7.5L20.5 6.2M15 10.5L18.2 13.2L17.5 17.2M15 10.5L12.2 14.2L10.5 16.8"
          fill="none"
          stroke="#356f00"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 6L15 10.5L12.5 9.2M16 7.5L20.5 6.2M15 10.5L18.2 13.2L17.5 17.2M15 10.5L12.2 14.2L10.5 16.8"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.motionclipupdate',

    label: 'MotionClip Update',

    family: 'sop',

    description: 'Ghost prior pose at top-left.',
    refKey: 'SOP_kinefx-motionclipupdate',
    types: ['motionclipupdate'],
    icons: ['sop_kinefx-motionclipupdate'],
    render: () => (
      <g>
        {/* Ghost prior pose at top-left */}
        <circle cx="8.5" cy="5.2" r="1.5" fill="#babdb6" opacity="0.55" />
        <path
          d="M8 7L6.5 11.5L4 10.5M6.5 11.5L9 14.8L8 18.5M6.5 11.5L4 15.5"
          fill="none"
          stroke="#babdb6"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
        {/* Updated blue/green pose at center-right */}
        <circle cx="15.5" cy="5.8" r="1.8" fill="#729fcf" stroke="#204a87" strokeWidth="0.75" />
        <path
          d="M14.8 7.8L12.8 13L9.5 11.5M14.2 9.5L18.8 11L20.5 9M12.8 13L16.2 16L15 20.5M12.8 13L9 17L6.5 20"
          fill="none"
          stroke="#204a87"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.8 7.8L12.8 13L9.5 11.5M14.2 9.5L18.8 11L20.5 9M12.8 13L16.2 16L15 20.5M12.8 13L9 17L6.5 20"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Update arrow from ghost to active pose */}
        <path d="M9.5 4C11.5 3.2 13.2 3.5 14.2 4.5" fill="none" stroke="#8ae234" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.orientjoints',

    label: 'Orient Joints',

    family: 'sop',

    description: 'V-bent blue limb cylinder.',
    refKey: 'SOP_kinefx-orientjoints',
    types: ['orientjoints'],
    icons: ['sop_kinefx-orientjoints'],
    render: () => (
      <g>
        {/* V-bent blue limb cylinder */}
        <path
          d="M4.5 9.5L12 16.8L20.5 7.5"
          fill="none"
          stroke="#204a87"
          strokeWidth="5.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 9.5L12 16.8L20.5 7.5"
          fill="none"
          stroke="#729fcf"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Green bone segments */}
        <path d="M5 10L12 16.8L20 8" fill="none" stroke="#4e9a06" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Joint orientation gizmo ring and axes */}
        <circle cx="12" cy="16.8" r="4.6" fill="#ffffff" fillOpacity="0.25" stroke="#8ae234" strokeWidth="0.9" />
        <line x1="12" y1="16.8" x2="15.8" y2="13.2" stroke="#8ae234" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="12" y1="16.8" x2="8.5" y2="13.2" stroke="#f57f7f" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="12" cy="16.8" r="1.4" fill="#eeeeec" stroke="#2e3436" strokeWidth="0.65" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.parentjoints',

    label: 'Parent Joints',

    family: 'sop',

    description: 'V-bent blue limb cylinder.',
    refKey: 'SOP_kinefx-parentjoints',
    types: ['parentjoints'],
    icons: ['sop_kinefx-parentjoints'],
    render: () => (
      <g>
        {/* V-bent blue limb cylinder */}
        <path
          d="M4.5 10L11.8 17.2L20.5 8"
          fill="none"
          stroke="#204a87"
          strokeWidth="5.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 10L11.8 17.2L20.5 8"
          fill="none"
          stroke="#729fcf"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Newly parented bone link highlighted in coral/green */}
        <line x1="5" y1="10.5" x2="11.8" y2="17.2" stroke="#f57f7f" strokeWidth="1.6" strokeDasharray="1.6 1" strokeLinecap="round" />
        <line x1="11.8" y1="17.2" x2="20" y2="8.5" stroke="#8ae234" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="5" cy="10.5" r="1.5" fill="#f57f7f" stroke="#2e3436" strokeWidth="0.6" />
        <circle cx="11.8" cy="17.2" r="1.6" fill="#8ae234" stroke="#2e3436" strokeWidth="0.6" />
        <circle cx="20" cy="8.5" r="1.4" fill="#8ae234" stroke="#2e3436" strokeWidth="0.6" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.pendulummotion',

    label: 'Pendulum Motion',

    family: 'sop',

    description: 'Sweeping pendulum motion trail arc.',
    refKey: 'SOP_kinefx-pendulummotion',
    types: ['pendulummotion'],
    icons: ['sop_kinefx-pendulummotion'],
    render: () => (
      <g>
        {/* Sweeping pendulum motion trail arc */}
        <path
          d="M3 13.5C6.5 17.5 12 19 17.5 18L16.5 15.2C11.8 16 7.2 14.8 4.2 12Z"
          fill="#d0dfef"
          opacity="0.75"
        />
        <path d="M3 13.5C6.5 17.5 12 19 17.5 18" fill="none" stroke="#888a85" strokeWidth="0.85" strokeLinecap="round" />
        {/* Chain links from top pivot to pendulum bob */}
        <line x1="10" y1="2.5" x2="16.8" y2="14.5" stroke="#2e3436" strokeWidth="1.8" strokeDasharray="2.2 1.2" strokeLinecap="round" />
        <line x1="10" y1="2.5" x2="16.8" y2="14.5" stroke="#babdb6" strokeWidth="0.8" strokeDasharray="2.2 1.2" strokeLinecap="round" />
        {/* Glowing yellow/gold pendulum bob */}
        <circle cx="17.5" cy="16.2" r="4.2" fill="#fce94f" fillOpacity="0.3" />
        <circle cx="17.5" cy="16.2" r="2.8" fill="#fce94f" stroke="#edd400" strokeWidth="0.85" />
        <circle cx="16.8" cy="15.4" r="0.9" fill="#ffffff" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.posedifference',

    label: 'Pose Difference',

    family: 'sop',

    description: 'Faded upper-arms pose.',
    refKey: 'SOP_kinefx-posedifference',
    types: ['posedifference'],
    icons: ['sop_kinefx-posedifference'],
    render: () => (
      <g>
        {/* Faded upper-arms pose */}
        <path
          d="M4.5 7.5L12 11L19.5 7.5"
          fill="none"
          stroke="#c4d7eb"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Active lower-arms blue torso & arms pose */}
        <circle cx="12" cy="6.2" r="2.1" fill="#729fcf" stroke="#204a87" strokeWidth="0.8" />
        <path
          d="M4.5 15.5L9.5 11.5H14.5L19.5 15.5M12 9V19.5"
          fill="none"
          stroke="#204a87"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 15.5L9.5 11.5H14.5L19.5 15.5M12 9V19.5"
          fill="none"
          stroke="#729fcf"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Green pose-difference arc indicators on both sides */}
        <path d="M5.2 8.5C4.2 10.5 4.2 12.5 5.2 14.5" fill="none" stroke="#8ae234" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M18.8 8.5C19.8 10.5 19.8 12.5 18.8 14.5" fill="none" stroke="#8ae234" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.projectilemotion',

    label: 'Projectile Motion',

    family: 'sop',

    description: 'Parabolic green projectile trajectory arc.',
    refKey: 'SOP_kinefx-projectilemotion',
    types: ['projectilemotion'],
    icons: ['sop_kinefx-projectilemotion'],
    render: () => (
      <g>
        {/* Parabolic green projectile trajectory arc */}
        <path
          d="M11.5 10.5C15 5.5 18.8 6.5 21.5 17.5"
          fill="none"
          stroke="#00a000"
          strokeWidth="1.4"
          strokeDasharray="2 1.3"
          strokeLinecap="round"
        />
        <circle cx="21.5" cy="17.5" r="1.4" fill="#2e3436" stroke="#eeeeec" strokeWidth="0.5" />
        {/* Cannon barrel tilted up-right */}
        <path
          d="M3.5 14.5L11 9.5L12.8 12.2L5.2 16.8Z"
          fill="#888a85"
          stroke="#2e3436"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Wooden carriage & wheel */}
        <path d="M3 16H9.5L8.2 18.8H2.5Z" fill="#b16a10" stroke="#7b4706" strokeWidth="0.7" strokeLinejoin="round" />
        <circle cx="6.2" cy="18" r="2.6" fill="#e1ab5b" stroke="#7b4706" strokeWidth="0.8" />
        <circle cx="6.2" cy="18" r="0.9" fill="#555753" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.ragdollcollisionshapes',

    label: 'Ragdoll Collision Shapes',

    family: 'sop',

    description: 'Internal character limbs & body.',
    refKey: 'SOP_kinefx-ragdollcollisionshapes',
    types: ['ragdollcollisionshapes'],
    icons: ['sop_kinefx-ragdollcollisionshapes'],
    render: () => (
      <g>
        {/* Internal character limbs & body */}
        <line x1="10.2" y1="14" x2="9.5" y2="20" stroke="#3465a4" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="13.8" y1="14" x2="14.5" y2="19.5" stroke="#3465a4" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="9" r="5" fill="#9fbede" stroke="#3465a4" strokeWidth="0.7" />
        {/* Translucent green ragdoll collision capsules and sphere */}
        <circle
          cx="12"
          cy="9"
          r="6.4"
          fill="#8ae234"
          fillOpacity="0.35"
          stroke="#4e9a06"
          strokeWidth="0.9"
        />
        <rect
          x="8.2"
          y="14.5"
          width="3"
          height="6.2"
          rx="1.5"
          fill="#8ae234"
          fillOpacity="0.4"
          stroke="#4e9a06"
          strokeWidth="0.8"
        />
        <rect
          x="12.8"
          y="14.2"
          width="3"
          height="6"
          rx="1.5"
          fill="#8ae234"
          fillOpacity="0.4"
          stroke="#4e9a06"
          strokeWidth="0.8"
        />
      </g>
    ),
  },
];
