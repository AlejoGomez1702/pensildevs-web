# 002 — Tareas

Cada tarea empieza por la prueba que debe fallar.

- [x] 1. Prueba: `navigation-links.spec.ts` (orden Productos, Servicios, Contacto; submenús generados desde los catálogos con "Ver todos") → Implementación: `PRODUCT_CATALOG` en `products` y `NAVIGATION_ITEMS` en `layout`.
- [x] 2. Prueba: `products-page.spec.ts` (tarjeta por producto con enlace a su página; llamado a WhatsApp) → Implementación: `ProductCard` y `ProductsPage`.
- [x] 3. Prueba: `app.integration.spec.ts` (`/productos` muestra el catálogo con título y descripción propios) → Implementación: ruta vacía de `products.routes.ts`.
- [x] 4. Prueba: `site-header.spec.ts` (abrir/cerrar submenús con clic, Escape, clic fuera, foco fuera y al elegir; solo uno abierto) → Implementación: submenús de escritorio.
- [x] 5. Prueba: `site-header.spec.ts` (sección activa y `aria-current` en el submenú) → Implementación: sección activa a partir de la URL.
- [x] 6. Prueba: `site-header.spec.ts` (menú móvil con grupos y cierre al elegir) → Implementación: grupos en el menú móvil.
- [x] 7. Prueba: `site-footer.spec.ts` (productos del catálogo y "Ver todos los productos") → Implementación: pie desde `PRODUCT_CATALOG`.
- [ ] 8. Revisión manual en navegador: teclado, lector de pantalla, 320 px, tema oscuro. Cerrar con `npm run verify`.
