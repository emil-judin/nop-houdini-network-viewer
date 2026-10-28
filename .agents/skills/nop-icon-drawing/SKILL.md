---
name: nop-icon-drawing
description: >-
  Rules for drawing or changing NOP operator icons (src/components/nodes/icons/). Use whenever an icon file is
  created or edited, or an icon is requested for a Houdini or SideFX Labs node.
---

# Draw a NOP operator icon

1. Read [docs/ICON_ART_BIBLE.md](../../../docs/ICON_ART_BIBLE.md) first: style, palette, viewBox, legal rules and
   workflow are defined there.
2. Every icon is an original drawing registered as an `OperatorIconDef` (`sop/` for built-in SOPs, `labs/` for
   SideFX Labs). Never copy SideFX or vendor SVG data, never trace their icons, never draw real people. Vendor
   logos used by Labs integrations are redrawn by hand (owner decision).
3. SideFX reference icons stay in the gitignored `local-refs/` folder and are only served by the dev server
   (Icon Review Gallery). Never move them to `public/` or into a build.
4. No `<image>`, `<style>`, `<filter>`, `<foreignObject>` or external `href`; gradient and clip ids use the `uid`
   prefix passed to `render`.
5. Labs drawings load on demand (`loadLabsIcons`): keep them in the `labs/` folder and out of the SOP files.
6. Check in the Icon Review Gallery (`npm.cmd run dev`).
