# 0015: Stubs for wires outside an exported selection

- **Status:** Accepted
- **Date:** 2026-11-25

## Context

Exporting a selection used to drop every wire to an unselected item without a trace. A node fed from outside then looked unwired, a Copy to Points looked like it copied onto nothing, and nothing showed that the last node fed the rest of the network. Sharing a part of a network is the main reason to export a selection, so the fragment should say where it continues.

Options weighed with prototypes: no marks (the old behavior); stubs with the outside node's name; wires that run toward the outside node's real position and off the edge of the view; one pill per outside node at its real position; straight stubs with the number of wires on an output; straight stubs without names or numbers; and stubs that follow the start of the real wire toward the outside item.

Straight 24px stubs ending in a circle collided with real wires on Merge-style bars: past the first 12px, wires into neighbouring slots bend sideways and cross them. A count on an output stub counted wires, not consumers (a dot outside counts as one, two wires into one Merge as two), and without names it said little.

## Decision

- The exporter writes `outsideWires` (schema 1.5.0) for selection exports, one entry per wire: an input wired from outside (`to`, `toInput`) or an output wired to an outside item (`from`, `fromOutput`), each with the outside item's position (`pos`) and whether it is a dot (`dot`). Never its name or type.
- The viewer draws each such wire as a stub: the start of the real wire, in the current wire style, from the exported connector toward the outside item, solid or dotted like the real wire, fading out within 40px. Whether a wire is dotted depends on the input it enters, so it is known only for wires into the selection; wires leaving it are drawn solid. An output feeding three items outside shows three stubs, so it needs no count. Without `pos` the stub runs straight up or down.
- Stubs are drawn under the wires, so a real wire always stays whole on top.
- Stubs name nothing and do nothing: no hover, no tooltip, no click. They are hidden from screen readers; the node's accessible name says it is wired to nodes outside the export instead.
- Inputs wired from outside take part in the multi-input fan-out of Merge-style bars, so stubs and wires never share a slot.

## Consequences

- A shared fragment explains itself without hover, so it also works on touch screens and in screenshots. Stubs join a Merge's fan-in the way real wires do, in both wire styles.
- The file holds the position of each item wired directly to the selection: where it is, not what it is. Names and types stay out, which keeps exports about as safe as a screenshot of the selection ([0004](./0004-exports-safe-as-a-screenshot.md)). A user who wants more context shown can select it too.
- The far end is estimated from the outside item's position (a dot's center, a node's bottom or top middle), which is close enough for the first 40px of a wire.
- Stubs are NOP's own addition, not part of Houdini's look ([0002](./0002-houdini-fidelity-from-references.md)); they look like the real wire but stay short and fade out, so they never read as a whole wire.
- Stubs are drawn by a node of their own per item (`stubs:` prefix, under the wires, no clicks, transparent in the overview). It reads the item's connector positions from React Flow and frames the item and its stubs, so Fit never cuts them off.
- Older exports and whole-network exports have no `outsideWires` and look as before.
