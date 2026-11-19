import React from 'react';
import { ellipsePath, ellipsePt, isoBoxFaces, type Pt, pts } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';

/**
 * Shared drawing kit for * - `VoronoiIsoCube`: 2:1 isometric cube with Voronoi crack network, optional colored cells,
 *   red seed dots, and adjacency web lines.
 * - `ExplodedVoronoiChunks`: 3D-extruded isometric Voronoi chunks pushed outward from the cube
 *   center, shared by `booleanfracture`, `rbdcluster`, and `rbdexplodedview`.
 * - `FracturedTwoBlockStack`: two stacked isometric concrete/stone blocks with matching
 *   complementary jagged fractured faces (`lower` / `upper` / `both` layers).
 * - `ConstraintChunk`: angular white-grey fractured chunk used across constraint and xform icons.
 * - `RedSportsCar`: 3/4 view red sports car with open bonnet revealing the engine bay.
 * - `CarTire`: upright black/dark-grey 3D car tire (reusing `Quad Remesh` tire geometry).
 * - `BowlingPin`: white bowling pin with two red neck bands, rotatable and scalable.
 * - `RbdBullet`: diagonal metallic silver bullet with blue nose cone.
 */

export const polyPath = (list: readonly Pt[], close = false): string =>
  `M${pts(list).replace(/ /g, ' L')}${close ? ' Z' : ''}`;

export const ringArc = (fn: (deg: number) => Pt, a0: number, a1: number, step = 10): Pt[] => {
  const n = Math.max(1, Math.round(Math.abs(a1 - a0) / step));
  const out: Pt[] = [];
  for (let i = 0; i <= n; i += 1) out.push(fn(a0 + ((a1 - a0) * i) / n));
  return out;
};

/**
 * Isometric cube (`isoBoxFaces(12, 3.2, 8.2, 8.2)`) with optional Voronoi crack lines,
 * colored cell fills, red seed dots, and red adjacency lines.
 */
export const VoronoiIsoCube: React.FC<{
  cells?: React.ReactNode;
  cracks?: boolean;
  dots?: readonly Pt[];
  adjacency?: readonly (readonly [Pt, Pt])[];
}> = ({ cells, cracks = true, dots, adjacency }) => {
  const f = isoBoxFaces(12, 3.2, 8.2, 8.2);
  const crackPath = [
    'M8.2,5.1 L10.6,6.8 L14.4,5.4 L16.2,5.3',
    'M10.6,6.8 L9.8,8.7 L6.2,8.5',
    'M14.4,5.4 L15.0,8.2 L18.2,8.3',
    'M9.8,8.7 L12.0,9.7 L15.0,8.2',
    'M12.0,9.7 L12.0,11.4',
    'M3.8,10.8 L7.4,12.2 L12.0,11.4',
    'M7.4,12.2 L6.8,15.2 L3.8,14.2',
    'M6.8,15.2 L9.5,16.6 L12.0,15.6',
    'M9.5,16.6 L9.2,18.2',
    'M20.2,10.5 L16.4,12.4 L12.0,11.4',
    'M16.4,12.4 L17.0,15.4 L20.2,14.4',
    'M17.0,15.4 L14.2,16.8 L12.0,15.6',
    'M14.2,16.8 L14.8,18.2',
  ].join(' ');

  return (
    <g strokeLinejoin="round">
      <polygon points={pts(f.top)} fill="#eef2f7" stroke="#262626" strokeWidth="1.05" />
      <polygon points={pts(f.left)} fill="#c0c7d1" stroke="#262626" strokeWidth="1.05" />
      <polygon points={pts(f.right)} fill="#89929e" stroke="#262626" strokeWidth="1.05" />
      {cells}
      {cracks && <path d={crackPath} fill="none" stroke="#262626" strokeWidth="0.78" strokeLinecap="round" />}
      {adjacency && (
        <path
          d={adjacency.map(([a, b]) => `M${pts([a])} L${pts([b])}`).join(' ')}
          fill="none"
          stroke="#e03228"
          strokeWidth="0.68"
        />
      )}
      {dots?.map(([cx, cy], idx) => (
        <circle key={idx} cx={cx} cy={cy} r="0.85" fill="#e03228" stroke="#262626" strokeWidth="0.65" />
      ))}
      <polygon
        points={pts([f.top[0], f.top[1], f.right[2], f.right[3], f.left[3], f.left[0]])}
        fill="none"
        stroke="#262626"
        strokeWidth="1.15"
      />
    </g>
  );
};

