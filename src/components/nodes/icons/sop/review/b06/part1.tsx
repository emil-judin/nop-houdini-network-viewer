import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 6, Part 1 (icons 10 to 19): Vellum SOP icons.
 */
export const BATCH_06_PART_1: OperatorIconDef[] = [
  {
    id: 'sop.vellumconstraintproperty',
    label: 'Vellum Constraint Properties',
    family: 'sop',
    description:
      'Pleated cyan-teal Vellum cloth ribbon with alternating light and shadowed folds.',
    types: ['vellumconstraintproperty'],
    icons: ['sop_vellumconstraintproperty'],
    refKey: 'SOP_vellumconstraintproperty',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <path
            d="M2,7.2 L7.2,5.2 L10.2,8.2 L5.8,11.2 Z"
            fill="#bde8ea"
          />
          <path
            d="M5.8,11.2 L10.2,8.2 L13.8,7.2 L8.8,16.5 C6.8,16.5 5.2,14.2 5.8,11.2 Z"
            fill="#359fa3"
          />
          <path
            d="M8.8,16.5 L13.8,7.2 L17.8,5.8 L15.2,15.2 L9.8,17.2 Z"
            fill="#93dadc"
          />
          <path
            d="M15.2,15.2 L17.8,5.8 C20.2,5.5 21.8,6.8 21.8,9 C21.8,13 17.5,17.8 18.2,20.8 L12.5,19.2 C12.2,17.2 13.8,16 15.2,15.2 Z"
            fill="#5ec7cb"
          />
        </g>
        <path
          d="M7.2,8.8 L11.5,12.8 M11.5,9.5 L16.2,13.5 M15.5,8.2 L19.8,11.8"
          fill="none"
          stroke="#195566"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.vellumconstraints',
    label: 'Vellum Constraints',
    family: 'sop',
    description:
      'Warm orange draped Vellum cloth and a cyan wireframe cylinder joined by a metallic pin.',
    types: ['vellumconstraints'],
    icons: ['sop_vellumconstraints'],
    refKey: 'SOP_vellumconstraints',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-orange`} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#fcdfa8" />
            <stop offset="50%" stopColor="#faaf3e" />
            <stop offset="100%" stopColor="#ce5c0b" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="#262626" strokeWidth="1.6" strokeLinejoin="round">
          <ellipse cx="15.8" cy="8.5" rx="2.5" ry="5.2" transform="rotate(-40 15.8 8.5)" />
          <path d="M12.2,5.2 L8.2,9.2 M19.4,11.8 L15.2,16" />
        </g>
        <g fill="none" stroke="#15eaf2" strokeWidth="0.85" strokeLinejoin="round">
          <ellipse cx="15.8" cy="8.5" rx="2.5" ry="5.2" transform="rotate(-40 15.8 8.5)" />
          <path d="M12.2,5.2 L8.2,9.2 M19.4,11.8 L15.2,16" />
        </g>
        <path
          d="M4.2,10.5 C6.2,8.8 10.2,10 13,13.2 C15.8,16.5 16.5,19.8 14.5,21.2 C12.5,22.5 8.5,21.2 5.8,18 C3,14.8 2.2,12.2 4.2,10.5 Z"
          fill={`url(#${uid}-orange)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <polygon
          points="2.2,21.8 4.2,19.2 8.5,15.5 9.5,16.5 5.2,20.5"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.vellumdrape',
    label: 'Vellum Drape',
    family: 'sop',
    description:
      'Soft cyan-teal cloth sheet draped over an unseen surface with folded bottom hems.',
    types: ['vellumdrape'],
    icons: ['sop_vellumdrape'],
    refKey: 'SOP_vellumdrape',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-drape`} x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#bee9e9" />
            <stop offset="55%" stopColor="#51c4c5" />
            <stop offset="100%" stopColor="#2f8c8e" />
          </linearGradient>
        </defs>
        <ellipse cx="12" cy="20.5" rx="9.5" ry="1.8" fill="#262626" opacity="0.3" />
        <path
          d="M6.2,9.5 L17.8,9.5 L21.2,13.2 L18.5,18.2 C15.5,20.2 12.5,20.5 10.2,19.8 C9.2,19.5 9.8,17.2 8.5,17.2 C6.2,17.5 4.2,19.5 2.2,18.5 C1.5,16.5 2,14.5 2.8,13.5 Z"
          fill={`url(#${uid}-drape)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <polygon
          points="6.2,9.5 17.8,9.5 20.2,12.2 4.2,12.2"
          fill="#bee9e9"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M9.5,12.2 L9.2,18.5 M14.8,12.2 L15.5,18.8"
          fill="none"
          stroke="#1a4f50"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.vellumio',
    label: 'Vellum I/O',
    family: 'sop',
    description:
      'Teal-cyan file folder holding a warm orange draped Vellum cloth sheet.',
    types: ['vellumio'],
    icons: ['sop_vellumio'],
    refKey: 'SOP_vellumio',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-cloth`} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#fef2df" />
            <stop offset="45%" stopColor="#faaf3e" />
            <stop offset="100%" stopColor="#ce5c0b" />
          </linearGradient>
        </defs>
        <path
          d="M2.2,6.8 L3.2,4.5 L8.8,3.5 L10.2,5 L17.2,3.5 L18.5,17.5 L3.2,21.2 Z"
          fill="#2ca8ac"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M5.5,8.5 C8.5,6.2 13.5,6.8 18.2,5.5 C19.5,9.5 21.5,12.5 21.8,16.5 C17.5,18.5 13.5,17.5 9.2,19.5 C7.5,15.5 6.2,12 5.5,8.5 Z"
          fill={`url(#${uid}-cloth)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M3.2,21.2 L5.2,11.2 L20.2,7.8 L18.5,17.5 Z"
          fill="#0bc7ce"
          fillOpacity="0.82"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.vellumpack',
    label: 'Vellum Pack',
    family: 'sop',
    description:
      'Grey 3D bowl with blue convergence lines packing pink and cyan Vellum elements into a bundle.',
    types: ['vellumpack'],
    icons: ['sop_vellumpack'],
    refKey: 'SOP_vellumpack',
    render: () => (
      <>
        <g fill="none" stroke="#262626" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4,2.5 C7.5,5.5 9.5,9.5 9.5,12.5" />
          <path d="M20,2.5 C16.5,5.5 14.5,9.5 14.5,12.5" />
          <line x1="12" y1="16.5" x2="12" y2="22" />
        </g>
        <g fill="none" stroke="#4b9aee" strokeWidth="0.95" strokeLinecap="round">
          <path d="M4,2.5 C7.5,5.5 9.5,9.5 9.5,12.5" />
          <path d="M20,2.5 C16.5,5.5 14.5,9.5 14.5,12.5" />
          <line x1="12" y1="16.5" x2="12" y2="22" />
        </g>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <path
            d="M5,8.2 C5,12.5 8,16.5 12,16.5 C16,16.5 19,12.5 19,8.2 Z"
            fill="#babdb6"
          />
          <ellipse cx="12" cy="8.2" rx="7" ry="3.2" fill="#e1e4df" />
          <circle cx="10.2" cy="8" r="1.6" fill="#ff6eda" />
          <circle cx="13.8" cy="8.2" r="1.6" fill="#4b9aee" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.vellumpostprocess',
    label: 'Vellum Post-Process',
    family: 'sop',
    description:
      'Jagged cyan Vellum mesh transitioning into a smooth subdivided surface with two teal corner arrows.',
    types: ['vellumpostprocess'],
    icons: ['sop_vellumpostprocess'],
    refKey: 'SOP_vellumpostprocess',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <path
            d="M3.5,15.5 L5.5,12.2 L9.2,12.8 L11.2,9.2 L15,9.8 L16.8,6.5 L20.5,11.5 C18.5,16.5 13.5,19.8 7.5,20.5 Z"
            fill="#0bc7ce"
          />
          <path
            d="M3.5,15.5 L5.5,12.2 L9.2,12.8 L11.2,9.2 L15,9.8 L16.8,6.5 L12.5,3.5 L2.5,11.5 Z"
            fill="#74f1f5"
          />
        </g>
        <path
          d="M7.5,16.2 C11.5,15.5 15.2,13.5 17.8,10.2 M9.8,18.5 C13.5,17.8 16.8,15.8 19.2,12.8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <polygon
          points="1.8,18.2 4.5,19.5 4,21.5 6.8,19.2 4.8,16.2"
          fill="#07595c"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="22.2,9.5 19.5,8.2 20,6.2 17.2,8.5 19.2,11.5"
          fill="#07595c"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.vellumrefframe',
    label: 'Vellum Reference Frame',
    family: 'sop',
    description:
      'Tilted blue wireframe reference box enclosing a golden-amber Vellum cloth with cyan corner pivot rings.',
    types: ['vellumrefframe'],
    icons: ['sop_vellumrefframe'],
    refKey: 'SOP_vellumrefframe',
    render: () => (
      <>
        <polygon
          points="11.5,3.5 20.8,9.8 13.2,20.5 3.5,14.2"
          fill="none"
          stroke="#262626"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points="11.5,3.5 20.8,9.8 13.2,20.5 3.5,14.2"
          fill="none"
          stroke="#3672c4"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M7.5,12.2 C8.5,9.2 11.8,8.2 14.5,9.5 C16.2,10.5 16.5,13.5 14.8,15.5 C13.2,17.5 9.8,17.2 8.2,15.5 C6.8,14 6.8,13.5 7.5,12.2 Z"
          fill="#e6a845"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M9.2,11.5 C11.2,11 13,12 14.2,13.8"
          fill="none"
          stroke="#804e0e"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <g fill="#afe8ea" stroke="#262626" strokeWidth="0.9">
          <circle cx="11.5" cy="4.2" r="1.8" />
          <circle cx="16.8" cy="18.2" r="1.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.vellumrestblend',
    label: 'Vellum Rest Blend',
    family: 'sop',
    description:
      'Three layered cyan-teal Vellum curtains blending from a flat sheet on the left to a curved wave on the right.',
    types: ['vellumrestblend'],
    icons: ['sop_vellumrestblend'],
    refKey: 'SOP_vellumrestblend',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon
            points="2,5.5 13.5,2 13.5,13.5 2,17.2"
            fill="#74f1f5"
          />
          <path
            d="M5.5,8.2 C8.5,5.5 12.8,3.8 17.5,4.2 L17.5,16.2 C12.2,14.8 8.2,18.2 5.5,20.2 Z"
            fill="#0ebfc5"
          />
          <path
            d="M9.2,12.5 C9.2,10.5 12.2,8.5 16,7.5 C19.5,6.5 22,7.2 22,9.2 L22,18.8 C22,17.2 19.5,16.5 16,17.5 C12.2,18.5 9.2,20.2 9.2,21.5 Z"
            fill="#a1f6f8"
          />
        </g>
        <path
          d="M12.5,10.5 L12.5,18.5 M16.8,9 L16.8,17.2"
          fill="none"
          stroke="#054547"
          strokeWidth="0.65"
        />
      </>
    ),
  },
  {
    id: 'sop.vellumsolver',
    label: 'Vellum Solver',
    family: 'sop',
    description:
      'Soft coral-pink Vellum cloth draped over a 3D blue-grey geometric pedestal.',
    types: ['vellumsolver'],
    icons: ['sop_vellumsolver'],
    refKey: 'SOP_vellumsolver',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-pink`} x1="20%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#f5d9d9" />
            <stop offset="50%" stopColor="#f39596" />
            <stop offset="100%" stopColor="#bf7777" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="8,18.2 16,18.2 15.2,14.5 8.8,14.5" fill="#737b87" />
          <polygon points="5.5,6.5 12,3.5 18.5,6.5 12,9.5" fill="#8fb1cc" />
          <polygon points="5.5,6.5 12,9.5 12,13.5 5.5,10.5" fill="#738687" />
          <polygon points="18.5,6.5 12,9.5 12,13.5 18.5,10.5" fill="#5a616b" />
        </g>
        <path
          d="M8.8,15.5 C8.2,14.2 10.5,11.5 13.5,11 C16.8,10.5 20.5,11.5 22,13.8 C22.5,15.8 20.8,18.5 18.2,19.5 C15.2,20.5 11.5,20.2 9.2,18.8 C7.8,18 8.2,16.5 8.8,15.5 Z"
          fill={`url(#${uid}-pink)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M11.5,14.2 C13.8,15.2 16.5,15.2 19,14.2 M12.2,17.2 C14.5,18 17,17.8 19.5,16.8"
          fill="none"
          stroke="#bf7777"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.vellumxformpieces',
    label: 'Vellum Transform Pieces',
    family: 'sop',
    description:
      'Dark circular badge with lilac Vellum pieces being guided along a curved light-blue transform arrow.',
    types: ['vellumxformpieces'],
    icons: ['sop_vellumxformpieces'],
    refKey: 'SOP_vellumxformpieces',
    render: () => (
      <>
        <circle
          cx="12"
          cy="12"
          r="9.8"
          fill="#2e3436"
          stroke="#262626"
          strokeWidth="1.1"
        />
        <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <path
            d="M4.5,7.5 C5.5,5.2 8.2,4.5 9.2,6.2 C9.8,7.8 8.2,9.8 6.2,9.5 C4.8,9.2 4,8.5 4.5,7.5 Z"
            fill="#ad7fa8"
          />
          <path
            d="M12.5,13.5 C14.2,11.5 17.5,11.8 18.8,14 C19.8,16 17.8,18.8 15.2,18.5 C12.8,18.2 11.2,15.2 12.5,13.5 Z"
            fill="#dfcddd"
          />
        </g>
        <path
          d="M7.5,11.2 C8.5,14.5 10.5,16.2 13.8,16.5"
          fill="none"
          stroke="#8bcaed"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <polygon
          points="13.2,14.5 16.5,16.8 13,18.5"
          fill="#8bcaed"
          stroke="#262626"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
