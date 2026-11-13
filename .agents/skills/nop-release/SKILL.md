---
name: nop-release
description: >-
  Checklist for a NOP release (tester builds now, npm releases from Milestone 4): version numbers, changelog,
  schema version, builds, SRI hash and tag. Use when the owner asks to prepare or publish a release.
---

# Release NOP

1. Run the full definition of done (`.agents/skills/nop-verify/SKILL.md`), including the browser tests
   when the test suite is in your checkout.
2. Version: bump `package.json` `version` (pre-releases: `0.x.y-alpha.n`). The exporter zip, the README of the
   Houdini package and the feedback form read it from there.
3. Schema: if the export format changed, `SCHEMA_VERSION` in `exporter/nop_exporter.py` was bumped, and
   `docs/SCHEMA.md`, `src/schema/types.ts` and `schema/nop-network-1.schema.json` describe the new fields.
4. `CHANGELOG.md`: move "Unreleased" under `## <version> (<date>, ...)`. This section becomes the release notes.
5. Docs: README install snippets name the new version. After `npm.cmd run build:lib`, run
   `node scripts/build_third_party_notices.mjs` so `THIRD_PARTY_NOTICES.md` matches what the builds bundle (CI checks it).
6. npm releases only (Milestone 4): set `PUBLISHED_ON_NPM = true` in `src/examplePage/embedPanel.ts` and drop
   the "not on npm yet" notes from the README and `example-site.html`; build with `npm.cmd run build:lib`, then `npm.cmd run sri` and
   publish the `web-component.js` hash in the README and CHANGELOG.
7. Release: commit steps 2 to 6 on main, then push the tag `v<version>`, only when the owner says so. The
   workflow `.github/workflows/release.yml` publishes the GitHub release: notes from the CHANGELOG section,
   `nop-exporter.zip` attached, pre-release for versions with a suffix. It stops if the tag does not match the
   `package.json` version or the CHANGELOG has no section for it; then fix main, delete the tag
   (`git push --delete origin v<version>`, `git tag -d v<version>`) and tag again. `npm publish` stays the
   owner's step.
