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
  label: 'Agenda una demo',
  bubble: 'Agenda una demo',
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
  cta: 'Agenda una demo',
};

export const hero = {
  eyebrow: 'Plataforma de Gestión y Capacitación para OTECs',
  title: 'Menos carga operativa. Más tiempo para vender cursos.',
  subtitle:
    'Tus alumnos aprenden en tu campus. Tu equipo gestiona cohortes, empresas y reportería SENCE desde un solo panel. Todo con tu marca, operando en 2 semanas.',
  ctaPrimary: { label: 'Agenda tu asesoría gratis', href: '#contacto' },
  ctaSecondary: { label: 'Ver cómo funciona', href: '#como-funciona' },
  microcopy: '1 hora, sin costo y sin compromiso.',
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
    pain: 'Cerrar a tiempo las Declaraciones Juradas SENCE.',
    solution:
      'Alertas preventivas de cierre: el sistema te avisa antes de cada fecha crítica para que la gestión SENCE sea proactiva, no de último minuto.',
    result: 'Gestión proactiva SENCE',
    icon: 'bell',
    illustration: 'plazos',
  },
  {
    tag: 'Asistencia y fiscalización',
    pain: 'Registro de asistencia manual y fiscalizaciones que exigen respaldo.',
    solution:
      'Asistencia automática y reportes válidos para fiscalización, con historial auditable de cada curso y cada alumno.',
    result: 'Respaldo auditable',
    icon: 'clipboard-check',
    illustration: 'asistencia',
  },
  {
    tag: 'Visibilidad para tus clientes',
    pain: 'Tus clientes (empresas) piden ver el avance de su gente.',
    solution:
      'Dashboard en vivo multi-empresa: cada cliente entra con su propio acceso y ve solo el avance de su equipo.',
    result: 'Dashboard multi-empresa',
    icon: 'bar-chart',
    illustration: 'visibilidad',
  },
  {
    tag: 'Carga operativa',
    pain: 'Tu equipo pierde tiempo cargando cursos y armando cohortes.',
    solution:
      'Operación gestionada: el equipo de Certimedia configura tus cursos y cohortes por ti.',
    result: 'Operación gestionada',
    icon: 'settings',
    illustration: 'carga',
  },
  {
    tag: 'Plataforma y marca',
    pain: 'Plataformas genéricas que se caen o no se ven como tu marca.',
    solution:
      'Servidores dedicados y personalización total: dominio propio, tus logos y tus colores.',
    result: 'Servidores dedicados y marca propia',
    icon: 'shield-check',
    illustration: 'plataforma',
  },
  {
    tag: 'Diplomas y certificados',
    pain: 'Diplomas y certificados hechos a mano.',
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
        'El campus donde tus alumnos aprenden: toman cursos con módulos y evaluaciones, avanzan a su ritmo y tú sigues su progreso y notas en tiempo real, con certificación automática al cerrar cada curso.',
      bullets: [
        'Creación de cursos (módulos y evaluaciones)',
        'Evaluaciones online',
        'Seguimiento de alumnos (avance y notas)',
        'Diplomas en PDF automáticos',
        'Insignias digitales verificables',
        'Flujos de correo automáticos',
      ],
      icon: 'badge',
      illustration: 'diplomas',
      image: '/solucion-dashboard.webp',
      imageWidth: 2000,
      imageHeight: 884,
      imageAlt:
        'Avance de los alumnos por curso en Campus, con evaluaciones y asistencia.',
      floatingCard: {
        icon: 'award',
        title: 'Diploma emitido',
        subtitle: 'Insignia digital verificable',
      },
      people: { label: '18 alumnos activos', variants: [0, 1, 2, 3] },
      statCard: { label: 'Avance promedio', value: '68%', icon: 'bar-chart' },
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
      floatingCard: {
        icon: 'bell',
        title: 'Declaración Jurada SENCE',
        subtitle: 'Cierra en 12 días',
      },
      people: { label: '8 empresas cliente', variants: [1, 2, 3, 4] },
      statCard: { label: 'Asistencia SENCE', value: '96%', icon: 'clipboard-check' },
    },
  ],
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
      ],
    },
    {
      title: 'Reportería y evidencia',
      illustration: 'visibilidad',
      items: [
        'Reporte de asistencia por alumno',
        '% de avance por curso',
        'Historial completo auditable',
      ],
    },
    {
      title: 'Administración y seguridad',
      illustration: 'plataforma',
      items: [
        'Control de usuarios (admin, relator, alumno)',
        'Respaldo de información',
        'Hosting confiable',
      ],
    },
    {
      title: 'Integración IA',
      illustration: 'roadmap',
      items: [
        'Asistente de IA para consultas de los alumnos',
        'Apoyo al equipo de gestión',
        'Integrado en Campus y Control',
      ],
    },
  ],
};

export const howItWorks = {
  eyebrow: 'Cómo funciona',
  title: 'De la primera conversación a tu plataforma operando',
  note: 'La puesta en marcha toma 2 semanas.',
  steps: [
    {
      title: 'Diagnóstico',
      description:
        'Revisamos cómo opera tu OTEC hoy: cursos, cohortes y requisitos SENCE.',
      illustration: 'diagnostico',
    },
    {
      title: 'Implementación y personalización de marca',
      description:
        'Configuramos tu plataforma con tu dominio, tus logos y tus colores.',
      illustration: 'marca',
    },
    {
      title: 'Carga de cursos y cohortes',
      description:
        'Subimos tus contenidos y armamos tus cohortes según el modelo que elijas.',
      illustration: 'cursos',
    },
    {
      title: 'Operación y soporte continuo',
      description:
        'Tu plataforma queda operando, con el equipo de Certimedia disponible para apoyarte.',
      illustration: 'operacion',
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
      illustration: 'soporte',
    },
    {
      title: 'Actualizaciones normativas y de seguridad',
      description:
        'La plataforma se mantiene al día con los cambios normativos de SENCE y con parches de seguridad.',
      illustration: 'actualizaciones',
    },
    {
      title: 'Roadmap con IA y agentes',
      description:
        'Seguimos incorporando funciones de inteligencia artificial y agentes para hacer tu operación cada vez más simple.',
      illustration: 'roadmap',
    },
  ],
};

export const contactForm = {
  eyebrow: 'Agenda tu demo',
  title: 'Hablemos de tu OTEC',
  description:
    'Cuéntanos de tu OTEC y te contactamos para coordinar una demo o asesoría gratuita de 1 hora.',
  disclaimer: 'Sin costo, sin compromiso.',
  submitLabel: 'Agenda una demo gratis',
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
  cta: { label: 'Agenda una demo gratis', href: '#contacto' },
};

export const footer = {
  cta: { label: 'Agenda una demo gratis', href: '#contacto' },
  description:
    'Plataforma de Gestión y Capacitación para OTECs chilenas: Campus para el aprendizaje y Control para la gestión SENCE, cohortes y reportería.',
};
