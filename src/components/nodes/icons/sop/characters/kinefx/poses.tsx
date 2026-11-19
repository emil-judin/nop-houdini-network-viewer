import { arrowHead, pts, roundedRectPath } from '../../../geoHelpers';
import { CasedStroke } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import { AttribTag, TAG_GLYPH } from '../../kits/attribTag';
import {
  KINEFX_BLUE_DARK,
  KINEFX_BLUE_MID,
  KINEFX_GREEN,
  KINEFX_OUTLINE,
  KinefxCalcBadge,
  KinefxSkeletonFigure,
  KinefxStandingFigure,
  KinefxTransformSphere,
} from '../../kits/kinefx';

/**
 * KineFX pose and transform operators.
 */
export const KINEFX_POSE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.computerigpose',
    label: 'Compute Rig Pose',
    family: 'sop',
    description: 'Blue KineFX skeleton figure on the upper left with a dark round calculator badge at the lower right.',
    types: ['computerigpose'],
    icons: ['sop_kinefx-computerigpose'],
    refKey: 'SOP_kinefx-computerigpose',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxSkeletonFigure x={9.8} y={10.8} scale={0.85} />
        <KinefxCalcBadge cx={16.8} cy={16.8} r={4.5} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.computetransform',
    label: 'Compute Transform',
    family: 'sop',
    description:
      'Translucent transform sphere with green and red rings on the upper left and a dark round calculator badge at the lower right.',
    types: ['computetransform'],
    icons: ['sop_kinefx-computetransform'],
    refKey: 'SOP_kinefx-computetransform',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxTransformSphere cx={10.2} cy={10.2} r={6.6} />
        <KinefxCalcBadge cx={16.8} cy={16.8} r={4.5} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rigcopytransforms',
    label: 'Rig Copy Transforms',
    family: 'sop',
    description: 'Two overlapping translucent transform spheres with green longitude rings and red equators.',
    types: ['rigcopytransforms'],
    icons: ['sop_kinefx-rigcopytransforms'],
    refKey: 'SOP_kinefx-rigcopytransforms',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxTransformSphere cx={9.4} cy={9.4} r={6.0} />
        <KinefxTransformSphere cx={14.6} cy={14.6} r={6.0} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rigmatchpose',
    label: 'Rig Match Pose',
    family: 'sop',
    description:
      'Larger blue figure on the left and smaller blue figure on the right with a curved green arrow rising along the bend of the leftmost arm.',
    types: ['rigmatchpose'],
    icons: ['sop_kinefx-rigmatchpose'],
    refKey: 'SOP_kinefx-rigmatchpose',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxStandingFigure x={8.6} y={13.0} scale={0.78} pose="mirror" fill={KINEFX_BLUE_MID} />
        <KinefxStandingFigure x={16.0} y={13.6} scale={0.68} pose="mirror" fill={KINEFX_BLUE_MID} />
        <CasedStroke d="M4.2,11.6 Q3.4,8.6 5.2,6.4" color={KINEFX_GREEN} width={1.2} />
        <polygon
          points={pts(arrowHead([6.0, 5.4], [4.6, 7.2], 2.2, 1.3))}
          fill={KINEFX_GREEN}
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.7"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rigmirrorpose',
    label: 'Rig Mirror Pose',
    family: 'sop',
    description:
      'Standing blue figure in a neutral pose without green joints, half-inside a translucent green-edged white mirror plane on the right.',
    types: ['rigmirrorpose'],
    icons: ['sop_kinefx-rigmirrorpose'],
    refKey: 'SOP_kinefx-rigmirrorpose',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxStandingFigure x={12.4} y={12.0} scale={0.92} pose="stand" />
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
    id: 'sop.kinefx.rigstashpose',
    label: 'Rig Stash Pose',
    family: 'sop',
    description:
      'Neutral standing blue KineFX figure on the left beside a yellow vertical stash block with a matching dark standing silhouette cutout on the right.',
    types: ['ml_posegenerate', 'rigstashpose'],
    icons: ['sop_kinefx-rigstashpose', 'sop_ml_posegenerate'],
    refKey: 'SOP_kinefx-rigstashpose',
    render: () => (
      <g strokeLinejoin="round">
        {/* Yellow stash wall on right */}
        <polygon
          points="11.4,4.2 19.6,2.8 19.6,20.8 11.4,19.2"
          fill="#f2c438"
          stroke={KINEFX_OUTLINE}
          strokeWidth="1.0"
        />
        {/* Matching dark standing silhouette cutout scaled to fit inside yellow block */}
        <KinefxStandingFigure x={15.6} y={12.0} scale={0.54} pose="stand" fill="#2e3338" headFill="#2e3338" />
        {/* Blue figure on left in matching neutral standing pose */}
        <KinefxStandingFigure x={7.8} y={12.4} scale={0.76} pose="stand" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.posedifference',
    label: 'Pose Difference',
    family: 'sop',
    description:
      'Two overlaid blue figures in different poses above a bright green four-way cross arrow with all four arrowheads.',
    types: ['posedifference'],
    icons: ['sop_kinefx-posedifference'],
    refKey: 'SOP_kinefx-posedifference',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxStandingFigure x={12} y={9.8} scale={0.85} fill={KINEFX_BLUE_DARK} opacity={0.75} pose="tpose" />
        <KinefxStandingFigure x={12} y={11.4} scale={0.82} fill={KINEFX_BLUE_MID} pose="mirror" />
        {/* Green 4-way cross arrow with longer vertical bar extending downwards and aligned down arrowhead */}
        <CasedStroke d="M5.4,17.2 H18.6 M12.0,14.6 V20.4" color={KINEFX_GREEN} width={1.45} />
        <polygon
          points={pts(arrowHead([3.8, 17.2], [6.8, 17.2], 2.3, 1.4))}
          fill={KINEFX_GREEN}
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.65"
        />
        <polygon
          points={pts(arrowHead([20.2, 17.2], [17.2, 17.2], 2.3, 1.4))}
          fill={KINEFX_GREEN}
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.65"
        />
        <polygon
          points={pts(arrowHead([12.0, 13.4], [12.0, 15.8], 2.1, 1.3))}
          fill={KINEFX_GREEN}
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.65"
        />
        <polygon
          points={pts(arrowHead([12.0, 22.1], [12.0, 19.6], 2.1, 1.3))}
          fill={KINEFX_GREEN}
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.65"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rigattribvop',
    label: 'Rig Attribute VOP',
    family: 'sop',
    description:
      'Standing blue KineFX figure on the left beside a beveled VOP V emblem on the lower right with purple upper arms, yellow flames in the middle, and a red base.',
    types: ['rigattribvop'],
    icons: ['sop_kinefx-rigattribvop'],
    refKey: 'SOP_kinefx-rigattribvop',
    render: (uid) => (
      <g strokeLinejoin="round">
        <defs>
          <clipPath id={`${uid}-vclip`}>
            <polygon points="11.6,12.8 13.4,11.8 14.9,12.7 16.4,15.6 17.9,12.7 19.4,11.8 21.2,12.8 16.4,20.8" />
          </clipPath>
        </defs>
        <KinefxStandingFigure x={8.6} y={11.8} scale={0.92} />
        {/* Beveled VOP V emblem: purple upper arms, yellow flames, red lower base */}
        <g clipPath={`url(#${uid}-vclip)`}>
          <rect x="11" y="11" width="11" height="11" fill="#9b66d4" />
          <path
            d="M11.6,15.4 L13.6,16.8 L14.2,14.5 L15.5,16.6 L16.4,15.2 L17.3,16.6 L18.6,14.5 L19.2,16.8 L21.2,15.4 L16.4,21.0 Z"
            fill="#ffe47a"
          />
          <path
            d="M12.6,16.8 L14.3,17.8 L14.8,16.2 L15.9,17.6 L16.4,16.6 L16.9,17.6 L18.0,16.2 L18.5,17.8 L20.2,16.8 L16.4,21.0 Z"
            fill="#e03228"
          />
          <polygon
            points="11.6,12.8 13.4,11.8 14.9,12.7 16.4,15.6 17.9,12.7 19.4,11.8 21.2,12.8 16.4,20.8"
            fill="none"
            stroke="#f2c438"
            strokeWidth="1.2"
          />
        </g>
        <polygon
          points="11.6,12.8 13.4,11.8 14.9,12.7 16.4,15.6 17.9,12.7 19.4,11.8 21.2,12.8 16.4,20.8"
          fill="none"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.95"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.rigpython',
    label: 'Rig Python',
    family: 'sop',
    description:
      'Standing blue KineFX figure with green joints on the left beside the blue-and-yellow Python snakes emblem on the lower right.',
    types: ['rigpython'],
    icons: ['sop_kinefx-rigpython'],
    refKey: 'SOP_kinefx-rigpython',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxStandingFigure x={8.4} y={11.8} scale={0.92} showJoints />
        {/* Compact Python snakes emblem */}
        <g transform="translate(16.6 16.4) scale(0.55)">
          <path
            d="M0,-7.5 C-3.8,-7.5 -3.6,-5.8 -3.6,-5.8 L-3.6,-4.0 L0.2,-4.0 L0.2,-3.4 L-5.0,-3.4 C-5.0,-3.4 -7.5,-3.7 -7.5,0.2 C-7.5,4.1 -5.3,3.9 -5.3,3.9 L-4.0,3.9 L-4.0,2.0 C-4.0,2.0 -4.1,-0.2 -1.8,-0.2 L2.0,-0.2 C2.0,-0.2 3.8,-0.2 3.8,-2.0 L3.8,-5.5 C3.8,-5.5 4.1,-7.5 0,-7.5 Z"
            fill={KINEFX_BLUE_DARK}
            stroke={KINEFX_OUTLINE}
            strokeWidth="1.5"
          />
          <path
            d="M0,7.5 C3.8,7.5 3.6,5.8 3.6,5.8 L3.6,4.0 L-0.2,4.0 L-0.2,3.4 L5.0,3.4 C5.0,3.4 7.5,3.7 7.5,-0.2 C7.5,-4.1 5.3,-3.9 5.3,-3.9 L4.0,-3.9 L4.0,-2.0 C4.0,-2.0 4.1,0.2 1.8,0.2 L-2.0,0.2 C-2.0,0.2 -3.8,0.2 -3.8,2.0 L-3.8,5.5 C-3.8,5.5 -4.1,7.5 0,7.5 Z"
            fill="#f2c438"
            stroke={KINEFX_OUTLINE}
            strokeWidth="1.5"
          />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.kinefx.attribtransformcompute',
    label: 'Attribute Transform Compute',
    family: 'sop',
    description: 'White attribute tag with a grey pin and a calculator inside square brackets in the panel.',
    types: ['attribtransformcompute'],
    icons: ['sop_kinefx-attribtransformcompute'],
    refKey: 'SOP_kinefx-attribtransformcompute',
    render: (uid) => (
      <AttribTag uid={uid}>
        <g strokeLinejoin="round">
          <path
            d={`M${TAG_GLYPH.x0 + 1.2},${TAG_GLYPH.y0 + 0.6} H${TAG_GLYPH.x0 + 0.2} V${TAG_GLYPH.y1 - 0.6} H${TAG_GLYPH.x0 + 1.2} M${TAG_GLYPH.x1 - 1.2},${TAG_GLYPH.y0 + 0.6} H${TAG_GLYPH.x1 - 0.2} V${TAG_GLYPH.y1 - 0.6} H${TAG_GLYPH.x1 - 1.2}`}
            fill="none"
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.9"
          />
          <path
            d={roundedRectPath(TAG_GLYPH.cx - 2.3, TAG_GLYPH.cy - 2.9, 4.6, 5.8, 0.5)}
            fill="#eef2f7"
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.75"
          />
          <rect
            x={TAG_GLYPH.cx - 1.6}
            y={TAG_GLYPH.cy - 2.2}
            width="3.2"
            height="1.2"
            fill={KINEFX_GREEN}
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.6"
          />
          <circle cx={TAG_GLYPH.cx - 1.0} cy={TAG_GLYPH.cy + 0.5} r="0.4" fill="#3a3f47" />
          <circle cx={TAG_GLYPH.cx} cy={TAG_GLYPH.cy + 0.5} r="0.4" fill="#3a3f47" />
          <circle cx={TAG_GLYPH.cx + 1.0} cy={TAG_GLYPH.cy + 0.5} r="0.4" fill="#3a3f47" />
          <circle cx={TAG_GLYPH.cx - 1.0} cy={TAG_GLYPH.cy + 1.7} r="0.4" fill="#3a3f47" />
          <circle cx={TAG_GLYPH.cx} cy={TAG_GLYPH.cy + 1.7} r="0.4" fill="#3a3f47" />
          <circle cx={TAG_GLYPH.cx + 1.0} cy={TAG_GLYPH.cy + 1.7} r="0.4" fill="#3a3f47" />
        </g>
      </AttribTag>
    ),
  },
  {
    id: 'sop.kinefx.attribtransformextract',
    label: 'Attribute Transform Extract',
    family: 'sop',
    description:
      'Four small white attribute tags arranged in a 2x2 grid pointing inward, showing transform and cube glyphs.',
    types: ['attribtransformextract'],
    icons: ['sop_kinefx-attribtransformextract'],
    refKey: 'SOP_kinefx-attribtransformextract',
    render: () => (
      <g strokeLinejoin="round">
        {/* Top-left tag: rotation ring */}
        <path
          d="M2.8,2.8 H10.4 V8.4 H7.8 L10.2,10.8 L6.2,8.4 H2.8 Z"
          fill="#f2f4f7"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.85"
        />
        <ellipse cx="6.6" cy="5.6" rx="2.2" ry="1.3" fill="none" stroke={KINEFX_BLUE_DARK} strokeWidth="0.75" />
        {/* Top-right tag: cube */}
        <path
          d="M13.6,2.8 H21.2 V8.4 H17.8 L13.8,10.8 L16.2,8.4 H13.6 Z"
          fill="#f2f4f7"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.85"
        />
        <polygon
          points="17.4,3.8 19.4,4.9 19.4,6.7 17.4,7.8 15.4,6.7 15.4,4.9"
          fill="#c0c7d1"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.7"
        />
        {/* Bottom-left tag: gizmo sphere */}
        <path
          d="M2.8,15.4 H6.2 L10.2,13.0 L7.8,15.4 H10.4 V21.0 H2.8 Z"
          fill="#f2f4f7"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.85"
        />
        <circle cx="6.6" cy="18.2" r="1.8" fill={KINEFX_BLUE_MID} stroke={KINEFX_OUTLINE} strokeWidth="0.7" />
        {/* Bottom-right tag: box */}
        <path
          d="M13.6,15.4 H16.2 L13.8,13.0 L17.8,15.4 H21.2 V21.0 H13.6 Z"
          fill="#f2f4f7"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.85"
        />
        <rect x="15.6" y="16.6" width="3.6" height="2.8" fill="#89929e" stroke={KINEFX_OUTLINE} strokeWidth="0.7" />
      </g>
    ),
  },
];
