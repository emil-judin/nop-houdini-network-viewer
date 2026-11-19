# 0013: The icon pipeline lives in its own repository

- **Status:** Accepted
- **Date:** 2026-11-19

## Context

With the icon restart finished (all 44 family batches live, [0011](./0011-icon-workflow-family-micro-batches.md) and [0012](./0012-icons-organized-by-domain-and-family.md)), the tools for drawing icons were spread through this repository: the art bible and the brief for image generators in `docs/`, the reference sheet and pre-screen scripts with their accepted list in `scripts/`, an empty review folder in the icon registry, the Icon Review Gallery in the playground (dev server only), a Vite plugin serving the local references, and the gitignored plan and references (`icon-work/`, `local-refs/`). The script that built the references was not in any repository, so references for new Houdini nodes or new contexts (VOP) could no longer be made. None of it is part of the viewer, and new icons are only needed now and then: after a Houdini or Labs update, or for a new context.

## Decision

- Everything used to make icons moves to a separate repository, `nop-icon-pipeline`, checked out next to this one: the art bible, the AI brief, the plan, the prompts, the scripts, the accepted list, the review gallery, the drafts, and a new reference builder that runs in hython for any context.
- This repository keeps only the finished drawings and what they need at runtime (the registry, `geoHelpers.ts`, `geoKits.tsx`, kits) and their tests. `docs/ICONS.md` describes the layout and the legal rules.
- The pipeline reads this repository's source through an import alias, so drafts are rendered and checked with the real registry, and its go-live step writes approved drawings into the domain folders here.
- [0010](./0010-one-repository-public-api.md) still holds: the package and the playground stay in one repository. Only the drawing tools moved.

## Consequences

- The viewer, the playground and the npm package carry no icon tooling, no dev-only gallery and no reference plugin; a `?icons` link opens the first example like any other link.
- Drawing icons needs both checkouts side by side (or `NOP_REPO` in the pipeline). The pipeline is tied to this repository's icon contract (`OperatorIconDef`, the folder layout); changing either means updating the pipeline.
- Approved drawings are committed here, in this repository's history; drafts and reviews are committed in the pipeline.