/**
 * Shared Voronoi cube piece definition (polygons taken from `VoronoiIsoCube` and shifted outward
 * with 3D side bevels so `booleanfracture`, `rbdcluster`, and `rbdexplodedview` look like
 * `VoronoiIsoCube` breaking apart).
 */
export interface ExplodedChunkDef {
  id: 'top' | 'topLeft' | 'topRight' | 'center' | 'midGap' | 'botLeft' | 'botRight' | 'bottom';
  dx: number;
  dy: number;
  pts: string;
  shade: string;
}

/**
 * Eight Voronoi cube pieces matching `VoronoiIsoCube` cell shapes, pushed outward from `(12, 11.4)`.
 */
export const EXPLODED_CUBE_CHUNKS: readonly ExplodedChunkDef[] = [
  {
    id: 'top',
    dx: 0,
    dy: -1.2,
    pts: '12.0,3.2 16.2,5.3 14.4,5.4 10.6,6.8 8.2,5.1',
    shade: '10.6,6.8 14.4,5.4 14.4,6.5 10.6,7.9',
  },
  {
    id: 'topLeft',
    dx: -1.5,
    dy: -0.9,
    pts: '8.2,5.1 10.6,6.8 9.8,8.7 6.2,8.5 3.8,7.3',
    shade: '3.8,7.3 6.2,8.5 9.8,8.7 9.8,10.2 3.8,10.4',
  },
  {
    id: 'topRight',
    dx: 1.5,
    dy: -0.9,
    pts: '16.2,5.3 20.2,7.3 18.2,8.3 15.0,8.2 14.4,5.4',
    shade: '15.0,8.2 18.2,8.3 20.2,7.3 20.2,10.4 15.0,10.2',
  },
  {
    id: 'center',
    dx: 0,
    dy: -0.2,
    pts: '10.6,6.8 14.4,5.4 15.0,8.2 12.0,9.7 9.8,8.7',
    shade: '9.8,8.7 12.0,9.7 15.0,8.2 15.0,10.2 12.0,11.6 9.8,10.6',
  },
  {
    id: 'midGap',
    dx: 0,
    dy: 1.1,
    pts: '9.4,12.0 12.0,11.0 14.6,12.2 12.2,13.6',
    shade: '9.4,12.0 12.2,13.6 14.6,12.2 14.6,13.6 12.2,14.9 9.4,13.4',
  },
  {
    id: 'botLeft',
    dx: -1.5,
    dy: 1.1,
    pts: '3.8,10.8 7.4,12.2 6.8,15.2 9.5,16.6 3.8,15.5',
    shade: '3.8,13.6 6.8,15.2 9.5,16.6 9.2,18.2 3.8,15.5',
  },
  {
    id: 'botRight',
    dx: 1.5,
    dy: 1.1,
    pts: '16.4,12.4 20.2,10.5 20.2,15.5 14.8,18.2 14.2,16.8',
    shade: '14.2,16.8 17.0,15.4 20.2,14.4 20.2,15.5 14.8,18.2',
  },
  {
    id: 'bottom',
    dx: 0,
    dy: 1.6,
    pts: '9.5,16.6 12.0,15.6 14.2,16.8 14.8,18.2 12.0,19.6 9.2,18.2',
    shade: '12.0,15.6 14.2,16.8 14.8,18.2 12.0,19.6',
  },
];

