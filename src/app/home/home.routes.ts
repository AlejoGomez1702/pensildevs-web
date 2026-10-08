import type { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/home-page').then((m) => m.HomePage),
  },
];
