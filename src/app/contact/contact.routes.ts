import type { Routes } from '@angular/router';
import { ROUTE_DESCRIPTION } from '../shared/infrastructure/seo-title-strategy';
import { provideContact } from './contact.providers';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    title: 'Contacto',
    data: {
      [ROUTE_DESCRIPTION]:
        'Escríbenos por WhatsApp o con el formulario y cuéntanos qué necesita tu negocio. Te respondemos con una propuesta clara.',
    },
    providers: [provideContact()],
    loadComponent: () => import('./ui/contact-page').then((m) => m.ContactPage),
  },
];
