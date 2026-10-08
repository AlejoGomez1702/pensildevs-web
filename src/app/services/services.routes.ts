import type { ResolveFn, Routes } from '@angular/router';
import { ROUTE_DESCRIPTION } from '../shared/infrastructure/seo-title-strategy';
import { findServiceOffering } from './ui/service-offerings';

const offeringFor = (route: Parameters<ResolveFn<unknown>>[0]) =>
  findServiceOffering(route.paramMap.get('slug') ?? '');

const serviceTitle: ResolveFn<string> = (route) =>
  offeringFor(route)?.title ?? 'Servicio no encontrado';

const serviceDescription: ResolveFn<string | undefined> = (route) => offeringFor(route)?.summary;

export const SERVICES_ROUTES: Routes = [
  {
    path: '',
    title: 'Servicios',
    data: {
      [ROUTE_DESCRIPTION]:
        'Tiendas en línea, desarrollo web a la medida, automatización, consultoría y apps móviles para tu negocio.',
    },
    loadComponent: () => import('./ui/services-page').then((m) => m.ServicesPage),
  },
  {
    path: ':slug',
    title: serviceTitle,
    resolve: { [ROUTE_DESCRIPTION]: serviceDescription },
    loadComponent: () => import('./ui/service-detail-page').then((m) => m.ServiceDetailPage),
  },
];
