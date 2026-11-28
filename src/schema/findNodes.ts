import { canDiveInto } from './subnetPath';
import type { HoudiniNetworkGraph, HoudiniNodeData } from './types';

/**
 * One operator node found by `findNodes`: the node, the network it lives in and the dive path
 * (subnetwork names from the exported root) that shows that network.
 */
export interface NodeSearchMatch {
  /** The matching operator node. */
  node: HoudiniNodeData;
  /** The network that holds the node. */
  graph: HoudiniNetworkGraph;
  /** Subnetwork names from the exported root down to `graph` (empty for the root network). */
  path: string[];
}

/** Escapes a string for use inside a regular expression. */
function escapeRegExp(text: string): string {
  return text.replace(/[.+^${}()|[\]\\]/g, '\\$&');
}

/**
 * Builds the test for one search text, case-insensitive: without wildcards it matches any part of
 * a name or type; with Houdini's `*` and `?` wildcards the pattern must match the whole name or type
 * (`box*` finds `box1`, not `mybox`). Returns `null` for an empty search.
 */
export function nodeSearchTest(query: string): ((text: string) => boolean) | null {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return null;
  if (!/[*?]/.test(trimmed)) return (text) => text.toLowerCase().includes(trimmed);
  const pattern = new RegExp(`^${escapeRegExp(trimmed).replace(/\*/g, '.*').replace(/\?/g, '.')}$`, 'i');
  return (text) => pattern.test(text);
}

/**
 * Finds the operator nodes whose name or operator type matches `query`, in the exported root
 * network and in every exported subnetwork below it. The order is the document order, depth first:
 * a subnetwork node comes before the nodes inside it. Dots, network boxes and sticky notes are not
 * searched.
 */
export function findNodes(root: HoudiniNetworkGraph, query: string): NodeSearchMatch[] {
  const matches = nodeSearchTest(query);
  if (!matches) return [];
  const found: NodeSearchMatch[] = [];
  const visit = (graph: HoudiniNetworkGraph, path: string[]) => {
    for (const node of graph.nodes) {
      if (matches(node.name) || matches(node.type)) found.push({ node, graph, path });
      if (canDiveInto(node)) visit(node.children as HoudiniNetworkGraph, [...path, node.name]);
    }
  };
  visit(root, []);
  return found;
}

/** Full Houdini path of a match, e.g. `/obj/assets/scene/props/box1`. */
export function matchNodePath(match: NodeSearchMatch): string {
  return `${match.graph.path.replace(/\/$/, '')}/${match.node.name}`;
}
