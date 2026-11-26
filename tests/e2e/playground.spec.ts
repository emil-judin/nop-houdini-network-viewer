import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

/** Collects console errors and Content-Security-Policy violations of a page. */
function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

const node = (page: Page, name: string) => page.locator(`.react-flow__node[data-id="${name}"]`);

/** Whether the networks panel is open, once the page shows either the panel or its folded strip. */
async function networksPanelOpen(page: Page): Promise<boolean> {
  const panel = page.getByRole('complementary', { name: 'Networks' });
  await expect(panel.or(page.getByRole('button', { name: 'Show networks panel' }))).toBeVisible();
  return panel.isVisible();
}

/** Row of the networks panel; on phones the panel starts folded, so it is opened first. */
async function networkRow(page: Page, name: string | RegExp) {
  const panel = page.getByRole('complementary', { name: 'Networks' });
  if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
  return panel.getByRole('button', { name });
}

/** Drops a file on the page, like dragging it from the desktop. */
async function dropFile(page: Page, name: string, content: string) {
  const dataTransfer = await page.evaluateHandle(
    ([fileName, text]) => {
      const transfer = new DataTransfer();
      transfer.items.add(new File([text], fileName, { type: 'application/json' }));
      return transfer;
    },
    [name, content] as const,
  );
  await page.dispatchEvent('body', 'drop', { dataTransfer });
}

