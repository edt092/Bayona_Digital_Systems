import type { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Descubrimiento',
    description: 'Entendemos tu negocio, objetivos, público objetivo y competencia. Sin esto, nada más tiene sentido.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
    deliverables: ['Brief del proyecto', 'Análisis de competencia', 'Definición de KPIs'],
  },
  {
    number: '02',
    title: 'Estrategia',
    description: 'Diseñamos el plan de acción basado en datos. Cada decisión tiene un propósito medible.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20M12 2v20M2 12l4-4M2 12l4 4M22 12l-4-4M22 12l-4 4"/></svg>`,
    deliverables: ['Mapa de sitio', 'Estrategia de contenido', 'Plan de tráfico'],
  },
  {
    number: '03',
    title: 'Diseño UX/UI',
    description: 'Wireframes y diseño visual alineado con tu marca y optimizado para conversión.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    deliverables: ['Wireframes', 'Prototipo interactivo', 'Design system'],
  },
  {
    number: '04',
    title: 'Desarrollo',
    description: 'Código limpio, rápido y escalable. Implementamos con las mejores prácticas del industria.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    deliverables: ['Sitio funcional', 'Pruebas QA', 'Configuración SEO técnico'],
  },
  {
    number: '05',
    title: 'Optimización',
    description: 'Medimos, analizamos y mejoramos continuamente. El lanzamiento es el comienzo, no el final.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    deliverables: ['Análisis de métricas', 'A/B testing', 'Reporte mensual'],
  },
];
