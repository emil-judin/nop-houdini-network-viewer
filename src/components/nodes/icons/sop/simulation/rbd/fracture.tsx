import { arrowHead, pts } from '../../../geoHelpers';
import { CasedStroke } from '../../../geoKits';
import type { OperatorIconDef } from '../../../iconTypes';
import { ConstraintChunk, ExplodedVoronoiChunks, FracturedTwoBlockStack, VoronoiIsoCube } from '../../kits/rbd';

/**
 * RBD fracture operators.
 */
export const RBD_FRACTURE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.rbdmaterialfracture',
    label: 'RBD Material Fracture',
    family: 'sop',
    description: 'Tilted light-blue glass pane with radial impact cracks and a missing lower-left corner.',
    types: ['rbdmaterialfracture'],
    icons: ['sop_rbdmaterialfracture'],
    refKey: 'SOP_rbdmaterialfracture',
    render: () => (
      <g strokeLinejoin="round">
        {/* Pane body with notched bottom-left corner */}
        <polygon
          points="4.2,3.4 18.8,2.8 19.8,19.4 10.6,20.8 9.2,17.2 6.8,18.4 4.8,16.2"
          fill="#8fc2ff"
          stroke="#262626"
          strokeWidth="1.05"
        />
        {/* Lighter glass sheen facets */}
        <polygon points="4.2,3.4 13.0,3.1 13.2,10.2 5.4,9.8" fill="#eef2f7" fillOpacity="0.65" />
        <polygon points="13.2,10.2 19.2,8.4 19.8,19.4 13.5,14.8" fill="#5aa2f2" fillOpacity="0.7" />
        {/* Radial crack lines from impact center (13.2, 10.2) */}
        <path
          d="M13.2,10.2 L4.4,5.4 M13.2,10.2 L8.8,3.2 M13.2,10.2 L15.8,2.9 M13.2,10.2 L19.4,7.4 M13.2,10.2 L19.6,14.8 M13.2,10.2 L14.6,20.1 M13.2,10.2 L9.2,17.2 M13.2,10.2 L5.0,12.8"
          fill="none"
          stroke="#262626"
          strokeWidth="0.78"
          strokeLinecap="round"
        />
        {/* Concentric spiderweb rings */}
        <path
          d="M9.6,8.2 L11.4,6.8 L14.4,7.0 L16.2,9.0 L15.8,12.2 L13.8,13.6 L11.2,12.8 L9.4,10.8 Z"
          fill="none"
          stroke="#262626"
          strokeWidth="0.68"
        />
        <polygon
          points="4.2,3.4 18.8,2.8 19.8,19.4 10.6,20.8 9.2,17.2 6.8,18.4 4.8,16.2"
          fill="none"
          stroke="#262626"
          strokeWidth="1.1"
        />
      </g>
    ),
  },
  {
    id: 'sop.booleanfracture',
    label: 'Boolean Fracture',
    family: 'sop',
    description: 'Exploded isometric Voronoi cube broken into eight separated blue 3D chunks.',
    types: ['booleanfracture'],
    icons: ['sop_booleanfracture'],
    refKey: 'SOP_booleanfracture',
    render: () => (
      <ExplodedVoronoiChunks
        chunks={[
          { id: 'top', top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4' },
          { id: 'topLeft', top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4' },
          { id: 'topRight', top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4' },
          { id: 'center', top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4' },
          { id: 'midGap', top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4' },
          { id: 'botLeft', top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4' },
          { id: 'botRight', top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4' },
          { id: 'bottom', top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4' },
        ]}
      />
    ),
  },
  {
    id: 'sop.voronoifracture',
    label: 'Voronoi Fracture',
    family: 'sop',
    description: 'Isometric cube partitioned into multicolored Voronoi cells with dark outlines.',
    types: ['voronoifracture'],
    icons: ['sop_voronoifracture'],
    refKey: 'SOP_voronoifracture',
    render: () => (
      <VoronoiIsoCube
        cells={
          <g>
            {/* Top face colored cells */}
            <polygon points="12.0,3.2 16.2,5.3 14.4,5.4 10.6,6.8 8.2,5.1" fill="#f2c438" />
            <polygon points="8.2,5.1 10.6,6.8 9.8,8.7 6.2,8.5 3.8,7.3" fill="#8fc2ff" />
            <polygon points="16.2,5.3 20.2,7.3 18.2,8.3 15.0,8.2 14.4,5.4" fill="#ee8624" />
            <polygon points="10.6,6.8 14.4,5.4 15.0,8.2 12.0,9.7 9.8,8.7" fill="#58c848" />
            <polygon points="6.2,8.5 9.8,8.7 12.0,9.7 12.0,11.4" fill="#e03228" />
            <polygon points="12.0,9.7 15.0,8.2 18.2,8.3 20.2,7.3 12.0,11.4" fill="#ffe47a" />
            {/* Left face colored cells */}
            <polygon points="3.8,7.3 12.0,11.4 7.4,12.2 3.8,10.8" fill="#ee8624" />
            <polygon points="3.8,10.8 7.4,12.2 6.8,15.2 3.8,14.2" fill="#5aa2f2" />
            <polygon points="7.4,12.2 12.0,11.4 12.0,15.6 9.5,16.6 6.8,15.2" fill="#f2c438" />
            <polygon points="3.8,14.2 6.8,15.2 9.5,16.6 9.2,18.2 3.8,15.5" fill="#58c848" />
            <polygon points="9.5,16.6 12.0,15.6 12.0,19.6 9.2,18.2" fill="#e03228" />
            {/* Right face colored cells */}
            <polygon points="12.0,11.4 20.2,7.3 20.2,10.5 16.4,12.4" fill="#58c848" />
            <polygon points="16.4,12.4 20.2,10.5 20.2,14.4 17.0,15.4" fill="#3672c4" />
            <polygon points="12.0,11.4 16.4,12.4 17.0,15.4 14.2,16.8 12.0,15.6" fill="#ee8624" />
            <polygon points="17.0,15.4 20.2,14.4 20.2,15.5 14.8,18.2 14.2,16.8" fill="#8fc2ff" />
            <polygon points="12.0,15.6 14.2,16.8 14.8,18.2 12.0,19.6" fill="#f2c438" />
          </g>
        }
      />
    ),
  },
  {
    id: 'sop.voronoifracturepoints',
    label: 'Voronoi Fracture Points',
    family: 'sop',
    description: 'White-grey cracked isometric cube with red Voronoi seed dots on the top face.',
    types: ['voronoifracturepoints'],
    icons: ['sop_voronoifracturepoints'],
    refKey: 'SOP_voronoifracturepoints',
    render: () => (
      <VoronoiIsoCube
        dots={[
          [12.0, 5.1],
          [7.8, 7.1],
          [12.2, 7.7],
          [16.4, 7.0],
          [10.2, 9.6],
        ]}
      />
    ),
  },
  {
    id: 'sop.voronoisplit',
    label: 'Voronoi Split',
    family: 'sop',
    description: 'White-grey isometric cube divided across all three faces by dark Voronoi crack lines.',
    types: ['voronoisplit', 'voronoisplit-2.0'],
    icons: ['sop_voronoisplit', 'sop_voronoisplit-2.0'],
    refKey: 'SOP_voronoisplit',
    render: () => <VoronoiIsoCube />,
  },
  {
    id: 'sop.voronoiadjacency',
    label: 'Voronoi Adjacency',
    family: 'sop',
    description: 'White-grey Voronoi cube with red cell center dots connected by thin red adjacency lines.',
    types: ['voronoiadjacency'],
    icons: ['sop_voronoiadjacency'],
    refKey: 'SOP_voronoiadjacency',
    render: () => {
      const pTop: [number, number] = [12.0, 5.2];
      const pTopL: [number, number] = [7.6, 7.2];
      const pTopC: [number, number] = [12.2, 7.8];
      const pTopR: [number, number] = [16.5, 7.1];
      const pLeftU: [number, number] = [6.2, 11.2];
      const pLeftM: [number, number] = [9.2, 13.8];
      const pLeftB: [number, number] = [6.8, 15.8];
      const pRightU: [number, number] = [17.8, 11.2];
      const pRightM: [number, number] = [14.8, 13.8];
      const pRightB: [number, number] = [17.2, 15.8];
      return (
        <VoronoiIsoCube
          dots={[pTop, pTopL, pTopC, pTopR, pLeftU, pLeftM, pLeftB, pRightU, pRightM, pRightB]}
          adjacency={[
            [pTop, pTopL],
            [pTop, pTopC],
            [pTop, pTopR],
            [pTopL, pTopC],
            [pTopC, pTopR],
            [pTopL, pLeftU],
            [pTopC, pLeftM],
            [pTopC, pRightM],
            [pTopR, pRightU],
            [pLeftU, pLeftM],
            [pLeftM, pLeftB],
            [pLeftU, pLeftB],
            [pLeftM, pRightM],
            [pRightU, pRightM],
            [pRightM, pRightB],
            [pRightU, pRightB],
          ]}
        />
      );
    },
  },
  {
    id: 'sop.rbdinteriordetail',
    label: 'RBD Interior Detail',
    family: 'sop',
    description: 'Two stacked grey isometric blocks with matching jagged fracture profiles across the gap.',
    types: ['rbdinteriordetail'],
    icons: ['sop_rbdinteriordetail'],
    refKey: 'SOP_rbdinteriordetail',
    render: () => <FracturedTwoBlockStack />,
  },
  {
    id: 'sop.rbdcluster',
    label: 'RBD Cluster',
    family: 'sop',
    description:
      'Five exploded Voronoi cube pieces with wide yellow, green, orange, pink, and red cluster halos and the middle piece centered between them.',
    types: ['rbdcluster'],
    icons: ['sop_rbdcluster'],
    refKey: 'SOP_rbdcluster',
    render: () => (
      <ExplodedVoronoiChunks
        chunks={[
          { id: 'topLeft', top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4', border: '#f2c438', offset: [0.8, 0] },
          { id: 'topRight', top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4', border: '#58c848', offset: [-0.8, 0] },
          { id: 'center', top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4', border: '#ee8624', offset: [0, 2.3] },
          { id: 'botLeft', top: '#8fc2ff', left: '#5aa2f2', right: '#3672c4', border: '#ff7066', offset: [1.3, -0.3] },
          {
            id: 'botRight',
            top: '#8fc2ff',
            left: '#5aa2f2',
            right: '#3672c4',
            border: '#e03228',
            offset: [-1.3, -0.3],
          },
        ]}
      />
    ),
  },
  {
    id: 'sop.rbdpaint',
    label: 'RBD Paint',
    family: 'sop',
    description:
      'Separated chaotic grey rock shards at bottom-left with a red-and-white dashed brush ring showing dense dark fractures.',
    types: ['rbdpaint'],
    icons: ['sop_rbdpaint'],
    refKey: 'SOP_rbdpaint',
    render: () => (
      <g strokeLinejoin="round">
        {/* Separated chaotic fractured grey shards */}
        <polygon points="2.4,13.6 6.8,9.8 8.2,12.8 4.4,15.6" fill="#c0c7d1" stroke="#262626" strokeWidth="0.95" />
        <polygon points="8.4,10.2 11.4,8.6 12.0,12.2 9.2,12.8" fill="#eef2f7" stroke="#262626" strokeWidth="0.9" />
        <polygon points="3.2,17.4 7.6,15.2 9.2,18.8 5.2,21.0" fill="#89929e" stroke="#262626" strokeWidth="0.95" />
        <polygon points="10.4,15.6 14.8,14.0 15.6,18.2 11.2,20.2" fill="#c0c7d1" stroke="#262626" strokeWidth="0.95" />
        <polygon points="16.4,15.2 21.0,14.8 19.6,19.4 17.0,18.2" fill="#89929e" stroke="#262626" strokeWidth="0.95" />
        {/* Upper-right lens disc with dense chaotic dark fracture shards */}
        <circle cx="15.0" cy="8.2" r="5.4" fill="#f2f4f7" stroke="#262626" strokeWidth="1.8" />
        <circle cx="15.0" cy="8.2" r="5.4" fill="none" stroke="#f2f4f7" strokeWidth="1.1" />
        <circle cx="15.0" cy="8.2" r="5.4" fill="none" stroke="#e03228" strokeWidth="1.15" strokeDasharray="2.2 2.2" />
        <polygon points="11.4,5.8 14.6,4.0 14.0,7.0 10.6,7.4" fill="#3a3f47" />
        <polygon points="15.2,4.2 18.6,6.0 16.2,8.0 14.6,6.8" fill="#3a3f47" />
        <polygon points="10.6,8.0 13.8,7.6 13.2,10.4 11.0,10.0" fill="#3a3f47" />
        <polygon points="14.2,7.8 16.8,8.6 15.6,12.0 13.6,10.8" fill="#3a3f47" />
        <polygon points="17.2,8.0 19.4,9.0 18.0,11.6 16.2,10.4" fill="#3a3f47" />
      </g>
    ),
  },
  {
    id: 'sop.rbdconnectedfaces',
    label: 'RBD Connected Faces',
    family: 'sop',
    description:
      'Side view of a faceted orange polygonal hemisphere cut in half with a vertical red double-headed arrow next to the cut.',
    types: ['rbdconnectedfaces'],
    icons: ['sop_rbdconnectedfaces'],
    refKey: 'SOP_rbdconnectedfaces',
    render: () => {
      const topTip = arrowHead([14.8, 5.2], [14.8, 12.0], 2.8, 1.8);
      const botTip = arrowHead([14.8, 18.8], [14.8, 12.0], 2.8, 1.8);
      return (
        <g strokeLinejoin="round">
          {/* Faceted orange polygon hemisphere on the left (adapted from sop.implicitsurface_convert) */}
          <g stroke="#262626" strokeWidth="0.65">
            <polygon points="11.4,3.4 6.4,5.6 8.6,8.2 12.6,7.8" fill="#ffb066" />
            <polygon points="6.4,5.6 3.8,12.0 7.6,12.0 8.6,8.2" fill="#ffb066" />
            <polygon points="8.6,8.2 12.6,7.8 13.2,12.0 7.6,12.0" fill="#ee8624" />
            <polygon points="7.6,12.0 13.2,12.0 12.6,16.2 8.6,15.8" fill="#ee8624" />
            <polygon points="3.8,12.0 6.4,18.4 8.6,15.8 7.6,12.0" fill="#ee8624" />
            <polygon points="6.4,18.4 11.4,20.6 12.6,16.2 8.6,15.8" fill="#c25e12" />
          </g>
          {/* Outer silhouette of orange hemisphere */}
          <polyline
            points="11.4,3.4 6.4,5.6 3.8,12.0 6.4,18.4 11.4,20.6"
            fill="none"
            stroke="#262626"
            strokeWidth="1.1"
          />
          {/* Red double-headed arrow next to the cut half */}
          <CasedStroke d="M14.8,7.2 L14.8,16.8" color="#e03228" width={1.4} casing={2.3} linecap="butt" />
          <polygon points={pts(topTip)} fill="#e03228" stroke="#262626" strokeWidth="0.8" />
          <polygon points={pts(botTip)} fill="#e03228" stroke="#262626" strokeWidth="0.8" />
        </g>
      );
    },
  },
  {
    id: 'sop.rbddisconnectedfaces',
    label: 'RBD Disconnected Faces',
    family: 'sop',
    description: 'Two white-grey chunks with red center dots separated by a red dashed double-headed arrow.',
    types: ['rbddisconnectedfaces'],
    icons: ['sop_rbddisconnectedfaces'],
    refKey: 'SOP_rbddisconnectedfaces',
    render: () => {
      const topTip = arrowHead([9.0, 9.0], [15.0, 15.0], 2.5, 1.55);
      const botTip = arrowHead([15.0, 15.0], [9.0, 9.0], 2.5, 1.55);
      return (
        <g strokeLinejoin="round">
          <ConstraintChunk cx={6.6} cy={6.6} scale={1.32} variant={0} dotColor="#e03228" />
          <ConstraintChunk cx={17.4} cy={17.4} scale={1.32} variant={1} dotColor="#e03228" />
          <path d="M9.6,9.6 L14.4,14.4" fill="none" stroke="#262626" strokeWidth="2.1" strokeDasharray="1.8 1.5" />
          <path d="M9.6,9.6 L14.4,14.4" fill="none" stroke="#e03228" strokeWidth="1.2" strokeDasharray="1.8 1.5" />
          <polygon points={pts(topTip)} fill="#e03228" stroke="#262626" strokeWidth="0.7" />
          <polygon points={pts(botTip)} fill="#e03228" stroke="#262626" strokeWidth="0.7" />
        </g>
      );
    },
  },
  {
    id: 'sop.edgefracture',
    label: 'Edge Fracture',
    family: 'sop',
    description:
      '3D wireframe grey sphere cracked along a jagged stair-step seam and encircled by a tilted orange-red ring.',
    types: ['edgefracture'],
    icons: ['sop_edgefracture'],
    refKey: 'SOP_edgefracture',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ef`} cx="35%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b8c4d4" />
            <stop offset="100%" stopColor="#5a6575" />
          </radialGradient>
        </defs>
        {/* Back arc of orbital ring behind sphere */}
        <path d="M4.8,4.8 A10,2.2 42 0,1 19.2,19.2" fill="none" stroke="#ee8624" strokeWidth="1" strokeOpacity="0.55" />
        <circle cx="12" cy="12" r="7" fill={`url(#${uid}-ef)`} stroke="#262626" strokeWidth="1.15" />
        <ellipse cx="12" cy="12" rx="7" ry="3" fill="none" stroke="#5a616b" strokeWidth="0.6" />
        <ellipse cx="12" cy="12" rx="3" ry="7" fill="none" stroke="#5a616b" strokeWidth="0.6" />
        <polyline
          points="6.2,8 9.2,8 9.2,11 12.2,11 12.2,14 15.2,14 15.2,16.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <polyline
          points="6.2,8 9.2,8 9.2,11 12.2,11 12.2,14 15.2,14 15.2,16.5"
          fill="none"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Front arc of orbital ring in front of sphere */}
        <path
          d="M4.8,4.8 A10,2.2 42 0,0 19.2,19.2"
          fill="none"
          stroke="#ee8624"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.convexdecomposition',
    label: 'Convex Decomposition',
    family: 'sop',
    description: 'Dinosaur silhouette segmented into colorful convex blocks in red, yellow, green, blue and purple.',
    types: ['convexdecomposition'],
    icons: ['sop_convexdecomposition'],
    refKey: 'SOP_convexdecomposition',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="15.5,9.5 17.2,4.5 20.5,4.5 20.5,6.8 18.2,7.2 17.8,11.5" fill="#5aa2f2" />
        <polygon points="13.5,11 17.8,11.5 17.8,16.2 13,16.2" fill="#9b66d4" />
        <polygon points="8.5,12 13.5,11 13,16.2 8.5,16.2" fill="#e03228" />
        <polygon points="3.5,9.5 6.2,13 8.5,12 8.5,16.2 5,15.5" fill="#58c848" />
        <rect x="8.2" y="16.2" width="3" height="3.8" fill="#ffe47a" />
        <rect x="14.5" y="16.2" width="3" height="3.8" fill="#52d638" />
      </g>
    ),
  },
];
