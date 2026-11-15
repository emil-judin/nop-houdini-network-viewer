"""
Integration tests for the Houdini package people download: the zip built by
`scripts/build_exporter_package.mjs` (needs Node.js, like every other build step), and the shelf tools,
which must call functions the exporter has.

Run from the repository root: `python -m unittest discover -s exporter/tests`. The scenarios follow
`docs/features/exporter.feature`.
"""

import inspect
import json
import os
import re
import shutil
import subprocess
import unittest
import xml.etree.ElementTree as ET
import zipfile

from sample_network import nop

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PACKAGE = os.path.join(ROOT, "exporter", "package")
ZIP = os.path.join(ROOT, "public", "downloads", "nop-exporter.zip")


class PackageZipTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        node = shutil.which("node")
        if node is None:
            raise unittest.SkipTest("Node.js is needed to build the exporter package")
        subprocess.run([node, os.path.join("scripts", "build_exporter_package.mjs")], cwd=ROOT, check=True, capture_output=True)

    def test_NOP_EXP_040_the_zip_holds_the_package_and_the_exporter(self):
        with open(os.path.join(ROOT, "package.json"), encoding="utf-8") as f:
            version = json.load(f)["version"]
        with open(os.path.join(ROOT, "exporter", "nop_exporter.py"), "rb") as f:
            exporter_source = f.read()
        with zipfile.ZipFile(ZIP) as archive:
            self.assertIsNone(archive.testzip())
            names = set(archive.namelist())
            for name in ("nop.json", "nop/toolbar/nop.shelf", "nop/icons/nop.png", "nop/README.txt", "nop/scripts/python/nop_exporter.py"):
                with self.subTest(name=name):
                    self.assertIn(name, names)
            readme = archive.read("nop/README.txt").decode("utf-8")
            self.assertIn("(version %s)" % version, readme)
            self.assertNotIn("{{VERSION}}", readme)
            self.assertEqual(archive.read("nop/scripts/python/nop_exporter.py"), exporter_source)


class ShelfTest(unittest.TestCase):
    def test_NOP_EXP_042_the_shelf_tools_call_functions_the_exporter_has(self):
        shelf = ET.parse(os.path.join(PACKAGE, "nop", "toolbar", "nop.shelf")).getroot()
        tools = {tool.get("name"): tool for tool in shelf.iter("tool")}
        self.assertEqual(sorted(tools), ["nop_copy", "nop_export"])
        expected = {"nop_export": "run_interactive_export", "nop_copy": "copy_selection_for_web"}
        for name, tool in tools.items():
            with self.subTest(tool=name):
                calls = re.findall(r"nop_exporter\.(\w+)\(", tool.find("script").text)
                self.assertEqual(calls, [expected[name]])
                function = getattr(nop, calls[0])
                inspect.signature(function).bind(None)
                self.assertTrue(tool.get("icon").startswith("$NOP_EXPORTER_ROOT/"))

    def test_NOP_EXP_042_the_package_file_points_houdini_at_the_shelf(self):
        with open(os.path.join(PACKAGE, "nop.json"), encoding="utf-8") as f:
            package = json.load(f)
        self.assertEqual(package["env"], [{"NOP_EXPORTER_ROOT": "$HOUDINI_PACKAGE_PATH/nop"}])
        self.assertEqual(package["hpath"], "$NOP_EXPORTER_ROOT")


if __name__ == "__main__":
    unittest.main()
