"""
Integration tests for what an export contains: `build_document()` with the real serializer, path scrubber,
recursion rules and icon extractor, on networks built with the fake `hou` (`fake_hou.py`).

Run from the repository root: `python -m unittest discover -s exporter/tests`. The scenarios follow
`docs/features/exporter.feature`.
"""

import datetime
import json
import os
import tempfile
import unittest

from sample_network import (
    HFS,
    HIP,
    HOME,
    LABS_ICON,
    PLAIN_SVG,
    PRIVATE_WORDS,
    USER_ICON,
    asset,
    default_env,
    network,
    node,
    nop,
    parm,
    reset,
    sample_document,
)
import fake_hou

Type = fake_hou.parmTemplateType


def export(net, export_mode="compact"):
    document, _selected_only, _state = nop.build_document(net, export_mode=export_mode)
    return document


def by_name(items):
    return {item["name"]: item for item in items}


def parms_of(document, node_name="node1"):
    return by_name(by_name(document["root"]["nodes"])[node_name]["parms"])


def subnet_with_inputs(name="subnet1"):
    """A subnet with one input wired to `p`, and `p` -> `q` inside."""
    inner_p, inner_q = node("p"), node("q")
    subnet = node(name, "subnet", indirect_inputs=1, children=[inner_p, inner_q])
    fake_hou.connect(subnet.indirectInputs()[0], inner_p)
    fake_hou.connect(inner_p, inner_q)
    return subnet


class SelectionTest(unittest.TestCase):
    def setUp(self):
        default_env()

    def test_NOP_EXP_010_the_selection_is_limited_to_the_exported_network(self):
        a, b, c = node("a"), node("b"), node("c")
        fake_hou.connect(a, b)
        fake_hou.connect(b, c)
        geo1 = network(a, b, c)
        geo2 = fake_hou.NODES["/obj"].add(node("geo2", "geo", children=[node("x")]))
        fake_hou.SELECTION.extend([a, b, geo2.children()[0]])
        document, selected_only, _state = nop.build_document(geo1)
        self.assertTrue(selected_only)
        self.assertEqual([n["name"] for n in document["root"]["nodes"]], ["a", "b"])
        self.assertEqual(document["root"]["wires"], [{"from": "a", "fromOutput": 0, "to": "b", "toInput": 0}])

    def test_NOP_EXP_052_wires_to_items_outside_the_selection_keep_the_far_end_position_and_type_not_its_name(self):
        grid, box = node("grid1", "grid", pos=(-2.0, 3.0)), node("box1", "box", pos=(4.0, 1.5))
        noise, copy = node("noise1"), node("copy1", "copytopoints")
        merge, xfer, out = node("merge1", "merge", pos=(-1.0, -2.0)), node("xfer1", "copytopoints", pos=(1.0, -2.0)), node("OUT")
        dot = fake_hou.NetworkDot("dot1", pos=(3.123456, -1.5))
        fake_hou.connect(grid, noise)
        fake_hou.connect(box, copy, input_index=0)
        fake_hou.connect(noise, copy, input_index=1)
        fake_hou.connect(copy, merge)
        fake_hou.connect(copy, xfer, input_index=1)
        fake_hou.connect(copy, dot)
        fake_hou.connect(dot, out)
        geo = network(grid, box, noise, copy, merge, xfer, out, dot)
        fake_hou.SELECTION.extend([noise, copy])
        root = export(geo)["root"]
        self.assertEqual(root["wires"], [{"from": "noise1", "fromOutput": 0, "to": "copy1", "toInput": 1}])
        self.assertEqual(
            root["outsideWires"],
            [
                {"to": "noise1", "toInput": 0, "pos": [-2.0, 3.0], "type": "grid"},
                {"to": "copy1", "toInput": 0, "pos": [4.0, 1.5], "type": "box"},
                # One entry per wire, so an output feeding 3 items outside shows 3 leads; wires leaving
                # the selection keep the input they enter (the second input of a Copy to Points is dotted)
                {"from": "copy1", "fromOutput": 0, "pos": [-1.0, -2.0], "type": "merge", "input": 0},
                {"from": "copy1", "fromOutput": 0, "pos": [1.0, -2.0], "type": "copytopoints", "input": 1},
                {"from": "copy1", "fromOutput": 0, "pos": [3.1235, -1.5], "dot": True, "input": 0},
            ],
        )
        text = json.dumps(root["outsideWires"])
        for name in ("grid1", "box1", "merge1", "xfer1", "dot1", "OUT"):
            self.assertNotIn(name, text)

    def test_NOP_EXP_052_a_whole_network_export_has_no_outside_wires(self):
        a, b = node("a"), node("b")
        fake_hou.connect(a, b)
        self.assertNotIn("outsideWires", export(network(a, b))["root"])

    def test_NOP_EXP_010_wires_from_subnet_inputs_are_kept(self):
        subnet = network(subnet_with_inputs()).children()[0]
        fake_hou.SELECTION.append(subnet.children()[0])
        root = export(subnet)["root"]
        self.assertEqual([n["name"] for n in root["nodes"]], ["p"])
        self.assertEqual(root["wires"], [{"from": "1", "fromOutput": 0, "to": "p", "toInput": 0}])

    def test_NOP_EXP_011_nothing_selected_exports_the_whole_network(self):
        dot = fake_hou.NetworkDot("dot1")
        geo = network(
            node("a"),
            node("b"),
            dot,
            fake_hou.NetworkBox("__netbox1"),
            fake_hou.StickyNote("__stickynote1", text="note"),
        )
        other = fake_hou.NODES["/obj"].add(node("geo2", "geo", children=[node("x")]))
        fake_hou.SELECTION.append(other.children()[0])
        document, selected_only, _state = nop.build_document(geo)
        root = document["root"]
        self.assertFalse(selected_only)
        self.assertEqual(
            ([n["name"] for n in root["nodes"]], len(root["dots"]), len(root["boxes"]), len(root["stickies"])),
            (["a", "b"], 1, 1, 1),
        )

    def test_NOP_EXP_026_an_expanded_subnetwork_keeps_all_its_items_in_a_selection(self):
        subnet = subnet_with_inputs()
        geo = network(subnet, node("other"))
        fake_hou.SELECTION.append(subnet)
        root = export(geo)["root"]
        self.assertEqual([n["name"] for n in root["nodes"]], ["subnet1"])
        children = root["nodes"][0]["children"]
        self.assertEqual([n["name"] for n in children["nodes"]], ["p", "q"])
        self.assertIn({"from": "p", "fromOutput": 0, "to": "q", "toInput": 0}, children["wires"])


