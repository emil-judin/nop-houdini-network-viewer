/**
 * Checks the commit subjects of the current branch against NOP's naming rules (AGENTS.md section 5,
 * decision 0016): `type(area): summary`, Conventional Commits with NOP's areas as scope.
 *
 *   npm run lint:commits                 commits on this branch that are not on main
 *   node scripts/lint_commits.mjs <base> commits that are not on <base> (CI: origin/main)
 *
 * Errors (exit code 1): unknown type, no `: ` after the type, subject over 72 characters, a full
 * stop at the end, en or em dashes. Warnings only: an area outside the list (a new area is allowed,
 * but should be added to the list), an uppercase letter right after the colon (fine for names).
 * Merge commits are skipped. Plain Node, no dependencies.
 */
import { execFileSync } from 'node:child_process';

const TYPES = ['feat', 'fix', 'docs', 'test', 'refactor', 'perf', 'build', 'ci', 'chore', 'revert'];
const AREAS = [
  'viewer',
  'schema',
  'exporter',
  'embed',
  'playground',
  'examples',
  'icons',
  'brand',
  'docs',
  'tests',
  'ci',
  'deps',
  'release',
  'teaser',
];
const MAX_LENGTH = 72;
// En dash and em dash, built from their code points so this file contains neither
const LONG_DASHES = new RegExp(`[${String.fromCharCode(0x2013, 0x2014)}]`);
const SUBJECT = /^([a-z]+)(?:\(([a-z0-9-]+)\))?(!)?: (\S.*)$/;

const base = process.argv[2] ?? 'main';
let log;
try {
  log = execFileSync('git', ['log', '--no-merges', '--format=%h %s', `${base}..HEAD`], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
} catch {
  console.error(`lint:commits: cannot compare with "${base}". Fetch it first or name another base.`);
  process.exit(2);
}

const commits = log
  .split('\n')
  .filter(Boolean)
  .map((line) => ({ hash: line.slice(0, line.indexOf(' ')), subject: line.slice(line.indexOf(' ') + 1) }));

let errors = 0;
let warnings = 0;
for (const { hash, subject } of commits) {
  const problems = [];
  const notes = [];
  const match = SUBJECT.exec(subject);
  if (!match) {
    problems.push('expected "type(area): summary", for example "fix(viewer): fit frames node names"');
  } else {
    const [, type, area, , summary] = match;
    if (!TYPES.includes(type)) problems.push(`unknown type "${type}" (${TYPES.join(', ')})`);
    if (area && !AREAS.includes(area)) notes.push(`area "${area}" is not in the list (${AREAS.join(', ')})`);
    if (/^[A-Z][a-z]/.test(summary)) notes.push('lowercase after the colon, unless a name follows');
  }
  if (subject.length > MAX_LENGTH) problems.push(`${subject.length} characters, at most ${MAX_LENGTH}`);
  if (subject.endsWith('.')) problems.push('no full stop at the end');
  if (LONG_DASHES.test(subject)) problems.push('no en or em dashes');

  if (problems.length || notes.length) console.log(`${hash} ${subject}`);
  for (const problem of problems) console.log(`  error: ${problem}`);
  for (const note of notes) console.log(`  warning: ${note}`);
  errors += problems.length ? 1 : 0;
  warnings += notes.length ? 1 : 0;
}

console.log(
  `lint:commits: ${commits.length} commit(s) since ${base}, ${errors} with errors, ${warnings} with warnings.`,
);
process.exit(errors ? 1 : 0);
