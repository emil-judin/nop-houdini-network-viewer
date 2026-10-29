import { useEffect, useState } from 'react';

/** Whether `query` matches now; `false` where `matchMedia` is missing (old test environments). */
function matches(query: string): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(query).matches;
}

/**
 * Follows a CSS media query (for example `(min-width: 768px)`) and re-renders when it changes.
 * Only for the playground page: viewer components use container queries instead.
 */
export function useMediaQuery(query: string): boolean {
  const [isMatch, setIsMatch] = useState(() => matches(query));
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const list = window.matchMedia(query);
    const update = () => setIsMatch(list.matches);
    update();
    list.addEventListener('change', update);
    return () => list.removeEventListener('change', update);
  }, [query]);
  return isMatch;
}
