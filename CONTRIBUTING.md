# Contributing to NOP

Thank you for helping. NOP is a small project with a few rules.

## Before you start

- Read [AGENTS.md](./AGENTS.md): the six pillars, the architectural rules and the definition of done apply to human contributors too. The reasons behind them are in [docs/decisions/](./docs/decisions/README.md).
- Planned work is in the [issues](https://github.com/emil-judin/nop-houdini-network-viewer/issues); [docs/ROADMAP.md](./docs/ROADMAP.md) has the current state and the direction.
- Every change starts from an issue. For anything bigger than a typo, open one first and describe the idea.
- Branch from `main` as `<issue>-<short-topic>` (for example `42-stubs-outside-selection`). Commits follow [Conventional Commits](https://www.conventionalcommits.org/) with NOP's areas as scope, for example `fix(viewer): fit frames node names at the right edge`. The full rules are in [AGENTS.md](./AGENTS.md) section 5.

## How NOP is built

NOP is built with AI-assisted development, openly. AI coding agents write much of the code.

The agents follow the rules in this repository, the same ones human contributors follow: [AGENTS.md](./AGENTS.md) (commands, invariants, security and privacy rules, definition of done), task-specific instructions in [`.agents/skills/`](./.agents/skills/), and the reasons behind the rules in [docs/decisions/](./docs/decisions/README.md).

Contributions made with an AI assistant are welcome. Most assistants read AGENTS.md on their own. Review their output like your own code before you open a pull request: the same checks and the same privacy and "no SideFX assets" rules apply.

## Setup

Node.js 20.19 or 22.12 or newer, as Vite 8 requires (CI uses 22, see `.nvmrc`).

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
- **No SideFX assets:** never copy SideFX or vendor icons, SVG data or code. Operator icons are original drawings (see [docs/ICONS.md](./docs/ICONS.md)).
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
