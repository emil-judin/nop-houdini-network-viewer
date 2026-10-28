# NOP

**View and share Houdini node networks on the web.**

NOP (Net OPerator) is an interactive, strictly view-only viewer for **SideFX Houdini** node networks on portfolio websites, technical blogs, and documentation, inspired by [Klee](https://joined-forces.github.io/klee/) for Unreal Engine.

---

## What It Does

One click in Houdini exports a network; one tag shows it on your site, looking like Houdini's Network Editor. Visitors can pan, zoom, go fullscreen, dive into subnetworks and read parameters and VEX code, on desktop and on phones, but never edit anything. The six design pillars behind this are defined in [`AGENTS.md`](./AGENTS.md).

---

## Quick Start (Development)

Needs Node.js 20 or newer (CI uses Node 22, see `.nvmrc`).

```bash
# Install dependencies
npm install

# Start the interactive development playground
npm run dev

# Checks: strict TypeScript and lint
npm run check
npm run lint

# Build the playground with the exporter download (dist-playground/) and the npm package + web component (dist/)
npm run build
npm run build:lib
```

On Windows PowerShell, use `npm.cmd` instead of `npm` if script execution is blocked. [`CONTRIBUTING.md`](./CONTRIBUTING.md) has the rules for changes.

---

## Exporting a Network from Houdini

Click **Exporter** in the playground to download `nop-exporter.zip`, a Houdini package: copy its contents into the `packages` folder of your Houdini preferences and restart Houdini to get a **NOP** shelf. See [`exporter/README.md`](./exporter/README.md) for the details, a manual shelf tool setup, and binding the dialog-free "copy for web" export to a hotkey such as **Ctrl+Shift+Alt+C**.

---

## Embedding on Your Website

The playground's **Embed** button generates all three snippets below for the network on screen.

> **Not on npm yet (tester release).** Snippets 1 and 2 need the npm package (or its CDN copy) and start working with the public release. Until then, use the iframe embed (3).

### 1. Plain HTML / WordPress / Cargo (Web Component)

Upload the exported `.json` file next to your page, then:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/nop-houdini-network-viewer@0.1.0-alpha.1/dist/web-component.js"></script>

<houdini-network src="my-network.json" style="display: block; height: 600px"></houdini-network>
```

The viewer runs inside a Shadow DOM, so your site's CSS cannot break it and its CSS never touches your site. Instead of `src`, you can put the exported JSON inline (handy for single-file pages, no extra request):

```html
<houdini-network style="height: 600px">
  <script type="application/json">{ "schemaVersion": "1.4.0", "root": { ... } }</script>
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
| `hotkeys` | `focus`: Houdini hotkeys only while the viewer has focus; `hover`: also while the pointer is over it; `off` | `focus` |

The element is 480px tall unless you give it a height. From JavaScript you can also set `element.data = json`. The script loads the Parameter Inspector, the SideFX Labs icons and the fonts from files next to it when they are needed, so host the whole `dist/` folder together (the CDN does this for you).

### 2. React / Next.js / Astro (`npm`)

```bash
npm install nop-houdini-network-viewer
```

```tsx
import { HoudiniNetwork } from 'nop-houdini-network-viewer';
import 'nop-houdini-network-viewer/style.css';
import myGraph from './circuit-gen-network.json';

export function PortfolioBreakdown() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <HoudiniNetwork data={myGraph} />
    </div>
  );
}
```

`react` and `react-dom` 18.2+ are peer dependencies (React 19 is not tested yet). To load the file from a URL instead of importing it, use `<RemoteHoudiniNetwork src="/my-network.json" />`. The stylesheet does not reset your page; its classes only style the viewer.

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

Keyboard: `Tab` reaches every node (top to bottom), `Enter` opens its parameters, `Esc` closes them again. The single-key hotkeys only react while the viewer has focus (click into it first), so they never interfere with typing elsewhere on the page. The playground also lets them react while the pointer is over the viewer, like Houdini (`hotkeys="hover"`).

---

## Status & Compatibility

**Alpha.** The JSON schema and the component API can still change between `0.x` releases (see [`CHANGELOG.md`](./CHANGELOG.md)).

- **Houdini:** the exporter is tested with Houdini 22.0.466. Houdini 20.5 and 21 are not tested yet.
- **Browsers:** current Chrome, Edge, Firefox and Safari are targeted. Safari and Chrome on real phones are not tested on real devices yet.

---

## Privacy

- **The playground keeps your files in your browser.** Opened, dropped and pasted networks are never uploaded.
- **The feedback form** (only on the hosted playground) sends your message, an optional contact, the NOP version, your browser, the page address without its query and the name of the network on screen, by email through [Web3Forms](https://web3forms.com). Your network file is never sent.
- **The exporter** scrubs paths (see [`docs/SCHEMA.md`](./docs/SCHEMA.md) rule 7) and leaves the insides of locked third-party assets out unless you confirm. Network box comments are exported exactly as written and sticky notes apart from their paths, so check them before sharing.

## Security

Please report vulnerabilities and privacy leaks in exports privately, as described in [`SECURITY.md`](./SECURITY.md).

---

## Disclaimer

This is an independent, community project. It is **not affiliated with, endorsed by, or sponsored by SideFX**. Houdini and SideFX are trademarks of Side Effects Software Inc. Operator icons are original drawings; no SideFX icons, files or code are included or redistributed.

---

## License

MIT License, copyright (c) 2026 Emil Judin. See [`LICENSE`](./LICENSE) for details.

