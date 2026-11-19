import React from 'react';
import { isoBoxFaces, type Pt, pts, quadPt } from '../../geoHelpers';
import { ShadedSphere, SPHERE_TONES } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { SolverBrain } from '../kits/solverBrain';

/** Spec for one detached water droplet in `WaterDroplets`. */
interface DropSpec {
  cx: number;
  cy: number;
  r: number;
  light?: boolean;
}

/**
 * Shared radial water gradient (`#c4e3ff` -> `#5aa2f2` -> `#2e74c4`) matching the approved
 * `sop.shallowwatersolver` anchor. `id` must be prefixed with `uid`.
 */
const WaterGradientDefs: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    <radialGradient id={id} cx="42%" cy="38%" r="62%">
      <stop offset="0%" stopColor="#c4e3ff" />
      <stop offset="55%" stopColor="#5aa2f2" />
      <stop offset="100%" stopColor="#2e74c4" />
    </radialGradient>
  </defs>
);

/**
 * Shared detached sky-blue water droplets with `#262626` outlines.
 */
const WaterDroplets: React.FC<{ drops: readonly DropSpec[] }> = ({ drops }) => (
  <>
    {drops.map((d, idx) => (
      <circle
        key={idx}
        cx={d.cx}
        cy={d.cy}
        r={d.r}
        fill={d.light ? '#8fc2ff' : '#5aa2f2'}
        stroke="#262626"
        strokeWidth="0.7"
      />
    ))}
  </>
);

/**
 * Shared layered white-foam and light-blue water splash crown centered near `(0, 0)` in local
 * coordinates. Used by `sop.flipcollide`.
 */
const SplashCrown: React.FC<{
  cx: number;
  cy: number;
  scale?: number;
  rotate?: number;
}> = ({ cx, cy, scale = 1, rotate = 0 }) => {
  const transform =
    rotate === 0
      ? `translate(${cx}, ${cy}) scale(${scale})`
      : `translate(${cx}, ${cy}) rotate(${rotate}) scale(${scale})`;
  return (
    <g transform={transform} strokeLinejoin="round">
      <path
        d="M-5.4,2.2 C-6.8,0.2 -6.2,-2.4 -4.0,-3.4 C-4.4,-5.0 -2.8,-6.0 -1.4,-4.5 C-0.8,-6.4 1.4,-6.4 2.0,-4.2 C3.4,-5.4 5.0,-4.2 4.2,-2.0 C5.8,-1.4 6.0,0.8 4.6,2.2 C2.0,3.2 -2.2,3.2 -5.4,2.2 Z"
        fill="#8fc2ff"
        stroke="#262626"
        strokeWidth={0.9 / scale}
      />
      <path
        d="M-3.7,1.6 C-4.4,0.1 -3.8,-1.7 -2.3,-2.3 C-2.3,-3.5 -1.2,-3.9 -0.4,-2.9 C0.2,-4.1 1.7,-3.9 1.9,-2.3 C2.9,-2.9 3.7,-1.7 2.9,-0.2 C3.9,0.4 3.7,1.6 2.5,2.0 C0.6,2.4 -1.8,2.4 -3.7,1.6 Z"
        fill="#ffffff"
        stroke="none"
      />
    </g>
  );
};

/**
 * Shared VDB particle-fluid cell: a white volume halo with a dotted dark outline enclosing a
 * shaded cobalt sphere. Used by `sop.vdbfromparticlefluid`.
 */
const VdbFluidCell: React.FC<{
  id: string;
  cx: number;
  cy: number;
}> = ({ id, cx, cy }) => (
  <>
    <circle cx={cx} cy={cy} r="3.35" fill="#ffffff" stroke="#262626" strokeWidth="1.0" strokeDasharray="1.45 1.05" />
    <ShadedSphere id={id} cx={cx} cy={cy} r={1.45} tones={SPHERE_TONES.blue} strokeWidth={0.8} />
  </>
);

/**
 * FLIP fluid operators.
 */
