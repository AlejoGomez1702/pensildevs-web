import type { Result } from '../../shared/kernel/result';
import type { ContactRequest } from '../domain/contact-request';

export interface ContactChannelError {
  readonly kind: 'channel-blocked';
  /** Where the visitor can finish sending the request by hand. */
  readonly fallbackUrl: string;
}

/** Port: delivers a contact request to Pensil.Devs. */
export abstract class ContactChannel {
  abstract send(request: ContactRequest): Promise<Result<void, ContactChannelError>>;
}
