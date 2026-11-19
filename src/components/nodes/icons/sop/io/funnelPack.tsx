import React from 'react';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

const BLUE = '#5aa2f2';

const CORAL = '#ff7066';

const ORANGE = '#ee8624';

interface StrandSpec {
  d: string;
  color: string;
}

/**
 * Shared pack funnel matching `sop.packgroom`: cased strands converging into a grey metal funnel
 * and exiting as a single strand from the bottom spout.
 */
const FunnelPackIcon: React.FC<{
  strands: readonly StrandSpec[];
  bottomColor: string;
  strokeWidth?: number;
  casingWidth?: number;
}> = ({ strands, bottomColor, strokeWidth = 1.2, casingWidth = 2.0 }) => (
  <>
    <ellipse
      cx="12"
      cy="8.5"
      rx="6.5"
      ry="2.2"
      fill="#89929e"
      stroke="#262626"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
    {strands.map((strand, index) => (
      <CasedStroke key={index} d={strand.d} color={strand.color} width={strokeWidth} casing={casingWidth} />
    ))}
    <CasedStroke d="M12,18 V21.5" color={bottomColor} width={strokeWidth} casing={casingWidth} />
    <polygon
      points="5.5,8.5 10.5,14.5 10.5,18.5 13.5,18.5 13.5,14.5 18.5,8.5"
      fill="#c0c7d1"
      stroke="#262626"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </>
);

/**
 * Shared unpack funnel matching `sop.unpackgroom`: single cased strand entering the top spout of
 * an inverted grey metal funnel and fanning out as multiple cased strands from the bottom mouth.
 */
const FunnelUnpackIcon: React.FC<{
  topColor: string;
  strands: readonly StrandSpec[];
  strokeWidth?: number;
  casingWidth?: number;
}> = ({ topColor, strands, strokeWidth = 1.2, casingWidth = 2.0 }) => (
  <>
    <CasedStroke d="M12,2.5 V6" color={topColor} width={strokeWidth} casing={casingWidth} />
    <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
      <polygon points="10.5,5.5 13.5,5.5 13.5,9.5 18.5,15.5 5.5,15.5 10.5,9.5" fill="#c0c7d1" />
      <ellipse cx="12" cy="15.5" rx="6.5" ry="2.2" fill="#89929e" />
    </g>
    {strands.map((strand, index) => (
      <CasedStroke key={index} d={strand.d} color={strand.color} width={strokeWidth} casing={casingWidth} />
    ))}
  </>
);

/**
 * Pack and unpack operators of the simulation and character tools: the funnel and the shower head.
 */
