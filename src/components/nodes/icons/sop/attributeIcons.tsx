import type { OperatorIconDef } from '../iconTypes';

/** Outline of the 12-tooth Sort gear (generated, radius 8 to 10.2 around the icon center). */
export const GEAR_PATH =
  'M10.71 4.11 L11.09 1.84 L12.91 1.84 L13.29 4.11 L14.83 4.52 L16.29 2.75 L17.87 3.65 L17.07 5.81 L18.19 6.93 L20.35 6.13 L21.25 7.71 L19.48 9.17 L19.89 10.71 L22.16 11.09 L22.16 12.91 L19.89 13.29 L19.48 14.83 L21.25 16.29 L20.35 17.87 L18.19 17.07 L17.07 18.19 L17.87 20.35 L16.29 21.25 L14.83 19.48 L13.29 19.89 L12.91 22.16 L11.09 22.16 L10.71 19.89 L9.17 19.48 L7.71 21.25 L6.13 20.35 L6.93 18.19 L5.81 17.07 L3.65 17.87 L2.75 16.29 L4.52 14.83 L4.11 13.29 L1.84 12.91 L1.84 11.09 L4.11 10.71 L4.52 9.17 L2.75 7.71 L3.65 6.13 L5.81 6.93 L6.93 5.81 L6.13 3.65 L7.71 2.75 L9.17 4.52 Z';

/**
 * Built-in SOP icons for attributes, groups, color, normals and sorting.
 *
 * Original MIT-licensed drawings that follow `docs/ICON_ART_BIBLE.md`.
 */
