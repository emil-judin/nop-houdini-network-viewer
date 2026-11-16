import React from 'react';
import type { OperatorIconDef } from '../iconTypes';

/**
 * Standardized family base shapes and components for NOP SOP icons.
 * Follows docs/ICON_ART_BIBLE.md and docs/ICON_AI_BRIEF.md strictly:
 * - 24x24 canvas space, mass centered at (12, 12), shapes within 2..22.
 * - Outlines: #262626 at strokeWidth 1.1 to 1.2 (inner details 0.8 to 0.9).
 * - Cased lines: #262626 2.6 to 3.8 under 1.4 to 2.0 colored/light stroke.
 * - Three-tone isometric shading for solids: light top #eef2f7, mid left #c0c7d1, dark right #89929e.
 * - Core NOP palette only (zero SideFX Tango colors).
 * - Zero en-dashes or em-dashes.
 */

// 1. VOLUME CLOUD (SOP_cloud): Clean pure-white cumulus cloud with crisp dark outline
export const VolumeCloudBase: React.FC<{ uid?: string; cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Peaked cauliflower cumulus silhouette kept crisp pure white inside */}
    <path
      d="M5.2 17.6C3.2 17.2 2.4 15.2 3.4 13.4C3.8 11.4 5.4 10.4 7.0 10.6C7.6 8.2 9.2 7.2 10.6 7.0C11.4 4.4 14.8 4.4 15.8 7.2C17.8 7.4 19.2 9.0 19.0 11.0C21.0 11.4 22.0 13.4 21.0 15.4C20.2 17.0 18.4 17.4 16.8 17.0C15.2 18.2 12.6 18.4 10.8 17.6C9.0 18.6 6.8 18.4 5.2 17.6Z"
      fill="#ffffff"
      stroke="#262626"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
  </g>
);

// 2. OPENVDB LOGO (SOP_OpenVDB): Clean red infinity ribbon on top, bold white VDB letters below
export const VdbLogoBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Cased red figure-8 infinity ribbon */}
    <path
      d="M12 7.8C9.6 3.6 3.5 3.6 3.5 7.8C3.5 12 9.6 12 12 7.8C14.4 3.6 20.5 3.6 20.5 7.8C20.5 12 14.4 12 12 7.8Z"
      fill="none"
      stroke="#262626"
      strokeWidth="3.8"
      strokeLinejoin="round"
    />
    <path
      d="M12 7.8C9.6 3.6 3.5 3.6 3.5 7.8C3.5 12 9.6 12 12 7.8C14.4 3.6 20.5 3.6 20.5 7.8C20.5 12 14.4 12 12 7.8Z"
      fill="none"
      stroke="#e03228"
      strokeWidth="2.0"
      strokeLinejoin="round"
    />
    {/* Bold outlined VDB text matching Houdini OpenVDB emblem */}
    <text
      x="12"
      y="20.2"
      textAnchor="middle"
      fill="#f2f4f7"
      stroke="#262626"
      strokeWidth="1.8"
      paintOrder="stroke"
      strokeLinejoin="round"
      fontSize="7.4"
      fontWeight="900"
      fontFamily="sans-serif"
      letterSpacing="0.4"
    >
      VDB
    </text>
  </g>
);

/** Draws one stepped 3D isometric terrain tile column at grid center top `(tx, ty)` with height `h`. */
const IsoTileColumn: React.FC<{
  tx: number;
  ty: number;
  h: number;
  dx?: number;
  dy?: number;
  topFill: string;
  leftFill: string;
  rightFill: string;
}> = ({ tx, ty, h, dx = 2.1, dy = 1.05, topFill, leftFill, rightFill }) => {
  const z = Math.max(0.9, h);
  return (
    <g stroke="#262626" strokeWidth="0.75" strokeLinejoin="round">
      <polygon
        points={`${tx},${ty} ${tx + dx},${ty + dy} ${tx},${ty + 2 * dy} ${tx - dx},${ty + dy}`}
        fill={topFill}
      />
      <polygon
        points={`${tx - dx},${ty + dy} ${tx},${ty + 2 * dy} ${tx},${ty + 2 * dy + z} ${tx - dx},${ty + dy + z}`}
        fill={leftFill}
      />
      <polygon
        points={`${tx + dx},${ty + dy} ${tx},${ty + 2 * dy} ${tx},${ty + 2 * dy + z} ${tx + dx},${ty + dy + z}`}
        fill={rightFill}
      />
    </g>
  );
};

// Back-to-front 4x4 stepped terrain grid shared between HeightfieldTerrainBase and HeightfieldStrataBase
const HEIGHTFIELD_CELLS: ReadonlyArray<readonly [number, number, number]> = [
  [0, 0, 1.4],
  [1, 0, 1.9],
  [0, 1, 1.0],
  [2, 0, 1.2],
  [1, 1, 1.4],
  [0, 2, 0.7],
  [3, 0, 0.8],
  [2, 1, 0.9],
  [1, 2, 1.6],
  [0, 3, 1.2],
  [3, 1, 1.4],
  [2, 2, 1.9],
  [1, 3, 1.1],
  [3, 2, 1.7],
  [2, 3, 0.8],
  [3, 3, 0.6],
];

const HeightfieldGridTiles: React.FC<{ maxCol: number }> = ({ maxCol }) => (
  <>
    {HEIGHTFIELD_CELLS.filter(([c]) => c <= maxCol).map(([c, r, elev]) => {
      const tx = 12 + (c - r) * 2.15;
      const ty = 8.4 + (c + r) * 1.08 - elev;
      return (
        <IsoTileColumn
          key={`${c}-${r}`}
          tx={tx}
          ty={ty}
          h={elev + 0.9}
          dx={2.15}
          dy={1.08}
          topFill="#8fc2ff"
          leftFill="#5aa2f2"
          rightFill="#3672c4"
        />
      );
    })}
  </>
);

// 3. HEIGHTFIELD TERRAIN (SOP_heightfield): Wide stepped 4x4 isometric blue terrain slab
export const HeightfieldTerrainBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    <HeightfieldGridTiles maxCol={3} />
  </g>
);

// 4. CONVERT HEIGHTFIELD (SOP_convertheightfield): Reuses the left half of HeightfieldTerrainBase transitioning into orange mesh
export const HeightfieldStrataBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Draped orange mesh replacing the c=2..3 right half of HeightfieldTerrainBase */}
    <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
      <polygon points="14.6,8.0 21.0,11.4 12.0,16.8 7.2,14.0" fill="#ee8624" />
      <polygon points="17.8,9.7 21.0,11.4 12.0,16.8 9.6,15.4" fill="#ffb066" />
      <polygon points="21.0,11.4 21.0,13.2 12.0,18.6 12.0,16.8" fill="#c25e12" />
      <polygon points="7.2,14.0 12.0,16.8 12.0,18.6 7.2,15.8" fill="#ee8624" />
    </g>
    {/* Crisp wide-spaced orange quad grid lines */}
    <g fill="none" stroke="#262626" strokeWidth="0.68">
      <path d="M17.8 9.7L9.6 15.4" />
      <path d="M12.6 9.8L18.0 13.0" />
      <path d="M10.1 11.8L15.1 14.8" />
    </g>
    {/* Exact left half (c = 0..1) of HeightfieldTerrainBase */}
    <HeightfieldGridTiles maxCol={1} />
  </g>
);

