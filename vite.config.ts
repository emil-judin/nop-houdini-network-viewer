import { createReadStream, existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Local-only SideFX reference icons (built by a local script that is not in the repository, gitignored).
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
    transformIndexHtml(_html, context) {
      // Only the playground page: the example page is not meant to be shared or indexed
      if (!siteUrl || !context.path.endsWith('/index.html')) return [];
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
  // Only the playground examples: other files in `fixtures/` are not published
  const dir = join(ROOT, 'fixtures', 'examples');
  if (!existsSync(dir)) return files;
  for (const name of readdirSync(dir)) {
    if (name.endsWith('-network.json')) files.set(name, join(dir, name));
  }
  return files;
}

/**
 * Number of top-level nodes of each example network, by file name, so the Networks pane can show it
 * before an example is loaded (the files themselves load only when their example is opened).
 */
function exampleNodeCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const [name, file] of exampleNetworkFiles()) {
    const network = JSON.parse(readFileSync(file, 'utf8')) as { root?: { nodes?: unknown } };
    const nodes = network.root?.nodes;
    if (Array.isArray(nodes)) counts[name] = nodes.length;
  }
  return counts;
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
 * Publishes what the embed snippets and `example-site.html` load, next to the playground page:
 *
 * - `examples/<name>-network.json`: the example networks, at stable addresses a snippet can point to.
 * - `lib/`: the `<houdini-network>` web component from `dist/`, so the example site shows the real
 *   package. Run `npm run build:lib` before `npm run build` (the deploy workflow does).
 *
 * The dev server serves the same paths from `fixtures/examples/` and `dist/`.
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

/**
 * Puts NOP's `LICENSE` and `THIRD_PARTY_NOTICES.md` next to the playground page: the site ships
 * third-party fonts (SIL Open Font License) and libraries whose licenses must travel with them.
 */
function licenseFiles(): Plugin {
  return {
    name: 'nop-license-files',
    generateBundle() {
      for (const name of ['LICENSE', 'THIRD_PARTY_NOTICES.md']) {
        const file = join(ROOT, name);
        if (!existsSync(file)) {
          this.error(`${name} not found: run \`node scripts/build_third_party_notices.mjs\` after \`npm run build:lib\`.`);
        }
        this.emitFile({ type: 'asset', fileName: name === 'LICENSE' ? 'LICENSE.txt' : name, source: readFileSync(file) });
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

/** Adds `CONTENT_SECURITY_POLICY` to the built pages (the playground and the example page). */
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
    licenseFiles(),
    openGraphUrls(loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL),
    contentSecurityPolicy(),
  ],
  define: {
    __NOP_VERSION__: JSON.stringify(PACKAGE.version),
    __NOP_PACKAGE_NAME__: JSON.stringify(PACKAGE.name),
    __NOP_EXAMPLE_NODE_COUNTS__: JSON.stringify(exampleNodeCounts()),
  },
  // Relative asset URLs, so the playground also works from a sub-path such as GitHub Pages (`/<repo>/`)
  base: './',
  build: {
    // `dist/` belongs to the library build (`npm.cmd run build:lib`)
    outDir: 'dist-playground',
    // Two pages: the playground and the example page its Embed button opens
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        example: fileURLToPath(new URL('./example-site.html', import.meta.url)),
      },
    },
    // The largest chunks are example networks (JSON data), each loaded only when its example is opened
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
    open: false,
  },
}));
