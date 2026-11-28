import React, { useId, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { TOUCH_TARGET } from '../hud/touchTarget';
import { ParmLine } from './ParmLine';
import type { ParmLayoutItem } from './parmModel';

/**
 * Section band of a folder, as in Houdini: a dark top line, a slightly lighter `#343434` band with
 * the grey title, and the contents on `#2f2f2f`. Collapsible folders get an expand arrow.
 */
const FolderSection: React.FC<{ item: Extract<ParmLayoutItem, { kind: 'folder' }> }> = ({ item }) => {
  const collapsible = item.folderType === 'collapsible';
  // Collapsible folders start closed, as in Houdini
  const [open, setOpen] = useState(!collapsible);
  if (item.folderType === 'import') {
    return <ParmLayoutView items={item.children} />;
  }
  const title = (
    <span className="truncate">
      {item.label}
    </span>
  );
  return (
    <section className="mt-1">
      {collapsible ? (
        // Houdini draws a collapsible folder as a plain row: grey chevron and title on the pane background
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className={`w-full h-[30px] px-1 flex items-center gap-1.5 text-[13px] text-[#a6a6a6] hover:text-[#d0d0d0] cursor-pointer text-left ${TOUCH_TARGET}`}
        >
          <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} aria-hidden="true" />
          {title}
        </button>
      ) : (
        <div className="h-[30px] px-2 flex items-center border-t-2 border-[#282828] bg-[#343434] text-[13px] text-[#a6a6a6]">
          {title}
        </div>
      )}
      {open && (
        <div className={collapsible ? 'pb-1' : 'bg-[#2f2f2f] py-1'}>
          <ParmLayoutView items={item.children} />
        </div>
      )}
    </section>
  );
};

/**
 * A multiparm as in Houdini's Parameter Pane: the count row ("Number of Attributes"), then one block
 * per entry. Houdini frames each entry in a darker inset with a thin border and keeps a narrow column
 * on its left for the entry's insert and remove buttons; the viewer is view-only, so that column shows
 * the entry number instead and there are no count buttons (+, -, Clear) either.
 */
const MultiparmSection: React.FC<{ item: Extract<ParmLayoutItem, { kind: 'multiparm' }> }> = ({ item }) => (
  <div className="mt-1">
    {item.count && <ParmLine rows={[item.count]} />}
    {item.blocks.length > 0 && (
      <div className="mx-1 mt-0.5 mb-1 flex flex-col gap-[3px]">
        {item.blocks.map((block) => (
          <div
            key={block.key}
            role="group"
            aria-label={block.index === null ? item.label : `${item.label} ${block.index}`}
            data-multiparm-entry={block.index ?? undefined}
            className="flex border border-[#232323] rounded-[2px] bg-[#292929]"
          >
            <div
              className="w-[22px] shrink-0 pt-[7px] text-center text-[11px] leading-none tabular-nums text-[#9a9a9a] border-r border-[#232323]"
              aria-hidden="true"
            >
              {block.index}
            </div>
            <div className="flex-1 min-w-0 py-[2px]">
              <ParmLayoutView items={block.children} />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

/**
 * Tab bar of `tabs` / `radio` folders. Switching tabs only changes what is shown (view-only).
 * Follows the WAI-ARIA tabs pattern: one tab in the Tab order, Left / Right / Home / End move
 * between tabs.
 */
const FolderTabs: React.FC<{ item: Extract<ParmLayoutItem, { kind: 'tabs' }> }> = ({ item }) => {
  const [active, setActive] = useState(0);
  const activeIndex = Math.min(active, item.tabs.length - 1);
  const current = item.tabs[activeIndex];
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectTab = (index: number) => {
    const count = item.tabs.length;
    const next = (index + count) % count;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: item.tabs.length - 1,
    };
    if (!Object.hasOwn(keys, event.key)) return;
    event.preventDefault();
    selectTab(keys[event.key]);
  };

  return (
    <div className="mt-1.5">
      <div
        role="tablist"
        className="flex flex-wrap items-center gap-0.5 px-1 pb-1 border-b-2 border-[#282828]"
      >
        {item.tabs.map((tab, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={`${index}-${tab.label}`}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={handleKeyDown}
              // Houdini 22: the active tab is a blue-grey pill with bold white text, others are plain grey text
              className={`h-[24px] px-2 rounded-[3px] text-[13px] cursor-pointer ${TOUCH_TARGET} ${
                selected ? 'bg-[#474e62] text-white font-bold' : 'text-[#a6a6a6] hover:text-[#d0d0d0]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${activeIndex}`} className="py-1">
        <ParmLayoutView items={current.children} />
      </div>
    </div>
  );
};

/**
 * Renders a Parameter Pane layout tree (lines, sections, multiparm blocks and tab bars) recursively.
 */
export const ParmLayoutView: React.FC<{ items: ParmLayoutItem[] }> = ({ items }) => (
  <>
    {items.map((item) => {
      if (item.kind === 'line') return <ParmLine key={item.key} rows={item.rows} />;
      if (item.kind === 'tabs') return <FolderTabs key={item.key} item={item} />;
      if (item.kind === 'multiparm') return <MultiparmSection key={item.key} item={item} />;
      return <FolderSection key={item.key} item={item} />;
    })}
  </>
);
