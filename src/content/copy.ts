// Contenido textual centralizado de la landing de Certimedia.
// Editar el copy aquí no requiere tocar el layout de ningún componente.

export const site = {
  name: 'Certimedia',
  company: 'Certimedia Technologies SpA',
  url: 'https://www.certimedia.tech',
  email: 'caviles@certimedia.cl',
  phone: '+56 9 9381 9841',
  phoneHref: '+56993819841',
  address: 'Antonio Bellet 193, OF 1210, Santiago, Chile',
  addressMapUrl: 'https://maps.google.com/?q=Antonio+Bellet+193+OF+1210+Santiago+Chile',
  // SEO: mantener la frase "LMS para OTEC con integración SENCE" en title/meta/OG.
  title: 'LMS para OTEC con integración SENCE | Certimedia',
  // Meta description: acotada a ~155 caracteres (buena práctica SEO para no truncarse en buscadores).
  description:
    'Plataforma de gestión y capacitación para OTECs chilenas: cumplimiento SENCE, asistencia auditable y diplomas automáticos. Agenda una asesoría gratis.',
};

// CTA flotante (presente en todo el sitio): lleva al formulario de contacto.
// `url` es la agenda de HubSpot, reutilizada por ContactForm para el iframe incrustado.
export const whatsapp = {
  url: 'https://meetings.hubspot.com/cesar-aviles-cuevas',
  label: 'Agenda un diagnóstico',
  bubble: 'Agenda un diagnóstico',
};

// Persona de contacto que "gestiona" (se muestra en el CTA final).
export const contactPerson = {
  name: 'César Avilés',
  role: 'Business Manager en Certimedia',
  avatar: '/cesar-aviles.png',
};

// Nombres de las dos aplicaciones de la plataforma (editables sin tocar componentes).
export const productNames = {
  campus: 'Campus',
  control: 'Control',
};

export const nav = {
  logo: {
    src: '/logotipo-certimedia.svg',
    alt: 'Certimedia',
    width: 157,
    height: 32,
  },
  links: [
    { href: '#problemas', label: 'Problemas' },
    { href: '#solucion', label: 'Solución' },
    { href: '#caracteristicas', label: 'Características' },
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#faq', label: 'FAQ' },
  ],
  cta: 'Agenda un diagnóstico',
};

export const hero = {
  eyebrow: 'LMS y Gestión SENCE para OTECs',
  title: 'Menos carga operativa. Más tiempo para vender cursos.',
  subtitle:
    'Tus alumnos aprenden en tu campus. Tu equipo gestiona cohortes, empresas y reportería SENCE desde un solo panel. Todo con tu marca, operando en 2 semanas.',
  ctaPrimary: { label: 'Agenda un diagnóstico', href: '#contacto' },
  ctaSecondary: { label: 'Ver cómo funciona', href: '#como-funciona' },
  microcopy: '1 hora, sin costo y sin compromiso.',
};

// Franja de cifras bajo el hero (prueba social). Los 4 chips de abajo se mantienen
// como segunda línea, más discreta.
export const socialProof = {
  stats: [
    { value: 50, prefix: '+', label: 'Empresas confían en Certimedia' },
    { value: 15000, label: 'Profesionales certificados' },
    { value: 200, prefix: '+', label: 'Cursos disponibles' },
    { value: 94.5, suffix: '%', decimals: 1, label: 'Tasa de certificación' },
  ],
  note: 'Cifras de Certimedia como proveedor de capacitación.',
};

export const credibility = [
  'Plataforma propia de Certimedia',
  'Servidores dedicados',
  'Integración SENCE',
  'Soporte del equipo Certimedia',
];

export const problemsSection = {
  eyebrow: 'Problemas que resuelve',
  title: 'Lo que hoy te quita tiempo y te genera riesgo',
  description:
    'Elige un dolor de tu día a día y mira cómo lo resuelve la plataforma.',
};

