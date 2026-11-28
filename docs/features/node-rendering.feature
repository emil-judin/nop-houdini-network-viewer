@component
Feature: Draw nodes, boxes, sticky notes and dots like Houdini 22
  Pillar 2 (Authenticity): node shapes, flags, colors and labels match the Network Editor.

  # Operator nodes

  @NOP-NODE-001
  Scenario Outline: The node body uses Houdini's shape definition
    Given an operator node with shape "<shape>"
    When the node is rendered
    Then its outline comes from the "<expected>" shape of houdiniShapesData.json

    Examples:
      | shape        | expected     |
      |              | rect         |
      | rect         | rect         |
      | wave         | wave         |
      | cigar        | cigar        |
      | chevron_down | chevron_down |
      | unknownshape | rect         |

  @NOP-NODE-002
  Scenario: A custom shape from the document is used when it has an outline
    Given the document's "customShapes" defines "myshape" with an outline of 4 points
    And an operator node with shape "myshape"
    When the node is rendered
    Then its outline is the custom outline

  @NOP-NODE-013
  Scenario: An exported custom shape is drawn with all its parts
    Given the document's "customShapes" defines "studio_hexagon" with an outline, flag regions 0 and 3 with divider lines, and an icon box
    And an operator node with shape "studio_hexagon" and the bypass and display flags set
    When the node is rendered
    Then its outline is the custom outline
    And the bypass and display flags fill the custom flag regions 0 and 3, with their divider lines
    And the operator icon sits in the custom icon box

  @NOP-NODE-003
  Scenario Outline: Active flags fill their slot in the flag color
    Given an operator node with the flag "<flag>" set
    When the node is rendered
    Then flag slot <slot> is filled with "<color>"
    And the fill is clipped to the node body outline

    Examples:
      | flag               | slot | color   |
      | bypass             | 0    | #ead02a |
      | lock               | 1    | #d94040 |
      | softLock           | 1    | #d94040 |
      | template           | 2    | #d45ca8 |
      | selectableTemplate | 2    | #d45ca8 |
      | display            | 3    | #3098e5 |
      | render             | 3    | #3098e5 |

  @NOP-NODE-004
  Scenario: A bypassed node is drawn faded but opaque
    Given an operator node with color [0.8, 0.8, 0.8] and the bypass flag set
    When the node is rendered
    Then the body fill is the node color blended 16% over the canvas color
    And the node name text is "#727272"
    And the icon is drawn at reduced opacity
    And its connectors are drawn in the darker "#565656"

  @NOP-NODE-005
  Scenario: A selected node gets the yellow outline
    Given an operator node that is selected
    When the node is rendered
    Then a "#ffd400" outline band is drawn outside the dark border
    And the border itself turns near-black ("#0a0a0a")

  @NOP-NODE-006
  Scenario: The node name floats to the right of the body
    Given an operator node named "transform1" of type "xform" with label "Transform"
    When the node is rendered
    Then "transform1" is shown 9 pixels right of the body
    And no type label is shown above it, because Houdini names new "xform" nodes "transform1"

  @NOP-NODE-007
  Scenario Outline: A renamed node shows its type label above the name
    Given an operator node named "<name>" of type "<type>" with label "<label>"
    When the node is rendered
    Then the type label is <shown>
    # A name counts as not renamed when it starts with the base type or with the name Houdini 22 gives new
    # nodes of the type (12 SOP types differ, such as xform, groupcreate and copyxform: see operatorType.ts)

    Examples:
      | name                | type                      | label             | shown               |
      | assign_ram_to_prims | attribwrangle             | Attribute Wrangle | "Attribute Wrangle" |
      | attribwrangle2      | attribwrangle             | Attribute Wrangle | not shown           |
      | lot_subdivision1    | labs::lot_subdivision::2.0 | Labs Lot Subdivision | not shown        |
      | this_is_a_test      | xform                     | Transform         | "Transform"         |
      | group1              | groupcreate               | Group Create      | not shown           |
      | copy1               | copyxform                 | Copy and Transform | not shown          |
      | foreach_begin1      | block_begin               | Block Begin       | "Block Begin"       |

  @NOP-NODE-008
  Scenario Outline: Asset padlocks follow the exported asset state
    Given an operator node of type "<type>" with hdaState <state>
    When the node is rendered
    Then the badge under the name is <badge>

    Examples:
      | type                    | state      | badge                 |
      | emjud::rounded_brick::1.0 | "locked" | a grey padlock        |
      | emjud::pebble_scatter::1.0 | "unlocked" | a red open padlock |
      | box                     | null       | no padlock            |
      | attribwrangle           | "locked"   | a grey padlock (Houdini shows it on wrangles too) |
      | labs::thicken::1.0      | missing    | no padlock            |
      | copytopoints::2.0       | missing    | no padlock            |
      | box                     | missing    | no padlock            |
      # "missing": exports before schema 1.2.0. The type name does not tell an asset from a built-in
      # versioned type (copytopoints::2.0), so no padlock is guessed

  @NOP-NODE-009
  Scenario: A navigable subnetwork shows the subnet badge
    Given an operator node with isSubnetwork true and exported children
    When the node is rendered
    Then a subnet badge titled "Subnetwork: double-click to dive in" is shown under the name

  @NOP-NODE-010
  Scenario: A visible node comment is shown under the name
    Given an operator node with comment "cache here" and showComment true
    When the node is rendered
    Then "cache here" is shown under the name, truncated at 240 pixels

  @NOP-NODE-012
  Scenario: A comment with showComment false stays off the canvas
    Given an operator node with comment "cache here" and showComment false
    When the node is rendered
    Then the comment is not shown under the name (the inspector still shows it)

  @NOP-NODE-011
  Scenario Outline: Label size presets
    Given the label size is "<size>"
    When an operator node is rendered
    Then the name text is <name> and the type label is <type>

    Examples:
      | size   | name   | type   |
      | small  | 14.5px | 11px   |
      | medium | 17px   | 12.5px |
      | large  | 20px   | 14px   |

  # Connectors

  @NOP-NODE-020
  Scenario Outline: Input connectors
    Given an operator node with maxInputs <max>
    When the node is rendered
    Then it has <handles>

    Examples:
      | max  | handles                                                       |
      | 0    | no input handles                                              |
      | 1    | 1 round input handle                                          |
      | 4    | 4 round input handles at the shape's connector positions      |
      | 5    | a curved multi-input bar with 16 hidden handles               |
      | 9999 | a curved multi-input bar with 16 hidden handles               |

  @NOP-NODE-021
  Scenario: Connector tooltips show Houdini's input and output labels
    Given an operator node with inputLabels ["Geometry to Process"] and no outputLabels
    When the pointer rests on the first input connector
    Then the tooltip says "Geometry to Process"
    And the output connector tooltip says "Output 1"

  @NOP-NODE-022
  Scenario: Every output gets its own connector, up to 10
    Given a digital asset with maxOutputs 10
    When the node is rendered
    Then it has 10 separate output connectors along the bottom edge, like Houdini
    And the connectors shrink to whole pixels (about 0.71 of the distance between them) so they never overlap
    And the wire from its tenth output starts at the tenth connector
    And a damaged file with more than 10 outputs still draws only 10
    And a plain subnet shows one output: exports before this fix wrote maxOutputs 11 for every SOP subnet (Houdini's maximum), so where output labels exist, the viewer shows one connector per label

  @NOP-NODE-023
  Scenario: A node without outputs has no output connector
    Given an operator node of type "rop_geometry" with maxOutputs 0
    When the node is rendered
    Then it has no output handle
    And a wire that starts at it (only possible in a broken file) is not drawn

  # Icons

  @NOP-NODE-030
  Scenario: A custom asset icon from the document is shown as an image
    Given the document's "icons" maps the node's icon id to an SVG string
    When the node is rendered
    Then the icon is an img element with a "data:image/svg+xml" source
    And no script inside the SVG can run

  @NOP-NODE-031
  Scenario: A built-in operator gets the original NOP drawing
    Given an operator node of type "box" without a document icon
    When the node is rendered
    Then the "sop.box" drawing is shown, centered in the shape's icon box

  # Other items

  @NOP-NODE-040
  Scenario: Network box look
    Given a network box with color [0.52, 0.52, 0.52] and comment "LOOP"
    When the box is rendered
    Then the header is the box color times 0.86 with a black title "LOOP" at 18px
    And the body is the box color at 50% opacity
    And a minimized box shows a plus glyph and no body

  @NOP-NODE-041
  Scenario: A network box without a comment has no title
    Given a minimized dark network box without a comment named "__netbox3"
    When the box is rendered
    Then only the plus glyph is shown, like Houdini: no title, no separator and never the name "__netbox3"
    And a dark box with a comment gets a light title

  @unit @NOP-NODE-050
  Scenario: Round nodes show their flag areas
    Given a node with the "circle" shape (Houdini's shape file has no divider lines for it)
    When the node is rendered
    Then the borders of its four flag areas that run inside the body are drawn: an inner ring around the icon and four spokes, like Houdini
    And the same applies to "cop" and "shop"

  @unit @NOP-NODE-051
  Scenario: Shapes with divider lines of their own keep them
    Given a node with the "rect" shape
    Then only its slanted divider lines are drawn

  @NOP-NODE-042
  Scenario: Sticky note look
    Given a sticky note with text "TODO" and no text color
    When the note is rendered
    Then the body is the note color times 0.74 and the header the color times 0.915
    And "TODO" is drawn at 20px in "#111111", keeping line breaks

  @NOP-NODE-043
  Scenario: Sticky note without background
    Given a sticky note with drawBackground false
    When the note is rendered
    Then only its text is drawn, without header or body color

  @NOP-NODE-046
  Scenario: Minimized sticky note
    Given a minimized sticky note with text "hidden text"
    When the note is rendered
    Then only its header with a plus glyph is drawn, and the text is not shown

  @NOP-NODE-044
  Scenario: Subnet input look
    Given a subnet input "1" with inputName "transform1"
    When it is rendered
    Then it shows "Sub-Network Input #1" and a second line "transform1"

  @NOP-NODE-047
  Scenario: A dot never shows its internal name
    Given a routing dot named "__dot1"
    When the dot is rendered or the pointer rests on it
    Then "__dot1" appears nowhere, neither as text nor as a tooltip, like Houdini

  @NOP-NODE-045
  Scenario: Text from the file is shown as text
    Given a sticky note whose text is "<img src=x onerror=alert(1)>"
    When the note is rendered
    Then the text is shown literally and no element is created from it
