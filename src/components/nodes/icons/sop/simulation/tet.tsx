import React from 'react';
import { lerpPt, type Pt, pts, quadPt, tiltedTorus } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { polyPath, ringArc, TORUS_BODY, TORUS_MID, TORUS_SHADOW } from '../kits/torus';

/**
 * Tet and FEM.
 * Shared kits: `FacetedSphere` (reused by `sop.tetconform` and `sop.femvalidate`) and
 * `TetStarCluster` (reused by `sop.tetrahedralize` and `sop.tetrasurface`).
 */

const OUTLINE = '#262626';

const GREY_TOP = '#eef2f7';

const GREY_LEFT = '#c0c7d1';

const GREY_RIGHT = '#89929e';

const DARK_GREY = '#3a3f47';

const WHITE = '#ffffff';

const PAPER = '#f2f4f7';

const YELLOW_LIT = '#ffe47a';

const YELLOW_MID = '#f2c438';

const YELLOW_DARK = '#d49a18';

const ORANGE_LIT = '#ffb066';

const ORANGE_MID = '#ee8624';

const ORANGE_DARK = '#c25e12';

const RED_LIT = '#ff7066';

const RED_MID = '#e03228';

const RED_DARK = '#a81f18';

const BLUE_LIT = '#8fc2ff';

const BLUE_MID = '#5aa2f2';

const GREEN_LIT = '#8ee878';

const GREEN_MID = '#58c848';

const GREEN_DARK = '#3da834';

type ToneRamp = readonly [string, string, string];

/**
 * Geodesic-style faceted sphere lit from the upper left. Built from a slightly off-center hub,
 * an inner ring of `segments` vertices and an outer ring of `2 * segments` vertices (or
 * `simple` mode with `segments` outer vertices for small spheres).
 */
const FacetedSphere: React.FC<{
  cx: number;
  cy: number;
  r: number;
  segments: number;
  tones: ToneRamp;
  innerStroke?: number;
  outerStroke?: number;
  simple?: boolean;
}> = ({ cx, cy, r, segments, tones, innerStroke = 0.65, outerStroke = 1.0, simple = false }) => {
  const hub: Pt = [cx - r * 0.14, cy - r * 0.14];
  const inner: Pt[] = [];
  const outer: Pt[] = [];
  const rot = -Math.PI / 2 - 0.18;

  for (let i = 0; i < segments; i += 1) {
    const a = rot + (i * Math.PI * 2) / segments;
    inner.push([cx + Math.cos(a) * r * 0.54, cy + Math.sin(a) * r * 0.54]);
  }
  const outerCount = simple ? segments : segments * 2;
  for (let i = 0; i < outerCount; i += 1) {
    const a = rot + (i * Math.PI * 2) / outerCount;
    outer.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }

  const list: [Pt, Pt, Pt][] = [];
  if (simple) {
    for (let i = 0; i < segments; i += 1) {
      const next = (i + 1) % segments;
      list.push([hub, outer[i], outer[next]]);
    }
  } else {
    for (let i = 0; i < segments; i += 1) {
      const next = (i + 1) % segments;
      const o0 = outer[i * 2];
      const oMid = outer[i * 2 + 1];
      const o1 = outer[(i * 2 + 2) % outerCount];
      list.push([hub, inner[i], inner[next]]);
      list.push([inner[i], o0, oMid]);
      list.push([inner[i], oMid, inner[next]]);
      list.push([inner[next], oMid, o1]);
    }
  }

  const toneFor = (tri: readonly [Pt, Pt, Pt]): string => {
    const mx = (tri[0][0] + tri[1][0] + tri[2][0]) / 3 - cx;
    const my = (tri[0][1] + tri[1][1] + tri[2][1]) / 3 - cy;
    // Upper-left light direction (-0.707, -0.707).
    const lit = (-mx - my) / (r * 1.414);
    if (lit > 0.22) return tones[0];
    if (lit > -0.22) return tones[1];
    return tones[2];
  };

  return (
    <g>
      <g stroke={OUTLINE} strokeWidth={innerStroke} strokeLinejoin="round">
        {list.map((tri, idx) => (
          <polygon key={idx} points={pts(tri)} fill={toneFor(tri)} />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={OUTLINE} strokeWidth={outerStroke} />
    </g>
  );
};

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

const rot3D = (v: Vec3, rx: number, ry: number): Vec3 => {
  // Rotate around Y then X for a clean 3/4 view.
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const x1 = v.x * cy + v.z * sy;
  const z1 = -v.x * sy + v.z * cy;
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  const y2 = v.y * cx - z1 * sx;
  const z2 = v.y * sx + z1 * cx;
  return { x: x1, y: y2, z: z2 };
};

const sub3 = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });

const cross3 = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});

