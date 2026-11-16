import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 6, Part 0 (icons 0 to 9): Pyro and Vellum SOP icons.
 */
export const BATCH_06_PART_0: OperatorIconDef[] = [
  {
    id: 'sop.pyrosourcespread',
    label: 'Pyro Source Spread',
    family: 'sop',
    description:
      'Fiery orange-red flame front spreading outward from a bright yellow-white core with cyan spread arrows.',
    types: ['pyrosourcespread'],
    icons: ['sop_pyrosourcespread'],
    refKey: 'SOP_pyrosourcespread',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-fire`} cx="45%" cy="60%" r="55%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#f8ed6c" />
            <stop offset="65%" stopColor="#f17912" />
            <stop offset="100%" stopColor="#95320c" />
          </radialGradient>
        </defs>
        <ellipse
          cx="12"
          cy="17.5"
          rx="9.5"
          ry="4"
          fill="#581c0e"
          stroke="#262626"
          strokeWidth="1"
        />
        <path
          d="M3.5,17.2 C3.2,14.5 5.2,12.8 6.5,13.8 C6.8,10.5 9.2,8.2 11.2,10.2 C12.2,6.5 15.2,5.2 16.2,8.8 C17.8,7.8 19.5,9.8 18.8,12.2 C20.5,12.5 21.2,15 20.2,17.2 C18.2,19.8 5.8,19.8 3.5,17.2 Z"
          fill={`url(#${uid}-fire)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M7.5,16.8 C7.5,14.5 9.2,13.2 10.5,14.2 C11.2,11.5 13.5,11.2 14.2,13.8 C15.5,13.2 16.8,14.8 16.2,16.8 Z"
          fill="#fbf6b8"
          stroke="#d4290c"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#262626" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.5,18.2 L2.2,19.5 M2.2,19.5 L4.2,19.8 M2.2,19.5 L3,17.8" />
          <path d="M18.5,18.2 L21.8,19.5 M21.8,19.5 L19.8,19.8 M21.8,19.5 L21,17.8" />
        </g>
        <g fill="none" stroke="#b4d8e9" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.5,18.2 L2.2,19.5 M2.2,19.5 L4.2,19.8 M2.2,19.5 L3,17.8" />
          <path d="M18.5,18.2 L21.8,19.5 M21.8,19.5 L19.8,19.8 M21.8,19.5 L21,17.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.pyrospawnsources',
    label: 'Pyro Spawn Sources',
    family: 'sop',
    description:
      'Isometric tan ground slab with a green-and-white emitter triangle sign and two small orange spawn flags.',
    types: ['pyrospawnsources'],
    icons: ['sop_pyrospawnsources'],
    refKey: 'SOP_pyrospawnsources',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon points="3,16.2 12,11.4 21,16.2 12,21" fill="#e9b96e" />
          <polygon points="3,16.2 12,21 12,22.2 3,17.4" fill="#c89a5a" />
          <polygon points="21,16.2 12,21 12,22.2 21,17.4" fill="#8f5902" />
        </g>
        <line x1="12" y1="10" x2="12" y2="15.2" stroke="#262626" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="10" x2="12" y2="15.2" stroke="#d3d7cf" strokeWidth="1" strokeLinecap="round" />
        <polygon
          points="7,10.2 12,2 17,10.2"
          fill="#8ae234"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <polygon points="8.8,9.2 12,3.8 15.2,9.2" fill="#ffffff" />
        <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <line x1="14.5" y1="18" x2="14.5" y2="13" strokeWidth="1.2" strokeLinecap="round" />
          <polygon points="14.5,13 17.5,11.5 17.5,14 14.5,15.5" fill="#fcaf3e" />
          <line x1="19.2" y1="16" x2="19.2" y2="11" strokeWidth="1.2" strokeLinecap="round" />
          <polygon points="19.2,11 22.2,9.5 22.2,12 19.2,13.5" fill="#ce5c00" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.pyrothrusterexhaust',
    label: 'Pyro Thruster Exhaust',
    family: 'sop',
    description:
      'Angled metallic thruster nozzle in the upper left blasting a cyan, magenta and yellow shock-diamond exhaust plume.',
    types: ['pyrothrusterexhaust'],
    icons: ['sop_pyrothrusterexhaust'],
    refKey: 'SOP_pyrothrusterexhaust',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-plume`} x1="25%" y1="25%" x2="95%" y2="95%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#7af0f9" />
            <stop offset="70%" stopColor="#f78be3" />
            <stop offset="100%" stopColor="#fcea56" />
          </linearGradient>
        </defs>
        <path
          d="M9.5,13.5 L18.5,21.5 C20.2,22.5 22.5,20.2 21.5,18.5 L13.5,9.5 Z"
          fill={`url(#${uid}-plume)`}
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <polygon points="11.5,11.5 15.8,13.2 17,17 13.2,15.8" fill="#ffffff" opacity="0.85" />
        <polygon points="15.2,15.2 18.5,16.5 19.5,19.5 16.5,18.5" fill="#bff8fc" opacity="0.8" />
        <g stroke="#262626" strokeWidth="1.05" strokeLinejoin="round">
          <path
            d="M2.2,6.2 C1.5,4.8 4.8,1.5 6.2,2.2 L9.8,4.8 C8.8,6.8 6.8,8.8 4.8,9.8 Z"
            fill="#888a85"
          />
          <path
            d="M4.8,9.8 C6.8,8.8 8.8,6.8 9.8,4.8 L13.8,8.2 C12.5,10.8 10.8,12.5 8.2,13.8 Z"
            fill="#d3d7cf"
          />
          <ellipse
            cx="11"
            cy="11"
            rx="4.2"
            ry="1.8"
            transform="rotate(-45 11 11)"
            fill="#2e3436"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.pyrotrailpath',
    label: 'Pyro Trail Path',
    family: 'sop',
    description:
      'Five white-cased orange trajectory arcs fanning upward from a fiery yellow-orange burst at the bottom.',
    types: ['pyrotrailpath'],
    icons: ['sop_pyrotrailpath'],
    refKey: 'SOP_pyrotrailpath',
    render: () => (
      <>
        <ellipse cx="11.5" cy="20.2" rx="9.5" ry="2.2" fill="#888a85" opacity="0.45" />
        <g fill="none" stroke="#262626" strokeWidth="2.3" strokeLinecap="round">
          <path d="M11.5,18.8 C10.2,13 7.2,9.5 2.8,8.2" />
          <path d="M11.5,18.8 C11.5,12 11.8,7.5 14,2.5" />
          <path d="M11.5,18.8 C13.5,12 15.2,9.2 20.4,6.8" />
          <path d="M11.5,18.8 C14.2,13 18.2,11 20.8,10.5" />
          <path d="M11.5,18.8 C14.2,15.5 17,14 19.2,13.5" />
        </g>
        <g fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round">
          <path d="M11.5,18.8 C10.2,13 7.2,9.5 2.8,8.2" />
          <path d="M11.5,18.8 C11.5,12 11.8,7.5 14,2.5" />
          <path d="M11.5,18.8 C13.5,12 15.2,9.2 20.4,6.8" />
          <path d="M11.5,18.8 C14.2,13 18.2,11 20.8,10.5" />
          <path d="M11.5,18.8 C14.2,15.5 17,14 19.2,13.5" />
        </g>
        <path
          d="M6.5,19.8 C6,17.2 8.2,15.2 9.8,16.2 C10.5,13.2 12.8,13.2 13.5,16 C15.2,15 17.2,17 16.5,19.8 Z"
          fill="#f57900"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M8.8,19.8 C8.8,17.8 10.2,16.8 11.5,15.2 C12.8,16.8 14.2,17.8 14.2,19.8 Z"
          fill="#fce94f"
        />
      </>
    ),
  },
  {
    id: 'sop.pyrotrailsource',
    label: 'Pyro Trail Source',
    family: 'sop',
    description:
      'Fiery yellow-orange burst launching arcing smoke and flame plumes with grey cloud puffs.',
    types: ['pyrotrailsource'],
    icons: ['sop_pyrotrailsource'],
    refKey: 'SOP_pyrotrailsource',
    render: () => (
      <>
        <ellipse cx="11.5" cy="20.2" rx="9.5" ry="2.2" fill="#888a85" opacity="0.45" />
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <path
            d="M11.2,15.5 C9.5,12.5 7,10.2 3.8,9.5 C3.2,8.2 4.5,6.8 6.2,7.5 C7.5,6.5 9.2,7.8 9.2,9.2 C10.5,11 11.2,13.2 11.8,15.2 Z"
            fill="#d3d7cf"
          />
          <path
            d="M11.5,14.8 C11,10.5 11.2,6.8 12.8,3.2 C14.2,2.8 15.2,4.2 14.5,5.8 C15.5,6.8 14.8,8.5 13.8,9 C13,11 12.5,13 12.2,14.8 Z"
            fill="#eeeeec"
          />
          <path
            d="M12.5,15.5 C14.2,11.8 16.8,9 19.8,7.5 C21,7.8 21.2,9.5 19.8,10.2 C18.8,11 16.5,13 13.5,16.2 Z"
            fill="#d3d7cf"
          />
        </g>
        <path
          d="M6,19.8 C5.5,16.8 7.8,14.5 9.5,15.5 C10.5,11.8 13,11.8 13.8,15.2 C15.8,14.2 18,16.5 17,19.8 Z"
          fill="#f57900"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M8.2,19.8 C8.2,17.2 10,15.8 11.6,13.8 C13.2,15.8 15,17.2 15,19.8 Z"
          fill="#fce94f"
          stroke="#fcaf3e"
          strokeWidth="0.5"
        />
      </>
    ),
  },
  {
    id: 'sop.vellumattachconstraints',
    label: 'Vellum Attach Constraints',
    family: 'sop',
    description:
      'Pink cylinder and blue cylinder joined by orange and teal Vellum attachment constraint struts.',
    types: ['vellumattachconstraints'],
    icons: ['sop_vellumattachconstraints'],
    refKey: 'SOP_vellumattachconstraints',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <path
            d="M10.2,14.8 L14.8,10.2 C15.8,9.2 18.2,10.2 19.8,11.8 C21.4,13.4 22.4,15.8 21.4,16.8 L16.8,21.4 Z"
            fill="#7098c4"
          />
          <ellipse
            cx="13.5"
            cy="18.1"
            rx="2.4"
            ry="4.8"
            transform="rotate(-45 13.5 18.1)"
            fill="#94b4d6"
          />
          <path
            d="M3.5,8.5 L8.2,3.8 C9.2,2.8 11.8,4 13.5,5.8 C15.2,7.5 16.4,10 15.4,11 L10.8,15.6 Z"
            fill="#cc6868"
          />
          <ellipse
            cx="7.2"
            cy="12.1"
            rx="2.6"
            ry="5"
            transform="rotate(-45 7.2 12.1)"
            fill="#f9b1b1"
          />
        </g>
        <g stroke="#262626" strokeWidth="1.8" strokeLinecap="round">
          <line x1="9.2" y1="10.2" x2="14.5" y2="15.5" />
          <line x1="7.2" y1="13.2" x2="12.2" y2="18.2" />
          <line x1="11.8" y1="8.2" x2="16.8" y2="13.2" />
        </g>
        <g stroke="#f57900" strokeWidth="1" strokeLinecap="round">
          <line x1="9.2" y1="10.2" x2="14.5" y2="15.5" />
          <line x1="7.2" y1="13.2" x2="12.2" y2="18.2" />
          <line x1="11.8" y1="8.2" x2="16.8" y2="13.2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.vellumbrush',
    label: 'Vellum Brush',
    family: 'sop',
    description:
      'Draped cyan-teal Vellum cloth surface with undulating folds and a dark sculpting brush stroke.',
    types: ['vellumbrush'],
    icons: ['sop_vellumbrush'],
    refKey: 'SOP_vellumbrush',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-cloth`} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#32ecf3" />
            <stop offset="55%" stopColor="#26b2b7" />
            <stop offset="100%" stopColor="#145c5e" />
          </linearGradient>
        </defs>
        <ellipse cx="12" cy="18.8" rx="9.5" ry="2.6" fill="#262626" opacity="0.3" />
        <path
          d="M2.5,14 C3.5,11.5 5.8,10.5 8.5,11.2 C11,11.8 13,10.5 14.5,9 C16.2,11 18.2,11.8 20.5,13 C21.8,13.8 22,15.5 20.2,16.2 C17.8,17 15.8,19.2 13,20.5 C10.2,21.5 7.8,20.5 6.8,18.2 C5.2,18.8 3.2,16.8 2.5,14 Z"
          fill={`url(#${uid}-cloth)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M5.2,14.8 C8.5,16.5 12.2,16.2 15.5,14.5 M7.5,17.5 C10.8,18.8 14.2,18.2 17.2,16.2"
          fill="none"
          stroke="#145c5e"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <path
          d="M12.2,12.5 C11.2,9.5 12.5,6.2 15.5,3.5 L18.2,5.5 C15.2,8 14,10.5 13.8,12.8 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.vellumconstraints_grain',
    label: 'Vellum Configure Grain',
    family: 'sop',
    description:
      'Grey 3D chute at top pouring a cluster of glossy cyan and teal Vellum grain capsules and spheres.',
    types: ['vellumconstraints_grain'],
    icons: ['sop_vellumconstraints_grain'],
    refKey: 'SOP_vellumconstraints_grain',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="8,3.2 12,1.8 16.5,3.5 12.5,5.2" fill="#eef2f7" />
          <polygon points="8,3.2 12.5,5.2 12.5,9.5 8,7.5" fill="#c0c7d1" />
          <polygon points="16.5,3.5 12.5,5.2 12.5,9.5 16.5,7.8" fill="#89929e" />
        </g>
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <rect x="9.5" y="9.2" width="4.8" height="2.8" rx="1.4" transform="rotate(-30 11.9 10.6)" fill="#7cc9ca" />
          <rect x="13.2" y="11.8" width="5" height="2.8" rx="1.4" transform="rotate(25 15.7 13.2)" fill="#35c2c4" />
          <rect x="5.8" y="13.2" width="5" height="2.8" rx="1.4" transform="rotate(-18 8.3 14.6)" fill="#0685bb" />
          <rect x="10.2" y="15.2" width="5.2" height="2.8" rx="1.4" transform="rotate(12 12.8 16.6)" fill="#b9f2f2" />
          <rect x="4.2" y="17.2" width="5.2" height="2.8" rx="1.4" transform="rotate(8 6.8 18.6)" fill="#35c2c4" />
          <rect x="14.5" y="16.8" width="5.2" height="2.8" rx="1.4" transform="rotate(-22 17.1 18.2)" fill="#0685bb" />
          <rect x="9.2" y="18.5" width="5.4" height="2.8" rx="1.4" fill="#7cc9ca" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.vellumconfiguremuscles',
    label: 'Vellum Configure Muscles',
    family: 'sop',
    description:
      'Flexed anatomical arm with crimson striated bicep and forearm muscles anchored by pale tendons.',
    types: ['vellumconfiguremuscles'],
    icons: ['sop_vellumconfiguremuscles'],
    refKey: 'SOP_vellumconfiguremuscles',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-muscle`} x1="20%" y1="20%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#fa9db5" />
            <stop offset="50%" stopColor="#d83252" />
            <stop offset="100%" stopColor="#a40000" />
          </linearGradient>
        </defs>
        <ellipse cx="12" cy="19.8" rx="9.5" ry="2.5" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="1.05" strokeLinejoin="round">
          <path
            d="M4.2,12.5 C3.5,14.8 5.2,17.2 8.2,19.5 C9.5,20.5 11.2,20.2 11.8,18.8 C14.5,19.2 17.5,18.2 19.2,16.5 C20.5,15.2 20,13.5 18.2,13.2 C16.5,12.8 15.2,11.2 14.5,9.5 C15.8,7.2 15.2,4.2 13,3.2 C10.8,2.2 8.8,4 8.8,6.5 C8.8,8.5 9.8,10.5 11.2,12.2 C9.5,12.2 7.5,13.5 6.8,14.8 C5.8,13.2 4.8,11.8 4.2,12.5 Z"
            fill={`url(#${uid}-muscle)`}
          />
          <path
            d="M11.2,3.5 C12.5,2.8 14.2,3.5 14.5,5.2 L12.2,6.2 Z"
            fill="#fbe7e4"
          />
          <path
            d="M8,17.8 C9,19.2 10.5,19.8 11.8,18.8 L10.2,16.8 Z"
            fill="#fbe7e4"
          />
        </g>
        <path
          d="M10.8,6.2 C11.2,8.5 12.2,10.5 13.5,12 M9.2,15.5 C12,15.8 15,15.2 17.2,14.2"
          fill="none"
          stroke="#fbe7e4"
          strokeWidth="0.65"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.vellumconfiguretissue',
    label: 'Vellum Configure Tissue',
    family: 'sop',
    description:
      '3D anatomical tissue block with a pink dermal wall on the left and golden cellular fat globules on the right.',
    types: ['vellumconfiguretissue'],
    icons: ['sop_vellumconfiguretissue'],
    refKey: 'SOP_vellumconfiguretissue',
    render: () => (
      <>
        <ellipse cx="12" cy="19.2" rx="9.5" ry="3.2" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="1.05" strokeLinejoin="round">
          <path
            d="M3,6.5 C4.2,4.5 6.8,4.2 10.5,8.8 L10.2,20.8 C7.2,18.2 4.8,16.8 3.2,16.2 Z"
            fill="#e96985"
          />
          <polygon
            points="10.5,8.8 21.2,5.2 20.2,16.5 10.2,20.8"
            fill="#db9730"
          />
          <path
            d="M3,6.5 C5.2,4.5 8.5,5.2 10.5,8.8 L21.2,5.2 C18.5,3.2 15.2,2.8 11.5,3.8 Z"
            fill="#ffdd8e"
          />
        </g>
        <g fill="#ffdd8e" stroke="#cc7b1b" strokeWidth="0.55">
          <circle cx="13.2" cy="11.5" r="1.3" />
          <circle cx="16.5" cy="10.2" r="1.4" />
          <circle cx="19" cy="9.2" r="1.1" />
          <circle cx="12.8" cy="14.8" r="1.4" />
          <circle cx="16" cy="13.5" r="1.3" />
          <circle cx="18.6" cy="12.6" r="1.2" />
          <circle cx="12.5" cy="17.8" r="1.1" />
          <circle cx="15.5" cy="16.5" r="1.2" />
          <circle cx="18.2" cy="15.2" r="1" />
        </g>
      </>
    ),
  },
];
