import type { OperatorIconDef } from '../../../iconTypes';
import { cubicAt, cubicCmd, pts, quadPt, spiralPath, type Pt } from '../../../geoHelpers';
import { IsoCube, OpenSuitcase } from './sharedElements';

/**
 * Batch 2, Part 8 (icons 80 to 89): built-in Houdini SOP icons under review.
 */
export const BATCH_02_PART_8: OperatorIconDef[] = [
  {
    id: 'sop.remeshgrid',
    label: 'Remesh to Grid',
    family: 'sop',
    description:
      'Thick white and silver isometric cube frame with a hexagonal opening revealing a dark interior and a small three-tone grey cube inside.',
    types: ['remeshgrid'],
    icons: ['sop_remeshgrid'],
    refKey: 'SOP_remeshgrid',
    render: (uid) => {
      const c: Pt = [12, 11.9];
      const hex: Pt[] = [
        [12, 1.6],
        [21.2, 6.6],
        [21.2, 17.2],
        [12, 22.2],
        [2.8, 17.2],
        [2.8, 6.6],
      ];
      const k = 0.62;
      const inner = hex.map(([x, y]) => [c[0] + (x - c[0]) * k, c[1] + (y - c[1]) * k] as Pt);
      return (
        <g strokeLinejoin="round">
          <polygon points="12,1.6 21.2,6.6 12,11.6 2.8,6.6" fill="#ffffff" stroke="#262626" strokeWidth="1" />
          <polygon points="2.8,6.6 12,11.6 12,22.2 2.8,17.2" fill="#eef2f7" stroke="#262626" strokeWidth="1" />
          <polygon points="12,11.6 21.2,6.6 21.2,17.2 12,22.2" fill="#c0c7d1" stroke="#262626" strokeWidth="1" />
          {/* Opening into the hollow frame */}
          <polygon points={pts(inner)} fill="#5a616b" stroke="#262626" strokeWidth="0.9" />
          <polygon points={pts([inner[3], inner[4], c, inner[2]])} fill="#89929e" />
          <IsoCube uid={uid} name="core" x={12} y={7.8} w={3.6} h={4} colors={{ top: '#eef2f7', left: '#c0c7d1', right: '#89929e' }} strokeWidth={0.8} />
          <polygon points={pts(inner)} fill="none" stroke="#262626" strokeWidth="0.9" />
        </g>
      );
    },
  },
  {
    id: 'sop.repack',
    label: 'Repack',
    family: 'sop',
    description:
      'Open brown and gold suitcase seen from the front (lid leaning back on its hinge, silver handle below the front) with a smaller open suitcase packed inside it.',
    types: ['repack'],
    icons: ['sop_repack'],
    refKey: 'SOP_repack',
    render: (uid) => (
      <OpenSuitcase uid={uid}>
        <OpenSuitcase uid={`${uid}-in`} transform="translate(5.8 3.6) scale(0.5)" lineScale={2} />
      </OpenSuitcase>
    ),
  },
  {
    id: 'sop.resample',
    label: 'Resample',
    family: 'sop',
    description:
      'Two cased red S-curves: the upper one with unevenly clustered black square points, the lower one resampled with evenly spaced black square points (white rims).',
    types: ['resample'],
    icons: ['sop_resample'],
    refKey: 'SOP_resample',
    render: () => {
      const a: Pt[] = [
        [1.8, 8],
        [5.2, 1.8],
        [8.8, 1.6],
        [12, 5.8],
      ];
      const b: Pt[] = [
        [12, 5.8],
        [15.2, 10],
        [19, 10.8],
        [22.2, 5],
      ];
      const shift = (q: Pt[], dy: number) => q.map(([x, y]) => [x, y + dy] as Pt);
      const path = (dy: number) => {
        const p = shift(a, dy);
        const q = shift(b, dy);
        return `M${pts([p[0]])} ${cubicCmd(p[1], p[2], p[3])} ${cubicCmd(q[1], q[2], q[3])}`;
      };
      const on = (dy: number, seg: Pt[], t: number) => {
        const s = shift(seg, dy);
        return cubicAt(s[0], s[1], s[2], s[3], t);
      };
      const upper = [on(0, a, 0), on(0, a, 0.32), on(0, a, 0.44), on(0, a, 0.94), on(0, b, 0.55), on(0, b, 0.68), on(0, b, 1)];
      const lower = [0, 1 / 3, 2 / 3, 1].map((t) => on(10.6, a, t)).concat([1 / 3, 2 / 3, 1].map((t) => on(10.6, b, t)));
      const square = (p: Pt) => (
        <rect key={`${p[0]}-${p[1]}`} x={p[0] - 1} y={p[1] - 1} width="2" height="2" fill="#262626" stroke="#ffffff" strokeWidth="0.6" />
      );
      return (
        <>
          <g fill="none" strokeLinecap="round">
            <path d={`${path(0)} ${path(10.6)}`} stroke="#262626" strokeWidth="2.4" />
            <path d={`${path(0)} ${path(10.6)}`} stroke="#e03228" strokeWidth="1.3" />
          </g>
          {upper.map(square)}
          {lower.map(square)}
        </>
      );
    },
  },
  {
    id: 'sop.rest',
    label: 'Rest Position',
    family: 'sop',
    description:
      'Black-and-white diagonally striped shaded sphere inside the cased green front edges of a wireframe bounding cube.',
    types: ['rest'],
    icons: ['sop_rest'],
    refKey: 'SOP_rest',
    render: (uid) => {
      const front = 'M12,1.6 L21.4,6.2 L21.4,17.8 L12,22.4 L2.6,17.8 L2.6,6.2 Z M12,10.8 L2.6,6.2 M12,10.8 L21.4,6.2 M12,10.8 L12,22.4';
      const stripes = [-6.4, -3, 0.4, 3.8, 7.2]
        .map((o) => `M2,${16 + o} Q12,${9.4 + o} 22,${6.6 + o}`)
        .join(' ');
      return (
        <>
          <defs>
            <clipPath id={`${uid}-rest-ball`}>
              <circle cx="12" cy="12.4" r="6.6" />
            </clipPath>
            <radialGradient id={`${uid}-rest-shade`} cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="55%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12.4" r="6.6" fill="#f2f4f7" />
          <path d={stripes} clipPath={`url(#${uid}-rest-ball)`} fill="none" stroke="#262626" strokeWidth="1.8" />
          <circle cx="12" cy="12.4" r="6.6" fill={`url(#${uid}-rest-shade)`} stroke="#262626" strokeWidth="1" />
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={front} stroke="#262626" strokeWidth="1.8" />
            <path d={front} stroke="#58c848" strokeWidth="0.9" />
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.retime',
    label: 'Retime',
    family: 'sop',
    description: 'Golden-yellow stopwatch clock face with tick marks, a top plunger button and a retime hand.',
    types: ['retime'],
    icons: ['sop_retime'],
    refKey: 'SOP_retime',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-rt-clk`} cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#ffd519" />
            <stop offset="100%" stopColor="#c4a000" />
          </radialGradient>
        </defs>
        {/* Top stopwatch plunger and loop */}
        <rect x="10.5" y="1.8" width="3" height="2" rx="0.5" fill="#888a85" stroke="#262626" strokeWidth="0.75" />
        <circle cx="12" cy="13.2" r="9.2" fill={`url(#${uid}-rt-clk)`} stroke="#262626" strokeWidth="1.1" />
        <circle cx="12" cy="13.2" r="7.8" fill="none" stroke="#c4a000" strokeWidth="0.5" />
        {/* Tick marks */}
        <line x1="12" y1="6.2" x2="12" y2="8" stroke="#555753" strokeWidth="0.9" />
        <line x1="12" y1="18.4" x2="12" y2="20.2" stroke="#555753" strokeWidth="0.9" />
        <line x1="5" y1="13.2" x2="6.8" y2="13.2" stroke="#555753" strokeWidth="0.9" />
        <line x1="17.2" y1="13.2" x2="19" y2="13.2" stroke="#555753" strokeWidth="0.9" />
        {/* Clock hand pointing up-right */}
        <line x1="12" y1="13.2" x2="16" y2="9.2" stroke="#262626" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="12" cy="13.2" r="1.4" fill="#262626" />
      </>
    ),
  },
  {
    id: 'sop.revolve',
    label: 'Revolve',
    family: 'sop',
    description:
      'Metallic grey vase with a cased red profile line along its right side and a cased red sweep arrow circling its base toward the left.',
    types: ['revolve'],
    icons: ['sop_revolve'],
    refKey: 'SOP_revolve',
    render: (uid) => {
      const profile = 'M15.8,2.8 C14.6,3.8 13.8,4.6 13.8,6.2 C13.8,8 17.6,9.6 17.6,14 C17.6,17 16.2,18.6 15.2,19.6';
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-rv`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#89929e" />
              <stop offset="35%" stopColor="#eef2f7" />
              <stop offset="100%" stopColor="#5a616b" />
            </linearGradient>
          </defs>
          <path
            d="M7.4,2.8 C8.6,3.8 9.4,4.6 9.4,6.2 C9.4,8 5.6,9.6 5.6,14 C5.6,17 7,18.6 8,19.6 L15.2,19.6 C16.2,18.6 17.6,17 17.6,14 C17.6,9.6 13.8,8 13.8,6.2 C13.8,4.6 14.6,3.8 15.8,2.8 Z"
            fill={`url(#${uid}-rv)`}
            stroke="#262626"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <ellipse cx="11.6" cy="2.8" rx="4.2" ry="1" fill="#5a616b" stroke="#262626" strokeWidth="0.9" />
          <path d={profile} fill="none" stroke="#262626" strokeWidth="2.4" strokeLinecap="round" />
          <path d={profile} fill="none" stroke="#e03228" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M21.05,16.9 A9.2,3.2 0 1,1 3.76,19.09" fill="none" stroke="#262626" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M21.05,16.9 A9.2,3.2 0 1,1 3.76,19.09" fill="none" stroke="#e03228" strokeWidth="1.5" strokeLinecap="round" />
          <polygon points="2.4,17.8 5.4,18.2 3,20.8" fill="#e03228" stroke="#262626" strokeWidth="0.85" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'sop.ripple',
    label: 'Ripple',
    family: 'sop',
    description:
      'Diamond-shaped blue water surface mesh rippling up in concentric waves around its center, with dark grid lines and white wave crests.',
    types: ['ripple'],
    icons: ['sop_ripple'],
    refKey: 'SOP_ripple',
    render: (uid) => {
      const q: [Pt, Pt, Pt, Pt] = [
        [1.8, 12.4],
        [12, 6.4],
        [22.2, 12.4],
        [12, 18.4],
      ];
      const h = (u: number, v: number) => {
        const r = Math.hypot(u - 0.5, v - 0.5);
        return 0.55 * Math.cos((r / 0.25) * Math.PI);
      };
      const p = (u: number, v: number): Pt => {
        const b = quadPt(q, u, v);
        return [b[0], b[1] - h(u, v)];
      };
      const n = 6;
      const line = (f: (t: number) => Pt) => {
        const out: Pt[] = [];
        for (let i = 0; i <= 24; i += 1) out.push(f(i / 24));
        return `M${pts(out).replace(/ /g, ' L')}`;
      };
      const border = [line((t) => p(t, 0)), line((t) => p(1, t)), line((t) => p(1 - t, 1)), line((t) => p(0, 1 - t))]
        .map((s, i) => (i === 0 ? s : s.replace(/^M/, 'L')))
        .join(' ');
      const grid: string[] = [];
      for (let i = 1; i < n; i += 1) {
        grid.push(line((t) => p(i / n, t)));
        grid.push(line((t) => p(t, i / n)));
      }
      const crest = (r: number) => line((t) => p(0.5 + r * Math.cos(t * Math.PI * 2), 0.5 + r * Math.sin(t * Math.PI * 2)));
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-rp`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8fc2ff" />
              <stop offset="100%" stopColor="#3672c4" />
            </linearGradient>
          </defs>
          <path d={`${border} Z`} fill={`url(#${uid}-rp)`} />
          <path d={grid.join(' ')} fill="none" stroke="#2e5a9a" strokeWidth="0.45" />
          <path d={`${crest(0.25)} ${crest(0.47)}`} fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.85" strokeLinecap="round" />
          <path d={`${border} Z`} fill="none" stroke="#262626" strokeWidth="1.05" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'sop.ripplesolver',
    label: 'Ripple Solver',
    family: 'sop',
    description:
      'Translucent blue rippled water container block cradling a pink solver brain.',
    types: ['ripplesolver'],
    icons: ['sop_ripplesolver'],
    refKey: 'SOP_ripplesolver',
    render: () => (
      <g strokeLinejoin="round">
        {/* Back/top water rim behind brain */}
        <polygon points="3,12.5 12,8.4 21,12.5 12,16.6" fill="#8fc2ff" stroke="#262626" strokeWidth="0.95" />
        {/* Pink symmetrical solver brain nestled on water */}
        <ellipse cx="12" cy="10.2" rx="6.2" ry="5" fill="#f7c8ca" stroke="#262626" strokeWidth="1" />
        <path
          d="M12,5.4 V14.8 M7.4,8.6 C9,7.4 10.6,8.4 10.4,10 M16.6,8.6 C15,7.4 13.4,8.4 13.6,10 M7.8,12 C9.4,11 10.8,12 10.2,13.6 M16.2,12 C14.6,11 13.2,12 13.8,13.6"
          fill="none"
          stroke="#d07478"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
        {/* Translucent front water walls with undulating wave rim */}
        <path
          d="M3,12.5 C6,13.6 9,15.6 12,16.6 L12,21.4 L3,16.8 Z"
          fill="#5aa2f2"
          fillOpacity="0.88"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path
          d="M12,16.6 C15,15.6 18,13.6 21,12.5 L21,16.8 L12,21.4 Z"
          fill="#3672c4"
          fillOpacity="0.92"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path d="M5,14.8 C8,16.2 10,17.4 12,17.8 C14,17.4 16,16.2 19,14.8" fill="none" stroke="#eef2f7" strokeWidth="0.85" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'sop.rishader',
    label: 'RMan Shader',
    family: 'sop',
    description:
      'Silver isometric cube splashed with bold black ink splats (with drips) on its side faces and small ink spots on top.',
    types: ['rishader'],
    icons: ['sop_rishader'],
    refKey: 'SOP_rishader',
    render: (uid) => (
      <IsoCube
        uid={uid}
        name="ri"
        x={12}
        y={2}
        w={9.4}
        h={10.6}
        colors={{ top: '#eef2f7', left: '#c0c7d1', right: '#89929e' }}
        decor={{
          top: <path d="M10,5.6 C11,4.8 12.2,5.4 12.8,5.2 C13.8,5 14.2,6 13.4,6.6 C12.6,7.2 11.4,6.6 10.6,7 C9.8,7.4 9.2,6.2 10,5.6 Z M16,8.4 C16.6,7.9 17.6,8.2 17.4,8.8 C17.2,9.4 15.6,9.2 16,8.4 Z" fill="#262626" />,
          left: <path d="M3.6,12.6 C5,11 6.6,12.8 7.6,11.6 C8.8,10.2 10.4,11.4 11.2,12.6 C12,14 10.4,15.2 11.2,16.8 C11.8,18 10.6,19.6 9.4,18.6 C8.4,17.8 8.8,16.4 7.6,16.2 C6.2,16 6,18.6 4.8,18 C3.6,17.4 4.6,15.6 3.8,14.8 C3,14 2.8,13.4 3.6,12.6 Z" fill="#262626" />,
          right: <path d="M13.6,15.4 C15,13.6 16.6,15 17.8,13.2 C18.8,11.8 20.6,12.4 20.8,13.8 C21,15.2 19.4,15.6 19.6,17 C19.8,18.4 18.2,19.4 17.2,18.4 C16.4,17.6 15.6,18.8 14.6,18.2 C13.6,17.6 14.2,16.6 13.6,15.4 Z" fill="#262626" />,
        }}
      />
    ),
  },
  {
    id: 'sop.roommapframe',
    label: 'Room Map Frame',
    family: 'sop',
    description:
      'Orange square tile with a white inward spiral (Houdini logo, vendor logo, redrawn) overlapped at the lower right by a small 3D room box with a violet left wall, a light blue right wall and grey floor and ceiling.',
    types: ['roommapframe'],
    icons: ['sop_roommapframe'],
    refKey: 'SOP_roommapframe',
    render: () => (
      <>
        <rect x="2.2" y="2.2" width="12.8" height="12.8" fill="#ee8624" stroke="#262626" strokeWidth="1.1" />
        <path d={spiralPath(8.6, 8.6, 5, 0.7, 2.25)} fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <g strokeLinejoin="round" stroke="#262626">
          <polygon points="10.4,12.6 21.8,12.6 17.4,15.4 14.6,15.4" fill="#eef2f7" strokeWidth="0.8" />
          <polygon points="10.4,21.8 21.8,21.8 17.4,18.8 14.6,18.8" fill="#89929e" strokeWidth="0.8" />
          <polygon points="10.4,12.6 14.6,15.4 14.6,18.8 10.4,21.8" fill="#c084d8" strokeWidth="0.8" />
          <polygon points="17.4,15.4 21.8,12.6 21.8,21.8 17.4,18.8" fill="#5aa2f2" strokeWidth="0.8" />
          <rect x="14.6" y="15.4" width="2.8" height="3.4" fill="#3a3f47" strokeWidth="0.7" />
          <rect x="10.4" y="12.6" width="11.4" height="9.2" fill="none" strokeWidth="1.1" />
        </g>
      </>
    ),
  },
];
