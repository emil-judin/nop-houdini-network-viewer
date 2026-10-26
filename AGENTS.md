# AGENTS.md - Agentic Engineering Guidelines

This file provides essential context, architectural invariants, and coding conventions for AI coding agents working in WOP (npm package `wop-houdini-network-viewer`).

## 1. Project Overview & Core Pillars

WOP (`wop-houdini-network-viewer`) is a lightweight, embeddable interactive web viewer for SideFX Houdini node networks, inspired by Klee for Unreal Engine. Tagline: "View and share Houdini node networks on the web."

**Naming:** the product name is **WOP**, always in capitals in visible text (UI, docs, exporter dialogs), never lowercase on its own. Lowercase `wop` only appears inside technical names: the npm package `wop-houdini-network-viewer`, the CSS prefix `.wop-`, the exporter file `wop_exporter.py`. Never start a package or product name with `houdini-` (it would look official). The HTML tag `<houdini-network>` and the React components `HoudiniNetwork` / `RemoteHoudiniNetwork` keep their names (owner decision).

Every change must strictly follow our **6 Core Pillars**:
1. **Usability (Frictionless Workflow):** Exporting from Houdini and embedding on a website must require minimal steps (1-click Shelf export, 1-line `<houdini-network>` Web Component, `<HoudiniNetwork />` React component, or `<iframe>` embed).
2. **Authenticity (1:1 Houdini Look & Feel):** Visuals must match Houdini's native Network Editor (exact node proportions, SVG shapes, left/right flag bars, wire routing, dark grid, and node RGB colors). Ask the user for reference screenshots if any visual detail is ambiguous.
3. **Strictly View-Only (Pure Visualization):** The viewer is read-only. Visitors can pan, zoom, toggle fullscreen, dive into subnetworks, and inspect parameters/VEX, but CANNOT drag nodes, rewire connections, toggle flags, or edit parameter values. Do not reimplement Houdini editing logic.
4. **Modularity & Readability:** Keep files small, single-responsibility, and strongly typed using modern TypeScript, React, and `@xyflow/react` conventions.
5. **Documentation & Style Consistency:**
   - Document all public types, functions, and components using TSDoc (`/** ... */`).
   - **No Long Dashes Rule:** Never use em-dashes or en-dashes in documentation, comments, or UI strings. Use standard hyphens (`-`), colons (`:`), parentheses, or separate sentences for neutral international styling.
6. **Compatibility (Mobile & Cross-Browser):**
   - Base layout and display settings must work in Android and iOS views (Chrome on Android, Safari on iOS/iPadOS): responsive layout down to phone widths, a standard `viewport` meta tag, touch-friendly pan and pinch-zoom, tap targets of at least 44px, no hover-only interactions, and safe-area insets respected in fullscreen.
   - Target current versions of the major modern browsers (Chrome, Edge, Firefox, Safari, desktop and mobile). Only use web platform features that are broadly supported (MDN "Baseline"). Do not rely on experimental, flag-gated, non-standard, or vendor-prefix-only APIs and CSS.
   - When a feature is not universally available, feature-detect it and degrade gracefully (for example, the Fullscreen API is unavailable for regular elements on iPhone Safari, so fall back to a CSS full-viewport mode or hide the toggle).

## 2. Tech Stack & Commands

- **Framework:** React 18 + TypeScript (Strict) + `@xyflow/react` + Tailwind CSS + Vite
- **Houdini Exporter:** Python 3 (`hou` HOM API) inside `exporter/`
- **Windows PowerShell Note:** On Windows PowerShell where script execution policy blocks `npm.ps1` and `&&` is unsupported in PS 5.1, invoke `npm.cmd` and separate commands with `;`.
- **Install Dependencies:** `npm.cmd install`
- **Start Dev Server:** `npm.cmd run dev`
- **Typecheck & Verify:** `npm.cmd run check` (runs `tsc --noEmit`)
- **Build Playground:** `npm.cmd run build` (output: `dist-playground/`)
- **Build Library / Web Component:** `npm.cmd run build:lib` (output: `dist/`)

## 3. Critical Architectural Rules

- **Coordinate System Conversion (`src/schema/converter.ts`):**
  - Houdini Network Editor uses Cartesian coordinates (`+Y` goes UP) in network units (`1.0` unit = `100px`).
  - Browser / React Flow uses screen coordinates (`+Y` goes DOWN) in pixels.
  - Always invert Y when converting from Houdini to screen space (`screenY = -(houY + height) * UNIT_SCALE`).
- **Multi-Input Connector Guard:**
  - Houdini nodes like `merge` or `switch` report `maxInputs: 9999`. Never render individual `<Handle />` elements in an unbounded loop. Any node with `maxInputs > 4` renders a single wide multi-input bar handle.
- **Subnetwork Recursion Guard (`exporter/`):**
  - Built-in Houdini SOPs like `attribwrangle` or SideFX Labs nodes return `isSubNetwork() == True`. Only recurse into user-authored `subnet` nodes or unlocked/custom HDAs to prevent multi-megabyte JSON bloat.
- **Library Styles (`src/styles/`):**
  - The npm and web component builds have no Tailwind preflight (it would reset the host page). Viewer components must look right with only the scoped `.wop-root` reset in `src/styles/reset.css`.
  - Use `px` for sizes in viewer components (arbitrary values like `text-[11px]`, or the px-pinned theme tokens), never raw `rem`: `rem` follows the host page's root font size, even inside a Shadow DOM.
  - Size viewer layouts with container queries (`@container`, `@2xl:`) on the viewer, not viewport breakpoints, because embeds are often narrower than the page.
- **Operator Icons (`src/components/nodes/icons/`):**
  - Every icon is an original drawing registered as an `OperatorIconDef` (built-in SOPs in `sop/`, SideFX Labs in `labs/`). Follow [docs/ICON_ART_BIBLE.md](./docs/ICON_ART_BIBLE.md) for style, palette, legal rules and workflow.
  - Never copy SideFX or vendor SVG data and never draw likenesses of real people. Vendor logos used by Labs integrations are redrawn by hand (owner decision, see the art bible's legal rules). SideFX reference icons stay in the gitignored `local-refs/` folder (built by `scripts/build_local_reference_icons.py`) and are served only by the dev server, never from `public/` or a build.

## 4. Continuity & On-Demand Skills

- **Before starting work:** Read [docs/STATUS.md](./docs/STATUS.md) to see the current milestone state and next tasks.
- **After completing a task:** Update [docs/STATUS.md](./docs/STATUS.md) so the next agent or human developer can continue seamlessly.
- **Specialized Skills:** Check `.agents/skills/` for detailed runbooks on the Houdini Graph Renderer (`houdini-graph-renderer`) and Houdini Python Exporter (`houdini-python-exporter`).
