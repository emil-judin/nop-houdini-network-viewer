# Changelog

All notable changes to this project are documented here. Versions follow [Semantic Versioning](https://semver.org/); `alpha` releases can still change the JSON schema and the component API.

## 0.1.0-alpha.1 (tester release)

Hosted playground for a small group of testers. Not published on npm yet.

### Exporter
- Houdini package: `wop-exporter.zip` installs a **WOP** shelf with "Export for WOP" and "Copy for WOP" by copying it into the Houdini `packages` folder. The manual shelf tool setup still works.

### Playground
- **Exporter** button: download the Houdini package (or the plain `wop_exporter.py`) with install steps.
- **Feedback** button: testers send a message straight to the author's email (shown when the build sets `VITE_WEB3FORMS_KEY`).
- The Icon Review tab is now only in the dev server, no longer in the hosted playground.
- Link previews: absolute `og:url` / `og:image` when the hosted address is known; `noindex` while testing.
- Deployed to GitHub Pages by `.github/workflows/deploy-playground.yml`.

### Viewer
- Active flag colors (template, display) no longer spill past the node's edge.
- Files from a newer major schema version show a clear "update the WOP viewer" message instead of being misread (see the versioning policy in `docs/SCHEMA.md`).

### npm package
- `style.css` is scoped to the viewer: its utility classes, React Flow overrides and theme variables no longer touch the host page, and a host's own Tailwind classes no longer restyle the viewer.

## 0.1.0-alpha.0 (not published)

First alpha of WOP, prepared for npm as `wop-houdini-network-viewer`.

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
