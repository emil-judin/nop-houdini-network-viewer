import { createHash } from 'node:crypto';
import { transform } from 'esbuild';
import MagicString from 'magic-string';
import postcss from 'postcss';
import { defineConfig, type Plugin, type Rollup } from 'vite';
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
      // `sourcemap: 'external'` returns the map of this step, which Rollup chains with the earlier ones,
      // so `web-component.js.map` matches the minified file
      const result = await transform(code, { minify: true, format: 'esm', target: 'es2022', sourcemap: 'external' });
      return { code: result.code, map: result.map || null };
    },
  };
}

/** A WOFF2 font inlined as a data URI (Vite library mode inlines every asset). */
const FONT_DATA_URI = /data:font\/woff2;base64,[A-Za-z0-9+/=]+/g;
const FONT_DATA_PREFIX = 'data:font/woff2;base64,';

/**
 * Moves the fonts out of the bundles into `dist/fonts/`: `style.css` and the web component then
 * stay small, do not block on 70 KB of base64, and the browser caches the fonts on their own.
 * In `style.css` the fonts are referenced relative to the stylesheet; in the web component the
 * script makes the URLs absolute at run time (`resolveFontUrls` in `src/web-component.ts`).
 */
function emitFontFiles(): Plugin {
  const fileNames = new Map<string, string>();

  /** Font file name for a data URI, emitting the file the first time it is seen. */
  const fontFile = (context: Pick<Rollup.PluginContext, 'emitFile'>, dataUri: string): string => {
    let fileName = fileNames.get(dataUri);
    if (!fileName) {
      const bytes = Buffer.from(dataUri.slice(FONT_DATA_PREFIX.length), 'base64');
      fileName = `fonts/wop-${createHash('sha256').update(bytes).digest('hex').slice(0, 12)}.woff2`;
      context.emitFile({ type: 'asset', fileName, source: bytes });
      fileNames.set(dataUri, fileName);
    }
    return fileName;
  };

  return {
    name: 'emit-font-files',
    enforce: 'post',
    renderStart() {
      fileNames.clear();
    },
    renderChunk(code) {
      if (!code.includes(FONT_DATA_PREFIX)) return null;
      const output = new MagicString(code);
      for (const match of code.matchAll(FONT_DATA_URI)) {
        output.overwrite(match.index, match.index + match[0].length, `./${fontFile(this, match[0])}`);
      }
      return { code: output.toString(), map: output.generateMap({ hires: 'boundary' }) };
    },
    generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== 'asset' || !file.fileName.endsWith('.css')) continue;
        file.source = String(file.source).replace(FONT_DATA_URI, (uri) => `./${fontFile(this, uri)}`);
      }
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
export function scopeSelector(selector: string): string {
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
    plugins: [
      react(),
      tailwindcss(),
      emitFontFiles(),
      ...(isWebComponent ? [minifyBrowserBundle()] : [scopeStylesheetToViewer()]),
    ],
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
      // Parts loaded on demand (Parameter Inspector, SideFX Labs icons) are separate files in their own
      // folder; the web component imports them relative to `web-component.js`
      rollupOptions: {
        // The on-demand chunks import shared code straight from the entry file, instead of Rollup
        // moving everything into a second file behind a tiny entry (one request less)
        preserveEntrySignatures: 'allow-extension',
        ...(isWebComponent
          ? { output: { chunkFileNames: 'web-component-chunks/[name]-[hash].js' } }
          : { external: [/^react($|\/)/, /^react-dom($|\/)/, /^@xyflow\/react($|\/)/, /^lucide-react($|\/)/] }),
      },
    },
  };
});
