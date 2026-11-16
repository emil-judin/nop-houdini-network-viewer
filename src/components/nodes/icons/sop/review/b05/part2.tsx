import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 5 Part 2 (icons 20 to 29): volume SOP icons.
 */
export const BATCH_05_PART_2: OperatorIconDef[] = [
  {
    id: 'sop.volumeresize',
    label: 'Volume Resize',
    family: 'sop',
    description:
      'Fluffy grey-white volume cloud surrounded by a larger dashed cloud outline indicating resized bounds.',
    types: ['volumeresize'],
    icons: ['sop_volumeresize'],
    refKey: 'SOP_volumeresize',
    render: () => (
      <>
        <path
          d="M6,19.2 C3.6,19.2 2,17.4 2,15 C2,13.4 2.8,12 4.1,11.3 C3.8,10.5 3.6,9.7 3.6,8.8 C3.6,6.4 5.6,4.5 8.2,4.5 C9,4.5 9.8,4.7 10.5,5.1 C11.3,3.4 13,2.3 15,2.3 C17,2.3 18.7,3.4 19.5,5.1 C21,4.8 22.4,6.2 22.4,8.2 C22.4,9.1 22.1,10 21.4,10.6 C22.5,11.6 22.7,13.3 21.8,14.7 C22.1,16.5 20.7,18.3 18.8,18.5 C17.8,19.9 15.9,20.4 14.3,19.6 C13,20.8 11,21 9.5,19.8 C8.4,20.1 7.1,19.7 6,19.2 Z"
          fill="none"
          stroke="#51534f"
          strokeWidth="0.9"
          strokeDasharray="1.8 1.4"
          strokeLinejoin="round"
        />
        <path
          d="M8,16.8 C6.2,16.8 5,15.5 5,13.8 C5,12.6 5.6,11.6 6.6,11.1 C6.4,10.5 6.3,9.9 6.3,9.3 C6.3,7.6 7.8,6.2 9.6,6.2 C10.2,6.2 10.8,6.4 11.3,6.7 C11.9,5.5 13.1,4.8 14.5,4.8 C15.9,4.8 17.1,5.5 17.7,6.7 C18.8,6.5 19.8,7.5 19.8,8.9 C19.8,9.5 19.5,10.1 19.1,10.6 C19.9,11.3 20,12.5 19.4,13.5 C19.6,14.8 18.6,16.1 17.2,16.3 C16.5,17.3 15.1,17.6 14,17 C13,17.9 11.6,18 10.6,17.2 C9.8,17.4 8.8,17.1 8,16.8 Z"
          fill="#d3d7cf"
          stroke="#51534f"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <circle cx="10.2" cy="9.8" r="2.2" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="14.2" cy="8.8" r="2.3" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="13.5" cy="13.2" r="2.1" fill="#ffffff" fillOpacity="0.75" />
      </>
    ),
  },
  {
    id: 'sop.volumesdf',
    label: 'Volume SDF',
    family: 'sop',
    description:
      'Fluffy grey-white volume cloud containing concentric blue signed-distance iso-contour rings.',
    types: ['volumesdf'],
    icons: ['sop_volumesdf'],
    refKey: 'SOP_volumesdf',
    render: () => (
      <>
        <path
          d="M6.8,18.5 C4.5,18.5 3,16.8 3,14.6 C3,13.1 3.8,11.8 5,11.2 C4.7,10.5 4.5,9.7 4.5,9 C4.5,6.8 6.4,5 8.8,5 C9.6,5 10.3,5.2 10.9,5.6 C11.6,4 13.2,3 15,3 C16.9,3 18.5,4 19.2,5.6 C20.6,5.3 22,6.6 22,8.5 C22,9.3 21.7,10.1 21.1,10.7 C22.1,11.6 22.3,13.2 21.5,14.5 C21.8,16.1 20.5,17.8 18.7,18 C17.8,19.3 16,19.8 14.5,19 C13.3,20.2 11.4,20.4 10,19.2 C9,19.5 7.8,19 6.8,18.5 Z"
          fill="#d3d7cf"
          stroke="#51534f"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M8.5,16.2 C6.8,16 5.8,14.6 6,13 C6.2,11.8 7,11 7.8,10.5 C7.6,8.8 9,7.4 10.8,7.4 C11.5,7.4 12.1,7.6 12.6,8 C13.2,6.8 14.5,6 15.8,6.2 C17.2,6.4 18.2,7.5 18.2,9 C19.2,9.6 19.5,11 18.8,12.2 C19.4,13.4 18.6,15 17.2,15.4 C16.2,16.5 14.5,16.8 13.2,16 C11.8,16.8 9.8,16.8 8.5,16.2 Z"
          fill="none"
          stroke="#729fcf"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M10.2,14.2 C9.2,14 8.5,13 8.8,12 C9,11 9.8,10.4 10.6,10.2 C11,9.2 12,8.5 13.2,8.6 C14.4,8.7 15.4,9.6 15.5,10.8 C16.2,11.5 16,12.8 15.2,13.5 C14.4,14.3 13,14.5 12,14 C11.4,14.3 10.8,14.3 10.2,14.2 Z"
          fill="#729fcf"
          fillOpacity="0.45"
          stroke="#204a87"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <circle cx="12.5" cy="11.6" r="1.4" fill="#ffffff" stroke="#204a87" strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.volumeslice',
    label: 'Volume Slice',
    family: 'sop',
    description:
      'Fluffy volume cloud cut horizontally by a dark perspective slice plane showing cross-section contours.',
    types: ['volumeslice'],
    icons: ['sop_volumeslice'],
    refKey: 'SOP_volumeslice',
    render: () => (
      <>
        <path
          d="M6.5,14 C5.2,13 4.8,11.2 5.5,9.6 C5.4,7.6 7,6 9.2,6 C9.9,6 10.5,6.2 11,6.5 C11.7,5 13.1,4.2 14.8,4.2 C16.5,4.2 17.9,5.1 18.5,6.5 C19.8,6.4 21,7.5 21,9.2 C21,10.2 20.5,11.1 19.8,11.6"
          fill="#d3d7cf"
          stroke="#51534f"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="9.2" r="2.3" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="14.5" cy="8.2" r="2.5" fill="#ffffff" fillOpacity="0.85" />
        <polygon
          points="4.5,11.8 19.5,11.8 22,17.2 2,17.2"
          fill="#2e3436"
          stroke="#eeeeec"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <ellipse
          cx="12"
          cy="14.5"
          rx="6.2"
          ry="1.8"
          fill="#888a85"
          stroke="#d3d7cf"
          strokeWidth="0.7"
        />
        <ellipse
          cx="12"
          cy="14.5"
          rx="3.4"
          ry="1"
          fill="#eeeeec"
        />
        <path
          d="M7.2,17.2 C8,18.8 9.8,19.6 11.8,19.4 C13.2,20 15,19.8 16.2,18.8 C17.4,18.6 18.2,18 18.6,17.2"
          fill="#c4c5c2"
          stroke="#51534f"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.volumesplice',
    label: 'Volume Splice',
    family: 'sop',
    description:
      'Four subdivided blue-and-grey volume blocks pushed together by four corner arrows.',
    types: ['volumesplice'],
    icons: ['sop_volumesplice'],
    refKey: 'SOP_volumesplice',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.75" strokeLinejoin="round">
          <polygon points="12,3 17.5,4.8 12,6.8 6.5,4.8" fill="#eeeeec" />
          <polygon points="6.5,4.8 12,6.8 12,10.2 6.5,8.2" fill="#babdb6" />
          <polygon points="12,6.8 17.5,4.8 17.5,8.2 12,10.2" fill="#729fcf" />

          <polygon points="6.2,10.2 11.5,12 11.5,16 6.2,14" fill="#babdb6" />
          <polygon points="12.5,12 17.8,10.2 17.8,14 12.5,16" fill="#729fcf" />

          <polygon points="6.5,15.5 12,17.5 12,21 6.5,19" fill="#babdb6" />
          <polygon points="12,17.5 17.5,15.5 17.5,19 12,21" fill="#729fcf" />
        </g>
        <g fill="#efd529" stroke="#a40000" strokeWidth="0.7" strokeLinejoin="round">
          <polygon points="2.5,3.5 6.8,3.8 5.8,4.8 7.8,6.8 6.5,8 4.5,6 3.5,7" />
          <polygon points="21.5,3.5 17.2,3.8 18.2,4.8 16.2,6.8 17.5,8 19.5,6 20.5,7" />
          <polygon points="2.5,19.5 6.8,19.2 5.8,18.2 7.8,16.2 6.5,15 4.5,17 3.5,16" />
          <polygon points="21.5,19.5 17.2,19.2 18.2,18.2 16.2,16.2 17.5,15 19.5,17 20.5,16" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumestamp',
    label: 'Volume Stamp',
    family: 'sop',
    description:
      'Fluffy grey-white volume cloud with four dark-ringed circular point stamps inside.',
    types: ['volumestamp'],
    icons: ['sop_volumestamp'],
    refKey: 'SOP_volumestamp',
    render: () => (
      <>
        <path
          d="M6.8,18.5 C4.5,18.5 3,16.8 3,14.6 C3,13.1 3.8,11.8 5,11.2 C4.7,10.5 4.5,9.7 4.5,9 C4.5,6.8 6.4,5 8.8,5 C9.6,5 10.3,5.2 10.9,5.6 C11.6,4 13.2,3 15,3 C16.9,3 18.5,4 19.2,5.6 C20.6,5.3 22,6.6 22,8.5 C22,9.3 21.7,10.1 21.1,10.7 C22.1,11.6 22.3,13.2 21.5,14.5 C21.8,16.1 20.5,17.8 18.7,18 C17.8,19.3 16,19.8 14.5,19 C13.3,20.2 11.4,20.4 10,19.2 C9,19.5 7.8,19 6.8,18.5 Z"
          fill="#d3d7cf"
          stroke="#51534f"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <circle cx="9.2" cy="9" r="2.8" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="15" cy="8.2" r="2.8" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="10.2" cy="14.2" r="2.6" fill="#ffffff" fillOpacity="0.8" />
        <circle cx="15.8" cy="13.8" r="2.6" fill="#ffffff" fillOpacity="0.8" />
        <g fill="#555753" stroke="#262626" strokeWidth="0.55">
          <circle cx="8.8" cy="8.6" r="1.1" />
          <circle cx="15.2" cy="7.8" r="1.1" />
          <circle cx="9.8" cy="14" r="1.1" />
          <circle cx="15.8" cy="13.8" r="1.1" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumesurface',
    label: 'Volume Surface',
    family: 'sop',
    description:
      'Soft light-blue cloud on the left half transitioning across a vertical split into a solid lime-green surface on the right.',
    types: ['volumesurface'],
    icons: ['sop_volumesurface'],
    refKey: 'SOP_volumesurface',
    render: () => (
      <>
        <path
          d="M12,6.5 C10.8,6.2 9.5,6.8 9,8 C8,7.8 6.8,8.5 6.4,9.8 C5,10 3.8,11.2 3.8,12.6 C3.8,13.5 4.2,14.3 4.8,14.8 C3.8,15.4 3.2,16.4 3.5,17.5 H12 Z"
          fill="#abe0f2"
          stroke="#72cff0"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <circle cx="8.2" cy="12.5" r="2.4" fill="#ffffff" fillOpacity="0.75" />
        <circle cx="10.2" cy="10.2" r="2" fill="#ffffff" fillOpacity="0.8" />
        <path
          d="M12,6.5 C13.2,6.2 14.5,6.8 15,8.2 C16,7.8 17,8.8 16.6,10.2 C17.8,9.8 19.2,10.8 18.8,12.2 C18.5,13.2 17.5,13.8 16.8,14.2 C18,14.2 19,15 18.8,16 C19.8,15.8 20.8,16.4 20.8,17.5 H12 Z"
          fill="#8fc73e"
          stroke="#3a6610"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M13.2,8.5 C14,8.2 14.8,8.8 15,9.8 M15.2,11.5 C16.2,11.2 17,11.8 17,12.8"
          fill="none"
          stroke="#f9ec00"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.volumetrail',
    label: 'Volume Trail',
    family: 'sop',
    description:
      'Dark 3D bounding box containing colorful glowing velocity trail ribbons.',
    types: ['volumetrail'],
    icons: ['sop_volumetrail'],
    refKey: 'SOP_volumetrail',
    render: () => (
      <>
        <polygon
          points="3.5,4.8 14,3 20.5,6.8 19.5,17 9.5,20.8 4.2,14.8"
          fill="#2e3436"
          stroke="#eeeeec"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <polygon
          points="3.5,4.8 14,3 20.5,6.8 19.5,17 9.5,20.8 4.2,14.8"
          fill="none"
          stroke="#4e9a06"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        <g fill="none" strokeWidth="1.15" strokeLinecap="round">
          <path d="M5.5,7.2 C8.5,9.5 11.5,10.2 16,9.5" stroke="#ef2929" />
          <path d="M9.5,5.5 C11.5,8.2 14,9.8 17.8,10.5" stroke="#fcaf3e" />
          <path d="M5.2,10.5 C8.5,12.5 12.5,12 17.5,13.5" stroke="#fce94f" />
          <path d="M6.2,14 C9.5,12 13.5,11.5 17.2,15.2" stroke="#8ae234" />
          <path d="M8.5,17.2 C11.2,14.8 14.5,14 18,16.2" stroke="#729fcf" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumevelocity',
    label: 'Volume Velocity',
    family: 'sop',
    description:
      'Translucent grey 3D isometric box filled with swirling white and grey velocity streamlines.',
    types: ['volumevelocity'],
    icons: ['sop_volumevelocity'],
    refKey: 'SOP_volumevelocity',
    render: () => (
      <>
        <polygon
          points="2.8,5 13.5,2.5 21.2,7 20,17.5 9.2,21.5 3.8,14.8"
          fill="#c5c5c5"
          stroke="#41454c"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polygon points="2.8,5 13.5,2.5 21.2,7 9.5,10.2" fill="#ebebeb" />
        <polygon points="9.5,10.2 21.2,7 20,17.5 9.2,21.5" fill="#b0b5ba" />
        <g fill="none" stroke="#ffffff" strokeWidth="0.65">
          <line x1="13.5" y1="2.5" x2="13.2" y2="12.5" />
          <line x1="3.8" y1="14.8" x2="13.2" y2="12.5" />
          <line x1="13.2" y1="12.5" x2="20" y2="17.5" />
        </g>
        <g fill="none" stroke="#41454c" strokeWidth="0.85" strokeLinecap="round">
          <path d="M6.5,8.5 C9.5,6.2 14,6.8 16.5,9.5" />
          <path d="M16.5,9.5 C18.2,11.8 17.5,15 14.5,16.8" />
          <path d="M14.5,16.8 C11.5,18.2 8,16.8 6.8,13.8" />
          <path d="M9.5,11 C11.5,9.5 14.2,10.2 14.8,12.5 C15.2,14.2 13.5,15.5 11.2,14.8" />
        </g>
        <polyline
          points="2.8,5 9.5,10.2 21.2,7"
          fill="none"
          stroke="#6d7580"
          strokeWidth="0.7"
        />
        <line x1="9.5" y1="10.2" x2="9.2" y2="21.5" stroke="#6d7580" strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.volumevisualization',
    label: 'Volume Visualization',
    family: 'sop',
    description:
      'Fluffy volume cloud behind a rounded dark viewport frame displaying a bright green glowing volume contour.',
    types: ['volumevisualization'],
    icons: ['sop_volumevisualization'],
    refKey: 'SOP_volumevisualization',
    render: () => (
      <>
        <path
          d="M5.5,16.2 C3.6,16.2 2.2,14.8 2.2,12.8 C2.2,11.5 2.9,10.4 4,9.8 C3.8,9.2 3.6,8.5 3.6,7.8 C3.6,5.8 5.3,4.2 7.5,4.2 C8.2,4.2 8.8,4.4 9.4,4.8 C10,3.4 11.4,2.5 13,2.5 C14.7,2.5 16.1,3.4 16.7,4.8 C18,4.6 19.2,5.7 19.2,7.4 C19.2,8.2 18.8,9 18.2,9.5"
          fill="#d3d7cf"
          stroke="#51534f"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <circle cx="7.8" cy="8" r="2.4" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="12.5" cy="6.8" r="2.5" fill="#ffffff" fillOpacity="0.85" />
        <polygon
          points="11,9.5 21,7.5 21,18.5 11,20.8"
          fill="#eeeeec"
          stroke="#2e3436"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="12.4,10.8 19.6,9.2 19.6,17.2 12.4,18.8"
          fill="#1f2325"
        />
        <path
          d="M14,16.8 C13.2,15.5 13.8,13.5 15.2,12.8 C15.8,11.2 17.5,10.8 18.4,12 C19,13.2 18.6,15.2 17.2,16.2 C16,17 14.8,17.2 14,16.8 Z"
          fill="#4e9a06"
          fillOpacity="0.45"
          stroke="#8ae234"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.volumevop',
    label: 'Volume VOP',
    family: 'sop',
    description:
      'Fluffy grey-white volume cloud puffs arranged into a bold letter V.',
    types: ['volumevop'],
    icons: ['sop_volumevop'],
    refKey: 'SOP_volumevop',
    render: () => (
      <>
        <path
          d="M4.5,3.5 C6.2,3.5 7.5,4.8 7.8,6.5 C8.8,7.2 9.4,8.5 9.2,9.8 C10.2,10.6 10.8,12 10.6,13.2 C11.2,13.8 11.6,14.5 12,15.2 C12.4,14.5 12.8,13.8 13.4,13.2 C13.2,12 13.8,10.6 14.8,9.8 C14.6,8.5 15.2,7.2 16.2,6.5 C16.5,4.8 17.8,3.5 19.5,3.5 C21,3.5 22.2,4.8 22,6.4 C21.8,7.6 21,8.5 20.2,9 C20.6,10.2 20,11.5 19,12.2 C19.2,13.4 18.5,14.6 17.4,15.2 C17.5,16.4 16.8,17.6 15.6,18.2 C15.2,19.6 13.8,20.8 12,20.8 C10.2,20.8 8.8,19.6 8.4,18.2 C7.2,17.6 6.5,16.4 6.6,15.2 C5.5,14.6 4.8,13.4 5,12.2 C4,11.5 3.4,10.2 3.8,9 C3,8.5 2.2,7.6 2,6.4 C1.8,4.8 3,3.5 4.5,3.5 Z"
          fill="#d3d7cf"
          stroke="#51534f"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <g fill="#ffffff" fillOpacity="0.85">
          <circle cx="4.8" cy="5.8" r="1.8" />
          <circle cx="6.8" cy="9.5" r="1.7" />
          <circle cx="8.8" cy="13.2" r="1.7" />
          <circle cx="12" cy="17.8" r="2" />
          <circle cx="15.2" cy="13.2" r="1.7" />
          <circle cx="17.2" cy="9.5" r="1.7" />
          <circle cx="19.2" cy="5.8" r="1.8" />
        </g>
      </>
    ),
  },
];
