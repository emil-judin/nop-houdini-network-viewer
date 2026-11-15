import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/** Serious and critical axe violations of the current page, as readable lines. */
async function seriousViolations(page: Page): Promise<string[]> {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  return results.violations
    .filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
    .map((violation) => `${violation.id}: ${violation.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(', ')}`);
}

// Local builds may carry a real feedback key (.env.local): no test may ever reach the feedback service
test.beforeEach(async ({ context }) => {
  await context.route('https://api.web3forms.com/**', (route) => route.abort());
});

test.describe('accessibility', () => {
  test('NOP-A11Y-010: no serious axe violations in the playground', async ({ page }) => {
    await page.goto('/?example=start');
    await expect(page.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    expect(await seriousViolations(page)).toEqual([]);
  });

  test('NOP-A11Y-010: no serious axe violations with the inspector open', async ({ page }) => {
    await page.goto('/?example=start');
    await page.locator('.react-flow__node[data-id="lift_tube"]').click();
    await expect(page.getByRole('complementary', { name: 'Parameters of lift_tube' })).toBeVisible();
    expect(await seriousViolations(page)).toEqual([]);
  });

  test('NOP-A11Y-010: no serious axe violations on the example page with a network and its code', async ({ page }) => {
    await page.goto('/example-site.html');
    const yours = page.getByRole('region', { name: 'Embed a network on your website' });
    await expect(yours.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    expect(await seriousViolations(page)).toEqual([]);
  });

  test('NOP-A11Y-010: no serious axe violations on the embed page', async ({ page }) => {
    await page.goto('/?embed=true&demo=start');
    await expect(page.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    expect(await seriousViolations(page)).toEqual([]);
  });

  test('NOP-A11Y-020: operate the network with the keyboard', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard flow on desktop profiles');
    await page.goto('/?embed=true&demo=start');
    const transform = page.locator('.react-flow__node[data-id="lift_tube"]');
    await expect(transform).toBeVisible();
    // Tab moves through the toolbar and then reaches the nodes
    let reached = false;
    for (let i = 0; i < 30 && !reached; i++) {
      await page.keyboard.press('Tab');
      reached = await page.evaluate(() => document.activeElement?.classList.contains('react-flow__node') ?? false);
    }
    expect(reached).toBe(true);
    await transform.focus();
    await expect(transform).toHaveAttribute('aria-label', /node lift_tube/);
    await page.keyboard.press('Enter');
    const heading = page.getByRole('complementary', { name: 'Parameters of lift_tube' }).getByRole('heading', { level: 2 });
    await expect(heading).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('complementary')).toHaveCount(0);
    await expect(transform).toBeFocused();
  });

  test('NOP-A11Y-021: single-key shortcuts only act while the viewer has focus', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover only exists on desktop profiles');
    await page.goto('/host/web-component.html');
    const board = page.locator('#board');
    await expect(board.locator('.react-flow__minimap')).toBeVisible();
    await board.hover();
    await page.keyboard.press('o');
    await expect(board.locator('.react-flow__minimap')).toBeVisible();
    await board.locator('.react-flow__pane').click();
    await page.keyboard.press('o');
    await expect(board.locator('.react-flow__minimap')).toHaveCount(0);
  });
});

test.describe('phones and tablets', () => {
  test('NOP-A11Y-002: the playground fits the screen without sideways scrolling', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'phone and tablet profiles only');
    await page.goto('/?example=start');
    await expect(page.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('NOP-A11Y-003: touch targets are at least 44 pixels', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'touch profiles only');
    await page.goto('/?embed=true&demo=start');
    await expect(page.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    const small = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('nav[aria-label="Network path"] button:not(:disabled), .nop-root [role="group"] button, .nop-root button[aria-label]')]
        .filter((button) => button.offsetParent !== null)
        .map((button) => {
          const rect = button.getBoundingClientRect();
          return { name: button.getAttribute('aria-label') ?? button.textContent, width: rect.width, height: rect.height };
        })
        .filter((size) => size.width < 43.5 || size.height < 43.5),
    );
    expect(small).toEqual([]);
  });
});

/** Axe violations of one rule on the current page, as readable lines. */
async function ruleViolations(page: Page, rule: string): Promise<string[]> {
  const results = await new AxeBuilder({ page }).withRules([rule]).analyze();
  return results.violations.flatMap((violation) => violation.nodes.map((n) => `${violation.id}: ${n.target.join(' ')}`));
}

test.describe('every browser', () => {
  for (const url of ['/?example=start', '/?embed=true&demo=start']) {
    test(`NOP-A11Y-001: ${url} renders, inspects a node and enters a subnetwork`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
      await page.locator('.react-flow__node[data-id="OUT"]').click();
      await expect(page.getByRole('complementary', { name: 'Parameters of OUT' })).toBeVisible();
      await page.locator('.react-flow__node[data-id="details"]').click();
      await page.getByRole('button', { name: /Open subnetwork/ }).click();
      await expect(page.getByRole('navigation', { name: 'Network path' }).locator('[aria-current="location"]')).toContainText('details');
    });
  }
});

