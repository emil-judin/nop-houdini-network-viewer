# NOP Operator Icon Brief for AI Generators

> **Audience:** an AI model that draws NOP operator icons as SVG, in rounds, without access to the repository.
> This is Part A of every request: the fixed rules. Each round adds a Part B with its task.
> It condenses [ICON_ART_BIBLE.md](./ICON_ART_BIBLE.md); when the two disagree, the art bible wins. The exemplar code in section 10 is generated from the icon registry and may be refreshed.

---

## 1. Your Goal

NOP is a web viewer for SideFX Houdini node networks. Every node shows a small icon in its body. NOP already has about 60 approved icons (attached as `nop-style-sheet.png`, code in section 10). You draw the missing ones.

**The top priority is stylistic identity.** Put a new icon next to the approved ones and a reviewer must not be able to tell which one is new. When a rule below and your own taste disagree, follow the rule. When the Houdini reference and the NOP style disagree, keep the reference's *idea and composition* and the NOP *style*.

You receive, per round: this brief, a task (Part B), `nop-style-sheet.png` (the approved NOP icons on light grey, dark grey and blue nodes) and a reference sheet of Houdini icons, each labelled with the id you are drawing.

---

## 2. The NOP House Style in Numbers

Measured over the approved icons. Stay inside these ranges.

| Trait | Approved icons |
| --- | --- |
| Primitives per icon | Median **5**, range 1 to 20. Aim for 3 to 8. |
| Silhouette outline | `#262626`, `stroke-width` **1.1 to 1.2** (1.0 to 1.3 allowed) |
| Inner detail lines | `stroke-width` **0.8 to 0.9** (0.6 to 1.0 allowed) |
| Casing under light strokes | dark stroke about 1.6 to 2 times the light stroke (for example 3.2 under 1.8) |
| Gradients | In 11 of 58 icons, only on round shiny forms (spheres, balls, gears), radial, lit from the upper left |
| Translucency | In 7 of 58 icons, only for ghost or glass ideas, always with a dark outline |
| Text | In 1 of 58 icons |
| Silhouette size | Fills the `2..22` box; most icons touch at least two edges of it |
| Accent colors | Usually one saturated accent (orange, red, blue or yellow) on greys and white |

**Translating a Houdini reference into the NOP style:**

| Houdini reference has | NOP draws |
| --- | --- |
| Soft glossy gradients on flat or angular objects | Three flat tones: light top, mid left, dark right |
| Drop shadows, glows, reflections, blur | Nothing. Remove them. |
| Photo-like texture (brain folds, cloud puffs, fabric, wood grain, water) | The outer silhouette plus 2 to 4 simple inner contour lines |
| Many repeated elements (tiles, crowds, particles) | 3 to 5 of them, or a grid of at most 4 by 4 |
| Hairline details | Removed, or thickened to at least `0.6` |
| Thin or no outline | Bold `#262626` outline on every filled shape |
| Ghosted copies (motion trails) | 2 or 3 copies with `fill-opacity` 0.35 to 0.6, each still outlined |
| Short text or numbers (`3.14`, `ab`, `.2`) | Kept as text, `font-size` at least 5 |

---

## 3. Legal Rules (Non-Negotiable)

1. **Draw from scratch.** You may inspect the reference SVGs and reference pictures to understand their composition, proportions and shapes, then write your own shapes on the 24 by 24 grid. Never trace, copy, convert or reproduce path data, gradients or files from SideFX or any vendor.
2. **Vendor logos are redrawn by hand** in the house style and the description ends with `(vendor logo, redrawn)`.
3. **No real people.** Never recreate a likeness; use a generic figure or head bust.
4. Short text from the reference (format names like `OBJ`, `FBX`, `USD`, numbers like `3.14`) may be reproduced as plain text.

---

## 4. Canvas

| Property | Rule |
| --- | --- |
| viewBox | `0 0 24 24` for icons and motifs, `0 0 10 10` for badges (section 8) |
| Rendered size | `21px` inside the node body |
| Safe area | Shapes inside about `2..22` on both axes; thin strokes may touch `1.5..22.5` |
| Visual center | Center the mass of the silhouette at `(12, 12)` |
| Smallest feature | About `1.5` units across; strokes at least `0.6` |

