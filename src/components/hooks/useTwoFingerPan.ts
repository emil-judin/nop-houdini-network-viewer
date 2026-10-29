import { useEffect, useState, type RefObject } from 'react';

/**
 * How touch input moves the network (see `HoudiniNetworkProps.touchPan`):
 * - `two-fingers`: one finger scrolls the page past the viewer, two fingers move and zoom the network.
 * - `one-finger`: one finger moves the network, like a mouse drag.
 */
export type TouchPanMode = 'two-fingers' | 'one-finger';

/**
 * How long the "use two fingers" hint stays after the last one-finger move over the canvas: long
 * enough to lift the finger and tap its fullscreen button.
 */
const HINT_MS = 2500;

/**
 * Two-finger touch mode for the canvas inside `rootRef`, like map embeds on scrolling pages. While
 * `enabled`, a one-finger touch on the canvas never reaches React Flow's pan handler, so the browser
 * scrolls the page (the `nop-two-finger-pan` class in `viewer.css` allows that); taps still select
 * nodes. A second finger starts React Flow's pinch, which also pans.
 *
 * @returns `true` while the viewer should show the "use two fingers" hint.
 */
export function useTwoFingerPan(rootRef: RefObject<HTMLElement>, enabled: boolean): boolean {
  const [hintVisible, setHintVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) {
      setHintVisible(false);
      return;
    }
    let hintTimer: number | undefined;
    // The touch started with one finger (so the page scrolls); false once a second finger joins
    let oneFingerTouch = false;
    const onCanvas = (event: TouchEvent) => {
      const target = event.target as Element;
      return Boolean(target.closest?.('.react-flow')) && !target.closest('.react-flow__minimap');
    };
    // Capture phase on the viewer: runs before React Flow's handler on the canvas below
    const handleTouchStart = (event: TouchEvent) => {
      if (!onCanvas(event)) return;
      oneFingerTouch = event.touches.length === 1;
      if (oneFingerTouch) {
        event.stopPropagation();
      } else {
        // A second finger has joined: the visitor got the hint
        window.clearTimeout(hintTimer);
        setHintVisible(false);
      }
    };
    const handleTouchMove = (event: TouchEvent) => {
      if (!oneFingerTouch || event.touches.length !== 1 || !onCanvas(event)) return;
      setHintVisible(true);
      window.clearTimeout(hintTimer);
      hintTimer = window.setTimeout(() => setHintVisible(false), HINT_MS);
    };
    root.addEventListener('touchstart', handleTouchStart, { capture: true, passive: true });
    root.addEventListener('touchmove', handleTouchMove, { capture: true, passive: true });
    return () => {
      window.clearTimeout(hintTimer);
      root.removeEventListener('touchstart', handleTouchStart, { capture: true });
      root.removeEventListener('touchmove', handleTouchMove, { capture: true });
    };
  }, [enabled, rootRef]);

  return hintVisible;
}