const dot3 = (a: Vec3, b: Vec3): number => a.x * b.x + a.y * b.y + a.z * b.z;

const norm3 = (v: Vec3): Vec3 => {
  const len = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / len, y: v.y / len, z: v.z / len };
};

interface ProjectedTri {
  pts2d: [Pt, Pt, Pt];
  zMid: number;
  shade: 0 | 1 | 2;
  group: 'A' | 'B';
}

/**
 * Computes the visible 3D faces of a stellated octahedron (compound of two interlocking
 * tetrahedra A and B), backface-culled and depth-sorted.
 */
const buildTetStarTris = (cx: number, cy: number, scale: number, rx: number, ry: number): ProjectedTri[] => {
  const oct: readonly Vec3[] = [
    { x: 1, y: 0, z: 0 },
    { x: -1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 0, y: -1, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 0, z: -1 },
  ];

  // Eight octahedron faces with outward winding and alternating tetrahedron group (A or B).
  const faces: readonly { idx: [number, number, number]; group: 'A' | 'B' }[] = [
    { idx: [0, 2, 4], group: 'A' },
    { idx: [2, 1, 4], group: 'B' },
    { idx: [1, 3, 4], group: 'A' },
    { idx: [3, 0, 4], group: 'B' },
    { idx: [2, 0, 5], group: 'B' },
    { idx: [1, 2, 5], group: 'A' },
    { idx: [3, 1, 5], group: 'B' },
    { idx: [0, 3, 5], group: 'A' },
  ];

  const light = norm3({ x: -0.6, y: -0.7, z: 0.4 });
  const rawTris: ProjectedTri[] = [];

  for (const f of faces) {
    const v0 = oct[f.idx[0]];
    const v1 = oct[f.idx[1]];
    const v2 = oct[f.idx[2]];
    const apex: Vec3 = {
      x: v0.x + v1.x + v2.x,
      y: v0.y + v1.y + v2.y,
      z: v0.z + v1.z + v2.z,
    };

    const sides: readonly [Vec3, Vec3, Vec3][] = [
      [v0, v1, apex],
      [v1, v2, apex],
      [v2, v0, apex],
    ];

    for (const [a, b, c] of sides) {
      const ra = rot3D(a, rx, ry);
      const rb = rot3D(b, rx, ry);
      const rc = rot3D(c, rx, ry);
      const n = norm3(cross3(sub3(rb, ra), sub3(rc, ra)));
      // In screen space (+Y down), +Z points toward the viewer.
      if (n.z <= 0.02) continue;
      const d = dot3(n, light);
      const shade: 0 | 1 | 2 = d > 0.35 ? 0 : d > -0.15 ? 1 : 2;
      rawTris.push({
        pts2d: [
          [cx + ra.x * scale, cy + ra.y * scale],
          [cx + rb.x * scale, cy + rb.y * scale],
          [cx + rc.x * scale, cy + rc.y * scale],
        ],
        zMid: (ra.z + rb.z + rc.z) / 3,
        shade,
        group: f.group,
      });
    }
  }

  rawTris.sort((u, v) => u.zMid - v.zMid);
  return rawTris;
};

const STAR_TRIS = buildTetStarTris(12, 12, 5.9, 0.32, -0.78);

/**
 * Renders the two interlocking tetrahedra star cluster. When `contourColor` is set, draws a
 * cased outer contour around the whole silhouette before filling the facets.
 */
const TetStarCluster: React.FC<{
  tonesA: ToneRamp;
  tonesB: ToneRamp;
  contourColor?: string;
}> = ({ tonesA, tonesB, contourColor }) => (
  <g strokeLinejoin="round">
    {contourColor ? (
      <g fill="none">
        {STAR_TRIS.map((t, i) => (
          <polygon key={`c1-${i}`} points={pts(t.pts2d)} stroke={OUTLINE} strokeWidth="3.2" />
        ))}
        {STAR_TRIS.map((t, i) => (
          <polygon key={`c2-${i}`} points={pts(t.pts2d)} stroke={contourColor} strokeWidth="1.9" />
        ))}
      </g>
    ) : null}
    <g stroke={OUTLINE} strokeWidth="0.75">
      {STAR_TRIS.map((t, i) => (
        <polygon key={i} points={pts(t.pts2d)} fill={t.group === 'A' ? tonesA[t.shade] : tonesB[t.shade]} />
      ))}
    </g>
  </g>
);

