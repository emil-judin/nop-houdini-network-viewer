import { arrowHead, type Pt, pts } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { CloudPuff, LatticeCloud, VolumeCloud } from '../kits/volume';

/**
 * Volume rasterize.
 */

const OUTLINE = '#262626';

/**
 * Volume rasterize operators.
 */
export const VOLUME_RASTERIZE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.volumerasterize',
    label: 'Volume Rasterize',
    family: 'sop',
    description: 'White volume cloud with a diagonal yellow wooden pencil drawing on its lower right.',
    types: ['volumerasterize'],
    icons: ['sop_volumerasterize'],
    refKey: 'SOP_volumerasterize',
    render: () => (
      <>
        <VolumeCloud cx={10.8} cy={11.0} scale={0.92} />
        <g stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round">
          <polygon points="18.2,7.2 20.4,9.4 13.8,16.0 11.6,13.8" fill="#f2c438" />
          <polygon points="18.2,7.2 20.4,9.4 21.4,8.4 19.2,6.2" fill="#ff7066" />
          <polygon points="11.6,13.8 13.8,16.0 10.4,17.2" fill="#ffe47a" />
          <polygon points="10.4,17.2 11.8,16.7 10.9,15.8" fill={OUTLINE} />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumerasterizeattributes',
    label: 'Volume Rasterize Attributes',
    family: 'sop',
    description: 'Vertical split with grey attribute dots on the left and half of a white volume cloud on the right.',
    types: ['volumerasterizeattributes'],
    icons: ['sop_volumerasterizeattributes'],
    refKey: 'SOP_volumerasterizeattributes',
    render: (uid) => {
      const dots: readonly [number, number][] = [
        [6.4, 6.2],
        [9.4, 5.2],
        [4.8, 9.6],
        [8.4, 8.8],
        [6.6, 12.6],
        [9.6, 12.2],
        [5.2, 16.0],
        [8.4, 16.8],
      ];
      return (
        <>
          <defs>
            <clipPath id={`${uid}-rast-right`}>
              <rect x="12" y="2" width="10" height="20" />
            </clipPath>
          </defs>
          <g fill="#c0c7d1" stroke={OUTLINE} strokeWidth="0.85">
            {dots.map(([x, y], idx) => (
              <circle key={idx} cx={x} cy={y} r="1.25" />
            ))}
          </g>
          <g clipPath={`url(#${uid}-rast-right)`}>
            <VolumeCloud cx={12} cy={12} scale={1.04} />
          </g>
          <line x1="12" y1="4.0" x2="12" y2="20.0" stroke={OUTLINE} strokeWidth="1.0" />
        </>
      );
    },
  },
  {
    id: 'sop.volumerasterizecurve',
    label: 'Volume Rasterize Curve',
    family: 'sop',
    description: 'S-shaped black curve wrapped inside a trail of overlapping puffy white cloud lobes.',
    types: ['volumerasterizecurve'],
    icons: ['sop_volumerasterizecurve'],
    refKey: 'SOP_volumerasterizecurve',
    render: () => {
      const curveD = 'M4.8,5.2 C8.2,5.6 7.8,10.2 11.4,11.6 C15.2,13.0 15.0,17.8 19.2,18.6';
      const puffs: readonly [number, number, number][] = [
        [5.0, 5.4, 2.3],
        [7.4, 6.8, 2.2],
        [8.8, 9.2, 2.3],
        [10.8, 11.2, 2.4],
        [13.4, 12.6, 2.3],
        [15.2, 15.0, 2.3],
        [16.8, 17.4, 2.2],
        [19.0, 18.4, 2.1],
      ];
      return (
        <>
          <g fill={OUTLINE} stroke={OUTLINE} strokeWidth="1.9">
            {puffs.map(([cx, cy, r], idx) => (
              <circle key={idx} cx={cx} cy={cy} r={r} />
            ))}
          </g>
          <g fill="#f2f4f7">
            {puffs.map(([cx, cy, r], idx) => (
              <circle key={idx} cx={cx} cy={cy} r={r} />
            ))}
          </g>
          <path d={curveD} fill="none" stroke={OUTLINE} strokeWidth="1.15" strokeLinecap="round" />
        </>
      );
    },
  },
  {
    id: 'sop.volumerasterizehair',
    label: 'Volume Rasterize Hair',
    family: 'sop',
    description:
      'Orange base strip with dark curved hair strands on the left turning into cased pale-grey misty strands on the right.',
    types: ['volumerasterizehair'],
    icons: ['sop_volumerasterizehair'],
    refKey: 'SOP_volumerasterizehair',
    render: () => (
      <>
        <polygon
          points="3.2,19.4 7.4,14.8 16.8,14.8 20.8,19.4"
          fill="#ee8624"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <CasedStroke
          d="M12.6,16.8 Q14.2,9.4 17.6,6.2 M14.8,17.4 Q16.8,10.8 19.8,8.4 M17.0,17.8 Q18.8,13.2 21.0,11.2"
          color="#eef2f7"
          width={1.3}
        />
        <CasedStroke
          d="M6.4,16.8 Q5.2,9.8 3.6,6.6 M8.6,17.2 Q7.8,9.6 6.8,5.2 M10.6,17.4 Q10.4,10.2 10.0,6.2"
          color="#5a616b"
          width={1.2}
        />
      </>
    ),
  },
  {
    id: 'sop.volumerasterizelattice',
    label: 'Volume Rasterize Lattice',
    family: 'sop',
    description: 'Swept green volume cloud cut open on the front with a light-blue wireframe lattice inside.',
    types: ['volumerasterizelattice'],
    icons: ['sop_volumerasterizelattice'],
    refKey: 'SOP_volumerasterizelattice',
    render: (uid) => <LatticeCloud uid={uid} variant="rasterize" />,
  },
  {
    id: 'sop.volumerasterizeparticles',
    label: 'Volume Rasterize Particles',
    family: 'sop',
    description: 'Cluster of six small white cloud puffs, each containing a dark-blue particle sphere at its center.',
    types: ['volumerasterizeparticles'],
    icons: ['sop_volumerasterizeparticles'],
    refKey: 'SOP_volumerasterizeparticles',
    render: () => {
      const puffs: readonly [number, number][] = [
        [8.4, 5.4],
        [15.4, 6.4],
        [5.6, 11.4],
        [11.6, 11.4],
        [17.6, 13.6],
        [9.8, 17.4],
      ];
      return (
        <>
          {puffs.map(([cx, cy], idx) => (
            <CloudPuff key={idx} cx={cx} cy={cy} r={2.8} dotR={1.15} dotFill="#3672c4" />
          ))}
        </>
      );
    },
  },
  {
    id: 'sop.volumerasterizepoints',
    label: 'Volume Rasterize Points',
    family: 'sop',
    description: 'Cluster of six small white cloud puffs, each with a crisp small point dot at its center.',
    types: ['volumerasterizepoints'],
    icons: ['sop_volumerasterizepoints'],
    refKey: 'SOP_volumerasterizepoints',
    render: () => {
      const puffs: readonly [number, number][] = [
        [9.0, 5.6],
        [15.4, 6.8],
        [5.8, 11.8],
        [11.6, 11.6],
        [17.2, 13.8],
        [9.6, 17.4],
      ];
      return (
        <>
          {puffs.map(([cx, cy], idx) => (
            <CloudPuff key={idx} cx={cx} cy={cy} r={2.8} dotR={0.75} dotFill="#5aa2f2" />
          ))}
        </>
      );
    },
  },
  {
    id: 'sop.volumefromattrib',
    label: 'Volume from Attribute',
    family: 'sop',
    description:
      'White volume cloud surrounded by small grey spheres around its perimeter, with a white speech-bubble tag at upper left and a red arrow pointing down-right into the cloud.',
    types: ['volumefromattrib'],
    icons: ['sop_volumefromattrib'],
    refKey: 'SOP_volumefromattrib',
    render: () => {
      const from: Pt = [6.2, 10.4];
      const tip: Pt = [10.8, 15.0];
      const tri = arrowHead(tip, from, 3.2, 2.3);
      const shaftEnd: Pt = [(tri[1][0] + tri[2][0]) / 2, (tri[1][1] + tri[2][1]) / 2];
      const spheres: readonly [number, number, number][] = [
        [13.4, 5.8, 1.15],
        [18.2, 7.2, 1.1],
        [9.0, 9.6, 1.2],
        [7.6, 14.8, 1.15],
        [11.0, 19.2, 1.1],
        [19.2, 16.4, 1.05],
      ];
      return (
        <>
          <VolumeCloud cx={14.2} cy={13.2} scale={0.74} />
          <g fill="#c0c7d1" stroke={OUTLINE} strokeWidth="0.75">
            {spheres.map(([cx, cy, r], idx) => (
              <circle key={idx} cx={cx} cy={cy} r={r} />
            ))}
          </g>
          <path
            d="M2.8,3.2 H10.6 V8.2 H8.2 L9.4,10.6 L6.2,8.2 H2.8 Z"
            fill="#ffffff"
            stroke={OUTLINE}
            strokeWidth="0.95"
            strokeLinejoin="round"
          />
          <CasedStroke d={`M${pts([from])} L${pts([shaftEnd])}`} color="#e03228" width={1.55} linecap="round" />
          <polygon points={pts(tri)} fill="#e03228" stroke={OUTLINE} strokeWidth="0.85" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'sop.volumestamp',
    label: 'Volume Stamp',
    family: 'sop',
    description: 'Large white volume cloud stamped with four smaller circular cloud puffs across its face.',
    types: ['volumestamp'],
    icons: ['sop_volumestamp'],
    refKey: 'SOP_volumestamp',
    render: () => (
      <>
        <VolumeCloud cx={12} cy={12} scale={1.04} creases={false} />
        <CloudPuff cx={7.8} cy={7.8} r={2.2} dotR={0.75} dotFill="#89929e" strokeWidth={0.8} />
        <CloudPuff cx={16.2} cy={8.2} r={2.2} dotR={0.75} dotFill="#89929e" strokeWidth={0.8} />
        <CloudPuff cx={11.8} cy={13.4} r={2.5} dotR={0.85} dotFill="#89929e" strokeWidth={0.85} />
        <CloudPuff cx={16.4} cy={16.2} r={2.0} dotR={0.65} dotFill="#89929e" strokeWidth={0.8} />
      </>
    ),
  },
];
