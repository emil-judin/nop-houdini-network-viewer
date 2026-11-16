import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 5 Part 3 (icons 30 to 39): VDB and HeightField SOP icons.
 */
export const BATCH_05_PART_3: OperatorIconDef[] = [
  {
    id: 'sop.convertvdb',
    label: 'Convert VDB',
    family: 'sop',
    description:
      'Red infinity loop above bold white VDB letters with dark outlines.',
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
    render: () => (
      <>
        <path
          d="M12,7.8 C10,5 7.8,4.2 5.6,4.8 C3.5,5.4 2.5,7.4 3.2,9.4 C3.9,11.3 6.2,12 8.4,10.8 C9.8,10 10.9,8.9 12,7.8 C13.1,8.9 14.2,10 15.6,10.8 C17.8,12 20.1,11.3 20.8,9.4 C21.5,7.4 20.5,5.4 18.4,4.8 C16.2,4.2 14,5 12,7.8 Z"
          fill="none"
          stroke="#a40000"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12,7.8 C10,5 7.8,4.2 5.6,4.8 C3.5,5.4 2.5,7.4 3.2,9.4 C3.9,11.3 6.2,12 8.4,10.8 C9.8,10 10.9,8.9 12,7.8 C13.1,8.9 14.2,10 15.6,10.8 C17.8,12 20.1,11.3 20.8,9.4 C21.5,7.4 20.5,5.4 18.4,4.8 C16.2,4.2 14,5 12,7.8 Z"
          fill="none"
          stroke="#ce3131"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="12"
          y="20.2"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="8.2"
          fontWeight="bold"
          fill="#ffffff"
          stroke="#2e3436"
          strokeWidth="1.6"
          paintOrder="stroke"
        >
          VDB
        </text>
      </>
    ),
  },
  {
    id: 'sop.guidecollidevdb',
    label: 'Guide Collide With VDB',
    family: 'sop',
    description:
      'Golden-yellow ridged hair guide volume with a red collision sphere embedded in its upper left.',
    types: ['guidecollidevdb'],
    icons: ['sop_guidecollidevdb'],
    refKey: 'SOP_guidecollidevdb',
    render: () => (
      <>
        <path
          d="M2,17.2 L6,9.5 C10,8.2 14,8.2 18,9.5 L22,17.2 C15.5,15.4 8.5,15.4 2,17.2 Z"
          fill="#fce94f"
          stroke="#7a6400"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M2,17.2 C8.5,15.4 15.5,15.4 22,17.2 L21.6,19.8 C15.2,18 8.8,18 2.4,19.8 Z"
          fill="#c4a000"
          stroke="#555753"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <g stroke="#987c00" strokeWidth="0.6">
          <line x1="5" y1="16.8" x2="5.2" y2="19.2" />
          <line x1="8" y1="16.2" x2="8.1" y2="18.7" />
          <line x1="11" y1="16" x2="11" y2="18.5" />
          <line x1="14" y1="16" x2="14" y2="18.5" />
          <line x1="17" y1="16.2" x2="16.9" y2="18.7" />
          <line x1="19.8" y1="16.8" x2="19.6" y2="19.2" />
        </g>
        <circle
          cx="8.5"
          cy="10.2"
          r="3.2"
          fill="#ef2929"
          stroke="#6f0808"
          strokeWidth="0.85"
        />
        <circle cx="7.5" cy="9.2" r="1" fill="#f89d9d" />
      </>
    ),
  },
  {
    id: 'sop.vdbfromparticlefluid',
    label: 'VDB from Particle Fluid',
    family: 'sop',
    description:
      'Five blue fluid particles with motion streaks enclosed in dashed circular VDB bounds.',
    types: ['vdbfromparticlefluid'],
    icons: ['sop_vdbfromparticlefluid'],
    refKey: 'SOP_vdbfromparticlefluid',
    render: () => {
      const pts: [number, number][] = [
        [6.2, 6.2],
        [11.8, 9.2],
        [17.5, 6],
        [7.5, 16],
        [16.8, 16.8],
      ];
      return (
        <>
          {pts.map(([cx, cy], idx) => (
            <g key={idx}>
              <circle
                cx={cx}
                cy={cy}
                r="3.4"
                fill="#c7d5e5"
                fillOpacity="0.45"
                stroke="#6f87a0"
                strokeWidth="0.75"
                strokeDasharray="1.5 1"
              />
              <line
                x1={cx - 2}
                y1={cy - 1.5}
                x2={cx + 0.4}
                y2={cy + 0.2}
                stroke="#88a9c3"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle
                cx={cx + 0.5}
                cy={cy + 0.3}
                r="1.25"
                fill="#2e659e"
                stroke="#193766"
                strokeWidth="0.55"
              />
            </g>
          ))}
        </>
      );
    },
  },
  {
    id: 'sop.heightfield',
    label: 'HeightField',
    family: 'sop',
    description:
      'Isometric blue heightfield terrain slab with a central raised mountain peak and grid subdivisions.',
    types: ['heightfield'],
    icons: ['sop_heightfield'],
    refKey: 'SOP_heightfield',
    render: () => (
      <>
        <polygon
          points="2,13.5 9.5,8.2 22,11.2 15.8,17.8"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="7.5,11.2 11.5,7.2 15.5,8.5 14.5,12.8 10.5,13.5"
          fill="#99badc"
          stroke="#204a87"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <polygon
          points="11.5,7.2 15.5,8.5 14.5,12.8 11.5,11.2"
          fill="#4581bf"
        />
        <polygon
          points="2,13.5 15.8,17.8 15.8,19.6 2,15.2"
          fill="#4e86c3"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="15.8,17.8 22,11.2 22,13 15.8,19.6"
          fill="#204a87"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#204a87" strokeWidth="0.5">
          <line x1="5.8" y1="10.8" x2="18.8" y2="14.5" />
          <line x1="4" y1="12.2" x2="17.2" y2="16.2" />
          <line x1="12.5" y1="9" x2="5.5" y2="14.5" />
          <line x1="16" y1="9.8" x2="9.2" y2="15.8" />
          <line x1="19" y1="10.5" x2="12.6" y2="16.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.heightfield_blur',
    label: 'HeightField Blur',
    family: 'sop',
    description:
      'Isometric blue heightfield terrain slab with a smooth rounded blurred hill in the center.',
    types: ['heightfield_blur'],
    icons: ['sop_heightfield_blur'],
    refKey: 'SOP_heightfield_blur',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-hfb`} cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#d2d9e3" />
            <stop offset="60%" stopColor="#6d95d0" />
            <stop offset="100%" stopColor="#25569c" />
          </radialGradient>
        </defs>
        <polygon
          points="2,13.5 9.5,8.2 22,11.2 15.8,17.8"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M6.8,12.5 C7.5,8.2 11,6.5 14.5,7.8 C16.8,8.6 17.5,11 16.5,13.5 C14.2,14.8 9.2,14.5 6.8,12.5 Z"
          fill={`url(#${uid}-hfb)`}
          stroke="#204a87"
          strokeWidth="0.7"
        />
        <polygon
          points="2,13.5 15.8,17.8 15.8,19.6 2,15.2"
          fill="#4e86c3"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="15.8,17.8 22,11.2 22,13 15.8,19.6"
          fill="#204a87"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.heightfield_clip',
    label: 'HeightField Clip',
    family: 'sop',
    description:
      'Isometric blue terraced heightfield with a flat-clipped mesa top and a red outline above showing the clipped peak.',
    types: ['heightfield_clip'],
    icons: ['sop_heightfield_clip'],
    refKey: 'SOP_heightfield_clip',
    render: () => (
      <>
        <polygon
          points="2,14.2 9.5,9 22,12 15.8,18.5"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="6.5,12.2 10.5,8.8 16.8,10.4 13.2,14.2"
          fill="#3465a4"
          stroke="#204a87"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <polygon
          points="8,9.8 11.2,7.4 15.5,8.5 12.5,11.2"
          fill="#99badc"
          stroke="#204a87"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <polygon
          points="8,9.8 12.5,11.2 12.5,13.5 8,12"
          fill="#4581bf"
          stroke="#204a87"
          strokeWidth="0.65"
        />
        <polygon
          points="12.5,11.2 15.5,8.5 15.5,10.8 12.5,13.5"
          fill="#204a87"
        />
        <path
          d="M8.8,6.5 C9.5,4.2 12.8,3.8 14.5,5.5 C15.2,6.2 14.2,7.2 12.2,7.4 C10.2,7.6 8.5,7.2 8.8,6.5 Z"
          fill="none"
          stroke="#ef2929"
          strokeWidth="0.9"
        />
        <polygon
          points="2,14.2 15.8,18.5 15.8,20.2 2,15.8"
          fill="#4e86c3"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="15.8,18.5 22,12 22,13.8 15.8,20.2"
          fill="#204a87"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.heightfield_copylayer',
    label: 'HeightField Copy Layer',
    family: 'sop',
    description:
      'Upper-left blue heightfield tile with yellow raised blocks copied to a lower-right tile with orange raised blocks.',
    types: ['heightfield_copylayer'],
    icons: ['sop_heightfield_copylayer'],
    refKey: 'SOP_heightfield_copylayer',
    render: () => (
      <>
        <g strokeLinejoin="round">
          <polygon
            points="2,8.5 8.5,3.5 17.5,6 11.2,11.5"
            fill="#729fcf"
            stroke="#204a87"
            strokeWidth="0.8"
          />
          <polygon
            points="2,8.5 11.2,11.5 11.2,12.8 2,9.8"
            fill="#3465a4"
            stroke="#204a87"
            strokeWidth="0.7"
          />
          <polygon
            points="11.2,11.5 17.5,6 17.5,7.3 11.2,12.8"
            fill="#204a87"
            stroke="#204a87"
            strokeWidth="0.7"
          />
          <polygon
            points="5.5,6.8 8.5,4.5 12.2,5.6 9.2,8"
            fill="#fce94f"
            stroke="#9b7f00"
            strokeWidth="0.7"
          />
          <polygon
            points="5.5,6.8 9.2,8 9.2,9.3 5.5,8.1"
            fill="#edd400"
            stroke="#9b7f00"
            strokeWidth="0.65"
          />

          <polygon
            points="7,16.5 13.5,11.5 22,14 15.8,19.5"
            fill="#729fcf"
            stroke="#204a87"
            strokeWidth="0.8"
          />
          <polygon
            points="7,16.5 15.8,19.5 15.8,20.8 7,17.8"
            fill="#3465a4"
            stroke="#204a87"
            strokeWidth="0.7"
          />
          <polygon
            points="15.8,19.5 22,14 22,15.3 15.8,20.8"
            fill="#204a87"
            stroke="#204a87"
            strokeWidth="0.7"
          />
          <polygon
            points="10.5,14.8 13.5,12.5 17.2,13.6 14.2,16"
            fill="#fcaf3e"
            stroke="#a04000"
            strokeWidth="0.7"
          />
          <polygon
            points="10.5,14.8 14.2,16 14.2,17.3 10.5,16.1"
            fill="#f57900"
            stroke="#a04000"
            strokeWidth="0.65"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.heightfield_crop',
    label: 'HeightField Crop',
    family: 'sop',
    description:
      'Faded heightfield terrain with a bright blue cropped sub-rectangle highlighted in red in the lower right.',
    types: ['heightfield_crop'],
    icons: ['sop_heightfield_crop'],
    refKey: 'SOP_heightfield_crop',
    render: () => (
      <>
        <g opacity="0.35">
          <polygon
            points="2,13.5 9.5,8.2 22,11.2 15.8,17.8"
            fill="#729fcf"
            stroke="#204a87"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <polygon
            points="2,13.5 15.8,17.8 15.8,19.5 2,15.2"
            fill="#4e86c3"
            stroke="#204a87"
            strokeWidth="0.7"
          />
        </g>
        <polygon
          points="9.5,14.2 13.8,10.5 20.5,12.2 15.8,17.2"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="9.5,14.2 15.8,17.2 15.8,18.8 9.5,15.8"
          fill="#4581bf"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="15.8,17.2 20.5,12.2 20.5,13.8 15.8,18.8"
          fill="#204a87"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="9,15.8 14,11.2 21.2,13.2 15.8,19.2"
          fill="none"
          stroke="#ef2929"
          strokeWidth="0.75"
          strokeDasharray="1.4 1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.heightfield_cutoutbyobject',
    label: 'HeightField Cutout by Geometry',
    family: 'sop',
    description:
      'Circular section of blue heightfield terrain isolated inside a translucent green bounding sphere.',
    types: ['heightfield_cutoutbyobject'],
    icons: ['sop_heightfield_cutoutbyobject'],
    refKey: 'SOP_heightfield_cutoutbyobject',
    render: () => (
      <>
        <ellipse
          cx="12"
          cy="14"
          rx="9"
          ry="4.2"
          fill="#d3d7cf"
          fillOpacity="0.4"
          stroke="#888a85"
          strokeWidth="0.6"
        />
        <circle
          cx="12"
          cy="11.5"
          r="5.8"
          fill="#adeb70"
          fillOpacity="0.3"
          stroke="#4e9a06"
          strokeWidth="0.85"
        />
        <path
          d="M7,11.8 L10.5,8.8 L16.8,10.2 L17.2,12.2 L13.5,14.8 L7.5,13.2 Z"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <path
          d="M9.5,11.2 L12,8.5 L14.8,9.4 L13.5,12.2 Z"
          fill="#4581bf"
          stroke="#204a87"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        <path
          d="M6.3,11.5 A5.8,5.8 0 0 0 17.7,11.5"
          fill="none"
          stroke="#4e9a06"
          strokeWidth="0.85"
        />
      </>
    ),
  },
  {
    id: 'sop.heightfield_deform',
    label: 'HeightField Deform',
    family: 'sop',
    description:
      'Sandy tan heightfield dune block with a blue off-road car driving over the crest.',
    types: ['heightfield_deform'],
    icons: ['sop_heightfield_deform'],
    refKey: 'SOP_heightfield_deform',
    render: () => (
      <>
        <path
          d="M2,13.5 C4.5,11 7.5,8.2 11,8 C14.5,7.8 18.5,10.2 21.8,12 L21.8,16.5 L12,21.5 L2,16.5 Z"
          fill="#e9b96e"
          stroke="#8f5902"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="2,13.5 12,18 12,21.5 2,16.5"
          fill="#c17d11"
          stroke="#8f5902"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="12,18 21.8,12 21.8,16.5 12,21.5"
          fill="#8f5902"
          stroke="#623c01"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <g stroke="#193774" strokeWidth="0.7" strokeLinejoin="round">
          <polygon
            points="6.5,8.2 9.5,4.8 14.5,4.5 17.5,6.8 16.5,9.2 7.2,9.8"
            fill="#478cc3"
          />
          <polygon points="9.8,5.4 13.8,5.2 15.2,6.8 8.8,7.2" fill="#dae9f6" />
        </g>
        <circle cx="9.2" cy="9.5" r="1.7" fill="#2e3436" stroke="#eeeeec" strokeWidth="0.55" />
        <circle cx="15" cy="8.8" r="1.7" fill="#2e3436" stroke="#eeeeec" strokeWidth="0.55" />
      </>
    ),
  },
];
