import React from 'react';

/**
 * Shared drawing kit for the agent and crowd icons (`characters/agents/`).
 */

/**
 * Standing blue agent mannequin (`KinefxMannequinBase` silhouette) with uniform `#5aa2f2` body
 * and `#8fc2ff` head for clean contrast on both light and dark node backgrounds.
 */
export const AgentMannequin: React.FC<{
  cx?: number;
  cy?: number;
  scale?: number;
}> = ({ cx = 12, cy = 12, scale = 1 }) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    <circle cx="12" cy="4.8" r="2.2" fill="#8fc2ff" stroke="#262626" strokeWidth="1.15" />
    <path
      d="M8.5 8.2C7.2 8.4 6 10.5 5.4 14.5L7.2 14.8L8.5 11.2L9.2 14.2L8.2 21H10.5L12 16L13.5 21H15.8L14.8 14.2L15.5 11.2L16.8 14.8L18.6 14.5C18 10.5 16.8 8.4 15.5 8.2Z"
      fill="#5aa2f2"
      stroke="#262626"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
  </g>
);

/** Upper torso and head bust of the blue agent mannequin, centered at `(cx, cy)`. */
export const AgentBust: React.FC<{
  cx?: number;
  cy?: number;
  scale?: number;
  flip?: boolean;
}> = ({ cx = 12, cy = 12, scale = 1, flip = false }) => {
  const sx = flip ? -scale : scale;
  const sw = (1.1 / scale).toFixed(2);
  return (
    <g transform={`translate(${cx} ${cy}) scale(${sx} ${scale})`} strokeLinejoin="round">
      {/* Upper torso and shoulders */}
      <path
        d="M-5.2,6.4 L-5.2,1.2 C-5.2,-1.6 -3.3,-2.8 0,-2.8 C3.3,-2.8 5.2,-1.6 5.2,1.2 L5.2,6.4 Z"
        fill="#5aa2f2"
        stroke="#262626"
        strokeWidth={sw}
      />
      {/* Head */}
      <circle cx="0" cy="-6.2" r="2.7" fill="#8fc2ff" stroke="#262626" strokeWidth={sw} />
    </g>
  );
};

/**
 * Orange wooden artist mannequin upper body on the right with its arm extended down-left.
 * Shared unchanged by `sop.agentcollisionlayer` and `sop.agentconfigurejoints`.
 */
export const WoodenMannequin: React.FC = () => (
  <g strokeLinejoin="round">
    {/* Torso */}
    <path
      d="M14.2,9.2 C15.2,8.4 18.2,8.4 19.4,9.8 C20.4,11.0 20.6,14.8 19.6,19.2 L14.2,19.2 C13.6,15.6 13.4,11.6 14.2,9.2 Z"
      fill="#ee8624"
      stroke="#262626"
      strokeWidth="1.05"
    />
    {/* Chest highlight */}
    <path d="M15.0,10.2 C16.0,9.6 17.6,9.8 18.2,10.8 L17.6,14.2 L14.8,14.0 Z" fill="#ffb066" />
    {/* Waist joint band */}
    <line x1="14.2" y1="15.4" x2="19.8" y2="15.4" stroke="#c25e12" strokeWidth="1.0" />
    {/* Neck and oval head */}
    <rect x="15.8" y="6.8" width="2.0" height="2.2" rx="0.6" fill="#c25e12" stroke="#262626" strokeWidth="0.9" />
    <ellipse cx="16.8" cy="5.0" rx="2.1" ry="2.6" fill="#ffb066" stroke="#262626" strokeWidth="1.05" />
    {/* Extended arm: upper arm and forearm */}
    <path d="M14.0,10.2 L10.2,13.6 L11.4,14.9 L15.2,11.6 Z" fill="#ee8624" stroke="#262626" strokeWidth="1.0" />
    <path d="M10.2,13.6 L6.0,17.2 L7.1,18.4 L11.4,14.9 Z" fill="#ffb066" stroke="#262626" strokeWidth="1.0" />
    {/* Shoulder and elbow joint balls */}
    <circle cx="14.2" cy="10.8" r="1.25" fill="#c25e12" stroke="#262626" strokeWidth="0.85" />
    <circle cx="10.6" cy="14.1" r="1.05" fill="#c25e12" stroke="#262626" strokeWidth="0.85" />
    {/* Hand */}
    <circle cx="6.2" cy="17.8" r="1.05" fill="#ee8624" stroke="#262626" strokeWidth="0.85" />
  </g>
);