export const problems = [
  {
    tag: 'Plazos SENCE',
    pain: 'Cerrar a tiempo las Declaraciones Juradas SENCE, revisando fecha por fecha y cohorte por cohorte para no dejar pasar un plazo.',
    solution:
      'Alertas preventivas de cierre: el sistema te avisa antes de cada fecha crítica para que la gestión SENCE sea proactiva, no de último minuto.',
    result: 'Gestión proactiva SENCE',
    icon: 'bell',
    illustration: 'plazos',
  },
  {
    tag: 'Asistencia y fiscalización',
    pain: 'Registro de asistencia manual, planillas armadas a mano y fiscalizaciones que exigen respaldo para cada sesión.',
    solution:
      'Asistencia automática y reportes válidos para fiscalización, con historial auditable de cada curso y cada alumno.',
    result: 'Respaldo auditable',
    icon: 'clipboard-check',
    illustration: 'asistencia',
  },
  {
    tag: 'Visibilidad para tus clientes',
    pain: 'Tus clientes (empresas) piden ver el avance de su gente, y hoy eso significa armar un reporte manual cada vez que preguntan.',
    solution:
      'Dashboard en vivo multi-empresa: cada cliente entra con su propio acceso y ve solo el avance de su equipo.',
    result: 'Dashboard multi-empresa',
    icon: 'bar-chart',
    illustration: 'visibilidad',
  },
  {
    tag: 'Carga operativa',
    pain: 'Tu equipo pierde tiempo cargando cursos, armando cohortes y coordinando cada detalle operativo en vez de vender más cursos.',
    solution:
      'Operación gestionada: el equipo de Certimedia configura tus cursos y cohortes por ti.',
    result: 'Operación gestionada',
    icon: 'settings',
    illustration: 'carga',
  },
  {
    tag: 'Plataforma y marca',
    pain: 'Plataformas genéricas que se caen en pleno curso, se ven iguales a las de la competencia y no reflejan tu marca.',
    solution:
      'Servidores dedicados y personalización total: dominio propio, tus logos y tus colores.',
    result: 'Servidores dedicados y marca propia',
    icon: 'shield-check',
    illustration: 'plataforma',
  },
  {
    tag: 'Diplomas y certificados',
    pain: 'Diplomas y certificados hechos a mano, uno por uno, después de cada curso que termina.',
    solution:
      'Diplomas en PDF automáticos e insignias digitales verificables, con flujos de correo automáticos.',
    result: 'Certificación automática',
    icon: 'award',
    illustration: 'diplomas',
  },
];

export const solution = {
  eyebrow: 'La solución',
  title: 'Una plataforma, dos experiencias',
  // SEO: única mención de la frase clave en el cuerpo de la página.
  description:
    'Un LMS para OTEC con integración SENCE, en dos aplicaciones que trabajan juntas: Campus y Control.',
  blocks: [
    {
      app: productNames.campus,
      tagline: 'Aprendizaje',
      description:
        'Avance, notas y asistencia SENCE de cada alumno en un solo panel, con alertas de baja dedicación mientras el curso aún está en marcha.',
      bullets: [
        'Alerta de baja dedicación, para contactar a tiempo a quien se atrasa',
        'Asistencia SENCE por sesión, por alumno y sin planillas',
        'Reporte semanal a tu cliente, programado una sola vez',
        'Diploma e insignia (Open Badges) automáticos al aprobar',
        'Todo con tu marca: dominio, logo y colores',
      ],
      icon: 'badge',
      illustration: 'diplomas',
      image: '/solucion-dashboard.webp',
      imageWidth: 2000,
      imageHeight: 884,
      imageAlt:
        'Avance de los alumnos por curso en Campus, con evaluaciones y asistencia.',
      floatingCardIcon: 'award',
      statCardIcon: 'bar-chart',
      peopleVariants: [0, 1, 2, 3],
    },
    {
      app: productNames.control,
      tagline: 'Gestión y cumplimiento',
      description:
        'Tu equipo gestiona cohortes y empresas, y lleva la reportería SENCE (asistencia, Declaración Jurada y reportes para fiscalización) con alertas antes de cada cierre, en un dashboard multi-empresa.',
      bullets: [
        'Integración directa con SENCE (asistencia automática)',
        'Gestión proactiva de Declaraciones Juradas',
        'Alertas antes de cada fecha crítica',
        'Reportes válidos para fiscalización',
        'Historial completo auditable',
        'Dashboard multi-empresa',
      ],
      icon: 'dashboard',
      illustration: 'visibilidad',
      image: '/solucion-sence.webp',
      imageWidth: 2000,
      imageHeight: 821,
      imageAlt:
        'Reportes y trazabilidad en Control, con cumplimiento SENCE, asistencia y alertas de cierre.',
      floatingCardIcon: 'bell',
      statCardIcon: 'clipboard-check',
      peopleVariants: [1, 2, 3, 4],
    },
  ],
};

