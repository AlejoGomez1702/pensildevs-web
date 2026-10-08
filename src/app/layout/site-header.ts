import { Component, signal, viewChild, type ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WhatsAppLink } from '../contact';
import { Icon } from '../shared/ui/icon';
import { Logo } from '../shared/ui/logo';
import { NAVIGATION_LINKS } from './navigation-links';

@Component({
  selector: 'app-site-header',
  imports: [Icon, Logo, RouterLink, RouterLinkActive, WhatsAppLink],
  host: {
    class: 'sticky top-0 z-40 block border-b border-line/70 bg-paper/85 backdrop-blur-md',
    role: 'banner',
    '(document:keydown.escape)': 'closeMenuFromKeyboard()',
  },
  template: `
    <div class="container-page flex h-18 items-center justify-between gap-6">
      <a routerLink="/" aria-label="Pensil.Devs, ir al inicio" class="rounded-lg">
        <app-logo />
      </a>

      <nav aria-label="Principal" class="hidden md:block">
        <ul class="flex items-center gap-1">
          @for (link of links; track link.path) {
            <li>
              <a
                [routerLink]="link.path"
                routerLinkActive="bg-paper-sunken text-ink"
                ariaCurrentWhenActive="page"
                class="rounded-full px-4 py-2 font-medium text-ink-muted transition-colors hover:text-ink"
              >{{ link.label }}</a>
            </li>
          }
        </ul>
      </nav>

      <div class="hidden md:block">
        <app-whatsapp-link message="Hola, Pensil.Devs. Me gustaría platicar sobre un proyecto.">
          Hablemos
        </app-whatsapp-link>
      </div>

      <button
        #menuButton
        type="button"
        class="grid size-12 place-items-center rounded-full border border-line bg-paper-raised md:hidden"
        aria-controls="mobile-menu"
        [attr.aria-expanded]="menuOpen()"
        (click)="toggleMenu()"
      >
        <app-icon [name]="menuOpen() ? 'close' : 'menu'" class="size-6" />
        <span class="sr-only">{{ menuOpen() ? 'Cerrar menú' : 'Abrir menú' }}</span>
      </button>
    </div>

    @if (menuOpen()) {
      <nav id="mobile-menu" aria-label="Menú móvil" class="border-t border-line bg-paper md:hidden">
        <ul class="container-page grid gap-1 py-4">
          @for (link of links; track link.path) {
            <li>
              <a
                [routerLink]="link.path"
                routerLinkActive="bg-paper-sunken"
                ariaCurrentWhenActive="page"
                class="flex min-h-12 items-center rounded-xl px-4 text-lg font-semibold"
                (click)="closeMenu()"
              >{{ link.label }}</a>
            </li>
          }
          <li class="mt-3 grid">
            <app-whatsapp-link message="Hola, Pensil.Devs. Me gustaría platicar sobre un proyecto." />
          </li>
        </ul>
      </nav>
    }
  `,
})
export class SiteHeader {
  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');

  protected readonly links = NAVIGATION_LINKS;
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected closeMenuFromKeyboard(): void {
    if (!this.menuOpen()) {
      return;
    }
    this.closeMenu();
    this.menuButton().nativeElement.focus();
  }
}
