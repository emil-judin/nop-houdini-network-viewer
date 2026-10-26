import { transform } from 'esbuild';
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
    plugins: [react(), tailwindcss(), ...(isWebComponent ? [minifyBrowserBundle()] : [])],
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
