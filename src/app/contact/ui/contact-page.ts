import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { PENSIL_POS } from '../../products';
import { SERVICE_OFFERINGS } from '../../services';
import { Icon } from '../../shared/ui/icon';
import { SendContactRequest } from '../application/send-contact-request';
import { COMPANY_CONTACT } from '../domain/company-contact';
import { MESSAGE_MAX_LENGTH } from '../domain/contact-request';
import {
  contactFormSchema,
  EMPTY_CONTACT_FORM,
  focusFirstInvalidField,
  type ContactFormModel,
} from './contact-form.schema';
import { WhatsAppLink } from './whatsapp-link';

interface InterestOption {
  readonly slug: string;
  readonly label: string;
}

const OTHER_INTEREST = 'Otro';

const INTEREST_OPTIONS: readonly InterestOption[] = [
  { slug: PENSIL_POS.slug, label: PENSIL_POS.name },
  ...SERVICE_OFFERINGS.map(({ slug, title }) => ({ slug, label: title })),
  { slug: 'otro', label: OTHER_INTEREST },
];

type SendOutcome =
  | { readonly status: 'idle' }
  | { readonly status: 'sent' }
  | { readonly status: 'blocked'; readonly fallbackUrl: string }
  | { readonly status: 'failed' };

@Component({
  selector: 'app-contact-page',
  imports: [FormRoot, FormField, Icon, WhatsAppLink],
  templateUrl: './contact-page.html',
})
export class ContactPage {
  private readonly sendContactRequest = inject(SendContactRequest);

  /** Slug from `?interest=`, set by the calls to action that link here. */
  readonly interest = input<string>();

  protected readonly interestOptions = INTEREST_OPTIONS;
  protected readonly companyEmail = COMPANY_CONTACT.email;
  protected readonly messageMaxLength = MESSAGE_MAX_LENGTH;
  protected readonly outcome = signal<SendOutcome>({ status: 'idle' });

  protected readonly model = linkedSignal<ContactFormModel>(() => ({
    ...EMPTY_CONTACT_FORM,
    interest: INTEREST_OPTIONS.find(({ slug }) => slug === this.interest())?.label ?? '',
  }));

  protected readonly contactForm = form(this.model, contactFormSchema, {
    submission: {
      action: async () => {
        await this.sendToPensilDevs();
        return undefined;
      },
      onInvalid: (contactForm) => focusFirstInvalidField(contactForm),
    },
  });

  protected readonly messageLength = computed(() => this.contactForm.message().value().length);

  private async sendToPensilDevs(): Promise<void> {
    const result = await this.sendContactRequest.execute(this.model());
    if (result.ok) {
      this.outcome.set({ status: 'sent' });
      this.contactForm().reset({ ...EMPTY_CONTACT_FORM });
      return;
    }
    this.outcome.set(
      result.error.kind === 'channel-blocked'
        ? { status: 'blocked', fallbackUrl: result.error.fallbackUrl }
        : { status: 'failed' },
    );
  }
}
