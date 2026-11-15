// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '../../src/web-component';
import { HoudiniNetwork, RemoteHoudiniNetwork } from '../../src/api';
import { loadExample } from './inspectorHelpers';

/** A one-node network whose node is called `name`. */
const network = (name: string) => ({ houdiniVersion: '22.0', root: { path: '/obj/geo1', type: 'geo', nodes: [{ name, pos: [0, 0] }] } });

/** Answers `fetch(url)` with the network registered for that URL. */
function serveNetworks(files: Record<string, unknown>) {
  const fetchMock = vi.fn(async (url: string) =>
    Object.hasOwn(files, url) ? new Response(JSON.stringify(files[url])) : new Response('missing', { status: 404 }),
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

async function addElement(html: string) {
  return act(async () => {
    const host = document.createElement('div');
    host.innerHTML = html;
    document.body.append(host);
    return host.firstElementChild as HTMLElement & { data: unknown };
  });
}

const shadowNode = (element: HTMLElement, name: string) =>
  element.shadowRoot?.querySelector<HTMLElement>(`.react-flow__node[data-id="${name}"]`) ?? null;

const inlineScript = (data: unknown) => `<script type="application/json">${JSON.stringify(data)}</script>`;

afterEach(() => {
  document.body.innerHTML = '';
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('<houdini-network>', () => {
  it('NOP-EMB-002: inline JSON is shown without any network request', async () => {
    const fetchMock = serveNetworks({});
    const element = await addElement(`<houdini-network>${inlineScript(network('inline1'))}</houdini-network>`);
    await waitFor(() => expect(shadowNode(element, 'inline1')).not.toBeNull());
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('NOP-EMB-003: the data property wins over inline JSON and src', async () => {
    serveNetworks({ 'a.json': network('a1') });
    const element = await addElement(`<houdini-network src="a.json">${inlineScript(network('b1'))}</houdini-network>`);
    await waitFor(() => expect(shadowNode(element, 'b1')).not.toBeNull());
    await act(async () => {
      element.data = network('c1');
    });
    await waitFor(() => expect(shadowNode(element, 'c1')).not.toBeNull());
    expect(shadowNode(element, 'b1')).toBeNull();
  });

  it('NOP-EMB-015: setting data back to null shows the inline JSON again', async () => {
    const element = await addElement(`<houdini-network>${inlineScript(network('b1'))}</houdini-network>`);
    await act(async () => {
      element.data = network('c1');
    });
    await waitFor(() => expect(shadowNode(element, 'c1')).not.toBeNull());
    await act(async () => {
      element.data = null;
    });
    await waitFor(() => expect(shadowNode(element, 'b1')).not.toBeNull());
  });

  it('NOP-EMB-005: an element without a source explains what to add', async () => {
    const element = await addElement('<houdini-network></houdini-network>');
    await waitFor(() => expect(element.shadowRoot?.textContent).toContain('No Houdini network file was given.'));
    expect(element.shadowRoot?.textContent).toContain('src="my-network.json"');
  });

  it('NOP-EMB-007: changing an attribute updates the viewer, a new src loads the new network', async () => {
    serveNetworks({ 'a.json': network('a1'), 'b.json': network('b1') });
    const element = await addElement('<houdini-network src="a.json"></houdini-network>');
    await waitFor(() => expect(shadowNode(element, 'a1')).not.toBeNull());
    expect(shadowNode(element, 'a1')?.innerHTML).toContain('text-[17px]');
    await act(async () => {
      element.setAttribute('label-size', 'small');
    });
    await waitFor(() => expect(shadowNode(element, 'a1')?.innerHTML).toContain('text-[14.5px]'));
    await act(async () => {
      element.setAttribute('src', 'b.json');
    });
    await waitFor(() => expect(shadowNode(element, 'b1')).not.toBeNull());
  });

  it('NOP-EMB-008: changing an option keeps the subnetwork and the selection', async () => {
    const element = await addElement(`<houdini-network>${inlineScript(loadExample('assets'))}</houdini-network>`);
    await waitFor(() => expect(shadowNode(element, 'scene')).not.toBeNull());
    fireEvent.click(shadowNode(element, 'scene') as HTMLElement);
    fireEvent.click(shadowNode(element, 'scene') as HTMLElement);
    await waitFor(() => expect(shadowNode(element, 'pebble_scatter1')).not.toBeNull());
    fireEvent.click(shadowNode(element, 'props') as HTMLElement);
    await waitFor(() => expect(shadowNode(element, 'props')?.classList.contains('selected')).toBe(true));
    await act(async () => {
      element.setAttribute('label-size', 'large');
    });
    await waitFor(() => expect(shadowNode(element, 'props')?.innerHTML).not.toContain('text-[17px]'));
    expect(shadowNode(element, 'pebble_scatter1')).not.toBeNull();
    expect(shadowNode(element, 'props')?.classList.contains('selected')).toBe(true);
  });

  it('NOP-EMB-010: moving the element keeps it alive, removing it unmounts the viewer', async () => {
    const element = await addElement(`<houdini-network>${inlineScript(network('box1'))}</houdini-network>`);
    await waitFor(() => expect(shadowNode(element, 'box1')).not.toBeNull());
    const drawn = shadowNode(element, 'box1');
    const otherParent = document.createElement('section');
    document.body.append(otherParent);
    await act(async () => {
      otherParent.append(element);
      await Promise.resolve();
    });
    expect(shadowNode(element, 'box1')).toBe(drawn);

    const mountPoint = element.shadowRoot?.querySelector('style + div') as HTMLElement;
    expect(mountPoint.childElementCount).toBeGreaterThan(0);
    await act(async () => {
      element.remove();
      await Promise.resolve();
    });
    expect(mountPoint.childElementCount).toBe(0);
  });
});

describe('React components', () => {
  it('NOP-EMB-040: HoudiniNetwork renders the network inside a .nop-root element', async () => {
    const { container } = render(
      <div style={{ width: 1000, height: 600 }}>
        <HoudiniNetwork data={network('box1')} />
      </div>,
    );
    await waitFor(() => expect(container.querySelector('.react-flow__node[data-id="box1"]')).not.toBeNull());
    expect(container.querySelector('.react-flow__node[data-id="box1"]')?.closest('.nop-root')).not.toBeNull();
  });

  it('NOP-EMB-041: RemoteHoudiniNetwork prefers data over src and makes no request', async () => {
    const fetchMock = serveNetworks({ 'a.json': network('a1') });
    const { container } = render(
      <div style={{ width: 1000, height: 600 }}>
        <RemoteHoudiniNetwork src="a.json" data={network('d1')} />
      </div>,
    );
    await waitFor(() => expect(container.querySelector('.react-flow__node[data-id="d1"]')).not.toBeNull());
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('NOP-EMB-022: a new src cancels the previous download', async () => {
    const pending = new Map<string, (response: Response) => void>();
    const signals = new Map<string, AbortSignal>();
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (url: string, init: RequestInit) =>
          new Promise<Response>((resolve, reject) => {
            pending.set(url, resolve);
            signals.set(url, init.signal as AbortSignal);
            // Like a browser: a cancelled download rejects with an AbortError
            init.signal?.addEventListener('abort', () => reject(new DOMException('The download was cancelled.', 'AbortError')));
          }),
      ),
    );
    const view = render(
      <div style={{ width: 1000, height: 600 }}>
        <RemoteHoudiniNetwork src="a.json" />
      </div>,
    );
    expect(await screen.findByText(/Loading/)).toBeTruthy();
    view.rerender(
      <div style={{ width: 1000, height: 600 }}>
        <RemoteHoudiniNetwork src="b.json" />
      </div>,
    );
    await waitFor(() => expect(pending.has('b.json')).toBe(true));
    expect(signals.get('a.json')?.aborted).toBe(true);
    expect(signals.get('b.json')?.aborted).toBe(false);
    await act(async () => {
      pending.get('b.json')?.(new Response(JSON.stringify(network('b1'))));
      pending.get('a.json')?.(new Response(JSON.stringify(network('a1'))));
    });
    await waitFor(() => expect(view.container.querySelector('.react-flow__node[data-id="b1"]')).not.toBeNull());
    expect(view.container.querySelector('.react-flow__node[data-id="a1"]')).toBeNull();
  });

  it('NOP-EMB-022: a download that still finishes after its cancel is ignored', async () => {
    // A fetch that ignores the cancel and delivers the old file late: the newer network must stay
    const pending = new Map<string, (response: Response) => void>();
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => new Promise<Response>((resolve) => pending.set(url, resolve))),
    );
    const at = (src: string) => (
      <div style={{ width: 1000, height: 600 }}>
        <RemoteHoudiniNetwork src={src} />
      </div>
    );
    const view = render(at('a.json'));
    await waitFor(() => expect(pending.has('a.json')).toBe(true));
    view.rerender(at('b.json'));
    await waitFor(() => expect(pending.has('b.json')).toBe(true));
    await act(async () => pending.get('b.json')?.(new Response(JSON.stringify(network('b1')))));
    await waitFor(() => expect(view.container.querySelector('.react-flow__node[data-id="b1"]')).not.toBeNull());
    // The late file: once it has been read and every step queued after that has run, it is too late
    const late = new Response(JSON.stringify(network('a1')));
    const readText = late.text.bind(late);
    let read: Promise<string> | undefined;
    Object.defineProperty(late, 'text', { value: () => (read = readText()) });
    await act(async () => pending.get('a.json')?.(late));
    await waitFor(() => expect(read).toBeDefined());
    await act(async () => {
      await read;
      // A task runs only after every queued promise step: the download's last steps have run
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(view.container.querySelector('.react-flow__node[data-id="a1"]')).toBeNull();
    expect(view.container.querySelector('.react-flow__node[data-id="b1"]')).not.toBeNull();
  });
});
