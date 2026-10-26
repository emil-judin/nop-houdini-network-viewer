import packageJson from '../../package.json';

/** Web3Forms forwards each submission to the owner's email address, which never appears in the page. */
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/** Access key from the build environment; the feedback form only shows when it is set. */
export const FEEDBACK_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim() || null;

/**
 * One feedback message from the playground.
 */
export interface FeedbackMessage {
  /** The tester's text. */
  message: string;
  /** Optional name or email so the owner can reply. */
  contact: string;
  /** The network on screen (demo name or the loaded file name), for context. */
  network: string;
  /** Honeypot field: filled only by spam bots, which Web3Forms then rejects. */
  botcheck: boolean;
}

/**
 * Sends a feedback message by email through Web3Forms, with the WOP version, page address and
 * browser attached. Rejects with a readable `Error` when sending fails.
 */
export async function sendFeedback(feedback: FeedbackMessage): Promise<void> {
  if (!FEEDBACK_ACCESS_KEY) throw new Error('Feedback is not set up on this page.');
  const contact = feedback.contact.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

  let response: Response;
  try {
    response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: FEEDBACK_ACCESS_KEY,
        subject: `WOP feedback (${packageJson.version})`,
        from_name: 'WOP playground',
        // An email address becomes the reply-to address
        ...(isEmail ? { email: contact } : {}),
        message: feedback.message.trim(),
        contact: contact || '(not given)',
        network: feedback.network,
        version: packageJson.version,
        page: window.location.href,
        browser: navigator.userAgent,
        botcheck: feedback.botcheck,
      }),
    });
  } catch {
    throw new Error('Could not reach the feedback service. Check your connection and try again.');
  }

  const result = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
  if (!response.ok || !result?.success) {
    throw new Error(result?.message ? `Not sent: ${result.message}` : 'Not sent. Please try again in a moment.');
  }
}
