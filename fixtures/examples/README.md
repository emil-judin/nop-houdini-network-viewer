# Playground Examples

Small networks made for the playground, each showing one part of the viewer to a new user. They are listed in `src/playground/examples.ts`; an example whose file is missing is simply left out, so the files can be added one at a time. The build publishes every `*-network.json` here at `examples/<file name>` next to the playground, so the Embed code for an example works as it is.

This file is also the build plan for an agent with a Houdini MCP connection: every network below is specified with node types, parameter values, layout, sticky note texts, export settings and a check list.

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

Feature coverage (from `docs/features/`), so nothing is shown twice and nothing is missing:

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
| Wrangle is not enterable (only real subnetworks are) | | x | | | | x |

Not shown on purpose: rounded wires (SOP networks export the straight "default" style; visitors can still switch with Shift+S), VOP / LOP / TOP / DOP networks (not supported yet), path scrubbing of private folders (a separate check below, never published).

## Rules for every file

- **Houdini 22, SOP networks only.** Build each example inside its own Geometry object (`/obj/<name>`, names in the table above). Delete any default node the object comes with.
- **Built-in nodes only**, except in example 6, which uses two small assets made in the same scene with original icons from this file. No SideFX Labs nodes, no third-party or paid assets.
- **One .hip file** for all six objects, saved in its own folder (for example `Documents/nop_examples/nop_examples.hip`), so `$HIP` is set and the assets of example 6 go to `$HIP/otls/`. Do not save the .hip or the .hda files in this repository.
- **Everything cooks.** No node may show an error or a warning badge in Houdini.
- **Small and readable:** at most about 15 nodes per level, laid out top to bottom (inputs above outputs), about 1.2 network units between rows and 3 units between columns, and well under 200 KB per file. When the viewer fits the network on a laptop screen, the sticky notes must still be readable: keep notes short and close to the nodes they talk about.
- **Sticky notes** are shown exactly as written, to every visitor: short sentences in English, nothing private, no file paths. Never use long dashes (use a colon or a new sentence), like the rest of the project.
- **Every node shows something in the inspector:** give each node one to three changed parameters, otherwise a visitor only sees "All parameters are at their default values."
- **Positions** below are `(x, y)` in network units for `node.setPosition()`, with `+y` up. They are a guide: keep the shape of the layout, adjust spacing so nothing overlaps.
- **Parameter names** below are Houdini 22 names as far as known. Check each one with `node.parm(name)` (or `node.parmTemplateGroup()`) before setting it; if a name differs, use the parameter with the same label.

### Houdini Python cheat sheet

```python
geo = hou.node("/obj").createNode("geo", "start_here")
n = geo.createNode("box", "box1")
n.setPosition(hou.Vector2(-2, 2))
n.setInput(0, other_node)                      # input index, source node (or a dot)
n.setColor(hou.Color(1.0, 0.45, 0.1))
n.setComment("Rounds the edges")
n.setGenericFlag(hou.nodeFlag.DisplayComment, True)
n.setDisplayFlag(True); n.setRenderFlag(True)
n.bypass(True); n.setTemplateFlag(True); n.setHardLocked(True)
n.setUserData("nodeshape", "star")             # node shape
n.parm("ty").setExpression("sin($F * 7.5) * 0.25")
n.parm("ry").setKeyframe(hou.Keyframe(0, hou.frameToTime(1)))

dot = geo.createNetworkDot(); dot.setInput(0, src); dst.setInput(0, dot); dot.setPinned(True)
box = geo.createNetworkBox(); box.setComment("Shapes"); box.addItem(n); box.fitAroundContents()
box.setColor(hou.Color(0.3, 0.4, 0.55)); box.setMinimized(True)
note = geo.createStickyNote(); note.setText("..."); note.setPosition(...); note.setSize(hou.Vector2(6, 1.2))
note.setColor(hou.Color(1.0, 0.97, 0.6)); note.setTextColor(hou.Color(0.1, 0.1, 0.1)); note.setDrawBackground(False)

sub = geo.createNode("subnet", "details")
out = sub.createNode("output", "output0")
inner.setInput(0, sub.indirectInputs()[0])     # wire from Sub-Network Input #1
```

