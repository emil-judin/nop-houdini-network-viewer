import React from 'react';
import type { OperatorIconDef } from '../../../iconTypes';
import { isoBoxFaces, pts, roundedRectPath, type Pt } from '../../../geoHelpers';
import { CasedStroke, CornerBadge, ShadedSphere } from '../../../geoKits';

/**
 * Batch 3 pilot, family "Attribute Adjust" (drawn with the family-first icon workflow, see
 * `docs/ICON_ART_BIBLE.md` section 9). The four typed variants share `DicePair` and a dark
 * `CornerBadge`; Array and Color are one-offs of the same family.
 */

/** Pip positions on a unit die face for 1 to 6 eyes. */
const PIPS: Record<number, Pt[]> = {
  1: [[0.5, 0.5]],
  2: [
    [0.27, 0.27],
    [0.73, 0.73],
  ],
  3: [
    [0.25, 0.25],
    [0.5, 0.5],
    [0.75, 0.75],
  ],
  4: [
    [0.27, 0.27],
    [0.73, 0.27],
    [0.27, 0.73],
    [0.73, 0.73],
  ],
  5: [
    [0.25, 0.25],
    [0.75, 0.25],
    [0.5, 0.5],
    [0.25, 0.75],
    [0.75, 0.75],
  ],
};

/**
 * White isometric die (top vertex `(x, y)`, half width `w`, height `h`) with black pips: `eyes`
 * gives the pip count on the top, left and right faces.
 */
const Die: React.FC<{ x: number; y: number; w: number; h: number; eyes: [number, number, number] }> = ({
  x,
  y,
  w,
  h,
  eyes,
}) => {
  const f = isoBoxFaces(x, y, w, h);
  // Unit square to face mappings (s along the face, t across or down).
  const maps = [
    `matrix(${w} ${-w / 2} ${w} ${w / 2} ${x - w} ${y + w / 2})`,
    `matrix(${w} ${w / 2} 0 ${h} ${x - w} ${y + w / 2})`,
    `matrix(${w} ${-w / 2} 0 ${h} ${x} ${y + w})`,
  ];
  return (
    <g strokeLinejoin="round">
      <polygon points={pts(f.left)} fill="#eef2f7" stroke="#262626" strokeWidth="1" />
      <polygon points={pts(f.right)} fill="#c0c7d1" stroke="#262626" strokeWidth="1" />
      <polygon points={pts(f.top)} fill="#ffffff" stroke="#262626" strokeWidth="1" />
      {maps.map((m, i) => (
        <g key={m} transform={m} fill="#262626">
          {PIPS[eyes[i]].map(([u, v]) => (
            <circle key={`${u}-${v}`} cx={u} cy={v} r="0.13" />
          ))}
        </g>
      ))}
    </g>
  );
};

/** Two white dice: a smaller one at the back right and a larger one in front at the left. */
const DicePair: React.FC = () => (
  <>
    <Die x={15.8} y={2.3} w={5} h={5.4} eyes={[1, 2, 2]} />
    <Die x={8.6} y={6.8} w={6} h={6.6} eyes={[2, 3, 1]} />
  </>
);

/** Badge-space text for the typed variants (light, bold, centered on the 10 by 10 badge). */
const BadgeText: React.FC<{ text: string; color: string; size?: number }> = ({ text, color, size = 9 }) => (
  <text x="5" y={5 + size * 0.36} textAnchor="middle" fontFamily="sans-serif" fontWeight="700" fontSize={size} fill={color}>
    {text}
  </text>
);

