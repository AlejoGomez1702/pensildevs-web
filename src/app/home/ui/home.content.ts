import type { IconName } from '../../shared/ui/icon';

/** PROVISIONAL copy: review with Pensil.Devs before launch. */
export const PROMISES: readonly { icon: IconName; title: string; description: string }[] = [
  {
    icon: 'handshake',
    title: 'Hablas con quien construye',
    description: 'Sin intermediarios: tu proyecto lo platicas directo con el equipo que lo hace.',
  },
  {
    icon: 'pencil',
    title: 'Ves antes de pagar de más',
    description: 'Primero un prototipo navegable; programamos cuando estás seguro de lo que quieres.',
  },
  {
    icon: 'shield',
    title: 'Todo queda a tu nombre',
    description: 'Código, dominio y cuentas son tuyos. Sin amarres ni rentas forzosas.',
  },
  {
    icon: 'mobile',
    title: 'Pensado para el celular',
    description: 'Tus clientes y tu equipo lo usan cómodo desde cualquier pantalla.',
  },
];

export const FREQUENT_QUESTIONS: readonly { question: string; answer: string }[] = [
  {
    question: '¿Cuánto cuesta un proyecto?',
    answer:
      'Depende de lo que necesites. Después de una primera plática te enviamos una propuesta con alcance, tiempos y costo cerrado por etapa, para que no haya sorpresas.',
  },
  {
    question: '¿Cuánto tiempo tarda?',
    answer:
      'Un sitio o una tienda sencilla puede estar lista en pocas semanas; un sistema a la medida se entrega por etapas, con avances que puedes probar desde el inicio.',
  },
  {
    question: '¿Necesito saber de tecnología?',
    answer:
      'No. Te explicamos cada decisión en palabras simples y te capacitamos para que tú y tu equipo usen lo que construimos.',
  },
  {
    question: '¿Qué pasa después de la entrega?',
    answer:
      'Seguimos cerca: corregimos lo que haga falta durante el periodo de garantía y podemos acompañarte con soporte y mejoras.',
  },
];
