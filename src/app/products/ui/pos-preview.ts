import { Component } from '@angular/core';

/** Illustrative mock of the Pensil.Pos sale screen. Decorative: hidden from assistive tech. */
@Component({
  selector: 'app-pos-preview',
  host: { class: 'block', 'aria-hidden': 'true' },
  template: `
    <div class="relative mx-auto w-full max-w-md">
      <div class="absolute -inset-4 -z-10 rotate-2 rounded-[2rem] bg-pencil/25 blur-2xl"></div>
      <div class="overflow-hidden rounded-3xl border border-line bg-paper-raised text-ink shadow-2xl">
        <div class="flex items-center justify-between border-b border-line px-5 py-3">
          <span class="font-display font-extrabold">Pensil<span class="text-pencil-text">.Pos</span></span>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-leaf-soft px-3 py-1 text-xs font-semibold text-leaf-text"><span class="size-1.5 rounded-full bg-leaf"></span>Caja 1 · Turno abierto</span>
        </div>
        <div class="grid gap-3 p-5">
          <div class="flex items-center gap-3 rounded-xl border border-dashed border-line px-3 py-2 text-sm text-ink-muted">
            <span class="size-4 rounded-sm border-2 border-current"></span> Buscar o escanear producto…
          </div>
          <ul class="grid gap-2 text-sm">
            @for (item of items; track item.name) {
              <li class="flex items-center justify-between rounded-xl bg-paper px-3 py-2.5">
                <span><span class="font-semibold">{{ item.quantity }}×</span> {{ item.name }}</span>
                <span class="tabular-nums">{{ item.total }}</span>
              </li>
            }
          </ul>
          <div class="flex items-end justify-between border-t border-line pt-4">
            <div>
              <p class="text-xs text-ink-muted">Total a cobrar</p>
              <p class="font-display text-3xl font-extrabold tabular-nums">$ 418.00</p>
            </div>
            <span class="rounded-full bg-pencil px-5 py-3 text-sm font-bold text-on-pencil">Cobrar</span>
          </div>
        </div>
      </div>
      <div class="absolute -bottom-12 left-4 hidden rotate-[-3deg] rounded-2xl border border-line bg-paper-raised px-4 py-3 text-sm text-ink shadow-xl sm:block">
        <p class="font-semibold">Stock bajo</p>
        <p class="text-ink-muted">Café molido · quedan 3</p>
      </div>
    </div>
  `,
})
export class PosPreview {
  protected readonly items = [
    { quantity: 2, name: 'Café de olla 500 g', total: '$ 238.00' },
    { quantity: 1, name: 'Pan dulce surtido', total: '$ 95.00' },
    { quantity: 3, name: 'Agua mineral', total: '$ 85.00' },
  ];
}
