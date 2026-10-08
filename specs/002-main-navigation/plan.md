# 002 — Plan

## Módulos tocados

| Módulo | Cambio |
| --- | --- |
| `products` | Catálogo de productos (`PRODUCT_CATALOG`), tarjeta de producto, página `/productos`. El catálogo se expone en `index.ts` |
| `services` | Sin cambios de código: `SERVICE_OFFERINGS` ya es público |
| `layout` | La navegación se arma desde los catálogos de `products` y `services`; el header gana submenús de escritorio y grupos en móvil; el pie enlaza el catálogo de productos |

## Dominio

Nada nuevo. Son módulos de solo contenido (pragmatismo permitido): el catálogo vive en `products/ui/` como el resto del contenido provisional.

## Puertos y adaptadores

| Puerto (`application/`) | Adaptador (`infrastructure/`) | Notas |
| --- | --- | --- |
| — | — | No hay datos externos ni cambios de estado |

## Rutas y UI

- `products.routes.ts`: la ruta vacía deja de redirigir y carga `ProductsPage` (lazy) con `title` y descripción propios.
- `products/ui/product-catalog.ts`: `ProductSummary` (`slug`, `name`, `category`, `icon`, `tagline`) y `PRODUCT_CATALOG`, que hoy contiene Pensil.Pos tomado de `PENSIL_POS`.
- `products/ui/product-card.ts`: tarjeta con el mismo patrón que `ServiceCard` (toda la tarjeta clicable vía el enlace del título).
- `products/ui/products-page.ts`: encabezado, lista de tarjetas y llamado a WhatsApp.
- `layout/navigation-links.ts`: `NAVIGATION_ITEMS`, una lista de `NavigationLink` y `NavigationMenu` (sección con `path`, `links` con descripción y enlace "Ver todos"). Productos y Servicios se generan desde `PRODUCT_CATALOG` y `SERVICE_OFFERINGS` (criterio 16).
- `layout/site-header.ts`:
  - Escritorio: patrón *disclosure navigation* de ARIA APG (botón con `aria-expanded` + `aria-controls`, lista de enlaces), no `role="menu"`, porque son enlaces de navegación. Estado en un `signal<string | null>` con el menú abierto.
  - Se cierra con Escape (foco al disparador), clic fuera (`document:click`), salida del foco de la navegación (`focusout` con `relatedTarget` fuera) y al elegir un enlace.
  - Sección activa: `computed` sobre la URL actual (`toSignal` de los `NavigationEnd`); `aria-current="page"` en los enlaces del submenú con `routerLinkActive`.
  - Móvil: grupos con encabezado y enlaces visibles; se conserva el cierre al elegir.
  - El caso de cambio de tamaño con un submenú abierto lo resuelven las clases responsivas (`hidden md:block` / `md:hidden`): el submenú de escritorio nunca se ve en móvil.
- `layout/site-footer.ts`: la columna "Productos" itera `PRODUCT_CATALOG` y agrega "Ver todos los productos"; Contacto pasa a la columna "Escríbenos".

## Riesgos

- Cerrar con clic fuera y con `focusout` puede competir con el clic en el propio disparador: se ignora el clic si ocurre dentro de la navegación.
- El submenú absoluto puede salirse del viewport en anchos medianos: se alinea al inicio del disparador y con ancho máximo.

## Estrategia de pruebas

| Prueba | Capa | Criterios |
| --- | --- | --- |
| `layout/navigation-links.spec.ts` | Unitaria (TS puro) | 1, 3, 4, 16 |
| `layout/site-header.spec.ts` | Componente | 1, 2, 5, 6, 7, 8, 9, 10, 11 |
| `layout/site-footer.spec.ts` | Componente | 15 |
| `products/ui/products-page.spec.ts` | Componente | 12, 13 |
| `app.integration.spec.ts` | Integración con rutas reales | 3, 12, 14 |

El criterio 17 (AXE, 320 px) se revisa a mano en el navegador; el lint de accesibilidad de plantillas es bloqueante.
