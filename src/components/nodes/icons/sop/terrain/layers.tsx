import { gearPath, type Pt, pts, quadPt } from '../../geoHelpers';
import type { OperatorIconDef } from '../../iconTypes';
import { RoundGlyphBadge } from '../kits/dopLop';
import {
  FLAT_HF_HEIGHTS,
  HeightfieldTile,
  HF_BLUE_HIGH,
  HF_BLUE_LOW,
  HF_GREEN,
  HF_ORANGE,
  HF_RED,
  HF_TEAL,
  HF_WHITE,
  HF_YELLOW,
  scaledHfQuad,
} from '../kits/heightfield';

/**
 * Heightfield layer, scatter and display operators.
 */
export const HEIGHTFIELD_LAYER_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.heightfield_layer',
    label: 'HeightField Layer',
    family: 'sop',
    description: 'Blue heightfield tile with yellow, red, and white grouped layer patches.',
    types: ['heightfield_layer'],
    icons: ['sop_heightfield_layer'],
    refKey: 'SOP_heightfield_layer',
    render: () => (
      <HeightfieldTile
        cellPalette={(r, c, h) => {
          if (r === 2 && c <= 1) return HF_YELLOW;
          if (r === 0 && c >= 1) return HF_RED;
          if (r >= 1 && c === 2) return HF_WHITE;
          return h >= 1.0 ? HF_BLUE_HIGH : HF_BLUE_LOW;
        }}
      />
    ),
  },
  {
    id: 'sop.heightfield_layerclear',
    label: 'HeightField Layer Clear',
    family: 'sop',
    description: 'Multi-colored heightfield tile being swept clean to white by a yellow broom with an orange handle.',
    types: ['heightfield_layerclear'],
    icons: ['sop_heightfield_layerclear'],
    refKey: 'SOP_heightfield_layerclear',
    render: () => (
      <>
        <HeightfieldTile
          offsetY={0.8}
          cellPalette={(r, c) => {
            if (r + c >= 3) return HF_WHITE;
            if (r === 0 && c === 1) return HF_GREEN;
            if (r === 1 && c === 0) return HF_TEAL;
            if (r === 2 && c === 0) return HF_YELLOW;
            return HF_BLUE_LOW;
          }}
        />
        {/* Yellow broom with orange handle from upper-right */}
        <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <polygon points="15.2,5.6 18.0,2.4 19.2,3.4 16.4,6.6" fill="#ee8624" />
          <polygon points="13.6,6.0 17.0,6.6 15.8,8.4 12.6,7.4" fill="#c25e12" />
          <polygon points="12.4,7.4 16.0,8.4 14.0,12.8 9.4,10.8" fill="#ffe47a" />
          <line x1="12.4" y1="8.6" x2="11.0" y2="11.4" strokeWidth="0.65" />
          <line x1="14.2" y1="8.8" x2="12.6" y2="12.0" strokeWidth="0.65" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.heightfield_layerproperty',
    label: 'HeightField Layer Properties',
    family: 'sop',
    description: 'Blue heightfield tile with a dark round badge containing a white eight-tooth gear.',
    types: ['heightfield_layerproperty'],
    icons: ['sop_heightfield_layerproperty'],
    refKey: 'SOP_heightfield_layerproperty',
    render: () => (
      <>
        <HeightfieldTile offsetX={-0.6} offsetY={-0.6} />
        <RoundGlyphBadge>
          <path d={gearPath(17.1, 17.1, 8, 3.2, 2.2)} fill="#ffffff" />
          <circle cx="17.1" cy="17.1" r="1.1" fill="#2e3338" />
        </RoundGlyphBadge>
      </>
    ),
  },
  {
    id: 'sop.heightfield_copylayer',
    label: 'HeightField Copy Layer',
    family: 'sop',
    description:
      'Two separated offset heightfield tiles: an upper-left yellow-and-blue tile above a lower-right orange-and-blue tile.',
    types: ['heightfield_copylayer'],
    icons: ['sop_heightfield_copylayer'],
    refKey: 'SOP_heightfield_copylayer',
    render: () => (
      <>
        <HeightfieldTile
          scale={0.7}
          offsetX={2.2}
          offsetY={3.6}
          cellPalette={(r, c, h) => (r <= 1 && c === 2 ? HF_ORANGE : h >= 0.5 ? HF_BLUE_HIGH : HF_BLUE_LOW)}
        />
        <HeightfieldTile
          scale={0.7}
          offsetX={-2.2}
          offsetY={-3.6}
          cellPalette={(r, c, h) => (r <= 1 && c === 2 ? HF_YELLOW : h >= 0.5 ? HF_BLUE_HIGH : HF_BLUE_LOW)}
        />
      </>
    ),
  },
  {
    id: 'sop.heightfield_isolatelayer',
    label: 'HeightField Isolate Layer',
    family: 'sop',
    description: 'Heightfield tile with varied multi-colored cells in yellow, red, green, teal, orange, and blue.',
    types: ['heightfield_isolatelayer'],
    icons: ['sop_heightfield_isolatelayer'],
    refKey: 'SOP_heightfield_isolatelayer',
    render: () => {
      const paletteMap = [
        [HF_TEAL, HF_GREEN, HF_YELLOW],
        [HF_BLUE_HIGH, HF_YELLOW, HF_RED],
        [HF_GREEN, HF_ORANGE, HF_BLUE_HIGH],
      ];
      return <HeightfieldTile cellPalette={(r, c) => paletteMap[r][c]} />;
    },
  },
  {
    id: 'sop.heightfield_blur',
    label: 'HeightField Blur',
    family: 'sop',
    description:
      'Blue heightfield tile with sharp dark-outlined columns on the left washing into soft blue-lined low-relief cells on the right.',
    types: ['heightfield_blur'],
    icons: ['sop_heightfield_blur'],
    refKey: 'SOP_heightfield_blur',
    render: () => {
      const q = scaledHfQuad(1, 0, 0);
      const heights = [
        [1.5, 1.9, 0.5],
        [1.7, 0.6, 0.4],
        [0.4, 0.4, 0.3],
      ];
      const lift = (p: Pt, dy: number): Pt => [p[0], p[1] - dy];
      const isCrisp = (r: number, c: number): boolean => c === 0 || (r === 0 && c === 1);
      const blurCells: React.ReactNode[] = [];
      for (let r = 0; r < 3; r += 1) {
        for (let c = 0; c < 3; c += 1) {
          if (isCrisp(r, c)) continue;
          const h = heights[r][c];
          const p00 = quadPt(q, c / 3, r / 3);
          const p10 = quadPt(q, (c + 1) / 3, r / 3);
          const p11 = quadPt(q, (c + 1) / 3, (r + 1) / 3);
          const p01 = quadPt(q, c / 3, (r + 1) / 3);
          const t00 = lift(p00, h);
          const t10 = lift(p10, h);
          const t11 = lift(p11, h);
          const t01 = lift(p01, h);
          const leftBot = r === 2 ? 1.5 : 0;
          const rightBot = c === 2 ? 1.5 : 0;
          blurCells.push(
            <g key={`b-${r}-${c}`} strokeLinejoin="round">
              <polygon
                points={pts([t01, t11, lift(p11, -leftBot), lift(p01, -leftBot)])}
                fill={HF_BLUE_LOW.left}
                stroke={r === 2 ? '#262626' : '#2e5a9a'}
                strokeWidth={r === 2 ? '0.95' : '0.6'}
              />
              <polygon
                points={pts([t11, t10, lift(p10, -rightBot), lift(p11, -rightBot)])}
                fill={HF_BLUE_LOW.right}
                stroke={c === 2 ? '#262626' : '#2e5a9a'}
                strokeWidth={c === 2 ? '0.95' : '0.6'}
              />
              <polygon points={pts([t00, t10, t11, t01])} fill={HF_BLUE_LOW.top} stroke="#3672c4" strokeWidth="0.6" />
            </g>,
          );
        }
      }
      return (
        <>
          <HeightfieldTile heights={heights} skipCell={(r, c) => !isCrisp(r, c)} />
          {blurCells}
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_pattern',
    label: 'HeightField Pattern',
    family: 'sop',
    description:
      'Blue heightfield tile with a high-contrast alternating checkerboard of tall columns and flat troughs.',
    types: ['heightfield_pattern'],
    icons: ['sop_heightfield_pattern'],
    refKey: 'SOP_heightfield_pattern',
    render: () => {
      const heights = [
        [2.2, 0.1, 2.2],
        [0.1, 2.2, 0.1],
        [2.2, 0.1, 2.2],
      ];
      return <HeightfieldTile heights={heights} offsetY={0.6} />;
    },
  },
  {
    id: 'sop.heightfield_scatter',
    label: 'HeightField Scatter',
    family: 'sop',
    description: 'White heightfield tile with five red scatter dots placed across the terrain surface.',
    types: ['heightfield_scatter'],
    icons: ['sop_heightfield_scatter'],
    refKey: 'SOP_heightfield_scatter',
    render: () => {
      const q = scaledHfQuad(1, 0, 0);
      const dots: [number, number][] = [
        [0.22, 0.25],
        [0.72, 0.28],
        [0.48, 0.52],
        [0.28, 0.78],
        [0.76, 0.74],
      ];
      return (
        <>
          <HeightfieldTile heights={FLAT_HF_HEIGHTS} cellPalette={() => HF_WHITE} />
          {dots.map(([u, v], i) => {
            const [x, y] = quadPt(q, u, v);
            return <circle key={i} cx={x} cy={y} r="0.95" fill="#e03228" stroke="#262626" strokeWidth="0.6" />;
          })}
        </>
      );
    },
  },
  {
    id: 'sop.heightfield_quickshade',
    label: 'HeightField Quick Shade',
    family: 'sop',
    description: 'Green terrain tile with a crisp three-tone white and grey shaded central peak.',
    types: ['heightfield_quickshade'],
    icons: ['sop_heightfield_quickshade'],
    refKey: 'SOP_heightfield_quickshade',
    render: () => {
      const heights = [
        [0.2, 0.3, 0.2],
        [0.3, 2.1, 0.3],
        [0.2, 0.3, 0.2],
      ];
      return (
        <HeightfieldTile
          heights={heights}
          offsetY={0.4}
          cellPalette={(r, c) => (r === 1 && c === 1 ? HF_WHITE : HF_GREEN)}
        />
      );
    },
  },
  {
    id: 'sop.heightfield_visualize',
    label: 'HeightField Visualize',
    family: 'sop',
    description: 'Blue heightfield tile below a translucent wavy orange wireframe terrain surface.',
    types: ['heightfield_visualize'],
    icons: ['sop_heightfield_visualize'],
    refKey: 'SOP_heightfield_visualize',
    render: () => {
      const q = scaledHfQuad(0.92, 0, -2.2);
      const z = [
        [0.0, -0.8, 0.4, -0.2],
        [-0.6, 0.9, -1.2, 0.5],
        [0.5, -1.1, 0.8, -0.4],
        [-0.2, 0.4, -0.5, 0.1],
      ];
      const vPt = (r: number, c: number): Pt => {
        const p = quadPt(q, c / 3, r / 3);
        return [p[0], p[1] + z[r][c]];
      };
      const quads: React.ReactNode[] = [];
      for (let r = 0; r < 3; r += 1) {
        for (let c = 0; c < 3; c += 1) {
          quads.push(
            <polygon
              key={`${r}-${c}`}
              points={pts([vPt(r, c), vPt(r, c + 1), vPt(r + 1, c + 1), vPt(r + 1, c)])}
              fill={r % 2 === c % 2 ? '#ffb066' : '#ee8624'}
              fillOpacity="0.65"
              stroke="#262626"
              strokeWidth="0.65"
              strokeLinejoin="round"
            />,
          );
        }
      }
      return (
        <>
          <HeightfieldTile scale={0.92} offsetY={2.4} />
          {quads}
        </>
      );
    },
  },
];
