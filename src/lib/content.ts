import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export async function getSettings() {
  const entry = await getEntry('site', 'settings');
  if (!entry) throw new Error('src/content/site/settings.yaml is missing');
  return entry.data;
}

export async function getPosts() {
  const posts = await getCollection(
    'posts',
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return posts.sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime(),
  );
}

export async function getProjects() {
  const projects = await getCollection('projects');
  return projects.sort(
    (a, b) =>
      Number(b.data.featured) - Number(a.data.featured) ||
      a.data.order - b.data.order,
  );
}

export async function getEvents() {
  const events = await getCollection('events');
  return events.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

let recommendations: Promise<CollectionEntry<'recommendations'>[]> | undefined;

export function getRecommendations() {
  recommendations ??= getCollection('recommendations').then(items =>
    items.sort((a, b) => a.data.order - b.data.order),
  );
  return recommendations;
}

export async function getExperience() {
  const items = await getCollection('experience');
  return items.sort((a, b) => a.data.order - b.data.order);
}

export function readingTime(markdown: string | undefined): number {
  const words = (markdown ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
