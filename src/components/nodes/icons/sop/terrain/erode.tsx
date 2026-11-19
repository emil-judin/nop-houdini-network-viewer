import { isoBoxFaces, type Pt, pts, quadPt } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { RoundGlyphBadge } from '../kits/dopLop';
import { ErodeCanyonBlock, HeightfieldTile, scaledHfQuad } from '../kits/heightfield';

/**
 * Heightfield erosion and shaping operators.
 */
export const HEIGHTFIELD_ERODE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.heightfield_erode',
    label: 'HeightField Erode',
    family: 'sop',
    description: 'Orange canyon block with a green upper rim and a winding light-blue river.',
    types: ['heightfield_erode'],
    icons: ['sop_heightfield_erode'],
    refKey: 'SOP_heightfield_erode',
    render: () => <ErodeCanyonBlock />,
  },
  {
    id: 'sop.heightfield_erode_hydro',
    label: 'HeightField Erode Hydro',
    family: 'sop',
    description: 'Orange canyon block with a dark round badge showing a white slope triangle and tumbling debris dots.',
    types: ['heightfield_erode_hydro'],
    icons: ['sop_heightfield_erode_flow'],
    refKey: 'SOP_heightfield_erode_flow',
    render: () => (
      <>
        <ErodeCanyonBlock />
        <RoundGlyphBadge>
          <polygon points="14.2,19.4 14.2,14.6 19.6,19.4" fill="#ffffff" />
          <circle cx="16.2" cy="14.6" r="0.65" fill="#ffffff" />
          <circle cx="17.8" cy="15.4" r="0.6" fill="#ffffff" />
          <circle cx="18.8" cy="16.8" r="0.65" fill="#ffffff" />
          <circle cx="19.6" cy="18.1" r="0.55" fill="#ffffff" />
        </RoundGlyphBadge>
      </>
    ),
  },
  {
    id: 'sop.heightfield_erode_precipitation',
    label: 'HeightField Erode Precipitation',
    family: 'sop',
    description:
      'Orange canyon block with a dark round badge showing a white storm cloud, lightning bolt, and rain streaks.',
    types: ['heightfield_erode_precipitation'],
    icons: ['sop_heightfield_erode_precipitation'],
    refKey: 'SOP_heightfield_erode_precipitation',
    render: () => (
      <>
        <ErodeCanyonBlock />
        <RoundGlyphBadge>
          <path
            d="M14.6,16.8 C13.8,16.8 13.4,16.0 13.8,15.2 C14.1,14.6 14.8,14.4 15.2,14.6 C15.6,13.8 16.6,13.5 17.5,13.9 C18.2,14.2 18.5,14.8 18.4,15.3 C19.2,15.3 19.8,16.0 19.6,16.8 Z"
            fill="#ffffff"
          />
          <polygon points="16.2,17.0 15.3,18.4 16.0,18.4 15.6,19.7 16.8,18.0 16.1,18.0" fill="#ffffff" />
          <polygon points="17.5,17.3 18.0,17.5 17.4,19.3 16.9,19.1" fill="#ffffff" />
          <polygon points="18.8,17.3 19.3,17.5 18.7,19.3 18.2,19.1" fill="#ffffff" />
        </RoundGlyphBadge>
      </>
    ),
  },
  {
    id: 'sop.heightfield_erode_thermal',
    label: 'HeightField Erode Thermal',
    family: 'sop',
    description: 'Orange canyon block with a dark round badge showing a white thermometer.',
    types: ['heightfield_erode_thermal'],
    icons: ['sop_heightfield_erode_thermal'],
    refKey: 'SOP_heightfield_erode_thermal',
    render: () => (
      <>
        <ErodeCanyonBlock />
        <RoundGlyphBadge>
          <path
            d="M16.2,13.6 C16.2,13.0 18.0,13.0 18.0,13.6 L18.0,17.0 C18.6,17.5 18.7,18.6 18.1,19.3 C17.5,19.9 16.5,19.9 15.9,19.3 C15.3,18.6 15.4,17.5 16.0,17.0 Z"
            fill="#ffffff"
          />
          <circle cx="17.1" cy="18.4" r="0.8" fill="#2e3338" />
          <line x1="17.1" y1="15.0" x2="17.1" y2="18.4" stroke="#2e3338" strokeWidth="0.7" strokeLinecap="round" />
        </RoundGlyphBadge>
      </>
    ),
  },
  {
    id: 'sop.heightfield_flowfield',
    label: 'HeightField Flow Field',
    family: 'sop',
    description:
      'Steep tan stepped cliff on the right sloping down onto a dark-grey base with vertical front corners and boulders at the foot.',
    types: ['heightfield_flowfield', 'heightfield_slump'],
    icons: ['sop_heightfield_flowfield', 'sop_heightfield_slump'],
    refKey: 'SOP_heightfield_flowfield',
    render: () => (
      <g stroke="#262626" strokeLinejoin="round">
        {/* Flat dark-grey base on left with vertical front corners */}
        <polygon points="2.6,17.2 10.6,13.6 20.6,16.4 11.4,21.0" fill="#5a616b" strokeWidth="0.95" />
        <polygon points="2.6,17.2 11.4,21.0 11.4,22.0 2.6,18.2" fill="#3a3f47" strokeWidth="0.95" />
        <polygon points="11.4,21.0 20.6,16.4 20.6,17.4 11.4,22.0" fill="#262626" strokeWidth="0.95" />
        {/* Vertical dark-grey side wall on the right */}
        <polygon points="20.6,5.8 20.6,16.4 11.4,21.0 15.8,14.2" fill="#3a3f47" strokeWidth="0.95" />
        {/* Steep tan cliff slope connecting down to the ground */}
        <polygon points="14.2,3.4 20.6,5.8 15.8,14.2 11.4,21.0 6.8,18.0 10.6,13.4" fill="#c89a5a" strokeWidth="0.95" />
        {/* Stepped tan ledges on the upper cliff */}
        <polygon points="13.2,6.0 19.6,8.0 18.2,10.0 11.8,8.0" fill="#e8c48a" strokeWidth="0.75" />
        <polygon points="11.6,9.8 18.0,11.6 16.6,13.8 10.2,12.0" fill="#e8c48a" strokeWidth="0.75" />
        {/* Sliding boulders at the foot of the slope */}
        <circle cx="11.4" cy="15.8" r="1.5" fill="#e8c48a" strokeWidth="0.8" />
        <circle cx="8.8" cy="17.2" r="1.1" fill="#c89a5a" strokeWidth="0.8" />
        <circle cx="13.4" cy="17.4" r="1.05" fill="#e8c48a" strokeWidth="0.8" />
      </g>
    ),
  },
  {
    id: 'sop.heightfield_terrace',
    label: 'HeightField Terrace',
    family: 'sop',
    description: 'Three stacked blue isometric terrace steps.',
    types: ['heightfield_terrace'],
    icons: ['sop_heightfield_terrace'],
    refKey: 'SOP_heightfield_terrace',
    render: () => {
      const tiers = [isoBoxFaces(12, 9.6, 8.8, 2.2), isoBoxFaces(12, 6.8, 6.2, 2.2), isoBoxFaces(12, 4.0, 3.6, 2.2)];
      return (
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          {tiers.map((f, i) => (
            <g key={i}>
              <polygon points={pts(f.left)} fill="#5aa2f2" />
              <polygon points={pts(f.right)} fill="#3672c4" />
              <polygon points={pts(f.top)} fill="#8fc2ff" />
            </g>
          ))}
        </g>
      );
    },
  },
  {
    id: 'sop.heightfield_noise',
    label: 'HeightField Noise',
    family: 'sop',
    description: 'Blue heightfield tile with a bright green wavy wireframe noise mesh floating above it.',
    types: ['heightfield_noise'],
    icons: ['sop_heightfield_noise'],
    refKey: 'SOP_heightfield_noise',
    render: () => {
      const q = scaledHfQuad(0.94, 0, 1.4);
      const liftPt = (u: number, v: number, h: number): Pt => {
        const p = quadPt(q, u, v);
        return [p[0], p[1] - h];
      };
      const meshLines: string[] = [];
      for (let i = 0; i <= 3; i += 1) {
        const t = i / 3;
        const rowPts: Pt[] = [];
        const colPts: Pt[] = [];
        for (let j = 0; j <= 3; j += 1) {
          const s = j / 3;
          const hr = 2.6 + Math.sin(s * Math.PI * 2 + i) * 1.1;
          const hc = 2.6 + Math.sin(t * Math.PI * 2 + j) * 1.1;
          rowPts.push(liftPt(s, t, hr));
          colPts.push(liftPt(t, s, hc));
        }
        meshLines.push(`M${pts(rowPts).replace(/ /g, ' L')}`);
        meshLines.push(`M${pts(colPts).replace(/ /g, ' L')}`);
      }
      return (
        <>
          <HeightfieldTile scale={0.94} offsetY={1.4} />
          <CasedStroke d={meshLines.join(' ')} color="#58c848" width={0.8} casing={1.6} />
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_distort',
    label: 'HeightField Distort by Noise',
    family: 'sop',
    description:
      'Blue heightfield tile in front of ten chunky teal arrows pointing in varied directions around its perimeter.',
    types: ['heightfield_distort'],
    icons: ['sop_heightfield_distort'],
    refKey: 'SOP_heightfield_distort',
    render: () => {
      const arrows: { cx: number; cy: number; rot: number }[] = [
        { cx: 5.2, cy: 5.0, rot: 25 },
        { cx: 9.2, cy: 4.2, rot: 145 },
        { cx: 14.2, cy: 4.2, rot: -155 },
        { cx: 18.8, cy: 5.4, rot: 120 },
        { cx: 4.2, cy: 9.6, rot: -20 },
        { cx: 19.6, cy: 10.6, rot: 175 },
        { cx: 4.6, cy: 16.6, rot: -35 },
        { cx: 8.6, cy: 18.8, rot: -85 },
        { cx: 14.4, cy: 19.0, rot: -115 },
        { cx: 18.8, cy: 16.6, rot: -155 },
      ];
      return (
        <>
          {arrows.map((a, i) => (
            <g key={i} transform={`translate(${a.cx} ${a.cy}) rotate(${a.rot})`}>
              <polygon
                points="-2.1,-0.75 0.3,-0.75 0.3,-1.7 2.4,0 0.3,1.7 0.3,0.75 -2.1,0.75"
                fill="#5fd3c8"
                stroke="#262626"
                strokeWidth="0.75"
                strokeLinejoin="round"
              />
            </g>
          ))}
          <HeightfieldTile scale={0.74} />
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_distortbylayer',
    label: 'HeightField Distort by Layer',
    family: 'sop',
    description: 'Blue heightfield tile with yellow-outlined offset grid squares hovering above the surface.',
    types: ['heightfield_distortbylayer'],
    icons: ['sop_heightfield_distortbylayer'],
    refKey: 'SOP_heightfield_distortbylayer',
    render: () => {
      const q = scaledHfQuad(0.95, 0, 0.5);
      const cellBox = (u0: number, v0: number, dx: number, dy: number): string => {
        const du = 0.35;
        const dv = 0.35;
        const p = [quadPt(q, u0, v0), quadPt(q, u0 + du, v0), quadPt(q, u0 + du, v0 + dv), quadPt(q, u0, v0 + dv)].map(
          ([x, y]) => [x + dx, y + dy] as Pt,
        );
        return `M${pts(p)} Z`;
      };
      const frames = [
        cellBox(0.08, 0.08, -0.5, -1.5),
        cellBox(0.55, 0.08, 0.6, -1.3),
        cellBox(0.1, 0.54, -0.4, -1.1),
        cellBox(0.56, 0.54, 0.5, -1.2),
      ].join(' ');
      return (
        <>
          <HeightfieldTile scale={0.95} offsetY={0.5} />
          <CasedStroke d={frames} color="#ffe47a" width={0.85} casing={1.7} />
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_deform',
    label: 'HeightField Deform',
    family: 'sop',
    description: 'Blue dune buggy driving over a golden-tan curved sand dune block.',
    types: ['heightfield_deform'],
    icons: ['sop_heightfield_deform'],
    refKey: 'SOP_heightfield_deform',
    render: () => (
      <g stroke="#262626" strokeLinejoin="round">
        {/* Golden-tan sand dune block */}
        <path
          d="M3.0,15.6 C5.8,10.6 9.4,8.6 13.0,8.8 C16.2,9.0 18.6,10.8 21.0,12.6 L21.0,16.8 L12.4,21.2 L3.0,17.8 Z"
          fill="#d49a18"
          strokeWidth="0.95"
        />
        <path
          d="M3.0,15.6 C5.8,10.6 9.4,8.6 13.0,8.8 C15.6,9.0 17.8,10.4 20.6,12.2 L12.4,17.2 L3.0,15.6 Z"
          fill="#f2c438"
          strokeWidth="0.85"
        />
        <polygon points="12.4,17.2 21.0,12.6 21.0,16.8 12.4,21.2" fill="#c25e12" strokeWidth="0.85" />
        {/* Blue dune buggy on crest */}
        <g transform="translate(0 -0.4)">
          <polygon points="7.4,8.6 11.2,6.4 15.8,6.6 17.2,8.4 15.2,9.8 7.8,9.8" fill="#3672c4" strokeWidth="0.8" />
          <polygon points="10.4,6.4 12.0,4.6 14.6,4.8 15.6,6.6" fill="#8fc2ff" strokeWidth="0.75" />
          <circle cx="9.2" cy="10.0" r="1.75" fill="#3a3f47" strokeWidth="0.8" />
          <circle cx="9.2" cy="10.0" r="0.7" fill="#eef2f7" strokeWidth="0.6" />
          <circle cx="15.0" cy="10.0" r="1.75" fill="#3a3f47" strokeWidth="0.8" />
          <circle cx="15.0" cy="10.0" r="0.7" fill="#eef2f7" strokeWidth="0.6" />
        </g>
      </g>
    ),
  },
];
