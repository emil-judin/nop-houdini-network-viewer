---
name: houdini-graph-renderer
description: >-
  Rules for drawing Houdini networks in the NOP viewer (src/components/, src/schema/convertGraph.ts): node
  shapes, flags, wires, dots, network boxes, sticky notes, subnet inputs, the path bar, the inspector and
  coordinate conversion. Use when creating or changing any viewer component or the converter.
---

# NOP Graph Renderer

The viewer must look like Houdini 22's Network Editor (pillar 2) and stay view-only (pillar 3). The code holds
every measured value as a named constant: this skill points to them instead of repeating numbers that drift.
If a visual detail is unclear, ask the owner for a Houdini screenshot instead of guessing.

## 1. Where the values live

| What | Source of truth |
| --- | --- |
| Units, node box (100 x 30 px), dot radius, box and sticky header heights, ID prefixes | `src/schema/convertGraph.ts` (`HOUDINI_UNIT_TO_PX`, `HOUDINI_DOT_RADIUS_PX`, `MINIMIZED_BOX_HEIGHT_PX`, `MINIMIZED_STICKY_HEIGHT_PX`, `*_ID_PREFIX`) |
| The 36 node shapes, flag regions, connector slots | `src/components/nodes/shapes/houdiniShapesData.json`, read through `nodeShapes.ts` |
| Node colors, selection outline, flag colors, bypass fading, padlocks | `src/components/nodes/HoudiniSopNode.tsx` |
| Wire colors and paths (both Houdini wire styles) | `src/components/edges/HoudiniWire.tsx`, `wirePaths.ts` |
| Canvas and grid colors | `src/components/theme.ts` |
| Parameter Pane colors | `src/components/inspector/paneStyles.ts` |
| Fidelity decisions and their history | `docs/HISTORY.md` |

## 2. Invariants

- **Coordinates:** Houdini is +Y up in network units, the screen is +Y down in pixels:
  `screenY = -(houY + height) * HOUDINI_UNIT_TO_PX`. Dots are centered on `pos`. Network box headers are drawn
  above the body Houdini reports.
- **Node size:** operator nodes are always drawn in Houdini's 10:3 shape box (100 x 30 px); `node.size` is
  informational.
- **Multi-input nodes:** nodes with `maxInputs > 4` (`merge`, `switch` report 9999) get one wide bar with 16
  hidden handles `in-multi-0..15`; never render one handle per input in a loop. Wires fan out across the bar in
  input order (`toInput`), computed in the converter.
- **IDs:** operator nodes use their Houdini name; boxes, stickies, dots, subnet inputs and block underlays use
  the prefixes `box:`, `sticky:`, `dot:`, `input:`, `block:` (Houdini never allows a colon in names). Wire ends resolve node first,
  then dot, then subnet input. Wires to items that are not in the export are skipped.
- **Drawing order (`zIndex`):** network boxes -20, sticky notes -10, block underlays -5, wires 4, subnet
  inputs 5, operator nodes 10, dots 12.
- **Block underlays** (`src/schema/blockUnderlays.ts`, `HoudiniBlockUnderlay`): For-Each and Compile blocks get a
  rounded convex outline in the Block End color. Members are the end node, every begin node whose `blockpath`
  points to it (metadata begins too) and the nodes wired between them (downstream of a begin, upstream of the
  end). Padding and corner radius come from a Houdini 22 screenshot.
- **Block method labels** (`src/schema/blockLabels.ts`): For-Each Block Begin and End nodes show their method in
  blue under the name (`Point` / `Piece`, `Metadata`, `Feedback`, `Input`, `Merge`), read from the `method`
  parameter (and the end's `class` for piece begins). Compile blocks have none.
- **Dotted wires:** the wire into the second input (target points) of Copy to Points is dotted, `1.5 2.5` px
  (`isDottedWire` in `convertGraph.ts`).
- **View-only:** `nodesDraggable={false}`, `nodesConnectable={false}`, `edgesReconnectable={false}`. Flags are
  pictures, never buttons. Nodes are focusable for keyboard access (Tab, Enter opens the inspector), which does
  not allow editing: arrow keys only move draggable nodes.

## 3. Library rules (also in AGENTS.md)

- Every viewer element renders inside `.nop-root` (no portals to `document.body`): the npm stylesheet is scoped
  to it at build time.
- Sizes in `px` (or the px-pinned theme tokens), never raw `rem`.
- Layouts follow the viewer's own width with container queries (`@md:`, `@2xl:`), not viewport breakpoints.
- No `dangerouslySetInnerHTML` or `innerHTML` for file content. Custom SVG icons are shown only through
  `<img src="data:image/svg+xml,...">` (`svgDataUri.ts`), where scripts cannot run.
- Look up maps that come from the file with `Object.hasOwn` (an icon or shape named `constructor` must not
  reach `Object.prototype`).
- Touch targets reach 44 px on coarse pointers (`TOUCH_TARGET`), and at least 24 px everywhere (WCAG 2.5.8).
- Text meets 4.5:1 contrast; dimmed Houdini colors that cannot are marked `aria-disabled` when they show
  disabled parameters.

## 4. Structure

- `HoudiniNetwork.tsx`: parsing (`normalizeNetworkDocument`), fullscreen, error boundaries, Labs icon loading;
  the inner canvas wires the hooks in `src/components/hooks/` (navigation history, hotkeys, wire highlight,
  fullscreen, reduced motion) to React Flow and the HUD.
- The Parameter Inspector and the SideFX Labs icon drawings load on demand (`React.lazy`, `loadLabsIcons`).
  Keep heavy, optional code behind such a boundary so embeds stay small.
