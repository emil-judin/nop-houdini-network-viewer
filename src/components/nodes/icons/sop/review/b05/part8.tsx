import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_05_PART_8: OperatorIconDef[] = [
  {
    id: 'sop.mpmdebrissource',

    label: 'MPM Debris Source',

    family: 'sop',

    description: 'Lumpy snow/debris mass on left.',
    refKey: 'SOP_mpmdebrissource',
    types: ['mpmdebrissource'],
    icons: ['sop_mpmdebrissource'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-snow`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#ceddee" />
            <stop offset="100%" stopColor="#729ece" />
          </linearGradient>
        </defs>
        {/* Lumpy snow/debris mass on left */}
        <path
          d="M3,14.5 C2.5,11 4.2,7.5 7.2,6.2 C9.5,4.2 13,4.8 14.5,7.2 C16,9.2 16.5,12.5 15.2,15.5 C13.8,18.2 10.5,19.8 7.2,19.2 C4.5,18.8 3.2,16.8 3,14.5 Z"
          fill={`url(#${uid}-snow)`}
          stroke="#204a86"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Smaller debris chunks breaking off to the right */}
        <circle cx="18.2" cy="9.5" r="2.1" fill={`url(#${uid}-snow)`} stroke="#204a86" strokeWidth={0.75} />
        <circle cx="20.2" cy="14.5" r="1.6" fill={`url(#${uid}-snow)`} stroke="#204a86" strokeWidth={0.75} />
        <circle cx="16.8" cy="18.2" r="1.4" fill={`url(#${uid}-snow)`} stroke="#204a86" strokeWidth={0.7} />
        {/* Red debris source points */}
        <circle cx="9.5" cy="9.2" r="0.95" fill="#ef2929" stroke="#a40000" strokeWidth={0.4} />
        <circle cx="12.8" cy="12.5" r="0.95" fill="#ef2929" stroke="#a40000" strokeWidth={0.4} />
        <circle cx="8.2" cy="14.8" r="0.95" fill="#ef2929" stroke="#a40000" strokeWidth={0.4} />
        <circle cx="18.2" cy="9.5" r="0.8" fill="#ef2929" stroke="#a40000" strokeWidth={0.35} />
        <circle cx="20.2" cy="14.5" r="0.75" fill="#ef2929" stroke="#a40000" strokeWidth={0.35} />
      </g>
    ),
  },
  {
    id: 'sop.mpmdeformpieces',

    label: 'MPM Deform Pieces',

    family: 'sop',

    description: 'Curved red deformation arrow above.',
    refKey: 'SOP_mpmdeformpieces',
    types: ['mpmdeformpieces'],
    icons: ['sop_mpmdeformpieces'],
    render: () => (
      <g>
        {/* Curved red deformation arrow above */}
        <path
          d="M5.5,9.5 C8.5,4.8 15.5,4.8 18.5,9.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth={1.9}
          strokeLinecap="round"
        />
        <path
          d="M5.5,9.5 C8.5,4.8 15.5,4.8 18.5,9.5"
          fill="none"
          stroke="#ef2929"
          strokeWidth={1.1}
          strokeLinecap="round"
        />
        <polygon points="19.5,10.5 16.2,9.6 18.8,7.2" fill="#ef2929" stroke="#a40000" strokeWidth={0.45} />
        {/* Left deformed cookie piece */}
        <path
          d="M2.2,15.5 C2.5,13 5.5,11.5 9.2,12.2 L10.8,19.5 C6.5,20.2 2.5,18.2 2.2,15.5 Z"
          fill="#e1ab5b"
          stroke="#5e3617"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Right deformed cookie piece */}
        <path
          d="M12.5,12.2 C16.5,11.2 20.8,12.8 21.8,15.5 C21.2,18.5 17.2,20.2 13.2,19.5 Z"
          fill="#e1ab5b"
          stroke="#5e3617"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Chocolate chips */}
        <circle cx="5.8" cy="15.2" r="1" fill="#5e3617" />
        <circle cx="8.2" cy="17.2" r="0.85" fill="#5e3617" />
        <circle cx="15.5" cy="14.8" r="1.05" fill="#5e3617" />
        <circle cx="18.2" cy="16.8" r="0.9" fill="#5e3617" />
      </g>
    ),
  },
  {
    id: 'sop.mpmpostfracture',

    label: 'MPM Post-Fracture',

    family: 'sop',

    description: 'Fractured cookie base.',
    refKey: 'SOP_mpmpostfracture',
    types: ['mpmpostfracture'],
    icons: ['sop_mpmpostfracture'],
    render: () => (
      <g>
        {/* Fractured cookie base */}
        <path
          d="M2.5,16.2 C2.8,13.2 6.8,11.5 11.2,12.2 L10.2,20.2 C5.8,20.2 2.5,18.5 2.5,16.2 Z"
          fill="#e1ab5b"
          stroke="#5e3617"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        <path
          d="M13,12.2 C17.2,11.5 21.2,13.2 21.5,16.2 C21.2,18.8 17.5,20.2 12.8,20.2 Z"
          fill="#e1ab5b"
          stroke="#5e3617"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Chocolate chips */}
        <circle cx="6.2" cy="15.5" r="0.95" fill="#5e3617" />
        <circle cx="8.5" cy="17.8" r="0.8" fill="#5e3617" />
        <circle cx="16.2" cy="15.2" r="1" fill="#5e3617" />
        <circle cx="18.5" cy="17.2" r="0.85" fill="#5e3617" />
        {/* Red jagged fracture lightning line in center */}
        <polyline
          points="12.2,10.5 11,14.5 12.8,16.5 11.2,21.2"
          fill="none"
          stroke="#ef2929"
          strokeWidth={1.15}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Post-process clock badge at top-left */}
        <circle cx="6.5" cy="6.5" r="3.6" fill="#ffffff" stroke="#2e3436" strokeWidth={0.85} />
        <polyline
          points="6.5,4.3 6.5,6.5 8.2,7.4"
          fill="none"
          stroke="#ef2929"
          strokeWidth={0.85}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.mpmsolver',

    label: 'MPM Solver',

    family: 'sop',

    description: 'White/blue granular snow mound at bottom.',
    refKey: 'SOP_mpmsolver',
    types: ['mpmsolver'],
    icons: ['sop_mpmsolver'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-snow`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#ceddee" />
            <stop offset="100%" stopColor="#729ece" />
          </linearGradient>
        </defs>
        {/* White/blue granular snow mound at bottom */}
        <path
          d="M2.2,17.5 C3,14.5 6.5,12.8 12,12.8 C17.5,12.8 21,14.5 21.8,17.5 C20.5,19.8 16.5,21 12,21 C7.5,21 3.5,19.8 2.2,17.5 Z"
          fill={`url(#${uid}-snow)`}
          stroke="#204a86"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Pink MPM solver brain resting on snow */}
        <path
          d="M6.2,12.2 C5.8,9.2 7.8,6.5 10.5,6.2 C11.5,4.8 14,4.8 15.2,6.2 C17.5,6.8 18.8,9 18.2,11.5 C18.8,13.2 17.5,14.8 15.5,15 C13.5,15.5 10.5,15.5 8.5,14.8 C6.8,14.5 6,13.5 6.2,12.2 Z"
          fill="#ef8086"
          stroke="#8c3b3b"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Brain gyri folds */}
        <path
          d="M9,9.2 C10.5,8.2 12.8,8.5 13.8,10 M8.5,12 C10.5,11.2 13.2,11.5 15.2,12.8 M12.2,6 C12.2,8.8 11.8,11.5 11.8,14.5"
          fill="none"
          stroke="#a64b4b"
          strokeWidth={0.65}
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.mpmsource',

    label: 'MPM Source',

    family: 'sop',

    description: 'Red source nozzle/emitter on left.',
    refKey: 'SOP_mpmsource',
    types: ['mpmsource'],
    icons: ['sop_mpmsource'],
    render: () => (
      <g>
        {/* Red source nozzle/emitter on left */}
        <path
          d="M3,14.5 C2.2,10.5 4.8,6.2 9.2,4.8 L12.5,9.5 C10.2,10.5 8.8,12.5 9.5,14.8 L6.2,18.2 C4.2,17.5 3.2,16.2 3,14.5 Z"
          fill="#ee2929"
          stroke="#a40000"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Silver collar */}
        <polygon
          points="9.2,4.8 11.5,4.2 14.2,8.8 12.5,9.5"
          fill="#d3d7cf"
          stroke="#555753"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
        {/* Emitted white/blue snow clumps on right */}
        <path
          d="M13.5,9.8 C13.2,7.8 15,6.2 17.2,6.5 C19.5,6.8 21,8.5 20.5,10.5 C19.8,12.2 15.5,11.8 13.5,9.8 Z"
          fill="#ffffff"
          stroke="#204a86"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <path
          d="M11.5,16.2 C11.8,13.8 14.5,12.8 17.2,13.5 C19.8,14.2 21.5,16.2 20.8,18.2 C19.8,20.2 12.5,19.2 11.5,16.2 Z"
          fill="#ceddee"
          stroke="#204a86"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.mpmsurface',

    label: 'MPM Surface',

    family: 'sop',

    description: 'Left half: faceted blue polygon mesh.',
    refKey: 'SOP_mpmsurface',
    types: ['mpmsurface'],
    icons: ['sop_mpmsurface'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-snow`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#ceddee" />
            <stop offset="100%" stopColor="#729ece" />
          </linearGradient>
        </defs>
        {/* Left half: faceted blue polygon mesh */}
        <polygon
          points="2.5,13.5 6.8,5.5 12,4.5 10.5,12.8 12,20.5 5.2,19.2"
          fill="#729fcf"
          stroke="#12335b"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        <polyline points="6.8,5.5 10.5,12.8 5.2,19.2" fill="none" stroke="#12335b" strokeWidth={0.6} />
        <line x1="2.5" y1="13.5" x2="10.5" y2="12.8" stroke="#12335b" strokeWidth={0.6} />
        {/* Right half: organic MPM snow/granular surface */}
        <path
          d="M12,4.5 C15.2,4.5 17.8,6.2 19.2,8.8 C21,10.5 21.8,13.2 21,15.8 C20.2,18.5 16.8,20.5 12,20.5 L10.5,12.8 Z"
          fill={`url(#${uid}-snow)`}
          stroke="#204a87"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Transition seam */}
        <polyline points="12,4.5 10.5,12.8 12,20.5" fill="none" stroke="#12335b" strokeWidth={0.85} />
      </g>
    ),
  },
  {
    id: 'sop.oceanevaluate',

    label: 'Ocean Evaluate',

    family: 'sop',

    description: 'Curling ocean wave block cross-section.',
    refKey: 'SOP_oceanevaluate',
    types: ['oceanevaluate', 'oceanspectrum'],
    icons: ['sop_oceanevaluate', 'sop_oceanspectrum'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-ocean`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9ddcf9" />
            <stop offset="45%" stopColor="#0091b7" />
            <stop offset="100%" stopColor="#005b6e" />
          </linearGradient>
        </defs>
        {/* Curling ocean wave block cross-section */}
        <path
          d="M2.5,20.5 L2.5,13.5 C4.5,8.2 8.8,4.2 14,4.2 C17.5,4.2 19.8,6.2 18.8,8.5 C17.5,7.2 14.8,7.8 13.8,10.2 C12.8,12.8 15.8,14.8 21.5,14.8 L21.5,18.2 L18.5,20.5 Z"
          fill={`url(#${uid}-ocean)`}
          stroke="#004a59"
          strokeWidth={0.95}
          strokeLinejoin="round"
        />
        {/* White frothy wave crest highlight */}
        <path
          d="M8.5,5.8 C11.5,4 15.5,4 18.5,6.5 C19.2,7.2 19,8.5 17.8,8.2 C15.8,7.2 13.5,8.2 12.8,10.2"
          fill="none"
          stroke="#ffffff"
          strokeWidth={1.1}
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.oceanfoam',

    label: 'Ocean Foam',

    family: 'sop',

    description: 'Square deep ocean tile.',
    refKey: 'SOP_oceanfoam',
    types: ['oceanfoam'],
    icons: ['sop_oceanfoam'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-sea`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2e8baf" />
            <stop offset="55%" stopColor="#1273a4" />
            <stop offset="100%" stopColor="#004a7c" />
          </linearGradient>
        </defs>
        {/* Square deep ocean tile */}
        <rect
          x="2.5"
          y="2.5"
          width="19"
          height="19"
          rx="1.5"
          fill={`url(#${uid}-sea)`}
          stroke="#00365c"
          strokeWidth={0.95}
        />
        {/* Lacy white/light-blue foam streaks */}
        <path
          d="M3,8.5 C6.5,7.2 9.2,9.8 12.5,11.5 C15.8,13.2 18.5,12.5 21,14.2"
          fill="none"
          stroke="#aac9de"
          strokeWidth={2.2}
          strokeLinecap="round"
        />
        <path
          d="M3,8.5 C6.5,7.2 9.2,9.8 12.5,11.5 C15.8,13.2 18.5,12.5 21,14.2"
          fill="none"
          stroke="#ffffff"
          strokeWidth={1.1}
          strokeLinecap="round"
        />
        <path
          d="M5.5,17.5 C8.5,15.5 11.5,14.8 14.2,11.5 C16.2,9 18.2,6.5 20.5,5.5"
          fill="none"
          stroke="#e1e9f3"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeDasharray="2.2 1.4"
        />
        <circle cx="7.5" cy="13.2" r="0.9" fill="#ffffff" fillOpacity={0.85} />
        <circle cx="15.8" cy="16.8" r="1.1" fill="#ffffff" fillOpacity={0.85} />
        <circle cx="11.5" cy="6.2" r="0.8" fill="#ffffff" fillOpacity={0.85} />
      </g>
    ),
  },
  {
    id: 'sop.oceansource',

    label: 'Ocean Source',

    family: 'sop',

    description: 'Isometric multi-peaked ocean wave patch.',
    refKey: 'SOP_oceansource',
    types: ['oceansource', 'oceanwaves'],
    icons: ['sop_oceansource', 'sop_oceanwaves'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-wave`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c2deea" />
            <stop offset="50%" stopColor="#729fcf" />
            <stop offset="100%" stopColor="#204a87" />
          </linearGradient>
        </defs>
        {/* Isometric multi-peaked ocean wave patch */}
        <path
          d="M2,12.5 C4.2,11.2 5.5,9.5 6.2,7.5 C8,9.2 10.2,8.5 11.5,6 C13,7.2 15.2,6.5 16.5,5 C17.8,7.5 19.5,8.2 22,7.5 C21.2,10.5 20.2,12.8 22,14.2 C19.5,15.8 17.5,15.2 15.8,17.5 C13.5,17 12.2,18.5 11,20.5 C9.2,19.2 7.5,17.5 6.2,15.5 C4.2,15.2 2.8,14 2,12.5 Z"
          fill={`url(#${uid}-wave)`}
          stroke="#204a87"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Internal wave troughs and crests */}
        <path
          d="M5.5,12.2 C7.8,13.5 9.8,12.2 10.8,9.8 C12.2,12 14.8,11.8 16.5,10.2"
          fill="none"
          stroke="#ffffff"
          strokeWidth={0.85}
          strokeLinecap="round"
        />
        <path
          d="M7.5,15.8 C10,16.8 12,15.5 13.2,13.5 C14.5,15.2 16.8,15.2 18.5,14"
          fill="none"
          stroke="#eef8fc"
          strokeWidth={0.75}
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.particlefluidsurface',

    label: 'Particle Fluid Surface',

    family: 'sop',

    description: 'Left side: cluster of grey-blue fluid particles.',
    refKey: 'SOP_particlefluidsurface',
    types: ['particlefluidsurface'],
    icons: ['sop_particlefluidsurface'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-surf`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d0f1ff" />
            <stop offset="45%" stopColor="#4781d4" />
            <stop offset="100%" stopColor="#204a87" />
          </linearGradient>
        </defs>
        {/* Left side: cluster of grey-blue fluid particles */}
        <circle cx="8.5" cy="6.8" r="2.1" fill="#c7cbdf" stroke="#2e3436" strokeWidth={0.75} />
        <circle cx="6.2" cy="10.2" r="2.2" fill="#e2ebf5" stroke="#2e3436" strokeWidth={0.75} />
        <circle cx="4.8" cy="14.2" r="2.1" fill="#c7cbdf" stroke="#2e3436" strokeWidth={0.75} />
        <circle cx="7.2" cy="17.5" r="2.2" fill="#9fb0c7" stroke="#2e3436" strokeWidth={0.75} />
        <circle cx="9.8" cy="12.5" r="2.4" fill="#d5dfed" stroke="#2e3436" strokeWidth={0.75} />
        {/* Right side: smooth glossy surfaced fluid ellipsoid */}
        <ellipse
          cx="15"
          cy="12"
          rx="5.2"
          ry="9.2"
          fill={`url(#${uid}-surf)`}
          stroke="#122b52"
          strokeWidth={0.95}
        />
        {/* Specular highlight arc */}
        <path
          d="M15.5,4.5 C17.8,5.8 18.8,8.8 18.5,12.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth={1}
          strokeLinecap="round"
          strokeOpacity={0.8}
        />
      </g>
    ),
  },
];
