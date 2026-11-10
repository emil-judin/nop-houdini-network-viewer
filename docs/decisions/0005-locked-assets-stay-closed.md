# 0005: Locked third-party assets stay closed

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

Many networks use digital assets someone else made: purchased tools, studio tools, a colleague's asset. Their insides are that person's work. Many built-in SOPs (`attribwrangle`, `color`) and SideFX Labs tools also report `isSubNetwork() == True`, and recursing into them makes exports several megabytes larger with content nobody wants to see.

## Decision

The exporter recurses only into networks the user built:

- user containers (`subnet`, `geo`, ...) and unlocked assets (the user is editing them) are exported with their insides;
- built-in containers that are not assets, and locked SideFX and Labs assets, are never opened;
- other locked assets stay closed unless the user chooses **Include Insides** in the export dialog. The dialog-free hotkey never includes them.

The node itself and its icon are still exported, so the network reads correctly.

## Consequences

- Sharing a network does not leak a third party's asset by accident.
- Exports stay small (the first real export shrank by more than 90%).
- Visitors cannot look inside a locked asset, which matches what they would see in Houdini without the asset's source.