/**
 * Side-profile striding blue agent facing right, centered at `(cx, cy)`.
 * Supports ghosting (`opacity`) and an outer green aura (`auraColor`) for motion path icons.
 */
export const WalkingAgent: React.FC<{
  cx?: number;
  cy?: number;
  scale?: number;
  fill?: string;
  headFill?: string;
  opacity?: number;
  auraColor?: string;
}> = ({ cx = 12, cy = 12, scale = 1, fill = '#8fc2ff', headFill = '#8fc2ff', opacity = 1, auraColor }) => {
  const sw = (0.85 / scale).toFixed(2);
  const bodyPath =
    'M-1.5,-3.4 C0.4,-3.7 2.0,-2.8 2.2,-1.2 L4.0,1.0 L2.8,2.2 L1.3,0.5 L1.3,2.5 L4.1,6.9 L2.0,7.6 L-0.2,3.7 L-2.6,7.5 L-4.5,6.6 L-1.8,2.2 L-1.8,-0.2 L-3.6,1.8 L-4.6,0.8 L-2.4,-2.2 Z';
  return (
    <g
      transform={`translate(${cx} ${cy}) scale(${scale})`}
      opacity={opacity}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {auraColor && (
        <>
          <path d={bodyPath} fill="none" stroke="#262626" strokeWidth={(3.4 / scale).toFixed(2)} />
          <circle cx="0.6" cy="-5.8" r="1.9" fill="none" stroke="#262626" strokeWidth={(3.4 / scale).toFixed(2)} />
          <path d={bodyPath} fill="none" stroke={auraColor} strokeWidth={(1.8 / scale).toFixed(2)} />
          <circle cx="0.6" cy="-5.8" r="1.9" fill="none" stroke={auraColor} strokeWidth={(1.8 / scale).toFixed(2)} />
        </>
      )}
      <path d={bodyPath} fill={fill} stroke="#262626" strokeWidth={sw} />
      <circle cx="0.6" cy="-5.8" r="1.9" fill={headFill} stroke="#262626" strokeWidth={sw} />
    </g>
  );
};

/**
 * Angled yellow fountain pen from upper-right to lower-center.
 * Shared by `sop.agentclipproperties` and `sop.crowdmotionpathedit`.
 */
export const YellowPen: React.FC<{ shiftX?: number; shiftY?: number }> = ({ shiftX = 0, shiftY = 0 }) => (
  <g transform={`translate(${shiftX} ${shiftY})`} strokeLinejoin="round">
    {/* Pen barrel */}
    <path
      d="M19.8,2.6 C21.0,2.2 21.8,3.2 21.2,4.4 L16.2,13.6 L14.1,12.4 L19.1,3.2 Z"
      fill="#f2c438"
      stroke="#262626"
      strokeWidth="1.0"
    />
    {/* Upper highlight strip */}
    <path d="M19.5,3.5 L20.4,4.0 L16.4,11.6 L15.5,11.1 Z" fill="#ffe47a" />
    {/* Gold clip */}
    <path d="M19.0,4.8 L17.3,8.0" fill="none" stroke="#d49a18" strokeWidth="1.2" strokeLinecap="round" />
    {/* Silver nib */}
    <polygon points="14.1,12.4 16.2,13.6 13.1,16.2" fill="#eef2f7" stroke="#262626" strokeWidth="0.95" />
  </g>
);

/**
 * S-curved green path ribbon with an arrowhead pointing right at the bottom.
 * Shared by `sop.crowdmotionpath` and `sop.crowdmotionpathedit`.
 */
export const GreenPathRibbon: React.FC<{ shiftX?: number }> = ({ shiftX = 0 }) => (
  <g transform={`translate(${shiftX} 0)`} strokeLinejoin="round">
    <path
      d="M8.5,14.2 C13.5,14.0 16.5,14.8 16.5,16.0 C16.5,17.2 6.0,17.4 6.0,19.0 C6.0,20.4 11.2,20.8 15.8,20.4 L15.4,21.8 L19.6,19.7 L16.2,17.8 L15.9,19.1 C12.4,19.4 8.6,19.2 8.6,18.6 C8.6,17.8 18.4,17.4 18.4,15.6 C18.4,13.8 14.0,13.0 8.5,13.3 Z"
      fill="#58c848"
      stroke="#262626"
      strokeWidth="0.95"
    />
  </g>
);
