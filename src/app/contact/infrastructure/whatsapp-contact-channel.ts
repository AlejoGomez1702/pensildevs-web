import { DOCUMENT, inject, Injectable } from '@angular/core';
import { err, ok, type Result } from '../../shared/kernel/result';
import { ContactChannel, type ContactChannelError } from '../application/contact-channel';
import { companyWhatsAppUrl } from '../domain/company-contact';
import type { ContactRequest } from '../domain/contact-request';
import { contactRequestMessage } from '../domain/contact-request-message';

/** Delivers contact requests by opening a pre-filled WhatsApp conversation in a new tab. */
@Injectable()
export class WhatsAppContactChannel extends ContactChannel {
  private readonly window = inject(DOCUMENT).defaultView;

  send(request: ContactRequest): Promise<Result<void, ContactChannelError>> {
    const url = companyWhatsAppUrl(contactRequestMessage(request));
    // `noopener` in the features string would make `open` always return null, so the
    // opener is cut by hand to still detect blocked pop-ups.
    const opened = this.window?.open(url, '_blank');
    if (!opened) {
      return Promise.resolve(err({ kind: 'channel-blocked', fallbackUrl: url }));
    }
    opened.opener = null;
    return Promise.resolve(ok(undefined));
  }
}
