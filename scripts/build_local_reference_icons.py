"""
Build the local-only Houdini reference icon file for the Icon Review Gallery.

The gallery shows each original icon drawing next to the matching SideFX icon so drawings can be
compared 1:1. SideFX icons are proprietary (Labs icons are BSD-licensed but still third-party), so
the output is written to the gitignored `local-refs/` folder and served only by the Vite dev
server. It is never committed, bundled or published.

What it does:
  1. Scans `src/components/nodes/icons/**` for `refKey: '...'` values used by the icon registry.
  2. Resolves `SOP_*` keys through `$HFS/houdini/config/IconMapping` aliases and `icons.zip`.
  3. Resolves `labs::<type>` keys from the SideFX Labs HDA library: embedded `IconSVG`,
     embedded `IconImage` (.pic, converted with Houdini's `iconvert`), icons shared with another
     Labs type, Labs `config/Icons/*.svg`, or built-in Houdini icons.
  4. Optionally writes the Labs node catalog TypeScript file (`--write-labs-catalog`).

Usage (Windows example):
  python scripts/build_local_reference_icons.py ^
    --hfs "C:/Program Files/Side Effects Software/Houdini 22.0.466" ^
    --labs "C:/Program Files/Side Effects Software/sidefx_packages/SideFXLabs21.0"

No `hou` module is needed: HDA files are read directly (INDX archive format).
"""

import argparse
import base64
import glob
import json
import os
import re
import struct
import subprocess
import tempfile
import urllib.parse
import zipfile

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_OUT = os.path.join(REPO_ROOT, "local-refs", "houdini_ref_icons.json")
ICON_SRC = os.path.join(REPO_ROOT, "src", "components", "nodes", "icons")
LABS_CATALOG_TS = os.path.join(ICON_SRC, "labs", "labsNodeCatalog.ts")


# ---------------------------------------------------------------------------
# INDX archives (.hda / .otl): big-endian index of [name_len][name][offset][size][mtime]
# ---------------------------------------------------------------------------

def read_indx(buf, base=0):
    """Returns ([(name, offset, size)], data_start) for the INDX archive starting at `base`."""
    if buf[base:base + 4] != b"INDX":
        raise ValueError("Not an INDX archive section")
    count = struct.unpack(">I", buf[base + 12:base + 16])[0]
    pos = base + 16
    entries = []
    for _ in range(count):
        (name_len,) = struct.unpack(">I", buf[pos:pos + 4])
        pos += 4
        name = buf[pos:pos + name_len].rstrip(b"\0").decode("latin-1")
        pos += name_len
        offset, size, _mtime = struct.unpack(">III", buf[pos:pos + 12])
        pos += 12
        entries.append((name, offset, size))
    return entries, pos


def svg_data_uri(svg_text):
    return "data:image/svg+xml;utf8," + urllib.parse.quote(svg_text)


def version_key(version):
    return tuple(int(x) if x.isdigit() else 0 for x in version.split(".")) if version else (0,)


# ---------------------------------------------------------------------------
# Built-in Houdini icons
# ---------------------------------------------------------------------------

class BuiltinIcons:
    """Looks up built-in icons by name (e.g. `SOP_sort`) with IconMapping alias resolution."""

    def __init__(self, hfs):
        icons_dir = os.path.join(hfs, "houdini", "config", "Icons")
        self.zip = zipfile.ZipFile(os.path.join(icons_dir, "icons.zip"))
        self.names = set(self.zip.namelist())
        self.aliases = {}
        mapping = os.path.join(hfs, "houdini", "config", "IconMapping")
        if os.path.exists(mapping):
            for line in open(mapping, encoding="utf-8", errors="replace"):
                if ":=" in line:
                    left, _, right = line.partition(":=")
                    self.aliases[left.strip()] = right.strip().rstrip(";").strip()

    def svg(self, icon_name):
        seen = set()
        name = icon_name
        while name in self.aliases and name not in seen:
            seen.add(name)
            name = self.aliases[name]
        candidates = [name, re.sub(r"-\d+(\.\d+)*$", "", name)]
        for candidate in candidates:
            if "_" not in candidate:
                continue
            context, _, rest = candidate.partition("_")
            path = f"{context}/{rest}.svg"
            if path in self.names:
                return self.zip.read(path).decode("utf-8", "replace")
        return None


