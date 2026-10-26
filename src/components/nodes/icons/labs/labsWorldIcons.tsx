import type { OperatorIconDef } from '../iconTypes';

/**
 * SideFX Labs icons for world building: architecture, props, terrain, roads, vegetation and placement.
 *
 * Original MIT-licensed drawings that follow `docs/ICON_ART_BIBLE.md` (Labs accent palette).
 */
export const LABS_WORLD_ICONS: OperatorIconDef[] = [
  {
    id: 'labs.building_generator',
    label: 'Labs Building Generator',
    family: 'labs',
    description: 'Tall orange building with a dark outline, a doorway notch at the bottom and a grid of light windows.',
    types: ['building_generator'],
    refKey: 'labs::building_generator',
    render: () => (
      <>
        <path d="M5 21V3H19V21H14V16.5H10V21Z" fill="#f2711c" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        {[7, 10.9, 14.8].flatMap((x) =>
          [5, 8, 11].map((y) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="2.2" height="1.8" fill="#ffe0c2" stroke="#262626" strokeWidth="0.5" />
          )),
        )}
      </>
    ),
  },
  {
    id: 'labs.building_generator_utility',
    label: 'Labs Building Generator Utility',
    family: 'labs',
    description: 'Smaller orange building with light windows and a teal wrench in front of its lower-right corner.',
    types: ['building_generator_utility'],
    refKey: 'labs::building_generator_utility',
    render: () => (
      <>
        <path d="M3 21V4H13V21H10V17.5H6V21Z" fill="#f2711c" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        {[4.6, 8.4].flatMap((x) =>
          [6, 9, 12].map((y) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="2.2" height="1.8" fill="#ffe0c2" stroke="#262626" strokeWidth="0.5" />
          )),
        )}
        <g fill="none" strokeLinecap="round">
          <path d="M17.3 11.2A4 4 0 1 1 11.7 11.2M16.8 16.8L21.3 21.3" stroke="#262626" strokeWidth="4" />
          <path d="M17.3 11.2A4 4 0 1 1 11.7 11.2M16.8 16.8L21.3 21.3" stroke="#14a5b4" strokeWidth="2.4" />
        </g>
      </>
    ),
  },
  {
    id: 'labs.cable_generator',
    label: 'Labs Cable Generator',
    family: 'labs',
    description: 'Two grey posts with three sagging cables (orange, teal, orange) hanging between them.',
    types: ['cable_generator'],
    refKey: 'labs::cable_generator',
    render: () => (
      <>
        <g fill="none">
          <path d="M3.1 6Q12 22 20.9 6M3.1 6Q12 15 20.9 6M3.1 9.5Q12 19.5 20.9 9.5" stroke="#262626" strokeWidth="3" />
          <path d="M3.1 6Q12 22 20.9 6" stroke="#f2711c" strokeWidth="1.6" />
          <path d="M3.1 6Q12 15 20.9 6" stroke="#14a5b4" strokeWidth="1.6" />
          <path d="M3.1 9.5Q12 19.5 20.9 9.5" stroke="#f2711c" strokeWidth="1.6" />
        </g>
        <rect x="2" y="4" width="2.2" height="17" fill="#5a616b" stroke="#262626" strokeWidth="0.9" />
        <rect x="19.8" y="4" width="2.2" height="17" fill="#5a616b" stroke="#262626" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'labs.dirtskirt',
    label: 'Labs Dirt Skirt',
    family: 'labs',
    description: 'Teal dome sitting on a ragged orange skirt of dirt that spreads out around its base.',
    types: ['dirtskirt'],
    refKey: 'labs::dirtskirt',
    render: () => (
      <>
        <path
          d="M4 12.5C6 12 18 12 20 12.5C21 15.5 22 18 21 20C19 21 18 19 16.5 20.5C15 21.5 13.5 19.5 12 20.5C10.5 21.5 9 19.5 7.5 20.5C6 21.5 4.5 20 3.2 20.5C2.4 18 3.2 15 4 12.5Z"
          fill="#f2711c"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path d="M5 13C5 5.5 19 5.5 19 13Z" fill="#14a5b4" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'labs.hf_combine_masks',
    label: 'Labs HeightField Combine Masks',
    family: 'labs',
    description: 'Orange square outline (top-left) and teal square outline (bottom-right) with arrows pointing at each other, combining two masks.',
    types: ['hf_combine_masks'],
    refKey: 'labs::hf_combine_masks',
    render: () => (
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3H13V13H3ZM6 6L10.5 10.5M10.5 7V10.5H7" stroke="#262626" strokeWidth="3" />
        <path d="M3 3H13V13H3ZM6 6L10.5 10.5M10.5 7V10.5H7" stroke="#f2711c" strokeWidth="1.6" />
        <path d="M11 11H21V21H11ZM18 18L13.5 13.5M13.5 17V13.5H17" stroke="#262626" strokeWidth="3" />
        <path d="M11 11H21V21H11ZM18 18L13.5 13.5M13.5 17V13.5H17" stroke="#14a5b4" strokeWidth="1.6" />
      </g>
    ),
  },
  {
    id: 'labs.hf_insert_mask',
    label: 'Labs HeightField Insert Mask',
    family: 'labs',
    description: 'Three stacked flat diamond layers (teal, orange, teal), the orange mask layer inserted in the middle.',
    types: ['hf_insert_mask'],
    refKey: 'labs::hf_insert_mask',
    render: () => (
      <>
        {(
          [
            [15, '#14a5b4'],
            [11, '#f2711c'],
            [7, '#14a5b4'],
          ] as const
        ).map(([cy, fill]) => (
          <polygon
            key={cy}
            points={`12,${cy - 4.5} 21,${cy} 12,${cy + 4.5} 3,${cy}`}
            fill={fill}
            stroke="#262626"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        ))}
      </>
    ),
  },
  {
    id: 'labs.lot_subdivision',
    label: 'Labs Lot Subdivision',
    family: 'labs',
    description: 'Square block subdivided into grey lots of different sizes (dark lines), with one small corner lot highlighted orange.',
    types: ['lot_subdivision'],
    refKey: 'labs::lot_subdivision',
    render: () => (
      <>
        <rect x="3" y="3" width="18" height="18" fill="#b4bcc8" />
        <rect x="3" y="3" width="10" height="7.5" fill="#c9d0da" />
        <rect x="15.5" y="3" width="5.5" height="11" fill="#9aa2ae" />
        <rect x="15.5" y="15.5" width="5.5" height="5.5" fill="#f2711c" />
        <path d="M3 10.5H13M13 3V21M15.5 3V21M15.5 14V15.5M15.5 14H21M15.5 15.5H21M13 14.5H3" stroke="#262626" strokeWidth="0.9" />
        <rect x="3" y="3" width="18" height="18" fill="none" stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'labs.mesh_tiler',
    label: 'Labs Mesh Tiler',
    family: 'labs',
    description: 'Square tiled with rectangles of different sizes in teal, dark teal and orange, separated by dark lines.',
    types: ['mesh_tiler'],
    refKey: 'labs::mesh_tiler',
    render: () => (
      <>
        <rect x="3" y="3" width="18" height="18" fill="#14a5b4" />
        <rect x="7.5" y="7.5" width="9" height="9" fill="#0b4f55" />
        <rect x="12" y="3" width="9" height="4.5" fill="#f2711c" />
        <rect x="3" y="16.5" width="9" height="4.5" fill="#f2711c" />
        <rect x="7.5" y="3" width="4.5" height="4.5" fill="#0d6e78" />
        <rect x="16.5" y="12" width="4.5" height="4.5" fill="#0d6e78" />
        <path d="M3 7.5H21M3 16.5H21M7.5 3V21M16.5 3V21M12 3V7.5M12 16.5V21M3 12H7.5M16.5 12H21" stroke="#262626" strokeWidth="0.8" />
        <rect x="3" y="3" width="18" height="18" fill="none" stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'labs.pick_and_place',
    label: 'Labs Pick and Place',
    family: 'labs',
    description: 'Teal map pin with a white hole, standing inside a thick teal ring (both with dark casing).',
    types: ['pick_and_place'],
    refKey: 'labs::pick_and_place',
    render: () => (
      <>
        <circle cx="12" cy="12" r="9" fill="none" stroke="#262626" strokeWidth="3" />
        <circle cx="12" cy="12" r="9" fill="none" stroke="#14a5b4" strokeWidth="1.8" />
        <path d="M12 19C9 15 7.5 12.5 7.5 10A4.5 4.5 0 0 1 16.5 10C16.5 12.5 15 15 12 19Z" fill="#14a5b4" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="1.7" fill="#ffffff" stroke="#262626" strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'labs.road_generator',
    label: 'Labs Road Generator',
    family: 'labs',
    description: 'Dark grey road narrowing into the distance (dark outline) with white center-line dashes.',
    types: ['road_generator'],
    refKey: 'labs::road_generator',
    render: () => (
      <>
        <polygon points="8,3 16,3 22,21 2,21" fill="#3a3f47" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M12 4V7.5M12 10V14M12 16.5V20.5" stroke="#ffffff" strokeWidth="1.8" />
      </>
    ),
  },
  {
    id: 'labs.scifi_panels',
    label: 'Labs SciFi Panels',
    family: 'labs',
    description: 'White hull plate cut by thick dark panel seams that step and turn like sci-fi paneling.',
    types: ['scifi_panels'],
    refKey: 'labs::scifi_panels',
    render: () => (
      <>
        <rect x="3" y="3" width="18" height="18" fill="#f2f4f7" stroke="#262626" strokeWidth="1.1" />
        <path d="M3 12H9.5L11 10.5H14.5V3M14.5 10.5V15L16 16.5H21M14.5 15V21" fill="none" stroke="#1e1e1e" strokeWidth="1.6" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'labs.simple_rope_wrap',
    label: 'Labs Simple Rope Wrap',
    family: 'labs',
    description: 'Dark teal ball wrapped by crossing orange ropes (dark casing).',
    types: ['simple_rope_wrap'],
    refKey: 'labs::simple_rope_wrap',
    render: () => {
      const d = 'M2.5 9C8 14 16 15 21.5 10M3.5 15C9 8 16 5 20.5 6M5 5C8 11 13 17 19 19.5';
      return (
        <>
          <circle cx="12" cy="12" r="8.6" fill="#0d6e78" stroke="#262626" strokeWidth="1.2" />
          <path d={d} fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#f2711c" strokeWidth="1.6" strokeLinecap="round" />
        </>
      );
    },
  },
  {
    id: 'labs.terrain_segment',
    label: 'Labs Terrain Mesh Output',
    family: 'labs',
    description: 'Four diamond terrain tiles in a 2 x 2 diamond layout: orange top and bottom, dark teal left, teal right.',
    types: ['terrain_segment'],
    refKey: 'labs::terrain_segment',
    render: () => (
      <>
        {(
          [
            [12, 7, '#f2711c'],
            [7, 12, '#0d6e78'],
            [17, 12, '#14a5b4'],
            [12, 17, '#f2711c'],
          ] as const
        ).map(([cx, cy, fill]) => (
          <polygon
            key={`${cx}-${cy}`}
            points={`${cx},${cy - 4.6} ${cx + 4.6},${cy} ${cx},${cy + 4.6} ${cx - 4.6},${cy}`}
            fill={fill}
            stroke="#262626"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        ))}
      </>
    ),
  },
  {
    id: 'labs.terrain_texture',
    label: 'Labs Terrain Texture Output',
    family: 'labs',
    description: 'The same 2 x 2 diamond tile layout in teal shades only (dark teal top and bottom, teal left and right).',
    types: ['terrain_texture'],
    refKey: 'labs::terrain_texture',
    render: () => (
      <>
        {(
          [
            [12, 7, '#0d6e78'],
            [7, 12, '#14a5b4'],
            [17, 12, '#14a5b4'],
            [12, 17, '#0d6e78'],
          ] as const
        ).map(([cx, cy, fill]) => (
          <polygon
            key={`${cx}-${cy}`}
            points={`${cx},${cy - 4.6} ${cx + 4.6},${cy} ${cx},${cy + 4.6} ${cx - 4.6},${cy}`}
            fill={fill}
            stroke="#262626"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        ))}
      </>
    ),
  },
];
