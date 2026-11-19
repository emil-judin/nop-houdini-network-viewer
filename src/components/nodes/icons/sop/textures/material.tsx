import React from 'react';
import { isoBoxFaces, type Pt, pts, quadPt, r2, roundedRectPath } from '../../geoHelpers';
import { ShadedSphere, SPHERE_TONES } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

/**
 * The Material and Texture family.
 * Shared kit: `TigerCube`, an amber three-tone isometric cube with bold black tiger stripes,
 * used large in `sop.material` and small at the center of `sop.matnet`.
 */

const OUTLINE = '#262626';

const TONES = {
  orange: ['#ffb066', '#ee8624', '#c25e12'] as const,
  grey: ['#eef2f7', '#c0c7d1', '#89929e'] as const,
  yellow: ['#ffe47a', '#f2c438', '#d49a18'] as const,
  red: ['#ff7066', '#e03228', '#a81f18'] as const,
  blue: ['#8fc2ff', '#3672c4', '#2e5a9a'] as const,
  lightBlue: ['#eef2f7', '#8fc2ff', '#5aa2f2'] as const,
};

/** Isometric 2:1 cube with three-tone faces, optional inner overlay, crease lines and outline. */
const IsoCube: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  tones: readonly [string, string, string];
  strokeWidth?: number;
  fillOpacity?: number;
  children?: React.ReactNode;
}> = ({ x, y, w, h, tones, strokeWidth = 1.1, fillOpacity, children }) => {
  const f = isoBoxFaces(x, y, w, h);
  const outer: Pt[] = [f.top[0], f.top[1], f.right[2], f.right[3], f.left[3], f.left[0]];
  return (
    <>
      <g fillOpacity={fillOpacity}>
        <polygon points={pts(f.top)} fill={tones[0]} />
        <polygon points={pts(f.left)} fill={tones[1]} />
        <polygon points={pts(f.right)} fill={tones[2]} />
      </g>
      {children}
      <path
        d={`M${pts([f.top[3]])} L${pts([f.top[2]])} L${pts([f.top[1]])} M${pts([f.top[2]])} L${pts([f.left[2]])}`}
        fill="none"
        stroke={OUTLINE}
        strokeWidth={Math.max(0.6, strokeWidth * 0.6)}
        strokeLinejoin="round"
      />
      <polygon points={pts(outer)} fill="none" stroke={OUTLINE} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </>
  );
};

/**
 * Shared kit: amber three-tone isometric cube covered in bold black tiger stripes.
 * Clipped to the cube silhouette with `uid` so stripes never spill outside the outline.
 */
