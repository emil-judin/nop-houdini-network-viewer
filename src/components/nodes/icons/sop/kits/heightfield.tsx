import React from 'react';
import { type Pt, pts, quadPt } from '../../geoHelpers';

/**
 * Shared kit for * - `HeightfieldTile`: 3x3 3/4-perspective terrain slab with per-cell heights and colors.
 * - `ErodeCanyonBlock`: 3/4 orange canyon block with green rim and winding blue river.
 */

/** Base 3/4 quad corners (back, right, front, left) centered around `(12, 12.2)`. */
export const HF_BASE_QUAD: readonly [Pt, Pt, Pt, Pt] = [
  [11.6, 6.2],
  [21.4, 11.1],
  [12.4, 17.4],
  [2.6, 12.5],
];

/** Default 3x3 terrain height matrix (ridge-valley-ridge diagonal profile). */
export const DEFAULT_HF_HEIGHTS: readonly (readonly number[])[] = [
  [1.0, 1.7, 0.5],
  [1.5, 0.4, 1.3],
  [0.3, 1.2, 1.6],
];

/** Flat 3x3 height matrix for base/flat tiles. */
export const FLAT_HF_HEIGHTS: readonly (readonly number[])[] = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

export interface CellPalette {
  top: string;
  left?: string;
  right?: string;
}

