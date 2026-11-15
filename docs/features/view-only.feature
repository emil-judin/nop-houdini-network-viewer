@component @e2e
Feature: The viewer is strictly view-only
  Pillar 3: visitors can look and inspect, never edit.

  Background:
    Given the viewer shows the "start_here" example

  @NOP-RO-001
  Scenario: Nodes cannot be moved
    When the visitor drags node "box1" by 200 pixels
    Then the view pans instead
    And "box1" keeps its position relative to the other nodes

  @NOP-RO-002
  Scenario: Wires cannot be created or reconnected
    When the visitor drags from an output connector to another node's input
    Then no new wire exists
    When the visitor drags the end of an existing wire to another input
    Then the wire still connects the same connectors

  @NOP-RO-003
  Scenario: Flags are indicators only
    When the visitor clicks the display flag area of a node
    Then the node is selected and its flags are unchanged

  @NOP-RO-004
  Scenario: Nothing can be deleted
    Given node "box1" is selected
    When the visitor presses Delete and Backspace
    Then "box1" and its wires are still shown
    # React Flow's delete key is turned off (deleteKeyCode null), so this holds whatever handlers are added later

  @NOP-RO-005
  Scenario: Parameters cannot be edited
    Given node "box1" is inspected
    Then no parameter field is an editable input, textarea or select
    And clicking a toggle, menu or slider does not change its value

  @NOP-RO-006
  Scenario: Network boxes, sticky notes and dots cannot be selected
    When the visitor clicks a network box, a sticky note and a dot
    Then none of them becomes selected and the inspector does not open

  @NOP-RO-007
  Scenario: The document passed in is never mutated
    Given a frozen (deep Object.freeze) document
    When the visitor selects nodes, dives and changes the wire style
    Then no error is thrown

  @NOP-RO-008
  Scenario: Arrow keys do not move a node
    Given node "box1" is selected and has keyboard focus
    When the visitor presses the arrow keys
    Then "box1" keeps its position

  @NOP-RO-009
  Scenario: Clicking a wire changes nothing
    Given the inspector shows "box1"
    When the visitor clicks a wire
    Then no wire is selected and "box1" stays selected

  @NOP-RO-010
  Scenario: Ctrl or Cmd with a click selects only the clicked node
    Given node "box1" is selected
    When the visitor Ctrl-clicks or Cmd-clicks "tube1"
    Then only "tube1" is selected

  @NOP-RO-011
  Scenario: Holding Shift and dragging the canvas pans
    When the visitor holds Shift and drags the empty canvas
    Then the view pans, no selection box is drawn and no node is selected
    # There is no multiple selection, so React Flow's Shift selection box is turned off (selectionKeyCode null)

  @NOP-RO-012
  Scenario: Reading and copying stay possible
    Given a node with a VEX snippet is inspected
    Then its parameter values and code can be selected as text
    And the code has a Copy button