// 5. FLIP SOLVER (SOP_flipsolver): Orange trough spill ledge pouring a vertical-bending waterfall beside a symmetrical pink brain
export const FlipSolverBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Warm orange slide hood curving down-right into a clean side wall */}
    <path
      d="M8.8 5.2C10.8 3.0 15.2 2.2 19.2 3.6C20.2 4.0 20.4 5.2 19.4 6.2C17.4 8.2 15.2 9.4 12.6 9.6L8.8 5.2Z"
      fill="#ee8624"
      stroke="#262626"
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
    <path
      d="M10.4 4.8C12.6 3.4 15.8 3.0 18.4 4.0"
      fill="none"
      stroke="#ffb066"
      strokeWidth="0.9"
      strokeLinecap="round"
    />

    {/* Broad pouring waterfall dropping smoothly down and foaming wide bottom-left */}
    <path
      d="M10.4 4.8C12.6 4.2 15.2 4.6 17.0 5.4C15.0 7.8 13.4 10.6 12.0 13.6C10.8 15.8 8.6 17.6 5.8 17.6C4.0 17.6 2.6 16.2 2.8 14.6C2.8 13.4 4.0 12.8 5.2 13.0C3.8 12.4 3.4 11.0 4.4 10.0C5.8 10.6 7.4 10.0 8.6 8.2C9.6 6.6 9.8 5.2 10.4 4.8Z"
      fill="#5aa2f2"
      stroke="#262626"
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
    <path
      d="M10.8 5.4C12.8 4.8 14.8 5.2 16.0 5.8C14.0 8.0 12.4 10.8 10.8 13.4C9.4 15.4 7.0 16.2 4.4 15.2C5.8 14.6 7.0 13.8 8.2 12.0C9.6 9.4 10.0 6.8 10.8 5.4Z"
      fill="#8fc2ff"
    />
    <path
      d="M12.4 6.2C11.2 8.2 9.8 10.8 8.0 13.2M14.0 7.2C12.6 9.2 11.4 11.4 9.8 13.6"
      fill="none"
      stroke="#ffffff"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
    <circle cx="4.8" cy="7.4" r="0.85" fill="#8fc2ff" stroke="#262626" strokeWidth="0.8" />

    {/* Clean symmetrical pink solver brain */}
    <g transform="translate(15.6, 15.6)">
      <path
        d="M0 -3.6C1.4 -4.6 3.8 -4.3 4.8 -2.7C5.8 -1.8 5.8 0.0 5.0 1.2C5.2 2.5 4.1 3.6 2.8 3.7C1.9 4.4 0.8 4.3 0 3.5C-0.8 4.3 -1.9 4.4 -2.8 3.7C-4.1 3.6 -5.2 2.5 -5.0 1.2C-5.8 0.0 -5.8 -1.8 -4.8 -2.7C-3.8 -4.3 -1.4 -4.6 0 -3.6Z"
        fill="#f7c8ca"
        stroke="#262626"
        strokeWidth="1.05"
        strokeLinejoin="round"
      />
      <path d="M0 -3.2V3.2" fill="none" stroke="#d07478" strokeWidth="0.75" strokeLinecap="round" />
      <path
        d="M-1.0 -2.4C-2.2 -3.0 -3.6 -2.2 -3.2 -1.2C-2.8 -0.2 -4.4 0.0 -3.8 1.2C-3.2 2.2 -1.4 1.4 -1.0 2.4M1.0 -2.4C2.2 -3.0 3.6 -2.2 3.2 -1.2C2.8 -0.2 4.4 0.0 3.8 1.2C3.2 2.2 1.4 1.4 1.0 2.4"
        fill="none"
        stroke="#d07478"
        strokeWidth="0.65"
        strokeLinecap="round"
      />
    </g>
  </g>
);

// 6. FLIP CONTAINER (SOP_flipcontainer): Tilted glass beaker pitcher with 3D rim, blue fluid and spout splash
export const FlipContainerBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    <g transform="rotate(28 11 12.5)">
      {/* Clear glass handle on left */}
      <path d="M6.4 8.0H4.5C3.6 8.0 3.4 9.0 3.6 10.0L4.4 13.5C4.6 14.4 5.4 14.8 6.4 14.8" fill="none" stroke="#262626" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.4 8.0H4.5C3.6 8.0 3.4 9.0 3.6 10.0L4.4 13.5C4.6 14.4 5.4 14.8 6.4 14.8" fill="none" stroke="#eef2f7" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" />
      {/* Translucent glass cylinder body with flared right pouring spout */}
      <path
        d="M6.2 6.0H15.2L17.4 4.8L15.4 8.8V17.6C15.4 18.8 14.4 19.5 13.2 19.5H8.4C7.2 19.5 6.2 18.8 6.2 17.6Z"
        fill="#eef2f7"
        fillOpacity="0.82"
        stroke="#262626"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      {/* Tilted blue water inside pitcher */}
      <path
        d="M6.4 11.4L15.2 9.4V17.6C15.2 18.6 14.2 19.3 13.2 19.3H8.4C7.4 19.3 6.4 18.6 6.4 17.6Z"
        fill="#3672c4"
        stroke="#262626"
        strokeWidth="0.85"
      />
      {/* Sloshing tilted elliptical meniscus top */}
      <ellipse cx="10.8" cy="10.4" rx="4.3" ry="1.25" transform="rotate(-14 10.8 10.4)" fill="#5aa2f2" stroke="#8fc2ff" strokeWidth="0.7" />
      {/* 3D open elliptical top glass rim */}
      <ellipse cx="10.8" cy="6.0" rx="4.6" ry="1.4" fill="#c0c7d1" fillOpacity="0.6" stroke="#262626" strokeWidth="1.0" />
      {/* Vertical white glass highlight streak */}
      <line x1="7.8" y1="8.2" x2="7.8" y2="17.8" stroke="#ffffff" strokeWidth="1.0" strokeLinecap="round" strokeOpacity="0.85" />
    </g>
    {/* Graceful white+blue splash plume leaping out of the right spout */}
    <path
      d="M16.2 7.2C18.0 6.2 20.6 6.4 21.8 8.0C20.0 7.6 18.6 8.2 17.4 9.0C18.4 8.8 19.4 9.2 19.8 10.0C18.0 9.8 16.8 9.0 15.8 8.0Z"
      fill="#5aa2f2"
      stroke="#262626"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
    <path d="M16.8 7.5C18.4 6.8 19.8 7.0 20.8 7.6" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
    {/* Falling water droplet below spout */}
    <path d="M20.6 11.4C21.3 12.6 21.5 13.6 20.6 14.0C19.7 13.6 19.9 12.6 20.6 11.4Z" fill="#8fc2ff" stroke="#262626" strokeWidth="0.85" strokeLinejoin="round" />
  </g>
);

