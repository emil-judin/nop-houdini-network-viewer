import React from 'react';
import { arrowHead, type Pt, pts, quadGridPath } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';

/**
 * Shared kit for the DOP and LOP icons and the other families that use the dark round corner
 * badge (heightfield, volume, RBD, KineFX).
 */

/**
 * Dark circular badge with a `#f2f4f7` inner ring and `#262626` outer outline so it stays
 * legible on both light and dark node backgrounds. Children are drawn in 24x24 icon space
 * around `(cx, cy)`.
 */
export const RoundGlyphBadge: React.FC<{
  cx?: number;
  cy?: number;
  r?: number;
  fill?: string;
  children?: React.ReactNode;
}> = ({ cx = 17.1, cy = 17.1, r = 4.7, fill = '#2e3338', children }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={fill} stroke="#f2f4f7" strokeWidth="0.75" />
    <circle cx={cx} cy={cy} r={r + 0.35} fill="none" stroke="#262626" strokeWidth="0.75" />
    {children}
  </g>
);

/**
 * Bold white diagonal arrow pointing down-right, sized for `RoundGlyphBadge`.
 */
export const RoundImportArrow: React.FC<{ cx?: number; cy?: number; s?: number }> = ({
  cx = 17.1,
  cy = 17.1,
  s = 1.08,
}) => {
  const from: Pt = [cx - 2.1 * s, cy - 2.1 * s];
  const tip: Pt = [cx + 2.4 * s, cy + 2.4 * s];
  const tri = arrowHead(tip, from, 2.75 * s, 2.2 * s);
  const shaftEnd: Pt = [(tri[1][0] + tri[2][0]) / 2, (tri[1][1] + tri[2][1]) / 2];
  return (
    <g>
      <path d={`M${pts([from])} L${pts([shaftEnd])}`} stroke="#ffffff" strokeWidth={1.8 * s} strokeLinecap="butt" />
      <polygon points={pts(tri)} fill="#ffffff" />
    </g>
  );
};

/**
 * Tilted 3D blue wireframe bounding box shared by `sop.dopimport` and `sop.dopimportrecords`.
 * Split into `back` and `front` layers so an interior object can sit inside the box.
 */
export const BlueWireBox: React.FC<{
  layer?: 'back' | 'front' | 'all';
  backColor?: string;
  frontColor?: string;
}> = ({ layer = 'all', backColor = '#5aa2f2', frontColor = '#8fc2ff' }) => {
  // Top-left end-cap (A=top, B=upper-left, D=far-left, C=front-inner)
  const a: Pt = [11.8, 2.4];
  const b: Pt = [7.6, 5.2];
  const c: Pt = [6.6, 8.7];
  const d: Pt = [2.6, 11.3];

  // Bottom-right end-cap (extruded diagonally down-right)
  const a2: Pt = [21.5, 12.7];
  const b2: Pt = [16.8, 14.2];
  const c2: Pt = [19.1, 21.3];
  const d2: Pt = [12.4, 21.3];

  const backPath = [`M${pts([b])} L${pts([b2])}`, `M${pts([b2])} L${pts([a2])}`, `M${pts([b2])} L${pts([d2])}`].join(
    ' ',
  );

  const frontPath = [
    `M${pts([a, b, d, c])} Z`,
    `M${pts([a])} L${pts([a2])}`,
    `M${pts([c])} L${pts([c2])}`,
    `M${pts([d])} L${pts([d2])}`,
    `M${pts([a2, c2, d2])}`,
  ].join(' ');

  return (
    <>
      {(layer === 'back' || layer === 'all') && (
        <CasedStroke d={backPath} color={backColor} width={0.75} casing={1.65} />
      )}
      {(layer === 'front' || layer === 'all') && (
        <CasedStroke d={frontPath} color={frontColor} width={0.9} casing={2.1} />
      )}
    </>
  );
};

/**
 * Wooden stage/crate base in 3/4 perspective shared by `sop.lopnet` and `sop.lopimport`.
 */
export const LopWoodenCrate: React.FC<{ yOffset?: number }> = ({ yOffset = 0 }) => {
  const topQuad: readonly [Pt, Pt, Pt, Pt] = [
    [5.0, 9.8 + yOffset],
    [19.0, 9.8 + yOffset],
    [21.2, 15.6 + yOffset],
    [2.8, 15.6 + yOffset],
  ];
  const planks = quadGridPath(topQuad, 4, 1);

  return (
    <g strokeLinejoin="round">
      <rect x="3.8" y={17.5 + yOffset} width="16.4" height="3.2" fill="#d49a18" stroke="#262626" strokeWidth="1.0" />
      <rect x="2.8" y={15.6 + yOffset} width="18.4" height="1.9" fill="#f2c438" stroke="#262626" strokeWidth="1.0" />
      <polygon points={pts(topQuad)} fill="#ffe47a" stroke="#262626" strokeWidth="1.0" />
      <path d={planks} fill="none" stroke="#262626" strokeWidth="0.85" />
    </g>
  );
};
