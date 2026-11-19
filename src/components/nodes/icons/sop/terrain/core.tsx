import { arrowHead, type Pt, pts, quadGridPath, quadPt } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import {
  HeightfieldTile,
  HF_BLUE_HIGH,
  HF_BLUE_LOW,
  HF_DARK,
  HF_GREEN,
  HF_MUTED,
  HF_ORANGE,
  HF_WHITE,
  scaledHfQuad,
} from '../kits/heightfield';

/**
 * Heightfield core operators: create, file, crop, tile, resample and project.
 */
export const HEIGHTFIELD_CORE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.heightfield',
    label: 'HeightField',
    family: 'sop',
    description: 'Blue 3/4 heightfield terrain tile of stepped columns.',
    types: ['heightfield'],
    icons: ['sop_heightfield'],
    refKey: 'SOP_heightfield',
    render: () => <HeightfieldTile />,
  },
  {
    id: 'sop.heightfield_file',
    label: 'HeightField File',
    family: 'sop',
    description: 'Blue heightfield tile below an open orange folder with a curved orange arrow pointing into it.',
    types: ['heightfield_file'],
    icons: ['sop_heightfield_file'],
    refKey: 'SOP_heightfield_file',
    render: () => (
      <>
        <HeightfieldTile scale={0.78} offsetX={1.2} offsetY={3.0} />
        {/* Open orange folder at upper-left */}
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <path d="M2.6,3.2 L6.4,3.2 L7.4,4.5 L11.4,4.5 L11.4,10.6 L2.6,10.6 Z" fill="#c25e12" />
          <polygon points="3.6,5.2 10.6,5.2 10.2,10.2 3.2,10.2" fill="#f2f4f7" />
          <path d="M2.6,6.4 L11.8,6.4 L10.8,11.0 L2.2,11.0 Z" fill="#ffb066" />
        </g>
        {/* Curved orange import arrow */}
        <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <path
            d="M11.8,4.0 C15.2,3.4 17.8,5.4 18.0,8.2 L19.6,8.2 L16.6,11.6 L13.4,8.2 L15.2,8.2 C15.0,6.4 13.6,5.4 11.8,5.4 Z"
            fill="#ee8624"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.heightfield_output',
    label: 'HeightField Output',
    family: 'sop',
    description: 'Three stacked white output sheets floating above a blue heightfield tile.',
    types: ['heightfield_output'],
    icons: ['sop_heightfield_output'],
    refKey: 'SOP_heightfield_output',
    render: () => {
      const sheet = (dy: number): Pt[] => [
        [11.6, 2.2 + dy],
        [20.2, 5.2 + dy],
        [12.4, 8.8 + dy],
        [3.8, 5.8 + dy],
      ];
      return (
        <>
          <HeightfieldTile scale={0.82} offsetY={3.4} />
          <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
            <polygon points={pts(sheet(4.2))} fill="#eef2f7" />
            <polygon points={pts(sheet(2.1))} fill="#f2f4f7" />
            <polygon points={pts(sheet(0))} fill="#ffffff" />
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_crop',
    label: 'HeightField Crop',
    family: 'sop',
    description:
      'Muted grey-blue heightfield tile with a bright blue 2x2 front-right corner inside a red dashed border.',
    types: ['heightfield_crop'],
    icons: ['sop_heightfield_crop'],
    refKey: 'SOP_heightfield_crop',
    render: () => {
      const q = scaledHfQuad(1, 0, 0);
      const cropQuad: Pt[] = [quadPt(q, 1 / 3, 1 / 3), quadPt(q, 1, 1 / 3), quadPt(q, 1, 1), quadPt(q, 1 / 3, 1)];
      const d = `M${pts(cropQuad)} Z`;
      return (
        <>
          <HeightfieldTile
            cellPalette={(r, c, h) => (r >= 1 && c >= 1 ? (h >= 1.0 ? HF_BLUE_HIGH : HF_BLUE_LOW) : HF_MUTED)}
          />
          <path d={d} fill="none" stroke="#262626" strokeWidth="1.8" strokeDasharray="2.0 1.3" strokeLinejoin="round" />
          <path d={d} fill="none" stroke="#ff7066" strokeWidth="1.0" strokeDasharray="2.0 1.3" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_tilesplit',
    label: 'HeightField Tile Split',
    family: 'sop',
    description: 'Blue heightfield tile sliced along its 3x3 grid seams by four thin red dashed lines.',
    types: ['heightfield_tilesplit'],
    icons: ['sop_heightfield_tilesplit'],
    refKey: 'SOP_heightfield_tilesplit',
    render: () => {
      const q = scaledHfQuad(1, 0, 0.2);
      const liftY = (p: Pt, dy: number): Pt => [p[0], p[1] - dy];
      const lines = [
        `M${pts([liftY(quadPt(q, 1 / 3, -0.04), 0.7), liftY(quadPt(q, 1 / 3, 1.04), 0.7)])}`,
        `M${pts([liftY(quadPt(q, 2 / 3, -0.04), 0.7), liftY(quadPt(q, 2 / 3, 1.04), 0.7)])}`,
        `M${pts([liftY(quadPt(q, -0.04, 1 / 3), 0.7), liftY(quadPt(q, 1.04, 1 / 3), 0.7)])}`,
        `M${pts([liftY(quadPt(q, -0.04, 2 / 3), 0.7), liftY(quadPt(q, 1.04, 2 / 3), 0.7)])}`,
      ].join(' ');
      return (
        <>
          <HeightfieldTile offsetY={0.2} />
          <path
            d={lines}
            fill="none"
            stroke="#262626"
            strokeWidth="1.15"
            strokeDasharray="2.0 1.4"
            strokeLinecap="round"
          />
          <path
            d={lines}
            fill="none"
            stroke="#ff7066"
            strokeWidth="0.65"
            strokeDasharray="2.0 1.4"
            strokeLinecap="round"
          />
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_resample',
    label: 'HeightField Resample',
    family: 'sop',
    description:
      'Blue heightfield tile with coarse columns on the left two-thirds and smaller subdivided columns with vertical walls on the right third.',
    types: ['heightfield_resample'],
    icons: ['sop_heightfield_resample'],
    refKey: 'SOP_heightfield_resample',
    render: () => {
      const q = scaledHfQuad(1, 0, 0);
      const lift = (p: Pt, dy: number): Pt => [p[0], p[1] - dy];
      const fineHeights = [
        [0.5, 0.4],
        [1.1, 0.7],
        [1.3, 1.2],
        [1.1, 1.4],
        [1.4, 1.0],
        [1.6, 0.9],
      ];
      const fineCells: React.ReactNode[] = [];
      for (let r = 0; r < 6; r += 1) {
        for (let c = 0; c < 2; c += 1) {
          const u0 = 2 / 3 + (c / 2) * (1 / 3);
          const u1 = 2 / 3 + ((c + 1) / 2) * (1 / 3);
          const v0 = r / 6;
          const v1 = (r + 1) / 6;
          const h = fineHeights[r][c];
          const p00 = quadPt(q, u0, v0);
          const p10 = quadPt(q, u1, v0);
          const p11 = quadPt(q, u1, v1);
          const p01 = quadPt(q, u0, v1);
          const t00 = lift(p00, h);
          const t10 = lift(p10, h);
          const t11 = lift(p11, h);
          const t01 = lift(p01, h);
          const leftBot = r === 5 ? 1.5 : 0;
          const rightBot = c === 1 ? 1.5 : 0;
          fineCells.push(
            <g key={`f-${r}-${c}`} stroke="#262626" strokeLinejoin="round">
              <polygon
                points={pts([t01, t11, lift(p11, -leftBot), lift(p01, -leftBot)])}
                fill={HF_BLUE_LOW.left}
                strokeWidth={r === 5 ? '0.9' : '0.6'}
              />
              <polygon
                points={pts([t11, t10, lift(p10, -rightBot), lift(p11, -rightBot)])}
                fill={HF_BLUE_LOW.right}
                strokeWidth={c === 1 ? '0.9' : '0.6'}
              />
              <polygon
                points={pts([t00, t10, t11, t01])}
                fill={h >= 1.0 ? HF_BLUE_HIGH.top : HF_BLUE_LOW.top}
                strokeWidth="0.6"
              />
            </g>,
          );
        }
      }
      return (
        <>
          <HeightfieldTile skipCell={(_r, c) => c >= 2} />
          {fineCells}
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_xform',
    label: 'HeightField Transform',
    family: 'sop',
    description: 'Blue heightfield tile below a red center dot with five radiating red transform arrows.',
    types: ['heightfield_xform'],
    icons: ['sop_heightfield_xform'],
    refKey: 'SOP_heightfield_xform',
    render: () => {
      const c: Pt = [12, 6.8];
      const tips: Pt[] = [
        [12, 2.2],
        [7.2, 5.2],
        [16.8, 5.2],
        [7.8, 9.0],
        [16.2, 9.0],
      ];
      return (
        <>
          <HeightfieldTile scale={0.9} offsetY={2.4} />
          {tips.map((tip, i) => {
            const tri = arrowHead(tip, c, 2.2, 1.3);
            const shaftEnd: Pt = [(tri[1][0] + tri[2][0]) / 2, (tri[1][1] + tri[2][1]) / 2];
            return (
              <g key={i}>
                <CasedStroke
                  d={`M${pts([c])} L${pts([shaftEnd])}`}
                  color="#e03228"
                  width={1.0}
                  casing={2.0}
                  linecap="butt"
                />
                <polygon points={pts(tri)} fill="#e03228" stroke="#262626" strokeWidth="0.7" strokeLinejoin="round" />
              </g>
            );
          })}
          <circle cx={c[0]} cy={c[1]} r="1.3" fill="#e03228" stroke="#262626" strokeWidth="0.8" />
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_patch',
    label: 'HeightField Patch',
    family: 'sop',
    description: 'Green terrain tile with a raised white central peak outlined by a thin red dashed boundary.',
    types: ['heightfield_patch'],
    icons: ['sop_heightfield_patch'],
    refKey: 'SOP_heightfield_patch',
    render: () => {
      const heights = [
        [0.2, 0.3, 0.2],
        [0.3, 2.1, 0.3],
        [0.2, 0.3, 0.2],
      ];
      const q = scaledHfQuad(1, 0, 0.4);
      const patchLoop = `M${pts([
        [quadPt(q, 1 / 3, 1 / 3)[0], quadPt(q, 1 / 3, 1 / 3)[1] - 2.0],
        [quadPt(q, 2 / 3, 1 / 3)[0], quadPt(q, 2 / 3, 1 / 3)[1] - 2.0],
        [quadPt(q, 2 / 3, 2 / 3)[0], quadPt(q, 2 / 3, 2 / 3)[1] - 2.0],
        [quadPt(q, 1 / 3, 2 / 3)[0], quadPt(q, 1 / 3, 2 / 3)[1] - 2.0],
      ])} Z`;
      return (
        <>
          <HeightfieldTile
            heights={heights}
            offsetY={0.4}
            cellPalette={(r, c) => (r === 1 && c === 1 ? HF_WHITE : HF_GREEN)}
          />
          <path
            d={patchLoop}
            fill="none"
            stroke="#262626"
            strokeWidth="1.1"
            strokeDasharray="1.8 1.2"
            strokeLinejoin="round"
          />
          <path
            d={patchLoop}
            fill="none"
            stroke="#ff7066"
            strokeWidth="0.65"
            strokeDasharray="1.8 1.2"
            strokeLinejoin="round"
          />
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_project',
    label: 'HeightField Project',
    family: 'sop',
    description: 'Flat blue base tile with a raised white central column inside a green wireframe dome.',
    types: ['heightfield_project'],
    icons: ['sop_heightfield_project'],
    refKey: 'SOP_heightfield_project',
    render: () => {
      const heights = [
        [0, 0, 0],
        [0, 1.6, 0],
        [0, 0, 0],
      ];
      return (
        <>
          <HeightfieldTile
            heights={heights}
            offsetY={0.8}
            cellPalette={(r, c) => (r === 1 && c === 1 ? HF_WHITE : HF_BLUE_LOW)}
          />
          <CasedStroke
            d="M6.4,12.0 A5.6,6.4 0 1,1 17.6,12.0 A5.6,3.2 0 1,1 6.4,12.0"
            color="#58c848"
            width={0.95}
            casing={1.8}
          />
          <path
            d="M12.0,5.6 A2.8,6.4 0 0,1 12.0,15.2"
            fill="none"
            stroke="#58c848"
            strokeWidth="0.75"
            strokeDasharray="1.6 1.2"
          />
        </>
      );
    },
  },
  {
    id: 'sop.convertheightfield',
    label: 'Convert HeightField',
    family: 'sop',
    description:
      'Split tile with blue heightfield columns on the left two-thirds seamlessly aligned with an orange polygon mesh surface on the right third.',
    types: ['convertheightfield'],
    icons: ['sop_convertheightfield'],
    refKey: 'SOP_convertheightfield',
    render: () => {
      const q = scaledHfQuad(1, 0, 0);
      const heights = [
        [1.0, 0.8, 0.5],
        [1.5, 0.8, 0.5],
        [0.4, 0.8, 0.5],
      ];
      const lift = (p: Pt, dy: number): Pt => [p[0], p[1] - dy];
      const p00 = lift(quadPt(q, 2 / 3, 0), 0.8);
      const p10 = lift(quadPt(q, 1, 0), 0.8);
      const p11 = lift(quadPt(q, 1, 1), 0.8);
      const p01 = lift(quadPt(q, 2 / 3, 1), 0.8);
      const b10 = quadPt(q, 1, 0);
      const b11 = quadPt(q, 1, 1);
      const b01 = quadPt(q, 2 / 3, 1);
      const rightQuad: readonly [Pt, Pt, Pt, Pt] = [p00, p10, p11, p01];
      return (
        <>
          <HeightfieldTile heights={heights} skipCell={(_r, c) => c >= 2} />
          <g stroke="#262626" strokeLinejoin="round">
            <polygon
              points={pts([p01, p11, [b11[0], b11[1] + 1.5], [b01[0], b01[1] + 1.5]])}
              fill={HF_ORANGE.left}
              strokeWidth="0.95"
            />
            <polygon
              points={pts([p11, p10, [b10[0], b10[1] + 1.5], [b11[0], b11[1] + 1.5]])}
              fill={HF_ORANGE.right}
              strokeWidth="0.95"
            />
            <polygon points={pts(rightQuad)} fill={HF_ORANGE.top} strokeWidth="0.85" />
            <path d={quadGridPath(rightQuad, 1, 3)} fill="none" stroke="#262626" strokeWidth="0.65" />
          </g>
        </>
      );
    },
  },
  {
    id: 'sop.neuralterraingenerate',
    label: 'Neural Terrain Generate',
    family: 'sop',
    description:
      'Blue heightfield tile whose front-right corner transitions seamlessly into an un-subdivided dark slate contour surface of matching height.',
    types: ['neuralterraingenerate'],
    icons: ['sop_neuralterraingenerate'],
    refKey: 'SOP_neuralterraingenerate',
    render: () => {
      const q = scaledHfQuad(1, 0, 0);
      const heights = [
        [1.0, 1.5, 0.8],
        [1.4, 0.8, 0.8],
        [0.4, 0.8, 0.8],
      ];
      const lift = (p: Pt, dy: number): Pt => [p[0], p[1] - dy];
      const p00 = lift(quadPt(q, 1 / 3, 1 / 3), 0.8);
      const p10 = lift(quadPt(q, 1, 1 / 3), 0.8);
      const p11 = lift(quadPt(q, 1, 1), 0.8);
      const p01 = lift(quadPt(q, 1 / 3, 1), 0.8);
      const b10 = quadPt(q, 1, 1 / 3);
      const b11 = quadPt(q, 1, 1);
      const b01 = quadPt(q, 1 / 3, 1);
      return (
        <>
          <HeightfieldTile heights={heights} skipCell={(r, c) => r >= 1 && c >= 1} />
          <g stroke="#262626" strokeLinejoin="round">
            <polygon
              points={pts([p01, p11, [b11[0], b11[1] + 1.5], [b01[0], b01[1] + 1.5]])}
              fill={HF_DARK.left}
              strokeWidth="0.95"
            />
            <polygon
              points={pts([p11, p10, [b10[0], b10[1] + 1.5], [b11[0], b11[1] + 1.5]])}
              fill={HF_DARK.right}
              strokeWidth="0.95"
            />
            <polygon points={pts([p00, p10, p11, p01])} fill="#3a3f47" strokeWidth="0.85" />
            <path
              d={`M${pts([lift(quadPt(q, 0.45, 0.45), 0.8), lift(quadPt(q, 0.78, 0.6), 0.8), lift(quadPt(q, 0.9, 0.88), 0.8)])}`}
              fill="none"
              stroke="#89929e"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d={`M${pts([lift(quadPt(q, 0.42, 0.7), 0.8), lift(quadPt(q, 0.68, 0.8), 0.8), lift(quadPt(q, 0.75, 0.95), 0.8)])}`}
              fill="none"
              stroke="#262626"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d={`M${pts([lift(quadPt(q, 0.42, 0.7), 0.8), lift(quadPt(q, 0.68, 0.8), 0.8), lift(quadPt(q, 0.75, 0.95), 0.8)])}`}
              fill="none"
              stroke="#c0c7d1"
              strokeWidth="1.0"
              strokeLinecap="round"
            />
          </g>
        </>
      );
    },
  },
];
