import { useEffect, useMemo, useState } from 'react';
import type { HoudiniNetworkDocument, HoudiniNetworkGraph } from '../../schema/types';
import {
  areLabsIconsLoaded,
  areSopIconDomainsLoaded,
  loadLabsIcons,
  loadSopIconDomains,
  needsLabsIcon,
  sopIconDomainsFor,
} from '../nodes/icons/iconRegistry';
import type { SopIconDomain } from '../nodes/icons/sop/domains';
import { ownPathIcon, rootPathNodeInfo } from '../hud/networkPathSegments';

/** `true` when any node of the network (at any level) or of its path bar is a SideFX Labs tool. */
export function graphNeedsLabsIcons(graph: HoudiniNetworkGraph): boolean {
  if (graph.pathNodes?.some((pathNode) => needsLabsIcon(pathNode.type, pathNode.icon))) return true;
  return graph.nodes.some(
    (node) =>
      needsLabsIcon(node.type, node.icon) || (node.children !== undefined && graphNeedsLabsIcons(node.children)),
  );
}

/** Adds the SOP icon domains of every node of a network, subnetwork levels included. */
function addNodeDomains(graph: HoudiniNetworkGraph, domains: Set<SopIconDomain>): void {
  for (const node of graph.nodes) {
    // The canvas and the Parameter Inspector header (which uses the drawing even for assets with an icon of their own)
    for (const domain of sopIconDomainsFor(node.type, node.icon)) domains.add(domain);
    if (node.children) addNodeDomains(node.children, domains);
  }
}

/**
 * The SOP icon domains a document needs: its nodes at every level, and the path bar's exported
 * network when the bar has no icon of its own for it (subnetwork levels are nodes already; the bar
 * shows no icons above the export). Lists Labs tools drawn with a built-in icon only once the Labs
 * drawings are registered.
 */
export function documentIconDomains(doc: HoudiniNetworkDocument): Set<SopIconDomain> {
  const domains = new Set<SopIconDomain>();
  addNodeDomains(doc.root, domains);
  const rootInfo = rootPathNodeInfo(doc.root);
  if (!ownPathIcon(rootInfo, doc.icons ?? {})) {
    for (const domain of sopIconDomainsFor(rootInfo.type, rootInfo.icon)) domains.add(domain);
  }
  return domains;
}

/** Loads the drawings a document needs: the Labs drawings first (they decide some domains), then the SOP domains. */
async function loadDocumentIcons(doc: HoudiniNetworkDocument): Promise<void> {
  if (graphNeedsLabsIcons(doc.root)) await loadLabsIcons();
  await loadSopIconDomains(documentIconDomains(doc));
}

/**
 * Loads the icon drawings the document uses: the SOP domains of its operators and, when it uses
 * Labs tools, the SideFX Labs drawings. Returns `false` while they download, so the viewer can wait
 * instead of drawing the default emblem first. Drawings loaded once stay loaded, so later networks
 * that need nothing new draw at once.
 */
export function useOperatorIcons(doc: HoudiniNetworkDocument | null): boolean {
  const labsReady = doc === null || areLabsIconsLoaded() || !graphNeedsLabsIcons(doc.root);
  const domains = useMemo(() => (doc && labsReady ? documentIconDomains(doc) : null), [doc, labsReady]);
  const loaded = doc === null || (domains !== null && areSopIconDomainsLoaded(domains));
  // The document whose downloads have finished; rendering without the drawings is still better than
  // no viewer if a download fails
  const [settled, setSettled] = useState<HoudiniNetworkDocument | null>(null);
  const ready = loaded || settled === doc;
  useEffect(() => {
    if (doc === null || ready) return;
    let active = true;
    const done = () => {
      if (active) setSettled(doc);
    };
    loadDocumentIcons(doc).then(done, done);
    return () => {
      active = false;
    };
  }, [doc, ready]);
  return ready;
}
