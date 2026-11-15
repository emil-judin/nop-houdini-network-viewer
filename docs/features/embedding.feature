Feature: Embed the viewer on other websites
  Three ways in (pillar 1): the <houdini-network> web component, the React components from npm,
  and the playground's ?embed=true page for iframes.

  # Web component (src/web-component.ts)

  @e2e @NOP-EMB-001
  Scenario: Load a network from src
    Given a page with the web component script and <houdini-network src="network.json">
    When the page loads
    Then a loading panel is shown, then the network

  @e2e @NOP-EMB-002
  Scenario: Inline JSON child
    Given <houdini-network> containing <script type="application/json"> with an exported network
    When the page loads
    Then the network is shown without any network request

  @e2e @NOP-EMB-003
  Scenario: The data property wins over inline JSON and src
    Given <houdini-network src="a.json"> with inline JSON of network "b"
    When script sets element.data to network "c"
    Then network "c" is shown

  @e2e @NOP-EMB-004
  Scenario: Invalid inline JSON
    Given <houdini-network> containing <script type="application/json">{ broken</script>
    When the page loads
    Then the error panel says the inline script is not valid JSON

  @e2e @NOP-EMB-005
  Scenario: No source at all
    Given an empty <houdini-network></houdini-network>
    Then the panel says "No Houdini network file was given." and suggests src="my-network.json"

  @unit @NOP-EMB-006
  Scenario Outline: Attribute and URL parameter options
    When the option "<name>" is "<value>"
    Then the viewer option <option> is <result>

    Examples:
      | name          | value   | option           | result      |
      | label-size    | large   | labelSize        | "large"     |
      | label-size    | huge    | labelSize        | not set     |
      | wire-style    | rounded | wireStyle        | "rounded"   |
      | minimap       | false   | showMiniMap      | false       |
      | minimap       | 0       | showMiniMap      | false       |
      | minimap       | no      | showMiniMap      | false       |
      | minimap       | OFF     | showMiniMap      | false       |
      | minimap       |         | showMiniMap      | true        |
      | focus-node    | transform1 | focusNode     | "transform1" |
      | toolbar       | false   | showToolbar      | false       |
      | inspector     | false   | showInspector    | false       |
      | debug-actions | true    | showDebugActions | true        |
      | fit-view      | false   | fitView          | false       |

  @e2e @NOP-EMB-007
  Scenario: Changing an attribute updates the viewer
    Given <houdini-network src="a.json"> is shown
    When script sets the attribute "label-size" to "small"
    Then node labels switch to the small size
    When script sets "src" to "b.json"
    Then network "b" is loaded

  @e2e @NOP-EMB-008 @fixed-Q-04
  Scenario: Changing an option keeps the visitor's place
    Given a web component with inline JSON and the visitor inside a subnetwork with a node selected
    When script sets the attribute "label-size" to "large"
    Then the same subnetwork and selection are still shown

  @e2e @NOP-EMB-009
  Scenario: Default size and hidden attribute
    Given <houdini-network> without a style
    Then it is a block 480 pixels high
    When the "hidden" attribute is set
    Then it is not displayed

  @e2e @NOP-EMB-010
  Scenario: Moving the element keeps it alive, removing it cleans up
    Given a shown web component
    When script moves it to another parent
    Then the network is still shown without reloading
    When script removes it from the page
    Then its React root is unmounted

  @e2e @NOP-EMB-011
  Scenario: Fonts are registered once in the page head
    Given a page with three web components
    Then the head contains exactly one style element with "data-houdini-network-fonts"
    And node labels use Source Sans Pro

  @e2e @NOP-EMB-012
  Scenario: Host page styles cannot reach inside, viewer styles cannot leak out
    Given a host page with "button { background: red }", "* { box-sizing: content-box }" and a 62.5% root font size
    When a web component is shown
    Then the viewer's buttons, borders, shadows and pixel sizes look the same as on a plain page
    And the host page's own elements are unchanged

  @e2e @NOP-EMB-013
  Scenario: Registering the script twice is harmless
    Given the web component script is included twice
    Then no "already defined" error is thrown

  @component @NOP-EMB-014
  Scenario: Inline JSON added later by a page script is read
    Given an empty <houdini-network>
    When a page script adds a <script type="application/json"> child with an exported network
    Then the network is shown

  @component @NOP-EMB-015
  Scenario: Setting data back to null shows the other source again
    Given <houdini-network> with inline JSON of network "b" and element.data set to network "c"
    When script sets element.data to null
    Then network "b" is shown again

  # Loading errors (src/embed/fetchNetwork.ts)

  @unit @NOP-EMB-020
  Scenario Outline: Readable download errors
    Given fetching "<src>" <response>
    When the network is downloaded
    Then the error contains "<message>"

    Examples:
      | src                     | response                     | message                                              |
      | https://other.site/a.json | fails (CORS or offline)    | that server must allow cross-origin requests (CORS) |
      | missing.json            | returns HTTP 404             | (HTTP 404). Check that the file path is correct      |
      | wrong.json              | returns an HTML page with 200 | returned a web page instead of the JSON file        |
      | bad.json                | returns "{ not json"         | is not a valid JSON file                             |

  @unit @NOP-EMB-021
  Scenario: Cookies are not sent to other sites
    When a network is downloaded from another origin
    Then the request uses credentials "same-origin"

  @component @NOP-EMB-022
  Scenario: A new src cancels the previous download
    Given RemoteHoudiniNetwork is loading "a.json"
    When its src changes to "b.json" before "a.json" finishes
    Then the first request is aborted and only "b.json" is shown
    And if "a.json" still arrives after the cancel, it is ignored

  @unit @NOP-EMB-023 @fixed-S-03
  Scenario: Oversized or slow files are refused
    Given a response larger than 100 MB, or one that takes longer than 30 seconds
    When the network is downloaded
    Then the download stops with a readable message
    And a response without a declared length is refused once it is read and too large

  @unit @NOP-EMB-024
  Scenario: Browsers without AbortSignal.timeout still download
    Given a browser without AbortSignal.timeout
    When a network is downloaded
    Then it is shown, without a time limit

  # iframe page (src/playground/EmbedView.tsx)

  @e2e @NOP-EMB-030
  Scenario: The embed page shows only the viewer
    When "?embed=true&src=https://example.com/a.json" is opened
    Then only the viewer is shown, without the playground header or footer
    And the debug buttons are hidden
    And the playground and demo chunks are not downloaded

  @e2e @NOP-EMB-031
  Scenario Outline: Playground examples in embed mode
    When "?embed=true&demo=<demo>" is opened
    Then <result>

    Examples:
      | demo    | result                                  |
      | start   | the Start Here example is shown          |
      | vex     | the VEX Wrangles example is shown        |
      | board   | the "No Houdini network file was given." panel is shown (the Circuit demos are no longer examples) |
      | other   | the "No Houdini network file was given." panel is shown |

  @e2e @NOP-EMB-032
  Scenario: Embed page options use the attribute names
    When "?embed=true&demo=start&label-size=large&minimap=false&toolbar=false" is opened
    Then labels are large and neither the overview nor the toolbar is shown

  @e2e @NOP-EMB-033 @fixed-S-04
  Scenario: A network from another site is labelled with its host
    When "?embed=true&src=" names a file on another site
    Then a line under the viewer says "Network from <host>, shown with the NOP viewer"
    And a link to the NOP site cannot pass off someone else's network as NOP content

  @e2e @NOP-EMB-034
  Scenario: A known demo wins over src
    When "?embed=true&demo=start&src=" names a file on another site
    Then the Start Here example is shown, the file is not loaded and no host line is shown

  # npm package (src/index.ts, vite.lib.config.ts)

  @component @NOP-EMB-040
  Scenario: The React component renders from data
    Given a React app that imports HoudiniNetwork and "nop-houdini-network-viewer/style.css"
    When it renders <HoudiniNetwork data={network} />
    Then the network is shown inside an element with class "nop-root"

  @component @NOP-EMB-041
  Scenario: RemoteHoudiniNetwork prefers data over src
    When it renders with both data and src
    Then the data is shown and no request is made

  @unit @NOP-EMB-042
  Scenario Outline: The npm stylesheet is scoped to the viewer
    When the selector "<selector>" is scoped
    Then it becomes "<scoped>"

    Examples:
      | selector          | scoped                                   |
      | :root             | .nop-root                                |
      | .nop-root         | .nop-root.nop-root                       |
      | .nop-root .x      | .nop-root.nop-root .x                    |
      | *                 | :is(.nop-root, .nop-root *)              |
      | svg path          | .nop-root svg path                       |
      | .flex             | :is(.nop-root, .nop-root *).flex         |

  @e2e @NOP-EMB-043
  Scenario: The npm stylesheet leaves the host page alone
    Given a host page with its own Tailwind build using ".flex" and its own React Flow diagram
    When the NOP stylesheet and viewer are added
    Then the host's ".flex" elements and its React Flow diagram look the same as before
    And the viewer looks the same as on a plain page
    # The test page loads dist/style.css without a bundler, so it checks the host's own elements only;
    # NOP-EMB-044 checks that every built rule is scoped to .nop-root

  @unit @NOP-EMB-044
  Scenario: Every built stylesheet rule is scoped
    Given the built "dist/style.css"
    Then every selector outside keyframes and nested "&" rules contains ".nop-root"

  @e2e @NOP-EMB-045
  Scenario: Built packages contain no SideFX reference icons
    Given the builds "dist/" and "dist-playground/"
    Then no file contains data from "local-refs/" or "__local_houdini_ref_icons"
