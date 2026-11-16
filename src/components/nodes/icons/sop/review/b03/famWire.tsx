import React from 'react';
import type { OperatorIconDef } from '../../../iconTypes';
import { arrowHead, cubicAt, pts, type Pt } from '../../../geoHelpers';
import { CasedStroke } from '../../../geoKits';

/**
 * Batch 3, family "Wire" (family-first icon workflow, `docs/ICON_ART_BIBLE.md` section 9).
 * Wire Capture and Wire Deform share `WireGuide`: an orange rest curve lying on a grey sheet, a
 * red deformer curve floating above it and orange dotted drop lines joining them. Wire is the
 * blue tube with its grey core wire; Wire Blend fans grey wires under a hot red to yellow arrow.
 */

type Cubic = readonly [Pt, Pt, Pt, Pt];
const cubicD = ([a, b, c, d]: Cubic) => `M${pts([a])} C${pts([b, c, d])}`;
const shift = (c: Cubic, dx: number, dy: number): Cubic => c.map(([x, y]) => [x + dx, y + dy] as Pt) as unknown as Cubic;

/** Sheet gradient: lit grey top fading to the shadowed right. */
const SheetGradient: React.FC<{ id: string }> = ({ id }) => (
  <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor="#ffffff" />
    <stop offset="60%" stopColor="#c0c7d1" />
    <stop offset="100%" stopColor="#89929e" />
  </linearGradient>
);

/**
 * Shared kit: orange rest curve, red deformer curve above it and orange dotted lines joining
 * `drops` evenly spaced samples of the two curves.
 */
const WireGuide: React.FC<{ rest: Cubic; wire: Cubic; drops?: number }> = ({ rest, wire, drops = 7 }) => {
  const samples = Array.from({ length: drops }, (_, i) => (i + 0.5) / drops);
  return (
    <>
      <g stroke="#ee8624" strokeWidth="0.7" strokeDasharray="0.9 0.7" strokeLinecap="butt">
        {samples.map((t) => {
          const a = cubicAt(...rest, t);
          const b = cubicAt(...wire, t);
          return <path key={t} d={`M${pts([b])} L${pts([a])}`} />;
        })}
      </g>
      <CasedStroke d={cubicD(rest)} color="#ee8624" width={1.3} casing={2.1} />
      <CasedStroke d={cubicD(wire)} color="#e03228" width={1.5} casing={2.4} />
    </>
  );
};

