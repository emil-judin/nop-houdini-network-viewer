import { useCallback, useEffect, useState, type RefObject } from 'react';

/**
 * Fullscreen state of one viewer:
 * - `native`: the browser Fullscreen API shows the viewer container.
 * - `css`: a full-viewport overlay, used where the API is unavailable (iPhone Safari) or blocked
 *   (an iframe without `allowfullscreen`).
 */
export type FullscreenMode = 'off' | 'native' | 'css';

/** The element in native fullscreen as seen from `element` (inside a Shadow DOM: its shadow root). */
function fullscreenElementFor(element: HTMLElement): Element | null {
  const root = element.getRootNode() as Document | ShadowRoot;
  return root.fullscreenElement ?? null;
}

/**
 * Fullscreen for the viewer whose outer element is `containerRef`. Several viewers on one page
 * each keep their own state: only the viewer that is actually fullscreen switches its layout.
 */
export function useFullscreen(containerRef: RefObject<HTMLElement>) {
  const [mode, setMode] = useState<FullscreenMode>('off');

  useEffect(() => {
    const handleChange = () => {
      const container = containerRef.current;
      if (!container) return;
      const isOwn = fullscreenElementFor(container) === container;
      setMode((current) => (isOwn ? 'native' : current === 'native' ? 'off' : current));
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, [containerRef]);

  // The CSS fallback has no browser chrome to exit it: support Escape and stop the page behind from scrolling
  useEffect(() => {
    if (mode !== 'css') return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMode('off');
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mode]);

  const toggle = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;
    if (mode === 'native') {
      await document.exitFullscreen().catch(() => undefined);
      return;
    }
    if (mode === 'css') {
      setMode('off');
      return;
    }
    // Feature-detect the Fullscreen API (regular elements cannot go fullscreen on iPhone Safari)
    if (document.fullscreenEnabled && typeof container.requestFullscreen === 'function') {
      try {
        await container.requestFullscreen();
        return;
      } catch {
        // Blocked (for example inside an iframe without `allowfullscreen`): use the CSS fallback
      }
    }
    setMode('css');
  }, [containerRef, mode]);

  return { mode, isFullscreen: mode !== 'off', toggle };
}
