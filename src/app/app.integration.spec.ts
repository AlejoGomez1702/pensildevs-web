import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { App } from './app';
import { appConfig } from './app.config';

describe('App composition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: appConfig.providers,
    });
  });

  it('boots with the real application providers and renders the router outlet', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('router-outlet')).not.toBeNull();
  });
});
