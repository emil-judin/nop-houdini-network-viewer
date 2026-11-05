import React from 'react';
import { Camera, Download, LoaderCircle, Map as MapIcon, Maximize2, Minimize2 } from 'lucide-react';
import type { HoudiniNetworkDocument, HoudiniWireStyle } from '../../schema/types';
import { downloadBlob } from '../downloadFile';
import { TOUCH_TARGET } from './touchTarget';
import { ViewSettingsMenu, WIRE_STYLE_OPTIONS, WireGlyph } from './ViewSettingsMenu';

/** Houdini 22 pane color, sampled from the Network Editor's path and menu rows. */
const PANE_BG = 'bg-[#383838]';

/**
 * Icon button of the tool row: a bare grey icon like Houdini's Network Editor tools, with the
 * blue-grey `#474e62` of Houdini's menu highlight when pressed or hovered.
 */
const toolButtonClass = (pressed = false) =>
  `flex items-center justify-center min-w-6 h-6 px-1 rounded-[3px] transition-colors cursor-pointer disabled:cursor-wait ${TOUCH_TARGET} ${
    pressed ? 'bg-[#474e62] text-white' : 'text-[#c0c0c0] hover:bg-[#474e62] hover:text-white'
  }`;

/** Thin separator between tool groups (Houdini's `#2d2d2d` divider). */
const ToolSeparator: React.FC = () => <span className="shrink-0 self-stretch w-px my-1 mx-1 bg-[#2d2d2d]" aria-hidden="true" />;

/** Where a screenshot is: none running, being drawn, or the last one failed (for a few seconds). */
export type ScreenshotState = 'idle' | 'busy' | 'failed';

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
  /** Saves what the network shows as a PNG; without it there is no screenshot button. */
  onScreenshot?: () => void;
  /** State of the screenshot button. Defaults to `idle`. */
  screenshotState?: ScreenshotState;
  /** Whether to show the fullscreen button. Defaults to `true`. */
  showFullscreenButton?: boolean;
  /** Whether the viewer container is currently in fullscreen mode. */
  isFullscreen?: boolean;
  /** Callback to toggle fullscreen mode. */
  onToggleFullscreen?: () => void;
}

/**
 * Docked pane header of Houdini's Network Editor in one row, so the canvas keeps as much height as
 * possible: the network path bar fills the row, then the view tools. Viewers with room (448px and
 * wider) show the node count, the two wire styles, the overview, the screenshot and the optional
 * Download JSON as their own buttons; narrow viewers (phones) put wire style, overview and
 * screenshot into one settings menu. Fullscreen is always its own button. Fitting the network has
 * no button: H, or a double-click or double-tap on the empty canvas.
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
  onScreenshot,
  screenshotState = 'idle',
  showFullscreenButton = true,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const handleDownloadJson = () => {
    const baseName = networkPath.split('/').filter(Boolean).pop() || 'houdini-network';
    downloadBlob(new Blob([JSON.stringify(document, null, 2)], { type: 'application/json' }), `${baseName}.json`);
  };

  const screenshotLabel = screenshotState === 'failed' ? 'Screenshot failed, try again' : 'Save screenshot';

  return (
    // `relative z-20`: the settings menu drops down over the canvas below the row
    <div className={`relative z-20 shrink-0 flex items-center gap-1 px-1 py-1 ${PANE_BG} border-b border-[#262626] select-none`}>
      {pathBar}

      <div role="toolbar" aria-label="View" className="shrink-0 flex items-center">
        {/* Wide viewers: node count (where Houdini has its menus) and every tool as its own button */}
        <div className="hidden @md:flex items-center">
          <span className="px-1.5 text-[12px] text-[#b0b0b0] whitespace-nowrap">{nodeCount} nodes</span>

          <div role="group" aria-label="Wire style" className="flex items-center gap-px">
            {WIRE_STYLE_OPTIONS.map(({ style, description, glyph }) => (
              <button
                key={style}
                type="button"
                onClick={() => onChangeWireStyle(style)}
                title={`${description}, Shift+S to toggle`}
                aria-label={description}
                aria-pressed={wireStyle === style}
                className={toolButtonClass(wireStyle === style)}
              >
                <WireGlyph glyph={glyph} />
              </button>
            ))}
          </div>

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

          {onScreenshot && (
            <>
              <ToolSeparator />
              <button
                type="button"
                onClick={onScreenshot}
                disabled={screenshotState === 'busy'}
                title={`${screenshotLabel} (PNG of what the network shows)`}
                aria-label={screenshotLabel}
                className={toolButtonClass()}
              >
                {screenshotState === 'busy' ? (
                  <LoaderCircle className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Camera className={`w-4 h-4 ${screenshotState === 'failed' ? 'text-[#e07070]' : ''}`} aria-hidden="true" />
                )}
              </button>
            </>
          )}

          {/* A debug tool nobody needs on a phone: narrow viewers keep the space for the path bar */}
          {showDebugActions && (
            <>
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
            </>
          )}
        </div>

        {/* Narrow viewers: one settings button with a drop-down menu keeps the row short */}
        <div className="flex @md:hidden items-center">
          <ViewSettingsMenu
            wireStyle={wireStyle}
            onChangeWireStyle={onChangeWireStyle}
            miniMapVisible={miniMapVisible}
            onToggleMiniMap={onToggleMiniMap}
            onScreenshot={onScreenshot}
            buttonClassName={toolButtonClass}
          />
        </div>

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
  );
};
