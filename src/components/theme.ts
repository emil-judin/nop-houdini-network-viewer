import type { HoudiniRgbColor } from '../schema/types';

/**
 * Shared colors of the Houdini 22 Network Editor. Tailwind only sees class names written out in
 * full, so the matching background class is kept here as a literal next to the color.
 */

/** Network Editor canvas color. */
export const CANVAS_COLOR = '#242424';

/** `CANVAS_COLOR` as a Houdini RGB tuple (`0.0..1.0`), for blending node colors over the canvas. */
export const CANVAS_RGB: HoudiniRgbColor = [0x24 / 255, 0x24 / 255, 0x24 / 255];

/** Tailwind background class of `CANVAS_COLOR`. */
export const CANVAS_BG_CLASS = 'bg-[#242424]';

/** Houdini 22 default wire color (sampled from the Network Editor). */
export const WIRE_COLOR = '#7082b8';

/** Grid line color of the canvas background. */
export const GRID_LINE_COLOR = '#2c2c2c';
