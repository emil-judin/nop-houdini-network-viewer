import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { TOUCH_TARGET } from '../components/hud/touchTarget';
import { PlaygroundDialog } from './PlaygroundDialog';
import { sendFeedback } from './sendFeedback';

type SendState = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

/**
 * Props for the playground's feedback dialog (`FeedbackDialog`).
 */
export interface FeedbackDialogProps {
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the dialog closes. */
  onClose: () => void;
  /** The network on screen (demo name or loaded file name), sent along for context. */
  networkName: string;
}

const FIELD = 'w-full px-2 rounded-[3px] border border-transparent bg-[#434343] text-base sm:text-[13px] text-white focus:outline-none focus:border-[#7082b9]';

/**
 * Feedback form for testers: the message goes straight to the owner's email (see `sendFeedback`).
 */
export const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ open, onClose, networkName }) => {
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [botcheck, setBotcheck] = useState(false);
  const [state, setState] = useState<SendState>({ kind: 'idle' });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim() || state.kind === 'sending') return;
    setState({ kind: 'sending' });
    try {
      await sendFeedback({ message, contact, network: networkName, botcheck });
      setMessage('');
      setState({ kind: 'sent' });
    } catch (error) {
      setState({ kind: 'error', message: error instanceof Error ? error.message : 'Not sent. Please try again.' });
    }
  };

  return (
    <PlaygroundDialog open={open} onClose={onClose} title="Send feedback" maxWidthPx={520}>
      {state.kind === 'sent' ? (
        <div className="px-4 py-4 space-y-3 text-[13px]">
          <p className="text-[#dddddd]">Thank you, your feedback was sent.</p>
          <button
            type="button"
            onClick={() => setState({ kind: 'idle' })}
            className={`h-8 px-3 rounded-[3px] bg-[#474e62] hover:bg-[#535b72] text-white cursor-pointer ${TOUCH_TARGET}`}
          >
            Write another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="overflow-y-auto px-4 py-3 space-y-3 text-[13px]">
          <label className="flex flex-col gap-1">
            <span className="text-[#d2dcfb]">What worked, what broke, what is missing?</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              maxLength={5000}
              className={`${FIELD} py-1.5 resize-y min-h-28`}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[#d2dcfb]">Your name or email (optional, so I can reply)</span>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              maxLength={200}
              autoComplete="email"
              className={`${FIELD} h-9`}
            />
          </label>
          {/* Honeypot for spam bots, hidden from people and screen readers */}
          <input
            type="checkbox"
            tabIndex={-1}
            aria-hidden="true"
            checked={botcheck}
            onChange={(e) => setBotcheck(e.target.checked)}
            className="hidden"
          />
          <p className="text-[12px] text-[#9a9a9a]">
            Sent along: the NOP version, your browser, the page address (without its query) and the network on
            screen ({networkName}). Your network file itself is not sent. The message is delivered by email through
            Web3Forms.
          </p>
          {state.kind === 'error' && (
            <p role="alert" className="text-[#f0c8c8]">
              {state.message}
            </p>
          )}
          <button
            type="submit"
            disabled={!message.trim() || state.kind === 'sending'}
            className={`flex items-center gap-1.5 h-8 px-3 rounded-[3px] bg-[#474e62] hover:bg-[#535b72] disabled:opacity-50 disabled:cursor-default text-white font-bold cursor-pointer ${TOUCH_TARGET}`}
          >
            <Send className="w-3.5 h-3.5" />
            {state.kind === 'sending' ? 'Sending…' : 'Send'}
          </button>
        </form>
      )}
    </PlaygroundDialog>
  );
};
