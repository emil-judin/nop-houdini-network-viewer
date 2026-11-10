# Playground Examples

Six small networks built in Houdini 22 for the playground, each showing one part of the viewer to a new visitor. Their scene is `nop_examples.hip`, with the two example assets in `otls/`. They are listed in `src/playground/examples.ts`, and the build publishes every `*-network.json` here at `examples/<file name>` next to the playground, so the embed code for an example works as it is.

## Overview

Six files, ordered from "first contact" to "power user". Each one teaches one idea, so a visitor can click through them in order.

| # | File | Object | What it teaches | Export |
|---|------|--------|-----------------|--------|
| 1 | `start_here-network.json` | `/obj/start_here` | Moving around, clicking nodes, diving into a subnetwork | Save .json File (Compact Parms) |
| 2 | `vex_wrangles-network.json` | `/obj/vex_wrangles` | Reading VEX and Python code | Save .json File (Compact Parms) |
| 3 | `for_each-network.json` | `/obj/for_each` | Loop and compile blocks, dotted Copy to Points wire | Save .json File (Compact Parms) |
| 4 | `parameters-network.json` | `/obj/parameters` | Every kind of parameter widget, expressions, keyframes | Save .json File (**Full** Parms) |
| 5 | `node_looks-network.json` | `/obj/node_looks` | Flags, node colors and shapes, boxes, notes, dots, multi-input nodes | Save .json File (Compact Parms) |
| 6 | `assets-network.json` | `/obj/assets` | Nested subnetworks, subnet inputs, your own assets (unlocked and locked) | Save .json File (Compact Parms), then **Export Closed** |

Feature coverage, so nothing is shown twice and nothing is missing:

| Feature | 1 | 2 | 3 | 4 | 5 | 6 |
|---------|---|---|---|---|---|---|
| Pan, zoom, H / F hotkeys, fit on load | x | | | | | |
| Inspector: changed parameters, compact note | x | x | x | | x | x |
| Inspector: full parameter pane (defaults in normal weight, changes in bold) | | | | x | | |
| Tabs, collapsible and simple folders, separators, labels | | | | x | | |
| Sliders with range, vectors with axis markers, toggles, menus | | | | x | | |
| Gutter toggle joined to the next parameter, disable-when, hide-when | | | | x | | |
| Expressions (f(x) and "= value"), keyframed values | | | x | x | | |
| Float ramp, color ramp | | | | x | | |
| VEX and Python highlighting, copy code, long code gutter | | x | | | | |
| Renamed node: type label above the name | x | x | | | x | |
| Node comment shown in the network | x | | | | x | |
| Display, render, bypass, template, lock flags | x | | | | x | |
| Node colors, custom node shapes | x | | | | x | |
| Network box (normal, minimized, no title), sticky notes (3 kinds) | x | | | | x | |
| Dots (pinned, chained, wire highlight through dots) | x | | | | x | |
| Multi-input bar (Merge, Switch) | x | | | | x | |
| For-Each and Compile underlays, blue method labels | | | x | | | |
| Dotted wire into Copy to Points | | | x | | | |
| Subnetwork dive (double-click, I / U, inspector button) | x | | | | | x |
| Path bar: back / forward, dimmed trail of deeper levels | | | | | | x |
| Sub-Network Input items with their source names | x | | | | | x |
| Asset padlocks (red open, grey locked), custom SVG icon | | | | | | x |
| Locked asset exported closed (privacy dialog) | | | | | | x |

Not shown on purpose: rounded wires (SOP networks export the straight "default" style; visitors can still switch with Shift+S), VOP / LOP / TOP / DOP networks (not supported yet), path scrubbing of private folders (checked separately with a throwaway export that is never published).

## Rules for every file

- **Houdini 22, SOP networks only**, each inside its own Geometry object (`/obj/<name>`).
- **Built-in nodes only**, except example 6, which uses two small assets made in the same scene with original icons. No SideFX Labs nodes, no third-party or paid assets.
- **Everything cooks**, with no error or warning badges.
- **Small and readable:** about 15 nodes per level at most, laid out top to bottom, well under 200 KB per file, and sticky notes readable when the network is fitted on a laptop screen.
- **Sticky notes** are shown to every visitor exactly as written: short English sentences, nothing private, no file paths.
- **Every node shows something in the inspector:** one to three changed parameters per node.

## Re-exporting

Go inside the object (the Network Editor shows `/obj/<name>`), select nothing, click **Export for NOP** on the NOP shelf, pick the mode from the table above, and save as `<name>-network.json` into this folder.

After exporting:

- Open every file in the playground (`npm run dev`) and check it against its row in the coverage table.
- `grep "<path>" fixtures/examples/*.json` must find nothing, and `grep -i "users" fixtures/examples/*.json` must find no home folder.
- `example-site.html` uses some node names (for example `twist_piece`, `scene`), so a renamed node needs a change there too. Renaming a key in `examples.ts` changes links like `?example=start`.