// 7. EDGE FRACTURE (SOP_edgefracture): Wireframe grey sphere split by jagged seam with tilted orange ring
export const RbdFractureBase: React.FC<{ uid?: string; cx?: number; cy?: number; scale?: number }> = ({
  uid = 'rbd',
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    <defs>
      <radialGradient id={`${uid}-ef`} cx="35%" cy="32%" r="68%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="55%" stopColor="#c0c7d1" />
        <stop offset="100%" stopColor="#5a616b" />
      </radialGradient>
    </defs>
    {/* Back arc of tilted orange orbital ring behind sphere */}
    <path d="M4.2 5.2A10.5 2.5 38 0 1 19.8 18.8" fill="none" stroke="#ee8624" strokeWidth="1.1" strokeOpacity="0.6" />
    {/* Shaded wireframe sphere */}
    <circle cx="12" cy="12" r="7" fill={`url(#${uid}-ef)`} stroke="#262626" strokeWidth="1.2" />
    <ellipse cx="12" cy="12" rx="7" ry="3" fill="none" stroke="#5a616b" strokeWidth="0.65" />
    <ellipse cx="12" cy="12" rx="3" ry="7" fill="none" stroke="#5a616b" strokeWidth="0.65" />
    {/* Jagged stair-step fracture seam */}
    <polyline
      points="6 8.2 9 8.2 9 11 12 11 12 13.8 15 13.8 15 16.6"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2.0"
      strokeLinejoin="round"
    />
    <polyline
      points="6 8.2 9 8.2 9 11 12 11 12 13.8 15 13.8 15 16.6"
      fill="none"
      stroke="#262626"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
    {/* Front arc of tilted orange orbital ring */}
    <path d="M4.2 5.2A10.5 2.5 38 0 0 19.8 18.8" fill="none" stroke="#262626" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M4.2 5.2A10.5 2.5 38 0 0 19.8 18.8" fill="none" stroke="#ee8624" strokeWidth="1.3" strokeLinecap="round" />
  </g>
);

/** Shared plump tapered spindle base used by both FiberGroomBase and MuscleBellyBase. */
const SpindleBundleShell: React.FC<{
  cx: number;
  cy: number;
  scale: number;
  bodyFill: string;
  capTopFill: string;
  capBottomFill: string;
  leftHighlight: string;
  centerHighlight: string;
  rightHighlight: string;
  children?: React.ReactNode;
}> = ({
  cx,
  cy,
  scale,
  bodyFill,
  capTopFill,
  capBottomFill,
  leftHighlight,
  centerHighlight,
  rightHighlight,
  children,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    <g transform="rotate(45 12 12)">
      {/* Tapered plump spindle body */}
      <path
        d="M11.1 4.2C6.8 7.4 6.6 16.2 11.1 19.8H12.9C17.4 16.2 17.2 7.4 12.9 4.2Z"
        fill={bodyFill}
        stroke="#262626"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      {/* Integrated tapered end caps */}
      <polygon points="11.0,2.2 13.0,2.2 13.3,4.5 10.7,4.5" fill={capTopFill} stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
      <polygon points="10.7,19.5 13.3,19.5 12.9,21.8 11.1,21.8" fill={capBottomFill} stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
      {/* Curved longitudinal fiber / striation highlights */}
      <path d="M10.4 5.4C9.2 9.0 9.2 14.5 10.6 18.6" fill="none" stroke={leftHighlight} strokeWidth="0.95" strokeLinecap="round" />
      <path d="M12.0 5.0V18.8" fill="none" stroke={centerHighlight} strokeWidth="0.9" strokeLinecap="round" />
      <path d="M13.6 5.4C14.8 9.0 14.8 14.5 13.4 18.6" fill="none" stroke={rightHighlight} strokeWidth="0.8" strokeLinecap="round" />
      {children}
    </g>
  </g>
);

// 8. FIBER GROOM (SOP_fibergroom): Plump red fiber bundle clasped by a toothed golden yellow comb
export const FiberGroomBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <SpindleBundleShell
    cx={cx}
    cy={cy}
    scale={scale}
    bodyFill="#e03228"
    capTopFill="#eef2f7"
    capBottomFill="#c0c7d1"
    leftHighlight="#f3dede"
    centerHighlight="#ffffff"
    rightHighlight="#c04848"
  >
    {/* Golden-yellow comb spine with distinct teeth revealing red fibers between them */}
    <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
      <rect x="6.5" y="7.2" width="11.0" height="2.4" rx="1.1" fill="#ffe47a" />
      <rect x="7.4" y="9.4" width="1.5" height="3.2" rx="0.5" fill="#f2c438" />
      <rect x="10.0" y="9.4" width="1.5" height="3.4" rx="0.5" fill="#f2c438" />
      <rect x="12.5" y="9.4" width="1.5" height="3.4" rx="0.5" fill="#f2c438" />
      <rect x="15.1" y="9.4" width="1.5" height="3.2" rx="0.5" fill="#f2c438" />
    </g>
  </SpindleBundleShell>
);

// 9. CLOTH DEFORM (SOP_clothdeform): Orange T-shirt with a bold white left-pointing arrow across the chest
export const ClothDeformBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
      <path
        d="M8.5 3.5L12 5.2L15.5 3.5L20.5 7.5L18 11.5L16 10V20.5H8V10L6 11.5L3.5 7.5Z"
        fill="#ee8624"
      />
      <polygon points="12,5.2 15.5,3.5 20.5,7.5 18,11.5 16,10 16,20.5 12,20.5" fill="#ffb066" />
      {/* Bold white left-pointing arrow across chest */}
      <polygon points="7,12 11.5,8 11.5,10.2 16.5,10.2 16.5,13.8 11.5,13.8 11.5,16" fill="#f2f4f7" strokeWidth="1.1" />
    </g>
  </g>
);

// 10. FRANKENMUSCLE (SOP_frankenmuscle): Reuses the plump spindle base of FiberGroomBase in bright green with white tendons and sutures
export const MuscleBellyBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <SpindleBundleShell
    cx={cx}
    cy={cy}
    scale={scale}
    bodyFill="#58c848"
    capTopFill="#ffffff"
    capBottomFill="#eef2f7"
    leftHighlight="#ffffff"
    centerHighlight="#eef2f7"
    rightHighlight="#52d638"
  >
    {/* Winding Frankenstein surgical scar seam and fine oblique cross-stitches */}
    <path d="M12.6 6.4C10.8 9.6 13.4 13.6 11.6 17.4" fill="none" stroke="#262626" strokeWidth="0.95" strokeLinecap="round" />
    <g stroke="#262626" strokeWidth="0.85" strokeLinecap="round">
      <line x1="10.2" y1="8.2" x2="13.2" y2="9.4" />
      <line x1="10.6" y1="12.2" x2="13.8" y2="11.4" />
      <line x1="10.4" y1="15.0" x2="13.4" y2="16.0" />
    </g>
  </SpindleBundleShell>
);

// 11. KINEFX BONE LINK (SOP_bonelink): Long slender pearl-white femur bone with asymmetrical anatomical joints
export const KinefxBoneBase: React.FC<{ uid?: string; cx?: number; cy?: number; scale?: number }> = ({
  uid = 'kb',
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    <defs>
      <linearGradient id={`${uid}-bone`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="45%" stopColor="#eef2f7" />
        <stop offset="82%" stopColor="#c0c7d1" />
        <stop offset="100%" stopColor="#89929e" />
      </linearGradient>
    </defs>
    <g transform="rotate(-45 12 12)">
      {/* Slender anatomical femur shaft + asymmetrical trochanter (left) & twin condyles (right) */}
      <path
        d="M3.2 11.8C2.4 10.6 3.0 9.0 4.6 9.0C6.0 9.0 6.8 10.2 8.2 10.6H15.8C17.0 10.4 17.4 8.8 19.0 8.8C20.5 8.8 21.2 10.0 20.6 11.4C21.4 12.6 20.6 14.4 19.0 14.4C17.5 14.4 17.0 13.4 15.8 13.2H8.0C6.8 13.4 6.2 15.2 4.8 15.0C3.4 14.8 3.0 13.2 3.8 12.4Z"
        fill={`url(#${uid}-bone)`}
        stroke="#262626"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      {/* Crisp bright white specular highlight along upper bone ridge */}
      <path d="M6.8 11.3H16.8" fill="none" stroke="#ffffff" strokeWidth="0.95" strokeLinecap="round" />
    </g>
  </g>
);

// 12. AGENT MANNEQUIN (SOP_agent): Sculpted solid blue humanoid figure standing in neutral pose
export const KinefxMannequinBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Head */}
    <circle cx="12" cy="4.8" r="2.2" fill="#5aa2f2" stroke="#262626" strokeWidth="1.15" />
    {/* Unified sculpted torso, arms and legs silhouette */}
    <path
      d="M8.5 8.2C7.2 8.4 6 10.5 5.4 14.5L7.2 14.8L8.5 11.2L9.2 14.2L8.2 21H10.5L12 16L13.5 21H15.8L14.8 14.2L15.5 11.2L16.8 14.8L18.6 14.5C18 10.5 16.8 8.4 15.5 8.2Z"
      fill="#3672c4"
      stroke="#262626"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
  </g>
);

