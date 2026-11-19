import React from 'react';
import { gearPath, r2, roundedRectPath } from '../../geoHelpers';

/**
 * Shared drawing kit for the KineFX icons (`characters/kinefx/`).
 */

export const KINEFX_OUTLINE = '#262626';

export const KINEFX_BLUE_DARK = '#3672c4';

export const KINEFX_BLUE_MID = '#5aa2f2';

export const KINEFX_BLUE_LIGHT = '#8fc2ff';

export const KINEFX_GREEN = '#52d638';

export const KINEFX_GREEN_MID = '#58c848';

/**
 * Blue KineFX martial-arts action figure with green joint balls and bone lines.
 * Centered at `(x, y)` in a `0 0 24 24` box.
 */
export const KinefxSkeletonFigure: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  showJoints?: boolean;
  fill?: string;
  jointColor?: string;
  opacity?: number;
}> = ({ x = 12, y = 12, scale = 1, showJoints = true, fill, jointColor = KINEFX_GREEN, opacity = 1 }) => {
  const bodyFill = fill ?? KINEFX_BLUE_MID;
  const sw = r2(0.95 / scale);
  const jSw = r2(0.65 / scale);
  const joints: ReadonlyArray<readonly [number, number]> = [
    [9.4, 7.6], // L shoulder
    [13.4, 7.6], // R shoulder
    [5.0, 11.2], // L hand
    [16.0, 5.2], // R hand
    [7.4, 15.6], // L knee
    [6.8, 20.4], // L ankle
    [15.4, 16.0], // R knee
    [19.6, 19.8], // R ankle
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) translate(-12 -12)`} opacity={opacity} strokeLinejoin="round">
      {/* Head */}
      <circle cx="11.4" cy="4.2" r="1.9" fill={bodyFill} stroke={KINEFX_OUTLINE} strokeWidth={sw} />
      {/* Body silhouette */}
      <path
        d="M9.0,6.6 L13.8,6.6 L15.4,7.0 L15.0,4.8 L16.6,4.8 L17.0,8.6 L13.6,8.8 L12.8,12.4 L16.8,15.8 L20.6,19.8 L19.0,21.0 L14.4,17.0 L11.2,13.8 L8.6,16.2 L7.8,21.0 L5.6,20.8 L6.4,15.0 L9.4,11.8 L9.0,8.8 L7.0,9.4 L5.2,11.8 L3.8,10.8 L6.0,7.8 Z"
        fill={bodyFill}
        stroke={KINEFX_OUTLINE}
        strokeWidth={sw}
      />
      {showJoints && (
        <>
          <path
            d="M11.4,7.6 L11.2,11.8 M9.4,7.6 L13.4,7.6 M9.4,7.6 L6.6,8.8 L5.0,11.2 M13.4,7.6 L16.2,8.0 L16.0,5.2 M11.2,11.8 L7.4,15.6 L6.8,20.4 M11.2,11.8 L15.4,16.0 L19.6,19.8"
            fill="none"
            stroke={jointColor}
            strokeWidth={r2(0.85 / scale)}
            strokeLinecap="round"
          />
          {joints.map(([jx, jy], idx) => (
            <circle key={idx} cx={jx} cy={jy} r="0.88" fill={jointColor} stroke={KINEFX_OUTLINE} strokeWidth={jSw} />
          ))}
        </>
      )}
    </g>
  );
};

/**
 * Standing blue KineFX figure facing front, with optional green joints.
 */
export const KinefxStandingFigure: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  showJoints?: boolean;
  fill?: string;
  headFill?: string;
  jointColor?: string;
  pose?: 'stand' | 'tpose' | 'mirror';
  opacity?: number;
}> = ({
  x = 12,
  y = 12,
  scale = 1,
  showJoints = false,
  fill,
  headFill,
  jointColor = KINEFX_GREEN,
  pose = 'stand',
  opacity = 1,
}) => {
  const bodyFill = fill ?? KINEFX_BLUE_MID;
  const hFill = headFill ?? bodyFill;
  const sw = r2(0.95 / scale);
  const jSw = r2(0.65 / scale);
  const bodyD =
    pose === 'tpose'
      ? 'M9.6,7.4 L4.2,7.6 L4.2,9.2 L9.6,9.4 L10.0,13.2 L8.8,20.6 L10.8,20.6 L12.0,15.0 L13.2,20.6 L15.2,20.6 L14.0,13.2 L14.4,9.4 L19.8,9.2 L19.8,7.6 L14.4,7.4 Z'
      : pose === 'mirror'
        ? 'M9.4,7.4 L5.4,5.6 L4.6,7.0 L8.8,9.2 L9.8,13.2 L8.8,20.6 L10.8,20.6 L12.0,15.0 L13.2,20.6 L15.2,20.6 L14.2,13.2 L14.8,9.4 L17.6,12.8 L18.8,11.6 L14.8,7.4 Z'
        : 'M9.2,7.4 C7.4,7.8 6.4,10.4 5.8,13.8 L7.4,14.2 L8.8,10.6 L9.6,13.8 L8.6,20.6 L10.7,20.6 L12.0,15.2 L13.3,20.6 L15.4,20.6 L14.4,13.8 L15.2,10.6 L16.6,14.2 L18.2,13.8 C17.6,10.4 16.6,7.8 14.8,7.4 Z';

  const joints: ReadonlyArray<readonly [number, number]> = [
    [12.0, 7.0],
    [9.4, 8.2],
    [14.6, 8.2],
    [6.6, 13.8],
    [17.4, 13.8],
    [10.0, 16.8],
    [14.0, 16.8],
    [9.6, 20.2],
    [14.4, 20.2],
  ];

  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) translate(-12 -12)`} opacity={opacity} strokeLinejoin="round">
      <circle cx="12" cy="4.6" r="1.9" fill={hFill} stroke={KINEFX_OUTLINE} strokeWidth={sw} />
      <path d={bodyD} fill={bodyFill} stroke={KINEFX_OUTLINE} strokeWidth={sw} />
      {showJoints && (
        <>
          <path
            d="M12,7.0 L12,13.0 M9.4,8.2 L14.6,8.2 M9.4,8.2 L6.6,13.8 M14.6,8.2 L17.4,13.8 M12,13.0 L10.0,16.8 L9.6,20.2 M12,13.0 L14.0,16.8 L14.4,20.2"
            fill="none"
            stroke={jointColor}
            strokeWidth={r2(1.05 / scale)}
            strokeLinecap="round"
          />
          {joints.map(([jx, jy], idx) => (
            <circle key={idx} cx={jx} cy={jy} r="0.92" fill={jointColor} stroke={KINEFX_OUTLINE} strokeWidth={jSw} />
          ))}
        </>
      )}
    </g>
  );
};

