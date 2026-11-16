import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 6, Part 6 (icons 60 to 69): Feather and Groom SOP icons.
 */
export const BATCH_06_PART_6: OperatorIconDef[] = [
  {
    id: 'sop.featherdeintersect',
    label: 'Feather Deintersect',
    family: 'sop',
    description:
      'Two overlapping violet feathers being separated by a bright red deintersection arrow.',
    types: ['featherdeintersect'],
    icons: ['sop_featherdeintersect'],
    refKey: 'SOP_featherdeintersect',
    render: () => (
      <>
        <ellipse cx="12" cy="19.8" rx="9" ry="2.4" fill="#262626" opacity="0.28" />
        <path
          d="M4.2,17.5 C3.5,12.8 4.8,6.8 6.8,3.2 C8.8,4 9.5,8.5 8.5,13.5 C7.5,16.8 5.8,18.2 4.2,17.5 Z"
          fill="#d681d5"
          fillOpacity="0.5"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M9.5,18.8 C9.2,14 12.2,8 18.8,3.2 C21.2,4.5 21,9.5 18.5,14.2 C16,18 12.2,19.8 9.5,18.8 Z"
          fill="#d681d5"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M8,21 C10.5,16 14.2,9.8 18.8,3.2"
          fill="none"
          stroke="#262626"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M7.5,9.5 L13.5,9.5 M13.5,9.5 L11.5,7.8 M13.5,9.5 L11.5,11.2"
          fill="none"
          stroke="#262626"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5,9.5 L13.5,9.5 M13.5,9.5 L11.5,7.8 M13.5,9.5 L11.5,11.2"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.featherprimitive',
    label: 'Feather Primitive',
    family: 'sop',
    description:
      'Layered fan of white and silver wing feathers with dark shafts and blue barb guides.',
    types: ['featherprimitive'],
    icons: ['sop_featherprimitive'],
    refKey: 'SOP_featherprimitive',
    render: () => (
      <>
        <ellipse cx="12" cy="19.8" rx="9.5" ry="2.4" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <path
            d="M3.5,14.5 C4.2,9.5 7.5,4.2 12.2,2.2 C14.2,3.2 14.2,8.2 11.8,13.2 C9.5,16.8 5.8,16.5 3.5,14.5 Z"
            fill="#babdb6"
          />
          <path
            d="M6.5,17.2 C7.8,12 11.8,6.5 17.2,4 C19.2,5.2 18.8,10.5 15.8,15.2 C13.2,18.8 9.2,18.8 6.5,17.2 Z"
            fill="#d3d7cf"
          />
          <path
            d="M9.8,19.5 C11.8,14.8 16,9.8 21.2,7.8 C22.5,9.5 21.5,14.5 18.2,18.2 C15.2,21 11.8,20.8 9.8,19.5 Z"
            fill="#ffffff"
          />
        </g>
        <path
          d="M11.2,19.8 C13.8,15.5 17.2,11.2 21.2,7.8"
          fill="none"
          stroke="#3465a4"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.feathershapeorg',
    label: 'Feather Shape Organize',
    family: 'sop',
    description:
      'Three organized feathers in green, blue and yellow fanned side by side.',
    types: ['feathershapeorg', 'feathertemplateinterpolate'],
    icons: ['sop_feathershapeorg', 'sop_feathertemplateinterpolate'],
    refKey: 'SOP_feathershapeorg',
    render: () => (
      <>
        <ellipse cx="12" cy="20" rx="9.5" ry="2.2" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <path
            d="M2.8,16.5 C2.5,11.8 4.8,5.8 8.8,2.5 C10.8,3.5 10.8,8.5 8.8,13.5 C7,16.8 4.5,17.5 2.8,16.5 Z"
            fill="#8ae234"
          />
          <path d="M3.2,18.5 C4.8,13.5 6.8,7.8 8.8,2.5" fill="none" />
          <path
            d="M8.5,18.2 C8.8,13.5 11.8,7.5 16.2,4.2 C18.2,5.2 18,10.2 15.5,15 C13.2,18.2 10.5,19 8.5,18.2 Z"
            fill="#729fcf"
          />
          <path d="M8.8,20 C11,15 13.5,9.5 16.2,4.2" fill="none" />
          <path
            d="M12.5,19.8 C14.5,16.2 18.2,13.5 22,13.5 C22.5,15.2 20.5,18.5 17.5,20.2 C15,21.2 13.2,20.8 12.5,19.8 Z"
            fill="#fce94f"
          />
          <path d="M11.8,21 C15,18 18.5,15.5 22,13.5" fill="none" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.feathertemplatefromshape',
    label: 'Feather Template from Shape',
    family: 'sop',
    description:
      'Violet feather framed by a dashed green template outline with a grey stylus pen.',
    types: ['feathertemplatefromshape'],
    icons: ['sop_feathertemplatefromshape'],
    refKey: 'SOP_feathertemplatefromshape',
    render: () => (
      <>
        <ellipse cx="12" cy="19.8" rx="9" ry="2.4" fill="#262626" opacity="0.28" />
        <path
          d="M5.5,18.2 C5.2,13.5 8.2,7.2 15.2,2.2 C17.8,3.2 17.8,8.5 15.2,13.5 C12.8,17.5 8.8,19.2 5.5,18.2 Z"
          fill="#d681d5"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M4.2,20.5 C6.8,15.5 10.8,9.2 15.2,2.2"
          fill="none"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M3.2,19.2 C2.8,13.2 6.8,5.8 15.8,1.5 C19.5,3 19.2,10.2 16,15.5 C12.8,20 6.8,21.2 3.2,19.2 Z"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.2"
          strokeDasharray="2.2 1.6"
        />
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <polygon points="16.2,14.2 21.2,9.2 22.4,10.4 17.4,15.4" fill="#e9e9e6" />
          <polygon points="15.2,16.2 16.2,14.2 17.4,15.4" fill="#434542" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.feathervisualize',
    label: 'Feather Visualize',
    family: 'sop',
    description:
      'Violet feather split by a dashed green line into a solid top vane and individual barb curves below.',
    types: ['feathervisualize'],
    icons: ['sop_feathervisualize'],
    refKey: 'SOP_feathervisualize',
    render: () => (
      <>
        <ellipse cx="12" cy="19.8" rx="9" ry="2.4" fill="#262626" opacity="0.28" />
        <path
          d="M9.2,12 C10.5,8.2 13,4.8 16.5,2.2 C18.8,3.2 19,7.5 17.2,12 Z"
          fill="#d681d5"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#88408b" strokeWidth="1" strokeLinecap="round">
          <path d="M12,13.5 L8.2,13.2 M11,15.5 L7.2,15.2 M9.8,17.5 L6.5,17.2" />
          <path d="M12.2,13.5 L16.5,13.2 M11.2,15.5 L15.2,15.2 M10,17.5 L13.8,17.2" />
        </g>
        <path
          d="M6.5,20.8 C9,15.8 12.8,9.5 16.5,2.2"
          fill="none"
          stroke="#262626"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <line
          x1="3.5"
          y1="12"
          x2="21"
          y2="12"
          stroke="#8ae234"
          strokeWidth="1.2"
          strokeDasharray="2.2 1.5"
        />
      </>
    ),
  },
  {
    id: 'sop.featherwidth',
    label: 'Feather Width',
    family: 'sop',
    description:
      'Upright violet feather crossed by a bright red double-headed width measurement arrow.',
    types: ['featherwidth'],
    icons: ['sop_featherwidth'],
    refKey: 'SOP_featherwidth',
    render: () => (
      <>
        <ellipse cx="12" cy="20" rx="8.5" ry="2.2" fill="#262626" opacity="0.28" />
        <path
          d="M8.5,18.2 C7.2,13.5 8.5,6.8 12.5,2.2 C16.5,6.8 17.8,13.5 16.5,18.2 C14.5,19.5 10.5,19.5 8.5,18.2 Z"
          fill="#e099de"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <line x1="12.5" y1="2.2" x2="12.5" y2="21.2" stroke="#262626" strokeWidth="1.3" strokeLinecap="round" />
        <g fill="none" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.2,11.5 H20.8 M4.2,11.5 L6.5,9.5 M4.2,11.5 L6.5,13.5 M20.8,11.5 L18.5,9.5 M20.8,11.5 L18.5,13.5" />
        </g>
        <g fill="none" stroke="#ef2929" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.2,11.5 H20.8 M4.2,11.5 L6.5,9.5 M4.2,11.5 L6.5,13.5 M20.8,11.5 L18.5,9.5 M20.8,11.5 L18.5,13.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.fur',
    label: 'Fur',
    family: 'sop',
    description:
      'Dense patch of golden-brown spiky fur tufts rising from an angled pelt.',
    types: ['fur'],
    icons: ['sop_fur'],
    refKey: 'SOP_fur',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-fur`} x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#e8b96d" />
            <stop offset="55%" stopColor="#cc8e27" />
            <stop offset="100%" stopColor="#8f5811" />
          </linearGradient>
        </defs>
        <path
          d="M2,11.5 L5,6.2 L5.2,9.2 L8.2,4.5 L8.2,7.8 L11.5,2.2 L11.5,6.2 L14.8,2.2 L14.2,6.5 L17.8,3.2 L16.8,7.5 L20.2,5.5 L18.8,9.8 L22,8.5 L19.8,15.2 L10.2,22 Z"
          fill={`url(#${uid}-fur)`}
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M6.5,12.5 L8.5,8.5 M10.2,14.5 L12.5,9.2 M14,15.5 L16.5,10.5"
          fill="none"
          stroke="#72470e"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.groomblend',
    label: 'Groom Blend',
    family: 'sop',
    description:
      'Two top head spheres with brown and blonde grooms blending via red arrows into a bottom head.',
    types: ['groomblend'],
    icons: ['sop_groomblend'],
    refKey: 'SOP_groomblend',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <circle cx="6.2" cy="7.5" r="3.4" fill="#daddd7" />
          <path d="M2.8,7.2 C2.8,4.2 4.5,2.8 6.2,3.2 C8,2.8 9.6,4.2 9.6,7.2 C8.5,5.5 4,5.5 2.8,7.2 Z" fill="#c17d11" />
          <circle cx="17.8" cy="7.5" r="3.4" fill="#daddd7" />
          <path d="M14.4,7.2 C14.4,4.2 16,2.8 17.8,3.2 C19.5,2.8 21.2,4.2 21.2,7.2 C20,5.5 15.5,5.5 14.4,7.2 Z" fill="#e9b96e" />
          <circle cx="12" cy="18" r="3.6" fill="#daddd7" />
          <path d="M8.4,17.8 C8.4,14.5 10.2,13 12,13.5 C13.8,13 15.6,14.5 15.6,17.8 C14.2,15.8 9.8,15.8 8.4,17.8 Z" fill="#d78b13" />
        </g>
        <g fill="none" stroke="#262626" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.8,11.8 L9.5,14.5 M9.5,14.5 L7.5,14.5 M9.5,14.5 L9.5,12.5" />
          <path d="M17.2,11.8 L14.5,14.5 M14.5,14.5 L16.5,14.5 M14.5,14.5 L14.5,12.5" />
        </g>
        <g fill="none" stroke="#ef2929" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.8,11.8 L9.5,14.5 M9.5,14.5 L7.5,14.5 M9.5,14.5 L9.5,12.5" />
          <path d="M17.2,11.8 L14.5,14.5 M14.5,14.5 L16.5,14.5 M14.5,14.5 L14.5,12.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.groomfetch',
    label: 'Groom Fetch',
    family: 'sop',
    description:
      'Diagonal orange-red groom comb with fine parallel teeth.',
    types: ['groomfetch'],
    icons: ['sop_groomfetch'],
    refKey: 'SOP_groomfetch',
    render: () => (
      <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round" strokeLinecap="round">
        <polygon
          points="2.2,12.8 19.8,2.2 21.8,4.8 4.2,15.5"
          fill="#faaf3e"
        />
        <line x1="4.2" y1="15.5" x2="7.2" y2="20.5" strokeWidth="1.5" />
        <line x1="6.8" y1="13.9" x2="9.8" y2="18.9" strokeWidth="1.5" />
        <line x1="9.4" y1="12.3" x2="12.4" y2="17.3" strokeWidth="1.5" />
        <line x1="12" y1="10.7" x2="15" y2="15.7" strokeWidth="1.5" />
        <line x1="14.6" y1="9.1" x2="17.6" y2="14.1" strokeWidth="1.5" />
        <line x1="17.2" y1="7.5" x2="20.2" y2="12.5" strokeWidth="1.5" />
        <line x1="19.8" y1="5.9" x2="22.2" y2="10.2" strokeWidth="1.5" />
        <g stroke="#e96712" strokeWidth="0.8">
          <line x1="4.2" y1="15.5" x2="7.2" y2="20.5" />
          <line x1="6.8" y1="13.9" x2="9.8" y2="18.9" />
          <line x1="9.4" y1="12.3" x2="12.4" y2="17.3" />
          <line x1="12" y1="10.7" x2="15" y2="15.7" />
          <line x1="14.6" y1="9.1" x2="17.6" y2="14.1" />
          <line x1="17.2" y1="7.5" x2="20.2" y2="12.5" />
          <line x1="19.8" y1="5.9" x2="22.2" y2="10.2" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.groomswitch',
    label: 'Groom Switch',
    family: 'sop',
    description:
      'Three stylized head busts with green, blue and coral hairstyles linked by circular switch arrows.',
    types: ['groomswitch'],
    icons: ['sop_groomswitch'],
    refKey: 'SOP_groomswitch',
    render: () => (
      <>
        <path
          d="M7.5,5.5 C10.5,3.5 13.5,3.5 16.5,5.5 M18.5,12.5 C17,16.5 13.5,18.2 9.5,17"
          fill="none"
          stroke="#262626"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M7.5,5.5 C10.5,3.5 13.5,3.5 16.5,5.5 M18.5,12.5 C17,16.5 13.5,18.2 9.5,17"
          fill="none"
          stroke="#729fcf"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <circle cx="5" cy="9.5" r="2.5" fill="#d0dfef" />
          <path d="M2.5,8.8 L3.8,5.8 L5,7.2 L6.5,5.5 L7.5,8.8 Z" fill="#8ae234" />
          <circle cx="19" cy="9.5" r="2.5" fill="#d0dfef" />
          <path d="M16.5,9 C16.5,6.2 18,5.5 19.5,5.8 C21,6.2 21.8,7.8 21.5,9.5 Z" fill="#f57f7f" />
          <circle cx="12" cy="18.2" r="2.8" fill="#d0dfef" />
          <path d="M9.2,17.5 C9.2,14.5 11,13.8 12.5,14 C14.2,14.2 15,15.8 14.8,17.8 Z" fill="#3465a4" />
        </g>
      </>
    ),
  },
];
