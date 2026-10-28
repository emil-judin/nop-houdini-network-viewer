// ESLint flat config for NOP: TypeScript, React hooks rules (a missing hook dependency shipped once)
// and accessibility checks for JSX. Run with `npm.cmd run lint`.
import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'dist-playground/**', 'public/**', 'local-refs/**', 'design/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
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
    files: ['*.config.{js,ts}', 'scripts/**/*.mjs'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
);
