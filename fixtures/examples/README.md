# Playground examples

The seven example networks of the playground, exported in Houdini 22 from the scene `nop_examples.hipnc` and its two assets (`otls/*.hdanc`). This file is for re-exporting or changing them.

## The scene is not in the repository

The scene and its assets are saved with a non-commercial Houdini license (Education). SideFX restricts files in its non-commercial formats to non-commercial use, so they cannot be shared under NOP's MIT License, and `.gitignore` keeps every Houdini scene and asset out of the repository. Only the JSON exports are shared.

- The owner keeps the scene, the assets and the logo scenes in the private repository `nop-resources`, at the same paths as here.
- To change an example, put `nop_examples.hipnc` in this folder and the assets in `otls/` (Houdini finds them in `$HIP/otls`), then re-export below.
- Keep the non-commercial file names (`.hipnc`, `.hdanc`), so nobody takes them for commercial files, and never open them in a commercial Houdini: it switches that session to non-commercial mode.

Where they are used:

- `src/playground/examples.ts` lists them. Its keys appear in links such as `?example=start`.
- The build publishes every `*-network.json` at `examples/<file name>` next to the playground, so the embed code of an example works as it is.
- `example-site.html` and the tests use some node names (see Fixtures in [`docs/TESTING.md`](../../docs/TESTING.md)).

## Files

Ordered from first contact to power user. Each file teaches one idea.

| # | File | Object | What it teaches | Export mode |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `start_here-network.json` | `/obj/start_here` | Moving around, clicking nodes, diving into a subnetwork | Compact Parms |
| 2 | `vex_wrangles-network.json` | `/obj/vex_wrangles` | Reading VEX and Python code | Compact Parms |
| 3 | `for_each-network.json` | `/obj/for_each` | Loop and compile blocks | Compact Parms |
| 4 | `parameters-network.json` | `/obj/parameters` | Every kind of parameter widget, expressions, keyframes | **Full** Parms |
| 5 | `node_looks-network.json` | `/obj/node_looks` | Node colors and shapes, boxes, notes, dots, multi-input nodes | Compact Parms |
| 6 | `assets-network.json` | `/obj/assets` | Nested subnetworks, subnet inputs, your own assets (unlocked and locked) | Compact Parms, then **Export Closed** |
| 7 | `selection-network.json` | `/obj/selection` | Sharing part of a network: stubs where it continues | Compact Parms, **selection only** |

## Feature coverage

Each feature is shown in the examples marked with x.

| Feature | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Pan, zoom, H / F hotkeys, fit on load | x | | | | | | |
| Inspector: changed parameters, compact note | x | x | x | | x | x | x |
| Inspector: full parameter pane (defaults in normal weight, changes in bold) | | | | x | | | |
| Tabs, collapsible and simple folders, separators, labels | | | | x | | | |
| Sliders with range, vectors with axis markers, toggles, menus | | | | x | | | |
| Gutter toggle joined to the next parameter, disable-when, hide-when | | | | x | | | |
| Expressions (f(x) and "= value"), keyframed values | | | x | x | | | |
| Float ramp, color ramp | | | | x | | | |
| VEX and Python highlighting, copy code, long code gutter | | x | | | | | |
| Renamed node: type label above the name | x | x | | | x | | x |
| Node comment shown in the network | x | | | | x | | |
| Display, render, bypass, template, lock flags | x | | | | x | | |
| Node colors, custom node shapes | x | | | | x | | |
| Network box (normal, minimized, no title), sticky notes (3 kinds) | x | | | | x | | |
| Dots (pinned, chained, wire highlight through dots) | x | | | | x | | |
| Multi-input bar (Merge, Switch) | x | | | | x | | |
| For-Each and Compile underlays, blue method labels | | | x | | | | |
| Dotted wire into Copy to Points | | | x | | | | x |
| Subnetwork dive (double-click, I / U, inspector button) | x | | | | | x | |
| Path bar: back / forward, dimmed trail of deeper levels | | | | | | x | |
| Sub-Network Input items with their source names | x | | | | | x | |
| Asset padlocks (red open, grey locked), custom SVG icon | | | | | | x | |
| Locked asset exported closed (privacy dialog) | | | | | | x | |
| Stubs for wires outside an exported selection | | | | | | | x |

Not shown on purpose:

- VOP, LOP, TOP and DOP networks: not supported yet.

## Rules

- **Houdini 22, SOP networks only**, each inside its own Geometry object (`/obj/<name>`).
- **Built-in nodes only**, except example 6, which uses the two assets in `otls/` with original icons. No SideFX Labs nodes, no third-party or paid assets.
- **Everything cooks**, without error or warning badges.
- **Small and readable:** at most about 15 nodes per level, laid out top to bottom. Sticky notes are readable when the network is fitted on a laptop screen.
- **Sticky notes** are shown to every visitor in English
- **Every node shows something in the inspector:** one to three changed parameters per node.

## Re-export

1. Go inside the object, so the Network Editor shows `/obj/<name>`, and select nothing (for example 7, select `scatter_trees`, `random_size`, `place_trees` and the sticky note beside them).
2. Click **Export for NOP** on the NOP shelf and pick the export mode from the Files table.
3. Save as `<name>-network.json` into this folder.
4. Open every changed file in the playground (`npm run dev`) and compare it with its row in the coverage table.
5. Check for private paths. Both commands must find nothing (Git Bash):

   ```bash
   grep "<path>" fixtures/examples/*.json
   grep -i "users" fixtures/examples/*.json
   ```

6. If a node was renamed, update `example-site.html` and the tests that use the old name. Renaming a key in `examples.ts` changes links such as `?example=start`.
