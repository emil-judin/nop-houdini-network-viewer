# Code Review Backlog (`CODE_REVIEW.md`)

> **Purpose:** Findings from the full repository review on 2026-10-24. Fixed items are ticked with the date and fix; open items are unticked.
> At review time `npm.cmd run check` passed. The repository has no tests and no linter.

---

## 1. Bugs

- [x] **Fixed 2026-10-24: Divide now matches `sop_divide` exactly.** Was: **Subdivide nodes render the Divide icon (confirmed).** `src/components/nodes/icons/OperatorSvgIcon.tsx` (Divide branch, around line 290) matches `baseIcon.includes('divide')`, which also matches `sop_subdivide`. Divide is checked before Subdivide, so the Subdivide branch never runs. Prefer exact icon-name matching to avoid this class of collision.
- [x] **Fixed 2026-10-26:** only items whose `parent()` is the exported network count (`selected_items_in`). Was: **Exporter uses the global selection.** `exporter/wop_exporter.py` calls `hou.selectedItems()` (in `serialize_network` and `run_interactive_export`). Stale selections in other networks switch on selection-only mode and export foreign nodes under the current path. Fix: keep only items whose `parent() == net`.
- [x] **Fixed 2026-10-26:** nodes without an HDA definition are never recursed into. Was: **Recursion guard gap (not verified in Houdini).** Built-in containers that are not HDAs (for example Attribute VOP, Solver SOP) have no definition, so `is_sidefx_or_labs_hda()` returns True and `not node.isLockedHDA()` is also True, so the exporter recurses into their VOP/DOP children. This breaks the AGENTS.md subnetwork recursion rule.
- [x] **Fixed 2026-10-26:** runs only from a shelf tool (`kwargs` present) or as `__main__`. Was: **Exporter runs on import.** `if __name__ == "__main__" or True:` at the end of the exporter starts an export whenever the module is imported.
- [x] **Fixed 2026-10-26:** uses `parseOperatorType` (`src/schema/operatorType.ts`). Was: **Type label wrong on namespaced nodes (confirmed with fixtures).** `src/components/nodes/HoudiniSopNode.tsx` uses `node.type.split('::')[0]`, turning `labs::lot_subdivision::2.0` into `labs`. Labs nodes such as `lot_subdivision1` then show the "renamed" type label. Strip both the namespace and the version.
- [x] **Fixed 2026-10-26:** the exporter writes `hdaState` (`locked` / `unlocked` / `null`); locked assets get the grey padlock, unlocked ones Houdini's red open padlock. Exports without the field fall back to namespaced types. Was: **HDA padlock hard-coded.** `showHdaBadge` in `HoudiniSopNode.tsx` uses a type list (`attribwrangle`, `split`, anything with `::`). It should come from the exporter (for example an `isLockedHda` field).
- [x] **Fixed 2026-10-26:** `normalizeNetworkDocument` validates `root.nodes`, the parse is caught in `HoudiniNetwork`, and `NetworkErrorBoundary` catches render errors; both show `NetworkErrorState`. Was: **Malformed JSON crashes the host page.** `normalizeNetworkDocument` throws inside `useMemo` in `src/components/HoudiniNetwork.tsx`. Show an error state instead.

## 2. Licensing Risk

- [x] **Fixed 2026-10-24:** references now live in gitignored `local-refs/` and are served by a dev-only Vite route (`apply: 'serve'`); verified that `dist/` contains no reference icons. Was: **`vite build` would publish the SideFX reference icons.** `public/__local_houdini_ref_icons.json` is gitignored, but Vite copies all of `public/` into `dist/`. Move the file out of `public/` and serve it through a dev-only route.

## 3. Compatibility Pillar

- [x] **Fixed 2026-10-26:** `fixed inset-0` with safe-area padding, Fullscreen API feature detection, Escape closes the fallback, body scroll locked; playground uses `h-dvh`. Was: **CSS fullscreen fallback sizing.** `HoudiniNetwork.tsx` uses `fixed inset-0 w-screen h-screen`. On iOS Safari `100vh` is taller than the visible screen, and `100vw` causes sideways scrolling on desktops with scrollbars. `fixed inset-0` alone is enough. The playground root in `src/playground/App.tsx` should use `h-dvh`.
- [x] **Fixed 2026-10-26:** link is attached to the page and the URL is revoked after 1s. Was: **JSON download can fail.** `ViewerToolbar.tsx` revokes the object URL right after `click()`. Revoke after a short delay.
- [x] **Fixed 2026-10-26:** toolbar buttons grow to 44px under `(pointer: coarse)`, toolbar and playground header wrap. Was: **Touch targets and small screens.** Toolbar buttons are about 24px tall (minimum is 44px). The playground header does not wrap at phone widths.
- [x] **Fixed 2026-10-26:** Sphere now uses the per-instance `uid`. Was: **Shared SVG ids.** `id="houSphereGrad"` is repeated in every sphere node. Use React `useId()`.

## 4. UI That Does Not Do What It Says

- [x] **Fixed 2026-10-26:** H fits all, F frames the selected node. Was: Fit button tooltip says "(F)" but no keyboard shortcut exists.
- [x] **Fixed 2026-10-26:** handles receive the pointer again (`pointer-events: all`, default cursor) so the input / output label tooltips show. Was: Connector tooltips never appear because `src/playground/index.css` sets `pointer-events: none !important` on all handles.
- [x] **Fixed 2026-10-24:** wires attached to the selected node now highlight `#a8b36f` (through dots). Was: the wire `selected` highlight never shows (controlled edges without `onEdgesChange`).

## 5. Before the Milestone 3 Library Build

- [x] **Fixed 2026-10-26:** `react` and `react-dom` are `peerDependencies` (`>=18.2.0`, also dev dependencies for the playground); the fonts became dev dependencies because their files are bundled into the CSS.
- [x] **Fixed 2026-10-26:** shared stylesheets in `src/styles/` (`fonts`, `theme`, `viewer`, scoped `reset`, `viewer-bundle`, `library`); the playground `index.css` now only imports them. See ARCHITECTURE.md section 5.
- [x] **Fixed 2026-10-26:** `npm.cmd run build:lib` builds `dist/index.js`, `dist/index.cjs`, `dist/style.css`, `dist/web-component.js` and `dist/types/`; `package.json` `exports` point at them. The playground build moved to `dist-playground/`.
- [x] **Fixed 2026-10-24:** moved to `src/playground/IconReviewGallery.tsx`. Was: move `IconReviewGallery` (playground-only tool) from `src/components/hud/` to `src/playground/`.

## 6. Lower Priority

- [ ] Enable `onlyRenderVisibleElements` for large exports (for example the 7.4 MB `complex-network.json`).
- [x] **Fixed 2026-10-24:** subnet inputs now use the true 100x30 node box. Was: subnet input nodes are 113x28 drawn into a 100x30 shape, so they look slightly squashed (`src/schema/converter.ts`).
- [ ] The exporter never fills `customShapes`, so user-made node shapes fall back to `rect`.
- [x] **Fixed 2026-10-26:** the exporter always replaces local folders in parameter values, expressions, comments, sticky notes and custom icon ids with `$HIP`, `$JOB`, `$HOUDINI_USER_PREF_DIR`, `$HSITE`, `$HFS`, `$HOME`, and any other home folder with `~` (`path_scrubber()`). Was: Exported parameter values include absolute file paths.
- [ ] Add Vitest coverage for `converter.ts` and a React hooks lint rule. (The missing `onNodeSelect` dependency in `HoudiniNetwork.tsx` was fixed on 2026-10-26: the callback is read through a ref.)
