import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 5 Part 0 (icons 0 to 9): volume SOP icons.
 */
export const BATCH_05_PART_0: OperatorIconDef[] = [
  {
    id: 'sop.volumedeform',
    label: 'Volume Deform',
    family: 'sop',
    description:
      'Blue 3D wireframe volume wedge with a bright green deformed upper contour.',
    types: ['volumedeform'],
    icons: ['sop_volumedeform'],
    refKey: 'SOP_volumedeform',
    render: () => (
      <>
        <polygon
          points="3,16.5 7,19 20.5,13.5 21,9.5 16.5,7 14,3.5 11.5,8.5 7,11.5"
          fill="#204a87"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <polygon
          points="7,19 20.5,13.5 21,9.5 16.5,11 11.5,13.5 7,16"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#b2cbe5" strokeWidth="0.6">
          <path d="M11.5,8.5 L15.5,11.2 L15.5,15.5" />
          <path d="M8.5,10.5 L12.5,13.2 L12.5,16.8" />
          <path d="M5.5,13.5 L9.5,16.2 L9.5,18" />
          <path d="M7,16 L20.8,10.5" />
        </g>
        <path
          d="M3,16.5 C4,12.5 6.5,11.2 9,9.8 C11.5,8.4 13,5.5 14,3.5 L17.5,6.2"
          fill="none"
          stroke="#275917"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3,16.5 C4,12.5 6.5,11.2 9,9.8 C11.5,8.4 13,5.5 14,3.5 L17.5,6.2"
          fill="none"
          stroke="#8ae234"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.volumefeather',
    label: 'Volume Feather',
    family: 'sop',
    description:
      'Fluffy grey-white volume cloud surrounded by a soft translucent feathered halo.',
    types: ['volumefeather'],
    icons: ['sop_volumefeather'],
    refKey: 'SOP_volumefeather',
    render: () => (
      <>
        <path
          d="M6.5,18.5 C4,18.5 2.5,16.8 2.5,14.5 C2.5,13 3.3,11.6 4.6,11 C4.3,10.3 4.2,9.5 4.2,8.8 C4.2,6.5 6.2,4.8 8.6,4.8 C9.4,4.8 10.1,5 10.7,5.4 C11.4,3.8 13,2.8 15,2.8 C17,2.8 18.6,3.8 19.3,5.4 C19.9,5 20.6,4.8 21.2,5.2 C22.5,6 22.8,8.2 21.5,9.8 C22.3,10.8 22.5,12.2 21.8,13.5 C22.4,14.8 21.5,16.8 19.8,17.4 C19.2,18.8 17.5,19.6 15.8,19.2 C14.8,20.4 13,21 11.2,20.4 C9.8,20 8.8,19.2 8.2,18.3 C7.6,18.5 7,18.5 6.5,18.5 Z"
          fill="#c4c5c2"
          fillOpacity="0.35"
          stroke="#888a85"
          strokeWidth="2.2"
          strokeOpacity="0.35"
          strokeLinejoin="round"
        />
        <path
          d="M7.5,17.5 C5.4,17.5 4,16 4,14 C4,12.7 4.7,11.5 5.8,11 C5.5,10.3 5.4,9.7 5.4,9 C5.4,7 7.1,5.5 9.2,5.5 C9.9,5.5 10.5,5.7 11,6 C11.6,4.6 13,3.8 14.6,3.8 C16.3,3.8 17.7,4.7 18.3,6 C19.5,5.7 20.8,6.8 20.8,8.5 C20.8,9.2 20.5,9.9 20,10.4 C21,11.2 21.3,12.6 20.6,13.8 C20.9,15.2 19.8,16.8 18.2,17 C17.4,18.2 15.8,18.6 14.5,18 C13.5,19 11.8,19.2 10.6,18.2 C9.6,18.5 8.4,18 7.5,17.5 Z"
          fill="#e6e7e4"
          stroke="#5d5b58"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="9.5" r="2.6" fill="#ffffff" fillOpacity="0.8" />
        <circle cx="14.2" cy="8.2" r="2.8" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="15.8" cy="12.5" r="2.5" fill="#d3d7cf" fillOpacity="0.7" />
        <circle cx="10.2" cy="13.8" r="2.5" fill="#ffffff" fillOpacity="0.7" />
      </>
    ),
  },
  {
    id: 'sop.volumefft',
    label: 'Volume FFT',
    family: 'sop',
    description:
      'Fluffy volume cloud with a purple sinusoidal FFT frequency wave across the front.',
    types: ['volumefft'],
    icons: ['sop_volumefft'],
    refKey: 'SOP_volumefft',
    render: () => (
      <>
        <path
          d="M6.8,18.5 C4.5,18.5 3,16.8 3,14.6 C3,13.1 3.8,11.8 5,11.2 C4.7,10.5 4.5,9.7 4.5,9 C4.5,6.8 6.4,5 8.8,5 C9.6,5 10.3,5.2 10.9,5.6 C11.6,4 13.2,3 15,3 C16.9,3 18.5,4 19.2,5.6 C20.6,5.3 22,6.6 22,8.5 C22,9.3 21.7,10.1 21.1,10.7 C22.1,11.6 22.3,13.2 21.5,14.5 C21.8,16.1 20.5,17.8 18.7,18 C17.8,19.3 16,19.8 14.5,19 C13.3,20.2 11.4,20.4 10,19.2 C9,19.5 7.8,19 6.8,18.5 Z"
          fill="#d3d7cf"
          stroke="#51534f"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <circle cx="9.2" cy="9.2" r="2.8" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="14.5" cy="7.8" r="3" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="10.5" cy="14" r="2.6" fill="#ffffff" fillOpacity="0.7" />
        <path
          d="M5.5,15 C7,15 7.8,8.5 9.2,8.5 C10.6,8.5 11.2,17.5 12.6,17.5 C14,17.5 14.8,6.5 16.2,6.5 C17.6,6.5 18.2,15.5 19.6,15.5 C20.5,15.5 21,13.5 21.5,12.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M5.5,15 C7,15 7.8,8.5 9.2,8.5 C10.6,8.5 11.2,17.5 12.6,17.5 C14,17.5 14.8,6.5 16.2,6.5 C17.6,6.5 18.2,15.5 19.6,15.5 C20.5,15.5 21,13.5 21.5,12.5"
          fill="none"
          stroke="#5c3566"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.volumefromattrib',
    label: 'Volume from Attribute',
    family: 'sop',
    description:
      'Speech-bubble attribute tag with three dots pointing via a red arrow to a volume cloud.',
    types: ['volumefromattrib'],
    icons: ['sop_volumefromattrib'],
    refKey: 'SOP_volumefromattrib',
    render: () => (
      <>
        <path
          d="M11.5,19.8 C9.8,19.8 8.5,18.5 8.5,16.8 C8.5,15.7 9.1,14.7 10,14.2 C9.8,13.7 9.7,13.1 9.7,12.5 C9.7,10.8 11.1,9.5 12.9,9.5 C13.5,9.5 14,9.7 14.5,10 C15,8.8 16.2,8 17.6,8 C19,8 20.2,8.8 20.7,10 C21.8,9.8 22.8,10.8 22.8,12.2 C22.8,12.8 22.5,13.4 22.1,13.8 C22.8,14.5 23,15.7 22.4,16.7 C22.6,17.9 21.6,19.2 20.2,19.4 C19.5,20.4 18.2,20.7 17,20.1 C16.1,21 14.7,21.1 13.7,20.2 C12.9,20.5 12.1,20.2 11.5,19.8 Z"
          fill="#d3d7cf"
          stroke="#51534f"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <circle cx="13.5" cy="13" r="2.1" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="17.2" cy="12" r="2.2" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="16.5" cy="16.2" r="2" fill="#ffffff" fillOpacity="0.7" />
        <path
          d="M3,2.5 H10.5 C11.3,2.5 12,3.2 12,4 V7.5 C12,8.3 11.3,9 10.5,9 H7.5 L5.5,11 L5.5,9 H3 C2.2,9 1.5,8.3 1.5,7.5 V4 C1.5,3.2 2.2,2.5 3,2.5 Z"
          fill="#eeeeec"
          stroke="#2e3436"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <circle cx="4.2" cy="5.8" r="0.9" fill="#555753" />
        <circle cx="6.8" cy="5.8" r="0.9" fill="#555753" />
        <circle cx="9.4" cy="5.8" r="0.9" fill="#555753" />
        <polygon
          points="5.5,12 8.2,14.8 9.6,13.4 10.2,18.2 5.4,17.6 6.8,16.2 4,13.4"
          fill="#e96712"
          stroke="#590b08"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.volumemix',
    label: 'Volume Mix',
    family: 'sop',
    description:
      'Two overlapping fluffy grey-white volume clouds blending together.',
    types: ['volumemix'],
    icons: ['sop_volumemix'],
    refKey: 'SOP_volumemix',
    render: () => (
      <>
        <path
          d="M5.2,15.5 C3.4,15.5 2.2,14.2 2.2,12.5 C2.2,11.3 2.8,10.3 3.8,9.8 C3.6,9.2 3.5,8.6 3.5,8 C3.5,6.2 5,4.8 6.9,4.8 C7.5,4.8 8.1,5 8.6,5.3 C9.2,4 10.4,3.2 11.9,3.2 C13.4,3.2 14.6,4 15.2,5.3 C16.3,5 17.5,6 17.5,7.5 C17.5,8.2 17.2,8.8 16.8,9.3 C17.6,10 17.8,11.3 17.1,12.3 C17.3,13.6 16.3,15 14.8,15.2 C14.1,16.2 12.6,16.6 11.4,16 C10.4,17 8.9,17.1 7.8,16.2 C7,16.4 6,16 5.2,15.5 Z"
          fill="#d3d7cf"
          stroke="#51534f"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <circle cx="7.5" cy="8.2" r="2.2" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="11.5" cy="7.2" r="2.3" fill="#ffffff" fillOpacity="0.85" />
        <path
          d="M9.8,20.5 C8,20.5 6.8,19.2 6.8,17.5 C6.8,16.3 7.4,15.3 8.4,14.8 C8.2,14.2 8.1,13.6 8.1,13 C8.1,11.2 9.6,9.8 11.5,9.8 C12.1,9.8 12.7,10 13.2,10.3 C13.8,9 15,8.2 16.5,8.2 C18,8.2 19.2,9 19.8,10.3 C20.9,10 22.1,11 22.1,12.5 C22.1,13.2 21.8,13.8 21.4,14.3 C22.2,15 22.4,16.3 21.7,17.3 C21.9,18.6 20.9,20 19.4,20.2 C18.7,21.2 17.2,21.6 16,21 C15,22 13.5,22.1 12.4,21.2 C11.6,21.4 10.6,21 9.8,20.5 Z"
          fill="#e6e7e4"
          stroke="#51534f"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <circle cx="12.2" cy="13.2" r="2.2" fill="#ffffff" fillOpacity="0.9" />
        <circle cx="16.2" cy="12.2" r="2.4" fill="#ffffff" fillOpacity="0.9" />
        <circle cx="15.5" cy="16.5" r="2.2" fill="#ffffff" fillOpacity="0.75" />
      </>
    ),
  },
  {
    id: 'sop.volumenoisefog',
    label: 'Volume Noise Fog',
    family: 'sop',
    description:
      'Light blue isometric cube merging into a blue fog cloud with four small noisy directional arrows.',
    types: ['volumenoisefog'],
    icons: ['sop_volumenoisefog'],
    refKey: 'SOP_volumenoisefog',
    render: () => (
      <>
        <polygon
          points="9.5,3 14.5,5.5 14.5,11.5 9.5,14 4.5,11.5 4.5,5.5"
          fill="#b2cbe5"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon points="9.5,3 14.5,5.5 9.5,8 4.5,5.5" fill="#e3ecf5" />
        <polygon points="4.5,5.5 9.5,8 9.5,14 4.5,11.5" fill="#b2cbe5" />
        <polygon points="9.5,8 14.5,5.5 14.5,11.5 9.5,14" fill="#729fcf" />
        <path
          d="M8.5,16.5 C6.8,16.5 5.8,15.3 6,13.8 C6.2,12.6 7.2,11.8 8.3,11.8 C8.8,10.5 10,9.8 11.4,10 C12,8.4 13.6,7.4 15.4,7.6 C17.2,7.8 18.5,9.2 18.6,10.8 C20,11.2 21,12.5 20.8,14 C21.8,14.8 21.8,16.5 20.4,17.4 C19.4,18 17.8,17.8 16.8,17.2 C15.8,18.2 14,18.5 12.6,17.8 C11.2,18.2 9.6,17.6 8.5,16.5 Z"
          fill="#9edbe8"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <circle cx="14.5" cy="11.2" r="2.2" fill="#e3ecf5" fillOpacity="0.85" />
        <circle cx="11.2" cy="13.5" r="2" fill="#d0dfef" fillOpacity="0.8" />
        <g fill="#2c2c2c" stroke="#ffffff" strokeWidth="0.35">
          <polygon points="15.5,14.5 18.5,13 18,14.2 20,15 19.2,16.2 17.2,15.4 16.6,16.6" />
          <polygon points="12.5,18.5 15,16.8 15,18 17,18 17,19.3 15,19.3 15,20.5" />
          <polygon points="21.5,18.5 19,20.5 19.2,19.2 17.5,19 17.8,17.8 19.5,18 19.8,16.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumenoisesdf',
    label: 'Volume Noise SDF',
    family: 'sop',
    description:
      'Golden-amber SDF sphere split vertically between a smooth left half and a bumpy noise-displaced right half.',
    types: ['volumenoisesdf'],
    icons: ['sop_volumenoisesdf'],
    refKey: 'SOP_volumenoisesdf',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-sdf`} cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f5e1c1" />
            <stop offset="55%" stopColor="#e9b96e" />
            <stop offset="100%" stopColor="#8f5902" />
          </radialGradient>
        </defs>
        <circle
          cx="12"
          cy="12"
          r="9"
          fill={`url(#${uid}-sdf)`}
          stroke="#583701"
          strokeWidth="0.95"
        />
        <path
          d="M12,3 C10.2,3.4 9,7.2 9,12 C9,16.8 10.2,20.6 12,21"
          fill="none"
          stroke="#583701"
          strokeWidth="0.8"
        />
        <path
          d="M6.2,7.5 C7.5,5.5 9.5,4.3 11.5,4.2"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <g fill="#f0d09e" stroke="#8f5902" strokeWidth="0.55">
          <circle cx="14.5" cy="6.8" r="1.3" />
          <circle cx="17.8" cy="9" r="1.2" />
          <circle cx="14.2" cy="11.2" r="1.4" />
          <circle cx="18.2" cy="13.5" r="1.3" />
          <circle cx="15" cy="15.8" r="1.3" />
          <circle cx="13.2" cy="18.5" r="1.1" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumenoisevector',
    label: 'Volume Noise Vector',
    family: 'sop',
    description:
      'Translucent isometric volume cube containing bright green noisy vector arrows.',
    types: ['volumenoisevector'],
    icons: ['sop_volumenoisevector'],
    refKey: 'SOP_volumenoisevector',
    render: () => (
      <>
        <polygon
          points="12,2.5 20.5,7 20.5,16.5 12,21 3.5,16.5 3.5,7"
          fill="#e9e9e6"
          fillOpacity="0.75"
          stroke="#434542"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon points="12,2.5 20.5,7 12,11.5 3.5,7" fill="#ffffff" fillOpacity="0.6" />
        <polygon points="12,11.5 20.5,7 20.5,16.5 12,21" fill="#c8cdc3" fillOpacity="0.65" />
        <line x1="12" y1="2.5" x2="12" y2="21" stroke="#888a85" strokeWidth="0.6" />
        <polyline points="3.5,7 12,11.5 20.5,7" fill="none" stroke="#555753" strokeWidth="0.7" />
        <g fill="none" stroke="#4e9a06" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5,11 L9.2,8.5 M9.2,8.5 L7.5,8.5 M9.2,8.5 L9.2,10.2" />
          <path d="M9.5,15.5 L6.5,14 M6.5,14 L8,13.2 M6.5,14 L7.2,15.5" />
          <path d="M14.5,9.5 L17.5,7.8 M17.5,7.8 L15.8,7.5 M17.5,7.8 L17,9.5" />
          <path d="M14.2,14.5 L17.8,15.8 M17.8,15.8 L16.8,14.3 M17.8,15.8 L16.2,16.4" />
          <path d="M11.5,7.5 L13.2,5.2 M13.2,5.2 L11.6,5.4" />
          <path d="M11.2,18 L13.8,16.2 M13.8,16.2 L12.3,15.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.volumenormalize',
    label: 'Volume Normalize Weights',
    family: 'sop',
    description:
      'Purple-and-blue weight volume cloud above a dark circular badge reading 1.0.',
    types: ['volumenormalize'],
    icons: ['sop_volumenormalize'],
    refKey: 'SOP_volumenormalize',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-vn`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c7a8c4" />
            <stop offset="50%" stopColor="#ad7fa8" />
            <stop offset="100%" stopColor="#729fcf" />
          </linearGradient>
        </defs>
        <path
          d="M5.5,12 C3.8,12 2.5,10.8 2.5,9.2 C2.5,8 3.2,7 4.3,6.6 C4.2,5.2 5.4,4 7,4 C7.7,4 8.3,4.2 8.8,4.6 C9.5,3.2 11,2.4 12.6,2.4 C14.4,2.4 15.9,3.4 16.5,4.9 C17.2,4.5 18.2,4.5 19,5 C20.2,5.7 20.6,7.2 19.8,8.4 C21,9 21.5,10.4 20.8,11.5 C20.2,12.5 18.8,12.8 17.6,12.3 C16.6,13.2 14.8,13.4 13.5,12.6 C12.2,13.3 10.4,13.2 9.2,12.3 C8,12.7 6.6,12.5 5.5,12 Z"
          fill={`url(#${uid}-vn)`}
          stroke="#5c3566"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="15.8" r="5.4" fill="#2c2c2c" stroke="#eeeeec" strokeWidth="0.9" />
        <text
          x="12"
          y="17.6"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="5.4"
          fontWeight="bold"
          fill="#ffffff"
        >
          1.0
        </text>
      </>
    ),
  },
  {
    id: 'sop.volumepatch',
    label: 'Volume Patch',
    family: 'sop',
    description:
      'Small volume cloud at top-left patched onto a lower-right cloud with a red dashed circle and orange curved arrow.',
    types: ['volumepatch'],
    icons: ['sop_volumepatch'],
    refKey: 'SOP_volumepatch',
    render: () => (
      <>
        <path
          d="M4.5,12.5 C3,12.5 2,11.4 2,10 C2,9 2.6,8.1 3.5,7.8 C3.4,6.4 4.5,5.2 6,5.2 C6.5,5.2 7,5.4 7.4,5.7 C8,4.6 9.1,4 10.4,4 C11.7,4 12.8,4.7 13.3,5.8 C14.3,5.6 15.2,6.4 15.2,7.6 C15.2,8.4 14.8,9.1 14.1,9.5 C14.5,10.6 13.7,12 12.4,12.2 C11.6,13 10.2,13.2 9.2,12.5 C8.2,13.2 6.8,13.2 5.8,12.5 C5.4,12.6 4.9,12.6 4.5,12.5 Z"
          fill="#d3d7cf"
          stroke="#5d5b58"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="8.5" r="2.8" fill="#f9aeae" fillOpacity="0.6" stroke="#ef2929" strokeWidth="0.8" strokeDasharray="1.5 1.2" />
        <path
          d="M11,20.5 C9.5,20.5 8.5,19.4 8.5,18 C8.5,17 9.1,16.1 10,15.8 C9.9,14.4 11,13.2 12.5,13.2 C13,13.2 13.5,13.4 13.9,13.7 C14.5,12.6 15.6,12 16.9,12 C18.2,12 19.3,12.7 19.8,13.8 C20.8,13.6 21.8,14.4 21.8,15.6 C21.8,16.4 21.3,17.1 20.6,17.5 C21,18.6 20.2,20 18.9,20.2 C18.1,21 16.7,21.2 15.7,20.5 C14.7,21.2 13.3,21.2 12.3,20.5 C11.9,20.6 11.4,20.6 11,20.5 Z"
          fill="#e6e7e4"
          stroke="#5d5b58"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <circle cx="15.5" cy="16.8" r="3" fill="#f9aeae" fillOpacity="0.65" stroke="#ef2929" strokeWidth="0.85" strokeDasharray="1.5 1.2" />
        <path
          d="M9.5,7.2 C12.5,5.5 16,6.8 16.8,10.5"
          fill="none"
          stroke="#7c0000"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9.5,7.2 C12.5,5.5 16,6.8 16.8,10.5"
          fill="none"
          stroke="#fcaf3e"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <polygon points="14.8,10.2 18.2,10 16.8,12.5" fill="#ef8229" stroke="#7c0000" strokeWidth="0.6" strokeLinejoin="round" />
      </>
    ),
  },
];
