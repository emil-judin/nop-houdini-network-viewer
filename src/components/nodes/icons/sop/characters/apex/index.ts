import type { OperatorIconDef } from '../../../iconTypes';
import { APEX_GRAPH_ICONS } from './graph';
import { APEX_RIG_ICONS } from './rig';
import { APEX_SCENE_ICONS } from './scene';

/**
 * APEX operators.
 */
export const APEX_ICONS: OperatorIconDef[] = [...APEX_GRAPH_ICONS, ...APEX_RIG_ICONS, ...APEX_SCENE_ICONS];
