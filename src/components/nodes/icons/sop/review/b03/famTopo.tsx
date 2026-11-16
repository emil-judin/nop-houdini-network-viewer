import React from 'react';
import type { OperatorIconDef } from '../../../iconTypes';
import type { Pt } from '../../../geoHelpers';
import { StraightArrow } from '../../../geoKits';

/**
 * Batch 3, family "Topo" (family-first icon workflow, `docs/ICON_ART_BIBLE.md` section 9).
 * Topo Flow, Topo Flow Sample and Topo Slide By Curve Refs share `FaceMask`, a generic smooth blue
 * face mask (no real person) lit from the upper left, with black landmark dots where the operator
 * matches landmarks. Topo Transfer splits a head into a profile half and a front half in the same
 * blues; Topo Landmark is the red and white lighthouse from its reference.
 */

/** Face mask outline in local units: about 7.4 wide and 9.2 high, centered on the origin. */
const MASK_PATH =
  'M0,-4.6 C2.8,-4.6 3.8,-2.6 3.7,-0.6 C3.6,1.6 2.6,3.6 1.4,4.4 C0.8,4.8 -0.8,4.8 -1.4,4.4 C-2.6,3.6 -3.6,1.6 -3.7,-0.6 C-3.8,-2.6 -2.8,-4.6 0,-4.6 Z';

/** Landmark dot sets in local mask units: a sparse and a dense layout. */
const DOTS_SPARSE: Pt[] = [
  [-1.7, -2.4],
  [1.7, -2.4],
  [-1.5, -0.6],
  [1.5, -0.6],
  [0, 0.9],
  [-2.4, 1.2],
  [2.4, 1.2],
  [-0.9, 2.6],
  [0.9, 2.6],
  [0, 3.7],
];
const DOTS_DENSE: Pt[] = [
  ...DOTS_SPARSE,
  [0, -3.2],
  [-2.8, -1.2],
  [2.8, -1.2],
  [0, -1.2],
  [-1.6, 3.4],
  [1.6, 3.4],
];

/** Radial blue gradient for the masks: highlight at the upper left. */
const MaskGradient: React.FC<{ id: string; dark?: boolean }> = ({ id, dark = false }) => (
  <radialGradient id={id} cx="36%" cy="30%" r="75%">
    <stop offset="0%" stopColor={dark ? '#8fc2ff' : '#c4dcff'} />
    <stop offset="55%" stopColor={dark ? '#5aa2f2' : '#8fc2ff'} />
    <stop offset="100%" stopColor="#3672c4" />
  </radialGradient>
);

/**
 * Shared kit: smooth blue face mask with eye sockets, nose and mouth lines, and optional black
 * landmark dots. `s` scales the local mask; strokes keep their icon-unit widths.
 */
const FaceMask: React.FC<{
  uid: string;
  name: string;
  cx: number;
  cy: number;
  s: number;
  dots?: readonly Pt[];
  dotR?: number;
  children?: React.ReactNode;
}> = ({ uid, name, cx, cy, s, dots = [], dotR = 0.42, children }) => {
  const k = 1 / s;
  const gid = `${uid}-${name}-mask`;
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <defs>
        <MaskGradient id={gid} />
      </defs>
      <path d={MASK_PATH} fill={`url(#${gid})`} stroke="#262626" strokeWidth={0.95 * k} strokeLinejoin="round" />
      <g fill="none" stroke="#2e74c4" strokeWidth={0.6 * k} strokeLinecap="round">
        <path d="M-2.4,-0.7 Q-1.5,-1.5 -0.6,-0.7" />
        <path d="M0.6,-0.7 Q1.5,-1.5 2.4,-0.7" />
        <path d="M0,-0.4 L0.4,1.5 L-0.3,1.7" />
        <path d="M-1.1,2.8 Q0,3.3 1.1,2.8" />
      </g>
      {dots.map(([x, y]) => (
        <circle key={`${x},${y}`} cx={x} cy={y} r={dotR * k} fill="#262626" />
      ))}
      {children}
    </g>
  );
};