Judge every drawing at its **real size (about 20px) on a light grey `#cccccc` node body**, and make sure it still reads on dark grey and saturated blue nodes (as in `nop-style-sheet.png`).

---

## 5. Readability on Any Node Color

1. **Outline every filled shape** with `#262626` (widths in section 2). Use `stroke-linejoin="round"` on shapes with corners.
2. **Case light strokes** that can touch the node background: draw the line twice, first a `#262626` stroke about 1.6 to 2 times wider, then the light stroke on top. A light stroke that lies entirely on a saturated fill needs no casing; casing it only makes the icon busy.
3. **No large pale fills without an outline.** Fills close to `#cccccc` (for example `#c0c7d1`) are allowed only inside a dark outline.
4. **Translucency** (`fill-opacity`) only for ghost or glass ideas, and keep the dark outline.
5. **Text** only when the reference has it: at most 4 characters per line, `font-size` at least `5`, `font-family="sans-serif"` (or `serif` when the reference letter is serif). Light text on a dark or colored band needs no outline; colored text directly on the node gets `stroke="#262626"`, `stroke-width` about `0.5` and `paint-order="stroke"`.

---

## 6. Palette

Use these exact values. If a drawing truly needs a new color, name it and the reason in your answer (the owner adds it to the palette).

| Token | Hex | Used for |
| --- | --- | --- |
| Outline | `#262626` | Every outline and casing |
| Grey top | `#eef2f7` | Lit top faces |
| Grey left | `#c0c7d1` | Left faces, metal |
| Grey right | `#89929e` | Shadowed right faces |
| Dark grey | `#3a3f47` / `#5a616b` | Panels, slots, dark parts, dark badge discs |
| White | `#f2f4f7` / `#ffffff` | Paper, tags, highlights |
| Orange | `#ee8624` | Faces, planes, emphasis |
| Orange three-tone | `#ffb066` / `#ee8624` / `#c25e12` | Orange solids, especially on yellow nodes |
| Red | `#e03228` | Deformation edges, arrows, deletion |
| Yellow three-tone | `#ffe47a` / `#f2c438` / `#d49a18` | Yellow solids |
| Blue | `#3672c4` / `#2e74c4` | Move arrows, bricks, blue solids |
| Light blue | `#5aa2f2` / `#8fc2ff` | Curves, lenses, water, light blue faces |
| Green | `#58c848` / `#52d638` | Bounds, paths, axes, joints |

**Gradients** only for round, shiny or soft forms (spheres, balls, gears), always lit from the upper left, for example:

```svg
<radialGradient id="m-example-ball" cx="35%" cy="32%" r="65%">
  <stop offset="0%" stop-color="#ffffff"/>
  <stop offset="55%" stop-color="#b4bcc8"/>
  <stop offset="100%" stop-color="#5a616b"/>
</radialGradient>
```

---

## 7. Form and Composition

- **Light** comes from the upper left.
- **Solids** use three tones: light top, mid left, dark right (`sop.box` is the model for every solid).
- **Projection** is simple isometric with 2:1 edges (about 26.57 degrees). A cube top face is `12,3 20,7 12,11 4,7`.
- **Flat symbols** (arrows, tiles, signs) stay flat: no fake perspective.
- **Arrows**: cased shaft, triangular head with a dark outline. Red for deform or direction.
- **Follow the reference's composition.** Keep its main idea, layout, proportions and colors, and only drop details that vanish at 21px. Do **not** reinvent the metaphor: in review, reinterpreted icons were rejected far more often than faithful ones. The house style (outlines, palette, shading) is the only thing you add.
- Icons of one family (volumes, heightfields, KineFX, crowds) must look related when their references do. That is what motifs are for (section 8).

---

## 8. Motifs, Badges and Compositions

