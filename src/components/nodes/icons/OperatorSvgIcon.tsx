import React from 'react';
import { resolveOperatorIcon } from './iconRegistry';
import type { OperatorIconDef } from './iconTypes';

/**
 * Props for the MIT-licensed Houdini operator icon recreation component (`OperatorSvgIcon`).
 */
export interface OperatorSvgIconProps {
  /** Houdini operator type name (e.g. `attribwrangle`, `merge`, `labs::thicken::1.0`). */
  type: string;
  /** Houdini icon identifier string (e.g. `SOP_attribwrangle`). */
  icon?: string;
  /** Whether the node is a subnetwork container. */
  isSubnetwork?: boolean;
}

/**
 * Props for drawing one specific registered icon (`OperatorIconGlyph`).
 */
export interface OperatorIconGlyphProps {
  /** Registered icon drawing to render. */
  def: OperatorIconDef;
  /** Optional size override in pixels (defaults to the drawing's `sizePx`, then `21`). */
  sizePx?: number;
}

/**
 * Renders a registered icon drawing in its `0 0 24 24` viewBox with unique gradient/clip ids.
 */
export const OperatorIconGlyph: React.FC<OperatorIconGlyphProps> = ({ def, sizePx }) => {
  // Unique per-instance prefix for gradient and clip-path ids (many icons share one page)
  const uid = React.useId().replace(/:/g, '');
  const size = sizePx ?? def.sizePx ?? 21;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      {def.render(uid)}
    </svg>
  );
};

/**
 * Original, clean MIT-licensed vector recreations of SideFX Houdini and SideFX Labs operator icons.
 *
 * Each icon is hand-crafted from scratch to capture the silhouette and visual metaphor of
 * Houdini's operator iconography without redistributing any SideFX SVG files. Drawings live in
 * the icon registry (`iconRegistry.ts`) and follow `docs/ICON_ART_BIBLE.md`.
 */
export const OperatorSvgIcon: React.FC<OperatorSvgIconProps> = ({
  type,
  icon = '',
  isSubnetwork = false,
}) => <OperatorIconGlyph def={resolveOperatorIcon(type, icon, isSubnetwork)} />;
