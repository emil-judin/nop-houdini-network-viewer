import { expect, test, type Page } from '@playwright/test';
import { LABEL_SIZE_STYLES } from '../../src/components/nodes/labelSizeStyles';

const node = (page: Page, scope: string, name: string) => page.locator(`${scope} .react-flow__node[data-id="${name}"]`);

test.describe('<houdini-network> on a page', () => {
  test('NOP-EMB-009 and 013: the script can run twice, the element is 480px high and hidden hides it', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto('/host/embedding.html');
    const plain = page.locator('#plain');
    await expect(node(page, '#plain', 'lift_tube')).toBeVisible();
    expect(errors).toEqual([]);
    expect(Math.round((await plain.boundingBox())!.height)).toBe(480);
    expect(await plain.evaluate((el) => getComputedStyle(el).display)).toBe('block');
    await plain.evaluate((el) => el.setAttribute('hidden', ''));
    await expect(plain).toBeHidden();
    expect(await plain.evaluate((el) => getComputedStyle(el).display)).toBe('none');
  });

  test('NOP-EMB-011: three viewers register the fonts once and draw labels in Source Sans Pro', async ({ page }) => {
    await page.goto('/host/embedding.html');
    for (const [scope, name] of [
      ['#plain', 'lift_tube'],
      ['#second', 'wrangle_rings'],
      ['#third', 'scene'],
    ]) {
      await expect(node(page, scope, name)).toBeVisible();
    }
    await expect(page.locator('head style[data-houdini-network-fonts]')).toHaveCount(1);
    const fontFamily = await node(page, '#plain', 'lift_tube')
      .getByText('lift_tube', { exact: true })
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(fontFamily).toContain('Source Sans Pro');
  });

  test('NOP-EMB-043: the npm stylesheet leaves the host page alone', async ({ page }) => {
    const read = () =>
      page.evaluate(() =>
        ['hostFlex', 'hostHidden', 'hostFlow', 'hostNode', 'hostButton'].map((id) => {
          const style = getComputedStyle(document.getElementById(id) as HTMLElement);
          return {
            id,
            display: style.display,
            visibility: style.visibility,
            background: style.backgroundColor,
            border: style.borderTopStyle,
            padding: style.paddingLeft,
            fontSize: style.fontSize,
            boxSizing: style.boxSizing,
            width: style.width,
            position: style.position,
          };
        }),
      );
    await page.goto('/host/npm-styles.html');
    const without = await read();
    await page.goto('/host/npm-styles.html?nop');
    await expect(page.locator('link[href="/lib/style.css"]')).toHaveCount(1);
    await page.waitForFunction(() => [...document.styleSheets].some((sheet) => sheet.href?.endsWith('/lib/style.css')));
    expect(await read()).toEqual(without);
  });
});

test.describe('the ?embed=true page', () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(isMobile, 'the same page on every device; desktop is enough');
  });

  test('NOP-EMB-031: playground examples in embed mode', async ({ page }) => {
    await page.goto('/?embed=true&demo=start');
    await expect(page.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    await page.goto('/?embed=true&demo=vex');
    await expect(page.locator('.react-flow__node[data-id="wrangle_rings"]')).toBeVisible();
    await page.goto('/?embed=true&demo=board');
    await expect(page.getByRole('alert')).toContainText('No Houdini network file was given.');
  });

  test('NOP-EMB-032: embed page options use the attribute names', async ({ page }) => {
    await page.goto('/?embed=true&demo=start&label-size=large&minimap=false&toolbar=false');
    const lift = page.locator('.react-flow__node[data-id="lift_tube"]');
    await expect(lift).toBeVisible();
    expect(await lift.innerHTML()).toContain(LABEL_SIZE_STYLES.large.nameText);
    await expect(page.locator('.react-flow__minimap')).toHaveCount(0);
    await expect(page.getByRole('navigation', { name: 'Network path' })).toHaveCount(0);
  });

  test('NOP-EMB-034: a known demo wins over src', async ({ page }) => {
    await page.goto('/?embed=true&demo=start&src=http://localhost:4174/fixtures/examples/vex_wrangles-network.json');
    await expect(page.locator('.react-flow__node[data-id="lift_tube"]')).toBeVisible();
    await expect(page.locator('.react-flow__node[data-id="wrangle_rings"]')).toHaveCount(0);
    await expect(page.getByText(/Network from /)).toHaveCount(0);
  });
});
