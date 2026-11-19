import { gearPath } from '../../../geoHelpers';
import { ShadedSphere, SPHERE_TONES, StraightArrow } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import { BlueScalpPatch, CurvedScalpSheet, GuideStrand } from '../../kits/groom';

/**
 * Guide transfer and groom blend, fetch and switch operators.
 */
export const GROOM_FLOW_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.guidetangentspace',
    label: 'Guide Tangent Space',
    family: 'sop',
    description:
      'White curved scalp sheet with a single curved yellow guide strand and three red dots with vertical bottom, slightly right middle, and slightly left top tangent lines.',
    types: ['guidetangentspace'],
    icons: ['sop_guidetangentspace'],
    refKey: 'SOP_guidetangentspace',
    render: () => (
      <>
        <CurvedScalpSheet />
        {/* Curved yellow guide strand */}
        <GuideStrand d="M12.2,16.4 C12.4,11.6 10.6,6.8 6.8,3.6" color="#f2c438" width={1.45} />
        {/* Red tangent lines: vertical bottom, slightly right middle, slightly left top */}
        <path
          d="M12.2,16.4 L12.2,12.6 M11.6,11.4 L12.6,7.6 M9.6,7.0 L9.0,3.4"
          fill="none"
          stroke="#e03228"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
        <circle cx="12.2" cy="16.4" r="1.2" fill="#e03228" stroke="#262626" strokeWidth="0.75" />
        <circle cx="11.6" cy="11.4" r="0.95" fill="#e03228" stroke="#262626" strokeWidth="0.65" />
        <circle cx="9.6" cy="7.0" r="0.95" fill="#e03228" stroke="#262626" strokeWidth="0.65" />
      </>
    ),
  },
  {
    id: 'sop.guidetransfer',
    label: 'Guide Transfer',
    family: 'sop',
    description:
      'Two stylized bearded heads side by side (left warm brown, right grey skin with green hair and beard) and a red right arrow at the bottom.',
    types: ['guidetransfer'],
    icons: ['sop_guidetransfer'],
    refKey: 'SOP_guidetransfer',
    render: () => (
      <>
        {/* Left stylized head (warm brown hair/beard) */}
        <ellipse cx="6.8" cy="10.2" rx="3.2" ry="4.0" fill="#c89a5a" stroke="#262626" strokeWidth="1.0" />
        <path
          d="M3.6,9.4 C3.4,5.8 5.2,3.4 7.6,3.6 C9.6,3.8 10.4,5.6 10.0,8.0 C8.8,7.0 7.0,7.0 5.4,8.2 Z"
          fill="#c25e12"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M3.8,10.6 C3.8,13.4 5.2,15.2 6.8,15.2 C8.4,15.2 9.8,13.4 9.8,10.6 C8.6,12.0 5.0,12.0 3.8,10.6 Z"
          fill="#c25e12"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />

        {/* Right stylized head (grey alien skin with green hair and beard) */}
        <ellipse cx="17.2" cy="10.2" rx="3.2" ry="4.0" fill="#c0c7d1" stroke="#262626" strokeWidth="1.0" />
        <path
          d="M14.0,9.4 C13.8,5.8 15.6,3.4 18.0,3.6 C20.0,3.8 20.8,5.6 20.4,8.0 C19.2,7.0 17.4,7.0 15.8,8.2 Z"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <ellipse cx="15.8" cy="9.6" rx="0.85" ry="0.6" fill="#262626" />
        <ellipse cx="18.6" cy="9.6" rx="0.85" ry="0.6" fill="#262626" />
        <path
          d="M14.2,10.8 C14.4,13.4 15.6,15.0 17.2,15.0 C18.8,15.0 20.0,13.4 20.2,10.8 C19.0,12.2 15.4,12.2 14.2,10.8 Z"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />

        {/* Red transfer arrow at bottom */}
        <StraightArrow from={[7.6, 18.4]} tip={[16.8, 18.4]} color="#e03228" width={1.8} head={3.6} />
      </>
    ),
  },
  {
    id: 'sop.guideutility',
    label: 'Guide Utility',
    family: 'sop',
    description: 'Blue isometric scalp patch with a large silver-grey gear rising behind the hair tufts.',
    types: ['guideutility'],
    icons: ['sop_guideutility'],
    refKey: 'SOP_guideutility',
    render: () => (
      <>
        <path
          d={gearPath(13.0, 9.4, 10, 6.4, 4.8)}
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <circle cx="13.0" cy="9.4" r="2.2" fill="#eef2f7" stroke="#262626" strokeWidth="0.95" />
        <BlueScalpPatch />
      </>
    ),
  },
  {
    id: 'sop.guidevolume',
    label: 'Guide Volume',
    family: 'sop',
    description: 'Blue isometric scalp patch with three curved red-and-green-striped tapered volume guides rising out.',
    types: ['guidevolume'],
    icons: ['sop_guidevolume'],
    refKey: 'SOP_guidevolume',
    render: () => (
      <>
        <BlueScalpPatch />
        {/* Three tapered volume horns/ribbons */}
        <path
          d="M6.4,12.4 C6.8,8.4 8.6,5.4 11.4,3.8 C9.8,6.6 9.2,9.6 8.8,12.6 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M7.6,12.4 C8.0,9.0 9.4,6.4 11.4,3.8 C10.4,6.8 9.8,9.6 9.4,12.4 Z"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <path
          d="M10.4,13.6 C10.8,9.2 12.8,6.0 15.8,4.0 C14.0,7.0 13.4,10.2 13.0,13.6 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M11.6,13.6 C12.0,9.8 13.6,6.8 15.8,4.0 C14.6,7.2 14.0,10.2 13.6,13.6 Z"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <path
          d="M14.4,14.0 C14.8,10.2 16.4,7.4 19.0,5.6 C17.4,8.2 16.8,11.0 16.6,14.0 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M15.4,14.0 C15.8,10.8 17.2,8.2 19.0,5.6 C18.0,8.4 17.4,11.0 17.2,14.0 Z"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.reguide',
    label: 'Reguide',
    family: 'sop',
    description: 'White curved scalp sheet with alternating vertical red and yellow straight guide rods.',
    types: ['reguide'],
    icons: ['sop_reguide'],
    refKey: 'SOP_reguide',
    render: () => (
      <>
        <CurvedScalpSheet />
        <GuideStrand d="M6.4,16.4 L6.4,7.2" color="#e03228" width={1.25} />
        <GuideStrand d="M8.6,15.6 L8.6,5.2" color="#f2c438" width={1.25} />
        <GuideStrand d="M10.8,16.8 L10.8,8.6" color="#e03228" width={1.25} />
        <GuideStrand d="M13.0,15.4 L13.0,5.0" color="#f2c438" width={1.25} />
        <GuideStrand d="M15.2,16.6 L15.2,7.8" color="#e03228" width={1.25} />
        <GuideStrand d="M17.4,16.0 L17.4,6.4" color="#f2c438" width={1.25} />
      </>
    ),
  },
  {
    id: 'sop.groomblend',
    label: 'Groom Blend',
    family: 'sop',
    description:
      'Three small round white heads with orange hair arranged in a triangle, with two red arrows pointing down to the bottom blended head.',
    types: ['groomblend'],
    icons: ['sop_groomblend'],
    refKey: 'SOP_groomblend',
    render: (uid) => (
      <>
        {/* Top-left head with spiky orange hair */}
        <ShadedSphere id={`${uid}-h1`} cx={6.4} cy={7.6} r={3.0} tones={SPHERE_TONES.grey} strokeWidth={0.95} />
        <path
          d="M3.6,6.8 L3.2,4.4 L5.0,5.2 L6.2,3.0 L7.6,5.0 L9.4,4.2 L9.0,6.8 C7.8,6.0 5.0,6.0 3.6,6.8 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />

        {/* Top-right head with mohawk orange hair */}
        <ShadedSphere id={`${uid}-h2`} cx={17.6} cy={7.6} r={3.0} tones={SPHERE_TONES.grey} strokeWidth={0.95} />
        <path
          d="M16.2,5.0 L16.8,2.6 L18.6,2.8 L19.0,5.4 C18.2,4.8 17.0,4.8 16.2,5.0 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />

        {/* Red blend arrows */}
        <StraightArrow from={[6.4, 11.4]} tip={[8.8, 15.2]} color="#e03228" width={1.4} head={2.8} />
        <StraightArrow from={[17.6, 11.4]} tip={[15.2, 15.2]} color="#e03228" width={1.4} head={2.8} />

        {/* Bottom-center blended head */}
        <ShadedSphere id={`${uid}-h3`} cx={12.0} cy={17.6} r={3.2} tones={SPHERE_TONES.grey} strokeWidth={0.95} />
        <path
          d="M9.0,16.8 L8.8,14.0 L10.4,14.8 L12.0,12.6 L13.6,14.8 L15.2,14.0 L15.0,16.8 C13.6,15.8 10.4,15.8 9.0,16.8 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.groomfetch',
    label: 'Groom Fetch',
    family: 'sop',
    description:
      'Tilted orange comb angled up-right with evenly spaced teeth and a bold curved red arrow sweeping down-right in front of it.',
    types: ['groomfetch'],
    icons: ['sop_groomfetch'],
    refKey: 'SOP_groomfetch',
    render: () => (
      <>
        {/* Diagonal orange comb angled up-right */}
        <g transform="translate(0.2 0.2) rotate(-29 11.8 9.2)">
          <path
            d="M2.4,6.2 Q11.8,4.6 21.2,6.2 L21.2,8.6 L20.4,8.6 L20.4,12.8 L18.8,12.8 L18.8,8.6 L17.2,8.6 L17.2,12.8 L15.6,12.8 L15.6,8.6 L14.0,8.6 L14.0,12.8 L12.4,12.8 L12.4,8.6 L10.8,8.6 L10.8,12.8 L9.2,12.8 L9.2,8.6 L7.6,8.6 L7.6,12.8 L6.0,12.8 L6.0,8.6 L4.4,8.6 L4.4,12.8 L2.8,12.8 L2.8,8.6 L2.4,8.6 Z"
            fill="#ee8624"
            stroke="#262626"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {/* Filled upper-spine highlight */}
          <path d="M3.0,6.6 Q11.8,5.1 20.6,6.6 L20.6,7.4 Q11.8,6.0 3.0,7.4 Z" fill="#ffb066" stroke="none" />
        </g>
        {/* Bold curved red downward arrow in front of the comb */}
        <path
          d="M10.4,10.6 C14.6,10.0 17.5,11.6 17.7,16.0 L20.6,16.0 L15.8,21.8 L11.0,16.0 L14.0,16.0 C13.9,13.2 12.6,11.8 10.4,10.6 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.groomswitch',
    label: 'Groom Switch',
    family: 'sop',
    description:
      'Blue head-and-shoulders bust flanked by two small blue hairstyles, a green top switch arrow, and a single curved red arrow passing behind the bust from right to left.',
    types: ['groomswitch'],
    icons: ['sop_groomswitch'],
    refKey: 'SOP_groomswitch',
    render: () => (
      <>
        {/* Single curved red arrow passing behind the bust from right hairstyle to left hairstyle */}
        <path
          d="M18.6,11.8 Q19.2,19.4 12.0,19.6 Q6.4,19.6 5.2,14.8 L3.6,15.4 L5.0,12.2 L7.4,14.4 L6.0,14.8 Q7.2,18.2 12.0,18.2 Q17.6,18.0 17.4,11.8 Z"
          fill="#ff7066"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />

        {/* Central blue bust */}
        <path
          d="M7.6,21.0 C7.6,17.8 9.4,16.6 12.0,16.6 C14.6,16.6 16.4,17.8 16.4,21.0 Z"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        <circle cx="12.0" cy="13.6" r="2.6" fill="#8fc2ff" stroke="#262626" strokeWidth="1.0" />

        {/* Left small blue bob hairstyle */}
        <path
          d="M3.0,12.4 C3.0,9.2 4.2,7.6 5.8,7.6 C7.4,7.6 8.6,9.2 8.6,12.4 L7.2,12.4 L7.0,10.2 L4.6,10.2 L4.4,12.4 Z"
          fill="#8fc2ff"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Right small blue short cap hairstyle */}
        <path
          d="M15.8,11.2 C15.8,8.6 17.0,7.6 18.4,7.6 C19.8,7.6 21.0,8.6 21.0,11.2 C19.8,10.2 17.0,10.2 15.8,11.2 Z"
          fill="#8fc2ff"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />

        {/* Green top switch arrow */}
        <path
          d="M7.4,5.6 Q12.0,3.2 16.0,5.2 L16.6,3.8 L18.4,6.8 L14.8,7.2 L15.4,6.0 Q12.0,4.6 7.8,6.6 Z"
          fill="#88e878"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
