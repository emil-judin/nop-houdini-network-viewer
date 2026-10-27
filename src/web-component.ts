import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { NetworkErrorState } from './components/hud/NetworkErrorState';
import { EMBED_OPTION_NAMES, parseEmbedOptions } from './embed/embedAttributes';
import { RemoteHoudiniNetwork } from './embed/RemoteHoudiniNetwork';
import fontsCss from './styles/fonts.css?inline';
import viewerCss from './styles/viewer-bundle.css?inline';

/** Custom element tag name. */
export const HOUDINI_NETWORK_TAG = 'houdini-network';

/** Default size of the element; any `style="height: ..."` on the page overrides it. */
const HOST_CSS = ':host { display: block; position: relative; height: 480px; } :host([hidden]) { display: none; }';

/**
 * Font URLs in the built `fonts.css` are relative to this script (`./fonts/...`, see
 * `vite.lib.config.ts`), but a `<style>` element in the page resolves them against the page.
 * This makes them absolute, so the fonts load from wherever the script is served (a CDN, a folder).
 */
function resolveFontUrls(css: string): string {
  return css.replace(/url\((["']?)\.\/fonts\//g, (_match, quote: string) => `url(${quote}${new URL(/* @vite-ignore */ './fonts/', import.meta.url).href}`);
}

/**
 * Registers the viewer fonts on the page once. Browsers ignore `@font-face` inside a Shadow DOM,
 * so the rules go into the document head (they only add font families, never style the page).
 */
function registerFonts(): void {
  if (document.head.querySelector('style[data-houdini-network-fonts]')) return;
  const style = document.createElement('style');
  style.setAttribute('data-houdini-network-fonts', '');
  style.textContent = resolveFontUrls(fontsCss);
  document.head.append(style);
}

type InlineJson = { data: unknown } | { error: string };

/**
 * Tailwind declares its internal variables (`--tw-border-style`, `--tw-shadow`, ...) with
 * `@property` initial values, but `@property` rules are ignored inside a Shadow DOM. Without
 * those initial values, borders and shadows would disappear, so they are set directly.
 */
function buildShadowPropertyDefaults(css: string): string {
  const declarations: string[] = [];
  for (const match of css.matchAll(/@property\s+(--[\w-]+)\s*\{([^}]*)\}/g)) {
    const initialValue = /initial-value\s*:\s*([^;]+)/.exec(match[2]);
    if (initialValue) declarations.push(`${match[1]}: ${initialValue[1].trim()};`);
  }
  return declarations.length ? `:host, *, ::before, ::after { ${declarations.join(' ')} }` : '';
}

const SHADOW_CSS = [HOST_CSS, buildShadowPropertyDefaults(viewerCss), viewerCss].join('\n');

/**
 * `<houdini-network>`: embeds a read-only Houdini network viewer with a single HTML tag.
 *
 * ```html
 * <script type="module" src=".../web-component.js"></script>
 * <houdini-network src="my-network.json" style="height: 600px"></houdini-network>
 * ```
 *
 * The network comes from (first match wins):
 * 1. the `data` property set from JavaScript (`element.data = json`),
 * 2. an inline `<script type="application/json">` child holding the exported JSON,
 * 3. the `src` attribute (URL of the exported `.json` file).
 *
 * Optional attributes: `label-size` (`small` | `medium` | `large`), `wire-style`
 * (`default` | `rounded`), `hotkeys` (`focus` | `hover` | `off`), and `minimap`, `toolbar`,
 * `inspector`, `debug-actions`, `fit-view` (`"false"` to switch off). The viewer lives in a Shadow
 * DOM, so page styles cannot break it and its styles never leak into the page.
 */
export class HoudiniNetworkElement extends HTMLElement {
  static observedAttributes = ['src', ...EMBED_OPTION_NAMES];

  private reactRoot: Root | null = null;
  private readonly mountPoint: HTMLDivElement;
  private propertyData: unknown = null;
  /**
   * Last parsed inline JSON and its text. Re-rendering with the same text passes the same object,
   * so changing an attribute does not reset the visitor's navigation, selection and view.
   */
  private inlineCache: { text: string; result: InlineJson } | null = null;
  /** Re-reads the inline JSON when page scripts add or change the `<script>` child later. */
  private readonly childObserver = new MutationObserver(() => this.render());

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = SHADOW_CSS;
    this.mountPoint = document.createElement('div');
    this.mountPoint.style.height = '100%';
    shadow.append(style, this.mountPoint);
  }

  /** Network data set from JavaScript. Takes priority over the inline JSON and `src`. */
  get data(): unknown {
    return this.propertyData;
  }

  set data(value: unknown) {
    this.propertyData = value;
    this.render();
  }

  connectedCallback(): void {
    registerFonts();
    this.reactRoot ??= createRoot(this.mountPoint);
    this.childObserver.observe(this, { childList: true, subtree: true, characterData: true });
    this.render();
  }

  disconnectedCallback(): void {
    this.childObserver.disconnect();
    // Moving the element in the page disconnects and reconnects it: only unmount when it is really gone
    queueMicrotask(() => {
      if (!this.isConnected && this.reactRoot) {
        this.reactRoot.unmount();
        this.reactRoot = null;
      }
    });
  }

  attributeChangedCallback(): void {
    this.render();
  }

  /** Reads the optional inline `<script type="application/json">` child (parsed once per text). */
  private readInlineJson(): InlineJson | null {
    const text = this.querySelector(':scope > script[type="application/json"]')?.textContent?.trim();
    if (!text) {
      this.inlineCache = null;
      return null;
    }
    if (this.inlineCache?.text !== text) {
      let result: InlineJson;
      try {
        result = { data: JSON.parse(text) };
      } catch (err) {
        result = {
          error: `The inline <script type="application/json"> is not valid JSON: ${err instanceof Error ? err.message : err}`,
        };
      }
      this.inlineCache = { text, result };
    }
    return this.inlineCache.result;
  }

  private render(): void {
    if (!this.reactRoot) return;
    const inline = this.propertyData ? null : this.readInlineJson();
    if (inline && 'error' in inline) {
      this.reactRoot.render(React.createElement(NetworkErrorState, { message: inline.error }));
      return;
    }
    const data = (this.propertyData ?? inline?.data ?? null) as Record<string, unknown> | null;
    this.reactRoot.render(
      React.createElement(RemoteHoudiniNetwork, {
        src: this.getAttribute('src'),
        data,
        ...parseEmbedOptions((name) => this.getAttribute(name)),
        className: 'h-full',
      }),
    );
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(HOUDINI_NETWORK_TAG)) {
  customElements.define(HOUDINI_NETWORK_TAG, HoudiniNetworkElement);
}

declare global {
  interface HTMLElementTagNameMap {
    'houdini-network': HoudiniNetworkElement;
  }
}
