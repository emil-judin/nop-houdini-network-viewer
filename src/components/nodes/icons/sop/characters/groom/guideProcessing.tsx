import { isoBoxFaces, type Pt, pts, quadGridPath } from '../../../geoHelpers';
import type { OperatorIconDef } from '../../../iconTypes';
import { BlueScalpPatch, CurvedScalpSheet, GuideStrand, RoundHeadCap } from '../../kits/groom';

/**
 * Guide grouping, masking, reducing and surface operators.
 */
export const GUIDE_PROCESSING_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.guidefindstrays',
    label: 'Guide Find Strays',
    family: 'sop',
    description: 'Blue isometric scalp patch with three red stray guide strands sticking out at wide angles.',
    types: ['guidefindstrays'],
    icons: ['sop_guidefindstrays'],
    refKey: 'SOP_guidefindstrays',
    render: () => (
      <>
        <BlueScalpPatch />
        <GuideStrand d="M7.6,12.8 C5.8,9.8 4.4,7.2 3.4,4.8" color="#ff7066" width={1.4} />
        <GuideStrand d="M11.6,12.0 C12.0,8.2 13.0,5.4 14.6,3.4" color="#ff7066" width={1.4} />
        <GuideStrand d="M16.2,13.6 C17.6,10.6 19.2,8.4 20.8,6.8" color="#ff7066" width={1.4} />
      </>
    ),
  },
  {
    id: 'sop.guidegroup',
    label: 'Guide Group',
    family: 'sop',
    description:
      'Round grey head with a blue hair cap on top and right, a red left hair section, and a yellow part line.',
    types: ['guidegroup'],
    icons: ['sop_guidegroup'],
    refKey: 'SOP_guidegroup',
    render: (uid) => <RoundHeadCap uid={uid} capColor="#3672c4" leftColor="#e03228" partColor="#f2c438" />,
  },
  {
    id: 'sop.guideinterpolationmesh',
    label: 'Guide Interpolation Mesh',
    family: 'sop',
    description:
      'Curved dark mesh sheet covered edge to edge with a regular bright green grid and upright yellow guide hairs.',
    types: ['guideinterpolationmesh'],
    icons: ['sop_guideinterpolationmesh'],
    refKey: 'SOP_guideinterpolationmesh',
    render: () => (
      <>
        {/* Curved dark mesh sheet */}
        <path
          d="M2.8,20.8 Q12,17.4 21.2,20.8 L18.6,14.2 Q12,11.8 5.4,14.2 Z"
          fill="#3a3f47"
          stroke="#eef2f7"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Regular bright green grid covering the full sheet */}
        <path
          d="M3.7,18.6 Q12,15.6 20.3,18.6 M4.6,16.4 Q12,13.6 19.4,16.4 M7.8,13.4 L6.0,19.8 M10.6,13.0 L9.8,19.2 M13.4,13.0 L14.2,19.2 M16.2,13.4 L18.0,19.8"
          fill="none"
          stroke="#58c848"
          strokeWidth="0.85"
          strokeLinecap="round"
        />
        <path
          d="M2.8,20.8 Q12,17.4 21.2,20.8 L18.6,14.2 Q12,11.8 5.4,14.2 Z"
          fill="none"
          stroke="#262626"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <GuideStrand d="M7.2,15.8 C6.8,12.4 7.4,9.0 8.6,6.0" color="#ffe47a" width={1.3} />
        <GuideStrand d="M10.0,15.2 C9.6,11.6 10.2,8.0 11.4,5.0" color="#ffe47a" width={1.3} />
        <GuideStrand d="M13.0,15.2 C12.8,11.6 13.4,8.0 14.6,5.0" color="#ffe47a" width={1.3} />
        <GuideStrand d="M16.0,15.8 C15.8,12.4 16.4,9.2 17.6,6.4" color="#ffe47a" width={1.3} />
      </>
    ),
  },
  {
    id: 'sop.guidemask',
    label: 'Guide Mask',
    family: 'sop',
    description:
      'White curved scalp sheet with yellow outer guide hairs and a red dashed oval mask enclosing orange-red inner hairs.',
    types: ['guidemask'],
    icons: ['sop_guidemask'],
    refKey: 'SOP_guidemask',
    render: () => (
      <>
        <CurvedScalpSheet />
        {/* Red dashed mask oval */}
        <ellipse
          cx="12.0"
          cy="16.4"
          rx="4.2"
          ry="1.8"
          fill="none"
          stroke="#e03228"
          strokeWidth="0.95"
          strokeDasharray="1.6 1.2"
        />
        <GuideStrand d="M6.6,16.4 C6.0,13.4 6.6,10.2 7.8,7.4" color="#f2c438" width={1.2} />
        <GuideStrand d="M9.8,15.8 C9.4,12.4 10.0,9.2 11.2,6.4" color="#ee8624" width={1.2} />
        <GuideStrand d="M12.4,15.6 C12.0,12.0 12.6,8.4 13.8,5.6" color="#e03228" width={1.2} />
        <GuideStrand d="M14.8,16.0 C14.6,12.8 15.2,9.8 16.2,7.4" color="#ee8624" width={1.2} />
        <GuideStrand d="M17.4,16.6 C17.2,13.8 17.8,11.2 18.8,8.8" color="#f2c438" width={1.2} />
      </>
    ),
  },
  {
    id: 'sop.guidepartition',
    label: 'Guide Partition',
    family: 'sop',
    description: 'Round grey head with a dark charcoal hair cap parted by a red curve on the left.',
    types: ['guidepartition'],
    icons: ['sop_guidepartition'],
    refKey: 'SOP_guidepartition',
    render: (uid) => <RoundHeadCap uid={uid} capColor="#3a3f47" leftColor="#262626" partColor="#e03228" />,
  },
  {
    id: 'sop.guidereduce',
    label: 'Guide Reduce',
    family: 'sop',
    description:
      'Blue isometric scalp patch with alternating bright yellow and muted olive-gold guide strands rising out.',
    types: ['guidereduce'],
    icons: ['sop_guidereduce'],
    refKey: 'SOP_guidereduce',
    render: () => (
      <>
        <BlueScalpPatch />
        <GuideStrand d="M8.0,12.6 C8.6,9.0 9.8,6.2 11.4,4.0" color="#f2c438" width={1.25} />
        <GuideStrand d="M10.8,13.6 C11.4,10.0 12.6,7.0 14.2,4.8" color="#a8783c" width={1.2} />
        <GuideStrand d="M13.6,13.8 C14.2,10.0 15.4,7.0 17.0,4.6" color="#f2c438" width={1.25} />
        <GuideStrand d="M16.4,13.2 C17.0,10.2 18.0,7.8 19.4,5.8" color="#a8783c" width={1.2} />
      </>
    ),
  },
  {
    id: 'sop.guideskinattriblookup',
    label: 'Guide Skin Attribute Lookup',
    family: 'sop',
    description:
      'White curved scalp sheet with upright yellow guide hairs and a white speech-bubble callout at top-right.',
    types: ['guideskinattriblookup'],
    icons: ['sop_guideskinattriblookup'],
    refKey: 'SOP_guideskinattriblookup',
    render: () => (
      <>
        <CurvedScalpSheet />
        <GuideStrand d="M7.0,16.2 C6.4,13.4 7.0,10.8 8.2,8.8" color="#f2c438" width={1.2} />
        <GuideStrand d="M9.8,15.6 C9.4,12.8 10.0,10.2 11.2,8.2" color="#f2c438" width={1.2} />
        <GuideStrand d="M12.6,15.6 C12.2,12.8 12.8,10.2 14.0,8.4" color="#f2c438" width={1.2} />
        <GuideStrand d="M15.4,16.0 C15.2,13.4 15.8,11.0 16.8,9.4" color="#f2c438" width={1.2} />
        {/* White speech-bubble callout raised higher */}
        <path
          d="M12.2,2.6 H20.8 V8.2 H15.2 L12.6,11.2 L13.4,8.2 H12.2 Z"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.guidesurface',
    label: 'Guide Surface',
    family: 'sop',
    description:
      'Isometric grey slab with four curved red guide strands rising to support a tilted orange 2x2 grid surface.',
    types: ['guidesurface'],
    icons: ['sop_guidesurface'],
    refKey: 'SOP_guidesurface',
    render: () => {
      const slab = isoBoxFaces(11.0, 11.6, 7.6, 1.8);
      const quad: readonly [Pt, Pt, Pt, Pt] = [
        [13.0, 3.0],
        [20.4, 5.2],
        [15.8, 9.2],
        [8.4, 7.0],
      ];
      return (
        <>
          <polygon points={pts(slab.left)} fill="#eef2f7" stroke="#262626" strokeWidth="1.0" strokeLinejoin="round" />
          <polygon points={pts(slab.right)} fill="#c0c7d1" stroke="#262626" strokeWidth="1.0" strokeLinejoin="round" />
          <polygon points={pts(slab.top)} fill="#eef2f7" stroke="#262626" strokeWidth="1.0" strokeLinejoin="round" />
          <GuideStrand d="M6.8,14.4 C7.4,11.2 9.0,8.6 10.6,7.0" color="#e03228" width={1.2} />
          <GuideStrand d="M9.6,15.8 C10.4,12.4 12.0,9.6 13.8,7.8" color="#e03228" width={1.2} />
          <GuideStrand d="M12.4,16.2 C13.2,12.6 15.0,9.8 16.8,8.0" color="#e03228" width={1.2} />
          <GuideStrand d="M15.2,14.8 C16.0,11.6 17.6,8.8 19.4,6.6" color="#e03228" width={1.2} />
          {/* Tilted orange 2x2 grid surface shifted right */}
          <polygon points={pts(quad)} fill="#ffb066" stroke="#262626" strokeWidth="1.0" strokeLinejoin="round" />
          <path d={quadGridPath(quad, 2, 2)} fill="none" stroke="#ffffff" strokeWidth="0.9" />
          <polygon points={pts(quad)} fill="none" stroke="#262626" strokeWidth="1.0" strokeLinejoin="round" />
        </>
      );
    },
  },
];
