// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HoudiniNetwork } from '../../src/components/HoudiniNetwork';
import type { HoudiniNetworkDocument } from '../../src/schema/types';
import { graph, node } from '../unit/networkFixtures';
import { documentOf, inspect, loadExample, nodeElement, setViewerSize } from './inspectorHelpers';
import { doubleClickNode, giveNodesRealisticSizes, renderNetwork, waitForNode } from './viewerHelpers';

const htmlToImage = vi.hoisted(() => ({ toBlob: vi.fn() }));
vi.mock('html-to-image', () => htmlToImage);

let restoreSizes: () => void;

beforeEach(() => {
  restoreSizes = giveNodesRealisticSizes();
});

afterEach(() => {
  restoreSizes();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  htmlToImage.toBlob.mockReset();
});

/** A custom node shape whose outline throws when the node is drawn (normalize keeps shape objects as they are). */
const throwingShapes = () => ({
  boom: {
    get outline(): never {
      throw new Error('cannot draw this node');
    },
  },
});

describe('toolbar', () => {
  it('NOP-HUD-002: showToolbar false hides the path bar and every toolbar button', async () => {
    await renderNetwork(loadExample('start_here'), { showToolbar: false }, 'box1');
    expect(screen.queryByRole('navigation', { name: 'Network path' })).toBeNull();
    expect(screen.queryByRole('toolbar', { name: 'View' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Enter fullscreen' })).toBeNull();
  });

  it('NOP-HUD-003: the label size comes from the page, and visitors get no control for it', async () => {
    await renderNetwork(loadExample('start_here'), { labelSize: 'large' }, 'box1');
    const names = [...document.querySelectorAll('.react-flow__node[data-id] span')].filter((span) =>
      ['box1', 'tube1', 'OUT'].includes(span.textContent ?? ''),
    );
    expect(names).toHaveLength(3);
    for (const name of names) expect(name.className).toContain('text-[20px]');
    const controls = screen.getAllByRole('button').map((button) => `${button.getAttribute('aria-label')} ${button.title}`);
    expect(controls.filter((text) => /label|font|text size/i.test(text))).toEqual([]);
  });

  it('NOP-HUD-004: Home and End jump in the settings menu, Tab closes it', async () => {
    await renderNetwork(loadExample('start_here'), {}, 'box1');
    fireEvent.click(screen.getByRole('button', { name: 'View settings' }));
    const menu = screen.getByRole('menu', { name: 'View settings' });
    const items = [...menu.querySelectorAll<HTMLElement>('[role^="menuitem"]')];
    expect(items).toHaveLength(4);
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'End' });
    expect(document.activeElement).toBe(items.at(-1));
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Home' });
    expect(document.activeElement).toBe(items[0]);
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Tab' });
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('NOP-HUD-035: a failed screenshot says so for 3 seconds, and the button waits while one is drawn', async () => {
    let fail: (error: Error) => void = () => undefined;
    htmlToImage.toBlob.mockImplementation(() => new Promise((_resolve, reject) => (fail = reject)));
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    await renderNetwork(loadExample('start_here'), {}, 'box1');
    const toolbar = screen.getByRole('toolbar', { name: 'View' });
    fireEvent.click(within(toolbar).getByRole('button', { name: 'Save screenshot' }));
    await waitFor(() => expect((within(toolbar).getByRole('button', { name: 'Save screenshot' }) as HTMLButtonElement).disabled).toBe(true));

    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    await act(async () => fail(new Error('tainted canvas')));
    expect(within(toolbar).getByRole('button', { name: 'Screenshot failed, try again' })).toBeTruthy();
    expect(warn).toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(3000));
    expect(within(toolbar).getByRole('button', { name: 'Save screenshot' })).toBeTruthy();
  });

  it('NOP-HUD-031: Download JSON saves the document under the name of the level on screen', async () => {
    const saved: string[] = [];
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      saved.push(this.download);
    });
    vi.stubGlobal('URL', Object.assign(URL, { createObjectURL: () => 'blob:test', revokeObjectURL: () => undefined }));
    await renderNetwork(loadExample('assets'), { showDebugActions: true }, 'scene');
    fireEvent.click(screen.getByRole('button', { name: 'Download network JSON file' }));
    doubleClickNode('scene');
    await waitForNode('pebble_scatter1');
    fireEvent.click(screen.getByRole('button', { name: 'Download network JSON file' }));
    expect(saved).toEqual(['assets.json', 'scene.json']);
  });
});