test.describe('names, roles and contrast', () => {
  test('NOP-A11Y-011: every button has an accessible name', async ({ page }) => {
    await page.goto('/?example=start');
    await page.locator('.react-flow__node[data-id="lift_tube"]').click();
    await expect(page.getByRole('complementary', { name: 'Parameters of lift_tube' })).toBeVisible();
    expect(await ruleViolations(page, 'button-name')).toEqual([]);
    await page.goto('/?embed=true&demo=start');
    await expect(page.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    const settings = page.getByRole('button', { name: 'View settings' });
    if (await settings.isVisible()) await settings.click();
    expect(await ruleViolations(page, 'button-name')).toEqual([]);
  });

  test('NOP-A11Y-012: playground dialogs are modal, named by their heading, and take focus', async ({ page }) => {
    const checkDialog = async (heading: string | RegExp) => {
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      expect(await dialog.evaluate((el) => el.matches(':modal'))).toBe(true);
      await expect(dialog).toHaveAccessibleName(heading);
      expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    };
    await page.addInitScript(() => window.localStorage.removeItem('nop-playground-welcome-seen'));
    await page.goto('/');
    await checkDialog(/.+/);
    const welcomeName = await page.getByRole('dialog').evaluate((el) => document.getElementById(el.getAttribute('aria-labelledby') ?? '')?.textContent);
    expect(welcomeName).toBeTruthy();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);

    const panel = page.getByRole('region', { name: /networks/i }).or(page.getByRole('complementary', { name: /networks/i }));
    if (!(await panel.first().isVisible())) await page.getByRole('button', { name: 'Show networks panel' }).click();
    await page.getByRole('button', { name: 'Get the exporter' }).first().click();
    await checkDialog(/exporter/i);
  });

  test('NOP-A11Y-022: text in the toolbar, path bar, inspector and playground has enough contrast', async ({ page }) => {
    await page.goto('/?example=start');
    await page.locator('.react-flow__node[data-id="lift_tube"]').click();
    await expect(page.getByRole('complementary', { name: 'Parameters of lift_tube' })).toBeVisible();
    expect(await ruleViolations(page, 'color-contrast')).toEqual([]);
  });

  test('NOP-A11Y-023: network rows and wire style buttons have their roles and states', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the wire style buttons are in the settings menu on phones (NOP-HUD-004)');
    await page.goto('/?example=start');
    await expect(page.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    if (!(await page.getByRole('button', { name: 'Get the exporter' }).first().isVisible())) {
      await page.getByRole('button', { name: 'Show networks panel' }).click();
    }
    const current = page.locator('button[aria-current]');
    await expect(current.first()).toBeVisible();
    expect(await current.first().textContent()).toMatch(/Start Here/i);
    const wires = page.getByRole('group', { name: 'Wire style' });
    const pressed = await wires.getByRole('button').evaluateAll((buttons) =>
      buttons.map((button) => [button.getAttribute('aria-label'), button.getAttribute('aria-pressed')]),
    );
    expect(pressed).toHaveLength(2);
    expect(pressed.every(([name]) => Boolean(name))).toBe(true);
    expect(pressed.filter(([, state]) => state === 'true')).toHaveLength(1);
  });
});

test.describe('pointer types', () => {
  test('NOP-A11Y-004: a fine pointer keeps the compact Houdini header buttons', async ({ page, isMobile }) => {
    test.skip(isMobile, 'fine pointer profiles only');
    await page.goto('/?embed=true&demo=start');
    await expect(page.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    const box = (await page.getByRole('button', { name: 'Network overview' }).boundingBox())!;
    expect(box.height).toBeLessThanOrEqual(26);
  });

  test('NOP-A11Y-005: on touch screens every action and the parameters are reachable by tap', async ({ page, hasTouch }) => {
    test.skip(!hasTouch, 'touch profiles only');
    await page.goto('/?embed=true&demo=start');
    const lift = page.locator('.react-flow__node[data-id="lift_tube"]');
    await expect(lift).toBeVisible();
    const settings = page.getByRole('button', { name: 'View settings' });
    const tools = (await settings.isVisible()) ? settings : page.getByRole('button', { name: 'Network overview' });
    await tools.tap();
    if (tools === settings) await expect(page.getByRole('menu', { name: 'View settings' })).toBeVisible();
    else await expect(page.locator('.react-flow__minimap')).toBeVisible();
    await page.keyboard.press('Escape');
    await lift.tap();
    const panel = page.getByRole('complementary', { name: 'Parameters of lift_tube' });
    await expect(panel).toBeVisible();
    await expect(panel.getByRole('group').first()).toBeVisible();
  });
});
