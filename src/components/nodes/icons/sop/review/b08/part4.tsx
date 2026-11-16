import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 8, Part 4 (icons 40 to 49): built-in Houdini SOP icons under review.
 */
export const BATCH_08_PART_4: OperatorIconDef[] = [
  {
    id: 'sop.crowdmotionpathtransition',
    label: 'Crowd MotionPath Transition',
    family: 'sop',
    description:
      'Two blue crowd agents transitioning along a green motion path between walking and running poses.',
    types: ['crowdmotionpathtransition', 'crowdmotionpathtrigger'],
    icons: ['sop_crowdmotionpathtransition', 'sop_crowdmotionpathtrigger'],
    refKey: 'SOP_crowdmotionpathtransition',
    render: () => (
      <g>
        {/* Green motion path transition ribbon on ground */}
        <path
          d="M2.5,19.5 C8,19.5 14,15.5 21.5,15.5"
          fill="none"
          stroke="#408b09"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M2.5,19.5 C8,19.5 14,15.5 21.5,15.5"
          fill="none"
          stroke="#7be028"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Left walking agent */}
        <circle cx="7" cy="6.2" r="1.7" fill="#d0dfef" stroke="#193774" strokeWidth="0.8" />
        <path
          d="M4.5,9 L9.5,9 L11,13 L9.6,13.5 L8.6,11 L8.4,14.5 L10,19.5 L8.4,19.8 L7,15.5 L5.6,19.8 L4,19.5 L5.6,14.5 L5.4,11 L4.4,13.5 L3,13 Z"
          fill="#608bc3"
          stroke="#193774"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Right running agent */}
        <circle cx="16.8" cy="4.2" r="1.8" fill="#d0dfef" stroke="#193774" strokeWidth="0.8" />
        <path
          d="M13.5,7.2 L20.2,6.2 L21.8,9.8 L20.4,10.2 L18.5,8.2 L17.6,12.5 L20.8,17.2 L19.2,17.8 L16.2,13.8 L13.2,17.8 L11.8,17 L14.8,12.2 L15,8.8 L12.5,10.5 Z"
          fill="#608bc3"
          stroke="#193774"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.crowdsource',
    label: 'Crowd Source',
    family: 'sop',
    description:
      'Three blue crowd agents standing on red concentric spawn rings.',
    types: ['crowdsource'],
    icons: ['crowds_crowdsource', 'sop_crowdsource'],
    refKey: 'CROWDS_crowdsource',
    render: () => (
      <g>
        {/* Red spawn rings and center dots */}
        <g fill="none" stroke="#ef2929" strokeWidth="0.85">
          <ellipse cx="12" cy="14.5" rx="4.2" ry="1.6" />
          <ellipse cx="6.5" cy="19.5" rx="4.8" ry="1.8" />
          <ellipse cx="17.5" cy="18.2" rx="4.5" ry="1.7" />
        </g>
        {/* Back agent */}
        <circle cx="12" cy="3.8" r="1.4" fill="#d0dfef" stroke="#204a87" strokeWidth="0.7" />
        <path
          d="M9.8,6 H14.2 L15.2,9.8 L13.6,10 L13.2,14.2 H10.8 L10.4,10 L8.8,9.8 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {/* Right agent */}
        <circle cx="17.5" cy="6.8" r="1.5" fill="#d0dfef" stroke="#204a87" strokeWidth="0.75" />
        <path
          d="M15,9.2 H20 L21,13.2 L19.4,13.5 L19,18 H16 L15.6,13.5 L14,13.2 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        {/* Left foreground agent */}
        <circle cx="6.5" cy="7.8" r="1.6" fill="#d0dfef" stroke="#204a87" strokeWidth="0.75" />
        <path
          d="M3.8,10.2 H9.2 L10.4,14.5 L8.6,14.8 L8.2,19.4 H4.8 L4.4,14.8 L2.6,14.5 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.addcharacterpicker',
    label: 'APEX Add Character Picker',
    family: 'sop',
    description:
      'Front-facing blue character figure with bright-green character picker UI widgets at the head, hands, and torso.',
    types: ['addcharacterpicker'],
    icons: ['sop_apex-addcharacterpicker'],
    refKey: 'SOP_apex-addcharacterpicker',
    render: () => (
      <g>
        {/* Front-facing blue character silhouette */}
        <circle cx="12" cy="4.2" r="2.1" fill="#a2bede" stroke="#193774" strokeWidth="0.85" />
        <path
          d="M7.5,7.8 H16.5 L20.5,12.8 L18.8,13.8 L15.8,10 L15.2,14.8 L16.8,21.4 H14.4 L12,16.2 L9.6,21.4 H7.2 L8.8,14.8 L8.2,10 L5.2,13.8 L3.5,12.8 Z"
          fill="#608bc3"
          stroke="#193774"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Bright-green character picker control shapes */}
        <g fill="#8ae234" stroke="#4e9a06" strokeWidth="0.65">
          <circle cx="12" cy="4.2" r="1" />
          <rect x="10.4" y="9.2" width="3.2" height="2.4" rx="0.5" />
          <circle cx="4.2" cy="13.2" r="1.2" />
          <circle cx="19.8" cy="13.2" r="1.2" />
          <circle cx="8.4" cy="20.5" r="1.1" />
          <circle cx="15.6" cy="20.5" r="1.1" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.apex.addgroom',
    label: 'APEX Add Groom',
    family: 'sop',
    description:
      'Curved lilac and purple groom feather with a bright central quill shaft and barb notches.',
    types: [
      'addgroom',
      'featherinstancepool',
      'feathermatchuncondensed',
      'feathermindist',
      'feathernoise',
      'feathernormalize',
      'featherray',
      'featherresample',
      'feathersurface',
      'feathersurfaceblend',
      'feathertemplateassign',
      'featheruncondense',
      'featherutility',
    ],
    icons: [
      'sop_apex-addgroom',
      'sop_featherinstancepool',
      'sop_feathermatchuncondensed',
      'sop_feathermindist',
      'sop_feathernoise',
      'sop_feathernormalize',
      'sop_featherray',
      'sop_featherresample',
      'sop_feathersurface',
      'sop_feathersurfaceblend',
      'sop_feathertemplateassign',
      'sop_featheruncondense',
      'sop_featherutility',
    ],
    refKey: 'SOP_apex-addgroom',
    render: () => (
      <g>
        {/* Feather vane body with barb notches */}
        <path
          d="M11.5,2.2 C15.5,2.5 18.2,6.2 17.8,10.5 L15.2,11.2 L17.4,12.2 C16.8,15.5 14.8,17.8 11.8,18.5 C9.2,16.5 8.5,12.5 9.2,7.5 C9.6,4.5 10.2,2.5 11.5,2.2 Z"
          fill="#e099de"
          stroke="#755076"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Darker purple shading on right side of feather vane */}
        <path
          d="M12.2,3 C15,3.5 17,6.5 16.8,10.2 L14.5,11 L16.4,12 C15.8,14.8 14.2,16.8 11.8,17.6 Z"
          fill="#9c579e"
          stroke="none"
        />
        {/* Central white quill shaft extending down-left */}
        <path
          d="M11.8,2.5 C13,8.5 12.2,15.2 8.5,21.5"
          fill="none"
          stroke="#262626"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M11.8,2.5 C13,8.5 12.2,15.2 8.5,21.5"
          fill="none"
          stroke="#f0e7ef"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.addmldeformer',
    label: 'APEX Add ML Deformer',
    family: 'sop',
    description:
      'Flexed muscular arm overlaid with a blue and white machine-learning neural network graph.',
    types: ['addmldeformer', 'ml_deform'],
    icons: ['sop_apex-addmldeformer', 'sop_ml_deform'],
    refKey: 'SOP_apex-addmldeformer',
    render: () => (
      <g>
        {/* Flexed arm and bicep silhouette */}
        <path
          d="M4,15.5 L7.5,9.5 C9,7.5 11.5,8.5 12.2,11.2 C13.5,10.2 16.5,10.5 17.8,12.8 L20.5,8.5 C21.2,7.5 22.2,8.2 21.8,9.8 L19.2,18.2 C18.2,20.2 15.2,20.8 12,19.8 C8.5,18.8 5.5,17.5 4,15.5 Z"
          fill="#e7ecef"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Neural network graph edges */}
        <g stroke="#427ab2" strokeWidth="0.8">
          <line x1="6.5" y1="5.2" x2="11.5" y2="8.8" />
          <line x1="11.5" y1="8.8" x2="18.5" y2="3.5" />
          <line x1="11.5" y1="8.8" x2="14.5" y2="14.8" />
          <line x1="8.5" y1="14.5" x2="14.5" y2="14.8" />
          <line x1="18.5" y1="3.5" x2="16.5" y2="11.2" />
        </g>
        {/* Neural network nodes */}
        <g fill="#73baec" stroke="#231e20" strokeWidth="0.65">
          <circle cx="6.5" cy="5.2" r="1.3" />
          <circle cx="18.5" cy="3.5" r="1.4" />
          <circle cx="11.5" cy="8.8" r="1.3" />
          <circle cx="16.5" cy="11.2" r="1.2" />
          <circle cx="8.5" cy="14.5" r="1.3" />
          <circle cx="14.5" cy="14.8" r="1.3" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.apex.addwrinkles',
    label: 'APEX Add Wrinkles',
    family: 'sop',
    description:
      'Tan and brown fabric or skin patch with radiating compression wrinkle folds.',
    types: ['addwrinkles', 'wrinkledeformer'],
    icons: ['sop_apex-addwrinkles', 'sop_wrinkledeformer'],
    refKey: 'SOP_apex-addwrinkles',
    render: () => (
      <g>
        {/* Wrinkled tan patch silhouette */}
        <path
          d="M3.5,6.5 C5.2,3.2 8.5,2 11.5,3.2 L19.8,11.5 C21.8,13.5 21.5,16.8 18.8,19.2 L9.5,21.5 C5.5,21.8 3.5,19.5 5.2,16.5 C6.2,14.5 5.8,12 4.2,10.2 C2.8,8.8 2.5,7.8 3.5,6.5 Z"
          fill="#d3bc90"
          stroke="#392301"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Deep brown shaded wrinkle folds */}
        <path
          d="M6.2,5.5 C9.5,7.5 11.5,10.5 10.2,15.5 M8.8,4.2 C12.5,6.8 14.8,10.8 13.8,16.8 M12.2,6.2 C15.2,8.8 17.2,12.2 16.8,17.2 M6.5,18.2 C9.5,17.5 12.8,15.5 15.2,12.5"
          fill="none"
          stroke="#654200"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
        {/* Highlight ridges beside creases */}
        <path
          d="M7.2,5 C10.5,7 12.5,10 11.2,15 M9.8,4 C13.5,6.6 15.6,10.5 14.8,16.2"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="0.6"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.animationfromskeleton',
    label: 'APEX Animation from Skeleton',
    family: 'sop',
    description:
      'Dynamic running silver-gray skeleton figure with motion vibration arcs around the head and limbs.',
    types: ['animationfromskeleton'],
    icons: ['sop_apex-animationfromskeleton'],
    refKey: 'SOP_apex-animationfromskeleton',
    render: () => (
      <g>
        {/* Motion vibration arcs */}
        <path
          d="M7.5,3.2 A3.5,3.5 0 0 0 5.5,6.5 M18.5,6.2 A4,4 0 0 1 20.5,9.5 M4.2,16.5 A4,4 0 0 0 6.5,19.8"
          fill="none"
          stroke="#888a85"
          strokeWidth="0.85"
          strokeLinecap="round"
        />
        {/* Running silver-gray skeleton */}
        <circle cx="12.5" cy="4.8" r="2.2" fill="#e9e9e6" stroke="#2c2c2c" strokeWidth="0.85" />
        <path
          d="M12.5,7 L11.5,13.5 M7.5,9.2 L12,8.5 L17.5,10.2 L19.8,7.8 M7.5,9.2 L5.2,12.2 M11.5,13.5 L16.5,16.2 L14.5,21.2 M11.5,13.5 L7.8,16.8 L4.2,15.2"
          fill="none"
          stroke="#2c2c2c"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5,7 L11.5,13.5 M7.5,9.2 L12,8.5 L17.5,10.2 L19.8,7.8 M7.5,9.2 L5.2,12.2 M11.5,13.5 L16.5,16.2 L14.5,21.2 M11.5,13.5 L7.8,16.8 L4.2,15.2"
          fill="none"
          stroke="#d7dad3"
          strokeWidth="0.95"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.autorigbuilder',
    label: 'APEX AutoRig Builder',
    family: 'sop',
    description:
      'Segmented orange character mannequin limbs beneath an amber builder saw-horse frame.',
    types: ['autorigbuilder'],
    icons: ['sop_apex-autorigbuilder'],
    refKey: 'SOP_apex-autorigbuilder',
    render: () => (
      <g>
        {/* Segmented orange mannequin character */}
        <g fill="#f4b167" stroke="#66330d" strokeWidth="0.8" strokeLinejoin="round">
          <circle cx="12" cy="4.2" r="2" fill="#f3d196" />
          <rect x="9.2" y="6.8" width="5.6" height="6.8" rx="2" fill="#ee8424" />
          <path d="M9.2,7.5 L4.8,11.8 L6,13 L9.5,9.5 Z" />
          <path d="M14.8,7.5 L19.2,11.8 L18,13 L14.5,9.5 Z" />
          <rect x="9.2" y="13.8" width="2.4" height="7" rx="1" />
          <rect x="12.4" y="13.8" width="2.4" height="7" rx="1" />
        </g>
        {/* Amber builder frame / bar across the middle */}
        <polygon
          points="3,10.5 5.5,7.2 18.5,7.2 21,10.5"
          fill="#e9b96e"
          stroke="#a0670c"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.apex.autorigcomponent',
    label: 'APEX Autorig Component',
    family: 'sop',
    description:
      'Segmented orange and gold wooden mannequin figure with articulated ball joints.',
    types: ['autorigcomponent', 'testgeometry_electra'],
    icons: ['sop_apex-autorigcomponent', 'sop_testgeometry_electra'],
    refKey: 'SOP_apex-autorigcomponent',
    render: () => (
      <g>
        {/* Articulated wooden mannequin */}
        <g fill="#f4b167" stroke="#66330d" strokeWidth="0.8" strokeLinejoin="round">
          {/* Head */}
          <ellipse cx="12" cy="4.2" rx="2" ry="2.2" fill="#f3d196" />
          {/* Chest and pelvis */}
          <path d="M9,7 H15 L14.2,11.8 H9.8 Z" fill="#ee8424" />
          <rect x="9.4" y="12.2" width="5.2" height="2.4" rx="1" fill="#f0943b" />
          {/* Left arm */}
          <path d="M8.8,7.4 L4.5,12.2 C3.8,13 4.8,14.2 5.6,13.4 L9.2,9.5 Z" />
          {/* Right arm */}
          <path d="M15.2,7.4 L19.5,12.2 C20.2,13 19.2,14.2 18.4,13.4 L14.8,9.5 Z" />
          {/* Left and right legs */}
          <rect x="9" y="14.8" width="2.5" height="6.6" rx="1.1" />
          <rect x="12.5" y="14.8" width="2.5" height="6.6" rx="1.1" />
        </g>
        {/* Joint highlight circles */}
        <circle cx="9" cy="8" r="0.8" fill="#f3d196" stroke="#66330d" strokeWidth="0.5" />
        <circle cx="15" cy="8" r="0.8" fill="#f3d196" stroke="#66330d" strokeWidth="0.5" />
      </g>
    ),
  },
  {
    id: 'sop.apex.buildfkgraph',
    label: 'APEX Build FK Graph',
    family: 'sop',
    description:
      'Purple APEX graph grid panel overlaid with bright-green and orange FK bone links.',
    types: ['buildfkgraph'],
    icons: ['sop_apex-buildfkgraph'],
    refKey: 'SOP_apex-buildfkgraph',
    render: () => (
      <g>
        {/* Purple APEX graph grid panel */}
        <rect
          x="3.5"
          y="4.5"
          width="17"
          height="14"
          rx="1"
          fill="#ad7fa8"
          stroke="#262626"
          strokeWidth="0.9"
        />
        {/* Internal grid lines */}
        <g stroke="#cc9ac9" strokeWidth="0.5">
          <line x1="7.8" y1="4.5" x2="7.8" y2="18.5" />
          <line x1="12" y1="4.5" x2="12" y2="18.5" />
          <line x1="16.2" y1="4.5" x2="16.2" y2="18.5" />
          <line x1="3.5" y1="9.2" x2="20.5" y2="9.2" />
          <line x1="3.5" y1="13.8" x2="20.5" y2="13.8" />
        </g>
        {/* Green and orange FK bone segments */}
        <polygon
          points="11,2.2 13,2.2 12.6,7.5 11.4,7.5"
          fill="#8ae234"
          stroke="#4e9a06"
          strokeWidth="0.7"
        />
        <polygon
          points="11.2,8.2 12.8,8.2 12.5,14.5 11.5,14.5"
          fill="#edd400"
          stroke="#8f5902"
          strokeWidth="0.7"
        />
        <polygon
          points="11.2,8.2 6.2,12.2 7.2,13.4 12,9.4"
          fill="#8ae234"
          stroke="#4e9a06"
          strokeWidth="0.7"
        />
        <polygon
          points="12.8,8.2 17.8,12.2 16.8,13.4 12,9.4"
          fill="#f57900"
          stroke="#8f5902"
          strokeWidth="0.7"
        />
        {/* FK Joint circles */}
        <circle cx="12" cy="8.2" r="1.2" fill="#eeeeec" stroke="#262626" strokeWidth="0.65" />
        <circle cx="12" cy="14.8" r="1.2" fill="#eeeeec" stroke="#262626" strokeWidth="0.65" />
      </g>
    ),
  },
];
