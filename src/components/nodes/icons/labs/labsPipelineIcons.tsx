import type { OperatorIconDef } from '../iconTypes';

/**
 * SideFX Labs icons for pipeline, import/export, caching, game engine and third-party integration tools.
 *
 * Vendor logos used by Labs integrations are redrawn by hand in the house style (owner decision,
 * see `docs/ICON_ART_BIBLE.md`, "Legal Rules"); no third-party SVG data is copied.
 */
export const LABS_PIPELINE_ICONS: OperatorIconDef[] = [
  {
    id: 'labs.av_photogrammetry',
    label: 'Labs AV (AliceVision) tools',
    family: 'labs',
    description:
      'AliceVision logo (vendor logo, redrawn): tall hollow diamond ring, light blue on the upper-left arm, darker blue on the upper-right, light grey lower-left and dark grey lower-right. Shared by all AV nodes.',
    types: [
      'av_analyze_images', 'av_depth_map', 'av_initialize', 'av_meshing', 'av_photogrammetry',
      'av_structure_from_motion', 'av_texturing',
    ],
    refKey: 'labs::av_photogrammetry',
    render: () => (
      <>
        <polygon points="4,11 12,2 12,6.2 7.6,11" fill="#5ac8e6" />
        <polygon points="12,2 20,11 16.4,11 12,6.2" fill="#2a9ac0" />
        <polygon points="20,11 12,22 12,17.8 16.4,11" fill="#6f7782" />
        <polygon points="12,22 4,11 7.6,11 12,17.8" fill="#b4bcc8" />
        <polygon points="12,2 20,11 12,22 4,11" fill="none" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        <polygon points="12,6.2 16.4,11 12,17.8 7.6,11" fill="none" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'labs.exoside_quadremesher',
    label: 'Labs Exoside QuadRemesher',
    family: 'labs',
    description:
      'Exoside QuadRemesher logo (vendor logo, redrawn): dark navy disc with a bright blue rim and the light blue letters QR.',
    types: ['exoside_quadremesher'],
    refKey: 'labs::exoside_quadremesher',
    render: () => (
      <>
        <circle cx="12" cy="12" r="10" fill="#262626" />
        <circle cx="12" cy="12" r="9" fill="#1f2a44" stroke="#4aa8f0" strokeWidth="1.5" />
        <text x="12" y="15.4" textAnchor="middle" fill="#5ab4f4" fontSize="9.4" fontFamily="sans-serif">
          QR
        </text>
      </>
    ),
  },
  {
    id: 'labs.fbx_archive_import',
    label: 'Labs FBX Archive Import',
    family: 'labs',
    description:
      'FBX logo (vendor logo, redrawn): a leaping black stick figure with a light halo above a black band carrying the white letters FBX.',
    types: ['fbx_archive_import'],
    refKey: 'labs::fbx_archive_import',
    render: () => {
      const figure = 'M20 2.8C16 6 12.5 9.5 7.5 14.5M5 6C8 7.5 10.5 10.5 12.5 14.5';
      return (
        <>
          <path d={figure} fill="none" stroke="#f2f4f7" strokeWidth="3" strokeLinecap="round" />
          <path d={figure} fill="none" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10.4" cy="4" r="1.9" fill="#111111" stroke="#f2f4f7" strokeWidth="0.8" />
          <rect x="2.5" y="15.5" width="19" height="6" fill="#0a0a0a" stroke="#262626" strokeWidth="0.8" />
          <text x="12" y="20.6" textAnchor="middle" fill="#ffffff" fontSize="5.6" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">
            FBX
          </text>
        </>
      );
    },
  },
  {
    id: 'labs.filecache',
    label: 'Labs File Cache',
    family: 'labs',
    description: 'Three-tone grey hard drive box with a dark slot on its front-left face and vent lines on its right face.',
    types: ['filecache'],
    refKey: 'labs::filecache',
    render: () => (
      <>
        <polygon points="3,10 12,5.5 21,10 12,14.5" fill="#eef2f7" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="3,10 12,14.5 12,19 3,14.5" fill="#c0c7d1" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="21,10 12,14.5 12,19 21,14.5" fill="#89929e" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M5 13L10 15.5" stroke="#262626" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M14 16.8V15.3M15.5 16V14.6M17 15.3V13.8M18.5 14.6V13.1" stroke="#3a3f47" strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'labs.gaea_tor_processor',
    label: 'Labs Gaea Tor Processor',
    family: 'labs',
    description: 'Gaea Tor artwork (vendor logo, redrawn): near-black square with a single golden curve rising gently from the left edge to the right edge.',
    types: ['gaea_tor_processor'],
    refKey: 'labs::gaea_tor_processor',
    render: () => (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" fill="#1f2228" stroke="#262626" strokeWidth="1.1" />
        <path d="M2.5 15.6C8 13.2 14 12.2 21.5 11.9" fill="none" stroke="#f5b800" strokeWidth="1.7" />
      </>
    ),
  },
  {
    id: 'labs.gameres',
    label: 'Labs GameRes',
    family: 'labs',
    description: 'White game controller with a dark outline, a dark d-pad on the left and four dark buttons on the right.',
    types: ['gameres'],
    refKey: 'labs::gameres',
    render: () => (
      <>
        <path
          d="M6 6.5H18C20.5 6.5 21.8 9.5 22 13C22.3 17.5 20.5 19.5 18.8 18.5L15.5 15H8.5L5.2 18.5C3.5 19.5 1.7 17.5 2 13C2.2 9.5 3.5 6.5 6 6.5Z"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M7 9V13M5 11H9" stroke="#3a3f47" strokeWidth="1.6" />
        {[
          [16.5, 9],
          [18.5, 11],
          [16.5, 13],
          [14.5, 11],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.95" fill="#3a3f47" />
        ))}
      </>
    ),
  },
  {
    id: 'labs.goz',
    label: 'Labs GoZ Export / Import',
    family: 'labs',
    description:
      'GoZ logo (vendor logo, redrawn): light grey tile with a heavy black frame, a black running figure between left and right arrowheads, and the letters GoZ below.',
    types: ['goz_export', 'goz_import'],
    refKey: 'labs::goz_export',
    render: () => (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="1.5" fill="#e6e6e6" stroke="#111111" strokeWidth="1.8" />
        <path d="M6.4 8.4H17.6" stroke="#8a8a8a" strokeWidth="0.7" />
        <polygon points="4.4,8.4 6.6,7.1 6.6,9.7" fill="#111111" />
        <polygon points="19.6,8.4 17.4,7.1 17.4,9.7" fill="#111111" />
        <circle cx="13.6" cy="4.8" r="1.1" fill="#111111" />
        <path d="M13 6.2L11.6 9.6L8.8 11.2M11.6 9.6L14.2 11.8M12.6 7.4L9.6 7.6M12.6 7.4L15.4 6.4" fill="none" stroke="#111111" strokeWidth="1.3" strokeLinecap="round" />
        <text x="12" y="19.6" textAnchor="middle" fill="#111111" fontSize="6.6" fontWeight="bold" fontFamily="sans-serif">
          GoZ
        </text>
      </>
    ),
  },
  {
    id: 'labs.instant_meshes',
    label: 'Labs Instant Meshes',
    family: 'labs',
    description:
      'Instant Meshes app icon (vendor artwork, redrawn): blue rounded tile with a white bowl holding a green faceted mound, and a pair of brown chopsticks at the top-right.',
    types: ['instant_meshes'],
    refKey: 'labs::instant_meshes',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-tile`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a7cc8" />
            <stop offset="100%" stopColor="#123f7a" />
          </linearGradient>
        </defs>
        <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill={`url(#${uid}-tile)`} stroke="#262626" strokeWidth="1.1" />
        <path d="M13.2 9.6L21 4.6M14.2 10.6L21.4 6.6" stroke="#8a5a2a" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M6 13C6.4 9 9 6.6 12 7C15 6.6 17.6 9 18 13Z" fill="#9ad24a" stroke="#2f5a14" strokeWidth="0.8" strokeLinejoin="round" />
        <path d="M9 8.2L8.4 13M12 7V13M15 8.2L15.6 13M6.6 10.4C9.5 9.6 14.5 9.6 17.4 10.4" fill="none" stroke="#2f5a14" strokeWidth="0.6" />
        <path d="M5 13H19C19 17.5 16 20 12 20C8 20 5 17.5 5 13Z" fill="#ffffff" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        <path d="M8 13.6V18.6M10.6 13.6V19.6M13.4 13.6V19.6M16 13.6V18.6" stroke="#d6dbe2" strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'labs.multi_file',
    label: 'Labs Multi File',
    family: 'labs',
    description: 'Tan file folder (dark outline) with a curved orange arrow dropping files into it.',
    types: ['multi_file'],
    refKey: 'labs::multi_file',
    render: () => (
      <>
        <path d="M2.5 7.5V19.5H18.5V9H10L8.5 7.5Z" fill="#e8b55a" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M2.5 19.5L5 11.5H21L18.5 19.5Z" fill="#f5d08a" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M9 6C12 2.5 17 3 18.5 6.5" fill="none" stroke="#262626" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M9 6C12 2.5 17 3 18.5 6.5" fill="none" stroke="#f2711c" strokeWidth="1.8" strokeLinecap="round" />
        <polygon points="19.4,10 16,7 20.6,5.4" fill="#f2711c" stroke="#262626" strokeWidth="0.8" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'labs.niagara',
    label: 'Labs Niagara ROP',
    family: 'labs',
    description: 'Particle export: light metal pipe bending down into a nozzle that pours a cluster of blue particle balls.',
    types: ['niagara'],
    refKey: 'labs::niagara',
    render: () => (
      <>
        <path d="M3 5H11C13.5 5 15 6.5 15 9V11" fill="none" stroke="#262626" strokeWidth="4.6" strokeLinecap="round" />
        <path d="M3 5H11C13.5 5 15 6.5 15 9V11" fill="none" stroke="#dfe4ea" strokeWidth="3" strokeLinecap="round" />
        <rect x="12.6" y="10.4" width="4.8" height="2.2" fill="#9aa2ae" stroke="#262626" strokeWidth="0.9" />
        {[
          [13, 15],
          [16.5, 15.2],
          [11, 18],
          [14.6, 18.4],
          [18.2, 18],
          [12.8, 21],
          [16.6, 21],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.7" fill="#8fbaf2" stroke="#2e4f8a" strokeWidth="0.8" />
        ))}
      </>
    ),
  },
  {
    id: 'labs.obj_importer',
    label: 'Labs OBJ Importer',
    family: 'labs',
    description: 'White document (dark outline) with an orange band across it labeled OBJ in white.',
    types: ['obj_importer'],
    refKey: 'labs::obj_importer',
    render: () => (
      <>
        <rect x="5" y="2.5" width="14" height="19" rx="1.5" fill="#f2f4f7" stroke="#262626" strokeWidth="1.1" />
        <rect x="2.5" y="7" width="19" height="7.5" fill="#f2711c" stroke="#262626" strokeWidth="1" />
        <text x="12" y="13.1" textAnchor="middle" fill="#ffffff" fontSize="6.2" fontWeight="bold" fontFamily="sans-serif">
          OBJ
        </text>
      </>
    ),
  },
  {
    id: 'labs.osm_buildings',
    label: 'Labs OSM Buildings',
    family: 'labs',
    description:
      'White page (dark outline) with a large orange building full of white windows and a teal label at the bottom-left reading OSM in white serif letters.',
    types: ['osm_buildings'],
    refKey: 'labs::osm_buildings',
    render: () => (
      <>
        <rect x="6" y="2.5" width="15.5" height="19" rx="1.2" fill="#ffffff" stroke="#262626" strokeWidth="1" />
        <path d="M7.5 15V4H12.5V8.5H19.5V15Z" fill="#f2711c" stroke="#262626" strokeWidth="0.8" strokeLinejoin="round" />
        {[8.6, 10.6].flatMap((x) =>
          [5.4, 7.6, 9.8, 12].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="1.2" height="1.2" fill="#ffffff" />),
        )}
        {[14, 16.4].flatMap((x) => [10.2, 12.4].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="1.2" height="1.2" fill="#ffffff" />))}
        <rect x="2.5" y="15" width="12.5" height="5.6" fill="#14a5b4" stroke="#262626" strokeWidth="0.9" />
        <text x="8.75" y="19.5" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="serif">
          OSM
        </text>
      </>
    ),
  },
  {
    id: 'labs.osm_filter',
    label: 'Labs OSM Filter',
    family: 'labs',
    description:
      'White page (dark outline) crossed by three diagonal orange road lines and two teal road lines, with a teal label at the bottom-left reading OSM in white serif letters.',
    types: ['osm_filter'],
    refKey: 'labs::osm_filter',
    render: () => (
      <>
        <rect x="6" y="2.5" width="15.5" height="19" rx="1.2" fill="#ffffff" stroke="#262626" strokeWidth="1" />
        <path d="M7.5 13L13 3.5M10 15L17 4M13 15L19.5 5" stroke="#f2711c" strokeWidth="1.2" />
        <path d="M7 6.5L20.5 9.5M7 10.5L20.5 13.5" stroke="#14a5b4" strokeWidth="1.2" />
        <rect x="2.5" y="15" width="12.5" height="5.6" fill="#14a5b4" stroke="#262626" strokeWidth="0.9" />
        <text x="8.75" y="19.5" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="serif">
          OSM
        </text>
      </>
    ),
  },
  {
    id: 'labs.osm_import',
    label: 'Labs OSM Import',
    family: 'labs',
    description: 'White page (dark outline) with a wide orange band across its middle reading OSM in large white serif letters.',
    types: ['osm_import'],
    refKey: 'labs::osm_import',
    render: () => (
      <>
        <rect x="5.5" y="2.5" width="14" height="19" rx="1.2" fill="#ffffff" stroke="#262626" strokeWidth="1" />
        <rect x="2.5" y="7" width="19" height="7.6" rx="0.8" fill="#f2711c" stroke="#262626" strokeWidth="1" />
        <text x="12" y="13.2" textAnchor="middle" fill="#ffffff" fontSize="6.6" fontFamily="serif">
          OSM
        </text>
      </>
    ),
  },
  {
    id: 'labs.workitem_import',
    label: 'Labs PDG Work-Item Import',
    family: 'labs',
    description: 'Grid of nine work-item dots (dark outlines): two bright green finished items and seven dark green pending ones.',
    types: ['workitem_import'],
    refKey: 'labs::workitem_import',
    render: () => (
      <>
        {[5, 12, 19].flatMap((cy, row) =>
          [5, 12, 19].map((cx, col) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="2.6"
              fill={row === 0 && col < 2 ? '#3ce03c' : '#1f7a1f'}
              stroke="#262626"
              strokeWidth="0.9"
            />
          )),
        )}
      </>
    ),
  },
  {
    id: 'labs.sketchfab_output',
    label: 'Labs Sketchfab Output',
    family: 'labs',
    description: 'Sketchfab logo (vendor logo, redrawn): sky blue disc holding a white isometric cube whose three faces are separated by thin blue gaps.',
    types: ['sketchfab_output'],
    refKey: 'labs::sketchfab_output',
    render: () => (
      <>
        <circle cx="12" cy="12" r="9.8" fill="#1caad9" stroke="#262626" strokeWidth="1" />
        <polygon points="12,5 17.4,7.9 12,10.8 6.6,7.9" fill="#ffffff" />
        <polygon points="6.2,8.8 11.4,11.6 11.4,17.8 6.2,15" fill="#ffffff" />
        <polygon points="12.6,11.6 17.8,8.8 17.8,15 12.6,17.8" fill="#ffffff" />
      </>
    ),
  },
  {
    id: 'labs.substance_material',
    label: 'Labs Substance Material',
    family: 'labs',
    description: 'Substance logo (vendor logo, redrawn): red hexagon with a pointed top holding a white angular S built from straight strokes.',
    types: ['substance_material'],
    refKey: 'labs::substance_material',
    render: () => (
      <>
        <polygon points="12,2 20.7,7 20.7,17 12,22 3.3,17 3.3,7" fill="#e03a2e" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        <path d="M16.6 7.6H9L7.4 9.2V11.2L9 12.8H15L16.6 14.4V15.8L15 17.4H7.4" fill="none" stroke="#ffffff" strokeWidth="2.3" />
      </>
    ),
  },
  {
    id: 'labs.unreal_pivotpainter',
    label: 'Labs Unreal PivotPainter',
    family: 'labs',
    description: 'Pivot marker: teal crosshair ring with four ticks (dark casing) around an orange center dot.',
    types: ['unreal_pivotpainter'],
    refKey: 'labs::unreal_pivotpainter',
    render: () => {
      const d = 'M12 2V6.5M12 17.5V22M2 12H6.5M17.5 12H22';
      return (
        <>
          <circle cx="12" cy="12" r="6.5" fill="none" stroke="#262626" strokeWidth="3.2" />
          <path d={d} stroke="#262626" strokeWidth="3.2" />
          <circle cx="12" cy="12" r="6.5" fill="none" stroke="#14a5b4" strokeWidth="1.8" />
          <path d={d} stroke="#14a5b4" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.4" fill="#f2711c" stroke="#262626" strokeWidth="0.9" />
        </>
      );
    },
  },
  {
    id: 'labs.vector_field',
    label: 'Labs Vector Field Export',
    family: 'labs',
    description:
      'Tilted dark shield-shaped volume with a white edge and green rim, filled with short curved streamlines in orange, yellow, green, red and blue swirling toward the center.',
    types: ['vector_field'],
    refKey: 'labs::vector_field',
    render: () => (
      <>
        <polygon points="6.5,2.5 20.5,4 21.5,15.5 14.5,21.5 3,19 2.5,7.5" fill="#22272e" stroke="#f2f4f7" strokeWidth="2.6" strokeLinejoin="round" />
        <polygon points="6.5,2.5 20.5,4 21.5,15.5 14.5,21.5 3,19 2.5,7.5" fill="none" stroke="#6ab42a" strokeWidth="1.3" strokeLinejoin="round" />
        <g fill="none" strokeWidth="1.1" strokeLinecap="round">
          <path d="M5 7C8 7.5 10.5 9.5 11.5 12.5" stroke="#f5a030" />
          <path d="M6.5 4.6C9.5 6 11.5 8.5 12.5 11" stroke="#f5d030" />
          <path d="M18.5 5.2C15.5 6.5 13.5 9 12.8 11.5" stroke="#8cd040" />
          <path d="M20 9C17 9.5 14.5 11 13.2 12.8" stroke="#e03228" />
          <path d="M19.5 16.5C16.8 15.4 14.6 14 13 12.8" stroke="#4a78c8" />
          <path d="M13.2 19.8C12.6 17.2 12.3 15 12.4 13" stroke="#f5a030" />
          <path d="M5.2 16.4C8 15 10.2 13.8 11.6 13" stroke="#8aa0c0" />
          <path d="M3.8 11.4C7 11 9.5 11.5 11.4 12.6" stroke="#8cd040" />
        </g>
      </>
    ),
  },
  {
    id: 'labs.volume_texture',
    label: 'Labs VolumeTexture Export',
    family: 'labs',
    description: 'Orange rounded tile (dark outline) with a white cloud on it: a volume baked to a texture.',
    types: ['volume_texture'],
    refKey: 'labs::volume_texture',
    render: () => (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#f2711c" stroke="#262626" strokeWidth="1.2" />
        <path d="M7.5 16.5C5.5 16.5 4.5 15 4.9 13.5C5.3 12 6.8 11.4 8 11.8C8.4 9.6 10.6 8.4 12.6 9.2C14.2 8 17.2 8.6 17.8 11C19.6 11 20.6 12.6 20.1 14.2C19.8 15.6 18.8 16.5 17.4 16.5Z" fill="#ffffff" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'labs.unreal_worldcomposition_prepare',
    label: 'Labs Worldcomposition Prepare',
    family: 'labs',
    description: 'Large diamond with a dark frame, split into four tiles: orange at the top and teal on the other three.',
    types: ['unreal_worldcomposition_prepare'],
    refKey: 'labs::unreal_worldcomposition_prepare',
    render: () => (
      <>
        <polygon points="12,2 22,12 12,22 2,12" fill="#3a3f47" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        {(
          [
            [12, 7, '#f2711c'],
            [7.4, 11.6, '#14a5b4'],
            [16.6, 11.6, '#14a5b4'],
            [12, 16.2, '#14a5b4'],
          ] as const
        ).map(([cx, cy, fill]) => (
          <polygon
            key={`${cx}-${cy}`}
            points={`${cx},${cy - 3.6} ${cx + 3.6},${cy} ${cx},${cy + 3.6} ${cx - 3.6},${cy}`}
            fill={fill}
            stroke="#262626"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        ))}
      </>
    ),
  },
  {
    id: 'labs.zibravdb_filecache',
    label: 'Labs ZibraVDB File Cache',
    family: 'labs',
    description:
      'ZibraVDB logo (vendor logo, redrawn): bright violet square with clipped corners and four arrows cut out of it (the node color shows through), each running in from the middle of a side to a V-shaped head whose arms reach back toward the corners, leaving a violet center.',
    types: ['zibravdb_filecache'],
    refKey: 'labs::zibravdb_filecache',
    render: (uid) => (
      <>
        <defs>
          {/* Arrows are true cutouts so the node color shows through, like the original logo */}
          <mask id={`${uid}-cut`}>
            <rect x="-2" y="-2" width="28" height="28" fill="#ffffff" />
            <path
              d="M12 -1V8.2M6.6 2.8L12 8.2L17.4 2.8M12 25V15.8M6.6 21.2L12 15.8L17.4 21.2M-1 12H8.2M2.8 6.6L8.2 12L2.8 17.4M25 12H15.8M21.2 6.6L15.8 12L21.2 17.4"
              fill="none"
              stroke="#000000"
              strokeWidth="1.9"
            />
            {/* Flared shaft ends where each arrow leaves the edge */}
            <path d="M10.2 -0.5H13.8L12.8 1H11.2ZM10.2 24.5H13.8L12.8 23H11.2ZM-0.5 10.2V13.8L1 12.8V11.2ZM24.5 10.2V13.8L23 12.8V11.2Z" fill="#000000" />
          </mask>
        </defs>
        <g transform="translate(12 12) scale(0.84) translate(-12 -12)">
          <g mask={`url(#${uid}-cut)`}>
            <polygon points="1,0 23,0 24,1 24,23 23,24 1,24 0,23 0,1" fill="#9a16ff" />
            <polygon points="1,0 23,0 24,1 24,23 23,24 1,24 0,23 0,1" fill="none" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
          </g>
        </g>
      </>
    ),
  },
];