class IconTest(unittest.TestCase):
    def setUp(self):
        default_env()

    def test_NOP_EXP_014_built_in_sidefx_and_labs_icons_are_never_embedded(self):
        fake_hou.ASSET_SECTIONS[LABS_ICON] = PLAIN_SVG
        labs_locked = asset("thicken1", "labs::thicken::1.0", HOME + "/SideFXLabs/otls/thicken.hda", True, icon=LABS_ICON)
        labs_unlocked = asset("thicken2", "labs::thicken::1.0", HOME + "/SideFXLabs/otls/thicken.hda", False, icon=LABS_ICON)
        document = export(network(node("box1"), labs_locked, labs_unlocked))
        self.assertEqual(document["icons"], {})
        self.assertEqual([n["icon"] for n in document["root"]["nodes"]], ["SOP_box", LABS_ICON, LABS_ICON])

    def test_NOP_EXP_015_a_user_assets_svg_icon_is_embedded_once(self):
        fake_hou.ASSET_SECTIONS[USER_ICON] = PLAIN_SVG
        tools = [asset("tool%d" % i, "me::circuit_gen::1.0", HIP + "/hda/circuit_gen.hda", False, icon=USER_ICON) for i in range(3)]
        document = export(network(*tools))
        self.assertEqual(document["icons"], {USER_ICON: PLAIN_SVG})
        self.assertEqual({n["icon"] for n in document["root"]["nodes"]}, {USER_ICON})

    def test_NOP_EXP_035_svg_icon_files_on_disk(self):
        with tempfile.TemporaryDirectory() as folder:
            folder = folder.replace("\\", "/")
            hip, hfs = folder + "/proj", folder + "/hfs"
            reset(HIP=hip, HFS=hfs)
            own_icon = hip + "/icons/tool.svg"
            sidefx_icon = hfs + "/houdini/config/Icons/SOP_box.svg"
            for path in (own_icon, sidefx_icon):
                os.makedirs(os.path.dirname(path))
                with open(path, "w", encoding="utf-8") as f:
                    f.write(PLAIN_SVG)
            own = asset("tool1", "me::tool::1.0", hip + "/hda/tool.hda", False, icon=own_icon)
            borrowed = asset("tool2", "me::other::1.0", hip + "/hda/other.hda", False, icon=sidefx_icon)
            document = export(network(own, borrowed))
        self.assertEqual(document["icons"], {"$HIP/icons/tool.svg": PLAIN_SVG})
        self.assertEqual(
            [n["icon"] for n in document["root"]["nodes"]], ["$HIP/icons/tool.svg", "$HFS/houdini/config/Icons/SOP_box.svg"]
        )


