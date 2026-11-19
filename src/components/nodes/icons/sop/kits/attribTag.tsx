import React from 'react';
import { type Pt, pts, r2 } from '../../geoHelpers';
import { ShadedSphere } from '../../geoKits';

/**
 * Attribute tag kit: the white speech-bubble panel whose tail points down at a shaded grey pin,
 * with the exact shapes of the live Attribute Create drawing (`attributes/attribTag.tsx`). Shared
 * by the Attribute tag family and reused by the Attribute Adjust family.
 */

/** Outline color of every tag part. */
export const TAG_OUTLINE = '#262626';

/** Paper white of the tag panel. */
export const TAG_FILL = '#f2f4f7';

/**
 * Free area for the operator glyph inside the standard tag panel (inside the outline):
 * a box from `(x0, y0)` to `(x1, y1)` around the center `(cx, cy)`.
 */
export const TAG_GLYPH = { x0: 9.6, y0: 3.6, x1: 20.4, y1: 10.9, cx: 15, cy: 7.25 } as const;

/**
 * Outline of a tag panel: a rectangle at `(x, y)` of `w` by `h` whose bottom edge carries a
 * triangular tail between `tail[0]` and `tail[1]` (x positions) down to `tip`.
 */
export const tagPanelPath = (
  x: number,
  y: number,
  w: number,
  h: number,
  tail: readonly [number, number],
  tip: Pt,
): string =>
  `M${r2(x)},${r2(y)} H${r2(x + w)} V${r2(y + h)} H${r2(tail[1])} L${pts([tip])} L${r2(tail[0])},${r2(y + h)} H${r2(x)} Z`;

/** The standard panel of the single-tag icons (same numbers as the live Attribute Create). */
export const STANDARD_TAG_PATH = tagPanelPath(8.5, 2.5, 13, 9.5, [10, 13], [6.8, 17.2]);

/** A tag panel with its tail, outlined. Use it directly for the small tags of two-tag icons. */
export const TagPanel: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  tail: readonly [number, number];
  tip: Pt;
  fill?: string;
  fillOpacity?: number;
  strokeWidth?: number;
}> = ({ x, y, w, h, tail, tip, fill = TAG_FILL, fillOpacity = 1, strokeWidth = 1.2 }) => (
  <path
    d={tagPanelPath(x, y, w, h, tail, tip)}
    fill={fill}
    fillOpacity={fillOpacity}
    stroke={TAG_OUTLINE}
    strokeWidth={strokeWidth}
    strokeLinejoin="round"
  />
);

/**
 * The shaded grey pin (dial ball) a tag points at. `id` is the gradient id and must start with
 * the render `uid`. The standard pin sits at `(5.2, 18.8)` with radius `3.1` (0.2 inside the live
 * Attribute Create pin, so it stays within the 1.5 to 22.5 margin); small tags use about 2.3.
 */
export const TagPin: React.FC<{ id: string; cx?: number; cy?: number; r?: number }> = ({
  id,
  cx = 5.2,
  cy = 18.8,
  r = 3.1,
}) => <ShadedSphere id={id} cx={cx} cy={cy} r={r} strokeWidth={r >= 3 ? 1.2 : 1.1} />;

/**
 * The standard single attribute tag: panel, then the operator glyph (children, drawn inside
 * `TAG_GLYPH`), then the pin on top. The gradient id is `<uid>-pin`.
 */
export const AttribTag: React.FC<{ uid: string; children?: React.ReactNode }> = ({ uid, children }) => (
  <>
    <path d={STANDARD_TAG_PATH} fill={TAG_FILL} stroke={TAG_OUTLINE} strokeWidth="1.3" strokeLinejoin="round" />
    {children}
    <TagPin id={`${uid}-pin`} />
  </>
);
