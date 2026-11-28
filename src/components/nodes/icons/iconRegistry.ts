import { parseOperatorType } from '../../../schema/operatorType';
import type { OperatorIconDef, OperatorIconQuery } from './iconTypes';
import { DEFAULT_OPERATOR_ICON } from './defaultIcon';
import { loadSopIconDomain, SOP_ICON_DOMAINS, type SopIconDomain } from './sop/domains';
import { SOP_ICON_INDEX } from './sop/iconIndex.generated';
import { sopIconToType } from './sop/iconIndexBuilder';

/**
 * Every registered operator icon drawing: the SOP domains loaded so far (in domain order), then the
 * SideFX Labs drawings once they are loaded. `loadAllOperatorIcons` fills it completely.
 */
export const OPERATOR_ICONS: OperatorIconDef[] = [];

const SUBNET_ICON_ID = 'sop.subnet';
const SOP_ID_PREFIX = 'sop.';

// Which domain holds each key, from the generated index (later domains win, like the drawings)
const typeDomain = new Map<string, SopIconDomain>();
const iconDomain = new Map<string, SopIconDomain>();
const idDomain = new Map<string, SopIconDomain>();
const matcherDomains: SopIconDomain[] = [];
const words = (list: string) => (list ? list.split(' ') : []);
for (const domain of SOP_ICON_DOMAINS) {
  const keys = SOP_ICON_INDEX[domain];
  for (const t of words(keys.types)) typeDomain.set(t, domain);
  for (const icon of words(keys.icons)) iconDomain.set(icon, domain);
  for (const id of words(keys.ids)) idDomain.set(id, domain);
  if (keys.matchers) matcherDomains.push(domain);
}

/** Lookup maps of one loaded SOP domain (keys are lowercased because queries are). */
interface DomainIcons {
  defs: readonly OperatorIconDef[];
  byType: Map<string, OperatorIconDef>;
  byIcon: Map<string, OperatorIconDef>;
  byId: Map<string, OperatorIconDef>;
  matchers: OperatorIconDef[];
}

const loadedDomains = new Map<SopIconDomain, DomainIcons>();
const loadingDomains = new Map<SopIconDomain, Promise<void>>();

const labsDefs: OperatorIconDef[] = [];
const labsByType = new Map<string, OperatorIconDef>();
const labsByIcon = new Map<string, OperatorIconDef>();
const labsMatchers: OperatorIconDef[] = [];
/** Labs base type to the id of the built-in SOP drawing Houdini uses for it. */
const labsAliases = new Map<string, string>();

/** Refills `OPERATOR_ICONS` in a fixed order, whatever order the downloads finished in. */
function refreshOperatorIcons(): void {
  OPERATOR_ICONS.length = 0;
  for (const domain of SOP_ICON_DOMAINS) {
    const loaded = loadedDomains.get(domain);
    if (loaded) OPERATOR_ICONS.push(...loaded.defs);
  }
  OPERATOR_ICONS.push(...labsDefs);
}

function registerSopDomain(domain: SopIconDomain, defs: readonly OperatorIconDef[]): void {
  if (loadedDomains.has(domain)) return;
  const icons: DomainIcons = { defs, byType: new Map(), byIcon: new Map(), byId: new Map(), matchers: [] };
  for (const def of defs) {
    // Some Houdini types use capitals, e.g. `straight_skeleton_2D`
    for (const t of def.types) icons.byType.set(t.toLowerCase(), def);
    for (const icon of def.icons ?? []) icons.byIcon.set(icon.toLowerCase(), def);
    icons.byId.set(def.id, def);
    if (def.matches) icons.matchers.push(def);
  }
  loadedDomains.set(domain, icons);
  refreshOperatorIcons();
}

/**
 * Downloads and registers SOP icon domains (each is a separate file). Safe to call many times; a
 * failed download is tried again on the next call.
 */
export function loadSopIconDomains(domains: Iterable<SopIconDomain>): Promise<void> {
  const pending: Promise<void>[] = [];
  for (const domain of new Set(domains)) {
    if (loadedDomains.has(domain)) continue;
    let loading = loadingDomains.get(domain);
    if (!loading) {
      loading = loadSopIconDomain(domain).then((defs) => registerSopDomain(domain, defs));
      loading.catch(() => loadingDomains.delete(domain));
      loadingDomains.set(domain, loading);
    }
    pending.push(loading);
  }
  return Promise.all(pending).then(() => undefined);
}

/** `true` when every given SOP icon domain is registered. */
export function areSopIconDomainsLoaded(domains: Iterable<SopIconDomain>): boolean {
  for (const domain of domains) {
    if (!loadedDomains.has(domain)) return false;
  }
  return true;
}

/** Domain of a SOP drawing id: listed in the index, or implied by the type it is named after. */
function domainOfId(id: string): SopIconDomain | undefined {
  if (!id.startsWith(SOP_ID_PREFIX)) return undefined;
  const key = id.slice(SOP_ID_PREFIX.length);
  return idDomain.get(key) ?? typeDomain.get(key);
}

/** A registered SOP drawing by key, looked up in the one domain that can hold it. */
function sopDef(kind: 'byType' | 'byIcon', key: string): OperatorIconDef | undefined {
  const domain = (kind === 'byType' ? typeDomain : iconDomain).get(key);
  return domain ? loadedDomains.get(domain)?.[kind].get(key) : undefined;
}

