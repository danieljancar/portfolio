// Keep public/admin/config.yml in sync with these schemas.

import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const shape = z.enum(['square', 'circle', 'arch', 'diamond', 'half']);
const link = z.object({ label: z.string(), href: z.url() });

const posts = defineCollection({
  loader: glob({ pattern: '*/index.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().default(''),
      coverCredit: z.string().optional(),
      coverAiGenerated: z.boolean().default(false),
      project: reference('projects').optional(),
      canonical: z.url().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tagline: z.string(),
      kind: z.string(),
      status: z.enum(['live', 'in-progress', 'archived']).default('live'),
      year: z.number().int().optional(),
      stack: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      links: z.array(link).default([]),
      cover: image().optional(),
      coverAlt: z.string().default(''),
      shape: shape.default('square'),
      featured: z.boolean().default(false),
      order: z.number().default(100),
    }),
});

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      place: z.string().optional(),
      role: z.enum(['shot', 'played', 'team', 'taught', 'spoke', 'attended']),
      tags: z.array(z.string()).default([]),
      project: reference('projects').optional(),
      cover: image().optional(),
      coverAlt: z.string().default(''),
      links: z.array(link).default([]),
    }),
});

const photos = defineCollection({
  loader: glob({ pattern: '*.{yaml,yml}', base: './src/content/photos' }),
  schema: ({ image }) =>
    z.object({
      image: image(),
      alt: z.string().default(''),
      title: z.string().optional(),
      place: z.string().optional(),
      date: z.coerce.date().optional(),
      category: z
        .enum(['landscape', 'city', 'event', 'people', 'other'])
        .default('other'),
      tags: z.array(z.string()).default([]),
      event: reference('events').optional(),
      featured: z.boolean().default(false),
      hidden: z.boolean().default(false),
    }),
});

const notes = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/notes' }),
  schema: ({ image }) =>
    z.object({
      date: z.coerce.date(),
      image: image().optional(),
      imageAlt: z.string().default(''),
      link: link.optional(),
    }),
});

const recommendations = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/recommendations' }),
  schema: z.object({
    name: z.string(),
    kind: z.enum(['podcast', 'site', 'newsletter', 'book', 'tool']),
    url: z.url(),
    topic: z.string(),
    note: z.string().optional(),
    order: z.number().default(100),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    companyUrl: z.url().optional(),
    start: z.string().optional(),
    end: z.string().optional(),
    summary: z.string().optional(),
    stack: z.array(z.string()).default([]),
    order: z.number().default(100),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    version: z.string(),
    updated: z.coerce.date(),
  }),
});

const site = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/site' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    location: z.string(),
    email: z.email(),
    now: z.string(),
    heroVideo: z.string().optional(),
    about: z.string(),
    socials: z.array(link),
  }),
});

export const collections = {
  posts,
  projects,
  events,
  photos,
  notes,
  recommendations,
  experience,
  legal,
  site,
};
