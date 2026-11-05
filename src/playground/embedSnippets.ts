import type { HoudiniLabelSize, HoudiniWireStyle } from '../api';

/**
 * Settings chosen on the example page's embed panel (the playground's Embed button opens it).
 */
export interface EmbedSnippetOptions {
  /** URL (or site-relative path) where the user will host the exported `.json` file. */
  jsonUrl: string;
  /** Viewer height in CSS pixels. */
  heightPx: number;
  /** Node label size preset. */
  labelSize: HoudiniLabelSize;
  /** Wire style, or `auto` for the style exported with the network. */
  wireStyle: HoudiniWireStyle | 'auto';
  /** Open the network overview (minimap) at the start. */
  showMiniMap: boolean;
  /** Node of the top level to frame at the start; empty for the whole network. */
  focusNode: string;
  /** Show the toolbar. */
  showToolbar: boolean;
  /** Open the Parameter Inspector on selection. */
  showInspector: boolean;
  /** Show the fullscreen button. */
  showFullscreenButton: boolean;
  /** Show the Download JSON button. */
  showDebugActions: boolean;
}

/** Defaults of the embed panel (and omitted from the generated code). */
export const DEFAULT_EMBED_OPTIONS: EmbedSnippetOptions = {
  jsonUrl: 'my-network.json',
  heightPx: 600,
  labelSize: 'medium',
  wireStyle: 'auto',
  showMiniMap: false,
  focusNode: '',
  showToolbar: true,
  showInspector: true,
  showFullscreenButton: true,
  showDebugActions: false,
};

/** Smallest and largest embed height the panel offers, in pixels. */
export const MIN_EMBED_HEIGHT_PX = 240;
export const MAX_EMBED_HEIGHT_PX = 4000;

/** Height for the snippet from what is typed in the field: a whole number between the limits. */
export function clampEmbedHeight(text: string): number {
  const value = Number(text);
  if (!Number.isFinite(value) || value <= 0) return DEFAULT_EMBED_OPTIONS.heightPx;
  return Math.min(MAX_EMBED_HEIGHT_PX, Math.max(MIN_EMBED_HEIGHT_PX, Math.round(value)));
}

/**
 * Non-default options as `name=value` pairs, using the shared attribute / URL parameter names
 * (also the attributes the example page sets on its preview viewer).
 */
export function optionPairs(options: EmbedSnippetOptions): Array<[string, string]> {
  const pairs: Array<[string, string]> = [];
  if (options.labelSize !== DEFAULT_EMBED_OPTIONS.labelSize) pairs.push(['label-size', options.labelSize]);
  if (options.wireStyle !== 'auto') pairs.push(['wire-style', options.wireStyle]);
  if (options.showMiniMap) pairs.push(['minimap', 'true']);
  if (options.focusNode.trim()) pairs.push(['focus-node', options.focusNode.trim()]);
  if (!options.showToolbar) pairs.push(['toolbar', 'false']);
  if (!options.showInspector) pairs.push(['inspector', 'false']);
  if (!options.showFullscreenButton) pairs.push(['fullscreen', 'false']);
  if (options.showDebugActions) pairs.push(['debug-actions', 'true']);
  return pairs;
}

/**
 * Escapes text for use inside a double-quoted HTML attribute.
 */
function escapeAttribute(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/**
 * `<script>` + `<houdini-network>` snippet for plain HTML sites (WordPress, Cargo, static pages).
 *
 * @param scriptUrl URL of the published `web-component.js` bundle.
 */
export function buildWebComponentSnippet(options: EmbedSnippetOptions, scriptUrl: string): string {
  const attributes = [
    `src="${escapeAttribute(options.jsonUrl)}"`,
    ...optionPairs(options).map(([name, value]) => `${name}="${escapeAttribute(value)}"`),
    `style="display: block; height: ${options.heightPx}px"`,
  ];
  return [
    `<script type="module" src="${escapeAttribute(scriptUrl)}"></script>`,
    '',
    `<houdini-network`,
    ...attributes.map((a) => `  ${a}`),
    `></houdini-network>`,
  ].join('\n');
}

/**
 * React snippet using the `<HoudiniNetwork />` component from the npm package.
 */
export function buildReactSnippet(options: EmbedSnippetOptions): string {
  const props: string[] = ['data={network}'];
  if (options.labelSize !== DEFAULT_EMBED_OPTIONS.labelSize) props.push(`labelSize="${options.labelSize}"`);
  if (options.wireStyle !== 'auto') props.push(`wireStyle="${options.wireStyle}"`);
  if (options.showMiniMap) props.push('showMiniMap');
  if (options.focusNode.trim()) props.push(`focusNode={${JSON.stringify(options.focusNode.trim())}}`);
  if (!options.showToolbar) props.push('showToolbar={false}');
  if (!options.showInspector) props.push('showInspector={false}');
  if (!options.showFullscreenButton) props.push('showFullscreenButton={false}');
  if (options.showDebugActions) props.push('showDebugActions');
  const fileName = options.jsonUrl.split('/').pop() || 'my-network.json';
  return [
    `import { HoudiniNetwork } from 'nop-houdini-network-viewer';`,
    `import 'nop-houdini-network-viewer/style.css';`,
    `import network from './${fileName}';`,
    '',
    'export function MyHoudiniNetwork() {',
    '  return (',
    `    <div style={{ height: ${options.heightPx} }}>`,
    `      <HoudiniNetwork ${props.join(' ')} />`,
    '    </div>',
    '  );',
    '}',
  ].join('\n');
}

/**
 * Builds the URL of the playground's `?embed=true` page for an iframe.
 *
 * @param pageUrl URL of the hosted playground (for example `https://user.github.io/nop-houdini-network-viewer/`).
 */
export function buildEmbedPageUrl(options: EmbedSnippetOptions, pageUrl: string): string {
  const url = new URL(pageUrl);
  url.search = '';
  url.hash = '';
  url.searchParams.set('embed', 'true');
  url.searchParams.set('src', options.jsonUrl);
  for (const [name, value] of optionPairs(options)) {
    url.searchParams.set(name, value);
  }
  return url.toString();
}

/**
 * `<iframe>` snippet for sites that only allow iframes (Notion, some site builders). ArtStation
 * accepts no iframes from other sites, only its own media types.
 */
export function buildIframeSnippet(options: EmbedSnippetOptions, pageUrl: string): string {
  return [
    '<iframe',
    `  src="${escapeAttribute(buildEmbedPageUrl(options, pageUrl))}"`,
    `  width="100%" height="${options.heightPx}"`,
    '  style="border: 0"',
    '  allow="fullscreen" allowfullscreen',
    '  loading="lazy"',
    '  title="Houdini node network"',
    '></iframe>',
  ].join('\n');
}
