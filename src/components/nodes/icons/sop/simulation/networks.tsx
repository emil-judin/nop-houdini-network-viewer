import { roundedRectPath } from '../../geoHelpers';
import type { OperatorIconDef } from '../../iconTypes';
import { SolverBrain } from '../kits/solverBrain';

/**
 * Network and solver operators: the solver brain.
 */
export const NETWORK_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.objnet',
    label: 'Object Network',
    family: 'sop',
    description:
      'Dark grey cinema clapperboard with a striped open top arm, silver corner hinge and two white chalk lines.',
    types: ['objnet'],
    icons: ['networks_scene'],
    refKey: 'NETWORKS_scene',
    render: () => (
      <g strokeLinejoin="round">
        {/* Slate body */}
        <path d={roundedRectPath(3.5, 9.2, 17, 11.2, 1.2)} fill="#5a616b" stroke="#262626" strokeWidth="1.1" />
        {/* Fixed top bar with diagonal stripes */}
        <rect x="3.5" y="9.2" width="17" height="2.4" fill="#3a3f47" stroke="#262626" strokeWidth="0.95" />
        <g fill="#f2f4f7" stroke="none">
          <polygon points="8.2,9.4 10.0,9.4 9.0,11.4 7.2,11.4" />
          <polygon points="12.4,9.4 14.2,9.4 13.2,11.4 11.4,11.4" />
          <polygon points="16.6,9.4 18.4,9.4 17.4,11.4 15.6,11.4" />
        </g>
        {/* Angled open clapper arm */}
        <g transform="rotate(-14 4.2 9.4)">
          <rect x="3.5" y="6.0" width="17" height="2.4" fill="#3a3f47" stroke="#262626" strokeWidth="1.0" />
          <g fill="#f2f4f7" stroke="none">
            <polygon points="7.8,6.2 9.6,6.2 10.6,8.2 8.8,8.2" />
            <polygon points="12.0,6.2 13.8,6.2 14.8,8.2 13.0,8.2" />
            <polygon points="16.2,6.2 18.0,6.2 19.0,8.2 17.2,8.2" />
          </g>
        </g>
        {/* Silver corner hinge */}
        <polygon points="3.5,8.2 7.4,11.6 3.5,11.6" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
        <circle cx="4.8" cy="10.4" r="0.55" fill="#262626" />
        {/* Chalk lines on slate */}
        <path
          d="M6.0,14.6 H13.5 M6.0,17.4 H16.8"
          fill="none"
          stroke="#f2f4f7"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.shopnet',
    label: 'SHOP Network',
    family: 'sop',
    description: 'Glossy shader sphere divided into red upper-left, white middle and blue lower-right curved bands.',
    types: ['shopnet'],
    icons: ['networks_shop'],
    refKey: 'NETWORKS_shop',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-clip`}>
            <circle cx="12" cy="12" r="8.6" />
          </clipPath>
          <radialGradient id={`${uid}-hl`} cx="35%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#262626" stopOpacity="0.24" />
          </radialGradient>
        </defs>
        <g clipPath={`url(#${uid}-clip)`}>
          <rect x="3" y="3" width="18" height="18" fill="#ffffff" />
          <path d="M3,3 H18.5 C14.5,6.5 11.5,12.5 5.0,16.5 L3,16.5 Z" fill="#e03228" />
          <path d="M21,7.2 C16.2,10.2 13.8,16.0 7.2,21 H21 Z" fill="#3672c4" />
          <circle cx="12" cy="12" r="8.6" fill={`url(#${uid}-hl)`} />
        </g>
        <circle cx="12" cy="12" r="8.6" fill="none" stroke="#262626" strokeWidth="1.1" />
      </>
    ),
  },
  {
    id: 'sop.topnet',
    label: 'TOP Geometry',
    family: 'sop',
    description: 'Tilted dark grey top hat with a bright yellow-gold band around the crown base.',
    types: ['topnet', 'topnetmgr'],
    icons: ['networks_top', 'networks_topgeometry'],
    refKey: 'NETWORKS_topgeometry',
    render: () => (
      <g transform="rotate(-7 12 12)" strokeLinejoin="round">
        {/* Brim */}
        <ellipse cx="12" cy="16.4" rx="9.0" ry="3.1" fill="#5a616b" stroke="#262626" strokeWidth="1.1" />
        {/* Crown */}
        <path
          d="M6.2,6.0 L7.1,16.0 C7.1,17.2 16.9,17.2 16.9,16.0 L17.8,6.0 Z"
          fill="#5a616b"
          stroke="#262626"
          strokeWidth="1.1"
        />
        <path d="M8.0,7.2 L8.6,12.6" fill="none" stroke="#89929e" strokeWidth="1.6" strokeLinecap="round" />
        {/* Gold-yellow band */}
        <path
          d="M6.9,13.0 C6.9,14.3 17.1,14.3 17.1,13.0 L16.9,16.0 C16.9,17.3 7.1,17.3 7.1,16.0 Z"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="0.9"
        />
        {/* Crown top */}
        <ellipse cx="12" cy="6.0" rx="5.8" ry="1.9" fill="#89929e" stroke="#262626" strokeWidth="0.95" />
      </g>
    ),
  },
  {
    id: 'sop.vopnet',
    label: 'VOP Network',
    family: 'sop',
    description:
      'Chunky beveled V emblem with purple upper arms, a red-orange lower fire base and yellow flames licking up both arms.',
    types: ['vopnet'],
    icons: ['networks_vop'],
    refKey: 'NETWORKS_vop',
    render: (uid) => (
      <g strokeLinejoin="round">
        <defs>
          <clipPath id={`${uid}-vclip`}>
            <polygon points="3.0,5.2 6.8,3.2 9.6,4.8 12.0,10.6 14.4,4.8 17.2,3.2 21.0,5.2 12.0,21.2" />
          </clipPath>
        </defs>
        {/* Clipped V interior: purple upper arms, red-orange lower fire, yellow flame tongues */}
        <g clipPath={`url(#${uid}-vclip)`}>
          <rect x="2" y="2" width="20" height="20" fill="#9b66d4" />
          {/* Yellow outer flame silhouette */}
          <path
            d="M3.5,11.0 L6.8,13.6 L7.6,9.2 L10.2,13.4 L12.0,10.4 L13.8,13.4 L16.4,9.2 L17.2,13.6 L20.5,11.0 L12.0,21.5 Z"
            fill="#ffe47a"
          />
          {/* Red-orange inner fire */}
          <path
            d="M5.2,13.5 L8.0,15.2 L9.0,12.4 L11.0,15.0 L12.0,13.0 L13.0,15.0 L15.0,12.4 L16.0,15.2 L18.8,13.5 L12.0,21.5 Z"
            fill="#e03228"
          />
          {/* Gold-yellow beveled rim */}
          <polygon
            points="3.0,5.2 6.8,3.2 9.6,4.8 12.0,10.6 14.4,4.8 17.2,3.2 21.0,5.2 12.0,21.2"
            fill="none"
            stroke="#f2c438"
            strokeWidth="2.0"
          />
        </g>
        {/* Outer dark outline */}
        <polygon
          points="3.0,5.2 6.8,3.2 9.6,4.8 12.0,10.6 14.4,4.8 17.2,3.2 21.0,5.2 12.0,21.2"
          fill="none"
          stroke="#262626"
          strokeWidth="1.05"
        />
      </g>
    ),
  },
  {
    id: 'sop.solver',
    label: 'Solver',
    family: 'sop',
    description: 'Pink solver brain behind a deep red sphere and a yellow cone in the lower-right foreground.',
    types: ['solver'],
    icons: ['sop_solver'],
    refKey: 'SOP_solver',
    render: (uid) => (
      <g strokeLinejoin="round">
        <defs>
          <radialGradient id={`${uid}-redball`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ff7066" />
            <stop offset="35%" stopColor="#e03228" />
            <stop offset="100%" stopColor="#a81f18" />
          </radialGradient>
        </defs>
        <SolverBrain cx={9.4} cy={8.6} scale={0.92} />
        <circle cx={17.2} cy={14.5} r={3.5} fill={`url(#${uid}-redball)`} stroke="#262626" strokeWidth="1.0" />
        {/* Yellow 3D cone */}
        <path
          d="M13.2,11.2 L9.4,18.8 C9.4,20.2 17.0,20.2 17.0,18.8 Z"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="1.0"
        />
        <path d="M13.2,11.2 L9.4,18.8 C9.4,19.7 11.8,20.0 13.2,19.9 Z" fill="#ffe47a" />
        <path d="M13.2,11.2 L9.4,18.8 C9.4,20.2 17.0,20.2 17.0,18.8 Z" fill="none" stroke="#262626" strokeWidth="1.0" />
      </g>
    ),
  },
  {
    id: 'sop.script',
    label: 'Script',
    family: 'sop',
    description: 'Single accordion-folded white paper sheet displaying green node-graph flowcharts.',
    types: [],
    icons: ['sop_script'],
    refKey: 'SOP_script',
    render: () => (
      <g strokeLinejoin="round">
        {/* Left white panel */}
        <polygon points="2.8,5.6 9.6,4.0 11.2,14.8 4.4,16.4" fill="#ffffff" stroke="#262626" strokeWidth="1.0" />
        {/* Shaded middle fold flap connecting left and right panels */}
        <polygon points="9.6,4.0 12.2,8.4 13.8,19.2 11.2,14.8" fill="#c0c7d1" stroke="#262626" strokeWidth="1.0" />
        {/* Right white panel */}
        <polygon points="12.2,8.4 19.6,6.4 21.2,17.2 13.8,19.2" fill="#ffffff" stroke="#262626" strokeWidth="1.0" />
        {/* Flowchart on left panel */}
        <path d="M6.4,7.6 L7.8,11.8" fill="none" stroke="#262626" strokeWidth="0.75" />
        <rect x="5.0" y="6.4" width="2.6" height="2.0" fill="#58c848" stroke="#262626" strokeWidth="0.65" />
        <rect x="6.5" y="10.8" width="2.6" height="2.0" fill="#58c848" stroke="#262626" strokeWidth="0.65" />
        {/* Flowchart on right panel */}
        <path d="M16.0,10.6 L15.0,14.8 M16.0,10.6 L18.2,14.2" fill="none" stroke="#262626" strokeWidth="0.75" />
        <rect x="14.6" y="9.2" width="2.7" height="2.0" fill="#58c848" stroke="#262626" strokeWidth="0.65" />
        <rect x="13.6" y="13.8" width="2.5" height="2.0" fill="#58c848" stroke="#262626" strokeWidth="0.65" />
        <rect x="17.0" y="13.0" width="2.5" height="2.0" fill="#58c848" stroke="#262626" strokeWidth="0.65" />
      </g>
    ),
  },
  {
    id: 'sop.unix',
    label: 'Unix Command',
    family: 'sop',
    description: 'Rounded metallic grey terminal monitor with a dark screen, white prompt and green indicator dot.',
    types: ['unix'],
    icons: ['sop_unix'],
    refKey: 'SOP_unix',
    render: () => (
      <g strokeLinejoin="round">
        <path d={roundedRectPath(3.0, 4.2, 18.0, 15.6, 2.2)} fill="#c0c7d1" stroke="#262626" strokeWidth="1.1" />
        <path d={roundedRectPath(4.8, 6.0, 14.4, 10.8, 1.0)} fill="#445c38" stroke="#262626" strokeWidth="0.9" />
        <path
          d="M7.0,9.2 L10.2,11.2 L7.0,13.2 M11.4,13.6 H15.4"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="17.8" cy="18.2" r="0.85" fill="#58c848" stroke="#262626" strokeWidth="0.65" />
      </g>
    ),
  },
  {
    id: 'sop.copnet',
    label: 'COP Network',
    family: 'sop',
    description: 'Three isometric compositing image planes stacked diagonally from back-right to front-left.',
    types: ['copnet'],
    icons: ['networks_cop'],
    refKey: 'NETWORKS_cop',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="12.5,3.5 20.5,7.5 20.5,15.5 12.5,11.5" fill="#e03228" />
        <polygon points="8,6 16,10 16,18 8,14" fill="#eef2f7" fillOpacity="0.85" />
        <ellipse cx="12" cy="12" rx="2.5" ry="1.4" fill="#9b66d4" strokeWidth="0.8" />
        <polygon points="3.5,8.5 11.5,12.5 11.5,20.5 3.5,16.5" fill="#5aa2f2" fillOpacity="0.85" />
        <circle cx="7.5" cy="14.5" r="2" fill="#ee8624" strokeWidth="0.8" />
      </g>
    ),
  },
  {
    id: 'sop.ropnet',
    label: 'ROP Network',
    family: 'sop',
    description: 'Tilted metallic silver cinema film reel with circular spool cutouts and a central spindle hub.',
    types: ['ropnet'],
    icons: ['networks_rop'],
    refKey: 'NETWORKS_rop',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-rop-face`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        <ellipse cx="12" cy="19.2" rx="8.6" ry="2.4" fill="#262626" fillOpacity="0.22" />
        {/* Reel rim depth */}
        <ellipse
          cx="12"
          cy="12.6"
          rx="8.8"
          ry="7.6"
          transform="rotate(-12 12 12.6)"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1"
        />
        {/* Metallic silver front disc */}
        <ellipse
          cx="11.6"
          cy="10.8"
          rx="8.6"
          ry="7.4"
          transform="rotate(-12 11.6 10.8)"
          fill={`url(#${uid}-rop-face)`}
          stroke="#262626"
          strokeWidth="1"
        />
        {/* Five reel cutouts */}
        <g fill="#5a616b" stroke="#262626" strokeWidth="0.7">
          <circle cx="11.4" cy="6.4" r="1.45" />
          <circle cx="15.8" cy="9.2" r="1.45" />
          <circle cx="14.2" cy="14" r="1.45" />
          <circle cx="8.8" cy="14" r="1.45" />
          <circle cx="7.2" cy="9.2" r="1.45" />
        </g>
        {/* Center spindle */}
        <circle cx="11.6" cy="10.8" r="1.45" fill="#eef2f7" stroke="#262626" strokeWidth="0.85" />
      </>
    ),
  },
  {
    id: 'sop.ripplesolver',
    label: 'Ripple Solver',
    family: 'sop',
    description: 'Translucent blue rippled water container block cradling a pink solver brain.',
    types: ['ripplesolver'],
    icons: ['sop_ripplesolver'],
    refKey: 'SOP_ripplesolver',
    render: () => (
      <g strokeLinejoin="round">
        {/* Back/top water rim behind brain */}
        <polygon points="3,12.5 12,8.4 21,12.5 12,16.6" fill="#8fc2ff" stroke="#262626" strokeWidth="0.95" />
        {/* Pink symmetrical solver brain nestled on water */}
        <ellipse cx="12" cy="10.2" rx="6.2" ry="5" fill="#f7c8ca" stroke="#262626" strokeWidth="1" />
        <path
          d="M12,5.4 V14.8 M7.4,8.6 C9,7.4 10.6,8.4 10.4,10 M16.6,8.6 C15,7.4 13.4,8.4 13.6,10 M7.8,12 C9.4,11 10.8,12 10.2,13.6 M16.2,12 C14.6,11 13.2,12 13.8,13.6"
          fill="none"
          stroke="#d07478"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
        {/* Translucent front water walls with undulating wave rim */}
        <path
          d="M3,12.5 C6,13.6 9,15.6 12,16.6 L12,21.4 L3,16.8 Z"
          fill="#5aa2f2"
          fillOpacity="0.88"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path
          d="M12,16.6 C15,15.6 18,13.6 21,12.5 L21,16.8 L12,21.4 Z"
          fill="#3672c4"
          fillOpacity="0.92"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path
          d="M5,14.8 C8,16.2 10,17.4 12,17.8 C14,17.4 16,16.2 19,14.8"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="0.85"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.shallowwatersolver',
    label: 'Shallow Water Solver',
    family: 'sop',
    description:
      'Flat glossy sky-blue shallow water splash puddle with specular wave highlights and small detached droplets.',
    types: ['shallowwatersolver'],
    icons: ['sop_shallowwatersolver'],
    refKey: 'SOP_shallowwatersolver',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-sw-pool`} cx="45%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#c4e3ff" />
            <stop offset="55%" stopColor="#5aa2f2" />
            <stop offset="100%" stopColor="#2e74c4" />
          </radialGradient>
        </defs>
        {/* Flat perspective splash puddle */}
        <path
          d="M4.8,11.2 C7.8,9.2 13.8,9.4 16.6,11.4 C18.8,13 21.8,12.2 21.6,15.2 C21.4,17.6 17.2,18.6 14.2,17.8 C11.4,17.2 9.4,19.4 6.2,18.4 C2.8,17.4 1.8,13.2 4.8,11.2 Z"
          fill={`url(#${uid}-sw-pool)`}
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <ellipse
          cx="12.2"
          cy="14.2"
          rx="4.8"
          ry="1.8"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="0.7"
          strokeOpacity="0.7"
        />
        <ellipse cx="10" cy="13" rx="2" ry="0.7" fill="#ffffff" fillOpacity="0.85" />
        {/* Two small splash droplets */}
        <circle cx="3.8" cy="18.6" r="1.1" fill="#5aa2f2" stroke="#262626" strokeWidth="0.75" />
        <circle cx="19.8" cy="10.4" r="0.95" fill="#8fc2ff" stroke="#262626" strokeWidth="0.7" />
      </>
    ),
  },
];
