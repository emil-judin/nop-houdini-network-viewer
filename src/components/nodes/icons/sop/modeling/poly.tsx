import React from 'react';
import { isoBoxFaces, type Pt, pts, quadGridPath, quadPt, r2 } from '../../geoHelpers';
import { CasedStroke, ShadedSphere, SPHERE_TONES } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

const OUTLINE = '#262626';

/**
 * Shared orange polygon sheet with optional interior grid and diagonal triangulation lines.
 */
const PolySheet: React.FC<{
  quad: readonly [Pt, Pt, Pt, Pt];
  nu?: number;
  nv?: number;
  diagonals?: boolean;
  fill?: string;
  gridStroke?: number;
}> = ({ quad, nu = 0, nv = 0, diagonals = false, fill = '#ee8624', gridStroke = 0.6 }) => {
  const diagParts: string[] = [];
  if (diagonals && nu > 0 && nv > 0) {
    for (let i = 0; i < nu; i += 1) {
      for (let j = 0; j < nv; j += 1) {
        const tl = quadPt(quad, i / nu, j / nv);
        const br = quadPt(quad, (i + 1) / nu, (j + 1) / nv);
        diagParts.push(`M${pts([tl])} L${pts([br])}`);
      }
    }
  }
  return (
    <>
      <polygon points={pts(quad)} fill={fill} stroke={OUTLINE} strokeWidth="1.1" strokeLinejoin="round" />
      {nu > 1 || nv > 1 ? (
        <path
          d={quadGridPath(quad, nu, nv)}
          fill="none"
          stroke={OUTLINE}
          strokeWidth={String(gridStroke)}
          strokeLinecap="round"
        />
      ) : null}
      {diagParts.length > 0 ? (
        <path
          d={diagParts.join(' ')}
          fill="none"
          stroke={OUTLINE}
          strokeWidth={String(gridStroke)}
          strokeLinecap="round"
        />
      ) : null}
    </>
  );
};

/**
 * Shared red-handled scissors centered on the blade pivot at `(0, 0)`, blades pointing `+X`.
 */
const PolyScissors: React.FC<{ transform?: string }> = ({ transform }) => (
  <g transform={transform}>
    {/* Back blade (angled up-right, straight inner cutting edge) */}
    <path
      d="M-1.5,-1.65 L4.8,-2.45 L8.0,-2.45 L-1.2,0.6 Z"
      fill="#eef2f7"
      stroke={OUTLINE}
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
    {/* Front blade (angled down-right, straight inner cutting edge) */}
    <path
      d="M-1.5,1.65 L4.8,2.45 L8.0,2.45 L-1.2,-0.6 Z"
      fill="#ffffff"
      stroke={OUTLINE}
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
    {/* Handle stems + red finger loops */}
    <path d="M-1.5,0.6 L-3.6,1.6" stroke={OUTLINE} strokeWidth="1.9" strokeLinecap="round" />
    <path d="M-1.5,0.6 L-3.6,1.6" stroke="#e03228" strokeWidth="0.95" strokeLinecap="round" />
    <ellipse
      cx="-5.4"
      cy="2.2"
      rx="2.2"
      ry="1.45"
      transform="rotate(-14 -5.4 2.2)"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="2.1"
    />
    <ellipse
      cx="-5.4"
      cy="2.2"
      rx="2.2"
      ry="1.45"
      transform="rotate(-14 -5.4 2.2)"
      fill="none"
      stroke="#e03228"
      strokeWidth="1.05"
    />
    <path d="M-1.5,-0.6 L-3.6,-1.6" stroke={OUTLINE} strokeWidth="1.9" strokeLinecap="round" />
    <path d="M-1.5,-0.6 L-3.6,-1.6" stroke="#e03228" strokeWidth="0.95" strokeLinecap="round" />
    <ellipse
      cx="-5.4"
      cy="-2.2"
      rx="2.2"
      ry="1.45"
      transform="rotate(14 -5.4 -2.2)"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="2.1"
    />
    <ellipse
      cx="-5.4"
      cy="-2.2"
      rx="2.2"
      ry="1.45"
      transform="rotate(14 -5.4 -2.2)"
      fill="none"
      stroke="#e03228"
      strokeWidth="1.05"
    />
    {/* Pivot screw */}
    <circle cx="0" cy="0" r="0.8" fill="#ffffff" stroke={OUTLINE} strokeWidth="0.7" />
  </g>
);

const POLYFILL_OUTER: readonly [Pt, Pt, Pt, Pt] = [
  [12, 4.2],
  [20.8, 12],
  [12, 19.8],
  [3.2, 12],
];

const POLYFILL_INNER: readonly [Pt, Pt, Pt, Pt] = [
  quadPt(POLYFILL_OUTER, 0.25, 0.25),
  quadPt(POLYFILL_OUTER, 0.75, 0.25),
  quadPt(POLYFILL_OUTER, 0.75, 0.75),
  quadPt(POLYFILL_OUTER, 0.25, 0.75),
];

const POLYSPLIT_SHEET: readonly [Pt, Pt, Pt, Pt] = [
  [12.2, 12.2],
  [21, 16],
  [12.2, 20.5],
  [3.5, 16],
];

const TILE_FACE: readonly [Pt, Pt, Pt, Pt] = [
  [5.8, 3.3],
  [16.2, 8.5],
  [16.2, 21.1],
  [5.8, 15.9],
];

/**
 * Polygon operators: building, cutting, filling and reducing polygon sheets.
 */
