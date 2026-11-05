import { useEffect, useState } from 'react';
import { useStoreApi } from '@xyflow/react';

/** Longest time the network stays hidden while it waits for its first fit (an empty network never fits). */
const FIRST_FIT_TIMEOUT_MS = 400;

/**
 * Whether the start view has reached the screen. React Flow fits the view when it has measured the
 * nodes, but the nodes become visible one frame before the fitted zoom does, so without this the
 * visitor sees the network huge in the top-left corner for a frame before it jumps into place.
 *
 * `waitsForFit` is false when the viewer starts without a fit; the network then shows right away.
 * Must be used inside React Flow's provider. Once true, it stays true (later fits animate on screen).
 */
export function useFirstFitDone(waitsForFit: boolean): boolean {
  const store = useStoreApi();
  const [done, setDone] = useState(!waitsForFit);

  useEffect(() => {
    if (done) return;
    let frame = 0;
    // Two frames after the fit started: the fitted transform has been drawn by then
    const reveal = () => {
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setDone(true));
      });
    };
    let revealing = false;
    // React Flow's store updater (a child, so its effects ran first) has queued the fit by now
    const unsubscribe = store.subscribe((state) => {
      if (!revealing && !state.fitViewQueued) {
        revealing = true;
        reveal();
      }
    });
    if (!store.getState().fitViewQueued) {
      revealing = true;
      reveal();
    }
    const timer = window.setTimeout(() => setDone(true), FIRST_FIT_TIMEOUT_MS);
    return () => {
      unsubscribe();
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [done, store]);

  return done;
}
