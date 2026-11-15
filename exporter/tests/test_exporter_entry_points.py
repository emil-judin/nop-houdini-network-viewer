"""
Integration tests for the two shelf tools, "Export for NOP" (`run_interactive_export`) and "Copy for NOP"
(`copy_selection_for_web`): dialogs, clipboard, status bar and saved files, with the real exporter and a
fake `hou` (`fake_hou.py`, whose dialogs fail when a test did not expect them).

Run from the repository root: `python -m unittest discover -s exporter/tests`. The scenarios follow
`docs/features/exporter.feature`.
"""

import importlib
import json
import os
import tempfile
import unittest

from sample_network import PREF, asset, default_env, network, node, nop, parm
import fake_hou

ui = fake_hou.ui

CLIPBOARD, SAVE_COMPACT, SAVE_FULL, CANCEL = range(4)
EXPORT_CLOSED, INCLUDE_INSIDES, CANCEL_LOCKED = range(3)
OVERWRITE, KEEP = range(2)


def three_boxes(name="geo1"):
    """`/obj/<name>` with box1 -> box2 -> box3; box2 has one changed and one default parameter."""
    box1 = node("box1")
    box2 = node("box2", parms=[parm("scale", 2.0, default=1.0), parm("divs", 3, default=3)])
    box3 = node("box3")
    fake_hou.connect(box1, box2)
    fake_hou.connect(box2, box3)
    return network(box1, box2, box3, name=name)


def vendor_asset(type_name="vendor::scatter_pro::2.0", name="scatter_pro1"):
    return asset(name, type_name, PREF + "/otls/scatter_pro.hda", True, children=[node("secret_inside")])


class EntryPointTest(unittest.TestCase):
    def setUp(self):
        default_env()
        folder = tempfile.TemporaryDirectory()
        self.addCleanup(folder.cleanup)
        self.folder = folder.name

    def tearDown(self):
        self.assertEqual(ui.answers, [], "a dialog the test expected was not shown")

    def show(self, net):
        ui.panes = [fake_hou.NetworkEditor(net)]
        return net

    def clipboard_document(self):
        return json.loads(ui.clipboard)


