import type { OperatorIconDef } from '../iconTypes';
import { LABS_FLASK_ICONS } from './labsFlaskIcons';
import { LABS_FX_ICONS } from './labsFxIcons';
import { LABS_GEOMETRY_ICONS } from './labsGeometryIcons';
import { LABS_MODELING_ICONS } from './labsModelingIcons';
import { LABS_PIPELINE_ICONS } from './labsPipelineIcons';
import { LABS_UV_ICONS } from './labsUvIcons';
import { LABS_WORLD_ICONS } from './labsWorldIcons';

/**
 * All SideFX Labs icon drawings.
 */
export const LABS_ICONS: OperatorIconDef[] = [
  ...LABS_FLASK_ICONS,
  ...LABS_GEOMETRY_ICONS,
  ...LABS_MODELING_ICONS,
  ...LABS_UV_ICONS,
  ...LABS_WORLD_ICONS,
  ...LABS_FX_ICONS,
  ...LABS_PIPELINE_ICONS,
];

/**
 * SideFX Labs tools that Houdini draws with a built-in SOP icon: Labs base type to built-in icon id.
 */
export const LABS_BUILTIN_ICON_ALIASES: Record<string, string> = {
  sort: 'sop.sort',
  symmetrize: 'sop.mirror',
  group_by_attribute: 'sop.groupcreate',
  edge_group_to_polylines: 'sop.convertline',
};
