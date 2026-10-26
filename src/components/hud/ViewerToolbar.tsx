import React, { useState } from 'react';
import { Check, Copy, Download, Map as MapIcon, Maximize2, Minimize2, Scan, Type } from 'lucide-react';
import type { HoudiniLabelSize } from '../../schema/converter';
import type { HoudiniNetworkDocument, HoudiniWireStyle } from '../../schema/types';
import { TOUCH_TARGET } from './touchTarget';

/**
 * Wire style choices with a tiny preview of each wire shape.
 */
const WIRE_STYLE_OPTIONS: Array<{ style: HoudiniWireStyle; label: string; glyph: string }> = [
  { style: 'default', label: 'Default wires (straight with rounded bends), Shift+S to toggle', glyph: 'M4 1V4.5L10 9.5V13' },
  { style: 'rounded', label: 'Rounded wires (horizontal runs with rounded corners), Shift+S to toggle', glyph: 'M3 1V3.5A2 2 0 0 0 5 5.5H8.5A2.5 2.5 0 0 1 11 8V13' },
];

/**
 * Props for the top-right HUD overlay toolbar (`ViewerToolbar`).
 */
export interface ViewerToolbarProps {
  /** Active network path (used for the downloaded JSON file name). */
  networkPath: string;
  /** Network path bar shown on the left (normally a `<BreadcrumbBar />`). */
  pathBar: React.ReactNode;
  /** Current node label size preset (`small`, `medium`, `large`). */
  labelSize: HoudiniLabelSize;
  /** Callback when the user changes the label size preset. */
  onChangeLabelSize: (size: HoudiniLabelSize) => void;
  /** Current wire style (`default` or `rounded`). */
  wireStyle: HoudiniWireStyle;
  /** Callback when the user changes the wire style. */
  onChangeWireStyle: (style: HoudiniWireStyle) => void;
  /** Whether the viewer container is currently in fullscreen mode. */
  isFullscreen: boolean;
  /** Callback to toggle fullscreen mode. */
  onToggleFullscreen: () => void;
  /** Callback to fit all nodes into the viewport. */
  onFitView: () => void;
  /** Full normalized document for debugging copy/download actions. */
  document: HoudiniNetworkDocument;
  /** Whether to show debug copy/download JSON buttons. */
  showDebugActions?: boolean;
  /** Whether the network overview (minimap) is shown. */
  miniMapVisible: boolean;
  /** Shows or hides the network overview (also the `O` hotkey). */
  onToggleMiniMap: () => void;
}

/**
 * Floating HUD overlay toolbar providing Fit View, Label Size selector, Fullscreen toggle, and Debug JSON export controls.
 */
export const ViewerToolbar: React.FC<ViewerToolbarProps> = ({
  networkPath,
  pathBar,
  labelSize,
  onChangeLabelSize,
  wireStyle,
  onChangeWireStyle,
  isFullscreen,
  onToggleFullscreen,
  onFitView,
  document,
  showDebugActions = true,
  miniMapVisible,
  onToggleMiniMap,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(document, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API may be restricted in some insecure contexts
    }
  };

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
    <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-start justify-between pointer-events-none gap-2">
      {/* Left: Houdini network path bar (wraps on narrow screens) */}
      {pathBar}

      {/* Right: Action Buttons (wrap onto a second row on phones) */}
      <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-1 rounded bg-[#1b1b1b]/90 border border-[#3a3a3a] p-1 shadow-md backdrop-blur-xs">
        <button
          type="button"
          onClick={onFitView}
          title="Fit Network to View (H, or F to frame the selected node)"
          aria-label="Fit network to view"
          className={`flex items-center justify-center gap-1 px-2 py-1 rounded text-xs text-[#d4d4d4] hover:bg-[#323232] hover:text-white transition-colors cursor-pointer ${TOUCH_TARGET}`}
        >
          <Scan className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Fit</span>
        </button>

        {/* Label Font Size Preset Switcher (Small / Standard / Large) */}
        <div
          className="flex items-center rounded bg-[#252525] border border-[#383838] p-0.5 text-[11px]"
          title="Node Label Font Size"
        >
          <Type className="w-3 h-3 text-[#888888] mx-1 hidden sm:inline" />
          {(['small', 'medium', 'large'] as const).map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => onChangeLabelSize(sz)}
              className={`flex items-center justify-center px-1.5 py-0.5 rounded capitalize transition-colors cursor-pointer ${TOUCH_TARGET} ${
                labelSize === sz
                  ? 'bg-[#474e62] text-white font-bold'
                  : 'text-[#909090] hover:text-white'
              }`}
            >
              {sz === 'small' ? 'S' : sz === 'medium' ? 'M' : 'L'}
            </button>
          ))}
        </div>

        {/* Wire Style Switcher (Houdini `default` / `rounded`) */}
        <div className="flex items-center rounded bg-[#252525] border border-[#383838] p-0.5" title="Wire Style">
          {WIRE_STYLE_OPTIONS.map(({ style, label, glyph }) => (
            <button
              key={style}
              type="button"
              onClick={() => onChangeWireStyle(style)}
              title={label}
              aria-label={label}
              aria-pressed={wireStyle === style}
              className={`flex items-center justify-center px-1 py-0.5 rounded transition-colors cursor-pointer ${TOUCH_TARGET} ${
                wireStyle === style ? 'bg-[#474e62] text-white' : 'text-[#909090] hover:text-white'
              }`}
            >
              <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" aria-hidden="true">
                <path d={glyph} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onToggleMiniMap}
          title={miniMapVisible ? 'Hide network overview (O)' : 'Show network overview (O)'}
          aria-label="Network overview"
          aria-pressed={miniMapVisible}
          // The overview is never shown in narrow viewers, so the button is hidden there too
          className={`hidden @md:flex items-center justify-center gap-1 px-2 py-1 rounded text-xs transition-colors cursor-pointer ${TOUCH_TARGET} ${
            miniMapVisible ? 'bg-[#474e62] text-white' : 'text-[#909090] hover:bg-[#323232] hover:text-white'
          }`}
        >
          <MapIcon className="w-3.5 h-3.5" />
        </button>

        {showDebugActions && (
          <>
            <button
              type="button"
              onClick={handleCopyJson}
              title="Copy Network JSON to Clipboard"
              aria-label="Copy network JSON to clipboard"
              className={`flex items-center justify-center gap-1 px-2 py-1 rounded text-xs text-[#d4d4d4] hover:bg-[#323232] hover:text-white transition-colors cursor-pointer ${TOUCH_TARGET}`}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span className="hidden md:inline">{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadJson}
              title="Download Network .json File"
              aria-label="Download network JSON file"
              className={`flex items-center justify-center gap-1 px-2 py-1 rounded text-xs text-[#d4d4d4] hover:bg-[#323232] hover:text-white transition-colors cursor-pointer ${TOUCH_TARGET}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">JSON</span>
            </button>
          </>
        )}

        <button
          type="button"
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Maximize Viewer'}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Maximize viewer'}
          className={`flex items-center justify-center gap-1 px-2 py-1 rounded text-xs text-[#d4d4d4] hover:bg-[#323232] hover:text-white transition-colors cursor-pointer ${TOUCH_TARGET}`}
        >
          {isFullscreen ? (
            <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};

