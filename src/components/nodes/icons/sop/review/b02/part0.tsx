import type { OperatorIconDef } from '../../../iconTypes';
import { ImplicitCoreDefs, ImplicitCutawaySphere } from './sharedElements';

/**
 * Batch 2, Part 0 (icons 0 to 9): built-in Houdini SOP icons under review.
 */
export const BATCH_02_PART_0: OperatorIconDef[] = [
  {
    id: 'sop.implicitsurface_eval',
    label: 'Implicit Surface Evaluate',
    family: 'sop',
    description:
      'Implicit Surface cutaway sphere (blue-grey shell, dark violet core) at the upper right behind a tilted orange 3D calculator with plus, minus, times and equals keys.',
    types: ['implicitsurface_eval'],
    icons: ['sop_implicitsurface_eval'],
    refKey: 'SOP_implicitsurface_eval',
    render: (uid) => (
      <>
        <ImplicitCutawaySphere uid={uid} cx={15} cy={8.8} r={7.2} />
        {/* Tilted calculator: top and side thickness, then the skewed front face with four keys */}
        <g strokeLinejoin="round">
          <polygon points="1.8,7.6 3.2,6.9 11.6,9.4 10.2,10.1" fill="#ffb066" stroke="#262626" strokeWidth="0.9" />
          <polygon points="10.2,10.1 11.6,9.4 11.6,21.6 10.2,22.3" fill="#c25e12" stroke="#262626" strokeWidth="0.9" />
          <g transform="matrix(1 0.3 0 1 1.8 7.6)">
            <rect x="0" y="0" width="8.4" height="12.2" fill="#c25e12" stroke="#262626" strokeWidth="1" />
            <g fill="#ee8624" stroke="#ffb066" strokeWidth="0.5">
              <rect x="0.7" y="0.7" width="3.3" height="5.1" rx="0.5" />
              <rect x="4.4" y="0.7" width="3.3" height="5.1" rx="0.5" />
              <rect x="0.7" y="6.4" width="3.3" height="5.1" rx="0.5" />
              <rect x="4.4" y="6.4" width="3.3" height="5.1" rx="0.5" />
            </g>
            <g stroke="#ffffff" strokeWidth="1.15" strokeLinecap="round" fill="none">
              <path d="M1.4,3.25 H3.3 M2.35,2.3 V4.2" />
              <path d="M5.1,3.25 H7" />
              <path d="M1.6,8.1 L3.1,9.8 M3.1,8.1 L1.6,9.8" />
              <path d="M5.1,8.4 H7 M5.1,9.6 H7" />
            </g>
          </g>
        </g>
      </>
    ),
  },
  {
    id: 'sop.implicitsurface_operation',
    label: 'Implicit Surface Operation',
    family: 'sop',
    description:
      'Purple isometric cube with elliptical cutouts on all three visible faces revealing an internal organic implicit surface.',
    types: ['implicitsurface_operation'],
    icons: ['sop_implicitsurface_operation'],
    refKey: 'SOP_implicitsurface_operation',
    render: (uid) => (
      <>
        <ImplicitCoreDefs id={`${uid}-iso-core`} />
        {/* Isometric rounded-tone purple cube */}
        <polygon points="12,2.4 21,7.2 12,12 3,7.2" fill="#c084d8" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        <polygon points="3,7.2 12,12 12,21.6 3,16.8" fill="#8a56c4" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        <polygon points="12,12 21,7.2 21,16.8 12,21.6" fill="#5e2f96" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        {/* Three crisp dark implicit portals with light inner edge */}
        <ellipse cx="12" cy="7.2" rx="4.4" ry="2.2" fill={`url(#${uid}-iso-core)`} stroke="#262626" strokeWidth="0.95" />
        <ellipse cx="7.4" cy="14.4" rx="2.3" ry="4" transform="rotate(-26 7.4 14.4)" fill={`url(#${uid}-iso-core)`} stroke="#262626" strokeWidth="0.95" />
        <ellipse cx="16.6" cy="14.4" rx="2.3" ry="4" transform="rotate(26 16.6 14.4)" fill={`url(#${uid}-iso-core)`} stroke="#262626" strokeWidth="0.95" />
      </>
    ),
  },
  {
    id: 'sop.implicitsurface_slice',
    label: 'Implicit Surface Slice',
    family: 'sop',
    description:
      'Purple hemisphere sliced vertically to expose a grey elliptical cross-section with concentric isoline rings.',
    types: ['implicitsurface_slice'],
    icons: ['sop_implicitsurface_slice'],
    refKey: 'SOP_implicitsurface_slice',
    render: (uid) => (
      <>
        <ImplicitCoreDefs id={`${uid}-iss-sh`} />
        {/* Left purple hemisphere */}
        <path
          d="M12.6,2.8 C7.2,2.8 3.2,7 3.2,12 C3.2,17 7.2,21.2 12.6,21.2 Z"
          fill={`url(#${uid}-iss-sh)`}
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Vertical slice oval face */}
        <ellipse cx="13.2" cy="12" rx="4.8" ry="9.2" fill="#c0c7d1" stroke="#262626" strokeWidth="1.05" />
        <ellipse cx="13.2" cy="12" rx="3.4" ry="6.8" fill="#eef2f7" stroke="#5a616b" strokeWidth="0.8" />
        <ellipse cx="13.2" cy="12" rx="1.8" ry="3.8" fill="#5a616b" stroke="#262626" strokeWidth="0.75" />
      </>
    ),
  },
  {
    id: 'sop.implicitsurface_velocity',
    label: 'Implicit Surface Velocity',
    family: 'sop',
    description:
      'Implicit Surface cutaway sphere (blue-grey shell, dark violet core) at the upper right, streaking out of a wide blue velocity trail that fades toward the lower left.',
    types: ['implicitsurface_velocity'],
    icons: ['sop_implicitsurface_velocity'],
    refKey: 'SOP_implicitsurface_velocity',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-isv-trail`} gradientUnits="userSpaceOnUse" x1="15.2" y1="8.8" x2="4" y2="20">
            <stop offset="0%" stopColor="#3672c4" />
            <stop offset="55%" stopColor="#5aa2f2" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#8fc2ff" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id={`${uid}-isv-edge`} gradientUnits="userSpaceOnUse" x1="15.2" y1="8.8" x2="4" y2="20">
            <stop offset="0%" stopColor="#262626" />
            <stop offset="100%" stopColor="#262626" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M10.5,4.1 L2.4,15.9 Q2.6,20.4 7.9,21.6 L19.9,13.5 Z" fill={`url(#${uid}-isv-trail)`} />
        <path d="M10.5,4.1 L2.4,15.9 M19.9,13.5 L7.9,21.6" fill="none" stroke={`url(#${uid}-isv-edge)`} strokeWidth="1" />
        <g stroke="#eef2f7" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.7">
          <line x1="9.4" y1="9.4" x2="5" y2="14" />
          <line x1="13" y1="13.4" x2="8.2" y2="17.6" />
        </g>
        <ImplicitCutawaySphere uid={uid} cx={15.2} cy={8.8} r={6.6} />
      </>
    ),
  },
  {
    id: 'sop.inflate',
    label: 'Inflate',
    family: 'sop',
    description:
      'Plump red diagonal inflated cushion with white pointed tips between two tan guide curves, with a red arrow pushing down and to the right.',
    types: ['inflate'],
    icons: ['sop_inflate'],
    refKey: 'SOP_inflate',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-inf`} x1="0.2" y1="0.1" x2="0.8" y2="0.9">
            <stop offset="0%" stopColor="#ff7066" />
            <stop offset="50%" stopColor="#e03228" />
            <stop offset="100%" stopColor="#a81f18" />
          </linearGradient>
        </defs>
        {/* Tan guide curves around the cushion (cased) */}
        <g fill="none" strokeLinecap="round">
          <path d="M2.2,12.8 C3.4,8 6.4,4.2 10.8,2 M22,6.6 C21.4,12.4 17.8,15.6 15.2,18 C13.8,19.4 12.8,20.6 12,22.2" stroke="#262626" strokeWidth="2.4" />
          <path d="M2.2,12.8 C3.4,8 6.4,4.2 10.8,2 M22,6.6 C21.4,12.4 17.8,15.6 15.2,18 C13.8,19.4 12.8,20.6 12,22.2" stroke="#c89a5a" strokeWidth="1.2" />
        </g>
        {/* Inflated cushion with white tendon tips */}
        <path
          d="M2.6,20.6 C3.4,13.2 9.4,4.6 20.8,2.6 C19.6,10.6 12.6,18.8 2.6,20.6 Z"
          fill={`url(#${uid}-inf)`}
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path d="M2.6,20.6 C3,18.8 3.6,17.4 4.4,16 L6.6,18.6 C5.4,19.4 4,20 2.6,20.6 Z" fill="#ffffff" stroke="#262626" strokeWidth="0.8" strokeLinejoin="round" />
        <path d="M20.8,2.6 C20.6,4.2 20.2,5.6 19.6,7 L16.6,5 C18,4 19.2,3.2 20.8,2.6 Z" fill="#ffffff" stroke="#262626" strokeWidth="0.8" strokeLinejoin="round" />
        <path d="M6.2,15.4 C8.6,11.2 11.6,8.2 15.6,5.8" fill="none" stroke="#ffb0a8" strokeWidth="0.9" strokeLinecap="round" />
        {/* Expansion arrow */}
        <path d="M12.6,9.6 L16.8,13.8" stroke="#262626" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M12.6,9.6 L16.8,13.8" stroke="#ff7066" strokeWidth="1.7" strokeLinecap="round" />
        <polygon points="20.8,17.8 14.6,16 19,11.6" fill="#ff7066" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.instance',
    label: 'Instance',
    family: 'sop',
    description:
      'Two white spheres overlaid with orange wireframe latitude and longitude grids arranged diagonally.',
    types: ['instance'],
    icons: ['sop_instance'],
    refKey: 'SOP_instance',
    render: () => (
      <>
        {[
          { cx: 8.6, cy: 10.0, r: 5.8 },
          { cx: 16.2, cy: 14.4, r: 4.8 },
        ].map((s, i) => (
          <g key={i} transform={`translate(${s.cx}, ${s.cy})`}>
            <circle cx="0" cy="0" r={s.r} fill="#ffffff" stroke="#262626" strokeWidth="1.05" />
            <g fill="none" stroke="#ee8624" strokeWidth="0.85">
              <ellipse cx="0" cy="0" rx={s.r * 0.48} ry={s.r * 0.94} />
              <ellipse cx="0" cy="0" rx={s.r * 0.94} ry={s.r * 0.42} />
              <line x1="0" y1={-s.r * 0.94} x2="0" y2={s.r * 0.94} />
              <line x1={-s.r * 0.94} y1="0" x2={s.r * 0.94} y2="0" />
            </g>
            <circle cx="0" cy="0" r={s.r} fill="none" stroke="#262626" strokeWidth="1.05" />
            <circle cx="0" cy="0" r="1.0" fill="#262626" />
          </g>
        ))}
      </>
    ),
  },
  {
    id: 'sop.intersectionanalysis',
    label: 'Intersection Analysis',
    family: 'sop',
    description:
      'Green and blue curves crossing each other with a glowing yellow highlight marker at their intersection point.',
    types: ['intersectionanalysis'],
    icons: ['sop_intersectionanalysis'],
    refKey: 'SOP_intersectionanalysis',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ia-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fce94f" stopOpacity="1" />
            <stop offset="55%" stopColor="#fce94f" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#fce94f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="13.5" cy="9.6" r="4.6" fill={`url(#${uid}-ia-glow)`} />
        <path
          d="M3,3.2 C12.2,6.2 17,11.2 21,21"
          fill="none"
          stroke="#262626"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M3,3.2 C12.2,6.2 17,11.2 21,21"
          fill="none"
          stroke="#58c848"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M21.2,8.8 C13.5,7.8 8.6,9.8 3,15.6"
          fill="none"
          stroke="#262626"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M21.2,8.8 C13.5,7.8 8.6,9.8 3,15.6"
          fill="none"
          stroke="#5aa2f2"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="3" cy="3.2" r="1.3" fill="#ddf7c5" stroke="#4e9a06" strokeWidth="0.75" />
        <circle cx="21" cy="21" r="1.3" fill="#ddf7c5" stroke="#4e9a06" strokeWidth="0.75" />
        <circle cx="21.2" cy="8.8" r="1.3" fill="#729fcf" stroke="#204a87" strokeWidth="0.75" />
        <circle cx="3" cy="15.6" r="1.3" fill="#729fcf" stroke="#204a87" strokeWidth="0.75" />
        <circle cx="13.5" cy="9.6" r="1.6" fill="#fce94f" stroke="#c4a000" strokeWidth="0.85" />
      </>
    ),
  },
  {
    id: 'sop.intersectionstitch',
    label: 'Intersection Stitch',
    family: 'sop',
    description:
      'Intersecting yellow and blue triangles joined along a white-and-red dashed stitch seam.',
    types: ['intersectionstitch'],
    icons: ['sop_intersectionstitch'],
    refKey: 'SOP_intersectionstitch',
    render: () => (
      <>
        <polygon
          points="2.2,15 15,8.2 14.8,21.8"
          fill="#fce94f"
          stroke="#c4a000"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2.2,15 7.8,4.8 22,11.8"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2.2,15 15,2.2 15,8.2"
          fill="#fce94f"
          stroke="#c4a000"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <line
          x1="2.2"
          y1="15"
          x2="15"
          y2="8.2"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="2.2"
          y1="15"
          x2="15"
          y2="8.2"
          stroke="#ef2929"
          strokeWidth="1.15"
          strokeDasharray="1.8 1.2"
          strokeLinecap="round"
        />
      </>
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
  {
    id: 'sop.invokegraph',
    label: 'Invoke Compiled Graph',
    family: 'sop',
    description:
      'Glowing blue-violet globe holding a white node graph constellation, resting on a silver saucer pedestal with a rainbow light, and a yellow lightning bolt at the lower right.',
    types: [],
    icons: ['sop_invokegraph'],
    refKey: 'SOP_invokegraph',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ivg-globe`} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#281c3c" />
            <stop offset="55%" stopColor="#2e74c4" />
            <stop offset="85%" stopColor="#7a4ec8" />
            <stop offset="100%" stopColor="#c8a2ff" />
          </radialGradient>
          <linearGradient id={`${uid}-ivg-dish`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
          <linearGradient id={`${uid}-ivg-glow`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e03228" />
            <stop offset="35%" stopColor="#f2c438" />
            <stop offset="65%" stopColor="#58c848" />
            <stop offset="100%" stopColor="#5aa2f2" />
          </linearGradient>
        </defs>
        {/* Saucer pedestal */}
        <ellipse cx="11" cy="18.4" rx="8.4" ry="3.2" fill={`url(#${uid}-ivg-dish)`} stroke="#262626" strokeWidth="1" />
        <ellipse cx="11" cy="17.6" rx="4.6" ry="1.5" fill={`url(#${uid}-ivg-glow)`} stroke="#262626" strokeWidth="0.7" />
        {/* Globe with node graph */}
        <circle cx="11" cy="9.2" r="7.2" fill={`url(#${uid}-ivg-globe)`} stroke="#262626" strokeWidth="1.1" />
        <ellipse cx="11" cy="9.6" rx="5.6" ry="2.4" transform="rotate(-18 11 9.6)" fill="none" stroke="#c8a2ff" strokeWidth="0.6" strokeOpacity="0.8" />
        <g stroke="#ffffff" strokeWidth="0.65" fill="none" strokeLinejoin="round">
          <path d="M7.4,6.6 L11,5 L14.6,7.4 L12.4,10.6 L8.4,11 Z M11,5 L12.4,10.6" />
        </g>
        <g fill="#ffffff">
          <circle cx="7.4" cy="6.6" r="0.9" />
          <circle cx="11" cy="5" r="0.9" />
          <circle cx="14.6" cy="7.4" r="0.9" />
          <circle cx="12.4" cy="10.6" r="0.9" />
          <circle cx="8.4" cy="11" r="0.9" />
        </g>
        {/* Lightning bolt */}
        <polygon
          points="17.6,10.6 22,10.6 19.8,14.4 22.2,14.4 15.8,22.4 17.8,16.8 15.4,16.8"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
