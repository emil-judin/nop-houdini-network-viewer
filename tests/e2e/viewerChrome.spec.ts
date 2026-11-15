import { expect, test, type Locator, type Page } from '@playwright/test';

/** The for_each example with the overview and Download JSON (`tests/e2e/host/chrome.html`). */
async function openViewer(page: Page): Promise<Locator> {
  await page.goto('/host/chrome.html');
  const viewer = page.locator('#chrome');
  await expect(viewer.locator('.react-flow__node').first()).toBeVisible();
  await expect(viewer.locator('.react-flow')).not.toHaveClass(/nop-first-fit-pending/);
  return viewer;
}

const transform = (viewer: Locator) => viewer.locator('.react-flow__viewport').evaluate((el) => (el as HTMLElement).style.transform);
const zoomOf = (value: string) => Number(/scale\(([\d.e-]+)\)/.exec(value)?.[1]);

test.describe('Viewer chrome', () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(isMobile, 'desktop mouse, keyboard and window sizes');
  });

  test('NOP-HUD-011: O and the overview button toggle the overview', async ({ page }) => {
    const viewer = await openViewer(page);
    const overview = viewer.locator('.react-flow__minimap');
    const button = viewer.getByRole('button', { name: 'Network overview' });
    await expect(overview).toBeVisible();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await viewer.locator('.react-flow__pane').click({ position: { x: 20, y: 20 } });
    await page.keyboard.press('o');
    await expect(overview).toHaveCount(0);
    await expect(button).toHaveAttribute('aria-pressed', 'false');
    await button.click();
    await expect(overview).toBeVisible();
  });

  test('NOP-HUD-012: narrow viewers hide the overview and its button, wider ones show it', async ({ page }) => {
    const viewer = await openViewer(page);
    await viewer.evaluate((el) => (el.style.width = '447px'));
    await expect(viewer.locator('.react-flow__minimap')).toHaveCount(0);
    await expect(viewer.getByRole('button', { name: 'Network overview' })).toBeHidden();
    await expect(viewer.getByRole('button', { name: 'View settings' })).toBeVisible();
    await viewer.evaluate((el) => (el.style.width = '448px'));
    await expect(viewer.locator('.react-flow__minimap')).toBeVisible();
    await expect(viewer.getByRole('button', { name: 'Network overview' })).toBeVisible();
  });

  test('NOP-HUD-013: a click and a drag in the overview move the view, the wheel zooms', async ({ page }) => {
    const viewer = await openViewer(page);
    const overview = (await viewer.locator('.react-flow__minimap').boundingBox())!;
    const before = await transform(viewer);
    await page.mouse.click(overview.x + overview.width * 0.2, overview.y + overview.height * 0.2);
    await expect.poll(() => transform(viewer)).not.toBe(before);
    const clicked = await transform(viewer);
    expect(zoomOf(clicked)).toBeCloseTo(zoomOf(before), 5);

    await page.mouse.move(overview.x + overview.width * 0.3, overview.y + overview.height * 0.3);
    await page.mouse.down();
    await page.mouse.move(overview.x + overview.width * 0.7, overview.y + overview.height * 0.6, { steps: 6 });
    await page.mouse.up();
    await expect.poll(() => transform(viewer)).not.toBe(clicked);

    const dragged = await transform(viewer);
    await page.mouse.move(overview.x + overview.width / 2, overview.y + overview.height / 2);
    await page.mouse.wheel(0, -300);
    await expect.poll(async () => zoomOf(await transform(viewer))).not.toBeCloseTo(zoomOf(dragged), 5);
  });

  test('NOP-HUD-020: native fullscreen where supported', async ({ page }) => {
    const viewer = await openViewer(page);
    await viewer.getByRole('button', { name: 'Enter fullscreen' }).click();
    await expect
      .poll(() => viewer.evaluate((el) => Boolean(el.shadowRoot?.fullscreenElement?.classList.contains('nop-root'))))
      .toBe(true);
    const exit = viewer.getByRole('button', { name: 'Exit fullscreen' });
    await expect(exit).toHaveClass(/bg-\[#474e62\]/);
    // Escape is handled by the browser itself, which leaves fullscreen and fires fullscreenchange
    await page.evaluate(() => document.exitFullscreen());
    await expect(viewer.getByRole('button', { name: 'Enter fullscreen' })).toBeVisible();
    expect(await page.evaluate(() => document.fullscreenElement)).toBeNull();
  });

  test('NOP-HUD-031: Download JSON saves for_each.json with the document', async ({ page }) => {
    const viewer = await openViewer(page);
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      viewer.getByRole('button', { name: 'Download network JSON file' }).click(),
    ]);
    expect(download.suggestedFilename()).toBe('for_each.json');
    const path = await download.path();
    const { readFileSync } = await import('node:fs');
    const document = JSON.parse(readFileSync(path, 'utf8')) as { root: { path: string; nodes: unknown[] } };
    expect(document.root.path).toBe('/obj/for_each');
    expect(document.root.nodes.length).toBeGreaterThan(0);
  });
});
