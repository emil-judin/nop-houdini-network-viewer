import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 5 Part 4 (icons 40 to 49): HeightField SOP icons.
 */
export const BATCH_05_PART_4: OperatorIconDef[] = [
  {
    id: 'sop.heightfield_distortbylayer',
    label: 'HeightField Distort by Layer',
    family: 'sop',
    description:
      'Isometric blue heightfield grid with a wavy yellow layer distortion curve across the surface.',
    types: ['heightfield_distortbylayer'],
    icons: ['sop_heightfield_distortbylayer'],
    refKey: 'SOP_heightfield_distortbylayer',
    render: () => (
      <>
        <polygon
          points="2,13.5 9.5,6.8 22,10.2 15.2,17.8"
          fill="#6093c9"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="6.5,11 10.5,7.2 15.8,8.8 12.2,12.8"
          fill="#82a9d6"
          stroke="#204a87"
          strokeWidth="0.65"
        />
        <polygon
          points="2,13.5 15.2,17.8 15.2,19.6 2,15.2"
          fill="#3465a4"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="15.2,17.8 22,10.2 22,12 15.2,19.6"
          fill="#204a87"
          stroke="#204a87"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#204a87" strokeWidth="0.5">
          <line x1="5.8" y1="10.2" x2="18.6" y2="14" />
          <line x1="14" y1="8" x2="7" y2="15" />
          <line x1="18" y1="9.1" x2="11.2" y2="16.4" />
        </g>
        <path
          d="M5.2,10.8 C8.5,8.2 10.2,13.5 13.5,10.8 C15.8,9 17.5,12.5 19.5,11.2"
          fill="none"
          stroke="#c4a000"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path
          d="M5.2,10.8 C8.5,8.2 10.2,13.5 13.5,10.8 C15.8,9 17.5,12.5 19.5,11.2"
          fill="none"
          stroke="#fce94f"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.heightfield_distort',
    label: 'HeightField Distort by Noise',
    family: 'sop',
    description:
      'Isometric blue heightfield terrain surrounded by noisy dark-teal directional arrows.',
    types: ['heightfield_distort'],
    icons: ['sop_heightfield_distort'],
    refKey: 'SOP_heightfield_distort',
    render: () => (
      <>
        <polygon
          points="4.5,13 10.2,8.8 19.5,11.2 14.5,16.5"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon
          points="8.5,11.2 11.5,8.2 15,9.2 13.8,12.5 10.5,13"
          fill="#99badc"
          stroke="#204a87"
          strokeWidth="0.65"
        />
        <polygon
          points="4.5,13 14.5,16.5 14.5,18 4.5,14.5"
          fill="#4581bf"
          stroke="#204a87"
          strokeWidth="0.7"
        />
        <polygon
          points="14.5,16.5 19.5,11.2 19.5,12.8 14.5,18"
          fill="#204a87"
          stroke="#204a87"
          strokeWidth="0.7"
        />
        <g fill="#115971" stroke="#eeeeec" strokeWidth="0.45" strokeLinejoin="round">
          <polygon points="3.5,6.5 6.8,4.2 6.5,5.6 8.5,6 8.2,7.5 6.2,7.1 5.8,8.5" />
          <polygon points="13.5,3.5 16.8,5.5 15.5,6.2 16.5,8 15,8.8 14,7 12.8,7.6" />
          <polygon points="21.5,6.8 18.2,8.8 18.8,7.4 17,6.6 17.6,5.2 19.4,6 20,4.6" />
          <polygon points="2.5,18.2 6.2,16.5 5.6,17.8 7.5,18.6 6.8,20 4.9,19.2 4.3,20.5" />
          <polygon points="12.5,21.5 9.5,18.8 11,18.8 11.2,16.8 12.8,17 12.6,19 14,19" />
          <polygon points="20.8,18.5 17,19.8 17.8,18.5 16,17.4 16.8,16 18.6,17.1 19.4,15.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.heightfield_drawmask',
    label: 'HeightField Draw Mask',
    family: 'sop',
    description:
      'Isometric blue heightfield with a red mask loop drawn on the surface by a tilted blue stylus.',
    types: ['heightfield_drawmask'],
    icons: ['sop_heightfield_drawmask'],
    refKey: 'SOP_heightfield_drawmask',
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
          points="7.5,13 11.5,9.2 15.5,10.5 14.5,14.5 10.5,15.2"
          fill="#99badc"
          stroke="#204a87"
          strokeWidth="0.65"
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
        <path
          d="M6.8,14.2 C7.2,12.5 10.5,12 13,13 C15,13.8 14.8,15.8 12.5,16.2 C10,16.6 6.4,15.8 6.8,14.2 Z"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1.15"
        />
        <g stroke="#204a87" strokeWidth="0.75" strokeLinejoin="round">
          <polygon
            points="18.8,3.2 20.8,4.6 15.5,12.2 13.8,13.5 14.2,11.2"
            fill="#5b90c8"
          />
          <line x1="18.2" y1="4.2" x2="14.5" y2="11.4" stroke="#a5bfda" strokeWidth="0.6" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.heightfield_erode',
    label: 'HeightField Erode',
    family: 'sop',
    description:
      'Orange-red terraced canyon terrain carved by a winding turquoise river valley.',
    types: ['heightfield_erode'],
    icons: ['sop_heightfield_erode'],
    refKey: 'SOP_heightfield_erode',
    render: () => (
      <>
        <path
          d="M2,5.5 C6,4.5 10,3.8 14,4.2 C17.5,4.5 20,5.2 22,6 L22,19.5 C16,20.8 8,20.8 2,19.5 Z"
          fill="#f4a229"
          stroke="#5e1c07"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M2,8.5 C5.5,8.2 8.5,9.5 9.5,11.5 C10.5,13.2 8,15 5,15.5 L2,15.8 Z"
          fill="#ee5626"
          stroke="#833b00"
          strokeWidth="0.65"
        />
        <path
          d="M22,8 C18,8.2 15,9.8 14.5,11.8 C14,13.8 16.8,15.2 20,15.8 L22,16 Z"
          fill="#e15226"
          stroke="#833b00"
          strokeWidth="0.65"
        />
        <path
          d="M12.5,4.2 C11.8,6.5 12.8,8.5 12.2,10.8 C11.5,13.2 8.8,14.8 10.5,17.2 C11.8,19 15.5,19.5 18.5,20.1 L9.5,20.2 C6.8,18.8 5.5,16.8 7.5,14.5 C9.2,12.5 10.5,11 10.2,8.5 C10,6.5 10.8,5 11.2,4.2 Z"
          fill="#76c8b3"
          stroke="#204a87"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        <path
          d="M2,17.2 C8,18.6 16,18.6 22,17.2 L22,19.8 C16,21.2 8,21.2 2,19.8 Z"
          fill="#76b4c8"
          stroke="#5e1c07"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.heightfield_erode_hydro',
    label: 'HeightField Erode Hydro',
    family: 'sop',
    description:
      'Eroded orange canyon terrain with a dark badge showing hydro droplets flowing down a slope.',
    types: ['heightfield_erode_hydro'],
    icons: ['sop_heightfield_erode_flow'],
    refKey: 'SOP_heightfield_erode_flow',
    render: () => (
      <>
        <path
          d="M2,5.5 C6,4.5 10,3.8 14,4.2 C17.5,4.5 20,5.2 22,6 L22,19.5 C16,20.8 8,20.8 2,19.5 Z"
          fill="#f4a229"
          stroke="#5e1c07"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M2,8.5 C5.5,8.2 8.5,9.5 9.5,11.5 C10.5,13.2 8,15 5,15.5 L2,15.8 Z"
          fill="#ee5626"
          stroke="#833b00"
          strokeWidth="0.65"
        />
        <path
          d="M12.2,4.2 C11.5,7 12.5,9.5 11.2,12.5 C10,15 8,17 11,19.8 L7.5,19.8 C5.5,17 7.2,14.5 8.8,12 C10,9.5 9.8,6.5 10.8,4.2 Z"
          fill="#76c8b3"
          stroke="#204a87"
          strokeWidth="0.6"
        />
        <circle cx="16.5" cy="16.5" r="4.8" fill="#000000" stroke="#ffffff" strokeWidth="0.85" />
        <polygon points="13.2,19.2 13.2,14.2 18.2,19.2" fill="#ffffff" />
        <circle cx="16.2" cy="14" r="0.7" fill="#ffffff" />
        <circle cx="18" cy="15.6" r="0.7" fill="#ffffff" />
        <circle cx="19.5" cy="17.2" r="0.7" fill="#ffffff" />
      </>
    ),
  },
  {
    id: 'sop.heightfield_erode_precipitation',
    label: 'HeightField Erode Precipitation',
    family: 'sop',
    description:
      'Eroded orange canyon terrain with a dark badge showing a raincloud and falling precipitation.',
    types: ['heightfield_erode_precipitation'],
    icons: ['sop_heightfield_erode_precipitation'],
    refKey: 'SOP_heightfield_erode_precipitation',
    render: () => (
      <>
        <path
          d="M2,5.5 C6,4.5 10,3.8 14,4.2 C17.5,4.5 20,5.2 22,6 L22,19.5 C16,20.8 8,20.8 2,19.5 Z"
          fill="#f4a229"
          stroke="#5e1c07"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M2,8.5 C5.5,8.2 8.5,9.5 9.5,11.5 C10.5,13.2 8,15 5,15.5 L2,15.8 Z"
          fill="#ee5626"
          stroke="#833b00"
          strokeWidth="0.65"
        />
        <path
          d="M12.2,4.2 C11.5,7 12.5,9.5 11.2,12.5 C10,15 8,17 11,19.8 L7.5,19.8 C5.5,17 7.2,14.5 8.8,12 C10,9.5 9.8,6.5 10.8,4.2 Z"
          fill="#76c8b3"
          stroke="#204a87"
          strokeWidth="0.6"
        />
        <circle cx="16.5" cy="16.5" r="4.8" fill="#000000" stroke="#ffffff" strokeWidth="0.85" />
        <path
          d="M14.2,16.4 C13.4,16.4 12.8,15.8 12.8,15 C12.8,14.3 13.3,13.8 14,13.7 C14.3,12.9 15.1,12.4 16,12.4 C17,12.4 17.8,13 18,13.9 C18.7,14 19.2,14.5 19.2,15.2 C19.2,15.9 18.6,16.4 17.8,16.4 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.8"
        />
        <g stroke="#ffffff" strokeWidth="0.75" strokeLinecap="round">
          <line x1="14.5" y1="17.5" x2="14" y2="19.2" />
          <line x1="16.3" y1="17.5" x2="15.8" y2="19.2" />
          <line x1="18.1" y1="17.5" x2="17.6" y2="19.2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.heightfield_erode_thermal',
    label: 'HeightField Erode Thermal',
    family: 'sop',
    description:
      'Eroded orange canyon terrain with a dark badge showing a white thermometer.',
    types: ['heightfield_erode_thermal'],
    icons: ['sop_heightfield_erode_thermal'],
    refKey: 'SOP_heightfield_erode_thermal',
    render: () => (
      <>
        <path
          d="M2,5.5 C6,4.5 10,3.8 14,4.2 C17.5,4.5 20,5.2 22,6 L22,19.5 C16,20.8 8,20.8 2,19.5 Z"
          fill="#f4a229"
          stroke="#5e1c07"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M2,8.5 C5.5,8.2 8.5,9.5 9.5,11.5 C10.5,13.2 8,15 5,15.5 L2,15.8 Z"
          fill="#ee5626"
          stroke="#833b00"
          strokeWidth="0.65"
        />
        <path
          d="M12.2,4.2 C11.5,7 12.5,9.5 11.2,12.5 C10,15 8,17 11,19.8 L7.5,19.8 C5.5,17 7.2,14.5 8.8,12 C10,9.5 9.8,6.5 10.8,4.2 Z"
          fill="#76c8b3"
          stroke="#204a87"
          strokeWidth="0.6"
        />
        <circle cx="16.5" cy="16.5" r="4.8" fill="#000000" stroke="#ffffff" strokeWidth="0.85" />
        <rect
          x="15.5"
          y="12.5"
          width="2"
          height="5"
          rx="1"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.8"
        />
        <circle cx="16.5" cy="18.4" r="1.5" fill="#ffffff" />
        <line x1="16.5" y1="14.5" x2="16.5" y2="18" stroke="#ffffff" strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'sop.heightfield_file',
    label: 'HeightField File',
    family: 'sop',
    description:
      'Open orange file folder with a curved arrow loading an isometric blue heightfield terrain.',
    types: ['heightfield_file'],
    icons: ['sop_heightfield_file'],
    refKey: 'SOP_heightfield_file',
    render: () => (
      <>
        <polygon
          points="2,5 7.5,3.8 9,5.2 15.8,3.8 16.8,14.5 2.8,18"
          fill="#faaf3e"
          stroke="#7f390b"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2.8,18 4.2,8.5 18.2,5.2 16.8,14.5"
          fill="#e3ecef"
          stroke="#525b66"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon
          points="7,16.8 13.2,12.2 22,14.5 16.8,20.2"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="11.2,15 14.5,11.8 17.8,12.8 16.5,16.2 13.5,16.8"
          fill="#99badc"
          stroke="#204a87"
          strokeWidth="0.65"
        />
        <polygon
          points="7,16.8 16.8,20.2 16.8,21.5 7,18.2"
          fill="#4581bf"
          stroke="#204a87"
          strokeWidth="0.7"
        />
        <path
          d="M11.5,5.2 C14.5,3.8 18.2,5.2 19,8.8"
          fill="none"
          stroke="#7f390b"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M11.5,5.2 C14.5,3.8 18.2,5.2 19,8.8"
          fill="none"
          stroke="#faaf3e"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <polygon
          points="16.8,8.5 21,8.2 19.2,11.2"
          fill="#e96712"
          stroke="#7f390b"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.heightfield_flatten',
    label: 'HeightField Flatten',
    family: 'sop',
    description:
      'Terraced green-and-brown earth block being stamped flat in the center by a heavy grey stone pillar.',
    types: ['heightfield_flatten'],
    icons: ['sop_heightfield_flatten'],
    refKey: 'SOP_heightfield_flatten',
    render: () => (
      <>
        <polygon
          points="2,11.5 12,6.5 22,11.5 22,16.2 12,21.5 2,16.2"
          fill="#8f5902"
          stroke="#432901"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2,11.5 12,6.5 22,11.5 12,16.5"
          fill="#6db32b"
          stroke="#4e9a06"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <polygon
          points="12,16.5 22,11.5 22,16.2 12,21.5"
          fill="#6b4301"
          stroke="#432901"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <polygon
          points="7.5,11.5 12,9.2 16.5,11.5 12,13.8"
          fill="#e9b96e"
          stroke="#623c01"
          strokeWidth="0.65"
        />
        <polygon
          points="8.8,3.2 15.2,3.2 14.5,11.5 12,12.8 9.5,11.5"
          fill="#babdb6"
          stroke="#2e3436"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon points="12,3.2 15.2,3.2 14.5,11.5 12,12.8" fill="#888a85" />
      </>
    ),
  },
  {
    id: 'sop.heightfield_flowfield',
    label: 'HeightField Flow Field',
    family: 'sop',
    description:
      'Tan rocky landslide slumping down a steep slope onto a dark grey base plate.',
    types: ['heightfield_flowfield', 'heightfield_slump'],
    icons: ['sop_heightfield_flowfield', 'sop_heightfield_slump'],
    refKey: 'SOP_heightfield_flowfield',
    render: () => (
      <>
        <polygon
          points="2,16.5 11.5,12.5 19.5,4.5 21.5,5.5 21.5,15.5 11.5,21 2,17.8"
          fill="#6c6f69"
          stroke="#2e3436"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon points="2,16.5 11.5,12.5 19.5,15.2 11.5,19.6" fill="#a1a39f" />
        <polygon points="11.5,19.6 21.5,14.2 21.5,15.5 11.5,21 2,17.8 2,16.5" fill="#393b38" />
        <g stroke="#462d01" strokeWidth="0.7" strokeLinejoin="round">
          <polygon points="15.5,4.2 20.5,3 21.8,5.2 18.2,6.8 14.8,5.8" fill="#f1d3a4" />
          <polygon points="13.5,7.2 19.8,5.8 21.2,8.5 16.5,10.2 12.8,9" fill="#e9b96e" />
          <polygon points="11.2,10.5 18.5,9 20.5,12.5 14.5,14.8 10.2,13.2" fill="#b77b1c" />
          <polygon points="7.5,14.5 14.5,12.5 18.2,14.8 12.5,17.8 6.8,16.2" fill="#e9b96e" />
        </g>
      </>
    ),
  },
];
