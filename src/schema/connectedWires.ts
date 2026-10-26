import type { Edge } from '@xyflow/react';

/**
 * Collects the IDs of every wire attached to `nodeId`, following wires through routing dots
 * so a highlighted connection stays continuous across `hou.NetworkDot` hops (like Houdini).
 *
 * Both directions are walked: input wires upstream and output wires downstream. The walk only
 * continues through IDs in `dotIds`, so it stops at the next real operator node.
 */
export function getConnectedWireIds(
  nodeId: string,
  edges: Edge[],
  dotIds: ReadonlySet<string>,
): Set<string> {
  const wireIds = new Set<string>();

  const walk = (direction: 'upstream' | 'downstream') => {
    const visited = new Set<string>();
    const stack = [nodeId];
    while (stack.length > 0) {
      const current = stack.pop() as string;
      if (visited.has(current)) continue;
      visited.add(current);

      for (const edge of edges) {
        const next =
          direction === 'downstream'
            ? edge.source === current
              ? edge.target
              : null
            : edge.target === current
              ? edge.source
              : null;
        if (next === null) continue;
        wireIds.add(edge.id);
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
