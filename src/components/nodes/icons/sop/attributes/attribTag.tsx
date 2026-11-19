import React from 'react';
import { arrowHead, gearPath, isoBoxFaces, lerpPt, type Pt, pts, quadPt, r2 } from '../../geoHelpers';
import { CasedStroke, ShadedSphere, SPHERE_TONES } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { AttribTag, TAG_FILL, TAG_OUTLINE, TagPanel, tagPanelPath, TagPin } from '../kits/attribTag';

/**
 * The Attribute tag family. Every member uses the attribute
 * tag kit (`kits/attribTag.tsx`): the white speech-bubble panel with a tail down to a shaded grey
 * pin, as in the live Attribute Create, with the operator glyph inside the panel.
 */

/** Arrow orange of the approved Attribute Promote drawing. */
const ARROW_ORANGE = '#ee7a24';

const ORANGE = '#ee8624';

const RED = '#e03228';

const DARK_TEAL = '#0b4f55';

/** Slanted tag of the mirror icon (left half); the reflection is the same path flipped at x = 12. */
const MIRROR_TAG = 'M2.8,2.8 L10.2,6 V11.8 L8.2,12.5 L8.7,17.8 L5.6,13.5 L2.8,14.6 Z';

/**
 * Two overlapping small tags, each with its own pin: one at the upper left pointing at a pin on
 * the left, one in front at the lower right pointing down at a second pin.
 */
const TwoTags: React.FC<{ uid: string; frontFill?: string; frontOpacity?: number }> = ({
  uid,
  frontFill = TAG_FILL,
  frontOpacity = 1,
}) => (
  <>
    <TagPanel x={6.5} y={2.5} w={10} h={7} tail={[8, 10.6]} tip={[5.2, 13]} />
    <TagPin id={`${uid}-pin`} cx={4.2} cy={14.8} r={2.3} />
    <TagPanel
      x={10.5}
      y={5.5}
      w={11}
      h={7}
      tail={[15.2, 18]}
      tip={[18.5, 17.6]}
      fill={frontFill}
      fillOpacity={frontOpacity}
    />
    <TagPin id={`${uid}-pin2`} cx={18.8} cy={19.6} r={2.3} />
  </>
);

/** Small solid arrow of the noise field, 3 units long, centered on `at` and turned by `deg`. */
const FieldArrow: React.FC<{ at: Pt; deg: number }> = ({ at, deg }) => (
  <polygon
    points="-1.6,-0.5 0,-0.5 0,-1.25 1.6,0 0,1.25 0,0.5 -1.6,0.5"
    transform={`translate(${at[0]} ${at[1]}) rotate(${deg})`}
    fill={DARK_TEAL}
  />
);

/** Curved swap arrow: a cased orange cubic from `p0` to `p3` with an outlined head past `p3`. */
const SwapArrow: React.FC<{ p0: Pt; p1: Pt; p2: Pt; p3: Pt; tip: Pt }> = ({ p0, p1, p2, p3, tip }) => (
  <>
    <CasedStroke
      d={`M${pts([p0])} C${pts([p1, p2, p3])}`}
      color={ARROW_ORANGE}
      width={1.7}
      casing={3.1}
      linecap="butt"
    />
    <polygon
      points={pts(arrowHead(tip, p3, 3.4, 2.8))}
      fill={ARROW_ORANGE}
      stroke={TAG_OUTLINE}
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
  </>
);

/** The V glyph of Attribute VOP: outer and inner edge of one arm, mirrored at x = 15. */
const V_OUT_TOP: Pt = [10.4, 3.9];

const V_IN_TOP: Pt = [13.3, 3.9];

const V_NOTCH: Pt = [15, 6.7];

const V_TIP: Pt = [15, 10.9];

const flipX = ([x, y]: Pt): Pt => [30 - x, y];

const V_BAND_OUT = lerpPt(V_OUT_TOP, V_TIP, 0.36);

const V_BAND_IN = lerpPt(V_IN_TOP, V_NOTCH, 0.72);

const V_FLAME_OUT = lerpPt(V_OUT_TOP, V_TIP, 0.66);

/** Sloped face of the Attribute Transfer ramp: back-left, back-right, front-right, front-left (the front edge lies on the ground). */
const WEDGE_TOP: readonly [Pt, Pt, Pt, Pt] = [
  [2.2, 9],
  [11, 5],
  [21, 15.5],
  [9, 21.5],
];

const WEDGE_BALL = quadPt(WEDGE_TOP, 0.62, 0.78);

const DIE = isoBoxFaces(15, 2.9, 4.6, 4.2);

