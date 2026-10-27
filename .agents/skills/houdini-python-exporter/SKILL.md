---
name: houdini-python-exporter
description: >-
  Rules for the WOP Houdini exporter (exporter/wop_exporter.py, the Houdini package in exporter/package/).
  Use when changing what or how the exporter serializes, path scrubbing, subnetwork
  recursion, icon extraction, the shelf tools or the export dialogs.
---

# WOP Houdini Exporter

The exporter runs inside the user's Houdini session (Python 3, `hou` module). It writes the JSON document
described in [docs/SCHEMA.md](../../../docs/SCHEMA.md) and checked by `schema/wop-network-1.schema.json`.
The code is the source of truth: read the function named in each rule before changing it.

## 1. Entry points

- `run_interactive_export(pane)`: the "Export for WOP" shelf tool. One dialog (clipboard or file, compact or
  full parameters), then a second dialog only when locked third-party assets were found (see 3.2).
- `copy_selection_for_web(pane)`: the dialog-free "Copy for WOP" tool for a hotkey. Always compact, minified,
  never opens locked assets.
- Both build the document with `build_document(parent, export_mode, include_locked_assets)`, which returns
  `(document, selected_only, state)`. `ExportState` carries the settings, the icon extractor, the warning count
  and the locked assets that stayed closed. Keep both entry points going through `build_document`.
- The module must never run an export on import: the guard at the bottom only runs for shelf tools
  (`kwargs` in globals) or `__main__`.

## 2. HOM safety rules (Houdini 20 to 22+)

1. Read expressions only through `safe_expr` (`parm.expression()` raises `hou.OperationFailed` when a parameter
   does not have exactly one keyframe).
2. Count a component as keyframed (`is_keyframed`) only with more than one key, or one key whose expression is a
   segment function such as `bezier()` (`KEYFRAME_SEGMENT_FUNCTION`). Write `null` into `expr` for those.
3. Folders and folder types come from walking `node.parmTemplateGroup()` in `collect_parm_layout`, not from
   `containingFolders()`. Hide-when and disable-when rules are evaluated by `evaluate_conditional` with a
   per-node value cache (evaluating a parameter can cook geometry). Hidden parameters are skipped.
4. Wrap every per-parameter read in `try`; a failure increases `state.warnings` (reported in the status bar and
   as the optional `exportWarnings` field) instead of stopping the export.
5. Export `"items": [item.name() for item in box.items()]` for every network box, so the viewer can hide the
   contents of minimized boxes.

## 3. Privacy and legal rules (never weaken these)

### 3.1 Path scrubbing (`path_scrubber`)

Exports must be as safe to share as a screenshot of the network: no user, client, project, server or drive names.

- Every exported free-text value goes through `scrub_path`: parameter values and expressions, node comments,
  sticky note text, menu labels, icon ids and embedded custom SVG icons.
- Folders named by `$HIP`, `$JOB`, `$HOUDINI_USER_PREF_DIR`, `$HSITE` and `$HFS` become those variables
  (most specific first, forward slashes, backslashes and doubled backslashes inside code strings).
- Every other absolute path (drive letters, `~/`, server shares, `/mnt`, `/Volumes`, ...) keeps only its file
  name: `<path>/rock.exr`. Server shares lose both server and share names. Absolute Houdini node paths
  (`/obj/...`, `/out/...`) are kept.
- Owner decision: network box comments are exported as the user wrote them (not scrubbed).

### 3.2 Subnetwork recursion (`should_recurse_subnet`)

- Export the insides of: `subnet`, `geo`, `dopnet`, `topnet`, `lopnet`, `objnet`, and any unlocked digital asset
  (the user is editing it, also a SideFX asset the user unlocked).
- Never export the insides of: atomic built-in wrappers (`ATOMIC_BUILTIN_SUBNET_TYPES`, for example
  `attribwrangle`), compiled containers without an HDA definition, and locked SideFX or Labs assets.
- Locked assets from anyone else (purchased, studio, colleagues', the user's own finished assets) stay closed
  unless `include_locked_assets` is true. Only the interactive dialog sets it, after the user confirms
  ("Include Insides"); the default is "Export Closed". The hotkey never sets it.
- Owner decision: the icons of locked assets are still exported (users leave a node out of the selection if they
  do not want it shown).

### 3.3 Icons (`CustomUserAssetExtractor`)

- Built-in SideFX and SideFX Labs icons are never read, embedded or redistributed: nodes reference them by id
  only and the viewer draws its own original icons. Never read `$HFS/houdini/config/Icons/icons.zip`.
- Only `opdef:/...?IconSVG` sections and `.svg` files of assets outside `$HFS` and SideFX Labs are embedded,
  after `clean_svg` removes editor metadata (`<metadata>`, `sodipodi:` / `inkscape:` attributes, comments).

## 4. Schema versioning

- Bump `SCHEMA_VERSION` (minor) whenever a field is added, mark the field "schema 1.x.0" in `docs/SCHEMA.md`
  and in `src/schema/types.ts`, and add it to `schema/wop-network-1.schema.json`.
- Never remove or rename a field in 1.x: old exports must stay readable. A breaking change needs a new major
  version and a viewer that reads both.
- Current fields of note: `hdaState` (1.2.0), `pathNodes` (1.3.0), `exportWarnings` (1.4.0).

## 5. Package

- `exporter/package/` is the Houdini package: `wop.json` sets `$WOP_EXPORTER_ROOT` from `$HOUDINI_PACKAGE_PATH`,
  so it works in any package folder. `npm run build:exporter` builds the reproducible zip.
