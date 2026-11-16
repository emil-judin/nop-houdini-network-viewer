import type { OperatorIconDef } from '../../iconTypes';

/**
 * Batch 1C (icons 51 to 75): built-in Houdini SOP icons under review.
 */
export const BATCH_01C: OperatorIconDef[] = [
  {
    id: 'sop.crosssectionsurface',
    label: 'Cross Section Surface',
    family: 'sop',
    description: 'Open S-curved green ribbon wall with a red closed profile curve around the top rim and a red vertical seam.',
    types: ['crosssectionsurface'],
    icons: ['sop_crosssectionsurface'],
    refKey: 'SOP_crosssectionsurface',
    render: () => (
      <>
        <path
          d="M4.2,9.2 C4.2,6 10.5,6.5 13.5,4.2 C16,2.5 19.8,2.8 19.8,5.2 V14.2 C19.8,11.8 16,11.5 13.5,13.2 C10.5,15.5 4.2,15 4.2,18.2 Z"
          fill="#68b84c"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M4.2,9.2 C4.2,11.8 9.2,11.8 12.8,9.2 C16.2,6.8 19.8,7.2 19.8,5.2 V14.2 C19.8,16.2 16.2,15.8 12.8,18.2 C9.2,20.8 4.2,20.8 4.2,18.2 Z"
          fill="#b8f090"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M4.2,9.2 C4.2,6 10.5,6.5 13.5,4.2 C16,2.5 19.8,2.8 19.8,5.2 C19.8,7.2 16.2,6.8 12.8,9.2 C9.2,11.8 4.2,11.8 4.2,9.2 Z"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.4"
        />
        <line x1="7.8" y1="11.2" x2="7.8" y2="20.2" stroke="#e03228" strokeWidth="1.3" />
      </>
    ),
  },
  {
    id: 'sop.curveanimate',
    label: 'Curve Animate',
    family: 'sop',
    description: 'Flexing blue muscular arm with an internal green bone curve, dashed red fist ring and motion arcs.',
    types: ['curveanimate'],
    icons: ['sop_curveanimate'],
    refKey: 'SOP_curveanimate',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ca-arm`} x1="30%" y1="15%" x2="65%" y2="90%">
            <stop offset="0%" stopColor="#7cb0e8" />
            <stop offset="55%" stopColor="#3868b0" />
            <stop offset="100%" stopColor="#162c58" />
          </linearGradient>
        </defs>
        {/* Muscular flexed arm silhouette */}
        <path
          d="M3.2,6.8 C4.5,5.2 7.2,5.8 7.8,8.8 C8.2,10.2 9.2,9.8 10.5,11.8 C11.4,13.2 11.2,14.8 11,15.4 C11.8,14.2 13.5,13.2 15.2,11.5 L15,8.8 C14.8,6.8 16.5,5.4 18.4,6 C20.2,6.6 20.6,8.8 19,10.4 L17.5,11.8 C15.2,15.5 12.8,19.8 9.8,19.8 C7.5,19.8 4.8,16.2 3.5,12.5 C2.6,10 2.4,7.8 3.2,6.8 Z"
          fill={`url(#${uid}-ca-arm)`}
          stroke="#182b49"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Upper arm cut cross-section oval */}
        <ellipse cx="5.3" cy="6.8" rx="2.1" ry="0.9" transform="rotate(22 5.3 6.8)" fill="#9ec8f8" stroke="#182b49" strokeWidth="0.7" />
        {/* Bicep specular highlight */}
        <path d="M8.4,10.8 C9.6,11.2 10.4,12.6 10.2,14.2" fill="none" stroke="#b8dcff" strokeWidth="0.75" strokeLinecap="round" />
        {/* Internal green animation curve with joint dots */}
        <path
          d="M5.4,7.8 C5.8,11.8 7.6,16.5 9.8,17.6 C11.8,18.2 14.5,14.2 17,8.8"
          fill="none"
          stroke="#52d638"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <g fill="#d8ffce" stroke="#287818" strokeWidth="0.5">
          <circle cx="5.4" cy="7.8" r="0.85" />
          <circle cx="9.8" cy="17.6" r="0.85" />
          <circle cx="17" cy="8.8" r="0.85" />
        </g>
        {/* Dashed red circle on the fist */}
        <circle cx="17.6" cy="8.2" r="2.2" fill="none" stroke="#e03228" strokeWidth="0.8" strokeDasharray="1.2 0.9" />
        {/* Motion arcs around arm */}
        <path
          d="M1.8,9.8 C1.6,13.5 3.4,17.2 6.2,19.5 M18.2,13.2 C18.8,15.5 17.8,17.8 15.8,19.4 M20,14 C20.5,15.8 19.6,17.8 18,19.2"
          fill="none"
          stroke="#e03228"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.curvesect',
    label: 'Curve Intersect',
    family: 'sop',
    description: 'Dark diagonal curve crossing a grey U-loop curve with two red intersection dots.',
    types: ['curvesect'],
    icons: ['sop_curvesect'],
    refKey: 'SOP_curvesect',
    render: () => (
      <>
        <path d="M19.5,6.5 C6,9.5 4.5,19 14.5,15 C17.5,13.8 19.5,11.5 20.5,9.5" fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
        <path d="M19.5,6.5 C6,9.5 4.5,19 14.5,15 C17.5,13.8 19.5,11.5 20.5,9.5" fill="none" stroke="#89929e" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M4.5,4.5 C10.5,7.5 15,13 18.5,19.5" fill="none" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="11.2" cy="9.2" r="1.8" fill="#e03228" stroke="#262626" strokeWidth="0.9" />
        <circle cx="15.8" cy="14.5" r="1.8" fill="#e03228" stroke="#262626" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.debrissource',
    label: 'Debris Source',
    family: 'sop',
    description: 'Fractured grey stone block with small angular rock shards and red debris dots bursting from its top crater.',
    types: ['debrissource'],
    icons: ['sop_debrissource'],
    refKey: 'SOP_debrissource',
    render: () => (
      <>
        <polygon points="2.8,9.8 8.5,7.8 13.5,9.2 21.2,8.2 21.2,18.2 13.5,21.2 2.8,18.8" fill="#c9d0da" />
        <polygon points="2.8,9.8 7.5,11.2 10.5,10.5 13.5,12.5 13.5,21.2 2.8,18.8" fill="#9aa2ae" />
        <polygon points="13.5,12.5 16.8,10.2 19,10.5 21.2,8.2 21.2,18.2 13.5,21.2" fill="#7a828e" />
        <path d="M2.8,9.8 L7.5,11.2 L10.5,10.5 L13.5,12.5 L16.8,10.2 L19,10.5 L21.2,8.2 M13.5,12.5 V21.2" fill="none" stroke="#5a616b" strokeWidth="0.7" />
        <polygon
          points="2.8,9.8 8.5,7.8 13.5,9.2 21.2,8.2 21.2,18.2 13.5,21.2 2.8,18.8"
          fill="none"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <g fill="#dfe4ea" stroke="#5a616b" strokeWidth="0.65" strokeLinejoin="round">
          <polygon points="5.5,6.2 7.8,5.5 8.2,7.5 6,8" />
          <polygon points="10.2,4.5 12.8,3.8 13.2,6 10.8,6.5" />
          <polygon points="14.8,5.5 17.2,4.8 17.6,6.8 15.2,7.2" />
          <polygon points="8.5,7.5 10.8,7 11.2,8.8 8.8,9.2" />
        </g>
        <g fill="#e03228">
          <circle cx="4.8" cy="8.2" r="0.9" />
          <circle cx="7.8" cy="9.2" r="1" />
          <circle cx="9.8" cy="5.8" r="0.85" />
          <circle cx="12.5" cy="9.5" r="1" />
          <circle cx="14.2" cy="7.8" r="0.9" />
          <circle cx="15.8" cy="4.2" r="0.85" />
          <circle cx="18.5" cy="7.8" r="0.95" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.deflate',
    label: 'Deflate',
    family: 'sop',
    description: 'Deflated red balloon with a tied neck at the bottom-left and wrinkled folds across its body.',
    types: ['deflate'],
    icons: ['sop_deflate'],
    refKey: 'SOP_deflate',
    render: () => (
      <>
        <path
          d="M5.5,17.2 L3.5,19 L5,20.5 L6.8,18.5 C10.5,20.2 16.5,19.5 19.5,15.5 C21.5,12.5 20.5,8.5 17,7.5 C14,6.5 11.5,7.5 9.5,7 C6.5,6.5 4.8,9.5 5.5,12.8 C5,14.5 5.2,16 5.5,17.2 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M8.5,11 C11,12.5 14,12 16.5,10.5 M9.5,15 C12.5,16 15.5,15.2 17.5,13.5" fill="none" stroke="#262626" strokeWidth="0.9" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.delete',
    label: 'Delete',
    family: 'sop',
    description: 'Grey metal trash can with vertical ribs and a domed lid with a handle.',
    types: ['delete'],
    icons: ['sop_delete'],
    refKey: 'SOP_delete',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="6,8.5 18,8.5 16.2,20.5 7.8,20.5" fill="#c0c7d1" />
        <ellipse cx="12" cy="7.5" rx="6.8" ry="2.4" fill="#eef2f7" />
        <path d="M9.8,6.5 V4.8 H14.2 V6.5" fill="none" strokeWidth="1.2" />
        <path d="M9.5,11 L10.2,18.5 M12,11 V18.8 M14.5,11 L13.8,18.5" stroke="#5a616b" strokeWidth="0.9" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'sop.deltamush',
    label: 'Delta Mush',
    family: 'sop',
    description: 'Green forearm and hand with a white bone diamond inside and a blue wireframe quad cage.',
    types: ['deltamush'],
    icons: ['sop_deltamush'],
    refKey: 'SOP_deltamush',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <path
          d="M18.5,2.5 L21.5,5.5 L10.5,16.5 L8.5,21 L6.8,20.2 L7.8,17.8 L5,19.8 L3.8,18.8 L6.8,16.2 L3.5,17.2 L3,15.8 L6.8,14.2 L4.5,13.5 L5.2,12.2 L8.5,13.2 Z"
          fill="#58c848"
        />
        <polygon points="19.5,4.5 16.5,5.2 9.5,14.5 18.2,7.5" fill="#f2f4f7" stroke="#3672c4" strokeWidth="0.9" />
        <path d="M11.5,8.5 L15.5,12.5 M14.5,5.5 L18.5,9.5" stroke="#3672c4" strokeWidth="0.9" />
      </g>
    ),
  },
  {
    id: 'sop.dembones_skinningconverter',
    label: 'Dem Bones Skinning Converter',
    family: 'sop',
    description: 'Dark circular disc with a stylized white skull inside (vendor logo, redrawn).',
    types: ['dembones_skinningconverter'],
    icons: ['sop_dembones_skinningconverter', 'sop_kinefx-dembones_skinningconverter'],
    refKey: 'SOP_dembones_skinningconverter',
    render: () => (
      <>
        <circle cx="12" cy="12" r="9.5" fill="#262626" />
        <path
          d="M6.5,10.5 C6.5,6.2 17.5,6.2 17.5,10.5 C17.5,13.2 15.8,14.8 14.5,15.8 C14.2,17.5 9.8,17.5 9.5,15.8 C8.2,14.8 6.5,13.2 6.5,10.5 Z"
          fill="#eef2f7"
        />
        <ellipse cx="9.8" cy="11" rx="1.6" ry="2.2" transform="rotate(-12 9.8 11)" fill="#262626" />
        <ellipse cx="14.2" cy="11" rx="1.6" ry="2.2" transform="rotate(12 14.2 11)" fill="#262626" />
      </>
    ),
  },
  {
    id: 'sop.detangle',
    label: 'Detangle',
    family: 'sop',
    description: 'Four colorful vertical strands in blue, purple, green and orange untangling from curved loops.',
    types: ['detangle'],
    icons: ['sop_detangle'],
    refKey: 'SOP_detangle',
    render: () => (
      <g fill="none" strokeLinecap="round">
        <path d="M8.5,20.5 V13 C4,9 9,5 5,3.5" stroke="#262626" strokeWidth="2.4" />
        <path d="M8.5,20.5 V13 C4,9 9,5 5,3.5" stroke="#3672c4" strokeWidth="1.3" />
        <path d="M11,20.5 V12 C16,9 8,6 13,3.5" stroke="#262626" strokeWidth="2.4" />
        <path d="M11,20.5 V12 C16,9 8,6 13,3.5" stroke="#9b66d4" strokeWidth="1.3" />
        <path d="M13.5,20.5 V13 C18,10 13,6 17,3.5" stroke="#262626" strokeWidth="2.4" />
        <path d="M13.5,20.5 V13 C18,10 13,6 17,3.5" stroke="#52d638" strokeWidth="1.3" />
        <path d="M15.8,20.5 V14 C11,11 19,8 20,4.5" stroke="#262626" strokeWidth="2.4" />
        <path d="M15.8,20.5 V14 C11,11 19,8 20,4.5" stroke="#ee8624" strokeWidth="1.3" />
      </g>
    ),
  },
  {
    id: 'sop.dissolve',
    label: 'Dissolve',
    family: 'sop',
    description: 'Orange perspective quad grid with three solid inner half-edges and the fourth dissolved into a dashed line.',
    types: ['dissolve'],
    icons: ['sop_dissolve', 'sop_dissolve-2.0'],
    refKey: 'SOP_dissolve',
    render: () => (
      <>
        <polygon points="13.2,4.2 21.5,11.2 10.8,20 2.5,13" fill="#ee8624" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        <polygon points="13.1,5.3 20.2,11.3 10.9,18.9 3.8,12.9" fill="none" stroke="#ffb066" strokeWidth="0.7" />
        <path d="M6.6,16.5 L17.4,7.7 M8,8.5 L12,12.1" fill="none" stroke="#262626" strokeWidth="1" strokeLinecap="round" />
        <line x1="12" y1="12.1" x2="16.2" y2="15.6" stroke="#262626" strokeWidth="1" strokeDasharray="1.2 1.2" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.distancealonggeometry',
    label: 'Distance along Geometry',
    family: 'sop',
    description: '3D wireframe terrain mound rising to a yellow-orange summit with distance points clustered around the peak.',
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
    description: 'Large grey sphere with concentric yellow distance rings facing a small red target sphere at the bottom-left.',
    types: ['distancefromgeometry'],
    icons: ['sop_distancefromgeometry'],
    refKey: 'SOP_distancefromgeometry',
    render: () => (
      <>
        <circle cx="13.5" cy="11.5" r="7.5" fill="#c0c7d1" stroke="#262626" strokeWidth="1.2" />
        <circle cx="11" cy="13.5" r="4.2" fill="#ffe47a" stroke="#d49a18" strokeWidth="1" />
        <circle cx="10" cy="14.2" r="2.2" fill="#f2c438" stroke="#f2f4f7" strokeWidth="0.9" />
        <circle cx="5.2" cy="17.5" r="2.2" fill="#e03228" stroke="#262626" strokeWidth="1.1" />
      </>
    ),
  },
  {
    id: 'sop.distancefromtarget',
    label: 'Distance from Target',
    family: 'sop',
    description: 'Curved yellow-and-grey quad mesh patch with a white-cased red target arrow pointing across its top edge.',
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
        <polygon points="21,9.2 16.8,6.8 17.5,8.8 16.4,10.5" fill="#e03228" stroke="#ffffff" strokeWidth="0.8" strokeLinejoin="round" />
        <line x1="3.8" y1="6.6" x2="18.2" y2="8.8" stroke="#e03228" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="3.8" cy="6.6" r="1.2" fill="#e03228" stroke="#ffffff" strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'sop.drawcurve',
    label: 'Draw Curve',
    family: 'sop',
    description: 'Tilted blue pen drawing a bold dark S-curve stroke on the left.',
    types: ['drawcurve'],
    icons: ['sop_drawcurve'],
    refKey: 'SOP_drawcurve',
    render: () => (
      <>
        <path d="M5.5,7 C7,10.5 3.5,14.5 5.5,17.5 C7,19.8 10.5,19.8 12,18" fill="none" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="12,18 13.5,14 15.8,15.5" fill="#eef2f7" />
          <polygon points="13.5,14 18.5,4.5 21.2,6.2 15.8,15.5" fill="#5aa2f2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.each',
    label: 'Each',
    family: 'sop',
    description: 'Curved grey loop arrow arching over the top and pointing down-right.',
    types: ['each'],
    icons: ['sop_each'],
    refKey: 'SOP_each',
    render: () => (
      <path
        d="M4.5,16.5 C2.5,9.5 8,4.5 14,5.5 C16.5,6 18.2,7.5 19.2,9.5 L21.2,8.2 L20.8,14.5 L15.2,12 L16.8,10.8 C15.8,9.2 14,8.2 11.8,8.2 C7.8,8.2 5.5,11.5 6.5,15.5 Z"
        fill="#c0c7d1"
        stroke="#262626"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'sop.edgecollapse',
    label: 'Edge Collapse',
    family: 'sop',
    description: 'Orange diamond quad patch with its right edge collapsed to a point inside a dashed ghost corner.',
    types: ['edgecollapse'],
    icons: ['sop_edgecollapse'],
    refKey: 'SOP_edgecollapse',
    render: () => (
      <>
        <polyline points="12,4 20.5,12 16.2,16" fill="none" stroke="#262626" strokeWidth="1.2" strokeDasharray="1.5 1.2" />
        <polygon points="12,4 16.2,16 12,20 3.5,12" fill="#ee8624" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M7.8,8 L16.2,16 M7.8,16 L14.1,10" stroke="#262626" strokeWidth="1" />
      </>
    ),
  },
  {
    id: 'sop.edgecusp',
    label: 'Edge Cusp',
    family: 'sop',
    description: 'Faceted geodesic sphere with a yellow-orange left crescent cusped apart from the grey right hemisphere.',
    types: ['edgecusp'],
    icons: ['sop_edgecusp'],
    refKey: 'SOP_edgecusp',
    render: () => (
      <>
        {/* Inner cusp cavity */}
        <polygon points="10.8,2.2 10.2,8 9.6,12 10.2,16 10.8,21.8 8,16 7.2,12 8,8" fill="#c87828" />
        {/* Left cusped yellow-orange crescent */}
        <g stroke="#5a3208" strokeWidth="0.55" strokeLinejoin="round">
          <polygon points="10.8,2.2 4.6,5.8 8,8" fill="#ffe478" />
          <polygon points="4.6,5.8 2,12 7.2,12 8,8" fill="#ffc44c" />
          <polygon points="2,12 4.6,18.2 8,16 7.2,12" fill="#f58818" />
          <polygon points="4.6,18.2 10.8,21.8 8,16" fill="#d96208" />
        </g>
        {/* Right faceted grey sphere body */}
        <g stroke="#3a4048" strokeWidth="0.55" strokeLinejoin="round">
          <polygon points="10.8,2.2 17,3.8 14.5,7.8 10.2,8" fill="#ffffff" />
          <polygon points="17,3.8 20.8,7.8 18.8,11.5 14.5,7.8" fill="#e4e8ee" />
          <polygon points="20.8,7.8 22,13.5 18.8,11.5" fill="#9aa2ae" />
          <polygon points="10.2,8 14.5,7.8 14,12 9.6,12" fill="#f2f5f8" />
          <polygon points="14.5,7.8 18.8,11.5 14,12" fill="#d0d6e0" />
          <polygon points="9.6,12 14,12 14.5,16.2 10.2,16" fill="#d0d6e0" />
          <polygon points="14,12 18.8,11.5 18.4,16.4 14.5,16.2" fill="#9aa2ae" />
          <polygon points="18.8,11.5 22,13.5 20.4,18 18.4,16.4" fill="#7a828e" />
          <polygon points="10.2,16 14.5,16.2 10.8,21.8" fill="#9aa2ae" />
          <polygon points="14.5,16.2 18.4,16.4 16.8,20.6 10.8,21.8" fill="#7a828e" />
          <polygon points="18.4,16.4 20.4,18 16.8,20.6" fill="#5a616b" />
        </g>
        {/* Outer silhouette and cusp rim */}
        <path
          d="M10.8,2.2 L17,3.8 L20.8,7.8 L22,13.5 L20.4,18 L16.8,20.6 L10.8,21.8 L4.6,18.2 L2,12 L4.6,5.8 Z M10.8,2.2 L8,8 L7.2,12 L8,16 L10.8,21.8 M10.8,2.2 L10.2,8 L9.6,12 L10.2,16 L10.8,21.8"
          fill="none"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.edgedivide',
    label: 'Edge Divide',
    family: 'sop',
    description: 'Orange diamond quad with four light-yellow division points spaced along its diagonal edge.',
    types: ['edgedivide'],
    icons: ['sop_edgedivide'],
    refKey: 'SOP_edgedivide',
    render: () => (
      <>
        <polygon points="13.2,2.5 22,11 10.8,21.5 2,13" fill="#ee8624" stroke="#262626" strokeWidth="1.05" strokeLinejoin="round" />
        <polygon points="13.1,3.5 20.8,11 10.9,20.4 3.2,13" fill="none" stroke="#ffc888" strokeWidth="0.65" />
        <line x1="6.4" y1="17.2" x2="17.6" y2="6.8" stroke="#262626" strokeWidth="0.85" />
        <g fill="#fff6c8" stroke="#6e4406" strokeWidth="0.65">
          <circle cx="7.4" cy="16.3" r="1.05" />
          <circle cx="10.4" cy="13.5" r="1.05" />
          <circle cx="13.4" cy="10.7" r="1.05" />
          <circle cx="16.4" cy="7.9" r="1.05" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.edgeequalize',
    label: 'Edge Equalize',
    family: 'sop',
    description: 'Orange vertical quad strip with unevenly spaced grey points above and evenly spaced white points below.',
    types: ['edgeequalize'],
    icons: ['sop_edgeequalize'],
    refKey: 'SOP_edgeequalize',
    render: () => (
      <>
        <polygon points="4,4 19,3 20.5,19.5 5.5,20.5" fill="#ee8624" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M7.5,3.8 L9,20.2 M10.2,3.6 L12.5,20 M15.5,3.2 L16.5,19.8 M4.5,9.5 L19.5,8.5 M5,15.5 L20,14.5" stroke="#262626" strokeWidth="0.9" />
        <g fill="#c0c7d1" stroke="#262626" strokeWidth="0.8">
          <circle cx="8" cy="9.2" r="1.2" />
          <circle cx="10.8" cy="9" r="1.2" />
          <circle cx="15.8" cy="8.7" r="1.2" />
        </g>
        <g fill="#f2f4f7" stroke="#262626" strokeWidth="0.9">
          <circle cx="5" cy="15.5" r="1.3" />
          <circle cx="8.8" cy="15.2" r="1.3" />
          <circle cx="12.5" cy="15" r="1.3" />
          <circle cx="16.2" cy="14.8" r="1.3" />
          <circle cx="20" cy="14.5" r="1.3" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.edgeflip',
    label: 'Edge Flip',
    family: 'sop',
    description: 'Orange diamond quad with a solid flipped diagonal and the previous diagonal shown dashed.',
    types: ['edgeflip'],
    icons: ['sop_edgeflip'],
    refKey: 'SOP_edgeflip',
    render: () => (
      <>
        <polygon points="8.5,5 20.5,7.5 15.5,19 3.5,16.5" fill="#ee8624" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        <line x1="3.5" y1="16.5" x2="20.5" y2="7.5" stroke="#262626" strokeWidth="1.2" />
        <line x1="8.5" y1="5" x2="15.5" y2="19" stroke="#262626" strokeWidth="1" strokeDasharray="1.5 1.2" />
      </>
    ),
  },
  {
    id: 'sop.edgefracture',
    label: 'Edge Fracture',
    family: 'sop',
    description: '3D wireframe grey sphere cracked along a jagged stair-step seam and encircled by a tilted orange-red ring.',
    types: ['edgefracture'],
    icons: ['sop_edgefracture'],
    refKey: 'SOP_edgefracture',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ef`} cx="35%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b8c4d4" />
            <stop offset="100%" stopColor="#5a6575" />
          </radialGradient>
        </defs>
        {/* Back arc of orbital ring behind sphere */}
        <path d="M4.8,4.8 A10,2.2 42 0,1 19.2,19.2" fill="none" stroke="#ee8624" strokeWidth="1" strokeOpacity="0.55" />
        <circle cx="12" cy="12" r="7" fill={`url(#${uid}-ef)`} stroke="#262626" strokeWidth="1.15" />
        <ellipse cx="12" cy="12" rx="7" ry="3" fill="none" stroke="#5a616b" strokeWidth="0.6" />
        <ellipse cx="12" cy="12" rx="3" ry="7" fill="none" stroke="#5a616b" strokeWidth="0.6" />
        <polyline
          points="6.2,8 9.2,8 9.2,11 12.2,11 12.2,14 15.2,14 15.2,16.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <polyline
          points="6.2,8 9.2,8 9.2,11 12.2,11 12.2,14 15.2,14 15.2,16.5"
          fill="none"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Front arc of orbital ring in front of sphere */}
        <path d="M4.8,4.8 A10,2.2 42 0,0 19.2,19.2" fill="none" stroke="#ee8624" strokeWidth="1.15" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.edgerelax',
    label: 'Edge Relax',
    family: 'sop',
    description: 'Relaxed orange triangulated mesh patch with white circular vertex pins at the corners, edges and interior.',
    types: ['edgerelax'],
    icons: ['sop_edgerelax'],
    refKey: 'SOP_edgerelax',
    render: () => (
      <>
        <path
          d="M4.5,4.5 Q11.5,5.5 18.8,4.2 Q18.2,12 19.5,19.5 Q12,18.5 4.2,19.5 Q5.5,12 4.5,4.5 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M4.5,4.5 L13.8,9.8 L18.8,4.2 M11.5,5 L13.8,9.8 L18.5,11.8 M4.8,12 L9.5,14.5 L13.8,9.8 L4.8,12 M4.2,19.5 L9.5,14.5 L19.5,19.5 M13.8,9.8 L19.5,19.5 M9.5,14.5 L12,19"
          fill="none"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <g fill="#f2f4f7" stroke="#262626" strokeWidth="0.8">
          <circle cx="4.5" cy="4.5" r="1.3" />
          <circle cx="11.5" cy="5" r="1.2" />
          <circle cx="18.8" cy="4.2" r="1.3" />
          <circle cx="4.8" cy="12" r="1.2" />
          <circle cx="13.8" cy="9.8" r="1.3" />
          <circle cx="18.5" cy="11.8" r="1.2" />
          <circle cx="9.5" cy="14.5" r="1.3" />
          <circle cx="4.2" cy="19.5" r="1.3" />
          <circle cx="12" cy="19" r="1.2" />
          <circle cx="19.5" cy="19.5" r="1.3" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.edgestraighten',
    label: 'Edge Straighten',
    family: 'sop',
    description: 'Warm orange subdivided quad grid with a lower dashed zig-zag edge straightened into a horizontal upper edge.',
    types: ['edgestraighten'],
    icons: ['sop_edgestraighten'],
    refKey: 'SOP_edgestraighten',
    render: () => (
      <>
        <polygon points="2.2,3.4 20.2,1.8 21.8,20.2 3.8,21.8" fill="#f59e36" stroke="#262626" strokeWidth="1.05" strokeLinejoin="round" />
        <polygon points="3,4.1 19.5,2.6 21,19.5 4.5,21" fill="none" stroke="#ffffff" strokeWidth="0.65" />
        <path d="M5.8,3.1 L7.4,21.5 M9.4,2.8 L11,21.2 M13,2.5 L14.6,20.9 M16.6,2.1 L18.2,20.5" stroke="#b85206" strokeWidth="0.55" />
        {/* Straightened upper horizontal edge */}
        <line x1="2.6" y1="8.1" x2="20.6" y2="6.5" stroke="#ffffff" strokeWidth="1.6" />
        <line x1="2.6" y1="8.1" x2="20.6" y2="6.5" stroke="#4a2004" strokeWidth="0.8" />
        {/* Lower zig-zag edge with white dashed overlay */}
        <polyline
          points="3.5,18.8 7.9,10.2 12.6,18.2 16.5,10.8 21.2,15.5"
          fill="none"
          stroke="#4a2004"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <polyline
          points="3.5,18.8 7.9,10.2 12.6,18.2 16.5,10.8 21.2,15.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.9"
          strokeDasharray="1.2 1.1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.edgetransport',
    label: 'Edge Transport',
    family: 'sop',
    description: 'Light blue Y-branching edge junction with three yellow arrows flowing from the upper-left stem into the two branches.',
    types: ['edgetransport'],
    icons: ['sop_edgetransport'],
    refKey: 'SOP_edgetransport',
    render: () => (
      <>
        <path d="M4,4 L11.5,11.5 M11.5,11.5 L13,20.5 M11.5,11.5 L20.5,13.5" fill="none" stroke="#262626" strokeWidth="3.6" strokeLinecap="round" />
        <path d="M4,4 L11.5,11.5 M11.5,11.5 L13,20.5 M11.5,11.5 L20.5,13.5" fill="none" stroke="#8fc2ff" strokeWidth="2" strokeLinecap="round" />
        <g fill="#f2c438" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <polygon points="3.5,6.5 7.5,10.5 6.2,11.8 10.5,12.2 10.2,8 8.8,9.2 4.8,5.2" />
          <polygon points="8.5,13.5 9.2,17.8 7.5,18 10.8,21 12.5,17.2 10.8,17.5 10.2,13.2" />
          <polygon points="13.5,13.2 17.5,14.2 17.2,15.8 20.8,14.8 18.2,11.8 17.8,13.2 13.8,12" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.ends',
    label: 'Ends',
    family: 'sop',
    description: 'Open dark C-ring with a gap at the top flanked by two bright red endpoint dots.',
    types: ['ends'],
    icons: ['sop_ends'],
    refKey: 'SOP_ends',
    render: () => (
      <>
        <path d="M9,4.5 A8,8 0 1,0 15,4.5" fill="none" stroke="#f2f4f7" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M9,4.5 A8,8 0 1,0 15,4.5" fill="none" stroke="#262626" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="9.5" cy="4.2" r="2" fill="#e03228" stroke="#f2f4f7" strokeWidth="0.8" />
        <circle cx="14.5" cy="4.2" r="2" fill="#e03228" stroke="#f2f4f7" strokeWidth="0.8" />
      </>
    ),
  },
];

