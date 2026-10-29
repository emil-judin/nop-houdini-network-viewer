import { createReadStream, existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
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

const ROOT = fileURLToPath(new URL('./', import.meta.url));

/** Example networks published as plain files (same folders as `src/playground/examples.ts`). */
function exampleNetworkFiles(): Map<string, string> {
  const files = new Map<string, string>();
  for (const folder of ['fixtures', join('fixtures', 'examples')]) {
    const dir = join(ROOT, folder);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (name.endsWith('-network.json')) files.set(name, join(dir, name));
    }
  }
  return files;
}

/** Files of the web component build in `dist/` (`npm run build:lib`) that a page needs to load it. */
function webComponentFiles(): string[] {
  const dist = join(ROOT, 'dist');
  if (!existsSync(join(dist, 'web-component.js'))) return [];
  const list = (dir: string): string[] =>
    readdirSync(join(dist, dir)).flatMap((name) => {
      const path = dir ? `${dir}/${name}` : name;
      return statSync(join(dist, path)).isDirectory() ? list(path) : [path];
    });
  return ['web-component.js', ...list('web-component-chunks'), ...list('fonts')].filter((path) => !path.endsWith('.map'));
}

const CONTENT_TYPES: Record<string, string> = {
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
};

/**
 * Publishes what the embed snippets and `public/example-site.html` load, next to the playground page:
 *
 * - `examples/<name>-network.json`: the example networks, at stable addresses a snippet can point to.
 * - `lib/`: the `<houdini-network>` web component from `dist/`, so the example site shows the real
 *   package. Run `npm run build:lib` before `npm run build` (the deploy workflow does).
 *
 * The dev server serves the same paths from `fixtures/` and `dist/`.
 */
function exampleSiteFiles(): Plugin {
  return {
    name: 'nop-example-site-files',
    configureServer(server) {
      if (webComponentFiles().length === 0) {
        server.config.logger.warn('dist/web-component.js not found: run `npm run build:lib` once, or the example site page shows no networks.');
      }
      server.middlewares.use((req, res, next) => {
        const path = decodeURIComponent((req.url ?? '').split('?')[0]);
        let file: string | undefined;
        if (path.startsWith('/examples/')) {
          file = exampleNetworkFiles().get(path.slice('/examples/'.length));
        } else if (path.startsWith('/lib/')) {
          const relative = path.slice('/lib/'.length);
          if (webComponentFiles().includes(relative)) file = join(ROOT, 'dist', relative);
          // A clear 404 instead of the playground page, which the browser would refuse as a script
          if (!file) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(`${path} is not built: run \`npm run build:lib\`.`);
            return;
          }
        }
        if (!file) return next();
        res.setHeader('Content-Type', CONTENT_TYPES[extname(file)] ?? 'application/octet-stream');
        createReadStream(file).pipe(res);
      });
    },
    generateBundle() {
      for (const [name, file] of exampleNetworkFiles()) {
        this.emitFile({ type: 'asset', fileName: `examples/${name}`, source: readFileSync(file) });
      }
      const libFiles = webComponentFiles();
      if (libFiles.length === 0) {
        this.warn('dist/web-component.js not found: run `npm run build:lib` first, or the example site page shows no networks.');
      }
      for (const path of libFiles) {
        this.emitFile({ type: 'asset', fileName: `lib/${path}`, source: readFileSync(join(ROOT, 'dist', path)) });
      }
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
    exampleSiteFiles(),
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
