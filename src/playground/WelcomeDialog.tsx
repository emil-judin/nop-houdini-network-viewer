import React from 'react';
import { BookOpen, Code2, Download, FileUp, Network } from 'lucide-react';
import { TOUCH_TARGET } from '../components/hud/touchTarget';
import { AVAILABLE_EXAMPLES, EXAMPLE_SITE_PAGE, exampleNodeCount, type PlaygroundExample } from './examples';
import { PlaygroundBanner } from './PlaygroundBanner';
import { PlaygroundDialog } from './PlaygroundDialog';
import { useMediaQuery } from './useMediaQuery';

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
  /** Closes the card and shows the example with this key. */
  onSelectExample: (key: string) => void;
  /** Key of the network on screen, marked in the example list. */
  activeKey: string;
}

/** The NOP repository on GitHub. */
const GITHUB_URL = 'https://github.com/emil-judin/nop-houdini-network-viewer';

/** The documentation table of the README (exporter, embedding, schema). */
const DOCS_URL = `${GITHUB_URL}#documentation`;

/**
 * Example thumbnails by file path (`scripts/capture_example_thumbnails.mjs` makes them from the
 * real viewer). An example without one shows a plain network icon instead.
 */
const THUMBNAILS = import.meta.glob<string>('./assets/example-thumbs/*.jpg', { eager: true, import: 'default' });

const thumbnailOf = (example: PlaygroundExample): string | undefined => {
  const path = `./assets/example-thumbs/${example.key}.jpg`;
  return Object.hasOwn(THUMBNAILS, path) ? THUMBNAILS[path] : undefined;
};

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
const GroupTitle: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <h3 id={id} className="px-2 pb-1 text-[12px] font-bold text-[#a8a8a8]">
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

/** One row of the example list: thumbnail, name and node count. Opens the example and closes the card. */
const ExampleRow: React.FC<{ example: PlaygroundExample; active: boolean; onSelect: () => void }> = ({
  example,
  active,
  onSelect,
}) => {
  const thumbnail = thumbnailOf(example);
  const count = exampleNodeCount(example);
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-current={active ? 'true' : undefined}
        title={example.description}
        className={`group flex items-center gap-2.5 w-full p-1 rounded-[3px] text-left cursor-pointer ${
          active ? 'bg-[#383c48]' : 'hover:bg-[#3a3a3a]'
        }`}
      >
        <span
          className={`shrink-0 w-16 h-[38px] overflow-hidden rounded-[2px] bg-[#222222] border ${
            active ? 'border-[#7082b9]' : 'border-[#1f1f1f] group-hover:border-[#5a5a5a]'
          }`}
        >
          {thumbnail ? (
            <img src={thumbnail} alt="" width={64} height={38} className="w-full h-full object-cover" />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-[#6a6a6a]">
              <Network className="w-4 h-4" aria-hidden="true" />
            </span>
          )}
        </span>
        <span className="min-w-0">
          <span className={`block truncate text-[13px] ${active ? 'font-bold text-white' : 'text-[#dddddd]'}`}>{example.label}</span>
          {count !== undefined && <span className="block text-[12px] text-[#a8a8a8]">{count} nodes</span>}
        </span>
      </button>
    </li>
  );
};

/**
 * Start screen on the first visit (and from the Help button), like a desktop app's splash: the
 * banner on top, then on the left the links for the visitor's own networks (exporter, open a file,
 * embed on a site) and to the docs and GitHub, and on the right the examples as a compact list with
 * thumbnails, each opening its network. On phones the columns stack, links first. The controls line follows the
 * device: mouse words on desktops, touch words on phones and tablets.
 */
export const WelcomeDialog: React.FC<WelcomeDialogProps> = ({
  open,
  onClose,
  onOpenExporter,
  onOpenFile,
  onSelectExample,
  activeKey,
}) => {
  const touch = useMediaQuery('(pointer: coarse)');

  return (
    <PlaygroundDialog open={open} onClose={onClose} title="Welcome" maxWidthPx={760}>
      {/* Like Houdini's Start Here window; left out on short screens so the examples keep their room */}
      <PlaygroundBanner className="[@media(max-height:560px)]:hidden" />
      <div className="overflow-y-auto px-4 py-3">
        <p className="px-2 text-[13px] leading-[1.5] text-[#d6d6d6]">
          NOP is an interactive viewer for Houdini node networks on the web. Open an example to try it, or test your own exported
          networks.
        </p>

        <div className="mt-3 flex flex-col sm:flex-row gap-4 sm:gap-3">
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

          <section aria-labelledby="welcome-examples" className="flex-1 min-w-0 sm:border-l sm:border-[#3a3a3a] sm:pl-3">
            <GroupTitle id="welcome-examples">Examples</GroupTitle>
            {/* One column on narrow phones, so the longer names still fit beside their thumbnails */}
            <ul className="grid grid-cols-1 min-[440px]:grid-cols-2 gap-x-2 gap-y-0.5">
              {AVAILABLE_EXAMPLES.map((example) => (
                <ExampleRow
                  key={example.key}
                  example={example}
                  active={example.key === activeKey}
                  onSelect={() => onSelectExample(example.key)}
                />
              ))}
            </ul>
            <p className="mt-2.5 px-2 text-[12px] leading-[1.4] text-[#a8a8a8]">
              {touch
                ? 'Drag to move, pinch to zoom, double-tap a subnetwork to go inside and tap a node to see its parameters.'
                : 'Drag to move, scroll to zoom, double-click a subnetwork to go inside and click a node to see its parameters.'}
            </p>
          </section>
        </div>
      </div>
      <div className="flex justify-end px-4 py-3 border-t-2 border-[#1f1f1f]">
        <button
          type="button"
          onClick={onClose}
          className={`h-7 px-3 rounded-[3px] bg-[#474e62] hover:bg-[#535b72] text-[13px] text-white cursor-pointer ${TOUCH_TARGET}`}
        >
          Start exploring
        </button>
      </div>
    </PlaygroundDialog>
  );
};