## Export

Export settings are given per file. Two ways to export, both give the same file:

**A. By hand (the way users do it):** go inside the object (the Network Editor shows `/obj/<name>`), select nothing, click **Export for NOP** on the NOP shelf, pick the button named in the file's section, save as `<name>-network.json` into this folder (`fixtures/examples/`).

**B. From the MCP (no dialogs):** use the exporter from this repository, not an older installed copy (the current one has the fix for commented-out VEX lines).

```python
import importlib, json, sys
REPO = r"C:/Users/emjud/source/repos/nop-houdini-network-viewer"
sys.path.insert(0, REPO + "/exporter")
import nop_exporter
importlib.reload(nop_exporter)
assert nop_exporter.__file__.replace("\\", "/").startswith(REPO), nop_exporter.__file__

def export(name, mode="compact", include_locked=False):
    net = hou.node("/obj/" + name)
    hou.clearAllSelected()  # a selection would export only the selected items
    doc, selected_only, state = nop_exporter.build_document(
        net, export_mode=mode, include_locked_assets=include_locked)
    assert not selected_only
    path = f"{REPO}/fixtures/examples/{name}-network.json"
    with open(path, "w", encoding="utf-8") as f:
        f.write(json.dumps(doc, indent=2))  # same format as "Save .json File"
    return path, sorted(state.closed_assets), state.warnings
```

`export(...)` must report `warnings == 0`. `closed_assets` must be empty, except for example 6 (see there).

## 1. `start_here-network.json` (Start Here, opens first)

**Goal:** the first thing a visitor sees. Teaches moving around, clicking a node, diving into a subnetwork and coming back. Everything else stays out of the way.

**Export:** Save .json File (Compact Parms). MCP: `export("start_here")`.

Layout sketch (top to bottom):

```
          [ sticky: Welcome ]
   +--------- box "Shapes" ----------+
   |  box1              tube1        |
   |  polybevel1        lift_tube    |
   |  color1              o (dot)    |
   +---------------------------------+
                merge1
                details   (subnet)
                OUT       (display + render)
```

| Node | Type | Position | Settings |
|------|------|----------|----------|
| `box1` | `box` | (-2, 2) | Uniform Scale `scale` 0.8 |
| `polybevel1` | `polybevel` | (-2, 0.8) | Distance `offset` 0.06, Divisions `divisions` 3. Comment `Rounds the edges`, shown in the network |
| `color1` | `color` | (-2, -0.4) | Color `color` (1.0, 0.45, 0.1). Node color orange (1.0, 0.45, 0.1) |
| `tube1` | `tube` | (2, 2) | Primitive Type Polygon, End Caps on, Height 1.5, Columns 24 |
| `lift_tube` | `xform` | (2, 0.8) | Translate `t` (1.5, 0.25, 0), Rotate `r` (0, 45, 0). Renamed on purpose: the viewer shows "Transform" above the name |
| dot | network dot | (2.4, -0.6) | On the wire `lift_tube` > `merge1` |
| `merge1` | `merge` | (0, -1.6) | Inputs: `color1`, then the dot |
| `details` | `subnet` | (0, -2.8) | Input 1: `merge1`. Node color blue (0.3, 0.5, 0.85) |
| `OUT` | `null` | (0, -4) | Display and render flags. Node color dark grey (0.3, 0.3, 0.3) |

Inside `details`:

| Item | Type | Position | Settings |
|------|------|----------|----------|
| Sub-Network Input #1 | indirect input | (0, 2.2) | Comes from `merge1` (the viewer shows "Sub-Network Input #1" and "merge1") |
| `polyextrude1` | `polyextrude` | (0, 1) | Distance `dist` 0.15, Extrude individual faces (Divide Into: Individual Elements) |
| `normal1` | `normal` | (0, -0.2) | Cusp Angle 30 |
| `output0` | `output` | (0, -1.4) | Display flag |

