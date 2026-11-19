import { arrowHead, isoBoxFaces, type Pt, pts } from '../../geoHelpers';
import { CasedStroke, ShadedSphere, SPHERE_TONES } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { RoundGlyphBadge } from '../kits/dopLop';
import { FogCloud, FogPeaks, IsoWireCube, VOLUME_CLOUD_PATH, VolumeCloud } from '../kits/volume';

/**
 * Volume filters.
 */

const OUTLINE = '#262626';

/**
 * Volume noise and filter operators.
 */
export const VOLUME_FILTER_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.volumenoisefog',
    label: 'Volume Noise Fog',
    family: 'sop',
    description:
      'Blue cube, cone and sphere partially visible behind a translucent blue fog cloud with four randomly oriented blue arrows at bottom right.',
    types: ['volumenoisefog'],
    icons: ['sop_volumenoisefog'],
    refKey: 'SOP_volumenoisefog',
    render: (uid) => {
      const dirs: readonly [Pt, Pt][] = [
        [
          [14.2, 15.8],
          [10.4, 14.4],
        ],
        [
          [15.8, 15.0],
          [19.8, 12.8],
        ],
        [
          [13.8, 17.6],
          [11.6, 20.8],
        ],
        [
          [20.2, 18.8],
          [16.4, 18.8],
        ],
      ];
      return (
        <>
          <FogPeaks yOffset={-0.6} />
          <circle cx="17.0" cy="10.2" r="2.1" fill="#5aa2f2" stroke={OUTLINE} strokeWidth="0.85" />
          <FogCloud
            uid={uid}
            cx={10.2}
            cy={12.0}
            scale={0.82}
            leftColor="#5aa2f2"
            rightColor="#c0c7d1"
            fillOpacity={0.72}
          />
          {dirs.map(([from, tip], idx) => {
            const tri = arrowHead(tip, from, 2.7, 2.0);
            const shaftEnd: Pt = [(tri[1][0] + tri[2][0]) / 2, (tri[1][1] + tri[2][1]) / 2];
            return (
              <g key={idx}>
                <CasedStroke d={`M${pts([from])} L${pts([shaftEnd])}`} color="#5aa2f2" width={1.25} linecap="round" />
                <polygon points={pts(tri)} fill="#8fc2ff" stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />
              </g>
            );
          })}
        </>
      );
    },
  },
  {
    id: 'sop.volumenoisesdf',
    label: 'Volume Noise SDF',
    family: 'sop',
    description: 'Amber-orange shaded sphere with a bright yellow left slice crescent and scattered noise speckles.',
    types: ['volumenoisesdf'],
    icons: ['sop_volumenoisesdf'],
    refKey: 'SOP_volumenoisesdf',
    render: (uid) => (
      <>
        <ShadedSphere id={`${uid}-nsdf`} cx={12} cy={12} r={8.6} tones={SPHERE_TONES.orange} strokeWidth={1.1} />
        <path
          d="M8.4,4.2 A8.6,8.6 0 0,0 8.4,19.8 A5.2,9.2 0 0,1 8.4,4.2 Z"
          fill="#ffe47a"
          stroke={OUTLINE}
          strokeWidth="0.85"
        />
        <g fill="#ffe47a">
          <circle cx="13.2" cy="6.6" r="0.6" />
          <circle cx="15.8" cy="7.8" r="0.45" />
          <circle cx="12.0" cy="9.2" r="0.5" />
          <circle cx="17.2" cy="10.4" r="0.7" />
          <circle cx="14.4" cy="11.8" r="0.55" />
          <circle cx="11.6" cy="13.6" r="0.65" />
          <circle cx="16.4" cy="14.2" r="0.5" />
          <circle cx="13.8" cy="16.4" r="0.7" />
          <circle cx="17.8" cy="12.6" r="0.45" />
        </g>
        <g fill="#a81f18">
          <circle cx="14.8" cy="8.6" r="0.5" />
          <circle cx="12.8" cy="12.0" r="0.45" />
          <circle cx="15.6" cy="15.8" r="0.55" />
          <circle cx="11.2" cy="16.2" r="0.45" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumenoisevector',
    label: 'Volume Noise Vector',
    family: 'sop',
    description: 'Many small randomly oriented green vector arrows enclosed inside a translucent white isometric cube.',
    types: ['volumenoisevector'],
    icons: ['sop_volumenoisevector'],
    refKey: 'SOP_volumenoisevector',
    render: () => {
      const { top, left, right } = isoBoxFaces(12, 7.0, 6.8, 7.8);
      const backD = `M${pts([top[0], top[1]])} M${pts([left[1], left[2], right[2]])}`;
      const arrows: readonly [Pt, Pt][] = [
        [
          [11.8, 8.6],
          [14.0, 9.8],
        ],
        [
          [9.8, 10.8],
          [7.6, 9.6],
        ],
        [
          [8.2, 13.4],
          [10.6, 12.6],
        ],
        [
          [15.8, 12.2],
          [13.4, 13.4],
        ],
        [
          [11.2, 14.6],
          [13.2, 16.0],
        ],
        [
          [7.6, 16.0],
          [9.6, 17.4],
        ],
        [
          [16.2, 16.4],
          [13.8, 15.4],
        ],
        [
          [11.8, 18.4],
          [11.6, 15.8],
        ],
        [
          [13.8, 10.2],
          [15.4, 11.4],
        ],
      ];
      return (
        <>
          <CasedStroke d={backD} color="#c0c7d1" width={0.7} casing={1.4} />
          {arrows.map(([from, tip], idx) => {
            const tri = arrowHead(tip, from, 1.7, 1.25);
            const shaftEnd: Pt = [(tri[1][0] + tri[2][0]) / 2, (tri[1][1] + tri[2][1]) / 2];
            return (
              <g key={idx}>
                <path
                  d={`M${pts([from])} L${pts([shaftEnd])}`}
                  stroke="#52d638"
                  strokeWidth="0.85"
                  strokeLinecap="round"
                />
                <polygon points={pts(tri)} fill="#52d638" stroke={OUTLINE} strokeWidth="0.6" strokeLinejoin="round" />
              </g>
            );
          })}
          {/* Translucent cube in front of the arrows */}
          <g stroke="none">
            <polygon points={pts(top)} fill="#eef2f7" fillOpacity="0.28" />
            <polygon points={pts(left)} fill="#c0c7d1" fillOpacity="0.24" />
            <polygon points={pts(right)} fill="#89929e" fillOpacity="0.24" />
          </g>
          <IsoWireCube cx={12} cy={7.0} rx={6.8} h={7.8} color="#eef2f7" width={1.05} edgeOpacity={0.72} />
        </>
      );
    },
  },
  {
    id: 'sop.volumeadjustfog',
    label: 'Volume Adjust Fog',
    family: 'sop',
    description:
      'Blue geometric cube, cone and sphere partially visible behind a translucent billowing blue fog cloud.',
    types: ['volumeadjustfog'],
    icons: ['sop_volumeadjustfog'],
    refKey: 'SOP_volumeadjustfog',
    render: (uid) => (
      <>
        <FogPeaks yOffset={0.2} />
        <circle cx="17.2" cy="11.6" r="2.2" fill="#5aa2f2" stroke={OUTLINE} strokeWidth="0.85" />
        <FogCloud
          uid={uid}
          cx={12}
          cy={14.4}
          scale={0.98}
          leftColor="#5aa2f2"
          rightColor="#8fc2ff"
          fillOpacity={0.72}
        />
      </>
    ),
  },
  {
    id: 'sop.volumefeather',
    label: 'Volume Feather',
    family: 'sop',
    description: 'White volume cloud surrounded by a soft grey outer halo without a dashed border.',
    types: ['volumefeather'],
    icons: ['sop_volumefeather'],
    refKey: 'SOP_volumefeather',
    render: () => (
      <>
        <path
          d={VOLUME_CLOUD_PATH}
          transform="translate(12 12) scale(1.04) translate(-12 -12)"
          fill="#c0c7d1"
          fillOpacity="0.65"
          stroke="#89929e"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <VolumeCloud cx={12} cy={12} scale={0.76} />
      </>
    ),
  },
  {
    id: 'sop.volumeblur',
    label: 'Volume Blur',
    family: 'sop',
    description: 'Softened volume cloud with a soft grey outer halo and no outer black outline.',
    types: ['volumeblur'],
    icons: ['sop_volumeblur'],
    refKey: 'SOP_volumeblur',
    render: () => (
      <>
        <path
          d={VOLUME_CLOUD_PATH}
          transform="translate(12 12) scale(1.06) translate(-12 -12)"
          fill="#89929e"
          fillOpacity="0.45"
          stroke="none"
        />
        <VolumeCloud cx={12} cy={12} scale={0.82} fill="#eef2f7" creaseColor="#3a3f47" strokeWidth={1.2} />
      </>
    ),
  },
  {
    id: 'sop.volumeconvolve3',
    label: 'Volume Convolve 3x3x3',
    family: 'sop',
    description: 'White volume cloud at upper left overlapped by a 3x3x3 green wireframe kernel cube at bottom right.',
    types: ['volumeconvolve3'],
    icons: ['sop_volumeconvolve3'],
    refKey: 'SOP_volumeconvolve3',
    render: () => {
      const { top, left, right } = isoBoxFaces(14.8, 10.6, 5.2, 5.8);
      const grid = [
        // 3x3 subdivisions on top, left, right
        `M${pts([top[0], top[1], top[2], top[3]])} Z`,
        `M${pts([left[1], left[2], right[2], right[1]])}`,
        `M${pts([left[0], left[3], left[2]])}`,
      ].join(' ');
      const t1x = (top[0][0] * 2 + top[1][0]) / 3;
      const t1y = (top[0][1] * 2 + top[1][1]) / 3;
      const t2x = (top[0][0] + top[1][0] * 2) / 3;
      const t2y = (top[0][1] + top[1][1] * 2) / 3;
      const dx1 = top[3][0] - top[0][0];
      const dy1 = top[3][1] - top[0][1];
      const dx2 = top[1][0] - top[0][0];
      const dy2 = top[1][1] - top[0][1];
      const subD = [
        grid,
        `M${t1x.toFixed(1)},${t1y.toFixed(1)} l${dx1.toFixed(1)},${dy1.toFixed(1)} v5.8`,
        `M${t2x.toFixed(1)},${t2y.toFixed(1)} l${dx1.toFixed(1)},${dy1.toFixed(1)} v5.8`,
        `M${(top[0][0] + dx1 / 3).toFixed(1)},${(top[0][1] + dy1 / 3).toFixed(1)} l${dx2.toFixed(1)},${dy2.toFixed(1)} v5.8`,
        `M${(top[0][0] + (dx1 * 2) / 3).toFixed(1)},${(top[0][1] + (dy1 * 2) / 3).toFixed(1)} l${dx2.toFixed(1)},${dy2.toFixed(1)} v5.8`,
        `M${left[0][0].toFixed(1)},${(left[0][1] + 1.9).toFixed(1)} L${left[1][0].toFixed(1)},${(left[1][1] + 1.9).toFixed(1)} L${right[1][0].toFixed(1)},${(right[1][1] + 1.9).toFixed(1)}`,
        `M${left[0][0].toFixed(1)},${(left[0][1] + 3.8).toFixed(1)} L${left[1][0].toFixed(1)},${(left[1][1] + 3.8).toFixed(1)} L${right[1][0].toFixed(1)},${(right[1][1] + 3.8).toFixed(1)}`,
      ].join(' ');

      return (
        <>
          <VolumeCloud cx={9.8} cy={9.6} scale={0.78} />
          <CasedStroke d={subD} color="#58c848" width={0.75} casing={1.5} />
        </>
      );
    },
  },
  {
    id: 'sop.volumefft',
    label: 'Volume FFT',
    family: 'sop',
    description: 'White volume cloud overlaid by a cased light-blue sinusoidal frequency wave.',
    types: ['volumefft'],
    icons: ['sop_volumefft'],
    refKey: 'SOP_volumefft',
    render: () => (
      <>
        <VolumeCloud cx={12} cy={11.0} scale={0.94} />
        <line x1="3.4" y1="15.0" x2="20.6" y2="15.0" stroke={OUTLINE} strokeWidth="0.75" />
        <CasedStroke
          d="M3.6,15.0 C5.0,15.0 5.4,10.2 6.8,10.2 C8.2,10.2 8.4,19.2 9.8,19.2 C11.2,19.2 11.4,7.6 12.8,7.6 C14.2,7.6 14.4,18.8 15.8,18.8 C17.2,18.8 17.6,13.0 19.0,13.0 C19.8,13.0 20.2,15.0 20.6,15.0"
          color="#5aa2f2"
          width={1.25}
        />
      </>
    ),
  },
  {
    id: 'sop.volumenormalize',
    label: 'Volume Normalize Weights',
    family: 'sop',
    description: 'Billowing fog cloud at top with a dark circular 1.0 badge at the bottom.',
    types: ['volumenormalize'],
    icons: ['sop_volumenormalize'],
    refKey: 'SOP_volumenormalize',
    render: (uid) => (
      <>
        <FogCloud uid={uid} cx={12} cy={9.2} scale={0.88} leftColor="#5aa2f2" rightColor="#ffb066" />
        <RoundGlyphBadge cx={12} cy={16.5} r={4.6}>
          <text
            x="12"
            y="18.3"
            textAnchor="middle"
            fontSize="5.4"
            fontWeight="800"
            fontFamily="sans-serif"
            fill="#ffffff"
          >
            1.0
          </text>
        </RoundGlyphBadge>
      </>
    ),
  },
  {
    id: 'sop.volumeramp',
    label: 'Volume Ramp',
    family: 'sop',
    description: 'Volume cloud split vertically: white on the left and blue-and-yellow color-ramped on the right.',
    types: ['volumeramp'],
    icons: ['sop_volumeramp'],
    refKey: 'SOP_volumeramp',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-ramp-right`}>
            <rect x="12" y="2" width="10" height="20" />
          </clipPath>
          <linearGradient id={`${uid}-ramp-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8fc2ff" />
            <stop offset="50%" stopColor="#ffe47a" />
            <stop offset="100%" stopColor="#5aa2f2" />
          </linearGradient>
        </defs>
        <VolumeCloud cx={12} cy={12} scale={1.04} />
        <g clipPath={`url(#${uid}-ramp-right)`}>
          <path
            d={VOLUME_CLOUD_PATH}
            transform="translate(12 12) scale(1.04) translate(-12 -12)"
            fill={`url(#${uid}-ramp-grad)`}
          />
        </g>
        <path
          d={VOLUME_CLOUD_PATH}
          transform="translate(12 12) scale(1.04) translate(-12 -12)"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <line x1="12" y1="4.4" x2="12" y2="19.6" stroke={OUTLINE} strokeWidth="0.95" />
      </>
    ),
  },
];
