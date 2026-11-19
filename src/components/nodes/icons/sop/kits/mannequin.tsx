import React from 'react';

/** Solid blue mannequin figure (KineFX and agent icons), centered at `(cx, cy)`. */
export const KinefxMannequinBase: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 12,
  cy = 12,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`}>
    {/* Head */}
    <circle cx="12" cy="4.8" r="2.2" fill="#5aa2f2" stroke="#262626" strokeWidth="1.15" />
    {/* Unified sculpted torso, arms and legs silhouette */}
    <path
      d="M8.5 8.2C7.2 8.4 6 10.5 5.4 14.5L7.2 14.8L8.5 11.2L9.2 14.2L8.2 21H10.5L12 16L13.5 21H15.8L14.8 14.2L15.5 11.2L16.8 14.8L18.6 14.5C18 10.5 16.8 8.4 15.5 8.2Z"
      fill="#3672c4"
      stroke="#262626"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
  </g>
);
