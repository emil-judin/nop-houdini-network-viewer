import { type Pt, pts, tiltedTorus } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { TORUS_BODY, TORUS_MID, TORUS_SHADOW } from '../kits/torus';

const OUTLINE = '#262626';

/** Counter-clockwise Archimedean spiral matching the open coil spacing of SOP_spiral. */
const ccwSpiralPath = (
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  turns: number,
  start: number,
): string => {
  const steps = Math.round(turns * 28);
  const out: Pt[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const r = rOuter + (rInner - rOuter) * t;
    const a = start - t * turns * Math.PI * 2;
    out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return `M${pts(out).replace(/ /g, ' L')}`;
};

const SPIRAL_D = ccwSpiralPath(12, 12, 9.0, 1.5, 1.85, Math.PI * 0.52);

const torusRingLoop = (torus: ReturnType<typeof tiltedTorus>, s: number, steps = 24): string => {
  const list: Pt[] = [];
  for (let i = 0; i < steps; i += 1) {
    list.push(torus.ring(s, (i * 360) / steps));
  }
  return `M${pts(list).replace(/ /g, ' L')} Z`;
};

/**
 * Primitive and generator operators: basic shapes, metaballs, text, L-systems and bounding hulls.
 */
export const PRIMITIVE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.box',
    label: 'Box',
    family: 'sop',
    description:
      'Isometric three-tone grey cube (light top, mid left, dark right) with dark outlines. The reference for all grey solids.',
    types: ['box'],
    refKey: 'SOP_box',
    render: () => (
      <>
        <polygon points="12,3 20,7 12,11 4,7" fill="#eef2f7" stroke="#262626" strokeWidth="1.2" />
        <polygon points="4,7 12,11 12,20.5 4,16.5" fill="#c0c7d1" stroke="#262626" strokeWidth="1.2" />
        <polygon points="20,7 12,11 12,20.5 20,16.5" fill="#89929e" stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'sop.sphere',
    label: 'Sphere',
    family: 'sop',
    description: 'Shaded metallic sphere with a white highlight at the upper left.',
    types: ['sphere'],
    refKey: 'SOP_sphere',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ball`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#525862" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="8" fill={`url(#${uid}-ball)`} stroke="#232323" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'sop.tube',
    label: 'Tube',
    family: 'sop',
    description: 'Grey open cylinder with a darker top opening.',
    types: ['tube'],
    refKey: 'SOP_tube',
    render: () => (
      <>
        <path d="M6.5,6 V18 A5.5,2.2 0 0 0 17.5,18 V6" fill="#c2cad6" stroke="#262626" strokeWidth="1.2" />
        <ellipse cx="12" cy="6" rx="5.5" ry="2.2" fill="#89929e" stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'sop.grid',
    label: 'Grid',
    family: 'sop',
    description: 'Flat light grey perspective plane divided into a 3 x 2 grid.',
    types: ['grid'],
    refKey: 'SOP_grid',
    render: () => (
      <>
        <polygon points="5,9 19,9 22,16 2,16" fill="#dce2ea" stroke="#262626" strokeWidth="1.3" />
        <line x1="9.5" y1="9" x2="8" y2="16" stroke="#4a4a4a" strokeWidth="0.9" />
        <line x1="14.5" y1="9" x2="16" y2="16" stroke="#4a4a4a" strokeWidth="0.9" />
        <line x1="3.5" y1="12.5" x2="20.5" y2="12.5" stroke="#4a4a4a" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.circle',
    label: 'Circle',
    family: 'sop',
    description: 'Pale blue ring drawn over a thicker dark ring so it reads on any node color.',
    types: ['circle'],
    refKey: 'SOP_circle',
    render: () => (
      <>
        <circle cx="12" cy="12" r="8" fill="none" stroke="#232323" strokeWidth="3.2" />
        <circle cx="12" cy="12" r="8" fill="none" stroke="#9cb6d9" strokeWidth="1.8" />
      </>
    ),
  },
  {
    id: 'sop.line',
    label: 'Line',
    family: 'sop',
    description: 'Grey axis corner with a red diagonal line segment ending in a white point.',
    types: ['line'],
    refKey: 'SOP_line',
    render: () => (
      <>
        <polyline points="5,4 5,19 20,19" fill="none" stroke="#9aa2ae" strokeWidth="1.5" />
        <line x1="5" y1="19" x2="18" y2="6" stroke="#e03828" strokeWidth="2.3" strokeLinecap="round" />
        <circle cx="18" cy="6" r="1.8" fill="#ffffff" stroke="#222" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.curve',
    label: 'Curve',
    family: 'sop',
    description:
      'Blue Bezier arc with light blue square end points under a red control-hull line, drawn by a blue fountain pen whose nib touches the top of the arc.',
    types: ['curve'],
    refKey: 'SOP_curve',
    render: () => (
      <>
        {/* Control hull */}
        <path d="M3.5 4.5H20.5" stroke="#e03228" strokeWidth="1.3" />
        <circle cx="20.5" cy="4.5" r="1.5" fill="#e03228" stroke="#262626" strokeWidth="0.8" />
        <rect x="10.5" y="3" width="3" height="3" fill="#8fc2ff" stroke="#262626" strokeWidth="0.9" />
        {/* Bezier curve */}
        <path d="M3.5 19C3.5 4.5 20.5 4.5 20.5 19" fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M3.5 19C3.5 4.5 20.5 4.5 20.5 19"
          fill="none"
          stroke="#5aa2f2"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <rect x="2" y="17.5" width="3" height="3" fill="#8fc2ff" stroke="#262626" strokeWidth="0.9" />
        <rect x="19" y="17.5" width="3" height="3" fill="#8fc2ff" stroke="#262626" strokeWidth="0.9" />
        {/* Pen, tip touching the top of the curve */}
        <g transform="translate(12 8.6) rotate(-35)">
          <path d="M0 0L2.4 5.5H-2.4Z" fill="#dfe4ea" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
          <line x1="0" y1="1.6" x2="0" y2="4.2" stroke="#262626" strokeWidth="0.8" />
          <rect x="-2.6" y="5.5" width="5.2" height="1.6" fill="#89929e" stroke="#262626" strokeWidth="0.9" />
          <rect x="-2.6" y="7.1" width="5.2" height="6.4" rx="1.6" fill="#2e64b0" stroke="#262626" strokeWidth="1.1" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.platonic',
    label: 'Platonic Solids',
    family: 'sop',
    description: 'Faceted metallic grey icosahedron resting over a soft ground shadow.',
    types: ['platonic'],
    icons: ['sop_platonic'],
    refKey: 'SOP_platonic',
    render: () => (
      <>
        <ellipse cx="12" cy="20.8" rx="8.8" ry="2" fill="#262626" fillOpacity="0.3" />
        <g stroke="#262626" strokeWidth="0.75" strokeLinejoin="round">
          <polygon points="6.2,3.4 16.5,2 9.8,6.2" fill="#eeeeec" />
          <polygon points="6.2,3.4 9.8,6.2 2.4,12.8" fill="#d3d7cf" />
          <polygon points="16.5,2 21.4,10.2 9.8,6.2" fill="#b8b8b8" />
          <polygon points="9.8,6.2 21.4,10.2 11.4,17.2" fill="#9e9e9e" />
          <polygon points="2.4,12.8 9.8,6.2 11.4,17.2" fill="#848484" />
          <polygon points="2.4,12.8 11.4,17.2 8.2,21" fill="#666666" />
          <polygon points="11.4,17.2 18.8,19.4 8.2,21" fill="#515151" />
          <polygon points="11.4,17.2 21.4,10.2 18.8,19.4" fill="#707070" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.torus',
    label: 'Torus',
    family: 'sop',
    description: 'Three-tone shaded grey polygonal torus with radial and longitudinal wireframe mesh lines.',
    types: ['torus'],
    icons: ['sop_torus'],
    refKey: 'SOP_torus',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-clip`}>
            <path d={TORUS_BODY.body} clipRule="evenodd" />
          </clipPath>
        </defs>
        <path d={TORUS_BODY.innerWall} fill="#89929e" stroke={OUTLINE} strokeWidth="0.85" strokeLinejoin="round" />
        <path d={TORUS_BODY.body} fill="#eef2f7" fillRule="evenodd" />
        <g clipPath={`url(#${uid}-clip)`}>
          <path d={TORUS_MID} fill="#c0c7d1" />
          <path d={TORUS_SHADOW} fill="#89929e" />
          <g fill="none" stroke="#5a616b" strokeWidth="0.65">
            <path d={torusRingLoop(TORUS_BODY, 0.48)} />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const p0 = TORUS_BODY.ring(0, deg);
              const p1 = TORUS_BODY.ring(1, deg);
              return <line key={deg} x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} />;
            })}
          </g>
        </g>
        <path d={TORUS_BODY.body} fill="none" stroke={OUTLINE} strokeWidth="1.15" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.spiral',
    label: 'Spiral',
    family: 'sop',
    description: 'Flat orange-and-white spiral curve coiling outward from the center with a dark casing.',
    types: ['spiral'],
    icons: ['sop_spiral'],
    refKey: 'SOP_spiral',
    render: () => <CasedStroke d={SPIRAL_D} color="#ee8624" width={1.55} casing={2.75} />,
  },
  {
    id: 'sop.metaball',
    label: 'Metaball',
    family: 'sop',
    description: 'Two glossy blue spheres fused together by a smooth organic metaball bridge.',
    types: ['metaball'],
    icons: ['sop_metaball'],
    refKey: 'SOP_metaball',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-mb-g1`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#fbfdff" />
            <stop offset="45%" stopColor="#8bafe5" />
            <stop offset="100%" stopColor="#00419e" />
          </radialGradient>
        </defs>
        <path
          d="M7.2,3 C10,3 11.6,4.8 12.4,6.8 C13,8.2 13.6,8.8 15.2,8.5 C16,8.3 16.8,8.2 17.4,8.2 C20.4,8.2 22.2,10.5 22.2,13.5 C22.2,16.6 19.8,19 16.8,19 C14.2,19 12.5,17.2 11.6,15 C11,13.4 10.2,12.8 8.4,13.2 C7.9,13.3 7.5,13.4 7,13.4 C4.1,13.4 2,11.1 2,8.2 C2,5.3 4.3,3 7.2,3 Z"
          fill={`url(#${uid}-mb-g1)`}
          stroke="#132c51"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <ellipse cx="5.8" cy="6.2" rx="1.8" ry="1.2" fill="#ffffff" fillOpacity="0.7" transform="rotate(-25 5.8 6.2)" />
        <ellipse
          cx="15.8"
          cy="11.4"
          rx="2"
          ry="1.3"
          fill="#ffffff"
          fillOpacity="0.65"
          transform="rotate(-25 15.8 11.4)"
        />
      </>
    ),
  },
  {
    id: 'sop.metagroups',
    label: 'MetaGroups',
    family: 'sop',
    description:
      'Two distinct metaball groups: a green fused pair in the upper right and a blue fused pair in the lower left.',
    types: ['metagroups'],
    icons: ['sop_metagroups'],
    refKey: 'SOP_metagroups',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mg-gr`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cbfb9d" />
            <stop offset="55%" stopColor="#7ce160" />
            <stop offset="100%" stopColor="#169e00" />
          </linearGradient>
          <linearGradient id={`${uid}-mg-bl`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4e6ff" />
            <stop offset="55%" stopColor="#729fcf" />
            <stop offset="100%" stopColor="#00419e" />
          </linearGradient>
        </defs>
        <path
          d="M10.8,5.8 C12.6,5.8 13.8,7 14.3,8.2 C14.8,9.2 15.4,9.4 16.6,9 C17.1,8.8 17.6,8.8 18.1,8.8 C20.2,8.8 21.8,10.4 21.8,12.5 C21.8,14.6 20.1,16.2 18,16.2 C16.2,16.2 15,15 14.4,13.6 C13.9,12.5 13.2,12.2 11.8,12.5 C11.4,12.6 11,12.6 10.6,12.6 C8.6,12.6 7,11 7,9.2 C7,7.3 8.7,5.8 10.8,5.8 Z"
          fill={`url(#${uid}-mg-gr)`}
          stroke="#1b5113"
          strokeWidth="0.95"
          strokeLinejoin="round"
          transform="translate(0, -3.5)"
        />
        <path
          d="M6.2,10.2 C8.2,10.2 9.5,11.5 10.1,12.9 C10.6,14 11.2,14.2 12.6,13.8 C13.1,13.6 13.7,13.6 14.2,13.6 C16.5,13.6 18.2,15.3 18.2,17.6 C18.2,19.9 16.4,21.6 14.1,21.6 C12.1,21.6 10.8,20.3 10.1,18.8 C9.6,17.6 8.8,17.2 7.3,17.6 C6.9,17.7 6.5,17.7 6,17.7 C3.8,17.7 2.2,16 2.2,13.9 C2.2,11.8 4,10.2 6.2,10.2 Z"
          fill={`url(#${uid}-mg-bl)`}
          stroke="#132c51"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.convertmeta',
    label: 'Convert Meta',
    family: 'sop',
    description:
      'Smooth light blue sphere at the top-left overlapping an orange faceted polygon sphere at the bottom-right.',
    types: ['convertmeta'],
    icons: ['sop_convertmeta'],
    refKey: 'SOP_convertmeta',
    render: () => (
      <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
        <circle cx="8.5" cy="8.5" r="5.2" fill="#8fc2ff" />
        <circle cx="7" cy="6.8" r="1.5" fill="#f2f4f7" stroke="none" />
        <polygon points="15,9.5 19.2,11.5 20.2,16 17,19.8 12.2,19.2 10.5,15 11.8,11.2" fill="#ee8624" />
        <polygon points="13.5,12.5 17.2,13 17.8,16.5 14.5,17.8 12.5,15.5" fill="#ffb066" strokeWidth="0.9" />
      </g>
    ),
  },
  {
    id: 'sop.font',
    label: 'Font',
    family: 'sop',
    description: '3D extruded metallic grey serif capital letter T lit from the front left.',
    types: ['font'],
    icons: ['sop_font'],
    refKey: 'SOP_font',
    render: () => (
      <>
        <g stroke={OUTLINE} strokeWidth="0.85" strokeLinejoin="round">
          {/* Extruded shadowed right and bottom bevel faces */}
          <polygon points="18.2,3.4 20.4,4.7 20.4,9.6 18.2,8.3" fill="#89929e" />
          <polygon points="16.4,8.3 18.2,8.3 20.4,9.6 18.6,9.6" fill="#c0c7d1" />
          <polygon points="13.0,6.2 16.2,6.2 18.4,7.5 15.2,7.5" fill="#c0c7d1" />
          <polygon points="4.0,8.3 5.8,8.3 8.0,9.6 6.2,9.6" fill="#c0c7d1" />
          <polygon points="5.8,8.3 6.0,6.2 8.2,7.5 8.0,9.6" fill="#89929e" />
          <polygon points="6.0,6.2 9.4,6.2 9.4,7.5 8.2,7.5" fill="#c0c7d1" />
          <polygon points="13.0,6.2 15.2,7.5 15.2,19.5 13.0,18.2" fill="#89929e" />
          <polygon points="15.4,18.2 17.6,19.5 17.6,21.1 15.4,19.8" fill="#89929e" />
          <polygon points="7.0,19.8 15.4,19.8 17.6,21.1 9.2,21.1" fill="#89929e" />
        </g>
        {/* Front serif T face */}
        <polygon
          points="4.0,3.4 18.2,3.4 18.2,8.3 16.4,8.3 16.2,6.2 13.0,6.2 13.0,18.2 15.4,18.2 15.4,19.8 7.0,19.8 7.0,18.2 9.4,18.2 9.4,6.2 6.0,6.2 5.8,8.3 4.0,8.3"
          fill="#eef2f7"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.lsystem',
    label: 'L-System',
    family: 'sop',
    description: 'Recursive blue branching L-system tree with a small ground shadow.',
    types: ['lsystem'],
    icons: ['sop_lsystem'],
    refKey: 'SOP_lsystem',
    render: () => (
      <>
        <path d="M10.5,21.6 L14.5,20.2 L19.8,19.6 L14.2,21.2 Z" fill="#666666" fillOpacity="0.45" />
        <g fill="none" stroke="#183969" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.5,21.5 L12,15 L12,9.5 L8.8,5.2 L7.2,2.2" />
          <path d="M8.8,5.2 L4.5,4.2" />
          <path d="M12,12.2 L6.8,9.8 L3,8" />
          <path d="M6.8,9.8 L6,6.5" />
          <path d="M11.6,14.5 L5.2,13.5 L2.5,15.5" />
          <path d="M5.2,13.5 L2.5,12" />
          <path d="M12,9.5 L16.2,5.5 L15.5,2.4" />
          <path d="M16.2,5.5 L20.2,3.8" />
          <path d="M12,12.5 L17.8,10.2 L21.2,7.5" />
          <path d="M17.8,10.2 L21.2,11.5" />
          <path d="M12,15.2 L16.8,15.8 L20.8,18.2" />
        </g>
        <g fill="none" stroke="#729fcf" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.5,21.5 L12,15 L12,9.5 L8.8,5.2 L7.2,2.2" />
          <path d="M8.8,5.2 L4.5,4.2" />
          <path d="M12,12.2 L6.8,9.8 L3,8" />
          <path d="M6.8,9.8 L6,6.5" />
          <path d="M11.6,14.5 L5.2,13.5 L2.5,15.5" />
          <path d="M5.2,13.5 L2.5,12" />
          <path d="M12,9.5 L16.2,5.5 L15.5,2.4" />
          <path d="M16.2,5.5 L20.2,3.8" />
          <path d="M12,12.5 L17.8,10.2 L21.2,7.5" />
          <path d="M17.8,10.2 L21.2,11.5" />
          <path d="M12,15.2 L16.8,15.8 L20.8,18.2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.bound',
    label: 'Bound',
    family: 'sop',
    description: 'Green cone, blue sphere and red cylinder enclosed inside a blue wireframe bounding box.',
    types: ['bound'],
    icons: ['sop_bound'],
    refKey: 'SOP_bound',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon points="7,7.5 10,14.5 4.5,14.5" fill="#58c848" />
          <circle cx="13.5" cy="8.5" r="2.6" fill="#3672c4" />
          <polygon points="11,15.5 15.5,12 18,15 13.5,18.5" fill="#e03228" />
        </g>
        <path
          d="M3,6.5 L12,3 L21,6.5 L21,16.5 L12,21 L3,16.5 Z M3,6.5 L12,10.5 L21,6.5 M12,10.5 V21"
          fill="none"
          stroke="#262626"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M3,6.5 L12,3 L21,6.5 L21,16.5 L12,21 L3,16.5 Z M3,6.5 L12,10.5 L21,6.5 M12,10.5 V21"
          fill="none"
          stroke="#5aa2f2"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.shrinkwrap',
    label: 'Shrinkwrap',
    family: 'sop',
    description: 'Glassy blue-grey teapot tightly enclosed by a red convex hull outline.',
    types: ['shrinkwrap'],
    refKey: 'SOP_shrinkwrap-2.0',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pot`} cx="38%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b8c8dc" />
            <stop offset="100%" stopColor="#6f8199" />
          </radialGradient>
        </defs>
        {/* Handle */}
        <path
          d="M17.3 11.5C20 11 20.5 15 17 16.5"
          fill="none"
          stroke="#262626"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M17.3 11.5C20 11 20.5 15 17 16.5"
          fill="none"
          stroke="#b8c8dc"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Spout */}
        <path
          d="M7 13C4.5 12.5 4 10.5 3 9.5L4.2 8.8C5.5 10 6.2 11 7.4 11.4Z"
          fill={`url(#${uid}-pot)`}
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Body and lid */}
        <ellipse cx="12" cy="14" rx="5.5" ry="4.5" fill={`url(#${uid}-pot)`} stroke="#262626" strokeWidth="1.1" />
        <ellipse cx="12" cy="9.6" rx="3" ry="1" fill="#dfe4ea" stroke="#262626" strokeWidth="0.9" />
        <circle cx="12" cy="8.4" r="0.9" fill="#dfe4ea" stroke="#262626" strokeWidth="0.8" />
        {/* Shrinkwrap hull */}
        <polygon
          points="2.2,9 9,7.3 15,7.3 20.5,11 20,16 16,19.2 8,19.2 4.5,16"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
