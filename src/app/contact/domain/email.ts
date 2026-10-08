const MIN_TOP_LEVEL_DOMAIN_LENGTH = 2;
const WHITESPACE = /\s/;

/** `local@domain.tld`: one `@`, no spaces, a dotted domain. Checked without a backtracking regex. */
function isWellFormed(address: string): boolean {
  const at = address.indexOf('@');
  if (WHITESPACE.test(address) || at < 1 || at !== address.lastIndexOf('@')) {
    return false;
  }
  const domain = address.slice(at + 1);
  const lastDot = domain.lastIndexOf('.');
  return lastDot > 0 && domain.length - lastDot - 1 >= MIN_TOP_LEVEL_DOMAIN_LENGTH;
}

export class Email {
  private constructor(readonly value: string) {}

  static create(raw: string): Email | null {
    const normalized = raw.trim().toLowerCase();
    return isWellFormed(normalized) ? new Email(normalized) : null;
  }

  static isValid(raw: string): boolean {
    return Email.create(raw) !== null;
  }
}
