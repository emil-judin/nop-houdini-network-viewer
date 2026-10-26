import type { Edge, Node } from '@xyflow/react';
import type {
  HoudiniDotData,
  HoudiniNetworkBoxData,
  HoudiniNetworkDocument,
  HoudiniNetworkGraph,
  HoudiniNodeData,
  HoudiniRgbColor,
  HoudiniStickyNoteData,
  HoudiniSubnetInputData,
  HoudiniWireStyle,
} from './types';

/**
 * Conversion factor from Houdini network units (`1.0` unit) to browser pixels (`100px`).
 * A standard Houdini SOP node (`1.1296 x 0.2824` units) renders at `~113px x 28px`.
 */
export const HOUDINI_UNIT_TO_PX = 100;

/**
 * Radius in pixels for a Houdini wire routing dot (`hou.NetworkDot`), measured from the Houdini 22
 * Network Editor (a dot is about 0.19 network units across). `dot.pos` is the dot's center.
 */
export const HOUDINI_DOT_RADIUS_PX = 9.5;

/**
 * Height in pixels of a Network Box header bar (also the height of a minimized box), from Houdini 22.
 */
export const MINIMIZED_BOX_HEIGHT_PX = 29;

/**
 * Height in pixels of a Sticky Note header bar (also the height of a minimized note), from Houdini 22.
 */
export const MINIMIZED_STICKY_HEIGHT_PX = 22;

/**
 * Prefix applied to Subnetwork Indirect Input IDs so `"1"` does not collide with node names.
 */
export const SUBNET_INPUT_ID_PREFIX = '__subnet_input_';

/**
 * Configurable label size preset for node names and descriptive labels.
 * - `small`: Compact labels (`14.5px` name, `11px` type label).
 * - `medium` (Default): Matches Houdini 22 standard Network Editor proportions (`17px` name, `12.5px` type label).
 * - `large`: High-visibility labels (`20px` name, `14px` type label).
 */
export type HoudiniLabelSize = 'small' | 'medium' | 'large';

/**
 * Custom React Flow node data payload for a standard Houdini operator node (`HoudiniSopNode`).
 */
export interface HoudiniSopFlowNodeData extends Record<string, unknown> {
  node: HoudiniNodeData;
  iconSvg?: string;
  customShapes?: Record<string, unknown>;
  widthPx: number;
  heightPx: number;
  labelSize?: HoudiniLabelSize;
}

/**
 * Custom React Flow node data payload for a wire routing dot (`HoudiniDotNode`).
 */
export interface HoudiniDotFlowNodeData extends Record<string, unknown> {
  dot: HoudiniDotData;
}

/**
 * Custom React Flow node data payload for a Subnetwork Indirect Input (`HoudiniSubnetInput`).
 */
export interface HoudiniSubnetInputFlowNodeData extends Record<string, unknown> {
  subnetInput: HoudiniSubnetInputData;
  widthPx: number;
  heightPx: number;
  labelSize?: HoudiniLabelSize;
}

/**
 * Custom React Flow edge data payload for a Houdini wire (`HoudiniWire`).
 */
export interface HoudiniWireFlowEdgeData extends Record<string, unknown> {
  /** Whether the wire belongs to the selected node (drawn in the Houdini selected-wire color). */
  highlighted?: boolean;
  /** Whether the wire starts at a routing dot (no vertical tangent: it leaves the dot center straight). */
  sourceIsDot?: boolean;
  /** Whether the wire ends at a routing dot (no vertical tangent: it heads straight into the dot center). */
  targetIsDot?: boolean;
  /** Houdini wire style used to draw this wire (defaults to `default`). */
  wireStyle?: HoudiniWireStyle;
}

/**
 * Custom React Flow node data payload for a background Network Box (`HoudiniNetBox`).
 */
export interface HoudiniNetBoxFlowNodeData extends Record<string, unknown> {
  box: HoudiniNetworkBoxData;
  widthPx: number;
  heightPx: number;
}

