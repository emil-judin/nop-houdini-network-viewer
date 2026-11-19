import { pts } from '../../../geoHelpers';
import { CasedStroke, StraightArrow } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import {
  KINEFX_BLUE_LIGHT,
  KINEFX_GREEN,
  KINEFX_OUTLINE,
  KinefxGearBadge,
  KinefxJointLimb,
  KinefxSkeletonFigure,
  KinefxStandingFigure,
} from '../../kits/kinefx';

/**
 * KineFX joint and rig visualization operators.
 */
export const KINEFX_JOINT_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.skeleton',
    label: 'Skeleton',
    family: 'sop',
    description: 'Blue KineFX action-pose figure with bright green joint balls and bone lines.',
    types: ['skeleton'],
    icons: ['sop_kinefx-skeleton'],
    refKey: 'SOP_kinefx-skeleton',
    render: () => <KinefxSkeletonFigure />,
  },
  {
    id: 'sop.kinefx.skeletonblend',
    label: 'Skeleton Blend',
    family: 'sop',
    description:
      'Blue KineFX skeleton figure on the left blending into an orange wireframe skeleton figure on the right.',
    types: ['skeletonblend'],
    icons: ['sop_kinefx-skeletonblend', 'sop_kinefx-skeletonblend-2.0', 'sop_kinefx-skeletonblend-3.0'],
    refKey: 'SOP_kinefx-skeletonblend',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxSkeletonFigure x={9.8} y={12.4} scale={0.92} />
        {/* Orange wireframe skeleton on the right */}
        <g stroke="#ee8624" strokeWidth="0.9" fill="none" strokeLinecap="round">
          <circle cx="16.8" cy="5.6" r="1.2" fill="#ffb066" stroke={KINEFX_OUTLINE} strokeWidth="0.7" />
          <path d="M16.8,7.0 L16.8,11.6 M14.8,8.2 L18.8,8.2 L19.8,10.6 M14.8,8.2 L13.8,6.2 M16.8,11.6 L14.8,15.4 L13.6,18.8 M16.8,11.6 L18.8,15.6 L20.8,18.8" />
        </g>
        {[
          [16.8, 8.2],
          [16.8, 11.6],
          [14.8, 15.4],
          [18.8, 15.6],
        ].map(([jx, jy], idx) => (
          <circle key={idx} cx={jx} cy={jy} r="0.65" fill="#ee8624" stroke={KINEFX_OUTLINE} strokeWidth="0.6" />
        ))}
      </g>
    ),
  },
  {
    id: 'sop.kinefx.skeletonmirror',
    label: 'Skeleton Mirror',
    family: 'sop',
    description:
      'Standing blue KineFX figure with green joints half-inside a translucent green-edged white mirror plane on the right.',
    types: ['skeletonmirror'],
    icons: ['sop_kinefx-skeletonmirror'],
    refKey: 'SOP_kinefx-skeletonmirror',
    render: () => (
      <g strokeLinejoin="round">
        {/* Standing skeleton figure positioned half inside the mirror */}
        <KinefxStandingFigure x={12.4} y={12.0} scale={0.92} showJoints />
        {/* Translucent tall green-edged mirror plane overlaying the right half */}
        <polygon
          points="12.6,2.8 20.6,2.0 20.6,21.8 12.6,20.4"
          fill="#eef2f7"
          fillOpacity="0.6"
          stroke={KINEFX_OUTLINE}
          strokeOpacity="0.55"
          strokeWidth="1.0"
        />
        <polygon
          points="13.0,3.3 20.0,2.6 20.0,21.1 13.0,19.8"
          fill="none"
          stroke={KINEFX_GREEN}
          strokeOpacity="0.6"
          strokeWidth="0.9"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.deletejoints',
    label: 'Delete Joints',
    family: 'sop',
    description: 'Bent blue bone limb with three green joint balls and a bold red X over the lower elbow joint.',
    types: ['deletejoints'],
    icons: ['sop_kinefx-deletejoints'],
    refKey: 'SOP_kinefx-deletejoints',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxJointLimb scale={1.04} />
        <CasedStroke d="M8.8,13.8 L14.0,19.0 M14.0,13.8 L8.8,19.0" color="#ff7066" width={1.5} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.parentjoints',
    label: 'Parent Joints',
    family: 'sop',
    description:
      'Bent blue bone limb with five-fingered hand, three green joint balls, and two cased red arrows pointing along the bones.',
    types: ['parentjoints'],
    icons: ['sop_kinefx-parentjoints'],
    refKey: 'SOP_kinefx-parentjoints',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxJointLimb />
        <StraightArrow from={[5.6, 9.6]} tip={[8.4, 15.0]} color="#e03228" width={1.2} head={2.4} />
        <StraightArrow from={[13.2, 17.2]} tip={[17.8, 12.2]} color="#e03228" width={1.2} head={2.4} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.orientjoints',
    label: 'Orient Joints',
    family: 'sop',
    description:
      'Bent blue bone limb with five-fingered hand and a neon green gimbal circle, lower half red arc, and right half blue arc around the elbow joint.',
    types: ['orientjoints'],
    icons: ['sop_kinefx-orientjoints'],
    refKey: 'SOP_kinefx-orientjoints',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxJointLimb />
        {/* Gimbal rings around elbow (11.4, 16.6): full neon green, lower-half red, right-half blue */}
        <circle cx="11.4" cy="16.6" r="4.0" fill="none" stroke={KINEFX_OUTLINE} strokeWidth="1.9" />
        <circle cx="11.4" cy="16.6" r="4.0" fill="none" stroke="#39ff14" strokeWidth="1.2" />
        <path
          d="M7.4,16.6 A4.0,1.5 0 0,0 15.4,16.6"
          fill="none"
          stroke={KINEFX_OUTLINE}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7.4,16.6 A4.0,1.5 0 0,0 15.4,16.6"
          fill="none"
          stroke="#e03228"
          strokeWidth="0.85"
          strokeLinecap="round"
        />
        <path
          d="M11.4,12.6 A1.5,4.0 0 0,1 11.4,20.6"
          fill="none"
          stroke={KINEFX_OUTLINE}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M11.4,12.6 A1.5,4.0 0 0,1 11.4,20.6"
          fill="none"
          stroke={KINEFX_BLUE_LIGHT}
          strokeWidth="0.85"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.groupjoints',
    label: 'Group Joints',
    family: 'sop',
    description:
      'Bent blue bone limb without hand, with three green joint balls encircled by a tilted dashed orange group ring.',
    types: ['groupjoints'],
    icons: ['sop_kinefx-groupjoints'],
    refKey: 'SOP_kinefx-groupjoints',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxJointLimb showHand={false} />
        <g transform="translate(1.4 0.4) rotate(-44 12.8 13.0)">
          <ellipse
            cx="12.8"
            cy="13.0"
            rx="7.6"
            ry="4.2"
            fill="none"
            stroke={KINEFX_OUTLINE}
            strokeWidth="2.3"
            strokeDasharray="2.2 1.4"
          />
          <ellipse
            cx="12.8"
            cy="13.0"
            rx="7.6"
            ry="4.2"
            fill="none"
            stroke="#ee8624"
            strokeWidth="1.25"
            strokeDasharray="2.2 1.4"
          />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.kinefx.configurejointlimits',
    label: 'Configure Joint Limits',
    family: 'sop',
    description: 'Bent blue bone limb with a dark round gear badge sitting over the lower elbow joint.',
    types: ['configurejointlimits', 'configurejoints'],
    icons: ['sop_kinefx-configurejointlimits', 'sop_kinefx-configurejoints'],
    refKey: 'SOP_kinefx-configurejointlimits',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxJointLimb />
        <KinefxGearBadge cx={11.4} cy={16.8} r={4.2} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.configurerigvis',
    label: 'Configure Rig Visualizers',
    family: 'sop',
    description:
      'Standing blue KineFX figure with red wireframe boxes on head, right hand, and left foot, and green boxes on hips, left hand, and right foot.',
    types: ['configurerigvis'],
    icons: ['sop_kinefx-configurerigvis', 'sop_kinefx-configurerigvis-2.0'],
    refKey: 'SOP_kinefx-configurerigvis',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxStandingFigure x={12} y={12} scale={0.94} />
        {/* Wireframe boxes around head, hips, hands, feet with dark casing */}
        <g fill="none" stroke={KINEFX_OUTLINE} strokeWidth="1.55">
          <rect x="9.6" y="2.8" width="4.8" height="4.2" rx="0.5" />
          <rect x="8.8" y="11.4" width="6.4" height="3.0" rx="0.5" />
          <rect x="4.6" y="12.2" width="3.2" height="2.6" rx="0.4" />
          <rect x="16.2" y="12.2" width="3.2" height="2.6" rx="0.4" />
          <rect x="7.8" y="18.6" width="3.2" height="2.4" rx="0.4" />
          <rect x="13.0" y="18.6" width="3.2" height="2.4" rx="0.4" />
        </g>
        <g fill="none" stroke={KINEFX_GREEN} strokeWidth="0.85">
          <rect x="8.8" y="11.4" width="6.4" height="3.0" rx="0.5" />
          <rect x="4.6" y="12.2" width="3.2" height="2.6" rx="0.4" />
          <rect x="13.0" y="18.6" width="3.2" height="2.4" rx="0.4" />
        </g>
        <g fill="none" stroke="#e03228" strokeWidth="0.85">
          <rect x="9.6" y="2.8" width="4.8" height="4.2" rx="0.5" />
          <rect x="16.2" y="12.2" width="3.2" height="2.6" rx="0.4" />
          <rect x="7.8" y="18.6" width="3.2" height="2.4" rx="0.4" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.kinefx.visrig',
    label: 'Visualize Rig',
    family: 'sop',
    description: 'Standing blue KineFX figure behind a bright green X-ray screen showing white skeleton bones.',
    types: ['visrig'],
    icons: ['sop_kinefx-visrig'],
    refKey: 'SOP_kinefx-visrig',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxStandingFigure x={12} y={12} scale={0.96} />
        {/* Green X-ray screen */}
        <rect
          x="5.6"
          y="7.0"
          width="12.8"
          height="9.4"
          rx="1.0"
          fill={KINEFX_GREEN}
          fillOpacity="0.88"
          stroke={KINEFX_OUTLINE}
          strokeWidth="1.0"
        />
        {/* White skeleton bones inside screen */}
        <path
          d="M12.0,8.2 V13.0 M9.2,9.2 H14.8 M9.2,9.2 L7.6,12.2 M14.8,9.2 L16.4,12.2 M10.4,13.0 H13.6 M10.4,13.0 L9.8,15.4 M13.6,13.0 L14.2,15.4"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rigdoctor',
    label: 'Rig Doctor',
    family: 'sop',
    description:
      'Standing blue KineFX figure behind a red diagnostic X-ray screen with white bones and a red medical cross at the lower right.',
    types: ['rigdoctor'],
    icons: ['sop_kinefx-rigdoctor'],
    refKey: 'SOP_kinefx-rigdoctor',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxStandingFigure x={11.0} y={11.8} scale={0.94} />
        {/* Red X-ray screen */}
        <rect
          x="4.8"
          y="6.8"
          width="12.4"
          height="9.0"
          rx="1.0"
          fill="#e03228"
          fillOpacity="0.9"
          stroke={KINEFX_OUTLINE}
          strokeWidth="1.0"
        />
        {/* White skeleton bones inside screen */}
        <path
          d="M11.0,8.0 V12.6 M8.4,9.0 H13.6 M8.4,9.0 L7.0,11.8 M13.6,9.0 L15.0,11.8 M9.6,12.6 H12.4 M9.6,12.6 L9.0,14.8 M12.4,12.6 L13.0,14.8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.0"
          strokeLinecap="round"
        />
        {/* Red medical cross at lower right */}
        <polygon
          points={pts([
            [16.2, 13.8],
            [18.4, 13.8],
            [18.4, 16.0],
            [20.6, 16.0],
            [20.6, 18.2],
            [18.4, 18.2],
            [18.4, 20.4],
            [16.2, 20.4],
            [16.2, 18.2],
            [14.0, 18.2],
            [14.0, 16.0],
            [16.2, 16.0],
          ])}
          fill="#e03228"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.9"
        />
      </g>
    ),
  },
];
