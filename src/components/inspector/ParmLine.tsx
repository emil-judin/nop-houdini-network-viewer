import React, { useState } from 'react';
import { Check, ChevronsUpDown, Menu } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { isToggleOn, type ParmDisplayRow } from './parmModel';
import { FIELD_HEIGHT, PANE } from './paneStyles';
import { RampView } from './RampView';

/** Component suffixes Houdini uses for vector tuples. */
const COMPONENT_NAMES = ['x', 'y', 'z', 'w'];

/**
 * Grid of one Parameter Pane row: toggle gutter, right-aligned label column, value column.
 * Like Houdini, the label column keeps a fixed width (about 140px) in wide panes, so widening
 * the panel only widens the fields; narrow panes shrink it.
 */
const LINE_GRID = 'grid grid-cols-[20px_clamp(72px,30%,140px)_minmax(0,1fr)] gap-x-3 items-start';

/**
 * Formats one exported value for a read-only field.
 */
function formatValue(value: string | number | boolean | undefined): string {
  if (value === undefined || value === null) return '';
  if (typeof value === 'boolean') return value ? 'on' : 'off';
  return String(value);
}

/**
 * Field colors of one tuple component: disabled, keyframed (green), expression (teal) or plain.
 */
function fieldColors(row: ParmDisplayRow, index: number): string {
  if (row.parm.disabled) return PANE.fieldDisabled;
  if (row.parm.keyframed?.[index]) return PANE.fieldKeyframed;
  if (row.parm.expr[index]) return PANE.fieldExpression;
  return PANE.field;
}

/**
 * Read-only value field (looks like a Houdini parameter input but cannot be edited).
 *
 * Long values are cut off like in Houdini. A click or tap shows the whole value in place (and hides
 * it again), because touch screens have no hover tooltip.
 */
const ValueField: React.FC<{
  text: string;
  colors: string;
  className?: string;
  title?: string;
  mono?: boolean;
  /** Bold text: Houdini shows values that differ from the default in bold. */
  bold?: boolean;
  /** Axis color of a vector component (small diamond in the bottom-right corner, like Houdini). */
  axisColor?: string;
}> = ({ text, colors, className = '', title, mono, bold, axisColor }) => {
  const [expanded, setExpanded] = useState(false);
  // Greyed out by a disable-when rule: announced as dimmed (inactive text is exempt from contrast rules)
  const disabled = colors === PANE.fieldDisabled;
  return (
    // A pointer convenience only: screen readers already read the whole value, and making every field
    // a tab stop would bury the panel in hundreds of stops
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      title={title}
      aria-disabled={disabled || undefined}
      onClick={() => {
        // Selecting text with the mouse also ends with a click: keep the field as it is then
        if (window.getSelection()?.toString()) return;
        setExpanded((value) => !value);
      }}
      className={`relative min-w-0 ${expanded ? 'min-h-6 h-auto py-0.5' : FIELD_HEIGHT} px-1.5 flex items-center rounded-[3px] text-[13px] select-text cursor-text ${
        mono ? 'font-mono text-[12px]' : ''
      } ${bold ? 'font-bold' : ''} ${colors} ${className}`}
    >
      <span className={expanded ? 'whitespace-pre-wrap break-all' : 'truncate'}>{text}</span>
      {axisColor && (
        <span
          aria-hidden="true"
          className="absolute right-[3px] bottom-[3px] w-[3px] h-[3px] rotate-45"
          style={{ backgroundColor: axisColor }}
        />
      )}
    </div>
  );
};

/** Houdini's x / y / z component colors (sampled from a Houdini 22 Transform SOP). */
const AXIS_COLORS = ['#db6c5a', '#58be65', '#6994c1'];

/**
 * Text of one tuple component. Like Houdini, a field driven by an expression shows the
 * expression itself (`$F`, `ch("../seed")`); the evaluated value is listed under the row.
 */
function componentText(row: ParmDisplayRow, index: number): string {
  return row.parm.expr[index] ?? formatValue(row.parm.val[index]);
}

