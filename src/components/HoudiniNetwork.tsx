import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type EdgeTypes,
  type Node,
  type NodeTypes,
  type Viewport,
} from '@xyflow/react';
import {
  convertGraphToReactFlow,
  houdiniRgbToCss,
  normalizeNetworkDocument,
  type HoudiniLabelSize,
  type HoudiniNetBoxFlowNodeData,
  type HoudiniSopFlowNodeData,
  type HoudiniStickyFlowNodeData,
  type HoudiniWireFlowEdgeData,
} from '../schema/converter';
import { getConnectedWireIds } from '../schema/connectedWires';
import { canDiveInto, resolveSubnetLevels, type SubnetLevel } from '../schema/subnetPath';
import type { HoudiniNetworkDocument, HoudiniNodeData, HoudiniWireStyle } from '../schema/types';
import { HoudiniWire } from './edges/HoudiniWire';
import { BreadcrumbBar } from './hud/BreadcrumbBar';
import { buildNetworkPathSegments } from './hud/networkPathSegments';
import { NavigableMiniMap } from './hud/NavigableMiniMap';
import { NetworkErrorState } from './hud/NetworkErrorState';
import { ViewerToolbar } from './hud/ViewerToolbar';
import { ParameterInspector } from './inspector/ParameterInspector';
import { ResizableInspectorPanel, SIDE_PANEL_MIN_VIEWER_WIDTH } from './inspector/ResizableInspectorPanel';
import { useElementSize } from './useElementSize';
import { NetworkErrorBoundary } from './NetworkErrorBoundary';
import { HoudiniDotNode } from './nodes/HoudiniDotNode';
import { HoudiniNetBox } from './nodes/HoudiniNetBox';
import { HoudiniSopNode } from './nodes/HoudiniSopNode';
import { HoudiniStickyNote } from './nodes/HoudiniStickyNote';
import { HoudiniSubnetInput } from './nodes/HoudiniSubnetInput';

/**
 * Props for the `<HoudiniNetwork />` embeddable component.
 */
export interface HoudiniNetworkProps {
  /** Houdini network JSON document (or raw diagnostic dump object). */
  data: HoudiniNetworkDocument | Record<string, unknown>;
  /** Automatically fit the entire network into the viewport on load. Defaults to `true`. */
  fitView?: boolean;
  /**
   * Initially show the bottom-right network overview (minimap). Visitors can toggle it with the
   * toolbar button or the `O` key; it is hidden automatically in narrow viewers. Defaults to `true`.
   */
  showMiniMap?: boolean;
  /** Show the top HUD toolbar (path, fit view, debug JSON, fullscreen). Defaults to `true`. */
  showToolbar?: boolean;
  /** Show the debug Copy/Download JSON buttons in the toolbar. Defaults to `true`. */
  showDebugActions?: boolean;
  /**
   * Open the read-only Parameter Inspector when a node is selected (a side panel in wide viewers,
   * a bottom sheet in narrow ones). Defaults to `true`.
   */
  showInspector?: boolean;
  /**
   * Initial font size preset for node names and labels (`"small"`, `"medium"`, or `"large"`).
   * Defaults to `"medium"` (which matches Houdini's standard Network Editor proportions).
   */
  labelSize?: HoudiniLabelSize;
  /**
   * Initial wire style (`"default"`: straight with rounded bends, `"rounded"`: horizontal runs with rounded corners).
   * Defaults to the style exported with the network, or `"default"` for older exports.
   */
  wireStyle?: HoudiniWireStyle;
  /** Optional callback fired when the selected operator node changes (`null` when nothing is selected). */
  onNodeSelect?: (node: HoudiniNodeData | null) => void;
  /** Optional CSS class name for the outer container. */
  className?: string;
}

const NODE_TYPES: NodeTypes = {
  houdiniSop: HoudiniSopNode,
  houdiniDot: HoudiniDotNode,
  houdiniSubnetInput: HoudiniSubnetInput,
  houdiniNetBox: HoudiniNetBox,
  houdiniSticky: HoudiniStickyNote,
};

const EDGE_TYPES: EdgeTypes = {
  houdiniWire: HoudiniWire,
};

/** Maximum delay between two clicks or taps on the same node that counts as a double-click. */
const DOUBLE_CLICK_MS = 400;

const FIT_VIEW_OPTIONS = { padding: 0.14, duration: 250 } as const;

const NO_DIVE_PATH: string[] = [];

/**
 * Subnetwork navigation of one document, like Houdini's path bar: `history[index]` is the network on
 * screen (names of the subnetworks dived into, from the exported root down), `history` the back /
 * forward list, and `trail` the deepest visited path below the network on screen (dimmed in the bar).
 */
