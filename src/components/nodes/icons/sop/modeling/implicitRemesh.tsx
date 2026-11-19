import React from 'react';
import { ellipsePath, ellipsePt, isoBoxFaces, lerpPt, type Pt, pts, quadPt, r2, tiltedTorus } from '../../geoHelpers';
import { CasedStroke, ShadedSphere, SPHERE_TONES } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

const OUTLINE = '#262626';

const QR_RX = 6.5;

const QR_RY = 8.3;

const QR_HOLE = 0.42;

const QR_A0 = 152;

const QR_A1 = 305;

/* ---------- Remesh to Grid: hollow cube ---------- */

const RG_W = 9.3;

/** Point list as an open or closed polyline path. */
const polyPath = (list: readonly Pt[], close = false): string =>
  `M${pts(list).replace(/ /g, ' L')}${close ? ' Z' : ''}`;

/** Samples `fn` from `a0` to `a1` degrees in steps of about `step` degrees (both ends included). */
const ringArc = (fn: (deg: number) => Pt, a0: number, a1: number, step = 10): Pt[] => {
  const n = Math.max(1, Math.round(Math.abs(a1 - a0) / step));
  const out: Pt[] = [];
  for (let i = 0; i <= n; i += 1) out.push(fn(a0 + ((a1 - a0) * i) / n));
  return out;
};

/**
 * The approved implicit cut sphere of `sop.implicitsurface` (violet core, blue-grey shell crescent
 * on the left, white zero contour) without its red arrow, centered on `(cx, cy)` with radius `r`.
 */
const ImplicitSphere: React.FC<{ uid: string; cx: number; cy: number; r: number }> = ({ uid, cx, cy, r }) => {
  const s = r / 8.2;
  return (
    <>
      <ImplicitCoreDefs id={`${uid}-is-in`} />
      <defs>
        <radialGradient id={`${uid}-is-out`} cx="32%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#5a82b8" />
          <stop offset="100%" stopColor="#263248" />
        </radialGradient>
      </defs>
      <g transform={`translate(${cx} ${cy}) scale(${r2(s)}) translate(-12 -12)`}>
        <circle cx="12" cy="12" r="8.2" fill={`url(#${uid}-is-in)`} stroke={OUTLINE} strokeWidth={r2(1.15 / s)} />
        <path
          d="M12,3.8 A8.2,8.2 0 0,0 12,20.2 C9.2,17.5 9.2,6.5 12,3.8 Z"
          fill={`url(#${uid}-is-out)`}
          stroke={OUTLINE}
          strokeWidth={r2(1.1 / s)}
          strokeLinejoin="round"
        />
        <path
          d="M12,4.2 C9.5,6.8 9.5,17.2 12,19.8"
          fill="none"
          stroke="#eef2f7"
          strokeWidth={r2(1 / s)}
          strokeLinecap="round"
        />
      </g>
    </>
  );
};

/* ---------- Implicit Surface Evaluate: calculator ---------- */

const CALC_FACE: readonly [Pt, Pt, Pt, Pt] = [
  [2.7, 8.7],
  [10.3, 12.5],
  [10.3, 21.4],
  [2.7, 17.6],
];

const CALC_DEPTH: Pt = [1.7, -0.85];

const calcBack = (p: Pt): Pt => [p[0] + CALC_DEPTH[0], p[1] + CALC_DEPTH[1]];

const CALC_KEYS: readonly Pt[] = [
  [0.28, 0.29],
  [0.72, 0.29],
  [0.28, 0.71],
  [0.72, 0.71],
];

const calcKeyQuad = ([u, v]: Pt): Pt[] => [
  quadPt(CALC_FACE, u - 0.17, v - 0.16),
  quadPt(CALC_FACE, u + 0.17, v - 0.16),
  quadPt(CALC_FACE, u + 0.17, v + 0.16),
  quadPt(CALC_FACE, u - 0.17, v + 0.16),
];

/** Key glyph strokes in face space: `a` runs along the key row (2:1 slope), `b` straight down. */
const calcGlyph = (key: Pt, segs: readonly (readonly [number, number, number, number])[]): string => {
  const c = quadPt(CALC_FACE, key[0], key[1]);
  const at = (a: number, b: number): Pt => [c[0] + a, c[1] + a * 0.5 + b];
  return segs.map(([a0, b0, a1, b1]) => `M${pts([at(a0, b0)])} L${pts([at(a1, b1)])}`).join(' ');
};

