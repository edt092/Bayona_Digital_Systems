import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    category: z.enum(['SEO', 'Desarrollo Web', 'Marketing Digital', 'CRO']),
    readTime: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    industry: z.string(),
    client: z.string(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()),
    problem: z.string(),
    solution: z.string(),
    result: z.string(),
    featured: z.boolean().default(false),
    pubDate: z.date(),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
