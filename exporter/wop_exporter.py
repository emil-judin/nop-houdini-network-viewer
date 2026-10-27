"""
WOP - Houdini Python Shelf Exporter
===================================
Exports the active or selected Houdini node network into a self-contained JSON
format for the `wop-houdini-network-viewer` web package.

Features:
- Supports exporting to the OS Clipboard (for instant browser pasting) or saving to a .json file.
- Dialog-free "copy for web" entry point (`copy_selection_for_web()`) for a hotkey such as Ctrl+Shift+Alt+C.
- Supports Compact Mode (modified parameters + VEX/Python code) and Full Mode (all visible parameters).
- Smart subnetwork recursion: exports the insides of subnets and unlocked HDAs. Built-in SideFX / Labs nodes are
  never opened, and other locked HDAs (purchased, studio or colleagues' assets) only when the user confirms.
- Legal Icon Extraction: Only extracts custom SVG icons of HDAs outside $HFS and outside SideFX Labs, with editor
  metadata removed. Built-in SideFX icons from $HFS are never extracted or redistributed; they are referenced by
  identifier only.
- Privacy: paths inside $HIP and $JOB become variables, every other absolute path keeps only its file name.
"""

import datetime
import fnmatch
import json
import os
import re
import hou


SCHEMA_VERSION = "1.4.0"

# Keyframe segment functions: an animated parameter reports the function of its current segment
# as its "expression". Houdini stores a real expression (ch(), $F, ...) as one keyframe holding it.
KEYFRAME_SEGMENT_FUNCTION = re.compile(
    r"^(bezier|linear|constant|cubic|ease|easein|easeout|easep|easeinp|easeoutp|qlinear|quintic|"
    r"spline|vmatch|vmatchin|vmatchout|match|matchin|matchout)\(\)$"
)

# Built-in SideFX SOP wrappers that report isSubNetwork() == True but should be treated as atomic leaf nodes
ATOMIC_BUILTIN_SUBNET_TYPES = {
    "attribwrangle",
    "pointwrangle",
    "primitivewrangle",
    "vertexwrangle",
    "detailwrangle",
    "volumewrangle",
    "deformationwrangle",
    "color",
    "split",
    "convertline",
    "polypath",
    "extractcentroid",
    "findshortestpath",
}


def safe_expr(parm):
    """Safely returns a parameter's expression string, or None if not applicable."""
    try:
        return parm.expression()
    except hou.OperationFailed:
        return None
    except Exception:
        return None


def safe_val(parm):
    """Safely evaluates a parameter value, rounding floats and formatting menus as strings."""
    try:
        pt_type = parm.parmTemplate().type()
        if pt_type == hou.parmTemplateType.Menu:
            return parm.evalAsString()
        val = parm.eval()
        if isinstance(val, float):
            return round(val, 4)
        if isinstance(val, (int, bool, str)):
            return val
        return parm.evalAsString()
    except Exception:
        return ""


def is_keyframed(parm, expr):
    """Returns True if the parameter is animated with keyframes (not just driven by one expression)."""
    try:
        keys = parm.keyframes()
    except Exception:
        return False
    if len(keys) > 1:
        return True
    return len(keys) == 1 and bool(expr) and bool(KEYFRAME_SEGMENT_FUNCTION.match(expr.strip()))


def safe_folders(parm):
    """Returns the folder (tab) labels containing a parameter, outermost first."""
    try:
        return list(parm.containingFolders())
    except Exception:
        return []


# Exports should be as safe to share as a screenshot of the network: no user, client, project, server
# or drive names. Path scrubbing has two steps:
#
# 1. Folders that Houdini names with a variable are replaced by it, most specific first, so paths
#    inside the project keep their structure (`C:/Users/me/projects/fan/geo/a.bgeo` -> `$HIP/geo/a.bgeo`).
# 2. Every other absolute path keeps only its file name: `D:/Clients/Acme/tex/rock.exr`,
#    `\\studio-nas\acme\rock.exr` and `/mnt/acme/rock.exr` all become `<path>/rock.exr`.
#    Absolute Houdini node paths (`/obj/geo1/OUT`) are not files and stay as written.
SCRUB_VARIABLES = ("HIP", "JOB", "HOUDINI_USER_PREF_DIR", "HSITE", "HFS")

# Placeholder for removed folders
PATH_PLACEHOLDER = "<path>"

# First segments of absolute Houdini node paths (`/obj/...`, `/out/...`), which are kept
HOUDINI_NETWORK_ROOTS = frozenset(("obj", "out", "mat", "shop", "stage", "tasks", "ch", "img", "vex"))