/** Pastes `text` like Ctrl+V does, on the element `selector` (the page itself by default). */
async function paste(page: Page, text: string, selector = 'body') {
  await page.evaluate(
    ([value, where]) => {
      const transfer = new DataTransfer();
      transfer.setData('text/plain', value);
      const event = new Event('paste', { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'clipboardData', { value: transfer });
      document.querySelector(where)?.dispatchEvent(event);
    },
    [text, selector] as const,
  );
}

/** The "Your Files" group of the networks panel, opened first on phones. */
async function yourFiles(page: Page) {
  if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
  return page
    .getByRole('complementary', { name: 'Networks' })
    .locator('section', { has: page.getByRole('heading', { name: 'Your Files' }) });
}

/** Waits two frames, so a state change the page would make has been drawn. */
const nextFrames = (page: Page) => page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

const START_HERE = readFileSync('fixtures/examples/start_here-network.json', 'utf8');

// Local builds may carry a real feedback key (.env.local): no test may ever reach the feedback service
test.beforeEach(async ({ context }) => {
  await context.route('https://api.web3forms.com/**', (route) => route.abort());
});

test.describe('playground', () => {
  test('NOP-PG-001: opens with the first example, without errors or CSP violations', async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto('/');
    // There is no menu bar: the page heading is only for screen readers
    await expect(page.getByRole('heading', { level: 1, name: /NOP/ })).toBeAttached();
    if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
    const examples = page.getByRole('complementary', { name: 'Networks' }).locator('section', { has: page.getByRole('heading', { name: 'Examples' }) });
    await expect(examples.getByRole('button').first()).toHaveAttribute('aria-current', 'true');
    await expect(page.locator('.react-flow__node').first()).toBeVisible();
    await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveCount(1);
    expect(errors).toEqual([]);
  });

  test('NOP-PG-002: an ?example= link opens that example', async ({ page }) => {
    await page.goto('/?example=vex');
    await expect(await networkRow(page, /^VEX Wrangles/)).toHaveAttribute('aria-current', 'true');
    await expect(node(page, 'wrangle_rings')).toBeVisible();
  });

  test('NOP-PG-042: every example row shows its node count before it is opened', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (request) => requests.push(request.url()));
    await page.goto('/?example=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    for (const name of [/^Start Here/, /^VEX Wrangles/, /^For-Each Loop/, /^Parameters/, /^Node Looks/, /^Subnetworks and Assets/, /^Shared Selection/]) {
      await expect(await networkRow(page, name)).toContainText(/\d+ nodes/);
    }
    // The counts come with the page, the other examples are still not downloaded
    expect(requests.some((url) => url.includes('parameters-network'))).toBe(false);
  });

  test('NOP-PG-051: the Shared Selection example shows stubs where the selection continues', async ({ page }) => {
    await page.goto('/?example=selection');
    await expect(node(page, 'place_trees')).toBeVisible();
    // Two wires come in from outside and the last node feeds two items outside, one stub per wire
    const stubs = (name: string) => page.locator(`.react-flow__node[data-id="stubs:${name}"] [data-testid="outside-wire-stubs"] path`);
    await expect(stubs('scatter_trees')).toHaveCount(1);
    await expect(stubs('place_trees')).toHaveCount(3);
    await expect(stubs('random_size')).toHaveCount(0);
    // Every stub is fully inside the framed view, and the items outside are never named
    for (const stub of await page.locator('[data-testid="outside-wire-stubs"] path').all()) await expect(stub).toBeInViewport();
    await expect(page.locator('.react-flow')).not.toContainText(/hills|tree_shape|terrain_and_trees|TREES_ONLY/);
  });

  test('P-04: an example downloads only when it is chosen', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (request) => requests.push(request.url()));
    await page.goto('/?example=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    // Parameters is the largest example (a Full Parms export)
    expect(requests.some((url) => url.includes('parameters-network'))).toBe(false);
    await (await networkRow(page, /^Parameters/)).click();
    await expect(node(page, 'CONTROLS')).toBeVisible();
    expect(requests.some((url) => url.includes('parameters-network'))).toBe(true);
  });

  test('NOP-PG-004: a dropped export shows in its own row of the networks panel', async ({ page }) => {
    await page.goto('/?example=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    await dropFile(page, 'merge-out-of-order.json', readFileSync('fixtures/edge-cases/merge-out-of-order.json', 'utf8'));
    await expect(node(page, 'merge1')).toBeVisible();
    await expect(await networkRow(page, /merge-out-of-order\.json/)).toHaveAttribute('aria-current', 'true');
  });

  test('NOP-PG-043: own files collect under "Your Files", between its title and the open box', async ({ page }) => {
    await page.goto('/?example=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
    const panel = page.getByRole('complementary', { name: 'Networks' });
    const yourFiles = panel.locator('section', { has: page.getByRole('heading', { name: 'Your Files' }) });
    // The title and the box show before any file is opened
    await expect(yourFiles.getByRole('heading', { name: 'Your Files' })).toBeVisible();
    await expect(yourFiles.getByRole('button', { name: 'Open file' })).toBeVisible();
    await expect(yourFiles.getByRole('listitem')).toHaveCount(0);
    await expect(yourFiles.getByText('No networks uploaded')).toBeVisible();

    const merge = readFileSync('fixtures/edge-cases/merge-out-of-order.json', 'utf8');
    await dropFile(page, 'merge-out-of-order.json', merge);
    await expect(node(page, 'merge1')).toBeVisible();
    await dropFile(page, 'minimized-box.json', readFileSync('fixtures/edge-cases/minimized-box.json', 'utf8'));
    await expect(node(page, 'merge1')).toHaveCount(0);
    // The same file again reloads its row instead of adding one
    await dropFile(page, 'merge-out-of-order.json', merge);
    await expect(node(page, 'merge1')).toBeVisible();
    if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
    await expect(yourFiles.getByRole('listitem')).toHaveText([/merge-out-of-order\.json/, /minimized-box\.json/]);
    await expect(yourFiles.getByText('No networks uploaded')).toHaveCount(0);
    await expect(yourFiles.getByRole('button', { name: /merge-out-of-order\.json/ })).toHaveAttribute('aria-current', 'true');
    // The rows sit above the box
    const rowsBottom = (await yourFiles.getByRole('list').boundingBox())!;
    const box = (await yourFiles.getByRole('button', { name: 'Open file' }).boundingBox())!;
    expect(rowsBottom.y + rowsBottom.height).toBeLessThanOrEqual(box.y);
    // Switching back to an earlier file shows it again
    await yourFiles.getByRole('button', { name: /minimized-box\.json/ }).click();
    await expect(node(page, 'merge1')).toHaveCount(0);
  });

  test('NOP-PG-009: a broken file shows a readable error and keeps the current network', async ({ page }) => {
    await page.goto('/?example=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    await dropFile(page, 'broken.json', '{"foo": 1}');
    await expect(page.getByRole('alert')).toContainText('Could not read broken.json');
    await expect(node(page, 'lift_tube')).toBeVisible();
  });

  test('NOP-PG-005: dragging selected text shows no drop overlay, dragging a file does', async ({ page }) => {
    await page.goto('/?example=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    const overlay = page.getByText('Drop your Houdini network .json file');
    const text = await page.evaluateHandle(() => {
      const transfer = new DataTransfer();
      transfer.setData('text/plain', 'selected words');
      return transfer;
    });
    await page.dispatchEvent('body', 'dragenter', { dataTransfer: text });
    await nextFrames(page);
    await expect(overlay).toHaveCount(0);
    const file = await page.evaluateHandle(() => {
      const transfer = new DataTransfer();
      transfer.items.add(new File(['{}'], 'a-network.json', { type: 'application/json' }));
      return transfer;
    });
    await page.dispatchEvent('body', 'dragenter', { dataTransfer: file });
    await expect(overlay).toBeVisible();
    await expect(page.getByText('It stays in your browser and is never uploaded.')).toBeVisible();
    await page.dispatchEvent('body', 'dragleave', { dataTransfer: file });
    await expect(overlay).toHaveCount(0);
  });

  test('NOP-PG-006: Ctrl+V pastes an export into a row named after its network', async ({ page }) => {
    await page.goto('/?example=vex');
    await expect(node(page, 'wrangle_rings')).toBeVisible();
    await paste(page, START_HERE);
    await expect(node(page, 'lift_tube')).toBeVisible();
    const files = await yourFiles(page);
    await expect(files.getByRole('button', { name: /^Pasted: start_here/ })).toHaveAttribute('aria-current', 'true');
    // The same network pasted again reloads its row
    await paste(page, START_HERE);
    await expect(node(page, 'lift_tube')).toBeVisible();
    await expect((await yourFiles(page)).getByRole('listitem')).toHaveCount(1);
  });

  test.describe('NOP-PG-007: paste is ignored where it should not act', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/?example=start');
      await expect(node(page, 'lift_tube')).toBeVisible();
    });

    const nothingLoaded = async (page: Page) => {
      await nextFrames(page);
      await expect((await yourFiles(page)).getByText('No networks uploaded')).toBeVisible();
    };

    test('NOP-PG-007: clipboard text that does not start with "{"', async ({ page }) => {
      await paste(page, 'just some words');
      await nothingLoaded(page);
      await expect(page.getByRole('alert')).toHaveCount(0);
    });

    test('NOP-PG-007: focus in a text field', async ({ page }) => {
      // The hosted page has a text field only in the feedback form (builds with a key): a stand-in
      await page.evaluate(() => {
        const field = document.createElement('input');
        field.id = 'probe-field';
        document.body.append(field);
        field.focus();
      });
      await paste(page, START_HERE, '#probe-field');
      await nothingLoaded(page);
    });

    test('NOP-PG-007: the Exporter dialog is open', async ({ page }) => {
      if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
      await page.getByRole('button', { name: 'Get the exporter' }).click();
      const dialog = page.getByRole('dialog', { name: 'Get the Houdini exporter' });
      await expect(dialog).toBeVisible();
      await paste(page, START_HERE);
      await nextFrames(page);
      await dialog.getByRole('button', { name: 'Close' }).click();
      await expect(dialog).toBeHidden();
      await nothingLoaded(page);
    });
  });

  test.describe('NOP-PG-008: the Paste button', () => {
    /** Replaces the Clipboard API before the page loads: `readText` gives `json`, refuses, or is missing. */
    const clipboard = (page: Page, mode: 'allowed' | 'blocked' | 'missing') =>
      page.addInitScript(
        ([json, how]) => {
          const value =
            how === 'missing'
              ? undefined
              : { readText: () => (how === 'allowed' ? Promise.resolve(json) : Promise.reject(new DOMException('Denied', 'NotAllowedError'))) };
          Object.defineProperty(navigator, 'clipboard', { value, configurable: true });
        },
        [START_HERE, mode] as const,
      );

    const clickPaste = async (page: Page) => {
      await page.goto('/?example=vex');
      await expect(node(page, 'wrangle_rings')).toBeVisible();
      await (await yourFiles(page)).getByRole('button', { name: 'Paste' }).click();
    };

    test('NOP-PG-008: with clipboard access the clipboard network is shown', async ({ page }) => {
      await clipboard(page, 'allowed');
      await clickPaste(page);
      await expect(node(page, 'lift_tube')).toBeVisible();
      await expect((await yourFiles(page)).getByRole('button', { name: /^Pasted: start_here/ })).toHaveAttribute('aria-current', 'true');
    });

    test('NOP-PG-008: blocked clipboard access suggests Ctrl+V', async ({ page }) => {
      await clipboard(page, 'blocked');
      await clickPaste(page);
      await expect(page.getByRole('alert')).toContainText('Clipboard access was blocked. Press Ctrl+V (Cmd+V on a Mac) instead.');
      await expect(node(page, 'wrangle_rings')).toBeVisible();
    });

    test('NOP-PG-008: a browser without the Clipboard API suggests Ctrl+V', async ({ page }) => {
      await clipboard(page, 'missing');
      await clickPaste(page);
      await expect(page.getByRole('alert')).toContainText('This browser cannot read the clipboard from a button. Press Ctrl+V (Cmd+V on a Mac) instead.');
    });
  });

  test('NOP-PG-010: a file from a newer exporter is refused with an update hint', async ({ page }) => {
    await page.goto('/?example=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    await dropFile(page, 'schema-2.json', readFileSync('fixtures/edge-cases/schema-2.json', 'utf8'));
    await expect(page.getByRole('alert')).toContainText('Could not read schema-2.json');
    await expect(page.getByRole('alert')).toContainText('made by a newer NOP exporter');
    await expect(node(page, 'lift_tube')).toBeVisible();
  });

  test('NOP-PG-030: the exporter dialog downloads the Houdini package', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'the zip is the same file in every browser');
    await page.goto('/?example=start');
    if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
    await page.getByRole('button', { name: 'Get the exporter' }).click();
    const link = page.getByRole('dialog', { name: 'Get the Houdini exporter' }).getByRole('link', { name: /Download nop-exporter\.zip/ });
    // Relative to the page, so it also works from the GitHub Pages sub-path
    await expect(link).toHaveAttribute('href', './downloads/nop-exporter.zip');
    const [download] = await Promise.all([page.waitForEvent('download'), link.click()]);
    expect(download.suggestedFilename()).toBe('nop-exporter.zip');
    const zip = readFileSync(await download.path());
    // Zip entries keep their names uncompressed in the file headers
    expect(zip.subarray(0, 2).toString('latin1')).toBe('PK');
    for (const entry of ['nop.json', 'nop/scripts/python/nop_exporter.py']) expect(zip.includes(entry)).toBe(true);
  });

  for (const way of ['Escape', 'the backdrop', 'Close'] as const) {
    test(`NOP-PG-031: a dialog closes with ${way} and gives focus back`, async ({ page }) => {
      await page.goto('/?example=start');
      if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
      const opener = page.getByRole('button', { name: 'Get the exporter' });
      // Opened from the keyboard: some browsers do not focus a clicked button
      await opener.focus();
      await page.keyboard.press('Enter');
      const dialog = page.getByRole('dialog', { name: 'Get the Houdini exporter' });
      await expect(dialog).toBeVisible();
      if (way === 'Escape') await page.keyboard.press('Escape');
      else if (way === 'Close') await dialog.getByRole('button', { name: 'Close' }).click();
      else await page.mouse.click(4, 4);
      await expect(dialog).toBeHidden();
      await expect(opener).toBeFocused();
    });
  }

  test('NOP-PG-048: the status bar says the project is not affiliated with SideFX', async ({ page }) => {
    await page.goto('/?example=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    await expect(page.getByRole('contentinfo').getByText(/^Not affiliated with SideFX\./).filter({ visible: true })).toHaveCount(1);
  });

  test('NOP-PG-012: the status bar shows the Houdini, exporter and playground versions', async ({ page }) => {
    await page.goto('/?example=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    const statusBar = page.getByRole('contentinfo');
    await expect(statusBar).toContainText('Houdini 22.0.466');
    await expect(statusBar).toContainText(/Exporter \d+\.\d+\.\d+/);
    await expect(statusBar).toContainText(/Playground \d+\.\d+\.\d+/);
  });

  test('NOP-PG-038: the example page does not jump while its viewers and panels load', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'layout shift entries are a Chromium API');
    await page.goto('/example-site.html');
    await expect(page.locator('#embedder section.embed select').first()).toBeVisible();
    await expect(page.locator('main section.embed')).toHaveCount(2);
    await page.waitForTimeout(500);
    const shift = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let total = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as Array<PerformanceEntry & { value: number }>) total += entry.value;
          }).observe({ type: 'layout-shift', buffered: true });
          setTimeout(() => resolve(total), 100);
        }),
    );
    expect(shift).toBeLessThan(0.01);
  });

  // The layout shift score misses both of these: the first viewer grew from 480 to 600px at the
  // bottom of the screen, and every viewer showed its nodes unfitted for one frame
  test('NOP-PG-038: the first example viewer keeps its height and shows its network only when framed', async ({ page }) => {
    await page.addInitScript(() => {
      const samples: Array<{ height: number; opacity: string; transform: string; nodes: number }> = [];
      (window as unknown as { __samples: typeof samples }).__samples = samples;
      const start = performance.now();
      const tick = () => {
        const host = document.querySelector('houdini-network');
        if (host) {
          const viewport = host.shadowRoot?.querySelector<HTMLElement>('.react-flow__viewport');
          samples.push({
            height: Math.round(host.getBoundingClientRect().height),
            opacity: viewport ? getComputedStyle(viewport).opacity : '',
            transform: viewport ? getComputedStyle(viewport).transform : '',
            nodes: host.shadowRoot?.querySelectorAll('.react-flow__node').length ?? 0,
          });
        }
        if (performance.now() - start < 2500) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    await page.goto('/example-site.html');
    await page.waitForTimeout(2700);
    const samples = await page.evaluate(
      () => (window as unknown as { __samples: Array<{ height: number; opacity: string; transform: string; nodes: number }> }).__samples,
    );
    expect(samples.length).toBeGreaterThan(0);
    expect(new Set(samples.map((s) => s.height)).size).toBe(1);
    const shown = samples.filter((s) => s.nodes > 0 && s.opacity !== '0');
    expect(shown.length).toBeGreaterThan(0);
    const framed = shown[shown.length - 1].transform;
    expect(framed).not.toBe('matrix(1, 0, 0, 1, 0, 0)');
    expect(shown.every((s) => s.transform === framed)).toBe(true);
  });

  test('NOP-PG-013: on phones the pane scrolls as one, the status bar is short and the page never scrolls', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) >= 768, 'phone layout only');
    await page.goto('/?example=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    const statusBar = page.getByRole('contentinfo');
    await expect(statusBar.getByText(/^\d+\.\d+\.\d+/)).toBeVisible();
    await expect(statusBar.getByText('Houdini 22.0.466')).toBeHidden();
    await expect(statusBar.getByText('Not affiliated with SideFX.').filter({ visible: true })).toBeVisible();

    await page.getByRole('button', { name: 'Show networks panel' }).click();
    const panel = page.getByRole('complementary', { name: 'Networks' });
    // The footer buttons scroll with everything else and come into view at the bottom
    const exporter = panel.getByRole('button', { name: 'Get the exporter' });
    await exporter.scrollIntoViewIfNeeded();
    await expect(exporter).toBeInViewport();
    const box = (await exporter.boundingBox())!;
    expect(box.height).toBeLessThan(40);
    // The page itself has nothing to scroll
    const [scrollHeight, innerHeight] = await page.evaluate(() => [document.documentElement.scrollHeight, window.innerHeight]);
    expect(scrollHeight).toBeLessThanOrEqual(innerHeight);
  });

  test('NOP-PG-013: the networks panel folds and unfolds', async ({ page }) => {
    await page.goto('/?example=start');
    const panel = page.getByRole('complementary', { name: 'Networks' });
    if (await networksPanelOpen(page)) await page.getByRole('button', { name: 'Hide networks panel' }).click();
    await expect(panel).toHaveCount(0);
    await page.getByRole('button', { name: 'Show networks panel' }).click();
    await expect(panel).toBeVisible();
    // On phones the panel floats over the network, and a tap beside it folds it again
    if (await page.evaluate(() => !matchMedia('(min-width: 768px)').matches)) {
      const screen = page.viewportSize()!;
      await page.mouse.click(screen.width - 20, screen.height / 2);
      await expect(panel).toHaveCount(0);
      await expect(page.getByRole('complementary', { name: /^Parameters of / })).toHaveCount(0);
    }
  });

  test('NOP-HUD-025: narrow viewers show only the level on screen and no Download JSON button', async ({ page, isMobile }) => {
    test.skip(isMobile, 'narrows a desktop window and dives with a mouse double-click');
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/?example=assets');
    const path = page.getByRole('navigation', { name: 'Network path' });
    const download = page.getByRole('button', { name: 'Download network JSON file' });
    await node(page, 'scene').dblclick();
    await expect(path.locator('[aria-current="location"]')).toContainText('scene');
    // The parent level is in the page but not shown
    const parent = path.getByRole('button', { name: 'assets', exact: true, includeHidden: true });
    await expect(parent).toBeAttached();
    await expect(parent).toBeHidden();
    await expect(download).toBeHidden();
    // Back and forward stay and move between the levels
    await path.getByRole('button', { name: 'Go back to the previous network' }).click();
    await expect(path.locator('[aria-current="location"]')).toContainText('assets');
    await expect(node(page, 'scene')).toBeVisible();
    // Wider viewers show the whole path, with the level just left dimmed, and the Download button
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(path.getByRole('button', { name: 'scene', exact: true })).toBeVisible();
    await expect(download).toBeVisible();
  });

  test('NOP-PG-036: the playground has no icon gallery, not even with ?icons', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (request) => requests.push(request.url()));
    await page.goto('/?icons');
    if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
    const panel = page.getByRole('complementary', { name: 'Networks' });
    const examples = panel.locator('section', { has: page.getByRole('heading', { name: 'Examples' }) });
    await expect(examples.getByRole('button').first()).toHaveAttribute('aria-current', 'true');
    await expect(panel.getByRole('heading', { name: 'Development' })).toHaveCount(0);
    await expect(page.getByText('Icons Overview')).toHaveCount(0);
    expect(requests.some((url) => url.includes('__local_houdini_ref_icons'))).toBe(false);
  });

  test('NOP-PG-014: the networks panel holds the about block and the exporter download', async ({ page }) => {
    await page.goto('/?example=start');
    const panel = page.getByRole('complementary', { name: 'Networks' });
    if (!(await networksPanelOpen(page))) {
      // Folded: the status bar names the product instead of the pane's logo
      await expect(page.getByRole('contentinfo')).toContainText('NOP');
      await page.getByRole('button', { name: 'Show networks panel' }).click();
    }
    await expect(page.getByRole('banner')).toHaveCount(0);
    await expect(panel.getByText(/Version \d+\.\d+\.\d+/)).toHaveCount(0);
    await panel.getByRole('button', { name: 'Get the exporter' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('NOP-PG-003: Open file loads a chosen export', async ({ page }) => {
    await page.goto('/?example=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
    const chooser = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Open file' }).click();
    await (await chooser).setFiles('fixtures/edge-cases/merge-out-of-order.json');
    await expect(node(page, 'merge1')).toBeVisible();
    await expect(await networkRow(page, /merge-out-of-order\.json/)).toHaveAttribute('aria-current', 'true');
  });

  test('NOP-PG-016: Embed opens the example page with the Start Here example and working code', async ({ page, context, request }) => {
    // Whatever the playground shows, the page shows Start Here
    await page.goto('/?example=vex');
    await expect(node(page, 'wrangle_rings')).toBeVisible();
    // Embed sits at the bottom of the Networks pane, not above the network
    await expect(page.getByRole('region', { name: 'Network view' }).getByRole('link', { name: /Embed/ })).toHaveCount(0);
    if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
    const [examplePage] = await Promise.all([context.waitForEvent('page'), page.getByRole('link', { name: 'Embed', exact: true }).click()]);
    expect(new URL(examplePage.url()).search).toBe('');
    const yours = examplePage.getByRole('region', { name: 'Embed a network on your website' });
    await expect(yours.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    const fileUrl = await yours.getByRole('textbox', { name: /Network file address/ }).inputValue();
    expect(fileUrl).toMatch(/^http:\/\/localhost:4173\/examples\/start_here-network\.json$/);
    expect((await request.get(fileUrl)).ok()).toBe(true);
    // The preview follows the options and the code says the same
    await yours.getByRole('combobox', { name: 'Label size' }).selectOption('large');
    await expect(yours.locator('houdini-network')).toHaveAttribute('label-size', 'large');
    await expect(yours.locator('pre')).toContainText('label-size="large"');
    // NOP-PG-041: the start node is picked from the network's nodes
    const liftTube = yours.locator('.react-flow__node[data-id="lift_tube"]');
    const nodeWidth = () => liftTube.evaluate((element) => element.getBoundingClientRect().width);
    const wholeNetworkWidth = await nodeWidth();
    await yours.getByRole('combobox', { name: 'Start framed on node' }).selectOption('lift_tube');
    await expect(yours.locator('houdini-network')).toHaveAttribute('focus-node', 'lift_tube');
    await expect(yours.locator('pre')).toContainText('focus-node="lift_tube"');
    // The preview frames the chosen node right away: it fills more of the viewer than in the whole-network view
    await expect.poll(nodeWidth).toBeGreaterThan(wholeNetworkWidth * 1.3);
    // The playground stays as it was in its own tab
    await expect(node(page, 'wrangle_rings')).toBeVisible();
  });
});

test.describe('embed tip', () => {
  // A browser that has seen the welcome card but not closed the embed tip
  test.use({
    storageState: {
      cookies: [],
      origins: [{ origin: 'http://localhost:4173', localStorage: [{ name: 'nop-playground-welcome-seen', value: '1' }] }],
    },
  });

  test('NOP-PG-047: an embed tip on the network points to the embed code until it is closed', async ({ page, context }) => {
    await page.clock.install();
    await page.goto('/?example=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    const view = page.getByRole('region', { name: 'Network view' });
    const tip = view.getByRole('complementary', { name: 'Embed this network' });
    // Not at once: it slides in 10 seconds after exploring started
    await page.clock.runFor(9_000);
    await expect(tip).toBeHidden();
    await page.clock.runFor(1_500);
    await expect(tip).toBeVisible();
    await tip.evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)));
    const wide = (page.viewportSize()?.width ?? 0) >= 768;
    // The picture is a screenshot of the real example page
    if (wide) await expect(tip.locator('img')).toHaveAttribute('src', /website.*\.jpg$/);
    const link = tip.getByRole('link', { name: wide ? 'Get the embed code' : 'Embed code' });
    const viewer = view.locator('.react-flow');
    const [tipBox, viewerBox] = [await tip.boundingBox(), await viewer.boundingBox()];
    if (!tipBox || !viewerBox) throw new Error('tip or viewer not laid out');
    if (wide) {
      // A card on the network, at its bottom left
      await expect(tip).toContainText('This viewer works on your website too');
      expect(tipBox.x - viewerBox.x).toBeLessThan(40);
      expect(viewerBox.y + viewerBox.height - (tipBox.y + tipBox.height)).toBeLessThan(40);
    } else {
      // A strip under the network that covers none of it, with finger-sized targets
      await expect(tip).toContainText('Works on any website');
      expect(tipBox.y).toBeGreaterThanOrEqual(viewerBox.y + viewerBox.height - 1);
      for (const target of [link, tip.getByRole('button', { name: 'Hide the embed tip' })]) {
        const box = await target.boundingBox();
        expect(box?.height).toBeGreaterThanOrEqual(44);
        expect(box?.width).toBeGreaterThanOrEqual(44);
      }
    }
    // Same destination as Embed in the Networks pane
    const [examplePage] = await Promise.all([context.waitForEvent('page'), link.click()]);
    expect(new URL(examplePage.url()).pathname).toMatch(/example-site\.html$/);
    await examplePage.close();

    // Switching networks keeps it; closing it removes it
    await (await networkRow(page, /^VEX Wrangles/)).click();
    await expect(node(page, 'wrangle_rings')).toBeVisible();
    await expect(tip).toBeVisible();
    await tip.getByRole('button', { name: 'Hide the embed tip' }).click();
    await expect(tip).toBeHidden();
  });

  test('NOP-PG-047: the embed tip comes on the first visit only, closed or not', async ({ page }) => {
    await page.clock.install();
    await page.goto('/?example=start');
    const tip = page.getByRole('region', { name: 'Network view' }).getByRole('complementary', { name: 'Embed this network' });
    await expect(node(page, 'lift_tube')).toBeVisible();
    await page.clock.runFor(10_500);
    await expect(tip).toBeVisible();
    // Left open, then the next visit
    await page.reload();
    await expect(node(page, 'lift_tube')).toBeVisible();
    await page.clock.runFor(30_000);
    await expect(tip).toBeHidden();
  });

  test('NOP-PG-047: on a first visit the wait starts when the welcome card closes', async ({ page }) => {
    await page.addInitScript(() => globalThis.localStorage.removeItem('nop-playground-welcome-seen'));
    await page.clock.install();
    await page.goto('/?example=start');
    const welcome = page.getByRole('dialog', { name: 'Welcome' });
    await expect(welcome).toBeVisible();
    const tip = page.getByRole('region', { name: 'Network view' }).getByRole('complementary', { name: 'Embed this network' });
    // Reading the welcome card does not count as exploring
    await page.clock.runFor(15_000);
    await expect(tip).toBeHidden();
    await welcome.getByRole('button', { name: 'Start exploring' }).click();
    await page.clock.runFor(9_000);
    await expect(tip).toBeHidden();
    await page.clock.runFor(1_500);
    await expect(tip).toBeVisible();
  });

  test('NOP-PG-050: an example that cannot be loaded says so, and the embed tip waits for a network', async ({ page }) => {
    // The example's network is a chunk of the build, downloaded when the example is opened
    await page.route('**/*vex_wrangles-network*', (route) => route.abort());
    await page.clock.install();
    await page.goto('/?example=vex');
    const view = page.getByRole('region', { name: 'Network view' });
    await expect(view.getByText('The example network could not be loaded. Reload the page to try again.')).toBeVisible();
    const tip = view.getByRole('complementary', { name: 'Embed this network' });
    await page.clock.runFor(10_500);
    await expect(tip).toBeHidden();
    // With a network on screen the tip comes
    await (await networkRow(page, /^Start Here/)).click();
    await expect(node(page, 'lift_tube')).toBeVisible();
    await expect(tip).toBeVisible();
  });
});

test.describe('first visit', () => {
  // A browser that has not seen the welcome card yet
  test.use({ storageState: { cookies: [], origins: [] } });

  test('NOP-PG-015: the welcome card shows once and comes back with Help', async ({ page }) => {
    await page.goto('/?example=start');
    const welcome = page.getByRole('dialog', { name: 'Welcome' });
    await expect(welcome).toBeVisible();
    // The example on screen is marked in the grid
    await expect(welcome.getByRole('button', { name: 'Start Here' })).toHaveAttribute('aria-current', 'true');
    await expect(welcome.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', /github\.com\/emil-judin\/nop-houdini-network-viewer#documentation$/);
    await expect(welcome.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/emil-judin/nop-houdini-network-viewer');
    await welcome.getByRole('button', { name: 'Start exploring' }).click();
    await expect(welcome).toBeHidden();

    await page.reload();
    await expect(node(page, 'lift_tube')).toBeVisible();
    await expect(welcome).toBeHidden();
    if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
    await page.getByRole('button', { name: 'Help' }).click();
    await expect(welcome).toBeVisible();
  });

  test('NOP-PG-019: the welcome card opens the examples, the exporter, a file and the embed code', async ({ page }) => {
    await page.goto('/?example=start');
    const welcome = page.getByRole('dialog', { name: 'Welcome' });
    await expect(node(page, 'lift_tube')).toBeAttached();
    await welcome.getByRole('button', { name: 'VEX Wrangles' }).click();
    await expect(welcome).toBeHidden();
    await expect(node(page, 'wrangle_rings')).toBeVisible();

    if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
    await page.getByRole('button', { name: 'Help' }).click();
    await welcome.getByRole('button', { name: 'Get the exporter' }).click();
    await expect(welcome).toBeHidden();
    const exporter = page.getByRole('dialog', { name: 'Get the Houdini exporter' });
    await expect(exporter).toBeVisible();
    await exporter.getByRole('button', { name: 'Close' }).click();

    if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
    await page.getByRole('button', { name: 'Help' }).click();
    const [chooser] = await Promise.all([page.waitForEvent('filechooser'), welcome.getByRole('button', { name: 'Open a network file' }).click()]);
    await expect(welcome).toBeHidden();
    await chooser.setFiles([]);

    if (!(await networksPanelOpen(page))) await page.getByRole('button', { name: 'Show networks panel' }).click();
    await page.getByRole('button', { name: 'Help' }).click();
    const [examplePage] = await Promise.all([page.context().waitForEvent('page'), welcome.getByRole('link', { name: 'Embed on your website' }).click()]);
    await expect(welcome).toBeHidden();
    await expect(examplePage.getByRole('region', { name: 'Embed a network on your website' }).locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
  });
});

test.describe('example page', () => {
  test('NOP-PG-017: the example page shows networks with the web component', async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto('/example-site.html');
    const viewers = page.locator('main houdini-network');
    await expect(viewers).toHaveCount(2);
    // The first network starts framed on twist_piece (focus-node); the viewer clips everything outside its view
    await viewers.first().scrollIntoViewIfNeeded();
    await expect(viewers.first().locator('.react-flow__node[data-id="twist_piece"]')).toBeInViewport({ ratio: 1 });
    await viewers.nth(1).scrollIntoViewIfNeeded();
    await expect(viewers.nth(1).locator('.react-flow__node[data-id="wrangle_rings"]')).toBeVisible();
    await page.getByRole('link', { name: 'Back to the NOP Playground' }).click();
    await expect(page.getByRole('heading', { level: 1, name: /NOP/ })).toBeAttached();
    expect(errors).toEqual([]);
  });

  test('NOP-PG-018: the example page shows the code under each network', async ({ page }) => {
    await page.goto('/example-site.html');
    // The embedder at the top shows the Start Here example
    const yours = page.getByRole('region', { name: 'Embed a network on your website' });
    await expect(yours.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    await expect(yours.getByRole('textbox', { name: /Network file address/ })).toHaveValue(/examples\/start_here-network\.json$/);
    const panels = page.getByRole('main').getByRole('region', { name: 'Embed code' });
    await expect(panels).toHaveCount(2);
    await expect(panels.first().locator('pre')).toContainText('examples/for_each-network.json');
    await expect(panels.first().locator('pre')).toContainText('focus-node="twist_piece"');
    await panels.nth(1).getByRole('tab', { name: 'iframe' }).click();
    await expect(panels.nth(1).locator('pre')).toContainText('<iframe');
    await expect(panels.nth(1).getByRole('tab', { name: 'iframe' })).toHaveAttribute('aria-selected', 'true');
  });
});

test.describe('wire style', () => {
  test('NOP-WIRE-022: the header buttons (the settings menu in narrow viewers) and Shift+S switch the wire style', async ({ page }) => {
    // The For-Each example has slanted wires (a vertical wire looks the same in both styles)
    await page.goto('/?example=foreach');
    const wires = page.locator('.react-flow__edge path');
    await expect(wires.first()).toBeAttached();
    // Only rounded wires have arc commands; the coordinates themselves move by fractions of a pixel
    const roundedWires = () => wires.evaluateAll((paths) => paths.filter((path) => path.getAttribute('d')?.includes('A')).length);
    expect(await roundedWires()).toBe(0);

    const settings = page.getByRole('button', { name: 'View settings' });
    const narrow = await settings.isVisible();
    if (narrow) {
      await settings.click();
      await page.getByRole('menuitemradio', { name: /^Rounded wires/ }).click();
      await expect(page.getByRole('menu')).toHaveCount(0);
    } else {
      await page.getByRole('button', { name: /^Rounded wires/ }).click();
    }
    await expect.poll(roundedWires).toBeGreaterThan(0);

    if (narrow) {
      await settings.click();
      await expect(page.getByRole('menuitemradio', { name: /^Rounded wires/ })).toHaveAttribute('aria-checked', 'true');
      await page.keyboard.press('Escape');
      await expect(page.getByRole('menu')).toHaveCount(0);
      await expect(settings).toBeFocused();
    } else {
      await expect(page.getByRole('button', { name: /^Rounded wires/ })).toHaveAttribute('aria-pressed', 'true');
    }

    // The focus is inside the viewer, so its hotkey works
    await page.keyboard.press('Shift+S');
    await expect.poll(roundedWires).toBe(0);
  });
});

test.describe('screenshot and overview', () => {
  test('NOP-HUD-033: the screenshot saves what the network shows as a PNG named after the level', async ({ page }) => {
    await page.goto('/?example=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    const settings = page.getByRole('button', { name: 'View settings' });
    const downloadPromise = page.waitForEvent('download');
    if (await settings.isVisible()) {
      await settings.click();
      await page.getByRole('menuitem', { name: 'Save screenshot (PNG)' }).click();
    } else {
      await page.getByRole('button', { name: 'Save screenshot' }).click();
    }
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('start_here.png');
    const bytes = readFileSync(await download.path());
    expect(bytes.subarray(1, 4).toString('ascii')).toBe('PNG');
    // The picture is the canvas only, drawn at least at twice its size on screen
    const canvas = (await page.locator('.react-flow').boundingBox())!;
    expect(bytes.readUInt32BE(16)).toBeGreaterThanOrEqual(Math.floor(canvas.width * 2) - 2);
    expect(bytes.length).toBeGreaterThan(20_000);
  });

  test('NOP-HUD-034: narrow viewers start without the overview and turn it on in the settings menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    // minimap=true opens the overview in wide viewers only
    await page.goto('/?embed=true&demo=start&minimap=true');
    await expect(node(page, 'lift_tube')).toBeVisible();
    await expect(page.locator('.react-flow__minimap')).toHaveCount(0);
    await page.getByRole('button', { name: 'View settings' }).click();
    await page.getByRole('menuitemcheckbox', { name: /Network overview/ }).click();
    await expect(page.locator('.react-flow__minimap')).toBeVisible();
  });
});

test.describe('parameter pane', () => {
  test('NOP-INSP-056: selecting a node the opening pane leaves visible does not move the view', async ({ page, isMobile }) => {
    test.skip(isMobile, 'phones use the bottom sheet');
    const transform = node(page, 'merge1');
    const viewportTransform = () => page.locator('.react-flow__viewport').evaluate((el) => (el as HTMLElement).style.transform);
    // A fake clock also drives animation frames: moving it on runs the start fit, the two frames
    // the viewer waits before it decides, and any pan, without waiting in real time
    await page.clock.install();
    await page.goto('/?embed=true&demo=start');
    await page.clock.runFor(2_000);
    await expect(transform).toBeVisible();
    const before = await viewportTransform();
    await transform.click();
    await expect(page.getByRole('complementary', { name: 'Parameters of merge1' })).toBeVisible();
    await page.clock.runFor(1_000);
    expect(await viewportTransform()).toBe(before);
  });

  test('NOP-INSP-056: a node the opening pane covers is panned into view', async ({ page, isMobile }) => {
    test.skip(isMobile, 'drag-panning with the mouse; phones use the bottom sheet');
    const transform = node(page, 'merge1');
    const canvas = page.locator('.react-flow');
    // Drag the node against the right edge, then select it
    await page.goto('/?embed=true&demo=start');
    await expect(transform).toBeVisible();
    const area = (await canvas.boundingBox())!;
    const box = (await transform.boundingBox())!;
    const shift = area.x + area.width - 12 - (box.x + box.width);
    await page.mouse.move(area.x + 30, area.y + 30);
    await page.mouse.down();
    await page.mouse.move(area.x + 30 + shift, area.y + 30, { steps: 8 });
    await page.mouse.up();
    await transform.click();
    await expect(page.getByRole('complementary', { name: 'Parameters of merge1' })).toBeVisible();
    await expect
      .poll(async () => {
        const visibleCanvas = (await canvas.boundingBox())!;
        const moved = (await transform.boundingBox())!;
        return moved.x + moved.width <= visibleCanvas.x + visibleCanvas.width;
      })
      .toBe(true);
  });
});

test.describe('code field', () => {
  test('NOP-INSP-047: the line number gutter is as tall as code that scrolls', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the code field is the same on phones');
    await page.goto('/?embed=true&demo=vex');
    await node(page, 'wrangle_rings').click();
    const region = page.getByRole('region', { name: 'VEX code' });
    await expect(region).toBeVisible();
    // The 29-line snippet is taller than the 320px field, so the field scrolls
    expect(await region.evaluate((el) => el.scrollHeight > el.clientHeight)).toBe(true);
    // The line numbers must not spill out of the gutter's grey box
    const gutter = region.locator('pre').first();
    expect(await gutter.evaluate((el) => el.scrollHeight - el.clientHeight)).toBeLessThanOrEqual(1);
  });
});

test.describe('embed page', () => {
  test('NOP-HUD-016: focus-node frames that node at the start, an unknown name fits everything', async ({ page }) => {
    const fan = node(page, 'twist_piece');
    await page.goto('/?embed=true&demo=foreach');
    await expect(fan).toBeVisible();
    const fittedWidth = (await fan.boundingBox())?.width ?? 0;

    await page.goto('/?embed=true&demo=foreach&focus-node=twist_piece');
    await expect(fan).toBeVisible();
    await expect.poll(async () => (await fan.boundingBox())?.width ?? 0).toBeGreaterThan(fittedWidth * 2);

    await page.goto('/?embed=true&demo=foreach&focus-node=no_such_node');
    await expect(fan).toBeVisible();
    await expect.poll(async () => Math.round((await fan.boundingBox())?.width ?? 0)).toBe(Math.round(fittedWidth));
  });

  test('NOP-EMB-030: the embed page shows only the viewer', async ({ page }) => {
    await page.goto('/?embed=true&demo=start');
    await expect(node(page, 'lift_tube')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(0);
  });

  test('NOP-EMB-033 and S-04: a network from another site is labelled with its host', async ({ page }) => {
    // The playground's Content-Security-Policy only allows https downloads from other sites, so this
    // plain-http test server is refused, but the caption still names where the file was meant to come from
    await page.goto('/?embed=true&src=http://localhost:4174/fixtures/examples/start_here-network.json');
    await expect(page.getByText('Network from localhost:4174, shown with the NOP viewer')).toBeVisible();
    await expect(page.getByRole('alert')).toContainText('Could not download');
  });

  test('NOP-EMB-031 and U-09: an unknown demo name falls back to the src loader message', async ({ page }) => {
    await page.goto('/?embed=true&demo=nope');
    await expect(page.getByRole('alert')).toContainText('No Houdini network file was given');
  });
});
