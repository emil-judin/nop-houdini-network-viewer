/**
 * Shared test setup. In the jsdom environment it adds the browser APIs React Flow needs and jsdom
 * lacks (`ResizeObserver`, `DOMMatrixReadOnly`, element sizes), and cleans up rendered components.
 */
import { afterEach } from 'vitest';

if (typeof window !== 'undefined') {
  const { cleanup, configure } = await import('@testing-library/react');
  afterEach(() => cleanup());
  // findBy and waitFor wait up to 10 seconds instead of 1: with every worker busy (or coverage on),
  // the lazily loaded inspector and React Flow's first measure take longer without anything being wrong
  configure({ asyncUtilTimeout: 10_000 });

  class ResizeObserverStub {
    private readonly callback: ResizeObserverCallback;
    constructor(callback: ResizeObserverCallback) {
      this.callback = callback;
    }
    observe(target: Element) {
      // Report a desktop-sized viewer once, like a real layout pass
      this.callback([{ target, contentRect: { width: 1000, height: 600 } } as unknown as ResizeObserverEntry], this as unknown as ResizeObserver);
    }
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver;

  class DOMMatrixReadOnlyStub {
    m22: number;
    constructor(transform?: string) {
      const scale = transform?.match(/scale\(([0-9.]+)\)/)?.[1];
      this.m22 = scale !== undefined ? Number(scale) : 1;
    }
  }
  (window as unknown as { DOMMatrixReadOnly: unknown }).DOMMatrixReadOnly ??= DOMMatrixReadOnlyStub;

  // jsdom has no layout: give elements a size so React Flow renders its nodes
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetHeight: { get: () => 600, configurable: true },
    offsetWidth: { get: () => 1000, configurable: true },
  });
  const svgPrototype = window.SVGElement.prototype as unknown as { getBBox?: () => DOMRect };
  svgPrototype.getBBox ??= () => ({ x: 0, y: 0, width: 100, height: 30 }) as DOMRect;

  window.matchMedia ??= ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
