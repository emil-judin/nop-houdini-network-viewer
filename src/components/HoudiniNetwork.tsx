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
import { Maximize2 } from 'lucide-react';
import { HoudiniWire } from './edges/HoudiniWire';
import { useFullscreen } from './hooks/useFullscreen';
import { useLabsIcons } from './hooks/useLabsIcons';
import { isPathPrefix, useNavigationHistory, type BeforeNavigate } from './hooks/useNavigationHistory';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useViewerHotkeys, type HotkeyMode } from './hooks/useViewerHotkeys';
import { useTwoFingerPan, type TouchPanMode } from './hooks/useTwoFingerPan';
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
   * Open the bottom-right network overview (minimap) at the start (also the `minimap` attribute).
   * Visitors can toggle it with the toolbar button or the `O` key; it is hidden automatically in
   * narrow viewers. Defaults to `false`.
   */
  showMiniMap?: boolean;
  /**
   * Name of a node in the top network level to frame at the start, like Houdini's F key (also the
   * `focus-node` attribute). It is not selected and does not take keyboard focus. A name that is not
   * in the network is ignored. Defaults to none: the whole network is fitted (see `fitView`).
   */
  focusNode?: string;
  /** Show the top pane header (path bar, wire style, overview, fullscreen). Defaults to `true`. */
  showToolbar?: boolean;
  /** Show the debug Download JSON button in the toolbar. Defaults to `false`. */
  showDebugActions?: boolean;
  /**
   * Show a fullscreen button in the toolbar (native Fullscreen API, or a CSS full-viewport mode
   * where elements cannot go fullscreen, such as iPhone Safari; also the `fullscreen` attribute).
   * Entering and leaving fullscreen fits the network to the new size. Defaults to `true`.
   */
  showFullscreenButton?: boolean;
  /**
   * How touch input moves the network outside fullscreen (also the `touch-pan` attribute):
   * `"two-fingers"` lets one finger scroll the page past the viewer while two fingers move and zoom
   * the network (a short hint says so), `"one-finger"` moves the network with one finger, for pages
   * where the viewer fills the screen. In fullscreen one finger always moves the network.
   * Defaults to `"two-fingers"`.
   */
  touchPan?: TouchPanMode;
  /**
   * Open the read-only Parameter Inspector when a node is selected (a side panel in wide viewers,
   * a bottom sheet in narrow ones). Defaults to `true`.
   */
  showInspector?: boolean;
  /**
   * Font size preset for node names and labels (`"small"`, `"medium"`, or `"large"`). A setting
   * of the embedding page (also the `label-size` attribute): visitors cannot change it.
   * Defaults to `"medium"` (which matches Houdini's standard Network Editor proportions).
   */
  labelSize?: HoudiniLabelSize;
  /**
   * Initial wire style (`"default"`: straight with rounded bends, `"rounded"`: horizontal runs with rounded corners;
   * also the `wire-style` attribute). Defaults to the style exported with the network (Houdini's wire
   * style setting for that network type), or `"default"`, Houdini's own default, for older exports.
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

/** Mouse buttons that pan the view: left (`0`) and middle (`1`), like Houdini's Network Editor. */
const PAN_BUTTONS = [0, 1];

