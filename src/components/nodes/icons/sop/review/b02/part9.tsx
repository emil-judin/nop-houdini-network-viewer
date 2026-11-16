import type { OperatorIconDef } from '../../../iconTypes';
import { pts, quadPt, type Pt } from '../../../geoHelpers';
import { IsoCube } from './sharedElements';

/**
 * Batch 2, Part 9 (icons 90 to 99): built-in Houdini SOP icons under review.
 */
export const BATCH_02_PART_9: OperatorIconDef[] = [
  {
    id: 'sop.ropnet',
    label: 'ROP Network',
    family: 'sop',
    description:
      'Tilted metallic silver cinema film reel with circular spool cutouts and a central spindle hub.',
    types: ['ropnet'],
    icons: ['networks_rop'],
    refKey: 'NETWORKS_rop',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-rop-face`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        <ellipse cx="12" cy="19.2" rx="8.6" ry="2.4" fill="#262626" fillOpacity="0.22" />
        {/* Reel rim depth */}
        <ellipse
          cx="12"
          cy="12.6"
          rx="8.8"
          ry="7.6"
          transform="rotate(-12 12 12.6)"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1"
        />
        {/* Metallic silver front disc */}
        <ellipse
          cx="11.6"
          cy="10.8"
          rx="8.6"
          ry="7.4"
          transform="rotate(-12 11.6 10.8)"
          fill={`url(#${uid}-rop-face)`}
          stroke="#262626"
          strokeWidth="1"
        />
        {/* Five reel cutouts */}
        <g fill="#5a616b" stroke="#262626" strokeWidth="0.7">
          <circle cx="11.4" cy="6.4" r="1.45" />
          <circle cx="15.8" cy="9.2" r="1.45" />
          <circle cx="14.2" cy="14" r="1.45" />
          <circle cx="8.8" cy="14" r="1.45" />
          <circle cx="7.2" cy="9.2" r="1.45" />
        </g>
        {/* Center spindle */}
        <circle cx="11.6" cy="10.8" r="1.45" fill="#eef2f7" stroke="#262626" strokeWidth="0.85" />
      </>
    ),
  },
  {
    id: 'sop.scatteralign',
    label: 'Scatter and Align',
    family: 'sop',
    description:
      'Sandy desert patch with three green cacti and a small rock standing on red scatter points.',
    types: ['scatteralign'],
    icons: ['sop_scatteralign'],
    refKey: 'SOP_scatteralign',
    render: (uid) => {
      const cactus = (x: number, y: number, s: number) => (
        <g transform={`translate(${x} ${y}) scale(${s})`} fill="#58c848" stroke="#262626" strokeWidth={0.85 / s} strokeLinejoin="round">
          <path d="M-1,-3.6 L-2.6,-3.6 Q-3.6,-3.6 -3.6,-4.6 L-3.6,-6.8 A0.8,0.8 0 0,1 -2,-6.8 L-2,-5.2 L-1,-5.2 Z" />
          <path d="M1,-5.2 L2.6,-5.2 Q3.6,-5.2 3.6,-6.2 L3.6,-8 A0.8,0.8 0 0,0 2,-8 L2,-6.8 L1,-6.8 Z" />
          <path d="M-1.15,0 L-1.15,-8.8 A1.15,1.15 0 0,1 1.15,-8.8 L1.15,0 Z" />
        </g>
      );
      const dot = (x: number, y: number) => <circle cx={x} cy={y} r="1.05" fill="#e03228" stroke="#ffffff" strokeWidth="0.5" />;
      return (
        <>
          <defs>
            <radialGradient id={`${uid}-sa`} cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#ffe47a" />
              <stop offset="100%" stopColor="#e8c48a" />
            </radialGradient>
          </defs>
          <path
            d="M2.4,15 C3.2,12 6.2,11 9.6,11.6 C13,12.2 16.6,10 19.6,10.8 C22,11.4 22.2,15 21.4,17.6 C20.6,20.4 17.4,21.8 13.6,21.4 C9.8,21 6,22.2 3.8,20.2 C2.4,19 2,16.8 2.4,15 Z"
            fill={`url(#${uid}-sa)`}
            stroke="#262626"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path d="M5,17.6 C7,16.8 9,17.4 10.6,16.6 M13.8,18.6 C15.6,17.8 17.4,18.6 19,17.8" fill="none" stroke="#c89a5a" strokeWidth="0.7" strokeLinecap="round" />
          {cactus(6.2, 15.2, 1)}
          {cactus(16.6, 13.6, 1.12)}
          <path d="M9.6,20.4 L10.4,18.6 L12.4,18.2 L13.6,19.6 L13,20.6 Z" fill="#c89a5a" stroke="#262626" strokeWidth="0.75" strokeLinejoin="round" />
          {dot(6.2, 15.2)}
          {dot(16.6, 13.6)}
          {dot(11.6, 20)}
        </>
      );
    },
  },
  {
    id: 'sop.scatterintexturemask',
    label: 'Scatter in Texture Mask',
    family: 'sop',
    description:
      'Perspective black-and-white mask plane (white top-left and bottom-right quadrants) with small red cones, yellow cubes and glossy blue spheres scattered only inside the white areas.',
    types: ['scatterintexturemask'],
    icons: ['sop_scatterintexturemask'],
    refKey: 'SOP_scatterintexturemask',
    render: (uid) => {
      const q: [Pt, Pt, Pt, Pt] = [
        [5.4, 2.4],
        [17.6, 2.4],
        [22, 21.6],
        [2, 21.6],
      ];
      const sub = (u0: number, v0: number): Pt[] => [quadPt(q, u0, v0), quadPt(q, u0 + 0.5, v0), quadPt(q, u0 + 0.5, v0 + 0.5), quadPt(q, u0, v0 + 0.5)];
      const sphere = (x: number, y: number, r: number) => <circle cx={x} cy={y} r={r} fill={`url(#${uid}-sm-ball)`} stroke="#262626" strokeWidth="0.7" />;
      const cone = (x: number, y: number) => (
        <polygon points={`${x - 1.4},${y + 1} ${x},${y - 2} ${x + 1.4},${y + 1}`} fill="#e03228" stroke="#262626" strokeWidth="0.7" strokeLinejoin="round" />
      );
      return (
        <>
          <defs>
            <radialGradient id={`${uid}-sm-ball`} cx="35%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#8fc2ff" />
              <stop offset="100%" stopColor="#2e5a9a" />
            </radialGradient>
          </defs>
          <polygon points={pts(q)} fill="#1a1a1a" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
          <polygon points={pts(sub(0, 0))} fill="#ffffff" />
          <polygon points={pts(sub(0.5, 0.5))} fill="#ffffff" />
          <polygon points={pts(q)} fill="none" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
          {sphere(9.6, 5.6, 1.5)}
          {cone(6.6, 9.4)}
          <IsoCube uid={uid} name="c1" x={14.6} y={13.4} w={1.8} h={1.8} colors={{ top: '#ffe47a', left: '#f2c438', right: '#d49a18' }} strokeWidth={0.6} />
          {sphere(18.4, 14.6, 1.6)}
          {cone(15, 19.6)}
          <IsoCube uid={uid} name="c2" x={19.4} y={17.4} w={1.8} h={1.8} colors={{ top: '#ffe47a', left: '#f2c438', right: '#d49a18' }} strokeWidth={0.6} />
        </>
      );
    },
  },
  {
    id: 'sop.script',
    label: 'Script',
    family: 'sop',
    description:
      'Two overlapping tilted white pages with grey dashed film edges, each showing a small flowchart of green nodes joined by dark links.',
    types: [],
    icons: ['sop_script'],
    refKey: 'SOP_script',
    render: () => {
      const page = (transform: string, flip: boolean) => (
        <g transform={transform} strokeLinejoin="round">
          <rect x="-4.8" y="-6" width="9.6" height="12" rx="0.4" fill="#ffffff" stroke="#262626" strokeWidth="1" />
          <path d="M-3.9,-5.2 V5.2 M3.9,-5.2 V5.2" stroke="#89929e" strokeWidth="0.8" strokeDasharray="0.8 0.8" />
          <path d={flip ? 'M-0.6,-3.2 L-0.6,-0.4 L1.2,1.4 L1.2,3.4' : 'M0.6,-3.2 L0.6,-0.4 L-1.2,1.4 L-1.2,3.4'} fill="none" stroke="#262626" strokeWidth="0.7" />
          <rect x={flip ? -2.2 : -1} y="-4.6" width="3.2" height="1.8" fill="#58c848" stroke="#262626" strokeWidth="0.65" />
          <polygon points={flip ? '-0.6,-1.4 0.6,-0.4 -0.6,0.6 -1.8,-0.4' : '0.6,-1.4 1.8,-0.4 0.6,0.6 -0.6,-0.4'} fill="#ffffff" stroke="#262626" strokeWidth="0.65" />
          <rect x={flip ? -0.4 : -2.8} y="2.4" width="3.2" height="1.8" fill="#58c848" stroke="#262626" strokeWidth="0.65" />
        </g>
      );
      return (
        <>
          {page('translate(8.4 9.4) rotate(-12)', false)}
          {page('translate(15.2 13.6) rotate(14)', true)}
        </>
      );
    },
  },
  {
    id: 'sop.sculpt',
    label: 'Sculpt',
    family: 'sop',
    description:
      'Undulating grey clay sheet with a thin darker front edge, raised softly in the middle, with a cased red sculpt brush ring on the surface and a red cursor stem rising from it.',
    types: ['sculpt'],
    icons: ['sop_sculpt'],
    refKey: 'SOP_sculpt',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-sc`} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        <path
          d="M1.6,15 L1.6,15.8 C2.6,16.6 3.8,17.2 5.2,17.6 C7.6,18.4 9.4,21.2 12.4,20.8 C15,20.4 15.8,18 17.8,16.6 C19.4,15.4 21,14.8 22.4,13.4 L22.4,12.6 C21,14 19.4,14.6 17.8,15.8 C15.8,17.2 15,19.6 12.4,20 C9.4,20.4 7.6,17.6 5.2,16.8 C3.8,16.4 2.6,15.8 1.6,15 Z"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M1.6,15 C3.4,13.4 5.4,13.6 7.4,12.2 C9.4,10.8 10.4,8.6 12.8,8.6 C15.4,8.6 17.4,11.4 19.2,11.4 C20.4,11.4 21.4,11.8 22.4,12.6 C21,14 19.4,14.6 17.8,15.8 C15.8,17.2 15,19.6 12.4,20 C9.4,20.4 7.6,17.6 5.2,16.8 C3.8,16.4 2.6,15.8 1.6,15 Z"
          fill={`url(#${uid}-sc)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path d="M7.4,16.2 C9.6,15.6 11.4,14.4 13.2,13.2" fill="none" stroke="#89929e" strokeWidth="0.75" strokeLinecap="round" />
        <path d="M6,14 C8.4,13.2 10.2,11.4 12.6,10.4" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.85" strokeLinecap="round" />
        <g fill="none" strokeLinecap="round">
          <path d="M15.6,14 L15,3" stroke="#262626" strokeWidth="2.4" />
          <ellipse cx="15.6" cy="14" rx="2.5" ry="1.4" stroke="#262626" strokeWidth="2.4" />
          <path d="M15.6,14 L15,3" stroke="#e03228" strokeWidth="1.3" />
          <ellipse cx="15.6" cy="14" rx="2.5" ry="1.4" stroke="#e03228" strokeWidth="1.3" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.separatepieces',
    label: 'Separate Pieces',
    family: 'sop',
    description:
      'Two ragged white and grey shell pieces pulled apart to the left and right, with cased blue concentric separation arcs between them.',
    types: ['separatepieces'],
    icons: ['sop_separatepieces'],
    refKey: 'SOP_separatepieces',
    render: (uid) => {
      const arcs =
        'M10.4,9 Q9.2,12 10.4,15 M11.4,10.4 Q10.8,12 11.4,13.6 M13.6,9 Q14.8,12 13.6,15 M12.6,10.4 Q13.2,12 12.6,13.6';
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-sp`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#c0c7d1" />
              <stop offset="100%" stopColor="#89929e" />
            </linearGradient>
          </defs>
          <g fill={`url(#${uid}-sp)`} stroke="#262626" strokeWidth="1" strokeLinejoin="round">
            <polygon points="2,11.6 3.4,8.6 6.2,7.6 7.4,9 9,8.4 8.2,11.2 9.4,13.2 7.6,14.6 8,16.4 5,16 3,15.4 2.6,13.6" />
            <polygon points="22,11 20.6,8 17.8,7.4 16.4,9 15,8.8 15.8,11.6 14.6,13.4 16.4,14.6 15.8,16.6 19.2,16.2 21,15.2 21.4,13.2" />
          </g>
          <g fill="#89929e" stroke="#262626" strokeWidth="0.6" strokeLinejoin="round">
            <polygon points="2.6,13.6 3,15.4 5,16 8,16.4 7.6,14.6 5.4,14.4 3.6,13" />
            <polygon points="21.4,13.2 21,15.2 19.2,16.2 15.8,16.6 16.4,14.6 18.6,14.2 20.4,12.8" />
          </g>
          <path d={arcs} fill="none" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
          <path d={arcs} fill="none" stroke="#5aa2f2" strokeWidth="1.1" strokeLinecap="round" />
        </>
      );
    },
  },
  {
    id: 'sop.sblend',
    label: 'Sequence Blend',
    family: 'sop',
    description:
      'Three grey 3D forms morphing diagonally from a faceted cube into a smooth sphere alongside a bold red diagonal arrow.',
    types: ['sblend'],
    icons: ['sop_sblend', 'sop_sblend-2.0'],
    refKey: 'SOP_sblend',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-sb-sph`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        {/* Top-left isometric crisp white cube */}
        <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <polygon points="8.4,2.2 12,4.2 8.4,6.2 4.8,4.2" fill="#ffffff" />
          <polygon points="4.8,4.2 8.4,6.2 8.4,10.2 4.8,8.2" fill="#eef2f7" />
          <polygon points="8.4,6.2 12,4.2 12,8.2 8.4,10.2" fill="#c0c7d1" />
        </g>
        {/* Middle beveled morph form */}
        <polygon
          points="10.2,6.8 14.6,6.8 16.2,9.8 14.6,12.8 10.2,12.8 8.6,9.8"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon points="10.4,7.8 14.2,8 14.6,11.6 10.4,11.6" fill="#eef2f7" fillOpacity="0.7" />
        {/* Bottom-right smooth shaded sphere */}
        <circle cx="16.8" cy="14.4" r="4" fill={`url(#${uid}-sb-sph)`} stroke="#262626" strokeWidth="0.95" />
        {/* Sleek bold crimson diagonal arrow bottom-left */}
        <polygon
          points="3.6,10.4 7.6,15.4 9,14.2 9.6,20.4 3.6,18.8 5,17.6 1.6,12.4"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.shallowwatersolver',
    label: 'Shallow Water Solver',
    family: 'sop',
    description:
      'Flat glossy sky-blue shallow water splash puddle with specular wave highlights and small detached droplets.',
    types: ['shallowwatersolver'],
    icons: ['sop_shallowwatersolver'],
    refKey: 'SOP_shallowwatersolver',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-sw-pool`} cx="45%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#c4e3ff" />
            <stop offset="55%" stopColor="#5aa2f2" />
            <stop offset="100%" stopColor="#2e74c4" />
          </radialGradient>
        </defs>
        {/* Flat perspective splash puddle */}
        <path
          d="M4.8,11.2 C7.8,9.2 13.8,9.4 16.6,11.4 C18.8,13 21.8,12.2 21.6,15.2 C21.4,17.6 17.2,18.6 14.2,17.8 C11.4,17.2 9.4,19.4 6.2,18.4 C2.8,17.4 1.8,13.2 4.8,11.2 Z"
          fill={`url(#${uid}-sw-pool)`}
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <ellipse cx="12.2" cy="14.2" rx="4.8" ry="1.8" fill="none" stroke="#eef2f7" strokeWidth="0.7" strokeOpacity="0.7" />
        <ellipse cx="10" cy="13" rx="2" ry="0.7" fill="#ffffff" fillOpacity="0.85" />
        {/* Two small splash droplets */}
        <circle cx="3.8" cy="18.6" r="1.1" fill="#5aa2f2" stroke="#262626" strokeWidth="0.75" />
        <circle cx="19.8" cy="10.4" r="0.95" fill="#8fc2ff" stroke="#262626" strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.shapediff',
    label: 'Shape Difference',
    family: 'sop',
    description:
      'Dark rounded-square tile with a white three-axis gizmo (up, right and down-left arrows from one origin) and a bold golden-yellow difference arrow pointing to the upper right.',
    types: ['shapediff'],
    icons: ['sop_shapediff'],
    refKey: 'SOP_shapediff',
    render: () => (
      <>
        <rect x="1.8" y="1.8" width="20.4" height="20.4" rx="4.2" fill="#2e3338" stroke="#262626" strokeWidth="1" />
        <rect x="2.7" y="2.7" width="18.6" height="18.6" rx="3.4" fill="none" stroke="#5a616b" strokeWidth="0.6" />
        <g stroke="#f2f4f7" strokeWidth="1.5" strokeLinecap="round">
          <path d="M10,14 L10,5.8 M10,14 L18,14 M10,14 L5.4,18.6" />
        </g>
        <g fill="#f2f4f7" strokeLinejoin="round">
          <polygon points="10,3.2 12.2,6.4 7.8,6.4" />
          <polygon points="20.8,14 17.6,16.2 17.6,11.8" />
          <polygon points="3.6,20.4 4.2,16.6 7.4,19.8" />
        </g>
        <path d="M10,14 L17.4,6.3" stroke="#f2c438" strokeWidth="2.6" strokeLinecap="round" />
        <polygon points="20.2,3.4 19.6,8.4 15.2,4" fill="#f2c438" stroke="#262626" strokeWidth="0.6" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.shopnet',
    label: 'SHOP Network',
    family: 'sop',
    description:
      'Glossy shader globe in a grey bezel ring: red upper half, a white diagonal swirl band and a blue lower half, with a soft highlight at the upper left.',
    types: ['shopnet'],
    icons: ['networks_shop'],
    refKey: 'NETWORKS_shop',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-sh-red`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ff7066" />
            <stop offset="55%" stopColor="#e03228" />
            <stop offset="100%" stopColor="#a81f18" />
          </radialGradient>
          <linearGradient id={`${uid}-sh-blue`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8fc2ff" />
            <stop offset="100%" stopColor="#3672c4" />
          </linearGradient>
          <clipPath id={`${uid}-sh-clip`}>
            <circle cx="12" cy="12" r="8.6" />
          </clipPath>
        </defs>
        <circle cx="12" cy="12" r="9.9" fill="#c0c7d1" stroke="#262626" strokeWidth="1" />
        <g clipPath={`url(#${uid}-sh-clip)`}>
          <rect x="2" y="2" width="20" height="20" fill={`url(#${uid}-sh-blue)`} />
          <path d="M2,16.4 C8,18.4 14.4,11.6 22,12.6 L22,2 L2,2 Z" fill="#f2f4f7" />
          <path d="M2,13.6 C8,14.6 14,7.4 22,9.4 L22,2 L2,2 Z" fill={`url(#${uid}-sh-red)`} />
          <ellipse cx="8.6" cy="7.2" rx="3.2" ry="1.9" transform="rotate(-30 8.6 7.2)" fill="#ffffff" fillOpacity="0.45" />
        </g>
        <circle cx="12" cy="12" r="8.6" fill="none" stroke="#262626" strokeWidth="0.9" />
      </>
    ),
  },
];
