Feature: Navigate the network
  Visitors pan, zoom, fit the view and dive into exported subnetworks with a Houdini-style path
  bar (back / forward history and a dimmed trail of visited levels).

  Background:
    Given the viewer shows the "assets" example (subnetwork "scene" holds the asset "pebble_scatter1" and the subnetwork "props")

  # View

  @e2e @NOP-NAV-001
  Scenario: The network is fitted on load
    When the viewer has loaded
    Then every node is inside the view with 14% padding
    And the names beside the nodes are inside the view too, also after H

  @component @NOP-NAV-002
  Scenario: fitView false keeps the initial view
    Given the viewer is rendered with fitView false
    When it has loaded
    Then the viewport is not changed by the viewer

  @e2e @component @NOP-NAV-003
  Scenario: Pan and zoom limits
    When the visitor drags the empty canvas
    Then the view pans
    When the visitor zooms with the wheel past the limits
    Then the zoom stays between 0.08 and 3.5
    And double-clicking the canvas does not zoom
    # Dragging runs in the browser tests (with NOP-NAV-006), the zoom limits in the component tests

  @e2e @mobile @NOP-NAV-004
  Scenario: Touch pan and pinch zoom
    Given a phone-sized viewport, and the viewer is fullscreen or uses touchPan "one-finger" (the playground)
    When the visitor drags with one finger and pinches with two fingers
    Then the view pans and zooms
    And the page behind does not scroll

  @e2e @NOP-NAV-005
  Scenario Outline: Fit and frame hotkeys
    Given focus is inside the viewer
    And <selection>
    When the visitor presses "<key>"
    Then <result>

    Examples:
      | selection               | key | result                                                    |
      | no node is selected     | H   | the whole network is fitted                               |
      | node "box1" is selected | H   | the whole network is fitted                               |
      | node "box1" is selected | F   | "box1" is framed with zoom at most 1.6 (1 in viewers narrower than 448 pixels) |
      | no node is selected     | F   | the whole network is fitted                               |

  @e2e @NOP-NAV-006
  Scenario: A double-click or double-tap on the empty canvas fits the network
    Given the visitor has moved the view
    When the visitor double-clicks (or double-taps) the empty canvas
    Then the whole network is fitted, as the toolbar has no Fit button
    And a single click only clears the selection

  @e2e @NOP-NAV-007
  Scenario: Hotkeys never act on the host page
    Given the pointer is outside the viewer and focus is on the host page
    When the visitor presses H, F, I, U, O and Shift+S
    Then the viewer does not react and the keys are not prevented
    Given focus is inside the viewer at the top level and no node is selected
    When the visitor presses I or U
    Then nothing happens and the keys are left to the page, while H is handled

  @e2e @NOP-NAV-008
  Scenario: Hotkeys are ignored while typing
    Given the pointer is over the viewer and focus is in a text field of the host page
    When the visitor types "hfiuo"
    Then the viewer does not react and the letters appear in the text field

  @e2e @NOP-NAV-009
  Scenario: Hotkeys with Ctrl, Cmd or Alt are left to the browser
    Given focus is inside the viewer
    When the visitor presses Alt+F, or H or O with Ctrl, Cmd or Alt
    Then the viewer does not frame, fit or show the overview, and the keys are not prevented
    # Ctrl+F (Cmd+F) and Ctrl+G with focus inside the viewer belong to the node search (NOP-FIND-002)

  @e2e @mobile @NOP-NAV-010
  Scenario: Two fingers move the network on a scrolling page
    Given a touch screen and a viewer embedded in a page (touchPan "two-fingers", the default), not fullscreen
    When the visitor drags with one finger over the canvas
    Then the page scrolls, the network does not move
    And the hint "Use two fingers to move the network" appears for a moment, with a big "Open fullscreen" button
    When the visitor taps that button while the hint is shown
    Then the viewer goes fullscreen
    When the visitor drags or pinches with two fingers
    Then the network moves and zooms and the page is not zoomed
    And a tap still selects a node, and in fullscreen one finger moves the network again

  # Subnetworks

  @e2e @NOP-NAV-020
  Scenario: Double-click dives into a subnetwork
    When the visitor double-clicks a node that has exported children
    Then the child network is shown, and fitted unless fitView is false (NOP-NAV-034)
    And the path bar ends with that node's name, marked as the current location

  @e2e @mobile @NOP-NAV-021
  Scenario: Double-tap dives into a subnetwork on touch screens
    Given a phone-sized viewport
    When the visitor taps a subnetwork node twice within 400 milliseconds
    Then the child network is shown

  @component @NOP-NAV-022
  Scenario: Two slow clicks only select
    When the visitor clicks a subnetwork node twice 600 milliseconds apart
    Then the node stays selected and the network on screen does not change

  @component @NOP-NAV-023
  Scenario: Nodes without exported children cannot be entered
    When the visitor double-clicks a node with isSubnetwork false
    Then the node is selected and the network on screen does not change

  @e2e @NOP-NAV-024
  Scenario: I dives in, U goes up
    Given a subnetwork node is selected and focus is inside the viewer
    When the visitor presses "I"
    Then the child network is shown
    When the visitor presses "U"
    Then the parent network is shown
    And the subnetwork node the visitor came from is selected

  @e2e @NOP-NAV-025
  Scenario: The inspector button opens a subnetwork
    Given a subnetwork node with 12 child nodes is selected
    When the visitor clicks "Open subnetwork (12 nodes)" in the inspector
    Then the child network is shown

  @component @NOP-NAV-026
  Scenario: Each level remembers its view
    Given the visitor zoomed into a corner of the root network
    When the visitor dives into a subnetwork and goes back up
    Then the root network shows the same corner at the same zoom

  @component @NOP-NAV-027
  Scenario: Back and forward history
    Given the visitor went from the root into "A", then into "A/B"
    When the visitor clicks "Go back to the previous network"
    Then "A" is shown and "Go forward to the next network" is enabled
    When the visitor clicks "Go forward to the next network"
    Then "A/B" is shown and the forward button is disabled

  @component @NOP-NAV-028
  Scenario: Visited deeper levels stay in the path bar, dimmed
    Given the visitor went into "A/B" and then clicked the root segment
    Then the path bar shows the root, "A" and "B"
    And "A" and "B" are dimmed and clickable
    When the visitor clicks "B"
    Then "A/B" is shown

  @component @NOP-NAV-029
  Scenario: Diving somewhere else replaces the trail
    Given the trail is root, "A", "B" and the root is shown
    When the visitor dives into "C"
    Then the path bar shows the root and "C" only

  @component @NOP-NAV-030
  Scenario: The path bar starts at the exported network
    Given the exported root path is "/obj/assets/scene"
    Then the first path segment is "scene"
    And "obj" and "assets" are not shown

  @component @NOP-NAV-031
  Scenario Outline: Path bar icons
    Given the exported root has <pathNodes>
    Then the first segment icon is <icon>

    Examples:
      | pathNodes                                                   | icon                               |
      | a last pathNode with a custom icon in the document "icons"  | that custom icon as an image       |
      | no pathNodes and a root type "emjud::pebble_scatter::1.0"   | the cardboard box asset icon       |
      | no pathNodes and a root type "geo"                          | the Geometry cylinder icon         |

  @component @NOP-NAV-032
  Scenario: Loading another file starts at its root
    Given the visitor is inside a subnetwork of one document
    When a different document is passed to the viewer
    Then its root network is shown with an empty history and no remembered views

  @component @NOP-NAV-033
  Scenario: The node count follows the network on screen
    When the visitor dives into a subnetwork with 12 nodes
    Then the path bar says "12 nodes"

  @component @NOP-NAV-034
  Scenario: fitView false does not fit subnetworks either
    Given the viewer is rendered with fitView false
    When the visitor dives into a subnetwork for the first time
    Then the view is not changed by the viewer

  @component @NOP-NAV-035
  Scenario: A held key does not repeat, and Shift only works with S
    Given focus is inside the viewer and a node is selected
    When the visitor holds F down, or presses Shift+F
    Then the view does not change and the keys are left to the page

  @component @NOP-NAV-036
  Scenario: Keyboard focus stays in the viewer while moving between levels
    Given a subnetwork node is selected and focus is inside the viewer
    When the visitor presses "I"
    Then focus is on the viewer
    When the visitor presses "U"
    Then focus is on the subnetwork node the visitor came from

  @component @NOP-NAV-037
  Scenario: Diving in after going back drops the forward history
    Given the visitor went into "A/B" and then clicked "Go back to the previous network"
    When the visitor dives into another subnetwork of "A"
    Then "Go forward to the next network" is disabled
    And "Go back to the previous network" returns to "A", not to "A/B"

  @component @NOP-NAV-038
  Scenario: The current path segment is not a button
    When the visitor is inside "A"
    Then the "A" segment is marked as the current location and cannot be clicked
    And the other segments are buttons whose tooltip says "Go to" and their full path

  @component @NOP-NAV-039
  Scenario: Diving in clears the selection
    Given the inspector shows subnetwork "A"
    When the visitor dives into "A"
    Then no node is selected and the inspector is closed

  @component @NOP-NAV-040
  Scenario: The network stays hidden until its start view is fitted
    When the viewer loads a network
    Then the canvas and grid show, but the nodes stay hidden until the start view is on screen
    And a network that never fits (an empty one) is shown after at most 400 milliseconds
