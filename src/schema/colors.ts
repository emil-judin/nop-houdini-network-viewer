import type { HoudiniRgbColor } from './types';

/**
 * Converts a Houdini normalized RGB tuple `[r, g, b]` (`0.0..1.0`) to a CSS `rgb(...)` string.
 */
export function houdiniRgbToCss(
  color: HoudiniRgbColor | undefined,
  fallback = 'rgb(204, 204, 204)',
): string {
  if (!color || color.length < 3) {
    return fallback;
  }
  const r = Math.round(Math.max(0, Math.min(1, color[0])) * 255);
  const g = Math.round(Math.max(0, Math.min(1, color[1])) * 255);
  const b = Math.round(Math.max(0, Math.min(1, color[2])) * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Converts a Houdini normalized RGB tuple `[r, g, b]` (`0.0..1.0`) to a CSS `rgba(...)` string.
 */
export function houdiniRgbToRgbaCss(
  color: HoudiniRgbColor | undefined,
  alpha: number,
  fallback = 'rgba(130, 130, 130, 0.25)',
): string {
  if (!color || color.length < 3) {
    return fallback;
  }
  const r = Math.round(Math.max(0, Math.min(1, color[0])) * 255);
  const g = Math.round(Math.max(0, Math.min(1, color[1])) * 255);
  const b = Math.round(Math.max(0, Math.min(1, color[2])) * 255);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Multiplies a Houdini RGB tuple by `factor` (clamped to `0.0..1.0`) and returns a CSS `rgb(...)` string.
 * Used for the lighter and darker tones Houdini derives from a box or sticky note color.
 */
export function houdiniRgbScaledToCss(color: HoudiniRgbColor, factor: number): string {
  return houdiniRgbToCss([color[0] * factor, color[1] * factor, color[2] * factor]);
}

/**
 * Relative luminance (`0.0..1.0`) of a Houdini RGB tuple, used to pick dark or light label text.
 */
export function houdiniRgbLuminance(color: HoudiniRgbColor): number {
  return 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];
}
