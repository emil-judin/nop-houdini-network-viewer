# Feature specification

NOP's current behavior as Gherkin feature files. Every automated test is named after a scenario here, so a failing test points at the behavior it protects. This file is for writing tests or changing behavior; how the tests are set up and run is in [`docs/TESTING.md`](../TESTING.md).

## Files

| File | Area | Main test level |
| :--- | :--- | :--- |
| [`converter.feature`](./converter.feature) | JSON loading, validation, coordinate conversion, wires | unit |
| [`node-rendering.feature`](./node-rendering.feature) | Node shapes, flags, icons, labels, badges, boxes, notes, dots | component |
| [`wires.feature`](./wires.feature) | Wire styles, selection highlight | unit, component |
| [`navigation.feature`](./navigation.feature) | Pan, zoom, fit, subnetwork diving, path bar, history | component, e2e |
| [`parameter-inspector.feature`](./parameter-inspector.feature) | Parameter Pane layout and widgets, code, resizing | unit, component |
| [`viewer-chrome.feature`](./viewer-chrome.feature) | Toolbar, minimap, fullscreen, debug actions, error and loading states | component, e2e |
| [`view-only.feature`](./view-only.feature) | Pillar 3: nothing can be edited | component, e2e |
| [`embedding.feature`](./embedding.feature) | Web component, iframe page, React components, style isolation | e2e |
| [`playground.feature`](./playground.feature) | Examples, open / drop / paste, Embed, Exporter and Feedback dialogs | e2e |
| [`exporter.feature`](./exporter.feature) | Houdini exporter and package | exporter |
| [`icons.feature`](./icons.feature) | Operator icon registry | unit |
| [`accessibility-compatibility.feature`](./accessibility-compatibility.feature) | Pillar 6 and WCAG 2.2 AA | e2e, a11y |

## Tags

- **Scenario ID:** every scenario has a stable tag such as `@NOP-CONV-001`. Test names start with it: `test('NOP-CONV-001 ...')`.
- **Level:** `@unit` (pure function, Vitest), `@component` (React Testing Library and jsdom), `@e2e` (Playwright in a real browser), `@exporter` (Python `unittest` with a fake `hou` module), `@a11y` (axe-core or a manual screen reader check), `@mobile` (Playwright device profiles: Pixel 7, iPhone 14, iPad).
- **`@fixed-<ID>`:** behavior added by a review fix, for example `@fixed-X-01`. Its test guards against a regression of that finding.
- **`@planned`:** behavior that is not built yet. Its test is marked `skip` or `fixme` until it lands.

## Rules

- Scenarios describe current behavior and pass today, except `@planned` ones.
- Numbers come from the code constants, for example `HOUDINI_UNIT_TO_PX = 100`, `HOUDINI_DOT_RADIUS_PX = 9.5` and `SIDE_PANEL_MIN_VIEWER_WIDTH = 672`. A change to a constant changes its scenario in the same commit.
- Fixtures are the six playground examples in `fixtures/examples/` and the hand-written cases in `fixtures/edge-cases/`; [`docs/TESTING.md`](../TESTING.md) lists them.
