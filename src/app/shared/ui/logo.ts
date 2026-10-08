import { Component } from '@angular/core';

/** Pensil.Devs wordmark: a pencil tracing a stroke, followed by the name. */
@Component({
  selector: 'app-logo',
  host: { class: 'inline-flex items-center gap-2' },
  template: `
    <svg viewBox="0 0 32 32" class="size-8 shrink-0" aria-hidden="true">
      <rect width="32" height="32" rx="8" class="fill-graphite" />
      <path d="M9 23.5 21.2 11.3a2.3 2.3 0 0 1 3.3 3.3L12.3 26.8 8 28z" class="fill-pencil" />
      <path d="M8 28l1-4.5 3.3 3.3z" class="fill-on-graphite" />
      <path d="M19.6 12.9l3.3 3.3" class="stroke-graphite" stroke-width="1.4" />
      <path
        d="M6 9.5c2.5-1.8 4.6-1.8 6.4 0"
        fill="none"
        class="stroke-on-graphite"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>
    <span class="font-display text-xl font-extrabold tracking-tight">
      Pensil<span class="text-pencil-text">.Devs</span>
    </span>
  `,
})
export class Logo {}
