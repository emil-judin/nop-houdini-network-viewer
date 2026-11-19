import { arrowHead, pts } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

const OUTLINE = '#262626';

/**
 * Copy and instance operators.
 */
export const COPY_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.copytopoints',
    label: 'Copy to Points',
    family: 'sop',
    description: 'Translucent wireframe cube with orange spheres copied onto its corner points.',
    types: ['copytopoints'],
    refKey: 'SOP_copytopoints-2.0',
    render: () => (
      <>
        <polygon
          points="12,4 19,8 19,16 12,20 5,16 5,8"
          fill="#8892a0"
          fillOpacity="0.35"
          stroke="#c8d0dc"
          strokeWidth="1.2"
        />
        <line x1="12" y1="12" x2="12" y2="20" stroke="#c8d0dc" strokeWidth="1.1" />
        <line x1="5" y1="8" x2="12" y2="12" stroke="#c8d0dc" strokeWidth="1.1" />
        <line x1="19" y1="8" x2="12" y2="12" stroke="#c8d0dc" strokeWidth="1.1" />
        <circle cx="12" cy="4" r="2.3" fill="#ee7824" stroke="#222" strokeWidth="0.9" />
        <circle cx="5" cy="8" r="2.3" fill="#ee7824" stroke="#222" strokeWidth="0.9" />
        <circle cx="19" cy="8" r="2.3" fill="#ee7824" stroke="#222" strokeWidth="0.9" />
        <circle cx="12" cy="12" r="2.3" fill="#ee7824" stroke="#222" strokeWidth="0.9" />
        <circle cx="12" cy="20" r="2" fill="#b8c0cc" stroke="#222" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.copytocurves',
    label: 'Copy to Curves',
    family: 'sop',
    description:
      'Z-shaped three-point curve with a grey cube, an orange ring and a purple cone copied onto its points.',
    types: ['copytocurves'],
    icons: ['sop_copytocurves'],
    refKey: 'SOP_copytocurves',
    render: () => (
      <>
        <polyline
          points="5.5,12.5 10.5,6.5 14.5,17.5 19.5,12.5"
          fill="none"
          stroke="#262626"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <polyline
          points="5.5,12.5 10.5,6.5 14.5,17.5 19.5,12.5"
          fill="none"
          stroke="#8fc2ff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <rect x="3" y="10.2" width="4.5" height="4.5" transform="rotate(-15 5.2 12.5)" fill="#c0c7d1" />
          <circle cx="10.5" cy="6.5" r="1.8" fill="#3672c4" />
          <ellipse cx="14.5" cy="17.5" rx="3.2" ry="1.8" fill="#ee8624" />
          <polygon points="19.5,8.8 21.8,13.5 17.2,13.5" fill="#c89eff" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.copyxform',
    label: 'Copy and Transform',
    family: 'sop',
    description: 'Three grey spheres shrinking from left to right, each a transformed copy of the previous one.',
    types: ['copyxform'],
    icons: ['sop_duplicate'],
    refKey: 'SOP_copyxform',
    render: () => (
      <>
        <circle cx="7.5" cy="12" r="5.2" fill="#dce2ec" stroke="#262626" strokeWidth="1.2" />
        <circle cx="14.5" cy="13" r="3.8" fill="#c2cad6" stroke="#262626" strokeWidth="1.2" />
        <circle cx="19.5" cy="14" r="2.4" fill="#9ea8b6" stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'sop.instance',
    label: 'Instance',
    family: 'sop',
    description: 'Two white spheres overlaid with orange wireframe latitude and longitude grids arranged diagonally.',
    types: ['instance'],
    icons: ['sop_instance'],
    refKey: 'SOP_instance',
    render: () => (
      <>
        {[
          { cx: 8.6, cy: 10.0, r: 5.8 },
          { cx: 16.2, cy: 14.4, r: 4.8 },
        ].map((s, i) => (
          <g key={i} transform={`translate(${s.cx}, ${s.cy})`}>
            <circle cx="0" cy="0" r={s.r} fill="#ffffff" stroke="#262626" strokeWidth="1.05" />
            <g fill="none" stroke="#ee8624" strokeWidth="0.85">
              <ellipse cx="0" cy="0" rx={s.r * 0.48} ry={s.r * 0.94} />
              <ellipse cx="0" cy="0" rx={s.r * 0.94} ry={s.r * 0.42} />
              <line x1="0" y1={-s.r * 0.94} x2="0" y2={s.r * 0.94} />
              <line x1={-s.r * 0.94} y1="0" x2={s.r * 0.94} y2="0" />
            </g>
            <circle cx="0" cy="0" r={s.r} fill="none" stroke="#262626" strokeWidth="1.05" />
            <circle cx="0" cy="0" r="1.0" fill="#262626" />
          </g>
        ))}
      </>
    ),
  },
  {
    id: 'sop.findinstances',
    label: 'Find Instances',
    family: 'sop',
    description:
      'Two curved blue arrows forming an open ring around an I-beam cursor and baseline, with a blue marker pen at the lower right.',
    types: ['findinstances'],
    icons: ['sop_findinstances'],
    refKey: 'SOP_findinstances',
    render: () => {
      const leftHead = arrowHead([6.2, 3.8], [4.45, 5.83], 3.1, 1.85);
      const rightHead = arrowHead([11.0, 14.0], [13.09, 12.83], 3.1, 1.85);
      return (
        <>
          <line x1="6.0" y1="11.4" x2="20.4" y2="11.4" stroke={OUTLINE} strokeWidth="1.1" strokeLinecap="round" />
          <path
            d="M8.6,5.2 V9.6 M7.6,5.2 H9.6 M7.6,9.6 H9.6 M7.8,7.4 H9.4"
            fill="none"
            stroke={OUTLINE}
            strokeWidth="0.95"
            strokeLinecap="round"
          />
          {/* Left curved arrow (bottom-left clockwise to top-left) */}
          <CasedStroke d="M6.83,13.88 A5.6,5.6 0 0,1 4.45,5.83" color="#5aa2f2" width={1.5} casing={2.9} />
          <polygon points={pts(leftHead)} fill="#5aa2f2" stroke={OUTLINE} strokeWidth="0.85" strokeLinejoin="round" />
          {/* Right curved arrow (top clockwise to bottom-right) */}
          <CasedStroke d="M9.40,3.20 A5.6,5.6 0 0,1 13.09,12.83" color="#5aa2f2" width={1.5} casing={2.9} />
          <polygon points={pts(rightHead)} fill="#5aa2f2" stroke={OUTLINE} strokeWidth="0.85" strokeLinejoin="round" />
          {/* Marker pen at lower right */}
          <polygon
            points="13.8,15.7 16.4,15.7 15.7,17.7"
            fill="#eef2f7"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          <CasedStroke d="M16.1,17.4 L19.8,20.6" color="#5aa2f2" width={2.2} casing={3.6} />
        </>
      );
    },
  },
];
