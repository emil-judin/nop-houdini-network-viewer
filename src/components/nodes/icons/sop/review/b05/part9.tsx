import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_05_PART_9: OperatorIconDef[] = [
  {
    id: 'sop.particlefluidtank',

    label: 'Particle Fluid Tank',

    family: 'sop',

    description: 'Isometric glass tank back walls.',
    refKey: 'SOP_particlefluidtank',
    types: ['particlefluidtank'],
    icons: ['sop_particlefluidtank'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-water`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d0e7fa" />
            <stop offset="55%" stopColor="#8bc4f2" />
            <stop offset="100%" stopColor="#3065a0" />
          </linearGradient>
        </defs>
        {/* Isometric glass tank back walls */}
        <polygon
          points="2.5,5.5 13.5,2.2 21.5,6.8 20.2,18 9.2,21.8 3.2,15.5"
          fill="#eaf4fd"
          fillOpacity={0.35}
          stroke="#3f3131"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        {/* Blue water volume filling lower half of tank */}
        <path
          d="M2.8,10.5 C6.5,10.2 9.5,8.5 13.5,7.8 C16.8,8.8 18.5,10.2 21,11.2 L20.2,18 L9.2,21.8 L3.2,15.5 Z"
          fill={`url(#${uid}-water)`}
          stroke="#3065a0"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        {/* Fluid particles inside water */}
        <circle cx="8.5" cy="14.5" r="0.9" fill="#ffffff" fillOpacity={0.85} />
        <circle cx="12.2" cy="13.2" r="0.85" fill="#ffffff" fillOpacity={0.85} />
        <circle cx="15.8" cy="15.2" r="0.9" fill="#ffffff" fillOpacity={0.85} />
        <circle cx="10.5" cy="17.8" r="0.85" fill="#ffffff" fillOpacity={0.85} />
        {/* Front glass tank edges */}
        <polyline
          points="2.5,5.5 9,10.5 21.5,6.8"
          fill="none"
          stroke="#ffffff"
          strokeWidth={0.75}
          strokeOpacity={0.9}
        />
        <line x1="9" y1="10.5" x2="9.2" y2="21.8" stroke="#ffffff" strokeWidth={0.75} strokeOpacity={0.9} />
      </g>
    ),
  },
  {
    id: 'sop.particletrail',

    label: 'Particle Trail',

    family: 'sop',

    description: 'Streaking golden-orange particle trails.',
    refKey: 'SOP_particletrail',
    types: ['particletrail'],
    icons: ['sop_particletrail'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-trail`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fce94f" />
            <stop offset="55%" stopColor="#fcaf3e" />
            <stop offset="100%" stopColor="#ce5c00" />
          </linearGradient>
        </defs>
        {/* Streaking golden-orange particle trails */}
        <path
          d="M5.5,7.5 C10.5,8.5 15.5,12.5 19.5,18.5"
          fill="none"
          stroke={`url(#${uid}-trail)`}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        <path
          d="M12.5,4.8 C16.2,7.2 19.2,11.2 21,15.5"
          fill="none"
          stroke={`url(#${uid}-trail)`}
          strokeWidth={1.3}
          strokeLinecap="round"
        />
        <path
          d="M3.8,13.5 C8.5,14.5 13.2,17.2 16.8,21"
          fill="none"
          stroke={`url(#${uid}-trail)`}
          strokeWidth={1.4}
          strokeLinecap="round"
        />
        {/* Bright glowing particle heads */}
        <circle cx="5.5" cy="7.5" r="2.2" fill="#fef5ae" stroke="#f57900" strokeWidth={0.8} />
        <circle cx="12.5" cy="4.8" r="1.7" fill="#fef5ae" stroke="#f57900" strokeWidth={0.75} />
        <circle cx="3.8" cy="13.5" r="1.9" fill="#fef5ae" stroke="#f57900" strokeWidth={0.75} />
      </g>
    ),
  },
  {
    id: 'sop.pyrobakevolume',

    label: 'Pyro Bake Volume',

    family: 'sop',

    description: 'Pyro smoke and fire plume at upper-left.',
    refKey: 'SOP_pyrobakevolume',
    types: ['pyrobakevolume'],
    icons: ['sop_pyrobakevolume'],
    render: (uid) => (
      <g>
        <defs>
          <radialGradient id={`${uid}-fire`} cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#fce94f" />
            <stop offset="55%" stopColor="#f57900" />
            <stop offset="100%" stopColor="#555753" />
          </radialGradient>
        </defs>
        {/* Pyro smoke and fire plume at upper-left */}
        <path
          d="M4.5,13.5 C2.8,11.5 3.5,8.2 6,7.5 C7,4.8 10.5,4.2 12.2,6.2 C14.8,5.5 17,7.5 16.5,10 C18,11.5 17.2,14.2 15,15 C12.5,16.2 6.5,15.8 4.5,13.5 Z"
          fill={`url(#${uid}-fire)`}
          stroke="#2e3436"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        {/* Open tan/brown bake box at lower-right */}
        <polygon
          points="9.5,14.8 15.5,12.2 21.5,14.8 15.5,17.5"
          fill="#e9b96e"
          stroke="#8f5902"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
        <polygon
          points="9.5,14.8 15.5,17.5 15.5,21.5 9.5,18.8"
          fill="#c17d11"
          stroke="#8f5902"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <polygon
          points="15.5,17.5 21.5,14.8 21.5,18.8 15.5,21.5"
          fill="#8f5902"
          stroke="#5e3617"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.pyroburstsource',

    label: 'Pyro Burst Source',

    family: 'sop',

    description: 'Star-like burst smoke trails.',
    refKey: 'SOP_pyroburstsource',
    types: ['pyroburstsource'],
    icons: ['sop_pyroburstsource'],
    render: (uid) => (
      <g>
        <defs>
          <radialGradient id={`${uid}-burst`} cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#fdf4a4" />
            <stop offset="45%" stopColor="#fcaf3e" />
            <stop offset="80%" stopColor="#f57900" />
            <stop offset="100%" stopColor="#888a85" />
          </radialGradient>
        </defs>
        {/* Star-like burst smoke trails */}
        <path
          d="M12,18 L4,9.5 M12,18 L12.5,3.5 M12,18 L20,8.5 M12,18 L21.5,14.5 M12,18 L3,15.5"
          stroke="#d3d7cf"
          strokeWidth={2.2}
          strokeLinecap="round"
        />
        <path
          d="M12,18 L4,9.5 M12,18 L12.5,3.5 M12,18 L20,8.5 M12,18 L21.5,14.5 M12,18 L3,15.5"
          stroke="#f57900"
          strokeWidth={1.1}
          strokeLinecap="round"
        />
        {/* Central fiery explosion cloud */}
        <path
          d="M5.5,17.5 C4,15.2 4.8,12 7.2,11.2 C8.2,8.5 11.8,8 13.5,10 C16,9.2 18.5,11.2 18,13.8 C19.8,15.2 19,18 16.8,19 C14.5,20.5 7.8,20.2 5.5,17.5 Z"
          fill={`url(#${uid}-burst)`}
          stroke="#2e3436"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.pyropostprocess',

    label: 'Pyro Post-Process',

    family: 'sop',

    description: 'Burst trails.',
    refKey: 'SOP_pyropostprocess',
    types: ['pyropostprocess'],
    icons: ['sop_pyropostprocess'],
    render: (uid) => (
      <g>
        <defs>
          <radialGradient id={`${uid}-pyro`} cx="45%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#fce94f" />
            <stop offset="50%" stopColor="#f57900" />
            <stop offset="100%" stopColor="#888a85" />
          </radialGradient>
        </defs>
        {/* Burst trails */}
        <path
          d="M10.5,16 L3.5,8.5 M10.5,16 L11,3.5 M10.5,16 L17.5,7.8"
          stroke="#fcaf3e"
          strokeWidth={1.4}
          strokeLinecap="round"
        />
        {/* Pyro cloud body */}
        <path
          d="M4,16.5 C2.5,14.2 3.5,11.2 5.8,10.5 C6.8,8 10,7.5 11.8,9.5 C14.2,8.8 16.5,10.5 16,13 C17.2,14.5 16.2,17.2 14,18 C11.5,19.2 5.8,18.8 4,16.5 Z"
          fill={`url(#${uid}-pyro)`}
          stroke="#2e3436"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        {/* Post-process badge with green checkmark at bottom-right */}
        <circle cx="17.2" cy="17.2" r="4.2" fill="#d5d5d0" stroke="#546063" strokeWidth={0.85} />
        <polyline
          points="15.2,17.2 16.6,18.8 19.5,15.5"
          fill="none"
          stroke="#73d216"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.pyroscatterfromburst',

    label: 'Pyro Scatter from Burst',

    family: 'sop',

    description: 'White trajectory arcs.',
    refKey: 'SOP_pyroscatterfromburst',
    types: ['pyroscatterfromburst'],
    icons: ['sop_pyroscatterfromburst'],
    render: (uid) => (
      <g>
        <defs>
          <radialGradient id={`${uid}-pyro`} cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#fdf4a4" />
            <stop offset="50%" stopColor="#fcaf3e" />
            <stop offset="100%" stopColor="#888a85" />
          </radialGradient>
        </defs>
        {/* White trajectory arcs */}
        <path
          d="M11.5,18.5 C10.2,12.5 7.2,9.5 2.8,8.5 M11.5,18.5 C11.5,11.8 12,7.5 14,2.8 M11.5,18.5 C13.5,12 15.2,9.2 20.2,6.8 M11.5,18.5 C14.2,13.5 18,11.2 20.8,10.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth={1.1}
          strokeLinecap="round"
        />
        {/* Pyro burst cloud */}
        <path
          d="M5.2,18 C3.8,15.8 4.5,12.8 6.8,12 C7.8,9.5 11.2,9 12.8,10.8 C15.2,10.2 17.5,12 17,14.5 C18.5,15.8 17.8,18.5 15.5,19.5 C13.2,20.8 7.2,20.5 5.2,18 Z"
          fill={`url(#${uid}-pyro)`}
          stroke="#2e3436"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        {/* Scattered red points on burst */}
        <circle cx="8.2" cy="13.5" r="0.95" fill="#ef2929" stroke="#a40000" strokeWidth={0.4} />
        <circle cx="12.5" cy="12.8" r="0.95" fill="#ef2929" stroke="#a40000" strokeWidth={0.4} />
        <circle cx="10.2" cy="16.5" r="0.95" fill="#ef2929" stroke="#a40000" strokeWidth={0.4} />
        <circle cx="14.8" cy="16.2" r="0.95" fill="#ef2929" stroke="#a40000" strokeWidth={0.4} />
      </g>
    ),
  },
  {
    id: 'sop.pyrosolver',

    label: 'Pyro Solver',

    family: 'sop',

    description: 'Roaring flame silhouette behind brain.',
    refKey: 'SOP_pyrosolver',
    types: ['pyrosolver'],
    icons: ['sop_pyrosolver'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-flame`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#d52e0c" />
            <stop offset="50%" stopColor="#faaf3e" />
            <stop offset="100%" stopColor="#f6e94f" />
          </linearGradient>
        </defs>
        {/* Roaring flame silhouette behind brain */}
        <path
          d="M12,21.5 C6.5,21.5 3,18.2 3.2,13.5 C3.5,10.5 5.2,8.5 6.8,6.5 C6.2,8.5 7.5,9.8 8.8,8.5 C9.5,6.2 8.2,4.2 9.5,2.2 C11.8,4.8 14.5,6.5 15.5,9.5 C16.2,7.8 15.8,5.8 14.8,4.5 C17.5,5.8 20.5,9.5 20.8,14 C21,18.5 17.2,21.5 12,21.5 Z"
          fill={`url(#${uid}-flame)`}
          stroke="#99140d"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Pink solver brain inside flames */}
        <path
          d="M6.5,15.5 C6.2,13 8,10.8 10.5,10.5 C11.5,9.5 13.8,9.5 14.8,10.8 C16.8,11.2 18,13 17.5,15.2 C18,16.8 16.8,18.2 15,18.5 C13.2,19 10.2,19 8.5,18.2 C7,17.8 6.2,16.8 6.5,15.5 Z"
          fill="#f4b1b3"
          stroke="#8c3b3b"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        <path
          d="M9,13.2 C10.5,12.5 12.5,12.8 13.5,14 M8.8,15.8 C10.5,15.2 13,15.5 14.8,16.5 M12,10.5 C12,13 11.6,15.5 11.6,18"
          fill="none"
          stroke="#a64b4b"
          strokeWidth={0.6}
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.pyrosource',

    label: 'Pyro Source',

    family: 'sop',

    description: 'Outer fireball flame silhouette.',
    refKey: 'SOP_pyrosource',
    types: ['pyrosource'],
    icons: ['sop_pyrosource'],
    render: (uid) => (
      <g>
        <defs>
          <radialGradient id={`${uid}-fireball`} cx="50%" cy="65%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f6e94f" />
            <stop offset="70%" stopColor="#faaf3e" />
            <stop offset="100%" stopColor="#d52e0c" />
          </radialGradient>
        </defs>
        {/* Outer fireball flame silhouette */}
        <path
          d="M12,21.5 C6.8,21.5 2.8,18.2 2.5,12.8 C2.5,9.5 4.5,7.2 6.2,4.8 C5.5,7.2 7.2,8.8 8.5,7.5 C9.2,5.2 10.2,3.2 11.5,2 C10,5.2 14.5,7.5 15.5,10 C16.2,8.2 15.5,5.2 13.5,2.5 C17.2,3.8 20.8,7.8 21.2,12.8 C21.5,18.2 17.2,21.5 12,21.5 Z"
          fill={`url(#${uid}-fireball)`}
          stroke="#99140d"
          strokeWidth={0.95}
          strokeLinejoin="round"
        />
        {/* Inner hot yellow-white core */}
        <path
          d="M12,20 C8.8,20 6.5,17.8 6.8,14.5 C7,12.5 8.5,11 9.5,9.5 C9.2,11.2 10.5,12 11.5,10.8 C12.2,9.2 12.8,8 13.5,7.2 C13,9.8 15.5,11.5 16.5,14 C17,17.5 14.8,20 12,20 Z"
          fill="#fbf6b9"
          fillOpacity={0.85}
        />
      </g>
    ),
  },
  {
    id: 'sop.pyrosourceinstance',

    label: 'Pyro Source Instance',

    family: 'sop',

    description: 'Isometric tan base platform.',
    refKey: 'SOP_pyrosourceinstance',
    types: ['pyrosourceinstance'],
    icons: ['sop_pyrosourceinstance'],
    render: () => (
      <g>
        {/* Isometric tan base platform */}
        <polygon
          points="3,16.5 12,12 21,16.5 12,21"
          fill="#e9b96e"
          stroke="#8f5902"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Tree trunk */}
        <line x1="12" y1="10" x2="12" y2="16.2" stroke="#2e3436" strokeWidth={1.6} strokeLinecap="round" />
        {/* Left half: green pine cone instance */}
        <polygon
          points="12,2.2 6.8,11.2 12,11.2"
          fill="#73d216"
          stroke="#2e3436"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        {/* Right half: burning orange/red pyro instance */}
        <path
          d="M12,2.2 L17.2,11.2 L12,11.2 Z"
          fill="#f57900"
          stroke="#a40000"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        {/* Flame licks on right side */}
        <path
          d="M14.5,6.2 C16.2,5.5 17.5,6.8 16.8,8.5 C18.2,8.5 19,10 17.2,11.2"
          fill="#ef2929"
          stroke="#a40000"
          strokeWidth={0.65}
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.pyrosourcepack',

    label: 'Pyro Source Pack',

    family: 'sop',

    description: 'Bottom packed isometric plate.',
    refKey: 'SOP_pyrosourcepack',
    types: ['pyrosourcepack'],
    icons: ['sop_pyrosourcepack'],
    render: () => (
      <g>
        {/* Bottom packed isometric plate */}
        <polygon
          points="2,14.5 11.5,9.8 18.5,13.2 9,18"
          fill="#dee1db"
          stroke="#555753"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        {/* Middle packed isometric plate */}
        <polygon
          points="2,12.2 11.5,7.5 18.5,11 9,15.8"
          fill="#e8eae6"
          stroke="#555753"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        {/* Top packed isometric plate */}
        <polygon
          points="2,9.8 11.5,5.2 18.5,8.6 9,13.4"
          fill="#f0f1ef"
          stroke="#2e3436"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        {/* Packed flame sources around plates */}
        <path
          d="M18.2,18.5 C16.5,18.5 15.5,16.8 16.2,14.8 C17,13.2 18.2,12 18.8,10.5 C19.8,12.2 21.5,13.8 21.5,15.8 C21.5,17.5 20,18.5 18.2,18.5 Z"
          fill="#f79e30"
          stroke="#c14d00"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <path
          d="M18.4,17.5 C17.5,17.5 17,16.5 17.4,15.5 C17.8,14.5 18.5,13.8 18.8,13 C19.4,14 20.2,14.8 20.2,16 C20.2,17 19.4,17.5 18.4,17.5 Z"
          fill="#f9e53f"
        />
      </g>
    ),
  },
];
