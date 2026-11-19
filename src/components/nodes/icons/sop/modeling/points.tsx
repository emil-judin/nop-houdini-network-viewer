import React from 'react';
import { ellipsePath, ellipsePt, isoBoxFaces, type Pt, pts, quadPt, r2 } from '../../geoHelpers';
import { CasedStroke, ShadedSphere, SPHERE_TONES } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { GEAR_PATH } from '../kits/gear';

const OUTLINE = '#262626';

const CLOUD_BLUE = '#8fc2ff';

const DEFORM_TUBE = 'M6.4,6.8 C11.5,7.6 15,11.6 14.6,19.6';

type Quad = readonly [Pt, Pt, Pt, Pt];

/** Deterministic pseudo-random value in `-0.5..0.5` for an integer seed. */
const jit = (seed: number): number => {
  const v = Math.sin(seed * 12.9898 + 4.1) * 43758.5453;
  return v - Math.floor(v) - 0.5;
};

/**
 * Interior grid lines of a quad (`n` by `n` cells) whose interior crossings are moved by up to
 * `amp / 2` units, so the mesh looks jittered. The border is not included.
 */
const jitterGrid = (q: Quad, n: number, seed: number, amp: number): string => {
  const at = (i: number, j: number): Pt => {
    const p = quadPt(q, i / n, j / n);
    const inner = i > 0 && i < n && j > 0 && j < n;
    if (!inner) return p;
    return [p[0] + jit(seed + i * 7 + j * 13) * amp, p[1] + jit(seed + i * 17 + j * 5 + 3) * amp];
  };
  const parts: string[] = [];
  for (let i = 1; i < n; i += 1) {
    const line: Pt[] = [];
    for (let j = 0; j <= n; j += 1) line.push(at(i, j));
    parts.push(`M${pts(line).replace(/ /g, ' L')}`);
  }
  for (let j = 1; j < n; j += 1) {
    const line: Pt[] = [];
    for (let i = 0; i <= n; i += 1) line.push(at(i, j));
    parts.push(`M${pts(line).replace(/ /g, ' L')}`);
  }
  return parts.join(' ');
};

/** Star polygon with `n` spikes around `(cx, cy)`, first spike pointing up. */
const starPts = (cx: number, cy: number, n: number, rOut: number, rIn: number): Pt[] => {
  const out: Pt[] = [];
  for (let i = 0; i < n * 2; i += 1) {
    const r = i % 2 === 0 ? rOut : rIn;
    out.push(ellipsePt(cx, cy, r, r, -90 + (i * 180) / n));
  }
  return out;
};

/** One dotted path: round blue dots on a dark casing, so the dots read on any node color. */
const DottedStroke: React.FC<{ d: string; color?: string; gap?: number }> = ({ d, color = CLOUD_BLUE, gap = 1.65 }) => (
  <g fill="none" strokeLinecap="round" strokeDasharray={`0.01 ${gap}`}>
    <path d={d} stroke={OUTLINE} strokeWidth="2.15" />
    <path d={d} stroke={color} strokeWidth="1.5" />
  </g>
);

/**
 * Shared point cloud of the family: a small dotted ring on top, dotted vertical sides and a wide
 * dotted brim ring below (a hat shape made of points).
 */
const PointCloudHat: React.FC<{
  cx: number;
  topY: number;
  topRx: number;
  topRy: number;
  brimY: number;
  brimRx: number;
  brimRy: number;
}> = ({ cx, topY, topRx, topRy, brimY, brimRx, brimRy }) => (
  <>
    <DottedStroke d={ellipsePath(cx, brimY, brimRx, brimRy)} />
    <DottedStroke
      d={`M${r2(cx - topRx)},${r2(topY + 1.5)} V${r2(brimY - brimRy * 0.35)} M${r2(cx + topRx)},${r2(topY + 1.5)} V${r2(brimY - brimRy * 0.35)}`}
    />
    <DottedStroke d={ellipsePath(cx, topY, topRx, topRy)} />
  </>
);

/** Flat point sphere with a dark outline and a small upper-left highlight. */
const PointBall: React.FC<{ cx: number; cy: number; r: number; fill?: string; light?: string }> = ({
  cx,
  cy,
  r,
  fill = '#ee8624',
  light = '#ffb066',
}) => (
  <>
    <circle cx={r2(cx)} cy={r2(cy)} r={r} fill={fill} stroke={OUTLINE} strokeWidth="0.8" />
    <circle cx={r2(cx - r * 0.3)} cy={r2(cy - r * 0.32)} r={r2(r * 0.36)} fill={light} />
  </>
);

