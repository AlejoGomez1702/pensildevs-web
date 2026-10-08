import { describe, expect, it } from 'vitest';
import { contactRequestMessage } from './contact-request-message';
import { createContactRequest, type ContactRequestInput } from './contact-request';

function request(input: Partial<ContactRequestInput> = {}) {
  const result = createContactRequest({
    name: 'Ana López',
    email: 'ana@negocio.mx',
    interest: 'Pensil.Pos',
    message: 'Tengo dos sucursales y quiero una demo.',
    ...input,
  });
  if (!result.ok) {
    throw new Error('Test data must be valid');
  }
  return result.value;
}

describe('Contact request message', () => {
  it('includes name, interest, message and email so Pensil.Devs can answer', () => {
    expect(contactRequestMessage(request())).toBe(
      [
        'Hola, Pensil.Devs. Soy Ana López.',
        'Me interesa: Pensil.Pos.',
        '',
        'Tengo dos sucursales y quiero una demo.',
        '',
        'Mi correo: ana@negocio.mx',
      ].join('\n'),
    );
  });

  it('omits the interest line when none was chosen', () => {
    expect(contactRequestMessage(request({ interest: '' }))).not.toContain('Me interesa');
  });
});
