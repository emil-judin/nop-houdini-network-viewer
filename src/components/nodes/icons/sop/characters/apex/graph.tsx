import { gearPath, roundedRectPath } from '../../../geoHelpers';
import { CasedStroke } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import {
  APEX_GREEN,
  APEX_GREEN_LIGHT,
  APEX_OUTLINE,
  ApexGraphFigure,
  ApexGridPanel,
  ApexPlusSign,
} from '../../kits/apex';

/**
 * Five sideways dinosaur + green wireframe variants for `sop.apex.layoutgraph`.
 */
const LAYOUT_GRAPH_VARIANTS: ReadonlyArray<{
  name: string;
  render: () => React.ReactNode;
}> = [
  {
    name: 'V1 Raptor Stride',
    render: () => (
      <g strokeLinejoin="round">
        <path
          d="M2.6,6.2 L5.8,4.8 L8.8,5.6 L9.2,7.8 L11.4,10.2 L16.2,12.2 L21.4,12.6 L19.6,14.6 L14.8,15.0 L13.4,16.4 L14.4,19.8 L16.0,20.8 L12.4,20.8 L11.4,16.8 L9.4,16.8 L8.4,19.8 L9.8,20.8 L6.4,20.8 L7.4,16.0 L6.8,12.6 L4.6,13.4 L4.0,12.2 L6.2,10.8 L6.4,8.6 L3.0,8.6 L3.0,7.4 L5.4,7.4 L2.6,7.0 Z"
          fill="#89929e"
          stroke={APEX_OUTLINE}
          strokeWidth="0.95"
        />
        <path d="M4.2,5.6 L7.8,5.6 L8.4,6.8 L4.4,6.8 Z" fill="#c0c7d1" />
        <CasedStroke d="M10.4,8.8 Q14.8,4.0 20.0,5.8 Q19.8,9.2 18.2,11.4" color={APEX_GREEN} width={0.9} casing={1.8} />
        <path
          d="M5.6,6.4 L8.6,10.4 L12.4,13.4 L19.2,13.2 M8.6,10.4 L8.0,15.6 L7.4,20.0 M12.4,13.4 L12.8,16.8 L13.8,20.0 M8.6,10.4 L4.8,12.6"
          fill="none"
          stroke={APEX_GREEN}
          strokeWidth="0.85"
          strokeLinecap="round"
        />
        {[
          [5.6, 6.4],
          [8.6, 10.4],
          [12.4, 13.4],
          [19.2, 13.2],
          [14.6, 5.2],
          [20.0, 5.8],
          [18.8, 9.6],
          [7.4, 20.0],
          [13.8, 20.0],
        ].map(([nx, ny], idx) => (
          <circle key={idx} cx={nx} cy={ny} r="0.8" fill={APEX_GREEN} stroke={APEX_OUTLINE} strokeWidth="0.6" />
        ))}
      </g>
    ),
  },
  {
    name: 'V2 Heavy T-Rex',
    render: () => (
      <g strokeLinejoin="round">
        <path
          d="M2.4,6.4 L6.4,4.6 L10.0,5.6 L9.8,8.4 L12.6,10.2 L17.6,10.4 L21.2,9.0 L19.6,12.4 L14.8,14.8 L13.6,17.2 L15.2,20.6 L12.0,20.8 L11.0,16.4 L8.8,16.6 L7.8,20.6 L4.8,20.6 L6.8,15.2 L6.6,11.6 L4.2,12.4 L3.6,11.0 L6.0,9.6 L6.4,8.2 L2.8,8.4 Z"
          fill="#89929e"
          stroke={APEX_OUTLINE}
          strokeWidth="0.95"
        />
        <path d="M4.2,5.6 L8.6,5.8 L8.8,7.0 L4.4,6.8 Z" fill="#c0c7d1" />
        <CasedStroke d="M11.2,9.2 Q15.0,3.8 19.6,5.0 Q20.4,7.6 19.0,9.6" color={APEX_GREEN} width={0.9} casing={1.8} />
        <path
          d="M6.4,6.4 L9.2,11.2 L13.0,13.0 L19.0,10.6 M9.2,11.2 L7.2,16.2 L6.4,19.8 M13.0,13.0 L13.6,19.8 M9.2,11.2 L11.4,14.8"
          fill="none"
          stroke={APEX_GREEN}
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        {[
          [6.4, 6.4],
          [9.2, 11.2],
          [13.0, 13.0],
          [19.0, 10.6],
          [15.4, 4.4],
          [19.6, 5.0],
          [6.4, 19.8],
          [13.6, 19.8],
        ].map(([nx, ny], idx) => (
          <circle key={idx} cx={nx} cy={ny} r="0.85" fill={APEX_GREEN} stroke={APEX_OUTLINE} strokeWidth="0.6" />
        ))}
      </g>
    ),
  },
  {
    name: 'V3 Long-Neck Swept Tail',
    render: () => (
      <g strokeLinejoin="round">
        <path
          d="M3.2,5.6 L6.2,4.4 L7.8,5.6 L7.6,8.2 L9.8,10.6 L14.4,11.4 L21.4,13.4 L18.4,14.8 L14.2,14.6 L13.0,16.8 L14.0,20.8 L11.4,20.8 L10.6,16.4 L8.4,16.4 L7.4,20.8 L4.8,20.8 L6.2,15.6 L5.6,11.2 L5.4,7.6 L3.2,7.2 Z"
          fill="#89929e"
          stroke={APEX_OUTLINE}
          strokeWidth="0.95"
        />
        <path d="M4.6,5.2 L7.0,5.6 L7.2,7.4 L5.4,7.0 Z" fill="#c0c7d1" />
        <CasedStroke d="M8.8,9.4 Q13.8,4.4 19.4,6.8 Q19.2,10.2 17.6,12.0" color={APEX_GREEN} width={0.9} casing={1.8} />
        <path
          d="M5.6,5.8 L6.8,10.6 L11.8,13.0 L19.0,13.8 M6.8,10.6 L6.6,16.0 L6.2,19.8 M11.8,13.0 L12.4,19.8 M8.8,11.8 L10.4,15.2"
          fill="none"
          stroke={APEX_GREEN}
          strokeWidth="0.85"
          strokeLinecap="round"
        />
        {[
          [5.6, 5.8],
          [6.8, 10.6],
          [11.8, 13.0],
          [19.0, 13.8],
          [14.2, 5.2],
          [19.4, 6.8],
          [6.2, 19.8],
          [12.4, 19.8],
        ].map(([nx, ny], idx) => (
          <circle key={idx} cx={nx} cy={ny} r="0.8" fill={APEX_GREEN} stroke={APEX_OUTLINE} strokeWidth="0.6" />
        ))}
      </g>
    ),
  },
  {
    name: 'V4 Stalking Low Crouch',
    render: () => (
      <g strokeLinejoin="round">
        <path
          d="M2.2,9.2 L6.2,7.6 L9.4,8.4 L11.4,10.4 L16.4,11.2 L21.6,11.0 L19.6,13.2 L14.4,14.2 L13.4,16.8 L15.2,20.6 L12.2,20.6 L10.8,16.2 L8.2,16.4 L6.4,20.6 L3.8,20.4 L6.0,15.0 L5.8,12.0 L3.4,12.6 L2.8,11.2 L5.4,10.4 L2.4,10.4 Z"
          fill="#89929e"
          stroke={APEX_OUTLINE}
          strokeWidth="0.95"
        />
        <path d="M4.0,8.4 L8.4,8.6 L9.0,9.8 L4.2,9.6 Z" fill="#c0c7d1" />
        <CasedStroke
          d="M9.8,8.4 Q14.2,3.6 19.4,5.6 Q19.2,8.4 17.8,10.2"
          color={APEX_GREEN}
          width={0.95}
          casing={1.85}
        />
        <path
          d="M5.4,9.2 L9.6,11.8 L13.4,12.6 L19.4,11.8 M9.6,11.8 L7.0,16.0 L5.2,19.8 M13.4,12.6 L13.4,19.8"
          fill="none"
          stroke={APEX_GREEN}
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        {[
          [5.4, 9.2],
          [9.6, 11.8],
          [13.4, 12.6],
          [19.4, 11.8],
          [14.4, 4.4],
          [19.4, 5.6],
          [5.2, 19.8],
          [13.4, 19.8],
        ].map(([nx, ny], idx) => (
          <circle key={idx} cx={nx} cy={ny} r="0.9" fill={APEX_GREEN} stroke={APEX_OUTLINE} strokeWidth="0.6" />
        ))}
      </g>
    ),
  },
  {
    name: 'V5 Upright S-Tail',
    render: () => (
      <g strokeLinejoin="round">
        <path
          d="M4.2,5.2 L7.6,4.2 L10.0,5.4 L9.6,8.0 L11.4,10.8 C13.2,12.6 15.2,14.8 17.8,14.4 C19.8,14.0 21.0,12.2 21.4,10.8 C21.2,13.6 19.6,16.2 16.8,16.8 L13.4,16.4 L14.6,20.8 L11.6,20.8 L10.6,16.4 L8.4,16.4 L7.4,20.8 L4.6,20.8 L6.6,15.2 L6.4,11.4 L4.2,11.6 L3.8,10.8 L6.2,9.8 L6.4,7.6 L4.0,7.2 Z"
          fill="#89929e"
          stroke={APEX_OUTLINE}
          strokeWidth="0.95"
        />
        <path d="M5.4,5.0 L8.8,5.2 L9.0,6.6 L5.6,6.4 Z" fill="#c0c7d1" />
        {/* Shorter curved green node chain shifted up and right */}
        <CasedStroke d="M12.2,6.8 Q15.8,3.2 20.0,4.8 Q20.4,7.2 19.2,9.0" color={APEX_GREEN} width={0.9} casing={1.8} />
        <path
          d="M6.6,5.8 L8.8,10.8 L12.0,14.6 L18.6,15.0 M8.8,10.8 L7.4,16.0 L6.2,19.8 M12.0,14.6 L13.0,19.8 M8.8,10.8 L4.8,11.2"
          fill="none"
          stroke={APEX_GREEN}
          strokeWidth="0.85"
          strokeLinecap="round"
        />
        {[
          [6.6, 5.8],
          [8.8, 10.8],
          [12.0, 14.6],
          [18.6, 15.0],
          [12.2, 6.8],
          [16.8, 3.8],
          [20.0, 5.0],
          [19.2, 9.0],
          [6.2, 19.8],
          [13.0, 19.8],
        ].map(([nx, ny], idx) => (
          <circle key={idx} cx={nx} cy={ny} r="0.8" fill={APEX_GREEN} stroke={APEX_OUTLINE} strokeWidth="0.6" />
        ))}
      </g>
    ),
  },
];