const CALC_GLYPHS = [
  calcGlyph(CALC_KEYS[0], [
    [-0.75, 0, 0.75, 0],
    [0, -0.8, 0, 0.8],
  ]),
  calcGlyph(CALC_KEYS[1], [[-0.75, 0, 0.75, 0]]),
  calcGlyph(CALC_KEYS[2], [
    [-0.6, -0.65, 0.6, 0.65],
    [-0.6, 0.65, 0.6, -0.65],
  ]),
  calcGlyph(CALC_KEYS[3], [
    [-0.75, -0.45, 0.75, -0.45],
    [-0.75, 0.45, 0.75, 0.45],
  ]),
].join(' ');

/* ---------- Implicit Surface Velocity: trail ---------- */

const VEL = { cx: 15.3, cy: 9.3, r: 6.4, len: 10.2 };

const VEL_DIR: Pt = [-0.894, 0.447];

const VEL_NRM: Pt = [0.447, 0.894];

const velPt = (along: number, across: number): Pt => [
  VEL.cx + VEL_DIR[0] * along + VEL_NRM[0] * across,
  VEL.cy + VEL_DIR[1] * along + VEL_NRM[1] * across,
];

const VEL_BAND: Pt[] = [
  velPt(0, -VEL.r * 0.97),
  velPt(VEL.len, -VEL.r * 0.8),
  velPt(VEL.len, VEL.r * 0.8),
  velPt(0, VEL.r * 0.97),
];

const VEL_TAIL = velPt(VEL.len, 0);

/* ---------- Remesh: torus ---------- */

const RM = tiltedTorus(12, 12.3, 9.5, 6.6, 0.36, 0.22);

const RM_COARSE = [90, 150, 210, 270];

const RM_FINE = [-90, -45, 0, 45, 90];

const RM_BODY = `${polyPath(
  ringArc((d) => RM.ring(1, d), -90, 270, 6),
  true,
)} ${ellipsePath(12, 12.3 - 6.6 * 0.22, 9.5 * 0.36, 6.6 * 0.36 * 0.66)}`;

const RM_MID = polyPath(
  [...ringArc((d) => RM.ring(0.5, d), 5, 175, 8), ...ringArc((d) => RM.ring(1.05, d), 175, 5, 8)],
  true,
);

const RM_SHADOW = polyPath(
  [...ringArc((d) => RM.ring(0.8, d), 30, 150, 8), ...ringArc((d) => RM.ring(1.05, d), 150, 30, 8)],
  true,
);

const RM_COARSE_LINES = [
  ...RM_COARSE.map((d) => polyPath([RM.ring(0, d), RM.ring(1, d)])),
  polyPath(RM_COARSE.map((d) => RM.ring(0.5, d))),
].join(' ');

const RM_FINE_LINES = [
  ...RM_FINE.slice(1, -1).map((d) => polyPath([RM.ring(0, d), RM.ring(1, d)])),
  polyPath(ringArc((d) => RM.ring(0.5, d), -90, 90, 6)),
  ...RM_FINE.slice(0, -1).flatMap((d, i) => {
    const next = RM_FINE[i + 1];
    const flip = i % 2 === 0;
    return [
      polyPath([RM.ring(0, flip ? d : next), RM.ring(0.5, flip ? next : d)]),
      polyPath([RM.ring(0.5, flip ? next : d), RM.ring(1, flip ? d : next)]),
    ];
  }),
].join(' ');

/* ---------- Quad Remesh: tire ---------- */

const QR_F: Pt = [14.5, 12.6];

const QR_B: Pt = [9.9, 11.3];

const qrF = (deg: number, k = 1): Pt => ellipsePt(QR_F[0], QR_F[1], QR_RX * k, QR_RY * k, deg);

const qrB = (deg: number): Pt => ellipsePt(QR_B[0], QR_B[1], QR_RX, QR_RY, deg);

/** Ellipse angle where the tangent joining the front and back faces touches (top side). */
const QR_T0 = (Math.atan(-(QR_RY * (QR_B[0] - QR_F[0])) / (QR_RX * (QR_B[1] - QR_F[1]))) * 180) / Math.PI;

const QR_T1 = QR_T0 + 180;

const QR_TOP = QR_T0 + 360;

const QR_HULL = polyPath([...ringArc(qrF, QR_T0, QR_T1, 6), ...ringArc(qrB, QR_T1, QR_TOP, 6)], true);

