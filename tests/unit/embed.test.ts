import { afterEach, describe, expect, it, vi } from 'vitest';
import { EMBED_OPTION_NAMES, parseEmbedOptions } from '../../src/embed/embedAttributes';
import { fetchNetworkJson, MAX_NETWORK_BYTES } from '../../src/embed/fetchNetwork';
import {
  DEFAULT_EMBED_OPTIONS,
  buildEmbedPageUrl,
  buildIframeSnippet,
  buildReactSnippet,
  buildWebComponentSnippet,
} from '../../src/playground/embedSnippets';

const reader = (values: Record<string, string>) => (name: string) => (Object.hasOwn(values, name) ? values[name] : null);

describe('parseEmbedOptions', () => {
  it('NOP-EMB-006: reads every documented option', () => {
    expect(
      parseEmbedOptions(
        reader({ 'label-size': 'large', 'wire-style': 'rounded', minimap: '', toolbar: '0', inspector: 'off', 'debug-actions': '', 'fit-view': 'no', hotkeys: 'hover', 'focus-node': ' transform1 ', fullscreen: 'false', 'touch-pan': 'one-finger' }),
      ),
    ).toEqual({
      labelSize: 'large',
      wireStyle: 'rounded',
      showMiniMap: true,
      focusNode: 'transform1',
      showToolbar: false,
      showFullscreenButton: false,
      touchPan: 'one-finger',
      showInspector: false,
      showDebugActions: true,
      fitView: false,
      hotkeys: 'hover',
    });
  });

  it('NOP-EMB-006: ignores unknown values so the viewer keeps its defaults', () => {
    expect(parseEmbedOptions(reader({ 'label-size': 'huge', 'wire-style': 'curvy', hotkeys: 'always', 'focus-node': '  ', 'touch-pan': 'three' }))).toEqual({});
  });

  it('lists the attribute names the web component observes', () => {
    expect(EMBED_OPTION_NAMES).toEqual(['label-size', 'wire-style', 'minimap', 'toolbar', 'inspector', 'debug-actions', 'fit-view', 'hotkeys', 'focus-node', 'fullscreen', 'touch-pan']);
  });
});

describe('embed snippets', () => {
  const options = { ...DEFAULT_EMBED_OPTIONS, jsonUrl: 'net "1".json', showMiniMap: true };

  it('escapes the file URL in the web component snippet', () => {
    const snippet = buildWebComponentSnippet(options, 'https://cdn.example/web-component.js');
    expect(snippet).toContain('src="net &quot;1&quot;.json"');
    expect(snippet).toContain('minimap="true"');
    expect(snippet).toContain('height: 600px');
    // The space is the canvas grey before the script loads
    expect(snippet).toContain('background: #242424');
  });

  it('builds the iframe page URL with only non-default options', () => {
    const url = new URL(buildEmbedPageUrl({ ...options, jsonUrl: 'https://x.test/a.json' }, 'https://nop.test/app/?tab=1#top'));
    expect(url.origin + url.pathname).toBe('https://nop.test/app/');
    expect(Object.fromEntries(url.searchParams)).toEqual({ embed: 'true', src: 'https://x.test/a.json', minimap: 'true' });
    expect(buildIframeSnippet(options, 'https://nop.test/')).toContain('allowfullscreen');
  });

  it('the overview stays closed and the whole network fitted unless chosen', () => {
    expect(buildWebComponentSnippet(DEFAULT_EMBED_OPTIONS, 'wc.js')).not.toMatch(/minimap|focus-node/);
    expect(buildReactSnippet(DEFAULT_EMBED_OPTIONS)).not.toMatch(/showMiniMap|focusNode/);
  });

  it('escapes the focus node in every snippet', () => {
    const focused = { ...DEFAULT_EMBED_OPTIONS, focusNode: 'a"b' };
    expect(buildWebComponentSnippet(focused, 'wc.js')).toContain('focus-node="a&quot;b"');
    expect(buildReactSnippet(focused)).toContain('focusNode={"a\\"b"}');
    expect(new URL(buildEmbedPageUrl(focused, 'https://nop.test/')).searchParams.get('focus-node')).toBe('a"b');
  });

  it('D-25: the React snippet relies on the hidden-by-default debug buttons', () => {
    expect(buildReactSnippet(DEFAULT_EMBED_OPTIONS)).not.toContain('showDebugActions');
  });

  it('NOP-PG-041: the fullscreen and Download JSON options reach every snippet and read back the same', () => {
    const chosen = { ...DEFAULT_EMBED_OPTIONS, showFullscreenButton: false, showDebugActions: true };
    const html = buildWebComponentSnippet(chosen, 'wc.js');
    expect(html).toContain('fullscreen="false"');
    expect(html).toContain('debug-actions="true"');
    const react = buildReactSnippet(chosen);
    expect(react).toContain('showFullscreenButton={false}');
    expect(react).toContain('showDebugActions');
    const url = new URL(buildEmbedPageUrl(chosen, 'https://nop.test/'));
    expect(parseEmbedOptions((name) => url.searchParams.get(name))).toMatchObject({ showFullscreenButton: false, showDebugActions: true });
    // The defaults add nothing
    expect(buildWebComponentSnippet(DEFAULT_EMBED_OPTIONS, 'wc.js')).not.toMatch(/fullscreen=|debug-actions/);
  });
});

