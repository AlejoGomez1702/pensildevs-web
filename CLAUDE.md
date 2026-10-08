# Pensil.Devs — Sitio web

Sitio web de Pensil.Devs, compañía que ofrece productos y servicios de software que le solucionan la vida a las personas. Angular 22, Tailwind 4, Vitest.

## Reglas generales

- **Lenguaje normativo.** DEBE / NO DEBE son reglas sin excepción. DEBERÍA admite excepción solo si queda escrita en un ADR (`docs/adr/`).
- **Idioma.** Código, nombres de archivos, identificadores y commits en inglés. Interfaz, specs, ADR y documentación en español.
- **Principios.**
  1. El código grita el negocio: al abrir `src/app/` se ven productos, servicios y contacto, no `components/`, `services/` ni `models/`.
  2. Spec antes que código cuando el requerimiento lo amerita (ver SDD).
  3. Ninguna regla de negocio sin una prueba que haya fallado antes (TDD).
  4. Simplicidad primero: no se crea una abstracción sin un segundo uso real.
  5. Nada entra a `main` en rojo.

## Comandos

```
npm start        # servidor de desarrollo
npm test         # pruebas unitarias (Vitest vía ng test)
npm run build    # build de producción
```

## Arquitectura

Hexagonal por dentro de cada módulo, vertical slicing entre módulos y carpetas que gritan el negocio (screaming architecture).

### Estructura de carpetas

```
src/app/
  <module>/                  un módulo por capacidad del negocio
    domain/                  entidades, value objects, reglas y errores. TypeScript puro
    application/             casos de uso y puertos (clases abstractas)
    infrastructure/          adaptadores: HTTP, APIs externas, almacenamiento
    ui/                      páginas, componentes y estado de vista (signals)
    <module>.routes.ts       rutas del módulo, cargadas con lazy loading
    <module>.providers.ts    único punto de composición: conecta puertos con adaptadores
    index.ts                 API pública del módulo
  shared/
    kernel/                  Result, Id, errores base y value objects transversales. TypeScript puro
    ui/                      sistema de diseño: componentes base reutilizables
    infrastructure/          cliente HTTP, configuración, logger
  layout/                    shell del sitio: header, footer, navegación
  app.routes.ts              solo composición: monta las rutas de cada módulo con loadChildren
  app.config.ts              providers globales
specs/                       specs SDD
docs/adr/                    decisiones de arquitectura
```

Módulos propuestos (por confirmar al escribir las primeras specs): `products`, `services`, `contact`, `portfolio`, `company`. Un módulo nuevo se agrega cuando aparece una capacidad del negocio nueva, no por tipo técnico.

### Reglas de dependencia

1. `domain/` NO DEBE importar nada fuera de su propio `domain/` y de `shared/kernel`. Sin `@angular/*`, sin RxJS, sin `HttpClient`, sin `Date.now()` ni `Math.random()` implícitos.
2. `application/` depende solo de `domain/` y `shared/kernel`. Define los puertos que necesita como clases abstractas (sirven de token de inyección sin importar Angular). NO DEBE importar `@angular/*`.
3. Los casos de uso son clases TypeScript puras que reciben sus puertos por constructor. Es la única excepción a la regla de `inject()`, porque no son clases de Angular.
4. `infrastructure/` implementa los puertos. Es el único lugar donde se importa `HttpClient` o un SDK externo.
5. `<module>.providers.ts` expone una función `provide<Module>()` que registra adaptadores (`{ provide: Port, useClass: Adapter }`) y casos de uso (`useFactory`). Se registra en `<module>.routes.ts` (providers de la ruta) para que viaje con el lazy chunk.
6. `ui/` invoca casos de uso con `inject()`. NO DEBE llamar a `HttpClient` ni a adaptadores directamente.
7. Un módulo solo usa a otro a través de su `index.ts`. Importar carpetas internas de otro módulo está prohibido.
8. `app.routes.ts` y `layout/` no contienen lógica de negocio.
9. Estas reglas DEBERÍAN hacerse cumplir con un lint de límites (`eslint-plugin-boundaries` o `dependency-cruiser`) en CI. Mientras no exista, el revisor las verifica primero.

### Pragmatismo permitido

- Un módulo de solo contenido (por ejemplo `company`) PUEDE tener solo `ui/` y rutas.
- Las lecturas simples PUEDEN ir por un adaptador en `infrastructure/` que devuelve un DTO de solo lectura, sin pasar por entidades. La hexagonal completa se reserva para lo que tiene reglas o cambia estado (por ejemplo, enviar un formulario de contacto).
- No se usan librerías de estado globales: signals en `ui/` y casos de uso en `application/` bastan.

