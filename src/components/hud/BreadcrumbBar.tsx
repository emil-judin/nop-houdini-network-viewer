import React from 'react';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { OperatorIconGlyph } from '../nodes/icons/OperatorSvgIcon';
import type { NetworkPathSegment, PathSegmentIcon } from './networkPathSegments';
import { TOUCH_TARGET } from './touchTarget';

/**
 * Props for the network path bar (`BreadcrumbBar`).
 */
export interface BreadcrumbBarProps {
  /** Path segments from the exported root down to the deepest visited level (see `buildNetworkPathSegments`). */
  segments: NetworkPathSegment[];
  /** Number of operator nodes in the network on screen. */
  nodeCount: number;
  /** Jumps to the exported level at `depth` (`0` is the exported root). */
  onNavigate: (depth: number) => void;
  /** Whether there is an earlier network in the navigation history. */
  canGoBack: boolean;
  /** Whether there is a later network in the navigation history. */
  canGoForward: boolean;
  /** Goes to the previous network in the history. */
  onBack: () => void;
  /** Goes to the next network in the history. */
  onForward: () => void;
}

/** Path bar icon size in pixels (Houdini's icons fill most of the 25px bar). */
const ICON_PX = 22;

/** Icon of one segment: a registered drawing or a custom asset icon. */
const SegmentIcon: React.FC<{ icon: PathSegmentIcon }> = ({ icon }) =>
  'def' in icon ? (
    <OperatorIconGlyph def={icon.def} sizePx={ICON_PX} />
  ) : (
    <img src={icon.src} alt="" width={ICON_PX} height={ICON_PX} className="object-contain" draggable={false} />
  );

/** Back or forward history button: blue-grey arrow, darker when there is nowhere to go. */
const HistoryButton: React.FC<{
  direction: 'back' | 'forward';
  enabled: boolean;
  onClick: () => void;
}> = ({ direction, enabled, onClick }) => {
  const Icon = direction === 'back' ? ArrowLeft : ArrowRight;
  const label = direction === 'back' ? 'Go back to the previous network' : 'Go forward to the next network';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!enabled}
      title={label}
      aria-label={label}
      className={`shrink-0 flex items-center justify-center w-6 h-[23px] rounded-[3px] ${TOUCH_TARGET} ${
        enabled ? 'text-[#8c96b2] hover:bg-[#454545] hover:text-[#b4bdd6] cursor-pointer' : 'text-[#555862] cursor-default'
      }`}
    >
      <Icon className="w-4 h-4" strokeWidth={2.25} />
    </button>
  );
};

/**
 * Houdini-style network path bar: back and forward buttons, then the path (`obj > circuit_board >
 * circuit_gen`) with each node's icon.
 *
 * Like Houdini, levels below the network on screen stay in the bar after going up, dimmed, so
 * they can be entered again with one click. The path starts at the exported network: nodes above
 * it (for example `obj`) were not exported and cannot be opened, so they are not shown.
 */
export const BreadcrumbBar: React.FC<BreadcrumbBarProps> = ({
  segments,
  nodeCount,
  onNavigate,
  canGoBack,
  canGoForward,
  onBack,
  onForward,
}) => (
  <nav
    aria-label="Network path"
    className="pointer-events-auto min-w-0 max-w-full flex items-center h-[25px] rounded-[3px] bg-[#383838] border border-[#2a2a2a] pl-0.5 pr-2 text-[14px] text-[#d6d6d6] shadow-md"
  >
    <HistoryButton direction="back" enabled={canGoBack} onClick={onBack} />
    <HistoryButton direction="forward" enabled={canGoForward} onClick={onForward} />
    <span className="shrink-0 self-stretch w-px my-[3px] mx-1 bg-[#262626]" aria-hidden="true" />

    <ol className="min-w-0 flex items-center">
      {segments.map((segment, index) => {
        const clickable = !segment.current;
        const content = (
          <>
            {segment.icon && (
              <span className={`shrink-0 flex ${segment.dimmed ? 'opacity-40' : ''}`}>
                <SegmentIcon icon={segment.icon} />
              </span>
            )}
            <span className="truncate">{segment.name}</span>
          </>
        );
        const tone = segment.dimmed ? 'text-[#686868]' : 'text-[#d6d6d6]';
        return (
          <li key={segment.path} className="min-w-0 flex items-center">
            {index > 0 && (
              <ChevronRight className="shrink-0 w-3 h-3 mx-0.5 text-[#a8a8a8]" strokeWidth={1.75} aria-hidden="true" />
            )}
            {clickable ? (
              <button
                type="button"
                onClick={() => onNavigate(segment.depth)}
                title={`Go to ${segment.path}`}
                className={`min-w-0 flex items-center gap-1 h-[21px] px-1 rounded-[3px] hover:bg-[#474747] hover:text-white cursor-pointer ${tone} ${TOUCH_TARGET}`}
              >
                {content}
              </button>
            ) : (
              <span
                aria-current={segment.current ? 'location' : undefined}
                title={segment.path}
                className={`min-w-0 flex items-center gap-1 h-[21px] px-1 ${tone}`}
              >
                {content}
              </span>
            )}
          </li>
        );
      })}
    </ol>

    <span className="shrink-0 ml-2 text-[11px] text-[#8a8a8a] whitespace-nowrap">{nodeCount} nodes</span>
  </nav>
);