# Start of an absolute path: a drive (`C:/`, `C:\`, `C:\\` inside code) or a home folder (`~/`), a
# server share (`\\host\share`, `//host/share`, but not the `//` of `https://`, VEX comments such as
# `//@Cd = 1;` or `//if (x)`, or the `\\n` of code strings) or a POSIX root (`/mnt`, but not `a/b`
# or `$HIP/geo`)
_ABSOLUTE_PATH_START = (
    r"(?:(?<![\w])(?:[A-Za-z]:|~)[/\\]{1,2}"
    r"|(?<![\w:/\\])(?:\\{2,4}|//)(?=[A-Za-z][\w.$-]*[/\\]{1,2}[A-Za-z0-9_$])"
    r"|(?<![\w$~.:/\\)\]-])/(?=[^\s/\\]))"
)
# A whole value that is only a server name (`\\studio-nas`), which the rule above leaves alone
SERVER_ONLY = re.compile(r"^\s*(?:\\{2,4}|//)[A-Za-z][\w.$-]*[/\\]{0,2}\s*$")
# Folder segments may contain spaces (`Program Files`) but not start with one; the file name ends at
# whitespace. Quotes, backticks and code punctuation (`%s`, `{`, `;`, `=`, `+`, `,`) end a path.
ABSOLUTE_PATH = re.compile(
    _ABSOLUTE_PATH_START
    + r"(?:[^\s/\\\"'`<>|*?%{};=+,][^/\\\n\"'`<>|*?%{};=+,]*[/\\]{1,2})*"
    + r"[^\s/\\\"'`<>|*?%{};=+,]*"
)
DRIVE_PREFIX = re.compile(r"^(?:[A-Za-z]:|~)")
# Fallback for home folders without a drive (`\Users\<name>` or `/home/<name>` inside other text)
HOME_FOLDER = re.compile(r"(?i)(?:\b[a-z]:|(?<![\w.:/\\]))[/\\](?:users|home)[/\\][^/\\\"'\s]+")


def scrub_absolute_path(match):
    """Replaces the folders of one `ABSOLUTE_PATH` match with `<path>`, keeping the file name."""
    path = match.group(0)
    is_share = path.startswith(("\\\\", "//"))
    is_drive = bool(DRIVE_PREFIX.match(path))
    body = DRIVE_PREFIX.sub("", path) if is_drive else path
    inner = body.strip("/\\")
    parts = re.split(r"[/\\]+", inner) if inner else []
    if body.endswith(("/", "\\")):
        folders, name = parts, ""
    else:
        folders, name = parts[:-1], (parts[-1] if parts else "")
    if is_share:
        # The first two parts are the server and the share name: never keep them
        return PATH_PLACEHOLDER + ("/" + name if len(folders) >= 2 else "")
    if is_drive:
        return PATH_PLACEHOLDER + "/" + name
    # POSIX: a lone `/name` reveals nothing, and node paths such as `/obj/geo1` are kept
    if not folders or parts[0].lower() in HOUDINI_NETWORK_ROOTS:
        return path
    return PATH_PLACEHOLDER + "/" + name


def path_scrubber():
    """Returns a function that makes exported text safe to share.

    Replaces project and Houdini folders with `$HIP`, `$JOB`, `$HOUDINI_USER_PREF_DIR`, `$HSITE` or
    `$HFS`, then removes the folders of every other absolute path (see `ABSOLUTE_PATH`).
    """
    replacements = []
    for var in SCRUB_VARIABLES:
        try:
            value = hou.getenv(var) or ""
        except Exception:
            value = ""
        value = value.replace("\\", "/").rstrip("/")
        if len(value) > 3:
            replacements.append((value, "$" + var))
    replacements.sort(key=lambda r: -len(r[0]))

    def scrub(text):
        if not isinstance(text, str) or not text:
            return text
        if SERVER_ONLY.match(text):
            return PATH_PLACEHOLDER
        result = text
        for folder, variable in replacements:
            # Forward slashes, backslashes, and doubled backslashes as written inside code strings
            for variant in (folder, folder.replace("/", "\\"), folder.replace("/", "\\\\")):
                result = re.sub(re.escape(variant), lambda _match, variable=variable: variable, result, flags=re.IGNORECASE)
        result = ABSOLUTE_PATH.sub(scrub_absolute_path, result)
        return HOME_FOLDER.sub("~", result)

    return scrub


# Shared scrubber, rebuilt for every export in build_document() (variables can change between exports)
scrub_path = path_scrubber()


def hda_state(node):
    """Returns `"locked"` or `"unlocked"` for digital asset instances, None for other nodes.

    Houdini draws a grey padlock under locked assets and a red open padlock under unlocked ones.
    """
    try:
        if node.type().definition() is None:
            return None
        return "locked" if node.isLockedHDA() else "unlocked"
    except Exception:
        return None


def safe_ramp(parm):
    """Returns a ramp parameter's points (`hou.Ramp`) for the web ramp display, or None."""
    try:
        ramp = parm.evalAsRamp()
        is_color = ramp.isColor()
        return {
            "color": is_color,
            "keys": [round(k, 4) for k in ramp.keys()],
            "values": [[round(c, 4) for c in v] if is_color else round(v, 4) for v in ramp.values()],
            # hou.rampBasis names: Constant, Linear, CatmullRom, MonotoneCubic, Bezier, BSpline, Hermite
            "basis": [str(b).split(".")[-1] for b in ramp.basis()],
        }
    except Exception:
        return None


