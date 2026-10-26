import type { OperatorIconDef } from '../iconTypes';

/**
 * Built-in SOP generator icons (primitives and curves).
 *
 * Original MIT-licensed drawings that follow `docs/ICON_ART_BIBLE.md`.
 */
export const SOP_PRIMITIVE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.box',
    label: 'Box',
    family: 'sop',
    description:
      'Isometric three-tone grey cube (light top, mid left, dark right) with dark outlines. The reference for all grey solids.',
    types: ['box'],
    refKey: 'SOP_box',
    render: () => (
      <>
        <polygon points="12,3 20,7 12,11 4,7" fill="#eef2f7" stroke="#262626" strokeWidth="1.2" />
        <polygon points="4,7 12,11 12,20.5 4,16.5" fill="#c0c7d1" stroke="#262626" strokeWidth="1.2" />
        <polygon points="20,7 12,11 12,20.5 20,16.5" fill="#89929e" stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'sop.circle',
    label: 'Circle',
    family: 'sop',
    description:
      'Pale blue ring drawn over a thicker dark ring so it reads on any node color.',
    types: ['circle'],
    refKey: 'SOP_circle',
    render: () => (
      <>
        <circle cx="12" cy="12" r="8" fill="none" stroke="#232323" strokeWidth="3.2" />
        <circle cx="12" cy="12" r="8" fill="none" stroke="#9cb6d9" strokeWidth="1.8" />
      </>
    ),
  },
  {
    id: 'sop.curve',
    label: 'Curve',
    family: 'sop',
    description:
      'Blue Bezier arc with light blue square end points under a red control-hull line, drawn by a blue fountain pen whose nib touches the top of the arc.',
    types: ['curve'],
    refKey: 'SOP_curve',
    render: () => (
      <>
        {/* Control hull */}
        <path d="M3.5 4.5H20.5" stroke="#e03228" strokeWidth="1.3" />
        <circle cx="20.5" cy="4.5" r="1.5" fill="#e03228" stroke="#262626" strokeWidth="0.8" />
        <rect x="10.5" y="3" width="3" height="3" fill="#8fc2ff" stroke="#262626" strokeWidth="0.9" />
        {/* Bezier curve */}
        <path d="M3.5 19C3.5 4.5 20.5 4.5 20.5 19" fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
        <path d="M3.5 19C3.5 4.5 20.5 4.5 20.5 19" fill="none" stroke="#5aa2f2" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="2" y="17.5" width="3" height="3" fill="#8fc2ff" stroke="#262626" strokeWidth="0.9" />
        <rect x="19" y="17.5" width="3" height="3" fill="#8fc2ff" stroke="#262626" strokeWidth="0.9" />
        {/* Pen, tip touching the top of the curve */}
        <g transform="translate(12 8.6) rotate(-35)">
          <path d="M0 0L2.4 5.5H-2.4Z" fill="#dfe4ea" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
          <line x1="0" y1="1.6" x2="0" y2="4.2" stroke="#262626" strokeWidth="0.8" />
          <rect x="-2.6" y="5.5" width="5.2" height="1.6" fill="#89929e" stroke="#262626" strokeWidth="0.9" />
          <rect x="-2.6" y="7.1" width="5.2" height="6.4" rx="1.6" fill="#2e64b0" stroke="#262626" strokeWidth="1.1" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.grid',
    label: 'Grid',
    family: 'sop',
    description:
      'Flat light grey perspective plane divided into a 3 x 2 grid.',
    types: ['grid'],
    refKey: 'SOP_grid',
    render: () => (
      <>
        <polygon points="5,9 19,9 22,16 2,16" fill="#dce2ea" stroke="#262626" strokeWidth="1.3" />
        <line x1="9.5" y1="9" x2="8" y2="16" stroke="#4a4a4a" strokeWidth="0.9" />
        <line x1="14.5" y1="9" x2="16" y2="16" stroke="#4a4a4a" strokeWidth="0.9" />
        <line x1="3.5" y1="12.5" x2="20.5" y2="12.5" stroke="#4a4a4a" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.line',
    label: 'Line',
    family: 'sop',
    description:
      'Grey axis corner with a red diagonal line segment ending in a white point.',
    types: ['line'],
    refKey: 'SOP_line',
    render: () => (
      <>
        <polyline points="5,4 5,19 20,19" fill="none" stroke="#9aa2ae" strokeWidth="1.5" />
        <line x1="5" y1="19" x2="18" y2="6" stroke="#e03828" strokeWidth="2.3" strokeLinecap="round" />
        <circle cx="18" cy="6" r="1.8" fill="#ffffff" stroke="#222" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.sphere',
    label: 'Sphere',
    family: 'sop',
    description:
      'Shaded metallic sphere with a white highlight at the upper left.',
    types: ['sphere'],
    refKey: 'SOP_sphere',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ball`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#525862" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="8" fill={`url(#${uid}-ball)`} stroke="#232323" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'sop.tube',
    label: 'Tube',
    family: 'sop',
    description:
      'Grey open cylinder with a darker top opening.',
    types: ['tube'],
    refKey: 'SOP_tube',
    render: () => (
      <>
        <path d="M6.5,6 V18 A5.5,2.2 0 0 0 17.5,18 V6" fill="#c2cad6" stroke="#262626" strokeWidth="1.2" />
        <ellipse cx="12" cy="6" rx="5.5" ry="2.2" fill="#89929e" stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
];