Many Houdini icons are one **base motif** (a cloud, a terrain, a figure) plus a small **badge** in a corner (a pencil, a gear, an arrow). NOP draws each motif and badge once and composes icons from them.

> **In the repository** the same idea is written as TSX, not `<symbol>` and `<use>`: a motif is a React component in a family kit (`familyKits.tsx`, `review/*/sharedElements.tsx`, `review/*/fam*.tsx`), a badge is a component such as `CornerBadge` or `CursorArrow` in `geoKits.tsx`, and math comes from `geoHelpers.ts`. The `<symbol>` format below is only the exchange format for generators without repository access; whoever imports such an answer converts each symbol into a kit component and each `<use>` into a component call. The full in-repo workflow (family micro-batches, spec, helpers, pre-screen, critic) is section 9 of the art bible.

**Motif:** a full-size drawing that also works as an icon on its own.

```svg
<symbol id="m-cloud" viewBox="0 0 24 24" data-name="Volume cloud" data-description="...">
  ...
</symbol>
```

- It must stay recognizable when a 10 by 10 badge covers its bottom-right corner.

**Badge:** a small modifier drawn on its own `0 0 10 10` grid. Its units are icon units, so the stroke widths of section 2 apply unchanged.

```svg
<symbol id="b-pencil" viewBox="0 0 10 10" data-name="Pencil" data-description="...">
  ...
</symbol>
```

- A badge sits on top of a motif, so it needs a closed silhouette with a `#262626` outline (1.0 to 1.2) that separates it from anything underneath.
- Keep a badge to 1 to 4 primitives.

**Composition:** an icon made of `<use>` elements, with optional extra shapes.

```svg
<svg id="sop.volumerasterize" viewBox="0 0 24 24" data-description="...">
  <use href="#m-cloud" width="24" height="24"/>
  <use href="#b-pencil" x="12" y="12" width="10" height="10"/>
</svg>
```

- **Badge slots:**
  - bottom-right `x="12" y="12"` (default)
  - top-right `x="12" y="2"`
  - top-left `x="2" y="2"`
  - bottom-left `x="2" y="12"`
- To make room, a motif may be shrunk or moved (`x`, `y`, `width`, `height` on its `<use>`, for example `x="-1" y="-1" width="20" height="20"`).
- A badge may be mirrored or rotated with `transform`, for example an import arrow turned around for export.
- A motif can also act as a large overlay in another icon (a folder over a terrain).

Ids:
- Motifs are `m-<name>`, badges `b-<name>`, icons the given `sop.<type>` id.
- Gradient and clip ids inside a symbol start with the symbol id (`m-cloud-shade`).

---

## 9. SVG Code Rules

- Plain SVG with standard attribute names (`stroke-width`, `stroke-linejoin`, `fill-opacity`, `stop-color`).
- Allowed elements: `symbol`, `use` (only `href="#..."` to a motif or badge of this set), `g`, `path`, `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, `text`, `defs`, `linearGradient`, `radialGradient`, `stop`, `clipPath`.
- Forbidden: `<image>`, `<style>`, `<filter>`, blur, masks, `<foreignObject>`, scripts, inline `style` attributes, any `href` that is not `#...`.
- Compact code: round coordinates to at most one decimal, prefer `polygon` and short paths, and put a shared outline style on a wrapping `<g>` (`<g stroke="#262626" stroke-width="1.2" stroke-linejoin="round">`) instead of repeating it on every shape.
- `data-description`: one or two sentences describing the drawing (shapes, colors, positions), then optionally its meaning. People use it to ask for changes, so it must match the drawing.
- Descriptions and comments use no em dashes and no en dashes: use hyphens, colons, parentheses or separate sentences.
- Return only what the task asks for: no preview layout, no explanations between the code, no repeated rules.

---

## 10. Approved Examples (Match These)

These are approved NOP icons. Your drawings sit next to them in the same network, so match their outline weights, palette, shading and level of detail. `sop.attribcreate`, `sop.attribdelete` and `sop.sort` also show the existing plus, red X and gear that new badges must resemble.

**`sop.box`** (Box): Isometric three-tone grey cube (light top, mid left, dark right) with dark outlines. The reference for all grey solids.

