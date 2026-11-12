// Contenido textual centralizado de la landing "LMS Certimedia".
// Editar el copy aquí no requiere tocar el layout de ningún componente.

export const site = {
  name: 'LMS Certimedia',
  company: 'Certimedia Technologies SpA',
  url: 'https://www.certimedia.tech',
  email: 'caviles@certimedia.cl',
  phone: '+56 9 9381 9841',
  phoneHref: '+56993819841',
  address: 'Providencia, Santiago, Chile',
  title: 'LMS para OTEC con integración SENCE | LMS Certimedia',
  description:
    'Plataforma de aprendizaje gestionada para OTECs chilenas: gestión proactiva SENCE, asistencia auditable, dashboard multi-empresa y diplomas automáticos. Agenda una demo gratis.',
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
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#faq', label: 'FAQ' },
  ],
  cta: 'Agenda una demo',
};

export const hero = {
  eyebrow: 'LMS gestionado para OTECs',
  title: 'Menos carga operativa. Más tiempo para vender cursos.',
  subtitle:
    'El LMS Certimedia centraliza tus cursos, asistencia y certificación, con alertas que te avisan antes de cada fecha crítica de la franquicia SENCE.',
  ctaPrimary: { label: 'Agenda una demo gratis', href: '#contacto' },
  ctaSecondary: { label: 'Ver cómo funciona', href: '#como-funciona' },
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
    'Elige un dolor de tu día a día y mira cómo lo resuelve el LMS Certimedia.',
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
      'Diplomas en PDF automáticos e insignias digitales verificables (Open Badges), con flujos de correo automáticos.',
    result: 'Certificación automática',
    icon: 'award',
    illustration: 'diplomas',
  },
];

export const solution = {
  eyebrow: 'La solución',
  title: 'Un LMS pensado para cómo opera una OTEC chilena',
  blocks: [
    {
      title: 'Integración SENCE',
      description:
        'Gestión proactiva de los plazos y las Declaraciones Juradas de la franquicia SENCE, con alertas antes de cada fecha crítica.',
      bullets: [
        'Alertas antes de cada fecha crítica',
        'Gestión proactiva de Declaraciones Juradas',
      ],
      icon: 'sence',
      image: '/solucion-sence.webp',
      imageWidth: 2000,
      imageHeight: 821,
      imageAlt:
        'Panel de reportes y trazabilidad del LMS Certimedia con cumplimiento SENCE, asistencia y alertas de cierre.',
    },
    {
      title: 'Dashboard y reportería',
      description:
        'Reportes de asistencia y avance listos para fiscalización, con acceso multi-empresa para que cada cliente vea solo a su equipo.',
      bullets: [
        'Asistencia y avance en vivo',
        'Reportes válidos para fiscalización',
        'Acceso multi-empresa',
      ],
      icon: 'dashboard',
      image: '/solucion-dashboard.webp',
      imageWidth: 2000,
      imageHeight: 884,
      imageAlt:
        'Reportería del LMS Certimedia con el avance por módulos, evaluaciones, asistencia SENCE y alertas de cada alumno.',
    },
    {
      title: 'Certificaciones y credenciales',
      description:
        'Diplomas en PDF automáticos e insignias digitales verificables (Open Badges) al finalizar cada curso.',
      bullets: [
        'Diplomas en PDF automáticos',
        'Insignias Open Badges verificables',
        'Flujos de correo automáticos',
      ],
      icon: 'badge',
      // TODO(imagen): falta una captura real de un diploma / credencial generado por la plataforma.
      // Dejar el archivo en public/ como solucion-certificaciones.webp (~2000 px de ancho). Mientras
      // no exista, este slot muestra un placeholder automáticamente.
      image: '/solucion-certificaciones.webp',
      imageWidth: 2000,
      imageHeight: 820,
      imageAlt:
        'Diploma en PDF e insignia digital verificable generados por el LMS Certimedia.',
    },
  ],
};

export const howItWorks = {
  eyebrow: 'Cómo funciona',
  title: 'De la primera conversación a tu plataforma operando',
  note: 'La puesta en marcha toma entre 1 y 2 semanas.',
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
  title: 'Dos formas de operar tu LMS',
  options: [
    {
      title: 'Autogestionado',
      description:
        'Tú subes y administras tus propios cursos, cohortes y alumnos, con toda la plataforma a tu disposición.',
    },
    {
      title: 'Gestionado',
      description:
        'Certimedia carga tus contenidos, configura las cohortes y te deja todo listo para operar.',
    },
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
  volumeOptions: [
    { value: '', label: 'Selecciona un rango' },
    { value: '1-10', label: '1 a 10 cursos o alumnos al año' },
    { value: '11-50', label: '11 a 50 cursos o alumnos al año' },
    { value: '51-200', label: '51 a 200 cursos o alumnos al año' },
    { value: '200+', label: 'Más de 200 cursos o alumnos al año' },
  ],
  states: {
    loading: 'Enviando...',
    success: '¡Listo! Te contactaremos a la brevedad para coordinar tu demo.',
    error:
      'No pudimos enviar tu solicitud. Inténtalo nuevamente o escríbenos directamente a caviles@certimedia.cl.',
  },
};

export const faq = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Lo que más nos preguntan las OTECs',
  items: [
    {
      question: '¿Funciona con SENCE?',
      answer:
        'Sí. El LMS Certimedia incluye gestión proactiva de los plazos y las Declaraciones Juradas de la franquicia SENCE, con alertas antes de cada fecha crítica.',
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
      answer: 'Entre 1 y 2 semanas, siguiendo las 4 etapas de implementación.',
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
    'LMS gestionado para OTECs chilenas: cumplimiento SENCE, reportería y certificación en una sola plataforma.',
};