## Spec-Driven Development (SDD)

Se escribe una spec antes de programar cuando el requerimiento cumple al menos una condición; si no, basta un ticket con criterios de aceptación:

- Involucra más de un módulo o crea uno nuevo.
- Integra un servicio externo (envío de correo, CMS, analítica, CRM).
- Recibe datos del usuario (formularios) o maneja datos personales.
- Se estima en más de un día de trabajo.

Artefactos en `specs/NNN-short-name/` (plantillas en `specs/_template/`):

| Archivo | Responde | Contiene |
| --- | --- | --- |
| `spec.md` | Qué y por qué | Problema, historias de usuario, criterios Dado / Cuando / Entonces, casos borde, fuera de alcance. Sin tecnología |
| `plan.md` | Cómo | Módulos tocados, puertos y adaptadores nuevos, riesgos, estrategia de pruebas |
| `tasks.md` | En qué orden | Tareas pequeñas; cada una empieza por la prueba que debe fallar |

Flujo: `spec.md` → aprobación de una persona → `plan.md` validado contra las reglas de arquitectura → `tasks.md` → TDD. Cada criterio de aceptación debe poder señalarse en al menos una prueba. Si la implementación se desvía, la spec se actualiza en el mismo pull request.

## TDD y pruebas

Rojo → verde → refactor es obligatorio en `domain/` y `application/`.

| Capa | Prueba | Regla |
| --- | --- | --- |
| `domain/` | Unitaria (Vitest) | Sin mocks, sin TestBed, sin red; corre en milisegundos |
| `application/` | Unitaria (Vitest) | Los puertos se sustituyen por implementaciones en memoria escritas a mano |
| `infrastructure/` | Integración | `HttpTestingController` o el servicio real en modo prueba |
| `ui/` | Componente (TestBed) | Solo componentes con comportamiento; nada de snapshots. Incluye verificación de accesibilidad |
| Flujos críticos | E2E (Playwright, cuando se instale) | Viewport móvil |

- Un bug se corrige escribiendo primero la prueba que lo reproduce.
- Los nombres de las pruebas describen comportamiento del negocio, no métodos.
- Las pruebas no dependen del orden ni comparten estado.
- El tiempo y los identificadores se inyectan (`Clock`, `IdGenerator`).
- Cobertura mínima: 80% en código nuevo, 90% en `domain/`. Es un piso, no la meta.
- NO DEBE desactivarse ni saltarse una prueba para lograr un merge.

## Clean code

1. TypeScript estricto; `any` prohibido, `unknown` más validación en los bordes.
2. Nombres con el vocabulario del negocio (`Product`, `ServiceOffering`, `ContactRequest`).
3. Funciones cortas, un solo nivel de abstracción, complejidad cognitiva ≤ 15, máximo tres parámetros (después, un objeto con nombre).
4. Errores esperados del negocio como `Result` tipado; excepciones solo para lo inesperado.
5. Entradas externas (formularios, parámetros de URL, respuestas de API) se validan en el borde antes de llegar a un caso de uso.
6. Value objects para conceptos con reglas (`Email`, `PhoneNumber`, `Slug`).
7. Sin números ni textos mágicos. Comentarios explican por qué, nunca qué. Código muerto se borra.
8. Formato con Prettier; el estilo no se discute en revisión.

## Git

- Trunk-based: ramas cortas desde `main` que vuelven por pull request en uno o dos días.
- Ramas `feat/…`, `fix/…`, `chore/…`, `docs/…`.
- Conventional Commits en inglés con el módulo como alcance: `feat(contact): validate contact request email`.
- Pull requests pequeños (referencia: < 400 líneas) y de un solo propósito; fusión por squash.
- Una decisión que se aparte de estas reglas entra con su ADR en el mismo pull request.

## Definition of Done

- Cumple los criterios de aceptación de su spec o ticket.
- Escrito con TDD; pruebas nuevas y existentes pasan.
- Respeta las reglas de dependencia.
- Pasa AXE y WCAG AA; revisado en móvil.
- Sin `any`, sin código muerto, sin `console.log`, sin secretos.
- Spec, ADR y documentación actualizados si cambió lo que describen.
- Pull request revisado y aprobado por una persona.

## Angular Best Practices

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

### TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

### Angular

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

### Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Do NOT import `CommonModule`, import only the directives and pipes the template uses, such as `AsyncPipe` or `DatePipe`
- When using external templates/styles, use paths relative to the component TS file.

### State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

### Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

### Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection (except pure use cases in `application/`, see Architecture)
