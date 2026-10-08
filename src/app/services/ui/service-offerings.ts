import type { IconName } from '../../shared/ui/icon';

export interface ServiceOffering {
  readonly slug: string;
  readonly icon: IconName;
  readonly title: string;
  readonly tagline: string;
  readonly summary: string;
  /** Situations a business owner recognizes before talking to us. */
  readonly problems: readonly string[];
  readonly includes: readonly string[];
  readonly idealFor: string;
}

/** PROVISIONAL copy: review with Pensil.Devs before launch. */
export const SERVICE_OFFERINGS: readonly ServiceOffering[] = [
  {
    slug: 'tiendas-en-linea',
    icon: 'store',
    title: 'Tiendas en línea',
    tagline: 'Vende las 24 horas sin depender de un marketplace.',
    summary:
      'Tu propia tienda con catálogo, carrito, pagos con tarjeta y transferencia, y un panel para gestionar pedidos e inventario desde el celular.',
    problems: [
      'Vendes por mensajes y pierdes pedidos entre conversaciones.',
      'Las comisiones de los marketplaces se comen tu margen.',
      'No sabes qué productos se venden más ni cuándo reabastecer.',
    ],
    includes: [
      'Catálogo con fotos, variantes y filtros',
      'Pagos en línea con tarjeta y transferencia',
      'Panel de pedidos, inventario y cupones',
      'Avisos al cliente en cada cambio de su pedido',
      'SEO básico y enlaces a tus redes sociales',
    ],
    idealFor: 'Negocios que ya venden por redes sociales y quieren dar el siguiente paso.',
  },
  {
    slug: 'desarrollo-web',
    icon: 'code',
    title: 'Desarrollo web a la medida',
    tagline: 'Sistemas que se adaptan a tu negocio, no al revés.',
    summary:
      'Aplicaciones web para la operación de tu negocio: citas, cotizaciones, control interno o portales para tus clientes.',
    problems: [
      'Tu operación vive en hojas de cálculo que ya no alcanzan.',
      'Cada persona del equipo lleva la información a su manera.',
      'Ningún sistema comercial se ajusta a cómo trabajas.',
    ],
    includes: [
      'Diseño de experiencia pensado para tu equipo',
      'Prototipo navegable antes de programar',
      'Panel de administración con roles y permisos',
      'Dominio, hosting y respaldos configurados',
      'Capacitación y documentación de uso',
    ],
    idealFor: 'Equipos que repiten a mano tareas que un sistema podría hacer.',
  },
  {
    slug: 'automatizacion',
    icon: 'automation',
    title: 'Automatización e integraciones',
    tagline: 'Que las tareas repetitivas se hagan solas.',
    summary:
      'Conectamos tus herramientas para que la información fluya sola: avisos por WhatsApp y correo, reportes automáticos y sistemas que por fin se hablan.',
    problems: [
      'Copias los mismos datos de un sistema a otro todos los días.',
      'Tus clientes preguntan por su pedido porque nadie les avisa.',
      'Armar el reporte semanal te toma horas.',
    ],
    includes: [
      'Mensajes automáticos por WhatsApp y correo',
      'Integración con pagos y sistemas existentes',
      'Reportes que se generan y envían solos',
      'Monitoreo para que nada se pierda si algo falla',
    ],
    idealFor: 'Negocios que crecieron y hoy dependen de procesos manuales.',
  },
  {
    slug: 'consultoria-y-apps-moviles',
    icon: 'mobile',
    title: 'Consultoría y apps móviles',
    tagline: 'Decide con claridad y lleva tu negocio al celular.',
    summary:
      'Te ayudamos a elegir la tecnología correcta, revisamos proyectos existentes y construimos apps móviles para tus clientes o tu equipo.',
    problems: [
      'Tienes una idea y no sabes por dónde empezar ni cuánto cuesta.',
      'Heredaste un sistema que nadie entiende y da miedo tocar.',
      'Tus clientes o tu equipo necesitan una app en su celular.',
    ],
    includes: [
      'Diagnóstico técnico y plan de trabajo por etapas',
      'Revisión de código, seguridad y costos de operación',
      'Apps para Android y iOS',
      'Acompañamiento para tu equipo técnico',
    ],
    idealFor: 'Quien necesita una segunda opinión técnica o una app propia.',
  },
];

export function findServiceOffering(slug: string): ServiceOffering | undefined {
  return SERVICE_OFFERINGS.find((offering) => offering.slug === slug);
}
