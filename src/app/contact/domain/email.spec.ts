import { describe, expect, it } from 'vitest';
import { Email } from './email';

describe('Email', () => {
  it('accepts a well-formed address and normalizes surrounding spaces and case', () => {
    expect(Email.create('  Ana@Negocio.MX ')?.value).toBe('ana@negocio.mx');
  });

  it.each(['', 'ana', 'ana@', '@negocio.mx', 'ana@negocio', 'ana @negocio.mx'])(
    'rejects "%s"',
    (raw) => {
      expect(Email.create(raw)).toBeNull();
      expect(Email.isValid(raw)).toBe(false);
    },
  );
});
