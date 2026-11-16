import type { OperatorIconDef } from '../../iconTypes';

/**
 * Batch 1B (icons 26 to 50): built-in Houdini SOP icons under review.
 */
export const BATCH_01B: OperatorIconDef[] = [
  {
    id: 'sop.cregion',
    label: 'Capture Region',
    family: 'sop',
    description: 'Tilted blue wireframe capsule with elliptical cross-section ribs.',
    types: ['cregion'],
    icons: ['sop_cregion'],
    refKey: 'SOP_cregion',
    render: () => (
      <g transform="rotate(8 12 12)" fill="none" strokeLinecap="round">
        <rect x="2.5" y="7" width="19" height="10" rx="5" stroke="#262626" strokeWidth="2.8" />
        <ellipse cx="8" cy="12" rx="2.2" ry="5" stroke="#262626" strokeWidth="2.4" />
        <ellipse cx="16" cy="12" rx="2.2" ry="5" stroke="#262626" strokeWidth="2.4" />
        <rect x="2.5" y="7" width="19" height="10" rx="5" stroke="#5aa2f2" strokeWidth="1.5" />
        <ellipse cx="8" cy="12" rx="2.2" ry="5" stroke="#3672c4" strokeWidth="1.2" />
        <ellipse cx="16" cy="12" rx="2.2" ry="5" stroke="#3672c4" strokeWidth="1.2" />
      </g>
    ),
  },
  {
    id: 'sop.carve',
    label: 'Carve',
    family: 'sop',
    description: 'Grey open cylinder with a front vertical section carved out and red dashed arcs across the gap.',
    types: ['carve'],
    icons: ['sop_carve'],
    refKey: 'SOP_carve',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
          <path d="M5.5,6.5 A6.5,2.5 0 1,1 18.5,6.5 V17.5 A6.5,2.5 0 0,0 5.5,17.5 Z" fill="#89929e" />
          <path d="M5.5,6.5 A6.5,2.5 0 0,0 11,9 V20 A6.5,2.5 0 0,1 5.5,17.5 Z" fill="#eef2f7" />
          <path d="M15.5,8.6 A6.5,2.5 0 0,0 18.5,6.5 V17.5 A6.5,2.5 0 0,1 15.5,19.6 Z" fill="#c0c7d1" />
        </g>
        <path d="M11,9 Q13.5,9.3 15.5,8.6 M11,20 Q13.5,20.3 15.5,19.6" fill="none" stroke="#e03228" strokeWidth="1.2" strokeDasharray="1.5 1.2" />
      </>
    ),
  },
  {
    id: 'sop.chain',
    label: 'Chain',
    family: 'sop',
    description: 'Green U-shaped curve hanging from two square anchors with blue geometric beads threaded along it.',
    types: ['chain'],
    icons: ['sop_chain'],
    refKey: 'SOP_chain',
    render: () => (
      <>
        <path d="M6,5.5 C6,18.5 18,18.5 18,5.5" fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
        <path d="M6,5.5 C6,18.5 18,18.5 18,5.5" fill="none" stroke="#52d638" strokeWidth="1.6" strokeLinecap="round" />
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <rect x="4.2" y="3.8" width="3.6" height="3.2" fill="#58c848" />
          <rect x="16.2" y="3.8" width="3.6" height="3.2" fill="#58c848" />
          <circle cx="6.5" cy="10.8" r="2" fill="#5aa2f2" />
          <rect x="7.8" y="13.2" width="3.6" height="3.6" transform="rotate(20 9.6 15)" fill="#8fc2ff" />
          <polygon points="14.2,12.8 16.5,16.8 12.2,16.8" fill="#3672c4" />
          <polygon points="17.5,8.8 19.8,12.2 15.5,12.2" fill="#5aa2f2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.channel',
    label: 'Channel',
    family: 'sop',
    description: 'Round dark oscilloscope screen in a grey ring bezel showing a bright green sine wave.',
    types: ['channel', 'chopnet', 'constraintnetwork'],
    icons: ['networks_chop', 'sop_channel', 'sop_constraintnetwork'],
    refKey: 'SOP_channel',
    render: () => (
      <>
        <circle cx="12" cy="12" r="9.2" fill="#c0c7d1" stroke="#262626" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="7.4" fill="#3a3f47" stroke="#262626" strokeWidth="1" />
        <path
          d="M5.5,12 C6.8,6.5 8.5,6.5 9.8,12 C11.1,17.5 12.9,17.5 14.2,12 C15.5,6.5 17.2,6.5 18.5,12"
          fill="none"
          stroke="#52d638"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.circlefromedges',
    label: 'Circle from Edges',
    family: 'sop',
    description: 'Orange subdivided quad patch with a bright yellow circle traced over its inner edges.',
    types: ['circlefromedges'],
    icons: ['sop_circlefromedges'],
    refKey: 'SOP_circlefromedges',
    render: () => (
      <>
        <polygon points="4.5,3.5 19.5,4.5 19,20.5 5,19.5" fill="#ee8624" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M9.5,3.8 V19.8 M14.5,4.2 V20.2 M4.7,9 H19.3 M4.9,14.5 H19.1" stroke="#262626" strokeWidth="0.8" />
        <circle cx="12" cy="12" r="5.5" fill="none" stroke="#262626" strokeWidth="2.8" />
        <circle cx="12" cy="12" r="5.5" fill="none" stroke="#ffe47a" strokeWidth="1.6" />
      </>
    ),
  },
  {
    id: 'sop.circlespline',
    label: 'Circle Spline',
    family: 'sop',
    description: 'Closed curve with a smooth blue circular arc on the left and a jagged red control polygon with white vertices on the right.',
    types: ['circlespline'],
    icons: ['sop_circlespline'],
    refKey: 'SOP_circlespline',
    render: () => (
      <>
        <path
          d="M12,19.5 A7.2,7.2 0 1,1 12,4.8 L14,3.5 L15.5,8 L18.5,6.8 L16.2,11.2 L19.8,13.5 L15.5,15.5 Z"
          fill="none"
          stroke="#262626"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <path d="M12,19.5 A7.2,7.2 0 1,1 12,4.8" fill="none" stroke="#3672c4" strokeWidth="1.5" />
        <path
          d="M12,4.8 L14,3.5 L15.5,8 L18.5,6.8 L16.2,11.2 L19.8,13.5 L15.5,15.5 L12,19.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <g fill="#f2f4f7" stroke="#262626" strokeWidth="0.9">
          <circle cx="5.2" cy="9" r="1.4" />
          <circle cx="5.5" cy="15.5" r="1.4" />
          <circle cx="12" cy="19.5" r="1.4" />
          <circle cx="12" cy="4.8" r="1.4" />
          <circle cx="15.5" cy="8" r="1.4" />
          <circle cx="16.2" cy="11.2" r="1.4" />
          <circle cx="19.8" cy="13.5" r="1.4" />
          <circle cx="15.5" cy="15.5" r="1.4" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.clean',
    label: 'Clean',
    family: 'sop',
    description: 'Diagonal yellow straw broom with a wooden handle and a red binding band.',
    types: ['clean'],
    icons: ['sop_clean'],
    refKey: 'SOP_clean',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="4.5,4.5 6.5,3.2 11.5,10.2 9.5,11.5" fill="#c89a5a" />
        <path d="M8.2,11.8 L12.5,9 C16.5,11.5 19.5,14.5 20.5,17 C17.5,19.5 14.2,20.8 11,20.8 C9.8,17.5 9,14.5 8.2,11.8 Z" fill="#ffe47a" />
        <polygon points="7.8,11.2 12.2,8.4 13.2,9.8 8.8,12.6" fill="#e03228" />
        <path d="M11.5,13 L14.5,19.5 M13.5,11.8 L17.5,18" stroke="#d49a18" strokeWidth="0.9" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'sop.clip',
    label: 'Clip - Old',
    family: 'sop',
    description: 'Orange sphere sliced horizontally by a grey perspective plane, with the clipped bottom cap ghosted.',
    types: ['clip'],
    icons: ['sop_clip', 'sop_clip-2.0'],
    refKey: 'SOP_clip',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <path d="M7.5,14.5 A5.5,5.5 0 0,0 16.5,14.5 Z" fill="#ffb066" fillOpacity="0.4" />
        <polygon points="12,9.5 21.5,13.5 12,17.5 2.5,13.5" fill="#c0c7d1" />
        <path d="M6.8,12.5 A5.4,5.4 0 1,1 17.2,12.5 C15,13.8 9,13.8 6.8,12.5 Z" fill="#ee8624" strokeWidth="1.2" />
      </g>
    ),
  },
  {
    id: 'sop.clothcapture',
    label: 'Cloth Capture',
    family: 'sop',
    description: 'Orange short-sleeve shirt divided by dark seam lines into polygon panels.',
    types: ['clothcapture'],
    icons: ['sop_clothcapture'],
    refKey: 'SOP_clothcapture',
    render: () => (
      <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
        <path
          d="M8.5,3.5 L12,5.2 L15.5,3.5 L20.5,7.5 L18,11.5 L16,10 V20.5 H8 V10 L6,11.5 L3.5,7.5 Z"
          fill="#ee8624"
        />
        <polygon points="12,5.2 15.5,3.5 20.5,7.5 18,11.5 16,10 16,20.5 12,20.5" fill="#ffb066" />
        <path d="M12,5.2 V20.5 M12,11.5 L16,10 M12,15 L16,15" fill="none" strokeWidth="1" />
      </g>
    ),
  },
  {
    id: 'sop.clothdeform',
    label: 'Cloth Deform',
    family: 'sop',
    description: 'Orange polygon shirt with a bold white left-pointing arrow across the chest.',
    types: ['clothdeform'],
    icons: ['sop_clothdeform'],
    refKey: 'SOP_clothdeform',
    render: () => (
      <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
        <path
          d="M8.5,3.5 L12,5.2 L15.5,3.5 L20.5,7.5 L18,11.5 L16,10 V20.5 H8 V10 L6,11.5 L3.5,7.5 Z"
          fill="#ee8624"
        />
        <polygon points="12,5.2 15.5,3.5 20.5,7.5 18,11.5 16,10 16,20.5 12,20.5" fill="#ffb066" />
        <polygon points="7,12 11.5,8 11.5,10.2 16.5,10.2 16.5,13.8 11.5,13.8 11.5,16" fill="#f2f4f7" strokeWidth="1.1" />
      </g>
    ),
  },
  {
    id: 'sop.cluster',
    label: 'Cluster',
    family: 'sop',
    description: 'Three overlapping dashed circles enclosing orange, blue and green point clusters.',
    types: ['cluster'],
    icons: ['sop_cluster'],
    refKey: 'SOP_cluster',
    render: () => (
      <>
        <circle cx="8.5" cy="8.5" r="5.2" fill="#ffb066" fillOpacity="0.35" stroke="#ee8624" strokeWidth="1.1" strokeDasharray="1.8 1.2" />
        <circle cx="15.5" cy="8.8" r="5" fill="#c89eff" fillOpacity="0.35" stroke="#6e3ea6" strokeWidth="1.1" strokeDasharray="1.8 1.2" />
        <circle cx="13.5" cy="15.5" r="5.2" fill="#52d638" fillOpacity="0.35" stroke="#262626" strokeWidth="1.1" strokeDasharray="1.8 1.2" />
        <g stroke="#262626" strokeWidth="0.8">
          <circle cx="7" cy="7.2" r="1.4" fill="#ee8624" />
          <circle cx="9.8" cy="6.8" r="1.4" fill="#ee8624" />
          <circle cx="7.5" cy="10.2" r="1.4" fill="#ee8624" />
          <circle cx="15" cy="7.2" r="1.4" fill="#9b66d4" />
          <circle cx="17.2" cy="9.5" r="1.4" fill="#9b66d4" />
          <circle cx="12.2" cy="15.5" r="1.4" fill="#58c848" />
          <circle cx="15.5" cy="16.2" r="1.4" fill="#58c848" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.clusterpoints',
    label: 'Cluster Points',
    family: 'sop',
    description: 'Three overlapping dashed circles enclosing dark point dots with white rims.',
    types: ['clusterpoints'],
    icons: ['sop_clusterpoints'],
    refKey: 'SOP_clusterpoints',
    render: () => (
      <>
        <circle cx="8.5" cy="8.5" r="5.2" fill="#ffb066" fillOpacity="0.35" stroke="#ee8624" strokeWidth="1.1" strokeDasharray="1.8 1.2" />
        <circle cx="15.5" cy="8.8" r="5" fill="#8fc2ff" fillOpacity="0.35" stroke="#3672c4" strokeWidth="1.1" strokeDasharray="1.8 1.2" />
        <circle cx="13.5" cy="15.5" r="5.2" fill="#52d638" fillOpacity="0.35" stroke="#262626" strokeWidth="1.1" strokeDasharray="1.8 1.2" />
        <g fill="#262626" stroke="#f2f4f7" strokeWidth="0.8">
          <circle cx="7" cy="7.2" r="1.4" />
          <circle cx="9.8" cy="6.8" r="1.4" />
          <circle cx="7.5" cy="10.2" r="1.4" />
          <circle cx="15" cy="7.2" r="1.4" />
          <circle cx="17.2" cy="9.5" r="1.4" />
          <circle cx="12.2" cy="15.5" r="1.4" />
          <circle cx="15.5" cy="16.2" r="1.4" />
        </g>
      </>
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
        <path d="M12,5.5 V8.5 M10,6.5 L11.2,8.8 M14,6.5 L12.8,8.8 M12,16.5 V19" stroke="#e03228" strokeWidth="1.4" strokeLinecap="round" />
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
    id: 'sop.comb',
    label: 'Comb',
    family: 'sop',
    description: 'Diagonal orange hair comb with a solid spine and fine parallel teeth along its lower edge.',
    types: ['comb', 'guideprocess'],
    icons: ['sop_comb', 'sop_guideprocess'],
    refKey: 'SOP_comb',
    render: () => (
      <>
        <polygon
          points="2.5,14.2 18.2,4.2 21.5,9.2 19.8,10.3 17.5,6.8 4.8,14.9 7.1,18.4 5.8,19.2"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M6.6,13.8 L8.8,17.2 M8.4,12.6 L10.6,16 M10.2,11.5 L12.4,14.9 M12,10.3 L14.2,13.7 M13.8,9.2 L16,12.6 M15.6,8 L17.8,11.4"
          stroke="#262626"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M6.6,13.8 L8.8,17.2 M8.4,12.6 L10.6,16 M10.2,11.5 L12.4,14.9 M12,10.3 L14.2,13.7 M13.8,9.2 L16,12.6 M15.6,8 L17.8,11.4"
          stroke="#ffb066"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </>
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
        <polygon points="6.5,8.2 17.2,7.8 11,18.5" fill="none" stroke="#e03228" strokeWidth="1.3" strokeDasharray="1.8 1.2" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.convertheightfield',
    label: 'Convert HeightField',
    family: 'sop',
    description: 'Isometric heightfield with stepped blue voxel terraces on the left and a warm orange polygon mesh on the right.',
    types: ['convertheightfield'],
    icons: ['sop_convertheightfield'],
    refKey: 'SOP_convertheightfield',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-chf-o`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd468" />
            <stop offset="55%" stopColor="#f59224" />
            <stop offset="100%" stopColor="#d46208" />
          </linearGradient>
        </defs>
        {/* Left stepped blue voxel heightfield */}
        <g stroke="#244a80" strokeWidth="0.55" strokeLinejoin="round">
          <polygon points="1.8,14.2 5.2,12 9.2,13.4 5.8,15.6" fill="#7aa6dc" />
          <polygon points="1.8,14.2 5.8,15.6 9.5,16.9 9.5,18.2 1.8,15.5" fill="#4678b8" />
          <polygon points="4.8,11.2 8.2,9 11.8,10.2 8.5,12.5" fill="#9ec2ec" />
          <polygon points="4.8,11.2 8.5,12.5 11.2,13.5 11.2,15.2 4.8,12.8" fill="#5888c8" />
          <polygon points="8.2,8.4 11.5,6.4 14.2,7.4 11,9.5" fill="#d8e4f2" />
          <polygon points="8.2,8.4 11,9.5 12.8,10.2 12.8,12 8.2,10.2" fill="#6d98d0" />
        </g>
        {/* Right warm orange polygon mesh */}
        <g stroke="#8c3c04" strokeWidth="0.5" strokeLinejoin="round">
          <polygon points="14.2,7.4 22.2,10.2 16.5,19.4 9.5,16.9 11.2,13.5 12.8,10.2" fill={`url(#${uid}-chf-o)`} />
          <polygon points="9.5,16.9 16.5,19.4 16.5,20.7 9.5,18.2" fill="#d46a10" />
          <polygon points="16.5,19.4 22.2,10.2 22.2,11.5 16.5,20.7" fill="#9e4406" />
          <path
            d="M12.8,10.2 L20.4,13 M11.2,13.5 L18.5,16.2 M16.8,8.3 L11.8,17.7 M19.5,9.2 L14.2,18.6"
            fill="none"
            stroke="#b85208"
            strokeWidth="0.45"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.convertmeta',
    label: 'Convert Meta',
    family: 'sop',
    description: 'Smooth light blue sphere at the top-left overlapping an orange faceted polygon sphere at the bottom-right.',
    types: ['convertmeta'],
    icons: ['sop_convertmeta'],
    refKey: 'SOP_convertmeta',
    render: () => (
      <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
        <circle cx="8.5" cy="8.5" r="5.2" fill="#8fc2ff" />
        <circle cx="7" cy="6.8" r="1.5" fill="#f2f4f7" stroke="none" />
        <polygon points="15,9.5 19.2,11.5 20.2,16 17,19.8 12.2,19.2 10.5,15 11.8,11.2" fill="#ee8624" />
        <polygon points="13.5,12.5 17.2,13 17.8,16.5 14.5,17.8 12.5,15.5" fill="#ffb066" strokeWidth="0.9" />
      </g>
    ),
  },
  {
    id: 'sop.convertvolume',
    label: 'Convert Volume',
    family: 'sop',
    description: 'Cloud split vertically into a soft light blue volume on the left and a solid orange sculpted mesh on the right.',
    types: ['convertvolume'],
    icons: ['sop_convertvolume'],
    refKey: 'SOP_convertvolume',
    render: () => (
      <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M12,6.5 A4,4 0 0,0 6.5,10.5 A3.2,3.2 0 0,0 4.5,16.5 H12 Z" fill="#8fc2ff" />
        <path d="M12,6.5 C15,6 16.5,8.5 15,10.5 C18,10.5 19,13 17,14.2 C19.5,14.5 20,16.5 17.5,16.5 H12 Z" fill="#ee8624" />
        <line x1="12" y1="5.5" x2="12" y2="17.5" strokeWidth="1.1" />
      </g>
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
  {
    id: 'sop.copnet',
    label: 'COP Network',
    family: 'sop',
    description: 'Three isometric compositing image planes stacked diagonally from back-right to front-left.',
    types: ['copnet'],
    icons: ['networks_cop'],
    refKey: 'NETWORKS_cop',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="12.5,3.5 20.5,7.5 20.5,15.5 12.5,11.5" fill="#e03228" />
        <polygon points="8,6 16,10 16,18 8,14" fill="#eef2f7" fillOpacity="0.85" />
        <ellipse cx="12" cy="12" rx="2.5" ry="1.4" fill="#9b66d4" strokeWidth="0.8" />
        <polygon points="3.5,8.5 11.5,12.5 11.5,20.5 3.5,16.5" fill="#5aa2f2" fillOpacity="0.85" />
        <circle cx="7.5" cy="14.5" r="2" fill="#ee8624" strokeWidth="0.8" />
      </g>
    ),
  },
  {
    id: 'sop.coppreviewmaterial',
    label: 'COP Preview Material',
    family: 'sop',
    description: 'Isometric slab divided into four material sample blocks of wood, water, stone and yellow.',
    types: ['coppreviewmaterial'],
    icons: ['sop_coppreviewmaterial'],
    refKey: 'SOP_coppreviewmaterial',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="8,4 12.5,6.2 12.5,12 8,9.8" fill="#5aa2f2" />
        <polygon points="12.5,6.2 17.5,8.8 17.5,14.5 12.5,12" fill="#8fc2ff" />
        <polygon points="5.5,6.2 10.5,8.8 10.5,14.5 5.5,12" fill="#c89a5a" />
        <polygon points="8,13 12.5,15.2 12.5,19.8 8,17.5" fill="#ffe47a" />
        <polygon points="12.5,12 17.5,14.5 17.5,20.2 12.5,17.8" fill="#c0c7d1" />
      </g>
    ),
  },
  {
    id: 'sop.copytocurves',
    label: 'Copy to Curves',
    family: 'sop',
    description: 'Z-shaped three-point curve with a grey cube, an orange ring and a purple cone copied onto its points.',
    types: ['copytocurves'],
    icons: ['sop_copytocurves'],
    refKey: 'SOP_copytocurves',
    render: () => (
      <>
        <polyline points="5.5,12.5 10.5,6.5 14.5,17.5 19.5,12.5" fill="none" stroke="#262626" strokeWidth="2.8" strokeLinejoin="round" />
        <polyline points="5.5,12.5 10.5,6.5 14.5,17.5 19.5,12.5" fill="none" stroke="#8fc2ff" strokeWidth="1.4" strokeLinejoin="round" />
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <rect x="3" y="10.2" width="4.5" height="4.5" transform="rotate(-15 5.2 12.5)" fill="#c0c7d1" />
          <circle cx="10.5" cy="6.5" r="1.8" fill="#3672c4" />
          <ellipse cx="14.5" cy="17.5" rx="3.2" ry="1.8" fill="#ee8624" />
          <polygon points="19.5,8.8 21.8,13.5 17.2,13.5" fill="#c89eff" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.crease',
    label: 'Crease',
    family: 'sop',
    description: 'Orange folded sheet with a peaked central crease ridge flanked by dashed lines.',
    types: ['crease'],
    icons: ['sop_crease'],
    refKey: 'SOP_crease',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
          <polygon points="3,16.5 9.5,15.5 12,7.5 12,13.5 9.5,15.5" fill="#ee8624" />
          <polygon points="3,16.5 6.5,10 10.5,9.5 12,7.5 9.5,15.5" fill="#ffb066" />
          <polygon points="12,7.5 13.5,9.5 17.5,10 21,16.5 14.5,15.5" fill="#ffb066" />
          <line x1="12" y1="7.5" x2="12" y2="15" />
        </g>
        <path d="M9.8,9.8 L8.5,15.2 M14.2,9.8 L15.5,15.2" stroke="#262626" strokeWidth="0.9" strokeDasharray="1.4 1" />
      </>
    ),
  },
  {
    id: 'sop.creep',
    label: 'Creep',
    family: 'sop',
    description: 'Curved white surface patch with an orange polygon patch creeping across its upper curve.',
    types: ['creep'],
    icons: ['sop_creep'],
    refKey: 'SOP_creep',
    render: () => (
      <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M3,11.5 C7,8.5 12,8.5 17.5,10.5 L21,15.5 C15,14 10,15 7.5,19 Z" fill="#eef2f7" />
        <path d="M4.5,9.5 C8,6 13,6 17,7.5 L19,10.5 C14.5,9 9.5,9.5 6.5,13 Z" fill="#ee8624" />
      </g>
    ),
  },
];

