import { StraightArrow } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import { GreenPathRibbon, WalkingAgent, YellowPen } from '../../kits/agents';

/**
 * Crowd motion path operators.
 */
export const CROWD_MOTION_PATH_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.crowdmotionpath',
    label: 'Crowd MotionPath',
    family: 'sop',
    description: 'Blue agent walking along a green S-curved path ribbon with an arrowhead.',
    types: ['crowdmotionpath'],
    icons: ['sop_crowdmotionpath'],
    refKey: 'SOP_crowdmotionpath',
    render: () => (
      <g>
        <GreenPathRibbon />
        <WalkingAgent cx={12.0} cy={10.4} scale={0.95} />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpatharcinglayer',
    label: 'Crowd MotionPath Arcing Layer',
    family: 'sop',
    description:
      'Walking blue agent flanked by two curved green arcing arrows with the left pointing right at bottom and the right pointing left at top.',
    types: ['crowdmotionpatharcinglayer'],
    icons: ['sop_crowdmotionpatharcinglayer'],
    refKey: 'SOP_crowdmotionpatharcinglayer',
    render: () => (
      <g strokeLinejoin="round">
        {/* Left curved green arrow pointing right at bottom */}
        <path
          d="M7.6,7.0 C3.6,7.8 3.4,11.6 7.4,12.2 L7.2,13.4 L10.0,11.6 L7.5,10.0 L7.4,11.0 C5.0,10.6 5.2,8.6 7.8,8.0 Z"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.9"
        />
        {/* Right curved green arrow pointing left at top */}
        <path
          d="M16.4,12.2 C20.4,11.4 20.6,7.6 16.6,7.0 L16.8,5.8 L14.0,7.6 L16.5,9.2 L16.6,8.2 C19.0,8.6 18.8,10.6 16.2,11.2 Z"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.9"
        />
        {/* Striding figure centered */}
        <WalkingAgent cx={12.0} cy={12.4} scale={0.96} />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpathavoid',
    label: 'Crowd MotionPath Avoid',
    family: 'sop',
    description: 'Blue walking agent on a green path arrow that curves around an orange traffic cone.',
    types: ['crowdmotionpathavoid'],
    icons: ['sop_crowdmotionpathavoid'],
    refKey: 'SOP_crowdmotionpathavoid',
    render: () => (
      <g strokeLinejoin="round">
        {/* Green curved path arrow */}
        <path
          d="M3.4,14.6 C7.6,13.2 13.6,14.0 17.6,16.4 L18.2,14.8 L21.2,18.0 L16.8,18.8 L17.2,17.4 C13.6,15.4 7.8,15.0 3.8,16.2 Z"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <WalkingAgent cx={12.4} cy={8.8} scale={0.88} />
        {/* Orange traffic cone at lower-left */}
        <polygon points="4.8,19.6 12.0,19.6 11.2,21.4 5.6,21.4" fill="#ee8624" stroke="#262626" strokeWidth="0.9" />
        <polygon points="6.0,19.6 7.6,13.0 9.2,13.0 10.8,19.6" fill="#ffb066" stroke="#262626" strokeWidth="0.9" />
        <polygon points="6.6,17.6 10.2,17.6 9.6,15.2 7.2,15.2" fill="#ffffff" stroke="#262626" strokeWidth="0.7" />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpathedit',
    label: 'Crowd MotionPath Edit',
    family: 'sop',
    description: 'Blue agent walking on a green S-curved path while a yellow fountain pen edits the path on the right.',
    types: ['crowdmotionpathedit'],
    icons: ['sop_crowdmotionpathedit'],
    refKey: 'SOP_crowdmotionpathedit',
    render: () => (
      <g>
        <GreenPathRibbon shiftX={-1.4} />
        <WalkingAgent cx={10.0} cy={11.0} scale={0.86} />
        <YellowPen shiftX={0.4} shiftY={0.8} />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpathevaluate',
    label: 'Crowd MotionPath Evaluate',
    family: 'sop',
    description: 'Green-outlined blue walking agent leading three faded ghosted walking figures.',
    types: ['crowdmotionpathevaluate', 'motionclipevaluate'],
    icons: ['sop_crowdmotionpathevaluate', 'sop_kinefx-motionclipevaluate'],
    refKey: 'SOP_crowdmotionpathevaluate',
    render: () => (
      <g>
        <WalkingAgent cx={17.8} cy={10.8} scale={0.64} fill="#5aa2f2" headFill="#8fc2ff" opacity={0.34} />
        <WalkingAgent cx={15.0} cy={11.2} scale={0.68} fill="#5aa2f2" headFill="#8fc2ff" opacity={0.5} />
        <WalkingAgent cx={12.0} cy={11.8} scale={0.74} fill="#5aa2f2" headFill="#8fc2ff" opacity={0.68} />
        <WalkingAgent cx={8.0} cy={12.4} scale={0.88} fill="#5aa2f2" headFill="#8fc2ff" auraColor="#58c848" />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpathfollow',
    label: 'Crowd MotionPath Follow',
    family: 'sop',
    description: 'Three blue agents walking single-file down-right along a diagonal green arrow.',
    types: ['crowdmotionpathfollow'],
    icons: ['sop_crowdmotionpathfollow'],
    refKey: 'SOP_crowdmotionpathfollow',
    render: () => (
      <g>
        <StraightArrow from={[3.4, 14.4]} tip={[19.4, 21.0]} color="#58c848" width={1.3} head={2.8} />
        <WalkingAgent cx={6.2} cy={10.2} scale={0.58} />
        <WalkingAgent cx={11.2} cy={12.2} scale={0.62} />
        <WalkingAgent cx={16.4} cy={14.4} scale={0.66} />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpathlayer',
    label: 'Crowd MotionPath Layer',
    family: 'sop',
    description:
      'Running blue agent with a cap holding a tray on the left and a paddle with a yellow ball on the right.',
    types: ['crowdmotionpathlayer'],
    icons: ['sop_crowdmotionpathlayer'],
    refKey: 'SOP_crowdmotionpathlayer',
    render: () => (
      <g strokeLinejoin="round">
        {/* Running blue figure */}
        <path
          d="M10.4,8.6 C11.8,8.4 13.0,9.2 13.4,10.6 L16.2,9.8 L15.8,11.2 L13.2,12.0 L12.8,14.6 L14.4,19.8 L12.6,20.2 L11.2,15.8 L9.4,20.2 L7.6,19.6 L9.8,14.0 L9.8,11.2 L6.8,10.2 L7.2,8.8 L9.6,9.2 Z"
          fill="#8fc2ff"
          stroke="#262626"
          strokeWidth="0.85"
        />
        <circle cx="11.6" cy="6.2" r="1.8" fill="#8fc2ff" stroke="#262626" strokeWidth="0.85" />
        {/* Cap visor */}
        <path d="M9.8,5.2 L14.2,5.4" stroke="#262626" strokeWidth="1.0" strokeLinecap="round" />
        {/* Tray on upper-left */}
        <ellipse cx="6.0" cy="7.8" rx="2.8" ry="0.95" fill="#eef2f7" stroke="#262626" strokeWidth="0.85" />
        <ellipse cx="6.0" cy="7.6" rx="1.6" ry="0.45" fill="#f2c438" />
        {/* Paddle on upper-right and yellow ball */}
        <ellipse
          cx="17.6"
          cy="9.2"
          rx="1.9"
          ry="1.4"
          transform="rotate(-32 17.6 9.2)"
          fill="#3a3f47"
          stroke="#e03228"
          strokeWidth="0.95"
        />
        <circle cx="17.8" cy="5.0" r="1.15" fill="#f2c438" stroke="#262626" strokeWidth="0.8" />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpathretime',
    label: 'Crowd MotionPath Retime',
    family: 'sop',
    description: 'Four faded running blue agents across the top behind a large yellow-rimmed stopwatch.',
    types: ['crowdmotionpathretime', 'motionclipretime'],
    icons: ['sop_crowdmotionpathretime', 'sop_kinefx-motionclipretime'],
    refKey: 'SOP_crowdmotionpathretime',
    render: () => (
      <g strokeLinejoin="round">
        {/* Four faded running agents across the top */}
        <WalkingAgent cx={5.4} cy={7.8} scale={0.48} opacity={0.25} />
        <WalkingAgent cx={9.4} cy={7.8} scale={0.48} opacity={0.45} />
        <WalkingAgent cx={13.4} cy={7.8} scale={0.48} opacity={0.68} />
        <WalkingAgent cx={17.4} cy={7.8} scale={0.48} opacity={0.95} />
        {/* Stopwatch crown and side button */}
        <rect x="11.0" y="8.2" width="2.0" height="1.6" rx="0.4" fill="#f2c438" stroke="#262626" strokeWidth="0.85" />
        <line x1="15.8" y1="10.4" x2="17.0" y2="9.2" stroke="#262626" strokeWidth="1.2" strokeLinecap="round" />
        {/* Yellow stopwatch body and white dial */}
        <circle cx="12.0" cy="15.2" r="5.5" fill="#f2c438" stroke="#262626" strokeWidth="1.0" />
        <circle cx="12.0" cy="15.2" r="4.1" fill="#eef2f7" stroke="#262626" strokeWidth="0.75" />
        {/* Clock hands */}
        <line x1="12.0" y1="15.2" x2="12.0" y2="12.2" stroke="#e03228" strokeWidth="0.95" strokeLinecap="round" />
        <line x1="12.0" y1="15.2" x2="14.2" y2="16.2" stroke="#262626" strokeWidth="1.0" strokeLinecap="round" />
        <circle cx="12.0" cy="15.2" r="0.7" fill="#262626" />
      </g>
    ),
  },
  {
    id: 'sop.crowdmotionpathtransition',
    label: 'Crowd MotionPath Transition',
    family: 'sop',
    description:
      'Two blue agents in contrasting poses (left figure reaching high with its right arm) bridged by a bold green double-headed horizontal arrow.',
    types: ['crowdmotionpathtransition', 'crowdmotionpathtrigger'],
    icons: ['sop_crowdmotionpathtransition', 'sop_crowdmotionpathtrigger'],
    refKey: 'SOP_crowdmotionpathtransition',
    render: () => (
      <g strokeLinejoin="round">
        {/* Left leaning figure with high, full-thickness right arm */}
        <path
          d="M6.4,8.2 C7.8,8.0 8.6,8.4 8.8,8.8 L11.6,6.4 L12.6,7.8 L9.4,10.6 L8.8,14.8 L10.8,19.4 L9.0,20.0 L7.4,16.2 L5.2,20.0 L3.4,19.2 L6.0,14.0 L6.4,11.2 L4.2,12.8 L3.4,11.4 L5.8,9.0 Z"
          fill="#5aa2f2"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <circle cx="7.4" cy="6.2" r="1.7" fill="#8fc2ff" stroke="#262626" strokeWidth="0.95" />
        {/* Right striding figure */}
        <WalkingAgent cx={16.8} cy={12.4} scale={0.9} />
        {/* Bold green double-headed horizontal arrow */}
        <polygon
          points="5.8,13.6 9.0,11.4 9.0,12.7 15.0,12.7 15.0,11.4 18.2,13.6 15.0,15.8 15.0,14.5 9.0,14.5 9.0,15.8"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.95"
        />
      </g>
    ),
  },
];