export const beforeAfter = {
  eyebrow: 'Lo que cambia',
  title: 'Lo que cambia en tu operación',
  rows: [
    {
      before: 'Cuadrar planillas de asistencia al cierre',
      after: 'Asistencia por alumno y por sesión registrada automáticamente',
    },
    {
      before: 'Enterarte tarde del plazo SENCE',
      after: 'Alertas preventivas antes de cada cierre de Declaración Jurada',
    },
    {
      before: 'Armar reportes para cada empresa cliente',
      after: 'Reporte semanal programado y dashboard en vivo',
    },
    {
      before: 'Descubrir al final quién no avanzó',
      after: 'Alerta de baja dedicación mientras el curso sigue',
    },
    {
      before: 'Emitir diplomas a mano',
      after: 'Diploma PDF e insignia emitidos al aprobar',
    },
  ],
  cta: { label: 'Revisemos tu caso en una demo', href: '#contacto' },
};

export const comparison = {
  eyebrow: 'Comparación',
  title: '¿Por qué una plataforma para OTEC?',
  subtitle: 'Comparación por tipo de solución, no por proveedor.',
  topics: ['Todo', 'SENCE', 'Operación', 'Clientes'],
  columns: ['Suite corporativa de RR. HH.', 'Moodle propio o integrador', 'Certimedia'],
  rows: [
    {
      label: 'Pensada para OTEC',
      topic: 'Operación',
      cells: [
        'Enfocada en RR. HH. de empresas',
        'Plataforma genérica que se adapta',
        'Diseñada para operar una OTEC',
      ],
    },
    {
      label: 'Asistencia y cierre SENCE',
      topic: 'SENCE',
      cells: [
        'Declaran cumplimiento; el detalle varía',
        'Suele requerir plugin o módulo adicional',
        'Registro automático conectado a SENCE y alertas de cierre',
      ],
      detail:
        'El registro automático reduce errores de digitación y queda disponible para cualquier fiscalización.',
    },
    {
      label: 'Quién opera la plataforma',
      topic: 'Operación',
      cells: [
        'Onboarding inicial; luego operas tú',
        'Tú o tu equipo técnico',
        'Opción gestionada: Certimedia carga cursos y configura cohortes',
      ],
      detail:
        'La opción gestionada es ideal si tu equipo no tiene tiempo de cargar cursos y armar cohortes.',
    },
    {
      label: 'Panel para tus empresas cliente',
      topic: 'Clientes',
      cells: ['No siempre incluido', 'Requiere desarrollo a medida', 'Dashboard multi-empresa en vivo'],
    },
    {
      label: 'Alertas para actuar a tiempo',
      topic: 'Operación',
      cells: [
        'Depende de la configuración',
        'Depende de la configuración',
        'Alerta de baja dedicación y aviso antes de cada cierre',
      ],
      detail:
        'Las alertas de baja dedicación llegan mientras el curso sigue en marcha, no al final.',
    },
    {
      label: 'Diplomas e insignias verificables',
      topic: 'Operación',
      cells: [
        'Certificados de participación',
        'Con plugin adicional',
        'Diploma PDF e insignias Open Badges automáticos',
      ],
    },
  ],
  footnote:
    'Comparación entre categorías generales de solución; las funciones varían según cada proveedor.',
};

