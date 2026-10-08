import type { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.routes').then((m) => m.HOME_ROUTES) },
  {
    path: 'servicios',
    loadChildren: () => import('./services/services.routes').then((m) => m.SERVICES_ROUTES),
  },
  {
    path: 'productos',
    loadChildren: () => import('./products/products.routes').then((m) => m.PRODUCTS_ROUTES),
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contact/contact.routes').then((m) => m.CONTACT_ROUTES),
  },
  {
    path: '**',
    title: 'Página no encontrada',
    loadComponent: () => import('./layout/not-found-page').then((m) => m.NotFoundPage),
  },
];
