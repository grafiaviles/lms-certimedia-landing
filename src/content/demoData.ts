// Datos de ejemplo (ficticios) reutilizados por TODOS los mockups de la landing
// (carrusel del hero, tarjetas flotantes de Solución, etc.).
// Objetivo: que ningún número se contradiga entre secciones.
// Todo valor derivado (promedios, cumplimiento, en riesgo) se calcula aquí — nunca a mano.

export const demoOtecName = 'Campus Ejemplo OTEC';

// --- Datos globales (todas las cohortes) ---
export const demoGlobal = {
  cohortesTotal: 12,
  cohortesVigentes: 4,
  empresasCliente: 8,
  alumnosEnCurso: 48,
  asistenciaSencePromedio: 88, // %
  declaracionJurada: { diasParaCierre: 5, cohortesPendientes: 3 },
};

// --- Avance por cohorte vigente ---
export const demoCohortesVigentes = [
  { nombre: 'Prevención de riesgos', avance: 82 },
  { nombre: 'Excel intermedio', avance: 64 },
  { nombre: 'Atención a cliente', avance: 45 },
  { nombre: 'Estrategias de Adopción de IA', avance: 55 },
];

export const demoAvancePromedioGlobal = Math.round(
  demoCohortesVigentes.reduce((sum, c) => sum + c.avance, 0) / demoCohortesVigentes.length
);

// --- Cohorte destacada (con alumnos, usada en varios mockups) ---
const cohorteDestacadaBase = {
  nombre: 'Estrategias de Adopción de IA',
  totalSesiones: 8,
  umbralAsistencia: 75, // % mínimo para "cumple"
  alumnos: [
    { nombre: 'Camila Rojas', avance: 85, sesionesAsistidas: 7 },
    { nombre: 'Valentina Soto', avance: 64, sesionesAsistidas: 5 },
    { nombre: 'Josefa Vega', avance: 100, sesionesAsistidas: 6 },
    { nombre: 'Tomás Reyes', avance: 47, sesionesAsistidas: 4 },
    { nombre: 'Diego Muñoz', avance: 20, sesionesAsistidas: 2 },
    { nombre: 'Fernanda Díaz', avance: 12, sesionesAsistidas: 1 },
  ],
};

function construirCohorteDestacada() {
  const { alumnos, totalSesiones, umbralAsistencia } = cohorteDestacadaBase;
  const alumnosConDerivados = alumnos.map((alumno) => {
    const asistenciaPct = Math.round((alumno.sesionesAsistidas / totalSesiones) * 100);
    return {
      ...alumno,
      asistenciaPct,
      cumpleAsistencia: asistenciaPct >= umbralAsistencia,
      enRiesgo: alumno.avance < 30,
    };
  });

  const cumplen = alumnosConDerivados.filter((a) => a.cumpleAsistencia);
  const enRiesgo = alumnosConDerivados.filter((a) => a.enRiesgo);
  const avancePromedio = Math.round(
    alumnosConDerivados.reduce((sum, a) => sum + a.avance, 0) / alumnosConDerivados.length
  );
  const asistenciaPromedio = Math.round(
    alumnosConDerivados.reduce((sum, a) => sum + a.asistenciaPct, 0) / alumnosConDerivados.length
  );

  return {
    ...cohorteDestacadaBase,
    alumnos: alumnosConDerivados,
    cumplenCount: cumplen.length,
    enRiesgoCount: enRiesgo.length,
    avancePromedio,
    asistenciaPromedio,
  };
}

export const demoCohorteDestacada = construirCohorteDestacada();

// --- Tarjetas flotantes (Solución): texto final ya armado a partir de lo anterior ---
export const demoFloatingCards = {
  campus: {
    scope: 'Todas las cohortes',
    title: `${demoGlobal.alumnosEnCurso} alumnos en curso`,
    subtitle: `Avance promedio ${demoAvancePromedioGlobal}%`,
  },
  control: {
    scope: 'Todas las cohortes',
    title: `${demoGlobal.empresasCliente} empresas cliente`,
    subtitle: `Asistencia SENCE ${demoGlobal.asistenciaSencePromedio}% · DJ cierra en ${demoGlobal.declaracionJurada.diasParaCierre} días`,
  },
};

export const demoStatCards = {
  campus: { label: 'Avance promedio', value: `${demoAvancePromedioGlobal}%` },
  control: { label: 'Asistencia SENCE', value: `${demoGlobal.asistenciaSencePromedio}%` },
};

export const demoPeopleChips = {
  campus: { label: `${demoGlobal.alumnosEnCurso} alumnos en curso` },
  control: { label: `${demoGlobal.empresasCliente} empresas cliente` },
};

// Sin logos reales todavía: se deja vacío a propósito (ver Credibility.astro).
export type ClientLogo = { name: string; src: string; alt: string };
export const clientLogos: ClientLogo[] = [];
