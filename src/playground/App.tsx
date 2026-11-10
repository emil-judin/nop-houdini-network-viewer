import React, { Suspense, useEffect, useRef, useState } from 'react';
import { ClipboardPaste, FileUp, Network } from 'lucide-react';
import { HoudiniNetwork, type HoudiniNetworkDocument } from '../api';
import { NetworkErrorState } from '../components/hud/NetworkErrorState';
import { NetworkLoadingState } from '../components/hud/NetworkLoadingState';
import { TOUCH_TARGET, TOUCH_TARGET_COMPACT } from '../components/hud/touchTarget';
import { registerLabsIcons } from '../components/nodes/icons/iconRegistry';
import { LABS_BUILTIN_ICON_ALIASES, LABS_ICONS } from '../components/nodes/icons/labs';
import { AboutBlock } from './AboutBlock';
import { AVAILABLE_EXAMPLES, exampleNodeCount, findExample, loadExample, type PlaygroundExample } from './examples';
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

/** An example key, the key of one of the visitor's own files (`file-1`) or `icons` (the dev-only icon gallery). */
type PlaygroundTab = string;

/** One of the visitor's own networks (opened, dropped or pasted), kept for this visit only. */
interface OwnFile {
  /** Row key, also the tab key (`file-1`, `file-2`, ...). */
  key: string;
  /** Name in the list: the file name, or "Pasted: <network>" for the clipboard. */
  label: string;
  /** Normalized network document. */
  doc: HoudiniNetworkDocument;
}

/** Name of an own network in the list. Pastes are named after the network they hold. */
function ownFileLabel({ doc, sourceName }: LoadedNetwork): string {
  if (sourceName !== 'Clipboard') return sourceName;
  const name = doc.root.path.split('/').filter(Boolean).pop();
  return `Pasted: ${name ?? 'network'}`;
}

/**
 * First thing on screen: the icon gallery for a `?icons` link in the dev server, else the example a
 * `?example=<key>` link names, else the first example.
 */
function initialTab(): PlaygroundTab {
  const params = new URLSearchParams(window.location.search);
  if (IconReviewGallery && params.has('icons')) return 'icons';
  const requested = findExample(params.get('example'));
  return (requested ?? AVAILABLE_EXAMPLES[0])?.key ?? '';
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

/**
 * Button of the open and paste box: `primary` in Houdini's blue-grey (Open file, the main action),
 * else its raised grey. 36px high on touch screens.
 */
const panelAction = (primary: boolean) =>
  `min-w-0 flex items-center justify-center gap-1.5 h-7 px-3 rounded-[3px] text-[13px] transition-colors cursor-pointer ${TOUCH_TARGET_COMPACT} ${
    primary ? 'bg-[#474e62] hover:bg-[#535b72] text-white' : 'bg-[#444444] hover:bg-[#4e4e4e] text-[#d6d6d6] hover:text-white'
  }`;

/**
 * Dashed frame of the open and paste drop zone in `color`: an SVG outline, because a CSS dashed
 * border cannot set the length of its dashes and gaps (here 6px dashes, 5px apart). The stroke is
 * 2px wide and half of it is clipped by the box edge, so 1px shows.
 */
const openBoxFrame = (color: string): React.CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' rx='3' fill='none' stroke='${color}' stroke-width='2' stroke-dasharray='6 5'/></svg>`,
  )}")`,
});

/** NOP icon (orange square, web cut out) from public/, relative to the page so it also works from a sub-path. */
const LOGO_URL = `${import.meta.env.BASE_URL}favicon.svg`;

/** Node count of a network for the panel rows. */
const nodeCountText = (count: number) => `${count} nodes`;

/**
 * Interactive Playground application for testing and showcasing NOP, laid out like a Houdini
 * desktop: a collapsible networks pane beside the network view, and a status bar. The pane holds
 * the examples, the visitor's own networks with the open and paste buttons, the exporter download and
 * Embed (the example page with an example network and its code, in a new tab). A welcome card
 * introduces the playground on the first visit.
 */