export const HF_BLUE_HIGH: CellPalette = { top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4' };

export const HF_BLUE_LOW: CellPalette = { top: '#5aa2f2', left: '#3672c4', right: '#2e5a9a' };

export const HF_MUTED: CellPalette = { top: '#c0c7d1', left: '#89929e', right: '#5a616b' };

export const HF_GREEN: CellPalette = { top: '#58c848', left: '#3a9a2e', right: '#2c7822' };

export const HF_YELLOW: CellPalette = { top: '#ffe47a', left: '#f2c438', right: '#d49a18' };

export const HF_ORANGE: CellPalette = { top: '#ffb066', left: '#ee8624', right: '#c25e12' };

export const HF_RED: CellPalette = { top: '#ff7066', left: '#e03228', right: '#a81f18' };

export const HF_WHITE: CellPalette = { top: '#ffffff', left: '#c0c7d1', right: '#89929e' };

export const HF_DARK: CellPalette = { top: '#5a616b', left: '#3a3f47', right: '#262626' };

export const HF_TEAL: CellPalette = { top: '#5fd3c8', left: '#14a5b4', right: '#0d6e78' };

/** Returns the transformed `HF_BASE_QUAD` for a given scale and offset around `(12, 12)`. */
export function scaledHfQuad(scale = 1, offsetX = 0, offsetY = 0): readonly [Pt, Pt, Pt, Pt] {
  const cx = 12;
  const cy = 12;
  return HF_BASE_QUAD.map(([x, y]) => [
    cx + (x - cx) * scale + offsetX,
    cy + (y - cy) * scale + offsetY,
  ]) as unknown as readonly [Pt, Pt, Pt, Pt];
}

export const lift = (p: Pt, dy: number): Pt => [p[0], p[1] - dy];

/**
 * 3x3 3/4-perspective heightfield tile. Renders cells back-to-front so taller columns
 * naturally occlude cells behind them, with `#262626` outlines (`>= 0.6` stroke width).
 */
export const HeightfieldTile: React.FC<{
  heights?: readonly (readonly number[])[];
  cellPalette?: (r: number, c: number, h: number) => CellPalette;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
  baseH?: number;
  ridgeLine?: boolean;
  skipCell?: (r: number, c: number) => boolean;
}> = ({
  heights = DEFAULT_HF_HEIGHTS,
  cellPalette,
  scale = 1,
  offsetX = 0,
  offsetY = 0,
  baseH = 1.5,
  ridgeLine = false,
  skipCell,
}) => {
  const q = scaledHfQuad(scale, offsetX, offsetY);
  const bh = baseH * scale;
  const n = 3;

  const getPal = (r: number, c: number, h: number): CellPalette => {
    if (cellPalette) return cellPalette(r, c, h);
    return h >= 1.0 ? HF_BLUE_HIGH : HF_BLUE_LOW;
  };

  const cells: React.ReactNode[] = [];
  for (let r = 0; r < n; r += 1) {
    for (let c = 0; c < n; c += 1) {
      if (skipCell?.(r, c)) continue;
      const h = (heights[r]?.[c] ?? 0) * scale;
      const pal = getPal(r, c, heights[r]?.[c] ?? 0);
      const p00 = quadPt(q, c / n, r / n);
      const p10 = quadPt(q, (c + 1) / n, r / n);
      const p11 = quadPt(q, (c + 1) / n, (r + 1) / n);
      const p01 = quadPt(q, c / n, (r + 1) / n);

      const t00 = lift(p00, h);
      const t10 = lift(p10, h);
      const t11 = lift(p11, h);
      const t01 = lift(p01, h);

      const leftBot = r === n - 1 ? bh : 0;
      const rightBot = c === n - 1 ? bh : 0;

      const drawLeft = r === n - 1 || h > (heights[r + 1]?.[c] ?? 0) * scale;
      const drawRight = c === n - 1 || h > (heights[r]?.[c + 1] ?? 0) * scale;

      cells.push(
        <g key={`${r}-${c}`} stroke="#262626" strokeLinejoin="round">
          {drawLeft && (
            <polygon
              points={pts([t01, t11, lift(p11, -leftBot), lift(p01, -leftBot)])}
              fill={pal.left ?? '#3672c4'}
              strokeWidth={r === n - 1 ? '0.95' : '0.6'}
            />
          )}
          {drawRight && (
            <polygon
              points={pts([t11, t10, lift(p10, -rightBot), lift(p11, -rightBot)])}
              fill={pal.right ?? '#2e5a9a'}
              strokeWidth={c === n - 1 ? '0.95' : '0.6'}
            />
          )}
          <polygon points={pts([t00, t10, t11, t01])} fill={pal.top} strokeWidth="0.6" />
        </g>,
      );
    }
  }

  return (
    <g>
      {cells}
      {ridgeLine && (
        <path
          d={`M${pts([quadPt(q, 0.1, 0.28), quadPt(q, 0.42, 0.48), quadPt(q, 0.78, 0.68)])}`}
          fill="none"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinecap="round"
        />
      )}
    </g>
  );
};

/**
 * Shared orange canyon block with green upper rim and winding light-blue river around a
 * central island, used by all four `heightfield_erode*` operators.
 */
export const ErodeCanyonBlock: React.FC = () => (
  <g strokeLinejoin="round">
    {/* Base canyon slab */}
    <path
      d="M2.6,6.4 C2.6,4.8 4.0,3.8 5.6,3.8 L18.4,3.8 C20.0,3.8 21.4,4.8 21.4,6.4 L21.4,16.8 C21.4,18.6 19.6,20.2 17.6,20.2 L6.4,20.2 C4.4,20.2 2.6,18.6 2.6,16.8 Z"
      fill="#ee8624"
      stroke="#262626"
      strokeWidth="1.0"
    />
    {/* Green grass rim at top-left and top-right */}
    <path
      d="M2.8,6.6 C2.8,5.0 4.2,4.0 5.8,4.0 L11.2,4.0 L10.2,6.2 L5.2,6.4 L2.8,8.0 Z"
      fill="#58c848"
      stroke="#262626"
      strokeWidth="0.7"
    />
    <path
      d="M14.2,4.0 L18.2,4.0 C19.8,4.0 21.2,5.0 21.2,6.6 L21.2,7.6 L16.2,6.6 L14.8,4.8 Z"
      fill="#58c848"
      stroke="#262626"
      strokeWidth="0.7"
    />
    {/* Shadowed canyon cliff faces */}
    <path
      d="M4.2,11.6 C6.0,10.6 8.6,11.0 9.6,13.4 C10.4,15.4 8.2,16.8 6.4,17.4 L6.4,19.8 C4.2,19.4 2.8,18.0 2.8,16.2 L2.8,11.6 Z"
      fill="#ffb066"
      stroke="#262626"
      strokeWidth="0.75"
    />
    <path
      d="M21.2,9.8 L21.2,14.8 C19.4,14.2 17.4,13.2 16.4,11.6 C15.6,10.2 16.8,8.8 18.8,8.6 Z"
      fill="#c25e12"
      stroke="#262626"
      strokeWidth="0.75"
    />
    {/* Winding light-blue river */}
    <path
      d="M11.6,4.0 C10.6,6.0 7.0,7.2 7.2,9.2 C7.4,11.4 13.6,11.0 15.2,13.2 C16.6,15.0 13.6,17.8 14.8,20.0 L18.4,19.8 C17.8,17.4 20.4,14.8 19.0,12.2 C17.4,9.4 11.4,9.8 11.2,8.4 C11.0,7.2 13.6,5.8 14.4,4.0 Z"
      fill="#8fc2ff"
      stroke="#262626"
      strokeWidth="0.85"
    />
  </g>
);
