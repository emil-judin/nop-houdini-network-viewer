import React from 'react';
import { type Pt, r2 } from '../../geoHelpers';

/**
 * Group ring kit: the dashed orange group ring and shaded grey member dots from the live Group
 * Create and Group by Range drawings, shared by the Group family and Group Expression.
 */

export const OUTLINE = '#262626';

/** Ring orange of the approved Group Create, Group Delete and Group by Range drawings. */
export const GROUP_RING_COLOR = '#ee7b1c';

export const PAPER = '#f2f4f7';

/** Group marker: a light area inside a dashed orange ring, along any closed path. */
export const GroupRing: React.FC<{ d: string; width?: number; fill?: string; fillOpacity?: number }> = ({
  d,
  width = 1.8,
  fill = PAPER,
  fillOpacity = 1,
}) => (
  <path
    d={d}
    fill={fill}
    fillOpacity={fillOpacity}
    stroke={GROUP_RING_COLOR}
    strokeWidth={width}
    strokeDasharray={`${r2(width * 1.1)} ${r2(width * 0.6)}`}
    strokeLinejoin="round"
  />
);

/** Grey member points of a group: small shaded balls that share one gradient (`<uid>-pt`). */
export const GroupDots: React.FC<{ uid: string; at: readonly Pt[]; r?: number }> = ({ uid, at, r = 1.7 }) => (
  <>
    <defs>
      <radialGradient id={`${uid}-pt`} cx="35%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="55%" stopColor="#b4bcc8" />
        <stop offset="100%" stopColor="#5a616b" />
      </radialGradient>
    </defs>
    {at.map(([cx, cy]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={`url(#${uid}-pt)`} stroke={OUTLINE} strokeWidth="0.7" />
    ))}
  </>
);
