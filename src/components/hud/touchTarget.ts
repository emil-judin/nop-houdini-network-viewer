/**
 * Grows a button to at least 44 x 44px on touch screens (coarse pointers) only, so desktop keeps
 * the compact Houdini-style HUD while phones and tablets get finger-sized tap targets.
 */
export const TOUCH_TARGET = '[@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11';

/**
 * For wide buttons in stacked rows that should look smaller on touch screens: 36px high, with an
 * invisible 4px tap margin above and below, so the tap area is still 44px high. Rows of these
 * buttons need at least 8px between them, so the tap areas do not overlap.
 */
export const TOUCH_TARGET_COMPACT =
  'relative [@media(pointer:coarse)]:h-9 [@media(pointer:coarse)]:before:absolute [@media(pointer:coarse)]:before:inset-x-0 [@media(pointer:coarse)]:before:-inset-y-1';
