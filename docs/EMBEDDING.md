# Embedding reference

Options, data loading and visitor controls for an embedded NOP viewer. The install snippets for the three embed methods are in the [README](../README.md#embed-on-a-web-page).

## Options

The web component attributes and the iframe URL parameters use the same names. The React components take the matching props.

| Attribute / URL parameter | React prop | Values | Default |
| :--- | :--- | :--- | :--- |
| `label-size` | `labelSize` | `small`, `medium`, `large` | `medium` |
| `wire-style` | `wireStyle` | `default` (straight with rounded bends, Houdini's default), `rounded` | The wire style exported with the network |
| `minimap` | `showMiniMap` | `true` (or the bare attribute) opens the network overview at the start | Closed. Visitors open it with the map button or `O`; it is never shown in narrow viewers |
| `focus-node` | `focusNode` | Name of a node at the top network level to frame at the start, like Houdini's `F` | None: the whole network is fitted |
| `touch-pan` | `touchPan` | `two-fingers`: one finger scrolls the page, two fingers move the network. `one-finger`: one finger moves the network, for pages the viewer fills. In fullscreen one finger always moves it | `two-fingers` |
| `toolbar` | `showToolbar` | `false` hides the header | Shown |
| `fullscreen` | `showFullscreenButton` | `false` hides the fullscreen button | Shown |
| `inspector` | `showInspector` | `false` never opens the Parameter Inspector | Enabled |
| `fit-view` | `fitView` | `false` skips fitting the network on load | Fitted |
| `hotkeys` | `hotkeys` | `focus`: Houdini hotkeys only while the viewer has focus. `hover`: also while the pointer is over it. `off` | `focus` |
| `debug-actions` | `showDebugActions` | `true` shows the Download JSON button | Hidden |

The node label size is set by the page, not by visitors.

## Web component

- **Data:** `src="my-network.json"` loads a file. A file on another site must allow cross-origin requests (CORS). The JSON can also be put inline, without an extra request:

  ```html
  <houdini-network style="height: 600px">
    <script type="application/json">{ "schemaVersion": "1.4.0", "root": { ... } }</script>
  </houdini-network>
  ```

  From JavaScript, set `element.data = json`.
- **Size:** the element is 480px tall unless it has a height.
- **Files:** the script loads the Parameter Inspector, the SideFX Labs icons and the fonts from files next to it when they are needed. Host the whole `dist/` folder together; the CDN does this.
- **Isolation:** the viewer runs inside a Shadow DOM. The page's CSS does not reach it, and its CSS does not reach the page.

The [example page](https://emil-judin.github.io/nop-houdini-network-viewer/example-site.html) embeds three networks this way; its source shows the pattern.

## React

- `HoudiniNetwork` takes the network as `data`.
- `RemoteHoudiniNetwork` loads it from a URL: `<RemoteHoudiniNetwork src="/my-network.json" />`.
- Both take the props above, plus `onNodeSelect` (called with the selected node, or `null`) and `className`.
- `nop-houdini-network-viewer/style.css` does not reset the page; its classes only style the viewer.

## iframe page

`https://<your-playground>/?embed=true&src=<URL-encoded https address>` shows one network full-page. The server of the `.json` file must allow cross-origin requests. Options are added as URL parameters, for example `&label-size=large&minimap=true&focus-node=transform1`.

## Phones

Give the viewer the full screen width and most of its height, for example `height: 70svh`, as the example page does. Narrow viewers get a one-row header without the node count (wire style, overview and screenshot move into one settings menu) and frame nodes less closely, so their names stay on screen.

## Viewer controls

| Action | Mouse and keyboard | Touch |
| :--- | :--- | :--- |
| Pan, zoom | Drag with the left or middle mouse button, scroll wheel. The middle button never auto-scrolls the page | Two fingers (one finger scrolls the page); one finger in fullscreen |
| Inspect parameters and VEX | Click a node | Tap a node |
| Dive into a subnetwork | Double-click it, or select it and press `I` | Double-tap it, or tap **Open subnetwork** in the inspector |
| Go up a level | `U`, the arrow button, or a path segment | Arrow button or path segment |
| Resize the parameter panel | Drag its edge (arrow keys when focused, double-click resets) | Drag the grip above the panel |
| Fit all, frame selected | `H` or double-click the empty canvas; `F` | Double-tap the empty canvas |
| Fullscreen | Fullscreen button; `Esc` leaves it. The network is fitted to the new size | Fullscreen button (a full-screen overlay on iPhone) |
| Network overview (minimap) | Click to jump, hold and drag to follow, wheel to zoom; `O` or the map button shows or hides it | Settings menu > Network overview. Starts closed on phone-sized viewers |
| Wire style | `Shift+S` or the two wire buttons | Settings menu > Wire Style |
| Screenshot (PNG of the visible network) | Camera button | Settings menu > Save screenshot |

**Keyboard:** `Tab` reaches every node, top to bottom. `Enter` opens its parameters, `Esc` closes them. The single-key hotkeys react only while the viewer has focus (click into it first), so they never interfere with typing elsewhere on the page. With `hotkeys="hover"` they also react while the pointer is over the viewer, like in Houdini; the playground uses this.
