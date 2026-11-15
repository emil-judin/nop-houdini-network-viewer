// @vitest-environment jsdom
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { node } from '../unit/networkFixtures';
import { documentOf, inspect, renderViewer, setViewerSize } from './inspectorHelpers';

const WIDTH_KEY = 'nop-inspector-width';
const HEIGHT_KEY = 'nop-inspector-height';

beforeEach(() => {
  // jsdom has no pointer capture; the resize handle captures the pointer while dragging
  Object.defineProperty(Element.prototype, 'setPointerCapture', { value: () => undefined, configurable: true });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  Reflect.deleteProperty(Element.prototype, 'setPointerCapture');
  window.localStorage.clear();
});

const handle = () => screen.getByRole('separator', { name: 'Resize the parameter panel' });
const size = () => Number(handle().getAttribute('aria-valuenow'));

/** Opens the inspector of `box1` in a viewer of the given size. */
async function openPanel(width: number, height = 600) {
  setViewerSize(width, height);
  await renderViewer(documentOf([node({ name: 'box1' })]));
  return inspect('box1');
}

function drag(fromX: number, toX: number, button = 0) {
  fireEvent.pointerDown(handle(), { clientX: fromX, pointerId: 1, button, pointerType: 'mouse' });
  fireEvent.pointerMove(handle(), { clientX: toX, pointerId: 1, pointerType: 'mouse' });
  fireEvent.pointerUp(handle(), { clientX: toX, pointerId: 1, pointerType: 'mouse' });
}

describe('Parameter Inspector panel', () => {
  it.each([
    [671, 'horizontal', 288],
    [672, 'vertical', 320],
    [1200, 'vertical', 360],
  ])('NOP-INSP-050: a %ipx viewer gets a %s handle and a %ipx panel', async (width, orientation, expected) => {
    await openPanel(width);
    expect(handle().getAttribute('aria-orientation')).toBe(orientation);
    expect(size()).toBe(expected);
  });

  it('NOP-INSP-051: dragging resizes the side panel and the size is remembered', async () => {
    await openPanel(1000);
    drag(700, 600);
    expect(size()).toBe(420);
    expect((handle().parentElement as HTMLElement).style.width).toBe('420px');
    expect(window.localStorage.getItem(WIDTH_KEY)).toBe('420');

    cleanup();
    await openPanel(1000);
    expect(size()).toBe(420);
  });

  it('NOP-INSP-051: only the left mouse button resizes', async () => {
    await openPanel(1000);
    drag(700, 600, 2);
    expect(size()).toBe(320);
    expect(window.localStorage.getItem(WIDTH_KEY)).toBeNull();
  });

  it('NOP-INSP-052: resize limits keep room for the canvas', async () => {
    await openPanel(900);
    drag(800, -2000);
    expect(size()).toBe(700);
    drag(100, 2100);
    expect(size()).toBe(260);
  });

  it('NOP-INSP-053: arrow keys, Home and End resize, a double-click resets', async () => {
    await openPanel(1000);
    const steps: Array<[string, number]> = [
      ['ArrowLeft', 336],
      ['ArrowRight', 320],
      ['ArrowRight', 304],
      ['Home', 260],
      ['End', 800],
    ];
    for (const [key, expected] of steps) {
      fireEvent.keyDown(handle(), { key });
      expect(size()).toBe(expected);
    }
    expect(window.localStorage.getItem(WIDTH_KEY)).toBe('800');
    fireEvent.doubleClick(handle());
    expect(size()).toBe(320);
    expect(window.localStorage.getItem(WIDTH_KEY)).toBeNull();
  });

  it('NOP-INSP-054: blocked storage does not break the panel', async () => {
    const blocked = () => {
      throw new DOMException('The operation is insecure.', 'SecurityError');
    };
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(blocked);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(blocked);
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(blocked);
    await openPanel(1000);
    expect(size()).toBe(320);
    fireEvent.keyDown(handle(), { key: 'ArrowLeft' });
    drag(700, 650);
    fireEvent.doubleClick(handle());
    expect(size()).toBe(320);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('NOP-INSP-057: the bottom sheet keeps the closed node until its slide ends', async () => {
    await openPanel(600);
    vi.useFakeTimers();
    fireEvent.click(screen.getByRole('button', { name: 'Close parameters' }));
    act(() => vi.advanceTimersByTime(199));
    expect(screen.getByRole('complementary', { name: 'Parameters of box1' })).toBeTruthy();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByRole('complementary')).toBeNull();
  });

  it('NOP-INSP-057: with reduced motion the bottom sheet closes at once', async () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }));
    await openPanel(600);
    fireEvent.click(screen.getByRole('button', { name: 'Close parameters' }));
    expect(screen.queryByRole('complementary')).toBeNull();
  });

  it('NOP-INSP-058: the arrow keys resize the bottom sheet up and down', async () => {
    await openPanel(600, 800);
    expect(size()).toBe(384);
    fireEvent.keyDown(handle(), { key: 'ArrowUp' });
    expect(size()).toBe(400);
    fireEvent.keyDown(handle(), { key: 'ArrowDown' });
    fireEvent.keyDown(handle(), { key: 'ArrowDown' });
    expect(size()).toBe(368);
    expect(window.localStorage.getItem(HEIGHT_KEY)).toBe('368');
  });

  it.each([
    ['900', 700, 500],
    ['abc', 1000, 320],
    ['-5', 1000, 320],
  ])('NOP-INSP-059: a remembered width of %s in a %ipx viewer gives %ipx', async (stored, width, expected) => {
    window.localStorage.setItem(WIDTH_KEY, stored);
    await openPanel(width);
    expect(size()).toBe(expected);
  });
});
