import type { OperatorIconDef } from '../../../iconTypes';
import { pts, quadGridPath, quadPt, type Pt } from '../../../geoHelpers';
import { Scissors } from './sharedElements';

/**
 * Batch 2, Part 5 (icons 50 to 59): built-in Houdini SOP icons under review.
 */
export const BATCH_02_PART_5: OperatorIconDef[] = [
  {
    id: 'sop.platonic',
    label: 'Platonic Solids',
    family: 'sop',
    description: 'Faceted metallic grey icosahedron resting over a soft ground shadow.',
    types: ['platonic'],
    icons: ['sop_platonic'],
    refKey: 'SOP_platonic',
    render: () => (
      <>
        <ellipse cx="12" cy="20.8" rx="8.8" ry="2" fill="#262626" fillOpacity="0.3" />
        <g stroke="#262626" strokeWidth="0.75" strokeLinejoin="round">
          <polygon points="6.2,3.4 16.5,2 9.8,6.2" fill="#eeeeec" />
          <polygon points="6.2,3.4 9.8,6.2 2.4,12.8" fill="#d3d7cf" />
          <polygon points="16.5,2 21.4,10.2 9.8,6.2" fill="#b8b8b8" />
          <polygon points="9.8,6.2 21.4,10.2 11.4,17.2" fill="#9e9e9e" />
          <polygon points="2.4,12.8 9.8,6.2 11.4,17.2" fill="#848484" />
          <polygon points="2.4,12.8 11.4,17.2 8.2,21" fill="#666666" />
          <polygon points="11.4,17.2 18.8,19.4 8.2,21" fill="#515151" />
          <polygon points="11.4,17.2 21.4,10.2 18.8,19.4" fill="#707070" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.relax',
    label: 'Point Relax',
    family: 'sop',
    description:
      'Subdivided quad mesh with a central vertex and four red-orange arrows radiating outward along the grid axes.',
    types: ['relax', 'uvrelax'],
    icons: ['sop_relax', 'sop_uvrelax'],
    refKey: 'SOP_relax',
    render: () => (
      <>
        <polygon
          points="2.5,2.5 12,5.5 21.5,2.5 18.5,12 21.5,21.5 12,18.5 2.5,21.5 5.5,12"
          fill="#2e3436"
          stroke="#eeeeec"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <g stroke="#d3d7cf" strokeWidth="0.7">
          <line x1="2.5" y1="2.5" x2="21.5" y2="21.5" />
          <line x1="21.5" y1="2.5" x2="2.5" y2="21.5" />
          <polygon points="7.2,7.2 16.8,7.2 16.8,16.8 7.2,16.8" fill="none" />
        </g>
        <g fill="#ef2929" stroke="#eeeeec" strokeWidth="0.55" strokeLinejoin="round">
          <polygon points="12,2 14.6,5.6 13,5.6 13,9.5 11,9.5 11,5.6 9.4,5.6" />
          <polygon points="12,22 14.6,18.4 13,18.4 13,14.5 11,14.5 11,18.4 9.4,18.4" />
          <polygon points="2,12 5.6,9.4 5.6,11 9.5,11 9.5,13 5.6,13 5.6,14.6" />
          <polygon points="22,12 18.4,9.4 18.4,11 14.5,11 14.5,13 18.4,13 18.4,14.6" />
        </g>
        <circle cx="12" cy="12" r="1.6" fill="#dfeaa1" stroke="#2e3436" strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.splitpoints',
    label: 'Point Split',
    family: 'sop',
    description:
      'Orange pyramid with its apex split open into separate yellow-green vertex points.',
    types: ['splitpoints'],
    icons: ['sop_splitpoints'],
    refKey: 'SOP_splitpoints',
    render: () => (
      <>
        <polygon
          points="2,15.5 11.8,11.2 22,15.5 12.2,21.8"
          fill="#ce5c00"
          stroke="#5f2a00"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2,15.5 10.2,5.2 11.2,11.8"
          fill="#fdbf64"
          stroke="#5f2a00"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="13.4,5 22,15.5 12.6,11.8"
          fill="#f57900"
          stroke="#5f2a00"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2,15.5 10.6,8.2 12.2,21.8"
          fill="#ffa54c"
          stroke="#5f2a00"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="13.2,8.2 22,15.5 12.2,21.8"
          fill="#e96712"
          stroke="#5f2a00"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <g fill="#dfeaa1" stroke="#5f2a00" strokeWidth="0.65">
          <circle cx="10.2" cy="4.8" r="1.2" />
          <circle cx="13.4" cy="4.8" r="1.2" />
          <circle cx="10.6" cy="7.8" r="1.2" />
          <circle cx="13.2" cy="7.8" r="1.2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.polybridge',
    label: 'PolyBridge',
    family: 'sop',
    description:
      'Thick 90-degree bent tube rising from the bottom and turning right: blue end segments joined by a yellow bridge section, with an open blue end at the upper right.',
    types: ['polybridge'],
    icons: ['sop_polybridge'],
    refKey: 'SOP_polybridge',
    render: () => {
      const d = 'M9,21.4 L9,15.4 C9,9.8 12.2,6.2 17.8,5.6';
      return (
        <>
          <path d="M9,22.2 L9,15.4 C9,9.8 12.2,6.2 17.8,5.6" fill="none" stroke="#262626" strokeWidth="8.8" />
          <path d={d} fill="none" stroke="#f2c438" strokeWidth="7" />
          <path d={d} fill="none" stroke="#3672c4" strokeWidth="7" pathLength={100} strokeDasharray="32 40 28" />
          <path d={d} fill="none" stroke="#262626" strokeWidth="7" pathLength={100} strokeDasharray="0 31.6 0.8 39.6 0.8 100" />
          {/* Rounded shading: light along the outer left, shadow along the inner right */}
          <path d="M6.6,21.4 L6.6,15.2 C6.6,8.4 10.8,4 17.6,3.4" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.3" />
          <path d="M11.3,21.4 L11.3,15.6 C11.3,11.4 13.6,8.6 18,8" fill="none" stroke="#262626" strokeOpacity="0.28" strokeWidth="1.6" />
          {/* Open end */}
          <ellipse cx="17.8" cy="5.6" rx="1.6" ry="3.6" transform="rotate(-6 17.8 5.6)" fill="#8fc2ff" stroke="#262626" strokeWidth="1" />
          <ellipse cx="17.9" cy="5.6" rx="0.9" ry="2.6" transform="rotate(-6 17.9 5.6)" fill="#3a3f47" />
        </>
      );
    },
  },
  {
    id: 'sop.polycut',
    label: 'PolyCut',
    family: 'sop',
    description:
      'Red-handled silver scissors snipping a cased curve into a red left segment and a light blue right segment at the blades.',
    types: ['polycut'],
    icons: ['sop_polycut'],
    refKey: 'SOP_polycut',
    render: () => (
      <>
        <g fill="none" strokeLinecap="round">
          <path d="M1.8,15.4 C5.4,15.8 8,11.6 11.4,11 C15.6,10.2 17.6,5.2 22.2,4.4" stroke="#262626" strokeWidth="2.8" />
          <path d="M1.8,15.4 C5.4,15.8 8,11.6 11.4,11" stroke="#e03228" strokeWidth="1.6" />
          <path d="M11.4,11 C15.6,10.2 17.6,5.2 22.2,4.4" stroke="#5aa2f2" strokeWidth="1.6" />
        </g>
        <Scissors transform="translate(11.4 11.6) rotate(-40)" />
      </>
    ),
  },
  {
    id: 'sop.polydoctor',
    label: 'PolyDoctor',
    family: 'sop',
    description:
      'Medical stethoscope with metallic earpieces, dark tubing, and a round silver chestpiece.',
    types: ['polydoctor'],
    icons: ['sop_polydoctor'],
    refKey: 'SOP_polydoctor',
    render: () => (
      <>
        <ellipse cx="17.2" cy="19.6" rx="4.4" ry="2.1" fill="#dedede" stroke="#2e3436" strokeWidth="0.85" />
        <ellipse cx="17.2" cy="19.3" rx="2.8" ry="1.2" fill="#ababab" stroke="#555753" strokeWidth="0.55" />
        <path
          d="M4.2,3.4 C1.8,6.2 3,12.2 6.8,14 C10.6,12.2 12.2,6.5 9.8,3.8"
          fill="none"
          stroke="#8c8c8c"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M6.8,14 C6.8,18.2 9.5,19.8 11.8,17.2 C14,14.8 16.5,14.5 17.2,18.2"
          fill="none"
          stroke="#262626"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <ellipse cx="4.4" cy="3" rx="1.4" ry="0.9" transform="rotate(-30 4.4 3)" fill="#ededed" stroke="#2e3436" strokeWidth="0.65" />
        <ellipse cx="9.6" cy="3.4" rx="1.4" ry="0.9" transform="rotate(30 9.6 3.4)" fill="#ededed" stroke="#2e3436" strokeWidth="0.65" />
      </>
    ),
  },
  {
    id: 'sop.polyexpand2d',
    label: 'PolyExpand2D',
    family: 'sop',
    description:
      'Expanded yellow five-pointed star surrounding an inner dashed white star.',
    types: ['polyexpand2d'],
    icons: ['sop_polyexpand2d'],
    refKey: 'SOP_polyexpand2d',
    render: () => (
      <>
        <polygon
          points="10.2,1.8 14.2,8.2 21.6,7.4 16.4,13.2 19.6,20.2 12,16.8 5.8,22 6.8,14.2 1.2,10.2 8.6,8.6"
          fill="#fce94f"
          stroke="#c4a000"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polygon
          points="10.8,6.8 12.8,10 16.5,9.6 13.8,12.5 15.4,16 11.6,14.2 8.5,16.8 9,13 6.2,11 9.8,10.2"
          fill="#eeeeec"
          stroke="#2e3436"
          strokeWidth="0.85"
          strokeDasharray="1.4 0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.polyfill',
    label: 'PolyFill',
    family: 'sop',
    description:
      'Tilted orange polygon grid patch whose central hole is filled with bright yellow quads inside a dashed dark border.',
    types: ['polyfill'],
    icons: ['sop_polyfill'],
    refKey: 'SOP_polyfill',
    render: (uid) => {
      const q: [Pt, Pt, Pt, Pt] = [
        [2.6, 8.4],
        [14.2, 2.2],
        [21.6, 12.4],
        [9, 21.6],
      ];
      const hole: [Pt, Pt, Pt, Pt] = [quadPt(q, 1 / 3, 1 / 3), quadPt(q, 2 / 3, 1 / 3), quadPt(q, 2 / 3, 2 / 3), quadPt(q, 1 / 3, 2 / 3)];
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-pf`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffb066" />
              <stop offset="100%" stopColor="#ee8624" />
            </linearGradient>
          </defs>
          <polygon points={pts(q)} fill={`url(#${uid}-pf)`} />
          <path d={quadGridPath(q, 6, 6)} stroke="#c25e12" strokeWidth="0.55" />
          <polygon points={pts(hole)} fill="#ffe47a" />
          <path d={quadGridPath(hole, 2, 2)} stroke="#d49a18" strokeWidth="0.55" />
          <polygon points={pts(hole)} fill="none" stroke="#262626" strokeWidth="1" strokeDasharray="1.3 0.8" />
          <polygon points={pts(q)} fill="none" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'sop.polyhinge',
    label: 'PolyHinge',
    family: 'sop',
    description:
      'Silver hinged polygon arm pivoting upward from a dark hinge pin with curved motion lines.',
    types: ['polyhinge'],
    icons: ['sop_polyhinge'],
    refKey: 'SOP_polyhinge',
    render: () => (
      <>
        <ellipse cx="12.5" cy="21" rx="8.5" ry="1.6" fill="#262626" fillOpacity="0.25" />
        <circle
          cx="7.2"
          cy="9.2"
          r="4.6"
          fill="none"
          stroke="#f57f7f"
          strokeWidth="0.65"
          strokeDasharray="1.2 1"
        />
        <path
          d="M19.5,6.8 L6.8,8.5 C5.4,8.8 5,10 5.8,11.2 L12.8,20.2 L16,18 L9.8,10.4 L19.8,9.2 Z"
          fill="#d3d7cf"
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <circle cx="7.4" cy="9.6" r="1.3" fill="#fce94f" stroke="#2e3436" strokeWidth="0.7" />
        <ellipse cx="19.6" cy="8" rx="1" ry="1.5" fill="#2e3436" />
        <path
          d="M13.5,2.4 C16.2,3 18.2,4.8 18.8,6.6 M13.2,4.2 C15.2,4.8 16.5,5.8 17,7"
          fill="none"
          stroke="#888a85"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.polyloft',
    label: 'PolyLoft',
    family: 'sop',
    description:
      'Two separate orange two-quad polygon strips connected by a bright yellow lofted quad bridge.',
    types: ['polyloft'],
    icons: ['sop_polyloft'],
    refKey: 'SOP_polyloft',
    render: () => (
      <>
        <polygon
          points="4.8,12.2 10.2,6.4 18.4,12.8 13.2,18.6"
          fill="#fce94f"
          stroke="#8b3b00"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon
          points="1.6,15.2 4.8,12.2 13.2,18.6 9.6,21.8"
          fill="#f57900"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <line x1="5.6" y1="18.5" x2="9" y2="15.4" stroke="#8b3b00" strokeWidth="0.7" />
        <polygon
          points="10.2,6.4 13.8,3.2 22,9.6 18.4,12.8"
          fill="#ffa54c"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <line x1="14.2" y1="9.6" x2="17.8" y2="6.4" stroke="#8b3b00" strokeWidth="0.7" />
      </>
    ),
  },
];
