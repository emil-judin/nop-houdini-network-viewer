import React from 'react';
import { ellipsePt, type Pt, pts, quadPt, r2 } from '../../geoHelpers';
import { CasedStroke, CornerBadge } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { AttribTag, TAG_OUTLINE } from '../kits/attribTag';

const DIE_TOP = '#ffffff';

const DIE_FRONT = '#eef2f7';

const DIE_RIGHT = '#c0c7d1';

const DARK = '#3a3f47';

const RED = '#e03228';

const LIGHT_BLUE = '#8fc2ff';

const GREEN = '#52d638';

const BLUE = '#3672c4';

/**
 * The Attribute Adjust family. The shared kit is a pair of
 * white dice (`DicePair`, built from `Die`); the typed variants add a dark badge at the lower
 * right with their glyph. Array is the attribute tag with array slots, Color a tilted color wheel.
 */

const OUTLINE = TAG_OUTLINE;

/** Pip centers on a unit face for the counts 1 to 6. */
const PIPS: Record<number, readonly Pt[]> = {
  1: [[0.5, 0.5]],
  2: [
    [0.28, 0.28],
    [0.72, 0.72],
  ],
  3: [
    [0.26, 0.26],
    [0.5, 0.5],
    [0.74, 0.74],
  ],
  4: [
    [0.28, 0.28],
    [0.72, 0.28],
    [0.28, 0.72],
    [0.72, 0.72],
  ],
  5: [
    [0.26, 0.26],
    [0.74, 0.26],
    [0.5, 0.5],
    [0.26, 0.74],
    [0.74, 0.74],
  ],
  6: [
    [0.28, 0.24],
    [0.72, 0.24],
    [0.28, 0.5],
    [0.72, 0.5],
    [0.28, 0.76],
    [0.72, 0.76],
  ],
};

/**
 * One white die seen at three quarters from the upper right: a square front face of side `s`
 * with its top-left corner at `(x, y)`, a top face and a right face (three tones, upper-left
 * light), turned by `rot` degrees around the front face center. `front`, `top` and `right` are
 * the pip counts of the faces (0 leaves a face empty); `flip` mirrors the front pips left to right.
 */
const Die: React.FC<{
  x: number;
  y: number;
  s: number;
  rot?: number;
  front: number;
  top?: number;
  right?: number;
  flip?: boolean;
}> = ({ x, y, s, rot = 0, front, top = 0, right = 0, flip = false }) => {
  const dx = s * 0.26;
  const dy = s * 0.3;
  const frontQ: [Pt, Pt, Pt, Pt] = [
    [x, y],
    [x + s, y],
    [x + s, y + s],
    [x, y + s],
  ];
  const topQ: [Pt, Pt, Pt, Pt] = [
    [x + dx, y - dy],
    [x + s + dx, y - dy],
    [x + s, y],
    [x, y],
  ];
  const rightQ: [Pt, Pt, Pt, Pt] = [
    [x + s, y],
    [x + s + dx, y - dy],
    [x + s + dx, y + s - dy],
    [x + s, y + s],
  ];
  const pr = Math.max(0.75, s * 0.095);
  const face = (q: [Pt, Pt, Pt, Pt], count: number, rx: number, ry: number, mirror = false): React.ReactNode =>
    (PIPS[count] ?? []).map(([u, v]) => {
      const [px, py] = quadPt(q, mirror ? 1 - u : u, v);
      return <ellipse key={`${u}-${v}`} cx={r2(px)} cy={r2(py)} rx={r2(rx)} ry={r2(ry)} fill={OUTLINE} />;
    });
  return (
    <g transform={`rotate(${rot} ${r2(x + s / 2)} ${r2(y + s / 2)})`}>
      <g stroke={OUTLINE} strokeWidth="1.1" strokeLinejoin="round">
        <polygon points={pts(topQ)} fill={DIE_TOP} />
        <polygon points={pts(rightQ)} fill={DIE_RIGHT} />
        <polygon points={pts(frontQ)} fill={DIE_FRONT} />
      </g>
      {face(topQ, top, pr, pr * 0.62)}
      {face(rightQ, right, pr * 0.62, pr)}
      {face(frontQ, front, pr, pr, flip)}
    </g>
  );
};

/**
 * The family base: two white dice, a smaller one at the back upper right and a larger one in
 * front at the lower left. `compact` draws the pair smaller and higher (Dictionary, above the book).
 */
