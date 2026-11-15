// @vitest-environment jsdom
import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HoudiniNetwork } from '../../src/components/HoudiniNetwork';
import { BOX_ID_PREFIX, DOT_ID_PREFIX, STICKY_ID_PREFIX } from '../../src/schema/convertGraph';
import type { HoudiniNetworkDocument } from '../../src/schema/types';
import { inspect, loadExample, nodeElement } from './inspectorHelpers';
import { doubleClickNode, giveNodesRealisticSizes, preferReducedMotion, pressKey, renderNetwork, waitForNode } from './viewerHelpers';

let restoreSizes: () => void;

beforeEach(() => {
  restoreSizes = giveNodesRealisticSizes();
  preferReducedMotion();
  Object.defineProperty(Element.prototype, 'setPointerCapture', { value: () => undefined, configurable: true });
  Object.defineProperty(Element.prototype, 'hasPointerCapture', { value: () => true, configurable: true });
  Object.defineProperty(Element.prototype, 'releasePointerCapture', { value: () => undefined, configurable: true });
});

afterEach(() => {
  restoreSizes();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  for (const name of ['setPointerCapture', 'hasPointerCapture', 'releasePointerCapture']) Reflect.deleteProperty(Element.prototype, name);
  Reflect.deleteProperty(navigator, 'clipboard');
  Reflect.deleteProperty(window, 'isSecureContext');
});

/** The `start_here` example: 8 operator nodes, a network box, two sticky notes and a dot. */
const renderStartHere = () => renderNetwork(loadExample('start_here'), {}, 'box1');

/** Position of item `name` on the canvas, from React Flow's transform on its element. */
const positionOf = (name: string) => (document.querySelector(`.react-flow__node[data-id="${name}"]`) as HTMLElement).style.transform;

const wireIds = () => [...document.querySelectorAll('.react-flow__edge')].map((edge) => edge.getAttribute('data-id'));

const selectedNodes = () => [...document.querySelectorAll('.react-flow__node.selected')].map((n) => n.getAttribute('data-id'));

/** Deeply freezes a document, so any write to it throws in strict mode. */
function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