```svg
<svg viewBox="0 0 24 24">
  <polygon points="12,3 20,7 12,11 4,7" fill="#eef2f7" stroke="#262626" stroke-width="1.2"/>
  <polygon points="4,7 12,11 12,20.5 4,16.5" fill="#c0c7d1" stroke="#262626" stroke-width="1.2"/>
  <polygon points="20,7 12,11 12,20.5 20,16.5" fill="#89929e" stroke="#262626" stroke-width="1.2"/>
</svg>
```

**`sop.tube`** (Tube): Grey open cylinder with a darker top opening.

```svg
<svg viewBox="0 0 24 24">
  <path d="M6.5,6 V18 A5.5,2.2 0 0 0 17.5,18 V6" fill="#c2cad6" stroke="#262626" stroke-width="1.2"/>
  <ellipse cx="12" cy="6" rx="5.5" ry="2.2" fill="#89929e" stroke="#262626" stroke-width="1.2"/>
</svg>
```

**`sop.sphere`** (Sphere): Shaded metallic sphere with a white highlight at the upper left.

```svg
<svg viewBox="0 0 24 24">
  <defs>
  <radialGradient id="sphere-ball" cx="35%" cy="32%" r="65%">
  <stop offset="0%" stop-color="#ffffff"/>
  <stop offset="55%" stop-color="#b4bcc8"/>
  <stop offset="100%" stop-color="#525862"/>
  </radialGradient>
  </defs>
  <circle cx="12" cy="12" r="8" fill="url(#sphere-ball)" stroke="#232323" stroke-width="1.2"/>
</svg>
```

**`sop.block_end`** (Block End): Blue toy brick seen from above with a round stud on top (light top face, darker sides).

```svg
<svg viewBox="0 0 24 24">
  <polygon points="4.5,10 12,6.5 19.5,10 19.5,17.5 12,21 4.5,17.5" fill="#296ec2" stroke="#182b49" stroke-width="1.2"/>
  <polygon points="4.5,10 12,13.5 19.5,10 12,6.5" fill="#5da4f5"/>
  <line x1="12" y1="13.5" x2="12" y2="21" stroke="#182b49" stroke-width="1"/>
  <ellipse cx="12" cy="6.5" rx="3.8" ry="2" fill="#7ebcff" stroke="#182b49" stroke-width="1.1"/>
</svg>
```

**`sop.copyxform`** (Copy and Transform): Three grey spheres shrinking from left to right, each a transformed copy of the previous one.

```svg
<svg viewBox="0 0 24 24">
  <circle cx="7.5" cy="12" r="5.2" fill="#dce2ec" stroke="#262626" stroke-width="1.2"/>
  <circle cx="14.5" cy="13" r="3.8" fill="#c2cad6" stroke="#262626" stroke-width="1.2"/>
  <circle cx="19.5" cy="14" r="2.4" fill="#9ea8b6" stroke="#262626" stroke-width="1.2"/>
</svg>
```

**`sop.xform`** (Transform): Three-tone grey cube standing on four chunky blue arrows that lie flat on the ground and point out along the isometric diagonals.

