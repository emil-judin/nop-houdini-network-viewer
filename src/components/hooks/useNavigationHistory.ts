import { useCallback, useMemo, useState } from 'react';
import { canDiveInto, resolveSubnetLevels, type SubnetLevel } from '../../schema/subnetPath';
import type { HoudiniNetworkDocument, HoudiniNodeData } from '../../schema/types';

/**
 * Subnetwork navigation of one document, like Houdini's path bar: `history[index]` is the network on
 * screen (names of the subnetworks dived into, from the exported root down), `history` the back /
 * forward list, and `trail` the deepest visited path below the network on screen (dimmed in the bar).
 */
interface NavigationState {
  doc: HoudiniNetworkDocument;
  history: string[][];
  index: number;
  trail: string[];
}

const NO_DIVE_PATH: string[] = [];
const START_HISTORY = [NO_DIVE_PATH];

/** Navigation at the exported root, with no history. */
function startNavigation(doc: HoudiniNetworkDocument): NavigationState {
  return { doc, history: START_HISTORY, index: 0, trail: NO_DIVE_PATH };
}

/** `true` when `path` starts with all of `prefix`. */
export function isPathPrefix(prefix: readonly string[], path: readonly string[]): boolean {
  return prefix.length <= path.length && prefix.every((name, i) => path[i] === name);
}

/** Subnetwork names of a level stack (the root level has none). */
export function levelNames(levels: SubnetLevel[]): string[] {
  return levels.slice(1).map((level) => level.node?.name ?? '');
}

/**
 * Called before the network on screen changes, with the subnetwork names of the current and the
 * next network. The viewer uses it to remember the current view and what to select afterwards.
 */
export type BeforeNavigate = (current: string[], next: string[]) => void;

/**
 * Back / forward history, trail and dive-in navigation through the subnetworks of `doc`.
 * Loading another document starts again at its root.
 */
export function useNavigationHistory(doc: HoudiniNetworkDocument, beforeNavigate: BeforeNavigate) {
  const [storedNav, setNav] = useState<NavigationState>(() => startNavigation(doc));
  const nav = storedNav.doc === doc ? storedNav : startNavigation(doc);
  const divePath = nav.history[nav.index];
  const levels = useMemo(() => resolveSubnetLevels(doc.root, divePath), [doc.root, divePath]);
  const trailLevels = useMemo(() => resolveSubnetLevels(doc.root, nav.trail), [doc.root, nav.trail]);
  const activeGraph = levels[levels.length - 1].graph;

  /**
   * Shows the network at `path`. Adds it to the history, or moves to `historyIndex` for back /
   * forward. The trail is kept while `path` lies on it, like Houdini.
   */
  const goTo = useCallback(
    (path: string[], historyIndex?: number) => {
      beforeNavigate(levelNames(levels), path);
      const trailPath = levelNames(trailLevels);
      const trail = isPathPrefix(path, trailPath) ? trailPath : path;
      if (historyIndex !== undefined) {
        setNav({ ...nav, index: historyIndex, trail });
      } else {
        const history = [...nav.history.slice(0, nav.index + 1), path];
        setNav({ doc, history, index: history.length - 1, trail });
      }
    },
    [beforeNavigate, doc, levels, nav, trailLevels],
  );

  /** Shows the level at `depth` of the path bar trail (`0` is the exported root). */
  const navigateToDepth = useCallback(
    (depth: number) => {
      if (depth < 0 || depth >= trailLevels.length || depth === levels.length - 1) return;
      goTo(levelNames(trailLevels).slice(0, depth));
    },
    [goTo, levels.length, trailLevels],
  );

  /** Dives into a subnetwork node of the network on screen. */
  const diveInto = useCallback(
    (node: HoudiniNodeData) => {
      if (!canDiveInto(node)) return;
      goTo([...levelNames(levels), node.name]);
    },
    [goTo, levels],
  );

  const goBack = useCallback(() => {
    if (nav.index > 0) goTo(nav.history[nav.index - 1], nav.index - 1);
  }, [goTo, nav]);

  const goForward = useCallback(() => {
    if (nav.index < nav.history.length - 1) goTo(nav.history[nav.index + 1], nav.index + 1);
  }, [goTo, nav]);

  return {
    levels,
    trailLevels,
    activeGraph,
    depth: levels.length - 1,
    canGoBack: nav.index > 0,
    canGoForward: nav.index < nav.history.length - 1,
    navigateToDepth,
    diveInto,
    goBack,
    goForward,
  };
}
