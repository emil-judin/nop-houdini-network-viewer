import React, { Suspense, useEffect, useRef, useState } from 'react';
import { ClipboardPaste, Code2, Download, FileUp, FolderOpen, Grid, MessageSquare } from 'lucide-react';
import { HoudiniNetwork } from '../components/HoudiniNetwork';
import { NetworkErrorState } from '../components/hud/NetworkErrorState';
import { NetworkLoadingState } from '../components/hud/NetworkLoadingState';
import { TOUCH_TARGET } from '../components/hud/touchTarget';
import { OPERATOR_ICONS, registerLabsIcons } from '../components/nodes/icons/iconRegistry';
import { LABS_BUILTIN_ICON_ALIASES, LABS_ICONS } from '../components/nodes/icons/labs';
import type { HoudiniNetworkDocument } from '../schema/types';
import { EmbedDialog } from './EmbedDialog';
import { ExporterDialog } from './ExporterDialog';
import { FeedbackDialog } from './FeedbackDialog';
import { FEEDBACK_ACCESS_KEY } from './sendFeedback';
import { useNetworkFileLoader, type LoadedNetwork } from './useNetworkFileLoader';

/**
 * Icon Review Gallery: an internal tool for the icon artwork, only in the dev server (`npm.cmd run dev`).
 * The production check removes the import, so the gallery is not part of the hosted playground.
 */
const IconReviewGallery = import.meta.env.DEV
  ? React.lazy(() => import('./IconReviewGallery').then((module) => ({ default: module.IconReviewGallery })))
  : null;

// The playground shows Labs tools in its demos and in the icon gallery, so it bundles their
// drawings up front (embeds load them on demand, see `loadLabsIcons`)
registerLabsIcons(LABS_ICONS, LABS_BUILTIN_ICON_ALIASES);

type DemoKey = 'circuit' | 'board';

/**
 * Bundled demo networks (exported from Houdini 22), downloaded when first shown so a visitor who
 * only wants to open their own file does not wait for them. The small Circuit Board shows first.
 */
const DEMO_NETWORKS: Record<DemoKey, { label: string; load: () => Promise<{ default: unknown }> }> = {
  board: {
    label: 'Circuit Board',
    load: () => import('../../fixtures/circuit_board-network.json'),
  },
  circuit: {
    label: 'Circuit Gen HDA',
    load: () => import('../../fixtures/circuit_gen-network.json'),
  },
};

const DEMO_KEYS: DemoKey[] = ['board', 'circuit'];

type DemoState = { status: 'loading' } | { status: 'ready'; doc: HoudiniNetworkDocument } | { status: 'error'; message: string };

/** Loads the demo networks on demand and keeps the loaded ones. */
function useDemoNetworks(active: DemoKey | null): Partial<Record<DemoKey, DemoState>> {
  const [demos, setDemos] = useState<Partial<Record<DemoKey, DemoState>>>({});
  useEffect(() => {
    if (!active || demos[active]) return;
    setDemos((current) => ({ ...current, [active]: { status: 'loading' } }));
    DEMO_NETWORKS[active].load().then(
      (module) => setDemos((current) => ({ ...current, [active]: { status: 'ready', doc: module.default as HoudiniNetworkDocument } })),
      (err: unknown) =>
        setDemos((current) => ({ ...current, [active]: { status: 'error', message: err instanceof Error ? err.message : String(err) } })),
    );
  }, [active, demos]);
  return demos;
}

type PlaygroundTab = DemoKey | 'custom' | 'icons';

/** Houdini 22 button: blue-grey `#474e62` with white text (sampled from the Parameter Pane). */
const HEADER_BUTTON = `flex items-center justify-center gap-1.5 h-6 px-2.5 rounded-[3px] bg-[#474e62] hover:bg-[#535b72] text-[13px] text-white transition-colors cursor-pointer ${TOUCH_TARGET}`;

/**
 * Builds a file name for the network on screen, used as the default in the Embed dialog.
 */
function suggestFileName(doc: HoudiniNetworkDocument, loaded: LoadedNetwork | null): string {
  if (loaded && loaded.sourceName.toLowerCase().endsWith('.json')) return loaded.sourceName;
  const lastSegment = doc.root.path.split('/').filter(Boolean).pop() || 'my-network';
  return `${lastSegment}.json`;
}

/**
 * Interactive Playground application for testing and showcasing WOP:
 * demo networks, loading your own export (open, drop, paste), embed code, and the icon gallery.
 */
