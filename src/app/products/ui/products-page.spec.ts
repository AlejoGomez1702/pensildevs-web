import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PRODUCT_CATALOG } from './product-catalog';
import { ProductsPage } from './products-page';

describe('Products page', () => {
  let page: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(ProductsPage);
    page = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('introduces the products with a single main heading', () => {
    expect(page.querySelectorAll('h1')).toHaveLength(1);
    expect(page.querySelector('h1')?.textContent).toContain('Productos');
  });

  it('shows a card per product, linking to its page', () => {
    const cards = page.querySelectorAll('app-product-card');
    expect(cards).toHaveLength(PRODUCT_CATALOG.length);

    PRODUCT_CATALOG.forEach((product, index) => {
      const card = cards[index] as HTMLElement;
      const link = card.querySelector<HTMLAnchorElement>(`a[href="/productos/${product.slug}"]`);
      expect(link?.textContent?.trim()).toBe(product.name);
      expect(card.textContent).toContain(product.tagline);
      expect(card.textContent).toContain(product.category);
    });
  });

  it('closes with a call to talk on WhatsApp', () => {
    const whatsApp = page.querySelector<HTMLAnchorElement>('a[href^="https://wa.me/"]');
    expect(whatsApp?.getAttribute('target')).toBe('_blank');
  });
});
