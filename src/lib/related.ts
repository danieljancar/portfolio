import type { ImageMetadata } from 'astro';

export type Kind = 'post' | 'project' | 'event' | 'album';

export interface Item {
  kind: Kind;
  id: string;
  title: string;
  href: string;
  date?: Date;
  tags: string[];
  links: string[];
  image?: ImageMetadata;
}

export interface Tag {
  slug: string;
  label: string;
  items: Item[];
}

export const kindLabels: Record<Kind, string> = {
  post: 'Post',
  project: 'Project',
  event: 'Event',
  album: 'Album',
};

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

export const tagHref = (tag: string) => `/tags/${tagSlug(tag)}`;

export const itemKey = (item: Pick<Item, 'kind' | 'id'>) =>
  `${item.kind}:${item.id}`;

export function rankRelated(
  target: Pick<Item, 'kind' | 'id' | 'tags' | 'links'>,
  items: Item[],
  { limit = 6, kinds }: { limit?: number; kinds?: Kind[] } = {},
): Item[] {
  const key = itemKey(target);
  const tags = new Set(target.tags.map(tagSlug));
  return items
    .filter(
      item => itemKey(item) !== key && (!kinds || kinds.includes(item.kind)),
    )
    .map(item => {
      const shared = item.tags.filter(t => tags.has(tagSlug(t))).length;
      const linked =
        item.links.includes(key) || target.links.includes(itemKey(item));
      return { item, score: shared + (linked ? 3 : 0) };
    })
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        (b.item.date?.getTime() ?? 0) - (a.item.date?.getTime() ?? 0),
    )
    .slice(0, limit)
    .map(({ item }) => item);
}
