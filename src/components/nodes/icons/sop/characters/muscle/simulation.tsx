import { arrowHead, type Pt, pts } from '../../../geoHelpers';
import { CasedStroke, StraightArrow } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import {
  AnatomicalBone,
  BENT_LIMB_JOINTS,
  BentBlueLimb,
  MUSCLE_TONES,
  MuscleSpindle,
  MuscleTorso,
} from '../../kits/muscle';
import { SolverBrain } from '../../kits/solverBrain';

/**
 * Muscle simulation.
 * Reuses `BentBlueLimb`, `AnatomicalBone`, `MuscleSpindle`, `MuscleTorso`, and `SolverBrain`.
 */

const OUTLINE = '#262626';

/**
 * Muscle tension line, constraint, deform and solver operators.
 */
export const MUSCLE_SIMULATION_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.muscletensionlines',
    label: 'Muscle Tension Lines',
    family: 'sop',
    description:
      'Bent blue two-segment limb on the right with a cased green tension line between two green joint dots and a yellow pen on the left.',
    types: ['muscletensionlines'],
    icons: ['sop_muscletensionlines'],
    refKey: 'SOP_muscletensionlines',
    render: () => {
      const ox = 2.0;
      const [tx, ty] = BENT_LIMB_JOINTS.top;
      const [bx, by] = BENT_LIMB_JOINTS.bottom;
      return (
        <g strokeLinejoin="round" strokeLinecap="round">
          <BentBlueLimb offsetX={ox} />
          <CasedStroke d={`M${tx + ox},${ty} L${bx + ox},${by}`} color="#58c848" width={1.2} casing={2.2} />
          <circle cx={tx + ox} cy={ty} r="1.5" fill="#58c848" stroke={OUTLINE} strokeWidth="0.9" />
          <circle cx={bx + ox} cy={by} r="1.5" fill="#58c848" stroke={OUTLINE} strokeWidth="0.9" />
          {/* Straight yellow pen on the left pointing to bottom joint dot */}
          <polygon points="3.4,6.4 5.5,5.0 11.4,14.4 9.3,15.8" fill="#f2c438" stroke={OUTLINE} strokeWidth="1.0" />
          <line x1="4.8" y1="7.0" x2="9.8" y2="14.6" stroke="#ffe47a" strokeWidth="0.85" />
          <polygon points="9.3,15.8 11.4,14.4 12.1,17.2" fill="#eef2f7" stroke={OUTLINE} strokeWidth="0.85" />
        </g>
      );
    },
  },
  {
    id: 'sop.muscletensionlinesactivate',
    label: 'Muscle Tension Lines Activate',
    family: 'sop',
    description:
      'Bent blue two-segment limb with a glowing red-and-white active tension line connecting two red joint dots.',
    types: ['muscletensionlinesactivate'],
    icons: ['sop_muscletensionlinesactivate'],
    refKey: 'SOP_muscletensionlinesactivate',
    render: () => {
      const ox = -1.2;
      const [tx, ty] = BENT_LIMB_JOINTS.top;
      const [bx, by] = BENT_LIMB_JOINTS.bottom;
      return (
        <g strokeLinejoin="round" strokeLinecap="round">
          <BentBlueLimb offsetX={ox} />
          {/* Red outer cased glow + bright white inner core */}
          <CasedStroke d={`M${tx + ox},${ty} L${bx + ox},${by}`} color="#e03228" width={1.6} casing={2.8} />
          <line x1={tx + ox} y1={ty} x2={bx + ox} y2={by} stroke="#ffffff" strokeWidth="0.65" />
          <circle cx={tx + ox} cy={ty} r="1.55" fill="#e03228" stroke={OUTLINE} strokeWidth="0.9" />
          <circle cx={bx + ox} cy={by} r="1.55" fill="#e03228" stroke={OUTLINE} strokeWidth="0.9" />
        </g>
      );
    },
  },
  {
    id: 'sop.muscleautotensionlines',
    label: 'Muscle Auto Tension Lines',
    family: 'sop',
    description: 'Bent blue two-segment limb with a straight cased green tension line connecting two green joint dots.',
    types: ['muscleautotensionlines'],
    icons: ['sop_muscleautotensionlines'],
    refKey: 'SOP_muscleautotensionlines',
    render: () => {
      const ox = -1.2;
      const [tx, ty] = BENT_LIMB_JOINTS.top;
      const [bx, by] = BENT_LIMB_JOINTS.bottom;
      return (
        <g strokeLinejoin="round" strokeLinecap="round">
          <BentBlueLimb offsetX={ox} />
          <CasedStroke d={`M${tx + ox},${ty} L${bx + ox},${by}`} color="#58c848" width={1.25} casing={2.3} />
          <circle cx={tx + ox} cy={ty} r="1.55" fill="#58c848" stroke={OUTLINE} strokeWidth="0.9" />
          <circle cx={bx + ox} cy={by} r="1.55" fill="#58c848" stroke={OUTLINE} strokeWidth="0.9" />
        </g>
      );
    },
  },
  {
    id: 'sop.muscleconstraintpropertiesotis',
    label: 'Muscle Constraint Properties Otis',
    family: 'sop',
    description:
      'White diagonal bone on the left attached to a purple Otis muscle belly on the right, with a green downward arrow at the junction.',
    types: ['muscleconstraintpropertiesotis'],
    icons: ['sop_muscleconstraintpropertiesotis'],
    refKey: 'SOP_muscleconstraintpropertiesotis',
    render: () => (
      <>
        <AnatomicalBone />
        <MuscleSpindle cx={14.8} cy={11.4} len={12.8} width={6.2} angleDeg={-22} tone={MUSCLE_TONES.purple} />
        <StraightArrow from={[11.2, 3.0]} tip={[11.2, 9.8]} color="#58c848" width={1.8} head={3.2} />
      </>
    ),
  },
  {
    id: 'sop.muscleconstraintpropertiesvellum',
    label: 'Muscle Constraint Properties Vellum',
    family: 'sop',
    description:
      'White diagonal bone on the left attached to a red Vellum muscle belly on the right, with a green downward arrow at the junction.',
    types: ['muscleconstraintpropertiesvellum'],
    icons: ['sop_muscleconstraintpropertiesvellum'],
    refKey: 'SOP_muscleconstraintpropertiesvellum',
    render: () => (
      <>
        <AnatomicalBone />
        <MuscleSpindle cx={14.8} cy={11.4} len={12.8} width={6.2} angleDeg={-22} />
        <StraightArrow from={[11.2, 3.0]} tip={[11.2, 9.8]} color="#58c848" width={1.8} head={3.2} />
      </>
    ),
  },
  {
    id: 'sop.muscledeform',
    label: 'Muscle Deform',
    family: 'sop',
    description:
      'Diagonal red striated muscle spindle flanked by two symmetrical cased orange contour curves and a red downward-right arrow centered on the belly.',
    types: ['muscledeform'],
    icons: ['sop_muscledeform'],
    refKey: 'SOP_muscledeform',
    render: () => {
      const tip: Pt = [14.4, 14.4];
      const from: Pt = [10.4, 10.4];
      const tri = arrowHead(tip, from, 3.2, 2.2);
      return (
        <g strokeLinejoin="round" strokeLinecap="round">
          {/* Symmetrical cased orange contour curves flanking the -45 deg spindle */}
          <CasedStroke
            d="M4.2,14.2 Q7.8,7.8 14.2,4.2 M9.8,19.8 Q16.2,16.2 19.8,9.8"
            color="#ee8624"
            width={1.15}
            casing={2.2}
          />
          <MuscleSpindle cx={12.0} cy={12.0} len={20.5} width={6.8} angleDeg={-45} />
          {/* Bold red deform arrow centered on the muscle */}
          <CasedStroke
            d={`M${pts([from])} L${pts([[12.4, 12.4]])}`}
            color="#e03228"
            width={2.0}
            casing={3.2}
            linecap="butt"
          />
          <polygon points={pts(tri)} fill="#e03228" stroke={OUTLINE} strokeWidth="0.95" />
        </g>
      );
    },
  },
  {
    id: 'sop.muscledeintersect',
    label: 'Muscle Deintersect',
    family: 'sop',
    description:
      'Two nearly vertical red striated muscle spindles pushed apart by cased light-blue repulsion waves in the center.',
    types: ['muscledeintersect'],
    icons: ['sop_muscledeintersect'],
    refKey: 'SOP_muscledeintersect',
    render: () => (
      <g strokeLinejoin="round" strokeLinecap="round">
        <MuscleSpindle cx={5.6} cy={12.0} len={17.5} width={5.0} angleDeg={80} />
        <MuscleSpindle cx={18.4} cy={12.0} len={17.5} width={5.0} angleDeg={80} />
        {/* Repulsion waves between the two muscles */}
        <CasedStroke
          d="M10.4,9.8 Q9.0,12.0 10.4,14.2 M13.6,9.8 Q15.0,12.0 13.6,14.2"
          color="#8fc2ff"
          width={1.0}
          casing={2.0}
        />
      </g>
    ),
  },
  {
    id: 'sop.musclepreroll',
    label: 'Muscle Preroll',
    family: 'sop',
    description:
      'Red T-pose figure on the left and a blue running figure on the right connected by a green arrow pointing right.',
    types: ['musclepreroll'],
    icons: ['sop_musclepreroll'],
    refKey: 'SOP_musclepreroll',
    render: () => (
      <g strokeLinejoin="round" strokeLinecap="round">
        {/* Red T-pose figure on left */}
        <g transform="translate(5.2 14.2) scale(0.85)" fill="#ff7066" stroke={OUTLINE} strokeWidth={1.0}>
          <circle cx="0" cy="-9.2" r="1.95" />
          <path d="M-4.0,-6.8 L4.0,-6.8 L4.0,-5.0 L1.7,-5.0 L1.7,-0.2 L2.5,6.0 L0.8,6.0 L0,1.2 L-0.8,6.0 L-2.5,6.0 L-1.7,-0.2 L-1.7,-5.0 L-4.0,-5.0 Z" />
        </g>
        {/* Blue running figure on right */}
        <g transform="translate(18.6 14.4) scale(0.85)" fill="#8fc2ff" stroke={OUTLINE} strokeWidth={1.0}>
          <circle cx="0.6" cy="-9.0" r="1.95" />
          <path d="M-1.2,-6.5 L1.8,-6.2 L3.8,-2.8 L2.4,-1.8 L0.8,-4.0 L0.2,0.2 L3.4,5.0 L1.8,6.0 L-0.8,1.8 L-3.6,5.2 L-5.0,4.0 L-2.0,-0.4 L-1.6,-4.2 L-3.8,-2.2 L-4.8,-3.4 Z" />
        </g>
        {/* Green preroll arrow */}
        <StraightArrow from={[9.2, 13.0]} tip={[14.6, 13.0]} color="#58c848" width={1.8} head={3.1} />
      </g>
    ),
  },
  {
    id: 'sop.musclesolvervellum',
    label: 'Muscle Solver Vellum',
    family: 'sop',
    description:
      'Red muscular upper-body figure on the left paired with the pink symmetrical solver brain in the lower-right.',
    types: ['musclesolvervellum'],
    icons: ['sop_musclesolvervellum'],
    refKey: 'SOP_musclesolvervellum',
    render: () => (
      <>
        <MuscleTorso cx={9.4} cy={11.8} scale={0.98} fill="#ff7066" highlight="#ffb8b2" shadow="#a81f18" pose="bust" />
        <SolverBrain cx={16.0} cy={16.4} scale={0.8} />
      </>
    ),
  },
  {
    id: 'sop.muscletransfer',
    label: 'Muscle Transfer',
    family: 'sop',
    description:
      'Large purple flexed muscular upper torso in the background behind a smaller blue flexed muscular upper torso in front.',
    types: ['muscletransfer'],
    icons: ['sop_muscletransfer'],
    refKey: 'SOP_muscletransfer',
    render: () => (
      <>
        <MuscleTorso cx={12.0} cy={10.4} scale={1.12} fill="#bd7be8" highlight="#edd6fc" shadow="#6f3688" pose="flex" />
        <MuscleTorso cx={12.0} cy={16.6} scale={0.76} fill="#5aa2f2" highlight="#8fc2ff" shadow="#2e5a9a" pose="flex" />
      </>
    ),
  },
];
