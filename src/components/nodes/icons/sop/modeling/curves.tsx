import { cubicAt, type Pt, pts } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

const OUTLINE = '#262626';

const GREY_LEFT = '#c0c7d1';

const DARK_GREY = '#3a3f47';

const MID_DARK = '#5a616b';

const PAPER = '#f2f4f7';

const RED = '#e03228';

const LIGHT_BLUE = '#5aa2f2';

const WOOD = '#e8c48a';

const RESAMPLE_UPPER: readonly [Pt, Pt, Pt, Pt] = [
  [3.0, 6.8],
  [7.5, -0.5],
  [14.5, 13.8],
  [21.0, 5.6],
];

const RESAMPLE_LOWER: readonly [Pt, Pt, Pt, Pt] = [
  [3.0, 16.8],
  [7.5, 9.5],
  [14.5, 23.8],
  [21.0, 15.6],
];

const RESAMPLE_TOP_T = [0, 0.25, 0.75, 1];

const RESAMPLE_BOT_T = [0, 0.16, 0.33, 0.5, 0.67, 0.84, 1];

/**
 * Curve operators: drawing, sweeping, resampling and extracting curves.
 */
export const CURVE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.drawcurve',
    label: 'Draw Curve',
    family: 'sop',
    description: 'Tilted blue pen drawing a bold dark S-curve stroke on the left.',
    types: ['drawcurve'],
    icons: ['sop_drawcurve'],
    refKey: 'SOP_drawcurve',
    render: () => (
      <>
        <path
          d="M5.5,7 C7,10.5 3.5,14.5 5.5,17.5 C7,19.8 10.5,19.8 12,18"
          fill="none"
          stroke="#262626"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="12,18 13.5,14 15.8,15.5" fill="#eef2f7" />
          <polygon points="13.5,14 18.5,4.5 21.2,6.2 15.8,15.5" fill="#5aa2f2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.circlefromedges',
    label: 'Circle from Edges',
    family: 'sop',
    description: 'Orange subdivided quad patch with a bright yellow circle traced over its inner edges.',
    types: ['circlefromedges'],
    icons: ['sop_circlefromedges'],
    refKey: 'SOP_circlefromedges',
    render: () => (
      <>
        <polygon
          points="4.5,3.5 19.5,4.5 19,20.5 5,19.5"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M9.5,3.8 V19.8 M14.5,4.2 V20.2 M4.7,9 H19.3 M4.9,14.5 H19.1" stroke="#262626" strokeWidth="0.8" />
        <circle cx="12" cy="12" r="5.5" fill="none" stroke="#262626" strokeWidth="2.8" />
        <circle cx="12" cy="12" r="5.5" fill="none" stroke="#ffe47a" strokeWidth="1.6" />
      </>
    ),
  },
  {
    id: 'sop.circlespline',
    label: 'Circle Spline',
    family: 'sop',
    description:
      'Closed curve with a smooth blue circular arc on the left and a jagged red control polygon with white vertices on the right.',
    types: ['circlespline'],
    icons: ['sop_circlespline'],
    refKey: 'SOP_circlespline',
    render: () => (
      <>
        <path
          d="M12,19.5 A7.2,7.2 0 1,1 12,4.8 L14,3.5 L15.5,8 L18.5,6.8 L16.2,11.2 L19.8,13.5 L15.5,15.5 Z"
          fill="none"
          stroke="#262626"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <path d="M12,19.5 A7.2,7.2 0 1,1 12,4.8" fill="none" stroke="#3672c4" strokeWidth="1.5" />
        <path
          d="M12,4.8 L14,3.5 L15.5,8 L18.5,6.8 L16.2,11.2 L19.8,13.5 L15.5,15.5 L12,19.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <g fill="#f2f4f7" stroke="#262626" strokeWidth="0.9">
          <circle cx="5.2" cy="9" r="1.4" />
          <circle cx="5.5" cy="15.5" r="1.4" />
          <circle cx="12" cy="19.5" r="1.4" />
          <circle cx="12" cy="4.8" r="1.4" />
          <circle cx="15.5" cy="8" r="1.4" />
          <circle cx="16.2" cy="11.2" r="1.4" />
          <circle cx="19.8" cy="13.5" r="1.4" />
          <circle cx="15.5" cy="15.5" r="1.4" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.chain',
    label: 'Chain',
    family: 'sop',
    description: 'Green U-shaped curve hanging from two square anchors with blue geometric beads threaded along it.',
    types: ['chain'],
    icons: ['sop_chain'],
    refKey: 'SOP_chain',
    render: () => (
      <>
        <path d="M6,5.5 C6,18.5 18,18.5 18,5.5" fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
        <path d="M6,5.5 C6,18.5 18,18.5 18,5.5" fill="none" stroke="#52d638" strokeWidth="1.6" strokeLinecap="round" />
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <rect x="4.2" y="3.8" width="3.6" height="3.2" fill="#58c848" />
          <rect x="16.2" y="3.8" width="3.6" height="3.2" fill="#58c848" />
          <circle cx="6.5" cy="10.8" r="2" fill="#5aa2f2" />
          <rect x="7.8" y="13.2" width="3.6" height="3.6" transform="rotate(20 9.6 15)" fill="#8fc2ff" />
          <polygon points="14.2,12.8 16.5,16.8 12.2,16.8" fill="#3672c4" />
          <polygon points="17.5,8.8 19.8,12.2 15.5,12.2" fill="#5aa2f2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.carve',
    label: 'Carve',
    family: 'sop',
    description: 'Grey open cylinder with a front vertical section carved out and red dashed arcs across the gap.',
    types: ['carve'],
    icons: ['sop_carve'],
    refKey: 'SOP_carve',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
          <path d="M5.5,6.5 A6.5,2.5 0 1,1 18.5,6.5 V17.5 A6.5,2.5 0 0,0 5.5,17.5 Z" fill="#89929e" />
          <path d="M5.5,6.5 A6.5,2.5 0 0,0 11,9 V20 A6.5,2.5 0 0,1 5.5,17.5 Z" fill="#eef2f7" />
          <path d="M15.5,8.6 A6.5,2.5 0 0,0 18.5,6.5 V17.5 A6.5,2.5 0 0,1 15.5,19.6 Z" fill="#c0c7d1" />
        </g>
        <path
          d="M11,9 Q13.5,9.3 15.5,8.6 M11,20 Q13.5,20.3 15.5,19.6"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.2"
          strokeDasharray="1.5 1.2"
        />
      </>
    ),
  },
  {
    id: 'sop.sweep',
    label: 'Sweep',
    family: 'sop',
    description:
      'Closed kidney-shaped profile (red outline, dark interior) swept downward into a smooth shaded grey wall, with a red seam line on the front.',
    types: ['sweep'],
    refKey: 'SOP_sweep-2.0',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-wall`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f4f6f9" />
            <stop offset="30%" stopColor="#9aa2ae" />
            <stop offset="55%" stopColor="#c8d0da" />
            <stop offset="80%" stopColor="#b8c0cc" />
            <stop offset="100%" stopColor="#7a828e" />
          </linearGradient>
          <linearGradient id={`${uid}-inside`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4a5568" />
            <stop offset="100%" stopColor="#e4e8ee" />
          </linearGradient>
        </defs>
        {/* Swept wall (front half of the profile pushed down) */}
        <path
          d="M21 4.6C21 7 16.5 6.8 13.5 7.8C10.5 8.8 8.5 11 5.5 11C3.6 11 2.5 9.6 2.5 7.5L2.5 18C2.5 20.1 3.6 21.5 5.5 21.5C8.5 21.5 10.5 19.3 13.5 18.3C16.5 17.3 21 17.5 21 15.1Z"
          fill={`url(#${uid}-wall)`}
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Profile curve seen from above (open top, dark inside) */}
        <path
          d="M2.5 7.5C2.5 3.8 11 1.8 17 2.2C19.5 2.4 21 3.2 21 4.6C21 7 16.5 6.8 13.5 7.8C10.5 8.8 8.5 11 5.5 11C3.6 11 2.5 9.6 2.5 7.5Z"
          fill={`url(#${uid}-inside)`}
          stroke="#e03228"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Front seam */}
        <path d="M5.5 11V21.5" stroke="#e03228" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.orientalongcurve',
    label: 'Orientation along Curve',
    family: 'sop',
    description: 'S-curve cased for visibility with translucent blue orientation frames and orange tangent arrows.',
    types: ['orientalongcurve'],
    icons: ['sop_orientalongcurve'],
    refKey: 'SOP_orientalongcurve',
    render: () => (
      <>
        <path
          d="M3.5,20 C6.2,15.6 11.5,16.6 13.5,11.6 C15.2,7.4 12.4,5.4 18.8,3.4"
          fill="none"
          stroke="#262626"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M3.5,20 C6.2,15.6 11.5,16.6 13.5,11.6 C15.2,7.4 12.4,5.4 18.8,3.4"
          fill="none"
          stroke="#c0c7d1"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
        {[
          { x: 5.5, y: 17.8, a: -28 },
          { x: 10.6, y: 15.2, a: -12 },
          { x: 13.6, y: 11.2, a: 18 },
          { x: 15.2, y: 6.2, a: -22 },
        ].map((f, i) => (
          <g key={i} transform={`translate(${f.x}, ${f.y}) rotate(${f.a})`}>
            <polygon
              points="-2.6,-3 2.6,-1.6 2.6,3 -2.6,1.6"
              fill="#eef2f7"
              fillOpacity="0.65"
              stroke="#3672c4"
              strokeWidth="0.85"
              strokeLinejoin="round"
            />
            <line x1="0" y1="0" x2="2.8" y2="-1.9" stroke="#262626" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="0" y1="0" x2="2.8" y2="-1.9" stroke="#ee8624" strokeWidth="0.95" strokeLinecap="round" />
            <circle cx="0" cy="0" r="0.85" fill="#262626" stroke="#eef2f7" strokeWidth="0.35" />
          </g>
        ))}
      </>
    ),
  },
  {
    id: 'sop.convertline',
    label: 'Convert Line',
    family: 'sop',
    description:
      'Wireframe box with cased grey edges, colored bottom edges (red, yellow, green, blue) and grey vertex balls on every corner.',
    types: ['convertline'],
    refKey: 'SOP_convertline',
    render: () => (
      <>
        {/* Dark casing under every edge */}
        <path
          d="M4 6L15 3L20.5 7L9.5 10ZM4 15L15 12L20.5 16L9.5 19ZM4 6V15M15 3V12M20.5 7V16M9.5 10V19"
          fill="none"
          stroke="#262626"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <path
          d="M4 6L15 3L20.5 7L9.5 10ZM4 6V15M15 3V12M20.5 7V16M9.5 10V19"
          fill="none"
          stroke="#b4bcc8"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d="M4 15L15 12" stroke="#4892f0" strokeWidth="1.4" />
        <path d="M15 12L20.5 16" stroke="#58c848" strokeWidth="1.4" />
        <path d="M4 15L9.5 19" stroke="#e03228" strokeWidth="1.4" />
        <path d="M9.5 19L20.5 16" stroke="#f0c828" strokeWidth="1.4" />
        {[
          [4, 6],
          [15, 3],
          [20.5, 7],
          [9.5, 10],
          [4, 15],
          [15, 12],
          [20.5, 16],
          [9.5, 19],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="#c0c7d1" stroke="#262626" strokeWidth="1" />
        ))}
      </>
    ),
  },
  {
    id: 'sop.ends',
    label: 'Ends',
    family: 'sop',
    description: 'Open dark C-ring with a gap at the top flanked by two bright red endpoint dots.',
    types: ['ends'],
    icons: ['sop_ends'],
    refKey: 'SOP_ends',
    render: () => (
      <>
        <path d="M9,4.5 A8,8 0 1,0 15,4.5" fill="none" stroke="#f2f4f7" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M9,4.5 A8,8 0 1,0 15,4.5" fill="none" stroke="#262626" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="9.5" cy="4.2" r="2" fill="#e03228" stroke="#f2f4f7" strokeWidth="0.8" />
        <circle cx="14.5" cy="4.2" r="2" fill="#e03228" stroke="#f2f4f7" strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'sop.extractpointfromcurve',
    label: 'Extract Point from Curve',
    family: 'sop',
    description: 'Grey S-curve with a red extracted point along a red horizontal line below the label X=1.',
    types: ['extractpointfromcurve'],
    icons: ['sop_extractpointfromcurve'],
    refKey: 'SOP_extractpointfromcurve',
    render: () => (
      <>
        <text
          x="12"
          y="9.5"
          fontFamily="sans-serif"
          fontSize="7"
          fontWeight="bold"
          textAnchor="middle"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.9"
          paintOrder="stroke"
        >
          X=1
        </text>
        <line x1="6" y1="11.5" x2="18" y2="11.5" stroke="#e03228" strokeWidth="1.5" />
        <path
          d="M4,16.5 C6.5,12 10.5,13 13.5,16.5 C16,19.5 18.5,19 20,16"
          fill="none"
          stroke="#262626"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M4,16.5 C6.5,12 10.5,13 13.5,16.5 C16,19.5 18.5,19 20,16"
          fill="none"
          stroke="#c0c7d1"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="4" cy="16.5" r="1.5" fill="#eef2f7" stroke="#262626" strokeWidth="0.9" />
        <circle cx="20" cy="16" r="1.5" fill="#eef2f7" stroke="#262626" strokeWidth="0.9" />
        <circle cx="11.2" cy="14.5" r="2" fill="#e03228" stroke="#262626" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.extractcontours',
    label: 'Extract Contours',
    family: 'sop',
    description:
      'Dark blue balloon dog at the bottom-left projected along green dashed lines into yellow balloon-dog contour ellipsoids at the top-right.',
    types: ['extractcontours'],
    icons: ['sop_extractcontours'],
    refKey: 'SOP_extractcontours',
    render: () => (
      <>
        <path
          d="M5,11.5 L12.5,4.5 M10.5,18.5 L18.5,11.5"
          stroke="#58c848"
          strokeWidth="1.1"
          strokeDasharray="1.6 1.2"
        />
        <g fill="#262626" stroke="#5aa2f2" strokeWidth="1" strokeLinejoin="round">
          <ellipse cx="4.5" cy="10.2" rx="2.1" ry="1.25" />
          <ellipse cx="6.2" cy="12" rx="1.5" ry="2.8" />
          <ellipse cx="8.2" cy="14.5" rx="2.8" ry="1.4" />
          <ellipse cx="5.5" cy="17.2" rx="1.4" ry="2.4" />
          <ellipse cx="10.2" cy="17.2" rx="1.4" ry="2.4" />
        </g>
        <g fill="#f2c438" stroke="#262626" strokeWidth="1">
          <ellipse cx="12.7" cy="4.7" rx="2.2" ry="1.3" />
          <ellipse cx="14.5" cy="6.5" rx="1.6" ry="3" />
          <ellipse cx="17" cy="9" rx="3" ry="1.5" />
          <ellipse cx="14" cy="11.8" rx="1.5" ry="2.4" />
          <ellipse cx="18.8" cy="11.8" rx="1.5" ry="2.4" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.resample',
    label: 'Resample',
    family: 'sop',
    description:
      'Two stacked red S-curves: the upper curve carries four white square point markers with an open middle span and the lower curve carries seven closely packed square markers.',
    types: ['resample'],
    icons: ['sop_resample'],
    refKey: 'SOP_resample',
    render: () => {
      const upperD = `M${pts([RESAMPLE_UPPER[0]])} C${pts([RESAMPLE_UPPER[1], RESAMPLE_UPPER[2], RESAMPLE_UPPER[3]])}`;
      const lowerD = `M${pts([RESAMPLE_LOWER[0]])} C${pts([RESAMPLE_LOWER[1], RESAMPLE_LOWER[2], RESAMPLE_LOWER[3]])}`;
      return (
        <>
          <CasedStroke d={upperD} color={RED} width={1.5} casing={2.0} />
          <CasedStroke d={lowerD} color={RED} width={1.5} casing={2.0} />
          {RESAMPLE_TOP_T.map((t, i) => {
            const [x, y] = cubicAt(...RESAMPLE_UPPER, t);
            return (
              <rect
                key={`t-${i}`}
                x={x - 1.35}
                y={y - 1.35}
                width="2.7"
                height="2.7"
                fill={PAPER}
                stroke={OUTLINE}
                strokeWidth="0.65"
              />
            );
          })}
          {RESAMPLE_BOT_T.map((t, i) => {
            const [x, y] = cubicAt(...RESAMPLE_LOWER, t);
            return (
              <rect
                key={`b-${i}`}
                x={x - 1.1}
                y={y - 1.1}
                width="2.2"
                height="2.2"
                fill={PAPER}
                stroke={OUTLINE}
                strokeWidth="0.6"
              />
            );
          })}
        </>
      );
    },
  },
  {
    id: 'sop.stroke',
    label: 'Stroke',
    family: 'sop',
    description:
      'Diagonal blue brush stroke sweeping from top-left to bottom-right with ragged bristle tips, detached flecks, and light blue highlight streaks.',
    types: ['stroke'],
    icons: ['sop_stroke'],
    refKey: 'SOP_stroke',
    render: () => (
      <>
        <path
          d="M2.6,6.4 C2.8,4.4 5.0,4.2 7.0,5.2 L19.2,11.6 L16.8,12.2 L21.2,15.6 L16.6,14.8 L19.4,18.2 L4.4,11.0 C2.6,10.0 2.4,8.2 2.6,6.4 Z"
          fill={LIGHT_BLUE}
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M5.4,7.2 L14.4,11.8 M6.6,9.4 L13.2,12.8"
          fill="none"
          stroke="#8fc2ff"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.walkonsurface',
    label: 'Walk on Surface',
    family: 'sop',
    description: 'Wavy grey grid surface patch with a continuous red S-shaped path winding across it.',
    types: ['walkonsurface'],
    icons: ['sop_walkonsurface'],
    refKey: 'SOP_walkonsurface',
    render: () => (
      <>
        <path
          d="M3.2,4.6 Q10.0,3.4 18.8,7.2 Q19.2,13.6 21.0,19.4 Q13.0,21.0 7.6,16.8 Q5.6,10.8 3.2,4.6 Z"
          fill={GREY_LEFT}
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M8.6,4.8 Q10.6,11.4 12.2,18.6 M13.8,5.8 Q15.4,12.4 16.8,19.2 M5.0,9.2 Q11.8,8.4 19.2,11.6 M6.4,13.4 Q13.2,13.2 20.0,15.8"
          fill="none"
          stroke={MID_DARK}
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        <CasedStroke d="M5.4,6.4 C11.4,6.8 6.4,15.2 11.4,15.6 C14.8,15.8 14.0,9.8 19.4,17.4" color={RED} width={1.35} />
      </>
    ),
  },
  {
    id: 'sop.trace',
    label: 'Trace',
    family: 'sop',
    description:
      'Tilted white photo card holding a dark grey head-and-shoulders silhouette traced on the right by a red pencil.',
    types: ['trace'],
    icons: ['sop_trace'],
    refKey: 'SOP_trace',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-frame`}>
            <polygon points="4.2,9.2 14.0,6.6 16.4,16.4 6.6,19.0" />
          </clipPath>
        </defs>
        <polygon
          points="2.4,7.8 15.2,4.4 18.4,17.4 5.6,20.8"
          fill={PAPER}
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <polygon points="4.2,9.2 14.0,6.6 16.4,16.4 6.6,19.0" fill={GREY_LEFT} stroke={OUTLINE} strokeWidth="0.75" />
        <g clipPath={`url(#${uid}-frame)`}>
          <circle cx="10.2" cy="12.2" r="2.2" fill={DARK_GREY} />
          <path d="M6.4,19.2 C6.6,15.8 8.4,14.8 10.6,14.6 C12.8,14.4 14.6,15.6 15.6,18.2 Z" fill={DARK_GREY} />
          <path
            d="M11.6,10.2 C12.8,11.2 12.6,13.4 11.4,14.2 C13.2,14.6 14.6,15.8 15.4,17.6"
            fill="none"
            stroke={RED}
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </g>
        <polygon
          points="19.8,2.4 21.8,4.4 15.0,11.2 13.0,9.2"
          fill={RED}
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polygon
          points="13.0,9.2 15.0,11.2 12.2,12.0"
          fill={WOOD}
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon points="12.2,12.0 13.1,11.7 12.5,11.1" fill={OUTLINE} />
      </>
    ),
  },
  {
    id: 'sop.adaptiveprune',
    label: 'Adaptive Prune',
    family: 'sop',
    description:
      'Three branching trees growing from left to right (red, yellow, blue) above a wide orange-to-red arrow pointing down-right.',
    types: ['adaptiveprune'],
    icons: ['sop_adaptiveprune'],
    refKey: 'SOP_adaptiveprune',
    render: () => (
      <>
        <g fill="none" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.5,12.5 V7.5 M5.5,9.8 L3.5,7.2 M5.5,8.8 L7.2,6.5" />
          <path d="M10.5,14 V8 M10.5,11 L8.5,8.2 M10.5,9.8 L12.5,7" />
          <path d="M16,15.5 V7.5 M16,12 L13.2,8.8 M16,10.2 L19.2,6.8 M17.6,8.5 L19.8,9.2" />
        </g>
        <path
          d="M5.5,12.5 V7.5 M5.5,9.8 L3.5,7.2 M5.5,8.8 L7.2,6.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M10.5,14 V8 M10.5,11 L8.5,8.2 M10.5,9.8 L12.5,7"
          fill="none"
          stroke="#f2c438"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M16,15.5 V7.5 M16,12 L13.2,8.8 M16,10.2 L19.2,6.8 M17.6,8.5 L19.8,9.2"
          fill="none"
          stroke="#3672c4"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <polygon
          points="3,12.5 16.5,17 17.5,15 21.5,19.5 15,21 15.8,19 2.5,14"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.findshortestpath',
    label: 'Find Shortest Path',
    family: 'sop',
    description: 'Folded three-panel green map with a dotted white route that ends at a dark X.',
    types: ['findshortestpath'],
    refKey: 'SOP_findshortestpath',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="3,6 9,4 9.5,18 3.5,20" fill="#b9d39a" />
          <polygon points="9,4 15,6 15.5,20 9.5,18" fill="#9cc27a" />
          <polygon points="15,6 21,4 21,18 15.5,20" fill="#b9d39a" />
        </g>
        <path
          d="M5 9C8 9 7 14 10.5 13.5C13.5 13 13 9 16.5 10"
          fill="none"
          stroke="#262626"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M5 9C8 9 7 14 10.5 13.5C13.5 13 13 9 16.5 10"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeDasharray="1.4 1.2"
        />
        <path d="M16.6 9.1L19.6 12.1M19.6 9.1L16.6 12.1" stroke="#262626" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.join',
    label: 'Join',
    family: 'sop',
    description: 'Two separate curve ends linked by a red dashed bridge above a single continuous joined S-curve.',
    types: ['join'],
    icons: ['sop_join'],
    refKey: 'SOP_join',
    render: () => (
      <>
        <path
          d="M2.5,11.5 C4,8.2 5.8,6.5 8,6.3 M21.5,2.2 C20,5 18.2,6.1 16,6.3 M2.5,21.2 C7,9.8 16.5,21.8 21.5,12.5"
          fill="none"
          stroke="#262626"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M2.5,11.5 C4,8.2 5.8,6.5 8,6.3 M21.5,2.2 C20,5 18.2,6.1 16,6.3 M2.5,21.2 C7,9.8 16.5,21.8 21.5,12.5"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line x1="8.2" y1="6.3" x2="15.8" y2="6.3" stroke="#262626" strokeWidth="2.4" strokeDasharray="1.3 1.3" />
        <line x1="8.2" y1="6.3" x2="15.8" y2="6.3" stroke="#e03228" strokeWidth="1.3" strokeDasharray="1.3 1.3" />
        <circle cx="8" cy="6.3" r="1.4" fill="#e03228" stroke="#262626" strokeWidth="0.7" />
        <circle cx="16" cy="6.3" r="1.4" fill="#e03228" stroke="#262626" strokeWidth="0.7" />
      </>
    ),
  },
];
