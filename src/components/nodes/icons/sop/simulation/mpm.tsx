import React from 'react';
import { isoBoxFaces, lerpPt, type Pt, pts, r2 } from '../../geoHelpers';
import type { OperatorIconDef } from '../../iconTypes';
import { SolverBrain } from '../kits/solverBrain';

/**
 * Generates a deterministic slightly bumpy circular snowball outline around `(cx, cy)` with base
 * radius `r`. Keeps the silhouette packed and organic without noisy micro-facets at 21px.
 */
const bumpyCirclePath = (cx: number, cy: number, r: number, lobes = 10, wobble = 0.045, phase = 0.3): string => {
  const count = lobes * 2;
  const ring: Pt[] = [];
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2 + phase;
    const mod = 1 + Math.sin(i * 2.1 + phase) * wobble + Math.cos(i * 1.3) * (wobble * 0.5);
    ring.push([cx + Math.cos(a) * r * mod, cy + Math.sin(a) * r * mod]);
  }
  const mid = (p: Pt, q: Pt): Pt => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const start = mid(ring[ring.length - 1], ring[0]);
  const cmds = [`M${r2(start[0])},${r2(start[1])}`];
  for (let i = 0; i < ring.length; i += 1) {
    const p = ring[i];
    const next = ring[(i + 1) % ring.length];
    const m = mid(p, next);
    cmds.push(`Q${r2(p[0])},${r2(p[1])} ${r2(m[0])},${r2(m[1])}`);
  }
  cmds.push('Z');
  return cmds.join(' ');
};

/**
 * Shared packed snowball kit for MPM snow operators (`sop.mpmdebrissource`, `sop.mpmsource`,
 * `sop.mpmsurface`). Uses upper-left lighting from pure white to icy blue shadow.
 */
const Snowball: React.FC<{
  gradId: string;
  cx: number;
  cy: number;
  r: number;
  bumpy?: boolean;
  strokeWidth?: number;
  innerArcs?: boolean;
  fillOpacity?: number;
}> = ({ gradId, cx, cy, r, bumpy = true, strokeWidth = 1.05, innerArcs = true, fillOpacity }) => {
  const d = bumpy ? bumpyCirclePath(cx, cy, r) : undefined;
  return (
    <>
      <defs>
        <radialGradient id={gradId} cx="32%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="44%" stopColor="#eef2f7" />
          <stop offset="78%" stopColor="#8fc2ff" />
          <stop offset="100%" stopColor="#5aa2f2" />
        </radialGradient>
      </defs>
      {d ? (
        <path
          d={d}
          fill={`url(#${gradId})`}
          fillOpacity={fillOpacity}
          stroke="#262626"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      ) : (
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill={`url(#${gradId})`}
          fillOpacity={fillOpacity}
          stroke="#262626"
          strokeWidth={strokeWidth}
        />
      )}
      {innerArcs && (
        <path
          d={`M${r2(cx - r * 0.08)},${r2(cy + r * 0.36)} Q${r2(cx + r * 0.28)},${r2(cy + r * 0.44)} ${r2(cx + r * 0.54)},${r2(cy + r * 0.14)}`}
          fill="none"
          stroke="#5aa2f2"
          strokeWidth="0.72"
          strokeLinecap="round"
        />
      )}
    </>
  );
};

/**
 * Shared irregular snow drift / mound for `sop.mpmcontainer` and `sop.mpmsolver`.
 */
const SnowMound: React.FC<{
  gradId: string;
  d: string;
  creaseD?: string;
  strokeWidth?: number;
}> = ({ gradId, d, creaseD, strokeWidth = 1.05 }) => (
  <>
    <defs>
      <linearGradient id={gradId} x1="25%" y1="10%" x2="78%" y2="95%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="46%" stopColor="#eef2f7" />
        <stop offset="80%" stopColor="#8fc2ff" />
        <stop offset="100%" stopColor="#5aa2f2" />
      </linearGradient>
    </defs>
    <path d={d} fill={`url(#${gradId})`} stroke="#262626" strokeWidth={strokeWidth} strokeLinejoin="round" />
    {creaseD && <path d={creaseD} fill="none" stroke="#5aa2f2" strokeWidth="0.72" strokeLinecap="round" />}
  </>
);

