import { describe, expect, it } from 'vitest';
import {
  contrast,
  ensureContrast,
  GROUND,
  hexToRgb,
  readableInk,
  rgbToHex,
  themeFromPalette,
} from '../src/lib/color';

describe('color', () => {
  it('converts between hex and rgb', () => {
    expect(hexToRgb('#ff4f1a')).toEqual([255, 79, 26]);
    expect(hexToRgb('#fff')).toEqual([255, 255, 255]);
    expect(rgbToHex([17, 17, 17])).toBe('#111111');
  });

  it('computes WCAG contrast', () => {
    expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 0);
    expect(contrast('#777777', '#777777')).toBe(1);
  });

  it('picks readable ink', () => {
    expect(readableInk('#111111')).toBe('#e6eadc');
    expect(readableInk('#f5f5f5')).toBe('#0b0d0a');
  });

  it('pushes a colour until it reaches the target contrast', () => {
    const fixed = ensureContrast('#26475e', GROUND, 3);
    expect(contrast(fixed, GROUND)).toBeGreaterThanOrEqual(3);
  });

  it('builds a theme from a palette with fallbacks', () => {
    const theme = themeFromPalette({
      vibrant: null,
      muted: null,
      darkVibrant: null,
      darkMuted: null,
      lightVibrant: null,
      lightMuted: null,
      dominant: '#5a94bc',
    });
    expect(contrast(theme.tint, theme.tintInk)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(theme.accent, GROUND)).toBeGreaterThanOrEqual(3);
  });

  it('keeps the brand greens readable on the dark ground', () => {
    expect(contrast('#b5d98a', GROUND)).toBeGreaterThanOrEqual(4.5);
    expect(contrast('#82a951', GROUND)).toBeGreaterThanOrEqual(4.5);
    expect(contrast('#0b0d0a', '#82a951')).toBeGreaterThanOrEqual(4.5);
  });
});
