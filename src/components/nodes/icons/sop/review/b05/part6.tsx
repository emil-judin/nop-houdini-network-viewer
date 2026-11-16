import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_05_PART_6: OperatorIconDef[] = [
  {
    id: 'sop.heightfield_patch',

    label: 'HeightField Patch',

    family: 'sop',

    description: 'Green isometric terrain slab.',
    refKey: 'SOP_heightfield_patch',
    types: ['heightfield_patch'],
    icons: ['sop_heightfield_patch'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-rock`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#a8aaa6" />
            <stop offset="100%" stopColor="#767873" />
          </linearGradient>
        </defs>
        {/* Green isometric terrain slab */}
        <polygon
          points="12,9.5 22,14.5 12,19.5 2,14.5"
          fill="#73d216"
          fillOpacity={0.35}
          stroke="#4e9a06"
          strokeWidth={0.95}
          strokeLinejoin="round"
        />
        <polygon
          points="2,14.5 12,19.5 12,21.5 2,16.5"
          fill="#4e9a06"
          stroke="#274e02"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
        <polygon
          points="12,19.5 22,14.5 22,16.5 12,21.5"
          fill="#3a7304"
          stroke="#274e02"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
        {/* Raised rocky mountain patch in center */}
        <polygon
          points="6,14 9.5,9.5 12.2,6 15.2,9.2 18,14 12,17"
          fill={`url(#${uid}-rock)`}
          stroke="#434442"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        <polyline
          points="12.2,6 11.5,11.5 12,17"
          fill="none"
          stroke="#555753"
          strokeWidth={0.6}
        />
        <polyline
          points="9.5,9.5 11.5,11.5 15.2,9.2"
          fill="none"
          stroke="#555753"
          strokeWidth={0.55}
        />
        {/* Red dashed patch boundary */}
        <polygon
          points="12,11.2 18.2,14.2 12,17.2 5.8,14.2"
          fill="none"
          stroke="#ef2929"
          strokeWidth={0.95}
          strokeDasharray="1.6 1.1"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.heightfield_pattern',

    label: 'HeightField Pattern',

    family: 'sop',

    description: 'Isometric blue terrain base.',
    refKey: 'SOP_heightfield_pattern',
    types: ['heightfield_pattern'],
    icons: ['sop_heightfield_pattern'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-hf`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a6c2e1" />
            <stop offset="55%" stopColor="#729fcf" />
            <stop offset="100%" stopColor="#3465a4" />
          </linearGradient>
        </defs>
        {/* Isometric blue terrain base */}
        <polygon
          points="2,14 12,8.5 22,14 12,20.5"
          fill={`url(#${uid}-hf)`}
          stroke="#204a87"
          strokeWidth={0.95}
          strokeLinejoin="round"
        />
        {/* Parallel pattern wave ridges */}
        <path
          d="M4.5,12.8 Q8.2,10.2 12,12.5 T19.5,12.8"
          fill="none"
          stroke="#eef5fc"
          strokeWidth={0.85}
          strokeLinecap="round"
        />
        <path
          d="M6.5,11.2 Q10.2,8.8 14,11.1 T20.5,11.5"
          fill="none"
          stroke="#204a87"
          strokeWidth={0.75}
          strokeLinecap="round"
        />
        <path
          d="M3.5,14.5 Q7.5,12 11.2,14.3 T18,14.6"
          fill="none"
          stroke="#204a87"
          strokeWidth={0.75}
          strokeLinecap="round"
        />
        <path
          d="M5.5,16.2 Q9.2,13.8 13,16 T16.5,16.2"
          fill="none"
          stroke="#eef5fc"
          strokeWidth={0.85}
          strokeLinecap="round"
        />
        {/* Cross grid lines */}
        <line x1="7" y1="11.2" x2="17" y2="16.8" stroke="#204a87" strokeWidth={0.5} strokeOpacity={0.6} />
        <line x1="9.5" y1="9.8" x2="19.5" y2="15.4" stroke="#204a87" strokeWidth={0.5} strokeOpacity={0.6} />
        <line x1="4.5" y1="12.6" x2="14.5" y2="18.2" stroke="#204a87" strokeWidth={0.5} strokeOpacity={0.6} />
      </g>
    ),
  },
  {
    id: 'sop.heightfield_project',

    label: 'HeightField Project',

    family: 'sop',

    description: 'Isometric blue terrain with projected dome in center.',
    refKey: 'SOP_heightfield_project',
    types: ['heightfield_project'],
    icons: ['sop_heightfield_project'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-hf`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a6c2e1" />
            <stop offset="60%" stopColor="#729fcf" />
            <stop offset="100%" stopColor="#3465a4" />
          </linearGradient>
        </defs>
        {/* Isometric blue terrain with projected dome in center */}
        <path
          d="M2,15.5 L8,12 C9.5,9.2 14.5,9.2 16,12 L22,15.5 L12,21 Z"
          fill={`url(#${uid}-hf)`}
          stroke="#204a87"
          strokeWidth={0.95}
          strokeLinejoin="round"
        />
        <path
          d="M6,16.5 L9.2,13.5 C10.5,11.5 13.5,11.5 14.8,13.5 L18,16.5"
          fill="none"
          stroke="#204a87"
          strokeWidth={0.6}
        />
        {/* Green wireframe sphere above projecting down */}
        <circle
          cx="12"
          cy="7"
          r="4.2"
          fill="#dff9c5"
          fillOpacity={0.55}
          stroke="#4e9a06"
          strokeWidth={0.95}
        />
        <ellipse
          cx="12"
          cy="7"
          rx="4.2"
          ry="1.6"
          fill="none"
          stroke="#4e9a06"
          strokeWidth={0.6}
        />
        <ellipse
          cx="12"
          cy="7"
          rx="1.6"
          ry="4.2"
          fill="none"
          stroke="#4e9a06"
          strokeWidth={0.6}
        />
        {/* Projection rays */}
        <line x1="7.8" y1="7.5" x2="7.8" y2="13.5" stroke="#4e9a06" strokeWidth={0.65} strokeDasharray="1.2 1" />
        <line x1="16.2" y1="7.5" x2="16.2" y2="13.5" stroke="#4e9a06" strokeWidth={0.65} strokeDasharray="1.2 1" />
      </g>
    ),
  },
  {
    id: 'sop.heightfield_quickshade',

    label: 'HeightField Quick Shade',

    family: 'sop',

    description: 'Green grass base.',
    refKey: 'SOP_heightfield_quickshade',
    types: ['heightfield_quickshade'],
    icons: ['sop_heightfield_quickshade'],
    render: () => (
      <g>
        {/* Green grass base */}
        <polygon
          points="2,15 12,10 22,15 12,20.5"
          fill="#4e9a06"
          stroke="#274e02"
          strokeWidth={0.95}
          strokeLinejoin="round"
        />
        <polygon
          points="2,15 12,20.5 12,22 2,16.5"
          fill="#3a7304"
          stroke="#274e02"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
        <polygon
          points="12,20.5 22,15 22,16.5 12,22"
          fill="#274e02"
          stroke="#1b3601"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
        {/* Grey rock mid-slopes */}
        <polygon
          points="4.8,14.5 9,9.2 12.2,6 15.5,9.5 19.2,14.5 12,18"
          fill="#a8aaa6"
          stroke="#434442"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        <polygon
          points="12.2,6 15.5,9.5 19.2,14.5 12,18"
          fill="#767873"
          stroke="#434442"
          strokeWidth={0.65}
          strokeLinejoin="round"
        />
        {/* White snow peaks */}
        <polygon
          points="8.2,10.5 12.2,5.5 15.8,10.2 13.5,11.2 12,9.8 10.2,11.4"
          fill="#ffffff"
          stroke="#555753"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.heightfield_remap',

    label: 'HeightField Remap',

    family: 'sop',

    description: 'Isometric blue terrain with mountain peak.',
    refKey: 'SOP_heightfield_remap',
    types: ['heightfield_remap'],
    icons: ['sop_heightfield_remap'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-hf`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a6c2e1" />
            <stop offset="55%" stopColor="#729fcf" />
            <stop offset="100%" stopColor="#3465a4" />
          </linearGradient>
        </defs>
        {/* Isometric blue terrain with mountain peak */}
        <path
          d="M2,15.5 L7.5,12.2 L12,7.5 L16.5,12.2 L22,15.5 L12,21 Z"
          fill={`url(#${uid}-hf)`}
          stroke="#204a87"
          strokeWidth={0.95}
          strokeLinejoin="round"
        />
        <polyline
          points="7.5,12.2 12,15.5 16.5,12.2"
          fill="none"
          stroke="#204a87"
          strokeWidth={0.6}
        />
        <line x1="12" y1="7.5" x2="12" y2="21" stroke="#204a87" strokeWidth={0.6} />
        {/* White halo + red remap spline curve above */}
        <path
          d="M3.5,11.5 C7.5,11.5 9,4.2 12,4.2 C15,4.2 16.5,11.5 20.5,11.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.1}
          strokeLinecap="round"
        />
        <path
          d="M3.5,11.5 C7.5,11.5 9,4.2 12,4.2 C15,4.2 16.5,11.5 20.5,11.5"
          fill="none"
          stroke="#ef2929"
          strokeWidth={1.1}
          strokeLinecap="round"
        />
        {/* Control points */}
        <circle cx="3.5" cy="11.5" r="1.2" fill="#ffffff" stroke="#ef2929" strokeWidth={0.8} />
        <circle cx="12" cy="4.2" r="1.2" fill="#ffffff" stroke="#ef2929" strokeWidth={0.8} />
        <circle cx="20.5" cy="11.5" r="1.2" fill="#ffffff" stroke="#ef2929" strokeWidth={0.8} />
      </g>
    ),
  },
  {
    id: 'sop.heightfield_resample',

    label: 'HeightField Resample',

    family: 'sop',

    description: 'Isometric blue terrain with central peak.',
    refKey: 'SOP_heightfield_resample',
    types: ['heightfield_resample'],
    icons: ['sop_heightfield_resample'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-hf`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b6cde6" />
            <stop offset="55%" stopColor="#729fcf" />
            <stop offset="100%" stopColor="#3465a4" />
          </linearGradient>
        </defs>
        {/* Isometric blue terrain with central peak */}
        <path
          d="M2,15 L8,11.5 L12,7 L16,11.5 L22,15 L12,20.5 Z"
          fill={`url(#${uid}-hf)`}
          stroke="#204a87"
          strokeWidth={0.95}
          strokeLinejoin="round"
        />
        {/* Dense subdivided grid lines */}
        <polyline points="4.5,13.6 9.5,10.5 12,8.2 14.5,10.5 19.5,13.6" fill="none" stroke="#204a87" strokeWidth={0.55} />
        <polyline points="7,15 10.5,12.2 12,10.5 13.5,12.2 17,15" fill="none" stroke="#204a87" strokeWidth={0.55} />
        <polyline points="9.5,16.5 12,14.5 14.5,16.5" fill="none" stroke="#204a87" strokeWidth={0.55} />
        <line x1="12" y1="7" x2="12" y2="20.5" stroke="#204a87" strokeWidth={0.6} />
        <line x1="9.5" y1="9.8" x2="7" y2="17.8" stroke="#204a87" strokeWidth={0.55} />
        <line x1="14.5" y1="9.8" x2="17" y2="17.8" stroke="#204a87" strokeWidth={0.55} />
        <line x1="6" y1="12.7" x2="16" y2="18.3" stroke="#204a87" strokeWidth={0.55} />
        <line x1="18" y1="12.7" x2="8" y2="18.3" stroke="#204a87" strokeWidth={0.55} />
      </g>
    ),
  },
  {
    id: 'sop.heightfield_scatter',

    label: 'HeightField Scatter',

    family: 'sop',

    description: 'White/grey isometric terrain grid.',
    refKey: 'SOP_heightfield_scatter',
    types: ['heightfield_scatter'],
    icons: ['sop_heightfield_scatter'],
    render: () => (
      <g>
        {/* White/grey isometric terrain grid */}
        <path
          d="M2,15 L8,11.5 L12,7.8 L16,11.5 L22,15 L12,20.5 Z"
          fill="#eeeeec"
          stroke="#555753"
          strokeWidth={0.95}
          strokeLinejoin="round"
        />
        <line x1="7" y1="12.1" x2="17" y2="17.7" stroke="#888a85" strokeWidth={0.55} />
        <line x1="9.8" y1="9.8" x2="19.5" y2="16.3" stroke="#888a85" strokeWidth={0.55} />
        <line x1="14.2" y1="9.8" x2="4.5" y2="16.3" stroke="#888a85" strokeWidth={0.55} />
        <line x1="17" y1="12.1" x2="7" y2="17.7" stroke="#888a85" strokeWidth={0.55} />
        {/* Scattered red dots */}
        <circle cx="12" cy="9.5" r="1.05" fill="#ef2929" stroke="#a40000" strokeWidth={0.45} />
        <circle cx="9.2" cy="12.2" r="1.05" fill="#ef2929" stroke="#a40000" strokeWidth={0.45} />
        <circle cx="14.8" cy="12.5" r="1.05" fill="#ef2929" stroke="#a40000" strokeWidth={0.45} />
        <circle cx="6.2" cy="14.6" r="1.05" fill="#ef2929" stroke="#a40000" strokeWidth={0.45} />
        <circle cx="11.5" cy="14.8" r="1.05" fill="#ef2929" stroke="#a40000" strokeWidth={0.45} />
        <circle cx="17.5" cy="14.8" r="1.05" fill="#ef2929" stroke="#a40000" strokeWidth={0.45} />
        <circle cx="10.2" cy="17.4" r="1.05" fill="#ef2929" stroke="#a40000" strokeWidth={0.45} />
        <circle cx="14.2" cy="17.1" r="1.05" fill="#ef2929" stroke="#a40000" strokeWidth={0.45} />
      </g>
    ),
  },
  {
    id: 'sop.heightfield_terrace',

    label: 'HeightField Terrace',

    family: 'sop',

    description: 'Bottom terrace tier.',
    refKey: 'SOP_heightfield_terrace',
    types: ['heightfield_terrace'],
    icons: ['sop_heightfield_terrace'],
    render: () => (
      <g>
        {/* Bottom terrace tier */}
        <polygon
          points="2,14.5 12,9.5 22,14.5 12,19.5"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        <polygon
          points="2,14.5 12,19.5 12,21.2 2,16.2"
          fill="#3465a4"
          stroke="#112646"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
        <polygon
          points="12,19.5 22,14.5 22,16.2 12,21.2"
          fill="#204a87"
          stroke="#112646"
          strokeWidth={0.75}
          strokeLinejoin="round"
        />
        {/* Middle terrace tier */}
        <polygon
          points="5.2,11.8 12,8.4 18.8,11.8 12,15.2"
          fill="#93b6da"
          stroke="#204a87"
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        <polygon
          points="5.2,11.8 12,15.2 12,17 5.2,13.6"
          fill="#558bc5"
          stroke="#204a87"
          strokeWidth={0.7}
          strokeLinejoin="round"
        />
        <polygon
          points="12,15.2 18.8,11.8 18.8,13.6 12,17"
          fill="#3465a4"
          stroke="#112646"
          strokeWidth={0.7}
          strokeLinejoin="round"
        />
        {/* Top terrace tier */}
        <polygon
          points="8.2,9 12,7 15.8,9 12,11"
          fill="#c9ddf0"
          stroke="#204a87"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <polygon
          points="8.2,9 12,11 12,12.6 8.2,10.6"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth={0.65}
          strokeLinejoin="round"
        />
        <polygon
          points="12,11 15.8,9 15.8,10.6 12,12.6"
          fill="#3465a4"
          stroke="#112646"
          strokeWidth={0.65}
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.heightfield_tilesplit',

    label: 'HeightField Tile Split',

    family: 'sop',

    description: 'Isometric blue terrain with peak.',
    refKey: 'SOP_heightfield_tilesplit',
    types: ['heightfield_tilesplit'],
    icons: ['sop_heightfield_tilesplit'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-hf`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a6c2e1" />
            <stop offset="55%" stopColor="#729fcf" />
            <stop offset="100%" stopColor="#3465a4" />
          </linearGradient>
        </defs>
        {/* Isometric blue terrain with peak */}
        <path
          d="M2,14.5 L8,11.2 L12,7.2 L16,11.2 L22,14.5 L12,20 Z"
          fill={`url(#${uid}-hf)`}
          stroke="#204a87"
          strokeWidth={0.95}
          strokeLinejoin="round"
        />
        {/* Intersecting red/white dashed tile split lines */}
        <line x1="6.2" y1="9.8" x2="17.8" y2="18.2" stroke="#ffffff" strokeWidth={1.6} strokeLinecap="round" />
        <line x1="17.8" y1="9.8" x2="6.2" y2="18.2" stroke="#ffffff" strokeWidth={1.6} strokeLinecap="round" />
        <line
          x1="6.2"
          y1="9.8"
          x2="17.8"
          y2="18.2"
          stroke="#ef2929"
          strokeWidth={1}
          strokeDasharray="1.8 1.2"
          strokeLinecap="round"
        />
        <line
          x1="17.8"
          y1="9.8"
          x2="6.2"
          y2="18.2"
          stroke="#ef2929"
          strokeWidth={1}
          strokeDasharray="1.8 1.2"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.heightfield_xform',

    label: 'HeightField Transform',

    family: 'sop',

    description: 'Isometric blue terrain at bottom.',
    refKey: 'SOP_heightfield_xform',
    types: ['heightfield_xform'],
    icons: ['sop_heightfield_xform'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-hf`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a6c2e1" />
            <stop offset="55%" stopColor="#729fcf" />
            <stop offset="100%" stopColor="#3465a4" />
          </linearGradient>
        </defs>
        {/* Isometric blue terrain at bottom */}
        <path
          d="M2,16 L8,13 L12,9.8 L16,13 L22,16 L12,21.2 Z"
          fill={`url(#${uid}-hf)`}
          stroke="#204a87"
          strokeWidth={0.95}
          strokeLinejoin="round"
        />
        <line x1="7.5" y1="13.5" x2="16.5" y2="18.5" stroke="#204a87" strokeWidth={0.55} />
        <line x1="16.5" y1="13.5" x2="7.5" y2="18.5" stroke="#204a87" strokeWidth={0.55} />
        {/* Red 3D transform axes gizmo above */}
        <g stroke="#ffffff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="9.5" x2="12" y2="3" />
          <line x1="12" y1="9.5" x2="6.2" y2="12.2" />
          <line x1="12" y1="9.5" x2="17.8" y2="12.2" />
        </g>
        <g stroke="#ef2929" strokeWidth={1.05} strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="9.5" x2="12" y2="3.2" />
          <polyline points="10.3,4.8 12,2.8 13.7,4.8" fill="none" />
          <line x1="12" y1="9.5" x2="6.2" y2="12.2" />
          <polyline points="7.8,12.8 5.8,12.4 6.8,10.6" fill="none" />
          <line x1="12" y1="9.5" x2="17.8" y2="12.2" />
          <polyline points="16.2,12.8 18.2,12.4 17.2,10.6" fill="none" />
        </g>
      </g>
    ),
  },
];
