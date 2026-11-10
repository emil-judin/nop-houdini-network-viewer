---
name: nop-verify
description: >-
  The NOP definition of done: the commands and checks that must pass before a change counts as finished.
  Use before reporting any code, build, exporter or docs change as done.
---

# Verify a NOP change

Run from the repository root (Windows PowerShell: `npm.cmd`, separate commands with `;`). Steps 3, 4 and 6 use
the test suite, which is not published yet: run them whenever `tests/` and `exporter/tests/` are in your checkout.

1. `npm.cmd run check`: strict TypeScript for `src/` (and for the tests when present).
2. `npm.cmd run lint`: ESLint (TypeScript, React hooks, JSX accessibility).
3. `npm.cmd test`: Vitest unit and component tests (`tests/unit`, `tests/component`).
4. `npm.cmd run test:exporter`: exporter tests with the fake `hou` (Python 3.9+, standard library).
5. `npm.cmd run build:lib`, then `npm.cmd run build`: library and playground builds. In this order, because the playground build publishes the web component from `dist/` for its example website (it warns when `dist/web-component.js` is missing).
6. For changes the visitor can see or touch: `npm.cmd run test:e2e` (Playwright; first run
   `npx playwright install`). It builds and serves everything itself. On a busy machine run one browser
   with `--project=chromium`, or fewer workers with `--workers=1`.
7. No en or em dashes in docs, comments or UI strings.
8. Add user-visible changes to `CHANGELOG.md` "Unreleased" (one line each), update `docs/ROADMAP.md`, and add a
   record in `docs/decisions/` for a lasting decision.

Report failures with their output. Never mark a step as passed that was not run.
