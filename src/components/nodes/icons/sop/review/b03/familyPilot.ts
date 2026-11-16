import type { OperatorIconDef } from '../../../iconTypes';
import { FAMILY_ATTRIB_ADJUST } from './famAttribAdjust';
import { FAMILY_UNPACK } from './famUnpack';

/**
 * Batch 3 pilot drawn with the family-first icon workflow (micro-batches grouped by visual
 * family, see `docs/ICON_ART_BIBLE.md` section 9). These ids were removed from the older Batch 3
 * draft parts.
 */
export const REVIEW_BATCH_03_PILOT: OperatorIconDef[] = [...FAMILY_ATTRIB_ADJUST, ...FAMILY_UNPACK];
