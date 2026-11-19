import type { OperatorIconDef } from '../../iconTypes';
import { HEIGHTFIELD_CORE_ICONS } from './core';
import { HEIGHTFIELD_ERODE_ICONS } from './erode';
import { HEIGHTFIELD_MASK_ICONS } from './masks';
import { HEIGHTFIELD_LAYER_ICONS } from './layers';

/**
 * Heightfield (terrain) operators.
 */
export const SOP_TERRAIN_ICONS: OperatorIconDef[] = [
  ...HEIGHTFIELD_CORE_ICONS,
  ...HEIGHTFIELD_ERODE_ICONS,
  ...HEIGHTFIELD_MASK_ICONS,
  ...HEIGHTFIELD_LAYER_ICONS,
];