export const features = {
  eyebrow: 'Características',
  title: 'Todo lo que incluye la plataforma',
  description:
    'Las funcionalidades con las que tu OTEC opera cursos, cumple con SENCE y entrega evidencia.',
  groups: [
    {
      title: 'Cumplimiento SENCE',
      illustration: 'plazos',
      items: [
        'Integración directa con SENCE (asistencia automática)',
        'Reportes válidos para fiscalización',
        'Configuración según SENCE vigente',
      ],
    },
    {
      title: 'Asistencia y actividad',
      illustration: 'asistencia',
      items: [
        'Registro de asistencia automático conectado a SENCE',
        'Tiempo de conexión',
        'Avance del curso',
        'Actividades realizadas',
        'Alerta de baja dedicación por alumno',
      ],
    },
    {
      title: 'Cursos y aprendizaje',
      illustration: 'cursos',
      items: [
        'Creación de cursos (módulos, evaluaciones)',
        'Seguimiento de alumnos (avance, notas)',
        'Evaluaciones online',
        'Certificados o diplomas automáticos emitidos desde la plataforma',
        'Insignias digitales verificables (Open Badges)',
        'Flujos de correo automáticos',
      ],
    },
    {
      title: 'Reportería y evidencia',
      illustration: 'visibilidad',
      items: [
        'Reporte de asistencia por alumno',
        '% de avance por curso',
        'Historial completo auditable',
        'Dashboard multi-empresa en vivo para tus clientes',
        'Reporte semanal programado a la empresa cliente',
      ],
    },
    {
      title: 'Administración y seguridad',
      illustration: 'plataforma',
      items: [
        'Control de usuarios (admin, relator, alumno)',
        'Respaldo de información',
        'Servidores dedicados (infraestructura exclusiva para tu plataforma)',
        'Dominio propio, logotipos y colores corporativos',
      ],
    },
    {
      title: 'Integración IA',
      illustration: 'roadmap',
      items: [
        { text: 'Asistente de IA para consultas de los alumnos', status: 'roadmap' },
        { text: 'Apoyo al equipo de gestión', status: 'roadmap' },
        'Disponible próximamente en Campus y Control',
      ],
    },
  ],
};

export const howItWorks = {
  eyebrow: 'Cómo partimos',
  title: 'De la demo a la operación continua',
  note: 'La puesta en marcha toma 2 semanas.',
  steps: [
    {
      title: 'Demo y diagnóstico',
      shortLabel: 'Diagnóstico',
      description:
        'Revisamos cómo gestionas hoy tus cursos, tu reportería SENCE y qué necesitas evidenciar frente a tus clientes, para dimensionar la puesta en marcha.',
      illustration: 'diagnostico',
    },
    {
      title: 'Configuración',
      shortLabel: 'Configuración',
      description:
        'Dejamos tu aula operativa con tu dominio, logo y colores, más la estructura de cursos, cohortes y dashboard que tu equipo va a usar día a día.',
      illustration: 'marca',
    },
    {
      title: 'Piloto',
      shortLabel: 'Piloto',
      description:
        'Corremos tu primer curso real con acompañamiento de nuestro equipo, ajustando flujos y reportes antes de pasar a régimen.',
      illustration: 'cursos',
    },
    {
      title: 'Operación continua',
      shortLabel: 'Operación',
      description:
        'Pasas a suscripción mensual con soporte incluido: tu equipo opera el día a día y el nuestro responde cuando surgen dudas o imprevistos.',
      illustration: 'soporte',
    },
  ],
};

export const serviceModel = {
  eyebrow: 'Modelo de servicio',
  title: 'Dos formas de operar tu plataforma',
  options: [
    {
      title: 'Autogestionado',
      shortLabel: 'Auto',
      tagline: 'Tú llevas el control',
      description:
        'Tú subes y administras tus propios cursos, cohortes y alumnos, con toda la plataforma a tu disposición.',
      icon: 'settings',
    },
    {
      title: 'Gestionado',
      shortLabel: 'Gestionado',
      tagline: 'Certimedia opera por ti',
      description:
        'Certimedia carga tus contenidos, configura las cohortes y te deja todo listo para operar.',
      icon: 'shield-check',
    },
  ],
  // Tabla "quién lo hace": derivada literalmente de las dos descripciones de arriba
  // (no agrega tareas ni datos nuevos, solo las ordena en una comparación).
  tasks: [
    { label: 'Cargar los cursos', auto: 'tu', managed: 'certimedia' },
    { label: 'Configurar las cohortes', auto: 'tu', managed: 'certimedia' },
    { label: 'Administrar alumnos y seguimiento', auto: 'tu', managed: 'tu' },
  ],
  closing: 'Te ayudamos a elegir el modelo en la demo.',
};

