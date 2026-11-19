import React from 'react';
import { ellipsePt, type Pt, pts, quadGridPath, roundedRectPath } from '../../geoHelpers';
import { CasedStroke, GenericFigure, ShadedSphere, SPHERE_TONES } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

const OUTLINE = '#262626';

const GREEN = '#58c848';

const ORANGE = '#ee8624';

/**
 * Shared chrome dancing figure of the machine learning family: arms raised in a V, the left leg
 * kicked out, the right leg straight. `(x, y)` is the torso center, `s` scales it (1 is about 19
 * units tall and 13 wide, tilted 10 degrees to the left). The head gradient id is `<uid>-head`.
 */
const MlRobot: React.FC<{ uid: string; x: number; y: number; s?: number }> = ({ uid, x, y, s = 1 }) => {
  const limbs = [
    'M-2.2,-2.3 L-4.6,-4 L-5.2,-7.4',
    'M2.5,-2.6 L4.9,-4.4 L5.2,-7.8',
    'M-1,1.9 L-4.6,2.6 L-6,5.6',
    'M1.2,1.9 L1.8,5.4 L2.2,9',
  ];
  const ends: readonly Pt[] = [
    [-5.3, -7.8],
    [5.3, -8.2],
    [-6.3, 6.2],
    [2.8, 9.4],
  ];
  return (
    <g transform={`translate(${x} ${y}) rotate(-10) scale(${s})`}>
      {limbs.map((d) => (
        <CasedStroke key={d} d={d} color="#eef2f7" width={1.9} casing={3.2} />
      ))}
      {ends.map(([ex, ey]) => (
        <circle key={`${ex},${ey}`} cx={ex} cy={ey} r="1.15" fill="#5a616b" stroke={OUTLINE} strokeWidth="0.8" />
      ))}
      <path
        d="M-2.5,-2.8 L2.8,-3.1 L1.9,2.2 L-1.5,2.4 Z"
        fill="#eef2f7"
        stroke={OUTLINE}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="0.3" cy="-0.7" r="1" fill="#3672c4" />
      <ShadedSphere id={`${uid}-head`} cx={0.5} cy={-5.2} r={2.3} strokeWidth={1} />
      <ellipse cx="0.8" cy="-5" rx="1.3" ry="0.75" fill="#3a3f47" />
    </g>
  );
};

/**
 * Shared rows of bold binary digits, colored with a thin dark edge. `(x, y)` is the baseline start
 * of the first row, `step` the row distance.
 */
const BinaryDigits: React.FC<{
  x: number;
  y: number;
  rows: readonly string[];
  color: string;
  step?: number;
  size?: number;
}> = ({ x, y, rows, color, step = 6, size = 6.2 }) => (
  <g
    fontFamily="sans-serif"
    fontWeight="bold"
    fontSize={size}
    fill={color}
    stroke={OUTLINE}
    strokeWidth="0.6"
    strokeLinejoin="round"
    paintOrder="stroke"
  >
    {rows.map((row, i) => (
      <text key={`${row}-${i}`} x={x} y={y + i * step}>
        {row}
      </text>
    ))}
  </g>
);

/** Face tone of the polyhedron from the centroid direction (light from the upper left). */
const faceTone = (t: number): string => {
  if (t > 0.3) return '#ffffff';
  if (t >= -0.05) return '#eef2f7';
  if (t > -0.38) return '#c0c7d1';
  return '#89929e';
};

/**
 * Shared wireframe icosahedron seen along a 3-fold axis: outer hexagon, inner triangle and the ten
 * visible faces toned from the upper left, with optional dark vertex dots.
 */
const Icosa: React.FC<{ cx: number; cy: number; r: number; rot?: number; dots?: boolean; edge?: number }> = ({
  cx,
  cy,
  r,
  rot = -10,
  dots = true,
  edge = 0.8,
}) => {
  const hex = [0, 1, 2, 3, 4, 5].map((k) => ellipsePt(cx, cy, r, r, rot + 60 * k));
  const inner = [0, 1, 2].map((j) => ellipsePt(cx, cy, r * 0.58, r * 0.58, rot + 120 * j));
  const faces: Pt[][] = [[inner[0], inner[1], inner[2]]];
  for (let j = 0; j < 3; j += 1) {
    const a = hex[2 * j];
    const next = hex[2 * j + 1];
    const prev = hex[(2 * j + 5) % 6];
    faces.push([inner[j], inner[(j + 1) % 3], next], [inner[j], a, next], [inner[j], prev, a]);
  }
  return (
    <>
      {faces.map((face) => {
        const mx = (face[0][0] + face[1][0] + face[2][0]) / 3;
        const my = (face[0][1] + face[1][1] + face[2][1]) / 3;
        return (
          <polygon
            key={pts(face)}
            points={pts(face)}
            fill={faceTone((cx - mx + (cy - my)) / r)}
            stroke={OUTLINE}
            strokeWidth={edge}
            strokeLinejoin="round"
          />
        );
      })}
      <polygon points={pts(hex)} fill="none" stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />
      {dots ? hex.map(([px, py]) => <circle key={`${px},${py}`} cx={px} cy={py} r="0.95" fill={OUTLINE} />) : null}
    </>
  );
};

