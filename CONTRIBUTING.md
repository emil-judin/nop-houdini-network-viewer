# Contributing to NOP

Thank you for helping. NOP is a small project with a few firm rules; reading them first saves review rounds.

## Before you start

- Read [AGENTS.md](./AGENTS.md): the six pillars, the architectural rules and the definition of done apply to human contributors too.
- Check [docs/STATUS.md](./docs/STATUS.md) for the current state and known follow-ups.
- For bigger changes, open an issue first and describe the idea.

## Setup

Node.js 20 or newer (CI uses 22).

```bash
npm install
npm run dev            # playground on http://localhost:5173
```

On Windows PowerShell use `npm.cmd` if script execution is blocked.

## Rules

- **View-only:** the viewer never edits a network (no dragging, wiring, flag toggling or parameter editing).
- **Looks like Houdini:** match Houdini 22's Network Editor. Attach a Houdini screenshot to visual changes.
- **No SideFX assets:** never copy SideFX or vendor icons, SVG data or code. Operator icons are original drawings (see [docs/ICON_ART_BIBLE.md](./docs/ICON_ART_BIBLE.md)).
- **Privacy:** the exporter must never write private paths or the insides of locked third-party assets. Never commit real customer exports.
- **Style:** TypeScript strict, TSDoc on public symbols, `px` sizes in viewer components, container queries for viewer layouts, no en or em dashes in docs, comments or UI text.
- **Security:** no `innerHTML` or `dangerouslySetInnerHTML` for file content (see AGENTS.md section 4).

## Checks (the definition of done)

```bash
npm run check          # TypeScript
npm run lint           # ESLint
npm run build && npm run build:lib
```

CI runs the same checks on every pull request.

## Pull requests

- One topic per pull request, with a short description of what and why.
- Update [docs/STATUS.md](./docs/STATUS.md) and the "Unreleased" section of [CHANGELOG.md](./CHANGELOG.md) for user-visible changes.
- Security problems go through [SECURITY.md](./SECURITY.md), not pull requests.

By contributing you agree that your work is released under the [MIT License](./LICENSE).
