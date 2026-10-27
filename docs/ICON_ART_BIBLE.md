# Operator Icon Art Bible (`ICON_ART_BIBLE.md`)

> **Audience:** AI agents and human contributors who draw, redraw or review operator icons.
> **Goal:** every icon looks like it came from the same hand, reads instantly at node size, and stays legally clean.

---

## 1. What an Icon Is

Every operator node in the viewer shows a small icon centered in its body. Ours are **original drawings** that capture the *metaphor* of the matching SideFX Houdini (or SideFX Labs) icon in one consistent house style. They are never copies.

- Drawings live in the **icon registry**: `src/components/nodes/icons/`.
  - `sop/*.tsx`: built-in SOP operators (`sop.<type>` ids), grouped as primitive, attribute, modeling and flow icons.
  - `labs/*.tsx`: SideFX Labs operators (`labs.<type>` ids), grouped as flask, geometry, modeling, UV, world, FX and pipeline icons.
  - `defaultIcon.tsx`: the fallback emblem.
  - `iconRegistry.ts`: lookup (`resolveOperatorIcon`), `iconTypes.ts`: the `OperatorIconDef` contract.
- The **Icon Review Gallery** ("Icons Overview" tab, only in the dev server `npm.cmd run dev`, not in the hosted playground) shows every drawing with its description, the node types that use it, and the Houdini reference side by side.

---

## 2. Legal Rules (Non-Negotiable)

1. **Draw from scratch.** Look at the reference, then write your own SVG. Never copy, trace, convert or embed SideFX path data, gradients or files.
2. **References stay local.** Reference icons are built by `scripts/build_local_reference_icons.py` into the gitignored `local-refs/` folder and served only by the Vite dev server. Never commit them, never put them in `public/`, never bundle them.
3. **Vendor logos are redrawn, never copied.** When the reference icon is a vendor logo or wordmark (Labs integrations such as Substance, FBX, Rokoko, Neuron, GoZ, Sketchfab, Exoside, Gaea, ZibraVDB, AliceVision, Dem Bones, and the Houdini logo itself), redraw it by hand in the house style so the integration is recognizable, and mark the description with `(vendor logo, redrawn)`. Never paste or convert the vendor's SVG data. This is a project-owner decision (2026-10-25); the trademarks remain the property of their owners.
4. **No real people.** Some Labs icons are photos of people. Never recreate a likeness; use a generic figure or head bust.
5. Short text that appears in the reference (format names like `OBJ`, `OSM`, `FBX`, letters like `WFC`) may be reproduced as plain text.

---

## 3. Canvas and Size

| Property | Rule |
| --- | --- |
| viewBox | `0 0 24 24` (the wrapper `<svg>` is added by `OperatorIconGlyph`; `render` returns only children) |
| Rendered size | `21px` (default). Use `sizePx` 19 to 22 only to optically balance a very wide or very small silhouette. |
| Safe area | Keep shapes inside roughly `2..22` on both axes. Thin strokes may touch `1.5..22.5`. |
| Visual center | Center the silhouette's mass at `(12, 12)`. |
| Detail budget | About 3 to 12 primitives. If it needs more, simplify the metaphor. |
| Smallest feature | About `1.5` units across; strokes no thinner than `0.6`. Anything smaller vanishes at 21px. |

Always judge an icon at **real node size (about 20px) on the `#cccccc` node body**, not only enlarged.

---

## 4. Readability on Any Node Color

The default node body is light grey `#cccccc`, but users color nodes freely. Icons must read on all of them.

1. **Outline every filled shape** with `#262626`.
   - Main silhouette: `strokeWidth` `1.0` to `1.3`.
   - Inner details: `0.6` to `0.9`.
   - Use `strokeLinejoin="round"` on polygons and paths with corners.
