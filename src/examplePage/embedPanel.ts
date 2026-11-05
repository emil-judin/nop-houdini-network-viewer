import {
  DEFAULT_EMBED_OPTIONS,
  MAX_EMBED_HEIGHT_PX,
  MIN_EMBED_HEIGHT_PX,
  buildIframeSnippet,
  buildReactSnippet,
  buildWebComponentSnippet,
  clampEmbedHeight,
  optionPairs,
  type EmbedSnippetOptions,
} from '../playground/embedSnippets';

/** jsDelivr serves every npm release, so the snippet works as soon as the package is published. */
const WEB_COMPONENT_URL = `https://cdn.jsdelivr.net/npm/${__NOP_PACKAGE_NAME__}@${__NOP_VERSION__}/dist/web-component.js`;

/**
 * `false` until the package is on npm (Milestone 4). The HTML and React snippets need the npm
 * package or its CDN copy, so until then the panel says so and points to the iframe tab.
 */
const PUBLISHED_ON_NPM = false;

type SnippetTab = 'html' | 'react' | 'iframe';

const TABS: Array<{ id: SnippetTab; label: string; help: string; needsNpm: boolean }> = [
  {
    id: 'html',
    label: 'HTML',
    help: 'For any website where you can add HTML (static sites, WordPress, Cargo). Upload the exported .json file next to the page.',
    needsNpm: true,
  },
  {
    id: 'react',
    label: 'React',
    help: 'For React, Next.js or Astro sites. Install with: npm install nop-houdini-network-viewer',
    needsNpm: true,
  },
  {
    id: 'iframe',
    label: 'iframe',
    help: 'For site builders that only accept iframes (for example Notion). The .json file needs a full https:// address that allows cross-origin requests (CORS), for example a GitHub Gist raw link.',
    needsNpm: false,
  },
];

/** Settings of one embed panel. */
export interface EmbedPanelSettings {
  /** Address of the network file in the code. */
  jsonUrl: string;
  /** Show the option fields; without them the panel is only the code tabs (article networks). */
  withOptions: boolean;
  /** Viewer on the page that previews the code: its attributes and height follow the options. */
  preview?: HTMLElement;
  /** Start values that differ from the defaults (for example the article's start node). */
  initial?: Partial<EmbedSnippetOptions>;
  /**
   * Names of the nodes in the network's top level: the start node becomes a list of them. Without
   * them (the file could not be read) it is a text field.
   */
  nodeNames?: readonly string[];
}

let panelCount = 0;

/** Creates an element with a class and optional text (always as text, never as HTML). */
function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

/** A labelled field of the options grid. */
function field(label: string, control: HTMLElement, wide = false): HTMLLabelElement {
  const wrapper = el('label', wide ? 'embed-field embed-field-wide' : 'embed-field');
  wrapper.append(el('span', 'embed-field-label', label), control);
  return wrapper;
}

/** A `<select>` with `[value, label]` options. */
function select(options: Array<[string, string]>, value: string): HTMLSelectElement {
  const element = el('select');
  for (const [optionValue, label] of options) {
    const option = el('option', undefined, label);
    option.value = optionValue;
    element.append(option);
  }
  element.value = value;
  return element;
}

/** Applies the options to the preview viewer, so it looks like the code says. */
function applyToPreview(preview: HTMLElement, options: EmbedSnippetOptions) {
  for (const name of ['label-size', 'wire-style', 'minimap', 'focus-node', 'toolbar', 'inspector', 'fullscreen', 'debug-actions']) {
    preview.removeAttribute(name);
  }
  for (const [name, value] of optionPairs(options)) {
    preview.setAttribute(name, value);
  }
  // A CSS variable, so the page's phone layout (70% of the screen height) still wins on phones
  preview.style.setProperty('--nop-embed-height', `${options.heightPx}px`);
}

/**
 * Embed code panel of the example page: optional viewer options, the HTML / React / iframe code
 * tabs and a Copy button. It replaces the playground's former Embed dialog, so the code sits right
 * under the network it shows.
 */