Network box: comment `Shapes`, color (0.25, 0.35, 0.5), around `box1`, `polybevel1`, `color1`, `tube1`, `lift_tube`.

Sticky notes (yellow, dark text):

1. Above the box, wide: `Welcome! This is a real Houdini network, shown in your browser with NOP. Drag to move around, scroll or pinch to zoom.`
2. Left of `color1`: `Click any node to see its parameters. On a phone, tap it.`
3. Right of `details`: `This is a subnetwork. Double-click it (double-tap on a phone) to go inside.`
4. Inside `details`, right of `polyextrude1`: `You are inside the subnetwork. Click start_here in the path bar at the top, or press U, to go back up.`
5. Right of `OUT`: `Press H to see the whole network again. The blue flag marks the node Houdini displays.`

**Check in the playground:** all five notes readable at the fitted zoom; `lift_tube` shows "Transform" above its name; `polybevel1` shows its comment; the dot sits on the wire; double-click `details` goes in and the path bar shows `start_here > details`; `merge1` has the wide input bar.

## 2. `vex_wrangles-network.json` (VEX Wrangles)

**Goal:** the code view of the parameter panel: VEX and Python highlighting, line numbers, Copy code, a code block taller than the field (scrolling gutter), spare parameter sliders.

**Export:** Save .json File (Compact Parms). Code parameters are always exported, even at their default. MCP: `export("vex_wrangles")`.

Chain, top to bottom at x = 0, rows 1.2 apart: `grid1` > `wrangle_noise` > `wrangle_rings` > `wrangle_color` > `python_info` > `OUT`.

| Node | Type | Settings |
|------|------|----------|
| `grid1` | `grid` | Size 10 x 10, Rows 50, Columns 50 |
| `wrangle_noise` | `attribwrangle` | Run Over Points. Code below. Spare parameters `amplitude` (Float, 0.3, range 0 to 1) and `frequency` (Float, 2, range 0 to 10), made with the "Create spare parameters" button or a `FloatParmTemplate` with min / max |
| `wrangle_rings` | `attribwrangle` | Run Over Points. Long code below (taller than the 320 px code field). Spare parameter `rings` (Int, 6, range 1 to 12) |
| `wrangle_color` | `attribwrangle` | Run Over Points. Code below |
| `python_info` | `python` (Python SOP) | Code below |
| `OUT` | `null` | Display and render flags |

`wrangle_noise`:

```c
// Push the grid up and down with noise
float amp = chf("amplitude");
float freq = chf("frequency");
@P.y += (noise(@P * freq) - 0.5) * amp;
```

`wrangle_rings` (keep exactly, it covers every token kind: `#include`, types, functions, keywords, numbers, strings, `i@` / `s@` / `i[]@` attributes, comments, and a commented-out attribute line that the old path scrubber broke):

```c
#include <math.h>

// Sort the points into rings around the center
// and give every ring a name and a width.
float radius = length(set(@P.x, 0, @P.z));
int   rings  = chi("rings");
float maxr   = 5.0;   // half the grid size
int   ring   = int(fit(radius, 0, maxr, 0, rings));

i@ring = clamp(ring, 0, rings - 1);
s@ring_name = sprintf("ring_%02d", i@ring);

// Alternate wide and narrow rings
if (i@ring % 2 == 0) {
    f@pscale = 0.08;
} else {
    f@pscale = 0.04;
}

// Remember the neighbours of every point
i[]@nbrs = neighbours(0, @ptnum);

// A gentle wave along the angle
float angle = atan2(@P.z, @P.x);
@P.y += 0.05 * sin(angle * 6.0 + M_PI * 0.5);

//@Cd = {1, 0, 0};  // debug color, kept for later
```

`wrangle_color`:

```c
// Color by height: low points blue, high points orange
float h = fit(@P.y, -0.15, 0.15, 0, 1);
@Cd = lerp({0.1, 0.3, 0.9}, {1.0, 0.45, 0.1}, h);
```

`python_info`:

```python
# Store the point count on the geometry
node = hou.pwd()
geo = node.geometry()

count = len(geo.points())
geo.addAttrib(hou.attribType.Global, "point_count", 0)
geo.setGlobalAttribValue("point_count", count)
```

