import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_07_PART_2: OperatorIconDef[] = [
  {
    id: 'sop.muscletransfer',
    label: 'Muscle Transfer',
    family: 'sop',
    description:
      'Symmetrical double-bicep torso transferring purple muscle groups from left to right.',
    types: ['muscletransfer'],
    icons: ['sop_muscletransfer'],
    refKey: 'SOP_muscletransfer',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mt`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#bcd1e8" />
            <stop offset="48%" stopColor="#d39bd0" />
            <stop offset="52%" stopColor="#f2a5fa" />
            <stop offset="100%" stopColor="#5c3566" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Symmetrical flexing torso and arms */}
          <path
            d="M3,4.5 L5.2,4.5 L4.8,8.5 C6.2,7.5 8,7.8 9.2,9 C10.2,8.5 11,8 12,8 C13,8 13.8,8.5 14.8,9 C16,7.8 17.8,7.5 19.2,8.5 L18.8,4.5 L21,4.5 C21.8,7.5 21.8,10.5 20.5,12.2 C18.8,13.5 17,13.2 15.8,12.8 L14.5,19.5 H9.5 L8.2,12.8 C7,13.2 5.2,13.5 3.5,12.2 C2.2,10.5 2.2,7.5 3,4.5 Z"
            fill={`url(#${uid}-mt)`}
            strokeWidth="1.0"
          />
          {/* Center transfer divider and arrow */}
          <line x1="12" y1="3" x2="12" y2="20.8" stroke="#262626" strokeWidth="0.75" strokeDasharray="1.5 1.2" />
          <polygon points="9.5,14 13,14 13,12.5 15.5,15 13,17.5 13,16 9.5,16" fill="#fbeefd" strokeWidth="0.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.skin',
    label: 'Skin',
    family: 'sop',
    description:
      'Light grey-blue curved quad surface skinned across red profile curves with white isoparms.',
    types: ['skin'],
    icons: ['sop_skin'],
    refKey: 'SOP_skin',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-skin`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#b7c1ca" />
            <stop offset="100%" stopColor="#899099" />
          </linearGradient>
        </defs>
        <g strokeLinejoin="round" strokeLinecap="round">
          {/* Extending white construction grid lines (cased) */}
          <path
            d="M2.5,10.5 C7.5,8 11,8.5 15,6 M8.5,19.5 C13.5,17 17,17.5 21.5,15 M5.5,6.5 C10,11 13,16.5 18.5,20"
            fill="none"
            stroke="#262626"
            strokeWidth="1.7"
          />
          <path
            d="M2.5,10.5 C7.5,8 11,8.5 15,6 M8.5,19.5 C13.5,17 17,17.5 21.5,15 M5.5,6.5 C10,11 13,16.5 18.5,20"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.9"
          />
          {/* Skinned surface patch */}
          <path
            d="M3,11 C6.8,8.2 10.5,8.5 13.8,6.2 C16,8.2 18.8,11.5 21,13.5 C17.2,16.2 13.5,15.8 10.2,18.5 C7.8,16.2 5.2,13 3,11 Z"
            fill={`url(#${uid}-skin)`}
            stroke="#262626"
            strokeWidth="1.05"
          />
          {/* Red profile ribs */}
          <path
            d="M3,11 C5.2,13 7.8,16.2 10.2,18.5 M8.4,8.6 C10.6,10.8 13.2,13.8 15.6,16 M13.8,6.2 C16,8.2 18.8,11.5 21,13.5"
            fill="none"
            stroke="#e03228"
            strokeWidth="1.15"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.skindeform',
    label: 'Skin Deform',
    family: 'sop',
    description:
      'Dark blue flexed arm silhouette with striated pink-and-crimson muscle fibers deforming the skin.',
    types: ['skindeform'],
    icons: ['sop_skindeform'],
    refKey: 'SOP_skindeform',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-sd`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f9b2c5" />
            <stop offset="55%" stopColor="#e85f82" />
            <stop offset="100%" stopColor="#900004" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Blue flexed arm outer skin */}
          <path
            d="M2.8,8.5 C1.8,10.8 2.5,13.5 4.8,15.5 C6.8,18.8 10.8,20.5 15,20.8 C18,20.2 19.8,17.2 21,13.2 C21.8,10 21.5,6.2 19.8,4 L17.5,4.5 L17,7.8 L18.8,9.8 C17.8,12.5 15.8,14.5 13.5,15.5 C12.5,12.2 10.2,10.5 7.5,9.5 C6,7.2 4,6.8 2.8,8.5 Z"
            fill="#285092"
            strokeWidth="1.05"
          />
          {/* Pink/crimson muscle layer deforming lower contour */}
          <path
            d="M4.2,10.5 C6.8,12.5 9.8,15.8 14.2,18.8 C11,18.5 7.5,16.5 5.2,13.5 C4.5,12.5 4.2,11.5 4.2,10.5 Z"
            fill={`url(#${uid}-sd)`}
            strokeWidth="0.9"
          />
          <path d="M5.5,12.2 C8,14.8 10.8,16.8 13.5,18" fill="none" stroke="#f9b2c5" strokeWidth="0.65" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.skinproperties',
    label: 'Skin Properties',
    family: 'sop',
    description:
      'Warm brown-and-amber bent arm with a plum purple cross-section cuff showing skin layer thickness.',
    types: ['skinproperties'],
    icons: ['sop_skinproperties'],
    refKey: 'SOP_skinproperties',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-sp`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c17d11" />
            <stop offset="60%" stopColor="#ab5c00" />
            <stop offset="100%" stopColor="#663e04" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Bent skin arm */}
          <path
            d="M3.5,10.5 L6.8,8.8 C8.5,11.2 10.2,13.5 11.2,14.5 C13.5,12.2 16.5,9.2 18.8,6.5 C19.8,5.8 21,6.5 21.2,8.2 C21.5,10.2 20.8,12.5 19.5,13.8 C16.5,16.8 13.2,19.5 11.2,20.8 C9.2,21.2 7.2,18.5 5.8,15.5 Z"
            fill={`url(#${uid}-sp)`}
            strokeWidth="1.05"
          />
          {/* Cross-section skin cuff showing plum inner tissue */}
          <ellipse
            cx="6"
            cy="11.5"
            rx="2.6"
            ry="1.5"
            transform="rotate(-30 6 11.5)"
            fill="#ad7fa8"
            strokeWidth="0.9"
          />
          <ellipse
            cx="6"
            cy="11.5"
            rx="1.2"
            ry="0.7"
            transform="rotate(-30 6 11.5)"
            fill="#ef2929"
            strokeWidth="0.65"
          />
          {/* Highlight curve along forearm */}
          <path d="M12.2,16.5 C15,14.5 17.5,12 19.5,9.5" fill="none" stroke="#f4deba" strokeWidth="0.75" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.skinsolidify',
    label: 'Skin Solidify',
    family: 'sop',
    description:
      'Blue flexed arm silhouette overlaid with a light blue tetrahedral solidified wireframe mesh.',
    types: ['skinsolidify'],
    icons: ['sop_skinsolidify'],
    refKey: 'SOP_skinsolidify',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ss`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#608bc3" />
            <stop offset="55%" stopColor="#285092" />
            <stop offset="100%" stopColor="#031a41" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Blue flexed arm silhouette */}
          <path
            d="M2.8,8.5 C1.8,10.8 2.5,13.5 4.8,15.5 C6.8,18.8 10.8,20.5 15,20.8 C18,20.2 19.8,17.2 21,13.2 C21.8,10 21.5,6.2 19.8,4 L17.5,4.5 L17,7.8 L18.8,9.8 C17.8,12.5 15.8,14.5 13.5,15.5 C12.5,12.2 10.2,10.5 7.5,9.5 C6,7.2 4,6.8 2.8,8.5 Z"
            fill={`url(#${uid}-ss)`}
            strokeWidth="1.05"
          />
          {/* Solidified triangular mesh lines */}
          <path
            d="M4.2,9.5 L7.5,11.5 L5.2,14.2 Z M7.5,11.5 L11.5,13.2 L8.8,16.8 L5.2,14.2 Z M11.5,13.2 L14.5,15.8 L13.2,19.2 L8.8,16.8 Z M14.5,15.8 L18.5,13.2 L17.5,17.8 L13.2,19.2 Z"
            fill="none"
            stroke="#9ebddd"
            strokeWidth="0.65"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.skinsolvervellum',
    label: 'Skin Solver Vellum',
    family: 'sop',
    description:
      'Dynamic running figure in smooth coral-pink skin with a green-and-blue Vellum solver badge.',
    types: ['skinsolvervellum'],
    icons: ['sop_skinsolvervellum'],
    refKey: 'SOP_skinsolvervellum',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ssv`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f79899" />
            <stop offset="60%" stopColor="#e28c8c" />
            <stop offset="100%" stopColor="#b86262" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Running skin figure */}
          <circle cx="13.5" cy="4.2" r="2" fill="#f79899" strokeWidth="0.9" />
          <path
            d="M8.5,8.2 L11.5,6.8 L16.2,9.2 L18.5,12.2 L16.8,13.2 L14.5,10.8 L12.8,13.8 L15.8,19.5 L13.8,20.5 L10.8,15.2 L7.5,19.8 L5.5,18.8 L9.2,13.2 L10.5,9.5 L7.5,10.5 Z"
            fill={`url(#${uid}-ssv)`}
            strokeWidth="0.95"
          />
          {/* Vellum solver badge on right */}
          <circle cx="19" cy="6" r="2.2" fill="#729fcf" strokeWidth="0.85" />
          <circle cx="19" cy="6" r="0.9" fill="#8ae234" stroke="none" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.tetconform',
    label: 'Tet Conform',
    family: 'sop',
    description:
      'Lavender-and-magenta tetrahedral mesh octagon conforming around an inner red boundary curve.',
    types: ['tetconform'],
    icons: ['sop_tetconform'],
    refKey: 'SOP_tetconform',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-tc`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eabce5" />
            <stop offset="55%" stopColor="#d271c9" />
            <stop offset="100%" stopColor="#755076" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Outer tetrahedralized polygon */}
          <polygon
            points="12,2.5 18.8,5.2 21.5,12 18.8,18.8 12,21.5 5.2,18.8 2.5,12 5.2,5.2"
            fill={`url(#${uid}-tc)`}
            strokeWidth="1.05"
          />
          {/* Internal tetrahedral mesh edges */}
          <path
            d="M12,2.5 L12,12 L21.5,12 M5.2,5.2 L12,12 L18.8,18.8 M18.8,5.2 L12,12 L5.2,18.8 M2.5,12 L12,12 L12,21.5"
            fill="none"
            stroke="#5c3566"
            strokeWidth="0.65"
          />
          {/* Red conforming target wave */}
          <path
            d="M4.2,14.5 C8,11.5 12,15.5 15.8,12.5 C17.8,11 19.2,11.5 20.5,12.5"
            fill="none"
            stroke="#262626"
            strokeWidth="2.2"
          />
          <path
            d="M4.2,14.5 C8,11.5 12,15.5 15.8,12.5 C17.8,11 19.2,11.5 20.5,12.5"
            fill="none"
            stroke="#ef2929"
            strokeWidth="1.2"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.tetembed',
    label: 'Tet Embed',
    family: 'sop',
    description:
      'Gold-and-amber tetrahedral cage enclosing an embedded red core solid.',
    types: ['tetembed'],
    icons: ['sop_tetembed'],
    refKey: 'SOP_tetembed',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Amber/gold outer tetrahedral prism */}
          <polygon points="12,3 21,7.5 12,12 3,7.5" fill="#ffd4a1" strokeWidth="1.0" />
          <polygon points="3,7.5 12,12 12,20.5 3,16" fill="#e9b96e" strokeWidth="1.0" />
          <polygon points="12,12 21,7.5 21,16 12,20.5" fill="#c17d11" strokeWidth="1.0" />
          {/* Embedded red inner core */}
          <polygon points="12,6.2 16.8,8.8 12,11.5 7.2,8.8" fill="#ff4545" strokeWidth="0.85" />
          <polygon points="7.2,8.8 12,11.5 12,16.5 7.2,13.8" fill="#f03030" strokeWidth="0.85" />
          <polygon points="12,11.5 16.8,8.8 16.8,13.8 12,16.5" fill="#a40000" strokeWidth="0.85" />
          {/* Tetrahedral diagonal struts */}
          <path
            d="M3,7.5 L12,20.5 L21,7.5 M3,7.5 L21,7.5"
            fill="none"
            stroke="#5e3b08"
            strokeWidth="0.65"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.tetfracture',
    label: 'Tet Fracture',
    family: 'sop',
    description:
      'Light grey 3D rock shattered into separated tetrahedral shards with dark fracture gaps.',
    types: ['tetfracture'],
    icons: ['sop_tetfracture'],
    refKey: 'SOP_tetfracture',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round" strokeWidth="0.95">
          {/* Upper-left shard */}
          <polygon points="9.5,2.8 14,5.5 9.8,10.2 4.2,7.5" fill="#eeeeec" />
          <polygon points="4.2,7.5 9.8,10.2 7.5,14.2 2.8,11.5" fill="#babdb6" />
          {/* Upper-right shard */}
          <polygon points="15.8,4.2 20.8,8.5 15.2,11.2 12.2,7.8" fill="#d3d7cf" />
          <polygon points="15.2,11.2 20.8,8.5 19.8,14.2 14.5,14.8" fill="#888a85" />
          {/* Lower-left shard */}
          <polygon points="8.5,12.5 12.5,15.2 9.2,20.5 4.2,17.2" fill="#d3d7cf" />
          {/* Lower-right shard */}
          <polygon points="14.2,15.8 19.5,15.5 17.2,20.8 11.8,19.8" fill="#888a85" />
          {/* Dark internal fracture facets */}
          <polygon points="9.8,10.2 12.2,7.8 12.8,12.5" fill="#555753" strokeWidth="0.75" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.tetrahedralize',
    label: 'Tetrahedralize',
    family: 'sop',
    description:
      'Cluster of interlocking yellow-gold and slate-blue 3D tetrahedra.',
    types: ['tetrahedralize'],
    icons: ['sop_tetrahedralize'],
    refKey: 'SOP_tetrahedralize',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round" strokeWidth="0.95">
          {/* Gold top-left tetrahedron */}
          <polygon points="11.5,2.2 8.2,10.5 3.2,7.8" fill="#c4a000" />
          <polygon points="11.5,2.2 16.5,8.5 8.2,10.5" fill="#e8da63" />
          {/* Slate-blue center-right tetrahedron */}
          <polygon points="16.5,8.5 21.2,6.5 18.8,14.2" fill="#adbdc6" />
          <polygon points="8.2,10.5 16.5,8.5 14.2,15.8" fill="#5c7281" />
          <polygon points="16.5,8.5 18.8,14.2 14.2,15.8" fill="#475563" />
          {/* Gold bottom-left tetrahedron */}
          <polygon points="3.2,7.8 8.2,10.5 6.2,18.2" fill="#c4a000" />
          <polygon points="8.2,10.5 14.2,15.8 6.2,18.2" fill="#e8da63" />
          {/* Gold bottom-right tetrahedron */}
          <polygon points="14.2,15.8 18.8,14.2 15.2,21.2" fill="#c4a000" />
          <polygon points="6.2,18.2 14.2,15.8 15.2,21.2" fill="#7c6500" />
        </g>
      </>
    ),
  },
];
