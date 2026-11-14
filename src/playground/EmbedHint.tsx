import React, { useEffect, useState } from 'react';
import { Code2, X } from 'lucide-react';
import { TOUCH_TARGET } from '../components/hud/touchTarget';
import websiteScreenshot from './assets/embed-hint/website.jpg';
import { EXAMPLE_SITE_PAGE } from './examples';

/** NOP orange, from the NOP icon (`public/favicon.svg`). */
const NOP_ORANGE = '#FE4703';

/** Local storage key that remembers the embed tip was shown, so it comes on the first visit only. */
const EMBED_HINT_SEEN_KEY = 'nop-playground-embed-hint-seen';

/** Tooltip of the tip's link, the same promise as the Embed button in the Networks pane. */
const LINK_TITLE = 'See a network on a web page and copy the code for your own website (opens a new tab)';

/** How long the visitor explores before the tip slides in, in milliseconds (owner decision 2026-11-14). */
export const EMBED_HINT_DELAY_MS = 10_000;

/** Whether this browser has been shown the tip before (storage may be blocked: then not). */
function hintSeenBefore(): boolean {
  try {
    return window.localStorage.getItem(EMBED_HINT_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Whether the embed tip is shown, and a function that closes it. The tip comes on the first visit
 * only (owner decision 2026-11-14): {@link EMBED_HINT_DELAY_MS} after the visitor started exploring
 * (`exploring` turns true: the welcome card is closed), and it stays until it is closed or the page
 * is left. Without storage (private mode, site data off) it comes again on the next visit.
 */
export function useEmbedHint(exploring: boolean): [shown: boolean, close: () => void] {
  const [seenBefore] = useState(hintSeenBefore);
  const [due, setDue] = useState(false);
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    if (seenBefore || due || !exploring) return;
    // Reopening the welcome card (Help) before the time is up starts the wait again afterwards
    const timer = window.setTimeout(() => {
      setDue(true);
      try {
        window.localStorage.setItem(EMBED_HINT_SEEN_KEY, '1');
      } catch {
        // Blocked storage: the tip comes again on the next visit
      }
    }, EMBED_HINT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [seenBefore, due, exploring]);
  return [due && !closed, () => setClosed(true)];
}

/** Props for {@link EmbedHintCard} and {@link EmbedHintStrip}. */
export interface EmbedHintProps {
  /** Closes the tip. */
  onClose: () => void;
}

/** The tip's close button (a 44px tap target on touch screens). */
const CloseButton: React.FC<{ onClose: () => void; className?: string }> = ({ onClose, className = '' }) => (
  <button
    type="button"
    onClick={onClose}
    aria-label="Hide the embed tip"
    title="Hide the embed tip"
    className={`shrink-0 flex items-center justify-center rounded-[3px] text-[#a8a8a8] hover:bg-[#444444] hover:text-white cursor-pointer ${TOUCH_TARGET} ${className}`}
  >
    <X className="w-3.5 h-3.5" aria-hidden="true" />
  </button>
);

/**
 * A screenshot of the real example page: its sample article with the For-Each network embedded,
 * so the idea reads at a glance. It loads only when the card appears.
 */
const WebsitePicture: React.FC = () => (
  <img
    src={websiteScreenshot}
    alt=""
    width={176}
    height={132}
    className="shrink-0 block w-[176px] h-[132px] rounded-[5px] border border-[#1f1f1f] bg-[#f6f4ee]"
  />
);

/**
 * Wide screens: a card at the bottom left of the network (the overview map is bottom right) that
 * says the viewer also works on the visitor's own website, with a picture of one and a link to the
 * example page with the embed code. It slides in from below. Left out on short windows, where it
 * would cover the network.
 */
export const EmbedHintCard: React.FC<EmbedHintProps> = ({ onClose }) => (
  <aside
    aria-label="Embed this network"
    className="absolute left-5 bottom-5 z-10 w-[470px] max-w-[calc(100%-40px)] flex gap-4 p-3.5 rounded-md bg-[#2d2d2d] border border-[#1f1f1f] shadow-[0_10px_28px_rgba(0,0,0,0.55)] animate-embed-card-in motion-reduce:animate-none [@media(max-height:560px)]:hidden"
  >
    <WebsitePicture />
    <div className="flex-1 min-w-0 flex flex-col gap-1.5">
      <div className="flex items-start gap-2">
        <p className="flex-1 text-[15px] leading-[1.25] font-bold text-white">This viewer works on your website too</p>
        <CloseButton onClose={onClose} className="w-6 h-6 -mt-1 -mr-1" />
      </div>
      <p className="text-[12px] leading-[1.4] text-[#b0b0b0]">
        Put any network on a portfolio, blog or docs page.
      </p>
      <a
        href={EXAMPLE_SITE_PAGE}
        target="_blank"
        rel="noopener"
        title={LINK_TITLE}
        className={`mt-auto self-start flex items-center gap-[7px] h-[30px] px-3 rounded-[3px] text-[13px] font-bold whitespace-nowrap text-[#141414] hover:brightness-110 ${TOUCH_TARGET}`}
        style={{ background: NOP_ORANGE }}
      >
        <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
        Get the embed code
      </a>
    </div>
  </aside>
);

/**
 * Narrow screens: a strip docked under the network, the full width of its pane, so it takes room
 * from the network instead of covering nodes. Two short lines, the link and a close button. It
 * grows from below, so the network makes room smoothly.
 */
export const EmbedHintStrip: React.FC<EmbedHintProps> = ({ onClose }) => (
  <aside
    aria-label="Embed this network"
    className="shrink-0 flex items-center gap-2 h-14 pl-3 pr-1 overflow-hidden bg-[#2d2d2d] border-t-2 animate-embed-strip-in motion-reduce:animate-none"
    style={{ borderTopColor: NOP_ORANGE }}
  >
    <Code2 className="shrink-0 w-[18px] h-[18px]" style={{ color: NOP_ORANGE }} aria-hidden="true" />
    <span className="flex-1 min-w-0 flex flex-col">
      <span className="truncate text-[13px] leading-[1.25] font-bold text-white">Works on any website</span>
      <span className="truncate text-[12px] leading-[1.25] text-[#b0b0b0]">Portfolio, blog or docs</span>
    </span>
    <a
      href={EXAMPLE_SITE_PAGE}
      target="_blank"
      rel="noopener"
      title={LINK_TITLE}
      className={`shrink-0 flex items-center h-10 px-3 rounded-[3px] text-[14px] font-bold whitespace-nowrap text-[#141414] ${TOUCH_TARGET}`}
      style={{ background: NOP_ORANGE }}
    >
      Embed code
    </a>
    <CloseButton onClose={onClose} className="w-11 h-11" />
  </aside>
);
