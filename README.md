# LMS Certimedia — Landing

Landing comercial de una sola página para el **LMS Certimedia**, dirigida a OTECs chilenas. Objetivo: convertir visitas en leads (demo/asesoría gratuita de 1 hora o formulario de contacto).

Stack: **Astro 5** (salida estática) + **Tailwind CSS**. JS mínimo y vanilla para menú móvil, acordeón de FAQ, validación del formulario y reveal-on-scroll.

## Requisitos

- Node.js 18+ (probado con Node 24)
- npm

## Correr en local

```bash
npm install
npm run dev
```

El sitio queda en `http://localhost:4321`.

## Build y preview de producción

```bash
npm run build      # genera el sitio estático en dist/
npm run preview    # sirve dist/ localmente
```

El contenido de `dist/` es 100% estático: se puede desplegar en Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, o cualquier hosting de archivos estáticos.

## Formulario de contacto (`PUBLIC_FORM_ENDPOINT`)

El formulario envía un `POST` con JSON a un endpoint configurable por variable de entorno.

- Copia `.env.example` a `.env` y define el endpoint:

  ```bash
  cp .env.example .env
  ```

  ```dotenv
  # .env
  PUBLIC_FORM_ENDPOINT=https://tu-webhook-o-hubspot/endpoint
  ```

- **Importante:** el prefijo `PUBLIC_` es obligatorio. El sitio es estático y el envío ocurre en el navegador, por lo que Astro solo expone al cliente las variables que empiezan con `PUBLIC_`.
- Si `PUBLIC_FORM_ENDPOINT` queda **vacío**, el formulario **simula un envío exitoso** (modo desarrollo), sin llamar a ningún servicio.
- Payload enviado:

  ```json
  {
    "name": "...",
    "email": "...",
    "phone": "...",
    "otec": "...",
    "volume": "1-10 | 11-50 | 51-200 | 200+",
    "message": "...",
    "source": "landing-lms-certimedia"
  }
  ```

Para conectarlo a **HubSpot**, apunta `PUBLIC_FORM_ENDPOINT` a un webhook (HubSpot Workflows / Forms API) o a una función intermedia que reciba este JSON.

El formulario incluye un **honeypot** anti-spam (`company_website`): si un bot lo completa, el envío se descarta en silencio.

## Editar el contenido (copy)

Todo el texto de la página está centralizado en:

```
src/content/copy.ts
```

Se puede ajustar títulos, tarjetas, FAQ, datos de contacto, etc. **sin tocar el layout**. Los componentes de `src/components/` solo consumen ese archivo.

## Cambiar la marca / paleta

- **Logo:** `public/logotipo-certimedia.svg` (logo real de Certimedia).
- **Color de acento:** derivado del azul del logo (`#0A5EFF`). Para cambiar toda la paleta, edita las variables CSS en `src/styles/global.css` (`--accent-*` e `--ink-*`). Toda la UI usa clases `accent-*` / `ink-*` de Tailwind, así que no hay que tocar componentes.

## Analítica

No se carga ningún script de terceros por defecto. En `src/layouts/Layout.astro` se define un stub:

- `window.dataLayer` (array)
- `window.trackEvent(name, params)`

Los CTAs tienen `data-track` y se trackean automáticamente (`src/scripts/analytics.js`). El envío del formulario dispara `form_submit_success` / `form_submit_error`. Para conectar GA4 / GTM, solo hay que consumir `window.dataLayer` o reemplazar `trackEvent`.

## SEO

- `title` y `meta description` orientados a "LMS para OTEC".
- Open Graph y Twitter Card.
- Favicon SVG (`public/favicon.svg`).
- `sitemap-index.xml` generado en build (`@astrojs/sitemap`).
- `robots.txt` en `public/`.
- Datos estructurados JSON-LD (`Organization`) con datos reales de Certimedia.

## Estructura

```
public/            # logo, favicon, robots.txt (assets estáticos)
src/
  components/      # un componente por sección + Icon + mockup
  content/copy.ts  # TODO el texto editable
  layouts/         # Layout.astro (head, SEO, scripts globales)
  pages/index.astro
  scripts/         # reveal-on-scroll + analytics (vanilla JS)
  styles/global.css
```

## TODO pendientes (requieren datos reales)

Buscar `TODO` en el código. Los principales:

1. **FAQ "¿Puedo migrar mis cursos actuales?"** (`src/content/copy.ts`): el brief pide esta pregunta, pero no se entregó información verificada del proceso de migración. La pregunta quedó **fuera** del listado para no inventar una respuesta. Agregarla cuando se confirme el dato.
2. **`og:image`** (`src/layouts/Layout.astro`): falta una imagen social 1200×630 de marca.
3. **Favicon adicional** (`src/layouts/Layout.astro`): sumar `favicon.ico` / `apple-touch-icon` para navegadores sin soporte de SVG.
4. **Dominio de producción** (`astro.config.mjs`): confirmar/ajustar `SITE_URL` antes de desplegar (afecta canonical y sitemap).

> Nota: las cifras del panel del hero (96%, 12 cohortes, 82/64/45%, etc.) son **ilustrativas dentro de un mockup** rotulado como tal, no métricas reales de clientes.
