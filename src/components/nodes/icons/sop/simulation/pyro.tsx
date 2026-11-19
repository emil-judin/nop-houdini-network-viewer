import React from 'react';
import { isoBoxFaces, pts, roundedRectPath } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { SolverBrain } from '../kits/solverBrain';

/**
 * Shared 3-tongue upright flame for Pyro A (`sop.pyrosolver`, `sop.pyrosource`,
 * `sop.pyrosourceinstance`). Centered around `(0, 0)` in local space.
 */
const FlameTriplet: React.FC<{
  cx?: number;
  cy?: number;
  scale?: number;
  outerColor?: string;
}> = ({ cx = 12, cy = 12, scale = 1, outerColor = '#e03228' }) => {
  const transform = scale === 1 ? `translate(${cx}, ${cy})` : `translate(${cx}, ${cy}) scale(${scale})`;
  return (
    <g transform={transform} strokeLinejoin="round">
      <path
        d="M0,-7.6 C1.8,-5.2 2.4,-3.2 2.0,-1.4 C3.0,-2.6 4.0,-3.6 4.6,-4.4 C5.6,-1.6 5.8,1.4 4.4,3.6 C3.2,5.2 1.6,5.8 0,5.8 C-1.8,5.8 -3.6,5.0 -4.6,3.4 C-5.8,1.4 -5.4,-1.8 -4.0,-4.2 C-3.4,-3.2 -2.6,-2.2 -1.8,-1.4 C-2.2,-3.6 -1.4,-5.8 0,-7.6 Z"
        fill={outerColor}
        stroke="#262626"
        strokeWidth={1.0 / scale}
      />
      <path
        d="M0,-5.4 C1.3,-3.6 1.8,-1.8 1.5,-0.2 C2.3,-1.2 3.1,-2.0 3.6,-2.6 C4.3,-0.4 4.2,2.0 3.0,3.6 C2.0,4.8 1.0,5.2 0,5.2 C-1.2,5.2 -2.4,4.6 -3.2,3.4 C-4.2,1.8 -4.0,-0.6 -3.0,-2.4 C-2.5,-1.6 -1.9,-0.8 -1.3,-0.2 C-1.6,-2.0 -1.0,-3.8 0,-5.4 Z"
        fill="#ee8624"
        stroke="none"
      />
      <path
        d="M0,-2.8 C0.9,-1.4 1.4,0.4 1.5,1.8 C2.0,1.2 2.4,0.8 2.6,0.4 C3.0,2.0 2.4,3.8 1.4,4.6 C0.6,5.0 -0.6,5.0 -1.4,4.6 C-2.4,3.8 -2.8,2.0 -2.3,0.4 C-2.0,0.8 -1.6,1.4 -1.2,1.8 C-1.2,0.2 -0.7,-1.4 0,-2.8 Z"
        fill="#ffe47a"
        stroke="none"
      />
    </g>
  );
};

/**
 * Shared 2:1 isometric green tile with a yellow triangular warning sign on a post.
 * Reused unchanged by `sop.pyrosourceinstance` and `sop.pyrospawnsources`.
 */
const SourceTileAndSign: React.FC = () => {
  const tile = isoBoxFaces(12, 11.4, 8.2, 1.3);
  return (
    <g strokeLinejoin="round">
      <polygon points={pts(tile.left)} fill="#409c34" stroke="#262626" strokeWidth="0.95" />
      <polygon points={pts(tile.right)} fill="#2d7824" stroke="#262626" strokeWidth="0.95" />
      <polygon points={pts(tile.top)} fill="#52d638" stroke="#262626" strokeWidth="0.95" />
      {/* Sign post */}
      <line x1="12" y1="14.8" x2="12" y2="9.8" stroke="#262626" strokeWidth="1.4" strokeLinecap="round" />
      {/* Warning triangle */}
      <polygon points="12,2.6 16.5,10.2 7.5,10.2" fill="#f2c438" stroke="#262626" strokeWidth="1.0" />
      {/* Explosion glyph inside triangle */}
      <polygon
        points="12,5.0 12.6,6.8 14.2,6.2 13.0,7.7 14.0,9.0 12.2,8.4 11.6,9.4 11.2,8.3 9.8,8.8 10.9,7.5 10.0,6.2 11.4,6.8"
        fill="#262626"
        stroke="none"
      />
      <circle cx="12" cy="7.6" r="0.85" fill="#ee8624" stroke="none" />
    </g>
  );
};

