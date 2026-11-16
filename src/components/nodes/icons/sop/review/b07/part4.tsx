import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_07_PART_4: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.attribtransformcompute',
    label: 'Attribute Transform Compute',
    family: 'sop',
    description:
      'Blue joint point at lower-left with a white speech bubble containing a bracketed calculator.',
    types: ['attribtransformcompute'],
    icons: ['sop_kinefx-attribtransformcompute'],
    refKey: 'SOP_kinefx-attribtransformcompute',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Speech bubble */}
          <path
            d="M12.5,2.5 C17.8,2.5 21.8,6.2 21.8,10.8 C21.8,15.4 17.8,18.8 12.5,18.8 C10.8,18.8 9.2,18.4 7.8,17.8 L4.2,19.5 L5.5,16.2 C3.8,14.8 2.8,12.9 2.8,10.8 C2.8,6.2 6.8,2.5 12.5,2.5 Z"
            fill="#ffffff"
            strokeWidth="1.0"
          />
          {/* Matrix brackets inside bubble */}
          <path d="M7.8,6.2 H6.5 V15.2 H7.8 M17.2,6.2 H18.5 V15.2 H17.2" fill="none" stroke="#262626" strokeWidth="0.9" />
          {/* Calculator body */}
          <rect x="9.2" y="6.5" width="6.6" height="8.4" rx="0.8" fill="#d3d7cf" strokeWidth="0.8" />
          <rect x="10.2" y="7.5" width="4.6" height="2" fill="#8dbf14" stroke="none" />
          {/* Calculator buttons */}
          <g fill="#546063" stroke="none">
            <rect x="10.2" y="10.4" width="1.2" height="1.2" />
            <rect x="11.9" y="10.4" width="1.2" height="1.2" />
            <rect x="13.6" y="10.4" width="1.2" height="1.2" />
            <rect x="10.2" y="12.3" width="1.2" height="1.2" />
            <rect x="11.9" y="12.3" width="1.2" height="1.2" />
            <rect x="13.6" y="12.3" width="1.2" height="1.2" />
          </g>
          {/* Blue point circle at bottom-left */}
          <circle cx="3.5" cy="20.5" r="1.6" fill="#729fcf" strokeWidth="0.85" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.attribtransformextract',
    label: 'Attribute Transform Extract',
    family: 'sop',
    description:
      'Four corner speech bubbles with transform brackets pointing to a central blue joint chain.',
    types: ['attribtransformextract'],
    icons: ['sop_kinefx-attribtransformextract'],
    refKey: 'SOP_kinefx-attribtransformextract',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Four corner speech bubbles */}
          <rect x="2" y="2" width="7.5" height="6" rx="2" fill="#ffffff" strokeWidth="0.85" />
          <rect x="14.5" y="2" width="7.5" height="6" rx="2" fill="#ffffff" strokeWidth="0.85" />
          <rect x="2" y="16" width="7.5" height="6" rx="2" fill="#ffffff" strokeWidth="0.85" />
          <rect x="14.5" y="16" width="7.5" height="6" rx="2" fill="#ffffff" strokeWidth="0.85" />
          {/* Tiny brackets inside bubbles */}
          <path
            d="M4.2,3.6 H3.5 V6.4 H4.2 M7.3,3.6 H8 V6.4 H7.3 M16.7,3.6 H16 V6.4 H16.7 M19.8,3.6 H20.5 V6.4 H19.8 M4.2,17.6 H3.5 V20.4 H4.2 M7.3,17.6 H8 V20.4 H7.3 M16.7,17.6 H16 V20.4 H16.7 M19.8,17.6 H20.5 V20.4 H19.8"
            fill="none"
            strokeWidth="0.65"
          />
          {/* Central blue joint chain */}
          <line x1="8" y1="12" x2="16" y2="12" stroke="#262626" strokeWidth="2.2" />
          <line x1="8" y1="12" x2="16" y2="12" stroke="#729fcf" strokeWidth="1.2" />
          <circle cx="8" cy="12" r="1.8" fill="#729fcf" strokeWidth="0.85" />
          <circle cx="16" cy="12" r="1.8" fill="#3465a4" strokeWidth="0.85" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.biped_retarget',
    label: 'Biped Retarget',
    family: 'sop',
    description:
      'Orange source biped figure retargeting motion via a green arrow to a blue target biped figure.',
    types: ['biped_retarget'],
    icons: ['sop_kinefx-biped_retarget'],
    refKey: 'SOP_kinefx-biped_retarget',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Left orange source biped */}
          <circle cx="6.5" cy="4.2" r="1.7" fill="#fcaf3e" strokeWidth="0.85" />
          <path
            d="M3,8.5 L6.5,7 L9.8,8.5 M6.5,7 V13.5 L4.5,19.5 M6.5,13.5 L8.5,19.5"
            fill="none"
            stroke="#262626"
            strokeWidth="2.4"
          />
          <path
            d="M3,8.5 L6.5,7 L9.8,8.5 M6.5,7 V13.5 L4.5,19.5 M6.5,13.5 L8.5,19.5"
            fill="none"
            stroke="#f57900"
            strokeWidth="1.3"
          />
          {/* Right blue target biped */}
          <circle cx="17.2" cy="4.2" r="1.7" fill="#729fcf" strokeWidth="0.85" />
          <path
            d="M14,7.5 L17.2,7 L20.8,5.8 M17.2,7 V13.5 L15.2,20 M17.2,13.5 L19.5,19.2"
            fill="none"
            stroke="#262626"
            strokeWidth="2.4"
          />
          <path
            d="M14,7.5 L17.2,7 L20.8,5.8 M17.2,7 V13.5 L15.2,20 M17.2,13.5 L19.5,19.2"
            fill="none"
            stroke="#729fcf"
            strokeWidth="1.3"
          />
          {/* Green retargeting arrow */}
          <polygon
            points="9.5,10.5 12.2,10.5 12.2,9 14.8,11.5 12.2,14 12.2,12.5 9.5,12.5"
            fill="#73d216"
            strokeWidth="0.8"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.biped_setup',
    label: 'Biped Setup',
    family: 'sop',
    description:
      'Blue biped character in T-pose surrounded by green circular rig control gizmos.',
    types: ['biped_setup'],
    icons: ['sop_kinefx-biped_setup'],
    refKey: 'SOP_kinefx-biped_setup',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Blue T-pose biped figure */}
          <circle cx="12" cy="3.8" r="1.8" fill="#83abd4" strokeWidth="0.85" />
          <path
            d="M3.5,8 L12,7.2 L20.5,8 L20.2,9.8 L14.2,9.5 L13.8,14.2 L14.8,20.5 H12.8 L12,15.2 L11.2,20.5 H9.2 L10.2,14.2 L9.8,9.5 L3.8,9.8 Z"
            fill="#4979bd"
            strokeWidth="0.95"
          />
          {/* Green control rings around torso and legs */}
          <ellipse cx="12" cy="12" rx="4.2" ry="1.3" fill="none" stroke="#262626" strokeWidth="1.7" />
          <ellipse cx="12" cy="12" rx="4.2" ry="1.3" fill="none" stroke="#8ae234" strokeWidth="0.95" />
          <ellipse cx="12" cy="17.5" rx="4.5" ry="1.3" fill="none" stroke="#262626" strokeWidth="1.7" />
          <ellipse cx="12" cy="17.5" rx="4.5" ry="1.3" fill="none" stroke="#8ae234" strokeWidth="0.95" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.capturepackedgeo',
    label: 'Capture Packed Geometry',
    family: 'sop',
    description:
      'Segmented figure made of blue, yellow, and red packed blocks captured onto a green joint chain.',
    types: ['capturepackedgeo'],
    icons: ['sop_kinefx-capturepackedgeo'],
    refKey: 'SOP_kinefx-capturepackedgeo',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Segmented packed character parts */}
          <ellipse cx="12" cy="4.2" rx="3.2" ry="1.6" fill="#729fcf" strokeWidth="0.85" />
          {/* Blue chest block */}
          <polygon points="7,7 17,7 16,12 8,12" fill="#729fcf" strokeWidth="0.9" />
          {/* Yellow pelvis block */}
          <polygon points="8,12.5 16,12.5 15.2,16 8.8,16" fill="#fce94f" strokeWidth="0.9" />
          {/* Red leg blocks */}
          <rect x="8.5" y="16.5" width="2.8" height="4.2" rx="0.5" fill="#ef2929" strokeWidth="0.85" />
          <rect x="12.7" y="16.5" width="2.8" height="4.2" rx="0.5" fill="#ef2929" strokeWidth="0.85" />
          {/* Green skeleton chain inside */}
          <line x1="12" y1="6.5" x2="12" y2="15" stroke="#262626" strokeWidth="2.0" />
          <line x1="12" y1="6.5" x2="12" y2="15" stroke="#8ae234" strokeWidth="1.1" />
          <circle cx="12" cy="9.2" r="1.1" fill="#8ae234" stroke="#262626" strokeWidth="0.65" />
          <circle cx="12" cy="14.2" r="1.1" fill="#8ae234" stroke="#262626" strokeWidth="0.65" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.characterblendshapechannels',
    label: 'Character Blend Shape Channels',
    family: 'sop',
    description:
      'Blue sculpted character head profile next to vertical blendshape channel sliders.',
    types: ['characterblendshapechannels'],
    icons: ['sop_kinefx-characterblendshapechannels'],
    refKey: 'SOP_kinefx-characterblendshapechannels',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-cbsc`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b2cbe5" />
            <stop offset="55%" stopColor="#3465a4" />
            <stop offset="100%" stopColor="#00255d" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Blue sculpted character head */}
          <path
            d="M3.5,11 C3.5,6.2 6.8,3.2 10.8,3.5 C13.8,3.8 15.5,6.2 15.8,9.5 L17,11.5 L15.5,12.8 C15.2,15.5 13.8,17.2 11.8,17.5 L11.2,20.5 H5.8 L6.2,16.8 C4.2,15.2 3.5,13.2 3.5,11 Z"
            fill={`url(#${uid}-cbsc)`}
            strokeWidth="1.0"
          />
          {/* Eye and mouth expression lines */}
          <path d="M11.5,9.2 C12.5,8.8 13.5,9.2 14,9.8 M11.2,14.5 C12.5,14.8 13.8,14.2 14.5,13.5" fill="none" stroke="#ffffff" strokeWidth="0.75" />
          {/* Vertical channel sliders on right */}
          <line x1="19.5" y1="4" x2="19.5" y2="20" stroke="#262626" strokeWidth="1.8" />
          <line x1="19.5" y1="4" x2="19.5" y2="20" stroke="#d3d7cf" strokeWidth="0.9" />
          <rect x="17.8" y="6.5" width="3.4" height="2" rx="0.4" fill="#ef2929" strokeWidth="0.75" />
          <rect x="17.8" y="13.5" width="3.4" height="2" rx="0.4" fill="#729fcf" strokeWidth="0.75" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.characterblendshapes',
    label: 'Character Blend Shapes',
    family: 'sop',
    description:
      'Blue sculpted character head bust showing expressive brow and smile blendshape contours.',
    types: ['characterblendshapes'],
    icons: ['sop_kinefx-characterblendshapes'],
    refKey: 'SOP_kinefx-characterblendshapes',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-cbs`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b2cbe5" />
            <stop offset="55%" stopColor="#3465a4" />
            <stop offset="100%" stopColor="#00255d" />
          </linearGradient>
        </defs>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Blue sculpted character head centered */}
          <path
            d="M5.5,11 C5.5,5.8 9,2.8 13.2,3.2 C16.5,3.5 18.5,6.2 18.8,9.8 L20.2,12 L18.5,13.5 C18.2,16.5 16.5,18.2 14.2,18.5 L13.5,21 H7.8 L8.2,17.5 C6.2,15.8 5.5,13.5 5.5,11 Z"
            fill={`url(#${uid}-cbs)`}
            strokeWidth="1.05"
          />
          {/* Highlighted facial expression features */}
          <path
            d="M12.5,8.2 C14,7.5 15.8,8 16.8,9.2 M13.2,10.2 C14.5,10 15.5,10.2 16.2,10.8 M12.5,15.2 C14.2,15.8 15.8,15 16.8,13.8"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.85"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.characterblendshapesadd',
    label: 'Character Blend Shapes Add',
    family: 'sop',
    description:
      'Blue character head with a circular arc of three yellow expression faces being added.',
    types: ['characterblendshapesadd'],
    icons: ['sop_kinefx-characterblendshapesadd'],
    refKey: 'SOP_kinefx-characterblendshapesadd',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Connecting arc on right */}
          <path d="M11.5,3.5 A8.5,8.5 0 0 1 18.5,18.5" fill="none" stroke="#262626" strokeWidth="1.6" />
          <path d="M11.5,3.5 A8.5,8.5 0 0 1 18.5,18.5" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          {/* Blue character head on left */}
          <path
            d="M3,12.5 C3,8.5 5.8,6.2 9,6.5 C11.5,6.8 13,8.8 13.2,11.5 L14.2,13 L13,14.2 C12.8,16.5 11.2,18 9.2,18.2 L8.8,20.5 H4.5 L4.8,17.5 C3.5,16.2 3,14.5 3,12.5 Z"
            fill="#285092"
            strokeWidth="1.0"
          />
          <path d="M8.5,11.2 C9.5,10.8 10.8,11.2 11.5,11.8 M8.5,15.2 C9.8,15.5 11,15 11.8,14.2" fill="none" stroke="#a2bede" strokeWidth="0.7" />
          {/* Three yellow expression badges along arc */}
          <circle cx="12" cy="3.8" r="2.2" fill="#fce94f" strokeWidth="0.8" />
          <circle cx="19.5" cy="9.2" r="2.2" fill="#fce94f" strokeWidth="0.8" />
          <circle cx="19" cy="17.2" r="2.2" fill="#fce94f" strokeWidth="0.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.characterblendshapesextract',
    label: 'Character Blend Shapes Extract',
    family: 'sop',
    description:
      'Blue character head on the right with three yellow expression faces extracted along a left arc.',
    types: ['characterblendshapesextract'],
    icons: ['sop_kinefx-characterblendshapesextract'],
    refKey: 'SOP_kinefx-characterblendshapesextract',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Connecting arc on left */}
          <path d="M12.5,3.5 A8.5,8.5 0 0 0 5.5,18.5" fill="none" stroke="#262626" strokeWidth="1.6" />
          <path d="M12.5,3.5 A8.5,8.5 0 0 0 5.5,18.5" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          {/* Blue character head on right */}
          <path
            d="M10.5,12.5 C10.5,8.5 13.2,6.2 16.5,6.5 C19,6.8 20.5,8.8 20.8,11.5 L21.5,13 L20.5,14.2 C20.2,16.5 18.8,18 16.8,18.2 L16.2,20.5 H12 L12.2,17.5 C11,16.2 10.5,14.5 10.5,12.5 Z"
            fill="#285092"
            strokeWidth="1.0"
          />
          <path d="M16,11.2 C17,10.8 18.2,11.2 19,11.8 M16,15.2 C17.2,15.5 18.5,15 19.2,14.2" fill="none" stroke="#a2bede" strokeWidth="0.7" />
          {/* Three yellow expression badges along left arc */}
          <circle cx="12" cy="3.8" r="2.2" fill="#fce94f" strokeWidth="0.8" />
          <circle cx="4.5" cy="9.2" r="2.2" fill="#fce94f" strokeWidth="0.8" />
          <circle cx="5" cy="17.2" r="2.2" fill="#fce94f" strokeWidth="0.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.characterio',
    label: 'Character I/O',
    family: 'sop',
    description:
      'Blue character figure with a green rig standing atop a grey storage drive.',
    types: ['characterio'],
    icons: ['sop_kinefx-characterio'],
    refKey: 'SOP_kinefx-characterio',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Storage drive unit at bottom */}
          <polygon points="5.5,14 18.5,14 21,18.5 3,18.5" fill="#d3d7cf" strokeWidth="0.95" />
          <rect x="3" y="18.5" width="18" height="3" rx="0.5" fill="#888a85" strokeWidth="0.95" />
          <rect x="5" y="19.4" width="5" height="1.2" fill="#8ae234" stroke="none" />
          {/* Blue character figure with green rig */}
          <circle cx="12" cy="3.5" r="1.8" fill="#729fcf" strokeWidth="0.85" />
          <path
            d="M7,7.2 L12,6.2 L17,7.2 L16.5,9 L14,8.5 L13.8,12.5 L15,16.5 H13 L12,13.5 L11,16.5 H9 L10.2,12.5 L10,8.5 L7.5,9 Z"
            fill="#3465a4"
            strokeWidth="0.95"
          />
          <line x1="12" y1="6.8" x2="12" y2="12.5" stroke="#8ae234" strokeWidth="1.1" />
        </g>
      </>
    ),
  },
];
