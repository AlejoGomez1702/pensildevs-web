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
npm start                  # servidor de desarrollo
npm test                   # pruebas unitarias en modo watch
npm run test:unit          # pruebas unitarias, una sola corrida
npm run test:integration   # pruebas de integración (*.integration.spec.ts)
npm run test:ci            # todas las pruebas con cobertura y umbrales
npm run lint               # ESLint: reglas de Angular, sonarjs y límites de arquitectura
npm run build              # build de producción
npm run verify             # lint + test:ci + build. DEBE pasar antes de dar una tarea por terminada
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
9. Estas reglas las hace cumplir `eslint-plugin-boundaries` (`eslint.config.js`); una violación rompe `npm run lint`. NO DEBE desactivarse la regla con `eslint-disable` para pasar el lint: si una dependencia parece necesaria, se discute en un ADR.

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

| Capa | Tipo | Archivo | Regla |
| --- | --- | --- | --- |
| `domain/` | Unitaria | `*.spec.ts` | Sin mocks, sin TestBed, sin Angular; solo se importa `vitest`. Corre en milisegundos |
| `application/` | Unitaria | `*.spec.ts` | Los puertos se sustituyen por fakes en memoria escritos a mano (no `vi.mock`) |
| `ui/` | Unitaria de componente | `*.spec.ts` | TestBed; se prueba lo que ve y hace el usuario (roles, textos, eventos), no detalles internos. Nada de snapshots |
| `infrastructure/` | Integración | `*.integration.spec.ts` | Adaptador real contra `provideHttpClientTesting()` / `HttpTestingController` |
| Composición del módulo | Integración | `*.integration.spec.ts` | `provide<Module>()` + rutas reales con `RouterTestingHarness`: la página llega al adaptador |
| Flujos críticos | E2E (Playwright, cuando se instale) | `e2e/` | Viewport móvil |

Configuración (Vitest a través de `@angular/build:unit-test`):

- `angular.json` (`test`) decide qué corre: la configuración por defecto excluye `*.integration.spec.ts`; `-c integration` corre solo esas; `-c ci` corre todo con cobertura.
- `vitest-base.config.mts` define el resto: orden aleatorio (`sequence.shuffle`), `restoreMocks` y umbrales de cobertura (80% global, 90% en `**/domain/**`). Bajar un umbral requiere ADR.
- Globals de Vitest activos (`describe`, `it`, `expect`, `vi`); en `domain/` y `application/` se importan explícitamente desde `vitest` para que el archivo siga siendo TypeScript puro.
- La app es zoneless: NO DEBE usarse `fakeAsync`/`tick` (requieren zone.js). Se usa `await fixture.whenStable()` y `vi.useFakeTimers()`.
- Las pruebas no usan `RouterTestingModule` ni `HttpClientTestingModule`; se usan los `provide*` equivalentes.

Reglas:

- Un bug se corrige escribiendo primero la prueba que lo reproduce.
- Los nombres de las pruebas describen comportamiento del negocio, no métodos.
- Las pruebas no dependen del orden ni comparten estado.
- El tiempo y los identificadores se inyectan (`Clock`, `IdGenerator`).
- Cobertura mínima: 80% global, 90% en `domain/` (la hace cumplir `npm run test:ci`). Es un piso, no la meta.
- NO DEBE desactivarse ni saltarse una prueba para lograr un merge.

## Clean code

1. TypeScript estricto (`strict`, `noUncheckedIndexedAccess`, `strictTemplates`); `any` prohibido, `unknown` más validación en los bordes.
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
- Escrito con TDD; `npm run verify` pasa (lint, pruebas con cobertura y build).
- Usa las APIs modernas de Angular descritas abajo; ninguna API legada nueva.
- Pasa AXE y WCAG AA; revisado en móvil.
- Sin `any`, sin código muerto, sin `console.log`, sin secretos.
- Spec, ADR y documentación actualizados si cambió lo que describen.
- Pull request revisado y aprobado por una persona.

## Angular moderno (v22) y lo último en general

Se usa siempre la API más reciente y estable de Angular. Si existe una API nueva y una legada para lo mismo, la legada NO DEBE aparecer en código nuevo. Ante la duda se consulta la documentación de la versión instalada (MCP `angular-cli` → `search_documentation`, `get_best_practices`).

### Reactividad y detección de cambios

