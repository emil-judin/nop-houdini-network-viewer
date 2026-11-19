import React from 'react';
import { r2, roundedRectPath } from '../../geoHelpers';

/**
 * Shared drawing kit for the APEX icons (`characters/apex/`).
 */

export const APEX_OUTLINE = '#262626';

export const APEX_GREEN = '#52d638';

export const APEX_GREEN_LIGHT = '#88e878';

export const APEX_GREEN_DARK = '#2d8a22';

export const APEX_GRID_BG = '#f2eef7';

export const APEX_GRID_LINE = '#c09ce0';

export const APEX_WOOD_LIGHT = '#ffe47a';

export const APEX_WOOD_MID = '#f2c438';

export const APEX_WOOD_DARK = '#ee8624';

export const APEX_PURPLE_LIGHT = '#d8b8f0';

export const APEX_PURPLE_MID = '#b080d8';

/**
 * Pale lavender square grid panel used behind APEX Graph figures.
 */
export const ApexGridPanel: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}> = ({ x = 2.8, y = 5.6, w = 13.8, h = 12.6 }) => {
  const cols = 4;
  const rows = 4;
  return (
    <g strokeLinejoin="round">
      <rect x={x} y={y} width={w} height={h} rx="0.6" fill={APEX_GRID_BG} stroke={APEX_OUTLINE} strokeWidth="0.9" />
      {[1, 2, 3].map((i) => (
        <line
          key={`vx-${i}`}
          x1={r2(x + (w * i) / cols)}
          y1={y + 0.4}
          x2={r2(x + (w * i) / cols)}
          y2={r2(y + h - 0.4)}
          stroke={APEX_GRID_LINE}
          strokeWidth="0.65"
        />
      ))}
      {[1, 2, 3].map((i) => (
        <line
          key={`hy-${i}`}
          x1={x + 0.4}
          y1={r2(y + (h * i) / rows)}
          x2={r2(x + w - 0.4)}
          y2={r2(y + (h * i) / rows)}
          stroke={APEX_GRID_LINE}
          strokeWidth="0.65"
        />
      ))}
    </g>
  );
};

/**
 * Green articulated graph-node stick figure (APEX Graph character).
 * Centered around `(12, 12)` in local `0..24` space.
 * Supports `legMode` for `sop.apex.mergegraph` (`leftOnly` or `rightLegOnly`).
 */
export const ApexGraphFigure: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
  cased?: boolean;
  legMode?: 'both' | 'leftOnly' | 'rightLegOnly';
}> = ({ x = 9.8, y = 12.2, scale = 1, opacity = 1, cased = true, legMode = 'both' }) => {
  const swLine = r2(1.15 / scale);
  const swCase = r2(2.15 / scale);
  const swNode = r2(0.75 / scale);

  const upperBodyD =
    'M12,6.2 L12,12.8 M8.8,7.6 L15.2,7.6 M8.8,7.6 L7.0,10.8 L6.0,14.2 M15.2,7.6 L17.0,10.8 L18.0,14.2 M9.8,12.8 L14.2,12.8';
  const leftLegD = 'M9.8,12.8 L9.4,16.8 L9.0,20.4';
  const rightLegD = 'M14.2,12.8 L14.6,16.8 L15.0,20.4';

  const bonesD =
    legMode === 'rightLegOnly'
      ? rightLegD
      : legMode === 'leftOnly'
        ? `${upperBodyD} ${leftLegD}`
        : `${upperBodyD} ${leftLegD} ${rightLegD}`;

  const upperNodes: ReadonlyArray<readonly [number, number, number]> = [
    [8.8, 7.6, 1.5], // L shoulder
    [15.2, 7.6, 1.5], // R shoulder
    [6.0, 14.2, 1.4], // L hand
    [18.0, 14.2, 1.4], // R hand
  ];
  const leftLegNodes: ReadonlyArray<readonly [number, number, number]> = [
    [9.8, 12.8, 1.4], // L hip
    [9.4, 16.8, 1.3], // L knee
    [9.0, 20.4, 1.5], // L foot
  ];
  const rightLegNodes: ReadonlyArray<readonly [number, number, number]> = [
    [14.2, 12.8, 1.4], // R hip
    [14.6, 16.8, 1.3], // R knee
    [15.0, 20.4, 1.5], // R foot
  ];

  const nodes =
    legMode === 'rightLegOnly'
      ? rightLegNodes
      : legMode === 'leftOnly'
        ? [...upperNodes, ...leftLegNodes]
        : [...upperNodes, ...leftLegNodes, ...rightLegNodes];

  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) translate(-12 -12)`} opacity={opacity} strokeLinejoin="round">
      {cased && <path d={bonesD} fill="none" stroke={APEX_OUTLINE} strokeWidth={swCase} strokeLinecap="round" />}
      <path d={bonesD} fill="none" stroke={APEX_GREEN} strokeWidth={swLine} strokeLinecap="round" />
      {/* Head node */}
      {legMode !== 'rightLegOnly' && (
        <rect
          x="10.4"
          y="3.4"
          width="3.2"
          height="3.0"
          rx="0.6"
          fill={APEX_GREEN}
          stroke={APEX_OUTLINE}
          strokeWidth={r2(0.85 / scale)}
        />
      )}
      {/* Joint nodes */}
      {nodes.map(([nx, ny, sz], idx) => (
        <rect
          key={idx}
          x={r2(nx - sz / 2)}
          y={r2(ny - sz / 2)}
          width={sz}
          height={sz}
          rx="0.3"
          fill={APEX_GREEN}
          stroke={APEX_OUTLINE}
          strokeWidth={swNode}
        />
      ))}
    </g>
  );
};

/**
 * Bold white `+` sign with a dark `#262626` outline.
 */
