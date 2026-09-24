import type { CollectionEntry } from 'astro:content';
import { getExperience } from './content';
import { formatYearMonth } from './dates';

type Entry = CollectionEntry<'experience'>;

export interface Role {
  entry: Entry;
  current: boolean;
  period: string;
}

export interface Company {
  name: string;
  url?: string;
  current: boolean;
  period: string;
  roles: Role[];
}

export function period(start?: string, end?: string): string {
  if (!start) return end ? `Until ${formatYearMonth(end)}` : 'Ongoing';
  return `${formatYearMonth(start)} to ${end ? formatYearMonth(end) : 'today'}`;
}

function span(roles: Role[]): string {
  const starts = roles.flatMap(role => role.entry.data.start ?? []).sort();
  const ends = roles.flatMap(role => role.entry.data.end ?? []).sort();
  const current = roles.some(role => role.current);
  const from = starts[0]?.slice(0, 4);
  const to = current ? 'today' : ends.at(-1)?.slice(0, 4);
  if (!from) return current ? 'Ongoing' : (to ?? '');
  return from === to ? from : `${from} to ${to}`;
}

export async function getCompanies(): Promise<Company[]> {
  const companies = new Map<string, Role[]>();
  for (const entry of await getExperience()) {
    const role = {
      entry,
      current: !entry.data.end,
      period: period(entry.data.start, entry.data.end),
    };
    const roles = companies.get(entry.data.company) ?? [];
    companies.set(entry.data.company, [...roles, role]);
  }
  return [...companies].map(([name, roles]) => ({
    name,
    url: roles.find(role => role.entry.data.companyUrl)?.entry.data.companyUrl,
    current: roles.some(role => role.current),
    period: span(roles),
    roles,
  }));
}
