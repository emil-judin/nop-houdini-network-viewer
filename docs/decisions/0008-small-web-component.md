# 0008: A small web component: load the rest on demand

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

An embed adds weight to someone else's page, often a portfolio where images already compete for bandwidth. The first web component bundle was 272 KB gzip because it carried everything: the Parameter Inspector, all 122 SideFX Labs icons and five fonts, although many visitors never open a parameter and most networks have no Labs nodes.

## Decision

- The core viewer ships in `web-component.js`.
- The Parameter Inspector, the SideFX Labs icons and the screenshot code load on first use from files next to it.
- Fonts are separate files, not inlined.
- Levels with more than 1,000 items render only what is visible.

## Consequences

- The web component dropped to 176 KB gzip, and a network without Labs nodes never downloads their icons.
- The whole `dist/` folder must be hosted together (the CDN does this).
- Still open: measuring `preact/compat` for a smaller build, and a performance budget test with a generated 5,000-node network.
