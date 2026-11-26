Feature: Draw wires like Houdini 22
  Wires (src/components/edges/) support Houdini's "default" and "rounded" styles and highlight
  the connections of the selected node.

  @unit @NOP-WIRE-001
  Scenario: Default style between two node connectors
    Given a wire from (0, 0) to (200, 300) in style "default"
    When the wire path is built
    Then it leaves the output straight down, runs straight, and enters the input straight down
    And its bends are rounded

  @unit @NOP-WIRE-002
  Scenario: Rounded style shares a horizontal run below the output
    Given two wires from the same output at (0, 0) to inputs at (-200, 300) and (200, 300) in style "rounded"
    When both wire paths are built
    Then both drop the same short distance, run horizontally at the same height, then drop into their inputs
    And their corners are circular arcs

  @unit @NOP-WIRE-003
  Scenario: Wires at routing dots have no vertical stub
    Given a wire from a node to a dot
    When the wire path is built with targetIsDot true
    Then the path heads straight into the dot center

  @unit @NOP-WIRE-004
  Scenario: A vertical wire is a straight line
    Given a wire from (100, 0) to (100, 300) in either style
    When the wire path is built
    Then the path is a straight vertical line

  @unit @component @NOP-WIRE-005
  Scenario: The wire into the target points input of Copy to Points is dotted
    Given a wire into input 2 (target points) of a "copytopoints" node
    When it is drawn
    Then it is dotted (dots of 1.5 pixels every 4 pixels), like Houdini 22
    And wires into its first input stay solid

  @component @NOP-WIRE-010
  Scenario: Wires keep their on-screen width at every zoom level
    Given a rendered network
    When the view is zoomed from 0.1 to 3.5
    Then every wire stroke is 1.3 pixels wide on screen in "#7082b8"

  @component @NOP-WIRE-011
  Scenario: Wires of the selected node are highlighted through dots
    Given nodes "a", "b", "c", dots "__dot1" and "__dot2"
    And wires "a" to "__dot1", "__dot1" to "__dot2", "__dot2" to "b", and "b" to "c"
    When node "a" is selected
    Then the wires "a" to "__dot1", "__dot1" to "__dot2" and "__dot2" to "b" are drawn in "#a8b36f" above the others
    And the wire "b" to "c" keeps the normal color

  @component @NOP-WIRE-012
  Scenario: Clearing the selection removes the highlight
    Given node "a" is selected and its wires are highlighted
    When the empty canvas is clicked
    Then no wire is highlighted

  @component @NOP-WIRE-020
  Scenario: The wire style follows the export, then the prop
    Given a document whose root "wireStyle" is "rounded"
    When the viewer is rendered without a wireStyle prop
    Then wires use the "rounded" style
    When the viewer is rendered with wireStyle "default"
    Then wires use the "default" style

  @component @NOP-WIRE-021
  Scenario: Older exports without wireStyle use the default style
    Given a document without "wireStyle"
    When the viewer is rendered
    Then wires use the "default" style

  @component @NOP-WIRE-023
  Scenario: Wires to items outside an exported selection show as short stubs toward those items
    Given an export of a selection where "noise1" is fed from outside and output 1 of "copy1" feeds 2 items outside
    When the viewer is rendered
    Then the start of each of those wires is drawn from its connector toward the item outside, in the current wire style, dashed and fading out
    And "copy1" shows 3 stubs, one per wire, with no count
    And the stubs are drawn under the wires
    And the stubs name nothing, are not wires, do nothing when clicked or hovered, and are hidden from screen readers
    And the node's accessible name says it is wired to nodes outside this export
    Given a whole-network export
    Then no stubs are drawn

  @e2e @NOP-WIRE-022
  Scenario: The wire style buttons (the settings menu in narrow viewers) and Shift+S switch the wire style
    Given the viewer is shown with "default" wires
    When the visitor clicks the "Rounded" wire button (narrow viewers: picks "Rounded" in the View settings menu)
    Then wires use the "rounded" style and the button is pressed (the menu shows "Rounded" as checked)
    When the visitor presses Shift+S with the focus inside the viewer
    Then wires use the "default" style