/**
 * Shared red pennant flag on a dark pole for MPM sandcastle operators (`sop.mpmdeformpieces`,
 * `sop.mpmpostfracture`).
 */
const RedFlag: React.FC<{ x: number; y: number; angleDeg?: number }> = ({ x, y, angleDeg = 0 }) => (
  <g transform={angleDeg ? `translate(${x}, ${y}) rotate(${angleDeg})` : `translate(${x}, ${y})`}>
    <line x1="0" y1="0" x2="0" y2="-5.8" stroke="#262626" strokeWidth="0.95" strokeLinecap="round" />
    <polygon
      points="0,-5.8 4.4,-4.4 0,-3.0"
      fill="#e03228"
      stroke="#262626"
      strokeWidth="0.85"
      strokeLinejoin="round"
    />
  </g>
);

/**
 * MPM operators.
 */
export const MPM_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.mpmcollider',
    label: 'MPM Collider',
    family: 'sop',
    description:
      'Flat grey isometric collider tile with a melted purple ice-cream puddle in the center and a tan waffle cone plunged upside-down into it.',
    types: ['mpmcollider'],
    icons: ['sop_mpmcollider'],
    refKey: 'SOP_mpmcollider',
    render: (uid) => {
      const slab = isoBoxFaces(12, 9.2, 9.4, 1.9);
      const tip: Pt = [18.0, 2.5];
      const rimL: Pt = [10.4, 9.4];
      const rimR: Pt = [15.4, 12.2];
      // Two clean waffle cross-hatch pairs so the cone reads crisply at 21px.
      const hatchLines: string[] = [];
      for (const t of [0.36, 0.68]) {
        const a = lerpPt(rimL, tip, t);
        const b = lerpPt(rimR, tip, t);
        hatchLines.push(`M${pts([a])} L${pts([b])}`);
      }
      for (const s of [0.35, 0.67]) {
        const base = lerpPt(rimL, rimR, s);
        const top = lerpPt(tip, base, 0.16);
        hatchLines.push(`M${pts([base])} L${pts([top])}`);
      }
      return (
        <g strokeLinejoin="round">
          <defs>
            <linearGradient id={`${uid}-cone`} x1="12%" y1="12%" x2="88%" y2="88%">
              <stop offset="0%" stopColor="#ffe47a" />
              <stop offset="50%" stopColor="#e8c48a" />
              <stop offset="100%" stopColor="#c89a5a" />
            </linearGradient>
          </defs>
          {/* Grey isometric collider tile */}
          <polygon points={pts(slab.left)} fill="#c0c7d1" stroke="#262626" strokeWidth="1.0" />
          <polygon points={pts(slab.right)} fill="#89929e" stroke="#262626" strokeWidth="1.0" />
          <polygon points={pts(slab.top)} fill="#eef2f7" stroke="#262626" strokeWidth="1.0" />
          {/* Melted lavender-purple ice-cream splat spread across the tile */}
          <path
            d="M7.0,13.9 C5.9,12.8 7.5,11.6 9.6,12.0 C10.6,10.8 13.4,10.7 14.6,11.9 C17.0,11.8 18.2,13.4 16.5,14.6 C17.2,15.8 15.0,16.8 12.9,16.1 C11.4,17.2 8.7,16.8 8.3,15.4 C6.9,15.3 6.2,14.5 7.0,13.9 Z"
            fill="#c084d8"
            stroke="#262626"
            strokeWidth="0.9"
          />
          <path d="M7.7,13.6 C7.3,12.6 8.8,11.9 10.6,12.2 C10.1,13.2 9.4,14.2 7.7,13.6 Z" fill="#c8a2ff" />
          <path
            d="M9.6,14.8 C11.4,15.8 13.9,15.6 15.6,14.4 C15.1,15.6 13.4,16.2 11.4,15.9 C10.2,15.7 9.6,15.2 9.6,14.8 Z"
            fill="#9b59b6"
          />
          <circle cx="6.9" cy="15.8" r="0.7" fill="#c084d8" stroke="#262626" strokeWidth="0.6" />
          <circle cx="16.8" cy="15.4" r="0.65" fill="#c084d8" stroke="#262626" strokeWidth="0.6" />
          {/* Upside-down tan waffle cone leaning ~32 deg up-right */}
          <path
            d={`M${pts([rimL])} L${pts([tip])} L${pts([rimR])} C13.9,13.2 11.4,12.2 ${pts([rimL])} Z`}
            fill={`url(#${uid}-cone)`}
            stroke="#262626"
            strokeWidth="1.05"
          />
          <path d={hatchLines.join(' ')} fill="none" stroke="#a8783c" strokeWidth="0.62" strokeLinecap="round" />
          {/* Melted purple rim lapping up onto the cone mouth */}
          <path
            d="M10.1,9.7 C11.2,11.1 13.1,12.3 15.3,12.1 C15.7,13.0 14.1,13.9 12.1,13.6 C10.1,13.2 9.2,11.3 10.1,9.7 Z"
            fill="#c084d8"
            stroke="#262626"
            strokeWidth="0.8"
          />
          <path
            d="M10.6,11.2 C11.4,12.0 12.8,12.6 14.0,12.6"
            fill="none"
            stroke="#9b59b6"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
        </g>
      );
    },
  },
  {
    id: 'sop.mpmcontainer',
    label: 'MPM Container',
    family: 'sop',
    description: 'Open isometric cardboard shipping box with four flared flaps, filled with a mound of white snow.',
    types: ['mpmcontainer'],
    icons: ['sop_mpmcontainer'],
    refKey: 'SOP_mpmcontainer',
    render: (uid) => {
      const box = isoBoxFaces(12, 7.6, 5.8, 6.2);
      const [bTop, rTop, fTop, lTop] = box.top;
      return (
        <g strokeLinejoin="round">
          {/* Back cardboard flaps and dark interior */}
          <polygon
            points={pts([lTop, bTop, [9.6, 4.4], [3.8, 7.3]])}
            fill="#e8c48a"
            stroke="#262626"
            strokeWidth="0.95"
          />
          <polygon
            points={pts([bTop, rTop, [20.2, 7.3], [14.4, 4.4]])}
            fill="#c89a5a"
            stroke="#262626"
            strokeWidth="0.95"
          />
          <polygon points={pts(box.top)} fill="#7e5828" stroke="#262626" strokeWidth="0.9" />
          {/* Snow mound inside the box */}
          <SnowMound
            gradId={`${uid}-snow`}
            d="M7.0,10.9 C7.5,8.9 9.2,8.2 10.2,7.1 C11.2,5.6 12.8,5.6 13.8,7.2 C15.0,8.1 16.5,8.8 17.0,10.9 L12.0,13.4 Z"
            creaseD="M9.6,9.2 Q11.4,8.2 13.2,9.4"
            strokeWidth={0.95}
          />
          {/* Front box walls */}
          <polygon points={pts(box.left)} fill="#c89a5a" stroke="#262626" strokeWidth="1.05" />
          <polygon points={pts(box.right)} fill="#a8783c" stroke="#262626" strokeWidth="1.05" />
          {/* Front open flaps */}
          <polygon
            points={pts([lTop, fTop, [9.2, 15.6], [3.4, 12.7]])}
            fill="#e8c48a"
            stroke="#262626"
            strokeWidth="1.0"
          />
          <polygon
            points={pts([fTop, rTop, [20.6, 12.7], [14.8, 15.6]])}
            fill="#c89a5a"
            stroke="#262626"
            strokeWidth="1.0"
          />
        </g>
      );
    },
  },
  {
    id: 'sop.mpmdebrissource',
    label: 'MPM Debris Source',
    family: 'sop',
    description:
      'Two closely overlapping snowballs with a semi-transparent front snowball revealing three small red debris points inside their overlap.',
    types: ['mpmdebrissource'],
    icons: ['sop_mpmdebrissource'],
    refKey: 'SOP_mpmdebrissource',
    render: (uid) => {
      const frontPath = bumpyCirclePath(14.1, 13.8, 6.6);
      return (
        <g strokeLinejoin="round">
          {/* Back snowball at upper-left */}
          <Snowball gradId={`${uid}-back`} cx={9.0} cy={8.7} r={6.5} bumpy strokeWidth={1.05} innerArcs />
          {/* Semi-transparent front snowball at lower-right so the back snowball shows through the overlap */}
          <Snowball
            gradId={`${uid}-front`}
            cx={14.1}
            cy={13.8}
            r={6.6}
            bumpy
            strokeWidth={0}
            innerArcs
            fillOpacity={0.64}
          />
          {/* Soft white rim highlight along the front snowball's upper-left overlap edge */}
          <path
            d="M15.4,7.5 C11.1,7.3 7.7,10.7 7.8,15.0 C8.2,11.6 11.2,8.6 15.4,7.5 Z"
            fill="#ffffff"
            fillOpacity="0.65"
          />
          {/* Crisp dark outer outline on the front snowball */}
          <path d={frontPath} fill="none" stroke="#262626" strokeWidth="1.05" strokeLinejoin="round" />
          {/* Three small red debris points inside the lens-shaped overlap of both snowballs */}
          <g fill="#e03228" stroke="#262626" strokeWidth="0.6">
            <circle cx="13.3" cy="9.3" r="0.7" />
            <circle cx="11.3" cy="11.1" r="0.7" />
            <circle cx="9.8" cy="13.5" r="0.7" />
          </g>
        </g>
      );
    },
  },
  {
    id: 'sop.mpmdeformpieces',
    label: 'MPM Deform Pieces',
    family: 'sop',
    description: 'Squashed, slumping sandy-tan castle melting into a chunky sand pile with a tilted red pennant flag.',
    types: ['mpmdeformpieces'],
    icons: ['sop_mpmdeformpieces'],
    refKey: 'SOP_mpmdeformpieces',
    render: () => (
      <g strokeLinejoin="round">
        {/* Collapsed, squashed crenellated sandcastle keep slumping into a wide ragged sand pile */}
        <path
          d="M2.4,17.6 C2.4,15.6 3.6,14.2 5.4,13.0 C5.6,10.6 5.8,8.4 6.2,7.8 L8.4,7.2 L9.6,8.4 L11.4,7.6 L11.8,5.6 L14.6,5.8 L15.6,7.4 L17.4,8.0 C18.0,9.6 18.2,11.4 18.2,13.0 C20.2,14.0 21.6,15.4 21.4,17.6 C21.0,19.4 18.4,20.2 15.6,20.4 C13.2,20.6 11.4,19.8 9.0,20.4 C5.4,20.8 2.4,19.4 2.4,17.6 Z"
          fill="#e8c48a"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Sunlit upper turret tops and slumped left sandcastle shoulder */}
        <path
          d="M6.2,7.8 L8.4,7.2 L9.6,8.4 L11.4,7.6 L11.8,5.6 L14.6,5.8 L15.6,7.4 L17.0,8.0 L13.8,9.8 L11.2,11.2 C8.8,10.8 7.0,9.6 6.2,7.8 Z"
          fill="#ffe47a"
        />
        {/* Recessed dark courtyard hollow and battlement notch shadows */}
        <polygon points="8.6,8.2 12.0,6.6 14.8,7.6 11.6,9.4" fill="#7e5828" />
        {/* Bulging shaded right castle wall and spilled right sand skirt */}
        <path
          d="M11.6,11.2 C13.8,10.6 16.0,9.6 17.4,8.4 C17.8,10.0 18.2,11.6 18.2,13.0 C19.8,14.0 21.2,15.4 21.0,17.4 C20.2,19.2 17.2,20.0 14.4,20.0 C12.4,20.0 11.6,18.2 11.6,15.8 Z"
          fill="#c89a5a"
        />
        {/* Soft sagging slump folds (curved, not a sharp fracture line) */}
        <path
          d="M5.6,12.8 Q8.8,14.4 12.2,13.4 M13.4,13.2 Q16.2,14.2 18.4,13.2 M4.2,16.4 Q8.0,14.8 11.4,16.8"
          fill="none"
          stroke="#a8783c"
          strokeWidth="0.85"
          strokeLinecap="round"
        />
        {/* Crisp outer keep + sand skirt outline */}
        <path
          d="M2.4,17.6 C2.4,15.6 3.6,14.2 5.4,13.0 C5.6,10.6 5.8,8.4 6.2,7.8 L8.4,7.2 L9.6,8.4 L11.4,7.6 L11.8,5.6 L14.6,5.8 L15.6,7.4 L17.4,8.0 C18.0,9.6 18.2,11.4 18.2,13.0 C20.2,14.0 21.6,15.4 21.4,17.6 C21.0,19.4 18.4,20.2 15.6,20.4 C13.2,20.6 11.4,19.8 9.0,20.4 C5.4,20.8 2.4,19.4 2.4,17.6 Z"
          fill="none"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Irregular broken sand clumps along the foreground */}
        <polygon points="3.2,18.2 4.9,17.4 5.6,19.0 3.6,19.4" fill="#ffe47a" stroke="#262626" strokeWidth="0.75" />
        <polygon points="8.4,18.6 11.4,18.0 12.0,19.6 8.8,20.2" fill="#ffe47a" stroke="#262626" strokeWidth="0.75" />
        <polygon points="16.4,17.8 19.2,17.0 19.8,18.8 16.8,19.4" fill="#e8c48a" stroke="#262626" strokeWidth="0.75" />
        <RedFlag x={14.0} y={7.0} angleDeg={28} />
      </g>
    ),
  },
  {
    id: 'sop.mpmpostfracture',
    label: 'MPM Post-Fracture',
    family: 'sop',
    description:
      'Upright crenellated sandy-tan castle keep split across the middle by a jagged horizontal crack, with a vertical red pennant flag on top.',
    types: ['mpmpostfracture'],
    icons: ['sop_mpmpostfracture'],
    refKey: 'SOP_mpmpostfracture',
    render: () => (
      <g strokeLinejoin="round">
        {/* Wavy sand skirt base */}
        <path
          d="M4.8,17.2 C4.6,15.6 6.8,14.8 12.0,14.8 C17.2,14.8 19.4,15.6 19.2,17.2 C19.0,19.2 16.0,20.6 12.0,20.6 C8.0,20.6 5.0,19.2 4.8,17.2 Z"
          fill="#e8c48a"
          stroke="#262626"
          strokeWidth="1.05"
        />
        <path d="M12.0,15.0 C16.6,15.0 18.8,15.8 18.6,17.2 C18.4,18.9 15.6,20.1 12.0,20.1 Z" fill="#c89a5a" />
        {/* Lower fractured keep */}
        <polygon points="7.2,12.2 12.0,14.4 12.0,18.8 7.2,16.6" fill="#e8c48a" stroke="#262626" strokeWidth="1.0" />
        <polygon points="12.0,14.4 16.8,12.2 16.8,16.6 12.0,18.8" fill="#c89a5a" stroke="#262626" strokeWidth="1.0" />
        {/* Upper crenellated keep slightly shifted over the fracture crack */}
        <path
          d="M6.6,8.4 L12.0,5.8 L17.4,8.4 L17.2,12.4 L15.0,13.6 L13.8,12.8 L12.0,14.0 L10.0,12.8 L8.8,13.6 L6.8,12.4 Z"
          fill="#e8c48a"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Top face and battlements */}
        <polygon points="6.6,8.4 12.0,5.8 17.4,8.4 12.0,11.0" fill="#ffe47a" stroke="#262626" strokeWidth="0.85" />
        <polygon points="8.6,8.4 12.0,6.8 15.4,8.4 12.0,10.0" fill="#7e5828" />
        {/* Front-right shaded face of upper keep */}
        <polygon
          points="12.0,11.0 17.4,8.4 17.2,12.4 15.0,13.6 13.8,12.8 12.0,14.0"
          fill="#c89a5a"
          stroke="#262626"
          strokeWidth="0.9"
        />
        {/* Jagged dark fracture seam across the middle */}
        <path
          d="M6.8,12.5 L8.8,13.7 L10.0,12.9 L12.0,14.1 L13.8,12.9 L15.0,13.7 L17.2,12.5"
          fill="none"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
        {/* Front crenellation notches */}
        <polygon points="8.6,9.4 10.2,10.2 10.2,11.2 8.6,10.4" fill="#7e5828" />
        <polygon points="13.8,10.2 15.4,9.4 15.4,10.4 13.8,11.2" fill="#7e5828" />
        <RedFlag x={12.0} y={8.2} />
      </g>
    ),
  },
  {
    id: 'sop.mpmsolver',
    label: 'MPM Solver',
    family: 'sop',
    description: 'Pink symmetrical solver brain nestled into the top of a fluffy white and icy-blue snowbank.',
    types: ['mpmsolver'],
    icons: ['sop_mpmsolver'],
    refKey: 'SOP_mpmsolver',
    render: (uid) => (
      <g strokeLinejoin="round">
        <SolverBrain cx={12} cy={8.8} scale={0.86} />
        <SnowMound
          gradId={`${uid}-bank`}
          d="M2.6,17.0 C3.0,14.8 4.8,14.0 6.4,12.4 C7.8,10.8 9.2,10.2 10.8,11.0 C11.8,11.4 12.6,11.4 13.6,10.9 C15.2,10.1 16.8,10.9 18.2,12.6 C19.6,14.2 21.0,15.0 21.4,17.0 C21.6,18.5 18.2,19.2 14.4,19.2 C12.4,19.2 11.4,18.8 9.6,19.2 C6.2,19.6 2.4,18.6 2.6,17.0 Z"
          creaseD="M6.4,14.8 Q8.8,13.4 11.2,14.8 M13.4,14.6 Q15.8,13.4 18.2,15.0"
          strokeWidth={1.1}
        />
      </g>
    ),
  },
  {
    id: 'sop.mpmsource',
    label: 'MPM Source',
    family: 'sop',
    description:
      'Packed white and icy-blue snowball held cupped between a pair of plump red mittens with rounded thumbs.',
    types: ['mpmsource'],
    icons: ['sop_mpmsource'],
    refKey: 'SOP_mpmsource',
    render: (uid) => (
      <g strokeLinejoin="round">
        {/* Deep red interior shadow behind the snowball where the two mittens cup together */}
        <circle cx="11.8" cy="12.2" r="7.8" fill="#a81f18" stroke="#262626" strokeWidth="1.0" />

        {/* Left red mitten thumb curling over the top of the snowball */}
        <path
          d="M8.0,5.8 C8.2,2.9 10.6,1.9 12.6,2.5 C14.4,3.1 15.6,5.0 14.9,6.8 C14.1,8.2 9.8,7.8 8.0,5.8 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="1.05"
        />
        <path
          d="M9.4,4.2 C10.3,2.9 12.2,2.8 13.6,3.7 C14.0,4.0 13.6,4.7 13.1,4.4 C12.0,3.7 10.5,3.8 9.9,4.8 C9.6,5.2 9.1,4.6 9.4,4.2 Z"
          fill="#ff7066"
        />

        {/* Right red mitten (upper-right thumb lobe + right palm wrapping down to bottom-right) */}
        <path
          d="M14.2,6.0 C16.0,4.9 18.8,5.4 20.1,7.4 C21.0,8.7 20.9,10.2 20.3,11.2 C21.3,13.4 20.8,16.5 18.9,18.7 C16.9,20.9 13.2,21.5 9.8,20.8 C8.0,20.4 7.0,19.3 7.6,18.2 C9.6,15.6 13.0,11.2 14.2,6.0 Z"
          fill="#d42b22"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Right mitten upper-right thumb highlight */}
        <path
          d="M15.8,6.5 C17.2,5.8 18.8,6.3 19.5,7.7 C19.8,8.2 19.1,8.6 18.8,8.1 C18.3,7.1 17.1,6.7 16.1,7.2 C15.6,7.4 15.3,6.7 15.8,6.5 Z"
          fill="#ff7066"
        />
        {/* Right mitten outer right palm highlight */}
        <path
          d="M19.6,11.8 C20.3,13.6 19.9,16.0 18.4,17.8 C18.1,18.2 17.5,17.7 17.8,17.3 C19.1,15.7 19.4,13.7 18.9,12.1 C18.7,11.6 19.4,11.3 19.6,11.8 Z"
          fill="#ff7066"
        />
        {/* Right mitten lower cuff/edge highlight and shadow */}
        <path
          d="M9.6,18.2 C11.6,18.9 14.0,18.8 15.8,17.8 C16.3,17.5 16.7,18.2 16.2,18.5 C14.1,19.6 11.4,19.7 9.3,18.9 C8.8,18.7 9.1,18.0 9.6,18.2 Z"
          fill="#ff7066"
        />
        <path
          d="M8.2,19.1 C10.6,20.6 14.4,20.8 17.2,19.3 C18.4,18.6 19.3,17.5 19.8,16.2 C18.4,18.2 15.8,19.4 12.6,19.5 C10.6,19.5 9.1,19.2 8.2,19.1 Z"
          fill="#a81f18"
        />
        {/* Right mitten thumb crease separating the upper-right thumb from the palm */}
        <path
          d="M15.6,8.8 C17.5,8.4 19.2,9.4 20.1,11.1"
          fill="none"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinecap="round"
        />

        {/* Left red mitten body (thick curved palm/fingers wrapping the entire left side) */}
        <path
          d="M10.1,3.7 C5.5,4.1 2.4,8.0 2.5,12.8 C2.6,16.9 5.6,19.7 9.8,19.6 C11.2,19.6 12.0,18.6 11.4,17.5 C9.4,15.2 8.8,8.8 11.2,5.6 C11.7,4.6 11.2,3.6 10.1,3.7 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Left mitten bright upper-left highlight */}
        <path
          d="M9.4,4.6 C5.8,5.2 3.5,8.5 3.6,12.7 C3.6,14.8 4.4,16.5 5.7,17.7 C4.9,16.1 4.5,14.2 4.6,12.2 C4.7,8.6 6.7,5.8 9.6,5.3 C10.1,5.2 9.9,4.5 9.4,4.6 Z"
          fill="#ff7066"
        />
        {/* Left mitten lower inner fold shadow */}
        <path
          d="M4.5,16.8 C5.9,18.5 8.0,19.2 10.2,19.0 C10.7,18.5 10.4,17.8 9.6,17.6 C7.6,17.3 5.8,17.0 4.5,16.8 Z"
          fill="#a81f18"
        />

        {/* Central packed bumpy snowball held inside the mittens */}
        <Snowball gradId={`${uid}-core`} cx={11.8} cy={12.1} r={5.4} bumpy strokeWidth={1.05} innerArcs />
      </g>
    ),
  },
  {
    id: 'sop.mpmsurface',
    label: 'MPM Surface',
    family: 'sop',
    description: 'White and icy-blue snowball encased on its left hemisphere by a smooth curved blue metallic shell.',
    types: ['mpmsurface'],
    icons: ['sop_mpmsurface'],
    refKey: 'SOP_mpmsurface',
    render: (uid) => (
      <g strokeLinejoin="round">
        <defs>
          <linearGradient id={`${uid}-shell`} x1="18%" y1="12%" x2="80%" y2="88%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="30%" stopColor="#8fc2ff" />
            <stop offset="68%" stopColor="#3672c4" />
            <stop offset="100%" stopColor="#2e5a9a" />
          </linearGradient>
        </defs>
        {/* Right exposed snowball */}
        <Snowball gradId={`${uid}-snow`} cx={12.2} cy={12.0} r={8.6} bumpy strokeWidth={1.1} innerArcs />
        {/* Left curved metallic blue shell */}
        <path
          d="M12.6,3.3 C6.9,3.3 3.3,7.3 3.3,12.0 C3.3,16.7 6.9,20.7 12.6,20.7 C9.3,17.0 8.9,7.1 12.6,3.3 Z"
          fill={`url(#${uid}-shell)`}
          stroke="#262626"
          strokeWidth="1.1"
        />
        {/* Filled specular highlight sliver on the blue shell */}
        <path
          d="M10.1,4.8 C7.0,6.6 5.6,9.7 6.1,13.6 C6.2,14.1 6.9,13.9 6.8,13.4 C6.4,10.0 7.5,7.1 10.5,5.5 C10.9,5.2 10.5,4.6 10.1,4.8 Z"
          fill="#eef2f7"
        />
      </g>
    ),
  },
];