Sticky notes:

1. Right of the wrangles: `Click a wrangle to read its VEX code. The copy button puts the code on your clipboard.`
2. Right of `python_info`: `Python SOPs work too.`
3. Left of `wrangle_rings`: `Wrangles look like subnetworks inside Houdini, but there is nothing to dive into: double-click only selects them.`

**Check:** the four renamed wrangles and the Python node show their type label above the name; `wrangle_rings` scrolls inside the code field and the grey line number gutter reaches line 29; the last line still reads `//@Cd = {1, 0, 0};` (not `<path>`); `amplitude` and `frequency` show as sliders.

## 3. `for_each-network.json` (For-Each Loop)

**Goal:** the block underlays and blue method labels Houdini draws for loops, a Compile block, and the dotted wire into the second input of Copy to Points.

**Export:** Save .json File (Compact Parms). MCP: `export("for_each")`.

Two columns.

Left column, "copy and loop" (x = -3):

| Node | Type | Settings |
|------|------|----------|
| `grid1` | `grid` | Size 6 x 6 (top right of the column, feeds the points) |
| `scatter1` | `scatter` | Force Total Count `npts` 20, Relax Iterations default |
| `box1` | `box` | Uniform Scale 0.25 (top left of the column) |
| `copytopoints1` | `copytopoints` | Input 1: `box1`, input 2: `scatter1` (this wire is drawn dotted). Pack and Instance off |
| `connectivity1` | `connectivity` | Connectivity Type Primitive, Attribute `class` |
| `foreach_begin1` | `block_begin` | Method: Extract Piece or Point (`method` = `piece`), Block Path `../foreach_end1` |
| `foreach_begin1_metadata1` | `block_begin` | Method: Fetch Metadata (`method` = `metadata`), Block Path `../foreach_end1`. Placed right of `foreach_begin1`, unwired |
| `twist_piece` | `xform` | Rotate Y expression: `rand(detail("../foreach_begin1_metadata1", "iteration", 0)) * 360` |
| `foreach_end1` | `block_end` | Iteration Method By Pieces or Points, Gather Method Merge (`method` = `merge`), Piece Elements Primitives, Piece Attribute on with `class`, Block Path and Template `../foreach_begin1` |

This is exactly what the Tab menu tool **For-Each Connected Piece** builds (rename the transform to `twist_piece`). If the MCP can run that tool, prefer it; otherwise set the parameters above and compare with the tool's result once.

Right column, "compiled feedback loop" (x = 3):

| Node | Type | Settings |
|------|------|----------|
| `circle1` | `circle` | Primitive Type Polygon, Divisions 6, Uniform Scale 1 |
| `compile_begin1` | `compile_begin` | Block Path `../compile_end1` |
| `repeat_begin1` | `block_begin` | Method: Fetch Feedback (`method` = `feedback`), Block Path `../repeat_end1` |
| `shrink_and_turn` | `xform` | Rotate Z 10, Uniform Scale 0.9 |
| `merge_rings` | `merge` | Inputs: `repeat_begin1`, `shrink_and_turn` (keeps every step) |
| `repeat_end1` | `block_end` | Iteration Method By Count, Iterations 8, Gather Method Feedback (`method` = `feedback`), Block Path and Template `../repeat_begin1` |
| `compile_end1` | `compile_end` | Block Path `../compile_begin1` |

This is the Tab menu tool **For Loop with Feedback**, wrapped in **Compile Block**.

Bottom, centered: `merge1` (`merge`, inputs `foreach_end1` and `compile_end1`) > `OUT` (`null`, display and render flags).

Sticky notes:

1. Above the left column: `A For-Each loop. NOP draws the block like Houdini, with the loop method in blue under the nodes.`
2. Next to `copytopoints1`: `The dotted wire brings in the points to copy onto, like in Houdini.`
3. Above the right column: `A feedback loop inside a Compile block. Each block gets its own color underneath.`

