/**
 * Certimedia \u00b7 Leads Scoring Sheet
 * ---------------------------------
 * Convierte cada env\u00edo del formulario de la landing (lms-certimedia-landing)
 * en una fila clasificada autom\u00e1ticamente (Verde / Amarillo / Rojo, 0-100 pts).
 *
 * INSTALACI\u00d3N: ver README.md en esta misma carpeta.
 *   1. Pega este archivo completo en un proyecto de Apps Script ligado a un
 *      Google Sheet en blanco (Extensiones > Apps Script).
 *   2. Ejecuta la funci\u00f3n setup() una sola vez (autoriza los permisos pedidos).
 *   3. Implementa > Nueva implementaci\u00f3n > Aplicaci\u00f3n web, ejecutar como "Yo",
 *      acceso "Cualquier usuario". Copia la URL /exec resultante.
 *   4. Esa URL va en la variable de entorno PUBLIC_LEADS_ENDPOINT del sitio.
 *
 * Los nombres de campo y valores (cursos_anio, personas_anio, problema_principal,
 * decisor_compra, presupuesto, inicio_estimado, dnc_realizado) est\u00e1n tomados
 * tal cual de src/components/ContactForm.astro y src/content/copy.ts del
 * repo de la landing. Si esas opciones cambian en el sitio, actualiza las
 * tablas OPCIONES_* m\u00e1s abajo para que sigan coincidiendo.
 *
 * NOTA: este archivo se guarda en ASCII puro (tildes como \uXXXX) a proposito,
 * para que copiar y pegar el archivo completo en el editor de Apps Script
 * nunca se corrompa por un problema de codificacion del portapapeles/navegador.
 * JavaScript interpreta \uXXXX como el caracter Unicode real, asi que el texto
 * que ve la gente en el Sheet sale con tildes normales; solo el codigo fuente
 * (y los comentarios) se ven con \uXXXX en vez de tildes si lo abres en un editor.
 */

// ============================================================================
// CONSTANTES
// ============================================================================

const SHEET_LEADS = 'Leads';
const SHEET_CONFIG = 'Config';
const SHEET_DASHBOARD = 'Dashboard';
const SHEET_GUIA = 'Gu\u00eda';

// Encabezados de la pesta\u00f1a Leads, en orden (columna A \u2192 AC).
const LEADS_HEADERS = [
  'Fecha y hora', // A
  'Nombre', // B
  'Correo', // C
  'Tel\u00e9fono', // D
  'OTEC', // E
  'Cursos/a\u00f1o', // F
  'Personas/a\u00f1o', // G
  'Problema principal', // H
  'Qui\u00e9n decide', // I
  'Presupuesto mensual', // J
  'Inicio estimado', // K
  'Mensaje', // L
  'DNC realizado', // M
  'Origen', // N
  'Pts urgencia', // O
  'Pts decisor', // P
  'Pts presupuesto', // Q
  'Pts volumen', // R
  'Pts encaje', // S
  'Pts bonus DNC', // T
  'PUNTAJE', // U
  'NIVEL', // V
  'Regla aplicada', // W
  'Acci\u00f3n recomendada', // X
  'Responsable', // Y
  'Estado', // Z
  'Primer contacto', // AA
  'Pr\u00f3ximo seguimiento', // AB
  'Notas', // AC
];
const COL = {}; // se completa en LEADS_HEADERS.forEach m\u00e1s abajo -> {A:1,...}
LEADS_HEADERS.forEach((_, i) => (COL[i] = i + 1));
// \u00cdndices con nombre (1-based) para que el resto del c\u00f3digo sea legible.
const C_FECHA = 1,
  C_NOMBRE = 2,
  C_CORREO = 3,
  C_TELEFONO = 4,
  C_OTEC = 5,
  C_CURSOS = 6,
  C_PERSONAS = 7,
  C_PROBLEMA = 8,
  C_DECISOR = 9,
  C_PRESUPUESTO = 10,
  C_INICIO = 11,
  C_MENSAJE = 12,
  C_DNC = 13,
  C_ORIGEN = 14,
  C_PTS_URGENCIA = 15,
  C_PTS_DECISOR = 16,
  C_PTS_PRESUPUESTO = 17,
  C_PTS_VOLUMEN = 18,
  C_PTS_ENCAJE = 19,
  C_PTS_DNC = 20,
  C_PUNTAJE = 21,
  C_NIVEL = 22,
  C_REGLA = 23,
  C_ACCION = 24,
  C_RESPONSABLE = 25,
  C_ESTADO = 26,
  C_PRIMER_CONTACTO = 27,
  C_PROX_SEGUIMIENTO = 28,
  C_NOTAS = 29;

const MAX_FILA_FORMATO = 5000; // rango est\u00e1tico para validaciones/formato condicional
const ESTADOS = ['Nuevo', 'Contactado', 'Demo agendada', 'Propuesta enviada', 'Ganado', 'Perdido', 'En nutrici\u00f3n'];
const RESPONSABLES = ['C\u00e9sar', 'Claudio'];

// Traducci\u00f3n c\u00f3digo \u2192 etiqueta legible. Debe coincidir con src/content/copy.ts.
const OPCIONES_CURSOS = {
  '1-5': '1 a 5',
  '6-20': '6 a 20',
  '21-50': '21 a 50',
  '50+': 'M\u00e1s de 50',
  'no-se': 'A\u00fan no lo s\u00e9',
};
const OPCIONES_PERSONAS = {
  '<100': 'Menos de 100',
  '100-500': '100 a 500',
  '501-1000': '501 a 1.000',
  '1000+': 'M\u00e1s de 1.000',
  'no-se': 'A\u00fan no lo s\u00e9',
};
const OPCIONES_PROBLEMA = {
  sence: 'Cumplir los plazos y Declaraciones Juradas SENCE',
  asistencia: 'Automatizar la asistencia y los reportes de fiscalizaci\u00f3n',
  visibilidad: 'Dar visibilidad a mis clientes sobre el avance de su gente',
  carga: 'Reducir la carga operativa de cargar cursos y armar cohortes',
  marca: 'Tener una plataforma propia, con mi marca y dominio',
  certificados: 'Automatizar diplomas y certificados',
  otro: 'Otro',
};
const OPCIONES_DECISOR = {
  yo: 'Yo decido',
  compartida: 'La decisi\u00f3n es compartida con otra persona',
  otro: 'Otra persona decide; yo eval\u00fao la propuesta',
};
const OPCIONES_PRESUPUESTO = {
  'sin-definir': 'A\u00fan no tengo un presupuesto definido',
  '<300000': 'Menos de $300.000 CLP al mes',
  '300000-700000': '$300.000 a $700.000 CLP al mes',
  '700000-1500000': '$700.000 a $1.500.000 CLP al mes',
  '1500000+': 'M\u00e1s de $1.500.000 CLP al mes',
};
const OPCIONES_INICIO = {
  'lo-antes-posible': 'Lo antes posible',
  'este-trimestre': 'Dentro de este trimestre',
  'sin-fecha': 'A\u00fan estoy evaluando, sin fecha definida',
};

