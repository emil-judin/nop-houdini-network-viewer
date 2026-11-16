import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_07_PART_3: OperatorIconDef[] = [
  {
    id: 'sop.tissuepropertiesotis',
    label: 'Tissue Properties Otis',
    family: 'sop',
    description:
      'Layered 3D tissue cross-section block with crimson muscle, golden adipose fat cells, and a green downward Otis arrow.',
    types: ['tissuepropertiesotis'],
    icons: ['sop_tissuepropertiesotis'],
    refKey: 'SOP_tissuepropertiesotis',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Top skin layer */}
          <polygon points="11.5,5.5 21,8.5 11.5,12.5 3,9" fill="#fdcfbd" strokeWidth="0.95" />
          {/* Left crimson muscle cross-section */}
          <polygon points="3,9 11.5,12.5 11.5,21 3,17" fill="#cb1b41" strokeWidth="1.0" />
          {/* Right golden adipose/fascia layer */}
          <polygon points="11.5,12.5 21,8.5 20.2,17 11.5,21" fill="#e5a83c" strokeWidth="1.0" />
          {/* Adipose fat cells */}
          <circle cx="14.5" cy="14.8" r="1.1" fill="#f7c864" stroke="#cc7b1b" strokeWidth="0.55" />
          <circle cx="17.5" cy="13.2" r="1.1" fill="#f7c864" stroke="#cc7b1b" strokeWidth="0.55" />
          <circle cx="16.2" cy="17.2" r="1" fill="#f7c864" stroke="#cc7b1b" strokeWidth="0.55" />
          {/* Green downward property arrow */}
          <polygon points="5,2.2 7.4,2.2 7.4,5.5 9,5.5 6.2,8.5 3.4,5.5 5,5.5" fill="#8ae234" strokeWidth="0.85" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.tissueproperties',
    label: 'Tissue Properties Vellum',
    family: 'sop',
    description:
      'Layered 3D tissue cross-section block with crimson muscle, golden adipose fat cells, and a green Vellum property arrow.',
    types: ['tissueproperties'],
    icons: ['sop_tissueproperties'],
    refKey: 'SOP_tissueproperties',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Top skin layer */}
          <polygon points="11.5,5.5 21,8.5 11.5,12.5 3,9" fill="#fedbcd" strokeWidth="0.95" />
          {/* Left crimson muscle cross-section */}
          <polygon points="3,9 11.5,12.5 11.5,21 3,17" fill="#900004" strokeWidth="1.0" />
          <path d="M5,11.5 L9.5,13.5 M5,14.5 L9.5,16.5" stroke="#f9b3c7" strokeWidth="0.65" />
          {/* Right golden adipose/fascia layer */}
          <polygon points="11.5,12.5 21,8.5 20.2,17 11.5,21" fill="#e5a83c" strokeWidth="1.0" />
          <circle cx="14.5" cy="14.8" r="1.1" fill="#f3c15d" stroke="#cc7b1b" strokeWidth="0.55" />
          <circle cx="17.5" cy="13.2" r="1.1" fill="#f3c15d" stroke="#cc7b1b" strokeWidth="0.55" />
          {/* Green downward property arrow */}
          <polygon points="5,2.2 7.4,2.2 7.4,5.5 9,5.5 6.2,8.5 3.4,5.5 5,5.5" fill="#73d216" strokeWidth="0.85" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.tissuesolidify',
    label: 'Tissue Solidify',
    family: 'sop',
    description:
      '3D tissue cross-section block with peach skin, crimson muscle, and a blue tetrahedral mesh on the cut face.',
    types: ['tissuesolidify'],
    icons: ['sop_tissuesolidify'],
    refKey: 'SOP_tissuesolidify',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Top peach skin face */}
          <polygon points="14.5,3.2 21.2,7.2 10.5,11.5 3,8.2" fill="#fdcfbd" strokeWidth="1.0" />
          {/* Right pink/crimson tissue side */}
          <polygon points="10.5,11.5 21.2,7.2 20.2,16.8 10.2,21" fill="#e9968c" strokeWidth="1.0" />
          {/* Left blue solidified tetrahedral face */}
          <polygon points="3,8.2 10.5,11.5 10.2,21 3.5,17.2" fill="#729fcf" strokeWidth="1.0" />
          <path
            d="M3,8.2 L6.8,14.5 L10.5,11.5 M3.5,17.2 L6.8,14.5 L10.2,21 M3,8.2 L10.2,21"
            fill="none"
            stroke="#262626"
            strokeWidth="0.65"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.tissuesolidifyotis',
    label: 'Tissue Solidify Otis',
    family: 'sop',
    description:
      '3D tissue cross-section block with peach skin, crimson muscle, and a purple-and-blue Otis tetrahedral face.',
    types: ['tissuesolidifyotis'],
    icons: ['sop_tissuesolidifyotis'],
    refKey: 'SOP_tissuesolidifyotis',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Top peach skin face */}
          <polygon points="14.5,3.2 21.2,7.2 10.5,11.5 3,8.2" fill="#fdcfbd" strokeWidth="1.0" />
          {/* Right pink/crimson tissue side */}
          <polygon points="10.5,11.5 21.2,7.2 20.2,16.8 10.2,21" fill="#f9b3c7" strokeWidth="1.0" />
          {/* Left purple Otis solidified tetrahedral face */}
          <polygon points="3,8.2 10.5,11.5 10.2,21 3.5,17.2" fill="#a672cf" strokeWidth="1.0" />
          <path
            d="M3,8.2 L6.8,14.5 L10.5,11.5 M3.5,17.2 L6.8,14.5 L10.2,21 M10.5,11.5 L3.5,17.2"
            fill="none"
            stroke="#262626"
            strokeWidth="0.65"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.tissuesolvervellum',
    label: 'Tissue Solver Vellum',
    family: 'sop',
    description:
      '3D anatomical tissue block showing peach skin, crimson muscle fibers, and golden adipose fat cells.',
    types: ['tissuesolvervellum'],
    icons: ['sop_tissuesolvervellum'],
    refKey: 'SOP_tissuesolvervellum',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Top skin layer */}
          <polygon points="12.5,3.5 21.2,7.2 10.8,11.5 2.8,7.8" fill="#fdcfbd" strokeWidth="1.0" />
          {/* Left crimson muscle face */}
          <polygon points="2.8,7.8 10.8,11.5 10.5,21 3.2,16.8" fill="#cb1b41" strokeWidth="1.0" />
          <path d="M4.8,11 L8.8,13 M4.8,14.2 L8.8,16.2" stroke="#f9b3c7" strokeWidth="0.65" />
          {/* Right golden adipose/fascia face */}
          <polygon points="10.8,11.5 21.2,7.2 20.2,16.8 10.5,21" fill="#e5a83c" strokeWidth="1.0" />
          <circle cx="14" cy="14" r="1.2" fill="#f7c864" stroke="#cc7b1b" strokeWidth="0.55" />
          <circle cx="17.5" cy="12.2" r="1.2" fill="#f7c864" stroke="#cc7b1b" strokeWidth="0.55" />
          <circle cx="16.2" cy="16.5" r="1.1" fill="#f7c864" stroke="#cc7b1b" strokeWidth="0.55" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.agentanimationunpack',
    label: 'Agent Animation Unpack',
    family: 'sop',
    description:
      'Open cardboard box unpacking a blue agent figure with green motion trail arcs.',
    types: ['agentanimationunpack'],
    icons: ['sop_kinefx-agentanimationunpack'],
    refKey: 'SOP_kinefx-agentanimationunpack',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Cardboard unpack box at bottom */}
          <polygon points="2.5,14.5 12,12.5 18.5,16 8.5,18.5" fill="#e8c48a" strokeWidth="0.9" />
          <polygon points="2.5,14.5 8.5,18.5 8.5,21.5 2.5,17.8" fill="#c89a5a" strokeWidth="0.9" />
          <polygon points="8.5,18.5 18.5,16 18.5,19.2 8.5,21.5" fill="#a8783c" strokeWidth="0.9" />
          {/* Green motion trail arc */}
          <path d="M5.5,10.5 C8.5,6.5 13,5.5 17,7.5" fill="none" stroke="#262626" strokeWidth="2.0" />
          <path d="M5.5,10.5 C8.5,6.5 13,5.5 17,7.5" fill="none" stroke="#8ae234" strokeWidth="1.1" />
          {/* Running blue agent figure emerging */}
          <circle cx="15" cy="4.2" r="1.8" fill="#729fcf" strokeWidth="0.85" />
          <path
            d="M11.5,8.2 L14.5,6.5 L18.5,8.5 M14.2,6.8 L13.2,11.5 L16.5,14.8 M13.2,11.5 L9.8,14.2"
            fill="none"
            stroke="#262626"
            strokeWidth="2.3"
          />
          <path
            d="M11.5,8.2 L14.5,6.5 L18.5,8.5 M14.2,6.8 L13.2,11.5 L16.5,14.8 M13.2,11.5 L9.8,14.2"
            fill="none"
            stroke="#729fcf"
            strokeWidth="1.2"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.agentcharacterunpack',
    label: 'Agent Character Unpack',
    family: 'sop',
    description:
      'Open cardboard box unpacking a standing blue character figure with a green rig core.',
    types: ['agentcharacterunpack'],
    icons: ['sop_kinefx-agentcharacterunpack'],
    refKey: 'SOP_kinefx-agentcharacterunpack',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Cardboard unpack box at bottom */}
          <polygon points="2.5,14.5 12,12.5 18.5,16 8.5,18.5" fill="#e8c48a" strokeWidth="0.9" />
          <polygon points="2.5,14.5 8.5,18.5 8.5,21.5 2.5,17.8" fill="#c89a5a" strokeWidth="0.9" />
          <polygon points="8.5,18.5 18.5,16 18.5,19.2 8.5,21.5" fill="#a8783c" strokeWidth="0.9" />
          {/* Standing blue character emerging */}
          <circle cx="13" cy="4.2" r="1.9" fill="#729fcf" strokeWidth="0.9" />
          <path
            d="M8.5,8.2 L13,6.8 L17.5,8.2 L16.8,10.2 L14.8,9.5 L14.5,15.2 H11.5 L11.2,9.5 L9.2,10.2 Z"
            fill="#729fcf"
            strokeWidth="0.95"
          />
          {/* Green rig spine inside torso */}
          <line x1="13" y1="7.5" x2="13" y2="14" stroke="#8ae234" strokeWidth="1.2" />
          <circle cx="13" cy="8.5" r="0.9" fill="#8ae234" stroke="none" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.agentfromrig',
    label: 'Agent from Rig',
    family: 'sop',
    description:
      'Standing blue humanoid agent silhouette containing a bright green KineFX skeleton rig.',
    types: ['agentfromrig'],
    icons: ['sop_kinefx-agentfromrig'],
    refKey: 'SOP_kinefx-agentfromrig',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Blue humanoid body */}
          <circle cx="12" cy="4" r="2" fill="#729fcf" strokeWidth="0.95" />
          <path
            d="M6,8.2 L12,6.8 L18,8.2 L17.2,10.5 L14.5,9.6 L14.2,14.2 L16,20.5 L13.6,20.8 L12,15.5 L10.4,20.8 L8,20.5 L9.8,14.2 L9.5,9.6 L6.8,10.5 Z"
            fill="#3465a4"
            strokeWidth="1.0"
          />
          {/* Green skeleton rig inside */}
          <path
            d="M12,7.8 V14 M8,9 L12,8.2 L16,9 M10.2,18.5 L12,14 L13.8,18.5"
            fill="none"
            stroke="#8ae234"
            strokeWidth="1.1"
          />
          <circle cx="12" cy="8.2" r="0.9" fill="#d6f5b8" stroke="none" />
          <circle cx="12" cy="14" r="0.9" fill="#d6f5b8" stroke="none" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.agentposefromrig',
    label: 'Agent Pose from Rig',
    family: 'sop',
    description:
      'Bent blue limb with an internal green joint bone and a coral-red rotation arc arrow.',
    types: ['agentposefromrig'],
    icons: ['sop_kinefx-agentposefromrig'],
    refKey: 'SOP_kinefx-agentposefromrig',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Coral-red pose rotation arc at top-left */}
          <path d="M4.5,13.5 A5.2,5.2 0 1 1 11.5,7.2" fill="none" stroke="#262626" strokeWidth="2.0" />
          <path d="M4.5,13.5 A5.2,5.2 0 1 1 11.5,7.2" fill="none" stroke="#f57f7f" strokeWidth="1.1" />
          <polygon points="11.5,5.2 13.5,8.2 10,8.2" fill="#f57f7f" strokeWidth="0.75" />
          {/* Bent blue agent limb */}
          <path
            d="M5.5,11.5 C6.5,10 8.2,10 9.5,11.2 L13.5,15.2 L18.5,10.2 C19.8,9 21.2,10.2 20.8,12.2 C20.2,14.2 15.8,19.2 14.2,20.5 C12.8,21.2 11.5,20.8 10.2,19.5 L5.2,14.2 C4.5,13.2 4.6,12.2 5.5,11.5 Z"
            fill="#729fcf"
            strokeWidth="1.05"
          />
          {/* Green internal rig bone and joint */}
          <polyline points="7.5,12.8 13,18.2 19,12" fill="none" stroke="#262626" strokeWidth="2.0" />
          <polyline points="7.5,12.8 13,18.2 19,12" fill="none" stroke="#8ae234" strokeWidth="1.1" />
          <circle cx="13" cy="18.2" r="1.4" fill="#d6f5b8" strokeWidth="0.75" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.kinefx.attachjointgeo',
    label: 'Attach Joint Geo',
    family: 'sop',
    description:
      'Blue humanoid skeleton figure with bright green wireframe control gizmos attached at the joints.',
    types: ['attachjointgeo'],
    icons: ['sop_kinefx-attachjointgeo'],
    refKey: 'SOP_kinefx-attachjointgeo',
    render: () => (
      <>
        <g stroke="#262626" strokeLinejoin="round" strokeLinecap="round">
          {/* Blue humanoid rig */}
          <path
            d="M12,5.5 V14 M6.5,9.5 L12,8.5 L17.5,9.5 M12,14 L9,20.5 M12,14 L15,20.5"
            fill="none"
            stroke="#262626"
            strokeWidth="2.6"
          />
          <path
            d="M12,5.5 V14 M6.5,9.5 L12,8.5 L17.5,9.5 M12,14 L9,20.5 M12,14 L15,20.5"
            fill="none"
            stroke="#729fcf"
            strokeWidth="1.5"
          />
          {/* Green wireframe control shapes at head, chest, and wrists */}
          <polygon points="12,2.2 14.8,4.2 12,6.2 9.2,4.2" fill="#8ae234" fillOpacity="0.65" stroke="#262626" strokeWidth="0.85" />
          <rect x="9.5" y="9.2" width="5" height="3.6" rx="0.4" fill="#8ae234" fillOpacity="0.55" stroke="#262626" strokeWidth="0.85" />
          <circle cx="6.2" cy="9.8" r="1.6" fill="#8ae234" stroke="#262626" strokeWidth="0.8" />
          <circle cx="17.8" cy="9.8" r="1.6" fill="#8ae234" stroke="#262626" strokeWidth="0.8" />
        </g>
      </>
    ),
  },
];
