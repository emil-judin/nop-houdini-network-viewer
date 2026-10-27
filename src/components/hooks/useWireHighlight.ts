import { useMemo } from 'react';
import type { Edge, Node } from '@xyflow/react';
import { buildWireIndex, getConnectedWireIds } from '../../schema/connectedWires';
import type { HoudiniWireFlowEdgeData } from '../../schema/converter';

/**
 * Highlights every wire attached to the selected node, continuing through routing dots like
 * Houdini. The wire index is built once per network level, not once per selection.
 */
export function useWireHighlight(nodes: Node[], edges: Edge[], selectedNodeId: string | null): Edge[] {
  const dotIds = useMemo(() => new Set(nodes.filter((n) => n.type === 'houdiniDot').map((n) => n.id)), [nodes]);
  const index = useMemo(() => buildWireIndex(edges), [edges]);
  return useMemo(() => {
    if (!selectedNodeId) return edges;
    const connected = getConnectedWireIds(selectedNodeId, index, dotIds);
    if (connected.size === 0) return edges;
    return edges.map((edge) =>
      connected.has(edge.id)
        ? { ...edge, zIndex: 6, data: { ...edge.data, highlighted: true } satisfies HoudiniWireFlowEdgeData }
        : edge,
    );
  }, [dotIds, edges, index, selectedNodeId]);
}
