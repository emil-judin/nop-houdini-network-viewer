---
name: houdini-python-exporter
description: >-
  Guidelines and HOM API rules for maintaining the SideFX Houdini Python Shelf Exporter (exporter/wop_exporter.py). Activate this skill when modifying the Python exporter, icon/shape extraction, or parameter serialization logic.
---

# Houdini Python Exporter Specification

Use this reference when editing `exporter/wop_exporter.py` or `exporter/README.md`.

## 1. Exporter UX & Options

When the user clicks the Shelf Tool in Houdini, it presents a single, lightweight `hou.ui.displayCustomConfirmation` or choice dialog allowing:
1. **Output Destination:**
   - Copy JSON directly to OS Clipboard (`hou.ui.copyTextToClipboard`) for immediate `Ctrl+V` pasting in the browser.
   - Save `.json` file to disk (`hou.ui.selectFile`).
2. **Parameter Depth:**
   - **Compact (Default):** Exports only non-default parameter tuples (`not pt.isAtDefault()`) plus VEX/Python code snippets (`snippet`, `python`).
   - **Full:** Exports all visible (`not pt.parmTemplate().isHidden()`) parameter tuples.
3. **Dialog-free hotkey entry point:** `copy_selection_for_web(pane=None)` skips the dialog, always uses Compact mode and copies minified JSON of the Network Editor under the mouse (`find_network_editor`). Both entry points build the document with `build_document(parent, export_mode)`; keep them in sync through that function.
4. **Parameter tuple fields (`serialize_parm_tuple`, schema 1.1.0):** besides `name`, `label`, `type`, `val`, `expr`, write the optional `folders` (`parm.containingFolders()`), `menuLabel` (label of the current menu token) and `keyframed` (per component). A parameter with an expression is stored by Houdini as one keyframe holding that expression, so only count a component as keyframed with more than one key, or one key whose expression is just a segment function such as `bezier()`; write `null` into `expr` for keyframed components.
5. **Parameter layout (`collect_parm_layout`, schema 1.2.0):** folders and their types come from walking `node.parmTemplateGroup()` (not `containingFolders()`, which misses some parameters). Hide-when / disable-when rules are evaluated in Python by `evaluate_conditional()` against current values; hidden parameters are skipped. Multiparm instances (`pt1`) are matched to their `pt#` templates by regex.

## 2. Mandatory HOM API Safety Rules (Houdini 20 - 22+)

1. **Safe Expression Reading (`safe_expr`):**
   - Never call `parm.expression()` without catching `hou.OperationFailed`. In Houdini, `parm.isTimeDependent()` can be `True` even when a parameter has `0` or `>1` keyframes, which causes `parm.expression()` to raise `hou.OperationFailed: Parameter must have exactly one keyframe`.
2. **Smart Subnetwork Recursion (`should_recurse_subnet`):**
   - Built-in SOPs like `attribwrangle`, `color`, `split`, `convertline`, and locked SideFX Labs nodes (`labs::*`) return `True` for `node.isSubNetwork()`.
   - Only recurse into child networks when:
     - `node.type().name() in ("subnet", "geo", "dopnet", "topnet", "lopnet")`, OR
     - `not node.isLockedHDA()`, OR
     - The HDA definition library path is outside `$HFS` and outside SideFX Labs (i.e. a user-authored custom HDA such as `emjud::*`).
3. **Icon Extraction (`extract_svg_icon`):**
   - Check `hou.readFile(icon_name)` first for `opdef:/...?IconSVG` paths.
   - For standard icon identifiers like `SOP_attribwrangle` or versioned names like `SOP_polyextrude-2.0`, look up `SOP/polyextrude.svg` inside `$HFS/houdini/config/Icons/icons.zip` (falling back to stripping the `-2.0` version suffix if needed).
4. **Network Box Item Membership:**
   - Always export `"items": [item.name() for item in box.items()]` on `hou.NetworkBox` so the web viewer knows which nodes to hide when `box.isMinimized()` is `True`.

