import React from 'react';
import { arrowHead, isoBoxFaces, type Pt, pts, quadPt, roundedRectPath } from '../../geoHelpers';
import { CasedStroke, CursorArrow, StraightArrow } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

/**
 * The UV family.
 * Shared kit: `CheckerQuad`, `CheckerTile`, and `CheckerWarpGrid` for black-and-white UV
 * checker patterns mapped onto flat tiles, distorted quads, isometric boxes, and cylinders.
 */

const OUTLINE = '#262626';

const WHITE = '#f2f4f7';

const GREY_TOP = '#eef2f7';

const GREY_LEFT = '#c0c7d1';

const GREY_RIGHT = '#89929e';

const DARK = '#3a3f47';

const RED = '#e03228';

const BLUE = '#3672c4';

const LIGHT_BLUE = '#5aa2f2';

const YELLOW_HI = '#ffe47a';

const YELLOW = '#f2c438';

const TAN_HI = '#e8c48a';

const TAN = '#c89a5a';

/** Bilinear `cols` by `rows` black-and-white checker mapped onto any quad. */
const CheckerQuad: React.FC<{
  quad: readonly [Pt, Pt, Pt, Pt];
  cols?: number;
  rows?: number;
  light?: string;
  dark?: string;
  strokeWidth?: number;
  parity?: number;
}> = ({ quad, cols = 2, rows = 2, light = WHITE, dark = OUTLINE, strokeWidth = 1.0, parity = 0 }) => {
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const p0 = quadPt(quad, c / cols, r / rows);
      const p1 = quadPt(quad, (c + 1) / cols, r / rows);
      const p2 = quadPt(quad, (c + 1) / cols, (r + 1) / rows);
      const p3 = quadPt(quad, c / cols, (r + 1) / rows);
      const isDark = (r + c + parity) % 2 === 1;
      cells.push(<polygon key={`${r}-${c}`} points={pts([p0, p1, p2, p3])} fill={isDark ? dark : light} />);
    }
  }
  return (
    <g>
      {cells}
      <polygon points={pts(quad)} fill="none" stroke={OUTLINE} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </g>
  );
};

/** Flat axis-aligned 2x2 UV checker tile. */
const CheckerTile: React.FC<{
  x: number;
  y: number;
  size: number;
  light?: string;
  dark?: string;
  strokeWidth?: number;
}> = ({ x, y, size, light = WHITE, dark = OUTLINE, strokeWidth = 1.05 }) => (
  <CheckerQuad
    quad={[
      [x, y],
      [x + size, y],
      [x + size, y + size],
      [x, y + size],
    ]}
    cols={2}
    rows={2}
    light={light}
    dark={dark}
    strokeWidth={strokeWidth}
  />
);

/** 2x2 checker defined by a 3x3 grid of control points `[row][col]` so the center can warp. */
const CheckerWarpGrid: React.FC<{
  grid: readonly [readonly [Pt, Pt, Pt], readonly [Pt, Pt, Pt], readonly [Pt, Pt, Pt]];
  light?: string;
  dark?: string;
  strokeWidth?: number;
}> = ({ grid, light = WHITE, dark = OUTLINE, strokeWidth = 1.05 }) => {
  const outer = [grid[0][0], grid[0][2], grid[2][2], grid[2][0]];
  return (
    <g>
      <polygon points={pts([grid[0][0], grid[0][1], grid[1][1], grid[1][0]])} fill={light} />
      <polygon points={pts([grid[0][1], grid[0][2], grid[1][2], grid[1][1]])} fill={dark} />
      <polygon points={pts([grid[1][0], grid[1][1], grid[2][1], grid[2][0]])} fill={dark} />
      <polygon points={pts([grid[1][1], grid[1][2], grid[2][2], grid[2][1]])} fill={light} />
      <polygon points={pts(outer)} fill="none" stroke={OUTLINE} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </g>
  );
};

