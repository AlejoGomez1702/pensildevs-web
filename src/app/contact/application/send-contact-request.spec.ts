import { describe, expect, it } from 'vitest';
import { err, ok, type Result } from '../../shared/kernel/result';
import type { ContactRequest, ContactRequestInput } from '../domain/contact-request';
import { ContactChannel, type ContactChannelError } from './contact-channel';
import { SendContactRequest } from './send-contact-request';

class InMemoryContactChannel extends ContactChannel {
  readonly sent: ContactRequest[] = [];
  blocked = false;

  send(request: ContactRequest): Promise<Result<void, ContactChannelError>> {
    if (this.blocked) {
      return Promise.resolve(err({ kind: 'channel-blocked', fallbackUrl: 'https://wa.me/1' }));
    }
    this.sent.push(request);
    return Promise.resolve(ok(undefined));
  }
}

const validInput: ContactRequestInput = {
  name: 'Ana López',
  email: 'ana@negocio.mx',
  interest: '',
  message: 'Quiero automatizar mis avisos.',
};

describe('Send contact request', () => {
  it('delivers a valid request through the contact channel', async () => {
    const channel = new InMemoryContactChannel();

    const result = await new SendContactRequest(channel).execute(validInput);

    expect(result.ok).toBe(true);
    expect(channel.sent).toHaveLength(1);
    expect(channel.sent[0]?.name).toBe('Ana López');
  });

  it('does not deliver an invalid request and explains why', async () => {
    const channel = new InMemoryContactChannel();

    const result = await new SendContactRequest(channel).execute({ ...validInput, email: 'x' });

    expect(result).toEqual({ ok: false, error: { kind: 'invalid', errors: ['email-invalid'] } });
    expect(channel.sent).toHaveLength(0);
  });

  it('reports a blocked channel with a link to finish manually', async () => {
    const channel = new InMemoryContactChannel();
    channel.blocked = true;

    const result = await new SendContactRequest(channel).execute(validInput);

    expect(result).toEqual({
      ok: false,
      error: { kind: 'channel-blocked', fallbackUrl: 'https://wa.me/1' },
    });
  });
});
