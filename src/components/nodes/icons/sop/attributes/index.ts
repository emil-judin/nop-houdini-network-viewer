import type { OperatorIconDef } from '../../iconTypes';
import { ATTRIB_TAG_ICONS } from './attribTag';
import { GROUP_ICONS } from './group';
import { ATTRIB_ADJUST_ICONS } from './attribAdjust';
import { ATTRIB_OTHER_ICONS } from './attribOther';
import { ANALYSIS_ICONS } from './analysis';

/**
 * Attribute and group operators.
 */
export const SOP_ATTRIBUTE_ICONS: OperatorIconDef[] = [
  ...ATTRIB_TAG_ICONS,
  ...GROUP_ICONS,
  ...ATTRIB_ADJUST_ICONS,
  ...ATTRIB_OTHER_ICONS,
  ...ANALYSIS_ICONS,
];