function sopDefById(id: string): OperatorIconDef | undefined {
  const domain = domainOfId(id);
  return domain ? loadedDomains.get(domain)?.byId.get(id) : undefined;
}

let labsLoaded = false;
let labsLoading: Promise<void> | null = null;

/**
 * Registers the SideFX Labs drawings. `aliases` maps Labs base types that Houdini draws with a
 * built-in SOP icon to that icon's id. Called by `loadLabsIcons`, or directly by code that bundles
 * the Labs drawings anyway (tests).
 */
export function registerLabsIcons(defs: readonly OperatorIconDef[], aliases: Readonly<Record<string, string>>): void {
  if (labsLoaded) return;
  labsLoaded = true;
  labsDefs.push(...defs);
  for (const def of defs) {
    for (const t of def.types) labsByType.set(t.toLowerCase(), def);
    for (const icon of def.icons ?? []) labsByIcon.set(icon.toLowerCase(), def);
    if (def.matches) labsMatchers.push(def);
  }
  for (const [labsType, sopIconId] of Object.entries(aliases)) labsAliases.set(labsType.toLowerCase(), sopIconId);
  refreshOperatorIcons();
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

/** Loads every drawing: all SOP domains and the Labs drawings (tools, tests, galleries). */
export function loadAllOperatorIcons(): Promise<void> {
  return Promise.all([loadSopIconDomains(SOP_ICON_DOMAINS), loadLabsIcons()]).then(() => undefined);
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

/** Labs base types to try for a query: its own type when namespaced `labs`, then an `opdef:/labs::Sop/...` icon. */
function labsCandidates(query: OperatorIconQuery): string[] {
  const candidates: string[] = [];
  if (query.namespace === 'labs') candidates.push(query.baseType);
  const labsIcon = /^opdef:\/labs::sop\/([^:?]+)/.exec(query.baseIcon);
  if (labsIcon) candidates.push(labsIcon[1]);
  return candidates;
}

/** A Labs drawing, or the built-in drawing Houdini uses for that Labs tool. */
function labsDef(labsType: string): OperatorIconDef | undefined {
  const aliasId = labsAliases.get(labsType);
  return (aliasId !== undefined ? sopDefById(aliasId) : undefined) ?? labsByType.get(labsType);
}

/**
 * Resolves the icon drawing for a Houdini operator from the drawings registered so far (see
 * `sopIconDomainsFor`: the viewer loads the needed domains before it draws a network).
 *
 * Lookup order: SideFX Labs drawing (by type, then by `opdef:/labs::Sop/...` icon), built-in SOP
 * drawing by exact type, exact icon id, `SOP_<type>` icon id, custom matchers, subnetwork
 * container, and finally the default emblem. All comparisons are exact (no substring matching).
 */
export function resolveOperatorIcon(type: string, icon = '', isSubnetwork = false): OperatorIconDef {
  const query = parseOperatorIconQuery(type, icon);

  for (const labsType of labsCandidates(query)) {
    const def = labsDef(labsType);
    if (def) return def;
  }

  const byType = sopDef('byType', query.baseType);
  if (byType) return byType;

  const byExactIcon = labsByIcon.get(query.baseIcon) ?? sopDef('byIcon', query.baseIcon);
  if (byExactIcon) return byExactIcon;

  const iconType = sopIconToType(query.baseIcon);
  const byIconType = iconType ? sopDef('byType', iconType) : undefined;
  if (byIconType) return byIconType;

  for (const domain of SOP_ICON_DOMAINS) {
    const byMatcher = loadedDomains.get(domain)?.matchers.find((def) => def.matches?.(query));
    if (byMatcher) return byMatcher;
  }
  const byLabsMatcher = labsMatchers.find((def) => def.matches?.(query));
  if (byLabsMatcher) return byLabsMatcher;

  if (isSubnetwork) return sopDefById(SUBNET_ICON_ID) ?? DEFAULT_OPERATOR_ICON;

  return DEFAULT_OPERATOR_ICON;
}

/**
 * The SOP icon domains `resolveOperatorIcon` needs for an operator, following the same lookup order
 * on the index instead of the drawings. Call it after the Labs drawings are registered when the
 * operator needs them (`needsLabsIcon`): Labs tools drawn with a built-in icon are found through
 * them. An operator without a drawing of its own needs the domains with custom matchers and the
 * subnetwork icon's domain.
 */
export function sopIconDomainsFor(type: string, icon = ''): SopIconDomain[] {
  const query = parseOperatorIconQuery(type, icon);

  for (const labsType of labsCandidates(query)) {
    const aliasId = labsAliases.get(labsType);
    const aliasDomain = aliasId !== undefined ? domainOfId(aliasId) : undefined;
    if (aliasDomain) return [aliasDomain];
    if (labsByType.has(labsType)) return [];
  }

  const byType = typeDomain.get(query.baseType);
  if (byType) return [byType];

  if (labsByIcon.has(query.baseIcon)) return [];
  const byExactIcon = iconDomain.get(query.baseIcon);
  if (byExactIcon) return [byExactIcon];

  const iconType = sopIconToType(query.baseIcon);
  const byIconType = iconType ? typeDomain.get(iconType) : undefined;
  if (byIconType) return [byIconType];

  const subnetDomain = domainOfId(SUBNET_ICON_ID);
  return subnetDomain ? [...matcherDomains, subnetDomain] : [...matcherDomains];
}
