import type { TouchPanMode } from '../components/hooks/useTwoFingerPan';
import type { HotkeyMode } from '../components/hooks/useViewerHotkeys';
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
  /** `minimap`: `true` (or an empty attribute) opens the network overview at the start; closed by default. */
  showMiniMap?: boolean;
  /** `focus-node`: name of a node in the top network level to frame at the start. */
  focusNode?: string;
  /** `toolbar`: `false` hides the pane header (path bar, wire style, overview, fullscreen). */
  showToolbar?: boolean;
  /** `fullscreen`: `false` hides the fullscreen button. */
  showFullscreenButton?: boolean;
  /** `touch-pan`: `two-fingers` (default) or `one-finger` (see `HoudiniNetworkProps.touchPan`). */
  touchPan?: TouchPanMode;
  /** `inspector`: `false` never opens the Parameter Inspector. */
  showInspector?: boolean;
  /** `debug-actions`: `true` shows the Download JSON button (hidden by default in embeds). */
  showDebugActions?: boolean;
  /** `fit-view`: `false` keeps the initial view instead of fitting the network. */
  fitView?: boolean;
  /** `hotkeys`: `focus` (default), `hover` or `off` (see `HoudiniNetworkProps.hotkeys`). */
  hotkeys?: HotkeyMode;
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
  'hotkeys',
  'focus-node',
  'fullscreen',
  'touch-pan',
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
  const hotkeys = read('hotkeys');
  if (hotkeys === 'focus' || hotkeys === 'hover' || hotkeys === 'off') {
    options.hotkeys = hotkeys;
  }
  const touchPan = read('touch-pan');
  if (touchPan === 'two-fingers' || touchPan === 'one-finger') {
    options.touchPan = touchPan;
  }
  // A Houdini node name; the viewer ignores names that are not in the network
  const focusNode = read('focus-node')?.trim();
  if (focusNode) {
    options.focusNode = focusNode;
  }
  const flags: Array<[string, keyof EmbedViewerOptions]> = [
    ['minimap', 'showMiniMap'],
    ['toolbar', 'showToolbar'],
    ['fullscreen', 'showFullscreenButton'],
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
