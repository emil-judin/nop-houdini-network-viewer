# 0004: Exports are as safe to share as a screenshot

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

An exported network is published on the open web. Houdini parameters are full of absolute paths, and paths leak private information: user names, client names, drive layouts, studio server and share names. Artists cannot be expected to check hundreds of parameters by hand before they post.

## Decision

The exporter scrubs every exported text field (`scrub_path`):

- Folders inside the project become `$HIP` or `$JOB`, Houdini folders become `$HOUDINI_USER_PREF_DIR`, `$HSITE` or `$HFS`.
- Every other absolute path keeps only its file name: `D:/Clients/Acme/rock.exr` becomes `<path>/rock.exr`. This includes home folders, other drives, server shares (`//host/share` only, so commented-out VEX such as `//@Cd` stays) and mount points.
- Embedded custom SVG icons lose their editor metadata (Inkscape and Illustrator paths, author names).
- Network box comments and sticky note text are exported as written, apart from paths in sticky notes: they are text the user wrote to be read. The README says so.

## Consequences

- An export is safe to post without manual review in the common case.
- Some information is lost on purpose: the viewer cannot show where a file really lives.
- Every new free-text field the exporter writes must go through `scrub_path`, and every new path shape needs a test case.
