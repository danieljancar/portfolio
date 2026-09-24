import { describe, expect, it } from 'vitest';
import { formatShutter, slugify } from '../src/integrations/photo-meta/core.ts';

describe('photo-meta helpers', () => {
  it('formats shutter speeds', () => {
    expect(formatShutter(1 / 250)).toBe('1/250s');
    expect(formatShutter(0.5)).toBe('1/2s');
    expect(formatShutter(2)).toBe('2s');
  });

  it('turns file names into ids', () => {
    expect(slugify('IMG_2989')).toBe('img-2989');
    expect(slugify('Pilatus at Dawn')).toBe('pilatus-at-dawn');
  });
});