/** Cased red X mark centered on `(cx, cy)`, arms `s` long. */
const RedCross: React.FC<{ cx: number; cy: number; s?: number }> = ({ cx, cy, s = 1.4 }) => (
  <CasedStroke
    d={`M${r2(cx - s)},${r2(cy - s)} L${r2(cx + s)},${r2(cy + s)} M${r2(cx + s)},${r2(cy - s)} L${r2(cx - s)},${r2(cy + s)}`}
    color="#e03228"
    width={1.35}
    casing={2.4}
  />
);

const ISO_SHEET: Quad = [
  [13.6, 10.4],
  [20.6, 8.6],
  [15.4, 20.2],
  [6.2, 20.6],
];

const ISO_GREY_DOTS: readonly Pt[] = [
  [3.6, 10.6],
  [5.6, 7.4],
  [8.2, 5],
  [11.2, 3.5],
  [14.6, 3.3],
  [18, 3.8],
  [4.6, 14.4],
  [8, 11.6],
  [10.6, 8.6],
  [14, 7],
  [17.4, 6.6],
  [3.6, 18],
];

const ISO_YELLOW_UV: readonly Pt[] = [
  [0, 0],
  [0.5, 0],
  [1, 0],
  [1, 0.5],
  [1, 1],
  [0.5, 1],
  [0, 1],
  [0, 0.5],
  [0.5, 0.5],
];

/** Dial outline of the speedometer, shrunk by `k` units. */
const dialPath = (k: number): string =>
  `M${r2(2.8 + k)},15.5 A${r2(9.2 - k)},${r2(9.8 - k)} 0 0 1 ${r2(21.2 - k)},15.5 L${r2(20.7 - k)},${r2(19.2 - k)} Q12,${r2(20.6 - k)} ${r2(3.3 + k)},${r2(19.2 - k)} Z`;

const GENERATE_CLUSTERS: readonly (readonly [number, number, number])[] = [
  [6.6, 6.6, 45],
  [17.4, 6.6, 28],
  [6.6, 17.4, 58],
  [17.4, 17.4, 40],
];

const REPLICATE_BACK: readonly (readonly [number, number, number])[] = [
  [12.3, 4, 1.5],
  [5.6, 7, 1.8],
  [16.8, 7.6, 1.8],
  [19.6, 11.8, 1.6],
  [5.6, 12.6, 1.3],
  [4.8, 17.2, 1.8],
  [12.6, 20, 1.7],
  [19.2, 17, 1.5],
];

const DEFORM_CAGE_NODES: Record<string, Pt> = {
  b: [17.8, 5.6],
  c: [21, 10.6],
  d: [21, 16.6],
  e: [18.4, 21],
  f: [12, 21.4],
  g: [8.2, 18.6],
  h: [9, 13.6],
  j: [15.6, 10.4],
  k: [16.2, 16],
};

const DEFORM_CAGE_EDGES = 'bc cd de ef fg gh hj jb jc jk kd ke kf kg kh'.split(' ');

const DEFORM_CAGE = DEFORM_CAGE_EDGES.map(
  (e) => `M${pts([DEFORM_CAGE_NODES[e[0]]])} L${pts([DEFORM_CAGE_NODES[e[1]]])}`,
).join(' ');

/**
 * Point and point cloud operators.
 */