def visible_parms():
    """3 changed, 20 default, a default `snippet`, a hidden parameter and a button."""
    parms = [parm("changed%d" % i, float(i + 1), default=0.0) for i in range(3)]
    parms += [parm("default%02d" % i, 0.0, default=0.0) for i in range(20)]
    parms.append(parm("snippet", "@P.y += 1;", default="@P.y += 1;"))
    hidden = fake_hou.ParmTemplate("secret", Type.Float, hidden=True)
    parms.append(parm("secret", 5.0, default=0.0, template=hidden))
    button = fake_hou.ParmTemplate("reload", Type.Button)
    parms.append(parm("reload", 0, default=1, template=button))
    return parms


class ParameterTest(unittest.TestCase):
    def setUp(self):
        default_env()

    def test_NOP_EXP_016_compact_and_full_parameter_modes(self):
        net = network(node("node1", parms=visible_parms()))
        compact = list(parms_of(export(net, "compact")))
        full = list(parms_of(export(net, "full")))
        self.assertEqual(compact, ["changed0", "changed1", "changed2", "snippet"])
        self.assertEqual(full, ["changed0", "changed1", "changed2"] + ["default%02d" % i for i in range(20)] + ["snippet"])

    def test_NOP_EXP_017_parameters_hidden_by_a_hide_when_rule_are_left_out(self):
        tol = fake_hou.ParmTemplate("tol", Type.Float, hide_when="{ usetol == 0 }")
        net = network(node("node1", parms=[parm("usetol", 0, default=1), parm("tol", 0.5, default=0.1, template=tol)]))
        self.assertEqual(list(parms_of(export(net, "full"))), ["usetol"])

    def test_NOP_EXP_029_code_parameters_are_exported_even_when_a_rule_hides_them(self):
        snippet = fake_hou.ParmTemplate("snippet", Type.String, hide_when="{ mode == 1 }")
        net = network(node("node1", parms=[parm("mode", 1, default=1), parm("snippet", "@Cd = 1;", default="", template=snippet)]))
        for mode in ("compact", "full"):
            with self.subTest(mode=mode):
                self.assertIn("snippet", parms_of(export(net, mode)))

    def test_NOP_EXP_019_parameter_tuple_fields(self):
        t = fake_hou.ParmTemplate("t", Type.Float, label="Translate", num_components=3)
        placement = fake_hou.ParmTemplate("placement", Type.Folder, label="Placement", folder_type=fake_hou.folderType.Simple, children=[t])
        transform = fake_hou.ParmTemplate("transform", Type.Folder, label="Transform", children=[placement])
        tuple_t = fake_hou.ParmTuple(
            "t",
            [
                fake_hou.Parm("tx", 1.5, expression="bezier()", keyframes=[1, 24], default=0.0, template=t),
                fake_hou.Parm("ty", 0.0, default=0.0, template=t),
                fake_hou.Parm("tz", 0.1, expression="$F/10", default=0.0, template=t),
            ],
            label="Translate",
        )
        net = network(node("node1", parms=[tuple_t], template_group=[transform]))
        exported = parms_of(export(net))["t"]
        self.assertEqual(
            exported,
            {
                "name": "t",
                "label": "Translate",
                "type": "Float",
                "val": [1.5, 0.0, 0.1],
                "expr": [None, None, "$F/10"],
                "changed": [True, False, True],
                "folders": ["Transform", "Placement"],
                "folderTypes": ["tabs", "simple"],
                "keyframed": [True, False, False],
            },
        )

    def test_NOP_EXP_021_menus_ramps_and_ranges(self):
        menu = fake_hou.ParmTemplate("type", Type.Menu, menu_items=("point", "primitive"), menu_labels=("Points", "Primitives"))
        own_menu = fake_hou.Parm(
            "class", "primitive", default="point", template=menu, menu_items=("point", "primitive"), menu_labels=("Point", "Primitive (own)")
        )
        ordinal = fake_hou.ParmTemplate("method", Type.Menu, menu_items=("fast", "exact"), menu_labels=("Fast", "Exact"))
        ramp_template = fake_hou.ParmTemplate("colorramp", Type.Ramp)
        color_ramp = fake_hou.Ramp(
            (0.0, 0.5, 1.0),
            ((1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0)),
            (fake_hou.rampBasis.Linear, fake_hou.rampBasis.CatmullRom, fake_hou.rampBasis.Constant),
        )
        iterations = fake_hou.ParmTemplate("iterations", Type.Int, value_range=(0, 10))
        net = network(
            node(
                "node1",
                parms=[
                    parm("type", "primitive", default="point", template=menu),
                    fake_hou.ParmTuple("class", [own_menu]),
                    parm("method", 1, default=0, template=ordinal),
                    parm("colorramp", 3, default=2, template=ramp_template, ramp=color_ramp),
                    parm("iterations", 4, default=1, template=iterations),
                ],
            )
        )
        exported = parms_of(export(net))
        self.assertEqual(exported["type"]["menuLabel"], "Primitives")
        self.assertEqual(exported["class"]["menuLabel"], "Primitive (own)")
        self.assertEqual(exported["method"]["menuLabel"], "Exact")
        self.assertEqual(
            exported["colorramp"]["ramp"],
            {
                "color": True,
                "keys": [0.0, 0.5, 1.0],
                "values": [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]],
                "basis": ["Linear", "CatmullRom", "Constant"],
            },
        )
        self.assertEqual(exported["iterations"]["range"], [0, 10])

    def test_NOP_EXP_028_layout_hints(self):
        templates = {
            "mode": fake_hou.ParmTemplate("mode", Type.Int),
            "radius": fake_hou.ParmTemplate("radius", Type.Float, disable_when="{ mode == 1 }"),
            "detail": fake_hou.ParmTemplate("detail", Type.Float),
            "seed": fake_hou.ParmTemplate("seed", Type.Int),
            "sizex": fake_hou.ParmTemplate("sizex", Type.Float, join_next=True),
            "sizey": fake_hou.ParmTemplate("sizey", Type.Float),
            "enable": fake_hou.ParmTemplate("enable", Type.Toggle, label_hidden=True),
            "group": fake_hou.ParmTemplate("group", Type.String, menu_items=("a", "b")),
            "attrib": fake_hou.ParmTemplate("attrib", Type.String, item_generator="kwargs['node'].geometry()"),
            "pt#": fake_hou.ParmTemplate("pt#", Type.Float),
        }
        advanced = fake_hou.ParmTemplate("advanced", Type.Folder, label="Advanced", hide_when="{ mode == 1 }", children=[templates["detail"]])
        locked = fake_hou.ParmTemplate("locked", Type.Folder, label="Locked", disable_when="{ mode == 1 }", children=[templates["seed"]])
        points = fake_hou.ParmTemplate(
            "points", Type.Folder, label="Points", folder_type=fake_hou.folderType.MultiparmBlock, children=[templates["pt#"]]
        )
        group = [templates[name] for name in ("mode", "radius", "sizex", "sizey", "enable", "group", "attrib")]
        group += [advanced, locked, points]

        def own(name, value, default):
            return parm(name, value, default=default, template=templates.get(name))

        parms = [
            own("mode", 1, 0),
            own("radius", 2.0, 1.0),
            own("detail", 3.0, 1.0),
            own("seed", 7, 0),
            own("sizex", 1.0, 0.0),
            own("sizey", 1.0, 0.0),
            own("enable", True, False),
            own("group", "a", ""),
            own("attrib", "Cd", ""),
            parm("pt1", 0.5, default=0.0),
            parm("pt2", 0.7, default=0.0),
        ]
        exported = parms_of(export(network(node("node1", parms=parms, template_group=group)), "full"))
        self.assertNotIn("detail", exported)
        self.assertTrue(exported["radius"]["disabled"])
        self.assertTrue(exported["seed"]["disabled"])
        self.assertEqual(exported["seed"]["folders"], ["Locked"])
        self.assertNotIn("disabled", exported["mode"])
        self.assertEqual(exported["sizex"]["joinNext"], "sizey")
        self.assertNotIn("joinNext", exported["sizey"])
        self.assertTrue(exported["enable"]["labelHidden"])
        self.assertTrue(exported["group"]["hasMenu"])
        self.assertTrue(exported["attrib"]["hasMenu"])
        for name in ("pt1", "pt2"):
            with self.subTest(name=name):
                self.assertEqual((exported[name]["folders"], exported[name]["folderTypes"]), (["Points"], ["multiparm"]))


