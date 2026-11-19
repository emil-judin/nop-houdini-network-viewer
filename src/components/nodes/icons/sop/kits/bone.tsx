import React from 'react';

const OUTLINE = '#262626';

const GREY_LEFT = '#c0c7d1';

const GREY_RIGHT = '#89929e';

const WHITE = '#ffffff';

const PAPER = '#f2f4f7';

const ORANGE_LIT = '#ffb066';

const BLUE_LIT = '#5aa2f2';

const BLUE_DARK = '#3672c4';

const CAPTURE_ARM_PATH =
  'M18.4,2.1 L21.7,5.4 L16.5,11.1 L11.7,15.7 L10.7,19.8 L9.4,20.1 L9.5,16.7 L7.5,21.2 L6.0,20.5 L7.6,16.8 L4.7,19.9 L3.6,18.9 L6.6,15.8 L3.2,17.2 L2.6,15.8 L6.6,14.1 L3.8,13.5 L4.2,12.1 L8.6,12.7 L13.1,7.5 Z';

/**
 * Shared capture arm base with a five-fingered hand, forearm, and two bone diamonds
 * (upper arm and forearm) meeting at the elbow.
 */
export const CaptureArmBase: React.FC<{
  armFill?: string;
  outlineWidth?: number;
  boneLight?: string;
  boneStrokeWidth?: number;
  children?: React.ReactNode;
}> = ({ armFill = ORANGE_LIT, outlineWidth = 0.95, boneLight = PAPER, boneStrokeWidth = 0.65, children }) => (
  <g stroke={OUTLINE} strokeWidth={outlineWidth} strokeLinejoin="round">
    <path d={CAPTURE_ARM_PATH} fill={armFill} />
    {children}
    <polygon
      points="20.1,4.6 17.8,5.1 14.8,9.8 17.0,7.4"
      fill={BLUE_LIT}
      stroke={BLUE_DARK}
      strokeWidth={boneStrokeWidth}
    />
    <polygon points="20.1,4.6 19.3,7.0 14.8,9.8 18.0,6.8" fill={boneLight} stroke="none" />
    <polygon
      points="14.8,9.8 12.4,10.5 9.7,15.0 11.9,12.7"
      fill={BLUE_LIT}
      stroke={BLUE_DARK}
      strokeWidth={boneStrokeWidth}
    />
    <polygon points="14.8,9.8 14.0,12.2 9.7,15.0 12.8,12.1" fill={boneLight} stroke="none" />
  </g>
);

/**
 * Diagonal anatomical bone running from bottom-left to top-right with symmetric
 * two-lobed knuckle ends and three-tone upper-left lighting.
 */
export const DiagonalBone: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const boneOutline =
    'M15.8,4.3 C15.5,3.1 16.7,2.1 17.9,2.5 C18.7,2.8 19.1,3.7 19.6,4.2 C20.1,4.7 21.0,5.1 21.3,5.9 C21.7,7.1 20.7,8.3 19.5,8.0 C18.6,7.8 17.9,8.4 17.2,9.1 L9.1,17.2 C8.4,17.9 7.8,18.6 8.0,19.5 C8.3,20.7 7.1,21.7 5.9,21.3 C5.1,21.0 4.7,20.1 4.2,19.6 C3.7,19.1 2.8,18.7 2.5,17.9 C2.1,16.7 3.1,15.5 4.3,15.8 C5.2,16.0 6.0,15.5 6.8,14.7 L14.7,6.8 C15.5,6.0 16.0,5.2 15.8,4.3 Z';
  return (
    <g transform={scale === 1 ? undefined : `translate(12,12) scale(${scale}) translate(-12,-12)`}>
      <path d={boneOutline} fill={GREY_LEFT} stroke={OUTLINE} strokeWidth="1.15" strokeLinejoin="round" />
      <path
        d="M16.3,4.5 C16.1,3.6 17.0,3.0 17.8,3.3 C18.4,3.5 18.7,4.1 19.1,4.6 L15.7,8.0 L8.0,15.7 L4.6,19.1 C4.1,18.7 3.5,18.4 3.3,17.8 C3.0,17.0 3.6,16.1 4.5,16.3 C5.5,16.5 6.4,15.9 7.2,15.1 L15.1,7.2 C15.9,6.4 16.5,5.5 16.3,4.5 Z"
        fill={WHITE}
      />
      <path
        d="M20.6,6.1 C20.9,7.0 20.2,7.7 19.3,7.5 C18.3,7.3 17.5,7.9 16.7,8.7 L8.7,16.7 C7.9,17.5 7.3,18.3 7.5,19.3 C7.7,20.2 7.0,20.9 6.1,20.6 L16.3,10.4 L20.1,6.6 Z"
        fill={GREY_RIGHT}
      />
      <path d={boneOutline} fill="none" stroke={OUTLINE} strokeWidth="1.15" strokeLinejoin="round" />
    </g>
  );
};
