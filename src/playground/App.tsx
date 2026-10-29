import React, { Suspense, useEffect, useRef, useState } from 'react';
import { ClipboardPaste, FileUp, Network } from 'lucide-react';
import { HoudiniNetwork, type HoudiniNetworkDocument } from '../api';
import { NetworkErrorState } from '../components/hud/NetworkErrorState';
import { NetworkLoadingState } from '../components/hud/NetworkLoadingState';
import { TOUCH_TARGET } from '../components/hud/touchTarget';
import { registerLabsIcons } from '../components/nodes/icons/iconRegistry';
import { LABS_BUILTIN_ICON_ALIASES, LABS_ICONS } from '../components/nodes/icons/labs';
import { AboutBlock } from './AboutBlock';
import { EmbedDialog } from './EmbedDialog';
import { AVAILABLE_EXAMPLES, exampleFileUrl, findExample, loadExample, type PlaygroundExample } from './examples';
import { ExporterDialog } from './ExporterDialog';
import { FeedbackDialog } from './FeedbackDialog';
import { NetworksPanel, type NetworksPanelSection } from './NetworksPanel';
import { PaneTabStrip } from './PaneTabStrip';
import { FEEDBACK_ACCESS_KEY } from './sendFeedback';
import { useMediaQuery } from './useMediaQuery';
import { useNetworkFileLoader, type LoadedNetwork } from './useNetworkFileLoader';
import { WelcomeDialog } from './WelcomeDialog';

/**
 * Icon Review Gallery: an internal tool for the icon artwork, only in the dev server (`npm.cmd run dev`)
 * and only through a `?icons` link, so the Networks pane lists networks only. The production check
 * removes the import, so the gallery is not part of the hosted playground.
 */
const IconReviewGallery = import.meta.env.DEV
  ? React.lazy(() => import('./IconReviewGallery').then((module) => ({ default: module.IconReviewGallery })))
  : null;

// The playground shows Labs tools in its examples and in the icon gallery, so it bundles their
// drawings up front (embeds load them on demand, see `loadLabsIcons`)
registerLabsIcons(LABS_ICONS, LABS_BUILTIN_ICON_ALIASES);

type ExampleState = { status: 'loading' } | { status: 'ready'; doc: HoudiniNetworkDocument } | { status: 'error'; message: string };

/**
 * Loads the example networks on demand and keeps the loaded ones, so a visitor who only wants to
 * open their own file does not wait for them.
 */
function useExampleNetworks(active: PlaygroundExample | undefined): Partial<Record<string, ExampleState>> {
  const [examples, setExamples] = useState<Partial<Record<string, ExampleState>>>({});
  useEffect(() => {
    if (!active || examples[active.key]) return;
    const { key } = active;
    setExamples((current) => ({ ...current, [key]: { status: 'loading' } }));
    loadExample(active).then(
      (data) => setExamples((current) => ({ ...current, [key]: { status: 'ready', doc: data as HoudiniNetworkDocument } })),
      (err: unknown) =>
        setExamples((current) => ({ ...current, [key]: { status: 'error', message: err instanceof Error ? err.message : String(err) } })),
    );
  }, [active, examples]);
  return examples;
}

/** An example key, `custom` (the visitor's own file) or `icons` (the dev-only icon gallery). */
type PlaygroundTab = string;

/**
 * First thing on screen: the icon gallery for a `?icons` link in the dev server, else the example a
 * `?example=<key>` link names, else the first example.
 */
function initialTab(): PlaygroundTab {
  const params = new URLSearchParams(window.location.search);
  if (IconReviewGallery && params.has('icons')) return 'icons';
  const requested = findExample(params.get('example'));
  return (requested ?? AVAILABLE_EXAMPLES[0])?.key ?? 'custom';
}

/** Local storage key that remembers the welcome card was closed once. */
const WELCOME_SEEN_KEY = 'nop-playground-welcome-seen';

