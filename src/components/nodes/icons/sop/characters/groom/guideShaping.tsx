import { CasedStroke, ShadedSphere, SPHERE_TONES } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import { BlueScalpPatch, CurvedScalpSheet, FurDiamondPatch, GuideStrand } from '../../kits/groom';

/**
 * Guide creation and shaping operators.
 */
export const GUIDE_SHAPING_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.guideinit',
    label: 'Guide Initialize',
    family: 'sop',
    description: 'White curved scalp sheet with upright yellow guide hairs and a sweeping light-blue arrow above.',
    types: ['guideinit'],
    icons: ['sop_guideinit'],
    refKey: 'SOP_guideinit',
    render: () => (
      <>
        <CurvedScalpSheet />
        <GuideStrand d="M7.0,16.0 C6.4,13.6 7.0,11.0 8.2,9.2" color="#f2c438" width={1.2} />
        <GuideStrand d="M9.6,15.6 C9.4,13.0 10.0,10.6 11.2,8.8" color="#f2c438" width={1.2} />
        <GuideStrand d="M12.2,15.4 C12.0,12.8 12.6,10.2 13.8,8.6" color="#f2c438" width={1.2} />
        <GuideStrand d="M14.8,15.6 C14.6,13.2 15.2,10.8 16.4,9.2" color="#f2c438" width={1.2} />
        <GuideStrand d="M17.2,16.2 C17.0,14.0 17.6,11.8 18.6,10.4" color="#f2c438" width={1.2} />
        {/* Sweeping light-blue initialization arrow */}
        <path
          d="M4.0,7.2 Q10.0,4.2 15.8,5.8 L15.4,3.8 L20.6,6.8 L15.8,10.2 L16.0,8.2 Q10.2,6.8 4.4,9.4 Z"
          fill="#8fc2ff"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.guidegroom',
    label: 'Guide Groom',
    family: 'sop',
    description:
      'Open silver-grey grooming scissors tilted diagonally with blades pointing bottom-left and finger rings on the right.',
    types: ['guidegroom'],
    icons: ['sop_guidegroom'],
    refKey: 'SOP_guidegroom',
    render: () => (
      <>
        {/* Blade 1 (bottom-left to center pivot, handle arm up-right) */}
        <path
          d="M3.0,17.2 L12.4,11.6 L13.4,13.4 L4.6,18.6 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Blade 2 (lower-left to center pivot, handle arm right) */}
        <path
          d="M5.6,20.8 L11.4,11.6 L13.2,12.8 L7.4,21.0 Z"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Handle arms */}
        <path d="M12.6,11.8 L15.0,7.2" fill="none" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M12.6,11.8 L15.0,7.2" fill="none" stroke="#eef2f7" strokeWidth="1.0" strokeLinecap="round" />
        <path d="M13.0,13.0 L16.8,13.4" fill="none" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M13.0,13.0 L16.8,13.4" fill="none" stroke="#c0c7d1" strokeWidth="1.0" strokeLinecap="round" />
        {/* Finger rings */}
        <circle cx="15.8" cy="5.2" r="2.1" fill="none" stroke="#262626" strokeWidth="2.2" />
        <circle cx="15.8" cy="5.2" r="2.1" fill="none" stroke="#eef2f7" strokeWidth="1.0" />
        <circle cx="18.8" cy="13.6" r="2.1" fill="none" stroke="#262626" strokeWidth="2.2" />
        <circle cx="18.8" cy="13.6" r="2.1" fill="none" stroke="#c0c7d1" strokeWidth="1.0" />
        {/* Pivot screw */}
        <circle cx="12.2" cy="12.6" r="1.2" fill="#5a616b" stroke="#262626" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.guidedraw',
    label: 'Guide Draw',
    family: 'sop',
    description: 'Warm brown diamond fur patch with a blue stylus pen drawing a red-and-white curved stroke.',
    types: ['guidedraw'],
    icons: ['sop_guidedraw'],
    refKey: 'SOP_guidedraw',
    render: () => (
      <>
        <FurDiamondPatch>
          <CasedStroke
            d="M10.4,17.2 C8.2,16.4 9.0,14.0 11.4,13.8 C13.2,13.6 13.6,12.2 13.8,11.2"
            color="#e03228"
            width={1.4}
            casing={2.6}
          />
          <path
            d="M10.4,17.2 C8.2,16.4 9.0,14.0 11.4,13.8 C13.2,13.6 13.6,12.2 13.8,11.2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
        </FurDiamondPatch>
        {/* Diagonal blue stylus */}
        <path
          d="M13.6,11.6 L14.4,9.2 L19.2,3.4 L21.0,4.8 L16.2,10.6 Z"
          fill="#3672c4"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        <path
          d="M14.4,9.2 L16.2,10.6 L13.6,11.6 Z"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.guidefill',
    label: 'Guide Fill',
    family: 'sop',
    description: 'Blue isometric scalp patch with flowing blue hair tufts and three tall red guide strands rising out.',
    types: ['guidefill'],
    icons: ['sop_guidefill'],
    refKey: 'SOP_guidefill',
    render: () => (
      <>
        <BlueScalpPatch />
        <GuideStrand d="M8.6,12.2 C9.2,8.4 10.6,5.6 12.2,3.6" color="#ff7066" width={1.4} />
        <GuideStrand d="M12.4,13.6 C13.0,9.6 14.4,6.6 16.0,4.2" color="#ff7066" width={1.4} />
        <GuideStrand d="M15.8,13.2 C16.4,10.0 17.4,7.4 18.8,5.4" color="#ff7066" width={1.4} />
      </>
    ),
  },
  {
    id: 'sop.guideadvect',
    label: 'Guide Advect',
    family: 'sop',
    description:
      'White curved scalp sheet with dark-brown upright hair strands and two light-blue curved advection arrows.',
    types: ['guideadvect'],
    icons: ['sop_guideadvect'],
    refKey: 'SOP_guideadvect',
    render: () => (
      <>
        <CurvedScalpSheet />
        <GuideStrand d="M7.6,16.0 C7.0,12.0 8.2,8.2 9.8,5.6" color="#7e5828" width={1.2} />
        <GuideStrand d="M10.2,15.6 C9.8,11.6 11.0,7.8 12.6,5.0" color="#7e5828" width={1.2} />
        <GuideStrand d="M12.8,15.6 C12.4,11.6 13.6,7.8 15.2,5.2" color="#7e5828" width={1.2} />
        <GuideStrand d="M15.4,16.0 C15.0,12.2 16.0,8.8 17.6,6.4" color="#7e5828" width={1.2} />
        {/* Top-left blue arrow pointing down-right */}
        <path
          d="M3.0,4.2 Q5.6,4.8 7.0,6.6 L8.2,5.6 L8.4,9.6 L4.6,8.8 L5.8,7.8 Q4.4,6.2 2.8,5.8 Z"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Bottom-right blue arrow pointing left */}
        <path
          d="M21.0,12.2 Q18.2,12.0 16.2,13.0 L16.8,14.4 L12.8,13.4 L15.6,10.2 L16.0,11.6 Q18.4,10.6 21.0,10.6 Z"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.guideclumpcenter',
    label: 'Guide Clump Center',
    family: 'sop',
    description: 'Blue isometric scalp patch with pointed conical hair clumps and three tall red guide strands.',
    types: ['guideclumpcenter'],
    icons: ['sop_guideclumpcenter'],
    refKey: 'SOP_guideclumpcenter',
    render: () => (
      <>
        <BlueScalpPatch pointed />
        <GuideStrand d="M8.8,11.8 C9.4,8.2 10.6,5.4 12.2,3.6" color="#ff7066" width={1.4} />
        <GuideStrand d="M12.6,13.2 C13.2,9.2 14.4,6.4 16.0,4.2" color="#ff7066" width={1.4} />
        <GuideStrand d="M16.0,12.8 C16.6,9.8 17.6,7.2 18.8,5.4" color="#ff7066" width={1.4} />
      </>
    ),
  },
  {
    id: 'sop.guidecollidevdb',
    label: 'Guide Collide With VDB',
    family: 'sop',
    description: 'Two-tone curved yellow hay wave with a deep U-shaped trough on the left cradling a shiny red ball.',
    types: ['guidecollidevdb'],
    icons: ['sop_guidecollidevdb'],
    refKey: 'SOP_guidecollidevdb',
    render: (uid) => (
      <>
        <ShadedSphere id={`${uid}-ball`} cx={8.8} cy={10.4} r={3.3} tones={SPHERE_TONES.red} strokeWidth={1.0} />
        {/* Thick curved two-tone hay wave */}
        <path
          d="M2.6,18.2 Q12.0,15.6 21.4,18.2 L20.4,10.6 Q16.6,9.0 13.2,10.2 Q11.4,13.8 8.8,13.8 Q6.2,13.8 4.4,11.0 L3.4,11.8 Z"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M3.8,12.0 Q6.2,14.2 8.8,14.2 Q11.4,14.2 13.2,10.6 Q16.6,9.4 20.2,11.0 L19.8,12.4 Q16.6,11.0 13.6,12.0 Q11.6,15.2 8.8,15.2 Q6.0,15.2 3.4,13.2 Z"
          fill="#ffe47a"
          stroke="none"
        />
        <path
          d="M2.6,18.2 Q12.0,15.6 21.4,18.2 L20.4,10.6 Q16.6,9.0 13.2,10.2 Q11.4,13.8 8.8,13.8 Q6.2,13.8 4.4,11.0 L3.4,11.8 Z"
          fill="none"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M14.6,11.2 L14.8,16.4 M17.0,10.8 L17.4,16.8 M19.2,11.4 L19.8,17.4 M6.0,14.2 L5.4,17.2"
          fill="none"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.guidedeform',
    label: 'Guide Deform',
    family: 'sop',
    description:
      'Three stacked curved scalp sheets pivoted around the right corner at 0, 15, and 30 degrees, with dark-brown hair strands on the top sheet.',
    types: ['guidedeform'],
    icons: ['sop_guidedeform'],
    refKey: 'SOP_guidedeform',
    render: () => (
      <>
        <g transform="translate(1.4 3.4) scale(0.76)">
          <CurvedScalpSheet fillOpacity={0.22} strokeOpacity={0.4} />
        </g>
        <g transform="rotate(15 17.8 19.4) translate(1.4 3.4) scale(0.76)">
          <CurvedScalpSheet fillOpacity={0.48} strokeOpacity={0.65} />
        </g>
        <g transform="rotate(30 17.8 19.4) translate(1.4 3.4) scale(0.76)">
          <CurvedScalpSheet />
          <GuideStrand d="M6.4,14.8 L6.4,6.4" color="#7e5828" width={1.4} />
          <GuideStrand d="M9.4,13.8 L9.4,5.4" color="#7e5828" width={1.4} />
          <GuideStrand d="M12.4,13.4 L12.4,5.0" color="#7e5828" width={1.4} />
          <GuideStrand d="M15.4,13.8 L15.4,5.4" color="#7e5828" width={1.4} />
          <GuideStrand d="M18.0,14.8 L18.0,6.4" color="#7e5828" width={1.4} />
        </g>
      </>
    ),
  },
];
