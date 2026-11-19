import type { OperatorIconDef } from '../iconTypes';
import { SOP_ICON_DOMAINS, type SopIconDomain } from './domains';
import { SOP_ATTRIBUTE_ICONS } from './attributes';
import { SOP_MODELING_ICONS } from './modeling';
import { SOP_IO_ICONS } from './io';
import { SOP_TEXTURE_ICONS } from './textures';
import { SOP_TERRAIN_ICONS } from './terrain';
import { SOP_VOLUME_ICONS } from './volume';
import { SOP_SIMULATION_ICONS } from './simulation';
import { SOP_CHARACTER_ICONS } from './characters';
import { SOP_ML_ICONS } from './ml';
import { SOP_UTILITY_ICONS } from './utility';

/**
 * All built-in SOP icon drawings by domain, loaded at once. For tools, tests and the icon index
 * generator only: the viewer never imports this file, it loads the domains it needs on demand
 * (`loadSopIconDomains` in `iconRegistry.ts`). Each domain folder holds one file per visual family
 * (a folder when the family was drawn in rounds); shared drawings live in `kits/`.
 */
export const SOP_ICONS_BY_DOMAIN: Record<SopIconDomain, readonly OperatorIconDef[]> = {
  attributes: SOP_ATTRIBUTE_ICONS,
  modeling: SOP_MODELING_ICONS,
  io: SOP_IO_ICONS,
  textures: SOP_TEXTURE_ICONS,
  terrain: SOP_TERRAIN_ICONS,
  volume: SOP_VOLUME_ICONS,
  simulation: SOP_SIMULATION_ICONS,
  characters: SOP_CHARACTER_ICONS,
  ml: SOP_ML_ICONS,
  utility: SOP_UTILITY_ICONS,
};

/** All built-in SOP icon drawings, in domain order (see `SOP_ICONS_BY_DOMAIN`). */
export const SOP_ICONS: OperatorIconDef[] = SOP_ICON_DOMAINS.flatMap((domain) => SOP_ICONS_BY_DOMAIN[domain]);