export function createEmbedPanel(settings: EmbedPanelSettings): HTMLElement {
  const id = `embed-${++panelCount}`;
  const options: EmbedSnippetOptions = { ...DEFAULT_EMBED_OPTIONS, ...settings.initial, jsonUrl: settings.jsonUrl };
  let tab: SnippetTab = 'html';

  const panel = el('section', 'embed');
  panel.setAttribute('aria-label', 'Embed code');

  const code = el('code');
  const help = el('p', 'embed-help');
  const npmNote = el('p', 'embed-warning', 'Not on npm yet (tester release): this code starts working with the public release. For now, use the iframe tab.');
  const urlNote = el('p', 'embed-warning', 'The file address is relative. An iframe loads it from the NOP playground, so use a full https:// address.');

  const render = () => {
    const pageUrl = new URL('./', window.location.href).href;
    code.textContent =
      tab === 'react'
        ? buildReactSnippet(options)
        : tab === 'iframe'
          ? buildIframeSnippet(options, pageUrl)
          : buildWebComponentSnippet(options, WEB_COMPONENT_URL);
    const active = TABS.find((t) => t.id === tab) ?? TABS[0];
    help.textContent = active.help;
    npmNote.hidden = !(active.needsNpm && !PUBLISHED_ON_NPM);
    urlNote.hidden = !(tab === 'iframe' && !/^https?:\/\//i.test(options.jsonUrl));
    for (const button of tabButtons) {
      const selected = button.dataset.tab === tab;
      button.setAttribute('aria-selected', String(selected));
      // Only the selected tab is in the Tab order; the arrow keys reach the others
      button.tabIndex = selected ? 0 : -1;
    }
    if (settings.preview) applyToPreview(settings.preview, options);
  };

  // Options (only for the network brought from the playground)
  if (settings.withOptions) {
    const grid = el('div', 'embed-options');

    const url = el('input');
    url.type = 'text';
    url.spellcheck = false;
    url.value = options.jsonUrl;
    url.addEventListener('input', () => {
      options.jsonUrl = url.value;
      render();
    });

    const height = el('input');
    height.type = 'number';
    height.min = String(MIN_EMBED_HEIGHT_PX);
    height.max = String(MAX_EMBED_HEIGHT_PX);
    height.step = '20';
    height.value = String(options.heightPx);
    // The field keeps what is typed (clearing it to type "800" works); the code uses the clamped number
    height.addEventListener('input', () => {
      options.heightPx = clampEmbedHeight(height.value);
      render();
    });
    height.addEventListener('blur', () => {
      height.value = String(clampEmbedHeight(height.value));
    });

    const labelSize = select(
      [
        ['small', 'Small'],
        ['medium', 'Medium'],
        ['large', 'Large'],
      ],
      options.labelSize,
    );
    labelSize.addEventListener('change', () => {
      options.labelSize = labelSize.value as EmbedSnippetOptions['labelSize'];
      render();
    });

    const wires = select(
      [
        ['auto', 'As exported'],
        ['default', 'Default (straight)'],
        ['rounded', 'Rounded'],
      ],
      options.wireStyle,
    );
    wires.addEventListener('change', () => {
      options.wireStyle = wires.value as EmbedSnippetOptions['wireStyle'];
      render();
    });

    // The nodes of the top level to pick from; a typed name where the list is not known
    let focus: HTMLInputElement | HTMLSelectElement;
    if (settings.nodeNames) {
      const names = [...settings.nodeNames].sort((a, b) => a.localeCompare(b));
      if (options.focusNode && !names.includes(options.focusNode)) names.unshift(options.focusNode);
      focus = select([['', 'Whole network'], ...names.map((name): [string, string] => [name, name])], options.focusNode);
    } else {
      focus = el('input');
      focus.type = 'text';
      focus.spellcheck = false;
      focus.placeholder = 'for example OUT';
      focus.value = options.focusNode;
    }
    focus.addEventListener(focus instanceof HTMLSelectElement ? 'change' : 'input', () => {
      options.focusNode = focus.value;
      render();
    });

    const checks = el('div', 'embed-checks');
    for (const [key, label] of [
      ['showToolbar', 'Toolbar'],
      ['showFullscreenButton', 'Fullscreen button'],
      ['showMiniMap', 'Overview open at start'],
      ['showInspector', 'Parameter Inspector'],
      ['showDebugActions', 'Download JSON button'],
    ] as const) {
      const box = el('input');
      box.type = 'checkbox';
      box.checked = options[key];
      box.addEventListener('change', () => {
        options[key] = box.checked;
        render();
      });
      const wrapper = el('label', 'embed-check');
      wrapper.append(box, el('span', undefined, label));
      checks.append(wrapper);
    }

    grid.append(
      field('Network file address (where you upload the exported .json)', url, true),
      field('Height (px)', height),
      field('Label size', labelSize),
      field('Wires', wires),
      field('Start framed on node', focus),
      checks,
    );
    panel.append(grid);
  }

  // Code tabs
  const tabList = el('div', 'embed-tabs');
  tabList.setAttribute('role', 'tablist');
  tabList.setAttribute('aria-label', 'Embed type');
  const tabButtons = TABS.map((t) => {
    const button = el('button', 'embed-tab', t.label);
    button.type = 'button';
    button.id = `${id}-tab-${t.id}`;
    button.dataset.tab = t.id;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `${id}-code`);
    button.addEventListener('click', () => {
      tab = t.id;
      render();
    });
    return button;
  });
  // Arrow keys move between the tabs, like native tab lists
  tabList.addEventListener('keydown', (event) => {
    const index = tabButtons.findIndex((button) => button.dataset.tab === tab);
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = tabButtons[(index + step + tabButtons.length) % tabButtons.length];
    tab = next.dataset.tab as SnippetTab;
    render();
    next.focus();
  });
  tabList.append(...tabButtons);

  const codeBox = el('div', 'embed-code');
  codeBox.id = `${id}-code`;
  codeBox.setAttribute('role', 'tabpanel');
  codeBox.setAttribute('aria-label', 'Code to copy');
  const pre = el('pre');
  // Long code scrolls inside the box, so keyboard users must be able to reach it
  pre.tabIndex = 0;
  pre.append(code);
  const copy = el('button', 'embed-copy', 'Copy');
  copy.type = 'button';
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent ?? '');
      copy.textContent = 'Copied';
      window.setTimeout(() => (copy.textContent = 'Copy'), 1600);
    } catch {
      // The code stays selectable for a manual copy
      window.getSelection()?.selectAllChildren(code);
    }
  });
  codeBox.append(pre, copy);

  panel.append(tabList, help, npmNote, urlNote, codeBox);
  render();
  return panel;
}
