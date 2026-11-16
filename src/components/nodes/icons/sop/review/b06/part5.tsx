import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 6, Part 5 (icons 50 to 59): RBD, Voronoi and Feather SOP icons.
 */
export const BATCH_06_PART_5: OperatorIconDef[] = [
  {
    id: 'sop.rbdpaint',
    label: 'RBD Paint',
    family: 'sop',
    description:
      'Voronoi-fractured grey rock with a bright red painted fracture zone and a dark paintbrush tip.',
    types: ['rbdpaint'],
    icons: ['sop_rbdpaint'],
    refKey: 'SOP_rbdpaint',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="3,10.5 9.5,5.5 16.5,6.8 19.5,12.5 16.2,19.5 7.8,20.5 2.5,15.8" fill="#d3d7cf" />
          <polygon points="9.5,5.5 15.2,9.8 10.2,13.5 5.2,9.8" fill="#ef2929" />
          <polygon points="10.2,13.5 15.2,9.8 17.8,14.5 12.8,17.8" fill="#ef0000" />
          <polygon points="5.2,9.8 10.2,13.5 8.5,18.8 3.2,15.2" fill="#9c9c9c" />
        </g>
        <path
          d="M11.5,6.5 L13.8,11.2 M7.8,11.5 L12.5,14.8 M13.5,8.2 L16.8,12.2"
          fill="none"
          stroke="#262626"
          strokeWidth="0.65"
        />
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <polygon points="15.5,2.2 21.5,2.2 17.5,7.8 14.2,5.8" fill="#666666" />
          <polygon points="14.2,5.8 17.5,7.8 13.8,9.8" fill="#ef2929" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdxform',
    label: 'RBD Transform',
    family: 'sop',
    description:
      'Three amber-orange fractured RBD chunks with bright green transform arrows.',
    types: ['rbdxform', 'xformpieces'],
    icons: ['sop_rbdxform', 'sop_xformpieces'],
    refKey: 'SOP_rbdxform',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="2.5,6.5 8.2,4.2 10.2,8.2 4.8,10.8" fill="#fbd395" />
          <polygon points="13.8,4.2 20.2,6.2 18.5,10.8 12.8,8.8" fill="#f7af3e" />
          <polygon points="7.5,14.2 14.5,13.2 16.2,18.8 8.8,20.5 5.8,17.5" fill="#ef7916" />
        </g>
        <g fill="none" stroke="#262626" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5,7.5 L4,3 M4,3 L6.5,3.5 M4,3 L3.5,5.5" />
          <path d="M16.5,7.5 L20.5,4 M20.5,4 L18,3.8 M20.5,4 L20.2,6.5" />
          <path d="M11.5,16.8 L11.5,21.5 M11.5,21.5 L9.5,19.8 M11.5,21.5 L13.5,19.8" />
        </g>
        <g fill="none" stroke="#73d216" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5,7.5 L4,3 M4,3 L6.5,3.5 M4,3 L3.5,5.5" />
          <path d="M16.5,7.5 L20.5,4 M20.5,4 L18,3.8 M20.5,4 L20.2,6.5" />
          <path d="M11.5,16.8 L11.5,21.5 M11.5,21.5 L9.5,19.8 M11.5,21.5 L13.5,19.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdunpack',
    label: 'RBD Unpack',
    family: 'sop',
    description:
      'Single blue upper input entering a grey 3D unpack bowl and splitting into three lower streams.',
    types: ['rbdunpack'],
    icons: ['sop_rbdunpack'],
    refKey: 'SOP_rbdunpack',
    render: () => (
      <>
        <g fill="none" stroke="#262626" strokeWidth="1.8" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="7.5" />
          <path d="M9.5,11.5 C9.5,14.5 7.5,18.5 4,21.5" />
          <line x1="12" y1="11.5" x2="12" y2="22" />
          <path d="M14.5,11.5 C14.5,14.5 16.5,18.5 20,21.5" />
        </g>
        <g fill="none" stroke="#4b9aee" strokeWidth="0.95" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="7.5" />
          <path d="M9.5,11.5 C9.5,14.5 7.5,18.5 4,21.5" />
          <line x1="12" y1="11.5" x2="12" y2="22" />
          <path d="M14.5,11.5 C14.5,14.5 16.5,18.5 20,21.5" />
        </g>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <path
            d="M5,15.8 C5,11.5 8,7.5 12,7.5 C16,7.5 19,11.5 19,15.8 Z"
            fill="#babdb6"
          />
          <ellipse cx="12" cy="15.8" rx="7" ry="3.2" fill="#e1e4df" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.voronoiadjacency',
    label: 'Voronoi Adjacency',
    family: 'sop',
    description:
      'Voronoi-fractured grey polyhedron with two pink-tinted adjacent cells linked by a red line.',
    types: ['voronoiadjacency'],
    icons: ['sop_voronoiadjacency'],
    refKey: 'SOP_voronoiadjacency',
    render: () => (
      <>
        <ellipse cx="12" cy="19.5" rx="9.5" ry="2.6" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="11.5,2 3,6.5 4,16 12.5,21.5 20,15.5 21.5,6.5" fill="#d3d7cf" />
          <polygon points="11.5,2 3,6.5 12,11 21.5,6.5" fill="#eeeeec" />
          <polygon points="5.5,8.2 11.2,10.8 10.2,16.5 4.2,13.8" fill="#fbb1b1" />
          <polygon points="11.2,10.8 17.5,8.5 16.8,15.2 10.2,16.5" fill="#fbb1b1" />
        </g>
        <path
          d="M7.5,4.2 L12,7.2 L16.8,4.5 M12,7.2 L11.2,10.8 M10.2,16.5 L12.5,21.5"
          fill="none"
          stroke="#262626"
          strokeWidth="0.7"
        />
        <line x1="8" y1="12.5" x2="14.2" y2="12.5" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="8" y1="12.5" x2="14.2" y2="12.5" stroke="#ef2929" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.voronoifracture',
    label: 'Voronoi Fracture',
    family: 'sop',
    description:
      '3D polyhedron partitioned into multi-colored Voronoi cells (purple, yellow, green, red, orange and blue).',
    types: ['voronoifracture'],
    icons: ['sop_voronoifracture'],
    refKey: 'SOP_voronoifracture',
    render: () => (
      <>
        <ellipse cx="12" cy="19.5" rx="9.5" ry="2.6" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <polygon points="11.5,2 5.5,4.8 8.8,8.5 14.5,6.2" fill="#73d216" />
          <polygon points="11.5,2 14.5,6.2 21.5,6.5 17.2,3.5" fill="#f57900" />
          <polygon points="5.5,4.8 3,6.5 3.6,12.2 8.8,8.5" fill="#ad7fa8" />
          <polygon points="8.8,8.5 3.6,12.2 7.5,15.5 12.2,11.5" fill="#fce94f" />
          <polygon points="8.8,8.5 14.5,6.2 16.5,11.2 12.2,11.5" fill="#729fcf" />
          <polygon points="14.5,6.2 21.5,6.5 20.5,12.5 16.5,11.2" fill="#e9b96e" />
          <polygon points="3.6,12.2 4,16 9.2,19.2 7.5,15.5" fill="#ef2929" />
          <polygon points="7.5,15.5 9.2,19.2 12.5,21.5 14.5,16.2 12.2,11.5" fill="#3465a4" />
          <polygon points="12.2,11.5 16.5,11.2 20,15.5 12.5,21.5" fill="#8ae234" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.voronoifracturepoints',
    label: 'Voronoi Fracture Points',
    family: 'sop',
    description:
      'Voronoi-fractured light-grey 3D polyhedron with bright red seed points inside each cell.',
    types: ['voronoifracturepoints'],
    icons: ['sop_voronoifracturepoints'],
    refKey: 'SOP_voronoifracturepoints',
    render: () => (
      <>
        <ellipse cx="12" cy="19.5" rx="9.5" ry="2.6" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="11.5,2 3,6.5 12,11 21.5,6.5" fill="#ffffff" />
          <polygon points="3,6.5 4,16 12.5,21.5 12,11" fill="#dfdfda" />
          <polygon points="21.5,6.5 12,11 12.5,21.5 20,15.5" fill="#d3d7cf" />
        </g>
        <path
          d="M7.5,4.2 L12,7.2 L16.8,4.5 M6.5,8.5 L12,11 L17.5,8.5 M4,12.5 L8.8,14.8 L12.2,13.5 L16.8,15.2 L20.5,12.2 M8.8,14.8 L9.2,19.2 M16.8,15.2 L16,18.8"
          fill="none"
          stroke="#262626"
          strokeWidth="0.7"
        />
        <g fill="#ef2929" stroke="#262626" strokeWidth="0.5">
          <circle cx="11.8" cy="4.8" r="1.1" />
          <circle cx="7.8" cy="7.2" r="1.1" />
          <circle cx="16.2" cy="7.2" r="1.1" />
          <circle cx="7.2" cy="11.8" r="1.1" />
          <circle cx="15.2" cy="12" r="1.1" />
          <circle cx="10.2" cy="16.8" r="1.1" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.voronoisplit',
    label: 'Voronoi Split',
    family: 'sop',
    description:
      'Light-grey 3D polyhedron subdivided into crisp Voronoi fracture cells.',
    types: ['voronoisplit'],
    icons: ['sop_voronoisplit', 'sop_voronoisplit-2.0'],
    refKey: 'SOP_voronoisplit',
    render: () => (
      <>
        <ellipse cx="12" cy="19.5" rx="9.5" ry="2.6" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="11.5,2 3,6.5 12,11 21.5,6.5" fill="#eeeeec" />
          <polygon points="3,6.5 4,16 12.5,21.5 12,11" fill="#d3d7cf" />
          <polygon points="21.5,6.5 12,11 12.5,21.5 20,15.5" fill="#babdb6" />
        </g>
        <path
          d="M7.5,4.2 L12,7.2 L16.8,4.5 M6.5,8.5 L12,11 L17.5,8.5 M3.6,12.2 L8.8,14.8 L12.2,13.5 L16.8,15.2 L20.5,12.2 M8.8,14.8 L9.2,19.2 M16.8,15.2 L16,18.8"
          fill="none"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.featherbarbtangents',
    label: 'Feather Barb Tangents',
    family: 'sop',
    description:
      'Violet feather with bright green barb tangent curves branching from the central shaft.',
    types: ['featherbarbtangents'],
    icons: ['sop_featherbarbtangents'],
    refKey: 'SOP_featherbarbtangents',
    render: () => (
      <>
        <ellipse cx="12" cy="19.8" rx="9" ry="2.4" fill="#262626" opacity="0.28" />
        <path
          d="M7.5,18.2 C7,14.5 9.5,8.5 16.5,2.5 C19.5,3.5 19.8,8.5 17.5,13.2 C15.2,17.2 11.2,19.2 7.5,18.2 Z"
          fill="#d681d5"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#262626" strokeWidth="2" strokeLinecap="round">
          <path d="M11.5,11.8 C10.5,9.5 10,7.5 10.2,6.2" />
          <path d="M10.2,14 C9.2,11.8 8.8,9.8 9,8.5" />
          <path d="M11.8,11.8 C14.2,11.5 16,10.8 17.2,9.8" />
          <path d="M10.5,14 C13,13.8 14.8,13.2 16,12.2" />
        </g>
        <g fill="none" stroke="#8ae234" strokeWidth="1.05" strokeLinecap="round">
          <path d="M11.5,11.8 C10.5,9.5 10,7.5 10.2,6.2" />
          <path d="M10.2,14 C9.2,11.8 8.8,9.8 9,8.5" />
          <path d="M11.8,11.8 C14.2,11.5 16,10.8 17.2,9.8" />
          <path d="M10.5,14 C13,13.8 14.8,13.2 16,12.2" />
        </g>
        <path
          d="M5.5,21 C7.8,16.2 11.8,9.8 16.5,2.5"
          fill="none"
          stroke="#262626"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.featherclump',
    label: 'Feather Clump',
    family: 'sop',
    description:
      'Violet feather with barbs separated into clumped V-notched tufts along the vane.',
    types: ['featherclump'],
    icons: ['sop_featherclump'],
    refKey: 'SOP_featherclump',
    render: () => (
      <>
        <ellipse cx="12" cy="19.8" rx="9" ry="2.4" fill="#262626" opacity="0.28" />
        <path
          d="M7.5,18.2 C7.2,15.5 8.2,12.8 9.8,10.5 L11.2,12.2 L10.8,8.5 C12.5,6.2 14.5,4 16.5,2.5 C18.5,3.5 19,6.2 18.2,8.8 L15.8,10.2 L17.8,10.5 C17.2,12.5 16.2,14.2 14.8,15.5 L12.8,15.2 L14.2,16.8 C12,18.5 9.5,19 7.5,18.2 Z"
          fill="#d681d5"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M5.5,21 C7.8,16.2 11.8,9.8 16.5,2.5"
          fill="none"
          stroke="#262626"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="14.5" cy="7.5" r="1" fill="#8ae234" stroke="#262626" strokeWidth="0.6" />
        <circle cx="12.5" cy="12.5" r="1" fill="#8ae234" stroke="#262626" strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'sop.featherdeform',
    label: 'Feather Deform',
    family: 'sop',
    description:
      'Ghosted upright violet feather bending to the right into a deformed feather with a green arrow.',
    types: ['featherdeform'],
    icons: ['sop_featherdeform'],
    refKey: 'SOP_featherdeform',
    render: () => (
      <>
        <ellipse cx="12" cy="19.8" rx="9" ry="2.4" fill="#262626" opacity="0.28" />
        <path
          d="M5.5,18 C4.5,13.5 6.8,7.2 13.5,2.5 C15.8,3.5 15.8,8.5 13.5,13.2 C11.2,17 8.2,18.8 5.5,18 Z"
          fill="#d681d5"
          fillOpacity="0.45"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M8.5,19.2 C9.5,14.5 13.5,9.5 21,6.5 C22.2,8.5 20.5,13.5 17.2,16.8 C14,19.8 10.5,20.2 8.5,19.2 Z"
          fill="#d681d5"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M7,21 C9.8,16 14.5,10.5 21,6.5"
          fill="none"
          stroke="#262626"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M11.5,5.5 C14.5,5.2 17,6.2 18.5,8.2 M18.5,8.2 L16.2,8 M18.5,8.2 L18.5,5.8"
          fill="none"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5,5.5 C14.5,5.2 17,6.2 18.5,8.2 M18.5,8.2 L16.2,8 M18.5,8.2 L18.5,5.8"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.05"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
