import { describe, expect, it } from 'vitest';
import { whatsAppChatUrl } from './whatsapp-chat-url';

describe('WhatsApp chat URL', () => {
  it('opens a chat with the phone digits only', () => {
    expect(whatsAppChatUrl('+52 (33) 1234-5678')).toBe('https://wa.me/523312345678');
  });

  it('pre-fills the message keeping accents, symbols and line breaks intact', () => {
    const url = whatsAppChatUrl('+523312345678', 'Hola, ¿cotizan tiendas?\n¡Gracias! & más');

    expect(url).toBe(
      'https://wa.me/523312345678?text=Hola%2C%20%C2%BFcotizan%20tiendas%3F%0A%C2%A1Gracias!%20%26%20m%C3%A1s',
    );
    expect(decodeURIComponent(new URL(url).searchParams.get('text') ?? '')).toBe(
      'Hola, ¿cotizan tiendas?\n¡Gracias! & más',
    );
  });
});
