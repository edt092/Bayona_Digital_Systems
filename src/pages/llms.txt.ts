import type { APIRoute } from 'astro';
import { site } from '@/data/site';
import { services } from '@/data/services';
import { projects } from '@/data/projects';

/**
 * Resumen del sitio para agentes de IA (formato llms.txt, propuesta experimental).
 * No afecta a la indexación; se genera desde los mismos datos que las páginas.
 */
export const GET: APIRoute = ({ site: base }) => {
  const url = (path: string) => new URL(path, base ?? site.url).toString();

  const body = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `Responsable técnico: ${site.lead}. Contacto: ${site.email}.`,
    '',
    '## Servicios',
    '',
    ...services.map(s => `- [${s.title}](${url(`/servicios/${s.slug}/`)}): ${s.seoDescription}`),
    '',
    '## Casos de estudio',
    '',
    ...projects.map(p => `- [${p.title}](${url(`/proyectos/${p.slug}/`)}): ${p.summary}`),
    '',
    '## Más información',
    '',
    `- [Cómo trabajamos](${url('/como-trabajamos/')}): proceso, entregables y responsable técnico.`,
    `- [Contacto](${url('/contacto/')})`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
