import React from 'react';

/** Props for {@link PaneTabStrip}. */
export interface PaneTabStripProps {
  /** Label of the single, active pane tab. */
  label: React.ReactNode;
  /** Shows the label in italics, as Houdini does for a pane tab that names a network path. */
  italic?: boolean;
  /** Controls at the right end of the strip (for example a collapse button). */
  children?: React.ReactNode;
}

/**
 * Houdini 22 pane tab strip: a `#282828` strip with the active tab in pane grey `#383838` and the
 * blue-grey line on its top edge (colors sampled from a Houdini 22 screenshot).
 */
export const PaneTabStrip: React.FC<PaneTabStripProps> = ({ label, italic = false, children }) => (
  <div className="shrink-0 flex items-stretch justify-between h-6 bg-[#282828]">
    <div
      className={`min-w-0 flex items-center px-3 bg-[#383838] border-t-2 border-[#586486] text-[13px] text-[#d6d6d6] ${
        italic ? 'italic' : ''
      }`}
    >
      <span className="truncate">{label}</span>
    </div>
    {children && <div className="flex items-center pr-0.5">{children}</div>}
  </div>
);
