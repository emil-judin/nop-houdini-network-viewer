import React from 'react';
import { PanelLeftClose, PanelLeftOpen, type LucideIcon } from 'lucide-react';
import { TOUCH_TARGET } from '../components/hud/touchTarget';
import { PaneTabStrip } from './PaneTabStrip';

/** One network the visitor can show: a demo, their own file or the icon overview. */
export interface NetworksPanelItem {
  /** Unique key, passed to `onSelect`. */
  key: string;
  /** Name in the list. */
  label: string;
  /** Short muted text at the right end of the row (for example the node count). */
  detail?: string;
  /** One muted line under the name (for example what an example shows). */
  description?: string;
  /** Tooltip of the row. */
  title?: string;
  /** Row icon. */
  icon: LucideIcon;
}

/** A titled group of rows, like a folder in Houdini's Tree View. */
export interface NetworksPanelSection {
  /** Group title. */
  title: string;
  /** Rows of the group, in order. */
  items: NetworksPanelItem[];
  /** Muted line in place of the rows while there are none (pinned group only). */
  emptyText?: string;
}

/** Props for {@link NetworksPanel}. */
export interface NetworksPanelProps {
  /** Groups of networks, in order. Empty groups are not shown. */
  sections: NetworksPanelSection[];
  /** Key of the network on screen. */
  activeKey: string;
  /** Shows the network `key`. */
  onSelect: (key: string) => void;
  /** Whether the panel is folded to a thin strip. */
  collapsed: boolean;
  /** Folds or unfolds the panel. */
  onToggleCollapsed: () => void;
  /** Narrow screens: the unfolded panel floats over the network instead of narrowing it. */
  overlay: boolean;
  /**
   * A group right under the list that never scrolls out of view: its title always shows, then its
   * rows (scrolling on their own when there are many) and `pinnedContent` under them.
   */
  pinnedSection?: NetworksPanelSection;
  /** Content under the rows of the pinned group (for example the open and paste buttons). */
  pinnedContent?: React.ReactNode;
  /** Content fixed at the bottom of the unfolded panel, under the list (for example the NOP logo). */
  footer?: React.ReactNode;
}

const PANEL_ID = 'playground-networks-panel';

/** Square icon button of the pane tab strip. */
const STRIP_BUTTON = `flex items-center justify-center w-6 h-6 rounded-[3px] text-[#c0c0c0] hover:bg-[#474e62] hover:text-white cursor-pointer ${TOUCH_TARGET}`;

/** The rows of one group of the pane. */
const SectionRows: React.FC<{
  items: NetworksPanelItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  className?: string;
}> = ({ items, activeKey, onSelect, className }) => (
  <ul className={className}>
    {items.map(({ key, label, detail, description, title, icon: Icon }) => {
      const active = key === activeKey;
      const muted = active ? 'text-[#c4c9d8]' : 'text-[#a8a8a8] group-hover:text-[#c0c0c0]';
      return (
        <li key={key}>
          <button
            type="button"
            onClick={() => onSelect(key)}
            aria-current={active ? 'true' : undefined}
            title={title}
            // Houdini's selection highlight is the same blue-grey as its pressed buttons
            className={`group w-full flex gap-2 pl-4 pr-2 text-left text-[13px] cursor-pointer ${TOUCH_TARGET} ${
              description ? 'items-start py-1' : 'items-center h-6'
            } ${active ? 'bg-[#474e62] text-white' : 'text-[#d6d6d6] hover:bg-[#444444] hover:text-white'}`}
          >
            <Icon className={`shrink-0 w-3.5 h-3.5 ${description ? 'mt-[3px]' : ''}`} aria-hidden="true" />
            <span className="flex-1 min-w-0">
              <span className="block truncate">{label}</span>
              {/* Trial (2026-11-04): room for two lines in every row, so all examples are the same height */}
              {description && (
                <span className={`block min-h-[33px] line-clamp-2 text-[12px] leading-[1.35] ${muted}`}>
                  {description}
                </span>
              )}
            </span>
            {detail && <span className={`shrink-0 text-[12px] ${description ? 'mt-px' : ''} ${muted}`}>{detail}</span>}
          </button>
        </li>
      );
    })}
  </ul>
);

