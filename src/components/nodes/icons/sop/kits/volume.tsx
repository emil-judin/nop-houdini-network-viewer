import React from 'react';
import { isoBoxFaces, type Pt, pts } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';

/**
 * Shared kit for the volume icons (`volume/`).
 * Provides the canonical cumulus volume cloud, billowing fog cloud, fog peaks,
 * small cloud puff, lattice-caged blue cloud, paint-volume bean + brush, and
 * isometric wireframe cube helpers.
 */

/**
 * Canonical 8-lobe cumulus cloud silhouette centered at `(12, 12)` in 24x24 space
 * (outer bounds roughly `x: 3.6..20.4`, `y: 3.6..20.4`).
 */
export const VOLUME_CLOUD_PATH =
  'M8.2,6.2 A3.1,3.1 0 0,1 14.2,5.6 A3.3,3.3 0 0,1 18.8,8.8 A3.1,3.1 0 0,1 19.6,14.2 A3.2,3.2 0 0,1 15.8,19.0 A3.3,3.3 0 0,1 9.6,19.4 A3.2,3.2 0 0,1 4.6,15.6 A3.1,3.1 0 0,1 4.8,9.8 A3.0,3.0 0 0,1 8.2,6.2 Z';

/**
 * Cumulus volume cloud with upper-left lit fill, optional lower-right shadow crescent
 * and inner puff crease arcs, outlined in `#262626`.
 */
export const VolumeCloud: React.FC<{
  cx?: number;
  cy?: number;
  scale?: number;
  fill?: string;
  creaseColor?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  fillOpacity?: number;
  creases?: boolean;
  children?: React.ReactNode;
}> = ({
  cx = 12,
  cy = 12,
  scale = 1,
  fill = '#f2f4f7',
  creaseColor = '#89929e',
  strokeWidth = 1.15,
  strokeDasharray,
  fillOpacity,
  creases = true,
  children,
}) => {
  const transform =
    cx === 12 && cy === 12 && scale === 1 ? undefined : `translate(${cx} ${cy}) scale(${scale}) translate(-12 -12)`;

  return (
    <g transform={transform}>
      <path
        d={VOLUME_CLOUD_PATH}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke="#262626"
        strokeWidth={strokeWidth / scale}
        strokeLinejoin="round"
        strokeDasharray={strokeDasharray}
      />
      {creases && (
        <g fill="none" stroke={creaseColor} strokeWidth={0.85 / scale} strokeLinecap="round">
          <path d="M8.6,9.2 A2.4,2.4 0 0,1 12.2,8.4" />
          <path d="M14.4,10.6 A2.3,2.3 0 0,1 16.5,13.6" />
          <path d="M8.8,15.6 A2.7,2.7 0 0,0 13.8,16.2" />
        </g>
      )}
      {children}
    </g>
  );
};

/**
 * Billowing fog cloud with a flat/curved base, shared by `volumecombine`, `volumenormalize`,
 * `volumenoisefog` and `volumeadjustfog`.
 */
export const FogCloud: React.FC<{
  uid: string;
  cx?: number;
  cy?: number;
  scale?: number;
  leftColor?: string;
  rightColor?: string;
  strokeWidth?: number;
  fillOpacity?: number;
}> = ({
  uid,
  cx = 12,
  cy = 13.4,
  scale = 1,
  leftColor = '#8fc2ff',
  rightColor = '#eef2f7',
  strokeWidth = 1.15,
  fillOpacity = 1,
}) => {
  const transform =
    cx === 12 && cy === 13.4 && scale === 1 ? undefined : `translate(${cx} ${cy}) scale(${scale}) translate(-12 -13.4)`;
  const gradId = `${uid}-fog`;

  return (
    <g transform={transform}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="15%" x2="100%" y2="85%">
          <stop offset="0%" stopColor={leftColor} />
          <stop offset="55%" stopColor="#eef2f7" />
          <stop offset="100%" stopColor={rightColor} />
        </linearGradient>
      </defs>
      <path
        d="M4.2,16.4 A3.0,2.8 0 0,1 5.0,11.2 A3.6,3.4 0 0,1 11.4,8.6 A3.8,3.6 0 0,1 18.2,10.6 A3.0,2.8 0 0,1 19.6,16.2 C17.8,17.8 6.2,17.8 4.2,16.4 Z"
        fill={`url(#${gradId})`}
        fillOpacity={fillOpacity}
        stroke="#262626"
        strokeWidth={strokeWidth / scale}
        strokeLinejoin="round"
      />
      <path
        d="M8.0,13.6 A2.2,2.0 0 0,1 11.6,12.4 M14.0,13.2 A2.0,1.8 0 0,1 16.4,14.6"
        fill="none"
        stroke="#5a616b"
        strokeWidth={0.85 / scale}
        strokeLinecap="round"
      />
    </g>
  );
};

