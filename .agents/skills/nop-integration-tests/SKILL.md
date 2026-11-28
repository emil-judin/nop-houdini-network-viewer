---
name: nop-integration-tests
description: >-
  Staged workflow for writing integration tests for one NOP area (src/schema, src/components, src/embed,
  the web component, the playground or the exporter): analysis, plan, tests, run. Use when asked to write
  integration tests for a module or area.
---

# Write integration tests for a NOP area

Before Stage 1, find or propose the issue for the area and work on its branch (AGENTS.md section 5). The
Stage 1 analysis and the Stage 2 plan go into the issue as comments once the owner approves them, so the next
session can pick up from there.

Follow these four stages in order. Stop after Stage 1 and after Stage 2 and continue only when the owner
approves. Go from Stage 3 to Stage 4 without waiting.

Read first: [docs/TESTING.md](../../../docs/TESTING.md) (layers, fixtures, naming), the feature files in
[docs/features/](../../../docs/features/README.md), and [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md).

In NOP, "integration" means several real parts working together, at one of these layers:

| Layer | What runs for real | Where |
| --- | --- | --- |
| Component | `normalizeNetworkDocument` → `convertGraph` → React Flow → nodes, wires, HUD, inspector, in jsdom | `tests/component/*.test.tsx` |
| Browser | The built playground, the `?embed=true` page, the built `<houdini-network>` on a host page | `tests/e2e/*.spec.ts` |
| Exporter | `nop_exporter.py` serializing a small fake network end to end | `exporter/tests/test_*.py` |

Pure single-function logic belongs in `tests/unit/` and is not the goal here.

## Stage 1: Analyze the area and its public interfaces

1. Study the area's structure
   - Read the config that defines the boundaries: `package.json` (scripts, `exports`), `vite.config.ts`,
     `vite.lib.config.ts`, `tsconfig*.json`, `eslint.config.js` (`no-restricted-imports` keeps the
     playground on the public API), `vitest.config.ts`, `playwright.config.ts`.
   - List the public interfaces of the area:
     - Library API: everything exported from `src/api.ts` (types, converter, `HoudiniNetwork`,
       `RemoteHoudiniNetwork`, `parseEmbedOptions`, `NetworkLoadingState`, `NetworkErrorState`,
       `MAX_NETWORK_BYTES`) and the props each component accepts.
     - Web component: `src/web-component.ts`, its attributes and events (`src/embed/embedAttributes.ts`).
     - Pages: the playground and the `?embed=true` page (what a visitor can do there).
     - Exporter: the functions the shelf tools and dialogs in `exporter/package/` call, and the JSON it
       writes (`schema/`, [docs/SCHEMA.md](../../../docs/SCHEMA.md)).
     - Exported functions of internal modules that other folders import.
   - Describe the main parts of the area and how data flows between them.
2. Find where the area is used
   - Search imports across `src/` (playground, example page, web component, library entry) and, for the
     exporter, the shelf scripts in `exporter/package/`.
   - Note which existing tests already cover each interface (`tests/`, `exporter/tests/`) and which
     scenario IDs in `docs/features/` they carry.

Expected result:

- Usage table: interface, used by (file or module), already covered by (test and scenario ID).
- Public interfaces that nothing outside the area uses (if any).
- Feature scenarios with no test yet.

Stop and wait for permission to continue.

## Stage 2: Plan

1. For each public interface, list typical use cases, including how it works with the parts around it
   (a network file from the exporter, a host page, the inspector, a remote URL).
   - Test interactions, not implementation: what a caller or visitor sees (rendered nodes, inspector
     content, callbacks, URL changes, the exported JSON), not internal state or private helpers.
   - Use only public entry points: exported components and functions, custom element attributes, page
     URLs, the exporter's public functions.
   - Keep tests independent: no shared mutable state, no reliance on order.
   - Tie every test to a scenario in `docs/features/`. If none fits, propose the new scenario (Gherkin,
     next free ID in that file) as part of the plan.
   - Pick the lowest layer that can show the behavior (component before browser). Use the browser layer
     for real layout, touch, fullscreen, cross-origin, Shadow DOM, fonts and on-demand chunks.
2. Decide what runs for real and what gets a test double.
   - Never mock parts of NOP itself: real `normalizeNetworkDocument`, `convertGraph`, wires, icons
     registry, inspector, `@xyflow/react`.
   - Double only what is outside NOP or missing in the test environment, and check what exists first:
     - jsdom gaps (`ResizeObserver`, `DOMMatrixReadOnly`, element sizes): already in `tests/setup.ts`.
     - Network: `vi.stubGlobal('fetch', ...)` as in `tests/unit/embed.test.ts`, or a real file served by
       `tests/e2e/server.mjs` (two origins, 4173 and 4174) in the browser layer.
     - Clipboard, Fullscreen API, `matchMedia`, `html-to-image`: stub at the browser API boundary only.
     - Houdini: `exporter/tests/fake_hou.py`, extended only with what the exporter actually calls.
   - Prefer real data: `fixtures/examples/*-network.json` (real Houdini 22 exports),
     `fixtures/edge-cases/*.json`, and the builders in `tests/unit/networkFixtures.ts` (`node`, `graph`,
     `wire`). Add an edge-case file only for a behavior no existing fixture shows.

