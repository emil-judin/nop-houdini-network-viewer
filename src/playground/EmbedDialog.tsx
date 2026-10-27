import React, { useEffect, useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { TOUCH_TARGET } from '../components/hud/touchTarget';
import {
  DEFAULT_EMBED_OPTIONS,
  buildIframeSnippet,
  buildReactSnippet,
  buildWebComponentSnippet,
  type EmbedSnippetOptions,
} from './embedSnippets';
import { PlaygroundDialog } from './PlaygroundDialog';

/** jsDelivr serves every npm release, so the snippet works as soon as the package is published. */
const WEB_COMPONENT_URL = `https://cdn.jsdelivr.net/npm/${__WOP_PACKAGE_NAME__}@${__WOP_VERSION__}/dist/web-component.js`;

/**
 * `false` until the package is on npm (Milestone 4). The HTML and React snippets need the npm
 * package or its CDN copy, so until then the dialog says so and points to the iframe tab.
 */
const PUBLISHED_ON_NPM = false;

type SnippetTab = 'html' | 'react' | 'iframe';

const TABS: Array<{ id: SnippetTab; label: string; help: string; needsNpm: boolean }> = [
  {
    id: 'html',
    label: 'HTML',
    help: 'For any website where you can add HTML (static sites, WordPress, Cargo). Upload the exported .json file next to the page.',
    needsNpm: true,
  },
  {
    id: 'react',
    label: 'React',
    help: 'For React, Next.js or Astro sites. Install with: npm install wop-houdini-network-viewer',
    needsNpm: true,
  },
  {
    id: 'iframe',
    label: 'iframe',
    help: 'For platforms that only accept iframes (ArtStation, Notion). The .json file needs a full https:// address that allows cross-origin requests (CORS), for example a GitHub Gist raw link.',
    needsNpm: false,
  },
];

/** Smallest and largest embed height the dialog offers, in pixels. */
const MIN_HEIGHT_PX = 240;
const MAX_HEIGHT_PX = 4000;

/** Height for the snippet from what is typed in the field: a whole number between the limits. */
function clampHeight(text: string): number {
  const value = Number(text);
  if (!Number.isFinite(value) || value <= 0) return DEFAULT_EMBED_OPTIONS.heightPx;
  return Math.min(MAX_HEIGHT_PX, Math.max(MIN_HEIGHT_PX, Math.round(value)));
}

/**
 * Props for the playground's Embed code dialog (`EmbedDialog`).
 */
export interface EmbedDialogProps {
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the dialog closes (close button, Escape, or backdrop click). */
  onClose: () => void;
  /** Suggested file name for the network on screen (for example `circuit_gen.json`). */
  suggestedFileName: string;
}

/**
 * Embed code generator: pick viewer options and copy a ready-to-paste snippet for plain HTML
 * (`<houdini-network>` web component), React (`<HoudiniNetwork />`) or an `<iframe>`.
 */
export const EmbedDialog: React.FC<EmbedDialogProps> = ({ open, onClose, suggestedFileName }) => {
  const [tab, setTab] = useState<SnippetTab>('html');
  const [options, setOptions] = useState<EmbedSnippetOptions>({ ...DEFAULT_EMBED_OPTIONS, jsonUrl: suggestedFileName });
  const [copied, setCopied] = useState(false);
  // The height field keeps what is typed (clearing it to type "800" works); the snippet uses the clamped number
  const [heightText, setHeightText] = useState(String(DEFAULT_EMBED_OPTIONS.heightPx));

  useEffect(() => {
    setOptions((o) => ({ ...o, jsonUrl: suggestedFileName }));
  }, [suggestedFileName]);

  const snippet = useMemo(() => {
    if (tab === 'react') return buildReactSnippet(options);
    if (tab === 'iframe') return buildIframeSnippet(options, window.location.href);
    return buildWebComponentSnippet(options, WEB_COMPONENT_URL);
  }, [tab, options]);

  const update = <K extends keyof EmbedSnippetOptions>(key: K, value: EmbedSnippetOptions[K]) =>
    setOptions((o) => ({ ...o, [key]: value }));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // The snippet stays selectable for a manual copy
    }
  };

  const needsAbsoluteUrl = tab === 'iframe' && !/^https?:\/\//i.test(options.jsonUrl);
  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <PlaygroundDialog open={open} onClose={onClose} title="Embed this network on your website">
      <div className="overflow-y-auto px-4 py-3 space-y-3 text-xs">
        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-[#d2dcfb]">Network file URL (where you upload the exported .json)</span>
            <input
              type="text"
              value={options.jsonUrl}
              onChange={(e) => update('jsonUrl', e.target.value)}
              spellCheck={false}
              className="h-9 px-2 rounded-[3px] border border-transparent bg-[#434343] font-mono text-base sm:text-[13px] text-white focus:outline-none focus:border-[#7082b9]"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[#d2dcfb]">Height (px)</span>
            <input
              type="number"
              min={MIN_HEIGHT_PX}
              max={MAX_HEIGHT_PX}
              step={20}
              value={heightText}
              onChange={(e) => {
                setHeightText(e.target.value);
                update('heightPx', clampHeight(e.target.value));
              }}
              onBlur={() => setHeightText(String(clampHeight(heightText)))}
              className="h-9 px-2 rounded-[3px] border border-transparent bg-[#434343] text-base sm:text-[13px] text-white focus:outline-none focus:border-[#7082b9]"
            />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-[#d2dcfb]">Label size</span>
              <select
                value={options.labelSize}
                onChange={(e) => update('labelSize', e.target.value as EmbedSnippetOptions['labelSize'])}
                className="h-9 px-1.5 rounded-[3px] border border-transparent bg-[#434343] text-base sm:text-[13px] text-white"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[#d2dcfb]">Wires</span>
              <select
                value={options.wireStyle}
                onChange={(e) => update('wireStyle', e.target.value as EmbedSnippetOptions['wireStyle'])}
                className="h-9 px-1.5 rounded-[3px] border border-transparent bg-[#434343] text-base sm:text-[13px] text-white"
              >
                <option value="auto">As exported</option>
                <option value="default">Default</option>
                <option value="rounded">Rounded</option>
              </select>
            </label>
          </div>
          <div className="sm:col-span-2 flex flex-wrap gap-x-5 gap-y-1">
            {(
              [
                ['showToolbar', 'Toolbar'],
                ['showMiniMap', 'Minimap'],
                ['showInspector', 'Parameter Inspector'],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 min-h-9 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={(e) => update(key, e.target.checked)}
                  className="w-4 h-4 accent-[#7082b9]"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Snippet tabs */}
        <div>
          <div role="tablist" aria-label="Embed type" className="flex gap-0.5 pb-1 border-b-2 border-[#1f1f1f]">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`h-6 px-2 rounded-[3px] text-[13px] cursor-pointer ${TOUCH_TARGET} ${
                  tab === t.id ? 'bg-[#474e62] text-white font-bold' : 'text-[#a6a6a6] hover:text-[#dddddd]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[#d2dcfb]">{activeTab.help}</p>
          {activeTab.needsNpm && !PUBLISHED_ON_NPM && (
            <p className="mt-1 text-[#e0b070]">
              Not on npm yet (tester release): this snippet starts working with the public release. For now, use the
              iframe tab.
            </p>
          )}
          {needsAbsoluteUrl && (
            <p className="mt-1 text-[#e0b070]">
              The file URL above is relative. An iframe loads it from this playground, so use a full https:// address.
            </p>
          )}
          <div className="relative mt-2">
            <pre className="m-0 max-h-72 overflow-auto rounded-[2px] border border-[#3a3a3a] bg-[#141414] p-3 pr-20 font-mono text-[12px] leading-[1.5] text-[#d6d6d6] whitespace-pre select-text">
              {snippet}
            </pre>
            <button
              type="button"
              onClick={handleCopy}
              className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-[3px] bg-[#474e62] hover:bg-[#535b72] text-white text-[12px] cursor-pointer ${TOUCH_TARGET}`}
            >
              {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </PlaygroundDialog>
  );
};
