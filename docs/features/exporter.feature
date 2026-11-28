@exporter
Feature: Houdini exporter and package
  exporter/nop_exporter.py runs inside Houdini and writes the JSON contract in docs/SCHEMA.md.
  The tests run the real exporter against a fake "hou" module (exporter/tests/fake_hou.py), dialogs
  and clipboard included; only installing the package in Houdini 22 (NOP-EXP-041) is checked by hand.

  # Entry points

  @NOP-EXP-001
  Scenario: Importing the module never starts an export
    When "import nop_exporter" runs without a "kwargs" global
    Then no dialog is shown and nothing is exported

  @NOP-EXP-002
  Scenario Outline: Export dialog choices
    Given the Network Editor shows "/obj/geo1"
    When the user runs "Export for NOP" and picks "<choice>"
    Then <result>

    Examples:
      | choice                             | result                                                         |
      | Copy to Clipboard (Compact Parms)  | indented compact JSON is on the clipboard and the status bar says how many nodes |
      | Save .json File (Compact Parms)    | a file chooser suggests "geo1-network.json" and the compact JSON is written      |
      | Save .json File (Full Parms)       | the file has exportMode "full"                                                   |
      | Cancel                             | nothing happens                                                                  |

  @NOP-EXP-003
  Scenario: A file name without .json gets the extension
    When the user saves as "mynet"
    Then the file "mynet.json" is written

  @NOP-EXP-004 @fixed-Q-15
  Scenario: Existing files are not overwritten silently
    Given "mynet.json" exists
    When the user saves as "mynet"
    Then the exporter asks before overwriting "mynet.json"

  @NOP-EXP-005
  Scenario: Copy for NOP needs no dialog
    Given the mouse is over a Network Editor showing "/obj/geo1" with two nodes selected
    When the user presses the "Copy for NOP" hotkey
    Then minified compact JSON of the two nodes is on the clipboard
    And the status bar says "Copied 2 selected node(s) from /obj/geo1"

  @NOP-EXP-006
  Scenario: No Network Editor open
    Given no Network Editor pane exists
    When the user runs "Copy for NOP"
    Then a warning in the status bar says no Network Editor was found

  @NOP-EXP-007
  Scenario: Export for NOP without a Network Editor exports /obj
    Given no Network Editor pane exists
    When the user runs "Export for NOP" and picks "Copy to Clipboard (Compact Parms)"
    Then the clipboard holds the export of "/obj"

  @NOP-EXP-008
  Scenario Outline: Which Network Editor is exported
    Given <panes>
    When the user runs "Copy for NOP"
    Then the network of <used> is exported

    Examples:
      | panes                                                             | used                           |
      | a pane passed by the shelf, another under the mouse               | the pane passed by the shelf   |
      | no pane passed, a Network Editor under the mouse                  | the pane under the mouse       |
      | a passed Scene Viewer, a Network Editor under the mouse           | the pane under the mouse       |
      | no pane passed, a Scene Viewer under the mouse, a Network Editor open | the first open Network Editor |

  # What is exported

  @NOP-EXP-010
  Scenario: Selection is limited to the exported network
    Given nodes are selected in "/obj/geo1" and in "/obj/geo2"
    When "/obj/geo1" is exported
    Then only the selected items of "/obj/geo1" are exported
    And wires to unselected nodes are left out, except wires from subnet inputs

  @NOP-EXP-052
  Scenario: Wires to items outside the selection keep where the far end is and its type, never its name
    Given "noise1" and "copy1" are selected, "grid1" feeds "noise1", "box1" feeds input 1 of "copy1", and "copy1" feeds "merge1", input 2 of the Copy to Points "xfer1" and a dot
    When "/obj/geo1" is exported
    Then "outsideWires" has one entry per wire: input 1 of "noise1" and input 1 of "copy1", then output 1 of "copy1" three times
    And each entry has the position of the item outside, a node's operator type, and the dot's entry says it is a dot
    And each wire leaving the selection says which input it enters outside
    And no unselected item's name appears in it
    And a whole-network export has no "outsideWires"

  @NOP-EXP-011
  Scenario: Nothing selected exports the whole network
    Given nothing is selected in "/obj/geo1"
    When it is exported
    Then all nodes, dots, network boxes and sticky notes are exported

  @NOP-EXP-012
  Scenario Outline: Which subnetworks are expanded
    Given a node <node>
    When it is exported
    Then its children are <expanded>

    Examples:
      | node                                                  | expanded     |
      | of type "subnet" with children                        | exported     |
      | of type "attribwrangle"                               | not exported |
      | "attribvop" (built-in, no asset definition)           | not exported |
      | "labs::thicken::1.0" locked                           | not exported |
      | "labs::thicken::1.0" unlocked by the user             | exported     |
      | of a locked asset that is not from SideFX or Labs     | not exported, unless the user chooses "Include Insides" |
      | of an unlocked asset that is not from SideFX or Labs  | exported     |
      | "subnet" with no children                             | not exported |

  @NOP-EXP-013 @fixed-X-01
  Scenario: Locked third-party assets stay closed
    Given a locked asset "vendor::tool::1.0" installed in $HOUDINI_USER_PREF_DIR/otls
    When the network is exported and the user keeps the default answer "Export Closed"
    Then the node is exported without children, with hdaState "locked"
    And its custom icon is still embedded (owner decision)
    And the status bar says how many locked asset types stayed closed
    When the user chooses "Include Insides" instead
    Then the node is exported with its children
    And the "Copy for NOP" hotkey never includes them

  @NOP-EXP-014
  Scenario: Built-in SideFX and Labs icons are never embedded
    Given nodes with icons "SOP_box" and "opdef:/labs::Sop/thicken::1.0?IconSVG"
    When the network is exported
    Then the document "icons" contains neither id
    And the nodes keep their icon ids

  @NOP-EXP-015
  Scenario: A user asset's SVG icon is embedded once
    Given three nodes of the user asset "me::tool::1.0" with an embedded IconSVG section
    When the network is exported
    Then "icons" holds that SVG once, under the node's icon id

  @NOP-EXP-016
  Scenario: Compact and full parameter modes
    Given a node with 3 changed parameters, 20 default ones, a default "snippet" and a hidden parameter
    When it is exported in compact mode
    Then the 3 changed parameters and "snippet" are exported
    When it is exported in full mode
    Then all visible parameters except buttons are exported, and the hidden one is not

  @NOP-EXP-017
  Scenario: Parameters hidden by a hide-when rule are left out
    Given parameter "tol" with hide-when "{ usetol == 0 }" and usetol is 0
    When the node is exported in full mode
    Then "tol" is not in "parms"

  @NOP-EXP-018 @unit
  Scenario Outline: Hide-when and disable-when rules
    Given a node whose current values are a = 1, b = "near", c = 3.5
    When the rule "<rule>" is evaluated
    Then it <applies>

    Examples:
      | rule                              | applies       |
      | { a == 1 }                        | applies       |
      | { a == 1 b != near }              | does not apply |
      | { a == 0 } { c > 2 }              | applies       |
      | { b =~ ne* }                      | applies       |
      | { b !~ ne* }                      | does not apply |
      | { missing == 1 }                  | does not apply |
      |                                   | does not apply |

  @NOP-EXP-019
  Scenario: Parameter tuple fields
    Given an animated "t" tuple with keyframes on tx, an expression "$F/10" on tz, and ty at its default
    When the node is exported
    Then "t" has val [tx, ty, tz], expr [null, null, "$F/10"], keyframed [true, false, false]
    And changed marks tx and tz
    And its folders and folderTypes come from the parameter template group

  @NOP-EXP-020 @unit
  Scenario Outline: Keyframe detection
    Given a parameter with <keys> keyframes and expression "<expr>"
    Then it counts as keyframed: <keyframed>

    Examples:
      | keys | expr      | keyframed |
      | 0    |           | false     |
      | 1    | $F/10     | false     |
      | 1    | bezier()  | true      |
      | 2    | linear()  | true      |

  @NOP-EXP-021
  Scenario: Menus, ramps and ranges
    Given a menu parameter on token "primitive" labelled "Primitives", a color ramp with 3 points and an Int with range 0 to 10
    When the node is exported
    Then the menu has menuLabel "Primitives"
    And the ramp has color true, 3 keys, 3 RGB values and 3 basis names
    And the Int has range [0, 10]
    And a parameter's own menu wins over its template's menu
    And an ordinal menu whose value is the item index gets the label at that index

  @NOP-EXP-024 @unit
  Scenario: Ramp points are not exported as parameters of their own
    Given a float ramp "thicknessramp" with 2 points, and its point parameters "thicknessramp1pos", "thicknessramp1value", "thicknessramp1interp", ...
    When the node is exported in compact or full mode
    Then "parms" has "thicknessramp" with its points in "ramp"
    And none of the point parameters

  @NOP-EXP-025 @unit
  Scenario Outline: A ramp counts as changed when its points differ from the default tag
    Given a float ramp with the "rampfloatdefault" tag "1pos ( 0 ) 1value ( 1 ) 1interp ( catmull-rom ) 2pos ( 1 ) 2value ( 1 ) 2interp ( catmull-rom )"
    And the same number of points as the default, values <values> and basis <basis>
    When the node is exported in compact mode
    Then the ramp is <result>

    Examples:
      | values | basis                    | result                                 |
      | [1, 1] | CatmullRom, CatmullRom   | left out                               |
      | [1, 0] | CatmullRom, CatmullRom   | exported with changed [true]           |
      | [1, 1] | Linear, Linear           | exported with changed [true]           |

  @NOP-EXP-026
  Scenario: An expanded subnetwork keeps all its items in a selection
    Given "subnet1" is selected in "/obj/geo1" and holds "p" and "q", wired together
    When "/obj/geo1" is exported
    Then "subnet1" is exported with both "p" and "q" and the wire between them

  @NOP-EXP-027
  Scenario: Cancelling the locked asset question exports nothing
    Given the network holds locked third-party assets of 12 types
    When the user runs "Export for NOP" and picks "Copy to Clipboard (Compact Parms)" or a "Save" choice
    Then the question lists the first 10 type names and "... and 2 more"
    When the user picks "Cancel" in it
    Then nothing is copied, no file chooser opens and the status bar stays unchanged

  @NOP-EXP-028
  Scenario: Parameter layout hints
    Given a node whose "mode" is 1
    When it is exported in full mode
    Then a parameter with disable-when "{ mode == 1 }" has disabled true
    And a folder with hide-when "{ mode == 1 }" leaves out its parameters, and one with disable-when disables them
    And a parameter joined with the next one has joinNext set to that parameter's name
    And a parameter with a hidden label has labelHidden true
    And string parameters with a menu or a menu script have hasMenu true
    And multiparm instances "pt1" and "pt2" get the folders of their "pt#" template

  @NOP-EXP-029
  Scenario: Code parameters are exported even when a rule hides them
    Given "snippet" has hide-when "{ mode == 1 }" and mode is 1
    When the node is exported in compact or full mode
    Then "snippet" is in "parms"

  @NOP-EXP-022
  Scenario: Node, dot, box, sticky note, subnet input and wire fields
    When a network with each item kind is exported
    Then nodes have name, type, label, icon, pos, size, color, shape, flags, connectors, comment, showComment, isSubnetwork, hdaState and parms
    And positions and sizes are rounded to 4 decimals, colors to 3
    And maxOutputs is the number of outputs the node shows (one per output label), not the type's maximum: 1 for a plain subnet, although Houdini reports 11 output connectors for every SOP subnet
    And dots have name, pos and pinned
    And network boxes have name, comment, pos, size, color, minimized and items
    And sticky notes have name, text, pos, size, color, minimized, textColor and drawBackground
    And subnet inputs have name, num, pos and inputName
    And wires have from, fromOutput, to and toInput, also when they run through a dot

  @NOP-EXP-023
  Scenario: Document header
    When any network is exported
    Then the document has schemaVersion "1.4.0", the Houdini version, an ISO UTC exportedAt, exportMode, icons, customShapes and root
    And exportWarnings counts the parameters that could not be read, and is missing when there are none
    And root.pathNodes lists every node from "/obj" down to the exported network with name, type and icon
    And the custom icons of user assets on that path are embedded
    And root.wireStyle is "rounded" only when the network category's default wire style is rounded

  # Privacy

  @NOP-EXP-030 @unit
  Scenario Outline: Local folders are replaced
    Given HIP is "C:/Users/jane/proj/fan", JOB is "C:/Users/jane/proj" and HOME is "C:/Users/jane"
    When the text "<text>" is scrubbed
    Then it becomes "<result>"

    Examples:
      | text                                         | result                               |
      | C:/Users/jane/proj/fan/geo/a.bgeo            | $HIP/geo/a.bgeo                      |
      | c:\Users\jane\proj\fan\geo\a.bgeo            | $HIP\geo\a.bgeo                      |
      | C:/Users/jane/proj/shared/tex/b.exr          | $JOB/shared/tex/b.exr                |
      | C:/Users/jane/Desktop/b.obj                  | <path>/b.obj                         |
      | /home/bob/cache/c.vdb                        | <path>/c.vdb                         |
      | D:/Projects/Acme Client/shot 010/a.exr       | <path>/a.exr                         |
      | ~/clients/acme/x.exr                         | <path>/x.exr                         |
      | string p = "C:\\Users\\jane\\Documents\\x.bgeo"; | string p = "<path>/x.bgeo";      |
      | /obj/geo1/OUT                                | /obj/geo1/OUT                        |
      | see https://site.com/users/x for details     | see https://site.com/users/x for details |

  @NOP-EXP-031
  Scenario: Scrubbed fields
    When a network is exported
    Then parameter values, expressions, menu labels, node comments, sticky note text, icon ids, path node icons and embedded custom icons are scrubbed

  @NOP-EXP-032
  Scenario: Network box comments are exported as written (owner decision, X-02 not fixed)
    Given a network box with comment "Acme shot010"
    When it is exported
    Then the box comment is "Acme shot010"
    And the export dialog reminds the user to check box comments and sticky notes

  @NOP-EXP-033 @fixed-X-03
  Scenario: Embedded SVG icons lose editor metadata
    Given a user asset icon saved by Inkscape with sodipodi:docname and inkscape:export-filename="C:\Users\jane\icon.png"
    When it is exported
    Then the embedded SVG has no metadata element, no sodipodi or inkscape attributes and no home folder

  @NOP-EXP-034 @fixed-X-04
  Scenario Outline: Server shares, other drives and mounts keep only the file name
    When the text "<text>" is scrubbed
    Then it becomes "<result>"

    Examples:
      | text                                       | result        |
      | \\studio-nas\clients\acme\shot010\a.exr      | <path>/a.exr  |
      | //studio-nas/clients/acme/a.exr            | <path>/a.exr  |
      | \\studio-nas\acme                           | <path>        |
      | D:/Projects/AcmeClient/a.exr               | <path>/a.exr  |
      | /Volumes/Work/Acme/x.abc                   | <path>/x.abc  |
      | /mnt/proj/acme/out.$F4.bgeo.sc             | <path>/out.$F4.bgeo.sc |

  @NOP-EXP-035
  Scenario: SVG icon files on disk
    Given a user asset whose icon is the file "$HIP/icons/tool.svg"
    And another user asset whose icon is an SVG file inside $HFS
    When the network is exported
    Then "icons" holds the first SVG under "$HIP/icons/tool.svg", the same id the node carries
    And the file inside $HFS is never read

  @NOP-EXP-036
  Scenario: Each export uses the current project folders
    Given a file parameter "C:/Users/jane/projB/geo/a.bgeo"
    When the network is exported with HIP "C:/Users/jane/projA", and again after HIP changes to "C:/Users/jane/projB"
    Then the first export has "<path>/a.bgeo" and the second "$HIP/geo/a.bgeo"

  @NOP-EXP-037
  Scenario: Custom node shapes are exported with their drawing data only
    Given a node whose shape "nop_test_hexagon" is defined by "hexagon_shape.json" in a "config/NodeShapes" folder on HOUDINI_PATH
    And that file has an extra "author" field with a home folder
    When the network is exported
    Then "customShapes" holds "nop_test_hexagon" once, with only name, outline, flags, inputs, outputs and icon
    And no file name, folder or extra field of the shape file is in the export
    And the 36 built-in shapes are never exported, also when a user folder has a file with a built-in name
    And folders inside $HFS are never read
    And when two folders define the same name, the first folder on HOUDINI_PATH wins
    And files that are not valid shapes are skipped, and invalid parts of a shape are left out
    And a shape that is not installed where the export runs is not exported: the node keeps its shape name and the viewer draws "rect"

  # Package

  @NOP-EXP-040 @unit
  Scenario: The exporter package zip
    When "npm run build:exporter" runs
    Then "public/downloads/nop-exporter.zip" contains "nop.json", "nop/toolbar/nop.shelf", "nop/icons/nop.png", "nop/README.txt" and "nop/scripts/python/nop_exporter.py"
    And "nop/README.txt" shows the package version instead of "{{VERSION}}"
    And the zip opens with Python's zipfile and every CRC matches

  @NOP-EXP-041
  Scenario: Installing the package adds the NOP shelf
    Given "nop.json" and "nop/" are copied into the Houdini 22 "packages" folder
    When Houdini starts
    Then a "NOP" shelf tab with "Export for NOP" and "Copy for NOP" and their icons is shown

  @NOP-EXP-042
  Scenario: The shelf tools call the exporter
    When "nop/toolbar/nop.shelf" is read
    Then "Export for NOP" calls run_interactive_export and "Copy for NOP" calls copy_selection_for_web, each with the pane
    And both functions exist in nop_exporter.py and take that pane
    And "nop.json" sets $NOP_EXPORTER_ROOT to the "nop" folder and adds it to the Houdini path

  # The format between exporter and viewer

  @NOP-EXP-050
  Scenario: A fresh export is what the viewer expects
    Given a network with every item kind and a private path in every text field (exporter/tests/sample_network.py)
    When it is exported and loaded in the viewer
    Then the document matches schema/nop-network-1.schema.json
    And normalizing it changes nothing: the viewer knows every field the exporter writes
    And its schema major version is the one the viewer supports

  @NOP-EXP-051 @component
  Scenario: The viewer draws a fresh export
    Given the export of the same network
    When the viewer shows it
    Then every exported node is drawn, the user asset with its embedded icon
    And the node with the custom shape is drawn with the exported outline
    And the user asset opens as a subnetwork, while the closed locked asset does not