/**
 * Generates an irregular triangular mesh path inside a quadrilateral cut face for `sop.tetembed`.
 */
const tetMeshPath = (q: readonly [Pt, Pt, Pt, Pt]): string => {
  const parts: string[] = [];
  const cols = 3;
  const rows = 3;
  const grid: Pt[][] = [];
  for (let r = 0; r <= rows; r += 1) {
    const row: Pt[] = [];
    for (let c = 0; c <= cols; c += 1) {
      row.push(quadPt(q, c / cols, r / rows));
    }
    grid.push(row);
  }
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const tl = grid[r][c];
      const tr = grid[r][c + 1];
      const br = grid[r + 1][c + 1];
      const bl = grid[r + 1][c];
      if (r < rows - 1) parts.push(`M${pts([bl])} L${pts([br])}`);
      if (c < cols - 1) parts.push(`M${pts([tr])} L${pts([br])}`);
      parts.push((r + c) % 2 === 0 ? `M${pts([tl])} L${pts([br])}` : `M${pts([tr])} L${pts([bl])}`);
    }
  }
  return parts.join(' ');
};

const TORUS_SPECULAR = polyPath(
  [...ringArc((d) => TORUS_BODY.ring(0.32, d), 195, 255, 8), ...ringArc((d) => TORUS_BODY.ring(0.58, d), 255, 195, 8)],
  true,
);

const torusWedge = (torus: ReturnType<typeof tiltedTorus>, a0: number, a1: number): string =>
  pts([
    torus.ring(-0.1, a0),
    torus.ring(1.15, a0),
    torus.ring(1.15, (a0 + a1) / 2),
    torus.ring(1.15, a1),
    torus.ring(-0.1, a1),
  ]);

/**
 * Tetrahedral and FEM operators.
 */
