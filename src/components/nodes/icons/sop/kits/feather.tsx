import React from 'react';
import { r2 } from '../../geoHelpers';

/** Three-tone palette for a feather vane: lit upper-left, mid body, shadowed lower-right. */
export type FeatherTones = readonly [string, string, string];

/** Color ramps for the feather family: signature purple, plus blue, green and yellow for Shape Organize. */
export const FEATHER_TONES = {
  purple: ['#edd6fc', '#bd7be8', '#8642b8'],
  blue: ['#8fc2ff', '#5aa2f2', '#3672c4'],
  green: ['#88e878', '#52d638', '#2d8a22'],
  yellow: ['#ffe47a', '#f2c438', '#d49a18'],
} as const satisfies Record<string, FeatherTones>;

/**
 * Shared upright quill feather kit (`(0, 0)` centered, stem tip at `(-0.6, 9.5)`, feather tip at
 * `(0.8, -9.4)`). Uses a gently curved silhouette, three-tone upper-left lighting, an uncased
 * white inner quill over the saturated vane, and a cased protruding stem. Supports `clumped`
 * barb-tuft notches, `bend` curvature for deformation, and `fillOpacity` for ghosted feathers.
 */
export const FeatherVane: React.FC<{
  transform?: string;
  tones?: FeatherTones;
  clumped?: boolean;
  bend?: number;
  fillOpacity?: number;
  showBarbs?: boolean;
}> = ({ transform, tones = FEATHER_TONES.purple, clumped = false, bend = 0, fillOpacity = 1, showBarbs = true }) => {
  const tx = 0.8 + bend;
  const mx = bend * 0.55;

  const outerPath = clumped
    ? `M0,4.8 C-3.0,3.2 -3.4,0.8 -1.8,-0.4 C-3.6,-1.6 -3.2,-4.6 -1.2,-5.6 C-2.4,-6.8 -1.2,-8.4 ${r2(tx)},-9.4 C2.2,-7.6 ${r2(2.6 + mx)},-5.2 ${r2(1.4 + mx)},-4.2 C${r2(3.4 + mx)},-2.8 ${r2(3.4 + mx)},0.4 ${r2(1.6 + mx)},1.2 C${r2(3.0 + mx)},2.4 2.2,4.0 0,4.8 Z`
    : `M0,4.8 C${r2(-3.8 + mx * 0.4)},2.4 ${r2(-3.6 + mx * 0.8)},-4.0 ${r2(tx)},-9.4 C${r2(3.8 + mx)},-3.6 ${r2(3.4 + mx * 0.5)},2.4 0,4.8 Z`;

  const rightHalfPath = clumped
    ? `M${r2(tx)},-9.4 C2.2,-7.6 ${r2(2.6 + mx)},-5.2 ${r2(1.4 + mx)},-4.2 C${r2(3.4 + mx)},-2.8 ${r2(3.4 + mx)},0.4 ${r2(1.6 + mx)},1.2 C${r2(3.0 + mx)},2.4 2.2,4.0 0,4.8 Q${r2(0.5 + mx)},-0.6 ${r2(tx)},-9.4 Z`
    : `M${r2(tx)},-9.4 C${r2(3.8 + mx)},-3.6 ${r2(3.4 + mx * 0.5)},2.4 0,4.8 Q${r2(0.5 + mx)},-0.6 ${r2(tx)},-9.4 Z`;

  const shadowEdgePath = `M${r2(tx)},-8.4 C${r2(3.1 + mx)},-3.0 ${r2(2.9 + mx * 0.5)},2.0 0.4,4.2 C${r2(2.1 + mx * 0.4)},2.0 ${r2(2.4 + mx * 0.8)},-2.4 ${r2(tx)},-8.4 Z`;

  const innerQuillPath = `M0,4.8 Q${r2(0.5 + mx)},-0.6 ${r2(tx * 0.88)},-7.6`;

  return (
    <g transform={transform}>
      {/* Protruding lower stem with dark casing */}
      <g strokeLinecap="round" fill="none" opacity={fillOpacity < 1 ? 0.65 : 1}>
        <path d="M-0.6,9.5 L0,4.8" stroke="#262626" strokeWidth="1.45" />
        <path d="M-0.6,9.5 L0,4.8" stroke="#ffffff" strokeWidth="0.8" />
      </g>
      {/* Vane body */}
      <g fillOpacity={fillOpacity}>
        <path d={outerPath} fill={tones[0]} stroke="#262626" strokeWidth="1.0" strokeLinejoin="round" />
        <path d={rightHalfPath} fill={tones[1]} stroke="none" />
        {!clumped && <path d={shadowEdgePath} fill={tones[2]} stroke="none" />}
        {showBarbs && (
          <path
            d={`M${r2(-0.1 + mx * 0.6)},-3.4 L${r2(-2.1 + mx * 0.6)},-5.0 M${r2(-0.1 + mx * 0.4)},-0.4 L${r2(-2.4 + mx * 0.4)},-2.0 M0.0,2.4 L-2.0,0.9 M${r2(0.7 + mx * 0.6)},-3.4 L${r2(2.5 + mx * 0.6)},-4.8 M${r2(0.6 + mx * 0.4)},-0.4 L${r2(2.7 + mx * 0.4)},-1.8 M0.4,2.4 L2.2,1.0`}
            fill="none"
            stroke={tones[2]}
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        )}
        <path d={outerPath} fill="none" stroke="#262626" strokeWidth="1.0" strokeLinejoin="round" />
      </g>
      {/* Uncased white inner quill over saturated vane */}
      <path
        d={innerQuillPath}
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity={fillOpacity < 1 ? 0.7 : 1}
      />
    </g>
  );
};
