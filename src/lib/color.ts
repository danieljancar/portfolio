import type { Palette } from '../integrations/photo-meta/core';

export type { Palette };

export type Rgb = [number, number, number];

export interface Theme {
  tint: string;
  tintInk: string;
  accent: string;
  wash: string;
}

export const GROUND = '#0b0d0a';
const WHITE = '#e6eadc';
const INK = '#0b0d0a';

export function hexToRgb(hex: string): Rgb {
  const value = hex.replace('#', '');
  const full =
    value.length === 3
      ? value
          .split('')
          .map(c => c + c)
          .join('')
      : value;
  const int = Number.parseInt(full, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

export function rgbToHex([r, g, b]: Rgb): string {
  return `#${[r, g, b]
    .map(v =>
      Math.round(Math.min(255, Math.max(0, v)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function mix(a: string, b: string, amount: number): string {
  const x = hexToRgb(a);
  const y = hexToRgb(b);
  return rgbToHex([0, 1, 2].map(i => x[i] + (y[i] - x[i]) * amount) as Rgb);
}

export function readableInk(background: string): string {
  return contrast(background, WHITE) >= contrast(background, INK) ? WHITE : INK;
}

export function ensureContrast(
  color: string,
  against: string,
  min = 4.5,
): string {
  if (contrast(color, against) >= min) return color;
  const target = luminance(against) > 0.5 ? INK : WHITE;
  for (let step = 0.05; step <= 1; step += 0.05) {
    const candidate = mix(color, target, step);
    if (contrast(candidate, against) >= min) return candidate;
  }
  return target;
}

export function themeFromPalette(palette: Palette, ground = GROUND): Theme {
  const tint =
    palette.darkMuted ?? palette.darkVibrant ?? mix(palette.dominant, INK, 0.6);
  return {
    tint,
    tintInk: readableInk(tint),
    accent: ensureContrast(palette.vibrant ?? palette.dominant, ground, 3),
    wash:
      palette.lightMuted ??
      palette.lightVibrant ??
      mix(palette.dominant, WHITE, 0.7),
  };
}

export function themeStyle(theme: Theme): string {
  return `--tint:${theme.tint};--tint-ink:${theme.tintInk};--photo-accent:${theme.accent};--wash:${theme.wash};`;
}
