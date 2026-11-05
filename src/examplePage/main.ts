import { AVAILABLE_EXAMPLES, EMBED_PAGE_EXAMPLE, exampleFileUrl, findExample } from '../playground/examples';
import { createEmbedPanel } from './embedPanel';

/**
 * Script of the example page (`example-site.html`). The page itself is plain HTML that shows networks
 * with the real `<houdini-network>` web component, like a visitor's own site would. This script adds:
 *
 * - The embedder at the top: one fixed example (`EMBED_PAGE_EXAMPLE`) with the embed options and
 *   code under it. The playground's Embed button opens the page; it never passes a network along.
 * - The code tabs under each network of the sample article (`data-embed-code`).
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

/** Fills the embedder at the top of the page with the example, its options and its code. */
async function showEmbedder() {
  const section = document.getElementById('embedder');
  const figure = section?.querySelector<HTMLElement>('[data-preview]');
  const example = findExample(EMBED_PAGE_EXAMPLE) ?? AVAILABLE_EXAMPLES[0];
  if (!section || !figure || !example) return;

  const fileUrl = `examples/${example.file.split('/').pop()}`;
  const viewer = document.createElement('houdini-network');
  viewer.className = 'preview';
  viewer.setAttribute('src', fileUrl);
  figure.append(viewer);
  section.hidden = false;

  const nodeNames = await exampleNodeNames(fileUrl);
  figure.after(createEmbedPanel({ jsonUrl: exampleFileUrl(example), withOptions: true, preview: viewer, nodeNames }));
}

/** Adds the code tabs under each network of the sample article. */
function addArticlePanels() {
  for (const viewer of document.querySelectorAll<HTMLElement>('houdini-network[data-embed-code]')) {
    const src = viewer.getAttribute('src');
    if (!src) continue;
    (viewer.closest('figure') ?? viewer).after(
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
