import React from 'react';

/**
 * Props for the loading placeholder (`NetworkLoadingState`).
 */
export interface NetworkLoadingStateProps {
  /** Text next to the spinner. Defaults to "Loading Houdini network...". */
  message?: string;
}

/**
 * Placeholder shown inside the viewer area while a network file (or a part of the viewer) loads.
 */
export const NetworkLoadingState: React.FC<NetworkLoadingStateProps> = ({ message = 'Loading Houdini network...' }) => (
  <div
    role="status"
    className="wop-root w-full h-full min-h-80 bg-[#242424] flex items-center justify-center font-sans text-xs text-[#9e9e9e]"
  >
    <span
      className="w-4 h-4 mr-2 rounded-full border-2 border-[#555555] border-t-[#7082b9] animate-spin motion-reduce:animate-none"
      aria-hidden="true"
    />
    {message}
  </div>
);
