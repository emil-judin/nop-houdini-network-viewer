"""
A small stand-in for Houdini's `hou` module, so the exporter can be tested without Houdini.

It covers only what `nop_exporter.py` calls. Tests install it as `sys.modules["hou"]` before importing
the exporter (see `test_nop_exporter.py`). Nodes, parameters and network items are plain Python
objects built with the helper classes below.
"""

import enum
import os

ENV = {}


def getenv(name, default=None):
    return ENV.get(name, default)


class text:  # noqa: N801 (Houdini's own name: `hou.text`)
    @staticmethod
    def expandString(value):
        for name, replacement in ENV.items():
            value = value.replace("$" + name, replacement)
        return value


def applicationVersionString():
    return "22.0.100"


def selectedItems():
    return tuple(SELECTION)


SELECTION = []

# Nodes that `node(path)` finds, registered by the tests
NODES = {}


def node(path):
    return NODES.get(path)


# Folders on HOUDINI_PATH, in order: `findDirectories()` returns the subfolders that exist in them
HOUDINI_PATH = []


def findDirectories(directory_name):
    folders = (folder.rstrip("/") + "/" + directory_name for folder in HOUDINI_PATH)
    return tuple(folder for folder in folders if os.path.isdir(folder))


def reset():
    """Clears every global the tests set: variables, selection, asset sections, nodes, HOUDINI_PATH and the UI."""
    ENV.clear()
    HOUDINI_PATH.clear()
    SELECTION.clear()
    ASSET_SECTIONS.clear()
    NODES.clear()
    ui.reset()


class Error(Exception):
    pass


class OperationFailed(Error):
    pass


class InvalidNodeType(Error):
    pass


class parmTemplateType(enum.Enum):
    Int = 0
    Float = 1
    String = 2
    Toggle = 3
    Menu = 4
    Button = 5
    FolderSet = 6
    Folder = 7
    Separator = 8
    Label = 9
    Ramp = 10
    Data = 11


class parmCondType(enum.Enum):
    DisableWhen = 0
    HideWhen = 1


class networkItemType(enum.Enum):
    Node = 0
    NetworkBox = 1
    StickyNote = 2
    SubnetIndirectInput = 3
    Connection = 4
    NetworkDot = 5


class nodeFlag(enum.Enum):
    DisplayComment = 0


class severityType(enum.Enum):
    Message = 0
    ImportantMessage = 1
    Warning = 2
    Error = 3


class folderType(enum.Enum):
    Tabs = 0
    RadioButtons = 1
    Simple = 2
    Collapsible = 3
    MultiparmBlock = 4
    ScrollingMultiparmBlock = 5
    TabbedMultiparmBlock = 6
    ImportBlock = 7


class paneTabType(enum.Enum):
    NetworkEditor = 0
    SceneViewer = 1


class fileChooserMode(enum.Enum):
    Read = 0
    Write = 1


class Color:
    def __init__(self, rgb=(0.8, 0.8, 0.8)):
        self._rgb = tuple(rgb)

    def rgb(self):
        return self._rgb


class ParmTemplate:
    def __init__(
        self,
        name,
        kind=parmTemplateType.Float,
        label=None,
        hidden=False,
        hide_when="",
        disable_when="",
        children=(),
        tags=None,
        folder_type=folderType.Tabs,
        join_next=False,
        label_hidden=False,
        num_components=1,
        value_range=(0.0, 10.0),
        menu_items=(),
        menu_labels=(),
        item_generator="",
    ):
        self._name = name
        self._tags = dict(tags or {})
        self._kind = kind
        self._label = label or name
        self._hidden = hidden
        self._conditionals = {}
        if hide_when:
            self._conditionals[parmCondType.HideWhen] = hide_when
        if disable_when:
            self._conditionals[parmCondType.DisableWhen] = disable_when
        self._children = list(children)
        self._folder_type = folder_type
        self._join_next = join_next
        self._label_hidden = label_hidden
        self._num_components = num_components
        self._range = value_range
        self._menu_items = tuple(menu_items)
        self._menu_labels = tuple(menu_labels)
        self._item_generator = item_generator

    def name(self):
        return self._name

    def label(self):
        return self._label

    def type(self):
        return self._kind

    def isHidden(self):
        return self._hidden

    def conditionals(self):
        return dict(self._conditionals)

    def tags(self):
        return dict(self._tags)

    def parmTemplates(self):
        return tuple(self._children)

    def folderType(self):
        return self._folder_type

    def joinsWithNext(self):
        return self._join_next

    def isLabelHidden(self):
        return self._label_hidden

    def numComponents(self):
        return self._num_components

    def minValue(self):
        return self._range[0]

    def maxValue(self):
        return self._range[1]

    def menuItems(self):
        return self._menu_items

    def menuLabels(self):
        return self._menu_labels

    def itemGeneratorScript(self):
        return self._item_generator


