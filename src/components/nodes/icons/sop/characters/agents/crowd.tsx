import { CasedStroke, StraightArrow } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import { AgentBust, AgentMannequin } from '../../kits/agents';
import { KinefxMannequinBase } from '../../kits/mannequin';
import { OpenSuitcase } from '../../kits/pack';

/**
 * Agent edit and crowd setup operators.
 */
export const AGENT_CROWD_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.agentlookat',
    label: 'Agent Look At',
    family: 'sop',
    description: 'Blue agent bust on the left with a red arrow pointing from eye level to a red X on the right.',
    types: ['agentlookat'],
    icons: ['crowds_agentlookat', 'sop_agentlookat'],
    refKey: 'SOP_agentlookat',
    render: () => (
      <g strokeLinejoin="round">
        <AgentBust cx={8.2} cy={13.6} scale={1.04} />
        {/* Red look-at arrow */}
        <StraightArrow from={[11.0, 7.2]} tip={[15.8, 7.2]} color="#e03228" width={1.1} head={2.4} />
        {/* Bold red X target */}
        <CasedStroke d="M16.8,5.2 L20.8,9.2 M20.8,5.2 L16.8,9.2" color="#e03228" width={1.6} />
      </g>
    ),
  },
  {
    id: 'sop.agentrelationship',
    label: 'Agent Relationship',
    family: 'sop',
    description:
      'Light grey horse standing in profile facing right with a blue rider with a ponytail seated on its back.',
    types: ['agentrelationship'],
    icons: ['sop_agentrelationship'],
    refKey: 'SOP_agentrelationship',
    render: () => (
      <g strokeLinejoin="round">
        {/* Light grey standing horse facing right */}
        <path
          d="M6.6,12.2 C5.2,12.6 4.5,14.6 4.7,17.2 L5.8,17.2 L6.0,14.6 L6.9,14.4 L6.8,20.8 L8.3,20.8 L8.7,16.4 L13.1,16.4 L13.8,20.8 L15.3,20.8 L15.0,15.2 L16.0,15.2 L16.7,20.6 L18.1,20.6 L16.8,13.0 L17.9,9.2 L19.3,10.2 L19.9,9.0 L17.8,6.4 L16.2,6.8 L13.8,11.2 L8.4,11.4 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.95"
        />
        {/* Blue rider seated on horse with hanging leg */}
        <path
          d="M10.4,6.4 L12.6,6.6 L13.2,11.2 L12.2,13.6 L12.6,17.0 L11.0,17.2 L10.2,13.4 L10.2,11.2 Z"
          fill="#3672c4"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <circle cx="11.4" cy="4.4" r="1.6" fill="#5aa2f2" stroke="#262626" strokeWidth="0.95" />
        {/* Ponytail */}
        <path
          d="M9.8,4.2 C8.4,4.6 8.2,6.2 8.8,7.2"
          fill="none"
          stroke="#3672c4"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.agentterrainadaptation',
    label: 'Agent Terrain Adaptation',
    family: 'sop',
    description: 'Blue agent climbing up-right over bumpy brown and amber rocky terrain.',
    types: ['adapttoterrain', 'agentterrainadaptation'],
    icons: ['sop_agentterrainadaptation', 'sop_kinefx-adapttoterrain'],
    refKey: 'SOP_agentterrainadaptation',
    render: () => (
      <g strokeLinejoin="round">
        {/* Bumpy amber/brown terrain */}
        <path
          d="M2.4,19.4 C4.4,17.2 6.8,17.0 9.0,18.4 C11.2,15.8 14.0,15.6 16.4,17.6 C18.2,16.8 20.2,17.8 21.6,19.8 L21.6,21.4 L2.4,21.4 Z"
          fill="#a8783c"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path
          d="M4.0,19.6 C6.0,18.2 8.2,18.6 10.2,19.6 C12.4,17.2 14.8,17.4 17.0,19.2 L19.6,20.4 L4.0,20.4 Z"
          fill="#c89a5a"
        />
        {/* Climbing blue agent */}
        <path
          d="M11.6,6.8 C13.2,6.6 14.4,7.6 14.2,9.2 L15.8,11.2 L14.6,12.2 L13.2,10.6 L12.8,12.4 L15.4,14.8 L14.6,17.6 L12.8,17.6 L13.2,15.0 L11.2,13.6 L8.6,18.0 L6.8,17.4 L9.6,12.2 L10.2,9.2 L8.2,10.8 L7.4,9.6 L10.2,7.2 Z"
          fill="#3672c4"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <circle cx="13.2" cy="4.8" r="1.8" fill="#5aa2f2" stroke="#262626" strokeWidth="0.95" />
      </g>
    ),
  },
  {
    id: 'sop.agenttransformgroup',
    label: 'Agent Transform Group',
    family: 'sop',
    description:
      'Standing blue agent with green internal skeleton lines through torso, legs, and arms, plus three red-and-white target rings along the left arm.',
    types: ['agenttransformgroup'],
    icons: ['sop_agenttransformgroup'],
    refKey: 'SOP_agenttransformgroup',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxMannequinBase cx={12.8} cy={12.2} scale={0.96} />
        {/* Green internal skeleton including arms */}
        <g stroke="#58c848" strokeWidth="1.0" strokeLinecap="round" fill="none">
          <line x1="12.8" y1="8.2" x2="12.8" y2="14.2" />
          <line x1="9.6" y1="9.6" x2="16.0" y2="9.6" />
          <line x1="9.6" y1="9.6" x2="7.4" y2="14.2" />
          <line x1="16.0" y1="9.6" x2="18.2" y2="14.2" />
          <line x1="12.8" y1="14.2" x2="10.8" y2="19.6" />
          <line x1="12.8" y1="14.2" x2="14.8" y2="19.6" />
        </g>
        <circle cx="12.8" cy="8.2" r="0.8" fill="#58c848" />
        <circle cx="12.8" cy="14.2" r="0.8" fill="#58c848" />
        {/* Three red-and-white target bullseyes along the left arm */}
        {[
          [9.6, 9.6],
          [8.5, 11.9],
          [7.4, 14.2],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="1.6" fill="#ffffff" stroke="#262626" strokeWidth="0.7" />
            <circle cx={x} cy={y} r="0.95" fill="#e03228" />
          </g>
        ))}
      </g>
    ),
  },
  {
    id: 'sop.agentunpack',
    label: 'Agent Unpack',
    family: 'sop',
    description: 'Blue standing agent mannequin in front of an open brown-and-gold suitcase.',
    types: ['agentunpack', 'packcharacter', 'unpackcharacter'],
    icons: ['sop_agentunpack', 'sop_apex-packcharacter', 'sop_apex-unpackcharacter'],
    refKey: 'SOP_agentunpack',
    render: () => (
      <g>
        <OpenSuitcase x={9.8} y={13.6} scale={0.78} />
        <KinefxMannequinBase cx={15.2} cy={12.0} scale={0.82} />
      </g>
    ),
  },
  {
    id: 'sop.agentconstraintnetwork',
    label: 'Agent Constraint Network',
    family: 'sop',
    description:
      'Segmented grey jointed ragdoll with separate rounded torso, head, and capsule limbs overlaid by a bright green stick-figure constraint skeleton.',
    types: ['agentconstraintnetwork'],
    icons: ['sop_agentconstraintnetwork'],
    refKey: 'SOP_agentconstraintnetwork',
    render: () => (
      <g strokeLinejoin="round" strokeLinecap="round">
        {/* Four capsule limbs behind torso */}
        <g fill="none" stroke="#262626" strokeWidth="4.0">
          <line x1="9.6" y1="10.2" x2="17.2" y2="8.0" />
          <line x1="9.6" y1="10.2" x2="6.0" y2="15.4" />
          <line x1="12.4" y1="13.6" x2="19.0" y2="16.6" />
          <line x1="12.4" y1="13.6" x2="11.4" y2="19.8" />
        </g>
        <g fill="none" stroke="#c0c7d1" strokeWidth="2.3">
          <line x1="9.6" y1="10.2" x2="17.2" y2="8.0" />
          <line x1="9.6" y1="10.2" x2="6.0" y2="15.4" />
          <line x1="12.4" y1="13.6" x2="19.0" y2="16.6" />
          <line x1="12.4" y1="13.6" x2="11.4" y2="19.8" />
        </g>
        {/* Separate rounded torso */}
        <line x1="9.6" y1="10.0" x2="12.4" y2="13.8" stroke="#262626" strokeWidth="6.4" />
        <line x1="9.6" y1="10.0" x2="12.4" y2="13.8" stroke="#eef2f7" strokeWidth="4.6" />
        <circle cx="7.0" cy="5.6" r="2.2" fill="#eef2f7" stroke="#262626" strokeWidth="0.95" />
        {/* Cased bright green constraint skeleton */}
        <CasedStroke
          d="M7.8,6.6 L12.4,13.6 M9.6,10.2 L17.2,8.0 M9.6,10.2 L6.0,15.4 M12.4,13.6 L19.0,16.6 M12.4,13.6 L11.4,19.8"
          color="#58c848"
          width={1.15}
        />
      </g>
    ),
  },
  {
    id: 'sop.crowdassignlayers',
    label: 'Crowd Assign Layers',
    family: 'sop',
    description: 'Blue agent wearing a yellow sombrero, white angel wings, a red foam finger, and red shoes.',
    types: ['crowdassignlayers'],
    icons: ['sop_crowdassignlayers'],
    refKey: 'SOP_crowdassignlayers',
    render: () => (
      <g strokeLinejoin="round">
        {/* White angel wings behind shoulders */}
        <path
          d="M10.4,10.4 C7.0,7.4 4.2,6.6 3.6,8.2 C3.0,9.8 5.2,13.0 9.6,13.4 Z"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.9"
        />
        <path
          d="M13.6,10.4 C17.0,7.4 19.8,6.6 20.4,8.2 C21.0,9.8 18.8,13.0 14.4,13.4 Z"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.9"
        />
        {/* Standing blue figure with right arm raised into the foam finger */}
        <path
          d="M9.6,10.0 L14.4,10.0 L16.6,9.6 L16.8,11.0 L13.6,11.8 L13.6,19.6 L12.0,19.6 L12.0,15.2 L10.4,19.6 L8.8,19.6 L10.4,12.2 L9.4,14.0 L8.2,13.6 Z"
          fill="#3672c4"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <circle cx="12.0" cy="7.6" r="1.8" fill="#5aa2f2" stroke="#262626" strokeWidth="0.95" />
        {/* Red shoes */}
        <ellipse cx="9.6" cy="20.2" rx="1.3" ry="0.8" fill="#e03228" stroke="#262626" strokeWidth="0.8" />
        <ellipse cx="13.2" cy="20.2" rx="1.3" ry="0.8" fill="#e03228" stroke="#262626" strokeWidth="0.8" />
        {/* Yellow sombrero */}
        <ellipse cx="12.0" cy="6.4" rx="4.6" ry="1.2" fill="#f2c438" stroke="#262626" strokeWidth="0.9" />
        <path d="M10.2,6.0 C10.4,4.0 13.6,4.0 13.8,6.0 Z" fill="#ffe47a" stroke="#262626" strokeWidth="0.85" />
        {/* Raised red foam finger on upper-right */}
        <path
          d="M16.2,9.2 L16.2,5.6 C16.2,4.8 17.4,4.8 17.4,5.6 L17.4,7.4 L18.4,7.6 L18.2,10.4 L16.0,10.4 Z"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.85"
        />
      </g>
    ),
  },
  {
    id: 'sop.crowdsource',
    label: 'Crowd Source',
    family: 'sop',
    description: 'Three blue standing agent mannequins, each standing inside a red target ring.',
    types: ['crowdsource'],
    icons: ['crowds_crowdsource', 'sop_crowdsource'],
    refKey: 'CROWDS_crowdsource',
    render: () => (
      <g>
        {/* Back-left ring and agent */}
        <ellipse cx="7.2" cy="14.2" rx="3.8" ry="1.4" fill="none" stroke="#262626" strokeWidth="1.6" />
        <ellipse cx="7.2" cy="14.2" rx="3.8" ry="1.4" fill="none" stroke="#e03228" strokeWidth="0.9" />
        <circle cx="7.2" cy="15.6" r="0.7" fill="#ffffff" stroke="#262626" strokeWidth="0.6" />
        <AgentMannequin cx={7.2} cy={9.4} scale={0.58} />
        {/* Right ring and agent */}
        <ellipse cx="16.8" cy="16.2" rx="3.8" ry="1.4" fill="none" stroke="#262626" strokeWidth="1.6" />
        <ellipse cx="16.8" cy="16.2" rx="3.8" ry="1.4" fill="none" stroke="#e03228" strokeWidth="0.9" />
        <circle cx="16.8" cy="17.6" r="0.7" fill="#ffffff" stroke="#262626" strokeWidth="0.6" />
        <AgentMannequin cx={16.8} cy={11.4} scale={0.58} />
        {/* Front-left ring and agent */}
        <ellipse cx="10.2" cy="19.6" rx="4.2" ry="1.5" fill="none" stroke="#262626" strokeWidth="1.6" />
        <ellipse cx="10.2" cy="19.6" rx="4.2" ry="1.5" fill="none" stroke="#e03228" strokeWidth="0.95" />
        <circle cx="10.2" cy="21.1" r="0.75" fill="#ffffff" stroke="#262626" strokeWidth="0.6" />
        <AgentMannequin cx={10.2} cy={14.4} scale={0.62} />
      </g>
    ),
  },
];
