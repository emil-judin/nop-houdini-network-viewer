Feature: Read-only Parameter Inspector
  Selecting a node opens a read-only copy of Houdini 22's Parameter Pane
  (src/components/inspector/). Nothing in it can change the network.

  # Opening and header

  @component @NOP-INSP-001
  Scenario: Selecting a node opens the inspector
    Given the viewer is rendered with showInspector true
    When the visitor clicks node "attribwrangle1"
    Then a panel labelled "Parameters of attribwrangle1" is shown
    And its header shows the operator icon, the bold type label, the name "attribwrangle1" and the full type id

  @component @NOP-INSP-002
  Scenario: The inspector closes
    Given the inspector shows node "attribwrangle1"
    When the visitor clicks "Close parameters"
    Then the inspector is hidden and no node is selected
    When the visitor selects the node again and clicks the empty canvas
    Then the inspector is hidden

  @component @NOP-INSP-003
  Scenario: showInspector false never opens the panel
    Given the viewer is rendered with showInspector false
    When the visitor clicks a node
    Then the node is selected and no inspector is shown

  @component @NOP-INSP-004
  Scenario: onNodeSelect reports the selection
    Given the viewer is rendered with an onNodeSelect callback
    When the visitor selects node "box1" and then clicks the empty canvas
    Then the callback receives the "box1" node data and then null

  @component @NOP-INSP-005
  Scenario: The comment is listed, the flags are not
    Given a node with display and bypass flags and the comment "main output"
    When it is inspected
    Then the header shows no flag badges (the flags show on the node itself, owner decision 2026-11-05)
    And "main output" is shown, keeping line breaks

  @component @NOP-INSP-006
  Scenario Outline: Empty parameter messages
    Given a document with exportMode "<mode>" and a node without parameters
    When the node is inspected
    Then the message "<message>" is shown

    Examples:
      | mode    | message                                  |
      | compact | All parameters are at their default values. |
      | full    | This node has no visible parameters.     |

  @component @NOP-INSP-007
  Scenario: Compact exports explain what is shown
    Given a document with exportMode "compact" and a node with changed parameters
    When the node is inspected
    Then "Showing parameters changed from their defaults." is shown under the parameters

  @component @NOP-INSP-008
  Scenario: Another node starts on its first tab
    Given the inspector shows the "Look" tab of node "CONTROLS"
    When the visitor selects another node with tabs
    Then that node's parameters start on their first tab

  @component @NOP-INSP-009
  Scenario: The inspector loads on demand and a failed download stays in the panel
    When the visitor selects a node for the first time
    Then "Loading parameters..." is shown while the inspector code downloads
    When the download fails
    Then an error is shown inside the panel, next to its resize handle
    And it says "The parameters of this node could not be shown." and asks to check the connection and reload the page
    And it does not call the network file invalid or damaged
    And the network can still be used and other nodes selected

  # Layout model (parmModel.ts)

  @unit @NOP-INSP-010
  Scenario: Folder parameters and buttons are not shown
    Given parameters of type "FolderSet", "Data" and "Button", and a "Folder" without a number
    When the layout is built
    Then none of them appears

  @unit @NOP-INSP-063
  Scenario: A multiparm shows its count, then one numbered block per entry
    Given a "Folder" parameter "Number of Attributes" with val [3] in tab "Main"
    And parameters "name1" to "value3" in the multiparm "Number of Attributes" with multiparmIndex [1] to [3]
    When the layout is built
    Then tab "Main" holds the multiparm: the count row "numattr", then blocks 1, 2 and 3 with their entry's parameters
    And the count row is drawn as a number

  @unit @NOP-INSP-064
  Scenario: Multiparm entries listed apart, counts without entries and older exports
    Given entry 1 of a multiparm is listed after entry 2
    When the layout is built
    Then block 1 still comes before block 2
    And a count of 0 is shown alone, without blocks
    And entries without multiparmIndex (exports before schema 1.6.0) share one block without a number

  @unit @NOP-INSP-065
  Scenario: Nested multiparms number their blocks per level
    Given a multiparm "Groups" with 2 entries, each with a multiparm "Points 1" or "Points 2" of its own
    When the layout is built
    Then each "Groups" block holds its own points multiparm, with blocks numbered by the inner entry number

  @unit @NOP-INSP-011
  Scenario: Tabs collect their parameters wherever they appear
    Given parameters "a" in tab "Main", "b" in tab "Advanced", and "c" in tab "Main" listed last
    And their folderTypes are "tabs"
    When the layout is built
    Then one tab bar has the tabs "Main" with "a" and "c", and "Advanced" with "b"

  @unit @NOP-INSP-012
  Scenario: Exports before schema 1.2.0 draw folders as simple sections
    Given parameters with "folders" but without "folderTypes"
    When the layout is built
    Then each folder is a "simple" section

  @unit @NOP-INSP-013
  Scenario: Joined parameters share a line only when they follow each other
    Given parameter "snapto" with joinNext "snapusing" directly followed by "snapusing"
    And parameter "x" with joinNext "y" followed by "z"
    When the layout is built
    Then "snapto" and "snapusing" share one line
    And "x" is alone on its line

  @unit @NOP-INSP-014
  Scenario: Empty folders, orphan headings and extra separators are pruned
    Given a folder that only held buttons, a label heading followed by a separator, and three separators in a row
    When the layout is built
    Then the folder and the heading are removed
    And only one separator is left, and none at the start or end of a level

  @unit @NOP-INSP-015
  Scenario Outline: Widget per parameter
    Given a parameter named "<name>" of type "<type>" with value <val> on a "<operator>" node
    When its display row is built
    Then its kind is "<kind>"

    Examples:
      | name       | type      | val              | operator   | kind      |
      | snippet    | String    | ["@P.y += 1;"]   | attribwrangle | code   |
      | python     | String    | ["print(1)"]     | python     | code      |
      | kernelcode | String    | ["kernel void"]  | opencl     | code      |
      | notes      | String    | ["line1\nline2"] | null       | code      |
      | t          | Float     | [1, 2, 3]        | xform      | number    |
      | doit       | Toggle    | [1]              | box        | toggle    |
      | type       | Menu      | ["poly"]         | box        | menu      |
      | ramp       | Ramp      | [3]              | attribremap | ramp     |
      | sep1       | Separator | [""]             | box        | separator |
      | label1     | Label     | ["Hello"]        | box        | label     |
      | group      | String    | ["*"]            | blast      | string    |

  @unit @NOP-INSP-016
  Scenario: A code parameter driven by an expression is shown as a field
    Given a "snippet" parameter whose expr is ["chs(\"../code\")"]
    When its display row is built
    Then its kind is "string"

  @unit @NOP-INSP-017
  Scenario Outline: Toggle values
    When the toggle value <value> is read
    Then it is <state>

    Examples:
      | value   | state |
      | true    | on    |
      | 1       | on    |
      | "on"    | on    |
      | "1"     | on    |
      | 0       | off   |
      | "off"   | off   |
      | ""      | off   |

  @unit @NOP-INSP-018
  Scenario: Legacy nonDefaultParms become tuples
    Given a node with "nonDefaultParms" [{"name": "scale", "label": "Scale", "val": 2, "expr": null}] and no "parms"
    When its parameters are read
    Then there is one tuple "scale" with val [2] and expr [null]

  @unit @NOP-INSP-019
  Scenario: Ramp point parameters of older exports are not shown
    Given an export from before the exporter skipped ramp points, with Ramp "twistramp" and "twistramp1pos", "twistramp1value", "twistramp1interp", "twistramp2c"
    And a Float "twistscale" that is not a ramp point
    When the inspector lays out the parameters
    Then it shows "twistramp" and "twistscale" only
    And a parameter like "ramp1value" is shown when there is no Ramp named "ramp"

  # Widgets (ParmLine.tsx and friends)

  @component @NOP-INSP-020
  Scenario: Expression-driven fields show the expression and the value
    Given a Float parameter "scale" with val [2.5] and expr ["ch(\"../size\")"]
    When it is inspected
    Then the field shows "ch(\"../size\")" on the teal expression color
    And "= 2.5" is listed under the row
    And the label is highlighted with an "f(x)" marker
    And a tuple with expressions on several components lists each value by component ("x = 0  y = 0.0326")

  @component @NOP-INSP-021
  Scenario: Keyframed and changed values
    Given a Float tuple "r" with keyframed [false, true, false] and changed [false, true, false]
    When it is inspected
    Then component y is drawn in the keyframed color and bold
    And component x uses the plain field color

  @component @NOP-INSP-029
  Scenario: Disabled colors win over keyframe and expression colors
    Given a Float tuple "t" with keyframed [true, false, false], an expression on y, changed [false, true, false] and disabled true
    When it is inspected
    Then every component is drawn in the disabled color
    And the row is announced as disabled

  @component @NOP-INSP-022
  Scenario: Vector components get axis markers
    Given a Float tuple "t" with 3 components
    When it is inspected
    Then the fields have red, green and blue axis diamonds

  @component @NOP-INSP-023
  Scenario: Sliders show the value inside the range
    Given an Int parameter with val [5] and range [0, 10]
    When it is inspected
    Then the slider knob and the blue fill are at 50%
    And values outside the range put the knob at the nearest end

  @component @NOP-INSP-024
  Scenario: Menus show the label and keep the token in the tooltip
    Given a Menu parameter with val ["primitive"] and menuLabel "Primitives"
    When it is inspected
    Then the menu button shows "Primitives"
    And its tooltip says "Token: primitive"
    And a changed menu value is bold
    And a menu driven by an expression shows the expression instead of the label

  @component @NOP-INSP-025
  Scenario: A label-less toggle joined to the next parameter sits in the gutter
    Given a Toggle "use_snapdist" with labelHidden true and joinNext "snapdist", followed by "snapdist"
    When it is inspected
    Then the toggle box is drawn in the left gutter in front of the "Snap Distance" label

  @component @NOP-INSP-026
  Scenario: Collapsible folders start closed
    Given a collapsible folder "Advanced" with two parameters
    When it is inspected
    Then "Advanced" is a closed row with aria-expanded false
    When the visitor clicks it
    Then the two parameters are shown

  @component @NOP-INSP-027
  Scenario: Switching tabs only changes the view
    Given a tab bar "Main" and "Advanced"
    When the visitor clicks "Advanced"
    Then the Advanced parameters are shown and the document data is unchanged
    And Left, Right, Home and End move between the tabs, wrapping around at both ends
    And only the selected tab is in the Tab order

  @component @NOP-INSP-028
  Scenario: String fields with a menu show the menu button
    Given a String parameter "group" with hasMenu true
    When it is inspected
    Then a menu button is drawn right of the field

  @component @NOP-INSP-060
  Scenario: Toggles show expressions, the disabled state and their label
    Given a toggle driven by an expression, a disabled toggle and a toggle with labelHidden true
    When they are inspected
    Then the first toggle box uses the expression color
    And the disabled one is dimmed
    And the label is shown next to the box, except for the one with labelHidden

  @component @NOP-INSP-061
  Scenario: A joined parameter without a real label gets none in the row
    Given "maxedges" joined to "numsides", whose label is its internal name "numsides"
    And "snapto" joined to "snapusing", labelled "Using"
    When they are inspected
    Then the "Maximum Edges" row shows no "numsides" label
    And the "Snap To" row shows "Using" in front of its menu

  @component @NOP-INSP-062
  Scenario: Import folders have no band, and a section collects parameters listed apart
    Given "a" and "c" in the simple folder "Main" with "b" between them, and "d" in the import folder "Imported"
    When they are inspected
    Then one "Main" band holds "a" and "c"
    And "d" is shown without an "Imported" band

  @component @NOP-INSP-066
  Scenario: Multiparm blocks show their entry number, and the count cannot be changed
    Given an Attribute Create node with "Number of Attributes" 2 and two entries
    When it is inspected
    Then the count row shows 2
    And each entry is a block named "Number of Attributes 1" or "Number of Attributes 2" with its number in the left column
    And the multiparm has no buttons to add, remove or clear entries and no editable field
    And the document data is unchanged

  # Ramps (rampModel.ts, RampView.tsx)

  @unit @NOP-INSP-030
  Scenario Outline: Ramp evaluation
    Given a float ramp with keys [0, 1], values [0, 1] and basis ["<basis>", "<basis>"]
    When the ramp is evaluated at 0.5
    Then the value is <value>

    Examples:
      | basis    | value |
      | Linear   | 0.5   |
      | Constant | 0     |

  @unit @NOP-INSP-031
  Scenario: Ramp points are sorted and clamped at the ends
    Given a float ramp with keys [0.8, 0.2] and values [1, 0]
    When the ramp is evaluated at 0, 0.1, 0.9 and 1
    Then the values are 0, 0, 1 and 1

  @unit @NOP-INSP-032
  Scenario: Monotone cubic never overshoots
    Given a float ramp with keys [0, 0.5, 1], values [0, 1, 1] and basis "MonotoneCubic"
    When it is sampled 96 times between 0.5 and 1
    Then every value is between 0 and 1

  @component @NOP-INSP-033
  Scenario: Float and color ramps are drawn
    Given a float ramp parameter and a color ramp parameter with 3 points each
    When they are inspected
    Then the float ramp is an image labelled "Float ramp with 3 points"
    And the color ramp is a gradient labelled "Color ramp with 3 points"
    And a ramp parameter without ramp data says "Ramp with 3 points"

  # Code (codeHighlight.ts, CodeBlock.tsx)

  @unit @NOP-INSP-040
  Scenario: Highlighting never changes the code
    Given any VEX or Python source text
    When it is split into tokens
    Then joining the token texts gives back the exact source

  @unit @NOP-INSP-041
  Scenario Outline: VEX tokens
    When the VEX code "<code>" is highlighted
    Then "<token>" is a "<kind>" token

    Examples:
      | code                       | token     | kind         |
      | v@P.y += 1;                | v@P       | attribute    |
      | i[]@ids = array();         | i[]@ids   | attribute    |
      | float x = fit01(rand(1));  | float     | type         |
      | float x = fit01(rand(1));  | fit01     | function     |
      | if (x) return;             | if        | keyword      |
      | // done                    | // done   | comment      |
      | #include "math.h"          | #include  | preprocessor |
      | x = 1.5e3f;                | 1.5e3f    | number       |

  @unit @NOP-INSP-042
  Scenario Outline: Python tokens
    When the Python code "<code>" is highlighted
    Then "<token>" is a "<kind>" token

    Examples:
      | code                  | token   | kind     |
      | def f(self): pass     | def     | keyword  |
      | x = None              | None    | constant |
      | @property             | @property | preprocessor |
      | s = """doc"""         | """doc""" | string |

  @unit @NOP-INSP-043 @fixed-P-01
  Scenario: Long snippets highlight in linear time
    Given a VEX snippet of 200,000 characters
    When it is highlighted
    Then it finishes in under 2 seconds (the old quadratic version took many seconds; a tighter limit fails on busy CI machines)

  @component @NOP-INSP-044
  Scenario: Copy code
    Given a secure page with the Clipboard API
    When the visitor clicks "Copy code" on a VEX snippet
    Then the exact snippet is on the clipboard and the button says "Copied" for about 1.6 seconds

  @component @NOP-INSP-045
  Scenario: No copy button without a usable Clipboard API
    Given a page that is not a secure context
    When a code parameter is inspected
    Then no copy button is shown and the code can still be selected

  @component @NOP-INSP-046
  Scenario: Code shows line numbers and scrolls sideways
    Given a 3-line snippet with one line of 500 characters
    When it is inspected
    Then the gutter shows 1, 2 and 3
    And the long line scrolls sideways instead of wrapping

  @e2e @NOP-INSP-047
  Scenario: The line number gutter covers long code
    Given a VEX snippet taller than the code field
    When the visitor scrolls down the code
    Then the grey gutter runs down to the last line number

  @component @NOP-INSP-048
  Scenario Outline: Code is named by its language
    Given a <parameter> on a "<operator>" node
    When it is inspected
    Then the code region is named "<name>"

    Examples:
      | parameter                 | operator      | name        |
      | "snippet"                 | attribwrangle | VEX code    |
      | "python"                  | python        | Python code |
      | "code"                    | python        | Python code |
      | multi-line String "notes" | null          | Text code   |

  # Panel (ResizableInspectorPanel.tsx)

  @component @NOP-INSP-050
  Scenario Outline: Side panel or bottom sheet by viewer width
    Given the viewer is <width> pixels wide
    When a node is inspected
    Then the inspector is a <layout>

    Examples:
      | width | layout                                       |
      | 671   | bottom sheet, 48% of the viewer height       |
      | 672   | side panel                                   |
      | 1200  | side panel, 360 pixels wide (30%, 320 to 400) |

  @component @mobile @NOP-INSP-057
  Scenario: The bottom sheet slides in and out
    Given a viewer narrower than 672 pixels
    When a node is inspected
    Then the sheet slides up from the bottom (200 ms) into its space, which the canvas gives up at once
    When the sheet is closed
    Then it slides down, still showing the closed node, and only then gives its space back
    And with reduced motion it appears and disappears at once
    # The slide itself is checked by hand; the tests check that the closed node stays for 200 ms

  @component @NOP-INSP-058
  Scenario: The arrow keys resize the bottom sheet
    Given the resize handle of the bottom sheet has focus
    When the visitor presses ArrowUp, then ArrowDown twice
    Then the sheet grows by 16 pixels, then shrinks by 32
    And "nop-inspector-height" in localStorage holds the new height

  @component @NOP-INSP-059
  Scenario Outline: A remembered width meets the current viewer
    Given "nop-inspector-width" in localStorage is "<stored>"
    When a node is inspected in a <viewer> pixel wide viewer
    Then the side panel is <width> pixels wide

    Examples:
      | stored | viewer | width                              |
      | 900    | 700    | 500 (leaving 200 for the canvas)   |
      | abc    | 1000   | 320 (the default)                  |
      | -5     | 1000   | 320 (the default)                  |

  @component @NOP-INSP-051
  Scenario: The panel is resized and remembered
    Given the side panel is open
    When the visitor drags its left edge 100 pixels to the left
    Then the panel is 100 pixels wider
    And "nop-inspector-width" in localStorage holds the new width
    When the viewer is opened again
    Then the panel has the remembered width
    And dragging with another mouse button than the left one does nothing

  @component @NOP-INSP-052
  Scenario: Resize limits keep room for the canvas
    Given a 900 pixel wide viewer with the side panel open
    When the visitor drags the panel to 2,000 pixels and to 50 pixels
    Then its width stays between 260 and 700 pixels

  @component @NOP-INSP-053
  Scenario: Keyboard and reset
    Given the resize handle has focus in the side panel
    When the visitor presses ArrowLeft, then ArrowRight twice, then Home, then End
    Then the width grows by 16, shrinks by 32, jumps to the minimum, then to the maximum
    When the visitor double-clicks the handle
    Then the default width is restored and the stored width is removed

  @component @NOP-INSP-054
  Scenario: Blocked storage does not break the panel
    Given localStorage throws on every access
    When a node is inspected and the panel is resized
    Then the panel works with its default size and no error is shown

  @component @NOP-INSP-055 @fixed-U-02
  Scenario: Long values can be read on touch screens
    Given a String parameter whose value is longer than its field
    When the visitor taps the field
    Then the whole value is shown, wrapped inside the panel
    And a second tap hides it again
    And a click that ends a text selection in the field leaves it as it is

  @e2e @NOP-INSP-056
  Scenario: A node the opening panel covers is panned into view
    Given the side panel is closed and node "merge1" sits at the right edge of the canvas
    When the visitor clicks (or taps, or presses Enter on) "merge1"
    Then the panel opens and covers part of the node
    And the view pans the node to the middle of the remaining canvas and keeps the zoom
    Given a node that the opened panel does not cover at all
    When the visitor selects it
    Then the view does not move
    And with the bottom sheet (narrow viewers) the same applies to the bottom edge
    Given a subnetwork in the lower half of a narrow viewer
    When the visitor clicks (or taps) it once
    Then its parameters open after the double-click time (400 ms), not at once
    When the visitor double-clicks (or double-taps) it instead
    Then the panel does not open over the node first, and the visitor goes inside
