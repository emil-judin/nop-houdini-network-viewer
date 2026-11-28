---
name: nop-issue-writer
description: >-
  Writes GitHub issues for NOP in the repository's style: bug, feature and task templates, labels, NOP terms
  and plain writing rules. Use whenever the owner asks to write, draft, rewrite or file an issue, or when
  AGENTS.md section 5 says to propose one. In this repository it replaces any general issue-writing skill.
---

# Write a NOP issue

The repository is public: every issue is visible the moment it is filed.

## Workflow

1. Collect the facts from the owner's request, the conversation, the code and `gh`. Search for duplicates
   first: `gh issue list --state all --search "<words>"`.
2. Pick the type (bug, feature, task) and fill its template. Leave out a section only where the template
   says it is optional.
3. Where a fact is missing (a version, a step, the browser), ask for it in a short list after the draft.
   Never fill the gap with a plausible value.
4. Show the owner the exact title, labels and body. File nothing yet.
5. After the owner approves that exact text, write the body to a file and run
   `gh issue create --title "<title>" --body-file <file> --label <a> --label <b>`. If the owner changes
   anything, show the new version and wait again.
6. Rewriting an existing issue: show before and after; run `gh issue edit` only on approval.

Privacy leaks in exports (a user name, a server path, the insides of a locked asset) never go into an issue.
Point to private reporting in `SECURITY.md` instead. Never paste a real customer export or anything from the
private repositories (nop-icon-pipeline, nop-resources) into an issue.

## Titles

One line in sentence case, no type prefix, no full stop, under about 60 characters. Name the thing and what
happens or what it should do:

- Bug: `Firefox 159 crashes in NOP-A11Y-010 with Playwright 1.65.1`
- Feature: `Node search (/, like Houdini's Find Node)`, `Multiparm blocks: show the count and one block per entry`
- Task: `Upgrade to Vite 8 and plugin-react 6 together`

Titles are not commit subjects: no `feat(viewer):`.

## Templates

Every type ends with a `## Done when` checklist: concrete, checkable items such as tests, a feature file
in `docs/features/`, a schema bump or a linked pull request closing.

### Bug

```markdown
<What happens, in one or two sentences, with the component and the node or network involved.>

## Steps to reproduce

1. <exact step: which page, file, node, click or command>
2. ...

## Expected

<What should happen. Name the Houdini behavior when NOP should match it.>

## Actual

<What happens instead. Error text goes in a code block, quoted exactly.>

## Environment

- NOP: <version or commit>
- Houdini: <version, for exporter bugs>
- Browser and OS: <for viewer, embed and playground bugs>
- Where: <playground, example page, web component, React component, iframe, exporter>

## Logs or screenshots

<Optional. Console output, CI log lines, a Houdini screenshot next to the NOP one.>

## Done when

- [ ] <bug fixed, covered by a test named after its scenario ID>
```

### Feature

```markdown
<The problem: what someone cannot do today, or what differs from Houdini.>

## Proposed behavior

<What NOP should do, from the visitor's or the Houdini artist's side.>

## Out of scope

<What this issue does not cover. Ask the owner if unclear.>

## Done when

- [ ] <acceptance criteria, one per line>
- [ ] Feature file in `docs/features/` and tests
```

### Task

Upgrades, docs, CI, releases, refactors. A short paragraph with the reason and any linked pull requests,
then `## Done when`. Add sections only when they hold facts.

## Project context

**Names.** NOP is always in capitals in prose. Use the names from the code and docs:

- Viewer parts: network, node, wire (not edge), input and output connectors, dot, network box, sticky note,
  subnetwork, path bar, Parameter Inspector, node flags, Networks pane, Welcome card.
- Embeds: web component `<houdini-network>`, React components `HoudiniNetwork` / `RemoteHoudiniNetwork`,
  the `?embed=true` iframe page, the example page.
- Exporter: `exporter/nop_exporter.py`, the Houdini package and shelf tool, the network JSON (an "export"),
  `schemaVersion`. Houdini terms as Houdini writes them: operator type, digital asset (locked or unlocked),
  multiparm, ramp, Parameter Pane, Network Editor, SOP.
