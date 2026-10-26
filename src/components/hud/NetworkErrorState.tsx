import React from 'react';
import { TriangleAlert } from 'lucide-react';

/**
 * Props for the in-viewer error panel (`NetworkErrorState`).
 */
export interface NetworkErrorStateProps {
  /** Technical reason shown under the friendly headline. */
  message: string;
  /** Plain-language explanation under the headline. Defaults to the "invalid or damaged file" text. */
  hint?: string;
}

const DEFAULT_HINT =
  'The file is not a valid export from the WOP shelf tool, or it is damaged.';

/**
 * Friendly error panel shown inside the viewer when a network file cannot be read or drawn,
 * so a broken file never crashes the page that embeds the viewer.
 */
export const NetworkErrorState: React.FC<NetworkErrorStateProps> = ({ message, hint = DEFAULT_HINT }) => (
  <div role="alert" className="wop-root w-full h-full min-h-80 bg-[#242424] flex items-center justify-center p-4 font-sans">
    <div className="max-w-md rounded border border-[#4a3a2a] bg-[#1b1b1b] px-4 py-3 text-sm text-[#dcdcdc] shadow-md">
      <div className="flex items-center gap-2 font-semibold text-amber-300">
        <TriangleAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
        This Houdini network could not be displayed.
      </div>
      <p className="mt-1.5 text-xs text-[#a0a0a0]">{hint}</p>
      <p className="mt-2 font-mono text-[11px] text-[#c8a070] break-words">{message}</p>
    </div>
  </div>
);
