import type { OperatorIconDef } from '../../../iconTypes';
import { IsoCube, PackedTray, TigerCube } from './sharedElements';

/**
 * Batch 2, Part 2 (icons 20 to 29): built-in Houdini SOP icons under review.
 */
export const BATCH_02_PART_2: OperatorIconDef[] = [
  {
    id: 'sop.matnet',
    label: 'Material Network',
    family: 'sop',
    description:
      'Cluster of five small isometric material cubes: yellow at the back, red on the left, metallic grey on the right, blue in front, and the tiger-striped Material cube in the middle.',
    types: ['matnet'],
    icons: ['networks_mat'],
    refKey: 'NETWORKS_mat',
    render: (uid) => (
      <>
        <IsoCube uid={uid} name="y" x={12} y={1.6} w={4.6} h={4.8} colors={{ top: '#ffe47a', left: '#f2c438', right: '#d49a18' }} strokeWidth={0.85} />
        <IsoCube uid={uid} name="r" x={6.6} y={7.2} w={4.4} h={4.6} colors={{ top: '#ff7066', left: '#e03228', right: '#a81f18' }} strokeWidth={0.85} />
        <IsoCube uid={uid} name="g" x={17.4} y={7.2} w={4.4} h={4.6} colors={{ top: '#eef2f7', left: '#c0c7d1', right: '#89929e' }} strokeWidth={0.85} />
        <TigerCube uid={uid} name="t" x={12} y={6.4} w={4.8} h={5.2} />
        <IsoCube uid={uid} name="b" x={12} y={12.6} w={4.4} h={4.6} colors={{ top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4' }} strokeWidth={0.85} />
      </>
    ),
  },
  {
    id: 'sop.mdd',
    label: 'MDD',
    family: 'sop',
    description:
      'Perspective grey cube with four red point-cache motion arrows radiating from its corners.',
    types: ['mdd'],
    icons: ['sop_mdd'],
    refKey: 'SOP_mdd',
    render: () => (
      <>
        <g stroke="#eeeeec" strokeWidth="1.9" strokeLinecap="round">
          <line x1="6.8" y1="7.8" x2="3.2" y2="3.6" />
          <line x1="14.2" y1="6.2" x2="15.4" y2="2.6" />
          <line x1="17.8" y1="9.6" x2="21.4" y2="7.2" />
          <line x1="11.4" y1="17.8" x2="9.8" y2="21.6" />
        </g>
        <polygon
          points="6.8,7.8 14.2,6.2 17.8,9.6 11.4,11.8"
          fill="#efefef"
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="6.8,7.8 7.8,15.2 11.4,17.8 11.4,11.8"
          fill="#c7c7c7"
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="11.4,11.8 17.8,9.6 16.6,16.2 11.4,17.8"
          fill="#979797"
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <g stroke="#cc0000" strokeWidth="1.05" strokeLinecap="round">
          <line x1="6.8" y1="7.8" x2="3.5" y2="4" />
          <line x1="14.2" y1="6.2" x2="15.2" y2="3" />
          <line x1="17.8" y1="9.6" x2="21" y2="7.5" />
          <line x1="11.4" y1="17.8" x2="10" y2="21.2" />
        </g>
        <g fill="#cc0000">
          <polygon points="2.5,2.8 5,3.6 3.2,5.2" />
          <polygon points="15.6,1.8 16.5,4 14.2,3.4" />
          <polygon points="22,6.8 20.8,8.8 19.6,7" />
          <polygon points="9.4,22.2 9,19.8 11.2,20.6" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.measure',
    label: 'Measure',
    family: 'sop',
    description:
      'Silver and red retractable tape measure with a yellow graduated measuring strip pulled out to the right.',
    types: ['measure'],
    icons: ['sop_measure', 'sop_measure-2.0'],
    refKey: 'SOP_measure',
    render: () => (
      <>
        <path
          d="M2.5,13.6 L2.5,8 C2.5,4.8 4.8,3 7.8,2.6 L11.5,2.2 C14.6,2.8 16.2,6.2 16.2,10.2 L16.2,16.4 L10.8,17.8 Z"
          fill="#d3d7cf"
          stroke="#2e3436"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M2.5,13.6 L10.8,17.8 L10.8,11.2 C10.8,7.2 9.2,3.8 6.2,3 C3.8,3.4 2.5,5.2 2.5,8 Z"
          fill="#eeeeec"
          stroke="#555753"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <ellipse
          cx="6.6"
          cy="10.6"
          rx="2.3"
          ry="3.4"
          fill="#ef2929"
          stroke="#888a85"
          strokeWidth="0.7"
        />
        <polygon
          points="11.2,16.5 15.8,15.3 21.8,18.2 17.2,19.6"
          fill="#fce94f"
          stroke="#987c00"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <g stroke="#2e3436" strokeWidth="0.55">
          <line x1="13.2" y1="16" x2="11.8" y2="16.4" />
          <line x1="15.2" y1="16.9" x2="13.6" y2="17.4" />
          <line x1="17.2" y1="17.8" x2="15.6" y2="18.3" />
          <line x1="19.2" y1="18.7" x2="17.6" y2="19.2" />
        </g>
        <polygon
          points="17.2,19.6 21.8,18.2 21.8,19.6 17.2,21"
          fill="#babdb6"
          stroke="#2e3436"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.measurethickness',
    label: 'Measure Thickness',
    family: 'sop',
    description:
      'Metallic outside calipers with a top pivot ring and curved jaws pinching inward at the base.',
    types: ['measurethickness'],
    icons: ['sop_measurethickness'],
    refKey: 'SOP_measurethickness',
    render: () => (
      <>
        <ellipse cx="12.5" cy="20.4" rx="6.2" ry="1.8" fill="#262626" fillOpacity="0.28" />
        <g
          fill="#d3d7cf"
          stroke="#2e3436"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11.2,4.2 C11.2,2.9 13.4,2.9 13.4,4.2 L13.4,6.4 L11.2,6.4 Z" />
          <path d="M11.6,7.4 C8.2,9.8 6.8,14.8 9.8,19.4 L11.2,18.8 C8.8,15 9.8,11 12.2,8.8 Z" />
          <path d="M13,7.4 C16.4,9.8 17.8,14.8 14.8,19.4 L13.4,18.8 C15.8,15 14.8,11 12.4,8.8 Z" />
          <circle cx="12.3" cy="7.2" r="2" fill="#babdb6" />
        </g>
        <circle cx="12.3" cy="7.2" r="0.75" fill="#2e3436" />
        <line x1="10.2" y1="19.4" x2="14.4" y2="19.4" stroke="#ef2929" strokeWidth="0.85" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.mergepacked',
    label: 'Merge Packed',
    family: 'sop',
    description:
      'Two grey packed trays joined side by side, each receiving a pair of purple, white and blue packed tiles through a green down arrow.',
    types: ['mergepacked'],
    icons: ['sop_mergepacked'],
    refKey: 'SOP_mergepacked',
    render: (uid) => {
      const tile = (x: number, y: number, fill: string) => (
        <g strokeLinejoin="round">
          <polygon points={`${x - 2.8},${y} ${x},${y + 1.4} ${x},${y + 2.2} ${x - 2.8},${y + 0.8}`} fill="#89929e" stroke="#262626" strokeWidth="0.6" />
          <polygon points={`${x},${y + 1.4} ${x + 2.8},${y} ${x + 2.8},${y + 0.8} ${x},${y + 2.2}`} fill="#5a616b" stroke="#262626" strokeWidth="0.6" />
          <polygon points={`${x - 2.8},${y} ${x},${y - 1.4} ${x + 2.8},${y} ${x},${y + 1.4}`} fill={fill} stroke="#262626" strokeWidth="0.8" />
        </g>
      );
      const arrow = (x: number, y0: number, y1: number) => (
        <polygon
          points={`${x - 0.75},${y0} ${x + 0.75},${y0} ${x + 0.75},${y1 - 2} ${x + 1.9},${y1 - 2} ${x},${y1} ${x - 1.9},${y1 - 2} ${x - 0.75},${y1 - 2}`}
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      );
      return (
        <>
          <PackedTray uid={uid} name="a" cx={8.4} cy={14.1} w={5.8} />
          <PackedTray uid={uid} name="b" cx={14.2} cy={17} w={5.8} />
          {tile(4.8, 4.6, '#c084d8')}
          {tile(7.9, 3.05, '#eef2f7')}
          {tile(15.6, 6.8, '#8fc2ff')}
          {tile(18.7, 5.25, '#c084d8')}
          {arrow(6.6, 7, 12.8)}
          {arrow(14.6, 9.2, 15.6)}
        </>
      );
    },
  },
  {
    id: 'sop.metaball',
    label: 'Metaball',
    family: 'sop',
    description: 'Two glossy blue spheres fused together by a smooth organic metaball bridge.',
    types: ['metaball'],
    icons: ['sop_metaball'],
    refKey: 'SOP_metaball',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-mb-g1`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#fbfdff" />
            <stop offset="45%" stopColor="#8bafe5" />
            <stop offset="100%" stopColor="#00419e" />
          </radialGradient>
        </defs>
        <path
          d="M7.2,3 C10,3 11.6,4.8 12.4,6.8 C13,8.2 13.6,8.8 15.2,8.5 C16,8.3 16.8,8.2 17.4,8.2 C20.4,8.2 22.2,10.5 22.2,13.5 C22.2,16.6 19.8,19 16.8,19 C14.2,19 12.5,17.2 11.6,15 C11,13.4 10.2,12.8 8.4,13.2 C7.9,13.3 7.5,13.4 7,13.4 C4.1,13.4 2,11.1 2,8.2 C2,5.3 4.3,3 7.2,3 Z"
          fill={`url(#${uid}-mb-g1)`}
          stroke="#132c51"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <ellipse cx="5.8" cy="6.2" rx="1.8" ry="1.2" fill="#ffffff" fillOpacity="0.7" transform="rotate(-25 5.8 6.2)" />
        <ellipse cx="15.8" cy="11.4" rx="2" ry="1.3" fill="#ffffff" fillOpacity="0.65" transform="rotate(-25 15.8 11.4)" />
      </>
    ),
  },
  {
    id: 'sop.metagroups',
    label: 'MetaGroups',
    family: 'sop',
    description:
      'Two distinct metaball groups: a green fused pair in the upper right and a blue fused pair in the lower left.',
    types: ['metagroups'],
    icons: ['sop_metagroups'],
    refKey: 'SOP_metagroups',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mg-gr`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cbfb9d" />
            <stop offset="55%" stopColor="#7ce160" />
            <stop offset="100%" stopColor="#169e00" />
          </linearGradient>
          <linearGradient id={`${uid}-mg-bl`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4e6ff" />
            <stop offset="55%" stopColor="#729fcf" />
            <stop offset="100%" stopColor="#00419e" />
          </linearGradient>
        </defs>
        <path
          d="M10.8,5.8 C12.6,5.8 13.8,7 14.3,8.2 C14.8,9.2 15.4,9.4 16.6,9 C17.1,8.8 17.6,8.8 18.1,8.8 C20.2,8.8 21.8,10.4 21.8,12.5 C21.8,14.6 20.1,16.2 18,16.2 C16.2,16.2 15,15 14.4,13.6 C13.9,12.5 13.2,12.2 11.8,12.5 C11.4,12.6 11,12.6 10.6,12.6 C8.6,12.6 7,11 7,9.2 C7,7.3 8.7,5.8 10.8,5.8 Z"
          fill={`url(#${uid}-mg-gr)`}
          stroke="#1b5113"
          strokeWidth="0.95"
          strokeLinejoin="round"
          transform="translate(0, -3.5)"
        />
        <path
          d="M6.2,10.2 C8.2,10.2 9.5,11.5 10.1,12.9 C10.6,14 11.2,14.2 12.6,13.8 C13.1,13.6 13.7,13.6 14.2,13.6 C16.5,13.6 18.2,15.3 18.2,17.6 C18.2,19.9 16.4,21.6 14.1,21.6 C12.1,21.6 10.8,20.3 10.1,18.8 C9.6,17.6 8.8,17.2 7.3,17.6 C6.9,17.7 6.5,17.7 6,17.7 C3.8,17.7 2.2,16 2.2,13.9 C2.2,11.8 4,10.2 6.2,10.2 Z"
          fill={`url(#${uid}-mg-bl)`}
          stroke="#132c51"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.mountain',
    label: 'Mountain',
    family: 'sop',
    description: 'Faceted orange and amber mountain mesh with two jagged peaks.',
    types: ['mountain'],
    icons: ['sop_mountain'],
    refKey: 'SOP_mountain',
    render: () => (
      <>
        <g stroke="#8b3b00" strokeWidth="0.8" strokeLinejoin="round">
          <polygon points="2,14.2 6,8.8 10,14.2 6,16.4" fill="#fdbf64" />
          <polygon points="6,8.8 10,11.2 14.2,11.4 10,14.2" fill="#ffa54c" />
          <polygon points="10,11.2 14.2,8 18.2,11.6 14.2,11.4" fill="#fedba7" />
          <polygon points="14.2,11.4 18.2,11.6 22,7.6 18.2,16.4" fill="#f57900" />
          <polygon points="10,14.2 14.2,11.4 18.2,16.4 14.2,16.4" fill="#e96712" />
          <polygon points="6,16.4 10,14.2 14.2,16.4 10.2,21.2" fill="#f57900" />
          <polygon points="10.2,21.2 14.2,16.4 18.2,19.6 15,19.8" fill="#d52e0c" />
          <polygon points="14.2,16.4 18.2,16.4 22,16.4 18.2,19.6" fill="#cb1009" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.neighborsearchcl',
    label: 'Neighbor Search CL',
    family: 'sop',
    description:
      'Glowing green radial search field with concentric rings around a central yellow query point and blue neighbor dots.',
    types: ['neighborsearchcl'],
    icons: ['sop_neighborsearchcl'],
    refKey: 'SOP_neighborsearchcl',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ns-bg`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#70be3e" />
            <stop offset="65%" stopColor="#cae6b4" />
            <stop offset="100%" stopColor="#dce5cb" stopOpacity="0.15" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="10.2" fill={`url(#${uid}-ns-bg)`} />
        <circle cx="12" cy="12" r="8.2" fill="none" stroke="#8ccd55" strokeWidth="0.6" />
        <circle cx="12" cy="12" r="5.6" fill="none" stroke="#6db146" strokeWidth="0.65" />
        <circle cx="12" cy="12" r="3.4" fill="none" stroke="#4e8033" strokeWidth="0.7" />
        <circle cx="12" cy="12" r="1.4" fill="#fff55b" stroke="#ffa81f" strokeWidth="0.75" />
        <g fill="#5490c1" stroke="#152a4c" strokeWidth="0.65">
          <circle cx="9.2" cy="9.8" r="1.15" />
          <circle cx="15.2" cy="13.5" r="1.15" />
          <circle cx="14.2" cy="7.2" r="1.15" />
          <circle cx="6.2" cy="15.8" r="1.15" />
          <circle cx="18.2" cy="9.2" r="1.15" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.neuralpointsurface',
    label: 'Neural Point Surface',
    family: 'sop',
    description:
      'Translucent blue glass beaker with measurement ticks holding a glowing green neural point cloud at the bottom.',
    types: ['neuralpointsurface'],
    icons: ['sop_neuralpointsurface'],
    refKey: 'SOP_neuralpointsurface',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-nps-glass`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a6c2e0" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#6a6f8f" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <ellipse cx="13.2" cy="19.6" rx="7.8" ry="2.4" fill="#262626" fillOpacity="0.28" />
        <path
          d="M5.2,4.8 L6,18.2 C6,20.2 8.8,21.6 12,21.6 C15.2,21.6 18,20.2 18,18.2 L18.8,4.8 Z"
          fill={`url(#${uid}-nps-glass)`}
          stroke="#204a87"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <ellipse
          cx="12"
          cy="4.8"
          rx="7.2"
          ry="2.2"
          fill="#d7e6f5"
          stroke="#204a87"
          strokeWidth="0.9"
        />
        <path
          d="M7.2,15.5 C7.5,13.6 9.8,12.8 11.8,13.4 C13.5,12.5 16.2,13.5 16.6,15.6 C17,17.8 15,19.8 12,19.8 C9,19.8 7,17.8 7.2,15.5 Z"
          fill="#8ae234"
          stroke="#468a05"
          strokeWidth="0.8"
        />
        <g fill="#cbfb9d" stroke="#468a05" strokeWidth="0.45">
          <circle cx="9.5" cy="15.2" r="0.9" />
          <circle cx="12" cy="14.5" r="0.95" />
          <circle cx="14.4" cy="15.5" r="0.9" />
          <circle cx="10.6" cy="17.4" r="0.9" />
          <circle cx="13.4" cy="17.6" r="0.9" />
        </g>
        <g stroke="#ffffff" strokeWidth="0.65" strokeLinecap="round">
          <line x1="14.8" y1="8.8" x2="16.8" y2="8.8" />
          <line x1="15.2" y1="11.2" x2="16.8" y2="11.2" />
          <line x1="14.8" y1="13.6" x2="16.8" y2="13.6" />
          <line x1="15.2" y1="16" x2="16.8" y2="16" />
        </g>
      </>
    ),
  },
];