/**
 * Custom React Flow node data payload for a background Sticky Note (`HoudiniStickyNote`).
 */
export interface HoudiniStickyFlowNodeData extends Record<string, unknown> {
  sticky: HoudiniStickyNoteData;
  widthPx: number;
  heightPx: number;
}

/**
 * Converts a Houdini normalized RGB tuple `[r, g, b]` (`0.0..1.0`) to a CSS `rgb(...)` string.
 */
export function houdiniRgbToCss(
  color: HoudiniRgbColor | undefined,
  fallback = 'rgb(204, 204, 204)',
): string {
  if (!color || color.length < 3) {
    return fallback;
  }
  const r = Math.round(Math.max(0, Math.min(1, color[0])) * 255);
  const g = Math.round(Math.max(0, Math.min(1, color[1])) * 255);
  const b = Math.round(Math.max(0, Math.min(1, color[2])) * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Converts a Houdini normalized RGB tuple `[r, g, b]` (`0.0..1.0`) to a CSS `rgba(...)` string.
 */
export function houdiniRgbToRgbaCss(
  color: HoudiniRgbColor | undefined,
  alpha: number,
  fallback = 'rgba(130, 130, 130, 0.25)',
): string {
  if (!color || color.length < 3) {
    return fallback;
  }
  const r = Math.round(Math.max(0, Math.min(1, color[0])) * 255);
  const g = Math.round(Math.max(0, Math.min(1, color[1])) * 255);
  const b = Math.round(Math.max(0, Math.min(1, color[2])) * 255);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Multiplies a Houdini RGB tuple by `factor` (clamped to `0.0..1.0`) and returns a CSS `rgb(...)` string.
 * Used for the lighter and darker tones Houdini derives from a box or sticky note color.
 */
export function houdiniRgbScaledToCss(color: HoudiniRgbColor, factor: number): string {
  return houdiniRgbToCss([color[0] * factor, color[1] * factor, color[2] * factor]);
}

/**
 * Relative luminance (`0.0..1.0`) of a Houdini RGB tuple, used to pick dark or light label text.
 */
export function houdiniRgbLuminance(color: HoudiniRgbColor): number {
  return 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];
}

/**
 * Major schema version this viewer reads. Minor versions only add optional fields, so every `1.x`
 * export works; see the versioning policy in `docs/SCHEMA.md`.
 */
export const SUPPORTED_SCHEMA_MAJOR = 1;

/**
 * Normalizes any raw JSON input (either a full `HoudiniNetworkDocument` or a legacy diagnostic dump)
 * into a canonical `HoudiniNetworkDocument`. Throws a readable error for files from a newer major
 * schema version.
 */
export function normalizeNetworkDocument(raw: unknown): HoudiniNetworkDocument {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid Houdini network JSON: expected an object.');
  }

  const obj = raw as Record<string, unknown>;

  // Versioning policy (docs/SCHEMA.md): every 1.x export is readable; a newer major is not
  const schemaMajor = typeof obj.schemaVersion === 'string' ? Number.parseInt(obj.schemaVersion, 10) : NaN;
  if (schemaMajor > SUPPORTED_SCHEMA_MAJOR) {
    throw new Error(
      `This file uses schema ${obj.schemaVersion as string}, made by a newer WOP exporter. ` +
        `Update the WOP viewer to show it (this viewer reads schema ${SUPPORTED_SCHEMA_MAJOR}.x).`,
    );
  }

  if (obj.root && typeof obj.root === 'object') {
    const root = obj.root as Record<string, unknown>;
    if (!Array.isArray(root.nodes)) {
      throw new Error('Invalid Houdini network JSON: "root.nodes" must be a list of nodes.');
    }
    return obj as unknown as HoudiniNetworkDocument;
  }

  // Support flat diagnostic JSON dumps where `nodes` is at the top level
  if (Array.isArray(obj.nodes)) {
    const graph: HoudiniNetworkGraph = {
      path: typeof obj.path === 'string' ? obj.path : '/obj/geo1',
      type: typeof obj.context === 'string' ? obj.context : 'geo',
      context: 'Sop',
      nodes: (obj.nodes as HoudiniNodeData[]) ?? [],
      dots: (obj.dots as HoudiniDotData[]) ?? [],
      boxes: (obj.boxes as HoudiniNetworkBoxData[]) ?? [],
      stickies: (obj.stickies as HoudiniStickyNoteData[]) ?? [],
      wires: (obj.wires as HoudiniNetworkGraph['wires']) ?? [],
      subnetInputs: (obj.subnetInputs as HoudiniSubnetInputData[]) ?? [],
    };
    return {
      schemaVersion: '1.0.0',
      houdiniVersion: typeof obj.houdiniVersion === 'string' ? obj.houdiniVersion : '22.0',
      icons: {},
      customShapes: {},
      root: graph,
    };
  }

  throw new Error('Unrecognized Houdini network JSON format.');
}

/**
 * Converts a single `HoudiniNetworkGraph` level into React Flow `nodes` and `edges`.
 *
 * Coordinate Conversion Rules:
 * - Houdini uses Cartesian coordinates (`+Y` is UP) where `pos` is the bottom-left corner.
 * - Browser / React Flow uses screen coordinates (`+Y` is DOWN) where `position` is the top-left corner.
 * - Therefore: `screenX = pos[0] * 100` and `screenY = -(pos[1] + size[1]) * 100`.
 */
export function convertGraphToReactFlow(
  graph: HoudiniNetworkGraph,
  documentIcons?: Record<string, string>,
  customShapes?: Record<string, unknown>,
  labelSize: HoudiniLabelSize = 'medium',
  wireStyle: HoudiniWireStyle = 'default',
): { nodes: Node[]; edges: Edge[] } {
  const rfNodes: Node[] = [];
  const rfEdges: Edge[] = [];

  // Track items hidden inside minimized Network Boxes
  const hiddenItemNames = new Set<string>();
  for (const box of graph.boxes ?? []) {
    if (box.minimized && Array.isArray(box.items)) {
      for (const itemName of box.items) {
        hiddenItemNames.add(itemName);
      }
    }
  }

  // 1. Background Network Boxes (zIndex: -20)
  // Houdini's box `pos`/`size` cover only the body it fits around its items; the title bar is drawn
  // on top of that rectangle, so the header is added above the body instead of overlapping the nodes.
  for (const box of graph.boxes ?? []) {
    const widthPx = Math.max(80, (box.size?.[0] ?? 2.5) * HOUDINI_UNIT_TO_PX);
    const isMinimized = Boolean(box.minimized);
    const bodyHeightPx = isMinimized ? 0 : Math.max(40, (box.size?.[1] ?? 1.5) * HOUDINI_UNIT_TO_PX);
    const heightPx = MINIMIZED_BOX_HEIGHT_PX + bodyHeightPx;

    const screenX = (box.pos?.[0] ?? 0) * HOUDINI_UNIT_TO_PX;
    const screenY = isMinimized
      ? -(box.pos?.[1] ?? 0) * HOUDINI_UNIT_TO_PX - MINIMIZED_BOX_HEIGHT_PX
      : -((box.pos?.[1] ?? 0) + (box.size?.[1] ?? 0)) * HOUDINI_UNIT_TO_PX - MINIMIZED_BOX_HEIGHT_PX;

    rfNodes.push({
      id: box.name,
      type: 'houdiniNetBox',
      position: { x: screenX, y: screenY },
      // Known sizes for the minimap (controlled nodes never receive measured sizes back)
      initialWidth: widthPx,
      initialHeight: heightPx,
      zIndex: -20,
      selectable: false,
      draggable: false,
      data: {
        box,
        widthPx,
        heightPx,
      } satisfies HoudiniNetBoxFlowNodeData,
    });
  }

  // 2. Background Sticky Notes (zIndex: -10)
  for (const sticky of graph.stickies ?? []) {
    const widthPx = Math.max(90, (sticky.size?.[0] ?? 2.0) * HOUDINI_UNIT_TO_PX);
    const isMinimized = Boolean(sticky.minimized);
    const heightPx = isMinimized
      ? MINIMIZED_STICKY_HEIGHT_PX
      : Math.max(40, (sticky.size?.[1] ?? 1.0) * HOUDINI_UNIT_TO_PX);

    const screenX = (sticky.pos?.[0] ?? 0) * HOUDINI_UNIT_TO_PX;
    const screenY = isMinimized
      ? -(sticky.pos?.[1] ?? 0) * HOUDINI_UNIT_TO_PX - MINIMIZED_STICKY_HEIGHT_PX
      : -((sticky.pos?.[1] ?? 0) + (sticky.size?.[1] ?? 0)) * HOUDINI_UNIT_TO_PX;

    rfNodes.push({
      id: sticky.name,
      type: 'houdiniSticky',
      position: { x: screenX, y: screenY },
      initialWidth: widthPx,
      initialHeight: heightPx,
      zIndex: -10,
      selectable: false,
      draggable: false,
      data: {
        sticky,
        widthPx,
        heightPx,
      } satisfies HoudiniStickyFlowNodeData,
    });
  }

  // 3. Subnetwork Indirect Inputs (top of subnetwork graphs)
  // Rendered with the same isotropic 10:3 proportions (100px x 30px) as operator nodes.
  const subnetInputIds = new Set<string>();
  for (const si of graph.subnetInputs ?? []) {
    subnetInputIds.add(si.name);
    const widthPx = Math.round(1.0 * HOUDINI_UNIT_TO_PX);
    const heightPx = Math.round(0.3 * HOUDINI_UNIT_TO_PX);
    const screenX = (si.pos?.[0] ?? 0) * HOUDINI_UNIT_TO_PX;
    const screenY = -((si.pos?.[1] ?? 0) + 0.3) * HOUDINI_UNIT_TO_PX;

    rfNodes.push({
      id: `${SUBNET_INPUT_ID_PREFIX}${si.name}`,
      type: 'houdiniSubnetInput',
      position: { x: screenX, y: screenY },
      initialWidth: widthPx,
      initialHeight: heightPx,
      zIndex: 5,
      selectable: false,
      draggable: false,
      data: {
        subnetInput: si,
        widthPx,
        heightPx,
        labelSize,
      } satisfies HoudiniSubnetInputFlowNodeData,
    });
  }

  // 4. Operator Nodes
  // Note: Houdini's NodeShapes/*.json use an isotropic 10:3 aspect ratio (1.0 x 0.3),
  // whereas hou.Node.size() reports [1.1296, 0.2824]. We enforce the 10:3 shape aspect
  // ratio (100px x 30px) so node shapes match Houdini's native rendering 1:1.
  const nodeLookup = new Map<string, HoudiniNodeData>();
  for (const node of graph.nodes ?? []) {
    if (hiddenItemNames.has(node.name)) {
      continue;
    }
    nodeLookup.set(node.name, node);

    const widthUnits = 1.0;
    const heightUnits = 0.3;
    const widthPx = Math.round(widthUnits * HOUDINI_UNIT_TO_PX);
    const heightPx = Math.round(heightUnits * HOUDINI_UNIT_TO_PX);

    const screenX = (node.pos?.[0] ?? 0) * HOUDINI_UNIT_TO_PX;
    const screenY = -((node.pos?.[1] ?? 0) + heightUnits) * HOUDINI_UNIT_TO_PX;

    rfNodes.push({
      id: node.name,
      type: 'houdiniSop',
      position: { x: screenX, y: screenY },
      initialWidth: widthPx,
      initialHeight: heightPx,
      zIndex: 10,
      selectable: true,
      draggable: false,
      data: {
        node,
        iconSvg: documentIcons?.[node.icon],
        customShapes,
        widthPx,
        heightPx,
        labelSize,
      } satisfies HoudiniSopFlowNodeData,
    });
  }

  // 5. Wire Routing Dots
  const dotIds = new Set<string>();
  for (const dot of graph.dots ?? []) {
    if (hiddenItemNames.has(dot.name)) {
      continue;
    }
    dotIds.add(dot.name);

    const screenX = (dot.pos?.[0] ?? 0) * HOUDINI_UNIT_TO_PX - HOUDINI_DOT_RADIUS_PX;
    const screenY = -(dot.pos?.[1] ?? 0) * HOUDINI_UNIT_TO_PX - HOUDINI_DOT_RADIUS_PX;

    rfNodes.push({
      id: dot.name,
      type: 'houdiniDot',
      position: { x: screenX, y: screenY },
      initialWidth: HOUDINI_DOT_RADIUS_PX * 2,
      initialHeight: HOUDINI_DOT_RADIUS_PX * 2,
      zIndex: 12,
      selectable: false,
      draggable: false,
      data: {
        dot,
      } satisfies HoudiniDotFlowNodeData,
    });
  }

  // 6. Wires (Edges)
  // Group incoming wires per target node so multi-input bars (`merge`, `switch`) fan out wires across the bar
  const incomingWiresByTarget = new Map<string, number[]>();
  for (let i = 0; i < (graph.wires ?? []).length; i++) {
    const w = graph.wires[i];
    const list = incomingWiresByTarget.get(w.to) ?? [];
    list.push(i);
    incomingWiresByTarget.set(w.to, list);
  }

  for (let i = 0; i < (graph.wires ?? []).length; i++) {
    const wire = graph.wires[i];
    const isFromSubnetInput =
      subnetInputIds.has(wire.from) && !nodeLookup.has(wire.from) && !dotIds.has(wire.from);
    const sourceId = isFromSubnetInput ? `${SUBNET_INPUT_ID_PREFIX}${wire.from}` : wire.from;
    const targetId = wire.to;

    if (hiddenItemNames.has(sourceId) || hiddenItemNames.has(targetId)) {
      continue;
    }

    const sourceNode = nodeLookup.get(wire.from);
    const targetNode = nodeLookup.get(wire.to);

    const sourceHandle = isFromSubnetInput
      ? 'out-0'
      : dotIds.has(wire.from)
        ? 'out-0'
        : `out-${Math.min(wire.fromOutput ?? 0, Math.max(0, (sourceNode?.maxOutputs ?? 1) - 1))}`;

    const isMultiInputTarget = (targetNode?.maxInputs ?? 1) > 4;
    let multiSlotIndex = 7;
    if (isMultiInputTarget) {
      const targetWireIndices = incomingWiresByTarget.get(wire.to) ?? [i];
      const totalIn = targetWireIndices.length;
      const orderIdx = Math.max(0, targetWireIndices.indexOf(i));
      multiSlotIndex =
        totalIn === 1
          ? 7
          : Math.min(15, Math.max(0, Math.round(3 + (orderIdx / (totalIn - 1)) * 9)));
    }

    const targetHandle = dotIds.has(wire.to)
      ? 'in-0'
      : isMultiInputTarget
        ? `in-multi-${multiSlotIndex}`
        : `in-${Math.min(wire.toInput ?? 0, Math.max(0, (targetNode?.maxInputs ?? 1) - 1))}`;

    rfEdges.push({
      id: `wire-${i}-${sourceId}-${wire.fromOutput}-${targetId}-${wire.toInput}`,
      source: sourceId,
      target: targetId,
      sourceHandle,
      targetHandle,
      type: 'houdiniWire',
      zIndex: 4,
      data: {
        sourceIsDot: dotIds.has(wire.from),
        targetIsDot: dotIds.has(wire.to),
        wireStyle,
      } satisfies HoudiniWireFlowEdgeData,
    });
  }

  return { nodes: rfNodes, edges: rfEdges };
}

