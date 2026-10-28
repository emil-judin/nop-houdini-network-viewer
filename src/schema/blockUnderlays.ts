import { parseOperatorType } from './operatorType';
import type { HoudiniNetworkGraph, HoudiniNodeData } from './types';

/**
 * Operator types that open a block (For-Each and Compile Block Begin). Their `blockpath` parameter
 * points to the matching end node (`../foreach_end1`).
 */
const BLOCK_BEGIN_TYPES = new Set(['block_begin', 'compile_begin']);

/** Operator types that close a block (For-Each and Compile Block End). */
const BLOCK_END_TYPES = new Set(['block_end', 'compile_end']);

/**
 * One For-Each or Compile block of a network level: the end node and every node Houdini draws the
 * block underlay around.
 */
export interface HoudiniBlock {
  /** The Block End node; the underlay uses its color. */
  end: HoudiniNodeData;
  /** All nodes inside the block: the begin nodes, the end node and the nodes wired between them. */
  members: HoudiniNodeData[];
}

/** Screen-space rectangle in pixels (`+Y` is down). */
export interface ScreenRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Rounded outline of a block underlay: an SVG path relative to the top-left corner of its bounding box.
 */
export interface BlockOutline {
  /** Left edge of the bounding box in screen pixels. */
  x: number;
  /** Top edge of the bounding box in screen pixels. */
  y: number;
  width: number;
  height: number;
  /** SVG path data (`M ... Z`) relative to `x` / `y`. */
  d: string;
}

/**
 * Space between the node bodies and the underlay outline, in pixels, measured from a Houdini 22
 * screenshot of a For-Each block. The bottom leaves room for the output connectors.
 */
export const BLOCK_OUTLINE_PADDING = { x: 12, top: 10, bottom: 16 } as const;

/** Corner radius of the underlay outline in pixels (Houdini 22 screenshot). */
export const BLOCK_OUTLINE_RADIUS_PX = 14;

/** Name of the sibling node a node's `blockpath` value points to (`../foreach_end1`), or null. */
export function blockPathTarget(node: HoudiniNodeData, networkPath: string): string | null {
  const value = node.parms?.find((parm) => parm.name === 'blockpath')?.val?.[0];
  if (typeof value !== 'string' || value === '') return null;
  const relative = /^\.\.\/([^/]+)$/.exec(value);
  if (relative) return relative[1];
  // Absolute path to a node in this network (`/obj/geo1/foreach_end1`)
  if (networkPath && value.startsWith(`${networkPath}/`)) {
    const name = value.slice(networkPath.length + 1);
    return name.includes('/') ? null : name;
  }
  return null;
}

/** Item names reachable from `start` over `next` (wires through nodes and dots), `start` included. */
function reachable(start: Iterable<string>, next: Map<string, string[]>): Set<string> {
  const seen = new Set<string>(start);
  const queue = [...seen];
  while (queue.length > 0) {
    const name = queue.pop() as string;
    for (const neighbour of next.get(name) ?? []) {
      if (!seen.has(neighbour)) {
        seen.add(neighbour);
        queue.push(neighbour);
      }
    }
  }
  return seen;
}

/**
 * Finds the For-Each and Compile blocks of one network level.
 *
 * A block is a Block End node, every Block Begin node whose `blockpath` points to it (the loop's own
 * begin and metadata begins), and the nodes wired between them: downstream of a begin node and upstream
 * of the end node. Only nodes in `visibleNames` count (nodes inside minimized network boxes are hidden).
 * Blocks with fewer than two visible nodes are left out.
 */
export function findBlocks(graph: HoudiniNetworkGraph, visibleNames: Set<string>): HoudiniBlock[] {
  const nodes = (graph.nodes ?? []).filter((node) => visibleNames.has(node.name));
  const byName = new Map(nodes.map((node) => [node.name, node]));
  const baseType = (node: HoudiniNodeData) => parseOperatorType(node.type).baseType;
  const ends = nodes.filter((node) => BLOCK_END_TYPES.has(baseType(node)));
  if (ends.length === 0) return [];

  const downstream = new Map<string, string[]>();
  const upstream = new Map<string, string[]>();
  for (const wire of graph.wires ?? []) {
    downstream.set(wire.from, [...(downstream.get(wire.from) ?? []), wire.to]);
    upstream.set(wire.to, [...(upstream.get(wire.to) ?? []), wire.from]);
  }

  const blocks: HoudiniBlock[] = [];
  for (const end of ends) {
    const begins = nodes.filter(
      (node) => BLOCK_BEGIN_TYPES.has(baseType(node)) && blockPathTarget(node, graph.path) === end.name,
    );
    const ownBegin = byName.get(blockPathTarget(end, graph.path) ?? '');
    if (ownBegin && BLOCK_BEGIN_TYPES.has(baseType(ownBegin)) && !begins.includes(ownBegin)) {
      begins.push(ownBegin);
    }
    if (begins.length === 0) continue;

    const afterBegins = reachable(
      begins.map((node) => node.name),
      downstream,
    );
    const beforeEnd = reachable([end.name], upstream);
    const members = nodes.filter(
      (node) => node === end || begins.includes(node) || (afterBegins.has(node.name) && beforeEnd.has(node.name)),
    );
    if (members.length >= 2) {
      blocks.push({ end, members });
    }
  }
  return blocks;
}

