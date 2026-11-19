import { ellipsePath, type Pt, pts, quadPt } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

const OUTLINE = '#262626';

const GREY_TOP = '#eef2f7';

const GREY_LEFT = '#c0c7d1';

const GREY_RIGHT = '#89929e';

const ORANGE = '#ee8624';

const YELLOW = '#f2c438';

const GREEN = '#58c848';

const PCA_DOTS_BACK: readonly Pt[] = [
  [5.2, 16.2],
  [7.6, 11.4],
  [9.8, 17.6],
  [11.6, 8.2],
  [14.2, 15.8],
  [17.8, 9.2],
];

const PCA_DOTS_FRONT: readonly Pt[] = [
  [6.8, 18.8],
  [14.8, 6.6],
  [16.2, 12.6],
];

const TANGENT_CONTOURS = [
  'M5.4,8.6 L11.4,5.0 C14.6,3.6 19.6,4.8 19.6,7.0 C19.6,8.2 18.8,9.2 17.6,10.0 L11.6,13.6 C8.4,15.0 4.4,13.6 4.4,11.0 C4.4,9.8 4.8,9.0 5.4,8.6 Z',
  'M7.4,9.4 C7.4,7.6 9.6,6.6 12.0,6.6 C14.4,6.6 16.6,7.6 16.6,9.4 C16.6,11.0 14.4,12.0 12.0,12.0 C9.6,12.0 7.4,11.0 7.4,9.4 Z',
  'M3.8,13.2 C3.8,16.2 7.6,17.8 11.4,16.6 L18.6,12.0 C19.8,11.2 20.4,10.0 20.4,8.8',
  'M3.8,15.4 C3.8,18.2 7.6,19.6 11.4,18.4 L18.6,13.8 C19.8,13.0 20.4,11.8 20.4,10.6',
];

const WINDING_L1 = ellipsePath(12, 9.5, 6.0, 4.8);

const WINDING_L2 = ellipsePath(8.8, 13.6, 5.6, 5.2);

const WINDING_L3 = ellipsePath(15.2, 13.6, 5.6, 5.2);

// Isometric quad for sop.linearsolver (chalkboard) and sop.planartiles (ceramic tile)
const BOARD_OUTER: readonly [Pt, Pt, Pt, Pt] = [
  [4.4, 3.3],
  [18.4, 7.6],
  [18.4, 20.1],
  [4.4, 15.8],
];

const BOARD_INNER: readonly [Pt, Pt, Pt, Pt] = [
  quadPt(BOARD_OUTER, 0.16, 0.16),
  quadPt(BOARD_OUTER, 0.84, 0.16),
  quadPt(BOARD_OUTER, 0.84, 0.84),
  quadPt(BOARD_OUTER, 0.16, 0.84),
];

/**
 * Measuring and analysis operators that write attributes: distances, features, connectivity, fields and solvers.
 */
