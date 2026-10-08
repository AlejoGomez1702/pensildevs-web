import type { Provider } from '@angular/core';
import { ContactChannel } from './application/contact-channel';
import { SendContactRequest } from './application/send-contact-request';
import { WhatsAppContactChannel } from './infrastructure/whatsapp-contact-channel';

/** Composition root of the contact module: wires ports to adapters. */
export function provideContact(): Provider[] {
  return [
    { provide: ContactChannel, useClass: WhatsAppContactChannel },
    {
      provide: SendContactRequest,
      useFactory: (channel: ContactChannel) => new SendContactRequest(channel),
      deps: [ContactChannel],
    },
  ];
}
