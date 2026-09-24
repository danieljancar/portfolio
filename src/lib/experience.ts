import type { CollectionEntry } from 'astro:content';
import { getExperience } from './content';
import { formatYearMonth } from './dates';

export interface Role {
  entry: CollectionEntry<'experience'>;
  current: boolean;
  period: string;
}

export function period(start?: string, end?: string): string {
  if (!start) return end ? `Until ${formatYearMonth(end)}` : 'Ongoing';
  return `${formatYearMonth(start)} to ${end ? formatYearMonth(end) : 'today'}`;
}

export async function getRoles(): Promise<Role[]> {
  const entries = await getExperience();
  return entries.map(entry => ({
    entry,
    current: !entry.data.end,
    period: period(entry.data.start, entry.data.end),
  }));
}
