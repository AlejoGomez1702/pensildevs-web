import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createContactRequest } from '../domain/contact-request';
import { companyWhatsAppUrl } from '../domain/company-contact';
import { WhatsAppContactChannel } from './whatsapp-contact-channel';

function validRequest() {
  const result = createContactRequest({
    name: 'Ana López',
    email: 'ana@negocio.mx',
    interest: '',
    message: 'Quiero una tienda en línea.',
  });
  if (!result.ok) {
    throw new Error('Test data must be valid');
  }
  return result.value;
}

describe('WhatsApp contact channel', () => {
  let channel: WhatsAppContactChannel;
  let openSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [WhatsAppContactChannel] });
    channel = TestBed.inject(WhatsAppContactChannel);
    const window = TestBed.inject(DOCUMENT).defaultView as Window;
    openSpy = vi.spyOn(window, 'open');
  });

  it('opens a new WhatsApp conversation with the composed message', async () => {
    const opened = { opener: window } as unknown as Window;
    openSpy.mockReturnValue(opened);

    const result = await channel.send(validRequest());

    expect(result.ok).toBe(true);
    const [url, target] = openSpy.mock.calls[0] ?? [];
    expect(String(url)).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(decodeURIComponent(String(url))).toContain('Quiero una tienda en línea.');
    expect(target).toBe('_blank');
    expect(opened.opener).toBeNull();
  });

  it('reports a blocked window with the same link to open it by hand', async () => {
    openSpy.mockReturnValue(null);

    const result = await channel.send(validRequest());

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.kind).toBe('channel-blocked');
      expect(result.error.fallbackUrl.startsWith(companyWhatsAppUrl())).toBe(true);
    }
  });
});
