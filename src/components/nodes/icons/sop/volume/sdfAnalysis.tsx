import { roundedRectPath } from '../../geoHelpers';
import type { OperatorIconDef } from '../../iconTypes';
import { cloudPuffPath, VOLUME_CLOUD_PATH, VolumeCloud } from '../kits/volume';

/**
 * Volume SDF and analysis.
 */

const OUTLINE = '#262626';

/**
 * Volume SDF, surface and analysis operators.
 */
export const VOLUME_SDF_ANALYSIS_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.volumesdf',
    label: 'Volume SDF',
    family: 'sop',
    description: 'White volume cloud with a blue inner signed-distance shell contour.',
    types: ['volumesdf'],
    icons: ['sop_volumesdf'],
    refKey: 'SOP_volumesdf',
    render: () => (
      <VolumeCloud cx={12} cy={12} scale={1.04} creases={false}>
        <path
          d={VOLUME_CLOUD_PATH}
          transform="translate(12 12) scale(0.72) translate(-12 -12)"
          fill="#eef2f7"
          stroke="#3672c4"
          strokeWidth="1.45"
          strokeLinejoin="round"
        />
        <path
          d="M9.4,10.8 A2.2,2.2 0 0,1 13.0,9.8 M10.2,14.8 A2.4,2.0 0 0,0 14.4,14.2"
          fill="none"
          stroke="#5aa2f2"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
      </VolumeCloud>
    ),
  },
  {
    id: 'sop.volumesurface',
    label: 'Volume Surface',
    family: 'sop',
    description:
      'Cloud split vertically into a soft light-blue volume on the left and a solid green sculpted surface on the right.',
    types: ['volumesurface'],
    icons: ['sop_volumesurface'],
    refKey: 'SOP_volumesurface',
    render: () => (
      <g stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round">
        <path d="M12,6.4 A4,4 0 0,0 6.5,10.4 A3.2,3.2 0 0,0 4.5,16.6 H12 Z" fill="#8fc2ff" />
        <path
          d="M12,6.4 C15,5.9 16.5,8.4 15,10.4 C18,10.4 19,13 17,14.2 C19.5,14.5 20,16.6 17.5,16.6 H12 Z"
          fill="#58c848"
        />
        <line x1="12" y1="5.4" x2="12" y2="17.6" strokeWidth="1.1" />
      </g>
    ),
  },
  {
    id: 'sop.volumeslice',
    label: 'Volume Slice',
    family: 'sop',
    description: 'Smaller white volume cloud sliced horizontally by a wide dark isometric plane with a white border.',
    types: ['volumeslice'],
    icons: ['sop_volumeslice'],
    refKey: 'SOP_volumeslice',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-slice-top`}>
            <rect x="2" y="2" width="20" height="10.0" />
          </clipPath>
          <clipPath id={`${uid}-slice-bot`}>
            <rect x="2" y="13.8" width="20" height="8" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-slice-bot)`}>
          <VolumeCloud cx={12} cy={12} scale={0.78} fill="#c0c7d1" />
        </g>
        <polygon
          points="5.0,8.8 19.0,8.8 21.8,15.2 2.2,15.2"
          fill="#3a3f47"
          stroke="#eef2f7"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <polygon
          points="5.0,8.8 19.0,8.8 21.8,15.2 2.2,15.2"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <ellipse cx="12" cy="12.0" rx="4.8" ry="1.6" fill="#c0c7d1" stroke="#eef2f7" strokeWidth="0.8" />
        <g clipPath={`url(#${uid}-slice-top)`}>
          <VolumeCloud cx={12} cy={12} scale={0.78} fillOpacity={0.88} />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumevisualization',
    label: 'Volume Visualization',
    family: 'sop',
    description:
      'White volume cloud behind a rounded monitor screen showing a glowing green x-ray outline of the hidden cloud lobes.',
    types: ['volumevisualization'],
    icons: ['sop_volumevisualization'],
    refKey: 'SOP_volumevisualization',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-vis-screen`}>
            <path d={roundedRectPath(9.0, 6.8, 10.2, 9.4, 1.6)} />
          </clipPath>
        </defs>
        <VolumeCloud cx={11.0} cy={11.8} scale={0.86} />
        <path d={roundedRectPath(7.6, 5.4, 13.0, 12.2, 2.6)} fill="#eef2f7" stroke={OUTLINE} strokeWidth="1.05" />
        <path d={roundedRectPath(9.0, 6.8, 10.2, 9.4, 1.6)} fill="#2e3338" stroke={OUTLINE} strokeWidth="0.85" />
        <g clipPath={`url(#${uid}-vis-screen)`}>
          <path
            d={VOLUME_CLOUD_PATH}
            transform="translate(11.0 11.8) scale(0.86) translate(-12 -12)"
            fill="#58c848"
            fillOpacity="0.22"
            stroke="#52d638"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumeanalysis',
    label: 'Volume Analysis',
    family: 'sop',
    description: 'White volume cloud with a grey pocket calculator featuring a green screen at bottom right.',
    types: ['volumeanalysis'],
    icons: ['sop_volumeanalysis'],
    refKey: 'SOP_volumeanalysis',
    render: () => (
      <>
        <VolumeCloud cx={10.2} cy={10.2} scale={0.82} />
        <g stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round">
          <rect x="11.6" y="10.2" width="8.6" height="10.8" rx="1.1" fill="#eef2f7" />
          <rect x="12.8" y="11.4" width="6.2" height="2.4" rx="0.4" fill="#58c848" strokeWidth="0.7" />
          <rect x="12.8" y="14.8" width="1.6" height="1.5" fill="#89929e" strokeWidth="0.6" />
          <rect x="15.1" y="14.8" width="1.6" height="1.5" fill="#89929e" strokeWidth="0.6" />
          <rect x="17.4" y="14.8" width="1.6" height="1.5" fill="#89929e" strokeWidth="0.6" />
          <rect x="12.8" y="17.2" width="1.6" height="1.5" fill="#89929e" strokeWidth="0.6" />
          <rect x="15.1" y="17.2" width="1.6" height="1.5" fill="#89929e" strokeWidth="0.6" />
          <rect x="17.4" y="17.2" width="1.6" height="1.5" fill="#89929e" strokeWidth="0.6" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumearrivaltime',
    label: 'Volume Arrival Time',
    family: 'sop',
    description: 'White volume cloud with an analog clock face at bottom right.',
    types: ['volumearrivaltime'],
    icons: ['sop_volumearrivaltime'],
    refKey: 'SOP_volumearrivaltime',
    render: () => (
      <>
        <VolumeCloud cx={10.2} cy={10.2} scale={0.82} />
        <circle cx="15.6" cy="15.6" r="5.0" fill="#89929e" stroke={OUTLINE} strokeWidth="1.0" />
        <circle cx="15.6" cy="15.6" r="3.7" fill="#ffffff" stroke={OUTLINE} strokeWidth="0.7" />
        <polyline
          points="15.6,13.0 15.6,15.6 17.6,16.8"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.volumeambientocclusion',
    label: 'Volume Ambient Occlusion',
    family: 'sop',
    description: 'Cool light-blue volume cloud with deep blue-grey ambient occlusion shading between its puffs.',
    types: ['volumeambientocclusion'],
    icons: ['sop_volumeambientocclusion'],
    refKey: 'SOP_volumeambientocclusion',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ao`} cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="58%" stopColor="#8fc2ff" />
            <stop offset="100%" stopColor="#3672c4" />
          </radialGradient>
        </defs>
        <VolumeCloud cx={12} cy={12} scale={1.04} fill={`url(#${uid}-ao)`} creaseColor="#3672c4" />
      </>
    ),
  },
  {
    id: 'sop.volumebreak',
    label: 'Volume Break',
    family: 'sop',
    description:
      'Translucent blue sphere intersecting an angled orange quad, with a dashed black corner completing the hidden edges behind the sphere.',
    types: ['volumebreak'],
    icons: ['sop_volumebreak'],
    refKey: 'SOP_volumebreak',
    render: () => (
      <>
        <circle cx="13.8" cy="13.2" r="6.0" fill="#eef2f7" fillOpacity="0.28" stroke={OUTLINE} strokeWidth="1.05" />
        <circle cx="13.8" cy="13.2" r="5.2" fill="#8fc2ff" fillOpacity="0.34" stroke="#3672c4" strokeWidth="0.8" />
        {/* Large orange plane cut by the blue sphere */}
        <path
          d="M2.2,14.8 L6.2,6.4 L21.4,9.8 L19.73,12.27 A6.0,6.0 0 0,0 8.42,15.85 Z"
          fill="#ee8624"
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Dotted black corner collinear with the plane edges behind the sphere */}
        <polyline
          points="8.42,15.85 16.4,17.2 19.73,12.27"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeDasharray="1.4 1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.isooffset',
    label: 'IsoOffset',
    family: 'sop',
    description: 'Side-view grey steam locomotive surrounded by a light-blue offset aura contour.',
    types: ['isooffset'],
    icons: ['sop_isooffset'],
    refKey: 'SOP_isooffset',
    render: () => (
      <>
        {/* Light-blue offset aura */}
        <path
          d="M2.6,17.2 V6.2 H9.2 V9.6 H13.6 V6.6 H17.4 V9.6 H19.6 L21.4,17.2 Z"
          fill="#8fc2ff"
          stroke="#3672c4"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        {/* Side-view grey locomotive */}
        <g stroke={OUTLINE} strokeWidth="0.85" strokeLinejoin="round">
          <rect x="4.0" y="7.6" width="4.4" height="7.4" fill="#c0c7d1" />
          <rect x="3.4" y="6.8" width="5.6" height="1.2" fill="#eef2f7" />
          <rect x="5.0" y="8.8" width="2.4" height="2.2" fill="#5a616b" />
          <rect x="8.4" y="10.4" width="9.2" height="4.6" fill="#eef2f7" />
          <rect x="14.2" y="7.4" width="2.0" height="3.0" fill="#89929e" />
          <polygon points="17.6,15.0 19.8,15.6 17.6,16.2" fill="#89929e" />
          <circle cx="6.2" cy="15.8" r="1.5" fill="#5a616b" />
          <circle cx="11.2" cy="15.8" r="1.5" fill="#5a616b" />
          <circle cx="15.4" cy="15.8" r="1.5" fill="#5a616b" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumevop',
    label: 'Volume VOP',
    family: 'sop',
    description:
      'V-shaped white cloud formation made of merged puffs with soft grey shading inside and a single outer dark outline.',
    types: ['volumevop'],
    icons: ['sop_volumevop'],
    refKey: 'SOP_volumevop',
    render: (uid) => {
      const ptsV: readonly [number, number, number][] = [
        [5.2, 6.2, 2.1],
        [6.8, 9.6, 2.0],
        [8.6, 13.0, 2.0],
        [10.2, 16.4, 2.1],
        [12.0, 18.6, 2.3],
        [13.8, 16.4, 2.1],
        [15.4, 13.0, 2.0],
        [17.2, 9.6, 2.0],
        [18.8, 6.2, 2.1],
      ];
      const gradId = `${uid}-vop-puff`;
      return (
        <>
          <defs>
            <radialGradient id={gradId} cx="35%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="52%" stopColor="#f2f4f7" />
              <stop offset="100%" stopColor="#b0b8c4" />
            </radialGradient>
          </defs>
          <g fill={OUTLINE} stroke={OUTLINE} strokeWidth="1.6" strokeLinejoin="round">
            {ptsV.map(([cx, cy, r], idx) => (
              <path key={`o-${idx}`} d={cloudPuffPath(cx, cy, r)} />
            ))}
          </g>
          <g fill={`url(#${gradId})`} stroke="none">
            {ptsV.map(([cx, cy, r], idx) => (
              <path key={`f-${idx}`} d={cloudPuffPath(cx, cy, r)} />
            ))}
          </g>
        </>
      );
    },
  },
];
