import React from 'react';
import { Code2, Download, MousePointer2 } from 'lucide-react';
import { TOUCH_TARGET } from '../components/hud/touchTarget';
import { EXAMPLE_SITE_PAGE } from './examples';
import { PlaygroundBanner } from './PlaygroundBanner';
import { PlaygroundDialog } from './PlaygroundDialog';
import { useMediaQuery } from './useMediaQuery';

/** Props for {@link WelcomeDialog}. */
export interface WelcomeDialogProps {
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the dialog closes (button, Escape, or backdrop click). */
  onClose: () => void;
  /** Closes the card and opens the exporter download (the "Get the exporter" link in step 1). */
  onOpenExporter: () => void;
}

/** Inline link style of the step texts. */
const INLINE_LINK = 'inline p-0 font-bold text-[#a9b8e6] underline underline-offset-2 hover:text-white cursor-pointer';

/** A button that reads as a link inside a sentence: it opens another dialog, it does not leave the page. */
const InlineAction: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button type="button" onClick={onClick} className={INLINE_LINK}>
    {children}
  </button>
);

/** One numbered step of the welcome card. */
const Step: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <li className="flex gap-3">
    <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-[3px] bg-[#474e62] text-white" aria-hidden="true">
      {icon}
    </span>
    <div className="min-w-0">
      <h3 className="text-[13px] font-bold text-[#dddddd]">{title}</h3>
      <p className="mt-0.5 text-[13px] leading-[1.45] text-[#c0c0c0]">{children}</p>
    </div>
  </li>
);

/**
 * One-screen introduction on the first visit (and from the Help button): what NOP is, that the
 * playground only tries it out, and the three steps from Houdini to a website. Interaction hints
 * follow the device: mouse words on desktops, touch words on phones and tablets. The names of the
 * pane's buttons in the steps open what they name.
 */
export const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ open, onClose, onOpenExporter }) => {
  const touch = useMediaQuery('(pointer: coarse)');

  return (
    <PlaygroundDialog open={open} onClose={onClose} title="Welcome to the NOP Playground" maxWidthPx={560}>
      {/* Like Houdini's Start Here window; left out on short screens so the steps keep their room */}
      <PlaygroundBanner className="[@media(max-height:560px)]:hidden" />
      <div className="overflow-y-auto px-4 py-3">
        <p className="text-[13px] leading-[1.5] text-[#d6d6d6]">
          NOP allows you to display Houdini node networks on the web. This playground is for trying it out: the network in the
          middle is what visitors of your site will see.
        </p>
        <ol className="mt-4 space-y-3">
          <Step icon={<Download className="w-4 h-4" />} title="1. Export from Houdini">
            <InlineAction onClick={onOpenExporter}>Get the exporter</InlineAction>, then click <b>Export for NOP</b> on the NOP shelf.
          </Step>
          <Step icon={<MousePointer2 className="w-4 h-4" />} title="2. Explore it here">
            {touch
              ? 'Drag to move, pinch to zoom, double-tap a subnetwork to go inside and tap a node to see its parameters.'
              : 'Drag to move, scroll to zoom, double-click a subnetwork to go inside and click a node to see its parameters.'}
          </Step>
          <Step icon={<Code2 className="w-4 h-4" />} title="3. Put it on your website">
            <a href={EXAMPLE_SITE_PAGE} target="_blank" rel="noopener" onClick={onClose} className={INLINE_LINK}>
              Embed
            </a>{' '}
            in the Networks pane shows an example on a web page and gives you the code.
          </Step>
        </ol>
      </div>
      <div className="flex flex-wrap justify-end gap-2 px-4 py-3 border-t-2 border-[#1f1f1f]">
        {/* The same page as Embed: an example network with its options and code */}
        <a
          href={EXAMPLE_SITE_PAGE}
          target="_blank"
          rel="noopener"
          onClick={onClose}
          className={`flex items-center h-7 px-3 rounded-[3px] bg-[#444444] hover:bg-[#4e4e4e] text-[13px] text-[#d6d6d6] hover:text-white ${TOUCH_TARGET}`}
        >
          See the example page
        </a>
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