2. **Case light strokes that can touch the node background.** Such a line is drawn twice: first a dark `#262626` stroke about `1.6x` to `2x` wider, then the light stroke on top. The same applies to colored lines that must read on the node (`labs.edge_smooth`, `sop.normal`). A light stroke that lies entirely on a saturated fill (the white waves on the orange `labs.flowmap` disc) needs **no** casing; casing it only makes the icon busy.
3. **No large pale fills without an outline.** Fills close to `#cccccc` (for example `#c0c7d1`, `#d0d6e0`) are allowed only inside a dark outline.
4. **Translucency is a special case.** Use `fillOpacity` only for "ghost" or "glass" metaphors (`sop.boolean`, `labs.box_clip`), and keep the dark outline.
5. **Text** only when the reference uses it: at most 4 characters per line, `fontSize` at least `5`. Match the reference's letterform (`sans-serif`, or `serif` when the reference is a serif letter such as `labs.straight_skeleton_2D`). Light text on a dark or colored band needs no outline; colored text directly on the node gets a thin dark edge (`stroke="#262626"` `strokeWidth` about `0.5` plus `paintOrder="stroke"`).

---

## 5. Palette

Use these exact values. New colors need a reason (and a line in this table).

### Core (built-in SOP icons)

| Token | Hex | Used for |
| --- | --- | --- |
| Outline | `#262626` | Every outline and casing |
| Grey top | `#eef2f7` | Lit top faces |
| Grey left | `#c0c7d1` | Left faces, metal |
| Grey right | `#89929e` | Shadowed right faces |
| Dark grey | `#3a3f47` / `#5a616b` | Panels, slots, dark parts |
| White | `#f2f4f7` / `#ffffff` | Paper, tags, highlights |
| Orange | `#ee8624` | Faces, planes, emphasis (core) |
| Red | `#e03228` | Deformation edges, arrows, deletion |
| Yellow | `#f2c438` / `#ffe47a` / `#d49a18` | Yellow solids (three-tone) |
| Blue | `#3672c4` / `#2e74c4` | Move arrows, bricks |
| Light blue | `#5aa2f2` / `#8fc2ff` | Curves, lenses |
| Green | `#58c848` / `#52d638` | Bounds, paths, axes |
| Cardboard | `#c89a5a` / `#a8783c` / `#7e5828`, tape `#e8c48a` | Digital asset box (`path.asset`, path bar only) |

### Labs Accent Palette (SideFX Labs icons)

Labs icons keep the recognizable Labs orange and teal, plus our outline rule.

| Token | Hex |
| --- | --- |
| Labs orange | `#f2711c` |
| Labs light orange | `#ffb066` / `#f58a3c` |
| Labs teal | `#14a5b4` |
| Labs dark teal | `#0d6e78` / `#0b4f55` |
| Labs light teal | `#5fd3c8` |

### Gradients

Gradients are allowed for round, shiny or soft forms only (spheres, balls, clay, glow). Always light from the **upper left**:

```tsx
<radialGradient id={`${uid}-ball`} cx="35%" cy="32%" r="65%">
  <stop offset="0%" stopColor="#ffffff" />
  <stop offset="55%" stopColor="#b4bcc8" />
  <stop offset="100%" stopColor="#5a616b" />
</radialGradient>
```

---

## 6. Form, Shading and Projection

- **Light** comes from the upper left.
- **Solids** use three tones: light top, mid left, dark right (see `sop.box`, the reference for all solids).
- **Projection** is simple isometric: edges at 2:1 (about `26.57` degrees). Example: a cube top face `12,3 20,7 12,11 4,7`.
- **Flat symbols** (arrows, tiles, signs) stay flat: no fake perspective.
- **Arrows**: shaft with casing, triangular head with a dark outline. Red for deform/direction, orange for Labs flow, teal for secondary flow.
- **Follow the reference's composition.** Keep the reference's main idea, layout, proportions and colors (cowboy hat for Wrangle, teacups for Merge, big letters for Attribute Value Replace, a serif S for Straight Skeleton 2D) and only drop details that do not survive at 21px. Do not reinterpret a reference into a different metaphor: in review, reinterpreted icons were rejected far more often than faithful ones. The house style (outlines, palette, shading) is the only thing we add.