interface NavigationState {
  doc: HoudiniNetworkDocument;
  history: string[][];
  index: number;
  trail: string[];
}

const START_HISTORY = [NO_DIVE_PATH];

/** Navigation at the exported root, with no history. */
function startNavigation(doc: HoudiniNetworkDocument): NavigationState {
  return { doc, history: START_HISTORY, index: 0, trail: NO_DIVE_PATH };
}

/** `true` when `path` starts with all of `prefix`. */
function isPathPrefix(prefix: readonly string[], path: readonly string[]): boolean {
  return prefix.length <= path.length && prefix.every((name, i) => path[i] === name);
}

/** Subnetwork names of a level stack (the root level has none). */
function levelNames(levels: SubnetLevel[]): string[] {
  return levels.slice(1).map((level) => level.node?.name ?? '');
}

/**
 * Color resolver for the React Flow `<MiniMap />` matching each Houdini node's RGB color.
 */
function resolveMiniMapNodeColor(node: Node): string {
  if (node.type === 'houdiniSop') {
    const data = node.data as unknown as HoudiniSopFlowNodeData;
    if (data?.node?.flags?.display || data?.node?.flags?.render) {
      return '#3098e5';
    }
    if (data?.node?.flags?.bypass) {
      return '#e5c130';
    }
    return houdiniRgbToCss(data?.node?.color, '#b8b8b8');
  }
  if (node.type === 'houdiniNetBox') {
    const data = node.data as unknown as HoudiniNetBoxFlowNodeData;
    return houdiniRgbToCss(data?.box?.color, '#444444');
  }
  if (node.type === 'houdiniSticky') {
    const data = node.data as unknown as HoudiniStickyFlowNodeData;
    return houdiniRgbToCss(data?.sticky?.color, '#d9c25b');
  }
  return '#777777';
}

