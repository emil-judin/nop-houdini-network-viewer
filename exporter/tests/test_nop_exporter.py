"""
Tests for the privacy-critical and pure parts of `exporter/nop_exporter.py`, without Houdini.

Run from the repository root (Python 3.9+, standard library only):

    python -m unittest discover -s exporter/tests -v

The scenarios follow `docs/features/exporter.feature`.
"""

import os
import sys
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.dirname(HERE))

import fake_hou  # noqa: E402

sys.modules["hou"] = fake_hou

import nop_exporter as nop  # noqa: E402

HOME = "C:/Users/jane"
HIP = "C:/Users/jane/proj/fan"
JOB = "C:/Users/jane/proj"
HFS = "C:/Program Files/Side Effects Software/Houdini 22.0.100"


def set_env(**values):
    fake_hou.ENV.clear()
    fake_hou.ENV.update(values)
    nop.scrub_path = nop.path_scrubber()


class PathScrubberTest(unittest.TestCase):
    """NOP-EXP: exported text is as safe to share as a screenshot."""

    def setUp(self):
        set_env(HIP=HIP, JOB=JOB, HFS=HFS, HOME=HOME)
        self.scrub = nop.path_scrubber()

    def check(self, cases):
        for text, expected in cases:
            with self.subTest(text=text):
                self.assertEqual(self.scrub(text), expected)

    def test_NOP_EXP_030_project_folders_become_variables(self):
        self.check([
            ("C:/Users/jane/proj/fan/geo/a.bgeo", "$HIP/geo/a.bgeo"),
            ("c:\\Users\\jane\\proj\\fan\\geo\\a.bgeo", "$HIP\\geo\\a.bgeo"),
            ("C:/Users/jane/proj/shared/tex/b.exr", "$JOB/shared/tex/b.exr"),
            (HFS + "/houdini/pic/a.pic", "$HFS/houdini/pic/a.pic"),
            ("$HIP/geo/a.bgeo", "$HIP/geo/a.bgeo"),
        ])

    def test_NOP_EXP_030_other_absolute_paths_keep_only_the_file_name(self):
        self.check([
            ("C:/Users/jane/Desktop/b.obj", "<path>/b.obj"),
            ("/home/bob/cache/c.vdb", "<path>/c.vdb"),
            ("D:/Projects/AcmeClient/a.exr", "<path>/a.exr"),
            ("D:/Projects/Acme Client/shot 010/a.exr", "<path>/a.exr"),
            ("D:/render/frame.$F4.exr", "<path>/frame.$F4.exr"),
            ("/mnt/proj/acme/out.$F4.bgeo.sc", "<path>/out.$F4.bgeo.sc"),
            ("/Volumes/Work/Acme/x.abc", "<path>/x.abc"),
            ("~/clients/acme/x.exr", "<path>/x.exr"),
            ("file:///C:/Users/jane/x.png", "file:///<path>/x.png"),
            ("D:/out/", "<path>/"),
            ("Path: D:/Clients/Acme/x.exr, and E:/y/z.exr", "Path: <path>/x.exr, and <path>/z.exr"),
        ])

    def test_NOP_EXP_034_server_shares_hide_server_and_share_names(self):
        self.check([
            ("\\\\studio-nas\\clients\\acme\\a.exr", "<path>/a.exr"),
            ("//studio-nas/clients/acme/a.exr", "<path>/a.exr"),
            ("\\\\studio-nas", "<path>"),
            ("\\\\studio-nas\\acme", "<path>"),
        ])

    def test_NOP_EXP_030_paths_inside_code_strings(self):
        self.check([
            ('string p = "C:\\\\Users\\\\jane\\\\Documents\\\\x.bgeo";', 'string p = "<path>/x.bgeo";'),
            ('s = "C:\\\\Users\\\\jane\\\\proj\\\\fan\\\\a.bgeo"', 's = "$HIP\\\\a.bgeo"'),
        ])

    def test_NOP_EXP_030_houdini_node_paths_urls_and_code_stay(self):
        self.check([
            ("/obj/geo1/OUT", "/obj/geo1/OUT"),
            ('ch("/obj/geo1/box1/tx")', 'ch("/obj/geo1/box1/tx")'),
            ("op:/obj/geo1/OUT", "op:/obj/geo1/OUT"),
            ("opdef:/emjud::Sop/circuit_gen::1.0?IconSVG", "opdef:/emjud::Sop/circuit_gen::1.0?IconSVG"),
            ("see https://site.com/users/x for details", "see https://site.com/users/x for details"),
            ("x = a / b / c;", "x = a / b / c;"),
            ("x = a/b/c;", "x = a/b/c;"),
            ("x = (a)/b/c;", "x = (a)/b/c;"),
            ("@P.y /= 2;", "@P.y /= 2;"),
            ("// comment about stuff", "// comment about stuff"),
            # Commented-out VEX without a space after the slashes is code, not a server share
            ("    //@Cd = set(1, 0, 0);", "    //@Cd = set(1, 0, 0);"),
            ("//if (point(0, \"connected\", pt) == 1) return;", "//if (point(0, \"connected\", pt) == 1) return;"),
            ('//setpointattrib(0, "Cd", pt, set(1, 0, 0));', '//setpointattrib(0, "Cd", pt, set(1, 0, 0));'),
            ('printf("%d\\n", i);', 'printf("%d\\n", i);'),
            ('s = "a\\\\nb"', 's = "a\\\\nb"'),
            ("/* block */", "/* block */"),
            ('sprintf("/%s/", name)', 'sprintf("/%s/", name)'),
            ("../tex/a.exr", "../tex/a.exr"),
            ("/tmp", "/tmp"),
        ])

    def test_NOP_EXP_030_non_strings_pass_through(self):
        for value in (None, "", 1, 2.5, True):
            with self.subTest(value=value):
                self.assertEqual(self.scrub(value), value)


