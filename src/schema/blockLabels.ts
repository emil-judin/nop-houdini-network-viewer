import { blockPathTarget } from './blockUnderlays';
import { parseOperatorType } from './operatorType';
import type { HoudiniNodeData } from './types';

/** Block Begin `method` menu tokens and the text Houdini shows under the node name. */
const BEGIN_METHOD_LABELS: Record<string, string> = {
  feedback: 'Feedback',
  input: 'Input',
  metadata: 'Metadata',
};

/** Block End `method` menu tokens and the text Houdini shows under the node name. */
const END_METHOD_LABELS: Record<string, string> = {
  feedback: 'Feedback',
  merge: 'Merge',
};

/** First value of a string parameter, or `fallback` when the export left it out (at its default). */
function stringParm(node: HoudiniNodeData, name: string, fallback: string): string {
  const value = node.parms?.find((parm) => parm.name === name)?.val?.[0];
  return typeof value === 'string' ? value : fallback;
}

/**
 * Blue descriptive text Houdini draws under the name of a For-Each Block Begin or Block End node:
 * the node's method (`Feedback`, `Merge`, `Metadata`, `Input`). A Block Begin that extracts pieces shows
 * `Point` or `Piece`, after the Piece Elements setting of its Block End. Null for other nodes.
 *
 * Compact exports leave parameters at their default out, so a missing `method` reads as `feedback`
 * and a missing `class` as `primitive` (Houdini's defaults).
 *
 * @param node - The node to label.
 * @param sibling - Looks up a node of the same network level by name.
 * @param networkPath - Path of the network level (`/obj/geo1`), for absolute `blockpath` values.
 */
export function blockMethodLabel(
  node: HoudiniNodeData,
  sibling: (name: string) => HoudiniNodeData | undefined,
  networkPath: string,
): string | null {
  const { baseType } = parseOperatorType(node.type);
  const method = stringParm(node, 'method', 'feedback');
  // Compile Block Begin / End have no method and no descriptive text
  if (baseType === 'block_end') {
    return Object.hasOwn(END_METHOD_LABELS, method) ? END_METHOD_LABELS[method] : null;
  }
  if (baseType !== 'block_begin') return null;
  if (method === 'piece') {
    const end = sibling(blockPathTarget(node, networkPath) ?? '');
    return end && stringParm(end, 'class', 'primitive') === 'point' ? 'Point' : 'Piece';
  }
  return Object.hasOwn(BEGIN_METHOD_LABELS, method) ? BEGIN_METHOD_LABELS[method] : null;
}