/**
 * Renders selected pieces from `EXPLODED_CUBE_CHUNKS` with custom colors, optional per-piece
 * offset, and optional thick colored cluster halo (no dark outline on the halo itself).
 */
export const ExplodedVoronoiChunks: React.FC<{
  chunks: readonly {
    id: ExplodedChunkDef['id'];
    top: string;
    left: string;
    right: string;
    border?: string;
    offset?: Pt;
  }[];
}> = ({ chunks }) => (
  <g strokeLinejoin="round">
    {chunks.map((c) => {
      const def = EXPLODED_CUBE_CHUNKS.find((d) => d.id === c.id)!;
      const dx = def.dx + (c.offset?.[0] ?? 0);
      const dy = def.dy + (c.offset?.[1] ?? 0);
      return (
        <g key={c.id} transform={`translate(${dx}, ${dy})`}>
          {c.border && <polygon points={def.pts} fill="none" stroke={c.border} strokeWidth="2.4" />}
          <polygon points={def.pts} fill={c.top} stroke="#262626" strokeWidth="0.8" />
          <polygon points={def.shade} fill={c.right} stroke="#262626" strokeWidth="0.7" />
        </g>
      );
    })}
  </g>
);

/**
 * Two stacked isometric concrete/stone blocks with matching complementary jagged break patterns
 * across the middle gap. Use `layer="lower"` or `layer="upper"` to place items in the gap.
 */
export const FracturedTwoBlockStack: React.FC<{ layer?: 'lower' | 'upper' | 'both' }> = ({ layer = 'both' }) => {
  const renderLower = layer === 'lower' || layer === 'both';
  const renderUpper = layer === 'upper' || layer === 'both';

  // Upper block: top face at y=2.6..8.4, jagged break along bottom edge (dy=0 at y=9.2..11.6)
  const upperTop: Pt[] = [
    [12.0, 2.6],
    [17.8, 5.5],
    [12.0, 8.4],
    [6.2, 5.5],
  ];
  const upperLeft = 'M6.2,5.5 L12.0,8.4 L12.0,11.6 L9.4,10.2 L7.6,10.5 L6.2,9.2 Z';
  const upperRight = 'M12.0,8.4 L17.8,5.5 L17.8,9.2 L15.6,10.4 L13.8,10.1 L12.0,11.6 Z';

  // Lower block: top rim mirrors the upper block's exact jagged break shifted down by +3.8 in Y
  const lowerTop = 'M6.2,13.0 L12.0,10.4 L17.8,13.0 L15.6,14.2 L13.8,13.9 L12.0,15.4 L9.4,14.0 L7.6,14.3 Z';
  const lowerLeft = 'M6.2,13.0 L7.6,14.3 L9.4,14.0 L12.0,15.4 L12.0,20.8 L6.2,17.9 Z';
  const lowerRight = 'M12.0,15.4 L13.8,13.9 L15.6,14.2 L17.8,13.0 L17.8,17.9 L12.0,20.8 Z';

  return (
    <g strokeLinejoin="round">
      {renderLower && (
        <g>
          <path d={lowerTop} fill="#eef2f7" stroke="#262626" strokeWidth="1" />
          <path d={lowerLeft} fill="#c0c7d1" stroke="#262626" strokeWidth="1" />
          <path d={lowerRight} fill="#89929e" stroke="#262626" strokeWidth="1" />
        </g>
      )}
      {renderUpper && (
        <g>
          <polygon points={pts(upperTop)} fill="#eef2f7" stroke="#262626" strokeWidth="1" />
          <path d={upperLeft} fill="#c0c7d1" stroke="#262626" strokeWidth="1" />
          <path d={upperRight} fill="#89929e" stroke="#262626" strokeWidth="1" />
        </g>
      )}
    </g>
  );
};

