import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 7, Part 9 (icons 90 to 99): built-in Houdini SOP icons under review.
 */
export const BATCH_07_PART_9: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.ragdollsolver',
    label: 'Ragdoll Solver',
    family: 'sop',
    description: 'KineFX character skeleton collapsed in a limp dynamic ragdoll pose on the floor.',
    types: ['ragdollsolver'],
    icons: ['sop_kinefx-ragdollsolver'],
    refKey: 'SOP_kinefx-ragdollsolver',
    render: () => (
      <g>
        {/* Floor shadow */}
        <ellipse cx="12" cy="18" rx="10" ry="2.5" fill="#262626" fillOpacity="0.25" />
        {/* Ragdoll fallen stick skeleton */}
        {/* Head slumped to the left */}
        <circle cx="5" cy="15" r="1.6" fill="#729fcf" stroke="#204a87" strokeWidth="0.75" />
        {/* Torso lying diagonal */}
        <path d="M6.5,15.5 L11,16.5" stroke="#3465a4" strokeWidth="1.6" strokeLinecap="round" />
        {/* Left arm sprawled out */}
        <path d="M7,15.5 L7.5,18 L5.5,19" stroke="#729fcf" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right arm thrown back limp */}
        <path d="M8,15.8 L10.5,13.5 L12.5,14" stroke="#729fcf" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Pelvis and bent legs */}
        <path d="M11,16.5 L15,14.5 L18.5,17" stroke="#3465a4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11,16.5 L14,17.5 L17.5,18.5" stroke="#204a87" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Dynamic gravity drop arrows */}
        <path d="M9,6 L9,10 M7.5,8.5 L9,10.2 L10.5,8.5" fill="none" stroke="#ef5429" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15,5 L15,8.5 M13.8,7.2 L15,8.8 L16.2,7.2" fill="none" stroke="#ef5429" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.reversefoot',
    label: 'Reverse Foot',
    family: 'sop',
    description: 'Foot skeleton with reverse heel, ball, and toe roll pivot hierarchy controllers.',
    types: ['reversefoot'],
    icons: ['sop_kinefx-reversefoot'],
    refKey: 'SOP_kinefx-reversefoot',
    render: () => (
      <g>
        {/* Lower leg bone coming down */}
        <path d="M7,4 L9.5,13" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M7,4 L9.5,13" stroke="#888a85" strokeWidth="1.3" strokeLinecap="round" />
        {/* Foot bones */}
        <path d="M9.5,13 L6,17.5 L15,17.5 L19,17.5" stroke="#262626" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5,13 L6,17.5 L15,17.5 L19,17.5" stroke="#eeeeec" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Roll pivot controller rings: Heel, Ball, Toe */}
        {/* Heel pivot */}
        <circle cx="6" cy="17.5" r="2.2" fill="#e9b96e" stroke="#8f5902" strokeWidth="0.8" />
        <circle cx="6" cy="17.5" r="0.8" fill="#ffffff" />
        {/* Ball pivot */}
        <circle cx="15" cy="17.5" r="2.2" fill="#e9b96e" stroke="#8f5902" strokeWidth="0.8" />
        <circle cx="15" cy="17.5" r="0.8" fill="#ffffff" />
        {/* Toe pivot */}
        <circle cx="19.5" cy="17.5" r="1.8" fill="#e9b96e" stroke="#8f5902" strokeWidth="0.8" />
        {/* Curved reverse roll motion arc */}
        <path d="M19,14 C19,10 15,8 11,9" fill="none" stroke="#d78b13" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1.5 1.2" />
        <polygon points="10,9 12.5,8 11.8,10.5" fill="#d78b13" stroke="#8f5902" strokeWidth="0.5" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rigattribvop',
    label: 'Rig Attribute VOP',
    family: 'sop',
    description: 'Rig skeleton bone segment linked to a green VOP operator node diamond badge.',
    types: ['rigattribvop'],
    icons: ['sop_kinefx-rigattribvop'],
    refKey: 'SOP_kinefx-rigattribvop',
    render: () => (
      <g>
        {/* Background Rig Bone */}
        <path d="M5,19 L19,5" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
        <path d="M5,19 L19,5" stroke="#729fcf" strokeWidth="1.8" strokeLinecap="round" />
        {/* Rig joint circles */}
        <circle cx="5" cy="19" r="2.2" fill="#3465a4" stroke="#204a87" strokeWidth="0.8" />
        <circle cx="19" cy="5" r="2.2" fill="#3465a4" stroke="#204a87" strokeWidth="0.8" />
        {/* VOP Diamond Badge in foreground */}
        <polygon points="12,6.5 17.5,12 12,17.5 6.5,12" fill="#8ae234" stroke="#4e9a06" strokeWidth="1" strokeLinejoin="round" />
        {/* Letter V for VOP */}
        <path d="M9.5,10.2 L12,14.5 L14.5,10.2" fill="none" stroke="#204a87" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rigcopytransforms',
    label: 'Rig Copy Transforms',
    family: 'sop',
    description: 'Transform matrix copy curved arrow flowing from source rig joint to target joint.',
    types: ['rigcopytransforms'],
    icons: ['sop_kinefx-rigcopytransforms'],
    refKey: 'SOP_kinefx-rigcopytransforms',
    render: () => (
      <g>
        {/* Source bone (left, green) */}
        <path d="M5,18 L7.5,8" stroke="#4e9a06" strokeWidth="2" strokeLinecap="round" />
        <circle cx="5" cy="18" r="1.8" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.8" />
        <circle cx="7.5" cy="8" r="2.2" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.8" />
        {/* Target bone (right, blue) */}
        <path d="M19,18 L16.5,8" stroke="#204a87" strokeWidth="2" strokeLinecap="round" />
        <circle cx="19" cy="18" r="1.8" fill="#729fcf" stroke="#204a87" strokeWidth="0.8" />
        <circle cx="16.5" cy="8" r="2.2" fill="#729fcf" stroke="#204a87" strokeWidth="0.8" />
        {/* Curved copy transform transfer arrow across top */}
        <path d="M9,6.5 C11,4.5 13,4.5 15,6.5" fill="none" stroke="#262626" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M9,6.5 C11,4.5 13,4.5 15,6.5" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
        <polygon points="16.5,6.5 14,5 14.5,7.8" fill="#ffffff" stroke="#262626" strokeWidth="0.6" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rigdoctor',
    label: 'Rig Doctor',
    family: 'sop',
    description: 'Character rig skeleton with a red medical cross badge diagnosing bone orientations.',
    types: ['rigdoctor'],
    icons: ['sop_kinefx-rigdoctor'],
    refKey: 'SOP_kinefx-rigdoctor',
    render: () => (
      <g>
        {/* Skeleton stick figure in blue */}
        <circle cx="12" cy="4.5" r="1.5" fill="#729fcf" stroke="#204a87" strokeWidth="0.75" />
        <path d="M12,6 L12,12 M8,8 L16,8 M12,12 L8.5,19 M12,12 L15.5,19" stroke="#3465a4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Medical Cross Doctor Badge at bottom-right */}
        <circle cx="16.5" cy="15.5" r="5" fill="#ffffff" stroke="#262626" strokeWidth="0.85" />
        {/* Red cross (+) */}
        <path
          d="M15.2,12.5 L17.8,12.5 L17.8,14.2 L19.5,14.2 L19.5,16.8 L17.8,16.8 L17.8,18.5 L15.2,18.5 L15.2,16.8 L13.5,16.8 L13.5,14.2 L15.2,14.2 Z"
          fill="#ef2929"
          stroke="#8a0000"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rigmatchpose',
    label: 'Rig Match Pose',
    family: 'sop',
    description: 'Source skeleton pose snapping into alignment with target pose via green match arrow.',
    types: ['rigmatchpose'],
    icons: ['sop_kinefx-rigmatchpose'],
    refKey: 'SOP_kinefx-rigmatchpose',
    render: () => (
      <g>
        {/* Target pose silhouette (faint dashed blue) */}
        <circle cx="14" cy="5" r="1.4" fill="none" stroke="#729fcf" strokeWidth="0.9" strokeDasharray="1.2 1" />
        <path d="M14,6.4 L14,12.5 L10.5,19 M14,12.5 L17.5,19 M10.5,9.5 L17.5,9.5" fill="none" stroke="#729fcf" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1.5 1.2" />
        {/* Active source pose (solid blue) */}
        <circle cx="8" cy="6" r="1.4" fill="#3465a4" stroke="#204a87" strokeWidth="0.75" />
        <path d="M8,7.4 L8,13.5 L5,19 M8,13.5 L11,19 M5.5,10.5 L11.5,10.5" fill="none" stroke="#204a87" strokeWidth="1.5" strokeLinecap="round" />
        {/* Snapping match arrow in green pointing from source to target */}
        <path d="M9.5,6.5 L12.5,5.5" stroke="#4e9a06" strokeWidth="1.6" strokeLinecap="round" />
        <polygon points="13.2,5.2 11.2,5.2 12,6.5" fill="#8ae234" stroke="#4e9a06" strokeWidth="0.5" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rigmirrorpose',
    label: 'Rig Mirror Pose',
    family: 'sop',
    description: 'Symmetrical skeleton pose reflected across a vertical dashed mirror symmetry plane.',
    types: ['rigmirrorpose'],
    icons: ['sop_kinefx-rigmirrorpose'],
    refKey: 'SOP_kinefx-rigmirrorpose',
    render: () => (
      <g>
        {/* Vertical center mirror symmetry axis */}
        <line x1="12" y1="2" x2="12" y2="22" stroke="#729fcf" strokeWidth="0.85" strokeDasharray="1.5 1.2" />
        {/* Center head */}
        <circle cx="12" cy="4.5" r="1.5" fill="#eeeeec" stroke="#262626" strokeWidth="0.75" />
        {/* Spine */}
        <line x1="12" y1="6" x2="12" y2="13" stroke="#262626" strokeWidth="1.6" strokeLinecap="round" />
        {/* Left side limbs (blue) */}
        <path d="M12,8 L6.5,10 L4.5,14" fill="none" stroke="#3465a4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12,13 L8,16 L7,20" fill="none" stroke="#3465a4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right side mirrored limbs (green) */}
        <path d="M12,8 L17.5,10 L19.5,14" fill="none" stroke="#4e9a06" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12,13 L16,16 L17,20" fill="none" stroke="#4e9a06" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Horizontal mirror reflection indicator arrow */}
        <path d="M7,12 L17,12 M8.5,10.8 L7,12 L8.5,13.2 M15.5,10.8 L17,12 L15.5,13.2" fill="none" stroke="#262626" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rigpython',
    label: 'Rig Python',
    family: 'sop',
    description: 'Character skeleton bone hierarchy driven by a dual-tone Python script emblem.',
    types: ['rigpython'],
    icons: ['sop_kinefx-rigpython'],
    refKey: 'SOP_kinefx-rigpython',
    render: () => (
      <g>
        {/* Background Rig Bone */}
        <path d="M4,20 L20,4" stroke="#262626" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M4,20 L20,4" stroke="#729fcf" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="4" cy="20" r="2" fill="#3465a4" stroke="#204a87" strokeWidth="0.75" />
        <circle cx="20" cy="4" r="2" fill="#3465a4" stroke="#204a87" strokeWidth="0.75" />
        {/* Python emblem badge at center */}
        {/* Blue top-left snake */}
        <path
          d="M11,7 C8.8,7 7,7.8 7,9.5 L7,11 L11,11 L11,12 L6,12 C4.5,12 3.5,13 3.5,14.5 C3.5,16 4.5,17 6,17 L7,17 L7,15.5 C7,14 8,13 9.5,13 L12,13 C13,13 14,12 14,11 L14,9.5 C14,7.8 12.8,7 11,7 Z"
          fill="#3465a4"
          stroke="#204a87"
          strokeWidth="0.6"
        />
        <circle cx="8.5" cy="8.5" r="0.6" fill="#ffffff" />
        {/* Yellow bottom-right snake */}
        <path
          d="M13,17 C15.2,17 17,16.2 17,14.5 L17,13 L13,13 L13,12 L18,12 C19.5,12 20.5,11 20.5,9.5 C20.5,8 19.5,7 18,7 L17,7 L17,8.5 C17,10 16,11 14.5,11 L12,11 C11,11 10,12 10,13 L10,14.5 C10,16.2 11.2,17 13,17 Z"
          fill="#edd400"
          stroke="#c4a000"
          strokeWidth="0.6"
        />
        <circle cx="15.5" cy="15.5" r="0.6" fill="#262626" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rigstashpose',
    label: 'Rig Stash Pose',
    family: 'sop',
    description: 'Isometric pose card saving current skeleton joint transforms into memory storage.',
    types: ['ml_posegenerate', 'rigstashpose'],
    icons: ['sop_kinefx-rigstashpose', 'sop_ml_posegenerate'],
    refKey: 'SOP_kinefx-rigstashpose',
    render: () => (
      <g>
        <ellipse cx="12" cy="19" rx="8" ry="2.2" fill="#262626" fillOpacity="0.22" />
        {/* Golden Memory Stash Card */}
        <polygon points="12,4 19,7.5 19,16.5 12,20 5,16.5 5,7.5" fill="#edd400" stroke="#c4a000" strokeWidth="0.9" strokeLinejoin="round" />
        <polygon points="12,4 19,7.5 12,11 5,7.5" fill="#fce94f" stroke="#c4a000" strokeWidth="0.9" strokeLinejoin="round" />
        {/* Etched stick pose figure inside card */}
        <circle cx="12" cy="12.5" r="1.1" fill="#204a87" />
        <path d="M12,13.6 L12,16.5 M10,14.8 L14,14.8 M10.5,18.5 L12,16.5 L13.5,18.5" stroke="#204a87" strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round" />
        {/* Stash store arrow pointing down onto card */}
        <path d="M12,2 L12,6.5" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M12,2 L12,6.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
        <polygon points="12,7.5 10.2,5.5 13.8,5.5" fill="#ffffff" stroke="#262626" strokeWidth="0.6" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rop_fbxanimoutput',
    label: 'ROP FBX Animation Output',
    family: 'sop',
    description: 'Skeletal animation curve frames outputting through an export arrow to FBX disk container.',
    types: ['rop_fbxanimoutput'],
    icons: ['sop_kinefx-rop_fbxanimoutput'],
    refKey: 'SOP_kinefx-rop_fbxanimoutput',
    render: () => (
      <g>
        {/* Film / animation track frames */}
        <rect x="3" y="4" width="13" height="15" rx="1.5" fill="#eeeeec" stroke="#555753" strokeWidth="0.9" />
        {/* Film strip sprocket holes */}
        <rect x="4" y="5.5" width="2" height="1.8" rx="0.3" fill="#555753" />
        <rect x="4" y="8.5" width="2" height="1.8" rx="0.3" fill="#555753" />
        <rect x="4" y="11.5" width="2" height="1.8" rx="0.3" fill="#555753" />
        <rect x="4" y="14.5" width="2" height="1.8" rx="0.3" fill="#555753" />
        {/* Skeleton pose inside frame */}
        <circle cx="10.5" cy="8" r="1.1" fill="#729fcf" stroke="#204a87" strokeWidth="0.6" />
        <path d="M10.5,9.2 L10.5,13.5 M8.5,11 L12.5,11 M9,16 L10.5,13.5 L12,16" stroke="#3465a4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        {/* Export Outward Arrow in Red (ROP) */}
        <path d="M13,11.5 L19.5,11.5" stroke="#a40000" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M13,11.5 L19.5,11.5" stroke="#ef2929" strokeWidth="1.6" strokeLinecap="round" />
        <polygon points="22,11.5 18,9 18,14" fill="#ef2929" stroke="#a40000" strokeWidth="0.8" strokeLinejoin="round" />
      </g>
    ),
  },
];
