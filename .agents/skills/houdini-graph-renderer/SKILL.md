---
name: houdini-graph-renderer
description: >-
  Visual specification and coordinate conversion rules for rendering authentic, view-only SideFX Houdini node networks in React Flow. Activate this skill when creating or modifying node components, node shapes, flags, wires, network boxes, sticky notes, or coordinate transformations.
---

# Houdini Graph Renderer Specification

Use this reference when implementing or modifying visual components in `src/components/` and coordinate conversion logic in `src/schema/converter.ts`.

## 1. Core Visual & Interaction Constraints

- **Strictly View-Only:**
  - React Flow must be configured with `nodesDraggable={false}`, `nodesConnectable={false}`, `edgesReconnectable={false}`, `elementsSelectable={true}`, `panOnDrag={true}`, and `zoomOnScroll={true}`.
  - Flag strips on nodes (`Bypass`, `Lock`, `Template`, `Display/Render`) are strictly visual status indicators and must not mutate state on click.
- **Ask for Reference Screenshots:**
  - If a visual detail of Houdini's Network Editor is unclear, ask the user for a reference screenshot from Houdini rather than guessing.

## 2. Houdini Color Tokens, Typography & Proportions

- **Typography (Matching `$HFS/houdini/fonts/font.map`):**
  - **Proportional UI & Node Labels (`--font-sans`):** `"Source Sans Pro"` (`@fontsource/source-sans-pro`, SIL Open Font License).
  - **Fixed / Parameter Numbers & VEX Code (`--font-mono`):** `"Source Code Pro"` (`@fontsource/source-code-pro`, SIL Open Font License).
- **Canvas Background:** `#242424` (major grid lines `#2e2e2e`, minor grid lines `#282828`).
- **Default SOP Node Color:** `[0.8, 0.8, 0.8]` (`#cccccc`), rendered with a subtle dark border (`#141414`) and slight vertical luminance gradient for authenticity.
- **Node Selection Highlight:** Bright yellow/gold outline (`#f5b800` / `#ffaa00`) when selected for parameter inspection.
- **Flag Colors (SOP Context):**
  - **Bypass (Left outer):** `#e5c130` (Yellow)
  - **Lock (Left inner):** `#d94040` (Red)
  - **Template (Right inner):** `#d45ca8` (Pink/Magenta)
  - **Display / Render (Right outer):** `#3098e5` (Cyan/Blue)
- **Standard Node Proportions (`UNIT_SCALE = 100`):**
  - Standard SOP node size in Houdini units is `[1.1296, 0.2824]`, which maps to `113px x 28px`.
  - Node name label (`node.name`) and comment text float outside to the right of the node body (`left: calc(100% + 8px)`), keeping the operator icon centered inside the node shape.

## 3. Node Shapes (`src/components/nodes/shapes/nodeShapes.ts`)

Every node shape renders as an inline `<svg viewBox="0 0 113 28">` (or scaled to `size`):
- `rect` (or `""`): Rounded pill/rectangle (`rx="4"`).
- `wave`: Attribute Wrangle shape with a curved wave contour on the bottom edge.
- `cigar`: Fully rounded stadium/capsule shape (`rx="14"`) used by `merge`.
- `diamond`: Diamond polygon used by `switch`.
- `null`: Framed bracket shape used by `null` nodes.
- `chevron_down`: Downward-pointing block header used by `block_begin` (For-Each Begin).
- `chevron_up`: Upward-pointing block footer used by `block_end` (For-Each End).
- `tilted`: Slanted parallelogram used by `attribpromote`.
- `circle`: Circular node body.

## 4. Multi-Input Connectors & Subnet Inputs

- **Discrete Inputs (`maxInputs <= 4`):** Space handles evenly across the top edge (`(i + 1) / (maxInputs + 1) * 100%`).
- **Wide Multi-Input Bar (`maxInputs > 4`):** Render a single wide pill handle centered at the top edge (`id="in-multi"`). Map all incoming edges (`toInput >= 0`) on multi-input nodes to this handle ID.
- **Subnetwork Indirect Inputs (`subnetInputs`):** Convert each entry `{"name": "1", "num": 0, "pos": [x, y]}` into a `<HoudiniSubnetInput />` node with ID `__subnet_input_1`, and rewrite any wire with `from == "1"` to `from: "__subnet_input_1"`.