export const App: React.FC = () => {
  const [tab, setTab] = useState<PlaygroundTab>('board');
  const [loaded, setLoaded] = useState<LoadedNetwork | null>(null);
  const [embedOpen, setEmbedOpen] = useState(false);
  const [exporterOpen, setExporterOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loader = useNetworkFileLoader((network) => {
    setLoaded(network);
    setTab('custom');
  });

  const activeDemo: DemoKey | null = tab === 'board' || tab === 'circuit' ? tab : null;
  const demos = useDemoNetworks(activeDemo);
  const demoState = activeDemo ? demos[activeDemo] : undefined;
  const activeDocument: HoudiniNetworkDocument | null =
    tab === 'custom' && loaded ? loaded.doc : demoState?.status === 'ready' ? demoState.doc : null;
  const activeNetworkName =
    tab === 'icons'
      ? 'Icons Overview'
      : tab === 'custom' && loaded
        ? `own file: ${loaded.sourceName}`
        : `demo: ${DEMO_NETWORKS[activeDemo ?? 'board'].label}`;

  // Tabs of the network selector, in order, for the arrow keys (WAI-ARIA tabs pattern)
  const tabKeys: PlaygroundTab[] = [...DEMO_KEYS, ...(loaded ? (['custom'] as const) : []), ...(IconReviewGallery ? (['icons'] as const) : [])];
  const tabRefs = useRef(new Map<PlaygroundTab, HTMLButtonElement | null>());
  const handleTabKeyDown = (event: React.KeyboardEvent) => {
    const index = tabKeys.indexOf(tab);
    const targets: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabKeys.length - 1 };
    if (!Object.hasOwn(targets, event.key)) return;
    event.preventDefault();
    const next = tabKeys[(targets[event.key] + tabKeys.length) % tabKeys.length];
    setTab(next);
    tabRefs.current.get(next)?.focus();
  };
  /** Props that make a selector button an ARIA tab controlling the main area. */
  const tabProps = (key: PlaygroundTab) => ({
    id: `playground-tab-${key}`,
    role: 'tab' as const,
    'aria-selected': tab === key,
    'aria-controls': 'playground-main',
    tabIndex: tab === key ? 0 : -1,
    onKeyDown: handleTabKeyDown,
    ref: (element: HTMLButtonElement | null) => {
      tabRefs.current.set(key, element);
    },
  });

  // Houdini tab style: the active tab is a blue-grey pill with bold white text, others plain grey text
  const tabButtonClass = (active: boolean) =>
    `flex items-center gap-1.5 h-6 px-2 rounded-[3px] text-[13px] transition-colors cursor-pointer ${TOUCH_TARGET} ${
      active ? 'bg-[#474e62] text-white font-bold' : 'text-[#a6a6a6] hover:text-[#dddddd]'
    }`;

  return (
    <div className="flex flex-col h-dvh w-full bg-[#2d2d2d] text-[#dddddd] overflow-hidden font-sans">
      {/* Top bar in the Houdini pane style: pane grey with a dark separator line underneath */}
      <header className="min-h-11 shrink-0 bg-[#2d2d2d] border-b-2 border-[#1f1f1f] px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          {/* WOP icon (orange square, web cut out) from public/, relative to the page so it also works from a sub-path */}
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width={24} height={24} className="w-6 h-6" />
          <h1 className="font-bold text-[14px] text-[#dddddd]">WOP</h1>
          <span className="hidden xl:inline text-[12px] text-[#a6a6a6]">View and share Houdini node networks on the web</span>
          {activeDocument && (
            <span className="hidden sm:inline h-5 px-1.5 leading-5 rounded-[3px] bg-[#434343] text-[12px] text-[#dddddd] font-mono">
              Houdini {activeDocument.houdiniVersion}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Network selector */}
          <div role="tablist" aria-label="Network" className="flex flex-wrap items-center gap-0.5">
            {DEMO_KEYS.map((key) => {
              const demo = demos[key];
              return (
                <button key={key} type="button" {...tabProps(key)} onClick={() => setTab(key)} className={tabButtonClass(tab === key)}>
                  <span>
                    {DEMO_NETWORKS[key].label}
                    {demo?.status === 'ready' && (
                      <span className="hidden md:inline"> ({demo.doc.root.nodes.length} Nodes)</span>
                    )}
                  </span>
                </button>
              );
            })}
            {loaded && (
              <button
                type="button"
                {...tabProps('custom')}
                onClick={() => setTab('custom')}
                title={`Your network: ${loaded.sourceName}`}
                className={tabButtonClass(tab === 'custom')}
              >
                <FileUp className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="max-w-36 truncate">{loaded.sourceName}</span>
              </button>
            )}
            {IconReviewGallery && (
              <button type="button" {...tabProps('icons')} onClick={() => setTab('icons')} className={tabButtonClass(tab === 'icons')}>
                <Grid className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  Icons<span className="hidden md:inline"> Overview ({OPERATOR_ICONS.length + 1})</span>
                </span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setExporterOpen(true)}
            title="Download the WOP exporter for Houdini"
            className={HEADER_BUTTON}
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Exporter</span>
          </button>

          {/* Load your own export */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) loader.openFile(file);
              event.target.value = '';
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Open a network .json file exported with the WOP shelf tool (or drop it on the page)"
            className={HEADER_BUTTON}
          >
            <FolderOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Open<span className="hidden sm:inline"> .json</span></span>
          </button>
          <button
            type="button"
            onClick={loader.pasteFromClipboard}
            title="Paste JSON copied with the WOP shelf tool (or press Ctrl+V)"
            className={HEADER_BUTTON}
          >
            <ClipboardPaste className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Paste<span className="hidden sm:inline"> from Houdini</span></span>
          </button>
          {tab !== 'icons' && (
            <button
              type="button"
              onClick={() => setEmbedOpen(true)}
              title="Get the code to show this network on your website"
              className={HEADER_BUTTON}
            >
              <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Embed</span>
            </button>
          )}
          {FEEDBACK_ACCESS_KEY && (
            <button
              type="button"
              onClick={() => setFeedbackOpen(true)}
              title="Tell the author what worked, what broke and what is missing"
              className={HEADER_BUTTON}
            >
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Feedback</span>
            </button>
          )}
        </div>
      </header>

      {loader.error && (
        <div role="alert" className="bg-[#3d2a2a] border-b border-[#5a3434] px-3 py-1.5 text-[12px] text-[#f0c8c8] flex items-center justify-between gap-4">
          <span className="min-w-0 break-words">{loader.error}</span>
          <button
            type="button"
            onClick={loader.clearError}
            className={`shrink-0 h-6 px-2 rounded-[3px] bg-[#474e62] hover:bg-[#535b72] text-white cursor-pointer ${TOUCH_TARGET}`}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Canvas or Icon Overview Area */}
      <main
        id="playground-main"
        role="tabpanel"
        aria-labelledby={`playground-tab-${tab}`}
        className="flex-1 relative overflow-hidden flex flex-col"
      >
        {tab === 'icons' && IconReviewGallery ? (
          <Suspense fallback={null}>
            <IconReviewGallery />
          </Suspense>
        ) : activeDocument ? (
          <HoudiniNetwork data={activeDocument} fitView showMiniMap showToolbar showDebugActions hotkeys="hover" />
        ) : demoState?.status === 'error' ? (
          <NetworkErrorState message={demoState.message} hint="The demo network could not be loaded. Reload the page to try again." />
        ) : (
          <NetworkLoadingState />
        )}

        {loader.isDragging && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#1a1a1a]/80 pointer-events-none">
            <div className="rounded-[3px] border-2 border-dashed border-[#7082b9] bg-[#2d2d2d] px-8 py-6 text-center">
              <FileUp className="w-8 h-8 mx-auto text-[#7082b9]" aria-hidden="true" />
              <p className="mt-2 text-[14px] font-bold text-[#dddddd]">Drop your Houdini network .json file</p>
              <p className="mt-1 text-[12px] text-[#a6a6a6]">It stays in your browser and is never uploaded.</p>
            </div>
          </div>
        )}
      </main>

      <footer className="shrink-0 border-t border-[#1f1f1f] px-3 py-1 text-[11px] text-[#a0a0a0] flex flex-wrap justify-between gap-x-4">
        <span>
          Not affiliated with SideFX.
          <span className="hidden sm:inline"> Independent project, not endorsed by SideFX. Houdini is a trademark of Side Effects Software Inc.</span>
        </span>
        <span>MIT License, Emil Judin</span>
      </footer>

      {activeDocument && (
        <EmbedDialog
          open={embedOpen}
          onClose={() => setEmbedOpen(false)}
          suggestedFileName={suggestFileName(activeDocument, tab === 'custom' ? loaded : null)}
        />
      )}
      <ExporterDialog open={exporterOpen} onClose={() => setExporterOpen(false)} />
      {FEEDBACK_ACCESS_KEY && (
        <FeedbackDialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} networkName={activeNetworkName} />
      )}
    </div>
  );
};
