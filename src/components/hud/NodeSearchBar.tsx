import React, { useEffect, useId, useRef } from 'react';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { matchNodePath } from '../../schema/findNodes';
import type { NodeSearch } from '../hooks/useNodeSearch';
import { TOUCH_TARGET } from './touchTarget';

/**
 * Props for the node search field (`NodeSearchBar`).
 */
export interface NodeSearchBarProps {
  /** Search state from `useNodeSearch`. */
  search: NodeSearch;
  /** Changes each time the field should take focus and select its text (opening, `/` or `Ctrl+F` again). */
  focusRequest: number;
  /** Closes the search; `returnFocus` is `true` when keyboard focus was in it. */
  onClose: (returnFocus: boolean) => void;
}

/** Icon buttons in the style of the pane header's tools (Houdini's blue-grey `#474e62` highlight). */
const BUTTON_CLASS = `shrink-0 flex items-center justify-center w-6 h-6 rounded-[3px] text-[#c0c0c0] cursor-pointer hover:bg-[#474e62] hover:text-white focus-visible:bg-[#474e62] focus-visible:text-white disabled:opacity-40 disabled:cursor-default disabled:hover:bg-transparent ${TOUCH_TARGET}`;

/** What the status line says about the matches. */
function statusText(search: NodeSearch): string {
  if (!search.query.trim()) return 'Type a node name or type';
  const count = search.matches.length;
  if (count === 0) return 'No matches';
  if (search.index < 0) return count === 1 ? '1 match, Enter to show' : `${count} matches, Enter to show the first`;
  return `${search.index + 1} of ${count}`;
}

/**
 * Houdini's Find Node as a small floating field over the top of the canvas: it finds operator
 * nodes by name or operator type (with `*` and `?` wildcards) in the whole exported network,
 * subnetworks included. Enter shows the next match, Shift+Enter the previous one (also `Ctrl+G` and
 * `Ctrl+Shift+G`, or the arrow buttons on touch screens), Escape closes it. The field only reads:
 * finding a node never changes the network.
 *
 * Renders inside the viewer (no portal), so it keeps the scoped `.nop-root` styles.
 */
export const NodeSearchBar: React.FC<NodeSearchBarProps> = ({ search, focusRequest, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const statusId = useId();
  const shown = search.index >= 0 ? search.matches[search.index] : null;

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
    inputRef.current?.select();
  }, [focusRequest]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const withCommand = event.ctrlKey || event.metaKey;
    if (event.key === 'Enter' && !withCommand && !event.altKey) {
      event.preventDefault();
      if (event.shiftKey) search.previous();
      else search.next();
    } else if (withCommand && !event.altKey && event.code === 'KeyG') {
      event.preventDefault();
      if (event.shiftKey) search.previous();
      else search.next();
    } else if (withCommand && !event.altKey && !event.shiftKey && event.code === 'KeyF') {
      // Ctrl+F again selects the search text instead of opening the browser's find
      event.preventDefault();
      inputRef.current?.select();
    } else if (event.key === 'Escape') {
      // Only the search closes, not the inspector behind it
      event.preventDefault();
      event.stopPropagation();
      onClose(true);
    }
  };

  const hasMatches = search.matches.length > 0;

  return (
    <div
      role="search"
      aria-label="Find node"
      // Phones: the full canvas width; wider viewers: a field at the top right, like a Houdini pane tool
      className="absolute top-2 left-2 right-2 @md:left-auto @md:w-[340px] z-20 flex flex-col gap-0.5 p-1 rounded-[3px] border border-[#1f1f1f] bg-[#3a3a3a] shadow-[0_4px_12px_rgba(0,0,0,0.5)] select-none"
    >
      <div className="flex items-center gap-0.5">
        <Search className="shrink-0 w-4 h-4 mx-1 text-[#a8a8a8]" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={search.query}
          onChange={(event) => search.setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Find node by name or type"
          aria-describedby={statusId}
          placeholder="Find node"
          enterKeyHint="search"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          // 16px text on touch screens: iOS Safari zooms the page into smaller fields
          className="min-w-0 flex-1 h-6 px-1.5 rounded-[2px] bg-[#2b2b2b] border border-[#1f1f1f] text-[13px] text-[#dddddd] placeholder:text-[#999999] outline-none focus:border-[#6b85c4] select-text [@media(pointer:coarse)]:h-11 [@media(pointer:coarse)]:text-[16px]"
        />
        <button
          type="button"
          onClick={search.previous}
          disabled={!hasMatches}
          title="Find previous match (Ctrl+Shift+G)"
          aria-label="Previous match"
          className={BUTTON_CLASS}
        >
          <ChevronUp className="w-4 h-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={search.next}
          disabled={!hasMatches}
          title="Find next match (Ctrl+G)"
          aria-label="Next match"
          className={BUTTON_CLASS}
        >
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => onClose(false)} title="Close (Esc)" aria-label="Close node search" className={BUTTON_CLASS}>
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      <div className="flex items-baseline gap-2 px-1 text-[12px] leading-4">
        <span id={statusId} role="status" className="shrink-0 text-[#a8a8a8]">
          {statusText(search)}
        </span>
        {shown && (
          <span className="min-w-0 truncate text-[#d6d6d6]" title={matchNodePath(shown)}>
            {matchNodePath(shown)} <span className="text-[#a8a8a8]">({shown.node.type})</span>
          </span>
        )}
      </div>
    </div>
  );
};
