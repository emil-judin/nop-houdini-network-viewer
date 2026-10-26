# Changelog

All notable changes to this project are documented here. Versions follow [Semantic Versioning](https://semver.org/); `alpha` releases can still change the JSON schema and the component API.

## 0.1.0-alpha.0 (unreleased)

First public alpha of WOP, published on npm as `wop-houdini-network-viewer`.

### Viewer
- View-only Houdini network canvas: authentic node shapes, flags, wires (default and rounded styles), routing dots, network boxes, sticky notes, subnet inputs and operator icons (original drawings, including all SideFX Labs SOPs).
- Parameter Inspector in the style of the Houdini 22 Parameter Pane: tabs and section folders, joined rows, toggles, menus, sliders, ramps (curves and gradients), expressions, keyframed and changed values, VEX / Python code with syntax highlighting. Resizable side panel or bottom sheet.
- Subnetwork navigation (double-click, `I` / `U`, Houdini-style path bar with node icons, back / forward history and the dimmed trail of visited subnetworks), network overview (click and drag, `O`), fit and frame (`H` / `F`), wire style toggle (`Shift+S`), fullscreen.

### Embedding
- React component (`<HoudiniNetwork />`, `<RemoteHoudiniNetwork />`) with `style.css`.
- `<houdini-network>` web component (Shadow DOM, `src`, inline JSON or `data` property).
- `?embed=true` iframe page and an embed code generator in the playground.

### Exporter
- Houdini shelf tool: clipboard or `.json` file, compact or full parameters, and a dialog-free "copy for web" function for a hotkey.
- Schema 1.3.0: parameter layout, hide-when / disable-when rules, ramps, digital asset state, path scrubbing, path bar nodes (`pathNodes`).

### Compatibility
- Tested with Houdini 22.0.466 and with Chrome (desktop and mobile emulation). Other Houdini versions and browsers are not tested yet.
