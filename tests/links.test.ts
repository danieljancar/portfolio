import { describe, expect, it } from 'vitest';
import { isExternal, linkAttrs } from '../src/lib/links';

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

  it('adds target and rel only for external links', () => {
    expect(linkAttrs('https://github.com')).toEqual({
      target: '_blank',
      rel: 'noopener noreferrer',
    });
    expect(linkAttrs('/projects')).toEqual({});
  });
});
