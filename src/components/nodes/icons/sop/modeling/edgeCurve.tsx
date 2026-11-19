import React from 'react';
import { arrowHead, lerpPt, type Pt, pts, quadPt } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

/** Orange quad patch matching the approved edge anchor icons (`sop.edgecollapse`, `sop.edgeequalize`). */
const EdgeQuad: React.FC<{ corners: readonly [Pt, Pt, Pt, Pt] }> = ({ corners }) => (
  <polygon points={pts([...corners])} fill="#ee8624" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
);

/** Outlined circular vertex pin used on edge and curve icons. */
const VertexDot: React.FC<{ at: Pt; r?: number; fill?: string }> = ({ at, r = 1.25, fill = '#f2f4f7' }) => (
  <circle cx={at[0]} cy={at[1]} r={r} fill={fill} stroke="#262626" strokeWidth="0.85" />
);

/** Outlined square control-vertex marker centered at `at`. */
const CvSquare: React.FC<{ at: Pt; size?: number; fill?: string }> = ({ at, size = 2.2, fill = '#f2f4f7' }) => (
  <rect
    x={at[0] - size / 2}
    y={at[1] - size / 2}
    width={size}
    height={size}
    fill={fill}
    stroke="#262626"
    strokeWidth="0.8"
    strokeLinejoin="round"
  />
);

const DIAMOND_QUAD: readonly [Pt, Pt, Pt, Pt] = [
  [12, 3.5],
  [20.5, 12],
  [12, 20.5],
  [3.5, 12],
];

const EQUALIZE_QUAD: readonly [Pt, Pt, Pt, Pt] = [
  [4, 4],
  [19, 3],
  [20.5, 19.5],
  [5.5, 20.5],
];

const EDGE_CUSP_FACETS: ReadonlyArray<{ pts: readonly [Pt, Pt, Pt]; fill: string }> = (() => {
  const t: Pt = [12, 3.6];
  const tl: Pt = [6.0, 6.1];
  const ml: Pt = [3.6, 12];
  const bl: Pt = [6.0, 17.9];
  const bt: Pt = [12, 20.4];
  const br: Pt = [18.0, 17.9];
  const mr: Pt = [20.4, 12];
  const tr: Pt = [18.0, 6.1];
  const a: Pt = [12, 7.6];
  const b: Pt = [12, 15.8];
  const l1: Pt = [7.4, 9.6];
  const l2: Pt = [7.4, 14.4];
  const r1: Pt = [16.6, 9.6];
  const r2: Pt = [16.6, 14.4];

  return [
    { pts: [t, tl, l1], fill: '#ffb066' },
    { pts: [tl, ml, l1], fill: '#ffb066' },
    { pts: [ml, l2, l1], fill: '#ee8624' },
    { pts: [ml, bl, l2], fill: '#ee8624' },
    { pts: [bl, bt, l2], fill: '#c25e12' },
    { pts: [t, l1, a], fill: '#ffb066' },
    { pts: [t, a, r1], fill: '#eef2f7' },
    { pts: [t, r1, tr], fill: '#eef2f7' },
    { pts: [l1, l2, a], fill: '#ffb066' },
    { pts: [a, l2, b], fill: '#ee8624' },
    { pts: [a, b, r1], fill: '#c0c7d1' },
    { pts: [r1, b, r2], fill: '#c0c7d1' },
    { pts: [tr, r1, mr], fill: '#c0c7d1' },
    { pts: [l2, bt, b], fill: '#c25e12' },
    { pts: [r1, r2, mr], fill: '#89929e' },
    { pts: [b, bt, br], fill: '#89929e' },
    { pts: [b, br, r2], fill: '#89929e' },
    { pts: [r2, br, mr], fill: '#89929e' },
  ];
})();

/**
 * Edge tools and curve basics.
 */
