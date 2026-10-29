import React from 'react';
import { Download, Map as MapIcon, Maximize2, Minimize2 } from 'lucide-react';
import type { HoudiniNetworkDocument, HoudiniWireStyle } from '../../schema/types';
import { TOUCH_TARGET } from './touchTarget';

/**
 * Wire style choices with a tiny preview of each wire shape.
 */
const WIRE_STYLE_OPTIONS: Array<{ style: HoudiniWireStyle; label: string; glyph: string }> = [
  { style: 'default', label: 'Default wires (straight with rounded bends), Shift+S to toggle', glyph: 'M4 1V4.5L10 9.5V13' },
  { style: 'rounded', label: 'Rounded wires (horizontal runs with rounded corners), Shift+S to toggle', glyph: 'M3 1V3.5A2 2 0 0 0 5 5.5H8.5A2.5 2.5 0 0 1 11 8V13' },
];

/** Houdini 22 pane color, sampled from the Network Editor's path and menu rows. */
const PANE_BG = 'bg-[#383838]';

/**
 * Icon button of the tool row: a bare grey icon like Houdini's Network Editor tools, with the
 * blue-grey `#474e62` of Houdini's menu highlight when pressed or hovered.
 */
const toolButtonClass = (pressed = false) =>
  `flex items-center justify-center min-w-6 h-6 px-1 rounded-[3px] transition-colors cursor-pointer ${TOUCH_TARGET} ${
    pressed ? 'bg-[#474e62] text-white' : 'text-[#c0c0c0] hover:bg-[#474e62] hover:text-white'
  }`;

/** Thin separator between tool groups (Houdini's `#2d2d2d` divider). */
const ToolSeparator: React.FC = () => <span className="shrink-0 self-stretch w-px my-1 mx-1 bg-[#2d2d2d]" aria-hidden="true" />;

/**
 * Props for the viewer's top pane header (`ViewerToolbar`).
 */
export interface ViewerToolbarProps {
  /** Active network path (used for the downloaded JSON file name). */
  networkPath: string;
  /** Network path bar at the start of the row (normally a `<BreadcrumbBar />`). */
  pathBar: React.ReactNode;
  /** Number of operator nodes in the network on screen. */
  nodeCount: number;
  /** Current wire style (`default` or `rounded`). */
  wireStyle: HoudiniWireStyle;
  /** Callback when the user changes the wire style. */
  onChangeWireStyle: (style: HoudiniWireStyle) => void;
  /** Full normalized document for the debug download action. */
  document: HoudiniNetworkDocument;
  /** Whether to show the debug Download JSON button. Defaults to `false`. */
  showDebugActions?: boolean;
  /** Whether the network overview (minimap) is shown. */
  miniMapVisible: boolean;
  /** Shows or hides the network overview (also the `O` hotkey). */
  onToggleMiniMap: () => void;
  /** Whether to show the fullscreen button. Defaults to `true`. */
  showFullscreenButton?: boolean;
  /** Whether the viewer container is currently in fullscreen mode. */
  isFullscreen?: boolean;
  /** Callback to toggle fullscreen mode. */
  onToggleFullscreen?: () => void;
}

/**
 * Docked pane header of Houdini's Network Editor in one row, so the canvas keeps as much height as
 * possible: the network path bar fills the row, then the node count (hidden in narrow viewers) and
 * the view tools (wire style, overview, optional Download JSON, fullscreen). Fitting the network
 * has no button: H, or a double-click or double-tap on the empty canvas.
 */
export const ViewerToolbar: React.FC<ViewerToolbarProps> = ({
  networkPath,
  pathBar,
  nodeCount,
  wireStyle,
  onChangeWireStyle,
  document,
  showDebugActions = false,
  miniMapVisible,
  onToggleMiniMap,
  showFullscreenButton = true,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(document, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    const baseName = networkPath.split('/').filter(Boolean).pop() || 'houdini-network';
    link.href = url;
    link.download = `${baseName}.json`;
    // Attach the link and revoke the URL only after the browser has started the download
    // (revoking right after `click()` can cancel it in Safari and Firefox)
    window.document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className={`shrink-0 flex items-center gap-1 px-1 py-1 ${PANE_BG} border-b border-[#262626] select-none`}>
      {pathBar}

      {/* Node count (where Houdini has its menus, only where there is room), then the view tools */}
      <div role="toolbar" aria-label="View" className="shrink-0 flex items-center">
        <span className="hidden @md:inline px-1.5 text-[12px] text-[#b0b0b0] whitespace-nowrap">{nodeCount} nodes</span>

        <div className="flex items-center">
          {/* Wire Style Switcher (Houdini `default` / `rounded`) */}
          <div role="group" aria-label="Wire style" className="flex items-center gap-px" title="Wire Style">
            {WIRE_STYLE_OPTIONS.map(({ style, label, glyph }) => (
              <button
                key={style}
                type="button"
                onClick={() => onChangeWireStyle(style)}
                title={label}
                aria-label={label}
                aria-pressed={wireStyle === style}
                className={toolButtonClass(wireStyle === style)}
              >
                <svg viewBox="0 0 14 14" className="w-4 h-4" aria-hidden="true">
                  <path d={glyph} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>

          {/* The overview is never shown in narrow viewers, so its button is hidden there too */}
          <span className="hidden @md:flex items-center">
            <ToolSeparator />
            <button
              type="button"
              onClick={onToggleMiniMap}
              title={miniMapVisible ? 'Hide network overview (O)' : 'Show network overview (O)'}
              aria-label="Network overview"
              aria-pressed={miniMapVisible}
              className={toolButtonClass(miniMapVisible)}
            >
              <MapIcon className="w-4 h-4" aria-hidden="true" />
            </button>
          </span>

          {/* A debug tool nobody needs on a phone: narrow viewers keep the space for the path bar */}
          {showDebugActions && (
            <span className="hidden @md:flex items-center">
              <ToolSeparator />
              <button
                type="button"
                onClick={handleDownloadJson}
                title="Download Network .json File"
                aria-label="Download network JSON file"
                className={toolButtonClass()}
              >
                <Download className="w-4 h-4" aria-hidden="true" />
              </button>
            </span>
          )}

          {showFullscreenButton && onToggleFullscreen && (
            <>
              <ToolSeparator />
              <button
                type="button"
                onClick={onToggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Fullscreen'}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                className={toolButtonClass()}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-amber-400" aria-hidden="true" />
                ) : (
                  <Maximize2 className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
