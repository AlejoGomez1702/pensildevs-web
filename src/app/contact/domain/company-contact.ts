import { whatsAppChatUrl } from './whatsapp-chat-url';

/**
 * How visitors reach Pensil.Devs.
 * PROVISIONAL: replace with the real WhatsApp number (E.164) and mailbox before launch.
 */
export const COMPANY_CONTACT = {
  whatsAppPhone: '+520000000000',
  email: 'hola@pensildevs.com',
} as const;

export function companyWhatsAppUrl(text?: string): string {
  return whatsAppChatUrl(COMPANY_CONTACT.whatsAppPhone, text);
}
