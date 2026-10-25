import type { APIRoute } from 'astro';
import { projects } from '@/data/projects';
import { services } from '@/data/services';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.origin ?? 'https://www.bayonadigitalsystems.com';

  const pages = [
    { url: '/', priority: '1.0', changefreq: 'monthly' },
    { url: '/servicios/', priority: '0.9', changefreq: 'monthly' },
    ...services.map(s => ({ url: `/servicios/${s.slug}/`, priority: '0.8', changefreq: 'monthly' })),
    { url: '/proyectos/', priority: '0.9', changefreq: 'monthly' },
    ...projects.map(p => ({ url: `/proyectos/${p.slug}/`, priority: '0.8', changefreq: 'monthly' })),
    { url: '/como-trabajamos/', priority: '0.7', changefreq: 'yearly' },
    { url: '/contacto/', priority: '0.7', changefreq: 'yearly' },
    { url: '/privacidad/', priority: '0.2', changefreq: 'yearly' },
    { url: '/terminos/', priority: '0.2', changefreq: 'yearly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
