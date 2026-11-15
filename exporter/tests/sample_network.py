"""
Shared builders for the exporter integration tests, and one sample network with every kind of item and a
private path in every text field.

Run it to print the sample's export as JSON (Python 3.9+, standard library only):

    python exporter/tests/sample_network.py

The viewer tests check that output against the JSON Schema and draw it (NOP-EXP-050, NOP-EXP-051).
"""

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)
if os.path.dirname(HERE) not in sys.path:
    sys.path.insert(0, os.path.dirname(HERE))

import fake_hou  # noqa: E402

sys.modules["hou"] = fake_hou

import nop_exporter as nop  # noqa: E402

HOME = "C:/Users/jane"
HIP = "C:/Users/jane/proj/fan"
JOB = "C:/Users/jane/proj"
PREF = "C:/Users/jane/Documents/houdini22.0"
HFS = "C:/Program Files/Side Effects Software/Houdini 22.0.100"

USER_ICON = "opdef:/me::Sop/circuit_gen::1.0?IconSVG"
VENDOR_ICON = "opdef:/vendor::Sop/scatter_pro::2.0?IconSVG"
LABS_ICON = "opdef:/labs::Sop/thicken::1.0?IconSVG"

# Saved by Inkscape: editor attributes and metadata name the author, the client and a home folder
INKSCAPE_SVG = (
    '<svg xmlns="http://www.w3.org/2000/svg" sodipodi:docname="circuit.svg" '
    'inkscape:export-filename="C:\\Users\\jane\\icons\\circuit.png" viewBox="0 0 24 24">'
    "<metadata>Jane Doe for Acme</metadata>"
    '<path d="M2 2h20v20H2z" fill="#3fa9f5"/></svg>'
)
PLAIN_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e0a030"/></svg>'

# Text that must never reach an export, apart from network box comments (exported as written)
PRIVATE_WORDS = ("jane", "Jane", "Acme", "acme", "studio-nas", "Clients", "Desktop", "secret_inside", "labs_inside")


def reset(**env):
    """Clears the fake Houdini, sets the environment variables and rebuilds the path scrubber."""
    fake_hou.reset()
    fake_hou.ENV.update(env)
    nop.scrub_path = nop.path_scrubber()


def default_env():
    reset(HIP=HIP, JOB=JOB, HFS=HFS, HOME=HOME, HOUDINI_USER_PREF_DIR=PREF)


def node(name, type_name="box", **kwargs):
    return fake_hou.Node(name, fake_hou.NodeType(type_name), **kwargs)


def asset(name, type_name, library, locked, icon=None, **kwargs):
    node_type = fake_hou.NodeType(type_name, icon=icon, definition=fake_hou.HDADefinition(library))
    return fake_hou.Node(name, node_type, locked=locked, **kwargs)


def parm(name, value, default=None, **kwargs):
    """A one-component parameter tuple."""
    return fake_hou.ParmTuple(name, [fake_hou.Parm(name, value, default=default, **kwargs)])


def network(*items, name="geo1", type_name="geo", **kwargs):
    """`/obj/<name>` holding `items`; `/obj` is registered for `hou.node("/obj")`."""
    obj = node("obj", "obj")
    fake_hou.NODES["/obj"] = obj
    net = obj.add(node(name, type_name, **kwargs))
    for item in items:
        net.add(item)
    return net


def build_sample():
    """Resets the fake Houdini and builds `/obj/geo1`, which holds every kind of item. Returns `geo1`."""
    default_env()
    fake_hou.ASSET_SECTIONS[USER_ICON] = INKSCAPE_SVG
    fake_hou.ASSET_SECTIONS[VENDOR_ICON] = PLAIN_SVG
    fake_hou.ASSET_SECTIONS[LABS_ICON] = PLAIN_SVG

    box = node("box1", flags={"display": True, "render": True}, parms=[parm("scale", 2.0, default=1.0)])
    menu = fake_hou.ParmTemplate(
        "lut", fake_hou.parmTemplateType.Menu, menu_items=("none", "grade"), menu_labels=("None", "D:/Clients/Acme/grade.cube")
    )
    reader = node(
        "file1",
        "file",
        pos=(0.0, -1.5),
        comment="From \\\\studio-nas\\acme\\shot010\\plate.exr",
        show_comment=True,
        parms=[
            parm("file", "D:/Clients/Acme/tex/rock.exr", default=""),
            parm("cache", HIP + "/cache/a.bgeo", default="", expression='chs("D:/Clients/Acme/cache/a.bgeo")'),
            parm("lut", "grade", default="none", template=menu),
        ],
    )
    code = 'string p = "C:\\\\Users\\\\jane\\\\Documents\\\\x.bgeo";'
    wrangle = node("wrangle1", "attribwrangle", pos=(0.0, -3.0), parms=[parm("snippet", code, default=code)])

    inner = node("inner_box")
    own = asset(
        "circuit_gen1",
        "me::circuit_gen::1.0",
        HIP + "/hda/circuit_gen.hda",
        False,
        icon=USER_ICON,
        children=[inner],
        indirect_inputs=1,
        pos=(0.0, -4.5),
    )
    fake_hou.connect(own.indirectInputs()[0], inner)
    purchased = asset(
        "scatter_pro1",
        "vendor::scatter_pro::2.0",
        PREF + "/otls/scatter_pro.hda",
        True,
        icon=VENDOR_ICON,
        children=[node("secret_inside")],
        pos=(0.0, -6.0),
    )
    labs = asset(
        "thicken1",
        "labs::thicken::1.0",
        HOME + "/SideFXLabs/otls/thicken.hda",
        True,
        icon=LABS_ICON,
        children=[node("labs_inside")],
        pos=(3.0, -6.0),
    )
    dot = fake_hou.NetworkDot("dot1", pinned=True, pos=(0.5, -0.8))

    fake_hou.connect(box, dot)
    fake_hou.connect(dot, reader)
    fake_hou.connect(reader, wrangle)
    fake_hou.connect(wrangle, own)
    fake_hou.connect(own, purchased)
    fake_hou.connect(purchased, labs)

    return network(
        box,
        reader,
        wrangle,
        own,
        purchased,
        labs,
        dot,
        fake_hou.NetworkBox("__netbox1", comment="Acme shot010", items=[box, dot], pos=(-1.0, -1.0), size=(3.0, 2.0)),
        fake_hou.StickyNote(
            "__stickynote1", text="Cache in D:/Clients/Acme/cache/a.bgeo, notes in ~/clients/acme/x.txt", pos=(4.0, 0.0), size=(3.0, 1.0)
        ),
    )


def sample_document(export_mode="compact"):
    """The export of the sample network (`build_document()` with nothing selected)."""
    document, _selected_only, _state = nop.build_document(build_sample(), export_mode=export_mode)
    return document


if __name__ == "__main__":
    sys.stdout.write(json.dumps(sample_document()))
