import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { err, ok, type Result } from '../../shared/kernel/result';
import { ContactChannel, type ContactChannelError } from '../application/contact-channel';
import { SendContactRequest } from '../application/send-contact-request';
import type { ContactRequest } from '../domain/contact-request';
import { ContactPage } from './contact-page';

class FakeContactChannel extends ContactChannel {
  readonly sent: ContactRequest[] = [];
  blockWith: string | null = null;

  send(request: ContactRequest): Promise<Result<void, ContactChannelError>> {
    if (this.blockWith) {
      return Promise.resolve(err({ kind: 'channel-blocked', fallbackUrl: this.blockWith }));
    }
    this.sent.push(request);
    return Promise.resolve(ok(undefined));
  }
}

describe('Contact page', () => {
  let fixture: ComponentFixture<ContactPage>;
  let channel: FakeContactChannel;
  let page: HTMLElement;

  const field = <T extends HTMLElement>(label: string) => {
    const control = Array.from(page.querySelectorAll('label')).find((element) =>
      element.textContent?.includes(label),
    )?.control;
    if (!control) {
      throw new Error(`No control labelled "${label}"`);
    }
    return control as unknown as T;
  };

  const type = (label: string, value: string) => {
    const control = field<HTMLInputElement>(label);
    control.value = value;
    // Browsers fire both events when a value changes (select included).
    control.dispatchEvent(new Event('input'));
    control.dispatchEvent(new Event('change'));
  };

  const submit = async () => {
    page.querySelector<HTMLButtonElement>('button[type="submit"]')?.click();
    await fixture.whenStable();
  };

  const fillValidForm = () => {
    type('Nombre', 'Ana López');
    type('Correo', 'ana@negocio.mx');
    type('Cuéntanos', 'Quiero vender en línea mis lentes.');
  };

  beforeEach(async () => {
    channel = new FakeContactChannel();
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: SendContactRequest, useValue: new SendContactRequest(channel) }],
    });
    fixture = TestBed.createComponent(ContactPage);
    page = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('does not send an incomplete form, explains each problem and focuses the first one', async () => {
    type('Correo', 'ana@');

    await submit();

    expect(channel.sent).toHaveLength(0);
    const name = field<HTMLInputElement>('Nombre');
    expect(document.activeElement).toBe(name);
    expect(name.getAttribute('aria-invalid')).toBe('true');
    const nameError = page.querySelector(`#${name.getAttribute('aria-describedby')}`);
    expect(nameError?.textContent).toContain('Escribe tu nombre');
    expect(page.textContent).toContain('Escribe un correo válido');
    expect(page.textContent).toContain('al menos 10 caracteres');
  });

  it('sends a valid request and confirms that WhatsApp opened', async () => {
    fillValidForm();
    type('¿Qué te interesa?', 'Tiendas en línea');

    await submit();

    expect(channel.sent).toHaveLength(1);
    expect(channel.sent[0]?.interest).toBe('Tiendas en línea');
    expect(page.querySelector('[role="status"]')?.textContent).toContain('Abrimos WhatsApp');
    expect(field<HTMLInputElement>('Nombre').value).toBe('');
  });

  it('offers a manual link and the email when the browser blocks WhatsApp', async () => {
    channel.blockWith = 'https://wa.me/520000000000?text=hola';
    fillValidForm();

    await submit();

    const status = page.querySelector('[role="status"]');
    expect(status?.textContent).toContain('no pudo abrir WhatsApp');
    expect(status?.querySelector('a[href^="https://wa.me/"]')?.getAttribute('href')).toBe(
      'https://wa.me/520000000000?text=hola',
    );
    expect(status?.querySelector('a[href^="mailto:"]')).not.toBeNull();
  });

  it('preselects the interest that brought the visitor here', async () => {
    fixture.componentRef.setInput('interest', 'automatizacion');
    await fixture.whenStable();

    expect(field<HTMLSelectElement>('¿Qué te interesa?').value).toBe('Automatización e integraciones');
  });
});
