import type { OperatorIconDef } from '../../iconTypes';
import { VOLUME_CORE_ICONS } from './core';
import { VOLUME_FILTER_ICONS } from './filters';
import { VOLUME_RASTERIZE_ICONS } from './rasterize';
import { VOLUME_SDF_ANALYSIS_ICONS } from './sdfAnalysis';
import { VOLUME_MOTION_PAINT_ICONS } from './motionPaint';
import { CLOUD_SKY_ICONS } from './cloudSky';

/**
 * Volume, VDB, cloud and sky operators.
 */
export const SOP_VOLUME_ICONS: OperatorIconDef[] = [
  ...VOLUME_CORE_ICONS,
  ...VOLUME_FILTER_ICONS,
  ...VOLUME_RASTERIZE_ICONS,
  ...VOLUME_SDF_ANALYSIS_ICONS,
  ...VOLUME_MOTION_PAINT_ICONS,
  ...CLOUD_SKY_ICONS,
];
