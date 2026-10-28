import type { Edge, Node } from '@xyflow/react';
import { blockMethodLabel } from './blockLabels';
import { blockOutline, findBlocks } from './blockUnderlays';
import { parseOperatorType } from './operatorType';
import type {
  HoudiniDotData,
  HoudiniNetworkBoxData,
  HoudiniNetworkGraph,
  HoudiniNodeData,
  HoudiniRgbColor,
  HoudiniStickyNoteData,
  HoudiniSubnetInputData,
  HoudiniWireStyle,
} from './types';

/**
 * Conversion factor from Houdini network units (`1.0` unit) to browser pixels (`100px`).
 * Operator nodes are drawn with Houdini's 10:3 shape box (`1.0 x 0.3` units, `100px x 30px`).
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
 * React Flow ID prefixes for items that are not operator nodes. Operator nodes use their Houdini name
 * as the ID; every other item kind gets a prefix with a colon, which Houdini never allows in item
 * names, so a box, sticky note, dot or subnet input can never share an ID with a node.
 */
export const SUBNET_INPUT_ID_PREFIX = 'input:';
/** ID prefix of wire routing dots (see `SUBNET_INPUT_ID_PREFIX`). */
export const DOT_ID_PREFIX = 'dot:';
/** ID prefix of network boxes (see `SUBNET_INPUT_ID_PREFIX`). */
export const BOX_ID_PREFIX = 'box:';
/** ID prefix of sticky notes (see `SUBNET_INPUT_ID_PREFIX`). */
export const STICKY_ID_PREFIX = 'sticky:';
/** ID prefix of For-Each and Compile block underlays, followed by the end node's name. */
export const BLOCK_ID_PREFIX = 'block:';

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
  /** Blue descriptive text under the node name (the method of a For-Each Block Begin or End). */
  descriptiveText?: string;
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
  /** Drawn dotted like Houdini (the target points input of Copy to Points). */
  dotted?: boolean;
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
 * Custom React Flow node data payload for a For-Each or Compile block underlay (`HoudiniBlockUnderlay`).
 */
export interface HoudiniBlockFlowNodeData extends Record<string, unknown> {
  /** Rounded outline path, relative to the node's top-left corner. */
  outlinePath: string;
  widthPx: number;
  heightPx: number;
  /** Color of the Block End node, used for the outline and the tinted fill. */
  color: HoudiniRgbColor;
}

/**
 * Whether Houdini draws the wire into input `toInput` of `target` dotted: the second input (target
 * points) of Copy to Points.
 */
