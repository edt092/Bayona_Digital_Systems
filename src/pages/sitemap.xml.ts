import type { APIRoute } from 'astro';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { buildSitemap, type SitemapEntry } from '@/lib/seo';

/**
 * Solo URLs canónicas e indexables. `lastmod` = fecha del último cambio sustancial de contenido,
 * mantenida a mano: actualízala aquí (o en `updated` de services/projects) al cambiar una página.
 * El blog se añadirá cuando tenga artículos publicados y deje de ser noindex.
 */
const staticPages: SitemapEntry[] = [
  { path: '/', lastmod: '2026-10-25' },
  { path: '/servicios/', lastmod: '2026-10-25' },
  { path: '/proyectos/', lastmod: '2026-10-25' },
  { path: '/como-trabajamos/', lastmod: '2026-10-25' },
  { path: '/contacto/', lastmod: '2026-10-25' },
  { path: '/privacidad/', lastmod: '2026-10-25' },
  { path: '/terminos/', lastmod: '2026-10-25' },
];

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.origin ?? 'https://www.bayonadigitalsystems.com';

  const entries: SitemapEntry[] = [
    ...staticPages,
    ...services.map(s => ({ path: `/servicios/${s.slug}/`, lastmod: s.updated })),
    ...projects.map(p => ({ path: `/proyectos/${p.slug}/`, lastmod: p.updated })),
  ];

  return new Response(buildSitemap(baseUrl, entries), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
