# 0006: Network files are untrusted input

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

The viewer draws JSON files that come from anywhere: a URL on someone's site, a dropped file, a paste. A file can be damaged, very large, or written on purpose to attack the page that embeds it (script injection through SVG or text, prototype keys such as `__proto__`, endless downloads).

## Decision

- Every file goes through `normalizeNetworkDocument` (`src/schema/normalize.ts`) before it is drawn. It checks each item, repairs or drops broken ones, and rejects newer major schema versions with a readable message.
- File-provided maps (icons, custom shapes) are read with `Object.hasOwn`.
- No `innerHTML`, `dangerouslySetInnerHTML` or `eval` for file content. Custom SVG icons are only shown through `<img>` data URIs, where scripts cannot run.
- Downloads go through `fetchNetworkJson`: no credentials sent to other sites, a 100 MB size limit and a 30 second time limit.
- The hosted playground never uploads a visitor's file anywhere.

## Consequences

- A broken file shows an error for that part of the network instead of a blank page.
- Rendering features that would need raw HTML from the file (rich text in sticky notes, for example) need a safe design first.
- Security reports follow [SECURITY.md](../../SECURITY.md).