export const POINT_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.pointcloudiso',
    label: 'Point Cloud Iso',
    family: 'sop',
    description:
      'Loose cloud of pale grey points in the upper left turning into an orange surface patch studded with yellow points in the lower right.',
    types: ['pointcloudiso', 'pointcloudsurface'],
    icons: ['sop_pointcloudiso', 'sop_pointcloudsurface'],
    refKey: 'SOP_pointcloudiso',
    render: () => (
      <>
        {ISO_GREY_DOTS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.05" fill="#eef2f7" stroke={OUTLINE} strokeWidth="0.85" />
        ))}
        <polygon points={pts(ISO_SHEET)} fill="#ee8624" stroke={OUTLINE} strokeWidth="1.25" strokeLinejoin="round" />
        <polygon
          points={pts([
            quadPt(ISO_SHEET, 0.08, 0.1),
            quadPt(ISO_SHEET, 0.92, 0.1),
            quadPt(ISO_SHEET, 0.9, 0.45),
            quadPt(ISO_SHEET, 0.1, 0.45),
          ])}
          fill="#ffb066"
        />
        <polygon
          points={pts([
            quadPt(ISO_SHEET, 0.1, 0.72),
            quadPt(ISO_SHEET, 0.92, 0.72),
            quadPt(ISO_SHEET, 0.9, 0.94),
            quadPt(ISO_SHEET, 0.12, 0.94),
          ])}
          fill="#c25e12"
        />
        {ISO_YELLOW_UV.map(([u, v]) => {
          const [x, y] = quadPt(ISO_SHEET, u, v);
          return (
            <circle
              key={`${u}-${v}`}
              cx={r2(x)}
              cy={r2(y)}
              r="1.1"
              fill="#ffe47a"
              stroke={OUTLINE}
              strokeWidth="0.85"
            />
          );
        })}
      </>
    ),
  },
  {
    id: 'sop.pointcloudmeasure',
    label: 'Point Cloud Measure',
    family: 'sop',
    description:
      'Blue dotted point cloud hat behind a pale grey tape measure with a circular hub, red lock button, and a straight horizontal yellow tape with a grey hook.',
    types: ['pointcloudmeasure'],
    icons: ['sop_pointcloudmeasure'],
    refKey: 'SOP_pointcloudmeasure',
    render: () => (
      <>
        <PointCloudHat cx={9.6} topY={4.6} topRx={4.8} topRy={1.7} brimY={12.4} brimRx={7} brimRy={2.9} />
        {/* Straight horizontal yellow tape with ticks and a grey end hook */}
        <path
          d="M15.5,17.8 H20.4 V20.6 H15.5 Z"
          fill="#f2c438"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path d="M17.4,18.0 V19.4 M19.0,18.0 V19.4" fill="none" stroke={OUTLINE} strokeWidth="0.7" />
        <path
          d="M20.4,17.4 H21.6 V20.8 H20.4 Z"
          fill="#c0c7d1"
          stroke={OUTLINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Tape measure body */}
        <path
          d="M10.4,10.6 H14.6 Q17.6,10.6 17.6,13.6 V20.6 H9.6 Q7.6,20.6 7.6,18.6 V13.4 Q7.6,10.6 10.4,10.6 Z"
          fill="#eef2f7"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <circle cx="11.6" cy="15.4" r="2.5" fill="#89929e" stroke={OUTLINE} strokeWidth="0.8" />
        <circle cx="11.6" cy="15.4" r="0.9" fill="#eef2f7" />
        <path
          d="M15.3,13.4 H17.6 V17.4 H15.3 Z"
          fill="#e03228"
          stroke={OUTLINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.pointcloudnormal',
    label: 'Point Cloud Normal',
    family: 'sop',
    description:
      'Eight light blue points in a ring with outward red normal rays around a slightly lower-left center point with a short up-right red normal ray.',
    types: ['pointcloudnormal'],
    icons: ['sop_pointcloudnormal'],
    refKey: 'SOP_pointcloudnormal',
    render: () => {
      const angles = [-90, -45, 0, 45, 90, 135, 180, 225];
      const dots = angles.map((deg) => ellipsePt(12, 12, 5.8, 5.3, deg));
      const tips = angles.map((deg) =>
        deg % 90 === 0 ? ellipsePt(12, 12, 9.5, 9.1, deg) : ellipsePt(12, 12, 11.2, 10.8, deg),
      );
      const lines = dots.map((p, i) => `M${pts([p])} L${pts([tips[i]])}`).join(' ');
      return (
        <>
          <CasedStroke d={`${lines} M11.1,12.9 L13.2,10.8`} color="#e03228" width={0.95} casing={1.55} />
          {dots.map(([x, y]) => (
            <PointBall key={`${r2(x)}-${r2(y)}`} cx={x} cy={y} r={1.55} fill="#8fc2ff" light="#ffffff" />
          ))}
          <PointBall cx={11.1} cy={12.9} r={1.55} fill="#8fc2ff" light="#ffffff" />
        </>
      );
    },
  },
  {
    id: 'sop.pointcloudreduce',
    label: 'Point Cloud Reduce',
    family: 'sop',
    description:
      'Dotted blue point cloud hat (small ring over a wide brim ring) with three red X marks where points are removed.',
    types: ['pointcloudreduce'],
    icons: ['sop_pointcloudreduce'],
    refKey: 'SOP_pointcloudreduce',
    render: () => (
      <>
        <PointCloudHat cx={12} topY={6.4} topRx={5.8} topRy={2.2} brimY={15.6} brimRx={8.8} brimRy={3.8} />
        <RedCross cx={17.5} cy={5.4} s={1.3} />
        <RedCross cx={5.8} cy={10.8} s={1.3} />
        <RedCross cx={13.4} cy={18.2} s={1.3} />
      </>
    ),
  },
  {
    id: 'sop.pointdeform',
    label: 'Point Deform',
    family: 'sop',
    description:
      'Fat orange bent tube with its open end facing upper left, wrapped on the lower right by a pale triangulated wire cage.',
    types: ['pointdeform'],
    icons: ['sop_pointdeform'],
    refKey: 'SOP_pointdeform',
    render: () => (
      <>
        {/* Tube body as a thick cased stroke */}
        <g fill="none" strokeLinecap="butt">
          <path d={DEFORM_TUBE} stroke={OUTLINE} strokeWidth="10.6" />
          <path d={DEFORM_TUBE} stroke="#ee8624" strokeWidth="8.4" />
          <path d="M8.6,5 C13,5.8 16.6,9.4 17,15" stroke="#ffb066" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <path d="M9.9,19.4 L19.3,19.9" fill="none" stroke={OUTLINE} strokeWidth="1.1" strokeLinecap="round" />
        {/* Open end */}
        <ellipse
          cx="6.4"
          cy="6.8"
          rx="2.1"
          ry="4.75"
          transform="rotate(9 6.4 6.8)"
          fill="#c25e12"
          stroke={OUTLINE}
          strokeWidth="1.1"
        />
        {/* Wire cage */}
        <CasedStroke d={DEFORM_CAGE} color="#c0c7d1" width={0.65} casing={1.25} />
      </>
    ),
  },
  {
    id: 'sop.pointgenerate',
    label: 'Point Generate',
    family: 'sop',
    description:
      'Four clusters in a two by two layout, each a grey sphere with four small orange point spheres around it.',
    types: ['pointgenerate'],
    icons: ['sop_pointgenerate'],
    refKey: 'SOP_pointgenerate',
    render: (uid) => (
      <>
        {GENERATE_CLUSTERS.map(([cx, cy, rot], c) => (
          <React.Fragment key={`${cx}-${cy}`}>
            <ShadedSphere id={`${uid}-core${c}`} cx={cx} cy={cy} r={2.3} strokeWidth={0.85} />
            {[0, 90, 180, 270].map((a) => {
              const [x, y] = ellipsePt(cx, cy, 2.9, 2.9, a + rot);
              return <PointBall key={a} cx={x} cy={y} r={1.4} />;
            })}
          </React.Fragment>
        ))}
      </>
    ),
  },
  {
    id: 'sop.pointjitter',
    label: 'Point Jitter',
    family: 'sop',
    description:
      'Light grey three-tone cube with a wobbly three by three quad mesh on every face and a slightly uneven silhouette.',
    types: ['pointjitter'],
    icons: ['sop_pointjitter'],
    refKey: 'SOP_pointjitter',
    render: () => {
      const box = isoBoxFaces(12, 3, 8.6, 9);
      const move = (p: Pt, seed: number): Pt => [p[0] + jit(seed) * 1.6, p[1] + jit(seed + 31) * 1.6];
      const a = move(box.top[0], 1);
      const b = move(box.top[1], 2);
      const c = move(box.top[2], 3);
      const d = move(box.top[3], 4);
      const e = move(box.left[3], 5);
      const f = move(box.left[2], 6);
      const g = move(box.right[2], 7);
      const top: Quad = [a, b, c, d];
      const left: Quad = [d, c, f, e];
      const right: Quad = [c, b, g, f];
      const faces: readonly (readonly [Quad, string, number])[] = [
        [top, '#ffffff', 11],
        [left, '#eef2f7', 47],
        [right, '#c0c7d1', 83],
      ];
      return (
        <>
          {faces.map(([q, fill, seed]) => (
            <React.Fragment key={seed}>
              <polygon points={pts(q)} fill={fill} stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round" />
              <path
                d={jitterGrid(q, 3, seed, 2.2)}
                fill="none"
                stroke={OUTLINE}
                strokeWidth="0.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </React.Fragment>
          ))}
          <polygon
            points={pts([a, b, g, f, e, d])}
            fill="none"
            stroke={OUTLINE}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </>
      );
    },
  },
  {
    id: 'sop.pointreplicate',
    label: 'Point Replicate',
    family: 'sop',
    description:
      'Grey sphere in the center surrounded by orange point spheres of varied sizes, a bigger orange sphere overlapping its lower right.',
    types: ['pointreplicate'],
    icons: ['sop_pointreplicate'],
    refKey: 'SOP_pointreplicate',
    render: (uid) => (
      <>
        {REPLICATE_BACK.map(([x, y, r]) => (
          <PointBall key={`${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
        <ShadedSphere id={`${uid}-core`} cx={11.6} cy={12.2} r={3.9} strokeWidth={1} />
        <PointBall cx={9.8} cy={8.2} r={1.3} />
        <ShadedSphere id={`${uid}-big`} cx={14.8} cy={14.9} r={2.6} tones={SPHERE_TONES.orange} strokeWidth={0.9} />
      </>
    ),
  },
  {
    id: 'sop.pointvelocity',
    label: 'Point Velocity',
    family: 'sop',
    description:
      'Black speedometer dome with a grey rim, yellow tick marks around the arc and a pale needle pointing to the upper right.',
    types: ['pointvelocity'],
    icons: ['sop_pointvelocity'],
    refKey: 'SOP_pointvelocity',
    render: () => {
      const ticks = [192, 220, 248, 276, 304, 332]
        .map((deg) => `M${pts([ellipsePt(12, 16, 4.9, 5.7, deg)])} L${pts([ellipsePt(12, 16, 6.7, 7.5, deg)])}`)
        .join(' ');
      return (
        <>
          <path d={dialPath(0)} fill="#c0c7d1" stroke={OUTLINE} strokeWidth="1.1" strokeLinejoin="round" />
          <path d={dialPath(1.7)} fill={OUTLINE} />
          <path d="M5.6,12.6 A6.6,6.6 0 0 1 18.4,12.6 Q12,9.4 5.6,12.6 Z" fill="#3a3f47" />
          <path d={ticks} fill="none" stroke="#f2c438" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M13.6,17.6 L18.2,11.4" fill="none" stroke="#f2f4f7" strokeWidth="1.2" strokeLinecap="round" />
        </>
      );
    },
  },
  {
    id: 'sop.pointweld',
    label: 'Point Weld',
    family: 'sop',
    description:
      'Two pale grey plates meeting in a bow-tie with a yellow spark star at the seam and a welding torch (dark handle, silver nozzle) coming in from the upper right.',
    types: ['pointweld'],
    icons: ['sop_pointweld'],
    refKey: 'SOP_pointweld',
    render: () => (
      <>
        <polygon
          points="2.6,9.6 10.2,12.8 9.8,18 3.8,20.8"
          fill="#eef2f7"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <polygon
          points="12.4,13.2 19.6,10.6 18.6,21.2 12,18.2"
          fill="#c0c7d1"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Torch nozzle and handle */}
        <CasedStroke d="M17,7.8 Q14,9.6 12.4,13" color="#c0c7d1" width={1.2} casing={2.3} />
        <g fill="none" strokeLinecap="round">
          <path d="M20.2,4.4 L16.6,8" stroke={OUTLINE} strokeWidth="4.2" />
          <path d="M20.2,4.4 L16.6,8" stroke="#5a616b" strokeWidth="2.4" />
          <path d="M19.4,4 L16.4,7" stroke="#c0c7d1" strokeWidth="0.7" />
        </g>
        {/* Spark */}
        <polygon
          points={pts(starPts(11.1, 15.4, 8, 4.3, 1.7))}
          fill="#f2c438"
          stroke={OUTLINE}
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <circle cx="11.1" cy="15.4" r="1.3" fill="#ffe47a" />
      </>
    ),
  },
  {
    id: 'sop.scatter',
    label: 'Scatter',
    family: 'sop',
    description: 'Light grey plane covered with scattered yellow points with dark outlines.',
    types: ['scatter'],
    refKey: 'SOP_scatter-2.0',
    render: () => (
      <>
        <polygon
          points="12,6 22,12.5 12,19 2,12.5"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {[
          [12, 8.4],
          [8, 11],
          [15.8, 10.4],
          [5, 12.6],
          [19, 12.6],
          [11.2, 13],
          [14.8, 14.4],
          [9, 15.3],
          [12, 17],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="#f5d33a" stroke="#262626" strokeWidth="0.9" />
        ))}
      </>
    ),
  },
  {
    id: 'sop.scatteralign',
    label: 'Scatter and Align',
    family: 'sop',
    description:
      'Isometric desert sand patch with green saguaro and barrel cacti, a small white skull stone, and red scatter rings.',
    types: ['scatteralign'],
    icons: ['sop_scatteralign'],
    refKey: 'SOP_scatteralign',
    render: () => (
      <>
        {/* Wavy isometric sand patch thickness + bright top */}
        <path
          d="M2.2,15.6 C5.2,17.8 8.6,19.8 12.0,20.8 C15.4,19.8 18.8,17.8 21.8,15.6 L21.8,17.0 C18.8,19.2 15.4,21.2 12.0,22.1 C8.6,21.2 5.2,19.2 2.2,17.0 Z"
          fill="#c89a5a"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M12.0,10.2 C15.6,11.8 18.8,13.6 21.8,15.6 C18.8,17.8 15.4,19.8 12.0,20.8 C8.6,19.8 5.2,17.8 2.2,15.6 C5.2,13.6 8.4,11.8 12.0,10.2 Z"
          fill="#ffb066"
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Left saguaro cactus (chunky for 21px) */}
        <path
          d="M6.1,14.4 V5.6 C6.1,4.6 7.9,4.6 7.9,5.6 V8.9 H8.9 C9.5,8.9 9.8,8.6 9.8,8.0 V6.9 C9.8,6.0 11.1,6.0 11.1,6.9 V8.5 C11.1,9.7 10.2,10.3 8.9,10.3 H7.9 V14.4 Z M6.1,10.8 H5.1 C3.9,10.8 3.2,10.1 3.2,9.0 V7.7 C3.2,6.8 4.5,6.8 4.5,7.7 V8.9 C4.5,9.4 4.8,9.6 5.3,9.6 H6.1 Z"
          fill="#52d638"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Right saguaro cactus */}
        <path
          d="M16.1,14.8 V7.1 C16.1,6.1 17.9,6.1 17.9,7.1 V9.9 H18.8 C19.4,9.9 19.7,9.6 19.7,9.0 V8.0 C19.7,7.2 21.0,7.2 21.0,8.0 V9.4 C21.0,10.6 20.1,11.2 18.9,11.2 H17.9 V14.8 Z"
          fill="#52d638"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* White skull/stone */}
        <path
          d="M9.6,14.5 C9.6,12.9 12.4,12.9 12.4,14.5 C12.4,15.5 11.8,16.1 11.0,16.1 C10.2,16.1 9.6,15.5 9.6,14.5 Z"
          fill="#ffffff"
          stroke={OUTLINE}
          strokeWidth="0.85"
        />
        {/* Barrel cactus */}
        <ellipse cx="14.2" cy="17.2" rx="1.9" ry="1.5" fill="#52d638" stroke={OUTLINE} strokeWidth="0.85" />
        {/* Small red scatter points only under each cactus, white dot, and green dot */}
        <circle cx="7.0" cy="14.3" r="0.7" fill="#e03228" stroke={OUTLINE} strokeWidth="0.6" />
        <circle cx="17.0" cy="14.8" r="0.7" fill="#e03228" stroke={OUTLINE} strokeWidth="0.6" />
        <circle cx="11.0" cy="16.0" r="0.7" fill="#e03228" stroke={OUTLINE} strokeWidth="0.6" />
        <circle cx="14.2" cy="18.6" r="0.7" fill="#e03228" stroke={OUTLINE} strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'sop.spraypaint',
    label: 'Spray Paint',
    family: 'sop',
    description:
      'Tilted silver-grey aerosol spray can with a red circle label and dark nozzle spraying a red paint cone to the right.',
    types: ['spraypaint'],
    icons: ['sop_spraypaint'],
    refKey: 'SOP_spraypaint',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-can`} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
          <linearGradient id={`${uid}-spray`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#e03228" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#ff7066" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        {/* Wide, bold red spray cone fanning right from the nozzle */}
        <polygon
          points="13.0,6.6 22.0,2.8 22.0,12.4"
          fill={`url(#${uid}-spray)`}
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Tilted cylindrical can body + shoulder shifted slightly left for spray room */}
        <g transform="rotate(30 8.5 13.8)">
          <path
            d="M5.4,9.8 C5.4,8.0 6.7,7.1 8.5,7.1 C10.3,7.1 11.6,8.0 11.6,9.8 V20.0 C11.6,20.7 10.2,21.2 8.5,21.2 C6.8,21.2 5.4,20.7 5.4,20.0 Z"
            fill={`url(#${uid}-can)`}
            stroke={OUTLINE}
            strokeWidth="1.05"
            strokeLinejoin="round"
          />
          {/* Red circle label */}
          <circle cx="8.5" cy="15.2" r="2.3" fill="#e03228" stroke={OUTLINE} strokeWidth="0.85" />
          <circle cx="8.5" cy="15.2" r="1.05" fill="#ffffff" />
          {/* Dark grey nozzle cap */}
          <rect x="7.0" y="4.9" width="3.0" height="2.4" rx="0.5" fill="#3a3f47" stroke={OUTLINE} strokeWidth="0.9" />
          <circle cx="9.6" cy="5.9" r="0.6" fill="#e03228" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.extractcentroid',
    label: 'Extract Centroid',
    family: 'sop',
    description:
      'White cylinder, disc and cone (outlined in teal, dark red and olive), each marked with a small grey centroid point.',
    types: ['extractcentroid'],
    refKey: 'SOP_extractcentroid',
    render: () => (
      <>
        <path d="M3 5.5C3 3 10 3 10 5.5V14C10 16.5 3 16.5 3 14Z" fill="#f2f4f7" stroke="#1d4a52" strokeWidth="1.2" />
        <path d="M3 5.5C3 8 10 8 10 5.5" fill="none" stroke="#1d4a52" strokeWidth="1" />
        <circle cx="16.5" cy="9.5" r="5.5" fill="#eef2f7" stroke="#5a1a1a" strokeWidth="1.2" />
        <path
          d="M12 6.5L18 18.5C16 21.5 8 21.5 6 18.5Z"
          fill="#ffffff"
          stroke="#5c4a0c"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="6.5" cy="10.5" r="1.4" fill="#7a828e" stroke="#262626" strokeWidth="0.8" />
        <circle cx="18" cy="8.6" r="1.4" fill="#7a828e" stroke="#262626" strokeWidth="0.8" />
        <circle cx="12" cy="16" r="1.4" fill="#7a828e" stroke="#262626" strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'sop.cluster',
    label: 'Cluster',
    family: 'sop',
    description: 'Three overlapping dashed circles enclosing orange, blue and green point clusters.',
    types: ['cluster'],
    icons: ['sop_cluster'],
    refKey: 'SOP_cluster',
    render: () => (
      <>
        <circle
          cx="8.5"
          cy="8.5"
          r="5.2"
          fill="#ffb066"
          fillOpacity="0.35"
          stroke="#ee8624"
          strokeWidth="1.1"
          strokeDasharray="1.8 1.2"
        />
        <circle
          cx="15.5"
          cy="8.8"
          r="5"
          fill="#c89eff"
          fillOpacity="0.35"
          stroke="#6e3ea6"
          strokeWidth="1.1"
          strokeDasharray="1.8 1.2"
        />
        <circle
          cx="13.5"
          cy="15.5"
          r="5.2"
          fill="#52d638"
          fillOpacity="0.35"
          stroke="#262626"
          strokeWidth="1.1"
          strokeDasharray="1.8 1.2"
        />
        <g stroke="#262626" strokeWidth="0.8">
          <circle cx="7" cy="7.2" r="1.4" fill="#ee8624" />
          <circle cx="9.8" cy="6.8" r="1.4" fill="#ee8624" />
          <circle cx="7.5" cy="10.2" r="1.4" fill="#ee8624" />
          <circle cx="15" cy="7.2" r="1.4" fill="#9b66d4" />
          <circle cx="17.2" cy="9.5" r="1.4" fill="#9b66d4" />
          <circle cx="12.2" cy="15.5" r="1.4" fill="#58c848" />
          <circle cx="15.5" cy="16.2" r="1.4" fill="#58c848" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.clusterpoints',
    label: 'Cluster Points',
    family: 'sop',
    description: 'Three overlapping dashed circles enclosing dark point dots with white rims.',
    types: ['clusterpoints'],
    icons: ['sop_clusterpoints'],
    refKey: 'SOP_clusterpoints',
    render: () => (
      <>
        <circle
          cx="8.5"
          cy="8.5"
          r="5.2"
          fill="#ffb066"
          fillOpacity="0.35"
          stroke="#ee8624"
          strokeWidth="1.1"
          strokeDasharray="1.8 1.2"
        />
        <circle
          cx="15.5"
          cy="8.8"
          r="5"
          fill="#8fc2ff"
          fillOpacity="0.35"
          stroke="#3672c4"
          strokeWidth="1.1"
          strokeDasharray="1.8 1.2"
        />
        <circle
          cx="13.5"
          cy="15.5"
          r="5.2"
          fill="#52d638"
          fillOpacity="0.35"
          stroke="#262626"
          strokeWidth="1.1"
          strokeDasharray="1.8 1.2"
        />
        <g fill="#262626" stroke="#f2f4f7" strokeWidth="0.8">
          <circle cx="7" cy="7.2" r="1.4" />
          <circle cx="9.8" cy="6.8" r="1.4" />
          <circle cx="7.5" cy="10.2" r="1.4" />
          <circle cx="15" cy="7.2" r="1.4" />
          <circle cx="17.2" cy="9.5" r="1.4" />
          <circle cx="12.2" cy="15.5" r="1.4" />
          <circle cx="15.5" cy="16.2" r="1.4" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.relax',
    label: 'Point Relax',
    family: 'sop',
    description:
      'Subdivided quad mesh with a central vertex and four red-orange arrows radiating outward along the grid axes.',
    types: ['relax', 'uvrelax'],
    icons: ['sop_relax', 'sop_uvrelax'],
    refKey: 'SOP_relax',
    render: () => (
      <>
        <polygon
          points="2.5,2.5 12,5.5 21.5,2.5 18.5,12 21.5,21.5 12,18.5 2.5,21.5 5.5,12"
          fill="#2e3436"
          stroke="#eeeeec"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <g stroke="#d3d7cf" strokeWidth="0.7">
          <line x1="2.5" y1="2.5" x2="21.5" y2="21.5" />
          <line x1="21.5" y1="2.5" x2="2.5" y2="21.5" />
          <polygon points="7.2,7.2 16.8,7.2 16.8,16.8 7.2,16.8" fill="none" />
        </g>
        <g fill="#ef2929" stroke="#eeeeec" strokeWidth="0.55" strokeLinejoin="round">
          <polygon points="12,2 14.6,5.6 13,5.6 13,9.5 11,9.5 11,5.6 9.4,5.6" />
          <polygon points="12,22 14.6,18.4 13,18.4 13,14.5 11,14.5 11,18.4 9.4,18.4" />
          <polygon points="2,12 5.6,9.4 5.6,11 9.5,11 9.5,13 5.6,13 5.6,14.6" />
          <polygon points="22,12 18.4,9.4 18.4,11 14.5,11 14.5,13 18.4,13 18.4,14.6" />
        </g>
        <circle cx="12" cy="12" r="1.6" fill="#dfeaa1" stroke="#2e3436" strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.neighborsearchcl',
    label: 'Neighbor Search CL',
    family: 'sop',
    description:
      'Glowing green radial search field with concentric rings around a central yellow query point and blue neighbor dots.',
    types: ['neighborsearchcl'],
    icons: ['sop_neighborsearchcl'],
    refKey: 'SOP_neighborsearchcl',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ns-bg`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#70be3e" />
            <stop offset="65%" stopColor="#cae6b4" />
            <stop offset="100%" stopColor="#dce5cb" stopOpacity="0.15" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="10.2" fill={`url(#${uid}-ns-bg)`} />
        <circle cx="12" cy="12" r="8.2" fill="none" stroke="#8ccd55" strokeWidth="0.6" />
        <circle cx="12" cy="12" r="5.6" fill="none" stroke="#6db146" strokeWidth="0.65" />
        <circle cx="12" cy="12" r="3.4" fill="none" stroke="#4e8033" strokeWidth="0.7" />
        <circle cx="12" cy="12" r="1.4" fill="#fff55b" stroke="#ffa81f" strokeWidth="0.75" />
        <g fill="#5490c1" stroke="#152a4c" strokeWidth="0.65">
          <circle cx="9.2" cy="9.8" r="1.15" />
          <circle cx="15.2" cy="13.5" r="1.15" />
          <circle cx="14.2" cy="7.2" r="1.15" />
          <circle cx="6.2" cy="15.8" r="1.15" />
          <circle cx="18.2" cy="9.2" r="1.15" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.trail',
    label: 'Trail',
    family: 'sop',
    description:
      'Four shaded orange spheres fading from bottom-left to a bold leading sphere at top-right over a soft orange trail ribbon.',
    types: ['trail'],
    icons: ['sop_trail'],
    refKey: 'SOP_trail',
    render: (uid) => (
      <>
        <path
          d="M3.6,17.4 Q9.4,9.6 17.4,3.4 A3.0,3.0 0 0,1 20.6,8.0 Q12.6,14.2 6.6,20.4 A2.2,2.2 0 0,1 3.6,17.4 Z"
          fill="#ffb066"
          fillOpacity="0.45"
          stroke={OUTLINE}
          strokeOpacity="0.8"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <g opacity="0.58">
          <ShadedSphere
            id={`${uid}-s0`}
            cx={5.1}
            cy={18.9}
            r={2.2}
            tones={['#fff2cc', '#ffd27a', '#ee8624']}
            strokeWidth={0.85}
          />
        </g>
        <g opacity="0.72">
          <ShadedSphere
            id={`${uid}-s1`}
            cx={9.3}
            cy={14.0}
            r={2.45}
            tones={['#ffe4a8', '#ffb85c', '#d86e18']}
            strokeWidth={0.9}
          />
        </g>
        <g opacity="0.86">
          <ShadedSphere id={`${uid}-s2`} cx={13.8} cy={9.6} r={2.75} tones={SPHERE_TONES.orange} strokeWidth={0.95} />
        </g>
        <ShadedSphere id={`${uid}-s3`} cx={18.4} cy={5.6} r={3.2} tones={SPHERE_TONES.orange} strokeWidth={1.05} />
      </>
    ),
  },
  {
    id: 'sop.sort',
    label: 'Sort',
    family: 'sop',
    description: "Light metallic 12-tooth gear with a dark center hole. Also Houdini's generic operator icon.",
    // Houdini draws these SOPs with the same gear picture as Sort.
    types: ['sort', 'bakeode', 'cache', 'control', 'matchtopology', 'starburst', 'superquad', 'wiretransfershape'],
    icons: ['misc_generic'],
    refKey: 'SOP_sort',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-gear`} cx="38%" cy="34%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#7a828e" />
          </radialGradient>
        </defs>
        <path d={GEAR_PATH} fill={`url(#${uid}-gear)`} stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="5" fill="none" stroke="#89929e" strokeWidth="1" />
        <circle cx="12" cy="12" r="3.2" fill="#4a5260" stroke="#262626" strokeWidth="1.1" />
      </>
    ),
  },
];