interface InnerCanvasProps extends HoudiniNetworkProps {
  normalizedDoc: HoudiniNetworkDocument;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

const HoudiniNetworkInnerCanvas: React.FC<InnerCanvasProps> = ({
  normalizedDoc,
  fitView = true,
  showMiniMap = true,
  showToolbar = true,
  showDebugActions = true,
  showInspector = true,
  labelSize: initialLabelSize = 'medium',
  wireStyle: wireStyleProp,
  onNodeSelect,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const { fitView: triggerFitView, getViewport, setViewport } = useReactFlow();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [labelSize, setLabelSize] = useState<HoudiniLabelSize>(initialLabelSize);

  const onNodeSelectRef = useRef(onNodeSelect);
  onNodeSelectRef.current = onNodeSelect;

  useEffect(() => {
    setLabelSize(initialLabelSize);
  }, [initialLabelSize]);

  // Network overview (minimap): toolbar button or the O hotkey
  const [miniMapVisible, setMiniMapVisible] = useState(showMiniMap);

  useEffect(() => {
    setMiniMapVisible(showMiniMap);
  }, [showMiniMap]);

  // Subnetwork navigation (see `NavigationState`). It belongs to one document, so loading another
  // file starts again at its root.
  const [storedNav, setNav] = useState<NavigationState>(() => startNavigation(normalizedDoc));
  const nav = storedNav.doc === normalizedDoc ? storedNav : startNavigation(normalizedDoc);
  const divePath = nav.history[nav.index];
  const levels = useMemo(() => resolveSubnetLevels(normalizedDoc.root, divePath), [normalizedDoc.root, divePath]);
  const trailLevels = useMemo(() => resolveSubnetLevels(normalizedDoc.root, nav.trail), [normalizedDoc.root, nav.trail]);
  const activeGraph = levels[levels.length - 1].graph;

  const initialWireStyle = wireStyleProp ?? normalizedDoc.root.wireStyle ?? 'default';
  const [wireStyle, setWireStyle] = useState<HoudiniWireStyle>(initialWireStyle);

  useEffect(() => {
    setWireStyle(initialWireStyle);
  }, [initialWireStyle]);

  const rootRef = useRef<HTMLDivElement>(null);
  const viewerSize = useElementSize(rootRef);
  const isSidePanel = viewerSize.width >= SIDE_PANEL_MIN_VIEWER_WIDTH;
  const isPointerInsideRef = useRef(false);
  const lastClickRef = useRef<{ id: string; time: number } | null>(null);

  // Viewport of every visited level (by network path), restored when coming back like in Houdini
  const viewportsRef = useRef(new Map<string, Viewport>());
  // Subnetwork node to select after going up, so the parent opens with the node you came from selected
  const pendingSelectionRef = useRef<string | null>(null);

  const selectedNode = useMemo(
    () => (selectedNodeId ? activeGraph.nodes.find((n) => n.name === selectedNodeId) ?? null : null),
    [activeGraph, selectedNodeId],
  );

  const selectNode = useCallback((node: HoudiniNodeData | null) => {
    setSelectedNodeId(node?.name ?? null);
    onNodeSelectRef.current?.(node);
  }, []);

  /**
   * Shows the network at `path`, remembering the current view. Adds it to the history, or moves to
   * `historyIndex` for back / forward. The trail is kept while `path` lies on it, like Houdini.
   */
  const goTo = useCallback(
    (path: string[], historyIndex?: number) => {
      const current = levelNames(levels);
      viewportsRef.current.set(activeGraph.path, getViewport());
      // Going up selects the subnetwork you came from
      pendingSelectionRef.current =
        path.length < current.length && isPathPrefix(path, current) ? current[path.length] : null;
      const trailPath = levelNames(trailLevels);
      const trail = isPathPrefix(path, trailPath) ? trailPath : path;
      if (historyIndex !== undefined) {
        setNav({ ...nav, index: historyIndex, trail });
      } else {
        const history = [...nav.history.slice(0, nav.index + 1), path];
        setNav({ doc: normalizedDoc, history, index: history.length - 1, trail });
      }
    },
    [activeGraph.path, getViewport, levels, nav, normalizedDoc, trailLevels],
  );

  /** Shows the level at `depth` of the path bar trail (`0` is the exported root). */
  const navigateToDepth = useCallback(
    (depth: number) => {
      if (depth < 0 || depth >= trailLevels.length || depth === levels.length - 1) return;
      goTo(levelNames(trailLevels).slice(0, depth));
    },
    [goTo, levels.length, trailLevels],
  );

  /** Dives into a subnetwork node of the network on screen. */
  const diveInto = useCallback(
    (node: HoudiniNodeData) => {
      if (!canDiveInto(node)) return;
      goTo([...levelNames(levels), node.name]);
    },
    [goTo, levels],
  );

  const goBack = useCallback(() => {
    if (nav.index > 0) goTo(nav.history[nav.index - 1], nav.index - 1);
  }, [goTo, nav]);

  const goForward = useCallback(() => {
    if (nav.index < nav.history.length - 1) goTo(nav.history[nav.index + 1], nav.index + 1);
  }, [goTo, nav]);

  const pathSegments = useMemo(
    () => buildNetworkPathSegments(trailLevels, levels.length - 1, normalizedDoc.icons),
    [trailLevels, levels.length, normalizedDoc.icons],
  );

  // Latest values for the window key listener, which is registered once
  const selectedNodeRef = useRef<HoudiniNodeData | null>(null);
  selectedNodeRef.current = selectedNode;
  const navigationRef = useRef({ diveInto, navigateToDepth, depth: levels.length - 1 });
  navigationRef.current = { diveInto, navigateToDepth, depth: levels.length - 1 };

  // Houdini Network Editor hotkeys: Shift+S toggles the wire style, H fits the whole network,
  // F frames the selected node, I dives into the selected subnetwork and U goes up a level.
  // They only react while the pointer is over this viewer (or focus is inside it) and never while
  // typing in a text field, so they never hijack keys on the host page.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) {
        return;
      }
      // `getRootNode()` is the shadow root inside the `<houdini-network>` web component
      const root = rootRef.current?.getRootNode() as Document | ShadowRoot | undefined;
      const hasFocusInside = rootRef.current?.contains(root?.activeElement ?? null) ?? false;
      if (!isPointerInsideRef.current && !hasFocusInside) {
        return;
      }
      const selected = selectedNodeRef.current;
      const navigation = navigationRef.current;
      if (event.code === 'KeyS' && event.shiftKey) {
        setWireStyle((style) => (style === 'rounded' ? 'default' : 'rounded'));
      } else if (event.shiftKey) {
        return;
      } else if (event.code === 'KeyO') {
        setMiniMapVisible((visible) => !visible);
      } else if (event.code === 'KeyH') {
        triggerFitView({ padding: 0.14, duration: 300 });
      } else if (event.code === 'KeyF') {
        triggerFitView(
          selected
            ? { nodes: [{ id: selected.name }], padding: 0.8, duration: 300, maxZoom: 1.6 }
            : { padding: 0.14, duration: 300 },
        );
      } else if (event.code === 'KeyI' && selected && canDiveInto(selected)) {
        navigation.diveInto(selected);
      } else if (event.code === 'KeyU' && navigation.depth > 0) {
        navigation.navigateToDepth(navigation.depth - 1);
      } else {
        return;
      }
      event.preventDefault();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerFitView]);

  const { nodes: baseNodes, edges: baseEdges } = useMemo(
    () =>
      convertGraphToReactFlow(
        activeGraph,
        normalizedDoc.icons,
        normalizedDoc.customShapes,
        labelSize,
        wireStyle,
      ),
    [activeGraph, normalizedDoc.icons, normalizedDoc.customShapes, labelSize, wireStyle],
  );

  const nodes = useMemo(
    () =>
      baseNodes.map((n) =>
        n.id === selectedNodeId ? { ...n, selected: true } : n.selected ? { ...n, selected: false } : n,
      ),
    [baseNodes, selectedNodeId],
  );

  // Highlight every wire attached to the selected node (continuing through routing dots)
  const edges = useMemo(() => {
    if (!selectedNodeId) {
      return baseEdges;
    }
    const dotIds = new Set(baseNodes.filter((n) => n.type === 'houdiniDot').map((n) => n.id));
    const connected = getConnectedWireIds(selectedNodeId, baseEdges, dotIds);
    return baseEdges.map((e) =>
      connected.has(e.id)
        ? { ...e, zIndex: 6, data: { ...e.data, highlighted: true } satisfies HoudiniWireFlowEdgeData }
        : e,
    );
  }, [baseEdges, baseNodes, selectedNodeId]);

  // A new document starts with no remembered viewports
  useEffect(() => {
    viewportsRef.current.clear();
  }, [normalizedDoc]);

  // Entering a level: select the subnetwork we came up from (if any), then restore the
  // remembered view of this level or fit the whole network
  useEffect(() => {
    const pendingName = pendingSelectionRef.current;
    pendingSelectionRef.current = null;
    selectNode(pendingName ? activeGraph.nodes.find((n) => n.name === pendingName) ?? null : null);
    const savedViewport = viewportsRef.current.get(activeGraph.path);
    if (!savedViewport && !fitView) return;
    const timer = setTimeout(() => {
      if (savedViewport) {
        setViewport(savedViewport);
      } else {
        triggerFitView(FIT_VIEW_OPTIONS);
      }
    }, 30);
    return () => clearTimeout(timer);
  }, [activeGraph, fitView, selectNode, setViewport, triggerFitView]);

  const handleFitView = useCallback(() => {
    triggerFitView({ padding: 0.14, duration: 300 });
  }, [triggerFitView]);

  // Double-clicks are detected from two clicks on the same node, so a double tap works on
  // touch screens too (mobile browsers do not reliably fire `dblclick`)
  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, rfNode: Node) => {
      if (rfNode.type !== 'houdiniSop') return;
      const sopNode = (rfNode.data as unknown as HoudiniSopFlowNodeData).node;
      const now = performance.now();
      const last = lastClickRef.current;
      if (last && last.id === rfNode.id && now - last.time < DOUBLE_CLICK_MS && canDiveInto(sopNode)) {
        lastClickRef.current = null;
        diveInto(sopNode);
        return;
      }
      lastClickRef.current = { id: rfNode.id, time: now };
      selectNode(sopNode);
    },
    [diveInto, selectNode],
  );

  const handlePaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  return (
    <div
      ref={rootRef}
      onPointerEnter={() => {
        isPointerInsideRef.current = true;
      }}
      onPointerLeave={() => {
        isPointerInsideRef.current = false;
      }}
      // The layout follows the viewer's own width, not the page width: an embed in a narrow blog column
      // gets the phone layout even on a wide screen (container queries for CSS, `viewerSize` for the panel)
      className="@container relative w-full h-full bg-[#242424] overflow-hidden font-sans"
    >
      <div className={`w-full h-full flex ${isSidePanel ? 'flex-row' : 'flex-col'}`}>
        <div className="relative flex-1 min-w-0 min-h-0 select-none">
          {showToolbar && (
            <ViewerToolbar
              networkPath={activeGraph.path}
              pathBar={
                <BreadcrumbBar
                  segments={pathSegments}
                  nodeCount={activeGraph.nodes.length}
                  onNavigate={navigateToDepth}
                  canGoBack={nav.index > 0}
                  canGoForward={nav.index < nav.history.length - 1}
                  onBack={goBack}
                  onForward={goForward}
                />
              }
              labelSize={labelSize}
              onChangeLabelSize={setLabelSize}
              wireStyle={wireStyle}
              onChangeWireStyle={setWireStyle}
              isFullscreen={isFullscreen}
              onToggleFullscreen={onToggleFullscreen}
              onFitView={handleFitView}
              document={normalizedDoc}
              showDebugActions={showDebugActions}
              miniMapVisible={miniMapVisible}
              onToggleMiniMap={() => setMiniMapVisible((visible) => !visible)}
            />
          )}

          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={NODE_TYPES}
            edgeTypes={EDGE_TYPES}
            onNodeClick={handleNodeClick}
            onPaneClick={handlePaneClick}
            nodesDraggable={false}
            nodesConnectable={false}
            edgesReconnectable={false}
            elementsSelectable={true}
            nodesFocusable={false}
            edgesFocusable={false}
            panOnDrag={true}
            zoomOnScroll={true}
            zoomOnPinch={true}
            zoomOnDoubleClick={false}
            minZoom={0.08}
            maxZoom={3.5}
            fitView={fitView}
            fitViewOptions={{ padding: 0.14 }}
            proOptions={{ hideAttribution: true }}
          >
            <Background
              variant={BackgroundVariant.Lines}
              gap={50}
              size={1}
              color="#2c2c2c"
            />

            {miniMapVisible && <NavigableMiniMap nodeColor={resolveMiniMapNodeColor} />}
          </ReactFlow>
        </div>

        {showInspector && selectedNode && (
          <ResizableInspectorPanel
            isSidePanel={isSidePanel}
            viewerWidth={viewerSize.width}
            viewerHeight={viewerSize.height}
          >
            <ParameterInspector
              node={selectedNode}
              exportMode={normalizedDoc.exportMode}
              onClose={() => selectNode(null)}
              onDiveInto={() => diveInto(selectedNode)}
            />
          </ResizableInspectorPanel>
        )}
      </div>
    </div>
  );
};

