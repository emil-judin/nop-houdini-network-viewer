import { expect, test, type Locator } from '@playwright/test';

/** The `assets` example in `<houdini-network touch-pan="one-finger">` (`tests/e2e/host/navigation.html`). */
async function openAssets(page: import('@playwright/test').Page): Promise<Locator> {
  await page.goto('/host/navigation.html');
  const viewer = page.locator('#nav');
  await expect(viewer.locator('.react-flow__node[data-id="scene"]')).toBeVisible();
  await expect(viewer.locator('.react-flow')).not.toHaveClass(/nop-first-fit-pending/);
  return viewer;
}

const viewportTransform = (viewer: Locator) =>
  viewer.locator('.react-flow__viewport').evaluate((el) => (el as HTMLElement).style.transform);

const zoomOf = (transform: string) => Number(/scale\(([\d.e-]+)\)/.exec(transform)?.[1]);

test.describe('Navigation', () => {
  test('NOP-NAV-001: the network is fitted on load with room around it', async ({ page }) => {
    const viewer = await openAssets(page);
    const canvas = (await viewer.locator('.react-flow').boundingBox())!;
    const nodes = viewer.locator('.react-flow__node');
    const count = await nodes.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const box = (await nodes.nth(i).boundingBox())!;
      expect(box.x).toBeGreaterThan(canvas.x);
      expect(box.y).toBeGreaterThan(canvas.y);
      expect(box.x + box.width).toBeLessThan(canvas.x + canvas.width);
      expect(box.y + box.height).toBeLessThan(canvas.y + canvas.height);
    }
  });

  test('NOP-NAV-001: the fit frames the node names, not only the node boxes', async ({ page, hasTouch }) => {
    await page.goto('/host/fit.html');
    const viewer = page.locator('#fit');
    await expect(viewer.locator('.react-flow')).not.toHaveClass(/nop-first-fit-pending/);
    const canvas = (await viewer.locator('.react-flow').boundingBox())!;
    // The long name sticks out far to the right of the boxes, so a fit of the boxes alone cuts it off
    const names = viewer.locator('[data-nop-fit-extent]');
    await expect(names).toHaveCount(2);
    const rightEdgeOfNames = async () =>
      Math.max(...(await Promise.all((await names.all()).map(async (name) => (await name.boundingBox())!))).map((box) => box.x + box.width));
    expect(await rightEdgeOfNames()).toBeLessThan(canvas.x + canvas.width);
    for (const name of await names.all()) expect((await name.boundingBox())!.y).toBeGreaterThan(canvas.y);
    // The same after H, which fits again from a zoomed-in view (wheel and keys: desktop only)
    if (hasTouch) return;
    await viewer.locator('.react-flow__pane').click({ position: { x: 20, y: 20 } });
    await page.mouse.wheel(0, -600);
    await expect.poll(rightEdgeOfNames).toBeGreaterThan(canvas.x + canvas.width);
    await page.keyboard.press('h');
    await expect.poll(rightEdgeOfNames).toBeLessThan(canvas.x + canvas.width);
  });

  test('NOP-NAV-004: with touch-pan "one-finger", one finger pans, two fingers zoom and the page stays', async ({ page, hasTouch }) => {
    test.skip(!hasTouch, 'touch profiles only');
    const viewer = await openAssets(page);
    const canCreateTouches = await page.evaluate(() => {
      try {
        return Boolean(new Touch({ identifier: 0, target: document.body }));
      } catch {
        return false;
      }
    });
    test.skip(!canCreateTouches, 'this browser cannot create touch events from script (WebKit)');
    // Dispatches a touch event on the canvas; each finger is [x, y] in canvas pixels
    const touch = (type: string, fingers: Array<[number, number]>, changed: number[]) =>
      viewer.locator('.react-flow__pane').evaluate(
        (pane, { type, fingers, changed }) => {
          const box = pane.getBoundingClientRect();
          const touches = fingers.map(
            ([x, y], identifier) => new Touch({ identifier, target: pane, clientX: box.left + x, clientY: box.top + y }),
          );
          const active = type === 'touchend' ? touches.filter((_, index) => !changed.includes(index)) : touches;
          pane.dispatchEvent(
            new TouchEvent(type, {
              touches: active,
              targetTouches: active,
              changedTouches: touches.filter((_, index) => changed.includes(index)),
              bubbles: true,
              cancelable: true,
              composed: true,
            }),
          );
        },
        { type, fingers, changed },
      );

    const fitted = await viewportTransform(viewer);
    await touch('touchstart', [[40, 40]], [0]);
    await touch('touchmove', [[90, 120]], [0]);
    await touch('touchend', [[90, 120]], [0]);
    await expect.poll(() => viewportTransform(viewer)).not.toBe(fitted);
    expect(zoomOf(await viewportTransform(viewer))).toBeCloseTo(zoomOf(fitted), 5);

    const panned = await viewportTransform(viewer);
    await touch('touchstart', [[100, 100]], [0]);
    await touch('touchstart', [[100, 100], [140, 100]], [1]);
    await touch('touchmove', [[60, 100], [200, 100]], [0, 1]);
    await touch('touchend', [[60, 100], [200, 100]], [0, 1]);
    await expect.poll(async () => zoomOf(await viewportTransform(viewer))).toBeGreaterThan(zoomOf(panned));
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test('NOP-NAV-021: two taps on a subnetwork within 400 milliseconds open it', async ({ page, hasTouch }) => {
    test.skip(!hasTouch, 'touch profiles only');
    const viewer = await openAssets(page);
    const box = (await viewer.locator('.react-flow__node[data-id="scene"]').boundingBox())!;
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.touchscreen.tap(x, y);
    await page.touchscreen.tap(x, y);
    await expect(viewer.locator('.react-flow__node[data-id="pebble_scatter1"]')).toBeVisible();
    await expect(viewer.getByRole('navigation', { name: 'Network path' }).locator('[aria-current="location"]')).toHaveText('scene');
  });
});