/**
 * Shared lobed orange-and-yellow burst cloud for Pyro B (`sop.pyropostprocess`,
 * `sop.pyrobakevolume`, `sop.pyroburstsource`, `sop.pyroscatterfromburst`,
 * `sop.pyrotrailpath`, `sop.pyrotrailsource`).
 */
const BurstPuff: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({ cx = 12, cy = 12, scale = 1 }) => {
  const transform = scale === 1 ? `translate(${cx}, ${cy})` : `translate(${cx}, ${cy}) scale(${scale})`;
  return (
    <g transform={transform} strokeLinejoin="round">
      <path
        d="M-6.8,1.8 C-8.4,1.2 -8.4,-1.2 -6.6,-2.0 C-7.0,-4.0 -4.8,-5.4 -3.0,-4.4 C-2.2,-6.6 1.2,-6.8 2.4,-4.6 C4.4,-5.8 7.0,-4.2 6.4,-1.8 C8.4,-1.0 8.2,1.6 6.2,2.2 C6.4,4.2 4.0,5.2 2.0,4.2 C1.0,5.6 -1.4,5.6 -2.4,4.2 C-4.4,5.2 -6.8,4.0 -6.8,1.8 Z"
        fill="#ee8624"
        stroke="#262626"
        strokeWidth={1.0 / scale}
      />
      <path
        d="M-4.4,1.4 C-5.4,0.8 -5.2,-1.0 -3.8,-1.5 C-3.8,-2.9 -1.9,-3.8 -0.4,-2.9 C0.6,-4.1 2.9,-3.5 3.3,-1.6 C4.7,-1.2 4.9,0.8 3.6,1.6 C3.6,3.0 1.6,3.7 0.2,2.9 C-1.0,3.7 -3.3,3.0 -4.4,1.4 Z"
        fill="#ffe47a"
        stroke="none"
      />
    </g>
  );
};

/**
 * Shared cluster of 5 red burst dots inside `BurstPuff` for `sop.pyroburstsource`
 * and `sop.pyroscatterfromburst`.
 */
const BurstDots: React.FC<{ cx?: number; cy?: number; scale?: number }> = ({ cx = 12, cy = 12, scale = 1 }) => {
  const transform = scale === 1 ? `translate(${cx}, ${cy})` : `translate(${cx}, ${cy}) scale(${scale})`;
  const coords: readonly [number, number][] = [
    [-2.4, 0.2],
    [0.1, -0.8],
    [2.5, 0.2],
    [-1.2, 2.2],
    [1.3, 2.2],
  ];
  return (
    <g transform={transform}>
      {coords.map(([dx, dy], idx) => (
        <circle key={idx} cx={dx} cy={dy} r="1.15" fill="#e03228" stroke="#ffffff" strokeWidth={0.7 / scale} />
      ))}
    </g>
  );
};

/**
 * Pyro operators.
 */
