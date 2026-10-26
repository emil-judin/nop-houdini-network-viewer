import React from 'react';
import type { NodeProps } from '@xyflow/react';
import {
  houdiniRgbScaledToCss,
  houdiniRgbToCss,
  MINIMIZED_STICKY_HEIGHT_PX,
  type HoudiniStickyFlowNodeData,
} from '../../schema/converter';
import type { HoudiniRgbColor } from '../../schema/types';

/**
 * Houdini's default Sticky Note color.
 */
const DEFAULT_STICKY_COLOR: HoudiniRgbColor = [1.0, 0.969, 0.525];

/**
 * View-only Houdini Sticky Note (`hou.StickyNote`) rendered on the network canvas.
 *
 * Matches the Houdini 22 Network Editor: opaque tones derived from the note color (header about 91%,
 * body about 74%, light rims), a black minus button in the header, rounded corners, and the note
 * text in the note's text color (near-black by default).
 */
export const HoudiniStickyNote: React.FC<NodeProps> = ({ data }) => {
  const { sticky, widthPx, heightPx } = data as unknown as HoudiniStickyFlowNodeData;

  const color = sticky.color && sticky.color.length >= 3 ? sticky.color : DEFAULT_STICKY_COLOR;
  const isMinimized = Boolean(sticky.minimized);
  const drawBackground = sticky.drawBackground !== false;
  const textColor = sticky.textColor ? houdiniRgbToCss(sticky.textColor) : '#111111';

  return (
    <div
      style={{
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        backgroundColor: drawBackground ? houdiniRgbScaledToCss(color, 0.74) : 'transparent',
        borderColor: drawBackground ? houdiniRgbScaledToCss(color, 0.83) : 'transparent',
      }}
      className="rounded-md border select-none pointer-events-none flex flex-col overflow-hidden"
    >
      {drawBackground && (
        <div
          style={{
            height: `${MINIMIZED_STICKY_HEIGHT_PX}px`,
            backgroundColor: houdiniRgbScaledToCss(color, 0.915),
            borderTopColor: houdiniRgbScaledToCss(color, 0.96),
            borderBottomColor: houdiniRgbScaledToCss(color, 1.0),
          }}
          className="relative shrink-0 border-t border-b"
          aria-hidden="true"
        >
          <span className="absolute left-[7px] top-1/2 -translate-y-1/2 w-3 h-[2px] bg-black" />
          {isMinimized && <span className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[2px] h-3 bg-black" />}
        </div>
      )}
      {!isMinimized && (
        <div
          style={{ color: textColor }}
          className="px-1.5 pt-1 text-[20px] leading-tight whitespace-pre-wrap overflow-hidden font-sans"
        >
          {sticky.text}
        </div>
      )}
    </div>
  );
};
