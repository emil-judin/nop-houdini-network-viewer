// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HoudiniNetwork } from '../../src/components/HoudiniNetwork';
import { loadExample, nodeElement } from './inspectorHelpers';
import {
  backButton,
  giveNodesRealisticSizes,
  pathBar,
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
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

/** The `assets` example: `scene` holds `pebble_scatter1` and `props`, which holds `details`. */
const renderAssets = (props = {}) => renderNetwork(loadExample('assets'), props, 'scene');

const searchField = () => screen.getByRole('textbox', { name: 'Find node by name or type' }) as HTMLInputElement;
const searchStatus = () => within(screen.getByRole('search', { name: 'Find node' })).getByRole('status');
const currentLevel = () => pathBar().querySelector('[aria-current="location"]')?.textContent;

/** Opens the search with `/`, types `text` and presses Enter. */
async function searchFor(text: string) {
  pressKey('Slash', { key: '/' });
  await waitFor(() => expect(document.activeElement).toBe(searchField()));
  fireEvent.change(searchField(), { target: { value: text } });
  fireEvent.keyDown(searchField(), { key: 'Enter', code: 'Enter' });
}

describe('node search', () => {
  it('NOP-FIND-001: slash opens the search field with focus and is not passed on', async () => {
    await renderAssets();
    expect(screen.queryByRole('search')).toBeNull();
    expect(pressKey('Slash', { key: '/' })).toBe(false);
    await waitFor(() => expect(document.activeElement).toBe(searchField()));
    expect(searchField().value).toBe('');
  });

  it('NOP-FIND-002: Ctrl+F and Cmd+F open the search only while the viewer has focus', async () => {
    await renderAssets();
    expect(pressKey('KeyF', { ctrlKey: true }, document.body)).toBe(true);
    expect(screen.queryByRole('search')).toBeNull();
    expect(pressKey('KeyF', { ctrlKey: true })).toBe(false);
    await waitFor(() => expect(document.activeElement).toBe(searchField()));
    fireEvent.keyDown(searchField(), { key: 'Escape', code: 'Escape' });
    expect(pressKey('KeyF', { metaKey: true })).toBe(false);
    await screen.findByRole('search');
  });

  it('NOP-FIND-002: with hotkeys "hover", Ctrl+F over the viewer stays with the browser', async () => {
    await renderAssets({ hotkeys: 'hover' });
    fireEvent.pointerEnter(viewerRoot());
    expect(pressKey('KeyF', { ctrlKey: true }, document.body)).toBe(true);
    expect(screen.queryByRole('search')).toBeNull();
    // A single key still works over the viewer in this mode
    expect(pressKey('Slash', { key: '/' }, document.body)).toBe(false);
    await screen.findByRole('search');
  });

  it('NOP-FIND-003: the Find node button opens and closes the search', async () => {
    await renderAssets();
    const button = screen.getByRole('button', { name: 'Find node' });
    fireEvent.click(button);
    await waitFor(() => expect(document.activeElement).toBe(searchField()));
    expect(button.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(button);
    expect(screen.queryByRole('search')).toBeNull();
  });

  it('NOP-FIND-004: Escape closes the search, keeps the inspector and returns focus to the found node', async () => {
    await renderAssets();
    await searchFor('wall');
    await screen.findByRole('complementary', { name: 'Parameters of wall_curve' });
    fireEvent.keyDown(searchField(), { key: 'Escape', code: 'Escape' });
    expect(screen.queryByRole('search')).toBeNull();
    await waitFor(() => expect(document.activeElement).toBe(nodeElement('wall_curve')));
    expect(screen.getByRole('complementary', { name: 'Parameters of wall_curve' })).toBeTruthy();
    // Opening again shows the last search, selected for typing over
    pressKey('Slash', { key: '/' });
    await waitFor(() => expect(document.activeElement).toBe(searchField()));
    expect(searchField().value).toBe('wall');
    expect([searchField().selectionStart, searchField().selectionEnd]).toEqual([0, 4]);
  });

  it('NOP-FIND-005: with hotkeys "off" only the button opens the search', async () => {
    await renderAssets({ hotkeys: 'off' });
    expect(pressKey('Slash', { key: '/' })).toBe(true);
    expect(pressKey('KeyF', { ctrlKey: true })).toBe(true);
    expect(screen.queryByRole('search')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Find node' }));
    await screen.findByRole('search');
  });

  it('NOP-FIND-006: Enter selects and frames the first match', async () => {
    await renderAssets();
    await searchFor('wall');
    await screen.findByRole('complementary', { name: 'Parameters of wall_curve' });
    await waitFor(() => expect(viewport().zoom).toBe(1.6));
    expect(searchStatus().textContent).toBe('1 of 1');
    expect(screen.getByTitle('/obj/assets/wall_curve').textContent).toBe('/obj/assets/wall_curve (line)');
    expect(document.activeElement).toBe(searchField());
  });

  it('NOP-FIND-007: a match inside a subnetwork opens its level and keeps focus in the field', async () => {
    await renderAssets();
    await searchFor('polybevel');
    await waitForNode('polybevel1');
    expect(currentLevel()).toBe('details');
    await screen.findByRole('complementary', { name: 'Parameters of polybevel1' });
    await waitFor(() => expect(viewport().zoom).toBe(1.6));
    expect(document.activeElement).toBe(searchField());
    fireEvent.click(backButton());
    await waitForNode('ground');
  });

  it('NOP-FIND-008: Enter, Ctrl+G, the buttons, Shift+. and Shift+, step through the matches and wrap', async () => {
    await renderAssets();
    await searchFor('merge');
    // `scene/merge1` first, then `scene/props/merge1`
    await waitFor(() => expect(currentLevel()).toBe('scene'));
    expect(searchStatus().textContent).toBe('1 of 2');
    fireEvent.keyDown(searchField(), { key: 'g', code: 'KeyG', ctrlKey: true });
    await waitFor(() => expect(currentLevel()).toBe('props'));
    expect(searchStatus().textContent).toBe('2 of 2');
    fireEvent.keyDown(searchField(), { key: 'Enter', code: 'Enter' });
    await waitFor(() => expect(currentLevel()).toBe('scene'));
    fireEvent.keyDown(searchField(), { key: 'Enter', code: 'Enter', shiftKey: true });
    await waitFor(() => expect(currentLevel()).toBe('props'));
    fireEvent.keyDown(searchField(), { key: 'G', code: 'KeyG', ctrlKey: true, shiftKey: true });
    await waitFor(() => expect(currentLevel()).toBe('scene'));
    fireEvent.click(screen.getByRole('button', { name: 'Next match' }));
    await waitFor(() => expect(currentLevel()).toBe('props'));
    fireEvent.click(screen.getByRole('button', { name: 'Previous match' }));
    await waitFor(() => expect(currentLevel()).toBe('scene'));

    // With the field closed, Houdini's Shift+. and Shift+, keep stepping
    fireEvent.keyDown(searchField(), { key: 'Escape', code: 'Escape' });
    await waitFor(() => expect(document.activeElement).toBe(nodeElement('merge1')));
    expect(pressKey('Period', { key: '>', shiftKey: true }, nodeElement('merge1') as HTMLElement)).toBe(false);
    await waitFor(() => expect(currentLevel()).toBe('props'));
    await waitFor(() => expect(document.activeElement).toBe(nodeElement('merge1')));
    expect(pressKey('Comma', { key: '<', shiftKey: true }, nodeElement('merge1') as HTMLElement)).toBe(false);
    await waitFor(() => expect(currentLevel()).toBe('scene'));
    await screen.findByRole('complementary', { name: 'Parameters of merge1' });
  });

  it('NOP-FIND-009: nothing found disables the buttons and leaves Ctrl+G to the browser', async () => {
    await renderAssets();
    await searchFor('nothing');
    expect(searchStatus().textContent).toBe('No matches');
    expect((screen.getByRole('button', { name: 'Next match' }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole('button', { name: 'Previous match' }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.keyDown(searchField(), { key: 'Escape', code: 'Escape' });
    expect(pressKey('KeyG', { ctrlKey: true })).toBe(true);
    expect(pressKey('Period', { key: '>', shiftKey: true })).toBe(true);
  });

  it('NOP-FIND-013: the field is a labelled search landmark described by its status line', async () => {
    render(
      <div style={{ width: 1000, height: 600 }}>
        <HoudiniNetwork data={loadExample('assets')} />
      </div>,
    );
    await waitForNode('scene');
    fireEvent.click(screen.getByRole('button', { name: 'Find node' }));
    const field = await screen.findByRole('textbox', { name: 'Find node by name or type' });
    expect(document.getElementById(field.getAttribute('aria-describedby') ?? '')).toBe(searchStatus());
    expect(searchStatus().textContent).toBe('Type a node name or type');
  });
});
