import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Camera, Check, Map as MapIcon, Settings } from 'lucide-react';
import type { HoudiniWireStyle } from '../../schema/types';
import { TOUCH_TARGET } from './touchTarget';

/**
 * Wire style choices with a tiny preview of each wire shape (the header buttons in wide viewers and
 * the settings menu in narrow ones).
 */
export const WIRE_STYLE_OPTIONS: Array<{ style: HoudiniWireStyle; label: string; description: string; glyph: string }> = [
  {
    style: 'default',
    label: 'Default (straight)',
    description: 'Default wires (straight with rounded bends)',
    glyph: 'M4 1V4.5L10 9.5V13',
  },
  {
    style: 'rounded',
    label: 'Rounded',
    description: 'Rounded wires (horizontal runs with rounded corners)',
    glyph: 'M3 1V3.5A2 2 0 0 0 5 5.5H8.5A2.5 2.5 0 0 1 11 8V13',
  },
];

/** Tiny wire preview of a wire style (14 x 14 glyph). */
export const WireGlyph: React.FC<{ glyph: string }> = ({ glyph }) => (
  <svg viewBox="0 0 14 14" className="shrink-0 w-4 h-4" aria-hidden="true">
    <path d={glyph} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Props for the settings button and its drop-down menu (`ViewSettingsMenu`).
 */
export interface ViewSettingsMenuProps {
  /** Current wire style (`default` or `rounded`). */
  wireStyle: HoudiniWireStyle;
  /** Callback when the user picks a wire style. */
  onChangeWireStyle: (style: HoudiniWireStyle) => void;
  /** Whether the network overview (minimap) is shown. */
  miniMapVisible: boolean;
  /** Shows or hides the network overview (also the `O` hotkey). */
  onToggleMiniMap: () => void;
  /** Saves what the network shows as a PNG; without it there is no screenshot item. */
  onScreenshot?: () => void;
  /** Class names of the toolbar's icon buttons, `pressed` while the menu is open. */
  buttonClassName: (pressed: boolean) => string;
}

/** Houdini's menu highlight is the blue-grey of its pressed buttons. */
const ITEM_CLASS = `flex items-center gap-2 w-full h-6 pl-1.5 pr-3 text-left text-[13px] text-[#d6d6d6] outline-none cursor-pointer hover:bg-[#474e62] hover:text-white focus-visible:bg-[#474e62] focus-visible:text-white ${TOUCH_TARGET}`;

/** Thin line between the menu's sections. */
const MenuSeparator: React.FC = () => <div role="separator" className="my-1 h-px bg-[#2d2d2d]" />;

/** Left column of a menu item: a check mark when it is on. */
const CheckColumn: React.FC<{ checked: boolean }> = ({ checked }) => (
  <span className="shrink-0 flex justify-center w-4" aria-hidden="true">
    {checked && <Check className="w-3.5 h-3.5" />}
  </span>
);

/**
 * Settings button of the pane header in narrow viewers (phones), with a drop-down menu in the style
 * of Houdini's menus: the wire style, the network overview and the screenshot, which wide viewers
 * show as their own header buttons. `Shift+S` and `O` still work.
 *
 * The menu renders inside the viewer (no portal), so it keeps the scoped `.nop-root` styles.
 */
export const ViewSettingsMenu: React.FC<ViewSettingsMenuProps> = ({
  wireStyle,
  onChangeWireStyle,
  miniMapVisible,
  onToggleMiniMap,
  onScreenshot,
  buttonClassName,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // A press anywhere outside closes the menu (`composedPath` also sees through a Shadow DOM)
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      const container = containerRef.current;
      if (container && !event.composedPath().includes(container)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, [open]);

  // Opening moves the focus to the checked wire style, like a native menu
  useEffect(() => {
    if (open) menuRef.current?.querySelector<HTMLElement>('[role="menuitemradio"][aria-checked="true"]')?.focus();
  }, [open]);

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]') ?? []);
    const index = items.indexOf(event.target as HTMLElement);
    let next: HTMLElement | undefined;
    switch (event.key) {
      case 'ArrowDown':
        next = items[(index + 1) % items.length];
        break;
      case 'ArrowUp':
        next = items[(index - 1 + items.length) % items.length];
        break;
      case 'Home':
        next = items[0];
        break;
      case 'End':
        next = items[items.length - 1];
        break;
      case 'Escape':
        // Only the menu closes, not the inspector or the fullscreen view behind it
        event.preventDefault();
        event.stopPropagation();
        close(true);
        return;
      case 'Tab':
        setOpen(false);
        return;
      default:
        return;
    }
    event.preventDefault();
    next?.focus();
  };

  /** Runs a menu action, then closes the menu like Houdini's menus do. */
  const choose = (action: () => void) => {
    action();
    close(true);
  };

  return (
    <div ref={containerRef} className="relative flex items-center">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        title="View settings (wire style, overview, screenshot)"
        aria-label="View settings"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        className={buttonClassName(open)}
      >
        <Settings className="w-4 h-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label="View settings"
          // Focus moves to the items, not the menu itself (the items are reached with the arrow keys)
          tabIndex={-1}
          onKeyDown={handleMenuKeyDown}
          className="absolute right-0 top-full mt-1 z-50 min-w-[212px] py-1 rounded-[3px] border border-[#1f1f1f] bg-[#3a3a3a] shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          {/* Section title with the hotkey on the right, like Houdini shows hotkeys in its menus */}
          <div className="flex items-center justify-between gap-4 pl-7 pr-3 pt-0.5 pb-1 text-[12px] text-[#a8a8a8]" aria-hidden="true">
            <span className="font-bold">Wire Style</span>
            <span>Shift+S</span>
          </div>
          <div role="group" aria-label="Wire style">
            {WIRE_STYLE_OPTIONS.map(({ style, label, description, glyph }) => (
              <button
                key={style}
                type="button"
                role="menuitemradio"
                aria-checked={wireStyle === style}
                aria-label={description}
                title={description}
                tabIndex={-1}
                onClick={() => choose(() => onChangeWireStyle(style))}
                className={ITEM_CLASS}
              >
                <CheckColumn checked={wireStyle === style} />
                <WireGlyph glyph={glyph} />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <MenuSeparator />
          <button
            type="button"
            role="menuitemcheckbox"
            aria-checked={miniMapVisible}
            tabIndex={-1}
            onClick={() => choose(onToggleMiniMap)}
            className={ITEM_CLASS}
          >
            <CheckColumn checked={miniMapVisible} />
            <MapIcon className="shrink-0 w-4 h-4" aria-hidden="true" />
            <span className="flex-1">Network overview</span>
            <span className="text-[12px] text-[#a8a8a8]" aria-hidden="true">
              O
            </span>
          </button>
          {onScreenshot && (
            <>
              <MenuSeparator />
              <button type="button" role="menuitem" tabIndex={-1} onClick={() => choose(onScreenshot)} className={ITEM_CLASS}>
                <CheckColumn checked={false} />
                <Camera className="shrink-0 w-4 h-4" aria-hidden="true" />
                <span>Save screenshot (PNG)</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
