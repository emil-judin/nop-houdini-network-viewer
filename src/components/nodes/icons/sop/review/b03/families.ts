import type { OperatorIconDef } from '../../../iconTypes';
import { FAMILY_TOPO } from './famTopo';
import { FAMILY_WIRE } from './famWire';

/**
 * Batch 3 families drawn after the pilot with the family-first icon workflow
 * (`docs/ICON_ART_BIBLE.md` section 9). These ids were removed from the older Batch 3 draft parts.
 */
export const REVIEW_BATCH_03_FAMILIES: OperatorIconDef[] = [...FAMILY_TOPO, ...FAMILY_WIRE];