const UPRES_BACK: readonly [Pt, Pt, Pt, Pt] = [
  [8.5, 2.5],
  [21.5, 2.5],
  [21.5, 15.5],
  [8.5, 15.5],
];

const UPRES_RIGHT: readonly [Pt, Pt, Pt, Pt] = [
  [16, 8],
  [21.5, 2.5],
  [21.5, 15.5],
  [16, 21],
];

const UPRES_TOP: readonly Pt[] = [
  [3, 8],
  [8.5, 2.5],
  [21.5, 2.5],
  [16, 8],
];

/**
 * Machine learning operators.
 */
export const ML_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.ml_example',
    label: 'ML Example',
    family: 'sop',
    description:
      'Front-facing symmetric yellow box robot head with two green eyes, a red triangle nose and two orange triangle ears, wearing a dark graduation cap with a yellow tassel on top, resting on a blue book.',
    types: [
      'ml_example',
      'ml_exampledecompose',
      'ml_examplepartition',
      'ml_extractexample',
      'ml_regressioninference',
      'ml_regressionkernel',
      'ml_regressionlinear',
      'ml_volumetilecomponent',
    ],
    icons: [
      'sop_ml_example',
      'sop_ml_exampledecompose',
      'sop_ml_examplepartition',
      'sop_ml_extractexample',
      'sop_ml_regressioninference',
      'sop_ml_regressionkernel',
      'sop_ml_regressionlinear',
      'sop_ml_volumetileexample',
    ],
    refKey: 'SOP_ml_example',
    render: () => (
      <>
        {/* Book (symmetric front view) */}
        <path d={roundedRectPath(4.5, 17.4, 15, 4, 1)} fill="#3672c4" stroke={OUTLINE} strokeWidth="1.1" />
        <path
          d={roundedRectPath(6.3, 18.6, 11.4, 1.6, 0.5)}
          fill="#f2f4f7"
          stroke={OUTLINE}
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {/* Symmetric orange cone ears */}
        <polygon
          points="6.6,10.2 3.8,11.8 6.6,13.4"
          fill={ORANGE}
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="17.4,10.2 20.2,11.8 17.4,13.4"
          fill={ORANGE}
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Head (symmetric front view) */}
        <path d={roundedRectPath(6.6, 8, 10.8, 9.4, 1.4)} fill="#f2c438" stroke={OUTLINE} strokeWidth="1.1" />
        {/* Eyes and nose */}
        <circle cx="9.6" cy="11.6" r="1.35" fill={GREEN} stroke={OUTLINE} strokeWidth="0.7" />
        <circle cx="14.4" cy="11.6" r="1.35" fill={GREEN} stroke={OUTLINE} strokeWidth="0.7" />
        <polygon
          points="12,12.9 13.6,15.8 10.4,15.8"
          fill="#e03228"
          stroke={OUTLINE}
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {/* Graduation cap */}
        <path d="M7.6,5.4 H16.4 V8 H7.6 Z" fill="#3a3f47" stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round" />
        <polygon
          points="12,2.4 19.8,4.8 12,7.2 4.2,4.8"
          fill="#5a616b"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <CasedStroke d="M12,4.8 L17.9,5.3 L18.2,8.4" color="#f2c438" width={0.9} casing={1.9} />
      </>
    ),
  },
  {
    id: 'sop.ml_exampleimport',
    label: 'ML Example Import',
    family: 'sop',
    description:
      'Raw steak seen from above: pink-red meat with a white fat rim, a darker marbling line, a white highlight and a dark red cut side.',
    types: ['ml_exampleimport', 'rawimport', 'rop_geometryraw', 'rop_ml_exampleraw'],
    icons: ['rop_geometryraw', 'rop_ml_exampleraw', 'sop_ml_exampleimport', 'sop_rawimport'],
    refKey: 'SOP_ml_exampleimport',
    render: () => {
      const top =
        'M2.6,11 C2.6,7 6.8,4.6 11,5.2 C14,5.6 15.4,7.4 17.6,6.4 C19.6,5.5 21.4,6.4 21.4,8.8 C21.4,12.4 17,15.8 11,16.8 C6,17.6 2.6,15 2.6,11 Z';
      return (
        <>
          <path
            d={top}
            transform="translate(0 2.6)"
            fill="#a81f18"
            stroke={OUTLINE}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path d={top} fill="#f2f4f7" stroke={OUTLINE} strokeWidth="1.1" strokeLinejoin="round" />
          <path
            d="M4.6,11 C4.6,8.2 7.6,6.5 11,6.9 C13.6,7.2 15.4,9 17.8,8 C19,7.5 19.6,7.9 19.6,8.9 C19.6,11.4 16,14.2 10.8,15.1 C7,15.7 4.6,13.8 4.6,11 Z"
            fill="#ff7066"
            stroke="#e03228"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
          <path
            d="M8.2,12.6 C10.4,13.2 13.4,12.4 15.4,10.8"
            fill="none"
            stroke="#e03228"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            d="M6.6,10 C7.4,8.8 8.8,8.2 10.4,8.2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </>
      );
    },
  },
  {
    id: 'sop.ml_posedeserialize',
    label: 'ML Pose Deserialize',
    family: 'sop',
    description:
      'Three rows of orange binary digits on the left and the chrome dancing figure (arms raised, one leg kicked out) on the right.',
    types: ['ml_posedeserialize'],
    icons: ['sop_ml_posedeserialize'],
    refKey: 'SOP_ml_posedeserialize',
    render: (uid) => (
      <>
        <BinaryDigits x={2.2} y={7.8} rows={['01', '11', '10']} color={ORANGE} />
        <MlRobot uid={uid} x={14.5} y={12} s={0.9} />
      </>
    ),
  },
  {
    id: 'sop.ml_poseserialize',
    label: 'ML Pose Serialize',
    family: 'sop',
    description:
      'The chrome dancing figure (arms raised, one leg kicked out) on the left and three rows of green binary digits on the right.',
    types: ['ml_poseserialize'],
    icons: ['sop_ml_poseserialize'],
    refKey: 'SOP_ml_poseserialize',
    render: (uid) => (
      <>
        <BinaryDigits x={14.5} y={7.8} rows={['01', '10', '11']} color={GREEN} />
        <MlRobot uid={uid} x={10} y={12} s={0.9} />
      </>
    ),
  },
  {
    id: 'sop.ml_regressionproximity',
    label: 'ML Regression Proximity',
    family: 'sop',
    description:
      'Green glowing disc with two concentric rings, a blue ball at its center and a second blue ball on the right rim.',
    types: ['ml_regressionproximity', 'proximity'],
    icons: ['sop_ml_regressionproximity', 'sop_proximity'],
    refKey: 'SOP_ml_regressionproximity',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="70%" stopColor={GREEN} />
            <stop offset="100%" stopColor="#52d638" />
          </radialGradient>
        </defs>
        <circle cx="11" cy="12" r="9" fill={`url(#${uid}-glow)`} stroke={OUTLINE} strokeWidth="1.2" />
        <circle cx="11" cy="12" r="6.2" fill="none" stroke={OUTLINE} strokeWidth="0.75" strokeOpacity="0.75" />
        <circle cx="11" cy="12" r="3.9" fill="none" stroke={OUTLINE} strokeWidth="0.75" strokeOpacity="0.75" />
        <ShadedSphere id={`${uid}-core`} cx={11} cy={12} r={2.3} tones={SPHERE_TONES.blue} />
        <ShadedSphere id={`${uid}-rim`} cx={19.6} cy={13} r={2.1} tones={SPHERE_TONES.blue} />
      </>
    ),
  },
  {
    id: 'sop.ml_volumetileinference',
    label: 'ML Volume Tile Inference',
    family: 'sop',
    description:
      'Wireframe icosahedron with white and grey triangle faces lit from the upper left, dark edges and dark dots on the six outer vertices.',
    types: ['ml_volumetileinference', 'onnx'],
    icons: ['sop_ml_volumetileinference', 'sop_onnx'],
    refKey: 'SOP_ml_volumetileinference',
    render: () => <Icosa cx={12} cy={12} r={9.3} />,
  },
  {
    id: 'sop.ml_volumeupres',
    label: 'ML Volume Upres',
    family: 'sop',
    description:
      'Wire cube whose back and right faces carry a green grid, with a small white and grey icosahedron in front at the lower left.',
    types: ['ml_volumeupres'],
    icons: ['sop_ml_volumeupres'],
    refKey: 'SOP_ml_volumeupres',
    render: () => (
      <>
        <polygon points={pts(UPRES_BACK)} fill="#eef2f7" stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round" />
        <path d={quadGridPath(UPRES_BACK, 3, 3)} fill="none" stroke={GREEN} strokeWidth="0.8" />
        <polygon points={pts(UPRES_RIGHT)} fill="#c0c7d1" stroke={OUTLINE} strokeWidth="1" strokeLinejoin="round" />
        <path d={quadGridPath(UPRES_RIGHT, 2, 3)} fill="none" stroke={GREEN} strokeWidth="0.8" />
        <polygon
          points={pts(UPRES_TOP)}
          fill="#ffffff"
          fillOpacity="0.55"
          stroke={OUTLINE}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M3,8 H16 V21 H3 Z" fill="none" stroke={OUTLINE} strokeWidth="1.1" strokeLinejoin="round" />
        <Icosa cx={8.6} cy={15.4} r={6.4} dots={false} edge={0.6} />
      </>
    ),
  },
  {
    id: 'sop.apex.addmldeformer',
    label: 'APEX Add ML Deformer',
    family: 'sop',
    description:
      'The chrome dancing figure (arms raised, one leg kicked out) centered, with one row of green binary digits behind its feet at the lower left.',
    types: ['addmldeformer', 'ml_deform'],
    icons: ['sop_apex-addmldeformer', 'sop_ml_deform'],
    refKey: 'SOP_apex-addmldeformer',
    render: (uid) => (
      <>
        <BinaryDigits x={2.4} y={20.8} rows={['10']} color={GREEN} size={5.4} />
        <MlRobot uid={uid} x={12.6} y={12.2} s={0.9} />
      </>
    ),
  },
  {
    id: 'sop.agentaddmldeformer',
    label: 'Agent Add ML Deformer',
    family: 'sop',
    description:
      'Crowd of three blue agent figures (light blue, the right one mid blue) at the upper left and the chrome dancing figure (arms raised, one leg kicked out) in front at the lower right.',
    types: ['agentaddmldeformer'],
    icons: ['sop_agentaddmldeformer'],
    refKey: 'SOP_agentaddmldeformer',
    render: (uid) => (
      <>
        <GenericFigure x={5.7} y={11.2} s={0.8} fill="#8fc2ff" />
        <GenericFigure x={9} y={11} s={0.8} fill="#8fc2ff" />
        <GenericFigure x={12.3} y={11.2} s={0.8} fill="#5aa2f2" />
        <MlRobot uid={uid} x={16.2} y={13.8} s={0.78} />
      </>
    ),
  },
  {
    id: 'sop.neuralpointsurface',
    label: 'Neural Point Surface',
    family: 'sop',
    description:
      'Translucent blue glass beaker with measurement ticks holding a glowing green neural point cloud at the bottom.',
    types: ['neuralpointsurface'],
    icons: ['sop_neuralpointsurface'],
    refKey: 'SOP_neuralpointsurface',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-nps-glass`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a6c2e0" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#6a6f8f" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <ellipse cx="13.2" cy="19.6" rx="7.8" ry="2.4" fill="#262626" fillOpacity="0.28" />
        <path
          d="M5.2,4.8 L6,18.2 C6,20.2 8.8,21.6 12,21.6 C15.2,21.6 18,20.2 18,18.2 L18.8,4.8 Z"
          fill={`url(#${uid}-nps-glass)`}
          stroke="#204a87"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <ellipse cx="12" cy="4.8" rx="7.2" ry="2.2" fill="#d7e6f5" stroke="#204a87" strokeWidth="0.9" />
        <path
          d="M7.2,15.5 C7.5,13.6 9.8,12.8 11.8,13.4 C13.5,12.5 16.2,13.5 16.6,15.6 C17,17.8 15,19.8 12,19.8 C9,19.8 7,17.8 7.2,15.5 Z"
          fill="#8ae234"
          stroke="#468a05"
          strokeWidth="0.8"
        />
        <g fill="#cbfb9d" stroke="#468a05" strokeWidth="0.45">
          <circle cx="9.5" cy="15.2" r="0.9" />
          <circle cx="12" cy="14.5" r="0.95" />
          <circle cx="14.4" cy="15.5" r="0.9" />
          <circle cx="10.6" cy="17.4" r="0.9" />
          <circle cx="13.4" cy="17.6" r="0.9" />
        </g>
        <g stroke="#ffffff" strokeWidth="0.65" strokeLinecap="round">
          <line x1="14.8" y1="8.8" x2="16.8" y2="8.8" />
          <line x1="15.2" y1="11.2" x2="16.8" y2="11.2" />
          <line x1="14.8" y1="13.6" x2="16.8" y2="13.6" />
          <line x1="15.2" y1="16" x2="16.8" y2="16" />
        </g>
      </>
    ),
  },
];