def safe_menu_label(parm):
    """Returns the label of a menu parameter's current item (e.g. `Primitives` for `primitive`).

    Tries the parameter's own menu first, then its template's menu (some generated menus return no
    items from the parameter), matching by token and, for ordinal menus whose value is the item
    index, by position.
    """
    try:
        token = parm.evalAsString()
    except Exception:
        return None
    try:
        value = parm.eval()
        index = value if isinstance(value, int) and not isinstance(value, bool) else None
    except Exception:
        index = None
    for source in (parm, getattr(parm, "parmTemplate", lambda: None)()):
        if source is None:
            continue
        try:
            items = list(source.menuItems())
            labels = list(source.menuLabels())
        except Exception:
            continue
        if not items or len(labels) != len(items):
            continue
        if token in items:
            return labels[items.index(token)]
        if index is not None and 0 <= index < len(labels):
            return labels[index]
    return None


# hou.folderType names -> schema folder types (how the Parameter Pane draws the folder)
FOLDER_TYPE_NAMES = {
    "Tabs": "tabs",
    "RadioButtons": "radio",
    "Simple": "simple",
    "Collapsible": "collapsible",
    "MultiparmBlock": "multiparm",
    "ScrollingMultiparmBlock": "multiparm",
    "TabbedMultiparmBlock": "multiparm",
    "ImportBlock": "import",
}

# Hide-when / disable-when rules: `{ a == 1 b != "x" } { c > 2 }` (groups are OR'ed, conditions AND'ed)
CONDITION_GROUP = re.compile(r"\{([^{}]*)\}")
CONDITION = re.compile(r"""([A-Za-z_]\w*)\s*(==|!=|<=|>=|=~|!~|<|>)\s*("(?:[^"\\]|\\.)*"|'[^']*'|[^\s{}]+)""")


def folder_type_name(template):
    """Returns the schema folder type of a folder parameter template (`tabs`, `simple`, ...)."""
    try:
        return FOLDER_TYPE_NAMES.get(str(template.folderType()).split(".")[-1], "tabs")
    except Exception:
        return "tabs"


def condition_text(template, kind):
    """Returns a template's hide-when (`HideWhen`) or disable-when (`DisableWhen`) rule, or ""."""
    try:
        return template.conditionals().get(getattr(hou.parmCondType, kind), "") or ""
    except Exception:
        return ""


def condition_value(node, name, cache=None):
    """Returns `(text, value)` of the parameter a condition refers to, or None.

    `cache` (a dict per node) keeps each parameter's value, because evaluating a parameter can be slow
    (an expression such as `npoints()` cooks geometry) and many rules refer to the same parameter.
    """
    if cache is not None and name in cache:
        return cache[name]
    parm = node.parm(name)
    if parm is None:
        tup = node.parmTuple(name)
        parm = tup[0] if tup is not None and len(tup) > 0 else None
    result = None
    if parm is not None:
        try:
            result = (parm.evalAsString(), parm.eval())
        except Exception:
            result = None
    if cache is not None:
        cache[name] = result
    return result


def check_condition(node, name, op, raw, cache=None):
    """Evaluates one `name op value` condition against the node's current parameter values."""
    value = condition_value(node, name, cache)
    if value is None:
        return False
    current_text, current = value
    expected = raw[1:-1] if len(raw) >= 2 and raw[0] == raw[-1] and raw[0] in "\"'" else raw
    if op in ("=~", "!~"):
        matched = fnmatch.fnmatchcase(current_text, expected)
        return matched if op == "=~" else not matched
    try:
        # Numbers, toggles and ordinal menus compare numerically ...
        a, b = float(current), float(expected)
    except (TypeError, ValueError):
        # ... strings and menu tokens compare as text
        a, b = current_text, expected
    try:
        return {
            "==": a == b,
            "!=": a != b,
            "<": a < b,
            ">": a > b,
            "<=": a <= b,
            ">=": a >= b,
        }[op]
    except TypeError:
        return False


def evaluate_conditional(node, text, cache=None):
    """Returns True when a hide-when / disable-when rule currently applies to `node`.

    Rules on multiparm instances (names with `#`) are not resolved and never apply. `cache` is passed
    on to `condition_value()`.
    """
    for group in CONDITION_GROUP.findall(text or ""):
        conditions = CONDITION.findall(group)
        if conditions and all(check_condition(node, *c, cache=cache) for c in conditions):
            return True
    return False