Expected result:

- A test plan table: scenario ID and name, layer and file, scenario, real parts, doubles, input data
  (fixture or builder), expected result, how it is checked (query, assertion, JSON field).
- A list of real parts and doubles with the reason for each double.
- New or changed scenarios for `docs/features/`, if any.

Stop and wait for permission to continue.

## Stage 3: Implement

1. Set up the files
   - Add tests to an existing file of the right layer when the area already has one; otherwise create one
     that the config already picks up:
     - Component: `tests/component/<Area>.test.tsx`, first line `// @vitest-environment jsdom`.
     - Browser: `tests/e2e/<area>.spec.ts`; host pages go in `tests/e2e/host/`.
     - Exporter: `exporter/tests/test_<area>.py` (found by `unittest discover`), importing `fake_hou`
       the way `test_nop_exporter.py` does.
   - Reuse `tests/setup.ts`, `tests/unit/networkFixtures.ts`, the fixtures and `fake_hou.py`. Add a shared
     helper only when two or more tests need it.
   - Add the new scenarios to `docs/features/` if the plan has any.
2. Write the tests
   - Name each test after its scenario ID: `it('NOP-NAV-012: ...')`, `test('NOP-EMB-003: ...')`, or
     a docstring / class name with the ID in Python. One behavior per test.
   - Component tests: render with Testing Library and query by role, label or text (or the
     `.react-flow__node[data-id="..."]` selector the existing tests use); drive the viewer with
     `fireEvent` or keyboard events like a visitor.
   - Browser tests: use the built outputs through `baseURL`; mind the six projects (skip with a reason via
     `test.skip(isMobile, ...)` only where a profile cannot do the action). The welcome card and embed tip
     are pre-dismissed in `playwright.config.ts`; clear those `localStorage` keys only in tests about them.
   - Exporter tests: reset `fake_hou.ENV` and the path scrubber in `setUp`; assert on the produced
     dictionary or JSON, including privacy (scrubbed paths, closed locked assets).
   - Isolation: restore mocks and globals (`vi.restoreAllMocks()`, `vi.unstubAllGlobals()`), never leave
     `localStorage`, `document` listeners or module state behind.

Pay attention to:

- Async work: use `findBy*`, `waitFor` and `act` in Vitest; web-first assertions (`await expect(...)
  .toBeVisible()`, `expect.poll`) in Playwright. Never use fixed sleeps or `waitForTimeout`. Remember
  what loads lazily: Labs icons, code highlighting, remote network files, fonts.
- The data contract between exporter and viewer: build inputs that match `src/schema/types.ts` and the
  JSON Schema in `schema/`; keep TypeScript strict (no `any`, no non-null assertions to silence types).
  Exporter code and tests stay on the Python 3.9 standard library.
- Embedding boundaries: the web component renders in a Shadow DOM and every element must stay inside
  `.nop-root`; check host page isolation in the browser layer, not in jsdom.
- View-only (Pillar 3): when a test touches interaction, also check that nothing became editable.
- Untrusted input: feed damaged files through the real `normalizeNetworkDocument`, never past it.

Comments only where the logic would be hard to follow without them (the existing tests use them to
explain a guard like `P-05`). No en or em dashes anywhere.

Expected result:

- Tests written to the approved plan, in files the configs already include.
- Tests follow the existing patterns in `tests/` and `exporter/tests/`.

Continue to Stage 4 right away.

## Stage 4: Run the tests

Run from the repository root (Windows PowerShell: `npm.cmd`, separate commands with `;`).

1. Typecheck and lint the tests (the build step for tests)
   - `npm.cmd run check` (includes `tests/` through `tsconfig.test.json`)
   - `npm.cmd run lint`
2. Run only the new tests first
   - Component: `npm.cmd test -- tests/component/<file>` or `npm.cmd test -- -t "NOP-XXX-000"`
   - Browser: `npm.cmd run test:e2e -- tests/e2e/<file> --project=chromium` (add `-g "NOP-XXX-000"` to
     narrow it). The web server builds the library and playground itself.
   - Exporter: `python -m unittest discover -s exporter/tests -k <TestName>`
3. Then the whole layer: `npm.cmd test`, `npm.cmd run test:exporter`, and for browser tests
   `npm.cmd run test:e2e` across all projects (on a busy machine `--workers=1`).
4. On failure
   - Read the output (for Playwright, the trace kept on failure).
   - Fix the test when the test is wrong. When the test exposes a real bug, say so, fix the production
     code only in line with the feature file, and list the change for `CHANGELOG.md`.
   - Run check, lint and the tests again. Repeat until everything passes.
5. Finish with the `nop-verify` skill (definition of done) and update `docs/TESTING.md` if the coverage
   table changed. Commit the tests together with the change they cover, and only when the owner asks for a commit.

Expected result:

- All new tests pass in every layer and project they run in.
- `check` and `lint` are clean.
- Report the commands run and their results. Report failures with their output; never mark a step as
  passed that was not run.