export const PYRO_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.pyrosolver',
    label: 'Pyro Solver',
    family: 'sop',
    description: 'Pink symmetrical solver brain in front of a tall red, orange and yellow three-tongue flame.',
    types: ['pyrosolver'],
    icons: ['sop_pyrosolver'],
    refKey: 'SOP_pyrosolver',
    render: () => (
      <g strokeLinejoin="round">
        <FlameTriplet cx={12} cy={9.6} scale={1.0} outerColor="#e03228" />
        <SolverBrain cx={12} cy={15.2} scale={0.94} />
      </g>
    ),
  },
  {
    id: 'sop.pyrosource',
    label: 'Pyro Source',
    family: 'sop',
    description:
      'White circular badge with a red dashed inner ring and a bold red, orange and yellow flame in the center.',
    types: ['pyrosource'],
    icons: ['sop_pyrosource'],
    refKey: 'SOP_pyrosource',
    render: () => (
      <g strokeLinejoin="round">
        <circle cx="12" cy="12" r="9.6" fill="#f2f4f7" stroke="#262626" strokeWidth="1.05" />
        <circle cx="12" cy="12" r="8.2" fill="none" stroke="#e03228" strokeWidth="0.95" strokeDasharray="2.1 1.4" />
        <FlameTriplet cx={12} cy={12.4} scale={1.08} outerColor="#e03228" />
      </g>
    ),
  },
  {
    id: 'sop.pyrosourceinstance',
    label: 'Pyro Source Instance',
    family: 'sop',
    description:
      'Isometric green tile with a yellow warning sign and three small orange-and-yellow flames on the tile.',
    types: ['pyrosourceinstance'],
    icons: ['sop_pyrosourceinstance'],
    refKey: 'SOP_pyrosourceinstance',
    render: () => (
      <g strokeLinejoin="round">
        <SourceTileAndSign />
        <FlameTriplet cx={6.4} cy={13.8} scale={0.34} outerColor="#ee8624" />
        <FlameTriplet cx={12.0} cy={16.5} scale={0.34} outerColor="#ee8624" />
        <FlameTriplet cx={17.6} cy={13.8} scale={0.34} outerColor="#ee8624" />
      </g>
    ),
  },
  {
    id: 'sop.pyrosourcepack',
    label: 'Pyro Source Pack',
    family: 'sop',
    description:
      'Two side-by-side isometric grey hard drives with front slots and side vents, topped with a bed of rising orange and yellow flames.',
    types: ['pyrosourcepack'],
    icons: ['sop_pyrosourcepack'],
    refKey: 'SOP_pyrosourcepack',
    render: () => {
      const driveA = isoBoxFaces(8.6, 10.6, 5.2, 2.2);
      const driveB = isoBoxFaces(14.8, 13.4, 5.2, 2.2);
      return (
        <g strokeLinejoin="round">
          {/* Left-back empty hard drive */}
          <polygon points={pts(driveA.left)} fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
          <polygon points={pts(driveA.right)} fill="#89929e" stroke="#262626" strokeWidth="0.9" />
          <polygon points={pts(driveA.top)} fill="#eef2f7" stroke="#262626" strokeWidth="0.9" />
          {/* Right-front empty hard drive */}
          <polygon points={pts(driveB.left)} fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
          <polygon points={pts(driveB.right)} fill="#89929e" stroke="#262626" strokeWidth="0.9" />
          <polygon points={pts(driveB.top)} fill="#eef2f7" stroke="#262626" strokeWidth="0.9" />
          {/* Bed of flames rising from both drives */}
          <path
            d="M4.6,13.6 C4.4,10.8 5.8,8.4 7.2,6.8 C7.4,8.4 8.2,9.2 8.8,9.6 C8.8,7.2 10.0,5.0 11.4,3.6 C12.0,5.4 12.6,6.6 13.2,7.6 C13.8,5.8 15.0,4.8 16.0,3.8 C16.6,5.8 17.0,7.6 16.8,9.2 C17.6,8.2 18.4,7.6 19.0,7.0 C19.8,9.6 19.6,12.4 18.4,14.8 L14.8,16.8 L9.6,16.4 Z"
            fill="#ee8624"
            stroke="#262626"
            strokeWidth="0.95"
          />
          <path
            d="M6.2,13.8 C6.2,11.6 7.2,9.8 8.2,8.8 C8.6,10.0 9.2,10.6 9.8,11.0 C10.2,9.2 11.0,7.4 12.0,6.4 C12.6,8.0 13.0,9.0 13.6,9.8 C14.2,8.4 15.0,7.2 15.8,6.6 C16.2,8.4 16.4,9.8 16.0,11.2 C16.6,10.4 17.2,9.8 17.6,9.4 C18.0,11.2 17.6,13.0 16.6,14.4 L14.6,16.2 L9.8,15.6 Z"
            fill="#ffe47a"
            stroke="none"
          />
          {/* Front drive details (slots & side vents) kept visible below flames */}
          <polygon points="3.4,13.2 8.6,15.8 8.6,18.0 3.4,15.4" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
          <line x1="4.6" y1="14.9" x2="7.2" y2="16.2" stroke="#3a3f47" strokeWidth="1.0" strokeLinecap="round" />
          <polygon points="9.6,16.0 14.8,18.6 14.8,20.8 9.6,18.2" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
          <polygon points="14.8,18.6 20.0,16.0 20.0,18.2 14.8,20.8" fill="#89929e" stroke="#262626" strokeWidth="0.9" />
          <line x1="10.8" y1="17.7" x2="13.4" y2="19.0" stroke="#3a3f47" strokeWidth="1.0" strokeLinecap="round" />
          <g stroke="#5a616b" strokeWidth="0.75" strokeLinecap="round">
            <line x1="16.4" y1="18.3" x2="16.4" y2="19.6" />
            <line x1="17.6" y1="17.7" x2="17.6" y2="19.0" />
            <line x1="18.8" y1="17.1" x2="18.8" y2="18.4" />
          </g>
        </g>
      );
    },
  },
  {
    id: 'sop.pyrosourcespread',
    label: 'Pyro Source Spread',
    family: 'sop',
    description: 'Wide spreading wall of red, orange and yellow flames, taller on the left and tapering to the right.',
    types: ['pyrosourcespread'],
    icons: ['sop_pyrosourcespread'],
    refKey: 'SOP_pyrosourcespread',
    render: () => (
      <g strokeLinejoin="round">
        {/* Back warm red-orange flame wall */}
        <path
          d="M2.4,19.4 L2.8,12.8 L4.4,15.2 L5.8,8.0 L7.6,11.6 L9.4,4.8 L11.4,10.4 L13.2,7.2 L15.0,12.0 L17.0,9.8 L18.6,14.2 L20.2,12.4 L21.6,19.4 Z"
          fill="#c25e12"
          stroke="#262626"
          strokeWidth="1.0"
        />
        {/* Mid orange flames */}
        <path
          d="M3.2,19.4 C3.2,16.4 4.0,14.4 5.0,13.0 C5.6,14.4 6.2,15.0 6.8,15.4 C7.0,12.4 8.2,9.8 9.6,8.0 C10.4,10.4 11.0,12.0 11.6,13.4 C12.4,11.6 13.4,10.4 14.4,9.6 C15.0,11.8 15.4,13.6 15.8,14.8 C16.8,13.6 17.8,12.8 18.6,12.2 C19.8,14.6 20.6,17.0 20.8,19.4 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.75"
        />
        {/* Bright yellow inner flame tongues */}
        <path
          d="M4.8,19.0 C5.0,17.2 5.6,15.8 6.4,15.0 C7.0,16.0 7.4,16.8 7.8,17.2 C8.2,15.0 9.0,13.0 10.0,11.8 C10.6,13.8 11.2,15.2 11.6,16.4 C12.4,14.8 13.2,13.8 14.0,13.2 C14.6,14.8 15.0,16.2 15.4,17.2 C16.2,16.2 17.0,15.4 17.8,15.0 C18.6,16.6 19.2,17.8 19.4,19.0 Z"
          fill="#ffe47a"
          stroke="none"
        />
      </g>
    ),
  },
  {
    id: 'sop.pyrospawnsources',
    label: 'Pyro Spawn Sources',
    family: 'sop',
    description: 'Isometric green tile with a yellow warning sign and three small orange flags planted on the tile.',
    types: ['pyrospawnsources'],
    icons: ['sop_pyrospawnsources'],
    refKey: 'SOP_pyrospawnsources',
    render: () => (
      <g strokeLinejoin="round">
        <SourceTileAndSign />
        {/* Left flag */}
        <line x1="6.4" y1="15.4" x2="6.4" y2="10.2" stroke="#262626" strokeWidth="0.95" strokeLinecap="round" />
        <polygon points="6.4,10.2 10.2,11.6 6.4,13.0" fill="#ffb066" stroke="#262626" strokeWidth="0.75" />
        {/* Front flag */}
        <line x1="12.0" y1="18.2" x2="12.0" y2="13.0" stroke="#262626" strokeWidth="0.95" strokeLinecap="round" />
        <polygon points="12.0,13.0 15.8,14.4 12.0,15.8" fill="#ffb066" stroke="#262626" strokeWidth="0.75" />
        {/* Right flag */}
        <line x1="17.6" y1="15.4" x2="17.6" y2="10.2" stroke="#262626" strokeWidth="0.95" strokeLinecap="round" />
        <polygon points="17.6,10.2 21.4,11.6 17.6,13.0" fill="#ffb066" stroke="#262626" strokeWidth="0.75" />
      </g>
    ),
  },
  {
    id: 'sop.pyropostprocess',
    label: 'Pyro Post-Process',
    family: 'sop',
    description:
      'Orange and yellow burst puff at the upper left with a dark round badge containing a pocket calculator at the lower right.',
    types: ['pyropostprocess'],
    icons: ['sop_pyropostprocess'],
    refKey: 'SOP_pyropostprocess',
    render: () => (
      <g strokeLinejoin="round">
        <BurstPuff cx={9.4} cy={9.4} scale={0.74} />
        {/* Dark round badge */}
        <circle cx="16.2" cy="16.2" r="5.6" fill="#2e3338" stroke="#262626" strokeWidth="1.0" />
        {/* Calculator body */}
        <path d={roundedRectPath(13.5, 12.4, 5.4, 7.6, 0.8)} fill="#eef2f7" stroke="#262626" strokeWidth="0.85" />
        {/* Calculator green display */}
        <rect x="14.4" y="13.3" width="3.6" height="1.8" fill="#58c848" stroke="#262626" strokeWidth="0.65" />
        {/* Calculator button grid */}
        <g fill="#3a3f47" stroke="none">
          <rect x="14.4" y="16.0" width="1.0" height="1.0" />
          <rect x="15.7" y="16.0" width="1.0" height="1.0" />
          <rect x="17.0" y="16.0" width="1.0" height="1.0" />
          <rect x="14.4" y="17.6" width="1.0" height="1.0" />
          <rect x="15.7" y="17.6" width="1.0" height="1.0" />
          <rect x="17.0" y="17.6" width="1.0" height="1.0" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.pyrobakevolume',
    label: 'Pyro Bake Volume',
    family: 'sop',
    description:
      'Orange and yellow burst puff at the upper left behind a golden scored loaf of bread with three white steam wisps.',
    types: ['pyrobakevolume'],
    icons: ['sop_pyrobakevolume'],
    refKey: 'SOP_pyrobakevolume',
    render: () => (
      <g strokeLinejoin="round">
        <BurstPuff cx={9.0} cy={8.6} scale={0.68} />
        {/* Three steam wisps */}
        <CasedStroke d="M13.8,9.8 C13.6,8.4 14.6,7.8 14.4,6.4" color="#ffffff" width={0.85} casing={1.8} />
        <CasedStroke d="M16.2,9.2 C16.0,7.8 17.0,7.2 16.8,5.8" color="#ffffff" width={0.85} casing={1.8} />
        <CasedStroke d="M18.6,10.0 C18.4,8.6 19.4,8.0 19.2,6.8" color="#ffffff" width={0.85} casing={1.8} />
        {/* Scored bread loaf */}
        <path
          d="M8.6,16.8 C8.4,13.6 11.4,11.2 15.2,11.4 C19.0,11.6 21.4,14.0 21.0,17.0 C20.6,19.4 17.6,20.4 14.4,20.2 C11.2,20.0 8.8,18.8 8.6,16.8 Z"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="1.0"
        />
        {/* Lower bread shadow */}
        <path
          d="M9.4,17.2 C11.4,19.2 17.6,19.4 20.2,17.0 C19.8,19.0 17.2,19.8 14.4,19.6 C11.6,19.4 9.8,18.6 9.4,17.2 Z"
          fill="#d49a18"
          stroke="none"
        />
        {/* Top highlight and three score slashes */}
        <path
          d="M11.6,12.8 L12.8,14.8 M14.4,12.4 L15.6,14.6 M17.2,12.8 L18.2,14.8"
          fill="none"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.pyroburstsource',
    label: 'Pyro Burst Source',
    family: 'sop',
    description: 'Large centered orange and yellow burst puff with a cluster of five red dots inside.',
    types: ['pyroburstsource'],
    icons: ['sop_pyroburstsource'],
    refKey: 'SOP_pyroburstsource',
    render: () => (
      <g strokeLinejoin="round">
        <BurstPuff cx={12} cy={12.4} scale={1.06} />
        <BurstDots cx={12} cy={13.0} scale={1.0} />
      </g>
    ),
  },
  {
    id: 'sop.pyroscatterfromburst',
    label: 'Pyro Scatter from Burst',
    family: 'sop',
    description:
      'Orange and yellow burst puff with red dots at the bottom, shooting three translucent red-and-white striped arcs upward to small grey debris chunks.',
    types: ['pyroscatterfromburst'],
    icons: ['sop_pyroscatterfromburst'],
    refKey: 'SOP_pyroscatterfromburst',
    render: () => (
      <g strokeLinejoin="round">
        {/* Translucent striped trajectory arcs */}
        <g opacity="0.62">
          <CasedStroke d="M10.0,14.8 C8.8,10.8 6.8,8.2 4.8,6.0" color="#e03228" width={1.35} casing={2.4} />
          <path
            d="M10.0,14.8 C8.8,10.8 6.8,8.2 4.8,6.0"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.25"
            strokeDasharray="1.8 1.8"
          />
          <CasedStroke d="M12.0,14.2 C11.8,10.2 12.2,7.2 12.6,4.2" color="#e03228" width={1.35} casing={2.4} />
          <path
            d="M12.0,14.2 C11.8,10.2 12.2,7.2 12.6,4.2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.25"
            strokeDasharray="1.8 1.8"
          />
          <CasedStroke d="M14.0,14.8 C15.4,10.8 17.2,8.2 19.2,6.0" color="#e03228" width={1.35} casing={2.4} />
          <path
            d="M14.0,14.8 C15.4,10.8 17.2,8.2 19.2,6.0"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.25"
            strokeDasharray="1.8 1.8"
          />
        </g>
        {/* Grey debris chunks at tips */}
        <polygon points="3.6,5.2 5.4,4.2 6.0,6.2 4.2,6.8" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
        <polygon points="11.4,3.4 13.4,2.8 13.8,4.8 11.8,5.2" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
        <polygon points="18.2,5.0 20.0,4.4 20.6,6.4 18.6,6.8" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
        {/* Bottom burst puff with red dots */}
        <BurstPuff cx={12} cy={17.0} scale={0.64} />
        <BurstDots cx={12} cy={17.2} scale={0.68} />
      </g>
    ),
  },
  {
    id: 'sop.pyrothrusterexhaust',
    label: 'Pyro Thruster Exhaust',
    family: 'sop',
    description:
      'Diagonal metallic grey rocket thruster nozzle pointing down-right, emitting a light blue, white and orange exhaust plume.',
    types: ['pyrothrusterexhaust'],
    icons: ['sop_pyrothrusterexhaust'],
    refKey: 'SOP_pyrothrusterexhaust',
    render: () => (
      <g transform="translate(12, 12) rotate(45)" strokeLinejoin="round">
        {/* Exhaust plume: feathered 3-tongue cyan, coral and white jet */}
        <path
          d="M0.0,-2.4 C2.8,-3.6 5.8,-3.2 8.8,-2.2 L6.8,-0.8 L12.0,0.0 L6.8,0.8 L8.8,2.2 C5.8,3.2 2.8,3.6 0.0,2.4 Z"
          fill="#8fc2ff"
          stroke="#262626"
          strokeWidth="0.95"
        />
        <path
          d="M0.4,-1.6 C2.6,-2.4 5.2,-2.0 7.4,-1.3 L5.8,-0.4 L9.6,0.0 L5.8,0.4 L7.4,1.3 C5.2,2.0 2.6,2.4 0.4,1.6 Z"
          fill="#ff7066"
          stroke="none"
        />
        <path d="M0.5,-0.9 C2.4,-1.2 4.4,-0.8 7.2,0.0 C4.4,0.8 2.4,1.2 0.5,0.9 Z" fill="#ffffff" stroke="none" />
        {/* Flared nozzle bell */}
        <polygon points="-3.2,-2.2 -0.2,-3.8 -0.2,3.8 -3.2,2.2" fill="#89929e" stroke="#262626" strokeWidth="1.0" />
        <polygon points="-3.0,-1.9 -0.4,-3.2 -0.4,-0.6 -3.0,-0.4" fill="#c0c7d1" stroke="none" />
        {/* Dark nozzle opening */}
        <ellipse cx="-0.2" cy="0" rx="1.2" ry="3.5" fill="#3a3f47" stroke="#262626" strokeWidth="0.9" />
        {/* Stepped waist */}
        <rect x="-4.6" y="-2.2" width="1.5" height="4.4" fill="#5a616b" stroke="#262626" strokeWidth="0.9" />
        {/* Cylindrical thruster body */}
        <path d={roundedRectPath(-10.8, -3.2, 6.4, 6.4, 1.8)} fill="#c0c7d1" stroke="#262626" strokeWidth="1.0" />
        {/* Upper-left metallic highlight */}
        <path d={roundedRectPath(-10.0, -2.6, 4.8, 2.0, 0.8)} fill="#eef2f7" stroke="none" />
        {/* Collar band */}
        <rect x="-6.0" y="-3.5" width="1.5" height="7.0" fill="#5a616b" stroke="#262626" strokeWidth="0.9" />
      </g>
    ),
  },
  {
    id: 'sop.pyrotrailpath',
    label: 'Pyro Trail Path',
    family: 'sop',
    description:
      'Orange and yellow burst puff at the bottom shooting three translucent red-and-white striped trajectory arcs upward to small grey debris chunks.',
    types: ['pyrotrailpath'],
    icons: ['sop_pyrotrailpath'],
    refKey: 'SOP_pyrotrailpath',
    render: () => (
      <g strokeLinejoin="round">
        {/* Translucent striped trajectory arcs */}
        <g opacity="0.62">
          <CasedStroke d="M10.2,14.8 C8.8,10.8 6.8,8.2 4.8,6.0" color="#e03228" width={1.35} casing={2.4} />
          <path
            d="M10.2,14.8 C8.8,10.8 6.8,8.2 4.8,6.0"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.25"
            strokeDasharray="1.8 1.8"
          />
          <CasedStroke d="M12.0,14.2 C12.0,10.2 12.2,7.2 12.6,4.2" color="#e03228" width={1.35} casing={2.4} />
          <path
            d="M12.0,14.2 C12.0,10.2 12.2,7.2 12.6,4.2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.25"
            strokeDasharray="1.8 1.8"
          />
          <CasedStroke d="M13.8,14.8 C15.2,10.8 17.2,8.2 19.2,6.0" color="#e03228" width={1.35} casing={2.4} />
          <path
            d="M13.8,14.8 C15.2,10.8 17.2,8.2 19.2,6.0"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.25"
            strokeDasharray="1.8 1.8"
          />
        </g>
        {/* Grey debris chunks at tips */}
        <polygon points="3.6,5.2 5.4,4.2 6.0,6.2 4.2,6.8" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
        <polygon points="11.4,3.4 13.4,2.8 13.8,4.8 11.8,5.2" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
        <polygon points="18.2,5.0 20.0,4.4 20.6,6.4 18.6,6.8" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
        {/* Bottom burst puff without red dots */}
        <BurstPuff cx={12} cy={16.8} scale={0.7} />
      </g>
    ),
  },
  {
    id: 'sop.pyrotrailsource',
    label: 'Pyro Trail Source',
    family: 'sop',
    description:
      'Orange and yellow burst puff at the bottom shooting three translucent golden-yellow trail streaks upward to small grey debris chunks.',
    types: ['pyrotrailsource'],
    icons: ['sop_pyrotrailsource'],
    refKey: 'SOP_pyrotrailsource',
    render: () => (
      <g strokeLinejoin="round">
        {/* Translucent golden-yellow trail streaks */}
        <g opacity="0.62">
          <CasedStroke d="M10.0,15.0 C8.8,11.2 7.2,8.4 5.2,6.0" color="#f2c438" width={1.4} casing={2.5} />
          <CasedStroke d="M12.0,14.4 C12.0,10.4 12.2,7.4 12.6,4.2" color="#f2c438" width={1.4} casing={2.5} />
          <CasedStroke d="M14.0,15.0 C15.2,11.2 16.8,8.4 18.8,6.0" color="#f2c438" width={1.4} casing={2.5} />
        </g>
        {/* Grey debris chunks at tips */}
        <polygon points="4.0,5.2 5.8,4.2 6.4,6.2 4.6,6.8" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
        <polygon points="11.4,3.4 13.4,2.8 13.8,4.8 11.8,5.2" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
        <polygon points="17.8,5.0 19.6,4.4 20.2,6.4 18.2,6.8" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
        {/* Bottom burst puff */}
        <BurstPuff cx={12} cy={17.0} scale={0.64} />
      </g>
    ),
  },
];
