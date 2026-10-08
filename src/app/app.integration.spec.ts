import { DOCUMENT } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { App } from './app';
import { appConfig } from './app.config';

describe('Site navigation (real routes and providers)', () => {
  let fixture: ComponentFixture<App>;
  let document: Document;

  const visit = async (url: string) => {
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
  };
  const heading = () => (fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent?.trim();
  const pageTitle = () => TestBed.inject(Title).getTitle();
  const description = () => TestBed.inject(Meta).getTag('name="description"')?.content;

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [App], providers: appConfig.providers });
    document = TestBed.inject(DOCUMENT);
    vi.spyOn(document.defaultView as Window, 'scrollTo').mockImplementation(() => undefined);
    fixture = TestBed.createComponent(App);
    await visit('/');
  });

  it('shows the value proposition on the home page with exactly one main heading', () => {
    expect(heading()).toContain('simplifica');
    expect((fixture.nativeElement as HTMLElement).querySelectorAll('h1')).toHaveLength(1);
    expect(pageTitle()).toBe('Pensil.Devs · Software que le simplifica la vida a tu negocio');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Pensil.Pos');
  });

  it('lists every service and opens the detail of one', async () => {
    await visit('/servicios');
    expect(pageTitle()).toBe('Servicios · Pensil.Devs');
    expect((fixture.nativeElement as HTMLElement).querySelectorAll('app-service-card')).toHaveLength(4);

    await visit('/servicios/tiendas-en-linea');
    expect(heading()).toBe('Tiendas en línea');
    expect(pageTitle()).toBe('Tiendas en línea · Pensil.Devs');
    expect(description()).toContain('catálogo');
  });

  it('explains when a service does not exist and links back to the list', async () => {
    await visit('/servicios/no-existe');

    expect(heading()).toBe('No encontramos ese servicio');
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('main a[href="/servicios"]'),
    ).not.toBeNull();
  });

  it('lists the products catalog with its own title and description', async () => {
    await visit('/productos');

    expect(heading()).toContain('Productos');
    expect(pageTitle()).toBe('Productos · Pensil.Devs');
    expect(description()).toContain('Pensil.Pos');
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('main app-product-card a[href="/productos/pensil-pos"]'),
    ).not.toBeNull();
  });

  it('presents Pensil.Pos with its features', async () => {
    await visit('/productos/pensil-pos');

    expect(heading()).toBe('Pensil.Pos');
    expect(pageTitle()).toBe('Pensil.Pos, punto de venta · Pensil.Devs');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Cortes de caja claros');
  });

  it('opens the contact form with the interest chosen from a service', async () => {
    await visit('/contacto?interest=automatizacion');

    expect(heading()).toContain('Cuéntanos qué');
    const interest = (fixture.nativeElement as HTMLElement).querySelector<HTMLSelectElement>('#contact-interest');
    expect(interest?.value).toBe('Automatización e integraciones');
  });

  it('shows a helpful page for unknown addresses', async () => {
    await visit('/esto-no-existe');

    expect(heading()).toContain('boceto');
    expect(pageTitle()).toBe('Página no encontrada · Pensil.Devs');
  });

  it('moves focus to the main content after navigating, for screen reader users', async () => {
    await visit('/servicios');

    expect(document.activeElement?.id).toBe('main-content');
  });
});