export const FUNNEL_PACK_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.vellumpack',
    label: 'Vellum Pack',
    family: 'sop',
    description:
      'Two curved strands (blue left, coral right) entering the dark grey mouth of a light grey funnel and exiting as one blue strand.',
    types: ['vellumpack'],
    icons: ['sop_vellumpack'],
    refKey: 'SOP_vellumpack',
    render: () => (
      <FunnelPackIcon
        strands={[
          { d: 'M6.5,2.5 Q8.5,5.5 10,9', color: BLUE },
          { d: 'M17.5,2.5 Q15.5,5.5 14,9', color: CORAL },
        ]}
        bottomColor={BLUE}
      />
    ),
  },
  {
    id: 'sop.vellumunpack',
    label: 'Vellum Unpack',
    family: 'sop',
    description:
      'Inverted grey metal funnel splitting a blue strand from the top spout into a blue strand on the left and a coral strand on the right.',
    types: ['vellumunpack'],
    icons: ['sop_vellumunpack'],
    refKey: 'SOP_vellumunpack',
    render: () => (
      <FunnelUnpackIcon
        topColor={BLUE}
        strands={[
          { d: 'M10,15.5 Q8.5,18.5 6.5,21.5', color: BLUE },
          { d: 'M14,15.5 Q15.5,18.5 17.5,21.5', color: CORAL },
        ]}
      />
    ),
  },
  {
    id: 'sop.rbdpack',
    label: 'RBD Pack',
    family: 'sop',
    description:
      'Three strands (blue, coral, blue) dipping into the dark grey mouth of a light grey funnel and exiting as one blue strand.',
    types: ['rbdpack'],
    icons: ['sop_rbdpack'],
    refKey: 'SOP_rbdpack',
    render: () => (
      <FunnelPackIcon
        strands={[
          { d: 'M5.5,2.5 Q8,5.5 9.5,9', color: BLUE },
          { d: 'M12,2.5 V9', color: CORAL },
          { d: 'M18.5,2.5 Q16,5.5 14.5,9', color: BLUE },
        ]}
        bottomColor={BLUE}
      />
    ),
  },
  {
    id: 'sop.rbdunpack',
    label: 'RBD Unpack',
    family: 'sop',
    description:
      'Inverted grey metal funnel splitting a blue strand from the top spout into three strands (blue, coral, blue) at the bottom.',
    types: ['rbdunpack'],
    icons: ['sop_rbdunpack'],
    refKey: 'SOP_rbdunpack',
    render: () => (
      <FunnelUnpackIcon
        topColor={BLUE}
        strands={[
          { d: 'M9.5,15.5 Q8,18.5 5.5,21.5', color: BLUE },
          { d: 'M12,15.5 V21.5', color: CORAL },
          { d: 'M14.5,15.5 Q16,18.5 18.5,21.5', color: BLUE },
        ]}
      />
    ),
  },
  {
    id: 'sop.kinefx.characterpack',
    label: 'Character Pack',
    family: 'sop',
    description:
      'Four curved orange strands entering the dark grey mouth of a light grey funnel and exiting as one orange strand.',
    types: ['characterpack'],
    icons: ['sop_kinefx-characterpack'],
    refKey: 'SOP_kinefx-characterpack',
    render: () => (
      <FunnelPackIcon
        strands={[
          { d: 'M5.5,2.5 Q7.5,5.5 9,9', color: ORANGE },
          { d: 'M9.5,2.5 Q10.2,5.5 11,9', color: ORANGE },
          { d: 'M14.5,2.5 Q13.8,5.5 13,9', color: ORANGE },
          { d: 'M18.5,2.5 Q16.5,5.5 15,9', color: ORANGE },
        ]}
        bottomColor={ORANGE}
        strokeWidth={1.1}
        casingWidth={1.9}
      />
    ),
  },
  {
    id: 'sop.kinefx.characterunpack',
    label: 'Character Unpack',
    family: 'sop',
    description:
      'Inverted grey metal funnel splitting a single orange strand from the top spout into four orange strands fanning out the bottom.',
    types: ['characterunpack'],
    icons: ['sop_kinefx-characterunpack'],
    refKey: 'SOP_kinefx-characterunpack',
    render: () => (
      <FunnelUnpackIcon
        topColor={ORANGE}
        strands={[
          { d: 'M9,15.5 Q7.5,18.5 5.5,21.5', color: ORANGE },
          { d: 'M11,15.5 Q10.2,18.5 9.5,21.5', color: ORANGE },
          { d: 'M13,15.5 Q13.8,18.5 14.5,21.5', color: ORANGE },
          { d: 'M15,15.5 Q16.5,18.5 18.5,21.5', color: ORANGE },
        ]}
        strokeWidth={1.1}
        casingWidth={1.9}
      />
    ),
  },
  {
    id: 'sop.packgroom',
    label: 'Groom Pack',
    family: 'sop',
    description:
      'Grey metal funnel gathering four blue hair strands into its dark opening and out the bottom spout as a single packed strand.',
    types: ['packgroom'],
    icons: ['sop_packgroom'],
    refKey: 'SOP_packgroom',
    render: () => (
      <>
        <ellipse
          cx="12"
          cy="8.5"
          rx="6.5"
          ry="2.2"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M6.5,3 L9.5,9 M10,3 L11,9 M14,3 L13,9 M17.5,3 L14.5,9 M12,17 V21.5"
          fill="none"
          stroke="#3672c4"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <polygon
          points="5.5,8.5 10.5,14.5 10.5,18.5 13.5,18.5 13.5,14.5 18.5,8.5"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.unpackgroom',
    label: 'Groom Unpack',
    family: 'sop',
    description:
      'Inverted grey metal funnel splitting a single blue strand from the top spout into four strands fanning out the bottom.',
    types: ['unpackgroom'],
    icons: ['sop_unpackgroom'],
    refKey: 'SOP_unpackgroom',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="10.5,5.5 13.5,5.5 13.5,9.5 18.5,15.5 5.5,15.5 10.5,9.5" fill="#c0c7d1" />
          <ellipse cx="12" cy="15.5" rx="6.5" ry="2.2" fill="#89929e" />
        </g>
        <path
          d="M12,2.5 V5.5 M9.5,15.5 L6.5,21 M11.2,15.5 L10,21 M12.8,15.5 L14,21 M14.5,15.5 L17.5,21"
          fill="none"
          stroke="#3672c4"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
];
