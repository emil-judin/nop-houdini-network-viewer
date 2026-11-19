import { CasedStroke } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import { MUSCLE_TONES, MusclePropertiesPanel, MuscleSpindle } from '../../kits/muscle';
import { SkinArmBase } from '../../kits/skinArm';

/**
 * Muscle setup.
 * Reuses `MuscleSpindle`, `MUSCLE_TONES`, and `MusclePropertiesPanel` from `kits/muscle.tsx`.
 */

const OUTLINE = '#262626';

/**
 * Muscle setup operators: id, merge, mirror, paint, properties and solidify.
 */
export const MUSCLE_SETUP_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.muscleid',
    label: 'Muscle ID',
    family: 'sop',
    description:
      'Diagonal red striated muscle spindle running from bottom-left to top-right with rounded white and grey tendon tips.',
    types: ['muscleid'],
    icons: ['sop_muscleid'],
    refKey: 'SOP_muscleid',
    render: () => <MuscleSpindle cx={12} cy={12} len={22} width={7.2} angleDeg={-45} />,
  },
  {
    id: 'sop.musclemerge',
    label: 'Muscle Merge',
    family: 'sop',
    description: 'Two parallel diagonal red striated muscle spindles with a bold white plus sign centered over them.',
    types: ['musclemerge'],
    icons: ['sop_musclemerge'],
    refKey: 'SOP_musclemerge',
    render: () => (
      <>
        <MuscleSpindle cx={10.2} cy={14.0} len={17.5} width={6.0} angleDeg={45} />
        <MuscleSpindle cx={14.0} cy={10.0} len={17.5} width={6.0} angleDeg={45} />
        {/* Bold outlined white plus */}
        <path
          d="M10.4,7.6 H13.6 V10.4 H16.4 V13.6 H13.6 V16.4 H10.4 V13.6 H7.6 V10.4 H10.4 Z"
          fill="#ffffff"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.musclemirror',
    label: 'Muscle Mirror',
    family: 'sop',
    description:
      'Bent blue muscular arm with a curled fist on the left reflected inside a tilted yellow-framed white mirror on the right.',
    types: ['musclemirror'],
    icons: ['sop_musclemirror'],
    refKey: 'SOP_musclemirror',
    render: (uid) => (
      <g strokeLinejoin="round" strokeLinecap="round">
        {/* Tilted yellow mirror frame */}
        <polygon points="9.8,2.6 21.0,5.0 21.0,21.2 9.8,18.2" fill="#f2c438" stroke={OUTLINE} strokeWidth="1.05" />
        {/* Inner white mirror pane */}
        <polygon points="11.1,4.0 19.7,5.9 19.7,19.7 11.1,17.0" fill="#f2f4f7" stroke={OUTLINE} strokeWidth="0.8" />
        {/* Reflected blue muscular arm inside mirror (horizontally flipped, stroke >= 0.6) */}
        <g transform="translate(21.4 5.2) scale(-0.46 0.46)">
          <path
            d="M4.8,4.6 C6.8,3.2 9.6,4.2 11.4,7.0 C12.8,9.2 13.8,11.8 14.2,13.6 C15.2,12.2 16.4,9.8 16.8,7.8 C15.4,8.0 14.2,6.8 14.2,5.0 C14.2,3.2 16.2,2.2 18.4,2.8 C20.2,3.4 21.0,5.0 20.6,7.0 C20.2,10.8 18.6,15.4 16.2,18.0 C14.0,20.4 10.2,20.2 7.4,17.4 C4.6,14.6 3.0,10.8 3.2,7.6 C3.3,6.0 3.9,5.2 4.8,4.6 Z"
            fill="#8fc2ff"
            stroke={OUTLINE}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </g>
        {/* Foreground blue muscular arm on left (matching SkinArmBase, stroke >= 0.6) */}
        <g transform="translate(0.2 6.8) scale(0.58)">
          <SkinArmBase uid={uid} />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.musclepaint',
    label: 'Muscle Paint',
    family: 'sop',
    description:
      'Horizontal red striated muscle spindle at the bottom painted by a diagonal wooden brush with pink sparkles above.',
    types: ['musclepaint'],
    icons: ['sop_musclepaint'],
    refKey: 'SOP_musclepaint',
    render: () => (
      <g strokeLinejoin="round" strokeLinecap="round">
        {/* Horizontal muscle spindle */}
        <MuscleSpindle cx={11.2} cy={17.2} len={17.5} width={6.0} angleDeg={0} />
        {/* Pink sparkles */}
        <path
          d="M6.0,9.5 L6.4,10.6 L7.5,11.0 L6.4,11.4 L6.0,12.5 L5.6,11.4 L4.5,11.0 L5.6,10.6 Z"
          fill="#ff7066"
          stroke={OUTLINE}
          strokeWidth="0.6"
        />
        <path
          d="M9.6,7.0 L9.9,7.8 L10.7,8.1 L9.9,8.4 L9.6,9.2 L9.3,8.4 L8.5,8.1 L9.3,7.8 Z"
          fill="#ff7066"
          stroke={OUTLINE}
          strokeWidth="0.6"
        />
        {/* Diagonal paintbrush */}
        <path
          d="M10.8,3.0 C11.4,2.4 12.4,2.6 12.8,3.4 L16.8,12.4 L14.8,13.3 L10.6,4.2 C10.4,3.7 10.5,3.3 10.8,3.0 Z"
          fill="#ee8624"
          stroke={OUTLINE}
          strokeWidth="0.95"
        />
        {/* Ferrule */}
        <polygon points="14.8,13.3 16.8,12.4 17.5,14.1 15.6,15.0" fill="#c0c7d1" stroke={OUTLINE} strokeWidth="0.85" />
        {/* Bristle tip touching muscle */}
        <path
          d="M15.6,15.0 L17.5,14.1 L18.2,17.4 C17.0,17.2 16.1,16.2 15.6,15.0 Z"
          fill="#a81f18"
          stroke={OUTLINE}
          strokeWidth="0.85"
        />
      </g>
    ),
  },
  {
    id: 'sop.muscleproperties',
    label: 'Muscle Properties Vellum',
    family: 'sop',
    description:
      'Diagonal red muscle spindle with a green-bordered property panel card at top-left and a callout dot on the belly.',
    types: ['muscleproperties'],
    icons: ['sop_muscleproperties'],
    refKey: 'SOP_muscleproperties',
    render: () => (
      <>
        <MuscleSpindle cx={13.2} cy={13.4} len={18.8} width={6.6} angleDeg={-45} />
        <MusclePropertiesPanel accent="#58c848" targetX={12.0} targetY={12.6} />
      </>
    ),
  },
  {
    id: 'sop.musclepropertiesotis',
    label: 'Muscle Properties Otis',
    family: 'sop',
    description:
      'Diagonal purple Otis muscle spindle with a purple-bordered property panel card at top-left and a callout dot on the belly.',
    types: ['musclepropertiesotis'],
    icons: ['sop_musclepropertiesotis'],
    refKey: 'SOP_musclepropertiesotis',
    render: () => (
      <>
        <MuscleSpindle cx={13.2} cy={13.4} len={18.8} width={6.6} angleDeg={-45} tone={MUSCLE_TONES.purple} />
        <MusclePropertiesPanel accent="#9b59b6" targetX={12.0} targetY={12.6} />
      </>
    ),
  },
  {
    id: 'sop.muscleadjustvolume',
    label: 'Muscle Adjust Volume',
    family: 'sop',
    description: 'Diagonal red striated muscle spindle overlaid with a cased light-blue plus, slash, and minus symbol.',
    types: ['muscleadjustvolume'],
    icons: ['sop_muscleadjustvolume'],
    refKey: 'SOP_muscleadjustvolume',
    render: () => (
      <>
        <MuscleSpindle cx={12} cy={12} len={22} width={7.4} angleDeg={-45} />
        {/* Cased + / - symbol */}
        <CasedStroke
          d="M7.6,10.0 H11.2 M9.4,8.2 V11.8 M14.8,8.4 L9.6,15.6 M12.8,14.2 H16.4"
          color="#8fc2ff"
          width={1.35}
          casing={2.6}
        />
      </>
    ),
  },
  {
    id: 'sop.musclesolidify',
    label: 'Muscle Solidify',
    family: 'sop',
    description:
      'Diagonal muscle spindle transitioning seamlessly from solid red striated muscle on the lower-left to a blue triangulated wireframe mesh on the upper-right.',
    types: ['musclesolidify'],
    icons: ['sop_musclesolidify'],
    refKey: 'SOP_musclesolidify',
    render: (uid) => {
      const clipId = `${uid}-solid-clip`;
      const wireClipId = `${uid}-wire-clip`;
      return (
        <g strokeLinejoin="round" strokeLinecap="round">
          <defs>
            <clipPath id={clipId}>
              <polygon points="0,24 0,0 2,0 24,22 24,24" />
            </clipPath>
            <clipPath id={wireClipId}>
              <polygon points="2,0 24,0 24,22" />
            </clipPath>
          </defs>
          {/* Lower-left solid red muscle */}
          <g clipPath={`url(#${clipId})`}>
            <MuscleSpindle cx={12} cy={12} len={22} width={7.2} angleDeg={-45} />
          </g>
          {/* Upper-right pale blue wireframe tip */}
          <g clipPath={`url(#${wireClipId})`}>
            <g transform="translate(12 12) rotate(-45)">
              {/* Upper-right rounded tendon */}
              <path
                d="M7.1,-1.25 C9.4,-1.55 10.9,-0.9 10.9,0 C10.9,0.9 9.4,1.55 7.1,1.25 Z"
                fill="#f2f4f7"
                stroke={OUTLINE}
                strokeWidth="0.9"
              />
              {/* Wireframe belly fill */}
              <path
                d="M-7.4,-1.3 C-4.0,-4.1 4.0,-4.1 7.4,-1.3 C8.1,-0.45 8.1,0.45 7.4,1.3 C4.0,4.1 -4.0,4.1 -7.4,1.3 Z"
                fill="#f2f4f7"
                stroke={OUTLINE}
                strokeWidth="1.05"
              />
              {/* Triangulated blue mesh lines covering the entire wireframe region */}
              <path
                d="M-2,-2.9 L1.6,2.9 M1.6,-2.9 L-2,2.9 M1.6,-2.9 L5.5,2.2 M5.5,-2.2 L1.6,2.9 M-1.5,0 H7.7 M5.5,-2.2 V2.2"
                fill="none"
                stroke="#3672c4"
                strokeWidth="0.85"
              />
            </g>
          </g>
        </g>
      );
    },
  },
  {
    id: 'sop.muscleflex',
    label: 'Muscle Flex',
    family: 'sop',
    description: 'Bent blue muscular arm with a curled fist matching SkinArmBase and a bulging red striated bicep.',
    types: ['muscleflex'],
    icons: ['sop_muscleflex'],
    refKey: 'SOP_muscleflex',
    render: (uid) => (
      <g strokeLinejoin="round" strokeLinecap="round">
        <SkinArmBase uid={uid} />
        {/* Bulging red striated muscle belly on inner bicep */}
        <path
          d="M5.4,7.0 C7.0,6.0 9.6,7.0 11.6,9.8 C13.0,11.8 13.2,14.4 11.8,15.8 C10.2,17.0 7.6,15.6 5.8,13.0 C4.4,10.8 4.2,8.0 5.4,7.0 Z"
          fill="#ff7066"
          stroke={OUTLINE}
          strokeWidth="0.9"
        />
        {/* Striation lines */}
        <path
          d="M6.2,8.8 C8.0,9.8 9.6,11.6 10.8,14.0 M7.4,7.8 C9.0,9.0 10.6,10.8 11.8,13.0"
          fill="none"
          stroke="#a81f18"
          strokeWidth="0.7"
        />
      </g>
    ),
  },
];
