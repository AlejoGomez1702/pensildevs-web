import { describe, expect, it } from 'vitest';
import {
  createContactRequest,
  MESSAGE_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  type ContactRequestInput,
} from './contact-request';

const validInput: ContactRequestInput = {
  name: 'Ana López',
  email: 'ana@negocio.mx',
  interest: 'Tiendas en línea',
  message: 'Quiero vender mis productos en línea.',
};

describe('Contact request', () => {
  it('is created from valid data with trimmed values', () => {
    const result = createContactRequest({ ...validInput, name: '  Ana López ' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.name).toBe('Ana López');
      expect(result.value.email.value).toBe('ana@negocio.mx');
      expect(result.value.interest).toBe('Tiendas en línea');
    }
  });

  it('treats an empty interest as not specified', () => {
    const result = createContactRequest({ ...validInput, interest: '  ' });

    expect(result.ok && result.value.interest).toBeNull();
  });

  it('requires a name that is not only spaces', () => {
    expect(createContactRequest({ ...validInput, name: '   ' })).toEqual({
      ok: false,
      error: ['name-required'],
    });
  });

  it('requires a valid email', () => {
    expect(createContactRequest({ ...validInput, email: 'ana@' })).toEqual({
      ok: false,
      error: ['email-invalid'],
    });
  });

  it(`requires a message of at least ${MESSAGE_MIN_LENGTH} characters, ignoring surrounding spaces`, () => {
    const result = createContactRequest({ ...validInput, message: '   Hola    ' });

    expect(result).toEqual({ ok: false, error: ['message-too-short'] });
  });

  it(`rejects messages longer than ${MESSAGE_MAX_LENGTH} characters`, () => {
    const result = createContactRequest({
      ...validInput,
      message: 'a'.repeat(MESSAGE_MAX_LENGTH + 1),
    });

    expect(result).toEqual({ ok: false, error: ['message-too-long'] });
  });

  it('reports every problem at once, in form order', () => {
    const result = createContactRequest({ name: '', email: '', interest: '', message: '' });

    expect(result).toEqual({
      ok: false,
      error: ['name-required', 'email-invalid', 'message-too-short'],
    });
  });
});
