# 0001: The viewer is strictly view-only

- **Status:** Accepted
- **Date:** 2026-10 (project start)

## Context

Artists want to show how a Houdini network is built: on a portfolio, in a breakdown, in a tutorial. Today they post screenshots, which cannot be zoomed, opened or read in detail. A web viewer could also become an editor, but editing would mean reimplementing Houdini's cooking, flag and wiring logic, and an edited network in a browser has no use without Houdini.

## Decision

NOP shows networks and never changes them. Visitors can pan, zoom, go fullscreen, open subnetworks and read parameters and code. They cannot move nodes, rewire, toggle flags or change values. React Flow runs locked (`nodesDraggable={false}`, `nodesConnectable={false}`).

## Consequences

- The scope stays small enough: no undo, no cooking, no network state to keep in sync.
- Flags, padlocks and badges are drawn as pictures, not controls.
- Any feature request that changes the network is out of scope by default. Viewer state (view, selected node, open level) is fine.
