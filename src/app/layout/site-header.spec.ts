import { Component } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { SiteHeader } from './site-header';

@Component({ template: '' })
class BlankPage {}

describe('Site header', () => {
  let fixture: ComponentFixture<SiteHeader>;
  let header: HTMLElement;

  const menuButton = () =>
    header.querySelector<HTMLButtonElement>('button[aria-controls="mobile-menu"]') as HTMLButtonElement;
  const mobileMenu = () => header.querySelector<HTMLElement>('#mobile-menu');
  const mainNavigation = () => header.querySelector<HTMLElement>('nav[aria-label="Principal"]') as HTMLElement;
  const trigger = (label: string) => {
    const button = Array.from(mainNavigation().querySelectorAll('button')).find(
      (element) => element.textContent?.trim() === label,
    );
    if (!button) {
      throw new Error(`No submenu trigger labelled "${label}"`);
    }
    return button;
  };
  const submenuOf = (label: string) => {
    const id = trigger(label).getAttribute('aria-controls');
    return id ? header.querySelector<HTMLElement>(`#${id}`) : null;
  };
  const settle = () => fixture.whenStable();

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '**', component: BlankPage }])],
    });
    fixture = TestBed.createComponent(SiteHeader);
    header = fixture.nativeElement;
    document.body.append(header);
    await settle();
  });

  afterEach(() => header.remove());

  it('links the logo to the home page with an accessible name', () => {
    const home = header.querySelector('a[href="/"]');
    expect(home?.getAttribute('aria-label')).toContain('Pensil.Devs');
  });

  describe('desktop navigation', () => {
    it('offers Productos and Servicios as closed submenus, then Contacto', () => {
      const items = Array.from(mainNavigation().querySelectorAll(':scope > ul > li > :is(a, button)'));

      expect(items.map((item) => item.textContent?.trim())).toEqual(['Productos', 'Servicios', 'Contacto']);
      expect(trigger('Productos').getAttribute('aria-expanded')).toBe('false');
      expect(trigger('Servicios').getAttribute('aria-expanded')).toBe('false');
      expect(submenuOf('Productos')).toBeNull();
      expect(mainNavigation().querySelector('a[href="/contacto"]')).not.toBeNull();
    });

    it('opens the products submenu with each product and a link to all of them', async () => {
      trigger('Productos').click();
      await settle();

      expect(trigger('Productos').getAttribute('aria-expanded')).toBe('true');
      const submenu = submenuOf('Productos');
      expect(submenu?.querySelector('a[href="/productos/pensil-pos"]')?.textContent).toContain('Pensil.Pos');
      expect(submenu?.querySelector('a[href="/productos"]')?.textContent?.trim()).toBe('Ver todos los productos');
    });

    it('opens the services submenu with every service and a link to all of them', async () => {
      trigger('Servicios').click();
      await settle();

      const submenu = submenuOf('Servicios');
      expect(submenu?.querySelectorAll('a[href^="/servicios/"]')).toHaveLength(4);
      expect(submenu?.querySelector('a[href="/servicios/tiendas-en-linea"]')?.textContent).toContain(
        'Tiendas en línea',
      );
      expect(submenu?.querySelector('a[href="/servicios"]')?.textContent?.trim()).toBe('Ver todos los servicios');
    });

    it('keeps only one submenu open at a time', async () => {
      trigger('Productos').click();
      await settle();
      trigger('Servicios').click();
      await settle();

      expect(trigger('Productos').getAttribute('aria-expanded')).toBe('false');
      expect(submenuOf('Productos')).toBeNull();
      expect(submenuOf('Servicios')).not.toBeNull();
    });

    it('closes the submenu when its trigger is activated again', async () => {
      trigger('Productos').click();
      await settle();
      trigger('Productos').click();
      await settle();

      expect(submenuOf('Productos')).toBeNull();
    });

    it('closes the submenu with Escape and returns focus to its trigger', async () => {
      trigger('Servicios').click();
      await settle();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await settle();

      expect(submenuOf('Servicios')).toBeNull();
      expect(document.activeElement).toBe(trigger('Servicios'));
    });

    it('closes the submenu when clicking outside the navigation', async () => {
      trigger('Productos').click();
      await settle();

      document.body.click();
      await settle();

      expect(submenuOf('Productos')).toBeNull();
    });

    it('closes the submenu when focus leaves the navigation', async () => {
      trigger('Productos').click();
      await settle();

      const outside = header.querySelector('a[href="/"]') as HTMLElement;
      trigger('Productos').dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: outside }));
      await settle();

      expect(submenuOf('Productos')).toBeNull();
    });

    it('keeps the submenu open while focus moves inside it', async () => {
      trigger('Productos').click();
      await settle();

      const inside = submenuOf('Productos')?.querySelector('a') as HTMLElement;
      trigger('Productos').dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: inside }));
      await settle();

      expect(submenuOf('Productos')).not.toBeNull();
    });

    it('closes the submenu after choosing a destination', async () => {
      trigger('Servicios').click();
      await settle();

      submenuOf('Servicios')?.querySelector<HTMLAnchorElement>('a[href="/servicios/automatizacion"]')?.click();
      await settle();

      expect(TestBed.inject(Router).url).toBe('/servicios/automatizacion');
      expect(submenuOf('Servicios')).toBeNull();
    });

    it('marks the section of the current page and the current page inside its submenu', async () => {
      await TestBed.inject(Router).navigateByUrl('/productos/pensil-pos');
      await settle();

      expect(trigger('Productos').getAttribute('aria-current')).toBe('true');
      expect(trigger('Servicios').hasAttribute('aria-current')).toBe(false);

      trigger('Productos').click();
      await settle();
      const current = submenuOf('Productos')?.querySelector('a[aria-current="page"]');
      expect(current?.getAttribute('href')).toBe('/productos/pensil-pos');
    });

    it('marks Contacto as the current page', async () => {
      await TestBed.inject(Router).navigateByUrl('/contacto');
      await settle();

      expect(mainNavigation().querySelector('a[aria-current="page"]')?.textContent?.trim()).toBe('Contacto');
    });
  });

  describe('mobile menu', () => {
    it('opens and closes, announcing its state', async () => {
      expect(menuButton().getAttribute('aria-expanded')).toBe('false');
      expect(mobileMenu()).toBeNull();

      menuButton().click();
      await settle();
      expect(menuButton().getAttribute('aria-expanded')).toBe('true');

      menuButton().click();
      await settle();
      expect(mobileMenu()).toBeNull();
    });

    it('shows the products and services groups with their links visible, then Contacto', async () => {
      menuButton().click();
      await settle();

      const groups = Array.from(mobileMenu()?.querySelectorAll('h2') ?? []).map((title) => title.textContent?.trim());
      expect(groups).toEqual(['Productos', 'Servicios']);
      expect(mobileMenu()?.querySelector('a[href="/productos/pensil-pos"]')).not.toBeNull();
      expect(mobileMenu()?.querySelector('a[href="/productos"]')).not.toBeNull();
      expect(mobileMenu()?.querySelectorAll('a[href^="/servicios/"]')).toHaveLength(4);
      expect(mobileMenu()?.querySelector('a[href="/contacto"]')).not.toBeNull();
      expect(mobileMenu()?.querySelector('button')).toBeNull();
    });

    it('closes with Escape and returns focus to the button', async () => {
      menuButton().click();
      await settle();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await settle();

      expect(mobileMenu()).toBeNull();
      expect(document.activeElement).toBe(menuButton());
    });

    it('closes after choosing a destination', async () => {
      menuButton().click();
      await settle();

      mobileMenu()?.querySelector<HTMLAnchorElement>('a[href="/productos/pensil-pos"]')?.click();
      await settle();

      expect(mobileMenu()).toBeNull();
    });
  });
});
