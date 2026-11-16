import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 4, Part 1 (icons 10 to 19): built-in Houdini SOP icons under review.
 */
export const BATCH_04_PART_1: OperatorIconDef[] = [
  {
    id: 'sop.groupbylasso',
    label: 'Group by Lasso',
    family: 'sop',
    description:
      'Isometric grey polygon mesh diamond with a yellow-orange selected patch encircled by a red lasso rope loop.',
    types: ['groupbylasso'],
    icons: ['sop_groupbylasso'],
    refKey: 'SOP_groupbylasso',
    render: () => (
      <>
        {/* Isometric mesh diamond */}
        <polygon
          points="2,11.8 11.2,5.5 20.2,11.2 10.8,18.2"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <g stroke="#5a616b" strokeWidth="0.55">
          <line x1="5" y1="9.7" x2="14" y2="15.8" />
          <line x1="8" y1="7.6" x2="17" y2="13.5" />
          <line x1="5" y1="13.9" x2="14.2" y2="7.4" />
          <line x1="8" y1="16" x2="17.2" y2="9.3" />
        </g>
        {/* Selected yellow-orange center patch */}
        <polygon
          points="7.8,11.8 11.2,9.5 14.4,11.5 11,14"
          fill="#f2c438"
          stroke="#c25e12"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Red lasso loop and tail */}
        <ellipse
          cx="12.2"
          cy="11.5"
          rx="5.8"
          ry="3.6"
          transform="rotate(-18 12.2 11.5)"
          fill="none"
          stroke="#262626"
          strokeWidth="1.9"
        />
        <ellipse
          cx="12.2"
          cy="11.5"
          rx="5.8"
          ry="3.6"
          transform="rotate(-18 12.2 11.5)"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.1"
        />
        <path d="M17.5,9.5 C19.5,9.2 21,10.5 22,12.2" fill="none" stroke="#262626" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17.5,9.5 C19.5,9.2 21,10.5 22,12.2" fill="none" stroke="#e03228" strokeWidth="1" strokeLinecap="round" />
        <circle cx="17.4" cy="9.6" r="1.1" fill="#eef2f7" stroke="#262626" strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.groupcombine',
    label: 'Group Combine',
    family: 'sop',
    description:
      'Peanut-shaped merged yellow-orange group region with a dashed border, grey point spheres in both lobes, and a dark plus sign at the waist.',
    types: ['groupcombine'],
    icons: ['sop_groupcombine'],
    refKey: 'SOP_groupcombine',
    render: () => (
      <>
        <path
          d="M11.5,3 C8.5,1.5 4.2,2.5 2.8,5.8 C1.4,9.2 3,12.5 6.2,13.5 C8.5,14.2 9.5,15.5 10.2,17.8 C11,20.8 14.5,22.2 17.8,21.2 C21,20.2 22.4,16.5 21,13.2 C19.8,10.5 17.2,10.2 15.2,9 C13.5,7.8 13.8,4.2 11.5,3 Z"
          fill="#ffe47a"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M11.5,3 C8.5,1.5 4.2,2.5 2.8,5.8 C1.4,9.2 3,12.5 6.2,13.5 C8.5,14.2 9.5,15.5 10.2,17.8 C11,20.8 14.5,22.2 17.8,21.2 C21,20.2 22.4,16.5 21,13.2 C19.8,10.5 17.2,10.2 15.2,9 C13.5,7.8 13.8,4.2 11.5,3 Z"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1"
          strokeDasharray="1.6 1.2"
          strokeLinejoin="round"
        />
        <g fill="#89929e" stroke="#262626" strokeWidth="0.65">
          <circle cx="5.2" cy="6.2" r="1.15" />
          <circle cx="8.5" cy="4.8" r="1.15" />
          <circle cx="5.5" cy="9.8" r="1.15" />
          <circle cx="8.5" cy="8.2" r="1.15" />
          <circle cx="15.8" cy="14" r="1.15" />
          <circle cx="18.6" cy="15.5" r="1.15" />
          <circle cx="14" cy="17.8" r="1.15" />
          <circle cx="17.5" cy="18.8" r="1.15" />
        </g>
        {/* Center plus sign */}
        <path d="M12,9.2 V14.8 M9.2,12 H14.8" stroke="#f2f4f7" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M12,9.2 V14.8 M9.2,12 H14.8" stroke="#262626" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.groupcopy',
    label: 'Group Copy',
    family: 'sop',
    description:
      'Two overlapping circular yellow-orange group regions with dashed orange rims, each containing five grey point spheres.',
    types: ['groupcopy'],
    icons: ['sop_groupcopy'],
    refKey: 'SOP_groupcopy',
    render: () => (
      <>
        {/* Top-left group circle */}
        <circle cx="8.6" cy="8.6" r="6" fill="#ffe47a" stroke="#262626" strokeWidth="1.1" />
        <circle cx="8.6" cy="8.6" r="5.5" fill="none" stroke="#ee8624" strokeWidth="0.9" strokeDasharray="1.5 1.1" />
        <g fill="#89929e" stroke="#262626" strokeWidth="0.6">
          <circle cx="6.2" cy="6.4" r="1.1" />
          <circle cx="10.2" cy="5.5" r="1.1" />
          <circle cx="5.8" cy="10.2" r="1.1" />
          <circle cx="9.2" cy="9.2" r="1.1" />
          <circle cx="11.5" cy="8.2" r="1.1" />
        </g>
        {/* Bottom-right group circle */}
        <circle cx="15.4" cy="15.4" r="6" fill="#ffe47a" stroke="#262626" strokeWidth="1.1" />
        <circle cx="15.4" cy="15.4" r="5.5" fill="none" stroke="#ee8624" strokeWidth="0.9" strokeDasharray="1.5 1.1" />
        <g fill="#89929e" stroke="#262626" strokeWidth="0.6">
          <circle cx="13" cy="13.2" r="1.1" />
          <circle cx="17" cy="12.3" r="1.1" />
          <circle cx="12.6" cy="17" r="1.1" />
          <circle cx="16" cy="16" r="1.1" />
          <circle cx="18.3" cy="18.2" r="1.1" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.groupexpand',
    label: 'Group Expand',
    family: 'sop',
    description:
      'Isometric polygon mesh diamond with a bright yellow center group surrounded by a darker grey expanded ring of faces.',
    types: ['groupexpand'],
    icons: ['sop_groupexpand'],
    refKey: 'SOP_groupexpand',
    render: () => (
      <>
        <polygon
          points="1.8,11.6 12,4.8 22.2,11.2 12,19.2"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Expanded ring */}
        <polygon
          points="5.5,11.6 12,7.2 18.5,11.3 12,16.5"
          fill="#5a616b"
          stroke="#262626"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {/* Grid lines */}
        <g stroke="#262626" strokeWidth="0.5" strokeOpacity="0.65">
          <line x1="4.4" y1="9.9" x2="14.6" y2="17.1" />
          <line x1="7" y1="8.1" x2="17.1" y2="15.2" />
          <line x1="9.5" y1="6.5" x2="19.6" y2="13.2" />
          <line x1="4.4" y1="13.4" x2="14.6" y2="6.4" />
          <line x1="7" y1="15.3" x2="17.1" y2="8.1" />
          <line x1="9.5" y1="17.2" x2="19.6" y2="9.7" />
        </g>
        {/* Inner yellow seed group */}
        <polygon
          points="8.8,11.6 12,9.4 15.2,11.4 12,14"
          fill="#f2c438"
          stroke="#ee8624"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <line x1="10.4" y1="10.5" x2="13.6" y2="12.7" stroke="#c25e12" strokeWidth="0.6" />
        <line x1="10.4" y1="12.7" x2="13.6" y2="10.4" stroke="#c25e12" strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'sop.groupexpression',
    label: 'Group Expression',
    family: 'sop',
    description:
      'Red Wrangle cowboy hat with a white sheriff star at top-left overlapping a circular dashed yellow-orange group disc at bottom-right.',
    types: ['groupexpression'],
    icons: ['sop_groupexpression'],
    refKey: 'SOP_groupexpression',
    render: () => (
      <>
        {/* Bottom-right group circle */}
        <circle cx="16.5" cy="16.5" r="5" fill="#ffe47a" stroke="#262626" strokeWidth="1.1" />
        <circle cx="16.5" cy="16.5" r="4.5" fill="none" stroke="#ee8624" strokeWidth="0.9" strokeDasharray="1.4 1.1" />
        {/* Red cowboy hat */}
        <path
          d="M2.5,11.5 C1.5,9.5 3.5,8.5 5.5,9 C6.2,5.2 8.2,2.8 10.2,4.2 C11.5,5 12.2,4.2 13.5,4.8 C15,5.5 15.2,8.2 15.5,10.5 C18.2,10.2 19.8,11.8 18.2,13.8 C15.8,16.5 9.5,16.8 5.2,14.5 C3.5,13.6 2.8,12.5 2.5,11.5 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Hat band */}
        <path
          d="M5.6,9.5 C8.5,11.2 12.5,11.5 15.3,10.5"
          fill="none"
          stroke="#f2f4f7"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* White star on crown */}
        <polygon
          points="10.2,5.6 10.8,7 12.3,7.1 11.1,8 11.5,9.5 10.2,8.7 8.9,9.5 9.3,8 8.1,7.1 9.6,7"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="0.45"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.groupfindpath',
    label: 'Group Find Path',
    family: 'sop',
    description:
      'Isometric polygon mesh diamond with a highlighted V-shaped yellow path connecting two light-blue endpoint spheres.',
    types: ['groupfindpath'],
    icons: ['sop_groupfindpath'],
    refKey: 'SOP_groupfindpath',
    render: () => (
      <>
        <polygon
          points="1.8,11.6 12,4.8 22.2,11.2 12,19.2"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <g stroke="#5a616b" strokeWidth="0.5">
          <line x1="4.4" y1="9.9" x2="14.6" y2="17.1" />
          <line x1="7" y1="8.1" x2="17.1" y2="15.2" />
          <line x1="9.5" y1="6.5" x2="19.6" y2="13.2" />
          <line x1="4.4" y1="13.4" x2="14.6" y2="6.4" />
          <line x1="7" y1="15.3" x2="17.1" y2="8.1" />
          <line x1="9.5" y1="17.2" x2="19.6" y2="9.7" />
        </g>
        {/* Highlighted yellow path strip */}
        <polygon
          points="5.5,12.2 7.2,11 12,14.4 16.8,10.9 18.5,12 12,16.8"
          fill="#f2c438"
          stroke="#ee8624"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Start and end point spheres */}
        <circle cx="6.2" cy="11.5" r="1.4" fill="#8fc2ff" stroke="#262626" strokeWidth="0.8" />
        <circle cx="17.8" cy="11.4" r="1.4" fill="#8fc2ff" stroke="#262626" strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'sop.groupfromattribboundary',
    label: 'Group from Attribute Boundary',
    family: 'sop',
    description:
      'Isometric polygon mesh diamond crossed by a bright green attribute boundary chevron highlighted with yellow edges.',
    types: ['groupfromattribboundary'],
    icons: ['sop_groupfromattribboundary'],
    refKey: 'SOP_groupfromattribboundary',
    render: () => (
      <>
        <polygon
          points="1.8,11.6 12,4.8 22.2,11.2 12,19.2"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Green chevron strip */}
        <polygon
          points="4.2,13.3 12,8.1 19.6,13.1 17.5,14.8 12,11.1 6.5,15"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <g stroke="#5a616b" strokeWidth="0.5">
          <line x1="4.4" y1="9.9" x2="14.6" y2="17.1" />
          <line x1="7" y1="8.1" x2="17.1" y2="15.2" />
          <line x1="9.5" y1="6.5" x2="19.6" y2="13.2" />
          <line x1="4.4" y1="13.4" x2="14.6" y2="6.4" />
          <line x1="7" y1="15.3" x2="17.1" y2="8.1" />
          <line x1="9.5" y1="17.2" x2="19.6" y2="9.7" />
        </g>
        {/* Highlighted yellow boundary polyline */}
        <polyline
          points="5.2,14.1 12,9.5 18.6,13.9"
          fill="none"
          stroke="#f2c438"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.groupinvert',
    label: 'Group Invert',
    family: 'sop',
    description:
      'Two vertical columns of green check-squares and orange/purple triangles linked by crossed lines showing group inversion.',
    types: ['groupinvert'],
    icons: ['sop_groupinvert'],
    refKey: 'SOP_groupinvert',
    render: () => (
      <>
        {/* Crossed connector lines */}
        <g stroke="#262626" strokeWidth="1.1" strokeLinecap="round">
          <line x1="8.5" y1="5.2" x2="15.5" y2="12" />
          <line x1="8.5" y1="18.8" x2="15.5" y2="12" />
        </g>
        {/* Left column: green square, orange triangle, green square */}
        <rect x="3.5" y="2.5" width="5.2" height="5.2" fill="#58c848" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
        <polyline points="4.7,5.2 5.7,6.3 7.5,3.8" fill="none" stroke="#262626" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="3.3,14.5 6.1,9.5 8.9,14.5" fill="#ee8624" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
        <rect x="3.5" y="16.3" width="5.2" height="5.2" fill="#58c848" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
        <polyline points="4.7,19 5.7,20.1 7.5,17.6" fill="none" stroke="#262626" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right column: purple triangle, green square, orange triangle */}
        <polygon points="15.1,7.7 17.9,2.7 20.7,7.7" fill="#894f98" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
        <rect x="15.3" y="9.4" width="5.2" height="5.2" fill="#58c848" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
        <polyline points="16.5,12.1 17.5,13.2 19.3,10.7" fill="none" stroke="#262626" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="15.1,21.5 17.9,16.5 20.7,21.5" fill="#ee8624" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.grouppaint',
    label: 'Group Paint',
    family: 'sop',
    description:
      'Bean-shaped yellow-orange dashed group region containing five grey point spheres, with an orange paintbrush painting across it.',
    types: ['grouppaint'],
    icons: ['sop_grouppaint'],
    refKey: 'SOP_grouppaint',
    render: () => (
      <>
        {/* Bean-shaped group region */}
        <path
          d="M9.5,2.2 C12.2,3.2 12.8,5.8 11.8,7.6 C10.8,9.4 9.2,11 9.2,13.2 C9.2,15.8 11.2,16.5 12,18 C12.8,19.5 12,21.5 9.8,22 C7.2,22.5 3,19.2 3,12.2 C3,6.5 6.2,1 9.5,2.2 Z"
          fill="#ffe47a"
          stroke="#262626"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <path
          d="M9.5,2.2 C12.2,3.2 12.8,5.8 11.8,7.6 C10.8,9.4 9.2,11 9.2,13.2 C9.2,15.8 11.2,16.5 12,18 C12.8,19.5 12,21.5 9.8,22 C7.2,22.5 3,19.2 3,12.2 C3,6.5 6.2,1 9.5,2.2 Z"
          fill="none"
          stroke="#ee8624"
          strokeWidth="0.95"
          strokeDasharray="1.5 1.1"
          strokeLinejoin="round"
        />
        {/* Point spheres */}
        <g fill="#89929e" stroke="#262626" strokeWidth="0.65">
          <circle cx="8.8" cy="5.5" r="1.25" />
          <circle cx="6.2" cy="8.5" r="1.25" />
          <circle cx="5.8" cy="12.2" r="1.25" />
          <circle cx="6.5" cy="15.8" r="1.25" />
          <circle cx="9.2" cy="18.8" r="1.25" />
        </g>
        {/* Paintbrush */}
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <polygon points="20.8,6.8 22,8 16.5,14.5 15.2,13.2" fill="#c25e12" />
          <polygon points="15.2,13.2 16.5,14.5 14.8,16.2 13.5,14.9" fill="#eef2f7" />
          <path d="M13.5,14.9 L14.8,16.2 C13.5,17.8 11.8,18.2 10.5,18 C11.5,16.8 12.2,15.8 13.5,14.9 Z" fill="#ee8624" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.grouprename',
    label: 'Group Rename',
    family: 'sop',
    description:
      'Circular yellow-orange dashed group disc with grey point spheres in the upper-left, overlapped by a tilted blue-and-white name tag.',
    types: ['grouprename'],
    icons: ['sop_grouprename'],
    refKey: 'SOP_grouprename',
    render: () => (
      <>
        <circle cx="9.8" cy="9.8" r="7.4" fill="#ffe47a" stroke="#262626" strokeWidth="1.15" />
        <circle cx="9.8" cy="9.8" r="6.8" fill="none" stroke="#ee8624" strokeWidth="0.95" strokeDasharray="1.6 1.2" />
        <g fill="#89929e" stroke="#262626" strokeWidth="0.65">
          <circle cx="7" cy="6.5" r="1.2" />
          <circle cx="11.5" cy="5.8" r="1.2" />
          <circle cx="5.8" cy="10.5" r="1.2" />
          <circle cx="9.5" cy="9.8" r="1.2" />
          <circle cx="7.5" cy="14" r="1.2" />
        </g>
        {/* Tilted name tag */}
        <g transform="rotate(-14 15 15)">
          <rect x="9.5" y="10.2" width="11.5" height="9" rx="1.2" fill="#f2f4f7" stroke="#262626" strokeWidth="1.05" />
          <path d="M9.5,11.4 C9.5,10.7 10,10.2 10.7,10.2 H19.8 C20.5,10.2 21,10.7 21,11.4 V14.2 H9.5 Z" fill="#3672c4" stroke="#262626" strokeWidth="0.9" />
          <line x1="11.2" y1="16.2" x2="19.2" y2="16.2" stroke="#262626" strokeWidth="0.8" strokeDasharray="1 1" />
          <line x1="11.2" y1="17.6" x2="17.5" y2="17.6" stroke="#262626" strokeWidth="0.8" strokeDasharray="1 1" />
        </g>
      </>
    ),
  },
];