// ============================================================================
// SETUP \u2014 ejecutar una sola vez
// ============================================================================

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  buildLeadsSheet_(ss);
  buildConfigSheet_(ss);
  repararFormulasLeads_(ss);
  buildDashboardSheet_(ss);
  buildGuiaSheet_(ss);

  // Deja la vista en Leads y quita cualquier hoja "Hoja 1" / "Sheet1" sobrante vac\u00eda.
  const sobrante = ss.getSheets().find((sh) => {
    const n = sh.getName();
    return (n === 'Hoja 1' || n === 'Sheet1') && sh.getLastRow() === 0 && sh.getLastColumn() === 0;
  });
  if (sobrante && ss.getSheets().length > 1) ss.deleteSheet(sobrante);
  ss.setActiveSheet(ss.getSheetByName(SHEET_LEADS));

  try {
    crearVistasDeFiltro();
  } catch (err) {
    Logger.log(
      'No se pudieron crear las vistas de filtro autom\u00e1ticamente (%s). ' +
        'Activa el servicio avanzado "Google Sheets API" (\u00edcono + junto a Servicios) ' +
        'y vuelve a ejecutar crearVistasDeFiltro().',
      err
    );
  }

  try {
    crearTriggerDiario();
  } catch (err) {
    Logger.log('No se pudo crear el disparador diario del Dashboard: %s', err);
  }

  try {
    SpreadsheetApp.getUi().alert(
      'Listo. Revisa las pesta\u00f1as Leads, Config, Dashboard y Gu\u00eda.\n\n' +
        'Siguiente paso: Implementar > Nueva implementaci\u00f3n > Aplicaci\u00f3n web.'
    );
  } catch (err) {
    Logger.log('Setup completo (sin di\u00e1logo: no hay UI disponible en este contexto de ejecuci\u00f3n).');
  }
}

// ---------------------------------------------------------------------------
// Hoja Leads
// ---------------------------------------------------------------------------

function buildLeadsSheet_(ss) {
  let sh = ss.getSheetByName(SHEET_LEADS);
  const esNueva = !sh;
  if (!sh) {
    sh = ss.insertSheet(SHEET_LEADS, 0);
  } else {
    ss.setActiveSheet(sh);
    ss.moveActiveSheet(1);
  }

  sh.getRange(1, 1, 1, LEADS_HEADERS.length).setValues([LEADS_HEADERS]);
  sh.getRange(1, 1, 1, LEADS_HEADERS.length)
    .setFontWeight('bold')
    .setBackground('#17305c')
    .setFontColor('#ffffff')
    .setVerticalAlignment('middle');
  sh.setFrozenRows(1);
  sh.setFrozenColumns(3);

  // Anchos legibles.
  const anchos = {
    [C_FECHA]: 140,
    [C_NOMBRE]: 150,
    [C_CORREO]: 190,
    [C_TELEFONO]: 120,
    [C_OTEC]: 170,
    [C_MENSAJE]: 220,
    [C_ORIGEN]: 170,
    [C_ACCION]: 260,
    [C_NOTAS]: 200,
  };
  LEADS_HEADERS.forEach((_, i) => sh.setColumnWidth(i + 1, anchos[i + 1] || 130));

  // Formato de fecha/hora y de fecha simple.
  sh.getRange(2, C_FECHA, MAX_FILA_FORMATO, 1).setNumberFormat('dd/mm/yyyy hh:mm');
  sh.getRange(2, C_PRIMER_CONTACTO, MAX_FILA_FORMATO, 1).setNumberFormat('dd/mm/yyyy hh:mm');
  sh.getRange(2, C_PROX_SEGUIMIENTO, MAX_FILA_FORMATO, 1).setNumberFormat('dd/mm/yyyy');

  // Validaciones (listas desplegables) en todo el rango de trabajo.
  const reglaEstado = SpreadsheetApp.newDataValidation().requireValueInList(ESTADOS, true).setAllowInvalid(false).build();
  sh.getRange(2, C_ESTADO, MAX_FILA_FORMATO, 1).setDataValidation(reglaEstado);
  const reglaResponsable = SpreadsheetApp.newDataValidation()
    .requireValueInList(RESPONSABLES, true)
    .setAllowInvalid(false)
    .build();
  sh.getRange(2, C_RESPONSABLE, MAX_FILA_FORMATO, 1).setDataValidation(reglaResponsable);

  // Protecci\u00f3n de las columnas calculadas (puntos, puntaje, nivel, regla, acci\u00f3n, seguimiento).
  const colsProtegidas = [
    [C_PTS_URGENCIA, C_ACCION - C_PTS_URGENCIA + 1], // O..X seguidas
  ];
  colsProtegidas.forEach(([col, n]) => {
    const rango = sh.getRange(2, col, MAX_FILA_FORMATO, n);
    const proteccion = rango.protect().setDescription('F\u00f3rmulas de puntaje \u2014 no editar a mano, se calculan solas desde Config.');
    proteccion.setWarningOnly(true);
  });
  const rangoSeguimiento = sh.getRange(2, C_PROX_SEGUIMIENTO, MAX_FILA_FORMATO, 1);
  rangoSeguimiento.protect().setWarningOnly(true).setDescription('F\u00f3rmula \u2014 se calcula sola desde la fecha de llegada + SLA de Config.');

  // Filtro b\u00e1sico sobre todo el rango de trabajo.
  const filtroExistente = sh.getFilter();
  if (filtroExistente) filtroExistente.remove();
  sh.getRange(1, 1, MAX_FILA_FORMATO, LEADS_HEADERS.length).createFilter();

  aplicarFormatoCondicionalLeads_(sh);

  if (esNueva) Logger.log('Pesta\u00f1a "Leads" creada.');
}

