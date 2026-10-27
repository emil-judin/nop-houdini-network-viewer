# Changelog

All notable changes to this project are documented here. Versions follow [Semantic Versioning](https://semver.org/); `alpha` releases can still change the JSON schema and the component API.

## Unreleased

Fixes from the repository review of 2026-10-27 (summary and finding IDs in `docs/HISTORY.md`).

### Exporter (schema 1.4.0)
- **Privacy:** every absolute path outside `$HIP`, `$JOB` and the Houdini folders now keeps only its file name (`<path>/rock.exr`), including other drives, home folders, server shares (server and share names removed) and `/mnt` or `/Volumes` paths. Houdini node paths stay. Embedded custom SVG icons lose their editor metadata (Inkscape and Illustrator paths, author names). Menu labels are scrubbed too.
- **Locked assets:** the insides of locked assets that are not from SideFX or Labs are no longer exported unless you choose "Include Insides" in the new dialog. The hotkey never includes them. Their icons are still exported.
- New optional `exportWarnings`: parameters that could not be read are counted and reported in the status bar.
- Asks before overwriting a file when it adds `.json` to the chosen name.
- Hide-when / disable-when rules evaluate each parameter once per node (faster exports of heavy networks).
- Houdini package: `wop.json` uses `$HOUDINI_PACKAGE_PATH`, so the package works in any package folder; the variable is now `$WOP_EXPORTER_ROOT`. The download zip is reproducible.

### Viewer
- **Keyboard:** Tab reaches every node, Enter opens its parameters (focus moves to the panel), Escape closes them and returns to the node. Tabs in the parameter panel work with the arrow keys. Visible focus rings.
- **Hotkeys** (H, F, I, U, O, Shift+S) now only act while the viewer has focus; new `hotkeys` prop and attribute (`focus`, `hover`, `off`).
- **Screen readers:** parameter rows are named groups, disabled parameters are announced as dimmed, label size buttons have names and pressed states.
- **Damaged files** are repaired or trimmed item by item instead of crashing; names such as `constructor` are safe. An error inside one subnetwork keeps the path bar and offers "Back to the top network".
- Long parameter values can be tapped to show them in full (touch screens).
- Several viewers on one page no longer go fullscreen together; the CSS fullscreen fallback sits above host page headers.
- Multi-input wires fan out in input order; boxes, sticky notes and dots can share a name with a node.
- Faster: linear code highlighting (long VEX snippets no longer freeze the tab), wire highlighting through an index, only visible items rendered in levels with more than 1,000 items.
- Copy JSON says when the clipboard is blocked. `showDebugActions` now defaults to `false`.
- Contrast raised for the path bar, the parameter panel and the playground footer; 24px minimum size for the small toolbar buttons; reduced motion respected.
- SideFX Labs types whose name starts with a digit (`labs::2d_wavefunctioncollapse`) now find their icon.

### Web component and npm package
- `web-component.js` is 176 KB gzip instead of 272 KB: the Parameter Inspector and the SideFX Labs icons load on demand from `web-component-chunks/`, fonts are separate files in `dist/fonts/` (also for `style.css`).
- Changing an attribute no longer resets the visitor's place; a JSON child added later by page scripts is read.
- Downloads have a 100 MB size limit and a 30 second time limit.
- Correct source maps for the minified web component. Peer range narrowed to React 18 (the tested version). `engines.node` is `>=20`. The package ships `schema/wop-network-1.schema.json`.

### Playground
- Demos load on demand; the small Circuit Board demo opens first. Content-Security-Policy meta tag. Embed dialog: "Not on npm yet" note on the HTML and React tabs, a height field that keeps what you type. A network from another site is labelled with its host in embed mode. Feedback sends the page address without its query and names Web3Forms. Proper tabs and a page heading for screen readers.

### Project
- ESLint, `.editorconfig`, `.nvmrc`. CI workflow on every push and pull request; SHA-pinned actions and Dependabot. `SECURITY.md`, `CONTRIBUTING.md`, JSON Schema file, agent skills rewritten and three new ones.

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