export const FLIP_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.flipboundary',
    label: 'FLIP Boundary',
    family: 'sop',
    description:
      'Two large tilted metal scoops at upper left and upper right holding visible blue and golden-yellow liquid that pours smoothly into two wide puddles below.',
    types: ['flipboundary'],
    icons: ['sop_flipboundary'],
    refKey: 'SOP_flipboundary',
    render: (uid) => (
      <g strokeLinejoin="round" strokeLinecap="round">
        <WaterGradientDefs id={`${uid}-fb-water`} />
        <defs>
          <radialGradient id={`${uid}-fb-yellow`} cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffe47a" />
            <stop offset="55%" stopColor="#f2c438" />
            <stop offset="100%" stopColor="#d49a18" />
          </radialGradient>
        </defs>
        {/* Left wide splashing blue puddle filling lower-left */}
        <path
          d="M2.4,16.2 C2.4,13.8 5.0,12.6 7.8,13.0 C10.6,13.4 12.0,15.8 11.2,18.2 C10.4,20.4 7.0,20.8 4.4,19.6 C2.8,18.8 2.2,17.4 2.4,16.2 Z"
          fill={`url(#${uid}-fb-water)`}
          stroke="#262626"
          strokeWidth="0.95"
        />
        <ellipse cx="5.6" cy="17.5" rx="2.0" ry="0.75" fill="#ffffff" fillOpacity="0.72" stroke="none" />
        {/* Right wide golden-yellow puddle filling lower-right */}
        <path
          d="M11.6,16.8 C12.0,14.2 15.8,13.4 19.2,14.6 C21.4,15.8 21.6,19.2 19.0,20.6 C16.0,21.6 11.2,20.2 11.6,16.8 Z"
          fill={`url(#${uid}-fb-yellow)`}
          stroke="#262626"
          strokeWidth="0.95"
        />
        <ellipse cx="16.6" cy="18.2" rx="2.0" ry="0.75" fill="#ffe47a" fillOpacity="0.72" stroke="none" />

        {/* Large left open metal scoop tilted down-right (handle + deep open trough) */}
        <path d="M2.3,2.8 L3.7,2.1 L5.3,3.7 L3.9,4.5 Z" fill="#89929e" stroke="#262626" strokeWidth="0.85" />
        {/* Back/inside trough of left scoop, open at front-right lip */}
        <path d="M2.8,4.4 L7.8,2.0 L11.2,5.6 L6.0,8.6 Z" fill="#eef2f7" stroke="none" />
        <path d="M2.8,4.4 L7.8,2.0 L11.2,5.6" fill="none" stroke="#262626" strokeWidth="0.95" />
        {/* Blue water visibly pooling inside the left scoop and pouring continuously into the left puddle */}
        <path
          d="M4.4,5.2 L9.2,3.8 C10.2,6.8 10.0,11.4 9.0,16.4 C7.8,17.2 6.0,17.2 5.2,16.2 C6.2,12.4 6.0,8.6 4.4,5.2 Z"
          fill="#5aa2f2"
          stroke="none"
        />
        <path
          d="M5.6,5.0 L8.2,4.2 C9.0,7.2 9.0,11.4 8.0,15.8 L6.4,15.8 C7.2,11.8 7.0,8.0 5.6,5.0 Z"
          fill="#c4e3ff"
          stroke="none"
        />
        {/* Side outlines of the blue pool inside the scoop and down both sides of the stream (open at bottom) */}
        <path
          d="M4.4,5.2 L9.2,3.8 C10.2,6.8 10.0,11.0 9.1,15.2 M5.6,8.2 C6.2,10.6 6.2,13.0 5.5,15.2"
          fill="none"
          stroke="#262626"
          strokeWidth="0.85"
        />
        {/* Left scoop outer side wall meeting the left edge of the water stream cleanly */}
        <path d="M2.8,4.4 L5.5,8.2 L6.1,7.6 L4.4,4.9 Z" fill="#89929e" stroke="#262626" strokeWidth="0.85" />

        {/* Large right open metal scoop tilted down-left (handle + deep open trough) */}
        <path d="M18.4,4.4 L20.4,2.3 L21.6,3.4 L19.5,5.5 Z" fill="#89929e" stroke="#262626" strokeWidth="0.85" />
        {/* Back/inside trough of right scoop, open at front-left lip */}
        <path d="M12.2,6.0 L17.2,2.4 L20.6,6.2 L15.6,9.6 Z" fill="#eef2f7" stroke="none" />
        <path d="M12.2,6.0 L17.2,2.4 L20.6,6.2" fill="none" stroke="#262626" strokeWidth="0.95" />
        {/* Golden-yellow liquid visibly pooling inside the right scoop and pouring continuously into the right puddle */}
        <path
          d="M13.5,5.4 L18.6,4.5 C18.0,6.8 17.1,8.2 16.5,9.2 C16.5,11.8 17.1,14.4 18.3,17.0 C17.3,17.8 15.6,17.8 14.8,17.0 C13.6,13.8 13.1,9.8 13.5,5.4 Z"
          fill="#f2c438"
          stroke="none"
        />
        <path
          d="M14.5,5.3 L17.4,4.8 C16.8,6.8 15.9,8.0 15.5,9.0 C15.3,11.6 15.9,14.2 16.9,16.4 L15.7,16.4 C14.6,13.8 14.0,10.0 14.5,5.3 Z"
          fill="#ffe47a"
          stroke="none"
        />
        {/* Side outlines of the yellow pool inside the scoop and down both sides of the stream (open at bottom) */}
        <path
          d="M18.6,4.5 L13.5,5.4 C13.1,9.6 13.6,13.2 14.6,15.8 M16.5,9.0 C16.5,11.6 17.1,13.8 18.0,15.8"
          fill="none"
          stroke="#262626"
          strokeWidth="0.85"
        />
        {/* Right scoop outer side wall meeting the right edge of the yellow stream cleanly */}
        <path d="M20.6,6.2 L16.5,9.0 L16.0,8.1 L18.7,5.5 Z" fill="#89929e" stroke="#262626" strokeWidth="0.85" />

        <WaterDroplets
          drops={[
            { cx: 3.4, cy: 11.8, r: 0.85, light: true },
            { cx: 10.8, cy: 11.6, r: 0.85 },
          ]}
        />
      </g>
    ),
  },
  {
    id: 'sop.flipcollide',
    label: 'FLIP Collide',
    family: 'sop',
    description:
      'Diagonal blue water stream rushing from upper right against three warm ochre-brown rocks at the bottom left with two smaller foamy splashes behind and between the rocks.',
    types: ['flipcollide'],
    icons: ['sop_flipcollide'],
    refKey: 'SOP_flipcollide',
    render: () => (
      <g strokeLinejoin="round">
        {/* Diagonal curved incoming water stream from upper-right */}
        <path
          d="M21.2,4.8 C17.4,6.6 13.6,9.4 9.2,12.6 L12.4,17.2 C16.0,14.4 18.8,12.2 21.2,10.8 Z"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path
          d="M20.4,5.8 C17.0,7.6 14.0,9.8 10.6,12.6 L11.4,13.6 C14.8,11.0 17.8,8.8 20.6,7.0 Z"
          fill="#8fc2ff"
          stroke="none"
        />
        <path
          d="M20.4,8.8 C17.8,10.6 15.2,12.6 12.6,14.6 L13.2,15.6 C15.8,13.6 18.2,11.6 20.6,9.8 Z"
          fill="#3672c4"
          stroke="none"
        />
        {/* Two smaller foamy splashes tucked behind and between the rocks */}
        <SplashCrown cx={6.3} cy={13.5} scale={0.72} rotate={-16} />
        <SplashCrown cx={12.1} cy={13.9} scale={0.68} rotate={14} />
        <WaterDroplets
          drops={[
            { cx: 4.2, cy: 9.6, r: 0.8, light: true },
            { cx: 8.8, cy: 8.6, r: 0.85, light: true },
            { cx: 13.8, cy: 9.8, r: 0.75 },
          ]}
        />
        {/* Three warm ochre-brown rocks at bottom-left */}
        <polygon
          points="3.4,16.4 5.2,14.4 8.2,15.0 9.0,18.4 6.2,19.4 3.4,18.4"
          fill="#c25e12"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <polygon points="3.8,16.2 5.2,14.6 7.8,15.2 6.0,16.6" fill="#d49a18" stroke="none" />
        <polygon
          points="12.2,17.0 14.8,15.2 17.6,16.2 17.4,19.6 14.6,20.2 12.2,19.2"
          fill="#c25e12"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <polygon points="12.6,16.8 14.8,15.4 17.0,16.2 14.8,17.4" fill="#d49a18" stroke="none" />
        <polygon
          points="7.2,17.4 9.6,15.2 12.8,15.8 13.8,19.4 10.6,20.6 7.4,19.6"
          fill="#c25e12"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <polygon points="7.8,17.2 9.6,15.6 12.2,16.0 10.4,17.6" fill="#ee8624" stroke="none" />
      </g>
    ),
  },
  {
    id: 'sop.flipcontainer',
    label: 'FLIP Container',
    family: 'sop',
    description:
      'Right-tilted translucent glass measuring jug with an upper-left handle, blue water in the base, and two slender tapered foamy splash ribbons arcing out from inside the jar mouth.',
    types: ['flipcontainer'],
    icons: ['sop_flipcontainer'],
    refKey: 'SOP_flipcontainer',
    render: (uid) => (
      <g strokeLinejoin="round" strokeLinecap="round">
        <defs>
          <linearGradient id={`${uid}-fc-fluid`} x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#c4e3ff" />
            <stop offset="45%" stopColor="#8fc2ff" />
            <stop offset="100%" stopColor="#3672c4" />
          </linearGradient>
        </defs>
        {/* Jug tilted clearly to the right (~20 deg clockwise from upright) matching reference */}
        <g transform="rotate(34 11.0 13.2)">
          {/* Left glass handle with generous interior loop */}
          <path
            d="M5.4,7.8 C1.6,8.0 1.8,14.8 6.4,15.0 L7.2,13.4 C4.0,13.0 3.8,9.6 5.8,9.6 Z"
            fill="#c0c7d1"
            stroke="#262626"
            strokeWidth="0.95"
          />
          {/* Translucent glass pitcher body with unified curved top rim (no black line cutting across the top perimeter) */}
          <path
            d="M4.6,7.2 A5.4,1.8 -14 0,1 14.8,4.4 L17.0,5.0 L15.4,7.0 L17.2,16.8 C16.6,19.0 10.6,20.8 8.4,19.4 Z"
            fill="#eef2f7"
            fillOpacity="0.46"
            stroke="#262626"
            strokeWidth="1.0"
          />
          {/* Soft unstroked inner mouth shading */}
          <ellipse
            cx="9.8"
            cy="6.0"
            rx="5.0"
            ry="1.5"
            transform="rotate(-14 9.8 6.0)"
            fill="#c0c7d1"
            fillOpacity="0.42"
            stroke="none"
          />
          {/* Bright sky-blue fluid volume inside lower pitcher */}
          <path
            d="M6.2,12.2 L16.2,10.2 L17.1,16.7 C16.5,18.7 10.8,20.4 8.6,19.1 Z"
            fill={`url(#${uid}-fc-fluid)`}
            stroke="#262626"
            strokeWidth="0.85"
          />
          {/* Elliptical water meniscus */}
          <ellipse
            cx="11.2"
            cy="11.2"
            rx="5.0"
            ry="1.5"
            transform="rotate(-11 11.2 11.2)"
            fill="#c4e3ff"
            stroke="#262626"
            strokeWidth="0.85"
          />
          {/* Translucent glass specular highlight */}
          <polygon points="7.0,8.2 9.0,7.6 11.6,18.6 9.6,19.0" fill="#ffffff" fillOpacity="0.52" stroke="none" />
        </g>

        {/* Topmost slender foamy splash ribbon, tapered thin at both its start inside the jar mouth and its outer tip */}
        <path
          d="M12.7,7.6 C14.4,3.6 18.4,2.8 21.8,5.3 C18.8,5.0 15.8,5.8 12.7,7.6 Z"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.8"
        />
        <path d="M13.6,7.0 C15.1,4.3 18.2,3.6 20.8,5.1 C18.4,4.8 15.9,5.5 13.6,7.0 Z" fill="#ffffff" stroke="none" />

        {/* Identical-style, slightly smaller tapered foamy splash ribbon right underneath the top one */}
        <path
          d="M13.5,8.7 C15.3,5.8 18.5,5.5 21.1,7.8 C18.6,7.3 16.1,7.7 13.5,8.7 Z"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.75"
        />
        <path d="M14.3,8.3 C15.8,6.3 18.3,6.1 20.2,7.6 C18.3,7.2 16.2,7.5 14.3,8.3 Z" fill="#ffffff" stroke="none" />
      </g>
    ),
  },
  {
    id: 'sop.flipsolver',
    label: 'FLIP Solver',
    family: 'sop',
    description:
      'Blue-and-white waterfall cascading steeply between golden-brown chute banks from upper right to lower left behind a pink solver brain.',
    types: ['flipsolver'],
    icons: ['sop_flipsolver'],
    refKey: 'SOP_flipsolver',
    render: (uid) => (
      <g strokeLinejoin="round" strokeLinecap="round">
        <defs>
          <linearGradient id={`${uid}-fsol-fall`} x1="75%" y1="10%" x2="20%" y2="90%">
            <stop offset="0%" stopColor="#c4e3ff" />
            <stop offset="40%" stopColor="#5aa2f2" />
            <stop offset="100%" stopColor="#2e74c4" />
          </linearGradient>
        </defs>
        {/* Golden-brown waterfall chute / rock ledge banks flanking the upper waterfall */}
        <path
          d="M11.6,3.4 C13.8,2.0 17.6,2.4 19.6,4.8 C18.2,6.8 16.6,9.4 15.0,11.6 L6.8,9.8 C8.4,7.8 9.8,4.8 11.6,3.4 Z"
          fill="#c25e12"
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Lit amber rim along the left and right chute banks */}
        <path
          d="M11.8,3.8 C10.2,5.0 8.8,7.6 7.4,9.4 L8.6,9.6 C10.0,7.8 11.2,5.4 12.6,4.2 Z M18.8,4.8 C17.6,6.6 16.2,8.8 14.8,10.8 L13.8,10.4 C15.2,8.4 16.6,6.2 17.8,4.4 Z"
          fill="#ee8624"
          stroke="none"
        />
        {/* Cascading blue waterfall plunging from the upper-right crest to a splashing base at lower-left */}
        <path
          d="M12.6,3.4 C14.6,2.6 16.8,3.0 18.0,4.4 C15.8,6.2 14.4,9.4 12.6,12.4 L8.6,17.2 L7.2,15.4 L5.0,17.0 L5.8,14.6 L2.8,14.8 L5.6,12.6 L3.4,11.4 L6.8,10.6 C9.2,9.2 10.6,5.2 12.6,3.4 Z"
          fill={`url(#${uid}-fsol-fall)`}
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Flowing white waterfall crest and vertical plunge streaks */}
        <path
          d="M13.2,4.0 C14.6,3.4 16.0,3.6 16.8,4.4 C15.0,6.0 13.8,8.8 12.0,11.4 L9.6,13.6 C11.2,10.8 12.0,7.2 13.2,4.0 Z"
          fill="#ffffff"
          fillOpacity="0.88"
          stroke="none"
        />
        <path
          d="M11.8,5.4 C10.6,7.6 9.4,10.0 7.2,11.6 L5.0,13.6 L7.6,13.2 C9.6,11.2 10.8,8.4 11.8,5.4 Z"
          fill="#c4e3ff"
          stroke="none"
        />
        <WaterDroplets
          drops={[
            { cx: 3.4, cy: 9.0, r: 0.75, light: true },
            { cx: 3.6, cy: 17.2, r: 0.8, light: true },
          ]}
        />
        {/* Shared pink solver brain in lower-right foreground */}
        <SolverBrain cx={14.2} cy={15.2} scale={0.92} />
      </g>
    ),
  },
  {
    id: 'sop.flipsource',
    label: 'FLIP DOP Source',
    family: 'sop',
    description:
      'Side-view curved silver faucet emerging from a wide upper-left wall flange collar and pouring a flaring blue water-stream arrow downward.',
    types: ['flipsource'],
    icons: ['sop_flipsource'],
    refKey: 'SOP_flipsource',
    render: (uid) => (
      <g strokeLinejoin="round">
        <defs>
          <linearGradient id={`${uid}-fsrc-arrow`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c4e3ff" />
            <stop offset="32%" stopColor="#5aa2f2" />
            <stop offset="100%" stopColor="#2e5a9a" />
          </linearGradient>
        </defs>
        {/* Wide tilted circular wall mounting flange at upper-left */}
        <ellipse
          cx="6.0"
          cy="5.8"
          rx="2.3"
          ry="3.1"
          transform="rotate(16 6.0 5.8)"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <ellipse cx="5.7" cy="5.4" rx="1.6" ry="2.2" transform="rotate(16 5.7 5.4)" fill="#eef2f7" stroke="none" />
        {/* Stepped inner flange socket collar */}
        <ellipse
          cx="6.8"
          cy="5.9"
          rx="1.4"
          ry="2.0"
          transform="rotate(14 6.8 5.9)"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="0.8"
        />

        {/* Flaring blue water-stream arrow emerging from the faucet spout */}
        <path
          d="M12.4,11.6 H16.2 C16.4,13.6 17.2,15.2 19.2,16.0 L14.3,21.5 L9.4,16.0 C11.4,15.2 12.2,13.6 12.4,11.6 Z"
          fill={`url(#${uid}-fsrc-arrow)`}
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Flowing white water highlight streaks and inner wing bevel inside the arrow */}
        <path
          d="M13.1,12.0 H14.3 L13.8,19.4 L11.0,16.2 C12.4,15.4 13.0,13.8 13.1,12.0 Z"
          fill="#ffffff"
          fillOpacity="0.62"
          stroke="none"
        />
        <path
          d="M15.0,12.0 H15.6 C15.8,13.8 16.4,15.2 17.6,16.0 L15.2,18.6 Z"
          fill="#8fc2ff"
          fillOpacity="0.55"
          stroke="none"
        />

        {/* Smoothly curved cylindrical silver faucet pipe with flared nozzle rim */}
        <path
          d="M6.6,4.1 C11.4,3.6 16.4,4.8 16.5,10.8 L17.0,11.3 L17.0,12.2 C15.4,12.6 13.2,12.6 11.6,12.2 L11.6,11.3 L12.1,10.8 C12.0,7.4 9.6,7.0 6.6,7.5 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Bright upper metallic specular highlight along the faucet bend */}
        <path
          d="M7.2,4.7 C11.2,4.3 15.2,5.3 15.5,10.8 L14.1,10.8 C13.8,6.4 10.6,5.6 7.2,6.0 Z"
          fill="#eef2f7"
          stroke="none"
        />
        {/* Underside shadow band and nozzle collar lip */}
        <path
          d="M7.0,6.6 C10.0,6.3 12.8,7.0 12.9,10.8 L12.2,10.8 C12.0,7.6 9.6,7.1 7.0,7.3 Z M11.9,11.4 H16.7 V12.0 H11.9 Z"
          fill="#89929e"
          stroke="none"
        />
      </g>
    ),
  },
  {
    id: 'sop.flipvolumecombine',
    label: 'FLIP Volume Combine',
    family: 'sop',
    description:
      'Three overlapping white and light-grey puffy volumetric clouds layered over each other with upper-left shading.',
    types: ['flipvolumecombine', 'volumemerge'],
    icons: ['sop_flipvolumecombine', 'sop_volumemerge'],
    refKey: 'SOP_flipvolumecombine',
    render: (uid) => (
      <g strokeLinejoin="round" strokeLinecap="round">
        <defs>
          <radialGradient id={`${uid}-fvc-c1`} cx="35%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#eef2f7" />
            <stop offset="88%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </radialGradient>
          <radialGradient id={`${uid}-fvc-c2`} cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#eef2f7" />
            <stop offset="82%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </radialGradient>
          <radialGradient id={`${uid}-fvc-c3`} cx="35%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="58%" stopColor="#eef2f7" />
            <stop offset="88%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </radialGradient>
        </defs>
        {/* Cloud 1: back-left upper cloud */}
        <path
          d="M4.2,12.4 C2.4,11.6 2.2,8.8 4.0,7.6 C3.6,5.2 5.8,3.4 8.0,4.4 C9.0,2.4 12.2,2.6 13.0,4.8 C14.8,4.6 16.0,6.6 15.0,8.6 C14.2,11.6 10.6,13.4 6.6,13.2 C5.2,13.6 4.4,13.0 4.2,12.4 Z"
          fill={`url(#${uid}-fvc-c1)`}
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path d="M5.6,7.6 C6.4,6.4 8.0,6.4 8.8,7.4" fill="none" stroke="#89929e" strokeWidth="0.75" />

        {/* Cloud 2: middle-right overlapping cloud */}
        <path
          d="M11.6,14.2 C10.6,12.0 11.2,9.2 13.0,8.2 C13.2,5.6 15.8,4.4 17.8,5.8 C19.8,5.4 21.6,7.6 20.4,9.8 C21.8,11.2 21.0,14.2 18.8,14.6 C18.4,16.6 15.6,17.2 14.0,15.8 C12.8,16.2 11.8,15.4 11.6,14.2 Z"
          fill={`url(#${uid}-fvc-c2)`}
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path d="M15.4,8.6 C16.4,7.6 18.0,8.0 18.4,9.4" fill="none" stroke="#89929e" strokeWidth="0.75" />

        {/* Cloud 3: front-bottom foreground cloud */}
        <path
          d="M6.2,17.0 C4.0,16.2 3.8,13.0 5.8,11.8 C5.6,9.4 8.0,7.8 10.2,9.0 C11.2,7.0 14.4,7.2 15.4,9.4 C17.6,8.8 19.6,11.0 18.4,13.2 C20.0,14.6 19.2,17.8 16.8,18.0 C16.6,20.4 13.8,21.4 11.8,19.8 C10.2,21.4 7.2,20.6 6.8,18.6 C5.4,18.8 4.8,17.6 6.2,17.0 Z"
          fill={`url(#${uid}-fvc-c3)`}
          stroke="#262626"
          strokeWidth="1.0"
        />
        <path
          d="M8.0,12.4 C9.0,11.2 10.8,11.2 11.6,12.4 M13.0,11.8 C14.2,11.0 15.8,11.6 16.2,12.8 M9.2,17.2 C10.6,18.0 12.6,17.6 13.6,16.2"
          fill="none"
          stroke="#89929e"
          strokeWidth="0.8"
        />
      </g>
    ),
  },
  {
    id: 'sop.fluidcompress',
    label: 'Fluid Compress',
    family: 'sop',
    description:
      'Isometric grey press channel with two tall side walls and two inner piston plates on upper-left and lower-right pipes compressing a sky-blue fluid block.',
    types: ['fluidcompress'],
    icons: ['sop_fluidcompress'],
    refKey: 'SOP_fluidcompress',
    render: () => {
      // Exact 2:1 isometric grid:
      // In quadPt(topQuad, u, v):
      //   u in [0..1] is across the width (0 = left wall pLeft..pFront, 1 = right wall pTop..pRight)
      //   v in [0..1] is along the compression axis (0 = upper-left pLeft..pTop, 1 = lower-right pFront..pRight)
      const pTop: Pt = [11.0, 4.4];
      const pLeft: Pt = [3.9, 8.0];
      const pFront: Pt = [13.3, 12.7];
      const pRight: Pt = [20.4, 9.1];
      const topQuad: readonly [Pt, Pt, Pt, Pt] = [pLeft, pTop, pRight, pFront];
      const wallH = 5.0;
      const drop = (p: Pt, h = wallH): Pt => [p[0], p[1] + h];

      // Side walls occupy u in [0..0.25] (left wall) and [0.75..1.0] (right wall)
      const uL = 0.25;
      const uR = 0.75;

      // Two piston plates at the ends of the pipes inside the channel (u in [uL..uR]):
      //   Plate 1 (upper-left pipe plate): v in [0.0..0.23]
      //   Sky-blue water block: v in [0.23..0.77], fitting 100% flush between Plate 1, Plate 2, and both side walls
      //   Plate 2 (lower-right pipe plate): v in [0.77..1.0]
      const vP1 = 0.23;
      const vP2 = 0.77;
      const wellDrop = 1.05;

      const wBL = quadPt(topQuad, uL, vP1);
      const wTL = quadPt(topQuad, uR, vP1);
      const wTR = quadPt(topQuad, uR, vP2);
      const wBR = quadPt(topQuad, uL, vP2);

      // Seam endpoints where the two piston plates meet the left and right side walls
      const p1BackL = quadPt(topQuad, uL, 0);
      const p1BackR = quadPt(topQuad, uR, 0);
      const p2FrontL = quadPt(topQuad, uL, 1);
      const p2FrontR = quadPt(topQuad, uR, 1);

      return (
        <g strokeLinejoin="round">
          {/* Upper-left pipe moved down to align with the center of Plate 1's back-left face */}
          <polygon points="2.3,5.8 3.6,4.4 8.2,6.7 6.9,8.1" fill="#eef2f7" stroke="#262626" strokeWidth="0.85" />
          <polygon points="2.3,5.8 2.9,5.1 7.5,7.4 6.9,8.1" fill="#c0c7d1" stroke="none" />

          {/* Outer left vertical wall of the press frame */}
          <polygon
            points={pts([pLeft, pFront, drop(pFront), drop(pLeft)])}
            fill="#c0c7d1"
            stroke="#262626"
            strokeWidth="0.9"
          />
          {/* Front-right vertical faces (left wall end, Plate 2 front face, right wall end) */}
          <polygon
            points={pts([pFront, pRight, drop(pRight), drop(pFront)])}
            fill="#89929e"
            stroke="#262626"
            strokeWidth="0.9"
          />

          {/* Lit top surface of side walls and the two piston plates */}
          <path
            d={`M${pts([pLeft])} L${pts([pTop])} L${pts([pRight])} L${pts([pFront])} Z M${pts([wBL])} L${pts([wBR])} L${pts([wTR])} L${pts([wTL])} Z`}
            fill="#eef2f7"
            fillRule="evenodd"
            stroke="#262626"
            strokeWidth="0.9"
          />

          {/* Plate 1 vertical inner face pushing the blue water from upper-left */}
          <polygon
            points={pts([wBL, wTL, drop(wTL, wellDrop), drop(wBL, wellDrop)])}
            fill="#89929e"
            stroke="#262626"
            strokeWidth="0.7"
          />

          {/* Sky-blue water block fitting snugly against Plate 1, Plate 2, and both side walls */}
          <polygon
            points={pts([drop(wBL, wellDrop), drop(wTL, wellDrop), wTR, wBR])}
            fill="#5aa2f2"
            stroke="#262626"
            strokeWidth="0.75"
          />
          <polygon
            points={pts([
              [drop(wBL, wellDrop)[0] + 0.7, drop(wBL, wellDrop)[1] - 0.05],
              [drop(wTL, wellDrop)[0] + 0.1, drop(wTL, wellDrop)[1] + 0.35],
              [wTR[0] - 0.8, wTR[1] - 0.1],
              [wBR[0] - 0.2, wBR[1] - 0.45],
            ])}
            fill="#8fc2ff"
            stroke="none"
          />

          {/* Crisp inner top rim of the water cavity */}
          <polyline points={pts([wBL, wTL, wTR, wBR, wBL])} fill="none" stroke="#262626" strokeWidth="0.8" />

          {/* Seam lines separating Plate 1 and Plate 2 from the left and right side walls */}
          <line x1={p1BackL[0]} y1={p1BackL[1]} x2={wBL[0]} y2={wBL[1]} stroke="#262626" strokeWidth="0.65" />
          <line x1={p1BackR[0]} y1={p1BackR[1]} x2={wTL[0]} y2={wTL[1]} stroke="#262626" strokeWidth="0.65" />
          <polyline points={pts([wBR, p2FrontL, drop(p2FrontL)])} fill="none" stroke="#262626" strokeWidth="0.65" />
          <polyline points={pts([wTR, p2FrontR, drop(p2FrontR)])} fill="none" stroke="#262626" strokeWidth="0.65" />

          {/* Lower-right pipe attached to the center of Plate 2's front-right face */}
          <polygon
            points="15.5,13.5 16.9,12.1 21.5,14.4 20.1,15.8"
            fill="#eef2f7"
            stroke="#262626"
            strokeWidth="0.85"
          />
          <polygon points="15.5,13.5 16.2,12.8 20.8,15.1 20.1,15.8" fill="#89929e" stroke="none" />
          <ellipse
            cx="20.8"
            cy="15.1"
            rx="0.92"
            ry="0.66"
            transform="rotate(-40 20.8 15.1)"
            fill="#89929e"
            stroke="#262626"
            strokeWidth="0.75"
          />
        </g>
      );
    },
  },
  {
    id: 'sop.particlefluidsurface',
    label: 'Particle Fluid Surface',
    family: 'sop',
    description:
      'Vertical teardrop cluster of seven bright sky-blue spheres nestled inside a cutaway grey teardrop shell on the right.',
    types: ['particlefluidsurface'],
    icons: ['sop_particlefluidsurface'],
    refKey: 'SOP_particlefluidsurface',
    render: (uid) => {
      const beads: readonly [number, number, number][] = [
        [11.8, 6.8, 1.55],
        [9.8, 9.8, 1.7],
        [12.6, 10.6, 1.7],
        [8.8, 13.5, 1.85],
        [12.0, 14.2, 1.85],
        [9.6, 17.4, 1.75],
        [12.4, 17.8, 1.65],
      ];
      return (
        <g strokeLinejoin="round">
          <defs>
            <radialGradient id={`${uid}-pfs-bead`} cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#c4e3ff" />
              <stop offset="82%" stopColor="#8fc2ff" />
              <stop offset="100%" stopColor="#5aa2f2" />
            </radialGradient>
          </defs>
          {/* Outer grey cutaway teardrop shell */}
          <path
            d="M12.2,2.6 C16.0,7.2 18.4,11.4 18.4,15.0 C18.4,19.0 15.6,21.4 12.0,21.4 C8.4,21.4 6.2,19.0 6.2,15.0 C6.2,11.4 8.6,7.2 12.2,2.6 Z"
            fill="#c0c7d1"
            stroke="#262626"
            strokeWidth="1.0"
          />
          {/* Dark concave inner cavity shadow behind beads */}
          <path
            d="M12.0,4.0 C14.6,8.0 16.0,11.8 15.8,15.0 C15.6,18.2 14.0,20.0 11.8,20.0 C8.8,20.0 6.8,18.0 6.8,14.8 C6.8,11.6 8.8,7.8 12.0,4.0 Z"
            fill="#3a3f47"
            stroke="none"
          />
          {/* Bright blue fluid backing behind particle cluster */}
          <path
            d="M11.8,4.6 C13.6,8.2 14.6,11.8 14.6,15.0 C14.6,18.0 13.4,19.8 11.4,19.8 C8.8,19.8 7.0,17.8 7.0,14.8 C7.0,11.8 8.8,8.0 11.8,4.6 Z"
            fill="#5aa2f2"
            stroke="#262626"
            strokeWidth="0.75"
          />
          {/* Seven bright sky-blue fluid spheres */}
          {beads.map(([bx, by, br], idx) => (
            <circle
              key={idx}
              cx={bx}
              cy={by}
              r={br}
              fill={`url(#${uid}-pfs-bead)`}
              stroke="#262626"
              strokeWidth="0.6"
            />
          ))}
          {/* Lit grey cutaway front rim on right side */}
          <path
            d="M12.2,2.6 C14.6,7.2 15.8,11.4 15.6,15.0 C15.4,18.2 14.0,20.4 12.0,21.4 C15.6,21.4 18.4,19.0 18.4,15.0 C18.4,11.4 16.0,7.2 12.2,2.6 Z"
            fill="#c0c7d1"
            stroke="#262626"
            strokeWidth="0.9"
          />
          <path
            d="M12.6,4.0 C14.6,8.2 15.8,12.0 15.6,15.2 C15.4,18.0 14.2,19.8 12.8,20.6 C14.6,19.8 16.0,17.8 16.2,15.0 C16.4,11.8 15.2,8.0 12.6,4.0 Z"
            fill="#eef2f7"
            stroke="none"
          />
        </g>
      );
    },
  },
  {
    id: 'sop.particlefluidtank',
    label: 'Particle Fluid Tank',
    family: 'sop',
    description:
      'Isometric translucent glass cube tank filled two-thirds with pale sky-blue water, splashing top wave, droplets and floating bubbles.',
    types: ['particlefluidtank'],
    icons: ['sop_particlefluidtank'],
    refKey: 'SOP_particlefluidtank',
    render: () => {
      const tank = isoBoxFaces(12, 3.2, 7.6, 9.2);
      const water = isoBoxFaces(12, 6.0, 7.6, 6.4);
      const topBack = tank.top[0];
      const topRight = tank.top[1];
      const topFront = tank.top[2];
      const topLeft = tank.top[3];
      const botLeft = tank.left[3];
      const botFront = tank.left[2];
      const botRight = tank.right[2];
      const backBot: Pt = [topBack[0], topBack[1] + 9.2];
      return (
        <g strokeLinejoin="round">
          {/* Pale translucent glass body so dark node backgrounds do not muddy the water */}
          <polygon points={pts(tank.top)} fill="#eef2f7" fillOpacity="0.52" stroke="#262626" strokeWidth="0.85" />
          <polygon points={pts(tank.left)} fill="#eef2f7" fillOpacity="0.45" stroke="none" />
          <polygon points={pts(tank.right)} fill="#c0c7d1" fillOpacity="0.45" stroke="none" />
          {/* Faint interior back glass edges visible through the water */}
          <polyline
            points={pts([botLeft, backBot, topBack, backBot, botRight])}
            fill="none"
            stroke="#5a616b"
            strokeWidth="0.7"
          />
          {/* Translucent pale sky-blue water volume */}
          <polygon points={pts(water.top)} fill="#c4e3ff" fillOpacity="0.8" stroke="#262626" strokeWidth="0.8" />
          <polygon points={pts(water.left)} fill="#8fc2ff" fillOpacity="0.78" stroke="#262626" strokeWidth="0.85" />
          <polygon points={pts(water.right)} fill="#5aa2f2" fillOpacity="0.78" stroke="#262626" strokeWidth="0.85" />
          {/* Airy splash waves & droplets on top water surface */}
          <path
            d="M8.6,9.8 C9.4,7.6 10.6,7.0 11.4,8.6 C12.0,6.6 13.4,6.4 14.0,8.4 C14.8,7.4 15.8,8.0 15.4,9.8 C13.4,10.8 10.6,10.8 8.6,9.8 Z"
            fill="#ffffff"
            fillOpacity="0.92"
            stroke="#262626"
            strokeWidth="0.7"
          />
          <WaterDroplets
            drops={[
              { cx: 9.2, cy: 6.2, r: 0.7, light: true },
              { cx: 12.2, cy: 5.0, r: 0.75, light: true },
              { cx: 14.8, cy: 6.4, r: 0.7, light: true },
            ]}
          />
          {/* Soft pale interior bubbles (no dark rivet outlines) */}
          <circle cx="8.2" cy="14.8" r="0.85" fill="#ffffff" fillOpacity="0.85" stroke="none" />
          <circle cx="10.2" cy="17.0" r="0.65" fill="#c4e3ff" fillOpacity="0.9" stroke="none" />
          <circle cx="14.4" cy="16.2" r="0.85" fill="#c4e3ff" fillOpacity="0.85" stroke="none" />
          <circle cx="16.8" cy="14.0" r="0.65" fill="#ffffff" fillOpacity="0.85" stroke="none" />
          {/* Crisp outer glass cube wireframe */}
          <polyline
            points={pts([topLeft, botLeft, botFront, botRight, topRight])}
            fill="none"
            stroke="#262626"
            strokeWidth="0.95"
          />
          <line
            x1={topFront[0]}
            y1={topFront[1]}
            x2={botFront[0]}
            y2={botFront[1]}
            stroke="#262626"
            strokeWidth="0.85"
          />
          <polyline points={pts([topLeft, topFront, topRight])} fill="none" stroke="#262626" strokeWidth="0.95" />
        </g>
      );
    },
  },
  {
    id: 'sop.vdbfromparticlefluid',
    label: 'VDB from Particle Fluid',
    family: 'sop',
    description:
      'Five spherical VDB fluid cells arranged in a five-dot pattern, each with a shaded blue particle core inside a white halo ring with a dotted black outline.',
    types: ['vdbfromparticlefluid'],
    icons: ['sop_vdbfromparticlefluid'],
    refKey: 'SOP_vdbfromparticlefluid',
    render: (uid) => (
      <g strokeLinejoin="round">
        <VdbFluidCell id={`${uid}-vdb-tl`} cx={6.1} cy={6.0} />
        <VdbFluidCell id={`${uid}-vdb-tr`} cx={17.7} cy={6.2} />
        <VdbFluidCell id={`${uid}-vdb-c`} cx={12.0} cy={11.8} />
        <VdbFluidCell id={`${uid}-vdb-bl`} cx={6.3} cy={17.3} />
        <VdbFluidCell id={`${uid}-vdb-br`} cx={16.5} cy={17.8} />
      </g>
    ),
  },
];
