import React from 'react';
import { CircleHelp, Code2, Download, MessageSquare } from 'lucide-react';
import { TOUCH_TARGET } from '../components/hud/touchTarget';
import { EXAMPLE_SITE_PAGE } from './examples';
import { PlaygroundBanner } from './PlaygroundBanner';

/** Props for {@link AboutBlock}. */
export interface AboutBlockProps {
  /** Opens the exporter download dialog. */
  onOpenExporter: () => void;
  /** Opens the welcome card again. */
  onOpenHelp: () => void;
  /** Opens the feedback form; without it there is no feedback button (no access key in this build). */
  onOpenFeedback?: () => void;
}

/** Full-width button of the block, in Houdini's blue-grey (`primary`) or pane grey. */
const blockButton = (primary: boolean) =>
  `flex items-center justify-center gap-1.5 w-full h-7 rounded-[3px] text-[13px] cursor-pointer ${TOUCH_TARGET} ${
    primary ? 'bg-[#474e62] hover:bg-[#535b72] text-white' : 'bg-[#444444] hover:bg-[#4e4e4e] text-[#d6d6d6] hover:text-white'
  }`;

/**
 * The NOP banner with the exporter download, Embed, help and the feedback form, for the
 * free space at the bottom of the playground's Networks pane (trial, 2026-10-28). Exporter and Embed
 * come first, in the order of the workflow: export, then embed. Embed opens the example page in a
 * new tab: an example network on a web page with the options and code to copy. No version line here
 * (owner decision 2026-11-05): the status bar shows it next to the exporter version.
 */
export const AboutBlock: React.FC<AboutBlockProps> = ({ onOpenExporter, onOpenHelp, onOpenFeedback }) => (
  <div className="flex flex-col border-t border-[#2d2d2d]">
    {/* The welcome card's banner; left out on short screens so the list keeps its room */}
    <PlaygroundBanner size="small" className="[@media(max-height:640px)]:hidden" />
    <div className="flex flex-col items-center gap-1 px-3 pt-2 pb-3 text-center">
      <div className="flex flex-col gap-1 w-full">
        <button type="button" onClick={onOpenExporter} title="Download the NOP exporter for Houdini" className={blockButton(true)}>
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Get the exporter</span>
        </button>
        {/* A link styled as a button: it opens the example page in a new tab, so the playground keeps its state */}
        <a
          href={EXAMPLE_SITE_PAGE}
          target="_blank"
          rel="noopener"
          title="See a network on a web page and copy the code for your own website (opens a new tab)"
          className={blockButton(false)}
        >
          <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Embed</span>
        </a>
        <div className="flex gap-1">
          <button type="button" onClick={onOpenHelp} title="How the playground works" className={blockButton(false)}>
            <CircleHelp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Help</span>
          </button>
          {onOpenFeedback && (
            <button
              type="button"
              onClick={onOpenFeedback}
              title="Tell the author what worked, what broke and what is missing"
              className={blockButton(false)}
            >
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Feedback</span>
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);