describe('the viewer is view-only', () => {
  it('NOP-RO-001: node icon images cannot be dragged out of the page', async () => {
    await renderStartHere();
    const images = [...document.querySelectorAll('.react-flow__node img')];
    for (const image of images) expect(image.getAttribute('draggable')).toBe('false');
  });

  it('NOP-RO-003: clicking a flag area selects the node and leaves its flags as they are', async () => {
    const data = loadExample('start_here');
    const before = structuredClone(data);
    await renderNetwork(data, {}, 'box1');
    const flagFills = () =>
      [...(nodeElement('OUT') as HTMLElement).querySelectorAll('g[clip-path] path')].map((path) => path.getAttribute('fill'));
    const fills = flagFills();
    const displayFlag = [...(nodeElement('OUT') as HTMLElement).querySelectorAll('g[clip-path] path')].find(
      (path) => path.getAttribute('fill') !== 'none',
    ) as SVGPathElement;
    expect(displayFlag).toBeTruthy();
    fireEvent.click(displayFlag);
    await screen.findByRole('complementary', { name: 'Parameters of OUT' });
    expect(flagFills()).toEqual(fills);
    expect(data).toEqual(before);
  });

  it('NOP-RO-004: Delete and Backspace remove nothing', async () => {
    await renderStartHere();
    const wires = wireIds();
    expect(wires).toHaveLength(8);
    await inspect('box1');
    const box = nodeElement('box1') as HTMLElement;
    box.focus();
    for (const key of ['Delete', 'Backspace']) {
      fireEvent.keyDown(box, { key, code: key });
      fireEvent.keyUp(box, { key, code: key });
      pressKey(key);
    }
    // A later action that does show: once its inspector is open, the keys before it were handled
    await inspect('tube1');
    expect(nodeElement('box1')).not.toBeNull();
    expect(wireIds()).toEqual(wires);
  });

  it('NOP-RO-005: parameters have no form controls and clicks change nothing', async () => {
    await renderStartHere();
    const panel = await inspect('tube1');
    expect(panel.querySelector('input, textarea, select, [contenteditable="true"], [contenteditable=""]')).toBeNull();
    const before = panel.innerHTML;
    const toggle = within(panel).getAllByRole('img').find((img) => /: (on|off)$/.test(img.getAttribute('aria-label') ?? ''));
    const menu = panel.querySelector<HTMLElement>('div[title^="Token: "]');
    const slider = panel.querySelector<HTMLElement>('.rounded-full.w-3');
    for (const target of [toggle, menu, slider]) {
      expect(target).toBeTruthy();
      fireEvent.mouseDown(target as Element);
      fireEvent.click(target as Element);
      fireEvent.keyDown(target as Element, { key: 'ArrowRight' });
    }
    expect(panel.innerHTML).toBe(before);
  });

  it('NOP-RO-006: network boxes, sticky notes and dots cannot be selected', async () => {
    await renderStartHere();
    for (const id of [`${BOX_ID_PREFIX}__netbox1`, `${STICKY_ID_PREFIX}__stickynote1`, `${DOT_ID_PREFIX}__dot1`]) {
      const item = document.querySelector<HTMLElement>(`.react-flow__node[data-id="${id}"]`);
      expect(item, id).not.toBeNull();
      fireEvent.click(item as HTMLElement);
    }
    // A later click that does select: once its inspector is open, the clicks before it were handled
    await inspect('tube1');
    expect(selectedNodes()).toEqual(['tube1']);
    expect(screen.getAllByRole('complementary').map((panel) => panel.getAttribute('aria-label'))).toEqual(['Parameters of tube1']);
  });

  it('NOP-RO-007: a frozen document is never written to', async () => {
    const errors = vi.spyOn(console, 'error');
    const view = render(
      <div style={{ width: 1000, height: 600 }}>
        <HoudiniNetwork data={deepFreeze(loadExample('start_here'))} />
      </div>,
    );
    await waitForNode('box1');
    await inspect('tube1');
    pressKey('KeyS', { shiftKey: true });
    fireEvent.click(screen.getByRole('button', { name: 'Close parameters' }));

    view.rerender(
      <div style={{ width: 1000, height: 600 }}>
        <HoudiniNetwork data={deepFreeze(loadExample('assets') as HoudiniNetworkDocument)} />
      </div>,
    );
    await waitForNode('scene');
    doubleClickNode('scene');
    await waitForNode('pebble_scatter1');
    const panel = await inspect('pebble_scatter1');
    for (const tab of within(panel).queryAllByRole('tab')) fireEvent.click(tab);
    fireEvent.click(screen.getByRole('button', { name: 'Go back to the previous network' }));
    await waitForNode('ground');
    expect(errors).not.toHaveBeenCalled();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('NOP-RO-008: arrow keys do not move a node', async () => {
    await renderStartHere();
    await inspect('box1');
    const before = positionOf('box1');
    const box = nodeElement('box1') as HTMLElement;
    box.focus();
    for (const key of ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']) {
      fireEvent.keyDown(box, { key, code: key });
      fireEvent.keyUp(box, { key, code: key });
    }
    expect(positionOf('box1')).toBe(before);
  });

  it('NOP-RO-009: clicking a wire changes nothing', async () => {
    await renderStartHere();
    await inspect('box1');
    const wire = document.querySelector<HTMLElement>('.react-flow__edge') as HTMLElement;
    fireEvent.click(wire.querySelector('path') ?? wire);
    expect(document.querySelector('.react-flow__edge.selected')).toBeNull();
    expect(selectedNodes()).toEqual(['box1']);
    expect(screen.getByRole('complementary', { name: 'Parameters of box1' })).toBeTruthy();
  });

  it('NOP-RO-010: Ctrl or Cmd with a click selects only the clicked node', async () => {
    await renderStartHere();
    await inspect('box1');
    for (const modifier of [{ ctrlKey: true }, { metaKey: true }]) {
      fireEvent.keyDown(document, { key: modifier.ctrlKey ? 'Control' : 'Meta' });
      fireEvent.click(nodeElement('tube1') as HTMLElement, modifier);
      fireEvent.keyUp(document, { key: modifier.ctrlKey ? 'Control' : 'Meta' });
      await screen.findByRole('complementary', { name: 'Parameters of tube1' });
      expect(selectedNodes()).toEqual(['tube1']);
      await inspect('box1');
    }
  });

  it('NOP-RO-011: holding Shift and dragging the canvas draws no selection box', async () => {
    await renderStartHere();
    const pane = document.querySelector('.react-flow__pane') as HTMLElement;
    fireEvent.keyDown(document, { key: 'Shift', code: 'ShiftLeft' });
    fireEvent.pointerDown(pane, { clientX: 10, clientY: 10, button: 0, pointerId: 1, isPrimary: true });
    fireEvent.pointerMove(pane, { clientX: 400, clientY: 300, button: 0, buttons: 1, pointerId: 1, isPrimary: true });
    expect(document.querySelector('.react-flow__selection')).toBeNull();
    expect(pane.classList.contains('selection')).toBe(false);
    fireEvent.pointerUp(pane, { clientX: 400, clientY: 300, button: 0, pointerId: 1 });
    fireEvent.keyUp(document, { key: 'Shift', code: 'ShiftLeft' });
    expect(selectedNodes()).toEqual([]);
  });

  it('NOP-RO-012: values and code can still be selected and copied', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn(async () => undefined) }, configurable: true });
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
    await renderNetwork(loadExample('vex_wrangles'), {}, 'grid1');
    const panel = await inspect('wrangle_rings');
    const rings = within(panel).getByRole('group', { name: 'Rings' });
    expect((rings.querySelector('div[title]') as HTMLElement).className).toContain('select-text');
    const code = within(panel).getByRole('region', { name: 'VEX code' });
    expect((code.querySelector('pre:not([aria-hidden])') as HTMLElement).className).toContain('select-text');
    expect(within(panel).getByRole('button', { name: 'Copy code' })).toBeTruthy();
  });
});