- Tests: scenario IDs such as `NOP-A11Y-010`, tagged in `docs/features/*.feature`; test files under
  `tests/unit`, `tests/component`, `tests/e2e`, `exporter/tests`.

**Where versions come from.**

- NOP version: `package.json`, shown in the playground's status bar ("Playground 0.1.0-alpha.9", "Exporter
  ..."). For unreleased code, the commit: `git rev-parse --short HEAD`.
- Houdini version and schema: an export's `houdiniVersion` and `schemaVersion` fields. The exporter is
  checked with Houdini 20.5, 21 and 22.
- CI failures: the run link from `gh pr checks <n>` or `gh run view <id> --log-failed`, and the
  package versions from the pull request.

**Labels.** One or more area labels, plus a type label where one fits:

| Label | Use for |
| --- | --- |
| `viewer` | drawing the network, Parameter Inspector, path bar |
| `schema` | the JSON format, `normalize.ts`, schema versions |
| `exporter` | `nop_exporter.py`, the Houdini package, shelf tool |
| `embed` | web component, React components, iframe, public API |
| `playground` | hosted playground, example page |
| `examples` | `fixtures/examples` |
| `icons`, `brand` | operator icons; logo, banner, link previews |
| `docs`, `tests`, `ci` | docs and decisions; test suite; workflows and tooling |
| `deps`, `release` | upgrades that need work; versions and publishing |
| `bug`, `enhancement` | type: broken behavior; new feature |
| `accessibility` | barriers for people with disabilities, with its area label |

Tasks have no type label. Do not use `documentation`, `dependencies`, `javascript` or `github_actions`:
GitHub and Dependabot own those.

## Content rules

- One issue per problem. A second problem gets its own issue, linked by number.
- Facts over opinions: what happens, where, with which file or version. Leave out how bad it feels.
- Quote error text exactly, in a code block. Do not paraphrase it.
- Never invent steps, versions, browsers or causes the owner did not give you. Ask for them.
- A guess about the cause is labeled as one: "Possible cause (not checked): ...".
- Link related issues and pull requests by number (`#41`). Link files with a full GitHub URL, since
  relative links do not resolve in issues.

## Writing rules

Plain, neutral, technical prose. Headings, lists and checklists stay.

1. **No not-X-but-Y.** State the point. Keep a contrast only when it corrects a belief someone holds.
   Before: "This isn't just a styling glitch, it's a layout bug." After: "Node names overlap the wire at
   zoom levels below 50%."
2. **No one-line closers.** Cut a final line that repeats the issue ("This makes the inspector hard to
   use."). End on the last fact or checklist item.
3. **No staged openers.** Cut "Here's the thing", "The part that matters is", "Quick note". Name the thing.
4. **Do not argue with no one.** Drop "To be clear, this is not about X" and rejected options nobody
   proposed. Keep an alternative only if the owner raised it or a reader would weigh it.
5. **No em or en dashes in prose.** Use a period, comma, colon or parentheses. Leave code, paths, commands
   and quoted error text alone.
6. **No stock AI words or inflated significance.** Avoid crucial, key, robust (figurative), seamless,
   enhance, leverage, delve, showcase, pivotal, "plays a key role", "significantly improves".
   Before: "This crucial fix significantly enhances the export experience." After: "Exporting a locked
   asset no longer stops at the first node."
7. **No chatbot residue.** No "I hope this helps", "Let me know", "Here is the issue" in the body.
8. **Say what is unknown.** Write "Not checked on Houdini 21" or "Firefox version unknown", never "likely
   affects all versions".
9. **Write about the problem, not the issue.** Cut "This issue describes", "Below you will find", "This
   was drafted from".
10. **Lead with the problem or decision.** The first sentence says what is wrong or what to build. Skip
    background the owner wrote or already agreed to; a reader needs one missing fact, not the history.

Writing rules adapted from Humanizer by blader (https://github.com/blader/humanizer), MIT License.
