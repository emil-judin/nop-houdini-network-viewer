# Changelog

Notable changes to NOP. Versions follow [Semantic Versioning](https://semver.org/); `0.x` alpha releases can still change the JSON schema and the component API.

## Unreleased

### Added
- The npm package exports `NetworkLoadingState`, `NetworkErrorState` and `MAX_NETWORK_BYTES`, so a React app that loads the network itself can show the viewer's loading and error panels and check the file size limit ([docs/EMBEDDING.md](docs/EMBEDDING.md)).

### Changed
- Planned work and bugs are tracked in [GitHub issues](https://github.com/emil-judin/nop-houdini-network-viewer/issues) instead of the roadmap's checklists. Every change starts from an issue, branches are named `<issue>-<topic>`, and commits follow Conventional Commits with NOP's areas as scope, checked by `npm run lint:commits` and in CI ([decision 0016](docs/decisions/0016-issues-branches-and-commit-names.md)).
- The link preview lockup (icon, name and tagline) is a bit smaller, so the tagline keeps the same distance from the spider web as on the README banner.
- The playground uses only the public API ([decision 0010](docs/decisions/0010-one-repository-public-api.md)): it loads the SideFX Labs icons on demand like an embed, instead of bundling them up front.

### Removed
- Unused NOP logo files: the icon pack in `design/nop-icon/pack/` (rounded, circle, white-web, white and dark variants and PNG sizes), its preview page `design/nop-icon/web.html`, `design/nop-icon/nop-icon.svg`, the unlinked `public/favicon-16x16.png` and `favicon-32x32.png`, and `scripts/build_nop_thicker_variants.py`. `scripts/build_nop_icon_pack.py` now writes only the used files (the cutout master, the website icons, the manifest and the Houdini shelf icon); the shipped icons are unchanged.

## 0.1.0-alpha.9 (2026-11-26, tester release)

### Added
- Exporting a selection now shows where it connects to the rest of the network: each wire to an unselected node is drawn as a short stub that starts like the real wire, solid or dotted, and fades out toward that node. The file keeps where the outside nodes are and their operator types, never their names (schema 1.5.0, `outsideWires`, [decision 0015](docs/decisions/0015-stubs-for-wires-outside-a-selection.md)). Re-export a selection to get the stubs. A new playground example, Shared Selection, shows them.

### Fixed
- Fitting the view (on load, H, F, double-click, fullscreen and resize) now frames the node names too, so a node at the right edge no longer loses its name.

### Changed
- The Houdini scenes (the examples scene and the logo scene) and the two example assets are no longer in the repository: they were saved with a non-commercial Houdini license, which SideFX restricts to non-commercial use, so they cannot be shared under the MIT License. The example networks stay as JSON exports.
- The playground's Welcome card explains NOP instead of listing the examples: what it is, then "How it works" in three steps with round icons (export from Houdini, embed on your website, explore), side by side and centered on wide screens. The examples stay in the Networks pane.
- The example thumbnails and `scripts/capture_example_thumbnails.mjs` are removed: only the old Welcome card's example list used them.

## 0.1.0-alpha.8 (2026-11-19, tester release)

### Added
- Built-in SOP operator icons for all 44 family batches and the approved modeling batches (825 icons total) are now live: Group, Attribute, Edge and Curve, Poly, USD, Pack and Unpack, File and IO, DOP/LOP and other Networks, NURBS, UV, Material, Heightfield, Cloud and Sky, Volume, Pyro, FLIP, Ocean, MPM, Vellum, RBD, Tet/FEM, Muscle, Tissue, Pose-Space Arms, Bone/Capture, Feathers, Groom, Agents, KineFX, APEX, ML, Points, Remesh, Deformers, Topo, Test Geometry, and SOP utilities.

### Fixed
- Bake ODE, Cache, Control, Match Topology, Starburst, Superquad and Wire Transfer show the Sort gear, and Python Snippet and Table Import the Python icon, like in Houdini, instead of the default emblem.

### Changed
- The web component is back to about 180 KB gzipped (from 390 KB): the built-in SOP icons load per domain, only the domains a network uses (59 to 78 KB for the example networks), found through a small index (decision 0014). Shared drawing parts load in small files of their own. The npm package splits them the same way. After changing a SOP drawing's types or icon ids, run `npm run icons:index`.
- Added an independent-project disclaimer to the top of the README and to the Playground's Welcome dialog.
- Operator icons are drawn in a separate repository, nop-icon-pipeline, one visual family at a time (large families in rounds), with Houdini references built from the local install, a reference sheet, an automated pre-screen (bounds, stroke, contrast and reference checks), an independent critic pass and a review gallery ([decision 0011](docs/decisions/0011-icon-workflow-family-micro-batches.md), [decision 0013](docs/decisions/0013-icon-pipeline-in-its-own-repository.md)). The playground's dev-only Icon Review Gallery (`?icons`) moved there; this repository keeps only the finished drawings ([docs/ICONS.md](docs/ICONS.md)). Icon drafts that were not approved in review were removed and redrawn.
- The built-in SOP icon drawings are organized in domain folders (attributes, modeling, IO, textures, terrain, volume, simulation, characters, ML, utility) with one file per visual family and shared drawings in `kits/`, instead of numbered batch files ([decision 0012](docs/decisions/0012-icons-organized-by-domain-and-family.md)).
- Compile Block Begin and End icons now use red bricks to match Houdini instead of orange.
- The NOP logo (favicons, home screen icons, Houdini shelf icon, icon pack, README banner and link preview image) and the playground's embed tip use the brand orange `#FF6600` (PMS 172) instead of `#FE4703`.
- The link preview image uses the same lockup as the README banner: the tagline sits under the name and the icon is as tall as both. It is now built by `scripts/build_og_image.py`.

## 0.1.0-alpha.7 (2026-11-16, tester release)

### Added
- The automated test suite is published: unit and component tests (Vitest), exporter tests with a fake `hou` and in a real Houdini session (`npm run test:exporter:houdini`, local only), and browser tests in Chromium, Firefox, WebKit and phone and tablet profiles (Playwright). Every scenario in `docs/features/` names its test, and CI runs them on every push.

### Fixed
- When the Parameter Inspector cannot be loaded (for example on a dropped connection), its panel now says the parameters could not be shown and asks to reload the page, instead of calling the network file invalid or damaged.
- Holding Shift while dragging the network pans it, instead of drawing a selection box that selected nothing.
- Nodes that keep the name Houdini gave them, such as `transform1` (type `xform`) or `group1` (type `groupcreate`), no longer show their type label above the name, like Houdini.
- Nodes without outputs, such as ROP Geometry Output, no longer show an output connector.
- Digital assets with more than 4 outputs (up to 10) show every output connector, smaller when needed so they do not overlap, like Houdini, and wires from outputs 5 to 10 are drawn again.
- Subnetworks show only the outputs they use. The exporter wrote Houdini's maximum (11 for every SOP subnet) as `maxOutputs` and now writes the number of outputs the node shows; for older exports the viewer counts the output labels instead.
- The exporter uses `hou.text.expandString`, as Houdini 22 asks: `hou.expandString` is deprecated.
- Routing dots no longer show their internal name (`__dot1`) as a tooltip.
- When a page switches `src` quickly, a download that arrives after it was cancelled can no longer replace the newer network.

### Changed
- Exports made before schema 1.2.0 no longer get a guessed padlock under namespaced or versioned operator types. That guess would also have marked built-in operators such as Copy to Points 2.0 as assets.

## 0.1.0-alpha.6 (2026-11-14, tester release)

### Added
- On the first visit, the playground points to the embed code from the network itself, 10 seconds after you start exploring: a card at the bottom left of the network on wide screens, with a screenshot of the example page, and a strip under the network on phones. Both slide in from below.

## 0.1.0-alpha.5 (2026-11-13, tester release)

### Added
- Every GitHub release has the exporter (`nop-exporter.zip`) attached, from 0.1.0-alpha.3 on.
- `THIRD_PARTY_NOTICES.md` lists the licenses of the fonts and libraries NOP ships. It is in the npm package and next to the playground page, and `web-component.js` points to it.

### Fixed
- Ramps no longer show their points as loose Position, Value and Interpolation fields in the Parameter Inspector, also in files exported before this fix.
- The exporter marks a ramp as changed when its points differ from the default, so compact exports keep edited ramps.

### Changed
- The playground's welcome card is a start screen: links for your own networks (exporter, open a file, embed) and to the docs and GitHub on the left, and the examples as a compact list with thumbnails on the right. A new script, `scripts/capture_example_thumbnails.mjs`, makes the thumbnails from the real viewer.
- New NOP banner on the README and in the playground, and a matching link preview image: an orb web seen head-on, like the NOP icon. The playground banner's name is set in Noto Sans, like the README banner.
- The playground's Networks pane is wider (360 instead of 320 pixels) beside the network.

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
