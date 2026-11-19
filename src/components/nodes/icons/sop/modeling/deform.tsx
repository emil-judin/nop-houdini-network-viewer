import React from 'react';
import { arrowHead, ellipsePath, lerpPt, type Pt, pts, quadGridPath } from '../../geoHelpers';
import { CasedStroke, StraightArrow } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { CaptureArmBase } from '../kits/bone';

/**
 * The Deformers family.
 * Shared kits: `WireDeformSheet` (flat vs. wavy 2:1 sheet, orange rest curve, dotted drop lines
 * and cased red wire) and `DEFORM_DIAMOND` (shared 2:1 diamond footprint for surface deformers).
 */

const OUTLINE = '#262626';

const GREY_TOP = '#eef2f7';

const GREY_LEFT = '#c0c7d1';

const GREY_RIGHT = '#89929e';

const DARK_GREY = '#5a616b';

const WHITE = '#f2f4f7';

const ORANGE = '#ee8624';

const RED = '#e03228';

const RED_LIGHT = '#ff7066';

const RED_DARK = '#a81f18';

const YELLOW = '#f2c438';

const BLUE = '#3672c4';

const BLUE_MID = '#5aa2f2';

const BLUE_LIGHT = '#8fc2ff';

const BLUE_DARK = '#2e5a9a';

const GREEN = '#58c848';

const CAPTURE_ARM_PATH =
  'M18.4,2.1 L21.7,5.4 L16.5,11.1 L11.7,15.7 L10.7,19.8 L9.4,20.1 L9.5,16.7 L7.5,21.2 L6.0,20.5 L7.6,16.8 L4.7,19.9 L3.6,18.9 L6.6,15.8 L3.2,17.2 L2.6,15.8 L6.6,14.1 L3.8,13.5 L4.2,12.1 L8.6,12.7 L13.1,7.5 Z';

/** Shared 2:1 tilted sheet + orange rest curve + dotted drop lines + cased red wire above. */
const WireDeformSheet: React.FC<{ wavy: boolean }> = ({ wavy }) => {
  if (!wavy) {
    const restA: Pt = [6.8, 12.6];
    const restB: Pt = [16.8, 16.6];
    const wireA: Pt = [6.8, 5.2];
    const wireB: Pt = [16.8, 9.2];
    const dropTs = [0.06, 0.28, 0.5, 0.72, 0.94];
    const drops = dropTs
      .map((t) => {
        const top = lerpPt(wireA, wireB, t);
        const bot = lerpPt(restA, restB, t);
        return `M${pts([top])} L${pts([bot])}`;
      })
      .join(' ');

    return (
      <>
        <polygon
          points="2.5,14.8 11.8,10.2 21.5,14.2 12.2,18.8"
          fill={GREY_LEFT}
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        <path d={drops} fill="none" stroke={ORANGE} strokeWidth="0.9" strokeDasharray="1.1 1.1" />
        <path
          d={`M${pts([restA])} L${pts([restB])}`}
          fill="none"
          stroke={ORANGE}
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <CasedStroke d={`M${pts([wireA])} L${pts([wireB])}`} color={RED} width={1.3} />
      </>
    );
  }

  // Wavy deformed sheet: arched up in the middle, matching the arched red wire above.
  const dropPairs: ReadonlyArray<readonly [Pt, Pt]> = [
    [
      [6.2, 8.8],
      [6.2, 13.8],
    ],
    [
      [8.8, 6.2],
      [8.8, 11.5],
    ],
    [
      [11.8, 4.9],
      [11.8, 10.6],
    ],
    [
      [14.8, 5.8],
      [14.8, 11.6],
    ],
    [
      [17.4, 7.6],
      [17.4, 13.4],
    ],
  ];
  const drops = dropPairs.map(([a, b]) => `M${pts([a])} L${pts([b])}`).join(' ');

  return (
    <>
      {/* Deformed sheet */}
      <path
        d="M2.5,15.6 C6.5,15.2 8.2,10.2 12.2,10.2 C16.2,10.2 17.8,13.6 21.5,13.2 L12.5,18.8 C8.8,19.2 6.8,15.8 2.5,15.6 Z"
        fill={GREY_LEFT}
        stroke={OUTLINE}
        strokeWidth="1.0"
        strokeLinejoin="round"
      />
      {/* Highlighted crest on upper-left slope */}
      <path
        d="M5.2,14.6 C7.6,12.2 9.8,10.6 12.2,10.6 C14.5,10.6 16.2,12.2 18.2,13.2 C15.2,13.8 13.2,12.4 10.8,12.8 C8.5,13.2 6.8,14.4 5.2,14.6 Z"
        fill={GREY_TOP}
      />
      <path d={drops} fill="none" stroke={ORANGE} strokeWidth="0.9" strokeDasharray="1.1 1.1" />
      <path
        d="M5.8,14.2 C8.5,11.4 10.5,10.5 12.4,10.6 C14.6,10.7 16.4,12.6 18.2,13.6"
        fill="none"
        stroke={ORANGE}
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <CasedStroke d="M5.6,9.2 C8.4,6.4 10.2,4.8 12.2,4.9 C14.4,5.0 16.2,7.0 18.0,7.9" color={RED} width={1.3} />
    </>
  );
};

const FRACTAL_TILE: readonly [Pt, Pt, Pt, Pt] = [
  [12, 13.4],
  [20.5, 17.65],
  [12, 21.9],
  [3.5, 17.65],
];

// 4x4 displaced vertices (3x3 quads = 18 triangles) for the fractal terrain mesh
const F_GRID: readonly (readonly Pt[])[] = [
  [
    [12.0, 5.8],
    [14.9, 6.8],
    [18.1, 8.9],
    [21.2, 10.6],
  ],
  [
    [9.1, 6.6],
    [12.0, 5.2],
    [15.2, 9.0],
    [18.2, 12.0],
  ],
  [
    [5.9, 9.0],
    [9.0, 8.4],
    [12.2, 9.6],
    [15.1, 13.7],
  ],
  [
    [2.8, 10.6],
    [6.1, 12.2],
    [9.0, 12.8],
    [12.0, 15.6],
  ],
];

const FRACTAL_FILLS: readonly (readonly [string, string])[] = [
  ['#ffb066', '#ee8624'],
  ['#ee8624', '#c25e12'],
  ['#ee8624', '#c25e12'],
  ['#ffb066', '#ffb066'],
  ['#ffb066', '#ee8624'],
  ['#ee8624', '#c25e12'],
  ['#ffb066', '#ee8624'],
  ['#ffb066', '#ee8624'],
  ['#ee8624', '#c25e12'],
];

