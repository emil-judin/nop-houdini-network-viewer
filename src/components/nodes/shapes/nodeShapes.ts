import rawShapesData from './houdiniShapesData.json';

/**
 * 2D vertex coordinate `[x, y]` in Houdini shape space (`x` in `[0, 1]`, `y` in `[0, 0.3]`, `+Y` is up).
 */
export type ShapePoint = [number, number];

/**
 * Connector slot coordinate `[x, y, angleDeg]` in Houdini shape space.
 */
export type ShapeConnectorSlot = [number, number, number];

/**
 * Polygon and separator line definition for one of the 4 node flag regions (`0`, `1`, `2`, `3`).
 */
export interface HoudiniShapeFlagRegion {
  /** Closed polygon outline points for the flag fill area. */
  outline: ShapePoint[];
  /** Divider line segment points (`[p1, p2]`) separating this flag from its neighbor. */
  edge?: ShapePoint[];
}

/**
 * Complete vector definition for a Houdini node shape (matching `$HFS/houdini/config/NodeShapes/*.json`).
 */
export interface HoudiniNodeShapeDef {
  /** Shape identifier (e.g. `rect`, `wave`, `cigar`, `diamond`). */
  name: string;
  /** Main node body outline polygon points. */
  outline: ShapePoint[];
  /** Flag regions keyed by slot index (`"0"`, `"1"`, `"2"`, `"3"`). */
  flags?: Record<string, HoudiniShapeFlagRegion>;
  /** Ordered input connector positions across the top of the node. */
  inputs?: ShapeConnectorSlot[];
  /** Ordered output connector positions across the bottom of the node. */
  outputs?: ShapeConnectorSlot[];
  /** Bounding box `[minPt, maxPt]` for centering the operator icon. */
  icon?: [ShapePoint, ShapePoint];
}

const BUILTIN_SHAPES = rawShapesData as unknown as Record<string, HoudiniNodeShapeDef>;

/**
 * Standard SVG coordinate scale factor (`1.0` Houdini shape unit = `100` SVG user units).
 * Standard Houdini node shape coordinates span `X: [0, 1.0]` (`0..100`) and `Y: [0, 0.3]` (`0..30`).
 */
export const SHAPE_SVG_WIDTH = 100;
export const SHAPE_SVG_HEIGHT = 30;

/**
 * Converts a Houdini shape point `[x, y]` (`+Y` up, `0..0.3`) into SVG coordinates (`+Y` down, `0..30`).
 */
export function shapePointToSvg(pt: ShapePoint): [number, number] {
  const svgX = pt[0] * 100;
  const svgY = (0.3 - pt[1]) * 100;
  return [Math.round(svgX * 100) / 100, Math.round(svgY * 100) / 100];
}

/**
 * Converts an array of Houdini shape points into a closed or open SVG `d` path string.
 */
export function pointsToSvgPath(points: ShapePoint[], closePath = true): string {
  if (!points || points.length === 0) {
    return '';
  }
  const segments = points.map((pt, idx) => {
    const [x, y] = shapePointToSvg(pt);
    return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
  });
  if (closePath) {
    segments.push('Z');
  }
  return segments.join(' ');
}

/**
 * Resolves a Houdini shape definition by name, checking optional custom shapes from the JSON
 * document first, then all 36 built-in Houdini shapes, and falling back to `rect`.
 */
export function getNodeShapeDef(
  shapeName: string | undefined,
  customShapes?: Record<string, unknown>,
): HoudiniNodeShapeDef {
  const normalized = !shapeName || shapeName.trim() === '' ? 'rect' : shapeName.trim();

  if (customShapes && customShapes[normalized]) {
    const candidate = customShapes[normalized] as Partial<HoudiniNodeShapeDef>;
    if (Array.isArray(candidate.outline) && candidate.outline.length > 2) {
      return candidate as HoudiniNodeShapeDef;
    }
  }

  return BUILTIN_SHAPES[normalized] ?? BUILTIN_SHAPES.rect;
}

/**
 * Exact horizontal normalized X positions (`0.0..1.0`) for `1..4` discrete Houdini SOP connectors,
 * measured directly from Houdini 22's Network Editor.
 */
const CONNECTOR_X_POSITIONS: Record<number, number[]> = {
  1: [0.5],
  2: [0.29, 0.69],
  3: [0.24, 0.49, 0.74],
  4: [0.18, 0.38, 0.58, 0.78],
};

/**
 * Computes the normalized `[x, y]` position in Houdini shape space for connector `index` out of `count`,
 * linearly interpolating `y(x)` along the shape's `inputs` or `outputs` contour curve.
 */
export function getConnectorShapePosition(
  slots: ShapeConnectorSlot[] | undefined,
  index: number,
  count: number,
  defaultY: number,
): [number, number] {
  const presetX = CONNECTOR_X_POSITIONS[count]?.[index];
  const x = presetX ?? (index + 1) / (count + 1);

  if (!slots || slots.length === 0) {
    return [x, defaultY];
  }
  if (slots.length === 1 || x <= slots[0][0]) {
    return [x, slots[0][1]];
  }
  const last = slots[slots.length - 1];
  if (x >= last[0]) {
    return [x, last[1]];
  }

  for (let i = 0; i < slots.length - 1; i++) {
    const x0 = slots[i][0];
    const y0 = slots[i][1];
    const x1 = slots[i + 1][0];
    const y1 = slots[i + 1][1];
    if (x >= x0 && x <= x1) {
      const t = x1 === x0 ? 0 : (x - x0) / (x1 - x0);
      return [x, y0 + t * (y1 - y0)];
    }
  }

  return [x, defaultY];
}

/**
 * Extracts the slanted divider line segments for a flag region.
 * If the Houdini shape JSON includes an explicit `edge` array, uses it directly;
 * otherwise derives the interior vertical/slanted boundary segment(s) from `outline`.
 */
export function getFlagEdgePaths(region: HoudiniShapeFlagRegion | undefined): string[] {
  if (!region) {
    return [];
  }
  if (region.edge && region.edge.length >= 2) {
    return [pointsToSvgPath(region.edge, false)];
  }
  const pts = region.outline;
  if (!pts || pts.length < 3) {
    return [];
  }
  const paths: string[] = [];
  for (let i = 0; i < pts.length; i++) {
    const p1 = pts[i];
    const p2 = pts[(i + 1) % pts.length];
    if (
      Math.abs(p1[1] - p2[1]) > 0.15 &&
      p1[0] >= 0.08 &&
      p1[0] <= 0.92 &&
      p2[0] >= 0.08 &&
      p2[0] <= 0.92
    ) {
      paths.push(pointsToSvgPath([p1, p2], false));
    }
  }
  return paths;
}

/**
 * Generates an SVG `<path d="..." />` for the curved or flat multi-input collector bar
 * above nodes with `maxInputs > 4` (such as `merge` and `switch`), matching the top
 * contour of the node's shape (`shapeDef.inputs[1..9]`).
 */
export function getMultiInputBarSvgPath(shapeDef: HoudiniNodeShapeDef): string {
  const inputs = shapeDef.inputs;
  if (!inputs || inputs.length < 10) {
    return 'M 17 0 L 83 0';
  }
  // Span from slot 1 (~17.8%) to slot 9 (~83.5%) along the top input contour
  const slice = inputs.slice(1, 10);
  return slice
    .map((slot, idx) => {
      const [svgX, svgY] = shapePointToSvg([slot[0], slot[1]]);
      return `${idx === 0 ? 'M' : 'L'} ${svgX} ${svgY}`;
    })
    .join(' ');
}



