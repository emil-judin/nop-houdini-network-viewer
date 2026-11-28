---
name: nop-verify
description: >-
  The NOP definition of done: the commands and checks that must pass before a change counts as finished.
  Use before reporting any code, build, exporter or docs change as done.
---

# Verify a NOP change

Run from the repository root (Windows PowerShell: `npm.cmd`, separate commands with `;`).

1. `npm.cmd run check`: strict TypeScript for `src/` and the tests.
2. `npm.cmd run lint`: ESLint (TypeScript, React hooks, JSX accessibility, and the AGENTS.md rules it enforces,
   [decision 0017](../../../docs/decisions/0017-corrections-become-checks.md)). Fix what a rule asks for; never
   disable a rule inline or add an exception to `eslint.config.js` without the owner's agreement.
3. `npm.cmd test`: Vitest unit and component tests (`tests/unit`, `tests/component`).
4. `npm.cmd run test:exporter`: exporter tests with the fake `hou` (Python 3.9+, standard library). For a change
   in `exporter/` (outside `exporter/tests/`), also `npm.cmd run test:exporter:houdini` before committing: the same
   kind of checks in a real Houdini session (needs a local Houdini and its license, about 2 minutes). Without Houdini on
   the machine, report that instead of a pass.
5. `npm.cmd run build:lib`, then `npm.cmd run build`: library and playground builds. In this order, because the playground build publishes the web component from `dist/` for its example website (it warns when `dist/web-component.js` is missing).
6. For changes the visitor can see or touch: `npm.cmd run test:e2e` (Playwright; first run
   `npx playwright install`). It builds and serves everything itself. On a busy machine run one browser
   with `--project=chromium`, or fewer workers with `--workers=1`.
7. No en or em dashes in docs, comments or UI strings.
8. Add user-visible changes to `CHANGELOG.md` "Unreleased" (one line each), and add a record in
   `docs/decisions/` for a lasting decision.
9. Git: the work is on the issue's branch (`<issue>-<topic>`, branched from `main`) and stays inside the issue's
   scope. Commit subjects follow `type(area): summary` (AGENTS.md section 5); `npm.cmd run lint:commits` checks
   the branch's commits against `main`. The pull request body ends with `Closes #<issue>`.

When the owner or a review corrects the same kind of mistake twice, propose a check for it (a lint rule, a type
or a test) instead of a new line in AGENTS.md.

Report failures with their output. Never mark a step as passed that was not run.