const DicePair: React.FC<{ compact?: boolean }> = ({ compact = false }) =>
  compact ? (
    <>
      <Die x={12.6} y={4.6} s={6.8} rot={6} front={3} flip />
      <Die x={4} y={6.2} s={7.2} rot={-5} front={5} />
    </>
  ) : (
    <>
      <Die x={10.8} y={5.2} s={8.2} rot={6} front={3} flip />
      <Die x={2.9} y={11} s={8.6} rot={-5} front={5} />
    </>
  );

/** Dice pair with the type badge at the lower right; children are the glyph in badge space (0 to 10). */
const TypedDice: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <DicePair />
    <CornerBadge slot="br" size={11}>
      {children}
    </CornerBadge>
  </>
);

/** Bold badge text (at most two characters) centered in the badge. */
const BadgeText: React.FC<{ text: string; fill: string }> = ({ text, fill }) => (
  <text x="5" y="7.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="700" fontSize="7" fill={fill}>
    {text}
  </text>
);

/** Open book lying flat: cover quad in order back left, back right, front right, front left. */
const BOOK: [Pt, Pt, Pt, Pt] = [
  [5.4, 12.4],
  [21.9, 14.6],
  [18.6, 21.6],
  [2.2, 19.4],
];

const bookQuad = (u0: number, v0: number, u1: number, v1: number): Pt[] => [
  quadPt(BOOK, u0, v0),
  quadPt(BOOK, u1, v0),
  quadPt(BOOK, u1, v1),
  quadPt(BOOK, u0, v1),
];

const bookLine = (u0: number, u1: number, v: number): string =>
  `M${pts([quadPt(BOOK, u0, v)])} L${pts([quadPt(BOOK, u1, v)])}`;

/** Color wheel: center, radii and the wedge colors clockwise from the right. */
const WHEEL = { cx: 9.6, cy: 12.4, rx: 6.9, ry: 8 } as const;

const WHEEL_COLORS = ['#e03228', '#3672c4', '#5aa2f2', '#58c848', '#f2c438', '#ee8624'] as const;

const wheelWedge = (i: number): string => {
  const step = 360 / WHEEL_COLORS.length;
  const a = ellipsePt(WHEEL.cx, WHEEL.cy, WHEEL.rx, WHEEL.ry, i * step - 30);
  const b = ellipsePt(WHEEL.cx, WHEEL.cy, WHEEL.rx, WHEEL.ry, (i + 1) * step - 30);
  return `M${WHEEL.cx},${WHEEL.cy} L${pts([a])} A${WHEEL.rx},${WHEEL.ry} 0 0,1 ${pts([b])} Z`;
};

/**
 * Attribute Adjust operators: a pair of white dice, with a dark badge for the typed variants.
 */
