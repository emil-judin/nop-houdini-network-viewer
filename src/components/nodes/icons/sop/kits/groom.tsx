import React from 'react';
import { isoBoxFaces, pts } from '../../geoHelpers';
import { CasedStroke, ShadedSphere, SPHERE_TONES } from '../../geoKits';

/**
 * Shared curved white/grey scalp sheet at the bottom of the canvas (`y ~ 13..21`).
 * Used by sheet-based guide and hair icons (`guideinit`, `guideadvect`, `guidedeform`,
 * `guidemask`, `guideskinattriblookup`, `guidetangentspace`, `reguide`, `hairclump`, `hairgen`).
 */
export const CurvedScalpSheet: React.FC<{
  transform?: string;
  fill?: string;
  edgeFill?: string;
  fillOpacity?: number;
  strokeOpacity?: number;
}> = ({ transform, fill = '#eef2f7', edgeFill = '#c0c7d1', fillOpacity = 1, strokeOpacity = 1 }) => (
  <g transform={transform} fillOpacity={fillOpacity} strokeOpacity={strokeOpacity}>
    <path
      d="M2.8,20.8 Q12,17.4 21.2,20.8 L18.6,14.2 Q12,11.8 5.4,14.2 Z"
      fill={fill}
      stroke="#262626"
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
    <path d="M2.8,20.8 Q12,17.4 21.2,20.8 L20.8,19.5 Q12,16.2 3.2,19.5 Z" fill={edgeFill} stroke="none" />
    <path
      d="M2.8,20.8 Q12,17.4 21.2,20.8 L18.6,14.2 Q12,11.8 5.4,14.2 Z"
      fill="none"
      stroke="#262626"
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
  </g>
);

/**
 * Isometric grey slab (`2:1` projection) topped with layered blue hair tufts.
 * Used by `guidefill`, `guideclumpcenter`, `guidefindstrays`, `guidereduce`,
 * `guideutility`, and `guidevolume`. Set `pointed` for conical clumps (`guideclumpcenter`).
 */
export const BlueScalpPatch: React.FC<{
  pointed?: boolean;
  transform?: string;
}> = ({ pointed = false, transform }) => {
  const slab = isoBoxFaces(12, 10.8, 8.2, 2.5);
  return (
    <g transform={transform}>
      {/* Isometric base slab */}
      <polygon points={pts(slab.left)} fill="#eef2f7" stroke="#262626" strokeWidth="1.0" strokeLinejoin="round" />
      <polygon points={pts(slab.right)} fill="#c0c7d1" stroke="#262626" strokeWidth="1.0" strokeLinejoin="round" />
      <polygon points={pts(slab.top)} fill="#3672c4" stroke="#262626" strokeWidth="1.0" strokeLinejoin="round" />

      {pointed ? (
        /* Conical pointed blue clumps */
        <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <path d="M5.4,14.8 L7.4,9.8 L9.4,14.2 Z" fill="#5aa2f2" />
          <path d="M9.0,13.6 L11.4,8.2 L13.6,13.2 Z" fill="#8fc2ff" />
          <path d="M13.2,13.8 L15.6,8.8 L17.8,13.8 Z" fill="#3672c4" />
          <path d="M7.2,16.8 L9.6,11.0 L11.8,16.8 Z" fill="#8fc2ff" />
          <path d="M11.4,17.4 L13.8,11.4 L16.0,17.0 Z" fill="#5aa2f2" />
          <path d="M14.8,16.2 L17.2,11.4 L19.2,15.6 Z" fill="#8fc2ff" />
        </g>
      ) : (
        /* Flowing blue hair wave tufts */
        <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <path d="M4.8,15.2 C5.6,12.2 7.6,10.6 9.6,10.2 C8.4,12.0 7.8,13.8 7.8,15.8 Z" fill="#5aa2f2" />
          <path d="M8.0,14.0 C9.0,10.8 11.2,9.4 13.4,9.0 C12.0,11.0 11.4,12.8 11.4,15.0 Z" fill="#8fc2ff" />
          <path d="M11.6,14.2 C12.8,11.2 14.8,10.0 17.0,9.6 C15.6,11.4 15.0,13.2 14.8,15.2 Z" fill="#3672c4" />
          <path d="M6.8,17.2 C7.8,14.0 9.8,12.4 12.0,11.8 C10.6,13.8 10.0,15.8 9.8,17.8 Z" fill="#8fc2ff" />
          <path d="M10.4,18.2 C11.4,14.8 13.6,13.0 16.0,12.4 C14.6,14.4 13.8,16.4 13.6,18.4 Z" fill="#5aa2f2" />
          <path d="M14.2,16.8 C15.2,14.2 17.0,12.6 19.0,12.2 C17.8,13.8 17.2,15.4 16.8,17.0 Z" fill="#8fc2ff" />
        </g>
      )}
    </g>
  );
};

