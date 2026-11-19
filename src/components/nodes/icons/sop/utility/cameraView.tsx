import { type Pt, pts } from '../../geoHelpers';
import type { OperatorIconDef } from '../../iconTypes';

const OUTLINE = '#262626';

/** 4x4 curved surface grid for Visualize Properties. */
const VIZ_GRID: readonly (readonly Pt[])[] = [
  [
    [4.2, 9.6],
    [9.2, 5.4],
    [15.0, 5.0],
    [20.2, 7.8],
  ],
  [
    [3.2, 12.0],
    [8.6, 8.2],
    [14.8, 8.0],
    [21.0, 10.6],
  ],
  [
    [2.6, 14.6],
    [8.4, 11.8],
    [14.6, 11.8],
    [21.2, 13.8],
  ],
  [
    [3.8, 17.0],
    [9.0, 16.0],
    [14.6, 16.8],
    [19.6, 17.8],
  ],
];

const vizOutline = (): string => {
  const top = VIZ_GRID[0];
  const right = VIZ_GRID.map((row) => row[3]);
  const bottom = [...VIZ_GRID[3]].reverse();
  const left = [...VIZ_GRID.map((row) => row[0])].reverse();
  return `M${pts([...top, ...right.slice(1), ...bottom.slice(1), ...left.slice(1)]).replace(/ /g, ' L')} Z`;
};

const vizInteriorLines = (): string => {
  const parts: string[] = [];
  for (let r = 1; r <= 2; r += 1) {
    parts.push(`M${pts(VIZ_GRID[r]).replace(/ /g, ' L')}`);
  }
  for (let c = 1; c <= 2; c += 1) {
    parts.push(`M${pts(VIZ_GRID.map((row) => row[c])).replace(/ /g, ' L')}`);
  }
  return parts.join(' ');
};

/**
 * Camera and viewport display operators.
 */
export const CAMERA_VIEW_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.cameraedit',
    label: 'Camera Edit',
    family: 'sop',
    description: 'Dark grey movie camera with twin film reels and a toothed metallic gear in the bottom-right corner.',
    types: ['cameraedit'],
    icons: ['sop_cameraedit'],
    refKey: 'SOP_cameraedit',
    render: () => (
      <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
        <rect x="6.2" y="8.8" width="8.8" height="6.5" rx="1" fill="#5a616b" />
        <polygon points="15,10.2 19.8,8 19.8,15.2 15,13.5" fill="#89929e" />
        <circle cx="8" cy="6.2" r="3.6" fill="#89929e" />
        <circle cx="8" cy="6.2" r="1.2" fill="#3a3f47" />
        <circle cx="5.5" cy="12" r="3.6" fill="#89929e" />
        <circle cx="5.5" cy="12" r="1.2" fill="#3a3f47" />
        <polygon
          points="15.4,11.2 17.2,11.2 17.5,12.6 18.7,13.1 19.8,12.2 21,13.4 20.1,14.5 20.6,15.7 22,16 22,17.8 20.6,18.1 20.1,19.3 21,20.4 19.8,21.6 18.7,20.7 17.5,21.2 17.2,22.5 15.4,22.5 15.1,21.2 13.9,20.7 12.8,21.6 11.6,20.4 12.5,19.3 12,18.1 10.6,17.8 10.6,16 12,15.7 12.5,14.5 11.6,13.4 12.8,12.2 13.9,13.1 15.1,12.6"
          fill="#eef2f7"
        />
        <circle cx="16.3" cy="16.9" r="1.8" fill="#3a3f47" />
      </g>
    ),
  },
  {
    id: 'sop.camerafrompoints',
    label: 'Camera from Points',
    family: 'sop',
    description: 'Orange frustum cone emanating from an orange point at the top-left toward a dark grey film camera.',
    types: ['camerafrompoints'],
    icons: ['sop_camerafrompoints'],
    refKey: 'SOP_camerafrompoints',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="4.5,5.5 16.5,11 9.5,19" fill="#ffb066" fillOpacity="0.65" stroke="#ee8624" />
        <circle cx="4.5" cy="5.5" r="1.8" fill="#ee8624" />
        <rect x="11" y="12" width="7.5" height="5.5" rx="0.8" fill="#5a616b" />
        <polygon points="18.5,13 21.5,11.5 21.5,17 18.5,15.8" fill="#89929e" />
        <circle cx="12.5" cy="9.8" r="2.8" fill="#89929e" />
        <circle cx="10.8" cy="14.5" r="2.8" fill="#89929e" />
      </g>
    ),
  },
  {
    id: 'sop.cameratopoints',
    label: 'Camera to Points',
    family: 'sop',
    description: 'Dark grey film camera projecting an orange frustum cone down-right to an orange point.',
    types: ['cameratopoints'],
    icons: ['sop_cameratopoints'],
    refKey: 'SOP_cameratopoints',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="19.5,18.5 7.5,16 14.5,8" fill="#ffb066" fillOpacity="0.65" stroke="#ee8624" />
        <circle cx="19.5" cy="18.5" r="1.8" fill="#ee8624" />
        <rect x="6.5" y="9" width="7.5" height="5.5" rx="0.8" fill="#5a616b" />
        <polygon points="14,10 17,8.5 17,14 14,12.8" fill="#89929e" />
        <circle cx="8" cy="6.8" r="2.8" fill="#89929e" />
        <circle cx="6.2" cy="11.5" r="2.8" fill="#89929e" />
      </g>
    ),
  },
  {
    id: 'sop.visualize',
    label: 'Visualize Properties',
    family: 'sop',
    description:
      'Undulating 3D surface patch shaded with a radial rainbow heatmap (yellow-green center, light-blue flanks, warm red rim) and dark wireframe grid lines.',
    types: ['visualize'],
    icons: ['sop_visualize'],
    refKey: 'SOP_visualize',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-viz-grad`} cx="45%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#f2c438" />
            <stop offset="35%" stopColor="#58c848" />
            <stop offset="68%" stopColor="#5aa2f2" />
            <stop offset="100%" stopColor="#ff7066" />
          </radialGradient>
        </defs>
        <path
          d={vizOutline()}
          fill={`url(#${uid}-viz-grad)`}
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path d={vizInteriorLines()} fill="none" stroke={OUTLINE} strokeWidth="0.65" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.visibility',
    label: 'Visibility',
    family: 'sop',
    description: 'Open white eye with a green iris, dark pupil, white highlight dot, and bold upper eyelid.',
    types: ['visibility'],
    icons: ['sop_visibility'],
    refKey: 'SOP_visibility',
    render: () => (
      <>
        <path
          d="M2.6,12 C6.2,6.2 17.8,6.2 21.4,12 C17.8,17.8 6.2,17.8 2.6,12 Z"
          fill="#ffffff"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="4.1" fill="#58c848" stroke={OUTLINE} strokeWidth="0.9" />
        <circle cx="12" cy="12" r="1.9" fill={OUTLINE} />
        <circle cx="10.6" cy="10.5" r="0.9" fill="#ffffff" />
        <path
          d="M2.6,12 C6.2,6.2 17.8,6.2 21.4,12"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
];
