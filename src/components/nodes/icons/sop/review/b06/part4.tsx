import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 6, Part 4 (icons 40 to 49): RBD SOP icons.
 */
export const BATCH_06_PART_4: OperatorIconDef[] = [
  {
    id: 'sop.rbddisconnectedfaces',
    label: 'RBD Disconnected Faces',
    family: 'sop',
    description:
      'Two separated amber-orange RBD chunks with white fracture faces and a red disconnected badge.',
    types: ['rbddisconnectedfaces'],
    icons: ['sop_rbddisconnectedfaces'],
    refKey: 'SOP_rbddisconnectedfaces',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon points="2,3.5 8,2 10.5,5.5 7.5,9.5 2,8.5" fill="#fbd395" />
          <polygon points="7.5,9.5 10.5,5.5 11.8,7.5 8.8,11.2 3.2,10.2 2,8.5" fill="#ffffff" />
          <polygon points="13.5,13.5 20.5,12.2 22,16.8 18.5,21.2 12.5,19.8" fill="#f7af3e" />
          <polygon points="12.5,19.8 13.5,13.5 11.8,15.5 11.2,21.2 17,22.2 18.5,21.2" fill="#ef7916" />
        </g>
        <circle cx="8.2" cy="14.2" r="2.6" fill="#ef2929" stroke="#262626" strokeWidth="1" />
        <line x1="7" y1="14.2" x2="9.4" y2="14.2" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.rbdexplodedview',
    label: 'RBD Exploded View',
    family: 'sop',
    description:
      'Fractured multi-colored RBD shards pushed outward along bright green explosion vectors.',
    types: ['rbdexplodedview'],
    icons: ['sop_rbdexplodedview'],
    refKey: 'SOP_rbdexplodedview',
    render: () => (
      <>
        <circle cx="12" cy="12" r="5.5" fill="#fff742" opacity="0.35" />
        <g stroke="#262626" strokeWidth="2" strokeLinecap="round">
          <line x1="9.5" y1="9.5" x2="5.5" y2="5.5" />
          <line x1="14.5" y1="9.5" x2="18.5" y2="5.5" />
          <line x1="9.5" y1="14.5" x2="5.5" y2="18.5" />
          <line x1="14.5" y1="14.5" x2="18.5" y2="18.5" />
        </g>
        <g stroke="#61c800" strokeWidth="1" strokeLinecap="round">
          <line x1="9.5" y1="9.5" x2="5.5" y2="5.5" />
          <line x1="14.5" y1="9.5" x2="18.5" y2="5.5" />
          <line x1="9.5" y1="14.5" x2="5.5" y2="18.5" />
          <line x1="14.5" y1="14.5" x2="18.5" y2="18.5" />
        </g>
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="2,4.5 6.8,2.5 8.5,6.2 3.5,8.2" fill="#eeeeec" />
          <polygon points="15.5,2.5 21.2,4.2 19.5,8.2 14.8,6.5" fill="#729fcf" />
          <polygon points="2.2,14.8 7.5,13.5 8.8,18.2 3.5,19.8" fill="#ad7fa8" />
          <polygon points="15.2,13.8 21.2,15.2 19.8,20.2 14.2,18.5" fill="#ef2929" />
          <polygon points="9.2,9.8 14.5,9.2 15,13.8 9.8,14.5" fill="#d3d7cf" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdfindinstances',
    label: 'RBD Find Instances',
    family: 'sop',
    description:
      'Blue circular search arrows and magnifying glass handle around orange and grey RBD instance blocks.',
    types: ['rbdfindinstances'],
    icons: ['sop_rbdfindinstances'],
    refKey: 'SOP_rbdfindinstances',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <path
            d="M18.2,14.8 L22,18.6 L19.8,20.8 L16,17 Z"
            fill="#3465a4"
          />
          <circle
            cx="11"
            cy="11"
            r="7.8"
            fill="none"
            stroke="#262626"
            strokeWidth="2.4"
          />
          <circle
            cx="11"
            cy="11"
            r="7.8"
            fill="none"
            stroke="#729fcf"
            strokeWidth="1.3"
          />
          <polygon points="6.2,9.2 10.2,7.2 10.2,12.2 6.2,14.2" fill="#fcaf3e" />
          <polygon points="10.2,7.2 13.8,9 13.8,14 10.2,12.2" fill="#ce5c00" />
          <polygon points="11.2,10.2 15.2,8.2 15.2,13.2 11.2,15.2" fill="#eeeeec" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdgroupconstraints',
    label: 'RBD Group Constraints',
    family: 'sop',
    description:
      'Three amber-orange fractured RBD chunks with a selected group of bright red constraint struts.',
    types: ['rbdgroupconstraints'],
    icons: ['sop_rbdgroupconstraints'],
    refKey: 'SOP_rbdgroupconstraints',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="3,5.2 8.5,3.2 10.5,7.2 5.2,9.5" fill="#fbd395" />
          <polygon points="14,3.5 20.2,5.2 18.8,9.8 13.2,8.2" fill="#f7af3e" />
          <polygon points="7.5,14.5 14.5,13.5 16.2,18.8 8.8,20.5 5.8,17.5" fill="#ef7916" />
        </g>
        <g stroke="#262626" strokeWidth="2.2" strokeLinecap="round">
          <line x1="7.5" y1="8.2" x2="10.2" y2="14.5" />
          <line x1="15.5" y1="8.5" x2="13.2" y2="14.5" />
          <line x1="9.5" y1="6.2" x2="14.2" y2="6.5" />
        </g>
        <g stroke="#ef2929" strokeWidth="1.2" strokeLinecap="round">
          <line x1="7.5" y1="8.2" x2="10.2" y2="14.5" />
          <line x1="15.5" y1="8.5" x2="13.2" y2="14.5" />
        </g>
        <line x1="9.5" y1="6.2" x2="14.2" y2="6.5" stroke="#babdb6" strokeWidth="1" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.rbdguidesetup',
    label: 'RBD Guide Setup',
    family: 'sop',
    description:
      'Tall fractured grey-blue pillar with a jagged vertical crack and red guide arrows.',
    types: ['rbdguidesetup'],
    icons: ['sop_rbdguidesetup'],
    refKey: 'SOP_rbdguidesetup',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon points="4.5,4.2 12,2.2 19.5,4.2 12,6.8" fill="#eef2f7" />
          <polygon
            points="4.5,4.2 12,6.8 13.5,13.2 15.5,21.8 6,20.2 4.5,12.5"
            fill="#acb6be"
          />
          <polygon
            points="19.5,4.2 12,6.8 13.5,13.2 15.5,21.8 18.8,19.2 19.5,11.5"
            fill="#8794a0"
          />
        </g>
        <polyline
          points="12,6.8 11.2,10.5 13.5,13.2 12.8,17.2 15.5,21.8"
          fill="none"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <g fill="#ef2929" stroke="#262626" strokeWidth="0.75" strokeLinejoin="round">
          <polygon points="2,10.5 5.8,10.5 5.8,8.8 8.5,11.5 5.8,14.2 5.8,12.5 2,12.5" />
          <polygon points="22,13.5 18.2,13.5 18.2,11.8 15.5,14.5 18.2,17.2 18.2,15.5 22,15.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdio',
    label: 'RBD I/O',
    family: 'sop',
    description:
      'Fractured blue polyhedral RBD sphere above a grey storage drive bay with a green status LED.',
    types: ['rbdio'],
    icons: ['sop_rbdio'],
    refKey: 'SOP_rbdio',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon points="6.5,14.5 17.5,14.5 20.5,18.5 3.5,18.5" fill="#d3d7cf" />
          <rect x="3.5" y="18.5" width="17" height="3.2" rx="0.6" fill="#888a85" />
          <rect x="5.5" y="19.5" width="4.5" height="1.2" fill="#8ae234" strokeWidth="0.6" />
        </g>
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="8.5,3.2 13.8,2.2 16.5,5.2 12,8.2 6.8,6.5" fill="#d0dfef" />
          <polygon points="6.8,6.5 12,8.2 11.5,13.5 6.2,11.8 5.2,8.5" fill="#729fcf" />
          <polygon points="12,8.2 16.5,5.2 18.2,9.2 15.8,13.2 11.5,13.5" fill="#3465a4" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdinteriordetail',
    label: 'RBD Interior Detail',
    family: 'sop',
    description:
      'Two vertically split halves of a blue-grey 3D block showing jagged craggy interior fracture detail.',
    types: ['rbdinteriordetail'],
    icons: ['sop_rbdinteriordetail'],
    refKey: 'SOP_rbdinteriordetail',
    render: () => (
      <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
        <polygon points="3,4.2 11.5,1.8 19.5,4 11.5,6.5" fill="#e1e7ef" />
        <polygon
          points="3,4.2 11.5,6.5 11.5,11.5 9.2,10.5 7.2,11.2 5,9.8 3,10.2"
          fill="#b3bdcc"
        />
        <polygon
          points="19.5,4 11.5,6.5 11.5,11.5 13.8,10.2 16,10.8 17.8,9.2 19.5,9.5"
          fill="#717f8f"
        />
        <polygon
          points="4.2,14.5 6.5,13.5 8.8,14.8 12,13.2 15.2,14.5 18.2,13.2 20.8,14.2 12.5,17.8"
          fill="#c7cdd8"
        />
        <polygon points="4.2,14.5 12.5,17.8 12.5,22 4.2,19.2" fill="#b3bdcc" />
        <polygon points="20.8,14.2 12.5,17.8 12.5,22 20.8,18.8" fill="#717f8f" />
      </g>
    ),
  },
  {
    id: 'sop.rbdmatchtransforms',
    label: 'RBD Match Transforms',
    family: 'sop',
    description:
      'Segmented RBD column enclosed within a tilted white-and-blue transform bounding frame.',
    types: ['rbdmatchtransforms'],
    icons: ['sop_rbdmatchtransforms'],
    refKey: 'SOP_rbdmatchtransforms',
    render: () => (
      <>
        <polygon
          points="11.5,2 20.8,7.2 12.5,21.8 3.2,16.5"
          fill="none"
          stroke="#262626"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <polygon
          points="11.5,2 20.8,7.2 12.5,21.8 3.2,16.5"
          fill="none"
          stroke="#eeeeec"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="10.8,5.2 15.8,8 13.8,11.5 8.8,8.8" fill="#f24d4d" />
          <polygon points="8.8,8.8 13.8,11.5 11.8,15 6.8,12.2" fill="#468dd5" />
          <polygon points="6.8,12.2 11.8,15 9.8,18.5 4.8,15.8" fill="#fcaf3e" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdmaterialfracture',
    label: 'RBD Material Fracture',
    family: 'sop',
    description:
      'Ice-blue vertical slab with radiating impact cracks and a shattered notch at the bottom.',
    types: ['rbdmaterialfracture'],
    icons: ['sop_rbdmaterialfracture'],
    refKey: 'SOP_rbdmaterialfracture',
    render: () => (
      <>
        <polygon
          points="3.8,3.2 19.8,1.8 20.2,17.8 12.5,20.8 12.2,17.2 9.5,16.8 8.2,21.2 4.8,22.2"
          fill="#a6cdf7"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <polygon
          points="13.2,5.5 16.5,4.8 17.2,8.2 14.5,9.5 12.5,7.8"
          fill="#3465a4"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#204a87" strokeWidth="0.7" strokeLinecap="round">
          <path d="M12.5,7.8 L6.2,6.5 M12.5,7.8 L7.5,12.5 M14.5,9.5 L11.2,16.8" />
          <path d="M16.5,4.8 L19.5,3.2 M17.2,8.2 L20,11.5 M14.5,9.5 L18.5,15.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdpack',
    label: 'RBD Pack',
    family: 'sop',
    description:
      'Three blue upper input streams converging into a grey 3D pack funnel with a single output.',
    types: ['rbdpack'],
    icons: ['sop_rbdpack'],
    refKey: 'SOP_rbdpack',
    render: () => (
      <>
        <g fill="none" stroke="#262626" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4,2.5 C7.5,5.5 9.5,9.5 9.5,12.5" />
          <line x1="12" y1="2" x2="12" y2="12.5" />
          <path d="M20,2.5 C16.5,5.5 14.5,9.5 14.5,12.5" />
          <line x1="12" y1="16.5" x2="12" y2="22" />
        </g>
        <g fill="none" stroke="#4b9aee" strokeWidth="0.95" strokeLinecap="round">
          <path d="M4,2.5 C7.5,5.5 9.5,9.5 9.5,12.5" />
          <line x1="12" y1="2" x2="12" y2="12.5" />
          <path d="M20,2.5 C16.5,5.5 14.5,9.5 14.5,12.5" />
          <line x1="12" y1="16.5" x2="12" y2="22" />
        </g>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <path
            d="M5,8.2 C5,12.5 8,16.5 12,16.5 C16,16.5 19,12.5 19,8.2 Z"
            fill="#babdb6"
          />
          <ellipse cx="12" cy="8.2" rx="7" ry="3.2" fill="#e1e4df" />
        </g>
      </>
    ),
  },
];