export const POLY_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.polybridge',
    label: 'PolyBridge',
    family: 'sop',
    description: 'Curved yellow bridge tube with blue end cuffs, upper-left highlight and dark open top-right rim.',
    types: ['polybridge'],
    icons: ['sop_polybridge'],
    refKey: 'SOP_polybridge',
    render: () => (
      <>
        {/* Bottom-left blue cuff */}
        <path
          d="M4.2,17.5 C4.2,15.0 4.8,12.5 5.9,10.3 L10.7,12.8 C9.9,14.5 9.6,16.2 9.6,18.0 C9.6,19.6 4.2,19.6 4.2,17.5 Z"
          fill="#3672c4"
          stroke={OUTLINE}
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        {/* Middle yellow bridge arch */}
        <path
          d="M5.9,10.3 C7.7,6.8 10.6,4.8 14.3,4.3 L15.4,9.6 C13.2,10.0 11.7,11.1 10.7,12.8 Z"
          fill="#f2c438"
          stroke={OUTLINE}
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        {/* Upper-left yellow highlight band */}
        <path d="M6.8,10.4 C8.4,7.5 10.8,5.7 13.8,5.2 L14.2,6.8 C11.8,7.3 9.8,8.7 8.4,11.2 Z" fill="#ffe47a" />
        {/* Bottom-left blue cuff highlight */}
        <path d="M5.1,16.4 C5.2,14.5 5.7,12.6 6.6,11.0 L7.8,11.6 C7.0,13.1 6.6,14.7 6.5,16.5 Z" fill="#8fc2ff" />
        {/* Top-right blue cuff */}
        <path
          d="M14.3,4.3 C15.8,4.0 17.5,4.1 19.0,4.5 L18.2,10.1 C17.2,9.7 16.3,9.5 15.4,9.6 Z"
          fill="#3672c4"
          stroke={OUTLINE}
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        {/* Top-right blue cuff highlight */}
        <path d="M14.7,5.1 C15.7,4.9 16.8,4.9 17.8,5.1 L17.5,6.4 C16.6,6.2 15.7,6.2 14.9,6.4 Z" fill="#8fc2ff" />
        {/* Top-right open elliptical end */}
        <ellipse
          cx="18.6"
          cy="7.3"
          rx="1.9"
          ry="2.85"
          transform="rotate(10 18.6 7.3)"
          fill="#3a3f47"
          stroke={OUTLINE}
          strokeWidth="1.1"
        />
        {/* Inner rim highlight on open end */}
        <ellipse
          cx="18.6"
          cy="7.3"
          rx="1.2"
          ry="2.0"
          transform="rotate(10 18.6 7.3)"
          fill="#2e5a9a"
          stroke="#8fc2ff"
          strokeWidth="0.65"
        />
        {/* Bottom-left end cap */}
        <ellipse cx="6.9" cy="17.8" rx="2.7" ry="1.65" fill="#3672c4" stroke={OUTLINE} strokeWidth="1.1" />
      </>
    ),
  },
  {
    id: 'sop.polycut',
    label: 'PolyCut',
    family: 'sop',
    description: 'Open red-handled scissors snipping the red middle section of a blue curved ribbon.',
    types: ['polycut'],
    icons: ['sop_polycut'],
    refKey: 'SOP_polycut',
    render: () => (
      <>
        {/* Blue start and end of the curve */}
        <CasedStroke d="M3.4,15.8 C5.4,15.8 6.8,14.5 8.2,13.0" color="#8fc2ff" width={2.1} casing={2.7} />
        <CasedStroke d="M15.4,8.2 C17.2,7.0 18.8,7.0 20.6,5.2" color="#8fc2ff" width={2.1} casing={2.7} />
        {/* Red middle cut section */}
        <CasedStroke d="M8.2,13.0 C10.4,10.8 13.0,9.8 15.4,8.2" color="#ff7066" width={2.1} casing={2.7} />
        <PolyScissors transform="translate(11.8, 12.0) rotate(-112) scale(1.12)" />
      </>
    ),
  },
  {
    id: 'sop.polyfill',
    label: 'PolyFill',
    family: 'sop',
    description: 'Tilted orange 4x4 polygon diamond with a dashed yellow filled patch in the center.',
    types: ['polyfill'],
    icons: ['sop_polyfill'],
    refKey: 'SOP_polyfill',
    render: () => (
      <>
        <PolySheet quad={POLYFILL_OUTER} nu={4} nv={4} />
        <polygon
          points={pts(POLYFILL_INNER)}
          fill="#ffe47a"
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeDasharray="1.7 1.1"
          strokeLinejoin="round"
        />
        <path d={quadGridPath(POLYFILL_INNER, 2, 2)} fill="none" stroke={OUTLINE} strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'sop.polypatch',
    label: 'PolyPatch',
    family: 'sop',
    description: 'Curved orange polygon ribbon with black vertical side edges and five red horizontal ribs.',
    types: ['polypatch'],
    icons: ['sop_polypatch'],
    refKey: 'SOP_polypatch',
    render: () => (
      <>
        {/* Orange ribbon body */}
        <path
          d="M5.5,4.2 L14.5,3.2 C11.8,8.5 11.8,14.2 18.2,18.2 L9.5,20.5 C3.8,15.5 3.2,9.5 5.5,4.2 Z"
          fill="#ee8624"
        />
        {/* Lit upper segment */}
        <path d="M5.5,4.2 L14.5,3.2 C13.6,5.0 13.0,6.6 12.7,8.1 L4.3,9.2 C4.5,7.4 4.9,5.7 5.5,4.2 Z" fill="#ffb066" />
        {/* Black vertical side rails */}
        <path
          d="M5.5,4.2 C3.2,9.5 3.8,15.5 9.5,20.5 M14.5,3.2 C11.8,8.5 11.8,14.2 18.2,18.2"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* All five red horizontal ribs drawn at equal thickness */}
        <path
          d="M5.5,4.2 L14.5,3.2 M4.3,9.2 L12.7,8.1 M4.3,12.8 L12.7,11.6 M5.8,16.5 L14.8,14.8 M9.5,20.5 L18.2,18.2"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.polyreduce',
    label: 'PolyReduce',
    family: 'sop',
    description: 'Red shaded sphere covered in a light triangular wireframe mesh except on the glossy upper-left.',
    types: ['polyreduce'],
    icons: ['sop_polyreduce', 'sop_polyreduce-2.0'],
    refKey: 'SOP_polyreduce',
    render: (uid) => (
      <>
        <ShadedSphere id={`${uid}-sphere`} cx={12} cy={12} r={9.1} tones={SPHERE_TONES.red} strokeWidth={1.15} />
        {/* Facet shading */}
        <polygon points="12.4,3.4 17.6,5.2 14.2,9.2" fill="#ff7066" fillOpacity="0.4" />
        <polygon points="15.0,12.5 20.5,10.2 19.6,15.8" fill="#a81f18" fillOpacity="0.65" />
        <polygon points="10.2,14.0 15.0,12.5 13.8,20.4" fill="#a81f18" fillOpacity="0.55" />
        {/* Extended wireframe mesh covering right, bottom, and center-top */}
        <path
          d="M12.4,3.4 L17.6,5.2 L20.5,10.2 L19.6,15.8 L15.5,20.1 L9.8,20.5 L5.4,17.2 L9.5,11.8 L12.4,3.4
             M12.4,3.4 L14.2,9.2 L17.6,5.2
             M9.5,11.8 L14.2,9.2 L15.0,12.5 L20.5,10.2
             M14.2,9.2 L20.5,10.2
             M9.5,11.8 L15.0,12.5 L10.2,14.0 L5.4,17.2
             M10.2,14.0 L9.8,20.5
             M10.2,14.0 L13.8,20.4 L15.0,12.5 L19.6,15.8
             M13.8,20.4 L15.5,20.1
             M15.0,12.5 L15.5,20.1"
          fill="none"
          stroke="#ffe0dc"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.polysplit',
    label: 'PolySplit',
    family: 'sop',
    description:
      '45-degree rotated orange polygon diamond on the ground being cut horizontally along a dashed line by side-view red-handled scissors.',
    types: ['polysplit'],
    icons: ['sop_polysplit', 'sop_polysplit-2.0'],
    refKey: 'SOP_polysplit',
    render: () => (
      <>
        <PolySheet quad={POLYSPLIT_SHEET} />
        <line
          x1="5.2"
          y1="16.2"
          x2="19.2"
          y2="16.2"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeDasharray="1.8 1.2"
          strokeLinecap="round"
        />
        <PolyScissors transform="translate(10.8, 10.4) rotate(0) scale(1.02)" />
      </>
    ),
  },
  {
    id: 'sop.tridivide',
    label: 'TriDivide',
    family: 'sop',
    description: 'Translucent three-tone orange subdivided pyramid triangle offset over a light grey triangle.',
    types: ['tridivide'],
    icons: ['sop_tridivide'],
    refKey: 'SOP_tridivide',
    render: () => (
      <>
        {/* Underlying grey triangle, offset down-right so edges do not overlap */}
        <polygon
          points="13.0,3.6 3.5,15.8 20.5,19.8"
          fill="#eef2f7"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Translucent orange subdivided faces offset slightly up-left */}
        <polygon
          points="11.6,4.0 4.8,14.5 11.6,10.6"
          fill="#ffb066"
          fillOpacity="0.82"
          stroke={OUTLINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon
          points="11.6,4.0 11.6,10.6 18.6,17.4"
          fill="#ee8624"
          fillOpacity="0.82"
          stroke={OUTLINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon
          points="4.8,14.5 18.6,17.4 11.6,10.6"
          fill="#f2c438"
          fillOpacity="0.82"
          stroke={OUTLINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.triangulate2d',
    label: 'Triangulate2D',
    family: 'sop',
    description: 'Slightly tilted 3x3 orange polygon grid with every cell split diagonally into triangles.',
    types: ['triangulate2d'],
    icons: ['sop_triangulate2d', 'sop_triangulate2d-2.0', 'sop_triangulate2d-3.0'],
    refKey: 'SOP_triangulate2d',
    render: () => (
      <PolySheet
        quad={[
          [4.2, 4.5],
          [19.2, 5.2],
          [19.8, 19.2],
          [4.8, 18.6],
        ]}
        nu={3}
        nv={3}
        diagonals
        fill="#ffb066"
        gridStroke={0.6}
      />
    ),
  },
  {
    id: 'sop.unsubdivide',
    label: 'Unsubdivide',
    family: 'sop',
    description: 'Red wireframe sphere enclosed inside a translucent three-tone grey isometric cube.',
    types: ['unsubdivide'],
    icons: ['sop_unsubdivide'],
    refKey: 'SOP_unsubdivide',
    render: () => {
      const box = isoBoxFaces(12, 4.2, 7.6, 7.6);
      return (
        <>
          {/* Inner red wireframe sphere */}
          <circle cx="12" cy="11.8" r="5.0" fill="none" stroke="#e03228" strokeWidth="0.9" />
          <ellipse cx="12" cy="11.8" rx="5.0" ry="2.0" fill="none" stroke="#e03228" strokeWidth="0.8" />
          <ellipse cx="12" cy="11.8" rx="2.1" ry="5.0" fill="none" stroke="#e03228" strokeWidth="0.8" />
          {/* Outer translucent grey isometric cube */}
          <polygon
            points={pts(box.top)}
            fill="#eef2f7"
            fillOpacity="0.45"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          <polygon
            points={pts(box.left)}
            fill="#c0c7d1"
            fillOpacity="0.45"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          <polygon
            points={pts(box.right)}
            fill="#89929e"
            fillOpacity="0.45"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          <polygon
            points={pts([box.top[0], box.top[1], box.right[2], box.right[3], box.left[3], box.top[3]])}
            fill="none"
            stroke={OUTLINE}
            strokeWidth="1.15"
            strokeLinejoin="round"
          />
        </>
      );
    },
  },
  {
    id: 'sop.polybevel',
    label: 'PolyBevel',
    family: 'sop',
    description:
      'Yellow cube with chamfered edges: lighter bevel strips along the front edges and a rounded silhouette.',
    types: ['polybevel'],
    refKey: 'SOP_polybevel-3.0',
    render: () => (
      <>
        <polygon points="12,3 19,6.5 12,10 5,6.5" fill="#ffe47a" />
        <polygon points="5,6.5 12,10 12,11.8 4,7.8" fill="#fff3b8" />
        <polygon points="19,6.5 12,10 12,11.8 20,7.8" fill="#f7d35a" />
        <polygon points="4,7.8 12,11.8 12,20.5 4,16.5" fill="#f2c438" />
        <polygon points="20,7.8 12,11.8 12,20.5 20,16.5" fill="#d49a18" />
        <polygon points="10.6,11.1 12,11.8 12,20.5 10.6,19.8" fill="#f9dc6e" />
        {/* Bevel seams */}
        <path
          d="M5 6.5L12 10L19 6.5M12 10V11.8M4 7.8L12 11.8L20 7.8M10.6 11.1V19.8M12 11.8V20.5"
          fill="none"
          stroke="#8a6a10"
          strokeWidth="0.7"
        />
        {/* Silhouette */}
        <path
          d="M12 3L19 6.5L20 7.8V16.5L12 20.5L4 16.5V7.8L5 6.5Z"
          fill="none"
          stroke="#262626"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.polyextrude',
    label: 'PolyExtrude',
    family: 'sop',
    description:
      'Yellow cube whose right face is pushed outward into a prism, with a red arrow showing the extrusion direction.',
    types: ['polyextrude'],
    refKey: 'SOP_polyextrude-2.0',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="10,3 17,6.5 10,10 3,6.5" fill="#ffe47a" />
          <polygon points="3,6.5 10,10 10,18.5 3,15" fill="#f2c438" />
          <polygon points="17,6.5 20,8 13,11.5 10,10" fill="#fff0a0" />
          <polygon points="10,10 13,11.5 13,20 10,18.5" fill="#e8b52c" />
          <polygon points="20,8 13,11.5 13,20 20,16.5" fill="#d49a18" />
        </g>
        <line x1="16.8" y1="14.4" x2="19.7" y2="18.7" stroke="#262626" strokeWidth="3.4" strokeLinecap="round" />
        <line x1="16.8" y1="14.4" x2="19.7" y2="18.7" stroke="#e03228" strokeWidth="2" strokeLinecap="round" />
        <polygon
          points="21.8,21.3 21.4,17.3 18,20.1"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.polyframe',
    label: 'PolyFrame',
    family: 'sop',
    description: 'Orange triangle with short green, red and blue tangent-frame axes at its corners.',
    types: ['polyframe'],
    refKey: 'SOP_polyframe',
    render: () => (
      <>
        <polygon points="12,5 20,17 5,19" fill="#ee8624" stroke="#262626" strokeWidth="1.2" />
        <path d="M12,5V1.5M12,5L15.5,5" stroke="#52d638" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5,19V15M5,19L2,21" stroke="#e03828" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20,17L22.5,14.5M20,17V20.5" stroke="#3888f0" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.polypath',
    label: 'PolyPath',
    family: 'sop',
    description: 'Red curve and blue curve joined at a yellow point, with small black vertex squares along both.',
    types: ['polypath'],
    refKey: 'SOP_polypath',
    render: () => (
      <>
        <path d="M4.5 17C2.5 11 6 4 10 3.5" fill="none" stroke="#e03228" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M11.3 9.8C16 7 19.5 5.5 18.5 11C17.5 15 13.5 16 16 21"
          fill="none"
          stroke="#2e74c4"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M10 3.5C11.5 5 11.6 7.5 11.3 9.8" fill="none" stroke="#e03228" strokeWidth="2" strokeLinecap="round" />
        <circle cx="11.3" cy="9.8" r="2" fill="#ffe030" stroke="#262626" strokeWidth="0.9" />
        {[
          [4.5, 17],
          [3.6, 10.5],
          [6.5, 5.2],
          [10, 3.5],
          [18.6, 8.3],
          [17.7, 14],
          [16, 21],
        ].map(([cx, cy]) => (
          <rect
            key={`${cx}-${cy}`}
            x={cx - 1.3}
            y={cy - 1.3}
            width="2.6"
            height="2.6"
            fill="#1e1e1e"
            stroke="#f2f4f7"
            strokeWidth="0.7"
          />
        ))}
      </>
    ),
  },
  {
    id: 'sop.polydoctor',
    label: 'PolyDoctor',
    family: 'sop',
    description: 'Medical stethoscope with metallic earpieces, dark tubing, and a round silver chestpiece.',
    types: ['polydoctor'],
    icons: ['sop_polydoctor'],
    refKey: 'SOP_polydoctor',
    render: () => (
      <>
        <ellipse cx="17.2" cy="19.6" rx="4.4" ry="2.1" fill="#dedede" stroke="#2e3436" strokeWidth="0.85" />
        <ellipse cx="17.2" cy="19.3" rx="2.8" ry="1.2" fill="#ababab" stroke="#555753" strokeWidth="0.55" />
        <path
          d="M4.2,3.4 C1.8,6.2 3,12.2 6.8,14 C10.6,12.2 12.2,6.5 9.8,3.8"
          fill="none"
          stroke="#8c8c8c"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M6.8,14 C6.8,18.2 9.5,19.8 11.8,17.2 C14,14.8 16.5,14.5 17.2,18.2"
          fill="none"
          stroke="#262626"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <ellipse
          cx="4.4"
          cy="3"
          rx="1.4"
          ry="0.9"
          transform="rotate(-30 4.4 3)"
          fill="#ededed"
          stroke="#2e3436"
          strokeWidth="0.65"
        />
        <ellipse
          cx="9.6"
          cy="3.4"
          rx="1.4"
          ry="0.9"
          transform="rotate(30 9.6 3.4)"
          fill="#ededed"
          stroke="#2e3436"
          strokeWidth="0.65"
        />
      </>
    ),
  },
  {
    id: 'sop.polyexpand2d',
    label: 'PolyExpand2D',
    family: 'sop',
    description: 'Expanded yellow five-pointed star surrounding an inner dashed white star.',
    types: ['polyexpand2d'],
    icons: ['sop_polyexpand2d'],
    refKey: 'SOP_polyexpand2d',
    render: () => (
      <>
        <polygon
          points="10.2,1.8 14.2,8.2 21.6,7.4 16.4,13.2 19.6,20.2 12,16.8 5.8,22 6.8,14.2 1.2,10.2 8.6,8.6"
          fill="#fce94f"
          stroke="#c4a000"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polygon
          points="10.8,6.8 12.8,10 16.5,9.6 13.8,12.5 15.4,16 11.6,14.2 8.5,16.8 9,13 6.2,11 9.8,10.2"
          fill="#eeeeec"
          stroke="#2e3436"
          strokeWidth="0.85"
          strokeDasharray="1.4 0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.polyhinge',
    label: 'PolyHinge',
    family: 'sop',
    description: 'Silver hinged polygon arm pivoting upward from a dark hinge pin with curved motion lines.',
    types: ['polyhinge'],
    icons: ['sop_polyhinge'],
    refKey: 'SOP_polyhinge',
    render: () => (
      <>
        <ellipse cx="12.5" cy="21" rx="8.5" ry="1.6" fill="#262626" fillOpacity="0.25" />
        <circle cx="7.2" cy="9.2" r="4.6" fill="none" stroke="#f57f7f" strokeWidth="0.65" strokeDasharray="1.2 1" />
        <path
          d="M19.5,6.8 L6.8,8.5 C5.4,8.8 5,10 5.8,11.2 L12.8,20.2 L16,18 L9.8,10.4 L19.8,9.2 Z"
          fill="#d3d7cf"
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <circle cx="7.4" cy="9.6" r="1.3" fill="#fce94f" stroke="#2e3436" strokeWidth="0.7" />
        <ellipse cx="19.6" cy="8" rx="1" ry="1.5" fill="#2e3436" />
        <path
          d="M13.5,2.4 C16.2,3 18.2,4.8 18.8,6.6 M13.2,4.2 C15.2,4.8 16.5,5.8 17,7"
          fill="none"
          stroke="#888a85"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.polyloft',
    label: 'PolyLoft',
    family: 'sop',
    description: 'Two matching orange two-quad polygon strips bridged by a yellow lofted quad.',
    types: ['polyloft'],
    icons: ['sop_polyloft'],
    refKey: 'SOP_polyloft',
    render: () => (
      <g transform="translate(12, 12.5) scale(0.94) translate(-12, -12.5)">
        <polygon
          points="4.8,12.2 10.2,6.4 18.4,12.8 13.2,18.6"
          fill="#fce94f"
          stroke="#8b3b00"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon
          points="1.6,15.2 4.8,12.2 13.2,18.6 9.6,21.8"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <line x1="5.6" y1="18.5" x2="9" y2="15.4" stroke="#8b3b00" strokeWidth="0.7" />
        <polygon
          points="10.2,6.4 13.8,3.2 22,9.6 18.4,12.8"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <line x1="14.2" y1="9.6" x2="17.8" y2="6.4" stroke="#8b3b00" strokeWidth="0.7" />
      </g>
    ),
  },
  {
    id: 'sop.polysoup',
    label: 'PolySoup',
    family: 'sop',
    description: 'Red soup bowl with a silver spoon holding tan broth and floating polygon primitives.',
    types: ['polysoup'],
    icons: ['sop_polysoup'],
    refKey: 'SOP_polysoup',
    render: () => (
      <>
        <ellipse cx="12" cy="18.2" rx="9.2" ry="3.8" fill="#262626" fillOpacity="0.28" />
        <path
          d="M2.2,11.2 C2.2,16.2 6,21.4 11.8,21.4 C17.6,21.4 21.4,16.2 21.4,11.2 Z"
          fill="#cc0000"
          stroke="#640000"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <ellipse cx="11.8" cy="11.2" rx="9.6" ry="3.8" fill="#eeeeec" stroke="#860000" strokeWidth="0.85" />
        <ellipse cx="11.8" cy="11.4" rx="8.2" ry="2.9" fill="#c17d11" />
        <path
          d="M14.2,10.2 L21.2,2.2 C21.8,1.8 22.4,2.4 21.8,3.2 L15.6,11 Z"
          fill="#d3d7cf"
          stroke="#555753"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <rect x="7" y="9.8" width="2.6" height="2.2" rx="0.3" fill="#f1d3a4" stroke="#8f5902" strokeWidth="0.55" />
        <circle cx="12" cy="11.6" r="1.4" fill="#f1d3a4" stroke="#8f5902" strokeWidth="0.55" />
        <circle cx="15.2" cy="10.8" r="1.1" fill="#8ae234" stroke="#346604" strokeWidth="0.5" />
        <circle cx="9.8" cy="10.4" r="0.9" fill="#8ae234" stroke="#346604" strokeWidth="0.5" />
      </>
    ),
  },
  {
    id: 'sop.polyspline',
    label: 'PolySpline',
    family: 'sop',
    description: 'Control polyline with dark-outlined pale square vertices overlaid by a smooth dashed spline curve.',
    types: ['polyspline'],
    icons: ['sop_polyspline'],
    refKey: 'SOP_polyspline',
    render: () => (
      <>
        <path
          d="M2.2,16.2 C3,12.2 4.8,8.5 7.4,8.8 C14.5,9.6 10.8,19.2 18.2,20 C20.8,20.2 21.6,18.2 21.8,16.2"
          fill="none"
          stroke="#262626"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="1.8 1.5"
        />
        <path
          d="M2.2,16.2 C3,12.2 4.8,8.5 7.4,8.8 C14.5,9.6 10.8,19.2 18.2,20 C20.8,20.2 21.6,18.2 21.8,16.2"
          fill="none"
          stroke="#8fc2ff"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="1.8 1.5"
        />
        <polyline
          points="2.2,16.2 7.4,8.8 18.2,20 21.8,16.2"
          fill="none"
          stroke="#262626"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polyline
          points="2.2,16.2 7.4,8.8 18.2,20 21.8,16.2"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="1.15"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <g fill="#eef2f7" stroke="#262626" strokeWidth="0.85">
          <rect x="1.2" y="15.2" width="2" height="2" />
          <rect x="6.4" y="7.8" width="2" height="2" />
          <rect x="17.2" y="19" width="2" height="2" />
          <rect x="20.8" y="15.2" width="2" height="2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.polywire',
    label: 'PolyWire',
    family: 'sop',
    description: 'Three blue tubular polygon branches meeting at a red central Y-junction.',
    types: ['polywire'],
    icons: ['sop_polywire'],
    refKey: 'SOP_polywire',
    render: () => (
      <>
        <g stroke="#17314c" strokeWidth="0.85" strokeLinejoin="round">
          <path d="M6.2,3 L10.2,2.2 L12,9.2 L8,10 Z" fill="#709ec3" />
          <ellipse cx="8.2" cy="2.6" rx="2.1" ry="0.9" transform="rotate(-12 8.2 2.6)" fill="#d2deec" />
          <path d="M13.2,8.8 L19.4,5.4 L21.4,8.8 L14.6,12.4 Z" fill="#3778b3" />
          <ellipse cx="20.4" cy="7.1" rx="1" ry="1.9" transform="rotate(-28 20.4 7.1)" fill="#3065a0" />
          <path d="M7.6,12.5 L11.4,14.4 L9,21.4 L4.4,19.4 Z" fill="#3778b3" />
          <ellipse cx="6.7" cy="20.4" rx="2.4" ry="1.1" transform="rotate(22 6.7 20.4)" fill="#224987" />
        </g>
        <path
          d="M7.6,9.2 C9.5,8.4 12,8.2 13.8,9 C14.8,10.2 14.8,11.8 14.2,12.8 C12.6,14 10.2,14.4 7.4,12.8 C6.8,11.5 6.8,10.2 7.6,9.2 Z"
          fill="#ed2728"
          stroke="#a40e0a"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <ellipse cx="10.4" cy="10.8" rx="1.6" ry="1" fill="#f77373" />
      </>
    ),
  },
  {
    id: 'sop.add',
    label: 'Add',
    family: 'sop',
    description: 'Red S-curve wave with five dark square point markers with white rims placed along it.',
    types: ['add'],
    icons: ['sop_add'],
    refKey: 'SOP_add',
    render: () => (
      <>
        <path
          d="M3.5,14.5 C6,6.5 10.5,6.5 13,12 C15.5,17.5 18.5,17.5 20.5,13"
          fill="none"
          stroke="#262626"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M3.5,14.5 C6,6.5 10.5,6.5 13,12 C15.5,17.5 18.5,17.5 20.5,13"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <g fill="#262626" stroke="#f2f4f7" strokeWidth="0.9">
          <rect x="2" y="13" width="3" height="3" />
          <rect x="6.5" y="7" width="3" height="3" />
          <rect x="11.5" y="10.2" width="3" height="3" />
          <rect x="15.5" y="15" width="3" height="3" />
          <rect x="19" y="11.5" width="3" height="3" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.clean',
    label: 'Clean',
    family: 'sop',
    description: 'Diagonal yellow straw broom with a wooden handle and a red binding band.',
    types: ['clean'],
    icons: ['sop_clean'],
    refKey: 'SOP_clean',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="4.5,4.5 6.5,3.2 11.5,10.2 9.5,11.5" fill="#c89a5a" />
        <path
          d="M8.2,11.8 L12.5,9 C16.5,11.5 19.5,14.5 20.5,17 C17.5,19.5 14.2,20.8 11,20.8 C9.8,17.5 9,14.5 8.2,11.8 Z"
          fill="#ffe47a"
        />
        <polygon points="7.8,11.2 12.2,8.4 13.2,9.8 8.8,12.6" fill="#e03228" />
        <path d="M11.5,13 L14.5,19.5 M13.5,11.8 L17.5,18" stroke="#d49a18" strokeWidth="0.9" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'sop.convert',
    label: 'Convert',
    family: 'sop',
    description: 'Curved patch split by a red line: smooth grey on the left, orange wireframe quads on the right.',
    types: ['convert'],
    refKey: 'SOP_convert',
    render: () => (
      <>
        <path d="M4,7 Q8,5 12,7 L12,18 Q8,16 4,18 Z" fill="#b8c0cc" stroke="#222" strokeWidth="1.2" />
        <path d="M12,7 Q16,9 20,6 L20,17 Q16,20 12,18 Z" fill="#ee8624" stroke="#222" strokeWidth="1.2" />
        <line x1="16" y1="7.5" x2="16" y2="18.5" stroke="#222" strokeWidth="0.9" />
        <line x1="12" y1="12.5" x2="20" y2="11.5" stroke="#222" strokeWidth="0.9" />
        <line x1="12" y1="3" x2="12" y2="21" stroke="#e03228" strokeWidth="1.8" />
      </>
    ),
  },
  {
    id: 'sop.dissolve',
    label: 'Dissolve',
    family: 'sop',
    description:
      'Orange perspective quad grid with three solid inner half-edges and the fourth dissolved into a dashed line.',
    types: ['dissolve'],
    icons: ['sop_dissolve', 'sop_dissolve-2.0'],
    refKey: 'SOP_dissolve',
    render: () => (
      <>
        <polygon
          points="13.2,4.2 21.5,11.2 10.8,20 2.5,13"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <polygon points="13.1,5.3 20.2,11.3 10.9,18.9 3.8,12.9" fill="none" stroke="#ffb066" strokeWidth="0.7" />
        <path
          d="M6.6,16.5 L17.4,7.7 M8,8.5 L12,12.1"
          fill="none"
          stroke="#262626"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line
          x1="12"
          y1="12.1"
          x2="16.2"
          y2="15.6"
          stroke="#262626"
          strokeWidth="1"
          strokeDasharray="1.2 1.2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.divide',
    label: 'Divide',
    family: 'sop',
    description: 'Translucent grey cube with red triangulation lines crossing its faces.',
    types: ['divide'],
    refKey: 'SOP_divide',
    render: () => (
      <>
        <polygon
          points="12,3 20,7 20,16.5 12,20.5 4,16.5 4,7"
          fill="#9aa2ae"
          fillOpacity="0.65"
          stroke="#333333"
          strokeWidth="1.3"
        />
        <line x1="12" y1="3" x2="12" y2="20.5" stroke="#d9382e" strokeWidth="1.1" />
        <line x1="4" y1="7" x2="20" y2="7" stroke="#d9382e" strokeWidth="1.1" />
        <line x1="4" y1="7" x2="12" y2="20.5" stroke="#d9382e" strokeWidth="1.1" />
        <line x1="20" y1="7" x2="12" y2="20.5" stroke="#d9382e" strokeWidth="1.1" />
        <line x1="12" y1="3" x2="4" y2="16.5" stroke="#d9382e" strokeWidth="1.1" />
        <line x1="12" y1="3" x2="20" y2="16.5" stroke="#d9382e" strokeWidth="1.1" />
      </>
    ),
  },
  {
    id: 'sop.extrude',
    label: 'Extrude - Old',
    family: 'sop',
    description:
      '3D extruded letter T with an orange front face, light grey side walls and a red arrow pointing down-left.',
    types: ['extrude'],
    icons: ['sop_extrude'],
    refKey: 'SOP_extrude',
    render: () => (
      <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
        {/* Stem side wall (drawn first so left arm overlaps cleanly) */}
        <polygon points="8.5,9.5 14,12 14,20.5 8.5,16.2" fill="#b4bcc8" />
        {/* Top and left-arm extruded walls of T */}
        <polygon points="4.5,5.2 13.8,2.5 20.5,7.2 11.2,9.8" fill="#eef2f7" />
        <polygon points="4.5,5.2 11.2,9.8 11.2,12.8 4.5,8" fill="#c9d0da" />
        {/* Orange front T face */}
        <polygon points="11.2,9.8 20.5,7.2 20.5,10.2 17,11.2 17,19.6 14,20.5 14,12 11.2,12.8" fill="#ee8624" />
        {/* Red arrow pointing down-left */}
        <polygon points="5.8,14.5 9.2,17 10.6,15.8 9.8,20.2 5,19.8 6.4,18.6 3,16" fill="#e03228" />
      </g>
    ),
  },
  {
    id: 'sop.facet',
    label: 'Facet',
    family: 'sop',
    description:
      'Geodesic sphere made of flat triangular facets: grey shades on the upper half, orange shades on the lower half.',
    types: ['facet'],
    refKey: 'SOP_facet',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-ball`}>
            <circle cx="12" cy="12" r="8.6" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-ball)`} stroke="#262626" strokeWidth="0.7" strokeLinejoin="round">
          {/* Grey upper facets */}
          <polygon points="12,2 5,7 12,8" fill="#ffffff" />
          <polygon points="12,2 12,8 19,7" fill="#c9d0da" />
          <polygon points="12,2 1,8 5,7" fill="#9aa2ae" />
          <polygon points="12,2 19,7 23,8" fill="#6f7782" />
          <polygon points="1,8 5,7 2,12.5" fill="#7a828e" />
          <polygon points="5,7 2,12.5 8.5,12.5" fill="#b4bcc8" />
          <polygon points="5,7 12,8 8.5,12.5" fill="#eef2f7" />
          <polygon points="12,8 8.5,12.5 15.5,12.5" fill="#8a929e" />
          <polygon points="12,8 19,7 15.5,12.5" fill="#dfe4ea" />
          <polygon points="19,7 15.5,12.5 22,12.5" fill="#6f7782" />
          <polygon points="19,7 23,8 22,12.5" fill="#5a616b" />
          {/* Orange lower facets */}
          <polygon points="2,12.5 8.5,12.5 3,18" fill="#f3a24e" />
          <polygon points="8.5,12.5 3,18 12,17.5" fill="#ee8624" />
          <polygon points="8.5,12.5 15.5,12.5 12,17.5" fill="#f8b562" />
          <polygon points="15.5,12.5 12,17.5 21,18" fill="#d9701a" />
          <polygon points="15.5,12.5 22,12.5 21,18" fill="#c35f12" />
          <polygon points="3,18 12,17.5 12,23" fill="#e07a1e" />
          <polygon points="12,17.5 21,18 12,23" fill="#c96614" />
        </g>
        <circle cx="12" cy="12" r="8.6" fill="none" stroke="#262626" strokeWidth="1.3" />
      </>
    ),
  },
  {
    id: 'sop.fuse',
    label: 'Fuse',
    family: 'sop',
    description: 'Two red arrows pointing at each other above two dark line ends joined by red welded points.',
    types: ['fuse'],
    refKey: 'SOP_fuse-2.0',
    render: () => (
      <>
        <polygon
          points="2.5,5 7,5 7,3 11,6.5 7,10 7,8 2.5,8"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="21.5,5 17,5 17,3 13,6.5 17,10 17,8 21.5,8"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 19C3 16.5 5 15.5 8.5 15.5M21.5 19C21 16.5 19 15.5 15.5 15.5"
          fill="none"
          stroke="#262626"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M8.5 15.5H15.5" stroke="#f08a80" strokeWidth="1.6" />
        <rect x="9.4" y="14.2" width="2.4" height="2.6" fill="#e03228" stroke="#262626" strokeWidth="0.8" />
        <rect x="12.2" y="14.2" width="2.4" height="2.6" fill="#e03228" stroke="#262626" strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'sop.hole',
    label: 'Hole',
    family: 'sop',
    description: 'Elliptical hole sunk into the surface with a light grey inner wall and dark bottom.',
    types: ['hole'],
    icons: ['sop_hole'],
    refKey: 'SOP_hole',
    render: () => (
      <g stroke="#262626" strokeWidth="1.2">
        <ellipse cx="12" cy="12" rx="8.5" ry="4.8" fill="#3a3f47" />
        <path d="M3.5,12 A8.5,4.8 0 0,1 20.5,12 A8.5,3.6 0 0,0 3.5,12 Z" fill="#c0c7d1" />
      </g>
    ),
  },
  {
    id: 'sop.reverse',
    label: 'Reverse',
    family: 'sop',
    description: 'Orange diamond inside two white circular arrows pointing in opposite directions.',
    types: ['reverse'],
    refKey: 'SOP_reverse',
    render: () => (
      <>
        <polygon points="12,7 17,12 12,17 7,12" fill="#ee8624" stroke="#262626" strokeWidth="1.1" />
        <path
          d="M5,10 A7.5,7.5 0 0 1 18,7 M19,14 A7.5,7.5 0 0 1 6,17"
          fill="none"
          stroke="#f0f2f5"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <polygon points="19.5,9 15.5,7.5 18.5,4.5" fill="#f0f2f5" />
        <polygon points="4.5,15 8.5,16.5 5.5,19.5" fill="#f0f2f5" />
      </>
    ),
  },
  {
    id: 'sop.subdivide',
    label: 'Subdivide',
    family: 'sop',
    description: 'Smooth grey blob with subdivision mesh lines, inside a red box-shaped control cage.',
    types: ['subdivide'],
    refKey: 'SOP_subdivide',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-blob`} cx="38%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#6f7782" />
          </radialGradient>
        </defs>
        <path
          d="M5 11.5C5 7.5 19 7.5 19 11.5C19 16 15.5 18.5 12 18.5C8.5 18.5 5 16 5 11.5Z"
          fill={`url(#${uid}-blob)`}
          stroke="#262626"
          strokeWidth="1.1"
        />
        <path
          d="M5.3 12.5C9 14 15 14 18.7 12.5M12 8.5C10.8 11.5 10.8 15 12 18.5M8 9C7 11.8 7.5 15.5 9 17.6M16 9C17 11.8 16.5 15.5 15 17.6"
          fill="none"
          stroke="#5a616b"
          strokeWidth="0.7"
        />
        <path
          d="M3 8L12 3.5L21 8L12 12.5ZM3 8V16L12 20.5L21 16V8M12 12.5V20.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.splitpoints',
    label: 'Point Split',
    family: 'sop',
    description: 'Orange pyramid with its apex split open into separate yellow-green vertex points.',
    types: ['splitpoints'],
    icons: ['sop_splitpoints'],
    refKey: 'SOP_splitpoints',
    render: () => (
      <>
        <polygon
          points="2,15.5 11.8,11.2 22,15.5 12.2,21.8"
          fill="#ce5c00"
          stroke="#5f2a00"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2,15.5 10.2,5.2 11.2,11.8"
          fill="#fdbf64"
          stroke="#5f2a00"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="13.4,5 22,15.5 12.6,11.8"
          fill="#f57900"
          stroke="#5f2a00"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2,15.5 10.6,8.2 12.2,21.8"
          fill="#ffa54c"
          stroke="#5f2a00"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="13.2,8.2 22,15.5 12.2,21.8"
          fill="#e96712"
          stroke="#5f2a00"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <g fill="#dfeaa1" stroke="#5f2a00" strokeWidth="0.65">
          <circle cx="10.2" cy="4.8" r="1.2" />
          <circle cx="13.4" cy="4.8" r="1.2" />
          <circle cx="10.6" cy="7.8" r="1.2" />
          <circle cx="13.2" cy="7.8" r="1.2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.planarpatch',
    label: 'Planar Patch',
    family: 'sop',
    description: 'Rolled blue fabric bolt on a wooden dowel unrolling a rectangular planar cloth sheet.',
    types: ['planarpatch'],
    icons: ['sop_planarpatch'],
    refKey: 'SOP_planarpatch',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-pp-roll`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#98caff" />
            <stop offset="55%" stopColor="#6093c9" />
            <stop offset="100%" stopColor="#284e76" />
          </linearGradient>
        </defs>
        <polygon
          points="12,7 22,13.4 12.4,22 2.4,14.2"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="12,8 20.8,13.5 12.4,20.8 3.6,14"
          fill="none"
          stroke="#cadbed"
          strokeWidth="0.55"
          strokeDasharray="1.2 1"
        />
        <path
          d="M12.2,3.4 L14,2.2 C14.8,1.8 15.8,2.8 15.8,4 C15.8,4.6 15.5,5 15,5.4 L13.4,6.5 Z"
          fill="#eabb73"
          stroke="#563501"
          strokeWidth="0.7"
        />
        <path
          d="M2,10.2 L11.2,2.4 C12.4,1.8 14.4,3.8 14.4,6 C14.4,6.8 14,7.4 13.4,7.8 L5,14.8 Z"
          fill={`url(#${uid}-pp-roll)`}
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <ellipse cx="3.5" cy="12.5" rx="1.8" ry="2.4" fill="#9fbede" stroke="#204a87" strokeWidth="0.8" />
        <ellipse cx="3.5" cy="12.5" rx="0.7" ry="1" fill="#eabb73" stroke="#563501" strokeWidth="0.55" />
      </>
    ),
  },
  {
    id: 'sop.planarpatchfromcurves',
    label: 'Planar Patch from Curves',
    family: 'sop',
    description:
      'Rolled blue fabric bolt unrolling a planar cloth sheet featuring a dark-interior, red-rimmed 5-point star cutout.',
    types: ['planarpatchfromcurves'],
    icons: ['sop_planarpatchfromcurves'],
    refKey: 'SOP_planarpatchfromcurves',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ppc-roll`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8fc2ff" />
            <stop offset="55%" stopColor="#5aa2f2" />
            <stop offset="100%" stopColor="#2e74c4" />
          </linearGradient>
        </defs>
        <polygon
          points="12,6.4 21.8,13 12.2,21.6 2.4,13.6"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <polygon
          points="12.4,10 13.7,12.5 16.5,12.3 14.4,14.2 15.6,16.8 12.8,15.6 10.6,17.6 10.8,14.8 8.4,13.6 11.2,12.6"
          fill="#262626"
          stroke="#e03228"
          strokeWidth="0.75"
          strokeDasharray="1.4 0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="17.2,15.4 18.4,17.4 20.6,17.4 19,19 19.6,21.2 17.4,20.2 15.4,21.4 15.6,19.2 13.8,17.8 16,17.4"
          fill="#8fc2ff"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M12.2,2.8 L14,1.6 C14.8,1.2 15.8,2.2 15.8,3.4 C15.8,4 15.5,4.4 15,4.8 L13.4,5.9 Z"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <path
          d="M2,9.6 L11.2,1.8 C12.4,1.2 14.4,3.2 14.4,5.4 C14.4,6.2 14,6.8 13.4,7.2 L5,14.2 Z"
          fill={`url(#${uid}-ppc-roll)`}
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <ellipse cx="3.5" cy="11.9" rx="1.8" ry="2.4" fill="#8fc2ff" stroke="#262626" strokeWidth="0.85" />
        <ellipse cx="3.5" cy="11.9" rx="0.7" ry="1" fill="#f2c438" stroke="#262626" strokeWidth="0.65" />
      </>
    ),
  },
  {
    id: 'sop.planartiles',
    label: 'Planar Tiles',
    family: 'sop',
    description:
      'Isometric upright white ceramic tile with grey top-right slab thickness and a blue ornamental rosette medallion.',
    types: ['planartiles'],
    icons: ['sop_planartiles'],
    refKey: 'SOP_planartiles',
    render: () => {
      const dx = 1.5;
      const dy = -0.75;
      const [tl, tr, br] = TILE_FACE;
      const topSide: Pt[] = [tl, [tl[0] + dx, tl[1] + dy], [tr[0] + dx, tr[1] + dy], tr];
      const rightSide: Pt[] = [tr, [tr[0] + dx, tr[1] + dy], [br[0] + dx, br[1] + dy], br];

      // 4-petal blue rosette in tile plane
      const n = quadPt(TILE_FACE, 0.5, 0.22);
      const e = quadPt(TILE_FACE, 0.78, 0.5);
      const s = quadPt(TILE_FACE, 0.5, 0.78);
      const w = quadPt(TILE_FACE, 0.22, 0.5);
      const ne = quadPt(TILE_FACE, 0.66, 0.34);
      const se = quadPt(TILE_FACE, 0.66, 0.66);
      const sw = quadPt(TILE_FACE, 0.34, 0.66);
      const nw = quadPt(TILE_FACE, 0.34, 0.34);
      const ctr = quadPt(TILE_FACE, 0.5, 0.5);

      const cornerTL = [quadPt(TILE_FACE, 0.08, 0.08), quadPt(TILE_FACE, 0.24, 0.08), quadPt(TILE_FACE, 0.08, 0.24)];
      const cornerTR = [quadPt(TILE_FACE, 0.92, 0.08), quadPt(TILE_FACE, 0.76, 0.08), quadPt(TILE_FACE, 0.92, 0.24)];
      const cornerBR = [quadPt(TILE_FACE, 0.92, 0.92), quadPt(TILE_FACE, 0.76, 0.92), quadPt(TILE_FACE, 0.92, 0.76)];
      const cornerBL = [quadPt(TILE_FACE, 0.08, 0.92), quadPt(TILE_FACE, 0.24, 0.92), quadPt(TILE_FACE, 0.08, 0.76)];

      return (
        <>
          <polygon points={pts(topSide)} fill="#eef2f7" stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round" />
          <polygon points={pts(rightSide)} fill="#89929e" stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round" />
          <polygon points={pts(TILE_FACE)} fill="#f2f4f7" stroke={OUTLINE} strokeWidth="1.05" strokeLinejoin="round" />
          {/* Blue corner accents */}
          <polygon points={pts(cornerTL)} fill="#3672c4" />
          <polygon points={pts(cornerTR)} fill="#3672c4" />
          <polygon points={pts(cornerBR)} fill="#3672c4" />
          <polygon points={pts(cornerBL)} fill="#3672c4" />
          {/* Blue central rosette */}
          <polygon
            points={pts([n, ne, e, se, s, sw, w, nw])}
            fill="#3672c4"
            stroke={OUTLINE}
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
          <polygon
            points={pts([
              quadPt(TILE_FACE, 0.5, 0.35),
              quadPt(TILE_FACE, 0.65, 0.5),
              quadPt(TILE_FACE, 0.5, 0.65),
              quadPt(TILE_FACE, 0.35, 0.5),
            ])}
            fill="#8fc2ff"
            stroke="#3672c4"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
          <circle cx={r2(ctr[0])} cy={r2(ctr[1])} r="0.95" fill="#3672c4" />
        </>
      );
    },
  },
];
