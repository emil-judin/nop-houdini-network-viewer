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
   SideFX Labs). You may inspect reference SVGs to understand their composition and shapes, but never copy SideFX or
   vendor SVG data, never trace their icons, and never draw real people. Vendor logos used by Labs integrations are
   redrawn by hand (decision 0003 in `docs/decisions/`).
3. SideFX reference icons stay in the gitignored `local-refs/` folder and are only served by the dev server
   (Icon Review Gallery). Never move them to `public/` or into a build.
4. No `<image>`, `<style>`, `<filter>`, `<foreignObject>` or external `href`; gradient and clip ids use the `uid`
   prefix passed to `render`.
5. Labs drawings load on demand (`loadLabsIcons`): keep them in the `labs/` folder and out of the SOP files.
6. Follow the four-stage workflow of the art bible (section 9) for every batch, never a blind large batch:
   - **Family micro-batch:** 5 to 12 icons clustered by what their references look like, one family per file,
     shared kit written first and reused unchanged.
   - **Stage 1, spec before code:** look at each reference image and write metaphor, projection (flat, 2:1
     isometric or 3/4 tilted), layers, palette tokens, kit and badge slot and casing plan. Never draw from the
     operator name or an old description; Redo exports mark old descriptions as possibly wrong.
   - **Stage 2, geometry helpers:** use `icons/geoHelpers.ts` and `icons/geoKits.tsx` (isometric boxes, tilted
     tori, ellipses, arrowheads, gears, cased strokes, shaded spheres, corner badges) instead of typed coordinates.
   - **Stage 3, pre-screen:** `npm.cmd run icons:prescreen -- --ids sop.a,sop.b` (or `--set pilot`); fix every
     fail and look at every warning in `test-results/icon-prescreen/` (contact sheet and `report.md`).
   - **Stage 4, critic:** have a fresh-context agent that did not draw the icons judge the contact sheet against
     the references and the art bible; patch and re-screen until it accepts. Then add the batch to
     `REVIEW_ICONS` for the human review.
7. Check with `npm.cmd test` where the local test suite is present (`tests/unit/iconRegistry.test.ts`: lookups,
   completeness, forbidden elements) and in
   the Icon Review Gallery (`npm.cmd run dev`, then open the playground with `?icons`).