describe('fetchNetworkJson', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  const respond = (body: string, init: ResponseInit & { headers?: Record<string, string> } = {}) =>
    vi.stubGlobal('fetch', vi.fn(async () => new Response(body, init)));

  it('NOP-EMB-021: parses a JSON file and sends no credentials to other sites', async () => {
    respond('{"root":{"nodes":[]}}');
    await expect(fetchNetworkJson('https://x.test/a.json')).resolves.toEqual({ root: { nodes: [] } });
    const [, init] = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(init.credentials).toBe('same-origin');
  });

  it('NOP-EMB-020: explains HTML pages, HTTP errors and invalid JSON', async () => {
    respond('<!doctype html><p>home</p>');
    await expect(fetchNetworkJson('a.json')).rejects.toThrow('returned a web page');
    respond('nope', { status: 404 });
    await expect(fetchNetworkJson('a.json')).rejects.toThrow('HTTP 404');
    respond('{broken');
    await expect(fetchNetworkJson('a.json')).rejects.toThrow('is not a valid JSON file');
  });

  it('NOP-EMB-023 and S-03: refuses files larger than the limit', async () => {
    respond('{}', { headers: { 'content-length': String(MAX_NETWORK_BYTES + 1) } });
    await expect(fetchNetworkJson('big.json')).rejects.toThrow('is larger than 100 MB');
  });

  it('NOP-EMB-023: refuses a file without a declared length once it is read and too large', async () => {
    respond('x'.repeat(16));
    vi.spyOn(Response.prototype, 'text').mockResolvedValue({ length: MAX_NETWORK_BYTES + 1 } as unknown as string);
    await expect(fetchNetworkJson('chunked.json')).rejects.toThrow('is larger than 100 MB');
  });

  it('NOP-EMB-020: a failed request (CORS or offline) names cross-origin requests', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('Failed to fetch'))));
    await expect(fetchNetworkJson('https://other.site/a.json')).rejects.toThrow(
      'that server must allow cross-origin requests (CORS)',
    );
  });

  it('NOP-EMB-024: browsers without AbortSignal.timeout still download, without a time limit', async () => {
    const timeout = Object.getOwnPropertyDescriptor(AbortSignal, 'timeout');
    Object.defineProperty(AbortSignal, 'timeout', { value: undefined, configurable: true });
    try {
      respond('{"root":{"nodes":[]}}');
      await expect(fetchNetworkJson('a.json')).resolves.toEqual({ root: { nodes: [] } });
      const [, init] = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
      expect(init.signal).toBeUndefined();
    } finally {
      if (timeout) Object.defineProperty(AbortSignal, 'timeout', timeout);
    }
  });
});