- La app es **zoneless** (sin `zone.js`). NO DEBE agregarse `zone.js` ni `provideZoneChangeDetection()`.
- `OnPush` es el default en v22: NO DEBE declararse `changeDetection` explícitamente.
- Estado con **signals**: `signal()`, `computed()` para lo derivado, `linkedSignal()` para estado derivado que también se puede escribir. Se usa `set`/`update`, nunca `mutate`.
- `effect()` solo para sincronizar con el mundo no reactivo (DOM, `localStorage`, analítica). NO DEBE usarse para derivar estado ni para copiar un signal en otro.
- Datos asíncronos en `ui/` con `resource()` cuyo `loader` llama a un caso de uso. `httpResource()` NO DEBE usarse en `ui/` (sería `HttpClient` fuera de `infrastructure/`).
- RxJS solo donde aporta (streams de eventos); para pasar entre mundos se usa `toSignal()` / `toObservable()`. Nada de `subscribe` manual en componentes.

### Componentes y plantillas

- Componentes standalone. NO DEBE declararse `standalone: true` (es el default) ni crearse NgModules.
- `input()`, `input.required()`, `output()`, `model()` y queries como signals (`viewChild()`, `viewChildren()`, `contentChild()`, `contentChildren()`). NO DEBEN usarse `@Input`, `@Output`, `@ViewChild` ni `@ContentChild`.
- Bindings del host en la propiedad `host` del decorador. NO DEBEN usarse `@HostBinding` ni `@HostListener`.
- Control flow nativo (`@if`, `@for` con `track`, `@switch`), `@let` para alias locales y `@defer` (con `on viewport` o `on idle`) para lo que está debajo del primer pliegue.
- Bindings `[class.x]` / `[style.x]`. NO DEBEN usarse `ngClass` ni `ngStyle`, ni importarse `CommonModule`.
- `NgOptimizedImage` (`ngSrc`) para toda imagen estática; etiquetas autocerradas (`<app-x />`).
- Componentes pequeños; plantillas inline si son cortas. Rutas de `templateUrl`/`styleUrl` relativas al archivo TS.
- Estilos con Tailwind 4; CSS de componente solo para lo que Tailwind no cubre.

### Formularios

- Todo formulario nuevo DEBE usar **Signal Forms** (`@angular/forms/signals`): modelo en un `signal()`, `form(model, schema)`, directiva `[formField]` en la plantilla, validadores del esquema (`required()`, `email()`, `validate()` para reglas propias) y `submit()` para enviar.
- NO DEBEN usarse formularios template-driven (`ngModel`) ni Reactive Forms en código nuevo.
- La validación del formulario es experiencia de usuario. Al enviar, `ui/` pasa el valor a un caso de uso que vuelve a validar con los value objects del dominio y devuelve un `Result`.
- Accesibilidad: cada campo con `<label>` asociado, errores anunciados (`aria-describedby`, `aria-invalid`) y foco al primer campo inválido al enviar.

### Inyección de dependencias y servicios

- `inject()` en clases de Angular; sin inyección por constructor (excepción: casos de uso puros, ver Arquitectura).
- Singletons nuevos con `@Service()` en vez de `@Injectable({ providedIn: 'root' })`.
- Providers de un módulo en `provide<Module>()` y registrados en la ruta del módulo, no en `app.config.ts`.

### Routing

- Toda ruta de módulo con lazy loading (`loadChildren` / `loadComponent`).
- Parámetros de ruta como `input()` del componente (`withComponentInputBinding()`); nada de suscribirse a `ActivatedRoute`.
- Guards y resolvers funcionales (`CanActivateFn`, `ResolveFn`); NO DEBEN escribirse guards de clase.
- Cada página define su `title` en la ruta.

### Accesibilidad

- DEBE pasar todas las reglas AXE y cumplir WCAG AA: foco gestionado, contraste, ARIA correcto, navegación completa por teclado.
- El lint de plantillas (`templateAccessibility`) es bloqueante.

### Lo último en general

- Angular, TypeScript, Vitest, ESLint y Tailwind se mantienen en su última versión estable. `ng update` al salir cada minor de Angular, aplicando sus migraciones automáticas (`ng generate @angular/core:<migración>`).
- Antes de usar una API se verifica que no esté marcada como deprecada en la versión instalada; si lo está, se usa su reemplazo.
- APIs nativas de la plataforma antes que librerías (`Intl`, `structuredClone`, `URL`, `AbortController`, CSS moderno).
- NO DEBE agregarse una dependencia sin justificar en el pull request por qué no basta Angular o la plataforma.
- Herramientas actuales y no sus antecesoras: Vitest (no Karma/Jasmine), ESLint flat config (no TSLint), builder `@angular/build` (no webpack), Playwright para E2E (no Protractor/Cypress).
