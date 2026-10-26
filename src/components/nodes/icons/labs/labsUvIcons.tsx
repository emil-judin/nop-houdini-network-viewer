import type { OperatorIconDef } from '../iconTypes';
import { GEAR_PATH } from '../sop/attributeIcons';

/**
 * SideFX Labs icons for UV, texture, trim sheet, baking and material tools.
 *
 * Original MIT-licensed drawings that follow `docs/ICON_ART_BIBLE.md` (Labs accent palette).
 */
export const LABS_UV_ICONS: OperatorIconDef[] = [
  {
    id: 'labs.autouv',
    label: 'Labs Auto UV',
    family: 'labs',
    description: 'Light gear with a black-and-white UV checker disc in its center.',
    types: ['autouv'],
    refKey: 'labs::autouv',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-disc`}>
            <circle cx="12" cy="12" r="5.2" />
          </clipPath>
        </defs>
        <path d={GEAR_PATH} fill="#f2f4f7" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <g clipPath={`url(#${uid}-disc)`}>
          <rect x="6.8" y="6.8" width="10.4" height="10.4" fill="#ffffff" />
          {[0, 1, 2, 3].flatMap((i) =>
            [0, 1, 2, 3]
              .filter((j) => (i + j) % 2 === 0)
              .map((j) => (
                <rect key={`${i}-${j}`} x={6.8 + i * 2.6} y={6.8 + j * 2.6} width="2.6" height="2.6" fill="#1e1e1e" />
              )),
          )}
        </g>
        <circle cx="12" cy="12" r="5.2" fill="none" stroke="#262626" strokeWidth="1.1" />
      </>
    ),
  },
  {
    id: 'labs.trim_texture',
    label: 'Labs Trim Texture',
    family: 'labs',
    description:
      'Trim sheet: square split into horizontal bands (thin top strip with an orange swatch, then dark teal, teal and light teal bands).',
    types: ['automatic_trim_texture', 'trim_texture'],
    refKey: 'labs::trim_texture',
    render: () => (
      <>
        <rect x="3" y="3" width="18" height="18" fill="#5fd3c8" />
        <rect x="3" y="3" width="18" height="3" fill="#0b4f55" />
        <rect x="3" y="3" width="3" height="3" fill="#f2711c" />
        <rect x="6" y="3" width="6" height="3" fill="#14a5b4" />
        <rect x="3" y="6" width="18" height="5" fill="#0d6e78" />
        <rect x="3" y="11" width="18" height="5" fill="#14a5b4" />
        <path d="M3 6H21M3 11H21M3 16H21" stroke="#262626" strokeWidth="0.7" />
        <rect x="3" y="3" width="18" height="18" fill="none" stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'labs.calculate_uv_distortion',
    label: 'Labs Calculate UV Distortion',
    family: 'labs',
    description: 'White square with a heavy dark frame; inside, orange and teal UV lines wobble instead of running straight.',
    types: ['calculate_uv_distortion'],
    refKey: 'labs::calculate_uv_distortion',
    render: () => (
      <>
        <rect x="3" y="3" width="18" height="18" fill="#f2f4f7" stroke="#262626" strokeWidth="2" />
        <path
          d="M3.5 9C8 7 10 11 13 9.5C16 8 17.5 10 20.5 9M3.5 15C7 17 10 13 13 15C16 17 18 14 20.5 15.5"
          fill="none"
          stroke="#14a5b4"
          strokeWidth="1.6"
        />
        <path
          d="M9 3.5C7 8 12 9 10 13C8 17 11 19 9.5 20.5M15 3.5C17 7 12.5 10 14.5 13.5C16.5 17 13.5 18.5 15.5 20.5"
          fill="none"
          stroke="#f2711c"
          strokeWidth="1.6"
        />
      </>
    ),
  },
  {
    id: 'labs.delight',
    label: 'Labs Delight',
    family: 'labs',
    description: 'Dark light bulb crossed out by a pale pink X, on a white screw base with red stripes: removes baked lighting.',
    types: ['delight'],
    refKey: 'labs::delight',
    render: () => (
      <>
        <path
          d="M12 2.5C8 2.5 5.5 5.5 5.5 9C5.5 11.6 7 13.2 8.5 14.6V16H15.5V14.6C17 13.2 18.5 11.6 18.5 9C18.5 5.5 16 2.5 12 2.5Z"
          fill="#3a3f47"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path d="M9.5 6.5L14.5 11.5M14.5 6.5L9.5 11.5" stroke="#f4a3a3" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="8.5" y="16" width="7" height="5" rx="1" fill="#f2f4f7" stroke="#262626" strokeWidth="1" />
        <path d="M8.5 17.7H15.5M8.5 19.3H15.5" stroke="#e03228" strokeWidth="1" />
      </>
    ),
  },
  {
    id: 'labs.inside_face_uvs',
    label: 'Labs Inside Face UVs',
    family: 'labs',
    description: 'Open box seen from above: dark interior, and both outer walls covered in a black-and-white UV checker.',
    types: ['inside_face_uvs'],
    refKey: 'labs::inside_face_uvs',
    render: (uid) => (
      <>
        <defs>
          <pattern id={`${uid}-checkL`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="skewY(26.57)">
            <rect width="5" height="5" fill="#ffffff" />
            <rect width="2.5" height="2.5" fill="#1e1e1e" />
            <rect x="2.5" y="2.5" width="2.5" height="2.5" fill="#1e1e1e" />
          </pattern>
          <pattern id={`${uid}-checkR`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="skewY(-26.57)">
            <rect width="5" height="5" fill="#e4e8ee" />
            <rect width="2.5" height="2.5" fill="#3a3f47" />
            <rect x="2.5" y="2.5" width="2.5" height="2.5" fill="#3a3f47" />
          </pattern>
        </defs>
        <polygon points="3,9 12,4.5 21,9 12,13.5" fill="#3a3f47" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="3,9 12,13.5 12,21 3,16.5" fill={`url(#${uid}-checkL)`} stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="21,9 12,13.5 12,21 21,16.5" fill={`url(#${uid}-checkR)`} stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'labs.maps_baker',
    label: 'Labs Maps Baker',
    family: 'labs',
    description: 'Orange oven: a top strip with four white knobs above a window made of three white bars.',
    types: ['maps_baker'],
    refKey: 'labs::maps_baker',
    render: () => (
      <>
        <rect x="3" y="2.5" width="18" height="19" rx="1.5" fill="#f2711c" stroke="#262626" strokeWidth="1.2" />
        <path d="M3 7.5H21" stroke="#262626" strokeWidth="1" />
        {[5.6, 8.6, 15.4, 18.4].map((cx) => (
          <circle key={cx} cx={cx} cy="5" r="1.1" fill="#ffffff" stroke="#262626" strokeWidth="0.6" />
        ))}
        <rect x="5.5" y="9.5" width="13" height="9.5" rx="0.8" fill="#ffffff" stroke="#262626" strokeWidth="0.9" />
        <path d="M5.5 12.6H18.5M5.5 15.8H18.5" stroke="#f2711c" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'labs.material_to_override',
    label: 'Labs Material to Override',
    family: 'labs',
    description: 'Glossy red sphere with a lighter six-lobed pattern on its face and a white highlight.',
    types: ['material_to_override'],
    refKey: 'labs::material_to_override',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-red`} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#c0101a" />
            <stop offset="60%" stopColor="#ef5a5a" />
            <stop offset="100%" stopColor="#ffb0b0" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="9.5" fill={`url(#${uid}-red)`} stroke="#5a0a0a" strokeWidth="1.2" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx="12" cy="7" rx="1.6" ry="2.4" fill="#ff8a8a" transform={`rotate(${a} 12 12)`} />
        ))}
        <circle cx="12" cy="12" r="2.6" fill="#a00c14" />
        <ellipse cx="8.8" cy="6.6" rx="2.2" ry="1.2" fill="#ffffff" fillOpacity="0.7" transform="rotate(-30 8.8 6.6)" />
      </>
    ),
  },
  {
    id: 'labs.merge_small_islands',
    label: 'Labs Merge Small Islands',
    family: 'labs',
    description: 'Large orange UV island and a smaller one below it, with tiny orange islands scattered off the top-right being merged in.',
    types: ['merge_small_islands'],
    refKey: 'labs::merge_small_islands',
    render: () => (
      <>
        <rect x="3" y="3.5" width="10" height="17" fill="#f2711c" stroke="#262626" strokeWidth="1.1" />
        <rect x="13" y="13" width="7" height="7.5" fill="#f2711c" stroke="#262626" strokeWidth="1.1" />
        {[
          [14.5, 9.5, 2],
          [17.5, 8, 1.5],
          [15, 5, 1.6],
          [19, 4, 1.3],
          [19.5, 10.8, 1.3],
        ].map(([x, y, s]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={s} height={s} fill="#f2711c" stroke="#262626" strokeWidth="0.6" />
        ))}
      </>
    ),
  },
  {
    id: 'labs.quickmaterial',
    label: 'Labs Quick Material',
    family: 'labs',
    description: 'Glossy red material ball (dark red outline) with a bright white highlight at the upper left.',
    types: ['quickmaterial'],
    refKey: 'labs::quickmaterial',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ball`} cx="40%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#ff8a8a" />
            <stop offset="50%" stopColor="#e01020" />
            <stop offset="100%" stopColor="#7a0008" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="9.5" fill={`url(#${uid}-ball)`} stroke="#5a0a0a" strokeWidth="1.2" />
        <ellipse cx="9" cy="6.8" rx="3.4" ry="1.8" fill="#ffffff" fillOpacity="0.8" transform="rotate(-25 9 6.8)" />
      </>
    ),
  },
  {
    id: 'labs.remove_uv_distortion',
    label: 'Labs Remove UV Distortion',
    family: 'labs',
    description:
      'Thick black ring around a checker disc: warped checker on the left half (orange rim), straight checker on the right half (teal rim), split by a teal center line.',
    types: ['remove_uv_distortion'],
    refKey: 'labs::remove_uv_distortion',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-left`}>
            <rect x="4" y="4" width="8" height="16" />
          </clipPath>
          <clipPath id={`${uid}-right`}>
            <rect x="12" y="4" width="8" height="16" />
          </clipPath>
          <clipPath id={`${uid}-disc`}>
            <circle cx="12" cy="12" r="7.2" />
          </clipPath>
          <pattern id={`${uid}-check`} width="5.4" height="5.4" patternUnits="userSpaceOnUse" x="12" y="12">
            <rect width="5.4" height="5.4" fill="#ffffff" />
            <rect width="2.7" height="2.7" fill="#1e1e1e" />
            <rect x="2.7" y="2.7" width="2.7" height="2.7" fill="#1e1e1e" />
          </pattern>
          <pattern id={`${uid}-warp`} width="4.4" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(18 8 12) skewX(-14)">
            <rect width="4.4" height="6" fill="#ffffff" />
            <rect width="2.2" height="3" fill="#1e1e1e" />
            <rect x="2.2" y="3" width="2.2" height="3" fill="#1e1e1e" />
          </pattern>
        </defs>
        <circle cx="12" cy="12" r="10" fill="#111111" />
        <g clipPath={`url(#${uid}-disc)`}>
          <rect x="4" y="4" width="8" height="16" fill={`url(#${uid}-warp)`} clipPath={`url(#${uid}-left)`} />
          <rect x="12" y="4" width="8" height="16" fill={`url(#${uid}-check)`} clipPath={`url(#${uid}-right)`} />
        </g>
        <path d="M12 4.8A7.2 7.2 0 0 0 12 19.2" fill="none" stroke="#f2711c" strokeWidth="1.2" />
        <path d="M12 4.8A7.2 7.2 0 0 1 12 19.2M12 4.8V19.2" fill="none" stroke="#14a5b4" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'labs.simple_baker',
    label: 'Labs Simple Baker',
    family: 'labs',
    description: 'White chef hat (dark outline) with a light grey shaded right side.',
    types: ['simple_baker'],
    refKey: 'labs::simple_baker',
    render: () => (
      <>
        <path
          d="M6.5 13.5C3.5 13.5 2.5 9.5 4.5 7.5C5.5 6.5 7 6.3 8 6.8C8.5 4 10.5 2.8 12 2.8C13.5 2.8 15.5 4 16 6.8C17 6.3 18.5 6.5 19.5 7.5C21.5 9.5 20.5 13.5 17.5 13.5V21H6.5Z"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path d="M12 2.8C13.5 2.8 15.5 4 16 6.8C17 6.3 18.5 6.5 19.5 7.5C21.5 9.5 20.5 13.5 17.5 13.5V21H12Z" fill="#dfe4ea" />
        <path d="M6.5 17H17.5" stroke="#c0c7d1" strokeWidth="0.9" />
        {/* Re-stroke the silhouette over the shading */}
        <path
          d="M6.5 13.5C3.5 13.5 2.5 9.5 4.5 7.5C5.5 6.5 7 6.3 8 6.8C8.5 4 10.5 2.8 12 2.8C13.5 2.8 15.5 4 16 6.8C17 6.3 18.5 6.5 19.5 7.5C21.5 9.5 20.5 13.5 17.5 13.5V21H6.5Z"
          fill="none"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'labs.trim_texture_subutil',
    label: 'Labs Trim Texture Subutil',
    family: 'labs',
    description: 'Large yellow broom (brown handle, dark outlines) sweeping toward the bottom-left.',
    types: ['trim_texture_subutil'],
    refKey: 'labs::trim_texture_subutil',
    render: () => (
      <>
        <path d="M20.5 2.5L13.5 11" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
        <path d="M20.5 2.5L13.5 11" stroke="#b87a3d" strokeWidth="1.7" strokeLinecap="round" />
        <polygon points="11.8,9.2 15.4,12.4 11,21.5 3,15.5" fill="#ebbf1a" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M12.6 11.2L7 18.2M14 12L9.6 20M11.6 10L5.2 16.4" stroke="#8a6a10" strokeWidth="0.8" />
        <path d="M11.4 9L15.8 12.8" stroke="#9aa2ae" strokeWidth="2" />
      </>
    ),
  },
  {
    id: 'labs.trim_texture_utility',
    label: 'Labs Trim Texture Utility',
    family: 'labs',
    description: 'The Trim Texture band layout (orange swatch, dark teal, teal and light teal bands) with a white gear (dark outline) on top.',
    types: ['trim_texture_utility'],
    refKey: 'labs::trim_texture_utility',
    render: () => (
      <>
        <rect x="3" y="3" width="18" height="18" fill="#5fd3c8" />
        <rect x="3" y="3" width="18" height="3" fill="#0b4f55" />
        <rect x="3" y="3" width="3" height="3" fill="#f2711c" />
        <rect x="6" y="3" width="6" height="3" fill="#14a5b4" />
        <rect x="3" y="6" width="18" height="5" fill="#0d6e78" />
        <rect x="3" y="11" width="18" height="5" fill="#14a5b4" />
        <rect x="3" y="3" width="18" height="18" fill="none" stroke="#262626" strokeWidth="1.2" />
        <g transform="translate(5.5 5.5) scale(0.54)">
          <path d={GEAR_PATH} fill="#ffffff" stroke="#262626" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3.6" fill="#14a5b4" stroke="#262626" strokeWidth="1.6" />
        </g>
      </>
    ),
  },
  {
    id: 'labs.uv_transfer',
    label: 'Labs UV Transfer',
    family: 'labs',
    description: 'Black-and-white UV checker square (top-left) and an empty white UV grid (bottom-right), linked by a curved orange arrow.',
    types: ['uv_transfer'],
    refKey: 'labs::uv_transfer',
    render: () => (
      <>
        <rect x="2.5" y="2.5" width="9" height="9" fill="#ffffff" stroke="#262626" strokeWidth="1" />
        <rect x="2.5" y="2.5" width="4.5" height="4.5" fill="#1e1e1e" />
        <rect x="7" y="7" width="4.5" height="4.5" fill="#1e1e1e" />
        <rect x="12.5" y="12.5" width="9" height="9" fill="#ffffff" stroke="#262626" strokeWidth="1" />
        <path d="M17 12.5V21.5M12.5 17H21.5" stroke="#1e1e1e" strokeWidth="0.9" />
        <path d="M13 4.5C16 4 18 5.5 18 8.5" fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
        <path d="M13 4.5C16 4 18 5.5 18 8.5" fill="none" stroke="#f2711c" strokeWidth="1.6" strokeLinecap="round" />
        <polygon points="18,11.4 15.6,8.4 20.4,8.4" fill="#f2711c" stroke="#262626" strokeWidth="0.8" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'labs.uv_unitize',
    label: 'Labs UV Unitize',
    family: 'labs',
    description: 'Puffy rounded square split into a 2 x 2 checker (dark top-left and bottom-right, light top-right and bottom-left).',
    types: ['uv_unitize'],
    refKey: 'labs::uv_unitize',
    render: (uid) => {
      const shape = 'M4 4C9 2.8 15 2.8 20 4C21.2 9 21.2 15 20 20C15 21.2 9 21.2 4 20C2.8 15 2.8 9 4 4Z';
      return (
        <>
          <defs>
            <clipPath id={`${uid}-tile`}>
              <path d={shape} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${uid}-tile)`}>
            <rect x="2" y="2" width="20" height="20" fill="#eef2f7" />
            <rect x="2" y="2" width="10" height="10" fill="#2f3338" />
            <rect x="12" y="12" width="10" height="10" fill="#2f3338" />
          </g>
          <path d={shape} fill="none" stroke="#262626" strokeWidth="1.2" />
        </>
      );
    },
  },
  {
    id: 'labs.uv_unwrap_cylinder',
    label: 'Labs UV Unwrap Cylinder',
    family: 'labs',
    description: 'Cylinder with an orange top cap and black-and-white checker sides.',
    types: ['uv_unwrap_cylinder'],
    refKey: 'labs::uv_unwrap_cylinder',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-side`}>
            <path d="M5 7V18A7 2.6 0 0 0 19 18V7Z" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-side)`}>
          <rect x="4" y="5" width="16" height="17" fill="#ffffff" />
          {[0, 1, 2, 3].flatMap((i) =>
            [0, 1, 2, 3]
              .filter((j) => (i + j) % 2 === 0)
              .map((j) => <rect key={`${i}-${j}`} x={5 + i * 3.5} y={7 + j * 3.6} width="3.5" height="3.6" fill="#1e1e1e" />),
          )}
        </g>
        <path d="M5 7V18A7 2.6 0 0 0 19 18V7" fill="none" stroke="#262626" strokeWidth="1.2" />
        <ellipse cx="12" cy="7" rx="7" ry="2.6" fill="#f2711c" stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
];
