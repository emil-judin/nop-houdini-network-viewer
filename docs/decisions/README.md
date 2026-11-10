# Architecture Decision Records

Short records of decisions that shape NOP and would be expensive to reverse. Each record says what was decided, why, and what follows from it. Smaller choices live in the code, the [CHANGELOG](../../CHANGELOG.md) and the git history.

| # | Decision | Status |
| --- | --- | --- |
| [0001](./0001-view-only-viewer.md) | The viewer is strictly view-only | Accepted |
| [0002](./0002-houdini-fidelity-from-references.md) | Match Houdini's Network Editor, measured from screenshots | Accepted |
| [0003](./0003-original-icons-no-sidefx-assets.md) | Original operator icons, no SideFX assets | Accepted |
| [0004](./0004-exports-safe-as-a-screenshot.md) | Exports are as safe to share as a screenshot | Accepted |
| [0005](./0005-locked-assets-stay-closed.md) | Locked third-party assets stay closed | Accepted |
| [0006](./0006-network-files-are-untrusted.md) | Network files are untrusted input | Accepted |
| [0007](./0007-isolated-embeds.md) | Embeds are isolated from the host page | Accepted |
| [0008](./0008-small-web-component.md) | A small web component: load the rest on demand | Accepted |
| [0009](./0009-touch-and-fullscreen.md) | Touch: two fingers move the network, fullscreen replaces Fit | Accepted |
| [0010](./0010-one-repository-public-api.md) | One repository, the playground uses only the public API | Accepted |

## Writing a record

Copy the shape of an existing record: **Context** (the problem and the forces), **Decision** (what we do), **Consequences** (what gets easier, what gets harder, what stays open). Number records in order and never reuse a number. When a decision changes, add a new record and mark the old one "Superseded by NNNN".
