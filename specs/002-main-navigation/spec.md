# 002 — Navegación principal por Productos, Servicios y Contacto

- **Estado:** aprobada (alcance confirmado por Alejandro Gómez, 2026-10-08)
- **Ticket / épica:** por crear

## Problema

La navegación principal mezcla niveles: ofrece "Servicios" (una categoría), "Pensil.Pos" (un producto concreto) y "Contacto". El visitante no ve que Pensil.Devs tiene dos líneas de oferta, productos propios y servicios a la medida, y para encontrar un servicio concreto tiene que entrar primero al listado. Cuando exista un segundo producto no habrá dónde ponerlo sin rehacer el menú.

## Público

El mismo de la spec 001: dueño de negocio que llega desde el celular y responsable de operación que busca un punto de venta.

## Historias de usuario

1. Como dueño de negocio, quiero ver en el menú que Pensil.Devs ofrece productos y servicios, para entender en segundos qué tipo de ayuda puedo pedir.
2. Como responsable de operación, quiero llegar a Pensil.Pos desde el menú en un solo paso, para no buscarlo dentro del sitio.
3. Como dueño de negocio, quiero elegir un servicio concreto desde el menú, para ir directo al que me interesa.
4. Como visitante, quiero una página que reúna los productos, para conocer lo que Pensil.Devs ya tiene hecho.
5. Como persona que navega con teclado o lector de pantalla, quiero abrir, recorrer y cerrar los submenús sin barreras.

## Mapa del sitio (cambios sobre la spec 001)

| Ruta | Página | Cambio |
| --- | --- | --- |
| `/productos` | Productos | **Nueva.** Catálogo con una tarjeta por producto (hoy solo Pensil.Pos). Antes redirigía a `/productos/pensil-pos` |
| `/productos/pensil-pos` | Pensil.Pos | Sin cambios |
| `/servicios`, `/servicios/:slug` | Servicios | Sin cambios |

Navegación principal, en este orden: **Productos**, **Servicios**, **Contacto**.

- Productos: Pensil.Pos y "Ver todos los productos".
- Servicios: Tiendas en línea, Desarrollo web a la medida, Automatización e integraciones, Consultoría y apps móviles, y "Ver todos los servicios".

## Criterios de aceptación

### Escritorio
1. **Dado** cualquier página en escritorio, **cuando** se carga, **entonces** la navegación principal muestra Productos, Servicios y Contacto en ese orden; Productos y Servicios indican que abren un submenú.
2. **Dado** el menú cerrado, **cuando** activo Productos o Servicios con clic, Enter o Espacio, **entonces** se abre su submenú, el disparador anuncia `aria-expanded="true"` y cualquier otro submenú abierto se cierra.
3. **Dado** el submenú de Productos abierto, **cuando** lo veo, **entonces** muestra Pensil.Pos con su descripción corta y el enlace "Ver todos los productos" a `/productos`.
4. **Dado** el submenú de Servicios abierto, **cuando** lo veo, **entonces** muestra los 4 servicios, cada uno con su descripción corta y enlace a `/servicios/:slug`, y el enlace "Ver todos los servicios" a `/servicios`.
5. **Dado** un submenú abierto, **cuando** presiono Escape, **entonces** se cierra y el foco vuelve a su disparador.
6. **Dado** un submenú abierto, **cuando** hago clic fuera de él o el foco sale de la navegación, **entonces** se cierra.
7. **Dado** un submenú abierto, **cuando** elijo un enlace, **entonces** navego a esa página y el submenú se cierra.

### Móvil
8. **Dado** un viewport móvil, **cuando** abro el menú, **entonces** veo los grupos Productos y Servicios con sus enlaces visibles (sin un segundo nivel que desplegar), seguidos de Contacto y la acción de WhatsApp.
9. **Dado** el menú móvil abierto, **cuando** elijo cualquier enlace, **entonces** navego y el menú se cierra (se mantiene el comportamiento de la spec 001).

### Estado actual
10. **Dado** que estoy en `/productos` o en cualquier página de un producto, **cuando** veo la navegación, **entonces** Productos se marca como sección activa; lo mismo para Servicios bajo `/servicios`.
11. **Dado** un enlace de submenú que corresponde a la página actual, **cuando** se muestra, **entonces** está marcado con `aria-current="page"`.

### Página de productos
12. **Dado** `/productos`, **cuando** la visito, **entonces** veo un encabezado que presenta los productos de Pensil.Devs y una tarjeta por producto con nombre, descripción corta y enlace a su página.
13. **Dado** `/productos`, **cuando** llego al final, **entonces** veo un llamado a la acción para hablar por WhatsApp.
14. **Dado** `/productos`, **cuando** termina la navegación, **entonces** el título del documento y la descripción describen la página de productos.

### Consistencia
15. **Dado** el pie de página, **cuando** se muestra, **entonces** su columna de productos enlaza a cada producto y a `/productos`, igual que el menú.
16. Agregar un producto o un servicio al contenido lo muestra en el submenú, en el menú móvil, en el pie y en su página de listado sin tocar el componente de navegación.

### Calidad
17. La navegación y la página de productos pasan AXE y WCAG AA y funcionan desde 320 px sin scroll horizontal.

## Casos borde

- Pasar el mouse por encima no abre el submenú: se abre con clic o teclado, para que no se abra por accidente ni dependa de un mouse.
- Una ventana que pasa de escritorio a móvil con un submenú abierto no deja ese submenú visible.
- Un `/productos/:slug` inexistente sigue llevando a la página de no encontrada.

## Fuera de alcance

- Productos nuevos además de Pensil.Pos.
- Cambios a los textos de los servicios o de Pensil.Pos (siguen provisionales según la spec 001).
- Megamenú con imágenes o destacados.
- Buscador en el sitio.