function aplicarFormatoCondicionalLeads_(sh) {
  const rangoFila = sh.getRange(2, 1, MAX_FILA_FORMATO, LEADS_HEADERS.length);
  const rangoNivel = sh.getRange(2, C_NIVEL, MAX_FILA_FORMATO, 1);
  const letraNivel = colLetter_(C_NIVEL);

  const reglas = [];

  // Tinte suave en toda la fila seg\u00fan el nivel.
  reglas.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(`=$${letraNivel}2="Verde"`)
      .setBackground('#e6f4ea')
      .setRanges([rangoFila])
      .build()
  );
  reglas.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(`=$${letraNivel}2="Amarillo"`)
      .setBackground('#fff6e0')
      .setRanges([rangoFila])
      .build()
  );
  reglas.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(`=$${letraNivel}2="Rojo"`)
      .setBackground('#fdecea')
      .setRanges([rangoFila])
      .build()
  );

  // Celda NIVEL con relleno fuerte + texto blanco en negrita.
  reglas.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Verde')
      .setBackground('#34a853')
      .setFontColor('#ffffff')
      .setBold(true)
      .setRanges([rangoNivel])
      .build()
  );
  reglas.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Amarillo')
      .setBackground('#f4b400')
      .setFontColor('#1a1a1a')
      .setBold(true)
      .setRanges([rangoNivel])
      .build()
  );
  reglas.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Rojo')
      .setBackground('#ea4335')
      .setFontColor('#ffffff')
      .setBold(true)
      .setRanges([rangoNivel])
      .build()
  );

  sh.setConditionalFormatRules(reglas);
}

/**
 * El separador de argumentos dentro de una f\u00f3rmula depende de la configuraci\u00f3n
 * regional del Sheet, no del idioma de la interfaz: en locales donde la coma
 * es el separador decimal (es_CL, es_ES, pt_BR, fr_FR, de_DE, etc.) las f\u00f3rmulas
 * usan ";" entre argumentos en vez de ",". Todas las f\u00f3rmulas de este archivo
 * se escriben con "|" como separador neutro y se convierten aqu\u00ed al separador
 * real del Sheet antes de guardarlas, para que funcionen sin importar la cuenta.
 */
let SEPARADOR_CACHE_ = null;
function separadorFormula_() {
  if (SEPARADOR_CACHE_) return SEPARADOR_CACHE_;
  let locale = 'en_US';
  try {
    locale = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetLocale() || locale;
  } catch (err) {
    // Sin spreadsheet activa disponible (contexto inusual): se asume en_US.
  }
  const localesComaDecimal = /^(es|pt|fr|de|it|nl|pl|ru|tr|vi|id|cs|sk|hu|ro|sv|fi|da|nb|nn|el|bg|hr|sl|lt|lv|et|uk|sr)/i;
  SEPARADOR_CACHE_ = localesComaDecimal.test(locale) ? ';' : ',';
  return SEPARADOR_CACHE_;
}
function f_(formulaConPipes) {
  return formulaConPipes.replace(/\|/g, separadorFormula_());
}

function colLetter_(col) {
  let letter = '';
  while (col > 0) {
    const mod = (col - 1) % 26;
    letter = String.fromCharCode(65 + mod) + letter;
    col = Math.floor((col - mod) / 26);
  }
  return letter;
}

/** F\u00f3rmulas de las columnas calculadas (O..X y AB) para una fila dada. */
function formulasFila_(fila) {
  const F = colLetter_(C_CURSOS) + fila;
  const G = colLetter_(C_PERSONAS) + fila;
  const H = colLetter_(C_PROBLEMA) + fila;
  const I = colLetter_(C_DECISOR) + fila;
  const J = colLetter_(C_PRESUPUESTO) + fila;
  const K = colLetter_(C_INICIO) + fila;
  const M = colLetter_(C_DNC) + fila;
  const A = colLetter_(C_FECHA) + fila;
  const O = colLetter_(C_PTS_URGENCIA) + fila;
  const P = colLetter_(C_PTS_DECISOR) + fila;
  const Q = colLetter_(C_PTS_PRESUPUESTO) + fila;
  const R = colLetter_(C_PTS_VOLUMEN) + fila;
  const S = colLetter_(C_PTS_ENCAJE) + fila;
  const T = colLetter_(C_PTS_DNC) + fila;
  const U = colLetter_(C_PUNTAJE) + fila;
  const V = colLetter_(C_NIVEL) + fila;

  return {
    [C_PTS_URGENCIA]: `=IFERROR(VLOOKUP(${K}|RANGO_URGENCIA|2|FALSE)|0)`,
    [C_PTS_DECISOR]: `=IFERROR(VLOOKUP(${I}|RANGO_DECISOR|2|FALSE)|0)`,
    [C_PTS_PRESUPUESTO]: `=IFERROR(VLOOKUP(${J}|RANGO_PRESUPUESTO|2|FALSE)|0)`,
    [C_PTS_VOLUMEN]: `=IFERROR(VLOOKUP(${F}|RANGO_CURSOS|2|FALSE)|0)+IFERROR(VLOOKUP(${G}|RANGO_PERSONAS|2|FALSE)|0)`,
    [C_PTS_ENCAJE]: `=IFERROR(VLOOKUP(${H}|RANGO_ENCAJE|2|FALSE)|0)`,
    [C_PTS_DNC]: `=IF(${M}="S\u00ed"|BONUS_DNC|0)`,
    [C_PUNTAJE]: `=MIN(100|${O}+${P}+${Q}+${R}+${S}+${T})`,
    [C_NIVEL]: `=LET(esR1|AND(${J}="A\u00fan no tengo un presupuesto definido"|${K}="A\u00fan estoy evaluando, sin fecha definida")|esR2|${I}="Otra persona decide; yo eval\u00fao la propuesta"|base|IF(${U}>=UMBRAL_VERDE|"Verde"|IF(${U}>=UMBRAL_AMARILLO|"Amarillo"|"Rojo"))|ajustado|IF(esR2|IF(base="Verde"|"Amarillo"|base)|base)|IF(esR1|"Rojo"|ajustado))`,
    [C_REGLA]: `=IF(AND(${J}="A\u00fan no tengo un presupuesto definido"|${K}="A\u00fan estoy evaluando, sin fecha definida")|"R1 \u00b7 sin presupuesto + sin fecha \u2192 Rojo"|IF(AND(${I}="Otra persona decide; yo eval\u00fao la propuesta"|${U}>=UMBRAL_VERDE)|"R2 \u00b7 no es decisor \u2192 tope Amarillo"|"Sin ajuste"))`,
    [C_ACCION]: `=IFS(${V}="Verde"|ACCION_VERDE|${V}="Amarillo"|ACCION_AMARILLO|${V}="Rojo"|ACCION_ROJO|TRUE|"")`,
    [C_PROX_SEGUIMIENTO]: `=IFS(${V}="Verde"|${A}+SLA_VERDE|${V}="Amarillo"|${A}+SLA_AMARILLO|${V}="Rojo"|${A}+SLA_ROJO|TRUE|"")`,
  };
}

