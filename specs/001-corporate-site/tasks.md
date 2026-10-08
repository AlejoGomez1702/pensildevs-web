# 001 — Tareas

Cada tarea empieza por la prueba que debe fallar.

- [x] 1. Prueba: `result.spec.ts` → Implementación: `shared/kernel/result.ts`
- [x] 2. Prueba: `email.spec.ts`, `contact-request.spec.ts` → Implementación: value object `Email` y `createContactRequest` (criterio 10, casos borde)
- [x] 3. Prueba: `whatsapp-chat-url.spec.ts`, `contact-request-message.spec.ts` → Implementación: URL de WhatsApp y mensaje (criterios 11 y 13)
- [x] 4. Prueba: `send-contact-request.spec.ts` → Implementación: puerto `ContactChannel` y caso de uso (criterios 11 y 12)
- [x] 5. Prueba: `whatsapp-contact-channel.integration.spec.ts` → Implementación: adaptador `WhatsAppContactChannel` (criterio 12)
- [x] 6. Prueba: `contact-page.spec.ts` → Implementación: página de contacto con Signal Forms (criterios 10–12)
- [x] 7. Prueba: `site-header.spec.ts` → Implementación: encabezado y menú móvil (criterios 1, 2, 5)
- [x] 8. Prueba: `app.spec.ts`, `app.integration.spec.ts` → Implementación: shell, rutas, títulos, foco tras navegar, páginas de contenido y 404 (criterios 3, 4, 6–9)
- [x] 9. Verificación manual: capturas en 375 px y 1440 px, modo claro y oscuro, sin scroll horizontal (criterios 15 y 16)
- [x] 10. AXE (wcag2a/aa, wcag21a/aa, best-practice) en las 6 páginas, claro y oscuro: 0 violaciones (criterio 14)

## Pendiente antes de publicar

- [ ] Número real de WhatsApp y correo en `contact/domain/company-contact.ts`.
- [ ] Validar el contenido provisional: `services/ui/service-offerings.ts`, `products/ui/pensil-pos.content.ts`, `home/ui/home.content.ts`, `services/ui/delivery-process.ts`.
- [ ] Aviso de privacidad.
- [ ] Decidir SSR / prerender para SEO.
