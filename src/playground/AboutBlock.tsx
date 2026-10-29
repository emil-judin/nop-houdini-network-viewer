import React from 'react';
import { CircleHelp, Code2, Download, MessageSquare } from 'lucide-react';
import { TOUCH_TARGET } from '../components/hud/touchTarget';

/** Props for {@link AboutBlock}. */
export interface AboutBlockProps {
  /** Opens the exporter download dialog. */
  onOpenExporter: () => void;
  /** Opens the embed code of the network on screen; without it the button is disabled (no network on screen). */
  onOpenEmbed?: () => void;
  /** Opens the welcome card again. */
  onOpenHelp: () => void;
  /** Opens the feedback form; without it there is no feedback button (no access key in this build). */
  onOpenFeedback?: () => void;
}

/** Full-width button of the block, in Houdini's blue-grey (`primary`) or pane grey. */
const blockButton = (primary: boolean) =>
  `flex items-center justify-center gap-1.5 w-full h-7 rounded-[3px] text-[13px] cursor-pointer disabled:cursor-default disabled:opacity-50 ${TOUCH_TARGET} ${
    primary
      ? 'bg-[#474e62] hover:bg-[#535b72] text-white'
      : 'bg-[#444444] enabled:hover:bg-[#4e4e4e] text-[#d6d6d6] enabled:hover:text-white'
  }`;

/**
 * NOP logo, name, tag line and version with the exporter download, the embed code, help and the
 * feedback form, for the free space at the bottom of the playground's Networks pane (trial,
 * 2026-10-28). Exporter and Embed come first, in the order of the workflow: export, then embed.
 */
export const AboutBlock: React.FC<AboutBlockProps> = ({ onOpenExporter, onOpenEmbed, onOpenHelp, onOpenFeedback }) => (
  <div className="flex flex-col items-center gap-1 px-3 pt-4 pb-3 text-center border-t border-[#2d2d2d]">
    {/* Logo from public/, relative to the page so it also works from a sub-path; left out on short screens so the list keeps its room */}
    <img
      src={`${import.meta.env.BASE_URL}favicon.svg`}
      alt=""
      width={96}
      height={96}
      className="w-24 h-24 mb-1 opacity-80 [@media(max-height:640px)]:hidden"
    />
    <p className="text-[18px] font-bold leading-tight text-[#dddddd]">NOP</p>
    {/* "Playground" makes clear this page only tries out the package */}
    <p className="text-[12px] text-[#a8a8a8]">Playground for Houdini Network Web Viewer</p>
    <p className="text-[12px] text-[#a8a8a8]">Version {__NOP_VERSION__}</p>
    <div className="mt-2 flex flex-col gap-1 w-full">
      <button type="button" onClick={onOpenExporter} title="Download the NOP exporter for Houdini" className={blockButton(true)}>
        <Download className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Get the exporter</span>
      </button>
      <button
        type="button"
        onClick={onOpenEmbed}
        disabled={!onOpenEmbed}
        title={onOpenEmbed ? 'Get the code to show this network on your own website' : 'Choose a network to embed'}
        className={blockButton(false)}
      >
        <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Embed this network</span>
      </button>
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
);