export const ApexPlusSign: React.FC<{
  cx?: number;
  cy?: number;
  scale?: number;
}> = ({ cx = 16.8, cy = 15.8, scale = 1 }) => (
  <g transform={`translate(${cx} ${cy}) scale(${scale})`} strokeLinejoin="round">
    <path
      d="M-1.2,-3.4 H1.2 V-1.2 H3.4 V1.2 H1.2 V3.4 H-1.2 V1.2 H-3.4 V-1.2 H-1.2 Z"
      fill="#ffffff"
      stroke={APEX_OUTLINE}
      strokeWidth={r2(0.95 / scale)}
    />
  </g>
);

/**
 * Three-tone wooden artist mannequin facing front-left, centered around `(12, 12)`.
 */
export const ApexWoodenMannequin: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
}> = ({ x = 12, y = 12, scale = 1 }) => {
  const sw = r2(0.85 / scale);
  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) translate(-12 -12)`} strokeLinejoin="round">
      {/* Left arm (viewer left) */}
      <path d="M8.6,7.0 L5.8,10.6 L7.2,11.6 L9.6,8.4 Z" fill={APEX_WOOD_MID} stroke={APEX_OUTLINE} strokeWidth={sw} />
      <path
        d="M5.8,10.8 L4.4,14.0 L5.8,14.6 L7.2,11.6 Z"
        fill={APEX_WOOD_LIGHT}
        stroke={APEX_OUTLINE}
        strokeWidth={sw}
      />
      {/* Right arm (viewer right) */}
      <path
        d="M15.4,7.0 L18.2,10.6 L16.8,11.6 L14.4,8.4 Z"
        fill={APEX_WOOD_DARK}
        stroke={APEX_OUTLINE}
        strokeWidth={sw}
      />
      <path
        d="M18.2,10.8 L19.6,14.0 L18.2,14.6 L16.8,11.6 Z"
        fill={APEX_WOOD_MID}
        stroke={APEX_OUTLINE}
        strokeWidth={sw}
      />
      {/* Left leg */}
      <path
        d="M9.4,13.2 L11.6,13.2 L11.2,17.4 L9.2,17.4 Z"
        fill={APEX_WOOD_MID}
        stroke={APEX_OUTLINE}
        strokeWidth={sw}
      />
      <path
        d="M9.2,17.4 L11.2,17.4 L10.8,21.4 L8.8,21.4 Z"
        fill={APEX_WOOD_LIGHT}
        stroke={APEX_OUTLINE}
        strokeWidth={sw}
      />
      {/* Right leg */}
      <path
        d="M12.4,13.2 L14.6,13.2 L15.0,17.4 L13.0,17.4 Z"
        fill={APEX_WOOD_MID}
        stroke={APEX_OUTLINE}
        strokeWidth={sw}
      />
      <path
        d="M13.0,17.4 L15.0,17.4 L15.4,21.4 L13.4,21.4 Z"
        fill={APEX_WOOD_LIGHT}
        stroke={APEX_OUTLINE}
        strokeWidth={sw}
      />
      {/* Pelvis */}
      <path d={roundedRectPath(9.0, 11.2, 6.0, 2.4, 0.7)} fill={APEX_WOOD_MID} stroke={APEX_OUTLINE} strokeWidth={sw} />
      {/* Torso / ribcage */}
      <path
        d="M8.6,6.4 L15.4,6.4 L14.2,11.4 L9.8,11.4 Z"
        fill={APEX_WOOD_LIGHT}
        stroke={APEX_OUTLINE}
        strokeWidth={sw}
      />
      {/* Neck + Head */}
      <rect
        x="11.1"
        y="5.0"
        width="1.8"
        height="1.6"
        fill={APEX_WOOD_DARK}
        stroke={APEX_OUTLINE}
        strokeWidth={r2(0.7 / scale)}
      />
      <ellipse cx="12.0" cy="3.6" rx="1.8" ry="2.0" fill={APEX_WOOD_LIGHT} stroke={APEX_OUTLINE} strokeWidth={sw} />
      {/* Ball joints */}
      {[
        [9.0, 7.6],
        [15.0, 7.6],
        [5.9, 10.8],
        [17.9, 10.8],
        [10.2, 17.3],
        [14.0, 17.3],
      ].map(([jx, jy], idx) => (
        <circle
          key={idx}
          cx={jx}
          cy={jy}
          r="0.7"
          fill={APEX_WOOD_DARK}
          stroke={APEX_OUTLINE}
          strokeWidth={r2(0.6 / scale)}
        />
      ))}
    </g>
  );
};
