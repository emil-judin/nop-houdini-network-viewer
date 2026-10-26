import React from 'react';
import type { NodeProps } from '@xyflow/react';
import {
  houdiniRgbLuminance,
  houdiniRgbScaledToCss,
  houdiniRgbToRgbaCss,
  MINIMIZED_BOX_HEIGHT_PX,
  type HoudiniNetBoxFlowNodeData,
} from '../../schema/converter';
import type { HoudiniRgbColor } from '../../schema/types';

/**
 * Houdini's default Network Box color.
 */
const DEFAULT_BOX_COLOR: HoudiniRgbColor = [0.52, 0.52, 0.52];

/**
 * View-only Houdini Network Box (`hou.NetworkBox`) rendered behind operator nodes.
 *
 * Matches the Houdini 22 Network Editor at rest (measured with the default `0.52` grey): a flat header
 * in the box color darkened to about 86% with a light top rim, a black minus bar (plus when minimized)
 * with a faint light line under it, a thin separator, and the comment as a black title; a body in the
 * box color at 50% opacity over the grid; rounded corners and no dark border.
 */
export const HoudiniNetBox: React.FC<NodeProps> = ({ data }) => {
  const { box, widthPx, heightPx } = data as unknown as HoudiniNetBoxFlowNodeData;

  const color = box.color && box.color.length >= 3 ? box.color : DEFAULT_BOX_COLOR;
  const isMinimized = Boolean(box.minimized);
  const titleColor = houdiniRgbLuminance(color) * 0.86 > 0.25 ? '#000000' : '#f0f0f0';

  return (
    <div
      style={{
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        backgroundColor: isMinimized ? 'transparent' : houdiniRgbToRgbaCss(color, 0.5),
      }}
      className="rounded-md overflow-hidden select-none pointer-events-none flex flex-col"
    >
      <div
        style={{
          height: `${MINIMIZED_BOX_HEIGHT_PX}px`,
          backgroundColor: houdiniRgbScaledToCss(color, 0.86),
          borderTopColor: houdiniRgbScaledToCss(color, 0.93),
          color: titleColor,
        }}
        className={`relative shrink-0 flex items-center border-t ${isMinimized ? 'rounded-md' : 'rounded-t-md'}`}
      >
        {/* Minimize (minus) or restore (plus) glyph with Houdini's faint light underline */}
        <span
          className="absolute left-[10px] top-1/2 -translate-y-1/2 w-[15px] h-[2px] bg-black shadow-[0_1px_0_rgba(255,255,255,0.45)]"
          aria-hidden="true"
        />
        {isMinimized && (
          <span className="absolute left-[16.5px] top-1/2 -translate-y-1/2 w-[2px] h-[15px] bg-black" aria-hidden="true" />
        )}
        <span className="absolute left-[29px] top-[5px] bottom-[5px] w-px bg-white/[0.06]" aria-hidden="true" />
        <span className="pl-[36px] pr-2 text-[18px] leading-none truncate">{box.comment || box.name}</span>
      </div>
    </div>
  );
};