const QR_PATCH = polyPath(
  [
    ...ringArc(qrB, QR_A0, QR_TOP, 6),
    ...ringArc(qrF, QR_TOP, QR_A1, 6),
    ...ringArc((d) => qrF(d, QR_HOLE), QR_A1, QR_A0, 6),
    qrF(QR_A0),
  ],
  true,
);

const QR_CROSS = [177, 202, 227, 252, 277].map((d) => polyPath([qrB(d), qrF(d), qrF(d, QR_HOLE)]));

const QR_GRID = [
  ...QR_CROSS,
  polyPath(ringArc((d) => lerpPt(qrB(d), qrF(d), 0.5), QR_A0, QR_TOP, 6)),
  polyPath(ringArc(qrF, QR_A0, QR_TOP, 6)),
  polyPath(ringArc((d) => qrF(d, 0.71), QR_A0, QR_A1, 6)),
].join(' ');

const rgHex = (k: number): Pt[] => [
  [12, 12 - RG_W * k],
  [12 + RG_W * k, 12 - (RG_W * k) / 2],
  [12 + RG_W * k, 12 + (RG_W * k) / 2],
  [12, 12 + RG_W * k],
  [12 - RG_W * k, 12 + (RG_W * k) / 2],
  [12 - RG_W * k, 12 - (RG_W * k) / 2],
];

const RG_OUT = rgHex(1);

const RG_IN = rgHex(0.64);

const RG_C: Pt = [12, 12];

/** Ring segment tones clockwise from the top right segment (light from the upper left). */
const RG_RING_TONES = ['#eef2f7', '#c0c7d1', '#89929e', '#c0c7d1', '#eef2f7', '#ffffff'];

const RG_CUBE = isoBoxFaces(12, 12 - 3.9, 3.9, 3.9);

/* ---------- Remesh to Camera ---------- */

const RC = { cx: 17.8, cy: 13.2, r: 4.0 };

const RC_LONGS = [-0.82, -0.5, -0.12, 0.45]
  .map(
    (k) =>
      `M${RC.cx},${r2(RC.cy - RC.r)} A${r2(Math.abs(k) * RC.r)},${RC.r} 0 0,${k < 0 ? 0 : 1} ${RC.cx},${r2(RC.cy + RC.r)}`,
  )
  .join(' ');

const RC_LATS = [-0.55, 0, 0.55]
  .map((k) => `M${r2(RC.cx - RC.r)},${r2(RC.cy + k * RC.r)} H${r2(RC.cx + RC.r)}`)
  .join(' ');

/* ---------- Smooth ---------- */

const SM_A: Pt[] = [
  [2.6, 8.8],
  [5.2, 5.6],
  [7.6, 8.6],
  [10.2, 5.2],
  [12, 7.4],
  [15.6, 4.8],
  [19, 8.4],
  [21.4, 14.6],
];

const SM_B: Pt[] = [
  [2.9, 12.8],
  [6.6, 11.8],
  [10.4, 12.6],
  [14.4, 11.2],
  [17.8, 12.8],
];

const SM_C: Pt[] = [
  [6, 16.4],
  [9.8, 20.2],
  [13.6, 16.6],
  [17.4, 18.6],
];

const SM_SMOOTH = `C13.2,5.2 14.4,4.7 ${pts([SM_A[5]])} C17.2,5 18.2,6.6 ${pts([SM_A[6]])} C19.9,10.4 20.6,12.6 ${pts([SM_A[7]])}`;

const SM_EDGE = `${polyPath(SM_A.slice(0, 5))} ${SM_SMOOTH}`;

const SM_SHEET = `${SM_EDGE} L${pts([SM_C[3], SM_C[2], SM_C[1], SM_C[0], SM_B[0]])} Z`;

const smSeg = (a: Pt, b: Pt): string => polyPath([a, b]);

const SM_LINES = [
  // Rough left part: triangles.
  smSeg(SM_A[1], SM_B[0]),
  smSeg(SM_A[1], SM_B[1]),
  smSeg(SM_A[2], SM_B[1]),
  smSeg(SM_A[3], SM_B[1]),
  smSeg(SM_A[3], SM_B[2]),
  smSeg(SM_A[4], SM_B[2]),
  smSeg(SM_B[1], SM_C[0]),
  smSeg(SM_B[1], SM_C[1]),
  smSeg(SM_B[2], SM_C[1]),
  smSeg(SM_B[2], SM_C[2]),
  polyPath([SM_B[0], SM_B[1], SM_B[2]]),
  // Smooth right part: quads.
  `M${pts([SM_B[2]])} Q12.4,11.4 ${pts([SM_B[3]])} Q16.2,11.4 ${pts([SM_B[4]])}`,
  smSeg(SM_A[5], SM_B[3]),
  smSeg(SM_A[6], SM_B[4]),
  smSeg(SM_B[3], SM_C[2]),
  smSeg(SM_B[4], SM_C[3]),
].join(' ');

