import type { OperatorIconDef } from '../iconTypes';

/**
 * Built-in SOP icons for network flow, copying, transforming and containers.
 *
 * Original MIT-licensed drawings that follow `docs/ICON_ART_BIBLE.md`.
 */
export const SOP_FLOW_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.blast',
    label: 'Blast',
    family: 'sop',
    description:
      'Orange perspective tile floor with one dark missing tile; red and white shards burst upward out of the hole.',
    types: ['blast'],
    refKey: 'SOP_blast',
    render: () => (
      <>
        <polygon points="5,13 19,13 22.5,20.5 1.5,20.5" fill="#ee8624" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M9.7 13L8.5 20.5M14.3 13L15.5 20.5M3.3 16.6H20.7" stroke="#262626" strokeWidth="0.8" />
        <polygon points="10.2,14.2 13.8,14.2 14.3,17.6 9.7,17.6" fill="#3a2a1c" stroke="#262626" strokeWidth="0.8" />
        <polygon points="11,15 5.5,4.5 8.5,3.5" fill="#e03228" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        <polygon points="12,15 10.8,1.8 13.6,2" fill="#f2f4f7" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        <polygon points="13,15 15.5,3.5 18.5,4.5" fill="#e03228" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.block_begin',
    label: 'Block Begin',
    family: 'sop',
    description:
      'Blue brick seen from below: dark blue body, lighter bottom face with a socket ring, and a small square tab on top.',
    types: ['block_begin'],
    refKey: 'SOP_block_begin',
    render: () => (
      <>
        {/* Top tab */}
        <rect x="9" y="3" width="6" height="4.5" fill="#2e74c4" stroke="#182b49" strokeWidth="1.1" />
        {/* Brick body */}
        <polygon points="4.5,17 12,20.5 19.5,17 19.5,9.5 12,6 4.5,9.5" fill="#296ec2" stroke="#182b49" strokeWidth="1.2" strokeLinejoin="round" />
        <polygon points="19.5,9.5 12,6 12,13.5 19.5,17" fill="#1f5aa3" />
        <line x1="12" y1="6" x2="12" y2="13.5" stroke="#182b49" strokeWidth="1" />
        {/* Bottom face with socket ring */}
        <polygon points="4.5,17 12,13.5 19.5,17 12,20.5" fill="#5da4f5" stroke="#182b49" strokeWidth="1.1" strokeLinejoin="round" />
        <ellipse cx="12" cy="17" rx="3.8" ry="1.7" fill="#1f4f8a" stroke="#a8d4ff" strokeWidth="1.1" />
      </>
    ),
  },
  {
    id: 'sop.block_end',
    label: 'Block End',
    family: 'sop',
    description:
      'Blue toy brick seen from above with a round stud on top (light top face, darker sides).',
    types: ['block_end'],
    refKey: 'SOP_block_end',
    render: () => (
      <>
        <polygon points="4.5,10 12,6.5 19.5,10 19.5,17.5 12,21 4.5,17.5" fill="#296ec2" stroke="#182b49" strokeWidth="1.2" />
        <polygon points="4.5,10 12,13.5 19.5,10 12,6.5" fill="#5da4f5" />
        <line x1="12" y1="13.5" x2="12" y2="21" stroke="#182b49" strokeWidth="1" />
        <ellipse cx="12" cy="6.5" rx="3.8" ry="2" fill="#7ebcff" stroke="#182b49" strokeWidth="1.1" />
      </>
    ),
  },
  {
    id: 'sop.copytopoints',
    label: 'Copy to Points',
    family: 'sop',
    description:
      'Translucent wireframe cube with orange spheres copied onto its corner points.',
    types: ['copytopoints'],
    refKey: 'SOP_copytopoints-2.0',
    render: () => (
      <>
        <polygon points="12,4 19,8 19,16 12,20 5,16 5,8" fill="#8892a0" fillOpacity="0.35" stroke="#c8d0dc" strokeWidth="1.2" />
        <line x1="12" y1="12" x2="12" y2="20" stroke="#c8d0dc" strokeWidth="1.1" />
        <line x1="5" y1="8" x2="12" y2="12" stroke="#c8d0dc" strokeWidth="1.1" />
        <line x1="19" y1="8" x2="12" y2="12" stroke="#c8d0dc" strokeWidth="1.1" />
        <circle cx="12" cy="4" r="2.3" fill="#ee7824" stroke="#222" strokeWidth="0.9" />
        <circle cx="5" cy="8" r="2.3" fill="#ee7824" stroke="#222" strokeWidth="0.9" />
        <circle cx="19" cy="8" r="2.3" fill="#ee7824" stroke="#222" strokeWidth="0.9" />
        <circle cx="12" cy="12" r="2.3" fill="#ee7824" stroke="#222" strokeWidth="0.9" />
        <circle cx="12" cy="20" r="2" fill="#b8c0cc" stroke="#222" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.copyxform',
    label: 'Copy and Transform',
    family: 'sop',
    description:
      'Three grey spheres shrinking from left to right, each a transformed copy of the previous one.',
    types: ['copyxform'],
    icons: ['sop_duplicate'],
    refKey: 'SOP_copyxform',
    render: () => (
      <>
        <circle cx="7.5" cy="12" r="5.2" fill="#dce2ec" stroke="#262626" strokeWidth="1.2" />
        <circle cx="14.5" cy="13" r="3.8" fill="#c2cad6" stroke="#262626" strokeWidth="1.2" />
        <circle cx="19.5" cy="14" r="2.4" fill="#9ea8b6" stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'sop.findshortestpath',
    label: 'Find Shortest Path',
    family: 'sop',
    description:
      'Folded three-panel green map with a dotted white route that ends at a dark X.',
    types: ['findshortestpath'],
    refKey: 'SOP_findshortestpath',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="3,6 9,4 9.5,18 3.5,20" fill="#b9d39a" />
          <polygon points="9,4 15,6 15.5,20 9.5,18" fill="#9cc27a" />
          <polygon points="15,6 21,4 21,18 15.5,20" fill="#b9d39a" />
        </g>
        <path d="M5 9C8 9 7 14 10.5 13.5C13.5 13 13 9 16.5 10" fill="none" stroke="#262626" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M5 9C8 9 7 14 10.5 13.5C13.5 13 13 9 16.5 10" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="1.4 1.2" />
        <path d="M16.6 9.1L19.6 12.1M19.6 9.1L16.6 12.1" stroke="#262626" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.matchaxis',
    label: 'Match Axis',
    family: 'sop',
    description:
      'Black axis arrow and red arrow pivoting around a white center point, joined by a dashed grey rotation arc.',
    types: ['matchaxis'],
    refKey: 'SOP_matchaxis',
    render: () => (
      <>
        <path d="M16.8 8.7A6.5 6.5 0 1 1 7.5 17.4" fill="none" stroke="#4a4a4a" strokeWidth="1.6" strokeDasharray="2 1.4" />
        <line x1="13" y1="14" x2="18.4" y2="6.6" stroke="#1e1e1e" strokeWidth="2.2" />
        <polygon points="20.6,3.6 16.4,5.6 20,8.2" fill="#1e1e1e" strokeLinejoin="round" />
        <line x1="13" y1="14" x2="6.3" y2="18.1" stroke="#e03228" strokeWidth="2.2" />
        <polygon points="3.6,19.8 5.3,16.4 7.4,19.8" fill="#e03228" stroke="#262626" strokeWidth="0.8" strokeLinejoin="round" />
        <circle cx="13" cy="14" r="1.9" fill="#ffffff" stroke="#1e1e1e" strokeWidth="1.4" />
      </>
    ),
  },
  {
    id: 'sop.matchsize',
    label: 'Match Size',
    family: 'sop',
    description:
      'Grey rectangle and triangle fitted inside a green bounding box.',
    types: ['matchsize'],
    refKey: 'SOP_matchsize',
    render: () => (
      <>
        <rect x="4" y="6" width="16" height="12" fill="#8892a0" fillOpacity="0.25" stroke="#62d648" strokeWidth="1.5" />
        <rect x="6" y="8" width="5" height="8" fill="#d0d6e0" stroke="#222" strokeWidth="1" />
        <polygon points="15.5,8 18.5,16 12.5,16" fill="#b8c0cc" stroke="#222" strokeWidth="1" />
      </>
    ),
  },
  {
    id: 'sop.merge',
    label: 'Merge',
    family: 'sop',
    description:
      'Large white teacup at the top-left and a big teacup on a saucer at the center-right, a lone saucer at the bottom-left, and two thick red arrows (dark red edges) curving from the top cup and the bottom saucer into the middle cup.',
    types: ['merge'],
    refKey: 'SOP_merge',
    sizePx: 22,
    render: (uid) => {
      const handle = (d: string) => (
        <>
          <path d={d} fill="none" stroke="#3a3a3a" strokeWidth="1.3" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#dfe4ea" strokeWidth="0.55" strokeLinecap="round" />
        </>
      );
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-china`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#d6dae0" />
              <stop offset="100%" stopColor="#8a9098" />
            </linearGradient>
            <linearGradient id={`${uid}-saucer`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#b4bac2" />
            </linearGradient>
          </defs>
          <g transform="translate(12 12) scale(0.92) translate(-12 -12)" strokeLinejoin="round">
            {/* Top-left cup (no saucer) */}
            {handle('M10.4 1.8C12.6 0.2 14 1.5 12.9 3.4C12.3 4.4 11.1 4.9 9.8 5.1')}
            <path d="M3.6 6.2L3.3 7.1H8L7.6 6.2Z" fill="#9aa0a8" stroke="#3a3a3a" strokeWidth="0.5" />
            <path d="M0.3 1.2C0.3 4.3 2.2 6.1 4.2 6.3H7C9 6.1 10.8 4.3 10.8 1.2Z" fill={`url(#${uid}-china)`} stroke="#3a3a3a" strokeWidth="0.6" />
            <ellipse cx="5.55" cy="1.2" rx="5.25" ry="0.75" fill="#f4f6f9" stroke="#3a3a3a" strokeWidth="0.5" />

            {/* Middle cup on its saucer */}
            <ellipse cx="14" cy="15.7" rx="8" ry="1.8" fill={`url(#${uid}-saucer)`} stroke="#3a3a3a" strokeWidth="0.6" />
            {handle('M19.9 9.9C22.5 8.6 24 10.1 23.1 12C22.5 13.2 21 13.8 19.3 13.8')}
            <path d="M12.2 16.2L11.8 17H16.2L15.8 16.2Z" fill="#9aa0a8" stroke="#3a3a3a" strokeWidth="0.5" />
            <path d="M7.6 9.3C7.6 13.1 10 16.1 12.6 16.3H15.4C18 16.1 20.4 13.1 20.4 9.3Z" fill={`url(#${uid}-china)`} stroke="#3a3a3a" strokeWidth="0.6" />
            <ellipse cx="14" cy="9.3" rx="6.4" ry="0.85" fill="#f4f6f9" stroke="#3a3a3a" strokeWidth="0.5" />

            {/* Lone saucer at the bottom-left */}
            <ellipse cx="6.6" cy="21.7" rx="6.3" ry="1.6" fill={`url(#${uid}-saucer)`} stroke="#3a3a3a" strokeWidth="0.6" />
            <ellipse cx="6.6" cy="21.8" rx="2.6" ry="0.5" fill="#e4e8ee" stroke="#9aa0a8" strokeWidth="0.3" />

            {/* Thick red merge arrows */}
            <path d="M7.2 2.7C9.6 2.5 11.4 3.4 12.4 5.6" fill="none" stroke="#5a0808" strokeWidth="3.1" strokeLinecap="round" />
            <path d="M7.2 2.7C9.6 2.5 11.4 3.4 12.4 5.6" fill="none" stroke="#d01818" strokeWidth="2.2" strokeLinecap="round" />
            <polygon points="16.3,4.8 8.8,7.2 14.3,9.4" fill="#d01818" stroke="#5a0808" strokeWidth="0.6" />
            <path d="M7.2 21.8C9.4 21.6 11.6 20.8 13 19.6" fill="none" stroke="#5a0808" strokeWidth="3.1" strokeLinecap="round" />
            <path d="M7.2 21.8C9.4 21.6 11.6 20.8 13 19.6" fill="none" stroke="#d01818" strokeWidth="2.2" strokeLinecap="round" />
            <polygon points="15.2,17.1 10.9,18.6 16,21.1" fill="#d01818" stroke="#5a0808" strokeWidth="0.6" />
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.null',
    label: 'Null',
    family: 'sop',
    description:
      'Dark grey disc with a dashed light rim and a soft blue center.',
    types: ['null'],
    refKey: 'SOP_null',
    render: () => (
      <>
        <circle cx="12" cy="12" r="7.2" fill="#525862" stroke="#e6e6e6" strokeWidth="2.2" strokeDasharray="2 1.6" />
        <circle cx="12" cy="12" r="4" fill="#9cb2c9" fillOpacity="0.5" />
      </>
    ),
  },
  {
    id: 'sop.output',
    label: 'Output',
    family: 'sop',
    description:
      'Black-and-white checkered racing flag waving on a light metal pole.',
    types: ['output'],
    refKey: 'SOP_output',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-flag`}>
            <path d="M5.5 3.8C9 1.8 12 5 15 4C17.5 3.2 19.5 4 21 5L19.5 14C18 13 16 14.5 13 15C10 15.5 8.5 13.5 7.3 13.3Z" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-flag)`}>
          <rect x="4" y="0" width="19" height="17" fill="#ffffff" />
          <g transform="translate(5.5 2) skewY(6)" fill="#1e1e1e">
            <rect x="0" y="0" width="4" height="4" />
            <rect x="8" y="0" width="4" height="4" />
            <rect x="4" y="4" width="4" height="4" />
            <rect x="12" y="4" width="4" height="4" />
            <rect x="0" y="8" width="4" height="4" />
            <rect x="8" y="8" width="4" height="4" />
          </g>
        </g>
        <path
          d="M5.5 3.8C9 1.8 12 5 15 4C17.5 3.2 19.5 4 21 5L19.5 14C18 13 16 14.5 13 15C10 15.5 8.5 13.5 7.3 13.3Z"
          fill="none"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Flag pole */}
        <line x1="5.2" y1="3" x2="8.5" y2="21.5" stroke="#262626" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="5.2" y1="3" x2="8.5" y2="21.5" stroke="#c0c7d1" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.scatter',
    label: 'Scatter',
    family: 'sop',
    description:
      'Light grey plane covered with scattered yellow points with dark outlines.',
    types: ['scatter'],
    refKey: 'SOP_scatter-2.0',
    render: () => (
      <>
        <polygon points="12,6 22,12.5 12,19 2,12.5" fill="#eef2f7" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        {[
          [12, 8.4],
          [8, 11],
          [15.8, 10.4],
          [5, 12.6],
          [19, 12.6],
          [11.2, 13],
          [14.8, 14.4],
          [9, 15.3],
          [12, 17],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="#f5d33a" stroke="#262626" strokeWidth="0.9" />
        ))}
      </>
    ),
  },
  {
    id: 'sop.split',
    label: 'Split',
    family: 'sop',
    description:
      'Yellow diamond road sign with black arrows that fork.',
    types: ['split'],
    refKey: 'SOP_split',
    sizePx: 22,
    render: () => (
      <>
        <polygon
          points="12,1.8 22.2,12 12,22.2 1.8,12"
          fill="#e5c329"
          stroke="#232323"
          strokeWidth="1.3"
        />
        <path
          d="M10.5,5.5V16M10.5,10.5L16,13.5"
          fill="none"
          stroke="#141414"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <polygon points="10.5,18.8 7.5,14.5 13.5,14.5" fill="#141414" />
        <polygon points="18.2,14.8 14,15.4 16,11.2" fill="#141414" />
      </>
    ),
  },
  {
    id: 'sop.subnet',
    label: 'Subnetwork / Custom HDA',
    family: 'sop',
    description:
      'Open cardboard box with flaps folded outward and a dark interior: the container for subnetworks and custom HDAs.',
    types: ['subnet'],
    refKey: 'SOP_subnet',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          {/* Back flap */}
          <polygon points="6.5,7 17.5,7 16.5,3 7.5,3" fill="#e8b55a" />
          {/* Dark interior */}
          <polygon points="6.5,7 17.5,7 19.5,10 4.5,10" fill="#7a4f16" />
          {/* Side flaps */}
          <polygon points="6.5,7 4.5,10 1,8.5 2.5,5.5" fill="#f0c574" />
          <polygon points="17.5,7 19.5,10 23,8.5 21.5,5.5" fill="#e2ac50" />
          {/* Box front */}
          <polygon points="4.5,10 19.5,10 19.5,20.5 4.5,20.5" fill="#d99b38" />
          {/* Front flap folded down */}
          <polygon points="4.5,10 19.5,10 18.5,13 5.5,13" fill="#f5d08a" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.switch',
    label: 'Switch',
    family: 'sop',
    description:
      'Three indicator lights (two grey, one lit red) above a slider switch with a ribbed knob pushed to the right.',
    types: ['switch'],
    refKey: 'SOP_switch',
    render: () => (
      <>
        <circle cx="8" cy="5.5" r="1.7" fill="#6a717c" stroke="#262626" strokeWidth="1" />
        <circle cx="12" cy="5.5" r="1.7" fill="#6a717c" stroke="#262626" strokeWidth="1" />
        <circle cx="16" cy="5.5" r="2.6" fill="#ffb070" fillOpacity="0.55" />
        <circle cx="16" cy="5.5" r="1.7" fill="#ee5a24" stroke="#262626" strokeWidth="1" />
        <rect x="2.5" y="10.5" width="19" height="8" rx="2" fill="#c0c7d1" stroke="#262626" strokeWidth="1.3" />
        <rect x="4.5" y="13.4" width="6" height="2.2" fill="#3a3f47" />
        <rect x="11.5" y="10" width="10" height="9" rx="2" fill="#dfe4ea" stroke="#262626" strokeWidth="1.6" />
        <path d="M14.5 12V17M16.5 12V17M18.5 12V17" stroke="#89929e" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'sop.xform',
    label: 'Transform',
    family: 'sop',
    description:
      'Three-tone grey cube standing on four chunky blue arrows that lie flat on the ground and point out along the isometric diagonals.',
    types: ['xform'],
    refKey: 'SOP_xform',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-arrow`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2f60b0" />
            <stop offset="100%" stopColor="#7aa8e8" />
          </linearGradient>
        </defs>
        {[45, 135, 225, 315].map((angle) => (
          <polygon
            key={angle}
            points="1,-1.6 6.6,-1.6 6.6,-3.4 10.8,0 6.6,3.4 6.6,1.6 1,1.6"
            transform={`translate(12 15) scale(1 0.5) rotate(${angle})`}
            fill={`url(#${uid}-arrow)`}
            stroke="#1a3a70"
            strokeWidth="1"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <polygon points="12,3 17.5,5.75 12,8.5 6.5,5.75" fill="#eef2f7" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="6.5,5.75 12,8.5 12,15 6.5,12.25" fill="#c0c7d1" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="17.5,5.75 12,8.5 12,15 17.5,12.25" fill="#89929e" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
      </>
    ),
  },
];
