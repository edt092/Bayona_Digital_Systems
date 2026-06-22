import type { Technology } from '@/types';

export const technologies: Technology[] = [
  { name: 'Astro', icon: 'astro', category: 'frontend' },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend' },
  { name: 'React', icon: 'react', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend' },
  { name: 'JavaScript', icon: 'javascript', category: 'frontend' },
  { name: 'Node.js', icon: 'nodejs', category: 'backend' },
  { name: 'Google Analytics', icon: 'analytics', category: 'marketing' },
  { name: 'Google Ads', icon: 'googleads', category: 'marketing' },
  { name: 'SEO', icon: 'seo', category: 'marketing' },
  { name: 'GitHub', icon: 'github', category: 'tools' },
];

export const techByCategory = {
  frontend: technologies.filter(t => t.category === 'frontend'),
  backend: technologies.filter(t => t.category === 'backend'),
  marketing: technologies.filter(t => t.category === 'marketing'),
  tools: technologies.filter(t => t.category === 'tools'),
};
