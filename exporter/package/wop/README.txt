WOP exporter for Houdini (version {{VERSION}})
==============================================

Exports Houdini node networks for the WOP web viewer.

Install
-------
1. Find your Houdini preferences folder:
     Windows: Documents\houdini22.0
     macOS:   ~/Library/Preferences/houdini/22.0
     Linux:   ~/houdini22.0
2. Open (or create) the "packages" folder inside it.
3. Copy wop.json and the wop folder from this download into "packages":
     packages/wop.json
     packages/wop/...
4. Restart Houdini. A "WOP" shelf tab appears with two tools:
     Export for WOP   copy to the clipboard or save a .json file
     Copy for WOP     copy the selection as JSON without a dialog
   If the tab is missing, click the + on the right of the shelf tabs
   and choose Shelves > WOP.

Optional hotkey for Copy for WOP: hold Ctrl+Alt+Shift and click the
"Copy for WOP" button, then add a key such as Ctrl+Shift+Alt+C.

Update: replace the wop folder and restart Houdini.
Uninstall: delete packages/wop.json and the wop folder.

Tested with Houdini 22.0.466.
