import type { OperatorIconDef } from '../../../iconTypes';
import { KinefxMannequinBase } from '../../familyKits';
import { pts, quadPt, type Pt } from '../../../geoHelpers';
import {
  FOLDER_ARROW_POINTS,
  FOLDER_BACK_PATH,
  FOLDER_SHEET_POINTS,
  IsoCube,
  MetallicGear,
  OpenSuitcase,
  PackedTray,
  SUITCASE_FLOOR,
} from './sharedElements';

/**
 * Batch 2, Part 3 (icons 30 to 39): built-in Houdini SOP icons under review.
 */
export const BATCH_02_PART_3: OperatorIconDef[] = [
  {
    id: 'sop.neuralterraingenerate',
    label: 'Neural Terrain Generate',
    family: 'sop',
    description:
      'Blue isometric terrain slab with stepped blue voxel blocks rising at the back left, a dark winding river channel across the top and a white snow corner.',
    types: ['neuralterraingenerate'],
    icons: ['sop_neuralterraingenerate'],
    refKey: 'SOP_neuralterraingenerate',
    render: (uid) => {
      const blue = { top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4' };
      return (
        <>
          <g strokeLinejoin="round">
            <polygon points="1.8,13.4 12,18.5 12,21.3 1.8,16.2" fill="#5aa2f2" stroke="#262626" strokeWidth="1" />
            <polygon points="12,18.5 22.2,13.4 22.2,16.2 12,21.3" fill="#3672c4" stroke="#262626" strokeWidth="1" />
            <polygon points="1.8,13.4 12,8.3 22.2,13.4 12,18.5" fill="#8fc2ff" stroke="#262626" strokeWidth="1" />
            <polygon points="22.2,13.4 18.4,15.3 16.6,14.4 20.4,12.5" fill="#ffffff" stroke="#262626" strokeWidth="0.6" />
          </g>
          {/* River channel */}
          <path d="M4.4,14.7 C7.6,13.6 8.6,15.6 11.6,15 C14.2,14.4 14.6,12.4 18,11.4" fill="none" stroke="#262626" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M4.4,14.7 C7.6,13.6 8.6,15.6 11.6,15 C14.2,14.4 14.6,12.4 18,11.4" fill="none" stroke="#5a616b" strokeWidth="1.5" strokeLinecap="round" />
          {/* Stepped voxel blocks */}
          <IsoCube uid={uid} name="v1" x={7.4} y={3.6} w={2.4} h={4.4} colors={blue} strokeWidth={0.75} />
          <IsoCube uid={uid} name="v2" x={11.4} y={2.4} w={2.4} h={4.6} colors={blue} strokeWidth={0.75} />
          <IsoCube uid={uid} name="v3" x={4.8} y={7.4} w={2.4} h={2.8} colors={blue} strokeWidth={0.75} />
          <IsoCube uid={uid} name="v4" x={9.2} y={6.6} w={2.4} h={2.6} colors={blue} strokeWidth={0.75} />
          <IsoCube uid={uid} name="v5" x={14.6} y={6.2} w={2.4} h={2} colors={blue} strokeWidth={0.75} />
        </>
      );
    },
  },
  {
    id: 'sop.opencl',
    label: 'OpenCL',
    family: 'sop',
    description:
      'High-speed gauge arc segmented from green through yellow to red with a silver indicator needle.',
    types: ['opencl'],
    icons: ['sop_opencl'],
    refKey: 'SOP_opencl',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.35" strokeLinejoin="round">
          <path d="M2.2,16.2 A10,10 0 0,1 3.6,11.2 L6.8,12.8 A6.4,6.4 0 0,0 5.8,16.2 Z" fill="#018148" />
          <path d="M3.9,10.6 A10,10 0 0,1 7.2,6.8 L9.4,9.6 A6.4,6.4 0 0,0 7.2,12.2 Z" fill="#80c244" />
          <path d="M7.8,6.4 A10,10 0 0,1 12.4,5 L12.4,8.6 A6.4,6.4 0 0,0 9.8,9.4 Z" fill="#c1d62f" />
          <path d="M13,5 A10,10 0 0,1 17.5,6.6 L15.4,9.5 A6.4,6.4 0 0,0 13,8.6 Z" fill="#f0c61d" />
          <path d="M18,7 A10,10 0 0,1 20.8,10.8 L17.6,12.4 A6.4,6.4 0 0,0 15.8,9.8 Z" fill="#f96920" />
          <path d="M21,11.4 A10,10 0 0,1 21.8,16.2 L18.2,16.2 A6.4,6.4 0 0,0 17.8,13 Z" fill="#ed2c2f" />
        </g>
        <polygon
          points="11.2,16.4 19.6,10.4 12.6,17.8"
          fill="#cbcac8"
          stroke="#2e3436"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="16.8" r="1.6" fill="#939297" stroke="#2e3436" strokeWidth="0.65" />
      </>
    ),
  },
  {
    id: 'sop.orientalongcurve',
    label: 'Orientation along Curve',
    family: 'sop',
    description:
      'S-curve cased for visibility with translucent blue orientation frames and orange tangent arrows.',
    types: ['orientalongcurve'],
    icons: ['sop_orientalongcurve'],
    refKey: 'SOP_orientalongcurve',
    render: () => (
      <>
        <path
          d="M3.5,20 C6.2,15.6 11.5,16.6 13.5,11.6 C15.2,7.4 12.4,5.4 18.8,3.4"
          fill="none"
          stroke="#262626"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M3.5,20 C6.2,15.6 11.5,16.6 13.5,11.6 C15.2,7.4 12.4,5.4 18.8,3.4"
          fill="none"
          stroke="#c0c7d1"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
        {[
          { x: 5.5, y: 17.8, a: -28 },
          { x: 10.6, y: 15.2, a: -12 },
          { x: 13.6, y: 11.2, a: 18 },
          { x: 15.2, y: 6.2, a: -22 },
        ].map((f, i) => (
          <g key={i} transform={`translate(${f.x}, ${f.y}) rotate(${f.a})`}>
            <polygon
              points="-2.6,-3 2.6,-1.6 2.6,3 -2.6,1.6"
              fill="#eef2f7"
              fillOpacity="0.65"
              stroke="#3672c4"
              strokeWidth="0.85"
              strokeLinejoin="round"
            />
            <line x1="0" y1="0" x2="2.8" y2="-1.9" stroke="#262626" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="0" y1="0" x2="2.8" y2="-1.9" stroke="#ee8624" strokeWidth="0.95" strokeLinecap="round" />
            <circle cx="0" cy="0" r="0.85" fill="#262626" stroke="#eef2f7" strokeWidth="0.35" />
          </g>
        ))}
      </>
    ),
  },
  {
    id: 'sop.otisconfiguremuscleandtissue',
    label: 'Otis Muscle and Tissue Configure',
    family: 'sop',
    description:
      'Bent arm with a red striated forearm muscle, a purple tissue sleeve on the upper arm and white skeletal finger bones, plus a white callout card with a purple pie chart linked to the arm.',
    types: ['otisconfiguremuscleandtissue'],
    icons: ['sop_otisconfiguremuscleandtissue'],
    refKey: 'SOP_otisconfiguremuscleandtissue',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-otc-mus`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff7066" />
            <stop offset="60%" stopColor="#e03228" />
            <stop offset="100%" stopColor="#a81f18" />
          </linearGradient>
          <linearGradient id={`${uid}-otc-tis`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#c084d8" />
            <stop offset="60%" stopColor="#8a56c4" />
            <stop offset="100%" stopColor="#5e2f96" />
          </linearGradient>
        </defs>
        {/* Skeletal hand bones */}
        <g fill="none" strokeLinecap="round">
          <path d="M5.2,6.4 L2.8,2.2 M5.8,6 L4.8,1.6 M6.6,5.8 L7,1.6 M7.4,6.2 L9,2.6" stroke="#262626" strokeWidth="2.1" />
          <path d="M5.2,6.4 L2.8,2.2 M5.8,6 L4.8,1.6 M6.6,5.8 L7,1.6 M7.4,6.2 L9,2.6" stroke="#eef2f7" strokeWidth="1" />
        </g>
        {/* Purple tissue sleeve (upper arm) */}
        <path d="M9.4,18.6 C13.4,19.6 17.6,16.8 21.6,12.6 L20.4,9.2 C17.4,12.2 13.8,14.6 10.4,15 Z" fill={`url(#${uid}-otc-tis)`} stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        {/* Red striated forearm */}
        <path d="M3.6,7 C3.2,11.6 6,17.8 9.4,21.2 L12.6,19.2 C10.6,15.2 8.6,10.6 8,6.2 Z" fill={`url(#${uid}-otc-mus)`} stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        <path d="M5.4,8.4 C5.6,12.4 7.4,16.4 9.6,19.4 M7,7.6 C7.4,11.4 8.8,15.2 10.8,18.6" fill="none" stroke="#ffb0a8" strokeWidth="0.6" strokeLinecap="round" />
        {/* Callout card linked to the arm */}
        <path d="M15.4,8.4 L17.2,12.4" stroke="#262626" strokeWidth="0.9" />
        <circle cx="17.4" cy="12.8" r="1" fill="#ffffff" stroke="#262626" strokeWidth="0.75" />
        <rect x="11.2" y="1.6" width="11" height="7.2" rx="0.8" fill="#ffffff" stroke="#262626" strokeWidth="0.95" />
        <rect x="11.2" y="1.6" width="11" height="1.5" rx="0.6" fill="#8a56c4" stroke="#262626" strokeWidth="0.7" />
        <circle cx="14.2" cy="5.9" r="1.8" fill="#c084d8" stroke="#5e2f96" strokeWidth="0.5" />
        <path d="M14.2,5.9 L14.2,4.1 A1.8,1.8 0 0,1 16,5.9 Z" fill="#5e2f96" />
        <rect x="17" y="4.2" width="1.7" height="1.5" fill="#8a56c4" />
        <rect x="19.4" y="4.2" width="1.7" height="1.5" fill="#c084d8" />
        <path d="M17,7.2 H21.1" stroke="#c084d8" strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.otissolver',
    label: 'Otis Solver',
    family: 'sop',
    description:
      'Generic pink anatomical muscle bust (head, shoulders, chest and abs) with a lavender glow outline and a pale pink brain badge at the lower right.',
    types: ['otissolver'],
    icons: ['sop_otissolver'],
    refKey: 'SOP_otissolver',
    render: (uid) => {
      const body =
        'M8.6,6.6 L11,6.6 L11.4,8.4 C14,8.4 16.4,9.2 17.2,11.4 C17.6,13 17.2,15 16.4,16.2 L15.2,13.8 L14.6,21.6 L5,21.6 L4.4,13.8 L3.2,16.2 C2.4,15 2,13 2.4,11.4 C3.2,9.2 5.6,8.4 8.2,8.4 Z';
      return (
        <>
          <defs>
            <radialGradient id={`${uid}-ots-skin`} cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#ffb0b8" />
              <stop offset="55%" stopColor="#e85a6a" />
              <stop offset="100%" stopColor="#a81f18" />
            </radialGradient>
          </defs>
          {/* Lavender glow behind the bust */}
          <g fill="none" stroke="#c8a2ff" strokeWidth="2.6" strokeLinejoin="round">
            <path d={body} />
            <ellipse cx="9.8" cy="4.4" rx="2.4" ry="2.8" />
          </g>
          <path d={body} fill={`url(#${uid}-ots-skin)`} stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
          <ellipse cx="9.8" cy="4.4" rx="2.4" ry="2.8" fill={`url(#${uid}-ots-skin)`} stroke="#262626" strokeWidth="1" />
          <path
            d="M6,11.4 C7.6,12.8 9.8,12.6 9.8,11.2 C9.8,12.6 12,12.8 13.6,11.4 M9.8,13 L9.8,20.6 M7.8,15.4 H11.8 M8,18 H11.6"
            fill="none"
            stroke="#a81f18"
            strokeWidth="0.65"
            strokeLinecap="round"
          />
          {/* Brain badge */}
          <ellipse cx="16.8" cy="17.4" rx="5.2" ry="4.2" fill="#f7c6cc" stroke="#262626" strokeWidth="1" />
          <path
            d="M16.8,13.4 L16.8,21.4 M13,16 C14,15 15,16.6 16,15.6 M13.2,18.8 C14.4,17.8 15.2,19.6 16.2,18.6 M17.6,15.6 C18.6,16.6 19.6,15 20.6,16 M17.4,18.6 C18.4,19.6 19.4,17.8 20.6,18.8"
            fill="none"
            stroke="#c2505e"
            strokeWidth="0.65"
            strokeLinecap="round"
          />
        </>
      );
    },
  },
  {
    id: 'sop.pack',
    label: 'Pack',
    family: 'sop',
    description:
      'Open brown and gold suitcase seen from the front (lid leaning back on its hinge, silver handle below the front) holding a blue cylinder and a yellow pyramid.',
    types: ['pack'],
    icons: ['sop_pack'],
    refKey: 'SOP_pack',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-pk-cyl`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8fc2ff" />
            <stop offset="100%" stopColor="#3672c4" />
          </linearGradient>
        </defs>
        <OpenSuitcase uid={uid}>
          <g strokeLinejoin="round">
            <path d="M6.4,5.6 L6.4,11.8 A1.9,0.9 0 0,0 10.2,11.8 L10.2,5.6 Z" fill={`url(#${uid}-pk-cyl)`} stroke="#262626" strokeWidth="0.9" />
            <ellipse cx="8.3" cy="5.6" rx="1.9" ry="0.9" fill="#c4dcff" stroke="#262626" strokeWidth="0.9" />
            <polygon points="14,4.6 11.2,12.4 14.2,13.4" fill="#ffe47a" stroke="#262626" strokeWidth="0.9" />
            <polygon points="14,4.6 14.2,13.4 16.8,12" fill="#d49a18" stroke="#262626" strokeWidth="0.9" />
          </g>
        </OpenSuitcase>
      </>
    ),
  },
  {
    id: 'sop.packfolder',
    label: 'Pack Folder',
    family: 'sop',
    description:
      'Open lavender-trimmed white folder with a warm orange-red arrow pointing inside and a blue mannequin standing in front.',
    types: ['packfolder'],
    icons: ['sop_packfolder'],
    refKey: 'SOP_packfolder',
    render: () => (
      <>
        <path
          d={FOLDER_BACK_PATH}
          fill="#c084d8"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polygon
          points={FOLDER_ARROW_POINTS}
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points={FOLDER_SHEET_POINTS}
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <KinefxMannequinBase cx={16.6} cy={15.2} scale={0.62} />
      </>
    ),
  },
  {
    id: 'sop.packinject',
    label: 'Pack Inject',
    family: 'sop',
    description:
      'Grey packed tray whose recessed top holds a grid of blue, white and purple cells, with a dark boot at the upper left kicking a green curved arrow into a bright green cell, and a yellow tile at the upper right.',
    types: ['packinject'],
    icons: ['sop_packinject'],
    refKey: 'SOP_packinject',
    render: (uid) => {
      const inner: [Pt, Pt, Pt, Pt] = [
        [4.7, 13.45],
        [12, 9.8],
        [19.3, 13.45],
        [12, 17.1],
      ];
      const colors = ['#eef2f7', '#8fc2ff', '#c084d8', '#8fc2ff', '#58c848', '#eef2f7', '#c084d8', '#eef2f7', '#8fc2ff'];
      const cells = colors.map((fill, k) => {
        const i = k % 3;
        const j = Math.floor(k / 3);
        const g = 0.06;
        const quad: Pt[] = [
          quadPt(inner, i / 3 + g, j / 3 + g),
          quadPt(inner, (i + 1) / 3 - g, j / 3 + g),
          quadPt(inner, (i + 1) / 3 - g, (j + 1) / 3 - g),
          quadPt(inner, i / 3 + g, (j + 1) / 3 - g),
        ];
        return <polygon key={k} points={pts(quad)} fill={fill} stroke="#262626" strokeWidth="0.45" strokeLinejoin="round" />;
      });
      return (
        <>
          <PackedTray uid={uid} name="pi" cx={12} cy={13.2} w={9.6}>
            {cells}
          </PackedTray>
          {/* Yellow tile lifted out at the upper right */}
          <g strokeLinejoin="round">
            <polygon points="15,6.6 18.4,8.3 18.4,9.1 15,7.4" fill="#f2c438" stroke="#262626" strokeWidth="0.7" />
            <polygon points="18.4,8.3 21.8,6.6 21.8,7.4 18.4,9.1" fill="#d49a18" stroke="#262626" strokeWidth="0.7" />
            <polygon points="15,6.6 18.4,4.9 21.8,6.6 18.4,8.3" fill="#ffe47a" stroke="#262626" strokeWidth="0.85" />
          </g>
          {/* Dark boot */}
          <path
            d="M2.6,1.8 L6.4,1.8 L6.4,5.6 L9.2,6.4 Q10,6.8 9.8,7.6 L9.6,8.2 L2.4,8.2 Z"
            fill="#5a616b"
            stroke="#262626"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path d="M2.9,3 H6.1" stroke="#89929e" strokeWidth="0.8" />
          {/* Green injection arrow */}
          <path d="M8,3.6 C11.2,3 12.6,5.2 12.6,8" fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
          <path d="M8,3.6 C11.2,3 12.6,5.2 12.6,8" fill="none" stroke="#58c848" strokeWidth="1.6" strokeLinecap="round" />
          <polygon points="10.4,7.6 14.8,7.6 12.6,11.4" fill="#58c848" stroke="#262626" strokeWidth="0.85" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'sop.packpoints',
    label: 'Pack Points',
    family: 'sop',
    description:
      'Open brown and gold suitcase seen from the front (lid leaning back on its hinge, silver handle below the front) packed with glossy silver point spheres.',
    types: ['packpoints'],
    icons: ['sop_packpoints'],
    refKey: 'SOP_packpoints',
    render: (uid) => {
      const spots: [number, number][] = [
        [0.78, 0.25],
        [0.78, 0.5],
        [0.78, 0.75],
        [0.22, 0.13],
        [0.22, 0.38],
        [0.22, 0.63],
        [0.22, 0.88],
      ];
      return (
        <>
          <defs>
            <radialGradient id={`${uid}-pp-ball`} cx="35%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#b4bcc8" />
              <stop offset="100%" stopColor="#5a616b" />
            </radialGradient>
          </defs>
          <OpenSuitcase uid={uid}>
            <g fill={`url(#${uid}-pp-ball)`} stroke="#262626" strokeWidth="0.75">
              {spots.map(([u, v]) => {
                const [x, y] = quadPt(SUITCASE_FLOOR, u, v);
                return <circle key={`${u}-${v}`} cx={x} cy={y - 1.6} r="1.9" />;
              })}
            </g>
          </OpenSuitcase>
        </>
      );
    },
  },
  {
    id: 'sop.packeddiskedit',
    label: 'Packed Disk Properties',
    family: 'sop',
    description:
      'Two grey packed disk trays side by side (dark recessed tops, vented fronts) with a metallic settings gear in the lower right foreground.',
    types: ['packeddiskedit'],
    icons: ['sop_packeddiskedit'],
    refKey: 'SOP_packeddiskedit',
    render: (uid) => (
      <>
        <PackedTray uid={uid} name="a" cx={8.4} cy={5.6} w={6.6} />
        <PackedTray uid={uid} name="b" cx={15} cy={8.9} w={6.6} />
        <MetallicGear uid={uid} cx={16.6} cy={17} r={5.2} />
      </>
    ),
  },
];
