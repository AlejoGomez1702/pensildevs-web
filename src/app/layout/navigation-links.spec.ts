import { PRODUCT_CATALOG } from '../products';
import { SERVICE_OFFERINGS } from '../services';
import { NAVIGATION_ITEMS, type NavigationMenu } from './navigation-links';

describe('Main navigation items', () => {
  const menu = (label: string) =>
    NAVIGATION_ITEMS.find((item): item is NavigationMenu => item.kind === 'menu' && item.label === label);

  it('offers Productos, Servicios and Contacto, in that order', () => {
    expect(NAVIGATION_ITEMS.map((item) => item.label)).toEqual(['Productos', 'Servicios', 'Contacto']);
  });

  it('lists every product of the catalog and a link to all of them', () => {
    const products = menu('Productos');

    expect(products?.path).toBe('/productos');
    expect(products?.links.map((link) => link.path)).toEqual(
      PRODUCT_CATALOG.map((product) => `/productos/${product.slug}`),
    );
    expect(products?.links[0]).toMatchObject({ label: 'Pensil.Pos', description: expect.any(String) });
    expect(products?.viewAll).toEqual({ label: 'Ver todos los productos', path: '/productos' });
  });

  it('lists every service offering and a link to all of them', () => {
    const services = menu('Servicios');

    expect(services?.path).toBe('/servicios');
    expect(services?.links).toEqual(
      SERVICE_OFFERINGS.map((offering) => ({
        label: offering.title,
        description: offering.tagline,
        path: `/servicios/${offering.slug}`,
      })),
    );
    expect(services?.viewAll).toEqual({ label: 'Ver todos los servicios', path: '/servicios' });
  });

  it('links Contacto directly to the contact page', () => {
    expect(NAVIGATION_ITEMS.at(-1)).toEqual({ kind: 'link', label: 'Contacto', path: '/contacto' });
  });
});
