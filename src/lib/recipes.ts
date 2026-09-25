import type { CollectionEntry } from 'astro:content';

type Recipe = CollectionEntry<'recipes'>;
export type Ingredient = Recipe['data']['ingredients'][number];

const fractions: [number, string][] = [
  [1 / 8, '⅛'],
  [1 / 4, '¼'],
  [1 / 3, '⅓'],
  [1 / 2, '½'],
  [2 / 3, '⅔'],
  [3 / 4, '¾'],
];

export function formatAmount(value: number): string {
  const whole = Math.floor(value);
  const rest = value - whole;
  if (rest < 0.05) return String(whole);
  if (value < 10) {
    const match = fractions.find(
      ([fraction]) => Math.abs(rest - fraction) < 0.04,
    );
    if (match) return whole ? `${whole} ${match[1]}` : match[1];
  }
  return String(Math.round(value * 10) / 10);
}

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} min`;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}

export const isoDuration = (minutes: number) => `PT${minutes}M`;

export function totalMinutes({ prep, cook }: Recipe['data']) {
  return prep !== undefined || cook !== undefined
    ? (prep ?? 0) + (cook ?? 0)
    : undefined;
}

export function ingredientText(ingredient: Ingredient, factor = 1): string {
  const amount = ingredient.amount
    ? formatAmount(ingredient.amount * factor)
    : '';
  return [amount, ingredient.unit, ingredient.item]
    .filter(Boolean)
    .join(' ')
    .concat(ingredient.note ? `, ${ingredient.note}` : '');
}

export function sections(ingredients: Ingredient[]) {
  const groups: { title?: string; items: Ingredient[] }[] = [];
  for (const ingredient of ingredients) {
    const title = ingredient.section ?? undefined;
    const last = groups.at(-1);
    if (last && (!title || last.title === title)) last.items.push(ingredient);
    else groups.push({ title, items: [ingredient] });
  }
  return groups;
}

export function steps(markdown: string | undefined): string[] {
  return (markdown ?? '')
    .split('\n')
    .map(line => line.match(/^\s*\d+[.)]\s+(.*)$/)?.[1]?.trim())
    .filter((line): line is string => Boolean(line))
    .map(line =>
      line.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, ''),
    );
}
