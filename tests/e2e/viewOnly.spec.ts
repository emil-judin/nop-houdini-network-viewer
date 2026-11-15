import { expect, test, type Locator, type Page } from '@playwright/test';

/** The `start_here` example in `<houdini-network id="board">` on the hostile host page. */
async function openBoard(page: Page): Promise<Locator> {
  await page.goto('/host/web-component.html');
  const board = page.locator('#board');
  await expect(board.locator('.react-flow__node[data-id="box1"]')).toBeVisible();
  await expect(board.locator('.react-flow')).not.toHaveClass(/nop-first-fit-pending/);
  return board;
}

const viewportTransform = (board: Locator) =>
  board.locator('.react-flow__viewport').evaluate((el) => (el as HTMLElement).style.transform);

const center = async (locator: Locator) => {
  const box = (await locator.boundingBox())!;
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
};

async function drag(page: Page, from: { x: number; y: number }, to: { x: number; y: number }) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 8 });
}

const wireIds = (board: Locator) =>
  board.locator('.react-flow__edge').evaluateAll((edges) => edges.map((edge) => edge.getAttribute('data-id')));

test.describe('The viewer is view-only', () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(isMobile, 'mouse drags');
  });

  test('NOP-RO-001: dragging a node pans the view instead of moving the node', async ({ page }) => {
    const board = await openBoard(page);
    const box1 = board.locator('.react-flow__node[data-id="box1"]');
    const tube1 = board.locator('.react-flow__node[data-id="tube1"]');
    const distance = async () => {
      const [a, b] = await Promise.all([center(box1), center(tube1)]);
      return { dx: Math.round(b.x - a.x), dy: Math.round(b.y - a.y) };
    };
    const before = await distance();
    const view = await viewportTransform(board);
    const start = await center(box1);
    await drag(page, start, { x: start.x + 200, y: start.y + 60 });
    await page.mouse.up();
    await expect.poll(() => viewportTransform(board)).not.toBe(view);
    expect(await distance()).toEqual(before);
  });

  test('NOP-RO-002: wires cannot be created or reconnected', async ({ page }) => {
    const board = await openBoard(page);
    const wires = await wireIds(board);
    expect(wires.length).toBeGreaterThan(0);
    const output = board.locator('.react-flow__node[data-id="box1"] .react-flow__handle.source').first();
    const input = board.locator('.react-flow__node[data-id="tube1"] .react-flow__handle.target').first();
    await drag(page, await center(output), await center(input));
    await page.mouse.up();
    expect(await wireIds(board)).toEqual(wires);

    // The end of the box1 -> polybevel1 wire, dragged to tube1's input
    const wireEnd = board.locator('.react-flow__node[data-id="polybevel1"] .react-flow__handle.target').first();
    await drag(page, await center(wireEnd), await center(input));
    await page.mouse.up();
    expect(await wireIds(board)).toEqual(wires);
  });

  test('NOP-RO-011: holding Shift and dragging the canvas pans and draws no selection box', async ({ page }) => {
    const board = await openBoard(page);
    const view = await viewportTransform(board);
    const area = (await board.locator('.react-flow').boundingBox())!;
    await page.keyboard.down('Shift');
    await drag(page, { x: area.x + 12, y: area.y + 12 }, { x: area.x + 180, y: area.y + 110 });
    await expect(board.locator('.react-flow__selection')).toHaveCount(0);
    await page.mouse.up();
    await page.keyboard.up('Shift');
    await expect.poll(() => viewportTransform(board)).not.toBe(view);
    await expect(board.locator('.react-flow__node.selected')).toHaveCount(0);
  });
});