export const App: React.FC = () => {
  const [tab, setTab] = useState<PlaygroundTab>(initialTab);
  const [ownFiles, setOwnFiles] = useState<OwnFile[]>([]);
  const ownFilesRef = useRef(ownFiles);
  ownFilesRef.current = ownFiles;
  const nextFileIdRef = useRef(1);
  const [exporterOpen, setExporterOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(() => !welcomeSeen());
  const wideScreen = useMediaQuery(WIDE_SCREEN_QUERY);
  // The panel starts open on wide screens and folded on phones, and follows the screen when it changes
  const [panelOpen, setPanelOpen] = useState(wideScreen);
  useEffect(() => setPanelOpen(wideScreen), [wideScreen]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const loader = useNetworkFileLoader((network) => {
    // A new name adds a row; the same file (or the same network pasted) again reloads its row
    const label = ownFileLabel(network);
    const existing = ownFilesRef.current.find((file) => file.label === label);
    const file: OwnFile = { key: existing?.key ?? `file-${nextFileIdRef.current++}`, label, doc: network.doc };
    setOwnFiles((files) => (existing ? files.map((f) => (f.key === file.key ? file : f)) : [...files, file]));
    setTab(file.key);
    // On phones the panel floats over the network: get it out of the way to show the loaded file
    if (!wideScreen) setPanelOpen(false);
  });

  const activeExample = findExample(tab);
  const examples = useExampleNetworks(activeExample);
  const exampleState = activeExample ? examples[activeExample.key] : undefined;
  const activeFile = ownFiles.find((file) => file.key === tab);
  const activeDocument: HoudiniNetworkDocument | null = activeFile
    ? activeFile.doc
    : exampleState?.status === 'ready'
      ? exampleState.doc
      : null;
  const activeLabel = tab === 'icons' ? 'Icons Overview' : (activeFile?.label ?? activeExample?.label ?? '');
  const activeNetworkName = tab === 'icons' ? activeLabel : activeFile ? `own file: ${activeLabel}` : `example: ${activeLabel}`;

  const sections: NetworksPanelSection[] = [
    {
      title: 'Examples',
      items: AVAILABLE_EXAMPLES.map((example) => {
        const state = examples[example.key];
        // Known from the build before the example is loaded, so every row shows it from the start
        const count = state?.status === 'ready' ? state.doc.root.nodes.length : exampleNodeCount(example);
        return {
          key: example.key,
          label: example.label,
          description: example.description,
          detail: count === undefined ? undefined : nodeCountText(count),
          icon: Network,
        };
      }),
    },
  ];

  // Right under the examples and always in view, with each opened or pasted network as a row
  // between the title and the open and paste box (owner decision 2026-11-04)
  const ownSection: NetworksPanelSection = {
    title: 'Your Files',
    emptyText: 'No networks uploaded',
    items: ownFiles.map((file) => ({
      key: file.key,
      label: file.label,
      detail: nodeCountText(file.doc.root.nodes.length),
      title: `Your network: ${file.label}`,
      icon: FileUp,
    })),
  };
  const openTools = (
    // A drop zone: centered, set slightly into the pane, with an icon and "Drop ... here" as its main
    // line (owner decision 2026-11-05). It lights up blue while a file is dragged over the page.
    <div
      className={`mx-2 mt-3 mb-2 px-3 py-4 rounded-[3px] text-center transition-colors ${loader.isDragging ? 'bg-[#3b4052]' : 'bg-[#333333]'}`}
      style={openBoxFrame(loader.isDragging ? '#7082b9' : '#6a6a6a')}
    >
      {/* Phones and tablets cannot drag files onto a page: there the box shows only the buttons */}
      <div className="[@media(pointer:coarse)]:hidden">
        <FileUp
          className={`w-6 h-6 mx-auto transition-colors ${loader.isDragging ? 'text-[#9aaae0]' : 'text-[#8c8c8c]'}`}
          aria-hidden="true"
        />
        <p className="mt-1.5 text-[13px] text-[#d6d6d6]">Drop a .json file here</p>
      </div>
      <div className="mt-2.5 [@media(pointer:coarse)]:mt-0 flex justify-center gap-1">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Open a .json file made with the NOP exporter (or drop it on the page)"
          className={panelAction(true)}
        >
          <FileUp className="shrink-0 w-3.5 h-3.5" aria-hidden="true" />
          <span className="truncate">Open file</span>
        </button>
        <button
          type="button"
          onClick={loader.pasteFromClipboard}
          title="Paste from Houdini: JSON copied with the NOP shelf tool (or press Ctrl+V)"
          className={panelAction(false)}
        >
          <ClipboardPaste className="shrink-0 w-3.5 h-3.5" aria-hidden="true" />
          <span className="truncate">Paste</span>
        </button>
      </div>
      <p className="mt-2 text-[12px] leading-[1.35] text-[#a8a8a8]">Files stay in your browser.</p>
    </div>
  );

  const closeWelcome = () => {
    setWelcomeOpen(false);
    rememberWelcomeSeen();
  };

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
          pinnedSection={ownSection}
          pinnedContent={openTools}
          footer={
            <AboutBlock
              onOpenExporter={() => setExporterOpen(true)}
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
        {/* Phones: the NOP icon, name and version, and the SideFX disclaimer (owner decisions 2026-11-05) */}
        <span className="flex md:hidden items-center gap-1.5">
          <img src={LOGO_URL} alt="" width={14} height={14} className="w-3.5 h-3.5" />
          <span className="font-bold text-[#dddddd]">NOP</span>
          <span title="Version of this playground page">{__NOP_VERSION__}</span>
        </span>
        <span className="md:hidden">Not affiliated with SideFX.</span>
        <span className="hidden md:flex items-center gap-1.5">
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
        <span className="hidden md:flex flex-wrap items-center gap-x-3">
          {activeDocument?.houdiniVersion && (
            <span title="Houdini version the network on screen was exported from">Houdini {activeDocument.houdiniVersion}</span>
          )}
          <span title="Version of the NOP exporter on the Exporter download">Exporter {__NOP_VERSION__}</span>
          {/* The page's own version, here since the about block lost its version line (2026-11-05) */}
          <span title="Version of this playground page">Playground {__NOP_VERSION__}</span>
          <span>MIT License, Emil Judin</span>
        </span>
      </footer>

      {/* Outside the Networks pane, so Open file works even while the pane is folded */}
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
      <ExporterDialog open={exporterOpen} onClose={() => setExporterOpen(false)} />
      <WelcomeDialog
        open={welcomeOpen}
        onClose={closeWelcome}
        onOpenExporter={() => {
          closeWelcome();
          setExporterOpen(true);
        }}
      />
      {FEEDBACK_ACCESS_KEY && (
        <FeedbackDialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} networkName={activeNetworkName} />
      )}
    </div>
  );
};
