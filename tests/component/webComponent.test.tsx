// @vitest-environment jsdom
import { waitFor } from '@testing-library/react';
import { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '../../src/web-component';

const network = JSON.stringify({ houdiniVersion: '22.0', root: { path: '/obj/geo1', type: 'geo', nodes: [{ name: 'box1', pos: [0, 0] }] } });

function addElement(html: string) {
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  return host.firstElementChild as HTMLElement;
}

const shadowNode = (element: HTMLElement, name: string) =>
  element.shadowRoot?.querySelector(`.react-flow__node[data-id="${name}"]`) ?? null;

describe('<houdini-network>', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('NOP-EMB-002 and 011: renders the inline JSON inside a Shadow DOM and registers the fonts on the page once', async () => {
    const element = await act(async () =>
      addElement(`<houdini-network style="height: 400px"><script type="application/json">${network}</script></houdini-network>`),
    );
    await waitFor(() => expect(shadowNode(element, 'box1')).not.toBeNull());
    expect(document.head.querySelectorAll('style[data-houdini-network-fonts]')).toHaveLength(1);
  });

  it('NOP-EMB-008 and Q-04: changing an attribute does not parse the inline JSON again', async () => {
    const parse = vi.spyOn(JSON, 'parse');
    const element = await act(async () =>
      addElement(`<houdini-network><script type="application/json">${network}</script></houdini-network>`),
    );
    await waitFor(() => expect(shadowNode(element, 'box1')).not.toBeNull());
    const callsBefore = parse.mock.calls.length;
    await act(async () => {
      element.setAttribute('label-size', 'large');
    });
    expect(parse.mock.calls.length).toBe(callsBefore);
    parse.mockRestore();
  });

  it('NOP-EMB-014 and Q-04: reads a JSON child that page scripts add later', async () => {
    const element = await act(async () => addElement('<houdini-network></houdini-network>'));
    await waitFor(() => expect(element.shadowRoot?.textContent).toContain('No Houdini network file was given'));
    await act(async () => {
      const script = document.createElement('script');
      script.type = 'application/json';
      script.textContent = network;
      element.append(script);
    });
    await waitFor(() => expect(shadowNode(element, 'box1')).not.toBeNull());
  });

  it('NOP-EMB-004: shows a readable error for invalid inline JSON', async () => {
    const element = await act(async () =>
      addElement('<houdini-network><script type="application/json">{ broken</script></houdini-network>'),
    );
    await waitFor(() => expect(element.shadowRoot?.textContent).toContain('is not valid JSON'));
  });
});
