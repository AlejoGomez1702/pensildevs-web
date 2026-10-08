# 001 — Sitio corporativo de Pensil.Devs

- **Estado:** aprobada (alcance confirmado por Alejandro Gómez, 2026-10-07)
- **Ticket / épica:** por crear

## Problema

Pensil.Devs no tiene presencia web. Dueños de negocio que buscan software (un punto de venta, una tienda en línea, automatizar procesos) no tienen dónde conocer lo que hacemos, confiar en nosotros y escribirnos. Cada contacto hoy depende de recomendaciones.

## Público

- **Dueño de negocio pequeño o mediano** (tienda, restaurante, óptica, servicios). No es técnico, llega desde el celular, quiere saber rápido si podemos resolver su problema y cuánto esfuerzo le cuesta empezar.
- **Responsable de operación** que busca un punto de venta concreto (Pensil.Pos) y quiere ver funciones antes de pedir una demo.

## Historias de usuario

1. Como dueño de negocio, quiero entender en segundos qué hace Pensil.Devs, para decidir si sigo leyendo.
2. Como dueño de negocio, quiero ver los servicios con ejemplos de lo que resuelven, para saber cuál necesito.
3. Como responsable de operación, quiero conocer Pensil.Pos y sus funciones, para pedir una demo.
4. Como visitante interesado, quiero escribir a Pensil.Devs por WhatsApp o con un formulario, para empezar una conversación sin fricción.
5. Como persona que navega con teclado o lector de pantalla, quiero recorrer todo el sitio sin barreras.

## Mapa del sitio

| Ruta | Página | Objetivo |
| --- | --- | --- |
| `/` | Inicio | Propuesta de valor, producto destacado, servicios, forma de trabajo, llamado a la acción |
| `/servicios` | Servicios | Los 4 servicios con lo que resuelven |
| `/servicios/:slug` | Detalle de servicio | Problemas que resuelve, qué incluye, cómo se entrega |
| `/productos/pensil-pos` | Pensil.Pos | Beneficios, funciones, para quién, cómo empezar, pedir demo |
| `/contacto` | Contacto | Formulario y WhatsApp directo |
| `**` | No encontrada | Regresar a un camino útil |

Servicios: desarrollo web a la medida, tiendas en línea, automatización, consultoría y apps móviles.

## Criterios de aceptación

### Navegación y layout
1. **Dado** cualquier página, **cuando** se carga, **entonces** muestra encabezado con logo enlazado al inicio, navegación principal (Servicios, Pensil.Pos, Contacto) y pie con enlaces y datos de contacto.
2. **Dado** un viewport móvil, **cuando** abro el menú, **entonces** se despliega la navegación, el botón anuncia su estado (`aria-expanded`) y al elegir una opción el menú se cierra.
3. **Dado** que navego con teclado, **cuando** presiono Tab al cargar, **entonces** el primer foco es "Saltar al contenido", que lleva al contenido principal.
4. **Dado** que cambio de página, **cuando** termina la navegación, **entonces** el título del documento describe la página y el scroll vuelve arriba.
5. **Dado** el enlace de la página actual, **cuando** se muestra la navegación, **entonces** está marcado con `aria-current="page"`.

### Contenido
6. **Dado** el inicio, **cuando** lo visito, **entonces** veo la propuesta de valor con dos acciones (hablar por WhatsApp y ver servicios), Pensil.Pos destacado, los 4 servicios, cómo trabajamos y un llamado final a la acción.
7. **Dado** `/servicios/:slug` con un slug existente, **cuando** lo visito, **entonces** veo el detalle de ese servicio y una acción para cotizarlo.
8. **Dado** `/servicios/:slug` con un slug inexistente, **cuando** lo visito, **entonces** veo un mensaje de servicio no encontrado con enlace a la lista de servicios.
9. **Dado** una ruta inexistente, **cuando** la visito, **entonces** veo la página de no encontrada con enlaces al inicio y a contacto.

### Contacto
10. **Dado** el formulario de contacto, **cuando** envío sin nombre, con correo inválido o con mensaje de menos de 10 caracteres, **entonces** no se envía, cada campo inválido muestra su error asociado y el foco va al primer campo inválido.
11. **Dado** un formulario válido, **cuando** lo envío, **entonces** se abre una conversación de WhatsApp con Pensil.Devs con un mensaje que incluye nombre, correo, servicio de interés y mensaje.
12. **Dado** un formulario válido, **cuando** el navegador bloquea la ventana de WhatsApp, **entonces** veo un aviso con el enlace para abrirla manualmente y el correo como alternativa.
13. **Dado** cualquier llamado a la acción de WhatsApp, **cuando** lo uso, **entonces** abre la conversación con un mensaje inicial acorde al contexto (servicio o Pensil.Pos).

### Calidad
14. Todas las páginas pasan AXE y WCAG AA (contraste, foco visible, landmarks, un solo `h1`).
15. El diseño funciona desde 320 px de ancho sin scroll horizontal.
16. Se respeta `prefers-reduced-motion` y `prefers-color-scheme`.

## Casos borde

- Nombre o mensaje con solo espacios cuenta como vacío.
- Mensaje de más de 1000 caracteres se rechaza con aviso.
- Caracteres especiales y saltos de línea en el mensaje llegan intactos a WhatsApp (URL codificada).

## Fuera de alcance

- Backend propio, CMS, blog, portafolio de clientes, precios publicados.
- Aviso de privacidad definitivo (pendiente de redacción legal).
- SSR / prerender (decisión abierta).
- Analítica.

## Contenido provisional (a validar por Pensil.Devs)

- Funciones de Pensil.Pos, textos de servicios, número de WhatsApp y correo de contacto. Cada uno vive en un único archivo de contenido por módulo para cambiarlo sin tocar componentes.
