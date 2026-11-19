import type { OperatorIconDef } from '../../../iconTypes';
import { RBD_FRACTURE_ICONS } from './fracture';
import { RBD_CONSTRAINT_ICONS } from './constraints';
import { RBD_SIM_IO_ICONS } from './simIo';

/**
 * RBD operators.
 */
export const RBD_ICONS: OperatorIconDef[] = [...RBD_FRACTURE_ICONS, ...RBD_CONSTRAINT_ICONS, ...RBD_SIM_IO_ICONS];
