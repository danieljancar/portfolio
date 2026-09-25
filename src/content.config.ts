// Keep public/admin/config.yml in sync with these schemas.

import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), href: z.url() });

// The CMS writes empty optional fields as '' or null, so drop them before validation.
const withoutBlanks = <T extends z.ZodType>(schema: T) =>
  z.preprocess(
    data =>
      data && typeof data === 'object' && !Array.isArray(data)
        ? Object.fromEntries(
            Object.entries(data).filter(
              ([, value]) => value !== '' && value !== null,
            ),
          )
        : data,
    schema,
  );

const posts = defineCollection({
  loader: glob({ pattern: '*/index.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    withoutBlanks(
      z.object({
        title: z.string(),
        description: z.string(),
        published: z.coerce.date(),
        updated: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        cover: image().optional(),
        coverAlt: z.string().default(''),
        project: reference('projects').optional(),
        canonical: z.url().optional(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
      }),
    ),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    withoutBlanks(
      z.object({
        name: z.string(),
        tagline: z.string(),
        kind: z.string(),
        status: z.enum(['live', 'in-progress', 'archived']).default('live'),
        year: z.number().int().optional(),
        ongoing: z.boolean().default(false),
        role: z.string().optional(),
        stack: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        links: z.array(link).default([]),
        cover: image().optional(),
        coverAlt: z.string().default(''),
        featured: z.boolean().default(false),
        order: z.number().default(100),
      }),
    ),
});

const albums = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/albums' }),
  schema: ({ image }) =>
    withoutBlanks(
      z.object({
        title: z.string(),
        date: z.coerce.date(),
        place: z.string().optional(),
        cover: image(),
        featured: z.boolean().default(false),
        highlights: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
      }),
    ),
});

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    withoutBlanks(
      z.object({
        title: z.string(),
        date: z.coerce.date(),
        endDate: z.coerce.date().optional(),
        place: z.string().optional(),
        cover: image().optional(),
        coverAlt: z.string().default(''),
        album: reference('albums').optional(),
        project: reference('projects').optional(),
        tags: z.array(z.string()).default([]),
        links: z.array(link).default([]),
      }),
    ),
});

const recommendations = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/recommendations' }),
  schema: withoutBlanks(
    z.object({
      name: z.string(),
      kind: z.enum(['podcast', 'site', 'newsletter', 'book', 'tool']),
      url: z.url(),
      topic: z.string(),
      note: z.string().optional(),
      order: z.number().default(100),
    }),
  ),
});

const experience = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/experience' }),
  schema: withoutBlanks(
    z.object({
      role: z.string(),
      company: z.string(),
      companyUrl: z.url().optional(),
      kind: z
        .enum(['work', 'education', 'volunteering', 'community'])
        .default('work'),
      start: z.string().optional(),
      end: z.string().optional(),
      summary: z.string().optional(),
      skills: z.array(z.string()).default([]),
      order: z.number().default(100),
    }),
  ),
});

const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
  schema: withoutBlanks(
    z.object({
      title: z.string(),
      description: z.string(),
      version: z.string(),
      updated: z.coerce.date(),
    }),
  ),
});

const site = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/site' }),
  schema: ({ image }) =>
    withoutBlanks(
      z.object({
        name: z.string(),
        description: z.string(),
        email: z.email(),
        headline: z.string(),
        about: z.string(),
        portrait: image().optional(),
        portraitAlt: z.string().default(''),
        skills: z.array(
          z.object({ group: z.string(), items: z.array(z.string()) }),
        ),
        socials: z.array(link),
      }),
    ),
});

const ingredient = withoutBlanks(
  z.object({
    section: z.string().nullish(),
    amount: z.number().positive().nullish(),
    unit: z.string().nullish(),
    item: z.string(),
    note: z.string().nullish(),
  }),
);

const recipes = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/recipes' }),
  schema: ({ image }) =>
    withoutBlanks(
      z.object({
        title: z.string(),
        description: z.string(),
        published: z.coerce.date(),
        cover: image().optional(),
        coverAlt: z.string().default(''),
        servings: z.number().int().positive().default(2),
        prep: z.number().int().nonnegative().optional(),
        cook: z.number().int().nonnegative().optional(),
        tags: z.array(z.string()).default([]),
        ingredients: z.array(ingredient).default([]),
        draft: z.boolean().default(false),
      }),
    ),
});

export const collections = {
  posts,
  recipes,
  projects,
  albums,
  events,
  recommendations,
  experience,
  legal,
  site,
};