/**
 * APEX graph operators.
 */
export const APEX_GRAPH_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.apex.graph',
    label: 'APEX Graph',
    family: 'sop',
    description:
      'Green graph-node stick figure over a pale lavender grid panel with an angled blue-and-white eraser at the upper right.',
    types: ['graph'],
    icons: ['sop_apex-graph'],
    refKey: 'SOP_apex-graph',
    render: () => (
      <g strokeLinejoin="round">
        <ApexGridPanel x={2.6} y={5.6} w={13.6} h={12.6} />
        <ApexGraphFigure x={9.4} y={12.0} scale={0.94} />
        {/* Tilted two-tone eraser at upper right */}
        <g transform="translate(17.4 7.6) rotate(-42)">
          <rect
            x="-2.2"
            y="-3.4"
            width="4.4"
            height="3.6"
            rx="0.5"
            fill="#f2f4f7"
            stroke={APEX_OUTLINE}
            strokeWidth="0.95"
          />
          <rect
            x="-2.2"
            y="0.2"
            width="4.4"
            height="3.2"
            rx="0.5"
            fill="#3672c4"
            stroke={APEX_OUTLINE}
            strokeWidth="0.95"
          />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.apex.buildfkgraph',
    label: 'APEX Build FK Graph',
    family: 'sop',
    description:
      'Green graph-node stick figure over a pale lavender grid panel with a diagonal yellow pencil pointing down-left on the right.',
    types: ['buildfkgraph'],
    icons: ['sop_apex-buildfkgraph'],
    refKey: 'SOP_apex-buildfkgraph',
    render: () => (
      <g strokeLinejoin="round">
        <ApexGridPanel x={2.6} y={5.6} w={13.6} h={12.6} />
        <ApexGraphFigure x={9.2} y={12.0} scale={0.94} />
        {/* Diagonal yellow pencil (mirrored horizontally) */}
        <g transform="translate(16.8 10.6) rotate(42)">
          <rect
            x="-1.3"
            y="-5.8"
            width="2.6"
            height="1.6"
            rx="0.4"
            fill="#ee8624"
            stroke={APEX_OUTLINE}
            strokeWidth="0.85"
          />
          <rect x="-1.3" y="-4.2" width="2.6" height="7.6" fill="#f2c438" stroke={APEX_OUTLINE} strokeWidth="0.85" />
          <polygon points="-1.3,3.4 1.3,3.4 0,6.2" fill="#ffe47a" stroke={APEX_OUTLINE} strokeWidth="0.85" />
          <polygon points="-0.45,5.2 0.45,5.2 0,6.2" fill={APEX_OUTLINE} />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.apex.configuregraph',
    label: 'APEX Configure Graph',
    family: 'sop',
    description:
      'Green graph-node stick figure over a pale lavender grid panel with a large grey 8-tooth gear at the lower right.',
    types: ['configuregraph'],
    icons: ['sop_apex-configuregraph'],
    refKey: 'SOP_apex-configuregraph',
    render: () => (
      <g strokeLinejoin="round">
        <ApexGridPanel x={2.6} y={5.6} w={13.6} h={12.6} />
        <ApexGraphFigure x={9.0} y={12.0} scale={0.94} />
        {/* Large grey 8-tooth gear */}
        <path d={gearPath(15.6, 15.2, 8, 5.4, 3.8)} fill="#c0c7d1" stroke={APEX_OUTLINE} strokeWidth="0.95" />
        <circle cx="15.6" cy="15.2" r="2.0" fill="#89929e" stroke={APEX_OUTLINE} strokeWidth="0.8" />
      </g>
    ),
  },
  {
    id: 'sop.apex.layoutgraph',
    label: 'APEX Layout Graph',
    family: 'sop',
    description:
      'Side view of a grey dinosaur facing left with a green wireframe graph overlaid on its body and tail and a curved green node chain arcing above its back.',
    types: ['layoutgraph'],
    icons: ['sop_apex-layoutgraph'],
    refKey: 'SOP_apex-layoutgraph',
    render: () => <>{LAYOUT_GRAPH_VARIANTS[4].render()}</>,
  },
  {
    id: 'sop.apex.mergegraph',
    label: 'APEX Merge Graph',
    family: 'sop',
    description:
      'Green graph-node stick figure missing its right leg on the left side of a pale lavender grid panel, joined by a white plus sign to a detached green right leg.',
    types: ['mergegraph'],
    icons: ['sop_apex-mergegraph'],
    refKey: 'SOP_apex-mergegraph',
    render: () => (
      <g strokeLinejoin="round">
        <ApexGridPanel x={3.2} y={5.6} w={15.0} h={12.6} />
        <ApexGraphFigure x={8.2} y={12.0} scale={0.9} legMode="leftOnly" />
        <ApexPlusSign cx={12.4} cy={13.8} scale={0.9} />
        <ApexGraphFigure x={15.0} y={12.0} scale={0.9} legMode="rightLegOnly" />
      </g>
    ),
  },
  {
    id: 'sop.apex.invokegraph',
    label: 'APEX Invoke Graph',
    family: 'sop',
    description:
      'Green graph-node stick figure over a pale lavender grid panel with an orange rounded-square play button at the upper right.',
    types: ['sceneinvoke'],
    icons: ['sop_apex-invokegraph', 'sop_apex-sceneinvoke'],
    refKey: 'SOP_apex-invokegraph',
    render: () => (
      <g strokeLinejoin="round">
        <ApexGridPanel x={2.6} y={5.6} w={13.6} h={12.6} />
        <ApexGraphFigure x={9.2} y={12.0} scale={0.94} />
        {/* Orange rounded-square play button */}
        <path d={roundedRectPath(13.8, 3.0, 7.6, 6.6, 1.5)} fill="#ee8624" stroke={APEX_OUTLINE} strokeWidth="0.95" />
        <polygon points="16.4,4.7 16.4,7.9 19.4,6.3" fill="#ffffff" />
      </g>
    ),
  },
  {
    id: 'sop.apex.script',
    label: 'APEX Script',
    family: 'sop',
    description:
      'Green graph-node stick figure over a pale lavender grid panel with an accordion-folded white script sheet displaying green node-graph flowcharts on the right.',
    types: [],
    icons: ['sop_apex-script'],
    refKey: 'SOP_apex-script',
    render: () => (
      <g strokeLinejoin="round">
        <ApexGridPanel x={2.6} y={5.6} w={13.6} h={12.6} />
        <ApexGraphFigure x={8.6} y={12.0} scale={0.92} />
        {/* Accordion-folded white script sheet shifted right */}
        <g transform="translate(16.2 13.0) scale(0.58) translate(-12 -11.6)">
          <polygon
            points="2.8,5.6 9.6,4.0 11.2,14.8 4.4,16.4"
            fill="#ffffff"
            stroke={APEX_OUTLINE}
            strokeWidth="1.35"
          />
          <polygon
            points="9.6,4.0 12.2,8.4 13.8,19.2 11.2,14.8"
            fill="#c0c7d1"
            stroke={APEX_OUTLINE}
            strokeWidth="1.35"
          />
          <polygon
            points="12.2,8.4 19.6,6.4 21.2,17.2 13.8,19.2"
            fill="#ffffff"
            stroke={APEX_OUTLINE}
            strokeWidth="1.35"
          />
          <path d="M6.4,7.6 L7.8,11.8" fill="none" stroke={APEX_OUTLINE} strokeWidth="1.1" />
          <rect x="5.0" y="6.4" width="2.6" height="2.0" fill="#58c848" stroke={APEX_OUTLINE} strokeWidth="1.05" />
          <rect x="6.5" y="10.8" width="2.6" height="2.0" fill="#58c848" stroke={APEX_OUTLINE} strokeWidth="1.05" />
          <path d="M16.0,10.6 L15.0,14.8 M16.0,10.6 L18.2,14.2" fill="none" stroke={APEX_OUTLINE} strokeWidth="1.1" />
          <rect x="14.6" y="9.2" width="2.7" height="2.0" fill="#58c848" stroke={APEX_OUTLINE} strokeWidth="1.05" />
          <rect x="13.6" y="13.8" width="2.5" height="2.0" fill="#58c848" stroke={APEX_OUTLINE} strokeWidth="1.05" />
          <rect x="17.0" y="13.0" width="2.5" height="2.0" fill="#58c848" stroke={APEX_OUTLINE} strokeWidth="1.05" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.apex.sceneaddcharacter',
    label: 'APEX Scene Add Character',
    family: 'sop',
    description:
      'Green graph-node stick figure over a pale lavender grid panel with a bold white plus sign at the lower right.',
    types: ['sceneaddcharacter', 'sceneaddprop'],
    icons: ['sop_apex-sceneaddcharacter', 'sop_apex-sceneaddprop'],
    refKey: 'SOP_apex-sceneaddcharacter',
    render: () => (
      <g strokeLinejoin="round">
        <ApexGridPanel x={2.6} y={5.6} w={13.6} h={12.6} />
        <ApexGraphFigure x={9.2} y={12.0} scale={0.94} />
        <ApexPlusSign cx={17.2} cy={15.6} scale={0.95} />
      </g>
    ),
  },
  {
    id: 'sop.apex.sceneanimate',
    label: 'APEX Scene Animate',
    family: 'sop',
    description:
      'Green graph-node stick figure over a pale lavender grid panel with two ghosted green arm-swing motion trails rising to the right.',
    types: ['sceneanimate'],
    icons: ['sop_apex-sceneanimate'],
    refKey: 'SOP_apex-sceneanimate',
    render: () => (
      <g strokeLinejoin="round">
        <ApexGridPanel x={2.6} y={5.6} w={13.6} h={12.6} />
        {/* Ghosted motion trails with dark casing (shorter upper arm) */}
        <g opacity="0.65">
          <CasedStroke d="M12.6,8.0 L15.4,6.6 L17.6,6.0" color={APEX_GREEN_LIGHT} width={1.1} casing={2.0} />
          <CasedStroke d="M12.6,8.0 L16.8,8.4 L20.0,9.2" color={APEX_GREEN_LIGHT} width={1.1} casing={2.0} />
          <rect
            x="16.8"
            y="5.2"
            width="1.6"
            height="1.6"
            rx="0.3"
            fill={APEX_GREEN_LIGHT}
            stroke={APEX_OUTLINE}
            strokeWidth="0.65"
          />
          <rect
            x="19.2"
            y="8.4"
            width="1.6"
            height="1.6"
            rx="0.3"
            fill={APEX_GREEN_LIGHT}
            stroke={APEX_OUTLINE}
            strokeWidth="0.65"
          />
        </g>
        <ApexGraphFigure x={8.8} y={12.0} scale={0.94} />
      </g>
    ),
  },
  {
    id: 'sop.invokegraph',
    label: 'Invoke Compiled Graph',
    family: 'sop',
    description:
      'Metallic grey circular pedestal with a blue emitter core casting a rainbow halo upward around a dark disc containing a simple white node graph, and a yellow lightning bolt at the lower right.',
    types: [],
    icons: ['sop_invokegraph'],
    refKey: 'SOP_invokegraph',
    render: (uid) => (
      <g strokeLinejoin="round">
        <defs>
          <radialGradient id={`${uid}-core`} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#3672c4" />
            <stop offset="65%" stopColor="#2e3338" />
            <stop offset="100%" stopColor="#262626" />
          </radialGradient>
        </defs>
        {/* Metallic circular emitter pad at bottom */}
        <ellipse cx="11.2" cy="17.8" rx="7.0" ry="3.0" fill="#89929e" stroke={APEX_OUTLINE} strokeWidth="0.95" />
        <ellipse cx="11.2" cy="16.6" rx="6.4" ry="2.5" fill="#eef2f7" stroke={APEX_OUTLINE} strokeWidth="0.9" />
        <ellipse cx="11.2" cy="16.4" rx="3.8" ry="1.3" fill="#5aa2f2" stroke={APEX_OUTLINE} strokeWidth="0.7" />
        {/* Rainbow halo rising from the blue emitter core */}
        <path
          d="M7.6,16.0 C5.0,13.6 5.0,9.4 7.4,6.4 M14.8,16.0 C17.4,13.6 17.4,9.4 15.0,6.4"
          fill="none"
          stroke="#5aa2f2"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M8.6,15.8 C6.4,13.6 6.4,9.6 8.6,7.0 M13.8,15.8 C16.0,13.6 16.0,9.6 13.8,7.0"
          fill="none"
          stroke="#52d638"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M9.6,15.6 C8.0,13.6 8.0,9.8 9.6,7.6 M12.8,15.6 C14.4,13.6 14.4,9.8 12.8,7.6"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1.0"
          strokeLinecap="round"
        />
        {/* Dark center circle with simple white graph */}
        <circle cx="11.2" cy="8.6" r="5.4" fill={`url(#${uid}-core)`} stroke={APEX_OUTLINE} strokeWidth="0.95" />
        <path
          d="M8.8,7.2 L11.4,6.0 L13.8,8.4 L10.4,10.8 Z M11.4,6.0 L10.4,10.8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        {[
          [8.8, 7.2],
          [11.4, 6.0],
          [13.8, 8.4],
          [10.4, 10.8],
        ].map(([px, py], idx) => (
          <circle key={idx} cx={px} cy={py} r="0.9" fill="#ffffff" />
        ))}
        {/* Yellow lightning bolt at lower right */}
        <polygon
          points="17.8,12.2 21.4,12.2 19.2,15.6 21.6,15.6 16.4,21.4 18.0,17.0 15.8,17.0"
          fill="#f2c438"
          stroke={APEX_OUTLINE}
          strokeWidth="0.9"
        />
      </g>
    ),
  },
];
