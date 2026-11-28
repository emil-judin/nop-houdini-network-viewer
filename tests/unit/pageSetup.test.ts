import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { openGraphUrls } from '../../vite.config';

const VIEWPORT = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';

describe('NOP-A11Y-006: page setup', () => {
  it('NOP-A11Y-006: index.html has the standard viewport meta tag and a language', () => {
    const html = readFileSync('index.html', 'utf8');
    expect(html).toContain(VIEWPORT);
    expect(html).toMatch(/<html lang="en">/);
  });

  it.runIf(existsSync('dist-playground/index.html'))('NOP-A11Y-006: the built playground keeps the viewport meta tag', () => {
    expect(readFileSync('dist-playground/index.html', 'utf8')).toMatch(/<meta name="viewport" content="width=device-width, initial-scale=1\.0"\s*\/?>/);
  });
});

describe('NOP-PG-037: search engines and link previews', () => {
  it.each(['index.html', 'example-site.html'])('NOP-PG-037: %s keeps search engines out', (page) => {
    expect(readFileSync(page, 'utf8')).toContain('<meta name="robots" content="noindex, nofollow" />');
  });

  /** The tags the build adds to `page` for this site address. */
  function openGraphTags(siteUrl: string | undefined, page: string) {
    const transform = openGraphUrls(siteUrl).transformIndexHtml;
    if (typeof transform !== 'function') throw new Error('openGraphUrls has no plain transformIndexHtml hook');
    const context = { path: page, filename: page.slice(1) } as Parameters<typeof transform>[1];
    // The hook does not use its plugin context (`this`), so the test passes an empty one
    return transform.call({} as ThisParameterType<typeof transform>, '<html></html>', context);
  }

  it('NOP-PG-037: with a site address, og:url and og:image are absolute URLs', async () => {
    const tags = await openGraphTags('https://someone.github.io/nop-houdini-network-viewer', '/index.html');
    expect(tags).toEqual([
      { tag: 'meta', attrs: { property: 'og:url', content: 'https://someone.github.io/nop-houdini-network-viewer/' }, injectTo: 'head' },
      { tag: 'meta', attrs: { property: 'og:image', content: 'https://someone.github.io/nop-houdini-network-viewer/og-image.png' }, injectTo: 'head' },
    ]);
  });

  it('NOP-PG-037: without a site address, and on the example page, no link preview tags are added', async () => {
    expect(await openGraphTags(undefined, '/index.html')).toEqual([]);
    expect(await openGraphTags('https://someone.github.io/nop/', '/example-site.html')).toEqual([]);
  });
});