class CleanSvgTest(unittest.TestCase):
    def setUp(self):
        set_env(HIP=HIP, HOME=HOME)

    def test_NOP_EXP_033_editor_metadata_is_removed(self):
        svg = (
            '<?xml version="1.0"?>\n<!-- Created with Inkscape by jane -->\n'
            '<svg xmlns="http://www.w3.org/2000/svg" sodipodi:docname="acme_logo.svg" '
            "inkscape:export-filename='C:\\Users\\jane\\clients\\acme\\logo.png' viewBox=\"0 0 24 24\">"
            "<metadata><rdf:RDF><dc:creator>Jane Doe</dc:creator></rdf:RDF></metadata>"
            '<sodipodi:namedview id="base" inkscape:zoom="2"/>'
            '<path d="M0 0h24v24H0z" fill="#ffaa00"/></svg>'
        )
        cleaned = nop.clean_svg(svg)
        for leaked in ("jane", "Jane", "acme", "sodipodi", "inkscape", "metadata"):
            with self.subTest(leaked=leaked):
                self.assertNotIn(leaked, cleaned)
        self.assertIn('<path d="M0 0h24v24H0z" fill="#ffaa00"/>', cleaned)
        self.assertIn('viewBox="0 0 24 24"', cleaned)


class _Node:
    """Minimal node for condition tests."""

    def __init__(self, values):
        self.parms = {name: fake_hou.Parm(name, value) for name, value in values.items()}

    def parm(self, name):
        return self.parms.get(name)

    def parmTuple(self, _name):
        return None


class ConditionTest(unittest.TestCase):
    def setUp(self):
        self.node = _Node({"a": 1, "b": "near", "c": 3.5})

    def test_NOP_EXP_018_rules(self):
        cases = [
            ("{ a == 1 }", True),
            ("{ a == 1 b != far }", True),
            ("{ a == 1 b != near }", False),
            ("{ a == 0 } { c > 2 }", True),
            ("{ a == 0 } { c > 4 }", False),
            ("{ b =~ ne* }", True),
            ("{ b !~ ne* }", False),
            ('{ b == "near" }', True),
            ("{ missing == 1 }", False),
            ("", False),
        ]
        for rule, expected in cases:
            with self.subTest(rule=rule):
                self.assertEqual(nop.evaluate_conditional(self.node, rule), expected)

    def test_NOP_EXP_018_each_parameter_is_evaluated_once(self):
        cache = {}
        for _ in range(5):
            nop.evaluate_conditional(self.node, "{ a == 1 } { a == 2 }", cache)
        self.assertEqual(self.node.parms["a"].eval_count, 2)  # one eval() and one evalAsString()