export function isDottedWire(target: HoudiniNodeData | undefined, toInput: number | undefined): boolean {
  return target !== undefined && toInput === 1 && parseOperatorType(target.type).baseType === 'copytopoints';
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
      id: `${BOX_ID_PREFIX}${box.name}`,
      type: 'houdiniNetBox',
      position: { x: screenX, y: screenY },
      // Known sizes for the minimap (controlled nodes never receive measured sizes back)
      initialWidth: widthPx,
      initialHeight: heightPx,
      zIndex: -20,
      selectable: false,
      draggable: false,
      // Only operator nodes are in the keyboard Tab order
      focusable: false,
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
      id: `${STICKY_ID_PREFIX}${sticky.name}`,
      type: 'houdiniSticky',
      position: { x: screenX, y: screenY },
      initialWidth: widthPx,
      initialHeight: heightPx,
      zIndex: -10,
      selectable: false,
      draggable: false,
      // Only operator nodes are in the keyboard Tab order
      focusable: false,
      data: {
        sticky,
        widthPx,
        heightPx,
      } satisfies HoudiniStickyFlowNodeData,
    });
  }

  // 2b. For-Each and Compile block underlays (zIndex: -5): a tinted outline in the Block End color
  // around the block's nodes, above boxes and sticky notes, below wires
  const visibleNodeNames = new Set(
    (graph.nodes ?? []).filter((node) => !hiddenItemNames.has(node.name)).map((node) => node.name),
  );
  for (const block of findBlocks(graph, visibleNodeNames)) {
    const outline = blockOutline(
      block.members.map((node) => ({
        x: (node.pos?.[0] ?? 0) * HOUDINI_UNIT_TO_PX,
        y: -((node.pos?.[1] ?? 0) + 0.3) * HOUDINI_UNIT_TO_PX,
        width: HOUDINI_UNIT_TO_PX,
        height: 0.3 * HOUDINI_UNIT_TO_PX,
      })),
    );
    if (!outline) continue;
    rfNodes.push({
      id: `${BLOCK_ID_PREFIX}${block.end.name}`,
      type: 'houdiniBlock',
      position: { x: outline.x, y: outline.y },
      initialWidth: outline.width,
      initialHeight: outline.height,
      zIndex: -5,
      selectable: false,
      draggable: false,
      // Only operator nodes are in the keyboard Tab order
      focusable: false,
      data: {
        outlinePath: outline.d,
        widthPx: outline.width,
        heightPx: outline.height,
        color: block.end.color,
      } satisfies HoudiniBlockFlowNodeData,
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
      // Only operator nodes are in the keyboard Tab order
      focusable: false,
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
  const operatorNodes: Node[] = [];
  const nodesByName = new Map((graph.nodes ?? []).map((node) => [node.name, node]));
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

    operatorNodes.push({
      id: node.name,
      type: 'houdiniSop',
      position: { x: screenX, y: screenY },
      initialWidth: widthPx,
      initialHeight: heightPx,
      zIndex: 10,
      selectable: true,
      draggable: false,
      // Keyboard access: Tab reaches each operator node, announced with its type and name
      focusable: true,
      ariaLabel: `${node.label || node.type} node ${node.name}${node.isSubnetwork && node.children ? ', subnetwork' : ''}`,
      data: {
        node,
        // Own properties only: an icon named `constructor` must not find `Object.prototype.constructor`
        iconSvg: documentIcons && Object.hasOwn(documentIcons, node.icon) ? documentIcons[node.icon] : undefined,
        customShapes,
        widthPx,
        heightPx,
        labelSize,
        descriptiveText: blockMethodLabel(node, (name) => nodesByName.get(name), graph.path) ?? undefined,
      } satisfies HoudiniSopFlowNodeData,
    });
  }

  // Tab order follows the network from top to bottom, then left to right (the DOM order is the
  // focus order; drawing order is set by `zIndex`, not by the order of this list)
  operatorNodes.sort((a, b) => a.position.y - b.position.y || a.position.x - b.position.x);
  rfNodes.push(...operatorNodes);

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
      id: `${DOT_ID_PREFIX}${dot.name}`,
      type: 'houdiniDot',
      position: { x: screenX, y: screenY },
      initialWidth: HOUDINI_DOT_RADIUS_PX * 2,
      initialHeight: HOUDINI_DOT_RADIUS_PX * 2,
      zIndex: 12,
      selectable: false,
      draggable: false,
      // Only operator nodes are in the keyboard Tab order
      focusable: false,
      data: {
        dot,
      } satisfies HoudiniDotFlowNodeData,
    });
  }

  // 6. Wires (Edges)
  // Group incoming wires per target node so multi-input bars (`merge`, `switch`) fan out wires across
  // the bar in input order (input 1 on the left), like Houdini, whatever the order in the file
  const wires = graph.wires ?? [];
  const incomingWiresByTarget = new Map<string, number[]>();
  for (let i = 0; i < wires.length; i++) {
    const w = wires[i];
    const list = incomingWiresByTarget.get(w.to) ?? [];
    list.push(i);
    incomingWiresByTarget.set(w.to, list);
  }
  const orderInTarget = new Map<number, number>();
  for (const list of incomingWiresByTarget.values()) {
    list.sort((a, b) => (wires[a].toInput ?? 0) - (wires[b].toInput ?? 0) || a - b);
    list.forEach((wireIndex, order) => orderInTarget.set(wireIndex, order));
  }

  /** React Flow ID of a wire end: an operator node first, then a dot, then a subnet input. */
  const endpointId = (name: string): string | null => {
    if (nodeLookup.has(name)) return name;
    if (dotIds.has(name)) return `${DOT_ID_PREFIX}${name}`;
    if (subnetInputIds.has(name)) return `${SUBNET_INPUT_ID_PREFIX}${name}`;
    return null;
  };

  for (let i = 0; i < wires.length; i++) {
    const wire = wires[i];
    if (hiddenItemNames.has(wire.from) || hiddenItemNames.has(wire.to)) {
      continue;
    }
    const sourceId = endpointId(wire.from);
    const targetId = endpointId(wire.to);
    // A wire to an item that is not in this export (outside the selection, or a broken file)
    if (sourceId === null || targetId === null) {
      continue;
    }
    const isFromSubnetInput = sourceId.startsWith(SUBNET_INPUT_ID_PREFIX);
    const isFromDot = sourceId.startsWith(DOT_ID_PREFIX);
    const isToDot = targetId.startsWith(DOT_ID_PREFIX);

    const sourceNode = nodeLookup.get(wire.from);
    const targetNode = nodeLookup.get(wire.to);

    const sourceHandle =
      isFromSubnetInput || isFromDot
        ? 'out-0'
        : `out-${Math.min(wire.fromOutput ?? 0, Math.max(0, (sourceNode?.maxOutputs ?? 1) - 1))}`;

    const isMultiInputTarget = !isToDot && (targetNode?.maxInputs ?? 1) > 4;
    let multiSlotIndex = 7;
    if (isMultiInputTarget) {
      const totalIn = incomingWiresByTarget.get(wire.to)?.length ?? 1;
      const orderIdx = orderInTarget.get(i) ?? 0;
      multiSlotIndex =
        totalIn === 1
          ? 7
          : Math.min(15, Math.max(0, Math.round(3 + (orderIdx / (totalIn - 1)) * 9)));
    }

    const targetHandle = isToDot
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
        sourceIsDot: isFromDot,
        targetIsDot: isToDot,
        wireStyle,
        dotted: isDottedWire(targetNode, wire.toInput),
      } satisfies HoudiniWireFlowEdgeData,
    });
  }

  return { nodes: rfNodes, edges: rfEdges };
}