export const SOP_ATTRIBUTE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.attribcreate',
    label: 'Attribute Create',
    family: 'sop',
    description:
      'Shaded grey attribute pin (bottom-left) with a white speech-bubble tag whose tail points at the pin, and a bold dark plus sign inside the tag.',
    types: ['attribcreate'],
    refKey: 'SOP_attribcreate-2.0',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pin`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        <path
          d="M8.5 2.5H21.5V12H13L6.8 17.2L10 12H8.5Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d="M15 4.6V9.9M12.35 7.25H17.65" stroke="#262626" strokeWidth="2.2" />
        <circle cx="5" cy="19" r="3.2" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'sop.attribdelete',
    label: 'Attribute Delete',
    family: 'sop',
    description:
      'The Attribute Create pin and speech-bubble tag, crossed out by a large red X with a dark casing.',
    types: ['attribdelete'],
    refKey: 'SOP_attribdelete',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pin`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        <path
          d="M8.5 2.5H21.5V12H13L6.8 17.2L10 12H8.5Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <circle cx="5" cy="19" r="3.2" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.2" />
        <path d="M10.5 2.5L20 12.5M20 2.5L10.5 12.5" stroke="#262626" strokeWidth="4.4" strokeLinecap="round" />
        <path d="M10.5 2.5L20 12.5M20 2.5L10.5 12.5" stroke="#e03228" strokeWidth="2.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.attribpromote',
    label: 'Attribute Promote',
    family: 'sop',
    description:
      'Two pinned speech-bubble tags (top-left and bottom-right) linked by a curved orange arrow that promotes the first tag to the second.',
    types: ['attribpromote'],
    refKey: 'SOP_attribpromote',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pin`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        {/* Source tag (top-left) */}
        <path
          d="M2 2.5H10.5V8.5H7L4.2 12.8L5 8.5H2Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="3.8" cy="15" r="2.2" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.1" />
        {/* Destination tag (bottom-right) */}
        <path
          d="M12.5 11.5H21.5V17.5H20.2L19.2 19L17.6 17.5H12.5Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="19.5" cy="20.8" r="2.2" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.1" />
        {/* Curved promote arrow */}
        <path d="M8.5 5.5C12 1.5 18 2.5 17.5 7.8" fill="none" stroke="#262626" strokeWidth="4" strokeLinecap="round" />
        <path d="M8.5 5.5C12 1.5 18 2.5 17.5 7.8" fill="none" stroke="#ee7a24" strokeWidth="2.3" strokeLinecap="round" />
        <polygon points="14.8,7.6 20.2,7.6 17.5,11" fill="#ee7a24" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.attribwrangle',
    label: 'Attribute Wrangle',
    family: 'sop',
    description:
      'Yellow cowboy hat (crown, dark hat band, wide darker brim) with a white sheriff star, plus a white speech bubble in the bottom-right corner.',
    types: ['attribwrangle'],
    matches: (q) => q.baseType.includes('wrangle'),
    refKey: 'SOP_attribwrangle',
    sizePx: 22,
    render: () => (
      <>
        {/* Hat Brim */}
        <path
          d="M1.8 12.2C2.2 9.4 7.5 8.4 12.5 8.6C17 8.8 20.6 9.8 20.3 11.8C19.9 14.4 13.5 16.4 8.2 16.1C4.5 15.9 1.6 14.3 1.8 12.2Z"
          fill="#d4a012"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Hat Crown */}
        <path
          d="M6.2 11.2C5.6 6.6 7.8 2.8 10.8 3.1C11.8 3.2 12.4 3.9 13.1 3.5C15.5 2.6 17.1 6 16.6 10.6C14 12.3 9 12.6 6.2 11.2Z"
          fill="#ebbf1a"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Hat Band */}
        <path d="M6.3 10C9.2 11.3 13.6 11.1 16.7 9.4" fill="none" stroke="#262626" strokeWidth="1.6" />
        {/* Sheriff Star Badge */}
        <polygon
          points="11,4.4 11.8,6 13.5,6.2 12.2,7.4 12.6,9.1 11,8.2 9.4,9.1 9.8,7.4 8.5,6.2 10.2,6"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* White Speech Bubble */}
        <path
          d="M12.5 14H21.5V19.5H17.5L14.5 22L15.2 19.5H12.5Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.color',
    label: 'Color',
    family: 'sop',
    description:
      'Paint tube tilted to the left: light body, blue label band, grey cap and dark crimped end.',
    types: ['color'],
    refKey: 'SOP_color',
    render: () => (
      <>
        <g transform="rotate(-35 12 12)">
          <rect x="9.5" y="3" width="5" height="2.8" rx="0.6" fill="#dcdcdc" stroke="#222" strokeWidth="1.1" />
          <polygon points="7.5,6 16.5,6 18,19 6,19" fill="#e8edf2" stroke="#222" strokeWidth="1.2" />
          <rect x="7.2" y="9" width="9.6" height="4.5" fill="#2c6ec9" />
          <line x1="5.5" y1="19" x2="18.5" y2="19" stroke="#222" strokeWidth="2.2" />
        </g>
      </>
    ),
  },
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
        <path d="M4 3.8C8 2.6 11 4.6 16 3L17.5 7.4C13 9 9.5 7 5 8.1Z" fill="#ec5a4c" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M7 9.6C10.5 10.1 14 9.6 19 9.6L18.5 14.4C14 14.4 10.5 14.8 7.5 14.4Z" fill="#f2c428" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
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
    id: 'sop.extractcentroid',
    label: 'Extract Centroid',
    family: 'sop',
    description:
      'White cylinder, disc and cone (outlined in teal, dark red and olive), each marked with a small grey centroid point.',
    types: ['extractcentroid'],
    refKey: 'SOP_extractcentroid',
    render: () => (
      <>
        <path d="M3 5.5C3 3 10 3 10 5.5V14C10 16.5 3 16.5 3 14Z" fill="#f2f4f7" stroke="#1d4a52" strokeWidth="1.2" />
        <path d="M3 5.5C3 8 10 8 10 5.5" fill="none" stroke="#1d4a52" strokeWidth="1" />
        <circle cx="16.5" cy="9.5" r="5.5" fill="#eef2f7" stroke="#5a1a1a" strokeWidth="1.2" />
        <path d="M12 6.5L18 18.5C16 21.5 8 21.5 6 18.5Z" fill="#ffffff" stroke="#5c4a0c" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="6.5" cy="10.5" r="1.4" fill="#7a828e" stroke="#262626" strokeWidth="0.8" />
        <circle cx="18" cy="8.6" r="1.4" fill="#7a828e" stroke="#262626" strokeWidth="0.8" />
        <circle cx="12" cy="16" r="1.4" fill="#7a828e" stroke="#262626" strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'sop.groupcreate',
    label: 'Group Create',
    family: 'sop',
    description:
      'Light disc with a thick dashed orange rim: the standard group-selection marker.',
    types: ['groupcreate'],
    matches: (q) => q.namespace === '' && q.baseType.startsWith('group_by_'),
    refKey: 'SOP_groupcreate',
    render: () => (
      <>
        <circle
          cx="12"
          cy="12"
          r="7.8"
          fill="#f2f4f7"
          stroke="#ee7b1c"
          strokeWidth="2.6"
          strokeDasharray="2.2 1.2"
        />
      </>
    ),
  },
  {
    id: 'sop.groupdelete',
    label: 'Group Delete',
    family: 'sop',
    description:
      'Dashed orange group-selection circle being swept away by a yellow broom with a brown handle.',
    types: ['groupdelete'],
    refKey: 'SOP_groupdelete',
    render: () => (
      <>
        <circle cx="9.5" cy="12" r="7" fill="#f2f4f7" stroke="#ee7b1c" strokeWidth="2.4" strokeDasharray="2.2 1.2" />
        {/* Broom handle */}
        <path d="M20.5 2.5L14.5 10.5" stroke="#262626" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M20.5 2.5L14.5 10.5" stroke="#b87a3d" strokeWidth="1.6" strokeLinecap="round" />
        {/* Bristles */}
        <polygon points="13.2,9.2 16.2,11.8 13,19.5 8,16" fill="#ebbf1a" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        <path d="M14.2 10.8L10.5 17.8M15.2 11.4L12 18.7M13.4 10L9.2 16.8" stroke="#8a6a10" strokeWidth="0.7" />
        <path d="M12.9 9.1L16.3 11.9" stroke="#8b2a1a" strokeWidth="1.6" />
      </>
    ),
  },
  {
    id: 'sop.grouppromote',
    label: 'Group Promote',
    family: 'sop',
    description:
      'Grey diamond quad with bright yellow vertex dots on all four corners.',
    types: ['grouppromote'],
    refKey: 'SOP_grouppromote',
    render: () => (
      <>
        <polygon points="12,7 20,12 12,17 4,12" fill="#9aa4b2" stroke="#262626" strokeWidth="1.3" />
        <circle cx="12" cy="7" r="2.2" fill="#ffe030" stroke="#222" strokeWidth="0.9" />
        <circle cx="20" cy="12" r="2.2" fill="#ffe030" stroke="#222" strokeWidth="0.9" />
        <circle cx="12" cy="17" r="2.2" fill="#ffe030" stroke="#222" strokeWidth="0.9" />
        <circle cx="4" cy="12" r="2.2" fill="#ffe030" stroke="#222" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.grouprange',
    label: 'Group by Range',
    family: 'sop',
    description:
      'Grey points, three of them inside a dashed orange selection ellipse, above a bold white 1-5 label with a dark outline.',
    types: ['grouprange'],
    refKey: 'SOP_grouprange',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pt`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        <ellipse cx="13.5" cy="7" rx="6.5" ry="4.8" fill="#f5c08a" fillOpacity="0.5" stroke="#ee7b1c" strokeWidth="1.6" strokeDasharray="1.8 1.2" />
        {[
          [11, 6],
          [16, 5.5],
          [13.5, 9],
          [3.5, 5],
          [3.5, 11],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.1" fill={`url(#${uid}-pt)`} stroke="#262626" strokeWidth="0.9" />
        ))}
        <text
          x="14"
          y="22"
          textAnchor="middle"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.4"
          paintOrder="stroke"
          fontSize="10"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          1-5
        </text>
      </>
    ),
  },
  {
    id: 'sop.normal',
    label: 'Normal',
    family: 'sop',
    description:
      'Orange plane with a white normal arrow (dark casing) standing up from its center.',
    types: ['normal'],
    refKey: 'SOP_normal',
    render: () => (
      <>
        <polygon points="2,16 13,11.5 22,15 11,20.5" fill="#ee8624" stroke="#262626" strokeWidth="1.3" strokeLinejoin="round" />
        <line x1="12" y1="16" x2="14.6" y2="7" stroke="#262626" strokeWidth="3.6" strokeLinecap="round" />
        <line x1="12" y1="16" x2="14.6" y2="7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <polygon points="15.6,2.6 16.8,7.1 12.2,5.8" fill="#ffffff" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.sort',
    label: 'Sort',
    family: 'sop',
    description:
      'Light metallic 12-tooth gear with a dark center hole. Also Houdini\'s generic operator icon.',
    types: ['sort'],
    icons: ['misc_generic'],
    refKey: 'SOP_sort',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-gear`} cx="38%" cy="34%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#7a828e" />
          </radialGradient>
        </defs>
        <path d={GEAR_PATH} fill={`url(#${uid}-gear)`} stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="5" fill="none" stroke="#89929e" strokeWidth="1" />
        <circle cx="12" cy="12" r="3.2" fill="#4a5260" stroke="#262626" strokeWidth="1.1" />
      </>
    ),
  },
];