function escribirFormulasFila_(sh, fila) {
  const formulas = formulasFila_(fila);
  Object.keys(formulas).forEach((col) => sh.getRange(fila, Number(col)).setFormula(f_(formulas[col])));
}

/**
 * Vuelve a escribir las f\u00f3rmulas (puntos, PUNTAJE, NIVEL, etc.) de todas las filas
 * con datos en "Leads". \u00dasala si ves #ERROR! en esas columnas \u2014 t\u00edpicamente porque
 * las f\u00f3rmulas se guardaron antes de corregir el separador de argumentos (,/;) para
 * la configuraci\u00f3n regional de este Sheet. setup() ya la ejecuta sola.
 */
function repararFormulasLeads_(ss) {
  const sh = ss.getSheetByName(SHEET_LEADS);
  if (!sh) return;
  const ultimaFila = sh.getLastRow();
  for (let fila = 2; fila <= ultimaFila; fila++) {
    if (sh.getRange(fila, C_NOMBRE).getValue()) escribirFormulasFila_(sh, fila);
  }
  Logger.log('F\u00f3rmulas de "Leads" recalculadas (filas 2 a %s).', ultimaFila);
}

/** Atajo para ejecutar repararFormulasLeads_ a mano desde el editor, sin correr setup() completo. */
function repararFormulas() {
  repararFormulasLeads_(SpreadsheetApp.getActiveSpreadsheet());
}

// ---------------------------------------------------------------------------
// Hoja Config
// ---------------------------------------------------------------------------

