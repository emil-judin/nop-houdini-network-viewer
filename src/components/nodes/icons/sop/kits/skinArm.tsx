import React from 'react';

const OUTLINE = '#262626';

/**
 * Shared bent blue muscular arm used by `sop.skindeform` and `sop.skinsolidify`.
 * Shoulder and full bicep at upper-left, elbow at bottom-center, tapered forearm and
 * inward-curled fist at upper-right (matching the Pose-Space arm fist style).
 */
export const SkinArmBase: React.FC<{ uid: string }> = ({ uid }) => (
  <>
    <defs>
      <radialGradient id={`${uid}-skin-arm`} cx="36%" cy="38%" r="65%">
        <stop offset="0%" stopColor="#8fc2ff" />
        <stop offset="55%" stopColor="#5aa2f2" />
        <stop offset="100%" stopColor="#3672c4" />
      </radialGradient>
    </defs>
    <path
      d="M4.8,4.6 C6.8,3.2 9.6,4.2 11.4,7.0 C12.8,9.2 13.8,11.8 14.2,13.6 C15.2,12.2 16.4,9.8 16.8,7.8 C15.4,8.0 14.2,6.8 14.2,5.0 C14.2,3.2 16.2,2.2 18.4,2.8 C20.2,3.4 21.0,5.0 20.6,7.0 C20.2,10.8 18.6,15.4 16.2,18.0 C14.0,20.4 10.2,20.2 7.4,17.4 C4.6,14.6 3.0,10.8 3.2,7.6 C3.3,6.0 3.9,5.2 4.8,4.6 Z"
      fill={`url(#${uid}-skin-arm)`}
      stroke={OUTLINE}
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
  </>
);
