import type { OperatorIconDef } from '../../iconTypes';
import { FILE_IO_ICONS } from './fileIo';
import { USD_ICONS } from './usd';
import { PACK_ICONS } from './pack';
import { FUNNEL_PACK_ICONS } from './funnelPack';

/**
 * Import, export, USD and packing operators.
 */
export const SOP_IO_ICONS: OperatorIconDef[] = [...FILE_IO_ICONS, ...USD_ICONS, ...PACK_ICONS, ...FUNNEL_PACK_ICONS];
