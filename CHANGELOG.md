# Changelog

Notable changes to NOP. Versions follow [Semantic Versioning](https://semver.org/); `0.x` alpha releases can still change the JSON schema and the component API.

## Unreleased

### Removed
- The plain `nop_exporter.py` download and the manual shelf tool setup. Install the exporter as a Houdini package from `nop-exporter.zip`.

## 0.1.0-alpha.4 (2026-11-10, tester release)

### Fixed
- Viewers no longer flash the network unframed for one frame before the start view appears.
- The example page no longer jumps while it loads, and its top network keeps its height.
- Compile Block Begin and End nodes show their own icons instead of the default emblem.

### Changed
- The phone status bar shows "Not affiliated with SideFX." again.
- New link preview image for the playground: the NOP lockup next to a real network.
- Home screen icons (iOS, Android) draw the web in dark lines on orange, like the see-through icon on a dark page, and Android shows the full icon in its own shape instead of a small square on a white plate.
- Shorter welcome card text in the playground.

## 0.1.0-alpha.3 (2026-11-05, tester release)

### Changed
- The Parameter Inspector header no longer repeats the node's flags as badges.
- On phones the parameter sheet slides in and out (instantly with reduced motion).
- Exit fullscreen uses the blue selected state.
- Embeds show the canvas grey while they load instead of an empty gap.
- Playground on phones: the Networks pane scrolls as a whole, buttons are smaller (44px tap area kept), and the page itself no longer scrolls.

## 0.1.0-alpha.2 (2026-10-29, not handed to testers)

### Added
- **Viewer:** screenshot button (PNG of the current view), For-Each and Compile block underlays, block method labels, dotted Copy to Points wire, Houdini 22 code editor colors.
- **Viewer options:** `focusNode` / `focus-node` start framing, `touchPan` / `touch-pan`, `hotkeys`; the network overview starts closed.
- **Touch:** two fingers move the network in embeds and one finger scrolls the page, with an **Open fullscreen** hint.
- **Keyboard and screen readers:** Tab reaches every node, Enter opens its parameters, Escape returns; labelled parameter rows; visible focus rings.
- **Exporter:** optional `exportWarnings` (schema 1.4.0) for parameters that could not be read.
- **Playground:** six guided example networks, a welcome card, an example page that shows the real web component with copyable embed code, a "Your Files" list with a drop zone, node counts per example, and a feedback form.

### Changed
- **Exporter privacy:** every absolute path outside the project and Houdini folders keeps only its file name, including other drives, home folders, server shares and mount points. Embedded SVG icons lose their editor metadata.
- **Exporter:** the insides of locked third-party assets are only exported after **Include Insides** is chosen in a new dialog.
- **Viewer header:** one docked row like Houdini's Network Editor. Fullscreen replaces Fit (`H` or a double-click on the empty canvas still fits). Phones group the tools in a settings menu.
- Hotkeys only act while the viewer has focus. The middle mouse button pans.
- A selected node covered by the Parameter Inspector is panned into view.
- `web-component.js` is 176 KB gzip instead of 272 KB: the inspector, the SideFX Labs icons and the fonts load on demand.
- Downloads have a 100 MB size limit and a 30 second time limit.
- Playground layout follows Houdini: a collapsible Networks pane, a pane tab and a status bar.
- New, bolder NOP icon.
- **Renamed WOP to NOP:** npm package `nop-houdini-network-viewer`, CSS prefix `.nop-`, exporter `nop_exporter.py`, Houdini package `nop.json`. Exported files keep working. Delete the old `wop.json` and `wop` folder when upgrading.

### Fixed
- Damaged files are repaired or trimmed item by item instead of crashing, and an error inside one subnetwork no longer traps the visitor.
- Several viewers on one page no longer go fullscreen together.
- Multi-input wires fan out in input order.
- Long VEX snippets no longer freeze the page (linear-time highlighting).
- Round nodes, empty network boxes and box title contrast match Houdini.
- Double-tapping a subnetwork works on phones.
- Text contrast raised to at least 4.5:1, small buttons to at least 24px.

### Removed
- Visitor controls for label size and Copy JSON (label size is a setting of the embedding page).

## 0.1.0-alpha.1 (2026-10-27, tester release)

### Added
- Houdini package: a zip that installs a shelf with "Export" and "Copy" tools.
- Hosted playground on GitHub Pages with the exporter download and a feedback form.
- Schema versioning policy: files from a newer major schema version show a clear message.

### Changed
- The npm `style.css` is scoped to the viewer and no longer touches the host page.

### Fixed
- Active flag colors no longer spill past the node's edge.

## 0.1.0-alpha.0 (not published)

### Added
- View-only Houdini network canvas: node shapes, flags, both wire styles, dots, network boxes, sticky notes, subnet inputs and original operator icons, including all SideFX Labs SOPs.
- Parameter Inspector in the style of Houdini 22's Parameter Pane: folders, joined rows, toggles, menus, sliders, ramps, expressions, keyframed and changed values, VEX and Python code.
- Subnetwork navigation with a Houdini-style path bar and history, network overview, fit and frame hotkeys, wire style toggle, fullscreen.
- React components, the `<houdini-network>` web component and an iframe embed page.
- Houdini shelf exporter: clipboard or file, compact or full parameters, a dialog-free "copy for web" hotkey, and path scrubbing.
