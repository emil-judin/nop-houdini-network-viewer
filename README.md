<a href="https://emil-judin.github.io/nop-houdini-network-viewer/"><img src="docs/assets/nop-banner.jpg" alt="NOP: Houdini network viewer for the web" width="100%"></a>

# NOP

Interactive viewer for SideFX Houdini node networks on the web. Export networks from Houdini, embed them on any page and inspect them on desktop and mobile.

**[Live playground](https://emil-judin.github.io/nop-houdini-network-viewer/)** | [Example page](https://emil-judin.github.io/nop-houdini-network-viewer/example-site.html) | [Changelog](./CHANGELOG.md)

NOP (Net OPerator) is made for portfolio websites, blogs and documentation, and draws networks like Houdini's Network Editor. A shelf tool in Houdini allows exporting networks to a JSON file, and displaying them on your web page via this package. Users can pan, zoom, open subnetworks and read parameters and VEX code. NOP is inspired by [Klee](https://joined-forces.github.io/klee/) for Unreal Engine.

<img src="docs/assets/nop-demo.gif" alt="A Houdini network embedded in an example portfolio website, shown in Chrome: clicking a node shows its parameters, double-clicking a subnetwork dives inside, a wrangle shows its VEX code, and the path bar leads back up." width="100%">

## Contents

- [Status](#status)
- [Compatibility](#compatibility)
- [Export a network from Houdini](#export-a-network-from-houdini)
- [Embed on a web page](#embed-on-a-web-page)
- [Privacy](#privacy)
- [Documentation](#documentation)
- [Contributing](#contributing), [Security](#security), [Disclaimer](#disclaimer), [License](#license)

## Status

Alpha, tester release. The npm package is not published yet. The JSON format and the component API can change between `0.x` releases; see the [changelog](./CHANGELOG.md).

## Compatibility

| | Checked | Not checked yet |
| :--- | :--- | :--- |
| Houdini | 22.0.466 | 20.5, 21 |
| Network types | SOP | VOP, LOP, TOP, DOP |
| Desktop browsers | Chromium, Firefox and WebKit (automated browser tests) | Safari on macOS |
| Phones and tablets | Emulated Pixel 7, iPhone 14 and iPad (gen 7) (automated browser tests) | Real devices: Safari on iOS and iPadOS, Chrome on Android |

## Export a network from Houdini

1. **Download** `nop-exporter.zip`: in the [playground](https://emil-judin.github.io/nop-houdini-network-viewer/), click **Get the exporter** at the bottom of the Networks pane. Every [release](https://github.com/emil-judin/nop-houdini-network-viewer/releases) also has the zip attached.
2. **Install** it as a Houdini package: copy `nop.json` and the `nop` folder from the zip into the `packages` folder of your Houdini preferences and restart Houdini. A **NOP** shelf tab appears.
3. **Export:** in a SOP network, select the nodes to export, or nothing for the whole network. Click **Export for NOP** on the NOP shelf and choose an action. All three export the same nodes, wires, boxes and notes. They differ in where the JSON goes and which parameters it keeps:

   | Action | Output | Parameters | Use it for |
   | :--- | :--- | :--- | :--- |
   | **Copy to Clipboard (Compact Parms)** | Clipboard | Changed values, VEX and Python code | A quick look: paste into the playground with `Ctrl+V` |
   | **Save .json File (Compact Parms)** | `.json` file | Changed values, VEX and Python code | Publishing on your page: a small file that shows what you changed |
   | **Save .json File (Full Parms)** | `.json` file, larger | Every visible parameter, changes in bold | Showing complete parameter panes, like Houdini's Parameter Pane |

4. **Locked assets:** if the network uses locked assets that are not from SideFX, a second dialog asks. **Export Closed** keeps their parameters and icon but leaves out their insides. **Include Insides** is for assets you made yourself.
5. **Check the result** in the playground: paste with `Ctrl+V`, or drop the `.json` file on the Networks pane. The network stays in your browser. Then embed the file as described in the next section.

The `packages` folder per operating system, the copy hotkey, and what gets exported can be found [`here`](./exporter/README.md).

## Embed on a web page

The playground's **Embed** button opens the [example page](https://emil-judin.github.io/nop-houdini-network-viewer/example-site.html), which shows these snippets filled in for an example network.

### 1. Web component (plain HTML, WordPress, Cargo)

Upload the exported `.json` file next to your page, then add:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/nop-houdini-network-viewer@0.1.0-alpha.4/dist/web-component.js"></script>

<houdini-network src="my-network.json" style="display: block; height: 600px"></houdini-network>
```

### 2. React, Next.js, Astro (npm)

```bash
npm install nop-houdini-network-viewer
```

```tsx
import { HoudiniNetwork } from 'nop-houdini-network-viewer';
import 'nop-houdini-network-viewer/style.css';
import myGraph from './my-network.json';

export function PortfolioBreakdown() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <HoudiniNetwork data={myGraph} />
    </div>
  );
}
```

`react` and `react-dom` 18.2 or newer are peer dependencies. React 19 is not tested yet.

### 3. iframe (not tested yet)

Host the playground (for example on GitHub Pages) and point an iframe at its embed mode. The `src` parameter is the URL-encoded `https://` address of the `.json` file, and that server must allow cross-origin requests (a GitHub Gist raw link does):

```html
<iframe
  src="https://<your-playground>/?embed=true&src=https%3A%2F%2Fexample.com%2Fmy-network.json"
  width="100%" height="600" style="border: 0"
  allow="fullscreen" allowfullscreen loading="lazy" title="Houdini node network"
></iframe>
```

All options (attributes, React props, URL parameters), inline JSON, phone layout and the viewer controls can be found [`here`](./docs/EMBEDDING.md).

## Privacy

- **Playground:** networks stay in your browser. They are never uploaded.
- **Exporter:** removes private folder paths and leaves the insides of locked third-party assets out unless you confirm. Network box comments and sticky notes are exported as written. Details [`here`](./exporter/README.md#privacy).

## Documentation

| Document | Contents |
| :--- | :--- |
| [`docs/EMBEDDING.md`](./docs/EMBEDDING.md) | Embed options, React props, iframe parameters, viewer controls |
| [`exporter/README.md`](./exporter/README.md) | Installing and using the Houdini exporter, privacy |
| [`docs/SCHEMA.md`](./docs/SCHEMA.md) | The JSON format the exporter writes and the viewer reads |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | Data flow, coordinate conversion, packaging, style isolation |
| [`docs/decisions/`](./docs/decisions/README.md) | Architecture decision records |
| [`docs/ROADMAP.md`](./docs/ROADMAP.md) | Current state and planned work |
| [`CHANGELOG.md`](./CHANGELOG.md) | Changes per release |

## Contributing

Contributions are welcome, including AI-assisted ones. Setup, commands, rules and how NOP is built can be found [`here`](./CONTRIBUTING.md).

## Security

Report vulnerabilities and privacy leaks in exports privately, as described in [`SECURITY.md`](./SECURITY.md).

## Disclaimer

NOP is an independent community project. It is **not affiliated with, endorsed by or sponsored by SideFX**. Houdini and SideFX are trademarks of Side Effects Software Inc. Operator icons are original drawings; no SideFX icons, files or code are included or redistributed.

## License

MIT, copyright (c) 2026 Emil Judin. See [`LICENSE`](./LICENSE).

The builds also ship third-party fonts (SIL Open Font License) and libraries (MIT, ISC, BSD) under their own licenses, listed in [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).
