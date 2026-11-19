import { expect, test } from '@playwright/test';

test.describe('<houdini-network> on a hostile host page', () => {
  test('NOP-EMB-001: loads from src, with fonts and Labs icons as separate files', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (request) => requests.push(new URL(request.url()).pathname));
    await page.goto('/host/web-component.html');
    const board = page.locator('#board');
    await expect(board.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    // P-05: fonts come from dist/fonts, next to the script
    await expect.poll(() => requests.some((path) => /^\/lib\/fonts\/nop-[0-9a-f]+\.woff2$/.test(path))).toBe(true);
    // P-03: the Labs drawings load because the second network uses Labs tools (fixtures/edge-cases/labs-tools.json)
    const labs = page.locator('#labs');
    await expect(labs.locator('.react-flow__node[data-id="lot_subdivision1"]')).toBeVisible();
    expect(requests.some((path) => path.startsWith('/lib/web-component-chunks/'))).toBe(true);
  });

  test('NOP-ICON-012: a network downloads only the icon files it uses', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (request) => requests.push(new URL(request.url()).pathname));
    await page.goto('/host/web-component.html');
    const board = page.locator('#board');
    await expect(board.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    await expect(page.locator('#labs .react-flow__node[data-id="lot_subdivision1"]')).toBeVisible();
    // Both networks on the page together still need only some of the ten SOP domains
    const domainFiles = new Set(
      requests.flatMap((path) => /^\/lib\/web-component-chunks\/(sop-[a-z]+)-/.exec(path)?.[1] ?? []),
    );
    expect(domainFiles.size).toBeGreaterThan(0);
    expect(domainFiles.size).toBeLessThan(10);
    await expect(board.locator('.react-flow__node svg[data-nop-icon]').first()).toBeVisible();
    await expect(board.locator('svg[data-nop-icon="default"]')).toHaveCount(0);
  });

  test('NOP-HUD-015: the middle mouse button pans inside the viewer and never auto-scrolls there', async ({ page, isMobile }) => {
    test.skip(isMobile, 'no middle mouse button on touch profiles');
    await page.goto('/host/web-component.html');
    const board = page.locator('#board');
    await expect(board.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    // Whether each middle-button press had its default (auto-scroll) cancelled, read once the event is done
    // (React Flow stops it on the canvas, so it never bubbles up to the page)
    await page.evaluate(() => {
      const record = window as unknown as { middleDown: boolean[] };
      record.middleDown = [];
      window.addEventListener(
        'mousedown',
        (event) => {
          if (event.button === 1) setTimeout(() => record.middleDown.push(event.defaultPrevented), 0);
        },
        true,
      );
    });
    const viewportTransform = () => board.locator('.react-flow__viewport').evaluate((el) => (el as HTMLElement).style.transform);
    const before = await viewportTransform();
    const area = (await board.locator('.react-flow').boundingBox())!;
    await page.mouse.move(area.x + 20, area.y + 20);
    await page.mouse.down({ button: 'middle' });
    await page.mouse.move(area.x + 140, area.y + 80, { steps: 6 });
    await page.mouse.up({ button: 'middle' });
    await expect.poll(viewportTransform).not.toBe(before);

    // Outside the viewer the page keeps the browser's own middle-button behaviour
    const heading = (await page.getByRole('heading', { name: 'Blog post' }).boundingBox())!;
    await page.mouse.click(heading.x + 5, heading.y + 5, { button: 'middle' });
    // Each press is recorded a moment after its event, so wait for both
    await expect.poll(() => page.evaluate(() => (window as unknown as { middleDown: boolean[] }).middleDown)).toEqual([true, false]);
  });

  test('NOP-HUD-024: the fullscreen button fills the screen, fits the network and gives the space back', async ({ page }) => {
    await page.goto('/host/web-component.html');
    const board = page.locator('#board');
    await expect(board.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    const viewer = board.locator('.nop-root');
    const viewportTransform = () => board.locator('.react-flow__viewport').evaluate((el) => (el as HTMLElement).style.transform);
    const before = await viewportTransform();
    await board.getByRole('button', { name: 'Enter fullscreen' }).click();
    // Native fullscreen covers the whole screen, which can be larger than the page viewport (Firefox)
    const screenSize = page.viewportSize()!;
    await expect.poll(async () => (await viewer.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(screenSize.height);
    expect((await viewer.boundingBox())?.width ?? 0).toBeGreaterThanOrEqual(screenSize.width);
    // The network is fitted to the bigger area
    await expect.poll(viewportTransform).not.toBe(before);
    await board.getByRole('button', { name: 'Exit fullscreen' }).click();
    await expect.poll(async () => (await viewer.boundingBox())?.height).toBe(480);
    await expect.poll(viewportTransform).toBe(before);
  });

  test('NOP-NAV-006 and 003: dragging the empty canvas pans, a double-click on it fits the whole network', async ({ page, isMobile }) => {
    test.skip(isMobile, 'mouse drag and double-click');
    await page.goto('/host/web-component.html');
    const board = page.locator('#board');
    await expect(board.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    const viewportTransform = () => board.locator('.react-flow__viewport').evaluate((el) => (el as HTMLElement).style.transform);
    const fitted = await viewportTransform();
    const area = (await board.locator('.react-flow').boundingBox())!;
    await page.mouse.move(area.x + 12, area.y + 12);
    await page.mouse.down();
    await page.mouse.move(area.x + 160, area.y + 90, { steps: 6 });
    await page.mouse.up();
    await expect.poll(viewportTransform).not.toBe(fitted);
    await page.mouse.dblclick(area.x + 12, area.y + 12);
    await expect.poll(viewportTransform).toBe(fitted);
  });

  test('NOP-NAV-010: on touch screens one finger scrolls past the viewer and two fingers move the network', async ({ page, hasTouch }) => {
    test.skip(!hasTouch, 'touch profiles only');
    await page.goto('/host/web-component.html');
    const board = page.locator('#board');
    await expect(board.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    const canCreateTouches = await page.evaluate(() => {
      try {
        return Boolean(new Touch({ identifier: 0, target: document.body }));
      } catch {
        return false;
      }
    });
    test.skip(!canCreateTouches, 'this browser cannot create touch events from script (WebKit)');
    const viewportTransform = () => board.locator('.react-flow__viewport').evaluate((el) => (el as HTMLElement).style.transform);
    // Dispatches a touch event on the canvas; each finger is [x, y] in canvas pixels
    const touch = (type: string, fingers: Array<[number, number]>, changed: number[]) =>
      board.locator('.react-flow__pane').evaluate(
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
    const before = await viewportTransform();

    // One finger: the network stays (the page would scroll) and the hint appears
    await touch('touchstart', [[40, 40]], [0]);
    await touch('touchmove', [[60, 120]], [0]);
    await touch('touchend', [[60, 120]], [0]);
    expect(await viewportTransform()).toBe(before);
    await expect(board.getByText('Use two fingers to move the network').locator('..')).toHaveClass(/opacity-100/);

    // Two fingers: the network moves
    await touch('touchstart', [[40, 40]], [0]);
    await touch('touchstart', [[40, 40], [120, 40]], [1]);
    await touch('touchmove', [[70, 100], [150, 100]], [0, 1]);
    await touch('touchend', [[70, 100], [150, 100]], [0, 1]);
    await expect.poll(viewportTransform).not.toBe(before);

    // The hint's big fullscreen button opens fullscreen, where one finger moves the network
    await touch('touchstart', [[40, 40]], [0]);
    await touch('touchmove', [[60, 120]], [0]);
    await touch('touchend', [[60, 120]], [0]);
    await board.getByText('Open fullscreen').tap();
    await expect(board.getByRole('button', { name: 'Exit fullscreen' })).toBeVisible();
    await expect(board.getByText('Use two fingers to move the network').locator('..')).toHaveClass(/opacity-0/);
  });

  test('P-03: the Parameter Inspector downloads when a node is selected', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (request) => requests.push(new URL(request.url()).pathname));
    await page.goto('/host/web-component.html');
    const board = page.locator('#board');
    await board.locator('.react-flow__node[data-id="lift_tube"]').click();
    await expect(board.getByRole('complementary', { name: 'Parameters of lift_tube' })).toBeVisible();
    expect(requests.filter((path) => path.includes('ParameterInspector')).length).toBe(1);
  });

  test('NOP-EMB-012: host page styles do not reach inside the viewer', async ({ page }) => {
    await page.goto('/host/web-component.html');
    const fit = page.locator('#board').getByRole('button', { name: 'Enter fullscreen' });
    await expect(fit).toBeVisible();
    const background = await fit.evaluate((element) => getComputedStyle(element).backgroundColor);
    expect(background).not.toBe('rgb(255, 0, 0)');
    const margin = await fit.evaluate((element) => getComputedStyle(element).marginTop);
    expect(margin).toBe('0px');
    // The page's own button keeps its style
    const hostButton = page.locator('.host-button');
    expect(await hostButton.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgb(255, 0, 0)');
  });

  test('NOP-EMB-023 and S-03: a download that never ends is not waited for forever', async ({ page }) => {
    test.slow();
    await page.goto('/host/web-component.html');
    await page.evaluate(() => {
      const element = document.createElement('houdini-network');
      element.id = 'slow';
      element.setAttribute('src', '/slow.json');
      document.body.append(element);
    });
    await expect(page.locator('#slow').getByRole('alert')).toContainText('took longer than 30 seconds', { timeout: 45_000 });
  });
});
