import type { HoudiniNetworkGraph, HoudiniNodeData } from './types';

/**
 * One level of the subnetwork navigation stack: the graph shown at that level and the
 * subnetwork node (in the parent graph) that contains it. The root level has no `node`.
 */
export interface SubnetLevel {
  /** Network graph displayed at this level. */
  graph: HoudiniNetworkGraph;
  /** Subnetwork node whose `children` is `graph`, or `null` for the exported root network. */
  node: HoudiniNodeData | null;
}

/**
 * Returns `true` when a node has exported child network data the viewer can dive into.
 */
export function canDiveInto(node: HoudiniNodeData | null | undefined): boolean {
  return Boolean(node?.isSubnetwork && node.children && Array.isArray(node.children.nodes));
}

/**
 * Resolves a dive path (subnetwork node names from the root, e.g. `["circuit_board_fan"]`)
 * into the stack of levels from the root network down to the deepest valid level.
 *
 * Names that do not exist or are not navigable subnetworks end the walk, so a stale path
 * (for example after loading a different file) falls back to the deepest level that still exists.
 */
export function resolveSubnetLevels(root: HoudiniNetworkGraph, divePath: readonly string[]): SubnetLevel[] {
  const levels: SubnetLevel[] = [{ graph: root, node: null }];
  for (const name of divePath) {
    const current = levels[levels.length - 1].graph;
    const node = current.nodes.find((n) => n.name === name);
    if (!node || !canDiveInto(node)) {
      break;
    }
    levels.push({ graph: node.children as HoudiniNetworkGraph, node });
  }
  return levels;
}
