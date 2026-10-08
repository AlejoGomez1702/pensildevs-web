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

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '**', component: BlankPage }])],
    });
    fixture = TestBed.createComponent(SiteHeader);
    header = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('links the logo to the home page with an accessible name', () => {
    const home = header.querySelector('a[href="/"]');
    expect(home?.getAttribute('aria-label')).toContain('Pensil.Devs');
  });

  it('opens and closes the mobile menu, announcing its state', async () => {
    expect(menuButton().getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu()).toBeNull();

    menuButton().click();
    await fixture.whenStable();

    expect(menuButton().getAttribute('aria-expanded')).toBe('true');
    expect(mobileMenu()?.querySelectorAll('a').length).toBeGreaterThanOrEqual(3);

    menuButton().click();
    await fixture.whenStable();
    expect(mobileMenu()).toBeNull();
  });

  it('closes the mobile menu with Escape and returns focus to the button', async () => {
    menuButton().click();
    await fixture.whenStable();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();

    expect(mobileMenu()).toBeNull();
    expect(document.activeElement).toBe(menuButton());
  });

  it('closes the mobile menu after choosing a destination', async () => {
    menuButton().click();
    await fixture.whenStable();

    mobileMenu()?.querySelector<HTMLAnchorElement>('a[href="/servicios"]')?.click();
    await fixture.whenStable();

    expect(mobileMenu()).toBeNull();
  });

  it('marks the link of the current page', async () => {
    await TestBed.inject(Router).navigateByUrl('/servicios');
    await fixture.whenStable();

    const current = header.querySelector('nav[aria-label="Principal"] a[aria-current="page"]');
    expect(current?.textContent?.trim()).toBe('Servicios');
  });
});
