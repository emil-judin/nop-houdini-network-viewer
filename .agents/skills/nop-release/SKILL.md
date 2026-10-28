---
name: nop-release
description: >-
  Checklist for a NOP release (tester builds now, npm releases from Milestone 4): version numbers, changelog,
  schema version, builds, SRI hash and tag. Use when the owner asks to prepare or publish a release.
---

# Release NOP

1. Run the full definition of done (`.agents/skills/nop-verify/SKILL.md`).
2. Version: bump `package.json` `version` (pre-releases: `0.x.y-alpha.n`). The exporter zip, the README of the
   Houdini package and the feedback form read it from there.
3. Schema: if the export format changed, `SCHEMA_VERSION` in `exporter/nop_exporter.py` was bumped, and
   `docs/SCHEMA.md`, `src/schema/types.ts` and `schema/nop-network-1.schema.json` describe the new fields.
4. `CHANGELOG.md`: move "Unreleased" under the new version with the date.
5. Docs: README install snippets name the new version; `docs/TESTERS.md` title and privacy text are current.
6. npm releases only (Milestone 4): set `PUBLISHED_ON_NPM = true` in `src/playground/EmbedDialog.tsx` and drop
   the "not on npm yet" notes from the README; build with `npm.cmd run build:lib`, then `npm.cmd run sri` and
   publish the `web-component.js` hash in the README and CHANGELOG.
7. Tag the commit `v<version>` only when the owner says so. Publishing (`npm publish`, GitHub release) is the
   owner's step.
