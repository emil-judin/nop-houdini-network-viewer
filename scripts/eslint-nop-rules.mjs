// NOP's own ESLint rules, loaded by eslint.config.js. Each one turns a rule from AGENTS.md that was
// only written down into a check that fails `npm run lint`.

/** Words that mark a comment as explaining a shortcut instead of fixing its cause. */
const WORKAROUND_WORDS = /\b(workaround|hack|hacky|for now|temporary|temporarily|quick fix|fixme|todo|xxx)\b/i;

/** A link to the GitHub issue that tracks the real fix: `#123` or an issue URL. */
const ISSUE_LINK = /#\d+|\/issues\/\d+/;

/**
 * Flags comments that justify a workaround without linking the issue that tracks its real fix.
 * Coding agents copy the code around them, and a comment that explains why a shortcut is fine
 * teaches the next agent to repeat it. Fix the cause, or link the issue so the shortcut has an end.
 */
const noUnlinkedWorkaround = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Require an issue link in comments that describe a workaround' },
    schema: [],
    messages: {
      unlinked:
        'This comment describes a workaround ("{{word}}"). Fix the cause, or link the GitHub issue that tracks the fix (#123): agents copy explained shortcuts.',
    },
  },
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          const match = WORKAROUND_WORDS.exec(comment.value);
          if (match && !ISSUE_LINK.test(comment.value)) {
            context.report({ loc: comment.loc, messageId: 'unlinked', data: { word: match[1] } });
          }
        }
      },
    };
  },
};

export default {
  meta: { name: 'eslint-plugin-nop' },
  rules: { 'no-unlinked-workaround': noUnlinkedWorkaround },
};
