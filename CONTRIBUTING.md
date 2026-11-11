# Contributing to NOP

Thank you for helping. NOP is a small project with a few rules.

## Before you start

- Read [AGENTS.md](./AGENTS.md): the six pillars, the architectural rules and the definition of done apply to human contributors too. The reasons behind them are in [docs/decisions/](./docs/decisions/README.md).
- Check [docs/ROADMAP.md](./docs/ROADMAP.md) for the current state and planned work.
- For bigger changes, open an issue first and describe the idea.

## How NOP is built

NOP is built with AI-assisted development, openly. AI coding agents write much of the code.

The agents follow the rules in this repository, the same ones human contributors follow: [AGENTS.md](./AGENTS.md) (commands, invariants, security and privacy rules, definition of done), task-specific instructions in [`.agents/skills/`](./.agents/skills/), and the reasons behind the rules in [docs/decisions/](./docs/decisions/README.md).

Contributions made with an AI assistant are welcome. Most assistants read AGENTS.md on their own. Review their output like your own code before you open a pull request: the same checks and the same privacy and "no SideFX assets" rules apply.

## Setup

Node.js 20 or newer (CI uses 22, see `.nvmrc`).

```bash
npm install
npm run dev            # playground on http://localhost:5173
npm run build          # playground with the exporter download (dist-playground/)
npm run build:lib      # npm package and web component (dist/)
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
npm run check          # strict TypeScript
npm run lint           # ESLint
npm run build:lib && npm run build
```

CI runs the same checks on every pull request. An automated test suite (unit, component, exporter and browser tests) is in preparation and will be published later.

## Pull requests

- One topic per pull request, with a short description of what and why.
- Add user-visible changes to the "Unreleased" section of [CHANGELOG.md](./CHANGELOG.md), one line each.
- Security problems go through [SECURITY.md](./SECURITY.md), not pull requests.

By contributing you agree that your work is released under the [MIT License](./LICENSE).