class ParmTemplateGroup:
    def __init__(self, templates):
        self._templates = list(templates)

    def entries(self):
        return tuple(self._templates)


class Parm:
    """One parameter component. `value` is returned by `eval()`; `expression` raises when None."""

    def __init__(
        self,
        name,
        value,
        expression=None,
        template=None,
        default=None,
        keyframes=(),
        multiparm_parent=None,
        ramp=None,
        menu_items=(),
        menu_labels=(),
    ):
        self._menu_items = tuple(menu_items)
        self._menu_labels = tuple(menu_labels)
        self._name = name
        self._value = value
        self._expression = expression
        self._template = template or ParmTemplate(name, _kind_of(value))
        self._default = value if default is None else default
        self._keyframes = list(keyframes)
        self._multiparm_parent = multiparm_parent
        self._ramp = ramp
        self.eval_count = 0

    def name(self):
        return self._name

    def isMultiParmInstance(self):
        return self._multiparm_parent is not None

    def parentMultiParm(self):
        return self._multiparm_parent

    def evalAsRamp(self):
        if self._ramp is None:
            raise OperationFailed("not a ramp")
        return self._ramp

    def eval(self):
        self.eval_count += 1
        return self._value

    def evalAsString(self):
        self.eval_count += 1
        return str(self._value)

    def expression(self):
        if self._expression is None:
            raise OperationFailed("no expression")
        return self._expression

    def parmTemplate(self):
        return self._template

    def isAtDefault(self):
        return self._value == self._default

    def keyframes(self):
        return tuple(self._keyframes)

    def containingFolders(self):
        return ()

    def menuItems(self):
        return self._menu_items

    def menuLabels(self):
        return self._menu_labels


class rampBasis(enum.Enum):
    Constant = 0
    Linear = 1
    CatmullRom = 2
    MonotoneCubic = 3


class Ramp:
    def __init__(self, keys, values, basis):
        self._keys = tuple(keys)
        self._values = tuple(values)
        self._basis = tuple(basis)

    def isColor(self):
        return bool(self._values) and isinstance(self._values[0], (tuple, list))

    def keys(self):
        return self._keys

    def values(self):
        return self._values

    def basis(self):
        return self._basis


class ParmTuple(list):
    def __init__(self, name, parms, label=None):
        super().__init__(parms)
        self._name = name
        self._label = label or name

    def name(self):
        return self._name

    def description(self):
        return self._label

    def parmTemplate(self):
        return self[0].parmTemplate()

    def isAtDefault(self):
        return all(p.isAtDefault() for p in self)


def _kind_of(value):
    if isinstance(value, bool):
        return parmTemplateType.Toggle
    if isinstance(value, int):
        return parmTemplateType.Int
    if isinstance(value, float):
        return parmTemplateType.Float
    return parmTemplateType.String


class HDADefinition:
    def __init__(self, library):
        self._library = library

    def libraryFilePath(self):
        return self._library


class NodeType:
    def __init__(self, name, description=None, icon=None, definition=None, child_category="Sop"):
        self._name = name
        self._description = description or name
        self._icon = icon or "SOP_" + name.split("::")[-2 if name.count("::") >= 2 else -1]
        self._definition = definition
        self._child_category = child_category

    def name(self):
        return self._name

    def description(self):
        return self._description

    def icon(self):
        return self._icon

    def definition(self):
        return self._definition

    def defaultShape(self):
        return "rect"

    def nameComponents(self):
        parts = self._name.split("::")
        if len(parts) == 3:
            return ("", parts[0], parts[1], parts[2])
        if len(parts) == 2:
            return ("", "", parts[0], parts[1])
        return ("", "", self._name, "")


class ChildTypeCategory:
    def __init__(self, name="Sop", wire_style="default"):
        self._name = name
        self._wire_style = wire_style

    def name(self):
        return self._name

    def defaultWireStyle(self):
        return self._wire_style


class Connection:
    """A wire into `output_item`'s input `input_index`, from output `output_index` of `input_item`."""

    def __init__(self, input_item, output_index, input_index, output_item=None):
        self._input_item = input_item
        self._output_index = output_index
        self._input_index = input_index
        self._output_item = output_item

    def inputItem(self):
        return self._input_item

    def outputItem(self):
        return self._output_item

    def outputIndex(self):
        return self._output_index

    def inputIndex(self):
        return self._input_index