/** Batch 3: Topo family. */
export const FAMILY_TOPO: OperatorIconDef[] = [
  {
    id: 'sop.topoflow',
    label: 'Topo Flow',
    family: 'sop',
    description:
      'Two smooth light blue face masks side by side, each marked with a pattern of black landmark dots, the right one with more dots than the left.',
    types: ['topoflow'],
    icons: ['sop_topoflow'],
    refKey: 'SOP_topoflow',
    render: (uid) => (
      <>
        <FaceMask uid={uid} name="a" cx={6.6} cy={12} s={1.22} dots={DOTS_SPARSE} />
        <FaceMask uid={uid} name="b" cx={17.4} cy={12} s={1.22} dots={DOTS_DENSE} />
      </>
    ),
  },
  {
    id: 'sop.topoflowsample',
    label: 'Topo Flow Sample',
    family: 'sop',
    description: 'One large smooth light blue face mask covered with a dense pattern of black landmark dots.',
    types: ['topoflowsample'],
    icons: ['sop_topoflowsample'],
    refKey: 'SOP_topoflowsample',
    render: (uid) => <FaceMask uid={uid} name="a" cx={12} cy={12} s={2.1} dots={DOTS_DENSE} dotR={0.62} />,
  },
  {
    id: 'sop.topolandmark',
    label: 'Topo Landmark',
    family: 'sop',
    description:
      'Red and white striped lighthouse tower with a glowing yellow lantern room and a red dome, standing on a gold plinth.',
    types: ['topolandmark'],
    icons: ['sop_topolandmark'],
    refKey: 'SOP_topolandmark',
    render: (uid) => {
      const tower = '10.2,8.6 13.8,8.6 15.1,19.2 8.9,19.2';
      return (
        <>
          <defs>
            <clipPath id={`${uid}-lh-tower`}>
              <polygon points={tower} />
            </clipPath>
          </defs>
          {/* Plinth */}
          <polygon points="5.6,19.6 12,17.6 18.4,19.6 18.4,20.6 12,22.6 5.6,20.6" fill="#d49a18" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
          <polygon points="5.6,19.6 12,17.6 18.4,19.6 12,21.6" fill="#f2c438" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
          {/* Striped tower, darker on the right */}
          <polygon points={tower} fill="#f2f4f7" />
          <g clipPath={`url(#${uid}-lh-tower)`}>
            <rect x="8" y="8.6" width="8" height="2.2" fill="#e03228" />
            <rect x="8" y="12.9" width="8" height="2.2" fill="#e03228" />
            <rect x="8" y="17.2" width="8" height="2.2" fill="#e03228" />
            <polygon points="12.6,8 17,8 17,20 13.4,20" fill="#262626" fillOpacity="0.2" />
          </g>
          <polygon points={tower} fill="none" stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
          {/* Lantern room, gallery and dome */}
          <rect x="10.4" y="4.8" width="3.2" height="3.4" fill="#ffe47a" stroke="#262626" strokeWidth="0.85" />
          <path d="M12,4.8 L12,8.2" stroke="#d49a18" strokeWidth="0.7" />
          <rect x="9.3" y="7.9" width="5.4" height="1.2" rx="0.3" fill="#3a3f47" stroke="#262626" strokeWidth="0.7" />
          <path d="M10,4.9 Q12,1.8 14,4.9 Z" fill="#e03228" stroke="#262626" strokeWidth="0.85" strokeLinejoin="round" />
          <path d="M12,3 L12,1.6" stroke="#262626" strokeWidth="0.8" strokeLinecap="round" />
        </>
      );
    },
  },
  {
    id: 'sop.toposlidebycurverefs',
    label: 'Topo Slide By Curve Refs',
    family: 'sop',
    description:
      'Smooth light blue face mask with a tan ear at the left, red lips and a green arrow sliding right across the cheek.',
    types: ['toposlidebycurverefs'],
    icons: ['sop_toposlidebycurverefs'],
    refKey: 'SOP_toposlidebycurverefs',
    render: (uid) => (
      <>
        <path d="M3.8,9.2 Q2.2,10.8 3.4,13.4 Q4.4,14.4 5.4,13.6 L5.2,9.6 Z" fill="#ffb066" stroke="#262626" strokeWidth="0.85" strokeLinejoin="round" />
        <FaceMask uid={uid} name="a" cx={12.4} cy={11.6} s={2.05}>
          <ellipse cx="0" cy="2.85" rx="1.15" ry="0.5" fill="#e03228" stroke="#262626" strokeWidth={0.6 / 2.05} />
        </FaceMask>
        <StraightArrow from={[6.4, 13.4]} tip={[17.4, 13.4]} color="#58c848" width={1.8} head={3.4} />
      </>
    ),
  },
  {
    id: 'sop.topotransfer',
    label: 'Topo Transfer',
    family: 'sop',
    description:
      'Blue head split down the middle: a light blue profile facing left on the left half and a darker blue front view on the right half, both with dark blue hair.',
    types: ['topotransfer'],
    icons: ['sop_topotransfer'],
    refKey: 'SOP_topotransfer',
    render: (uid) => {
      const profile =
        'M11.6,3.2 C8.4,3.2 6,4.6 5.4,7.4 L4.6,9.6 L2.6,11.8 L4.2,12.6 L3.8,13.6 L4.4,14.2 L4,15 C4.4,16.8 5.6,17.6 8,18 L8.4,20.8 L11.6,20.8 Z';
      const front =
        'M11.6,3.2 C16.4,3.2 20.6,5.2 20.6,10.4 C20.6,14.4 18.6,17.6 15.4,18.4 L15,20.8 L11.6,20.8 Z';
      return (
        <>
          <defs>
            <MaskGradient id={`${uid}-tt-l`} />
            <MaskGradient id={`${uid}-tt-r`} dark />
          </defs>
          <path d={front} fill={`url(#${uid}-tt-r)`} stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
          <path d={profile} fill={`url(#${uid}-tt-l)`} stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" />
          {/* Hair caps */}
          <path d="M11.6,3.2 C8.4,3.2 6,4.6 5.4,7.4 Q8,6 11.6,6.6 Z" fill="#3672c4" stroke="#262626" strokeWidth="0.8" strokeLinejoin="round" />
          <path d="M11.6,3.2 C16.4,3.2 20.6,5.2 20.6,9.2 Q17,6.2 11.6,6.6 Z" fill="#2e74c4" stroke="#262626" strokeWidth="0.8" strokeLinejoin="round" />
          {/* Features */}
          <ellipse cx="6.8" cy="10" rx="0.75" ry="0.45" fill="#262626" />
          <ellipse cx="15.4" cy="10.4" rx="1" ry="0.55" fill="#262626" />
          <ellipse cx="19" cy="10.4" rx="0.7" ry="0.5" fill="#262626" />
          <path d="M17.2,11 L17.6,13.6 L16.8,13.8" fill="none" stroke="#262626" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.8,15.6 Q17,16.2 18.2,15.6" fill="none" stroke="#262626" strokeWidth="0.6" strokeLinecap="round" />
          <path d="M11.6,3.2 L11.6,20.8" stroke="#262626" strokeWidth="0.9" />
        </>
      );
    },
  },
];
