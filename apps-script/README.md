# Leads Scoring Sheet — Certimedia

Google Sheet + Apps Script que recibe cada lead del formulario de la landing
([lms-certimedia-landing](https://grafiaviles.github.io/lms-certimedia-landing/)),
lo clasifica automáticamente en **Verde / Amarillo / Rojo** con un puntaje de
0 a 100, y te avisa por correo.

No requiere contraseñas ni conectores: se instala pegando un archivo en un
Sheet en blanco de tu cuenta (`caviles@adalia.app`) y ejecutando una función.

## 1. Crea el Sheet y pega el script

1. Entra a [sheets.new](https://sheets.new) con tu cuenta `caviles@adalia.app`
   y nómbralo, por ejemplo, **"Leads — Certimedia Landing"**.
2. Ve a **Extensiones → Apps Script**. Se abre un editor con un archivo
   `Code.gs` vacío (con una función `myFunction()` de ejemplo).
3. Borra todo ese contenido y pega completo el archivo [`Code.gs`](./Code.gs)
   de esta carpeta.
4. Guarda (ícono de disquete o `Cmd/Ctrl + S`). Ponle un nombre al proyecto,
   por ejemplo "Leads Certimedia".

## 2. Ejecuta `setup()`

1. En la barra superior del editor, donde dice "Seleccionar función", elige
   **`setup`**.
2. Haz clic en **Ejecutar** (▶).
3. La primera vez te va a pedir autorización ("Esta app no está verificada").
   Como es tu propio script, en el aviso ve a **Configuración avanzada →
   Ir a [nombre del proyecto] (no seguro) → Permitir**. Es tu código, no de
   un tercero; el aviso solo aparece porque no está publicado en el Marketplace.
4. Cuando termine, verás un cuadro de diálogo "Listo..." y el Sheet tendrá
   4 pestañas: **Leads, Config, Dashboard, Guía**.
5. Si en el registro de ejecución (Ver → Registros) aparece un aviso de que
   no se pudieron crear las vistas de filtro, no es grave: sigue el paso 2.1
   más abajo y vuelve a ejecutar `crearVistasDeFiltro()`.

### 2.1 (Opcional pero recomendado) Vistas de filtro

Las 3 vistas de filtro ("Verdes sin contactar", "Seguimientos de hoy o
vencidos", "Todos los activos") usan un servicio de Google que no viene
activado por defecto en el editor:

1. En el editor de Apps Script, en el panel izquierdo, haz clic en el **+**
   junto a "Servicios".
2. Busca y agrega **"Google Sheets API"**. Déjalo como `Sheets`. Guarda.
3. Selecciona la función **`crearVistasDeFiltro`** arriba y ejecútala (▶).
4. Abre el Sheet, pestaña **Leads**, y en el menú **Datos → Vistas de filtro**
   deberías ver las 3 vistas. Revisa especialmente "Todos los activos": si
   quieres ajustar qué estados excluye, puedes editarla a mano desde ahí.

## 3. Publícalo como aplicación web (para recibir los leads)

1. En el editor, botón **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Descripción: lo que quieras (ej. "v1").
4. **Ejecutar como**: *Yo* (tu cuenta `caviles@adalia.app`).
5. **Quién tiene acceso**: *Cualquier usuario*. (Esto no hace público el
   Sheet: solo permite que la landing le mande datos a esta URL; nadie puede
   leer el contenido del Sheet por ahí).
6. Haz clic en **Implementar**, autoriza de nuevo si te lo pide, y copia la
   **URL de la aplicación web** que te entrega (termina en `/exec`).
7. Pásame esa URL (o agrégala tú mismo) para conectarla al formulario de la
   landing como variable de entorno `PUBLIC_LEADS_ENDPOINT` — ver
   [`.env.example`](../.env.example) y el workflow de deploy
   (`.github/workflows/deploy.yml`).

> Cada vez que vuelvas a **Implementar → Nueva implementación** después de
> modificar `Code.gs`, la URL cambia. Si solo corriges algo sin cambiar el
> contrato del webhook, usa en cambio **Implementar → Administrar
> implementaciones → ✏️ (editar) → Nueva versión**, así la URL no cambia y
> no hay que tocar la variable de entorno del sitio.

## 4. Pruébalo

Con el formulario de la landing en modo desarrollo (o ya con
`PUBLIC_LEADS_ENDPOINT` configurado), completa el formulario de la página y
revisa:

- Que aparezca una fila nueva en la pestaña **Leads**, con el nivel
  (Verde/Amarillo/Rojo) ya calculado y pintado.
- Que te llegue un correo a la dirección configurada en
  **Config → Correo que recibe el aviso de cada lead nuevo** (por defecto
  `caviles@adalia.app`; cámbiala ahí mismo si quieres otra).

También puedes probar el webhook directamente, sin pasar por la landing,
con este comando (reemplaza la URL):

```bash
curl -X POST "https://script.google.com/macros/s/TU_ID/exec" \
  -H "Content-Type: application/json" \
  -d '{"name":"Prueba","email":"prueba@otec.cl","phone":"+56 9 1234 5678","otec":"OTEC de prueba","cursos_anio":"6-20","personas_anio":"100-500","problema_principal":"sence","decisor_compra":"yo","presupuesto":"700000-1500000","inicio_estimado":"lo-antes-posible","message":"","dnc_realizado":"Sí"}'
```

Debería crear una fila **Verde** con puntaje alto.

## 5. Qué es editable sin tocar código

Todo lo que importa para ajustar el puntaje vive en la pestaña **Config**:

- Puntos por cada respuesta (urgencia, decisor, presupuesto, volumen, encaje).
- Bonus por DNC/NDS realizado.
- Umbrales de Verde/Amarillo/Rojo.
- Días de seguimiento (SLA) por nivel.
- Texto de la acción recomendada por nivel.
- Correo que recibe la notificación de cada lead nuevo.

Editas una celda ahí y las fórmulas de **Leads** (puntos, PUNTAJE, NIVEL,
Regla aplicada, Acción recomendada, Próximo seguimiento) se recalculan solas
en todas las filas, incluidas las antiguas.

La pestaña **Guía** (dentro del mismo Sheet) explica la lógica completa para
cualquiera del equipo que no haya visto esto antes.

## 4.1 Si ves símbolos raros (√ç, √Å, etc.) en vez de tildes

Es un problema de codificación del portapapeles al pegar un archivo tan largo
en el navegador (no de tu Sheet). Reemplazamos `Code.gs` para que el archivo
viaje en ASCII puro y las tildes se reconstruyan solas al ejecutarse — ya no
debería volver a pasar. Si ya te pasó: vuelve a copiar el `Code.gs` actual de
este repo, reemplaza todo el contenido en el editor y ejecuta `setup()` de
nuevo (ver sección 5.1 para por qué es seguro repetirlo).

## 5.1 Si ves `#ERROR!` en las columnas de puntaje o en el Dashboard

Pasa si tu Sheet usa una configuración regional donde las fórmulas separan sus
argumentos con `;` en vez de `,` (común en cuentas en español/Chile). El script
ya detecta esto solo desde esta versión. Si ya habías ejecutado una versión
anterior y quedaron filas en `#ERROR!`:

1. Reemplaza `Code.gs` por la versión actual de este repo (completa).
2. Ejecuta `setup()` de nuevo — es seguro repetirlo: no borra tus leads ni tu
   Config, solo reconstruye el Dashboard y recalcula las fórmulas de Leads.
3. Si solo quieres recalcular Leads sin tocar el Dashboard, ejecuta
   `repararFormulas` en su lugar.

## 6. Mantenimiento

- Si alguna vez cambian las opciones del formulario de la landing (los
  `<select>` de `src/content/copy.ts` en el repo), hay que actualizar las
  tablas `OPCIONES_*` al inicio de `Code.gs` **y** las etiquetas
  correspondientes en la pestaña Config, para que sigan coincidiendo
  exactamente (mayúsculas, tildes y signos `$` incluidos — las fórmulas
  comparan texto exacto).
- `setup()` crea automáticamente un disparador diario (6:00 am) que recalcula
  la ventana de "últimas 8 semanas" del Dashboard. Si no lo quieres, bórralo
  desde **Activadores** (ícono de reloj) en el editor de Apps Script.
