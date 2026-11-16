/**
 * Deterministic geometry helpers for operator icon drawings (Stage 2 of the icon workflow in
 * `docs/ICON_ART_BIBLE.md`). They compute original point lists and path strings (isometric
 * solids, arrowheads, ellipses, tilted tori, gears, grids, spirals, curve samples) so icons never
 * hand-guess projection math and sibling icons share exact shapes.
 */

/** A 2D point in the `0 0 24 24` icon space. */
export type Pt = readonly [number, number];

/** Rounds a coordinate to two decimals to keep the SVG output short. */
export const r2 = (n: number): number => Math.round(n * 100) / 100;

/** Formats points for a `points` attribute (`x,y x,y ...`). */
export const pts = (list: readonly Pt[]): string => list.map(([x, y]) => `${r2(x)},${r2(y)}`).join(' ');

/** Linear interpolation between two points. */
export const lerpPt = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/**
 * Bilinear point inside a quad given in order top-left, top-right, bottom-right, bottom-left.
 */
export const quadPt = (q: readonly [Pt, Pt, Pt, Pt], u: number, v: number): Pt =>
  lerpPt(lerpPt(q[0], q[1], u), lerpPt(q[3], q[2], u), v);

/** Point on a cubic Bezier curve at parameter `t`. */
export const cubicAt = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt => {
  const m = 1 - t;
  const a = m * m * m;
  const b = 3 * m * m * t;
  const c = 3 * m * t * t;
  const d = t * t * t;
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]];
};

/** Cubic Bezier as a path command fragment (`C x1,y1 x2,y2 x,y`). */
export const cubicCmd = (p1: Pt, p2: Pt, p3: Pt): string => `C${pts([p1, p2, p3])}`;

/**
 * Interior grid lines of a quad as one path (`nu` columns, `nv` rows). The border is not included.
 */
export const quadGridPath = (q: readonly [Pt, Pt, Pt, Pt], nu: number, nv: number): string => {
  const parts: string[] = [];
  for (let i = 1; i < nu; i += 1) {
    const a = quadPt(q, i / nu, 0);
    const b = quadPt(q, i / nu, 1);
    parts.push(`M${pts([a])} L${pts([b])}`);
  }
  for (let j = 1; j < nv; j += 1) {
    const a = quadPt(q, 0, j / nv);
    const b = quadPt(q, 1, j / nv);
    parts.push(`M${pts([a])} L${pts([b])}`);
  }
  return parts.join(' ');
};

/**
 * Closed spur-gear outline centered on `(cx, cy)` with trapezoid teeth.
 * `topFrac` and `baseFrac` are the tooth widths at the tip and root as a fraction of the pitch.
 */
