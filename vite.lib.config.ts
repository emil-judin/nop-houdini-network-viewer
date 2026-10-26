import { transform } from 'esbuild';
import postcss from 'postcss';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Fully minifies the web component bundle. Vite keeps whitespace in `es` library builds so that
 * bundlers can still tree-shake them, but `web-component.js` is loaded directly by browsers.
 */
function minifyBrowserBundle(): Plugin {
  return {
    name: 'minify-browser-bundle',
    async renderChunk(code) {
      const result = await transform(code, { minify: true, format: 'esm', target: 'es2022' });
      return { code: result.code, map: result.map || null };
    },
  };
}

/** Class on the outermost element of every viewer (see `src/styles/reset.css`). */
const VIEWER_ROOT = '.wop-root';

/** Matches the viewer root element itself and everything inside it, with the specificity of one class. */
const VIEWER_SCOPE = `:is(${VIEWER_ROOT}, ${VIEWER_ROOT} *)`;

/**
 * Scopes one selector of the npm stylesheet to the viewer. Every selector gains exactly one class of
 * specificity, so the order between the viewer's own rules stays as it was, while they now outrank a
 * host page's identically named utility classes and never match host elements.
 */
function scopeSelector(selector: string): string {
  const s = selector.trim();
  // Theme variables (`--spacing`, `--font-sans`, ...) would otherwise replace a host's Tailwind theme
  if (s === ':root' || s === ':host') return VIEWER_ROOT;
  if (new RegExp(`^\\${VIEWER_ROOT}(?![\\w-])`).test(s)) return `${VIEWER_ROOT}${s}`;
  if (s === '*') return VIEWER_SCOPE;
  // A type selector must come first in a compound selector, so scope it as a descendant
  if (/^[a-z]/i.test(s)) return `${VIEWER_ROOT} ${s}`;
  return `${VIEWER_SCOPE}${s}`;
}

/**
 * Scopes the npm stylesheet (`dist/style.css`) to the viewer: Tailwind utilities, React Flow overrides,
 * theme variables and the `--tw-*` fallbacks then only apply inside `.wop-root`, so they cannot restyle
 * the host page (or another React Flow diagram on it), and a host's own Tailwind classes cannot
 * restyle the viewer. The web component needs none of this: its Shadow DOM isolates its styles.
 */
function scopeStylesheetToViewer(): Plugin {
  return {
    name: 'scope-stylesheet-to-viewer',
    // After Vite's own CSS plugin, which emits `style.css` in its `generateBundle` hook
    enforce: 'post',
    async generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== 'asset' || !file.fileName.endsWith('.css')) continue;
        const root = postcss.parse(String(file.source));
        root.walkRules((rule) => {
          const parent = rule.parent;
          if (parent?.type === 'atrule' && /keyframes$/i.test((parent as postcss.AtRule).name)) return;
          // Nested rules (`&:hover`) are already inside a scoped parent
          if (rule.selector.includes('&')) return;
          rule.selectors = [...new Set(rule.selectors.map(scopeSelector))];
        });
        file.source = root.toString();
      }
    },
  };
}

/**
 * Library builds (`npm.cmd run build:lib` runs both modes into `dist/`):
 *
 * - `--mode npm`: ES + CommonJS modules for React apps (`dist/index.js`, `dist/index.cjs`) and the
 *   stylesheet `dist/style.css`. React, React Flow and Lucide stay external (peer / regular dependencies).
 * - `--mode web-component`: one self-contained ES module `dist/web-component.js` that defines
 *   `<houdini-network>` and bundles React, React Flow and the styles, for plain HTML pages.
 */
export default defineConfig(({ mode }) => {
  const isWebComponent = mode === 'web-component';
  return {
    plugins: [react(), tailwindcss(), ...(isWebComponent ? [minifyBrowserBundle()] : [scopeStylesheetToViewer()])],
    // The playground's `public/` folder is not part of the package
    publicDir: false,
    // React reads `process.env.NODE_ENV`, which library mode does not replace when React is bundled
    define: isWebComponent ? { 'process.env.NODE_ENV': JSON.stringify('production') } : {},
    build: {
      outDir: 'dist',
      // The npm build runs first and starts from an empty folder; the web component build adds to it
      emptyOutDir: !isWebComponent,
      sourcemap: true,
      lib: isWebComponent
        ? {
            entry: 'src/web-component.ts',
            formats: ['es'],
            fileName: () => 'web-component.js',
          }
        : {
            entry: 'src/index.ts',
            formats: ['es', 'cjs'],
            fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
            cssFileName: 'style',
          },
      rollupOptions: isWebComponent
        ? {}
        : { external: [/^react($|\/)/, /^react-dom($|\/)/, /^@xyflow\/react($|\/)/, /^lucide-react($|\/)/] },
    },
  };
});
