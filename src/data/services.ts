import type { Service } from '@/types';

export const services: Service[] = [
  {
    slug: 'productos-web',
    title: 'Productos web B2B',
    seoTitle: 'Desarrollo de catálogos web B2B',
    seoDescription:
      'Desarrollo de catálogos y plataformas web B2B conectados a tus datos, con SEO técnico y rendimiento definidos. Alcance, entregables y casos reales.',
    serviceType: 'Desarrollo de catálogos y plataformas web B2B',
    updated: '2026-10-25',
    headline: 'Desarrollo de catálogos y plataformas web B2B',
    summary:
      'Diseño y desarrollo de catálogos, sitios comerciales y plataformas web B2B conectados a tus datos, con SEO técnico y rendimiento definidos desde el inicio.',
    forWho: [
      'Empresas con un catálogo amplio que necesitan publicarlo y mantenerlo sin trabajo manual',
      'Equipos comerciales que necesitan un canal web que genere solicitudes de cotización',
      'Negocios que quieren reemplazar un sitio difícil de mantener por una base técnica sólida',
    ],
    notFor: [
      'Aplicaciones móviles nativas',
      'Proyectos que solo requieren una plantilla visual sin integración ni contenido propio',
    ],
    scenarios: [
      {
        title: 'Catálogo conectado a tus datos',
        description:
          'Tus productos viven en una hoja de cálculo, un ERP o el sitio de un proveedor. Se definen las fuentes, las reglas de actualización y la experiencia de búsqueda antes de desarrollar.',
      },
      {
        title: 'Sitio comercial que hay que rehacer',
        description:
          'El sitio actual es lento o difícil de editar. Se migra a una arquitectura estática o híbrida conservando URLs y posicionamiento mediante redirecciones.',
      },
      {
        title: 'Páginas a escala',
        description:
          'Necesitas cientos o miles de páginas (productos, ciudades, categorías) con contenido útil y control de qué se indexa.',
      },
    ],
    includes: [
      'Arquitectura de información y flujos de las tareas principales',
      'Diseño UX/UI de las plantillas clave con prototipo revisable',
      'Desarrollo frontend y generación estática o híbrida',
      'SEO técnico: metadatos, datos estructurados, sitemap y redirecciones',
      'Presupuesto de rendimiento definido y verificado antes de publicar',
    ],
    excludes: [
      'Gestión de campañas publicitarias',
      'Producción de fotografía o vídeo',
      'Redacción masiva de contenidos sin fuente de datos',
    ],
    dependencies: [
      'Acceso a las fuentes de datos (catálogo, inventario, precios)',
      'Una persona de tu equipo que valide contenido y prioridades',
      'Accesos al dominio y al hosting cuando corresponda',
    ],
    deliverables: [
      { title: 'Mapa del sitio y flujos', description: 'Estructura de páginas y recorridos de compra o cotización acordados.' },
      { title: 'Prototipo', description: 'Plantillas clave navegables para revisar antes de desarrollar.' },
      { title: 'Sitio en producción', description: 'Código en un repositorio de tu propiedad, desplegado y documentado.' },
      { title: 'Checklist de verificación', description: 'Rendimiento, accesibilidad básica, enlaces y SEO técnico revisados.' },
    ],
    qualityCriteria: [
      'Objetivo de accesibilidad WCAG 2.2 AA en las tareas principales',
      'Presupuesto de rendimiento medido por plantilla',
      'Redirecciones 301 para toda URL que cambie',
      'Ninguna confirmación de formulario sin registro real',
    ],
    relatedProjects: ['ks-promocionales', 'promogimmicks', 'kspromocionales-co', 'promocionalesjj'],
    faq: [
      {
        question: '¿Trabajas con mi plataforma actual o hay que migrar?',
        answer:
          'Depende del problema. Primero se revisa qué limita al sitio actual; migrar solo se propone cuando mantenerlo cuesta más que reemplazarlo.',
      },
      {
        question: '¿Cuánto tarda un proyecto?',
        answer:
          'El plazo depende del alcance, de las fuentes de datos y de la disponibilidad de contenido. Se estima después de la conversación inicial, con los supuestos por escrito.',
      },
      {
        question: '¿Se puede conectar el catálogo con nuestro sistema de inventario?',
        answer:
          'Depende de cómo exponga los datos tu sistema: API, exportaciones periódicas o acceso a base de datos. Se evalúa en el descubrimiento. Los catálogos publicados en los casos se alimentan del sitio web del proveedor y de una base de datos PostgreSQL.',
      },
      {
        question: '¿De quién es el código?',
        answer:
          'El código y los accesos se entregan en repositorios y cuentas a nombre de tu empresa, según se acuerde en la propuesta.',
      },
    ],
  },
  {
    slug: 'automatizacion-datos',
    title: 'Automatización e integración de datos',
    seoTitle: 'Automatización e integración de datos',
    seoDescription:
      'Automatización de catálogos e integración de datos: pipelines ETL programados, validación, APIs y paneles. Alcance, entregables y casos reales.',
    serviceType: 'Automatización e integración de datos',
    updated: '2026-10-25',
    headline: 'Automatización de catálogos e integración de datos',
    summary:
      'Pipelines que extraen, validan y sincronizan datos entre sistemas —catálogos de proveedores, fuentes públicas y bases de datos— con procesos programados, APIs y paneles de consulta.',
    forWho: [
      'Equipos que copian datos a mano entre sistemas, hojas de cálculo y sitios web',
      'Empresas que dependen de datos de proveedores o fuentes públicas que cambian con frecuencia',
      'Responsables que necesitan consultar información consolidada sin pedir informes manuales',
    ],
    notFor: [
      'Proyectos de ciencia de datos o modelos predictivos a medida',
      'Extracción de datos que vulnere los términos de uso de la fuente',
    ],
    scenarios: [
      {
        title: 'Datos de proveedor siempre actualizados',
        description:
          'Un proceso programado extrae los datos, los valida y actualiza tu catálogo o tu base de datos, con reintentos y registro de errores.',
      },
      {
        title: 'Consolidar fuentes dispersas',
        description:
          'Varias fuentes con formatos distintos se normalizan en un modelo común y se exponen mediante una API o un panel.',
      },
      {
        title: 'Enriquecer información a escala',
        description:
          'Se generan o completan descripciones y atributos con IA dentro de un flujo con controles de calidad antes de publicar.',
      },
    ],
    includes: [
      'Inventario de fuentes, formatos y reglas de negocio',
      'Pipeline de extracción, validación y carga (ETL) programado',
      'Registro de errores y rechazos para auditoría',
      'API o panel de consulta según la necesidad',
      'Documentación de operación y de re-ejecución',
    ],
    excludes: [
      'Licencias de software de terceros',
      'Operación 24/7 sin un acuerdo de soporte específico',
    ],
    dependencies: [
      'Accesos o credenciales de las fuentes y destinos',
      'Ejemplos de datos reales y casos límite',
      'Definición de quién revisa los errores que reporta el sistema',
    ],
    deliverables: [
      { title: 'Mapa de datos', description: 'Fuentes, transformaciones, destinos y reglas de validación documentados.' },
      { title: 'Pipeline en ejecución', description: 'Proceso programado con reintentos, idempotencia y registro de errores.' },
      { title: 'API o panel', description: 'Acceso a los datos consolidados con filtros acordados.' },
      { title: 'Guía de operación', description: 'Cómo ejecutar, reprocesar y diagnosticar el sistema.' },
    ],
    qualityCriteria: [
      'Cargas idempotentes: re-ejecutar no duplica datos',
      'Ningún registro inválido se descarta sin dejar rastro',
      'Credenciales fuera del código y del repositorio',
      'Alertas o registros revisables cuando una ejecución falla',
    ],
    relatedProjects: ['promogimmicks', 'ks-promocionales', 'kspromocionales-co'],
    faq: [
      {
        question: '¿Qué pasa si la fuente de datos cambia?',
        answer:
          'Las validaciones detectan cambios de formato y registran los registros afectados. El mantenimiento posterior se acuerda según la frecuencia de cambios esperada.',
      },
      {
        question: '¿Qué fuentes de datos se han automatizado en los casos publicados?',
        answer:
          'Catálogos web de proveedores (extracción con Python), bases de datos PostgreSQL y catálogos en JSON versionado que se adaptan y depuran por script. Otras fuentes se evalúan en el descubrimiento según su formato y condiciones de uso.',
      },
      {
        question: '¿Dónde se ejecutan los procesos?',
        answer:
          'En la infraestructura que mejor encaje con tu operación: GitHub Actions, un servidor propio o servicios gestionados. Se decide en la fase de descubrimiento.',
      },
      {
        question: '¿Se puede usar IA para completar datos?',
        answer:
          'Sí, como un paso más del flujo y con controles: qué se genera, con qué fuente y qué se revisa antes de publicar.',
      },
    ],
  },
];

export const getService = (slug: string) => services.find(s => s.slug === slug);
