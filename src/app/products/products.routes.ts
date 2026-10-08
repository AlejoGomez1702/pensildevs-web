import type { Routes } from '@angular/router';
import { ROUTE_DESCRIPTION } from '../shared/infrastructure/seo-title-strategy';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: 'pensil-pos',
    title: 'Pensil.Pos, punto de venta',
    data: {
      [ROUTE_DESCRIPTION]:
        'Pensil.Pos: punto de venta con ventas rápidas, inventario al día, cortes de caja y reportes claros. Pide una demo.',
    },
    loadComponent: () => import('./ui/pensil-pos-page').then((m) => m.PensilPosPage),
  },
  {
    path: '',
    title: 'Productos',
    data: {
      [ROUTE_DESCRIPTION]:
        'Productos de software listos para tu negocio, como Pensil.Pos, el punto de venta que tu equipo aprende en una tarde.',
    },
    loadComponent: () => import('./ui/products-page').then((m) => m.ProductsPage),
  },
];