**Check:** the viewer draws an underlay behind each loop and behind the compile block; blue labels read `Piece` (`foreach_begin1`), `Metadata`, `Merge` (`foreach_end1`), `Feedback` (`repeat_begin1` and `repeat_end1`), nothing under the compile nodes; the `scatter1` > `copytopoints1` wire is dotted and the `box1` wire is not; `twist_piece` shows the expression with f(x).

## 4. `parameters-network.json` (Parameters)

**Goal:** the parameter panel at its fullest: every widget the viewer can draw, plus expressions, keyframes and channel references. This is the only example exported with **Full Parms**, so visitors also see default values (normal weight) next to changed ones (bold), like in Houdini.

**Export:** Save .json File (**Full Parms**). MCP: `export("parameters", mode="full")`.

The idea for the visitor: one control node (`CONTROLS`) holds the settings, the other nodes read them with `ch()`. This is a common Houdini habit, so it reads naturally.

| Node | Type | Position | Settings |
|------|------|----------|----------|
| `CONTROLS` | `null` | (-4, 2) | Spare parameters below. Node color green (0.4, 0.7, 0.3). Shape `cigar` (`setUserData("nodeshape", "cigar")`) |
| `grid1` | `grid` | (0, 2) | Rows and Columns: expression `ch("../CONTROLS/rows")` |
| `polyextrude1` | `polyextrude` | (0, 0.8) | Distance: expression `ch("../CONTROLS/height")`, Divide Into Individual Elements, Output Back on. Shows tabs, folders and hide-when rules of a real node |
| `fuse1` | `fuse` | (0, -0.4) | Snap Distance toggle on, Snap Distance 0.01. Shows a label-less toggle in the gutter joined to its field |
| `blast1` | `blast` | (0, -1.6) | Group `@P.y<0.01`, Group Type Primitives, Delete Non Selected off. Shows a string field with a menu button |
| `spin` | `xform` | (0, -2.8) | Rotate Y keyframed: 0 at frame 1, 180 at frame 48. Translate Y expression `sin($F * 7.5) * 0.25`. Translate X and Z `ch("../CONTROLS/offsetx")` / `ch("../CONTROLS/offsetz")` |
| `color1` | `color` | (0, -4) | Color: `ch("../CONTROLS/base_colorr")`, `...g`, `...b` |
| `OUT` | `null` | (0, -5.2) | Display and render flags |

Spare parameters on `CONTROLS` (build them with `hou.ParmTemplateGroup` and `node.setParmTemplateGroup()`; keep this order):

Tab folder **Shape** (`hou.folderType.Tabs`):

| Name | Label | Kind | Value | Notes |
|------|-------|------|-------|-------|
| `rows` | Rows | Int, slider range 2 to 100 | 20 | |
| `height` | Height | Float, slider range 0 to 2 | 0.5 | |
| `offset` | Offset | Float x 3 (vector) | (0, 0, 0.5) | Axis markers; `spin` reads `offsetx` / `offsetz` |
| `sep1` | | Separator | | |
| `mode` | Mode | Menu: `grid` "Grid", `rings` "Rings", `random` "Random" | `rings` | Inspector shows "Rings", tooltip "Token: rings" |
| `ring_count` | Ring Count | Int, range 1 to 12 | 5 | Hide When `{ mode != rings }`: visible |
| `seed` | Seed | Int | 7 | Hide When `{ mode != random }`: hidden, so it is not in the file |
| `use_jitter` | (label hidden) | Toggle, `join_with_next` | off | Drawn in the left gutter |
| `jitter` | Jitter | Float, range 0 to 1 | 0.2 | Disable When `{ use_jitter == 0 }`: drawn disabled |

Tab folder **Look**:

