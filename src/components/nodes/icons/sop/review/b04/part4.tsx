import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 4, Part 4 (icons 40 to 49): built-in Houdini SOP icons under review.
 */
export const BATCH_04_PART_4: OperatorIconDef[] = [
  {
    id: 'sop.uvfuse',
    label: 'UV Fuse',
    family: 'sop',
    description:
      'Black-and-white UV checkerboard at the bottom with a V-shaped split seam being pushed together by two opposing orange-red arrows at the top.',
    types: ['uvfuse'],
    icons: ['sop_uvfuse'],
    refKey: 'SOP_uvfuse',
    render: () => (
      <>
        {/* UV checkerboard with V-notch */}
        <polygon
          points="2,10.2 6.8,10.2 12,18.2 17.2,10.2 22,10.2 22,21.5 2,21.5"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <polygon points="2,10.2 6.8,10.2 12,18.2 2,18.2" fill="#3a3f47" />
        <rect x="12" y="18.2" width="10" height="3.3" fill="#262626" />
        <polygon
          points="2,10.2 6.8,10.2 12,18.2 17.2,10.2 22,10.2 22,21.5 2,21.5"
          fill="none"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Two inward-pointing fuse arrows */}
        <g fill="#ee8624" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <polygon points="2,4.2 7.2,4.2 7.2,2.2 11,5.6 7.2,9 7.2,7 2,7" />
          <polygon points="22,4.2 16.8,4.2 16.8,2.2 13,5.6 16.8,9 16.8,7 22,7" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.uvlayout',
    label: 'UV Layout',
    family: 'sop',
    description:
      'Four interlocking jigsaw puzzle pieces in a 2x2 square alternating dark charcoal and white like a UV checkerboard.',
    types: ['uvlayout'],
    icons: ['sop_uvlayout', 'sop_uvlayout-2.0', 'sop_uvlayout-3.0'],
    refKey: 'SOP_uvlayout',
    render: () => (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="1.8" fill="#f2f4f7" stroke="#262626" strokeWidth="1.15" />
        {/* Top-left dark piece and bottom-right dark piece */}
        <path
          d="M4.3,2.5 H12 V12 H4.3 C3.3,12 2.5,11.2 2.5,10.2 V4.3 C2.5,3.3 3.3,2.5 4.3,2.5 Z"
          fill="#3a3f47"
        />
        <path
          d="M12,12 H21.5 V19.7 C21.5,20.7 20.7,21.5 19.7,21.5 H12 V12 Z"
          fill="#3a3f47"
        />
        {/* Jigsaw tabs */}
        <circle cx="12" cy="7.2" r="1.7" fill="#f2f4f7" stroke="#262626" strokeWidth="0.9" />
        <circle cx="7.2" cy="12" r="1.7" fill="#3a3f47" stroke="#262626" strokeWidth="0.9" />
        <circle cx="16.8" cy="12" r="1.7" fill="#f2f4f7" stroke="#262626" strokeWidth="0.9" />
        <circle cx="12" cy="16.8" r="1.7" fill="#3a3f47" stroke="#262626" strokeWidth="0.9" />
        {/* Dividing lines */}
        <g stroke="#262626" strokeWidth="0.95">
          <line x1="12" y1="2.5" x2="12" y2="5.5" />
          <line x1="12" y1="8.9" x2="12" y2="15.1" />
          <line x1="12" y1="18.5" x2="12" y2="21.5" />
          <line x1="2.5" y1="12" x2="5.5" y2="12" />
          <line x1="8.9" y1="12" x2="15.1" y2="12" />
          <line x1="18.5" y1="12" x2="21.5" y2="12" />
        </g>
        <rect x="2.5" y="2.5" width="19" height="19" rx="1.8" fill="none" stroke="#262626" strokeWidth="1.15" />
      </>
    ),
  },
  {
    id: 'sop.uvpelt',
    label: 'UV Pelt',
    family: 'sop',
    description:
      'Circular pelt frame around a stretched 3x3 black-and-white UV checkerboard pulled outward at all four corners by red-orange arrows.',
    types: ['uvpelt'],
    icons: ['sop_uvpelt', 'sop_uvpelt-2.0'],
    refKey: 'SOP_uvpelt',
    render: () => (
      <>
        {/* Outer circular pelt frame */}
        <circle cx="12" cy="12" r="9.6" fill="none" stroke="#262626" strokeWidth="2.1" />
        <circle cx="12" cy="12" r="9.6" fill="none" stroke="#f2f4f7" strokeWidth="1.1" />
        {/* Stretched pincushion checkerboard */}
        <path
          d="M6.8,6.8 Q12,8.5 17.2,6.8 Q15.5,12 17.2,17.2 Q12,15.5 6.8,17.2 Q8.5,12 6.8,6.8 Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <g fill="#262626">
          <polygon points="6.8,6.8 10.2,7.6 10.2,10.2 7.6,10.2" />
          <polygon points="13.8,7.6 17.2,6.8 16.4,10.2 13.8,10.2" />
          <rect x="10.2" y="10.2" width="3.6" height="3.6" />
          <polygon points="7.6,13.8 10.2,13.8 10.2,16.4 6.8,17.2" />
          <polygon points="13.8,13.8 16.4,13.8 17.2,17.2 13.8,16.4" />
        </g>
        {/* Four diagonal pull arrows */}
        <g fill="#e03228" stroke="#262626" strokeWidth="0.7" strokeLinejoin="round">
          <polygon points="4.2,4.2 8.2,4.8 6.8,6.8 4.8,8.2" />
          <polygon points="19.8,4.2 19.2,8.2 17.2,6.8 15.8,4.8" />
          <polygon points="4.2,19.8 4.8,15.8 6.8,17.2 8.2,19.2" />
          <polygon points="19.8,19.8 15.8,19.2 17.2,17.2 19.2,15.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.uvproject',
    label: 'UV Project',
    family: 'sop',
    description:
      'Grey 3D cylinder on the left with a curved black-and-white UV checkerboard sheet and a red-orange projection arrow on the right.',
    types: ['uvproject'],
    icons: ['sop_uvproject'],
    refKey: 'SOP_uvproject',
    render: () => (
      <>
        {/* Grey cylinder at left */}
        <path
          d="M2.5,5.5 V16 C2.5,17.5 4.8,18.8 7.5,18.8 C10.2,18.8 12.5,17.5 12.5,16 V5.5 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <ellipse cx="7.5" cy="5.5" rx="5" ry="1.8" fill="#eef2f7" stroke="#262626" strokeWidth="1" />
        {/* Curved UV checkerboard projection screen */}
        <path
          d="M8.5,8.5 C11.5,9.5 14.5,9.2 16.8,7.8 V18.5 C14.5,20 11.5,20.2 8.5,19.2 Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <g fill="#262626">
          <path d="M8.5,8.5 L12.6,9 V13.8 L8.5,13.4 Z" />
          <path d="M12.6,13.8 L16.8,13.2 V18.5 L12.6,19.5 Z" />
        </g>
        {/* Red-orange projection arrow */}
        <polygon
          points="21.8,16.5 17.8,16.5 17.8,14.5 14.2,18 17.8,21.5 17.8,19.5 21.8,19.5"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.uvquickshade',
    label: 'UV Quick Shade',
    family: 'sop',
    description:
      'Vertical 3D cylinder with a light blue-grey top cap and a curved black-and-white UV checkerboard wrapped around its body.',
    types: ['uvquickshade'],
    icons: ['sop_uvquickshade'],
    refKey: 'SOP_uvquickshade',
    render: () => (
      <>
        {/* Cylinder body */}
        <path
          d="M5,6.2 V17.5 C5,19.8 8.1,21.5 12,21.5 C15.9,21.5 19,19.8 19,17.5 V6.2 Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Checkerboard bands on cylinder */}
        <g fill="#3a3f47">
          <path d="M5,6.2 C5,7.8 7,9 9.6,9.4 V14.2 C7,13.8 5,12.5 5,11 Z" />
          <path d="M14.4,9.4 C17,9 19,7.8 19,6.2 V11 C19,12.5 17,13.8 14.4,14.2 Z" />
          <path d="M9.6,14.2 C11.2,14.5 12.8,14.5 14.4,14.2 V19.5 C12.8,19.8 11.2,19.8 9.6,19.5 Z" />
          <path d="M5,15.5 C5,17 7,18.2 9.6,18.6 V21.2 C7,20.6 5,19.2 5,17.5 Z" />
          <path d="M14.4,18.6 C17,18.2 19,17 19,15.5 V17.5 C19,19.2 17,20.6 14.4,21.2 Z" />
        </g>
        {/* Cylinder top cap */}
        <ellipse cx="12" cy="6.2" rx="7" ry="2.8" fill="#c0c7d1" stroke="#262626" strokeWidth="1.1" />
        <path
          d="M5,6.2 V17.5 C5,19.8 8.1,21.5 12,21.5 C15.9,21.5 19,19.8 19,17.5 V6.2"
          fill="none"
          stroke="#262626"
          strokeWidth="1.1"
        />
      </>
    ),
  },
  {
    id: 'sop.uvtransform',
    label: 'UV Transform',
    family: 'sop',
    description:
      '2x2 black-and-white UV checkerboard square overlaid with a blue four-way transform arrow cross.',
    types: ['uvtransform'],
    icons: ['sop_uvtransform', 'sop_uvtransform-2.0'],
    refKey: 'SOP_uvtransform',
    render: () => (
      <>
        <rect x="2.5" y="3.5" width="17" height="17" fill="#f2f4f7" stroke="#262626" strokeWidth="1.1" />
        <rect x="11" y="3.5" width="8.5" height="8.5" fill="#262626" />
        <rect x="2.5" y="12" width="8.5" height="8.5" fill="#262626" />
        {/* 4-way blue transform arrow cross */}
        <polygon
          points="13.5,2 16.8,6.2 14.8,6.2 14.8,9.2 17.8,9.2 17.8,7.2 22,10.5 17.8,13.8 17.8,11.8 14.8,11.8 14.8,14.8 16.8,14.8 13.5,19 10.2,14.8 12.2,14.8 12.2,11.8 9.2,11.8 9.2,13.8 5,10.5 9.2,7.2 9.2,9.2 12.2,9.2 12.2,6.2 10.2,6.2"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.uvunwrap',
    label: 'UV Unwrap',
    family: 'sop',
    description:
      '3D black-and-white UV checkerboard cube unfolding outward like an open box.',
    types: ['uvunwrap'],
    icons: ['sop_uvunwrap'],
    refKey: 'SOP_uvunwrap',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          {/* Back-right unfolded flap */}
          <polygon points="12.5,13 15.2,6.2 22,9 19.5,16.8" fill="#f2f4f7" />
          <polygon points="16.8,11.2 20.6,12.8 19.5,16.8 15.6,14.8" fill="#262626" stroke="none" />
          {/* Back-left unfolded flap */}
          <polygon points="5.5,16 2,8 9.8,6 12.5,13" fill="#eef2f7" />
          <polygon points="3.8,12 7.5,10.8 9,14.6 5.5,16" fill="#262626" stroke="none" />
          {/* Base diamond */}
          <polygon points="5.5,16 12.5,13 19.5,16.8 12.5,21.5" fill="#c0c7d1" />
          {/* Front-left flap */}
          <polygon points="2,11.2 10.2,17 12.5,21.5 5.5,16" fill="#89929e" />
          {/* Front-right flap */}
          <polygon points="12.5,21.5 14.2,16.5 22,12.2 19.5,16.8" fill="#5a616b" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.alembic',
    label: 'Alembic',
    family: 'sop',
    description:
      'Dark circular Alembic badge with white swirling Ammonite tentacles and an oval eye (vendor logo, redrawn).',
    types: ['alembic', 'alembicgroup', 'alembicprimitive', 'rop_alembic'],
    icons: ['rop_alembic', 'sop_alembic'],
    refKey: 'SOP_alembic',
    render: () => (
      <>
        <circle cx="12" cy="12" r="9.8" fill="#262626" stroke="#262626" strokeWidth="1" />
        {/* White swirling shell/tentacle Negative-Space shapes */}
        <path
          d="M12,3.2 C16.8,3.2 20.5,6.8 20.5,11.2 C20.5,14.2 18.2,16.2 15.8,16.2 C13.5,16.2 12,14.5 12,12.8 C12,11.2 13.5,9.8 15,10.2 C16.2,10.5 16.5,11.8 15.5,12.5 C14.5,13.2 13.5,12.2 13.8,11.5 C12.8,11.5 12.5,13 13.5,14 C14.8,15.2 17.5,14.5 18,12 C18.5,8.8 15.5,6.2 12,6.2 C8.5,6.2 5.8,8.8 5.8,12.2 C5.8,15.5 8.2,18.2 11.5,18.5 C9.5,17.2 8.8,14.8 10.2,13.5 C11.2,12.5 12.8,13.2 12.8,14.5 C12.8,15.5 11.8,16 11.2,15.2 C10.6,16 11.5,17.5 13.2,17.8 C10,19.8 5.2,17.5 4.2,13 C3.2,8 7,3.2 12,3.2 Z"
          fill="#f2f4f7"
        />
        {/* Eye oval */}
        <ellipse cx="15.8" cy="7.2" rx="1.6" ry="0.9" transform="rotate(20 15.8 7.2)" fill="#262626" />
      </>
    ),
  },
  {
    id: 'sop.dopimport',
    label: 'DOP Import',
    family: 'sop',
    description:
      'Tilted blue wireframe simulation bounding box containing a tumbling brown wooden chair with an orange motion trail.',
    types: ['dopimport'],
    icons: ['sop_dopimport', 'sop_dopimport-2.0'],
    refKey: 'SOP_dopimport',
    render: () => (
      <>
        {/* Orange motion trail */}
        <polygon points="11.5,3 21.5,3 19.5,13 15,9.5" fill="#ffb066" opacity="0.7" />
        {/* Tumbling wooden chair */}
        <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <polygon points="7.5,9.5 12.5,5.5 16.5,10.2 11.5,14.2" fill="#c89a5a" />
          <polygon points="11.5,14.2 16.5,10.2 19,13.5 14,17.5" fill="#a8783c" />
          <line x1="11.5" y1="14.2" x2="9.5" y2="19.5" strokeWidth="1.1" />
          <line x1="14" y1="17.5" x2="12.5" y2="21.2" strokeWidth="1.1" />
          <line x1="19" y1="13.5" x2="17.5" y2="17.5" strokeWidth="1.1" />
        </g>
        {/* Tilted blue wireframe bounding box */}
        <g fill="none" stroke="#3672c4" strokeWidth="1" strokeLinejoin="round">
          <polygon points="2.5,12.5 11.8,3.2 21.2,11.8 11.8,21.2" />
          <polyline points="2.5,12.5 8.5,15.5 17.8,6.2" strokeOpacity="0.75" />
          <line x1="8.5" y1="15.5" x2="11.8" y2="21.2" strokeOpacity="0.75" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.dopimportfield',
    label: 'Dop Import Fields',
    family: 'sop',
    description:
      'Isometric wireframe field cube with point markers at its corners and a dark circle badge at bottom-right with a white arrow.',
    types: ['dopimportfield'],
    icons: ['sop_dopimportfield'],
    refKey: 'SOP_dopimportfield',
    render: () => (
      <>
        {/* Wireframe field cube */}
        <g fill="none" stroke="#5a616b" strokeWidth="0.85" strokeLinejoin="round">
          <polygon points="9.5,2.5 16.5,5.2 9.5,8.5 2.8,5.5" />
          <polyline points="2.8,5.5 2.8,13.8 9.5,17.2 16.5,13.5 16.5,5.2" />
          <line x1="9.5" y1="8.5" x2="9.5" y2="17.2" />
        </g>
        {/* Corner point dots */}
        <g fill="#eef2f7" stroke="#262626" strokeWidth="0.6">
          <circle cx="9.5" cy="2.5" r="0.95" />
          <circle cx="16.5" cy="5.2" r="0.95" />
          <circle cx="9.5" cy="8.5" r="0.95" />
          <circle cx="2.8" cy="5.5" r="0.95" />
          <circle cx="2.8" cy="13.8" r="0.95" />
          <circle cx="9.5" cy="17.2" r="0.95" />
          <circle cx="9.5" cy="11.2" r="0.95" />
        </g>
        {/* Dark import badge at bottom-right */}
        <circle cx="17" cy="17" r="4.6" fill="#262626" stroke="#f2f4f7" strokeWidth="0.7" />
        <polygon points="15.2,14.5 18.8,14.5 18.8,17 20.2,17 17,20.2 13.8,17 15.2,17" fill="#f2f4f7" />
      </>
    ),
  },
];
