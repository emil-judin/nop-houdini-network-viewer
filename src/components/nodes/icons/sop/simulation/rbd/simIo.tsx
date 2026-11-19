import { arrowHead, gearPath, isoBoxFaces, pts } from '../../../geoHelpers';
import { CasedStroke, ShadedSphere, SPHERE_TONES } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import { RoundGlyphBadge } from '../../kits/dopLop';
import { BowlingPin, ConstraintChunk, ExplodedVoronoiChunks, MiniAxisTriad, RbdBullet } from '../../kits/rbd';
import { SolverBrain } from '../../kits/solverBrain';

/**
 * RBD simulation, transform and IO operators.
 */
export const RBD_SIM_IO_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.rbdbulletsolver',
    label: 'RBD Bullet Solver',
    family: 'sop',
    description: 'Pink solver brain at upper-left paired with a diagonal silver bullet with a blue tip.',
    types: ['rbdbulletsolver'],
    icons: ['sop_rbdbulletsolver'],
    refKey: 'SOP_rbdbulletsolver',
    render: () => (
      <g>
        <SolverBrain cx={7.8} cy={7.0} scale={0.72} />
        <RbdBullet cx={14.0} cy={14.4} angle={-42} scale={0.96} />
      </g>
    ),
  },
  {
    id: 'sop.rbdconfigure',
    label: 'RBD Configure',
    family: 'sop',
    description: 'Tilted white bowling pin with red neck stripes and a dark gear badge at lower-right.',
    types: ['rbdconfigure'],
    icons: ['sop_rbdconfigure'],
    refKey: 'SOP_rbdconfigure',
    render: () => (
      <g>
        <BowlingPin cx={9.4} cy={11.0} angle={32} scale={0.98} />
        <RoundGlyphBadge cx={17.2} cy={17.2} r={4.5}>
          <path d={gearPath(17.2, 17.2, 8, 3.1, 2.15)} fill="#ffffff" />
          <circle cx="17.2" cy="17.2" r="1.0" fill="#2e3338" />
        </RoundGlyphBadge>
      </g>
    ),
  },
  {
    id: 'sop.rbdio',
    label: 'RBD I/O',
    family: 'sop',
    description: 'Grey disk drive base beneath a shaded blue bowling ball in front of three bowling pins.',
    types: ['rbdio'],
    icons: ['sop_rbdio'],
    refKey: 'SOP_rbdio',
    render: (uid) => (
      <g strokeLinejoin="round">
        {/* Grey disk drive base */}
        <polygon points="5.6,17.2 18.4,17.2 17.4,15.0 6.6,15.0" fill="#c0c7d1" stroke="#262626" strokeWidth="0.95" />
        <rect x="5.6" y="17.2" width="12.8" height="3.2" rx="0.6" fill="#89929e" stroke="#262626" strokeWidth="1" />
        <rect x="7.4" y="18.3" width="6.2" height="1.0" fill="#3a3f47" />
        <circle cx="16.4" cy="18.8" r="0.65" fill="#58c848" />
        {/* Three bowling pins fanning behind */}
        <BowlingPin cx={7.8} cy={8.6} angle={-22} scale={0.58} />
        <BowlingPin cx={12.0} cy={7.6} angle={0} scale={0.62} />
        <BowlingPin cx={16.2} cy={8.6} angle={22} scale={0.58} />
        {/* Shaded blue bowling ball in front */}
        <ShadedSphere id={`${uid}-bball`} cx={12.0} cy={12.2} r={4.1} tones={SPHERE_TONES.blue} strokeWidth={1.0} />
        {/* Finger holes */}
        <circle cx="10.8" cy="11.0" r="0.6" fill="#262626" />
        <circle cx="12.4" cy="10.6" r="0.6" fill="#262626" />
        <circle cx="11.8" cy="12.2" r="0.6" fill="#262626" />
      </g>
    ),
  },
  {
    id: 'sop.rbdxform',
    label: 'RBD Transform',
    family: 'sop',
    description: 'Scattered small white-grey fractured chunks, each with a tiny red-green-blue axis triad.',
    types: ['rbdxform', 'xformpieces'],
    icons: ['sop_rbdxform', 'sop_xformpieces'],
    refKey: 'SOP_rbdxform',
    render: () => {
      const items: readonly { cx: number; cy: number; v: 0 | 1 | 2 }[] = [
        { cx: 6.2, cy: 6.2, v: 0 },
        { cx: 17.2, cy: 5.8, v: 1 },
        { cx: 11.8, cy: 11.8, v: 2 },
        { cx: 5.8, cy: 17.6, v: 1 },
        { cx: 17.6, cy: 17.4, v: 0 },
      ];
      return (
        <g>
          {items.map((it, idx) => (
            <g key={idx}>
              <ConstraintChunk cx={it.cx} cy={it.cy} scale={1.02} variant={it.v} />
              <MiniAxisTriad x={it.cx + 1.1} y={it.cy - 0.9} s={0.78} />
            </g>
          ))}
        </g>
      );
    },
  },
  {
    id: 'sop.rbdmatchtransforms',
    label: 'RBD Match Transforms',
    family: 'sop',
    description: 'White bowling pin inside a light-blue wireframe box paired with an orange dashed ghost pin.',
    types: ['rbdmatchtransforms'],
    icons: ['sop_rbdmatchtransforms'],
    refKey: 'SOP_rbdmatchtransforms',
    render: () => (
      <g strokeLinejoin="round">
        {/* Back light-blue wireframe box */}
        <path d="M5.2,17.8 L11.8,3.6 L15.8,5.6 L9.2,19.8 Z" fill="none" stroke="#262626" strokeWidth="1.7" />
        <path d="M5.2,17.8 L11.8,3.6 L15.8,5.6 L9.2,19.8 Z" fill="none" stroke="#8fc2ff" strokeWidth="0.9" />
        {/* White bowling pin inside box */}
        <BowlingPin cx={10.4} cy={11.8} angle={25} scale={0.86} />
        {/* Orange dashed ghost pin on right */}
        <g transform="translate(17.4, 13.8) rotate(20) scale(0.68)">
          <path
            d="M0,-8.8 C1.6,-8.8 2.2,-7.4 1.8,-5.4 C1.5,-4.0 1.4,-3.0 2.5,-1.0 C3.8,1.3 4.0,4.6 2.5,8.6 L-2.5,8.6 C-4.0,4.6 -3.8,1.3 -2.5,-1.0 C-1.4,-3.0 -1.5,-4.0 -1.8,-5.4 C-2.2,-7.4 -1.6,-8.8 0,-8.8 Z"
            fill="none"
            stroke="#262626"
            strokeWidth="2.1"
            strokeDasharray="2.0 1.4"
          />
          <path
            d="M0,-8.8 C1.6,-8.8 2.2,-7.4 1.8,-5.4 C1.5,-4.0 1.4,-3.0 2.5,-1.0 C3.8,1.3 4.0,4.6 2.5,8.6 L-2.5,8.6 C-4.0,4.6 -3.8,1.3 -2.5,-1.0 C-1.4,-3.0 -1.5,-4.0 -1.8,-5.4 C-2.2,-7.4 -1.6,-8.8 0,-8.8 Z"
            fill="none"
            stroke="#ee8624"
            strokeWidth="1.2"
            strokeDasharray="2.0 1.4"
          />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.rbddeformingtoanimated',
    label: 'RBD Deforming to Animated',
    family: 'sop',
    description: 'Three diagonal grey discs showing a flat disc morphing upward into a sculpted bust form.',
    types: ['rbddeformingtoanimated'],
    icons: ['sop_rbddeformingtoanimated'],
    refKey: 'SOP_rbddeformingtoanimated',
    render: () => (
      <g strokeLinejoin="round">
        {/* Bottom-right flat disc */}
        <ellipse cx="16.4" cy="17.8" rx="4.4" ry="2.2" fill="#89929e" stroke="#262626" strokeWidth="0.95" />
        <ellipse cx="16.4" cy="17.5" rx="3.0" ry="1.3" fill="#c0c7d1" />
        {/* Middle rippling disc */}
        <ellipse cx="11.6" cy="12.8" rx="4.4" ry="2.2" fill="#c0c7d1" stroke="#262626" strokeWidth="0.95" />
        <path d="M9.6,12.6 C10.4,10.2 12.8,10.2 13.6,12.6" fill="#eef2f7" stroke="#262626" strokeWidth="0.85" />
        {/* Upper-left disc with emerging bust */}
        <ellipse cx="7.4" cy="8.4" rx="4.4" ry="2.1" fill="#c0c7d1" stroke="#262626" strokeWidth="0.95" />
        <path
          d="M5.2,8.4 C5.4,6.4 6.2,6.0 6.4,5.4 C6.0,4.0 6.6,3.0 7.4,3.0 C8.2,3.0 8.8,4.0 8.4,5.4 C8.6,6.0 9.4,6.4 9.6,8.4 Z"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="0.95"
        />
      </g>
    ),
  },
  {
    id: 'sop.rbddeformpieces',
    label: 'RBD Deform Pieces',
    family: 'sop',
    description:
      'Side view of a solid dark-grey brick with a bent metal bar deforming over its corner, red contact highlight, and two yellow curved direction arrows.',
    types: ['rbddeformpieces'],
    icons: ['sop_rbddeformpieces'],
    refKey: 'SOP_rbddeformpieces',
    render: () => {
      const a1 = arrowHead([18.4, 5.8], [13.2, 4.8], 2.5, 1.5);
      const a2 = arrowHead([17.4, 8.2], [12.8, 7.2], 2.3, 1.4);
      return (
        <g strokeLinejoin="round">
          {/* Solid single-color dark-grey brick on the bottom-right */}
          <rect x="9.6" y="13.2" width="10.4" height="6.4" fill="#5a616b" stroke="#262626" strokeWidth="1.05" />
          {/* Metal bar bending over the brick's top-left corner */}
          <path
            d="M3.2,15.6 L9.4,11.2 L19.4,11.2 L19.4,13.5 L10.2,13.5 L4.6,17.6 Z"
            fill="#ffffff"
            stroke="#262626"
            strokeWidth="1.05"
          />
          {/* Red contact/crease highlight where the bar meets the brick corner */}
          <CasedStroke d="M9.0,12.2 L10.8,13.4" color="#e03228" width={1.4} casing={2.2} />
          {/* Two yellow curved direction arrows */}
          <CasedStroke d="M6.0,8.2 C9.0,4.6 14.0,4.4 16.8,5.4" color="#f2c438" width={1.1} casing={2.0} />
          <polygon points={pts(a1)} fill="#f2c438" stroke="#262626" strokeWidth="0.7" />
          <CasedStroke d="M7.4,10.2 C10.0,7.2 13.6,7.0 15.8,7.8" color="#f2c438" width={1.0} casing={1.9} />
          <polygon points={pts(a2)} fill="#f2c438" stroke="#262626" strokeWidth="0.7" />
        </g>
      );
    },
  },
  {
    id: 'sop.rbdexplodedview',
    label: 'RBD Exploded View',
    family: 'sop',
    description: 'Four separated Voronoi cube pieces connected to one another by bright green constraint lines.',
    types: ['rbdexplodedview'],
    icons: ['sop_rbdexplodedview'],
    refKey: 'SOP_rbdexplodedview',
    render: () => (
      <g>
        {/* All 4 Voronoi pieces connected with green lines */}
        <CasedStroke
          d="M6.6,6.8 L17.4,6.8 M6.6,15.6 L17.4,15.6 M6.6,6.8 L6.6,15.6 M17.4,6.8 L17.4,15.6 M6.6,6.8 L17.4,15.6 M17.4,6.8 L6.6,15.6"
          color="#58c848"
          width={1.1}
          casing={2.0}
        />
        <ExplodedVoronoiChunks
          chunks={[
            { id: 'topLeft', top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4' },
            { id: 'topRight', top: '#ffe47a', left: '#f2c438', right: '#d49a18' },
            { id: 'botLeft', top: '#eef2f7', left: '#58c848', right: '#89929e' },
            { id: 'botRight', top: '#ff7066', left: '#e03228', right: '#a81f18' },
          ]}
        />
      </g>
    ),
  },
  {
    id: 'sop.rbdfindinstances',
    label: 'RBD Find Instances',
    family: 'sop',
    description:
      'Two curved blue arrows forming an open ring around an orange isometric cube with a blue marker pen at lower-right and a sphere shifted right.',
    types: ['rbdfindinstances'],
    icons: ['sop_rbdfindinstances'],
    refKey: 'SOP_rbdfindinstances',
    render: (uid) => {
      const f = isoBoxFaces(9.0, 5.8, 2.7, 2.7);
      const leftHead = arrowHead([6.2, 3.8], [4.45, 5.83], 3.1, 1.85);
      const rightHead = arrowHead([11.0, 14.0], [13.09, 12.83], 3.1, 1.85);
      return (
        <g strokeLinejoin="round">
          {/* Sphere shifted further right */}
          <ShadedSphere id={`${uid}-inst-sph`} cx={19.4} cy={6.8} r={2.2} tones={SPHERE_TONES.grey} strokeWidth={0.9} />
          {/* Orange isometric cube inside the ring */}
          <polygon points={pts(f.top)} fill="#ffb066" stroke="#262626" strokeWidth="0.85" />
          <polygon points={pts(f.left)} fill="#ee8624" stroke="#262626" strokeWidth="0.85" />
          <polygon points={pts(f.right)} fill="#c25e12" stroke="#262626" strokeWidth="0.85" />
          {/* Two curved blue arrows from sop.findinstances */}
          <CasedStroke d="M6.83,13.88 A5.6,5.6 0 0,1 4.45,5.83" color="#5aa2f2" width={1.5} casing={2.9} />
          <polygon points={pts(leftHead)} fill="#5aa2f2" stroke="#262626" strokeWidth="0.85" />
          <CasedStroke d="M9.40,3.20 A5.6,5.6 0 0,1 13.09,12.83" color="#5aa2f2" width={1.5} casing={2.9} />
          <polygon points={pts(rightHead)} fill="#5aa2f2" stroke="#262626" strokeWidth="0.85" />
          {/* Blue marker pen at lower right */}
          <polygon points="13.8,15.7 16.4,15.7 15.7,17.7" fill="#eef2f7" stroke="#262626" strokeWidth="0.85" />
          <CasedStroke d="M16.1,17.4 L19.8,20.6" color="#5aa2f2" width={2.2} casing={3.6} />
        </g>
      );
    },
  },
  {
    id: 'sop.rbdguidesetup',
    label: 'RBD Guide Setup',
    family: 'sop',
    description:
      'Tall three-tone grey bent box broken into separated 3D fractured chunks with dark crack lines and red curved side edges.',
    types: ['rbdguidesetup'],
    icons: ['sop_rbdguidesetup'],
    refKey: 'SOP_rbdguidesetup',
    render: () => (
      <g strokeLinejoin="round">
        {/* Upper bent chunk (top face + upper left & right walls) */}
        <polygon points="5.0,4.8 14.6,3.4 19.4,4.8 9.8,6.6" fill="#eef2f7" stroke="#262626" strokeWidth="1.05" />
        <path
          d="M5.0,4.8 L9.8,6.6 L11.4,10.2 L8.8,11.0 L6.8,9.6 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.05"
        />
        <path
          d="M9.8,6.6 L19.4,4.8 L20.8,8.6 L16.2,10.4 L11.4,10.2 Z"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Middle-right separated chunk */}
        <path
          d="M12.8,11.6 L16.6,11.6 L21.0,9.8 L20.6,14.2 L14.6,15.6 L12.4,13.6 Z"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Middle-left separated chunk */}
        <path
          d="M7.2,11.0 L9.4,12.2 L11.8,11.6 L11.8,15.2 L8.8,16.0 L7.0,14.2 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Lower-left chunk */}
        <path
          d="M7.0,15.8 L9.2,17.2 L11.8,16.4 L10.6,20.6 L5.6,19.2 Z"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Lower-right chunk */}
        <path
          d="M12.6,16.4 L14.8,16.8 L20.2,15.2 L19.0,18.8 L10.6,20.6 L11.8,16.4 Z"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Interior fracture cracks */}
        <path
          d="M9.8,3.9 L12.6,5.6 M15.0,6.2 L16.8,9.8 M16.4,12.2 L17.6,14.8 M15.2,17.0 L14.4,19.6"
          fill="none"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* Red curved side edges from sop.bend */}
        <path
          d="M5.0,4.8 C6.4,7.4 6.8,8.6 6.8,9.6 M7.0,11.0 C7.2,13.2 6.8,15.8 5.6,19.2 M9.8,6.6 C11.4,8.6 11.8,10.0 11.8,15.2 M11.8,16.4 C11.5,18.2 11.2,19.4 10.6,20.6 M19.4,4.8 C20.4,6.8 20.8,8.0 20.8,8.6 M21.0,9.8 C21.2,12.2 20.6,15.8 19.0,18.8"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.debrissource',
    label: 'Debris Source',
    family: 'sop',
    description:
      'Fractured grey stone block with small angular rock shards and red debris dots bursting from its top crater.',
    types: ['debrissource'],
    icons: ['sop_debrissource'],
    refKey: 'SOP_debrissource',
    render: () => (
      <>
        <polygon points="2.8,9.8 8.5,7.8 13.5,9.2 21.2,8.2 21.2,18.2 13.5,21.2 2.8,18.8" fill="#c9d0da" />
        <polygon points="2.8,9.8 7.5,11.2 10.5,10.5 13.5,12.5 13.5,21.2 2.8,18.8" fill="#9aa2ae" />
        <polygon points="13.5,12.5 16.8,10.2 19,10.5 21.2,8.2 21.2,18.2 13.5,21.2" fill="#7a828e" />
        <path
          d="M2.8,9.8 L7.5,11.2 L10.5,10.5 L13.5,12.5 L16.8,10.2 L19,10.5 L21.2,8.2 M13.5,12.5 V21.2"
          fill="none"
          stroke="#5a616b"
          strokeWidth="0.7"
        />
        <polygon
          points="2.8,9.8 8.5,7.8 13.5,9.2 21.2,8.2 21.2,18.2 13.5,21.2 2.8,18.8"
          fill="none"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <g fill="#dfe4ea" stroke="#5a616b" strokeWidth="0.65" strokeLinejoin="round">
          <polygon points="5.5,6.2 7.8,5.5 8.2,7.5 6,8" />
          <polygon points="10.2,4.5 12.8,3.8 13.2,6 10.8,6.5" />
          <polygon points="14.8,5.5 17.2,4.8 17.6,6.8 15.2,7.2" />
          <polygon points="8.5,7.5 10.8,7 11.2,8.8 8.8,9.2" />
        </g>
        <g fill="#e03228">
          <circle cx="4.8" cy="8.2" r="0.9" />
          <circle cx="7.8" cy="9.2" r="1" />
          <circle cx="9.8" cy="5.8" r="0.85" />
          <circle cx="12.5" cy="9.5" r="1" />
          <circle cx="14.2" cy="7.8" r="0.9" />
          <circle cx="15.8" cy="4.2" r="0.85" />
          <circle cx="18.5" cy="7.8" r="0.95" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.explodedview',
    label: 'Exploded View',
    family: 'sop',
    description:
      'Isometric mechanical block in the center with curved top and bottom caps and side cylinders exploded outward.',
    types: ['explodedview'],
    icons: ['sop_explodedview'],
    refKey: 'SOP_explodedview',
    render: () => (
      <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
        <path d="M9.5,5.2 C9.5,3.2 15.5,2.6 15.5,4.6 V6.6 L9.5,8 Z" fill="#eef2f7" />
        <polygon points="9.5,8.8 14.5,7.4 16.5,8.4 11.5,9.8" fill="#eef2f7" />
        <polygon points="9.5,8.8 11.5,9.8 11.5,17.5 9.5,16.5" fill="#c0c7d1" />
        <polygon points="11.5,9.8 16.5,8.4 16.5,16 11.5,17.5" fill="#89929e" />
        <ellipse cx="14" cy="12.6" rx="1.4" ry="2" fill="#3a3f47" />
        <path d="M9.5,18.5 L15.5,17 V19.2 C15.5,21 9.5,21.5 9.5,19.8 Z" fill="#c0c7d1" />
        <rect x="2.8" y="9" width="4.2" height="2.4" rx="1" fill="#eef2f7" />
        <rect x="2.8" y="13.5" width="4.2" height="2.4" rx="1" fill="#eef2f7" />
        <ellipse cx="19.5" cy="12.2" rx="1.8" ry="2.8" fill="#c0c7d1" />
        <ellipse cx="19.5" cy="12.2" rx="0.7" ry="1.2" fill="#3a3f47" />
      </g>
    ),
  },
];