/** Whether this browser has closed the welcome card before (storage may be blocked: then not). */
function welcomeSeen(): boolean {
  try {
    return window.localStorage.getItem(WELCOME_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

/** Remembers that the welcome card was closed; without storage it simply shows again next time. */
function rememberWelcomeSeen(): void {
  try {
    window.localStorage.setItem(WELCOME_SEEN_KEY, '1');
  } catch {
    // Blocked storage (private mode, site data off): nothing to remember
  }
}

/** Screens at least this wide show the networks panel beside the network; narrower ones fold it. */
const WIDE_SCREEN_QUERY = '(min-width: 768px)';

/** Button at the top of the Networks pane, in Houdini's raised button grey with the blue-grey highlight on hover. */
const PANEL_ACTION = `flex-1 min-w-0 flex items-center justify-center gap-1.5 h-7 px-2 rounded-[3px] bg-[#444444] text-[13px] text-[#d6d6d6] hover:bg-[#474e62] hover:text-white transition-colors cursor-pointer ${TOUCH_TARGET}`;

/** NOP icon (orange square, web cut out) from public/, relative to the page so it also works from a sub-path. */
const LOGO_URL = `${import.meta.env.BASE_URL}favicon.svg`;

/** Node count of a network for the panel rows. */
const nodeCountText = (doc: HoudiniNetworkDocument) => `${doc.root.nodes.length} nodes`;

/**
 * Interactive Playground application for testing and showcasing NOP, laid out like a Houdini
 * desktop: a collapsible networks pane beside the network view, and a status bar. The pane holds
 * the examples, the open and paste buttons for a visitor's own export, the exporter download and
 * Embed (the code for a website). A welcome card introduces the playground on the first visit.
 */
export const App: React.FC = () => {
  const [tab, setTab] = useState<PlaygroundTab>(initialTab);
  const [loaded, setLoaded] = useState<LoadedNetwork | null>(null);
  const [exporterOpen, setExporterOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [embedOpen, setEmbedOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(() => !welcomeSeen());
  const wideScreen = useMediaQuery(WIDE_SCREEN_QUERY);
  // The panel starts open on wide screens and folded on phones, and follows the screen when it changes
  const [panelOpen, setPanelOpen] = useState(wideScreen);
  useEffect(() => setPanelOpen(wideScreen), [wideScreen]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const loader = useNetworkFileLoader((network) => {
    setLoaded(network);
    setTab('custom');
    // On phones the panel floats over the network: get it out of the way to show the loaded file
    if (!wideScreen) setPanelOpen(false);
  });

  const activeExample = findExample(tab);
  const examples = useExampleNetworks(activeExample);
  const exampleState = activeExample ? examples[activeExample.key] : undefined;
  const activeDocument: HoudiniNetworkDocument | null =
    tab === 'custom' && loaded ? loaded.doc : exampleState?.status === 'ready' ? exampleState.doc : null;
  const activeLabel =
    tab === 'icons' ? 'Icons Overview' : tab === 'custom' && loaded ? loaded.sourceName : (activeExample?.label ?? '');
  const activeNetworkName =
    tab === 'icons' ? activeLabel : tab === 'custom' && loaded ? `own file: ${activeLabel}` : `example: ${activeLabel}`;
  // Examples are published next to the page, so their snippet works as it is; an own file is named for the visitor to upload
  const embedFileUrl = activeExample ? exampleFileUrl(activeExample) : loaded ? loaded.sourceName : 'my-network.json';

  const sections: NetworksPanelSection[] = [
    {
      title: 'Examples',
      items: AVAILABLE_EXAMPLES.map((example) => {
        const state = examples[example.key];
        return {
          key: example.key,
          label: example.label,
          description: example.description,
          detail: state?.status === 'ready' ? nodeCountText(state.doc) : undefined,
          icon: Network,
        };
      }),
    },
    {
      title: 'Your File',
      items: loaded
        ? [{ key: 'custom', label: loaded.sourceName, detail: nodeCountText(loaded.doc), title: `Your network: ${loaded.sourceName}`, icon: FileUp }]
        : [],
    },
  ];

  const selectNetwork = (key: string) => {
    setTab(key);
    // On phones the panel floats over the network: get it out of the way once a network is chosen
    if (!wideScreen) setPanelOpen(false);
  };

  return (
    <div className="flex flex-col h-dvh w-full bg-[#222222] text-[#d6d6d6] overflow-hidden font-sans">
      {/* No menu bar: the name shows in the Networks pane and the status bar, the heading stays for screen readers */}
      <h1 className="sr-only">NOP Playground</h1>

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

      {/* Panes with Houdini's dark `#222222` gutters between them */}
      <div className="relative flex-1 min-h-0 flex gap-1 p-1">
        <NetworksPanel
          sections={sections}
          activeKey={tab}
          onSelect={selectNetwork}
          collapsed={!panelOpen}
          onToggleCollapsed={() => setPanelOpen((open) => !open)}
          overlay={!wideScreen}
          actions={
            <div className="flex gap-1 p-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Open a .json file made with the NOP exporter (or drop it on the page)"
                className={PANEL_ACTION}
              >
                <FileUp className="shrink-0 w-3.5 h-3.5" aria-hidden="true" />
                <span className="truncate">Open file</span>
              </button>
              <button
                type="button"
                onClick={loader.pasteFromClipboard}
                title="Paste from Houdini: JSON copied with the NOP shelf tool (or press Ctrl+V)"
                className={PANEL_ACTION}
              >
                <ClipboardPaste className="shrink-0 w-3.5 h-3.5" aria-hidden="true" />
                <span className="truncate">Paste</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                tabIndex={-1}
                aria-hidden="true"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) loader.openFile(file);
                  // Cleared so that choosing the same file again reloads it
                  event.target.value = '';
                }}
              />
            </div>
          }
          footer={
            <AboutBlock
              onOpenExporter={() => setExporterOpen(true)}
              onOpenEmbed={activeDocument && tab !== 'icons' ? () => setEmbedOpen(true) : undefined}
              onOpenHelp={() => setWelcomeOpen(true)}
              onOpenFeedback={FEEDBACK_ACCESS_KEY ? () => setFeedbackOpen(true) : undefined}
            />
          }
        />

        <section aria-label="Network view" className="flex-1 min-w-0 flex flex-col bg-[#383838]">
          <PaneTabStrip label={activeLabel} />
          {/* Main Canvas or Icon Overview Area */}
          <main id="playground-main" className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
            {tab === 'icons' && IconReviewGallery ? (
              <Suspense fallback={null}>
                <IconReviewGallery />
              </Suspense>
            ) : activeDocument ? (
              <HoudiniNetwork data={activeDocument} fitView showToolbar showDebugActions hotkeys="hover" touchPan="one-finger" />
            ) : exampleState?.status === 'error' ? (
              <NetworkErrorState message={exampleState.message} hint="The example network could not be loaded. Reload the page to try again." />
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
        </section>
      </div>

      {/* Status bar in the Houdini 22 style (`#2d2d2d`) */}
      <footer className="shrink-0 flex flex-wrap items-center justify-between gap-x-4 px-2 py-0.5 bg-[#2d2d2d] text-[12px] text-[#a8a8a8]">
        <span className="flex items-center gap-1.5">
          {/* The pane's logo is out of sight while it is folded, so the status bar names the product */}
          {!panelOpen && (
            <>
              <img src={LOGO_URL} alt="" width={14} height={14} className="w-3.5 h-3.5" />
              <span className="font-bold text-[#dddddd]">NOP</span>
            </>
          )}
          <span>
            Not affiliated with SideFX.
            <span className="hidden lg:inline"> Independent project, not endorsed by SideFX. Houdini is a trademark of Side Effects Software Inc.</span>
          </span>
        </span>
        <span className="flex flex-wrap items-center gap-x-3">
          {activeDocument?.houdiniVersion && (
            <span title="Houdini version the network on screen was exported from">Houdini {activeDocument.houdiniVersion}</span>
          )}
          <span title="Version of the NOP exporter on the Exporter download">Exporter {__NOP_VERSION__}</span>
          <span>MIT License, Emil Judin</span>
        </span>
      </footer>

      <ExporterDialog open={exporterOpen} onClose={() => setExporterOpen(false)} />
      <EmbedDialog open={embedOpen} onClose={() => setEmbedOpen(false)} suggestedFileName={embedFileUrl} isOwnFile={tab === 'custom'} />
      <WelcomeDialog
        open={welcomeOpen}
        onClose={() => {
          setWelcomeOpen(false);
          rememberWelcomeSeen();
        }}
      />
      {FEEDBACK_ACCESS_KEY && (
        <FeedbackDialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} networkName={activeNetworkName} />
      )}
    </div>
  );
};
