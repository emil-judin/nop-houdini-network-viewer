# 0012: Built-in SOP icons are organized by domain and visual family, not by batch number

- **Status:** Accepted
- **Date:** 2026-11-19

## Context

After the icon restart ([0011](./0011-icon-workflow-family-micro-batches.md)) the live SOP icons sat in three layers from different periods: four hand-made topic files, the pre-restart approved icons in alphabetical slices (`approved/batch01a` to `d`, `b02/part0` to `part9`), and 69 restart files named by batch and round number (`families/b16HeightfieldR2.tsx` exporting `BATCH_16_R2`). The numbers only matter while planning (order and dependencies); in code they say nothing about the content, the alphabetical slices mixed unrelated operators, and family files imported drawings from each other.

## Decision

- `src/components/nodes/icons/sop/` has one folder per domain, following the Houdini Tab menu: `attributes/`, `modeling/`, `io/`, `textures/`, `terrain/`, `volume/`, `simulation/`, `characters/`, `ml/` and `utility/`.
- Inside a domain, one file per visual family, named after the family and exporting `<FAMILY>_ICONS` (`modeling/poly.tsx`, `POLY_ICONS`). A family drawn in rounds is a folder with one file per round topic (`characters/kinefx/motionClips.tsx`). Operators without a family go in a descriptive file of their domain (`modeling/cut.tsx`, `utility/time.tsx`).
- Every folder has an `index.ts` that collects its files; `sop/index.ts` collects the domains into `SOP_ICONS`, which the registry uses.
- A drawing used by more than one file lives in `sop/kits/`. Family files never import from each other. Small literal constants (outline and palette colors) are declared in each file that uses them.
- Batch numbers stay in the planning files only. Drafts in review are named after their family as well (since [0013](./0013-icon-pipeline-in-its-own-repository.md) in the nop-icon-pipeline repository, which mirrors this layout).

## Consequences

- The file for an operator can be found from its Houdini category, and a family's members, kit and style sit together.
- Placing an operator in a domain is a judgement call; moving one later is a small change (the entry and its private helpers move, the indexes stay).
- The restructure changed no drawing: a before and after snapshot of the registry (every type and icon lookup, matcher order and the rendered markup of all 825 icons) was identical apart from line endings inside one path string.
