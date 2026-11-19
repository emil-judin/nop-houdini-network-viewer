---
name: nop-icon-drawing
description: >-
  Rules for NOP operator icons (src/components/nodes/icons/): where they live, their legal rules, and small fixes to
  live drawings. Use whenever an icon file is edited, or an icon is requested for a Houdini or SideFX Labs node.
---

# NOP operator icons

1. Read [docs/ICONS.md](../../../docs/ICONS.md): the registry layout and the legal rules.
2. This repository holds only finished drawings. **New icons and redraws are made in the nop-icon-pipeline
   repository** (a sibling checkout, `../nop-icon-pipeline`): it has the art bible, the Houdini references, the plan,
   the pre-screen, the review gallery and the go-live step that writes approved drawings into the domain folders
   here. When asked for a new icon, say so and point to that repository's `work/NEW_NODES_PROMPT.md` or
   `work/BATCH_PROMPT.md` instead of drawing it here.
3. Small fixes to a live drawing (a color, a 1px shift, a description) may be made here. Follow the art bible in the
   pipeline (`docs/ICON_ART_BIBLE.md` there) and check the result with its pre-screen and gallery, which render this
   repository's icons: `npm.cmd run icons:prescreen -- --ids <ids>` and `npm.cmd run dev` in the pipeline.
4. Never copy SideFX or vendor SVG data, never trace their icons, never draw real people. Vendor logos used by Labs
   integrations are redrawn by hand and marked `(vendor logo, redrawn)` (decision 0003). SideFX reference icons
   never enter this repository, `public/` or a build.
5. No `<image>`, `<style>`, `<filter>`, `<mask>`, `<foreignObject>` or external `href`; gradient and clip ids use the
   `uid` prefix passed to `render`. Labs drawings stay in `labs/` (they load on demand); a family file never imports
   from another family file (shared drawings go in `sop/kits/`).
6. After adding or removing a drawing, or changing its `types` or `icons`, run `npm.cmd run icons:index`: the viewer
   loads SOP drawings per domain through that generated index (`sop/iconIndex.generated.ts`, decision 0014).
7. Check with `npm.cmd run check`, `npm.cmd run lint` and `npm.cmd test` (`tests/unit/iconRegistry.test.ts`:
   lookups, completeness, forbidden elements), then the rest of the nop-verify definition of done.
