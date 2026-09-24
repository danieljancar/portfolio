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
  roles: Role[];
}

export function period(start?: string, end?: string): string {
  if (!start) return end ? `Until ${formatYearMonth(end)}` : 'Ongoing';
  return `${formatYearMonth(start)} to ${end ? formatYearMonth(end) : 'today'}`;
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
    roles,
  }));
}
