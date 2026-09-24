import type { CollectionEntry } from 'astro:content';
import { getExperience } from './content';
import { formatYearMonth } from './dates';
import type { Item } from './related';
import { getConnections } from './tags';

export interface Role {
  entry: CollectionEntry<'experience'>;
  current: boolean;
  period: string;
  connections: Item[];
}

export function period(start?: string, end?: string): string {
  if (!start) return end ? `Until ${formatYearMonth(end)}` : 'Ongoing';
  return `${formatYearMonth(start)} to ${end ? formatYearMonth(end) : 'today'}`;
}

export async function getRoles(): Promise<Role[]> {
  const entries = await getExperience();
  return Promise.all(
    entries.map(async entry => ({
      entry,
      current: !entry.data.end,
      period: period(entry.data.start, entry.data.end),
      connections: await getConnections(
        {
          tags: entry.data.tags,
          links: entry.data.work.map(work => `project:${work.id}`),
        },
        { limit: 3 },
      ),
    })),
  );
}
