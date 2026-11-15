Feature: Viewer toolbar, overview, fullscreen and states
  The pane header above the canvas, network overview (minimap), fullscreen, debug actions,
  and the loading and error panels.

  # Toolbar

  @component @NOP-HUD-001
  Scenario: The pane header shows the path bar and the view tools in one row
    Given the viewer is rendered with showToolbar true and showDebugActions true
    Then one row is docked above the canvas like Houdini's Network Editor: the path bar fills it
    And in viewers at least 448 pixels wide after it come the node count, the two wire style buttons, the overview button, Save screenshot, Download JSON and Enter fullscreen, with no settings button
    And narrower viewers (phones) show only the View settings button and Enter fullscreen
    And there are no Fit, label size or Copy JSON buttons

  @component @NOP-HUD-004
  Scenario: Narrow viewers have wire style, overview and screenshot in the settings menu
    Given a viewer narrower than 448 pixels
    When the visitor opens the View settings menu
    Then it shows Wire Style with "Default (straight)" and "Rounded", the current one checked, and the focus on it
    And under it "Network overview" (a checkbox, hotkey O) and "Save screenshot (PNG)"
    And the arrow keys move between the two
    When the visitor picks Rounded
    Then the wire style changes, the menu closes and the focus returns to the settings button
    And Escape or a press outside closes the menu without a change
    And Home and End jump to the first and last item, and Tab closes the menu

  @e2e @NOP-HUD-033
  Scenario: The screenshot saves what the network shows
    Given the "start_here" example is on screen
    When the visitor clicks "Save screenshot" (in narrow viewers: View settings, then "Save screenshot (PNG)")
    Then a PNG named "start_here.png" is downloaded
    And it shows the canvas as on screen (pan, zoom, grid), without the pane header, the parameter pane and the overview
    And it is drawn at least at twice the screen size, in the browser only (the network is not sent anywhere)
    And the drawing library loads only on the first screenshot

  @component @NOP-HUD-035
  Scenario: A failed screenshot says so
    Given the browser cannot draw the screenshot
    When the visitor clicks "Save screenshot"
    Then the button waits (disabled) while the picture is drawn
    And then reads "Screenshot failed, try again" with a red camera for 3 seconds, and a warning is logged

  @e2e @NOP-HUD-034
  Scenario: Narrow viewers start without the overview
    Given a viewer narrower than 448 pixels opened with minimap="true"
    Then no overview is shown
    When the visitor turns on "Network overview" in the View settings menu
    Then the overview is shown

  @e2e @NOP-HUD-025
  Scenario: Narrow viewers keep the history buttons and show only the level on screen
    Given a viewer narrower than 448 pixels (a phone) inside a subnetwork
    Then the path bar shows back, forward and only the level on screen, with its icon and name
    And the parent levels, the dimmed trail and the Download JSON button are not shown
    And back and forward still move between the levels
    When the viewer is at least 448 pixels wide
    Then the whole path and the Download JSON button are shown again

  @component @NOP-HUD-002
  Scenario: showToolbar false hides the whole toolbar
    Given the viewer is rendered with showToolbar false
    Then neither the path bar nor any toolbar button is shown

  @component @NOP-HUD-003
  Scenario: The label size is a setting of the embedding page
    Given the host page renders the viewer with labelSize "large" (or label-size="large")
    Then every node name is drawn at 20px
    And visitors have no control to change it

  # Overview (minimap)

  @component @NOP-HUD-010
  Scenario: The overview colors nodes like Houdini
    Given a node with the display flag, a bypassed node, a red node and a network box
    When the overview is shown
    Then the display node is "#3098e5", the bypassed node "#e5c130", the red node red and the box in the box color

  @e2e @NOP-HUD-011
  Scenario: O and the overview button toggle the overview
    Given the overview is visible and the pointer is over the viewer
    When the visitor presses "O"
    Then the overview is hidden and the button is not pressed
    When the visitor clicks "Network overview"
    Then the overview is visible again

  @e2e @NOP-HUD-012
  Scenario: The overview is hidden in narrow viewers
    Given a viewer opened with the overview on (minimap)
    When it is 447 pixels wide
    Then neither the overview nor its toolbar button is shown, only the View settings button (NOP-HUD-034)
    When the viewer becomes 448 pixels wide
    Then the overview and its toolbar button are shown again
    # Reworded 2026-11-15: the older text predated the View settings menu, where narrow viewers keep the overview switch

  @e2e @NOP-HUD-013
  Scenario: Click and drag in the overview move the view
    Given the overview is visible
    When the visitor clicks a spot in the overview
    Then the view centers on that spot at the same zoom
    When the visitor holds the button and moves across the overview
    Then the view follows the pointer without jitter
    And the wheel over the overview zooms the view

  @component @NOP-HUD-014
  Scenario: The overview starts closed unless showMiniMap is set
    Given the viewer is rendered without showMiniMap (or the minimap attribute)
    Then the overview is hidden and can be shown with "O" or the overview button
    Given showMiniMap is true (minimap="true" or a bare minimap attribute)
    Then the overview is open at the start

  @e2e @NOP-HUD-015
  Scenario: The middle mouse button pans and never auto-scrolls inside the viewer
    When the visitor holds the middle mouse button over the canvas and moves the mouse
    Then the view pans like with the left button, as in Houdini
    And the browser's auto-scroll does not start (the press has its default cancelled)
    When the visitor presses the middle button outside the viewer
    Then the page keeps its normal middle-button behaviour

  @e2e @NOP-HUD-016
  Scenario: The start view frames the focus node
    Given focusNode "twist_piece" (focus-node attribute or URL parameter) names a node of the top level
    When the viewer opens
    Then the view is framed on that node like Houdini's F key, without selecting it
    Given focusNode names no node of the top level
    Then the whole network is fitted as without it
    And a new network document opens framed on the focus node again

  # Fullscreen (shown by default since 2026-10-29; showFullscreenButton false or fullscreen="false" hides it)

  @e2e @NOP-HUD-020
  Scenario: Native fullscreen where supported
    Given a desktop browser with the Fullscreen API
    When the visitor clicks "Enter fullscreen"
    Then the viewer container is the fullscreen element
    And the button is now "Exit fullscreen", in the blue selected state of the header buttons
    When the visitor presses Escape
    Then the viewer leaves fullscreen and the button is "Enter fullscreen" again
    # The browser handles Escape itself; the test leaves fullscreen the same way, with document.exitFullscreen()

  @e2e @mobile @NOP-HUD-021
  Scenario: CSS fullscreen fallback on iPhone Safari
    Given a browser where regular elements cannot go fullscreen
    When the visitor clicks "Enter fullscreen"
    Then the viewer covers the whole viewport, inside the safe-area insets
    And the page behind does not scroll
    When the visitor presses Escape or clicks "Exit fullscreen"
    Then the viewer returns to its place and page scrolling is restored

  @e2e @NOP-HUD-022
  Scenario: Fullscreen inside an iframe without permission falls back to CSS
    Given the viewer is inside an iframe without "allowfullscreen"
    When the visitor clicks "Enter fullscreen"
    Then the CSS fullscreen fallback is used

  @e2e @NOP-HUD-023 @fixed-Q-01
  Scenario: Only the chosen viewer goes fullscreen
    Given a page with two viewers
    When the visitor maximizes the first viewer
    Then only the first viewer shows "Exit fullscreen"
    And the second viewer keeps its normal layout

  @e2e @NOP-HUD-024
  Scenario: Fullscreen fits the network to the new size
    Given a viewer 480 pixels high on a page
    When the visitor clicks "Enter fullscreen"
    Then the viewer fills the screen and the whole network is fitted into it, even when the browser reports the new size late or before the switch
    When the visitor clicks "Exit fullscreen"
    Then the viewer is 480 pixels high again and the network is fitted as at the start

  # Debug actions

  @e2e @NOP-HUD-031
  Scenario: Download JSON
    Given showDebugActions is true, a viewer at least 448 pixels wide and the network path "/obj/for_each"
    When the visitor clicks "Download network JSON file"
    Then a file "for_each.json" with the document is downloaded in Chrome, Firefox and Safari

  @component @NOP-HUD-032 @fixed-U-05
  Scenario: Library users get no debug buttons by default
    Given the React component is rendered without showDebugActions
    Then no Download JSON button is shown

  # States

  @component @NOP-HUD-040
  Scenario: A broken file shows an error panel instead of crashing the page
    Given the host page renders the viewer with data {"foo": 1}
    Then an alert "This Houdini network could not be displayed." is shown inside the viewer
    And it shows the hint about the NOP shelf tool and the technical message
    And the rest of the host page keeps working

  @component @NOP-HUD-041
  Scenario: A render error is caught by the error boundary
    Given a document that throws while a node is drawn
    When the viewer renders it
    Then the error panel is shown with the error message
    When the host page passes a valid document
    Then the network is shown again

  @component @NOP-HUD-042 @fixed-U-01
  Scenario: An error inside a subnetwork offers a way back
    Given a subnetwork whose content throws while drawing
    When the visitor dives into it
    Then the error panel offers "Back to the top network"
    When the visitor clicks it
    Then the root network is shown again

  @component @NOP-HUD-043
  Scenario: Layout follows the viewer width, not the page width
    Given the page is 1400 pixels wide and the viewer sits in a 400 pixel column
    When a node is inspected
    Then the inspector is a bottom sheet and the overview is hidden
