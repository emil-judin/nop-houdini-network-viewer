import { useEffect, useRef, type RefObject } from 'react';

/**
 * When the single-key hotkeys (H, F, I, U, O, Shift+S, /) react:
 * - `focus` (default): only while keyboard focus is inside the viewer (after clicking or tabbing
 *   into it). Speech input and typing elsewhere on the host page never trigger them (WCAG 2.1.4).
 * - `hover`: also while the pointer is over the viewer, like Houdini (used by the playground).
 * - `off`: never.
 */
export type HotkeyMode = 'focus' | 'hover' | 'off';

/**
 * Registers the viewer hotkeys on the window. `onKey` receives each key press that is meant for
 * this viewer and returns `true` when it handled it. It may change on every render.
 *
 * Keys with Alt never reach `onKey`. Keys with Ctrl or Cmd (such as `Ctrl+F` for the node search)
 * reach it only while keyboard focus is inside the viewer, whatever the mode, so the browser's
 * own shortcuts keep working everywhere else on the host page.
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
      if (event.altKey || event.repeat) return;
      // The innermost target: inside the web component's Shadow DOM, `event.target` is only the host element
      const target = (event.composedPath()[0] ?? event.target) as HTMLElement | null;
      if (target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      const element = rootRef.current;
      if (!element) return;
      // `getRootNode()` is the shadow root inside the `<houdini-network>` web component
      const root = element.getRootNode() as Document | ShadowRoot;
      const hasFocusInside = element.contains(root.activeElement);
      const withCommand = event.ctrlKey || event.metaKey;
      if (!hasFocusInside && (withCommand || !(mode === 'hover' && isPointerInsideRef.current))) return;
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
