@unit
Feature: Load and convert a Houdini network document
  The converter (src/schema/converter.ts) turns an exported JSON document into React Flow
  nodes and edges, inverting Houdini's +Y-up network units into +Y-down screen pixels.

  Background:
    Given the unit scale is 100 pixels per Houdini network unit

  # Document loading and versioning

  @NOP-CONV-001
  Scenario: A valid full document keeps its content
    Given a document with "schemaVersion" "1.3.0" and a "root" whose "nodes" is a list
    When the document is normalized
    Then the result has the same nodes, path and schema version
    And normalizing the result again changes nothing

  @NOP-CONV-002
  Scenario: A flat diagnostic dump is wrapped into a document
    Given a JSON object with a top-level "nodes" list and no "root"
    When the document is normalized
    Then the result has "schemaVersion" "1.0.0"
    And its root path is the dump's "path", or "/obj/geo1" when missing
    And its root context is "Sop"
    And missing "dots", "boxes", "stickies", "wires" and "subnetInputs" become empty lists

  @NOP-CONV-003
  Scenario Outline: Unusable input is rejected with a readable message
    Given the raw input <input>
    When the document is normalized
    Then an error is thrown that contains "<message>"

    Examples:
      | input                          | message                                  |
      | null                           | expected an object                       |
      | the string "hello"             | expected an object                       |
      | {"root": {"nodes": 5}}         | "root.nodes" must be a list of nodes     |
      | {"foo": 1}                     | Unrecognized Houdini network JSON format |

  @NOP-CONV-004
  Scenario Outline: Schema major versions
    Given a document with "schemaVersion" "<version>"
    When the document is normalized
    Then it is <outcome>

    Examples:
      | version | outcome                                                                          |
      | 1.0.0   | accepted                                                                         |
      | 1.3.0   | accepted                                                                         |
      | 1.9.4   | accepted                                                                         |
      | 2.0.0   | rejected with "made by a newer NOP exporter" and "this viewer reads schema 1.x"  |

  @NOP-CONV-005 @fixed-S-01
  Scenario: Damaged items are dropped instead of crashing the viewer
    Given a document whose "nodes" list contains null, a node without "name" and a valid node
    And a parameter whose "val" is the number 1 instead of a list
    And a subnetwork whose "children" has no "nodes"
    When the document is normalized
    Then only the valid node remains
    And the parameter "val" becomes [1] and its "expr" becomes [null]
    And the subnetwork child network has an empty "nodes" list

  @NOP-CONV-006 @fixed-S-02
  Scenario: Item names that match built-in object properties are safe
    Given a node whose "icon" is "constructor" and whose "shape" is "toString"
    When the network is converted and rendered
    Then the node uses its registered operator icon and the "rect" shape
    And no error is thrown

  # Coordinates

  @NOP-CONV-010
  Scenario: Operator nodes invert Y and use the 100 x 30 node box
    Given a node "box1" at Houdini position [1.0, 2.0]
    When the graph is converted
    Then the React Flow node "box1" is at x 100 and y -230
    And its initial size is 100 by 30 pixels
    And it is selectable, not draggable, with z-index 10

  @NOP-CONV-011
  Scenario: Routing dots are centered on their position
    Given a dot "__dot1" at Houdini position [2.0, -1.0]
    When the graph is converted
    Then the dot node is at x 190.5 and y 90.5
    And its initial size is 19 by 19 pixels
    And it is not selectable, with z-index 12

  @NOP-CONV-012
  Scenario: An expanded network box draws its 29px header above its body
    Given a network box at position [0, 0] with size [3, 2] that is not minimized
    When the graph is converted
    Then the box node is at x 0 and y -229
    And its size is 300 by 229 pixels
    And it is not selectable, with z-index -20

  @NOP-CONV-013
  Scenario: A minimized network box is only its header and hides its items
    Given a minimized network box at position [0, 0] with items "a" and "__dot1"
    And nodes "a" and "b", a dot "__dot1", and wires "a" to "b" and "__dot1" to "b"
    When the graph is converted
    Then the box node is 29 pixels high at y -29
    And node "a" and dot "__dot1" are not in the result
    And no wire starts or ends at "a" or "__dot1"
    And node "b" is in the result

  @NOP-CONV-031
  Scenario: A network box title is black or light, whichever reads better
    Given a network box in Houdini's default grey and one in dark blue (0.25, 0.35, 0.5)
    Then the grey box has a black title, as in Houdini
    And the dark blue box has a light title, because black would have less than 4.5:1 contrast on it

  @NOP-CONV-014
  Scenario: Network box and sticky note minimum sizes
    Given a network box with size [0.1, 0.1] and a sticky note with size [0.1, 0.1]
    When the graph is converted
    Then the box is at least 80 pixels wide and its body at least 40 pixels high
    And the sticky note is at least 90 by 40 pixels

  @NOP-CONV-015
  Scenario: A minimized sticky note is a 22px header
    Given a minimized sticky note at position [1, 1]
    When the graph is converted
    Then the sticky node is 22 pixels high at y -122 with z-index -10

  @NOP-CONV-016
  Scenario: Subnet inputs become synthetic nodes
    Given a subnet input named "1" at position [0, 1]
    When the graph is converted
    Then a node "input:1" of type "houdiniSubnetInput" exists at x 0 and y -130
    And its size is 100 by 30 pixels with z-index 5

  # Wires

  @NOP-CONV-020
  Scenario: A wire from a subnet input is rewired to the synthetic node
    Given a subnet input "1" and a wire from "1" output 0 to "xform1" input 0
    And no node or dot is named "1"
    When the graph is converted
    Then the edge source is "input:1" with handle "out-0"

  @NOP-CONV-021
  Scenario: Input and output indexes are clamped to existing connectors
    Given a node "a" with 1 output and a node "b" with 2 inputs
    And a wire from "a" output 3 to "b" input 5
    When the graph is converted
    Then the edge uses source handle "out-0" and target handle "in-1"

  @NOP-CONV-022
  Scenario: Wires to and from dots use the dot's single handles
    Given a wire from dot "__dot1" to dot "__dot2"
    When the graph is converted
    Then the edge uses "out-0" and "in-0"
    And the edge data says the source and the target are dots

  @NOP-CONV-023
  Scenario Outline: Wires into a multi-input node fan out across the bar
    Given a node "merge1" with maxInputs 9999
    And <count> wires into "merge1"
    When the graph is converted
    Then the wires use the handles <handles>

    Examples:
      | count | handles                                     |
      | 1     | in-multi-7                                  |
      | 2     | in-multi-3, in-multi-12                     |
      | 3     | in-multi-3, in-multi-8, in-multi-12         |

  @NOP-CONV-024
  Scenario: Nodes with at most 4 inputs keep discrete connectors
    Given a node "wrangle1" with maxInputs 4 and a wire into input 3
    When the graph is converted
    Then the edge target handle is "in-3"

  @NOP-CONV-025 @fixed-Q-07
  Scenario: Multi-input fan-out follows the input order
    Given the fixture "merge-out-of-order" where the wire to input 2 is listed before the wire to input 0
    When the graph is converted
    Then the wire to input 0 uses the leftmost bar handle

  @NOP-CONV-026
  Scenario: The chosen wire style is passed to every edge
    Given a graph with 3 wires
    When the graph is converted with wire style "rounded"
    Then every edge has type "houdiniWire", z-index 4 and wire style "rounded"

  @NOP-CONV-027 @fixed-Q-05
  Scenario: Items of different kinds may share a name
    Given a node named "__netbox1" and a network box named "__netbox1"
    When the graph is converted
    Then both items are in the result with different React Flow IDs ("__netbox1" and "box:__netbox1")

  # Colors

  @NOP-CONV-030
  Scenario Outline: Houdini RGB to CSS
    When the color <rgb> is converted to CSS
    Then the result is "<css>"

    Examples:
      | rgb               | css                |
      | [0.8, 0.8, 0.8]   | rgb(204, 204, 204) |
      | [1.5, -1, 0.5]    | rgb(255, 0, 128)   |
      | missing           | rgb(204, 204, 204) |
      | [0.5, 0.5]        | rgb(204, 204, 204) |
