import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 4, Part 9 (icons 90 to 99): built-in Houdini SOP icons under review.
 */
export const BATCH_04_PART_9: OperatorIconDef[] = [
  {
    id: 'sop.volumeadjustfog',
    label: 'Volume Adjust Fog',
    family: 'sop',
    description: 'Isometric fog volume cube with density adjustment bands and gradient ramp layers.',
    types: ['volumeadjustfog'],
    icons: ['sop_volumeadjustfog'],
    refKey: 'SOP_volumeadjustfog',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-vaf-top`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#b2cbe5" />
          </linearGradient>
          <linearGradient id={`${uid}-vaf-left`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b2cbe5" />
            <stop offset="50%" stopColor="#729fcf" />
            <stop offset="100%" stopColor="#3465a4" />
          </linearGradient>
          <linearGradient id={`${uid}-vaf-right`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9edbe8" />
            <stop offset="50%" stopColor="#3465a4" />
            <stop offset="100%" stopColor="#204a87" />
          </linearGradient>
        </defs>
        <ellipse cx="12" cy="19.5" rx="8.5" ry="2.5" fill="#262626" fillOpacity="0.25" />
        {/* Isometric Cube Faces */}
        <polygon points="12,3.5 19.5,7.2 12,11 4.5,7.2" fill={`url(#${uid}-vaf-top)`} stroke="#262626" strokeWidth="0.85" strokeLinejoin="round" />
        <polygon points="4.5,7.2 12,11 12,18.5 4.5,14.7" fill={`url(#${uid}-vaf-left)`} stroke="#262626" strokeWidth="0.85" strokeLinejoin="round" />
        <polygon points="12,11 19.5,7.2 19.5,14.7 12,18.5" fill={`url(#${uid}-vaf-right)`} stroke="#262626" strokeWidth="0.85" strokeLinejoin="round" />
        {/* Fog Adjustment Density Bands */}
        <line x1="4.5" y1="11" x2="12" y2="14.8" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.7" />
        <line x1="12" y1="14.8" x2="19.5" y2="11" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.7" />
        <line x1="4.5" y1="13" x2="12" y2="16.8" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.4" />
        <line x1="12" y1="16.8" x2="19.5" y2="13" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.4" />
        {/* Density slider handle */}
        <circle cx="15.8" cy="12.8" r="1.4" fill="#ffdb19" stroke="#262626" strokeWidth="0.75" />
      </>
    ),
  },
  {
    id: 'sop.volumeambientocclusion',
    label: 'Volume Ambient Occlusion',
    family: 'sop',
    description: 'Volumetric cloud shaded with deep ambient occlusion darkening in concave folds.',
    types: ['volumeambientocclusion'],
    icons: ['sop_volumeambientocclusion'],
    refKey: 'SOP_volumeambientocclusion',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-vao-cloud`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#d1d1d1" />
            <stop offset="85%" stopColor="#888a85" />
            <stop offset="100%" stopColor="#51534f" />
          </radialGradient>
        </defs>
        <ellipse cx="12" cy="19" rx="8" ry="2.4" fill="#262626" fillOpacity="0.25" />
        {/* Ambient occlusion shadow crevices */}
        <path
          d="M5,15.5 C3,15.5 2,13.5 2.8,11.5 C3.2,10 4.8,9 6.2,9.2 C7,6.8 9.5,5 12.2,5.2 C14.5,5.4 16.5,7 17.2,9.2 C18.8,9.2 20.5,10.5 20.8,12.2 C21.2,14.2 19.8,16 17.8,16.2 Z"
          fill="#2e3436"
        />
        {/* Volumetric cloud body */}
        <path
          d="M5.5,15 C3.8,15 2.8,13.2 3.5,11.5 C3.8,10.2 5.2,9.4 6.5,9.5 C7.2,7.4 9.5,5.8 12,6 C14.2,6.2 16,7.5 16.8,9.5 C18.2,9.5 19.8,10.8 20,12.2 C20.5,14 19.2,15.5 17.5,15.5 Z"
          fill={`url(#${uid}-vao-cloud)`}
          stroke="#2e3436"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Inner occlusion crease lines */}
        <path d="M7.5,10.5 C8.8,11.8 11.2,12.5 13.5,11 C15,10 16.2,10.8 17,12" fill="none" stroke="#51534f" strokeWidth="1" strokeLinecap="round" />
        <path d="M9.5,13.5 C11,14.5 13,14.5 14.8,13.8" fill="none" stroke="#2e3436" strokeWidth="0.85" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.volumeanalysis',
    label: 'Volume Analysis',
    family: 'sop',
    description: 'Volume cloud analyzed with outward normal field vectors and green gradient arrows.',
    types: ['volumeanalysis'],
    icons: ['sop_volumeanalysis'],
    refKey: 'SOP_volumeanalysis',
    render: () => (
      <g>
        <ellipse cx="12" cy="18.5" rx="7.5" ry="2.2" fill="#262626" fillOpacity="0.22" />
        {/* Base Volume Cloud Puff */}
        <path
          d="M6,15.5 C4.5,15.5 3.5,14 4,12.5 C4.2,11.2 5.5,10.5 6.5,10.6 C7,8.8 8.8,7.5 11,7.6 C12.8,7.7 14.2,8.8 14.8,10.4 C16,10.4 17.5,11.5 17.5,13 C17.8,14.5 16.8,15.8 15.2,15.8 Z"
          fill="#d5d5d0"
          stroke="#546063"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Outward normal field vectors (green) */}
        {/* Vector 1: top-left */}
        <line x1="9" y1="8.5" x2="6.2" y2="4.8" stroke="#4e9a06" strokeWidth="1.6" strokeLinecap="round" />
        <polygon points="5,3.2 7.8,4.2 5.8,6.2" fill="#8dbf14" stroke="#4e9a06" strokeWidth="0.6" strokeLinejoin="round" />
        {/* Vector 2: top-right */}
        <line x1="13.5" y1="8.5" x2="16.5" y2="4.8" stroke="#4e9a06" strokeWidth="1.6" strokeLinecap="round" />
        <polygon points="17.8,3.2 16.8,6.2 14.8,4.2" fill="#8dbf14" stroke="#4e9a06" strokeWidth="0.6" strokeLinejoin="round" />
        {/* Vector 3: side-right */}
        <line x1="16.5" y1="12.5" x2="20.5" y2="11.5" stroke="#4e9a06" strokeWidth="1.6" strokeLinecap="round" />
        <polygon points="22.2,11 19.5,12.8 19.8,10.2" fill="#8dbf14" stroke="#4e9a06" strokeWidth="0.6" strokeLinejoin="round" />
        {/* Vector 4: side-left */}
        <line x1="4.5" y1="12.5" x2="1.8" y2="12.5" stroke="#4e9a06" strokeWidth="1.6" strokeLinecap="round" />
        <polygon points="0.5,12.5 2.5,11 2.5,14" fill="#8dbf14" stroke="#4e9a06" strokeWidth="0.6" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.volumearrivaltime',
    label: 'Volume Arrival Time',
    family: 'sop',
    description: 'Volume wavefront arrival time field with expanding concentric contour bands.',
    types: ['volumearrivaltime'],
    icons: ['sop_volumearrivaltime'],
    refKey: 'SOP_volumearrivaltime',
    render: () => (
      <g>
        <ellipse cx="12" cy="19" rx="8" ry="2.2" fill="#262626" fillOpacity="0.22" />
        {/* Base Volume Cloud Puff */}
        <path
          d="M5,16 C3.5,16 2.5,14.5 3,13 C3.2,11.5 4.5,10.8 5.8,10.9 C6.5,8.8 8.5,7.2 11,7.4 C13,7.5 14.8,8.8 15.5,10.6 C16.8,10.6 18.5,11.8 18.5,13.5 C18.8,15.2 17.5,16.5 15.8,16.5 Z"
          fill="#c4c5c2"
          stroke="#546063"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Wavefront propagation isocontour arcs */}
        <path d="M5.5,14.5 C7.5,12.8 9.5,12.8 11.5,14.5" fill="none" stroke="#8dbf14" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M4.5,12 C7.5,9.5 11.5,9.5 14.5,12" fill="none" stroke="#729fcf" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M6,8.8 C9,6.5 14,6.8 16.5,9.8" fill="none" stroke="#ad7fa8" strokeWidth="1.2" strokeLinecap="round" />
        {/* Wavefront origin seed dot */}
        <circle cx="8.5" cy="15.2" r="1.2" fill="#8dbf14" stroke="#262626" strokeWidth="0.6" />
      </g>
    ),
  },
  {
    id: 'sop.volumeblur',
    label: 'Volume Blur',
    family: 'sop',
    description: 'Diffuse volume cloud fading outwards into space through concentric blur zones.',
    types: ['volumeblur'],
    icons: ['sop_volumeblur'],
    refKey: 'SOP_volumeblur',
    render: () => (
      <g>
        {/* Outermost blurred halo */}
        <path
          d="M4.5,16.5 C2.5,16.5 1.2,14.5 2,12.2 C2.5,10 4.2,9 5.8,9.2 C6.8,6.5 9.5,4.8 12.5,5 C15.2,5.2 17.5,7 18.5,9.5 C20.2,9.5 22.2,11 22.5,13.2 C23,15.5 21.2,17.2 19,17.2 Z"
          fill="none"
          stroke="#888a85"
          strokeWidth="1.6"
          strokeOpacity="0.25"
          strokeDasharray="1.5 1.5"
        />
        {/* Intermediate blur layer */}
        <path
          d="M5,15.8 C3.2,15.8 2.2,14 2.8,12 C3.2,10.2 4.8,9.4 6.2,9.5 C7,7.2 9.5,5.8 12.2,6 C14.5,6.2 16.5,7.6 17.2,9.8 C18.8,9.8 20.5,11.2 20.8,13 C21.2,15 19.8,16.5 17.8,16.5 Z"
          fill="none"
          stroke="#888a85"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />
        {/* Dense cloud core */}
        <path
          d="M5.8,15 C4.5,15 3.5,13.5 4,12 C4.2,10.8 5.5,10 6.5,10.2 C7.2,8.2 9.2,7 11.8,7.2 C13.8,7.4 15.5,8.5 16,10.2 C17.2,10.2 18.5,11.2 18.8,12.5 C19.2,14.2 18,15.5 16.5,15.5 Z"
          fill="#d5d5d0"
          stroke="#51534f"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Blur streaks */}
        <line x1="8" y1="11.5" x2="14" y2="11.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
        <line x1="9" y1="13.5" x2="13.5" y2="13.5" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'sop.volumebound',
    label: 'Volume Bound',
    family: 'sop',
    description: 'Isometric 3D bounding box cage tightly enclosing an internal volume fog cloud.',
    types: ['volumebound'],
    icons: ['sop_volumebound'],
    refKey: 'SOP_volumebound',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-vb-cage`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f40000" />
            <stop offset="35%" stopColor="#ffdb19" />
            <stop offset="70%" stopColor="#9fff3e" />
            <stop offset="100%" stopColor="#07c3ff" />
          </linearGradient>
        </defs>
        {/* Soft inner volume cloud */}
        <ellipse cx="12" cy="12" rx="4.5" ry="3.5" fill="#729fcf" fillOpacity="0.45" />
        <ellipse cx="11.2" cy="11.2" rx="3.2" ry="2.2" fill="#ffffff" fillOpacity="0.55" />
        {/* Back wireframe edges */}
        <g stroke="#ffffff" strokeWidth="0.85" strokeDasharray="1.5 1.2" strokeOpacity="0.85">
          <line x1="4" y1="8" x2="12" y2="4" />
          <line x1="4" y1="8" x2="4" y2="16" />
          <line x1="4" y1="16" x2="12" y2="20" />
        </g>
        {/* Front 3D Bounding Box Outline */}
        <g stroke={`url(#${uid}-vb-cage)`} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" fill="none">
          <polygon points="12,4 20,8 12,12 4,8" />
          <line x1="20" y1="8" x2="20" y2="16" />
          <line x1="12" y1="12" x2="12" y2="20" />
          <polyline points="4,8 4,16 12,20 20,16" />
        </g>
        {/* Corner alignment vertex dots */}
        <circle cx="12" cy="4" r="0.9" fill="#ffffff" />
        <circle cx="20" cy="8" r="0.9" fill="#ffffff" />
        <circle cx="12" cy="12" r="0.9" fill="#ffffff" />
        <circle cx="12" cy="20" r="0.9" fill="#ffffff" />
      </>
    ),
  },
  {
    id: 'sop.volumebreak',
    label: 'Volume Break',
    family: 'sop',
    description: 'Cylindrical volume divided and fractured into separate breaking chunks with orange seams.',
    types: ['volumebreak'],
    icons: ['sop_volumebreak'],
    refKey: 'SOP_volumebreak',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-vbrk-body`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bfd0dc" />
            <stop offset="60%" stopColor="#729fcf" />
            <stop offset="100%" stopColor="#204a87" />
          </linearGradient>
        </defs>
        <ellipse cx="12" cy="19.5" rx="8" ry="2.2" fill="#262626" fillOpacity="0.22" />
        {/* Left fractured volume half */}
        <path
          d="M4,9.5 C4,6.5 7.5,4.5 11,4.5 L10.5,10.2 L8.8,12 L10.8,16.5 C7.5,16.5 4,14.5 4,11.5 Z"
          fill={`url(#${uid}-vbrk-body)`}
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Right fractured volume half separated */}
        <path
          d="M13.2,4.8 C16.5,4.8 20,6.8 20,9.8 L20,11.8 C20,14.8 16.5,16.8 13.2,16.8 L13.2,12.5 L14.5,10.8 L12.8,5.2 Z"
          fill={`url(#${uid}-vbrk-body)`}
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Fracture cut line in bright orange */}
        <polyline points="11,4 12,9.8 10.2,11.8 12.5,17" fill="none" stroke="#f57900" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="11,4 12,9.8 10.2,11.8 12.5,17" fill="none" stroke="#fcaf3e" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.volumecombine',
    label: 'Volume Combine',
    family: 'sop',
    description: 'Two volumetric clouds in magenta and cyan merging together in a unified volume.',
    types: ['volumecombine'],
    icons: ['sop_volumecombine'],
    refKey: 'SOP_volumecombine',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-vc-mag`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ece2eb" />
            <stop offset="60%" stopColor="#ad7fa8" />
            <stop offset="100%" stopColor="#5c3566" />
          </linearGradient>
          <linearGradient id={`${uid}-vc-blue`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#729fcf" />
            <stop offset="100%" stopColor="#204a87" />
          </linearGradient>
        </defs>
        <ellipse cx="12" cy="18.5" rx="8.5" ry="2.4" fill="#262626" fillOpacity="0.22" />
        {/* Left magenta cloud lobe */}
        <path
          d="M5,15.5 C3.5,15.5 2.5,13.8 3,12 C3.5,10.2 5,9.5 6.2,9.8 C7,7.8 9,6.5 11.2,6.8 C12.2,7 13,7.5 13.5,8.2 L12.5,15.5 Z"
          fill={`url(#${uid}-vc-mag)`}
          stroke="#5c3566"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Right cyan cloud lobe merging */}
        <path
          d="M11.5,8.5 C12.5,7.5 14,7 15.5,7.2 C17.5,7.5 19,9 19.5,10.8 C20.8,11.2 21.8,12.5 21.5,14 C21,15.5 19.8,16.2 18,16.2 L11.5,15.5 Z"
          fill={`url(#${uid}-vc-blue)`}
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Central combination symbol (+) */}
        <circle cx="12" cy="12" r="3.2" fill="#262626" fillOpacity="0.75" />
        <line x1="12" y1="10" x2="12" y2="14" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="10" y1="12" x2="14" y2="12" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.volumecompress',
    label: 'Volume Compress',
    family: 'sop',
    description: 'Volume cloud squeezed vertically between two opposing golden compressor plates.',
    types: ['volumecompress'],
    icons: ['sop_volumecompress'],
    refKey: 'SOP_volumecompress',
    render: () => (
      <g>
        {/* Squeezed flattened cloud in center */}
        <ellipse cx="12" cy="12" rx="7.8" ry="4" fill="#c4c5c2" stroke="#51534f" strokeWidth="0.9" />
        <ellipse cx="11.2" cy="11.2" rx="5.5" ry="2.4" fill="#ffffff" stroke="none" fillOpacity="0.6" />
        {/* Top compressor plate */}
        <rect x="4" y="3.5" width="16" height="2.8" rx="0.8" fill="#e9b96e" stroke="#8f5902" strokeWidth="0.85" />
        {/* Top downward compression arrows */}
        <path d="M12,6.5 L12,9.2 M10.2,7.8 L12,9.5 L13.8,7.8" fill="none" stroke="#8f5902" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Bottom compressor plate */}
        <rect x="4" y="17.7" width="16" height="2.8" rx="0.8" fill="#e9b96e" stroke="#8f5902" strokeWidth="0.85" />
        {/* Bottom upward compression arrows */}
        <path d="M12,17.5 L12,14.8 M10.2,16.2 L12,14.5 L13.8,16.2" fill="none" stroke="#8f5902" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.volumeconvolve3',
    label: 'Volume Convolve 3x3x3',
    family: 'sop',
    description: 'Volume grid sampled by a glowing orange 3x3x3 convolution kernel block.',
    types: ['volumeconvolve3'],
    icons: ['sop_volumeconvolve3'],
    refKey: 'SOP_volumeconvolve3',
    render: () => (
      <g>
        <ellipse cx="12" cy="19.5" rx="8" ry="2.2" fill="#262626" fillOpacity="0.22" />
        {/* Volume cloud base in background */}
        <path
          d="M5,16 C3.8,16 3,14.5 3.5,13 C3.8,11.5 5,10.8 6,10.9 C6.8,8.8 8.8,7.5 11.2,7.6 C13.2,7.7 15,9 15.6,10.8 C17,10.8 18.5,12 18.5,13.5 C18.8,15.2 17.5,16.5 15.8,16.5 Z"
          fill="#d5d5d0"
          stroke="#555753"
          strokeWidth="0.85"
        />
        {/* 3x3x3 Convolution kernel isometric box in foreground */}
        <polygon points="12,3.5 17.5,6.5 12,9.5 6.5,6.5" fill="#fce94f" stroke="#8f5902" strokeWidth="0.85" strokeLinejoin="round" />
        <polygon points="6.5,6.5 12,9.5 12,15.5 6.5,12.5" fill="#e9b96e" stroke="#8f5902" strokeWidth="0.85" strokeLinejoin="round" />
        <polygon points="12,9.5 17.5,6.5 17.5,12.5 12,15.5" fill="#c17d11" stroke="#8f5902" strokeWidth="0.85" strokeLinejoin="round" />
        {/* 3x3 Grid division lines across kernel box */}
        <line x1="8.3" y1="5.5" x2="13.8" y2="8.5" stroke="#8f5902" strokeWidth="0.6" />
        <line x1="10.2" y1="4.5" x2="15.7" y2="7.5" stroke="#8f5902" strokeWidth="0.6" />
        <line x1="8.3" y1="7.5" x2="10.2" y2="6.5" stroke="#8f5902" strokeWidth="0.6" />
        <line x1="13.8" y1="10.5" x2="15.7" y2="9.5" stroke="#8f5902" strokeWidth="0.6" />
        <line x1="6.5" y1="8.5" x2="12" y2="11.5" stroke="#8f5902" strokeWidth="0.6" />
        <line x1="6.5" y1="10.5" x2="12" y2="13.5" stroke="#8f5902" strokeWidth="0.6" />
        <line x1="8.3" y1="7.5" x2="8.3" y2="13.5" stroke="#8f5902" strokeWidth="0.6" />
        <line x1="10.2" y1="8.5" x2="10.2" y2="14.5" stroke="#8f5902" strokeWidth="0.6" />
      </g>
    ),
  },
];
