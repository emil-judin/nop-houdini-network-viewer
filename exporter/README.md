# NOP Shelf Exporter for Houdini

This folder contains the Python exporter (`nop_exporter.py`) that exports your Houdini node networks into a self-contained JSON format for `nop-houdini-network-viewer`, and the Houdini package (`package/`) that installs it as a ready-made **NOP** shelf.

Tested with Houdini 22.0.466; Houdini 20.5 and 21 are not tested yet.

## Install as a Houdini Package (recommended)

Download `nop-exporter.zip` from the playground (**Exporter** button). It is built from this folder by `npm run build:exporter` (`scripts/build_exporter_package.mjs`) and contains:

```text
nop.json                            # package file: sets $NOP_EXPORTER_ROOT and adds the nop folder to HOUDINI_PATH
nop/
├── scripts/python/nop_exporter.py  # the exporter (importable as `nop_exporter`)
├── toolbar/nop.shelf               # NOP shelf: "Export for NOP" and "Copy for NOP"
├── icons/nop.png                   # shelf icon (see-through NOP icon)
└── README.txt                      # install steps
```

1. Open the `packages` folder in your Houdini preferences (create it if it does not exist):
   - Windows: `Documents\houdini22.0\packages`
   - macOS: `~/Library/Preferences/houdini/22.0/packages`
   - Linux: `~/houdini22.0/packages`
2. Copy `nop.json` and the `nop` folder from the zip into it.
3. Restart Houdini. The **NOP** shelf tab appears at the top. If it does not, click the **+** next to the shelf tabs and choose **Shelves > NOP**.

Studios can also put both into any folder listed in `HOUDINI_PACKAGE_DIR`: `nop.json` finds the `nop` folder next to itself (`$HOUDINI_PACKAGE_PATH`).

Update by replacing the `nop` folder; uninstall by deleting `nop.json` and the `nop` folder. The hotkey for **Copy for NOP** is still set by hand (see below). Upgrading from the WOP exporter (before 2026-10-28): delete the old `wop.json` and the `wop` folder first, otherwise Houdini shows both shelves.

## Manual Setup (Shelf Tool)

1. Open **SideFX Houdini**.
2. Click the **`+`** icon on any Shelf at the top of your workspace and select **New Tool...**.
3. Under the **Options** tab:
   - **Name:** `nop_export`
   - **Label:** `Export for NOP`
4. Under the **Script** tab:
   - Paste the contents of [`nop_exporter.py`](./nop_exporter.py).
5. Click **Accept**.

**Alternative (module install):** copy `nop_exporter.py` into a folder on your Houdini Python path (for example `$HOUDINI_USER_PREF_DIR/scripts/python`, not created automatically) and use this two-line shelf script instead:

```python
import nop_exporter
nop_exporter.run_interactive_export(kwargs.get("pane"))
```

## How to Use

1. Open any SOP network in Houdini's Network Editor:
   - Leave **nothing selected** to export the entire current network.
   - Or **select specific nodes** to export only that selection.
2. Click the **Export for NOP** shelf button.
3. Choose your preferred action in the dialog:
   - **Copy to Clipboard (Compact Parms):** Immediately copies the JSON to your system clipboard so you can press `Ctrl+V` in the web playground (just like Klee).
   - **Save .json File (Compact Parms):** Saves a lightweight `.json` file containing modified parameters and VEX/Python snippets, ready to drop into your portfolio repository.
   - **Save .json File (Full Parms):** Saves a `.json` file containing all visible parameters on every node.
4. If the network uses locked assets that are not from SideFX (bought, studio or colleagues' assets), a second dialog lists them. **Export Closed** (the default) exports them as closed nodes, with their parameters and icon but without their insides. Choose **Include Insides** only for assets you made yourself.

The status bar says when locked assets stayed closed or when parameters could not be read.


## Copy for Web Hotkey (for example Ctrl+Shift+Alt+C)

For a copy-and-paste workflow without any dialog, bind `copy_selection_for_web()` to a hotkey. It copies the selected nodes of the Network Editor under the mouse (or the whole network when nothing is selected there) as compact JSON, then shows a status bar message. Paste it into the playground with `Ctrl+V`.

With the package installed, the **Copy for NOP** tool already exists: skip to step 2. With the manual setup, this needs the **module install** above (the exporter file on your Houdini Python path).

1. Create a second shelf tool (**New Tool...**):
   - **Name:** `nop_copy`
   - **Label:** `Copy for NOP`
   - **Script:**

     ```python
     import nop_exporter
     nop_exporter.copy_selection_for_web(kwargs.get("pane"))
     ```

2. Assign the hotkey: hold **Ctrl+Alt+Shift** and click the new shelf button (or open **Edit > Hotkeys**, search for `Copy for NOP`), then add a key, for example **Ctrl+Shift+Alt+C**. If Houdini reports that the key is already used, pick another free combination.
3. Select nodes in the Network Editor, press the hotkey with the mouse over the editor, and paste in the browser.

The hotkey always uses the compact parameter mode (changed parameters plus VEX / Python code) and never includes the insides of locked third-party assets. Use the dialog shelf tool when you need a `.json` file, all parameters, or the insides of your own locked assets.

## What Gets Exported

- Nodes, wires, dots, network boxes, sticky notes and subnetwork inputs with their exact positions, colors and flags.
- Parameters: changed values (compact) or all visible values (full), with channel expressions, menu labels, folder (tab) names and keyframe markers for the web Parameter Inspector.
- Children of subnets and unlocked HDAs, so visitors can dive into them. Built-in SideFX and Labs nodes are never expanded. Locked HDAs from anyone else stay closed unless you choose **Include Insides**.
- Custom SVG icons of HDAs outside the Houdini install and SideFX Labs, with editor metadata removed. Built-in SideFX icons are referenced by name and drawn by the web viewer, never copied.

## Privacy

Exports are meant to be as safe to share as a screenshot:

- Paths inside `$HIP` and `$JOB` keep their folders (`$HIP/geo/a.bgeo`); Houdini folders become `$HOUDINI_USER_PREF_DIR`, `$HSITE` or `$HFS`.
- Every other absolute path keeps only its file name: `D:/Clients/Acme/rock.exr`, `C:/Users/<you>/...`, `~/...`, `\\server\share\...` and `/mnt/...` become `<path>/rock.exr`. Houdini node paths (`/obj/geo1/OUT`) stay.
- Network box comments are exported exactly as written. Sticky notes, node names, file names and asset type names are exported as written apart from paths. Check them before sharing.

## Tests

`npm run test:exporter` (from the repository root) runs `tests/test_nop_exporter.py` with a small fake `hou` module (`tests/fake_hou.py`), without Houdini.