```svg
<svg viewBox="0 0 24 24">
  <defs>
  <linearGradient id="xform-arrow" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0%" stop-color="#2f60b0"/>
  <stop offset="100%" stop-color="#7aa8e8"/>
  </linearGradient>
  </defs>
  <polygon points="1,-1.6 6.6,-1.6 6.6,-3.4 10.8,0 6.6,3.4 6.6,1.6 1,1.6" transform="translate(12 15) scale(1 0.5) rotate(45)" fill="url(#xform-arrow)" stroke="#1a3a70" stroke-width="1" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
  <polygon points="1,-1.6 6.6,-1.6 6.6,-3.4 10.8,0 6.6,3.4 6.6,1.6 1,1.6" transform="translate(12 15) scale(1 0.5) rotate(135)" fill="url(#xform-arrow)" stroke="#1a3a70" stroke-width="1" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
  <polygon points="1,-1.6 6.6,-1.6 6.6,-3.4 10.8,0 6.6,3.4 6.6,1.6 1,1.6" transform="translate(12 15) scale(1 0.5) rotate(225)" fill="url(#xform-arrow)" stroke="#1a3a70" stroke-width="1" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
  <polygon points="1,-1.6 6.6,-1.6 6.6,-3.4 10.8,0 6.6,3.4 6.6,1.6 1,1.6" transform="translate(12 15) scale(1 0.5) rotate(315)" fill="url(#xform-arrow)" stroke="#1a3a70" stroke-width="1" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
  <polygon points="12,3 17.5,5.75 12,8.5 6.5,5.75" fill="#eef2f7" stroke="#262626" stroke-width="1.1" stroke-linejoin="round"/>
  <polygon points="6.5,5.75 12,8.5 12,15 6.5,12.25" fill="#c0c7d1" stroke="#262626" stroke-width="1.1" stroke-linejoin="round"/>
  <polygon points="17.5,5.75 12,8.5 12,15 17.5,12.25" fill="#89929e" stroke="#262626" stroke-width="1.1" stroke-linejoin="round"/>
</svg>
```

**`sop.circle`** (Circle): Pale blue ring drawn over a thicker dark ring so it reads on any node color.

```svg
<svg viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="8" fill="none" stroke="#232323" stroke-width="3.2"/>
  <circle cx="12" cy="12" r="8" fill="none" stroke="#9cb6d9" stroke-width="1.8"/>
</svg>
```

**`sop.groupcreate`** (Group Create): Light disc with a thick dashed orange rim: the standard group-selection marker.

```svg
<svg viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="7.8" fill="#f2f4f7" stroke="#ee7b1c" stroke-width="2.6" stroke-dasharray="2.2 1.2"/>
</svg>
```

**`sop.split`** (Split): Yellow diamond road sign with black arrows that fork.

```svg
<svg viewBox="0 0 24 24">
  <polygon points="12,1.8 22.2,12 12,22.2 1.8,12" fill="#e5c329" stroke="#232323" stroke-width="1.3"/>
  <path d="M10.5,5.5V16M10.5,10.5L16,13.5" fill="none" stroke="#141414" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="10.5,18.8 7.5,14.5 13.5,14.5" fill="#141414"/>
  <polygon points="18.2,14.8 14,15.4 16,11.2" fill="#141414"/>
</svg>
```

**`sop.reverse`** (Reverse): Orange diamond inside two white circular arrows pointing in opposite directions.

```svg
<svg viewBox="0 0 24 24">
  <polygon points="12,7 17,12 12,17 7,12" fill="#ee8624" stroke="#262626" stroke-width="1.1"/>
  <path d="M5,10 A7.5,7.5 0 0 1 18,7 M19,14 A7.5,7.5 0 0 1 6,17" fill="none" stroke="#f0f2f5" stroke-width="2.3" stroke-linecap="round"/>
  <polygon points="19.5,9 15.5,7.5 18.5,4.5" fill="#f0f2f5"/>
  <polygon points="4.5,15 8.5,16.5 5.5,19.5" fill="#f0f2f5"/>
</svg>
```

**`sop.polyextrude`** (PolyExtrude): Yellow cube whose right face is pushed outward into a prism, with a red arrow showing the extrusion direction.

```svg
<svg viewBox="0 0 24 24">
  <g stroke="#262626" stroke-width="1.1" stroke-linejoin="round">
  <polygon points="10,3 17,6.5 10,10 3,6.5" fill="#ffe47a"/>
  <polygon points="3,6.5 10,10 10,18.5 3,15" fill="#f2c438"/>
  <polygon points="17,6.5 20,8 13,11.5 10,10" fill="#fff0a0"/>
  <polygon points="10,10 13,11.5 13,20 10,18.5" fill="#e8b52c"/>
  <polygon points="20,8 13,11.5 13,20 20,16.5" fill="#d49a18"/>
  </g>
  <line x1="16.8" y1="14.4" x2="19.7" y2="18.7" stroke="#262626" stroke-width="3.4" stroke-linecap="round"/>
  <line x1="16.8" y1="14.4" x2="19.7" y2="18.7" stroke="#e03228" stroke-width="2" stroke-linecap="round"/>
  <polygon points="21.8,21.3 21.4,17.3 18,20.1" fill="#e03228" stroke="#262626" stroke-width="0.9" stroke-linejoin="round"/>
</svg>
```

