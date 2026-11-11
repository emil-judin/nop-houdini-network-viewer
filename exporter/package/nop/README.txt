NOP exporter for Houdini (version {{VERSION}})
==============================================

A Houdini shelf that exports node networks for the NOP web viewer.
Tested with Houdini 22.0.466.

Install
-------
1. Open the "packages" folder in your Houdini preferences
   (create it if it does not exist):
     Windows: Documents\houdini22.0\packages
     macOS:   ~/Library/Preferences/houdini/22.0/packages
     Linux:   ~/houdini22.0/packages
2. Copy nop.json and the nop folder from this download into it.
   Studios can instead use any folder listed in HOUDINI_PACKAGE_DIR.
3. Restart Houdini. The "NOP" shelf tab has two tools:
     Export for NOP   copy to the clipboard or save a .json file
     Copy for NOP     copy the selection as JSON without a dialog
   If the tab is missing, click the + next to the shelf tabs and
   choose Shelves > NOP.

Update: replace the nop folder and restart Houdini.
Uninstall: delete nop.json and the nop folder.

Usage, the copy hotkey, and what is exported and removed (privacy):
https://github.com/emil-judin/nop-houdini-network-viewer/blob/main/exporter/README.md