/**
 * Blue geometric cube and cone peaks sitting behind `FogCloud` in `volumenoisefog`
 * and `volumeadjustfog`.
 */
export const FogPeaks: React.FC<{ yOffset?: number }> = ({ yOffset = 0 }) => {
  const { top, left, right } = isoBoxFaces(8.6, 7.6 + yOffset, 2.7, 2.7);
  return (
    <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
      <polygon points={pts(left)} fill="#5aa2f2" />
      <polygon points={pts(right)} fill="#3672c4" />
      <polygon points={pts(top)} fill="#8fc2ff" />
      <polygon points="15.0,3.2 18.4,10.8 11.8,10.8" fill="#5aa2f2" />
      <polygon points="15.0,3.2 18.4,10.8 15.2,11.4" fill="#3672c4" />
    </g>
  );
};

/**
 * Builds the 6-lobe cloud puff SVG path centered at `(cx, cy)` with radius `r`.
 */
export function cloudPuffPath(cx: number, cy: number, r = 3.0): string {
  const lobes = 6;
  const parts: string[] = [];
  for (let i = 0; i < lobes; i += 1) {
    const a1 = (i / lobes) * Math.PI * 2;
    const a2 = ((i + 1) / lobes) * Math.PI * 2;
    const x1 = cx + Math.cos(a1) * r;
    const y1 = cy + Math.sin(a1) * r;
    const x2 = cx + Math.cos(a2) * r;
    const y2 = cy + Math.sin(a2) * r;
    const arcR = r * 0.56;
    parts.push(
      i === 0
        ? `M${x1.toFixed(2)},${y1.toFixed(2)} A${arcR.toFixed(2)},${arcR.toFixed(2)} 0 0,1 ${x2.toFixed(2)},${y2.toFixed(2)}`
        : `A${arcR.toFixed(2)},${arcR.toFixed(2)} 0 0,1 ${x2.toFixed(2)},${y2.toFixed(2)}`,
    );
  }
  return `${parts.join(' ')} Z`;
}

/**
 * Small 6-lobe cloud puff centered at `(cx, cy)` with radius `r`, used by particle,
 * point, stamp and VOP volume icons.
 */
export const CloudPuff: React.FC<{
  cx: number;
  cy: number;
  r?: number;
  fill?: string;
  dotR?: number;
  dotFill?: string;
  strokeWidth?: number;
}> = ({ cx, cy, r = 3.0, fill = '#f2f4f7', dotR = 0, dotFill = '#3672c4', strokeWidth = 0.9 }) => {
  const d = cloudPuffPath(cx, cy, r);
  return (
    <g>
      <path d={d} fill={fill} stroke="#262626" strokeWidth={strokeWidth} strokeLinejoin="round" />
      {dotR > 0 && <circle cx={cx} cy={cy} r={dotR} fill={dotFill} stroke="#262626" strokeWidth={0.65} />}
    </g>
  );
};

/**
 * Swept cloud cut in half with a wireframe lattice inside the cut face,
 * shared by `volumerasterizelattice`, `volumedeform` and `latticefromvolume`.
 */