/**
 * Collapsible side pane in the style of a Houdini pane (Tree View): a pane tab strip on top and a
 * list of the networks the playground can show, grouped like folders.
 */
export const NetworksPanel: React.FC<NetworksPanelProps> = ({
  sections,
  activeKey,
  onSelect,
  collapsed,
  onToggleCollapsed,
  overlay,
  pinnedSection,
  pinnedContent,
  footer,
}) => {
  // Folded: a thin pane with the name written vertically, the whole strip opens the panel
  const strip = (
    <button
      type="button"
      onClick={onToggleCollapsed}
      aria-expanded={!collapsed}
      aria-controls={PANEL_ID}
      aria-label="Show networks panel"
      title="Show networks panel"
      className={`shrink-0 flex flex-col items-center gap-2 w-7 pt-1.5 bg-[#383838] text-[#c0c0c0] hover:text-white cursor-pointer ${TOUCH_TARGET}`}
    >
      <PanelLeftOpen className="w-4 h-4" aria-hidden="true" />
      <span className="text-[13px] [writing-mode:vertical-rl]">Networks</span>
    </button>
  );

  if (collapsed) return strip;

  const panel = (
    // Delegated key handling: Escape anywhere inside the floating panel folds it
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <aside
      id={PANEL_ID}
      aria-label="Networks"
      onKeyDown={(event) => {
        if (overlay && event.key === 'Escape') onToggleCollapsed();
      }}
      // Wider beside the network on desktops; narrower where it floats over the network on phones
      className={`flex flex-col bg-[#383838] ${overlay ? 'w-60 absolute inset-y-0 left-0 z-30 shadow-[4px_0_12px_rgba(0,0,0,0.5)]' : 'w-80 shrink-0'}`}
    >
      <PaneTabStrip label="Networks">
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-expanded={true}
          aria-controls={PANEL_ID}
          aria-label="Hide networks panel"
          title="Hide networks panel"
          className={STRIP_BUTTON}
        >
          <PanelLeftClose className="w-4 h-4" aria-hidden="true" />
        </button>
      </PaneTabStrip>

      {/* Docked: the pinned group follows the list directly, and when space runs short only the list
          scrolls. Floating (phones): the whole pane scrolls as one, footer included, and nothing is
          pinned (owner decision 2026-11-05); the scroll never carries over to the page. */}
      <div className={`flex-1 min-h-0 ${overlay ? 'overflow-y-auto overscroll-contain' : 'flex flex-col'}`}>
        <div className={overlay ? 'pt-1' : 'min-h-0 overflow-y-auto pt-1'}>
          {sections
            .filter((section) => section.items.length > 0)
            .map((section) => (
              <section key={section.title} className="mb-2">
                <h2 className="px-2 py-1 text-[12px] font-bold text-[#a8a8a8]">{section.title}</h2>
                <SectionRows items={section.items} activeKey={activeKey} onSelect={onSelect} />
              </section>
            ))}
        </div>

        {pinnedSection && (
          <section className="shrink-0">
            <h2 className="px-2 py-1 text-[12px] font-bold text-[#a8a8a8]">{pinnedSection.title}</h2>
            {/* Many files scroll here, so the list of examples above keeps its room */}
            {pinnedSection.items.length === 0 && pinnedSection.emptyText ? (
              <p className="px-2 py-1 text-center text-[12px] text-[#a8a8a8]">{pinnedSection.emptyText}</p>
            ) : (
              <SectionRows
                items={pinnedSection.items}
                activeKey={activeKey}
                onSelect={onSelect}
                className={overlay ? undefined : 'max-h-[132px] overflow-y-auto'}
              />
            )}
            {pinnedContent}
          </section>
        )}
        {overlay && footer}
      </div>
      {!overlay && footer && <div className="shrink-0">{footer}</div>}
    </aside>
  );

  // Narrow screens keep the strip's space, so the network does not move under the floating panel.
  // A tap anywhere else folds the floating panel; that tap only folds it and does not reach the
  // network below (the keyboard has Escape)
  return overlay ? (
    <>
      <div className="shrink-0 w-7 [@media(pointer:coarse)]:w-11 bg-[#383838]" aria-hidden="true" />
      <div className="fixed inset-0 z-20" aria-hidden="true" onClick={onToggleCollapsed} />
      {panel}
    </>
  ) : (
    panel
  );
};
