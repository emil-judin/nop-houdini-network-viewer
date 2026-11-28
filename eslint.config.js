// ESLint flat config for NOP: TypeScript, React hooks rules (a missing hook dependency shipped once),
// accessibility checks for JSX, and the AGENTS.md rules that a check can enforce. Run with
// `npm.cmd run lint`. When an agent or a review corrects the same mistake twice, add a rule here
// instead of another line in AGENTS.md: a lint error tells the next agent what to do.
import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import nop from './scripts/eslint-nop-rules.mjs';

// AGENTS.md section 4: file content never reaches HTML parsing or code evaluation
const UNTRUSTED_HTML = [
  {
    selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
    message: 'Network files are untrusted (decision 0006): render text as React children, and custom SVG icons as <img> data URIs (svgDataUri.ts).',
  },
  {
    selector: "AssignmentExpression > MemberExpression.left[property.name=/^(innerHTML|outerHTML)$/]",
    message: 'Network files are untrusted (decision 0006): set textContent or render with React instead of HTML.',
  },
  {
    selector: "CallExpression[callee.property.name=/^(insertAdjacentHTML|write|writeln)$/]",
    message: 'Network files are untrusted (decision 0006): no HTML parsing of strings.',
  },
];

// AGENTS.md section 3: `rem` follows the host page's root font size, even inside a Shadow DOM
const NO_REM_MESSAGE =
  "Use px in viewer components (text-[11px] or the px-pinned theme tokens): rem follows the host page's root font size.";
const NO_REM = [
  { selector: 'Literal[value=/\\d(\\.\\d+)?rem\\b/]', message: NO_REM_MESSAGE },
  { selector: 'TemplateElement[value.raw=/\\d(\\.\\d+)?rem\\b/]', message: NO_REM_MESSAGE },
];

// AGENTS.md section 3: the npm stylesheet is scoped to `.nop-root`, so nothing may render outside it
const NO_PORTALS = {
  name: 'react-dom',
  importNames: ['createPortal'],
  message: 'Every viewer element renders inside .nop-root (the npm stylesheet is scoped to it): no portals.',
};

export default tseslint.config(
  {
    ignores: ['dist/**', 'dist-playground/**', 'public/**', 'local-refs/**', 'design/**', 'coverage/**', 'test-results/**', 'playwright-report/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser },
    },
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      nop,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      ...jsxA11y.flatConfigs.recommended.rules,
      // Focusable on purpose: scrollable code regions (axe: scrollable-region-focusable) and the panel splitter
      'jsx-a11y/no-noninteractive-tabindex': ['error', { roles: ['tabpanel', 'region', 'separator'], tags: [] }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'nop/no-unlinked-workaround': 'error',
    },
  },
  {
    // Shipped code: the security and privacy rules of AGENTS.md section 4
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-restricted-syntax': ['error', ...UNTRUSTED_HTML],
      'no-restricted-imports': ['error', { paths: [NO_PORTALS] }],
      // The playground promises that network files stay in the browser
      'no-restricted-globals': [
        'error',
        ...['fetch', 'XMLHttpRequest', 'WebSocket', 'EventSource'].map((name) => ({
          name,
          message: 'Downloads go through fetchNetworkJson (src/embed/fetchNetwork.ts), and nothing sends a network file anywhere. A new request needs its own reviewed exception in eslint.config.js.',
        })),
      ],
      'no-restricted-properties': [
        'error',
        { object: 'navigator', property: 'sendBeacon', message: 'Nothing sends data from the viewer or the playground.' },
      ],
    },
  },
  {
    // Viewer components: px sizes only
    files: ['src/components/**/*.{ts,tsx}', 'src/embed/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': ['error', ...UNTRUSTED_HTML, ...NO_REM],
    },
  },
  {
    // The reviewed requests: the limited download, the example page's own network file, and the
    // feedback form, which sends only what its notice lists
    files: ['src/embed/fetchNetwork.ts', 'src/examplePage/main.ts', 'src/playground/sendFeedback.ts'],
    rules: {
      'no-restricted-globals': 'off',
    },
  },
  {
    // The playground uses the package like a React user: through `src/api.ts`. The exceptions below
    // are playground helpers and dev tools, each a known gap in the public API, not a free pass.
    files: ['src/playground/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [NO_PORTALS],
          // Regular expressions, because `group` negations do not work with `../` paths. Allowed:
          // the tap target size shared with the viewer's buttons, the loading and error states of a
          // network that is not on screen yet, the icon registry for bundling the Labs icons up front,
          // and the size limit for files a visitor opens.
          patterns: [
            {
              regex:
                '^\\.\\./(schema/|index$|web-component$|components/(?!hud/(touchTarget|NetworkErrorState|NetworkLoadingState)$|nodes/icons/)|embed/(?!fetchNetwork$))',
              message: 'The playground uses the package through its public API: import from ../api. Exceptions are listed in eslint.config.js.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['*.config.{js,ts}', 'scripts/**/*.mjs', 'tests/e2e/**/*.mjs'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
);
