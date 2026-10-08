import { Component } from '@angular/core';
import { Icon, type IconName } from '../../shared/ui/icon';

interface DeliveryStep {
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
  /** The final step is the outcome, so it uses the results color. */
  readonly isOutcome?: boolean;
}

/** PROVISIONAL copy. */
const DELIVERY_STEPS: readonly DeliveryStep[] = [
  {
    icon: 'handshake',
    title: 'Platicamos',
    description: 'Entendemos tu negocio y lo que quieres lograr. Sin tecnicismos y sin compromiso.',
  },
  {
    icon: 'pencil',
    title: 'Bocetamos',
    description: 'Diseñamos un prototipo que puedes ver y tocar antes de escribir una línea de código.',
  },
  {
    icon: 'code',
    title: 'Construimos',
    description: 'Avanzamos por etapas cortas y te mostramos avances reales en cada una.',
  },
  {
    icon: 'rocket',
    title: 'Lanzamos y acompañamos',
    description: 'Publicamos, capacitamos a tu equipo y seguimos cerca para lo que necesites.',
    isOutcome: true,
  },
];

/** "Del boceto al producto": how Pensil.Devs delivers every project. */
@Component({
  selector: 'app-delivery-process',
  imports: [Icon],
  template: `
    <ol class="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      @for (step of steps; track step.title; let index = $index) {
        <li class="card relative p-6">
          <div class="flex items-center justify-between">
            <span
              class="grid size-12 place-items-center rounded-2xl"
              [class]="step.isOutcome ? 'bg-leaf text-on-leaf' : 'bg-pencil text-on-pencil'"
            >
              <app-icon [name]="step.icon" class="size-6" />
            </span>
            <span class="font-display text-4xl font-extrabold text-line" aria-hidden="true">
              {{ index + 1 }}
            </span>
          </div>
          <h3 class="mt-5 text-xl font-bold">
            <span class="sr-only">Paso {{ index + 1 }}: </span>{{ step.title }}
          </h3>
          <p class="mt-2 text-ink-muted">{{ step.description }}</p>
        </li>
      }
    </ol>
  `,
})
export class DeliveryProcess {
  protected readonly steps = DELIVERY_STEPS;
}
