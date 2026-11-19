# Operator Icons

Every operator node in the viewer shows a small icon in its body. NOP's icons are **original drawings** that capture the metaphor of the matching SideFX Houdini or SideFX Labs icon in one house style. They are never copies, and they ship under NOP's MIT License.

This repository holds only the finished drawings. They are drawn, checked and reviewed in a separate repository, **nop-icon-pipeline** (checked out next to this one): it has the art bible (style, palette, sizes and the workflow), the Houdini references, the family plan, the review gallery and the step that moves approved drawings into this repository ([decision 0013](./decisions/0013-icon-pipeline-in-its-own-repository.md)).

## Where the icons are

The icon registry is `src/components/nodes/icons/`:

- `sop/`: built-in SOP operators (`sop.<type>` ids), in domain folders that follow the Houdini Tab menu: `attributes/`, `modeling/`, `io/`, `textures/`, `terrain/`, `volume/`, `simulation/`, `characters/`, `ml/` and `utility/`. Inside a domain, one file per visual family named after it (`modeling/poly.tsx` exporting `POLY_ICONS`); a family drawn in rounds is a folder with one file per round topic. Every folder has an `index.ts`; `sop/domains.ts` lists the domains and loads each one, and `sop/index.ts` collects them all for tools and tests. Drawings used by more than one file live in `sop/kits/`; a family file never imports from another family file ([decision 0012](./decisions/0012-icons-organized-by-domain-and-family.md)).
- `labs/`: SideFX Labs operators (`labs.<type>` ids). They load on demand, so networks without Labs nodes never download them.
- `path/`: icons used only by the network path bar.
- `defaultIcon.tsx`: the fallback emblem.
- `geoHelpers.ts` and `geoKits.tsx`: geometry helpers and shared parts (isometric boxes, tilted tori, cased strokes, corner badges) the drawings are built from.
- `iconRegistry.ts`: the lookup (`resolveOperatorIcon`), `iconTypes.ts`: the `OperatorIconDef` contract.

## Loading on demand

Each SOP domain is a separate file in the builds, like the Labs drawings ([decision 0014](./decisions/0014-sop-icons-load-per-domain.md)). The viewer looks up which domains a network needs in `sop/iconIndex.generated.ts` (which domain holds which type, icon id and drawing id), downloads them, and only then draws the network, so it never shows the default emblem first. A typical network needs two or three domains.

**After adding, removing or retyping a SOP drawing, run `npm run icons:index`.** It writes the index again from the drawings; `NOP-ICON-010` in `tests/unit/iconRegistry.test.ts` fails while the index is out of date. The pipeline's go-live step runs it for you. A new domain folder also needs an entry in `sop/domains.ts` and `sop/index.ts`.

## Rules for every drawing

- **Draw from scratch.** Reference icons may be looked at to understand their composition, but SideFX or vendor SVG data, gradients and files are never copied, traced, converted or embedded ([decision 0003](./decisions/0003-original-icons-no-sidefx-assets.md)).
- **References never enter this repository**, a build or the hosted playground.
- **Vendor logos are redrawn by hand** in the house style and marked `(vendor logo, redrawn)` in the description. The trademarks remain the property of their owners.
- **No real people:** a generic figure or head bust instead of a likeness.
- A drawing is the children of a `0 0 24 24` SVG: no `<image>`, `<style>`, `<filter>`, `<mask>`, `<foreignObject>` or external `href`, and gradient and clip ids start with the `uid` passed to `render`. The tests in `tests/unit/iconRegistry.test.ts` check the lookups, that entries are complete and unique, and the forbidden elements (the pipeline's pre-screen checks the rest).

New drawings and redraws are made in nop-icon-pipeline. A small fix to a live drawing can be made here directly; check it in the pipeline's gallery, which renders this repository's icons.
