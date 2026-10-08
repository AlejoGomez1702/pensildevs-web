# 001 — Plan

## Módulos tocados

| Módulo | Tipo | Cambio |
| --- | --- | --- |
| `contact` | Hexagonal completo | Formulario, solicitud de contacto, canal WhatsApp, CTA reutilizable |
| `services` | Solo contenido | Lista y detalle por slug |
| `products` | Solo contenido | Página de Pensil.Pos y tarjeta destacada para el inicio |
| `home` | Solo contenido | Página de inicio que compone módulos vía su `index.ts` |
| `layout/` | Shell | Encabezado, menú móvil, pie, salto al contenido, página no encontrada |
| `shared/kernel` | TS puro | `Result` |
| `shared/ui` | Sistema de diseño | Logo, íconos, encabezado de sección, estilos de botón |
| `shared/infrastructure` | Angular | `TitleStrategy` con meta descripción |

## Dominio (`contact/domain`)

- `ContactRequest.create(input)` → `Result<ContactRequest, ContactRequestError[]>`. Reglas: nombre requerido (trim), correo válido, mensaje entre 10 y 1000 caracteres, servicio de interés opcional.
- `Email` value object.
- `CompanyContact`: número de WhatsApp en E.164 y correo de Pensil.Devs.
- `whatsAppChatUrl(phone, text)`: URL `https://wa.me/<digits>?text=<encoded>`. Función pura.
- `contactRequestMessage(request)`: texto del mensaje que recibe Pensil.Devs.

## Puertos y adaptadores

| Puerto (`application/`) | Adaptador (`infrastructure/`) | Notas |
| --- | --- | --- |
| `ContactChannel.send(request): Promise<Result<void, 'channel-blocked'>>` | `WhatsAppContactChannel` | Abre `wa.me` con `window.open` vía `DOCUMENT`; si devuelve `null`, `channel-blocked` |

Caso de uso: `SendContactRequest.execute(input)` → valida con el dominio y delega al canal. Devuelve `Result<void, ContactRequestError[] | 'channel-blocked'>`.

## Rutas y UI

- `app.routes.ts` monta `loadChildren` por módulo y `**` → `layout/not-found`.
- Título por ruta (`title`) + `data.description` aplicada por `SeoTitleStrategy`.
- Router con `withComponentInputBinding()` (slug como `input()`), `withInMemoryScrolling` (scroll arriba y anclas) y `withViewTransitions()` (respeta reducción de movimiento vía CSS).
- Formulario con Signal Forms (`form`, `[formField]`, `required`, `email`, `minLength`, `maxLength`), errores con `aria-describedby`/`aria-invalid` y foco al primer inválido.
- Sistema visual: tokens en `styles.css` (`@theme` de Tailwind 4) con modo claro y oscuro.

## Dirección visual

- **Concepto:** "del boceto al producto". El lápiz traza la idea; el software la vuelve real.
- **Color** (detalle en el [design system](https://claude.ai/artifact/VHJ42zPuF6Az213tbnmWff)):
  - **Blanco (`paper`):** fondo de toda página, incluido el hero.
  - **Amarillo (`pencil`):** acción y atención; texto oscuro encima.
  - **Verde (`leaf`, `leaf-soft`, `leaf-text`, `leaf-bright`):** acompaña al blanco y al amarillo en piezas pequeñas (etiquetas de sección, íconos de servicios y producto, checks, crecimiento, confirmaciones, paso final del proceso). Nunca como fondo de sección.
  - **Grafito (`graphite`):** banda de Pensil.Pos, contacto directo y pie; sobre él el foco es `pencil`.
  - Todos los pares cumplen WCAG AA en claro y oscuro.
- **Tipografía:** Bricolage Grotesque (títulos, con carácter) e Inter (texto, legibilidad).
- **Detalles:** trazos tipo subrayado a mano en palabras clave, cuadrícula de cuaderno sutil en el hero, tarjetas con borde fino y sombra corta.

## Riesgos

- Contenido provisional publicado por error → todo el contenido vive en archivos `*.content.ts` señalados en el resumen del PR.
- Bloqueo de ventanas emergentes → criterio 12 con enlace manual.

## Estrategia de pruebas

| Criterio | Prueba |
| --- | --- |
| 10, casos borde | `contact-request.spec.ts`, `email.spec.ts` (dominio) |
| 11, 13 | `whatsapp-chat-url.spec.ts`, `contact-request-message.spec.ts`, `send-contact-request.spec.ts` |
| 12 | `send-contact-request.spec.ts`, `whatsapp-contact-channel.integration.spec.ts` |
| 10–12 (UI) | `contact-page.spec.ts` |
| 1–5 | `site-header.spec.ts`, `app.integration.spec.ts` |
| 6–9 | `app.integration.spec.ts` (navega cada ruta con el router real) |
