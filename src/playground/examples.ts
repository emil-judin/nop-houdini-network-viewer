/**
 * Example networks of the playground, in the order of the Networks pane. Each file is an export
 * from Houdini in `fixtures/` (the Circuit demos) or `fixtures/examples/` (the guided examples).
 *
 * An example whose file does not exist yet is left out, so the files can be added one at a time.
 * The build also publishes every file at `examples/<file name>` next to the page (see
 * `exampleFiles` in `vite.config.ts`), for the embed snippets and the example site page.
 */
export interface PlaygroundExample {
  /** Stable key for `?example=<key>` links and `?embed=true&demo=<key>`. */
  key: string;
  /** Name in the Networks pane. */
  label: string;
  /** One line under the name: what this example shows. */
  description: string;
  /** File below `fixtures/`, ending in `-network.json`. */
  file: string;
}

const EXAMPLES: PlaygroundExample[] = [
  {
    key: 'start',
    label: 'Start Here',
    description: 'A small network with tips for the viewer',
    file: 'examples/start_here-network.json',
  },
  {
    key: 'vex',
    label: 'VEX Wrangles',
    description: 'Click a wrangle to read its code',
    file: 'examples/vex_wrangles-network.json',
  },
  {
    key: 'foreach',
    label: 'For-Each Loop',
    description: 'A loop block, drawn like in Houdini',
    file: 'examples/for_each-network.json',
  },
  {
    key: 'board',
    label: 'Circuit Board',
    description: 'A locked asset as it sits in a scene',
    file: 'circuit_board-network.json',
  },
  {
    key: 'circuit',
    label: 'Circuit Gen HDA',
    description: 'Inside the asset: 169 nodes, nested assets to dive into',
    file: 'circuit_gen-network.json',
  },
];

/** The network files, each loaded only when its example is first shown. */
const LOADERS = import.meta.glob<{ default: unknown }>(['../../fixtures/*-network.json', '../../fixtures/examples/*-network.json']);

const loaderPath = (example: PlaygroundExample) => `../../fixtures/${example.file}`;

/** The examples whose files exist, in order. */
export const AVAILABLE_EXAMPLES: readonly PlaygroundExample[] = EXAMPLES.filter((example) =>
  Object.hasOwn(LOADERS, loaderPath(example)),
);

/** The example with this key, if its file exists. */
export function findExample(key: string | null | undefined): PlaygroundExample | undefined {
  return AVAILABLE_EXAMPLES.find((example) => example.key === key);
}

/** Downloads the example's network JSON (not normalized yet). */
export function loadExample(example: PlaygroundExample): Promise<unknown> {
  return LOADERS[loaderPath(example)]().then((module) => module.default);
}

/** Sample website page with networks embedded by the `<houdini-network>` web component (`public/`). */
export const EXAMPLE_SITE_PAGE = 'example-site.html';

/** Address of the example's published copy, for embed snippets (absolute, next to this page). */
export function exampleFileUrl(example: PlaygroundExample): string {
  const fileName = example.file.split('/').pop() ?? example.file;
  return new URL(`examples/${fileName}`, document.baseURI).href;
}