NODE_FIELDS = {
    "name", "type", "label", "icon", "pos", "size", "color", "shape", "flags", "maxInputs", "inputLabels",
    "maxOutputs", "outputLabels", "comment", "showComment", "isSubnetwork", "hdaState", "parms",
}  # fmt: skip


class FieldsTest(unittest.TestCase):
    def setUp(self):
        default_env()

    def test_NOP_EXP_022_max_outputs_counts_the_outputs_the_node_shows(self):
        # Houdini reports 11 output connectors for every SOP subnet, but lists only the outputs in use
        plain = node("plain_subnet", "subnet", output_connectors=11)
        used = node("three_outputs", "subnet", output_connectors=11, output_labels=("Output 1", "Output 2", "Output 3"))
        rop = node("save_geo", "rop_geometry", output_labels=())
        split = node("split1", "split", output_labels=("Selected Geometry", "Non-Selected Geometry"))
        nodes = by_name(export(network(plain, used, rop, split))["root"]["nodes"])
        self.assertEqual(
            {name: (nodes[name]["maxOutputs"], len(nodes[name]["outputLabels"])) for name in nodes},
            {"plain_subnet": (1, 1), "three_outputs": (3, 3), "save_geo": (0, 0), "split1": (2, 2)},
        )

    def test_NOP_EXP_022_node_dot_box_sticky_note_subnet_input_and_wire_fields(self):
        source = node(
            "source",
            pos=(1.234567, -2.000049),
            color=(0.12345, 0.5, 1.0),
            comment="main",
            show_comment=True,
            flags={"bypass": True, "display": True, "render": True, "template": True, "selectable_template": True, "lock": True, "soft_lock": True},
        )
        dot = fake_hou.NetworkDot("dot1", pinned=True, pos=(1.0, -3.0))
        subnet = subnet_with_inputs()
        fake_hou.connect(source, dot)
        fake_hou.connect(dot, subnet, 0, 0)
        box = fake_hou.NetworkBox("__netbox1", comment="Inputs", items=[source, dot], minimized=True, color=(0.2, 0.3, 0.4))
        sticky = fake_hou.StickyNote("__stickynote1", text="Read me", text_color=(1, 1, 1), draw_background=False)
        root = export(network(source, dot, subnet, box, sticky))["root"]
        nodes = by_name(root["nodes"])

        self.assertEqual(set(nodes["source"]), NODE_FIELDS)
        self.assertEqual(set(nodes["subnet1"]), NODE_FIELDS | {"children"})
        self.assertEqual((nodes["source"]["pos"], nodes["source"]["color"]), ([1.2346, -2.0], [0.123, 0.5, 1.0]))
        self.assertEqual((nodes["source"]["comment"], nodes["source"]["showComment"]), ("main", True))
        self.assertEqual((nodes["source"]["maxOutputs"], nodes["source"]["outputLabels"]), (1, ["Output 1"]))
        self.assertEqual(
            nodes["source"]["flags"],
            {"bypass": True, "display": True, "render": True, "template": True, "selectableTemplate": True, "lock": True, "softLock": True},
        )
        self.assertEqual(root["dots"], [{"name": "dot1", "pos": [1.0, -3.0], "pinned": True}])
        self.assertEqual(
            root["boxes"],
            [
                {
                    "name": "__netbox1",
                    "comment": "Inputs",
                    "pos": [0.0, 0.0],
                    "size": [1.0, 0.3],
                    "color": [0.2, 0.3, 0.4],
                    "minimized": True,
                    "items": ["source", "dot1"],
                }
            ],
        )
        self.assertEqual(
            root["stickies"],
            [
                {
                    "name": "__stickynote1",
                    "text": "Read me",
                    "pos": [0.0, 0.0],
                    "size": [1.0, 0.3],
                    "color": [0.8, 0.8, 0.8],
                    "minimized": False,
                    "textColor": [1, 1, 1],
                    "drawBackground": False,
                }
            ],
        )
        self.assertEqual(
            root["wires"],
            [
                {"from": "source", "fromOutput": 0, "to": "dot1", "toInput": 0},
                {"from": "dot1", "fromOutput": 0, "to": "subnet1", "toInput": 0},
            ],
        )
        self.assertEqual(root["subnetInputs"], [])
        self.assertEqual(nodes["subnet1"]["children"]["subnetInputs"], [{"name": "1", "num": 0, "pos": [0.0, 3.0], "inputName": "dot1"}])

    def test_NOP_EXP_023_document_header(self):
        fake_hou.ASSET_SECTIONS[USER_ICON] = PLAIN_SVG
        tool = asset("tool1", "me::circuit_gen::1.0", HIP + "/hda/circuit_gen.hda", False, icon=USER_ICON, children=[node("inner")])
        network(tool)
        document = export(tool)
        self.assertEqual(
            set(document), {"schemaVersion", "houdiniVersion", "exportedAt", "exportMode", "icons", "customShapes", "root"}
        )
        self.assertEqual((document["schemaVersion"], document["houdiniVersion"]), ("1.5.0", "22.0.100"))
        exported_at = datetime.datetime.fromisoformat(document["exportedAt"])
        self.assertEqual(exported_at.utcoffset(), datetime.timedelta(0))
        self.assertIsInstance(document["customShapes"], dict)
        self.assertEqual(
            document["root"]["pathNodes"],
            [
                {"name": "obj", "type": "obj", "icon": "SOP_obj"},
                {"name": "geo1", "type": "geo", "icon": "SOP_geo"},
                {"name": "tool1", "type": "me::circuit_gen::1.0", "icon": USER_ICON},
            ],
        )
        # The asset is only on the path, not in the exported items, and its icon still reaches the web
        self.assertEqual(document["icons"], {USER_ICON: PLAIN_SVG})

    def test_NOP_EXP_023_wire_style_and_export_warnings(self):
        class Broken(fake_hou.ParmTuple):
            def parmTemplate(self):
                raise fake_hou.OperationFailed("broken")

        rounded = network(node("a", parms=[Broken("bad", [fake_hou.Parm("bad", 1.0)])]), wire_style="rounded")
        document = export(rounded)
        self.assertEqual((document["root"]["wireStyle"], document["exportWarnings"]), ("rounded", 1))
        plain = export(network(node("a")))
        self.assertEqual(plain["root"]["wireStyle"], "default")
        self.assertNotIn("exportWarnings", plain)


