import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 4, Part 5 (icons 50 to 59): built-in Houdini SOP icons under review.
 */
export const BATCH_04_PART_5: OperatorIconDef[] = [
  {
    id: 'sop.dopimportrecords',
    label: 'DOP Import Records',
    family: 'sop',
    description:
      'Tilted 3D blue wireframe bounding box with small blue square handles at its vertices.',
    types: ['dopimportrecords'],
    icons: ['sop_dopimportrecords'],
    refKey: 'SOP_dopimportrecords',
    render: () => (
      <>
        <g fill="none" stroke="#3672c4" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="2.5,12.5 11.8,3.2 21.2,11.8 11.8,21.2" />
          <polyline points="2.5,12.5 8.5,15.5 17.8,6.2" strokeOpacity="0.65" />
          <line x1="8.5" y1="15.5" x2="11.8" y2="21.2" strokeOpacity="0.65" />
          <polyline points="2.5,12.5 6.2,6.2 11.8,3.2" />
          <line x1="6.2" y1="6.2" x2="15.2" y2="14.8" />
        </g>
        <g fill="#3672c4">
          <rect x="1.7" y="11.7" width="1.6" height="1.6" />
          <rect x="11" y="2.4" width="1.6" height="1.6" />
          <rect x="20.4" y="11" width="1.6" height="1.6" />
          <rect x="11" y="20.4" width="1.6" height="1.6" />
          <rect x="5.4" y="5.4" width="1.6" height="1.6" />
          <rect x="14.4" y="14" width="1.6" height="1.6" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.dopnet',
    label: 'DOP Network',
    family: 'sop',
    description:
      'Three stacked 3D grey rigid-body blocks balanced vertically with the top block tilted at an angle.',
    types: ['dopnet'],
    icons: ['networks_dop'],
    refKey: 'NETWORKS_dop',
    render: () => (
      <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
        {/* Bottom block */}
        <polygon points="6.5,14.2 11.5,12.8 15.2,15.2 10.2,16.8" fill="#eef2f7" />
        <polygon points="6.5,14.2 10.2,16.8 10.2,21.8 6.5,19.2" fill="#c0c7d1" />
        <polygon points="10.2,16.8 15.2,15.2 15.2,20.2 10.2,21.8" fill="#89929e" />
        {/* Middle block */}
        <polygon points="7.8,8.5 13.5,8.5 14.2,10.2 7.2,10.2" fill="#eef2f7" />
        <polygon points="7.2,10.2 14.2,10.2 14.2,15.2 7.2,15.2" fill="#c0c7d1" />
        {/* Top tilted block */}
        <polygon points="13.2,2 17.5,4.2 14.2,9.5 10.2,7.2" fill="#eef2f7" />
        <polygon points="14.2,9.5 17.5,4.2 19.2,6.5 16,11.2" fill="#89929e" />
        <polygon points="10.2,7.2 14.2,9.5 16,11.2 11,8.8" fill="#c0c7d1" />
      </g>
    ),
  },
  {
    id: 'sop.file',
    label: 'File',
    family: 'sop',
    description:
      'Open orange file folder holding white pages with a curved orange arrow arching out toward the upper-right.',
    types: ['file'],
    icons: ['sop_file'],
    refKey: 'SOP_file',
    render: () => (
      <>
        {/* Back folder tab */}
        <path
          d="M2.5,7.2 L3.5,4.8 L9.2,3.8 L10.8,5.5 L17.5,4.2 L18.5,17.2 L3.2,21 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* White document sheet inside */}
        <polygon
          points="4.2,7.5 16.8,5.2 17.8,16.5 4.5,19.8"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Front open flap */}
        <polygon
          points="3.2,21 6.8,10.5 21.2,7.8 18.5,17.2"
          fill="#ffb066"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Curved orange arrow */}
        <path
          d="M11.5,9.5 C12.5,5.2 16,3.8 19.5,5.2"
          fill="none"
          stroke="#262626"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M11.5,9.5 C12.5,5.2 16,3.8 19.5,5.2"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <polygon
          points="19.5,2.5 22,6.2 17.8,7.2"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.filecache',
    label: 'File Cache',
    family: 'sop',
    description:
      'Perspective 3D grey hard drive enclosure with a light grey top plate and a front bezel featuring vertical vent slots.',
    types: ['filecache'],
    icons: ['sop_filecache'],
    refKey: 'SOP_filecache',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.05" strokeLinejoin="round">
          {/* Top plate */}
          <polygon points="5.5,5.5 18.5,5.5 21.8,13.5 2.2,13.5" fill="#eef2f7" />
          {/* Front bezel */}
          <rect x="2.2" y="13.5" width="19.6" height="5.2" rx="0.8" fill="#c0c7d1" />
        </g>
        {/* Inner disk platter arc on top */}
        <path d="M7.5,11.5 C9.5,8.5 14.5,8.5 16.5,11.5" fill="none" stroke="#89929e" strokeWidth="0.75" />
        {/* Front vent slots */}
        <g stroke="#5a616b" strokeWidth="0.75" strokeLinecap="round">
          <line x1="12.5" y1="15" x2="12.5" y2="17.2" />
          <line x1="14.2" y1="15" x2="14.2" y2="17.2" />
          <line x1="15.9" y1="15" x2="15.9" y2="17.2" />
          <line x1="17.6" y1="15" x2="17.6" y2="17.2" />
          <line x1="19.3" y1="15" x2="19.3" y2="17.2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.filemerge',
    label: 'File Merge',
    family: 'sop',
    description:
      'Horizontal filmstrip with three frames at the top and a diagonal trail of overlapping red spheres emerging toward the bottom-right.',
    types: ['filemerge'],
    icons: ['sop_filemerge'],
    refKey: 'SOP_filemerge',
    render: () => (
      <>
        {/* Filmstrip at top */}
        <rect x="1.8" y="2" width="20.4" height="7.5" fill="#262626" stroke="#262626" strokeWidth="0.9" rx="0.6" />
        <g fill="#f2f4f7">
          <rect x="2.6" y="3.2" width="5.8" height="5.1" />
          <rect x="9.1" y="3.2" width="5.8" height="5.1" />
          <rect x="15.6" y="3.2" width="5.8" height="5.1" />
        </g>
        {/* Red circles inside frames */}
        <g fill="#e03228" stroke="#262626" strokeWidth="0.5">
          <circle cx="4.5" cy="4.8" r="1.3" />
          <circle cx="12" cy="5.8" r="1.3" />
          <circle cx="19" cy="6.8" r="1.3" />
        </g>
        {/* Emerging diagonal stream of red spheres */}
        <g fill="#e03228" stroke="#262626" strokeWidth="0.85">
          <circle cx="11.5" cy="11.5" r="2.3" />
          <circle cx="14.5" cy="14.2" r="2.5" />
          <circle cx="17.8" cy="17.5" r="2.8" />
        </g>
        <g fill="#ffb066">
          <circle cx="10.8" cy="10.8" r="0.6" />
          <circle cx="13.7" cy="13.4" r="0.65" />
          <circle cx="16.9" cy="16.5" r="0.75" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.gltf',
    label: 'GLTF',
    family: 'sop',
    description:
      'Green glTF oval swoop enclosing the letters glTF (vendor logo, redrawn).',
    types: ['gltf', 'rop_gltf'],
    icons: ['obj_gltf_hierarchy'],
    refKey: 'OBJ_gltf_hierarchy',
    render: () => (
      <>
        <path
          d="M19.5,9 C17.5,6.8 14,5.5 10.2,5.5 C5.2,5.5 1.8,8.5 1.8,12.2 C1.8,15.5 4.8,18.2 9.2,18.5 C10.8,18.5 11.5,17.5 11.5,15.8 V10.2"
          fill="none"
          stroke="#262626"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M19.5,9 C17.5,6.8 14,5.5 10.2,5.5 C5.2,5.5 1.8,8.5 1.8,12.2 C1.8,15.5 4.8,18.2 9.2,18.5 C10.8,18.5 11.5,17.5 11.5,15.8 V10.2"
          fill="none"
          stroke="#58c848"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <ellipse cx="8.5" cy="12.5" rx="2.2" ry="2.6" fill="none" stroke="#262626" strokeWidth="2.4" />
        <ellipse cx="8.5" cy="12.5" rx="2.2" ry="2.6" fill="none" stroke="#58c848" strokeWidth="1.3" />
        <text
          x="17"
          y="15.2"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="6.8"
          fontWeight="bold"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.55"
          paintOrder="stroke"
        >
          lTF
        </text>
      </>
    ),
  },
  {
    id: 'sop.lopimport',
    label: 'LOP Import',
    family: 'sop',
    description:
      'Perspective wooden LOP stage floor with plank lines and a dark circular import arrow badge at bottom-right.',
    types: ['lopimport'],
    icons: ['sop_lopimport'],
    refKey: 'SOP_lopimport',
    render: () => (
      <>
        {/* Wooden stage top and front apron */}
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon points="5,3.2 19,3.2 22.2,11.5 1.8,11.5" fill="#f2c438" />
          <polygon points="1.8,11.5 22.2,11.5 21,15.2 3,15.2" fill="#c89a5a" />
        </g>
        {/* Stage plank lines */}
        <g stroke="#a8783c" strokeWidth="0.6">
          <line x1="8.5" y1="3.2" x2="6.2" y2="11.5" />
          <line x1="12" y1="3.2" x2="12" y2="11.5" />
          <line x1="15.5" y1="3.2" x2="17.8" y2="11.5" />
        </g>
        {/* Dark import badge at bottom-right */}
        <circle cx="16.2" cy="16.5" r="4.8" fill="#262626" stroke="#f2f4f7" strokeWidth="0.75" />
        <polygon points="14.4,13.8 18,13.8 18,16.5 19.5,16.5 16.2,19.8 12.9,16.5 14.4,16.5" fill="#f2f4f7" />
      </>
    ),
  },
  {
    id: 'sop.lopnet',
    label: 'LOP Network',
    family: 'sop',
    description:
      'Perspective wooden LOP stage floor with a red, white, and blue beach ball resting in the center.',
    types: ['lopnet'],
    icons: ['networks_lop'],
    refKey: 'NETWORKS_lop',
    render: () => (
      <>
        {/* Wooden stage */}
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon points="5,8.5 19,8.5 22.2,16.8 1.8,16.8" fill="#f2c438" />
          <polygon points="1.8,16.8 22.2,16.8 21,20.5 3,20.5" fill="#c89a5a" />
        </g>
        <g stroke="#a8783c" strokeWidth="0.6">
          <line x1="8.5" y1="8.5" x2="6.2" y2="16.8" />
          <line x1="12" y1="8.5" x2="12" y2="16.8" />
          <line x1="15.5" y1="8.5" x2="17.8" y2="16.8" />
        </g>
        {/* Beach ball on stage */}
        <circle cx="12" cy="7.2" r="4.2" fill="#f2f4f7" stroke="#262626" strokeWidth="1" />
        <path d="M12,3 C9.5,4.2 9,8.5 12,11.4 C7.8,11.4 7.8,3 12,3 Z" fill="#e03228" />
        <path d="M12,3 C14.5,4.2 15,8.5 12,11.4 C16.2,11.4 16.2,3 12,3 Z" fill="#3672c4" />
        <circle cx="12" cy="7.2" r="4.2" fill="none" stroke="#262626" strokeWidth="1" />
      </>
    ),
  },
  {
    id: 'sop.ml_example',
    label: 'ML Example',
    family: 'sop',
    description:
      'Yellow robot block head wearing a graduation mortarboard cap with a tassel, resting on an open blue book.',
    types: [
      'ml_example',
      'ml_exampledecompose',
      'ml_examplepartition',
      'ml_extractexample',
      'ml_regressioninference',
      'ml_regressionkernel',
      'ml_regressionlinear',
      'ml_volumetilecomponent',
    ],
    icons: [
      'sop_ml_example',
      'sop_ml_exampledecompose',
      'sop_ml_examplepartition',
      'sop_ml_extractexample',
      'sop_ml_regressioninference',
      'sop_ml_regressionkernel',
      'sop_ml_regressionlinear',
      'sop_ml_volumetileexample',
    ],
    refKey: 'SOP_ml_example',
    render: () => (
      <>
        {/* Open blue book at base */}
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="4.5,16.5 11.2,13.2 19.5,17.5 12.8,21.5" fill="#5aa2f2" />
          <polygon points="5.5,15.5 11.2,12.5 18.8,16.5 12.8,20" fill="#eef2f7" />
        </g>
        {/* Yellow robot block head */}
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="7.5,8.2 12.8,10.8 12.8,16.8 7.5,14.2" fill="#f2c438" />
          <polygon points="12.8,10.8 17.2,8.5 17.2,14.5 12.8,16.8" fill="#d49a18" />
          <polygon points="7.5,8.2 12,6.2 17.2,8.5 12.8,10.8" fill="#ffe47a" />
        </g>
        {/* Visor / eyes on robot */}
        <line x1="8.8" y1="11.2" x2="11.5" y2="12.5" stroke="#ee8624" strokeWidth="1.2" strokeLinecap="round" />
        {/* Mortarboard graduation cap */}
        <polygon
          points="5.5,5.5 12.2,2.5 19,5.5 12.2,8.5"
          fill="#c89a5a"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path d="M12.2,5.5 L16.2,7.2 V9.8" fill="none" stroke="#f2c438" strokeWidth="1" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.ml_exampleimport',
    label: 'ML Example Import',
    family: 'sop',
    description:
      'Thick 3D raw red steak cut with a white fat rim and inner marbling lines.',
    types: ['ml_exampleimport', 'rawimport', 'rop_geometryraw', 'rop_ml_exampleraw'],
    icons: ['rop_geometryraw', 'rop_ml_exampleraw', 'sop_ml_exampleimport', 'sop_rawimport'],
    refKey: 'SOP_ml_exampleimport',
    render: () => (
      <>
        {/* 3D steak side thickness */}
        <path
          d="M2.5,14.5 V17.2 C2.5,19.2 5,20.5 8.5,20 C12.5,19.5 18.2,17.8 20.5,15 C21.5,13.8 21.8,12.2 21.8,10.2 L20,10.5 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Top steak surface with white fat rim */}
        <path
          d="M2.5,14.5 C2.5,11.5 5.5,10.5 7.5,8.2 C9.5,5.8 12.5,4.8 15.8,5.8 C19.2,6.8 21.8,8.2 21.8,10.5 C21.8,13.5 18.2,15.8 13.5,16.8 C9,17.8 2.5,17.5 2.5,14.5 Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Red meat interior */}
        <path
          d="M4.2,14.2 C4.2,12 6.8,11 8.5,9 C10.2,7 12.5,6.2 15.2,7 C18,7.8 20,9 20,10.6 C20,12.8 17,14.6 13,15.4 C9,16.2 4.2,16 4.2,14.2 Z"
          fill="#e03228"
        />
        {/* White marbling */}
        <path
          d="M11.5,7.2 C13,9.5 12.5,12.5 9.5,14.2 M12.5,10.5 L16.8,11.2"
          fill="none"
          stroke="#f2f4f7"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </>
    ),
  },
];