// 13. CROWD SOURCE (CROWDS_crowdsource): Three blue crowd figures standing in red circular floor rings
export const CrowdAgentBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => {
  const AgentGlyph: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
    <g transform={`translate(${x}, ${y}) scale(${s})`}>
      {/* Red floor boundary circle */}
      <ellipse cx="0" cy="7.2" rx="4.2" ry="1.6" fill="none" stroke="#e03228" strokeWidth="1.35" />
      <circle cx="0" cy="-3.8" r="1.7" fill="#5aa2f2" stroke="#262626" strokeWidth="1.1" />
      <path
        d="M-2.8 -1.4L-3.8 3.2L-2.4 3.4L-1.8 1.2L-1.4 3.5L-2 7.2H-0.4L0 4.5L0.4 7.2H2L1.4 3.5L1.8 1.2L2.4 3.4L3.8 3.2L2.8 -1.4Z"
        fill="#3672c4"
        stroke="#262626"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </g>
  );
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
      {/* Back center crowd figure */}
      <AgentGlyph x={12} y={7.5} s={0.72} />
      {/* Front left and right crowd figures */}
      <AgentGlyph x={6.8} y={13} s={0.85} />
      <AgentGlyph x={17.2} y={13} s={0.85} />
    </g>
  );
};

// 14. APEX AUTO RIG BUILDER (SOP_apex-autorigbuilder): Open cardboard box with flaring flaps, wooden puppet parts and resting leg
export const ApexGraphTileBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Carved wooden puppet armature pieces sticking cleanly out of the box */}
    <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
      <path d="M5.4 10.5L3.6 4.4C3.4 3.4 4.8 3.0 5.4 3.8L7.4 10.5Z" fill="#e8c48a" />
      <polygon points="8.0,10.5 8.4,4.2 9.8,4.4 9.6,10.5" fill="#c89a5a" />
      <ellipse cx="11.6" cy="7.4" rx="1.9" ry="2.6" fill="#e8c48a" />
      <path d="M13.6 10.5L13.2 5.4C13.2 4.2 17.6 4.0 17.8 5.4L17.0 10.5Z" fill="#c89a5a" />
    </g>
    {/* Open cardboard box with flaring side flaps and folded front lip */}
    <g stroke="#262626" strokeWidth="1.05" strokeLinejoin="round">
      <polygon points="5.0,10.2 19.0,10.2 19.0,17.4 5.0,17.4" fill="#c89a5a" />
      {/* Outward flaring left & right wing flaps */}
      <polygon points="5.0,10.2 2.4,11.6 3.8,13.4 5.0,12.0" fill="#e8c48a" />
      <polygon points="19.0,10.2 21.6,11.6 20.2,13.4 19.0,12.0" fill="#e8c48a" />
      {/* Front lip folded downward */}
      <polygon points="5.0,10.2 19.0,10.2 18.0,12.2 6.0,12.2" fill="#e8c48a" />
    </g>
    {/* Horizontal articulated wooden mannequin leg & upturned foot resting in front */}
    <g stroke="#262626" strokeWidth="1.0" strokeLinejoin="round">
      <rect x="4.0" y="18.4" width="7.2" height="2.4" rx="1.0" fill="#e8c48a" />
      <circle cx="11.8" cy="19.6" r="1.25" fill="#a8783c" />
      <path d="M12.8 18.6L17.4 18.4L18.4 16.8L19.8 17.6L18.4 20.8H12.8Z" fill="#c89a5a" />
    </g>
  </g>
);