const SPHERE_CELLS = (() => {
  const cx = 12;
  const cy = 12;
  const r = 9.0;
  const tilt = (14 * Math.PI) / 180;
  const cosT = Math.cos(tilt);
  const sinT = Math.sin(tilt);
  const proj = (latDeg: number, lonDeg: number): Pt => {
    const lat = (latDeg * Math.PI) / 180;
    const lon = (lonDeg * Math.PI) / 180;
    const x3 = Math.cos(lat) * Math.sin(lon);
    const y3 = Math.sin(lat);
    const z3 = Math.cos(lat) * Math.cos(lon);
    const yRot = y3 * cosT - z3 * sinT;
    return [cx + x3 * r, cy - yRot * r];
  };
  const lats = [-88, -42, 0, 42, 88];
  const lons = [-90, -56, -20, 16, 52, 90];
  const darkPaths: string[] = [];
  for (let row = 0; row < lats.length - 1; row += 1) {
    for (let col = 0; col < lons.length - 1; col += 1) {
      if ((row + col) % 2 !== 0) continue;
      const lat0 = lats[row];
      const lat1 = lats[row + 1];
      const lon0 = lons[col];
      const lon1 = lons[col + 1];
      const ring: Pt[] = [];
      const steps = 4;
      for (let i = 0; i < steps; i += 1) ring.push(proj(lat0, lon0 + ((lon1 - lon0) * i) / steps));
      for (let i = 0; i < steps; i += 1) ring.push(proj(lat0 + ((lat1 - lat0) * i) / steps, lon1));
      for (let i = 0; i < steps; i += 1) ring.push(proj(lat1, lon1 - ((lon1 - lon0) * i) / steps));
      for (let i = 0; i < steps; i += 1) ring.push(proj(lat1 - ((lat1 - lat0) * i) / steps, lon0));
      darkPaths.push(`M${pts(ring).replace(/ /g, ' L')} Z`);
    }
  }
  return darkPaths;
})();

/**
 * UV operators.
 */