describe('overview', () => {
  it('NOP-HUD-010: the overview colors nodes like Houdini', async () => {
    const data: HoudiniNetworkDocument = {
      ...documentOf([]),
      root: graph({
        nodes: [
          node({ name: 'shown', flags: { bypass: false, display: true, render: false, template: false, lock: false } }),
          node({ name: 'skipped', pos: [3, 0], flags: { bypass: true, display: false, render: false, template: false, lock: false } }),
          node({ name: 'red', pos: [6, 0], color: [1, 0, 0] }),
        ],
        boxes: [{ name: '__netbox1', comment: '', pos: [0, -3], size: [2, 1], color: [0.2, 0.4, 0.6], items: [] }],
      }),
    };
    await renderNetwork(data, { showMiniMap: true }, 'shown');
    await waitFor(() => expect(document.querySelectorAll('.react-flow__minimap-node').length).toBeGreaterThanOrEqual(4));
    const fills = [...document.querySelectorAll<SVGElement>('.react-flow__minimap-node')].map(
      (rect) => rect.getAttribute('fill') ?? rect.style.fill,
    );
    // Display flag blue, bypass yellow, the node's own red, the box's own color
    expect(fills).toEqual(expect.arrayContaining(['#3098e5', '#e5c130', 'rgb(255, 0, 0)', 'rgb(51, 102, 153)']));
  });

  it('NOP-HUD-043: the layout follows the viewer width, not the page width', async () => {
    setViewerSize(400, 600);
    await renderNetwork(loadExample('start_here'), { showMiniMap: true }, 'box1');
    await inspect('box1');
    expect(screen.getByRole('separator', { name: 'Resize the parameter panel' }).getAttribute('aria-orientation')).toBe('horizontal');
    expect(document.querySelector('.react-flow__minimap')).toBeNull();
  });
});

describe('fullscreen fallback', () => {
  afterEach(() => {
    Reflect.deleteProperty(document, 'fullscreenEnabled');
    Reflect.deleteProperty(HTMLElement.prototype, 'requestFullscreen');
  });

  it('NOP-HUD-021: the CSS fallback stops the page behind from scrolling until it is left', async () => {
    Object.defineProperty(document, 'fullscreenEnabled', { value: false, configurable: true });
    document.body.style.overflow = 'auto';
    await renderNetwork(loadExample('start_here'), {}, 'box1');
    fireEvent.click(screen.getByRole('button', { name: 'Enter fullscreen' }));
    await waitFor(() => expect(document.body.style.overflow).toBe('hidden'));
    fireEvent.click(screen.getByRole('button', { name: 'Exit fullscreen' }));
    await waitFor(() => expect(document.body.style.overflow).toBe('auto'));
  });

  it('NOP-HUD-022: a refused native fullscreen (an iframe without allowfullscreen) falls back to CSS', async () => {
    Object.defineProperty(document, 'fullscreenEnabled', { value: true, configurable: true });
    const request = vi.fn(async () => Promise.reject(new TypeError('Permissions check failed')));
    Object.defineProperty(HTMLElement.prototype, 'requestFullscreen', { value: request, configurable: true });
    await renderNetwork(loadExample('start_here'), {}, 'box1');
    fireEvent.click(screen.getByRole('button', { name: 'Enter fullscreen' }));
    await waitFor(() => expect((document.querySelector('.nop-root') as HTMLElement).className).toContain('fixed inset-0'));
    expect(request).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Exit fullscreen' })).toBeTruthy();
  });
});

describe('error states', () => {
  it('NOP-HUD-040: a broken file shows an error panel inside the viewer, and the page keeps working', () => {
    render(
      <div>
        <button type="button">Host button</button>
        <HoudiniNetwork data={{ foo: 1 }} />
      </div>,
    );
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toContain('This Houdini network could not be displayed.');
    expect(alert.textContent).toContain('not a valid export from the NOP shelf tool');
    expect(alert.textContent).toContain('Unrecognized Houdini network JSON format.');
    expect(screen.getByRole('button', { name: 'Host button' })).toBeTruthy();
  });

  it('NOP-HUD-041: a render error is caught, and a valid document shows the network again', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const broken = { ...documentOf([node({ name: 'n1', shape: 'boom' })]), customShapes: throwingShapes() };
    const view = render(
      <div style={{ width: 1000, height: 600 }}>
        <HoudiniNetwork data={broken} />
      </div>,
    );
    expect((await screen.findByRole('alert')).textContent).toContain('cannot draw this node');
    view.rerender(
      <div style={{ width: 1000, height: 600 }}>
        <HoudiniNetwork data={loadExample('start_here')} />
      </div>,
    );
    await waitForNode('box1');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('NOP-HUD-042: an error inside a subnetwork offers a way back to the top network', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const data = {
      ...documentOf([
        node({
          name: 'subnet1',
          type: 'subnet',
          isSubnetwork: true,
          children: graph({ path: '/obj/geo1/subnet1', nodes: [node({ name: 'inner', shape: 'boom' })] }),
        }),
      ]),
      customShapes: throwingShapes(),
    };
    await renderNetwork(data, {}, 'subnet1');
    doubleClickNode('subnet1');
    fireEvent.click(await screen.findByRole('button', { name: 'Back to the top network' }));
    await waitFor(() => expect(nodeElement('subnet1')).not.toBeNull());
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
