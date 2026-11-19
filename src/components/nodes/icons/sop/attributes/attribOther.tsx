import React from 'react';
import {
  arrowHead,
  ellipsePath,
  isoBoxFaces,
  type Pt,
  pts,
  quadGridPath,
  quadPt,
  roundedRectPath,
} from '../../geoHelpers';
import { CasedStroke, SPHERE_TONES } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { TagPanel } from '../kits/attribTag';
import { GroupRing } from '../kits/groupRing';

/**
 * Attribute operators without a shared family look. Most members are single distinct objects;
 * Attribute Expression and Group Expression share the `RedCowboyHat` kit (matching the live
 * Attribute Wrangle style), and Group Expression reuses `GroupRing` from `kits/groupRing`.
 */

const OUTLINE = '#262626';

const PAPER = '#f2f4f7';

const WHITE = '#ffffff';

/** Shared red cowboy hat kit for Attribute Expression and Group Expression. */
const RedCowboyHat: React.FC<{ transform?: string }> = ({ transform }) => (
  <g transform={transform}>
    {/* Hat Brim */}
    <path
      d="M1.8 12.2C2.2 9.4 7.5 8.4 12.5 8.6C17 8.8 20.6 9.8 20.3 11.8C19.9 14.4 13.5 16.4 8.2 16.1C4.5 15.9 1.6 14.3 1.8 12.2Z"
      fill="#d42b22"
      stroke={OUTLINE}
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    {/* Hat Crown */}
    <path
      d="M6.2 11.2C5.6 6.6 7.8 2.8 10.8 3.1C11.8 3.2 12.4 3.9 13.1 3.5C15.5 2.6 17.1 6 16.6 10.6C14 12.3 9 12.6 6.2 11.2Z"
      fill="#ff5c52"
      stroke={OUTLINE}
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    {/* Hat Band with white stitch dashes */}
    <path
      d="M6.3 10C9.2 11.3 13.6 11.1 16.7 9.4"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M6.6 10.1C9.3 11.2 13.4 11 16.4 9.5"
      fill="none"
      stroke={WHITE}
      strokeWidth="0.95"
      strokeDasharray="1.1 1.1"
      strokeLinecap="round"
    />
    {/* White Sheriff Star */}
    <polygon
      points="11,4.0 11.9,5.8 13.8,6.1 12.4,7.4 12.8,9.3 11,8.3 9.2,9.3 9.6,7.4 8.2,6.1 10.1,5.8"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
  </g>
);

const MAP_QUAD: readonly [Pt, Pt, Pt, Pt] = [
  [12, 3.6],
  [21.4, 12],
  [12, 20.4],
  [2.6, 12],
];

const REMAP_TILE: readonly [Pt, Pt, Pt, Pt] = [
  [12, 13.2],
  [20.6, 16.9],
  [12, 20.6],
  [3.4, 16.9],
];

const REST_BOX = isoBoxFaces(12, 3.0, 8.6, 9.4);

const REST_BACK_BOTTOM: Pt = [12, 12.4];

/**
 * Attribute operators without a shared kit, each drawn as its own object.
 */
