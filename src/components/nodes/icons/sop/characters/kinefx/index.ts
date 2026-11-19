import type { OperatorIconDef } from '../../../iconTypes';
import { KINEFX_JOINT_ICONS } from './joints';
import { KINEFX_POSE_ICONS } from './poses';
import { KINEFX_IK_RETARGET_ICONS } from './ikRetarget';
import { KINEFX_MOTION_CLIP_ICONS } from './motionClips';
import { KINEFX_FILE_IO_ICONS } from './fileIo';
import { KINEFX_CHARACTER_MOCAP_ICONS } from './characterMocap';
import { KINEFX_SECONDARY_CAPTURE_ICONS } from './secondaryCapture';

/**
 * KineFX operators.
 */
export const KINEFX_ICONS: OperatorIconDef[] = [
  ...KINEFX_JOINT_ICONS,
  ...KINEFX_POSE_ICONS,
  ...KINEFX_IK_RETARGET_ICONS,
  ...KINEFX_MOTION_CLIP_ICONS,
  ...KINEFX_FILE_IO_ICONS,
  ...KINEFX_CHARACTER_MOCAP_ICONS,
  ...KINEFX_SECONDARY_CAPTURE_ICONS,
];