function buildConfigSheet_(ss) {
  let sh = ss.getSheetByName(SHEET_CONFIG);
  if (sh) {
    Logger.log('Pesta\u00f1a "Config" ya existe: no se reconstruye (para no perder tus ediciones).');
    return;
  }
  sh = ss.insertSheet(SHEET_CONFIG, 1);

  sh.getRange(1, 1).setValue('CONFIGURACI\u00d3N DEL PUNTAJE DE LEADS').setFontSize(14).setFontWeight('bold');
  sh.getRange(2, 1)
    .setValue(
      'Edita los puntos, umbrales, SLA y textos de esta pesta\u00f1a. Las f\u00f3rmulas de "Leads" se recalculan solas al guardar.'
    )
    .setFontStyle('italic')
    .setFontColor('#666666');

  let fila = 4;

  function agregarTabla(titulo, pares) {
    sh.getRange(fila, 1, 1, 2).merge().setValue(titulo).setFontWeight('bold').setBackground('#e8eefc');
    fila++;
    sh.getRange(fila, 1).setValue('Respuesta');
    sh.getRange(fila, 2).setValue('Puntos');
    sh.getRange(fila, 1, 1, 2).setFontWeight('bold').setBackground('#f3f4f6');
    fila++;
    const inicio = fila;
    pares.forEach(([etiqueta, puntos]) => {
      sh.getRange(fila, 1).setValue(etiqueta);
      sh.getRange(fila, 2).setValue(puntos);
      fila++;
    });
    const rango = sh.getRange(inicio, 1, pares.length, 2);
    fila++; // fila en blanco de separaci\u00f3n
    return rango;
  }

  function agregarValor(titulo, etiqueta, valor) {
    sh.getRange(fila, 1, 1, 2).merge().setValue(titulo).setFontWeight('bold').setBackground('#e8eefc');
    fila++;
    sh.getRange(fila, 1).setValue(etiqueta);
    sh.getRange(fila, 2).setValue(valor);
    const celda = sh.getRange(fila, 2);
    fila += 2;
    return celda;
  }

  const ss_ = ss;
  const rUrgencia = agregarTabla('Urgencia de inicio (m\u00e1x. 25 pts) \u2014 campo "\u00bfCu\u00e1ndo te gustar\u00eda comenzar?"', [
    [OPCIONES_INICIO['lo-antes-posible'], 25],
    [OPCIONES_INICIO['este-trimestre'], 15],
    [OPCIONES_INICIO['sin-fecha'], 3],
  ]);
  ss_.setNamedRange('RANGO_URGENCIA', rUrgencia);

  const rDecisor = agregarTabla('Qui\u00e9n decide la compra (m\u00e1x. 20 pts)', [
    [OPCIONES_DECISOR['yo'], 20],
    [OPCIONES_DECISOR['compartida'], 12],
    [OPCIONES_DECISOR['otro'], 5],
  ]);
  ss_.setNamedRange('RANGO_DECISOR', rDecisor);

  const rPresupuesto = agregarTabla('Presupuesto mensual contemplado (m\u00e1x. 20 pts)', [
    [OPCIONES_PRESUPUESTO['sin-definir'], 6],
    [OPCIONES_PRESUPUESTO['<300000'], 12],
    [OPCIONES_PRESUPUESTO['300000-700000'], 18],
    [OPCIONES_PRESUPUESTO['700000-1500000'], 20],
    [OPCIONES_PRESUPUESTO['1500000+'], 20],
  ]);
  ss_.setNamedRange('RANGO_PRESUPUESTO', rPresupuesto);

  const rCursos = agregarTabla('Volumen \u2014 cursos al a\u00f1o (parte de m\u00e1x. 20 pts de volumen)', [
    [OPCIONES_CURSOS['1-5'], 4],
    [OPCIONES_CURSOS['6-20'], 8],
    [OPCIONES_CURSOS['21-50'], 10],
    [OPCIONES_CURSOS['50+'], 10],
    [OPCIONES_CURSOS['no-se'], 3],
  ]);
  ss_.setNamedRange('RANGO_CURSOS', rCursos);

  const rPersonas = agregarTabla('Volumen \u2014 personas al a\u00f1o (parte de m\u00e1x. 20 pts de volumen)', [
    [OPCIONES_PERSONAS['<100'], 3],
    [OPCIONES_PERSONAS['100-500'], 6],
    [OPCIONES_PERSONAS['501-1000'], 9],
    [OPCIONES_PERSONAS['1000+'], 10],
    [OPCIONES_PERSONAS['no-se'], 3],
  ]);
  ss_.setNamedRange('RANGO_PERSONAS', rPersonas);

  const rEncaje = agregarTabla('Encaje con el producto (m\u00e1x. 15 pts) \u2014 "\u00bfQu\u00e9 problema quieres resolver primero?"', [
    [OPCIONES_PROBLEMA['sence'], 15],
    [OPCIONES_PROBLEMA['asistencia'], 15],
    [OPCIONES_PROBLEMA['carga'], 15],
    [OPCIONES_PROBLEMA['visibilidad'], 13],
    [OPCIONES_PROBLEMA['marca'], 10],
    [OPCIONES_PROBLEMA['certificados'], 7],
    [OPCIONES_PROBLEMA['otro'], 4],
  ]);
  ss_.setNamedRange('RANGO_ENCAJE', rEncaje);

  const cBonus = agregarValor('Bonus por madurez', 'Bonus si ya tiene DNC/NDS realizado', 5);
  ss_.setNamedRange('BONUS_DNC', cBonus);

  sh.getRange(fila, 1, 1, 2).merge().setValue('Umbrales de nivel').setFontWeight('bold').setBackground('#e8eefc');
  fila++;
  sh.getRange(fila, 1).setValue('Verde desde (puntaje m\u00ednimo)');
  const cVerde = sh.getRange(fila, 2).setValue(70);
  ss_.setNamedRange('UMBRAL_VERDE', cVerde);
  fila++;
  sh.getRange(fila, 1).setValue('Amarillo desde (puntaje m\u00ednimo; menos que esto es Rojo)');
  const cAmarillo = sh.getRange(fila, 2).setValue(45);
  ss_.setNamedRange('UMBRAL_AMARILLO', cAmarillo);
  fila += 2;

  sh.getRange(fila, 1, 1, 2).merge().setValue('Seguimiento \u2014 d\u00edas hasta el pr\u00f3ximo contacto').setFontWeight('bold').setBackground('#e8eefc');
  fila++;
  sh.getRange(fila, 1).setValue('Verde');
  const cSlaVerde = sh.getRange(fila, 2).setValue(1);
  ss_.setNamedRange('SLA_VERDE', cSlaVerde);
  fila++;
  sh.getRange(fila, 1).setValue('Amarillo');
  const cSlaAmarillo = sh.getRange(fila, 2).setValue(3);
  ss_.setNamedRange('SLA_AMARILLO', cSlaAmarillo);
  fila++;
  sh.getRange(fila, 1).setValue('Rojo');
  const cSlaRojo = sh.getRange(fila, 2).setValue(30);
  ss_.setNamedRange('SLA_ROJO', cSlaRojo);
  fila += 2;

  sh.getRange(fila, 1, 1, 2).merge().setValue('Acci\u00f3n recomendada por nivel').setFontWeight('bold').setBackground('#e8eefc');
  fila++;
  sh.getRange(fila, 1).setValue('Verde');
  const cAccionVerde = sh.getRange(fila, 2).setValue('Contactar hoy: llamar + WhatsApp, ofrecer agenda inmediata.');
  ss_.setNamedRange('ACCION_VERDE', cAccionVerde);
  fila++;
  sh.getRange(fila, 1).setValue('Amarillo');
  const cAccionAmarillo = sh
    .getRange(fila, 2)
    .setValue('Contactar en 1 a 3 d\u00edas: correo personalizado + seguimiento telef\u00f3nico.');
  ss_.setNamedRange('ACCION_AMARILLO', cAccionAmarillo);
  fila++;
  sh.getRange(fila, 1).setValue('Rojo');
  const cAccionRojo = sh.getRange(fila, 2).setValue('Nutrir: sumar a secuencia de correo y revisar en 30 d\u00edas.');
  ss_.setNamedRange('ACCION_ROJO', cAccionRojo);
  fila += 2;

  const cCorreo = agregarValor('Notificaciones', 'Correo que recibe el aviso de cada lead nuevo', 'caviles@adalia.app');
  ss_.setNamedRange('CORREO_NOTIFICACION', cCorreo);

  sh.setColumnWidth(1, 440);
  sh.setColumnWidth(2, 260);
  sh.getRange(1, 1, fila, 2).setWrap(true).setVerticalAlignment('middle');
  sh.getRange(4, 2, fila - 4, 1).setNumberFormat('0');

  Logger.log('Pesta\u00f1a "Config" creada con sus rangos con nombre.');
}

// ---------------------------------------------------------------------------
// Hoja Dashboard
// ---------------------------------------------------------------------------