class KeyframeTest(unittest.TestCase):
    def test_NOP_EXP_020_segment_functions(self):
        for expr in ("bezier()", "linear()", "constant()", "spline()"):
            with self.subTest(expr=expr):
                self.assertTrue(nop.KEYFRAME_SEGMENT_FUNCTION.match(expr))
        for expr in ("ch('tx')", "$F", "bezier() * 2"):
            with self.subTest(expr=expr):
                self.assertFalse(nop.KEYFRAME_SEGMENT_FUNCTION.match(expr))

    def test_NOP_EXP_020_is_keyframed(self):
        self.assertTrue(nop.is_keyframed(fake_hou.Parm("tx", 1.0, keyframes=[1, 2]), "bezier()"))
        self.assertTrue(nop.is_keyframed(fake_hou.Parm("tx", 1.0, keyframes=[1]), "linear()"))
        self.assertFalse(nop.is_keyframed(fake_hou.Parm("tx", 1.0, keyframes=[1]), "$F * 2"))
        self.assertFalse(nop.is_keyframed(fake_hou.Parm("tx", 1.0), None))


def asset(name, library, locked, children=(), icon=None):
    node_type = fake_hou.NodeType(name, icon=icon, definition=fake_hou.HDADefinition(library))
    return fake_hou.Node(name.split("::")[-2] + "1", node_type, children=children, locked=locked)


def leaf(name, type_name="box"):
    return fake_hou.Node(name, fake_hou.NodeType(type_name))


class RecursionTest(unittest.TestCase):
    def setUp(self):
        set_env(HFS=HFS, HOME=HOME)

    def test_NOP_EXP_012_rules(self):
        purchased = asset("vendor::scatter_pro::2.0", HOME + "/Documents/houdini22.0/otls/scatter_pro.hda", True, [leaf("a")])
        own_unlocked = asset("emjud::circuit_gen::1.0", HOME + "/hda/circuit_gen.hda", False, [leaf("a")])
        labs_locked = asset("labs::thicken::1.0", HOME + "/SideFXLabs/otls/thicken.hda", True, [leaf("a")])
        builtin_unlocked = asset("sidefx::curve::2.0", HFS + "/houdini/otls/curve.hda", False, [leaf("a")])
        wrangle = fake_hou.Node("w", fake_hou.NodeType("attribwrangle"), children=[leaf("a")])
        compiled = fake_hou.Node("s", fake_hou.NodeType("solver"), children=[leaf("a")])
        subnet = fake_hou.Node("subnet1", fake_hou.NodeType("subnet"), children=[leaf("a")])
        empty_subnet = fake_hou.Node("subnet2", fake_hou.NodeType("subnet"))

        self.assertFalse(nop.should_recurse_subnet(purchased))
        self.assertTrue(nop.should_recurse_subnet(purchased, include_locked_assets=True))
        self.assertTrue(nop.is_locked_third_party_asset(purchased))
        self.assertTrue(nop.should_recurse_subnet(own_unlocked))
        self.assertFalse(nop.should_recurse_subnet(labs_locked, include_locked_assets=True))
        self.assertTrue(nop.should_recurse_subnet(builtin_unlocked))
        self.assertFalse(nop.should_recurse_subnet(wrangle))
        self.assertFalse(nop.should_recurse_subnet(compiled))
        self.assertTrue(nop.should_recurse_subnet(subnet))
        self.assertFalse(nop.should_recurse_subnet(empty_subnet))


