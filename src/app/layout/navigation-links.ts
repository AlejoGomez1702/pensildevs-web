import { PRODUCT_CATALOG } from '../products';
import { SERVICE_OFFERINGS } from '../services';

export interface NavigationLink {
  readonly kind: 'link';
  readonly label: string;
  readonly path: string;
}

export interface NavigationMenuLink {
  readonly label: string;
  readonly description: string;
  readonly path: string;
}

/** A section of the site whose pages open from a submenu. */
export interface NavigationMenu {
  readonly kind: 'menu';
  readonly id: string;
  readonly label: string;
  readonly path: string;
  readonly links: readonly NavigationMenuLink[];
  readonly viewAll: { readonly label: string; readonly path: string };
}

export type NavigationItem = NavigationLink | NavigationMenu;

const PRODUCTS_PATH = '/productos';
const SERVICES_PATH = '/servicios';

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    kind: 'menu',
    id: 'products',
    label: 'Productos',
    path: PRODUCTS_PATH,
    links: PRODUCT_CATALOG.map((product) => ({
      label: product.name,
      description: product.tagline,
      path: `${PRODUCTS_PATH}/${product.slug}`,
    })),
    viewAll: { label: 'Ver todos los productos', path: PRODUCTS_PATH },
  },
  {
    kind: 'menu',
    id: 'services',
    label: 'Servicios',
    path: SERVICES_PATH,
    links: SERVICE_OFFERINGS.map((offering) => ({
      label: offering.title,
      description: offering.tagline,
      path: `${SERVICES_PATH}/${offering.slug}`,
    })),
    viewAll: { label: 'Ver todos los servicios', path: SERVICES_PATH },
  },
  { kind: 'link', label: 'Contacto', path: '/contacto' },
];
