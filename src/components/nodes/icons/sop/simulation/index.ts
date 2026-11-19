import type { OperatorIconDef } from '../../iconTypes';
import { NETWORK_ICONS } from './networks';
import { DOP_LOP_ICONS } from './dopLop';
import { FORCE_ICONS } from './forces';
import { PYRO_ICONS } from './pyro';
import { FLIP_ICONS } from './flip';
import { OCEAN_ICONS } from './ocean';
import { MPM_ICONS } from './mpm';
import { VELLUM_ICONS } from './vellum';
import { RBD_ICONS } from './rbd';
import { TET_ICONS } from './tet';

/**
 * Simulation operators: networks, solvers, Pyro, FLIP, ocean, MPM, Vellum, RBD and FEM.
 */
export const SOP_SIMULATION_ICONS: OperatorIconDef[] = [
  ...NETWORK_ICONS,
  ...DOP_LOP_ICONS,
  ...FORCE_ICONS,
  ...PYRO_ICONS,
  ...FLIP_ICONS,
  ...OCEAN_ICONS,
  ...MPM_ICONS,
  ...VELLUM_ICONS,
  ...RBD_ICONS,
  ...TET_ICONS,
];
