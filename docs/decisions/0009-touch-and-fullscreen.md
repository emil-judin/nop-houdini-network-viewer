# 0009: Touch: two fingers move the network, fullscreen replaces Fit

- **Status:** Accepted
- **Date:** 2026-10-29

## Context

On an emulated iPhone the example page showed the problems of a canvas inside a scrolling page: one finger on the viewer moved the network instead of the page, so visitors got stuck; the two-row header and the bottom sheet left little room for the network; and the start zoom cut node names off.

## Decision

- Embeds use two-finger panning on touch screens by default (`touch-pan="two-fingers"`), like map embeds: one finger scrolls the page, two fingers move and zoom the network, and a hint offers an **Open fullscreen** button. In fullscreen, and in the playground, one finger moves the network.
- The fullscreen button replaces Fit and is shown by default. Fit stays on `H` and on a double-click or double-tap on the empty canvas; entering and leaving fullscreen fits.
- The header is one row at every size. Narrow viewers (under 448px) hide the node count, group their tools in one settings menu and frame nodes with zoom at most 1.
- Where the Fullscreen API is missing for elements (iPhone Safari), a CSS full-viewport mode is used instead.

## Consequences

- A page with an embed always stays scrollable on a phone.
- Two-finger panning depends on `touch-action: pan-x pan-y`, which still needs a check on real devices.
- Hosts that want one-finger panning set `touch-pan="one-finger"`.
