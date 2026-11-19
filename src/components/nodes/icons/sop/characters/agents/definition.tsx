import { isoBoxFaces, pts } from '../../../geoHelpers';
import { CasedStroke } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import { AgentBust, AgentMannequin, WalkingAgent, WoodenMannequin, YellowPen } from '../../kits/agents';
import { KinefxMannequinBase } from '../../kits/mannequin';

/**
 * Agent definition icons.
 * Shared kits: `KinefxMannequinBase` (`kits/mannequin.tsx`), `AgentBust`, `WoodenMannequin`,
 * `WalkingAgent`, and `YellowPen` (`kits/agents.tsx`).
 */

const CACHE_BOX = isoBoxFaces(12, 11.2, 6.4, 3.8);

/**
 * Agent definition operators: clips, layers, joints and metadata.
 */
export const AGENT_DEFINITION_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.agent',
    label: 'Agent',
    family: 'sop',
    description: 'Solid blue standing agent mannequin.',
    types: ['agent', 'agentprep', 'agentproxy'],
    icons: ['sop_agent', 'sop_agentprep', 'sop_agentproxy'],
    refKey: 'SOP_agent',
    render: () => <AgentMannequin cx={12} cy={12} scale={1.06} />,
  },
  {
    id: 'sop.agentclip',
    label: 'Agent Clip',
    family: 'sop',
    description:
      'Wavy medium grey filmstrip with a continuous white interior band subdivided vertically by matching grey lines into three sections, each containing a small black agent figure.',
    types: ['agentclip'],
    icons: ['sop_agentclip'],
    refKey: 'SOP_agentclip',
    render: (uid) => {
      const innerStrip =
        'M2.6,8.5 C6.2,5.1 9.6,7.1 12.0,9.7 C14.4,12.3 17.8,14.3 21.4,10.5 L21.4,15.5 C17.8,19.3 14.4,17.3 12.0,14.7 C9.6,12.1 6.2,10.1 2.6,13.5 Z';
      const figures = [
        { cx: 6.33, cy: 9.2 },
        { cx: 12.0, cy: 12.2 },
        { cx: 17.67, cy: 15.1 },
      ];
      return (
        <g strokeLinejoin="round">
          <defs>
            <clipPath id={`${uid}-strip`}>
              <rect x="3.5" y="0" width="17.0" height="24" />
            </clipPath>
            <clipPath id={`${uid}-inner`}>
              <path d={innerStrip} />
            </clipPath>
          </defs>
          {/* Wavy medium grey filmstrip ribbon */}
          <path
            d="M2.6,7.0 C6.2,3.6 9.6,5.6 12.0,8.2 C14.4,10.8 17.8,12.8 21.4,9.0 L21.4,17.0 C17.8,20.8 14.4,18.8 12.0,16.2 C9.6,13.6 6.2,11.6 2.6,15.0 Z"
            fill="#6e7782"
            stroke="#262626"
            strokeWidth="1.05"
          />
          {/* Continuous white interior band clipped to exact parallel top/bottom edges */}
          <g clipPath={`url(#${uid}-strip)`}>
            <path d={innerStrip} fill="#eef2f7" />
          </g>
          {/* Vertical divider lines in the same grey as the top and bottom edges */}
          <g clipPath={`url(#${uid}-inner)`}>
            <line x1="9.17" y1="3" x2="9.17" y2="21" stroke="#6e7782" strokeWidth="1.0" />
            <line x1="14.83" y1="3" x2="14.83" y2="21" stroke="#6e7782" strokeWidth="1.0" />
          </g>
          {/* Small black agent figures */}
          {figures.map(({ cx, cy }) => (
            <g key={cx} fill="#262626">
              <circle cx={cx} cy={cy - 0.9} r="0.58" />
              <path
                d={`M${cx - 0.62},${cy - 0.12} L${cx + 0.62},${cy - 0.12} L${cx + 0.42},${cy + 1.45} L${cx - 0.42},${cy + 1.45} Z`}
              />
            </g>
          ))}
        </g>
      );
    },
  },
  {
    id: 'sop.agentclipproperties',
    label: 'Agent Clip Properties',
    family: 'sop',
    description: 'Blue agent bust on the left with a large angled yellow fountain pen on the right.',
    types: ['agentclipproperties', 'agentedit'],
    icons: ['sop_agentclipproperties', 'sop_agentedit'],
    refKey: 'SOP_agentclipproperties',
    render: () => (
      <g>
        <AgentBust cx={8.8} cy={13.4} scale={0.96} />
        <YellowPen />
      </g>
    ),
  },
  {
    id: 'sop.agentcliptransitiongraph',
    label: 'Agent Clip Transition Graph',
    family: 'sop',
    description: 'Blue agent bust on the lower left with a white thought cloud containing red cycle arrows.',
    types: ['agentcliptransitiongraph', 'testsim_crowdtransition'],
    icons: ['sop_agentcliptransitiongraph', 'sop_testsim_crowdtransition'],
    refKey: 'SOP_agentcliptransitiongraph',
    render: () => (
      <g strokeLinejoin="round">
        <AgentBust cx={8.2} cy={14.0} scale={0.92} />
        {/* Thought bubble dot */}
        <circle cx="11.4" cy="9.2" r="0.85" fill="#ffffff" stroke="#262626" strokeWidth="0.75" />
        {/* Scalloped white cloud */}
        <path
          d="M14.2,9.2 C12.4,9.2 11.6,7.8 12.2,6.4 C12.0,4.8 13.4,3.4 15.2,3.6 C16.2,2.4 18.6,2.6 19.6,4.0 C21.2,4.2 22.0,5.8 21.4,7.4 C21.8,9.0 20.4,10.4 18.6,10.2 C17.6,11.0 15.2,10.8 14.2,9.2 Z"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Red cycle arrows inside cloud */}
        <path
          d="M14.4,6.4 A2.3,2.3 0 0,1 18.4,5.4"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <polygon points="18.9,4.2 19.4,6.2 17.4,5.9" fill="#e03228" />
        <path
          d="M19.0,7.2 A2.3,2.3 0 0,1 15.0,8.2"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <polygon points="14.5,9.4 14.0,7.4 16.0,7.7" fill="#e03228" />
      </g>
    ),
  },
  {
    id: 'sop.agentcollisionlayer',
    label: 'Agent Collision Layer',
    family: 'sop',
    description:
      'Orange wooden artist mannequin with a short translucent light blue collision capsule bisected by a light blue line.',
    types: ['agentcollisionlayer'],
    icons: ['sop_agentcollisionlayer'],
    refKey: 'SOP_agentcollisionlayer',
    render: () => (
      <g>
        <WoodenMannequin />
        {/* Translucent collision capsule (3/4 length) around upper-arm and elbow */}
        <g transform="translate(11.8 12.8) rotate(-42)">
          <rect
            x="-5.0"
            y="-2.6"
            width="10.0"
            height="5.2"
            rx="2.6"
            fill="#8fc2ff"
            fillOpacity="0.45"
            stroke="#262626"
            strokeWidth="0.95"
          />
          <line x1="0" y1="-2.4" x2="0" y2="2.4" stroke="#8fc2ff" strokeWidth="0.9" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.agentconfigurejoints',
    label: 'Agent Configure Joints',
    family: 'sop',
    description:
      'Orange wooden artist mannequin with a short translucent light blue joint-limit cone around its upper arm.',
    types: ['agentconfigurejoints'],
    icons: ['sop_agentconfigurejoints'],
    refKey: 'SOP_agentconfigurejoints',
    render: () => (
      <g strokeLinejoin="round">
        <WoodenMannequin />
        {/* Translucent joint-limit cone (3/4 length) radiating from shoulder */}
        <path
          d="M14.2,10.8 L6.8,13.6 C6.0,15.0 7.4,17.4 9.4,17.6 Z"
          fill="#8fc2ff"
          fillOpacity="0.45"
          stroke="#262626"
          strokeWidth="0.95"
        />
      </g>
    ),
  },
  {
    id: 'sop.agentdefinitioncache',
    label: 'Agent Definition Cache',
    family: 'sop',
    description: 'Blue agent mannequin standing on an isometric grey cache drive box.',
    types: ['agentdefinitioncache'],
    icons: ['sop_agentdefinitioncache'],
    refKey: 'SOP_agentdefinitioncache',
    render: () => (
      <g strokeLinejoin="round">
        <polygon points={pts(CACHE_BOX.top)} fill="#eef2f7" stroke="#262626" strokeWidth="1.0" />
        <polygon points={pts(CACHE_BOX.left)} fill="#c0c7d1" stroke="#262626" strokeWidth="1.0" />
        <polygon points={pts(CACHE_BOX.right)} fill="#89929e" stroke="#262626" strokeWidth="1.0" />
        {/* Front-right drive vent ticks */}
        <line x1="15.2" y1="17.2" x2="15.2" y2="18.6" stroke="#262626" strokeWidth="0.8" />
        <line x1="16.8" y1="16.4" x2="16.8" y2="17.8" stroke="#262626" strokeWidth="0.8" />
        <KinefxMannequinBase cx={12} cy={8.8} scale={0.68} />
      </g>
    ),
  },
  {
    id: 'sop.agentlayer',
    label: 'Agent Layer',
    family: 'sop',
    description: 'Blue agent bust on the right holding a raised double-headed battle axe on the left.',
    types: ['agentlayer'],
    icons: ['sop_agentlayer'],
    refKey: 'SOP_agentlayer',
    render: () => (
      <g strokeLinejoin="round">
        <AgentBust cx={14.6} cy={14.2} scale={0.88} />
        {/* Axe shaft */}
        <rect x="6.2" y="3.0" width="1.6" height="16.4" rx="0.6" fill="#a8783c" stroke="#262626" strokeWidth="0.95" />
        {/* Double-headed axe blades */}
        <path
          d="M6.2,5.6 C4.4,4.2 3.0,3.8 2.6,4.6 C2.2,6.4 2.2,8.4 2.6,10.2 C3.0,11.0 4.4,10.6 6.2,9.2 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path
          d="M7.8,5.6 C9.6,4.2 11.0,3.8 11.4,4.6 C11.8,6.4 11.8,8.4 11.4,10.2 C11.0,11.0 9.6,10.6 7.8,9.2 Z"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Raised arm and hand gripping shaft */}
        <path d="M11.0,16.4 L7.2,15.6 L7.2,13.6 L11.4,14.4 Z" fill="#3672c4" stroke="#262626" strokeWidth="0.95" />
        <circle cx="7.0" cy="14.6" r="1.4" fill="#5aa2f2" stroke="#262626" strokeWidth="0.9" />
      </g>
    ),
  },
  {
    id: 'sop.agentmetadata',
    label: 'Agent Metadata',
    family: 'sop',
    description: 'Three walking blue agents linked by green lines to a small metadata card at upper left.',
    types: ['agentmetadata'],
    icons: ['sop_agentmetadata'],
    refKey: 'SOP_agentmetadata',
    render: () => (
      <g strokeLinejoin="round">
        {/* Three walking agents in increasing scale */}
        <WalkingAgent cx={5.6} cy={15.6} scale={0.54} fill="#8fc2ff" headFill="#8fc2ff" />
        <WalkingAgent cx={11.0} cy={14.8} scale={0.65} fill="#5aa2f2" headFill="#8fc2ff" />
        <WalkingAgent cx={17.2} cy={14.0} scale={0.78} fill="#3672c4" headFill="#5aa2f2" />
        {/* Green cased connector lines from chests to top-left card */}
        <CasedStroke d="M5.6,14.2 L5.6,8.0" color="#58c848" width={0.95} />
        <CasedStroke d="M11.0,13.0 L11.0,5.6 L8.6,5.6" color="#58c848" width={0.95} />
        <CasedStroke d="M17.2,11.8 L17.2,4.4 L8.6,4.4" color="#58c848" width={0.95} />
        {/* Metadata card at top-left */}
        <rect x="2.8" y="3.0" width="6.2" height="5.2" rx="0.8" fill="#eef2f7" stroke="#262626" strokeWidth="0.9" />
        <rect x="2.8" y="3.0" width="6.2" height="1.6" rx="0.4" fill="#58c848" stroke="#262626" strokeWidth="0.8" />
      </g>
    ),
  },
];
