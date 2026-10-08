import type { ContactRequest } from './contact-request';

/** The text Pensil.Devs receives when a visitor sends the contact form. */
export function contactRequestMessage(request: ContactRequest): string {
  const lines = [`Hola, Pensil.Devs. Soy ${request.name}.`];
  if (request.interest) {
    lines.push(`Me interesa: ${request.interest}.`);
  }
  lines.push('', request.message, '', `Mi correo: ${request.email.value}`);
  return lines.join('\n');
}
