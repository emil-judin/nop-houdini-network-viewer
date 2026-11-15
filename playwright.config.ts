import { defineConfig, devices } from '@playwright/test';

/**
 * Browser tests (`npm.cmd run test:e2e`) for the playground, the `?embed=true` page and the
 * `<houdini-network>` web component, in every target browser and on phone and tablet profiles.
 * The specs follow `docs/features/` (scenario IDs in the test names).
 *
 * First run: `npx playwright install` (downloads the browsers). The web server builds the
 * playground and the library, then serves them with `tests/e2e/server.mjs`.
 */
export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  fullyParallel: true,
  // WebKit on a busy machine times out with many parallel pages
  workers: process.env.CI ? 2 : 3,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
    // The playground's welcome card and embed tip count as already seen, so they do not cover the
    // page in every test; `NOP-PG-015` and `NOP-PG-047` clear these to test them
    storageState: {
      cookies: [],
      origins: [
        {
          origin: 'http://localhost:4173',
          localStorage: [
            { name: 'nop-playground-welcome-seen', value: '1' },
            { name: 'nop-playground-embed-hint-seen', value: '1' },
          ],
        },
      ],
    },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'pixel', use: { ...devices['Pixel 7'] } },
    { name: 'iphone', use: { ...devices['iPhone 14'] } },
    { name: 'ipad', use: { ...devices['iPad (gen 7)'] } },
  ],
  webServer: {
    command: 'npm run build:lib && npm run build && node tests/e2e/server.mjs',
    url: 'http://localhost:4173/',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
