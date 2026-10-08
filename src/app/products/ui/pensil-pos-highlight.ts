import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhatsAppLink } from '../../contact';
import { Icon } from '../../shared/ui/icon';
import { PENSIL_POS } from './pensil-pos.content';
import { PosPreview } from './pos-preview';

const HIGHLIGHTED_FEATURES = 3;

/** Home page band presenting Pensil.Pos as the flagship product. */
@Component({
  selector: 'app-pensil-pos-highlight',
  imports: [Icon, PosPreview, RouterLink, WhatsAppLink],
  host: { class: 'block' },
  template: `
    <section
      aria-labelledby="pensil-pos-highlight-title"
      class="overflow-hidden rounded-[2rem] bg-graphite text-on-graphite [--focus:var(--pencil)]"
    >
      <div class="grid items-center gap-12 p-8 pb-16 sm:p-12 sm:pb-20 lg:grid-cols-2 lg:p-16 lg:pb-20">
        <div>
          <p class="text-base font-semibold text-leaf-bright">Nuestro producto</p>
          <h2 id="pensil-pos-highlight-title" class="mt-3 text-4xl font-extrabold sm:text-5xl">
            {{ product.name }}
          </h2>
          <p class="mt-4 text-xl text-on-graphite/85">{{ product.tagline }}</p>
          <ul class="mt-8 grid gap-4">
            @for (feature of features; track feature.title) {
              <li class="flex gap-3">
                <span class="grid size-9 shrink-0 place-items-center rounded-xl bg-pencil text-on-pencil">
                  <app-icon [name]="feature.icon" class="size-5" />
                </span>
                <span>
                  <strong class="block">{{ feature.title }}</strong>
                  <span class="text-on-graphite/75">{{ feature.description }}</span>
                </span>
              </li>
            }
          </ul>
          <div class="mt-10 flex flex-col gap-3 sm:flex-row">
            <a routerLink="/productos/pensil-pos" class="btn-primary">
              Conocer {{ product.name }}
              <app-icon name="arrow-right" class="size-5" />
            </a>
            <app-whatsapp-link appearance="on-dark" message="Hola, Pensil.Devs. Quiero una demo de Pensil.Pos.">
              Pedir una demo
            </app-whatsapp-link>
          </div>
        </div>
        <app-pos-preview class="lg:pl-6" />
      </div>
    </section>
  `,
})
export class PensilPosHighlight {
  protected readonly product = PENSIL_POS;
  protected readonly features = PENSIL_POS.features.slice(0, HIGHLIGHTED_FEATURES);
}
