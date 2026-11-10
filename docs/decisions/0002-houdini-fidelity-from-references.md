# 0002: Match Houdini's Network Editor, measured from screenshots

- **Status:** Accepted
- **Date:** 2026-10-24

## Context

The audience uses Houdini every day and notices at once when a node, wire or color is slightly off. A generic node-graph look would make the viewer feel like a different tool and would hide information Houdini users read from the picture (flags, shapes, block outlines, wire styles).

## Decision

Every visual detail is checked against a Houdini 22 reference screenshot: node shapes (the 36 built-in shape definitions), flag areas, wire routing for both wire styles, dots, network boxes, sticky notes, the path bar, the Parameter Pane and the code editor colors. Colors are sampled, sizes are measured. When a detail is unclear, we get a screenshot before drawing it.

## Consequences

- Visual work is slower, but each part only has to be right once.
- Houdini's coordinate system is converted exactly (`+Y` up, 1 network unit = 100px; see [ARCHITECTURE.md](../ARCHITECTURE.md) section 3).
- Features Houdini does not have (for example a light theme of our own) need a good reason.
- Fidelity is pinned to Houdini 22. Older versions are not checked yet.
