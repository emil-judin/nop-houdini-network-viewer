import type { OperatorIconDef } from '../../iconTypes';
import { KINEFX_ICONS } from './kinefx';
import { APEX_ICONS } from './apex';
import { AGENT_ICONS } from './agents';
import { BONE_CAPTURE_ICONS } from './boneCapture';
import { SKIN_POSE_SPACE_ICONS } from './skinPoseSpace';
import { MUSCLE_ICONS } from './muscle';
import { TISSUE_ICONS } from './tissue';
import { GROOM_ICONS } from './groom';
import { FEATHER_ICONS } from './feather';

/**
 * Character operators: KineFX, APEX, agents and crowds, capture, muscle, tissue, groom and feathers.
 */
export const SOP_CHARACTER_ICONS: OperatorIconDef[] = [
  ...KINEFX_ICONS,
  ...APEX_ICONS,
  ...AGENT_ICONS,
  ...BONE_CAPTURE_ICONS,
  ...SKIN_POSE_SPACE_ICONS,
  ...MUSCLE_ICONS,
  ...TISSUE_ICONS,
  ...GROOM_ICONS,
  ...FEATHER_ICONS,
];
