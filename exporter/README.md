# NOP exporter for Houdini

A Houdini shelf that exports node networks as JSON files for the NOP viewer. This folder holds the exporter (`nop_exporter.py`) and the Houdini package that installs it (`package/`).

Supported Houdini versions: see [Compatibility](../README.md#compatibility).

## Install

1. In the [playground](https://emil-judin.github.io/nop-houdini-network-viewer/), click **Get the exporter** at the bottom of the Networks pane to download `nop-exporter.zip`. Every [release](https://github.com/emil-judin/nop-houdini-network-viewer/releases) also has the zip attached, including older versions.
2. Open the `packages` folder in your Houdini preferences. Create it if it does not exist.
   - Windows: `Documents\houdini22.0\packages`
   - macOS: `~/Library/Preferences/houdini/22.0/packages`
   - Linux: `~/houdini22.0/packages`
3. Copy `nop.json` and the `nop` folder from the zip into it.
4. Restart Houdini. The **NOP** shelf tab appears at the top. If it does not, click the **+** next to the shelf tabs and choose **Shelves > NOP**.

- **Update:** replace the `nop` folder and restart Houdini.
- **Uninstall:** delete `nop.json` and the `nop` folder.

## Export a network

1. Open a SOP network in the Network Editor. Select the nodes to export, or nothing to export the whole network.
2. Click **Export for NOP** on the NOP shelf and choose an action. All three export the same nodes, wires, boxes and notes. They differ in where the JSON goes and which parameters it keeps:

   | Action | Output | Parameters | Use it for |
   | :--- | :--- | :--- | :--- |
   | **Copy to Clipboard (Compact Parms)** | Clipboard | Changed values, VEX and Python code | A quick look: paste into the playground with `Ctrl+V` |
   | **Save .json File (Compact Parms)** | `.json` file | Changed values, VEX and Python code | Publishing on your page: a small file that shows what you changed |
   | **Save .json File (Full Parms)** | `.json` file, larger | Every visible parameter, changes in bold | Showing complete parameter panes, like Houdini's Parameter Pane |

3. If the network uses locked assets that are not from SideFX (bought, studio or colleagues' assets), a second dialog lists them. **Export Closed** exports them as closed nodes, with their parameters and icon but without their insides. Choose **Include Insides** only for assets you made yourself.

The status bar says when locked assets stayed closed or parameters could not be read.

## Copy hotkey

**Copy for NOP** copies the selected nodes of the Network Editor under the mouse (or the whole network when nothing is selected) as compact JSON, without a dialog. To bind it to a key:

1. Hold **Ctrl+Alt+Shift** and click **Copy for NOP** on the shelf, or open **Edit > Hotkeys** and search for `Copy for NOP`.
2. Add a key, for example **Ctrl+Shift+Alt+C**. If Houdini reports that the key is used, pick another.
3. Select nodes, press the key with the mouse over the Network Editor, and paste into the playground with `Ctrl+V`.

The hotkey always uses compact parameters and never includes the insides of locked third-party assets. Use **Export for NOP** for files, full parameters, or the insides of your own locked assets.

## What gets exported

- Nodes, wires, dots, network boxes, sticky notes and subnetwork inputs, with their positions, colors and flags.
- Parameters: changed values (compact) or all visible values (full), with channel expressions, menu labels, folder (tab) names and keyframe markers.
- The insides of subnetworks and unlocked digital assets, so visitors can dive into them. Built-in SideFX and SideFX Labs nodes are never expanded. Locked assets from anyone else stay closed unless you choose **Include Insides**.
- Custom SVG icons of assets outside the Houdini install and SideFX Labs, without editor metadata. Built-in SideFX icons are referenced by name and drawn by the viewer, never copied.

## Privacy

Exports are meant to be as safe to share as a screenshot.

- Paths inside `$HIP` and `$JOB` keep their folders (`$HIP/geo/a.bgeo`). Houdini folders become `$HOUDINI_USER_PREF_DIR`, `$HSITE` or `$HFS`.
- Every other absolute path keeps only its file name: `D:/Clients/Acme/rock.exr`, `C:/Users/<you>/...`, `~/...`, `\\server\share\...` and `/mnt/...` become `<path>/rock.exr`. Houdini node paths (`/obj/geo1/OUT`) stay.
- Network box comments are exported exactly as written. Sticky notes, node names, file names and asset type names are exported as written apart from paths. Check them before sharing.

The exact rules are rule 7 in [`docs/SCHEMA.md`](../docs/SCHEMA.md); the reasons are in [decision 0004](../docs/decisions/0004-exports-safe-as-a-screenshot.md).

## Package contents

`npm run build:exporter` (`scripts/build_exporter_package.mjs`) builds `nop-exporter.zip` from this folder:

```text
nop.json                            # package file: sets $NOP_EXPORTER_ROOT, adds the nop folder to HOUDINI_PATH
nop/
├── scripts/python/nop_exporter.py  # the exporter (importable as `nop_exporter`)
├── toolbar/nop.shelf               # NOP shelf: "Export for NOP" and "Copy for NOP"
├── icons/nop.png                   # shelf icon
└── README.txt                      # install steps, with the package version filled in
```
