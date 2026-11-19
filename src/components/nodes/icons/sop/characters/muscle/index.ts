import type { OperatorIconDef } from '../../../iconTypes';
import { MUSCLE_SETUP_ICONS } from './setup';
import { MUSCLE_SIMULATION_ICONS } from './simulation';

/**
 * Muscle operators.
 */
export const MUSCLE_ICONS: OperatorIconDef[] = [...MUSCLE_SETUP_ICONS, ...MUSCLE_SIMULATION_ICONS];
