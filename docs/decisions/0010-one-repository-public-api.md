# 0010: One repository, the playground uses only the public API

- **Status:** Accepted
- **Date:** 2026-10-28

## Context

NOP has two products: the package (React component, web component, iframe page) and the hosted playground where people try it with their own files. Separate repositories would keep them apart but double the setup and make every change a two-step release. One repository risks the playground reaching into package internals, so that the public API never gets tested the way users meet it.

## Decision

Keep one repository. The playground imports the package only through `src/api.ts`, enforced by an ESLint rule. Every exception to that rule is listed in `eslint.config.js` and stands for a public API decision to make before the npm release.

## Consequences

- One build, one CI, and the playground always runs the current package.
- The playground is the first user of the public API, so gaps show up early.
- Before the npm release, each listed exception is either made public or removed.
