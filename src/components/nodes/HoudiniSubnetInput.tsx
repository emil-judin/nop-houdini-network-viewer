import React, { useMemo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { HoudiniSubnetInputFlowNodeData } from '../../schema/converter';
import { LABEL_SIZE_STYLES } from './labelSizeStyles';
import {
  getConnectorShapePosition,
  pointsToSvgPath,
  getNodeShapeDef,
  SHAPE_SVG_HEIGHT,
  SHAPE_SVG_WIDTH,
} from './shapes/nodeShapes';

/**
 * Body fill of a Subnetwork Indirect Input, sampled from the Houdini 22 Network Editor.
 */
const SUBNET_INPUT_FILL = '#b9b9b9';

/**
 * View-only Subnetwork Indirect Input connector node (`hou.SubnetIndirectInput`)
 * displayed at the top of a subnetwork or HDA graph (`Subnetwork Input #1..4`).
 *
 * Like Houdini, the input number sits centered in the shape at node-name size, and the floating
 * label shows `Sub-Network Input #N` with the name of the node wired into the parent subnetwork
 * input (when known) on a second line.
 */
export const HoudiniSubnetInput: React.FC<NodeProps> = ({ data }) => {
  const {
    subnetInput,
    widthPx,
    heightPx,
    labelSize = 'medium',
  } = data as unknown as HoudiniSubnetInputFlowNodeData;

  const sizeClasses = LABEL_SIZE_STYLES[labelSize] ?? LABEL_SIZE_STYLES.medium;
  const shapeDef = useMemo(() => getNodeShapeDef('subnet_input'), []);
  const outlinePath = useMemo(() => pointsToSvgPath(shapeDef.outline, true), [shapeDef]);

  // Shape-space (`+Y` up, `0..0.3`) to pixel conversion within the node box
  const toPxY = (normY: number) => (0.3 - normY) * (heightPx / 0.3);

  // Center the digit inside the shape's icon box
  const iconBox = shapeDef.icon ?? [
    [0.38, 0.01],
    [0.62, 0.25],
  ];
  const digitCenterY = toPxY((iconBox[0][1] + iconBox[1][1]) / 2);

  // Connector below the bottom tip, at the shape's own output slot
  const [outNormX, outNormY] = getConnectorShapePosition(shapeDef.outputs, 0, 1, -0.155);

  // Label starts just right of the visible shape body (which ends at x = 0.9)
  const shapeRightPx = Math.max(...shapeDef.outline.map((pt) => pt[0])) * widthPx;
  const inputNumber = subnetInput.num + 1;

  return (
    <div
      style={{ width: `${widthPx}px`, height: `${heightPx}px` }}
      className="relative select-none pointer-events-none"
      title={`Sub-Network Input #${inputNumber}`}
    >
      <svg
        viewBox={`0 0 ${SHAPE_SVG_WIDTH} ${SHAPE_SVG_HEIGHT}`}
        className="w-full h-full overflow-visible block"
        preserveAspectRatio="none"
      >
        <path
          d={outlinePath}
          fill={SUBNET_INPUT_FILL}
          stroke="#262626"
          strokeWidth={1.0}
          strokeLinejoin="round"
        />
      </svg>

      <span
        style={{ left: '50%', top: `${digitCenterY}px` }}
        className={`absolute -translate-x-1/2 -translate-y-1/2 leading-none font-normal text-[#1e1e1e] ${sizeClasses.nameText}`}
      >
        {inputNumber}
      </span>

      <Handle
        id="out-0"
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        style={{
          left: `${outNormX * widthPx}px`,
          top: `${toPxY(outNormY)}px`,
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '10px',
          height: '10px',
          minWidth: '10px',
          minHeight: '10px',
          borderRadius: '9999px',
          backgroundColor: SUBNET_INPUT_FILL,
          border: '1.2px solid #262626',
          boxSizing: 'border-box',
        }}
      />

      {/* Floating label: first line vertically aligned with the digit, parent input node name below */}
      <div
        style={{
          left: `${shapeRightPx + 12}px`,
          top: `${digitCenterY}px`,
          transform: 'translateY(-0.625em)',
        }}
        className={`absolute flex flex-col items-start whitespace-nowrap leading-tight text-[#dddddd] ${sizeClasses.nameText}`}
      >
        <span>Sub-Network Input #{inputNumber}</span>
        {subnetInput.inputName && <span>{subnetInput.inputName}</span>}
      </div>
    </div>
  );
};