def collect_parm_layout(node):
    """Describes how the Parameter Pane lays out each parameter of `node`.

    Walks `node.parmTemplateGroup()` and returns `(by_name, patterns)`: a dict from parameter tuple name
    to layout info, and `(regex, info)` pairs for multiparm instances (`name#` templates). Layout info:
    containing folder labels and types, `hidden` / `disabled` after evaluating hide-when and disable-when
    rules (folders pass them on to their contents), and drawing hints (join with next, hidden label,
    slider range, string menu button).
    """
    by_name = {}
    patterns = []
    values = {}

    def walk(templates, folders, folder_types, hidden, disabled):
        templates = list(templates)
        for index, template in enumerate(templates):
            is_hidden = (
                hidden
                or bool(getattr(template, "isHidden", lambda: False)())
                or evaluate_conditional(node, condition_text(template, "HideWhen"), values)
            )
            is_disabled = disabled or evaluate_conditional(node, condition_text(template, "DisableWhen"), values)
            if template.type() == hou.parmTemplateType.Folder:
                walk(
                    template.parmTemplates(),
                    folders + [template.label()],
                    folder_types + [folder_type_name(template)],
                    is_hidden,
                    is_disabled,
                )
                continue

            info = {"folders": folders, "folderTypes": folder_types, "hidden": is_hidden, "disabled": is_disabled}
            try:
                if template.joinsWithNext() and index + 1 < len(templates):
                    info["joinNext"] = templates[index + 1].name()
                if template.isLabelHidden():
                    info["labelHidden"] = True
                if template.type() in (hou.parmTemplateType.Float, hou.parmTemplateType.Int) and template.numComponents() == 1:
                    info["range"] = [template.minValue(), template.maxValue()]
                if template.type() == hou.parmTemplateType.String and (
                    template.menuItems() or template.itemGeneratorScript()
                ):
                    info["hasMenu"] = True
            except Exception:
                pass

            name = template.name()
            if "#" in name:
                patterns.append((re.compile("^" + re.escape(name).replace("\\#", r"\d+") + "$"), info))
            else:
                by_name[name] = info

    try:
        walk(node.parmTemplateGroup().entries(), [], [], False, False)
    except Exception:
        pass
    return by_name, patterns


def find_parm_layout(layout, name):
    """Looks up a parameter tuple's layout info from `collect_parm_layout()`, or None."""
    by_name, patterns = layout
    if name in by_name:
        return by_name[name]
    for pattern, info in patterns:
        if pattern.match(name):
            return info
    return None


def serialize_parm_tuple(pt, layout_info=None):
    """Serializes one parameter tuple for the web Parameter Inspector.

    `layout_info` comes from `find_parm_layout()`; without it the folders are read from the parameter.
    """
    template = pt.parmTemplate()
    parms = list(pt)
    exprs = [safe_expr(p) for p in parms]
    keyframed = [is_keyframed(p, e) for p, e in zip(parms, exprs)]
    data = {
        "name": pt.name(),
        "label": pt.description(),
        "type": str(template.type()).split(".")[-1],
        "val": [scrub_path(safe_val(p)) for p in parms],
        # Keyframed components report their segment function (bezier(), ...), which is not useful to show
        "expr": [None if k else scrub_path(e) for k, e in zip(keyframed, exprs)],
    }
    # Houdini draws values that differ from the default in bold
    changed = []
    for p in parms:
        try:
            changed.append(not p.isAtDefault())
        except Exception:
            changed.append(False)
    if any(changed):
        data["changed"] = changed
    if layout_info is not None:
        if layout_info["folders"]:
            data["folders"] = list(layout_info["folders"])
            data["folderTypes"] = list(layout_info["folderTypes"])
        for key in ("joinNext", "labelHidden", "range", "hasMenu"):
            if key in layout_info:
                data[key] = layout_info[key]
        if layout_info["disabled"]:
            data["disabled"] = True
    else:
        folders = safe_folders(parms[0]) if parms else []
        if folders:
            data["folders"] = folders
    if template.type() == hou.parmTemplateType.Menu and parms:
        menu_label = safe_menu_label(parms[0])
        if menu_label:
            # Generated menus can list file paths
            data["menuLabel"] = scrub_path(menu_label)
    if template.type() == hou.parmTemplateType.Ramp and parms:
        ramp = safe_ramp(parms[0])
        if ramp:
            data["ramp"] = ramp
    if any(keyframed):
        data["keyframed"] = keyframed
    return data


def is_sidefx_or_labs_hda(node):
    """Returns True if the node's HDA definition lives inside $HFS or SideFX Labs."""
    type_name = node.type().name()
    if type_name.startswith("labs::") or type_name.startswith("sidefx::"):
        return True

    hda_def = node.type().definition()
    if hda_def is None:
        return True

    lib_path = hda_def.libraryFilePath().replace("\\", "/").lower()
    hfs_path = hou.expandString("$HFS").replace("\\", "/").lower()
    if lib_path.startswith(hfs_path) or "sidefxlabs" in lib_path:
        return True

    return False