class SerializeNetworkTest(unittest.TestCase):
    """A small network: a locked purchased asset, the user's unlocked asset, a box and a sticky note."""

    def setUp(self):
        set_env(HIP=HIP, HFS=HFS, HOME=HOME)
        icon_id = "opdef:/vendor::Sop/scatter_pro::2.0?IconSVG"
        fake_hou.ASSET_SECTIONS[icon_id] = '<svg sodipodi:docname="x.svg" viewBox="0 0 1 1"><path d="M0 0"/></svg>'
        self.purchased = asset(
            "vendor::scatter_pro::2.0", HOME + "/otls/scatter_pro.hda", True, [leaf("secret_inside")], icon=icon_id
        )
        self.own = asset("emjud::circuit_gen::1.0", HIP + "/hda/circuit_gen.hda", False, [leaf("mine_inside")])
        file_parm = fake_hou.ParmTuple("file", [fake_hou.Parm("file", "D:/Clients/Acme/tex/rock.exr", default="")])
        self.reader = fake_hou.Node("file1", fake_hou.NodeType("file"), parms=[file_parm])
        self.geo = fake_hou.Node("geo1", fake_hou.NodeType("geo"))
        for item in (
            self.purchased,
            self.own,
            self.reader,
            fake_hou.NetworkBox("__netbox1", comment="Acme shot010"),
            fake_hou.StickyNote("__stickynote1", text="Cache in D:/Clients/Acme/cache/a.bgeo"),
        ):
            self.geo.add(item)

    def nodes_by_name(self, network):
        return {n["name"]: n for n in network["nodes"]}

    def test_NOP_EXP_013_locked_assets_stay_closed_but_keep_their_icon(self):
        state = nop.ExportState()
        out = nop.serialize_network(self.geo, state)
        nodes = self.nodes_by_name(out)
        self.assertFalse(nodes["scatter_pro1"]["isSubnetwork"])
        self.assertNotIn("children", nodes["scatter_pro1"])
        self.assertEqual(nodes["scatter_pro1"]["hdaState"], "locked")
        self.assertEqual(state.closed_assets, {"vendor::scatter_pro::2.0"})
        # Owner decision: the icon of a locked asset is still exported, cleaned of editor metadata
        icon = state.extractor.icons["opdef:/vendor::Sop/scatter_pro::2.0?IconSVG"]
        self.assertNotIn("sodipodi", icon)
        self.assertTrue(nodes["circuit_gen1"]["isSubnetwork"])
        self.assertEqual([n["name"] for n in nodes["circuit_gen1"]["children"]["nodes"]], ["mine_inside"])

    def test_NOP_EXP_013_locked_assets_open_when_the_user_confirms(self):
        state = nop.ExportState(include_locked_assets=True)
        nodes = self.nodes_by_name(nop.serialize_network(self.geo, state))
        self.assertEqual([n["name"] for n in nodes["scatter_pro1"]["children"]["nodes"]], ["secret_inside"])
        self.assertEqual(state.closed_assets, set())

    def test_NOP_EXP_031_and_032_text_fields(self):
        out = nop.serialize_network(self.geo, nop.ExportState())
        nodes = self.nodes_by_name(out)
        self.assertEqual(nodes["file1"]["parms"][0]["val"], ["<path>/rock.exr"])
        self.assertEqual(out["stickies"][0]["text"], "Cache in <path>/a.bgeo")
        # Owner decision: network box comments are exported as the user wrote them
        self.assertEqual(out["boxes"][0]["comment"], "Acme shot010")

    def test_NOP_EXP_023_unreadable_parameters_are_counted(self):
        class Broken(fake_hou.ParmTuple):
            def parmTemplate(self):
                raise fake_hou.OperationFailed("broken")

        self.reader._parm_tuples.append(Broken("bad", [fake_hou.Parm("bad", 1.0)]))
        state = nop.ExportState()
        nop.serialize_network(self.geo, state)
        self.assertEqual(state.warnings, 1)
        self.assertIn("1 parameter(s) could not be read", nop.export_notes(state))