### Exemplars

Study these before drawing. They were reviewed and approved as the house style:

- Solids: `sop.box`, `sop.xform`, `sop.block_end`, `sop.tube`
- Round and shiny: `sop.sphere`, `sop.copyxform`
- Flat symbols: `sop.split`, `sop.reverse`, `sop.circle`, `sop.groupcreate`
- Labs: `labs.flask`, `labs.flowmap`, `labs.building_generator`, `labs.trim_texture`

---

## 7. SideFX Labs Specifics

- **Generic flask.** About 100 Labs tools have no artwork of their own; Houdini shows the Labs flask. They map to `labs.flask` (rounded tile), `labs.flask_gradient` (older gradient tile) or `labs.flask_beta`. Add new flask-only tools to the `types` list of the matching flask; do not invent artwork Houdini does not show.
- **Built-in icon aliases.** Labs tools that Houdini draws with a built-in SOP icon are mapped in `LABS_BUILTIN_ICON_ALIASES` (`labs/index.ts`) to the existing `sop.*` drawing instead of a copy.
- **Coverage.** Every entry in `labs/labsNodeCatalog.ts` must resolve to a drawing other than `default`.

---

## 8. Code Conventions (`OperatorIconDef`)

```tsx
{
  id: 'labs.flowmap',                 // `sop.<type>` or `labs.<type>`, stable, shown in the gallery
  label: 'Labs Flowmap',              // human name (Labs: the Tab-menu label)
  family: 'labs',
  description:
    'Orange disc with three white flowing waves (dark casing).',
  types: ['flowmap'],                 // base types, namespace and version stripped
  refKey: 'labs::flowmap',            // key in local-refs (SOP icons use the Houdini icon id, e.g. `SOP_box`)
  render: (uid) => (
    <>
      ...                             // gradient/clip ids must be `${uid}-name`
    </>
  ),
},
```

- **Descriptions** describe the *drawing* (shapes, colors, positions) in one or two sentences, then optionally its meaning. They are how people request changes ("make `labs.flowmap` more like `sop.normal`"), so keep them accurate when you change a drawing. No em dashes or en dashes.
- **Matching** is exact. Use `types` and `icons`; use `matches` only for open-ended families (`*wrangle`). Never use substring matching on icon names.
- **SVG** uses React camelCase attributes, numbers as strings, no `<image>`, no filters or blur, no external references, no `<style>`.
- **Unique ids** come from `uid`; never hard-code a gradient or clip id.
- Keep each category file focused. Start a new category file before one grows past about 1,000 lines.

---

## 9. Workflow

1. **Build local references** (once per machine, or after a Houdini/Labs update):

   ```bash
   python scripts/build_local_reference_icons.py --hfs "<Houdini install>" --labs "<SideFX Labs package>"
   ```

   Add `--write-labs-catalog` to regenerate `labs/labsNodeCatalog.ts` for a new Labs version.
2. **Find the reference**: `npm.cmd run dev`, open **Icon Overview**, search for the node.
3. **Draw** the icon in the matching category file, following sections 3 to 8.
4. **Verify**: `npm.cmd run check`, then compare in the gallery at both sizes on the `#cccccc` node body.
5. **Review loop**: mark cards Keep/Redo, click **Copy Review Selection**, and paste it into chat. Redo lines include each icon's description so feedback can point at specific parts.

### Done Checklist

- [ ] Reads at about 20px on `#cccccc`, and still reads on a dark node color.
- [ ] Every filled shape outlined in `#262626`; light strokes cased.
- [ ] Palette colors only; lighting from the upper left; three-tone solids.
- [ ] Composition, proportions and colors follow the reference.
- [ ] No real people and no copied SideFX or vendor SVG data; redrawn vendor logos are marked `(vendor logo, redrawn)`.
- [ ] `id`, `label`, `types`, `refKey` and an accurate `description` filled in.
- [ ] Gradient and clip ids use `uid`.
- [ ] `npm.cmd run check` passes.