def has_insides(node):
    """True for a subnetwork that holds nodes and is not one of the atomic built-in wrappers."""
    try:
        return (
            node.isSubNetwork()
            and len(node.children()) > 0
            and node.type().name() not in ATOMIC_BUILTIN_SUBNET_TYPES
        )
    except Exception:
        return False


def is_locked_third_party_asset(node):
    """True for a locked digital asset that does not come from SideFX or SideFX Labs.

    These are purchased assets, studio tools, colleagues' assets or the user's own finished assets.
    Their authors locked them, and they can be under a license or an NDA.
    """
    try:
        return node.type().definition() is not None and node.isLockedHDA() and not is_sidefx_or_labs_hda(node)
    except Exception:
        return False


def should_recurse_subnet(node, include_locked_assets=False):
    """
    Determines whether a subnetwork node should have its internal children exported.

    Exports the insides of plain subnetworks and of unlocked digital assets (assets the user is editing).
    Never exports the insides of built-in SideFX / Labs nodes. The insides of other locked assets are only
    exported when `include_locked_assets` is True (the user confirmed that they made those assets).
    """
    if not has_insides(node):
        return False

    type_name = node.type().name()
    if type_name in ("subnet", "geo", "dopnet", "topnet", "lopnet", "objnet"):
        return True

    # Built-in compiled containers that are not HDAs at all (Attribute VOP, Solver SOP, ...)
    # hold engine internals, not user-authored networks: never recurse into them.
    if node.type().definition() is None:
        return False

    if not node.isLockedHDA():
        # An unlocked asset (also a built-in one the user unlocked) is being edited by the user
        return True

    if is_sidefx_or_labs_hda(node):
        return False

    return include_locked_assets


# Editor metadata in SVG files saved by Inkscape or Illustrator: `<metadata>` (author, license),
# Inkscape's `<sodipodi:namedview>` and `sodipodi:` / `inkscape:` attributes such as
# `inkscape:export-filename="C:\Users\<name>\..."`
SVG_METADATA = re.compile(r"<metadata\b.*?</metadata\s*>|<sodipodi:namedview\b.*?(?:/>|</sodipodi:namedview\s*>)", re.S | re.I)
SVG_EDITOR_ATTRIBUTE = re.compile(r"""\s(?:sodipodi|inkscape):[\w.-]+\s*=\s*(?:"[^"]*"|'[^']*')""", re.I)
SVG_COMMENT = re.compile(r"<!--.*?-->", re.S)


def clean_svg(svg):
    """Removes editor metadata, comments and local folders from an SVG icon before it is embedded."""
    cleaned = SVG_EDITOR_ATTRIBUTE.sub("", SVG_METADATA.sub("", SVG_COMMENT.sub("", svg)))
    return scrub_path(cleaned)


class CustomUserAssetExtractor:
    """
    Extracts only user-authored custom HDA SVG icons (outside $HFS and SideFX Labs).
    Does not extract proprietary SideFX icons from $HFS/houdini/config/Icons/icons.zip.
    """

    def __init__(self):
        self.icons = {}
        self.custom_shapes = {}
        self._hfs_prefix = hou.expandString("$HFS").replace("\\", "/").lower()

    def register_user_icon(self, node, icon_id):
        """Extracts an SVG string only if the icon belongs to a user-authored custom HDA or external file."""
        if not icon_id or icon_id in self.icons:
            return

        # Never extract built-in SideFX or SideFX Labs icons
        if is_sidefx_or_labs_hda(node):
            return

        svg_content = self._read_custom_svg(icon_id)
        if svg_content:
            # Stored under the scrubbed id, matching the node's scrubbed `icon` field
            self.icons[scrub_path(icon_id)] = clean_svg(svg_content)

    def _read_custom_svg(self, icon_id):
        # 1. Embedded SVG section inside the user's custom HDA (`opdef:/user::Sop/my_hda?IconSVG`)
        if icon_id.startswith("opdef:"):
            try:
                raw = hou.readFile(icon_id)
                if "<svg" in raw:
                    return raw
            except Exception:
                pass
            return None

        # 2. Custom SVG file on disk outside $HFS
        if icon_id.lower().endswith(".svg") and os.path.exists(icon_id):
            norm_path = os.path.abspath(icon_id).replace("\\", "/").lower()
            if not norm_path.startswith(self._hfs_prefix) and "sidefxlabs" not in norm_path:
                try:
                    with open(icon_id, "r", encoding="utf-8") as f:
                        raw = f.read()
                        if "<svg" in raw:
                            return raw
                except Exception:
                    pass
        return None


def selected_items_in(net):
    """Returns the selected items that live directly inside `net`.

    `hou.selectedItems()` is global: items stay selected in networks you are not looking at,
    so the selection is filtered to the exported network.
    """
    return [it for it in hou.selectedItems() if it.parent() == net]


