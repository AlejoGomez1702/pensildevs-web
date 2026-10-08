import { Component, computed, input } from '@angular/core';
import { Icon } from '../../shared/ui/icon';
import { companyWhatsAppUrl } from '../domain/company-contact';

type WhatsAppLinkAppearance = 'primary' | 'secondary' | 'on-dark';

const APPEARANCE_CLASS: Record<WhatsAppLinkAppearance, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  'on-dark': 'btn-on-dark',
};

/** Call to action that opens a WhatsApp conversation with Pensil.Devs in a new tab. */
@Component({
  selector: 'app-whatsapp-link',
  imports: [Icon],
  // The link itself is the layout item, so stacked buttons stretch like their siblings.
  host: { class: 'contents' },
  template: `
    <a
      [href]="href()"
      target="_blank"
      rel="noopener"
      [class]="appearanceClass()"
    >
      <app-icon name="chat" class="size-5" />
      <ng-content>Platiquemos por WhatsApp</ng-content>
      <span class="sr-only">(se abre en una pestaña nueva)</span>
    </a>
  `,
})
export class WhatsAppLink {
  /** Message pre-filled in the conversation, so Pensil.Devs knows the context. */
  readonly message = input<string>();
  readonly appearance = input<WhatsAppLinkAppearance>('primary');

  protected readonly href = computed(() => companyWhatsAppUrl(this.message()));
  protected readonly appearanceClass = computed(() => APPEARANCE_CLASS[this.appearance()]);
}
