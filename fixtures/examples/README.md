# Playground Examples

Small networks made for the playground, each showing one part of the viewer. They are listed in `src/playground/examples.ts`; an example whose file is missing is simply left out, so the files can be added one at a time. The build publishes every `*-network.json` here at `examples/<file name>` next to the playground, so the Embed code for an example works as it is.

## Rules for every file

- **Houdini 22, SOP networks only.** Build each example inside its own Geometry object (for example `/obj/start_here`). No VOP, LOP, TOP or DOP networks: the viewer does not support them yet.
- **Built-in nodes only.** No third-party or paid assets, no locked assets of your own.
- **Export:** go inside the object, select nothing (the whole network), click **Export for NOP** on the NOP shelf and save the file here under the exact name given below.
- **Small and readable:** at most about 15 nodes per level, laid out top to bottom, and well under 200 KB per file. When the viewer fits the network on a laptop screen, the sticky notes must still be readable.
- **Sticky notes** are shown exactly as written, to every visitor: short sentences in English, nothing private, no file paths. Avoid long dashes (use a colon or a new sentence), like the rest of the project.
- **Check before committing:** open the file with **Open file** in the playground (`npm run dev`), click through it, and run `grep "<path>" fixtures/examples/*.json` (should find nothing). If a new file does not show up in the Networks pane, restart `npm run dev`.

## 1. `start_here-network.json` (Start Here, opens first)

Teaches the viewer itself. Object: `/obj/start_here`.

Nodes (about 10):

- Left branch: `box1` > `polybevel1` > `color1` (orange) into `merge1`.
- Right branch: `tube1` > `transform1` into `merge1`, with a **dot** on this wire.
- `merge1` > a subnetwork named `details` > a Null named `OUT` with the display and render flags.
- Inside `details`: `polyextrude1` > `normal1` > the subnet output.
- Put a colored **network box** titled `Shapes` around both branches, give two or three nodes a color, and turn on the comment of `polybevel1` (comment: `Rounds the edges`, with "Show comment in network" on).

Sticky notes (wording as suggested, change freely):

1. At the top: `Welcome! This is a real Houdini network, shown in your browser with NOP. Drag to move around, scroll or pinch to zoom.`
2. Next to `color1`: `Click any node to see its parameters. On a phone, tap it.`
3. Next to `details`: `This is a subnetwork. Double-click it (double-tap on a phone) to go inside.`
4. Inside `details`: `You are inside the subnetwork. Click start_here in the path bar at the top, or press U, to go back up.`
5. Next to `OUT`: `Press H to see the whole network again. The blue flag marks the node Houdini displays.`

## 2. `vex_wrangles-network.json` (VEX Wrangles)

Shows the code view of the parameter panel. Object: `/obj/vex_wrangles`.

Nodes: `grid1` (50 x 50) > Attribute Wrangle `wrangle_noise` > Attribute Wrangle `wrangle_color` > Null `OUT` (display flag).

`wrangle_noise` (Run Over: Points), then press the spare parameter button so `amplitude` (0.3) and `frequency` (2) appear as sliders:

```c
// Push the grid up and down with noise
float amp = chf("amplitude");
float freq = chf("frequency");
@P.y += (noise(@P * freq) - 0.5) * amp;
```

`wrangle_color` (Run Over: Points):

```c
// Color by height: low points blue, high points orange
float h = fit(@P.y, -0.15, 0.15, 0, 1);
@Cd = lerp({0.1, 0.3, 0.9}, {1.0, 0.45, 0.1}, h);
```

Sticky note next to the wrangles: `Click a wrangle to read its VEX code in the parameter panel.`

## 3. `for_each-network.json` (For-Each Loop)

Shows the loop block underlay and its blue method label. Object: `/obj/for_each`.

Nodes:

- `grid1` > `scatter1` (about 20 points) into the second input of `copytopoints1`; a small `box1` into its first input (Pack and Instance off).
- Then the **For-Each Connected Piece** block from the Tab menu (it creates `foreach_begin1`, `foreach_begin1_metadata1` and `foreach_end1`).
- Inside the block: `transform1` with a random rotation per piece, for example Rotate Y `rand(detail("../foreach_begin1_metadata1", "iteration", 0)) * 360`.
- After the block: a Null `OUT` with the display flag.

Sticky note next to the block: `A For-Each loop. NOP draws the block like Houdini, with the loop method in blue.`

## Also

- `fixtures/circuit_gen-network.json` still needs one more export with the current exporter (see Owner Steps in `docs/STATUS.md`).
- The browser tests use the Circuit examples (`?example=board`), so the new files need no test changes. If you rename an example key in `examples.ts`, links like `?example=start` change with it.
