# 0011: Operator icons are drawn in family micro-batches with a render, measure and critic gate

- **Status:** Accepted
- **Date:** 2026-11-16

## Context

Batch 2 drew 100 mixed icons in one pass, split alphabetically into `part0..part9`, and 54 came back as Redo. The review showed five root causes:

1. **Blind large batches.** No automated visual check ran before human review, and the alphabetical split separated visual families (`pack*`, `polycut` and `polysplit`, `implicitsurface_*`, `posespace*`, `remesh*`), so siblings drifted apart and the reviewer tired.
2. **Anchoring on names and old descriptions.** Icons were drawn from the operator name or a previous (wrong) description instead of the Houdini reference pixels: Shape Difference as overlapping squares instead of an axis gizmo, Repack as a carton instead of an open suitcase, Remesh as a flat bullseye instead of a tilted torus.
3. **Hand-computed coordinates.** Isometric angles, 3/4 ellipses, gear teeth and arrowheads typed as raw numbers came out skewed, with misaligned badges and uneven strokes.
4. **Docs and code drift.** `ICON_AI_BRIEF.md` describes `<symbol>` and `<use>` motifs while the code composes TSX components.
5. **Single-pass confirmation.** The gallery showed 21px only on `#cccccc`, and Redo exports repeated the old description, which biased the next pass.

Published work on LLM and VLM SVG generation points the same way: reason about the picture before writing paths (Reason-SVG, "drawing with thought"), decompose into primitives built by geometry helpers (Chat2SVG), and close the loop by rendering, measuring (structural lint, silhouette or edge overlap, perceptual metrics) and critiquing with a separate reviewer.

## Decision

Every new icon batch follows the four stages in the icon art bible, section 9 (since [0013](./0013-icon-pipeline-in-its-own-repository.md) in the nop-icon-pipeline repository):

- **Family-first batches**, one whole visual family each (large families in rounds of about 10), clustered by visual family from the references before drawing. Shared kits are written once per family and reused unchanged.
- **Stage 1, vision-first spec:** describe each reference (metaphor, projection, palette, layers, shared kit and badge slot, casing plan) from the reference image, never from the name or an old description, before writing code.
- **Stage 2, deterministic geometry:** projection, ellipses, tori, arrowheads, gears, badges and cased strokes come from `src/components/nodes/icons/geoHelpers.ts` and `geoKits.tsx` (or a family kit built on them), not from hand-typed coordinates.
- **Stage 3, render and pre-screen:** `npm run icons:prescreen` renders the batch with the real registry next to the local references (48px, 21px on `#cccccc`, `#3d3d3d` and a saturated node color) and fails on forbidden elements, unprefixed ids, painted bounds, strokes under 0.6 and low 21px contrast; it warns on uncased light strokes, overfill and a weak silhouette or hue match with the reference.
- **Stage 4, independent critic:** a reviewer that did not draw the icons (a fresh-context agent) judges the contact sheet against the references and the art bible; rejected icons are patched and re-screened before the batch reaches the gallery.
- The gallery shows 21px on a light and a dark node, and Redo exports lead with the reviewer's correction and mark the old description as possibly wrong.

## Consequences

- Fewer icons per round, but each round reaches the human review with families consistent and obvious mistakes already caught.
- The pre-screen depends on the gitignored `local-refs/` for reference matching; without it the other checks still run. References never enter a build.
- The automatic reference match is coarse (silhouette IoU and hue overlap): it flags outliers, it does not replace the human and critic review.
- Restart (2026-11-16): every drawing the owner had not approved (the Batch 3 to 8 drafts, the 50 Batch 2 redraws, the Batch 3 pilot and 11 Batch 1 items) was removed, 628 icons in all. They are redrawn in 44 ordered family batches from a plan made once over all references (one batch per visual family, 5 to 77 icons; families above about 15 are drawn in rounds of about 10 over several sessions, held together by a family style sheet and kit), one batch per fresh session, with the approved and live icons as style anchors. The removed drawings stay recoverable in the git history (branch `icons/pre-restart`).
- Completed 2026-11-19: all 44 batches are live, sorted into domain folders ([0012](./0012-icons-organized-by-domain-and-family.md)). The workflow, its scripts and the gallery then moved to the nop-icon-pipeline repository ([0013](./0013-icon-pipeline-in-its-own-repository.md)).
