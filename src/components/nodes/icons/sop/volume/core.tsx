import { arrowHead, isoBoxFaces, type Pt, pts, quadGridPath } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { FogCloud, IsoWireCube, VOLUME_CLOUD_PATH, VolumeCloud } from '../kits/volume';

/**
 * Volume core.
 */

const OUTLINE = '#262626';

/**
 * Volume core operators: create, combine, resample, convert and bake.
 */
export const VOLUME_CORE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.volume',
    label: 'Volume',
    family: 'sop',
    description: 'White cumulus volume cloud with soft grey inner puff creases and a dark outline.',
    types: ['volume'],
    icons: ['sop_volume'],
    refKey: 'SOP_volume',
    render: () => <VolumeCloud cx={12} cy={12} scale={1.06} />,
  },
  {
    id: 'sop.volumebound',
    label: 'Volume Bound',
    family: 'sop',
    description:
      'Small white volume cloud enclosed inside a slightly translucent white isometric bounding cube with three yellow ruler bars for length, width and height.',
    types: ['volumebound'],
    icons: ['sop_volumebound'],
    refKey: 'SOP_volumebound',
    render: () => {
      const { top, left, right } = isoBoxFaces(12, 6.2, 7.0, 7.8);
      const backD = `M${pts([top[0], top[1]])} M${pts([left[1], left[2], right[2]])}`;
      return (
        <>
          <CasedStroke d={backD} color="#c0c7d1" width={0.75} casing={1.55} />
          <VolumeCloud cx={12} cy={11.8} scale={0.64} />
          <g stroke="none">
            <polygon points={pts(top)} fill="#eef2f7" fillOpacity="0.24" />
            <polygon points={pts(left)} fill="#c0c7d1" fillOpacity="0.20" />
            <polygon points={pts(right)} fill="#89929e" fillOpacity="0.20" />
          </g>
          <IsoWireCube cx={12} cy={6.2} rx={7.0} h={7.8} color="#eef2f7" width={0.95} edgeOpacity={0.65} />
          {/* Three yellow dimension bars: bottom-left (length), bottom-right (width), right vertical (height) */}
          <g stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round">
            <polygon points="3.8,16.4 11.4,20.0 10.6,21.3 3.0,17.7" fill="#ffe47a" />
            <polygon points="12.6,20.0 20.0,16.4 20.8,17.7 13.4,21.3" fill="#f2c438" />
            <rect x="19.4" y="6.4" width="1.7" height="10.8" fill="#ffe47a" />
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.volumecombine',
    label: 'Volume Combine',
    family: 'sop',
    description: 'Billowing fog cloud blending cool light blue on the upper left with warm orange-coral on the right.',
    types: ['volumecombine'],
    icons: ['sop_volumecombine'],
    refKey: 'SOP_volumecombine',
    render: (uid) => <FogCloud uid={uid} cx={12} cy={12.6} scale={0.96} leftColor="#5aa2f2" rightColor="#ffb066" />,
  },
  {
    id: 'sop.volumecompress',
    label: 'Volume Compress',
    family: 'sop',
    description: 'White volume cloud cinched all the way around its waist by a yellow buckled belt.',
    types: ['volumecompress'],
    icons: ['sop_volumecompress'],
    refKey: 'SOP_volumecompress',
    render: () => (
      <>
        {/* Back wrap of the belt peeking out behind both sides */}
        <path
          d="M3.2,11.6 C3.2,10.2 5.2,9.8 6.4,10.2 L6.4,13.8 C4.6,14.2 3.2,13.2 3.2,11.6 Z M20.8,11.6 C20.8,10.2 18.8,9.8 17.6,10.2 L17.6,13.8 C19.4,14.2 20.8,13.2 20.8,11.6 Z"
          fill="#d49a18"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <VolumeCloud cx={12} cy={12} scale={0.98} />
        <g stroke={OUTLINE} strokeWidth="0.95" strokeLinejoin="round">
          <path d="M3.4,11.4 C7.2,13.4 16.8,13.4 20.6,11.4 L20.4,14.0 C16.6,15.8 7.4,15.8 3.6,14.0 Z" fill="#f2c438" />
          <rect x="9.9" y="12.0" width="4.2" height="3.2" rx="0.6" fill="#eef2f7" />
          <rect x="11.1" y="12.8" width="1.8" height="1.6" fill="#5a616b" strokeWidth="0.7" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumemix',
    label: 'Volume Mix',
    family: 'sop',
    description: 'Two overlapping white volume clouds where the overlapping portion of the front cloud is translucent.',
    types: ['volumemix'],
    icons: ['sop_volumemix'],
    refKey: 'SOP_volumemix',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-mix-back`}>
            <path d={VOLUME_CLOUD_PATH} transform="translate(9.4 9.6) scale(0.76) translate(-12 -12)" />
          </clipPath>
        </defs>
        <VolumeCloud cx={9.4} cy={9.6} scale={0.76} fill="#c0c7d1" creaseColor="#5a616b" />
        <VolumeCloud cx={14.6} cy={14.4} scale={0.76} fill="#f2f4f7" />
        <g clipPath={`url(#${uid}-mix-back)`} opacity="0.48">
          <VolumeCloud cx={9.4} cy={9.6} scale={0.76} fill="#c0c7d1" creaseColor="#5a616b" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumereduce',
    label: 'Volume Reduce',
    family: 'sop',
    description: 'White volume cloud at upper left with a red arrow pointing down-right toward bold 3.14 text.',
    types: ['volumereduce'],
    icons: ['sop_volumereduce'],
    refKey: 'SOP_volumereduce',
    render: () => {
      const from: Pt = [5.0, 12.6];
      const tip: Pt = [11.0, 18.4];
      const tri = arrowHead(tip, from, 3.8, 2.6);
      const shaftEnd: Pt = [(tri[1][0] + tri[2][0]) / 2, (tri[1][1] + tri[2][1]) / 2];
      return (
        <>
          <VolumeCloud cx={9.8} cy={8.2} scale={0.64} />
          <CasedStroke d={`M${pts([from])} L${pts([shaftEnd])}`} color="#e03228" width={2.0} linecap="round" />
          <polygon points={pts(tri)} fill="#e03228" stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round" />
          <text
            x="9.2"
            y="20.4"
            fontSize="5.2"
            fontWeight="800"
            fontFamily="sans-serif"
            fill="#ffffff"
            stroke={OUTLINE}
            strokeWidth="1.1"
            paintOrder="stroke"
          >
            3.14
          </text>
        </>
      );
    },
  },
  {
    id: 'sop.volumeresample',
    label: 'Volume Resample',
    family: 'sop',
    description: 'Three-tone isometric grey cube subdivided with green octree grid lines on its faces.',
    types: ['volumeresample'],
    icons: ['sop_volumeresample'],
    refKey: 'SOP_volumeresample',
    render: () => {
      const { top, left, right } = isoBoxFaces(12, 6.4, 6.8, 7.6);
      const topGrid = quadGridPath(top as [Pt, Pt, Pt, Pt], 2, 2);
      const leftGrid = quadGridPath(left as [Pt, Pt, Pt, Pt], 2, 2);
      const rightGrid = quadGridPath(right as [Pt, Pt, Pt, Pt], 3, 3);
      return (
        <g strokeLinejoin="round">
          <polygon points={pts(top)} fill="#eef2f7" stroke={OUTLINE} strokeWidth="1.05" />
          <polygon points={pts(left)} fill="#c0c7d1" stroke={OUTLINE} strokeWidth="1.05" />
          <polygon points={pts(right)} fill="#89929e" stroke={OUTLINE} strokeWidth="1.05" />
          <path d={`${topGrid} ${leftGrid} ${rightGrid}`} fill="none" stroke="#58c848" strokeWidth="0.9" />
          <path d={`M${pts(top)} Z M${pts(left)} Z M${pts(right)} Z`} fill="none" stroke={OUTLINE} strokeWidth="1.05" />
        </g>
      );
    },
  },
  {
    id: 'sop.volumeresize',
    label: 'Volume Resize',
    family: 'sop',
    description: 'Smaller white volume cloud centered inside a dashed cloud-shaped resize boundary.',
    types: ['volumeresize'],
    icons: ['sop_volumeresize'],
    refKey: 'SOP_volumeresize',
    render: () => (
      <>
        <path
          d={VOLUME_CLOUD_PATH}
          transform="translate(12 12) scale(1.02) translate(-12 -12)"
          fill="#eef2f7"
          fillOpacity="0.28"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeDasharray="2.2 1.4"
          strokeLinejoin="round"
        />
        <VolumeCloud cx={12} cy={12} scale={0.66} />
      </>
    ),
  },
  {
    id: 'sop.volumesplice',
    label: 'Volume Splice',
    family: 'sop',
    description:
      'Eight 2x2-subdivided grey and light-blue isometric sub-cubes stacked in two 2x2 layers with four red inward corner arrows.',
    types: ['volumesplice'],
    icons: ['sop_volumesplice'],
    refKey: 'SOP_volumesplice',
    render: () => {
      const quads: readonly [number, number][] = [
        // Bottom 2x2 layer (drawn first)
        [12, 9.4],
        [8.2, 11.3],
        [15.8, 11.3],
        [12, 13.2],
        // Top 2x2 layer (1 cube height higher)
        [12, 4.8],
        [8.2, 6.7],
        [15.8, 6.7],
        [12, 8.6],
      ];
      const arrows: readonly [Pt, Pt][] = [
        [
          [3.2, 3.4],
          [7.0, 6.6],
        ],
        [
          [20.8, 3.4],
          [17.0, 6.6],
        ],
        [
          [3.2, 20.8],
          [7.0, 17.8],
        ],
        [
          [20.8, 20.8],
          [17.0, 17.8],
        ],
      ];
      return (
        <>
          {quads.map(([cx, cy], idx) => {
            const { top, left, right } = isoBoxFaces(cx, cy, 3.2, 3.6);
            const gTop = quadGridPath(top as [Pt, Pt, Pt, Pt], 2, 2);
            const gLeft = quadGridPath(left as [Pt, Pt, Pt, Pt], 2, 2);
            const gRight = quadGridPath(right as [Pt, Pt, Pt, Pt], 2, 2);
            return (
              <g key={idx} strokeLinejoin="round">
                <polygon points={pts(top)} fill="#ffffff" stroke={OUTLINE} strokeWidth="0.75" />
                <polygon points={pts(left)} fill="#8fc2ff" stroke={OUTLINE} strokeWidth="0.75" />
                <polygon points={pts(right)} fill="#eef2f7" stroke={OUTLINE} strokeWidth="0.75" />
                <path d={`${gTop} ${gLeft} ${gRight}`} fill="none" stroke="#5a616b" strokeWidth="0.6" />
              </g>
            );
          })}
          {arrows.map(([from, tip], idx) => {
            const tri = arrowHead(tip, from, 3.2, 2.5);
            const shaftEnd: Pt = [(tri[1][0] + tri[2][0]) / 2, (tri[1][1] + tri[2][1]) / 2];
            return (
              <g key={idx}>
                <CasedStroke d={`M${pts([from])} L${pts([shaftEnd])}`} color="#ff7066" width={1.8} linecap="round" />
                <polygon points={pts(tri)} fill="#ff7066" stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />
              </g>
            );
          })}
        </>
      );
    },
  },
  {
    id: 'sop.volumepatch',
    label: 'Volume Patch',
    family: 'sop',
    description: 'Two volume clouds with red dashed patch rings connected by an orange curved arrow.',
    types: ['volumepatch'],
    icons: ['sop_volumepatch'],
    refKey: 'SOP_volumepatch',
    render: () => {
      const tip: Pt = [15.6, 10.6];
      const from: Pt = [12.4, 5.4];
      const tri = arrowHead(tip, from, 2.8, 2.1);
      return (
        <>
          <VolumeCloud cx={7.8} cy={8.4} scale={0.56} creases={false} />
          <circle
            cx="8.2"
            cy="8.4"
            r="2.2"
            fill="#ff7066"
            fillOpacity="0.35"
            stroke="#e03228"
            strokeWidth="0.9"
            strokeDasharray="1.4 1.0"
          />
          <VolumeCloud cx={15.6} cy={15.2} scale={0.66} creases={false} />
          <circle
            cx="15.4"
            cy="15.0"
            r="2.6"
            fill="#ff7066"
            fillOpacity="0.35"
            stroke="#e03228"
            strokeWidth="0.9"
            strokeDasharray="1.5 1.0"
          />
          <CasedStroke d="M10.4,5.4 Q14.4,5.0 15.2,9.2" color="#ee8624" width={1.45} linecap="round" />
          <polygon points={pts(tri)} fill="#ee8624" stroke={OUTLINE} strokeWidth="0.85" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'sop.convertvolume',
    label: 'Convert Volume',
    family: 'sop',
    description:
      'Cloud split vertically into a soft light blue volume on the left and a solid orange sculpted mesh on the right.',
    types: ['convertvolume'],
    icons: ['sop_convertvolume'],
    refKey: 'SOP_convertvolume',
    render: () => (
      <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M12,6.5 A4,4 0 0,0 6.5,10.5 A3.2,3.2 0 0,0 4.5,16.5 H12 Z" fill="#8fc2ff" />
        <path
          d="M12,6.5 C15,6 16.5,8.5 15,10.5 C18,10.5 19,13 17,14.2 C19.5,14.5 20,16.5 17.5,16.5 H12 Z"
          fill="#ee8624"
        />
        <line x1="12" y1="5.5" x2="12" y2="17.5" strokeWidth="1.1" />
      </g>
    ),
  },
  {
    id: 'sop.bakevolume',
    label: 'Bake Volume',
    family: 'sop',
    description: 'Volume cloud at the bottom with a glowing yellow light bulb above it.',
    types: ['bakevolume'],
    icons: ['sop_bakevolume'],
    refKey: 'SOP_bakevolume',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <path d="M9.5,6.2 A2.8,2.8 0 1,1 14.5,6.2 L13.6,8.2 H10.4 Z" fill="#ffe47a" />
          <rect x="10.4" y="8.2" width="3.2" height="1.6" fill="#89929e" />
          <path
            d="M7.2,18.5 A3,3 0 0,1 6.5,13 A3.2,3.2 0 0,1 12,10.5 A3.2,3.2 0 0,1 17.5,13 A3,3 0 0,1 16.8,18.5 A3.5,3.5 0 0,1 12,20.5 A3.5,3.5 0 0,1 7.2,18.5 Z"
            fill="#c0c7d1"
            strokeWidth="1.2"
          />
        </g>
        <path
          d="M9.5,14.5 A2.2,2.2 0 0,1 13.5,13.5 M10,17.2 A2.5,2.5 0 0,0 14.5,17.2"
          fill="none"
          stroke="#5a616b"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </>
    ),
  },
];
