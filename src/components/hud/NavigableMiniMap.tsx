import React, { useRef } from 'react';
import { MiniMap, useReactFlow, type Node } from '@xyflow/react';

/**
 * Props for `<NavigableMiniMap />`.
 */
export interface NavigableMiniMapProps {
  /** Minimap color of a node (the node's Houdini color). */
  nodeColor: (node: Node) => string;
}

/**
 * Minimap that navigates like Houdini's network overview: clicking (or tapping) a spot centers
 * the view there, and holding the button down makes the view follow the pointer. The wheel still
 * zooms. Hidden in narrow viewers (phones), where it would cover a large part of the network.
 */
export const NavigableMiniMap: React.FC<NavigableMiniMapProps> = ({ nodeColor }) => {
  const { setCenter, getZoom } = useReactFlow();
  // Screen -> network mapping, frozen while the button is held. React Flow re-fits the minimap
  // around the nodes and the view frame, so the mapping would otherwise shift under the pointer
  // after every move and the view would jitter.
  const screenToFlowRef = useRef<DOMMatrix | null>(null);

  /** Centers the view on the network position under the pointer. */
  const centerOnPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const matrix = screenToFlowRef.current;
    if (!matrix) return;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix);
    setCenter(point.x, point.y, { zoom: getZoom() });
  };

  const endDrag = () => {
    screenToFlowRef.current = null;
  };

  return (
    // The minimap panel is positioned by React Flow; its pointer events bubble up to this wrapper
    <div
      onPointerDown={(event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        if (!(event.target as Element).closest('.react-flow__minimap')) return;
        // The minimap SVG's viewBox is in network (flow) coordinates
        const svg = event.currentTarget.querySelector<SVGSVGElement>('svg.react-flow__minimap-svg');
        const matrix = svg?.getScreenCTM();
        if (!matrix) return;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        screenToFlowRef.current = matrix.inverse();
        centerOnPointer(event);
      }}
      onPointerMove={centerOnPointer}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <MiniMap
        className="hidden! @md:block! touch-none cursor-crosshair"
        nodeColor={nodeColor}
        maskColor="rgba(18, 18, 18, 0.72)"
        style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #383838',
          borderRadius: '4px',
        }}
        ariaLabel="Network overview: click or drag to move the view"
        zoomable
      />
    </div>
  );
};
