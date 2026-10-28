import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
} from '../schema/converter';
import { canDiveInto } from '../schema/subnetPath';
import type { HoudiniNetworkDocument, HoudiniNodeData, HoudiniWireStyle } from '../schema/types';
import { HoudiniWire } from './edges/HoudiniWire';
import { useFullscreen } from './hooks/useFullscreen';
import { useLabsIcons } from './hooks/useLabsIcons';
import { isPathPrefix, useNavigationHistory, type BeforeNavigate } from './hooks/useNavigationHistory';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useViewerHotkeys, type HotkeyMode } from './hooks/useViewerHotkeys';
import { useWireHighlight } from './hooks/useWireHighlight';
import { BreadcrumbBar } from './hud/BreadcrumbBar';
import { buildNetworkPathSegments } from './hud/networkPathSegments';
import { NavigableMiniMap } from './hud/NavigableMiniMap';
import { NetworkErrorState } from './hud/NetworkErrorState';
import { NetworkLoadingState } from './hud/NetworkLoadingState';
import { ViewerToolbar } from './hud/ViewerToolbar';
import { ResizableInspectorPanel, SIDE_PANEL_MIN_VIEWER_WIDTH } from './inspector/ResizableInspectorPanel';
import { useElementSize } from './useElementSize';
import { NetworkErrorBoundary } from './NetworkErrorBoundary';
import { HoudiniBlockUnderlay } from './nodes/HoudiniBlockUnderlay';
import { HoudiniDotNode } from './nodes/HoudiniDotNode';
import { HoudiniNetBox } from './nodes/HoudiniNetBox';
import { HoudiniSopNode } from './nodes/HoudiniSopNode';
import { HoudiniStickyNote } from './nodes/HoudiniStickyNote';
import { HoudiniSubnetInput } from './nodes/HoudiniSubnetInput';
import { CANVAS_BG_CLASS, GRID_LINE_COLOR } from './theme';

// The Parameter Inspector (pane layout, code highlighting, ramps) is only needed once a node is
// selected, so it is loaded on demand and stays out of the first download of embeds
const ParameterInspector = React.lazy(() =>
  import('./inspector/ParameterInspector').then((module) => ({ default: module.ParameterInspector })),
);

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
  /** Show the debug Copy/Download JSON buttons in the toolbar. Defaults to `false`. */
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
  /**
   * When the Houdini hotkeys (H, F, I, U, O, Shift+S) react: `"focus"` only while focus is inside the
   * viewer (after clicking or tabbing into it), `"hover"` also while the pointer is over it, `"off"`
   * never. Defaults to `"focus"`, so single keys never act on a page the visitor is typing on.
   */
  hotkeys?: HotkeyMode;
  /** Optional callback fired when the selected operator node changes (`null` when nothing is selected). */
  onNodeSelect?: (node: HoudiniNodeData | null) => void;
  /** Optional CSS class name for the outer container. */
  className?: string;
}

const NODE_TYPES: NodeTypes = {
  houdiniSop: memo(HoudiniSopNode),
  houdiniDot: memo(HoudiniDotNode),
  houdiniSubnetInput: memo(HoudiniSubnetInput),
  houdiniNetBox: memo(HoudiniNetBox),
  houdiniSticky: memo(HoudiniStickyNote),
  houdiniBlock: memo(HoudiniBlockUnderlay),
};

const EDGE_TYPES: EdgeTypes = {
  houdiniWire: memo(HoudiniWire),
};

/** Maximum delay between two clicks or taps on the same node that counts as a double-click. */
const DOUBLE_CLICK_MS = 400;

/** Animation time of view changes (fit, frame); `0` when the visitor prefers reduced motion. */
const VIEW_ANIMATION_MS = 300;

const FIT_PADDING = 0.14;

/**
 * Network levels with more items than this only render what is on screen. Smaller levels render
 * everything, so the keyboard Tab order reaches every node.
 */
const VISIBLE_ONLY_ITEM_COUNT = 1000;

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
  if (node.type === 'houdiniBlock') {
    // The overview shows the nodes themselves; a block's bounding box would hide them
    return 'transparent';
  }
  return '#777777';
}

