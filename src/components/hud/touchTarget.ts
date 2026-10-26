/**
 * Grows a button to at least 44 x 44px on touch screens (coarse pointers) only, so desktop keeps
 * the compact Houdini-style HUD while phones and tablets get finger-sized tap targets.
 */
export const TOUCH_TARGET = '[@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11';
