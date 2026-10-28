import React from 'react';
import { BaseEdge, type EdgeProps } from '@xyflow/react';
import type { HoudiniWireFlowEdgeData } from '../../schema/converter';
import { getHoudiniWirePath } from './wirePaths';

/**
 * Houdini 22 default wire color (sampled from the Network Editor).
 */
const WIRE_COLOR = '#7082b8';

/**
 * Houdini 22 wire color for wires attached to the selected node (sampled from the Network Editor).
 */
const SELECTED_NODE_WIRE_COLOR = '#a8b36f';

/**
 * Dot pattern of a dotted wire in screen pixels: short dots every 4px (Houdini 22 screenshot of the
 * Copy to Points target points input).
 */
const DOTTED_WIRE_DASHES = '1.5 2.5';

/**
 * Custom Houdini wire edge component (`hou.NodeConnection`).
 *
 * Matches the Houdini 22 Network Editor: a thin uncased blue-grey line (`#7082b8`) that keeps the
 * same on-screen width at every zoom level, olive-yellow (`#a8b36f`) while it belongs to the selected
 * node, and drawn in Houdini's `default` (straight with rounded bends) or `rounded` (horizontal runs with rounded corners) style.
 * The wire into the target points input of Copy to Points is dotted.
 */
export const HoudiniWire: React.FC<EdgeProps> = ({ id, sourceX, sourceY, targetX, targetY, data }) => {
  const wireData = data as HoudiniWireFlowEdgeData | undefined;
  const edgePath = getHoudiniWirePath(
    wireData?.wireStyle ?? 'default',
    sourceX,
    sourceY,
    targetX,
    targetY,
    wireData?.sourceIsDot,
    wireData?.targetIsDot,
  );

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{
        stroke: wireData?.highlighted ? SELECTED_NODE_WIRE_COLOR : WIRE_COLOR,
        strokeWidth: 1.3,
        strokeDasharray: wireData?.dotted ? DOTTED_WIRE_DASHES : undefined,
        vectorEffect: 'non-scaling-stroke',
      }}
    />
  );
};
