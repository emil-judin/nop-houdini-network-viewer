# Testing WOP (`0.1.0-alpha.1`)

Thank you for trying WOP. It shows Houdini node networks on a web page, so you can put an interactive network on your portfolio or in a tutorial instead of a screenshot. Visitors can pan, zoom, open subnetworks and read parameters and VEX, but cannot change anything.

This is an early test version. Some things will be missing or broken, and that is exactly what I would like to hear about.

## 1. Open the playground

Open the link from your invitation. It works in a desktop or phone browser. Two demo networks are loaded: click nodes to see their parameters, double-click the Circuit Gen asset to go inside it, press `H` to fit the view.

## 2. Install the exporter in Houdini

You need Houdini 22 (other versions are not tested yet).

1. In the playground, click **Exporter** and download `wop-exporter.zip`.
2. Open the `packages` folder in your Houdini preferences (create it if it does not exist):
   - Windows: `Documents\houdini22.0\packages`
   - macOS: `~/Library/Preferences/houdini/22.0/packages`
   - Linux: `~/houdini22.0/packages`
3. Copy `wop.json` and the `wop` folder from the zip into it.
4. Restart Houdini. A **WOP** shelf tab appears at the top. If not: click the **+** next to the shelf tabs and choose **Shelves > WOP**.

To remove it later, delete `wop.json` and the `wop` folder.

## 3. Things to try

- Export one of your own networks: select nodes (or nothing for the whole network), click **Export for WOP**, choose **Copy to Clipboard**, then press `Ctrl+V` in the playground.
- Save a `.json` file instead and open it with **Open .json**, or drop it on the page.
- Compare with Houdini: node shapes, colors, flags, wires, network boxes, the parameter panel. Anything that looks different from Houdini is useful feedback.
- Go into subnetworks and your own digital assets, and back out with the path bar.
- Try the playground on your phone or tablet.
- Click **Embed** and, if you have a website, try putting a network on it (the iframe option works with the playground link).

## 4. Known limits

- Tested with Houdini 22.0.466 only.
- Tested in Chrome only so far. Safari, Firefox and phones should work, but reports are welcome.
- Built for SOP networks. Other network types (VOP, LOP, TOP, DOP) are not supported yet and may look wrong.
- The React and web component embeds need the npm package, which is not published yet. Use the iframe option for now.

## 5. Privacy

- A network you open in the playground stays in your browser; it is never uploaded.
- The exporter replaces your local folders (for example `C:/Users/<name>/...`) with `$HIP`, `$JOB`, `~` and similar, so shared files do not reveal your folder names. Please check one of your exports before sharing it publicly, and tell me if anything private slipped through.
- Your asset names (for example `myname::my_asset::1.0`) are part of the export, because they identify the nodes.

## 6. Send feedback

Click **Feedback** in the playground. Your message goes straight to me; add your name or email if you would like an answer. Screenshots help: if something looks wrong, mention what you expected and I may ask you for one.