export const LatticeCloud: React.FC<{
  uid: string;
  variant?: 'rasterize' | 'deform' | 'from';
}> = ({ uid, variant = 'deform' }) => {
  const gradId = `${uid}-lat-cloud`;
  const isGreenCloud = variant === 'rasterize';
  const cutD = 'M6.2,16.4 L8.4,11.8 L12.6,7.4 L16.2,10.2 L19.8,11.6 L18.4,15.6 C14.6,17.0 9.6,17.6 6.2,16.4 Z';
  const wireframeD =
    variant === 'from'
      ? 'M8.4,11.8 L11.4,16.6 M12.6,7.4 L13.8,16.4 M16.2,10.2 L16.8,15.8 M7.4,14.2 L18.8,13.6 M10.4,9.8 L16.2,10.2 M8.4,11.8 L13.8,16.4 M12.6,7.4 L16.8,15.8 M16.2,10.2 L11.4,16.6 M9.6,10.6 L18.4,14.6'
      : variant === 'rasterize'
        ? 'M8.4,11.8 L12.2,16.6 M12.6,7.4 L14.6,16.2 M16.2,10.2 L17.6,15.4 M7.4,14.2 L18.8,13.6 M10.2,10.0 L16.2,10.2'
        : 'M8.4,11.8 L12.0,16.6 M12.6,7.4 L14.2,16.4 M16.2,10.2 L17.2,15.6 M7.6,14.0 L18.6,13.6 M10.4,9.8 L16.0,10.4';

  const wireColor = isGreenCloud ? '#8fc2ff' : '#52d638';

  return (
    <g transform="translate(12 12) scale(0.92) translate(-12 -12)">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor={isGreenCloud ? '#52d638' : '#8fc2ff'} />
          <stop offset="100%" stopColor={isGreenCloud ? '#58c848' : '#3672c4'} />
        </linearGradient>
      </defs>
      {/* Back/top smooth cloud ridge */}
      <path
        d="M3.2,15.4 A2.6,2.4 0 0,1 5.0,11.4 A3.0,2.8 0 0,1 9.6,9.0 A3.0,3.0 0 0,1 13.8,5.4 A2.8,2.6 0 0,1 18.6,8.4 A2.6,2.4 0 0,1 20.6,13.2 C17.2,16.6 6.8,17.8 3.2,15.4 Z"
        fill={`url(#${gradId})`}
        stroke="#262626"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {/* Cutaway front interior */}
      <path d={cutD} fill="#2e5a9a" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
      {/* Wireframe inside the cut part */}
      <path d={cutD} fill="none" stroke="#262626" strokeWidth="1.9" strokeLinejoin="round" />
      <path
        d={wireframeD}
        fill="none"
        stroke="#262626"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d={cutD} fill="none" stroke={wireColor} strokeWidth="1.1" strokeLinejoin="round" />
      <path
        d={wireframeD}
        fill="none"
        stroke={wireColor}
        strokeWidth="0.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};

/**
 * Bean-shaped volume with a dashed outer edge and an angled paintbrush on the right,
 * shared by `paintcolorvolume`, `paintfogvolume` and `paintsdfvolume`.
 */
export const PaintVolumeBean: React.FC<{
  uid: string;
  highlight: string;
  body: string;
  shadow: string;
  tipColor?: string;
}> = ({ uid, highlight, body, shadow, tipColor = '#3a3f47' }) => {
  const gradId = `${uid}-bean`;
  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="55%" stopColor={body} />
          <stop offset="100%" stopColor={shadow} />
        </linearGradient>
      </defs>
      <path
        d="M8.6,3.4 C11.4,3.2 12.6,5.6 10.8,8.4 C9.2,10.8 9.4,13.6 11.4,15.6 C13.2,17.4 11.8,20.4 8.6,20.2 C4.6,19.8 3.2,14.8 3.8,10.4 C4.4,6.4 6.2,3.6 8.6,3.4 Z"
        fill={`url(#${gradId})`}
        stroke="#262626"
        strokeWidth="1.05"
        strokeDasharray="2.0 1.3"
        strokeLinejoin="round"
      />
      {/* Angled paintbrush on the right */}
      <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
        <polygon points="19.6,4.2 21.0,5.6 14.8,14.2 13.2,13.0" fill="#c25e12" />
        <polygon points="13.2,13.0 14.8,14.2 13.6,15.8 12.0,14.6" fill="#c0c7d1" />
        <path
          d="M12.0,14.6 L13.6,15.8 C12.4,17.6 10.4,18.2 9.4,18.0 C10.4,16.8 11.0,15.8 12.0,14.6 Z"
          fill={tipColor}
        />
      </g>
    </>
  );
};

/**
 * 2:1 isometric wireframe cube helper built on `isoBoxFaces`, with back lines and
 * cased front edges.
 */
export const IsoWireCube: React.FC<{
  cx?: number;
  cy?: number;
  rx?: number;
  h?: number;
  color?: string;
  width?: number;
  fillFaces?: boolean;
  edgeOpacity?: number;
}> = ({ cx = 12, cy = 12, rx = 7.4, h = 8.4, color = '#eef2f7', width = 1.0, fillFaces = false, edgeOpacity = 1 }) => {
  const { top, left, right } = isoBoxFaces(cx, cy, rx, h);
  const t0: Pt = top[0];
  const t1: Pt = top[1];
  const t2: Pt = top[2];
  const t3: Pt = top[3];
  const bLeft: Pt = left[3];
  const bCenter: Pt = left[2];
  const bRight: Pt = right[2];

  const outerD = `M${pts([t0, t1, bRight, bCenter, bLeft, t3])} Z`;
  const innerD = `M${pts([t3, t2, t1])} M${pts([t2, bCenter])}`;

  return (
    <>
      {fillFaces && (
        <g stroke="none">
          <polygon points={pts(top)} fill="#eef2f7" fillOpacity="0.82" />
          <polygon points={pts(left)} fill="#c0c7d1" fillOpacity="0.82" />
          <polygon points={pts(right)} fill="#89929e" fillOpacity="0.82" />
        </g>
      )}
      <CasedStroke d={outerD} color={color} width={width} casing={width * 2.05} />
      <g opacity={edgeOpacity < 1 ? edgeOpacity : undefined}>
        <CasedStroke d={innerD} color={color} width={width} casing={width * 2.05} />
      </g>
    </>
  );
};
