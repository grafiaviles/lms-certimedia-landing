/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Endpoint del formulario de contacto (HubSpot, webhook, etc.). Vacío = envío simulado. */
  readonly PUBLIC_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
