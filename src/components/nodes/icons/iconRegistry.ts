import { parseOperatorType } from '../../../schema/operatorType';
import type { OperatorIconDef, OperatorIconQuery } from './iconTypes';
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
 * Every registered operator icon drawing: the built-in SOPs, then the SideFX Labs drawings once
 * they are loaded (see `loadLabsIcons`).
 */
export const OPERATOR_ICONS: OperatorIconDef[] = [...SOP_ICONS];

const SUBNET_ICON_ID = 'sop.subnet';

const sopByType = new Map<string, OperatorIconDef>();
const labsByType = new Map<string, OperatorIconDef>();
const byIcon = new Map<string, OperatorIconDef>();
const iconsWithMatchers: OperatorIconDef[] = [];

/** Adds drawings to the lookup maps (keys are lowercased because queries are). */
function indexIcons(defs: readonly OperatorIconDef[]): void {
  for (const def of defs) {
    const typeMap = def.family === 'labs' ? labsByType : sopByType;
    // Some Houdini types use capitals, e.g. `straight_skeleton_2D`
    for (const t of def.types) {
      typeMap.set(t.toLowerCase(), def);
    }
    for (const icon of def.icons ?? []) {
      byIcon.set(icon.toLowerCase(), def);
    }
    if (def.matches) iconsWithMatchers.push(def);
  }
}

indexIcons(SOP_ICONS);
const subnetIcon = SOP_ICONS.find((def) => def.id === SUBNET_ICON_ID) ?? DEFAULT_OPERATOR_ICON;

let labsLoaded = false;
let labsLoading: Promise<void> | null = null;

/**
 * Registers the SideFX Labs drawings. `aliases` maps Labs base types that Houdini draws with a
 * built-in SOP icon to that icon's id. Called by `loadLabsIcons`, or directly by code that bundles
 * the Labs drawings anyway (the playground).
 */
export function registerLabsIcons(defs: readonly OperatorIconDef[], aliases: Readonly<Record<string, string>>): void {
  if (labsLoaded) return;
  labsLoaded = true;
  OPERATOR_ICONS.push(...defs);
  indexIcons(defs);
  for (const [labsType, sopIconId] of Object.entries(aliases)) {
    const def = SOP_ICONS.find((d) => d.id === sopIconId);
    if (def) labsByType.set(labsType.toLowerCase(), def);
  }
}

/**
 * `true` once the SideFX Labs drawings are registered. Before that, Labs nodes would show the
 * default emblem.
 */
export function areLabsIconsLoaded(): boolean {
  return labsLoaded;
}

/**
 * Loads the SideFX Labs drawings (a separate download, so networks without Labs nodes never fetch
 * them) and registers them. Safe to call many times.
 */
export function loadLabsIcons(): Promise<void> {
  if (labsLoaded) return Promise.resolve();
  labsLoading ??= import('./labs').then(({ LABS_ICONS, LABS_BUILTIN_ICON_ALIASES }) => {
    registerLabsIcons(LABS_ICONS, LABS_BUILTIN_ICON_ALIASES);
  });
  return labsLoading;
}

/** `true` when an operator needs the SideFX Labs drawings (`labs::` type or `opdef:/labs::` icon). */
export function needsLabsIcon(type: string, icon = ''): boolean {
  return /^labs::/i.test(type) || /^opdef:\/labs::/i.test(icon);
}

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
