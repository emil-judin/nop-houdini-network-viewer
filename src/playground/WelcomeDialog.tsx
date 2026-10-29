import React from 'react';
import { Code2, Download, MousePointer2 } from 'lucide-react';
import { TOUCH_TARGET } from '../components/hud/touchTarget';
import { EXAMPLE_SITE_PAGE } from './examples';
import { PlaygroundDialog } from './PlaygroundDialog';
import { useMediaQuery } from './useMediaQuery';

/** Props for {@link WelcomeDialog}. */
export interface WelcomeDialogProps {
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the dialog closes (button, Escape, or backdrop click). */
  onClose: () => void;
}

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
 * follow the device: mouse words on desktops, touch words on phones and tablets.
 */
export const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ open, onClose }) => {
  const touch = useMediaQuery('(pointer: coarse)');

  return (
    <PlaygroundDialog open={open} onClose={onClose} title="Welcome to the NOP Playground" maxWidthPx={560}>
      <div className="overflow-y-auto px-4 py-3">
        <p className="text-[13px] leading-[1.5] text-[#d6d6d6]">
          NOP shows Houdini node networks on websites. This playground is for trying it out: the network in the
          middle is what visitors of your site will see.
        </p>
        <ol className="mt-4 space-y-3">
          <Step icon={<Download className="w-4 h-4" />} title="1. Export from Houdini">
            Install the exporter (<b>Get the exporter</b> in the Networks pane), then click <b>Export for NOP</b> on the
            NOP shelf.
          </Step>
          <Step icon={<MousePointer2 className="w-4 h-4" />} title="2. Explore it here">
            {touch
              ? 'Drag to move, pinch to zoom, double-tap a subnetwork to go inside and tap a node to see its parameters.'
              : 'Drag to move, scroll to zoom, double-click a subnetwork to go inside and click a node to see its parameters.'}
          </Step>
          <Step icon={<Code2 className="w-4 h-4" />} title="3. Put it on your website">
            One HTML tag or an iframe shows the network on your own page. <b>Embed this network</b> in the Networks pane
            gives you the code.
          </Step>
        </ol>
      </div>
      <div className="flex flex-wrap justify-end gap-2 px-4 py-3 border-t-2 border-[#1f1f1f]">
        <a
          href={EXAMPLE_SITE_PAGE}
          className={`flex items-center h-7 px-3 rounded-[3px] bg-[#444444] hover:bg-[#4e4e4e] text-[13px] text-[#d6d6d6] hover:text-white ${TOUCH_TARGET}`}
        >
          See an example website
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
