import { useEffect, useState } from 'react';
import type { HoudiniNetworkDocument, HoudiniNetworkGraph } from '../../schema/types';
import { areLabsIconsLoaded, loadLabsIcons, needsLabsIcon } from '../nodes/icons/iconRegistry';

/** `true` when any node of the network (at any level) or of its path bar is a SideFX Labs tool. */
export function graphNeedsLabsIcons(graph: HoudiniNetworkGraph): boolean {
  if (graph.pathNodes?.some((pathNode) => needsLabsIcon(pathNode.type, pathNode.icon))) return true;
  return graph.nodes.some(
    (node) => needsLabsIcon(node.type, node.icon) || (node.children !== undefined && graphNeedsLabsIcons(node.children)),
  );
}

/**
 * Loads the SideFX Labs icon drawings when the document uses Labs tools. Returns `false` while they
 * download, so the viewer can wait instead of drawing the default emblem first.
 */
export function useLabsIcons(doc: HoudiniNetworkDocument | null): boolean {
  const needed = doc !== null && !areLabsIconsLoaded() && graphNeedsLabsIcons(doc.root);
  const [, setLoaded] = useState(false);
  useEffect(() => {
    if (!needed) return;
    let active = true;
    // Rendering without the drawings is still better than no viewer if the download fails
    const done = () => active && setLoaded(true);
    loadLabsIcons().then(done, done);
    return () => {
      active = false;
    };
  }, [needed]);
  return !needed || areLabsIconsLoaded();
}