**`sop.subnet`** (Subnetwork / Custom HDA): Open cardboard box with flaps folded outward and a dark interior: the container for subnetworks and custom HDAs.

```svg
<svg viewBox="0 0 24 24">
  <g stroke="#262626" stroke-width="1" stroke-linejoin="round">
  <polygon points="6.5,7 17.5,7 16.5,3 7.5,3" fill="#e8b55a"/>
  <polygon points="6.5,7 17.5,7 19.5,10 4.5,10" fill="#7a4f16"/>
  <polygon points="6.5,7 4.5,10 1,8.5 2.5,5.5" fill="#f0c574"/>
  <polygon points="17.5,7 19.5,10 23,8.5 21.5,5.5" fill="#e2ac50"/>
  <polygon points="4.5,10 19.5,10 19.5,20.5 4.5,20.5" fill="#d99b38"/>
  <polygon points="4.5,10 19.5,10 18.5,13 5.5,13" fill="#f5d08a"/>
  </g>
</svg>
```

**`sop.output`** (Output): Black-and-white checkered racing flag waving on a light metal pole.

```svg
<svg viewBox="0 0 24 24">
  <defs>
  <clipPath id="output-flag">
  <path d="M5.5 3.8C9 1.8 12 5 15 4C17.5 3.2 19.5 4 21 5L19.5 14C18 13 16 14.5 13 15C10 15.5 8.5 13.5 7.3 13.3Z"/>
  </clipPath>
  </defs>
  <g clip-path="url(#output-flag)">
  <rect x="4" y="0" width="19" height="17" fill="#ffffff"/>
  <g transform="translate(5.5 2) skewY(6)" fill="#1e1e1e">
  <rect x="0" y="0" width="4" height="4"/>
  <rect x="8" y="0" width="4" height="4"/>
  <rect x="4" y="4" width="4" height="4"/>
  <rect x="12" y="4" width="4" height="4"/>
  <rect x="0" y="8" width="4" height="4"/>
  <rect x="8" y="8" width="4" height="4"/>
  </g>
  </g>
  <path d="M5.5 3.8C9 1.8 12 5 15 4C17.5 3.2 19.5 4 21 5L19.5 14C18 13 16 14.5 13 15C10 15.5 8.5 13.5 7.3 13.3Z" fill="none" stroke="#262626" stroke-width="1.2" stroke-linejoin="round"/>
  <line x1="5.2" y1="3" x2="8.5" y2="21.5" stroke="#262626" stroke-width="2.8" stroke-linecap="round"/>
  <line x1="5.2" y1="3" x2="8.5" y2="21.5" stroke="#c0c7d1" stroke-width="1.4" stroke-linecap="round"/>
</svg>
```

**`sop.attribcreate`** (Attribute Create): Shaded grey attribute pin (bottom-left) with a white speech-bubble tag whose tail points at the pin, and a bold dark plus sign inside the tag.

```svg
<svg viewBox="0 0 24 24">
  <defs>
  <radialGradient id="attribcreate-pin" cx="35%" cy="32%" r="65%">
  <stop offset="0%" stop-color="#ffffff"/>
  <stop offset="55%" stop-color="#b4bcc8"/>
  <stop offset="100%" stop-color="#5a616b"/>
  </radialGradient>
  </defs>
  <path d="M8.5 2.5H21.5V12H13L6.8 17.2L10 12H8.5Z" fill="#f2f4f7" stroke="#262626" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="M15 4.6V9.9M12.35 7.25H17.65" stroke="#262626" stroke-width="2.2"/>
  <circle cx="5" cy="19" r="3.2" fill="url(#attribcreate-pin)" stroke="#262626" stroke-width="1.2"/>
</svg>
```