class ExportState:
    """Settings and results of one export, shared by all levels of `serialize_network()`.

    - `export_mode`: `"compact"` (changed parameters and code) or `"full"` (all visible parameters).
    - `include_locked_assets`: export the insides of locked non-SideFX assets (see `should_recurse_subnet()`).
    - `extractor`: collects the custom icons of the user's assets.
    - `warnings`: parameters that could not be read and were left out.
    - `closed_assets`: type names of locked assets exported without their insides.
    """

    def __init__(self, export_mode="compact", include_locked_assets=False):
        self.export_mode = export_mode
        self.include_locked_assets = include_locked_assets
        self.extractor = CustomUserAssetExtractor()
        self.warnings = 0
        self.closed_assets = set()


def serialize_network(net, state, selected_only=False):
    """Recursively serializes a Houdini network into our canonical JSON structure."""
    extractor = state.extractor
    export_mode = state.export_mode
    items = selected_items_in(net) if selected_only else net.allItems()
    if selected_only and not items:
        items = net.allItems()

    item_names = {it.name() for it in items}

    out = {
        "path": net.path(),
        "type": net.type().name(),
        "context": net.childTypeCategory().name() if hasattr(net, "childTypeCategory") else "Sop",
        "nodes": [],
        "dots": [],
        "boxes": [],
        "stickies": [],
        "wires": [],
        "subnetInputs": [],
        # Network Editor wire style for this network type: "default" (straight) or "rounded"
        "wireStyle": "default",
    }
    try:
        if net.childTypeCategory().defaultWireStyle() == "rounded":
            out["wireStyle"] = "rounded"
    except (AttributeError, hou.Error):
        pass

    # Nodes wired into the subnet's own inputs (in the parent network), shown under each indirect input
    parent_inputs = net.inputs() if hasattr(net, "inputs") else ()
    try:
        indirect_inputs = net.indirectInputs()
    except (AttributeError, hou.Error):
        # Only subnetworks have indirect inputs: other containers (e.g. a Geometry object) raise
        # hou.InvalidNodeType ("Node is not a subnetwork") instead of returning an empty list
        indirect_inputs = ()
    for si in indirect_inputs:
        num = si.number()
        source = parent_inputs[num] if num < len(parent_inputs) else None
        out["subnetInputs"].append({
            "name": si.name(),
            "num": num,
            "pos": [round(x, 4) for x in si.position()],
            "inputName": source.name() if source is not None else "",
        })

    for it in items:
        item_type = it.networkItemType()

        if item_type == hou.networkItemType.Node:
            icon_id = it.type().icon()
            shape_name = it.userData("nodeshape") or it.type().defaultShape() or "rect"
            extractor.register_user_icon(it, icon_id)

            parms = []
            layout = collect_parm_layout(it)
            for pt in it.parmTuples():
                try:
                    template = pt.parmTemplate()
                    # Buttons only run actions in Houdini; the web viewer is view-only, so skip them
                    if template.isHidden() or template.type() == hou.parmTemplateType.Button:
                        continue
                    is_code_parm = pt.name() in ("snippet", "python")
                    layout_info = find_parm_layout(layout, pt.name())
                    # Parameters hidden by a hide-when rule are not visible in Houdini either
                    if layout_info is not None and layout_info["hidden"] and not is_code_parm:
                        continue
                    if export_mode == "compact" and pt.isAtDefault() and not is_code_parm:
                        continue

                    parms.append(serialize_parm_tuple(pt, layout_info))
                except Exception:
                    state.warnings += 1

            node_obj = {
                "name": it.name(),
                "type": it.type().name(),
                "label": it.type().description(),
                "icon": scrub_path(icon_id),
                "pos": [round(x, 4) for x in it.position()],
                "size": [round(x, 4) for x in it.size()],
                "color": [round(x, 3) for x in it.color().rgb()],
                "shape": shape_name,
                "flags": {
                    "bypass": getattr(it, "isBypassed", lambda: False)(),
                    "display": getattr(it, "isDisplayFlagSet", lambda: False)(),
                    "render": getattr(it, "isRenderFlagSet", lambda: False)(),
                    "template": getattr(it, "isTemplateFlagSet", lambda: False)(),
                    "selectableTemplate": getattr(it, "isSelectableTemplateFlagSet", lambda: False)(),
                    "lock": getattr(it, "isHardLocked", lambda: False)(),
                    "softLock": getattr(it, "isSoftLocked", lambda: False)(),
                },
                "maxInputs": len(it.inputConnectors()),
                "inputLabels": list(it.inputLabels()),
                "maxOutputs": len(it.outputConnectors()),
                "outputLabels": list(it.outputLabels()),
                "comment": scrub_path(it.comment()),
                "showComment": it.isGenericFlagSet(hou.nodeFlag.DisplayComment),
                "isSubnetwork": should_recurse_subnet(it, state.include_locked_assets),
                # "locked" / "unlocked" digital asset, None for other nodes (padlock badge under the name)
                "hdaState": hda_state(it),
                "parms": parms,
            }

            if node_obj["isSubnetwork"]:
                node_obj["children"] = serialize_network(it, state, selected_only=False)
            elif has_insides(it) and is_locked_third_party_asset(it):
                state.closed_assets.add(it.type().name())

            out["nodes"].append(node_obj)

        elif item_type == hou.networkItemType.NetworkDot:
            out["dots"].append({
                "name": it.name(),
                "pos": [round(x, 4) for x in it.position()],
                "pinned": it.isPinned(),
            })

        elif item_type == hou.networkItemType.NetworkBox:
            out["boxes"].append({
                "name": it.name(),
                "comment": it.comment(),
                "pos": [round(x, 4) for x in it.position()],
                "size": [round(x, 4) for x in it.size()],
                "color": [round(x, 3) for x in it.color().rgb()],
                "minimized": it.isMinimized(),
                "items": [child.name() for child in it.items()],
            })

        elif item_type == hou.networkItemType.StickyNote:
            out["stickies"].append({
                "name": it.name(),
                "text": scrub_path(it.text()),
                "pos": [round(x, 4) for x in it.position()],
                "size": [round(x, 4) for x in it.size()],
                "color": [round(x, 3) for x in it.color().rgb()],
                "minimized": it.isMinimized(),
                "textColor": [round(x, 3) for x in it.textColor().rgb()],
                "drawBackground": it.drawBackground(),
            })

        if item_type in (hou.networkItemType.Node, hou.networkItemType.NetworkDot):
            for conn in it.inputConnections():
                in_item = conn.inputItem()
                if not selected_only or in_item.name() in item_names or in_item.networkItemType() == hou.networkItemType.SubnetIndirectInput:
                    out["wires"].append({
                        "from": in_item.name(),
                        "fromOutput": conn.outputIndex(),
                        "to": it.name(),
                        "toInput": conn.inputIndex(),
                    })

    return out


