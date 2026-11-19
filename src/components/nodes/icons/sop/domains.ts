import type { OperatorIconDef } from '../iconTypes';

/**
 * The SOP icon domains, in lookup order. Each domain is a separate download: the viewer loads only
 * the domains a network uses (see `iconIndex.generated.ts` and `loadSopIconDomains`).
 */
export const SOP_ICON_DOMAINS = [
  'attributes',
  'modeling',
  'io',
  'textures',
  'terrain',
  'volume',
  'simulation',
  'characters',
  'ml',
  'utility',
] as const;

/** One SOP icon domain folder (`sop/<domain>/`). */
export type SopIconDomain = (typeof SOP_ICON_DOMAINS)[number];

/**
 * Loads one domain's drawings. Every `import()` here becomes its own file in the builds; a new
 * domain folder needs an entry here, in `SOP_ICON_DOMAINS` and in `sop/index.ts`.
 */
export function loadSopIconDomain(domain: SopIconDomain): Promise<readonly OperatorIconDef[]> {
  switch (domain) {
    case 'attributes':
      return import('./attributes').then((m) => m.SOP_ATTRIBUTE_ICONS);
    case 'modeling':
      return import('./modeling').then((m) => m.SOP_MODELING_ICONS);
    case 'io':
      return import('./io').then((m) => m.SOP_IO_ICONS);
    case 'textures':
      return import('./textures').then((m) => m.SOP_TEXTURE_ICONS);
    case 'terrain':
      return import('./terrain').then((m) => m.SOP_TERRAIN_ICONS);
    case 'volume':
      return import('./volume').then((m) => m.SOP_VOLUME_ICONS);
    case 'simulation':
      return import('./simulation').then((m) => m.SOP_SIMULATION_ICONS);
    case 'characters':
      return import('./characters').then((m) => m.SOP_CHARACTER_ICONS);
    case 'ml':
      return import('./ml').then((m) => m.SOP_ML_ICONS);
    case 'utility':
      return import('./utility').then((m) => m.SOP_UTILITY_ICONS);
  }
}
