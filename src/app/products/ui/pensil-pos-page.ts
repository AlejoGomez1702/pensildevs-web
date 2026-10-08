import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhatsAppLink } from '../../contact';
import { Icon } from '../../shared/ui/icon';
import { SectionHeading } from '../../shared/ui/section-heading';
import { PENSIL_POS } from './pensil-pos.content';
import { PosPreview } from './pos-preview';

const DEMO_MESSAGE = 'Hola, Pensil.Devs. Quiero una demo de Pensil.Pos para mi negocio.';

@Component({
  selector: 'app-pensil-pos-page',
  imports: [Icon, PosPreview, RouterLink, SectionHeading, WhatsAppLink],
  template: `
    <section aria-labelledby="pensil-pos-title" class="relative overflow-hidden">
      <div class="notebook-grid absolute inset-0 -z-10" aria-hidden="true"></div>
      <div class="container-page grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <p class="eyebrow">Punto de venta</p>
          <h1 id="pensil-pos-title" class="mt-3 text-5xl font-extrabold sm:text-6xl">{{ product.name }}</h1>
          <p class="mt-5 text-2xl font-semibold text-balance">
            El punto de venta que tu equipo <span class="scribble">aprende en una tarde</span>.
          </p>
          <p class="mt-4 max-w-xl text-lg text-ink-muted">{{ product.summary }}</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <app-whatsapp-link [message]="demoMessage">Pedir una demo</app-whatsapp-link>
            <a href="#funciones" class="btn-secondary">Ver funciones</a>
          </div>
        </div>
        <app-pos-preview />
      </div>
    </section>

    <section id="funciones" aria-labelledby="pos-features-title" class="container-page scroll-mt-24 py-16 sm:py-24">
      <app-section-heading
        headingId="pos-features-title"
        eyebrow="Funciones"
        title="Todo lo que necesitas para vender, nada que estorbe"
        intro="Pensado para el mostrador: pantallas claras, botones grandes y lo importante siempre a la vista."
      />
      <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @for (feature of product.features; track feature.title) {
          <li class="card p-6">
            <span class="grid size-12 place-items-center rounded-2xl bg-pencil text-on-pencil">
              <app-icon [name]="feature.icon" class="size-6" />
            </span>
            <h3 class="mt-5 text-xl font-bold">{{ feature.title }}</h3>
            <p class="mt-2 text-ink-muted">{{ feature.description }}</p>
          </li>
        }
      </ul>
    </section>

    <section aria-labelledby="pos-audience-title" class="bg-paper-sunken py-16 sm:py-24">
      <div class="container-page grid gap-12 lg:grid-cols-2">
        <div>
          <app-section-heading
            headingId="pos-audience-title"
            eyebrow="Para quién"
            title="Hecho para negocios con mostrador"
            intro="Si cobras a clientes todos los días y quieres saber cuánto vendes sin hacer cuentas a mano, Pensil.Pos es para ti."
          />
          <ul class="mt-8 flex flex-wrap gap-3">
            @for (audience of product.audiences; track audience) {
              <li class="rounded-full border border-line bg-paper-raised px-4 py-2 font-medium">{{ audience }}</li>
            }
          </ul>
        </div>
        <div>
          <h3 class="text-2xl font-bold">Empezar es sencillo</h3>
          <ol class="mt-6 grid gap-5">
            @for (step of product.onboarding; track step.title; let index = $index) {
              <li class="flex gap-4">
                <span class="step-dot size-9 text-base">{{ index + 1 }}</span>
                <div>
                  <p class="font-semibold">{{ step.title }}</p>
                  <p class="text-ink-muted">{{ step.description }}</p>
                </div>
              </li>
            }
          </ol>
        </div>
      </div>
    </section>

    <section aria-labelledby="pos-cta-title" class="container-page py-16 sm:py-24">
      <div class="card flex flex-col items-start gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 id="pos-cta-title" class="text-3xl font-bold">¿Lo vemos funcionando con tus productos?</h2>
          <p class="mt-2 text-lg text-ink-muted">Agenda una demo de 30 minutos, sin compromiso.</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row">
          <app-whatsapp-link [message]="demoMessage">Pedir una demo</app-whatsapp-link>
          <a [routerLink]="['/contacto']" [queryParams]="{ interest: product.slug }" class="btn-secondary">
            Prefiero el formulario
          </a>
        </div>
      </div>
    </section>
  `,
})
export class PensilPosPage {
  protected readonly product = PENSIL_POS;
  protected readonly demoMessage = DEMO_MESSAGE;
}
