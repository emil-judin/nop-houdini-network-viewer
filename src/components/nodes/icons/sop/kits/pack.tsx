import React from 'react';
import { type Pt, pts, r2 } from '../../geoHelpers';

export const TRAY_BACK_L: Pt = [-7.8, -0.5];

export const TRAY_BACK_R: Pt = [2.2, -4.5];

export const TRAY_FRONT_R: Pt = [8.2, -0.5];

export const TRAY_FRONT_L: Pt = [-1.8, 3.5];

export const BOX_DEPTH = 3.1;

export const shiftY = ([x, y]: Pt, dy: number): Pt => [x, y + dy];

/**
 * Open brown and gold suitcase in 3/4 isometric view, centered at `(x, y)`.
 * Renders the hinged lid and grey interior tray behind `children`, and the outer front walls,
 * gold latches, and handle in front so packed items sit inside the tray.
 */
export const OpenSuitcase: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  children?: React.ReactNode;
}> = ({ x = 12, y = 12.5, scale = 1, children }) => {
  const sw = r2(0.95 / scale);
  const innerSw = r2(0.7 / scale);

  const lidOuter = 'M-7.8,-0.5 L-6.4,-7.0 Q-6.1,-8.1 -4.9,-8.5 L2.7,-10.2 Q3.8,-10.4 3.6,-9.2 L2.2,-4.5 Z';
  const lidInner = 'M-6.7,-1.0 L-5.5,-6.4 Q-5.3,-7.2 -4.4,-7.5 L2.0,-8.9 Q2.8,-9.0 2.7,-8.2 L1.6,-4.6 Z';

  const trayFloor: Pt[] = [
    [-6.6, -0.5],
    [2.0, -3.9],
    [7.0, -0.5],
    [-1.6, 2.9],
  ];

  const wallLeft: Pt[] = [TRAY_BACK_L, TRAY_FRONT_L, shiftY(TRAY_FRONT_L, BOX_DEPTH), shiftY(TRAY_BACK_L, BOX_DEPTH)];
  const wallRight: Pt[] = [
    TRAY_FRONT_L,
    TRAY_FRONT_R,
    shiftY(TRAY_FRONT_R, BOX_DEPTH),
    shiftY(TRAY_FRONT_L, BOX_DEPTH),
  ];

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} strokeLinejoin="round">
      {/* Hinged lid (back) */}
      <path d={lidOuter} fill="#a8783c" stroke="#262626" strokeWidth={sw} />
      <path d={lidInner} fill="#e8c48a" stroke="#262626" strokeWidth={innerSw} />

      {/* Tray rim & grey interior */}
      <polygon
        points={pts([TRAY_BACK_L, TRAY_BACK_R, TRAY_FRONT_R, TRAY_FRONT_L])}
        fill="#c89a5a"
        stroke="#262626"
        strokeWidth={sw}
      />
      <polygon points={pts(trayFloor)} fill="#c0c7d1" stroke="#262626" strokeWidth={innerSw} />

      {/* Packed contents */}
      {children}

      {/* Front walls overlapping the bottom of packed contents */}
      <polygon points={pts(wallLeft)} fill="#a8783c" stroke="#262626" strokeWidth={sw} />
      <polygon points={pts(wallRight)} fill="#7e5828" stroke="#262626" strokeWidth={sw} />

      {/* Gold rim highlight on front-right lip */}
      <line
        x1={TRAY_FRONT_L[0]}
        y1={TRAY_FRONT_L[1]}
        x2={TRAY_FRONT_R[0]}
        y2={TRAY_FRONT_R[1]}
        stroke="#f2c438"
        strokeWidth={r2(0.85 / scale)}
        strokeLinecap="round"
      />

      {/* Two gold latches on the front-right face */}
      <polygon
        points={pts([
          [0.2, 2.5],
          [1.6, 1.9],
          [1.6, 3.3],
          [0.2, 3.9],
        ])}
        fill="#f2c438"
        stroke="#262626"
        strokeWidth={innerSw}
      />
      <polygon
        points={pts([
          [5.0, 0.6],
          [6.4, 0.0],
          [6.4, 1.4],
          [5.0, 2.0],
        ])}
        fill="#f2c438"
        stroke="#262626"
        strokeWidth={innerSw}
      />

      {/* Front handle */}
      <path
        d="M1.6,4.5 L1.6,6.1 Q3.4,6.4 5.2,4.7 L5.2,3.1"
        fill="none"
        stroke="#262626"
        strokeWidth={r2(2.1 / scale)}
        strokeLinecap="round"
      />
      <path
        d="M1.6,4.5 L1.6,6.1 Q3.4,6.4 5.2,4.7 L5.2,3.1"
        fill="none"
        stroke="#f2c438"
        strokeWidth={r2(1.0 / scale)}
        strokeLinecap="round"
      />
    </g>
  );
};