| Name | Label | Kind | Value | Notes |
|------|-------|------|-------|-------|
| `look_label` | | Label | `Every node reads its settings from here.` | |
| `base_color` | Base Color | Float x 3, look Color | (1.0, 0.45, 0.1) | |
| `colors` | Colors | Color ramp | 3 keys: 0 blue (0.1, 0.3, 0.9), 0.5 white, 1 orange (1.0, 0.45, 0.1); Linear | |
| `profile` | Profile | Float ramp | 3 keys: (0, 0), (0.5, 1), (1, 0.3); Monotone Cubic | |
| `notes` | Notes | String, multi-line | `Rows sets the grid resolution.` (new line) `Height sets the extrusion.` | Shown as a text block |
| `advanced` | Advanced | Collapsible folder (`hou.folderType.Collapsible`) | | Starts closed in the viewer |
| `tolerance` | Tolerance | Float, inside Advanced | 0.001 | |
| `cache_name` | Cache Name | String, inside Advanced | `parameters_demo` | |

Sticky notes:

1. Right of `CONTROLS`: `Click CONTROLS: tabs, sliders, menus, ramps and folders look like Houdini's parameter pane.`
2. Right of `spin`: `Teal fields are animated or driven by an expression. For an expression you see the formula and its value.`
3. Right of `polyextrude1`: `This file shows every parameter. Bold values were changed from the default.`

**Check:** `CONTROLS` shows two tabs; `seed` is missing and `ring_count` present; `jitter` is greyed out with its toggle in the gutter; the menu shows "Rings"; both ramps are drawn; "Advanced" opens on click; `spin` shows f(x) on Translate Y and the keyframe color on Rotate Y; `grid1` rows show `ch("../CONTROLS/rows")` with "= 20"; `polyextrude1` shows its real tabs; `fuse1` has its toggle in the gutter; `blast1` has a menu button next to Group. The file should stay under 200 KB (full mode is larger: check).

## 5. `node_looks-network.json` (Node Looks)

**Goal:** everything that makes the viewer look like Houdini's network editor: the four flag slots, faded bypassed nodes, node colors and shapes, all kinds of network boxes, sticky notes and dots, and the wide input bar of Merge and Switch.

**Export:** Save .json File (Compact Parms). MCP: `export("node_looks")`.

Three areas, each in a network box.

**Box "Flags"** (comment `Flags`, color (0.35, 0.35, 0.45)), a chain at x = -4:

| Node | Type | Settings | Shows |
|------|------|----------|-------|
| `source` | `sphere` | Primitive Type Polygon, Frequency 4 | |
| `bypassed` | `polybevel` | Distance 0.05, **bypass flag**. Comment `Bypassed: Houdini skips this node`, shown in the network | yellow flag, faded node, comment |
| `templated` | `xform` | Uniform Scale 1.2, **template flag** | pink flag |
| `locked` | `subdivide` | Depth 1, **hard lock** (`setHardLocked(True)` after it cooked once) | red flag |
| `flags_out` | `null` | | |

**Box "Shapes and Colors"** (comment `Shapes and Colors`, color (0.3, 0.42, 0.35)), a row of six `null` nodes at y = 2, 2 units apart, each with a shape and a color, all wired into `merge_shapes` (`merge`, below the row):

| Node | Shape (`nodeshape`) | Color |
|------|---------------------|-------|
| `wave` | `wave` | red (0.85, 0.2, 0.2) |
| `cigar` | `cigar` | orange (1.0, 0.55, 0.1) |
| `chevron` | `chevron_down` | yellow (0.95, 0.85, 0.2) |
| `star` | `star` | green (0.35, 0.75, 0.3) |
| `cloud` | `cloud` | blue (0.3, 0.55, 0.95) |
| `circle` | `circle` | purple (0.6, 0.35, 0.85) |

Six inputs make `merge_shapes` draw the wide multi-input bar.

**Bottom area** (no box): `switch1` (`switch`, Select Input 1, inputs `flags_out` and `merge_shapes`) > `render_preview` (`null`, **render flag only**) and `OUT` (`null`, **display flag only**), side by side under `switch1`.

- Put two dots on the wire `merge_shapes` > `switch1`, one after the other; pin the second one (`setPinned(True)`). Selecting `merge_shapes` then highlights the wire through both dots.
- Rename `switch1` to `pick_branch` so its type label "Switch" shows above the name.

