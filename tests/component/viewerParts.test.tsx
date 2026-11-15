// @vitest-environment jsdom
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HoudiniNetwork } from '../../src/components/HoudiniNetwork';
import { NetworkErrorBoundary } from '../../src/components/NetworkErrorBoundary';
import { ViewerToolbar } from '../../src/components/hud/ViewerToolbar';
import { createEmbedPanel } from '../../src/examplePage/embedPanel';
import { FeedbackDialog, FILE_UPLOAD_URL } from '../../src/playground/FeedbackDialog';
import { graph, node } from '../unit/networkFixtures';

const doc = { houdiniVersion: '22.0', root: graph({ nodes: [node({ name: 'box1' })] }) };

describe('NetworkErrorBoundary', () => {
  const Broken: React.FC = () => {
    throw new Error('cannot draw this level');
  };

  it('U-01: offers a way back and recovers when the reset key changes', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const onReset = vi.fn();
    const view = render(
      <NetworkErrorBoundary resetKey="/obj/geo1/subnet1" onReset={onReset} resetLabel="Back to the top network">
        <Broken />
      </NetworkErrorBoundary>,
    );
    expect(screen.getByRole('alert').textContent).toContain('cannot draw this level');
    fireEvent.click(screen.getByRole('button', { name: 'Back to the top network' }));
    expect(onReset).toHaveBeenCalledOnce();
    view.rerender(
      <NetworkErrorBoundary resetKey="/obj/geo1" onReset={onReset} resetLabel="Back to the top network">
        <p>recovered</p>
      </NetworkErrorBoundary>,
    );
    await screen.findByText('recovered');
  });
});

describe('fullscreen', () => {
  afterEach(() => {
    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true });
  });

  it('NOP-HUD-023 and Q-01: only the viewer that is fullscreen switches its layout', async () => {
    const { container } = render(
      <>
        <div style={{ height: 400 }}>
          <HoudiniNetwork data={doc} />
        </div>
        <div style={{ height: 400 }}>
          <HoudiniNetwork data={doc} />
        </div>
      </>,
    );
    const roots = container.querySelectorAll<HTMLElement>(':scope > div > .nop-root');
    expect(roots).toHaveLength(2);
    Object.defineProperty(document, 'fullscreenElement', { value: roots[0], configurable: true });
    fireEvent(document, new Event('fullscreenchange'));
    await waitFor(() => expect(roots[0].className).toContain('fixed'));
    expect(roots[1].className).not.toContain('fixed');
  });

  it('NOP-HUD-021 and 022: falls back to a CSS full-viewport mode without the Fullscreen API', async () => {
    Object.defineProperty(document, 'fullscreenEnabled', { value: false, configurable: true });
    render(<HoudiniNetwork data={doc} />);
    fireEvent.click(await screen.findByRole('button', { name: 'Enter fullscreen' }));
    const root = document.querySelector('.nop-root') as HTMLElement;
    await waitFor(() => expect(root.className).toContain('fixed'));
    expect(root.className).toContain('z-[2147483000]');
    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(root.className).not.toContain('fixed'));
  });
});

