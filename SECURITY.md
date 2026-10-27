# Security Policy

## Reporting a vulnerability or a privacy leak

Please report security problems **privately**, not in a public issue:

- Use GitHub's private vulnerability reporting: open the repository's **Security** tab and choose **Report a vulnerability** (https://github.com/emil-judin/wop-houdini-network-viewer/security/advisories/new).
- This includes **privacy leaks in exports**: if the exporter wrote something private into a `.json` file (a user name, a client or project name, a server path, the insides of a locked asset), report it here.
- **Never attach or post an export that contains private data**, not even in a private report. Describe what leaked and how to reproduce it with a made-up network instead.

You can expect a first answer within a week. Fixes for privacy leaks in the exporter are released as soon as possible, together with a note in `CHANGELOG.md` and advice on what to check in files that were already shared.

## Supported versions

WOP is in alpha (`0.x`). Only the newest release (and the hosted playground) receives fixes.

## Scope

- **Viewer** (`src/`): it renders untrusted JSON. Anything that runs script from a network file, reads data from the host page, or lets a crafted link show misleading content under the WOP domain is in scope.
- **Exporter** (`exporter/`): anything that exports private data the documentation says is removed, or that runs on import.
- **Playground and CI**: secrets, the Content-Security-Policy, GitHub Actions workflows.

The Web3Forms access key in the playground is public by design (it only lets the form send mail to the owner).