/** View options for framing one node: the F hotkey and the `focusNode` start view. */
const FRAME_PADDING = 0.8;
const FRAME_MAX_ZOOM = 1.6;
/** Narrower viewers (phones) frame a node less closely, so its name and label stay on screen. */
const NARROW_VIEWER_WIDTH = 448;
const FRAME_MAX_ZOOM_NARROW = 1;

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
  showMiniMap = false,
  focusNode: focusNodeName,
  showToolbar = true,
  showDebugActions = false,
  showFullscreenButton = true,
  touchPan = 'two-fingers',
  showInspector = true,
  labelSize = 'medium',
  wireStyle: wireStyleProp,
  hotkeys = 'focus',
  onNodeSelect,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const { fitView: triggerFitView, getViewport, setViewport } = useReactFlow();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  // The inspector takes keyboard focus when the node was selected with the keyboard
  const [focusInspector, setFocusInspector] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const duration = reducedMotion ? 0 : VIEW_ANIMATION_MS;
  // Read by the level effect below, which must not run again when only the preference changes
  const reducedMotionRef = useRef(reducedMotion);
  reducedMotionRef.current = reducedMotion;

  const onNodeSelectRef = useRef(onNodeSelect);
  onNodeSelectRef.current = onNodeSelect;

  // Network overview (minimap): toolbar button or the O hotkey
  const [miniMapVisible, setMiniMapVisible] = useState(showMiniMap);

  useEffect(() => {
    setMiniMapVisible(showMiniMap);
  }, [showMiniMap]);

  const rootRef = useRef<HTMLDivElement>(null);
  const viewerSize = useElementSize(rootRef);
  const isSidePanel = viewerSize.width >= SIDE_PANEL_MIN_VIEWER_WIDTH;
  // `0` before the first measurement (or while hidden): treated as a wide viewer
  const frameMaxZoom = viewerSize.width > 0 && viewerSize.width < NARROW_VIEWER_WIDTH ? FRAME_MAX_ZOOM_NARROW : FRAME_MAX_ZOOM;
  const twoFingerPan = touchPan === 'two-fingers' && !isFullscreen;
  const touchHintVisible = useTwoFingerPan(rootRef, twoFingerPan);
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
  const focusCanvasNode = useCallback((name: string) => {
    const element = rootRef.current?.querySelector<HTMLElement>(`.react-flow__node[data-id="${cssString(name)}"]`);
    element?.focus({ preventScroll: true });
  }, []);

  const closeInspector = useCallback(() => {
    const name = selectedNodeId;
    const returnFocus = hasFocusInside();
    selectNode(null);
    if (name && returnFocus) window.setTimeout(() => focusCanvasNode(name), 0);
  }, [focusCanvasNode, hasFocusInside, selectNode, selectedNodeId]);

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
          triggerFitView({ nodes: [{ id: selectedNode.name }], padding: FRAME_PADDING, duration, maxZoom: frameMaxZoom });
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

  // The start view frames `focusNode` when it names a node of the top level, else fits everything
  const startFocus = focusNodeName && normalizedDoc.root.nodes.some((n) => n.name === focusNodeName) ? focusNodeName : null;
  const startFitOptions = useMemo(
    () =>
      startFocus
        ? { nodes: [{ id: startFocus }], padding: FRAME_PADDING, maxZoom: frameMaxZoom }
        : { padding: FIT_PADDING },
    [frameMaxZoom, startFocus],
  );
  // Read by the level effect below, which must not run again (and clear the selection) when only these change
  const startFitOptionsRef = useRef(startFitOptions);
  startFitOptionsRef.current = startFitOptions;
  const rootPathRef = useRef(normalizedDoc.root.path);
  rootPathRef.current = normalizedDoc.root.path;

  // Entering a level: select the subnetwork we came up from (if any), then restore the
  // remembered view of this level, or frame the start node, or fit the whole network
  useEffect(() => {
    const pendingName = pendingSelectionRef.current;
    pendingSelectionRef.current = null;
    selectNode(pendingName ? activeGraph.nodes.find((n) => n.name === pendingName) ?? null : null);
    if (restoreFocusRef.current) {
      restoreFocusRef.current = false;
      // Focus the viewer itself (the hotkeys keep working, Tab then reaches the nodes)
      if (pendingName) window.setTimeout(() => focusCanvasNode(pendingName), 0);
      else rootRef.current?.focus({ preventScroll: true });
    }
    const isFirstLevel = firstLevelRef.current;
    firstLevelRef.current = false;
    const savedViewport = viewportsRef.current.get(activeGraph.path);
    // A new document opens at its top level: frame the start node there (if any), like on the first render
    const startOptions = activeGraph.path === rootPathRef.current ? startFitOptionsRef.current : null;
    const framesStartNode = Boolean(startOptions && 'nodes' in startOptions);
    if (!savedViewport && (isFirstLevel || (!fitView && !framesStartNode))) return;
    const timer = setTimeout(() => {
      const animation = reducedMotionRef.current ? 0 : 250;
      if (savedViewport) {
        setViewport(savedViewport);
      } else if (startOptions && framesStartNode) {
        triggerFitView({ ...startOptions, duration: animation });
      } else {
        triggerFitView({ padding: FIT_PADDING, duration: animation });
      }
    }, 30);
    return () => clearTimeout(timer);
  }, [activeGraph, fitView, focusCanvasNode, selectNode, setViewport, triggerFitView]);

  // A node the visitor selects (click, tap or keyboard) stays in view: when the Parameter Inspector
  // beside or below the canvas covers any part of it, the view pans the node to the middle of the
  // remaining canvas and keeps the zoom. A fully visible node does not move the view.
  const revealOnSelectRef = useRef<string | null>(null);

  useEffect(() => {
    const name = revealOnSelectRef.current;
    revealOnSelectRef.current = null;
    if (!name || !showInspector || name !== selectedNodeId) return;
    // Two frames: the panel is laid out and the canvas has its new size before measuring
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const root = rootRef.current;
        const canvas = root?.querySelector('.react-flow')?.getBoundingClientRect();
        const box = root?.querySelector(`.react-flow__node[data-id="${cssString(name)}"]`)?.getBoundingClientRect();
        if (!canvas || !box || canvas.width === 0 || canvas.height === 0) return;
        // The panel sits at the right of the canvas (side panel) or below it (bottom sheet)
        const covered = isSidePanel ? box.right > canvas.right + 0.5 : box.bottom > canvas.bottom + 0.5;
        if (!covered) return;
        // Pan the node to the middle of the canvas next to the panel; the zoom stays
        const viewport = getViewport();
        const dx = canvas.left + canvas.width / 2 - (box.left + box.width / 2);
        const dy = canvas.top + canvas.height / 2 - (box.top + box.height / 2);
        setViewport({ x: viewport.x + dx, y: viewport.y + dy, zoom: viewport.zoom }, { duration });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [duration, getViewport, isSidePanel, selectedNodeId, setViewport, showInspector]);

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
      revealOnSelectRef.current = sopNode.name;
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
        revealOnSelectRef.current = node.name;
        selectNode(node, showInspector);
      } else if (event.key === 'Escape' && selectedNodeId) {
        event.preventDefault();
        selectNode(null);
      }
    },
    [activeGraph, selectNode, selectedNodeId, showInspector],
  );

  // A click or tap on the empty canvas clears the selection; a double-click or double-tap fits the
  // whole network (the toolbar has no Fit button)
  const lastPaneClickRef = useRef(0);

  const handlePaneClick = useCallback(() => {
    const now = performance.now();
    if (now - lastPaneClickRef.current < DOUBLE_CLICK_MS) {
      lastPaneClickRef.current = 0;
      fitAll();
    } else {
      lastPaneClickRef.current = now;
    }
    selectNode(null);
  }, [fitAll, selectNode]);

  // Entering or leaving fullscreen changes the viewer size a lot: fit the network to the new size.
  // Browsers resize in steps and in any order around the `fullscreenchange` event (WebKit can resize
  // first, and a busy page much later), so the fit follows every size change from the switch until
  // the visitor moves the view, instead of guessing a time window.
  const fitOnResizeRef = useRef(false);
  const wasFullscreenRef = useRef(isFullscreen);

  useEffect(() => {
    if (wasFullscreenRef.current === isFullscreen) return;
    wasFullscreenRef.current = isFullscreen;
    fitOnResizeRef.current = true;
    // The size may already have changed before the switch was reported
    const timer = setTimeout(() => triggerFitView({ padding: FIT_PADDING }), 50);
    return () => clearTimeout(timer);
  }, [isFullscreen, triggerFitView]);

  useEffect(() => {
    if (!fitOnResizeRef.current) return;
    const timer = setTimeout(() => triggerFitView({ padding: FIT_PADDING }), 50);
    return () => clearTimeout(timer);
  }, [triggerFitView, viewerSize.width, viewerSize.height]);

  // A pan or zoom by the visitor (React Flow passes no event for moves made in code, such as a fit)
  const handleMoveStart = useCallback((event: MouseEvent | TouchEvent | null) => {
    if (event) fitOnResizeRef.current = false;
  }, []);

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
      // The middle mouse button pans the network, like in Houdini (see `panOnDrag`). Inside the viewer
      // it never starts the browser's auto-scroll (or a Linux middle-click paste); outside, the page keeps it.
      // Capture phase: React Flow's pan handler stops the event on the canvas before it would bubble here.
      onMouseDownCapture={(event) => {
        if (event.button === 1) event.preventDefault();
      }}
      onAuxClickCapture={(event) => {
        if (event.button === 1) event.preventDefault();
      }}
      // The layout follows the viewer's own width, not the page width: an embed in a narrow blog column
      // gets the phone layout even on a wide screen (container queries for CSS, `viewerSize` for the panel)
      className={`@container relative w-full h-full ${CANVAS_BG_CLASS} overflow-hidden font-sans outline-none ${
        twoFingerPan ? 'nop-two-finger-pan' : ''
      }`}
    >
      <div className={`w-full h-full flex ${isSidePanel ? 'flex-row' : 'flex-col'}`}>
        {/* Delegated key handling for the focusable canvas nodes inside (React Flow renders them) */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div className="flex flex-col flex-1 min-w-0 min-h-0 select-none" onKeyDown={handleCanvasKeyDown}>
          {showToolbar && (
            <ViewerToolbar
              networkPath={activeGraph.path}
              pathBar={
                <BreadcrumbBar
                  segments={pathSegments}
                  onNavigate={navigateToDepth}
                  canGoBack={navigation.canGoBack}
                  canGoForward={navigation.canGoForward}
                  onBack={navigation.goBack}
                  onForward={navigation.goForward}
                />
              }
              nodeCount={activeGraph.nodes.length}
              wireStyle={wireStyle}
              onChangeWireStyle={setWireStyle}
              document={normalizedDoc}
              showDebugActions={showDebugActions}
              miniMapVisible={miniMapVisible}
              onToggleMiniMap={() => setMiniMapVisible((visible) => !visible)}
              showFullscreenButton={showFullscreenButton}
              isFullscreen={isFullscreen}
              onToggleFullscreen={onToggleFullscreen}
            />
          )}

          <div className="relative flex-1 min-h-0">
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
                onMoveStart={handleMoveStart}
                nodesDraggable={false}
                nodesConnectable={false}
                edgesReconnectable={false}
                elementsSelectable={true}
                nodesFocusable={true}
                edgesFocusable={false}
                onlyRenderVisibleElements={itemCount > VISIBLE_ONLY_ITEM_COUNT}
                // Left and middle mouse button (and one finger) drag the view
                panOnDrag={PAN_BUTTONS}
                zoomOnScroll={true}
                zoomOnPinch={true}
                zoomOnDoubleClick={false}
                minZoom={0.08}
                maxZoom={3.5}
                fitView={fitView || startFocus !== null}
                fitViewOptions={startFitOptions}
                proOptions={{ hideAttribution: true }}
              >
                <Background variant={BackgroundVariant.Lines} gap={50} size={1} color={GRID_LINE_COLOR} />

                {miniMapVisible && <NavigableMiniMap nodeColor={resolveMiniMapNodeColor} />}
              </ReactFlow>
            </NetworkErrorBoundary>

            {/* Shown while one finger scrolls the page over the canvas in two-finger mode (touch only,
                so it is a visual hint: screen reader gestures do not pan the canvas, and keyboard users
                have the toolbar's fullscreen button). Only its big fullscreen button takes taps, and only
                while the hint is visible; everywhere else taps reach the canvas. */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-4 bg-black/55 text-center transition-opacity duration-200 ${
                touchHintVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="text-[16px] font-semibold text-white">Use two fingers to move the network</p>
              {showFullscreenButton && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={onToggleFullscreen}
                  // A big version of the pane header's tool buttons: pane grey, Houdini's dark outline and
                  // the blue-grey `#474e62` menu highlight when pressed
                  className={`flex items-center gap-3 min-h-14 px-5 rounded-[4px] bg-[#383838] border border-[#262626] shadow-[0_2px_8px_rgba(0,0,0,0.5)] text-[15px] text-[#d6d6d6] active:bg-[#474e62] active:text-white cursor-pointer ${
                    touchHintVisible ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                >
                  <Maximize2 className="w-7 h-7 text-[#c0c0c0]" aria-hidden="true" />
                  Open fullscreen
                </button>
              )}
            </div>
          </div>
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
 * Embeddable, strictly view-only viewer component for SideFX Houdini networks (NOP).
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
        // `nop-root` scopes the library stylesheet's reset (see `src/styles/reset.css`). The CSS
        // fullscreen fallback sits above host page headers, which often use z-index 1000 or more.
        fullscreen.isFullscreen
          ? `nop-root fixed inset-0 z-[2147483000] ${CANVAS_BG_CLASS} pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]`
          : `nop-root w-full h-full min-h-80 relative ${props.className ?? ''}`
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
