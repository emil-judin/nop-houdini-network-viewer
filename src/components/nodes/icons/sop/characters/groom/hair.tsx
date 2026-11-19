import type { OperatorIconDef } from '../../../iconTypes';
import { CurvedScalpSheet, FurDiamondPatch, GuideStrand } from '../../kits/groom';
import { MuscleSpindle } from '../../kits/muscle';

/**
 * Hair, fur and fiber operators.
 */
export const HAIR_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.haircardgen',
    label: 'Hair Card Generate',
    family: 'sop',
    description: 'Dark grey head-and-neck silhouette wearing a fan of broad white flat hair cards.',
    types: ['haircardgen'],
    icons: ['sop_haircardgen'],
    refKey: 'SOP_haircardgen',
    render: () => (
      <>
        {/* Dark grey head and neck silhouette */}
        <path
          d="M8.6,21.4 L9.2,17.2 C7.4,16.0 6.6,13.6 6.8,11.0 C7.0,7.6 9.2,5.4 12.0,5.4 C14.8,5.4 17.0,7.6 17.2,11.0 C17.4,13.6 16.6,16.0 14.8,17.2 L15.4,21.4 Z"
          fill="#3a3f47"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Broad white hair cards fanned around the crown and draping down the sides */}
        <path
          d="M3.2,14.6 L5.6,6.4 L8.8,7.4 L6.4,15.6 Z"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M6.4,10.8 L8.4,3.6 L11.8,4.4 L9.8,11.6 Z"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M14.2,11.6 L12.2,4.4 L15.6,3.6 L17.6,10.8 Z"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M17.6,15.6 L15.2,7.4 L18.4,6.4 L20.8,14.6 Z"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M9.6,11.4 L10.6,4.2 L13.4,4.2 L14.4,11.4 Z"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.hairclump',
    label: 'Hair Clump',
    family: 'sop',
    description: 'White curved scalp sheet with dark-brown hair strands gathered into three V-shaped clumps.',
    types: ['hairclump'],
    icons: ['sop_hairclump'],
    refKey: 'SOP_hairclump',
    render: () => (
      <>
        <CurvedScalpSheet />
        {/* Clump 1 (left) */}
        <GuideStrand d="M5.4,17.2 L7.2,7.8" color="#7e5828" width={1.1} />
        <GuideStrand d="M8.6,16.0 L7.2,7.8" color="#7e5828" width={1.1} />
        {/* Clump 2 (center) */}
        <GuideStrand d="M10.4,15.6 L12.0,5.8" color="#7e5828" width={1.15} />
        <GuideStrand d="M13.6,15.6 L12.0,5.8" color="#7e5828" width={1.15} />
        {/* Clump 3 (right) */}
        <GuideStrand d="M15.4,16.0 L16.8,7.8" color="#7e5828" width={1.1} />
        <GuideStrand d="M18.6,17.2 L16.8,7.8" color="#7e5828" width={1.1} />
      </>
    ),
  },
  {
    id: 'sop.hairgen',
    label: 'Hair Generate',
    family: 'sop',
    description: 'White curved scalp sheet with a dense row of upright dark-brown hair strands standing across it.',
    types: ['hairgen'],
    icons: ['sop_hairgen'],
    refKey: 'SOP_hairgen',
    render: () => (
      <>
        <CurvedScalpSheet />
        <GuideStrand d="M5.6,17.4 L5.4,8.6" color="#c89a5a" width={1.15} />
        <GuideStrand d="M7.6,16.4 L7.4,7.0" color="#a8783c" width={1.15} />
        <GuideStrand d="M9.6,15.8 L9.6,6.0" color="#c89a5a" width={1.15} />
        <GuideStrand d="M11.6,15.6 L11.8,5.6" color="#a8783c" width={1.15} />
        <GuideStrand d="M13.6,15.6 L13.8,5.8" color="#c89a5a" width={1.15} />
        <GuideStrand d="M15.6,16.2 L15.8,6.6" color="#a8783c" width={1.15} />
        <GuideStrand d="M17.6,17.0 L18.0,8.2" color="#c89a5a" width={1.15} />
      </>
    ),
  },
  {
    id: 'sop.hairgrowthfield',
    label: 'Hair Growth Field',
    family: 'sop',
    description:
      'White curved scalp plane at bottom-left with a diagonal red-brown hair strand pointing up-right over a borderless rainbow spectrum disc.',
    types: ['hairgrowthfield'],
    icons: ['sop_hairgrowthfield'],
    refKey: 'SOP_hairgrowthfield',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-field`} x1="15%" y1="85%" x2="85%" y2="15%">
            <stop offset="0%" stopColor="#ee8624" />
            <stop offset="35%" stopColor="#f2c438" />
            <stop offset="68%" stopColor="#58c848" />
            <stop offset="100%" stopColor="#5aa2f2" />
          </linearGradient>
        </defs>
        {/* Borderless rainbow spectrum field disc */}
        <circle cx="12.8" cy="11.4" r="7.6" fill={`url(#${uid}-field)`} />
        {/* White curved scalp plane at bottom-left */}
        <path
          d="M2.6,17.2 L7.2,13.0 Q9.6,15.0 11.4,17.6 L6.8,21.2 Q4.6,19.4 2.6,17.2 Z"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Diagonal brown-to-red tapered hair strand */}
        <path
          d="M6.8,17.0 L18.2,4.4 L19.2,4.8 L8.0,17.8 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.fur',
    label: 'Fur',
    family: 'sop',
    description: 'Warm brown diamond fur patch with spiky fur tufts along the upper edges and interior tuft strokes.',
    types: ['fur'],
    icons: ['sop_fur'],
    refKey: 'SOP_fur',
    render: () => (
      <FurDiamondPatch>
        <path
          d="M8.6,13.4 L9.6,10.6 M11.6,14.8 L12.8,11.8 M14.6,13.2 L15.8,10.2 M10.2,10.4 L11.0,8.0"
          fill="none"
          stroke="#7e5828"
          strokeWidth="1.0"
          strokeLinecap="round"
        />
      </FurDiamondPatch>
    ),
  },
  {
    id: 'sop.fibergroom',
    label: 'Fiber Groom',
    family: 'sop',
    description:
      'Diagonal red striated muscle spindle with white tendon tips, wrapped across the upper belly by the orange comb from sop.comb.',
    types: ['fibergroom'],
    icons: ['sop_fibergroom'],
    refKey: 'SOP_fibergroom',
    render: () => (
      <>
        <MuscleSpindle cx={12} cy={12} len={21} width={6.8} angleDeg={-45} />
        <g transform="translate(13.8 10.2) rotate(45) scale(0.66) translate(-11.8 -9.1)">
          <path
            d="M2.4,6.2 Q11.8,4.6 21.2,6.2 L21.2,8.6 L20.4,8.6 L20.4,12.8 L18.8,12.8 L18.8,8.6 L17.2,8.6 L17.2,12.8 L15.6,12.8 L15.6,8.6 L14.0,8.6 L14.0,12.8 L12.4,12.8 L12.4,8.6 L10.8,8.6 L10.8,12.8 L9.2,12.8 L9.2,8.6 L7.6,8.6 L7.6,12.8 L6.0,12.8 L6.0,8.6 L4.4,8.6 L4.4,12.8 L2.8,12.8 L2.8,8.6 L2.4,8.6 Z"
            fill="#ee8624"
            stroke="#262626"
            strokeWidth="1.15"
            strokeLinejoin="round"
          />
          <path d="M3.0,6.6 Q11.8,5.1 20.6,6.6 L20.6,7.4 Q11.8,6.0 3.0,7.4 Z" fill="#ffb066" stroke="none" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.detangle',
    label: 'Detangle',
    family: 'sop',
    description: 'Four colorful vertical strands in blue, purple, green and orange untangling from curved loops.',
    types: ['detangle'],
    icons: ['sop_detangle'],
    refKey: 'SOP_detangle',
    render: () => (
      <g fill="none" strokeLinecap="round">
        <path d="M8.5,20.5 V13 C4,9 9,5 5,3.5" stroke="#262626" strokeWidth="2.4" />
        <path d="M8.5,20.5 V13 C4,9 9,5 5,3.5" stroke="#3672c4" strokeWidth="1.3" />
        <path d="M11,20.5 V12 C16,9 8,6 13,3.5" stroke="#262626" strokeWidth="2.4" />
        <path d="M11,20.5 V12 C16,9 8,6 13,3.5" stroke="#9b66d4" strokeWidth="1.3" />
        <path d="M13.5,20.5 V13 C18,10 13,6 17,3.5" stroke="#262626" strokeWidth="2.4" />
        <path d="M13.5,20.5 V13 C18,10 13,6 17,3.5" stroke="#52d638" strokeWidth="1.3" />
        <path d="M15.8,20.5 V14 C11,11 19,8 20,4.5" stroke="#262626" strokeWidth="2.4" />
        <path d="M15.8,20.5 V14 C11,11 19,8 20,4.5" stroke="#ee8624" strokeWidth="1.3" />
      </g>
    ),
  },
];