/** The three inner edges of the die that meet at its front top corner. */
const DIE_INNER = `M${pts([DIE.top[3], DIE.top[2], DIE.top[1]])} M${pts([DIE.top[2], DIE.left[2]])}`;

/**
 * Attribute operators drawn as the attribute tag: a white speech-bubble panel with a tail down to a dial ball, the operator glyph inside the panel.
 */
export const ATTRIB_TAG_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.attribute',
    label: 'Attribute Rename',
    family: 'sop',
    description:
      'The plain attribute tag: an empty white speech-bubble panel whose tail points down at a shaded grey pin at the lower left.',
    types: ['attribute'],
    icons: ['sop_attribute'],
    refKey: 'SOP_attribute',
    render: (uid) => <AttribTag uid={uid} />,
  },
  {
    id: 'sop.attribblur',
    label: 'Attribute Blur',
    family: 'sop',
    description:
      'The attribute tag with a blurred edge: the white panel has a soft dark halo of fading rings instead of a sharp outline, and the grey pin stays sharp.',
    types: ['attribblur'],
    icons: ['sop_attribblur'],
    refKey: 'SOP_attribblur',
    render: (uid) => {
      const d = tagPanelPath(10, 4, 10, 7, [11.2, 13.6], [7.4, 16.4]);
      return (
        <>
          <g fill="none" stroke={TAG_OUTLINE} strokeLinejoin="round">
            <path d={d} strokeWidth="4" strokeOpacity="0.32" />
            <path d={d} strokeWidth="2.9" strokeOpacity="0.6" />
            <path d={d} strokeWidth="1.7" />
          </g>
          <path d={d} fill={TAG_FILL} />
          <TagPin id={`${uid}-pin`} />
        </>
      );
    },
  },
  {
    id: 'sop.attribcomposite',
    label: 'Attribute Composite',
    family: 'sop',
    description:
      'Two overlapping attribute tags, each with its own grey pin; the front tag is see-through grey so the back tag shows through it.',
    types: ['attribcomposite'],
    icons: ['sop_attribcomposite'],
    refKey: 'SOP_attribcomposite',
    render: (uid) => <TwoTags uid={uid} frontFill="#89929e" frontOpacity={0.55} />,
  },
  {
    id: 'sop.attribcopy',
    label: 'Attribute Copy',
    family: 'sop',
    description:
      'Two identical white attribute tags, one overlapping the other, each pointing at its own grey pin (left and lower right).',
    types: ['attribcopy'],
    icons: ['sop_attribcopy'],
    refKey: 'SOP_attribcopy',
    render: (uid) => <TwoTags uid={uid} />,
  },
  {
    id: 'sop.attribfromparm',
    label: 'Attribute from Parameters',
    family: 'sop',
    description:
      'The attribute tag with two vertical parameter sliders inside the panel: dark tracks with grey knobs, the left knob low and the right knob high.',
    types: ['attribfromparm'],
    icons: ['sop_attribfromparm'],
    refKey: 'SOP_attribfromparm',
    render: (uid) => (
      <AttribTag uid={uid}>
        <path d="M12.8 4.1V10.5M17.4 4.1V10.5" stroke={TAG_OUTLINE} strokeWidth="1" strokeLinecap="round" />
        <rect
          x="11.2"
          y="6.9"
          width="3.2"
          height="2.4"
          rx="0.6"
          fill="#c0c7d1"
          stroke={TAG_OUTLINE}
          strokeWidth="0.8"
        />
        <rect
          x="15.8"
          y="4.9"
          width="3.2"
          height="2.4"
          rx="0.6"
          fill="#c0c7d1"
          stroke={TAG_OUTLINE}
          strokeWidth="0.8"
        />
      </AttribTag>
    ),
  },
  {
    id: 'sop.attribmirror',
    label: 'Attribute Mirror',
    family: 'sop',
    description:
      'A slanted white attribute tag with a small grey pin on the left, and its reflection in a tall grey mirror pane on the right, split by a white mirror edge.',
    types: ['attribmirror'],
    icons: ['sop_attribmirror'],
    refKey: 'SOP_attribmirror',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mir`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#89929e" />
            <stop offset="100%" stopColor="#eef2f7" />
          </linearGradient>
        </defs>
        <rect
          x="12"
          y="2.2"
          width="9.8"
          height="19.6"
          fill={`url(#${uid}-mir)`}
          stroke={TAG_OUTLINE}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d={MIRROR_TAG} fill={TAG_FILL} stroke={TAG_OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />
        <path
          d={MIRROR_TAG}
          transform="translate(24 0) scale(-1 1)"
          fill={TAG_FILL}
          stroke={TAG_OUTLINE}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <TagPin id={`${uid}-pin`} cx={8.6} cy={19.4} r={1.9} />
        <TagPin id={`${uid}-pin2`} cx={15.4} cy={19.4} r={1.9} />
        <CasedStroke d="M12 2.4V21.6" color="#ffffff" width={0.8} casing={1.7} linecap="butt" />
      </>
    ),
  },
  {
    id: 'sop.attribnoise',
    label: 'Attribute Noise',
    family: 'sop',
    description:
      'The attribute tag with a field of six small dark teal arrows inside the panel, each pointing in a different random direction.',
    types: ['attribnoise'],
    icons: ['sop_attribnoise'],
    refKey: 'SOP_attribnoise',
    render: (uid) => (
      <AttribTag uid={uid}>
        <FieldArrow at={[11.7, 5.4]} deg={40} />
        <FieldArrow at={[15.1, 5.3]} deg={180} />
        <FieldArrow at={[18.5, 5.4]} deg={-65} />
        <FieldArrow at={[11.7, 9.2]} deg={-90} />
        <FieldArrow at={[15.1, 9.2]} deg={135} />
        <FieldArrow at={[18.5, 9.2]} deg={205} />
      </AttribTag>
    ),
  },
  {
    id: 'sop.attribrandomize',
    label: 'Attribute Randomize',
    family: 'sop',
    description:
      'The attribute tag with a die inside the panel: a white and light grey cube seen from above with dark pips (one on top, two on each side).',
    types: ['attribrandomize', 'ml_attribgenerate'],
    icons: ['sop_attribrandomize', 'sop_ml_attribgenerate'],
    refKey: 'SOP_attribrandomize',
    render: (uid) => (
      <AttribTag uid={uid}>
        <polygon points={pts(DIE.left)} fill="#eef2f7" />
        <polygon points={pts(DIE.right)} fill="#c0c7d1" />
        <polygon points={pts(DIE.top)} fill="#ffffff" />
        <path d={DIE_INNER} fill="none" stroke="#89929e" strokeWidth="0.6" strokeLinejoin="round" />
        <polygon
          points={pts([DIE.top[0], DIE.top[1], DIE.right[2], DIE.right[3], DIE.left[3], DIE.top[3]])}
          fill="none"
          stroke={TAG_OUTLINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <g fill={TAG_OUTLINE}>
          <ellipse cx="15" cy="5.2" rx="1.4" ry="0.8" />
          <circle cx="11.8" cy="7.7" r="0.85" />
          <circle cx="13.6" cy="9.9" r="0.85" />
          <circle cx="16.4" cy="9.9" r="0.85" />
          <circle cx="18.2" cy="7.7" r="0.85" />
        </g>
      </AttribTag>
    ),
  },
  {
    id: 'sop.attribreorient',
    label: 'Attribute Reorient',
    family: 'sop',
    description:
      'The attribute tag with a grey metal gear with seven chunky teeth and a round hole lying over the lower left of the panel and hanging past its bottom edge.',
    types: ['attribreorient'],
    icons: ['sop_attribreorient'],
    refKey: 'SOP_attribreorient',
    render: (uid) => (
      <AttribTag uid={uid}>
        <defs>
          <radialGradient id={`${uid}-gear`} cx="38%" cy="34%" r="70%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </radialGradient>
        </defs>
        <path
          d={gearPath(14.4, 8.6, 7, 5, 3.5)}
          fill={`url(#${uid}-gear)`}
          stroke={TAG_OUTLINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <circle cx="14.4" cy="8.6" r="1.5" fill={TAG_FILL} stroke={TAG_OUTLINE} strokeWidth="0.8" />
      </AttribTag>
    ),
  },
  {
    id: 'sop.attribsort',
    label: 'Attribute Sort',
    family: 'sop',
    description: 'The attribute tag with a bold red vertical arrow with a head at both ends inside the panel.',
    types: ['attribsort'],
    icons: ['sop_attribsort'],
    refKey: 'SOP_attribsort',
    render: (uid) => (
      <AttribTag uid={uid}>
        <polygon
          points="15,3.3 17.4,5.9 15.8,5.9 15.8,8.6 17.4,8.6 15,11.2 12.6,8.6 14.2,8.6 14.2,5.9 12.6,5.9"
          fill={RED}
          stroke={TAG_OUTLINE}
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
      </AttribTag>
    ),
  },
  {
    id: 'sop.attribstringedit',
    label: 'Attribute String Edit',
    family: 'sop',
    description: 'The attribute tag with the dark letters ab inside the panel, followed by an orange text cursor bar.',
    types: ['attribstringedit'],
    icons: ['sop_attribstringedit'],
    refKey: 'SOP_attribstringedit',
    render: (uid) => (
      <AttribTag uid={uid}>
        <text x="13.7" y="9.8" textAnchor="middle" fill={TAG_OUTLINE} fontSize="7.2" fontFamily="sans-serif">
          ab
        </text>
        <rect x="18.3" y="3.9" width="1.4" height="6.7" fill={ORANGE} />
      </AttribTag>
    ),
  },
  {
    id: 'sop.attribvop',
    label: 'Attribute VOP',
    family: 'sop',
    description:
      'The attribute tag with a faceted V inside the panel: dark red at the top of both arms, orange below and a yellow flame tip at the bottom point.',
    types: ['attribvop'],
    icons: ['sop_attribvop'],
    refKey: 'SOP_attribvop',
    render: (uid) => (
      <AttribTag uid={uid}>
        <polygon
          points={pts([V_OUT_TOP, V_IN_TOP, V_NOTCH, flipX(V_IN_TOP), flipX(V_OUT_TOP), V_TIP])}
          fill={ORANGE}
          stroke={TAG_OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points={pts([V_OUT_TOP, V_IN_TOP, V_BAND_IN, V_BAND_OUT])}
          fill="#a81f18"
          stroke={TAG_OUTLINE}
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <polygon
          points={pts([V_OUT_TOP, V_IN_TOP, V_BAND_IN, V_BAND_OUT].map(flipX))}
          fill="#a81f18"
          stroke={TAG_OUTLINE}
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <polygon
          points={pts([V_FLAME_OUT, [15, 8.1], flipX(V_FLAME_OUT), V_TIP])}
          fill="#f2c438"
          stroke={TAG_OUTLINE}
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
      </AttribTag>
    ),
  },
  {
    id: 'sop.attribswap',
    label: 'Attribute Swap',
    family: 'sop',
    description:
      'Two white attribute tags without pins, one at the upper left and one in front at the lower right, with two curved orange arrows circling between them: one bending left and pointing right, one bending right and pointing left.',
    types: ['attribswap'],
    icons: ['sop_attribswap'],
    refKey: 'SOP_attribswap',
    render: () => (
      <>
        <TagPanel x={2.5} y={3} w={10.5} h={7.5} tail={[5.6, 8.6]} tip={[8.6, 15.8]} />
        <TagPanel x={10.5} y={10} w={11} h={6.8} tail={[12.6, 15.6]} tip={[13, 21.8]} />
        <SwapArrow p0={[7.6, 6.6]} p1={[3.2, 7.4]} p2={[3.2, 13.2]} p3={[8.4, 13.2]} tip={[11.6, 13.2]} />
        <SwapArrow p0={[16.6, 13.4]} p1={[21, 12.6]} p2={[21, 6.8]} p3={[15.8, 6.8]} tip={[12.6, 6.8]} />
      </>
    ),
  },
  {
    id: 'sop.attribtransfer',
    label: 'Attribute Transfer',
    family: 'sop',
    description:
      'A ramp seen from the upper right: a large white sloped face that runs down to the ground at the front, with one grey triangular side on the left. An orange stripe runs down the slope to an orange ball, and a small white tag with an orange bar at the upper right points its tail at the ball.',
    types: ['attribtransfer'],
    icons: ['sop_attribtransfer'],
    refKey: 'SOP_attribtransfer',
    render: (uid) => (
      <>
        <g stroke={TAG_OUTLINE} strokeWidth="1.1" strokeLinejoin="round">
          <polygon points={pts([WEDGE_TOP[0], WEDGE_TOP[3], [2.2, 16]])} fill="#c0c7d1" />
          <polygon points={pts(WEDGE_TOP)} fill="#eef2f7" />
        </g>
        <polygon
          points={pts([
            quadPt(WEDGE_TOP, 0.51, 0.04),
            quadPt(WEDGE_TOP, 0.73, 0.04),
            quadPt(WEDGE_TOP, 0.73, 0.8),
            quadPt(WEDGE_TOP, 0.51, 0.8),
          ])}
          fill={ORANGE}
          stroke={TAG_OUTLINE}
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <TagPanel
          x={14.8}
          y={2.2}
          w={6.9}
          h={4.8}
          tail={[16, 18]}
          tip={[r2(WEDGE_BALL[0] + 0.4), r2(WEDGE_BALL[1] - 0.8)]}
          strokeWidth={1.1}
        />
        <rect x="16.2" y="3.5" width="4.1" height="2.2" fill={ORANGE} />
        <ShadedSphere
          id={`${uid}-ball`}
          cx={r2(WEDGE_BALL[0])}
          cy={r2(WEDGE_BALL[1])}
          r={2.5}
          tones={SPHERE_TONES.orange}
          strokeWidth={1}
        />
      </>
    ),
  },
  {
    id: 'sop.attribcreate',
    label: 'Attribute Create',
    family: 'sop',
    description:
      'Shaded grey attribute pin (bottom-left) with a white speech-bubble tag whose tail points at the pin, and a bold dark plus sign inside the tag.',
    types: ['attribcreate'],
    refKey: 'SOP_attribcreate-2.0',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pin`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        <path
          d="M8.5 2.5H21.5V12H13L6.8 17.2L10 12H8.5Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d="M15 4.6V9.9M12.35 7.25H17.65" stroke="#262626" strokeWidth="2.2" />
        <circle cx="5" cy="19" r="3.2" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'sop.attribdelete',
    label: 'Attribute Delete',
    family: 'sop',
    description: 'The Attribute Create pin and speech-bubble tag, crossed out by a large red X with a dark casing.',
    types: ['attribdelete'],
    refKey: 'SOP_attribdelete',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pin`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        <path
          d="M8.5 2.5H21.5V12H13L6.8 17.2L10 12H8.5Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <circle cx="5" cy="19" r="3.2" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.2" />
        <path d="M10.5 2.5L20 12.5M20 2.5L10.5 12.5" stroke="#262626" strokeWidth="4.4" strokeLinecap="round" />
        <path d="M10.5 2.5L20 12.5M20 2.5L10.5 12.5" stroke="#e03228" strokeWidth="2.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.attribpromote',
    label: 'Attribute Promote',
    family: 'sop',
    description:
      'Two pinned speech-bubble tags (top-left and bottom-right) linked by a curved orange arrow that promotes the first tag to the second.',
    types: ['attribpromote'],
    refKey: 'SOP_attribpromote',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pin`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        {/* Source tag (top-left) */}
        <path
          d="M2 2.5H10.5V8.5H7L4.2 12.8L5 8.5H2Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="3.8" cy="15" r="2.2" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.1" />
        {/* Destination tag (bottom-right) */}
        <path
          d="M12.5 11.5H21.5V17.5H20.2L19.2 19L17.6 17.5H12.5Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="19.5" cy="20.8" r="2.2" fill={`url(#${uid}-pin)`} stroke="#262626" strokeWidth="1.1" />
        {/* Curved promote arrow */}
        <path d="M8.5 5.5C12 1.5 18 2.5 17.5 7.8" fill="none" stroke="#262626" strokeWidth="4" strokeLinecap="round" />
        <path
          d="M8.5 5.5C12 1.5 18 2.5 17.5 7.8"
          fill="none"
          stroke="#ee7a24"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <polygon
          points="14.8,7.6 20.2,7.6 17.5,11"
          fill="#ee7a24"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.attribwrangle',
    label: 'Attribute Wrangle',
    family: 'sop',
    description:
      'Yellow cowboy hat (crown, dark hat band, wide darker brim) with a white sheriff star, plus a white speech bubble in the bottom-right corner.',
    types: ['attribwrangle'],
    matches: (q) => q.baseType.includes('wrangle'),
    refKey: 'SOP_attribwrangle',
    sizePx: 22,
    render: () => (
      <>
        {/* Hat Brim */}
        <path
          d="M1.8 12.2C2.2 9.4 7.5 8.4 12.5 8.6C17 8.8 20.6 9.8 20.3 11.8C19.9 14.4 13.5 16.4 8.2 16.1C4.5 15.9 1.6 14.3 1.8 12.2Z"
          fill="#d4a012"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Hat Crown */}
        <path
          d="M6.2 11.2C5.6 6.6 7.8 2.8 10.8 3.1C11.8 3.2 12.4 3.9 13.1 3.5C15.5 2.6 17.1 6 16.6 10.6C14 12.3 9 12.6 6.2 11.2Z"
          fill="#ebbf1a"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Hat Band */}
        <path d="M6.3 10C9.2 11.3 13.6 11.1 16.7 9.4" fill="none" stroke="#262626" strokeWidth="1.6" />
        {/* Sheriff Star Badge */}
        <polygon
          points="11,4.4 11.8,6 13.5,6.2 12.2,7.4 12.6,9.1 11,8.2 9.4,9.1 9.8,7.4 8.5,6.2 10.2,6"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* White Speech Bubble */}
        <path
          d="M12.5 14H21.5V19.5H17.5L14.5 22L15.2 19.5H12.5Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