export const TET_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.tetconform',
    label: 'Tet Conform',
    family: 'sop',
    description: 'Light-blue bicycle with two faceted polyhedral wheels and a red ribbon bow tied on the front wheel.',
    types: ['tetconform'],
    icons: ['sop_tetconform'],
    refKey: 'SOP_tetconform',
    render: () => {
      const rearHub: Pt = [6.3, 14.8];
      const frontHub: Pt = [17.5, 15.2];
      const crank: Pt = [11.2, 14.8];
      const seatTop: Pt = [9.5, 9.2];
      const headTop: Pt = [15.4, 8.8];
      const stemTop: Pt = [15.0, 6.8];
      const framePath = [
        `M${pts([rearHub])} L${pts([crank])} L${pts([headTop])} L${pts([seatTop])} Z`,
        `M${pts([seatTop])} L${pts([[9.0, 7.6]])}`,
        `M${pts([crank])} L${pts([seatTop])}`,
        `M${pts([frontHub])} L${pts([headTop])} L${pts([stemTop])}`,
        `M${pts([stemTop])} L${pts([
          [16.6, 6.4],
          [17.4, 7.2],
        ])}`,
      ].join(' ');

      return (
        <>
          <FacetedSphere
            cx={rearHub[0]}
            cy={rearHub[1]}
            r={3.9}
            segments={6}
            simple
            tones={[WHITE, BLUE_LIT, BLUE_MID]}
            innerStroke={0.6}
            outerStroke={0.95}
          />
          <FacetedSphere
            cx={frontHub[0]}
            cy={frontHub[1]}
            r={3.9}
            segments={6}
            simple
            tones={[WHITE, BLUE_LIT, BLUE_MID]}
            innerStroke={0.6}
            outerStroke={0.95}
          />
          <CasedStroke d={framePath} color={BLUE_LIT} width={1.0} casing={2.0} />
          {/* Saddle */}
          <path
            d="M7.3,7.3 Q9.0,6.8 10.9,7.5 Q9.2,8.3 7.3,7.6 Z"
            fill={DARK_GREY}
            stroke={OUTLINE}
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
          {/* Red ribbon strap and bow on the front wheel */}
          <path
            d="M13.8,14.8 Q17.4,15.6 21.1,13.8"
            fill="none"
            stroke={OUTLINE}
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M13.8,14.8 Q17.4,15.6 21.1,13.8"
            fill="none"
            stroke={RED_MID}
            strokeWidth="0.95"
            strokeLinecap="round"
          />
          <polygon
            points="18.2,14.2 16.0,12.2 16.5,14.6"
            fill={RED_LIT}
            stroke={OUTLINE}
            strokeWidth="0.65"
            strokeLinejoin="round"
          />
          <polygon
            points="18.6,14.2 20.8,12.0 20.5,14.5"
            fill={RED_MID}
            stroke={OUTLINE}
            strokeWidth="0.65"
            strokeLinejoin="round"
          />
          <circle cx="18.4" cy="14.3" r="0.85" fill={RED_LIT} stroke={OUTLINE} strokeWidth="0.65" />
        </>
      );
    },
  },
  {
    id: 'sop.tetembed',
    label: 'Tet Embed',
    family: 'sop',
    description:
      'Orange cake sliced open into two hinged halves, showing a dark left cut face and a red tetrahedral mesh inside the right cut face.',
    types: ['tetembed'],
    icons: ['sop_tetembed'],
    refKey: 'SOP_tetembed',
    render: () => {
      const rightFace: readonly [Pt, Pt, Pt, Pt] = [
        [12.7, 8.9],
        [18.8, 12.0],
        [18.8, 18.2],
        [12.7, 15.1],
      ];
      return (
        <>
          {/* Left half outer body and top */}
          <path
            d="M11.6,7.4 C6.8,3.6 2.6,6.0 2.6,9.4 L2.6,15.8 C2.6,18.2 4.8,19.4 5.5,19.6 L11.6,15.6 Z"
            fill={ORANGE_DARK}
            stroke={OUTLINE}
            strokeWidth="1.0"
            strokeLinejoin="round"
          />
          <path
            d="M11.6,7.4 C6.8,3.6 2.6,6.0 2.6,9.4 C2.6,10.8 4.2,11.8 5.5,12.2 L11.6,8.2 Z"
            fill={ORANGE_MID}
            stroke={OUTLINE}
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          {/* White icing stripes on left top */}
          <path d="M5.0,7.2 L7.2,6.0 M6.8,8.7 L9.4,7.3" stroke={PAPER} strokeWidth="0.9" strokeLinecap="round" />
          {/* Left cut face (hollow dark interior) */}
          <polygon
            points="5.5,12.2 11.6,8.2 11.6,15.6 5.5,19.6"
            fill={ORANGE_MID}
            stroke={OUTLINE}
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <polygon
            points="6.4,12.7 10.8,9.8 10.8,14.9 6.4,17.8"
            fill={DARK_GREY}
            stroke={OUTLINE}
            strokeWidth="0.7"
            strokeLinejoin="round"
          />

          {/* Right half outer body and top */}
          <path
            d="M12.4,7.4 C17.2,3.6 21.4,6.0 21.4,9.4 L21.4,15.8 C21.4,18.2 19.8,19.4 19.3,19.6 L12.4,15.6 Z"
            fill={ORANGE_DARK}
            stroke={OUTLINE}
            strokeWidth="1.0"
            strokeLinejoin="round"
          />
          <path
            d="M12.4,7.4 C17.2,3.6 21.4,6.0 21.4,9.4 C21.4,10.8 20.2,11.6 19.3,11.8 L12.4,8.2 Z"
            fill={ORANGE_LIT}
            stroke={OUTLINE}
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          {/* White icing stripes on right top */}
          <path d="M14.6,7.3 L17.2,6.0 M16.8,8.7 L19.2,7.4" stroke={PAPER} strokeWidth="0.9" strokeLinecap="round" />
          {/* Right cut face with embedded red tet mesh */}
          <polygon
            points="12.4,8.2 19.3,11.8 19.3,19.4 12.4,15.6"
            fill={ORANGE_MID}
            stroke={OUTLINE}
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <polygon points={pts(rightFace)} fill={PAPER} stroke={OUTLINE} strokeWidth="0.7" strokeLinejoin="round" />
          <path d={tetMeshPath(rightFace)} fill="none" stroke={RED_MID} strokeWidth="0.65" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'sop.tetfracture',
    label: 'Tet Fracture',
    family: 'sop',
    description:
      'Isometric grey cube shattered into irregular, asymmetric angular shards separated by narrow dark fracture gaps.',
    types: ['tetfracture'],
    icons: ['sop_tetfracture'],
    refKey: 'SOP_tetfracture',
    render: () => {
      // Irregular angular shards forming an exploded isometric cube silhouette.
      const shards: readonly { faces: readonly { pts: Pt[]; fill: string }[] }[] = [
        // Top-back wedge
        {
          faces: [
            {
              pts: [
                [12.0, 2.3],
                [16.8, 4.4],
                [13.8, 6.2],
                [8.8, 4.0],
              ],
              fill: GREY_TOP,
            },
            {
              pts: [
                [8.8, 4.0],
                [13.8, 6.2],
                [12.5, 7.6],
                [8.5, 5.4],
              ],
              fill: GREY_LEFT,
            },
            {
              pts: [
                [13.8, 6.2],
                [16.8, 4.4],
                [16.0, 6.1],
                [12.5, 7.6],
              ],
              fill: GREY_RIGHT,
            },
          ],
        },
        // Upper-left corner shard
        {
          faces: [
            {
              pts: [
                [7.4, 4.5],
                [10.8, 6.4],
                [7.2, 8.5],
                [3.5, 6.4],
              ],
              fill: GREY_TOP,
            },
            {
              pts: [
                [3.5, 6.4],
                [7.2, 8.5],
                [6.6, 12.6],
                [3.4, 10.4],
              ],
              fill: GREY_LEFT,
            },
            {
              pts: [
                [7.2, 8.5],
                [10.8, 6.4],
                [10.0, 9.8],
                [6.6, 12.6],
              ],
              fill: GREY_RIGHT,
            },
          ],
        },
        // Upper-right tall shard
        {
          faces: [
            {
              pts: [
                [17.6, 4.9],
                [20.6, 6.6],
                [17.8, 8.8],
                [14.8, 6.9],
              ],
              fill: GREY_TOP,
            },
            {
              pts: [
                [14.8, 6.9],
                [17.8, 8.8],
                [17.2, 13.4],
                [14.3, 10.8],
              ],
              fill: GREY_LEFT,
            },
            {
              pts: [
                [17.8, 8.8],
                [20.6, 6.6],
                [20.5, 11.4],
                [17.2, 13.4],
              ],
              fill: GREY_RIGHT,
            },
          ],
        },
        // Center-top triangular/wedged shard
        {
          faces: [
            {
              pts: [
                [11.6, 7.2],
                [14.6, 8.7],
                [11.8, 11.1],
                [9.4, 9.4],
              ],
              fill: GREY_TOP,
            },
            {
              pts: [
                [9.4, 9.4],
                [11.8, 11.1],
                [11.5, 15.2],
                [8.8, 13.4],
              ],
              fill: GREY_LEFT,
            },
            {
              pts: [
                [11.8, 11.1],
                [14.6, 8.7],
                [14.3, 13.2],
                [11.5, 15.2],
              ],
              fill: GREY_RIGHT,
            },
          ],
        },
        // Lower-left tall irregular shard
        {
          faces: [
            {
              pts: [
                [3.5, 11.4],
                [6.8, 13.3],
                [5.8, 14.8],
                [3.4, 13.2],
              ],
              fill: GREY_TOP,
            },
            {
              pts: [
                [3.4, 13.2],
                [5.8, 14.8],
                [6.6, 18.6],
                [3.7, 17.0],
              ],
              fill: GREY_LEFT,
            },
            {
              pts: [
                [5.8, 14.8],
                [8.2, 13.8],
                [8.6, 17.2],
                [6.6, 18.6],
              ],
              fill: GREY_RIGHT,
            },
          ],
        },
        // Lower-right angled shard
        {
          faces: [
            {
              pts: [
                [16.2, 13.0],
                [20.4, 12.2],
                [18.4, 15.0],
                [14.8, 14.6],
              ],
              fill: GREY_TOP,
            },
            {
              pts: [
                [14.8, 14.6],
                [18.4, 15.0],
                [17.4, 18.7],
                [14.4, 17.6],
              ],
              fill: GREY_LEFT,
            },
            {
              pts: [
                [18.4, 15.0],
                [20.4, 12.2],
                [20.2, 16.8],
                [17.4, 18.7],
              ],
              fill: GREY_RIGHT,
            },
          ],
        },
        // Bottom-front jagged wedge
        {
          faces: [
            {
              pts: [
                [9.4, 15.6],
                [14.0, 15.8],
                [12.1, 18.6],
                [7.8, 17.6],
              ],
              fill: GREY_TOP,
            },
            {
              pts: [
                [7.8, 17.6],
                [12.1, 18.6],
                [12.2, 21.6],
                [7.8, 19.6],
              ],
              fill: GREY_LEFT,
            },
            {
              pts: [
                [12.1, 18.6],
                [15.4, 17.2],
                [15.0, 19.9],
                [12.2, 21.6],
              ],
              fill: GREY_RIGHT,
            },
          ],
        },
      ];

      return (
        <g stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round">
          {shards.map((s, i) => (
            <g key={i}>
              {s.faces.map((f, j) => (
                <polygon key={j} points={pts(f.pts)} fill={f.fill} />
              ))}
            </g>
          ))}
        </g>
      );
    },
  },
  {
    id: 'sop.tetrahedralize',
    label: 'Tetrahedralize',
    family: 'sop',
    description: 'Star-like 3D cluster of two interlocking tetrahedra, one yellow and one grey.',
    types: ['tetrahedralize'],
    icons: ['sop_tetrahedralize'],
    refKey: 'SOP_tetrahedralize',
    render: () => (
      <TetStarCluster tonesA={[YELLOW_LIT, YELLOW_MID, YELLOW_DARK]} tonesB={[GREY_TOP, GREY_LEFT, GREY_RIGHT]} />
    ),
  },
  {
    id: 'sop.tetrasurface',
    label: 'Convert Tets',
    family: 'sop',
    description: 'White and light-grey tetrahedral star cluster surrounded by a bright red outer surface contour.',
    types: ['tetrasurface'],
    icons: ['sop_tetrasurface'],
    refKey: 'SOP_tetrasurface',
    render: () => (
      <TetStarCluster tonesA={[WHITE, WHITE, GREY_TOP]} tonesB={[WHITE, GREY_TOP, GREY_LEFT]} contourColor={RED_MID} />
    ),
  },
  {
    id: 'sop.femdeform',
    label: 'FEM Deform',
    family: 'sop',
    description: 'Red muscle-like spindle stretched diagonally, pinched along its upper edge by a blue gloved hand.',
    types: ['femdeform'],
    icons: ['sop_femdeform'],
    refKey: 'SOP_femdeform',
    render: () => (
      <>
        {/* Lower-left and upper-right tendon tips */}
        <path
          d="M5.6,18.2 C4.6,19.4 4.2,20.4 4.6,21.0 C5.2,21.4 6.4,20.8 7.8,19.6 Z"
          fill={PAPER}
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M17.2,10.0 C18.8,8.8 20.0,8.4 20.4,9.0 C20.8,9.6 19.8,10.8 18.4,12.0 Z"
          fill={PAPER}
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Red muscle belly */}
        <path
          d="M6.4,18.6 C7.4,14.4 9.0,11.6 10.6,9.4 C12.4,10.6 15.2,10.4 17.8,10.0 C18.6,12.6 16.6,16.4 13.2,18.6 C10.4,20.4 7.8,20.2 6.4,18.6 Z"
          fill={RED_MID}
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Upper-left highlight and lower-right shadow bands inside the belly */}
        <path
          d="M8.0,16.4 C8.8,13.6 10.0,11.6 11.2,10.5 C12.6,11.3 14.4,11.3 16.2,11.1 C14.0,12.8 11.2,14.8 8.0,16.4 Z"
          fill={RED_LIT}
          opacity="0.7"
        />
        <path
          d="M7.6,18.4 C10.0,19.3 12.2,19.0 14.4,17.2 C16.0,15.8 17.0,13.6 17.3,11.4 C15.8,14.2 12.6,17.2 7.6,18.4 Z"
          fill={RED_DARK}
          opacity="0.65"
        />
        <path
          d="M8.8,17.2 Q12.6,14.6 16.4,11.8 M10.2,18.0 Q13.8,15.8 16.6,13.0"
          fill="none"
          stroke={RED_DARK}
          strokeWidth="0.65"
          strokeLinecap="round"
        />
        {/* Blue gloved hand pinching from the upper left */}
        <path
          d="M2.2,3.4 C4.6,2.8 7.8,3.2 9.6,5.0 C10.8,6.2 11.4,7.6 11.0,9.0 C10.6,9.4 9.8,9.0 9.4,8.0 C8.8,6.6 7.8,6.0 6.8,6.2 C7.8,6.8 8.6,7.4 9.6,8.2 C10.2,8.7 9.8,9.6 8.8,9.3 C7.4,8.9 5.8,7.9 4.4,7.5 C3.0,7.2 2.2,6.2 2.2,4.8 Z"
          fill={BLUE_MID}
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path d="M3.0,3.9 C5.2,3.4 7.8,3.9 9.2,5.3 C7.4,4.7 5.2,4.6 3.0,4.8 Z" fill={BLUE_LIT} />
      </>
    ),
  },
  {
    id: 'sop.femvalidate',
    label: 'FEM Validate',
    family: 'sop',
    description: 'Green faceted geodesic sphere with two white-bordered red triangular error patches.',
    types: ['femvalidate'],
    icons: ['sop_femvalidate'],
    refKey: 'SOP_femvalidate',
    render: () => {
      const upperPatch: Pt[] = [
        [12.8, 5.4],
        [18.2, 8.2],
        [13.6, 10.4],
      ];
      const lowerPatch: Pt[] = [
        [6.8, 13.8],
        [12.4, 17.8],
        [6.6, 18.0],
      ];
      const patchMid = (p: readonly Pt[]): Pt => [(p[0][0] + p[1][0] + p[2][0]) / 3, (p[0][1] + p[1][1] + p[2][1]) / 3];
      const shrink = (p: readonly Pt[], t: number): Pt[] => {
        const m = patchMid(p);
        return p.map((v) => lerpPt(v, m, t));
      };
      return (
        <>
          <FacetedSphere
            cx={12}
            cy={12}
            r={8.6}
            segments={5}
            tones={[GREEN_LIT, GREEN_MID, GREEN_DARK]}
            innerStroke={0.65}
            outerStroke={1.05}
          />
          {[upperPatch, lowerPatch].map((patch, idx) => (
            <g key={idx} strokeLinejoin="round">
              <polygon points={pts(patch)} fill={WHITE} stroke={OUTLINE} strokeWidth="0.9" />
              <polygon points={pts(shrink(patch, 0.24))} fill={RED_MID} stroke={OUTLINE} strokeWidth="0.6" />
            </g>
          ))}
        </>
      );
    },
  },
  {
    id: 'sop.solidify',
    label: 'Solidify',
    family: 'sop',
    description:
      'Three-tone shaded red and white striped lifebuoy torus with a small circular stitched patch on the front-left.',
    types: ['solidify'],
    icons: ['sop_solidify'],
    refKey: 'SOP_solidify',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-torus`}>
            <path d={TORUS_BODY.body} clipRule="evenodd" />
          </clipPath>
        </defs>
        <path d={TORUS_BODY.innerWall} fill="#89929e" stroke={OUTLINE} strokeWidth="0.85" strokeLinejoin="round" />
        <path d={TORUS_BODY.body} fill="#f2f4f7" fillRule="evenodd" />
        <g clipPath={`url(#${uid}-torus)`}>
          <polygon points={torusWedge(TORUS_BODY, 250, 290)} fill="#e03228" />
          <polygon points={torusWedge(TORUS_BODY, 340, 380)} fill="#e03228" />
          <polygon points={torusWedge(TORUS_BODY, 70, 110)} fill="#e03228" />
          <polygon points={torusWedge(TORUS_BODY, 160, 200)} fill="#e03228" />
          <path d={TORUS_SPECULAR} fill="#ffffff" fillOpacity="0.45" />
          <path d={TORUS_MID} fill="#5a616b" fillOpacity="0.22" />
          <path d={TORUS_SHADOW} fill="#262626" fillOpacity="0.34" />
        </g>
        <path d={TORUS_BODY.body} fill="none" stroke={OUTLINE} strokeWidth="1.15" strokeLinejoin="round" />
        <circle cx="8.0" cy="14.8" r="2.2" fill="#f2f4f7" stroke={OUTLINE} strokeWidth="0.9" />
        <path
          d="M7.0,13.7 L7.5,14.3 M9.0,13.7 L8.5,14.3 M7.0,15.9 L7.5,15.3 M9.0,15.9 L8.5,15.3"
          stroke={OUTLINE}
          strokeWidth="0.65"
          strokeLinecap="round"
        />
      </>
    ),
  },
];
