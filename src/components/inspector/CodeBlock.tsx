import React, { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { highlightCode, type CodeTokenKind } from './codeHighlight';
import type { CodeLanguage } from './parmModel';
import { TOUCH_TARGET } from '../hud/touchTarget';

/**
 * Token colors, tuned for the dark `#1f1f1f` editor field of the Houdini 22 Parameter Pane.
 */
const TOKEN_COLORS: Record<CodeTokenKind, string | undefined> = {
  plain: undefined,
  comment: '#7f9a7f',
  string: '#e3b56f',
  number: '#b8d7a3',
  keyword: '#d08ad6',
  type: '#6db4e0',
  attribute: '#f39b5b',
  function: '#e0d890',
  preprocessor: '#c586c0',
  constant: '#6db4e0',
};

const LANGUAGE_NAMES: Record<CodeLanguage, string> = {
  vex: 'VEX',
  python: 'Python',
  text: 'Text',
};

/**
 * Returns `true` when the asynchronous Clipboard API can write text here
 * (it needs a secure context and is missing in some embedded web views).
 */
function canWriteClipboard(): boolean {
  return typeof navigator !== 'undefined' && Boolean(navigator.clipboard?.writeText) && window.isSecureContext;
}

/**
 * Props for the read-only highlighted code field (`CodeBlock`).
 */
export interface CodeBlockProps {
  /** Source code to show. */
  code: string;
  /** Highlighting rules to use. */
  language: CodeLanguage;
}

/** Copy button in the top-right corner of a code field. */
const COPY_BUTTON_CLASS = `absolute top-1 right-3 z-10 flex items-center justify-center gap-1 px-1.5 py-0.5 rounded-[3px] bg-[#474e62] text-[11px] text-[#ecedef] hover:bg-[#535b72] transition-colors cursor-pointer ${TOUCH_TARGET}`;

/**
 * Read-only, syntax-highlighted code field for VEX snippets and Python code, with a
 * one-click Copy button. Long lines scroll sideways instead of wrapping, like Houdini's editor.
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const tokens = useMemo(() => highlightCode(code, language), [code, language]);
  const [copied, setCopied] = useState(false);
  const showCopy = canWriteClipboard();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Permission denied: the code stays selectable for a manual copy
    }
  };

  return (
    // Houdini's code editor: near-black field, line numbers in a gutter, Copy button at the top right
    <div className="relative rounded-[2px] border border-[#3a3a3a] bg-[#141414]">
      {showCopy && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Code copied' : 'Copy code'}
          className={COPY_BUTTON_CLASS}
        >
          {copied ? <Check className="w-3 h-3" aria-hidden="true" /> : <Copy className="w-3 h-3" aria-hidden="true" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      )}
      {/* A focusable, named region: keyboard users can scroll long code with the arrow keys */}
      <div
        role="region"
        aria-label={`${LANGUAGE_NAMES[language]} code`}
        tabIndex={0}
        className="flex max-h-80 overflow-auto [scrollbar-color:#555555_#141414] [scrollbar-width:thin] font-mono text-[12px] leading-[1.45]"
      >
        <pre aria-hidden="true" className="sticky left-0 m-0 py-1.5 pl-2 pr-2 text-right text-[#8c8c8c] bg-[#1c1c1c] select-none">
          {code.split('\n').map((_, i) => `${i + 1}\n`).join('')}
        </pre>
        <pre className="m-0 flex-1 px-2 py-1.5 text-[#d6d6d6] select-text whitespace-pre">
          <code>
            {tokens.map((token, i) => {
              const color = TOKEN_COLORS[token.kind];
              return color ? (
                <span key={i} style={{ color }}>
                  {token.text}
                </span>
              ) : (
                <React.Fragment key={i}>{token.text}</React.Fragment>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
};
