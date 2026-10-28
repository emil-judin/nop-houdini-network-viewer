NOP exporter for Houdini (version {{VERSION}})
==============================================

Exports Houdini node networks for the NOP web viewer.

Install
-------
1. Find your Houdini preferences folder:
     Windows: Documents\houdini22.0
     macOS:   ~/Library/Preferences/houdini/22.0
     Linux:   ~/houdini22.0
2. Open (or create) the "packages" folder inside it.
3. Copy nop.json and the nop folder from this download into "packages":
     packages/nop.json
     packages/nop/...
   Studios can also put both into any folder listed in HOUDINI_PACKAGE_DIR:
   nop.json finds the nop folder next to itself.
4. Restart Houdini. A "NOP" shelf tab appears with two tools:
     Export for NOP   copy to the clipboard or save a .json file
     Copy for NOP     copy the selection as JSON without a dialog
   If the tab is missing, click the + on the right of the shelf tabs
   and choose Shelves > NOP.

Optional hotkey for Copy for NOP: hold Ctrl+Alt+Shift and click the
"Copy for NOP" button, then add a key such as Ctrl+Shift+Alt+C.

Privacy: paths inside $HIP and $JOB keep their folders, every other
path keeps only its file name. Locked assets that are not from SideFX
are exported as closed nodes unless you choose "Include Insides".
Network box comments are exported exactly as written, sticky notes
apart from their paths: check both before sharing.

Update: replace the nop folder and restart Houdini.
Uninstall: delete packages/nop.json and the nop folder.

Tested with Houdini 22.0.466.
