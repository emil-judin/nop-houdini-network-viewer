import { expect, test, type Locator, type Page } from '@playwright/test';

/** The `assets` example in `<houdini-network>` (`tests/e2e/host/navigation.html`). */
async function openAssets(page: Page): Promise<Locator> {
  await page.goto('/host/navigation.html');
  const viewer = page.locator('#nav');
  await expect(viewer.locator('.react-flow__node[data-id="scene"]')).toBeVisible();
  await expect(viewer.locator('.react-flow')).not.toHaveClass(/nop-first-fit-pending/);
  return viewer;
}

const searchField = (viewer: Locator) => viewer.getByRole('textbox', { name: 'Find node by name or type' });
const currentLevel = (viewer: Locator) =>
  viewer.getByRole('navigation', { name: 'Network path' }).locator('[aria-current="location"]');

/** Records on the host page whether the last key press was prevented (read with `lastKeyPrevented`). */
async function watchKeys(page: Page) {
  await page.evaluate(() => {
    window.addEventListener('keydown', (event) => {
      (window as unknown as { lastKeyPrevented: boolean }).lastKeyPrevented = event.defaultPrevented;
    });
  });
}
const lastKeyPrevented = (page: Page) => page.evaluate(() => (window as unknown as { lastKeyPrevented: boolean }).lastKeyPrevented);

test.describe('Node search', () => {
  test('NOP-FIND-001: slash opens the search, Enter opens the level of a match inside a subnetwork', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard flow on desktop profiles');
    const viewer = await openAssets(page);
    await viewer.locator('.react-flow__pane').click({ position: { x: 20, y: 20 } });
    await page.keyboard.press('/');
    await expect(searchField(viewer)).toBeFocused();
    await expect(searchField(viewer)).toHaveValue('');
    // NOP-FIND-007
    await page.keyboard.type('polybevel');
    await page.keyboard.press('Enter');
    await expect(currentLevel(viewer)).toHaveText('details');
    await expect(viewer.getByRole('complementary', { name: 'Parameters of polybevel1' })).toBeVisible();
    await expect(viewer.locator('.react-flow__node[data-id="polybevel1"]')).toHaveClass(/selected/);
    await expect(viewer.getByRole('search').getByRole('status')).toHaveText('1 of 1');
    await expect(searchField(viewer)).toBeFocused();
    // The framed node is inside the canvas
    const canvas = (await viewer.locator('.react-flow').boundingBox())!;
    await expect
      .poll(async () => {
        const box = (await viewer.locator('.react-flow__node[data-id="polybevel1"]').boundingBox())!;
        return box.x > canvas.x && box.x + box.width < canvas.x + canvas.width && box.y > canvas.y && box.y + box.height < canvas.y + canvas.height;
      })
      .toBe(true);
  });

  test('NOP-FIND-002: Ctrl+F opens the search only while the viewer has focus', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard flow on desktop profiles');
    const viewer = await openAssets(page);
    await watchKeys(page);
    await page.locator('body > p').click();
    await page.keyboard.press('Control+f');
    expect(await lastKeyPrevented(page)).toBe(false);
    await expect(viewer.getByRole('search')).toHaveCount(0);

    await viewer.locator('.react-flow__pane').click({ position: { x: 20, y: 20 } });
    await page.keyboard.press('Control+f');
    expect(await lastKeyPrevented(page)).toBe(true);
    await expect(searchField(viewer)).toBeFocused();
  });

  test('NOP-FIND-008: Ctrl+G, Ctrl+Shift+G, Shift+. and Shift+, step through the matches', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard flow on desktop profiles');
    const viewer = await openAssets(page);
    await viewer.locator('.react-flow__pane').click({ position: { x: 20, y: 20 } });
    await page.keyboard.press('/');
    await page.keyboard.type('merge');
    await page.keyboard.press('Enter');
    await expect(currentLevel(viewer)).toHaveText('scene');
    await page.keyboard.press('Control+g');
    await expect(currentLevel(viewer)).toHaveText('props');
    await expect(viewer.getByRole('search').getByRole('status')).toHaveText('2 of 2');
    await page.keyboard.press('Control+Shift+g');
    await expect(currentLevel(viewer)).toHaveText('scene');
    await page.keyboard.press('Escape');
    await expect(viewer.getByRole('search')).toHaveCount(0);
    await expect(viewer.locator('.react-flow__node[data-id="merge1"]')).toBeFocused();
    await page.keyboard.press('Shift+Period');
    await expect(currentLevel(viewer)).toHaveText('props');
    await page.keyboard.press('Shift+Comma');
    await expect(currentLevel(viewer)).toHaveText('scene');
  });

  test('NOP-FIND-003: on a touch screen the search button and arrow buttons find nodes', async ({ page, hasTouch }) => {
    test.skip(!hasTouch, 'touch profiles only');
    const viewer = await openAssets(page);
    const button = viewer.getByRole('button', { name: 'Find node' });
    await button.tap();
    const field = searchField(viewer);
    await expect(field).toBeVisible();
    // Finger-sized targets, and 16px text so iOS Safari does not zoom into the field
    for (const target of [button, field, viewer.getByRole('button', { name: 'Next match' }), viewer.getByRole('button', { name: 'Close node search' })]) {
      const box = (await target.boundingBox())!;
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
    expect(await field.evaluate((input) => getComputedStyle(input).fontSize)).toBe('16px');
    // Across the canvas width in narrow viewers (phones), a 340 pixel field in wider ones (tablets)
    const canvas = (await viewer.locator('.react-flow').boundingBox())!;
    const bar = (await viewer.getByRole('search').boundingBox())!;
    if (canvas.width < 448) expect(bar.width).toBeGreaterThan(canvas.width - 24);
    else expect(bar.width).toBeCloseTo(340, 0);

    await field.fill('merge');
    await viewer.getByRole('button', { name: 'Next match' }).tap();
    await expect(currentLevel(viewer)).toHaveText('scene');
    await viewer.getByRole('button', { name: 'Next match' }).tap();
    await expect(currentLevel(viewer)).toHaveText('props');
    await viewer.getByRole('button', { name: 'Previous match' }).tap();
    await expect(currentLevel(viewer)).toHaveText('scene');
    await viewer.getByRole('button', { name: 'Close node search' }).tap();
    await expect(viewer.getByRole('search')).toHaveCount(0);
  });
});
