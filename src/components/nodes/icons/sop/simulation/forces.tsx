import type { OperatorIconDef } from '../../iconTypes';

/**
 * Force, collision and ballistic path operators.
 */
export const FORCE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.force',
    label: 'Force',
    family: 'sop',
    description: 'Conjoined 3D blue metaball pair surrounded by six inward-pointing red force arrows.',
    types: ['force'],
    icons: ['sop_force'],
    refKey: 'SOP_force',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-mb`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#8fc2ff" />
            <stop offset="100%" stopColor="#3672c4" />
          </radialGradient>
        </defs>
        <path
          d="M12.91,8.79 A3.6,3.6 0 1 0 9.17,13.77 Q10.62,13.84 11.09,15.21 A3.6,3.6 0 1 0 14.83,10.23 Q13.38,10.16 12.91,8.79 Z"
          fill={`url(#${uid}-mb)`}
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <g stroke="#262626" strokeWidth="2.4" strokeLinecap="round">
          <line x1="3.5" y1="4.5" x2="6.2" y2="6.8" />
          <line x1="13.5" y1="2.8" x2="12.8" y2="5.8" />
          <line x1="20.8" y1="7.5" x2="18" y2="9.2" />
          <line x1="20.5" y1="18.5" x2="17.8" y2="16.4" />
          <line x1="10.5" y1="21.2" x2="11.2" y2="18.2" />
          <line x1="3.2" y1="16.5" x2="6" y2="14.8" />
        </g>
        <g stroke="#e03228" strokeWidth="1.4" strokeLinecap="round">
          <line x1="3.5" y1="4.5" x2="6.2" y2="6.8" />
          <line x1="13.5" y1="2.8" x2="12.8" y2="5.8" />
          <line x1="20.8" y1="7.5" x2="18" y2="9.2" />
          <line x1="20.5" y1="18.5" x2="17.8" y2="16.4" />
          <line x1="10.5" y1="21.2" x2="11.2" y2="18.2" />
          <line x1="3.2" y1="16.5" x2="6" y2="14.8" />
        </g>
        <g fill="#e03228" stroke="#262626" strokeWidth="0.6" strokeLinejoin="round">
          <polygon points="7.5,7.8 4.4,7.6 6.5,4.8" />
          <polygon points="12.5,7.2 11,4.6 14.2,5" />
          <polygon points="16.8,10 18,7.2 19.6,10" />
          <polygon points="16.5,15.4 19.6,15.6 17.5,18.4" />
          <polygon points="11.5,16.8 13,19.4 9.8,19" />
          <polygon points="7.2,14 6,16.8 4.4,14" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.collisionsource',
    label: 'Collision Source',
    family: 'sop',
    description: 'Yellow rain boot stepping down into a splashing blue puddle.',
    types: ['collisionsource'],
    icons: ['shelf_deforming_object', 'sop_collisionsource'],
    refKey: 'SHELF_deforming_object',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <path
          d="M3,14 C3,11.5 5.5,10.5 7,13 C8.5,10 15.5,10 17,13 C18.5,10.5 21,11.5 21,14 C21,18.5 16.5,20.5 12,20.5 C7.5,20.5 3,18.5 3,14 Z"
          fill="#5aa2f2"
        />
        <polygon points="10.5,3.5 15.5,5 13.5,12 16.5,14.5 15.2,17.2 8.2,14 10,8.5" fill="#ffe47a" />
      </g>
    ),
  },
  {
    id: 'sop.collisiondetectcl',
    label: 'Collision Detect CL',
    family: 'sop',
    description: 'Red sphere and blue sphere colliding in the center with red impact sparks.',
    types: ['collisiondetectcl'],
    icons: ['sop_collisiondetectcl'],
    refKey: 'SOP_collisiondetectcl',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.2">
          <circle cx="7.8" cy="12.5" r="4.8" fill="#e03228" />
          <circle cx="16.2" cy="12.5" r="4.8" fill="#3672c4" />
        </g>
        <circle cx="6.5" cy="10.8" r="1.2" fill="#ffc4d0" />
        <circle cx="14.8" cy="10.8" r="1.2" fill="#8fc2ff" />
        <path
          d="M12,5.5 V8.5 M10,6.5 L11.2,8.8 M14,6.5 L12.8,8.8 M12,16.5 V19"
          stroke="#e03228"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.ballisticpath',
    label: 'Ballistic Path',
    family: 'sop',
    description: 'Tilted grey cannon on wheels firing a metallic ball along a dashed red arc.',
    types: ['ballisticpath'],
    icons: ['sop_ballisticpath'],
    refKey: 'SOP_ballisticpath',
    render: () => (
      <>
        <path
          d="M13.5,9.5 L18.5,6.5 V18.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.3"
          strokeDasharray="2 1.4"
          strokeLinecap="round"
        />
        <polygon points="18.5,19.8 16.8,16.8 20.2,16.8" fill="#e03228" />
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="4,15 12.5,8.5 14.5,11.2 6,17.5" fill="#c0c7d1" />
          <circle cx="7.5" cy="16.8" r="2.6" fill="#5a616b" />
          <circle cx="7.5" cy="16.8" r="1" fill="#eef2f7" />
          <circle cx="18.5" cy="6.5" r="2" fill="#89929e" />
        </g>
      </>
    ),
  },
];
