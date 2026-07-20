/* FormSubmit privacy alias for the About-page report form.
   After the destination inbox clicks FormSubmit's one-time activation
   link, FormSubmit issues a random alias string (looks like a hex id).
   Paste it here or set NEXT_PUBLIC_FORMSUBMIT_ALIAS at build time.
   The alias is safe to ship to browsers: it does not reveal the email
   address. While empty, the form falls back to the server relay. */
export const FORMSUBMIT_ALIAS =
  process.env.NEXT_PUBLIC_FORMSUBMIT_ALIAS || "";
