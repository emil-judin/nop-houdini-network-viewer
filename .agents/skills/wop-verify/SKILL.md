---
name: wop-verify
description: >-
  The WOP definition of done: the commands and checks that must pass before a change counts as finished.
  Use before reporting any code, build, exporter or docs change as done.
---

# Verify a WOP change

Run from the repository root (Windows PowerShell: `npm.cmd`, separate commands with `;`).

1. `npm.cmd run check`: strict TypeScript for `src/`.
2. `npm.cmd run lint`: ESLint (TypeScript, React hooks, JSX accessibility).
3. `npm.cmd run build` and `npm.cmd run build:lib`: playground and library builds.
4. For changes the visitor can see or touch: try them in the playground (`npm.cmd run dev`).
5. No en or em dashes in docs, comments or UI strings.
6. Update `docs/STATUS.md` (and `CHANGELOG.md` "Unreleased" for user-visible changes).

Report failures with their output. Never mark a step as passed that was not run.