/** Stylized 5-fingered hand silhouette path from `KinefxJointLimb`. */
export const KINEFX_HAND_PATH =
  'M5.4,7.6 L3.2,5.6 L3.9,4.9 L5.5,6.3 L4.4,3.8 L5.2,3.4 L6.3,5.8 L6.2,3.0 L7.1,3.0 L7.2,5.8 L7.9,3.3 L8.8,3.6 L8.1,6.2 L9.6,5.2 L10.1,6.0 L7.8,8.4 Z';

/**
 * V-shaped bent blue bone limb with an optional 5-fingered upper-left hand and three connected green joint balls.
 */
export const KinefxJointLimb: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  showHand?: boolean;
  connectJoints?: boolean;
  strokeWidth?: number;
}> = ({ x = 12, y = 12, scale = 1, showHand = true, connectJoints = true, strokeWidth }) => {
  const sw = r2((strokeWidth ?? 0.95) / scale);
  const handSw = r2((strokeWidth !== undefined ? Math.max(0.6, strokeWidth) : 0.8) / scale);
  const jSw = r2((strokeWidth !== undefined ? Math.max(0.6, strokeWidth) : 0.8) / scale);
  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) translate(-12 -12)`} strokeLinejoin="round">
      {/* Stylized 5-fingered hand shifted slightly right */}
      {showHand && (
        <g transform="translate(0.9 0)">
          <path d={KINEFX_HAND_PATH} fill={KINEFX_BLUE_MID} stroke={KINEFX_OUTLINE} strokeWidth={handSw} />
        </g>
      )}
      {/* Left forearm bone */}
      <path
        d="M6.8,8.4 L9.8,7.2 L13.2,16.0 L10.0,17.4 Z"
        fill={KINEFX_BLUE_MID}
        stroke={KINEFX_OUTLINE}
        strokeWidth={sw}
      />
      {/* Right upper arm bone */}
      <path
        d="M10.0,15.4 L17.4,7.2 L20.0,9.4 L12.6,17.8 Z"
        fill={KINEFX_BLUE_MID}
        stroke={KINEFX_OUTLINE}
        strokeWidth={sw}
      />
      {connectJoints && (
        <path
          d="M8.5,8.8 L11.4,16.6 L18.5,8.6"
          fill="none"
          stroke={KINEFX_GREEN}
          strokeWidth={r2(1.0 / scale)}
          strokeLinecap="round"
        />
      )}
      {/* Three green joint balls */}
      {[
        [8.5, 8.8],
        [11.4, 16.6],
        [18.5, 8.6],
      ].map(([jx, jy], idx) => (
        <circle key={idx} cx={jx} cy={jy} r="1.85" fill={KINEFX_GREEN} stroke={KINEFX_OUTLINE} strokeWidth={jSw} />
      ))}
    </g>
  );
};

/**
 * Single side-profile running blue figure facing right, centered around `(0, 0)`.
 */
export const KinefxRunner: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  fill?: string;
  strokeColor?: string;
  opacity?: number;
  flip?: boolean;
  strokeWidth?: number;
}> = ({
  x = 12,
  y = 12,
  scale = 1,
  fill = KINEFX_BLUE_MID,
  strokeColor = KINEFX_OUTLINE,
  opacity = 1,
  flip = false,
  strokeWidth = 1.0,
}) => {
  const sx = flip ? -scale : scale;
  const sw = r2(strokeWidth / scale);
  return (
    <g transform={`translate(${x} ${y}) scale(${sx} ${scale})`} opacity={opacity} strokeLinejoin="round">
      <circle cx="0.6" cy="-5.8" r="1.65" fill={fill} stroke={strokeColor} strokeWidth={sw} />
      <path
        d="M-1.0,-3.8 C0.6,-4.0 2.0,-3.2 2.1,-1.6 L4.2,-0.2 L3.2,1.2 L1.4,-0.2 L1.4,2.0 L4.4,5.8 L2.4,6.6 L0.0,3.0 L-2.4,6.6 L-4.4,5.7 L-1.6,1.8 L-1.6,-0.2 L-3.6,1.4 L-4.6,0.2 L-2.2,-2.6 Z"
        fill={fill}
        stroke={strokeColor}
        strokeWidth={sw}
      />
    </g>
  );
};

/**
 * Row of ghosted blue running figures (motion clip strip).
 */
export const KinefxClipStrip: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  count?: number;
  flip?: boolean;
  strokeWidth?: number;
}> = ({ x = 12, y = 12, scale = 1, count = 4, flip = false, strokeWidth = 0.9 }) => {
  const step = 3.4;
  const start = -((count - 1) * step) / 2;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {Array.from({ length: count }, (_, i) => {
        const t = count === 1 ? 1 : i / (count - 1);
        const op = r2(0.55 + t * 0.45);
        const fill = KINEFX_BLUE_MID;
        const px = flip ? -start - i * step : start + i * step;
        return (
          <KinefxRunner
            key={i}
            x={px}
            y={0}
            scale={0.84}
            fill={fill}
            opacity={op}
            flip={flip}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </g>
  );
};

/**
 * Yellow 3/4 door frame with white open door and blue KineFX figure stepping through.
 * `direction="in"` puts the frame on the left; `direction="out"` mirrors it to the right.
 */
export const KinefxDoorFrame: React.FC<{
  direction?: 'in' | 'out';
  skinGlow?: boolean;
  showClip?: boolean;
  showKnob?: boolean;
  backdrop?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ direction = 'in', skinGlow = false, showClip = false, showKnob = true, backdrop, children }) => {
  const flip = direction === 'out';
  const runnerStroke = skinGlow ? KINEFX_GREEN : KINEFX_OUTLINE;
  const runnerSw = skinGlow ? 1.25 : 1.0;
  return (
    <g strokeLinejoin="round">
      <g transform={flip ? 'translate(24 0) scale(-1 1)' : undefined}>
        {/* White door panel swung open into the room */}
        <polygon
          points="4.8,4.0 11.4,5.4 11.4,19.4 4.8,20.8"
          fill="#eef2f7"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.95"
        />
        {/* Optional door handle */}
        {showKnob && <circle cx="10.0" cy="12.6" r="0.6" fill="#89929e" stroke={KINEFX_OUTLINE} strokeWidth="0.6" />}
        {/* Yellow door frame (top + left jamb) */}
        <polygon
          points="3.2,2.8 11.6,4.5 11.6,5.6 4.6,4.2 4.6,20.6 3.2,21.0"
          fill="#f2c438"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.95"
        />
      </g>
      {backdrop}
      <g transform={flip ? 'translate(24 0) scale(-1 1)' : undefined}>
        {/* 3 spaced figurines: leftmost most translucent (drawn first), rightmost solid (drawn last on top) */}
        {showClip ? (
          flip ? (
            <>
              <KinefxRunner x={11.4} y={13.4} scale={0.86} fill={KINEFX_BLUE_MID} opacity={0.42} flip />
              <KinefxRunner x={8.6} y={13.4} scale={0.86} fill={KINEFX_BLUE_MID} opacity={0.7} flip />
              <KinefxRunner x={5.8} y={13.4} scale={0.86} fill={KINEFX_BLUE_MID} opacity={1} flip />
            </>
          ) : (
            <>
              <KinefxRunner x={5.8} y={13.4} scale={0.86} fill={KINEFX_BLUE_MID} opacity={0.42} />
              <KinefxRunner x={8.6} y={13.4} scale={0.86} fill={KINEFX_BLUE_MID} opacity={0.7} />
              <KinefxRunner x={11.4} y={13.4} scale={0.86} fill={KINEFX_BLUE_MID} opacity={1} />
            </>
          )
        ) : (
          <KinefxRunner
            x={6.2}
            y={13.4}
            scale={0.88}
            fill={KINEFX_BLUE_MID}
            strokeColor={runnerStroke}
            strokeWidth={runnerSw}
            flip={flip}
          />
        )}
        {/* Re-draw yellow left jamb edge in front so the figure looks like it emerges from the doorway */}
        <polygon points="3.2,2.8 4.6,3.1 4.6,20.6 3.2,21.0" fill="#f2c438" stroke={KINEFX_OUTLINE} strokeWidth="0.95" />
      </g>
      {children}
    </g>
  );
};

/**
 * Dark round badge with a white/green calculator glyph.
 */
export const KinefxCalcBadge: React.FC<{ cx?: number; cy?: number; r?: number }> = ({
  cx = 16.6,
  cy = 16.6,
  r = 4.6,
}) => (
  <g transform={`translate(${cx} ${cy})`} strokeLinejoin="round">
    <circle cx="0" cy="0" r={r} fill="#2e3338" stroke={KINEFX_OUTLINE} strokeWidth="0.95" />
    <circle cx="0" cy="0" r={r2(r - 0.55)} fill="none" stroke="#f2f4f7" strokeWidth="0.6" />
    <path d={roundedRectPath(-2.2, -2.8, 4.4, 5.6, 0.7)} fill="#ffffff" stroke={KINEFX_OUTLINE} strokeWidth="0.65" />
    <rect
      x="-1.6"
      y="-2.2"
      width="3.2"
      height="1.2"
      rx="0.2"
      fill={KINEFX_GREEN}
      stroke={KINEFX_OUTLINE}
      strokeWidth="0.6"
    />
    {/* Button dots */}
    {[-1.1, 0, 1.1].map((bx) =>
      [-0.2, 0.9, 2.0].map((by) => <circle key={`${bx}-${by}`} cx={bx} cy={by} r="0.35" fill="#3a3f47" />),
    )}
  </g>
);

/**
 * Dark round badge with a white 8-tooth gear glyph.
 */
export const KinefxGearBadge: React.FC<{
  cx?: number;
  cy?: number;
  r?: number;
  bgFill?: string;
  showRing?: boolean;
  gearScale?: number;
  gearStroke?: boolean;
}> = ({ cx = 16.6, cy = 16.6, r = 4.6, bgFill = '#2e3338', showRing = true, gearScale = 1, gearStroke = true }) => (
  <g transform={`translate(${cx} ${cy})`} strokeLinejoin="round">
    <circle cx="0" cy="0" r={r} fill={bgFill} stroke={KINEFX_OUTLINE} strokeWidth="0.95" />
    {showRing && <circle cx="0" cy="0" r={r2(r - 0.55)} fill="none" stroke="#f2f4f7" strokeWidth="0.6" />}
    <path
      d={gearPath(0, 0, 8, r2(3.0 * gearScale), r2(2.0 * gearScale))}
      fill="#ffffff"
      stroke={gearStroke ? KINEFX_OUTLINE : 'none'}
      strokeWidth={gearStroke ? '0.6' : undefined}
    />
    <circle
      cx="0"
      cy="0"
      r={r2((gearStroke ? 1.05 : 0.8) * gearScale)}
      fill={bgFill}
      stroke={gearStroke ? KINEFX_OUTLINE : 'none'}
      strokeWidth={gearStroke ? '0.6' : undefined}
    />
  </g>
);

/**
 * Translucent wireframe transform sphere with green longitude/ring and red equator.
 */
export const KinefxTransformSphere: React.FC<{ cx?: number; cy?: number; r?: number }> = ({
  cx = 10.5,
  cy = 10.5,
  r = 6.8,
}) => (
  <g transform={`translate(${cx} ${cy})`} strokeLinejoin="round">
    <circle cx="0" cy="0" r={r} fill="#eef2f7" fillOpacity="0.86" stroke={KINEFX_OUTLINE} strokeWidth="0.95" />
    <circle cx="0" cy="0" r={r2(r * 0.92)} fill="none" stroke={KINEFX_GREEN} strokeWidth="0.95" />
    {/* Right half only of the vertical longitude arc */}
    <path
      d={`M0,${r2(-r * 0.92)} A${r2(r * 0.42)},${r2(r * 0.92)} 0 0,1 0,${r2(r * 0.92)}`}
      fill="none"
      stroke={KINEFX_BLUE_MID}
      strokeWidth="0.85"
    />
    <path
      d={`M${r2(-r * 0.94)},0 A${r2(r * 0.94)},${r2(r * 0.34)} 0 0,0 ${r2(r * 0.94)},0`}
      fill="none"
      stroke="#e03228"
      strokeWidth="1.0"
    />
  </g>
);

/**
 * Smooth generic blue bald head bust (no real person) for blend shape icons.
 */
export const KinefxBaldHead: React.FC<{ x?: number; y?: number; scale?: number }> = ({ x = 12, y = 12, scale = 1 }) => {
  const sw = r2(1.0 / scale);
  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) translate(-12 -12)`} strokeLinejoin="round">
      {/* Neck */}
      <path
        d="M9.6,17.2 L9.6,21.0 L15.4,21.0 L14.8,17.2 Z"
        fill={KINEFX_BLUE_DARK}
        stroke={KINEFX_OUTLINE}
        strokeWidth={sw}
      />
      {/* Head */}
      <path
        d="M6.4,10.0 C6.4,5.4 9.2,3.0 13.0,3.2 C16.8,3.4 18.8,6.2 18.6,10.6 C18.4,14.8 15.6,18.8 11.4,19.0 C8.2,19.1 6.4,15.6 6.4,10.0 Z"
        fill={KINEFX_BLUE_MID}
        stroke={KINEFX_OUTLINE}
        strokeWidth={sw}
      />
      {/* Forehead highlight */}
      <path d="M8.6,5.2 C10.4,4.0 13.0,4.0 14.6,5.2 C13.2,6.4 10.2,6.6 8.6,5.2 Z" fill={KINEFX_BLUE_LIGHT} />
      {/* Stylized brows, eyes and smirk */}
      <path
        d="M7.6,9.4 L10.2,10.4 M11.6,10.4 L14.8,9.2"
        fill="none"
        stroke={KINEFX_OUTLINE}
        strokeWidth={r2(0.85 / scale)}
        strokeLinecap="round"
      />
      <ellipse
        cx="8.8"
        cy="11.2"
        rx="0.9"
        ry="0.65"
        fill="#ffffff"
        stroke={KINEFX_OUTLINE}
        strokeWidth={r2(0.75 / scale)}
      />
      <ellipse
        cx="13.2"
        cy="11.2"
        rx="1.0"
        ry="0.7"
        fill="#ffffff"
        stroke={KINEFX_OUTLINE}
        strokeWidth={r2(0.75 / scale)}
      />
      <path
        d="M8.8,15.2 Q11.4,16.4 13.4,14.8"
        fill="none"
        stroke={KINEFX_OUTLINE}
        strokeWidth={r2(0.85 / scale)}
        strokeLinecap="round"
      />
    </g>
  );
};

