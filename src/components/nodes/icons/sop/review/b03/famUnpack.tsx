import type { OperatorIconDef } from '../../../iconTypes';
import { pts, type Pt } from '../../../geoHelpers';
import { CursorArrow, SPHERE_TONES, ShadedSphere } from '../../../geoKits';
import { KinefxMannequinBase } from '../../familyKits';
import { FOLDER_ARROW_POINTS, FOLDER_BACK_PATH, FOLDER_SHEET_POINTS, OpenSuitcase } from '../b02/sharedElements';

/**
 * Batch 3 pilot, family "Unpack" (drawn with the family-first icon workflow, see
 * `docs/ICON_ART_BIBLE.md` section 9). Unpack, Unpack Points and Unpack USD reuse the Pack family
 * `OpenSuitcase` unchanged, placed smaller at the lower left (`UNPACK_CASE`) so their contents can
 * visibly leave it toward the upper right. Unpack Folder reuses the Pack Folder folder and block
 * arrow with the arrow turned around to point out of the folder.
 */

/** Shared placement of the suitcase in the Unpack icons: smaller and lower left. */
const UNPACK_CASE = 'translate(0.4 2.6) scale(0.82)';
const UNPACK_LINES = 1 / 0.82;

/** Square hollow USD layer frame (slight perspective) with its top-left corner at `(x, y)`. */
const LayerFrame = (x: number, y: number, rim: string, hole: string) => {
  const outer: Pt[] = [
    [x, y],
    [x + 7, y - 1],
    [x + 7, y + 6],
    [x, y + 7],
  ];
  const inner: Pt[] = [
    [x + 1.6, y + 1.4],
    [x + 5.4, y + 0.85],
    [x + 5.4, y + 4.9],
    [x + 1.6, y + 5.45],
  ];
  const poly = (p: Pt[]) => `M${pts(p).replace(/ /g, ' L')} Z`;
  return (
    <g strokeLinejoin="round">
      <polygon points={pts(inner)} fill={hole} />
      <path d={`${poly(outer)} ${poly(inner)}`} fill={rim} fillRule="evenodd" stroke="#262626" strokeWidth="0.9" />
    </g>
  );
};

/** Batch 3 pilot: Unpack family. */
export const FAMILY_UNPACK: OperatorIconDef[] = [
  {
    id: 'sop.unpack',
    label: 'Unpack',
    family: 'sop',
    description:
      'Open brown and gold suitcase at the lower left holding a blue cylinder, with a glossy yellow sphere lifted out at the upper right and a white mouse cursor on it.',
    types: ['unpack'],
    icons: ['sop_unpack'],
    refKey: 'SOP_unpack',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-up-cyl`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8fc2ff" />
            <stop offset="100%" stopColor="#3672c4" />
          </linearGradient>
        </defs>
        <OpenSuitcase uid={uid} transform={UNPACK_CASE} lineScale={UNPACK_LINES}>
          <path d="M6.4,6.2 L6.4,11.8 A1.9,0.9 0 0,0 10.2,11.8 L10.2,6.2 Z" fill={`url(#${uid}-up-cyl)`} stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
          <ellipse cx="8.3" cy="6.2" rx="1.9" ry="0.9" fill="#c4dcff" stroke="#262626" strokeWidth="0.9" />
        </OpenSuitcase>
        <ShadedSphere id={`${uid}-up-ball`} cx={17.4} cy={5.4} r={3.4} tones={SPHERE_TONES.yellow} strokeWidth={1} />
        <CursorArrow x={17.8} y={6.6} s={0.85} />
      </>
    ),
  },
  {
    id: 'sop.unpackfolder',
    label: 'Unpack Folder',
    family: 'sop',
    description:
      'The Pack Folder purple folder and white front sheet with its orange block arrow turned around to point out toward the upper left, and the blue mannequin figure at the right.',
    types: ['unpackfolder'],
    icons: ['sop_unpackfolder'],
    refKey: 'SOP_unpackfolder',
    render: () => (
      <>
        <path d={FOLDER_BACK_PATH} fill="#c084d8" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
        <polygon points={FOLDER_ARROW_POINTS} transform="rotate(180 9.2 8)" fill="#ee8624" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        <polygon points={FOLDER_SHEET_POINTS} fill="#f2f4f7" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
        <KinefxMannequinBase cx={16.6} cy={15.2} scale={0.62} />
      </>
    ),
  },
  {
    id: 'sop.unpackpoints',
    label: 'Unpack Points',
    family: 'sop',
    description:
      'Open brown and gold suitcase at the lower left with glossy silver point spheres flying out of it in an arc toward the upper right, and a white mouse cursor beside them.',
    types: ['unpackpoints'],
    icons: ['sop_unpackpoints'],
    refKey: 'SOP_unpackpoints',
    render: (uid) => {
      const balls: Pt[] = [
        [8, 10.6],
        [11.4, 8.2],
        [14.6, 6.2],
        [17.6, 4.6],
        [19.6, 8.2],
      ];
      return (
        <>
          <OpenSuitcase uid={uid} transform={UNPACK_CASE} lineScale={UNPACK_LINES} />
          {balls.map(([x, y], i) => (
            <ShadedSphere key={`${x}-${y}`} id={`${uid}-upp-${i}`} cx={x} cy={y} r={2.1} />
          ))}
          <CursorArrow x={16.6} y={10.4} s={0.85} />
        </>
      );
    },
  },
  {
    id: 'sop.unpackusd',
    label: 'Unpack USD',
    family: 'sop',
    description:
      'Open brown and gold suitcase at the lower left with three bright blue hollow square USD layer frames stacked out of it toward the upper right.',
    types: ['unpackusd'],
    icons: ['sop_unpackusd'],
    refKey: 'SOP_unpackusd',
    render: (uid) => (
      <>
        <OpenSuitcase uid={uid} transform={UNPACK_CASE} lineScale={UNPACK_LINES} />
        {LayerFrame(14.2, 3.2, '#8fc2ff', '#ffffff')}
        {LayerFrame(12.2, 5.2, '#5aa2f2', '#eef2f7')}
        {LayerFrame(10.2, 7.2, '#5aa2f2', '#c4dcff')}
      </>
    ),
  },
];
