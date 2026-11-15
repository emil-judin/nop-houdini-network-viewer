// @vitest-environment jsdom
import { fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { inspect, loadExample } from './inspectorHelpers';
import { giveNodesRealisticSizes, preferReducedMotion, pressKey, renderNetwork, viewport } from './viewerHelpers';

let restoreSizes: () => void;

/** The distinct views on screen, sampled every 5 ms for 500 ms after `act` runs. */
async function viewsDuring(act: () => void): Promise<string[]> {
  const seen = [JSON.stringify(viewport())];
  act();
  for (let i = 0; i < 100; i++) {
    await new Promise((resolve) => setTimeout(resolve, 5));
    const view = JSON.stringify(viewport());
    if (seen.at(-1) !== view) seen.push(view);
  }
  return seen;
}

beforeEach(() => {
  restoreSizes = giveNodesRealisticSizes();
});

afterEach(() => {
  restoreSizes();
  vi.unstubAllGlobals();
  window.localStorage.clear();
});

describe('accessibility', () => {
  it('NOP-A11Y-013: the resize handle is an operable separator', async () => {
    await renderNetwork(loadExample('start_here'), {}, 'box1');
    await inspect('box1');
    const handle = screen.getByRole('separator', { name: 'Resize the parameter panel' });
    expect(handle.getAttribute('aria-orientation')).toBe('vertical');
    for (const attribute of ['aria-valuenow', 'aria-valuemin', 'aria-valuemax']) {
      expect(Number(handle.getAttribute(attribute))).toBeGreaterThan(0);
    }
    expect(handle.tabIndex).toBe(0);
    const before = Number(handle.getAttribute('aria-valuenow'));
    handle.focus();
    fireEvent.keyDown(handle, { key: 'ArrowLeft' });
    expect(Number(handle.getAttribute('aria-valuenow'))).toBeGreaterThan(before);
  });

  it('NOP-A11Y-025: with reduced motion, framing and fitting jump without in-between views', async () => {
    preferReducedMotion();
    await renderNetwork(loadExample('start_here'), {}, 'box1');
    await inspect('box1');
    for (const key of ['KeyF', 'KeyH']) {
      const views = await viewsDuring(() => pressKey(key));
      expect(views.length).toBeLessThanOrEqual(2);
    }
  });

  it('NOP-A11Y-025: without reduced motion, the same frame is animated through in-between views', async () => {
    await renderNetwork(loadExample('start_here'), {}, 'box1');
    await inspect('box1');
    const views = await viewsDuring(() => pressKey('KeyF'));
    expect(views.length).toBeGreaterThan(2);
  });
});
