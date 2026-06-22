import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'web-dev',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="m8 21 4-4 4 4M12 17v4"/></svg>`,
    title: 'Desarrollo Web',
    description: 'Sitios web y aplicaciones de alto rendimiento que convierten visitantes en clientes reales.',
    benefits: [
      'Carga en menos de 2 segundos',
      'Diseño 100% responsive',
      'Optimizado para conversión',
      'SEO técnico incluido',
    ],
    problem: '¿Tu sitio web actual no genera ventas ni contactos?',
    cta: 'Quiero mi sitio web',
    color: 'primary',
  },
  {
    id: 'seo',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg>`,
    title: 'SEO',
    description: 'Posicionamiento orgánico sostenible para que tus clientes ideales te encuentren primero en Google.',
    benefits: [
      'Auditoría técnica completa',
      'Estrategia de contenido',
      'Link building ético',
      'Reportes mensuales',
    ],
    problem: '¿Tus competidores aparecen en Google y tú no?',
    cta: 'Quiero posicionarme',
    color: 'secondary',
  },
  {
    id: 'marketing',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    title: 'Marketing Digital',
    description: 'Estrategias de captación y conversión con Google Ads, redes sociales y email marketing.',
    benefits: [
      'Google Ads optimizado',
      'Meta Ads de alto ROI',
      'Email marketing automatizado',
      'Analítica y reportes',
    ],
    problem: '¿Inviertes en publicidad pero no ves resultados?',
    cta: 'Quiero más clientes',
    color: 'accent',
  },
];
