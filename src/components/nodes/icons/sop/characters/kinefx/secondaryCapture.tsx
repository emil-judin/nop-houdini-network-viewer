import { arrowHead, pts, roundedRectPath } from '../../../geoHelpers';
import { ShadedSphere } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import { AgentBust } from '../../kits/agents';
import {
  KINEFX_BLUE_DARK,
  KINEFX_BLUE_MID,
  KINEFX_GREEN,
  KINEFX_OUTLINE,
  KinefxBaldHead,
  KinefxStandingFigure,
} from '../../kits/kinefx';
import { SolverBrain } from '../../kits/solverBrain';

const OUTLINE = '#262626';

/**
 * KineFX secondary motion, ragdoll, capture and blend shape operators.
 */
export const KINEFX_SECONDARY_CAPTURE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.secondarymotion',
    label: 'Secondary Motion',
    family: 'sop',
    description: 'Classic side-view tan and white dog facing left with translucent wagging tail ghosts.',
    types: ['secondarymotion'],
    icons: ['sop_kinefx-secondarymotion'],
    refKey: 'SOP_kinefx-secondarymotion',
    render: () => (
      <g strokeLinejoin="round">
        {/* Translucent wagging tail ghosts */}
        <path
          d="M16.4,11.6 Q19.2,7.2 20.6,5.8"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1.6"
          strokeOpacity="0.45"
          strokeLinecap="round"
        />
        <path
          d="M16.4,11.8 Q19.8,9.2 21.0,8.2"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1.6"
          strokeOpacity="0.7"
          strokeLinecap="round"
        />
        <path
          d="M16.4,12.0 Q18.8,10.6 20.4,10.4"
          fill="none"
          stroke={KINEFX_OUTLINE}
          strokeWidth="2.0"
          strokeLinecap="round"
        />
        <path
          d="M16.4,12.0 Q18.8,10.6 20.4,10.4"
          fill="none"
          stroke="#e8c48a"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Side-view dog body and four legs */}
        <path
          d="M7.6,10.6 L15.4,11.2 Q16.8,11.4 16.8,13.0 L17.4,18.8 L15.8,18.8 L15.0,15.0 L13.8,18.8 L12.4,18.8 L13.0,14.8 L9.4,14.8 L8.8,18.8 L7.4,18.8 L7.6,14.6 L6.2,18.4 L4.8,17.8 L6.6,12.6 Z"
          fill="#e8c48a"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.95"
        />
        {/* Side-view head, snout and floppy ear */}
        <path
          d="M4.2,9.2 L6.4,7.4 Q8.2,6.8 9.2,8.4 L9.2,11.2 L6.4,11.2 L4.2,10.4 Z"
          fill="#f2f4f7"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.9"
        />
        <ellipse cx="8.2" cy="9.6" rx="1.0" ry="1.8" fill="#a8783c" stroke={KINEFX_OUTLINE} strokeWidth="0.75" />
        <circle cx="4.5" cy="9.4" r="0.55" fill={KINEFX_OUTLINE} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.pendulummotion',
    label: 'Pendulum Motion',
    family: 'sop',
    description: 'Dark grey shaded wrecking ball swinging down-right on a diagonal chain with yellow motion streaks.',
    types: ['pendulummotion'],
    icons: ['sop_kinefx-pendulummotion'],
    refKey: 'SOP_kinefx-pendulummotion',
    render: (uid) => (
      <g strokeLinejoin="round">
        <path
          d="M4.2,14.8 Q7.2,16.8 10.2,16.6 M5.4,18.0 Q8.4,19.6 11.4,19.0"
          fill="none"
          stroke="#f2c438"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <line
          x1="9.2"
          y1="3.4"
          x2="13.8"
          y2="13.8"
          stroke={KINEFX_OUTLINE}
          strokeWidth="1.4"
          strokeDasharray="1.8 1.2"
          strokeLinecap="round"
        />
        <ShadedSphere
          id={`${uid}-ball`}
          cx={15.0}
          cy={15.8}
          r={4.6}
          tones={['#c0c7d1', '#5a616b', '#2e3338']}
          strokeWidth={1.0}
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.projectilemotion',
    label: 'Projectile Motion',
    family: 'sop',
    description: 'Wheeled cannon on the lower left firing a large orange and yellow smoke cloud up-right.',
    types: ['projectilemotion'],
    icons: ['sop_kinefx-projectilemotion'],
    refKey: 'SOP_kinefx-projectilemotion',
    render: () => (
      <g strokeLinejoin="round">
        {/* Smoke/flame cloud shifted slightly right and down */}
        <g transform="translate(0.9 1.0)">
          <path
            d="M10.4,11.6 C10.4,8.6 13.0,6.6 15.6,7.0 C16.8,4.6 20.6,5.2 20.8,8.2 C21.8,10.2 20.0,12.8 17.4,12.6 C15.8,14.2 12.6,13.8 11.4,12.4 Z"
            fill="#ffb066"
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.95"
          />
          <circle cx="14.0" cy="10.4" r="2.0" fill="#ee8624" />
        </g>
        {/* Cannon barrel */}
        <polygon
          points="4.6,16.4 12.2,11.4 13.4,13.6 6.2,18.6"
          fill="#5a616b"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.95"
        />
        {/* Wheel */}
        <circle cx="7.4" cy="17.8" r="2.6" fill="#a8783c" stroke={KINEFX_OUTLINE} strokeWidth="0.95" />
        <circle cx="7.4" cy="17.8" r="0.9" fill="#f2c438" stroke={KINEFX_OUTLINE} strokeWidth="0.6" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.ragdollcollisionshapes',
    label: 'Ragdoll Collision Shapes',
    family: 'sop',
    description:
      'Translucent glass sphere enclosing a green stick figure shifted lower down with legs extending below.',
    types: ['ragdollcollisionshapes'],
    icons: ['sop_kinefx-ragdollcollisionshapes'],
    refKey: 'SOP_kinefx-ragdollcollisionshapes',
    render: () => (
      <g strokeLinejoin="round">
        <circle
          cx="12.0"
          cy="10.4"
          r="7.2"
          fill="#eef2f7"
          fillOpacity="0.55"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.95"
        />
        {/* Green stick figure shifted further down, no black outline on head */}
        <circle cx="12.0" cy="8.8" r="1.45" fill={KINEFX_GREEN} />
        <path
          d="M12.0,10.4 V15.6 M12.0,12.0 L8.4,10.0 M12.0,12.0 L15.6,10.0 M12.0,15.6 L9.8,21.2 M12.0,15.6 L14.2,21.2"
          fill="none"
          stroke={KINEFX_GREEN}
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        {/* Sphere highlight */}
        <path
          d="M7.6,6.6 A5.2,5.2 0 0,1 11.4,4.8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.0"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.ragdollsolver',
    label: 'Ragdoll Solver',
    family: 'sop',
    description:
      'Tilted stitched blue-overalls and orange-tan ragdoll from Test Simulation Ragdoll on the upper left with a pink solver brain at the lower right.',
    types: ['ragdollsolver'],
    icons: ['sop_kinefx-ragdollsolver'],
    refKey: 'SOP_kinefx-ragdollsolver',
    render: () => (
      <g strokeLinejoin="round">
        {/* Reused blue/brown ragdoll from sop.testsim_ragdoll */}
        <g transform="translate(1.2 1.2) scale(0.76)">
          <path
            d="M8.6,10.2 L5.1,11.4 L5.7,13.3 L9.4,12.4 Z"
            fill="#ee8624"
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.95"
          />
          <path
            d="M14.0,9.4 L18.2,10.4 L17.6,12.4 L13.4,11.6 Z"
            fill="#ee8624"
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.95"
          />
          <ellipse cx="10.4" cy="19.6" rx="1.6" ry="1.1" fill="#ffffff" stroke={KINEFX_OUTLINE} strokeWidth="0.9" />
          <ellipse cx="16.4" cy="19.4" rx="1.6" ry="1.1" fill="#ffffff" stroke={KINEFX_OUTLINE} strokeWidth="0.9" />
          <path
            d="M9.2,10.6 L14.4,9.8 L15.6,14.8 L17.2,18.4 L14.6,19.0 L13.2,15.6 L11.8,19.0 L9.2,18.4 L10.2,14.8 Z"
            fill="#5aa2f2"
            stroke={KINEFX_OUTLINE}
            strokeWidth="1.05"
          />
          <polygon
            points="11.1,11.2 13.7,10.8 13.9,13.4 11.3,13.8"
            fill="#ffffff"
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.85"
          />
          <path
            d="M12.5,12.8 L11.7,12.0 C11.4,11.6 11.8,11.1 12.3,11.4 L12.5,11.6 L12.7,11.4 C13.2,11.1 13.6,11.6 13.3,12.0 Z"
            fill="#e03228"
          />
          <path
            d="M7.9,5.8 L4.7,5.2 L5.5,7.4 L7.9,7.0 Z M14.5,4.8 L17.7,4.0 L16.9,6.4 L14.5,6.2 Z"
            fill="#3a3f47"
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.9"
          />
          <circle cx="7.8" cy="6.2" r="0.7" fill="#e03228" />
          <circle cx="14.6" cy="5.4" r="0.7" fill="#e03228" />
          <circle cx="11.3" cy="7.2" r="3.4" fill="#ffb066" stroke={KINEFX_OUTLINE} strokeWidth="1.1" />
          <path
            d="M8.1,6.2 C8.5,4.2 10.0,3.6 11.4,3.7 C12.9,3.8 14.2,4.5 14.5,6.0 C13.2,5.3 12.1,5.3 11.3,5.8 C10.4,5.3 9.2,5.4 8.1,6.2 Z"
            fill="#3a3f47"
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.85"
          />
          <circle cx="10.2" cy="7.1" r="0.55" fill={KINEFX_OUTLINE} />
          <circle cx="12.2" cy="6.8" r="0.55" fill={KINEFX_OUTLINE} />
          <path
            d="M10.1,8.5 Q11.5,9.3 12.7,8.2"
            fill="none"
            stroke={KINEFX_OUTLINE}
            strokeWidth="0.85"
            strokeLinecap="round"
          />
        </g>
        <SolverBrain cx={15.8} cy={16.6} scale={0.76} />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.attachjointgeo',
    label: 'Attach Joint Geo',
    family: 'sop',
    description:
      'Standing blue KineFX figure with bright green wireframe boxes attached around head, torso, hands, and feet.',
    types: ['attachjointgeo'],
    icons: ['sop_kinefx-attachjointgeo'],
    refKey: 'SOP_kinefx-attachjointgeo',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxStandingFigure x={12} y={12} scale={0.96} />
        <g fill="none" stroke={KINEFX_OUTLINE} strokeWidth="1.9">
          <rect x="9.6" y="2.8" width="4.8" height="4.2" rx="0.4" />
          <rect x="8.8" y="8.2" width="6.4" height="5.2" rx="0.4" />
          <rect x="4.6" y="12.0" width="3.2" height="2.8" rx="0.4" />
          <rect x="16.2" y="12.0" width="3.2" height="2.8" rx="0.4" />
          <rect x="7.8" y="18.6" width="3.2" height="2.4" rx="0.4" />
          <rect x="13.0" y="18.6" width="3.2" height="2.4" rx="0.4" />
        </g>
        <g fill="none" stroke={KINEFX_GREEN} strokeWidth="0.95">
          <rect x="9.6" y="2.8" width="4.8" height="4.2" rx="0.4" />
          <rect x="8.8" y="8.2" width="6.4" height="5.2" rx="0.4" />
          <rect x="4.6" y="12.0" width="3.2" height="2.8" rx="0.4" />
          <rect x="16.2" y="12.0" width="3.2" height="2.8" rx="0.4" />
          <rect x="7.8" y="18.6" width="3.2" height="2.4" rx="0.4" />
          <rect x="13.0" y="18.6" width="3.2" height="2.4" rx="0.4" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.kinefx.capturepackedgeo',
    label: 'Capture Packed Geometry',
    family: 'sop',
    description: 'Blue T-pose figure wearing a yellow straw hat and a bright green backpack.',
    types: ['capturepackedgeo'],
    icons: ['sop_kinefx-capturepackedgeo'],
    refKey: 'SOP_kinefx-capturepackedgeo',
    render: () => (
      <g strokeLinejoin="round">
        {/* Wider green backpack */}
        <path
          d={roundedRectPath(7.2, 8.0, 9.6, 6.2, 1.4)}
          fill={KINEFX_GREEN}
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.95"
        />
        <KinefxStandingFigure x={12} y={12.4} scale={0.92} pose="tpose" />
        {/* Yellow straw hat */}
        <ellipse cx="12.0" cy="5.0" rx="4.2" ry="1.1" fill="#f2c438" stroke={KINEFX_OUTLINE} strokeWidth="0.85" />
        <path d="M9.6,4.8 Q12.0,2.2 14.4,4.8 Z" fill="#ffe47a" stroke={KINEFX_OUTLINE} strokeWidth="0.8" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.jointcapturebiharmonic',
    label: 'Joint Capture Biharmonic',
    family: 'sop',
    description:
      'Blue agent upper-body bust with an unoutlined white head sphere connected to a white spine and ribcage skeleton inside.',
    types: ['jointcapturebiharmonic'],
    icons: ['sop_kinefx-jointcapturebiharmonic'],
    refKey: 'SOP_kinefx-jointcapturebiharmonic',
    render: () => (
      <g strokeLinejoin="round">
        <AgentBust cx={12} cy={13.0} scale={1.25} />
        {/* White head sphere without black outline, connected to spine */}
        <circle cx="12" cy="5.2" r="1.45" fill="#ffffff" />
        <path
          d="M12.0,5.2 V19.6 M8.8,11.2 H15.2 M9.4,13.4 H14.6 M9.8,15.6 H14.2 M8.8,11.2 L7.2,17.8 M15.2,11.2 L16.8,17.8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.characterblendshapechannels',
    label: 'Character Blend Shape Channels',
    family: 'sop',
    description:
      'Smooth generic blue bald head bust with an upward-arching red curve behind a white-grey cylindrical spool and a vertical red slider bar entering its top face at the lower right.',
    types: ['characterblendshapechannels'],
    icons: ['sop_kinefx-characterblendshapechannels'],
    refKey: 'SOP_kinefx-characterblendshapechannels',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxBaldHead x={10.8} y={11.8} scale={0.92} />
        {/* Strongly upward-arching red curved line right behind the white-grey spool */}
        <path
          d="M13.4,16.2 Q16.8,12.6 20.4,16.2"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* White-grey cylindrical spool from Configure Character, sized to fit the lower-right slot */}
        <path
          d="M14.4,16.4 L14.4,19.9 C14.4,20.8 19.6,20.8 19.6,19.9 L19.6,16.4 Z"
          fill="#c0c7d1"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.9"
        />
        <ellipse cx="17.0" cy="16.4" rx="2.6" ry="1.05" fill="#eef2f7" stroke={KINEFX_OUTLINE} strokeWidth="0.9" />
        {/* Vertical red slider bar entering the spool top face (no white tip) */}
        <rect
          x="16.2"
          y="10.8"
          width="1.6"
          height="5.6"
          rx="0.8"
          fill="#e03228"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.8"
        />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.characterblendshapes',
    label: 'Character Blend Shapes',
    family: 'sop',
    description: 'Smooth generic blue bald head bust with expressive brows and a subtle smirk.',
    types: ['characterblendshapes'],
    icons: ['sop_kinefx-characterblendshapes'],
    refKey: 'SOP_kinefx-characterblendshapes',
    render: () => <KinefxBaldHead x={12} y={12} scale={1.0} />,
  },
  {
    id: 'sop.kinefx.characterblendshapesadd',
    label: 'Character Blend Shapes Add',
    family: 'sop',
    description:
      'Generic blue head bust inside a yellow ring of small yellow smiley faces with a black plus sign on the left.',
    types: ['characterblendshapesadd'],
    icons: ['sop_kinefx-characterblendshapesadd'],
    refKey: 'SOP_kinefx-characterblendshapesadd',
    render: () => (
      <g strokeLinejoin="round">
        <circle cx="12.8" cy="12.0" r="7.4" fill="none" stroke="#f2c438" strokeWidth="1.0" />
        {/* Generic blue head bust */}
        <circle cx="12.8" cy="11.4" r="3.4" fill={KINEFX_BLUE_MID} stroke={KINEFX_OUTLINE} strokeWidth="0.95" />
        <path
          d="M9.6,15.6 Q12.8,14.2 16.0,15.6 L15.4,18.2 H10.2 Z"
          fill={KINEFX_BLUE_DARK}
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.9"
        />
        {/* Ring of yellow smiley orbs */}
        {[
          [12.8, 4.4],
          [19.2, 8.2],
          [19.2, 15.8],
          [12.8, 19.6],
          [6.8, 16.4],
        ].map(([ex, ey], idx) => (
          <g key={idx} transform={`translate(${ex} ${ey})`}>
            <circle cx="0" cy="0" r="1.75" fill="#ffe47a" stroke={KINEFX_OUTLINE} strokeWidth="0.75" />
            <circle cx="-0.55" cy="-0.35" r="0.28" fill={KINEFX_OUTLINE} />
            <circle cx="0.55" cy="-0.35" r="0.28" fill={KINEFX_OUTLINE} />
            <path
              d="M-0.7,0.45 Q0,1.05 0.7,0.45"
              fill="none"
              stroke={KINEFX_OUTLINE}
              strokeWidth="0.6"
              strokeLinecap="round"
            />
          </g>
        ))}
        {/* Black plus on left */}
        <path d="M4.2,11.6 H7.4 M5.8,10.0 V13.2" stroke={KINEFX_OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'sop.kinefx.characterblendshapesextract',
    label: 'Character Blend Shapes Extract',
    family: 'sop',
    description:
      'Smiling generic blue head bust inside a yellow ring of small yellow smiley faces with a large yellow smiley face popping out on the upper left.',
    types: ['characterblendshapesextract'],
    icons: ['sop_kinefx-characterblendshapesextract'],
    refKey: 'SOP_kinefx-characterblendshapesextract',
    render: () => (
      <g strokeLinejoin="round">
        <circle cx="12.8" cy="12.2" r="7.2" fill="none" stroke="#f2c438" strokeWidth="1.0" />
        <circle cx="12.8" cy="11.6" r="3.3" fill={KINEFX_BLUE_MID} stroke={KINEFX_OUTLINE} strokeWidth="0.95" />
        {/* Same smiling face on the blue head */}
        <circle cx="11.7" cy="10.9" r="0.4" fill={KINEFX_OUTLINE} />
        <circle cx="13.9" cy="10.9" r="0.4" fill={KINEFX_OUTLINE} />
        <path
          d="M11.5,12.4 Q12.8,13.5 14.1,12.4"
          fill="none"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <path
          d="M9.8,15.6 Q12.8,14.2 15.8,15.6 L15.2,18.2 H10.4 Z"
          fill={KINEFX_BLUE_DARK}
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.9"
        />
        {[
          [19.0, 8.2],
          [19.0, 15.8],
          [12.8, 19.6],
          [6.8, 16.4],
        ].map(([ex, ey], idx) => (
          <g key={idx} transform={`translate(${ex} ${ey})`}>
            <circle cx="0" cy="0" r="1.7" fill="#ffe47a" stroke={KINEFX_OUTLINE} strokeWidth="0.75" />
            <circle cx="-0.55" cy="-0.35" r="0.28" fill={KINEFX_OUTLINE} />
            <circle cx="0.55" cy="-0.35" r="0.28" fill={KINEFX_OUTLINE} />
            <path
              d="M-0.7,0.45 Q0,1.05 0.7,0.45"
              fill="none"
              stroke={KINEFX_OUTLINE}
              strokeWidth="0.6"
              strokeLinecap="round"
            />
          </g>
        ))}
        {/* Large yellow smiley popping out upper left */}
        <circle cx="7.4" cy="7.0" r="3.2" fill="#ffe47a" stroke={KINEFX_OUTLINE} strokeWidth="0.9" />
        <circle cx="6.3" cy="6.2" r="0.45" fill={KINEFX_OUTLINE} />
        <circle cx="8.5" cy="6.2" r="0.45" fill={KINEFX_OUTLINE} />
        <path
          d="M6.0,7.8 Q7.4,9.0 8.8,7.8"
          fill="none"
          stroke={KINEFX_OUTLINE}
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.blendshapes',
    label: 'Blend Shapes',
    family: 'sop',
    description:
      'Grey cube, cone and sphere at the top merging through red pipes into a combined sphere at the bottom.',
    types: ['blendshapes'],
    icons: ['sop_blendshapes', 'sop_blendshapes-2.0'],
    refKey: 'SOP_blendshapes',
    render: () => (
      <>
        <path
          d="M5.5,8.5 V12.5 H18.5 V8.5 M12,8.5 V16"
          fill="none"
          stroke="#262626"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5,8.5 V12.5 H18.5 V8.5 M12,8.5 V16"
          fill="none"
          stroke="#e03228"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill="#c0c7d1" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="5.5,3 9,5.5 5.5,8 2,5.5" fill="#eef2f7" />
          <polygon points="12,3 15,8.2 9,8.2" />
          <circle cx="18.5" cy="5.8" r="2.8" />
          <circle cx="12" cy="18.2" r="3" fill="#eef2f7" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.shapediff',
    label: 'Shape Difference',
    family: 'sop',
    description:
      'Dark grey rounded square tile showing a white origin with vertical, horizontal, and diagonal axes plus a bold yellow diagonal arrow pointing up and right.',
    types: ['shapediff'],
    icons: ['sop_shapediff'],
    refKey: 'SOP_shapediff',
    render: () => (
      <>
        <path d={roundedRectPath(2.5, 2.5, 19, 19, 4)} fill="#3a3f47" stroke={OUTLINE} strokeWidth="1.2" />
        <g stroke="#f2f4f7" strokeWidth="1.3" strokeLinecap="round" fill="#f2f4f7" strokeLinejoin="round">
          <line x1="8.5" y1="15.2" x2="8.5" y2="6.8" />
          <polygon points={pts(arrowHead([8.5, 4.6], [8.5, 15.2], 3.0, 1.4))} strokeWidth="0.6" />
          <line x1="8.5" y1="15.2" x2="5.7" y2="18.0" />
          <polygon points={pts(arrowHead([4.3, 19.4], [8.5, 15.2], 2.7, 1.3))} strokeWidth="0.6" />
          <line x1="8.5" y1="15.2" x2="17.2" y2="15.2" />
          <polygon points={pts(arrowHead([19.4, 15.2], [8.5, 15.2], 3.0, 1.4))} strokeWidth="0.6" />
        </g>
        <line x1="8.5" y1="15.2" x2="16.7" y2="7.0" stroke="#f2c438" strokeWidth="2.1" strokeLinecap="round" />
        <polygon
          points={pts(arrowHead([19.0, 4.7], [8.5, 15.2], 4.2, 2.1))}
          fill="#f2c438"
          stroke="#f2c438"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
