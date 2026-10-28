import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
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
 * Adds `og:url` and `og:image` to the playground page. Link previews (chat apps, social sites) need
 * absolute URLs, so the tags are only added when the hosted address is known (`VITE_SITE_URL`, set by
 * the GitHub Pages workflow).
 */
function openGraphUrls(siteUrl: string | undefined): Plugin {
  return {
    name: 'open-graph-urls',
    transformIndexHtml() {
      if (!siteUrl) return [];
      const base = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;
      return [
        { tag: 'meta', attrs: { property: 'og:url', content: base }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:image', content: `${base}og-image.png` }, injectTo: 'head' },
      ];
    },
  };
}

/** Name and version from `package.json`. Only these two values reach the browser, never the whole file. */
const PACKAGE = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as { name: string; version: string };

/**
 * Content-Security-Policy for the hosted playground, as a meta tag (GitHub Pages cannot send headers).
 * A second line of defence: scripts only from the playground itself, no plugins, no form posts.
 * `connect-src https:` keeps `?embed=true&src=https://...` and the feedback form working. Only added
 * to production builds, because the dev server injects inline scripts.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https: data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ');

/** Adds `CONTENT_SECURITY_POLICY` to the built playground page. */
function contentSecurityPolicy(): Plugin {
  return {
    name: 'content-security-policy',
    apply: 'build',
    transformIndexHtml() {
      return [
        {
          tag: 'meta',
          attrs: { 'http-equiv': 'Content-Security-Policy', content: CONTENT_SECURITY_POLICY },
          injectTo: 'head-prepend',
        },
      ];
    },
  };
}

/**
 * Vite configuration for the NOP playground and development server.
 */
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    localReferenceIcons(),
    openGraphUrls(loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL),
    contentSecurityPolicy(),
  ],
  define: {
    __NOP_VERSION__: JSON.stringify(PACKAGE.version),
    __NOP_PACKAGE_NAME__: JSON.stringify(PACKAGE.name),
  },
  // Relative asset URLs, so the playground also works from a sub-path such as GitHub Pages (`/<repo>/`)
  base: './',
  build: {
    // `dist/` belongs to the library build (`npm.cmd run build:lib`)
    outDir: 'dist-playground',
    // The largest chunk is the Circuit Gen demo network (JSON data, about 100 KB gzip), loaded only
    // when its tab is opened
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
    open: false,
  },
}));
