import React from 'react';
import { BookOpen, Code2, Download, Eye, FileUp, Lock, Network } from 'lucide-react';
import { TOUCH_TARGET } from './touchTarget';
import { EXAMPLE_SITE_PAGE } from './examples';
import { PlaygroundBanner } from './PlaygroundBanner';
import { PlaygroundDialog } from './PlaygroundDialog';

/** Props for {@link WelcomeDialog}. */
export interface WelcomeDialogProps {
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the dialog closes (button, Escape, or backdrop click). */
  onClose: () => void;
  /** Closes the card and opens the exporter download. */
  onOpenExporter: () => void;
  /** Closes the card and opens the file picker for an own network. */
  onOpenFile: () => void;
}

/** The NOP repository on GitHub. */
const GITHUB_URL = 'https://github.com/emil-judin/nop-houdini-network-viewer';

/** The documentation table of the README (exporter, embedding, schema). */
const DOCS_URL = `${GITHUB_URL}#documentation`;

/** GitHub mark in Lucide's stroke style (Lucide 1.x has no brand icons). */
const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/** Small heading over a group, like the section titles of the Networks pane. */
const GroupTitle: React.FC<{ id: string; className?: string; children: React.ReactNode }> = ({ id, className = 'px-2', children }) => (
  <h3 id={id} className={`${className} pb-1 text-[12px] font-bold text-[#a8a8a8]`}>
    {children}
  </h3>
);

/** Look of a link row: an icon and a name, highlighted under the pointer, 44px high on touch screens. */
const LINK_ROW = `flex items-center gap-2.5 w-full px-2 py-1.5 rounded-[3px] text-left text-[13px] font-bold text-[#dddddd] hover:bg-[#3a3a3a] hover:text-white cursor-pointer ${TOUCH_TARGET}`;

/** Icon of a link row. */
const LinkIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="shrink-0 text-[#a9b8e6]" aria-hidden="true">
    {children}
  </span>
);

/**
 * One step of "How it works": a blue icon circle (the blue of the card's main button), a title and a
 * sentence. On wide screens the steps stand side by side, circle and text centered in their columns,
 * and all but the last draw a dashed line across to the next circle, so the three read as one flow.
 * The line starts 8px after this circle and ends 8px before the next one: one column plus the 14px
 * gap, minus a 40px circle and two 8px spaces, is `100% - 42px`. On narrower screens the steps
 * stack, icon beside the text.
 */
