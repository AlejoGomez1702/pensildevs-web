import {
  emailError,
  maxLengthError,
  minLengthError,
  requiredError,
  schema,
  validate,
  type FieldTree,
} from '@angular/forms/signals';
import {
  MESSAGE_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  messageLengthError,
  type ContactRequestInput,
} from '../domain/contact-request';
import { Email } from '../domain/email';

export type ContactFormModel = { -readonly [K in keyof ContactRequestInput]: ContactRequestInput[K] };

export const EMPTY_CONTACT_FORM: ContactFormModel = { name: '', email: '', interest: '', message: '' };

/**
 * Instant feedback for the visitor. It reuses the domain rules so the form and the
 * use case never disagree; the use case still validates again on submit.
 */
export const contactFormSchema = schema<ContactFormModel>((path) => {
  validate(path.name, ({ value }) =>
    value().trim() ? undefined : requiredError({ message: 'Escribe tu nombre.' }),
  );
  validate(path.email, ({ value }) =>
    Email.isValid(value())
      ? undefined
      : emailError({ message: 'Escribe un correo válido, por ejemplo ana@negocio.mx.' }),
  );
  validate(path.message, ({ value }) => {
    switch (messageLengthError(value())) {
      case 'message-too-short':
        return minLengthError(MESSAGE_MIN_LENGTH, {
          message: `Cuéntanos un poco más: al menos ${MESSAGE_MIN_LENGTH} caracteres.`,
        });
      case 'message-too-long':
        return maxLengthError(MESSAGE_MAX_LENGTH, {
          message: `Tu mensaje supera los ${MESSAGE_MAX_LENGTH} caracteres; resúmelo un poco.`,
        });
      default:
        return undefined;
    }
  });
});

export function focusFirstInvalidField(form: FieldTree<ContactFormModel>): void {
  form().errorSummary()[0]?.fieldTree().focusBoundControl();
}
