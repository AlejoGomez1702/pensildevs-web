import type { IconName } from '../../shared/ui/icon';

export interface PensilPosFeature {
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}

/** PROVISIONAL copy: confirm Pensil.Pos features with the product team before launch. */
export const PENSIL_POS = {
  name: 'Pensil.Pos',
  slug: 'pensil-pos',
  tagline: 'El punto de venta que tu equipo aprende en una tarde.',
  summary:
    'Cobra rápido, controla tu inventario y cierra la caja sin sorpresas. Todo en un sistema claro, pensado para negocios que no tienen tiempo que perder.',
  features: [
    {
      icon: 'scan',
      title: 'Ventas en segundos',
      description: 'Busca o escanea productos, aplica descuentos y cobra en efectivo o tarjeta.',
    },
    {
      icon: 'boxes',
      title: 'Inventario al día',
      description: 'Cada venta descuenta existencias y te avisa cuando un producto está por agotarse.',
    },
    {
      icon: 'cash',
      title: 'Cortes de caja claros',
      description: 'Abre y cierra turnos con el detalle de lo que entró, por forma de pago.',
    },
    {
      icon: 'chart',
      title: 'Reportes que se entienden',
      description: 'Lo más vendido, tus mejores días y cómo va el mes, sin armar hojas de cálculo.',
    },
    {
      icon: 'users',
      title: 'Usuarios y permisos',
      description: 'Cada persona entra con su cuenta y solo ve lo que le corresponde.',
    },
    {
      icon: 'receipt',
      title: 'Tickets y clientes',
      description: 'Imprime o comparte el ticket y conoce a tus clientes frecuentes.',
    },
  ] satisfies readonly PensilPosFeature[],
  audiences: ['Tiendas de abarrotes y misceláneas', 'Boutiques y ópticas', 'Cafeterías y restaurantes', 'Ferreterías y papelerías'],
  onboarding: [
    { title: 'Demo de 30 minutos', description: 'Te mostramos Pensil.Pos con productos parecidos a los tuyos.' },
    { title: 'Cargamos tu catálogo', description: 'Importamos tus productos y precios para que empieces sin capturar todo a mano.' },
    { title: 'Capacitamos a tu equipo', description: 'Una sesión práctica y quedas listo para vender.' },
  ],
} as const;
