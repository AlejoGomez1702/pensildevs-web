import { err, type Result } from '../../shared/kernel/result';
import {
  createContactRequest,
  type ContactRequestError,
  type ContactRequestInput,
} from '../domain/contact-request';
import type { ContactChannel, ContactChannelError } from './contact-channel';

export type SendContactRequestError =
  | { readonly kind: 'invalid'; readonly errors: readonly ContactRequestError[] }
  | ContactChannelError;

export class SendContactRequest {
  constructor(private readonly channel: ContactChannel) {}

  async execute(input: ContactRequestInput): Promise<Result<void, SendContactRequestError>> {
    const request = createContactRequest(input);
    if (!request.ok) {
      return err({ kind: 'invalid', errors: request.error });
    }
    return this.channel.send(request.value);
  }
}
