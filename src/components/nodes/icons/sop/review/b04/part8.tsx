import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 4, Part 8 (icons 80 to 89): built-in Houdini SOP icons under review.
 */
export const BATCH_04_PART_8: OperatorIconDef[] = [
  {
    id: 'sop.cloudclip',
    label: 'Cloud Clip',
    family: 'sop',
    description: 'Fluffy blue cloud volume sliced horizontally by a red clipping plane.',
    types: ['cloudclip'],
    icons: ['sop_cloudclip'],
    refKey: 'SOP_cloudclip',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-cc-cld`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#b2cbe5" />
            <stop offset="100%" stopColor="#3465a4" />
          </linearGradient>
        </defs>
        <ellipse cx="12" cy="19.5" rx="9" ry="3.2" fill="#262626" fillOpacity="0.22" />
        {/* Cloud dome */}
        <path
          d="M4.5,14.5 C3,14.5 2,13 2.5,11.5 C2.5,9.5 4.5,8.5 6,9 C6.5,7 8.5,5.5 11,5.5 C13.5,5.5 15.5,7 16,9 C17.5,8.5 19.5,9.5 19.5,11.5 C20.5,12.5 20.5,14.5 19,14.5 Z"
          fill={`url(#${uid}-cc-cld)`}
          stroke="#285092"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Red clipping plane */}
        <polygon points="1,14.5 19,11.5 23,15 5,18" fill="#e72929" fillOpacity="0.75" stroke="#a40e0a" strokeWidth="0.85" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.cloudlight',
    label: 'Cloud Light',
    family: 'sop',
    description: 'Soft white-and-grey cloud volume illuminated by golden sunlight rays radiating from behind.',
    types: ['cloudlight'],
    icons: ['sop_cloudlight'],
    refKey: 'SOP_cloudlight',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-cl-sun`} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fce94f" />
            <stop offset="60%" stopColor="#e2bd00" />
            <stop offset="100%" stopColor="#c4a000" />
          </radialGradient>
        </defs>
        {/* Golden sunburst rays */}
        <g stroke="#fce94f" strokeWidth="1.2" strokeLinecap="round">
          <line x1="6" y1="6" x2="2.5" y2="2.5" />
          <line x1="8" y1="4.5" x2="8" y2="1.5" />
          <line x1="10.5" y1="5.5" x2="13.5" y2="2" />
          <line x1="4.5" y1="8" x2="1.5" y2="8" />
        </g>
        {/* Glowing sun disc */}
        <circle cx="8" cy="8" r="5" fill={`url(#${uid}-cl-sun)`} stroke="#c4a000" strokeWidth="0.75" />
        {/* Foreground cloud */}
        <path
          d="M6.5,18.5 C4.5,18.5 3.5,16.5 4.5,14.5 C4.2,12.8 5.8,11.2 7.5,11.5 C8.5,9.5 11,8.5 13.5,9 C15.8,9.5 17.5,11.2 17.8,13.2 C19.5,13.2 21,14.5 21,16.2 C21,18 19.5,18.5 18,18.5 Z"
          fill="#eeeeec"
          stroke="#7c81a7"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M8,18.2 C10,16.5 14,16.5 17,18.2"
          fill="none"
          stroke="#dad9e3"
          strokeWidth="0.75"
        />
      </>
    ),
  },
  {
    id: 'sop.cloudshapefromline',
    label: 'Cloud Shape from Line',
    family: 'sop',
    description: 'Horizontal line spine generating overlapping soft blue cloud volume spheres along its path.',
    types: ['cloudshapefromline'],
    icons: ['sop_cloudshapefromline'],
    refKey: 'SOP_cloudshapefromline',
    render: () => (
      <>
        {/* Horizontal line spine */}
        <line x1="2" y1="12" x2="22" y2="12" stroke="#262626" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="2" y1="12" x2="22" y2="12" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
        {/* Cloud puffs along line */}
        <g fill="#d4e2f0" stroke="#3465a4" strokeWidth="0.85" strokeLinejoin="round">
          <circle cx="6" cy="12" r="3.8" />
          <circle cx="11.5" cy="10" r="4.8" fill="#ffffff" />
          <circle cx="17.5" cy="12" r="4" fill="#b2cbe5" />
          <circle cx="14" cy="14" r="3.5" />
          <circle cx="9" cy="14" r="3.2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.cloudshapefrompolygon',
    label: 'Cloud Shape from Polygon',
    family: 'sop',
    description: 'Triangulated wireframe polygon cage generating puffy white-and-cyan cloud volumes around its vertices.',
    types: ['cloudshapefrompolygon'],
    icons: ['sop_cloudshapefrompolygon'],
    refKey: 'SOP_cloudshapefrompolygon',
    render: () => (
      <g strokeLinejoin="round">
        {/* Base polygon wireframe */}
        <polygon points="5,18 12,4 19,18" fill="none" stroke="#729fcf" strokeWidth="1.2" strokeDasharray="1.5 1.2" />
        {/* Cloud lobes around corners */}
        <g fill="#ffffff" stroke="#707b8a" strokeWidth="0.8">
          <circle cx="12" cy="5" r="3.8" fill="#d1ebee" />
          <circle cx="5" cy="17" r="4.2" fill="#bed7e4" />
          <circle cx="19" cy="17" r="4.2" fill="#bed7e4" />
          <circle cx="12" cy="15" r="4.8" fill="#ffffff" />
        </g>
        <path d="M7,16 C10,13 14,13 17,16" fill="none" stroke="#afc6d2" strokeWidth="0.65" />
      </g>
    ),
  },
  {
    id: 'sop.cloudshapereplicate',
    label: 'Cloud Shape Replicate',
    family: 'sop',
    description: 'Multiple puffy blue cumulus cloud volumes clustering and replicating together.',
    types: ['cloudshapereplicate'],
    icons: ['sop_cloudshapereplicate'],
    refKey: 'SOP_cloudshapereplicate',
    render: () => (
      <g strokeLinejoin="round">
        {/* Replicated smaller cloud in background */}
        <path
          d="M13,10 C12,8 14,6.5 16,6.5 C17.5,6.5 18.5,7.5 19,8.5 C20.5,8.5 21.5,9.5 21.5,11 C21.5,12.5 20,13 19,13 H14 C12.5,13 12,11.5 13,10 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.75"
        />
        {/* Main foreground cloud */}
        <path
          d="M4.5,18.5 C2.5,18.5 1.5,16.5 2.5,14.5 C2.5,12.8 4.5,11.5 6.5,12 C7.5,9.5 10.5,8.5 13,9.5 C15.5,10 17,12 17.5,14 C19.5,14 21,15.5 21,17.2 C21,19 19,19.5 17.5,19.5 Z"
          fill="#b2cbe5"
          stroke="#204a87"
          strokeWidth="0.85"
        />
        <circle cx="10" cy="13.5" r="3.2" fill="#ffffff" stroke="none" />
      </g>
    ),
  },
  {
    id: 'sop.isooffset',
    label: 'IsoOffset',
    family: 'sop',
    description: 'Faceted grey 3D surface with a smooth blue offset isosurface boundary envelope surrounding it.',
    types: ['isooffset'],
    icons: ['sop_isooffset'],
    refKey: 'SOP_isooffset',
    render: () => (
      <g strokeLinejoin="round">
        {/* Smooth outer blue isosurface offset outline */}
        <path
          d="M3,12 C3,6 7,2.5 13,3 C19,3.5 21.5,7 21,13 C20.5,19 17,21.5 11,21 C5,20.5 3,18 3,12 Z"
          fill="none"
          stroke="#3065a0"
          strokeWidth="1.6"
        />
        {/* Inner solid faceted grey core */}
        <polygon points="7,8 14,6 18,10 16,17 9,16" fill="#8794a0" stroke="#41474c" strokeWidth="0.85" />
        <polygon points="7,8 14,6 12,12 9,16" fill="#c2c8cc" stroke="#41474c" strokeWidth="0.65" />
        <polygon points="14,6 18,10 16,17 12,12" fill="#626873" stroke="#41474c" strokeWidth="0.65" />
      </g>
    ),
  },
  {
    id: 'sop.skybox',
    label: 'Sky Box',
    family: 'sop',
    description: 'Isometric blue cube skybox displaying sky and clouds across its top and side faces.',
    types: ['skybox'],
    icons: ['sop_skybox'],
    refKey: 'SOP_skybox',
    render: () => (
      <g strokeLinejoin="round">
        <polygon points="12,2.5 21.5,7.5 12,12.5 2.5,7.5" fill="#abddf4" stroke="#2f78b1" strokeWidth="0.85" />
        <polygon points="2.5,7.5 12,12.5 12,21.5 2.5,16.5" fill="#39b4ea" stroke="#2f78b1" strokeWidth="0.85" />
        <polygon points="12,12.5 21.5,7.5 21.5,16.5 12,21.5" fill="#2f78b1" stroke="#1d4d73" strokeWidth="0.85" />
        {/* White clouds on top face */}
        <ellipse cx="12" cy="7.5" rx="3.5" ry="1.8" fill="#ffffff" fillOpacity="0.85" stroke="none" />
        {/* Cloud wisps on front faces */}
        <path d="M5,13 Q8,12 10,14" fill="none" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M14,14 Q17,12 19,13.5" fill="none" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" />
        {/* Outer cube silhouette */}
        <polygon points="12,2.5 21.5,7.5 21.5,16.5 12,21.5 2.5,16.5 2.5,7.5" fill="none" stroke="#262626" strokeWidth="0.95" />
      </g>
    ),
  },
  {
    id: 'sop.skyfield',
    label: 'Sky Field',
    family: 'sop',
    description: 'Perspective blue skyfield plane with stylized white clouds drifting under a warm sun.',
    types: ['skyfield', 'skyfieldfrommap'],
    icons: ['sop_skyfield', 'sop_skyfieldfrommap'],
    refKey: 'SOP_skyfield',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-sf-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2f78b1" />
            <stop offset="60%" stopColor="#39b4ea" />
            <stop offset="100%" stopColor="#e9b96e" />
          </linearGradient>
        </defs>
        <rect x="2.5" y="4" width="19" height="16" rx="1.5" fill={`url(#${uid}-sf-sky)`} stroke="#262626" strokeWidth="0.95" />
        {/* Sun in upper right */}
        <circle cx="17.5" cy="8" r="2.2" fill="#ffffff" />
        {/* Fluffy clouds */}
        <ellipse cx="8" cy="11" rx="3.5" ry="1.6" fill="#ffffff" fillOpacity="0.9" />
        <ellipse cx="10" cy="9.8" rx="2.5" ry="1.8" fill="#ffffff" />
        <ellipse cx="13" cy="14" rx="4.5" ry="1.8" fill="#ffffff" fillOpacity="0.85" />
      </>
    ),
  },
  {
    id: 'sop.skyfieldpattern',
    label: 'Sky Field Pattern',
    family: 'sop',
    description: 'Cyan sky canvas repeating a pattern of procedural cumulus cloud lobes.',
    types: ['skyfieldpattern'],
    icons: ['sop_skyfieldpattern'],
    refKey: 'SOP_skyfieldpattern',
    render: () => (
      <g strokeLinejoin="round">
        <rect x="2.5" y="2.5" width="19" height="19" rx="1.5" fill="#39b4ea" stroke="#262626" strokeWidth="1" />
        {/* Upper cloud pattern band */}
        <path
          d="M4,4 H20 C20,6 18.5,7 17.5,7 C16.5,8 15,8 14,7 C13,8 11.5,8 10.5,7 C9.5,8 8,8 7,7 C6,7 4,6 4,4 Z"
          fill="#ffffff"
          stroke="#b2cbe5"
          strokeWidth="0.65"
        />
        {/* Middle cloud puff pattern */}
        <g fill="#ffffff" stroke="#b2cbe5" strokeWidth="0.65">
          <circle cx="7" cy="13" r="2.5" />
          <circle cx="10" cy="11.5" r="3.2" />
          <circle cx="13.5" cy="12" r="2.8" />
          <circle cx="16.5" cy="13.5" r="2.2" />
          <rect x="6" y="13.5" width="11" height="2" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.volume',
    label: 'Volume',
    family: 'sop',
    description: 'Translucent 3D volume voxel bounding box with smoke density concentrated inside.',
    types: ['volume'],
    icons: ['sop_volume'],
    refKey: 'SOP_volume',
    render: () => (
      <g strokeLinejoin="round">
        {/* Base shadow */}
        <ellipse cx="12" cy="19.5" rx="8.5" ry="3.2" fill="#262626" fillOpacity="0.25" />
        {/* Bounding box wireframe back lines */}
        <path d="M4,9 L12,4 L20,9 V16 L12,21 L4,16 Z" fill="#c4c5c2" fillOpacity="0.35" stroke="#74726e" strokeWidth="0.85" />
        <line x1="12" y1="4" x2="12" y2="13" stroke="#888a85" strokeWidth="0.65" strokeDasharray="1.2 1" />
        {/* Internal smoke density blob */}
        <ellipse cx="12" cy="12.5" rx="5" ry="3.5" fill="#5d5b58" fillOpacity="0.75" />
        <ellipse cx="11.5" cy="12" rx="3.5" ry="2.2" fill="#888a85" fillOpacity="0.85" />
        {/* Front bounding box edges */}
        <line x1="4" y1="9" x2="12" y2="13" stroke="#2e3436" strokeWidth="0.9" />
        <line x1="20" y1="9" x2="12" y2="13" stroke="#2e3436" strokeWidth="0.9" />
        <line x1="12" y1="13" x2="12" y2="21" stroke="#2e3436" strokeWidth="0.9" />
      </g>
    ),
  },
];
