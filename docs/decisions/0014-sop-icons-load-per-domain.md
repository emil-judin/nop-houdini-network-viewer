# 0014: SOP icons load per domain

- **Status:** Accepted
- **Date:** 2026-11-19

## Context

[0008](./0008-small-web-component.md) brought the web component to 176 KB gzip by loading optional parts on demand. The icon restart then put 825 built-in SOP drawings into it ([0011](./0011-icon-workflow-family-micro-batches.md)), and it grew to 390 KB gzip: 211 KB of that were the drawings, although a network uses a few dozen of them. The drawings were already sorted into ten domain folders ([0012](./0012-icons-organized-by-domain-and-family.md)), from 4 KB (ML) to 55 KB (characters) gzip each.

## Decision

- Each SOP domain is a separate file in the builds, loaded on demand like the Labs drawings (`sop/domains.ts`).
- A small generated index (`sop/iconIndex.generated.ts`, about 6 KB gzip) ships with the viewer and says which domain holds which operator type, icon id and drawing id. The viewer reads it before it draws a network, downloads the domains the nodes need, and then draws; a lookup on the index follows the same order as the lookup on the drawings.
- The index is written by `npm run icons:index` from the drawings. A unit test fails while it is out of date, and another loads only the domains the index names for each known operator and checks that it resolves to the same drawing as with everything loaded.
- Drawing kits shared by several domains are split off by Rollup into small files of their own, so a domain never pulls in another domain's drawings.

## Consequences

- `web-component.js` is back to about 180 KB gzip. The six example networks each need two or three domains (59 to 78 KB gzip, after the network file itself), and a network that needs nothing new draws at once.
- Every network now waits for a second download before it is drawn (the loading panel shows a moment longer). Drawings already loaded stay loaded.
- Changing a drawing's types or icon ids needs `npm run icons:index`; the nop-icon-pipeline go-live step runs it. A new domain folder needs an entry in `sop/domains.ts` and `sop/index.ts`.
- The npm package gets the same files, so apps that bundle it download the domains on demand too.
