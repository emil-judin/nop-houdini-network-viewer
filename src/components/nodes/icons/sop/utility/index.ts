import type { OperatorIconDef } from '../../iconTypes';
import { FLOW_ICONS } from './flow';
import { BLOCK_ICONS } from './blocks';
import { TIME_ICONS } from './time';
import { CAMERA_VIEW_ICONS } from './cameraView';

/**
 * Utility operators: network flow, blocks, time and camera.
 */
export const SOP_UTILITY_ICONS: OperatorIconDef[] = [
  ...FLOW_ICONS,
  ...BLOCK_ICONS,
  ...TIME_ICONS,
  ...CAMERA_VIEW_ICONS,
];
