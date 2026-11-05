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

/** WCAG relative luminance of `#f0f0f0`, the light title color. */
const LIGHT_TITLE_LUMINANCE = 0.871;

/**
 * WCAG relative luminance of a Houdini RGB tuple. Houdini colors are display values like CSS colors,
 * so each channel is linearized first (unlike the quick {@link houdiniRgbLuminance}).
 */
function houdiniRgbRelativeLuminance(color: HoudiniRgbColor): number {
  const linear = (value: number) => {
    const c = Math.max(0, Math.min(1, value));
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(color[0]) + 0.7152 * linear(color[1]) + 0.0722 * linear(color[2]);
}

/**
 * Black or light grey (`#f0f0f0`) text for a background in this Houdini color, whichever has the
 * higher contrast. Houdini's default grey box header keeps its black title; dark colors get light text.
 */
export function houdiniRgbTitleColor(background: HoudiniRgbColor): '#000000' | '#f0f0f0' {
  const luminance = houdiniRgbRelativeLuminance(background);
  const blackContrast = (luminance + 0.05) / 0.05;
  const lightContrast = (LIGHT_TITLE_LUMINANCE + 0.05) / (luminance + 0.05);
  return blackContrast >= lightContrast ? '#000000' : '#f0f0f0';
}
