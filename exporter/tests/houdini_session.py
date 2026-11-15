"""
Exporter tests in a real Houdini session (hython), next to the fake `hou` tests of this folder.

The fake `hou` only knows what the tests tell it; these tests ask Houdini itself: real node types,
connectors, flags, assets, network items and parameters. Run them with `npm run test:exporter:houdini`
(it finds hython, then checks the exports against the JSON Schema and the viewer's normalizer), or
directly: `hython exporter/tests/houdini_session.py`.

The file name does not start with `test`, so `npm run test:exporter` (plain Python) never picks it up.
With `NOP_HOUDINI_EXPORT_DIR` set, every export is also written there as `<name>.json`.
"""

import json
import os
import shutil
import sys
import tempfile
import time
import unittest

import hou

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import nop_exporter as nop  # noqa: E402

EXPORT_DIR = os.environ.get("NOP_HOUDINI_EXPORT_DIR")
HOME = os.path.expanduser("~").replace("\\", "/")


def save_export(name, document):
    """Writes `document` for the JSON Schema and normalizer check of the npm script."""
    if EXPORT_DIR:
        with open(os.path.join(EXPORT_DIR, f"{name}.json"), "w", encoding="utf8") as handle:
            json.dump(document, handle)


def export(net, name, export_mode="compact", include_locked_assets=False):
    """Exports `net` like the shelf tool, checks it is valid JSON and saves it under `name`."""
    document, selected_only, state = nop.build_document(net, export_mode=export_mode, include_locked_assets=include_locked_assets)
    text = json.dumps(document)
    save_export(name, json.loads(text))
    return document, selected_only, state


def by_name(items, name):
    return next(item for item in items if item["name"] == name)


