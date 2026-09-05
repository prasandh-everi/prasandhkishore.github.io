/** Validated contact details used to open a prefilled Gmail message. */
export interface ContactRequest {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}
