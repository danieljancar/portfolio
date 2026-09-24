import { describe, expect, it } from 'vitest';
import { isExternal, linkProps, withRef } from '../src/lib/links';

describe('links', () => {
  it('treats other hosts as external', () => {
    expect(isExternal('https://github.com/danieljancar')).toBe(true);
    expect(isExternal('http://example.com')).toBe(true);
  });

  it('keeps own and relative links internal', () => {
    expect(isExternal('/blog')).toBe(false);
    expect(isExternal('https://danieljancar.dev/about')).toBe(false);
    expect(isExternal('https://www.danieljancar.dev')).toBe(false);
    expect(isExternal('mailto:daniel@danieljancar.dev')).toBe(false);
  });

  it('adds the ref to external links only', () => {
    expect(withRef('https://github.com/danieljancar')).toBe(
      'https://github.com/danieljancar?ref=danieljancar.dev',
    );
    expect(withRef('https://moebu.ch/?lang=de#shop')).toBe(
      'https://moebu.ch/?lang=de&ref=danieljancar.dev#shop',
    );
    expect(withRef('https://example.com/?ref=other')).toBe(
      'https://example.com/?ref=other',
    );
    expect(withRef('/work')).toBe('/work');
    expect(withRef('mailto:daniel@danieljancar.dev')).toBe(
      'mailto:daniel@danieljancar.dev',
    );
  });

  it('opens external links in a new tab', () => {
    expect(linkProps('https://github.com')).toEqual({
      href: 'https://github.com/?ref=danieljancar.dev',
      target: '_blank',
      rel: 'noopener',
    });
    expect(linkProps('/work')).toEqual({ href: '/work' });
  });
});