class HoudiniSession(unittest.TestCase):
    def setUp(self):
        hou.hipFile.clear(suppress_save_prompt=True)
        hou.clearAllSelected()
        self.geo = hou.node("/obj").createNode("geo", "nop_test")

    def build_sample(self):
        """A small SOP network with every kind of network item the viewer draws."""
        geo = self.geo
        box = geo.createNode("box", "box1")
        lift = geo.createNode("xform", "lift_tube")
        lift.setInput(0, box)
        plain = geo.createNode("xform")  # keeps Houdini's own name, transform1
        plain.setInput(0, lift)
        wrangle = geo.createNode("attribwrangle", "tag_points")
        wrangle.parm("snippet").set("@Cd = {1, 0, 0};")
        wrangle.setInput(0, plain)
        group = geo.createNode("groupcreate")  # keeps Houdini's own name, group1
        group.setInput(0, wrangle)
        dot = geo.createNetworkDot()
        dot.setInput(0, group)
        merge = geo.createNode("merge", "merge1")
        merge.setInput(0, dot)
        merge.setInput(1, box)
        out = geo.createNode("null", "OUT")
        out.setInput(0, merge)
        out.setDisplayFlag(True)
        out.setRenderFlag(True)
        out.setComment(f"Cache in {HOME}/secret_project/cache.bgeo")
        out.setGenericFlag(hou.nodeFlag.DisplayComment, True)
        rop = geo.createNode("rop_geometry", "save_geo")
        rop.setInput(0, out)
        rop.parm("sopoutput").set(f"{HOME}/secret_project/out.bgeo.sc")

        subnet = geo.createNode("subnet", "details")
        subnet.setInput(0, out)
        inner = subnet.createNode("null", "inner_null")
        inner.setInput(0, subnet.indirectInputs()[0])

        frame = geo.createNetworkBox()
        frame.setComment("LIFT")
        frame.addItem(box)
        frame.addItem(lift)
        frame.fitAroundContents()
        note = geo.createStickyNote()
        note.setText(f"Notes in {HOME}/secret_project/notes.txt")
        geo.layoutChildren()
        return {"dot": dot, "box": frame, "note": note}

    def test_NOP_EXP_022_and_023_a_real_network_exports_every_item_and_the_header(self):
        items = self.build_sample()
        document, selected_only, state = export(self.geo, "sample-compact")
        root = document["root"]

        self.assertFalse(selected_only)
        self.assertEqual(document["schemaVersion"], nop.SCHEMA_VERSION)
        self.assertEqual(document["houdiniVersion"], hou.applicationVersionString())
        self.assertNotIn("exportWarnings", document)
        self.assertEqual(root["path"], "/obj/nop_test")
        self.assertEqual([n["name"] for n in root["pathNodes"]], ["obj", "nop_test"])

        names = {n["name"] for n in root["nodes"]}
        self.assertEqual(names, {"box1", "lift_tube", "transform1", "tag_points", "group1", "merge1", "OUT", "save_geo", "details"})
        self.assertEqual([d["name"] for d in root["dots"]], [items["dot"].name()])
        self.assertEqual(by_name(root["boxes"], items["box"].name())["comment"], "LIFT")
        self.assertEqual(sorted(by_name(root["boxes"], items["box"].name())["items"]), ["box1", "lift_tube"])
        self.assertEqual([s["name"] for s in root["stickies"]], [items["note"].name()])

        # Wires: every connection, through the dot, with the input index Houdini reports
        wires = {(w["from"], w["to"], w["toInput"]) for w in root["wires"]}
        self.assertIn((items["dot"].name(), "merge1", 0), wires)
        self.assertIn(("group1", items["dot"].name(), 0), wires)
        self.assertIn(("box1", "merge1", 1), wires)

        # Node fields as Houdini reports them
        for node_obj in root["nodes"]:
            houdini_node = self.geo.node(node_obj["name"])
            self.assertEqual(node_obj["type"], houdini_node.type().name())
            self.assertEqual(node_obj["inputLabels"], list(houdini_node.inputLabels()))
            self.assertEqual(node_obj["maxOutputs"], len(houdini_node.outputLabels()))
        self.assertEqual(by_name(root["nodes"], "transform1")["type"], "xform")
        self.assertEqual(by_name(root["nodes"], "group1")["type"], "groupcreate")
        self.assertTrue(by_name(root["nodes"], "OUT")["flags"]["display"])
        self.assertTrue(by_name(root["nodes"], "OUT")["showComment"])

    def test_NOP_NODE_023_rop_geometry_has_no_output(self):
        self.build_sample()
        document, _selected, _state = export(self.geo, "rop")
        rop = by_name(document["root"]["nodes"], "save_geo")
        self.assertEqual(rop["maxOutputs"], 0)
        self.assertEqual(rop["outputLabels"], [])

    def test_NOP_EXP_022_max_outputs_is_what_the_node_shows(self):
        # Houdini reports 11 output connectors for every SOP subnet; only the outputs in use are exported
        plain = self.geo.createNode("subnet", "plain_subnet")
        used = self.geo.createNode("subnet", "three_outputs")
        used.createNode("output", "output0")
        used.createNode("output", "output2").parm("outputidx").set(2)
        self.geo.createNode("split", "split1")
        self.assertEqual(len(plain.outputConnectors()), 11)
        document, _selected, _state = export(self.geo, "outputs")
        nodes = document["root"]["nodes"]
        self.assertEqual(by_name(nodes, "plain_subnet")["maxOutputs"], 1)
        self.assertEqual(by_name(nodes, "three_outputs")["maxOutputs"], 3)
        self.assertEqual(by_name(nodes, "split1")["maxOutputs"], 2)
        self.assertEqual(by_name(nodes, "split1")["outputLabels"], ["Selected Geometry", "Non-Selected Geometry"])

    def test_NOP_NODE_008_wrangles_are_locked_assets_and_box_is_none(self):
        self.build_sample()
        document, _selected, _state = export(self.geo, "padlocks")
        nodes = document["root"]["nodes"]
        self.assertEqual(by_name(nodes, "tag_points")["hdaState"], "locked")
        self.assertIsNone(by_name(nodes, "box1")["hdaState"])
        # Built-in assets are never opened, even when they have insides
        self.assertFalse(by_name(nodes, "tag_points")["isSubnetwork"])

    def test_NOP_EXP_031_private_paths_are_scrubbed(self):
        self.build_sample()
        for mode in ("compact", "full"):
            document, _selected, _state = export(self.geo, f"scrubbed-{mode}", export_mode=mode)
            text = json.dumps(document)
            # Absolute paths outside the project keep only their file name
            self.assertNotIn(HOME, text, mode)
            self.assertNotIn(os.path.basename(HOME), text, mode)
            self.assertNotIn("secret_project", text, mode)
        root = document["root"]
        self.assertIn("<path>/out.bgeo.sc", json.dumps(by_name(root["nodes"], "save_geo")["parms"]))
        self.assertEqual(by_name(root["nodes"], "OUT")["comment"], "Cache in <path>/cache.bgeo")
        self.assertEqual(root["stickies"][0]["text"], "Notes in <path>/notes.txt")

    def test_NOP_EXP_012_the_subnetwork_is_exported_with_its_input(self):
        self.build_sample()
        document, _selected, _state = export(self.geo, "subnet")
        details = by_name(document["root"]["nodes"], "details")
        self.assertTrue(details["isSubnetwork"])
        children = details["children"]
        self.assertEqual([n["name"] for n in children["nodes"]], ["inner_null"])
        self.assertEqual(children["subnetInputs"][0]["inputName"], "OUT")
        self.assertIn({"from": children["subnetInputs"][0]["name"], "fromOutput": 0, "to": "inner_null", "toInput": 0}, children["wires"])

    def test_NOP_EXP_010_only_the_selection_is_exported(self):
        self.build_sample()
        self.geo.node("box1").setSelected(True)
        self.geo.node("lift_tube").setSelected(True)
        document, selected_only, _state = export(self.geo, "selection")
        self.assertTrue(selected_only)
        root = document["root"]
        self.assertEqual(sorted(n["name"] for n in root["nodes"]), ["box1", "lift_tube"])
        self.assertEqual(root["wires"], [{"from": "box1", "fromOutput": 0, "to": "lift_tube", "toInput": 0}])

    def test_NOP_EXP_013_user_assets_locked_and_unlocked(self):
        hda_dir = tempfile.mkdtemp(prefix="nop_hda_")
        hda_file = os.path.join(hda_dir, "nop_test_pebble.hda").replace("\\", "/")
        try:
            source = self.geo.createNode("subnet", "pebble_src")
            source.createNode("sphere", "pebble_shape")
            asset = source.createDigitalAsset(
                name="nop_test::pebble::1.0",
                hda_file_name=hda_file,
                description="Pebble",
                min_num_inputs=0,
                max_num_inputs=1,
            )
            asset.matchCurrentDefinition()
            unlocked = self.geo.createNode("nop_test::pebble::1.0", "pebble_editing")
            unlocked.allowEditingOfContents()

            document, _selected, state = export(self.geo, "assets")
            nodes = document["root"]["nodes"]
            locked_obj = by_name(nodes, asset.name())
            unlocked_obj = by_name(nodes, "pebble_editing")
            self.assertEqual(locked_obj["hdaState"], "locked")
            self.assertFalse(locked_obj["isSubnetwork"])
            self.assertIn("nop_test::pebble::1.0", state.closed_assets)
            self.assertEqual(unlocked_obj["hdaState"], "unlocked")
            self.assertTrue(unlocked_obj["isSubnetwork"])
            self.assertEqual([n["name"] for n in unlocked_obj["children"]["nodes"]], ["pebble_shape"])
            self.assertNotIn(hda_dir.replace("\\", "/"), json.dumps(document).replace("\\\\", "/"))

            # Confirming the user made the asset opens the locked one too
            document, _selected, state = export(self.geo, "assets-included", include_locked_assets=True)
            self.assertTrue(by_name(document["root"]["nodes"], asset.name())["isSubnetwork"])
            self.assertEqual(state.closed_assets, set())
        finally:
            hou.hipFile.clear(suppress_save_prompt=True)
            try:
                hou.hda.uninstallFile(hda_file)
            except Exception:  # noqa: BLE001 (already uninstalled)
                pass
            shutil.rmtree(hda_dir, ignore_errors=True)

    def test_NOP_EXP_016_every_sop_type_exports_in_full_mode_without_unreadable_parameters(self):
        """Full mode reads every visible parameter: a Houdini update that breaks one shows here."""
        started = time.time()
        failed_to_create = []
        for name, node_type in sorted(hou.sopNodeTypeCategory().nodeTypes().items()):
            if node_type.hidden() or node_type.deprecated():
                continue
            try:
                self.geo.createNode(name)
            except Exception:  # noqa: BLE001
                failed_to_create.append(name)
        document, _selected, state = export(self.geo, "every-sop-type", export_mode="full")
        print(
            f"\n  {len(document['root']['nodes'])} SOP types exported in full mode in {time.time() - started:.0f} s "
            f"({len(failed_to_create)} could not be created on their own)",
            file=sys.stderr,
        )
        self.assertEqual(state.warnings, 0, "parameters that could not be read")
        self.assertNotIn("exportWarnings", document)


if __name__ == "__main__":
    result = unittest.main(exit=False, verbosity=2).result
    sys.exit(0 if result.wasSuccessful() else 1)
