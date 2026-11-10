# 0003: Original operator icons, no SideFX assets

- **Status:** Accepted
- **Date:** 2026-10-24, vendor logos 2026-10-25

## Context

Houdini shows an icon on every node, and a network without them is hard to read. The icons ship with Houdini and belong to SideFX. Copying, converting or embedding them would redistribute their artwork, and NOP is an independent project that must not look official.

## Decision

- Every icon is an original SVG drawing in one house style, defined in the [Icon Art Bible](../ICON_ART_BIBLE.md).
- The exporter only names the built-in icon a node uses. It never reads or embeds SideFX or Labs icon files. Only icons of the user's own assets are embedded.
- Houdini's icons may be looked at for composition while drawing, but they stay on the developer's machine and never enter the repository or a build.
- Vendor logos used by SideFX Labs integrations (Substance, FBX, Python, ...) are redrawn by hand so the integration stays recognizable. No likenesses of real people.

## Consequences

- Node types without a drawing fall back to a neutral default emblem, so icon coverage grows over time.
- New drawings need review against the art bible before they ship.
- The README and the playground carry a "not affiliated with SideFX" notice.