class InteractiveExportTest(EntryPointTest):
    def test_NOP_EXP_001_importing_the_module_never_starts_an_export(self):
        importlib.reload(nop)
        self.assertEqual((ui.messages, ui.statuses, ui.clipboard, ui.file_choosers), ([], [], None, []))

    def test_NOP_EXP_002_copy_to_clipboard_writes_indented_compact_json(self):
        self.show(three_boxes())
        ui.answers = [CLIPBOARD]
        nop.run_interactive_export()
        self.assertIn('\n  "schemaVersion"', ui.clipboard)
        document = self.clipboard_document()
        self.assertEqual(document["exportMode"], "compact")
        self.assertEqual([n["name"] for n in document["root"]["nodes"]], ["box1", "box2", "box3"])
        self.assertEqual([p["name"] for p in document["root"]["nodes"][1]["parms"]], ["scale"])
        self.assertEqual(ui.statuses, [("Copied 3 nodes from /obj/geo1 to clipboard!", fake_hou.severityType.ImportantMessage)])
        self.assertEqual(ui.messages[0][2], "NOP Exporter")

    def test_NOP_EXP_002_save_compact_suggests_the_network_name(self):
        self.show(three_boxes())
        ui.answers = [SAVE_COMPACT]
        ui.selected_file = os.path.join(self.folder, "geo1-network.json")
        nop.run_interactive_export()
        self.assertEqual(
            ui.file_choosers,
            [{"title": "Save Houdini Network JSON", "default_value": "geo1-network.json", "pattern": "*.json", "chooser_mode": fake_hou.fileChooserMode.Write}],
        )
        with open(ui.selected_file, encoding="utf-8") as f:
            document = json.load(f)
        self.assertEqual(document["exportMode"], "compact")
        self.assertIsNone(ui.clipboard)
        self.assertEqual(ui.statuses, [("Saved 3 nodes to " + ui.selected_file, fake_hou.severityType.ImportantMessage)])

    def test_NOP_EXP_002_save_full_exports_every_visible_parameter(self):
        self.show(three_boxes())
        ui.answers = [SAVE_FULL]
        ui.selected_file = os.path.join(self.folder, "geo1-network.json")
        nop.run_interactive_export()
        with open(ui.selected_file, encoding="utf-8") as f:
            document = json.load(f)
        self.assertEqual(document["exportMode"], "full")
        self.assertEqual([p["name"] for p in document["root"]["nodes"][1]["parms"]], ["scale", "divs"])

    def test_NOP_EXP_002_cancel_does_nothing(self):
        self.show(three_boxes())
        ui.answers = [CANCEL]
        nop.run_interactive_export()
        self.assertEqual((ui.statuses, ui.clipboard, ui.file_choosers, os.listdir(self.folder)), ([], None, [], []))

    def test_NOP_EXP_003_a_file_name_without_json_gets_the_extension(self):
        self.show(three_boxes())
        ui.answers = [SAVE_COMPACT]
        ui.selected_file = os.path.join(self.folder, "mynet")
        nop.run_interactive_export()
        self.assertEqual(os.listdir(self.folder), ["mynet.json"])

    def test_NOP_EXP_004_existing_files_are_not_overwritten_silently(self):
        self.show(three_boxes())
        target = os.path.join(self.folder, "mynet.json")
        with open(target, "w", encoding="utf-8") as f:
            f.write("old")
        ui.selected_file = os.path.join(self.folder, "mynet")

        ui.answers = [SAVE_COMPACT, KEEP]
        nop.run_interactive_export()
        self.assertEqual(ui.messages[1][:2], ("mynet.json already exists. Overwrite it?", ("Overwrite", "Cancel")))
        with open(target, encoding="utf-8") as f:
            self.assertEqual(f.read(), "old")
        self.assertEqual(ui.statuses, [])

        ui.answers = [SAVE_COMPACT, OVERWRITE]
        nop.run_interactive_export()
        with open(target, encoding="utf-8") as f:
            self.assertEqual(json.load(f)["exportMode"], "compact")

    def test_NOP_EXP_007_without_a_network_editor_obj_is_exported(self):
        three_boxes()
        ui.answers = [CLIPBOARD]
        nop.run_interactive_export()
        root = self.clipboard_document()["root"]
        self.assertEqual(root["path"], "/obj")
        self.assertEqual([n["name"] for n in root["nodes"]], ["geo1"])

    def test_NOP_EXP_032_the_dialog_reminds_to_check_box_comments_and_sticky_notes(self):
        self.show(three_boxes())
        ui.answers = [CANCEL]
        nop.run_interactive_export()
        text, buttons, _title = ui.messages[0]
        self.assertIn("Network box comments are exported exactly as written, and sticky notes apart from their paths", text)
        self.assertEqual(
            buttons,
            ("Copy to Clipboard (Compact Parms)", "Save .json File (Compact Parms)", "Save .json File (Full Parms)", "Cancel"),
        )