/** Tooltip of one tuple component: the internal name, plus the value when an expression is shown. */
function componentTitle(row: ParmDisplayRow, index: number, componentName: string): string {
  const name = `${row.parm.name}${componentName}`;
  return row.parm.expr[index] ? `${name} = ${formatValue(row.parm.val[index])}` : name;
}

/**
 * Houdini toggle box: blue-grey when off, dark navy with a blue check mark when on.
 */
export const ToggleBox: React.FC<{ row: ParmDisplayRow }> = ({ row }) => {
  const on = isToggleOn(row.parm.val[0]);
  const disabled = Boolean(row.parm.disabled);
  const colors = row.parm.expr[0]
    ? 'bg-[#425757]'
    : on
      ? 'bg-[#1e253c] border border-[#323c5b]'
      : disabled
        ? 'bg-[#36383f]'
        : 'bg-[#474e62]';
  return (
    <span
      role="img"
      aria-label={`${row.label}: ${on ? 'on' : 'off'}`}
      title={row.parm.name}
      className={`shrink-0 w-[18px] h-[18px] rounded-[3px] flex items-center justify-center ${colors} ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      {on && <Check className="w-3.5 h-3.5 text-[#7082b9]" strokeWidth={3.5} aria-hidden="true" />}
    </span>
  );
};

/**
 * Slider track with the knob at the value's position in the parameter range.
 */
const Slider: React.FC<{ value: number; range: [number, number]; disabled: boolean }> = ({ value, range, disabled }) => {
  const [min, max] = range;
  const t = max > min ? Math.min(1, Math.max(0, (value - min) / (max - min))) : 0;
  return (
    <div className={`relative flex-1 min-w-8 ${FIELD_HEIGHT} ${disabled ? 'opacity-50' : ''}`} aria-hidden="true">
      <div className="absolute left-1.5 right-1.5 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-[#434343]" />
      {/* Houdini fills the track in blue from the start up to the knob */}
      <div
        className="absolute left-1.5 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-[#7082b9]"
        style={{ width: `calc((100% - 12px) * ${t})` }}
      />
      <div
        className="absolute top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#777f95]"
        style={{ left: `calc(6px + (100% - 12px) * ${t})` }}
      />
    </div>
  );
};

/**
 * Value widget of one parameter (everything right of its label).
 */
const ParmWidget: React.FC<{ row: ParmDisplayRow }> = ({ row }) => {
  const { parm } = row;
  const disabled = Boolean(parm.disabled);
  switch (row.kind) {
    case 'toggle':
      return (
        <div className={`flex items-center gap-2 ${FIELD_HEIGHT} min-w-0`}>
          <ToggleBox row={row} />
          {!parm.labelHidden && (
            <span className={`text-[13px] truncate ${disabled ? 'text-[#676767]' : PANE.text}`}>{row.label}</span>
          )}
        </div>
      );
    case 'menu':
      return (
        <div
          title={parm.menuLabel ? `Token: ${formatValue(parm.val[0])}` : parm.name}
          className={`min-w-0 max-w-full ${FIELD_HEIGHT} inline-flex items-center rounded-[3px] overflow-hidden text-[13px] ${
            parm.expr[0] ? PANE.fieldExpression : disabled ? PANE.fieldDisabled : PANE.field
          }`}
        >
          <span className={`shrink-0 w-5 h-full flex items-center justify-center ${disabled ? PANE.buttonDisabled : PANE.button}`}>
            <ChevronsUpDown className="w-3 h-3" aria-hidden="true" />
          </span>
          <span className={`px-2 truncate ${parm.changed?.[0] ? 'font-bold' : ''}`}>
            {parm.expr[0] ?? (parm.menuLabel || formatValue(parm.val[0]))}
          </span>
        </div>
      );
    case 'ramp':
      if (parm.ramp) return <RampView ramp={parm.ramp} disabled={disabled} />;
      return (
        <ValueField text={`Ramp with ${formatValue(parm.val[0])} points`} colors={`${PANE.field} italic text-[#a8a8a8]!`} />
      );
    case 'number': {
      const first = parm.val[0];
      if (parm.val.length === 1) {
        return (
          <div className="flex items-center gap-1.5 min-w-0 w-full">
            <ValueField
              text={componentText(row, 0)}
              colors={fieldColors(row, 0)}
              mono
              bold={parm.changed?.[0]}
              // At least Houdini's 88px, wider when the text needs it (expressions such as `ch("../size")`),
              // so widening the panel reveals the whole text; the slider gets the remaining space
              className="min-w-[88px]! max-w-full shrink"
              title={componentTitle(row, 0, '')}
            />
            {parm.range && typeof first === 'number' && (
              <Slider value={first} range={parm.range} disabled={disabled} />
            )}
          </div>
        );
      }
      return (
        <div className="flex gap-1 min-w-0 w-full">
          {parm.val.map((_, i) => (
            <ValueField
              key={i}
              text={componentText(row, i)}
              colors={fieldColors(row, i)}
              mono
              bold={parm.changed?.[i]}
              axisColor={parm.type === 'Float' ? AXIS_COLORS[i] : undefined}
              className="flex-1"
              title={componentTitle(row, i, COMPONENT_NAMES[i] ?? String(i + 1))}
            />
          ))}
        </div>
      );
    }
    case 'label':
      return (
        <span className={`flex items-center ${FIELD_HEIGHT} text-[13px] ${PANE.text}`}>
          {parm.val.filter((v) => v !== '').map(formatValue).join(' ')}
        </span>
      );
    default:
      return (
        <div className="flex gap-0.5 min-w-0 w-full">
          {parm.val.map((_, i) => (
            <ValueField
              key={i}
              text={componentText(row, i)}
              colors={fieldColors(row, i)}
              bold={parm.changed?.[i]}
              className="flex-1"
              title={componentTitle(row, i, '')}
            />
          ))}
          {parm.hasMenu && (
            <span
              className={`shrink-0 w-6 ${FIELD_HEIGHT} rounded-[3px] flex items-center justify-center ${
                disabled ? PANE.buttonDisabled : PANE.button
              }`}
              aria-hidden="true"
            >
              <Menu className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          )}
        </div>
      );
  }
};

/** `true` when a row draws its own label (toggles) or has none in the label column. */
function hasOwnLabel(row: ParmDisplayRow): boolean {
  return row.kind === 'toggle' || Boolean(row.parm.labelHidden);
}

/**
 * `true` for a joined parameter without a real label: Houdini shows none when the label is just
 * the internal name (e.g. `numsides` after "Maximum Edges"). Exports before schema 1.2.0 lack `labelHidden`.
 */
function hasNoInlineLabel(row: ParmDisplayRow): boolean {
  return hasOwnLabel(row) || row.label === row.parm.name;
}

/**
 * Text label of a parameter in the label column or in front of a joined widget.
 */
const ParmLabel: React.FC<{ row: ParmDisplayRow; className?: string }> = ({ row, className = '' }) => (
  <span
    title={row.parm.name}
    aria-disabled={row.parm.disabled || undefined}
    className={`text-[13px] leading-6 truncate ${row.parm.disabled ? PANE.labelDisabled : PANE.label} ${className}`}
  >
    {row.label}
  </span>
);

/**
 * Evaluated values of the expression-driven components of a line, listed under the fields
 * (the fields show the expressions, like Houdini; this keeps the values readable on touch screens).
 */
const ExpressionValues: React.FC<{ rows: ParmDisplayRow[] }> = ({ rows }) => {
  const values = rows.flatMap((row) =>
    row.parm.expr
      .map((expr, i) =>
        expr
          ? {
              key: `${row.parm.name}-${i}`,
              value: formatValue(row.parm.val[i]),
              component: row.parm.expr.length > 1 ? COMPONENT_NAMES[i] ?? String(i + 1) : '',
            }
          : null,
      )
      .filter((e): e is { key: string; value: string; component: string } => e !== null),
  );
  if (values.length === 0) return null;
  return (
    <div className="col-start-3 mt-0.5 flex flex-wrap gap-x-3 font-mono text-[11px] leading-4 text-[#8a9a9a] select-text">
      {values.map(({ key, value, component }) => (
        <span key={key}>
          {component && `${component} `}= {value}
        </span>
      ))}
    </div>
  );
};

/**
 * One row of the read-only Parameter Pane, laid out like Houdini's: an optional toggle in the
 * left gutter, the right-aligned label, then the value widgets. Parameters joined with the next
 * one ("Snap To [menu] Using [menu]") share the row. Code parameters use the full width.
 */
export const ParmLine: React.FC<{ rows: ParmDisplayRow[] }> = ({ rows }) => {
  const [first, ...rest] = rows;

  if (first.kind === 'separator') {
    // A border (not a 1px-high box): browsers snap border widths to whole screen pixels, so every
    // separator has the same thickness on scaled displays (125%, 150%), wherever it lands
    return <div className="mx-2 my-1.5 h-0 border-t border-[#3e3e3e]" role="separator" />;
  }

  if (first.kind === 'code') {
    return (
      <div role="group" aria-label={first.label} className="px-2 py-1">
        <ParmLabel row={first} className="block mb-0.5" />
        <CodeBlock code={formatValue(first.parm.val[0])} language={first.language} />
      </div>
    );
  }

  // A label-less toggle joined to the next parameter sits in the gutter, in front of that label
  const gutterToggle = first.kind === 'toggle' && Boolean(first.parm.labelHidden) && rest.length > 0;
  const main = gutterToggle ? rest : rows;
  const [lead, ...inline] = main;
  const hasExpression = main.some((row) => row.parm.expr.some(Boolean));

  return (
    // A named group, so screen readers announce each value together with its parameter label
    <div
      role="group"
      aria-label={lead.label}
      // Greyed out by a disable-when rule in Houdini: announced as dimmed (and exempt from text contrast)
      aria-disabled={main.every((row) => row.parm.disabled) || undefined}
      className={`${LINE_GRID} px-2 py-[3px]`}
    >
      {hasExpression && !gutterToggle ? (
        // Houdini highlights the label of an expression-driven parameter and adds an f(x) icon
        <div className="col-span-2 min-w-0 flex items-center justify-end gap-1 pr-1 rounded-[3px] bg-[#424242]">
          {!hasOwnLabel(lead) && <ParmLabel row={lead} />}
          <span className="shrink-0 text-[11px] italic font-semibold text-[#8291bf]" title="Driven by an expression">
            f(x)
          </span>
        </div>
      ) : (
        <>
          <div className={`flex items-center ${FIELD_HEIGHT}`}>{gutterToggle && <ToggleBox row={first} />}</div>
          <div className="min-w-0 text-right">{!hasOwnLabel(lead) && <ParmLabel row={lead} className="block" />}</div>
        </>
      )}
      {/* Joined parameters stay on one row like in Houdini; their fields shrink to fit */}
      <div className={`min-w-0 flex items-center gap-x-3 gap-y-1 ${inline.length > 0 ? 'flex-nowrap' : 'flex-wrap'}`}>
        {inline.length > 0 ? (
          <div className={`min-w-0 flex items-center ${lead.kind === 'string' || lead.kind === 'number' ? 'flex-1' : 'shrink'}`}>
            <ParmWidget row={lead} />
          </div>
        ) : (
          <ParmWidget row={lead} />
        )}
        {inline.map((row) => (
          <div key={row.parm.name} className="min-w-0 flex items-center gap-2 flex-1">
            {!hasNoInlineLabel(row) && <ParmLabel row={row} className="shrink-0" />}
            <ParmWidget row={row} />
          </div>
        ))}
      </div>
      <ExpressionValues rows={main} />
    </div>
  );
};
