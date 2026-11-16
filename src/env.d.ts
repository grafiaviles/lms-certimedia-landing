/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Endpoint del formulario de contacto (HubSpot, webhook, etc.). Vacío = envío simulado. */
  readonly PUBLIC_FORM_ENDPOINT?: string;
  /** URL /exec de la app web de Apps Script que registra los leads en el Sheet de scoring. Vacío = no se envía. */
  readonly PUBLIC_LEADS_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
