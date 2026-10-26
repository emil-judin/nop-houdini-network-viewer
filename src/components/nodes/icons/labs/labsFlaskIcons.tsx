import type React from 'react';
import type { OperatorIconDef } from '../iconTypes';

/**
 * Shared white lab flask with orange bubbles, drawn inside the Labs tile.
 */
const Flask: React.FC = () => (
  <>
    <path
      d="M10.2 5.8V10L6 17.6C5.4 18.8 6.2 20 7.5 20H16.5C17.8 20 18.6 18.8 18 17.6L13.8 10V5.8Z"
      fill="#ffffff"
      stroke="#262626"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <rect x="8.6" y="4" width="6.8" height="1.9" rx="0.5" fill="#ffffff" stroke="#262626" strokeWidth="1" />
    <circle cx="10.4" cy="16.6" r="1.6" fill="#f2711c" />
    <circle cx="13.9" cy="17.7" r="1" fill="#f2711c" />
    <circle cx="12.6" cy="13.8" r="0.9" fill="#f2711c" />
  </>
);

/**
 * SideFX Labs tools that Houdini shows with the generic Labs flask (no dedicated artwork).
 */
export const LABS_FLASK_ICONS: OperatorIconDef[] = [
  {
    id: 'labs.flask',
    label: 'Labs Flask (generic)',
    family: 'labs',
    description:
      'Generic SideFX Labs tool: orange rounded tile with a dark outline holding a white lab flask (dark outline) with three orange bubbles.',
    types: [
      'convert_regions_to_curves_subutil', 'align_and_distribute', 'attribute_normalize_float',
      'attribute_normalize_vector', 'biome_attributes_evolve', 'biome_attributes_to_terrain',
      'biome_curve_label', 'biome_define', 'biome_definitions_file', 'biome_plant_define',
      'biome_plant_definitions_file', 'biome_plant_scatter', 'biome_region_assign',
      'building_from_patterns', 'calculate_thickness', 'capsule', 'chaotic_shapes', 'clean_seams',
      'cluster_refine', 'connect_polygon_neighbours', 'connectivity_and_segmentation',
      'cook_with_timeout', 'cylinder_generator', 'delete_small_parts', 'disc_generator',
      'distance_from_border', 'edge_damage', 'export_uv_wireframe', 'extract_filename',
      'fast_gaussian_curvature', 'fast_group_unshared', 'hexagon_grid', 'instance_attributes',
      'lod_create', 'loops_from_selection', 'mandelbulb_generator', 'merge_splines', 'min_max_average',
      'pathfinding_global', 'pcg_export', 'physical_ambient_occlusion', 'physics_painter',
      'polywire_uv', 'post_anim_deform', 'procedural_smoke', 'quad_sphere_generator', 'quadrangulate',
      'quick_basic_tree', 'radial_sort', 'random_selection', 'region_assignment_subutil',
      'regions_from_image', 'remove_inside_faces', 'rizomuv_optimize', 'rizomuv_processor',
      'rizomuv_rectangularize', 'rizomuv_unwrap', 'settlement_connections', 'simple_shapes',
      'snow_buildup', 'soften_normals', 'spectral_feature_extract', 'static_fracture_export',
      'straighten', 'superformula_shapes', 'terrain_analysis', 'terrain_layer_export',
      'terrain_layer_import', 'texel_density', 'trace_psd_file', 'tree_branch_generator',
      'tree_branch_placer', 'tree_controller', 'tree_leaf_generator', 'tree_simple_leaf',
      'tree_trunk_generator', 'udim_tile_number', 'unreal_groom_export', 'unreal_spline',
      'uv_remove_overlap', 'visualize_uvs', 'validate_geometry_type', 'vdb_transform_properties',
      'view_vertex_order', 'volume_adjust_look', 'wfc_initialize', 'wfc_sample_paint',
    ],
    refKey: 'labs::align_and_distribute',
    render: () => (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#f2711c" stroke="#262626" strokeWidth="1.2" />
        <Flask />
      </>
    ),
  },
  {
    id: 'labs.flask_gradient',
    label: 'Labs Flask (gradient tile)',
    family: 'labs',
    description:
      'Older generic Labs tool tile: square tile with a light-orange to orange gradient and the same white flask with orange bubbles.',
    types: [
      'kelvin_wakes_deformer', 'loop_volume', 'ml_cv_directory_import', 'ml_cv_keypoint_metadata',
      'ml_cv_label_metadata', 'ml_cv_promote_synth_attribute', 'ml_cv_rop_annotation_output',
      'ml_cv_texture_mask', 'ml_cv_vector_data', 'ml_cv_visualize_keypoints', 'tree_hierarchy',
      'visualize_vector',
    ],
    refKey: 'labs::kelvin_wakes_deformer',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-tile`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="100%" stopColor="#f2711c" />
          </linearGradient>
        </defs>
        <rect x="2.5" y="2.5" width="19" height="19" rx="1" fill={`url(#${uid}-tile)`} stroke="#262626" strokeWidth="1.2" />
        <Flask />
      </>
    ),
  },
  {
    id: 'labs.flask_beta',
    label: 'Labs Flask (beta)',
    family: 'labs',
    description:
      'Beta Labs tool: the orange flask tile with a smaller flask and a white BETA label (dark outline) along the bottom.',
    types: ['biome_curve_setup', 'biome_initialize', 'biome_profile'],
    refKey: 'labs::biome_initialize',
    render: () => (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#f2711c" stroke="#262626" strokeWidth="1.2" />
        <g transform="translate(3.6 -1.4) scale(0.7)">
          <Flask />
        </g>
        <text
          x="12"
          y="19.6"
          textAnchor="middle"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="1"
          paintOrder="stroke"
          fontSize="5.6"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          BETA
        </text>
      </>
    ),
  },
];