export const UV_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.uvautoseam',
    label: 'UV Auto Seam',
    family: 'sop',
    description:
      'Tan teddy bear facing forward-right with equal-sized ears, dark eyes and nose, and clean red dashed seam lines along its forehead, both ear bases, shoulder joints, center torso, and hip joints.',
    types: ['uvautoseam'],
    icons: ['sop_uvautoseam'],
    refKey: 'SOP_uvautoseam',
    render: () => (
      <>
        {/* Ears (equal size and symmetry around head) */}
        <circle cx="7.3" cy="4.7" r="2.2" fill={TAN} stroke={OUTLINE} strokeWidth="0.95" />
        <circle cx="16.0" cy="5.2" r="2.2" fill={TAN} stroke={OUTLINE} strokeWidth="0.95" />
        {/* Legs */}
        <ellipse
          cx="8.0"
          cy="18.6"
          rx="2.3"
          ry="2.9"
          transform="rotate(18 8 18.6)"
          fill={TAN}
          stroke={OUTLINE}
          strokeWidth="0.95"
        />
        <ellipse
          cx="15.4"
          cy="18.8"
          rx="2.3"
          ry="2.9"
          transform="rotate(-18 15.4 18.8)"
          fill={TAN}
          stroke={OUTLINE}
          strokeWidth="0.95"
        />
        {/* Arms */}
        <ellipse
          cx="5.8"
          cy="13.2"
          rx="2.6"
          ry="1.7"
          transform="rotate(-24 5.8 13.2)"
          fill={TAN_HI}
          stroke={OUTLINE}
          strokeWidth="0.95"
        />
        <ellipse
          cx="17.8"
          cy="12.6"
          rx="2.7"
          ry="1.7"
          transform="rotate(24 17.8 12.6)"
          fill={TAN_HI}
          stroke={OUTLINE}
          strokeWidth="0.95"
        />
        {/* Torso */}
        <ellipse cx="11.6" cy="15.0" rx="4.2" ry="4.4" fill={TAN_HI} stroke={OUTLINE} strokeWidth="1.05" />
        {/* Head */}
        <circle cx="11.5" cy="8.1" r="4.5" fill={TAN_HI} stroke={OUTLINE} strokeWidth="1.05" />
        {/* Muzzle */}
        <ellipse cx="11.0" cy="9.2" rx="2.1" ry="1.5" fill={WHITE} stroke={OUTLINE} strokeWidth="0.7" />
        <ellipse cx="10.7" cy="8.7" rx="0.85" ry="0.6" fill={OUTLINE} />
        <circle cx="9.2" cy="7.0" r="0.7" fill={OUTLINE} />
        <circle cx="12.6" cy="6.8" r="0.7" fill={OUTLINE} />
        {/* Clean red dashed seams: both ear bases, vertical head, vertical body, arm joints, leg joints */}
        <g fill="none" stroke={RED} strokeWidth="0.85" strokeLinecap="round" strokeDasharray="1.25 1.1">
          <path d="M6.4,6.4 Q7.8,5.6 8.8,4.1" />
          <path d="M14.1,4.3 Q15.1,5.6 16.0,7.0" />
          <path d="M11.6,4.0 Q11.3,5.8 10.9,7.6" />
          <path d="M12.0,12.2 Q12.6,15.0 12.1,18.0" />
          <path d="M8.1,12.0 Q8.9,13.2 8.4,14.6" />
          <path d="M15.1,11.9 Q14.3,13.1 14.8,14.4" />
          <path d="M7.6,16.8 Q8.9,17.4 9.7,18.5" />
          <path d="M15.5,16.8 Q14.2,17.4 13.6,18.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.uvbrush',
    label: 'UV Brush',
    family: 'sop',
    description:
      'Flat 2x2 black-and-white checker tile in the lower left overlapped by a circular lens in the upper right showing a bulged checker inside a red-and-white dashed ring.',
    types: ['uvbrush'],
    icons: ['sop_uvbrush'],
    refKey: 'SOP_uvbrush',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-lens`}>
            <circle cx="14.8" cy="9.2" r="6.3" />
          </clipPath>
        </defs>
        <CheckerTile x={2.6} y={5.0} size={14.8} />
        <g clipPath={`url(#${uid}-lens)`}>
          <circle cx="14.8" cy="9.2" r="6.5" fill={WHITE} />
          <path d="M8.3,9.2 Q14.8,6.6 21.3,9.2 L21.3,2.7 L14.8,2.7 Q17.6,9.2 14.8,15.7 L8.3,15.7 Z" fill={OUTLINE} />
          <path
            d="M14.8,2.7 Q17.6,9.2 14.8,15.7 L8.3,15.7 L8.3,9.2 Q14.8,6.6 21.3,9.2 L21.3,15.7 L14.8,15.7 Z"
            fill="none"
          />
          <path d="M8.3,9.2 Q14.8,6.6 21.3,9.2 L21.3,2.7 L14.8,2.7 Z" fill={WHITE} />
          <path d="M14.8,2.7 Q17.6,9.2 14.8,9.2 L21.3,9.2 L21.3,2.7 Z" fill={OUTLINE} />
          <path d="M8.3,9.2 Q11.8,9.6 14.8,9.2 Q13.2,12.8 14.8,15.7 L8.3,15.7 Z" fill={OUTLINE} />
        </g>
        <circle cx="14.8" cy="9.2" r="6.3" fill="none" stroke={OUTLINE} strokeWidth="2.0" />
        <circle cx="14.8" cy="9.2" r="6.3" fill="none" stroke={WHITE} strokeWidth="1.2" />
        <circle cx="14.8" cy="9.2" r="6.3" fill="none" stroke={RED} strokeWidth="1.2" strokeDasharray="1.8 1.5" />
      </>
    ),
  },
  {
    id: 'sop.uvedit',
    label: 'UV Edit',
    family: 'sop',
    description:
      'Flat 2x2 black-and-white checker tile whose center vertex is pulled down-right by a white cursor arrow.',
    types: ['uvedit'],
    icons: ['sop_uvedit'],
    refKey: 'SOP_uvedit',
    render: () => (
      <>
        <CheckerWarpGrid
          grid={[
            [
              [2.8, 2.8],
              [11.2, 2.8],
              [19.6, 2.8],
            ],
            [
              [2.8, 11.2],
              [14.0, 13.6],
              [19.6, 11.2],
            ],
            [
              [2.8, 19.6],
              [11.2, 19.6],
              [19.6, 19.6],
            ],
          ]}
        />
        <CursorArrow x={14.0} y={13.6} s={1.08} />
      </>
    ),
  },
  {
    id: 'sop.uvflatten',
    label: 'UV Flatten',
    family: 'sop',
    description:
      'Isometric 2x2 black-and-white checker cube with red dashed seam lines along its front-facing upper and vertical edges and assembled red-handled scissors above.',
    types: ['uvflatten'],
    icons: ['sop_uvflatten', 'sop_uvflatten-2.0', 'sop_uvflatten-3.0'],
    refKey: 'SOP_uvflatten',
    render: () => {
      const box = isoBoxFaces(12.6, 5.8, 7.0, 8.0);
      return (
        <>
          <CheckerQuad quad={box.top as [Pt, Pt, Pt, Pt]} light={WHITE} dark={DARK} strokeWidth={0.95} />
          <CheckerQuad quad={box.left as [Pt, Pt, Pt, Pt]} light={GREY_TOP} dark={OUTLINE} strokeWidth={0.95} />
          <CheckerQuad
            quad={box.right as [Pt, Pt, Pt, Pt]}
            light={GREY_LEFT}
            dark={OUTLINE}
            strokeWidth={0.95}
            parity={1}
          />
          {/* Red dashed cut seams: front-facing upper edges + front vertical edge */}
          <g fill="none" stroke={RED} strokeWidth="1.05" strokeDasharray="1.5 1.1" strokeLinejoin="round">
            <path d={`M${pts([box.top[3], box.top[2], box.top[1]])}`.replace(/ /g, ' L')} />
            <path d={`M${pts([box.top[2], box.left[2]])}`.replace(/ /g, ' L')} />
          </g>
          {/* Assembled scissors (same construction as PolyScissors) */}
          <g transform="translate(9.8, 6.6) rotate(-18) scale(0.84)">
            <path
              d="M-1.5,-1.65 L4.8,-2.45 L8.0,-2.45 L-1.2,0.6 Z"
              fill={GREY_TOP}
              stroke={OUTLINE}
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
            <path
              d="M-1.5,1.65 L4.8,2.45 L8.0,2.45 L-1.2,-0.6 Z"
              fill="#ffffff"
              stroke={OUTLINE}
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
            <path d="M-1.5,0.6 L-3.6,1.6" stroke={OUTLINE} strokeWidth="1.9" strokeLinecap="round" />
            <path d="M-1.5,0.6 L-3.6,1.6" stroke={RED} strokeWidth="0.95" strokeLinecap="round" />
            <ellipse
              cx="-5.4"
              cy="2.2"
              rx="2.1"
              ry="1.4"
              transform="rotate(-14 -5.4 2.2)"
              fill="none"
              stroke={OUTLINE}
              strokeWidth="2.1"
            />
            <ellipse
              cx="-5.4"
              cy="2.2"
              rx="2.1"
              ry="1.4"
              transform="rotate(-14 -5.4 2.2)"
              fill="none"
              stroke={RED}
              strokeWidth="1.05"
            />
            <path d="M-1.5,-0.6 L-3.6,-1.6" stroke={OUTLINE} strokeWidth="1.9" strokeLinecap="round" />
            <path d="M-1.5,-0.6 L-3.6,-1.6" stroke={RED} strokeWidth="0.95" strokeLinecap="round" />
            <ellipse
              cx="-5.4"
              cy="-2.2"
              rx="2.1"
              ry="1.4"
              transform="rotate(14 -5.4 -2.2)"
              fill="none"
              stroke={OUTLINE}
              strokeWidth="2.1"
            />
            <ellipse
              cx="-5.4"
              cy="-2.2"
              rx="2.1"
              ry="1.4"
              transform="rotate(14 -5.4 -2.2)"
              fill="none"
              stroke={RED}
              strokeWidth="1.05"
            />
            <circle cx="-0.4" cy="0" r="0.65" fill={OUTLINE} />
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.uvflattenfrompoints',
    label: 'UV Flatten from Points',
    family: 'sop',
    description:
      'Orange sitting rabbit facing left in side profile with repeating yellow-to-orange UV gradient waves radiating outward from its tail.',
    types: ['uvflattenfrompoints'],
    icons: ['sop_uvflattenfrompoints'],
    refKey: 'SOP_uvflattenfrompoints',
    render: (uid) => (
      <>
        <defs>
          <radialGradient
            id={`${uid}-bunny`}
            gradientUnits="userSpaceOnUse"
            cx="19.6"
            cy="16.2"
            r="5.6"
            spreadMethod="repeat"
          >
            <stop offset="0%" stopColor={YELLOW_HI} />
            <stop offset="45%" stopColor={YELLOW} />
            <stop offset="85%" stopColor="#ee8624" />
            <stop offset="100%" stopColor={YELLOW_HI} />
          </radialGradient>
        </defs>
        {/* Back ear */}
        <ellipse
          cx="10.8"
          cy="5.4"
          rx="1.5"
          ry="3.4"
          transform="rotate(24 10.8 5.4)"
          fill={`url(#${uid}-bunny)`}
          stroke={OUTLINE}
          strokeWidth="0.95"
        />
        {/* Tail */}
        <circle cx="19.6" cy="16.2" r="1.7" fill={`url(#${uid}-bunny)`} stroke={OUTLINE} strokeWidth="0.95" />
        {/* Body */}
        <path
          d="M7.6,12.4 C9.6,10.2 14.4,10.2 17.8,12.6 C20.0,14.2 19.6,18.4 16.4,19.4 L6.4,19.4 C5.4,19.4 5.2,18.2 6.2,17.4 L7.4,16.4 Z"
          fill={`url(#${uid}-bunny)`}
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Tucked hind leg */}
        <path
          d="M11.6,15.0 C14.6,13.6 17.8,15.6 16.8,18.4 C16.0,19.6 13.0,19.6 11.4,19.4 Z"
          fill={`url(#${uid}-bunny)`}
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Head */}
        <path
          d="M4.2,9.8 C4.2,7.6 6.2,6.4 8.6,6.8 C10.4,7.2 11.2,9.0 10.6,10.8 C10.0,12.4 7.8,12.6 5.8,12.2 C4.6,11.8 4.2,11.0 4.2,9.8 Z"
          fill={`url(#${uid}-bunny)`}
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Front ear */}
        <ellipse
          cx="10.2"
          cy="5.8"
          rx="1.4"
          ry="3.5"
          transform="rotate(34 10.2 5.8)"
          fill={`url(#${uid}-bunny)`}
          stroke={OUTLINE}
          strokeWidth="0.95"
        />
        {/* Eye */}
        <circle cx="6.2" cy="8.8" r="0.65" fill={OUTLINE} />
      </>
    ),
  },
  {
    id: 'sop.uvfuse',
    label: 'UV Fuse',
    family: 'sop',
    description:
      'Split 2x2 black-and-white checker tile with a V-shaped gap at the top, a red dashed seam line with vertex squares, and two inward red arrows above.',
    types: ['uvfuse'],
    icons: ['sop_uvfuse'],
    refKey: 'SOP_uvfuse',
    render: () => (
      <>
        <CheckerQuad
          quad={[
            [2.4, 9.6],
            [8.4, 9.6],
            [12.0, 20.6],
            [2.4, 20.6],
          ]}
          cols={2}
          rows={2}
          strokeWidth={1.0}
        />
        <CheckerQuad
          quad={[
            [15.6, 9.6],
            [21.6, 9.6],
            [21.6, 20.6],
            [12.0, 20.6],
          ]}
          cols={2}
          rows={2}
          parity={1}
          strokeWidth={1.0}
        />
        {/* Red dashed fuse line and vertex squares */}
        <line x1="8.4" y1="9.6" x2="15.6" y2="9.6" stroke={RED} strokeWidth="1.35" strokeDasharray="1.8 1.2" />
        <rect x="7.4" y="8.6" width="2.0" height="2.0" fill={WHITE} stroke={OUTLINE} strokeWidth="0.8" />
        <rect x="14.6" y="8.6" width="2.0" height="2.0" fill={WHITE} stroke={OUTLINE} strokeWidth="0.8" />
        {/* Inward red arrows */}
        <StraightArrow from={[3.2, 4.8]} tip={[10.4, 4.8]} color={RED} width={1.5} head={3.0} />
        <StraightArrow from={[20.8, 4.8]} tip={[13.6, 4.8]} color={RED} width={1.5} head={3.0} />
      </>
    ),
  },
  {
    id: 'sop.uvlayout',
    label: 'UV Layout',
    family: 'sop',
    description: 'Rounded square divided into four interlocking 2x2 puzzle pieces in black-and-white checker colors.',
    types: ['uvlayout'],
    icons: ['sop_uvlayout', 'sop_uvlayout-2.0', 'sop_uvlayout-3.0'],
    refKey: 'SOP_uvlayout',
    render: () => (
      <>
        {/* Top-left white piece */}
        <path
          d="M4.6,2.8 H12.0 V5.6 C13.5,5.6 13.8,8.4 12.0,8.4 V12.0 H8.4 C8.4,10.2 5.6,10.2 5.6,12.0 H2.8 V4.6 Q2.8,2.8 4.6,2.8 Z"
          fill={WHITE}
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Top-right dark piece */}
        <path
          d="M12.0,2.8 H19.4 Q21.2,2.8 21.2,4.6 V12.0 H18.4 C18.4,13.6 15.6,13.6 15.6,12.0 H12.0 V8.4 C13.8,8.4 13.5,5.6 12.0,5.6 Z"
          fill={DARK}
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Bottom-left dark piece */}
        <path
          d="M2.8,12.0 H5.6 C5.6,10.2 8.4,10.2 8.4,12.0 H12.0 V15.6 C10.2,15.6 10.2,18.4 12.0,18.4 V21.2 H4.6 Q2.8,21.2 2.8,19.4 Z"
          fill={DARK}
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Bottom-right white piece */}
        <path
          d="M12.0,12.0 H15.6 C15.6,13.6 18.4,13.6 18.4,12.0 H21.2 V19.4 Q21.2,21.2 19.4,21.2 H12.0 V18.4 C10.2,18.4 10.2,15.6 12.0,15.6 Z"
          fill={WHITE}
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.uvpelt',
    label: 'UV Pelt',
    family: 'sop',
    description:
      'Pin-cushion-warped 3x3 black-and-white checker patch surrounded by curved red tension arcs and four corner arrowheads pointing outward.',
    types: ['uvpelt'],
    icons: ['sop_uvpelt', 'sop_uvpelt-2.0'],
    refKey: 'SOP_uvpelt',
    render: () => {
      const corners: readonly [Pt, Pt][] = [
        [
          [2.0, 2.0],
          [5.8, 5.8],
        ],
        [
          [22.0, 2.0],
          [18.2, 5.8],
        ],
        [
          [22.0, 22.0],
          [18.2, 18.2],
        ],
        [
          [2.0, 22.0],
          [5.8, 18.2],
        ],
      ];
      return (
        <>
          {/* Central pin-cushion checker patch */}
          <path
            d="M5.6,5.6 Q12.0,7.4 18.4,5.6 Q16.6,12.0 18.4,18.4 Q12.0,16.6 5.6,18.4 Q7.4,12.0 5.6,5.6 Z"
            fill={WHITE}
            stroke={OUTLINE}
            strokeWidth="1.0"
            strokeLinejoin="round"
          />
          {/* 3x3 checker dark cells: corners + center */}
          <path d="M5.6,5.6 Q8.0,6.2 10.0,6.4 L10.0,10.0 L6.4,10.0 Q6.2,8.0 5.6,5.6 Z" fill={OUTLINE} />
          <path d="M18.4,5.6 Q17.8,8.0 17.6,10.0 L14.0,10.0 L14.0,6.4 Q16.0,6.2 18.4,5.6 Z" fill={OUTLINE} />
          <rect x="10.0" y="10.0" width="4.0" height="4.0" fill={OUTLINE} />
          <path d="M5.6,18.4 Q6.2,16.0 6.4,14.0 L10.0,14.0 L10.0,17.6 Q8.0,17.8 5.6,18.4 Z" fill={OUTLINE} />
          <path d="M18.4,18.4 Q16.0,17.8 14.0,17.6 L14.0,14.0 L17.6,14.0 Q17.8,16.0 18.4,18.4 Z" fill={OUTLINE} />
          {/* Red tension arcs inside the corner arrowheads */}
          <CasedStroke
            d="M4.6,4.2 Q12.0,6.4 19.4,4.2 M19.8,4.6 Q17.6,12.0 19.8,19.4 M19.4,19.8 Q12.0,17.6 4.6,19.8 M4.2,19.4 Q6.4,12.0 4.2,4.6"
            color={RED}
            width={1.1}
            casing={2.0}
          />
          {/* Four corner arrowheads pointing outward */}
          {corners.map(([tip, from], idx) => (
            <polygon
              key={idx}
              points={pts(arrowHead(tip, from, 3.2, 2.0))}
              fill={RED}
              stroke={OUTLINE}
              strokeWidth="0.85"
              strokeLinejoin="round"
            />
          ))}
        </>
      );
    },
  },
  {
    id: 'sop.uvproject',
    label: 'UV Project',
    family: 'sop',
    description:
      'Vertical grey cylinder on the left with a curved 2x2 black-and-white checker plane hovering slightly to the right and a red arrow pushing it toward the cylinder.',
    types: ['uvproject'],
    icons: ['sop_uvproject'],
    refKey: 'SOP_uvproject',
    render: () => (
      <>
        {/* Cylinder body on the left */}
        <path
          d="M3.2,5.0 V16.4 A4.5,1.9 0 0,0 12.2,16.4 V5.0 Z"
          fill={GREY_LEFT}
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Top ellipse */}
        <ellipse cx="7.7" cy="5.0" rx="4.5" ry="1.9" fill={GREY_TOP} stroke={OUTLINE} strokeWidth="1.05" />
        {/* Curved checker plane hovering to the right of the cylinder */}
        <path
          d="M7.6,10.0 A5.2,2.1 0 0,0 12.4,11.8 V15.4 A5.2,2.1 0 0,1 7.6,13.6 Z"
          fill={WHITE}
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M12.4,11.8 A5.2,2.1 0 0,0 17.0,9.8 V13.4 A5.2,2.1 0 0,1 12.4,15.4 Z"
          fill={OUTLINE}
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M7.6,13.6 A5.2,2.1 0 0,0 12.4,15.4 V19.0 A5.2,2.1 0 0,1 7.6,17.2 Z"
          fill={OUTLINE}
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M12.4,15.4 A5.2,2.1 0 0,0 17.0,13.4 V17.0 A5.2,2.1 0 0,1 12.4,19.0 Z"
          fill={GREY_TOP}
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Red arrow pushing the curved plane toward the cylinder */}
        <StraightArrow from={[21.8, 17.6]} tip={[15.8, 14.8]} color={RED} width={1.8} head={3.4} />
      </>
    ),
  },
  {
    id: 'sop.uvquickshade',
    label: 'UV Quick Shade',
    family: 'sop',
    description: 'Vertical cylinder wrapped in a 2-row black-and-white checker band with a grey lit top cap.',
    types: ['uvquickshade'],
    icons: ['sop_uvquickshade'],
    refKey: 'SOP_uvquickshade',
    render: () => (
      <>
        {/* 2x3 checker cylinder wall */}
        {/* Left column */}
        <path d="M5.2,6.2 A6.8,2.6 0 0,0 9.6,8.4 V13.4 A6.8,2.6 0 0,1 5.2,11.2 Z" fill={WHITE} />
        <path d="M5.2,11.2 A6.8,2.6 0 0,0 9.6,13.4 V18.4 A6.8,2.6 0 0,1 5.2,16.2 Z" fill={OUTLINE} />
        {/* Middle column */}
        <path d="M9.6,8.4 A6.8,2.6 0 0,0 14.4,8.4 V13.4 A6.8,2.6 0 0,1 9.6,13.4 Z" fill={OUTLINE} />
        <path d="M9.6,13.4 A6.8,2.6 0 0,0 14.4,13.4 V18.4 A6.8,2.6 0 0,1 9.6,18.4 Z" fill={GREY_LEFT} />
        {/* Right column */}
        <path d="M14.4,8.4 A6.8,2.6 0 0,0 18.8,6.2 V11.2 A6.8,2.6 0 0,1 14.4,13.4 Z" fill={GREY_RIGHT} />
        <path d="M14.4,13.4 A6.8,2.6 0 0,0 18.8,11.2 V16.2 A6.8,2.6 0 0,1 14.4,18.4 Z" fill={OUTLINE} />
        {/* Cylinder outline */}
        <path
          d="M5.2,6.2 V16.2 A6.8,2.6 0 0,0 18.8,16.2 V6.2 Z"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Top cap */}
        <ellipse cx="12" cy="6.2" rx="6.8" ry="2.6" fill={GREY_TOP} stroke={OUTLINE} strokeWidth="1.05" />
        <ellipse cx="12" cy="6.2" rx="4.4" ry="1.4" fill={GREY_LEFT} stroke={OUTLINE} strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.uvtransform',
    label: 'UV Transform',
    family: 'sop',
    description: 'Flat 2x2 black-and-white checker tile with a 4-way blue move cross-arrow centered on top.',
    types: ['uvtransform'],
    icons: ['sop_uvtransform', 'sop_uvtransform-2.0'],
    refKey: 'SOP_uvtransform',
    render: () => (
      <>
        <CheckerTile x={2.8} y={2.8} size={18.4} />
        <path
          d="M12,4.2 L15.2,7.6 H13.4 V10.6 H16.4 V8.8 L19.8,12 L16.4,15.2 V13.4 H13.4 V16.4 H15.2 L12,19.8 L8.8,16.4 H10.6 V13.4 H7.6 V15.2 L4.2,12 L7.6,8.8 V10.6 H10.6 V7.6 H8.8 Z"
          fill={BLUE}
          stroke={OUTLINE}
          strokeWidth="1.0"
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
      'Open unfolded box with a light grey interior bottom, four outward-flaring 2x2 black-and-white checker flaps, and a top checker lid connected to the upper-right flap.',
    types: ['uvunwrap'],
    icons: ['sop_uvunwrap'],
    refKey: 'SOP_uvunwrap',
    render: () => {
      const backLeft: readonly [Pt, Pt, Pt, Pt] = [
        [3.8, 8.6],
        [10.8, 4.4],
        [12.0, 10.2],
        [5.8, 13.8],
      ];
      const backRight: readonly [Pt, Pt, Pt, Pt] = [
        [14.2, 5.6],
        [20.4, 8.8],
        [18.2, 13.8],
        [12.0, 10.2],
      ];
      const lid: readonly [Pt, Pt, Pt, Pt] = [
        [12.2, 2.2],
        [18.6, 5.0],
        [20.4, 8.8],
        [14.2, 5.6],
      ];
      const bot: readonly [Pt, Pt, Pt, Pt] = [
        [12.0, 10.2],
        [18.2, 13.8],
        [12.0, 20.8],
        [5.8, 13.8],
      ];
      const frontLeft: readonly [Pt, Pt, Pt, Pt] = [
        [2.2, 11.8],
        [7.6, 16.0],
        [12.0, 20.8],
        [5.8, 16.0],
      ];
      const frontRight: readonly [Pt, Pt, Pt, Pt] = [
        [16.4, 16.0],
        [21.8, 11.8],
        [18.2, 16.0],
        [12.0, 20.8],
      ];
      return (
        <>
          <CheckerQuad quad={lid} light={WHITE} strokeWidth={0.95} />
          <CheckerQuad quad={backLeft} light={WHITE} strokeWidth={0.95} />
          <CheckerQuad quad={backRight} light={GREY_TOP} parity={1} strokeWidth={0.95} />
          <polygon points={pts(bot)} fill={GREY_TOP} stroke={OUTLINE} strokeWidth="1.0" strokeLinejoin="round" />
          <CheckerQuad quad={frontLeft} light={WHITE} parity={1} strokeWidth={0.95} />
          <CheckerQuad quad={frontRight} light={GREY_LEFT} strokeWidth={0.95} />
        </>
      );
    },
  },
  {
    id: 'sop.udimlist',
    label: 'UDIM List',
    family: 'sop',
    description: 'Flat 2x2 grid of four colored UDIM tiles: yellow, light blue, blue, and red.',
    types: ['udimlist'],
    icons: ['sop_udimlist'],
    refKey: 'SOP_udimlist',
    render: () => (
      <>
        <rect x="3.2" y="3.2" width="8.8" height="8.8" fill={YELLOW} />
        <rect x="12.0" y="3.2" width="8.8" height="8.8" fill={LIGHT_BLUE} />
        <rect x="3.2" y="12.0" width="8.8" height="8.8" fill={BLUE} />
        <rect x="12.0" y="12.0" width="8.8" height="8.8" fill={RED} />
        <path
          d={`${roundedRectPath(3.2, 3.2, 17.6, 17.6, 1.0)} M12,3.2 V20.8 M3.2,12 H20.8`}
          fill="none"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.texture',
    label: 'UV Texture',
    family: 'sop',
    description:
      'Sphere covered in a regular latitude and longitude black-and-white checker grid, lit from the upper left.',
    types: ['texture'],
    icons: ['sop_texture'],
    refKey: 'SOP_texture',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-tex`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="58%" stopColor={GREY_LEFT} />
            <stop offset="100%" stopColor={GREY_RIGHT} />
          </radialGradient>
          <clipPath id={`${uid}-clip`}>
            <circle cx="12" cy="12" r="9.0" />
          </clipPath>
        </defs>
        <circle cx="12" cy="12" r="9.0" fill={`url(#${uid}-tex)`} />
        <g clipPath={`url(#${uid}-clip)`} fill={OUTLINE}>
          {SPHERE_CELLS.map((d, idx) => (
            <path key={idx} d={d} />
          ))}
        </g>
        <circle cx="12" cy="12" r="9.0" fill="none" stroke={OUTLINE} strokeWidth="1.15" />
      </>
    ),
  },
];
