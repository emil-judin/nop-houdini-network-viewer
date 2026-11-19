import type { OperatorIconDef } from '../../../iconTypes';
import { AGENT_DEFINITION_ICONS } from './definition';
import { AGENT_CROWD_ICONS } from './crowd';
import { CROWD_MOTION_PATH_ICONS } from './motionPaths';

/**
 * Agent and crowd operators.
 */
export const AGENT_ICONS: OperatorIconDef[] = [
  ...AGENT_DEFINITION_ICONS,
  ...AGENT_CROWD_ICONS,
  ...CROWD_MOTION_PATH_ICONS,
];
