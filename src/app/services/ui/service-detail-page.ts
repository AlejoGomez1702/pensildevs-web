import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhatsAppLink } from '../../contact';
import { Icon } from '../../shared/ui/icon';
import { SectionHeading } from '../../shared/ui/section-heading';
import { DeliveryProcess } from './delivery-process';
import { findServiceOffering } from './service-offerings';

@Component({
  selector: 'app-service-detail-page',
  imports: [DeliveryProcess, Icon, RouterLink, SectionHeading, WhatsAppLink],
  templateUrl: './service-detail-page.html',
})
export class ServiceDetailPage {
  /** Route parameter `:slug`. */
  readonly slug = input.required<string>();

  protected readonly offering = computed(() => findServiceOffering(this.slug()));
  protected readonly quoteMessage = computed(
    () => `Hola, Pensil.Devs. Me interesa cotizar: ${this.offering()?.title ?? 'un servicio'}.`,
  );
}
