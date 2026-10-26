import type React from 'react';

/**
 * Operator family an icon belongs to (used for gallery grouping and lookup order).
 * - `sop`: Built-in SideFX Houdini SOP operators.
 * - `labs`: SideFX Labs SOP operators (`labs::<name>::<version>`).
 * - `path`: Network path bar only (the `/obj` context, objects, digital assets without an icon).
 */
export type OperatorIconFamily = 'sop' | 'labs' | 'path';

/**
 * Normalized operator identity used to resolve an icon.
 */
export interface OperatorIconQuery {
  /** Operator namespace (e.g. `labs`), or an empty string for built-in operators. */
  namespace: string;
  /** Operator base type with namespace and version stripped (e.g. `copytopoints`, `thicken`). */
  baseType: string;
  /** Houdini icon id lowercased with any `?Section` suffix removed (e.g. `sop_copytopoints-2.0`). */
  baseIcon: string;
}

/**
 * One original, MIT-licensed operator icon drawing and the operators that use it.
 *
 * Every drawing lives in a `0 0 24 24` viewBox and must follow `docs/ICON_ART_BIBLE.md`.
 */
export interface OperatorIconDef {
  /** Stable registry id shown in the Icon Review Gallery (e.g. `sop.box`, `labs.thicken`). */
  id: string;
  /** Human-readable icon name (e.g. `Box`, `Labs Thicken`). */
  label: string;
  /** Operator family the icon belongs to. */
  family: OperatorIconFamily;
  /** Plain-language description of the drawing, used to discuss and request changes. */
  description: string;
  /** Base operator type names (namespace and version stripped) that use this icon. */
  types: string[];
  /** Extra exact Houdini icon ids (lowercase, no `?Section`) that use this icon. */
  icons?: string[];
  /** Optional custom matcher for operator families that cannot be listed exhaustively. */
  matches?: (query: OperatorIconQuery) => boolean;
  /** Key of the local-only Houdini reference image (see `scripts/build_local_reference_icons.py`). */
  refKey?: string;
  /** Rendered icon size in pixels inside the node body. Defaults to `21`. */
  sizePx?: number;
  /**
   * Draws the icon content (children of the `<svg viewBox="0 0 24 24">`).
   * `uid` is a per-instance prefix for gradient and clip-path ids.
   */
  render: (uid: string) => React.ReactNode;
}
