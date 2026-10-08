import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon';
import type { ProductSummary } from './product-catalog';

@Component({
  selector: 'app-product-card',
  imports: [Icon, RouterLink],
  host: { class: 'block h-full' },
  template: `
    <article
      class="card group relative flex h-full flex-col p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-leaf/50"
    >
      <span
        class="grid size-12 place-items-center rounded-2xl bg-leaf-soft text-leaf-text transition-colors group-hover:bg-pencil group-hover:text-on-pencil"
      >
        <app-icon [name]="product().icon" class="size-6" />
      </span>
      <p class="mt-5 text-sm font-semibold text-leaf-text">{{ product().category }}</p>
      <h3 class="mt-1 text-xl font-bold">
        <a
          [routerLink]="['/productos', product().slug]"
          class="after:absolute after:inset-0 after:rounded-[var(--radius-card)] focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-3 focus-visible:after:outline-focus"
        >
          {{ product().name }}
        </a>
      </h3>
      <p class="mt-2 grow text-ink-muted">{{ product().tagline }}</p>
      <p class="mt-5 inline-flex items-center gap-1 font-semibold" aria-hidden="true">
        Conocer el producto
        <app-icon name="arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
      </p>
    </article>
  `,
})
export class ProductCard {
  readonly product = input.required<ProductSummary>();
}