const TigerCube: React.FC<{
  uid: string;
  x: number;
  y: number;
  w: number;
  h: number;
  strokeWidth?: number;
}> = ({ uid, x, y, w, h, strokeWidth = 1.15 }) => {
  const f = isoBoxFaces(x, y, w, h);
  const outer: Pt[] = [f.top[0], f.top[1], f.right[2], f.right[3], f.left[3], f.left[0]];
  const clipId = `${uid}-tiger-clip`;

  // Map normalized (u, v) in cube-local space ([-1..1] across width, [0..2] down) to SVG coords.
  const pt = (nx: number, ny: number): Pt => [x + nx * w, y + ny * (w * 0.5 + h * 0.5)];
  // Wavy S-curved tiger-stripe ribbon with real body thickness and tapered tips.
  const ribbon = (p0: Pt, p1: Pt, p2: Pt, c1: Pt, c2: Pt): string =>
    `M${pts([pt(p0[0], p0[1])])} Q${pts([pt(c1[0], c1[1]), pt(p2[0], p2[1])])} Q${pts([pt(c2[0], c2[1]), pt(p1[0], p1[1])])} Z`;

  const stripes = [
    // Top face: bold alternating wavy stripes running upper-left <-> lower-right like the sides
    ribbon([-0.86, 0.48], [-0.68, 0.56], [-0.14, 0.8], [-0.52, 0.68], [-0.42, 0.58]),
    ribbon([-0.68, 0.32], [-0.5, 0.24], [0.18, 0.72], [-0.3, 0.54], [-0.14, 0.44]),
    ribbon([0.36, 0.72], [0.54, 0.64], [-0.28, 0.18], [0.02, 0.48], [0.16, 0.38]),
    ribbon([-0.36, 0.18], [-0.18, 0.1], [0.68, 0.56], [0.12, 0.38], [0.26, 0.28]),
    ribbon([0.74, 0.52], [0.9, 0.44], [0.12, 0.08], [0.42, 0.32], [0.54, 0.22]),
    // Left face: alternating stripes from top edge down and bottom edge up
    ribbon([-0.86, 0.58], [-0.68, 0.68], [-0.74, 1.38], [-0.88, 1.0], [-0.64, 1.0]),
    ribbon([-0.64, 1.66], [-0.46, 1.76], [-0.56, 0.92], [-0.68, 1.32], [-0.44, 1.3]),
    ribbon([-0.42, 0.8], [-0.24, 0.9], [-0.32, 1.62], [-0.44, 1.22], [-0.2, 1.2]),
    ribbon([-0.22, 1.88], [-0.04, 1.98], [-0.14, 1.12], [-0.24, 1.5], [-0.04, 1.48]),
    // Right face: alternating stripes from top edge down and bottom edge up
    ribbon([0.08, 0.96], [0.26, 0.88], [0.18, 1.72], [0.06, 1.34], [0.28, 1.34]),
    ribbon([0.3, 1.84], [0.48, 1.74], [0.38, 0.94], [0.26, 1.38], [0.48, 1.36]),
    ribbon([0.46, 0.78], [0.64, 0.68], [0.56, 1.54], [0.44, 1.16], [0.66, 1.14]),
    ribbon([0.68, 1.64], [0.86, 1.54], [0.78, 0.74], [0.66, 1.16], [0.88, 1.14]),
  ].join(' ');

  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <polygon points={pts(outer)} />
        </clipPath>
      </defs>
      <IsoCube x={x} y={y} w={w} h={h} tones={TONES.orange} strokeWidth={strokeWidth}>
        <g clipPath={`url(#${clipId})`}>
          <path d={stripes} fill={OUTLINE} />
        </g>
      </IsoCube>
    </>
  );
};