RAMP_DEFAULT = "1pos ( 0 ) 1value ( 1 ) 1interp ( catmull-rom ) 2pos ( 1 ) 2value ( 1 ) 2interp ( catmull-rom )"


def ramp_node(values=(1.0, 1.0), basis=("CatmullRom", "CatmullRom")):
    """A PolyExtrude-like node: a float ramp at its default point count, its point parameters and a Float.

    The point parameters' own defaults (0, linear) are not the ramp default, like in Houdini.
    """
    template = fake_hou.ParmTemplate(
        "thicknessramp", fake_hou.parmTemplateType.Ramp, label="Thickness Ramp", tags={"rampfloatdefault": RAMP_DEFAULT}
    )
    ramp = fake_hou.Ramp((0.0, 1.0), values, [fake_hou.rampBasis[b] for b in basis])
    ramp_parm = fake_hou.Parm("thicknessramp", 2, template=template, default=2, ramp=ramp)
    parms = [fake_hou.ParmTuple("thicknessramp", [ramp_parm], label="Thickness Ramp")]
    for index, (pos, value) in enumerate(zip((0.0, 1.0), values), start=1):
        for suffix, current, default in (("pos", pos, 0.0), ("value", value, 0.0), ("interp", "catmull-rom", "linear")):
            name = "thicknessramp%d%s" % (index, suffix)
            point = fake_hou.Parm(name, current, default=default, multiparm_parent=ramp_parm)
            parms.append(fake_hou.ParmTuple(name, [point]))
    parms.append(fake_hou.ParmTuple("twistscale", [fake_hou.Parm("twistscale", 90.0, default=180.0)]))
    geo = fake_hou.Node("geo1", fake_hou.NodeType("geo"))
    geo.add(fake_hou.Node("polyextrude1", fake_hou.NodeType("polyextrude::2.0"), parms=parms))
    return geo


def exported_parms(geo, export_mode):
    out = nop.serialize_network(geo, nop.ExportState(export_mode=export_mode))
    return {p["name"]: p for p in out["nodes"][0]["parms"]}


class RampTest(unittest.TestCase):
    """NOP-EXP-024 and NOP-EXP-025."""

    def setUp(self):
        set_env(HIP=HIP, HFS=HFS, HOME=HOME)

    def test_NOP_EXP_024_ramp_points_are_not_parameters_of_their_own(self):
        parms = exported_parms(ramp_node(), "full")
        self.assertEqual(sorted(parms), ["thicknessramp", "twistscale"])
        self.assertEqual(parms["thicknessramp"]["ramp"]["keys"], [0.0, 1.0])

    def test_NOP_EXP_025_default_ramp_is_left_out_in_compact_mode(self):
        self.assertEqual(sorted(exported_parms(ramp_node(), "compact")), ["twistscale"])
        self.assertNotIn("changed", exported_parms(ramp_node(), "full")["thicknessramp"])

    def test_NOP_EXP_025_ramp_with_changed_points_counts_as_changed(self):
        for values, basis in (((1.0, 0.0), ("CatmullRom", "CatmullRom")), ((1.0, 1.0), ("Linear", "Linear"))):
            with self.subTest(values=values, basis=basis):
                parms = exported_parms(ramp_node(values, basis), "compact")
                self.assertEqual(parms["thicknessramp"]["changed"], [True])

    def test_NOP_EXP_025_default_tag_parsing(self):
        template = fake_hou.ParmTemplate(
            "colors", fake_hou.parmTemplateType.Ramp, tags={"rampcolordefault": "1pos ( 0 ) 1c ( 0 0 0 ) 1interp ( linear ) 2pos ( 1 ) 2c ( 1 1 1 ) 2interp ( linear )"}
        )
        self.assertEqual(nop.default_ramp_points(template), [(0.0, [0.0, 0.0, 0.0], "linear"), (1.0, [1.0, 1.0, 1.0], "linear")])
        self.assertIsNone(nop.default_ramp_points(fake_hou.ParmTemplate("plain", fake_hou.parmTemplateType.Ramp)))


if __name__ == "__main__":
    unittest.main()
