import React, { useId } from 'react';
import { Position, useInternalNode, type Handle, type NodeProps } from '@xyflow/react';
import { OUTSIDE_STUB_LENGTH_PX, type HoudiniOutsideStubsFlowNodeData } from '../../schema/convertGraph';
import { DOTTED_WIRE_DASHES } from '../edges/HoudiniWire';
import { getHoudiniWirePath } from '../edges/wirePaths';
import { WIRE_COLOR } from '../theme';

/** How far a stub aims when the file has no position for the outside item: straight up or down. */
const STRAIGHT_FAR_PX = 200;

/** Where React Flow attaches a wire to `handle` of a node at `origin`: the middle of the handle's outer side. */
function wireEnd(handle: Handle, origin: { x: number; y: number }): { x: number; y: number } {
  const dx = handle.position === Position.Left ? 0 : handle.position === Position.Right ? handle.width : handle.width / 2;
  const dy = handle.position === Position.Top ? 0 : handle.position === Position.Bottom ? handle.height : handle.height / 2;
  return { x: origin.x + handle.x + dx, y: origin.y + handle.y + dy };
}

/**
 * Stubs for the wires between one node or dot of an exported selection and items outside it (schema
 * 1.5.0, decision 0015). Each stub is the start of the real wire, in the current wire style, toward
 * where the outside item is: solid or dotted like the wire itself, fading out within `OUTSIDE_STUB_LENGTH_PX`. They name nothing,
 * count nothing and do nothing when clicked. Drawn by a node of their own under the wires (`stubs:`
 * nodes from the converter), which also gives Fit their extent. Not part of Houdini's look.
 */
export const HoudiniOutsideStubs: React.FC<NodeProps> = ({ data, positionAbsoluteX, positionAbsoluteY }) => {
  const { item, itemIsDot, stubs, wireStyle } = data as HoudiniOutsideStubsFlowNodeData;
  const internal = useInternalNode(item);
  // React's IDs contain colons, which `url(#...)` does not take everywhere
  const maskId = `stubs${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const bounds = internal?.internals.handleBounds;
  const origin = internal?.internals.positionAbsolute;
  if (!bounds || !origin) return null;

  const paths = stubs.flatMap((stub, index) => {
    const handles = stub.direction === 'in' ? bounds.target : bounds.source;
    const handle = handles?.find((h) => h.id === stub.handle);
    if (!handle) return [];
    const near = wireEnd(handle, origin);
    const far = stub.far ?? { x: near.x, y: near.y + (stub.direction === 'in' ? -STRAIGHT_FAR_PX : STRAIGHT_FAR_PX) };
    const d =
      stub.direction === 'in'
        ? getHoudiniWirePath(wireStyle, far.x, far.y, near.x, near.y, stub.farIsDot, itemIsDot)
        : getHoudiniWirePath(wireStyle, near.x, near.y, far.x, far.y, itemIsDot, stub.farIsDot);
    return [{ key: index, d, near, dotted: stub.dotted }];
  });
  if (paths.length === 0) return null;

  const r = OUTSIDE_STUB_LENGTH_PX;
  return (
    <svg
      className="absolute left-0 top-0 w-px h-px overflow-visible pointer-events-none"
      aria-hidden="true"
      data-testid="outside-wire-stubs"
    >
      {/* Paths are in flow coordinates; this node sits at its own position */}
      <g transform={`translate(${-positionAbsoluteX} ${-positionAbsoluteY})`}>
        <defs>
          {paths.map(({ key, near }) => (
            <React.Fragment key={key}>
              <radialGradient id={`${maskId}-fade-${key}`} gradientUnits="userSpaceOnUse" cx={near.x} cy={near.y} r={r}>
                <stop offset="0.35" stopColor="#fff" stopOpacity={1} />
                <stop offset="1" stopColor="#fff" stopOpacity={0} />
              </radialGradient>
              <mask id={`${maskId}-mask-${key}`} maskUnits="userSpaceOnUse" x={near.x - r} y={near.y - r} width={2 * r} height={2 * r}>
                <circle cx={near.x} cy={near.y} r={r} fill={`url(#${maskId}-fade-${key})`} />
              </mask>
            </React.Fragment>
          ))}
        </defs>
        {paths.map(({ key, d, dotted }) => (
          <path
            key={key}
            d={d}
            fill="none"
            stroke={WIRE_COLOR}
            strokeWidth={1.3}
            strokeDasharray={dotted ? DOTTED_WIRE_DASHES : undefined}
            mask={`url(#${maskId}-mask-${key})`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
};