export const ATTRIB_ADJUST_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.attribadjustarray',
    label: 'Attribute Adjust Array',
    family: 'sop',
    description:
      'White attribute tag with a grey pin; inside it a dark strip with three white array slots, and a fourth white slot with a red outline lifted out and tilted at the upper right corner.',
    types: ['attribadjustarray'],
    icons: ['sop_attribadjustarray'],
    refKey: 'SOP_attribadjustarray',
    render: (uid) => (
      <AttribTag uid={uid}>
        <rect x="9.7" y="6.2" width="8.6" height="4.2" fill={DARK} />
        <rect x="10.4" y="7.1" width="2.1" height="2.4" fill="#ffffff" />
        <rect x="13" y="7.1" width="2.1" height="2.4" fill="#ffffff" />
        <rect x="15.6" y="7.1" width="2.1" height="2.4" fill="#ffffff" />
        <g transform="rotate(14 18.7 5)">
          <rect
            x="16.9"
            y="3.2"
            width="3.6"
            height="3.6"
            fill="none"
            stroke={OUTLINE}
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <rect x="16.9" y="3.2" width="3.6" height="3.6" fill="#ffffff" stroke={RED} strokeWidth="1.1" />
        </g>
      </AttribTag>
    ),
  },
  {
    id: 'sop.attribadjustcolor',
    label: 'Attribute Adjust Color',
    family: 'sop',
    description:
      'Tilted six-wedge color wheel (red, orange, yellow, green, light blue, blue) with a white center dot and an eyedropper with a dark bulb entering from the upper right carrying red liquid in its tip.',
    types: ['attribadjustcolor'],
    icons: ['sop_attribadjustcolor'],
    refKey: 'SOP_attribadjustcolor',
    render: () => (
      <>
        <g transform={`rotate(-25 ${WHEEL.cx} ${WHEEL.cy})`}>
          {WHEEL_COLORS.map((color, i) => (
            <path key={color} d={wheelWedge(i)} fill={color} />
          ))}
          <ellipse
            cx={WHEEL.cx}
            cy={WHEEL.cy}
            rx={WHEEL.rx}
            ry={WHEEL.ry}
            fill="none"
            stroke={OUTLINE}
            strokeWidth="1.1"
          />
          <circle cx={WHEEL.cx} cy={WHEEL.cy} r="1" fill="#ffffff" />
        </g>
        <CasedStroke d="M18.3,5.7 L13.9,10.1" color="#f2f4f7" width={1.5} casing={2.9} />
        <path d="M15.7,8.3 L13.9,10.1" fill="none" stroke={RED} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16.9,4.3 L19.7,7.1" fill="none" stroke={OUTLINE} strokeWidth="1.7" strokeLinecap="round" />
        <path d="M18.9,5.1 L20.5,3.5" fill="none" stroke={OUTLINE} strokeWidth="3.6" strokeLinecap="round" />
        <path d="M18.9,5.1 L20.5,3.5" fill="none" stroke="#5a616b" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.attribadjustdict',
    label: 'Attribute Adjust Dictionary',
    family: 'sop',
    description:
      'Two small white dice above an open book lying flat: blue cover, white pages with grey text lines and a dark spine line.',
    types: ['attribadjustdict'],
    icons: ['sop_attribadjustdict'],
    refKey: 'SOP_attribadjustdict',
    render: () => (
      <>
        <DicePair compact />
        <polygon points={pts(BOOK)} fill={BLUE} stroke={OUTLINE} strokeWidth="1.1" strokeLinejoin="round" />
        <polygon
          points={pts(bookQuad(0.08, 0.14, 0.92, 0.74))}
          fill="#ffffff"
          stroke={OUTLINE}
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <path
          d={`M${pts([quadPt(BOOK, 0.5, 0.14)])} L${pts([quadPt(BOOK, 0.5, 0.74)])}`}
          stroke={OUTLINE}
          strokeWidth="0.9"
        />
        <path
          d={[
            bookLine(0.15, 0.42, 0.34),
            bookLine(0.15, 0.42, 0.56),
            bookLine(0.58, 0.85, 0.34),
            bookLine(0.58, 0.85, 0.56),
          ].join(' ')}
          fill="none"
          stroke="#89929e"
          strokeWidth="0.8"
        />
      </>
    ),
  },
  {
    id: 'sop.attribadjustfloat',
    label: 'Attribute Adjust Float',
    family: 'sop',
    description: 'Two white dice with a dark rounded badge at the lower right that shows a light blue ".2".',
    types: ['attribadjustfloat'],
    icons: ['sop_attribadjustfloat'],
    refKey: 'SOP_attribadjustfloat',
    render: () => (
      <TypedDice>
        <BadgeText text=".2" fill={LIGHT_BLUE} />
      </TypedDice>
    ),
  },
  {
    id: 'sop.attribadjustinteger',
    label: 'Attribute Adjust Integer',
    family: 'sop',
    description: 'Two white dice with a dark rounded badge at the lower right that shows a green "10".',
    types: ['attribadjustinteger'],
    icons: ['sop_attribadjustinteger'],
    refKey: 'SOP_attribadjustinteger',
    render: () => (
      <TypedDice>
        <BadgeText text="10" fill={GREEN} />
      </TypedDice>
    ),
  },
  {
    id: 'sop.attribadjustvector',
    label: 'Attribute Adjust Vector',
    family: 'sop',
    description:
      'Two white dice with a dark rounded badge at the lower right that shows three light blue dashes in a row.',
    types: ['attribadjustvector'],
    icons: ['sop_attribadjustvector'],
    refKey: 'SOP_attribadjustvector',
    render: () => (
      <TypedDice>
        <rect x="1.5" y="4.2" width="1.9" height="1.7" fill={LIGHT_BLUE} />
        <rect x="4.05" y="4.2" width="1.9" height="1.7" fill={LIGHT_BLUE} />
        <rect x="6.6" y="4.2" width="1.9" height="1.7" fill={LIGHT_BLUE} />
      </TypedDice>
    ),
  },
];
