# Project Status (`STATUS.md`)

> Where the project stands and what comes next, so any developer or agent can continue. Keep it short: finished work goes to [HISTORY.md](./HISTORY.md) and [CHANGELOG.md](../CHANGELOG.md).

## Current State (2026-10-29)

- **Version:** `0.1.0-alpha.2` (second tester release, 2026-10-29), code committed; the owner to-do below comes before handing it out. Automated tests stay out of the repository for now (owner decision): `tests/`, `exporter/tests/`, the test configs and `docs/features/` exist only in the local working copy, and the committed `package.json` and CI have no test steps.
- **Review:** every finding of the 2026-10-27 repository review is resolved (decisions and finding IDs in [HISTORY.md](./HISTORY.md)). Verdict after fixes: ship the tester release after the owner's Houdini check below; no blocking findings for the npm launch.
- **Schema:** `1.4.0` (adds optional `exportWarnings`). Both demo fixtures were re-exported with schema `1.4.0` from Houdini 22.0.466 (2026-10-27). That export showed a path scrubber bug (commented-out VEX such as `//@Cd = ...` became `<path>`), fixed the same day, so `fixtures/circuit_gen-network.json` still holds 12 damaged code lines until it is exported once more.
- **Checks:** `check`, `lint`, `test` (147), `test:exporter` (16), `build`, `build:lib` and `test:e2e` (169 on six browser profiles, 29 skipped by profile) pass (2026-10-29). CI runs them on every push and pull request (`.github/workflows/ci.yml`).
- **Houdini-style layout (2026-10-28, header changed 2026-10-29):** docked one-row pane header in the viewer (path bar, node count from 448px, wire style, overview, fullscreen), no Fit / label size / Copy JSON buttons; playground without a menu bar: a collapsible Networks pane (Open file and Paste at the top, a trial about block with logo, version, exporter and feedback at the bottom), a pane tab and a status bar with the Houdini and exporter versions. Page title "NOP Playground". Decisions in [HISTORY.md](./HISTORY.md).
- **Start view (2026-10-28):** overview closed by default (`showMiniMap` / `minimap`), start frame on a node (`focusNode` / `focus-node`, top level only), wire style from prop, then network file, then Houdini's straight default; a selected node that the opening inspector covers is panned to the middle of the remaining canvas (zoom kept); the middle mouse button pans and never auto-scrolls inside the viewer. The example website starts its first network on `curve1`. These are viewer settings only, not fields of the network file yet (open question to the owner).
- **Mobile and fullscreen (2026-10-29):** fullscreen button shown by default, replacing Fit (H or a double-click / double-tap on the empty canvas fits; entering and leaving fullscreen fits, and the fit follows the size until the visitor moves the view, so it does not depend on when the browser resizes). Touch: `touchPan` / `touch-pan`, default `two-fingers` (one finger scrolls the page, two move the network, a hint says so and has a big Open fullscreen button; one finger in fullscreen); the playground uses `one-finger`. Viewers under 448px frame nodes with zoom at most 1, and their path bar keeps back and forward but shows only the level on screen (no parent levels, no Download JSON). In the playground on phones, a tap beside the floating Networks pane folds it. The example website gives its viewers the full width and 70% of the screen height on phones. Not tried on a real phone yet (owner to-do "Real devices"): the two-finger mode depends on `touch-action: pan-x pan-y`.
- **Code colors (2026-10-30):** the VEX and Python field uses Houdini 22's editor colors (`ParmSyntax*Color` in its dark theme, checked against owner screenshots): attributes and `#include` `#d2cf9c`, types `#93d4eb`, functions `#8888c1`, keywords `#6799c0`, numbers `#ebb845`, strings `#79a978`, comments `#7b7e84`, plain `#bcbec3` on `#131313`, line numbers `#656565` on `#282828`. Houdini's Quote, Variable (HScript) and Extra colors have no VEX token yet.
- **Icon (2026-10-28):** new NOP icon (bolder web, two turns), masters `design/nop-icon/nop-icon.svg` and `nop-icon-cutout.svg`. `python scripts/build_nop_icon_pack.py` regenerates them, the pack, `public/` and the Houdini shelf icon.
- **Tester onboarding (2026-10-28):** welcome card on the first visit (Help reopens it), Embed button (since 2026-10-29 at the bottom of the Networks pane, next to Get the exporter and Help; example files are published at `examples/`, so their code works as it is), an example website `public/example-site.html` using the real web component from `lib/`, example rows with descriptions and `?example=<key>` links (`src/playground/examples.ts`). The playground imports the package only through `src/api.ts` (ESLint rule with listed exceptions). The guided example files are specified in [fixtures/examples/README.md](../fixtures/examples/README.md) and not made yet.
- **Viewer additions (2026-10-28):** For-Each / Compile block underlays (`src/schema/blockUnderlays.ts`, `HoudiniBlockUnderlay.tsx`), checked against a Houdini 22 screenshot of `foreach_end4`. Blue block method labels (`src/schema/blockLabels.ts`; the `Point` / `Piece` and `Feedback` / `Input` texts and the defaults for compact exports are not checked in Houdini yet). Dotted wire into the second input of Copy to Points (owner decision 2026-10-28: only this case, no cook-state export).

