import { useEffect, useRef, type RefObject } from 'react';

/**
 * When the single-letter hotkeys (H, F, I, U, O, Shift+S) react:
 * - `focus` (default): only while keyboard focus is inside the viewer (after clicking or tabbing
 *   into it). Speech input and typing elsewhere on the host page never trigger them (WCAG 2.1.4).
 * - `hover`: also while the pointer is over the viewer, like Houdini (used by the playground).
 * - `off`: never.
 */
export type HotkeyMode = 'focus' | 'hover' | 'off';

/**
 * Registers the viewer hotkeys on the window. `onKey` receives each key press that is meant for
 * this viewer and returns `true` when it handled it. It may change on every render.
 */
export function useViewerHotkeys(
  rootRef: RefObject<HTMLElement>,
  mode: HotkeyMode,
  onKey: (event: KeyboardEvent) => boolean,
) {
  const isPointerInsideRef = useRef(false);
  const onKeyRef = useRef(onKey);
  onKeyRef.current = onKey;

  useEffect(() => {
    if (mode === 'off') return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      const element = rootRef.current;
      if (!element) return;
      // `getRootNode()` is the shadow root inside the `<houdini-network>` web component
      const root = element.getRootNode() as Document | ShadowRoot;
      const hasFocusInside = element.contains(root.activeElement);
      if (!hasFocusInside && !(mode === 'hover' && isPointerInsideRef.current)) return;
      if (onKeyRef.current(event)) event.preventDefault();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, rootRef]);

  /** Pointer handlers for the viewer root, so `hover` mode knows where the pointer is. */
  return {
    onPointerEnter: () => {
      isPointerInsideRef.current = true;
    },
    onPointerLeave: () => {
      isPointerInsideRef.current = false;
    },
  };
}