/** Batch 3 pilot: Attribute Adjust family. */
export const FAMILY_ATTRIB_ADJUST: OperatorIconDef[] = [
  {
    id: 'sop.attribadjustarray',
    label: 'Attribute Adjust Array',
    family: 'sop',
    description:
      'White speech-bubble panel with four outlined array slots and an upright red-edged square at its upper right corner; its tail points down to a glossy white dial ball with a dark socket at the lower left.',
    types: ['attribadjustarray'],
    icons: ['sop_attribadjustarray'],
    refKey: 'SOP_attribadjustarray',
    render: (uid) => (
      <>
        <polygon points="4.8,11.2 9.8,11.2 6.4,15.2" fill="#f2f4f7" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <path d={roundedRectPath(2.2, 3.2, 18, 8.4, 1.4)} fill="#f2f4f7" stroke="#262626" strokeWidth="1.1" />
        <path d="M5.3,11 L9.3,11" stroke="#f2f4f7" strokeWidth="1.2" />
        <g fill="#ffffff" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          {[3.4, 7.6, 11.8, 16].map((x) => (
            <rect key={x} x={x} y="5.6" width="3" height="3.4" />
          ))}
        </g>
        <g>
          <rect x="17.2" y="2.6" width="3.6" height="3.6" fill="#ffffff" stroke="#262626" strokeWidth="2" strokeLinejoin="round" />
          <rect x="17.2" y="2.6" width="3.6" height="3.6" fill="#ffffff" stroke="#e03228" strokeWidth="1" strokeLinejoin="round" />
        </g>
        <ShadedSphere id={`${uid}-aaa-dial`} cx={6} cy={17.8} r={3.7} strokeWidth={1.1} />
        <circle cx="7.3" cy="16.6" r="1.3" fill="#3a3f47" stroke="#262626" strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'sop.attribadjustcolor',
    label: 'Attribute Adjust Color',
    family: 'sop',
    description:
      'Tilted color wheel disc with eight rainbow wedges (yellow at the top, red at the right where the dropper dips, blue at the bottom) and a blue rim, with an eyedropper (dark bulb, light glass tube, red tip) dipping into its center from the upper right.',
    types: ['attribadjustcolor'],
    icons: ['sop_attribadjustcolor'],
    refKey: 'SOP_attribadjustcolor',
    render: (uid) => {
      const colors = ['#e03228', '#c084d8', '#8a56c4', '#3672c4', '#14a5b4', '#58c848', '#f2c438', '#ee8624'];
      const wedge = (i: number) => {
        const a0 = (i / 8) * Math.PI * 2;
        const a1 = ((i + 1) / 8) * Math.PI * 2;
        return `M0,0 L${pts([[Math.cos(a0), Math.sin(a0)]])} A1,1 0 0,1 ${pts([[Math.cos(a1), Math.sin(a1)]])} Z`;
      };
      const disc = 'translate(10.2 13.4) rotate(-28) scale(8.2 7)';
      return (
        <>
          <defs>
            <clipPath id={`${uid}-aac-disc`}>
              <ellipse cx="0" cy="0" rx="1" ry="1" transform={disc} />
            </clipPath>
          </defs>
          <ellipse cx="11" cy="14.4" rx="8.2" ry="7" transform="rotate(-28 11 14.4)" fill="#2e74c4" stroke="#262626" strokeWidth="1.1" />
          <g clipPath={`url(#${uid}-aac-disc)`}>
            <g transform={disc}>
              {colors.map((c, i) => (
                <path key={c} d={wedge(i)} fill={c} />
              ))}
            </g>
          </g>
          <ellipse cx="10.2" cy="13.4" rx="8.2" ry="7" transform="rotate(-28 10.2 13.4)" fill="none" stroke="#262626" strokeWidth="1.1" />
          <circle cx="10.2" cy="13.4" r="0.9" fill="#ffffff" stroke="#262626" strokeWidth="0.6" />
          {/* Eyedropper */}
          <CasedStroke d="M18.2,6 L11.4,12.4" color="#eef2f7" width={1.5} casing={2.8} />
          <CasedStroke d="M12.6,11.3 L11.2,12.6" color="#e03228" width={1.5} casing={2.8} />
          <CasedStroke d="M18.4,5.6 L20.2,3.8" color="#5a616b" width={2.6} casing={3.8} />
          <path d="M17.2,5.1 L19.1,7.1" stroke="#262626" strokeWidth="1.3" strokeLinecap="round" />
        </>
      );
    },
  },
  {
    id: 'sop.attribadjustdict',
    label: 'Attribute Adjust Dictionary',
    family: 'sop',
    description: 'Two white isometric dice with black pips behind a blue open book with white lined pages across the bottom.',
    types: ['attribadjustdict'],
    icons: ['sop_attribadjustdict'],
    refKey: 'SOP_attribadjustdict',
    render: () => (
      <>
        <DicePair />
        <g strokeLinejoin="round">
          <path d="M2.2,13.8 L12,16.6 L21.8,13.8 L21.4,19 L12,21.6 L2.6,19 Z" fill="#3672c4" stroke="#262626" strokeWidth="1.1" />
          <path d="M12,15.6 Q7.6,12.6 3,13.2 L3.4,18 Q7.8,17.6 12,20 Z" fill="#ffffff" stroke="#262626" strokeWidth="0.85" />
          <path d="M12,15.6 Q16.4,12.6 21,13.2 L20.6,18 Q16.2,17.6 12,20 Z" fill="#eef2f7" stroke="#262626" strokeWidth="0.85" />
          <path
            d="M4.6,14.8 Q7.6,14.6 10.4,16.4 M4.8,16.4 Q7.6,16.2 10.4,18 M13.6,16.4 Q16.4,14.6 19.4,14.8 M13.6,18 Q16.4,16.2 19.2,16.4"
            fill="none"
            stroke="#3672c4"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.attribadjustfloat',
    label: 'Attribute Adjust Float',
    family: 'sop',
    description: 'Two white isometric dice with black pips and a dark rounded tile at the lower right showing a light blue ".2".',
    types: ['attribadjustfloat'],
    icons: ['sop_attribadjustfloat'],
    refKey: 'SOP_attribadjustfloat',
    render: () => (
      <>
        <DicePair />
        <CornerBadge>
          <BadgeText text=".2" color="#c4dcff" />
        </CornerBadge>
      </>
    ),
  },
  {
    id: 'sop.attribadjustinteger',
    label: 'Attribute Adjust Integer',
    family: 'sop',
    description: 'Two white isometric dice with black pips and a dark rounded tile at the lower right showing a green "10".',
    types: ['attribadjustinteger'],
    icons: ['sop_attribadjustinteger'],
    refKey: 'SOP_attribadjustinteger',
    render: () => (
      <>
        <DicePair />
        <CornerBadge>
          <BadgeText text="10" color="#58c848" size={7.6} />
        </CornerBadge>
      </>
    ),
  },
  {
    id: 'sop.attribadjustvector',
    label: 'Attribute Adjust Vector',
    family: 'sop',
    description: 'Two white isometric dice with black pips and a dark rounded tile at the lower right holding three light blue vector slots.',
    types: ['attribadjustvector'],
    icons: ['sop_attribadjustvector'],
    refKey: 'SOP_attribadjustvector',
    render: () => (
      <>
        <DicePair />
        <CornerBadge>
          <g fill="#8fc2ff">
            <rect x="1.2" y="3.6" width="2.2" height="2.8" />
            <rect x="3.9" y="3.6" width="2.2" height="2.8" />
            <rect x="6.6" y="3.6" width="2.2" height="2.8" />
          </g>
        </CornerBadge>
      </>
    ),
  },
];
