import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PRODUCT_CATALOG } from '../products';
import { SiteFooter } from './site-footer';

describe('Site footer', () => {
  let footer: HTMLElement;

  const column = (title: string) =>
    Array.from(footer.querySelectorAll('nav')).find(
      (nav) => nav.querySelector('h2')?.textContent?.trim() === title,
    );

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(SiteFooter);
    footer = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('links every product of the catalog and the products page', () => {
    const products = column('Productos');

    PRODUCT_CATALOG.forEach((product) => {
      expect(products?.querySelector(`a[href="/productos/${product.slug}"]`)?.textContent?.trim()).toBe(
        product.name,
      );
    });
    expect(products?.querySelector('a[href="/productos"]')?.textContent?.trim()).toBe('Ver todos los productos');
  });

  it('links every service and the contact page', () => {
    expect(column('Servicios')?.querySelectorAll('a[href^="/servicios/"]')).toHaveLength(4);
    expect(footer.querySelector('a[href="/contacto"]')).not.toBeNull();
  });
});
