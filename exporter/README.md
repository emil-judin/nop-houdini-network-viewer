# WOP Shelf Exporter for Houdini

This folder contains the Python exporter (`wop_exporter.py`) that exports your Houdini node networks into a self-contained JSON format for `wop-houdini-network-viewer`, and the Houdini package (`package/`) that installs it as a ready-made **WOP** shelf.

Tested with Houdini 22.0.466; Houdini 20.5 and 21 are not tested yet.

## Install as a Houdini Package (recommended)

Download `wop-exporter.zip` from the playground (**Exporter** button). It is built from this folder by `npm run build:exporter` (`scripts/build_exporter_package.mjs`) and contains:

```text
wop.json                            # package file: adds the wop folder to HOUDINI_PATH
wop/
├── scripts/python/wop_exporter.py  # the exporter (importable as `wop_exporter`)
├── toolbar/wop.shelf               # WOP shelf: "Export for WOP" and "Copy for WOP"
├── icons/wop.svg                   # shelf icon
└── README.txt                      # install steps
```

1. Open the `packages` folder in your Houdini preferences (create it if it does not exist):
   - Windows: `Documents\houdini22.0\packages`
   - macOS: `~/Library/Preferences/houdini/22.0/packages`
   - Linux: `~/houdini22.0/packages`
2. Copy `wop.json` and the `wop` folder from the zip into it.
3. Restart Houdini. The **WOP** shelf tab appears at the top. If it does not, click the **+** next to the shelf tabs and choose **Shelves > WOP**.

Update by replacing the `wop` folder; uninstall by deleting `wop.json` and the `wop` folder. The hotkey for **Copy for WOP** is still set by hand (see below).

## Manual Setup (Shelf Tool)

1. Open **SideFX Houdini**.
2. Click the **`+`** icon on any Shelf at the top of your workspace and select **New Tool...**.
3. Under the **Options** tab:
   - **Name:** `wop_export`
   - **Label:** `Export for WOP`
4. Under the **Script** tab:
   - Paste the contents of [`wop_exporter.py`](./wop_exporter.py).
5. Click **Accept**.

**Alternative (module install):** copy `wop_exporter.py` into a folder on your Houdini Python path (for example `$HOUDINI_USER_PREF_DIR/scripts/python`, not created automatically) and use this two-line shelf script instead:

```python
import wop_exporter
wop_exporter.run_interactive_export(kwargs.get("pane"))
```

## How to Use

1. Open any SOP network in Houdini's Network Editor:
   - Leave **nothing selected** to export the entire current network.
   - Or **select specific nodes** to export only that selection.
2. Click the **Export for WOP** shelf button.
3. Choose your preferred action in the dialog:
   - **Copy to Clipboard (Compact Parms):** Immediately copies the JSON to your system clipboard so you can press `Ctrl+V` in the web playground (just like Klee).
   - **Save .json File (Compact Parms):** Saves a lightweight `.json` file containing modified parameters and VEX/Python snippets, ready to drop into your portfolio repository.
   - **Save .json File (Full Parms):** Saves a `.json` file containing all visible parameters on every node.


## Copy for Web Hotkey (for example Ctrl+Shift+Alt+C)

For a copy-and-paste workflow without any dialog, bind `copy_selection_for_web()` to a hotkey. It copies the selected nodes of the Network Editor under the mouse (or the whole network when nothing is selected there) as compact JSON, then shows a status bar message. Paste it into the playground with `Ctrl+V`.

With the package installed, the **Copy for WOP** tool already exists: skip to step 2. With the manual setup, this needs the **module install** above (the exporter file on your Houdini Python path).

1. Create a second shelf tool (**New Tool...**):
   - **Name:** `wop_copy`
   - **Label:** `Copy for WOP`
   - **Script:**

     ```python
     import wop_exporter
     wop_exporter.copy_selection_for_web(kwargs.get("pane"))
     ```

2. Assign the hotkey: hold **Ctrl+Alt+Shift** and click the new shelf button (or open **Edit > Hotkeys**, search for `Copy for WOP`), then add a key, for example **Ctrl+Shift+Alt+C**. If Houdini reports that the key is already used, pick another free combination.
3. Select nodes in the Network Editor, press the hotkey with the mouse over the editor, and paste in the browser.

The hotkey always uses the compact parameter mode (changed parameters plus VEX / Python code). Use the dialog shelf tool when you need a `.json` file or all parameters.

## What Gets Exported

- Nodes, wires, dots, network boxes, sticky notes and subnetwork inputs with their exact positions, colors and flags.
- Parameters: changed values (compact) or all visible values (full), with channel expressions, menu labels, folder (tab) names and keyframe markers for the web Parameter Inspector.
- Children of user subnets and unlocked or custom HDAs, so visitors can dive into them. Built-in SideFX and Labs nodes are never expanded.
- Icons only for your own custom HDAs. Built-in SideFX icons are referenced by name and drawn by the web viewer, never copied.