/**
 * Embeddable, strictly view-only viewer component for SideFX Houdini networks (WOP).
 *
 * Visitors can pan, zoom, select nodes to read their parameters, and dive into exported
 * subnetworks (double-click or double-tap, `I` to enter and `U` to go up), but never edit the network.
 */
export const HoudiniNetwork: React.FC<HoudiniNetworkProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // `native`: browser Fullscreen API; `css`: full-viewport overlay where the API is unavailable (iPhone Safari)
  const [fullscreenMode, setFullscreenMode] = useState<'off' | 'native' | 'css'>('off');
  const isFullscreen = fullscreenMode !== 'off';

  // Never let a malformed file throw out of the component and crash the host page
  const parsed = useMemo(() => {
    try {
      return { doc: normalizeNetworkDocument(props.data), error: null };
    } catch (err) {
      return { doc: null, error: err instanceof Error ? err.message : 'Unknown error while reading the network.' };
    }
  }, [props.data]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreenMode(window.document.fullscreenElement ? 'native' : 'off');
    };
    window.document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      window.document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // The CSS fallback has no browser chrome to exit it: support Escape and stop the page behind from scrolling
  useEffect(() => {
    if (fullscreenMode !== 'css') return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullscreenMode('off');
    };
    const previousOverflow = window.document.body.style.overflow;
    window.document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullscreenMode]);

  const handleToggleFullscreen = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;
    if (fullscreenMode === 'native') {
      await window.document.exitFullscreen().catch(() => undefined);
      return;
    }
    if (fullscreenMode === 'css') {
      setFullscreenMode('off');
      return;
    }
    // Feature-detect the Fullscreen API (regular elements cannot go fullscreen on iPhone Safari)
    if (window.document.fullscreenEnabled && typeof container.requestFullscreen === 'function') {
      try {
        await container.requestFullscreen();
        return;
      } catch {
        // Blocked (for example inside an iframe without `allowfullscreen`): use the CSS fallback
      }
    }
    setFullscreenMode('css');
  }, [fullscreenMode]);

  return (
    <div
      ref={containerRef}
      className={
        // `wop-root` scopes the library stylesheet's reset (see `src/styles/reset.css`)
        isFullscreen
          ? 'wop-root fixed inset-0 z-50 bg-[#242424] pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]'
          : `wop-root w-full h-full min-h-80 relative ${props.className ?? ''}`
      }
    >
      {parsed.doc ? (
        <NetworkErrorBoundary resetKey={props.data}>
          <ReactFlowProvider>
            <HoudiniNetworkInnerCanvas
              {...props}
              normalizedDoc={parsed.doc}
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
            />
          </ReactFlowProvider>
        </NetworkErrorBoundary>
      ) : (
        <NetworkErrorState message={parsed.error ?? 'Unknown error while reading the network.'} />
      )}
    </div>
  );
};
