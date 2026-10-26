import type { OperatorIconDef } from '../iconTypes';

/**
 * Three broad flow waves (top and middle long, bottom shorter) used by the Flowmap family.
 * Drawn as thick strokes on the disc itself, so they need no dark casing.
 */
const FLOW_WAVES =
  'M6.2 8.8C8 7.1 9.6 7.1 11.4 8.4C13.2 9.7 15 9.7 17.4 7.7M5 13C7.1 11.3 9.2 11.3 11.6 12.6C14 13.9 16.3 13.9 19 11.8M6.8 17.4C8.6 15.9 10.2 15.9 12 17C13.8 18.1 15.5 18.1 17.2 16.6';

/**
 * SideFX Labs icons for FX (fluids, destruction, electricity, time), character, rendering and image tools.
 *
 * Original MIT-licensed drawings that follow `docs/ICON_ART_BIBLE.md` (Labs accent palette).
 */
export const LABS_FX_ICONS: OperatorIconDef[] = [
  {
    id: 'labs.dembones_skinningconverter',
    label: 'Labs Dem Bones Skinning Converter',
    family: 'labs',
    description:
      'Dem Bones mascot (vendor logo, redrawn): black disc with a white cartoon skull (big black eyes with white glints, two nose dots) and a small red bow tie below.',
    types: ['dembones_skinningconverter'],
    refKey: 'labs::dembones_skinningconverter',
    render: () => (
      <>
        <circle cx="12" cy="12" r="10" fill="#111111" stroke="#262626" strokeWidth="1" />
        <path d="M5.8 10C5.8 6.2 8.6 3.8 12 3.8C15.4 3.8 18.2 6.2 18.2 10C18.2 12.4 17 13.8 15.8 14.4V16.4C15.8 17.2 15.2 17.6 14.4 17.6H9.6C8.8 17.6 8.2 17.2 8.2 16.4V14.4C7 13.8 5.8 12.4 5.8 10Z" fill="#f4f4f4" />
        <circle cx="9.4" cy="10" r="2" fill="#111111" />
        <circle cx="14.6" cy="10" r="2" fill="#111111" />
        <circle cx="9.9" cy="9.3" r="0.6" fill="#ffffff" />
        <circle cx="15.1" cy="9.3" r="0.6" fill="#ffffff" />
        <circle cx="11.3" cy="13.4" r="0.5" fill="#111111" />
        <circle cx="12.7" cy="13.4" r="0.5" fill="#111111" />
        <polygon points="9.4,18.6 12,19.8 9.4,21" fill="#d01e1e" />
        <polygon points="14.6,18.6 12,19.8 14.6,21" fill="#d01e1e" />
        <circle cx="12" cy="19.8" r="0.7" fill="#a01010" />
      </>
    ),
  },
  {
    id: 'labs.destruction_cleanup',
    label: 'Labs Destruction Cleanup',
    family: 'labs',
    description: 'Dark grey fractured disc (light crack lines) with an orange-handled white paint scraper on top.',
    types: ['destruction_cleanup'],
    refKey: 'labs::destruction_cleanup',
    render: () => (
      <>
        <circle cx="12" cy="12" r="9.5" fill="#5a616b" stroke="#262626" strokeWidth="1.2" />
        <path d="M12 12L4 8M12 12L20.5 9M12 12L8 20.5M12 12L17 20" stroke="#9aa2ae" strokeWidth="0.9" />
        <path d="M6.5 12H17.5L18.5 17.5H5.5Z" fill="#f2f4f7" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        <rect x="11.2" y="10.4" width="1.6" height="1.8" fill="#c0c7d1" stroke="#262626" strokeWidth="0.6" />
        <rect x="10.2" y="3.5" width="3.6" height="7" rx="1" fill="#f2711c" stroke="#262626" strokeWidth="1" />
      </>
    ),
  },
  {
    id: 'labs.flowmap',
    label: 'Labs Flowmap',
    family: 'labs',
    description: 'Orange disc (dark outline) with three thick white waves flowing across it, the bottom wave shortest.',
    types: ['flowmap'],
    refKey: 'labs::flowmap',
    render: () => (
      <>
        <circle cx="12" cy="12" r="9.5" fill="#f2711c" stroke="#262626" strokeWidth="1.2" />
        <path d={FLOW_WAVES} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'labs.flowmap_obstacle',
    label: 'Labs Flowmap Obstacle',
    family: 'labs',
    description: 'Orange disc with a white round obstacle in the center; white flow lines bend around it above and below.',
    types: ['flowmap_obstacle'],
    refKey: 'labs::flowmap_obstacle',
    render: () => {
      const d = 'M4.5 8.5C8 8.5 9 5.8 12 5.8C15 5.8 16 8.5 19.5 8.5M4.5 15.5C8 15.5 9 18.2 12 18.2C15 18.2 16 15.5 19.5 15.5';
      return (
        <>
          <circle cx="12" cy="12" r="9.5" fill="#f2711c" stroke="#262626" strokeWidth="1.2" />
          <path d={d} fill="none" stroke="#262626" strokeWidth="2.8" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.4" fill="#ffffff" stroke="#262626" strokeWidth="1.1" />
        </>
      );
    },
  },
  {
    id: 'labs.flowmap_to_color',
    label: 'Labs Flowmap to Color',
    family: 'labs',
    description:
      'The Flowmap disc split diagonally: orange upper-left, teal lower-right, with the same three thick white waves across both halves.',
    types: ['flowmap_to_color'],
    refKey: 'labs::flowmap_to_color',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-disc`}>
            <circle cx="12" cy="12" r="9.5" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-disc)`}>
          <rect x="2" y="2" width="20" height="20" fill="#f2711c" />
          <polygon points="22,4.5 22,22 4.5,22" fill="#14a5b4" />
        </g>
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="#262626" strokeWidth="1.2" />
        <path d={FLOW_WAVES} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'labs.flowmap_visualize',
    label: 'Labs Flowmap Visualize',
    family: 'labs',
    description: 'Orange rounded tile (dark outline) almost filled by a white disc carrying three thick orange waves.',
    types: ['flowmap_visualize'],
    refKey: 'labs::flowmap_visualize',
    render: () => (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#f2711c" stroke="#262626" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="8" fill="#ffffff" stroke="#262626" strokeWidth="0.8" />
        <g transform="translate(12 12) scale(0.8) translate(-12 -12)">
          <path d={FLOW_WAVES} fill="none" stroke="#f2711c" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      </>
    ),
  },
  {
    id: 'labs.flowmap_guide',
    label: 'Labs Guide Flowmap',
    family: 'labs',
    description: 'Orange disc with three stacked white arcs (dark casing) bending downward like guided flow.',
    types: ['flowmap_guide'],
    refKey: 'labs::flowmap_guide',
    render: () => {
      const d = 'M5.5 7C9 9 15 9 18.5 7M5 12C8.5 14.5 15.5 14.5 19 12M6 17C9.5 19 14.5 19 18 17';
      return (
        <>
          <circle cx="12" cy="12" r="9.5" fill="#f2711c" stroke="#262626" strokeWidth="1.2" />
          <path d={d} fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" />
        </>
      );
    },
  },
  {
    id: 'labs.lightning',
    label: 'Labs Lightning',
    family: 'labs',
    description: 'Orange lightning bolt with a dark outline.',
    types: ['lightning'],
    refKey: 'labs::lightning',
    render: () => (
      <polygon points="14,1.8 5.5,13.5 11,13.5 8.5,22.2 18.5,9.5 13,9.5 16.5,1.8" fill="#f2711c" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
    ),
  },
  {
    id: 'labs.make_loop',
    label: 'Labs Make Loop',
    family: 'labs',
    description: 'White rounded loop track (dark casing) with an arrowhead on its top-right, so the animation repeats.',
    types: ['make_loop'],
    refKey: 'labs::make_loop',
    render: () => {
      const d = 'M15 7.5H17.5C20 7.5 21.5 9.5 21.5 12C21.5 14.5 20 16.5 17.5 16.5H6.5C4 16.5 2.5 14.5 2.5 12C2.5 9.5 4 7.5 6.5 7.5H12';
      return (
        <>
          <path d={d} fill="none" stroke="#262626" strokeWidth="4" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
          <polygon points="16,7.5 12.6,4.6 12.6,10.4" fill="#ffffff" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'labs.name_from_capture_weight',
    label: 'Labs Name from Capture Weight',
    family: 'labs',
    description: 'Orange speech bubble (dark outline, tail at the bottom-left) holding two white name lines.',
    types: ['name_from_capture_weight'],
    refKey: 'labs::name_from_capture_weight',
    render: () => (
      <>
        <path d="M3 3.5H21V15H8.5L4.5 20.5L5.5 15H3Z" fill="#f2711c" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M6 7.5H18M6 11H14" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'labs.neuron_mocap',
    label: 'Labs Neuron Mocap',
    family: 'labs',
    description:
      'Perception Neuron logo (vendor logo, redrawn): crimson rounded square with a white neuron, a round cell body with forked dendrites branching out in all directions.',
    types: ['neuron_mocap'],
    refKey: 'labs::neuron_mocap',
    render: () => (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#c41230" stroke="#262626" strokeWidth="1.1" />
        <g fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 11V5.2M12 5.2L10.6 3.6M12 5.2L13.4 3.6" />
          <path d="M12 11L6.6 9.2M6.6 9.2L5 7.6M6.6 9.2L4.8 10.4" />
          <path d="M12 11L17.4 8.6M17.4 8.6L18.8 6.8M17.4 8.6L19.4 9.6" />
          <path d="M12 11L8.2 15.8M8.2 15.8L6.4 16.4M8.2 15.8L8.6 18" />
          <path d="M12 11L14.6 15.2L16.6 19.6M14.6 15.2L17.6 15.6M16.6 19.6L15 20.6M16.6 19.6L18.6 19.2" />
        </g>
        <circle cx="12" cy="11" r="2.6" fill="#ffffff" />
      </>
    ),
  },
  {
    id: 'labs.rbd_edge_strip',
    label: 'Labs RBD Edge Strip',
    family: 'labs',
    description: 'Orange perspective grid sheet with a yellow patch in the middle outlined by a dark dashed cut line.',
    types: ['rbd_edge_strip'],
    refKey: 'labs::rbd_edge_strip',
    render: () => (
      <>
        <polygon points="6,4 21,7 18,21 3,17" fill="#f5a04a" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M9.75 4.75L6.75 18M13.5 5.5L10.5 19M17.25 6.25L14.25 20M5.25 7.25L20.25 10.5M4.5 10.5L19.5 14M3.75 13.75L18.75 17.5" stroke="#b84a0c" strokeWidth="0.6" />
        <polygon points="9.4,8.6 15.4,10 14.2,15.4 8.2,14" fill="#f5d33a" stroke="#262626" strokeWidth="0.9" strokeDasharray="1.2 0.9" />
      </>
    ),
  },
  {
    id: 'labs.rokoko_mocap',
    label: 'Labs Rokoko Mocap',
    family: 'labs',
    description:
      'Rokoko wordmark (vendor logo, redrawn): black square with bold white letters in three staggered rows: RO on the left, KO indented to the right, KO on the left.',
    types: ['rokoko_mocap'],
    refKey: 'labs::rokoko_mocap',
    render: () => (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" fill="#0a0a0a" stroke="#262626" strokeWidth="1" />
        <g fill="#ffffff" fontSize="5.4" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.6">
          <text x="4.6" y="8.6">RO</text>
          <text x="10" y="14.3">KO</text>
          <text x="4.6" y="20">KO</text>
        </g>
      </>
    ),
  },
  {
    id: 'labs.simple_retime',
    label: 'Labs Simple Retime',
    family: 'labs',
    description: 'Clock with a grey bezel and white face: a red wedge marks the retimed span, with a dark hand and center pin.',
    types: ['simple_retime'],
    refKey: 'labs::simple_retime',
    render: () => (
      <>
        <circle cx="12" cy="12" r="9.5" fill="#9aa2ae" stroke="#262626" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="7.6" fill="#f2f4f7" stroke="#262626" strokeWidth="0.9" />
        <path d="M12 12L12 4.4A7.6 7.6 0 0 0 5 9Z" fill="#e03228" />
        <path d="M12 12L9.2 5.6" stroke="#1e1e1e" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.3" fill="#ffffff" stroke="#1e1e1e" strokeWidth="0.9" />
        {[
          [12, 17.8],
          [17.8, 12],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.6" fill="#5a616b" />
        ))}
      </>
    ),
  },
  {
    id: 'labs.skinning_converter',
    label: 'Labs Skinning Converter',
    family: 'labs',
    description: 'Three overlapping circles: an orange ring on the left, a teal disc with white hatching at the top-right and a dark teal disc at the bottom-right.',
    types: ['skinning_converter'],
    refKey: 'labs::skinning_converter',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-hatch`}>
            <circle cx="15" cy="8" r="5.2" />
          </clipPath>
        </defs>
        <circle cx="16" cy="16" r="5.2" fill="#0b4f55" stroke="#262626" strokeWidth="1" />
        <circle cx="15" cy="8" r="5.2" fill="#14a5b4" stroke="#262626" strokeWidth="1" />
        <path d="M8 9L14 3M9.5 11.5L17 4M12 13L19 6M15 13.5L20 8.5" stroke="#ffffff" strokeWidth="1.1" clipPath={`url(#${uid}-hatch)`} />
        <circle cx="8" cy="14" r="5" fill="none" stroke="#262626" strokeWidth="3.6" />
        <circle cx="8" cy="14" r="5" fill="none" stroke="#f2711c" strokeWidth="2.2" />
      </>
    ),
  },
  {
    id: 'labs.skinningconverter_utility',
    label: 'Labs Skinning Converter Utility',
    family: 'labs',
    description: 'Shaded olive-yellow banana test model (dark outline) on a pale grey tile.',
    types: ['skinningconverter_utility'],
    refKey: 'labs::skinningconverter_utility',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-peel`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c9c94a" />
            <stop offset="100%" stopColor="#6f6a1e" />
          </linearGradient>
        </defs>
        <rect x="2.5" y="2.5" width="19" height="19" rx="1.5" fill="#dfe4ea" stroke="#262626" strokeWidth="1" />
        <path d="M9 4.5C11.5 4 12.5 6.5 12.5 9C12.5 13 15 16.5 18.5 18C17 20.5 13 20.5 10.5 18C7.5 15 6.5 9.5 7.6 6C7.9 5.2 8.4 4.6 9 4.5Z" fill={`url(#${uid}-peel)`} stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'labs.splatter',
    label: 'Labs Splatter',
    family: 'labs',
    description: 'Orange paint splat with spiky arms and a few detached droplets (all dark outlined).',
    types: ['splatter'],
    refKey: 'labs::splatter',
    render: () => (
      <>
        <path
          d="M12 6C13 3.5 15 4.5 14.5 7C16.5 5.5 18.5 7 16.5 9C19 9 20 11 17.5 12C19.5 13.5 18.5 16 16 15C16.5 17.5 14.5 18.5 13 16.5C12.5 19.5 10 19.5 10 16.5C8 18.5 6 17 7.5 15C5 15.5 4 13 6.5 12C4.5 10.5 5.5 8.5 8 9C6.5 7 8.5 5 10.5 6.8C10.5 5 11.5 4.8 12 6Z"
          fill="#f2711c"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {[
          [19.5, 4.5, 1.2],
          [4, 5.5, 1],
          [20, 18.5, 1.3],
          [5, 19.5, 0.9],
        ].map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#f2711c" stroke="#262626" strokeWidth="0.8" />
        ))}
      </>
    ),
  },
];
