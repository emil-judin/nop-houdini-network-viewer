import React, { useMemo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { houdiniRgbToCss, type HoudiniSopFlowNodeData } from '../../schema/converter';
import { parseOperatorType } from '../../schema/operatorType';
import type { HoudiniRgbColor } from '../../schema/types';
import { CANVAS_RGB } from '../theme';
import { OperatorSvgIcon } from './icons/OperatorSvgIcon';
import { svgToDataUri } from './icons/svgDataUri';
import { LABEL_SIZE_STYLES } from './labelSizeStyles';
import {
  getConnectorShapePosition,
  getFlagEdgePaths,
  getMultiInputBarSvgPath,
  getNodeShapeDef,
  pointsToSvgPath,
  SHAPE_SVG_HEIGHT,
  SHAPE_SVG_WIDTH,
} from './shapes/nodeShapes';

/**
 * Small grey padlock badge displayed below the node name in Houdini 22 for locked HDAs.
 */
const HdaLockBadge: React.FC = () => (
  <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 text-[#7a8282] mt-0.5 shrink-0" fill="currentColor" role="img">
    <title>Locked digital asset</title>
    <path d="M4.5 5.5V4a2.5 2.5 0 0 1 5 0v1.5h.75c.69 0 1.25.56 1.25 1.25v4.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-4.5c0-.69.56-1.25 1.25-1.25H4.5zm1.5-1.5v1.5h2V4a1 1 0 0 0-2 0z" />
  </svg>
);

/**
 * Red open padlock displayed below the node name in Houdini 22 for unlocked (editable) HDAs.
 * Color sampled from a Houdini 22 screenshot.
 */
const HdaUnlockedBadge: React.FC = () => (
  <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 text-[#de717b] mt-0.5 shrink-0" fill="currentColor" role="img">
    <title>Unlocked digital asset (editable)</title>
    {/* Same body as the locked padlock, with the shackle opened to the right */}
    <path d="M3.75 6.5h6.5c.69 0 1.25.56 1.25 1.25v3.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-3.5c0-.69.56-1.25 1.25-1.25z" />
    <path d="M7 6.5V3.75a2.5 2.5 0 0 1 5 0V5h-1.5V3.75a1 1 0 0 0-2 0V6.5z" />
  </svg>
);

/**
 * Subnetwork badge below the node name, in the same small grey style as the padlock badge:
 * an arrow entering a box, meaning "this node has a network inside that you can dive into".
 */
const SubnetBadge: React.FC = () => (
  <svg
    viewBox="0 0 14 14"
    className="w-3.5 h-3.5 text-[#7a8282] mt-0.5 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
  >
    <title>Subnetwork: double-click to dive in</title>
    <path d="M5.5 2.5h5.25c.41 0 .75.34.75.75v7.5c0 .41-.34.75-.75.75H5.5" />
    <path d="M1.75 7h6.5M5.75 4.5 8.25 7l-2.5 2.5" />
  </svg>
);

/**
 * Houdini 22 selection outline color, drawn as a band outside the node's dark border.
 */
const SELECTION_OUTLINE_COLOR = '#ffd400';

/**
 * Houdini's default node color (`0.8` grey).
 */
const DEFAULT_NODE_COLOR: HoudiniRgbColor = [0.8, 0.8, 0.8];


/**
 * How much of the node color remains in a bypassed node's faded body.
 */
const BYPASS_BODY_STRENGTH = 0.16;

/**
 * Blends a node color over the canvas color, giving the opaque equivalent of drawing it at `strength` opacity.
 */
function blendOverCanvas(color: HoudiniRgbColor, strength: number): HoudiniRgbColor {
  // Bypassed node bodies are blended toward the Network Editor canvas color
  return [0, 1, 2].map((i) => CANVAS_RGB[i] + (color[i] - CANVAS_RGB[i]) * strength) as HoudiniRgbColor;
}

/**
 * Icon box used by Houdini's standard `rect` shape, for custom shapes that do not define one.
 */
const DEFAULT_ICON_BOX: [[number, number], [number, number]] = [
  [0.38, 0.03],
  [0.62, 0.27],
];

/**
 * View-only SideFX Houdini SOP node component rendered using Houdini's native vector shape definitions.
 *
 * Proportions Note:
 * Houdini's `NodeShapes/*.json` files define shapes in isotropic network coordinates (`X: [0..1.0]`,
 * `Y: [0..0.3]`, a 10:3 aspect ratio), while `node.size()` in Houdini 22 returns `[1.1296, 0.2824]`
 * (a 4:1 bounding box). We render the SVG in its true `100 x 30` (10:3) coordinate space with zero
 * viewBox padding so the node body is never vertically squashed.
 */
export const HoudiniSopNode: React.FC<NodeProps> = ({ data, selected }) => {
  const {
    node,
    iconSvg,
    customShapes,
    widthPx,
    heightPx,
    labelSize = 'medium',
  } = data as unknown as HoudiniSopFlowNodeData;

  const sizeClasses = LABEL_SIZE_STYLES[labelSize] ?? LABEL_SIZE_STYLES.medium;

  const shapeDef = useMemo(
    () => getNodeShapeDef(node.shape, customShapes),
    [node.shape, customShapes],
  );

  const mainOutlinePath = useMemo(() => pointsToSvgPath(shapeDef.outline, true), [shapeDef]);
  const bodyClipId = `wop-node-body-${React.useId().replace(/:/g, '')}`;

  const flagRegions = useMemo(() => {
    const flags = shapeDef.flags ?? {};
    return ['0', '1', '2', '3'].map((slot) => {
      const region = flags[slot];
      return {
        slot,
        fillPath: region?.outline ? pointsToSvgPath(region.outline, true) : '',
        edgePaths: getFlagEdgePaths(region),
      };
    });
  }, [shapeDef]);

  const multiInputBarPath = useMemo(() => getMultiInputBarSvgPath(shapeDef), [shapeDef]);

  const iconDataUri = useMemo(() => svgToDataUri(iconSvg), [iconSvg]);

  // Shape-space icon box `[[minX, minY], [maxX, maxY]]` (`+Y` up, `0..0.3`) converted to pixels
  const [[iconMinX, iconMinY], [iconMaxX, iconMaxY]] = shapeDef.icon ?? DEFAULT_ICON_BOX;
  const pxPerShapeY = heightPx / 0.3;
  const iconBoxStyle: React.CSSProperties = {
    left: `${iconMinX * widthPx}px`,
    top: `${(0.3 - iconMaxY) * pxPerShapeY}px`,
    width: `${(iconMaxX - iconMinX) * widthPx}px`,
    height: `${(iconMaxY - iconMinY) * pxPerShapeY}px`,
  };

  const isBypassed = Boolean(node.flags?.bypass);
  // Bypassed nodes use an opaque faded tone (the node color blended 16% over the canvas) so network
  // boxes and the selection outline never show through the body
  const fillCss = isBypassed
    ? houdiniRgbToCss(blendOverCanvas(node.color ?? DEFAULT_NODE_COLOR, BYPASS_BODY_STRENGTH))
    : houdiniRgbToCss(node.color, 'rgb(204, 204, 204)');
  const isLocked = Boolean(node.flags?.lock || node.flags?.softLock);
  const isTemplate = Boolean(node.flags?.template || node.flags?.selectableTemplate);
  const isDisplayOrRender = Boolean(node.flags?.display || node.flags?.render);

  const flagFillColor = (slot: string): string | null => {
    if (slot === '0' && isBypassed) return '#ead02a'; // Houdini Bypass Vibrant Yellow
    if (slot === '1' && isLocked) return '#d94040'; // Houdini Lock Red
    if (slot === '2' && isTemplate) return '#d45ca8'; // Houdini Template Pink
    if (slot === '3' && isDisplayOrRender) return '#3098e5'; // Houdini Display/Render Cyan-Blue
    return null;
  };

  const connectorBgColor = isBypassed ? '#565656' : '#cccccc';
  const connectorBorderColor = isBypassed ? '#242424' : '#262626';

  // Input connector count & layout
  const maxInputs = node.maxInputs ?? 1;
  const isMultiInputBar = maxInputs > 4;
  const discreteInputCount = isMultiInputBar ? 1 : Math.max(0, maxInputs);

  // Output connector count & layout
  const outputCount = Math.max(1, Math.min(4, node.maxOutputs ?? 1));

  // Show descriptive operator type above node name when the node has an explicit descriptive label
  // (e.g. Houdini shows "Attribute Wrangle" above both `primitivewrangle2` and `assign_ram_to_prims` because its underlying type is `attribwrangle`)
  // Compare against the base operator name (namespace and version stripped: `labs::thicken::1.0` -> `thicken`)
  const { baseType } = parseOperatorType(node.type);
  const isRenamedFromType =
    !node.name.toLowerCase().startsWith(baseType) &&
    node.label &&
    node.label.toLowerCase() !== node.name.toLowerCase();

  // Padlock under the name: the exported asset state (schema 1.2.0); older exports fall back to a
  // guess from the type name (namespaced and versioned types are usually assets)
  const hdaState =
    node.hdaState !== undefined ? node.hdaState : node.type.includes('::') ? ('locked' as const) : null;

  return (
    <div
      style={{ width: `${widthPx}px`, height: `${heightPx}px` }}
      className="relative select-none group cursor-pointer"
    >
      {/* Top Input Connectors */}
      {isMultiInputBar ? (
        Array.from({ length: 16 }).map((_, idx) => {
          // Distribute handles along the curved multi-input bar so incoming wires fan out naturally
          const normX = 0.24 + (idx / 15) * 0.52;
          const [, normY] = getConnectorShapePosition(shapeDef.inputs, idx, 16, 0.39);
          const leftPx = normX * widthPx;
          const centerYPx = (0.3 - normY) * (heightPx / 0.3);

          return (
            <Handle
              key={`in-multi-${idx}`}
              id={`in-multi-${idx}`}
              type="target"
              position={Position.Top}
              isConnectable={false}
              style={{
                left: `${leftPx}px`,
                top: `${centerYPx}px`,
                transform: 'translate(-50%, -50%)',
                width: '4px',
                height: '4px',
                opacity: 0,
                border: 'none',
                pointerEvents: 'none',
              }}
            />
          );
        })
      ) : (
        Array.from({ length: discreteInputCount }).map((_, idx) => {
          const [normX, normY] = getConnectorShapePosition(
            shapeDef.inputs,
            idx,
            discreteInputCount,
            0.385,
          );
          const leftPx = normX * widthPx;
          const centerYPx = (0.3 - normY) * (heightPx / 0.3);

          return (
            <Handle
              key={`in-${idx}`}
              id={`in-${idx}`}
              type="target"
              position={Position.Top}
              isConnectable={false}
              title={node.inputLabels?.[idx] ?? `Input ${idx + 1}`}
              style={{
                left: `${leftPx}px`,
                top: `${centerYPx}px`,
                transform: 'translate(-50%, -50%)',
                width: '10px',
                height: '10px',
                minWidth: '10px',
                minHeight: '10px',
                borderRadius: '9999px',
                backgroundColor: connectorBgColor,
                border: `1.2px solid ${connectorBorderColor}`,
                boxSizing: 'border-box',
              }}
            />
          );
        })
      )}

      {/* Node Body SVG (Isotropic 100 x 30 Houdini NodeShapes geometry + slanted flag strips) */}
      <svg
        viewBox={`0 0 ${SHAPE_SVG_WIDTH} ${SHAPE_SVG_HEIGHT}`}
        className="w-full h-full overflow-visible block pointer-events-none"
        preserveAspectRatio="none"
      >
        {/* Curved Multi-Input Collector Pill Bar (for Merge / Switch nodes with maxInputs > 4) */}
        {isMultiInputBar && (
          <g>
            <path
              d={multiInputBarPath}
              fill="none"
              stroke={connectorBorderColor}
              strokeWidth={10.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={multiInputBarPath}
              fill="none"
              stroke={connectorBgColor}
              strokeWidth={8.0}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Selection Outline: drawn under the fill so only the outer ~2px band stays visible */}
        {selected && (
          <path
            d={mainOutlinePath}
            fill="none"
            stroke={SELECTION_OUTLINE_COLOR}
            strokeWidth={5}
            strokeLinejoin="round"
          />
        )}

        <defs>
          <clipPath id={bodyClipId}>
            <path d={mainOutlinePath} />
          </clipPath>
        </defs>

        {/* Main Node Shape Fill */}
        <path d={mainOutlinePath} fill={fillCss} />

        {/* 4 Slanted Flag Regions & Separator Lines, clipped to the body so they never spill past its edge */}
        <g clipPath={`url(#${bodyClipId})`}>
          {flagRegions.map(({ slot, fillPath, edgePaths }) => {
            const activeColor = flagFillColor(slot);
            return (
              <g key={slot}>
                {activeColor && fillPath && (
                  <path d={fillPath} fill={activeColor} fillOpacity={1} />
                )}
                {edgePaths.map((ep, idx) => (
                  <path
                    key={idx}
                    d={ep}
                    fill="none"
                    stroke={isBypassed ? '#707070' : '#555555'}
                    strokeWidth={0.85}
                    strokeOpacity={0.75}
                  />
                ))}
              </g>
            );
          })}
        </g>

        {/* Main Node Border: drawn last so the flag fills never cover it */}
        <path
          d={mainOutlinePath}
          fill="none"
          stroke={selected ? '#0a0a0a' : isBypassed ? '#686868' : '#262626'}
          strokeWidth={1.0}
          strokeLinejoin="round"
        />
      </svg>

      {/* Operator Icon, centered in the shape's own icon box like Houdini (raised in `chevron_up`, lowered in `chevron_down`) */}
      <div
        style={iconBoxStyle}
        className={`absolute flex items-center justify-center pointer-events-none ${
          isBypassed ? 'opacity-65 brightness-75' : ''
        }`}
      >
        {iconDataUri ? (
          <img
            src={iconDataUri}
            alt={node.type}
            className="w-[22px] h-[22px] object-contain drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.4)]"
            draggable={false}
          />
        ) : (
          <OperatorSvgIcon
            type={node.type}
            icon={node.icon}
            isSubnetwork={node.isSubnetwork}
          />
        )}
      </div>

      {/* Bottom Output Connectors */}
      {Array.from({ length: outputCount }).map((_, idx) => {
        const [normX, normY] = getConnectorShapePosition(
          shapeDef.outputs,
          idx,
          outputCount,
          -0.085,
        );
        const leftPx = normX * widthPx;
        const centerYPx = (0.3 - normY) * (heightPx / 0.3);

        return (
          <Handle
            key={`out-${idx}`}
            id={`out-${idx}`}
            type="source"
            position={Position.Bottom}
            isConnectable={false}
            title={node.outputLabels?.[idx] ?? `Output ${idx + 1}`}
            style={{
              left: `${leftPx}px`,
              top: `${centerYPx}px`,
              bottom: 'auto',
              transform: 'translate(-50%, -50%)',
              width: '10px',
              height: '10px',
              minWidth: '10px',
              minHeight: '10px',
              borderRadius: '9999px',
              backgroundColor: connectorBgColor,
              border: `1.2px solid ${connectorBorderColor}`,
              boxSizing: 'border-box',
            }}
          />
        );
      })}

      {/* Floating Right-Side Node Name, Descriptive Type Label & Lock Badge */}
      <div
        style={{ left: `${widthPx + 9}px` }}
        className="absolute top-1/2 -translate-y-1/2 flex flex-col items-start whitespace-nowrap pointer-events-none leading-none"
      >
        {isRenamedFromType && (
          <span
            className={`${sizeClasses.typeText} text-[#8c8c8c] font-normal tracking-normal mb-0.5`}
          >
            {node.label}
          </span>
        )}
        <span
          className={`${sizeClasses.nameText} font-normal tracking-normal leading-tight ${
            isBypassed ? 'text-[#727272]' : 'text-[#dddddd]'
          }`}
        >
          {node.name}
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          {hdaState === 'locked' && <HdaLockBadge />}
          {hdaState === 'unlocked' && <HdaUnlockedBadge />}
          {node.isSubnetwork && node.children && <SubnetBadge />}
        </div>
        {node.comment && node.showComment && (
          <span
            className={`${sizeClasses.commentText} text-[#7ec4cf] mt-0.5 max-w-[240px] truncate`}
          >
            {node.comment}
          </span>
        )}
      </div>
    </div>
  );
};

