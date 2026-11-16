import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_03_PART_8: OperatorIconDef[] = [
  {
    id: 'sop.attribblur',

    label: 'Attribute Blur',

    family: 'sop',

    description: 'Soft halo around callout.',
    refKey: 'SOP_attribblur',
    types: ['attribblur'],
    icons: ['sop_attribblur'],
    render: (uid) => (
      <g>
        <defs>
          <radialGradient id={`${uid}-ab-dot`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#3f3fff" />
            <stop offset="0.6" stopColor="#3f3fff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Soft halo around callout */}
        <path
          d="M7 3.2H20.5V11.5H16.8L5.2 18.2L10.5 11.5H7V3.2Z"
          fill="none"
          stroke="#2e3436"
          strokeWidth="2.2"
          strokeLinejoin="round"
          opacity="0.18"
        />
        {/* Callout speech bubble */}
        <path
          d="M7 3.2H20.5V11.5H16.8L5.2 18.2L10.5 11.5H7V3.2Z"
          fill="#ffffff"
          stroke="#2e3436"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Blurred attribute spot inside bubble */}
        <circle cx="13.8" cy="7.4" r="3.4" fill={`url(#${uid}-ab-dot)`} />
        {/* Green point sphere at bottom-left */}
        <circle cx="4.8" cy="18.5" r="2.6" fill="#9db029" stroke="#2e3436" strokeWidth="0.85" />
        <circle cx="4.1" cy="17.8" r="0.85" fill="#dfeaa1" />
      </g>
    ),
  },
  {
    id: 'sop.attribcast',

    label: 'Attribute Cast',

    family: 'sop',

    description: 'Back/target larger translucent 3D box on right.',
    refKey: 'SOP_attribcast',
    types: ['attribcast'],
    icons: ['sop_attribcast'],
    render: () => (
      <g>
        {/* Back/target larger translucent 3D box on right */}
        <path
          d="M7.2 6.2L15.8 4.2L21.8 5.8V16.8L13.8 21.5L7.2 17.2V6.2Z"
          fill="#729fcf"
          fillOpacity="0.28"
          stroke="#204a87"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <path
          d="M7.2 6.2L13.8 8.2L21.8 5.8M13.8 8.2V21.5"
          fill="none"
          stroke="#204a87"
          strokeWidth="0.6"
          opacity="0.5"
        />
        {/* Front/source 3D blue box on left */}
        <path
          d="M2.2 4.5L9.8 2.8L15.8 4.2V13.5L7.2 17.5L2.2 13.8V4.5Z"
          fill="#729fcf"
          fillOpacity="0.65"
          stroke="#204a87"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M2.2 4.5L7.2 6.2L15.8 4.2M7.2 6.2V17.5"
          fill="none"
          stroke="#204a87"
          strokeWidth="0.75"
        />
      </g>
    ),
  },
  {
    id: 'sop.attribcombine',

    label: 'Attribute Combine',

    family: 'sop',

    description: 'Base polygon connecting corner points.',
    refKey: 'SOP_attribcombine',
    types: ['attribcombine'],
    icons: ['sop_attribcombine'],
    render: () => (
      <g>
        {/* Base polygon connecting corner points */}
        <path
          d="M6.2 3.2L19.8 4.8L21.2 20.8L2.8 18.8L6.2 3.2Z"
          fill="#bac8cf"
          fillOpacity="0.55"
          stroke="#2e3436"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Corner point spheres */}
        <circle cx="6.2" cy="3.2" r="1.6" fill="#9db029" stroke="#2e3436" strokeWidth="0.65" />
        <circle cx="19.8" cy="4.8" r="1.6" fill="#9db029" stroke="#2e3436" strokeWidth="0.65" />
        <circle cx="2.8" cy="18.8" r="1.6" fill="#9db029" stroke="#2e3436" strokeWidth="0.65" />
        <circle cx="21.2" cy="20.8" r="1.6" fill="#9db029" stroke="#2e3436" strokeWidth="0.65" />
        {/* Multi-pointer callout box in center */}
        <path
          d="M6.5 8.2H9L6.8 4.2L11.8 8.2H14.5L18.8 5.4L16.8 8.2H18.2V15.2H16.5L19.8 19.5L14 15.2H10.5L4.2 18.2L7.8 15.2H6.5V8.2Z"
          fill="#eeeeec"
          stroke="#2e3436"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Combined attribute bars inside callout */}
        <rect x="8.2" y="9.8" width="8.2" height="1.6" fill="#ef2929" />
        <rect x="8.2" y="12.2" width="8.2" height="1.6" fill="#f57900" />
      </g>
    ),
  },
  {
    id: 'sop.attribcomposite',

    label: 'Attribute Composite',

    family: 'sop',

    description: 'First callout speech bubble (top-left).',
    refKey: 'SOP_attribcomposite',
    types: ['attribcomposite'],
    icons: ['sop_attribcomposite'],
    render: () => (
      <g>
        {/* First callout speech bubble (top-left) */}
        <path
          d="M5.5 2.2H16.8V9.2H13.5L4.2 14.8L8.5 9.2H5.5V2.2Z"
          fill="#d3d7cf"
          stroke="#2e3436"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Second overlapping callout speech bubble (middle-right) */}
        <path
          d="M9.5 6.8H20.8V13.8H18.5L19.2 19.2L14.5 13.8H9.5V6.8Z"
          fill="#ffffff"
          stroke="#2e3436"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Two green point spheres at bottom-left and bottom-right */}
        <circle cx="4.2" cy="15.2" r="2.4" fill="#9db029" stroke="#2e3436" strokeWidth="0.8" />
        <circle cx="3.6" cy="14.6" r="0.75" fill="#dfeaa1" />
        <circle cx="19.2" cy="19.5" r="2.4" fill="#9db029" stroke="#2e3436" strokeWidth="0.8" />
        <circle cx="18.6" cy="18.9" r="0.75" fill="#dfeaa1" />
      </g>
    ),
  },
  {
    id: 'sop.attribcopy',

    label: 'Attribute Copy',

    family: 'sop',

    description: 'Source callout speech bubble.',
    refKey: 'SOP_attribcopy',
    types: ['attribcopy'],
    icons: ['sop_attribcopy'],
    render: () => (
      <g>
        {/* Source callout speech bubble */}
        <path
          d="M5.5 2.2H17.2V9.2H13.8L4.2 14.8L8.5 9.2H5.5V2.2Z"
          fill="#eeeeec"
          stroke="#2e3436"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Source and target green point spheres */}
        <circle cx="4.2" cy="15.2" r="2.5" fill="#9db029" stroke="#2e3436" strokeWidth="0.8" />
        <circle cx="3.6" cy="14.6" r="0.8" fill="#dfeaa1" />
        <circle cx="19.2" cy="19.2" r="2.5" fill="#9db029" stroke="#2e3436" strokeWidth="0.8" />
        <circle cx="18.6" cy="18.6" r="0.8" fill="#dfeaa1" />
        {/* Red-orange copy arrow from source bubble to target point */}
        <path
          d="M14.5 6.5C18.5 7.5 20.2 11.2 19.5 15.2"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M19.2 16.5L17.2 13.8L21.2 14.1Z"
          fill="#f57900"
          stroke="#ef2929"
          strokeWidth="0.55"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.attribexpression',

    label: 'Attribute Expression',

    family: 'sop',

    description: 'Tassel cord and ferrule at bottom.',
    refKey: 'SOP_attribexpression',
    types: ['attribexpression'],
    icons: ['sop_attribexpression'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-ae-hat`} x1="5" y1="3" x2="19" y2="16" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f44e4e" />
            <stop offset="0.6" stopColor="#c00c0c" />
            <stop offset="1" stopColor="#710000" />
          </linearGradient>
        </defs>
        {/* Tassel cord and ferrule at bottom */}
        <path
          d="M16.8 12.5C16.5 14.8 10.2 16.8 9.2 19.2"
          fill="none"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M16.8 12.5C16.5 14.8 10.2 16.8 9.2 19.2"
          fill="none"
          stroke="#eeeeec"
          strokeWidth="0.65"
          strokeLinecap="round"
        />
        <rect x="7.8" y="18.2" width="2.4" height="2.4" rx="0.5" fill="#d3d7cf" stroke="#555753" strokeWidth="0.55" />
        <path d="M8.5 20.6L7.2 22M9.5 20.6L10.6 22" fill="none" stroke="#eeeeec" strokeWidth="0.75" strokeLinecap="round" />
        {/* Red mortarboard / academic expression cap */}
        <path
          d="M2.2 8.8L12 3.5L21.8 8.8L12 14.2L2.2 8.8Z"
          fill={`url(#${uid}-ae-hat)`}
          stroke="#710000"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M6.2 11.2V14.8C6.2 16.5 8.8 17.8 12 17.8C15.2 17.8 17.8 16.5 17.8 14.8V11.2"
          fill="#9a0c0c"
          stroke="#710000"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="8.8" r="1.2" fill="#dbb718" stroke="#710000" strokeWidth="0.5" />
      </g>
    ),
  },
];