**`sop.attribdelete`** (Attribute Delete): The Attribute Create pin and speech-bubble tag, crossed out by a large red X with a dark casing.

```svg
<svg viewBox="0 0 24 24">
  <defs>
  <radialGradient id="attribdelete-pin" cx="35%" cy="32%" r="65%">
  <stop offset="0%" stop-color="#ffffff"/>
  <stop offset="55%" stop-color="#b4bcc8"/>
  <stop offset="100%" stop-color="#5a616b"/>
  </radialGradient>
  </defs>
  <path d="M8.5 2.5H21.5V12H13L6.8 17.2L10 12H8.5Z" fill="#f2f4f7" stroke="#262626" stroke-width="1.3" stroke-linejoin="round"/>
  <circle cx="5" cy="19" r="3.2" fill="url(#attribdelete-pin)" stroke="#262626" stroke-width="1.2"/>
  <path d="M10.5 2.5L20 12.5M20 2.5L10.5 12.5" stroke="#262626" stroke-width="4.4" stroke-linecap="round"/>
  <path d="M10.5 2.5L20 12.5M20 2.5L10.5 12.5" stroke="#e03228" stroke-width="2.6" stroke-linecap="round"/>
</svg>
```

**`sop.sort`** (Sort): Light metallic 12-tooth gear with a dark center hole. Also Houdini's generic operator icon.

```svg
<svg viewBox="0 0 24 24">
  <defs>
  <radialGradient id="sort-gear" cx="38%" cy="34%" r="70%">
  <stop offset="0%" stop-color="#ffffff"/>
  <stop offset="55%" stop-color="#c0c7d1"/>
  <stop offset="100%" stop-color="#7a828e"/>
  </radialGradient>
  </defs>
  <path d="M10.71 4.11 L11.09 1.84 L12.91 1.84 L13.29 4.11 L14.83 4.52 L16.29 2.75 L17.87 3.65 L17.07 5.81 L18.19 6.93 L20.35 6.13 L21.25 7.71 L19.48 9.17 L19.89 10.71 L22.16 11.09 L22.16 12.91 L19.89 13.29 L19.48 14.83 L21.25 16.29 L20.35 17.87 L18.19 17.07 L17.07 18.19 L17.87 20.35 L16.29 21.25 L14.83 19.48 L13.29 19.89 L12.91 22.16 L11.09 22.16 L10.71 19.89 L9.17 19.48 L7.71 21.25 L6.13 20.35 L6.93 18.19 L5.81 17.07 L3.65 17.87 L2.75 16.29 L4.52 14.83 L4.11 13.29 L1.84 12.91 L1.84 11.09 L4.11 10.71 L4.52 9.17 L2.75 7.71 L3.65 6.13 L5.81 6.93 L6.93 5.81 L6.13 3.65 L7.71 2.75 L9.17 4.52 Z" fill="url(#sort-gear)" stroke="#262626" stroke-width="1.1" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="5" fill="none" stroke="#89929e" stroke-width="1"/>
  <circle cx="12" cy="12" r="3.2" fill="#4a5260" stroke="#262626" stroke-width="1.1"/>
</svg>
```

---

## 11. Self-Check Before Answering

For every drawing:

- [ ] Next to the approved icons it looks like the same hand drew it (section 2 numbers).
- [ ] Drawn from scratch on the grid; no copied or traced path data.
- [ ] Reads at about 20px on `#cccccc`, dark grey and blue nodes.
- [ ] Every filled shape outlined in `#262626`; light strokes cased.
- [ ] Palette colors only (or a new color named in the answer); light from the upper left; three-tone solids; no shadows, glows or textures.
- [ ] Composition, proportions and colors follow the reference.
- [ ] Motifs stay recognizable with a badge in the bottom-right corner; badges have a closed outlined silhouette.
- [ ] Ids exactly as given; `data-description` matches the drawing.
- [ ] Only allowed elements; gradient ids start with the symbol id; no em or en dashes.
