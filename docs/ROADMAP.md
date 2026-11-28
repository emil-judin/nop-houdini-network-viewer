# Roadmap

Where NOP stands and where it is heading. Open work is in the [issues](https://github.com/emil-judin/nop-houdini-network-viewer/issues), finished work in the [CHANGELOG](../CHANGELOG.md), lasting decisions in [decisions/](./decisions/README.md). An item below becomes an issue when work on it starts ([decision 0016](./decisions/0016-issues-branches-and-commit-names.md)).

## Current state

- **Version:** `0.1.0-alpha.9`, a tester release. The playground is hosted on GitHub Pages; the npm package is not published yet.
- **Schema:** `1.6.0` on `main` (`outsideWires` in 1.5.0, `multiparmIndex` in 1.6.0), `1.4.0` in the last release ([SCHEMA.md](./SCHEMA.md), machine-readable in `schema/nop-network-1.schema.json`).
- **Houdini:** the exporter is checked with Houdini 22.0.466. Houdini 20.5 and 21 are not checked yet.
- **Browsers:** checked by the automated browser tests in Chromium, Firefox and WebKit, and in emulated phone and tablet profiles (Pixel 7, iPhone 14, iPad gen 7), and by hand on a physical iPhone 13 and iPad 11. Not checked in Safari on macOS or on a real Android phone yet.
- **Example networks:** seven guided examples in `fixtures/examples/`, built in Houdini for the playground (the scene stays outside the repository: non-commercial license).

## Next

- **Public release:** what has to be done before NOP leaves the tester phase: [#43](https://github.com/emil-judin/nop-houdini-network-viewer/issues/43) public API, [#44](https://github.com/emil-judin/nop-houdini-network-viewer/issues/44) React 19, [#45](https://github.com/emil-judin/nop-houdini-network-viewer/issues/45) npm and jsDelivr, [#46](https://github.com/emil-judin/nop-houdini-network-viewer/issues/46) embedding guide, [#47](https://github.com/emil-judin/nop-houdini-network-viewer/issues/47) `noindex`, [#48](https://github.com/emil-judin/nop-houdini-network-viewer/issues/48) Prettier, [#49](https://github.com/emil-judin/nop-houdini-network-viewer/issues/49) Firefox test crash, [#50](https://github.com/emil-judin/nop-houdini-network-viewer/issues/50) Vite 8. Remove an entry here when its issue closes.
- **Planned features:** open issues labeled [enhancement](https://github.com/emil-judin/nop-houdini-network-viewer/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement).

## Testing points

Checks that need devices or software not at hand. Do them when access comes up; anything broken becomes a bug issue.

- Safari on macOS and Chrome on a real Android phone: the playground, the example page and one embed (iPhone and iPad are checked).

## Open ideas

Not planned yet; open an issue when one becomes real work.

- Links to a subnetwork or node: a share link or embed option that opens a level with a node selected.

## Later (no date)

- Other contexts (VOP, LOP, TOP, DOP), starting with VOP networks and their side connectors.
- Performance budget test with a generated 5,000-node network; measure `preact/compat` for the web component.
- Path bar history drop-downs and jump menu.
- Houdini's light color scheme.
- An upload and share service with short links (needs a server, storage and moderation).
- Show the NOP icon in Houdini's shelf as SVG (the shelf uses a PNG for now).
- ArtStation support, see the next section.

## ArtStation (bigger scope)

- **A live embed is not possible.** ArtStation projects accept images, uploaded video clips, YouTube and Vimeo links, Sketchfab models and Marmoset Viewer (`.mview`) uploads. Blog posts accept the same list, and the custom pages of ArtStation Pro websites accept text, images, video and 3D from Marmoset and Sketchfab. There is no iframe or HTML block, so no external viewer can run there (other node-graph viewers such as BlueprintUE are not supported either).

Options, in the order they should be tried:

1. **ArtStation-ready media from the playground** (first step, no server needed):
   - **Poster export:** the whole network level as one high-resolution image (wide enough to read node names and labels when a visitor zooms in ArtStation's fullscreen image viewer), optionally with the Parameter Inspector of a chosen node beside it. Builds on the existing screenshot button, which only captures the current view.
   - **Clip export:** a short recorded tour of a network (pan, open a node, dive into a subnetwork) as MP4 for ArtStation's video clips and YouTube, and as GIF for READMEs and forums. The README demo was made this way: the page clock is stepped frame by frame and every frame is captured, so animations are smooth at any machine speed. Inside the browser this needs a capture path (for example drawing frames to a canvas and encoding with `MediaRecorder` or WebCodecs); measure the quality before choosing.
2. **Link out:** the project description links to the network in the hosted viewer (the iframe page with `?embed=true&src=...` already works as a full page). Becomes one click with the upload and share service above.

## Cut

- Usage analytics on the hosted playground: testers are asked directly instead.