export const support = {
  eyebrow: 'Soporte y mejora continua',
  title: 'No quedas solo después de la implementación',
  items: [
    {
      title: 'Soporte del equipo Certimedia',
      description:
        'Un equipo disponible para resolver dudas y problemas operativos de tu plataforma.',
      icon: 'message-circle',
    },
    {
      title: 'Actualizaciones normativas y de seguridad',
      description:
        'La plataforma se mantiene al día con los cambios normativos de SENCE y con parches de seguridad.',
      icon: 'shield-check',
    },
    {
      title: 'Roadmap con IA y agentes',
      description:
        'Seguimos incorporando funciones de inteligencia artificial y agentes para hacer tu operación cada vez más simple.',
      icon: 'cpu',
    },
  ],
};

export const contactForm = {
  eyebrow: 'Agenda un diagnóstico',
  title: 'Hablemos de tu OTEC',
  description:
    'Cuéntanos de tu OTEC y te contactamos para coordinar una demo o asesoría gratuita de 1 hora.',
  disclaimer: 'Sin costo, sin compromiso.',
  submitLabel: 'Agenda un diagnóstico',
  cursosOptions: [
    { value: '', label: 'Selecciona un rango' },
    { value: '1-5', label: '1 a 5' },
    { value: '6-20', label: '6 a 20' },
    { value: '21-50', label: '21 a 50' },
    { value: '50+', label: 'Más de 50' },
    { value: 'no-se', label: 'Aún no lo sé' },
  ],
  personasOptions: [
    { value: '', label: 'Selecciona un rango' },
    { value: '<100', label: 'Menos de 100' },
    { value: '100-500', label: '100 a 500' },
    { value: '501-1000', label: '501 a 1.000' },
    { value: '1000+', label: 'Más de 1.000' },
    { value: 'no-se', label: 'Aún no lo sé' },
  ],
  // Opciones cruzadas con los dolores de la sección "Problemas" de la landing.
  problemaOptions: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'sence', label: 'Cumplir los plazos y Declaraciones Juradas SENCE' },
    { value: 'asistencia', label: 'Automatizar la asistencia y los reportes de fiscalización' },
    { value: 'visibilidad', label: 'Dar visibilidad a mis clientes sobre el avance de su gente' },
    { value: 'carga', label: 'Reducir la carga operativa de cargar cursos y armar cohortes' },
    { value: 'marca', label: 'Tener una plataforma propia, con mi marca y dominio' },
    { value: 'certificados', label: 'Automatizar diplomas y certificados' },
    { value: 'otro', label: 'Otro' },
  ],
  presupuestoOptions: [
    { value: '', label: 'Selecciona un rango' },
    { value: 'sin-definir', label: 'Aún no tengo un presupuesto definido' },
    { value: '<300000', label: 'Menos de $300.000 CLP al mes' },
    { value: '300000-700000', label: '$300.000 a $700.000 CLP al mes' },
    { value: '700000-1500000', label: '$700.000 a $1.500.000 CLP al mes' },
    { value: '1500000+', label: 'Más de $1.500.000 CLP al mes' },
  ],
  decisorOptions: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'yo', label: 'Yo decido' },
    { value: 'compartida', label: 'La decisión es compartida con otra persona' },
    { value: 'otro', label: 'Otra persona decide; yo evalúo la propuesta' },
  ],
  inicioOptions: [
    { value: '', label: 'Selecciona un rango' },
    { value: 'lo-antes-posible', label: 'Lo antes posible' },
    { value: 'este-trimestre', label: 'Dentro de este trimestre' },
    { value: 'sin-fecha', label: 'Aún estoy evaluando, sin fecha definida' },
  ],
  dncLabel: 'Ya cuento con un DNC o NDS realizado',
  states: {
    loading: 'Enviando...',
    success: '¡Listo! Te contactaremos a la brevedad para coordinar tu demo.',
    error:
      'No pudimos enviar tu solicitud. Inténtalo nuevamente o escríbenos directamente a caviles@certimedia.cl.',
  },
  // Entrega vía FormSubmit. El destinatario principal va en PUBLIC_FORM_ENDPOINT
  // (formsubmit.co/ajax/<correo>); aquí la copia (CC) y el asunto del correo.
  delivery: {
    cc: 'clopez@certimedia.cl',
    subject: 'Nueva solicitud de demo · landing Certimedia',
  },
};