/**
 * Round shaded grey head with a contoured hair cap and optional left side section and part line.
 * Used by `guidegroup` and `guidepartition`.
 */
export const RoundHeadCap: React.FC<{
  uid: string;
  capColor: string;
  leftColor?: string;
  partColor?: string;
}> = ({ uid, capColor, leftColor, partColor }) => (
  <>
    <ShadedSphere id={`${uid}-head`} cx={12} cy={13.0} r={7.4} tones={SPHERE_TONES.grey} strokeWidth={1.1} />
    {/* Main top/right hair cap */}
    <path
      d="M5.2,12.2 C4.4,7.4 7.6,3.4 12.6,3.4 C17.2,3.4 20.2,6.8 19.6,11.4 C18.0,12.4 16.2,10.0 13.6,10.0 C10.8,10.0 8.6,12.4 5.2,12.2 Z"
      fill={capColor}
      stroke="#262626"
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
    {leftColor && (
      <path
        d="M4.8,12.4 C4.2,9.2 5.4,6.4 7.6,4.8 C7.0,7.2 7.2,9.8 7.8,12.0 C6.6,12.4 5.6,12.6 4.8,12.4 Z"
        fill={leftColor}
        stroke="#262626"
        strokeWidth="1.0"
        strokeLinejoin="round"
      />
    )}
    {partColor && (
      <path
        d="M7.6,4.8 C7.0,7.2 7.2,9.8 7.8,12.0"
        fill="none"
        stroke={partColor}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    )}
  </>
);

/**
 * Diamond-shaped warm brown fur patch with spiky tufts along the upper edges.
 * Used by `fur` and `guidedraw`.
 */
export const FurDiamondPatch: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => (
  <>
    <path
      d="M12,21.2 L3.4,13.0 L4.6,10.4 L4.2,8.4 L6.4,8.6 L7.2,6.2 L9.2,7.0 L10.2,4.2 L12.0,5.6 L13.4,3.4 L14.8,5.6 L16.8,4.6 L17.2,7.2 L19.4,6.8 L18.8,9.4 L20.6,10.6 L19.2,13.0 Z"
      fill="#a8783c"
      stroke="#262626"
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
    {/* Upper-left lit fur highlight */}
    <path
      d="M5.4,12.2 L6.4,8.6 L7.2,6.2 L9.2,7.0 L10.2,4.2 L12.0,5.6 L13.4,3.4 L14.2,7.6 L10.8,11.6 Z"
      fill="#c89a5a"
      stroke="none"
    />
    {/* Lower-right shadow edge */}
    <path d="M12,21.2 L19.2,13.0 L20.6,10.6 L17.6,13.2 L12,19.4 Z" fill="#7e5828" stroke="none" />
    <path
      d="M12,21.2 L3.4,13.0 L4.6,10.4 L4.2,8.4 L6.4,8.6 L7.2,6.2 L9.2,7.0 L10.2,4.2 L12.0,5.6 L13.4,3.4 L14.8,5.6 L16.8,4.6 L17.2,7.2 L19.4,6.8 L18.8,9.4 L20.6,10.6 L19.2,13.0 Z"
      fill="none"
      stroke="#262626"
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
    {children}
  </>
);

/**
 * Cased curved guide hair strand with `#262626` casing so yellow, red, or brown strands
 * read cleanly on any node color.
 */
export const GuideStrand: React.FC<{
  d: string;
  color: string;
  width?: number;
  casing?: number;
}> = ({ d, color, width = 1.25, casing }) => (
  <CasedStroke d={d} color={color} width={width} casing={casing ?? width * 1.85} linecap="round" />
);