// 15. USD CONFIGURE STAGE (SOP_usdconfigure): Clean bright-blue layered stage diamonds with white frames and gear badge
export const IoStageStackBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12.2, -12.2)`}>
    {/* Back-to-front 3 crisp skewed USD stage layers with clean white borders (no muddy dark interiors) */}
    <g strokeLinejoin="round">
      {/* Back pale sky-blue card */}
      <polygon points="9.6,3.4 18.4,6.4 18.4,15.6 9.6,12.6" fill="#8fc2ff" stroke="#262626" strokeWidth="0.95" />
      <polygon points="10.4,4.2 17.8,6.8 17.8,14.8 10.4,12.2" fill="none" stroke="#ffffff" strokeWidth="0.9" />
      {/* Middle bright blue card */}
      <polygon points="6.6,5.0 15.4,8.0 15.4,17.2 6.6,14.2" fill="#5aa2f2" stroke="#ffffff" strokeWidth="1.2" />
      <polygon points="8.6,7.4 13.4,9.0 13.4,14.8 8.6,13.2" fill="#eef2f7" stroke="#ffffff" strokeWidth="0.8" />
      {/* Front deep blue card with clean white window cutout */}
      <polygon points="3.6,6.8 12.6,9.8 12.6,19.2 3.6,16.2" fill="#3672c4" stroke="#262626" strokeWidth="1.05" />
      <polygon points="4.2,7.4 12.0,10.0 12.0,18.4 4.2,15.8" fill="none" stroke="#ffffff" strokeWidth="0.9" />
      <polygon points="5.8,9.8 10.2,11.3 10.2,16.0 5.8,14.5" fill="#ffffff" />
    </g>
    {/* Prominent dark circular gear badge with crisp 6-tooth white gear */}
    <g transform="translate(17.0, 17.0)">
      <circle cx="0" cy="0" r="4.3" fill="#262626" stroke="#ffffff" strokeWidth="0.8" />
      <path
        d="M-0.75 -3.0H0.75L1.0 -2.0L1.9 -1.5L2.7 -2.1L3.3 -1.1L2.4 -0.4L2.4 0.4L3.3 1.1L2.7 2.1L1.9 1.5L1.0 2.0L0.75 3.0H-0.75L-1.0 2.0L-1.9 1.5L-2.7 2.1L-3.3 1.1L-2.4 0.4L-2.4 -0.4L-3.3 -1.1L-2.7 -2.1L-1.9 -1.5L-1.0 -2.0Z"
        fill="#eef2f7"
      />
      <circle cx="0" cy="0" r="1.15" fill="#262626" />
    </g>
  </g>
);

// 16. ATTRIBUTE ADJUST COLOR (SOP_attribadjustcolor): 3D tilted rainbow color wheel disc with eyedropper
export const AttributeTagBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* 3D disc cylindrical thickness rim */}
    <path
      d="M3 13.5V15.5A7.8 5.2 0 0 0 18.6 15.5V13.5Z"
      fill="#89929e"
      stroke="#262626"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
    {/* Tilted oval rainbow spectrum color sectors */}
    <g transform="translate(10.8, 13.5) scale(1, 0.66)">
      <g stroke="#262626" strokeWidth="1.15" strokeLinejoin="round">
        <path d="M0,0 L0,-7.8 A7.8,7.8 0 0,1 6.75,-3.9 Z" fill="#e03228" />
        <path d="M0,0 L6.75,-3.9 A7.8,7.8 0 0,1 6.75,3.9 Z" fill="#f2c438" />
        <path d="M0,0 L6.75,3.9 A7.8,7.8 0 0,1 0,7.8 Z" fill="#58c848" />
        <path d="M0,0 L0,7.8 A7.8,7.8 0 0,1 -6.75,3.9 Z" fill="#3672c4" />
        <path d="M0,0 L-6.75,3.9 A7.8,7.8 0 0,1 -6.75,-3.9 Z" fill="#5aa2f2" />
        <path d="M0,0 L-6.75,-3.9 A7.8,7.8 0 0,1 0,-7.8 Z" fill="#ee8624" />
      </g>
    </g>
    {/* Eyedropper pipette touching wheel from upper-right */}
    <g transform="translate(17.5, 6.2) rotate(42)">
      <rect x="-1.6" y="-4.5" width="3.2" height="3.8" rx="1.4" fill="#3a3f47" stroke="#262626" strokeWidth="1" />
      <rect x="-2.2" y="-1" width="4.4" height="1.2" rx="0.4" fill="#262626" />
      <polygon points="-1.4,0.2 1.4,0.2 1,5.5 0,7.5 -1,5.5" fill="#eef2f7" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      <polygon points="-0.8,4 0.8,4 0,6.8" fill="#5aa2f2" />
    </g>
  </g>
);

// 17. POLYGON MESH BOX (SOP_box): Canonical three-tone isometric polygon box
export const PolyBoxBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    <polygon points="12,3 20,7 12,11 4,7" fill="#eef2f7" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
    <polygon points="4,7 12,11 12,20.5 4,16.5" fill="#c0c7d1" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
    <polygon points="20,7 12,11 12,20.5 20,16.5" fill="#89929e" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
  </g>
);

// 18. BEZIER CURVE GUIDE (SOP_curve): Canonical Bezier curve arc with red control hull and pen
export const CurveGuideBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Control hull */}
    <path d="M3.5 4.5H20.5" stroke="#e03228" strokeWidth="1.3" />
    {[3.5, 20.5].map((hx) => (
      <circle key={hx} cx={hx} cy="4.5" r="1.5" fill="#e03228" stroke="#262626" strokeWidth="0.8" />
    ))}
    <rect x="10.5" y="3" width="3" height="3" fill="#8fc2ff" stroke="#262626" strokeWidth="0.9" />
    {/* Bezier curve */}
    <path d="M3.5 19C3.5 4.5 20.5 4.5 20.5 19" fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
    <path d="M3.5 19C3.5 4.5 20.5 4.5 20.5 19" fill="none" stroke="#5aa2f2" strokeWidth="1.6" strokeLinecap="round" />
    <rect x="2" y="17.5" width="3" height="3" fill="#8fc2ff" stroke="#262626" strokeWidth="0.9" />
    <rect x="19" y="17.5" width="3" height="3" fill="#8fc2ff" stroke="#262626" strokeWidth="0.9" />
    {/* Pen, tip touching the top of the curve */}
    <g transform="translate(12 8.6) rotate(-35)">
      <path d="M0 0L2.4 5.5H-2.4Z" fill="#dfe4ea" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      <line x1="0" y1="1.6" x2="0" y2="4.2" stroke="#262626" strokeWidth="0.8" />
      <rect x="-2.6" y="5.5" width="5.2" height="1.6" fill="#89929e" stroke="#262626" strokeWidth="0.9" />
      <rect x="-2.6" y="7.1" width="5.2" height="6.4" rx="1.6" fill="#3672c4" stroke="#262626" strokeWidth="1.1" />
    </g>
  </g>
);

// 19. CLUSTER POINTS (SOP_clusterpoints): Overlapping dashed pastel rings enclosing white-rimmed dark point dots
export const PointCloudBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Four overlapping dashed cluster circles */}
    <circle cx="8" cy="8" r="4.8" fill="#ffb066" fillOpacity="0.35" stroke="#ee8624" strokeWidth="1.1" strokeDasharray="1.8 1.2" />
    <circle cx="16" cy="8.2" r="4.8" fill="#8fc2ff" fillOpacity="0.35" stroke="#3672c4" strokeWidth="1.1" strokeDasharray="1.8 1.2" />
    <circle cx="8.5" cy="16" r="4.8" fill="#ffe47a" fillOpacity="0.35" stroke="#d49a18" strokeWidth="1.1" strokeDasharray="1.8 1.2" />
    <circle cx="15.8" cy="15.8" r="4.8" fill="#52d638" fillOpacity="0.35" stroke="#262626" strokeWidth="1.1" strokeDasharray="1.8 1.2" />
    {/* Crisp dark point dots with white rims */}
    <g fill="#262626" stroke="#f2f4f7" strokeWidth="0.85">
      <circle cx="6.5" cy="7.2" r="1.3" />
      <circle cx="9.4" cy="6.8" r="1.3" />
      <circle cx="15" cy="7" r="1.3" />
      <circle cx="17.5" cy="9.2" r="1.3" />
      <circle cx="7" cy="15.2" r="1.3" />
      <circle cx="9.8" cy="17.2" r="1.3" />
      <circle cx="14.5" cy="15" r="1.3" />
      <circle cx="17.2" cy="16.8" r="1.3" />
    </g>
  </g>
);

// 20. CAMERA EDIT (SOP_cameraedit): Grey movie camera with twin reels and toothed metallic gear
export const CameraViewportBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12.4, -12.6)`}>
    <g stroke="#262626" strokeWidth="1.05" strokeLinejoin="round">
      {/* Camera boxy body and right-pointing lens barrel */}
      <rect x="6.2" y="8.8" width="8.8" height="6.5" rx="1" fill="#5a616b" />
      <polygon points="15,10.2 19.8,8 19.8,15.2 15,13.5" fill="#89929e" />
      {/* Twin overlapping film reels on top-left and left */}
      <circle cx="8" cy="6.2" r="3.5" fill="#89929e" />
      <circle cx="8" cy="6.2" r="1.2" fill="#3a3f47" />
      <circle cx="5.5" cy="12" r="3.5" fill="#89929e" />
      <circle cx="5.5" cy="12" r="1.2" fill="#3a3f47" />
      {/* 12-tooth metallic gear tucked inside bottom-right */}
      <g transform="translate(0, -0.6)">
        <polygon
          points="15.4,11.2 17.2,11.2 17.5,12.6 18.7,13.1 19.8,12.2 21,13.4 20.1,14.5 20.6,15.7 22,16 22,17.8 20.6,18.1 20.1,19.3 21,20.4 19.8,21.6 18.7,20.7 17.5,21.2 17.2,22.5 15.4,22.5 15.1,21.2 13.9,20.7 12.8,21.6 11.6,20.4 12.5,19.3 12,18.1 10.6,17.8 10.6,16 12,15.7 12.5,14.5 11.6,13.4 12.8,12.2 13.9,13.1 15.1,12.6"
          fill="#eef2f7"
        />
        <circle cx="16.3" cy="16.9" r="1.8" fill="#3a3f47" />
      </g>
    </g>
  </g>
);