/** Batch 3: Wire family. */
export const FAMILY_WIRE: OperatorIconDef[] = [
  {
    id: 'sop.wire',
    label: 'Wire',
    family: 'sop',
    description:
      'Glossy blue tube curving from the lower left up to the right, open at both ends, with a grey core wire sticking out of each end.',
    types: ['wire'],
    icons: ['sop_wire'],
    refKey: 'SOP_wire',
    render: (uid) => {
      const tube = 'M5.4,15.6 C7.2,10.8 12.4,7.2 18,7.4';
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-wi-hl`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c4dcff" />
              <stop offset="100%" stopColor="#8fc2ff" />
            </linearGradient>
          </defs>
          {/* Core wire out of the lower end */}
          <CasedStroke d="M5.4,15.6 L3.2,21" color="#c0c7d1" width={1} casing={1.9} linecap="butt" />
          {/* Tube body: outline, blue body, highlight */}
          <path d={tube} fill="none" stroke="#262626" strokeWidth="6.4" strokeLinecap="butt" />
          <path d={tube} fill="none" stroke="#3672c4" strokeWidth="4.8" strokeLinecap="butt" />
          <path d="M6.4,14.4 C8.2,10.6 12.4,7.8 17.4,7.6" fill="none" stroke={`url(#${uid}-wi-hl)`} strokeWidth="1.3" strokeLinecap="round" transform="translate(-0.9 -0.9)" />
          {/* Lower open end */}
          <ellipse cx="5.4" cy="15.6" rx="2.9" ry="1.3" transform="rotate(20 5.4 15.6)" fill="#2e74c4" stroke="#262626" strokeWidth="0.85" />
          <ellipse cx="5.4" cy="15.6" rx="1.6" ry="0.65" transform="rotate(20 5.4 15.6)" fill="#262626" />
          {/* Upper end cap and core wire */}
          <ellipse cx="18" cy="7.4" rx="1.2" ry="3.1" transform="rotate(4 18 7.4)" fill="#5aa2f2" stroke="#262626" strokeWidth="0.85" />
          <CasedStroke d="M18.6,7.4 L21.6,7.4" color="#c0c7d1" width={1} casing={1.9} linecap="butt" />
        </>
      );
    },
  },
  {
    id: 'sop.wireblend',
    label: 'Wire Blend',
    family: 'sop',
    description:
      'Fan of grey wires rising from the bottom and bending toward the right, under a thick curved arrow that runs from red at the left to yellow at its head on the right.',
    types: ['wireblend'],
    icons: ['sop_wireblend'],
    refKey: 'SOP_wireblend',
    render: (uid) => {
      const wires: [string, string][] = [
        ['M3,21.6 Q3.4,15.6 6.2,12.6', '#eef2f7'],
        ['M7.4,21.6 Q7.4,15.4 9.6,12.2', '#c0c7d1'],
        ['M11.6,21.6 Q11.8,15.2 12.8,12', '#89929e'],
        ['M15.4,21.6 Q15.6,15.6 17.4,12.6', '#5a616b'],
        ['M19.2,21.6 Q19.2,16.4 21.2,13.8', '#3a3f47'],
      ];
      const arc = 'M2.6,9.8 C6.6,4.6 12.8,3.6 17.4,5.8';
      const head = arrowHead([21.6, 8.2], [16.6, 5.4], 4.6, 2.9);
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-wb-ar`} gradientUnits="userSpaceOnUse" x1="2.6" y1="8" x2="21.6" y2="7">
              <stop offset="0%" stopColor="#e03228" />
              <stop offset="60%" stopColor="#ee8624" />
              <stop offset="100%" stopColor="#ffe47a" />
            </linearGradient>
          </defs>
          {wires.map(([d, c]) => (
            <CasedStroke key={d} d={d} color={c} width={1.1} casing={2} />
          ))}
          <path d={arc} fill="none" stroke="#262626" strokeWidth="3.6" strokeLinecap="round" />
          <polygon points={pts(head)} fill={`url(#${uid}-wb-ar)`} stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
          <path d={arc} fill="none" stroke={`url(#${uid}-wb-ar)`} strokeWidth="2.2" strokeLinecap="round" />
        </>
      );
    },
  },
  {
    id: 'sop.wirecapture',
    label: 'Wire Capture',
    family: 'sop',
    description:
      'Flat grey sheet in perspective with an orange rest curve on it, a red wire floating above and orange dotted lines dropping from the red wire to the orange curve.',
    types: ['wirecapture'],
    icons: ['sop_wirecapture'],
    refKey: 'SOP_wirecapture',
    render: (uid) => {
      const rest: Cubic = [
        [4.6, 16.2],
        [8.6, 15],
        [13, 13.8],
        [17.4, 12.6],
      ];
      return (
        <>
          <defs>
            <SheetGradient id={`${uid}-wc-sheet`} />
          </defs>
          <polygon points="1.8,16 15.6,11.6 22.2,15.6 8.4,20.6" fill={`url(#${uid}-wc-sheet)`} stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
          <WireGuide rest={rest} wire={shift(rest, 0, -8)} />
        </>
      );
    },
  },
  {
    id: 'sop.wiredeform',
    label: 'Wire Deform',
    family: 'sop',
    description:
      'Grey sheet bent up into a hump, with an orange curve along it, a red wire arching higher above and orange dotted lines joining the two.',
    types: ['wiredeform'],
    icons: ['sop_wiredeform'],
    refKey: 'SOP_wiredeform',
    render: (uid) => {
      const front: Cubic = [
        [1.8, 18.8],
        [6.4, 13.4],
        [10.6, 13.8],
        [16.4, 21.2],
      ];
      const back = shift(front, 5.6, -3.2);
      const sheet = `${cubicD(front)} L${pts([back[3]])} C${pts([back[2], back[1], back[0]])} Z`;
      const rest = shift(front, 2.9, -1.7);
      const wire: Cubic = [
        [rest[0][0], rest[0][1] - 5.6],
        [rest[1][0], rest[1][1] - 11],
        [rest[2][0], rest[2][1] - 9],
        [rest[3][0], rest[3][1] - 8.4],
      ];
      return (
        <>
          <defs>
            <SheetGradient id={`${uid}-wd-sheet`} />
          </defs>
          <path d={sheet} fill={`url(#${uid}-wd-sheet)`} stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
          <WireGuide rest={rest} wire={wire} />
        </>
      );
    },
  },
];
