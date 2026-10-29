import { useEffect, useLayoutEffect, useState, type RefObject } from 'react';

/** `useLayoutEffect` in the browser, `useEffect` during server rendering (where it would warn). */
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Content size of an element in CSS pixels, kept up to date with a `ResizeObserver`.
 * The first measurement happens before the first paint (so layout choices based on it, such as the
 * start view, are right from the start); `0 x 0` before that and where there is no layout.
 */
export function useElementSize(ref: RefObject<HTMLElement | null>): { width: number; height: number } {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useBrowserLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = (width: number, height: number) =>
      setSize((s) => (s.width === width && s.height === height ? s : { width, height }));
    update(element.clientWidth, element.clientHeight);
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(([entry]) => update(entry.contentRect.width, entry.contentRect.height));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}