# ---------------------------------------------------------------------------
# SideFX Labs library
# ---------------------------------------------------------------------------

def read_labs_definitions(labs_dir):
    """Returns ({base: record}, {type_with_version: icon_path}) for every Labs SOP (newest version)."""
    records, icon_paths = {}, {}
    for hda_path in sorted(glob.glob(os.path.join(labs_dir, "otls", "*.hda"))):
        buf = open(hda_path, "rb").read()
        entries, data_start = read_indx(buf)

        # INDEX_SECTION holds `oplib:/labs::Sop/<type>?...` followed by a length-prefixed icon path
        index_entry = next((e for e in entries if e[0] == "INDEX_SECTION"), None)
        if index_entry:
            index = buf[data_start + index_entry[1]:data_start + index_entry[1] + index_entry[2]]
            pos = 0
            marker = b"oplib:/labs::Sop/"
            while True:
                pos = index.find(marker, pos)
                if pos < 0:
                    break
                end = index.find(b"\0", pos)
                type_full = index[pos:end].decode("latin-1").split("?", 1)[0][len("oplib:/labs::Sop/"):]
                q = end
                for _ in range(8):
                    (n,) = struct.unpack(">I", index[q:q + 4])
                    if 0 < n < 300:
                        icon_paths[type_full] = index[q + 4:q + 4 + n].decode("latin-1").rstrip("\0")
                        break
                    q += 1
                pos = end

        for name, offset, _size in entries:
            if not name.startswith("labs::Sop/"):
                continue
            base, _, version = name[len("labs::Sop/"):].partition("::")
            sub, sub_start = read_indx(buf, data_start + offset)
            sections = {s[0]: buf[sub_start + s[1]:sub_start + s[1] + s[2]] for s in sub}
            dialog = sections.get("DialogScript", b"").decode("utf-8", "replace")
            label_match = re.search(r'^\s*label\s+"([^"]*)"', dialog, re.M)
            shelf = sections.get("Tools.shelf", b"").decode("utf-8", "replace")
            submenu_match = re.search(r"<toolSubmenu>([^<]*)</toolSubmenu>", shelf)
            record = {
                "base": base,
                "version": version,
                "type": f"labs::{base}" + (f"::{version}" if version else ""),
                "label": label_match.group(1) if label_match else base,
                "submenu": (submenu_match.group(1) if submenu_match else "").replace("&amp;", "&"),
                "svg": sections.get("IconSVG", b"").decode("utf-8", "replace"),
                "image": sections.get("IconImage", b""),
            }
            previous = records.get(base)
            if previous is None or version_key(version) > version_key(previous["version"]):
                records[base] = record
    return records, icon_paths


def labs_icon_uri(record, records, icon_paths, labs_dir, builtin, iconvert):
    """Resolves one Labs type's reference icon to a data URI (or None)."""
    if "<svg" in record["svg"]:
        return svg_data_uri(record["svg"])
    if record["image"] and iconvert:
        with tempfile.TemporaryDirectory() as tmp:
            pic, png = os.path.join(tmp, "icon.pic"), os.path.join(tmp, "icon.png")
            open(pic, "wb").write(record["image"])
            subprocess.run([iconvert, pic, png], capture_output=True, check=False)
            if os.path.exists(png):
                return "data:image/png;base64," + base64.b64encode(open(png, "rb").read()).decode("ascii")
    type_full = record["base"] + (f"::{record['version']}" if record["version"] else "")
    icon = icon_paths.get(type_full, "")
    if icon.startswith("opdef:/labs::Sop/"):
        other = icon[len("opdef:/labs::Sop/"):].split("?", 1)[0].split("::", 1)[0]
        if other in records and "<svg" in records[other]["svg"]:
            return svg_data_uri(records[other]["svg"])
    if icon.lower().endswith(".svg"):
        local = os.path.join(labs_dir, "config", "Icons", os.path.basename(icon.replace("\\", "/")))
        if os.path.exists(local):
            return svg_data_uri(open(local, encoding="utf-8", errors="replace").read())
    svg = builtin.svg(icon) if icon else None
    return svg_data_uri(svg) if svg else None


