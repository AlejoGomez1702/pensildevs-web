export interface NavigationLink {
  readonly label: string;
  readonly path: string;
}

export const NAVIGATION_LINKS: readonly NavigationLink[] = [
  { label: 'Servicios', path: '/servicios' },
  { label: 'Pensil.Pos', path: '/productos/pensil-pos' },
  { label: 'Contacto', path: '/contacto' },
];
