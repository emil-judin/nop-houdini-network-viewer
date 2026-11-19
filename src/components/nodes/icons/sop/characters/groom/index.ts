import type { OperatorIconDef } from '../../../iconTypes';
import { GUIDE_SHAPING_ICONS } from './guideShaping';
import { GUIDE_PROCESSING_ICONS } from './guideProcessing';
import { GROOM_FLOW_ICONS } from './groomFlow';
import { HAIR_ICONS } from './hair';

/**
 * Groom, guide and hair operators.
 */
export const GROOM_ICONS: OperatorIconDef[] = [
  ...GUIDE_SHAPING_ICONS,
  ...GUIDE_PROCESSING_ICONS,
  ...GROOM_FLOW_ICONS,
  ...HAIR_ICONS,
];
