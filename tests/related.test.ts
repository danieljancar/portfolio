import { describe, expect, it } from 'vitest';
import { rankRelated, tagSlug, type Item } from '../src/lib/related';

const item = (
  kind: Item['kind'],
  id: string,
  tags: string[],
  links: string[] = [],
  date?: string,
): Item => ({
  kind,
  id,
  title: id,
  href: `/${kind}/${id}`,
  tags,
  links,
  date: date ? new Date(date) : undefined,
});

describe('tags', () => {
  it('normalises tags so spelling variants meet', () => {
    expect(tagSlug('React Native')).toBe('react-native');
    expect(tagSlug('iStep')).toBe('istep');
    expect(tagSlug('react-native')).toBe('react-native');
  });
});

describe('rankRelated', () => {
  const cranny = item('project', 'cranny', ['expo', 'supabase']);
  const post = item(
    'post',
    'expo-app',
    ['Expo', 'resend'],
    ['project:cranny'],
    '2026-06-05',
  );
  const other = item('post', 'husky', ['git-hooks'], [], '2024-02-21');
  const photo = item('album', 'bench', ['supabase'], [], '2026-05-01');

  it('ranks explicit links above shared tags', () => {
    const related = rankRelated(cranny, [cranny, post, other, photo]);
    expect(related.map(i => i.id)).toEqual(['expo-app', 'bench']);
  });

  it('never returns the item itself or unrelated items', () => {
    const related = rankRelated(post, [cranny, post, other]);
    expect(related.map(i => i.id)).toEqual(['cranny']);
  });

  it('filters by kind and limit', () => {
    const related = rankRelated(cranny, [post, photo], {
      kinds: ['album'],
      limit: 1,
    });
    expect(related.map(i => i.id)).toEqual(['bench']);
  });

  it('ranks for a target that is not an item itself', () => {
    const related = rankRelated(
      { tags: ['supabase'], links: ['project:cranny'] },
      [cranny, post, other, photo],
    );
    expect(related.map(i => i.id)).toEqual(['cranny', 'bench']);
  });
});
