import type { OperatorIconDef } from '../../iconTypes';
import { UV_ICONS } from './uv';
import { MATERIAL_ICONS } from './material';

/**
 * UV, material and texture operators.
 */
export const SOP_TEXTURE_ICONS: OperatorIconDef[] = [...UV_ICONS, ...MATERIAL_ICONS];