const Step: React.FC<{ icon: React.ReactNode; title: string; last?: boolean; children: React.ReactNode }> = ({
  icon,
  title,
  last = false,
  children,
}) => (
  <li className="relative flex gap-3 md:flex-col md:gap-2.5">
    <div className="flex md:justify-center" aria-hidden="true">
      <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-[#474e62] text-white">{icon}</span>
      {!last && (
        <span className="hidden md:block absolute top-4.75 left-[calc(50%+28px)] w-[calc(100%-42px)] border-t-2 border-dashed border-[#5a5a5a]" />
      )}
    </div>
    <div className="pt-0.5 md:pt-0 md:text-center">
      <p className="text-[14px] font-bold text-white">{title}</p>
      <p className="mt-0.75 text-[13px] leading-[1.45] text-[#bdbdbd]">{children}</p>
    </div>
  </li>
);

/**
 * Start screen on the first visit (and from the Help button), like a desktop app's splash: the
 * banner on top, then on the left the links for the visitor's own networks (exporter, open a file,
 * embed on a site) and to the docs and GitHub, and on the right what NOP is and how it works in
 * three steps (export, embed, explore). On phones the columns stack, links first.
 */
export const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ open, onClose, onOpenExporter, onOpenFile }) => {
  return (
    <PlaygroundDialog open={open} onClose={onClose} title="Welcome" maxWidthPx={760}>
      {/* Like Houdini's Start Here window; left out on short screens so the text keeps its room */}
      <PlaygroundBanner className="[@media(max-height:560px)]:hidden" />
      <div className="overflow-y-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
          <div className="sm:w-[200px] shrink-0 flex flex-col gap-2.5">
            <section aria-labelledby="welcome-own">
              <GroupTitle id="welcome-own">Your networks</GroupTitle>
              <ul>
                <li>
                  <button type="button" onClick={onOpenExporter} className={LINK_ROW}>
                    <LinkIcon>
                      <Download className="w-4 h-4" />
                    </LinkIcon>
                    Get the exporter
                  </button>
                </li>
                <li>
                  <button type="button" onClick={onOpenFile} className={LINK_ROW}>
                    <LinkIcon>
                      <FileUp className="w-4 h-4" />
                    </LinkIcon>
                    Open a network file
                  </button>
                </li>
                <li>
                  {/* The example page opens in a new tab, so the playground keeps its state */}
                  <a href={EXAMPLE_SITE_PAGE} target="_blank" rel="noopener" onClick={onClose} className={LINK_ROW}>
                    <LinkIcon>
                      <Code2 className="w-4 h-4" />
                    </LinkIcon>
                    Embed on your website
                  </a>
                </li>
              </ul>
            </section>
            <section aria-labelledby="welcome-more">
              <GroupTitle id="welcome-more">Learn more</GroupTitle>
              {/* Other sites: the card stays open, so it is still there on coming back */}
              <ul>
                <li>
                  <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className={LINK_ROW}>
                    <LinkIcon>
                      <BookOpen className="w-4 h-4" />
                    </LinkIcon>
                    Docs
                  </a>
                </li>
                <li>
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={LINK_ROW}>
                    <LinkIcon>
                      <GithubIcon className="w-4 h-4" />
                    </LinkIcon>
                    GitHub
                  </a>
                </li>
              </ul>
            </section>
          </div>

          <section
            aria-labelledby="welcome-how"
            className="flex-1 min-w-0 flex flex-col gap-3.5 px-2 sm:px-0 sm:border-l sm:border-[#3a3a3a] sm:pl-4.5"
          >
            <div>
              <GroupTitle id="welcome-how" className="">
                How it works
              </GroupTitle>
              <p className="text-[13px] leading-[1.5] text-[#d6d6d6]">
                An interactive view for your Houdini node networks: browse parameters, open subnetworks and read VEX.
                All in the browser, no Houdini needed.
              </p>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <Step icon={<Network className="w-5 h-5" strokeWidth={2.2} />} title="Export from Houdini">
                Click the NOP shelf tool. The network is saved as one JSON file.
              </Step>
              <Step icon={<Code2 className="w-5 h-5" strokeWidth={2.2} />} title="Embed on your website">
                Add the file to your site with one line of HTML using the web component.
              </Step>
              <Step icon={<Eye className="w-5 h-5" strokeWidth={2.2} />} title="Explore" last>
                Visitors can pan, zoom, open subnetworks and read parameters and VEX
              </Step>
            </ol>
            <p className="flex items-center gap-2 px-2.5 py-2 rounded-[3px] bg-[#262626] text-[12px] leading-[1.4] text-[#b0b0b0]">
              <Lock className={`w-3.5 h-3.5 shrink-0 text-[#a9b8e6]`} aria-hidden="true" />
              Try your file here first. It never leaves your browser.
            </p>
          </section>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-t-2 border-[#1f1f1f]">
        <p className="text-[12px] leading-[1.4] text-[#a8a8a8]">
          Not affiliated with or endorsed by SideFX. Houdini is a trademark of Side Effects Software Inc.
        </p>
        <button
          type="button"
          onClick={onClose}
          className={`shrink-0 ml-auto h-8 px-4 rounded-[3px] bg-[#474e62] hover:bg-[#535b72] text-[13px] font-bold text-white cursor-pointer ${TOUCH_TARGET}`}
        >
          Start exploring
        </button>
      </div>
    </PlaygroundDialog>
  );
};
