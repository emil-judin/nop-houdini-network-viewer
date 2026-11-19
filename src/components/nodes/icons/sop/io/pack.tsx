import React from 'react';
import { arrowHead, gearPath, type Pt, pts, quadPt, r2 } from '../../geoHelpers';
import { CursorArrow, ShadedSphere, SPHERE_TONES } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { KinefxMannequinBase } from '../kits/mannequin';
import { OpenSuitcase } from '../kits/pack';
import { UsdLayerStack } from '../kits/usd';

const FOLDER_BACK_PATH = 'M3,6.8 L8.4,5.6 L9.8,6.8 L16.8,5.2 L18,18.2 L4.2,21.6 Z';

const FOLDER_SHEET_POINTS = '4.2,21.6 5.6,11.6 19.2,8 18,18.2';

const FOLDER_ARROW_POINTS = '7,3.4 10.6,7 13.4,4.4 13.4,12.6 5.6,12.6 8.6,9.8 5,6.2';

/** Helper to draw a small blue or white cylinder in suitcase-local coordinates. */
const TrayCylinder: React.FC<{ cx: number; cy: number; bodyFill: string; topFill: string }> = ({
  cx,
  cy,
  bodyFill,
  topFill,
}) => (
  <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
    <path
      d={`M${cx - 1.8},${cy - 1.8} L${cx - 1.8},${cy + 1.5} A1.8,0.8 0 0,0 ${cx + 1.8},${cy + 1.5} L${cx + 1.8},${cy - 1.8} Z`}
      fill={bodyFill}
    />
    <ellipse cx={cx} cy={cy - 1.8} rx="1.8" ry="0.8" fill={topFill} />
  </g>
);

/** Isometric colored tile grid built from `quadPt` cells. */
const ColoredTileGrid: React.FC<{
  quad: readonly [Pt, Pt, Pt, Pt];
  cols: number;
  rows: number;
  colors: readonly string[];
  strokeWidth?: number;
}> = ({ quad, cols, rows, colors, strokeWidth = 0.7 }) => {
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const u0 = c / cols;
      const u1 = (c + 1) / cols;
      const v0 = r / rows;
      const v1 = (r + 1) / rows;
      const c0 = quadPt(quad, u0, v0);
      const c1 = quadPt(quad, u1, v0);
      const c2 = quadPt(quad, u1, v1);
      const c3 = quadPt(quad, u0, v1);
      const fill = colors[(r * cols + c) % colors.length];
      cells.push(
        <polygon
          key={`${r}-${c}`}
          points={pts([c0, c1, c2, c3])}
          fill={fill}
          stroke="#262626"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />,
      );
    }
  }
  return <g strokeLinejoin="round">{cells}</g>;
};

const HARD_DRIVE_LEFT_BAY: readonly [Pt, Pt, Pt, Pt] = [
  [0.0, -3.7],
  [3.6, -1.9],
  [-4.1, 1.95],
  [-7.7, 0.15],
];

const HARD_DRIVE_RIGHT_BAY: readonly [Pt, Pt, Pt, Pt] = [
  [4.1, -1.65],
  [7.7, 0.15],
  [0.0, 4.0],
  [-3.6, 2.2],
];

/**
 * Wide, flat 2:1 isometric dual-bay metallic hard drive chassis centered at `(x, y)`.
 * Renders empty grey bays by default, or custom `leftBay` / `rightBay` contents inside the tray.
 */
