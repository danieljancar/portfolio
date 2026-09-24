import { getEvents, getPosts, getProjects } from './content';
import { getAlbums } from './photos';
import {
  rankRelated,
  tagSlug,
  type Item,
  type Kind,
  type Tag,
} from './related';

export {
  kindLabels,
  tagHref,
  tagSlug,
  type Item,
  type Kind,
  type Tag,
} from './related';

let itemsPromise: Promise<Item[]> | undefined;

export function getItems(): Promise<Item[]> {
  itemsPromise ??= loadItems();
  return itemsPromise;
}

async function loadItems(): Promise<Item[]> {
  const [posts, projects, events, albums] = await Promise.all([
    getPosts(),
    getProjects(),
    getEvents(),
    getAlbums(),
  ]);
  return [
    ...posts.map((p): Item => ({
      kind: 'post',
      id: p.id,
      title: p.data.title,
      href: `/blog/${p.id}`,
      date: p.data.published,
      tags: p.data.tags,
      links: p.data.project ? [`project:${p.data.project.id}`] : [],
      image: p.data.cover,
    })),
    ...projects.map((p): Item => ({
      kind: 'project',
      id: p.id,
      title: p.data.name,
      href: `/projects/${p.id}`,
      tags: p.data.tags,
      links: [],
      image: p.data.cover,
    })),
    ...events.map((e): Item => ({
      kind: 'event',
      id: e.id,
      title: e.data.title,
      href: `/events/${e.id}`,
      date: e.data.date,
      tags: e.data.tags,
      links: [
        ...(e.data.project ? [`project:${e.data.project.id}`] : []),
        ...(e.data.album ? [`album:${e.data.album.id}`] : []),
      ],
      image: e.data.cover,
    })),
    ...albums.map((a): Item => ({
      kind: 'album',
      id: a.id,
      title: a.data.title,
      href: `/photos/${a.id}`,
      date: a.data.date,
      tags: a.data.tags,
      links: [],
      image: a.data.cover,
    })),
  ];
}

export async function getTags(): Promise<Tag[]> {
  const byTag = new Map<string, Tag>();
  for (const item of await getItems()) {
    for (const label of item.tags) {
      const slug = tagSlug(label);
      if (!slug) continue;
      const tag = byTag.get(slug) ?? { slug, label, items: [] };
      if (!tag.items.includes(item)) tag.items.push(item);
      byTag.set(slug, tag);
    }
  }
  return [...byTag.values()].sort(
    (a, b) => b.items.length - a.items.length || a.label.localeCompare(b.label),
  );
}

export async function getRelated(
  kind: Kind,
  id: string,
  options?: { limit?: number; kinds?: Kind[] },
): Promise<Item[]> {
  const items = await getItems();
  const target = items.find(i => i.kind === kind && i.id === id);
  return target ? rankRelated(target, items, options) : [];
}