function buildDashboardSheet_(ss) {
  let sh = ss.getSheetByName(SHEET_DASHBOARD);
  if (sh) ss.deleteSheet(sh); // el dashboard es solo f\u00f3rmulas: se puede reconstruir sin perder nada
  sh = ss.insertSheet(SHEET_DASHBOARD, 2);

  const L = `'${SHEET_LEADS}'`;
  const rango = (col) => `${L}!$${colLetter_(col)}$2:$${colLetter_(col)}$${MAX_FILA_FORMATO}`;

  sh.getRange(1, 1).setValue('DASHBOARD DE LEADS').setFontSize(14).setFontWeight('bold');
  sh.getRange(2, 1).setValue('Se actualiza solo. No escribas a mano en esta pesta\u00f1a.').setFontStyle('italic').setFontColor('#666666');

  // --- Totales por nivel --------------------------------------------------
  sh.getRange(4, 1).setValue('Total de leads').setFontWeight('bold');
  sh.getRange(4, 2).setFormula(f_(`=COUNTA(${rango(C_NOMBRE)})`));

  sh.getRange(6, 1, 1, 3).setValues([['Nivel', 'Leads', '%']]).setFontWeight('bold').setBackground('#f3f4f6');
  const niveles = ['Verde', 'Amarillo', 'Rojo'];
  niveles.forEach((nivel, i) => {
    const f = 7 + i;
    sh.getRange(f, 1).setValue(nivel);
    sh.getRange(f, 2).setFormula(f_(`=COUNTIF(${rango(C_NIVEL)}|A${f})`));
    sh.getRange(f, 3).setFormula(f_(`=IFERROR(B${f}/$B$4|0)`)).setNumberFormat('0%');
  });

  sh.getRange(11, 1)
    .setValue('Verdes sin contactar')
    .setFontWeight('bold');
  sh.getRange(11, 2).setFormula(
    f_(`=COUNTIFS(${rango(C_NIVEL)}|"Verde"|${rango(C_ESTADO)}|"Nuevo")`)
  );
  sh.getRange(12, 1).setValue('\u2026 de esos, vencidos (>2h o de un d\u00eda anterior)').setFontWeight('bold');
  sh.getRange(12, 2).setFormula(
    `=SUMPRODUCT((${rango(C_NIVEL)}="Verde")*(${rango(C_ESTADO)}="Nuevo")*((((NOW()-${rango(
      C_FECHA
    )})*24>2)+(INT(${rango(C_FECHA)})<INT(NOW())))>0))`
  );
  sh.setConditionalFormatRules([
    ...sh.getConditionalFormatRules(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(0)
      .setBackground('#fdecea')
      .setFontColor('#c5221f')
      .setBold(true)
      .setRanges([sh.getRange(12, 2)])
      .build(),
  ]);

  // --- Donut por nivel ------------------------------------------------------
  const chartNivel = sh
    .newChart()
    .asPieChart()
    .addRange(sh.getRange(6, 1, 4, 2))
    .setOption('pieHole', 0.45)
    .setOption('title', 'Leads por nivel')
    .setOption('colors', ['#34a853', '#f4b400', '#ea4335'])
    .setPosition(4, 5, 0, 0)
    .setOption('width', 420)
    .setOption('height', 280)
    .build();
  sh.insertChart(chartNivel);

  // --- Por problema principal ------------------------------------------------
  let fila = 15;
  sh.getRange(fila, 1).setValue('Leads por problema principal').setFontWeight('bold');
  fila++;
  const inicioProblema = fila;
  Object.values(OPCIONES_PROBLEMA).forEach((etiqueta) => {
    sh.getRange(fila, 1).setValue(etiqueta);
    sh.getRange(fila, 2).setFormula(f_(`=COUNTIF(${rango(C_PROBLEMA)}|A${fila})`));
    fila++;
  });
  const finProblema = fila - 1;
  fila++;

  // --- Por presupuesto ---------------------------------------------------
  sh.getRange(fila, 1).setValue('Leads por rango de presupuesto').setFontWeight('bold');
  fila++;
  Object.values(OPCIONES_PRESUPUESTO).forEach((etiqueta) => {
    sh.getRange(fila, 1).setValue(etiqueta);
    sh.getRange(fila, 2).setFormula(f_(`=COUNTIF(${rango(C_PRESUPUESTO)}|A${fila})`));
    fila++;
  });
  fila++;

  // --- Por origen (UTM) ----------------------------------------------------
  sh.getRange(fila, 1).setValue('Leads por origen (UTM)').setFontWeight('bold');
  fila++;
  sh.getRange(fila, 1).setFormula(
    f_(`=IFERROR(QUERY(${rango(C_ORIGEN)}|"select Col1, count(Col1) where Col1 is not null and Col1 <> '' group by Col1 label count(Col1) '' order by count(Col1) desc"|0)|"(sin datos a\u00fan)")`)
  );
  fila += 10; // deja espacio para el derrame del QUERY

  // --- Embudo por estado ---------------------------------------------------
  sh.getRange(fila, 1).setValue('Embudo por estado').setFontWeight('bold');
  fila++;
  const inicioEmbudo = fila;
  ESTADOS.forEach((estado) => {
    sh.getRange(fila, 1).setValue(estado);
    sh.getRange(fila, 2).setFormula(f_(`=COUNTIF(${rango(C_ESTADO)}|A${fila})`));
    fila++;
  });
  const chartEmbudo = sh
    .newChart()
    .asBarChart()
    .addRange(sh.getRange(inicioEmbudo, 1, ESTADOS.length, 2))
    .setOption('title', 'Embudo por estado')
    .setOption('width', 420)
    .setOption('height', 280)
    .setPosition(19, 5, 0, 0)
    .build();
  sh.insertChart(chartEmbudo);
  fila += 2;

  // --- Leads por semana (barras) --------------------------------------------
  sh.getRange(fila, 1).setValue('Leads por semana (\u00faltimas 8 semanas)').setFontWeight('bold');
  fila++;
  const inicioSemanas = fila;
  sh.getRange(fila, 1, 1, 2).setValues([['Semana del', 'Leads']]).setFontWeight('bold');
  fila++;
  const inicioSemanasDatos = fila;
  const hoy = new Date();
  const lunesActual = new Date(hoy);
  const diaSemana = (lunesActual.getDay() + 6) % 7; // 0 = lunes
  lunesActual.setDate(lunesActual.getDate() - diaSemana);
  for (let i = 7; i >= 0; i--) {
    const inicioSemana = new Date(lunesActual);
    inicioSemana.setDate(inicioSemana.getDate() - 7 * i);
    const finSemana = new Date(inicioSemana);
    finSemana.setDate(finSemana.getDate() + 7);
    const f = fila;
    sh.getRange(f, 1).setValue(inicioSemana).setNumberFormat('dd/mm/yyyy');
    sh.getRange(f, 2).setFormula(
      f_(`=COUNTIFS(${rango(C_FECHA)}|">="&A${f}|${rango(C_FECHA)}|"<"&(A${f}+7))`)
    );
    fila++;
  }
  const chartSemanas = sh
    .newChart()
    .asColumnChart()
    .addRange(sh.getRange(inicioSemanas, 1, 9, 2))
    .setOption('title', 'Leads por semana')
    .setOption('width', 420)
    .setOption('height', 280)
    .setPosition(35, 5, 0, 0)
    .build();
  sh.insertChart(chartSemanas);

  sh.setColumnWidth(1, 340);
  sh.setColumnWidth(2, 100);
  sh.setColumnWidth(3, 70);

  Logger.log('Pesta\u00f1a "Dashboard" creada.');
}

/**
 * Vuelve a calcular la ventana de "\u00faltimas 8 semanas" del Dashboard tomando
 * como referencia la fecha de hoy. Ejec\u00fatala manualmente de vez en cuando, o
 * deja el disparador diario que crea setup() (ver crearTriggerDiario()).
 */
function actualizarSemanasDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss.getSheetByName(SHEET_DASHBOARD)) return;
  buildDashboardSheet_(ss); // es barato de reconstruir: solo son f\u00f3rmulas + 2 gr\u00e1ficos
}

