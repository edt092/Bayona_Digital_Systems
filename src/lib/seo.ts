/**
 * Política SEO central: títulos, JSON-LD y sitemap.
 * Funciones puras (sin dependencias de Astro) para poder probarlas con node:test.
 */

export const BRAND = 'Bayona Digital Systems';
export const TITLE_SEPARATOR = ' | ';

/**
 * Política de títulos:
 * - Cada página define su título sin marca.
 * - Por defecto se añade " | Bayona Digital Systems" una sola vez.
 * - Las páginas cuyo título ya incluye la marca (p. ej. la Home) pasan `brand: false`.
 * No se recorta nada: la longitud se controla editorialmente en cada página.
 */
export function buildTitle(title: string, options: { brand?: boolean } = {}): string {
  const clean = title.trim();
  const brand = options.brand ?? true;
  return brand ? `${clean}${TITLE_SEPARATOR}${BRAND}` : clean;
}

/** Serializa JSON-LD evitando que una cadena cierre la etiqueta <script>. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

/* ─── Entidades con @id estable ─── */

export const ids = (siteUrl: string) => ({
  organization: `${siteUrl}/#organization`,
  website: `${siteUrl}/#website`,
  person: `${siteUrl}/#edwin-bayona`,
});

interface OrgInput {
  siteUrl: string;
  name: string;
  description: string;
  email: string;
  logoUrl: string;
  lead: string;
  leadSameAs: string[];
}

export function organizationGraph(o: OrgInput) {
  const id = ids(o.siteUrl);
  return [
    {
      '@type': 'Organization',
      '@id': id.organization,
      name: o.name,
      url: `${o.siteUrl}/`,
      description: o.description,
      email: o.email,
      logo: { '@type': 'ImageObject', url: o.logoUrl, width: 512, height: 512 },
      founder: { '@id': id.person },
    },
    {
      '@type': 'Person',
      '@id': id.person,
      name: o.lead,
      jobTitle: 'Responsable técnico',
      worksFor: { '@id': id.organization },
      sameAs: o.leadSameAs,
    },
  ];
}

export function websiteNode(siteUrl: string, name: string) {
  const id = ids(siteUrl);
  return {
    '@type': 'WebSite',
    '@id': id.website,
    url: `${siteUrl}/`,
    name,
    inLanguage: 'es',
    publisher: { '@id': id.organization },
  };
}

export function serviceNode(siteUrl: string, s: { name: string; description: string; url: string; serviceType: string }) {
  return {
    '@type': 'Service',
    '@id': `${s.url}#service`,
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    url: s.url,
    provider: { '@id': ids(siteUrl).organization },
  };
}

export function caseStudyNode(
  siteUrl: string,
  c: { name: string; headline: string; description: string; url: string; image: string; about: string[]; repository?: string },
) {
  const id = ids(siteUrl);
  return {
    '@type': 'CreativeWork',
    '@id': `${c.url}#caso`,
    name: c.name,
    headline: c.headline,
    description: c.description,
    url: c.url,
    image: c.image,
    inLanguage: 'es',
    about: c.about.map(name => ({ '@type': 'Thing', name })),
    creator: { '@id': id.person },
    publisher: { '@id': id.organization },
    ...(c.repository
      ? {
          isBasedOn: {
            '@type': 'SoftwareSourceCode',
            name: `Código fuente de ${c.name}`,
            codeRepository: c.repository,
            author: { '@id': id.person },
          },
        }
      : {}),
  };
}

export function graph(nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/* ─── Sitemap ─── */

export interface SitemapEntry {
  path: string;
  /** Fecha ISO (AAAA-MM-DD) del último cambio sustancial. Se omite si es desconocida. */
  lastmod?: string;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function buildSitemap(baseUrl: string, entries: SitemapEntry[]): string {
  const seen = new Set<string>();
  const urls = entries
    .filter(e => {
      if (seen.has(e.path)) return false;
      seen.add(e.path);
      return true;
    })
    .map(e => {
      if (e.lastmod && !ISO_DATE.test(e.lastmod)) throw new Error(`lastmod inválido en ${e.path}: ${e.lastmod}`);
      const lastmod = e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : '';
      return `  <url>\n    <loc>${baseUrl}${e.path}</loc>${lastmod}\n  </url>`;
    });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}
