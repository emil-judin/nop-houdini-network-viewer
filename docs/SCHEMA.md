# Canonical JSON Schema Specification (`SCHEMA.md`)

This document defines the JSON contract produced by `exporter/wop_exporter.py` and consumed by `src/schema/types.ts`.

---

## 1. Root Document Structure (`HoudiniNetworkDocument`)

```json
{
  "schemaVersion": "1.3.0",
  "houdiniVersion": "22.0.466",
  "exportedAt": "2026-10-23T15:00:00Z",
  "exportMode": "compact",
  "icons": {
    "SOP_attribwrangle": "<svg ...>...</svg>"
  },
  "customShapes": {},
  "root": {
    "path": "/obj/circuit_board/circuit_gen",
    "type": "emjud::circuit_gen::1.0",
    "context": "Sop",
    "nodes": [],
    "dots": [],
    "boxes": [],
    "stickies": [],
    "wires": [],
    "subnetInputs": [],
    "wireStyle": "default",
    "pathNodes": [
      { "name": "obj", "type": "obj", "icon": "NETWORKS_obj" },
      { "name": "circuit_board", "type": "geo", "icon": "OBJ_geo" },
      { "name": "circuit_gen", "type": "emjud::circuit_gen::1.0", "icon": "MISC_digital_asset" }
    ]
  }
}
```

`pathNodes` (schema 1.3.0, exported root only) lists every node from the top (`/obj`) down to the exported network itself, with its operator type and icon id (`node.type().icon()`), so the web path bar can show the same icons as Houdini's. Custom icons of user assets on the path are added to `icons` like node icons. The icon ids above are examples. The path bar starts at the exported network (nodes above it cannot be opened), so the viewer currently uses the last entry: the exported network's own icon. Older exports omit `pathNodes`; the viewer then picks the icon from the root `type` (a box for digital assets without an icon).

`wireStyle` is the Network Editor wire style of the network's node category (`hou.NodeTypeCategory.defaultWireStyle()`): `"default"` draws straight wires with short vertical stubs and rounded bends, `"rounded"` draws orthogonal wires (a short drop below the output, a horizontal run shared by all wires of that output, then a vertical drop into the input) with rounded corners. Older exports without the field render as `"default"`; the viewer's `wireStyle` prop and toolbar switch can override it.

---

## 2. Key Schema Rules & Edge Cases (Verified in Houdini 22.0)

1. **Backward Compatibility with Raw Dumps:**
   - The converter accepts both full `HoudiniNetworkDocument` objects and raw diagnostic dumps (where `icons` or `schemaVersion` may be omitted).
2. **Node Shape Normalization:**
   - In Houdini, nodes with the default rectangular shape report `"shape": ""`. The converter normalizes `""` to `"rect"`.
3. **Multi-Input Connector Cap (`maxInputs`):**
   - Operators with variable inputs (such as `merge` and `switch`) report `"maxInputs": 9999`.
   - Any node with `maxInputs > 4` renders a single wide multi-input bar connector at the top of the node rather than discrete circular connectors.
4. **Subnetwork Indirect Inputs (`subnetInputs`):**
   - Inside a Subnet or HDA, parent inputs are represented in `subnetInputs` with `"name": "1"`, `"name": "2"`, etc.
   - Wires originating from a subnet input reference `"from": "1"`. During conversion, these are mapped to synthetic node IDs (`__subnet_input_1`) to prevent ID collisions and ensure clean wire routing.
   - Optional `"inputName"` holds the name of the node wired into the matching input of the parent subnetwork (e.g. `"transform1"`). Houdini shows it as a second label line under `Sub-Network Input #1`. It is `""` (or missing in older exports) when the input is unconnected.