**Box "Helpers"**, minimized: a third box around two nodes `helper_a` and `helper_b` (`null`, wired together, off to the right), with **no comment** and a dark color (0.15, 0.15, 0.15), then `setMinimized(True)`. The viewer shows the box name (for example `__netbox3`) in light text and a plus glyph.

Sticky notes, one of each kind:

1. Title above everything, **without background** (`setDrawBackground(False)`), white text: `Node Looks`
2. Yellow, dark text, next to the Flags box: `Flags sit on the node ends like in Houdini: yellow bypass, red lock, pink template, blue display and render.`
3. Blue (0.3, 0.45, 0.75) with white text (`setTextColor(hou.Color(1, 1, 1))`), next to the shapes: `Colors and shapes come straight from your scene. Click a node to see why it looks the way it does.`

**Check:** the four flag colors are in the right slots; `bypassed` is faded with a grey name and shows its comment; the six shapes match Houdini; `merge_shapes` and `pick_branch` have the wide input bar; selecting `merge_shapes` highlights the wire through both dots; `render_preview` and `OUT` both show the blue slot; the minimized box is a single bar; the title note has no background. Compare one screenshot with Houdini's network editor side by side.

## 6. `assets-network.json` (Subnetworks and Assets)

**Goal:** working with depth: nested subnetworks and the path bar history, Sub-Network Input items, and your own digital assets. One asset is unlocked (open red padlock, can be entered), one is locked (grey padlock, exported closed), both with original custom SVG icons that travel inside the file.

**Export:** Save .json File (Compact Parms). The exporter then asks about the locked asset: choose **Export Closed (Recommended)**. MCP: `export("assets")` must return `closed_assets == ["emjud::rounded_brick::1.0"]`.

### The two assets

Create both from subnets inside `/obj/assets/scene` with `subnet.createDigitalAsset(...)`, saved to `$HIP/otls/`, one input, one output each.

| Asset | Type name | Label | Inside | State in the scene |
|-------|-----------|-------|--------|--------------------|
| Pebble Scatter | `emjud::pebble_scatter::1.0` | Pebble Scatter | Input 1 > `scatter1` (Force Total Count 40) > `copytopoints1` (input 1: `pebble` = `sphere`, Polygon, Uniform Scale 0.06; input 2: `scatter1`) > `output0` | **Unlocked**: `node.allowEditingOfContents()` |
| Rounded Brick | `emjud::rounded_brick::1.0` | Rounded Brick | `box1` (Size 0.4, 0.2, 0.2) > `polybevel1` (Distance 0.02) > `output0` (input 1 unused) | **Locked** (as created, or `node.matchCurrentDefinition()`) |

Icons: add each SVG below as section `IconSVG` (`definition.addSection("IconSVG", svg)`) and set the icon with the **full** path, for example `definition.setIcon("opdef:/emjud::Sop/pebble_scatter::1.0?IconSVG")`, so the exporter can read and embed it. These are original drawings made for this file.

Pebble Scatter icon:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><ellipse cx="20" cy="40" rx="13" ry="10" fill="#9aa3ad"/><ellipse cx="42" cy="44" rx="11" ry="8" fill="#7d8792"/><ellipse cx="33" cy="22" rx="10" ry="8" fill="#b7bec6"/><ellipse cx="17" cy="37" rx="5" ry="3" fill="#ffffff" opacity="0.35"/></svg>
```

Rounded Brick icon:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="6" y="18" width="52" height="28" rx="7" fill="#c8643c"/><path d="M6 32H58M24 18V32M40 32V46" stroke="#7a3a22" stroke-width="3" fill="none"/></svg>
```

### The network

Top level `/obj/assets`:

| Node | Type | Settings |
|------|------|----------|
| `ground` | `grid` | Size 4 x 4, Rows and Columns 10 (left) |
| `wall_curve` | `line` | Length 3, Points 8, Direction (1, 0, 0) (right) |
| `scene` | `subnet` | Input 1: `ground`, input 2: `wall_curve`. Node color blue (0.3, 0.5, 0.85) |
| `OUT` | `null` | Display and render flags |

Inside `scene` (level 2):

