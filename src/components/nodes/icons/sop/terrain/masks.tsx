import { isoBoxFaces, type Pt, pts, quadPt } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import {
  HeightfieldTile,
  HF_BLUE_HIGH,
  HF_BLUE_LOW,
  HF_DARK,
  HF_GREEN,
  HF_YELLOW,
  scaledHfQuad,
} from '../kits/heightfield';

/**
 * Heightfield mask operators.
 */
export const HEIGHTFIELD_MASK_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.heightfield_maskbyfeature',
    label: 'HeightField Mask by Feature',
    family: 'sop',
    description: 'Blue heightfield tile with a large curved yellow-orange arrow swooping down-right across it.',
    types: ['heightfield_maskbyfeature'],
    icons: ['sop_heightfield_maskbyfeature'],
    refKey: 'SOP_heightfield_maskbyfeature',
    render: () => (
      <>
        <HeightfieldTile offsetY={0.8} />
        <path
          d="M12.4,2.8 C9.8,5.6 10.6,9.2 13.8,11.0 L15.4,9.2 L18.2,14.8 L11.8,15.6 L13.2,13.6 C8.4,11.4 7.0,6.8 9.6,2.8 Z"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.heightfield_maskbyobject',
    label: 'HeightField Mask by Geometry',
    family: 'sop',
    description:
      'Blue heightfield tile intersected by a translucent green vertical box, tinting the center cells green.',
    types: ['heightfield_maskbyobject'],
    icons: ['sop_heightfield_maskbyobject'],
    refKey: 'SOP_heightfield_maskbyobject',
    render: () => (
      <>
        {/* Lower translucent green prism */}
        <g stroke="#262626" strokeWidth="0.8" strokeLinejoin="round">
          <polygon points="8.4,13.8 12.0,15.6 12.0,21.2 8.4,19.4" fill="#58c848" fillOpacity="0.45" />
          <polygon points="12.0,15.6 15.6,13.8 15.6,19.4 12.0,21.2" fill="#3a9a2e" fillOpacity="0.45" />
        </g>
        <HeightfieldTile
          cellPalette={(r, c, h) => {
            if (r === 1 && c === 1) return HF_GREEN;
            return h >= 1.0 ? HF_BLUE_HIGH : HF_BLUE_LOW;
          }}
        />
        {/* Upper translucent green prism */}
        <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <polygon points="8.4,5.2 12.0,7.0 12.0,12.6 8.4,10.8" fill="#58c848" fillOpacity="0.45" />
          <polygon points="12.0,7.0 15.6,5.2 15.6,10.8 12.0,12.6" fill="#3a9a2e" fillOpacity="0.45" />
          <polygon points="12.0,3.4 15.6,5.2 12.0,7.0 8.4,5.2" fill="#9be88e" fillOpacity="0.55" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.heightfield_maskbyocclusion',
    label: 'HeightField Mask by Occlusion',
    family: 'sop',
    description: 'Blue heightfield tile with yellow highlighted cells in the recessed valley crevices.',
    types: ['heightfield_maskbyocclusion'],
    icons: ['sop_heightfield_maskbyconcavity'],
    refKey: 'SOP_heightfield_maskbyconcavity',
    render: () => (
      <HeightfieldTile cellPalette={(_r, _c, h) => (h <= 0.5 ? HF_YELLOW : h >= 1.0 ? HF_BLUE_HIGH : HF_BLUE_LOW)} />
    ),
  },
  {
    id: 'sop.heightfield_drawmask',
    label: 'HeightField Draw Mask',
    family: 'sop',
    description:
      'Blue heightfield tile with a closed red cased loop drawn on top and a light-blue straight stylus in side view touching it.',
    types: ['heightfield_drawmask'],
    icons: ['sop_heightfield_drawmask'],
    refKey: 'SOP_heightfield_drawmask',
    render: () => {
      const loopD =
        'M7.4,12.2 C6.4,10.4 9.6,9.4 12.4,10.6 C14.8,11.6 15.0,14.0 12.2,14.6 C9.6,15.2 8.2,13.8 7.4,12.2 Z';
      return (
        <>
          <HeightfieldTile offsetY={0.8} />
          <path d={loopD} fill="none" stroke="#262626" strokeWidth="2.0" strokeLinejoin="round" />
          <path d={loopD} fill="none" stroke="#ff7066" strokeWidth="1.05" strokeLinejoin="round" />
          {/* Even light-blue side-view pen */}
          <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
            <polygon points="12.6,11.8 13.6,9.4 15.0,10.5" fill="#eef2f7" />
            <polygon points="13.6,9.4 18.8,2.6 20.2,3.7 15.0,10.5" fill="#8fc2ff" />
            <line x1="17.8" y1="3.9" x2="19.2" y2="5.0" strokeWidth="0.7" />
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_paint',
    label: 'HeightField Paint',
    family: 'sop',
    description: 'Blue heightfield tile with an angled orange-handle paintbrush touching a dark painted cell.',
    types: ['heightfield_paint'],
    icons: ['sop_heightfield_paint'],
    refKey: 'SOP_heightfield_paint',
    render: () => (
      <>
        <HeightfieldTile
          offsetY={0.8}
          cellPalette={(r, c, h) => {
            if (r === 2 && c === 1) return HF_DARK;
            return h >= 1.0 ? HF_BLUE_HIGH : HF_BLUE_LOW;
          }}
        />
        {/* Angled paintbrush from upper-right */}
        <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <path
            d="M10.4,12.6 C10.4,11.2 11.4,10.4 12.6,10.8 L13.4,11.8 C12.6,12.6 11.4,13.0 10.4,12.6 Z"
            fill="#3a3f47"
          />
          <polygon points="12.6,10.8 14.0,9.0 15.0,9.9 13.4,11.8" fill="#c0c7d1" />
          <polygon points="14.0,9.0 19.2,3.0 20.4,4.0 15.0,9.9" fill="#ee8624" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.heightfield_cutoutbyobject',
    label: 'HeightField Cutout by Geometry',
    family: 'sop',
    description:
      'White flat sheet with a circular cutout revealing a three-tone blue isometric cube inside a green wireframe dome.',
    types: ['heightfield_cutoutbyobject'],
    icons: ['sop_heightfield_cutoutbyobject'],
    refKey: 'SOP_heightfield_cutoutbyobject',
    render: () => {
      const cube = isoBoxFaces(12, 8.6, 3.0, 2.8);
      return (
        <>
          {/* White cutout sheet with circular opening */}
          <path
            d="M2.6,12.8 L11.8,7.4 L21.4,12.2 L12.2,17.8 Z M12.0,9.2 A4.6,2.8 0 1,0 12.0,14.8 A4.6,2.8 0 1,0 12.0,9.2 Z"
            fill="#ffffff"
            fillRule="evenodd"
            stroke="#262626"
            strokeWidth="1.05"
            strokeLinejoin="round"
          />
          {/* Inner blue isometric cube */}
          <g stroke="#262626" strokeWidth="0.8" strokeLinejoin="round">
            <polygon points={pts(cube.left)} fill="#5aa2f2" />
            <polygon points={pts(cube.right)} fill="#3672c4" />
            <polygon points={pts(cube.top)} fill="#8fc2ff" />
          </g>
          {/* Green wireframe dome */}
          <CasedStroke d="M7.4,12.0 A4.6,5.2 0 1,1 16.6,12.0" color="#58c848" width={1.0} casing={2.1} />
          <CasedStroke d="M7.4,12.0 A4.6,2.6 0 0,0 16.6,12.0" color="#58c848" width={0.9} casing={1.8} />
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_clip',
    label: 'HeightField Clip',
    family: 'sop',
    description: 'Blue heightfield tile with a tall flat-topped central block and a red cased loop hovering above it.',
    types: ['heightfield_clip'],
    icons: ['sop_heightfield_clip'],
    refKey: 'SOP_heightfield_clip',
    render: () => {
      const heights = [
        [0.1, 0.2, 0.1],
        [0.2, 3.6, 0.2],
        [0.1, 0.2, 0.1],
      ];
      const clipLoop = 'M8.0,6.2 C8.0,4.6 16.0,4.6 16.0,6.2 C16.0,7.8 8.0,7.8 8.0,6.2 Z';
      return (
        <>
          <HeightfieldTile heights={heights} offsetY={1.4} />
          <path d={clipLoop} fill="none" stroke="#262626" strokeWidth="2.0" />
          <path d={clipLoop} fill="none" stroke="#ff7066" strokeWidth="1.05" />
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_remap',
    label: 'HeightField Remap',
    family: 'sop',
    description: 'Blue heightfield tile below a red cased bell curve with three red control dots.',
    types: ['heightfield_remap'],
    icons: ['sop_heightfield_remap'],
    refKey: 'SOP_heightfield_remap',
    render: () => {
      const q = scaledHfQuad(0.92, 0, 2.4);
      const pL = quadPt(q, 0.05, 0.5);
      const pR = quadPt(q, 0.95, 0.5);
      const peak: Pt = [12, 3.2];
      const curveD = `M${pts([pL])} C${pts([[pL[0] + 3.2, pL[1] - 1.2], [peak[0] - 2.2, peak[1]], peak])} C${pts([[peak[0] + 2.2, peak[1]], [pR[0] - 3.2, pR[1] - 1.2], pR])}`;
      return (
        <>
          <HeightfieldTile scale={0.92} offsetY={2.4} />
          <path d={curveD} fill="none" stroke="#262626" strokeWidth="1.6" strokeLinecap="round" />
          <path d={curveD} fill="none" stroke="#ff7066" strokeWidth="1.05" strokeLinecap="round" />
          {[pL, peak, pR].map((pt, i) => (
            <circle key={i} cx={pt[0]} cy={pt[1]} r="1.15" fill="#ff7066" stroke="#262626" strokeWidth="0.65" />
          ))}
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_flatten',
    label: 'HeightField Flatten',
    family: 'sop',
    description:
      'Green-and-brown heightfield tile pushed flat in the center by a thick grey monster leg and wide clawed foot.',
    types: ['heightfield_flatten'],
    icons: ['sop_heightfield_flatten'],
    refKey: 'SOP_heightfield_flatten',
    render: () => {
      const heights = [
        [1.4, 1.8, 1.2],
        [1.5, 0.0, 1.4],
        [0.9, 1.3, 1.1],
      ];
      return (
        <>
          <HeightfieldTile
            heights={heights}
            offsetY={1.8}
            cellPalette={() => ({ top: '#58c848', left: '#c89a5a', right: '#7e5828' })}
          />
          <g stroke="#262626" strokeLinejoin="round">
            {/* Grey monster leg & wide stomping foot */}
            <path
              d="M8.6,2.8 L14.8,2.8 L14.4,10.6 L17.0,13.6 L15.4,15.2 L12.0,14.8 L8.6,15.4 L7.2,13.4 L9.0,10.6 Z"
              fill="#89929e"
              strokeWidth="0.95"
            />
            <path d="M9.6,3.2 L13.8,3.2 L13.4,10.4 L10.0,10.4 Z" fill="#c0c7d1" strokeWidth="0.65" />
            {/* Three bold white claws */}
            <polygon points="7.4,13.6 9.0,13.0 8.8,15.6" fill="#ffffff" strokeWidth="0.7" />
            <polygon points="10.8,14.2 12.6,14.0 11.8,16.2" fill="#ffffff" strokeWidth="0.7" />
            <polygon points="14.2,13.8 16.0,13.2 15.8,15.6" fill="#ffffff" strokeWidth="0.7" />
          </g>
        </>
      );
    },
  },
];
