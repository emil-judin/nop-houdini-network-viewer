import type { CodeLanguage } from './parmModel';

/**
 * Token categories produced by the code highlighter.
 */
export type CodeTokenKind =
  | 'plain'
  | 'comment'
  | 'string'
  | 'number'
  | 'keyword'
  | 'type'
  | 'attribute'
  | 'function'
  | 'preprocessor'
  | 'constant';

/**
 * One highlighted piece of source text.
 */
export interface CodeToken {
  /** Source text of the token (concatenating all tokens gives back the original code). */
  text: string;
  /** Token category used to pick the color. */
  kind: CodeTokenKind;
}

const VEX_KEYWORDS = new Set([
  'if', 'else', 'for', 'foreach', 'while', 'do', 'break', 'continue', 'return', 'function',
  'export', 'const', 'struct', 'import', 'forpoints', 'illuminance', 'gather', '__kernel', 'kernel',
  'global', 'local', 'constant', 'private', 'typedef', 'switch', 'case', 'default',
]);

const VEX_TYPES = new Set([
  'int', 'float', 'vector', 'vector2', 'vector4', 'matrix', 'matrix2', 'matrix3', 'string',
  'dict', 'bsdf', 'void', 'float2', 'float3', 'float4', 'int2', 'int3', 'int4', 'uint', 'half',
  'char', 'double', 'long', 'bool',
]);

const PYTHON_KEYWORDS = new Set([
  'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif',
  'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda',
  'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
]);

const PYTHON_CONSTANTS = new Set(['True', 'False', 'None', 'self']);

/**
 * Ordered scanning rules. Each pattern is anchored with the sticky flag and tried at the
 * current position; the first match wins. Anything unmatched becomes a `plain` character.
 */
interface ScanRule {
  pattern: RegExp;
  kind: CodeTokenKind | 'word';
}

const VEX_RULES: ScanRule[] = [
  { pattern: /\/\/[^\n]*/y, kind: 'comment' },
  { pattern: /\/\*[\s\S]*?(?:\*\/|$)/y, kind: 'comment' },
  { pattern: /"(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?/y, kind: 'string' },
  { pattern: /#[ \t]*[a-zA-Z]+/y, kind: 'preprocessor' },
  // Geometry attribute bindings: @P, @ptnum, v@N, i[]@ids, s@name
  { pattern: /(?:[fuvpi234sdm]|\[\]|[fuvpi234sdm]\[\])?@[A-Za-z_][A-Za-z0-9_]*/y, kind: 'attribute' },
  { pattern: /(?:\d+\.\d*|\.\d+|\d+)(?:[eE][+-]?\d+)?[fF]?/y, kind: 'number' },
  { pattern: /[A-Za-z_][A-Za-z0-9_]*/y, kind: 'word' },
];

const PYTHON_RULES: ScanRule[] = [
  { pattern: /#[^\n]*/y, kind: 'comment' },
  { pattern: /(?:[rRbBuUfF]{0,2})("""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$))/y, kind: 'string' },
  { pattern: /(?:[rRbBuUfF]{0,2})("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?)/y, kind: 'string' },
  { pattern: /@[A-Za-z_][A-Za-z0-9_.]*/y, kind: 'preprocessor' },
  { pattern: /(?:\d+\.\d*|\.\d+|\d+)(?:[eE][+-]?\d+)?[jJ]?/y, kind: 'number' },
  { pattern: /[A-Za-z_][A-Za-z0-9_]*/y, kind: 'word' },
];

/**
 * Classifies an identifier: keyword, type, constant, function call or plain name.
 */
function classifyWord(word: string, language: CodeLanguage, nextChar: string): CodeTokenKind {
  if (language === 'vex') {
    if (VEX_KEYWORDS.has(word)) return 'keyword';
    if (VEX_TYPES.has(word)) return 'type';
  } else if (language === 'python') {
    if (PYTHON_KEYWORDS.has(word)) return 'keyword';
    if (PYTHON_CONSTANTS.has(word)) return 'constant';
  }
  return nextChar === '(' ? 'function' : 'plain';
}

/**
 * Splits source code into highlighted tokens for VEX (also used for OpenCL) or Python.
 * `text` returns the whole input as one plain token.
 *
 * This is a lightweight lexer for display only: it never evaluates or validates the code.
 */
export function highlightCode(code: string, language: CodeLanguage): CodeToken[] {
  if (language === 'text') {
    return [{ text: code, kind: 'plain' }];
  }
  const rules = language === 'python' ? PYTHON_RULES : VEX_RULES;
  const tokens: CodeToken[] = [];
  const push = (text: string, kind: CodeTokenKind) => {
    const last = tokens[tokens.length - 1];
    if (last && last.kind === kind) {
      last.text += text;
    } else {
      tokens.push({ text, kind });
    }
  };

  // Finds the next non-space character after a word without copying the rest of the code (a slice
  // per word made highlighting quadratic and froze the tab on long generated snippets)
  const nextNonSpace = /\s*(.)/sy;

  let index = 0;
  while (index < code.length) {
    let matched = false;
    for (const rule of rules) {
      rule.pattern.lastIndex = index;
      const match = rule.pattern.exec(code);
      if (!match || match[0].length === 0) continue;
      const text = match[0];
      if (rule.kind === 'word') {
        nextNonSpace.lastIndex = index + text.length;
        const nextChar = nextNonSpace.exec(code)?.[1] ?? '';
        push(text, classifyWord(text, language, nextChar));
      } else {
        push(text, rule.kind);
      }
      index += text.length;
      matched = true;
      break;
    }
    if (!matched) {
      push(code[index], 'plain');
      index += 1;
    }
  }
  return tokens;
}