export const ATTRIB_OTHER_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.attribcast',
    label: 'Attribute Cast',
    family: 'sop',
    description:
      'Two blue 3/4 perspective cubes side by side in a row, with the translucent right cube sharing its left corners with the right corners of the opaque left cube.',
    types: ['attribcast'],
    icons: ['sop_attribcast'],
    refKey: 'SOP_attribcast',
    render: () => (
      <>
        {/* Left opaque blue cube */}
        <g fillOpacity="0.86" stroke={OUTLINE} strokeWidth="1.05" strokeLinejoin="round">
          <polygon points="2.2,5.6 6.0,3.4 13.6,4.9 9.8,7.1" fill="#8fc2ff" />
          <polygon points="2.2,5.6 9.8,7.1 9.8,16.3 2.2,14.8" fill="#5aa2f2" />
          <polygon points="9.8,7.1 13.6,4.9 13.6,14.1 9.8,16.3" fill="#3672c4" />
        </g>
        {/* Right translucent blue cube aligned face-to-face (+7.6, +1.5) */}
        <g fillOpacity="0.34" stroke={OUTLINE} strokeOpacity="0.6" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="9.8,7.1 13.6,4.9 21.2,6.4 17.4,8.6" fill="#8fc2ff" />
          <polygon points="9.8,7.1 17.4,8.6 17.4,17.8 9.8,16.3" fill="#5aa2f2" />
          <polygon points="17.4,8.6 21.2,6.4 21.2,15.6 17.4,17.8" fill="#3672c4" />
        </g>
        {/* Faint back-bottom edge visible inside the translucent cube */}
        <path d="M13.6 14.1 L21.2 15.6" fill="none" stroke={OUTLINE} strokeOpacity="0.4" strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'sop.attribcombine',
    label: 'Attribute Combine',
    family: 'sop',
    description:
      'Tilted silver quad with a continuous upper-left grey gradient, four shaded corner spheres, a wide low white speech-bubble panel with four corner tails, and a small dark plus sign.',
    types: ['attribcombine'],
    icons: ['sop_attribcombine'],
    refKey: 'SOP_attribcombine',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-bg`} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
          <radialGradient id={`${uid}-sph`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor={SPHERE_TONES.grey[0]} />
            <stop offset="55%" stopColor={SPHERE_TONES.grey[1]} />
            <stop offset="100%" stopColor={SPHERE_TONES.grey[2]} />
          </radialGradient>
        </defs>
        {/* Tilted silver quad with consistent grey gradient across all 4 parts */}
        <polygon
          points="6.2,3.6 18.4,5.0 20.2,19.8 4.0,18.0"
          fill={`url(#${uid}-bg)`}
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Wide, low rectangular white panel with 4 narrow corner speech tails */}
        <path
          d="M7.2 9.0 L6.6 5.2 L8.8 8.4 H15.4 L17.6 5.8 L17.0 9.0 V13.8 L19.2 18.4 L15.4 14.4 H8.8 L5.0 17.0 L7.2 13.8 Z"
          fill={PAPER}
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Small bold dark plus sign */}
        <path d="M12.1 10.1 V12.7 M10.8 11.4 H13.4" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="square" />
        {/* Four corner shaded spheres */}
        {(
          [
            [6.2, 3.6],
            [18.4, 5.0],
            [20.2, 19.8],
            [4.0, 18.0],
          ] as const
        ).map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="1.85"
            fill={`url(#${uid}-sph)`}
            stroke={OUTLINE}
            strokeWidth="0.9"
          />
        ))}
      </>
    ),
  },
  {
    id: 'sop.attribfade',
    label: 'Attribute Fade',
    family: 'sop',
    description: 'Glossy red siren beacon dome on a white and grey cylindrical base, lit from the upper left.',
    types: ['attribfade'],
    icons: ['sop_attribfade'],
    refKey: 'SOP_attribfade',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-dome`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ff9a90" />
            <stop offset="45%" stopColor="#e03228" />
            <stop offset="100%" stopColor="#a81f18" />
          </radialGradient>
        </defs>
        {/* Cylindrical base */}
        <path
          d="M5.4 15.5 V18.5 A6.6 2.8 0 0,0 18.6 18.5 V15.5 Z"
          fill="#c0c7d1"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path d={ellipsePath(12, 15.5, 6.6, 2.7)} fill={PAPER} stroke={OUTLINE} strokeWidth="1.05" />
        {/* Dark collar */}
        <path d={ellipsePath(12, 14.6, 5.2, 1.9)} fill="#89929e" stroke={OUTLINE} strokeWidth="0.9" />
        {/* Red beacon dome */}
        <path
          d="M7.2 14.2 V7.6 C7.2 4.3 9.4 2.8 12 2.8 C14.6 2.8 16.8 4.3 16.8 7.6 V14.2 A4.8 1.8 0 0,1 7.2 14.2 Z"
          fill={`url(#${uid}-dome)`}
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Specular highlight streak on dome */}
        <path
          d="M9.1 12.8 V7.6 C9.1 5.8 9.9 4.7 11 4.4"
          fill="none"
          stroke="#ffd2cc"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.attribfill',
    label: 'Attribute Fill',
    family: 'sop',
    description: 'Isometric slice of toasted bread spread with red jam and a silver butter knife.',
    types: ['attribfill'],
    icons: ['sop_attribfill'],
    refKey: 'SOP_attribfill',
    render: () => (
      <>
        {/* Bread crust side */}
        <path
          d="M2.6 11.4 L2.6 14.2 L12.2 19.6 L21.2 14.4 L21.2 11.6 Z"
          fill="#c89a5a"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Bread top face */}
        <path
          d="M2.6 11.4 L11.4 6.4 Q12.8 5.6 14.4 6.5 L20.6 10.1 Q21.6 10.9 20.5 11.7 L12.2 16.6 Z"
          fill="#f2d6a2"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Red jam spread */}
        <path
          d="M5.8 11.2 C6.2 9.4 9.5 7.8 12.6 8.3 C15.2 8.7 17.6 10.2 16.8 11.9 C16 13.5 12.2 14.6 9.6 13.6 C7.4 12.8 5.5 12.5 5.8 11.2 Z"
          fill="#e03228"
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M8.4 10.8 C9.8 9.7 12.2 9.8 13.8 10.7"
          fill="none"
          stroke="#ff7066"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Silver butter knife */}
        <path
          d="M11.6 5.2 C10.6 6.4 11.8 9.2 15.2 12.4 L16.7 11 C15.4 8.2 13.2 5.4 11.6 5.2 Z"
          fill="#eef2f7"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M15.4 12.2 L19.8 16.6 C20.6 17.4 21.4 16.6 20.6 15.6 L16.5 11.2 Z"
          fill="#89929e"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.attribinterpolate',
    label: 'Attribute Interpolate',
    family: 'sop',
    description:
      'Orange-yellow quad tile with four white corner dots and four red arrows pointing inward to a center dot.',
    types: ['attribinterpolate'],
    icons: ['sop_attribinterpolate'],
    refKey: 'SOP_attribinterpolate',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-tile`} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#ffe47a" />
            <stop offset="55%" stopColor="#f2c438" />
            <stop offset="100%" stopColor="#ee8624" />
          </radialGradient>
        </defs>
        {/* Warped orange-yellow quad tile */}
        <path
          d="M4.2 4.2 Q12 5.4 19.8 4.2 Q18.6 12 19.8 19.8 Q12 18.6 4.2 19.8 Q5.4 12 4.2 4.2 Z"
          fill={`url(#${uid}-tile)`}
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Four inward red arrows */}
        {(
          [
            [
              [6.4, 6.4],
              [10.4, 10.4],
            ],
            [
              [17.6, 6.4],
              [13.6, 10.4],
            ],
            [
              [17.6, 17.6],
              [13.6, 13.6],
            ],
            [
              [6.4, 17.6],
              [10.4, 13.6],
            ],
          ] as const
        ).map(([from, tip]) => (
          <g key={`${from[0]}-${from[1]}`}>
            <line
              x1={from[0]}
              y1={from[1]}
              x2={tip[0]}
              y2={tip[1]}
              stroke="#e03228"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <polygon
              points={pts(arrowHead(tip, from, 2.8, 1.8))}
              fill="#e03228"
              stroke={OUTLINE}
              strokeWidth="0.65"
              strokeLinejoin="round"
            />
          </g>
        ))}
        {/* Four corner dots and center dot */}
        {(
          [
            [4.2, 4.2],
            [19.8, 4.2],
            [19.8, 19.8],
            [4.2, 19.8],
            [12, 12],
          ] as const
        ).map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.65" fill={PAPER} stroke={OUTLINE} strokeWidth="0.85" />
        ))}
      </>
    ),
  },
  {
    id: 'sop.attribpaint',
    label: 'Attribute Paint',
    family: 'sop',
    description: 'Tilted white canvas sheet with a blue paint stroke and an angled wooden-handled paintbrush.',
    types: ['attribpaint'],
    icons: ['sop_attribpaint'],
    refKey: 'SOP_attribpaint',
    render: () => (
      <>
        {/* Tilted white sheet */}
        <polygon
          points="2.8,10.2 13.4,5.6 21.2,14.2 10.6,19.4"
          fill={PAPER}
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Blue paint stroke on sheet */}
        <path
          d="M6.4 13.4 C8.4 12.2 10.6 11.4 12.8 11.6 C14.2 11.8 14.4 13.2 12.6 14.2 C10.4 15.4 7.8 15.2 6.4 13.4 Z"
          fill="#3672c4"
          stroke="#5aa2f2"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        {/* Paintbrush bristles + ferrule + wooden handle */}
        <path
          d="M11.6 12.6 C12.4 11.2 13.6 10.2 14.8 10.4 L15.6 11.4 C14.8 12.6 13 13.2 11.6 12.6 Z"
          fill="#2e5a9a"
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="14.6,10.4 16.4,8.6 17.5,9.7 15.6,11.4"
          fill="#c0c7d1"
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M16.4 8.6 L20.6 4.4 C21.2 3.8 22 4.6 21.4 5.2 L17.5 9.7 Z"
          fill="#a8783c"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.attribfrommap',
    label: 'Attribute from Map',
    family: 'sop',
    description: 'Isometric rainbow-colored diamond grid with sample dots across its surface.',
    types: ['attribfrommap'],
    icons: ['sop_attribfrommap'],
    refKey: 'SOP_attribfrommap',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-map`} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#5aa2f2" />
            <stop offset="35%" stopColor="#58c848" />
            <stop offset="68%" stopColor="#f2c438" />
            <stop offset="100%" stopColor="#e03228" />
          </linearGradient>
        </defs>
        {/* Rainbow diamond */}
        <polygon
          points={pts(MAP_QUAD)}
          fill={`url(#${uid}-map)`}
          stroke={OUTLINE}
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        {/* Interior grid lines */}
        <path d={quadGridPath(MAP_QUAD, 4, 4)} fill="none" stroke={OUTLINE} strokeOpacity="0.45" strokeWidth="0.65" />
        {/* Sample dots on grid intersections */}
        {[1, 2, 3].flatMap((u) =>
          [1, 2, 3].map((v) => {
            const [cx, cy] = quadPt(MAP_QUAD, u / 4, v / 4);
            return (
              <circle key={`${u}-${v}`} cx={cx} cy={cy} r="0.85" fill={PAPER} stroke={OUTLINE} strokeWidth="0.6" />
            );
          }),
        )}
      </>
    ),
  },
  {
    id: 'sop.attribfrompieces',
    label: 'Attribute from Pieces',
    family: 'sop',
    description:
      'Three small white speech-bubble tags arranged in a triangle, holding a yellow sphere, green triangle and red cylinder, each pointing to a blue pin.',
    types: ['attribfrompieces'],
    icons: ['sop_attribfrompieces'],
    refKey: 'SOP_attribfrompieces',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-yel`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor={SPHERE_TONES.yellow[0]} />
            <stop offset="55%" stopColor={SPHERE_TONES.yellow[1]} />
            <stop offset="100%" stopColor={SPHERE_TONES.yellow[2]} />
          </radialGradient>
        </defs>
        {/* Top tag with yellow sphere */}
        <TagPanel x={8.5} y={2.2} w={7} h={6.2} tail={[11.2, 12.8]} tip={[12, 10.6]} strokeWidth={1.0} />
        <circle cx="12" cy="5.3" r="1.9" fill={`url(#${uid}-yel)`} stroke={OUTLINE} strokeWidth="0.7" />
        <circle cx="12" cy="11.6" r="1.25" fill="#3672c4" stroke={OUTLINE} strokeWidth="0.75" />

        {/* Bottom-left tag with green cone/triangle */}
        <TagPanel x={2.2} y={11.8} w={7} h={6.2} tail={[4.9, 6.5]} tip={[5.7, 20]} strokeWidth={1.0} />
        <polygon
          points="5.7,13 3.9,16.8 7.5,16.8"
          fill="#58c848"
          stroke={OUTLINE}
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <circle cx="5.7" cy="20.9" r="1.25" fill="#3672c4" stroke={OUTLINE} strokeWidth="0.75" />

        {/* Bottom-right tag with red cylinder */}
        <TagPanel x={14.8} y={11.8} w={7} h={6.2} tail={[17.5, 19.1]} tip={[18.3, 20]} strokeWidth={1.0} />
        <rect x="16.6" y="13.2" width="3.4" height="3.4" rx="0.8" fill="#e03228" stroke={OUTLINE} strokeWidth="0.7" />
        <circle cx="18.3" cy="20.9" r="1.25" fill="#3672c4" stroke={OUTLINE} strokeWidth="0.75" />
      </>
    ),
  },
  {
    id: 'sop.attribfromvolume',
    label: 'Attribute from Volume',
    family: 'sop',
    description:
      'Fluffy white cloud above a straight 45-degree red arrow pointing down-right and a white speech-bubble tag pointing toward well-spaced grey sample spheres.',
    types: ['attribfromvolume'],
    icons: ['sop_attribfromvolume'],
    refKey: 'SOP_attribfromvolume',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-dot`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor={SPHERE_TONES.grey[0]} />
            <stop offset="55%" stopColor={SPHERE_TONES.grey[1]} />
            <stop offset="100%" stopColor={SPHERE_TONES.grey[2]} />
          </radialGradient>
        </defs>
        {/* Straight 45-degree red arrow from upper-left to lower-right */}
        <line x1="5.0" y1="13.2" x2="8.8" y2="17.0" stroke={OUTLINE} strokeWidth="3.6" strokeLinecap="round" />
        <line x1="5.0" y1="13.2" x2="8.8" y2="17.0" stroke="#e03228" strokeWidth="2.1" strokeLinecap="round" />
        <polygon
          points={pts(arrowHead([10.4, 18.6], [5.0, 13.2], 3.8, 2.5))}
          fill="#e03228"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Fluffy white cloud */}
        <path
          d="M6.2 12.2 C4 12.2 2.8 10.6 3.2 8.6 C3.4 7.0 4.8 6.0 6.2 6.2 C6.8 4.0 9.2 2.8 11.4 3.6 C12.8 2.6 15.2 3.2 15.8 5.0 C17.6 5.2 18.8 6.8 18.4 8.8 C18.2 10.6 16.8 12.0 14.8 12.2 Z"
          fill={WHITE}
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* White attribute tag */}
        <TagPanel x={9.8} y={10.2} w={7.6} h={4.6} tail={[13.0, 14.6]} tip={[15.8, 17.4]} strokeWidth={1.0} />
        {/* Well-spaced grey sample dots */}
        {(
          [
            [13.4, 20.6],
            [17.4, 19.6],
            [20.6, 16.4],
            [20.0, 12.4],
            [16.0, 16.8],
          ] as const
        ).map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="1.25"
            fill={`url(#${uid}-dot)`}
            stroke={OUTLINE}
            strokeWidth="0.75"
          />
        ))}
      </>
    ),
  },
  {
    id: 'sop.attribtransferbyuv',
    label: 'Attribute Transfer by UV',
    family: 'sop',
    description:
      'Two generic blue mannequin heads with ears and simple facial features side by side, with a yellow-and-red hat on the left head and a cased red arc transferring to a red pin on the right head.',
    types: ['attribtransferbyuv'],
    icons: ['sop_attribtransferbyuv'],
    refKey: 'SOP_attribtransferbyuv',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-h1`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#5aa2f2" />
            <stop offset="60%" stopColor="#3672c4" />
            <stop offset="100%" stopColor="#20457a" />
          </radialGradient>
          <radialGradient id={`${uid}-h2`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="60%" stopColor="#8fc2ff" />
            <stop offset="100%" stopColor="#3672c4" />
          </radialGradient>
        </defs>
        {/* Left dark-blue mannequin head with ears */}
        <path
          d="M3.2 12.2 C2.2 12.2 2.2 14.6 3.3 14.8 C3.8 16.8 5.0 18.2 5.8 18.8 V20.8 H8.6 V18.8 C9.4 18.2 10.6 16.8 11.1 14.8 C12.2 14.6 12.2 12.2 11.2 12.2 C11.0 9.2 9.2 7.8 7.2 7.8 C5.2 7.8 3.4 9.2 3.2 12.2 Z"
          fill={`url(#${uid}-h1)`}
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Generic face marks on left head */}
        <path
          d="M5.2 12.2 H6.3 M8.1 12.2 H9.2 M7.2 12.4 V14.6 M6.2 16.2 H8.2"
          stroke={OUTLINE}
          strokeWidth="0.7"
          strokeLinecap="round"
        />

        {/* Right light-blue mannequin head with ears */}
        <path
          d="M12.8 12.2 C11.8 12.2 11.8 14.6 12.9 14.8 C13.4 16.8 14.6 18.2 15.4 18.8 V20.8 H18.2 V18.8 C19.0 18.2 20.2 16.8 20.7 14.8 C21.8 14.6 21.8 12.2 20.8 12.2 C20.6 9.2 18.8 7.8 16.8 7.8 C14.8 7.8 13.0 9.2 12.8 12.2 Z"
          fill={`url(#${uid}-h2)`}
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Generic face marks on right head */}
        <path
          d="M14.8 12.2 H15.9 M17.7 12.2 H18.8 M16.8 12.4 V14.6 M15.8 16.2 H17.8"
          stroke={OUTLINE}
          strokeWidth="0.7"
          strokeLinecap="round"
        />

        {/* Yellow hat with red crown on left head */}
        <ellipse cx="7.2" cy="8.0" rx="4.2" ry="1.4" fill="#f2c438" stroke={OUTLINE} strokeWidth="0.9" />
        <path
          d="M5 7.8 C5 5.4 6 4.6 7.2 4.6 C8.4 4.6 9.4 5.4 9.4 7.8 Z"
          fill="#e03228"
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Cased red transfer arc to red pin on right head */}
        <CasedStroke d="M7.6 5.0 Q12.2 2.0 16.8 6.0" color="#e03228" width={1.2} casing={2.2} />
        <line x1="16.8" y1="6.0" x2="16.8" y2="8.0" stroke={OUTLINE} strokeWidth="1.0" />
        <circle cx="16.8" cy="5.8" r="1.4" fill="#e03228" stroke={OUTLINE} strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'sop.attribremap',
    label: 'Attribute Remap',
    family: 'sop',
    description:
      'Wide white speech-bubble ramp graph with crossing blue and red S-curves pointing down at an orange isometric diamond tile.',
    types: ['attribremap'],
    icons: ['sop_attribremap'],
    refKey: 'SOP_attribremap',
    render: () => (
      <>
        {/* Orange isometric diamond tile */}
        <polygon points={pts(REMAP_TILE)} fill="#ee8624" stroke={OUTLINE} strokeWidth="1.05" strokeLinejoin="round" />
        {/* Corner dots on tile */}
        {REMAP_TILE.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.05" fill={PAPER} stroke={OUTLINE} strokeWidth="0.7" />
        ))}
        {/* Wide white graph tag */}
        <TagPanel x={3.2} y={2.4} w={17.6} h={9.6} tail={[10.4, 13.6]} tip={[12, 15.8]} strokeWidth={1.1} />
        {/* Subtle graph grid */}
        <path d="M5 7.2 H19 M12 3.6 V10.8" fill="none" stroke="#89929e" strokeWidth="0.7" />
        {/* Blue and red crossing S-curves */}
        <path
          d="M4.8 10.2 C8.5 10.2 9.5 4.2 13.5 4.2 C16.2 4.2 17.5 6.6 19.2 6.6"
          fill="none"
          stroke="#3672c4"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M4.8 5.0 C8.5 5.0 10.5 10.2 14.5 10.2 C16.8 10.2 17.8 8.0 19.2 8.0"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.attribexpression',
    label: 'Attribute Expression',
    family: 'sop',
    description: 'Red cowboy hat with a striped hat band and a white sheriff star on the crown.',
    types: ['attribexpression'],
    icons: ['sop_attribexpression'],
    refKey: 'SOP_attribexpression',
    render: () => <RedCowboyHat transform="translate(0.5 2.4) scale(1.06)" />,
  },
  {
    id: 'sop.groupexpression',
    label: 'Group Expression',
    family: 'sop',
    description:
      'Red cowboy hat with a white sheriff star in the upper-left, paired with a dashed orange group-selection ring in the bottom-right.',
    types: ['groupexpression'],
    icons: ['sop_groupexpression'],
    refKey: 'SOP_groupexpression',
    render: () => (
      <>
        <GroupRing d={ellipsePath(15.6, 15.6, 5.4, 5.4)} width={1.9} />
        <RedCowboyHat transform="translate(0.6 0.4) scale(0.84)" />
      </>
    ),
  },
  {
    id: 'sop.color',
    label: 'Color',
    family: 'sop',
    description: 'Paint tube tilted to the left: light body, blue label band, grey cap and dark crimped end.',
    types: ['color'],
    refKey: 'SOP_color',
    render: () => (
      <>
        <g transform="rotate(-35 12 12)">
          <rect x="9.5" y="3" width="5" height="2.8" rx="0.6" fill="#dcdcdc" stroke="#222" strokeWidth="1.1" />
          <polygon points="7.5,6 16.5,6 18,19 6,19" fill="#e8edf2" stroke="#222" strokeWidth="1.2" />
          <rect x="7.2" y="9" width="9.6" height="4.5" fill="#2c6ec9" />
          <line x1="5.5" y1="19" x2="18.5" y2="19" stroke="#222" strokeWidth="2.2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.normal',
    label: 'Normal',
    family: 'sop',
    description: 'Orange plane with a white normal arrow (dark casing) standing up from its center.',
    types: ['normal'],
    refKey: 'SOP_normal',
    render: () => (
      <>
        <polygon
          points="2,16 13,11.5 22,15 11,20.5"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <line x1="12" y1="16" x2="14.6" y2="7" stroke="#262626" strokeWidth="3.6" strokeLinecap="round" />
        <line x1="12" y1="16" x2="14.6" y2="7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <polygon
          points="15.6,2.6 16.8,7.1 12.2,5.8"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.rest',
    label: 'Rest Position',
    family: 'sop',
    description: 'Zebra-striped sphere centered inside a green isometric wireframe bounding box.',
    types: ['rest'],
    icons: ['sop_rest'],
    refKey: 'SOP_rest',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-rest-clip`}>
            <circle cx="12" cy="12" r="5.4" />
          </clipPath>
          <radialGradient id={`${uid}-rest-sph`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </radialGradient>
        </defs>
        {/* Back 3 edges of the bounding box */}
        <CasedStroke
          d={`M${pts([REST_BOX.top[0], REST_BACK_BOTTOM])} M${pts([REST_BOX.left[3], REST_BACK_BOTTOM, REST_BOX.right[2]])}`}
          color="#58c848"
          width={0.85}
          casing={1.65}
        />
        {/* Striped sphere */}
        <g clipPath={`url(#${uid}-rest-clip)`}>
          <circle cx="12" cy="12" r="5.4" fill={`url(#${uid}-rest-sph)`} />
          <g fill="none" stroke={OUTLINE} strokeWidth="1.6">
            <path d="M5.8,9.8 Q11.5,5.8 16.5,6.8" />
            <path d="M5.6,13.6 Q12.0,9.4 18.2,10.4" />
            <path d="M6.8,17.0 Q12.6,13.2 18.0,14.2" />
          </g>
        </g>
        <circle cx="12" cy="12" r="5.4" fill="none" stroke={OUTLINE} strokeWidth="1.05" />
        {/* Front 9 edges of the bounding box */}
        <CasedStroke
          d={
            `M${pts(REST_BOX.top)} Z ` +
            `M${pts([REST_BOX.left[0], REST_BOX.left[3], REST_BOX.left[2], REST_BOX.right[2], REST_BOX.right[1]])} ` +
            `M${pts([REST_BOX.left[1], REST_BOX.left[2]])}`
          }
          color="#58c848"
          width={0.85}
          casing={1.65}
        />
      </>
    ),
  },
  {
    id: 'sop.name',
    label: 'Name',
    family: 'sop',
    description: 'Tilted white name tag sticker with a blue header band reading NAME and a dotted line below.',
    types: ['name'],
    icons: ['sop_name'],
    refKey: 'SOP_name',
    render: (uid) => (
      <g transform="rotate(-9 12 12)">
        <defs>
          <clipPath id={`${uid}-name-clip`}>
            <path d={roundedRectPath(3.4, 5.4, 17.2, 13.2, 1.8)} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-name-clip)`}>
          <rect x="3.4" y="5.4" width="17.2" height="13.2" fill="#f2f4f7" />
          <rect x="3.4" y="5.4" width="17.2" height="6.2" fill="#3672c4" />
          <text
            x="12"
            y="9.9"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="4.2"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            NAME
          </text>
          <line
            x1="5.6"
            y1="15.4"
            x2="18.4"
            y2="15.4"
            stroke={OUTLINE}
            strokeWidth="1.3"
            strokeDasharray="1.3 1.4"
            strokeLinecap="round"
          />
        </g>
        <path d={roundedRectPath(3.4, 5.4, 17.2, 13.2, 1.8)} fill="none" stroke={OUTLINE} strokeWidth="1.1" />
      </g>
    ),
  },
  {
    id: 'sop.comb',
    label: 'Comb',
    family: 'sop',
    description: 'Tilted orange comb angled up-right with a curved spine highlight and evenly spaced teeth.',
    types: ['comb', 'guideprocess'],
    icons: ['sop_comb', 'sop_guideprocess'],
    refKey: 'SOP_comb',
    render: () => (
      <g transform="translate(0.2 3.0) rotate(-29 11.8 9.2)">
        <path
          d="M2.4,6.2 Q11.8,4.6 21.2,6.2 L21.2,8.6 L20.4,8.6 L20.4,12.8 L18.8,12.8 L18.8,8.6 L17.2,8.6 L17.2,12.8 L15.6,12.8 L15.6,8.6 L14.0,8.6 L14.0,12.8 L12.4,12.8 L12.4,8.6 L10.8,8.6 L10.8,12.8 L9.2,12.8 L9.2,8.6 L7.6,8.6 L7.6,12.8 L6.0,12.8 L6.0,8.6 L4.4,8.6 L4.4,12.8 L2.8,12.8 L2.8,8.6 L2.4,8.6 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <path d="M3.0,6.6 Q11.8,5.1 20.6,6.6 L20.6,7.4 Q11.8,6.0 3.0,7.4 Z" fill="#ffb066" stroke="none" />
      </g>
    ),
  },
];
