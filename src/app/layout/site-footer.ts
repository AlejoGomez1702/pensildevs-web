import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY_CONTACT, companyWhatsAppUrl } from '../contact';
import { PRODUCT_CATALOG } from '../products';
import { SERVICE_OFFERINGS } from '../services';
import { Logo } from '../shared/ui/logo';

@Component({
  selector: 'app-site-footer',
  imports: [Logo, RouterLink],
  host: { class: 'block bg-graphite text-on-graphite [--focus:var(--pencil)]', role: 'contentinfo' },
  template: `
    <div class="container-page grid gap-12 py-16 md:grid-cols-12">
      <div class="md:col-span-4">
        <a routerLink="/" aria-label="Pensil.Devs, ir al inicio" class="inline-block rounded-lg">
          <app-logo class="[&_.text-pencil-text]:text-pencil" />
        </a>
        <p class="mt-4 max-w-sm text-on-graphite/75">
          Productos y servicios de software que le simplifican la vida a las personas y a sus negocios.
        </p>
      </div>

      <nav aria-labelledby="footer-services" class="md:col-span-3">
        <h2 id="footer-services" class="font-sans text-base font-semibold text-leaf-bright">
          Servicios
        </h2>
        <ul class="mt-4 grid gap-2">
          @for (offering of offerings; track offering.slug) {
            <li>
              <a [routerLink]="['/servicios', offering.slug]" class="text-on-graphite/80 hover:text-on-graphite">
                {{ offering.title }}
              </a>
            </li>
          }
        </ul>
      </nav>

      <nav aria-labelledby="footer-products" class="md:col-span-2">
        <h2 id="footer-products" class="font-sans text-base font-semibold text-leaf-bright">
          Productos
        </h2>
        <ul class="mt-4 grid gap-2">
          @for (product of products; track product.slug) {
            <li>
              <a [routerLink]="['/productos', product.slug]" class="text-on-graphite/80 hover:text-on-graphite">
                {{ product.name }}
              </a>
            </li>
          }
          <li><a routerLink="/productos" class="text-on-graphite/80 hover:text-on-graphite">Ver todos los productos</a></li>
        </ul>
      </nav>

      <div class="md:col-span-3">
        <h2 class="font-sans text-base font-semibold text-leaf-bright">Escríbenos</h2>
        <ul class="mt-4 grid gap-2">
          <li><a routerLink="/contacto" class="text-on-graphite/80 hover:text-on-graphite">Contacto</a></li>
          <li>
            <a [href]="whatsAppUrl" target="_blank" rel="noopener" class="text-on-graphite/80 hover:text-on-graphite">
              WhatsApp<span class="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </li>
          <li>
            <a [href]="'mailto:' + email" class="break-words text-on-graphite/80 hover:text-on-graphite">{{ email }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10">
      <p class="container-page py-6 text-sm text-on-graphite/60">© {{ year }} Pensil.Devs. Todos los derechos reservados.</p>
    </div>
  `,
})
export class SiteFooter {
  protected readonly offerings = SERVICE_OFFERINGS;
  protected readonly products = PRODUCT_CATALOG;
  protected readonly email = COMPANY_CONTACT.email;
  protected readonly whatsAppUrl = companyWhatsAppUrl();
  protected readonly year = new Date().getFullYear();
}