const HardDriveChassis: React.FC<{
  x: number;
  y: number;
  scale?: number;
  leftBay?: React.ReactNode;
  rightBay?: React.ReactNode;
}> = ({ x, y, scale = 1, leftBay, rightBay }) => {
  const sw = r2(0.95 / scale);
  const innerSw = r2(0.7 / scale);
  const h = 2.1;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} strokeLinejoin="round">
      {/* Top metallic chassis */}
      <polygon points="0,-4.4 8.8,0 0,4.4 -8.8,0" fill="#c0c7d1" stroke="#262626" strokeWidth={sw} />
      {/* Front-left wall with white drive label bar and dark slot */}
      <polygon points={`-8.8,0 0,4.4 0,${4.4 + h} -8.8,${h}`} fill="#c0c7d1" stroke="#262626" strokeWidth={sw} />
      <polygon
        points={`-7.9,0.85 -4.6,2.5 -4.6,${2.5 + 1.0} -7.9,${0.85 + 1.0}`}
        fill="#f2f4f7"
        stroke="#262626"
        strokeWidth={innerSw}
      />
      <polygon points={`-3.6,3.0 -1.0,4.3 -1.0,${4.3 + 0.75} -3.6,${3.0 + 0.75}`} fill="#3a3f47" />
      {/* Front-right wall */}
      <polygon points={`0,4.4 8.8,0 8.8,${h} 0,${4.4 + h}`} fill="#89929e" stroke="#262626" strokeWidth={sw} />
      {/* Center bay divider */}
      <line x1="-4.4" y1="2.2" x2="4.4" y2="-2.2" stroke="#262626" strokeWidth={innerSw} />
      {/* Left and right bays */}
      {leftBay ?? <polygon points={pts(HARD_DRIVE_LEFT_BAY)} fill="#89929e" stroke="#262626" strokeWidth={innerSw} />}
      {rightBay ?? <polygon points={pts(HARD_DRIVE_RIGHT_BAY)} fill="#eef2f7" stroke="#262626" strokeWidth={innerSw} />}
    </g>
  );
};

/**
 * Pack and Unpack operators: the open suitcase and packed folders.
 */
