import React from 'react';
import { ellipsePath, ellipsePt, type Pt, pts, quadGridPath, quadPt, r2 } from '../../geoHelpers';
import { CasedStroke, StraightArrow } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { GroupDots, GroupRing } from '../kits/groupRing';

/**
 * The Group family. Two shared kits, written once and reused
 * unchanged: the dashed orange group ring with grey member dots (from the live Group Create and
 * Group by Range), and a flat grid tile with highlighted cells for selections on geometry.
 */

const OUTLINE = '#262626';

const PAPER = '#f2f4f7';

const TILE_CELLS = 4;

const TILE_DEPTH = 0.8;

const YELLOW = '#f2c438';

/** Two overlapping discs of radius `r` joined by a pinched waist, as one closed outline. */
const peanutPath = (a: Pt, b: Pt, r: number, pinch: number): string => {
  const axis = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
  const a0 = ellipsePt(a[0], a[1], r, r, axis - 60);
  const a1 = ellipsePt(a[0], a[1], r, r, axis + 60);
  const b0 = ellipsePt(b[0], b[1], r, r, axis + 120);
  const b1 = ellipsePt(b[0], b[1], r, r, axis + 240);
  const mid: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const rad = ((axis + 90) * Math.PI) / 180;
  const c0: Pt = [mid[0] + Math.cos(rad) * pinch, mid[1] + Math.sin(rad) * pinch];
  const c1: Pt = [mid[0] - Math.cos(rad) * pinch, mid[1] - Math.sin(rad) * pinch];
  return `M${pts([a0])} A${r},${r} 0 1,0 ${pts([a1])} Q${pts([c0, b0])} A${r},${r} 0 1,0 ${pts([b1])} Q${pts([c1, a0])} Z`;
};

/** Top face of the grid tile: back, right, front and left corner (a flat diamond). */
const TILE: readonly [Pt, Pt, Pt, Pt] = [
  [12, 5.3],
  [21.6, 11.7],
  [12, 18.1],
  [2.4, 11.7],
];

/** Point on the tile: `u` runs from the back corner to the right, `v` from the back to the left. */
const tilePt = (u: number, v: number): Pt => quadPt(TILE, u, v);

/** A rectangle of the tile given in cell units (0 to 4 on both axes), as polygon points. */
const tileCells = (u0: number, v0: number, u1: number, v1: number): string =>
  pts(
    (
      [
        [u0, v0],
        [u1, v0],
        [u1, v1],
        [u0, v1],
      ] as const
    ).map(([u, v]) => tilePt(u / TILE_CELLS, v / TILE_CELLS)),
  );

/** Open polyline on the tile through points given in cell units. */
const tileLine = (cells: readonly Pt[]): string =>
  `M${pts(cells.map(([u, v]) => tilePt(u / TILE_CELLS, v / TILE_CELLS))).replace(/ /g, ' L')}`;

/**
 * Flat light grey grid tile with a thin dark slab edge. Children are the highlighted cells: they are
 * painted on the tile and under the grid lines.
 */
const GridTile: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [, right, front, left] = TILE;
  const down = (p: Pt): Pt => [p[0], p[1] + TILE_DEPTH];
  return (
    <>
      <polygon
        points={pts([left, front, right, down(right), down(front), down(left)])}
        fill="#5a616b"
        stroke={OUTLINE}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <polygon points={pts(TILE)} fill="#c0c7d1" />
      {children}
      <path d={quadGridPath(TILE, TILE_CELLS, TILE_CELLS)} fill="none" stroke="#5a616b" strokeWidth="0.6" />
      <polygon points={pts(TILE)} fill="none" stroke={OUTLINE} strokeWidth="1.1" strokeLinejoin="round" />
    </>
  );
};

/** Short stripes on the tile, each from one point to another in cell units (a fringe of cells). */
const TileStripes: React.FC<{ lines: readonly (readonly [Pt, Pt])[]; color: string }> = ({ lines, color }) => (
  <path d={lines.map((l) => tileLine(l)).join(' ')} fill="none" stroke={color} strokeWidth="1.2" />
);

/** Green checkbox with a dark tick, centered on `(x, y)`. */
const CheckBox: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <>
    <rect x={x - 2.8} y={y - 2.8} width="5.6" height="5.6" rx="0.7" fill="#58c848" stroke={OUTLINE} strokeWidth="0.9" />
    <path
      d={`M${r2(x - 1.6)},${r2(y)} L${r2(x - 0.4)},${r2(y + 1.3)} L${r2(x + 1.7)},${r2(y - 1.4)}`}
      fill="none"
      stroke={OUTLINE}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </>
);