// 21. VELLUM DRAPE (SOP_vellumdrape): Draped light-cyan silk cloth folds for vellum nodes
export const VellumClothBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Back deep-blue fold shadow visible under the lower drape pleats */}
    <path
      d="M7.2 13.0L17.4 13.2L16.4 19.6C15.0 20.6 13.4 20.0 12.2 18.8C10.8 17.8 9.0 18.6 7.4 19.0Z"
      fill="#5aa2f2"
      stroke="#262626"
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
    {/* Draped ice-cyan cloth sheet falling in undulating pleats */}
    <path
      d="M8.6 4.4C10.8 3.6 14.0 3.8 15.8 5.2C17.4 7.2 19.0 11.4 20.6 14.6C19.2 16.0 17.6 15.8 16.8 14.2C16.2 15.8 16.4 18.6 15.2 20.0C14.0 19.8 13.6 18.0 13.4 16.0C12.2 17.2 10.6 17.4 9.0 16.4C7.2 18.0 4.8 18.8 3.4 17.6C4.4 14.2 6.4 8.6 8.6 4.4Z"
      fill="#b8e4f8"
      stroke="#262626"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
    {/* Soft sky-blue pleated valley shading */}
    <path
      d="M11.6 10.8C12.4 13.0 13.2 15.4 13.6 16.8C12.2 17.4 10.4 17.4 9.2 16.6C10.2 14.6 10.8 12.8 11.6 10.8ZM15.2 8.0C16.6 10.2 18.0 12.8 19.4 15.0C18.4 15.6 17.4 15.2 16.6 13.6C16.0 12.0 15.4 9.8 15.2 8.0Z"
      fill="#8fc2ff"
    />
    {/* Upper drape highlight and vertical fold creases */}
    <path
      d="M9.6 5.4C11.2 4.8 13.4 5.0 14.8 6.0M10.4 11.4C10.0 13.4 9.6 15.0 9.0 16.4M15.2 8.6C16.0 11.0 16.2 12.8 16.4 14.6"
      fill="none"
      stroke="#262626"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
  </g>
);

// 22. PYRO FLAME (SOP_pyrosource): Standalone 3-tongue layered flame + ringed medallion for pyro nodes
export const PyroFlameGraphic: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Outer red flame silhouette */}
    <path
      d="M12.0 19.8C7.6 19.8 5.4 16.6 5.6 13.0C5.8 10.4 7.4 8.6 8.2 7.0C8.4 8.8 9.0 9.6 9.8 9.4C9.2 6.8 11.0 4.0 13.4 3.2C12.6 5.4 13.4 7.4 14.8 8.8C15.2 7.8 15.8 6.6 16.6 6.2C17.4 8.6 18.6 10.4 18.4 13.4C18.2 16.8 16.0 19.8 12.0 19.8Z"
      fill="#e03228"
      stroke="#262626"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
    {/* Mid orange tongue */}
    <path
      d="M12.0 19.2C8.8 19.2 7.2 16.8 7.4 14.0C7.6 12.2 8.6 11.0 9.2 10.0C9.4 11.2 10.0 11.8 10.6 11.4C10.4 9.4 11.6 7.4 13.0 6.6C12.6 8.4 13.2 9.8 14.4 10.8C14.8 10.0 15.4 9.4 15.8 9.2C16.6 11.0 17.0 12.8 16.6 15.0C16.2 17.4 14.6 19.2 12.0 19.2Z"
      fill="#ee8624"
    />
    {/* Bright yellow inner core flame */}
    <path
      d="M12.0 18.8C10.0 18.8 9.0 17.2 9.2 15.2C9.4 13.8 10.6 12.6 11.8 11.0C12.6 12.4 13.8 12.8 14.4 14.4C15.0 16.4 14.0 18.8 12.0 18.8Z"
      fill="#ffe47a"
    />
  </g>
);

export const PyroFlameBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Red-rimmed white medallion framing a full-scale Pyro flame */}
    <circle cx="12" cy="12" r="9.4" fill="#e03228" stroke="#262626" strokeWidth="1.1" />
    <circle cx="12" cy="12" r="8.2" fill="#ffffff" stroke="#e03228" strokeWidth="0.6" />
    <PyroFlameGraphic cx={12} cy={12.0} scale={0.94} />
  </g>
);

// 23. UV CHECKER CYLINDER (SOP_uvquickshade): Tilted cylinder wrapped in crisp 2x2 UV checkerboard
export const UvCheckerBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Cylinder body base in crisp white */}
    <path
      d="M5.6 5.8V18.0C5.6 20.0 8.5 21.2 12.0 21.2C15.5 21.2 18.4 20.0 18.4 18.0V5.8Z"
      fill="#ffffff"
      stroke="#262626"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
    {/* 2x2 alternating dark charcoal (#3a3f47) checkerboard tiles so #262626 edge outline stays visible */}
    <path
      d="M5.6 5.8C5.6 7.4 8.5 8.6 12.0 8.6V14.8C8.5 14.8 5.6 13.6 5.6 12.0Z"
      fill="#3a3f47"
    />
    <path
      d="M12.0 14.8C15.5 14.8 18.4 13.6 18.4 12.0V18.0C18.4 20.0 15.5 21.2 12.0 21.2Z"
      fill="#3a3f47"
    />
    {/* Subtle vertical seam & curved equator line + outer silhouette stroke */}
    <path
      d="M5.6 12.0C5.6 13.6 8.5 14.8 12.0 14.8C15.5 14.8 18.4 13.6 18.4 12.0M12.0 8.6V21.2"
      fill="none"
      stroke="#262626"
      strokeWidth="0.9"
    />
    <path
      d="M5.6 5.8V18.0C5.6 20.0 8.5 21.2 12.0 21.2C15.5 21.2 18.4 20.0 18.4 18.0V5.8"
      fill="none"
      stroke="#262626"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
    {/* Metallic open cylinder collar top rim */}
    <ellipse cx="12" cy="5.8" rx="6.4" ry="2.7" fill="#eef2f7" stroke="#262626" strokeWidth="1.15" />
    <ellipse cx="12" cy="5.8" rx="4.4" ry="1.6" fill="#89929e" stroke="#262626" strokeWidth="0.9" />
  </g>
);

// 24. GROUP CLUSTER DISCS (SOP_groupcopy): Twin orange-halo white discs filled with grey point dots
export const GroupDiscGlyph: React.FC<{ cx: number; cy: number; r?: number }> = ({ cx, cy, r = 5.4 }) => (
  <g transform={`translate(${cx}, ${cy}) scale(${r / 5.4})`}>
    {/* Warm orange scalloped/notched outer aura */}
    <circle cx="0" cy="0" r="5.4" fill="#ee8624" stroke="#262626" strokeWidth="1.05" />
    <circle
      cx="0"
      cy="0"
      r="4.7"
      fill="#ffffff"
      stroke="#ffb066"
      strokeWidth="1.05"
      strokeDasharray="1.1 0.9"
    />
    <circle cx="0" cy="0" r="4.3" fill="#ffffff" />
    {/* Five well-spaced dark-rimmed grey group point circles */}
    <g fill="#c0c7d1" stroke="#262626" strokeWidth="0.65">
      <circle cx="-1.75" cy="-1.75" r="0.72" />
      <circle cx="1.75" cy="-1.75" r="0.72" />
      <circle cx="0" cy="0" r="0.72" />
      <circle cx="-1.85" cy="1.85" r="0.72" />
      <circle cx="1.85" cy="1.85" r="0.72" />
    </g>
  </g>
);