| Item | Type | Settings |
|------|------|----------|
| Sub-Network Input #1 | indirect input | from `ground` (the viewer shows its name) |
| Sub-Network Input #2 | indirect input | from `wall_curve` |
| `pebble_scatter1` | `emjud::pebble_scatter::1.0` | Input: Sub-Network Input #1 |
| `bricks` | `copytopoints` | Input 1: `rounded_brick1`, input 2: Sub-Network Input #2 (dotted wire) |
| `rounded_brick1` | `emjud::rounded_brick::1.0` | Above `bricks` |
| `tag_pieces` | `attribwrangle` | Run Over Primitives, code `s@part = "wall";`. A wrangle you cannot enter |
| `merge1` | `merge` | Inputs: `pebble_scatter1`, `tag_pieces` |
| `props` | `subnet` | Input 1: `merge1`. Node color blue (0.3, 0.5, 0.85) |
| `output0` | `output` | Input: `props`. Display flag |

Wiring: `rounded_brick1` > `bricks` > `tag_pieces`; `pebble_scatter1` and `tag_pieces` > `merge1` > `props` > `output0`.

Inside `scene/props` (level 3): Sub-Network Input #1 > `scatter_props` (`scatter`, Force Total Count 6) > `copytopoints1` (input 1: `crate` = `box`, Uniform Scale 0.3) > `details` (`subnet`) > `merge1` (also takes Sub-Network Input #1) > `output0`.

Inside `scene/props/details` (level 4): Sub-Network Input #1 > `polybevel1` (Distance 0.03) > `color1` (Color (0.55, 0.38, 0.2)) > `output0`.

Sticky notes:

1. Top level, right of `scene`: `Double-click scene to go inside. It holds more subnetworks: the path bar keeps the way back.`
2. In `scene`, next to the two assets: `Your own assets show a padlock. Red and open: unlocked, you can go inside. Grey: locked, exported closed.`
3. In `scene`, next to `tag_pieces`: `Wrangles are not subnetworks here: there is nothing inside to show.`
4. In `scene/props/details`: `Four levels deep. Use the back button or click a name in the path bar. Deeper levels you visited stay in the path bar, dimmed.`

**Check:** `pebble_scatter1` has the red open padlock, its pebble icon and can be entered; `rounded_brick1` has the grey padlock and its brick icon and cannot be entered; the file has exactly two entries in `icons` and no `IconSVG` text elsewhere; `scene` shows "Sub-Network Input #1 / ground" and "#2 / wall_curve"; diving to `details` and clicking `assets` in the path bar keeps `scene > props > details` dimmed; back and forward work; `tag_pieces` only selects on double-click.

## Separate privacy check (never publish)

To check the path scrubber in Houdini (Owner To-Do "Houdini check of the exporter"), build a throwaway object `/obj/privacy_check` with three `rop_geometry` nodes (they do not cook, so the paths need not exist), Output File:

1. `$HIP/geo/pebbles.$F4.bgeo.sc`, expected unchanged.
2. Your Desktop folder with a file name, for example `C:/Users/<you>/Desktop/test.bgeo.sc`, expected `<path>/test.bgeo.sc`.
3. A server share, `//studio-nas/clients/acme/a.bgeo.sc`, expected `<path>/a.bgeo.sc`.

Export with MCP `export("privacy_check")` but save the file **outside the repository**, read it, then delete it and the object. Never keep it in `fixtures/`.

## After exporting

- Add the three new files to `src/playground/examples.ts` (keys `params`, `looks`, `assets`, after `foreach`), so they appear in the Networks pane.
- Open every file with **Open file** in the playground (`npm run dev`) and go through its check list. If a new file does not show up in the Networks pane, restart `npm run dev`.
- `grep "<path>" fixtures/examples/*.json` must find nothing, and `grep -i "users" fixtures/examples/*.json` must find no home folder.
- The browser tests use the Circuit examples (`?example=board`), so the new files need no test changes. If you rename an example key in `examples.ts`, links like `?example=start` change with it.
- `fixtures/circuit_gen-network.json` still needs one more export with the current exporter (see Owner To-Do in `docs/STATUS.md`).