type Point = [number, number];

function cross(o: Point, a: Point, b: Point): number {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

/** Convex hull of `points` (Andrew's monotone chain), without repeated or collinear points. */
function convexHull(points: Point[]): Point[] {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const half = (list: Point[]) => {
    const hull: Point[] = [];
    for (const point of list) {
      while (hull.length >= 2 && cross(hull[hull.length - 2], hull[hull.length - 1], point) <= 0) {
        hull.pop();
      }
      hull.push(point);
    }
    hull.pop();
    return hull;
  };
  return [...half(sorted), ...half([...sorted].reverse())];
}

const round = (value: number) => Math.round(value * 100) / 100;

/**
 * Rounded convex outline around node rectangles, like Houdini's block underlay: the convex hull of the
 * rectangles grown by `padding`, with corners rounded by `radius`.
 *
 * The hull is built from the rectangles grown by `padding - radius` and then offset outwards by `radius`
 * (straight edges moved along their normals, joined by arcs), so the result keeps `padding` on every side.
 */
export function blockOutline(
  rects: ScreenRect[],
  padding: { x: number; top: number; bottom: number } = BLOCK_OUTLINE_PADDING,
  radius: number = BLOCK_OUTLINE_RADIUS_PX,
): BlockOutline | null {
  if (rects.length === 0) return null;
  const points: Point[] = [];
  for (const rect of rects) {
    const left = rect.x - (padding.x - radius);
    const right = rect.x + rect.width + (padding.x - radius);
    const top = rect.y - (padding.top - radius);
    const bottom = rect.y + rect.height + (padding.bottom - radius);
    points.push([left, top], [right, top], [right, bottom], [left, bottom]);
  }
  const hull = convexHull(points);
  if (hull.length < 3) return null;

  const minX = Math.min(...hull.map((p) => p[0])) - radius;
  const minY = Math.min(...hull.map((p) => p[1])) - radius;
  const maxX = Math.max(...hull.map((p) => p[0])) + radius;
  const maxY = Math.max(...hull.map((p) => p[1])) + radius;

  // Outward unit normal of each hull edge (hull[i] -> hull[i + 1])
  const centerX = hull.reduce((sum, p) => sum + p[0], 0) / hull.length;
  const centerY = hull.reduce((sum, p) => sum + p[1], 0) / hull.length;
  const normals: Point[] = hull.map((p, i) => {
    const q = hull[(i + 1) % hull.length];
    const length = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
    let n: Point = [(q[1] - p[1]) / length, -(q[0] - p[0]) / length];
    if (n[0] * ((p[0] + q[0]) / 2 - centerX) + n[1] * ((p[1] + q[1]) / 2 - centerY) < 0) {
      n = [-n[0], -n[1]];
    }
    return n;
  });

  const at = (p: Point, n: Point) => `${round(p[0] + n[0] * radius - minX)} ${round(p[1] + n[1] * radius - minY)}`;
  let d = `M ${at(hull[0], normals[0])}`;
  for (let i = 0; i < hull.length; i++) {
    const next = hull[(i + 1) % hull.length];
    const n = normals[i];
    const nextNormal = normals[(i + 1) % hull.length];
    // Screen space has +Y down, so a positive turn is clockwise (SVG sweep flag 1)
    const sweep = n[0] * nextNormal[1] - n[1] * nextNormal[0] > 0 ? 1 : 0;
    d += ` L ${at(next, n)} A ${radius} ${radius} 0 0 ${sweep} ${at(next, nextNormal)}`;
  }
  d += ' Z';

  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY, d };
}
