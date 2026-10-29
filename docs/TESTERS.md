# Testing NOP (`0.1.0-alpha.2`)

Thank you for trying NOP. It shows Houdini node networks on a web page, so you can put an interactive network on your portfolio or in a tutorial instead of a screenshot. Visitors can pan, zoom, open subnetworks and read parameters and VEX, but cannot change anything.

This is an early test version. Some things will be missing or broken, and that is exactly what I would like to hear about.

**Tested the first version already?** The project is now called NOP (it was WOP), so the playground has a new address: use the link from this invitation. The exporter must be installed again (see step 2). New since then: a layout like Houdini's desktop with a Networks pane, a fullscreen button, better phone support, an example website and a welcome card.

## 1. Open the playground

Open the link from your invitation. It works in a desktop or phone browser, and a welcome card explains the basics on the first visit (**Help** brings it back).

- The **Networks** pane on the left lists the demo networks. On a phone it is folded to a thin strip: tap it to open the pane, and tap beside the pane to close it again.
- Click nodes to see their parameters. Choose **Circuit Gen HDA** and double-click (or double-tap) its subnetworks to go inside; the arrows and the path above the network bring you back.
- Press `H` or double-click the empty background to fit the whole network, and use the button at the top right for fullscreen.

## 2. Install the exporter in Houdini

You need Houdini 22 (other versions are not tested yet).

1. In the playground, click **Get the exporter** at the bottom of the Networks pane and download `nop-exporter.zip`.
2. Open the `packages` folder in your Houdini preferences (create it if it does not exist):
   - Windows: `Documents\houdini22.0\packages`
   - macOS: `~/Library/Preferences/houdini/22.0/packages`
   - Linux: `~/houdini22.0/packages`
3. Copy `nop.json` and the `nop` folder from the zip into it.
4. Restart Houdini. A **NOP** shelf tab appears at the top. If not: click the **+** next to the shelf tabs and choose **Shelves > NOP**.

To remove it later, delete `nop.json` and the `nop` folder. Upgrading from the WOP exporter (before 2026-10-28): delete the old `wop.json` and the `wop` folder first, otherwise Houdini shows both shelves.

## 3. Things to try

- Export one of your own networks: select nodes (or nothing for the whole network), click **Export for NOP**, choose **Copy to Clipboard**, then press `Ctrl+V` in the playground (or click **Paste** in the Networks pane). **Copy for NOP** does the same in one click.
- Save a `.json` file instead and open it with **Open file** in the Networks pane, or drop it on the page.
- Click **Embed this network** at the bottom of the Networks pane and look at the **example website**: that is how a network looks on your own site. If you have a website, try the iframe code there.
- Compare with Houdini: node shapes, colors, flags, wires, network boxes, the parameter panel. Anything that looks different from Houdini is useful feedback.
- Go into subnetworks and your own unlocked digital assets, and back out with the path bar.
- Try the playground and the example website on your phone or tablet. On the example website one finger scrolls the page and two fingers move the network, like a map on a web page; the fullscreen button gives the network the whole screen. In the playground one finger moves the network.

## 4. Known limits

- Tested with Houdini 22.0.466 only.
- Automated tests cover Chrome, Firefox and Safari's engine, plus phone and tablet profiles, but not real devices yet. Reports from real phones are welcome.
- Built for SOP networks. Other network types (VOP, LOP, TOP, DOP) are not supported yet and may look wrong.
- The React and web component embeds need the npm package, which is not published yet. Use the iframe option for now.

## 5. Privacy

- A network you open in the playground stays in your browser; it is never uploaded.
- **Paths:** folders inside your project become `$HIP` or `$JOB` (`$HIP/geo/a.bgeo`). Every other path keeps only its file name: `D:/Clients/Acme/tex/rock.exr`, `C:/Users/<you>/...` and server shares such as `\\studio-nas\...` all become `<path>/rock.exr`. File names themselves stay, so rename a file if its name is confidential.
- **Locked assets:** if your network uses locked assets that are not from SideFX (bought, studio or a colleague's), the exporter asks before including their insides. Choose **Export Closed** unless you made the asset yourself. Their icons are included either way.
- **Exported as you wrote them:** network box titles exactly, and sticky notes, node names and parameter text apart from their paths. Check them before sharing.
- Your asset names (for example `myname::my_asset::1.0`) are part of the export, because they identify the nodes.
- Please check one of your exports before sharing it publicly, and tell me if anything private slipped through. For a serious leak, use the private contact in `SECURITY.md` instead of the feedback form.

## 6. Send feedback

Click **Feedback** at the bottom of the Networks pane. Your message goes straight to me by email (through Web3Forms), with the NOP version, your browser and the name of the network on screen; your network file is never sent. Add your name or email if you would like an answer. Screenshots help: if something looks wrong, mention what you expected and I may ask you for one.
