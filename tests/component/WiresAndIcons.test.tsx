// @vitest-environment jsdom
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { HoudiniNetworkDocument } from '../../src/schema/types';
import { graph, node, wire } from '../unit/networkFixtures';
import { documentOf, loadExample, nodeElement } from './inspectorHelpers';
import { giveNodesRealisticSizes, preferReducedMotion, renderNetwork, viewport } from './viewerHelpers';

let restoreSizes: () => void;

beforeEach(() => {
  restoreSizes = giveNodesRealisticSizes();
});

afterEach(() => {
  restoreSizes();
  vi.unstubAllGlobals();
});

const NORMAL = '#7082b8';
const HIGHLIGHTED = '#a8b36f';

/** The drawn wire paths with their color, keyed by their source and target. */
function wires() {
  return [...document.querySelectorAll<SVGPathElement>('.react-flow__edge path.react-flow__edge-path')].map((path) => {
    const edge = path.closest('.react-flow__edge') as SVGGElement;
    const [, , source, , target] = (edge.getAttribute('data-id') ?? '').split('-');
    return { id: `${source}>${target}`, path, edge };
  });
}

const colorOf = (path: SVGPathElement) => path.style.stroke;

/** `a` -> `__dot1` -> `__dot2` -> `b` -> `c`, with the two routing dots. */
function dottedChain(): HoudiniNetworkDocument {
  return {
    ...documentOf([]),
    root: graph({
      nodes: [node({ name: 'a', pos: [0, 0] }), node({ name: 'b', pos: [0, -6] }), node({ name: 'c', pos: [0, -9] })],
      dots: [
        { name: '__dot1', pos: [0.5, -2] },
        { name: '__dot2', pos: [0.5, -4] },
      ],
      wires: [wire('a', '__dot1'), wire('__dot1', '__dot2'), wire('__dot2', 'b'), wire('b', 'c')],
    }),
  };
}

describe('wires', () => {
  it('NOP-WIRE-010: wires keep a 1.3 pixel stroke on screen at every zoom', async () => {
    await renderNetwork(loadExample('start_here'), {}, 'box1');
    const check = () => {
      const drawn = wires();
      expect(drawn.length).toBeGreaterThan(0);
      for (const { path } of drawn) {
        expect(colorOf(path)).toBe(NORMAL);
        expect(path.style.strokeWidth).toBe('1.3');
        expect(path.style.vectorEffect).toBe('non-scaling-stroke');
      }
    };
    check();
    const zoom = viewport().zoom;
    const pane = document.querySelector('.react-flow__pane') as HTMLElement;
    for (let i = 0; i < 5; i++) fireEvent.wheel(pane, { deltaY: 400, clientX: 500, clientY: 300 });
    await waitFor(() => expect(viewport().zoom).not.toBe(zoom));
    check();
  });

  it('NOP-WIRE-011: the wires of the selected node are highlighted through dots, above the others', async () => {
    preferReducedMotion();
    await renderNetwork(dottedChain(), {}, 'a');
    fireEvent.click(nodeElement('a') as HTMLElement);
    await screen.findByRole('complementary', { name: 'Parameters of a' });
    await waitFor(() => expect(wires().filter(({ path }) => colorOf(path) === HIGHLIGHTED)).toHaveLength(3));
    for (const { id, path, edge } of wires()) {
      const highlighted = id !== 'b>c';
      expect(colorOf(path), id).toBe(highlighted ? HIGHLIGHTED : NORMAL);
      expect(Number((edge.closest('svg') as SVGSVGElement).style.zIndex), id).toBe(highlighted ? 6 : 4);
    }
  });

  it('NOP-WIRE-012: clearing the selection removes the highlight', async () => {
    await renderNetwork(dottedChain(), {}, 'a');
    fireEvent.click(nodeElement('a') as HTMLElement);
    await waitFor(() => expect(wires().some(({ path }) => colorOf(path) === HIGHLIGHTED)).toBe(true));
    fireEvent.click(document.querySelector('.react-flow__pane') as HTMLElement);
    await waitFor(() => expect(wires().every(({ path }) => colorOf(path) === NORMAL)).toBe(true));
  });

  it('NOP-WIRE-020: the wire style follows the export, then the prop', async () => {
    // jsdom places every connector at 0,0, so the wire paths cannot show the style here; the pressed wire
    // style button shows which style the viewer draws with (NOP-WIRE-022 checks the real paths in browsers)
    const pressedStyle = () => screen.getByRole('group', { name: 'Wire style' }).querySelector('[aria-pressed="true"]')?.getAttribute('aria-label');
    const rounded = loadExample('for_each');
    rounded.root.wireStyle = 'rounded';
    const view = await renderNetwork(rounded, {}, 'copytopoints1');
    expect(pressedStyle()).toMatch(/^Rounded wires/);
    view.unmount();

    await renderNetwork(rounded, { wireStyle: 'default' }, 'copytopoints1');
    expect(pressedStyle()).toMatch(/^Default wires/);
  });

  it('NOP-WIRE-021: older exports without wireStyle use the default style', async () => {
    const older = loadExample('for_each');
    delete older.root.wireStyle;
    await renderNetwork(older, {}, 'copytopoints1');
    const pressed = screen.getByRole('group', { name: 'Wire style' }).querySelector('[aria-pressed="true"]');
    expect(pressed?.getAttribute('aria-label')).toMatch(/^Default wires/);
  });

  it('NOP-WIRE-005: the wire into the target points input of Copy to Points is dotted', async () => {
    await renderNetwork(loadExample('for_each'), {}, 'copytopoints1');
    const dotted = wires().filter(({ path }) => path.style.strokeDasharray !== '');
    expect(dotted).toHaveLength(1);
    expect(dotted[0].path.style.strokeDasharray).toBe('1.5 2.5');
    expect(dotted[0].edge.getAttribute('data-id')).toMatch(/-copytopoints1-1$/);
  });
});

describe('icons', () => {
  it('NOP-ICON-007: gradient and clip ids stay unique with several nodes of one type', async () => {
    await renderNetwork(
      documentOf([
        node({ name: 'sphere1', type: 'sphere', icon: 'SOP_sphere' }),
        node({ name: 'sphere2', type: 'sphere', icon: 'SOP_sphere', pos: [3, 0] }),
        node({ name: 'sphere3', type: 'sphere', icon: 'SOP_sphere', pos: [6, 0] }),
      ]),
      {},
      'sphere1',
    );
    const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
    const repeated = ids.filter((id, index) => ids.indexOf(id) !== index);
    expect(repeated).toEqual([]);
    expect(document.querySelectorAll('.react-flow__node[data-id^="sphere"] svg [id]').length).toBeGreaterThan(0);
  });
});
