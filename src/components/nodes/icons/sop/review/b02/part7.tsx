import type { ReactNode } from 'react';
import type { OperatorIconDef } from '../../../iconTypes';
import { gearPath, lerpPt, pts, type Pt } from '../../../geoHelpers';
import { PoseSpaceArmBase, PoseSpaceBadgeFrame } from './sharedElements';

export const BATCH_02_PART_7: OperatorIconDef[] = [
  {
    id: 'sop.posespaceeditconfigure',
    label: 'Pose-Space Edit Configure',
    family: 'sop',
    description:
      'Golden-tan flexed muscular arm with a black-and-white configure gear badge on the lower right.',
    refKey: 'SOP_posespaceeditconfigure',
    types: ['posespaceeditconfigure'],
    icons: ['sop_posespaceeditconfigure'],
    render: (uid) => (
      <>
        <PoseSpaceArmBase uid={uid} />
        <PoseSpaceBadgeFrame>
          <path d={gearPath(16.5, 14.8, 8, 3.4, 2.5, 0.42, 0.62)} fill="#ffffff" strokeLinejoin="round" />
          <circle cx="16.5" cy="14.8" r="1.1" fill="#1a1a1a" />
        </PoseSpaceBadgeFrame>
      </>
    ),
  },
  {
    id: 'sop.pca',
    label: 'Principal Component Analysis',
    family: 'sop',
    description:
      'White blue-ringed data points scattered along a diagonal band, crossed by a long green principal axis and a short perpendicular green axis.',
    refKey: 'SOP_pca',
    types: ['pca'],
    icons: ['sop_pca'],
    render: () => {
      // (s, p): position along the principal axis and perpendicular offset
      const sp: [number, number][] = [
        [-8.4, 1.4], [-6.8, -2], [-5.2, 2.6], [-3.6, -1.2], [-2.2, 3.4], [-1, -3.2],
        [1.8, -2.6], [3, 2.4], [4.6, -0.6], [6, 2.2], [7.4, -2.2], [8.6, 0.6],
      ];
      const dots: Pt[] = sp.map(([s, p]) => [12 + (s + p) * 0.7071, 12 + (p - s) * 0.7071]);
      return (
        <>
          <g fill="none" strokeLinecap="round">
            <path d="M3,21 L21,3 M8.8,8.8 L15.2,15.2" stroke="#262626" strokeWidth="2.6" />
            <path d="M3,21 L21,3 M8.8,8.8 L15.2,15.2" stroke="#58c848" strokeWidth="1.4" />
          </g>
          <g fill="#ffffff" stroke="#3672c4" strokeWidth="0.8">
            {dots.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" />
            ))}
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.quadremesh',
    label: 'Quad Remesh',
    family: 'sop',
    description:
      'Upright 3D tire torus seen at three quarters: the upper half covered in a blue quad grid with white edges, the lower half smooth dark grey, with a dark center hole.',
    refKey: 'SOP_quadremesh',
    types: ['quadremesh'],
    icons: ['sop_quadremesh'],
    render: (uid) => {
      const rx = 6.4;
      const ry = 8.4;
      const cb: Pt = [9.4, 11.2];
      const cf: Pt = [13.8, 13.4];
      const quad = '11.68,3.35 16.08,5.55 11.52,21.25 7.12,19.05';
      const e = (c: Pt, deg: number, k = 1): Pt => {
        const a = (deg * Math.PI) / 180;
        return [c[0] + Math.cos(a) * rx * k, c[1] + Math.sin(a) * ry * k];
      };
      const treadLines = [-170, -140, -112, -90, -70]
        .map((deg) => `M${pts([e(cb, deg)])} L${pts([e(cf, deg)])}`)
        .join(' ');
      const hub: Pt = [14.6, 13.8];
      const sideLines = [-150, -120, -90, -60, -30, 0, 180]
        .map((deg) => `M${pts([e(hub, deg, 0.45)])} L${pts([e(cf, deg)])}`)
        .join(' ');
      const blue = (clip: string, lines: ReactNode) => (
        <g clipPath={`url(#${uid}-qr-top)`}>
          <g clipPath={`url(#${uid}-qr-${clip})`}>
            <rect x="0" y="0" width="24" height="24" fill="#5aa2f2" />
            {lines}
          </g>
        </g>
      );
      const grid = { fill: 'none', stroke: '#eef2f7', strokeWidth: 0.5 };
      return (
        <>
          <defs>
            <clipPath id={`${uid}-qr-top`}>
              <polygon points="0,0 24,0 24,11.4 0,12.6" />
            </clipPath>
            <clipPath id={`${uid}-qr-back`}>
              <ellipse cx={cb[0]} cy={cb[1]} rx={rx} ry={ry} />
            </clipPath>
            <clipPath id={`${uid}-qr-quad`}>
              <polygon points={quad} />
            </clipPath>
            <clipPath id={`${uid}-qr-front`}>
              <ellipse cx={cf[0]} cy={cf[1]} rx={rx} ry={ry} />
            </clipPath>
            <linearGradient id={`${uid}-qr-side`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#89929e" />
              <stop offset="100%" stopColor="#3a3f47" />
            </linearGradient>
          </defs>
          {/* Tread (back rim and connecting band) */}
          <ellipse cx={cb[0]} cy={cb[1]} rx={rx} ry={ry} fill="#3a3f47" stroke="#262626" strokeWidth="1.1" />
          {blue(
            'back',
            <>
              <path d={treadLines} {...grid} />
              <ellipse cx={cb[0] + 1.47} cy={cb[1] + 0.73} rx={rx} ry={ry} {...grid} />
              <ellipse cx={cb[0] + 2.93} cy={cb[1] + 1.47} rx={rx} ry={ry} {...grid} />
            </>,
          )}
          <polygon points={quad} fill="#3a3f47" />
          {blue(
            'quad',
            <>
              <path d={treadLines} {...grid} />
              <ellipse cx={cb[0] + 1.47} cy={cb[1] + 0.73} rx={rx} ry={ry} {...grid} />
              <ellipse cx={cb[0] + 2.93} cy={cb[1] + 1.47} rx={rx} ry={ry} {...grid} />
            </>,
          )}
          <path d="M11.68,3.35 L16.08,5.55 M7.12,19.05 L11.52,21.25" stroke="#262626" strokeWidth="1.1" />
          {/* Sidewall */}
          <ellipse cx={cf[0]} cy={cf[1]} rx={rx} ry={ry} fill={`url(#${uid}-qr-side)`} />
          {blue(
            'front',
            <>
              <path d={sideLines} {...grid} />
              <ellipse cx={hub[0]} cy={hub[1]} rx={rx * 0.74} ry={ry * 0.78} {...grid} />
            </>,
          )}
          <ellipse cx={cf[0]} cy={cf[1]} rx={rx} ry={ry} fill="none" stroke="#262626" strokeWidth="1.1" />
          <ellipse cx={hub[0]} cy={hub[1]} rx="3.4" ry="5.4" fill="#89929e" stroke="#262626" strokeWidth="0.8" />
          <ellipse cx={hub[0] + 0.2} cy={hub[1]} rx="2.1" ry="3.7" fill="#262626" />
        </>
      );
    },
  },
  {
    id: 'sop.rails',
    label: 'Rails',
    family: 'sop',
    description:
      'Curved silver swept surface with a dark profile edge on top, spanned between two cased red rail curves on its left and right sides.',
    refKey: 'SOP_rails',
    types: ['rails'],
    icons: ['sop_rails'],
    render: (uid) => {
      const left = 'M2.4,11 C2.2,15.6 5,19.8 9.6,21.4';
      const right = 'M15.6,2.4 C22.4,4.2 16.4,13.6 21.6,19.6';
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-rl`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#eef2f7" />
              <stop offset="55%" stopColor="#c0c7d1" />
              <stop offset="100%" stopColor="#89929e" />
            </linearGradient>
          </defs>
          <path
            d="M2.4,11 C4,5 9.6,2 15.6,2.4 C22.4,4.2 16.4,13.6 21.6,19.6 C17.2,17.4 13,18.8 9.6,21.4 C5,19.8 2.2,15.6 2.4,11 Z"
            fill={`url(#${uid}-rl)`}
            stroke="#262626"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path d="M5.4,15.4 C7.6,10.4 11.4,7.4 17.4,6.6" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.7" strokeLinecap="round" />
          <path d="M2.4,11 C4,5 9.6,2 15.6,2.4" fill="none" stroke="#262626" strokeWidth="1.4" strokeLinecap="round" />
          <g fill="none" strokeLinecap="round">
            <path d={`${left} ${right}`} stroke="#262626" strokeWidth="2.6" />
            <path d={`${left} ${right}`} stroke="#e03228" strokeWidth="1.4" />
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.ray',
    label: 'Ray',
    family: 'sop',
    description:
      'Two plain white generic human silhouettes in front of a metallic grey cylinder, with a cased red ray line projecting from the lower right onto the cylinder.',
    refKey: 'SOP_ray',
    types: ['ray'],
    icons: ['sop_ray'],
    render: (uid) => {
      const figure = (x: number, y: number, s: number) => (
        <g transform={`translate(${x} ${y}) scale(${s})`} fill="#f2f4f7" stroke="#262626" strokeWidth={0.95 / s} strokeLinejoin="round">
          <path d="M-1.1,-6.6 L1.1,-6.6 C2.8,-6.6 3.6,-5.8 3.8,-4.4 L4.4,0.2 L2.9,0.4 L2.3,-3 L2.3,4.6 L0.9,4.6 L0.4,0.8 L-0.4,0.8 L-0.9,4.6 L-2.3,4.6 L-2.3,-3 L-2.9,0.4 L-4.4,0.2 L-3.8,-4.4 C-3.6,-5.8 -2.8,-6.6 -1.1,-6.6 Z" />
          <circle cx="0" cy="-8.7" r="1.9" />
        </g>
      );
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-ray-cyl`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#89929e" />
              <stop offset="40%" stopColor="#eef2f7" />
              <stop offset="100%" stopColor="#5a616b" />
            </linearGradient>
          </defs>
          <path d="M2.4,4 L2.4,16.6 A3.6,1.4 0 0,0 9.6,16.6 L9.6,4" fill={`url(#${uid}-ray-cyl)`} stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
          <ellipse cx="6" cy="4" rx="3.6" ry="1.4" fill="#c0c7d1" stroke="#262626" strokeWidth="1" />
          {figure(11.6, 12.6, 0.74)}
          {figure(17.4, 16.6, 0.92)}
          <path d="M21.4,19.4 L7.4,10.6" stroke="#262626" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M21.4,19.4 L7.4,10.6" stroke="#e03228" strokeWidth="1.4" strokeLinecap="round" />
        </>
      );
    },
  },
  {
    id: 'sop.refine',
    label: 'Refine',
    family: 'sop',
    description:
      'Grey control hull and a smooth black S-curve with black CV squares at the hull corners and red refined vertices along the hull edges (white rims).',
    refKey: 'SOP_refine',
    types: ['refine'],
    icons: ['sop_refine'],
    render: () => {
      const hull: Pt[] = [
        [2.4, 10.6],
        [9.4, 3],
        [16.4, 19.2],
        [21.6, 13.2],
      ];
      const refined: Pt[] = [];
      for (let i = 0; i < 3; i += 1) {
        refined.push(lerpPt(hull[i], hull[i + 1], 0.25), lerpPt(hull[i], hull[i + 1], 0.75));
      }
      const sq = (p: Pt, s: number, fill: string, stroke: string) => (
        <rect key={`${p[0]}-${p[1]}`} x={p[0] - s / 2} y={p[1] - s / 2} width={s} height={s} fill={fill} stroke={stroke} strokeWidth="0.6" />
      );
      const curve = 'M2.4,10.6 L5.9,6.8 Q9.4,3 12.9,11.1 Q16.4,19.2 19,16.2 L21.6,13.2';
      return (
        <>
          <polyline points={pts(hull)} fill="none" stroke="#262626" strokeWidth="2.4" strokeLinejoin="round" />
          <polyline points={pts(hull)} fill="none" stroke="#89929e" strokeWidth="1.3" strokeLinejoin="round" />
          <path d={curve} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
          <path d={curve} fill="none" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
          {refined.map((p) => sq(p, 1.8, '#e03228', '#262626'))}
          {hull.map((p) => sq(p, 2, '#262626', '#ffffff'))}
        </>
      );
    },
  },
  {
    id: 'sop.reguide',
    label: 'Reguide',
    family: 'sop',
    description:
      'Curved pale grey surface patch with red and yellow guide rods standing upright at slight angles.',
    refKey: 'SOP_reguide',
    types: ['reguide'],
    icons: ['sop_reguide'],
    render: (uid) => {
      const rods: { d: string; c: string }[] = [
        { d: 'M4.4,17.4 L3.2,10.2', c: '#e03228' },
        { d: 'M7.2,16.2 L6.2,7.6', c: '#f2c438' },
        { d: 'M9.8,18.2 L10.2,11', c: '#f2c438' },
        { d: 'M11.8,15.6 L12.4,3', c: '#e03228' },
        { d: 'M14.8,18 L15.6,9.2', c: '#f2c438' },
        { d: 'M18,16.6 L19.8,5.6', c: '#e03228' },
        { d: 'M20.4,15.6 L21.2,11.6', c: '#f2c438' },
      ];
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-rg`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eef2f7" />
              <stop offset="100%" stopColor="#c0c7d1" />
            </linearGradient>
          </defs>
          <path d="M1.6,14.4 C7,12.4 17,12.4 22.4,14.4 L21.4,20.6 C16,19 8,19 2.6,20.6 Z" fill={`url(#${uid}-rg)`} stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
          <path d="M2.6,20.6 C8,19 16,19 21.4,20.6 L21.3,21.8 C16,20.2 8,20.2 2.7,21.8 Z" fill="#89929e" stroke="#262626" strokeWidth="0.8" strokeLinejoin="round" />
          <g fill="none" strokeLinecap="round">
            {rods.map((r) => (
              <path key={`o${r.d}`} d={r.d} stroke="#262626" strokeWidth="2" />
            ))}
            {rods.map((r) => (
              <path key={`c${r.d}`} d={r.d} stroke={r.c} strokeWidth="0.95" />
            ))}
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.remesh',
    label: 'Remesh',
    family: 'sop',
    description:
      'Three-quarter tilted glossy amber torus: a few coarse polygon edges on the left half and a denser triangle remesh on the right half.',
    refKey: 'SOP_remesh',
    types: ['remesh'],
    icons: ['sop_remesh', 'sop_remesh-2.0'],
    render: (uid) => {
      const ring = (s: number, deg: number): Pt => {
        const a = (deg * Math.PI) / 180;
        const cy = 10.6 + (12.4 - 10.6) * s;
        const rx = 3.8 + (10 - 3.8) * s;
        const ry = 1.9 + (7.6 - 1.9) * s;
        return [12 + Math.cos(a) * rx, cy + Math.sin(a) * ry];
      };
      const right = [-100, -60, -25, 10, 45, 80, 115];
      const lines: string[] = [];
      right.forEach((d, i) => {
        lines.push(`M${pts([ring(0, d)])} L${pts([ring(1, d)])}`);
        if (i < right.length - 1) {
          lines.push(`M${pts([ring(0, d)])} L${pts([ring(0.5, right[i + 1])])}`);
          lines.push(`M${pts([ring(0.5, d)])} L${pts([ring(1, right[i + 1])])}`);
        }
      });
      const rightRing = right.map((d) => ring(0.5, d));
      lines.push(`M${pts(rightRing).replace(/ /g, ' L')}`);
      [150, 215].forEach((d) => lines.push(`M${pts([ring(0, d)])} L${pts([ring(1, d)])}`));
      const body = 'M2,12.4 A10,7.6 0 1,0 22,12.4 A10,7.6 0 1,0 2,12.4 Z M8.2,10.6 A3.8,1.9 0 1,0 15.8,10.6 A3.8,1.9 0 1,0 8.2,10.6 Z';
      return (
        <>
          <defs>
            <radialGradient id={`${uid}-rm`} cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffe0b8" />
              <stop offset="45%" stopColor="#ffb066" />
              <stop offset="80%" stopColor="#ee8624" />
              <stop offset="100%" stopColor="#c25e12" />
            </radialGradient>
            <clipPath id={`${uid}-rm-clip`}>
              <path d={body} clipRule="evenodd" />
            </clipPath>
          </defs>
          <path d={body} fill={`url(#${uid}-rm)`} fillRule="evenodd" />
          <path d={lines.join(' ')} clipPath={`url(#${uid}-rm-clip)`} fill="none" stroke="#3a1c06" strokeWidth="0.5" strokeLinejoin="round" />
          {/* Inner far wall seen through the hole */}
          <path d="M8.2,10.6 A3.8,1.9 0 0,1 15.8,10.6 C14.4,11.5 9.6,11.5 8.2,10.6 Z" fill="#c25e12" stroke="#262626" strokeWidth="0.6" />
          <path d={body} fill="none" fillRule="evenodd" stroke="#262626" strokeWidth="1.1" />
        </>
      );
    },
  },
  {
    id: 'sop.remeshbubbles',

    label: 'Remesh Bubbles',

    family: 'sop',

    description: 'Packed cluster of glossy soap bubbles.',
    refKey: 'SOP_remeshbubbles',
    types: ['remeshbubbles'],
    icons: ['sop_remeshbubbles'],
    render: (uid) => (
      <g>
        <defs>
          <radialGradient id={`${uid}-bub`} cx="35%" cy="32%" r="68%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#b5d7f7" />
            <stop offset="1" stopColor="#4f84c4" />
          </radialGradient>
        </defs>
        {/* Packed cluster of glossy soap bubbles */}
        {[
          [6.2, 7.2, 3.2],
          [13.2, 6.2, 3.6],
          [18.5, 9.2, 2.6],
          [8.8, 12.6, 4.2],
          [15.8, 14.2, 3.5],
          [4.8, 14.8, 2.4],
          [11.2, 18.5, 2.5],
          [18.8, 17.8, 1.8],
          [6.5, 18.6, 1.6],
        ].map(([cx, cy, r], i) => (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={`url(#${uid}-bub)`}
              stroke="#204a87"
              strokeWidth="0.65"
            />
            <circle cx={cx - r * 0.32} cy={cy - r * 0.32} r={r * 0.22} fill="#ffffff" opacity="0.85" />
          </g>
        ))}
      </g>
    ),
  },
  {
    id: 'sop.remeshtocamera',
    label: 'Remesh to Camera',
    family: 'sop',
    description:
      'Dark grey movie camera with two film reels on a small tripod, aimed at an orange sphere whose grid lines grow denser on the side facing the camera.',
    refKey: 'SOP_remeshtocamera',
    types: ['remeshtocamera'],
    icons: ['sop_remeshtocamera'],
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-rtc`} cx="35%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#ffd0a0" />
            <stop offset="45%" stopColor="#ffb066" />
            <stop offset="100%" stopColor="#c25e12" />
          </radialGradient>
          <clipPath id={`${uid}-rtc-clip`}>
            <circle cx="16.8" cy="12" r="5.6" />
          </clipPath>
        </defs>
        {/* Tripod legs */}
        <g fill="none" strokeLinecap="round">
          <path d="M6,14.4 L3.4,20.6 M6,14.4 L6,21 M6,14.4 L8.6,20.6" stroke="#262626" strokeWidth="1.9" />
          <path d="M6,14.4 L3.4,20.6 M6,14.4 L6,21 M6,14.4 L8.6,20.6" stroke="#89929e" strokeWidth="0.8" />
        </g>
        {/* Reels, body and lens */}
        <circle cx="4.4" cy="6.6" r="2.3" fill="#5a616b" stroke="#262626" strokeWidth="0.9" />
        <circle cx="4.4" cy="6.6" r="0.8" fill="#c0c7d1" />
        <circle cx="8.4" cy="5.8" r="2.1" fill="#5a616b" stroke="#262626" strokeWidth="0.9" />
        <circle cx="8.4" cy="5.8" r="0.75" fill="#c0c7d1" />
        <rect x="2.2" y="9" width="7.4" height="5.4" rx="0.7" fill="#5a616b" stroke="#262626" strokeWidth="1" />
        <rect x="3" y="9.8" width="2.6" height="1.6" rx="0.3" fill="#89929e" />
        <polygon points="9.6,10.4 11.6,9.4 11.6,14 9.6,13" fill="#89929e" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        {/* Sphere with denser grid toward the camera */}
        <circle cx="16.8" cy="12" r="5.6" fill={`url(#${uid}-rtc)`} />
        <g clipPath={`url(#${uid}-rtc-clip)`} fill="none" stroke="#a84408" strokeWidth="0.55">
          <path d="M16.8,6.4 A4.6,5.6 0 0,0 16.8,17.6 M16.8,6.4 A3.3,5.6 0 0,0 16.8,17.6 M16.8,6.4 A2,5.6 0 0,0 16.8,17.6 M16.8,6.4 A0.8,5.6 0 0,0 16.8,17.6 M16.8,6.4 A2.8,5.6 0 0,1 16.8,17.6" />
          <path d="M10,9.4 H24 M10,12 H24 M10,14.6 H24 M10,7.6 H24 M10,16.4 H24" />
        </g>
        <circle cx="16.8" cy="12" r="5.6" fill="none" stroke="#262626" strokeWidth="1.05" />
      </>
    ),
  },
];
