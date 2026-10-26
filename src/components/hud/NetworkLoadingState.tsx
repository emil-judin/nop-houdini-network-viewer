import React from 'react';

/**
 * Placeholder shown inside the viewer area while a network file downloads.
 */
export const NetworkLoadingState: React.FC = () => (
  <div
    role="status"
    className="wop-root w-full h-full min-h-80 bg-[#242424] flex items-center justify-center font-sans text-xs text-[#9e9e9e]"
  >
    <span
      className="w-4 h-4 mr-2 rounded-full border-2 border-[#555555] border-t-[#7082b9] animate-spin"
      aria-hidden="true"
    />
    Loading Houdini network...
  </div>
);
