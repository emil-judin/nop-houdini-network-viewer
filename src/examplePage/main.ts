import { AVAILABLE_EXAMPLES, EMBED_PAGE_EXAMPLE, exampleFileUrl, findExample } from '../playground/examples';
import { createEmbedPanel } from './embedPanel';

/**
 * Script of the example page (`example-site.html`). The page itself is plain HTML that shows networks
 * with the real `<houdini-network>` web component, like a visitor's own site would. This script adds:
 *
 * - The embed options and code under the example network at the top (`EMBED_PAGE_EXAMPLE`, already
 *   in the HTML). The playground's Embed button opens the page; it never passes a network along.
 * - The code tabs under each network of the sample article (`data-embed-code`).
 *
 * Both go into `data-embed-slot` elements that the page CSS gives their height from the start, so
 * the page does not jump when this script has loaded.
 */

/** Height the page gives its viewers (`houdini-network` in the page CSS). */
const PAGE_VIEWER_HEIGHT_PX = 480;

/** Names of the nodes in the top level of a network file, or `undefined` if it has none. */
function topLevelNodeNames(network: unknown): string[] | undefined {
  const nodes = (network as { root?: { nodes?: unknown } } | null)?.root?.nodes;
  if (!Array.isArray(nodes)) return undefined;
  return nodes
    .map((node) => (node as { name?: unknown } | null)?.name)
    .filter((name): name is string => typeof name === 'string' && name !== '');
}

/** Reads the node names of a published example file (the viewer loads the same file). */
async function exampleNodeNames(url: string): Promise<string[] | undefined> {
  try {
    const response = await fetch(url, { credentials: 'same-origin' });
    return response.ok ? topLevelNodeNames(await response.json()) : undefined;
  } catch {
    return undefined;
  }
}

/** Puts a panel into the reserved slot after `anchor`, or right after `anchor` without one. */
function placePanel(anchor: Element, panel: HTMLElement) {
  const slot = anchor.nextElementSibling;
  if (slot?.hasAttribute('data-embed-slot')) slot.replaceChildren(panel);
  else anchor.after(panel);
}

/** Adds the embed options and code under the example network at the top of the page. */
async function showEmbedder() {
  const figure = document.querySelector<HTMLElement>('#embedder [data-preview]');
  const example = findExample(EMBED_PAGE_EXAMPLE) ?? AVAILABLE_EXAMPLES[0];
  if (!figure || !example) return;

  // The page HTML already shows the example; this keeps it in step with `EMBED_PAGE_EXAMPLE`
  const fileUrl = `examples/${example.file.split('/').pop()}`;
  let viewer = figure.querySelector<HTMLElement>('houdini-network');
  if (!viewer) {
    viewer = document.createElement('houdini-network');
    viewer.className = 'preview';
    figure.append(viewer);
  }
  if (viewer.getAttribute('src') !== fileUrl) viewer.setAttribute('src', fileUrl);

  const nodeNames = await exampleNodeNames(fileUrl);
  placePanel(figure, createEmbedPanel({ jsonUrl: exampleFileUrl(example), withOptions: true, preview: viewer, nodeNames }));
}

/** Adds the code tabs under each network of the sample article. */
function addArticlePanels() {
  for (const viewer of document.querySelectorAll<HTMLElement>('houdini-network[data-embed-code]')) {
    const src = viewer.getAttribute('src');
    if (!src) continue;
    placePanel(
      viewer.closest('figure') ?? viewer,
      createEmbedPanel({
        jsonUrl: new URL(src, window.location.href).href,
        withOptions: false,
        initial: { focusNode: viewer.getAttribute('focus-node') ?? '', heightPx: PAGE_VIEWER_HEIGHT_PX },
      }),
    );
  }
}

addArticlePanels();
void showEmbedder();
