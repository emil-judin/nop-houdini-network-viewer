import type { OperatorIconDef } from '../iconTypes';

/**
 * SideFX Labs icons for attribute, color, analysis, group, partition and transform tools.
 *
 * Original MIT-licensed drawings that follow `docs/ICON_ART_BIBLE.md` (Labs accent palette).
 */
export const LABS_GEOMETRY_ICONS: OperatorIconDef[] = [
  {
    id: 'labs.color_adjustment',
    label: 'GameDev Color Adjustment',
    family: 'labs',
    description:
      'Dark control panel with three color swatches (red, orange, yellow) above a grey-to-white slider with a white knob.',
    types: ['color_adjustment'],
    refKey: 'labs::color_adjustment',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ramp`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5a616b" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <rect x="2.5" y="4" width="19" height="16" rx="1.5" fill="#3a3f47" stroke="#262626" strokeWidth="1.2" />
        <rect x="4.5" y="6" width="4.5" height="6" fill="#e03228" stroke="#262626" strokeWidth="0.8" />
        <rect x="9.75" y="6" width="4.5" height="6" fill="#f2711c" stroke="#262626" strokeWidth="0.8" />
        <rect x="15" y="6" width="4.5" height="6" fill="#f2c428" stroke="#262626" strokeWidth="0.8" />
        <rect x="4.5" y="14.6" width="15" height="2.8" fill={`url(#${uid}-ramp)`} stroke="#262626" strokeWidth="0.8" />
        <rect x="11.3" y="13.3" width="2.4" height="5.4" rx="0.5" fill="#f2f4f7" stroke="#262626" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'labs.color_gradient',
    label: 'GameDev Color Gradient',
    family: 'labs',
    description: 'White picture frame holding a black-to-white horizontal gradient ramp.',
    types: ['color_gradient'],
    refKey: 'labs::color_gradient',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ramp`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e1e1e" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <rect x="2.5" y="4.5" width="19" height="15" fill="#f2f4f7" stroke="#262626" strokeWidth="1.2" />
        <rect x="4.3" y="6.3" width="15.4" height="11.4" fill={`url(#${uid}-ramp)`} stroke="#262626" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'labs.measure_curvature',
    label: 'Measure Curvature',
    family: 'labs',
    description:
      'Smooth grey hill (bell curve) with a red curvature comb: short red spokes standing off the surface joined by an outer red curve.',
    types: ['measure_curvarture', 'measure_curvature'],
    refKey: 'labs::measure_curvature',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-hill`} cx="45%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#6f7782" />
          </radialGradient>
        </defs>
        <path d="M2.5 20.5C7 20.5 8 6 12 6C16 6 17 20.5 21.5 20.5Z" fill={`url(#${uid}-hill)`} stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M7.4 13.3L4.6 12.2M9.5 8.3L7.4 5.9M12 6V3M14.5 8.3L16.6 5.9M16.6 13.3L19.4 12.2" stroke="#e03228" strokeWidth="1.1" />
        <path
          d="M2.6 19C3.2 16 3.6 14 4.6 12.2C5.3 10 6.2 7.6 7.4 5.9C8.8 4 10.3 3 12 3C13.7 3 15.2 4 16.6 5.9C17.8 7.6 18.7 10 19.4 12.2C20.4 14 20.8 16 21.4 19"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.5"
        />
      </>
    ),
  },
  {
    id: 'labs.2d_wavefunctioncollapse',
    label: 'Labs 2D WaveFunctionCollapse',
    family: 'labs',
    description:
      'Thick orange squiggle (dark casing) meandering like a maze across the top two thirds, above the black serif letters WFC.',
    types: ['2d_wavefunctioncollapse'],
    refKey: 'labs::2d_wavefunctioncollapse',
    render: () => {
      const d = 'M3 4.5H6.5V7.5H4V10.5H8.5V3.5H12V7H14.5V3.5H20.5V7H17.5V10H21V13.5H16V10.5H13V13.5H9.5V11.5';
      return (
        <>
          <path d={d} fill="none" stroke="#262626" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#f2711c" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
          <text x="12" y="21.6" textAnchor="middle" fill="#1e1e1e" fontSize="7.6" fontFamily="serif">
            WFC
          </text>
        </>
      );
    },
  },
  {
    id: 'labs.attribute_value_replace',
    label: 'Labs Attribute Value Replace',
    family: 'labs',
    description:
      'Two rows of large letters: orange A, black greater-than sign, teal B on top and orange C, black greater-than sign, teal D below (thin dark edges on the letters).',
    types: ['attribute_value_replace'],
    refKey: 'labs::attribute_value_replace',
    render: () => (
      <>
        {(
          [
            [10.2, 'A', 'B'],
            [21.2, 'C', 'D'],
          ] as const
        ).map(([y, from, to]) => (
          <g key={from} fontSize="10" fontFamily="sans-serif" stroke="#262626" strokeWidth="0.45" paintOrder="stroke">
            <text x="5" y={y} textAnchor="middle" fill="#f2711c">
              {from}
            </text>
            <text x="12" y={y} textAnchor="middle" fill="#1e1e1e">
              &gt;
            </text>
            <text x="19" y={y} textAnchor="middle" fill="#14a5b4">
              {to}
            </text>
          </g>
        ))}
      </>
    ),
  },
  {
    id: 'labs.axis_align',
    label: 'Labs Axis Align',
    family: 'labs',
    description:
      'Light rounded square with a grey drop shadow, centered inside four white guide bars (top, bottom, left, right).',
    types: ['axis_align'],
    refKey: 'labs::axis_align',
    render: () => (
      <>
        <rect x="9.5" y="9.5" width="9" height="9" rx="2" fill="#89929e" />
        <rect x="7.5" y="7.5" width="9" height="9" rx="2" fill="#f2f4f7" stroke="#262626" strokeWidth="1.2" />
        <rect x="6" y="2.5" width="12" height="2" fill="#f2f4f7" stroke="#262626" strokeWidth="0.9" />
        <rect x="6" y="19.5" width="12" height="2" fill="#f2f4f7" stroke="#262626" strokeWidth="0.9" />
        <rect x="2.5" y="6" width="2" height="12" fill="#f2f4f7" stroke="#262626" strokeWidth="0.9" />
        <rect x="19.5" y="6" width="2" height="12" fill="#f2f4f7" stroke="#262626" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'labs.calculate_occlusion',
    label: 'Labs Calculate Occlusion',
    family: 'labs',
    description: 'Shaded orange ball resting on a white disc, casting a grey contact shadow.',
    types: ['calculate_occlusion'],
    refKey: 'labs::calculate_occlusion',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ball`} cx="38%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="55%" stopColor="#f2711c" />
            <stop offset="100%" stopColor="#b84a0c" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="9.5" fill="#f2f4f7" stroke="#262626" strokeWidth="1.2" />
        <ellipse cx="12.5" cy="17" rx="6" ry="1.8" fill="#89929e" />
        <circle cx="12" cy="11" r="5.5" fill={`url(#${uid}-ball)`} stroke="#262626" strokeWidth="1.1" />
      </>
    ),
  },
  {
    id: 'labs.calculate_slope',
    label: 'Labs Calculate Slope',
    family: 'labs',
    description: 'Six grey bars rising left to right under a black slope line.',
    types: ['calculate_slope'],
    refKey: 'labs::calculate_slope',
    render: () => (
      <>
        {[17, 15.5, 14, 12.2, 10.6, 9].map((top, i) => (
          <rect key={top} x={3.2 + i * 3} y={top} width="2.4" height={20.5 - top} fill="#89929e" stroke="#262626" strokeWidth="0.8" />
        ))}
        <path d="M2.5 13.5L21.5 4.8" stroke="#1e1e1e" strokeWidth="1.7" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'labs.color_blend',
    label: 'Labs Color Blend',
    family: 'labs',
    description:
      'Squat light grey mixing pot (rounded sides, small pouring lip at the top-right) with a blue swoosh curving around behind it: a short sliver on the left, a long band sweeping down on the right.',
    types: ['color_blend'],
    refKey: 'labs::color_blend',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-pot`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c0c7d1" />
            <stop offset="35%" stopColor="#f4f6f9" />
            <stop offset="100%" stopColor="#9aa2ae" />
          </linearGradient>
        </defs>
        <path d="M3.6 15.6C3 12.8 6 11 10.5 10.5C16 10 20.8 12.4 21.6 19.6" fill="none" stroke="#262626" strokeWidth="3.8" />
        <path d="M3.6 15.6C3 12.8 6 11 10.5 10.5C16 10 20.8 12.4 21.6 19.6" fill="none" stroke="#3a6fc0" strokeWidth="2.4" />
        <path d="M4.8 9C4.8 14 5.4 18 12 18.4C18.6 18 19.2 14 19.2 9Z" fill={`url(#${uid}-pot)`} stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <ellipse cx="12" cy="9" rx="7.2" ry="2.5" fill="#e4e8ee" stroke="#262626" strokeWidth="1.1" />
        <path d="M17.2 7.2L20.4 5.8L19.4 8.6" fill="#e4e8ee" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'labs.edge_color',
    label: 'Labs Edge Color',
    family: 'labs',
    description:
      'Looking into the corner of a box: light orange top face, orange left wall and brown right wall, separated by a thick pale peach Y of edges meeting high in the upper third.',
    types: ['edge_color'],
    refKey: 'labs::edge_color',
    render: () => (
      <>
        <polygon points="2.5,2.5 21.5,2.5 12,8.5" fill="#f79a52" />
        <polygon points="2.5,2.5 12,8.5 12,21.5 2.5,21.5" fill="#f2711c" />
        <polygon points="21.5,2.5 12,8.5 12,21.5 21.5,21.5" fill="#9a4a1c" />
        <path d="M2.5 2.5L12 8.5L21.5 2.5M12 8.5V21.5" stroke="#ffd8bc" strokeWidth="2.2" />
        <rect x="2.5" y="2.5" width="19" height="19" fill="none" stroke="#262626" strokeWidth="1" />
      </>
    ),
  },
  {
    id: 'labs.group_by_measure',
    label: 'Labs Group by Measure',
    family: 'labs',
    description: 'Grey tape measure with a yellow tape (dark tick marks) pulled out to the right, in front of an orange selection frame.',
    types: ['group_by_measure'],
    refKey: 'labs::group_by_measure',
    render: () => (
      <>
        <rect x="3" y="2.5" width="9" height="16" fill="none" stroke="#262626" strokeWidth="3" />
        <rect x="3" y="2.5" width="9" height="16" fill="none" stroke="#f2a03c" strokeWidth="1.6" />
        <rect x="5" y="8" width="10" height="10" rx="2.5" fill="#c0c7d1" stroke="#262626" strokeWidth="1.1" />
        <circle cx="10" cy="13" r="2.6" fill="#89929e" stroke="#262626" strokeWidth="0.9" />
        <rect x="14.5" y="15" width="7.5" height="3" fill="#f5d33a" stroke="#262626" strokeWidth="0.9" />
        <path d="M16.2 15V16.4M18 15V16.8M19.8 15V16.4" stroke="#262626" strokeWidth="0.7" />
        <rect x="12.6" y="7" width="3" height="2.6" fill="#e03228" stroke="#262626" strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'labs.group_curve_corners',
    label: 'Labs Group Curve Corners',
    family: 'labs',
    description: 'Thick orange ring with a white zigzag curve (dark casing) inside; its sharp corners are marked with teal dots.',
    types: ['group_curve_corners'],
    refKey: 'labs::group_curve_corners',
    render: () => (
      <>
        <circle cx="12" cy="12" r="8.4" fill="none" stroke="#262626" strokeWidth="3.8" />
        <circle cx="12" cy="12" r="8.4" fill="none" stroke="#f2711c" strokeWidth="2.4" />
        <path d="M5.5 9L9.5 17L14 7L18.5 15" fill="none" stroke="#262626" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M5.5 9L9.5 17L14 7L18.5 15" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
        {[
          [9.5, 17],
          [14, 7],
        ].map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="1.9" fill="#14a5b4" stroke="#262626" strokeWidth="0.9" />
        ))}
      </>
    ),
  },
  {
    id: 'labs.group_expand',
    label: 'Labs Group Expand',
    family: 'labs',
    description: 'Arcade joystick: dark stick with a round black knob on a dark base with two red buttons and an orange dashed ring.',
    types: ['group_expand'],
    refKey: 'labs::group_expand',
    render: () => (
      <>
        <path d="M3 15.5L12 12L21 15.5V18L12 21.5L3 18Z" fill="#3a3f47" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M3 15.5L12 19L21 15.5M12 19V21.5" fill="none" stroke="#5a616b" strokeWidth="0.8" />
        <ellipse cx="12" cy="15.4" rx="3.6" ry="1.4" fill="none" stroke="#f2711c" strokeWidth="1" strokeDasharray="1 0.8" />
        <ellipse cx="6" cy="15.6" rx="1.3" ry="0.6" fill="#e03228" stroke="#262626" strokeWidth="0.6" />
        <ellipse cx="18" cy="15.6" rx="1.3" ry="0.6" fill="#e03228" stroke="#262626" strokeWidth="0.6" />
        <rect x="11.1" y="6" width="1.8" height="9.4" fill="#1e1e1e" />
        <circle cx="12" cy="5" r="2.6" fill="#1e1e1e" stroke="#5a616b" strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'labs.group_invert',
    label: 'Labs Group Invert',
    family: 'labs',
    description: 'Inverted group marker: disc fading from a white center to an orange edge, with a dashed dark-orange rim.',
    types: ['group_invert'],
    refKey: 'labs::group_invert',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#fde0c4" />
            <stop offset="100%" stopColor="#f2a050" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="8.6" fill={`url(#${uid}-glow)`} stroke="#b84a0c" strokeWidth="2.2" strokeDasharray="1.6 1.2" />
      </>
    ),
  },
  {
    id: 'labs.multi_bounding_box',
    label: 'Labs Multi Bounding Box',
    family: 'labs',
    description:
      'Light grey square tile with a slightly darker border, holding four large dark grey boxes in a 2 x 2 layout with narrow gaps.',
    types: ['multi_bounding_box'],
    refKey: 'labs::multi_bounding_box',
    render: () => (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" fill="#9aa2ae" stroke="#262626" strokeWidth="1" />
        <rect x="3.6" y="3.6" width="16.8" height="16.8" fill="#c0c7d1" />
        {[
          [4.8, 4.8],
          [12.6, 4.8],
          [4.8, 12.6],
          [12.6, 12.6],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="6.6" height="6.6" fill="#3f4247" />
        ))}
      </>
    ),
  },
  {
    id: 'labs.turntable',
    label: 'Labs Turntable',
    family: 'labs',
    description:
      'Wooden artist mannequin standing on a thick white round platform, encircled at waist height by a red ribbon arrow that wraps around it and points right.',
    types: ['turntable'],
    refKey: 'labs::turntable',
    render: () => {
      const back = 'M3 11.5C3 8.9 7 7.4 12 7.4C17 7.4 21 8.9 21 11.5';
      const front = 'M3 11.5C3 14 7 15.3 12 15.3C14 15.3 15.7 15.1 17 14.8';
      const limbs = 'M12 5.8V11.2M12 7.2L9.2 10.2M12 7.2L14.8 10.2M12 11.2L10.6 17M12 11.2L13.4 17';
      return (
        <>
          <path d="M2.5 17.5V19C2.5 20.6 6.8 21.8 12 21.8C17.2 21.8 21.5 20.6 21.5 19V17.5" fill="#c0c7d1" stroke="#262626" strokeWidth="1" />
          <ellipse cx="12" cy="17.5" rx="9.5" ry="3" fill="#f2f4f7" stroke="#262626" strokeWidth="1" />
          <path d={back} fill="none" stroke="#262626" strokeWidth="3.6" strokeLinecap="round" />
          <path d={back} fill="none" stroke="#b81c1c" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="4.2" r="1.8" fill="#d9a066" stroke="#262626" strokeWidth="0.9" />
          <path d={limbs} fill="none" stroke="#262626" strokeWidth="2.8" strokeLinecap="round" />
          <path d={limbs} fill="none" stroke="#d9a066" strokeWidth="1.5" strokeLinecap="round" />
          <path d={front} fill="none" stroke="#262626" strokeWidth="3.6" strokeLinecap="round" />
          <path d={front} fill="none" stroke="#e03228" strokeWidth="2.2" strokeLinecap="round" />
          <polygon points="21,13.6 16.4,11.6 16.9,17" fill="#e03228" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'labs.wang_tiles_decoder',
    label: 'Labs Wang Tiles Decoder',
    family: 'labs',
    description: 'Bold teal W letterform (dark casing) with rows of orange code dashes beneath its right side.',
    types: ['wang_tiles_decoder'],
    refKey: 'labs::wang_tiles_decoder',
    render: () => (
      <>
        <path d="M2.5 4L6 14L9.5 6L13 14L17 3" fill="none" stroke="#262626" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M2.5 4L6 14L9.5 6L13 14L17 3" fill="none" stroke="#14a5b4" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        {[
          [11, 16.5],
          [16, 16.5],
          [11, 19.5],
          [16, 19.5],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4" height="2" rx="1" fill="#f2711c" stroke="#262626" strokeWidth="0.7" />
        ))}
        <circle cx="20.8" cy="16.5" r="0.9" fill="#f2711c" stroke="#262626" strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'labs.wang_tiles_sample',
    label: 'Labs Wang Tiles Sample',
    family: 'labs',
    description: 'Bold teal W letterform (dark casing) with a single orange sample square at its bottom-right.',
    types: ['wang_tiles_sample'],
    refKey: 'labs::wang_tiles_sample',
    render: () => (
      <>
        <path d="M2.5 4L6 14L9.5 6L13 14L17 3" fill="none" stroke="#262626" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M2.5 4L6 14L9.5 6L13 14L17 3" fill="none" stroke="#14a5b4" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        <rect x="15.5" y="15.5" width="6" height="6" fill="#f2711c" stroke="#262626" strokeWidth="1" />
      </>
    ),
  },
];