class PrivacyTest(unittest.TestCase):
    def test_NOP_EXP_031_every_exported_text_field_is_scrubbed(self):
        document = sample_document("full")
        nodes = by_name(document["root"]["nodes"])
        reader = by_name(nodes["file1"]["parms"])
        self.assertEqual(reader["file"]["val"], ["<path>/rock.exr"])
        self.assertEqual((reader["cache"]["val"], reader["cache"]["expr"]), (["$HIP/cache/a.bgeo"], ['chs("<path>/a.bgeo")']))
        self.assertEqual(reader["lut"]["menuLabel"], "<path>/grade.cube")
        self.assertEqual(nodes["file1"]["comment"], "From <path>/plate.exr")
        self.assertEqual(by_name(nodes["wrangle1"]["parms"])["snippet"]["val"], ['string p = "<path>/x.bgeo";'])
        self.assertEqual(document["root"]["stickies"][0]["text"], "Cache in <path>/a.bgeo, notes in <path>/x.txt")
        self.assertEqual(document["root"]["boxes"][0]["comment"], "Acme shot010")

        document["root"]["boxes"][0]["comment"] = ""
        text = json.dumps(document)
        for word in PRIVATE_WORDS:
            with self.subTest(word=word):
                self.assertNotIn(word, text)

    def test_NOP_EXP_032_network_box_comments_are_exported_as_written(self):
        self.assertEqual(sample_document()["root"]["boxes"][0]["comment"], "Acme shot010")

    def test_NOP_EXP_036_the_scrubber_follows_the_current_project(self):
        reset(HIP="C:/Users/jane/projA", HFS=HFS)
        net = network(node("node1", parms=[parm("file", "C:/Users/jane/projB/geo/a.bgeo", default="")]))
        first = parms_of(export(net))["file"]["val"]
        fake_hou.ENV["HIP"] = "C:/Users/jane/projB"
        second = parms_of(export(net))["file"]["val"]
        self.assertEqual((first, second), (["<path>/a.bgeo"], ["$HIP/geo/a.bgeo"]))


if __name__ == "__main__":
    unittest.main()
