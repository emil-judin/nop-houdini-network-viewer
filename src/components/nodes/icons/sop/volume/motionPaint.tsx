import { isoBoxFaces, pts, roundedRectPath } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { IsoWireCube, LatticeCloud, PaintVolumeBean, VolumeCloud } from '../kits/volume';

/**
 * Volume motion and paint.
 */

const OUTLINE = '#262626';

/**
 * Volume motion, deform and paint operators.
 */
export const VOLUME_MOTION_PAINT_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.volumevelocity',
    label: 'Volume Velocity',
    family: 'sop',
    description: 'Dense swirling grey wind curves enclosed inside a translucent white isometric cube.',
    types: ['volumevelocity'],
    icons: ['sop_volumevelocity'],
    refKey: 'SOP_volumevelocity',
    render: () => {
      const { top, left, right } = isoBoxFaces(12, 7.0, 6.8, 7.8);
      const backD = `M${pts([top[0], top[1]])} M${pts([left[1], left[2], right[2]])}`;
      return (
        <>
          <CasedStroke d={backD} color="#c0c7d1" width={0.7} casing={1.4} />
          <g fill="none" stroke="#3a3f47" strokeWidth="0.8" strokeLinecap="round">
            <path d="M9.6,8.4 C11.4,7.4 13.4,7.6 14.8,8.6" />
            <path d="M8.4,10.4 C10.0,9.0 12.6,9.2 14.0,10.4" />
            <path d="M14.6,11.0 C16.0,12.4 15.6,14.6 13.8,15.4" />
            <path d="M7.6,13.2 C7.4,11.4 8.8,10.4 10.6,11.0" />
            <path d="M10.2,13.0 C11.6,12.2 13.0,12.8 12.6,14.2" />
            <path d="M8.2,15.6 C9.4,16.8 11.4,17.0 12.8,16.0" />
            <path d="M8.8,17.4 C10.6,18.6 13.0,18.2 14.2,16.8" />
            <path d="M15.2,15.0 C16.4,16.4 15.4,18.6 13.4,19.0" />
            <path d="M11.6,15.4 C12.8,14.8 14.0,15.6 13.4,16.6" />
          </g>
          {/* Translucent cube in front of the wind */}
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
    id: 'sop.volumetrail',
    label: 'Volume Trail',
    family: 'sop',
    description:
      'Tilted dark cube-shaped volume in perspective with a white edge and green rim, filled with short curved streamlines in orange, yellow, green, red and blue swirling toward the center.',
    types: ['volumetrail'],
    icons: ['sop_volumetrail'],
    refKey: 'SOP_volumetrail',
    render: () => (
      <>
        <polygon
          points="3.0,5.4 13.5,2.9 21.1,6.2 20.0,16.4 10.0,21.1 4.6,15.8"
          fill="#22272e"
          stroke="#f2f4f7"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <polygon
          points="3.0,5.4 13.5,2.9 21.1,6.2 20.0,16.4 10.0,21.1 4.6,15.8"
          fill="none"
          stroke="#6ab42a"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <g fill="none" strokeWidth="1.1" strokeLinecap="round">
          <path d="M5.2 7.4C8 7.8 10.5 9.5 11.5 12.5" stroke="#f5a030" />
          <path d="M7.8 5.2C10.2 6.5 11.8 8.8 12.5 11" stroke="#f5d030" />
          <path d="M17.8 6.0C15.2 7.2 13.5 9.4 12.8 11.5" stroke="#8cd040" />
          <path d="M19.2 9.2C16.6 9.8 14.5 11.2 13.2 12.8" stroke="#e03228" />
          <path d="M18.4 15.6C16.2 14.6 14.4 13.8 13 12.8" stroke="#4a78c8" />
          <path d="M11.2 19.0C11.6 16.8 12.0 14.8 12.4 13" stroke="#f5a030" />
          <path d="M6.0 15.4C8.4 14.4 10.2 13.6 11.6 13" stroke="#8aa0c0" />
          <path d="M4.8 11.2C7.4 11 9.8 11.6 11.4 12.6" stroke="#8cd040" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumedeform',
    label: 'Volume Deform',
    family: 'sop',
    description: 'Swept blue volume cloud cut in half with a green wireframe lattice inside the cut face.',
    types: ['volumedeform'],
    icons: ['sop_volumedeform'],
    refKey: 'SOP_volumedeform',
    render: (uid) => <LatticeCloud uid={uid} variant="deform" />,
  },
  {
    id: 'sop.extrudevolume',
    label: 'Extrude Volume',
    family: 'sop',
    description: 'Subdivided faceted grey mountain polygon extruded high above a tall orange-gold side skirt.',
    types: ['extrudevolume'],
    icons: ['sop_extrudevolume'],
    refKey: 'SOP_extrudevolume',
    render: () => (
      <g stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round">
        {/* Tall orange extruded side skirt */}
        <polygon points="3.4,11.6 12.2,16.6 12.2,21.2 3.4,16.2" fill="#ee8624" strokeWidth="0.95" />
        <polygon points="12.2,16.6 20.6,12.0 20.6,16.6 12.2,21.2" fill="#c25e12" strokeWidth="0.95" />
        {/* Subdivided faceted grey mountain polygon */}
        <polygon points="3.4,11.6 7.4,7.6 8.4,11.2" fill="#eef2f7" />
        <polygon points="7.4,7.6 10.6,4.2 11.4,8.6" fill="#eef2f7" />
        <polygon points="7.4,7.6 11.4,8.6 8.4,11.2" fill="#c0c7d1" />
        <polygon points="10.6,4.2 14.8,5.4 11.4,8.6" fill="#c0c7d1" />
        <polygon points="14.8,5.4 17.8,8.0 14.6,10.2" fill="#89929e" />
        <polygon points="14.8,5.4 14.6,10.2 11.4,8.6" fill="#eef2f7" />
        <polygon points="17.8,8.0 20.6,12.0 14.6,10.2" fill="#89929e" />
        <polygon points="3.4,11.6 8.4,11.2 8.8,14.6" fill="#c0c7d1" />
        <polygon points="8.4,11.2 11.4,8.6 12.2,13.4" fill="#eef2f7" />
        <polygon points="8.4,11.2 12.2,13.4 8.8,14.6" fill="#89929e" />
        <polygon points="8.8,14.6 12.2,13.4 12.2,16.6" fill="#c0c7d1" />
        <polygon points="11.4,8.6 14.6,10.2 12.2,13.4" fill="#c0c7d1" />
        <polygon points="14.6,10.2 20.6,12.0 16.4,14.4" fill="#c0c7d1" />
        <polygon points="14.6,10.2 16.4,14.4 12.2,13.4" fill="#89929e" />
        <polygon points="12.2,13.4 16.4,14.4 12.2,16.6" fill="#89929e" />
      </g>
    ),
  },
  {
    id: 'sop.pointsfromvolume',
    label: 'Points from Volume',
    family: 'sop',
    description: 'White volume cloud behind a grid of bright yellow spheres.',
    types: ['pointsfromvolume'],
    icons: ['sop_pointsfromvolume'],
    refKey: 'SOP_pointsfromvolume',
    render: () => {
      const xs = [6.2, 10.0, 14.0, 17.8];
      const ys = [6.2, 10.0, 14.0, 17.8];
      return (
        <>
          <VolumeCloud cx={12} cy={12} scale={1.06} creases={false} />
          <g fill="#ffe47a" stroke={OUTLINE} strokeWidth="0.75">
            {ys.map((y, yi) =>
              xs.map((x, xi) => {
                // Skip far corners to keep the cloud silhouette clear
                if ((xi === 0 || xi === 3) && (yi === 0 || yi === 3)) return null;
                return <circle key={`${xi}-${yi}`} cx={x} cy={y} r="1.4" />;
              }),
            )}
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.latticefromvolume',
    label: 'Lattice from Volume',
    family: 'sop',
    description: 'Swept blue volume cloud cut in half with a green wireframe lattice inside the cut face.',
    types: ['latticefromvolume'],
    icons: ['sop_latticefromvolume'],
    refKey: 'SOP_latticefromvolume',
    render: (uid) => <LatticeCloud uid={uid} variant="deform" />,
  },
  {
    id: 'sop.convertvdb',
    label: 'Convert VDB',
    family: 'sop',
    description:
      'Red OpenVDB infinity loop above a dark rounded pill holding bold white VDB text (vendor logo, redrawn).',
    types: [
      'convertvdb',
      'convertvdbpoints',
      'vdb',
      'vdbactivate',
      'vdbactivatesdf',
      'vdbadvectpoints',
      'vdbadvectsdf',
      'vdbanalysis',
      'vdbclip',
      'vdbcollider',
      'vdbcombine',
      'vdbconvexclipsdf',
      'vdbdiagnostics',
      'vdbextrapolate',
      'vdbfracture',
      'vdbfromparticles',
      'vdbfrompolygons',
      'vdbimplicitclipsdf',
      'vdblod',
      'vdbmerge',
      'vdbmorphsdf',
      'vdbocclusionmask',
      'vdbpointsdelete',
      'vdbpointsgroup',
      'vdbpotentialflow',
      'vdbprojectnondivergent',
      'vdbrasterizefrustum',
      'vdbrenormalizesdf',
      'vdbresample',
      'vdbreshapesdf',
      'vdbsegmentbyconnectivity',
      'vdbsmooth',
      'vdbsmoothsdf',
      'vdbtopologytosdf',
      'vdbtospheres',
      'vdbvectormerge',
      'vdbvectorsplit',
      'vdbvisualizetree',
    ],
    icons: ['sop_openvdb', 'sop_vdbcollider'],
    refKey: 'SOP_OpenVDB',
    render: () => {
      const loopD =
        'M12.0,8.2 C9.6,4.2 3.8,4.4 3.8,8.2 C3.8,12.0 9.6,12.2 12.0,8.2 C14.4,4.2 20.2,4.4 20.2,8.2 C20.2,12.0 14.4,12.2 12.0,8.2 Z';
      return (
        <>
          <path d={loopD} fill="none" stroke={OUTLINE} strokeWidth="3.6" strokeLinejoin="round" />
          <path d={loopD} fill="none" stroke="#e03228" strokeWidth="2.0" strokeLinejoin="round" />
          <path d={roundedRectPath(3.6, 13.6, 16.8, 6.8, 2.2)} fill="#3a3f47" stroke={OUTLINE} strokeWidth="1.0" />
          <text
            x="12"
            y="18.8"
            textAnchor="middle"
            fontSize="5.4"
            fontWeight="800"
            fontFamily="sans-serif"
            fill="#ffffff"
          >
            VDB
          </text>
        </>
      );
    },
  },
  {
    id: 'sop.paintcolorvolume',
    label: 'Volume Paint Color',
    family: 'sop',
    description: 'Purple bean-shaped volume with a dashed contour and an angled paintbrush on the right.',
    types: ['paintcolorvolume'],
    icons: ['sop_paintcolorvolume'],
    refKey: 'SOP_paintcolorvolume',
    render: (uid) => (
      <PaintVolumeBean uid={uid} highlight="#b87ae0" body="#9b59b6" shadow="#6f3688" tipColor="#6f3688" />
    ),
  },
  {
    id: 'sop.paintfogvolume',
    label: 'Volume Paint Fog',
    family: 'sop',
    description: 'White and grey bean-shaped fog volume with a dashed contour and an angled paintbrush on the right.',
    types: ['paintfogvolume'],
    icons: ['sop_paintfogvolume'],
    refKey: 'SOP_paintfogvolume',
    render: (uid) => (
      <PaintVolumeBean uid={uid} highlight="#ffffff" body="#eef2f7" shadow="#89929e" tipColor="#3a3f47" />
    ),
  },
  {
    id: 'sop.paintsdfvolume',
    label: 'Volume Paint SDF',
    family: 'sop',
    description: 'Light-blue bean-shaped SDF volume with a dashed contour and an angled paintbrush on the right.',
    types: ['paintsdfvolume'],
    icons: ['sop_paintsdfvolume'],
    refKey: 'SOP_paintsdfvolume',
    render: (uid) => (
      <PaintVolumeBean uid={uid} highlight="#eef2f7" body="#8fc2ff" shadow="#3672c4" tipColor="#3672c4" />
    ),
  },
];
