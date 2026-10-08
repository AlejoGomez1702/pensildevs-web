import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon';
import type { ServiceOffering } from './service-offerings';

@Component({
  selector: 'app-service-card',
  imports: [Icon, RouterLink],
  host: { class: 'block h-full' },
  template: `
    <article
      class="card group relative flex h-full flex-col p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-ink/40"
    >
      <span
        class="grid size-12 place-items-center rounded-2xl bg-paper-sunken text-ink transition-colors group-hover:bg-pencil group-hover:text-on-pencil"
      >
        <app-icon [name]="offering().icon" class="size-6" />
      </span>
      <h3 class="mt-5 text-xl font-bold">
        <a
          [routerLink]="['/servicios', offering().slug]"
          class="after:absolute after:inset-0 after:rounded-[var(--radius-card)] focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-3 focus-visible:after:outline-focus"
        >
          {{ offering().title }}
        </a>
      </h3>
      <p class="mt-2 grow text-ink-muted">{{ offering().tagline }}</p>
      <p class="mt-5 inline-flex items-center gap-1 font-semibold" aria-hidden="true">
        Ver detalle
        <app-icon name="arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
      </p>
    </article>
  `,
})
export class ServiceCard {
  readonly offering = input.required<ServiceOffering>();
}