export const faq = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Lo que más nos preguntan las OTECs',
  items: [
    {
      question: '¿Funciona con SENCE?',
      answer:
        'Sí. Control incluye gestión proactiva de los plazos y las Declaraciones Juradas de la franquicia SENCE, con alertas antes de cada fecha crítica.',
    },
    {
      question: '¿Puedo usar mi propio dominio y marca?',
      answer:
        'Sí. La plataforma se personaliza con tu dominio propio, tus logos y tus colores.',
    },
    {
      question: '¿Quién carga los cursos?',
      answer:
        'Depende del modelo que elijas: en el modelo autogestionado tú subes y administras tus cursos; en el modelo gestionado, el equipo de Certimedia los carga por ti y configura las cohortes.',
    },
    {
      question: '¿Cuánto demora la puesta en marcha?',
      answer: '2 semanas, siguiendo las 4 etapas de implementación.',
    },
    {
      question: '¿Mis clientes pueden ver el avance de su equipo?',
      answer:
        'Sí. El dashboard es multi-empresa: cada cliente accede solo a la información de su propio equipo.',
    },
    {
      question: '¿Qué soporte incluye?',
      answer:
        'Soporte del equipo Certimedia, actualizaciones normativas y de seguridad, y un roadmap continuo que incorpora IA y agentes.',
    },
    {
      question: '¿Qué pasa si cambian las normas de SENCE?',
      answer:
        'La plataforma se mantiene al día con los cambios normativos de SENCE y con parches de seguridad, como parte del soporte continuo de Certimedia.',
    },
    {
      question: '¿Mis datos y los de mis alumnos están seguros?',
      answer:
        'Sí. La plataforma incluye control de usuarios por rol (administrador, relator, alumno), respaldo de información y hosting confiable.',
    },
    {
      question: '¿Qué incluye la asesoría gratuita?',
      answer:
        'En la reunión de 1 hora revisamos cómo opera tu OTEC hoy, te mostramos Campus y Control en vivo, y te ayudamos a elegir entre el modelo autogestionado o gestionado según tu caso.',
    },
    {
      question: '¿Quiénes somos?',
      answer:
        'Certimedia Technologies SpA es una empresa chilena especializada en capacitaciones y certificaciones digitales. Construimos Campus y Control pensando en cómo opera una OTEC en Chile, no como un LMS genérico. Operamos desde Providencia, Santiago.',
    },
    // TODO(contenido): el brief pide una pregunta "¿Puedo migrar mis cursos actuales?",
    // pero no se entregó información verificada sobre el proceso o alcance de la migración.
    // Para no inventar una respuesta visible en la página, esta pregunta queda fuera del
    // array hasta tener el dato real; agregarla aquí con el mismo formato cuando se confirme.
  ],
};

export const finalCta = {
  title: 'Deja de perseguir plazos SENCE a mano.',
  subtitle: 'Agenda una demo gratuita de 1 hora y revisemos tu caso.',
  cta: { label: 'Agenda un diagnóstico', href: '#contacto' },
};

export const footer = {
  cta: { label: 'Agenda un diagnóstico', href: '#contacto' },
  description:
    'Plataforma de Gestión y Capacitación para OTECs chilenas: Campus para el aprendizaje y Control para la gestión SENCE, cohortes y reportería.',
};