function crearTriggerDiario() {
  const yaExiste = ScriptApp.getProjectTriggers().some((t) => t.getHandlerFunction() === 'actualizarSemanasDashboard');
  if (yaExiste) return;
  ScriptApp.newTrigger('actualizarSemanasDashboard').timeBased().everyDays(1).atHour(6).create();
}

// ---------------------------------------------------------------------------
// Hoja Gu\u00eda
// ---------------------------------------------------------------------------

function buildGuiaSheet_(ss) {
  let sh = ss.getSheetByName(SHEET_GUIA);
  if (sh) ss.deleteSheet(sh);
  sh = ss.insertSheet(SHEET_GUIA, 3);

  const lineas = [
    ['GU\u00cdA R\u00c1PIDA \u2014 C\u00d3MO FUNCIONA ESTE SHEET', ''],
    ['', ''],
    ['1. De d\u00f3nde vienen los leads', ''],
    [
      '',
      'Cada vez que alguien completa el formulario de la landing (lms-certimedia-landing), el sitio env\u00eda los datos a la app web de este proyecto (funci\u00f3n doPost). El script agrega una fila nueva en "Leads", calcula el puntaje y clasifica el nivel.',
    ],
    ['', ''],
    ['2. C\u00f3mo se calcula el puntaje (0 a 100)', ''],
    ['', 'Urgencia de inicio: hasta 25 pts.'],
    ['', 'Qui\u00e9n decide la compra: hasta 20 pts.'],
    ['', 'Presupuesto mensual: hasta 20 pts.'],
    ['', 'Volumen (cursos + personas al a\u00f1o): hasta 20 pts.'],
    ['', 'Encaje del problema principal con el producto: hasta 15 pts.'],
    ['', 'Bonus si ya tiene un DNC/NDS realizado: +5 pts.'],
    ['', 'El total nunca pasa de 100 (se usa MIN).'],
    ['', 'Todos estos puntos se editan en la pesta\u00f1a "Config", sin tocar c\u00f3digo.'],
    ['', ''],
    ['3. Niveles', ''],
    ['', 'Verde: 70 puntos o m\u00e1s. Contactar hoy.'],
    ['', 'Amarillo: entre 45 y 69 puntos. Contactar en 1 a 3 d\u00edas.'],
    ['', 'Rojo: menos de 45 puntos. Sumar a nutrici\u00f3n y revisar en 30 d\u00edas.'],
    ['', ''],
    ['4. Reglas de ajuste (se aplican despu\u00e9s del puntaje)', ''],
    [
      '',
      'R1: si el presupuesto es "A\u00fan no tengo un presupuesto definido" Y el inicio es "sin fecha definida", el nivel baja a Rojo sin importar el puntaje.',
    ],
    ['', 'R2: si la decisi\u00f3n la toma "otra persona", el nivel no puede pasar de Amarillo (aunque el puntaje diera Verde).'],
    ['', 'La columna "Regla aplicada" de cada fila indica cu\u00e1l de las dos (si alguna) actu\u00f3.'],
    ['', ''],
    ['5. Seguimiento', ''],
    [
      '',
      '"Pr\u00f3ximo seguimiento" = fecha de llegada del lead + los d\u00edas que definas en Config para su nivel (por defecto Verde 1 d\u00eda, Amarillo 3 d\u00edas, Rojo 30 d\u00edas corridos).',
    ],
    ['', 'Marca "Estado" y "Responsable" a mano en cada fila a medida que avanzas la gesti\u00f3n.'],
    ['', ''],
    ['6. Qu\u00e9 es editable y qu\u00e9 no', ''],
    ['', 'Editable sin tocar c\u00f3digo: toda la pesta\u00f1a "Config" (puntos, umbrales, SLA, textos de acci\u00f3n, correo de aviso).'],
    [
      '',
      'No editar a mano: las columnas de puntos, PUNTAJE, NIVEL, Regla aplicada, Acci\u00f3n recomendada y Pr\u00f3ximo seguimiento en "Leads" (tienen f\u00f3rmulas protegidas con advertencia).',
    ],
    ['', ''],
    ['7. Vistas de filtro sugeridas (pesta\u00f1a Leads)', ''],
    ['', '"Verdes sin contactar": nivel = Verde y estado = Nuevo.'],
    ['', '"Seguimientos de hoy o vencidos": pr\u00f3ximo seguimiento \u2264 hoy.'],
    ['', '"Todos los activos": excluye Ganado, Perdido y En nutrici\u00f3n.'],
    ['', ''],
    ['8. Si algo se ve en 0 o #N/A', ''],
    ['', 'Normalmente es porque una etiqueta en "Config" ya no coincide exactamente con la que llega del formulario. Revisa que el texto sea id\u00e9ntico (may\u00fasculas, tildes, signos $).'],
  ];

  sh.getRange(1, 1, lineas.length, 2).setValues(lineas);
  sh.getRange(1, 1).setFontSize(14).setFontWeight('bold');
  sh.setColumnWidth(1, 40);
  sh.setColumnWidth(2, 780);
  sh.getRange(1, 1, lineas.length, 2).setWrap(true).setVerticalAlignment('top');
  // Negrita en los t\u00edtulos numerados (columna A: "1. ...", "2. ...", etc.).
  lineas.forEach((linea, i) => {
    if (/^\d+\./.test(linea[0] || '')) {
      sh.getRange(i + 1, 1).setFontWeight('bold');
    }
  });

  Logger.log('Pesta\u00f1a "Gu\u00eda" creada.');
}

// ---------------------------------------------------------------------------
// Vistas de filtro (requiere el servicio avanzado "Google Sheets API")
// ---------------------------------------------------------------------------

