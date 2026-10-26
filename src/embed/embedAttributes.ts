import type { HoudiniLabelSize } from '../schema/converter';
import type { HoudiniWireStyle } from '../schema/types';

/**
 * Viewer options that can be set from HTML: as attributes of the `<houdini-network>` web
 * component, or as URL parameters of the `?embed=true` iframe page. Both use the same names.
 */
export interface EmbedViewerOptions {
  /** `label-size`: `small`, `medium` or `large`. */
  labelSize?: HoudiniLabelSize;
  /** `wire-style`: `default` or `rounded` (missing means the style exported with the network). */
  wireStyle?: HoudiniWireStyle;
  /** `minimap`: `false` hides the minimap. */
  showMiniMap?: boolean;
  /** `toolbar`: `false` hides the toolbar (path bar, fit, label size, wire style, fullscreen). */
  showToolbar?: boolean;
  /** `inspector`: `false` never opens the Parameter Inspector. */
  showInspector?: boolean;
  /** `debug-actions`: `true` shows the Copy/Download JSON buttons (hidden by default in embeds). */
  showDebugActions?: boolean;
  /** `fit-view`: `false` keeps the initial view instead of fitting the network. */
  fitView?: boolean;
}

/**
 * Attribute and URL parameter names understood by {@link parseEmbedOptions}.
 */
export const EMBED_OPTION_NAMES = [
  'label-size',
  'wire-style',
  'minimap',
  'toolbar',
  'inspector',
  'debug-actions',
  'fit-view',
] as const;

/**
 * Reads an HTML boolean option: `"false"`, `"0"`, `"no"` and `"off"` mean false, any other
 * present value (including an empty attribute such as `<houdini-network minimap>`) means true.
 */
function readBoolean(value: string | null): boolean | undefined {
  if (value === null) return undefined;
  return !['false', '0', 'no', 'off'].includes(value.trim().toLowerCase());
}

/**
 * Parses embed viewer options from attribute or URL parameter values.
 * Unknown or invalid values are ignored so the viewer falls back to its defaults.
 *
 * @param read Returns the raw value of an option name, or `null` when it is not set
 *   (for example `(name) => element.getAttribute(name)` or `(name) => searchParams.get(name)`).
 */
export function parseEmbedOptions(read: (name: string) => string | null): EmbedViewerOptions {
  const options: EmbedViewerOptions = {};
  const labelSize = read('label-size');
  if (labelSize === 'small' || labelSize === 'medium' || labelSize === 'large') {
    options.labelSize = labelSize;
  }
  const wireStyle = read('wire-style');
  if (wireStyle === 'default' || wireStyle === 'rounded') {
    options.wireStyle = wireStyle;
  }
  const flags: Array<[string, keyof EmbedViewerOptions]> = [
    ['minimap', 'showMiniMap'],
    ['toolbar', 'showToolbar'],
    ['inspector', 'showInspector'],
    ['debug-actions', 'showDebugActions'],
    ['fit-view', 'fitView'],
  ];
  for (const [name, key] of flags) {
    const value = readBoolean(read(name));
    if (value !== undefined) {
      (options as Record<string, unknown>)[key] = value;
    }
  }
  return options;
}
