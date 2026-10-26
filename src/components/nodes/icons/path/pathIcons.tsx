import type { OperatorIconDef } from '../iconTypes';

/**
 * Path bar icon of the `/obj` context: a film clapperboard.
 */
export const PATH_OBJ_CONTEXT_ICON: OperatorIconDef = {
  id: 'path.obj',
  label: 'Object Context',
  family: 'path',
  description:
    'Path bar icon of the /obj context: a dark grey film clapperboard with a white and dark striped clapper tilted up on the left hinge and two light text lines on the slate.',
  types: ['obj'],
  render: () => (
    <>
      <rect x="3" y="10.5" width="18" height="10" rx="1" fill="#3a3f47" stroke="#262626" strokeWidth="1.2" />
      <rect x="5.5" y="14" width="7" height="1.4" fill="#89929e" />
      <rect x="5.5" y="17" width="10" height="1.4" fill="#89929e" />
      <g transform="rotate(-14 3.5 10)">
        <rect x="3" y="6.5" width="18" height="3.6" fill="#f2f4f7" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="6,6.5 9,6.5 7.5,10.1 4.5,10.1" fill="#3a3f47" />
        <polygon points="11.5,6.5 14.5,6.5 13,10.1 10,10.1" fill="#3a3f47" />
        <polygon points="17,6.5 20,6.5 18.5,10.1 15.5,10.1" fill="#3a3f47" />
      </g>
    </>
  ),
};

/**
 * Path bar icon of a Geometry object (`geo`): cylinder, cone and ball.
 */
export const PATH_GEO_OBJECT_ICON: OperatorIconDef = {
  id: 'path.geo',
  label: 'Geometry Object',
  family: 'path',
  description:
    'Path bar icon of a Geometry object: a tall blue cylinder at the back left, a red ball on the right and a yellow cone pointing down in front, between them.',
  types: ['geo'],
  render: (uid) => (
    <>
      <defs>
        <linearGradient id={`${uid}-cyl`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8fc2ff" />
          <stop offset="55%" stopColor="#3672c4" />
          <stop offset="100%" stopColor="#2a5596" />
        </linearGradient>
        <radialGradient id={`${uid}-ball`} cx="35%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#ffb4a8" />
          <stop offset="55%" stopColor="#e03228" />
          <stop offset="100%" stopColor="#8a1c16" />
        </radialGradient>
      </defs>
      <path d="M2.5 4.5 V17.5 A4.5 1.8 0 0 0 11.5 17.5 V4.5 Z" fill={`url(#${uid}-cyl)`} stroke="#262626" strokeWidth="1.1" />
      <ellipse cx="7" cy="4.5" rx="4.5" ry="1.8" fill="#8fc2ff" stroke="#262626" strokeWidth="1.1" />
      <circle cx="17" cy="12.5" r="5" fill={`url(#${uid}-ball)`} stroke="#262626" strokeWidth="1.1" />
      <polygon points="6.5,12 17.5,12 12,21.5" fill="#f2c438" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
      <polygon points="12,12 17.5,12 12,21.5" fill="#d49a18" />
      <ellipse cx="12" cy="12" rx="5.5" ry="1.6" fill="#ffe47a" stroke="#262626" strokeWidth="1.1" />
    </>
  ),
};

/**
 * Path bar icon of a digital asset without its own icon: a closed cardboard box.
 */
export const PATH_ASSET_ICON: OperatorIconDef = {
  id: 'path.asset',
  label: 'Digital Asset',
  family: 'path',
  description:
    'Path bar icon of a digital asset without its own icon: a closed cardboard box in isometric view with a light tape strip across the lid.',
  types: [],
  icons: ['misc_digital_asset'],
  render: () => (
    <>
      <polygon points="12,4.5 20,8.5 12,12.5 4,8.5" fill="#c89a5a" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
      <polygon points="4,8.5 12,12.5 12,20.5 4,16.5" fill="#a8783c" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
      <polygon points="12,12.5 20,8.5 20,16.5 12,20.5" fill="#7e5828" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
      <polygon points="7.2,6.6 9.2,5.6 16.8,9.4 14.8,10.4" fill="#e8c48a" />
    </>
  ),
};

/**
 * Icons that only appear in the network path bar (contexts and containers that are not SOPs).
 */
export const PATH_ICONS: OperatorIconDef[] = [PATH_OBJ_CONTEXT_ICON, PATH_GEO_OBJECT_ICON, PATH_ASSET_ICON];
