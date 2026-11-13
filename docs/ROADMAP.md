# Roadmap

Where NOP stands and what comes next. Finished work is in the [CHANGELOG](../CHANGELOG.md), lasting decisions are in [decisions/](./decisions/README.md).

## Current state

- **Version:** `0.1.0-alpha.5`, a tester release. The playground is hosted on GitHub Pages; the npm package is not published yet.
- **Schema:** `1.4.0` ([SCHEMA.md](./SCHEMA.md), machine-readable in `schema/nop-network-1.schema.json`).
- **Houdini:** the exporter is checked with Houdini 22.0.466. Houdini 20.5 and 21 are not checked yet.
- **Browsers:** checked by the automated browser tests in Chromium, Firefox and WebKit, and in emulated phone and tablet profiles (Pixel 7, iPhone 14, iPad gen 7). Not checked on real devices or in Safari yet.
- **Example networks:** six guided examples in `fixtures/examples/`, built in Houdini for the playground (scene `nop_examples.hip`).

## In progress

- **Automated test suite:** unit, component, exporter and browser tests, plus their CI steps. They exist locally and will be published together with the teaser video.
- **Teaser video:** a short video for people who do not want to explore the playground right away.
- **Icon coverage:** drawings for more built-in SOPs. Until a node type has one, it shows the default emblem.

## Before the public release

- [ ] Smoke test on real devices: Safari on macOS and iOS, Chrome on Android (two-finger panning, fullscreen fallback on iPhone, narrow path bar, settings menu, screenshot).
- [ ] Collect and work through the tester feedback.
- [ ] Decide the public API: close the playground exceptions listed in `eslint.config.js` (see [decision 0010](./decisions/0010-one-repository-public-api.md)).
- [ ] React 19 check, then widen the peer range to `^18.2.0 || ^19.0.0`.
- [ ] Publish `nop-houdini-network-viewer` on npm (and so on jsDelivr), publish the SRI hash, and drop the README's "not on npm yet" note.
- [ ] Embedding guide: extend [EMBEDDING.md](./EMBEDDING.md) with CORS, file size and where to host the JSON.
- [ ] Remove the tester-phase `noindex` from `index.html`.
- [ ] Repository housekeeping: one-time Prettier reformat with `format:check` in CI.

## Planned features

- Node search (`Ctrl+F`): find a node by name or type and frame it, also inside subnetworks.
- Links to a subnetwork or node: a share link or embed option that opens a level with a node selected.
- Multiparm blocks with instance count.
- Export custom node shapes (`customShapes`; the viewer can already draw them).
- Keyboard: move between connected nodes with the arrow keys.
- Exporter runs on Houdini 20.5 and 21.

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
