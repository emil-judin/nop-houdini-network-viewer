import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 5 Part 5 (icons 50 to 59): HeightField layer and mask SOP icons.
 */
export const BATCH_05_PART_5: OperatorIconDef[] = [
  {
    id: 'sop.heightfield_isolatelayer',
    label: 'HeightField Isolate Layer',
    family: 'sop',
    description:
      'Isometric heightfield terrain divided into rainbow-colored layer cells.',
    types: ['heightfield_isolatelayer'],
    icons: ['sop_heightfield_isolatelayer'],
    refKey: 'SOP_heightfield_isolatelayer',
    render: () => (
      <>
        <polygon
          points="2,13.5 9.5,8.2 22,11.2 15.8,17.8"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <g stroke="#204a87" strokeWidth="0.55" strokeLinejoin="round">
          <polygon points="2,13.5 5.8,10.8 9.8,12 6,14.8" fill="#05fdec" />
          <polygon points="5.8,10.8 9.5,8.2 13.5,9.2 9.8,12" fill="#8ae234" />
          <polygon points="9.5,8.2 13.5,9.2 17.8,10.2 14,7.5" fill="#b20fe8" />
          <polygon points="6,14.8 9.8,12 14,13.2 10.2,16.2" fill="#20e12a" />
          <polygon points="9.8,12 13.5,9.2 17.8,10.2 14,13.2" fill="#f0de11" />
          <polygon points="10.2,16.2 14,13.2 18.2,14.5 15.8,17.8" fill="#0556ff" />
          <polygon points="14,13.2 17.8,10.2 22,11.2 18.2,14.5" fill="#ff0202" />
        </g>
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
    id: 'sop.heightfield_layer',
    label: 'HeightField Layer',
    family: 'sop',
    description:
      'Isometric heightfield terrain with grey base cells on the back and yellow, orange, and red layer cells on the front.',
    types: ['heightfield_layer'],
    icons: ['sop_heightfield_layer'],
    refKey: 'SOP_heightfield_layer',
    render: () => (
      <>
        <polygon
          points="2,13.5 9.5,8.2 22,11.2 15.8,17.8"
          fill="#d3d7cf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <g stroke="#204a87" strokeWidth="0.55" strokeLinejoin="round">
          <polygon points="2,13.5 5.8,10.8 9.8,12 6,14.8" fill="#fce94f" />
          <polygon points="6,14.8 9.8,12 14,13.2 10.2,16.2" fill="#fcaf3e" />
          <polygon points="10.2,16.2 14,13.2 18.2,14.5 15.8,17.8" fill="#ef2929" />
          <polygon points="9.8,12 13.5,9.2 17.8,10.2 14,13.2" fill="#729fcf" />
        </g>
        <polygon
          points="2,13.5 15.8,17.8 15.8,19.6 2,15.2"
          fill="#3465a4"
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
    id: 'sop.heightfield_layerclear',
    label: 'HeightField Layer Clear',
    family: 'sop',
    description:
      'Multicolor heightfield terrain being swept clean to white by a yellow broom.',
    types: ['heightfield_layerclear'],
    icons: ['sop_heightfield_layerclear'],
    refKey: 'SOP_heightfield_layerclear',
    render: () => (
      <>
        <polygon
          points="2,15.2 9.5,10 22,13 15.8,19.5"
          fill="#ffffff"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <g stroke="#204a87" strokeWidth="0.5" strokeLinejoin="round">
          <polygon points="2,15.2 5.8,12.5 9.8,13.6 6,16.4" fill="#05fdec" />
          <polygon points="6,16.4 9.8,13.6 13.8,14.8 10.2,17.8" fill="#8ae234" />
          <polygon points="5.8,12.5 9.5,10 13.2,11 9.8,13.6" fill="#ab10ff" />
        </g>
        <polygon
          points="2,15.2 15.8,19.5 15.8,21.2 2,16.8"
          fill="#4e86c3"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="15.8,19.5 22,13 22,14.8 15.8,21.2"
          fill="#204a87"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <g stroke="#9b650c" strokeWidth="0.75" strokeLinejoin="round">
          <line x1="19.8" y1="2.8" x2="15.5" y2="8.2" stroke="#c17d10" strokeWidth="1.8" strokeLinecap="round" />
          <polygon
            points="14.2,7.2 17.5,9.5 14.5,13.8 10.2,11.2"
            fill="#fde63a"
          />
          <line x1="12.2" y1="12.4" x2="14.6" y2="9.2" stroke="#c4a000" strokeWidth="0.55" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.heightfield_layerproperty',
    label: 'HeightField Layer Properties',
    family: 'sop',
    description:
      'Isometric blue heightfield terrain with a dark circular gear badge at bottom right.',
    types: ['heightfield_layerproperty'],
    icons: ['sop_heightfield_layerproperty'],
    refKey: 'SOP_heightfield_layerproperty',
    render: () => (
      <>
        <polygon
          points="2,12.5 9.5,7.2 22,10.2 15.8,16.8"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="7.5,10.2 11.5,6.5 15.5,7.8 14.5,11.8 10.5,12.5"
          fill="#99badc"
          stroke="#204a87"
          strokeWidth="0.65"
        />
        <polygon
          points="2,12.5 15.8,16.8 15.8,18.5 2,14.2"
          fill="#4e86c3"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <circle cx="16.5" cy="16.2" r="5" fill="#000000" stroke="#ffffff" strokeWidth="0.85" />
        <g stroke="#eeeeec" strokeWidth="1.2" strokeLinecap="round">
          <line x1="16.5" y1="12.6" x2="16.5" y2="19.8" />
          <line x1="12.9" y1="16.2" x2="20.1" y2="16.2" />
          <line x1="14" y1="13.7" x2="19" y2="18.7" />
          <line x1="19" y1="13.7" x2="14" y2="18.7" />
        </g>
        <circle cx="16.5" cy="16.2" r="2.2" fill="#eeeeec" />
        <circle cx="16.5" cy="16.2" r="1" fill="#000000" />
      </>
    ),
  },
  {
    id: 'sop.heightfield_maskbyfeature',
    label: 'HeightField Mask by Feature',
    family: 'sop',
    description:
      'Isometric blue heightfield terrain with a curved orange-yellow arrow sweeping down the slope.',
    types: ['heightfield_maskbyfeature'],
    icons: ['sop_heightfield_maskbyfeature'],
    refKey: 'SOP_heightfield_maskbyfeature',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mbf`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef2929" />
            <stop offset="100%" stopColor="#eaef29" />
          </linearGradient>
        </defs>
        <polygon
          points="2,14.2 9.5,9 22,12 15.8,18.5"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="7.5,12 11.5,8.2 15.5,9.5 14.5,13.5 10.5,14.2"
          fill="#99badc"
          stroke="#204a87"
          strokeWidth="0.65"
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
        <path
          d="M10.5,3.2 L13.8,3.2 C13.8,6.2 15.2,7.8 18.2,8.2 L18.2,6.5 L21,9.5 L18.2,12.2 L18.2,10.5 C13.5,10 10.8,7.5 10.5,3.2 Z"
          fill={`url(#${uid}-mbf)`}
          stroke="#262626"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.heightfield_maskbyobject',
    label: 'HeightField Mask by Geometry',
    family: 'sop',
    description:
      'Isometric blue heightfield terrain intersected vertically by a translucent green bounding prism.',
    types: ['heightfield_maskbyobject'],
    icons: ['sop_heightfield_maskbyobject'],
    refKey: 'SOP_heightfield_maskbyobject',
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
        <polygon
          points="7.5,4.2 11.5,2 16.5,3.2 16,18.2 12.5,21.5 7.8,19.5"
          fill="#b3ec7c"
          fillOpacity="0.45"
          stroke="#73d216"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polyline
          points="7.5,4.2 12.5,5.5 16.5,3.2"
          fill="none"
          stroke="#73d216"
          strokeWidth="0.7"
        />
        <line x1="12.5" y1="5.5" x2="12.5" y2="21.5" stroke="#73d216" strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.heightfield_maskbyocclusion',
    label: 'HeightField Mask by Occlusion',
    family: 'sop',
    description:
      'Isometric blue heightfield terrain with bright yellow occlusion highlights in the concave valleys.',
    types: ['heightfield_maskbyocclusion'],
    icons: ['sop_heightfield_maskbyconcavity'],
    refKey: 'SOP_heightfield_maskbyconcavity',
    render: () => (
      <>
        <polygon
          points="2,13.5 9.5,8.2 22,11.2 15.8,17.8"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <g stroke="#204a87" strokeWidth="0.55" strokeLinejoin="round">
          <polygon points="6.2,12 9.2,9.8 11.8,10.5 9,12.8" fill="#fce94f" />
          <polygon points="9,12.8 11.8,10.5 14.8,11.4 12.2,13.8" fill="#edd400" />
          <polygon points="12.2,13.8 14.8,11.4 17.5,12.2 15,14.8" fill="#fce94f" />
          <polygon points="8.5,10.5 11.5,7.5 15,8.6 13.8,12" fill="#99badc" />
        </g>
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
    id: 'sop.heightfield_noise',
    label: 'HeightField Noise',
    family: 'sop',
    description:
      'Isometric blue heightfield terrain covered by a bright lime-green jagged noise wireframe.',
    types: ['heightfield_noise'],
    icons: ['sop_heightfield_noise'],
    refKey: 'SOP_heightfield_noise',
    render: () => (
      <>
        <polygon
          points="2,14 9.5,8.8 22,11.8 15.8,18.2"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2,14 15.8,18.2 15.8,19.8 2,15.6"
          fill="#4e86c3"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="15.8,18.2 22,11.8 22,13.5 15.8,19.8"
          fill="#204a87"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#8ae234" strokeWidth="0.85" strokeLinejoin="round">
          <polygon points="3.5,12.5 8.5,8.2 13.5,7.8 19.8,10.5 15.2,15.5 9.2,14.8" />
          <polyline points="5.8,10.5 11.2,9.2 16.5,12.5" />
          <polyline points="8.5,8.2 11.2,9.2 9.2,14.8" />
          <polyline points="13.5,7.8 11.2,9.2 15.2,15.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.heightfield_output',
    label: 'HeightField Output',
    family: 'sop',
    description:
      'Three stacked white isometric image layers above a blue heightfield base.',
    types: ['heightfield_output'],
    icons: ['sop_heightfield_output'],
    refKey: 'SOP_heightfield_output',
    render: () => (
      <>
        <polygon
          points="2,15.5 9.5,11 22,13.8 15.8,19.5"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2,15.5 15.8,19.5 15.8,21 2,17"
          fill="#4e86c3"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="15.8,19.5 22,13.8 22,15.2 15.8,21"
          fill="#204a87"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="3,12 9.5,7.8 21,10.5 15.2,15.5"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon
          points="3,9.2 9.5,5 21,7.7 15.2,12.7"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon
          points="3,6.4 9.5,2.2 21,4.9 15.2,9.9"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.heightfield_paint',
    label: 'HeightField Paint',
    family: 'sop',
    description:
      'Isometric blue heightfield terrain being painted with an orange-red stroke by a brown paintbrush.',
    types: ['heightfield_paint'],
    icons: ['sop_heightfield_paint'],
    refKey: 'SOP_heightfield_paint',
    render: () => (
      <>
        <polygon
          points="2,15.2 9.5,10 22,13 15.8,19.5"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2,15.2 15.8,19.5 15.8,21.2 2,16.8"
          fill="#4581bf"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="15.8,19.5 22,13 22,14.8 15.8,21.2"
          fill="#204a87"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <ellipse
          cx="11.2"
          cy="14.2"
          rx="3"
          ry="1.4"
          fill="#ef2929"
          fillOpacity="0.75"
          stroke="#ea8113"
          strokeWidth="0.6"
        />
        <g stroke="#262626" strokeWidth="0.75" strokeLinejoin="round">
          <polygon
            points="19.5,2.2 21.5,3.8 15.5,10.8 13.8,9.5"
            fill="#ea8113"
          />
          <polygon
            points="13.8,9.5 15.5,10.8 14,12.4 12.5,11.2"
            fill="#d3d7cf"
          />
          <path
            d="M12.5,11.2 L14,12.4 C13.2,13.6 11.5,14.2 10.2,13.8 C11,12.8 11.8,12 12.5,11.2 Z"
            fill="#505359"
          />
        </g>
      </>
    ),
  },
];
