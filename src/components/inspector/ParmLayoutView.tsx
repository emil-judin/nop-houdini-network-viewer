import React, { useState } from 'react';
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
 * Tab bar of `tabs` / `radio` folders. Switching tabs only changes what is shown (view-only).
 */
const FolderTabs: React.FC<{ item: Extract<ParmLayoutItem, { kind: 'tabs' }> }> = ({ item }) => {
  const [active, setActive] = useState(0);
  const current = item.tabs[Math.min(active, item.tabs.length - 1)];
  return (
    <div className="mt-1.5">
      <div role="tablist" className="flex flex-wrap items-center gap-0.5 px-1 pb-1 border-b-2 border-[#282828]">
        {item.tabs.map((tab, index) => {
          const selected = tab === current;
          return (
            <button
              key={`${index}-${tab.label}`}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(index)}
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
      <div role="tabpanel" className="py-1">
        <ParmLayoutView items={current.children} />
      </div>
    </div>
  );
};

/**
 * Renders a Parameter Pane layout tree (lines, sections and tab bars) recursively.
 */
export const ParmLayoutView: React.FC<{ items: ParmLayoutItem[] }> = ({ items }) => (
  <>
    {items.map((item) => {
      if (item.kind === 'line') return <ParmLine key={item.key} rows={item.rows} />;
      if (item.kind === 'tabs') return <FolderTabs key={item.key} item={item} />;
      return <FolderSection key={item.key} item={item} />;
    })}
  </>
);
