import React, { useRef, useState } from 'react';
import { ClipboardPaste, Code2, FileUp, FolderOpen, Grid } from 'lucide-react';
import boardNetwork from '../../fixtures/circuit_board-network.json';
import circuitNetwork from '../../fixtures/circuit_gen-network.json';
import { HoudiniNetwork } from '../components/HoudiniNetwork';
import { TOUCH_TARGET } from '../components/hud/touchTarget';
import { OPERATOR_ICONS } from '../components/nodes/icons/iconRegistry';
import type { HoudiniNetworkDocument } from '../schema/types';
import { EmbedDialog } from './EmbedDialog';
import { IconReviewGallery } from './IconReviewGallery';
import { useNetworkFileLoader, type LoadedNetwork } from './useNetworkFileLoader';

const circuitDoc = circuitNetwork as unknown as HoudiniNetworkDocument;
const boardDoc = boardNetwork as unknown as HoudiniNetworkDocument;

/** Bundled demo networks (exported from Houdini 22); node counts are read from the files. */
const DEMO_NETWORKS: Record<'circuit' | 'board', { label: string; detail: string; doc: HoudiniNetworkDocument }> = {
  circuit: {
    label: 'Circuit Gen HDA',
    detail: `${circuitDoc.root.nodes.length} Nodes`,
    doc: circuitDoc,
  },
  board: {
    label: 'Circuit Board',
    detail: `${boardDoc.root.nodes.length} Nodes`,
    doc: boardDoc,
  },
};

type PlaygroundTab = 'circuit' | 'board' | 'custom' | 'icons';

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
  const [tab, setTab] = useState<PlaygroundTab>('circuit');
  const [loaded, setLoaded] = useState<LoadedNetwork | null>(null);
  const [embedOpen, setEmbedOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loader = useNetworkFileLoader((network) => {
    setLoaded(network);
    setTab('custom');
  });

  const activeDocument =
    tab === 'custom' && loaded ? loaded.doc : DEMO_NETWORKS[tab === 'board' ? 'board' : 'circuit'].doc;

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
          <span className="font-bold text-[14px] text-[#dddddd]">WOP</span>
          <span className="hidden xl:inline text-[12px] text-[#9a9a9a]">View and share Houdini node networks on the web</span>
          <span className="hidden sm:inline h-5 px-1.5 leading-5 rounded-[3px] bg-[#434343] text-[12px] text-[#dddddd] font-mono">
            Houdini {activeDocument.houdiniVersion}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Network selector */}
          <div role="tablist" aria-label="Network" className="flex flex-wrap items-center gap-0.5">
            {(['circuit', 'board'] as const).map((key) => (
              <button key={key} type="button" onClick={() => setTab(key)} className={tabButtonClass(tab === key)}>
                <span>
                  {DEMO_NETWORKS[key].label}
                  <span className="hidden md:inline"> ({DEMO_NETWORKS[key].detail})</span>
                </span>
              </button>
            ))}
            {loaded && (
              <button
                type="button"
                onClick={() => setTab('custom')}
                title={`Your network: ${loaded.sourceName}`}
                className={tabButtonClass(tab === 'custom')}
              >
                <FileUp className="w-3.5 h-3.5" />
                <span className="max-w-36 truncate">{loaded.sourceName}</span>
              </button>
            )}
            <button type="button" onClick={() => setTab('icons')} className={tabButtonClass(tab === 'icons')}>
              <Grid className="w-3.5 h-3.5" />
              <span>
                Icons<span className="hidden md:inline"> Overview ({OPERATOR_ICONS.length + 1})</span>
              </span>
            </button>
          </div>

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
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Open<span className="hidden sm:inline"> .json</span></span>
          </button>
          <button
            type="button"
            onClick={loader.pasteFromClipboard}
            title="Paste JSON copied with the WOP shelf tool (or press Ctrl+V)"
            className={HEADER_BUTTON}
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
            <span>Paste<span className="hidden sm:inline"> from Houdini</span></span>
          </button>
          {tab !== 'icons' && (
            <button
              type="button"
              onClick={() => setEmbedOpen(true)}
              title="Get the code to show this network on your website"
              className={HEADER_BUTTON}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Embed</span>
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
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {tab === 'icons' ? (
          <IconReviewGallery />
        ) : (
          <HoudiniNetwork data={activeDocument} fitView showMiniMap showToolbar showDebugActions />
        )}

        {loader.isDragging && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#1a1a1a]/80 pointer-events-none">
            <div className="rounded-[3px] border-2 border-dashed border-[#7082b9] bg-[#2d2d2d] px-8 py-6 text-center">
              <FileUp className="w-8 h-8 mx-auto text-[#7082b9]" />
              <p className="mt-2 text-[14px] font-bold text-[#dddddd]">Drop your Houdini network .json file</p>
              <p className="mt-1 text-[12px] text-[#a6a6a6]">It stays in your browser and is never uploaded.</p>
            </div>
          </div>
        )}
      </main>

      <footer className="shrink-0 border-t border-[#1f1f1f] px-3 py-1 text-[11px] text-[#8a8a8a] flex flex-wrap justify-between gap-x-4">
        <span>
          Not affiliated with SideFX.
          <span className="hidden sm:inline"> Independent project, not endorsed by SideFX. Houdini is a trademark of Side Effects Software Inc.</span>
        </span>
        <span>MIT License, Emil Judin</span>
      </footer>

      <EmbedDialog
        open={embedOpen}
        onClose={() => setEmbedOpen(false)}
        suggestedFileName={suggestFileName(activeDocument, tab === 'custom' ? loaded : null)}
      />
    </div>
  );
};
