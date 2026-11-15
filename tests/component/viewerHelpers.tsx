import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { HoudiniNetwork } from '../../src/components/HoudiniNetwork';
import type { HoudiniNetworkDocument } from '../../src/schema/types';
import { nodeElement } from './inspectorHelpers';

type ViewerProps = Partial<React.ComponentProps<typeof HoudiniNetwork>>;

/**
 * jsdom has no layout. Gives operator nodes Houdini's 100 x 30 pixel box and every other element
 * 1000 x 600 (the canvas), so fits and frames compute real zoom levels. Returns the undo function.
 */
export function giveNodesRealisticSizes(): () => void {
  const prototype = window.HTMLElement.prototype;
  const width = Object.getOwnPropertyDescriptor(prototype, 'offsetWidth');
  const height = Object.getOwnPropertyDescriptor(prototype, 'offsetHeight');
  const isNode = (element: HTMLElement) => element.classList.contains('react-flow__node');
  Object.defineProperties(prototype, {
    offsetWidth: { configurable: true, get(this: HTMLElement) { return isNode(this) ? 100 : 1000; } },
    offsetHeight: { configurable: true, get(this: HTMLElement) { return isNode(this) ? 30 : 600; } },
  });
  return () => {
    if (width) Object.defineProperty(prototype, 'offsetWidth', width);
    if (height) Object.defineProperty(prototype, 'offsetHeight', height);
  };
}

/** Makes the viewer move the view without animation, so each fit or frame is on screen at once. */
export function preferReducedMotion(): void {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  }));
}

/**
 * Lets a test move the clock that tells double-clicks from two clicks, on top of the real time
 * (animations keep running). `advance(ms)` adds to it.
 */
export function controllableClock(): { advance: (ms: number) => void } {
  const realNow = performance.now.bind(performance);
  let offset = 0;
  vi.spyOn(performance, 'now').mockImplementation(() => realNow() + offset);
  return {
    advance: (ms: number) => {
      offset += ms;
    },
  };
}

/** The view on screen, read from React Flow's viewport transform. */
export function viewport(): { x: number; y: number; zoom: number } {
  const transform = (document.querySelector('.react-flow__viewport') as HTMLElement).style.transform;
  const match = /translate\(([-\d.e]+)px,\s*([-\d.e]+)px\)\s*scale\(([-\d.e]+)\)/.exec(transform);
  if (!match) throw new Error(`Unexpected viewport transform: ${transform}`);
  return { x: Number(match[1]), y: Number(match[2]), zoom: Number(match[3]) };
}

/** The viewer's own element, which takes focus for the hotkeys. */
export const viewerRoot = () => document.querySelector<HTMLElement>('.nop-root .\\@container') as HTMLElement;

/** Renders the viewer with `props` and waits for `firstNode`; `rerenderWith` swaps the document. */
export async function renderNetwork(data: HoudiniNetworkDocument, props: ViewerProps = {}, firstNode = data.root.nodes[0]?.name) {
  const element = (doc: HoudiniNetworkDocument) => (
    <div style={{ width: 1000, height: 600 }}>
      <HoudiniNetwork data={doc} {...props} />
    </div>
  );
  const view = render(element(data));
  if (firstNode) await waitFor(() => expect(nodeElement(firstNode)).not.toBeNull());
  return {
    ...view,
    rerenderWith: (doc: HoudiniNetworkDocument) => view.rerender(element(doc)),
  };
}

/** Presses a hotkey inside the viewer. Returns `false` when the viewer prevented the default action. */
export function pressKey(code: string, init: KeyboardEventInit = {}, target: HTMLElement = viewerRoot()): boolean {
  if (target === viewerRoot()) target.focus();
  const key = code.startsWith('Key') ? code.slice(3).toLowerCase() : code;
  return fireEvent.keyDown(target, { key, code, ...init });
}

/** Two clicks on node `name` within the double-click time. */
export function doubleClickNode(name: string): void {
  fireEvent.click(nodeElement(name) as HTMLElement);
  fireEvent.click(nodeElement(name) as HTMLElement);
}

/** Waits until node `name` of the network on screen is drawn. */
export async function waitForNode(name: string): Promise<void> {
  await waitFor(() => expect(nodeElement(name)).not.toBeNull());
}

/** The network path bar. */
export const pathBar = () => screen.getByRole('navigation', { name: 'Network path' });

/** Names of the path bar segments, in order. */
export const pathSegments = () => within(pathBar()).getAllByRole('listitem').map((item) => item.textContent);

export const backButton = () => screen.getByRole('button', { name: 'Go back to the previous network' }) as HTMLButtonElement;
export const forwardButton = () => screen.getByRole('button', { name: 'Go forward to the next network' }) as HTMLButtonElement;
