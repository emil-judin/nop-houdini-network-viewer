import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 6, Part 2 (icons 20 to 29): Vellum, Whitewater and RBD SOP icons.
 */
export const BATCH_06_PART_2: OperatorIconDef[] = [
  {
    id: 'sop.vellumunpack',
    label: 'Vellum Unpack',
    family: 'sop',
    description:
      'Grey 3D bowl unpacking pink and cyan Vellum elements along diverging blue guide lines.',
    types: ['vellumunpack'],
    icons: ['sop_vellumunpack'],
    refKey: 'SOP_vellumunpack',
    render: () => (
      <>
        <g fill="none" stroke="#262626" strokeWidth="1.8" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="7.5" />
          <path d="M9.5,11.5 C9.5,14.5 7.5,18.5 4,21.5" />
          <path d="M14.5,11.5 C14.5,14.5 16.5,18.5 20,21.5" />
        </g>
        <g fill="none" stroke="#4b9aee" strokeWidth="0.95" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="7.5" />
          <path d="M9.5,11.5 C9.5,14.5 7.5,18.5 4,21.5" />
          <path d="M14.5,11.5 C14.5,14.5 16.5,18.5 20,21.5" />
        </g>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <path
            d="M5,15.8 C5,11.5 8,7.5 12,7.5 C16,7.5 19,11.5 19,15.8 Z"
            fill="#babdb6"
          />
          <ellipse cx="12" cy="15.8" rx="7" ry="3.2" fill="#e1e4df" />
          <circle cx="10.2" cy="15.6" r="1.6" fill="#ff6eda" />
          <circle cx="13.8" cy="15.8" r="1.6" fill="#4b9aee" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.whitewaterpostprocess',
    label: 'Whitewater Post-Process',
    family: 'sop',
    description:
      'Cresting blue ocean wave topped with frothy whitewater foam and spray droplets.',
    types: ['whitewaterpostprocess', 'whitewatersource'],
    icons: ['sop_whitewaterpostprocess', 'sop_whitewatersource'],
    refKey: 'SOP_whitewaterpostprocess',
    render: () => (
      <>
        <ellipse cx="12" cy="19.5" rx="9.8" ry="2.6" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="1.05" strokeLinejoin="round">
          <path
            d="M2,16.5 C3.5,14.5 5.5,13 7,10.5 C8.5,8 10.5,6.5 12.5,6.8 C11.5,8.8 11.8,11 13.8,12.2 C16.5,13.5 19.8,14.2 22,16.5 C21,19.5 16.5,21 11.5,21 C6.5,21 3,19.2 2,16.5 Z"
            fill="#3465a4"
          />
          <path
            d="M4.5,14.5 C6,12.5 7.2,9.5 8.2,6.2 C9.5,5.5 11.5,5.8 12.5,6.8 C11.2,9 12,11.5 14.5,12.8 C17,14 19.5,14.5 21.2,16.2 C18.5,17.8 14.5,18.2 11,17.2 C8,16.2 6.2,15.8 4.5,14.5 Z"
            fill="#9edbe8"
          />
          <path
            d="M4.2,11.8 C4.5,9.5 6.2,7.5 8.2,6.2 C9.2,7.2 8.8,9 7.8,10.5 C9.2,10.8 10.2,12.2 9.5,13.5 C7.5,14.2 5,13.5 4.2,11.8 Z"
            fill="#ffffff"
          />
          <path
            d="M11.5,14.8 C13.5,13.8 16.2,14.2 18.5,15.5 C19.5,16.2 19.2,17.8 17.5,18.2 C15,18.8 12.2,18 10.8,16.5 C10.2,15.8 10.5,15.2 11.5,14.8 Z"
            fill="#ffffff"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.whitewatersolver',
    label: 'Whitewater Solver',
    family: 'sop',
    description:
      'Cresting wave with coral-pink and white foam breaking over a dark slate-blue fluid base.',
    types: ['whitewatersolver'],
    icons: ['sop_whitewatersolver'],
    refKey: 'SOP_whitewatersolver',
    render: () => (
      <>
        <ellipse cx="12" cy="19.5" rx="9.8" ry="2.6" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="1.05" strokeLinejoin="round">
          <path
            d="M2,16.5 C3.5,14.5 5.5,13 7,10.5 C8.5,8 10.5,6.5 12.5,6.8 C11.5,8.8 11.8,11 13.8,12.2 C16.5,13.5 19.8,14.2 22,16.5 C21,19.5 16.5,21 11.5,21 C6.5,21 3,19.2 2,16.5 Z"
            fill="#71746f"
          />
          <path
            d="M4.5,14.5 C6,12.5 7.2,9.5 8.2,6.2 C9.5,5.5 11.5,5.8 12.5,6.8 C11.2,9 12,11.5 14.5,12.8 C17,14 19.5,14.5 21.2,16.2 C18.5,17.8 14.5,18.2 11,17.2 C8,16.2 6.2,15.8 4.5,14.5 Z"
            fill="#f79899"
          />
          <path
            d="M4.2,11.8 C4.5,9.5 6.2,7.5 8.2,6.2 C9.2,7.2 8.8,9 7.8,10.5 C9.2,10.8 10.2,12.2 9.5,13.5 C7.5,14.2 5,13.5 4.2,11.8 Z"
            fill="#f5d9d9"
          />
          <path
            d="M11.5,14.8 C13.5,13.8 16.2,14.2 18.5,15.5 C19.5,16.2 19.2,17.8 17.5,18.2 C15,18.8 12.2,18 10.8,16.5 C10.2,15.8 10.5,15.2 11.5,14.8 Z"
            fill="#f5cdcd"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.booleanfracture',
    label: 'Boolean Fracture',
    family: 'sop',
    description:
      'Fractured 3D block split into separated light-blue and grey polygonal shards.',
    types: ['booleanfracture'],
    icons: ['sop_booleanfracture'],
    refKey: 'SOP_booleanfracture',
    render: () => (
      <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
        <polygon points="2,6.5 7.5,4.2 9.2,7.8 3.8,10.2" fill="#89d0ee" />
        <polygon points="2,6.5 3.8,10.2 3.5,15.8 1.8,12.5" fill="#134a69" />
        <polygon points="3.8,10.2 9.2,7.8 8.8,14.2 3.5,15.8" fill="#696768" />
        <polygon points="9.8,3.2 16.2,2.2 18.2,5.5 11.5,6.8" fill="#89d0ee" />
        <polygon points="11.5,6.8 18.2,5.5 17.5,11.8 11.2,12.8" fill="#babdb6" />
        <polygon points="18.8,6.8 22.2,8.5 20.5,13.5 17.8,12.2" fill="#89d0ee" />
        <polygon points="5.5,16.8 12.5,14.5 14.2,18.2 7.2,20.8" fill="#89d0ee" />
        <polygon points="7.2,20.8 14.2,18.2 13.8,21.8 6.8,22.2" fill="#12759f" />
        <polygon points="15.5,14.2 21.5,15.2 19.8,20.2 14.8,18.8" fill="#babdb6" />
      </g>
    ),
  },
  {
    id: 'sop.rbdbulletsolver',
    label: 'RBD Bullet Solver',
    family: 'sop',
    description:
      'Shattering golden-tan and grey RBD chunks flying outward above a coral-pink dust cloud.',
    types: ['rbdbulletsolver'],
    icons: ['sop_rbdbulletsolver'],
    refKey: 'SOP_rbdbulletsolver',
    render: () => (
      <>
        <path
          d="M3.5,17.2 C2.2,15.8 3.5,13.8 5.8,14 C7.5,12.2 11.2,12 13.2,13.5 C15.8,12.5 19.2,13.2 20.5,15.2 C22,16.8 21,19.5 18.5,20.2 C14.5,21.2 8.5,21.2 5,19.8 C3.2,19 2.8,18 3.5,17.2 Z"
          fill="#f79899"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="5.5,7.5 10.2,5.2 11.8,8.8 7.2,11.2" fill="#f2be70" />
          <polygon points="7.2,11.2 11.8,8.8 11.2,13.2 6.8,14.5" fill="#8b642b" />
          <polygon points="12.8,3.8 17.8,2.5 19.2,6.2 14.2,7.8" fill="#dcbf65" />
          <polygon points="14.2,7.8 19.2,6.2 18.2,10.5 13.5,11.5" fill="#b39148" />
          <polygon points="2.5,11.2 5.8,9.8 6.5,13.2 3.2,14.2" fill="#b5cced" />
          <polygon points="15.5,11.8 20.8,10.5 21.5,14.2 16.5,15.5" fill="#b1b1b1" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdcardeform',
    label: 'RBD Car Deform',
    family: 'sop',
    description:
      'Crumpled metallic-grey car door panel with an arched window frame and impact creases.',
    types: ['rbdcardeform'],
    icons: ['sop_rbdcardeform'],
    refKey: 'SOP_rbdcardeform',
    render: () => (
      <>
        <ellipse cx="12" cy="19.5" rx="9.5" ry="2.8" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="1.05" strokeLinejoin="round">
          <path
            d="M4.5,14.2 C4.2,9.5 7.2,4.5 11.5,3 C14.2,2.2 17.5,3.8 19.2,5.5 C20.5,6.8 20.8,9.5 19.8,13.5 C18.8,17.2 15.5,20.5 12.2,20.8 C9.2,21 5,18.2 4.5,14.2 Z M9.8,14.8 C12.5,13.8 14.5,10.5 14.2,7.5 C13.2,6.5 11.2,7.8 10,10 C9.2,11.5 9.2,13.2 9.8,14.8 Z"
            fill="#babdb6"
            fillRule="evenodd"
          />
          <path
            d="M4.5,14.2 C6.8,15.2 8.5,16.8 12.2,20.8 C15.5,20.5 18.8,17.2 19.8,13.5 L14.5,12.8 L9.8,14.8 Z"
            fill="#878984"
          />
        </g>
        <path
          d="M7.2,12.5 L10.5,15.5 L12.2,19.8 M14.5,12.8 L17.8,16.5"
          fill="none"
          stroke="#2e3436"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.rbdcarfollowpath',
    label: 'RBD Car Follow Path',
    family: 'sop',
    description:
      'Isometric silver-grey sports car body with dark tires and alloy wheels.',
    types: ['rbdcarfollowpath', 'rbdcarrig'],
    icons: ['sop_rbdcarfollowpath', 'sop_rbdcarrig'],
    refKey: 'SOP_rbdcarfollowpath',
    render: () => (
      <>
        <ellipse cx="12" cy="18.2" rx="9.8" ry="3.8" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <path
            d="M2.2,11.5 L6.5,7.2 L13.5,6.2 L18.2,9.2 L21.8,11.8 L21.2,15.8 L13.5,18.5 L2.8,14.5 Z"
            fill="#d3d7cf"
          />
          <polygon points="7.2,7.8 13,6.8 16.8,9.5 11.2,11.2" fill="#555753" />
          <polygon points="2.8,14.5 13.5,18.5 13.8,15.2 2.2,11.5" fill="#babdb6" />
          <polygon points="13.5,18.5 21.2,15.8 21.8,11.8 13.8,15.2" fill="#888a85" />
          <ellipse cx="5.2" cy="14.5" rx="1.8" ry="2.6" transform="rotate(-15 5.2 14.5)" fill="#2e3436" />
          <ellipse cx="5.2" cy="14.5" rx="0.9" ry="1.4" transform="rotate(-15 5.2 14.5)" fill="#eeeeec" />
          <ellipse cx="13" cy="16.8" rx="2" ry="2.8" transform="rotate(-15 13 16.8)" fill="#2e3436" />
          <ellipse cx="13" cy="16.8" rx="1" ry="1.5" transform="rotate(-15 13 16.8)" fill="#eeeeec" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdcarfracture',
    label: 'RBD Car Fracture',
    family: 'sop',
    description:
      'Isometric red and silver car breaking into fractured body panels, windshield and detached wheels.',
    types: ['rbdcarfracture'],
    icons: ['sop_rbdcarfracture'],
    refKey: 'SOP_rbdcarfracture',
    render: () => (
      <>
        <ellipse cx="12" cy="18.2" rx="9.8" ry="3.8" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="2.2,10.5 6.8,6.8 11.5,8.5 6.5,12.5" fill="#babdb6" />
          <polygon points="8.2,6.2 14.2,5.5 17.8,8.5 12.2,10.2" fill="#d3e0e0" />
          <polygon points="12.5,11.2 18.8,9.2 22,11.8 21.2,15.8 14.2,18.2" fill="#ef2929" />
          <polygon points="3.2,13.2 11.2,16.5 11.8,13.2 5.2,11.2" fill="#a40000" />
          <ellipse cx="4.2" cy="14.5" rx="1.6" ry="2.4" transform="rotate(-15 4.2 14.5)" fill="#2e3436" />
          <ellipse cx="4.2" cy="14.5" rx="0.8" ry="1.2" transform="rotate(-15 4.2 14.5)" fill="#d3d7cf" />
          <ellipse cx="12.2" cy="17.2" rx="1.8" ry="2.6" transform="rotate(-20 12.2 17.2)" fill="#2e3436" />
          <ellipse cx="12.2" cy="17.2" rx="0.9" ry="1.3" transform="rotate(-20 12.2 17.2)" fill="#d3d7cf" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdcartransform',
    label: 'RBD Car Transform',
    family: 'sop',
    description:
      'Isometric red and silver car positioned above a four-way blue-outlined white transform arrow cross.',
    types: ['rbdcartransform'],
    icons: ['sop_rbdcartransform'],
    refKey: 'SOP_rbdcartransform',
    render: () => (
      <>
        <polygon
          points="12,14.5 16.5,12.2 18,13 21.5,11.5 20.5,15.2 19,14.2 14.5,16.5 18.5,19 20.2,18 21,22 14.8,21.8 16.5,20.8 12,18.2 7.5,20.8 9.2,21.8 3,22 3.8,18 5.5,19 9.5,16.5 5,14.2 3.5,15.2 2.5,11.5 6,13 7.5,12.2"
          fill="#ffffff"
          stroke="#204a87"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <path
            d="M3,8.5 L7.2,4.5 L14,3.5 L18.5,6.5 L21.8,9 L21.2,12.8 L13.8,15.2 L3.5,11.5 Z"
            fill="#ef2929"
          />
          <polygon points="7.8,5.2 13.5,4.2 17.2,6.8 11.5,8.5" fill="#d3e0e0" />
          <polygon points="3.5,11.5 13.8,15.2 14.2,12.2 3,8.5" fill="#a40000" />
          <ellipse cx="5.8" cy="11.5" rx="1.5" ry="2.2" transform="rotate(-15 5.8 11.5)" fill="#2e3436" />
          <ellipse cx="13.2" cy="13.8" rx="1.7" ry="2.4" transform="rotate(-15 13.2 13.8)" fill="#2e3436" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdcluster',
    label: 'RBD Cluster',
    family: 'sop',
    description:
      'Fractured blue and grey RBD shards grouped into two clusters with orange and green outline halos.',
    types: ['rbdcluster'],
    icons: ['sop_rbdcluster'],
    refKey: 'SOP_rbdcluster',
    render: () => (
      <>
        <polygon
          points="1.8,5.5 10.2,4.2 11.5,10.5 9.8,18.8 2.2,15.5"
          fill="none"
          stroke="#fcaf3e"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <polygon
          points="13.5,5.2 21.8,3.8 22,16.5 13.8,19.2 12.2,12.5"
          fill="none"
          stroke="#8ae234"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <polygon points="2.2,5.8 9.8,4.6 6.5,8.2 2.2,9.5" fill="#89d0ee" />
          <polygon points="6.5,8.2 9.8,4.6 11,10.2 6.8,12.2" fill="#a2a9a2" />
          <polygon points="2.2,9.5 6.8,12.2 9.4,18.2 2.5,15.2" fill="#134a69" />
          <polygon points="13.8,5.5 21.4,4.2 18.2,8.5 13.2,10.2" fill="#89d0ee" />
          <polygon points="13.2,10.2 18.2,8.5 21.5,16.2 14.2,18.6" fill="#babdb6" />
        </g>
      </>
    ),
  },
];
