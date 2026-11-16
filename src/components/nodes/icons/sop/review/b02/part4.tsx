import type { OperatorIconDef } from '../../../iconTypes';
import { KinefxMannequinBase } from '../../familyKits';
import { cubicAt, cubicCmd, pts, type Pt } from '../../../geoHelpers';
import { MetallicGear, OpenSuitcase } from './sharedElements';

/**
 * Batch 2, Part 4 (icons 40 to 49): built-in Houdini SOP icons under review.
 */
export const BATCH_02_PART_4: OperatorIconDef[] = [
  {
    id: 'sop.packedfoldercopy',
    label: 'Packed Folder Copy',
    family: 'sop',
    description: 'Two overlapping open purple-and-white folders representing a copied packed folder.',
    types: ['packedfoldercopy'],
    icons: ['sop_packedfoldercopy'],
    refKey: 'SOP_packedfoldercopy',
    render: () => (
      <>
        {[
          { dx: 0, dy: 0 },
          { dx: 4.4, dy: 4.6 },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.dx}, ${p.dy})`}>
            <path
              d="M2.2,4.2 L6.8,3.2 L8,4.5 L14.2,3.2 L15.2,14.2 L3,17.2 Z"
              fill="#ad7fa8"
              stroke="#5c3566"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            <polygon
              points="3,17.2 4.2,8.4 16.4,5.4 15.2,14.2"
              fill="#e3ecef"
              stroke="#525b66"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </>
    ),
  },
  {
    id: 'sop.packedfoldersplit',
    label: 'Packed Folder Split',
    family: 'sop',
    description:
      'Open lavender-trimmed white folder with two diverging orange-red arrows splitting outward and a blue mannequin standing in front.',
    types: ['packedfoldersplit'],
    icons: ['sop_packedfoldersplit'],
    refKey: 'SOP_packedfoldersplit',
    render: () => (
      <>
        <path
          d="M3,7.2 L8.4,6 L9.8,7.2 L16.8,5.6 L18,18.4 L4.2,21.6 Z"
          fill="#c084d8"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polygon
          points="9.6,11.6 5.6,8.2 4,9.8 3.6,4.4 9,4.8 7.4,6.4 11.2,9.8"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="11.2,11 15,7 13.4,5.4 18.6,5 18.2,10.2 16.6,8.6 12.8,12.4"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="4.2,21.6 5.6,12 19.2,8.4 18,18.4"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <KinefxMannequinBase cx={16.6} cy={15.4} scale={0.62} />
      </>
    ),
  },
  {
    id: 'sop.packededit',
    label: 'Packed Properties',
    family: 'sop',
    description:
      'Open brown and gold suitcase seen from the front (lid leaning back on its hinge, silver handle below the front) holding a white cylinder with a blue outline and a white cone with a red outline, with a metallic settings gear at the lower right.',
    types: ['packededit'],
    icons: ['sop_packededit'],
    refKey: 'SOP_packededit',
    render: (uid) => (
      <>
        <OpenSuitcase uid={uid}>
          <g strokeLinejoin="round" strokeWidth="0.9">
            <path d="M6.4,5.6 L6.4,11.8 A1.9,0.9 0 0,0 10.2,11.8 L10.2,5.6 Z" fill="#f2f4f7" stroke="#3672c4" />
            <ellipse cx="8.3" cy="5.6" rx="1.9" ry="0.9" fill="#ffffff" stroke="#3672c4" />
            <path d="M14,4.8 L11.6,12.2 A2.4,0.9 0 0,0 16.4,12.2 Z" fill="#f2f4f7" stroke="#e03228" />
          </g>
        </OpenSuitcase>
        <MetallicGear uid={uid} cx={18} cy={17.6} r={4.4} />
      </>
    ),
  },
  {
    id: 'sop.pathdeform',
    label: 'Path Deform',
    family: 'sop',
    description:
      'Grey segmented bar (light top, shaded front wall) bent into an S-curve along a cased red spine curve with three red points.',
    types: ['pathdeform'],
    icons: ['sop_pathdeform'],
    refKey: 'SOP_pathdeform',
    render: (uid) => {
      const spine: Pt[] = [
        [2.2, 12.2],
        [11, 12.4],
        [12, 4.6],
        [21.8, 4.6],
      ];
      const off = (dy: number): Pt[] => spine.map(([x, y]) => [x, y + dy] as Pt);
      const curve = (q: Pt[]) => `M${pts([q[0]])} ${cubicCmd(q[1], q[2], q[3])}`;
      const back = (q: Pt[]) => `L${pts([q[3]])} ${cubicCmd(q[2], q[1], q[0])}`;
      const at = (q: Pt[], t: number) => cubicAt(q[0], q[1], q[2], q[3], t);
      const front = off(1.3);
      const rear = off(-1.3);
      const ts = [0.14, 0.3, 0.44, 0.56, 0.7, 0.86];
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-pd-wall`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c0c7d1" />
              <stop offset="100%" stopColor="#89929e" />
            </linearGradient>
          </defs>
          <path d={`${curve(front)} ${back(off(6.7))} Z`} fill={`url(#${uid}-pd-wall)`} stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
          <path d={`${curve(rear)} ${back(front)} Z`} fill="#eef2f7" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
          <path
            d={ts
              .map((t) => {
                const f = at(front, t);
                const r = at(rear, t);
                return `M${pts([r])} L${pts([f])} L${pts([[f[0], f[1] + 5.4]])}`;
              })
              .join(' ')}
            fill="none"
            stroke="#5a616b"
            strokeWidth="0.6"
          />
          <path d={curve(spine)} fill="none" stroke="#262626" strokeWidth="2.4" strokeLinecap="round" />
          <path d={curve(spine)} fill="none" stroke="#e03228" strokeWidth="1.3" strokeLinecap="round" />
          {[0.05, 0.5, 0.95].map((t) => {
            const p = at(spine, t);
            return <circle key={t} cx={p[0]} cy={p[1]} r="1.2" fill="#e03228" stroke="#ffffff" strokeWidth="0.6" />;
          })}
        </>
      );
    },
  },
  {
    id: 'sop.peak',
    label: 'Peak',
    family: 'sop',
    description:
      'Metallic grey sphere with two sharp surface peaks pulled outward along red normal arrows.',
    types: ['peak'],
    icons: ['sop_peak'],
    refKey: 'SOP_peak',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pk-sp`} cx="40%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#ccd2d7" />
            <stop offset="100%" stopColor="#505359" />
          </radialGradient>
        </defs>
        <g stroke="#eeeeec" strokeWidth="2.1" strokeLinecap="round">
          <line x1="6.4" y1="8.2" x2="2.6" y2="3.8" />
          <line x1="17.6" y1="8.2" x2="21.4" y2="3.8" />
        </g>
        <path
          d="M12,8.4 C13.2,8.4 14.2,8.8 15,9.4 C16.5,10.4 18.2,7.8 18.6,8.2 C19,8.6 17.6,11.2 18.5,12.8 C19,13.7 19.2,14.6 19.2,15.6 C19.2,19.5 16,22.4 12,22.4 C8,22.4 4.8,19.5 4.8,15.6 C4.8,14.6 5,13.7 5.5,12.8 C6.4,11.2 5,8.6 5.4,8.2 C5.8,7.8 7.5,10.4 9,9.4 C9.8,8.8 10.8,8.4 12,8.4 Z"
          fill={`url(#${uid}-pk-sp)`}
          stroke="#192333"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <g stroke="#ef2929" strokeWidth="1.15" strokeLinecap="round">
          <line x1="6.4" y1="8.2" x2="2.8" y2="4" />
          <line x1="17.6" y1="8.2" x2="21.2" y2="4" />
        </g>
        <polygon points="1.8,2.8 4.6,3.6 2.6,5.4" fill="#ef2929" />
        <polygon points="22.2,2.8 19.4,3.6 21.4,5.4" fill="#ef2929" />
        <circle cx="6.2" cy="8.2" r="0.9" fill="#ef2929" stroke="#eeeeec" strokeWidth="0.4" />
        <circle cx="17.8" cy="8.2" r="0.9" fill="#ef2929" stroke="#eeeeec" strokeWidth="0.4" />
      </>
    ),
  },
  {
    id: 'sop.planarinflate',
    label: 'Planar Inflate',
    family: 'sop',
    description: 'Puffy white-and-silver inflated cushion with pinched corners and a ground shadow.',
    types: ['planarinflate'],
    icons: ['sop_planarinflate'],
    refKey: 'SOP_planarinflate',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pi-pil`} cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#d3d7cf" />
            <stop offset="100%" stopColor="#888a85" />
          </radialGradient>
        </defs>
        <ellipse cx="12" cy="16.5" rx="9.8" ry="4.5" fill="#262626" fillOpacity="0.25" transform="rotate(-15 12 16.5)" />
        <path
          d="M2.2,12 C3.8,11.4 5.5,9.5 8.5,7.8 C11.5,6.2 13.5,6.2 14.5,5.2 C15,4.8 15.5,5.4 16,6 C17.8,6.5 19.8,7.8 20.8,9.8 C21.2,10.5 21.8,10.8 22,11.2 C21.2,11.8 19.5,13.5 16.8,15.5 C13.8,17.6 11,18.2 10.2,19.4 C9.8,19.8 9.2,19.2 8.8,18.2 C6.2,16.8 4.2,14.5 2.2,12 Z"
          fill={`url(#${uid}-pi-pil)`}
          stroke="#2e3436"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M3.5,12.2 C6.5,13.8 9,16.5 9.8,18.5 M10.2,18.2 C13.5,16.8 17.5,14.2 20.8,11"
          fill="none"
          stroke="#555753"
          strokeWidth="0.55"
        />
      </>
    ),
  },
  {
    id: 'sop.planarpatch',
    label: 'Planar Patch',
    family: 'sop',
    description:
      'Rolled blue fabric bolt on a wooden dowel unrolling a rectangular planar cloth sheet.',
    types: ['planarpatch'],
    icons: ['sop_planarpatch'],
    refKey: 'SOP_planarpatch',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-pp-roll`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#98caff" />
            <stop offset="55%" stopColor="#6093c9" />
            <stop offset="100%" stopColor="#284e76" />
          </linearGradient>
        </defs>
        <polygon
          points="12,7 22,13.4 12.4,22 2.4,14.2"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="12,8 20.8,13.5 12.4,20.8 3.6,14"
          fill="none"
          stroke="#cadbed"
          strokeWidth="0.55"
          strokeDasharray="1.2 1"
        />
        <path
          d="M12.2,3.4 L14,2.2 C14.8,1.8 15.8,2.8 15.8,4 C15.8,4.6 15.5,5 15,5.4 L13.4,6.5 Z"
          fill="#eabb73"
          stroke="#563501"
          strokeWidth="0.7"
        />
        <path
          d="M2,10.2 L11.2,2.4 C12.4,1.8 14.4,3.8 14.4,6 C14.4,6.8 14,7.4 13.4,7.8 L5,14.8 Z"
          fill={`url(#${uid}-pp-roll)`}
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <ellipse
          cx="3.5"
          cy="12.5"
          rx="1.8"
          ry="2.4"
          fill="#9fbede"
          stroke="#204a87"
          strokeWidth="0.8"
        />
        <ellipse cx="3.5" cy="12.5" rx="0.7" ry="1" fill="#eabb73" stroke="#563501" strokeWidth="0.55" />
      </>
    ),
  },
  {
    id: 'sop.planarpatchfromcurves',
    label: 'Planar Patch from Curves',
    family: 'sop',
    description:
      'Rolled blue fabric bolt unrolling a planar cloth sheet featuring a dark-interior, red-rimmed 5-point star cutout.',
    types: ['planarpatchfromcurves'],
    icons: ['sop_planarpatchfromcurves'],
    refKey: 'SOP_planarpatchfromcurves',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ppc-roll`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8fc2ff" />
            <stop offset="55%" stopColor="#5aa2f2" />
            <stop offset="100%" stopColor="#2e74c4" />
          </linearGradient>
        </defs>
        <polygon
          points="12,6.4 21.8,13 12.2,21.6 2.4,13.6"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <polygon
          points="12.4,10 13.7,12.5 16.5,12.3 14.4,14.2 15.6,16.8 12.8,15.6 10.6,17.6 10.8,14.8 8.4,13.6 11.2,12.6"
          fill="#262626"
          stroke="#e03228"
          strokeWidth="0.75"
          strokeDasharray="1.4 0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="17.2,15.4 18.4,17.4 20.6,17.4 19,19 19.6,21.2 17.4,20.2 15.4,21.4 15.6,19.2 13.8,17.8 16,17.4"
          fill="#8fc2ff"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M12.2,2.8 L14,1.6 C14.8,1.2 15.8,2.2 15.8,3.4 C15.8,4 15.5,4.4 15,4.8 L13.4,5.9 Z"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <path
          d="M2,9.6 L11.2,1.8 C12.4,1.2 14.4,3.2 14.4,5.4 C14.4,6.2 14,6.8 13.4,7.2 L5,14.2 Z"
          fill={`url(#${uid}-ppc-roll)`}
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <ellipse cx="3.5" cy="11.9" rx="1.8" ry="2.4" fill="#8fc2ff" stroke="#262626" strokeWidth="0.85" />
        <ellipse cx="3.5" cy="11.9" rx="0.7" ry="1" fill="#f2c438" stroke="#262626" strokeWidth="0.65" />
      </>
    ),
  },
  {
    id: 'sop.planarpleat',
    label: 'Planar Pleat',
    family: 'sop',
    description:
      'Tan pleated skirt fabric panel with vertical box pleats and blue stitching accents along the waistband.',
    types: ['planarpleat'],
    icons: ['sop_planarpleat'],
    refKey: 'SOP_planarpleat',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ppl-fab`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d3c9ab" />
            <stop offset="50%" stopColor="#dcd7c6" />
            <stop offset="100%" stopColor="#b5a87e" />
          </linearGradient>
        </defs>
        <ellipse cx="12" cy="20.6" rx="9.5" ry="1.8" fill="#262626" fillOpacity="0.25" />
        <path
          d="M3.4,4.2 L20.6,4.2 L22,19.2 L18.5,19 L18.5,19.8 L14.5,19.4 L14.5,20.2 L10.5,19.4 L10.5,20.2 L6.5,19 L6.5,19.8 L2,19.2 Z"
          fill={`url(#${uid}-ppl-fab)`}
          stroke="#5d5331"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <rect
          x="3.4"
          y="2.6"
          width="17.2"
          height="2"
          rx="0.4"
          fill="#c4b887"
          stroke="#8f5902"
          strokeWidth="0.75"
        />
        <g stroke="#5d5331" strokeWidth="0.65">
          <line x1="7.2" y1="4.6" x2="6.4" y2="19.4" />
          <line x1="10.8" y1="4.6" x2="10.4" y2="19.8" />
          <line x1="14.2" y1="4.6" x2="14.4" y2="19.8" />
          <line x1="17.6" y1="4.6" x2="18.4" y2="19.4" />
        </g>
        <g stroke="#204a87" strokeWidth="0.75" strokeDasharray="1 0.8">
          <line x1="7.2" y1="5" x2="7" y2="8.8" />
          <line x1="10.8" y1="5" x2="10.6" y2="8.8" />
          <line x1="14.2" y1="5" x2="14.3" y2="8.8" />
          <line x1="17.6" y1="5" x2="17.8" y2="8.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.planartiles',
    label: 'Planar Tiles',
    family: 'sop',
    description:
      'Upright white ceramic tile seen at an angle (grey edge thickness) with a Delft-blue four-petal rosette and blue corner accents.',
    types: ['planartiles'],
    icons: ['sop_planartiles'],
    refKey: 'SOP_planartiles',
    render: () => {
      const petals: Pt[] = [
        [3.7, 6.6],
        [8.3, 6.6],
        [6, 4.3],
        [6, 8.9],
      ];
      const inner: Pt[] = petals.map(([x, y]) => [6 + (x - 6) * 0.48, 6.6 + (y - 6.6) * 0.48] as Pt);
      return (
        <g strokeLinejoin="round">
          <polygon points="5,2.6 6.8,1.8 18.8,7.8 17,8.6" fill="#eef2f7" stroke="#262626" strokeWidth="0.9" />
          <polygon points="17,8.6 18.8,7.8 18.8,21 17,21.8" fill="#89929e" stroke="#262626" strokeWidth="0.9" />
          <g transform="matrix(1 0.5 0 1 5 2.6)">
            <rect x="0" y="0" width="12" height="13.2" fill="#f2f4f7" stroke="#262626" strokeWidth="1.05" />
            <g fill="#3672c4">
              <polygon points="0.7,0.7 3,0.7 0.7,3" />
              <polygon points="11.3,0.7 9,0.7 11.3,3" />
              <polygon points="0.7,12.5 3,12.5 0.7,10.2" />
              <polygon points="11.3,12.5 9,12.5 11.3,10.2" />
            </g>
            {petals.map(([x, y]) => (
              <circle key={`o${x}${y}`} cx={x} cy={y} r="2.3" fill="none" stroke="#262626" strokeWidth="1.3" />
            ))}
            {petals.map(([x, y]) => (
              <circle key={`f${x}${y}`} cx={x} cy={y} r="2.3" fill="#3672c4" />
            ))}
            {inner.map(([x, y]) => (
              <circle key={`i${x}${y}`} cx={x} cy={y} r="1.1" fill="#f2f4f7" />
            ))}
            <circle cx="6" cy="6.6" r="0.75" fill="#262626" />
          </g>
        </g>
      );
    },
  },
];
