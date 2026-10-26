import type { OperatorIconDef } from '../iconTypes';

/**
 * SideFX Labs icons for mesh modeling, cutting, conversion, deformation and curve tools.
 *
 * Original MIT-licensed drawings that follow `docs/ICON_ART_BIBLE.md` (Labs accent palette).
 */
export const LABS_MODELING_ICONS: OperatorIconDef[] = [
  {
    id: 'labs.boolean_curve',
    label: 'Labs Boolean Curve',
    family: 'labs',
    description: 'A teal curved loop and an orange square outline crossing each other (both with dark casing).',
    types: ['boolean_curve'],
    refKey: 'labs::boolean_curve',
    render: () => (
      <>
        <path d="M10 20.5C4 20.5 2.5 13 5 8.5C7.5 4 14 3 18 4.5C21 5.6 21 8 18.5 8" fill="none" stroke="#262626" strokeWidth="3.6" strokeLinecap="round" />
        <path d="M10 20.5C4 20.5 2.5 13 5 8.5C7.5 4 14 3 18 4.5C21 5.6 21 8 18.5 8" fill="none" stroke="#14a5b4" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="8" y="9" width="9" height="9" fill="none" stroke="#262626" strokeWidth="3.6" />
        <rect x="8" y="9" width="9" height="9" fill="none" stroke="#f2711c" strokeWidth="2.2" />
      </>
    ),
  },
  {
    id: 'labs.box_clip',
    label: 'Labs Box Clip',
    family: 'labs',
    description:
      'Glassy pale-blue cube: translucent faces with dark front edges and faint hidden back edges showing through.',
    types: ['box_clip'],
    refKey: 'labs::box_clip',
    render: () => (
      <>
        <path d="M4 16.5L12 12.5L20 16.5M12 12.5V3" stroke="#6a8fa6" strokeWidth="0.8" />
        <polygon points="12,3 20,7 12,11 4,7" fill="#eef8fd" fillOpacity="0.9" />
        <polygon points="4,7 12,11 12,20.5 4,16.5" fill="#d8eef8" fillOpacity="0.85" />
        <polygon points="20,7 12,11 12,20.5 20,16.5" fill="#b6d6e6" fillOpacity="0.85" />
        <polygon points="12,3 20,7 20,16.5 12,20.5 4,16.5 4,7" fill="none" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M4 7L12 11L20 7M12 11V20.5" fill="none" stroke="#262626" strokeWidth="1" />
      </>
    ),
  },
  {
    id: 'labs.boxcutter',
    label: 'Labs Boxcutter',
    family: 'labs',
    description: 'Orange utility knife pointing up-right: orange handle with a dark grip and slider, and a light steel blade.',
    types: ['boxcutter', 'boxcutter_subutil'],
    refKey: 'labs::boxcutter',
    render: () => (
      <g transform="rotate(-32 12 12)">
        <rect x="1.5" y="9.5" width="15" height="5.5" rx="1.5" fill="#f2711c" stroke="#262626" strokeWidth="1.1" />
        <rect x="3.5" y="11.3" width="10" height="1.9" rx="0.9" fill="#3a3f47" />
        <rect x="8" y="8.4" width="2.6" height="1.4" fill="#3a3f47" stroke="#262626" strokeWidth="0.6" />
        <polygon points="16.5,10 22.5,11 16.5,13.4" fill="#e4e8ee" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'labs.curve_branches',
    label: 'Labs Curve Branches',
    family: 'labs',
    description: 'Orange branching curve (a trunk that forks twice) with short teal side twigs, all with dark casing.',
    types: ['curve_branches'],
    refKey: 'labs::curve_branches',
    render: () => (
      <>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.5 21.5L11 14L6 7.5L4 3.5M6 7.5L8.5 3M11 14L15.5 8L16 3.5M15.5 8L20 6" stroke="#262626" strokeWidth="3.6" />
          <path d="M5.2 10.2L2.6 9.6M13.4 10.9L13 8.6M18.1 6.9L20.5 9.2" stroke="#262626" strokeWidth="3" />
          <path d="M10.5 21.5L11 14L6 7.5L4 3.5M6 7.5L8.5 3M11 14L15.5 8L16 3.5M15.5 8L20 6" stroke="#f2711c" strokeWidth="2.2" />
          <path d="M5.2 10.2L2.6 9.6M13.4 10.9L13 8.6M18.1 6.9L20.5 9.2" stroke="#14a5b4" strokeWidth="1.7" />
        </g>
      </>
    ),
  },
  {
    id: 'labs.curve_resample_by_density',
    label: 'Labs Curve Resample by Density',
    family: 'labs',
    description:
      'Teal winding curve with orange sample points: tightly packed along the first loop, then spread far apart toward the end.',
    types: ['curve_resample_by_density'],
    refKey: 'labs::curve_resample_by_density',
    render: () => {
      const points: Array<[number, number]> = [
        [4, 5], [5.8, 3.7], [7.9, 3.4], [9.7, 4.5], [10.4, 6.6], [9.8, 8.8], [8, 10.4],
        [6, 12.2], [5.8, 15.6], [10.5, 17.8], [16.5, 16.5], [20.5, 20],
      ];
      const d = `M${points.map(([x, y]) => `${x} ${y}`).join('L')}`;
      return (
        <>
          <path d={d} fill="none" stroke="#262626" strokeWidth="3" strokeLinejoin="round" />
          <path d={d} fill="none" stroke="#14a5b4" strokeWidth="1.6" strokeLinejoin="round" />
          {points.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.35" fill="#f2711c" stroke="#262626" strokeWidth="0.8" />
          ))}
        </>
      );
    },
  },
  {
    id: 'labs.curve_sweep',
    label: 'Labs Curve Sweep',
    family: 'labs',
    description: 'Thick orange S-shaped tube swept along a curve, with a dark outline.',
    types: ['curve_sweep'],
    refKey: 'labs::curve_sweep',
    render: () => (
      <>
        <path d="M18 5.5C15 2.5 9 2.5 8 6.5C7 10.5 17 11 16.5 16C16 20 9.5 21 6 18.5" fill="none" stroke="#262626" strokeWidth="5.4" strokeLinecap="round" />
        <path d="M18 5.5C15 2.5 9 2.5 8 6.5C7 10.5 17 11 16.5 16C16 20 9.5 21 6 18.5" fill="none" stroke="#f2711c" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M16.6 4.6C14.5 3.4 10.5 3.4 9.6 6" fill="none" stroke="#ffb066" strokeWidth="1" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'labs.decal_projector',
    label: 'Labs Decal Projector',
    family: 'labs',
    description: 'Light curved wall panel with grey seams and a blue decal patch (light grid lines) projected onto it.',
    types: ['decal_projector'],
    refKey: 'labs::decal_projector',
    render: () => (
      <>
        <path d="M3 5C8 3.5 15 3.5 21 4.5V19.5C15 18.5 8 18.5 3 20Z" fill="#eef2f7" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M3 12C8 11 15 11 21 12M12 3.9V19" stroke="#89929e" strokeWidth="0.8" />
        <path d="M7 7.5C10 6.8 14 6.8 18 7.4V16.6C14 16 10 16 7 16.6Z" fill="#3a78d0" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        <path d="M7 10.5C10 10 14 10 18 10.4M7 13.5C10 13 14 13 18 13.4M10.6 7V16.2M14.3 6.9V16.1" stroke="#a8d0ff" strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'labs.detail_mesh',
    label: 'Labs Detail Mesh',
    family: 'labs',
    description: 'Light rounded panel whose right half is laid out as a brick pattern, with two bricks highlighted orange.',
    types: ['detail_mesh'],
    refKey: 'labs::detail_mesh',
    render: () => (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="#dfe4ea" stroke="#262626" strokeWidth="1.1" />
        <rect x="12" y="12" width="9" height="4.5" fill="#f2711c" />
        <path d="M12 3V21M12 7.5H21M12 12H21M12 16.5H21M16.5 3V7.5M15 7.5V12M18 12V16.5M16.5 16.5V21" stroke="#262626" strokeWidth="0.8" />
        <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#262626" strokeWidth="1.1" />
      </>
    ),
  },
  {
    id: 'labs.dissolve_flat_edges',
    label: 'Labs Dissolve Flat Edges',
    family: 'labs',
    description: 'White rounded face with a single orange diagonal edge (dark casing) running corner to corner, the edge about to be dissolved.',
    types: ['dissolve_flat_edges'],
    refKey: 'labs::dissolve_flat_edges',
    render: () => (
      <>
        <rect x="3" y="3" width="18" height="18" rx="1.5" fill="#f2f4f7" stroke="#262626" strokeWidth="1.2" />
        <path d="M6 18L18 6" stroke="#262626" strokeWidth="4.4" strokeLinecap="round" />
        <path d="M6 18L18 6" stroke="#f2711c" strokeWidth="2.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'labs.edgegroup_to_curve',
    label: 'Labs Edge Group To Curve',
    family: 'labs',
    description: 'Rectangle whose left half is a solid teal face and whose right half is only an orange outline (the extracted curve).',
    types: ['edgegroup_to_curve'],
    refKey: 'labs::edgegroup_to_curve',
    render: () => (
      <>
        <rect x="3" y="4" width="9" height="16" fill="#14a5b4" stroke="#262626" strokeWidth="1.1" />
        <path d="M12 4.6H20.4V19.4H12" fill="none" stroke="#262626" strokeWidth="3.4" />
        <path d="M12 4.6H20.4V19.4H12" fill="none" stroke="#f2711c" strokeWidth="2" />
      </>
    ),
  },
  {
    id: 'labs.edge_smooth',
    label: 'Labs Edge Smooth',
    family: 'labs',
    description: 'Jagged orange zigzag edge crossed by the smooth teal curve it relaxes into (both with dark casing).',
    types: ['edge_smooth'],
    refKey: 'labs::edge_smooth',
    render: () => (
      <g fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path d="M2.5 15L6 8.5L9 17L13 9L16 15.5L19.5 3.5L21 8" stroke="#262626" strokeWidth="3" />
        <path d="M2.5 15L6 8.5L9 17L13 9L16 15.5L19.5 3.5L21 8" stroke="#f2711c" strokeWidth="1.7" />
        <path d="M2.5 19C8 17 15 15 21 3.5" stroke="#262626" strokeWidth="3.4" />
        <path d="M2.5 19C8 17 15 15 21 3.5" stroke="#14a5b4" strokeWidth="2" />
      </g>
    ),
  },
  {
    id: 'labs.extract_borders',
    label: 'Labs Extract Borders',
    family: 'labs',
    description: 'Wireframe box with thick light grey edges (dark casing) and no faces: only the borders remain.',
    types: ['extract_borders'],
    refKey: 'labs::extract_borders',
    render: () => {
      const d = 'M4 7.5L11 4L20 6.5L13 10ZM4 7.5V17L13 20.5V10M20 6.5V16L13 20.5M11 4V13.5L4 17M11 13.5L20 16';
      return (
        <g fill="none" strokeLinejoin="round">
          <path d={d} stroke="#262626" strokeWidth="2.8" />
          <path d={d} stroke="#dfe4ea" strokeWidth="1.4" />
        </g>
      );
    },
  },
  {
    id: 'labs.extract_silhouette',
    label: 'Labs Extract Silhouette',
    family: 'labs',
    description: 'Tilted white photo card showing a dark figure silhouette, with a red pencil tracing its outline from the top-right.',
    types: ['extract_silhouette'],
    refKey: 'labs::extract_silhouette',
    render: () => (
      <>
        <polygon points="2.5,7 17,4 19.5,17 5,20" fill="#f2f4f7" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <circle cx="10.5" cy="9.8" r="2.2" fill="#3a3f47" />
        <path d="M6.6 17.6C6.4 14.6 8.4 12.6 10.8 12.4C13.2 12.2 15 14 15.4 16.4Z" fill="#3a3f47" />
        <g transform="rotate(40 17 8)">
          <rect x="15.6" y="1" width="2.8" height="9.5" fill="#e03228" stroke="#262626" strokeWidth="0.9" />
          <polygon points="15.6,10.5 18.4,10.5 17,13.4" fill="#f2d2a0" stroke="#262626" strokeWidth="0.8" strokeLinejoin="round" />
        </g>
      </>
    ),
  },
  {
    id: 'labs.fast_remesh',
    label: 'Labs Fast Remesh',
    family: 'labs',
    description:
      'Shaded orange torus with a soft grey shadow; its right two thirds are covered in a black triangle wireframe, and a yellow lightning bolt strikes in at the top-left.',
    types: ['fast_remesh'],
    refKey: 'labs::fast_remesh',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ring`} cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffd8b0" />
            <stop offset="55%" stopColor="#f5a050" />
            <stop offset="100%" stopColor="#c8641c" />
          </radialGradient>
          <clipPath id={`${uid}-torus`}>
            <ellipse cx="12.5" cy="13" rx="9.5" ry="6.2" />
          </clipPath>
        </defs>
        <ellipse cx="13" cy="20.2" rx="8" ry="1.5" fill="#89929e" fillOpacity="0.7" />
        <ellipse cx="12.5" cy="13" rx="9.5" ry="6.2" fill={`url(#${uid}-ring)`} stroke="#262626" strokeWidth="1.1" />
        <g clipPath={`url(#${uid}-torus)`} fill="none" stroke="#1e1e1e" strokeWidth="0.6">
          <path d="M9 7.5L13 7L17 7.8L20.5 10L22 13.5L20 16.8L16 18.8L11.5 19.2M13 7L12.5 10.2M17 7.8L15.6 10.6M20.5 10L17.8 12.4M22 13.5L17.8 12.4M20 16.8L17.6 14.6M16 18.8L15.6 15.4M11.5 19.2L12.2 15.6M9 7.5L12.5 10.2L15.6 10.6L17.8 12.4L17.6 14.6L15.6 15.4L12.2 15.6M9 7.5L10.5 11M15.6 10.6L17 7.8" />
        </g>
        <ellipse cx="12.5" cy="12.3" rx="3.4" ry="1.5" fill="#7a3e10" stroke="#262626" strokeWidth="0.9" />
        <polygon points="9,1.5 3.5,10.5 7.2,10.5 4.6,19 12.2,8 8.4,8 11.2,1.5" fill="#ffe030" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'labs.houdini_icon',
    label: 'Labs Houdini Icon',
    family: 'labs',
    description:
      'Houdini logo (vendor logo, redrawn): orange square with a thick spiral cut out of it (the node color shows through), wound around a center in the lower left; its outer turn enters from the left edge, sweeps over the top and right, and runs along the bottom and left edges.',
    types: ['houdini_icon'],
    refKey: 'labs::houdini_icon',
    render: (uid) => {
      const spiral =
        'M-0.8 9.1C-0.08 8.67 2.12 7.03 3.5 6.5C4.88 5.97 6.17 5.91 7.5 5.95C8.83 5.99 10.18 6.19 11.5 6.75C12.82 7.31 14.37 8.34 15.4 9.3C16.43 10.26 17.25 11.55 17.7 12.5C18.15 13.45 18.13 14.02 18.1 15C18.07 15.98 17.92 17.37 17.5 18.4C17.08 19.43 16.43 20.38 15.6 21.2C14.77 22.02 13.68 22.85 12.5 23.3C11.32 23.75 9.83 23.97 8.5 23.9C7.17 23.83 5.6 23.47 4.5 22.9C3.4 22.33 2.47 21.48 1.9 20.5C1.33 19.52 1.17 18.12 1.1 17C1.03 15.88 1.15 14.63 1.5 13.8C1.85 12.97 2.45 12.48 3.2 12C3.95 11.52 4.95 11.03 6 10.9C7.05 10.77 8.48 10.88 9.5 11.2C10.52 11.52 11.6 12.17 12.1 12.8C12.6 13.43 12.57 14.23 12.5 15C12.43 15.77 12.25 16.8 11.7 17.4C11.15 18 10 18.43 9.2 18.6C8.4 18.77 7.45 18.63 6.9 18.4C6.35 18.17 5.95 17.6 5.9 17.2C5.85 16.8 6.48 16.2 6.6 16';
      return (
        <>
          <defs>
            {/* The spiral is a true cutout so the node color shows through, like the original logo */}
            <mask id={`${uid}-cut`}>
              <rect x="-2" y="-2" width="28" height="28" fill="#ffffff" />
              <path d={spiral} fill="none" stroke="#000000" strokeWidth="2.8" strokeLinecap="round" />
            </mask>
          </defs>
          <g transform="translate(12 12) scale(0.8) translate(-12 -12)">
            <g mask={`url(#${uid}-cut)`}>
              <rect x="0" y="0" width="24" height="24" fill="#f26b21" />
              <rect x="0.6" y="0.6" width="22.8" height="22.8" fill="none" stroke="#262626" strokeWidth="1.2" />
            </g>
          </g>
        </>
      );
    },
  },
  {
    id: 'labs.mesh_sharpen',
    label: 'Labs Mesh Sharpen',
    family: 'labs',
    description: 'Orange disc with a sharp teal crescent sliced along its top-right edge.',
    types: ['mesh_sharpen'],
    refKey: 'labs::mesh_sharpen',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-disc`}>
            <circle cx="12" cy="12" r="9.5" />
          </clipPath>
        </defs>
        <circle cx="12" cy="12" r="9.5" fill="#f2711c" />
        <path d="M7 1.5C12 6 17 8.5 22.5 15V0H7Z" fill="#14a5b4" clipPath={`url(#${uid}-disc)`} stroke="#262626" strokeWidth="1" />
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="#262626" strokeWidth="1.2" />
      </>
    ),
  },
  {
    id: 'labs.mesh_slice',
    label: 'Labs Mesh Slice',
    family: 'labs',
    description:
      'One orange rounded block cut into six pieces by narrow gaps: three tall pieces on top and three shorter ones below; only the block corners are rounded.',
    types: ['mesh_slice'],
    refKey: 'labs::mesh_slice',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-block`}>
            <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-block)`} fill="#f2711c" stroke="#262626" strokeWidth="0.9">
          {[2.5, 9.23, 15.97].flatMap((x) =>
            [
              [2.5, 10.5],
              [14.2, 7.3],
            ].map(([y, h]) => <rect key={`${x}-${y}`} x={x} y={y} width="5.53" height={h} />),
          )}
        </g>
        <rect x="2.5" y="2.5" width="19" height="19" rx="3" fill="none" stroke="#262626" strokeWidth="1" />
      </>
    ),
  },
  {
    id: 'labs.path_deform',
    label: 'Labs Path Deform',
    family: 'labs',
    description:
      'A chain of overlapping coin-like discs climbing diagonally from the bottom-left (dark teal, teal, light teal) to an orange disc at the top-right, threaded by a white S-curve.',
    types: ['path_deform'],
    refKey: 'labs::path_deform',
    render: () => (
      <>
        {(
          [
            [9, 16.5, '#0b4f55'],
            [10.6, 13.4, '#0d6e78'],
            [12.6, 10.4, '#14a5b4'],
            [16.2, 6.6, '#f2711c'],
          ] as const
        ).map(([cx, cy, fill]) => (
          <ellipse key={cx} cx={cx} cy={cy} rx="3.6" ry="3.4" fill={fill} stroke="#262626" strokeWidth="0.9" />
        ))}
        <path d="M2.5 18.5C5.5 22.5 8.5 14 11 11C13.5 8 17.5 6.5 21 11" fill="none" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
        <path d="M2.5 18.5C5.5 22.5 8.5 14 11 11C13.5 8 17.5 6.5 21 11" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'labs.polydeform',
    label: 'Labs PolyDeform',
    family: 'labs',
    description: 'Bent orange capsule inside a blue lattice cage (blue lines with blue corner points).',
    types: ['polydeform'],
    refKey: 'labs::polydeform',
    render: () => (
      <>
        <path d="M9 3.5C12 2.5 14.5 4 14 7C13.6 9.5 11.5 11 12 14C12.5 17 15.5 18 14.5 20.5C13.5 22 9.5 21.5 8.6 19.5C7.6 17 9.5 14.5 9 12C8.5 9.5 6.5 8 7 5.5C7.3 4.4 8 3.8 9 3.5Z" fill="#f2711c" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <g fill="none" stroke="#2e64b0" strokeWidth="0.9">
          <path d="M6 2.5L15.5 2L16.5 11.5L17 21.5L7.5 22L6.5 12Z" />
          <path d="M6.5 12L16.5 11.5M10.8 2.2L11.5 11.8L12.2 21.7" />
        </g>
        {[
          [6, 2.5],
          [15.5, 2],
          [16.5, 11.5],
          [17, 21.5],
          [7.5, 22],
          [6.5, 12],
          [11.5, 11.8],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.1" fill="#2e64b0" stroke="#262626" strokeWidth="0.5" />
        ))}
      </>
    ),
  },
  {
    id: 'labs.polyslice',
    label: 'Labs PolySlice',
    family: 'labs',
    description: 'Loaf of bread cut into slices: two orange slices behind a white front slice with an orange crust.',
    types: ['polyslice'],
    refKey: 'labs::polyslice',
    render: () => {
      const slice = 'M3 20V11.5C1.5 10.5 1.5 6 5.5 5.5H12.5C16.5 6 16.5 10.5 15 11.5V20Z';
      return (
        <>
          <path d={slice} transform="translate(5.5 -2)" fill="#f2711c" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
          <path d={slice} transform="translate(2.8 -1)" fill="#f2711c" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
          <path d={slice} fill="#f2711c" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
          <path d="M4.4 19V11C3.2 10.2 3.2 7.2 5.8 6.9H12.2C14.8 7.2 14.8 10.2 13.6 11V19Z" fill="#fff6e8" />
        </>
      );
    },
  },
  {
    id: 'labs.progressive_resample',
    label: 'Labs Progressive Resample',
    family: 'labs',
    description: 'Dark looping curve with orange sample points spread along it, placed progressively along its length.',
    types: ['progressive_resample'],
    refKey: 'labs::progressive_resample',
    render: () => (
      <>
        <path d="M5 18C2.5 15 3 9.5 6 9C9.5 8.5 9 14 12 15.5C15.5 17 17.5 12 15.5 9C14 6.5 16 3.5 19 4.5" fill="none" stroke="#1e1e1e" strokeWidth="1.5" strokeLinecap="round" />
        {[
          [5, 18],
          [3.4, 12],
          [7.6, 10.4],
          [12, 15.5],
          [16.2, 12],
          [15.4, 6.6],
          [19, 4.5],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="#f2711c" stroke="#262626" strokeWidth="0.8" />
        ))}
      </>
    ),
  },
  {
    id: 'labs.repair',
    label: 'Labs Repair',
    family: 'labs',
    description: 'Orange adhesive bandage lying diagonally, with a white center pad dotted in orange.',
    types: ['repair'],
    refKey: 'labs::repair',
    render: () => (
      <g transform="rotate(-45 12 12)">
        <rect x="1.5" y="8" width="21" height="8" rx="4" fill="#f2711c" stroke="#262626" strokeWidth="1.1" />
        <rect x="8" y="8" width="8" height="8" fill="#ffffff" stroke="#262626" strokeWidth="0.9" />
        {[
          [10, 10],
          [14, 10],
          [10, 14],
          [14, 14],
          [12, 12],
        ].map(([cx, cy]) => (
          <rect key={`${cx}-${cy}`} x={cx - 0.9} y={cy - 0.9} width="1.8" height="1.8" fill="#f2711c" />
        ))}
      </g>
    ),
  },
  {
    id: 'labs.sine_wave',
    label: 'Labs Sine Wave',
    family: 'labs',
    description: 'Oscilloscope: light grey bezel around a dark green screen with faint grid lines and a bright green sine wave.',
    types: ['sine_wave'],
    refKey: 'labs::sine_wave',
    render: () => (
      <>
        <rect x="2" y="3" width="20" height="18" rx="3" fill="#dfe4ea" stroke="#262626" strokeWidth="1.2" />
        <rect x="4.2" y="5.2" width="15.6" height="13.6" rx="1.2" fill="#2f3d2a" stroke="#262626" strokeWidth="0.9" />
        <path d="M12 5.2V18.8M4.2 12H19.8" stroke="#5a6f50" strokeWidth="0.6" />
        <path d="M4.6 12C6.5 5 9.5 5 12 12C14.5 19 17.5 19 19.4 12" fill="none" stroke="#8cf04a" strokeWidth="1.5" />
      </>
    ),
  },
  {
    id: 'labs.spiral',
    label: 'Labs Spiral',
    family: 'labs',
    description: 'Orange spiral curve (dark casing) winding out from the center.',
    types: ['spiral'],
    refKey: 'labs::spiral',
    render: () => {
      const d = 'M12.5 12C12.5 11 11 10.8 10.6 11.8C10 13.4 12 14.8 13.6 14C15.8 13 15.8 9.6 13.6 8.4C10.6 6.8 7 8.8 7 12.4C7 16.4 11.4 18.8 15.2 17.6C19.6 16.2 21 10.6 18.4 6.8C15.4 2.6 8.6 2.4 5 6.2';
      return (
        <>
          <path d={d} fill="none" stroke="#262626" strokeWidth="3.4" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#f2711c" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    },
  },
  {
    id: 'labs.split_prim_by_normal',
    label: 'Labs Split Primitives by Normal',
    family: 'labs',
    description:
      'Two slanted parallelogram faces side by side with a narrow gap (teal on the left, orange on the right) and a small white triangle above the gap pointing down into it.',
    types: ['split_prim_by_normal'],
    refKey: 'labs::split_prim_by_normal',
    render: () => (
      <>
        <polygon points="5,8.5 12.4,8.5 10,17 2.6,17" fill="#14a5b4" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        <polygon points="13.4,8.5 21.8,8.5 19.4,17 11,17" fill="#f2711c" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        <polygon points="11.6,4.4 15.2,4.4 13.4,7.4" fill="#ffffff" stroke="#262626" strokeWidth="0.8" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'labs.straight_skeleton_2D',
    label: 'Labs Straight Skeleton 2D',
    family: 'labs',
    description: 'Large orange serif letter S with a thin dark edge.',
    types: ['straight_skeleton_2D'],
    refKey: 'labs::straight_skeleton_2D',
    render: () => (
      <text
        x="12"
        y="20.6"
        textAnchor="middle"
        fill="#f2711c"
        stroke="#262626"
        strokeWidth="0.6"
        paintOrder="stroke"
        fontSize="23"
        fontFamily="serif"
      >
        S
      </text>
    ),
  },
  {
    id: 'labs.straight_skeleton_3d',
    label: 'Labs Straight Skeleton 3D',
    family: 'labs',
    description:
      'Orange ball on top of a thick orange arch with two legs (like a rounded M), a thin white line running along the inside of the arch.',
    types: ['straight_skeleton_3d'],
    refKey: 'labs::straight_skeleton_3d',
    render: () => {
      const arch = 'M5 21C5 16 3.2 11 7 10.4C9.6 10 10 12.2 12 12.2C14 12.2 14.4 10 17 10.4C20.8 11 19 16 19 21';
      return (
        <>
          <circle cx="12" cy="7" r="4.6" fill="#f2711c" stroke="#262626" strokeWidth="1" />
          <path d={arch} fill="none" stroke="#262626" strokeWidth="5.4" strokeLinejoin="round" />
          <path d={arch} fill="none" stroke="#f2711c" strokeWidth="3.8" strokeLinejoin="round" />
          <path d={arch} fill="none" stroke="#ffffff" strokeWidth="0.9" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'labs.sweep_geometry',
    label: 'Labs Sweep Geometry',
    family: 'labs',
    description: 'Thick white wavy arrow (dark outline) sweeping from the bottom-left up to the top-right.',
    types: ['sweep_geometry'],
    refKey: 'labs::sweep_geometry',
    render: () => {
      const d = 'M4 20L8.5 15.5C11 13 8 10 10.5 7.5C12.5 5.5 14.5 8 17 6';
      return (
        <>
          <path d={d} fill="none" stroke="#262626" strokeWidth="5" strokeLinejoin="round" />
          <path d={d} fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinejoin="round" />
          <polygon points="21.5,3.5 15.5,2.8 18.6,9" fill="#ffffff" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'labs.testgeometry_heads',
    label: 'Labs Test Geometry: Luiz / Paul',
    family: 'labs',
    description:
      'Generic test head (Houdini shows a photo of a real person here; never recreate likenesses): shaded grey head and shoulders bust with a dark outline.',
    types: ['testgeometry_luiz', 'testgeometry_paul'],
    refKey: 'labs::testgeometry_luiz',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-clay`} cx="38%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b4bcc8" />
            <stop offset="100%" stopColor="#6f7782" />
          </radialGradient>
        </defs>
        <path d="M3.5 21.5C4 17 7 15 12 15C17 15 20 17 20.5 21.5Z" fill={`url(#${uid}-clay)`} stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M10 13.5V15.6H14V13.5Z" fill="#9aa2ae" stroke="#262626" strokeWidth="0.9" />
        <ellipse cx="12" cy="9" rx="4.8" ry="5.8" fill={`url(#${uid}-clay)`} stroke="#262626" strokeWidth="1.1" />
      </>
    ),
  },
  {
    id: 'labs.thicken',
    label: 'Labs Thicken',
    family: 'labs',
    description: 'Flat orange slab (dark outline) pierced by a teal double-headed vertical arrow showing the added thickness.',
    types: ['thicken'],
    refKey: 'labs::thicken',
    render: () => (
      <>
        <rect x="2.5" y="9" width="19" height="6" fill="#f2711c" stroke="#262626" strokeWidth="1.2" />
        <path d="M12 5.5V18.5" stroke="#262626" strokeWidth="3.2" />
        <path d="M12 5.5V18.5" stroke="#14a5b4" strokeWidth="1.8" />
        <polygon points="12,1.8 9,5.8 15,5.8" fill="#14a5b4" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        <polygon points="12,22.2 9,18.2 15,18.2" fill="#14a5b4" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'labs.triplanar_displace',
    label: 'Labs Triplanar Displace',
    family: 'labs',
    description:
      'Pie chart with one slice missing: a dark orange wedge across the top, a teal wedge from the bottom around the left side, and an empty gap at the bottom-right.',
    types: ['triplanar_displace'],
    refKey: 'labs::triplanar_displace',
    render: () => (
      <>
        <path d="M12 12L11.17 21.46A9.5 9.5 0 0 1 7.99 3.39Z" fill="#14a5b4" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        <path d="M12 12L7.99 3.39A9.5 9.5 0 0 1 21.46 11.17Z" fill="#d95c12" stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'labs.voxelmesh',
    label: 'Labs Voxel Mesh',
    family: 'labs',
    description: 'Light hexagonal voxel frame with a smaller three-tone grey cube sitting inside it.',
    types: ['voxelmesh'],
    refKey: 'labs::voxelmesh',
    render: () => (
      <>
        <polygon points="12,2 20.5,7 20.5,17 12,22 3.5,17 3.5,7" fill="#eef2f7" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="12,5.5 17.5,8.7 17.5,15.3 12,18.5 6.5,15.3 6.5,8.7" fill="#c0c7d1" stroke="#262626" strokeWidth="0.8" strokeLinejoin="round" />
        <polygon points="12,8 15.5,10 12,12 8.5,10" fill="#eef2f7" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        <polygon points="8.5,10 12,12 12,16 8.5,14" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        <polygon points="15.5,10 12,12 12,16 15.5,14" fill="#89929e" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
      </>
    ),
  },
];
