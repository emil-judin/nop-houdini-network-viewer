import React from 'react';
import type { NodeProps } from '@xyflow/react';
import { houdiniRgbToCss, houdiniRgbToRgbaCss, type HoudiniBlockFlowNodeData } from '../../schema/converter';

/**
 * Opacity of the tinted fill, sampled from a Houdini 22 screenshot (the default For-Each orange over
 * the canvas).
 */
const FILL_OPACITY = 0.14;

/**
 * View-only underlay Houdini draws behind a For-Each or Compile block: a rounded outline around the
 * block's begin, end and in-between nodes, in the Block End node's color, with a faint tinted fill.
 * Purely decorative: it never takes clicks, focus or selection.
 */
export const HoudiniBlockUnderlay: React.FC<NodeProps> = ({ data }) => {
  const { outlinePath, widthPx, heightPx, color } = data as unknown as HoudiniBlockFlowNodeData;

  return (
    <svg
      width={widthPx}
      height={heightPx}
      viewBox={`0 0 ${widthPx} ${heightPx}`}
      className="block overflow-visible pointer-events-none select-none"
      aria-hidden="true"
    >
      <path
        d={outlinePath}
        fill={houdiniRgbToRgbaCss(color, FILL_OPACITY)}
        stroke={houdiniRgbToCss(color, 'rgb(191, 102, 0)')}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};