export const GroupClusterBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    <GroupDiscGlyph cx={8.8} cy={8.8} r={5.4} />
    <GroupDiscGlyph cx={15.2} cy={15.2} r={5.4} />
  </g>
);

// 25. FEATHER PLUME (SOP_featherclump): Striped chevron plum-magenta feather plume with angled orchid bands and delicate pale quill
export const FeatherQuillGlyph: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Short cased pale stem extending cleanly below the barbs */}
    <path
      d="M5.4 20.8L8.6 16.4"
      fill="none"
      stroke="#262626"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M5.4 20.8L8.6 16.4"
      fill="none"
      stroke="#ffffff"
      strokeWidth="0.85"
      strokeLinecap="round"
    />
    {/* Deep plum-magenta feather vane fill */}
    <path
      d="M7.6 17.6C6.4 14.6 7.6 10.2 10.4 6.7C12.7 3.9 15.6 2.4 18.2 2.2C18.7 5.2 17.5 9.1 15.0 12.5L13.7 12.3L14.3 13.4C12.4 15.8 10.0 17.5 7.6 17.6Z"
      fill="#782c99"
    />
    {/* Steeply angled bright orchid chevron barb stripes */}
    <path
      d="M12.3 5.2C13.8 4.0 15.6 3.1 17.5 2.7C17.6 4.2 17.1 5.6 16.2 6.8L13.7 5.8L11.0 7.7Z"
      fill="#e6a6fc"
    />
    <path
      d="M9.0 10.8C9.8 9.1 10.8 7.8 11.8 6.8L13.6 6.8L16.3 8.0C15.9 9.1 15.4 10.2 14.8 11.1L12.6 9.5L8.6 12.2Z"
      fill="#d98cf5"
    />
    <path
      d="M7.9 15.4C8.0 14.2 8.2 13.1 8.5 12.2L11.7 11.2L13.6 13.1C12.5 14.6 11.0 16.0 9.4 16.8L10.3 14.4L7.9 15.4Z"
      fill="#d98cf5"
    />
    {/* Crisp outer silhouette stroke over the chevron fills */}
    <path
      d="M7.6 17.6C6.4 14.6 7.6 10.2 10.4 6.7C12.7 3.9 15.6 2.4 18.2 2.2C18.7 5.2 17.5 9.1 15.0 12.5L13.7 12.3L14.3 13.4C12.4 15.8 10.0 17.5 7.6 17.6Z"
      fill="none"
      stroke="#262626"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
    {/* Delicate uncased bright rachis spine */}
    <path
      d="M6.8 19.0C10.0 14.6 13.6 9.4 17.3 3.4"
      fill="none"
      stroke="#ffffff"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
  </g>
);

export const FeatherPlumeBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => <FeatherQuillGlyph cx={cx} cy={cy} scale={scale} />;

// 26. MPM GRANULAR MOUND & CONTAINER (SOP_mpmcontainer): Fluffy icy granular pile inside cardboard box
export const MpmSnowPile: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    <path
      d="M3.4 17.6C4.0 15.2 5.4 13.8 7.2 12.6C8.2 10.2 10.2 8.2 12.0 7.6C13.8 8.2 15.6 10.4 16.6 12.6C18.6 13.6 20.0 15.2 20.6 17.6C18.2 19.0 15.0 19.6 12.0 19.6C9.0 19.6 5.8 19.0 3.4 17.6Z"
      fill="#eef2f7"
      stroke="#262626"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
    <path
      d="M5.4 17.6C7.6 16.8 9.2 14.8 10.8 12.6C12.2 14.8 14.2 16.6 18.6 17.6C16.6 18.6 14.2 19.0 12.0 19.0C9.8 19.0 7.4 18.6 5.4 17.6Z"
      fill="#8fc2ff"
    />
    <path
      d="M8.8 12.6C10.0 10.6 11.0 9.0 12.0 8.2C13.0 9.2 14.0 11.0 14.8 12.8"
      fill="none"
      stroke="#ffffff"
      strokeWidth="0.95"
      strokeLinecap="round"
    />
  </g>
);

export const MpmContainerBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Back cardboard flaps */}
    <polygon
      points="6,9.2 12,6.4 18,9.2 12,12"
      fill="#7e5828"
      stroke="#262626"
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
    <polygon
      points="6,9.2 12,6.4 10.4,4.2 4.6,6.8"
      fill="#e8c48a"
      stroke="#262626"
      strokeWidth="1.0"
      strokeLinejoin="round"
    />
    <polygon
      points="12,6.4 18,9.2 19.4,6.8 13.6,4.2"
      fill="#c89a5a"
      stroke="#262626"
      strokeWidth="1.0"
      strokeLinejoin="round"
    />
    {/* Icy MPM granular mound heaped inside box */}
    <MpmSnowPile cx={12} cy={8.6} scale={0.62} />
    {/* Lower cardboard box faces & front flaps */}
    <polygon
      points="6,9.2 12,12 12,19.4 6,16.4"
      fill="#c89a5a"
      stroke="#262626"
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
    <polygon
      points="12,12 18,9.2 18,16.4 12,19.4"
      fill="#a8783c"
      stroke="#262626"
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
    <polygon
      points="6,9.2 12,12 10.4,14.6 4.4,11.6"
      fill="#e8c48a"
      stroke="#262626"
      strokeWidth="1.0"
      strokeLinejoin="round"
    />
    <polygon
      points="12,12 18,9.2 19.6,11.6 13.6,14.6"
      fill="#c89a5a"
      stroke="#262626"
      strokeWidth="1.0"
      strokeLinejoin="round"
    />
  </g>
);

/**
 * 26 Standardized Family Base Drawings queued for review in the Icon Review Gallery.
 */