export const gearPath = (
  cx: number,
  cy: number,
  teeth: number,
  rOuter: number,
  rRoot: number,
  topFrac = 0.36,
  baseFrac = 0.58,
): string => {
  const step = (Math.PI * 2) / teeth;
  const out: Pt[] = [];
  for (let i = 0; i < teeth; i += 1) {
    const a = i * step - Math.PI / 2;
    const polar = (ang: number, r: number): Pt => [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
    out.push(polar(a - (step * baseFrac) / 2, rRoot));
    out.push(polar(a - (step * topFrac) / 2, rOuter));
    out.push(polar(a + (step * topFrac) / 2, rOuter));
    out.push(polar(a + (step * baseFrac) / 2, rRoot));
  }
  return `M${pts(out).replace(/ /g, ' L')} Z`;
};

/**
 * Inward Archimedean spiral as an open polyline path, starting on the outside at angle `start`.
 */
export const spiralPath = (cx: number, cy: number, rOuter: number, rInner: number, turns: number, start = Math.PI): string => {
  const steps = Math.round(turns * 28);
  const out: Pt[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const r = rOuter + (rInner - rOuter) * t;
    const a = start + t * turns * Math.PI * 2;
    out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return `M${pts(out).replace(/ /g, ' L')}`;
};

/** Faces of an isometric box (2:1 projection). */
export interface IsoBoxFaces {
  top: Pt[];
  left: Pt[];
  right: Pt[];
}

/**
 * Isometric box with its top (back) vertex at `(x, y)`, half width `w` and wall height `h`.
 * The top face is `w` tall (2:1), the front vertex sits at `(x, y + w)`.
 */
export const isoBoxFaces = (x: number, y: number, w: number, h: number): IsoBoxFaces => ({
  top: [
    [x, y],
    [x + w, y + w / 2],
    [x, y + w],
    [x - w, y + w / 2],
  ],
  left: [
    [x - w, y + w / 2],
    [x, y + w],
    [x, y + w + h],
    [x - w, y + w / 2 + h],
  ],
  right: [
    [x, y + w],
    [x + w, y + w / 2],
    [x + w, y + w / 2 + h],
    [x, y + w + h],
  ],
});

/**
 * Triangular arrowhead pointing from `from` toward `tip`: `length` along the direction and
 * `halfWidth` to each side of the base. Returns `[tip, baseLeft, baseRight]`.
 */
export const arrowHead = (tip: Pt, from: Pt, length: number, halfWidth: number): Pt[] => {
  const dx = tip[0] - from[0];
  const dy = tip[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const bx = tip[0] - ux * length;
  const by = tip[1] - uy * length;
  return [tip, [bx - uy * halfWidth, by + ux * halfWidth], [bx + uy * halfWidth, by - ux * halfWidth]];
};

/** Point on an axis-aligned ellipse at `deg` degrees (0 = right, 90 = down in screen space). */
export const ellipsePt = (cx: number, cy: number, rx: number, ry: number, deg: number): Pt => {
  const a = (deg * Math.PI) / 180;
  return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];
};

/** Closed ellipse as path commands (two arcs), usable inside a larger `evenodd` path. */
export const ellipsePath = (cx: number, cy: number, rx: number, ry: number): string =>
  `M${r2(cx - rx)},${r2(cy)} A${r2(rx)},${r2(ry)} 0 1,0 ${r2(cx + rx)},${r2(cy)} A${r2(rx)},${r2(ry)} 0 1,0 ${r2(cx - rx)},${r2(cy)} Z`;

/** Geometry of a torus seen at three quarters from above. */
export interface TiltedTorus {
  /** Outer silhouette minus the hole; draw with `fillRule="evenodd"`. */
  body: string;
  /** Visible far inner wall inside the hole (a crescent along the top of the hole). */
  innerWall: string;
  /** Point on a ring between the hole (`s = 0`) and the outer rim (`s = 1`). */
  ring: (s: number, deg: number) => Pt;
}

/**
 * Torus tilted toward the viewer: outer ellipse `rx` by `ry` around `(cx, cy)`, a hole scaled by
 * `hole` and lifted by `lift` (the far side of the hole shows more of the tube).
 */
export const tiltedTorus = (cx: number, cy: number, rx: number, ry: number, hole = 0.38, lift = 0.24): TiltedTorus => {
  const hx = rx * hole;
  const hy = ry * hole * 0.66;
  const hcy = cy - ry * lift;
  const body = `${ellipsePath(cx, cy, rx, ry)} ${ellipsePath(cx, hcy, hx, hy)}`;
  const innerWall = `M${r2(cx - hx)},${r2(hcy)} A${r2(hx)},${r2(hy)} 0 0,1 ${r2(cx + hx)},${r2(hcy)} C${r2(cx + hx * 0.6)},${r2(hcy + hy * 0.9)} ${r2(cx - hx * 0.6)},${r2(hcy + hy * 0.9)} ${r2(cx - hx)},${r2(hcy)} Z`;
  const ring = (s: number, deg: number): Pt =>
    ellipsePt(cx, hcy + (cy - hcy) * s, hx + (rx - hx) * s, hy + (ry - hy) * s, deg);
  return { body, innerWall, ring };
};

/** Rounded rectangle path (all corners radius `r`). */
export const roundedRectPath = (x: number, y: number, w: number, h: number, r: number): string =>
  `M${r2(x + r)},${r2(y)} H${r2(x + w - r)} Q${r2(x + w)},${r2(y)} ${r2(x + w)},${r2(y + r)} V${r2(y + h - r)} Q${r2(x + w)},${r2(y + h)} ${r2(x + w - r)},${r2(y + h)} H${r2(x + r)} Q${r2(x)},${r2(y + h)} ${r2(x)},${r2(y + h - r)} V${r2(y + r)} Q${r2(x)},${r2(y)} ${r2(x + r)},${r2(y)} Z`;
