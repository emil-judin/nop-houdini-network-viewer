Feature: Find a node
  Visitors find operator nodes by name or operator type, like Find Node in Houdini's Network
  Editor (`/`, Find Next Match `Ctrl+G` or `Shift+.`, Find Previous Match `Ctrl+Shift+G` or
  `Shift+,`). The search covers the whole exported network, subnetworks included, and only reads:
  it selects and frames nodes, it never changes them.

  Background:
    Given the viewer shows the "assets" example (subnetwork "scene" holds "props", which holds "details")

  # Opening and closing

  @e2e @component @NOP-FIND-001
  Scenario: Slash opens the search field
    Given focus is inside the viewer
    When the visitor presses "/"
    Then the "Find node" search field opens at the top of the canvas with keyboard focus
    And the "/" key is not typed into the field or passed to the browser

  @e2e @component @NOP-FIND-002
  Scenario: Ctrl+F opens the search only while the viewer has focus
    Given focus is inside the viewer
    When the visitor presses Ctrl+F (Cmd+F on a Mac)
    Then the search field opens and the browser's own find is not opened
    Given focus is on the host page, also with hotkeys "hover" and the pointer over the viewer
    When the visitor presses Ctrl+F
    Then the viewer does not react and the key is left to the browser

  @e2e @mobile @component @NOP-FIND-003
  Scenario: The search button opens the search on touch screens
    Given a phone-sized viewport
    When the visitor taps the "Find node" button in the pane header
    Then the search field opens across the canvas width
    And the field, its buttons and the header button are at least 44 pixels tall on touch screens
    And the field text is 16 pixels, so iOS Safari does not zoom the page

  @component @NOP-FIND-004
  Scenario: Escape or the close button closes the search
    Given the search field is open with focus in it
    When the visitor presses Escape
    Then the field closes and focus returns to the viewer (to the found node when one is selected)
    And the Parameter Inspector stays open
    When the visitor opens the search again
    Then the field shows the last search text, selected

  @component @NOP-FIND-005
  Scenario: With hotkeys "off" only the button opens the search
    Given the viewer is rendered with hotkeys "off"
    When the visitor presses "/" or Ctrl+F inside the viewer
    Then the search does not open
    And the "Find node" button still opens it

  # Finding

  @e2e @component @NOP-FIND-006
  Scenario: Enter selects and frames the first match
    Given the search field is open
    When the visitor types "wall" and presses Enter
    Then the first match in document order is selected, its parameters open, and it is framed like F
    And the line under the field says "1 of 1" and the full path of the match with its type

  @e2e @component @NOP-FIND-007
  Scenario: A match inside a subnetwork opens its level
    Given the top network is on screen
    When the visitor searches "polybevel" and presses Enter
    Then the "details" level inside "scene/props" is shown and the path bar ends with "details"
    And "polybevel1" is selected and framed
    And focus stays in the search field
    And "Go back to the previous network" returns to the top network

  @e2e @component @NOP-FIND-008
  Scenario Outline: Stepping through the matches
    Given the visitor searched "merge" (two matches, in "scene" and "scene/props") and the first is shown
    When the visitor presses <key>
    Then <result>

    Examples:
      | key                                       | result                                          |
      | Enter, Ctrl+G or the "Next match" button  | the next match is shown, the last wraps to the first |
      | Shift+Enter, Ctrl+Shift+G or "Previous match" | the previous match is shown, the first wraps to the last |
      | Shift+. with the field closed             | the next match is shown                         |
      | Shift+, with the field closed             | the previous match is shown                     |

  @component @NOP-FIND-009
  Scenario: Nothing found
    When the visitor searches "nothing"
    Then the line under the field says "No matches" (a polite live region for screen readers)
    And the previous and next buttons are disabled
    And Ctrl+G and Shift+. are left to the browser and the page

  @unit @NOP-FIND-010
  Scenario: Names and operator types match in every level
    When the visitor searches part of a name or an operator type, in any case
    Then every operator node whose name or type contains it is found, in the top network and in every exported subnetwork
    And the matches are in document order, a subnetwork before the nodes inside it
    And dots, network boxes and sticky notes are not searched

  @unit @NOP-FIND-011
  Scenario: Houdini wildcards
    When the search contains "*" or "?"
    Then the pattern has to match the whole name or type ("box*" finds "box1", not "mybox")

  @unit @NOP-FIND-012
  Scenario: A match knows where it is
    Then each match has the dive path to its level and its full Houdini path, such as "/obj/assets/scene/props/details/polybevel1"

  @e2e @a11y @NOP-FIND-013
  Scenario: The search field is accessible
    Given the search field is open with a match shown
    Then there are no serious axe violations
    And the field is a labelled search landmark whose status line describes it
