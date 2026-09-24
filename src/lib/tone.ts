import type { ImageMetadata } from 'astro';
import { measureBrightness } from '../integrations/photo-meta/core';

export const DEFAULT_DIM = 0.85;

export function dimFor(brightness: number | undefined): number {
  if (brightness === undefined) return DEFAULT_DIM;
  if (brightness <= 0.3) return 1;
  return Math.max(0.65, Math.round((1 - (brightness - 0.3)) * 100) / 100);
}

export function dimStyle(brightness: number | undefined): string {
  return `--dim:${dimFor(brightness)}`;
}

const cache = new Map<string, Promise<number | undefined>>();

export function imageBrightness(
  image: ImageMetadata,
): Promise<number | undefined> {
  // Astro exposes the source file of local images as a non-enumerable fsPath.
  const file = (image as ImageMetadata & { fsPath?: string }).fsPath;
  if (!file) return Promise.resolve(undefined);
  let pending = cache.get(file);
  if (!pending) {
    pending = measureBrightness(file).catch(() => undefined);
    cache.set(file, pending);
  }
  return pending;
}
