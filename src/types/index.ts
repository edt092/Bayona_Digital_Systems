import type { ImageMetadata } from 'astro';

export type ServiceSlug = 'productos-web' | 'automatizacion-datos';

export interface Service {
  slug: ServiceSlug;
  title: string;
  /** Título SEO sin marca (la marca la añade buildTitle) */
  seoTitle: string;
  seoDescription: string;
  serviceType: string;
  /** Fecha ISO del último cambio sustancial de la página (sitemap lastmod) */
  updated: string;
  /** Titular orientado a la necesidad, usado como H1 en la página del servicio */
  headline: string;
  summary: string;
  forWho: string[];
  notFor: string[];
  scenarios: { title: string; description: string }[];
  includes: string[];
  excludes: string[];
  dependencies: string[];
  deliverables: { title: string; description: string }[];
  qualityCriteria: string[];
  relatedProjects: string[];
  faq: FaqItem[];
}

export interface Project {
  slug: string;
  title: string;
  /** Título SEO sin marca (la marca la añade buildTitle) */
  seoTitle: string;
  /** Fecha ISO del último cambio sustancial de la página (sitemap lastmod) */
  updated: string;
  /** Reto resuelto, usado como H1 del caso */
  headline: string;
  sector: string;
  services: ServiceSlug[];
  summary: string;
  problem: string;
  solution: string;
  scope: string[];
  /** Resultado técnico documentado; no es un resultado comercial */
  output: string;
  decisions: { title: string; description: string }[];
  outputs: string[];
  limitations: string;
  techStack: { name: string; role: string }[];
  pipeline: string[];
  image: ImageMetadata;
  imageAlt: string;
  githubUrl?: string;
  /** Sitio publicado del proyecto */
  liveUrl?: string;
  /** Proyecto realizado para un cliente (confirmado por el propietario) */
  client?: boolean;
  featured: boolean;
  /** false oculta el caso del sitio (p. ej. en construcción) sin borrar sus datos */
  published?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  clientGets: string[];
  clientProvides: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
