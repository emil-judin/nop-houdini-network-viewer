import { useCallback, useMemo, useState } from 'react';
import { findNodes, type NodeSearchMatch } from '../../schema/findNodes';
import type { HoudiniNetworkGraph } from '../../schema/types';

/**
 * State of the viewer's node search (Houdini's Find Node): whether the search field is open, the
 * search text, its matches in the whole document and which match is shown.
 *
 * `onShow` is called with the match to show each time the visitor steps to one. The search text
 * and its position stay when the field closes, so Find Next Match keeps working, like in Houdini.
 */
export function useNodeSearch(root: HoudiniNetworkGraph, onShow: (match: NodeSearchMatch) => void) {
  const [isOpen, setOpen] = useState(false);
  const [query, setStoredQuery] = useState('');
  // Index of the match on screen, `-1` before the first step
  const [index, setIndex] = useState(-1);
  const [searchedRoot, setSearchedRoot] = useState(root);
  // A new document starts the search again (set while rendering, React's pattern for derived state)
  if (searchedRoot !== root) {
    setSearchedRoot(root);
    setIndex(-1);
  }
  const matches = useMemo(() => findNodes(root, query), [root, query]);

  const setQuery = useCallback((text: string) => {
    setStoredQuery(text);
    setIndex(-1);
  }, []);

  /** Shows the next match (`step` 1) or the previous one (`step` -1), wrapping around. */
  const step = useCallback(
    (direction: 1 | -1): boolean => {
      if (matches.length === 0) return false;
      const start = index < 0 ? (direction === 1 ? -1 : 0) : index;
      const next = (start + direction + matches.length) % matches.length;
      setIndex(next);
      onShow(matches[next]);
      return true;
    },
    [index, matches, onShow],
  );

  return {
    isOpen,
    query,
    matches,
    /** Index of the match on screen in `matches`, `-1` when none was shown yet. */
    index: index < matches.length ? index : -1,
    open: useCallback(() => setOpen(true), []),
    close: useCallback(() => setOpen(false), []),
    setQuery,
    next: useCallback(() => step(1), [step]),
    previous: useCallback(() => step(-1), [step]),
  };
}

/** What `useNodeSearch` returns. */
export type NodeSearch = ReturnType<typeof useNodeSearch>;
