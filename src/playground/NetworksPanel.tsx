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
  /** Content fixed at the top of the unfolded panel, above the list (for example open and paste buttons). */
  actions?: React.ReactNode;
  /** Content fixed at the bottom of the unfolded panel, under the list (for example the NOP logo). */
  footer?: React.ReactNode;
}

const PANEL_ID = 'playground-networks-panel';

/** Square icon button of the pane tab strip. */
const STRIP_BUTTON = `flex items-center justify-center w-6 h-6 rounded-[3px] text-[#c0c0c0] hover:bg-[#474e62] hover:text-white cursor-pointer ${TOUCH_TARGET}`;

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
  actions,
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
      className={`flex flex-col w-60 bg-[#383838] ${overlay ? 'absolute inset-y-0 left-0 z-30 shadow-[4px_0_12px_rgba(0,0,0,0.5)]' : 'shrink-0'}`}
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

      {actions && <div className="shrink-0 border-b border-[#2d2d2d]">{actions}</div>}

      <div className="flex-1 min-h-0 overflow-y-auto py-1">
        {sections
          .filter((section) => section.items.length > 0)
          .map((section) => (
            <section key={section.title} className="mb-2">
              <h2 className="px-2 py-1 text-[12px] font-bold text-[#a8a8a8]">{section.title}</h2>
              <ul>
                {section.items.map(({ key, label, detail, description, title, icon: Icon }) => {
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
                          {description && <span className={`block text-[12px] leading-[1.35] ${muted}`}>{description}</span>}
                        </span>
                        {detail && <span className={`shrink-0 text-[12px] ${description ? 'mt-px' : ''} ${muted}`}>{detail}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
      </div>

      {footer && <div className="shrink-0">{footer}</div>}
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
