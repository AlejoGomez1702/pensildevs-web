const WHATSAPP_CHAT_BASE_URL = 'https://wa.me/';

/** Link that opens a WhatsApp conversation, optionally with a pre-filled message. */
export function whatsAppChatUrl(phone: string, text?: string): string {
  const url = `${WHATSAPP_CHAT_BASE_URL}${phone.replace(/\D/g, '')}`;
  return text ? `${url}?text=${encodeURIComponent(text)}` : url;
}
