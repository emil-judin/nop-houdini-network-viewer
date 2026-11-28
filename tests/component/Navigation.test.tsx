// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HoudiniNetwork } from '../../src/components/HoudiniNetwork';
import { documentOf, inspect, loadExample, nodeElement, setViewerSize } from './inspectorHelpers';
import {
  backButton,
  controllableClock,
  doubleClickNode,
  forwardButton,
  giveNodesRealisticSizes,
  pathBar,
  pathSegments,
  preferReducedMotion,
  pressKey,
  renderNetwork,
  viewerRoot,
  viewport,
  waitForNode,
} from './viewerHelpers';

let restoreSizes: () => void;

beforeEach(() => {
  restoreSizes = giveNodesRealisticSizes();
  preferReducedMotion();
});

afterEach(() => {
  restoreSizes();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

/** The `assets` example: `scene` (7 nodes) holds `pebble_scatter1` (4) and `props` (6), which holds `details` (3). */
const renderAssets = (props = {}) => renderNetwork(loadExample('assets'), props, 'scene');

/** Waits until the view stops changing (the viewer moves the view a moment after a level appears). */
async function settledViewport() {
  let last = viewport();
  await waitFor(() => {
    const now = viewport();
    const same = now.x === last.x && now.y === last.y && now.zoom === last.zoom;
    last = now;
    expect(same).toBe(true);
  });
  await new Promise((resolve) => setTimeout(resolve, 60));
  return viewport();
}

/** Opens the subnetwork `name` of the network on screen with a double-click. */
async function diveInto(name: string, firstChild: string) {
  doubleClickNode(name);
  await waitForNode(firstChild);
}

describe('view', () => {
  it('NOP-NAV-002: fitView false keeps the start view', async () => {
    await renderAssets({ fitView: false });
    expect(await settledViewport()).toEqual({ x: 0, y: 0, zoom: 1 });
  });

  it('NOP-NAV-034: fitView false does not fit subnetworks either', async () => {
    await renderAssets({ fitView: false });
    await diveInto('scene', 'pebble_scatter1');
    expect(await settledViewport()).toEqual({ x: 0, y: 0, zoom: 1 });
  });

  it('NOP-NAV-003: the wheel zooms between 0.08 and 3.5, and a double-click never zooms', async () => {
    await renderAssets();
    const pane = document.querySelector('.react-flow__pane') as HTMLElement;
    for (let i = 0; i < 30; i++) fireEvent.wheel(pane, { deltaY: -400, clientX: 500, clientY: 300 });
    await waitFor(() => expect(viewport().zoom).toBe(3.5));
    for (let i = 0; i < 40; i++) fireEvent.wheel(pane, { deltaY: 400, clientX: 500, clientY: 300 });
    await waitFor(() => expect(viewport().zoom).toBeCloseTo(0.08, 5));
    fireEvent.doubleClick(nodeElement('OUT') as HTMLElement);
    fireEvent.doubleClick(pane);
    expect(viewport().zoom).toBeCloseTo(0.08, 5);
  });

  it('NOP-NAV-005: H fits, F frames the selected node or fits when nothing is selected', async () => {
    await renderAssets();
    // jsdom measures the nodes after React Flow's start fit, so the reference fit comes from H
    // (the browser tests check that the start view is the same fit)
    expect(pressKey('KeyH')).toBe(false);
    const fitted = await settledViewport();
    await inspect('OUT');
    expect(pressKey('KeyF')).toBe(false);
    await waitFor(() => expect(viewport().zoom).toBe(1.6));
    expect(pressKey('KeyH')).toBe(false);
    await waitFor(() => expect(viewport()).toEqual(fitted));

    fireEvent.click(screen.getByRole('button', { name: 'Close parameters' }));
    pressKey('KeyF');
    expect(await settledViewport()).toEqual(fitted);
  });

  it('NOP-NAV-005: viewers narrower than 448 pixels frame a node at zoom 1 at most', async () => {
    setViewerSize(400, 600);
    await renderAssets();
    fireEvent.click(nodeElement('OUT') as HTMLElement);
    await waitFor(() => expect(nodeElement('OUT')?.classList.contains('selected')).toBe(true));
    pressKey('KeyF');
    await waitFor(() => expect(viewport().zoom).toBe(1));
  });

  it('NOP-NAV-007: I and U with nothing to do are left to the page', async () => {
    await renderAssets();
    expect(pressKey('KeyI')).toBe(true);
    expect(pressKey('KeyU')).toBe(true);
    expect(pressKey('KeyH')).toBe(false);
  });

  it('NOP-NAV-035: a held key does not repeat, and Shift only works with S', async () => {
    await renderAssets();
    const fitted = await settledViewport();
    await inspect('OUT');
    expect(pressKey('KeyF', { repeat: true })).toBe(true);
    expect(pressKey('KeyF', { shiftKey: true })).toBe(true);
    expect(await settledViewport()).toEqual(fitted);
  });

  it('NOP-NAV-008: with hotkeys "hover", typing in a field of the host page never reaches the viewer', async () => {
    const data = loadExample('assets');
    render(
      <div>
        <input aria-label="Comment" />
        <div style={{ width: 1000, height: 600 }}>
          <HoudiniNetwork data={data} hotkeys="hover" />
        </div>
      </div>,
    );
    await waitForNode('scene');
    const fitted = await settledViewport();
    await inspect('OUT');
    const field = screen.getByRole('textbox', { name: 'Comment' });
    fireEvent.pointerEnter(viewerRoot());
    field.focus();
    expect(pressKey('KeyF', {}, field)).toBe(true);
    expect(await settledViewport()).toEqual(fitted);
    // The same key from the page body, with the pointer over the viewer, does frame the node
    expect(pressKey('KeyF', {}, document.body)).toBe(false);
  });

  it('NOP-NAV-009: hotkeys with Ctrl, Cmd or Alt are left to the browser', async () => {
    await renderAssets();
    const fitted = await settledViewport();
    await inspect('OUT');
    // Ctrl+F and Cmd+F open the node search instead (NOP-FIND-002)
    expect(pressKey('KeyF', { altKey: true })).toBe(true);
    for (const modifier of [{ ctrlKey: true }, { metaKey: true }, { altKey: true }]) {
      expect(pressKey('KeyH', modifier)).toBe(true);
      expect(pressKey('KeyO', modifier)).toBe(true);
    }
    expect(await settledViewport()).toEqual(fitted);
    expect(document.querySelector('.react-flow__minimap')).toBeNull();
  });

  it('NOP-NAV-040: the network stays hidden until its start view is fitted', async () => {
    const { container } = render(
      <div style={{ width: 1000, height: 600 }}>
        <HoudiniNetwork data={loadExample('assets')} />
      </div>,
    );
    const canvas = () => container.querySelector('.react-flow') as HTMLElement;
    expect(canvas().classList.contains('nop-first-fit-pending')).toBe(true);
    await waitFor(() => expect(canvas().classList.contains('nop-first-fit-pending')).toBe(false));
  });

  it('NOP-NAV-040: an empty network is shown after at most 400 milliseconds', async () => {
    const { container } = render(
      <div style={{ width: 1000, height: 600 }}>
        <HoudiniNetwork data={documentOf([])} />
      </div>,
    );
    const started = Date.now();
    await waitFor(() => expect(container.querySelector('.react-flow')?.classList.contains('nop-first-fit-pending')).toBe(false), {
      timeout: 1000,
    });
    expect(Date.now() - started).toBeLessThan(600);
  });
});

describe('subnetworks', () => {
  it('NOP-NAV-020: a double-click dives in, fits the child network and marks it in the path bar', async () => {
    await renderAssets();
    await diveInto('scene', 'pebble_scatter1');
    const shown = await settledViewport();
    expect(within(pathBar()).getByText('scene').closest('[aria-current]')?.getAttribute('aria-current')).toBe('location');
    pressKey('KeyH');
    expect(await settledViewport()).toEqual(shown);
  });

  it('NOP-NAV-022: two slow clicks only select', async () => {
    const clock = controllableClock();
    await renderAssets();
    fireEvent.click(nodeElement('scene') as HTMLElement);
    clock.advance(600);
    fireEvent.click(nodeElement('scene') as HTMLElement);
    await screen.findByRole('complementary', { name: 'Parameters of scene' });
    expect(nodeElement('ground')).not.toBeNull();
    expect(nodeElement('pebble_scatter1')).toBeNull();
  });

  it('NOP-NAV-023: nodes without exported children cannot be entered', async () => {
    await renderAssets();
    doubleClickNode('OUT');
    await screen.findByRole('complementary', { name: 'Parameters of OUT' });
    expect(pathSegments()).toEqual(['assets']);
  });

  it('NOP-NAV-024: I dives in, U goes up and selects the subnetwork the visitor came from', async () => {
    await renderAssets();
    await inspect('scene');
    expect(pressKey('KeyI')).toBe(false);
    await waitForNode('pebble_scatter1');
    expect(pressKey('KeyU')).toBe(false);
    await waitForNode('ground');
    await screen.findByRole('complementary', { name: 'Parameters of scene' });
  });

  it('NOP-NAV-036: keyboard focus stays in the viewer while moving between levels', async () => {
    await renderAssets();
    await inspect('scene');
    pressKey('KeyI');
    await waitForNode('pebble_scatter1');
    await waitFor(() => expect(document.activeElement).toBe(viewerRoot()));
    pressKey('KeyU');
    await waitFor(() => expect(document.activeElement).toBe(nodeElement('scene')));
  });

  it('NOP-NAV-039: diving in clears the selection and closes the inspector', async () => {
    await renderAssets();
    await inspect('scene');
    pressKey('KeyI');
    await waitForNode('pebble_scatter1');
    await waitFor(() => expect(screen.queryByRole('complementary')).toBeNull());
    expect(document.querySelector('.react-flow__node.selected')).toBeNull();
  });

  it('NOP-NAV-026: each level remembers its view', async () => {
    await renderAssets();
    await inspect('OUT');
    pressKey('KeyF');
    await waitFor(() => expect(viewport().zoom).toBe(1.6));
    const framed = await settledViewport();
    await diveInto('scene', 'pebble_scatter1');
    pressKey('KeyU');
    await waitForNode('ground');
    await waitFor(() => expect(viewport()).toEqual(framed));
  });

  it('NOP-NAV-027: back and forward history', async () => {
    await renderAssets();
    await diveInto('scene', 'pebble_scatter1');
    await diveInto('props', 'details');
    expect(forwardButton().disabled).toBe(true);
    fireEvent.click(backButton());
    await waitForNode('pebble_scatter1');
    expect(forwardButton().disabled).toBe(false);
    fireEvent.click(forwardButton());
    await waitForNode('details');
    expect(forwardButton().disabled).toBe(true);
    expect(backButton().disabled).toBe(false);
  });

  it('NOP-NAV-037: diving in after going back drops the forward history', async () => {
    await renderAssets();
    await diveInto('scene', 'pebble_scatter1');
    await diveInto('props', 'details');
    fireEvent.click(backButton());
    await waitForNode('pebble_scatter1');
    await diveInto('pebble_scatter1', nodeAfterDive('pebble_scatter1'));
    expect(forwardButton().disabled).toBe(true);
    // Back leads to "scene", where the visitor dived from, not to the dropped "props"
    fireEvent.click(backButton());
    await waitForNode('pebble_scatter1');
    expect(nodeElement('details')).toBeNull();
    expect(within(pathBar()).getByText('scene').closest('[aria-current]')).not.toBeNull();
  });

  it('NOP-NAV-028: visited deeper levels stay in the path bar, dimmed and clickable', async () => {
    await renderAssets();
    await diveInto('scene', 'pebble_scatter1');
    await diveInto('props', 'details');
    fireEvent.click(within(pathBar()).getByRole('button', { name: 'assets' }));
    await waitForNode('ground');
    expect(pathSegments()).toEqual(['assets', 'scene', 'props']);
    for (const [name, path] of [
      ['scene', '/obj/assets/scene'],
      ['props', '/obj/assets/scene/props'],
    ]) {
      const segment = within(pathBar()).getByRole('button', { name });
      expect(segment.getAttribute('title')).toBe(`Go to ${path}`);
      expect(segment.className).toContain('text-[#a8a8a8]');
    }
    fireEvent.click(within(pathBar()).getByRole('button', { name: 'props' }));
    await waitForNode('details');
  });

  it('NOP-NAV-038: the current path segment is not a button', async () => {
    await renderAssets();
    await diveInto('scene', 'pebble_scatter1');
    expect(within(pathBar()).queryByRole('button', { name: 'scene' })).toBeNull();
    expect(within(pathBar()).getByText('scene').closest('[aria-current="location"]')).not.toBeNull();
    expect(within(pathBar()).getByRole('button', { name: 'assets' })).toBeTruthy();
  });

  it('NOP-NAV-029: diving somewhere else replaces the trail', async () => {
    await renderAssets();
    await diveInto('scene', 'pebble_scatter1');
    await diveInto('props', 'details');
    fireEvent.click(within(pathBar()).getByRole('button', { name: 'scene' }));
    await waitForNode('pebble_scatter1');
    expect(pathSegments()).toEqual(['assets', 'scene', 'props']);
    await diveInto('pebble_scatter1', nodeAfterDive('pebble_scatter1'));
    expect(pathSegments()).toEqual(['assets', 'scene', 'pebble_scatter1']);
  });

  it('NOP-NAV-030: the path bar starts at the exported network', async () => {
    await renderAssets();
    expect(pathSegments()).toEqual(['assets']);
    expect(within(pathBar()).queryByText('obj')).toBeNull();
  });

  it('NOP-NAV-032: loading another file starts at its root', async () => {
    const view = await renderAssets();
    await diveInto('scene', 'pebble_scatter1');
    view.rerenderWith(loadExample('start_here'));
    await waitForNode('lift_tube');
    expect(backButton().disabled).toBe(true);
    expect(forwardButton().disabled).toBe(true);

    view.rerenderWith(loadExample('assets'));
    await waitForNode('ground');
    expect(pathSegments()).toEqual(['assets']);
    expect(backButton().disabled).toBe(true);
  });

  it('NOP-NAV-033: the node count follows the network on screen', async () => {
    await renderAssets();
    expect(screen.getByText('4 nodes')).toBeTruthy();
    await diveInto('scene', 'pebble_scatter1');
    expect(screen.getByText('7 nodes')).toBeTruthy();
  });
});

/** First child of a subnetwork of the `assets` example, to wait for after diving in. */
function nodeAfterDive(name: string): string {
  const scene = loadExample('assets').root.nodes.find((n) => n.name === 'scene');
  const subnet = scene?.children?.nodes.find((n) => n.name === name);
  return subnet?.children?.nodes[0]?.name ?? '';
}