class LockedAssetDialogTest(EntryPointTest):
    def test_NOP_EXP_013_export_closed_keeps_the_insides_out(self):
        self.show(network(vendor_asset()))
        ui.answers = [CLIPBOARD, EXPORT_CLOSED]
        nop.run_interactive_export()
        text, buttons, _title = ui.messages[1]
        self.assertIn("  vendor::scatter_pro::2.0", text)
        self.assertEqual(buttons, ("Export Closed (Recommended)", "Include Insides", "Cancel"))
        scatter = self.clipboard_document()["root"]["nodes"][0]
        self.assertNotIn("children", scatter)
        self.assertEqual((scatter["isSubnetwork"], scatter["hdaState"]), (False, "locked"))
        self.assertEqual(
            ui.statuses,
            [("Copied 1 nodes from /obj/geo1 to clipboard! 1 locked asset type(s) exported without their insides.", fake_hou.severityType.Warning)],
        )

    def test_NOP_EXP_013_include_insides_exports_the_children(self):
        self.show(network(vendor_asset()))
        ui.answers = [CLIPBOARD, INCLUDE_INSIDES]
        nop.run_interactive_export()
        scatter = self.clipboard_document()["root"]["nodes"][0]
        self.assertEqual([n["name"] for n in scatter["children"]["nodes"]], ["secret_inside"])
        self.assertEqual(ui.statuses[0][1], fake_hou.severityType.ImportantMessage)

    def test_NOP_EXP_013_copy_for_nop_never_asks_and_never_includes_insides(self):
        net = network(vendor_asset())
        nop.copy_selection_for_web(fake_hou.NetworkEditor(net))
        self.assertEqual(ui.messages, [])
        self.assertNotIn("children", self.clipboard_document()["root"]["nodes"][0])
        self.assertIn("1 locked asset type(s) exported without their insides.", ui.statuses[0][0])

    def test_NOP_EXP_027_cancel_in_the_locked_asset_question_exports_nothing(self):
        self.show(network(vendor_asset()))
        for first_choice in (CLIPBOARD, SAVE_COMPACT):
            with self.subTest(first_choice=first_choice):
                ui.answers = [first_choice, CANCEL_LOCKED]
                nop.run_interactive_export()
                self.assertEqual((ui.clipboard, ui.statuses, ui.file_choosers), (None, [], []))

    def test_NOP_EXP_027_the_question_lists_at_most_ten_asset_types(self):
        assets = [vendor_asset("vendor::tool%02d::1.0" % i, "tool%02d_1" % i) for i in range(12)]
        self.show(network(*assets))
        ui.answers = [CLIPBOARD, CANCEL_LOCKED]
        nop.run_interactive_export()
        text = ui.messages[1][0]
        listed = [line.strip() for line in text.splitlines() if line.startswith("  ")]
        self.assertEqual(listed, ["vendor::tool%02d::1.0" % i for i in range(10)] + ["... and 2 more"])


class CopyForWebTest(EntryPointTest):
    def test_NOP_EXP_005_copy_for_nop_needs_no_dialog(self):
        net = three_boxes()
        box1, box2, _box3 = net.children()
        fake_hou.SELECTION.extend([box1, box2])
        nop.copy_selection_for_web(fake_hou.NetworkEditor(net))
        self.assertNotIn("\n", ui.clipboard)
        root = self.clipboard_document()["root"]
        self.assertEqual([n["name"] for n in root["nodes"]], ["box1", "box2"])
        self.assertEqual(self.clipboard_document()["exportMode"], "compact")
        self.assertEqual(
            ui.statuses,
            [("Copied 2 selected node(s) from /obj/geo1 for the web. Paste them with Ctrl+V.", fake_hou.severityType.ImportantMessage)],
        )
        self.assertEqual(ui.messages, [])

    def test_NOP_EXP_006_no_network_editor_shows_a_warning(self):
        three_boxes()
        nop.copy_selection_for_web()
        self.assertEqual(ui.statuses, [("NOP: no Network Editor found to copy from.", fake_hou.severityType.Warning)])
        self.assertIsNone(ui.clipboard)

    def test_NOP_EXP_008_which_network_editor_is_used(self):
        geo1, geo2, geo3 = (three_boxes(name) for name in ("geo1", "geo2", "geo3"))
        passed, under_mouse, first = (fake_hou.NetworkEditor(net) for net in (geo1, geo2, geo3))
        viewer = fake_hou.NetworkEditor(geo1, kind=fake_hou.paneTabType.SceneViewer)
        cases = [
            ("the pane passed in", passed, under_mouse, "/obj/geo1"),
            ("the pane under the mouse", None, under_mouse, "/obj/geo2"),
            ("a passed pane that is no Network Editor is skipped", viewer, under_mouse, "/obj/geo2"),
            ("the first open Network Editor", None, viewer, "/obj/geo3"),
        ]
        for label, pane, cursor, expected in cases:
            with self.subTest(label):
                ui.reset()
                ui.panes = [viewer, first]
                ui.pane_under_cursor = cursor
                nop.copy_selection_for_web(pane)
                self.assertEqual(self.clipboard_document()["root"]["path"], expected)


if __name__ == "__main__":
    unittest.main()
