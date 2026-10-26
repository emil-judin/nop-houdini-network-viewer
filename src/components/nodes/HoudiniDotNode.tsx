import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { HOUDINI_DOT_RADIUS_PX, type HoudiniDotFlowNodeData } from '../../schema/converter';

/**
 * Invisible handle sitting at the dot center, so wires meet the dot from any direction.
 */
const CENTER_HANDLE_STYLE: React.CSSProperties = {
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '2px',
  height: '2px',
  minWidth: '2px',
  minHeight: '2px',
  opacity: 0,
  border: 'none',
};

/**
 * View-only Houdini wire routing dot (`hou.NetworkDot`): a flat light grey disc (`#b9b9b9`),
 * drawn above the wires that pass through its center.
 */
export const HoudiniDotNode: React.FC<NodeProps> = ({ data }) => {
  const { dot } = data as unknown as HoudiniDotFlowNodeData;
  const diameter = HOUDINI_DOT_RADIUS_PX * 2;

  return (
    <div
      style={{ width: `${diameter}px`, height: `${diameter}px` }}
      title={dot.name}
      className="relative rounded-full bg-[#b9b9b9] pointer-events-none"
    >
      <Handle id="in-0" type="target" position={Position.Top} isConnectable={false} style={CENTER_HANDLE_STYLE} />
      <Handle id="out-0" type="source" position={Position.Bottom} isConnectable={false} style={CENTER_HANDLE_STYLE} />
    </div>
  );
};
