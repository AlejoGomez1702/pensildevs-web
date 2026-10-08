import { err, ok, type Result } from '../../shared/kernel/result';
import { Email } from './email';

export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 1000;

export type ContactRequestError =
  | 'name-required'
  | 'email-invalid'
  | 'message-too-short'
  | 'message-too-long';

export interface ContactRequestInput {
  readonly name: string;
  readonly email: string;
  readonly interest: string;
  readonly message: string;
}

export interface ContactRequest {
  readonly name: string;
  readonly email: Email;
  /** What the visitor wants to talk about, or `null` when they did not say. */
  readonly interest: string | null;
  readonly message: string;
}

export function messageLengthError(message: string): ContactRequestError | null {
  const length = message.trim().length;
  if (length < MESSAGE_MIN_LENGTH) {
    return 'message-too-short';
  }
  return length > MESSAGE_MAX_LENGTH ? 'message-too-long' : null;
}

export function createContactRequest(
  input: ContactRequestInput,
): Result<ContactRequest, ContactRequestError[]> {
  const name = input.name.trim();
  const email = Email.create(input.email);
  const messageError = messageLengthError(input.message);

  const errors: ContactRequestError[] = [];
  if (!name) {
    errors.push('name-required');
  }
  if (!email) {
    errors.push('email-invalid');
  }
  if (messageError) {
    errors.push(messageError);
  }

  if (!email || errors.length > 0) {
    return err(errors);
  }
  return ok({
    name,
    email,
    interest: input.interest.trim() || null,
    message: input.message.trim(),
  });
}
