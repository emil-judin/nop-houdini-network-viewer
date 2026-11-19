import React from 'react';

/**
 * Shared pink symmetrical solver brain (from the approved `sop.ripplesolver` drawing).
 * Reused by `sop.solver` and later solver families (`pyro`, `flip`, `ocean`, `mpm`,
 * `vellum`, `rbd`, `muscle`, `tissue`, `kinefx` Ragdoll Solver).
 */
export const SolverBrain: React.FC<{
  cx?: number;
  cy?: number;
  scale?: number;
}> = ({ cx = 12, cy = 10.2, scale = 1 }) => {
  const transform = scale === 1 ? `translate(${cx}, ${cy})` : `translate(${cx}, ${cy}) scale(${scale})`;
  return (
    <g transform={transform} strokeLinejoin="round">
      <ellipse cx="0" cy="0" rx="6.2" ry="5" fill="#f7c8ca" stroke="#262626" strokeWidth="1" />
      <path
        d="M0,-4.8 V4.6 M-4.6,-1.6 C-3,-2.8 -1.4,-1.8 -1.6,-0.2 M4.6,-1.6 C3,-2.8 1.4,-1.8 1.6,-0.2 M-4.2,1.8 C-2.6,0.8 -1.2,1.8 -1.8,3.4 M4.2,1.8 C2.6,0.8 1.2,1.8 1.8,3.4"
        fill="none"
        stroke="#d07478"
        strokeWidth="0.95"
        strokeLinecap="round"
      />
    </g>
  );
};