describe('ViewerToolbar', () => {
  const renderToolbar = (props: Partial<React.ComponentProps<typeof ViewerToolbar>> = {}) =>
    render(
      <div className="nop-root">
        <ViewerToolbar
          networkPath="/obj/geo1"
          pathBar={null}
          nodeCount={3}
          wireStyle="default"
          onChangeWireStyle={() => undefined}
          document={doc}
          miniMapVisible
          onToggleMiniMap={() => undefined}
          {...props}
        />
      </div>,
    );

  it('NOP-HUD-001: shows the node count and the view tools, without fit, label size or copy buttons', () => {
    renderToolbar({ showDebugActions: true, onToggleFullscreen: () => undefined });
    expect(screen.getByRole('toolbar', { name: 'View' }).textContent).toContain('3 nodes');
    expect(screen.queryByRole('button', { name: /fit/i })).toBeNull();
    expect(screen.getByRole('button', { name: 'Enter fullscreen' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Network overview' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: 'Download network JSON file' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: /labels$/ })).toBeNull();
    expect(screen.queryByRole('button', { name: /copy/i })).toBeNull();
  });

  it('hides the fullscreen button when the page switches it off', () => {
    renderToolbar({ showFullscreenButton: false, onToggleFullscreen: () => undefined });
    expect(screen.queryByRole('button', { name: 'Enter fullscreen' })).toBeNull();
  });

  it('NOP-HUD-004: narrow viewers have wire style, overview and screenshot in the settings menu', async () => {
    const onChangeWireStyle = vi.fn();
    renderToolbar({ onChangeWireStyle });
    const settings = screen.getByRole('button', { name: 'View settings' });
    expect(screen.queryByRole('menu')).toBeNull();
    expect(settings.getAttribute('aria-expanded')).toBe('false');

    // Opening focuses the checked style; the arrow keys move to the other one
    fireEvent.click(settings);
    expect(settings.getAttribute('aria-expanded')).toBe('true');
    const straight = screen.getByRole('menuitemradio', { name: /^Default wires/ });
    const rounded = screen.getByRole('menuitemradio', { name: /^Rounded wires/ });
    expect(straight.getAttribute('aria-checked')).toBe('true');
    expect(rounded.getAttribute('aria-checked')).toBe('false');
    await waitFor(() => expect(document.activeElement).toBe(straight));
    fireEvent.keyDown(straight, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(rounded);

    // Picking a style closes the menu and returns the focus to the button
    fireEvent.click(rounded);
    expect(onChangeWireStyle).toHaveBeenCalledWith('rounded');
    expect(screen.queryByRole('menu')).toBeNull();
    expect(document.activeElement).toBe(settings);

    // Escape and a press outside close it without a change
    fireEvent.click(settings);
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
    fireEvent.click(settings);
    fireEvent.pointerDown(document.body);
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    expect(onChangeWireStyle).toHaveBeenCalledTimes(1);
  });

  it('NOP-HUD-004: the overview and the screenshot are in the settings menu too, and the default style says it is straight', () => {
    const onToggleMiniMap = vi.fn();
    const onScreenshot = vi.fn();
    renderToolbar({ miniMapVisible: false, onToggleMiniMap, onScreenshot });
    fireEvent.click(screen.getByRole('button', { name: 'View settings' }));
    expect(screen.getByRole('menuitemradio', { name: /^Default wires/ }).textContent).toContain('Default (straight)');
    const overview = screen.getByRole('menuitemcheckbox', { name: /Network overview/ });
    expect(overview.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(overview);
    expect(onToggleMiniMap).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'View settings' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Save screenshot (PNG)' }));
    expect(onScreenshot).toHaveBeenCalledTimes(1);
    // Wide viewers have the same tools as header buttons (the CSS shows one set or the other)
    expect(screen.getByRole('button', { name: 'Save screenshot' })).toBeTruthy();
    expect(screen.getByRole('button', { name: /^Rounded wires/ }).getAttribute('aria-pressed')).toBe('false');
  });
});

describe('Example page embed panel', () => {
  afterEach(() => {
    document.body.textContent = '';
  });

  const code = () => document.querySelector('pre')?.textContent ?? '';

  it('NOP-PG-021: each tab gives the snippet for its kind of site', () => {
    document.body.append(createEmbedPanel({ jsonUrl: 'https://example.com/net.json', withOptions: false }));
    expect(screen.getByRole('tab', { name: 'HTML' }).getAttribute('aria-selected')).toBe('true');
    expect(code()).toContain(
      '<script type="module" src="https://cdn.jsdelivr.net/npm/nop-houdini-network-viewer@0.0.0-test/dist/web-component.js"></script>',
    );
    expect(code()).toContain('<houdini-network\n  src="https://example.com/net.json"');

    fireEvent.click(screen.getByRole('tab', { name: 'React' }));
    expect(code()).toContain("import { HoudiniNetwork } from 'nop-houdini-network-viewer';");
    expect(code()).not.toContain('showDebugActions');

    fireEvent.click(screen.getByRole('tab', { name: 'iframe' }));
    const src = /src="([^"]+)"/.exec(code())?.[1] ?? '';
    const url = new URL(src.replace(/&amp;/g, '&'));
    expect(url.origin + url.pathname).toBe(new URL('./', window.location.href).href);
    expect(url.searchParams.get('embed')).toBe('true');
    expect(url.searchParams.get('src')).toBe('https://example.com/net.json');
    expect(src).toContain('src=https%3A%2F%2Fexample.com%2Fnet.json');
  });

  it('NOP-PG-022: only the options that differ from the defaults appear in the snippet', () => {
    document.body.append(createEmbedPanel({ jsonUrl: 'net.json', withOptions: true, preview: document.createElement('div') }));
    fireEvent.change(screen.getByRole('combobox', { name: 'Label size' }), { target: { value: 'large' } });
    fireEvent.click(screen.getByRole('checkbox', { name: 'Overview open at start' }));
    // Without the network's node names the start node is a text field
    fireEvent.input(screen.getByRole('textbox', { name: /^Start framed on node/ }), { target: { value: 'OUT' } });
    fireEvent.input(screen.getByRole('spinbutton'), { target: { value: '800' } });
    for (const part of ['label-size="large"', 'minimap="true"', 'focus-node="OUT"', 'height: 800px']) expect(code()).toContain(part);
    expect(code()).not.toMatch(/toolbar=|inspector=|wire-style=|fullscreen=|debug-actions=/);
  });

  it('NOP-PG-023: the iframe tab asks for a full https:// address for a relative file', () => {
    document.body.append(createEmbedPanel({ jsonUrl: 'my-network.json', withOptions: true }));
    const note = screen.getByText(/The file address is relative/);
    expect(note.hidden).toBe(true);
    fireEvent.click(screen.getByRole('tab', { name: 'iframe' }));
    expect(note.hidden).toBe(false);
    fireEvent.input(screen.getByRole('textbox', { name: /^Network file address/ }), {
      target: { value: 'https://gist.githubusercontent.com/me/raw/my-network.json' },
    });
    expect(note.hidden).toBe(true);
  });

  it('NOP-PG-024: a typed file address is escaped in the snippet', () => {
    document.body.append(createEmbedPanel({ jsonUrl: 'net.json', withOptions: true }));
    fireEvent.input(screen.getByRole('textbox', { name: /^Network file address/ }), { target: { value: 'a"b<c.json' } });
    expect(code()).toContain('src="a&quot;b&lt;c.json"');
    expect(code()).not.toContain('a"b<c');
  });

  describe('NOP-PG-025: Copy', () => {
    const setClipboard = (writeText: (text: string) => Promise<void>) =>
      Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

    afterEach(() => {
      Reflect.deleteProperty(navigator, 'clipboard');
    });

    it('NOP-PG-025: puts the snippet on the clipboard and confirms it', async () => {
      const writeText = vi.fn(() => Promise.resolve());
      setClipboard(writeText);
      document.body.append(createEmbedPanel({ jsonUrl: 'net.json', withOptions: false }));
      const copy = screen.getByRole('button', { name: 'Copy' });
      fireEvent.click(copy);
      await waitFor(() => expect(copy.textContent).toBe('Copied'));
      expect(writeText).toHaveBeenCalledWith(code());
    });

    it('NOP-PG-025: without clipboard access the snippet is selected for a manual copy', async () => {
      setClipboard(() => Promise.reject(new Error('blocked')));
      document.body.append(createEmbedPanel({ jsonUrl: 'net.json', withOptions: false }));
      fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
      await waitFor(() => expect(window.getSelection()?.toString()).toBe(code()));
      expect(screen.getByRole('button', { name: 'Copy' })).toBeTruthy();
    });
  });

  it('NOP-PG-027 and U-04: the HTML and React tabs say the package is not on npm yet, the iframe tab does not', () => {
    document.body.append(createEmbedPanel({ jsonUrl: 'net.json', withOptions: false }));
    const npmNote = screen.getByText(/Not on npm yet/);
    expect(npmNote.hidden).toBe(false);
    expect(npmNote.textContent).toContain('use the iframe tab');
    fireEvent.click(screen.getByRole('tab', { name: 'React' }));
    expect(npmNote.hidden).toBe(false);
    fireEvent.click(screen.getByRole('tab', { name: 'iframe' }));
    expect(npmNote.hidden).toBe(true);
    expect(code()).toContain('<iframe');
  });

  it('NOP-PG-026 and U-03: the height field keeps what is typed and the snippet uses the clamped value', () => {
    const preview = document.createElement('div');
    document.body.append(preview, createEmbedPanel({ jsonUrl: 'net.json', withOptions: true, preview }));
    const height = screen.getByRole('spinbutton') as HTMLInputElement;
    fireEvent.change(height, { target: { value: '' } });
    expect(height.value).toBe('');
    fireEvent.change(height, { target: { value: '8' } });
    expect(height.value).toBe('8');
    fireEvent.change(height, { target: { value: '800' } });
    expect(height.value).toBe('800');
    fireEvent.input(height, { target: { value: '800' } });
    expect(document.querySelector('pre')?.textContent).toContain('height: 800px');
    // The preview viewer follows the options
    expect(preview.style.getPropertyValue('--nop-embed-height')).toBe('800px');
    fireEvent.input(height, { target: { value: '5' } });
    fireEvent.blur(height);
    expect(height.value).toBe('240');
  });

  it('NOP-PG-016: options set the preview attributes and the code; article panels have only the code tabs', () => {
    const preview = document.createElement('div');
    document.body.append(preview, createEmbedPanel({ jsonUrl: 'net.json', withOptions: true, preview }));
    fireEvent.change(screen.getByRole('combobox', { name: 'Label size' }), { target: { value: 'large' } });
    fireEvent.click(screen.getByRole('checkbox', { name: 'Toolbar' }));
    expect(preview.getAttribute('label-size')).toBe('large');
    expect(preview.getAttribute('toolbar')).toBe('false');
    expect(document.querySelector('pre')?.textContent).toContain('label-size="large"');

    document.body.textContent = '';
    document.body.append(createEmbedPanel({ jsonUrl: 'https://example.com/a-network.json', withOptions: false }));
    expect(screen.queryByRole('spinbutton')).toBeNull();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(document.querySelector('pre')?.textContent).toContain('src="https://example.com/a-network.json"');
  });

  it('NOP-PG-041: the start node is a list of the top-level nodes', () => {
    const preview = document.createElement('div');
    document.body.append(preview, createEmbedPanel({ jsonUrl: 'net.json', withOptions: true, preview, nodeNames: ['OUT', 'box1'] }));
    const start = screen.getByRole('combobox', { name: 'Start framed on node' }) as HTMLSelectElement;
    expect([...start.options].map((option) => option.textContent)).toEqual(['Whole network', 'box1', 'OUT']);
    fireEvent.change(start, { target: { value: 'OUT' } });
    expect(preview.getAttribute('focus-node')).toBe('OUT');
    expect(document.querySelector('pre')?.textContent).toContain('focus-node="OUT"');
    fireEvent.click(screen.getByRole('checkbox', { name: 'Fullscreen button' }));
    expect(preview.getAttribute('fullscreen')).toBe('false');
    // Touch and hotkey settings are left to the code (owner decision 2026-11-04)
    expect(screen.queryByRole('combobox', { name: /touch|Hotkeys/i })).toBeNull();
  });

});

describe('FeedbackDialog', () => {
  it('NOP-PG-039: links the Dropbox file request in a new tab', () => {
    HTMLDialogElement.prototype.showModal ??= function showModal(this: HTMLDialogElement) {
      this.setAttribute('open', '');
    };
    render(<FeedbackDialog open onClose={() => undefined} networkName="Circuit Board" />);
    const link = screen.getByRole('link', { name: 'Upload it to Dropbox' });
    expect(link.getAttribute('href')).toBe(FILE_UPLOAD_URL);
    expect(FILE_UPLOAD_URL).toMatch(/^https:\/\/www\.dropbox\.com\/request\//);
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    expect(document.body.textContent).toContain('Your network file itself is not sent.');
  });
});
