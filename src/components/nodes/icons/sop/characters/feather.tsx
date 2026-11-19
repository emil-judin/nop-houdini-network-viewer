import { arrowHead, type Pt, pts, r2 } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { FEATHER_TONES, FeatherVane } from '../kits/feather';

/**
 * Feather operators.
 */
export const FEATHER_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.featherbarbtangents',
    label: 'Feather Barb Tangents',
    family: 'sop',
    description: 'Diagonal purple quill feather with bright green barb tangent strokes on both sides of its mid vane.',
    types: ['featherbarbtangents'],
    icons: ['sop_featherbarbtangents'],
    refKey: 'SOP_featherbarbtangents',
    render: () => (
      <g transform="translate(12 11.6) rotate(30) scale(1.04 1.04)">
        <FeatherVane showBarbs={false} />
        <CasedStroke
          d="M0.3,-3.6 L2.4,-5.0 M0.3,-0.6 L2.8,-2.0 M0.2,2.2 L2.4,0.9 M-0.3,-3.6 L-2.4,-5.0 M-0.3,-0.6 L-2.8,-2.0 M-0.2,2.2 L-2.4,0.9"
          color="#52d638"
          width={0.85}
          casing={1.4}
        />
      </g>
    ),
  },
  {
    id: 'sop.featherclump',
    label: 'Feather Clump',
    family: 'sop',
    description:
      'Diagonal purple feather with three clumped barb tufts along its vane, crossed diagonally by a cased green dashed line.',
    types: ['featherclump'],
    icons: ['sop_featherclump'],
    refKey: 'SOP_featherclump',
    render: () => (
      <>
        <FeatherVane transform="translate(12 11.6) rotate(30)" clumped showBarbs={false} />
        <g fill="none" strokeLinecap="round" strokeDasharray="2.2 1.8">
          <path d="M4.2,6.4 L19.8,16.8" stroke="#262626" strokeWidth="1.95" />
          <path d="M4.2,6.4 L19.8,16.8" stroke="#52d638" strokeWidth="1.0" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.featherdeform',
    label: 'Feather Deform',
    family: 'sop',
    description:
      'Faint ghosted purple feather on the left beside a feather arched outward to the right and curving back at the tip, guided by a cased green spline with three square control points.',
    types: ['featherdeform'],
    icons: ['sop_featherdeform'],
    refKey: 'SOP_featherdeform',
    render: () => (
      <>
        <g opacity={0.55}>
          <FeatherVane transform="translate(8.0 11.6) rotate(8) scale(0.86 0.9)" fillOpacity={0.26} showBarbs={false} />
        </g>
        <FeatherVane transform="translate(12.2 12.0) rotate(32) scale(0.88 0.92)" bend={-3.4} showBarbs={false} />
        <CasedStroke d="M7.4,20.2 C14.8,17.8 18.2,11.6 14.6,3.8" color="#52d638" width={1.0} casing={1.85} />
        {[
          [7.4, 20.2],
          [16.3, 12.2],
          [14.6, 3.8],
        ].map(([cx, cy], idx) => (
          <rect
            key={idx}
            x={r2(cx - 1.1)}
            y={r2(cy - 1.1)}
            width="2.2"
            height="2.2"
            fill="#52d638"
            stroke="#262626"
            strokeWidth="0.7"
          />
        ))}
      </>
    ),
  },
  {
    id: 'sop.featherdeintersect',
    label: 'Feather Deintersect',
    family: 'sop',
    description:
      'Two feathers anchored at the bottom-left: a faint ghosted upright feather and a solid tilted-right purple feather, separated by a curved red double-headed arrow.',
    types: ['featherdeintersect'],
    icons: ['sop_featherdeintersect'],
    refKey: 'SOP_featherdeintersect',
    render: () => {
      const p0: Pt = [10.6, 4.8];
      const p1: Pt = [15.4, 4.4];
      const p2: Pt = [18.6, 8.2];
      const leftHead = arrowHead(p0, p1, 2.8, 1.35);
      const rightHead = arrowHead(p2, p1, 2.8, 1.35);
      const s0: Pt = [12.3, 4.65];
      const s2: Pt = [17.45, 6.85];
      return (
        <>
          <g opacity={0.5}>
            <FeatherVane
              transform="translate(8.4 12.8) rotate(-8) scale(0.85 0.85)"
              fillOpacity={0.26}
              showBarbs={false}
            />
          </g>
          <FeatherVane transform="translate(13.2 15.0) rotate(52) scale(0.85 0.85)" showBarbs={false} />
          <CasedStroke d={`M${pts([s0])} Q${pts([p1, s2])}`} color="#e03228" width={1.15} casing={2.1} linecap="butt" />
          <polygon points={pts(leftHead)} fill="#e03228" stroke="#262626" strokeWidth="0.7" strokeLinejoin="round" />
          <polygon points={pts(rightHead)} fill="#e03228" stroke="#262626" strokeWidth="0.7" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'sop.featherprimitive',
    label: 'Feather Primitive',
    family: 'sop',
    description:
      'Faceted light-grey stone slab with a darker beveled rim, stamped in the center with a blue feather emblem.',
    types: ['featherprimitive'],
    icons: ['sop_featherprimitive'],
    refKey: 'SOP_featherprimitive',
    render: () => {
      const outer: Pt[] = [
        [7.2, 3.2],
        [15.4, 3.0],
        [20.4, 6.8],
        [20.8, 14.8],
        [16.2, 20.6],
        [8.0, 20.8],
        [3.4, 15.8],
        [3.6, 7.6],
      ];
      const inner: Pt[] = [
        [8.4, 5.2],
        [14.6, 5.0],
        [18.4, 8.0],
        [18.6, 14.0],
        [15.0, 18.6],
        [8.8, 18.8],
        [5.4, 14.8],
        [5.6, 8.6],
      ];
      return (
        <>
          <polygon points={pts(outer)} fill="#89929e" stroke="#262626" strokeWidth="1.05" strokeLinejoin="round" />
          <polygon
            points={pts([outer[2], outer[3], outer[4], outer[5], inner[5], inner[4], inner[3], inner[2]])}
            fill="#5a616b"
            stroke="none"
          />
          <polygon points={pts(inner)} fill="#eef2f7" stroke="#c0c7d1" strokeWidth="0.7" strokeLinejoin="round" />
          <polygon points={pts(outer)} fill="none" stroke="#262626" strokeWidth="1.05" strokeLinejoin="round" />
          <g transform="translate(12 12) rotate(22) scale(0.68 0.68)">
            <path
              d="M0,4.6 C-3.3,2.5 -3.6,-3.4 0,-8.8 C3.6,-3.4 3.3,2.5 0,4.6 Z"
              fill="none"
              stroke="#3672c4"
              strokeWidth="1.45"
              strokeLinejoin="round"
            />
            <path
              d="M0,7.8 L0,-7.6 M0,-3.4 L-2.0,-4.8 M0,-0.4 L-2.2,-1.8 M0,2.4 L-1.8,1.2 M0,-3.4 L2.0,-4.8 M0,-0.4 L2.2,-1.8 M0,2.4 L1.8,1.2"
              fill="none"
              stroke="#3672c4"
              strokeWidth="1.05"
              strokeLinecap="round"
            />
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.feathershapeorg',
    label: 'Feather Shape Organize',
    family: 'sop',
    description:
      'Three differently proportioned feathers fanned out from the bottom-left: tall narrow green on the left, medium blue in front, and wide yellow low-right.',
    types: ['feathershapeorg', 'feathertemplateinterpolate'],
    icons: ['sop_feathershapeorg', 'sop_feathertemplateinterpolate'],
    refKey: 'SOP_feathershapeorg',
    render: () => (
      <>
        <FeatherVane
          transform="translate(13.8 16.2) rotate(72) scale(0.92 0.78)"
          tones={FEATHER_TONES.yellow}
          showBarbs={false}
        />
        <FeatherVane
          transform="translate(6.6 11.4) rotate(-8) scale(0.68 0.94)"
          tones={FEATHER_TONES.green}
          showBarbs={false}
        />
        <FeatherVane
          transform="translate(12.2 12.6) rotate(28) scale(0.88 0.9)"
          tones={FEATHER_TONES.blue}
          showBarbs={false}
        />
      </>
    ),
  },
  {
    id: 'sop.feathertemplatefromshape',
    label: 'Feather Template from Shape',
    family: 'sop',
    description:
      'Diagonal purple feather centered inside a cased green dashed contour oval, with a tilted grey-and-white stylus on the lower-right.',
    types: ['feathertemplatefromshape'],
    icons: ['sop_feathertemplatefromshape'],
    refKey: 'SOP_feathertemplatefromshape',
    render: () => (
      <>
        <g transform="translate(10.5 11.5) rotate(30)" fill="none" strokeDasharray="2.4 2.0" strokeLinecap="round">
          <ellipse cx="0" cy="0" rx="5.4" ry="10.2" stroke="#262626" strokeWidth="1.75" />
          <ellipse cx="0" cy="0" rx="5.4" ry="10.2" stroke="#52d638" strokeWidth="0.95" />
        </g>
        <FeatherVane transform="translate(10.5 11.5) rotate(30) scale(0.74 0.8)" showBarbs={false} />
        <g transform="translate(18.5 15.2) rotate(42)">
          <rect x="-1.2" y="-3.8" width="2.4" height="6.0" rx="0.6" fill="#eef2f7" stroke="#262626" strokeWidth="0.9" />
          <polygon
            points="-1.05,2.2 1.05,2.2 0,4.3"
            fill="#3a3f47"
            stroke="#262626"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.feathervisualize',
    label: 'Feather Visualize',
    family: 'sop',
    description:
      'Diagonal purple feather split horizontally by a cased green dashed line into a smooth purple upper half and pixelated mosaic blocks below.',
    types: ['feathervisualize'],
    icons: ['sop_feathervisualize'],
    refKey: 'SOP_feathervisualize',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-top`}>
            <rect x="0" y="0" width="24" height="12.2" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-top)`}>
          <FeatherVane transform="translate(12 11.6) rotate(30)" />
        </g>
        {[
          [8.6, 12.6, '#edd6fc'],
          [10.5, 12.6, '#bd7be8'],
          [12.4, 12.6, '#8642b8'],
          [7.5, 14.5, '#edd6fc'],
          [9.4, 14.5, '#ffffff'],
          [11.3, 14.5, '#bd7be8'],
          [7.0, 16.4, '#bd7be8'],
          [8.9, 16.4, '#8642b8'],
          [6.0, 18.3, '#ffffff'],
        ].map(([x, y, fill], idx) => (
          <rect
            key={idx}
            x={x}
            y={y}
            width="1.9"
            height="1.9"
            fill={fill as string}
            stroke="#262626"
            strokeWidth="0.65"
          />
        ))}
        <g fill="none" strokeLinecap="round" strokeDasharray="2.2 1.8">
          <path d="M3.2,12.2 L20.8,12.2" stroke="#262626" strokeWidth="1.95" />
          <path d="M3.2,12.2 L20.8,12.2" stroke="#52d638" strokeWidth="1.0" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.featherwidth',
    label: 'Feather Width',
    family: 'sop',
    description: 'Upright purple feather with a bold cased red caliper measurement bracket across its middle.',
    types: ['featherwidth'],
    icons: ['sop_featherwidth'],
    refKey: 'SOP_featherwidth',
    render: () => (
      <>
        <FeatherVane transform="translate(12 12) rotate(8) scale(1.06 1.04)" />
        <CasedStroke d="M6.2,9.0 L6.2,15.0 M17.8,9.0 L17.8,15.0" color="#ff7066" width={1.45} casing={2.5} />
        <g fill="none" strokeLinecap="round" strokeDasharray="1.8 1.5">
          <path d="M7.0,12.0 L17.0,12.0" stroke="#262626" strokeWidth="2.2" />
          <path d="M7.0,12.0 L17.0,12.0" stroke="#ff7066" strokeWidth="1.2" />
        </g>
      </>
    ),
  },
];
