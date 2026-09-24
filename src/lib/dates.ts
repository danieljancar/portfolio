const locale = 'en-GB';
const zone = 'Europe/Zurich';

export function formatDate(date: Date): string {
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: zone,
  });
}

export function formatMonth(date: Date): string {
  return date.toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric',
    timeZone: zone,
  });
}

export function formatYearMonth(value: string): string {
  const [year, month] = value.split('-').map(Number);
  return formatMonth(new Date(Date.UTC(year, (month ?? 1) - 1, 15)));
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