/** Computes a 5-pointed star polygon centered at `(cx, cy)`. */
const star5 = (cx: number, cy: number, rOuter: number, rInner: number, rotDeg = -90): Pt[] => {
  const out: Pt[] = [];
  for (let i = 0; i < 10; i += 1) {
    const a = ((rotDeg + i * 36) * Math.PI) / 180;
    const r = i % 2 === 0 ? rOuter : rInner;
    out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return out;
};

/**
 * Material, shader, texture and baking operators.
 */
export const MATERIAL_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.material',
    label: 'Material',
    family: 'sop',
    description: 'Amber three-tone isometric cube covered in bold black tiger stripes.',
    types: ['material'],
    icons: ['sop_material'],
    refKey: 'SOP_material',
    render: (uid) => <TigerCube uid={uid} x={12} y={3.1} w={7.6} h={8.6} strokeWidth={1.15} />,
  },
  {
    id: 'sop.matnet',
    label: 'Material Network',
    family: 'sop',
    description:
      'Cluster of seven small material cubes (yellow, glass, stone, red, metal, blue) with an amber tiger-striped cube at front-center.',
    types: ['matnet'],
    icons: ['networks_mat'],
    refKey: 'NETWORKS_mat',
    render: (uid) => {
      const w = 3.5;
      const h = 3.6;
      return (
        <>
          {/* Back-top yellow cube */}
          <IsoCube x={12} y={2.4} w={w} h={h} tones={TONES.yellow} strokeWidth={0.9} />
          {/* Back-left translucent glass cube */}
          <IsoCube x={6.4} y={5.3} w={w} h={h} tones={TONES.lightBlue} strokeWidth={0.9} fillOpacity={0.82} />
          {/* Back-right grey stone cube */}
          <IsoCube x={17.6} y={5.3} w={w} h={h} tones={TONES.grey} strokeWidth={0.9}>
            <circle cx="17.5" cy="7.1" r="0.45" fill="#5a616b" />
            <circle cx="15.8" cy="10.2" r="0.45" fill="#5a616b" />
            <circle cx="19.3" cy="9.9" r="0.45" fill="#5a616b" />
          </IsoCube>
          {/* Front-left red dotted cube */}
          <IsoCube x={6.6} y={11.8} w={w} h={h} tones={TONES.red} strokeWidth={0.9}>
            <circle cx="5.2" cy="16.2" r="0.45" fill="#ffe47a" />
            <circle cx="7.9" cy="16.4" r="0.45" fill="#ffe47a" />
          </IsoCube>
          {/* Front-right metallic grey cube */}
          <IsoCube x={17.4} y={11.8} w={w} h={h} tones={TONES.grey} strokeWidth={0.9}>
            <line x1="15.1" y1="16.5" x2="16.8" y2="15.6" stroke="#5a616b" strokeWidth="0.65" />
            <line x1="18.1" y1="16.4" x2="19.9" y2="15.5" stroke="#5a616b" strokeWidth="0.65" />
          </IsoCube>
          {/* Front-bottom blue cube */}
          <IsoCube x={12} y={14.5} w={w} h={h} tones={TONES.blue} strokeWidth={0.9} />
          {/* Front-center shared amber tiger-striped cube */}
          <TigerCube uid={uid} x={12} y={7.7} w={3.8} h={3.9} strokeWidth={0.95} />
        </>
      );
    },
  },
  {
    id: 'sop.rishader',
    label: 'RMan Shader',
    family: 'sop',
    description:
      'Light-grey three-tone isometric cube with dark organic ink blotches spread across the top, left and right faces.',
    types: ['rishader'],
    icons: ['sop_rishader'],
    refKey: 'SOP_rishader',
    render: (uid) => {
      const f = isoBoxFaces(12, 3.2, 7.5, 8.4);
      const outer: Pt[] = [f.top[0], f.top[1], f.right[2], f.right[3], f.left[3], f.left[0]];
      const clipId = `${uid}-ri-clip`;
      return (
        <>
          <defs>
            <clipPath id={clipId}>
              <polygon points={pts(outer)} />
            </clipPath>
          </defs>
          <IsoCube x={12} y={3.2} w={7.5} h={8.4} tones={TONES.grey} strokeWidth={1.15}>
            <g clipPath={`url(#${clipId})`} fill={OUTLINE}>
              {/* Top face blotches */}
              <path d="M9.0,5.8 C10.4,4.8 13.0,5.0 14.0,6.1 C12.6,6.9 10.2,7.1 9.0,5.8 Z" />
              <path d="M13.6,7.6 C14.8,6.9 16.8,7.3 17.5,8.2 C16.0,8.9 14.4,8.6 13.6,7.6 Z" />
              {/* Left face blotches */}
              <path d="M4.6,10.2 C6.2,9.8 7.5,11.2 6.8,12.8 C5.8,13.6 4.4,12.4 4.6,10.2 Z" />
              <path d="M7.2,13.6 C8.8,12.2 11.2,13.0 12.1,14.8 L12.1,18.2 C10.4,17.4 8.6,16.8 7.2,15.6 Z" />
              {/* Right face blotches */}
              <path d="M12.1,13.4 C13.6,12.2 15.8,10.4 17.9,10.8 C19.2,11.6 18.8,14.8 17.2,16.2 C15.4,17.2 13.6,16.4 12.1,18.0 Z" />
              <path d="M17.8,7.8 C19.0,7.6 19.6,9.2 19.2,10.2 C18.2,10.0 17.4,8.8 17.8,7.8 Z" />
            </g>
          </IsoCube>
        </>
      );
    },
  },
  {
    id: 'sop.toonshaderattribs',
    label: 'Toon Shader Attributes',
    family: 'sop',
    description: 'Cel-shaded yellow tilted saucer with flat highlight and shadow bands.',
    types: ['toonshaderattribs'],
    icons: ['sop_toonshaderattribs'],
    refKey: 'SOP_toonshaderattribs',
    render: (uid) => {
      const clipId = `${uid}-toon-clip`;
      return (
        <>
          <defs>
            <clipPath id={clipId}>
              <ellipse cx="12" cy="12.2" rx="9.2" ry="5.8" />
            </clipPath>
          </defs>
          <ellipse cx="12" cy="12.2" rx="9.2" ry="5.8" fill="#f2c438" />
          <g clipPath={`url(#${clipId})`}>
            {/* Lower shadow cel band */}
            <path d="M2.5,13.4 C6.2,16.2 17.8,16.2 21.5,13.2 L22,19 L2,19 Z" fill="#d49a18" />
            {/* Upper-left bright highlight band */}
            <ellipse cx="10.2" cy="9.4" rx="5.2" ry="2.2" fill="#ffe47a" />
            {/* Top dimple */}
            <ellipse cx="12" cy="10.2" rx="3.4" ry="1.4" fill="#d49a18" />
            <ellipse cx="12.2" cy="9.8" rx="2.7" ry="1.0" fill="#ffe47a" />
            {/* Crisp white specular dot */}
            <ellipse cx="7.4" cy="10.6" rx="1.2" ry="0.6" fill="#ffffff" />
          </g>
          <ellipse cx="12" cy="12.2" rx="9.2" ry="5.8" fill="none" stroke={OUTLINE} strokeWidth="1.15" />
        </>
      );
    },
  },
  {
    id: 'sop.texturefeature',
    label: 'Texture Feature',
    family: 'sop',
    description:
      'Cluster of three light-blue geometric blocks (a tilted back-left block, an upright back-right prism and a front sloped ramp) with bright green feature dots on every visible corner.',
    types: ['texturefeature'],
    icons: ['sop_texturefeature'],
    refKey: 'SOP_texturefeature',
    render: () => {
      const greenDots: readonly Pt[] = [
        // Back-left tilted block corners
        [8.4, 3.0],
        [11.6, 5.2],
        [3.4, 6.2],
        [7.0, 8.6],
        [3.4, 9.2],
        // Back-right upright prism corners
        [15.8, 2.8],
        [19.4, 4.4],
        [12.2, 4.4],
        [15.8, 6.2],
        [19.4, 12.2],
        [15.8, 13.8],
        // Front sloped ramp corners (shifted forward/down and slightly right)
        [5.6, 11.2],
        [9.6, 9.6],
        [19.0, 18.6],
        [14.4, 20.8],
        [5.6, 15.8],
      ];
      return (
        <>
          {/* Back-right upright prism */}
          <polygon
            points="12.2,4.4 15.8,2.8 19.4,4.4 15.8,6.2"
            fill="#eef2f7"
            stroke={OUTLINE}
            strokeWidth="0.95"
            strokeLinejoin="round"
          />
          <polygon
            points="12.2,4.4 15.8,6.2 15.8,13.8 12.2,12.0"
            fill="#8fc2ff"
            stroke={OUTLINE}
            strokeWidth="0.95"
            strokeLinejoin="round"
          />
          <polygon
            points="15.8,6.2 19.4,4.4 19.4,12.2 15.8,13.8"
            fill="#3672c4"
            stroke={OUTLINE}
            strokeWidth="0.95"
            strokeLinejoin="round"
          />

          {/* Back-left tilted rectangular block */}
          <polygon
            points="8.4,3.0 11.6,5.2 7.0,8.6 3.4,6.2"
            fill="#eef2f7"
            stroke={OUTLINE}
            strokeWidth="0.95"
            strokeLinejoin="round"
          />
          <polygon
            points="3.4,6.2 7.0,8.6 7.0,11.6 3.4,9.2"
            fill="#8fc2ff"
            stroke={OUTLINE}
            strokeWidth="0.95"
            strokeLinejoin="round"
          />
          <polygon
            points="7.0,8.6 11.6,5.2 11.6,8.2 7.0,11.6"
            fill="#5aa2f2"
            stroke={OUTLINE}
            strokeWidth="0.95"
            strokeLinejoin="round"
          />

          {/* Front sloped ramp wedge */}
          <polygon
            points="5.6,11.2 9.6,9.6 19.0,18.6 14.4,20.8"
            fill="#eef2f7"
            stroke={OUTLINE}
            strokeWidth="1.05"
            strokeLinejoin="round"
          />
          <polygon
            points="5.6,11.2 14.4,20.8 5.6,15.8"
            fill="#8fc2ff"
            stroke={OUTLINE}
            strokeWidth="1.05"
            strokeLinejoin="round"
          />

          {/* Bright green feature dots on every visible corner */}
          {greenDots.map(([cx, cy], idx) => (
            <circle key={idx} cx={cx} cy={cy} r="0.85" fill="#58c848" stroke={OUTLINE} strokeWidth="0.6" />
          ))}
        </>
      );
    },
  },
  {
    id: 'sop.texturemaskpaint',
    label: 'Texture Mask Paint',
    family: 'sop',
    description:
      'Golden-yellow theatrical mask with a red and blue painted eye band and a blue paintbrush on the right.',
    types: ['texturemaskpaint'],
    icons: ['sop_texturemaskpaint'],
    refKey: 'SOP_texturemaskpaint',
    render: (uid) => {
      const clipId = `${uid}-mask-clip`;
      return (
        <>
          <defs>
            <clipPath id={clipId}>
              <path d="M5.2,5.4 C7.4,3.1 12.2,3.1 14.4,5.6 C15.8,7.3 15.6,12.8 13.6,16.8 C12.1,19.8 8.4,20.4 6.5,17.8 C4.6,15.2 3.8,9.2 5.2,5.4 Z" />
            </clipPath>
          </defs>
          {/* Yellow mask base */}
          <path
            d="M5.2,5.4 C7.4,3.1 12.2,3.1 14.4,5.6 C15.8,7.3 15.6,12.8 13.6,16.8 C12.1,19.8 8.4,20.4 6.5,17.8 C4.6,15.2 3.8,9.2 5.2,5.4 Z"
            fill="#f2c438"
          />
          <g clipPath={`url(#${clipId})`}>
            {/* Upper-left highlight & lower-right shadow */}
            <ellipse cx="8.2" cy="6.2" rx="4.2" ry="2.2" fill="#ffe47a" />
            <path d="M12.5,6 C15.2,9 14.8,16 11,19.5 L16.5,20 L16.5,5 Z" fill="#d49a18" />
            {/* Red and blue domino eye-mask band */}
            <path
              d="M3.5,8.2 C6.2,7.2 8.2,8.4 9.5,9.2 C11.1,8.3 13.2,7.4 15.8,8.4 L15.5,12.8 C13.2,13.6 11.1,12.6 9.5,11.7 C7.8,12.6 5.9,13.6 3.8,12.5 Z"
              fill="#e03228"
            />
            <path
              d="M4.2,9.2 C6.4,8.6 8.2,9.4 9.5,10.1 C11,9.3 12.8,8.6 15.2,9.3 L15.0,11.6 C12.8,12.2 11,11.5 9.5,10.8 C8,11.5 6.2,12.2 4.2,11.5 Z"
              fill="#3672c4"
            />
          </g>
          {/* Mask outline */}
          <path
            d="M5.2,5.4 C7.4,3.1 12.2,3.1 14.4,5.6 C15.8,7.3 15.6,12.8 13.6,16.8 C12.1,19.8 8.4,20.4 6.5,17.8 C4.6,15.2 3.8,9.2 5.2,5.4 Z"
            fill="none"
            stroke={OUTLINE}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          {/* Eye cutouts & simple mouth */}
          <ellipse cx="7.1" cy="10.4" rx="1.4" ry="0.85" fill={OUTLINE} />
          <ellipse cx="11.9" cy="10.4" rx="1.4" ry="0.85" fill={OUTLINE} />
          <path
            d="M8.3,16.1 Q9.5,16.8 10.8,16.1"
            fill="none"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinecap="round"
          />

          {/* Diagonal blue paintbrush on the right */}
          <polygon
            points="19.6,3.4 21.1,4.4 16.5,12.8 15.0,11.8"
            fill="#3672c4"
            stroke={OUTLINE}
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <polygon
            points="15.0,11.8 16.5,12.8 15.5,14.5 14.0,13.5"
            fill="#c0c7d1"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          <path
            d="M14.0,13.5 L15.5,14.5 C14.9,15.8 13.5,16.3 12.4,16.4 C12.8,15.1 13.3,14.1 14.0,13.5 Z"
            fill="#ffe47a"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
        </>
      );
    },
  },
  {
    id: 'sop.textureopticalflow',
    label: 'Texture Optical Flow',
    family: 'sop',
    description:
      'Rounded pale grey screen frame with a shadowed lower band, five curved red motion streaks, and a compact dark silhouette of a galloping horse and rider centered inside.',
    types: ['textureopticalflow', 'volumeopticalflow'],
    icons: ['sop_textureopticalflow', 'sop_volumeopticalflow'],
    refKey: 'SOP_textureopticalflow',
    render: (uid) => {
      const clipId = `${uid}-flow-clip`;
      const frame = roundedRectPath(2.4, 4.6, 19.2, 14.8, 3.2);
      return (
        <>
          <defs>
            <clipPath id={clipId}>
              <path d={frame} />
            </clipPath>
          </defs>
          <path d={frame} fill="#eef2f7" />
          <g clipPath={`url(#${clipId})`}>
            {/* Subtle vertical film-frame shading */}
            <rect x="2.4" y="15.6" width="19.2" height="3.8" fill="#c0c7d1" />
            {/* Red optical-flow curved streaks */}
            <g fill="none" stroke="#e03228" strokeWidth="0.95" strokeLinecap="round">
              <path d="M4.0,9.5 Q7.5,8.2 10.4,10.2" />
              <path d="M3.6,12.2 Q7.0,11.8 9.2,12.8" />
              <path d="M4.2,15.2 Q7.8,14.8 10.6,13.6" />
              <path d="M14.5,8.2 Q17.2,8.4 19.8,7.4" />
              <path d="M15.4,14.6 Q17.8,15.2 19.6,16.4" />
            </g>
            {/* Bold dark silhouette of galloping horse and generic rider */}
            <path
              d="M11.7,7.0 C12.3,7.0 12.6,7.5 12.6,8.1 C12.6,8.7 12.2,9.2 11.8,9.3 L12.4,11.0 L14.8,10.4 L15.9,8.7 L17.3,9.5 L16.9,10.5 L16.0,10.3 L15.2,11.9 L17.2,13.1 L16.7,13.9 L14.6,13.0 L14.0,13.3 L15.6,14.8 L15.2,15.5 L12.9,13.7 L10.7,13.8 L8.9,16.3 L8.2,15.7 L9.8,13.0 L7.9,14.0 L7.6,13.1 L9.8,11.6 L11.2,11.2 L10.9,9.1 C10.9,8.0 11.2,7.0 11.7,7.0 Z"
              fill={OUTLINE}
            />
          </g>
          <path d={frame} fill="none" stroke={OUTLINE} strokeWidth="1.15" />
        </>
      );
    },
  },
  {
    id: 'sop.scatterintexturemask',
    label: 'Scatter in Texture Mask',
    family: 'sop',
    description:
      'Tilted two-by-two black-and-white checkerboard mask with red cones, blue spheres and a yellow cube scattered only on the white squares.',
    types: ['scatterintexturemask'],
    icons: ['sop_scatterintexturemask'],
    refKey: 'SOP_scatterintexturemask',
    render: (uid) => {
      // Perspective trapezoid for the 2x2 checkerboard
      const board: readonly [Pt, Pt, Pt, Pt] = [
        [4.2, 4.6],
        [19.8, 4.6],
        [21.8, 20.2],
        [2.2, 20.2],
      ];
      const cell = (u0: number, v0: number, u1: number, v1: number): string =>
        pts([quadPt(board, u0, v0), quadPt(board, u1, v0), quadPt(board, u1, v1), quadPt(board, u0, v1)]);

      return (
        <>
          {/* 2x2 checkerboard: white top-left & bottom-right, black top-right & bottom-left */}
          <polygon
            points={cell(0, 0, 0.5, 0.5)}
            fill="#f2f4f7"
            stroke={OUTLINE}
            strokeWidth="0.95"
            strokeLinejoin="round"
          />
          <polygon
            points={cell(0.5, 0, 1, 0.5)}
            fill={OUTLINE}
            stroke={OUTLINE}
            strokeWidth="0.95"
            strokeLinejoin="round"
          />
          <polygon
            points={cell(0, 0.5, 0.5, 1)}
            fill={OUTLINE}
            stroke={OUTLINE}
            strokeWidth="0.95"
            strokeLinejoin="round"
          />
          <polygon
            points={cell(0.5, 0.5, 1, 1)}
            fill="#f2f4f7"
            stroke={OUTLINE}
            strokeWidth="0.95"
            strokeLinejoin="round"
          />

          {/* Primitives on top-left white square */}
          <polygon
            points="8.8,3.6 6.8,7.8 10.8,7.8"
            fill="#e03228"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          <ShadedSphere id={`${uid}-sp1`} cx={7.2} cy={9.6} r={2.05} tones={SPHERE_TONES.blue} strokeWidth={0.85} />

          {/* Primitives on bottom-right white square (front blue sphere in front of yellow cube) */}
          <IsoCube x={17.6} y={11.8} w={2.3} h={2.3} tones={TONES.yellow} strokeWidth={0.85} />
          <polygon
            points="14.2,14.2 12.1,18.8 16.3,18.8"
            fill="#e03228"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          <ShadedSphere id={`${uid}-sp2`} cx={18.2} cy={16.7} r={2.2} tones={SPHERE_TONES.blue} strokeWidth={0.85} />
        </>
      );
    },
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
    id: 'sop.roommapframe',
    label: 'Room Map Frame',
    family: 'sop',
    description:
      'Orange square with a hand-drawn white Houdini spiral and bottom-left corner arc (vendor logo, redrawn), overlapped at lower-right by an isometric pink and blue hollow 3D infinity ribbon.',
    types: ['roommapframe'],
    icons: ['sop_roommapframe'],
    refKey: 'SOP_roommapframe',
    render: (uid) => {
      // Isometric grid for the lower-right MaterialX-style 3D infinity ribbon
      const gx = (i: number) => r2(8.6 + i * 2.16);
      const gy = (j: number) => r2(13.2 + j * 1.4);
      const g = (i: number, j: number): Pt => [gx(i), gy(j)];

      return (
        <>
          <defs>
            <clipPath id={`${uid}-sq`}>
              <rect x="2.2" y="2.2" width="14.4" height="14.4" rx="0.3" />
            </clipPath>
          </defs>
          {/* Orange square Houdini emblem at upper-left */}
          <path
            d={roundedRectPath(2.0, 2.0, 14.8, 14.8, 0.4)}
            fill="#ee8624"
            stroke={OUTLINE}
            strokeWidth="1.05"
            strokeLinejoin="round"
          />
          {/* Hand-drawn white Houdini spiral (one fewer winding for 21px clarity) + bottom-left corner arc */}
          <g clipPath={`url(#${uid}-sq)`}>
            <path
              d="M1.4,6.4 C4.4,4.0 9.6,3.8 12.6,6.8 C15.2,9.4 14.8,14.2 11.4,17.2"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M1.6,11.2 C3.4,7.6 7.8,6.8 10.4,9.2 C12.2,10.8 11.8,14.0 9.4,15.2 C7.2,16.2 4.8,14.6 5.2,12.2 C5.5,10.4 7.4,9.8 8.4,11.0"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.1"
              strokeLinecap="round"
            />
            <polygon points="2.0,13.8 5.0,16.8 2.0,16.8" fill="#ffffff" />
          </g>
          {/* Clean dark outline around orange square */}
          <path
            d={roundedRectPath(2.0, 2.0, 14.8, 14.8, 0.4)}
            fill="none"
            stroke={OUTLINE}
            strokeWidth="1.05"
            strokeLinejoin="round"
          />
          {/* Lower-right isometric 3D infinity-ribbon prism */}
          {/* Left pink vertical bar */}
          <polygon
            points={pts([g(1, 6), g(1, 0), g(0, 1), g(0, 5)])}
            fill="#e87a9c"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          {/* Top-left rose-pink diagonal bar */}
          <polygon
            points={pts([g(1, 0), g(3, 2), g(2, 3), g(1, 2)])}
            fill="#c4436c"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          {/* Bottom-right dark blue return bar */}
          <polygon
            points={pts([g(3, 4), g(4, 3), g(5, 4), g(5, 6)])}
            fill="#2e5a9a"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          {/* Right blue vertical bar */}
          <polygon
            points={pts([g(5, 0), g(6, 1), g(6, 5), g(5, 6)])}
            fill="#3672c4"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          {/* Long front diagonal light-blue ribbon from bottom-left to top-right */}
          <polygon
            points={pts([g(1, 4), g(5, 0), g(5, 2), g(1, 6)])}
            fill="#5aa2f2"
            stroke={OUTLINE}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
        </>
      );
    },
  },
  {
    id: 'sop.sprite',
    label: 'Sprite',
    family: 'sop',
    description:
      'Cluster of three yellow five-pointed stars at lower-left, with sweeping yellow-orange comet tails arcing up-right from the upper two stars.',
    types: ['sprite'],
    icons: ['sop_sprite'],
    refKey: 'SOP_sprite',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-tail`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffe47a" />
            <stop offset="60%" stopColor="#f2c438" />
            <stop offset="100%" stopColor="#ffb066" />
          </linearGradient>
        </defs>
        {/* Sweeping comet tails on upper two stars only */}
        <path
          d="M6.0,10.0 C9.6,5.0 15.2,2.8 21.5,2.8 C16.8,5.4 12.4,8.2 8.8,12.0 Z"
          fill={`url(#${uid}-tail)`}
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M11.8,14.6 C14.6,10.2 18.2,7.6 21.6,7.0 C18.8,10.2 16.2,13.0 13.8,16.6 Z"
          fill={`url(#${uid}-tail)`}
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Three large, bold 5-pointed yellow stars */}
        <polygon
          points={pts(star5(6.4, 10.2, 4.0, 1.75, -18))}
          fill="#ffe47a"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polygon
          points={pts(star5(13.0, 15.4, 3.8, 1.65, -12))}
          fill="#ffe47a"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polygon
          points={pts(star5(7.4, 18.0, 3.3, 1.45, -22))}
          fill="#f2c438"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
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
];