5. **Parameter Tuples (`parms`):**
   - Parameters are exported as grouped `ParmTuple` entries (`val: (string | number)[]` and `expr: (string | null)[]`) so multi-component parameters like `Translate` (`tx, ty, tz`) render on a single row in the inspector.
   - Optional fields added in schema `1.1.0` (older exports simply omit them):
     - `folders: string[]`: folder (tab) labels that contain the parameter, outermost first (`hou.Parm.containingFolders()`). The inspector groups rows under these headings.
     - `menuLabel: string`: label of the selected item of a `Menu` parameter (`val` keeps the token, e.g. `primitive` with label `Primitives`).
     - `keyframed: boolean[]`: per component, `true` when animated with keyframes. Houdini stores an expression as a single keyframe, so a component counts as keyframed only with more than one key, or one key holding just a segment function such as `bezier()`. The exporter writes `null` into `expr` for keyframed components, because the "expression" of an animated channel is only its interpolation function.
   - Example: `{ "name": "t", "label": "Translate", "type": "Float", "val": [1, 0, 2.5], "expr": [null, null, "$F/10"], "keyframed": [true, false, false], "folders": ["Transform"] }`.
   - Layout fields added in schema `1.2.0`, read from `node.parmTemplateGroup()` so the inspector can mirror the Houdini Parameter Pane:
     - `folderTypes: ("tabs" | "radio" | "simple" | "collapsible" | "multiparm" | "import")[]`: how each entry of `folders` is drawn (tab bar, titled section band, section with an expand arrow, multiparm block, frameless import). Older exports draw every folder as a `simple` section.
     - `disabled: true`: a disable-when rule greys the parameter out. The exporter evaluates hide-when and disable-when rules (`{ usetol3d == 0 } { snaptype != near }`: brace groups OR'ed, conditions AND'ed) against the node's current values; folders pass their state on to their contents. **Parameters hidden by a hide-when rule are not exported at all**, matching what Houdini shows.
     - `joinNext: string`: the parameter drawn on the same row to the right ("join with next", e.g. `Snap To [menu] Using [menu]`). The viewer only joins when that parameter directly follows.
     - `labelHidden: true`: no label. A label-less toggle joined to the next parameter is drawn in the left gutter, in front of that parameter's label (the "enable" checkbox of `Snap Distance`).
     - `range: [min, max]`: slider range of single-component `Float` / `Int` parameters (the slider knob position).
     - `hasMenu: true`: string parameter with a menu button on the right (group and attribute name fields).
     - `changed: boolean[]`: per component, `true` when the value differs from the parameter default (Houdini draws it in bold).
     - `ramp: { color, keys, values, basis }`: points of a `Ramp` parameter from `hou.Parm.evalAsRamp()` (`values` are numbers for float ramps, `[r, g, b]` for color ramps; `basis[i]` is the interpolation from point `i` to the next). The inspector draws a curve or a gradient; without it only the point count (`val`) is shown.
   - `parms` follows `hou.Node.parmTuples()` order, which lists spare parameters (for example a wrangle's generated channel parameters) last; the viewer places every parameter inside its folder or tab regardless of where it appears in the list.
6. **Digital asset state (`hdaState`, schema 1.2.0):** `"locked"` (grey padlock under the node name), `"unlocked"` (red open padlock: the asset is being edited), or `null` for nodes that are not assets. Older exports omit it.
7. **Path scrubbing:** exported text never contains local folders. The exporter replaces them with `$HIP`, `$JOB`, `$HOUDINI_USER_PREF_DIR`, `$HSITE`, `$HFS` or `$HOME`, and any remaining home folder (`C:/Users/<name>`, `/home/<name>`) with `~`, in parameter values, expressions, comments, sticky notes and custom icon ids.
8. **Minimized Network Boxes:**
   - When `minimized: true`, Houdini reports `size[1]: 0.0`. The exporter includes `items: string[]` (names of nodes/dots inside the box) so the viewer can hide internal items when a box is minimized and render the collapsed header bar accurately.


---

## 3. Versioning Policy

`schemaVersion` follows semantic versioning (`MAJOR.MINOR.PATCH`). The exporter always writes the newest version (`SCHEMA_VERSION` in `exporter/wop_exporter.py`); the viewer declares the major version it reads (`SUPPORTED_SCHEMA_MAJOR` in `src/schema/converter.ts`).

- **PATCH** (`1.3.0` to `1.3.1`): the exporter fills existing fields more correctly. The shape and meaning of every field stay the same.
- **MINOR** (`1.3.0` to `1.4.0`): adds optional fields. Old viewers ignore fields they do not know, and new viewers fall back to the old behavior when a field is missing. Every new field is marked with the version that added it ("schema 1.4.0") in this document.
- **MAJOR** (`1.x` to `2.0.0`): anything that would make an old file render wrong: a removed or renamed field, a changed meaning or unit, a changed coordinate convention.

Guarantees:

1. **Every viewer reads every export of its major version.** A file exported years ago with schema `1.0.0` keeps working in the newest `1.x` viewer. Files people host on their own sites never need a re-export because of a viewer update.
2. **A newer major is refused with a clear message**, never misread: the viewer shows "made by a newer WOP exporter, update the WOP viewer" instead of a broken network.
3. **A schema `2.0.0` ships with a viewer that still reads `1.x`** (by converting old files on load), so embeds keep working during the change. Dropping `1.x` support would itself be a major release of the package.
4. Every schema change is listed in `CHANGELOG.md` and in this document.

While WOP is in `0.x` alpha these rules already apply to the schema; the React component API may still change between alpha releases.
