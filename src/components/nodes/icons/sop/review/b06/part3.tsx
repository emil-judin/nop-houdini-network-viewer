import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 6, Part 3 (icons 30 to 39): RBD SOP icons.
 */
export const BATCH_06_PART_3: OperatorIconDef[] = [
  {
    id: 'sop.rbdconetwistconstraintproperties',
    label: 'RBD Cone Twist Constraint Properties',
    family: 'sop',
    description:
      'Orange cone and blue cylinder joined at an angled cone-twist pivot with a metallic pin.',
    types: ['rbdconetwistconstraintproperties'],
    icons: ['sop_rbdconetwistconstraintproperties'],
    refKey: 'SOP_rbdconetwistconstraintproperties',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <path
            d="M11.5,11.2 L16.5,5.2 C17.8,4.2 19.8,5.5 21,7.5 C22,9.2 22.2,11.2 20.8,12.2 L14.2,15.5 Z"
            fill="#3465a4"
          />
          <ellipse
            cx="18.8"
            cy="8.6"
            rx="2.2"
            ry="4.2"
            transform="rotate(-38 18.8 8.6)"
            fill="#99badc"
          />
          <path
            d="M4.5,10.2 C6.2,8.5 9.8,9.8 12.2,12.8 C14.5,15.8 15.2,19 13.5,20.5 C11.8,22 8.2,20.5 5.8,17.5 C3.5,14.5 2.8,11.8 4.5,10.2 Z"
            fill="#f17912"
          />
          <ellipse
            cx="9.2"
            cy="15.2"
            rx="2.6"
            ry="5"
            transform="rotate(-38 9.2 15.2)"
            fill="#faaf3e"
          />
          <polygon
            points="2.2,21.5 4.2,18.8 8.2,15.2 9.2,16.2 5.2,20.2"
            fill="#adbeca"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdconfigure',
    label: 'RBD Configure',
    family: 'sop',
    description:
      'Curved segmented RBD column with red, blue and yellow-orange configuration bands.',
    types: ['rbdconfigure'],
    icons: ['sop_rbdconfigure'],
    refKey: 'SOP_rbdconfigure',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <path
            d="M15.5,2.2 C17.5,2.2 19.2,3.8 18.2,5.8 C17,8 14.5,9.8 13.2,12.2 C11.8,15 11.8,18.2 9.2,20.5 C7.2,22 4.2,21.5 3.2,19.5 C3.8,16 5.5,12.8 8.2,10.5 C11,8.2 12.8,5.5 14,3.2 C14.5,2.4 15,2.2 15.5,2.2 Z"
            fill="#d3d7cf"
          />
          <path
            d="M11.5,5.8 C13.5,5.8 15.5,7.2 16.2,9 L14.5,11 C13.5,9.2 11.8,8 9.8,7.8 Z"
            fill="#f24d4d"
          />
          <path
            d="M8.5,9.8 C11,10.2 13,11.5 13.8,13.5 L12.5,15.8 C11.5,13.8 9.5,12.2 7,11.8 Z"
            fill="#468dd5"
          />
          <path
            d="M5.5,14.2 C8.2,14.8 10.2,16.2 11.2,18.2 L9.5,20.2 C8.5,18.2 6.5,16.8 4.2,16.2 Z"
            fill="#fcaf3e"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdconnectedfaces',
    label: 'RBD Connected Faces',
    family: 'sop',
    description:
      'Fractured dark-grey polyhedral rock split open to show glowing orange-yellow interior connected faces.',
    types: ['rbdconnectedfaces'],
    icons: ['sop_rbdconnectedfaces'],
    refKey: 'SOP_rbdconnectedfaces',
    render: () => (
      <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
        <polygon points="9.5,3 16.5,2 19.8,5.8 14.5,9.2 8.8,6.5" fill="#8f9092" />
        <polygon points="8.8,6.5 14.5,9.2 13.2,14.5 6.8,11.8" fill="#b1b1b3" />
        <polygon points="14.5,9.2 19.8,5.8 21.5,12.2 15.8,15.2 13.2,14.5" fill="#666666" />
        <polygon points="6.8,11.8 13.2,14.5 15.8,15.2 14.2,17.8 5.2,14.8" fill="#ffde57" />
        <polygon points="15.8,15.2 21.5,12.2 20.2,16.8 14.2,17.8" fill="#ff6600" />
        <polygon points="3.5,15.5 12.2,18.5 10.8,22 2.5,18.8" fill="#9e9ea0" />
        <polygon points="12.2,18.5 19.2,17.5 17.5,21.5 10.8,22" fill="#5a616b" />
      </g>
    ),
  },
  {
    id: 'sop.rbdconstraintproperties',
    label: 'RBD Constraint Properties',
    family: 'sop',
    description:
      'Two fractured amber-orange rock chunks linked across a gap by glowing red constraint struts.',
    types: ['rbdconstraintproperties'],
    icons: ['sop_rbdconstraintproperties'],
    refKey: 'SOP_rbdconstraintproperties',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon
            points="13.5,3.2 19.8,2.2 21.8,6.2 19.5,10.5 14.2,9.5 12.2,6.2"
            fill="#fbd395"
          />
          <polygon
            points="12.2,6.2 14.2,9.5 19.5,10.5 17.8,12.8 11.5,10.2"
            fill="#ef7916"
          />
          <polygon
            points="3.5,12.2 9.8,11.2 12.2,14.8 10.5,19.5 4.2,20.8 2.2,16.5"
            fill="#f7af3e"
          />
          <polygon
            points="4.2,20.8 10.5,19.5 12.2,14.8 13.8,17.5 9.8,21.8"
            fill="#a65416"
          />
        </g>
        <g stroke="#262626" strokeWidth="2" strokeLinecap="round">
          <line x1="9.5" y1="13.5" x2="14.5" y2="8.5" />
          <line x1="12" y1="15.5" x2="17" y2="10.5" />
        </g>
        <g stroke="#ff1d1d" strokeWidth="1.1" strokeLinecap="round">
          <line x1="9.5" y1="13.5" x2="14.5" y2="8.5" />
          <line x1="12" y1="15.5" x2="17" y2="10.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdconstraintsfromcurves',
    label: 'RBD Constraints from Curves',
    family: 'sop',
    description:
      'Fractured blue-grey 3D wall block with a bright yellow curve running across the fracture seam.',
    types: ['rbdconstraintsfromcurves'],
    icons: ['sop_rbdconstraintsfromcurves'],
    refKey: 'SOP_rbdconstraintsfromcurves',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon points="3.5,11.5 13.5,8.5 21,11.2 12,15.8" fill="#e1e7ef" />
          <polygon points="3.5,11.5 12,15.8 12,21.8 3.5,18.2" fill="#b3bdcc" />
          <polygon points="21,11.2 12,15.8 12,21.8 21,17.5" fill="#717f8f" />
        </g>
        <path
          d="M11.5,9.2 L10.8,12.2 L12.5,14.2 L12,15.8 L12,21.8"
          fill="none"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M5.5,4.5 C9.5,2.5 14.5,6.5 12,11.5 C9.5,16.5 14.5,19.5 18.5,18.5"
          fill="none"
          stroke="#262626"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M5.5,4.5 C9.5,2.5 14.5,6.5 12,11.5 C9.5,16.5 14.5,19.5 18.5,18.5"
          fill="none"
          stroke="#edd400"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.rbdconstraintsfromlines',
    label: 'RBD Constraints from Lines',
    family: 'sop',
    description:
      'Fractured blue-grey 3D wall block crossed by bright green straight constraint lines.',
    types: ['rbdconstraintsfromlines'],
    icons: ['sop_rbdconstraintsfromlines'],
    refKey: 'SOP_rbdconstraintsfromlines',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon points="3.5,11.5 13.5,8.5 21,11.2 12,15.8" fill="#e1e7ef" />
          <polygon points="3.5,11.5 12,15.8 12,21.8 3.5,18.2" fill="#b3bdcc" />
          <polygon points="21,11.2 12,15.8 12,21.8 21,17.5" fill="#717f8f" />
        </g>
        <path
          d="M11.5,9.2 L10.8,12.2 L12.5,14.2 L12,15.8 L12,21.8"
          fill="none"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <g stroke="#262626" strokeWidth="2.3" strokeLinecap="round">
          <line x1="6" y1="4.5" x2="18.5" y2="10.5" />
          <line x1="12" y1="2.5" x2="12" y2="13.5" />
        </g>
        <g stroke="#8ae234" strokeWidth="1.2" strokeLinecap="round">
          <line x1="6" y1="4.5" x2="18.5" y2="10.5" />
          <line x1="12" y1="2.5" x2="12" y2="13.5" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdconstraintsfromrules',
    label: 'RBD Constraints from Rules',
    family: 'sop',
    description:
      'Fractured blue-grey 3D wall block with two blue-cased white rule polylines above it.',
    types: ['rbdconstraintsfromrules'],
    icons: ['sop_rbdconstraintsfromrules'],
    refKey: 'SOP_rbdconstraintsfromrules',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon points="3.5,12.5 13.5,9.5 21,12.2 12,16.8" fill="#e1e7ef" />
          <polygon points="3.5,12.5 12,16.8 12,21.8 3.5,18.5" fill="#b3bdcc" />
          <polygon points="21,12.2 12,16.8 12,21.8 21,17.8" fill="#717f8f" />
        </g>
        <path
          d="M11.5,10.2 L10.8,13.2 L12.5,15.2 L12,16.8 L12,21.8"
          fill="none"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#3672c4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="2,6.5 6.5,4.8 18,5 22,6.2" />
          <polyline points="2,11.2 11.5,8.2 22,10.8" />
        </g>
        <g fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="2,6.5 6.5,4.8 18,5 22,6.2" />
          <polyline points="2,11.2 11.5,8.2 22,10.8" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbdconvertconstraints',
    label: 'RBD Convert Constraints',
    family: 'sop',
    description:
      'Two golden-amber fractured RBD pieces linked by constraint lines with a conversion arrow.',
    types: ['rbdconvertconstraints'],
    icons: ['sop_rbdconvertconstraints'],
    refKey: 'SOP_rbdconvertconstraints',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon
            points="14,2.5 20.5,3.5 22,7.5 18.5,10.2 13.5,8.2"
            fill="#fbd395"
          />
          <polygon
            points="13.5,8.2 18.5,10.2 17,12.2 12.2,10.2"
            fill="#ef7916"
          />
          <polygon
            points="3.5,13.2 9.5,12.2 11.8,15.8 9.8,20.2 3.8,21.2 2,17.2"
            fill="#f7af3e"
          />
          <polygon
            points="3.8,21.2 9.8,20.2 11.8,15.8 13.2,18.2 9.5,22"
            fill="#a65416"
          />
        </g>
        <path
          d="M9.5,13.5 L14.5,8.5 M14.5,8.5 L11.5,8.8 M14.5,8.5 L14.2,11.5"
          fill="none"
          stroke="#262626"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5,13.5 L14.5,8.5 M14.5,8.5 L11.5,8.8 M14.5,8.5 L14.2,11.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.rbddeformpieces',
    label: 'RBD Deform Pieces',
    family: 'sop',
    description:
      'Isometric grey fractured block with a buckled, deformed seam highlighted in red and yellow.',
    types: ['rbddeformpieces'],
    icons: ['sop_rbddeformpieces'],
    refKey: 'SOP_rbddeformpieces',
    render: () => (
      <>
        <ellipse cx="12" cy="18.2" rx="9.8" ry="3.5" fill="#262626" opacity="0.28" />
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon points="4.5,9.2 10.5,6.2 21.5,11.8 15.5,15.2" fill="#e9e9e6" />
          <polygon points="4.5,9.2 15.5,15.2 15.5,20.8 4.5,15" fill="#afafaf" />
          <polygon points="21.5,11.8 15.5,15.2 15.5,20.8 21.5,17.5" fill="#757772" />
          <polygon points="10.2,12.2 14.5,9.2 16.5,10.5 12.2,13.5" fill="#ef2929" />
          <polygon points="11.5,10.8 14.2,9 15.2,9.8 12.5,11.6" fill="#fce94f" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.rbddeformingtoanimated',
    label: 'RBD Deforming to Animated',
    family: 'sop',
    description:
      'Three overlapping 3D rings progressing from upper-left to lower-right to show deforming-to-animated transition.',
    types: ['rbddeformingtoanimated'],
    icons: ['sop_rbddeformingtoanimated'],
    refKey: 'SOP_rbddeformingtoanimated',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <ellipse cx="7.5" cy="7.5" rx="5.2" ry="2.6" fill="#888a85" opacity="0.55" />
          <ellipse cx="11.2" cy="12" rx="6.2" ry="3" fill="#babdb6" opacity="0.75" />
          <path
            d="M7.5,16.5 C7.5,14.2 11.2,12.5 15.5,12.5 C19.8,12.5 22.2,14.2 22.2,16.5 C22.2,18.8 19.8,20.5 15.5,20.5 C11.2,20.5 7.5,18.8 7.5,16.5 Z M12.2,16.5 C12.2,17.5 13.6,18.2 15.5,18.2 C17.4,18.2 18.8,17.5 18.8,16.5 C18.8,15.5 17.4,14.8 15.5,14.8 C13.6,14.8 12.2,15.5 12.2,16.5 Z"
            fill="#eeeeec"
            fillRule="evenodd"
          />
        </g>
      </>
    ),
  },
];