export const ANALYSIS_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.connectivity',
    label: 'Connectivity',
    family: 'sop',
    description:
      'Three separate wavy cloth pieces stacked diagonally in red, yellow and blue, showing disconnected pieces.',
    types: ['connectivity'],
    refKey: 'SOP_connectivity',
    render: () => (
      <>
        <path
          d="M4 3.8C8 2.6 11 4.6 16 3L17.5 7.4C13 9 9.5 7 5 8.1Z"
          fill="#ec5a4c"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M7 9.6C10.5 10.1 14 9.6 19 9.6L18.5 14.4C14 14.4 10.5 14.8 7.5 14.4Z"
          fill="#f2c428"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M6 16.4C10 17 14 16.4 18 15.9C19 17.9 20 19.4 21.5 20.9C17 20.4 12 21.4 8 20.9C7.5 19.4 7 17.9 6 16.4Z"
          fill="#3a7fd6"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
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
    id: 'sop.measure',
    label: 'Measure',
    family: 'sop',
    description:
      'Silver and red retractable tape measure with a yellow graduated measuring strip pulled out to the right.',
    types: ['measure'],
    icons: ['sop_measure', 'sop_measure-2.0'],
    refKey: 'SOP_measure',
    render: () => (
      <>
        <path
          d="M2.5,13.6 L2.5,8 C2.5,4.8 4.8,3 7.8,2.6 L11.5,2.2 C14.6,2.8 16.2,6.2 16.2,10.2 L16.2,16.4 L10.8,17.8 Z"
          fill="#d3d7cf"
          stroke="#2e3436"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M2.5,13.6 L10.8,17.8 L10.8,11.2 C10.8,7.2 9.2,3.8 6.2,3 C3.8,3.4 2.5,5.2 2.5,8 Z"
          fill="#eeeeec"
          stroke="#555753"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <ellipse cx="6.6" cy="10.6" rx="2.3" ry="3.4" fill="#ef2929" stroke="#888a85" strokeWidth="0.7" />
        <polygon
          points="11.2,16.5 15.8,15.3 21.8,18.2 17.2,19.6"
          fill="#fce94f"
          stroke="#987c00"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <g stroke="#2e3436" strokeWidth="0.55">
          <line x1="13.2" y1="16" x2="11.8" y2="16.4" />
          <line x1="15.2" y1="16.9" x2="13.6" y2="17.4" />
          <line x1="17.2" y1="17.8" x2="15.6" y2="18.3" />
          <line x1="19.2" y1="18.7" x2="17.6" y2="19.2" />
        </g>
        <polygon
          points="17.2,19.6 21.8,18.2 21.8,19.6 17.2,21"
          fill="#babdb6"
          stroke="#2e3436"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.measurethickness',
    label: 'Measure Thickness',
    family: 'sop',
    description: 'Metallic outside calipers with a top pivot ring and curved jaws pinching inward at the base.',
    types: ['measurethickness'],
    icons: ['sop_measurethickness'],
    refKey: 'SOP_measurethickness',
    render: () => (
      <>
        <ellipse cx="12.5" cy="20.4" rx="6.2" ry="1.8" fill="#262626" fillOpacity="0.28" />
        <g fill="#d3d7cf" stroke="#2e3436" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11.2,4.2 C11.2,2.9 13.4,2.9 13.4,4.2 L13.4,6.4 L11.2,6.4 Z" />
          <path d="M11.6,7.4 C8.2,9.8 6.8,14.8 9.8,19.4 L11.2,18.8 C8.8,15 9.8,11 12.2,8.8 Z" />
          <path d="M13,7.4 C16.4,9.8 17.8,14.8 14.8,19.4 L13.4,18.8 C15.8,15 14.8,11 12.4,8.8 Z" />
          <circle cx="12.3" cy="7.2" r="2" fill="#babdb6" />
        </g>
        <circle cx="12.3" cy="7.2" r="0.75" fill="#2e3436" />
        <line x1="10.2" y1="19.4" x2="14.4" y2="19.4" stroke="#ef2929" strokeWidth="0.85" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.distancealonggeometry',
    label: 'Distance along Geometry',
    family: 'sop',
    description:
      '3D wireframe terrain mound rising to a yellow-orange summit with distance points clustered around the peak.',
    types: ['distancealonggeometry'],
    icons: ['sop_distancealonggeometry'],
    refKey: 'SOP_distancealonggeometry',
    render: () => (
      <>
        <polygon points="2,14.8 8.5,10.8 12,7.2 15.5,10.8 22,14.8 12,19.8" fill="#c9d0da" />
        <polygon points="12,7.2 15.5,10.8 22,14.8 12,19.8" fill="#9aa2ae" />
        <polygon points="7.8,11.5 12,7.2 16.2,11.5 12,14" fill="#ffe47a" />
        <path
          d="M5.5,16.5 L9.5,12.2 L12,7.2 L14.5,12.2 L18.5,16.5 M2,14.8 L9.5,12.2 L12,14 L14.5,12.2 L22,14.8 M12,7.2 V19.8 M6,12.5 L12,16.2 L18,12.5"
          fill="none"
          stroke="#6f7782"
          strokeWidth="0.6"
        />
        <polygon
          points="2,14.8 8.5,10.8 12,7.2 15.5,10.8 22,14.8 12,19.8"
          fill="none"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <g fill="#ffe47a" stroke="#b85610" strokeWidth="0.65">
          <circle cx="12" cy="7.2" r="1.2" />
          <circle cx="10.2" cy="9.2" r="1.1" />
          <circle cx="13.8" cy="9.2" r="1.1" />
          <circle cx="12" cy="10.2" r="1.1" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.distancefromgeometry',
    label: 'Distance from Geometry',
    family: 'sop',
    description:
      'Large grey sphere with translucent concentric yellow wave rings radiating from its lower-left side toward a small red target sphere.',
    types: ['distancefromgeometry'],
    icons: ['sop_distancefromgeometry'],
    refKey: 'SOP_distancefromgeometry',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-dfg`}>
            <circle cx="13.5" cy="11.5" r="6.9" />
          </clipPath>
        </defs>
        <circle cx="13.5" cy="11.5" r="7.5" fill="#c0c7d1" stroke="#262626" strokeWidth="1.2" />
        <g clipPath={`url(#${uid}-dfg)`}>
          <circle cx="11.2" cy="13.4" r="6.0" fill="none" stroke="#ffe47a" strokeWidth="0.95" strokeOpacity="0.55" />
          <circle cx="11" cy="13.5" r="4.2" fill="#ffe47a" stroke="#d49a18" strokeWidth="1" />
          <circle cx="10" cy="14.2" r="2.2" fill="#f2c438" stroke="#f2f4f7" strokeWidth="0.9" />
        </g>
        <circle cx="5.2" cy="17.5" r="2.2" fill="#e03228" stroke="#262626" strokeWidth="1.1" />
      </>
    ),
  },
  {
    id: 'sop.distancefromtarget',
    label: 'Distance from Target',
    family: 'sop',
    description:
      'Curved yellow-and-grey quad mesh patch with a white-cased red target arrow pointing across its top edge.',
    types: ['distancefromtarget'],
    icons: ['sop_distancefromtarget'],
    refKey: 'SOP_distancefromtarget',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-dft`} x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor="#ffe47a" />
            <stop offset="45%" stopColor="#f2dc9c" />
            <stop offset="100%" stopColor="#b4bcc8" />
          </linearGradient>
        </defs>
        <path
          d="M3,6.5 Q9.5,5.2 16.5,4 Q19.2,8.8 21.5,13.8 Q15.5,17.2 9.5,21 Q6.2,13.8 3,6.5 Z"
          fill={`url(#${uid}-dft)`}
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M4.6,10.2 L17.8,6.5 M6.2,13.8 L19,9.2 M7.8,17.4 L20.2,11.6 M6.5,5.8 L12.5,19 M10,5.2 L15.5,17.2 M13.2,4.6 L18.5,15.4"
          fill="none"
          stroke="#6f7782"
          strokeWidth="0.6"
        />
        <line x1="3.8" y1="6.6" x2="18.2" y2="8.8" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
        <polygon
          points="21,9.2 16.8,6.8 17.5,8.8 16.4,10.5"
          fill="#e03228"
          stroke="#ffffff"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <line x1="3.8" y1="6.6" x2="18.2" y2="8.8" stroke="#e03228" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="3.8" cy="6.6" r="1.2" fill="#e03228" stroke="#ffffff" strokeWidth="0.6" />
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
        <polygon
          points="3,7.5 15.5,3.5 21,15.5 8.5,20.5"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M7.2,6.2 L12.5,18.8 M11.5,4.8 L16.8,17.2 M5.8,11.5 L17.2,7.5 M7.2,15.8 L19,11.5"
          stroke="#5a616b"
          strokeWidth="0.8"
        />
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
    id: 'sop.heatgeodesic',
    label: 'Heat Geodesic',
    family: 'sop',
    description:
      'Tilted pear-shaped mesh colored by a heat gradient from a hot red flared rim at upper-right through green and blue to two white cloud puffs at lower-left.',
    types: ['heatgeodesic'],
    icons: ['sop_heatgeodesic'],
    refKey: 'SOP_heatgeodesic',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-heat`} x1="82%" y1="14%" x2="22%" y2="86%">
            <stop offset="0%" stopColor="#a81f18" />
            <stop offset="26%" stopColor="#e03228" />
            <stop offset="44%" stopColor="#ee8624" />
            <stop offset="66%" stopColor="#58c848" />
            <stop offset="86%" stopColor="#3672c4" />
            <stop offset="100%" stopColor="#5aa2f2" />
          </linearGradient>
        </defs>
        {/* Cold white cloud puffs at bottom-left */}
        <path
          d="M4.6,14.8 C3.1,14.9 2.6,16.4 3.5,17.4 C2.9,18.4 3.7,19.7 5.0,19.6 L7.2,17.5 Z"
          fill="#f2f4f7"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M5.4,18.4 C4.3,18.9 4.4,20.5 5.6,20.8 C6.1,21.7 7.8,21.8 8.7,21.0 C9.7,21.5 11.1,20.6 10.8,19.3 Z"
          fill="#f2f4f7"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Tilted pear-shaped geodesic body */}
        <path
          d="M15.4,4.4 C14.0,6.0 12.1,7.3 9.7,8.4 C6.4,9.8 4.4,12.8 4.8,16.1 C5.2,19.2 8.2,20.8 11.4,19.9 C14.6,19.0 16.9,15.9 17.1,12.4 C17.3,10.0 18.0,8.2 19.6,6.8 Z"
          fill={`url(#${uid}-heat)`}
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Dark facet band across the hot upper shoulder */}
        <path
          d="M11.6,7.5 L13.8,10.2 L17.1,10.5 M13.8,10.2 L12.0,12.5 L15.4,13.6"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Hot flared rim opening at upper-right */}
        <ellipse
          cx="17.5"
          cy="5.6"
          rx="2.6"
          ry="1.25"
          transform="rotate(36 17.5 5.6)"
          fill="#ee8624"
          stroke={OUTLINE}
          strokeWidth="1.0"
        />
        <ellipse cx="17.5" cy="5.6" rx="1.35" ry="0.55" transform="rotate(36 17.5 5.6)" fill={OUTLINE} />
      </>
    ),
  },
  {
    id: 'sop.windingnumber',
    label: 'Winding Number',
    family: 'sop',
    description:
      'Three overlapping rounded loops shaded by winding parity with yellow outer lobes and center over light grey overlap crescents.',
    types: ['windingnumber'],
    icons: ['sop_windingnumber'],
    refKey: 'SOP_windingnumber',
    render: () => (
      <>
        <path d={WINDING_L1} fill={GREY_TOP} />
        <path d={WINDING_L2} fill={GREY_TOP} />
        <path d={WINDING_L3} fill={GREY_TOP} />
        <path d={`${WINDING_L1} ${WINDING_L2} ${WINDING_L3}`} fill={YELLOW} fillRule="evenodd" />
        <path d={WINDING_L1} fill="none" stroke={OUTLINE} strokeWidth="1.05" />
        <path d={WINDING_L2} fill="none" stroke={OUTLINE} strokeWidth="1.05" />
        <path d={WINDING_L3} fill="none" stroke={OUTLINE} strokeWidth="1.05" />
      </>
    ),
  },
  {
    id: 'sop.pca',
    label: 'Principal Component Analysis',
    family: 'sop',
    description:
      'Diagonal scatter cloud of pale blue-outlined dots intersected by two perpendicular bright green principal-component axes.',
    types: ['pca'],
    icons: ['sop_pca'],
    refKey: 'SOP_pca',
    render: () => (
      <>
        {PCA_DOTS_BACK.map(([cx, cy], i) => (
          <circle key={`b-${i}`} cx={cx} cy={cy} r="1.55" fill={GREY_TOP} stroke={OUTLINE} strokeWidth="0.95" />
        ))}
        <CasedStroke d="M3.0,21.0 L21.0,3.0" color={GREEN} width={1.55} casing={2.3} />
        <CasedStroke d="M8.0,8.0 L16.0,16.0" color={GREEN} width={1.55} casing={2.3} />
        {PCA_DOTS_FRONT.map(([cx, cy], i) => (
          <circle key={`f-${i}`} cx={cx} cy={cy} r="1.55" fill={GREY_TOP} stroke={OUTLINE} strokeWidth="0.95" />
        ))}
      </>
    ),
  },
  {
    id: 'sop.tangentfield',
    label: 'Tangent Field',
    family: 'sop',
    description:
      'Rounded isometric grey stadium block with a circular center hole, smooth shaded side wall, and thin concentric orange dashed contour lines along the surface.',
    types: ['tangentfield'],
    icons: ['sop_tangentfield'],
    refKey: 'SOP_tangentfield',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-wall`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={GREY_LEFT} />
            <stop offset="60%" stopColor={GREY_LEFT} />
            <stop offset="100%" stopColor={GREY_RIGHT} />
          </linearGradient>
        </defs>
        <path
          d="M3.2,10.6 L3.2,14.8 C3.2,18.2 7.2,20.2 11.4,19.0 L18.6,14.2 C20.4,13.0 21.0,11.4 21.0,9.8 L21.0,6.2 L3.2,10.6 Z"
          fill={`url(#${uid}-wall)`}
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d={`M4.6,8.2 L11.4,4.2 C15.2,2.6 21.0,4.2 21.0,6.8 C21.0,8.2 20.0,9.6 18.4,10.6 L11.6,14.6 C7.8,16.4 3.2,14.6 3.2,11.4 C3.2,10.0 3.6,8.8 4.6,8.2 Z ${ellipsePath(12.0, 9.4, 3.2, 1.9)}`}
          fill={GREY_TOP}
          fillRule="evenodd"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M9.0,9.8 A3.2,1.9 0 0,1 15.0,9.8 A3.2,1.6 0 0,0 9.0,9.8 Z"
          fill={GREY_RIGHT}
          stroke={OUTLINE}
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {TANGENT_CONTOURS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={ORANGE}
            strokeWidth="0.7"
            strokeDasharray="1.8 1.3"
            strokeLinecap="round"
          />
        ))}
      </>
    ),
  },
  {
    id: 'sop.intersectionanalysis',
    label: 'Intersection Analysis',
    family: 'sop',
    description:
      'Green and blue curves crossing each other with a glowing yellow highlight marker at their intersection point.',
    types: ['intersectionanalysis'],
    icons: ['sop_intersectionanalysis'],
    refKey: 'SOP_intersectionanalysis',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ia-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fce94f" stopOpacity="1" />
            <stop offset="55%" stopColor="#fce94f" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#fce94f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="13.5" cy="9.6" r="4.6" fill={`url(#${uid}-ia-glow)`} />
        <path d="M3,3.2 C12.2,6.2 17,11.2 21,21" fill="none" stroke="#262626" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M3,3.2 C12.2,6.2 17,11.2 21,21" fill="none" stroke="#58c848" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M21.2,8.8 C13.5,7.8 8.6,9.8 3,15.6"
          fill="none"
          stroke="#262626"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M21.2,8.8 C13.5,7.8 8.6,9.8 3,15.6"
          fill="none"
          stroke="#5aa2f2"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="3" cy="3.2" r="1.3" fill="#ddf7c5" stroke="#4e9a06" strokeWidth="0.75" />
        <circle cx="21" cy="21" r="1.3" fill="#ddf7c5" stroke="#4e9a06" strokeWidth="0.75" />
        <circle cx="21.2" cy="8.8" r="1.3" fill="#729fcf" stroke="#204a87" strokeWidth="0.75" />
        <circle cx="3" cy="15.6" r="1.3" fill="#729fcf" stroke="#204a87" strokeWidth="0.75" />
        <circle cx="13.5" cy="9.6" r="1.6" fill="#fce94f" stroke="#c4a000" strokeWidth="0.85" />
      </>
    ),
  },
  {
    id: 'sop.maskbyfeature',
    label: 'Mask by Feature',
    family: 'sop',
    description:
      'Cube and sphere over a shadowed ground plane with their upper feature faces highlighted in bright yellow.',
    types: ['maskbyfeature'],
    icons: ['sop_maskbyfeature'],
    refKey: 'SOP_maskbyfeature',
    render: () => (
      <>
        <ellipse cx="12" cy="17.2" rx="10" ry="4.8" fill="#555753" fillOpacity="0.35" />
        <polygon points="3.5,15.2 7.5,13.2 11.5,15.6 7.2,17.8" fill="#262626" fillOpacity="0.45" />
        <ellipse cx="16.4" cy="19.2" rx="3.6" ry="1.6" fill="#262626" fillOpacity="0.45" />
        <g stroke="#192333" strokeWidth="0.85" strokeLinejoin="round">
          <polygon points="4.2,6.5 8.5,4.8 12.2,7.2 7.8,9" fill="#edd400" />
          <polygon points="4.2,6.5 4.2,11.5 7.8,14 7.8,9" fill="#98a4b2" />
          <polygon points="12.2,7.2 12.2,12.2 7.8,14 7.8,9" fill="#dee0e1" />
        </g>
        <circle cx="16.5" cy="13.8" r="4.2" fill="#98a4b2" stroke="#192333" strokeWidth="0.85" />
        <path
          d="M13.2,11.4 A4.2,4.2 0 0,1 20.4,12.4 C19.5,14.2 17.2,14.8 15.2,14 C13.8,13.4 13,12.3 13.2,11.4 Z"
          fill="#edd400"
        />
        <circle cx="16.5" cy="13.8" r="4.2" fill="none" stroke="#192333" strokeWidth="0.85" />
      </>
    ),
  },
  {
    id: 'sop.laplacian',
    label: 'Laplacian',
    family: 'sop',
    description: 'Large blue-and-silver Greek Delta triangle representing the Laplace operator.',
    types: ['laplacian'],
    icons: ['sop_laplacian'],
    refKey: 'SOP_laplacian',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-lap-g`} x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#cadbed" />
            <stop offset="100%" stopColor="#4782c0" />
          </linearGradient>
        </defs>
        <polygon points="12,2.6 21,20.6 3,20.6" fill="none" stroke="#2e3436" strokeWidth="3.2" strokeLinejoin="round" />
        <polygon
          points="12,2.6 21,20.6 3,20.6"
          fill="none"
          stroke={`url(#${uid}-lap-g)`}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.linearsolver',
    label: 'Linear Solver',
    family: 'sop',
    description:
      'Isometric green chalkboard in an orange-amber wooden frame displaying white coordinate axes and a curved solution graph.',
    types: ['linearsolver'],
    icons: ['sop_linearsolver'],
    refKey: 'SOP_linearsolver',
    render: () => {
      const dx = 1.4;
      const dy = 0.5;
      const [tl, tr, br, bl] = BOARD_OUTER;
      const rightSide: Pt[] = [tr, [tr[0] + dx, tr[1] + dy], [br[0] + dx, br[1] + dy], br];
      const bottomSide: Pt[] = [bl, br, [br[0] + dx, br[1] + dy], [bl[0] + dx, bl[1] + dy]];
      const topBevel: Pt[] = [tl, tr, [tr[0] + dx, tr[1] + dy], [tl[0] + dx, tl[1] + dy]];

      // Chalkboard axes and bold S-curve in board space (avoid asterisk clutter at 21px)
      const yTop = quadPt(BOARD_INNER, 0.48, 0.14);
      const yBot = quadPt(BOARD_INNER, 0.48, 0.86);
      const xLeft = quadPt(BOARD_INNER, 0.14, 0.54);
      const xRight = quadPt(BOARD_INNER, 0.86, 0.5);
      const c0 = quadPt(BOARD_INNER, 0.16, 0.8);
      const c1 = quadPt(BOARD_INNER, 0.42, 0.78);
      const c2 = quadPt(BOARD_INNER, 0.56, 0.24);
      const c3 = quadPt(BOARD_INNER, 0.84, 0.2);

      return (
        <>
          {/* Frame 3D thickness */}
          <polygon points={pts(topBevel)} fill="#ffb066" stroke={OUTLINE} strokeWidth="0.95" strokeLinejoin="round" />
          <polygon points={pts(rightSide)} fill="#c25e12" stroke={OUTLINE} strokeWidth="0.95" strokeLinejoin="round" />
          <polygon points={pts(bottomSide)} fill="#c25e12" stroke={OUTLINE} strokeWidth="0.95" strokeLinejoin="round" />
          {/* Wooden frame front */}
          <polygon
            points={pts(BOARD_OUTER)}
            fill="#ee8624"
            stroke={OUTLINE}
            strokeWidth="1.05"
            strokeLinejoin="round"
          />
          {/* Green chalkboard */}
          <polygon
            points={pts(BOARD_INNER)}
            fill="#52d638"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          {/* White chalk axes and S-curve */}
          <path
            d={`M${pts([yTop])} L${pts([yBot])} M${pts([xLeft])} L${pts([xRight])}`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          <path
            d={`M${pts([c0])} C${pts([c1, c2, c3])}`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        </>
      );
    },
  },
];
