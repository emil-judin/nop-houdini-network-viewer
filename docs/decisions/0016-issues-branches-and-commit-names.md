# 0016: Work starts from an issue; branches and commits are named after it

- **Status:** Accepted
- **Date:** 2026-11-26

## Context

Open work lived in `docs/ROADMAP.md`, a checklist that only the repository shows. Branches were mostly named `<area>/<topic>` and commits `Area: summary`, but neither was written down, so names drifted (`fix/`, `deps/`, feature names as prefixes) and one branch collected several topics. Testers had no place to see what is planned or to report a bug next to it. Agents do much of the work and need a record of scope that survives between sessions.

## Decision

- **Issues hold the open work.** Every change starts from a GitHub issue; agents find or propose one before changing files and open it only after the owner agrees. No milestones for now: `docs/ROADMAP.md` names the issues that block the public release, and otherwise keeps only the current state and the direction ("Later", ArtStation); a "Later" item becomes an issue when work on it starts.
- **Branches:** `<issue>-<kebab-topic>` from `main`, one issue per branch. Reserved: `release/<version>`, `dependabot/`, `claude/` (temporary).
- **Commits:** Conventional Commits, `type(area): summary`, with a fixed list of types and NOP's areas as scope. New icon drawings are `feat(icons)`, corrected ones `fix(icons)`, and `style` is never used for visual changes. Breaking schema or API changes are marked with `!` and `BREAKING CHANGE:` even in `0.x`. `scripts/lint_commits.mjs` checks the subjects locally and in CI; an unknown area is only a warning.
- **The changelog stays hand-written.** Commits record the history for developers; `CHANGELOG.md` is written for users and is not generated from commits.

## Consequences

- Pull requests close their issue (`Closes #n`), and `git log --grep` finds work by type, area or issue.
- Issues are public: they never carry private repository contents, customer files or plans the owner has not shared.
- Agents need `gh` to read issues; the rules are in AGENTS.md section 5 and the `nop-verify`, `nop-release` and `nop-integration-tests` skills.
- The commits before this record keep their old `Area: summary` names; the check runs only on new branches.
- Conventional Commits would allow a generated changelog and automatic version bumps later (for example at 1.0, or when outside contributors arrive); that needs a new record.
