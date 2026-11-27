import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/**
 * Unit and component tests (`npm.cmd test`). Unit tests run in Node; component tests opt into a
 * browser-like DOM with `// @vitest-environment jsdom` at the top of the file. Browser tests are
 * Playwright specs in `tests/e2e/` (`npm.cmd run test:e2e`). Scenario IDs (`NOP-CONV-010`) refer to
 * the feature files in `docs/features/`.
 */
export default defineConfig({
  plugins: [react()],
  define: {
    __NOP_VERSION__: JSON.stringify('0.0.0-test'),
    __NOP_PACKAGE_NAME__: JSON.stringify('nop-houdini-network-viewer'),
    __NOP_EXAMPLE_NODE_COUNTS__: JSON.stringify({}),
  },
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/component/**/*.test.tsx'],
    environment: 'node',
    setupFiles: ['tests/setup.ts'],
    // Component tests render the whole viewer in jsdom; on a busy machine with every worker running,
    // some take longer than Vitest's default 5 seconds without anything being wrong
    testTimeout: 20_000,
    // The same for setup hooks: loading every SOP icon domain in a `beforeAll` takes under a second
    // alone, but can pass Vitest's default 10 seconds while the component tests keep every worker busy
    hookTimeout: 20_000,
    // Every component test renders React Flow in jsdom: one worker per core (15 on a 16 core machine)
    // makes them slow each other down until waits run out, half of them is faster overall
    maxWorkers: '50%',
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: ['src/**/*.d.ts'],
      reporter: ['text-summary', 'html'],
    },
  },
});