/**
 * Shared dark-core to glowing-violet radial gradient for the Implicit Surface icon family.
 */
const ImplicitCoreDefs: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    <radialGradient id={id} cx="38%" cy="48%" r="62%">
      <stop offset="0%" stopColor="#14141c" />
      <stop offset="52%" stopColor="#281c3c" />
      <stop offset="84%" stopColor="#7a4ec8" />
      <stop offset="100%" stopColor="#c8a2ff" />
    </radialGradient>
  </defs>
);

/**
 * Implicit surface and remesh operators.
 */
export const IMPLICIT_REMESH_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.implicitsurface_eval',
    label: 'Implicit Surface Evaluate',
    family: 'sop',
    description:
      'Implicit cut sphere (blue-grey shell, violet core) in the upper right with an orange isometric calculator slab with four white-glyph keys in front at the lower left.',
    types: ['implicitsurface_eval'],
    icons: ['sop_implicitsurface_eval'],
    refKey: 'SOP_implicitsurface_eval',
    render: (uid) => (
      <>
        <ImplicitSphere uid={uid} cx={14.9} cy={9.2} r={6.6} />
        {/* Calculator: top, right side, key face */}
        <polygon
          points={pts([CALC_FACE[0], calcBack(CALC_FACE[0]), calcBack(CALC_FACE[1]), CALC_FACE[1]])}
          fill="#ffb066"
          stroke={OUTLINE}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <polygon
          points={pts([CALC_FACE[1], calcBack(CALC_FACE[1]), calcBack(CALC_FACE[2]), CALC_FACE[2]])}
          fill="#c25e12"
          stroke={OUTLINE}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <polygon points={pts(CALC_FACE)} fill="#ee8624" stroke={OUTLINE} strokeWidth="1.1" strokeLinejoin="round" />
        {CALC_KEYS.map((key, i) => (
          <polygon key={i} points={pts(calcKeyQuad(key))} fill="#c25e12" />
        ))}
        <path d={CALC_GLYPHS} fill="none" stroke="#ffffff" strokeWidth="0.75" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.implicitsurface_velocity',
    label: 'Implicit Surface Velocity',
    family: 'sop',
    description:
      'Implicit cut sphere (blue-grey shell, violet core) in the upper right trailing a blue motion streak that fades out toward the lower left.',
    types: ['implicitsurface_velocity'],
    icons: ['sop_implicitsurface_velocity'],
    refKey: 'SOP_implicitsurface_velocity',
    render: (uid) => (
      <>
        <defs>
          <linearGradient
            id={`${uid}-trail`}
            gradientUnits="userSpaceOnUse"
            x1={VEL.cx}
            y1={VEL.cy}
            x2={r2(VEL_TAIL[0])}
            y2={r2(VEL_TAIL[1])}
          >
            <stop offset="0%" stopColor="#5aa2f2" />
            <stop offset="40%" stopColor="#3672c4" />
            <stop offset="75%" stopColor="#5aa2f2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8fc2ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id={`${uid}-edge`}
            gradientUnits="userSpaceOnUse"
            x1={VEL.cx}
            y1={VEL.cy}
            x2={r2(VEL_TAIL[0])}
            y2={r2(VEL_TAIL[1])}
          >
            <stop offset="0%" stopColor={OUTLINE} />
            <stop offset="55%" stopColor={OUTLINE} />
            <stop offset="95%" stopColor={OUTLINE} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={pts(VEL_BAND)} fill={`url(#${uid}-trail)`} />
        <path
          d={`${polyPath([VEL_BAND[0], VEL_BAND[1]])} ${polyPath([VEL_BAND[3], VEL_BAND[2]])}`}
          fill="none"
          stroke={`url(#${uid}-edge)`}
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <ImplicitSphere uid={uid} cx={VEL.cx} cy={VEL.cy} r={VEL.r} />
      </>
    ),
  },
  {
    id: 'sop.remesh',
    label: 'Remesh',
    family: 'sop',
    description:
      'Tilted orange torus with a smooth curved outer rim, large coarse quads on the left half and a finer four-sector dark triangle mesh on the right half.',
    types: ['remesh'],
    icons: ['sop_remesh', 'sop_remesh-2.0'],
    refKey: 'SOP_remesh',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-body`}>
            <path d={RM_BODY} clipRule="evenodd" />
          </clipPath>
        </defs>
        <path d={RM.innerWall} fill="#c25e12" stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />
        <path d={RM_BODY} fill="#ffb066" fillRule="evenodd" />
        <g clipPath={`url(#${uid}-body)`}>
          <path d={RM_MID} fill="#ee8624" />
          <path d={RM_SHADOW} fill="#c25e12" />
          <path d={RM_COARSE_LINES} fill="none" stroke={OUTLINE} strokeWidth="0.75" strokeLinejoin="round" />
          <path d={RM_FINE_LINES} fill="none" stroke={OUTLINE} strokeWidth="0.6" strokeLinejoin="round" />
        </g>
        <path d={RM_BODY} fill="none" stroke={OUTLINE} strokeWidth="1.15" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.quadremesh',
    label: 'Quad Remesh',
    family: 'sop',
    description:
      'Upright dark grey tire seen from the front left with a light blue quad grid patch covering its upper left tread and face.',
    types: ['quadremesh'],
    icons: ['sop_quadremesh'],
    refKey: 'SOP_quadremesh',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-hole`}>
            <path d={ellipsePath(QR_F[0], QR_F[1], QR_RX * QR_HOLE, QR_RY * QR_HOLE)} />
          </clipPath>
        </defs>
        {/* Tread hull and front face */}
        <path d={QR_HULL} fill="#89929e" stroke={OUTLINE} strokeWidth="1.15" strokeLinejoin="round" />
        <path d={ellipsePath(QR_F[0], QR_F[1], QR_RX, QR_RY)} fill="#5a616b" stroke={OUTLINE} strokeWidth="0.8" />
        {/* Blue quad patch */}
        <path d={QR_PATCH} fill="#8fc2ff" stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />
        <path d={QR_GRID} fill="none" stroke="#2e5a9a" strokeWidth="0.6" strokeLinejoin="round" />
        {/* Hole: inner wall and far opening */}
        <path d={ellipsePath(QR_F[0], QR_F[1], QR_RX * QR_HOLE, QR_RY * QR_HOLE)} fill="#3a3f47" />
        <g clipPath={`url(#${uid}-hole)`}>
          <path d={ellipsePath(QR_F[0] - 1.5, QR_F[1] - 0.45, QR_RX * QR_HOLE, QR_RY * QR_HOLE)} fill={OUTLINE} />
        </g>
        <path
          d={ellipsePath(QR_F[0], QR_F[1], QR_RX * QR_HOLE, QR_RY * QR_HOLE)}
          fill="none"
          stroke={OUTLINE}
          strokeWidth="0.9"
        />
        <path d={QR_HULL} fill="none" stroke={OUTLINE} strokeWidth="1.15" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.remeshgrid',
    label: 'Remesh to Grid',
    family: 'sop',
    description:
      'White hexagonal frame of a hollowed isometric cube, shaded light at the top left and grey at the bottom right, with a small white cube floating in its grey cavity.',
    types: ['remeshgrid'],
    icons: ['sop_remeshgrid'],
    refKey: 'SOP_remeshgrid',
    render: () => (
      <>
        {/* Cavity walls: left back, right back, floor */}
        <polygon points={pts([RG_IN[5], RG_IN[0], RG_C, RG_IN[4]])} fill="#5a616b" />
        <polygon points={pts([RG_IN[0], RG_IN[1], RG_IN[2], RG_C])} fill="#89929e" />
        <polygon points={pts([RG_IN[4], RG_C, RG_IN[2], RG_IN[3]])} fill="#c0c7d1" />
        <path
          d={`${polyPath([RG_C, RG_IN[0]])} ${polyPath([RG_C, RG_IN[2]])} ${polyPath([RG_C, RG_IN[4]])}`}
          fill="none"
          stroke={OUTLINE}
          strokeWidth="0.6"
        />
        {/* Frame ring */}
        {RG_RING_TONES.map((tone, i) => (
          <polygon
            key={i}
            points={pts([RG_OUT[i], RG_OUT[(i + 1) % 6], RG_IN[(i + 1) % 6], RG_IN[i]])}
            fill={tone}
            stroke={OUTLINE}
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
        ))}
        <polygon points={pts(RG_IN)} fill="none" stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round" />
        <polygon points={pts(RG_OUT)} fill="none" stroke={OUTLINE} strokeWidth="1.15" strokeLinejoin="round" />
        {/* Small cube */}
        <polygon points={pts(RG_CUBE.top)} fill="#ffffff" stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round" />
        <polygon points={pts(RG_CUBE.left)} fill="#c0c7d1" stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round" />
        <polygon points={pts(RG_CUBE.right)} fill="#89929e" stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.remeshtocamera',
    label: 'Remesh to Camera',
    family: 'sop',
    description:
      'Grey film camera with two reels on the left aimed across a clear gap at a smaller shaded orange sphere on the far right whose dark orange grid lines are denser on the camera-facing side.',
    types: ['remeshtocamera'],
    icons: ['sop_remeshtocamera'],
    refKey: 'SOP_remeshtocamera',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-ball-clip`}>
            <circle cx={RC.cx} cy={RC.cy} r={RC.r} />
          </clipPath>
        </defs>
        <ShadedSphere id={`${uid}-ball`} cx={RC.cx} cy={RC.cy} r={RC.r} tones={SPHERE_TONES.orange} strokeWidth={1.1} />
        <g clipPath={`url(#${uid}-ball-clip)`} fill="none" stroke="#8a3e08" strokeWidth="0.7">
          <path d={RC_LONGS} />
          <path d={RC_LATS} />
        </g>
        <circle cx={RC.cx} cy={RC.cy} r={RC.r} fill="none" stroke={OUTLINE} strokeWidth="1.1" />
        {/* Camera: stand, lens hood, body, reels */}
        <g transform="translate(-0.7 0)">
          <polygon
            points="5.4,15.6 7.8,15.6 7.2,18.8 6,18.8"
            fill="#89929e"
            stroke={OUTLINE}
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <polygon
            points="9.8,11.8 12.3,10.6 12.3,15.8 9.8,14.6"
            fill="#89929e"
            stroke={OUTLINE}
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <circle cx="4.8" cy="8.5" r="2.3" fill="#89929e" stroke={OUTLINE} strokeWidth="1" />
          <circle cx="4.8" cy="8.5" r="0.9" fill="#eef2f7" stroke={OUTLINE} strokeWidth="0.6" />
          <circle cx="8.7" cy="7.6" r="2.7" fill="#89929e" stroke={OUTLINE} strokeWidth="1" />
          <circle cx="8.7" cy="7.6" r="1" fill="#eef2f7" stroke={OUTLINE} strokeWidth="0.6" />
          <rect x="2.8" y="10.2" width="7.4" height="5.8" rx="1" fill="#89929e" stroke={OUTLINE} strokeWidth="1.1" />
          <rect x="4.1" y="11.7" width="3" height="2.1" fill="#eef2f7" stroke={OUTLINE} strokeWidth="0.6" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.smooth',
    label: 'Smooth',
    family: 'sop',
    description:
      'Grey faceted surface with a red top edge that is a jagged zigzag on the left and a smooth arc on the right; triangles under the zigzag, quads under the arc.',
    types: ['smooth'],
    icons: ['sop_smooth', 'sop_smooth-2.0'],
    refKey: 'SOP_smooth',
    render: () => (
      <>
        <path d={SM_SHEET} fill="#c0c7d1" stroke={OUTLINE} strokeWidth="1.1" strokeLinejoin="round" />
        {/* Light and dark facets */}
        <polygon points={pts([SM_A[0], SM_A[1], SM_B[0]])} fill="#eef2f7" />
        <polygon points={pts([SM_A[2], SM_A[3], SM_B[1]])} fill="#eef2f7" />
        <polygon points={pts([SM_B[1], SM_B[2], SM_C[1]])} fill="#eef2f7" />
        <polygon points={pts([SM_A[1], SM_A[2], SM_B[1]])} fill="#89929e" />
        <polygon points={pts([SM_A[3], SM_A[4], SM_B[2]])} fill="#89929e" />
        <polygon points={pts([SM_B[2], SM_C[2], SM_C[1]])} fill="#89929e" />
        <polygon points={pts([SM_B[3], SM_B[4], SM_C[3], SM_C[2]])} fill="#89929e" />
        <path
          d={SM_LINES}
          fill="none"
          stroke={OUTLINE}
          strokeWidth="0.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d={SM_SHEET} fill="none" stroke={OUTLINE} strokeWidth="1.1" strokeLinejoin="round" />
        <CasedStroke d={SM_EDGE} color="#e03228" width={1.7} casing={2.6} />
      </>
    ),
  },
  {
    id: 'sop.implicitsurface',
    label: 'Implicit Surface',
    family: 'sop',
    description:
      'Blue-grey 3D sphere with a front-right wedge cut away to show a purple implicit interior and a red normal arrow.',
    types: ['implicitsurface'],
    icons: ['sop_implicitsurface'],
    refKey: 'SOP_implicitsurface',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-is-out`} cx="32%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#5a82b8" />
            <stop offset="100%" stopColor="#263248" />
          </radialGradient>
          <radialGradient id={`${uid}-is-in`} cx="38%" cy="50%" r="62%">
            <stop offset="0%" stopColor="#14141c" />
            <stop offset="55%" stopColor="#281c3c" />
            <stop offset="85%" stopColor="#7a4ec8" />
            <stop offset="100%" stopColor="#c8a2ff" />
          </radialGradient>
        </defs>
        {/* Cutaway sphere */}
        <circle cx="12" cy="12" r="8.2" fill={`url(#${uid}-is-in)`} stroke="#262626" strokeWidth="1.15" />
        <path
          d="M12,3.8 A8.2,8.2 0 0,0 12,20.2 C9.2,17.5 9.2,6.5 12,3.8 Z"
          fill={`url(#${uid}-is-out)`}
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* White implicit zero-contour along cut edge */}
        <path
          d="M12,4.2 C9.5,6.8 9.5,17.2 12,19.8"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Red normal arrow pointing right */}
        <polygon
          points="11.2,11 16.2,11 16.2,9.2 20.2,12 16.2,14.8 16.2,13 11.2,13"
          fill="#e03228"
          stroke="#ffffff"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.implicitsurface_convert',
    label: 'Implicit Surface Convert',
    family: 'sop',
    description:
      'Sphere split into a 3D faceted orange polygon hemisphere on the left and a purple implicit cutaway on the right.',
    types: ['implicitsurface_convert'],
    icons: ['sop_implicitsurface_convert'],
    refKey: 'SOP_implicitsurface_convert',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-isc-in`} cx="40%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#14141c" />
            <stop offset="55%" stopColor="#281c3c" />
            <stop offset="85%" stopColor="#7a4ec8" />
            <stop offset="100%" stopColor="#c8a2ff" />
          </radialGradient>
        </defs>
        {/* Right implicit cutaway */}
        <path d="M12,3.8 A8.2,8.2 0 0,1 12,20.2 Z" fill={`url(#${uid}-isc-in)`} stroke="#262626" strokeWidth="1.15" />
        {/* Left faceted orange polygon hemisphere */}
        <g stroke="#8a3e08" strokeWidth="0.6" strokeLinejoin="round">
          <polygon points="12,3.8 6.5,5.8 8.8,8.2 13.5,7.8" fill="#ffb066" />
          <polygon points="6.5,5.8 3.6,12 7.8,12 8.8,8.2" fill="#f8a24e" />
          <polygon points="8.8,8.2 13.5,7.8 14.2,12 7.8,12" fill="#ee8624" />
          <polygon points="7.8,12 14.2,12 13.5,16.2 8.8,15.8" fill="#d9701a" />
          <polygon points="3.6,12 6.5,18.2 8.8,15.8 7.8,12" fill="#ee8624" />
          <polygon points="6.5,18.2 12,20.2 13.5,16.2 8.8,15.8" fill="#b85610" />
        </g>
        {/* Highlight along the orange cut rim */}
        <polyline
          points="12,3.8 13.5,7.8 14.2,12 13.5,16.2 12,20.2"
          fill="none"
          stroke="#ffd29e"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Outer silhouette of orange shell */}
        <polyline
          points="12,3.8 6.5,5.8 3.6,12 6.5,18.2 12,20.2"
          fill="none"
          stroke="#262626"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.implicitsurface_doctor',
    label: 'Implicit Surface Doctor',
    family: 'sop',
    description:
      'Red cut sphere showing a dark interior with a bold red medical cross in a white outline at the bottom-left.',
    types: ['implicitsurface_doctor'],
    icons: ['sop_implicitsurface_doctor'],
    refKey: 'SOP_implicitsurface_doctor',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
          <circle cx="13" cy="11" r="7.2" fill="#3a3f47" />
          <path d="M13,3.8 A7.2,7.2 0 0,0 13,18.2 Z" fill="#e03228" />
        </g>
        <polygon
          points="6.5,11 9.5,11 9.5,14 12.5,14 12.5,17 9.5,17 9.5,20 6.5,20 6.5,17 3.5,17 3.5,14 6.5,14"
          fill="#e03228"
          stroke="#f2f4f7"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.implicitsurface_operation',
    label: 'Implicit Surface Operation',
    family: 'sop',
    description:
      'Purple isometric cube with elliptical cutouts on all three visible faces revealing an internal organic implicit surface.',
    types: ['implicitsurface_operation'],
    icons: ['sop_implicitsurface_operation'],
    refKey: 'SOP_implicitsurface_operation',
    render: (uid) => (
      <>
        <ImplicitCoreDefs id={`${uid}-iso-core`} />
        {/* Isometric rounded-tone purple cube */}
        <polygon
          points="12,2.4 21,7.2 12,12 3,7.2"
          fill="#c084d8"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <polygon
          points="3,7.2 12,12 12,21.6 3,16.8"
          fill="#8a56c4"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <polygon
          points="12,12 21,7.2 21,16.8 12,21.6"
          fill="#5e2f96"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Three crisp dark implicit portals with light inner edge */}
        <ellipse
          cx="12"
          cy="7.2"
          rx="4.4"
          ry="2.2"
          fill={`url(#${uid}-iso-core)`}
          stroke="#262626"
          strokeWidth="0.95"
        />
        <ellipse
          cx="7.4"
          cy="14.4"
          rx="2.3"
          ry="4"
          transform="rotate(-26 7.4 14.4)"
          fill={`url(#${uid}-iso-core)`}
          stroke="#262626"
          strokeWidth="0.95"
        />
        <ellipse
          cx="16.6"
          cy="14.4"
          rx="2.3"
          ry="4"
          transform="rotate(26 16.6 14.4)"
          fill={`url(#${uid}-iso-core)`}
          stroke="#262626"
          strokeWidth="0.95"
        />
      </>
    ),
  },
  {
    id: 'sop.implicitsurface_slice',
    label: 'Implicit Surface Slice',
    family: 'sop',
    description:
      'Purple hemisphere sliced vertically to expose a grey elliptical cross-section with concentric isoline rings.',
    types: ['implicitsurface_slice'],
    icons: ['sop_implicitsurface_slice'],
    refKey: 'SOP_implicitsurface_slice',
    render: (uid) => (
      <>
        <ImplicitCoreDefs id={`${uid}-iss-sh`} />
        {/* Left purple hemisphere */}
        <path
          d="M12.6,2.8 C7.2,2.8 3.2,7 3.2,12 C3.2,17 7.2,21.2 12.6,21.2 Z"
          fill={`url(#${uid}-iss-sh)`}
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Vertical slice oval face */}
        <ellipse cx="13.2" cy="12" rx="4.8" ry="9.2" fill="#c0c7d1" stroke="#262626" strokeWidth="1.05" />
        <ellipse cx="13.2" cy="12" rx="3.4" ry="6.8" fill="#eef2f7" stroke="#5a616b" strokeWidth="0.8" />
        <ellipse cx="13.2" cy="12" rx="1.8" ry="3.8" fill="#5a616b" stroke="#262626" strokeWidth="0.75" />
      </>
    ),
  },
  {
    id: 'sop.remeshbubbles',

    label: 'Remesh Bubbles',

    family: 'sop',

    description: 'Packed cluster of glossy soap bubbles.',
    refKey: 'SOP_remeshbubbles',
    types: ['remeshbubbles'],
    icons: ['sop_remeshbubbles'],
    render: (uid) => (
      <g>
        <defs>
          <radialGradient id={`${uid}-bub`} cx="35%" cy="32%" r="68%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#b5d7f7" />
            <stop offset="1" stopColor="#4f84c4" />
          </radialGradient>
        </defs>
        {/* Packed cluster of glossy soap bubbles */}
        {[
          [6.2, 7.2, 3.2],
          [13.2, 6.2, 3.6],
          [18.5, 9.2, 2.6],
          [8.8, 12.6, 4.2],
          [15.8, 14.2, 3.5],
          [4.8, 14.8, 2.4],
          [11.2, 18.5, 2.5],
          [18.8, 17.8, 1.8],
          [6.5, 18.6, 1.6],
        ].map(([cx, cy, r], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill={`url(#${uid}-bub)`} stroke="#204a87" strokeWidth="0.65" />
            <circle cx={cx - r * 0.32} cy={cy - r * 0.32} r={r * 0.22} fill="#ffffff" opacity="0.85" />
          </g>
        ))}
      </g>
    ),
  },
];
