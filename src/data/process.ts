import type { FaqItem, ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Descubrimiento',
    description:
      'Se define el problema de negocio, quién usará la solución, qué datos existen y qué queda fuera del alcance.',
    clientGets: ['Resumen del problema y objetivos', 'Alcance inicial con supuestos', 'Riesgos y dependencias identificados'],
    clientProvides: 'Contexto del negocio, accesos de lectura a las fuentes y una persona que decida prioridades.',
  },
  {
    number: '02',
    title: 'Diseño UX/UI',
    description:
      'Flujos, arquitectura de información y prototipo de las pantallas clave, revisados antes de escribir código de producción.',
    clientGets: ['Mapa del sitio o del flujo de datos', 'Prototipo navegable de las plantillas clave', 'Criterios de aceptación por tarea'],
    clientProvides: 'Revisión del prototipo y contenido real o de muestra.',
  },
  {
    number: '03',
    title: 'Desarrollo',
    description:
      'Implementación por recorridos completos, en un repositorio de tu propiedad, con revisiones periódicas sobre una versión de prueba.',
    clientGets: ['Acceso a una versión de prueba', 'Código versionado en tu repositorio', 'Registro de decisiones técnicas'],
    clientProvides: 'Feedback en cada revisión y validación de contenido.',
  },
  {
    number: '04',
    title: 'Validación',
    description:
      'Se comprueban las tareas principales, la accesibilidad, el rendimiento y los casos de error antes de publicar.',
    clientGets: ['Checklist de verificación con resultados', 'Lista de incidencias abiertas, si las hay'],
    clientProvides: 'Aprobación de los criterios de lanzamiento.',
  },
  {
    number: '05',
    title: 'Entrega',
    description:
      'Publicación, traspaso de accesos y documentación de operación. El soporte posterior se acuerda por separado según lo que necesites.',
    clientGets: ['Sistema en producción', 'Accesos y documentación', 'Plan de mantenimiento propuesto'],
    clientProvides: 'Cuentas de dominio y hosting a nombre de tu empresa.',
  },
];

export const generalFaq: FaqItem[] = [
  {
    question: '¿Qué tipo de proyectos encajan mejor?',
    answer:
      'Catálogos y plataformas web B2B, y procesos donde hoy se mueven datos a mano entre sistemas. Si tu proyecto es otro, cuéntalo igualmente y te diremos con franqueza si encaja.',
  },
  {
    question: '¿Cómo se define el alcance?',
    answer:
      'A partir de una primera conversación y, si hace falta, una fase corta de descubrimiento. El alcance se entrega por escrito con lo incluido, lo excluido y los supuestos.',
  },
  {
    question: '¿Con quién trabajo durante el proyecto?',
    answer:
      'Con Edwin Bayona como interlocutor técnico de principio a fin. Responsables, entregables y frecuencia de seguimiento se acuerdan antes de empezar.',
  },
  {
    question: '¿Cómo empiezo?',
    answer:
      'Escríbenos describiendo qué necesita resolver tu equipo. Con esa información se propone una conversación para revisar el reto y el siguiente paso.',
  },
];
