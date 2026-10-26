import { parseOperatorType } from '../../../schema/operatorType';
import type { OperatorIconDef, OperatorIconQuery } from './iconTypes';
import { LABS_BUILTIN_ICON_ALIASES, LABS_ICONS } from './labs';
import { SOP_ATTRIBUTE_ICONS } from './sop/attributeIcons';
import { SOP_FLOW_ICONS } from './sop/flowIcons';
import { SOP_MODELING_ICONS } from './sop/modelingIcons';
import { SOP_PRIMITIVE_ICONS } from './sop/primitiveIcons';
import { DEFAULT_OPERATOR_ICON } from './defaultIcon';

/**
 * All built-in SOP icon drawings.
 */
export const SOP_ICONS: OperatorIconDef[] = [
  ...SOP_PRIMITIVE_ICONS,
  ...SOP_ATTRIBUTE_ICONS,
  ...SOP_MODELING_ICONS,
  ...SOP_FLOW_ICONS,
];

/**
 * Every registered operator icon drawing (built-in SOPs first, then SideFX Labs).
 */
export const OPERATOR_ICONS: OperatorIconDef[] = [...SOP_ICONS, ...LABS_ICONS];

const SUBNET_ICON_ID = 'sop.subnet';

const sopByType = new Map<string, OperatorIconDef>();
const labsByType = new Map<string, OperatorIconDef>();
const byIcon = new Map<string, OperatorIconDef>();
for (const def of OPERATOR_ICONS) {
  const typeMap = def.family === 'labs' ? labsByType : sopByType;
  // Keys are lowercased because queries are (some Houdini types use capitals, e.g. `straight_skeleton_2D`)
  for (const t of def.types) {
    typeMap.set(t.toLowerCase(), def);
  }
  for (const icon of def.icons ?? []) {
    byIcon.set(icon.toLowerCase(), def);
  }
}
for (const [labsType, sopIconId] of Object.entries(LABS_BUILTIN_ICON_ALIASES)) {
  const def = OPERATOR_ICONS.find((d) => d.id === sopIconId);
  if (def) labsByType.set(labsType.toLowerCase(), def);
}
const iconsWithMatchers = OPERATOR_ICONS.filter((def) => def.matches);
const subnetIcon = OPERATOR_ICONS.find((def) => def.id === SUBNET_ICON_ID) ?? DEFAULT_OPERATOR_ICON;

/**
 * Splits a Houdini operator type and icon id into the normalized lookup query.
 *
 * Examples: `labs::thicken::1.0` gives namespace `labs`, base type `thicken`;
 * `copytopoints::2.0` gives namespace `""`, base type `copytopoints`.
 */
export function parseOperatorIconQuery(type: string, icon = ''): OperatorIconQuery {
  return {
    ...parseOperatorType(type),
    baseIcon: icon.split('?')[0].toLowerCase(),
  };
}

/**
 * Maps a built-in icon id such as `sop_copytopoints-2.0` to its operator name (`copytopoints`).
 */
function sopIconToType(baseIcon: string): string | null {
  const match = /^sop_(.+?)(?:-\d+(?:\.\d+)*)?$/.exec(baseIcon);
  return match ? match[1] : null;
}

/**
 * Resolves the icon drawing for a Houdini operator.
 *
 * Lookup order: SideFX Labs drawing (by type, then by `opdef:/labs::Sop/...` icon), built-in SOP
 * drawing by exact type, exact icon id, `SOP_<type>` icon id, custom matchers, subnetwork
 * container, and finally the default emblem. All comparisons are exact (no substring matching).
 */
export function resolveOperatorIcon(
  type: string,
  icon = '',
  isSubnetwork = false,
): OperatorIconDef {
  const query = parseOperatorIconQuery(type, icon);

  if (query.namespace === 'labs') {
    const labsDef = labsByType.get(query.baseType);
    if (labsDef) return labsDef;
  }
  const labsIcon = /^opdef:\/labs::sop\/([^:?]+)/.exec(query.baseIcon);
  if (labsIcon) {
    const labsDef = labsByType.get(labsIcon[1]);
    if (labsDef) return labsDef;
  }

  const byType = sopByType.get(query.baseType);
  if (byType) return byType;

  const byExactIcon = byIcon.get(query.baseIcon);
  if (byExactIcon) return byExactIcon;

  const iconType = sopIconToType(query.baseIcon);
  const byIconType = iconType ? sopByType.get(iconType) : undefined;
  if (byIconType) return byIconType;

  const byMatcher = iconsWithMatchers.find((def) => def.matches?.(query));
  if (byMatcher) return byMatcher;

  if (isSubnetwork) return subnetIcon;

  return DEFAULT_OPERATOR_ICON;
}