def find_network_editor(pane=None):
    """Returns the Network Editor to export from.

    Uses, in order: the pane passed in (shelf tools started from a hotkey receive the pane under
    the mouse in `kwargs["pane"]`), the pane under the mouse, then the first open Network Editor.
    """
    candidates = [pane]
    try:
        candidates.append(hou.ui.paneTabUnderCursor())
    except Exception:
        pass
    for candidate in candidates:
        if candidate is not None and candidate.type() == hou.paneTabType.NetworkEditor:
            return candidate
    return hou.ui.paneTabOfType(hou.paneTabType.NetworkEditor)


def path_nodes(net, extractor):
    """Name, type and icon of every node from the top (`/obj`) down to `net`, for the web path bar.

    Custom icons of user assets on the path are registered like node icons, so they reach the web.
    """
    chain = []
    node = net
    while node is not None and node.path() != "/":
        try:
            icon_id = node.type().icon()
            chain.append({"name": node.name(), "type": node.type().name(), "icon": scrub_path(icon_id)})
        except Exception:
            break
        try:
            extractor.register_user_icon(node, icon_id)
        except Exception:
            pass
        node = node.parent()
    return list(reversed(chain))


def build_document(parent, export_mode="compact", include_locked_assets=False):
    """Builds the complete JSON document for `parent`.

    Exports the items selected inside `parent`, or the whole network when nothing is selected there.
    Returns `(document, selected_only, state)`; `state` is the `ExportState` with the warning count and
    the locked assets that were exported without their insides.
    """
    global scrub_path
    scrub_path = path_scrubber()
    state = ExportState(export_mode, include_locked_assets)
    selected_only = len(selected_items_in(parent)) > 0
    root_net = serialize_network(parent, state, selected_only=selected_only)
    root_net["pathNodes"] = path_nodes(parent, state.extractor)
    doc = {
        "schemaVersion": SCHEMA_VERSION,
        "houdiniVersion": hou.applicationVersionString(),
        "exportedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "exportMode": export_mode,
        "icons": state.extractor.icons,
        "customShapes": state.extractor.custom_shapes,
        "root": root_net,
    }
    if state.warnings:
        doc["exportWarnings"] = state.warnings
    return doc, selected_only, state


def export_notes(state):
    """Short sentences about what an export left out, for status messages (empty string if nothing)."""
    notes = []
    if state.closed_assets:
        notes.append(f"{len(state.closed_assets)} locked asset type(s) exported without their insides.")
    if state.warnings:
        notes.append(f"{state.warnings} parameter(s) could not be read and were left out.")
    return " ".join(notes)