/**
 * Redrawn FBX calligraphic X-figure emblem (vendor logo, redrawn) without the white tile or text.
 */
export const FbxEmblem: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 16.5,
  cy = 10.5,
  scale = 0.56,
}) => (
  <g transform={`translate(${cx} ${cy}) scale(${scale}) translate(-12 -8.5)`} strokeLinejoin="round">
    <g fill="none" stroke="#f2f4f7" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.6,12.4 Q11.8,8.2 17.4,3.8" />
      <path d="M8.8,4.0 Q12.0,8.6 15.0,13.0" />
    </g>
    <g fill="none" stroke={KINEFX_OUTLINE} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.6,12.4 Q11.8,8.2 17.4,3.8" />
      <path d="M8.8,4.0 Q12.0,8.6 15.0,13.0" />
    </g>
    <circle cx="12.2" cy="4.2" r="1.15" fill={KINEFX_OUTLINE} stroke="#f2f4f7" strokeWidth={r2(0.7 / scale)} />
  </g>
);

/**
 * Redrawn glTF oval badge matching `sop.gltf` (`io/fileIo.tsx`): white oval with a green swoosh
 * wrapping around green glTF letters (vendor logo, redrawn), with thin matching outlines.
 */
export const GltfBadge: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({
  cx = 17.4,
  cy = 7.2,
  scale = 0.46,
}) => (
  <g transform={`translate(${cx} ${cy}) scale(${scale}) translate(-12 -12)`} strokeLinejoin="round">
    <ellipse cx="12" cy="12" rx="9.8" ry="6.6" fill="#f2f4f7" stroke={KINEFX_OUTLINE} strokeWidth={r2(0.6 / scale)} />
    <path
      d="M19.8,8.6 C17.4,6.4 13.0,5.8 8.6,7.0 C4.6,8.2 2.8,10.6 3.2,13.2 C3.6,15.8 6.8,17.6 11.4,17.6 C14.8,17.6 17.8,16.4 19.6,14.6 C17.4,15.8 14.4,16.2 11.4,15.8 C7.8,15.4 5.8,13.8 5.8,11.8 C5.8,9.8 8.0,8.0 11.6,7.6 C14.6,7.3 17.6,7.8 19.8,9.2 Z"
      fill={KINEFX_GREEN_MID}
      stroke={KINEFX_OUTLINE}
      strokeWidth={r2(0.6 / scale)}
      paintOrder="stroke"
    />
    <text
      x="13.4"
      y="14.2"
      textAnchor="middle"
      fontSize="7.2"
      fontWeight="800"
      fontFamily="sans-serif"
      fill={KINEFX_GREEN}
      stroke={KINEFX_OUTLINE}
      strokeWidth={r2(0.6 / scale)}
      paintOrder="stroke"
    >
      glTF
    </text>
  </g>
);

