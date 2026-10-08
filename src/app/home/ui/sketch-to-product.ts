import { Component } from '@angular/core';

/**
 * Hero illustration of the brand idea "del boceto al producto": a pencil wireframe
 * behind the finished screen. Decorative: hidden from assistive tech.
 */
@Component({
  selector: 'app-sketch-to-product',
  host: { class: 'block', 'aria-hidden': 'true' },
  template: `
    <div class="relative mx-auto aspect-5/4 w-full max-w-lg">
      <!-- Sketch -->
      <div
        class="absolute top-0 left-0 size-[78%]  -rotate-6 rounded-3xl border-2 border-dashed border-ink-muted/60 bg-paper-raised/60 p-6"
      >
        <div class="h-3 w-1/3 rounded-full border-2 border-ink-muted/50"></div>
        <div class="mt-5 grid grid-cols-3 gap-3">
          <div class="h-14 rounded-xl border-2 border-ink-muted/40"></div>
          <div class="h-14 rounded-xl border-2 border-ink-muted/40"></div>
          <div class="h-14 rounded-xl border-2 border-ink-muted/40"></div>
        </div>
        <svg viewBox="0 0 200 70" class="mt-5 w-full text-ink-muted/60" fill="none">
          <path
            d="M4 60 C 30 40, 50 52, 72 34 S 120 30, 140 18 S 180 14, 196 6"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-dasharray="6 7"
          />
        </svg>
        <svg viewBox="0 0 40 40" class="absolute -right-5 -bottom-5 size-14 rotate-12">
          <path d="M6 34 30 10a3.5 3.5 0 0 1 5 5L11 39 4 40z" class="fill-pencil" />
          <path d="M4 40l2-6 5 5z" class="fill-ink" />
        </svg>
      </div>

      <!-- Product -->
      <div class="absolute right-0 bottom-0 w-[74%] rotate-2 rounded-3xl border border-line bg-paper-raised p-5 text-ink shadow-2xl">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold">Ventas de hoy</p>
          <span class="rounded-full bg-leaf px-2.5 py-1 text-xs font-bold text-on-leaf">+18%</span>
        </div>
        <p class="mt-1 font-display text-3xl font-extrabold tabular-nums">$ 12,480</p>
        <div class="mt-4 flex h-20 items-end gap-2">
          @for (bar of bars; track $index) {
            <div class="flex-1 rounded-t-md" [class]="bar.highlight ? 'bg-leaf' : 'bg-paper-sunken'" [style.height.%]="bar.height"></div>
          }
        </div>
        <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div class="rounded-xl bg-paper px-3 py-2">
            <p class="text-ink-muted">Pedidos</p>
            <p class="font-semibold">24 nuevos</p>
          </div>
          <div class="rounded-xl bg-paper px-3 py-2">
            <p class="text-ink-muted">Avisos</p>
            <p class="font-semibold text-leaf-text">Enviados ✓</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SketchToProduct {
  protected readonly bars = [
    { height: 35, highlight: false },
    { height: 55, highlight: false },
    { height: 42, highlight: false },
    { height: 70, highlight: false },
    { height: 58, highlight: false },
    { height: 92, highlight: true },
  ];
}
