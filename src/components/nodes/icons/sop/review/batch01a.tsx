import type { OperatorIconDef } from '../../iconTypes';

/**
 * Batch 1A (icons 1 to 25): built-in Houdini SOP icons under review.
 */
export const BATCH_01A: OperatorIconDef[] = [
  {
    id: 'sop.adaptiveprune',
    label: 'Adaptive Prune',
    family: 'sop',
    description:
      'Three branching trees growing from left to right (red, yellow, blue) above a wide orange-to-red arrow pointing down-right.',
    types: ['adaptiveprune'],
    icons: ['sop_adaptiveprune'],
    refKey: 'SOP_adaptiveprune',
    render: () => (
      <>
        <g fill="none" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.5,12.5 V7.5 M5.5,9.8 L3.5,7.2 M5.5,8.8 L7.2,6.5" />
          <path d="M10.5,14 V8 M10.5,11 L8.5,8.2 M10.5,9.8 L12.5,7" />
          <path d="M16,15.5 V7.5 M16,12 L13.2,8.8 M16,10.2 L19.2,6.8 M17.6,8.5 L19.8,9.2" />
        </g>
        <path d="M5.5,12.5 V7.5 M5.5,9.8 L3.5,7.2 M5.5,8.8 L7.2,6.5" fill="none" stroke="#e03228" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M10.5,14 V8 M10.5,11 L8.5,8.2 M10.5,9.8 L12.5,7" fill="none" stroke="#f2c438" strokeWidth="1.1" strokeLinecap="round" />
        <path
          d="M16,15.5 V7.5 M16,12 L13.2,8.8 M16,10.2 L19.2,6.8 M17.6,8.5 L19.8,9.2"
          fill="none"
          stroke="#3672c4"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <polygon
          points="3,12.5 16.5,17 17.5,15 21.5,19.5 15,21 15.8,19 2.5,14"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.add',
    label: 'Add',
    family: 'sop',
    description: 'Red S-curve wave with five dark square point markers with white rims placed along it.',
    types: ['add'],
    icons: ['sop_add'],
    refKey: 'SOP_add',
    render: () => (
      <>
        <path d="M3.5,14.5 C6,6.5 10.5,6.5 13,12 C15.5,17.5 18.5,17.5 20.5,13" fill="none" stroke="#262626" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M3.5,14.5 C6,6.5 10.5,6.5 13,12 C15.5,17.5 18.5,17.5 20.5,13" fill="none" stroke="#e03228" strokeWidth="1.8" strokeLinecap="round" />
        <g fill="#262626" stroke="#f2f4f7" strokeWidth="0.9">
          <rect x="2" y="13" width="3" height="3" />
          <rect x="6.5" y="7" width="3" height="3" />
          <rect x="11.5" y="10.2" width="3" height="3" />
          <rect x="15.5" y="15" width="3" height="3" />
          <rect x="19" y="11.5" width="3" height="3" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.armaturecapture',
    label: 'Armature Capture',
    family: 'sop',
    description: 'Grey articulated robot figure holding a yellow rod, surrounded by three blue weight labels.',
    types: ['armaturecapture'],
    icons: ['sop_armaturecapture'],
    refKey: 'SOP_armaturecapture',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <rect x="3" y="5" width="5.5" height="4" rx="0.8" fill="#5aa2f2" />
          <rect x="14.5" y="3" width="5.5" height="4" rx="0.8" fill="#5aa2f2" />
          <rect x="14.5" y="16.5" width="5.5" height="4" rx="0.8" fill="#5aa2f2" />
          <circle cx="12" cy="5.5" r="2" fill="#eef2f7" />
          <polygon points="9,8.5 15,8.5 14,14.5 10,14.5" fill="#c0c7d1" />
          <polygon points="8.5,9 5.5,14.5 7.2,15.5 10,10.5" fill="#eef2f7" />
          <polygon points="15.5,9 18,14 16.2,15 14,10.5" fill="#89929e" />
          <polygon points="9.5,14.5 11.8,14.5 11.2,20.5 8.8,20.5" fill="#c0c7d1" />
          <polygon points="12.2,14.5 14.5,14.5 15.2,20.5 12.8,20.5" fill="#89929e" />
          <line x1="4" y1="16.5" x2="8.5" y2="12.5" stroke="#f2c438" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.armaturedeform',
    label: 'Armature Deform',
    family: 'sop',
    description: 'Grey articulated robot figure swinging a yellow rod upward with a curved green motion arrow.',
    types: ['armaturedeform'],
    icons: ['sop_armaturedeform'],
    refKey: 'SOP_armaturedeform',
    render: () => (
      <>
        <path d="M8.5,18.5 C4.5,17.5 3.5,13 5.5,9.5" fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
        <path d="M8.5,18.5 C4.5,17.5 3.5,13 5.5,9.5" fill="none" stroke="#58c848" strokeWidth="1.6" strokeLinecap="round" />
        <polygon points="6.5,7.2 3.2,9.5 7.2,11" fill="#58c848" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <circle cx="13.5" cy="5.5" r="2" fill="#eef2f7" />
          <polygon points="10.5,8.5 16.5,8.5 15.5,14.5 11.5,14.5" fill="#c0c7d1" />
          <polygon points="10.5,9 7,12 8.2,13.5 11.5,10.5" fill="#eef2f7" />
          <polygon points="16.5,9 19.5,14 17.8,15 15.5,10.5" fill="#89929e" />
          <polygon points="11,14.5 13.2,14.5 12.5,20.5 10.2,20.5" fill="#c0c7d1" />
          <polygon points="13.8,14.5 16,14.5 16.8,20.5 14.5,20.5" fill="#89929e" />
          <polygon points="3.5,8.5 8.5,11.5 7.5,13 2.5,10" fill="#ffe47a" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.assemble',
    label: 'Assemble',
    family: 'sop',
    description: 'Egg-shaped mosaic of fractured colorful polygons separated by narrow gaps.',
    types: ['assemble'],
    icons: ['sop_assemble'],
    refKey: 'SOP_assemble',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="12,2.5 15.5,4.2 12.5,8 8.2,4.5" fill="#eef2f7" />
        <polygon points="7.5,5.5 11.5,8.8 7.5,12.5 4.2,9.5" fill="#5aa2f2" />
        <polygon points="16.5,5.2 19.8,9.8 15.2,11.8 13.2,8.5" fill="#c89eff" />
        <polygon points="12.2,9.5 14.8,12.5 11.5,15.5 8.8,12.8" fill="#f294a8" />
        <polygon points="4.2,11 7.8,13.8 7.5,18.2 4.5,15.5" fill="#e03228" />
        <polygon points="8.8,14.2 12.8,16.5 11.5,21.2 8.2,19.5" fill="#f2c438" />
        <polygon points="15.8,12.8 20,11.2 19.2,17.2 13.8,19.8" fill="#52d638" />
      </g>
    ),
  },
  {
    id: 'sop.bakegsplat',
    label: 'Bake GSplats',
    family: 'sop',
    description: 'Blue watering can on the left whose right half dissolves into a cloud of green Gaussian splat dots.',
    types: ['bakegsplat'],
    icons: ['sop_bakegsplat'],
    refKey: 'SOP_bakegsplat',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <path d="M12,9.5 H7.5 V18.5 H12 Z" fill="#5aa2f2" />
          <path d="M7.5,11.5 C5,11.5 4.5,16.5 7.5,16.5" fill="none" strokeWidth="1.6" />
          <polygon points="7.5,15.5 3.5,10.5 4.8,9.5 7.5,13" fill="#8fc2ff" />
          <ellipse cx="3.8" cy="9.8" rx="1.2" ry="1.8" transform="rotate(-35 3.8 9.8)" fill="#3672c4" />
          <line x1="12" y1="3.5" x2="12" y2="20.5" stroke="#3672c4" strokeWidth="1.2" />
        </g>
        <g fill="#52d638" stroke="#262626" strokeWidth="0.7">
          <circle cx="14.5" cy="7.5" r="1.3" />
          <circle cx="17.5" cy="9" r="1.2" />
          <circle cx="14.5" cy="11.2" r="1.4" />
          <circle cx="18.2" cy="12.5" r="1.3" />
          <circle cx="14.8" cy="15" r="1.4" />
          <circle cx="17.8" cy="16.2" r="1.2" />
          <circle cx="14.5" cy="18.5" r="1.2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.bakepreprocess',
    label: 'Bake Pre-Process',
    family: 'sop',
    description: 'Orange mixing bowl with a wide light grey rim holding a round white dough ball inside.',
    types: ['bakepreprocess'],
    icons: ['sop_bakepreprocess'],
    refKey: 'SOP_bakepreprocess',
    render: () => (
      <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M4,11.5 A8,7.5 0 0,0 20,11.5 Z" fill="#ee8624" />
        <ellipse cx="12" cy="11" rx="8.5" ry="4.5" fill="#c0c7d1" />
        <ellipse cx="12" cy="11" rx="6.8" ry="3.4" fill="#89929e" strokeWidth="0.9" />
        <path d="M6.8,12 A5.5,5 0 0,1 17.2,12 A6.8,3 0 0,1 6.8,12 Z" fill="#f2f4f7" strokeWidth="1" />
      </g>
    ),
  },
  {
    id: 'sop.bakevolume',
    label: 'Bake Volume',
    family: 'sop',
    description: 'Volume cloud at the bottom with a glowing yellow light bulb above it.',
    types: ['bakevolume'],
    icons: ['sop_bakevolume'],
    refKey: 'SOP_bakevolume',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <path d="M9.5,6.2 A2.8,2.8 0 1,1 14.5,6.2 L13.6,8.2 H10.4 Z" fill="#ffe47a" />
          <rect x="10.4" y="8.2" width="3.2" height="1.6" fill="#89929e" />
          <path
            d="M7.2,18.5 A3,3 0 0,1 6.5,13 A3.2,3.2 0 0,1 12,10.5 A3.2,3.2 0 0,1 17.5,13 A3,3 0 0,1 16.8,18.5 A3.5,3.5 0 0,1 12,20.5 A3.5,3.5 0 0,1 7.2,18.5 Z"
            fill="#c0c7d1"
            strokeWidth="1.2"
          />
        </g>
        <path d="M9.5,14.5 A2.2,2.2 0 0,1 13.5,13.5 M10,17.2 A2.5,2.5 0 0,0 14.5,17.2" fill="none" stroke="#5a616b" strokeWidth="0.9" strokeLinecap="round" />
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
        <path d="M13.5,9.5 L18.5,6.5 V18.5" fill="none" stroke="#e03228" strokeWidth="1.3" strokeDasharray="2 1.4" strokeLinecap="round" />
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
  {
    id: 'sop.blastbyattribute',
    label: 'Blast by Attribute',
    family: 'sop',
    description: 'Colorful Rubik cube with one front sub-cube erased by a tilted blue-and-white eraser.',
    types: ['blastbyattribute'],
    icons: ['sop_blastbyattribute'],
    refKey: 'SOP_blastbyattribute',
    render: () => (
      <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
        <polygon points="10,5 13.8,6.9 10,8.8 6.2,6.9" fill="#ffe47a" />
        <polygon points="6.2,6.9 10,8.8 6.2,10.7 2.5,8.8" fill="#eef2f7" />
        <polygon points="2.5,8.8 6.2,10.7 6.2,14.7 2.5,12.8" fill="#3672c4" />
        <polygon points="2.5,12.8 6.2,14.7 6.2,18.6 2.5,16.7" fill="#58c848" />
        <polygon points="6.2,14.7 10,16.6 10,20.5 6.2,18.6" fill="#e03228" />
        <polygon points="10,16.6 13.8,14.7 13.8,18.6 10,20.5" fill="#ee8624" />
        <polygon points="13.8,14.7 17.5,12.8 17.5,16.7 13.8,18.6" fill="#5aa2f2" />
        <polygon points="13.8,10.7 17.5,8.8 17.5,12.8 13.8,14.7" fill="#f2c438" />
        <polygon points="6.2,10.7 10,8.8 10,12.8 6.2,14.7" fill="#89929e" />
        <polygon points="10,8.8 13.8,10.7 13.8,14.7 10,12.8" fill="#5a616b" />
        <polygon points="6.2,14.7 10,12.8 13.8,14.7 10,16.6" fill="#c0c7d1" />
        <polygon points="12.5,6.8 16.5,2.8 21.5,5.2 17.5,9.2" fill="#3672c4" />
        <polygon points="10.8,8.5 12.5,6.8 17.5,9.2 15.8,10.9" fill="#eef2f7" />
      </g>
    ),
  },
  {
    id: 'sop.blendshapes',
    label: 'Blend Shapes',
    family: 'sop',
    description: 'Grey cube, cone and sphere at the top merging through red pipes into a combined sphere at the bottom.',
    types: ['blendshapes'],
    icons: ['sop_blendshapes', 'sop_blendshapes-2.0'],
    refKey: 'SOP_blendshapes',
    render: () => (
      <>
        <path d="M5.5,8.5 V12.5 H18.5 V8.5 M12,8.5 V16" fill="none" stroke="#262626" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.5,8.5 V12.5 H18.5 V8.5 M12,8.5 V16" fill="none" stroke="#e03228" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <g fill="#c0c7d1" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="5.5,3 9,5.5 5.5,8 2,5.5" fill="#eef2f7" />
          <polygon points="12,3 15,8.2 9,8.2" />
          <circle cx="18.5" cy="5.8" r="2.8" />
          <circle cx="12" cy="18.2" r="3" fill="#eef2f7" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.capture',
    label: 'Bone Capture',
    family: 'sop',
    description: 'Light orange forearm and hand with a white-and-blue bone diamond running down its length.',
    types: ['capture'],
    icons: ['sop_capture'],
    refKey: 'SOP_capture',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <path
          d="M18.5,2.5 L21.5,5.5 L10.5,16.5 L8.5,21 L6.8,20.2 L7.8,17.8 L5,19.8 L3.8,18.8 L6.8,16.2 L3.5,17.2 L3,15.8 L6.8,14.2 L4.5,13.5 L5.2,12.2 L8.5,13.2 Z"
          fill="#ffb066"
        />
        <polygon points="19.5,4.5 16.5,5.2 9.5,14.5 12.2,11.8" fill="#5aa2f2" stroke="#3672c4" strokeWidth="0.9" />
        <polygon points="19.5,4.5 18.2,7.5 9.5,14.5 15.8,6.8" fill="#f2f4f7" strokeWidth="0.9" />
      </g>
    ),
  },
  {
    id: 'sop.captureproximity',
    label: 'Bone Capture Proximity',
    family: 'sop',
    description: 'Nested grey capsule rings around a central bone, measured across by red dimension lines.',
    types: ['captureproximity', 'jointcaptureproximity'],
    icons: ['sop_captureproximity', 'sop_kinefx-jointcaptureproximity'],
    refKey: 'SOP_captureproximity',
    render: () => (
      <>
        <g transform="rotate(8 12 12)" fill="none" stroke="#262626" strokeLinecap="round">
          <rect x="2.5" y="6.5" width="19" height="11" rx="5.5" strokeWidth="2.6" />
          <rect x="2.5" y="6.5" width="19" height="11" rx="5.5" stroke="#89929e" strokeWidth="1.4" />
          <rect x="5" y="8.8" width="14" height="6.4" rx="3.2" strokeWidth="2.2" />
          <rect x="5" y="8.8" width="14" height="6.4" rx="3.2" stroke="#c0c7d1" strokeWidth="1.1" />
        </g>
        <path d="M7.5,5 L15.5,6.2 M6.5,18 L14.5,19.2 M11.5,5.6 L10.5,18.6 M8,12 L15,12.8" stroke="#e03228" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.bound',
    label: 'Bound',
    family: 'sop',
    description: 'Green cone, blue sphere and red cylinder enclosed inside a blue wireframe bounding box.',
    types: ['bound'],
    icons: ['sop_bound'],
    refKey: 'SOP_bound',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon points="7,7.5 10,14.5 4.5,14.5" fill="#58c848" />
          <circle cx="13.5" cy="8.5" r="2.6" fill="#3672c4" />
          <polygon points="11,15.5 15.5,12 18,15 13.5,18.5" fill="#e03228" />
        </g>
        <path
          d="M3,6.5 L12,3 L21,6.5 L21,16.5 L12,21 L3,16.5 Z M3,6.5 L12,10.5 L21,6.5 M12,10.5 V21"
          fill="none"
          stroke="#262626"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M3,6.5 L12,3 L21,6.5 L21,16.5 L12,21 L3,16.5 Z M3,6.5 L12,10.5 L21,6.5 M12,10.5 V21"
          fill="none"
          stroke="#5aa2f2"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.bulge',
    label: 'Bulge',
    family: 'sop',
    description: 'Blue perspective plane pushed upward into a smooth dome by a white wireframe sphere underneath.',
    types: ['bulge'],
    icons: ['sop_bulge'],
    refKey: 'SOP_bulge',
    render: () => (
      <>
        <circle cx="12" cy="15.5" r="4.8" fill="#eef2f7" stroke="#262626" strokeWidth="1.1" />
        <path d="M7.5,15.5 H16.5 M12,10.7 V20.3" stroke="#89929e" strokeWidth="0.8" />
        <polygon points="5.5,7.5 18.5,7.5 21.5,13 2.5,13" fill="#8fc2ff" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M6.8,11.2 C8,5 16,5 17.2,11.2 Z" fill="#3672c4" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.cacheif',
    label: 'Cache-If',
    family: 'sop',
    description: 'Grey disk drive box with a large red question mark rising above it.',
    types: ['cacheif'],
    icons: ['sop_cacheif'],
    refKey: 'SOP_cacheif',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.2" strokeLinejoin="round">
          <polygon points="5.5,10.5 18.5,10.5 21,16 3,16" fill="#eef2f7" />
          <rect x="3" y="16" width="18" height="4.5" fill="#c0c7d1" />
          <rect x="5" y="17.3" width="10" height="2" fill="#3a3f47" strokeWidth="0.9" />
        </g>
        <path
          d="M9.2,6.2 C9.2,3.5 14.8,3.2 14.8,6.5 C14.8,8.5 12,8.8 12,11.2"
          fill="none"
          stroke="#262626"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        <path
          d="M9.2,6.2 C9.2,3.5 14.8,3.2 14.8,6.5 C14.8,8.5 12,8.8 12,11.2"
          fill="none"
          stroke="#e03228"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="12" cy="14.2" r="1.4" fill="#e03228" stroke="#262626" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.cameraedit',
    label: 'Camera Edit',
    family: 'sop',
    description: 'Dark grey movie camera with twin film reels and a toothed metallic gear in the bottom-right corner.',
    types: ['cameraedit'],
    icons: ['sop_cameraedit'],
    refKey: 'SOP_cameraedit',
    render: () => (
      <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
        <rect x="6.2" y="8.8" width="8.8" height="6.5" rx="1" fill="#5a616b" />
        <polygon points="15,10.2 19.8,8 19.8,15.2 15,13.5" fill="#89929e" />
        <circle cx="8" cy="6.2" r="3.6" fill="#89929e" />
        <circle cx="8" cy="6.2" r="1.2" fill="#3a3f47" />
        <circle cx="5.5" cy="12" r="3.6" fill="#89929e" />
        <circle cx="5.5" cy="12" r="1.2" fill="#3a3f47" />
        <polygon
          points="15.4,11.2 17.2,11.2 17.5,12.6 18.7,13.1 19.8,12.2 21,13.4 20.1,14.5 20.6,15.7 22,16 22,17.8 20.6,18.1 20.1,19.3 21,20.4 19.8,21.6 18.7,20.7 17.5,21.2 17.2,22.5 15.4,22.5 15.1,21.2 13.9,20.7 12.8,21.6 11.6,20.4 12.5,19.3 12,18.1 10.6,17.8 10.6,16 12,15.7 12.5,14.5 11.6,13.4 12.8,12.2 13.9,13.1 15.1,12.6"
          fill="#eef2f7"
        />
        <circle cx="16.3" cy="16.9" r="1.8" fill="#3a3f47" />
      </g>
    ),
  },
  {
    id: 'sop.camerafrompoints',
    label: 'Camera from Points',
    family: 'sop',
    description: 'Orange frustum cone emanating from an orange point at the top-left toward a dark grey film camera.',
    types: ['camerafrompoints'],
    icons: ['sop_camerafrompoints'],
    refKey: 'SOP_camerafrompoints',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="4.5,5.5 16.5,11 9.5,19" fill="#ffb066" fillOpacity="0.65" stroke="#ee8624" />
        <circle cx="4.5" cy="5.5" r="1.8" fill="#ee8624" />
        <rect x="11" y="12" width="7.5" height="5.5" rx="0.8" fill="#5a616b" />
        <polygon points="18.5,13 21.5,11.5 21.5,17 18.5,15.8" fill="#89929e" />
        <circle cx="12.5" cy="9.8" r="2.8" fill="#89929e" />
        <circle cx="10.8" cy="14.5" r="2.8" fill="#89929e" />
      </g>
    ),
  },
  {
    id: 'sop.cameratopoints',
    label: 'Camera to Points',
    family: 'sop',
    description: 'Dark grey film camera projecting an orange frustum cone down-right to an orange point.',
    types: ['cameratopoints'],
    icons: ['sop_cameratopoints'],
    refKey: 'SOP_cameratopoints',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="19.5,18.5 7.5,16 14.5,8" fill="#ffb066" fillOpacity="0.65" stroke="#ee8624" />
        <circle cx="19.5" cy="18.5" r="1.8" fill="#ee8624" />
        <rect x="6.5" y="9" width="7.5" height="5.5" rx="0.8" fill="#5a616b" />
        <polygon points="14,10 17,8.5 17,14 14,12.8" fill="#89929e" />
        <circle cx="8" cy="6.8" r="2.8" fill="#89929e" />
        <circle cx="6.2" cy="11.5" r="2.8" fill="#89929e" />
      </g>
    ),
  },
  {
    id: 'sop.captureattribpack',
    label: 'Capture Attribute Pack',
    family: 'sop',
    description: 'Three white attribute tiles at the top with orange downward arrows packing into a V-shaped blue-and-green bone chain.',
    types: ['captureattribpack'],
    icons: ['sop_captureattribpack'],
    refKey: 'SOP_captureattribpack',
    render: () => (
      <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
        <polygon points="3.5,4 8.5,4 7.5,7.5 2.5,7.5" fill="#eef2f7" />
        <polygon points="9.5,4 14.5,4 13.5,7.5 8.5,7.5" fill="#eef2f7" />
        <polygon points="15.5,4 20.5,4 19.5,7.5 14.5,7.5" fill="#eef2f7" />
        <polygon points="6,6.5 6,9.5 4.5,9.5 6.8,12 9,9.5 7.5,9.5 7.5,6.5" fill="#ee8624" />
        <polygon points="11.2,6.5 11.2,9.5 9.8,9.5 12,12 14.2,9.5 12.8,9.5 12.8,6.5" fill="#ee8624" />
        <polygon points="16.5,6.5 16.5,9.5 15,9.5 17.2,12 19.5,9.5 18,9.5 18,6.5" fill="#ee8624" />
        <path d="M5,13.5 L12,19.5 L19,13.5" fill="none" stroke="#3672c4" strokeWidth="3.6" strokeLinecap="round" />
        <circle cx="5" cy="13.5" r="1.6" fill="#52d638" />
        <circle cx="12" cy="19.5" r="1.6" fill="#52d638" />
        <circle cx="19" cy="13.5" r="1.6" fill="#52d638" />
      </g>
    ),
  },
  {
    id: 'sop.captureattribunpack',
    label: 'Capture Attribute Unpack',
    family: 'sop',
    description: 'V-shaped blue-and-green bone chain with three orange upward arrows unpacking into three white attribute tiles.',
    types: ['captureattribunpack'],
    icons: ['sop_captureattribunpack'],
    refKey: 'SOP_captureattribunpack',
    render: () => (
      <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
        <polygon points="3.5,4 8.5,4 7.5,7.5 2.5,7.5" fill="#eef2f7" />
        <polygon points="9.5,4 14.5,4 13.5,7.5 8.5,7.5" fill="#eef2f7" />
        <polygon points="15.5,4 20.5,4 19.5,7.5 14.5,7.5" fill="#eef2f7" />
        <polygon points="6,11.5 6,8.5 4.5,8.5 6.8,6 9,8.5 7.5,8.5 7.5,11.5" fill="#ee8624" />
        <polygon points="11.2,11.5 11.2,8.5 9.8,8.5 12,6 14.2,8.5 12.8,8.5 12.8,11.5" fill="#ee8624" />
        <polygon points="16.5,11.5 16.5,8.5 15,8.5 17.2,6 19.5,8.5 18,8.5 18,11.5" fill="#ee8624" />
        <path d="M5,13.5 L12,19.5 L19,13.5" fill="none" stroke="#3672c4" strokeWidth="3.6" strokeLinecap="round" />
        <circle cx="5" cy="13.5" r="1.6" fill="#52d638" />
        <circle cx="12" cy="19.5" r="1.6" fill="#52d638" />
        <circle cx="19" cy="13.5" r="1.6" fill="#52d638" />
      </g>
    ),
  },
  {
    id: 'sop.capturecorrect',
    label: 'Capture Correct',
    family: 'sop',
    description: 'Forearm and hand with a bone diamond inside and a toothed metallic gear in the bottom-right corner.',
    types: ['capturecorrect'],
    icons: ['sop_capturecorrect'],
    refKey: 'SOP_capturecorrect',
    render: () => (
      <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
        <path
          d="M18.5,2.5 L21.5,5.5 L10.5,16.5 L8.5,21 L6.8,20.2 L7.8,17.8 L5,19.8 L3.8,18.8 L6.8,16.2 L3.5,17.2 L3,15.8 L6.8,14.2 L4.5,13.5 L5.2,12.2 L8.5,13.2 Z"
          fill="#ffb066"
        />
        <polygon points="19.5,4.5 16.5,5.2 9.5,14.5 12.2,11.8" fill="#5aa2f2" stroke="#3672c4" strokeWidth="0.9" />
        <polygon points="19.5,4.5 18.2,7.5 9.5,14.5 15.8,6.8" fill="#f2f4f7" strokeWidth="0.9" />
        <polygon
          points="15.4,11.2 17.2,11.2 17.5,12.6 18.7,13.1 19.8,12.2 21,13.4 20.1,14.5 20.6,15.7 22,16 22,17.8 20.6,18.1 20.1,19.3 21,20.4 19.8,21.6 18.7,20.7 17.5,21.2 17.2,22.5 15.4,22.5 15.1,21.2 13.9,20.7 12.8,21.6 11.6,20.4 12.5,19.3 12,18.1 10.6,17.8 10.6,16 12,15.7 12.5,14.5 11.6,13.4 12.8,12.2 13.9,13.1 15.1,12.6"
          fill="#eef2f7"
        />
        <circle cx="16.3" cy="16.9" r="1.8" fill="#3a3f47" />
      </g>
    ),
  },
  {
    id: 'sop.capturelayerpaint',
    label: 'Capture Layer Paint',
    family: 'sop',
    description: 'Forearm and hand with a bone diamond inside, painted with blue and yellow weights by a diagonal brush.',
    types: ['capturelayerpaint', 'jointcapturepaint'],
    icons: ['sop_capturelayerpaint', 'sop_kinefx-jointcapturepaint'],
    refKey: 'SOP_capturelayerpaint',
    render: () => (
      <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
        <path
          d="M18.5,2.5 L21.5,5.5 L10.5,16.5 L8.5,21 L6.8,20.2 L7.8,17.8 L5,19.8 L3.8,18.8 L6.8,16.2 L3.5,17.2 L3,15.8 L6.8,14.2 L4.5,13.5 L5.2,12.2 L8.5,13.2 Z"
          fill="#ffb066"
        />
        <polygon points="11.8,9.2 15.2,11.8 11.8,15.2 8.8,12.8" fill="#ffe47a" stroke="none" />
        <polygon points="13.8,7.2 17.2,9.8 14.5,12.5 11.2,9.8" fill="#8fc2ff" stroke="none" />
        <path
          d="M18.5,2.5 L21.5,5.5 L10.5,16.5 L8.5,21 L6.8,20.2 L7.8,17.8 L5,19.8 L3.8,18.8 L6.8,16.2 L3.5,17.2 L3,15.8 L6.8,14.2 L4.5,13.5 L5.2,12.2 L8.5,13.2 Z"
          fill="none"
        />
        <polygon points="19.5,4.5 16.5,5.2 9.5,14.5 12.2,11.8" fill="#5aa2f2" stroke="#3672c4" strokeWidth="0.9" />
        <polygon points="19.5,4.5 18.2,7.5 9.5,14.5 15.8,6.8" fill="#f2f4f7" strokeWidth="0.9" />
        <path d="M11,10.2 C12.5,9.5 14.2,10.2 14.8,11.5 L13.2,13.2 C11.8,12.5 11,11.5 11,10.2 Z" fill="#5aa2f2" />
        <polygon points="14.8,11.5 16.4,13.2 14.6,14.8 13.2,13.2" fill="#eef2f7" />
        <polygon points="16.4,13.2 21.5,19.8 19.5,21.5 14.6,14.8" fill="#c25e12" />
      </g>
    ),
  },
  {
    id: 'sop.capturemirror',
    label: 'Capture Mirror',
    family: 'sop',
    description: 'Orange wooden mannequin torso split down the middle by a vertical mirror line against a shaded right panel.',
    types: ['capturemirror'],
    icons: ['sop_capturemirror'],
    refKey: 'SOP_capturemirror',
    render: () => (
      <>
        <rect x="12" y="2.5" width="9.5" height="19" fill="#c0c7d1" stroke="#262626" strokeWidth="1" />
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <circle cx="12" cy="5.2" r="2.2" fill="#ffb066" />
          <polygon points="9,8.2 15,8.2 14.2,15.5 9.8,15.5" fill="#ee8624" />
          <polygon points="8.8,8.5 3.5,14.5 5,15.8 9.5,10.5" fill="#ffb066" />
          <polygon points="15.2,8.5 20.5,14.5 19,15.8 14.5,10.5" fill="#c25e12" />
          <polygon points="9.5,15.5 11.8,15.5 11.5,21 9.2,21" fill="#ee8624" />
          <polygon points="12.2,15.5 14.5,15.5 14.8,21 12.5,21" fill="#c25e12" />
        </g>
        <line x1="12" y1="2" x2="12" y2="22" stroke="#f2f4f7" strokeWidth="1.6" />
      </>
    ),
  },
  {
    id: 'sop.captureoverride',
    label: 'Capture Override',
    family: 'sop',
    description: 'Forearm and hand with a bone diamond, blue weight points along the bone and a blue callout tag at the top-left.',
    types: ['captureoverride'],
    icons: ['sop_captureoverride'],
    refKey: 'SOP_captureoverride',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <path
          d="M18.5,2.5 L21.5,5.5 L10.5,16.5 L8.5,21 L6.8,20.2 L7.8,17.8 L5,19.8 L3.8,18.8 L6.8,16.2 L3.5,17.2 L3,15.8 L6.8,14.2 L4.5,13.5 L5.2,12.2 L8.5,13.2 Z"
          fill="#ffb066"
        />
        <polygon points="19.5,4.5 16.5,5.2 9.5,14.5 18.2,7.5" fill="#f2f4f7" strokeWidth="0.9" />
        <path d="M3,3 H12 V8.5 H9.5 L11,11 L7.5,8.5 H3 Z" fill="#3672c4" />
        <circle cx="13.5" cy="10.5" r="1.4" fill="#5aa2f2" />
        <circle cx="16.2" cy="12.2" r="1.4" fill="#5aa2f2" />
        <circle cx="12" cy="13.8" r="1.4" fill="#5aa2f2" />
      </g>
    ),
  },
];