/**
 * Compact dark grey cinema clapperboard for Scene Character Import/Export.
 */
export const Clapperboard: React.FC<{ x?: number; y?: number; scale?: number }> = ({
  x = 8.0,
  y = 13.0,
  scale = 1,
}) => {
  const sw = r2(0.85 / scale);
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} strokeLinejoin="round">
      <path d={roundedRectPath(-4.4, -2.0, 8.8, 6.2, 0.7)} fill="#5a616b" stroke={KINEFX_OUTLINE} strokeWidth={sw} />
      <rect x="-4.4" y="-2.0" width="8.8" height="1.5" fill="#3a3f47" stroke={KINEFX_OUTLINE} strokeWidth={sw} />
      <g transform="rotate(-14 -4.0 -2.0)">
        <rect x="-4.4" y="-3.8" width="8.8" height="1.4" fill="#3a3f47" stroke={KINEFX_OUTLINE} strokeWidth={sw} />
        <polygon points="-2.4,-3.7 -1.2,-3.7 -0.6,-2.5 -1.8,-2.5" fill="#f2f4f7" />
        <polygon points="0.8,-3.7 2.0,-3.7 2.6,-2.5 1.4,-2.5" fill="#f2f4f7" />
      </g>
      <path
        d="M-2.8,1.2 H2.2 M-2.8,2.8 H3.0"
        fill="none"
        stroke="#f2f4f7"
        strokeWidth={r2(0.75 / scale)}
        strokeLinecap="round"
      />
    </g>
  );
};
