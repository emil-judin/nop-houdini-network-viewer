Feature: Accessibility and compatibility
  Pillar 6 (phones, tablets, current browsers) and WCAG 2.2 AA for the viewer and the playground.

  # Browsers and devices

  @e2e @NOP-A11Y-001
  Scenario Outline: The viewer works in every target browser
    Given the browser "<browser>"
    When the playground and the "?embed=true&demo=start" page are opened
    Then the network renders, a node can be inspected and a subnetwork entered

    Examples:
      | browser          |
      | Chromium desktop |
      | Firefox desktop  |
      | WebKit desktop   |
      | Pixel 7 (Chrome) |
      | iPhone 14 (Safari) |
      | iPad (Safari)    |

  @e2e @mobile @NOP-A11Y-002
  Scenario: Phone layout
    Given a 390 x 844 viewport
    Then the playground header wraps without horizontal page scrolling
    And the toolbar wraps onto a second row
    And the overview is hidden and the inspector opens as a bottom sheet

  @e2e @mobile @NOP-A11Y-003
  Scenario: Touch targets are at least 44 pixels
    Given a device with a coarse pointer
    Then every toolbar, path bar, inspector and dialog button is at least 44 by 44 pixels

  @e2e @NOP-A11Y-004
  Scenario: Desktop keeps the compact Houdini HUD
    Given a device with a fine pointer
    Then toolbar buttons keep their compact size

  @e2e @mobile @NOP-A11Y-005
  Scenario: Nothing depends on hover
    Given a touch-only device
    Then every action that has a hover tooltip on desktop is also reachable by tap
    And parameter information is available without hovering
    # Accepted limitation (owner, 2026-11-15): connector labels such as "Geometry to Process" are hover
    # tooltips on desktop only; touch devices do not show them

  @e2e @NOP-A11Y-006
  Scenario: The page has a standard viewport meta tag
    Then index.html has <meta name="viewport" content="width=device-width, initial-scale=1.0">

  # Automated WCAG checks

  @a11y @NOP-A11Y-010
  Scenario Outline: No serious axe violations
    When axe-core scans "<page>"
    Then there are no "serious" or "critical" violations

    Examples:
      | page                                   |
      | the playground with Start Here         |
      | the playground with the inspector open |
      | the open Feedback dialog               |
      | ?embed=true&demo=start                 |

  @a11y @NOP-A11Y-011
  Scenario: Every button has an accessible name
    Then every toolbar, path bar, inspector and dialog button has a non-empty accessible name

  @a11y @NOP-A11Y-012
  Scenario: Dialogs are labelled modal dialogs
    When any playground dialog opens
    Then it is a modal dialog named by its heading and focus moves into it

  @a11y @NOP-A11Y-013
  Scenario: The resize handle is an operable separator
    Then it has role "separator", a label, its orientation and current, minimum and maximum values
    And it can be focused with Tab and moved with the arrow keys

  # Keyboard and screen readers

  @a11y @NOP-A11Y-020 @fixed-A-01
  Scenario: Operate the network with the keyboard
    Given focus is on the viewer toolbar
    When the visitor presses Tab until focus leaves the toolbar
    Then focus moves to an operator node announced with its type and name, top to bottom
    When the visitor presses Enter
    Then the node is selected, the inspector opens and focus moves to its heading
    When the node is a subnetwork and the visitor activates "Open subnetwork" or presses "I"
    Then the visitor dives into it and focus stays inside the viewer
    When the visitor presses Escape inside the inspector
    Then the inspector closes and focus returns to the node

  @a11y @NOP-A11Y-021 @fixed-A-02
  Scenario: Single-key shortcuts only act while the viewer has focus
    Given the pointer rests over the viewer and focus is on the host page
    When the visitor presses "O"
    Then the viewer does not react
    When the visitor clicks the canvas and presses "O"
    Then the overview is hidden
    And with hotkeys "hover" the keys also act while the pointer is over the viewer

  @a11y @NOP-A11Y-022 @fixed-A-03
  Scenario: Text contrast
    Then all text in the toolbar, path bar, inspector and playground footer has at least 4.5:1 contrast

  @a11y @NOP-A11Y-023 @fixed-A-04
  Scenario: Network list and toggle groups have correct roles
    Then the rows of the playground Networks pane are buttons, the one on screen with aria-current
    And the wire style buttons have names and a pressed state; in narrow viewers the settings button says whether its menu is open, the wire styles are menu radio items and the overview a menu checkbox

  @a11y @NOP-A11Y-024 @fixed-A-05
  Scenario: Parameter rows are announced as label and value
    When a screen reader reads the "Translate" row
    Then it hears the label "Translate" together with its three values

  @a11y @NOP-A11Y-025 @fixed-A-09
  Scenario: Reduced motion
    Given the system prefers reduced motion
    When the view is fitted or framed
    Then it jumps without animation (no in-between views)
