import type { FC } from 'react';
import type { OperatorIconDef } from '../../iconTypes';

/** Colors of a block brick: For-Each blocks are blue, Compile blocks red. */
interface BrickColors {
  outline: string;
  /** Body and the tab on top. */
  body: string;
  /** Shadowed right side. */
  side: string;
  /** Lit face (bottom of Block Begin, top of Block End). */
  face: string;
  /** Socket ring of Block Begin. */
  socket: string;
  socketRing: string;
  /** Round stud of Block End. */
  stud: string;
}

const FOR_EACH_BRICK: BrickColors = {
  outline: '#182b49',
  body: '#296ec2',
  side: '#1f5aa3',
  face: '#5da4f5',
  socket: '#1f4f8a',
  socketRing: '#a8d4ff',
  stud: '#7ebcff',
};

/**
 * The palette's three-tone red with the core outline, matching Houdini's Compile Block bricks
 * so they stand out cleanly against yellow Compile Block nodes.
 */
const COMPILE_BRICK: BrickColors = {
  outline: '#262626',
  body: '#e03228',
  side: '#a81f18',
  face: '#ff7066',
  socket: '#a81f18',
  socketRing: '#262626',
  stud: '#ff7066',
};

/** Brick seen from below: body, lighter bottom face with a socket ring, small square tab on top. */
const BlockBeginBrick: FC<{ colors: BrickColors; tab: string }> = ({ colors: c, tab }) => (
  <>
    {/* Top tab */}
    <rect x="9" y="3" width="6" height="4.5" fill={tab} stroke={c.outline} strokeWidth="1.1" />
    {/* Brick body */}
    <polygon
      points="4.5,17 12,20.5 19.5,17 19.5,9.5 12,6 4.5,9.5"
      fill={c.body}
      stroke={c.outline}
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <polygon points="19.5,9.5 12,6 12,13.5 19.5,17" fill={c.side} />
    <line x1="12" y1="6" x2="12" y2="13.5" stroke={c.outline} strokeWidth="1" />
    {/* Bottom face with socket ring */}
    <polygon
      points="4.5,17 12,13.5 19.5,17 12,20.5"
      fill={c.face}
      stroke={c.outline}
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
    <ellipse cx="12" cy="17" rx="3.8" ry="1.7" fill={c.socket} stroke={c.socketRing} strokeWidth="1.1" />
  </>
);

/** Brick seen from above with a round stud on top (light top face, darker sides). */
const BlockEndBrick: FC<{ colors: BrickColors }> = ({ colors: c }) => (
  <>
    <polygon
      points="4.5,10 12,6.5 19.5,10 19.5,17.5 12,21 4.5,17.5"
      fill={c.body}
      stroke={c.outline}
      strokeWidth="1.2"
    />
    <polygon points="4.5,10 12,13.5 19.5,10 12,6.5" fill={c.face} />
    <line x1="12" y1="13.5" x2="12" y2="21" stroke={c.outline} strokeWidth="1" />
    <ellipse cx="12" cy="6.5" rx="3.8" ry="2" fill={c.stud} stroke={c.outline} strokeWidth="1.1" />
  </>
);

/**
 * For-Each and Compile block operators.
 */
export const BLOCK_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.block_begin',
    label: 'Block Begin',
    family: 'sop',
    description:
      'Blue brick seen from below: dark blue body, lighter bottom face with a socket ring, and a small square tab on top.',
    types: ['block_begin'],
    refKey: 'SOP_block_begin',
    render: () => <BlockBeginBrick colors={FOR_EACH_BRICK} tab="#2e74c4" />,
  },
  {
    id: 'sop.block_end',
    label: 'Block End',
    family: 'sop',
    description: 'Blue toy brick seen from above with a round stud on top (light top face, darker sides).',
    types: ['block_end'],
    refKey: 'SOP_block_end',
    render: () => <BlockEndBrick colors={FOR_EACH_BRICK} />,
  },
  {
    id: 'sop.compile_begin',
    label: 'Compile Block Begin',
    family: 'sop',
    description:
      'The Block Begin brick in red: brick seen from below with a lighter bottom face, a socket ring and a small square tab on top.',
    types: ['compile_begin'],
    refKey: 'SOP_compile_begin',
    render: () => <BlockBeginBrick colors={COMPILE_BRICK} tab={COMPILE_BRICK.body} />,
  },
  {
    id: 'sop.compile_end',
    label: 'Compile Block End',
    family: 'sop',
    description:
      'The Block End brick in red: brick seen from above with a round stud on top (light top face, darker sides).',
    types: ['compile_end'],
    refKey: 'SOP_compile_end',
    render: () => <BlockEndBrick colors={COMPILE_BRICK} />,
  },
  {
    id: 'sop.each',
    label: 'Each',
    family: 'sop',
    description: 'Curved grey loop arrow arching over the top and pointing down-right.',
    types: ['each'],
    icons: ['sop_each'],
    refKey: 'SOP_each',
    render: () => (
      <path
        d="M4.5,16.5 C2.5,9.5 8,4.5 14,5.5 C16.5,6 18.2,7.5 19.2,9.5 L21.2,8.2 L20.8,14.5 L15.2,12 L16.8,10.8 C15.8,9.2 14,8.2 11.8,8.2 C7.8,8.2 5.5,11.5 6.5,15.5 Z"
        fill="#c0c7d1"
        stroke="#262626"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'sop.invoke',
    label: 'Invoke Compiled Block',
    family: 'sop',
    description: 'Golden-yellow 3D lightning bolt with warm orange bevels.',
    types: ['invoke'],
    icons: ['sop_invoke'],
    refKey: 'SOP_invoke',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-inv-f`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff97a" />
            <stop offset="55%" stopColor="#ffd815" />
            <stop offset="100%" stopColor="#f57900" />
          </linearGradient>
        </defs>
        <polygon
          points="15.4,2 4.2,13.2 12.2,14 7,22.2 20.4,10.6 12,9.8"
          fill="#ce5c00"
          stroke="#773500"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polygon
          points="14.8,1.8 3.8,12.6 11.8,13.4 6.6,21.6 19.6,10.2 11.4,9.4"
          fill={`url(#${uid}-inv-f)`}
          stroke="#ce5c00"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polyline
          points="13.8,3.6 5.4,12.1 12.4,12.8 8.2,19.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.65"
          strokeOpacity="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