export const FAMILY_KIT_ICONS: OperatorIconDef[] = [
  {
    id: 'kit.volume_cloud',
    label: 'Family Kit: Volume Cloud',
    family: 'sop',
    description: 'Billowing asymmetric cumulus cloud with pure white interior and dark outline for volume nodes.',
    types: [],
    refKey: 'SOP_cloud',
    render: () => <VolumeCloudBase />,
  },
  {
    id: 'kit.vdb_grid',
    label: 'Family Kit: OpenVDB Infinity',
    family: 'sop',
    description: 'Cased red infinity loop ribbon over bold white outlined VDB lettering for OpenVDB nodes.',
    types: [],
    refKey: 'SOP_OpenVDB',
    render: () => <VdbLogoBase />,
  },
  {
    id: 'kit.heightfield_terrain',
    label: 'Family Kit: Heightfield Grid',
    family: 'sop',
    description: 'Stepped isometric 4x4 grid of blue heightfield terrain tiles at varying elevations with dark outlines.',
    types: [],
    refKey: 'SOP_heightfield',
    render: () => <HeightfieldTerrainBase />,
  },
  {
    id: 'kit.heightfield_strata',
    label: 'Family Kit: Convert Heightfield',
    family: 'sop',
    description: 'Stepped blue heightfield grid tiles on the left transitioning into a draped orange polygon mesh on the right.',
    types: [],
    refKey: 'SOP_convertheightfield',
    render: () => <HeightfieldStrataBase />,
  },
  {
    id: 'kit.fluid_drop',
    label: 'Family Kit: FLIP Solver Splash',
    family: 'sop',
    description: 'Blue waterfall splash arcing down-left from an orange chute beside a pink solver brain in the bottom-right.',
    types: [],
    refKey: 'SOP_flipsolver',
    render: () => <FlipSolverBase />,
  },
  {
    id: 'kit.fluid_tank',
    label: 'Family Kit: FLIP Beaker Pitcher',
    family: 'sop',
    description: 'Tilted glass measuring pitcher with blue fluid and water droplets splashing out the right spout.',
    types: [],
    refKey: 'SOP_flipcontainer',
    render: () => <FlipContainerBase />,
  },
  {
    id: 'kit.rbd_fracture',
    label: 'Family Kit: RBD Edge Fracture',
    family: 'sop',
    description: 'Shaded wireframe grey sphere cracked along a jagged stair-step seam and encircled by a tilted orange orbital ring.',
    types: [],
    refKey: 'SOP_edgefracture',
    render: (uid) => <RbdFractureBase uid={uid} />,
  },
  {
    id: 'kit.groom_strands',
    label: 'Family Kit: Fiber Groom Bundle',
    family: 'sop',
    description: 'Diagonal red fiber bundle with light end caps clasped by a bright yellow ribbed comb band.',
    types: [],
    refKey: 'SOP_fibergroom',
    render: () => <FiberGroomBase />,
  },
  {
    id: 'kit.cloth_patch',
    label: 'Family Kit: Cloth Deform Shirt',
    family: 'sop',
    description: 'Two-tone orange polygon shirt with a bold white left-pointing arrow across the chest.',
    types: [],
    refKey: 'SOP_clothdeform',
    render: () => <ClothDeformBase />,
  },
  {
    id: 'kit.muscle_belly',
    label: 'Family Kit: Frankenmuscle Belly',
    family: 'sop',
    description: 'Diagonal green biological muscle spindle with white tendon tips and central surgical suture stitches.',
    types: [],
    refKey: 'SOP_frankenmuscle',
    render: () => <MuscleBellyBase />,
  },
  {
    id: 'kit.kinefx_bone',
    label: 'Family Kit: KineFX Bone Link',
    family: 'sop',
    description: 'Slender diagonal pearl-white anatomical femur bone with asymmetric rounded joints.',
    types: [],
    refKey: 'SOP_bonelink',
    render: (uid) => <KinefxBoneBase uid={uid} />,
  },
  {
    id: 'kit.kinefx_mannequin',
    label: 'Family Kit: Agent Mannequin',
    family: 'sop',
    description: 'Sculpted solid blue humanoid agent figure standing in a neutral pose.',
    types: [],
    refKey: 'SOP_agent',
    render: () => <KinefxMannequinBase />,
  },
  {
    id: 'kit.crowd_agent',
    label: 'Family Kit: Crowd Source Agents',
    family: 'sop',
    description: 'Three blue crowd figures arranged in formation, each standing inside a red circular ground ring.',
    types: [],
    refKey: 'CROWDS_crowdsource',
    render: () => <CrowdAgentBase />,
  },
  {
    id: 'kit.apex_graph',
    label: 'Family Kit: APEX Autorig Box',
    family: 'sop',
    description: 'Cardboard box filled with wooden puppet armature parts plus a jointed forearm resting horizontally in front.',
    types: [],
    refKey: 'SOP_apex-autorigbuilder',
    render: () => <ApexGraphTileBase />,
  },
  {
    id: 'kit.io_stage_stack',
    label: 'Family Kit: USD Configure Stage',
    family: 'sop',
    description: 'Three skewed overlapping blue viewport stage frames with a dark gear badge containing a white gear cutout.',
    types: [],
    refKey: 'SOP_usdconfigure',
    render: () => <IoStageStackBase />,
  },
  {
    id: 'kit.attribute_tag',
    label: 'Family Kit: Adjust Color Wheel',
    family: 'sop',
    description: 'Tilted 3D rainbow spectrum color wheel disc with an eyedropper pipette touching its upper-right edge.',
    types: [],
    refKey: 'SOP_attribadjustcolor',
    render: () => <AttributeTagBase />,
  },
  {
    id: 'kit.polygon_mesh_box',
    label: 'Family Kit: Mesh Cube',
    family: 'sop',
    description: 'Isometric three-tone grey cube (light top, mid left, dark right) with dark outlines.',
    types: [],
    refKey: 'SOP_box',
    render: () => <PolyBoxBase />,
  },
  {
    id: 'kit.curve_bezier',
    label: 'Family Kit: Bezier Curve',
    family: 'sop',
    description: 'Blue Bezier arc under a red control hull line, drawn by a blue fountain pen touching the top of the arc.',
    types: [],
    refKey: 'SOP_curve',
    render: () => <CurveGuideBase />,
  },
  {
    id: 'kit.point_cloud',
    label: 'Family Kit: Cluster Points',
    family: 'sop',
    description: 'Four overlapping pastel dashed circles enclosing dark point dots with crisp white rims.',
    types: [],
    refKey: 'SOP_clusterpoints',
    render: () => <PointCloudBase />,
  },
  {
    id: 'kit.camera_viewport',
    label: 'Family Kit: Camera Edit',
    family: 'sop',
    description: 'Dark grey movie camera with twin overlapping film reels and a toothed metallic gear in the bottom-right corner.',
    types: [],
    refKey: 'SOP_cameraedit',
    render: () => <CameraViewportBase />,
  },
  {
    id: 'kit.vellum_cloth',
    label: 'Family Kit: Vellum Drape Cloth',
    family: 'sop',
    description: 'Draped light-cyan silk cloth folds with sky-blue shadow pleats for vellum nodes.',
    types: [],
    refKey: 'SOP_vellumdrape',
    render: () => <VellumClothBase />,
  },
  {
    id: 'kit.pyro_flame',
    label: 'Family Kit: Pyro Flame Source',
    family: 'sop',
    description: 'Three-tongue red, orange and yellow flame framed inside a red-rimmed white circle for pyro nodes.',
    types: [],
    refKey: 'SOP_pyrosource',
    render: () => <PyroFlameBase />,
  },
  {
    id: 'kit.uv_checker',
    label: 'Family Kit: UV Checker Cylinder',
    family: 'sop',
    description: 'Open metallic cylinder wrapped in a crisp 2x2 black-and-white checkerboard texture for UV nodes.',
    types: [],
    refKey: 'SOP_uvquickshade',
    render: () => <UvCheckerBase />,
  },
  {
    id: 'kit.group_cluster',
    label: 'Family Kit: Group Cluster Discs',
    family: 'sop',
    description: 'Two overlapping orange-halo white discs each holding five dark-rimmed grey point circles for group nodes.',
    types: [],
    refKey: 'SOP_groupcopy',
    render: () => <GroupClusterBase />,
  },
  {
    id: 'kit.feather_plume',
    label: 'Family Kit: Feather Plume',
    family: 'sop',
    description: 'Deep plum-magenta feather plume overlaid with steeply angled orchid chevron barb bands and a bright central quill for feather nodes.',
    types: [],
    refKey: 'SOP_featherclump',
    render: () => <FeatherPlumeBase />,
  },
  {
    id: 'kit.mpm_mound',
    label: 'Family Kit: MPM Granular Box',
    family: 'sop',
    description: 'Open cardboard container filled with a fluffy icy-blue and white granular mound for MPM nodes.',
    types: [],
    refKey: 'SOP_mpmcontainer',
    render: () => <MpmContainerBase />,
  },
];
