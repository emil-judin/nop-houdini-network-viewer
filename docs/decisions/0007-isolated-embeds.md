# 0007: Embeds are isolated from the host page

- **Status:** Accepted
- **Date:** 2026-10-26, scoping 2026-10-27

## Context

NOP runs inside other people's pages: portfolio builders, WordPress themes, Tailwind sites, blogs with global `button` and `body` rules. A host's CSS must not break the viewer, and the viewer's CSS must not restyle the host. Many host pages also change the root font size, and embeds are usually narrower than the page.

## Decision

- The `<houdini-network>` web component renders inside a Shadow DOM.
- The npm `style.css` has no global reset (no Tailwind preflight). It is scoped to `.nop-root` at build time, and a small reset applies only inside it. Every viewer element renders inside `.nop-root`, so there are no portals to `document.body`.
- Viewer sizes use `px`, never `rem`, because `rem` follows the host's root font size even inside a Shadow DOM.
- Viewer layouts respond to the viewer's own width (container queries), not the page width.

## Consequences

- The viewer looks the same on any page, and the host page is never touched (checked on a hostile test page with a 62.5% root font size and global element rules).
- Dialogs and menus must be built inside the viewer, not as page-level overlays.
- The `px` rule makes the viewer ignore a host's font scaling. Label size is a setting of the embedding page instead.