/** Escapes a node name for an attribute selector (`[data-id="..."]`). */
function cssString(value: string): string {
  return value.replace(/["\\]/g, '\\$&');
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
  showDebugActions = false,
  showInspector = true,
  labelSize: initialLabelSize = 'medium',
  wireStyle: wireStyleProp,
  hotkeys = 'focus',
  onNodeSelect,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const { fitView: triggerFitView, getViewport, setViewport } = useReactFlow();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [labelSize, setLabelSize] = useState<HoudiniLabelSize>(initialLabelSize);
  // The inspector takes keyboard focus when the node was selected with the keyboard
  const [focusInspector, setFocusInspector] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const duration = reducedMotion ? 0 : VIEW_ANIMATION_MS;
  // Read by the level effect below, which must not run again when only the preference changes
  const reducedMotionRef = useRef(reducedMotion);
  reducedMotionRef.current = reducedMotion;

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

  const rootRef = useRef<HTMLDivElement>(null);
  const viewerSize = useElementSize(rootRef);
  const isSidePanel = viewerSize.width >= SIDE_PANEL_MIN_VIEWER_WIDTH;
  const lastClickRef = useRef<{ id: string; time: number } | null>(null);

  // Viewport of every visited level (by network path), restored when coming back like in Houdini
  const viewportsRef = useRef(new Map<string, Viewport>());
  // Subnetwork node to select after going up, so the parent opens with the node you came from selected
  const pendingSelectionRef = useRef<string | null>(null);
  // Keyboard focus was inside the viewer when the network changed: keep it there afterwards
  const restoreFocusRef = useRef(false);
  const activePathRef = useRef('');

  /** `true` when keyboard focus is inside this viewer (also inside the web component's Shadow DOM). */
  const hasFocusInside = useCallback(() => {
    const element = rootRef.current;
    if (!element) return false;
    const root = element.getRootNode() as Document | ShadowRoot;
    return element.contains(root.activeElement);
  }, []);

  const beforeNavigate = useCallback<BeforeNavigate>(
    (current, next) => {
      viewportsRef.current.set(activePathRef.current, getViewport());
      // Going up selects the subnetwork you came from
      pendingSelectionRef.current =
        next.length < current.length && isPathPrefix(next, current) ? current[next.length] : null;
      restoreFocusRef.current = hasFocusInside();
    },
    [getViewport, hasFocusInside],
  );

  const navigation = useNavigationHistory(normalizedDoc, beforeNavigate);
  const { activeGraph, levels, trailLevels, diveInto, navigateToDepth } = navigation;
  activePathRef.current = activeGraph.path;

  const initialWireStyle = wireStyleProp ?? normalizedDoc.root.wireStyle ?? 'default';
  const [wireStyle, setWireStyle] = useState<HoudiniWireStyle>(initialWireStyle);

  useEffect(() => {
    setWireStyle(initialWireStyle);
  }, [initialWireStyle]);

  const selectedNode = useMemo(
    () => (selectedNodeId ? activeGraph.nodes.find((n) => n.name === selectedNodeId) ?? null : null),
    [activeGraph, selectedNodeId],
  );

  // Last selection reported to `onNodeSelect`, so it only fires when the selection changes
  const reportedSelectionRef = useRef<HoudiniNodeData | null>(null);

  const selectNode = useCallback((node: HoudiniNodeData | null, byKeyboard = false) => {
    setSelectedNodeId(node?.name ?? null);
    setFocusInspector(byKeyboard && node !== null);
    if (reportedSelectionRef.current === node) return;
    reportedSelectionRef.current = node;
    onNodeSelectRef.current?.(node);
  }, []);

  /** Moves keyboard focus to the canvas node `name` (after closing the inspector with the keyboard). */
  const focusNode = useCallback((name: string) => {
    const element = rootRef.current?.querySelector<HTMLElement>(`.react-flow__node[data-id="${cssString(name)}"]`);
    element?.focus({ preventScroll: true });
  }, []);

  const closeInspector = useCallback(() => {
    const name = selectedNodeId;
    const returnFocus = hasFocusInside();
    selectNode(null);
    if (name && returnFocus) window.setTimeout(() => focusNode(name), 0);
  }, [focusNode, hasFocusInside, selectNode, selectedNodeId]);

  const pathSegments = useMemo(
    () => buildNetworkPathSegments(trailLevels, levels.length - 1, normalizedDoc.icons),
    [trailLevels, levels.length, normalizedDoc.icons],
  );

  const fitAll = useCallback(() => {
    triggerFitView({ padding: FIT_PADDING, duration });
  }, [duration, triggerFitView]);

  // Houdini Network Editor hotkeys: Shift+S toggles the wire style, H fits the whole network,
  // F frames the selected node, I dives into the selected subnetwork, U goes up a level and O
  // shows or hides the overview. When they react is set by the `hotkeys` prop.
  const hotkeyHandlers = useViewerHotkeys(rootRef, hotkeys, (event) => {
    if (event.code === 'KeyS' && event.shiftKey) {
      setWireStyle((style) => (style === 'rounded' ? 'default' : 'rounded'));
      return true;
    }
    if (event.shiftKey) return false;
    switch (event.code) {
      case 'KeyO':
        setMiniMapVisible((visible) => !visible);
        return true;
      case 'KeyH':
        fitAll();
        return true;
      case 'KeyF':
        if (selectedNode) {
          triggerFitView({ nodes: [{ id: selectedNode.name }], padding: 0.8, duration, maxZoom: 1.6 });
        } else {
          fitAll();
        }
        return true;
      case 'KeyI':
        if (!selectedNode || !canDiveInto(selectedNode)) return false;
        diveInto(selectedNode);
        return true;
      case 'KeyU':
        if (navigation.depth === 0) return false;
        navigateToDepth(navigation.depth - 1);
        return true;
      default:
        return false;
    }
  });

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

  const edges = useWireHighlight(baseNodes, baseEdges, selectedNodeId);

  // A new document starts with no remembered viewports
  useEffect(() => {
    viewportsRef.current.clear();
  }, [normalizedDoc]);

  // React Flow's `fitView` prop already fits the first level on its first render
  const firstLevelRef = useRef(true);

  // Entering a level: select the subnetwork we came up from (if any), then restore the
  // remembered view of this level or fit the whole network
  useEffect(() => {
    const pendingName = pendingSelectionRef.current;
    pendingSelectionRef.current = null;
    selectNode(pendingName ? activeGraph.nodes.find((n) => n.name === pendingName) ?? null : null);
    if (restoreFocusRef.current) {
      restoreFocusRef.current = false;
      // Focus the viewer itself (the hotkeys keep working, Tab then reaches the nodes)
      if (pendingName) window.setTimeout(() => focusNode(pendingName), 0);
      else rootRef.current?.focus({ preventScroll: true });
    }
    const isFirstLevel = firstLevelRef.current;
    firstLevelRef.current = false;
    const savedViewport = viewportsRef.current.get(activeGraph.path);
    if (!savedViewport && (!fitView || isFirstLevel)) return;
    const timer = setTimeout(() => {
      if (savedViewport) {
        setViewport(savedViewport);
      } else {
        triggerFitView({ padding: FIT_PADDING, duration: reducedMotionRef.current ? 0 : 250 });
      }
    }, 30);
    return () => clearTimeout(timer);
  }, [activeGraph, fitView, focusNode, selectNode, setViewport, triggerFitView]);

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

  // Keyboard access to the canvas: Enter or Space on a focused node selects it and moves focus to the
  // Parameter Inspector (which has the "Open subnetwork" button); Escape clears the selection
  const handleCanvasKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      if (!target.classList.contains('react-flow__node')) return;
      const node = activeGraph.nodes.find((n) => n.name === target.dataset.id);
      if (!node) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectNode(node, showInspector);
      } else if (event.key === 'Escape' && selectedNodeId) {
        event.preventDefault();
        selectNode(null);
      }
    },
    [activeGraph, selectNode, selectedNodeId, showInspector],
  );

  const handlePaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  const itemCount = baseNodes.length + baseEdges.length;
  const canGoUp = levels.length > 1;

  return (
    <div
      ref={rootRef}
      // Focusable by script and by clicking, so the `focus` hotkey mode works after a click anywhere inside
      tabIndex={-1}
      {...hotkeyHandlers}
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;
        if (!target.closest('button, a, input, [tabindex="0"]') && !hasFocusInside()) {
          rootRef.current?.focus({ preventScroll: true });
        }
      }}
      // The layout follows the viewer's own width, not the page width: an embed in a narrow blog column
      // gets the phone layout even on a wide screen (container queries for CSS, `viewerSize` for the panel)
      className={`@container relative w-full h-full ${CANVAS_BG_CLASS} overflow-hidden font-sans outline-none`}
    >
      <div className={`w-full h-full flex ${isSidePanel ? 'flex-row' : 'flex-col'}`}>
        {/* Delegated key handling for the focusable canvas nodes inside (React Flow renders them) */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div className="relative flex-1 min-w-0 min-h-0 select-none" onKeyDown={handleCanvasKeyDown}>
          {showToolbar && (
            <ViewerToolbar
              networkPath={activeGraph.path}
              pathBar={
                <BreadcrumbBar
                  segments={pathSegments}
                  nodeCount={activeGraph.nodes.length}
                  onNavigate={navigateToDepth}
                  canGoBack={navigation.canGoBack}
                  canGoForward={navigation.canGoForward}
                  onBack={navigation.goBack}
                  onForward={navigation.goForward}
                />
              }
              labelSize={labelSize}
              onChangeLabelSize={setLabelSize}
              wireStyle={wireStyle}
              onChangeWireStyle={setWireStyle}
              isFullscreen={isFullscreen}
              onToggleFullscreen={onToggleFullscreen}
              onFitView={fitAll}
              document={normalizedDoc}
              showDebugActions={showDebugActions}
              miniMapVisible={miniMapVisible}
              onToggleMiniMap={() => setMiniMapVisible((visible) => !visible)}
            />
          )}

          {/* An error inside one subnetwork keeps the path bar and offers a way back up */}
          <NetworkErrorBoundary
            resetKey={activeGraph.path}
            onReset={canGoUp ? () => navigateToDepth(0) : undefined}
            resetLabel="Back to the top network"
          >
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
              nodesFocusable={true}
              edgesFocusable={false}
              onlyRenderVisibleElements={itemCount > VISIBLE_ONLY_ITEM_COUNT}
              panOnDrag={true}
              zoomOnScroll={true}
              zoomOnPinch={true}
              zoomOnDoubleClick={false}
              minZoom={0.08}
              maxZoom={3.5}
              fitView={fitView}
              fitViewOptions={{ padding: FIT_PADDING }}
              proOptions={{ hideAttribution: true }}
            >
              <Background variant={BackgroundVariant.Lines} gap={50} size={1} color={GRID_LINE_COLOR} />

              {miniMapVisible && <NavigableMiniMap nodeColor={resolveMiniMapNodeColor} />}
            </ReactFlow>
          </NetworkErrorBoundary>
        </div>

        {showInspector && selectedNode && (
          <ResizableInspectorPanel
            isSidePanel={isSidePanel}
            viewerWidth={viewerSize.width}
            viewerHeight={viewerSize.height}
          >
            <NetworkErrorBoundary resetKey={selectedNode}>
              <React.Suspense fallback={<NetworkLoadingState message="Loading parameters..." />}>
                <ParameterInspector
                  node={selectedNode}
                  exportMode={normalizedDoc.exportMode}
                  onClose={closeInspector}
                  onDiveInto={() => diveInto(selectedNode)}
                  focusOnOpen={focusInspector}
                />
              </React.Suspense>
            </NetworkErrorBoundary>
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
 * Keyboard users reach each node with Tab and open its parameters with Enter.
 */
export const HoudiniNetwork: React.FC<HoudiniNetworkProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreen = useFullscreen(containerRef);

  // Never let a malformed file throw out of the component and crash the host page
  const parsed = useMemo(() => {
    try {
      return { doc: normalizeNetworkDocument(props.data), error: null };
    } catch (err) {
      return { doc: null, error: err instanceof Error ? err.message : 'Unknown error while reading the network.' };
    }
  }, [props.data]);
  const iconsReady = useLabsIcons(parsed.doc);

  return (
    <div
      ref={containerRef}
      className={
        // `wop-root` scopes the library stylesheet's reset (see `src/styles/reset.css`). The CSS
        // fullscreen fallback sits above host page headers, which often use z-index 1000 or more.
        fullscreen.isFullscreen
          ? `wop-root fixed inset-0 z-[2147483000] ${CANVAS_BG_CLASS} pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]`
          : `wop-root w-full h-full min-h-80 relative ${props.className ?? ''}`
      }
    >
      {parsed.doc && !iconsReady ? (
        <NetworkLoadingState />
      ) : parsed.doc ? (
        <NetworkErrorBoundary resetKey={props.data}>
          <ReactFlowProvider>
            <HoudiniNetworkInnerCanvas
              {...props}
              normalizedDoc={parsed.doc}
              isFullscreen={fullscreen.isFullscreen}
              onToggleFullscreen={fullscreen.toggle}
            />
          </ReactFlowProvider>
        </NetworkErrorBoundary>
      ) : (
        <NetworkErrorState message={parsed.error ?? 'Unknown error while reading the network.'} />
      )}
    </div>
  );
};