def connect(source, target, output_index=0, input_index=0):
    """Wires `source` (a node, dot or subnet input) into `target` (a node or dot)."""
    connection = Connection(source, output_index, input_index, target)
    target._input_connections.append(connection)
    source._output_connections.append(connection)


class Item:
    """Common parts of nodes, dots, network boxes and sticky notes."""

    item_type = networkItemType.Node

    def __init__(self, name, pos=(0.0, 0.0), size=(1.0, 0.3), color=(0.8, 0.8, 0.8)):
        self._name = name
        self._pos = tuple(pos)
        self._size = tuple(size)
        self._color = Color(color)
        self._parent = None
        self._input_connections = []
        self._output_connections = []

    def name(self):
        return self._name

    def networkItemType(self):
        return self.item_type

    def position(self):
        return self._pos

    def size(self):
        return self._size

    def color(self):
        return self._color

    def parent(self):
        return self._parent

    def inputConnections(self):
        return tuple(self._input_connections)

    def outputConnections(self):
        return tuple(self._output_connections)


class SubnetIndirectInput(Item):
    """One of a subnetwork's own inputs, drawn inside it (`1`, `2`, ...)."""

    item_type = networkItemType.SubnetIndirectInput

    def __init__(self, number, **kwargs):
        super().__init__(str(number + 1), **kwargs)
        self._number = number

    def number(self):
        return self._number


class NetworkDot(Item):
    item_type = networkItemType.NetworkDot

    def __init__(self, name, pinned=False, **kwargs):
        super().__init__(name, **kwargs)
        self._pinned = pinned

    def isPinned(self):
        return self._pinned


class Node(Item):
    """A node. `flags` sets any of bypass, display, render, template, selectable_template, lock and soft_lock.

    `indirect_inputs` is the number of subnet inputs; without it the node is not a subnetwork and
    `indirectInputs()` raises like Houdini does. `template_group` replaces the group built from the parameters.
    `shape` is the node's `nodeshape` user data (the shape set with the Network Editor's shape palette).
    """

    def __init__(
        self,
        name,
        node_type,
        parms=(),
        children=(),
        locked=None,
        comment="",
        flags=None,
        show_comment=False,
        indirect_inputs=None,
        wire_style="default",
        template_group=None,
        output_labels=("Output 1",),
        output_connectors=None,
        shape=None,
        **kwargs
    ):
        super().__init__(name, **kwargs)
        # Like Houdini: `outputLabels()` lists the outputs the node shows, `outputConnectors()` has the
        # type's maximum (11 for every SOP subnet)
        self._output_labels = tuple(output_labels)
        self._output_connectors = len(self._output_labels) if output_connectors is None else output_connectors
        self._type = node_type
        self._parm_tuples = list(parms)
        self._children = []
        self._locked = locked
        self._comment = comment
        self._flags = dict(flags or {})
        self._show_comment = show_comment
        self._indirect_inputs = None
        if indirect_inputs is not None:
            self._indirect_inputs = [SubnetIndirectInput(i, pos=(i * 2.0, 3.0)) for i in range(indirect_inputs)]
            for indirect_input in self._indirect_inputs:
                indirect_input._parent = self
        self._wire_style = wire_style
        self._template_group = template_group
        self._shape = shape
        for child in children:
            self.add(child)

    def add(self, item):
        item._parent = self
        self._children.append(item)
        return item

    def path(self):
        if self._parent is None:
            return "/" + self._name
        return self._parent.path() + "/" + self._name

    def type(self):
        return self._type

    def children(self):
        return tuple(c for c in self._children if isinstance(c, Node))

    def allItems(self):
        return tuple(self._children)

    def isSubNetwork(self):
        return len(self._children) > 0 or self._type.name() in ("subnet", "geo")

    def isLockedHDA(self):
        return bool(self._locked)

    def childTypeCategory(self):
        return ChildTypeCategory(wire_style=self._wire_style)

    def indirectInputs(self):
        if self._indirect_inputs is None:
            raise InvalidNodeType("Node is not a subnetwork")
        return tuple(self._indirect_inputs)

    def inputs(self):
        connections = sorted(self._input_connections, key=lambda c: c.inputIndex())
        result = []
        for connection in connections:
            while len(result) < connection.inputIndex():
                result.append(None)
            result.append(connection.inputItem())
        return tuple(result)

    def isBypassed(self):
        return self._flags.get("bypass", False)

    def isDisplayFlagSet(self):
        return self._flags.get("display", False)

    def isRenderFlagSet(self):
        return self._flags.get("render", False)

    def isTemplateFlagSet(self):
        return self._flags.get("template", False)

    def isSelectableTemplateFlagSet(self):
        return self._flags.get("selectable_template", False)

    def isHardLocked(self):
        return self._flags.get("lock", False)

    def isSoftLocked(self):
        return self._flags.get("soft_lock", False)

    def parmTuples(self):
        return tuple(self._parm_tuples)

    def parmTuple(self, name):
        for pt in self._parm_tuples:
            if pt.name() == name:
                return pt
        return None

    def parm(self, name):
        for pt in self._parm_tuples:
            if len(pt) == 1 and pt.name() == name:
                return pt[0]
            for p in pt:
                if p.name() == name:
                    return p
        return None

    def parmTemplateGroup(self):
        if self._template_group is not None:
            return ParmTemplateGroup(self._template_group)
        return ParmTemplateGroup([pt.parmTemplate() for pt in self._parm_tuples])

    def userData(self, key):
        return self._shape if key == "nodeshape" else None

    def inputConnectors(self):
        return ((),)

    def inputLabels(self):
        return ("Input 1",)

    def outputConnectors(self):
        return tuple(() for _ in range(self._output_connectors))

    def outputLabels(self):
        return self._output_labels

    def comment(self):
        return self._comment

    def isGenericFlagSet(self, flag):
        return flag == nodeFlag.DisplayComment and self._show_comment


