# Roadmap

Where NOP stands and what comes next. Finished work is in the [CHANGELOG](../CHANGELOG.md), lasting decisions are in [decisions/](./decisions/README.md).

## Current state

- **Version:** `0.1.0-alpha.4`, a tester release. The playground is hosted on GitHub Pages; the npm package is not published yet.
- **Schema:** `1.4.0` ([SCHEMA.md](./SCHEMA.md), machine-readable in `schema/nop-network-1.schema.json`).
- **Houdini:** the exporter is checked with Houdini 22.0.466. Houdini 20.5 and 21 are not checked yet.
- **Browsers:** checked in Chromium, Firefox and WebKit with phone and tablet profiles, not on real phones yet.
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
- [ ] Embedding guide: CORS, file size, where to host the JSON.
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

Many Houdini artists show their work on ArtStation first, so NOP should be useful there. Researched on 2026-11-10:

- **A live embed is not possible.** ArtStation projects accept images, uploaded video clips, YouTube and Vimeo links, Sketchfab models and Marmoset Viewer (`.mview`) uploads. Blog posts accept the same list, and the custom pages of ArtStation Pro websites accept text, images, video and 3D from Marmoset and Sketchfab. There is no iframe or HTML block, so no external viewer can run there (other node-graph viewers such as BlueprintUE are not supported either). This was checked against ArtStation's help center and announcements, not in the logged-in project editor; check the editor once before starting.

Options, in the order they should be tried:

1. **ArtStation-ready media from the playground** (first step, no server needed):
   - **Poster export:** the whole network level as one high-resolution image (wide enough to read node names and labels when a visitor zooms in ArtStation's fullscreen image viewer), optionally with the Parameter Inspector of a chosen node beside it. Builds on the existing screenshot button, which only captures the current view.
   - **Clip export:** a short recorded tour of a network (pan, open a node, dive into a subnetwork) as MP4 for ArtStation's video clips and YouTube, and as GIF for READMEs and forums. The README demo was made this way: the page clock is stepped frame by frame and every frame is captured, so animations are smooth at any machine speed. Inside the browser this needs a capture path (for example drawing frames to a canvas and encoding with `MediaRecorder` or WebCodecs); measure the quality before choosing.
2. **Link out:** the project description links to the network in the hosted viewer (the iframe page with `?embed=true&src=...` already works as a full page). Becomes one click with the upload and share service above.
3. **Ask ArtStation for native support** once NOP has users. Sketchfab became a supported embed through a partnership with ArtStation in 2014; a request needs real usage numbers behind it.
4. **Not planned: a Sketchfab bridge.** Exporting the network as a flat 3D scene to Sketchfab, with parameters and VEX in its annotations (which support Markdown), would embed on ArtStation as a 3D model. It loses subnetwork navigation and the Houdini look, and needs a Sketchfab account, so it works against the authenticity pillar.

Sources: [ArtStation Help: blog media](https://help.artstation.com/en/articles/16155223), [ArtStation Help: Marmoset scenes](https://help.artstation.com/en/articles/16155239-how-do-i-showcase-a-marmoset-scene), [ArtStation Website Builder](https://www.artstation.com/about/artists/website-builder), [ArtStation video clips](https://magazine.artstation.com/2020/01/video-clips/), [ArtStation and Sketchfab](https://magazine.artstation.com/2014/09/artstation-announces-sketchfab-integration/), [Sketchfab Markdown](https://help.sketchfab.com/en/articles/16152515-using-markdown).

## Cut

- Usage analytics on the hosted playground: testers are asked directly instead.
