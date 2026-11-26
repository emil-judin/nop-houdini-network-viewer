@e2e
Feature: Playground web app
  The hosted playground (src/playground/) is laid out like a Houdini desktop, without a menu bar: a
  collapsible Networks pane with the examples beside the network view, and a status bar. It opens a
  visitor's own export, introduces itself on the first visit, shows how to embed a network on a
  website, offers the exporter download and collects tester feedback.

  Background:
    Given the production playground build is served from a sub-path such as "/nop-houdini-network-viewer/"

  # Demos and loading

  @NOP-PG-001
  Scenario: The playground opens on the first example
    When the playground loads
    Then the first example of the Networks pane ("Start Here") is current and its network is shown
    And the examples are the seven guided networks of fixtures/examples/
    And each example row has a short description of what it shows, and every row has room for two description lines, so all are the same height (trial)
    And the Networks pane is 360 pixels wide beside the network (240 where it floats over it on phones)

  @NOP-PG-042
  Scenario: Every example row shows its node count from the start
    When the playground loads
    Then every example row shows the number of nodes in its top level, for example "8 nodes"
    And the counts are read from the example files when the playground is built, so no other example is downloaded for them
    And the browser tab says "NOP Playground", and so does the page heading for screen readers
    And all icons, the favicon and the manifest load from the sub-path

  @NOP-PG-051
  Scenario: The Shared Selection example shows where the selection continues
    When the "Shared Selection" example is opened
    Then "scatter_trees" shows one stub toward the node that feeds it, and "place_trees" shows three: one per wire in and out
    And every stub is inside the framed view, and no node outside the selection is named

  @NOP-PG-002
  Scenario: Switching examples and linking to one
    When the visitor clicks "VEX Wrangles"
    Then the vex_wrangles network is shown from its root
    When the visitor opens "?example=vex"
    Then the playground starts on "VEX Wrangles"
    And an example whose file is missing in fixtures/examples/ is not listed

  @NOP-PG-003
  Scenario: Open a .json file
    Given the "Your Files" group follows the examples directly and never scrolls out of view (on short screens the example list scrolls instead): its title always shows, then "No networks uploaded" (centered, muted) while there are none, and a drop zone: a dashed frame with an upload icon, "Drop a .json file here", a blue "Open file" and a grey "Paste" button and "Files stay in your browser."
    And the drop zone turns blue while a file is dragged over the page
    And on touch screens the icon and the drop line are hidden
    And a note under them says files stay in the browser (and, with a mouse, that a file can be dropped on the page)
    When the visitor clicks "Open file" and chooses "my_net-network.json"
    Then a row "my_net-network.json" appears between the "Your Files" title and the box, becomes current and shows the network
    And choosing the same file again reloads its row instead of adding one

  @NOP-PG-043
  Scenario: Own files collect in a list for the visit
    When the visitor opens or drops "a-network.json" and then "b-network.json"
    Then both have a row under "Your Files", in that order, and "b-network.json" is current
    And clicking "a-network.json" shows that network again
    And a paste gets a row "Pasted: <network name>"; pasting the same network again reloads that row
    And many rows scroll inside the group, so the examples above keep their room
    And the list is kept only while the page is open (nothing is stored or sent)
    And on a phone the pane folds to show the network

  @NOP-PG-004
  Scenario: Drag and drop a file anywhere
    When the visitor drags a file over the page
    Then the overlay "Drop your Houdini network .json file" says the file stays in the browser
    When the visitor drops it
    Then the network is shown in its own row of the Networks pane
    And no network request carries the file

  @NOP-PG-005
  Scenario: Dragging selected text does not show the overlay
    When the visitor drags selected text over the page
    Then no drop overlay is shown

  @NOP-PG-006
  Scenario: Ctrl+V pastes an export
    Given the clipboard holds JSON copied by "Copy for NOP"
    When the visitor presses Ctrl+V (Cmd+V on a Mac) outside any text field
    Then a "Pasted: <network name>" row of the Networks pane becomes current and shows the network

  @NOP-PG-007
  Scenario Outline: Paste is ignored where it should not act
    Given <situation>
    When the visitor pastes text
    Then no network is loaded

    Examples:
      | situation                                     |
      | the clipboard text does not start with "{"     |
      | focus is in a text field (such as the feedback message) |
      | the Exporter dialog is open                    |

  @NOP-PG-008
  Scenario: The Paste button
    When the visitor clicks "Paste" in the Networks pane and allows clipboard access
    Then the clipboard network is shown
    When clipboard access is blocked or unsupported
    Then the error bar suggests pressing Ctrl+V (Cmd+V on a Mac)

  @NOP-PG-009
  Scenario: Load errors are readable and dismissible
    When the visitor drops "broken.json" that is not valid JSON
    Then the error bar says "Could not read broken.json:" with the reason
    And the network on screen does not change
    When the visitor clicks "Dismiss"
    Then the error bar is gone

  @component @NOP-PG-049
  Scenario: An oversized file is refused before it is read
    When the visitor opens a file larger than 100 MB
    Then the error bar says it is larger than 100 MB, more than the viewer can show
    And the file is never read into memory

  @NOP-PG-050
  Scenario: An example that cannot be loaded
    Given the download of an example's network fails (for example a dropped connection)
    When the visitor opens that example
    Then the network view says the example network could not be loaded and suggests reloading the page
    And the embed tip is not shown while no network is on screen

  @NOP-PG-010
  Scenario: A newer schema is refused with an update hint
    When the visitor drops a file with schemaVersion "2.0.0"
    Then the error bar says the file was made by a newer NOP exporter

  @NOP-PG-012
  Scenario: The status bar shows the versions
    When a network is shown
    Then the status bar shows "Houdini" with the version the network was exported from
    And "Exporter" with the version of the exporter download
    And "Playground" with the version of the page itself
    Given a screen narrower than 768 pixels
    Then the status bar shows only the NOP icon, "NOP", the version and "Not affiliated with SideFX."

  @NOP-PG-013
  Scenario: The Networks pane folds
    Given a screen at least 768 pixels wide
    Then the Networks pane is open beside the network
    When the visitor clicks "Hide networks panel"
    Then it folds to a thin "Networks" strip, and clicking the strip opens it again
    Given a phone screen
    Then the pane starts folded, floats over the network when opened and folds again after a choice
    And a tap anywhere beside the floating pane folds it, without selecting or moving anything in the network
    And the floating pane scrolls as a whole (examples, Your Files, banner and buttons): nothing in it is pinned
    And its buttons look 36 pixels high on touch screens, with a 44 pixel tap area
    And the playground page itself never scrolls, so mobile Chrome leaves no gap at the bottom

  @NOP-PG-014
  Scenario: The about block at the bottom of the Networks pane (trial)
    When the Networks pane is open
    Then its bottom shows the welcome card's banner (picture, NOP logo, "NOP", "PLAYGROUND"), "Get the exporter", "Embed", "Help" and (with an access key) "Feedback"
    And there is no version line under the banner (the status bar shows the version)
    And there is no menu bar
    When the pane is folded
    Then the status bar shows the NOP icon and name
    Given a screen less than 640 pixels high
    Then the banner is left out so the list keeps its room

  @NOP-PG-015
  Scenario: The welcome card on the first visit
    Given a browser that has not closed the welcome card before
    When the playground loads
    Then "Welcome" opens like a desktop app's start screen, with a picture banner with the NOP logo and name, like Houdini's Start Here window
    And under a one-line intro, the left column has "Your networks" (Get the exporter, Open a network file, Embed on your website) and "Learn more" (Docs and GitHub, in a new tab)
    And "Examples" on the right lists every example in two columns with a small thumbnail of its network, its name and its node count, the one on screen marked
    And on phones the columns stack: the links first, then the examples, and on screens lower than 560 pixels the banner is left out
    When the visitor clicks "Start exploring" (or presses Escape)
    Then the card closes and does not come back on the next visit
    When the visitor clicks "Help" in the Networks pane
    Then the card opens again
    Given the browser blocks local storage
    Then the card shows on every visit, and the page still works

  @NOP-PG-019
  Scenario: The welcome card opens what it names
    Given the welcome card is open
    When the visitor clicks an example thumbnail
    Then the card closes and that example is on screen
    When the visitor clicks "Get the exporter"
    Then the card closes and the exporter download opens
    When the visitor clicks "Open a network file"
    Then the card closes and the file picker opens
    When the visitor clicks "Embed on your website"
    Then the card closes and the example page opens in a new tab with the Start Here example and its code

  @NOP-PG-016
  Scenario: Embed opens the example page with the Start Here example and working code
    Given any network is on screen (an example or the visitor's own file)
    When the visitor clicks "Embed" at the bottom of the Networks pane, under "Get the exporter"
    Then the example page opens in a new tab, without parameters, and the playground tab stays as it was
    And "Embed a network on your website" at its top always shows the Start Here example with the real <houdini-network> web component (owner decision 2026-11-04: the page does not follow the playground)
    And nothing of the visitor's own file is passed to the page
    And under it are the options (file address, height, label size, wires, start node, toolbar, fullscreen button, overview, inspector, Download JSON button) and the HTML / React / iframe code tabs with Copy
    And the file address is the example's published address, for example ".../examples/start_here-network.json", which downloads
    When the visitor changes an option
    Then the network above follows it and the code says the same
    And the pane tab above the network has no Embed button, and there is no Embed dialog any more


  @NOP-PG-047
  Scenario: An embed tip on the network points to the embed code until it is closed
    Given a browser that has never been shown the embed tip (first visit)
    When the visitor starts exploring (the welcome card is closed, or was seen before)
    Then the tip is not there yet, and 10 seconds later it slides in from below (no slide with reduced motion)
    When a network is on screen on a wide screen (768 pixels and more)
    Then a card at the bottom left of the network, "This viewer works on your website too", shows a screenshot of the example page's sample article with its For-Each network
    And its "Get the embed code" link opens the example page in a new tab, like "Embed" in the Networks pane
    Given a phone (narrower than 768 pixels)
    Then the tip is a strip docked under the network, the full width of its pane, with "Works on any website", "Embed code" and a close button, and it covers no part of the network
    And its link and close button have 44 pixel tap areas
    And it stays while the visitor switches networks
    When the visitor closes the tip
    Then it is gone
    And on later visits it never comes again, whether it was closed or not (owner decision 2026-11-14)
    And the tip is not shown while a network is loading or failed to load (owner decision 2026-11-14, mockups C4 and C6)

  @NOP-PG-041
  Scenario: The start node is picked from the network, and every viewer setting is offered
    Given the example page shows a network with its options
    Then "Start framed on node" lists "Whole network" and the nodes of the network's top level in alphabetical order
    And it is a text field when the network file could not be read
    When the visitor picks "lift_tube"
    Then the network on the page frames lift_tube right away and the code says focus-node="lift_tube"
    And "Fullscreen button" and "Download JSON button" set fullscreen and debug-actions
    And touch-pan, hotkeys and fit-view are not offered (owner decision 2026-11-04: they stay in the docs and the code)

  @NOP-PG-017
  Scenario: The example page
    When the visitor opens "example-site.html" (from Embed, the welcome card's "Embed on your website" or a link)
    Then "Embed a network on your website" at the top has a heading as big as the article's
    And a light sample article below shows two networks embedded by the <houdini-network> web component, served from the playground's "lib/" folder
    And a note at the top says it is an example page, with a link back to the playground
    And the page has no console errors under its Content-Security-Policy

  @NOP-PG-018
  Scenario: The example page shows the code under each network
    When the visitor opens "example-site.html"
    Then "Embed a network on your website" shows the Start Here example with its options and code
    And under each article network are the HTML / React / iframe code tabs (no options), with the network's address and start node filled in

  # Embed code (the example page's embed panel)

  @NOP-PG-021
  Scenario Outline: Snippet per embed type
    Given the embed panel is shown
    When the visitor picks the "<tab>" tab
    Then the snippet contains <content>

    Examples:
      | tab    | content                                                                                 |
      | HTML   | a module script from cdn.jsdelivr.net pinned to the package version and <houdini-network src= |
      | React  | import { HoudiniNetwork } from 'nop-houdini-network-viewer' (no showDebugActions prop, hidden by default) |
      | iframe | an iframe whose src is this page with embed=true and the encoded file URL                |

  @NOP-PG-022
  Scenario: Only non-default options appear in the snippet
    Given the embed panel shows the HTML snippet
    When the visitor sets label size "large", ticks "Overview open at start", enters "OUT" as the start node and sets height 800
    Then the snippet has label-size="large", minimap="true", focus-node="OUT" and height: 800px
    And it has no toolbar or inspector attribute

  @NOP-PG-023
  Scenario: The iframe tab warns about relative file URLs
    Given the iframe tab is active and the file URL is "my-network.json"
    Then a note asks for a full https:// address

  @NOP-PG-024
  Scenario: Snippet text is escaped
    When the visitor types the file URL 'a"b<c.json'
    Then the HTML snippet contains src="a&quot;b&lt;c.json"

  @NOP-PG-025
  Scenario: Copy the snippet
    When the visitor clicks the copy button
    Then the snippet is on the clipboard and the button confirms it

  @NOP-PG-026 @fixed-U-03
  Scenario: Typing a new height works
    When the visitor clears the height field and types "800"
    Then the field shows "800" while typing and the snippet uses 800px

  @NOP-PG-027 @fixed-U-04
  Scenario: Unpublished package note
    Given the package is not published on npm yet
    When the visitor opens the HTML or React tab
    Then a note says the package is not on npm yet and points to the iframe tab

  # Dialogs

  @NOP-PG-030
  Scenario: Exporter dialog downloads
    When the visitor clicks "Get the exporter"
    Then the dialog links "downloads/nop-exporter.zip" relative to the page
    And the download succeeds and the zip contains "nop.json" and "nop/scripts/python/nop_exporter.py"

  @NOP-PG-031
  Scenario: Dialogs close in every usual way
    Given a playground dialog is open
    When the visitor presses Escape, clicks the backdrop, or clicks "Close"
    Then the dialog closes and focus returns to the page

  @NOP-PG-032
  Scenario: The Feedback button only exists when configured
    Given the build had no VITE_WEB3FORMS_KEY
    Then no "Feedback" button is shown

  @NOP-PG-033
  Scenario: Send feedback
    Given the build had a VITE_WEB3FORMS_KEY and the Web3Forms endpoint is mocked
    When the visitor writes a message, enters "tester@example.com" and clicks "Send"
    Then one POST goes to "https://api.web3forms.com/submit" with the message, the version, the browser and the network name
    And "tester@example.com" is sent as the reply-to email
    And the network file itself is not in the request
    And the dialog says "Thank you, your feedback was sent."

  @NOP-PG-034
  Scenario: Feedback errors and limits
    Given the Web3Forms endpoint fails
    When the visitor sends a message
    Then an alert says it was not sent and the message stays in the field
    And an empty message cannot be sent and the message is limited to 5000 characters

  @component @NOP-PG-039
  Scenario: Houdini files are shared through a separate upload page
    When the Feedback dialog is open
    Then it links "Upload it to Dropbox" (the owner's Dropbox file request) in a new tab, so the message typed so far stays
    And the form itself never sends a file, as its notice says

  @NOP-PG-035
  Scenario: The spam honeypot is invisible
    Then the honeypot checkbox is not visible, not focusable and hidden from screen readers

  @NOP-PG-036
  Scenario: The playground has no icon gallery (it lives in the nop-icon-pipeline repository)
    When the visitor opens the playground with "?icons"
    Then the first example opens, the Networks pane has no Development section or icon gallery row
    And there is no request to "__local_houdini_ref_icons.json"

  @NOP-PG-037
  Scenario: Search engines are kept out during testing
    Then the page has <meta name="robots" content="noindex, nofollow">
    And with VITE_SITE_URL set, og:url and og:image are absolute URLs

  @NOP-PG-038
  Scenario: Example viewers appear in place
    When the example page loads
    Then the first viewer keeps its height from the first frame (600 pixels, 70% of the screen height on phones)
    And every viewer shows its network only once it is framed, never unfitted for a frame

  @NOP-PG-048
  Scenario: Disclaimer
    Then the status bar says "Not affiliated with SideFX." on every screen size