## Owner To-Do

Before handing `0.1.0-alpha.2` to testers:

- [ ] **Point git at the renamed repository** (the GitHub rename is done): `git remote set-url origin https://github.com/emil-judin/nop-houdini-network-viewer.git`, then push. The Pages address changed with the rename, so send testers the new playground link.
- [ ] **Houdini check of the exporter** (the tests use a fake `hou`): install the zip from `npm run build:exporter`, run both shelf tools, export a network that contains a locked third-party asset (the "Export Closed / Include Insides" dialog), and read one export for paths and names. Also confirm that the package works from a `HOUDINI_PACKAGE_DIR` folder (`$HOUDINI_PACKAGE_PATH`).
- [ ] **Re-export `circuit_gen`:** re-install the exporter (`npm run build:exporter`, or copy `exporter/nop_exporter.py`) and export `circuit_gen` once more into `fixtures/circuit_gen-network.json` (`circuit_board` is fine). Then `grep "<path>" fixtures/*.json` should find nothing. The browser tests look for `transform1` (Circuit Board) and `circuit_board_fan` (Circuit Gen), so keep those nodes or update `tests/e2e/`.
- [ ] **Feedback form and GitHub settings:** Web3Forms access key as the repository variable `WEB3FORMS_KEY` (Settings > Secrets and variables > Actions > Variables), then re-run the deploy workflow and send one test message from the hosted playground. Without the key there is no Feedback button, but `docs/TESTERS.md` asks testers to use it. Also: Settings > Pages > Source: GitHub Actions; Settings > Code security > enable private vulnerability reporting (`SECURITY.md` points there).
- [ ] **Real devices:** smoke-test the hosted playground and the example website on Safari (macOS, iOS) and a real Android phone: two-finger panning, the "Open fullscreen" hint, fullscreen (CSS fallback on iPhone), the narrow path bar and the floating Networks pane.
- [ ] **`start_here` example:** build and export it as described in [fixtures/examples/README.md](../fixtures/examples/README.md); it appears in the playground as soon as its file is in `fixtures/examples/`. Consider using it on the example website too (`public/example-site.html`). Later: `vex_wrangles` and `for_each`.

Later:

- [ ] **Set up a Houdini MCP** server, so agents can drive Houdini directly (exports, checks against the real network editor).
- [ ] **Make the NOP web icon render in Houdini** (the shelf tools use `exporter/package/nop/icons/nop.png`).
- [ ] **Trailer:** cut a short video of the plugin in CapCut (export in Houdini, open in the playground, embed on a website) for people who do not want to explore the site right away.
- [ ] **Prettier reformat:** run `npm run format` (one-time reformat of about 47 files) as its own commit, then add `npm run format:check` to CI.
- [ ] **Branch protection:** Settings > Branches > require the CI checks on `main`.

## Next Tasks (agents)

1. React 19 smoke test (component tests against React 19), then widen the peer range to `^18.2.0 || ^19.0.0`.
2. Measure `preact/compat` for the web component build (owner: later).
3. Performance budget test with a generated 5,000-node network (T-04 follow-up).
4. Keyboard: move between connected nodes with the arrow keys (accessibility follow-up).
5. Before the npm release, close the gaps the playground's import exceptions show (`eslint.config.js`): decide what of the loading and error states and the Labs icon bundling becomes public API, move the `?embed=true` page into its own entry, and optionally build the playground against `dist/` in CI.
6. Milestone 4 items in [PLAN.md](../PLAN.md) section 5 (node search, links to subnetworks, PNG / SVG export, multiparm blocks, Houdini 20.5 / 21 exporter runs).

## Where Things Are

- Rules for agents: [AGENTS.md](../AGENTS.md) (pillars, definition of done, security rules) and the skills in `.agents/skills/`.
- Architecture: [ARCHITECTURE.md](./ARCHITECTURE.md); JSON contract: [SCHEMA.md](./SCHEMA.md) and `schema/nop-network-1.schema.json`.
- Tests: [TESTING.md](./TESTING.md) and the feature list in [features/](./features/).
- Testers: [TESTERS.md](./TESTERS.md). Icons: [ICON_ART_BIBLE.md](./ICON_ART_BIBLE.md) (the review gallery opens with `?icons` in the dev server only).