const FRACTAL_TRIS: readonly { pts: readonly [Pt, Pt, Pt]; fill: string }[] = (() => {
  const out: { pts: readonly [Pt, Pt, Pt]; fill: string }[] = [];
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      const [f0, f1] = FRACTAL_FILLS[r * 3 + c];
      const p00 = F_GRID[r][c];
      const p10 = F_GRID[r][c + 1];
      const p01 = F_GRID[r + 1][c];
      const p11 = F_GRID[r + 1][c + 1];
      out.push({ pts: [p00, p10, p11], fill: f1 });
      out.push({ pts: [p00, p11, p01], fill: f0 });
    }
  }
  return out;
})();

const FRACTAL_PERIMETER: readonly Pt[] = [
  F_GRID[0][0],
  F_GRID[0][1],
  F_GRID[0][2],
  F_GRID[0][3],
  F_GRID[1][3],
  F_GRID[2][3],
  F_GRID[3][3],
  F_GRID[3][2],
  F_GRID[3][1],
  F_GRID[3][0],
  F_GRID[2][0],
  F_GRID[1][0],
];

/** Generic head-and-torso silhouette (no real-person likeness) for Ray. */
const rayBustPath = (cx: number, cy: number, s: number): string => {
  const p = (dx: number, dy: number): string => `${(cx + dx * s).toFixed(2)},${(cy + dy * s).toFixed(2)}`;
  return (
    `M${p(-2.5, 4.2)} L${p(-2.0, 0.2)} C${p(-2.0, -1.1)} ${p(-1.2, -1.6)} ${p(0, -1.6)} ` +
    `C${p(1.2, -1.6)} ${p(2.0, -1.1)} ${p(2.0, 0.2)} L${p(2.5, 4.2)} Z`
  );
};

/**
 * Deformer operators: wires, paths, lattices, noise, sculpting and projection.
 */