/**
 * Small angular white-grey fractured chunk centered at `(cx, cy)`.
 */
export const ConstraintChunk: React.FC<{
  cx: number;
  cy: number;
  scale?: number;
  variant?: 0 | 1 | 2;
  dotColor?: string;
}> = ({ cx, cy, scale = 1, variant = 0, dotColor }) => {
  const shapes: readonly string[] = [
    'M-2.8,-0.6 L-0.6,-2.4 L2.4,-1.4 L2.6,1.2 L0.2,2.5 L-2.4,1.6 Z',
    'M-2.5,-1.5 L0.8,-2.5 L2.7,-0.3 L1.8,2.2 L-1.6,2.0 L-2.7,0.2 Z',
    'M-2.6,-0.2 L-1.0,-2.3 L2.1,-2.0 L2.7,0.9 L-0.2,2.4 L-2.3,1.2 Z',
  ];
  const shades: readonly string[] = [
    'M-2.8,-0.6 L0.2,0.4 L2.6,1.2 L0.2,2.5 L-2.4,1.6 Z',
    'M-2.7,0.2 L0.1,0.3 L1.8,2.2 L-1.6,2.0 Z',
    'M-2.3,1.2 L0.1,0.2 L2.7,0.9 L-0.2,2.4 Z',
  ];
  const d = shapes[variant];
  const s = shades[variant];
  const sw = Math.max(0.65, 0.78 / scale);
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`} strokeLinejoin="round">
      <path d={d} fill="#ffffff" stroke="#262626" strokeWidth={sw} />
      <path d={s} fill="#c0c7d1" />
      <path d={d} fill="none" stroke="#262626" strokeWidth={sw} />
      {dotColor && <circle cx="0" cy="0" r={0.9 / Math.max(0.8, scale * 0.85)} fill={dotColor} />}
    </g>
  );
};

/**
 * Straight side-view red sports car facing right with an open bonnet, missing one window and one
 * wheel, rotated clockwise around its rear wheel so the front dips to the ground.
 */
export const RedSportsCar: React.FC<{ ty?: number }> = ({ ty = 0 }) => (
  <g
    transform={`translate(0, ${ty}) rotate(8, 6.8, 14.8) translate(11.8, 13) scale(1.04) translate(-12, -13)`}
    strokeLinejoin="round"
  >
    {/* Car main side silhouette (all-red) */}
    <path
      d="M2.8,14.2 L3.4,11.2 L6.4,10.8 L8.8,8.2 L14.4,8.2 L16.2,11.2 L20.8,11.8 L21.2,14.6 L2.8,14.6 Z"
      fill="#ff7066"
      stroke="#262626"
      strokeWidth="1.05"
    />
    {/* Rear cabin window intact, front window missing (dark open void) */}
    <polygon points="5.8,11.4 8.4,8.2 11.8,8.2 11.8,11.4" fill="#ffffff" stroke="#262626" strokeWidth="0.8" />
    <polygon points="11.8,8.4 14.2,8.4 15.6,11.2 11.8,11.2" fill="#3a3f47" stroke="#262626" strokeWidth="0.8" />
    {/* Engine bay under the open bonnet */}
    <polygon points="15.8,11.2 20.4,11.6 19.8,10.2 16.0,10.2" fill="#a81f18" stroke="#262626" strokeWidth="0.8" />
    <rect x="16.8" y="10.2" width="2.2" height="1.2" rx="0.2" fill="#ff7066" stroke="#262626" strokeWidth="0.65" />
    {/* Open red bonnet hinged up at the windshield */}
    <polygon points="15.4,11.2 19.8,7.0 20.7,8.0 16.2,11.8" fill="#ff7066" stroke="#262626" strokeWidth="0.95" />
    {/* Rear wheel present; front wheel missing (empty dark wheel well) */}
    <circle cx="6.8" cy="14.8" r="2.2" fill="#3a3f47" stroke="#262626" strokeWidth="0.95" />
    <circle cx="6.8" cy="14.8" r="1.65" fill="#ffffff" />
    <path d="M15.0,14.6 A2.2,2.2 0 0,1 19.4,14.6 Z" fill="#262626" />
  </g>
);

export const QR_F: Pt = [14.5, 12.6];

export const QR_B: Pt = [9.9, 12.3];

export const QR_RX = 6.5;

export const QR_RY = 8.3;

export const QR_HOLE = 0.42;

export const qrF = (deg: number, k = 1): Pt => ellipsePt(QR_F[0], QR_F[1], QR_RX * k, QR_RY * k, deg);

export const qrB = (deg: number): Pt => ellipsePt(QR_B[0], QR_B[1], QR_RX, QR_RY, deg);

export const QR_T0 = (Math.atan(-(QR_RY * (QR_B[0] - QR_F[0])) / (QR_RX * (QR_B[1] - QR_F[1]))) * 180) / Math.PI;

export const QR_T1 = QR_T0 + 180;

export const QR_TOP = QR_T0 + 360;

export const QR_HULL = polyPath([...ringArc(qrF, QR_T0, QR_T1, 6), ...ringArc(qrB, QR_T1, QR_TOP, 6)], true);

/**
 * Upright black/dark-grey 3D car tire reusing `Quad Remesh` tire geometry.
 */
export const CarTire: React.FC<{ uid: string }> = ({ uid }) => (
  <g strokeLinejoin="round">
    <defs>
      <clipPath id={`${uid}-tire-hole`}>
        <path d={ellipsePath(QR_F[0], QR_F[1], QR_RX * QR_HOLE, QR_RY * QR_HOLE)} />
      </clipPath>
    </defs>
    {/* Dark tread hull and front face */}
    <path d={QR_HULL} fill="#89929e" stroke="#262626" strokeWidth="1.15" />
    <path d={ellipsePath(QR_F[0], QR_F[1], QR_RX, QR_RY)} fill="#3a3f47" stroke="#262626" strokeWidth="0.9" />
    {/* Subtle rim ring */}
    <path
      d={ellipsePath(QR_F[0], QR_F[1], QR_RX * 0.64, QR_RY * 0.64)}
      fill="none"
      stroke="#c0c7d1"
      strokeWidth="1.05"
    />
    {/* Inner hub hole */}
    <path d={ellipsePath(QR_F[0], QR_F[1], QR_RX * QR_HOLE, QR_RY * QR_HOLE)} fill="#262626" />
    <g clipPath={`url(#${uid}-tire-hole)`}>
      <path
        d={ellipsePath(QR_B[0] + 0.3, QR_B[1] + 2.0, QR_RX * QR_HOLE, QR_RY * QR_HOLE)}
        fill="#c0c7d1"
        stroke="#262626"
        strokeWidth="0.8"
      />
    </g>
    <path
      d={ellipsePath(QR_F[0], QR_F[1], QR_RX * QR_HOLE, QR_RY * QR_HOLE)}
      fill="none"
      stroke="#89929e"
      strokeWidth="0.8"
    />
  </g>
);

/**
 * White bowling pin with two red neck stripes, centered at `(cx, cy)` and rotated by `angle`.
 */
export const BowlingPin: React.FC<{
  cx?: number;
  cy?: number;
  angle?: number;
  scale?: number;
}> = ({ cx = 12, cy = 12, angle = 0, scale = 1 }) => (
  <g transform={`translate(${cx}, ${cy}) rotate(${angle}) scale(${scale})`} strokeLinejoin="round">
    <path
      d="M0,-8.8 C1.6,-8.8 2.2,-7.4 1.8,-5.4 C1.5,-4.0 1.4,-3.0 2.5,-1.0 C3.8,1.3 4.0,4.6 2.5,8.6 L-2.5,8.6 C-4.0,4.6 -3.8,1.3 -2.5,-1.0 C-1.4,-3.0 -1.5,-4.0 -1.8,-5.4 C-2.2,-7.4 -1.6,-8.8 0,-8.8 Z"
      fill="#f2f4f7"
      stroke="#262626"
      strokeWidth={1.05 / scale}
    />
    <path
      d="M0.6,-8.5 C1.9,-8.0 2.0,-6.8 1.7,-5.2 C1.4,-3.8 1.3,-2.8 2.3,-0.9 C3.4,1.3 3.6,4.5 2.2,8.2 L0.5,8.2 C1.7,4.5 1.6,1.4 0.7,-0.9 C0.1,-2.8 0.2,-4.0 0.4,-5.4 C0.6,-6.8 0.5,-8.0 0.6,-8.5 Z"
      fill="#c0c7d1"
    />
    <path d="M-1.5,-4.5 H1.5 M-1.6,-3.1 H1.6" fill="none" stroke="#e03228" strokeWidth={0.95 / scale} />
    <path
      d="M0,-8.8 C1.6,-8.8 2.2,-7.4 1.8,-5.4 C1.5,-4.0 1.4,-3.0 2.5,-1.0 C3.8,1.3 4.0,4.6 2.5,8.6 L-2.5,8.6 C-4.0,4.6 -3.8,1.3 -2.5,-1.0 C-1.4,-3.0 -1.5,-4.0 -1.8,-5.4 C-2.2,-7.4 -1.6,-8.8 0,-8.8 Z"
      fill="none"
      stroke="#262626"
      strokeWidth={1.05 / scale}
    />
  </g>
);

/**
 * Diagonal metallic silver bullet with a blue tip pointing upper-right.
 */
export const RbdBullet: React.FC<{ cx?: number; cy?: number; angle?: number; scale?: number }> = ({
  cx = 13.8,
  cy = 14.2,
  angle = -42,
  scale = 1,
}) => (
  <g transform={`translate(${cx}, ${cy}) rotate(${angle}) scale(${scale})`} strokeLinejoin="round">
    <path
      d="M-8.2,-2.7 L3.0,-2.7 L3.0,2.7 L-8.2,2.7 C-9.2,2.7 -9.2,-2.7 -8.2,-2.7 Z"
      fill="#c0c7d1"
      stroke="#262626"
      strokeWidth="1"
    />
    <rect x="-7.6" y="-2.0" width="10.2" height="1.5" fill="#eef2f7" />
    <rect x="-7.6" y="1.0" width="10.2" height="1.2" fill="#5a616b" />
    <line x1="-6.6" y1="-2.7" x2="-6.6" y2="2.7" stroke="#262626" strokeWidth="0.9" />
    <path
      d="M3.0,-2.7 C5.8,-2.6 8.2,-1.4 9.0,0 C8.2,1.4 5.8,2.6 3.0,2.7 Z"
      fill="#3672c4"
      stroke="#262626"
      strokeWidth="1"
    />
    <path d="M3.4,-2.1 C5.6,-1.9 7.2,-1.0 8.0,-0.2 C6.8,-0.5 5.2,-1.0 3.4,-1.0 Z" fill="#8fc2ff" />
  </g>
);

/**
 * Tiny RGB XYZ axis triad used by `sop.rbdxform`.
 */
export const MiniAxisTriad: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g>
    <CasedStroke d={`M${x},${y} L${x},${y - 2.6 * s}`} color="#e03228" width={0.75} casing={1.3} />
    <CasedStroke d={`M${x},${y} L${x + 2.3 * s},${y + 1.2 * s}`} color="#58c848" width={0.75} casing={1.3} />
    <CasedStroke d={`M${x},${y} L${x - 2.2 * s},${y + 1.3 * s}`} color="#3672c4" width={0.75} casing={1.3} />
  </g>
);
