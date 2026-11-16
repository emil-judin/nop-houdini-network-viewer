import type { OperatorIconDef } from '../../../iconTypes';
import { cubicAt, cubicCmd, pts, type Pt } from '../../../geoHelpers';
import { PoseSpaceArmBase, PoseSpaceBadgeFrame, Scissors } from './sharedElements';

/**
 * Batch 2, Part 6 (icons 60 to 69): built-in Houdini SOP icons under review.
 */
export const BATCH_02_PART_6: OperatorIconDef[] = [
  {
    id: 'sop.polypatch',
    label: 'PolyPatch',
    family: 'sop',
    description:
      'Curved orange ribbon surface bending from the top left down to the lower right, lofted across five parallel red cross-section curves.',
    types: ['polypatch'],
    icons: ['sop_polypatch'],
    refKey: 'SOP_polypatch',
    render: (uid) => {
      const left: Pt[] = [
        [2.4, 3.6],
        [3, 11],
        [5.4, 17.6],
        [10.4, 21.4],
      ];
      const right: Pt[] = [
        [12.6, 2],
        [13, 8.6],
        [15.4, 14],
        [21.6, 16.8],
      ];
      const at = (c: Pt[], t: number) => cubicAt(c[0], c[1], c[2], c[3], t);
      const outline = `M${pts([left[0]])} ${cubicCmd(left[1], left[2], left[3])} L${pts([right[3]])} ${cubicCmd(right[2], right[1], right[0])} Z`;
      const ribs = [0.03, 0.27, 0.5, 0.73, 0.97]
        .map((t) => {
          const a = at(left, t);
          const b = at(right, t);
          const m: Pt = [(a[0] + b[0]) / 2 + 0.5, (a[1] + b[1]) / 2 - 0.6];
          return `M${pts([a])} Q${pts([m, b])}`;
        })
        .join(' ');
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-pp`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ee8624" />
              <stop offset="100%" stopColor="#ffb066" />
            </linearGradient>
          </defs>
          <path d={outline} fill={`url(#${uid}-pp)`} stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
          <path d={ribs} fill="none" stroke="#262626" strokeWidth="1.9" strokeLinecap="round" />
          <path d={ribs} fill="none" stroke="#e03228" strokeWidth="0.95" strokeLinecap="round" />
        </>
      );
    },
  },
  {
    id: 'sop.polyreduce',
    label: 'PolyReduce',
    family: 'sop',
    description:
      'Glossy red sphere: a few large decimated facets on the left and a denser pink-edged triangle mesh on the right.',
    types: ['polyreduce'],
    icons: ['sop_polyreduce', 'sop_polyreduce-2.0'],
    refKey: 'SOP_polyreduce',
    render: (uid) => {
      const v: Record<string, Pt> = {
        A: [12.4, 2.4],
        B: [17.6, 4.2],
        C: [21, 9],
        D: [21.4, 14.6],
        E: [18.2, 19.4],
        F: [12.8, 21.6],
        G: [10, 16.4],
        H: [11.2, 10.2],
        I: [15.6, 8.2],
        J: [17.2, 13.6],
        K: [14, 17.2],
        L: [4, 7.4],
        M: [2.6, 14],
      };
      const tris = ['ABI', 'AIH', 'BCI', 'CDJ', 'CJI', 'IJH', 'HJK', 'JDE', 'JEK', 'KEF', 'KFG', 'HKG'];
      const big = [
        { k: 'ALH', fill: '#ff7066' },
        { k: 'LMH', fill: '#e03228' },
        { k: 'MGH', fill: '#c42820' },
        { k: 'MFG', fill: '#a81f18' },
      ];
      const tri = (k: string) => pts(k.split('').map((c) => v[c]));
      return (
        <>
          <defs>
            <radialGradient id={`${uid}-pr`} cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ff7066" />
              <stop offset="55%" stopColor="#e03228" />
              <stop offset="100%" stopColor="#a81f18" />
            </radialGradient>
            <clipPath id={`${uid}-pr-clip`}>
              <circle cx="12" cy="12" r="9.6" />
            </clipPath>
          </defs>
          <circle cx="12" cy="12" r="9.6" fill={`url(#${uid}-pr)`} />
          <g clipPath={`url(#${uid}-pr-clip)`} strokeLinejoin="round">
            {big.map((b) => (
              <polygon key={b.k} points={tri(b.k)} fill={b.fill} stroke="#ffb0a8" strokeWidth="0.6" />
            ))}
            {tris.map((k) => (
              <polygon key={k} points={tri(k)} fill="none" stroke="#ffd0ca" strokeWidth="0.6" />
            ))}
          </g>
          <circle cx="12" cy="12" r="9.6" fill="none" stroke="#262626" strokeWidth="1.1" />
        </>
      );
    },
  },
  {
    id: 'sop.polysoup',
    label: 'PolySoup',
    family: 'sop',
    description:
      'Red soup bowl with a silver spoon holding tan broth and floating polygon primitives.',
    types: ['polysoup'],
    icons: ['sop_polysoup'],
    refKey: 'SOP_polysoup',
    render: () => (
      <>
        <ellipse cx="12" cy="18.2" rx="9.2" ry="3.8" fill="#262626" fillOpacity="0.28" />
        <path
          d="M2.2,11.2 C2.2,16.2 6,21.4 11.8,21.4 C17.6,21.4 21.4,16.2 21.4,11.2 Z"
          fill="#cc0000"
          stroke="#640000"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <ellipse
          cx="11.8"
          cy="11.2"
          rx="9.6"
          ry="3.8"
          fill="#eeeeec"
          stroke="#860000"
          strokeWidth="0.85"
        />
        <ellipse cx="11.8" cy="11.4" rx="8.2" ry="2.9" fill="#c17d11" />
        <path
          d="M14.2,10.2 L21.2,2.2 C21.8,1.8 22.4,2.4 21.8,3.2 L15.6,11 Z"
          fill="#d3d7cf"
          stroke="#555753"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <rect x="7" y="9.8" width="2.6" height="2.2" rx="0.3" fill="#f1d3a4" stroke="#8f5902" strokeWidth="0.55" />
        <circle cx="12" cy="11.6" r="1.4" fill="#f1d3a4" stroke="#8f5902" strokeWidth="0.55" />
        <circle cx="15.2" cy="10.8" r="1.1" fill="#8ae234" stroke="#346604" strokeWidth="0.5" />
        <circle cx="9.8" cy="10.4" r="0.9" fill="#8ae234" stroke="#346604" strokeWidth="0.5" />
      </>
    ),
  },
  {
    id: 'sop.polyspline',
    label: 'PolySpline',
    family: 'sop',
    description:
      'Control polyline with dark-outlined pale square vertices overlaid by a smooth dashed spline curve.',
    types: ['polyspline'],
    icons: ['sop_polyspline'],
    refKey: 'SOP_polyspline',
    render: () => (
      <>
        <path
          d="M2.2,16.2 C3,12.2 4.8,8.5 7.4,8.8 C14.5,9.6 10.8,19.2 18.2,20 C20.8,20.2 21.6,18.2 21.8,16.2"
          fill="none"
          stroke="#262626"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="1.8 1.5"
        />
        <path
          d="M2.2,16.2 C3,12.2 4.8,8.5 7.4,8.8 C14.5,9.6 10.8,19.2 18.2,20 C20.8,20.2 21.6,18.2 21.8,16.2"
          fill="none"
          stroke="#8fc2ff"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="1.8 1.5"
        />
        <polyline
          points="2.2,16.2 7.4,8.8 18.2,20 21.8,16.2"
          fill="none"
          stroke="#262626"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polyline
          points="2.2,16.2 7.4,8.8 18.2,20 21.8,16.2"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="1.15"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <g fill="#eef2f7" stroke="#262626" strokeWidth="0.85">
          <rect x="1.2" y="15.2" width="2" height="2" />
          <rect x="6.4" y="7.8" width="2" height="2" />
          <rect x="17.2" y="19" width="2" height="2" />
          <rect x="20.8" y="15.2" width="2" height="2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.polysplit',
    label: 'PolySplit',
    family: 'sop',
    description:
      'Flat orange diamond polygon with a split line across its middle (solid on the left, dotted on the right), cut by red-handled scissors coming from the upper left.',
    types: ['polysplit'],
    icons: ['sop_polysplit', 'sop_polysplit-2.0'],
    refKey: 'SOP_polysplit',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ps`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="100%" stopColor="#ee8624" />
          </linearGradient>
        </defs>
        <polygon points="2.4,15.2 12.8,11.2 21.8,15.2 11.6,20.8" fill={`url(#${uid}-ps)`} stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M2.4,15.2 L12.1,15.2" stroke="#262626" strokeWidth="1.1" />
        <path d="M12.1,15.2 L21.8,15.2" stroke="#262626" strokeWidth="1.1" strokeDasharray="0.7 0.9" />
        <Scissors transform="translate(11.8 8.2) rotate(100)" />
      </>
    ),
  },
  {
    id: 'sop.polywire',
    label: 'PolyWire',
    family: 'sop',
    description:
      'Three blue tubular polygon branches meeting at a red central Y-junction.',
    types: ['polywire'],
    icons: ['sop_polywire'],
    refKey: 'SOP_polywire',
    render: () => (
      <>
        <g stroke="#17314c" strokeWidth="0.85" strokeLinejoin="round">
          <path d="M6.2,3 L10.2,2.2 L12,9.2 L8,10 Z" fill="#709ec3" />
          <ellipse cx="8.2" cy="2.6" rx="2.1" ry="0.9" transform="rotate(-12 8.2 2.6)" fill="#d2deec" />
          <path d="M13.2,8.8 L19.4,5.4 L21.4,8.8 L14.6,12.4 Z" fill="#3778b3" />
          <ellipse cx="20.4" cy="7.1" rx="1" ry="1.9" transform="rotate(-28 20.4 7.1)" fill="#3065a0" />
          <path d="M7.6,12.5 L11.4,14.4 L9,21.4 L4.4,19.4 Z" fill="#3778b3" />
          <ellipse cx="6.7" cy="20.4" rx="2.4" ry="1.1" transform="rotate(22 6.7 20.4)" fill="#224987" />
        </g>
        <path
          d="M7.6,9.2 C9.5,8.4 12,8.2 13.8,9 C14.8,10.2 14.8,11.8 14.2,12.8 C12.6,14 10.2,14.4 7.4,12.8 C6.8,11.5 6.8,10.2 7.6,9.2 Z"
          fill="#ed2728"
          stroke="#a40e0a"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <ellipse cx="10.4" cy="10.8" rx="1.6" ry="1" fill="#f77373" />
      </>
    ),
  },
  {
    id: 'sop.posescope',
    label: 'Pose Scope',
    family: 'sop',
    description:
      'Circular green oscilloscope screen displaying a bright pose waveform linked to a cased 3-axis coordinate gizmo.',
    types: ['posescope'],
    icons: ['sop_posescope'],
    refKey: 'SOP_posescope',
    render: () => (
      <>
        <ellipse
          cx="9.4"
          cy="12.2"
          rx="7.3"
          ry="8.3"
          transform="rotate(-18 9.4 12.2)"
          fill="#1b3d20"
          stroke="#262626"
          strokeWidth="1.15"
        />
        <g stroke="#58c848" strokeWidth="0.45" strokeOpacity="0.4">
          <line x1="5" y1="8.5" x2="14" y2="12" />
          <line x1="4" y1="12" x2="14.5" y2="16" />
          <line x1="7" y1="5.5" x2="7" y2="18.5" />
          <line x1="11.5" y1="6.5" x2="11.5" y2="19" />
        </g>
        <path
          d="M3.2,8.2 C4.2,11.8 5.2,12.5 6.8,9.8 C8.4,7.2 8.2,15.8 10.6,16.5 C12.8,17.2 14,10.2 17.8,12"
          fill="none"
          stroke="#112614"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M3.2,8.2 C4.2,11.8 5.2,12.5 6.8,9.8 C8.4,7.2 8.2,15.8 10.6,16.5 C12.8,17.2 14,10.2 17.8,12"
          fill="none"
          stroke="#58c848"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <g stroke="#262626" strokeWidth="2.1" strokeLinecap="round">
          <line x1="17.8" y1="12" x2="17.8" y2="7.5" />
          <line x1="17.8" y1="12" x2="21.8" y2="13.5" />
          <line x1="17.8" y1="12" x2="14.8" y2="14.8" />
        </g>
        <g strokeWidth="1.05" strokeLinecap="round">
          <line x1="17.8" y1="12" x2="17.8" y2="7.5" stroke="#58c848" />
          <line x1="17.8" y1="12" x2="21.8" y2="13.5" stroke="#e03228" />
          <line x1="17.8" y1="12" x2="14.8" y2="14.8" stroke="#5aa2f2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.posespacedeform',
    label: 'Pose-Space Deform',
    family: 'sop',
    description: 'Golden-tan flexed muscular arm with a clenched fist and bulging bicep, with brown crease lines on the fist, bicep and elbow.',
    types: ['posespacedeform'],
    icons: ['sop_posespacedeform'],
    refKey: 'SOP_posespacedeform',
    render: (uid) => (
      <>
        <PoseSpaceArmBase uid={uid} shiftX={1.6} />
        <path
          transform="translate(1.6 0)"
          d="M10.8,3.4 C11.6,4.4 12.8,4.8 14,4.4 M9.4,7.4 C10.2,7.9 11,8.1 11.8,8.1 M9.4,13.4 C11.4,12.6 13.8,12.9 15.6,14.2 M3.8,17.6 C5,18.6 6.6,19.2 8.2,19.4"
          fill="none"
          stroke="#6c4402"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.posespacedeformcombine',
    label: 'Pose-Space Deform Combine',
    family: 'sop',
    description:
      'Golden-tan flexed muscular arm with a black-and-white plus badge on the lower right.',
    types: ['posespacedeformcombine'],
    icons: ['sop_posespacedeformcombine'],
    refKey: 'SOP_posespacedeformcombine',
    render: (uid) => (
      <>
        <PoseSpaceArmBase uid={uid} />
        <PoseSpaceBadgeFrame>
          <g stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round">
            <line x1="16.5" y1="12.2" x2="16.5" y2="17.4" />
            <line x1="13.9" y1="14.8" x2="19.1" y2="14.8" />
          </g>
        </PoseSpaceBadgeFrame>
      </>
    ),
  },
  {
    id: 'sop.posespaceedit',
    label: 'Pose-Space Edit',
    family: 'sop',
    description:
      'Golden-tan flexed muscular arm with a black-and-white edit pencil badge on the lower right.',
    types: ['posespaceedit'],
    icons: ['sop_posespaceedit'],
    refKey: 'SOP_posespaceedit',
    render: (uid) => (
      <>
        <PoseSpaceArmBase uid={uid} />
        <PoseSpaceBadgeFrame>
          <polygon
            points="14.2,17.2 14.8,15.2 17.6,12.4 19,13.8 16.2,16.6"
            fill="#e3e3e3"
            stroke="#7c7c7c"
            strokeWidth="0.45"
            strokeLinejoin="round"
          />
        </PoseSpaceBadgeFrame>
      </>
    ),
  },
];
