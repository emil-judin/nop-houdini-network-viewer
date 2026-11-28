# 0017: Corrections become checks

- **Status:** Accepted
- **Date:** 2026-11-28

## Context

Coding agents write much of NOP. They copy the patterns already in the code, so one shortcut that gets in turns into several. Most hard rules in AGENTS.md (no HTML from network files, no portals, `px` instead of `rem`, no requests that send a file anywhere) were prose that an agent can miss, and a comment that explains why a shortcut is fine is read by the next agent as permission to repeat it.

## Decision

- **A correction that can be checked becomes a check**, not another line in AGENTS.md: an ESLint rule in `eslint.config.js` (NOP's own rules in `scripts/eslint-nop-rules.mjs`), a type, or a test. The lint message says what to do instead. `tests/unit/lintRules.test.ts` keeps each rule from being dropped silently.
- **Enforced today:** no `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval` or `new Function` in `src/`; no `createPortal`; no `rem` sizes in `src/components/` and `src/embed/`; `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource` and `navigator.sendBeacon` only in the reviewed files (the limited download, the example page, the feedback form).
- **Workaround comments link an issue.** A comment with words like "hack", "workaround", "for now" or "TODO" needs a `#123` link to the issue that tracks the real fix (`nop/no-unlinked-workaround`). Comments that explain Houdini or a decision stay welcome, and TSDoc on public symbols stays required.

## Consequences

- An agent that breaks one of these rules gets a lint or test error with the fix in its message, instead of relying on someone to catch it in review.
- A new exception (another request, a needed portal) is a visible, reviewed edit to `eslint.config.js`.
- Rules that are still prose and could become checks: no en or em dashes, `Object.hasOwn` for file-provided maps, a stale icon index, the old product name. They stay in AGENTS.md until they get a check of their own.
