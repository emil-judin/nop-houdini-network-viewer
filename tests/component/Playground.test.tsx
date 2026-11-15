// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

// The feedback key is read once, when `sendFeedback.ts` loads: each test sets it, then loads the
// playground modules again. `.env.local` may hold a real key, so `fetch` is always replaced.

beforeAll(() => {
  // jsdom has no modal dialogs
  HTMLDialogElement.prototype.showModal ??= function showModal(this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close ??= function close(this: HTMLDialogElement) {
    this.removeAttribute('open');
  };
});

let sent: Array<{ url: string; init: RequestInit }>;

beforeEach(() => {
  sent = [];
  window.localStorage.setItem('nop-playground-welcome-seen', '1');
  window.localStorage.setItem('nop-playground-embed-hint-seen', '1');
  vi.stubGlobal(
    'fetch',
    vi.fn((url: string, init: RequestInit) => {
      sent.push({ url, init });
      return Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
    }),
  );
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  window.localStorage.clear();
  window.history.replaceState(null, '', '/');
});

/** Loads the playground modules with this feedback key (an empty string: none). */
async function withFeedbackKey(key: string) {
  vi.stubEnv('VITE_WEB3FORMS_KEY', key);
  vi.resetModules();
  const [{ App }, { FeedbackDialog }] = await Promise.all([
    import('../../src/playground/App'),
    import('../../src/playground/FeedbackDialog'),
  ]);
  return { App, FeedbackDialog };
}

/** Renders the playground and opens its Networks pane (jsdom counts as a phone, so it starts folded). */
async function renderPlayground(key = '') {
  const { App } = await withFeedbackKey(key);
  render(<App />);
  fireEvent.click(await screen.findByRole('button', { name: 'Show networks panel' }));
  return screen.getByRole('complementary', { name: 'Networks' });
}

describe('playground', () => {
  it('NOP-PG-032: without an access key there is no Feedback button', async () => {
    const pane = await renderPlayground('');
    expect(pane.querySelector('button[title="How the playground works"]')).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Feedback' })).toBeNull();
  });

  it('NOP-PG-032: with an access key the Feedback button opens the form', async () => {
    await renderPlayground('test-key');
    fireEvent.click(screen.getByRole('button', { name: 'Feedback' }));
    expect(await screen.findByRole('textbox', { name: /What worked/ })).toBeTruthy();
  });

  it('NOP-PG-049: a file larger than 100 MB is refused before it is read', async () => {
    await renderPlayground();
    const file = new File(['{}'], 'huge-network.json', { type: 'application/json' });
    Object.defineProperty(file, 'size', { value: 101 * 1024 * 1024 });
    const read = vi.fn(() => Promise.resolve('{}'));
    Object.defineProperty(file, 'text', { value: read });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });
    expect((await screen.findByRole('alert')).textContent).toContain(
      'huge-network.json is larger than 100 MB, which is more than the viewer can show.',
    );
    expect(read).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: /huge-network\.json/ })).toBeNull();
  });
});

describe('feedback form', () => {
  /** The form of a page with a key, showing the network `networkName`. */
  async function renderForm(networkName = 'example: Start Here') {
    const { FeedbackDialog } = await withFeedbackKey('test-key');
    render(<FeedbackDialog open onClose={() => undefined} networkName={networkName} />);
    return {
      message: screen.getByRole('textbox', { name: /What worked/ }) as HTMLTextAreaElement,
      contact: screen.getByRole('textbox', { name: /Your name or email/ }) as HTMLInputElement,
      send: screen.getByRole('button', { name: 'Send' }) as HTMLButtonElement,
    };
  }

  const body = (index = 0) => JSON.parse(String(sent[index].init.body)) as Record<string, unknown>;

  it('NOP-PG-033: sends one message with its context, and a reply-to email', async () => {
    // A page address with a query that names a private file
    window.history.replaceState(null, '', '/?embed=true&src=https%3A%2F%2Fprivate.example%2Fsecret.json');
    const { message, contact, send } = await renderForm();
    fireEvent.change(message, { target: { value: '  The wires look great.  ' } });
    fireEvent.change(contact, { target: { value: 'tester@example.com' } });
    fireEvent.click(send);

    expect(await screen.findByText('Thank you, your feedback was sent.')).toBeTruthy();
    expect(sent).toHaveLength(1);
    expect(sent[0].url).toBe('https://api.web3forms.com/submit');
    expect(sent[0].init.method).toBe('POST');
    expect(body()).toEqual({
      access_key: 'test-key',
      subject: 'NOP feedback (0.0.0-test)',
      from_name: 'NOP playground',
      email: 'tester@example.com',
      message: 'The wires look great.',
      contact: 'tester@example.com',
      network: 'example: Start Here',
      version: '0.0.0-test',
      page: `${window.location.origin}/`,
      browser: navigator.userAgent,
      botcheck: false,
    });
    expect(String(sent[0].init.body)).not.toMatch(/secret|"nodes"|"root"/);
  });

  it('NOP-PG-033: a name that is not an email is sent without a reply-to address', async () => {
    const { message, contact, send } = await renderForm('own file: my_net-network.json');
    fireEvent.change(message, { target: { value: 'Hi' } });
    fireEvent.change(contact, { target: { value: 'Alex' } });
    fireEvent.click(send);
    await screen.findByText('Thank you, your feedback was sent.');
    expect(body()).not.toHaveProperty('email');
    expect(body()).toMatchObject({ contact: 'Alex', network: 'own file: my_net-network.json' });
  });

  it('NOP-PG-034: an unreachable service shows an alert and keeps the message', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('Failed to fetch'))));
    const { message, send } = await renderForm();
    fireEvent.change(message, { target: { value: 'Keep me' } });
    fireEvent.click(send);
    expect((await screen.findByRole('alert')).textContent).toBe(
      'Could not reach the feedback service. Check your connection and try again.',
    );
    expect(message.value).toBe('Keep me');
  });

  it('NOP-PG-034: a refused message shows the reason and keeps the message', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(new Response(JSON.stringify({ success: false, message: 'Invalid access key' }), { status: 400 }))),
    );
    const { message, send } = await renderForm();
    fireEvent.change(message, { target: { value: 'Keep me' } });
    fireEvent.click(send);
    expect((await screen.findByRole('alert')).textContent).toBe('Not sent: Invalid access key');
    expect(message.value).toBe('Keep me');
  });

  it('NOP-PG-034: an empty message cannot be sent, and messages are limited to 5000 characters', async () => {
    const { message, send } = await renderForm();
    expect(send.disabled).toBe(true);
    fireEvent.change(message, { target: { value: '   ' } });
    expect(send.disabled).toBe(true);
    fireEvent.submit(send.closest('form') as HTMLFormElement);
    await waitFor(() => expect(send.disabled).toBe(true));
    expect(sent).toHaveLength(0);
    expect(message.maxLength).toBe(5000);
  });

  it('NOP-PG-035: the spam honeypot is not visible, not focusable and hidden from screen readers', async () => {
    await renderForm();
    const honeypot = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(honeypot.tabIndex).toBe(-1);
    expect(honeypot.getAttribute('aria-hidden')).toBe('true');
    expect(honeypot.classList.contains('hidden')).toBe(true);
    expect(screen.queryByRole('checkbox')).toBeNull();
  });
});
