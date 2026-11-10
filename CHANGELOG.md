# Changelog

All notable changes to this project are documented here. Versions follow [Semantic Versioning](https://semver.org/); `alpha` releases can still change the JSON schema and the component API.

## Unreleased

### Playground
- **Example page without jumps:** the example network at the top is part of the page from the start, and the space for the embed options and code under each network is reserved before the page script has loaded. The page no longer jumps while it loads (layout shift 0.36 on desktops and 0.88 on phones before, now under 0.01). The top network also keeps its height: the page reserved 480px, but the Height option starts at 600px, and on phones it now gets 70% of the screen height like the other networks.
- The phone status bar shows "Not affiliated with SideFX." again, next to the NOP icon, name and version.
- The welcome card text is shorter.

### Viewer
- **No jump when a network appears:** for one frame every viewer showed its network unframed (large, in the top-left corner) before it jumped into the start view. The network now stays hidden over the grey canvas until the start view is on screen.
- **Compile Block icons:** Compile Block Begin and End have their own drawings (the For-Each bricks in orange, so they show on the yellow Compile nodes) instead of the default emblem.

## 0.1.0-alpha.3 (tester release, 2026-11-05)

Fixes from the owner's test on a phone (mobile Chrome), on top of 0.1.0-alpha.2.

### Viewer
- The Parameter Inspector header no longer lists the flags as badges (Display, Bypass, ...): they show on the node itself.
- On phones the parameter sheet slides up when it opens and down when it closes (at once with reduced motion).
- The Exit fullscreen button shows the blue selected state instead of a gold icon.

### Web component
- An embed's space is the canvas grey from the start: the web component snippet and the iframe snippet set the background, and so does the element itself, so the page shows a grey area instead of an empty gap while the viewer loads.

### Playground
- **Phones:** the floating Networks pane scrolls as a whole (nothing is pinned), its buttons are smaller (the tap area stays 44px), the status bar shows only the NOP icon, name and version, and the page itself no longer scrolls, which left a gap at the bottom in mobile Chrome.

## 0.1.0-alpha.2 (2026-10-29, finished 2026-11-05; not handed to testers, replaced by 0.1.0-alpha.3)

Fixes from the repository review of 2026-10-27 (summary and finding IDs in `docs/HISTORY.md`).

### Exporter (schema 1.4.0)
- **Privacy:** every absolute path outside `$HIP`, `$JOB` and the Houdini folders now keeps only its file name (`<path>/rock.exr`), including other drives, home folders, server shares (server and share names removed) and `/mnt` or `/Volumes` paths. Houdini node paths stay. Embedded custom SVG icons lose their editor metadata (Inkscape and Illustrator paths, author names). Menu labels are scrubbed too.
- **Locked assets:** the insides of locked assets that are not from SideFX or Labs are no longer exported unless you choose "Include Insides" in the new dialog. The hotkey never includes them. Their icons are still exported.
- New optional `exportWarnings`: parameters that could not be read are counted and reported in the status bar.
- Asks before overwriting a file when it adds `.json` to the chosen name.
- Hide-when / disable-when rules evaluate each parameter once per node (faster exports of heavy networks).
- Houdini package: `nop.json` uses `$HOUDINI_PACKAGE_PATH`, so the package works in any package folder; the variable is now `$NOP_EXPORTER_ROOT`. The download zip is reproducible. The package adds its folder with `hpath` instead of the deprecated `path` key.

### Viewer
- **Houdini pane header:** the path bar and the tools no longer float over the canvas. They form one docked row like Houdini's Network Editor: the path bar, then the node count (hidden in narrow viewers), wire style, overview, (debug) Download JSON and fullscreen as icon buttons. Viewers narrower than 448px (phones) keep the back and forward buttons but show only the level on screen and no Download JSON button.
- **Fullscreen instead of Fit:** the fullscreen button is shown by default (`showFullscreenButton` / `fullscreen="false"` hides it); entering and leaving fullscreen fits the network to the new size. The Fit button is gone: `H`, or a double-click or double-tap on the empty canvas, fits the network.
- **Code colors like Houdini 22:** VEX and Python code use the colors of Houdini's own editor (attributes pale yellow, types light blue, functions violet, keywords blue, numbers gold, strings green) on its `#131313` field with a grey line number strip.
- In code taller than its field, the grey line number strip now runs down to the last line.
- **Round nodes** (the `circle` shape, also `cop` and `shop`) show their flag areas like Houdini: an inner ring and four spokes.
- **Empty network boxes:** a box without a comment shows no title (it showed its internal name such as `__netbox3`), like Houdini.
- **Python SOP icon:** the two interlocking snakes (vendor logo, redrawn).
- **Network box titles** are black or light grey, whichever has more contrast on the box color (Houdini's default grey keeps its black title; dark boxes get a light one).
- **Double-clicking a subnetwork** works anywhere on a phone: the first click on a node you can go inside opens its parameters after the double-click time (400 ms), so the bottom sheet no longer opens over the node and catches the second tap.
- **Screenshot:** a new header button saves what the network shows (the current pan and zoom, without the header, the parameter pane and the overview) as a sharp PNG named after the level, for example `for_each.png`. It is drawn in the browser; the drawing code (`html-to-image`, a new dependency) loads only on the first screenshot.
- **Settings menu on phones:** viewers narrower than 448px put the wire style ("Default (straight)" or "Rounded"), the network overview and the screenshot into one settings button (gear) with a drop-down menu in the style of Houdini's menus, which leaves room for the path bar. Wider viewers keep them as their own buttons. Phones can now open the overview too; it starts closed there, even with `minimap="true"`. `Shift+S` and `O` still work.
- **Touch screens:** new `touchPan` prop / `touch-pan` attribute. By default (`two-fingers`) one finger scrolls the page past the viewer and two fingers move and zoom the network, with a short hint that has a big **Open fullscreen** button; in fullscreen one finger moves it. `one-finger` keeps one-finger panning (the playground uses it).
- **Narrow viewers** (under 448px) frame a node with zoom at most 1 instead of 1.6 (`F`, `focusNode`), so its name and label stay on screen.
- **Start view settings:** the network overview now starts **closed** (`showMiniMap` / `minimap="true"` opens it at the start). New `focusNode` prop / `focus-node` attribute: the view starts framed on that node of the top level, like Houdini's `F` (default: the whole network). A page that changes it later gets the new view right away. The wire style still comes from the prop or attribute, else from the network file, else Houdini's default straight style.
- **Middle mouse button pans** the network, like in Houdini. Over the viewer it never starts the browser's auto-scroll; elsewhere on the page it works as usual.
- **Selected nodes stay in view:** when the Parameter Inspector opens beside (or below) the canvas and covers any part of the clicked node, the view pans the node to the middle of the remaining canvas and keeps the zoom. A fully visible node does not move the view.
- **Removed visitor controls:** the S / M / L label size switch (the size stays a setting of the embedding page: `labelSize` prop, `label-size` attribute or URL parameter), and Copy JSON.
- **For-Each and Compile blocks:** the tinted underlay Houdini draws behind a block, a rounded outline in the Block End color around the begin, metadata, in-between and end nodes. Works with existing exports (read from `blockpath`).
- **Block method labels:** For-Each Block Begin and End nodes show their method in blue under the name (`Point`, `Metadata`, `Merge`, ...), like Houdini. Works with existing exports.
- **Dotted wires:** the wire into the second input (target points) of Copy to Points is dotted, like Houdini. Works with existing exports.
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
- Correct source maps for the minified web component. Peer range narrowed to React 18 (the tested version). `engines.node` is `>=20`. The package ships `schema/nop-network-1.schema.json`.

### Playground
- **Houdini layout:** no menu bar. A collapsible **Networks** pane with the example files beside the network view (folded on phones, floats over the network when opened and folds again on a tap beside it): **Open file** and **Paste** at its top, and at its bottom (trial) an about block with the NOP logo, "NOP", "Playground for Houdini Network Web Viewer", the version, **Get the exporter** and **Feedback**. A pane tab over the network, and a status bar with the Houdini version of the network on screen, the exporter version and, while the pane is folded, the NOP icon and name. The page title is "NOP Playground". The Houdini version badge is gone.
- **Tester onboarding:** a one-screen welcome card on the first visit (export, explore, embed; **Help** opens it again). **Embed** at the bottom of the Networks pane (with **Get the exporter**, **Example page** and **Help**) opens the embed code; for the examples the file address is filled in and works, because the playground now publishes the example files at `examples/`. An **example page** (`example-site.html`) shows two networks on a plain light page through the real `<houdini-network>` web component, published at `lib/`; on phones its viewers use the full width and 70% of the screen height. Example rows describe what they show, `?example=<key>` links open one, and new examples in `fixtures/examples/` appear on their own.
- **Upload a Houdini file:** the Feedback form links a Dropbox file request for `.hip` files that did not export or show correctly (no account needed). The form itself still never sends files.
- **Welcome banner:** the welcome card opens with a picture banner and the NOP logo and name, like Houdini's Start Here window (left out on short screens).
- **Embed opens the example page** (formerly "Embed this network" and its dialog): a new tab shows the Start Here example on a plain web page with the real `<houdini-network>` tag, and under it the options and the HTML / React / iframe code to copy; the network follows the options. The page always shows Start Here, whatever the playground shows. The article networks on the page (For-Each Loop and VEX Wrangles) have their code underneath too.
- **Banner in the Networks pane:** the welcome card's banner (a little smaller) replaces the logo and tag line at the bottom of the pane.
- **Your Files:** directly under the examples in the Networks pane and always in view (on short screens the example list scrolls instead), with its title, "No networks uploaded" while it is empty, and a drop zone under it: a dashed frame with an upload icon, "Drop a .json file here", a blue Open file and a grey Paste button and a note that files stay in the browser. It lights up blue while a file is dragged over the page; on touch screens it shows only the buttons and the note. Every network you open, drop or paste gets its own row between the title and the box, for as long as the page is open; the same file again reloads its row, and pastes are named after their network. All example rows have the same height (room for two description lines).
- In the welcome card, **Get the exporter** and **Embed** open the exporter download and the example page. **See the example page** opens it in a new tab too.
- **Example page:** every way onto the page leads to the embedder with its options and code. Its first heading, "Embed a network on your website", is as big as the article's. **Start framed on node** is a list of the network's nodes instead of a text field, and the network on the page frames the chosen node right away. New options set the fullscreen button and the Download JSON button.
- **Node counts** of all examples show in the Networks pane from the start (read from the files when the playground is built), not only after an example was opened. The pane is a little wider on desktops (320px), and the version line under its banner moved to the status bar ("Playground", next to "Exporter").
- New example networks for first-time visitors, replacing the Circuit Board and Circuit Gen demos: Start Here, VEX Wrangles, For-Each Loop, Parameters, Node Looks, and Subnetworks and Assets (each shows one part of the viewer).
- The playground uses the package only through its public API (`src/api.ts`, enforced by ESLint).

### Icon
- **New NOP icon:** a bolder spider web with two turns and a 34px stroke, easier to read at favicon sizes. It replaces the favicons, app icons, social preview image and the Houdini shelf icon (now the see-through version, as `icons/nop.png`); the whole pack (orange, white, dark, black, rounded, circle, cutout) is regenerated by `scripts/build_nop_icon_pack.py`.
- Demos load on demand; the small Circuit Board demo opens first. Content-Security-Policy meta tag. Embed dialog: "Not on npm yet" note on the HTML and React tabs, a height field that keeps what you type. A network from another site is labelled with its host in embed mode. Feedback sends the page address without its query and names Web3Forms. Proper tabs and a page heading for screen readers.

### Project
- **Renamed WOP to NOP** (2026-10-28): npm package `nop-houdini-network-viewer`, CSS prefix `.nop-` (`.nop-root`), exporter `nop_exporter.py`, Houdini package `nop.json` with `$NOP_EXPORTER_ROOT`, shelf **NOP**, schema file `schema/nop-network-1.schema.json`. Exported network files are unchanged and keep working. Upgrading from the WOP exporter (before 2026-10-28): delete the old `wop.json` and the `wop` folder first, otherwise Houdini shows both shelves.
- Tests: Vitest unit and component tests, Python exporter tests with a fake `hou`, Playwright browser tests in Chromium, Firefox, WebKit and device profiles. ESLint, `.editorconfig`, `.nvmrc`. CI workflow on every push and pull request; SHA-pinned actions and Dependabot. `SECURITY.md`, `CONTRIBUTING.md`, `docs/TESTING.md`, JSON Schema file, agent skills rewritten and three new ones.

## 0.1.0-alpha.1 (tester release)

Hosted playground for a small group of testers. Not published on npm yet.

### Exporter
- Houdini package: `wop-exporter.zip` installs a **WOP** shelf with "Export for WOP" and "Copy for WOP" by copying it into the Houdini `packages` folder. The manual shelf tool setup still works.

### Playground
- **Exporter** button: download the Houdini package (or the plain `wop_exporter.py`) with install steps.
- **Feedback** button: testers send a message straight to the author's email (shown when the build sets `VITE_WEB3FORMS_KEY`).
- The Icon Review tab is now only in the dev server, no longer in the hosted playground. Since 2026-10-29 it is opened with a `?icons` link instead of a row in the Networks pane.
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
