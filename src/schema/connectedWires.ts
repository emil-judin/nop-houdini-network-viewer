import type { Edge } from '@xyflow/react';

/**
 * Wires of one network level grouped by their ends, built once per level so that following a
 * connection costs time per wire on the path, not per wire in the network.
 */
export interface WireIndex {
  /** Wires leaving each item, by React Flow node ID. */
  bySource: ReadonlyMap<string, readonly Edge[]>;
  /** Wires arriving at each item, by React Flow node ID. */
  byTarget: ReadonlyMap<string, readonly Edge[]>;
}

/** Groups `edges` by source and by target (see `WireIndex`). */
export function buildWireIndex(edges: readonly Edge[]): WireIndex {
  const bySource = new Map<string, Edge[]>();
  const byTarget = new Map<string, Edge[]>();
  for (const edge of edges) {
    const outgoing = bySource.get(edge.source);
    if (outgoing) outgoing.push(edge);
    else bySource.set(edge.source, [edge]);
    const incoming = byTarget.get(edge.target);
    if (incoming) incoming.push(edge);
    else byTarget.set(edge.target, [edge]);
  }
  return { bySource, byTarget };
}

/**
 * Collects the IDs of every wire attached to `nodeId`, following wires through routing dots
 * so a highlighted connection stays continuous across `hou.NetworkDot` hops (like Houdini).
 *
 * Both directions are walked: input wires upstream and output wires downstream. The walk only
 * continues through IDs in `dotIds`, so it stops at the next real operator node. Pass a
 * `WireIndex` (from `buildWireIndex`) when calling this repeatedly for the same wires.
 */
export function getConnectedWireIds(
  nodeId: string,
  wires: readonly Edge[] | WireIndex,
  dotIds: ReadonlySet<string>,
): Set<string> {
  const index = Array.isArray(wires) ? buildWireIndex(wires) : (wires as WireIndex);
  const wireIds = new Set<string>();

  const walk = (direction: 'upstream' | 'downstream') => {
    const lookup = direction === 'downstream' ? index.bySource : index.byTarget;
    const visited = new Set<string>();
    const stack = [nodeId];
    while (stack.length > 0) {
      const current = stack.pop() as string;
      if (visited.has(current)) continue;
      visited.add(current);
      for (const edge of lookup.get(current) ?? []) {
        wireIds.add(edge.id);
        const next = direction === 'downstream' ? edge.target : edge.source;
        if (dotIds.has(next)) {
          stack.push(next);
        }
      }
    }
  };

  walk('upstream');
  walk('downstream');
  return wireIds;
}
