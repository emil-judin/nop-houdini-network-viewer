@unit
Feature: Operator icon registry
  Every operator icon is an original drawing found by exact lookup
  (src/components/nodes/icons/iconRegistry.ts, docs/ICON_ART_BIBLE.md).

  @NOP-ICON-001
  Scenario Outline: Icon resolution order
    When the icon is resolved for type "<type>", icon "<icon>" and subnetwork <subnet>
    Then the drawing is "<drawing>"

    Examples:
      | type                     | icon                                     | subnet | drawing       |
      | box                      | SOP_box                                  | false  | sop.box       |
      | copytopoints::2.0        | SOP_copytopoints-2.0                     | false  | sop.copytopoints |
      | labs::flowmap::1.0       | opdef:/labs::Sop/flowmap::1.0?IconSVG    | false  | labs.flowmap  |
      | subdivide                | SOP_subdivide                            | false  | sop.subdivide |
      | divide                   | SOP_divide                               | false  | sop.divide    |
      | emjud::pebble_scatter::1.0 | MISC_digital_asset                     | true   | sop.subnet    |
      | totally_unknown          | SOP_totally_unknown                      | false  | default       |

  @NOP-ICON-002
  Scenario: Lookups are exact, never substrings
    When the icon is resolved for type "subdivide"
    Then it is not the "sop.divide" drawing

  @NOP-ICON-003
  Scenario: Lookups ignore letter case
    When the icon is resolved for type "labs::straight_skeleton_2D::1.0"
    Then the "labs.straight_skeleton_2D" drawing is used

  @NOP-ICON-004
  Scenario: Every SideFX Labs SOP has a drawing
    Given every type in labs/labsNodeCatalog.ts
    When each icon is resolved with the "labs" namespace
    Then none resolves to the default emblem

  @NOP-ICON-005
  Scenario: Labs aliases reuse built-in drawings
    Given an entry of LABS_BUILTIN_ICON_ALIASES
    When its Labs type is resolved
    Then the aliased "sop.*" drawing is returned

  @NOP-ICON-006
  Scenario: Registry entries are complete and unique
    Then every drawing has a unique id starting with "sop.", "labs." or "path." (the fallback emblem is "default")
    And a label, a family, a description and at least one type, icon or matcher
    And the description contains no en or em dash

  @NOP-ICON-007 @component
  Scenario: Gradient and clip ids are unique per instance
    Given two nodes of type "sphere" on one page
    When both are rendered
    Then no two elements in the page share an id

  @NOP-ICON-008
  Scenario: Drawings stay inside the art bible rules
    When every drawing is rendered to markup
    Then none contains an image, style, filter or foreignObject element, or an external href

  @NOP-ICON-009
  Scenario: Every node of the example networks has an icon
    When every node of the six example networks is looked up, subnetwork levels included
    Then each has a NOP drawing or its own icon from the file, never the default emblem
    And Compile Block Begin and End show the For-Each bricks in red