function crearVistasDeFiltro() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_LEADS);
  if (!sh) throw new Error('No existe la pesta\u00f1a Leads. Ejecuta setup() primero.');
  const sheetId = sh.getSheetId();
  const nCols = LEADS_HEADERS.length;

  const rangoCompleto = { sheetId, startRowIndex: 0, endRowIndex: MAX_FILA_FORMATO, startColumnIndex: 0, endColumnIndex: nCols };
  const letraEstado = colLetter_(C_ESTADO);
  const letraSeguimiento = colLetter_(C_PROX_SEGUIMIENTO);

  const vistas = [
    {
      addFilterView: {
        filter: {
          title: 'Verdes sin contactar',
          range: rangoCompleto,
          criteria: {
            [C_NIVEL - 1]: { condition: { type: 'TEXT_EQ', values: [{ userEnteredValue: 'Verde' }] } },
            [C_ESTADO - 1]: { condition: { type: 'TEXT_EQ', values: [{ userEnteredValue: 'Nuevo' }] } },
          },
        },
      },
    },
    {
      addFilterView: {
        filter: {
          title: 'Seguimientos de hoy o vencidos',
          range: rangoCompleto,
          criteria: {
            [C_PROX_SEGUIMIENTO - 1]: {
              condition: {
                type: 'CUSTOM_FORMULA',
                values: [{ userEnteredValue: f_(`=AND($${letraSeguimiento}2<>""|$${letraSeguimiento}2<=TODAY())`) }],
              },
            },
          },
        },
      },
    },
    {
      addFilterView: {
        filter: {
          title: 'Todos los activos',
          range: rangoCompleto,
          criteria: {
            [C_ESTADO - 1]: {
              condition: {
                type: 'CUSTOM_FORMULA',
                values: [
                  {
                    userEnteredValue: f_(`=NOT(OR($${letraEstado}2="Ganado"|$${letraEstado}2="Perdido"|$${letraEstado}2="En nutrici\u00f3n"))`),
                  },
                ],
              },
            },
          },
        },
      },
    },
  ];

  Sheets.Spreadsheets.batchUpdate({ requests: vistas }, ss.getId());
  Logger.log('Vistas de filtro creadas (rev\u00edsalas y ajusta "Todos los activos" a mano si hace falta excluir m\u00e1s estados).');
}

// ============================================================================
// WEBHOOK \u2014 recibe los leads de la landing
// ============================================================================

function doGet() {
  return ContentService.createTextOutput('Certimedia Leads API \u2014 OK').setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const datos = parseEntrada_(e);
    if (!datos) {
      return responder_({ ok: false, error: 'Sin datos en la solicitud.' });
    }

    // Honeypot: si el bot complet\u00f3 este campo, se descarta en silencio.
    if (datos.hp_check && String(datos.hp_check).trim()) {
      return responder_({ ok: true, skipped: 'honeypot' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_LEADS);
    if (!sh) return responder_({ ok: false, error: 'No existe la pesta\u00f1a Leads. Ejecuta setup().' });

    const fila = sh.getLastRow() + 1;
    const dnc = esVerdadero_(datos.dnc_realizado) ? 'S\u00ed' : 'No';
    const origen = formatearOrigen_(datos);

    const valores = [
      new Date(),
      textoOVacio_(datos.name),
      textoOVacio_(datos.email),
      textoOVacio_(datos.phone),
      textoOVacio_(datos.otec),
      traducir_(OPCIONES_CURSOS, datos.cursos_anio),
      traducir_(OPCIONES_PERSONAS, datos.personas_anio),
      traducir_(OPCIONES_PROBLEMA, datos.problema_principal),
      traducir_(OPCIONES_DECISOR, datos.decisor_compra),
      traducir_(OPCIONES_PRESUPUESTO, datos.presupuesto),
      traducir_(OPCIONES_INICIO, datos.inicio_estimado),
      textoOVacio_(datos.message),
      dnc,
      origen,
    ];

    sh.getRange(fila, 1, 1, valores.length).setValues([valores]);
    sh.getRange(fila, C_ESTADO).setValue('Nuevo');
    escribirFormulasFila_(sh, fila);
    SpreadsheetApp.flush();

    notificarLeadNuevo_(ss, sh, fila);

    return responder_({ ok: true, fila });
  } catch (err) {
    Logger.log('Error en doPost: %s', err && err.stack ? err.stack : err);
    return responder_({ ok: false, error: String(err) });
  }
}

function parseEntrada_(e) {
  if (!e) return null;
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      // Si no vino como JSON (p. ej. x-www-form-urlencoded), cae a e.parameter.
    }
  }
  if (e.parameter && Object.keys(e.parameter).length) return e.parameter;
  return null;
}

function traducir_(mapa, codigo) {
  if (!codigo) return '';
  return mapa[codigo] || String(codigo);
}

function textoOVacio_(valor) {
  return valor === undefined || valor === null ? '' : String(valor).trim();
}

function esVerdadero_(valor) {
  const v = String(valor).trim().toLowerCase();
  return v === 's\u00ed' || v === 'si' || v === 'true' || v === 'on' || v === 'yes';
}

function formatearOrigen_(datos) {
  const partes = [datos.utm_source, datos.utm_medium, datos.utm_campaign].filter((v) => v && String(v).trim());
  return partes.length ? partes.join(' / ') : 'Directo';
}

function responder_(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(ContentService.MimeType.JSON);
}

/** Aviso corto por correo a quien est\u00e9 configurado en Config!CORREO_NOTIFICACION. */
function notificarLeadNuevo_(ss, sh, fila) {
  let correo = '';
  try {
    correo = ss.getRangeByName('CORREO_NOTIFICACION').getValue();
  } catch (err) {
    return;
  }
  correo = String(correo || '').trim();
  if (!correo) return;

  const nombre = sh.getRange(fila, C_NOMBRE).getValue();
  const otec = sh.getRange(fila, C_OTEC).getValue();
  const nivel = sh.getRange(fila, C_NIVEL).getDisplayValue();
  const puntaje = sh.getRange(fila, C_PUNTAJE).getValue();
  const accion = sh.getRange(fila, C_ACCION).getValue();
  const url = ss.getUrl();

  const asunto = `Lead ${nivel} (${puntaje} pts) \u00b7 ${otec || nombre}`;
  const cuerpo =
    `Nuevo lead desde la landing de Certimedia.\n\n` +
    `Nombre: ${nombre}\nOTEC: ${otec}\nNivel: ${nivel}\nPuntaje: ${puntaje}\n` +
    `Acci\u00f3n recomendada: ${accion}\n\nVer en el Sheet: ${url}`;

  try {
    MailApp.sendEmail(correo, asunto, cuerpo);
  } catch (err) {
    Logger.log('No se pudo enviar el correo de notificaci\u00f3n: %s', err);
  }
}
