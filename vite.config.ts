import { createReadStream, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Local-only SideFX reference icons (built by `scripts/build_local_reference_icons.py`, gitignored).
 */
const LOCAL_REFERENCE_ICONS = fileURLToPath(new URL('./local-refs/houdini_ref_icons.json', import.meta.url));

/**
 * Serves the local reference icons to the Icon Review Gallery during `vite` dev only.
 * `apply: 'serve'` keeps the proprietary icons out of every production build.
 */
function localReferenceIcons(): Plugin {
  return {
    name: 'local-houdini-reference-icons',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__local_houdini_ref_icons.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        if (!existsSync(LOCAL_REFERENCE_ICONS)) {
          res.end('{}');
          return;
        }
        createReadStream(LOCAL_REFERENCE_ICONS).pipe(res);
      });
    },
  };
}

/**
 * Vite configuration for the WOP playground and development server.
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), localReferenceIcons()],
  // Relative asset URLs, so the playground also works from a sub-path such as GitHub Pages (`/<repo>/`)
  base: './',
  build: {
    // `dist/` belongs to the library build (`npm.cmd run build:lib`)
    outDir: 'dist-playground',
  },
  server: {
    port: 5173,
    open: false,
  },
});
