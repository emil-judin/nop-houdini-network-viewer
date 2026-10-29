// ESLint flat config for NOP: TypeScript, React hooks rules (a missing hook dependency shipped once)
// and accessibility checks for JSX. Run with `npm.cmd run lint`.
import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

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
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      ...jsxA11y.flatConfigs.recommended.rules,
      // Focusable on purpose: scrollable code regions (axe: scrollable-region-focusable) and the panel splitter
      'jsx-a11y/no-noninteractive-tabindex': ['error', { roles: ['tabpanel', 'region', 'separator'], tags: [] }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
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
          // Regular expressions, because `group` negations do not work with `../` paths. Allowed:
          // the tap target size shared with the viewer's buttons, the loading and error states of a
          // network that is not on screen yet, the icons and node shapes for the Icon Review Gallery
          // (dev server only) and for bundling the Labs icons up front, and the size limit for files
          // a visitor opens.
          patterns: [
            {
              regex:
                '^\\.\\./(schema/|index$|web-component$|components/(?!hud/(touchTarget|NetworkErrorState|NetworkLoadingState)$|nodes/icons/|nodes/shapes/nodeShapes$)|embed/(?!fetchNetwork$))',
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
