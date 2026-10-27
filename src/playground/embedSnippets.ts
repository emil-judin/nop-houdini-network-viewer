import type { HoudiniLabelSize } from '../schema/converter';
import type { HoudiniWireStyle } from '../schema/types';

/**
 * Settings chosen in the playground's Embed dialog.
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
  /** Show the minimap. */
  showMiniMap: boolean;
  /** Show the toolbar. */
  showToolbar: boolean;
  /** Open the Parameter Inspector on selection. */
  showInspector: boolean;
}

/** Defaults used by the Embed dialog (and omitted from the generated code). */
export const DEFAULT_EMBED_OPTIONS: EmbedSnippetOptions = {
  jsonUrl: 'my-network.json',
  heightPx: 600,
  labelSize: 'medium',
  wireStyle: 'auto',
  showMiniMap: true,
  showToolbar: true,
  showInspector: true,
};

/**
 * Non-default options as `name=value` pairs, using the shared attribute / URL parameter names.
 */
function optionPairs(options: EmbedSnippetOptions): Array<[string, string]> {
  const pairs: Array<[string, string]> = [];
  if (options.labelSize !== DEFAULT_EMBED_OPTIONS.labelSize) pairs.push(['label-size', options.labelSize]);
  if (options.wireStyle !== 'auto') pairs.push(['wire-style', options.wireStyle]);
  if (!options.showMiniMap) pairs.push(['minimap', 'false']);
  if (!options.showToolbar) pairs.push(['toolbar', 'false']);
  if (!options.showInspector) pairs.push(['inspector', 'false']);
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
    ...optionPairs(options).map(([name, value]) => `${name}="${value}"`),
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
  if (!options.showMiniMap) props.push('showMiniMap={false}');
  if (!options.showToolbar) props.push('showToolbar={false}');
  if (!options.showInspector) props.push('showInspector={false}');
  const fileName = options.jsonUrl.split('/').pop() || 'my-network.json';
  return [
    `import { HoudiniNetwork } from 'wop-houdini-network-viewer';`,
    `import 'wop-houdini-network-viewer/style.css';`,
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
 * @param pageUrl URL of the hosted playground (for example `https://user.github.io/wop-houdini-network-viewer/`).
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
 * `<iframe>` snippet for sites that only allow iframes (ArtStation, Notion, some site builders).
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
