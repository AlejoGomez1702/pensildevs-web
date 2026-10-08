import { Component } from '@angular/core';
import { WhatsAppLink } from '../../contact';
import { SectionHeading } from '../../shared/ui/section-heading';
import { DeliveryProcess } from './delivery-process';
import { ServiceCard } from './service-card';
import { SERVICE_OFFERINGS } from './service-offerings';

@Component({
  selector: 'app-services-page',
  imports: [DeliveryProcess, SectionHeading, ServiceCard, WhatsAppLink],
  template: `
    <section aria-labelledby="services-title" class="relative overflow-hidden">
      <div class="notebook-grid absolute inset-0 -z-10" aria-hidden="true"></div>
      <div class="container-page py-16 sm:py-24">
        <p class="eyebrow">Servicios</p>
        <h1 id="services-title" class="mt-3 max-w-3xl text-4xl font-extrabold sm:text-6xl">
          Tecnología a la medida de <span class="scribble">tu negocio</span>
        </h1>
        <p class="mt-5 max-w-2xl text-lg text-ink-muted">
          Desde una tienda en línea hasta automatizar lo que hoy haces a mano. Elige por dónde
          empezar; nosotros te ayudamos a definir el resto.
        </p>
        <h2 class="sr-only">Nuestros servicios</h2>
        <ul class="mt-14 grid gap-6 sm:grid-cols-2">
          @for (offering of offerings; track offering.slug) {
            <li><app-service-card [offering]="offering" /></li>
          }
        </ul>
      </div>
    </section>

    <section aria-labelledby="services-process-title" class="bg-paper-sunken py-16 sm:py-24">
      <div class="container-page">
        <app-section-heading
          headingId="services-process-title"
          eyebrow="Cómo trabajamos"
          title="Del boceto al producto"
          intro="Un proceso claro, con avances que puedes ver desde la primera semana."
        />
        <app-delivery-process class="mt-12 block" />
      </div>
    </section>

    <section aria-labelledby="services-cta-title" class="container-page py-16 sm:py-24">
      <div class="card flex flex-col items-start gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 id="services-cta-title" class="text-3xl font-bold">¿No sabes cuál elegir?</h2>
          <p class="mt-2 text-lg text-ink-muted">Cuéntanos tu problema y te recomendamos el camino más simple.</p>
        </div>
        <app-whatsapp-link message="Hola, Pensil.Devs. Quiero orientación para elegir un servicio." />
      </div>
    </section>
  `,
})
export class ServicesPage {
  protected readonly offerings = SERVICE_OFFERINGS;
}
