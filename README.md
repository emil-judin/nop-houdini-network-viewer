# WOP

**View and share Houdini node networks on the web.**

WOP (Web OPerator) is an interactive, strictly view-only viewer for **SideFX Houdini** node networks on portfolio websites, technical blogs, and documentation, inspired by [Klee](https://joined-forces.github.io/klee/) for Unreal Engine.

---

## Core Pillars

1. **Usability:** Go from Houdini to an interactive web embed in seconds using the 1-click Houdini Python Shelf Exporter and a single HTML or React component tag.
2. **Authenticity:** 1:1 visual fidelity with Houdini's native Network Editor (SOP flags, operator shapes, multi-input connectors, wire dots, network boxes, and sticky notes).
3. **Strictly View-Only:** Designed purely for portfolio visualization and inspection. Visitors can pan, zoom, toggle fullscreen, dive into subnetworks, and inspect parameters and VEX snippets without altering the graph layout.
4. **Modularity:** Lightweight, strongly typed TypeScript and React architecture built on `@xyflow/react`.
5. **Documentation:** Built as an agentic-first repository with comprehensive schema and architectural documentation in [`PLAN.md`](./PLAN.md), [`AGENTS.md`](./AGENTS.md), and [`docs/`](./docs/).
6. **Compatibility:** Works on Android and iOS as well as desktop, across current versions of all major modern browsers, without relying on experimental or non-standard web features.

---

## Quick Start (Development)

```bash
# Install dependencies
npm install

# Run strict TypeScript verification
npm run check

# Start the interactive development playground
npm run dev

# Build the playground (dist-playground/) and the npm package + web component (dist/)
npm run build
npm run build:lib
```

On Windows PowerShell, use `npm.cmd` instead of `npm` if script execution is blocked.

---

## Exporting a Network from Houdini

See [`exporter/README.md`](./exporter/README.md) for instructions on adding [`exporter/wop_exporter.py`](./exporter/wop_exporter.py) to your Houdini shelf in 30 seconds, and for binding the dialog-free "copy for web" export to a hotkey such as **Ctrl+Shift+Alt+C**.

---

## Embedding on Your Website

The playground's **Embed** button generates all three snippets below for the network on screen.

### 1. Plain HTML / WordPress / Cargo (Web Component)

Upload the exported `.json` file next to your page, then:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/wop-houdini-network-viewer@0.1.0/dist/web-component.js"></script>

<houdini-network src="my-network.json" style="display: block; height: 600px"></houdini-network>
```

The viewer runs inside a Shadow DOM, so your site's CSS cannot break it and its CSS never touches your site. Instead of `src`, you can put the exported JSON inline (handy for single-file pages, no extra request):

```html
<houdini-network style="height: 600px">
  <script type="application/json">{ "schemaVersion": "1.1.0", "root": { ... } }</script>
</houdini-network>
```

| Attribute | Values | Default |
| :--- | :--- | :--- |
| `src` | URL of the exported `.json` (another site must allow CORS) | none |
| `label-size` | `small`, `medium`, `large` | `medium` |
| `wire-style` | `default`, `rounded` | as exported |
| `minimap` | `false` to hide | shown (hidden automatically in narrow viewers) |
| `toolbar` | `false` to hide | shown |
| `inspector` | `false` to never open the Parameter Inspector | enabled |
| `debug-actions` | `true` to show the Copy / Download JSON buttons | hidden |
| `fit-view` | `false` to skip fitting the network on load | fit |

The element is 480px tall unless you give it a height. From JavaScript you can also set `element.data = json`.

### 2. React / Next.js / Astro (`npm`)

```bash
npm install wop-houdini-network-viewer
```

```tsx
import { HoudiniNetwork } from 'wop-houdini-network-viewer';
import 'wop-houdini-network-viewer/style.css';
import myGraph from './circuit-gen-network.json';

export function PortfolioBreakdown() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <HoudiniNetwork data={myGraph} showDebugActions={false} />
    </div>
  );
}
```

`react` and `react-dom` (18.2 or newer) are peer dependencies. To load the file from a URL instead of importing it, use `<RemoteHoudiniNetwork src="/my-network.json" />`. The stylesheet does not reset your page; its classes only style the viewer.

### 3. iframe (ArtStation, Notion, site builders without script tags)

Host the playground (for example on GitHub Pages) and point an iframe at its embed mode. The `.json` needs a full `https://` address that allows cross-origin requests (for example a GitHub Gist raw link):

```html
<iframe
  src="https://<your-playground>/?embed=true&src=https%3A%2F%2Fexample.com%2Fmy-network.json"
  width="100%" height="600" style="border: 0"
  allow="fullscreen" allowfullscreen loading="lazy" title="Houdini node network"
></iframe>
```

The iframe page accepts the same options as URL parameters (`label-size=large`, `minimap=false`, ...).

---

## Viewer Controls

| Action | Mouse / keyboard | Touch |
| :--- | :--- | :--- |
| Pan / zoom | Drag / scroll wheel | Drag / pinch |
| Inspect parameters and VEX | Click a node | Tap a node |
| Dive into a subnetwork | Double-click it, or select it and press `I` | Double-tap it, or tap **Open subnetwork** in the inspector |
| Go up a level | `U`, the arrow button, or a path segment | Arrow button or path segment |
| Resize the parameter panel | Drag its edge (arrow keys when focused, double-click resets) | Drag the grip above the panel |
| Fit all / frame selected | `H` / `F` | **Fit** button |
| Network overview (minimap) | Click to jump, hold and drag to follow, wheel to zoom; `O` or the map button shows / hides it | Hidden on phone-sized viewers |
| Toggle wire style | `Shift+S` | Wire style switch |
| Fullscreen | Maximize button (`Esc` to leave) | Maximize button |

Hotkeys only react while the pointer is over the viewer, so they never interfere with the rest of the page.

---

## Status & Compatibility

**Alpha.** The JSON schema and the component API can still change between `0.x` releases (see [`CHANGELOG.md`](./CHANGELOG.md)).

- **Houdini:** the exporter is tested with Houdini 22.0.466. Houdini 20.5 and 21 are not tested yet.
- **Browsers:** tested in Chrome (desktop, plus phone and tablet emulation). Firefox, Safari (macOS and iOS) and Chrome on Android are targeted but not tested on real devices yet.

---

## Disclaimer

This is an independent, community project. It is **not affiliated with, endorsed by, or sponsored by SideFX**. Houdini and SideFX are trademarks of Side Effects Software Inc. Operator icons are original drawings; no SideFX icons, files or code are included or redistributed.

---

## License

MIT License, copyright (c) 2026 Emil Judin. See [`LICENSE`](./LICENSE) for details.

