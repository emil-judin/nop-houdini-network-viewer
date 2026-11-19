import { arrowHead, pts } from '../../../geoHelpers';
import { CasedStroke } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import { CarTire, ConstraintChunk, FracturedTwoBlockStack, RedSportsCar } from '../../kits/rbd';

/**
 * RBD constraint and car rig operators.
 */
export const RBD_CONSTRAINT_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.rbdconstraintproperties',
    label: 'RBD Constraint Properties',
    family: 'sop',
    description: 'Small white-grey chunks joined by dotted red constraint lines with a diagonal yellow-orange pencil.',
    types: ['rbdconstraintproperties'],
    icons: ['sop_rbdconstraintproperties'],
    refKey: 'SOP_rbdconstraintproperties',
    render: () => {
      const links = 'M5.8,8.4 L10.2,17.2 L17.6,15.6 L13.4,10.2 Z';
      return (
        <g strokeLinejoin="round">
          <path d={links} fill="none" stroke="#262626" strokeWidth="1.9" strokeDasharray="1.3 1.4" />
          <path d={links} fill="none" stroke="#e03228" strokeWidth="1.05" strokeDasharray="1.3 1.4" />
          <ConstraintChunk cx={5.8} cy={8.4} scale={0.92} variant={0} dotColor="#e03228" />
          <ConstraintChunk cx={10.2} cy={17.2} scale={0.98} variant={1} dotColor="#e03228" />
          <ConstraintChunk cx={17.6} cy={15.6} scale={0.95} variant={2} dotColor="#e03228" />
          <ConstraintChunk cx={13.4} cy={10.2} scale={0.88} variant={0} dotColor="#e03228" />
          {/* Diagonal pencil from upper-right to lower-left */}
          <g transform="translate(13.6, 9.6) rotate(42)">
            {/* Eraser */}
            <rect
              x="-1.4"
              y="-7.6"
              width="2.8"
              height="2.0"
              rx="0.6"
              fill="#ff7066"
              stroke="#262626"
              strokeWidth="0.9"
            />
            {/* Ferrule */}
            <rect x="-1.4" y="-5.6" width="2.8" height="1.3" fill="#c0c7d1" stroke="#262626" strokeWidth="0.85" />
            {/* Shaft */}
            <rect x="-1.4" y="-4.3" width="2.8" height="7.6" fill="#f2c438" stroke="#262626" strokeWidth="0.95" />
            <rect x="0.1" y="-4.3" width="1.3" height="7.6" fill="#ee8624" />
            {/* Tip */}
            <polygon points="-1.4,3.3 1.4,3.3 0,6.2" fill="#c89a5a" stroke="#262626" strokeWidth="0.9" />
            <polygon points="-0.5,5.1 0.5,5.1 0,6.2" fill="#262626" />
          </g>
        </g>
      );
    },
  },
  {
    id: 'sop.rbdconetwistconstraintproperties',
    label: 'RBD Cone Twist Constraint Properties',
    family: 'sop',
    description:
      'Tall orange pushpin pointing down-left into a large translucent light-blue cone halo with a dark sphere point shifted down-right.',
    types: ['rbdconetwistconstraintproperties'],
    icons: ['sop_rbdconetwistconstraintproperties'],
    refKey: 'SOP_rbdconetwistconstraintproperties',
    render: (uid) => (
      <g strokeLinejoin="round">
        <defs>
          <radialGradient id={`${uid}-cone-ball`} cx="38%" cy="34%" r="62%">
            <stop offset="0%" stopColor="#c0c7d1" />
            <stop offset="55%" stopColor="#5a616b" />
            <stop offset="100%" stopColor="#3a3f47" />
          </radialGradient>
        </defs>
        {/* Larger soft translucent cone halo */}
        <path
          d="M8.6,10.2 L18.8,13.2 A4.6,5.0 25 1,1 11.4,19.8 Z"
          fill="#8fc2ff"
          fillOpacity="0.48"
          stroke="#5aa2f2"
          strokeWidth="0.75"
        />
        {/* Larger dark point/sphere shifted down and right inside cone halo */}
        <circle cx="14.6" cy="16.0" r="2.6" fill={`url(#${uid}-cone-ball)`} stroke="#262626" strokeWidth="0.85" />
        {/* Taller orange pushpin pointing straight down-left into cone apex */}
        <g transform="translate(13.0, 8.6) rotate(42) scale(1.18)">
          <line x1="0" y1="0.8" x2="0" y2="4.4" stroke="#262626" strokeWidth="1.0" strokeLinecap="round" />
          <ellipse cx="0" cy="-0.4" rx="3.2" ry="1.6" fill="#ee8624" stroke="#262626" strokeWidth="0.85" />
          <path d="M-1.5,-0.6 L-1.1,-4.6 L1.1,-4.6 L1.5,-0.6 Z" fill="#c25e12" stroke="#262626" strokeWidth="0.8" />
          <ellipse cx="0" cy="-4.8" rx="2.5" ry="1.3" fill="#ffb066" stroke="#262626" strokeWidth="0.85" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.rbdconstraintsfromcurves',
    label: 'RBD Constraints from Curves',
    family: 'sop',
    description: 'Two stacked fractured grey blocks with a bright yellow curve passing through the middle gap.',
    types: ['rbdconstraintsfromcurves'],
    icons: ['sop_rbdconstraintsfromcurves'],
    refKey: 'SOP_rbdconstraintsfromcurves',
    render: () => (
      <g>
        <FracturedTwoBlockStack layer="lower" />
        <CasedStroke d="M3.0,13.6 C7.6,10.6 14.4,12.2 21.0,9.4" color="#ffe47a" width={1.55} casing={2.8} />
        <FracturedTwoBlockStack layer="upper" />
      </g>
    ),
  },
  {
    id: 'sop.rbdconstraintsfromlines',
    label: 'RBD Constraints from Lines',
    family: 'sop',
    description: 'Two stacked fractured grey blocks joined across the gap by vertical green constraint rods.',
    types: ['rbdconstraintsfromlines'],
    icons: ['sop_rbdconstraintsfromlines'],
    refKey: 'SOP_rbdconstraintsfromlines',
    render: () => (
      <g strokeLinejoin="round">
        <FracturedTwoBlockStack layer="lower" />
        {/* Vertical green constraint rods */}
        {[
          [8.0, 9.6, 13.8],
          [10.4, 10.4, 14.8],
          [13.4, 10.2, 14.8],
          [15.8, 9.4, 13.8],
        ].map(([x, y1, y2], idx) => (
          <rect
            key={idx}
            x={x - 0.75}
            y={y1}
            width="1.5"
            height={y2 - y1}
            rx="0.4"
            fill="#58c848"
            stroke="#262626"
            strokeWidth="0.75"
          />
        ))}
        <FracturedTwoBlockStack layer="upper" />
      </g>
    ),
  },
  {
    id: 'sop.rbdconstraintsfromrules',
    label: 'RBD Constraints from Rules',
    family: 'sop',
    description: 'Two stacked fractured grey blocks encircled at the gap by a light-blue wireframe box frame.',
    types: ['rbdconstraintsfromrules'],
    icons: ['sop_rbdconstraintsfromrules'],
    refKey: 'SOP_rbdconstraintsfromrules',
    render: () => (
      <g>
        {/* Back wireframe lines */}
        <CasedStroke d="M4.0,10.8 L12.0,7.2 L20.0,10.8" color="#5aa2f2" width={0.9} casing={1.9} />
        <FracturedTwoBlockStack layer="both" />
        {/* Front wireframe box frame */}
        <CasedStroke
          d="M4.0,10.8 L12.0,14.4 L20.0,10.8 M4.0,13.6 L12.0,17.2 L20.0,13.6 M4.0,10.8 V13.6 M12.0,14.4 V17.2 M20.0,10.8 V13.6"
          color="#8fc2ff"
          width={1.05}
          casing={2.1}
        />
      </g>
    ),
  },
  {
    id: 'sop.rbdconvertconstraints',
    label: 'RBD Convert Constraints',
    family: 'sop',
    description:
      'Three white-grey chunks with the two left chunks linked by a dashed red line and the two right chunks linked by a dashed green line.',
    types: ['rbdconvertconstraints'],
    icons: ['sop_rbdconvertconstraints'],
    refKey: 'SOP_rbdconvertconstraints',
    render: () => (
      <g strokeLinejoin="round">
        {/* Two left chunks connected with dashed red */}
        <path d="M5.4,16.8 L11.4,6.8" fill="none" stroke="#262626" strokeWidth="2.2" strokeDasharray="1.8 1.4" />
        <path d="M5.4,16.8 L11.4,6.8" fill="none" stroke="#e03228" strokeWidth="1.25" strokeDasharray="1.8 1.4" />
        {/* Two right chunks connected with dashed green */}
        <path d="M11.4,6.8 L18.4,14.4" fill="none" stroke="#262626" strokeWidth="2.2" strokeDasharray="1.8 1.4" />
        <path d="M11.4,6.8 L18.4,14.4" fill="none" stroke="#58c848" strokeWidth="1.25" strokeDasharray="1.8 1.4" />
        <ConstraintChunk cx={5.4} cy={16.8} scale={1.12} variant={0} dotColor="#e03228" />
        <ConstraintChunk cx={11.4} cy={6.8} scale={1.15} variant={1} dotColor="#58c848" />
        <ConstraintChunk cx={18.4} cy={14.4} scale={1.12} variant={2} dotColor="#58c848" />
      </g>
    ),
  },
  {
    id: 'sop.rbdgroupconstraints',
    label: 'RBD Group Constraints',
    family: 'sop',
    description: 'Cluster of small white-grey chunks with red dots joined by a web of dotted red constraint lines.',
    types: ['rbdgroupconstraints'],
    icons: ['sop_rbdgroupconstraints'],
    refKey: 'SOP_rbdgroupconstraints',
    render: () => {
      const nodes: readonly { p: [number, number]; s: number; v: 0 | 1 | 2 }[] = [
        { p: [6.4, 5.4], s: 1.0, v: 0 },
        { p: [14.8, 5.2], s: 1.08, v: 1 },
        { p: [4.6, 12.4], s: 0.95, v: 2 },
        { p: [11.2, 10.6], s: 1.05, v: 1 },
        { p: [18.8, 10.8], s: 0.95, v: 0 },
        { p: [8.4, 18.2], s: 1.12, v: 0 },
        { p: [17.4, 17.6], s: 1.02, v: 2 },
      ];
      const edges = [
        `M${pts([nodes[0].p, nodes[1].p])}`,
        `M${pts([nodes[0].p, nodes[2].p])}`,
        `M${pts([nodes[0].p, nodes[3].p])}`,
        `M${pts([nodes[1].p, nodes[3].p])}`,
        `M${pts([nodes[1].p, nodes[4].p])}`,
        `M${pts([nodes[2].p, nodes[3].p])}`,
        `M${pts([nodes[2].p, nodes[5].p])}`,
        `M${pts([nodes[3].p, nodes[4].p])}`,
        `M${pts([nodes[3].p, nodes[5].p])}`,
        `M${pts([nodes[3].p, nodes[6].p])}`,
        `M${pts([nodes[4].p, nodes[6].p])}`,
        `M${pts([nodes[5].p, nodes[6].p])}`,
      ].join(' ');
      return (
        <g>
          <path d={edges} fill="none" stroke="#262626" strokeWidth="1.65" strokeDasharray="1.2 1.2" />
          <path d={edges} fill="none" stroke="#e03228" strokeWidth="0.95" strokeDasharray="1.2 1.2" />
          {nodes.map((n, idx) => (
            <ConstraintChunk key={idx} cx={n.p[0]} cy={n.p[1]} scale={n.s} variant={n.v} dotColor="#e03228" />
          ))}
        </g>
      );
    },
  },
  {
    id: 'sop.rbdcardeform',
    label: 'RBD Car Deform',
    family: 'sop',
    description: 'Upright black and dark-grey 3D car tire.',
    types: ['rbdcardeform'],
    icons: ['sop_rbdcardeform'],
    refKey: 'SOP_rbdcardeform',
    render: (uid) => <CarTire uid={uid} />,
  },
  {
    id: 'sop.rbdcarfollowpath',
    label: 'RBD Car Follow Path',
    family: 'sop',
    description: 'White-and-orange boxy rover in 3/4 view with dark windshield, top dish, and four black tires.',
    types: ['rbdcarfollowpath', 'rbdcarrig'],
    icons: ['sop_rbdcarfollowpath', 'sop_rbdcarrig'],
    refKey: 'SOP_rbdcarfollowpath',
    render: () => (
      <g strokeLinejoin="round">
        {/* Far wheels */}
        <circle cx="15.8" cy="14.2" r="2.1" fill="#3a3f47" stroke="#262626" strokeWidth="0.95" />
        {/* Main white-grey boxy rover body */}
        <polygon
          points="4.2,10.2 10.6,7.2 18.6,9.4 18.6,13.6 12.2,16.8 4.2,14.2"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1"
        />
        <polygon points="12.2,12.2 18.6,9.4 18.6,13.6 12.2,16.8" fill="#c0c7d1" stroke="#262626" strokeWidth="0.95" />
        {/* Orange roof trim */}
        <polygon points="6.4,8.6 11.0,6.6 15.6,8.0 11.2,10.2" fill="#ee8624" stroke="#262626" strokeWidth="0.9" />
        {/* Dark windshield */}
        <polygon points="12.6,11.6 17.6,9.5 17.6,11.8 12.6,13.8" fill="#3a3f47" stroke="#262626" strokeWidth="0.8" />
        {/* Top radar dish */}
        <line x1="12.2" y1="7.2" x2="12.2" y2="5.2" stroke="#262626" strokeWidth="1.0" />
        <ellipse cx="12.2" cy="4.6" rx="2.0" ry="1.1" fill="#c0c7d1" stroke="#262626" strokeWidth="0.85" />
        {/* Near wheels */}
        <circle cx="6.2" cy="15.4" r="2.3" fill="#3a3f47" stroke="#262626" strokeWidth="1" />
        <circle cx="6.2" cy="15.4" r="0.9" fill="#c0c7d1" />
        <circle cx="12.4" cy="17.2" r="2.4" fill="#3a3f47" stroke="#262626" strokeWidth="1" />
        <circle cx="12.4" cy="17.2" r="0.95" fill="#c0c7d1" />
      </g>
    ),
  },
  {
    id: 'sop.rbdcarfracture',
    label: 'RBD Car Fracture',
    family: 'sop',
    description:
      'Straight side-view red sports car facing right with an open bonnet, missing front window, and missing front wheel.',
    types: ['rbdcarfracture'],
    icons: ['sop_rbdcarfracture'],
    refKey: 'SOP_rbdcarfracture',
    render: () => <RedSportsCar />,
  },
  {
    id: 'sop.rbdcartransform',
    label: 'RBD Car Transform',
    family: 'sop',
    description:
      'Straight side-view damaged red sports car above a diagonally perpendicular 2:1 isometric blue four-way transform cross-arrow.',
    types: ['rbdcartransform'],
    icons: ['sop_rbdcartransform'],
    refKey: 'SOP_rbdcartransform',
    render: () => {
      const aNW = arrowHead([4.8, 14.0], [12.0, 17.6], 2.8, 1.8);
      const aNE = arrowHead([19.2, 14.0], [12.0, 17.6], 2.8, 1.8);
      const aSW = arrowHead([4.8, 21.2], [12.0, 17.6], 2.8, 1.8);
      const aSE = arrowHead([19.2, 21.2], [12.0, 17.6], 2.8, 1.8);
      return (
        <g strokeLinejoin="round">
          {/* 2:1 isometric diagonally perpendicular 4-way transform arrows */}
          <path d="M6.4,14.8 L17.6,20.4 M6.4,20.4 L17.6,14.8" stroke="#262626" strokeWidth="2.4" />
          <path d="M6.4,14.8 L17.6,20.4 M6.4,20.4 L17.6,14.8" stroke="#3672c4" strokeWidth="1.35" />
          <polygon points={pts(aNW)} fill="#5aa2f2" stroke="#262626" strokeWidth="0.8" />
          <polygon points={pts(aNE)} fill="#5aa2f2" stroke="#262626" strokeWidth="0.8" />
          <polygon points={pts(aSW)} fill="#5aa2f2" stroke="#262626" strokeWidth="0.8" />
          <polygon points={pts(aSE)} fill="#5aa2f2" stroke="#262626" strokeWidth="0.8" />
          <RedSportsCar ty={-3.6} />
        </g>
      );
    },
  },
  {
    id: 'sop.gluecluster',
    label: 'Glue Cluster',
    family: 'sop',
    description: 'Tilted white glue bottle with an orange label band and an orange nozzle pointing down-left.',
    types: ['gluecluster'],
    icons: ['sop_gluecluster'],
    refKey: 'SOP_gluecluster',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <path d="M13.5,3.5 L20.5,8.5 L12.5,17.5 L6.5,13 Z" fill="#eef2f7" />
        <polygon points="10.5,7.2 17.2,12.2 14.8,14.8 8.2,9.8" fill="#ee8624" />
        <polygon points="7.5,13.8 11.5,16.8 9.5,18.5 6.2,16" fill="#c0c7d1" />
        <polygon points="6.8,16.5 9,18 4.2,20.8" fill="#ee8624" />
      </g>
    ),
  },
  {
    id: 'sop.connectadjacentpieces',
    label: 'Connect Adjacent Pieces',
    family: 'sop',
    description: 'Three fractured white rock pieces connected by a dashed red triangle.',
    types: ['connectadjacentpieces'],
    icons: ['sop_connectadjacentpieces'],
    refKey: 'SOP_connectadjacentpieces',
    render: () => (
      <>
        <g fill="#eef2f7" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="3.5,6.5 7.5,5.5 9.5,8.5 6,11.2 3,9" />
          <polygon points="14,5 19.5,4.2 21,8.5 17.5,11.2 13.5,8.2" />
          <polygon points="8.5,16.5 13,15.8 14.2,19.2 10.2,21 7.5,19" />
        </g>
        <polygon
          points="6.5,8.2 17.2,7.8 11,18.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.3"
          strokeDasharray="1.8 1.2"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