export const PACK_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.pack',
    label: 'Pack',
    family: 'sop',
    description: 'Open brown and gold suitcase holding a blue cylinder on the left and a yellow cone on the right.',
    types: ['pack'],
    icons: ['sop_pack'],
    refKey: 'SOP_pack',
    render: () => (
      <OpenSuitcase>
        <TrayCylinder cx={-2.2} cy={-0.9} bodyFill="#3672c4" topFill="#8fc2ff" />
        <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <polygon points="2.5,-3.9 0.0,0.6 2.5,1.3" fill="#ffe47a" />
          <polygon points="2.5,-3.9 2.5,1.3 5.0,0.3" fill="#f2c438" />
        </g>
      </OpenSuitcase>
    ),
  },
  {
    id: 'sop.packpoints',
    label: 'Pack Points',
    family: 'sop',
    description: 'Open brown and gold suitcase filled with a cluster of grey shaded point spheres.',
    types: ['packpoints'],
    icons: ['sop_packpoints'],
    refKey: 'SOP_packpoints',
    render: (uid) => {
      const spheres: ReadonlyArray<readonly [number, number]> = [
        [-1.0, -2.1],
        [1.8, -2.3],
        [-3.2, -0.7],
        [0.1, -0.6],
        [3.3, -0.8],
        [-1.1, 0.7],
      ];
      return (
        <OpenSuitcase>
          {spheres.map(([sx, sy], i) => (
            <ShadedSphere
              key={i}
              id={`${uid}-pp-${i}`}
              cx={sx}
              cy={sy}
              r={1.55}
              tones={SPHERE_TONES.grey}
              strokeWidth={0.8}
            />
          ))}
        </OpenSuitcase>
      );
    },
  },
  {
    id: 'sop.packeddiskedit',
    label: 'Packed Disk Properties',
    family: 'sop',
    description:
      'Flat isometric dual-bay metallic grey hard drive at upper left with a front-facing grey gear overlapping at lower right.',
    types: ['packeddiskedit'],
    icons: ['sop_packeddiskedit'],
    refKey: 'SOP_packeddiskedit',
    render: (uid) => {
      const gx = 15.2;
      const gy = 15.0;
      const hr = 1.65;
      const hole = `M${gx + hr},${gy} A${hr},${hr} 0 1,0 ${gx - hr},${gy} A${hr},${hr} 0 1,0 ${gx + hr},${gy} Z`;
      return (
        <g strokeLinejoin="round">
          <defs>
            <radialGradient id={`${uid}-disk-gear`} cx="38%" cy="34%" r="70%">
              <stop offset="0%" stopColor="#eef2f7" />
              <stop offset="55%" stopColor="#c0c7d1" />
              <stop offset="100%" stopColor="#89929e" />
            </radialGradient>
          </defs>
          <HardDriveChassis x={10.2} y={7.4} scale={0.92} />
          <path
            d={`${gearPath(gx, gy, 8, 5.4, 3.8)} ${hole}`}
            fill={`url(#${uid}-disk-gear)`}
            fillRule="evenodd"
            stroke="#262626"
            strokeWidth="0.95"
          />
        </g>
      );
    },
  },
  {
    id: 'sop.packededit',
    label: 'Packed Properties',
    family: 'sop',
    description:
      'Open brown and gold suitcase holding a white cylinder on the left and a white cone with red wireframe edges on the right.',
    types: ['packededit'],
    icons: ['sop_packededit'],
    refKey: 'SOP_packededit',
    render: () => (
      <OpenSuitcase>
        <TrayCylinder cx={-2.2} cy={-0.9} bodyFill="#eef2f7" topFill="#ffffff" />
        <g strokeLinejoin="round">
          <polygon points="2.5,-3.6 0.2,0.5 4.8,0.2" fill="#ffffff" stroke="#262626" strokeWidth="0.85" />
          <polyline points="0.6,0.3 2.5,-3.2 4.4,0.0" fill="none" stroke="#e03228" strokeWidth="0.8" />
        </g>
      </OpenSuitcase>
    ),
  },
  {
    id: 'sop.packinject',
    label: 'Pack Inject',
    family: 'sop',
    description:
      'Single black boot at upper left with a green curved arrow pointing down into a dual-bay isometric hard drive holding colored tile grids, and a second green arrow pointing up from the drive to a yellow tile at upper right.',
    types: ['packinject'],
    icons: ['sop_packinject'],
    refKey: 'SOP_packinject',
    render: () => {
      const inP1: Pt = [10.2, 8.6];
      const inP2: Pt = [10.1, 11.4];
      const inTip: Pt = [10.03, 13.4];
      const inHead = arrowHead(inTip, inP1, 2.5, 1.5);
      const outP1: Pt = [14.8, 11.6];
      const outP2: Pt = [15.9, 10.5];
      const outTip: Pt = [17.0, 9.4];
      const outHead = arrowHead(outTip, outP1, 2.5, 1.5);
      return (
        <g strokeLinejoin="round">
          <HardDriveChassis
            x={12.0}
            y={15.6}
            scale={0.96}
            leftBay={
              <ColoredTileGrid
                quad={HARD_DRIVE_LEFT_BAY}
                cols={2}
                rows={2}
                colors={['#58c848', '#8fc2ff', '#c084d8', '#eef2f7']}
              />
            }
            rightBay={
              <ColoredTileGrid
                quad={HARD_DRIVE_RIGHT_BAY}
                cols={2}
                rows={2}
                colors={['#8fc2ff', '#c0c7d1', '#c084d8', '#8fc2ff']}
              />
            }
          />
          {/* Lifted yellow tile moved higher at upper right */}
          <polygon points="16.2,4.4 21.8,7.1 17.8,9.1 12.2,6.4" fill="#ffe47a" stroke="#262626" strokeWidth="0.95" />
          {/* Single black boot at upper left */}
          <path
            d="M3.0,2.6 L6.2,2.6 L6.2,6.4 L8.8,7.0 L8.8,8.8 L3.0,8.8 Z"
            fill="#3a3f47"
            stroke="#262626"
            strokeWidth="0.95"
          />
          <line x1="3.6" y1="3.4" x2="5.6" y2="3.4" stroke="#89929e" strokeWidth="0.7" strokeLinecap="round" />
          {/* Green curved arrow from boot down into drive (tangent-aligned) */}
          <path
            d={`M8.8,5.8 Q${pts([inP1])} ${pts([inP2])}`}
            fill="none"
            stroke="#262626"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <path
            d={`M8.8,5.8 Q${pts([inP1])} ${pts([inP2])}`}
            fill="none"
            stroke="#58c848"
            strokeWidth="0.95"
            strokeLinecap="round"
          />
          <polygon points={pts(inHead)} fill="#58c848" stroke="#262626" strokeWidth="0.8" />
          {/* Green curved arrow from drive up to yellow tile (tangent-aligned) */}
          <path
            d={`M14.2,13.6 Q${pts([outP1])} ${pts([outP2])}`}
            fill="none"
            stroke="#262626"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <path
            d={`M14.2,13.6 Q${pts([outP1])} ${pts([outP2])}`}
            fill="none"
            stroke="#58c848"
            strokeWidth="0.95"
            strokeLinecap="round"
          />
          <polygon points={pts(outHead)} fill="#58c848" stroke="#262626" strokeWidth="0.8" />
        </g>
      );
    },
  },
  {
    id: 'sop.repack',
    label: 'Repack',
    family: 'sop',
    description: 'Open brown and gold suitcase holding a smaller open brown and gold suitcase nested inside its tray.',
    types: ['repack'],
    icons: ['sop_repack'],
    refKey: 'SOP_repack',
    render: () => (
      <OpenSuitcase x={12} y={13.0} scale={0.98}>
        <OpenSuitcase x={-0.3} y={-1.8} scale={0.58} />
      </OpenSuitcase>
    ),
  },
  {
    id: 'sop.mergepacked',
    label: 'Merge Packed',
    family: 'sop',
    description:
      'Two isometric colored tile grids at the top with two green arrows pointing down into an empty dual-bay isometric hard drive at the bottom.',
    types: ['mergepacked'],
    icons: ['sop_mergepacked'],
    refKey: 'SOP_mergepacked',
    render: () => {
      const topLeft: readonly [Pt, Pt, Pt, Pt] = [
        [6.8, 2.4],
        [11.4, 4.7],
        [6.8, 7.0],
        [2.2, 4.7],
      ];
      const topRight: readonly [Pt, Pt, Pt, Pt] = [
        [17.2, 2.4],
        [21.8, 4.7],
        [17.2, 7.0],
        [12.6, 4.7],
      ];
      const colors = ['#58c848', '#8fc2ff', '#c084d8', '#eef2f7'];
      const leftHead = arrowHead([9.5, 13.4], [7.5, 8.2], 3.0, 1.7);
      const rightHead = arrowHead([14.5, 13.4], [16.5, 8.2], 3.0, 1.7);
      return (
        <g strokeLinejoin="round">
          <HardDriveChassis x={12.0} y={15.8} scale={0.96} />
          {/* Two clear green downward arrows (thin base, crisp wide head) */}
          <line x1="7.4" y1="8.0" x2="8.8" y2="11.6" stroke="#262626" strokeWidth="1.9" strokeLinecap="round" />
          <line x1="7.4" y1="8.0" x2="8.8" y2="11.6" stroke="#58c848" strokeWidth="0.95" strokeLinecap="round" />
          <polygon points={pts(leftHead)} fill="#58c848" stroke="#262626" strokeWidth="0.8" />

          <line x1="16.6" y1="8.0" x2="15.2" y2="11.6" stroke="#262626" strokeWidth="1.9" strokeLinecap="round" />
          <line x1="16.6" y1="8.0" x2="15.2" y2="11.6" stroke="#58c848" strokeWidth="0.95" strokeLinecap="round" />
          <polygon points={pts(rightHead)} fill="#58c848" stroke="#262626" strokeWidth="0.8" />

          <ColoredTileGrid quad={topLeft} cols={2} rows={2} colors={colors} strokeWidth={0.75} />
          <ColoredTileGrid quad={topRight} cols={2} rows={2} colors={colors} strokeWidth={0.75} />
        </g>
      );
    },
  },
  {
    id: 'sop.unpack',
    label: 'Unpack',
    family: 'sop',
    description:
      'Open brown and gold suitcase at lower left holding a blue cylinder, with a yellow disc and cursor arrow at upper right.',
    types: ['unpack'],
    icons: ['sop_unpack'],
    refKey: 'SOP_unpack',
    render: () => (
      <>
        <OpenSuitcase x={10.2} y={13.8} scale={0.82}>
          <TrayCylinder cx={-2.0} cy={-0.9} bodyFill="#3672c4" topFill="#8fc2ff" />
        </OpenSuitcase>
        <circle cx="16.6" cy="6.6" r="3.1" fill="#ffe47a" stroke="#262626" strokeWidth="0.9" />
        <CursorArrow x={16.5} y={6.4} s={0.95} />
      </>
    ),
  },
  {
    id: 'sop.unpackfolder',
    label: 'Unpack Folder',
    family: 'sop',
    description:
      'Open lavender-trimmed white folder with an orange arrow pointing out toward upper left and a blue mannequin standing in front.',
    types: ['unpackfolder'],
    icons: ['sop_unpackfolder'],
    refKey: 'SOP_unpackfolder',
    render: () => (
      <>
        <path d={FOLDER_BACK_PATH} fill="#c084d8" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
        <polygon
          points="12.4,11.2 7.8,6.6 5.2,9.2 4.6,2.4 11.4,3.0 8.8,5.6 13.4,10.2"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points={FOLDER_SHEET_POINTS}
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <KinefxMannequinBase cx={16.6} cy={15.2} scale={0.62} />
      </>
    ),
  },
  {
    id: 'sop.unpackpoints',
    label: 'Unpack Points',
    family: 'sop',
    description:
      'Open brown and gold suitcase at lower left with grey shaded point spheres bursting toward upper right and a cursor arrow.',
    types: ['unpackpoints'],
    icons: ['sop_unpackpoints'],
    refKey: 'SOP_unpackpoints',
    render: (uid) => (
      <>
        <OpenSuitcase x={10.2} y={13.8} scale={0.82}>
          <ShadedSphere id={`${uid}-up-0`} cx={-1.8} cy={-0.8} r={1.5} tones={SPHERE_TONES.grey} strokeWidth={0.8} />
          <ShadedSphere id={`${uid}-up-1`} cx={1.2} cy={-1.1} r={1.5} tones={SPHERE_TONES.grey} strokeWidth={0.8} />
        </OpenSuitcase>
        <ShadedSphere id={`${uid}-up-2`} cx={13.6} cy={9.2} r={1.45} tones={SPHERE_TONES.grey} strokeWidth={0.8} />
        <ShadedSphere id={`${uid}-up-3`} cx={16.2} cy={6.6} r={1.5} tones={SPHERE_TONES.grey} strokeWidth={0.8} />
        <ShadedSphere id={`${uid}-up-4`} cx={19.0} cy={8.6} r={1.35} tones={SPHERE_TONES.grey} strokeWidth={0.8} />
        <ShadedSphere id={`${uid}-up-5`} cx={15.0} cy={4.2} r={1.25} tones={SPHERE_TONES.grey} strokeWidth={0.8} />
        <CursorArrow x={16.6} y={6.8} s={0.85} />
      </>
    ),
  },
  {
    id: 'sop.unpackusd',
    label: 'Unpack USD',
    family: 'sop',
    description:
      'Open brown and gold suitcase at lower left with three stacked blue USD layer frames floating out toward upper right.',
    types: ['unpackusd'],
    icons: ['sop_unpackusd'],
    refKey: 'SOP_unpackusd',
    render: () => (
      <>
        <OpenSuitcase x={10.0} y={14.0} scale={0.8} />
        <UsdLayerStack x={15.8} y={8.0} scale={0.72} />
      </>
    ),
  },
  {
    id: 'sop.packfolder',
    label: 'Pack Folder',
    family: 'sop',
    description:
      'Open lavender-trimmed white folder with a warm orange-red arrow pointing inside and a blue mannequin standing in front.',
    types: ['packfolder'],
    icons: ['sop_packfolder'],
    refKey: 'SOP_packfolder',
    render: () => (
      <>
        <path d={FOLDER_BACK_PATH} fill="#c084d8" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
        <polygon
          points={FOLDER_ARROW_POINTS}
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points={FOLDER_SHEET_POINTS}
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <KinefxMannequinBase cx={16.6} cy={15.2} scale={0.62} />
      </>
    ),
  },
  {
    id: 'sop.packedfoldercopy',
    label: 'Packed Folder Copy',
    family: 'sop',
    description: 'Two overlapping open purple-and-white folders representing a copied packed folder.',
    types: ['packedfoldercopy'],
    icons: ['sop_packedfoldercopy'],
    refKey: 'SOP_packedfoldercopy',
    render: () => (
      <>
        {[
          { dx: 0, dy: 0 },
          { dx: 4.4, dy: 4.6 },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.dx}, ${p.dy})`}>
            <path
              d="M2.2,4.2 L6.8,3.2 L8,4.5 L14.2,3.2 L15.2,14.2 L3,17.2 Z"
              fill="#ad7fa8"
              stroke="#5c3566"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            <polygon
              points="3,17.2 4.2,8.4 16.4,5.4 15.2,14.2"
              fill="#e3ecef"
              stroke="#525b66"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </>
    ),
  },
  {
    id: 'sop.packedfoldersplit',
    label: 'Packed Folder Split',
    family: 'sop',
    description:
      'Open lavender-trimmed white folder with two diverging orange arrows pointing outward and a blue mannequin standing in front.',
    types: ['packedfoldersplit'],
    icons: ['sop_packedfoldersplit'],
    refKey: 'SOP_packedfoldersplit',
    render: () => (
      <>
        <path
          d="M3,7.2 L8.4,6 L9.8,7.2 L16.8,5.6 L18,18.4 L4.2,21.6 Z"
          fill="#c084d8"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polygon
          points="9.6,11.6 5.6,8.2 4,9.8 3.6,4.4 9,4.8 7.4,6.4 11.2,9.8"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="11.2,11 15,7 13.4,5.4 18.6,5 18.2,10.2 16.6,8.6 12.8,12.4"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="4.2,21.6 5.6,12 19.2,8.4 18,18.4"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <KinefxMannequinBase cx={16.6} cy={15.4} scale={0.62} />
      </>
    ),
  },
  {
    id: 'sop.assemble',
    label: 'Assemble',
    family: 'sop',
    description: 'Egg-shaped mosaic of fractured colorful polygons separated by narrow gaps.',
    types: ['assemble'],
    icons: ['sop_assemble'],
    refKey: 'SOP_assemble',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="12,2.5 15.5,4.2 12.5,8 8.2,4.5" fill="#eef2f7" />
        <polygon points="7.5,5.5 11.5,8.8 7.5,12.5 4.2,9.5" fill="#5aa2f2" />
        <polygon points="16.5,5.2 19.8,9.8 15.2,11.8 13.2,8.5" fill="#c89eff" />
        <polygon points="12.2,9.5 14.8,12.5 11.5,15.5 8.8,12.8" fill="#f294a8" />
        <polygon points="4.2,11 7.8,13.8 7.5,18.2 4.5,15.5" fill="#e03228" />
        <polygon points="8.8,14.2 12.8,16.5 11.5,21.2 8.2,19.5" fill="#f2c438" />
        <polygon points="15.8,12.8 20,11.2 19.2,17.2 13.8,19.8" fill="#52d638" />
      </g>
    ),
  },
];