export const DEFORM_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.pathdeform',
    label: 'Path Deform',
    family: 'sop',
    description:
      'S-curved 3D grey extruded block with vertical wall creases and a red S-curve path with three red control dots on its top face.',
    types: ['pathdeform'],
    refKey: 'SOP_pathdeform',
    render: () => (
      <>
        {/* Front/side extruded wall */}
        <path
          d="M2.6,13.2 C5.8,15.8 9.2,15.8 12.0,13.0 C14.8,10.2 18.0,10.2 21.4,11.8 L21.4,15.8 C18.0,14.2 14.8,14.2 12.0,17.0 C9.2,19.8 5.8,19.8 2.6,17.2 Z"
          fill={GREY_LEFT}
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Shadowed right bend of wall */}
        <path
          d="M12.0,13.0 C14.8,10.2 18.0,10.2 21.4,11.8 L21.4,15.8 C18.0,14.2 14.8,14.2 12.0,17.0 Z"
          fill={GREY_RIGHT}
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Top S-curved face */}
        <path
          d="M2.6,13.2 C5.8,15.8 9.2,15.8 12.0,13.0 C14.8,10.2 18.0,10.2 21.4,11.8 L19.0,8.2 C16.0,6.8 13.0,7.2 10.2,10.0 C7.6,12.6 5.2,12.4 2.6,9.8 Z"
          fill={GREY_TOP}
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Vertical segment creases on front wall */}
        <path
          d="M5.6,15.0 V18.8 M8.8,15.2 V19.0 M12.0,13.0 V17.0 M15.2,11.0 V15.0 M18.4,10.9 V14.9"
          fill="none"
          stroke={DARK_GREY}
          strokeWidth="0.7"
        />
        {/* Red S-curve path and control dots */}
        <path
          d="M3.2,11.5 C5.8,14.0 8.8,14.0 11.4,11.4 C14.0,8.8 17.0,8.6 20.0,10.0"
          fill="none"
          stroke={RED}
          strokeWidth="1.05"
          strokeLinecap="round"
        />
        {[
          [5.2, 13.0],
          [11.4, 11.4],
          [17.6, 9.3],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.05" fill={RED} stroke={OUTLINE} strokeWidth="0.6" />
        ))}
      </>
    ),
  },
  {
    id: 'sop.wire',
    label: 'Wire',
    family: 'sop',
    description: 'Curved blue tube sleeve slipped over a grey wire rod that protrudes from both ends.',
    types: ['wire'],
    refKey: 'SOP_wire',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-tube`} x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor={BLUE_LIGHT} />
            <stop offset="45%" stopColor={BLUE_MID} />
            <stop offset="100%" stopColor={BLUE} />
          </linearGradient>
        </defs>
        {/* Back-right protruding wire tip */}
        <CasedStroke d="M16.8,7.0 L21.4,5.4" color={GREY_TOP} width={1.1} />
        {/* Curved blue sleeve */}
        <path
          d="M5.2,13.2 C8.0,8.0 12.8,5.2 17.6,4.8 C18.8,4.8 19.4,6.2 18.8,7.6 C18.2,9.0 16.8,9.8 15.2,10.4 C12.4,11.4 10.4,13.8 9.2,17.0 C8.2,18.0 6.0,17.4 5.0,15.8 C4.4,14.8 4.6,14.0 5.2,13.2 Z"
          fill={`url(#${uid}-tube)`}
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Upper-left specular highlight along the sleeve */}
        <path
          d="M6.8,12.2 C9.2,8.4 12.8,6.2 16.6,5.8 C15.2,7.0 12.4,8.2 9.4,12.4 Z"
          fill={GREY_TOP}
          fillOpacity="0.65"
        />
        {/* Front-left sleeve opening */}
        <ellipse
          cx="6.8"
          cy="15.2"
          rx="1.8"
          ry="2.5"
          transform="rotate(-30 6.8 15.2)"
          fill={BLUE_DARK}
          stroke={BLUE_LIGHT}
          strokeWidth="0.6"
        />
        <ellipse
          cx="6.8"
          cy="15.2"
          rx="2.0"
          ry="2.7"
          transform="rotate(-30 6.8 15.2)"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="0.9"
        />
        {/* Front-left protruding wire rod */}
        <CasedStroke d="M6.8,15.2 L3.2,20.4" color={GREY_TOP} width={1.25} />
      </>
    ),
  },
  {
    id: 'sop.wireblend',
    label: 'Wire Blend',
    family: 'sop',
    description:
      'Fan of four grey curved strands at the bottom bending rightward beneath a bold red curved arrow across the top.',
    types: ['wireblend'],
    refKey: 'SOP_wireblend',
    render: () => {
      const tip: Pt = [21.2, 6.2];
      const from: Pt = [16.8, 4.4];
      const tri = arrowHead(tip, from, 4.2, 2.5);
      return (
        <>
          <CasedStroke d="M9.6,21.2 Q7.8,15.6 3.8,11.6" color={GREY_TOP} width={1.05} />
          <CasedStroke d="M11.2,21.2 Q10.6,15.2 8.4,10.8" color={GREY_TOP} width={1.05} />
          <CasedStroke d="M12.8,21.2 Q13.4,15.2 14.6,10.8" color={GREY_TOP} width={1.05} />
          <CasedStroke d="M14.4,21.2 Q16.2,15.6 19.6,11.8" color={GREY_TOP} width={1.05} />
          <CasedStroke d="M3.6,6.8 Q11.2,3.0 18.2,5.0" color={RED} width={1.7} />
          <polygon points={pts(tri)} fill={RED} stroke={OUTLINE} strokeWidth="0.95" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'sop.wirecapture',
    label: 'Wire Capture',
    family: 'sop',
    description:
      'Flat tilted grey sheet with an orange diagonal rest line, a straight red wire above, and orange dotted drop lines connecting them.',
    types: ['wirecapture'],
    refKey: 'SOP_wirecapture',
    render: () => <WireDeformSheet wavy={false} />,
  },
  {
    id: 'sop.wiredeform',
    label: 'Wire Deform',
    family: 'sop',
    description:
      'Arched deformed grey sheet with a wavy orange rest curve, a wavy red wire above, and orange dotted drop lines connecting them.',
    types: ['wiredeform'],
    refKey: 'SOP_wiredeform',
    render: () => <WireDeformSheet wavy={true} />,
  },
  {
    id: 'sop.curveanimate',
    label: 'Curve Animate',
    family: 'sop',
    description:
      'Flexed blue arm with green, yellow and red cased control rings around the upper arm, forearm and fist.',
    types: ['curveanimate'],
    refKey: 'SOP_curveanimate',
    render: () => (
      <>
        {/* Flexed blue arm silhouette */}
        <path
          d="M5.2,4.4 C7.4,4.2 8.6,6.2 9.0,9.2 C9.4,11.2 10.0,12.4 11.2,12.8 C12.4,12.2 13.8,10.6 14.8,9.2 C14.6,7.6 15.8,6.4 17.4,6.6 C19.0,6.8 19.8,8.2 19.2,9.8 C18.6,11.0 17.2,11.4 16.0,11.2 C14.8,13.8 12.8,17.2 9.8,17.4 C7.2,17.6 5.6,15.2 4.8,12.0 C4.0,8.8 3.6,5.2 5.2,4.4 Z"
          fill={BLUE}
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Upper-left bicep and forearm highlight (filled crescent, no un-cased stroke) */}
        <path
          d="M4.8,5.6 C6.0,5.4 6.6,7.4 7.0,10.2 C7.4,12.4 8.2,14.2 9.2,15.2 C7.4,15.4 5.8,13.4 5.2,10.6 C4.6,8.0 4.4,6.2 4.8,5.6 Z"
          fill={BLUE_LIGHT}
        />
        {/* Control rings (green upper arm, yellow forearm, red fist) */}
        <CasedStroke d="M4.2,9.2 A2.4,3.4 -20 1,0 8.8,7.6 A2.4,3.4 -20 1,0 4.2,9.2 Z" color={GREEN} width={1.0} />
        <CasedStroke d="M10.4,16.4 A2.6,3.2 42 1,0 14.6,12.2 A2.6,3.2 42 1,0 10.4,16.4 Z" color={YELLOW} width={1.0} />
        <CasedStroke d={ellipsePath(17.1, 8.8, 2.7, 2.7)} color={RED} width={1.0} />
      </>
    ),
  },
  {
    id: 'sop.surfacedeform',
    label: 'Surface Deform',
    family: 'sop',
    description:
      'Two smooth blue three-quarter cropped faces facing right with radial shading, brow and eye shadows, medium equal-sized green noses, a dotted green circle around the right nose, and a red transfer arrow pointing to the right nose.',
    types: ['surfacedeform'],
    refKey: 'SOP_surfacedeform',
    render: (uid) => {
      // Cropped 3/4 face from sop.toposlidebycurverefs (neck removed, chin closed)
      const renderCroppedFace = (tx: number, key: string) => (
        <g key={key} transform={`translate(${tx}, 3.0) scale(0.64, 0.85)`} strokeLinejoin="round">
          <path
            d="M9.0,17.7 C11.0,18.4 13.0,18.2 14.5,17.2 C16.3,16.5 17.5,15.0 17.7,13.5 L18.6,12.9 C19.0,12.5 18.8,11.7 17.9,10.9 L17.6,9.4 C17.7,5.2 15.2,2.4 11.7,2.4 C7.9,2.4 5.7,5.4 6.1,9.7 C6.4,13.3 7.6,16.0 9.0,17.7 Z"
            fill={`url(#${uid}-face)`}
            stroke={OUTLINE}
            strokeWidth="1.4"
          />
          {/* Subtle brow and eye shadow matching toposlidebycurverefs */}
          <path
            d="M13.3,8.6 Q15.0,8.2 16.4,8.9"
            fill="none"
            stroke={BLUE_DARK}
            strokeWidth="1.05"
            strokeLinecap="round"
          />
          <ellipse cx="14.9" cy="9.9" rx="1.05" ry="0.65" fill={BLUE_DARK} />
          {/* Medium equal-sized green nose */}
          <path
            d="M16.1,10.3 L19.9,12.5 L16.3,14.2 Z"
            fill={GREEN}
            stroke={OUTLINE}
            strokeWidth="1.15"
            strokeLinejoin="round"
          />
        </g>
      );

      return (
        <>
          <defs>
            <radialGradient id={`${uid}-face`} cx="35%" cy="30%" r="72%">
              <stop offset="0%" stopColor={BLUE_LIGHT} />
              <stop offset="55%" stopColor={BLUE_MID} />
              <stop offset="100%" stopColor={BLUE} />
            </radialGradient>
          </defs>
          {renderCroppedFace(-1.6, 'left')}
          {renderCroppedFace(7.9, 'right')}
          {/* Dotted green circle around the right nose only */}
          <circle
            cx="19.3"
            cy="13.4"
            r="2.2"
            fill="none"
            stroke={OUTLINE}
            strokeWidth="1.2"
            strokeDasharray="0.85 1.05"
            strokeLinecap="round"
          />
          <circle
            cx="19.3"
            cy="13.4"
            r="2.2"
            fill="none"
            stroke={GREEN}
            strokeWidth="0.7"
            strokeDasharray="0.85 1.05"
            strokeLinecap="round"
          />
          {/* Red transfer arrow shifted further right toward the right nose */}
          <StraightArrow from={[12.0, 13.4]} tip={[16.8, 13.4]} color={RED} width={1.35} head={2.6} />
        </>
      );
    },
  },
  {
    id: 'sop.inflate',
    label: 'Inflate',
    family: 'sop',
    description:
      'Diagonal red muscle spindle with rounded white tendon ends, a cased orange outer expansion arc and a bold red arrow pointing down-right.',
    types: ['inflate'],
    refKey: 'SOP_inflate',
    render: () => (
      <>
        {/* Outer orange expansion boundary */}
        <CasedStroke d="M7.6,20.4 C13.8,20.6 19.6,15.0 20.4,8.6" color={ORANGE} width={1.25} />
        {/* Rounded white tendon ends (matching femdeform muscle style) */}
        <path
          d="M5.0,17.2 C3.6,18.4 3.2,19.6 3.8,20.4 C4.4,21.0 5.8,20.4 7.0,19.0 Z"
          fill={WHITE}
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M17.0,5.2 C18.4,3.8 19.6,3.4 20.4,4.0 C21.0,4.6 20.4,6.0 19.0,7.2 Z"
          fill={WHITE}
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Red muscle belly */}
        <path
          d="M4.8,17.4 C5.8,11.6 11.4,6.0 17.2,5.0 C18.6,5.4 19.2,6.2 19.0,7.4 C18.0,13.0 12.6,18.4 6.8,19.2 C5.6,19.0 5.0,18.4 4.8,17.4 Z"
          fill={RED}
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Upper-left highlight and lower-right shadow bands */}
        <path
          d="M6.0,15.8 C7.0,11.2 11.2,7.0 15.8,6.0 C14.0,8.2 10.2,11.8 8.0,15.2 Z"
          fill={RED_LIGHT}
          opacity="0.75"
        />
        <path
          d="M7.2,18.2 C10.4,18.0 14.8,14.6 17.8,8.4 C16.6,12.6 12.6,16.8 7.2,18.2 Z"
          fill={RED_DARK}
          opacity="0.65"
        />
        <path
          d="M7.4,16.4 Q11.8,12.8 16.0,8.0 M9.2,17.2 Q13.2,14.4 16.6,10.2"
          fill="none"
          stroke={RED_DARK}
          strokeWidth="0.65"
          strokeLinecap="round"
        />
        {/* Inflation arrow */}
        <StraightArrow from={[12.4, 11.4]} tip={[18.2, 16.8]} color={RED} width={1.45} head={3.2} />
      </>
    ),
  },
  {
    id: 'sop.ripple',
    label: 'Ripple',
    family: 'sop',
    description:
      'Four-by-four subdivided 2:1 isometric diamond grid plane deformed by higher-frequency three-ring concentric ripple waves with alternating light grey-white and blue radial shading and blue outer corners.',
    types: ['ripple'],
    refKey: 'SOP_ripple',
    render: (uid) => {
      const N = 4;
      const heightAt = (u: number, v: number) => {
        const r = Math.hypot(u, v);
        return 0.75 * Math.cos(r * Math.PI * 2.6) * Math.exp(-r * 0.38);
      };
      const project = (u: number, v: number): Pt => [
        Number((12 + (u - v) * 4.8).toFixed(2)),
        Number((12.3 + (u + v) * 2.5 - heightAt(u, v)).toFixed(2)),
      ];

      // Build smooth 4x4 grid lines (3 interior lines in each direction)
      const gridLines: string[] = [];
      const SAMPLES = 12;
      for (let k = 1; k < N; k++) {
        const t = -1 + (2 * k) / N;
        const uLine: Pt[] = [];
        const vLine: Pt[] = [];
        for (let s = 0; s <= SAMPLES; s++) {
          const w = -1 + (2 * s) / SAMPLES;
          uLine.push(project(t, w));
          vLine.push(project(w, t));
        }
        gridLines.push(`M${pts([uLine[0]])} L${pts(uLine.slice(1))}`);
        gridLines.push(`M${pts([vLine[0]])} L${pts(vLine.slice(1))}`);
      }

      // Build outer perimeter path
      const borderPts: Pt[] = [];
      for (let s = 0; s < SAMPLES; s++) borderPts.push(project(-1 + (2 * s) / SAMPLES, -1));
      for (let s = 0; s < SAMPLES; s++) borderPts.push(project(1, -1 + (2 * s) / SAMPLES));
      for (let s = 0; s < SAMPLES; s++) borderPts.push(project(1 - (2 * s) / SAMPLES, 1));
      for (let s = 0; s < SAMPLES; s++) borderPts.push(project(-1, 1 - (2 * s) / SAMPLES));

      return (
        <>
          <defs>
            <radialGradient id={`${uid}-ripple`} cx="50%" cy="48%" r="55%">
              <stop offset="0%" stopColor={GREY_TOP} />
              <stop offset="18%" stopColor={BLUE_LIGHT} />
              <stop offset="34%" stopColor="#d8e6f8" />
              <stop offset="52%" stopColor={BLUE_MID} />
              <stop offset="70%" stopColor="#d2e0f2" />
              <stop offset="88%" stopColor={BLUE_MID} />
              <stop offset="100%" stopColor={BLUE} />
            </radialGradient>
          </defs>
          <polygon
            points={pts(borderPts)}
            fill={`url(#${uid}-ripple)`}
            stroke={OUTLINE}
            strokeWidth="1.15"
            strokeLinejoin="round"
          />
          <path d={gridLines.join(' ')} fill="none" stroke={OUTLINE} strokeWidth="0.65" strokeOpacity="0.65" />
        </>
      );
    },
  },
  {
    id: 'sop.softpeak',
    label: 'Soft Peak',
    family: 'sop',
    description:
      'Tilted grey grid sheet pulled up in the center into a translucent bell peak showing the back edges and farthest corner through it, with an outer black border and a vertical red arrow.',
    types: ['softpeak'],
    refKey: 'SOP_softpeak',
    render: () => (
      <>
        {/* Underlying flat 2:1 diamond plane (farthest corner at exact intersection (12, 10.2)) */}
        <polygon points="2.4,15.0 12.0,10.2 21.6,15.0 12.0,19.8" fill={GREY_LEFT} />
        {/* Back grid lines and receding back edges meeting at (12, 10.2), visible through the bulge */}
        <path
          d="M5.6,13.4 L15.2,18.2 M8.8,11.8 L18.4,16.6 M8.8,18.2 L18.4,13.4 M5.6,16.6 L15.2,11.8"
          fill="none"
          stroke={DARK_GREY}
          strokeWidth="0.6"
        />
        <path
          d="M2.4,15.0 L12.0,10.2 L21.6,15.0"
          fill="none"
          stroke={DARK_GREY}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Translucent bell peak (more translucent, no black border around the bulge itself) */}
        <path
          d="M4.6,15.0 C8.0,14.2 10.0,8.6 12.0,8.6 C14.0,8.6 16.0,14.2 19.4,15.0 L12.0,18.4 Z"
          fill={GREY_TOP}
          fillOpacity="0.48"
        />
        <path d="M12.0,8.6 C14.0,8.6 16.0,14.2 19.4,15.0 L12.0,18.4 Z" fill={GREY_RIGHT} fillOpacity="0.42" />
        {/* Curved mesh lines over the peak */}
        <path
          d="M7.6,13.0 Q12.0,11.4 16.4,13.0 M7.2,16.6 Q12.0,13.4 16.8,16.6 M12.0,8.6 V18.4"
          fill="none"
          stroke={DARK_GREY}
          strokeWidth="0.6"
        />
        {/* Outer black border only (receding edges + peak top silhouette + front edges) */}
        <path
          d="M2.4,15.0 L8.0,12.2 C9.4,11.2 10.6,8.6 12.0,8.6 C13.4,8.6 14.6,11.2 16.0,12.2 L21.6,15.0 L12.0,19.8 Z"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Vertical red peak arrow */}
        <StraightArrow from={[12, 9.4]} tip={[12, 2.5]} color={RED} width={1.45} head={3.1} />
      </>
    ),
  },
  {
    id: 'sop.bend',
    label: 'Bend',
    family: 'sop',
    description:
      'Tall three-tone grey box bent along its height; the curved side edges are traced in red to show the deformation.',
    types: ['bend'],
    refKey: 'SOP_bend',
    render: () => (
      <>
        <polygon
          points="5,5 15,3.5 20,5 10,6.8"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M5 5L10 6.8C13.5 11 13.5 15.5 10.5 21L5.5 19.5C8 14.5 7.5 10 5 5Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M10 6.8L20 5C22.5 9.5 22 14.5 19.5 19L10.5 21C13.5 15.5 13.5 11 10 6.8Z"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M5 5C7.5 10 8 14.5 5.5 19.5M10 6.8C13.5 11 13.5 15.5 10.5 21M20 5C22.5 9.5 22 14.5 19.5 19"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.bulge',
    label: 'Bulge',
    family: 'sop',
    description: 'Blue perspective plane pushed upward into a smooth dome by a white wireframe sphere underneath.',
    types: ['bulge'],
    icons: ['sop_bulge'],
    refKey: 'SOP_bulge',
    render: () => (
      <>
        <circle cx="12" cy="15.5" r="4.8" fill="#eef2f7" stroke="#262626" strokeWidth="1.1" />
        <path d="M7.5,15.5 H16.5 M12,10.7 V20.3" stroke="#89929e" strokeWidth="0.8" />
        <polygon
          points="5.5,7.5 18.5,7.5 21.5,13 2.5,13"
          fill="#8fc2ff"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M6.8,11.2 C8,5 16,5 17.2,11.2 Z"
          fill="#3672c4"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.creep',
    label: 'Creep',
    family: 'sop',
    description: 'Curved white surface patch with an orange polygon patch creeping across its upper curve.',
    types: ['creep'],
    icons: ['sop_creep'],
    refKey: 'SOP_creep',
    render: () => (
      <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M3,11.5 C7,8.5 12,8.5 17.5,10.5 L21,15.5 C15,14 10,15 7.5,19 Z" fill="#eef2f7" />
        <path d="M4.5,9.5 C8,6 13,6 17,7.5 L19,10.5 C14.5,9 9.5,9.5 6.5,13 Z" fill="#ee8624" />
      </g>
    ),
  },
  {
    id: 'sop.deltamush',
    label: 'Delta Mush',
    family: 'sop',
    description:
      'Green five-fingered forearm and hand containing two white-and-blue bone diamonds and perpendicular blue ring lines across the arm.',
    types: ['deltamush'],
    icons: ['sop_deltamush'],
    refKey: 'SOP_deltamush',
    render: () => (
      <CaptureArmBase armFill="#58c848" outlineWidth={0.95} boneLight="#ffffff" boneStrokeWidth={0.65}>
        <path
          d="M17.2,3.3 L20.5,6.6 M15.1,5.4 L18.4,8.9 M13.1,7.5 L16.5,11.1 M10.9,10.1 L14.1,13.4 M8.6,12.7 L11.7,15.7"
          fill="none"
          stroke="#3672c4"
          strokeWidth="0.85"
        />
        <path d={CAPTURE_ARM_PATH} fill="none" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
      </CaptureArmBase>
    ),
  },
  {
    id: 'sop.lattice',
    label: 'Lattice Deform',
    family: 'sop',
    description:
      'Deformed orange column inside a light-blue 3D lattice bounding cage with orange vertex control points.',
    types: ['lattice'],
    icons: ['sop_lattice'],
    refKey: 'SOP_lattice',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-lat-body`} x1="0" y1="0" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="55%" stopColor="#ee8624" />
            <stop offset="100%" stopColor="#c25e12" />
          </linearGradient>
        </defs>
        <path
          d="M7.6,4.4 C7.8,3.2 16.2,3.2 16.4,4.6 C16.6,6.2 14.4,9.6 14.1,11.6 C13.8,13.6 15.2,17.0 14.8,18.6 C14.4,20.2 8.4,20.2 8.0,18.4 C7.6,16.6 9.1,13.4 9.2,11.4 C9.3,9.4 7.4,5.6 7.6,4.4 Z"
          fill={`url(#${uid}-lat-body)`}
          stroke="#262626"
          strokeWidth="1.05"
        />
        <ellipse cx="12.0" cy="4.4" rx="4.2" ry="1.3" fill="#ffb066" stroke="#262626" strokeWidth="0.85" />
        <g fill="none" stroke="#262626" strokeWidth="1.9" strokeLinejoin="round">
          <polygon points="5.8,3.6 13.2,2.0 18.6,4.0 11.2,5.8" />
          <polygon points="6.2,19.0 12.6,17.4 17.6,19.6 11.0,21.2" />
          <line x1="5.8" y1="3.6" x2="6.2" y2="19.0" />
          <line x1="11.2" y1="5.8" x2="11.0" y2="21.2" />
          <line x1="18.6" y1="4.0" x2="17.6" y2="19.6" />
        </g>
        <g fill="none" stroke="#5aa2f2" strokeWidth="1.0" strokeLinejoin="round">
          <polygon points="5.8,3.6 13.2,2.0 18.6,4.0 11.2,5.8" />
          <polygon points="7.4,11.4 13.0,10.0 16.8,11.8 11.1,13.2" />
          <polygon points="6.2,19.0 12.6,17.4 17.6,19.6 11.0,21.2" />
          <line x1="5.8" y1="3.6" x2="7.4" y2="11.4" />
          <line x1="7.4" y1="11.4" x2="6.2" y2="19.0" />
          <line x1="11.2" y1="5.8" x2="11.1" y2="13.2" />
          <line x1="11.1" y1="13.2" x2="11.0" y2="21.2" />
          <line x1="18.6" y1="4.0" x2="16.8" y2="11.8" />
          <line x1="16.8" y1="11.8" x2="17.6" y2="19.6" />
        </g>
        <g fill="#ee8624" stroke="#262626" strokeWidth="0.6">
          <circle cx="5.8" cy="3.6" r="0.9" />
          <circle cx="18.6" cy="4.0" r="0.9" />
          <circle cx="11.2" cy="5.8" r="0.9" />
          <circle cx="7.4" cy="11.4" r="0.9" />
          <circle cx="11.1" cy="13.2" r="0.9" />
          <circle cx="16.8" cy="11.8" r="0.9" />
          <circle cx="6.2" cy="19.0" r="0.9" />
          <circle cx="11.0" cy="21.2" r="0.9" />
          <circle cx="17.6" cy="19.6" r="0.9" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.magnet',
    label: 'Magnet',
    family: 'sop',
    description: 'Orange perspective plane pushed upward into a smooth dome above a white wireframe sphere.',
    types: ['magnet'],
    icons: ['sop_magnet'],
    refKey: 'SOP_magnet',
    render: () => (
      <>
        <circle cx="12" cy="15.5" r="4.8" fill="#eef2f7" stroke="#262626" strokeWidth="1.1" />
        <path d="M7.5,15.5 H16.5 M12,10.7 V20.3" stroke="#89929e" strokeWidth="0.8" />
        <polygon
          points="5.5,7.5 18.5,7.5 21.5,13 2.5,13"
          fill="#ffb066"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M6.8,11.2 C8,5 16,5 17.2,11.2 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.mountain',
    label: 'Mountain',
    family: 'sop',
    description: 'Faceted orange and amber mountain mesh with two jagged peaks.',
    types: ['mountain'],
    icons: ['sop_mountain'],
    refKey: 'SOP_mountain',
    render: () => (
      <>
        <g stroke="#8b3b00" strokeWidth="0.8" strokeLinejoin="round">
          <polygon points="2,14.2 6,8.8 10,14.2 6,16.4" fill="#fdbf64" />
          <polygon points="6,8.8 10,11.2 14.2,11.4 10,14.2" fill="#ffa54c" />
          <polygon points="10,11.2 14.2,8 18.2,11.6 14.2,11.4" fill="#fedba7" />
          <polygon points="14.2,11.4 18.2,11.6 22,7.6 18.2,16.4" fill="#f57900" />
          <polygon points="10,14.2 14.2,11.4 18.2,16.4 14.2,16.4" fill="#e96712" />
          <polygon points="6,16.4 10,14.2 14.2,16.4 10.2,21.2" fill="#f57900" />
          <polygon points="10.2,21.2 14.2,16.4 18.2,19.6 15,19.8" fill="#d52e0c" />
          <polygon points="14.2,16.4 18.2,16.4 22,16.4 18.2,19.6" fill="#cb1009" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.peak',
    label: 'Peak',
    family: 'sop',
    description: 'Metallic grey sphere with two sharp surface peaks pulled outward along red normal arrows.',
    types: ['peak'],
    icons: ['sop_peak'],
    refKey: 'SOP_peak',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pk-sp`} cx="40%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#ccd2d7" />
            <stop offset="100%" stopColor="#505359" />
          </radialGradient>
        </defs>
        <g stroke="#eeeeec" strokeWidth="2.1" strokeLinecap="round">
          <line x1="6.4" y1="8.2" x2="2.6" y2="3.8" />
          <line x1="17.6" y1="8.2" x2="21.4" y2="3.8" />
        </g>
        <path
          d="M12,8.4 C13.2,8.4 14.2,8.8 15,9.4 C16.5,10.4 18.2,7.8 18.6,8.2 C19,8.6 17.6,11.2 18.5,12.8 C19,13.7 19.2,14.6 19.2,15.6 C19.2,19.5 16,22.4 12,22.4 C8,22.4 4.8,19.5 4.8,15.6 C4.8,14.6 5,13.7 5.5,12.8 C6.4,11.2 5,8.6 5.4,8.2 C5.8,7.8 7.5,10.4 9,9.4 C9.8,8.8 10.8,8.4 12,8.4 Z"
          fill={`url(#${uid}-pk-sp)`}
          stroke="#192333"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <g stroke="#ef2929" strokeWidth="1.15" strokeLinecap="round">
          <line x1="6.4" y1="8.2" x2="2.8" y2="4" />
          <line x1="17.6" y1="8.2" x2="21.2" y2="4" />
        </g>
        <polygon points="1.8,2.8 4.6,3.6 2.6,5.4" fill="#ef2929" />
        <polygon points="22.2,2.8 19.4,3.6 21.4,5.4" fill="#ef2929" />
        <circle cx="6.2" cy="8.2" r="0.9" fill="#ef2929" stroke="#eeeeec" strokeWidth="0.4" />
        <circle cx="17.8" cy="8.2" r="0.9" fill="#ef2929" stroke="#eeeeec" strokeWidth="0.4" />
      </>
    ),
  },
  {
    id: 'sop.sculpt',
    label: 'Sculpt',
    family: 'sop',
    description:
      'Sweeping S-curved grey ribbon surface with a left-to-right gradient-shaded downward slope and a red target ring and stylus on the upper-left crest.',
    types: ['sculpt'],
    icons: ['sop_sculpt'],
    refKey: 'SOP_sculpt',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-sculpt-shade`} x1="10%" y1="35%" x2="90%" y2="65%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="50%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        <path
          d="M2.2,14.6 C4.8,13.4 6.8,15.2 9.4,17.2 C11.4,18.8 13.0,19.4 14.8,19.0 L21.8,14.2 L21.8,15.3 L14.8,20.1 C13.0,20.5 11.4,19.9 9.4,18.3 C6.8,16.3 4.8,14.5 2.2,15.7 Z"
          fill="#5a616b"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M2.2,14.6 L8.6,10.0 C10.8,9.2 12.8,10.8 15.2,12.4 C17.6,14.0 19.8,14.2 21.8,14.2 L14.8,19.0 C13.0,19.4 11.4,18.8 9.4,17.2 C6.8,15.2 4.8,13.4 2.2,14.6 Z"
          fill="#eef2f7"
        />
        <path
          d="M10.2,9.8 C11.8,10.0 13.5,11.2 15.2,12.4 L9.4,17.2 C8.0,16.1 6.8,15.1 5.6,14.2 Z"
          fill={`url(#${uid}-sculpt-shade)`}
        />
        <path
          d="M2.2,14.6 L8.6,10.0 C10.8,9.2 12.8,10.8 15.2,12.4 C17.6,14.0 19.8,14.2 21.8,14.2 L14.8,19.0 C13.0,19.4 11.4,18.8 9.4,17.2 C6.8,15.2 4.8,13.4 2.2,14.6 Z"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <ellipse cx="8.0" cy="11.4" rx="2.7" ry="1.35" fill="none" stroke={OUTLINE} strokeWidth="2.0" />
        <ellipse cx="8.0" cy="11.4" rx="2.7" ry="1.35" fill="none" stroke="#e03228" strokeWidth="1.25" />
        <CasedStroke d="M9.0,3.4 L8.0,11.2" color="#e03228" width={1.25} casing={2.1} />
      </>
    ),
  },
  {
    id: 'sop.fractal',
    label: 'Fractal',
    family: 'sop',
    description:
      'Subdivided crinkled orange three-tone fractal terrain mesh floating above a flat 2x2 white isometric grid tile.',
    types: ['fractal'],
    icons: ['sop_fractal'],
    refKey: 'SOP_fractal',
    render: () => (
      <>
        <polygon points={pts(FRACTAL_TILE)} fill="#f2f4f7" stroke={OUTLINE} strokeWidth="1.0" strokeLinejoin="round" />
        <path d={quadGridPath(FRACTAL_TILE, 2, 2)} fill="none" stroke="#5a616b" strokeWidth="0.65" />
        {FRACTAL_TRIS.map((tri, idx) => (
          <polygon
            key={idx}
            points={pts(tri.pts)}
            fill={tri.fill}
            stroke="#5a2a08"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
        ))}
        <polygon
          points={pts(FRACTAL_PERIMETER)}
          fill="none"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.flatten',
    label: 'Flatten',
    family: 'sop',
    description: '3D blue-and-yellow globe sliced flat along a tilted plane above a dashed red circle.',
    types: ['flatten'],
    icons: ['sop_flatten'],
    refKey: 'SOP_flatten',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-gl`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#5aa2f2" />
            <stop offset="100%" stopColor="#1e4488" />
          </radialGradient>
        </defs>
        {/* Dashed red outline of missing lower-left cap */}
        <path
          d="M4.2,9.2 A8.2,8.2 0 0,0 18.8,16.5"
          fill="#89929e"
          fillOpacity="0.25"
          stroke="#e03228"
          strokeWidth="1"
          strokeDasharray="1.8 1.3"
          strokeLinecap="round"
        />
        {/* Upper 3D globe dome */}
        <path
          d="M4.2,9.2 A8.2,8.2 0 1,1 18.8,16.5 Z"
          fill={`url(#${uid}-gl)`}
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Yellow-green continent patches */}
        <path
          d="M9.5,4.2 C13.5,3.8 17.5,6.2 19.2,10.5 C16.2,10.8 14.5,9.2 12.8,9.8 C11.2,10.2 10.5,8.2 9.5,4.2 Z"
          fill="#ffe47a"
          stroke="#588828"
          strokeWidth="0.6"
        />
        {/* Foreshortened flat cut plane */}
        <ellipse
          cx="11.5"
          cy="12.85"
          rx="8.1"
          ry="1.2"
          transform="rotate(26.5 11.5 12.85)"
          fill="#9aa2ae"
          stroke="#262626"
          strokeWidth="0.9"
        />
      </>
    ),
  },
  {
    id: 'sop.planarinflate',
    label: 'Planar Inflate',
    family: 'sop',
    description: 'Puffy white-and-silver inflated cushion with pinched corners and a ground shadow.',
    types: ['planarinflate'],
    icons: ['sop_planarinflate'],
    refKey: 'SOP_planarinflate',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pi-pil`} cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#d3d7cf" />
            <stop offset="100%" stopColor="#888a85" />
          </radialGradient>
        </defs>
        <ellipse
          cx="12"
          cy="16.5"
          rx="9.8"
          ry="4.5"
          fill="#262626"
          fillOpacity="0.25"
          transform="rotate(-15 12 16.5)"
        />
        <path
          d="M2.2,12 C3.8,11.4 5.5,9.5 8.5,7.8 C11.5,6.2 13.5,6.2 14.5,5.2 C15,4.8 15.5,5.4 16,6 C17.8,6.5 19.8,7.8 20.8,9.8 C21.2,10.5 21.8,10.8 22,11.2 C21.2,11.8 19.5,13.5 16.8,15.5 C13.8,17.6 11,18.2 10.2,19.4 C9.8,19.8 9.2,19.2 8.8,18.2 C6.2,16.8 4.2,14.5 2.2,12 Z"
          fill={`url(#${uid}-pi-pil)`}
          stroke="#2e3436"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M3.5,12.2 C6.5,13.8 9,16.5 9.8,18.5 M10.2,18.2 C13.5,16.8 17.5,14.2 20.8,11"
          fill="none"
          stroke="#555753"
          strokeWidth="0.55"
        />
      </>
    ),
  },
  {
    id: 'sop.planarpleat',
    label: 'Planar Pleat',
    family: 'sop',
    description:
      'Tan pleated skirt fabric panel with vertical box pleats and blue stitching accents along the waistband.',
    types: ['planarpleat'],
    icons: ['sop_planarpleat'],
    refKey: 'SOP_planarpleat',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ppl-fab`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d3c9ab" />
            <stop offset="50%" stopColor="#dcd7c6" />
            <stop offset="100%" stopColor="#b5a87e" />
          </linearGradient>
        </defs>
        <ellipse cx="12" cy="20.6" rx="9.5" ry="1.8" fill="#262626" fillOpacity="0.25" />
        <path
          d="M3.4,4.2 L20.6,4.2 L22,19.2 L18.5,19 L18.5,19.8 L14.5,19.4 L14.5,20.2 L10.5,19.4 L10.5,20.2 L6.5,19 L6.5,19.8 L2,19.2 Z"
          fill={`url(#${uid}-ppl-fab)`}
          stroke="#5d5331"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <rect x="3.4" y="2.6" width="17.2" height="2" rx="0.4" fill="#c4b887" stroke="#8f5902" strokeWidth="0.75" />
        <g stroke="#5d5331" strokeWidth="0.65">
          <line x1="7.2" y1="4.6" x2="6.4" y2="19.4" />
          <line x1="10.8" y1="4.6" x2="10.4" y2="19.8" />
          <line x1="14.2" y1="4.6" x2="14.4" y2="19.8" />
          <line x1="17.6" y1="4.6" x2="18.4" y2="19.4" />
        </g>
        <g stroke="#204a87" strokeWidth="0.75" strokeDasharray="1 0.8">
          <line x1="7.2" y1="5" x2="7" y2="8.8" />
          <line x1="10.8" y1="5" x2="10.6" y2="8.8" />
          <line x1="14.2" y1="5" x2="14.3" y2="8.8" />
          <line x1="17.6" y1="5" x2="17.8" y2="8.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.deflate',
    label: 'Deflate',
    family: 'sop',
    description: 'Deflated red balloon with a tied neck at the bottom-left and wrinkled folds across its body.',
    types: ['deflate'],
    icons: ['sop_deflate'],
    refKey: 'SOP_deflate',
    render: () => (
      <>
        <path
          d="M5.5,17.2 L3.5,19 L5,20.5 L6.8,18.5 C10.5,20.2 16.5,19.5 19.5,15.5 C21.5,12.5 20.5,8.5 17,7.5 C14,6.5 11.5,7.5 9.5,7 C6.5,6.5 4.8,9.5 5.5,12.8 C5,14.5 5.2,16 5.5,17.2 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M8.5,11 C11,12.5 14,12 16.5,10.5 M9.5,15 C12.5,16 15.5,15.2 17.5,13.5"
          fill="none"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.edit',
    label: 'Edit',
    family: 'sop',
    description:
      'Three-tone grey box whose top corner is pulled up into a tall peak, with a red picked point at the tip and a white mouse cursor beside it.',
    types: ['edit'],
    refKey: 'SOP_edit',
    render: () => (
      <>
        <polygon
          points="3.5,9 15.5,2.5 9.5,12"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <polygon
          points="3.5,9 9.5,12 9.5,21 3.5,18"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <polygon
          points="9.5,12 15.5,2.5 15.5,18 9.5,21"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <circle cx="15.5" cy="2.8" r="2" fill="#e03228" stroke="#262626" strokeWidth="0.9" />
        <polygon
          points="16.8,5 16.8,12.5 18.75,10.7 20.1,13.55 21.3,12.95 20,10.2 22.4,10.2"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.shotsculpt',
    label: 'Shot Sculpt',
    family: 'sop',
    description:
      'Two grey sculpted figure silhouettes (seated thinker on the left, striding figure on the right) standing on blue plinth bars.',
    types: ['shotsculpt'],
    icons: ['sop_shotsculpt'],
    refKey: 'SOP_shotsculpt',
    render: () => (
      <>
        {/* Brighter, thicker blue plinth bases */}
        <rect x="2.6" y="18.7" width="8.6" height="2.6" rx="0.5" fill="#5aa2f2" stroke={OUTLINE} strokeWidth="0.95" />
        <rect x="12.4" y="18.7" width="9.0" height="2.6" rx="0.5" fill="#5aa2f2" stroke={OUTLINE} strokeWidth="0.95" />
        {/* Rock under seated thinker */}
        <polygon
          points="3.8,18.7 4.2,14.2 7.4,14.2 7.8,18.7"
          fill="#89929e"
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Left seated thinker silhouette (hunched forward, elbow on knee, legs bent) */}
        <path
          d="M5.4,14.6 L4.6,12.2 C4.3,10.4 5.2,8.8 6.8,8.5 C6.6,7.1 7.5,5.9 8.8,6.2 C9.8,6.4 10.3,7.5 9.7,8.5 L8.6,9.4 L9.6,12.2 L10.2,13.6 L9.8,18.7 L8.1,18.7 L8.4,15.0 L5.4,14.6 Z"
          fill="#eef2f7"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Right striding figure silhouette (bulked up, bright grey) */}
        <path
          d="M16.4,3.6 C17.7,3.6 18.5,4.6 18.2,5.8 C18.0,6.6 17.3,7.1 16.7,7.2 L18.5,9.0 L20.2,12.2 L18.7,13.0 L17.4,10.7 L17.3,13.8 L19.8,18.7 L17.6,18.7 L16.2,14.8 L14.8,18.7 L12.8,18.7 L14.8,13.8 L14.3,9.9 L13.2,12.5 L11.9,11.8 L13.5,8.2 C14.1,7.3 14.9,7.0 15.7,7.0 C15.1,6.5 14.9,5.6 15.1,4.7 C15.3,4.0 15.8,3.6 16.4,3.6 Z"
          fill="#eef2f7"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.ray',
    label: 'Ray',
    family: 'sop',
    description:
      'Grey vertical cylinder on the left with a red ray projecting through a generic white figure silhouette onto a cylinder-shaded silhouette.',
    types: ['ray'],
    icons: ['sop_ray'],
    refKey: 'SOP_ray',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ray-cyl`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="50%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        <path
          d="M2.8,4.8 V16.8 A3.8,1.6 0 0,0 10.4,16.8 V4.8 Z"
          fill={`url(#${uid}-ray-cyl)`}
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        <path d={ellipsePath(6.6, 4.8, 3.8, 1.6)} fill="#eef2f7" stroke={OUTLINE} strokeWidth="0.95" />
        {/* Projected generic silhouette on cylinder, matching cylinder gradient */}
        <g fill={`url(#${uid}-ray-cyl)`} stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round">
          <path d={rayBustPath(7.8, 12.6, 0.9)} />
          <circle cx="7.8" cy="9.6" r="1.4" />
        </g>
        {/* Ray beam from front silhouette to cylinder */}
        <CasedStroke d="M8.2,11.4 L14.2,15.6" color="#e03228" width={1.1} casing={2.1} />
        {/* Foreground generic silhouette */}
        <g fill="#f2f4f7" stroke={OUTLINE} strokeWidth="0.95" strokeLinejoin="round">
          <path d={rayBustPath(14.8, 15.0, 1.1)} />
          <circle cx="14.8" cy="11.4" r="1.65" />
        </g>
        {/* Shorter foreground ray segment extending from bottom-right of front silhouette */}
        <CasedStroke d="M15.6,16.6 L19.4,19.3" color="#e03228" width={1.1} casing={2.1} />
      </>
    ),
  },
];
