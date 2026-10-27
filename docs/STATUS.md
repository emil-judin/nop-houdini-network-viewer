# Project Status (`STATUS.md`)

> Where the project stands and what comes next, so any developer or agent can continue. Keep it short: finished work goes to [HISTORY.md](./HISTORY.md) and [CHANGELOG.md](../CHANGELOG.md).

## Current State (2026-10-27)

- **Version:** `0.1.0-alpha.1` (tester release), code done. The fixes from the repository review are committed and pushed ("Repository review fixes", 2026-10-27). Automated tests stay out of the repository for now (owner decision).
- **Review:** every finding of the 2026-10-27 repository review is resolved (decisions and finding IDs in [HISTORY.md](./HISTORY.md)). Verdict after fixes: ship the tester release after the owner's Houdini check below; no blocking findings for the npm launch.
- **Schema:** `1.4.0` (adds optional `exportWarnings`). Both demo fixtures were re-exported with schema `1.4.0` from Houdini 22.0.466 (2026-10-27). That export showed a path scrubber bug (commented-out VEX such as `//@Cd = ...` became `<path>`), fixed the same day, so `fixtures/circuit_gen-network.json` still holds 12 damaged code lines until it is exported once more.
- **Checks:** `check`, `lint`, `build` and `build:lib` pass. CI runs them on every push and pull request (`.github/workflows/ci.yml`).

## Owner Steps

1. **Prettier reformat:** run `npm run format` (one-time reformat of about 47 files) as its own commit, then add `npm run format:check` to CI.
2. **Houdini check of the exporter changes** (not run in Houdini yet): install the zip from `npm run build:exporter`, run both shelf tools, export a network that contains a locked third-party asset (the "Export Closed / Include Insides" dialog), and read one export for paths and names. Also confirm that the package works from a `HOUDINI_PACKAGE_DIR` folder (`$HOUDINI_PACKAGE_PATH`).
3. **GitHub repository settings:** Settings > Pages > Source: GitHub Actions; Settings > Code security > enable private vulnerability reporting (`SECURITY.md` points there); Settings > Branches > require the CI checks `verify` and `browser` on `main`.
4. **Feedback form:** Web3Forms access key as the repository variable `WEB3FORMS_KEY`, then re-run the deploy workflow.
5. **Fixtures:** re-install the exporter (`npm run build:exporter`, or copy `exporter/wop_exporter.py`) and export `circuit_gen` once more into `fixtures/circuit_gen-network.json` (`circuit_board` is fine). Then `grep "<path>" fixtures/*.json` should find nothing.
6. **Real devices:** smoke-test the hosted playground on Safari (macOS, iOS) and a real Android phone.

## Next Tasks (agents)

1. React 19 smoke test, then widen the peer range to `^18.2.0 || ^19.0.0`.
2. Measure `preact/compat` for the web component build (owner: later).
3. Automated tests (unit, component, exporter and browser tests): owner decision, later. Then a performance budget test with a generated 5,000-node network.
4. Keyboard: move between connected nodes with the arrow keys (accessibility follow-up).
5. Milestone 4 items in [PLAN.md](../PLAN.md) section 5 (node search, links to subnetworks, PNG / SVG export, multiparm blocks, Houdini 20.5 / 21 exporter runs).

## Where Things Are

- Rules for agents: [AGENTS.md](../AGENTS.md) (pillars, definition of done, security rules) and the skills in `.agents/skills/`.
- Architecture: [ARCHITECTURE.md](./ARCHITECTURE.md); JSON contract: [SCHEMA.md](./SCHEMA.md) and `schema/wop-network-1.schema.json`.
- Testers: [TESTERS.md](./TESTERS.md). Icons: [ICON_ART_BIBLE.md](./ICON_ART_BIBLE.md).