def ask_about_locked_assets(closed_assets):
    """Asks whether to include the insides of locked assets. Returns True, False, or None to cancel."""
    names = sorted(closed_assets)
    listed = "\n".join("  " + name for name in names[:10])
    if len(names) > 10:
        listed += f"\n  ... and {len(names) - 10} more"
    choice = hou.ui.displayMessage(
        "These locked assets are exported as closed nodes, without their insides:\n\n"
        + listed
        + "\n\nOnly include their insides for assets you made yourself. Purchased assets, studio tools "
        "and colleagues' assets can be under a license or an NDA.",
        buttons=("Export Closed (Recommended)", "Include Insides", "Cancel"),
        default_choice=0,
        close_choice=2,
        title="WOP Exporter",
    )
    if choice == 2:
        return None
    return choice == 1


def copy_selection_for_web(pane=None):
    """Dialog-free export for a hotkey: copies the selected nodes (or the whole network when nothing
    is selected) of the Network Editor under the mouse to the clipboard as compact JSON.

    Paste the result into the web playground with Ctrl+V. See `exporter/README.md` for binding it
    to a hotkey such as Ctrl+Shift+Alt+C.
    """
    editor = find_network_editor(pane)
    parent = editor.pwd() if editor else None
    if parent is None:
        hou.ui.setStatusMessage(
            "WOP: no Network Editor found to copy from.",
            severity=hou.severityType.Warning,
        )
        return

    # The hotkey never asks, so locked assets always stay closed
    doc, selected_only, state = build_document(parent, export_mode="compact")
    # Minified JSON keeps large networks quick to paste
    hou.ui.copyTextToClipboard(json.dumps(doc, separators=(",", ":")))
    node_count = len(doc["root"]["nodes"])
    scope = "selected" if selected_only else "all"
    notes = export_notes(state)
    hou.ui.setStatusMessage(
        f"Copied {node_count} {scope} node(s) from {parent.path()} for the web. Paste them with Ctrl+V."
        + (" " + notes if notes else ""),
        severity=hou.severityType.Warning if notes else hou.severityType.ImportantMessage,
    )


def run_interactive_export(pane=None):
    """Main entry point when clicked from a Houdini Shelf Button."""
    editor = find_network_editor(pane)
    parent = editor.pwd() if editor else hou.node("/obj")
    if parent is None:
        hou.ui.displayMessage("Could not find an active Houdini Network Editor.", severity=hou.severityType.Error)
        return

    choice = hou.ui.displayMessage(
        f"Export network '{parent.path()}' for WOP:\n\n"
        "Paths inside $HIP and $JOB keep their folders. Every other path keeps only its file name. "
        "Network box comments are exported exactly as written, and sticky notes apart from their paths: "
        "check both before sharing.",
        buttons=(
            "Copy to Clipboard (Compact Parms)",
            "Save .json File (Compact Parms)",
            "Save .json File (Full Parms)",
            "Cancel",
        ),
        default_choice=0,
        close_choice=3,
        title="WOP Exporter",
    )

    if choice == 3:
        return

    export_mode = "full" if choice == 2 else "compact"
    doc, _selected_only, state = build_document(parent, export_mode=export_mode)
    if state.closed_assets:
        include = ask_about_locked_assets(state.closed_assets)
        if include is None:
            return
        if include:
            doc, _selected_only, state = build_document(parent, export_mode=export_mode, include_locked_assets=True)
    root_net = doc["root"]
    json_str = json.dumps(doc, indent=2)
    notes = export_notes(state)
    severity = hou.severityType.Warning if notes else hou.severityType.ImportantMessage

    if choice == 0:
        hou.ui.copyTextToClipboard(json_str)
        hou.ui.setStatusMessage(
            f"Copied {len(root_net['nodes'])} nodes from {parent.path()} to clipboard!" + (" " + notes if notes else ""),
            severity=severity,
        )
    else:
        default_filename = f"{parent.name()}-network.json"
        file_path = hou.ui.selectFile(
            title="Save Houdini Network JSON",
            default_value=default_filename,
            pattern="*.json",
            chooser_mode=hou.fileChooserMode.Write,
        )
        if file_path:
            expanded_path = hou.expandString(file_path)
            if not expanded_path.lower().endswith(".json"):
                expanded_path += ".json"
                # The file chooser only asked about the name without `.json`
                if os.path.exists(expanded_path):
                    overwrite = hou.ui.displayMessage(
                        f"{os.path.basename(expanded_path)} already exists. Overwrite it?",
                        buttons=("Overwrite", "Cancel"),
                        default_choice=1,
                        close_choice=1,
                        title="WOP Exporter",
                    )
                    if overwrite != 0:
                        return
            with open(expanded_path, "w", encoding="utf-8") as f:
                f.write(json_str)
            hou.ui.setStatusMessage(
                f"Saved {len(root_net['nodes'])} nodes to {expanded_path}" + (" " + notes if notes else ""),
                severity=severity,
            )


# Run only when executed as a shelf tool (Houdini passes a `kwargs` dict to shelf scripts) or as a
# script, never when imported as a module (`import wop_exporter`).
if __name__ == "__main__" or "kwargs" in globals():
    run_interactive_export(globals().get("kwargs", {}).get("pane"))
