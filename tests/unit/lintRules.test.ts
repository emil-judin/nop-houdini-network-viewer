import { execFileSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';

// The AGENTS.md rules that eslint.config.js enforces. Each case lints a snippet as if it were a file
// at `filePath`, with the repository's real config, so a config change that silently drops a rule
// fails here. ESLint runs in one plain Node process: loaded through Vitest it takes about a minute.

interface Snippet {
  code: string;
  filePath: string;
}

const VIEWER = 'src/components/Probe.tsx';
const PLAYGROUND = 'src/playground/Probe.tsx';

const LINT_SCRIPT = `
import { ESLint } from 'eslint';
const snippets = JSON.parse(process.argv[1]);
const eslint = new ESLint({ cwd: process.cwd() });
const out = [];
for (const { code, filePath } of snippets) {
  const [result] = await eslint.lintText(code, { filePath });
  out.push(result.messages.map((m) => m.ruleId ?? 'fatal: ' + m.message));
}
process.stdout.write(JSON.stringify(out));
`;

const snippets: Snippet[] = [];
const results = new Map<Snippet, string[]>();

/** Registers a snippet; its rule IDs are read after `beforeAll` has linted every snippet. */
function lint(code: string, filePath: string): () => string[] {
  const snippet = { code, filePath };
  snippets.push(snippet);
  return () => results.get(snippet) ?? [];
}

const HTML = [
  'export function A({ text }: { text: string }) {',
  '  return <div dangerouslySetInnerHTML={{ __html: text }} />;',
  '}',
  'export function b(el: HTMLElement, text: string) {',
  '  el.innerHTML = text;',
  '  el.insertAdjacentHTML("beforeend", text);',
  '}',
].join('\n');
const PORTAL = "import { createPortal } from 'react-dom';\nexport { createPortal };";
const REM = "export const a = { fontSize: '0.75rem' };\nexport const b = `w-[2rem] h-4`;\nexport const c = 'text-[11px] premium';";
const FETCH = "export const get = () => fetch('/x');";

const cases = {
  htmlViewer: lint(HTML, VIEWER),
  htmlPlayground: lint(HTML, PLAYGROUND),
  evalCall: lint('export const f = (s: string) => eval(s);', VIEWER),
  newFunction: lint('export const f = (s: string) => new Function(s);', VIEWER),
  portalViewer: lint(PORTAL, VIEWER),
  portalPlayground: lint(PORTAL, PLAYGROUND),
  privateImport: lint("export { normalizeNetworkDocument } from '../schema/normalize';", PLAYGROUND),
  remViewer: lint(REM, VIEWER),
  remPlayground: lint(REM, PLAYGROUND),
  fetchViewer: lint(FETCH, VIEWER),
  fetchPlayground: lint(FETCH, PLAYGROUND),
  fetchDownload: lint(FETCH, 'src/embed/fetchNetwork.ts'),
  fetchFeedback: lint(FETCH, 'src/playground/sendFeedback.ts'),
  beacon: lint("export const send = () => navigator.sendBeacon('/x');", VIEWER),
  hackComment: lint('// quick hack until React Flow measures nodes\nexport const a = 1;', VIEWER),
  temporaryInTests: lint('/* Temporary: remove after the schema bump */\nexport const a = 1;', 'tests/unit/probe.test.ts'),
  linkedWorkaround: lint('// Workaround for a WebKit bug, tracked in #49\nexport const a = 1;', VIEWER),
  plainComment: lint('// Houdini reports maxInputs 9999 for merge\nexport const a = 1;', VIEWER),
};

beforeAll(() => {
  const output = execFileSync(process.execPath, ['--input-type=module', '-e', LINT_SCRIPT, JSON.stringify(snippets)], {
    encoding: 'utf8',
  });
  (JSON.parse(output) as string[][]).forEach((ids, index) => results.set(snippets[index], ids));
}, 60_000);

const SYNTAX = 'no-restricted-syntax';

describe('AGENTS.md rules as lint rules', () => {
  it('blocks HTML parsing of strings in shipped code', () => {
    expect(cases.htmlViewer()).toEqual([SYNTAX, SYNTAX, SYNTAX]);
    expect(cases.htmlPlayground()).toEqual([SYNTAX, SYNTAX, SYNTAX]);
  });

  it('blocks code evaluation', () => {
    expect(cases.evalCall()).toEqual(['no-eval']);
    expect(cases.newFunction()).toEqual(['no-new-func']);
  });

  it('blocks portals in the viewer and the playground', () => {
    expect(cases.portalViewer()).toEqual(['no-restricted-imports']);
    expect(cases.portalPlayground()).toEqual(['no-restricted-imports']);
  });

  it('keeps the playground on the public API', () => {
    expect(cases.privateImport()).toEqual(['no-restricted-imports']);
  });

  it('blocks rem sizes in viewer components, not in the playground', () => {
    expect(cases.remViewer()).toEqual([SYNTAX, SYNTAX]);
    expect(cases.remPlayground()).toEqual([]);
  });

  it('allows requests only in the reviewed files', () => {
    expect(cases.fetchViewer()).toEqual(['no-restricted-globals']);
    expect(cases.fetchPlayground()).toEqual(['no-restricted-globals']);
    expect(cases.fetchDownload()).toEqual([]);
    expect(cases.fetchFeedback()).toEqual([]);
    expect(cases.beacon()).toEqual(['no-restricted-properties']);
  });

  it('asks workaround comments for an issue link', () => {
    expect(cases.hackComment()).toEqual(['nop/no-unlinked-workaround']);
    expect(cases.temporaryInTests()).toEqual(['nop/no-unlinked-workaround']);
    expect(cases.linkedWorkaround()).toEqual([]);
    expect(cases.plainComment()).toEqual([]);
  });
});
