import { Component } from '@angular/core';
import { WhatsAppLink } from '../../contact';
import { PRODUCT_CATALOG } from './product-catalog';
import { ProductCard } from './product-card';

/** PROVISIONAL copy: review with Pensil.Devs before launch. */
@Component({
  selector: 'app-products-page',
  imports: [ProductCard, WhatsAppLink],
  template: `
    <section aria-labelledby="products-title" class="relative overflow-hidden">
      <div class="notebook-grid absolute inset-0 -z-10" aria-hidden="true"></div>
      <div class="container-page py-16 sm:py-24">
        <p class="eyebrow">Productos</p>
        <h1 id="products-title" class="mt-3 max-w-3xl text-4xl font-extrabold sm:text-6xl">
          Productos listos para <span class="scribble">usar mañana</span>
        </h1>
        <p class="mt-5 max-w-2xl text-lg text-ink-muted">
          Software que ya construimos y probamos con negocios reales. Lo configuramos con tus datos y
          tu equipo empieza a usarlo sin esperar un desarrollo.
        </p>
        <h2 class="sr-only">Nuestros productos</h2>
        <ul class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (product of products; track product.slug) {
            <li><app-product-card [product]="product" /></li>
          }
        </ul>
      </div>
    </section>

    <section aria-labelledby="products-cta-title" class="container-page py-16 sm:py-24">
      <div class="card flex flex-col items-start gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 id="products-cta-title" class="text-3xl font-bold">¿Buscas algo que no está aquí?</h2>
          <p class="mt-2 text-lg text-ink-muted">Cuéntanos qué necesitas y lo construimos a la medida.</p>
        </div>
        <app-whatsapp-link message="Hola, Pensil.Devs. Quiero saber qué producto le sirve a mi negocio." />
      </div>
    </section>
  `,
})
export class ProductsPage {
  protected readonly products = PRODUCT_CATALOG;
}