def write_labs_catalog(records):
    """Writes the committed Labs node catalog (names and Tab-menu submenus only, no artwork)."""
    rows = sorted(records.values(), key=lambda r: r["label"].lower())
    lines = [
        "/**",
        " * Every SideFX Labs SOP node type known to the icon registry (names and Tab-menu submenus only).",
        " *",
        " * Generated by `scripts/build_local_reference_icons.py --write-labs-catalog`. Do not edit by hand.",
        " */",
        "export interface LabsNodeCatalogEntry {",
        "  /** Full operator type name (e.g. `labs::thicken::1.1`). */",
        "  type: string;",
        "  /** Tab-menu label (e.g. `Labs Thicken`). */",
        "  label: string;",
        "  /** Tab-menu submenu (e.g. `Labs/Geometry/Mesh: Convert`). */",
        "  submenu: string;",
        "}",
        "",
        "/**",
        " * SideFX Labs SOP catalog (newest version of each type).",
        " */",
        "export const LABS_NODE_CATALOG: LabsNodeCatalogEntry[] = [",
    ]
    for r in rows:
        lines.append(
            "  { type: %s, label: %s, submenu: %s },"
            % (json.dumps(r["type"]).replace('"', "'"), json.dumps(r["label"]).replace('"', "'"), json.dumps(r["submenu"]).replace('"', "'"))
        )
    lines += ["];", ""]
    open(LABS_CATALOG_TS, "w", encoding="utf-8", newline="\n").write("\n".join(lines))
    print(f"wrote {LABS_CATALOG_TS} ({len(rows)} Labs types)")


# ---------------------------------------------------------------------------

def collect_ref_keys():
    keys = set()
    for path in glob.glob(os.path.join(ICON_SRC, "**", "*.tsx"), recursive=True):
        keys.update(re.findall(r"refKey:\s*'([^']+)'", open(path, encoding="utf-8").read()))
    return sorted(keys)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--hfs", required=True, help="Houdini install folder ($HFS)")
    parser.add_argument("--labs", help="SideFX Labs package folder (contains otls/)")
    parser.add_argument("--out", default=DEFAULT_OUT, help="Output JSON (default: local-refs/houdini_ref_icons.json)")
    parser.add_argument("--write-labs-catalog", action="store_true", help="Also regenerate labsNodeCatalog.ts")
    args = parser.parse_args()

    builtin = BuiltinIcons(args.hfs)
    iconvert = os.path.join(args.hfs, "bin", "iconvert.exe" if os.name == "nt" else "iconvert")
    iconvert = iconvert if os.path.exists(iconvert) else None

    records, icon_paths = ({}, {})
    if args.labs:
        records, icon_paths = read_labs_definitions(args.labs)
        if args.write_labs_catalog:
            write_labs_catalog(records)

    refs, missing = {}, []
    for key in collect_ref_keys():
        uri = None
        if key.startswith("labs::"):
            record = records.get(key[len("labs::"):])
            if record:
                uri = labs_icon_uri(record, records, icon_paths, args.labs, builtin, iconvert)
        else:
            svg = builtin.svg(key)
            uri = svg_data_uri(svg) if svg else None
        if uri:
            refs[key] = uri
        else:
            missing.append(key)

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    json.dump(refs, open(args.out, "w", encoding="utf-8"))
    print(f"wrote {args.out}: {len(refs)} reference icons")
    if missing:
        print("no reference found for:", ", ".join(missing))


if __name__ == "__main__":
    main()