export const EDGE_CURVE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.edgecusp',
    label: 'Edge Cusp',
    family: 'sop',
    description:
      'Faceted sphere split down the center into orange left triangular facets and grey-white shaded right facets.',
    types: ['edgecusp'],
    icons: ['sop_edgecusp'],
    refKey: 'SOP_edgecusp',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-ec`}>
            <circle cx="12" cy="12" r="8.4" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-ec)`}>
          {EDGE_CUSP_FACETS.map((f, i) => (
            <polygon
              key={i}
              points={pts([...f.pts])}
              fill={f.fill}
              stroke="#262626"
              strokeWidth="0.85"
              strokeLinejoin="round"
            />
          ))}
        </g>
        <circle cx="12" cy="12" r="8.4" fill="none" stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'sop.edgedivide',
    label: 'Edge Divide',
    family: 'sop',
    description: 'Orange diamond quad patch with a diagonal edge divided by four white vertex dots.',
    types: ['edgedivide'],
    icons: ['sop_edgedivide'],
    refKey: 'SOP_edgedivide',
    render: () => {
      const a: Pt = [7.75, 16.25];
      const b: Pt = [16.25, 7.75];
      const dots = [0, 1 / 3, 2 / 3, 1].map((t) => lerpPt(a, b, t));
      return (
        <>
          <EdgeQuad corners={DIAMOND_QUAD} />
          <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#262626" strokeWidth="1" />
          {dots.map((p, i) => (
            <VertexDot key={i} at={p} r={1.3} />
          ))}
        </>
      );
    },
  },
  {
    id: 'sop.edgestraighten',
    label: 'Edge Straighten',
    family: 'sop',
    description: 'Orange vertical quad grid with a cased white zigzag edge across its columns.',
    types: ['edgestraighten'],
    icons: ['sop_edgestraighten'],
    refKey: 'SOP_edgestraighten',
    render: () => {
      const cols = [1 / 4, 2 / 4, 3 / 4]
        .map((u) => {
          const top = quadPt(EQUALIZE_QUAD, u, 0);
          const bot = quadPt(EQUALIZE_QUAD, u, 1);
          return `M${pts([top])} L${pts([bot])}`;
        })
        .join(' ');
      const hLeft = quadPt(EQUALIZE_QUAD, 0, 0.5);
      const hRight = quadPt(EQUALIZE_QUAD, 1, 0.5);
      return (
        <>
          <EdgeQuad corners={EQUALIZE_QUAD} />
          <path d={cols} fill="none" stroke="#262626" strokeWidth="0.9" />
          <line
            x1={hLeft[0]}
            y1={hLeft[1]}
            x2={hRight[0]}
            y2={hRight[1]}
            stroke="#262626"
            strokeWidth="0.7"
            strokeOpacity="0.45"
          />
          <CasedStroke
            d="M4.8,12.2 L8.4,8.2 L12.2,15.8 L16.0,8.0 L19.7,11.8"
            color="#f2f4f7"
            width={1.3}
            casing={2.4}
          />
        </>
      );
    },
  },
  {
    id: 'sop.basis',
    label: 'Spline Basis',
    family: 'sop',
    description: 'Horizontal cased white S-curve spline with two angled red tangent handle lines and endpoint pins.',
    types: ['basis'],
    icons: ['sop_basis'],
    refKey: 'SOP_basis',
    render: () => (
      <>
        <CasedStroke
          d="M3.4,12.0 C6.6,8.6 9.8,9.0 12.0,12.0 C14.2,15.0 17.4,15.4 20.6,12.0"
          color="#f2f4f7"
          width={1.7}
          casing={3.1}
        />
        <CasedStroke d="M3.4,12.0 L9.4,4.6 M20.6,12.0 L14.6,19.4" color="#ff7066" width={1.25} casing={2.2} />
        <VertexDot at={[3.4, 12.0]} r={1.35} />
        <VertexDot at={[20.6, 12.0]} r={1.35} />
        <VertexDot at={[9.4, 4.6]} r={1.25} fill="#ff7066" />
        <VertexDot at={[14.6, 19.4]} r={1.25} fill="#ff7066" />
      </>
    ),
  },
  {
    id: 'sop.fillet',
    label: 'Spline Fillet',
    family: 'sop',
    description:
      'Wide cased grey arch curve bridged at the top by a red fillet arc with two square CVs and outward red arrows.',
    types: ['fillet'],
    icons: ['sop_fillet'],
    refKey: 'SOP_fillet',
    render: () => {
      const leftHead = arrowHead([6.2, 3.4], [10.4, 7.8], 3.0, 1.8);
      const rightHead = arrowHead([17.8, 3.4], [13.6, 7.8], 3.0, 1.8);
      return (
        <>
          <CasedStroke d="M3.0,17.8 Q4.5,11.0 8.8,9.8" color="#eef2f7" width={1.6} casing={3.0} />
          <CasedStroke d="M21.0,17.8 Q19.5,11.0 15.2,9.8" color="#eef2f7" width={1.6} casing={3.0} />
          <CasedStroke d="M8.8,9.8 Q12,8.4 15.2,9.8" color="#ff7066" width={1.7} casing={3.1} />
          <CvSquare at={[8.8, 9.8]} size={2.5} />
          <CvSquare at={[15.2, 9.8]} size={2.5} />
          <CasedStroke d="M10.4,7.8 L7.8,5.1" color="#ff7066" width={1.3} casing={2.3} linecap="butt" />
          <polygon points={pts(leftHead)} fill="#ff7066" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
          <CasedStroke d="M13.6,7.8 L16.2,5.1" color="#ff7066" width={1.3} casing={2.3} linecap="butt" />
          <polygon points={pts(rightHead)} fill="#ff7066" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'sop.fit',
    label: 'Spline Fit',
    family: 'sop',
    description: 'Wide cased red S-curve fitted through four white circular sample points.',
    types: ['fit'],
    icons: ['sop_fit'],
    refKey: 'SOP_fit',
    render: () => (
      <>
        <CasedStroke
          d="M3.6,12.8 C5.8,6.0 10.0,6.0 12.6,12.0 C15.0,17.8 18.4,18.0 20.4,13.4"
          color="#ff7066"
          width={2.0}
          casing={3.4}
        />
        <VertexDot at={[3.6, 12.8]} r={1.35} />
        <VertexDot at={[8.0, 6.8]} r={1.35} />
        <VertexDot at={[17.2, 17.2]} r={1.35} />
        <VertexDot at={[20.4, 13.4]} r={1.35} />
      </>
    ),
  },
  {
    id: 'sop.refine',
    label: 'Refine',
    family: 'sop',
    description:
      'Cased grey S-curve with three white square CVs and three red inserted points on both slopes and the valley.',
    types: ['refine'],
    icons: ['sop_refine'],
    refKey: 'SOP_refine',
    render: () => (
      <>
        <CasedStroke
          d="M3.4,15.0 C5.6,6.8 9.6,6.6 12.8,12.2 C15.4,17.4 18.4,18.4 20.6,13.8"
          color="#eef2f7"
          width={1.65}
          casing={3.0}
        />
        <CvSquare at={[3.4, 15.0]} size={2.3} />
        <CvSquare at={[7.8, 7.8]} size={2.3} />
        <CvSquare at={[20.6, 13.8]} size={2.3} />
        <VertexDot at={[5.4, 10.0]} r={1.3} fill="#ff7066" />
        <VertexDot at={[11.0, 9.6]} r={1.3} fill="#ff7066" />
        <VertexDot at={[17.2, 16.8]} r={1.3} fill="#ff7066" />
      </>
    ),
  },
  {
    id: 'sop.stitch',
    label: 'Stitch',
    family: 'sop',
    description:
      'Two cased grey curve ends joined by a warm orange bridge between two red square CVs, with inward-pointing orange arrows above.',
    types: ['stitch'],
    icons: ['sop_stitch'],
    refKey: 'SOP_stitch',
    render: () => {
      const leftHead = arrowHead([11.0, 5.8], [8.2, 5.2], 3.0, 1.9);
      const rightHead = arrowHead([13.0, 5.8], [15.8, 5.2], 3.0, 1.9);
      return (
        <>
          <CasedStroke d="M3.0,19.2 Q5.0,13.4 8.8,12.2" color="#eef2f7" width={1.6} casing={3.0} />
          <CasedStroke d="M21.0,19.2 Q19.0,13.4 15.2,12.2" color="#eef2f7" width={1.6} casing={3.0} />
          <CasedStroke d="M8.8,12.2 L15.2,12.2" color="#ffb066" width={1.6} casing={3.0} />
          <CvSquare at={[8.8, 12.2]} size={2.6} fill="#ff7066" />
          <CvSquare at={[15.2, 12.2]} size={2.6} fill="#ff7066" />
          <CasedStroke d="M3.4,8.8 Q6.2,4.6 8.8,5.4" color="#ee8624" width={1.7} casing={3.1} linecap="butt" />
          <polygon points={pts(leftHead)} fill="#ee8624" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
          <CasedStroke d="M20.6,8.8 Q17.8,4.6 15.2,5.4" color="#ee8624" width={1.7} casing={3.1} linecap="butt" />
          <polygon points={pts(rightHead)} fill="#ee8624" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'sop.edgecollapse',
    label: 'Edge Collapse',
    family: 'sop',
    description: 'Orange diamond quad patch with its right edge collapsed to a point inside a dashed ghost corner.',
    types: ['edgecollapse'],
    icons: ['sop_edgecollapse'],
    refKey: 'SOP_edgecollapse',
    render: () => (
      <>
        <polyline
          points="12,4 20.5,12 16.2,16"
          fill="none"
          stroke="#262626"
          strokeWidth="1.2"
          strokeDasharray="1.5 1.2"
        />
        <polygon
          points="12,4 16.2,16 12,20 3.5,12"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M7.8,8 L16.2,16 M7.8,16 L14.1,10" stroke="#262626" strokeWidth="1" />
      </>
    ),
  },
  {
    id: 'sop.edgeequalize',
    label: 'Edge Equalize',
    family: 'sop',
    description:
      'Orange vertical quad strip with unevenly spaced grey points above and evenly spaced white points below.',
    types: ['edgeequalize'],
    icons: ['sop_edgeequalize'],
    refKey: 'SOP_edgeequalize',
    render: () => (
      <>
        <polygon
          points="4,4 19,3 20.5,19.5 5.5,20.5"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M7.5,3.8 L9,20.2 M10.2,3.6 L12.5,20 M15.5,3.2 L16.5,19.8 M4.5,9.5 L19.5,8.5 M5,15.5 L20,14.5"
          stroke="#262626"
          strokeWidth="0.9"
        />
        <g fill="#c0c7d1" stroke="#262626" strokeWidth="0.8">
          <circle cx="8" cy="9.2" r="1.2" />
          <circle cx="10.8" cy="9" r="1.2" />
          <circle cx="15.8" cy="8.7" r="1.2" />
        </g>
        <g fill="#f2f4f7" stroke="#262626" strokeWidth="0.9">
          <circle cx="5" cy="15.5" r="1.3" />
          <circle cx="8.8" cy="15.2" r="1.3" />
          <circle cx="12.5" cy="15" r="1.3" />
          <circle cx="16.2" cy="14.8" r="1.3" />
          <circle cx="20" cy="14.5" r="1.3" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.edgeflip',
    label: 'Edge Flip',
    family: 'sop',
    description: 'Orange diamond quad with a solid flipped diagonal and the previous diagonal shown dashed.',
    types: ['edgeflip'],
    icons: ['sop_edgeflip'],
    refKey: 'SOP_edgeflip',
    render: () => (
      <>
        <polygon
          points="8.5,5 20.5,7.5 15.5,19 3.5,16.5"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <line x1="3.5" y1="16.5" x2="20.5" y2="7.5" stroke="#262626" strokeWidth="1.2" />
        <line x1="8.5" y1="5" x2="15.5" y2="19" stroke="#262626" strokeWidth="1" strokeDasharray="1.5 1.2" />
      </>
    ),
  },
  {
    id: 'sop.edgerelax',
    label: 'Edge Relax',
    family: 'sop',
    description:
      'Relaxed orange triangulated mesh patch with white circular vertex pins at the corners, edges and interior.',
    types: ['edgerelax'],
    icons: ['sop_edgerelax'],
    refKey: 'SOP_edgerelax',
    render: () => (
      <>
        <path
          d="M4.5,4.5 Q11.5,5.5 18.8,4.2 Q18.2,12 19.5,19.5 Q12,18.5 4.2,19.5 Q5.5,12 4.5,4.5 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M4.5,4.5 L13.8,9.8 L18.8,4.2 M11.5,5 L13.8,9.8 L18.5,11.8 M4.8,12 L9.5,14.5 L13.8,9.8 L4.8,12 M4.2,19.5 L9.5,14.5 L19.5,19.5 M13.8,9.8 L19.5,19.5 M9.5,14.5 L12,19"
          fill="none"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <g fill="#f2f4f7" stroke="#262626" strokeWidth="0.8">
          <circle cx="4.5" cy="4.5" r="1.3" />
          <circle cx="11.5" cy="5" r="1.2" />
          <circle cx="18.8" cy="4.2" r="1.3" />
          <circle cx="4.8" cy="12" r="1.2" />
          <circle cx="13.8" cy="9.8" r="1.3" />
          <circle cx="18.5" cy="11.8" r="1.2" />
          <circle cx="9.5" cy="14.5" r="1.3" />
          <circle cx="4.2" cy="19.5" r="1.3" />
          <circle cx="12" cy="19" r="1.2" />
          <circle cx="19.5" cy="19.5" r="1.3" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.edgetransport',
    label: 'Edge Transport',
    family: 'sop',
    description:
      'Light blue Y-branching edge junction with three yellow arrows flowing from the upper-left stem into the two branches.',
    types: ['edgetransport'],
    icons: ['sop_edgetransport'],
    refKey: 'SOP_edgetransport',
    render: () => (
      <>
        <path
          d="M4,4 L11.5,11.5 M11.5,11.5 L13,20.5 M11.5,11.5 L20.5,13.5"
          fill="none"
          stroke="#262626"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
        <path
          d="M4,4 L11.5,11.5 M11.5,11.5 L13,20.5 M11.5,11.5 L20.5,13.5"
          fill="none"
          stroke="#8fc2ff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <g fill="#f2c438" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <polygon points="3.5,6.5 7.5,10.5 6.2,11.8 10.5,12.2 10.2,8 8.8,9.2 4.8,5.2" />
          <polygon points="8.5,13.5 9.2,17.8 7.5,18 10.8,21 12.5,17.2 10.8,17.5 10.2,13.2" />
          <polygon points="13.5,13.2 17.5,14.2 17.2,15.8 20.8,14.8 18.2,11.8 17.8,13.2 13.8,12" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.crease',
    label: 'Crease',
    family: 'sop',
    description: 'Orange folded sheet with a peaked central crease ridge flanked by dashed lines.',
    types: ['crease'],
    icons: ['sop_crease'],
    refKey: 'SOP_crease',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
          <polygon points="3,16.5 9.5,15.5 12,7.5 12,13.5 9.5,15.5" fill="#ee8624" />
          <polygon points="3,16.5 6.5,10 10.5,9.5 12,7.5 9.5,15.5" fill="#ffb066" />
          <polygon points="12,7.5 13.5,9.5 17.5,10 21,16.5 14.5,15.5" fill="#ffb066" />
          <line x1="12" y1="7.5" x2="12" y2="15" />
        </g>
        <path d="M9.8,9.8 L8.5,15.2 M14.2,9.8 L15.5,15.2" stroke="#262626" strokeWidth="0.9" strokeDasharray="1.4 1" />
      </>
    ),
  },
];