class NetworkBox(Item):
    item_type = networkItemType.NetworkBox

    def __init__(self, name, comment="", items=(), minimized=False, **kwargs):
        super().__init__(name, **kwargs)
        self._comment = comment
        self._items = list(items)
        self._minimized = minimized

    def comment(self):
        return self._comment

    def isMinimized(self):
        return self._minimized

    def items(self):
        return tuple(self._items)


class StickyNote(Item):
    item_type = networkItemType.StickyNote

    def __init__(self, name, text="", minimized=False, text_color=(0, 0, 0), draw_background=True, **kwargs):
        super().__init__(name, **kwargs)
        self._text = text
        self._minimized = minimized
        self._text_color = Color(text_color)
        self._draw_background = draw_background

    def text(self):
        return self._text

    def isMinimized(self):
        return self._minimized

    def textColor(self):
        return self._text_color

    def drawBackground(self):
        return self._draw_background


def readFile(path):
    return ASSET_SECTIONS[path]


ASSET_SECTIONS = {}


class NetworkEditor:
    """A pane tab showing the network `pwd`. `kind` makes it another pane type."""

    def __init__(self, pwd, kind=paneTabType.NetworkEditor):
        self._pwd = pwd
        self._kind = kind

    def type(self):
        return self._kind

    def pwd(self):
        return self._pwd


class _UI:
    """`hou.ui`: dialogs answer from `answers` and fail when none is left; everything else is recorded.

    - `answers`: button indexes for the next `displayMessage` calls, in order.
    - `messages`: `(text, buttons, title)` of every dialog shown.
    - `clipboard`: the last copied text, or None.
    - `statuses`: `(text, severity)` of every status bar message.
    - `selected_file`: what the file chooser returns; `file_choosers` records its arguments.
    - `panes`: open pane tabs; `pane_under_cursor`: the pane under the mouse.
    """

    def __init__(self):
        self.reset()

    def reset(self):
        self.answers = []
        self.messages = []
        self.clipboard = None
        self.statuses = []
        self.selected_file = ""
        self.file_choosers = []
        self.panes = []
        self.pane_under_cursor = None

    def displayMessage(self, text, buttons=("OK",), severity=None, default_choice=0, close_choice=None, title=None):
        self.messages.append((text, tuple(buttons), title))
        if not self.answers:
            raise AssertionError("Unexpected dialog: " + text)
        return self.answers.pop(0)

    def copyTextToClipboard(self, text):
        self.clipboard = text

    def setStatusMessage(self, text, severity=severityType.Message):
        self.statuses.append((text, severity))

    def selectFile(self, title=None, default_value=None, pattern=None, chooser_mode=None):
        self.file_choosers.append({"title": title, "default_value": default_value, "pattern": pattern, "chooser_mode": chooser_mode})
        return self.selected_file

    def paneTabUnderCursor(self):
        return self.pane_under_cursor

    def paneTabOfType(self, kind):
        for pane in self.panes:
            if pane.type() == kind:
                return pane
        return None


ui = _UI()
