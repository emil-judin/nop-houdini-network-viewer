import type { OperatorIconDef } from '../../iconTypes';

/**
 * Batch 1D (icons 76 to 100): built-in Houdini SOP icons under review.
 */
export const BATCH_01D: OperatorIconDef[] = [
  {
    id: 'sop.enumerate',
    label: 'Enumerate',
    family: 'sop',
    description: 'Three grey attribute pins arranged diagonally with white speech-bubble tags numbered 1, 2 and 3.',
    types: ['enumerate'],
    icons: ['sop_enumerate'],
    refKey: 'SOP_enumerate',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <circle cx="4.2" cy="11.5" r="2" fill="#89929e" />
          <polygon points="5.5,3 11,3 11,8.5 7.5,8.5 5.5,10.2 6.2,8.5 5.5,8.5" fill="#f2f4f7" />
          <circle cx="10" cy="15" r="2" fill="#89929e" />
          <polygon points="11.2,6.5 16.8,6.5 16.8,12 13.2,12 11.2,13.8 12,12 11.2,12" fill="#f2f4f7" />
          <circle cx="14.5" cy="19.5" r="2" fill="#89929e" />
          <polygon points="15.8,11 21.5,11 21.5,16.5 17.8,16.5 15.8,18.2 16.5,16.5 15.8,16.5" fill="#f2f4f7" />
        </g>
        <g fontFamily="sans-serif" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#262626">
          <text x="8.2" y="7.4">
            1
          </text>
          <text x="14" y="10.9">
            2
          </text>
          <text x="18.6" y="15.4">
            3
          </text>
        </g>
      </>
    ),
  },
  {
    id: 'sop.error',
    label: 'Error',
    family: 'sop',
    description: 'Round dark grey bomb with a tilted neck cap, short fuse and bright yellow spark.',
    types: ['error'],
    icons: ['sop_error'],
    refKey: 'SOP_error',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-bomb`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#89929e" />
            <stop offset="55%" stopColor="#3a3f47" />
            <stop offset="100%" stopColor="#262626" />
          </radialGradient>
        </defs>
        <circle cx="10.2" cy="14.5" r="5.8" fill={`url(#${uid}-bomb)`} stroke="#262626" strokeWidth="1.2" />
        <polygon points="12.2,8.5 15.2,10.5 13.8,12.2 10.8,10.2" fill="#c0c7d1" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        <path d="M14.2,9.2 L16.5,6.8" stroke="#262626" strokeWidth="1.4" strokeLinecap="round" />
        <polygon
          points="17.2,2.5 18,5.2 20.8,4.2 18.8,6.5 21,8.5 18,8 17.2,10.8 16.2,8 13.5,8.5 15.5,6.5 13.8,4.2 16.4,5.2"
          fill="#ffe47a"
          stroke="#ee8624"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.explodedview',
    label: 'Exploded View',
    family: 'sop',
    description: 'Isometric mechanical block in the center with curved top and bottom caps and side cylinders exploded outward.',
    types: ['explodedview'],
    icons: ['sop_explodedview'],
    refKey: 'SOP_explodedview',
    render: () => (
      <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
        <path d="M9.5,5.2 C9.5,3.2 15.5,2.6 15.5,4.6 V6.6 L9.5,8 Z" fill="#eef2f7" />
        <polygon points="9.5,8.8 14.5,7.4 16.5,8.4 11.5,9.8" fill="#eef2f7" />
        <polygon points="9.5,8.8 11.5,9.8 11.5,17.5 9.5,16.5" fill="#c0c7d1" />
        <polygon points="11.5,9.8 16.5,8.4 16.5,16 11.5,17.5" fill="#89929e" />
        <ellipse cx="14" cy="12.6" rx="1.4" ry="2" fill="#3a3f47" />
        <path d="M9.5,18.5 L15.5,17 V19.2 C15.5,21 9.5,21.5 9.5,19.8 Z" fill="#c0c7d1" />
        <rect x="2.8" y="9" width="4.2" height="2.4" rx="1" fill="#eef2f7" />
        <rect x="2.8" y="13.5" width="4.2" height="2.4" rx="1" fill="#eef2f7" />
        <ellipse cx="19.5" cy="12.2" rx="1.8" ry="2.8" fill="#c0c7d1" />
        <ellipse cx="19.5" cy="12.2" rx="0.7" ry="1.2" fill="#3a3f47" />
      </g>
    ),
  },
  {
    id: 'sop.exportobjtransforms',
    label: 'Export Object Transforms',
    family: 'sop',
    description: 'Yellow cone surrounded by green and red gimbal rings with a dark export arrow badge in the top-left corner.',
    types: ['exportobjtransforms'],
    icons: ['sop_exportobjtransforms'],
    refKey: 'SOP_exportobjtransforms',
    render: () => (
      <>
        <circle cx="13" cy="12.5" r="7.8" fill="none" stroke="#52d638" strokeWidth="1.4" />
        <polygon points="13,5.5 17.5,16.5 8.5,16.5" fill="#ffe47a" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <ellipse cx="13" cy="13.5" rx="8.2" ry="2.8" transform="rotate(-12 13 13.5)" fill="none" stroke="#e03228" strokeWidth="1.4" />
        <circle cx="7" cy="7" r="4.5" fill="#262626" stroke="#f2f4f7" strokeWidth="1" />
        <polygon points="4.5,4.5 8.5,4.8 7.2,6.1 9.5,8.4 8.4,9.5 6.1,7.2 4.8,8.5" fill="#f2f4f7" />
      </>
    ),
  },
  {
    id: 'sop.extractcontours',
    label: 'Extract Contours',
    family: 'sop',
    description: 'Dark blue balloon dog at the bottom-left projected along green dashed lines into yellow contour ellipsoids at the top-right.',
    types: ['extractcontours'],
    icons: ['sop_extractcontours'],
    refKey: 'SOP_extractcontours',
    render: () => (
      <>
        <path d="M5,11.5 L12.5,4.5 M10.5,18.5 L18.5,11.5" stroke="#58c848" strokeWidth="1.1" strokeDasharray="1.6 1.2" />
        <g fill="#262626" stroke="#3672c4" strokeWidth="1" strokeLinejoin="round">
          <ellipse cx="6.2" cy="12" rx="1.5" ry="2.8" />
          <ellipse cx="8.2" cy="14.5" rx="2.8" ry="1.4" />
          <ellipse cx="5.5" cy="17.2" rx="1.4" ry="2.4" />
          <ellipse cx="10.2" cy="17.2" rx="1.4" ry="2.4" />
        </g>
        <g fill="#f2c438" stroke="#262626" strokeWidth="1">
          <ellipse cx="14.5" cy="6.5" rx="1.6" ry="3" />
          <ellipse cx="17" cy="9" rx="3" ry="1.5" />
          <ellipse cx="14" cy="11.8" rx="1.5" ry="2.4" />
          <ellipse cx="18.8" cy="11.8" rx="1.5" ry="2.4" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.extractpointfromcurve',
    label: 'Extract Point from Curve',
    family: 'sop',
    description: 'Grey S-curve with a red extracted point along a red horizontal line below the label X=1.',
    types: ['extractpointfromcurve'],
    icons: ['sop_extractpointfromcurve'],
    refKey: 'SOP_extractpointfromcurve',
    render: () => (
      <>
        <text
          x="12"
          y="9.5"
          fontFamily="sans-serif"
          fontSize="7"
          fontWeight="bold"
          textAnchor="middle"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.9"
          paintOrder="stroke"
        >
          X=1
        </text>
        <line x1="6" y1="11.5" x2="18" y2="11.5" stroke="#e03228" strokeWidth="1.5" />
        <path d="M4,16.5 C6.5,12 10.5,13 13.5,16.5 C16,19.5 18.5,19 20,16" fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
        <path d="M4,16.5 C6.5,12 10.5,13 13.5,16.5 C16,19.5 18.5,19 20,16" fill="none" stroke="#c0c7d1" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="4" cy="16.5" r="1.5" fill="#eef2f7" stroke="#262626" strokeWidth="0.9" />
        <circle cx="20" cy="16" r="1.5" fill="#eef2f7" stroke="#262626" strokeWidth="0.9" />
        <circle cx="11.2" cy="14.5" r="2" fill="#e03228" stroke="#262626" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.extracttransform',
    label: 'Extract Transform',
    family: 'sop',
    description: 'Two blue-and-green globes on stands linked by a curved red arrow at the top.',
    types: ['extracttransform'],
    icons: ['sop_extracttransform'],
    refKey: 'SOP_extracttransform',
    render: () => (
      <>
        <path d="M6.5,7.5 C7.5,3.5 12.5,3 15,5.5" fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
        <path d="M6.5,7.5 C7.5,3.5 12.5,3 15,5.5" fill="none" stroke="#e03228" strokeWidth="1.6" strokeLinecap="round" />
        <polygon points="16.8,7.2 13,6.5 15.8,3.8" fill="#e03228" stroke="#262626" strokeWidth="0.8" strokeLinejoin="round" />
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <circle cx="7" cy="14.5" r="4" fill="#5aa2f2" />
          <path d="M5,13 C6.5,12 8,13.5 8.5,16.5" fill="#58c848" />
          <path d="M7,18.5 V20.8 M4.8,20.8 H9.2" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="17" cy="10.5" r="3.8" fill="#5aa2f2" />
          <path d="M15,9 C16.5,8 18,9.5 18.5,12.2" fill="#58c848" />
          <path d="M17,14.3 L18.2,16.5 M16.2,17.2 L19.8,15.5" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.extrude',
    label: 'Extrude - Old',
    family: 'sop',
    description: '3D extruded letter T with an orange front face, light grey side walls and a red arrow pointing down-left.',
    types: ['extrude'],
    icons: ['sop_extrude'],
    refKey: 'SOP_extrude',
    render: () => (
      <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
        {/* Stem side wall (drawn first so left arm overlaps cleanly) */}
        <polygon points="8.5,9.5 14,12 14,20.5 8.5,16.2" fill="#b4bcc8" />
        {/* Top and left-arm extruded walls of T */}
        <polygon points="4.5,5.2 13.8,2.5 20.5,7.2 11.2,9.8" fill="#eef2f7" />
        <polygon points="4.5,5.2 11.2,9.8 11.2,12.8 4.5,8" fill="#c9d0da" />
        {/* Orange front T face */}
        <polygon
          points="11.2,9.8 20.5,7.2 20.5,10.2 17,11.2 17,19.6 14,20.5 14,12 11.2,12.8"
          fill="#ee8624"
        />
        {/* Red arrow pointing down-left */}
        <polygon
          points="5.8,14.5 9.2,17 10.6,15.8 9.8,20.2 5,19.8 6.4,18.6 3,16"
          fill="#e03228"
        />
      </g>
    ),
  },
  {
    id: 'sop.extrudevolume',
    label: 'Extrude Volume',
    family: 'sop',
    description: 'Faceted 3D grey terrain patch extruded downward into a warm golden-orange volume block.',
    types: ['extrudevolume'],
    icons: ['sop_extrudevolume'],
    refKey: 'SOP_extrudevolume',
    render: () => (
      <>
        {/* Warm golden-orange extruded volume walls */}
        <polygon points="1.8,12.2 5.4,15 8.8,14 12,17.4 12,20.8 8.8,17.4 5.4,18.2 1.8,15.2" fill="#f8a43e" />
        <polygon points="12,17.4 15.6,14.8 18.8,14.5 22.2,12 22.2,15 18.8,17.8 15.6,18 12,20.8" fill="#d4720c" />
        <path d="M5.4,15 V18.2 M8.8,14 V17.4 M15.6,14.8 V18 M18.8,14.5 V17.8" stroke="#9e4c04" strokeWidth="0.55" />
        {/* Grey faceted mountain terrain top */}
        <g stroke="#5a616b" strokeWidth="0.55" strokeLinejoin="round">
          <polygon points="1.8,12.2 6.8,9.2 8.8,11.8 5.4,15" fill="#dfe4ea" />
          <polygon points="6.8,9.2 12,4.8 11.8,9.8 8.8,11.8" fill="#f5f7fa" />
          <polygon points="12,4.8 16.8,8.5 14.8,11.2 11.8,9.8" fill="#b8c0cc" />
          <polygon points="8.8,11.8 11.8,9.8 12,14.2 8.8,14" fill="#d0d6e0" />
          <polygon points="5.4,15 8.8,11.8 8.8,14" fill="#eef2f7" />
          <polygon points="11.8,9.8 14.8,11.2 15.6,14.8 12,14.2" fill="#9aa2ae" />
          <polygon points="12,14.2 15.6,14.8 12,17.4 8.8,14" fill="#c9d0da" />
          <polygon points="14.8,11.2 16.8,8.5 22.2,12 18.8,14.5" fill="#a8b0bc" />
          <polygon points="14.8,11.2 18.8,14.5 15.6,14.8" fill="#c0c7d1" />
        </g>
        {/* Crisp white rim highlight between terrain and volume wall */}
        <polyline
          points="1.8,12.2 5.4,15 8.8,14 12,17.4 15.6,14.8 18.8,14.5 22.2,12"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {/* Outer silhouette */}
        <polygon
          points="1.8,12.2 6.8,9.2 12,4.8 16.8,8.5 22.2,12 22.2,15 18.8,17.8 15.6,18 12,20.8 8.8,17.4 5.4,18.2 1.8,15.2"
          fill="none"
          stroke="#4a515c"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.fibergroom',
    label: 'Fiber Groom',
    family: 'sop',
    description: 'Striated red spindle muscle with white tendon ends and a toothed yellow comb grooming across its fibers.',
    types: ['fibergroom'],
    icons: ['sop_fibergroom'],
    refKey: 'SOP_fibergroom',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-fg-m`} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#ff5a52" />
            <stop offset="50%" stopColor="#d81818" />
            <stop offset="100%" stopColor="#800004" />
          </linearGradient>
        </defs>
        {/* White tendon ends */}
        <path
          d="M2.8,19.8 L5.5,15.2 L8.2,18 L4.4,21.2 Z M15.8,5.2 L20.2,2.5 L21.2,3.5 L18.5,7.8 Z"
          fill="#eef2f7"
          stroke="#5a616b"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        {/* Plump crimson muscle belly */}
        <path
          d="M5.2,15.6 C5.2,9.5 9.8,5.2 16.2,4.8 L18.8,7.4 C18.2,13.5 13.8,17.8 7.8,18.2 Z"
          fill={`url(#${uid}-fg-m)`}
          stroke="#680004"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Muscle fiber striations */}
        <path
          d="M6.4,15.2 C7.8,11 11.2,7.8 15.8,6.2 M7.4,16.4 C9.8,12.8 13.2,9.6 16.8,7 M8.4,17.4 C12,15 15.2,12 17.6,7.8"
          fill="none"
          stroke="#ff9e9a"
          strokeWidth="0.65"
          strokeLinecap="round"
        />
        {/* Golden-yellow grooming comb raking down-left along fibers */}
        <polygon
          points="10.2,3.8 20.5,11.5 16.8,16.5 15.6,15.6 17.8,12.6 16.2,11.4 14,14.4 12.8,13.5 15,10.5 13.4,9.3 11.2,12.3 10,11.4 12.2,8.4 8.8,5.8"
          fill="#f2c428"
          stroke="#7a5200"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {/* Bright yellow highlight on comb spine */}
        <line x1="10.4" y1="4.8" x2="19.4" y2="11.5" stroke="#fff29e" strokeWidth="0.75" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.findinstances',
    label: 'Find Instances',
    family: 'sop',
    description: 'Circular blue arrow loop and horizontal baseline with a metallic ferrule and blue magnifying glass handle framing a serif I.',
    types: ['findinstances'],
    icons: ['sop_findinstances'],
    refKey: 'SOP_findinstances',
    render: () => (
      <>
        {/* Serif I symbol inside loop */}
        <path d="M7.6,6.4 H10.4 M9,6.4 V11.4 M7.6,11.4 H10.4" stroke="#262626" strokeWidth="1.2" strokeLinecap="round" />
        {/* Circular blue arrow curving around top-right and down to bottom-right baseline */}
        <path
          d="M3.6,8.2 A5.5,5.5 0 1,1 9,14.4 H20.8"
          fill="none"
          stroke="#1d3c6e"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M3.6,8.2 A5.5,5.5 0 1,1 9,14.4 H20.8"
          fill="none"
          stroke="#5aa2f2"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        {/* Arrowhead on upper-left pointing down-left */}
        <polygon points="1.8,5.6 6.2,6.8 2.8,10.2" fill="#5aa2f2" stroke="#1d3c6e" strokeWidth="0.65" strokeLinejoin="round" />
        {/* Silver metallic ferrule neck */}
        <polygon points="11.6,13.6 13.4,11.8 15.2,13.6 13.4,15.4" fill="#dfe4ea" stroke="#4a515c" strokeWidth="0.65" strokeLinejoin="round" />
        {/* Blue magnifying glass handle */}
        <polygon points="13.4,15.4 15.2,13.6 21.4,19.8 19.6,21.6" fill="#3672c4" stroke="#1d3c6e" strokeWidth="0.8" strokeLinejoin="round" />
        <line x1="14.6" y1="15.2" x2="19.8" y2="20.4" stroke="#8fc2ff" strokeWidth="0.65" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.flatten',
    label: 'Flatten',
    family: 'sop',
    description: '3D blue-and-yellow globe sliced flat along a tilted plane above a dashed red circle.',
    types: ['flatten'],
    icons: ['sop_flatten'],
    refKey: 'SOP_flatten',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-gl`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#5aa2f2" />
            <stop offset="100%" stopColor="#1e4488" />
          </radialGradient>
        </defs>
        {/* Dashed red outline of missing lower-left cap */}
        <path
          d="M4.2,9.2 A8.2,8.2 0 0,0 18.8,16.5"
          fill="#89929e"
          fillOpacity="0.25"
          stroke="#e03228"
          strokeWidth="1"
          strokeDasharray="1.8 1.3"
          strokeLinecap="round"
        />
        {/* Upper 3D globe dome */}
        <path
          d="M4.2,9.2 A8.2,8.2 0 1,1 18.8,16.5 Z"
          fill={`url(#${uid}-gl)`}
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Yellow-green continent patches */}
        <path
          d="M9.5,4.2 C13.5,3.8 17.5,6.2 19.2,10.5 C16.2,10.8 14.5,9.2 12.8,9.8 C11.2,10.2 10.5,8.2 9.5,4.2 Z"
          fill="#ffe47a"
          stroke="#588828"
          strokeWidth="0.6"
        />
        {/* Foreshortened flat cut plane */}
        <ellipse
          cx="11.5"
          cy="12.85"
          rx="8.1"
          ry="1.2"
          transform="rotate(26.5 11.5 12.85)"
          fill="#9aa2ae"
          stroke="#262626"
          strokeWidth="0.9"
        />
      </>
    ),
  },
  {
    id: 'sop.font',
    label: 'Font',
    family: 'sop',
    description: 'Three-tone grey 3D serif block letter T.',
    types: ['font'],
    icons: ['sop_font'],
    refKey: 'SOP_font',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-fnt`} x1="0%" y1="0%" x2="20%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#b0bcc8" />
          </linearGradient>
        </defs>
        <g stroke="#4a525d" strokeWidth="0.8" strokeLinejoin="round">
          {/* Left 3D extrusion depth walls */}
          <polygon points="3.2,4.6 5.2,3.6 5.2,9.2 3.2,10.2" fill="#9aa8b8" />
          <polygon points="8.6,5.8 10.6,5 10.6,18.8 7.4,19.4 7.4,21.4 9.2,20.5" fill="#9aa8b8" />
          {/* Front serif T face */}
          <path
            d="M5.2,3.6 L21,2.2 L21,7.8 L19.2,8 C18.8,5.4 17.8,4.6 14.4,5 V18 C14.4,19.2 15.4,19.4 17,19.4 V21 L7.4,21.8 V20.2 C9.2,20 10.6,19.6 10.6,18.2 V5.4 C7.4,5.8 6.4,6.6 6,9.2 L4.4,9.4 Z"
            fill={`url(#${uid}-fnt)`}
          />
        </g>
        {/* Crisp white inner highlight */}
        <path d="M5.8,4.3 L20.2,3 M11.4,5.2 V19.5" fill="none" stroke="#ffffff" strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.force',
    label: 'Force',
    family: 'sop',
    description: 'Two joined 3D blue metaballs surrounded by six inward-pointing red force arrows.',
    types: ['force'],
    icons: ['sop_force'],
    refKey: 'SOP_force',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-mb`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#8fc2ff" />
            <stop offset="100%" stopColor="#3672c4" />
          </radialGradient>
        </defs>
        <g fill={`url(#${uid}-mb)`} stroke="#262626" strokeWidth="1.1">
          <circle cx="9.6" cy="10.2" r="3.6" />
          <circle cx="14.4" cy="13.8" r="3.6" />
        </g>
        <g stroke="#262626" strokeWidth="2.4" strokeLinecap="round">
          <line x1="3.5" y1="4.5" x2="6.2" y2="6.8" />
          <line x1="13.5" y1="2.8" x2="12.8" y2="5.8" />
          <line x1="20.8" y1="7.5" x2="18" y2="9.2" />
          <line x1="20.5" y1="18.5" x2="17.8" y2="16.4" />
          <line x1="10.5" y1="21.2" x2="11.2" y2="18.2" />
          <line x1="3.2" y1="16.5" x2="6" y2="14.8" />
        </g>
        <g stroke="#e03228" strokeWidth="1.4" strokeLinecap="round">
          <line x1="3.5" y1="4.5" x2="6.2" y2="6.8" />
          <line x1="13.5" y1="2.8" x2="12.8" y2="5.8" />
          <line x1="20.8" y1="7.5" x2="18" y2="9.2" />
          <line x1="20.5" y1="18.5" x2="17.8" y2="16.4" />
          <line x1="10.5" y1="21.2" x2="11.2" y2="18.2" />
          <line x1="3.2" y1="16.5" x2="6" y2="14.8" />
        </g>
        <g fill="#e03228" stroke="#262626" strokeWidth="0.6" strokeLinejoin="round">
          <polygon points="7.5,7.8 4.4,7.6 6.5,4.8" />
          <polygon points="12.5,7.2 11,4.6 14.2,5" />
          <polygon points="16.8,10 18,7.2 19.6,10" />
          <polygon points="16.5,15.4 19.6,15.6 17.5,18.4" />
          <polygon points="11.5,16.8 13,19.4 9.8,19" />
          <polygon points="7.2,14 6,16.8 4.4,14" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.fractal',
    label: 'Fractal',
    family: 'sop',
    description: 'Wide crinkled orange fractal terrain sheet hovering over a delicate diamond wireframe grid.',
    types: ['fractal'],
    icons: ['sop_fractal'],
    refKey: 'SOP_fractal',
    render: () => (
      <>
        {/* Delicate diamond wireframe base grid */}
        <polygon points="12,11.8 22,15.8 12,19.8 2,15.8" fill="#eef2f7" fillOpacity="0.55" stroke="#5a616b" strokeWidth="0.65" strokeLinejoin="round" />
        <path d="M7,13.8 L17,17.8 M17,13.8 L7,17.8" stroke="#7a828e" strokeWidth="0.55" />
        {/* Wide low-slung crinkled fractal sheet */}
        <g stroke="#6e2c04" strokeWidth="0.55" strokeLinejoin="round">
          <polygon points="1.8,13.8 6.4,10.2 8.8,11.2 5.8,15.4" fill="#ffc466" />
          <polygon points="6.4,10.2 11.6,7.2 9.4,10.6 8.8,11.2" fill="#ffe47a" />
          <polygon points="8.8,11.2 11.6,7.2 12.2,12.8 5.8,15.4" fill="#f59838" />
          <polygon points="11.6,7.2 15.2,10.4 12.2,12.8" fill="#ee8624" />
          <polygon points="15.2,10.4 18,9.8 22.2,13.8 16.8,15.6" fill="#e06818" />
          <polygon points="12.2,12.8 15.2,10.4 16.8,15.6 12,17.4" fill="#c8480c" />
          <polygon points="5.8,15.4 12.2,12.8 12,17.4" fill="#e8741c" />
        </g>
        {/* Crisp outer silhouette of fractal sheet */}
        <polygon
          points="1.8,13.8 6.4,10.2 11.6,7.2 15.2,10.4 18,9.8 22.2,13.8 16.8,15.6 12,17.4 5.8,15.4"
          fill="none"
          stroke="#5a2604"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.gluecluster',
    label: 'Glue Cluster',
    family: 'sop',
    description: 'Tilted white glue bottle with an orange label band and an orange nozzle pointing down-left.',
    types: ['gluecluster'],
    icons: ['sop_gluecluster'],
    refKey: 'SOP_gluecluster',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <path d="M13.5,3.5 L20.5,8.5 L12.5,17.5 L6.5,13 Z" fill="#eef2f7" />
        <polygon points="10.5,7.2 17.2,12.2 14.8,14.8 8.2,9.8" fill="#ee8624" />
        <polygon points="7.5,13.8 11.5,16.8 9.5,18.5 6.2,16" fill="#c0c7d1" />
        <polygon points="6.8,16.5 9,18 4.2,20.8" fill="#ee8624" />
      </g>
    ),
  },
  {
    id: 'sop.grainsource',
    label: 'Grain Source',
    family: 'sop',
    description: 'Pile of light yellow grain capsules enclosed inside a dashed red circle.',
    types: ['grainsource'],
    icons: ['sop_grainsource'],
    refKey: 'SOP_grainsource',
    render: () => (
      <>
        <circle cx="12" cy="12" r="8.5" fill="#ffe47a" fillOpacity="0.25" stroke="#e03228" strokeWidth="1.2" strokeDasharray="1.8 1.2" />
        <g fill="#ffe47a" stroke="#262626" strokeWidth="0.9">
          <ellipse cx="8" cy="12.5" rx="2.4" ry="1.3" transform="rotate(-20 8 12.5)" />
          <ellipse cx="12.5" cy="11.5" rx="2.4" ry="1.3" transform="rotate(15 12.5 11.5)" />
          <ellipse cx="16.2" cy="13" rx="2.2" ry="1.3" transform="rotate(-25 16.2 13)" />
          <ellipse cx="7.5" cy="16" rx="2.4" ry="1.3" transform="rotate(10 7.5 16)" />
          <ellipse cx="12" cy="15.2" rx="2.5" ry="1.3" transform="rotate(-12 12 15.2)" />
          <ellipse cx="15.8" cy="16.5" rx="2.4" ry="1.3" transform="rotate(18 15.8 16.5)" />
          <ellipse cx="11.5" cy="18.2" rx="2.5" ry="1.3" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.graphcolor',
    label: 'Graph Color',
    family: 'sop',
    description: 'Tilted grey grid patch with red, yellow, green and blue graph-coloring dots at the vertices.',
    types: ['graphcolor'],
    icons: ['sop_graphcolor'],
    refKey: 'SOP_graphcolor',
    render: () => (
      <>
        <polygon points="3,7.5 15.5,3.5 21,15.5 8.5,20.5" fill="#c0c7d1" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M7.2,6.2 L12.5,18.8 M11.5,4.8 L16.8,17.2 M5.8,11.5 L17.2,7.5 M7.2,15.8 L19,11.5" stroke="#5a616b" strokeWidth="0.8" />
        <g stroke="#262626" strokeWidth="0.7">
          <circle cx="8.8" cy="10.5" r="1.3" fill="#e03228" />
          <circle cx="13" cy="9" r="1.3" fill="#ffe47a" />
          <circle cx="10.8" cy="14.5" r="1.3" fill="#3672c4" />
          <circle cx="15" cy="13" r="1.3" fill="#52d638" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.packgroom',
    label: 'Groom Pack',
    family: 'sop',
    description: 'Grey metal funnel gathering four blue hair strands at the top into a single packed strand at the bottom spout.',
    types: ['packgroom'],
    icons: ['sop_packgroom'],
    refKey: 'SOP_packgroom',
    render: () => (
      <>
        <path d="M6.5,3 L9.5,9 M10,3 L11,9 M14,3 L13,9 M17.5,3 L14.5,9 M12,17 V21.5" fill="none" stroke="#3672c4" strokeWidth="1.5" strokeLinecap="round" />
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <ellipse cx="12" cy="8.5" rx="6.5" ry="2.2" fill="#89929e" />
          <polygon points="5.5,8.5 10.5,14.5 10.5,18.5 13.5,18.5 13.5,14.5 18.5,8.5" fill="#c0c7d1" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.unpackgroom',
    label: 'Groom Unpack',
    family: 'sop',
    description: 'Inverted grey metal funnel splitting a single blue strand from the top spout into four strands fanning out the bottom.',
    types: ['unpackgroom'],
    icons: ['sop_unpackgroom'],
    refKey: 'SOP_unpackgroom',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="10.5,5.5 13.5,5.5 13.5,9.5 18.5,15.5 5.5,15.5 10.5,9.5" fill="#c0c7d1" />
          <ellipse cx="12" cy="15.5" rx="6.5" ry="2.2" fill="#89929e" />
        </g>
        <path
          d="M12,2.5 V5.5 M9.5,15.5 L6.5,21 M11.2,15.5 L10,21 M12.8,15.5 L14,21 M14.5,15.5 L17.5,21"
          fill="none"
          stroke="#3672c4"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.heatgeodesic',
    label: 'Heat Geodesic',
    family: 'sop',
    description: 'Plump ribbed 3D geodesic bulb shaded in a heat spectrum from white, cyan and green at the bottom-left to dark crimson and orange at the top-right crown.',
    types: ['heatgeodesic'],
    icons: ['sop_heatgeodesic'],
    refKey: 'SOP_heatgeodesic',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-hg`} x1="15%" y1="90%" x2="80%" y2="18%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="18%" stopColor="#2888f0" />
            <stop offset="44%" stopColor="#42d428" />
            <stop offset="68%" stopColor="#7a0404" />
            <stop offset="88%" stopColor="#240000" />
            <stop offset="100%" stopColor="#f56818" />
          </linearGradient>
        </defs>
        {/* Soft drop shadow under bottom-left base */}
        <ellipse cx="7.8" cy="20.4" rx="5.5" ry="1.8" transform="rotate(15 7.8 20.4)" fill="#262626" fillOpacity="0.25" />
        {/* Plump ribbed geodesic bulb silhouette */}
        <path
          d="M3.6,18.8 C0.6,15.2 1.2,9.2 5.8,5.8 C9.4,3.2 12.6,4.8 15,2.4 L19.8,6.8 C17.4,9.4 19,14 15.6,18 C12.2,21.8 6.8,22 3.6,18.8 Z"
          fill={`url(#${uid}-hg)`}
        />
        {/* Jagged white base triangles */}
        <polygon points="2.2,14.8 4.2,13.5 4.5,16.2 6.8,15.5 6.8,18.2 9.8,18 9.2,20.2 12.2,20.4 8,21.2 4,19.2" fill="#ffffff" />
        {/* Jagged heat-source spikes descending from top-right neck */}
        <path
          d="M14,3.8 L11.8,6.5 L14.5,5.2 L13.2,8.5 L16,6.6 L15.2,9.8 L18,7.6"
          fill="none"
          stroke="#ffae38"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Longitudinal gore ribs */}
        <path
          d="M2.6,14.2 C7.2,11.2 11.8,8.2 16,3.4 M5,19 C9.5,15.5 13.8,11.2 17.6,4.8 M9.2,20.4 C13,17.5 16,13.4 19,6.2"
          fill="none"
          stroke="#182018"
          strokeWidth="0.45"
          strokeOpacity="0.4"
        />
        {/* Crisp white dotted geodesic contours */}
        <path
          d="M2.6,11.2 C5.2,15.8 8.8,18.5 13.5,19.5 M5.2,7.5 C8.4,12.2 12.2,15.2 16.6,16.2"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.65"
          strokeDasharray="0.7 1"
          strokeLinecap="round"
        />
        {/* Hot orange-yellow top-right source ring */}
        <ellipse cx="17.4" cy="4.6" rx="3" ry="1.1" transform="rotate(42 17.4 4.6)" fill="#f86818" stroke="#ffe47a" strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'sop.hole',
    label: 'Hole',
    family: 'sop',
    description: 'Elliptical hole sunk into the surface with a light grey inner wall and dark bottom.',
    types: ['hole'],
    icons: ['sop_hole'],
    refKey: 'SOP_hole',
    render: () => (
      <g stroke="#262626" strokeWidth="1.2">
        <ellipse cx="12" cy="12" rx="8.5" ry="4.8" fill="#3a3f47" />
        <path d="M3.5,12 A8.5,4.8 0 0,1 20.5,12 A8.5,3.6 0 0,0 3.5,12 Z" fill="#c0c7d1" />
      </g>
    ),
  },
  {
    id: 'sop.implicitsurface',
    label: 'Implicit Surface',
    family: 'sop',
    description: 'Blue-grey 3D sphere with a front-right wedge cut away to show a purple implicit interior and a red normal arrow.',
    types: ['implicitsurface'],
    icons: ['sop_implicitsurface'],
    refKey: 'SOP_implicitsurface',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-is-out`} cx="32%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#5a82b8" />
            <stop offset="100%" stopColor="#263248" />
          </radialGradient>
          <radialGradient id={`${uid}-is-in`} cx="38%" cy="50%" r="62%">
            <stop offset="0%" stopColor="#14141c" />
            <stop offset="55%" stopColor="#281c3c" />
            <stop offset="85%" stopColor="#7a4ec8" />
            <stop offset="100%" stopColor="#c8a2ff" />
          </radialGradient>
        </defs>
        {/* Cutaway sphere */}
        <circle cx="12" cy="12" r="8.2" fill={`url(#${uid}-is-in)`} stroke="#262626" strokeWidth="1.15" />
        <path
          d="M12,3.8 A8.2,8.2 0 0,0 12,20.2 C9.2,17.5 9.2,6.5 12,3.8 Z"
          fill={`url(#${uid}-is-out)`}
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* White implicit zero-contour along cut edge */}
        <path d="M12,4.2 C9.5,6.8 9.5,17.2 12,19.8" fill="none" stroke="#eef2f7" strokeWidth="1.1" strokeLinecap="round" />
        {/* Red normal arrow pointing right */}
        <polygon
          points="11.2,11 16.2,11 16.2,9.2 20.2,12 16.2,14.8 16.2,13 11.2,13"
          fill="#e03228"
          stroke="#ffffff"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.implicitsurface_convert',
    label: 'Implicit Surface Convert',
    family: 'sop',
    description: 'Sphere split into a 3D faceted orange polygon hemisphere on the left and a purple implicit cutaway on the right.',
    types: ['implicitsurface_convert'],
    icons: ['sop_implicitsurface_convert'],
    refKey: 'SOP_implicitsurface_convert',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-isc-in`} cx="40%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#14141c" />
            <stop offset="55%" stopColor="#281c3c" />
            <stop offset="85%" stopColor="#7a4ec8" />
            <stop offset="100%" stopColor="#c8a2ff" />
          </radialGradient>
        </defs>
        {/* Right implicit cutaway */}
        <path d="M12,3.8 A8.2,8.2 0 0,1 12,20.2 Z" fill={`url(#${uid}-isc-in)`} stroke="#262626" strokeWidth="1.15" />
        {/* Left faceted orange polygon hemisphere */}
        <g stroke="#8a3e08" strokeWidth="0.6" strokeLinejoin="round">
          <polygon points="12,3.8 6.5,5.8 8.8,8.2 13.5,7.8" fill="#ffb066" />
          <polygon points="6.5,5.8 3.6,12 7.8,12 8.8,8.2" fill="#f8a24e" />
          <polygon points="8.8,8.2 13.5,7.8 14.2,12 7.8,12" fill="#ee8624" />
          <polygon points="7.8,12 14.2,12 13.5,16.2 8.8,15.8" fill="#d9701a" />
          <polygon points="3.6,12 6.5,18.2 8.8,15.8 7.8,12" fill="#ee8624" />
          <polygon points="6.5,18.2 12,20.2 13.5,16.2 8.8,15.8" fill="#b85610" />
        </g>
        {/* Highlight along the orange cut rim */}
        <polyline points="12,3.8 13.5,7.8 14.2,12 13.5,16.2 12,20.2" fill="none" stroke="#ffd29e" strokeWidth="0.9" strokeLinejoin="round" />
        {/* Outer silhouette of orange shell */}
        <polyline
          points="12,3.8 6.5,5.8 3.6,12 6.5,18.2 12,20.2"
          fill="none"
          stroke="#262626"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.implicitsurface_doctor',
    label: 'Implicit Surface Doctor',
    family: 'sop',
    description: 'Red cut sphere showing a dark interior with a bold red medical cross in a white outline at the bottom-left.',
    types: ['implicitsurface_doctor'],
    icons: ['sop_implicitsurface_doctor'],
    refKey: 'SOP_implicitsurface_doctor',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
          <circle cx="13" cy="11" r="7.2" fill="#3a3f47" />
          <path d="M13,3.8 A7.2,7.2 0 0,0 13,18.2 Z" fill="#e03228" />
        </g>
        <polygon
          points="6.5,11 9.5,11 9.5,14 12.5,14 12.5,17 9.5,17 9.5,20 6.5,20 6.5,17 3.5,17 3.5,14 6.5,14"
          fill="#e03228"
          stroke="#f2f4f7"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];