/** Upright triangle centered on `(x, y)`. */
const Triangle: React.FC<{ x: number; y: number; fill: string }> = ({ x, y, fill }) => (
  <polygon
    points={pts([
      [x, y - 2.9],
      [x + 3.1, y + 2.5],
      [x - 3.1, y + 2.5],
    ])}
    fill={fill}
    stroke={OUTLINE}
    strokeWidth="0.9"
    strokeLinejoin="round"
  />
);

/**
 * Group operators: the dashed orange group ring with grey member dots, and a flat grid tile with highlighted cells for selections on geometry.
 */
export const GROUP_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.groupbylasso',
    label: 'Group by Lasso',
    family: 'sop',
    description:
      'Flat grey grid tile with a yellow block of cells in the middle, circled by a red lasso rope whose second loop hangs off the upper right corner.',
    types: ['groupbylasso'],
    icons: ['sop_groupbylasso'],
    refKey: 'SOP_groupbylasso',
    render: () => {
      const rope = `${ellipsePath(12, 11.7, 6.6, 4.3)} M17.4,9.3 C16.9,6.9 18.5,5 19.9,5.3 C21.2,5.7 20.8,7.8 19.4,8.8 C18.7,9.3 18,9.5 17.4,9.3`;
      return (
        <>
          <GridTile>
            <polygon points={tileCells(1, 1, 3, 3)} fill={YELLOW} />
          </GridTile>
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={rope} stroke={OUTLINE} strokeWidth="2.3" />
            <path d={rope} stroke="#e03228" strokeWidth="1.5" />
            <path d={rope} stroke="#ffffff" strokeWidth="0.6" />
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.groupcombine',
    label: 'Group Combine',
    family: 'sop',
    description:
      'Two light group discs merged into one peanut shape inside a single dashed orange ring, grey points in both halves and a black plus sign at the waist.',
    types: ['groupcombine'],
    icons: ['sop_groupcombine'],
    refKey: 'SOP_groupcombine',
    render: (uid) => (
      <>
        <GroupRing d={peanutPath([8, 8], [16, 16], 5.3, 2.6)} />
        <GroupDots
          uid={uid}
          at={[
            [5.8, 6.6],
            [9.8, 5.6],
            [6, 10.6],
            [18, 13.4],
            [14.2, 18.4],
            [18.2, 17.4],
          ]}
        />
        <path d="M12,9.6 V14.4 M9.6,12 H14.4" fill="none" stroke={OUTLINE} strokeWidth="1.7" />
      </>
    ),
  },
  {
    id: 'sop.groupcopy',
    label: 'Group Copy',
    family: 'sop',
    description:
      'Two identical light group discs with dashed orange rings and grey points, one at the upper left and its copy overlapping it at the lower right.',
    types: ['groupcopy'],
    icons: ['sop_groupcopy'],
    refKey: 'SOP_groupcopy',
    render: (uid) => (
      <>
        <GroupRing d={ellipsePath(8.6, 8.6, 5.6, 5.6)} />
        <GroupRing d={ellipsePath(15.4, 15.4, 5.6, 5.6)} />
        <GroupDots
          uid={uid}
          at={[
            [6.4, 6.6],
            [10.4, 5.8],
            [5.9, 10.6],
            [13.4, 13.6],
            [17.6, 13.2],
            [13.2, 17.6],
            [17.3, 17.4],
          ]}
        />
      </>
    ),
  },
  {
    id: 'sop.groupexpand',
    label: 'Group Expand',
    family: 'sop',
    description:
      'Flat grey grid tile with a yellow block of cells in the middle and a fringe of short orange stripes pointing outward from each of its sides, the cells the group grows into.',
    types: ['groupexpand'],
    icons: ['sop_groupexpand'],
    refKey: 'SOP_groupexpand',
    render: () => (
      <>
        <GridTile>
          <polygon points={tileCells(1, 1, 3, 3)} fill={YELLOW} />
          <TileStripes
            color="#ee8624"
            lines={[1.5, 2.5].flatMap((k): (readonly [Pt, Pt])[] => [
              [
                [k, 0.95],
                [k, 0.3],
              ],
              [
                [k, 3.05],
                [k, 3.7],
              ],
              [
                [0.95, k],
                [0.3, k],
              ],
              [
                [3.05, k],
                [3.7, k],
              ],
            ])}
          />
        </GridTile>
      </>
    ),
  },
  {
    id: 'sop.groupfindpath',
    label: 'Group Find Path',
    family: 'sop',
    description:
      'Flat grey grid tile with a light blue cell in the left and the right corner, joined by a V shaped path of yellow cells along the two front edges.',
    types: ['groupfindpath'],
    icons: ['sop_groupfindpath'],
    refKey: 'SOP_groupfindpath',
    render: () => (
      <>
        <GridTile>
          <polygon points={tileCells(1, 3, 4, 4)} fill={YELLOW} />
          <polygon points={tileCells(3, 1, 4, 3)} fill={YELLOW} />
        </GridTile>
        <polygon
          points={tileCells(0, 3, 1, 4)}
          fill="#5aa2f2"
          stroke={OUTLINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon
          points={tileCells(3, 0, 4, 1)}
          fill="#5aa2f2"
          stroke={OUTLINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.groupfromattribboundary',
    label: 'Group from Attribute Boundary',
    family: 'sop',
    description:
      'Flat grey grid tile whose front quarter is yellow, with an L shaped band of green cells along the border between the yellow and the grey cells.',
    types: ['groupfromattribboundary'],
    icons: ['sop_groupfromattribboundary'],
    refKey: 'SOP_groupfromattribboundary',
    render: () => (
      <GridTile>
        <polygon points={tileCells(1, 1, 4, 4)} fill="#58c848" />
        <polygon points={tileCells(2, 2, 4, 4)} fill={YELLOW} />
      </GridTile>
    ),
  },
  {
    id: 'sop.groupinvert',
    label: 'Group Invert',
    family: 'sop',
    description:
      'Two columns of items: green checkboxes at the top left, bottom left and middle right joined by blue lines, and unticked light blue, yellow and orange triangles in the other three places.',
    types: ['groupinvert'],
    icons: ['sop_groupinvert'],
    refKey: 'SOP_groupinvert',
    render: () => (
      <>
        <CasedStroke d="M5.6,5.2 L18.4,12 L5.6,18.8" color="#3672c4" width={1} casing={2} />
        <Triangle x={18.4} y={5.4} fill="#5aa2f2" />
        <Triangle x={5.6} y={12.2} fill={YELLOW} />
        <Triangle x={18.4} y={19} fill="#ee8624" />
        <CheckBox x={5.6} y={5.2} />
        <CheckBox x={18.4} y={12} />
        <CheckBox x={5.6} y={18.8} />
      </>
    ),
  },
  {
    id: 'sop.grouppaint',
    label: 'Group Paint',
    family: 'sop',
    description:
      'Bean shaped light group area inside a dashed orange ring with three grey points, its lower end tinted orange where a brown paintbrush coming from the upper right touches it.',
    types: ['grouppaint'],
    icons: ['sop_grouppaint'],
    refKey: 'SOP_grouppaint',
    render: (uid) => {
      const bean =
        'M8.6,3.2 C11.4,2.6 12.4,5.6 10.8,8.2 C9.6,10.2 10.6,12.4 11.6,14.8 C12.8,18 10.6,20.8 7.6,20.4 C4.6,20 3.4,16.8 3.8,12.8 C4.3,8.4 5.6,3.8 8.6,3.2 Z';
      return (
        <>
          <defs>
            <clipPath id={`${uid}-bean`}>
              <path d={bean} />
            </clipPath>
          </defs>
          <path d={bean} fill={PAPER} />
          <rect x="2" y="15" width="13" height="7" fill="#ffb066" clipPath={`url(#${uid}-bean)`} />
          <GroupRing d={bean} fill="none" />
          <GroupDots
            uid={uid}
            at={[
              [8.4, 6.2],
              [6.8, 11.8],
              [7.6, 17],
            ]}
          />
          <g transform="translate(10.2 18.6) rotate(-53)" stroke={OUTLINE} strokeLinejoin="round">
            <polygon points="6.2,-1.2 17,-0.7 17,0.7 6.2,1.2" fill="#c25e12" strokeWidth="0.9" />
            <rect x="4" y="-1.4" width="2.4" height="2.8" fill="#c0c7d1" strokeWidth="0.8" />
            <path d="M0,0 Q2,-1.9 4,-1.5 L4,1.5 Q2,1.9 0,0 Z" fill="#3a3f47" strokeWidth="0.8" />
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.grouprename',
    label: 'Group Rename',
    family: 'sop',
    description:
      'Light group disc with a dashed orange ring and grey points, partly covered by a tilted name badge: blue header with a white line, white body with a dotted writing line.',
    types: ['grouprename'],
    icons: ['sop_grouprename'],
    refKey: 'SOP_grouprename',
    render: (uid) => (
      <>
        <GroupRing d={ellipsePath(9.4, 9.2, 6.6, 6.6)} />
        <GroupDots
          uid={uid}
          r={1.6}
          at={[
            [7.4, 6.4],
            [11.8, 6.2],
            [5.8, 10.6],
          ]}
        />
        <g transform="rotate(-10 15.2 16.2)" strokeLinejoin="round">
          <rect x="9.2" y="12" width="12" height="8.4" rx="1.3" fill={PAPER} stroke={OUTLINE} strokeWidth="1" />
          <path
            d="M9.2,15.6 V13.3 Q9.2,12 10.5,12 H19.9 Q21.2,12 21.2,13.3 V15.6 Z"
            fill="#3672c4"
            stroke={OUTLINE}
            strokeWidth="1"
          />
          <path d="M11.4,13.8 H19" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
          <path d="M10.9,18.6 H19.6" fill="none" stroke={OUTLINE} strokeWidth="0.9" strokeDasharray="0.9 0.9" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.grouptransfer',
    label: 'Group Transfer',
    family: 'sop',
    description:
      'A brown arm on the left ending in an open hand with a thumb and four spread fingers, and a green robot arm on the right ending in a claw, leaning together at the top; a dashed orange group ring sits on each forearm and a red arrow points from the hand to the claw.',
    types: ['grouptransfer'],
    icons: ['sop_grouptransfer'],
    refKey: 'SOP_grouptransfer',
    render: () => (
      <>
        <CasedStroke d="M10.3,4.3 L6.6,12.6" color="#a8783c" width={3.4} casing={4.8} />
        <CasedStroke
          d="M5.4,15.6 L2.7,14.8 M5.4,15.8 L2.9,18.9 M5.4,15.8 L4.4,20.6 M5.6,15.8 L6.5,20.6 M5.6,15.8 L8.3,19.2"
          color="#a8783c"
          width={0.9}
          casing={1.9}
        />
        <ellipse cx="5.6" cy="15.4" rx="2" ry="1.8" fill="#a8783c" stroke={OUTLINE} strokeWidth="0.9" />
        <CasedStroke d="M16.4,20.6 A2.5,2.5 0 1,1 20.9,19.4" color="#58c848" width={1.4} casing={2.5} />
        <CasedStroke d="M13.8,4.4 L17.8,14.4" color="#58c848" width={3.4} casing={4.8} />
        <g transform="rotate(23 8.4 8.6)">
          <GroupRing d={ellipsePath(8.4, 8.6, 2.7, 3.8)} width={1.2} fillOpacity={0.55} />
        </g>
        <g transform="rotate(-22 16 9.6)">
          <GroupRing d={ellipsePath(16, 9.6, 2.7, 4)} width={1.2} fillOpacity={0.55} />
        </g>
        <StraightArrow from={[8.5, 17.8]} tip={[15.6, 17.8]} color="#e03228" width={1.4} head={2.6} />
      </>
    ),
  },
  {
    id: 'sop.groupcreate',
    label: 'Group Create',
    family: 'sop',
    description: 'Light disc with a thick dashed orange rim: the standard group-selection marker.',
    types: ['groupcreate'],
    matches: (q) => q.namespace === '' && q.baseType.startsWith('group_by_'),
    refKey: 'SOP_groupcreate',
    render: () => (
      <>
        <circle cx="12" cy="12" r="7.8" fill="#f2f4f7" stroke="#ee7b1c" strokeWidth="2.6" strokeDasharray="2.2 1.2" />
      </>
    ),
  },
  {
    id: 'sop.groupdelete',
    label: 'Group Delete',
    family: 'sop',
    description: 'Dashed orange group-selection circle being swept away by a yellow broom with a brown handle.',
    types: ['groupdelete'],
    refKey: 'SOP_groupdelete',
    render: () => (
      <>
        <circle cx="9.5" cy="12" r="7" fill="#f2f4f7" stroke="#ee7b1c" strokeWidth="2.4" strokeDasharray="2.2 1.2" />
        {/* Broom handle */}
        <path d="M20.5 2.5L14.5 10.5" stroke="#262626" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M20.5 2.5L14.5 10.5" stroke="#b87a3d" strokeWidth="1.6" strokeLinecap="round" />
        {/* Bristles */}
        <polygon
          points="13.2,9.2 16.2,11.8 13,19.5 8,16"
          fill="#ebbf1a"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M14.2 10.8L10.5 17.8M15.2 11.4L12 18.7M13.4 10L9.2 16.8" stroke="#8a6a10" strokeWidth="0.7" />
        <path d="M12.9 9.1L16.3 11.9" stroke="#8b2a1a" strokeWidth="1.6" />
      </>
    ),
  },
  {
    id: 'sop.grouppromote',
    label: 'Group Promote',
    family: 'sop',
    description: 'Grey diamond quad with bright yellow vertex dots on all four corners.',
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
        <ellipse
          cx="13.5"
          cy="7"
          rx="6.5"
          ry="4.8"
          fill="#f5c08a"
          fillOpacity="0.5"
          stroke="#ee7b1c"
          strokeWidth="1.6"
          strokeDasharray="1.8 1.2"
        />
        {[
          [11, 6],
          [16, 5.5],
          [13.5, 9],
          [3.5, 5],
          [3.5, 11],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="2.1"
            fill={`url(#${uid}-pt)`}
            stroke="#262626"
            strokeWidth="0.9"
          />
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
];
