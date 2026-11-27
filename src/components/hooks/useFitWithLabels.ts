import { useCallback, type RefObject } from 'react';
import { getViewportForBounds, useReactFlow, useStoreApi } from '@xyflow/react';

/**
 * Marks what a node draws outside its box that a fit must frame too: the name, type label and
 * badges to the right of operator nodes and subnetwork inputs. React Flow frames node boxes only,
 * so a node at the right edge of the view lost its name.
 */
export const FIT_EXTENT_ATTRIBUTE = 'data-nop-fit-extent';

export interface FitWithLabelsOptions {
  /** The nodes to frame; all visible nodes when left out. */
  nodes?: { id: string }[];
  /** Like React Flow's `fitView` padding: a share of the view kept free around the bounds. */
  padding: number;
  maxZoom?: number;
  /** Animation length in milliseconds (0 or left out: jump). */
  duration?: number;
}

/**
 * A `fitView` that also frames the node names: the bounds of the nodes, grown by every marked
 * element of those nodes on screen. Names are measured from the page, so it needs the nodes drawn
 * (they are, even while the network waits invisible for its first fit). In networks large enough that
 * only the visible nodes are drawn, names of nodes outside the view are not counted.
 */
export function useFitWithLabels(rootRef: RefObject<HTMLElement | null>) {
  const store = useStoreApi();
  const { getNodes, getNodesBounds, screenToFlowPosition, setViewport } = useReactFlow();

  return useCallback(
    (options: FitWithLabelsOptions): void => {
      const wanted = options.nodes ? new Set(options.nodes.map((node) => node.id)) : null;
      const nodes = getNodes().filter((node) => !node.hidden && (!wanted || wanted.has(node.id)));
      const { width, height, minZoom, maxZoom } = store.getState();
      if (nodes.length === 0 || width === 0 || height === 0) return;

      const box = getNodesBounds(nodes);
      let [left, top, right, bottom] = [box.x, box.y, box.x + box.width, box.y + box.height];
      const ids = new Set(nodes.map((node) => node.id));
      for (const element of rootRef.current?.querySelectorAll(`[${FIT_EXTENT_ATTRIBUTE}]`) ?? []) {
        const id = element.closest<HTMLElement>('.react-flow__node')?.dataset.id;
        if (!id || !ids.has(id)) continue;
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) continue;
        const start = screenToFlowPosition({ x: rect.left, y: rect.top }, { snapToGrid: false });
        const end = screenToFlowPosition({ x: rect.right, y: rect.bottom }, { snapToGrid: false });
        left = Math.min(left, start.x);
        top = Math.min(top, start.y);
        right = Math.max(right, end.x);
        bottom = Math.max(bottom, end.y);
      }

      const bounds = { x: left, y: top, width: right - left, height: bottom - top };
      const zoomLimit = Math.min(options.maxZoom ?? maxZoom, maxZoom);
      const viewport = getViewportForBounds(bounds, width, height, minZoom, zoomLimit, options.padding);
      void setViewport(viewport, { duration: options.duration });
    },
    [getNodes, getNodesBounds, rootRef, screenToFlowPosition, setViewport, store],
  );
}
