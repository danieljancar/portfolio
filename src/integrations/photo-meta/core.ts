import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import exifr from 'exifr';
import { Vibrant } from 'node-vibrant/node';
import sharp from 'sharp';

export const ALBUM_DIR = 'src/content/albums';
export const OUTPUT_FILE = 'src/generated/photo-meta.json';

const CACHE_FILE = 'node_modules/.cache/photo-meta.json';
const CACHE_VERSION = 4;
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i;
const MAX_EDGE = 2400;

export interface Exif {
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutter?: string;
  iso?: string;
  takenAt?: string;
}

export interface Palette {
  vibrant: string | null;
  muted: string | null;
  darkVibrant: string | null;
  darkMuted: string | null;
  lightVibrant: string | null;
  lightMuted: string | null;
  dominant: string;
}

export interface PhotoMeta {
  width: number;
  height: number;
  brightness: number;
  palette: Palette;
  exif: Exif;
}

interface Logger {
  info(message: string): void;
  warn(message: string): void;
}

interface Entry {
  id: string;
  file: string;
}

interface CacheEntry {
  mtimeMs: number;
  size: number;
  data: PhotoMeta;
}

interface Cache {
  version: number;
  files: Record<string, CacheEntry>;
}

export async function generatePhotoMeta({
  root,
  logger = console,
}: {
  root: string;
  logger?: Logger;
}): Promise<number> {
  const entries = await listPhotos(path.join(root, ALBUM_DIR));
  const cache = await readJson<Cache>(path.join(root, CACHE_FILE));
  const cached = cache?.version === CACHE_VERSION ? cache.files : {};
  const nextCache: Record<string, CacheEntry> = {};
  const meta: Record<string, PhotoMeta> = {};

  for (const { id, file } of entries) {
    try {
      const { mtimeMs, size } = await stat(file);
      const hit = cached[id];
      const data =
        hit?.mtimeMs === mtimeMs && hit.size === size
          ? hit.data
          : await analyse(file);
      nextCache[id] = { mtimeMs, size, data };
      meta[id] = data;
    } catch (error) {
      logger.warn(`could not read ${id}: ${String(error)}`);
    }
  }

  await writeJson(path.join(root, OUTPUT_FILE), meta);
  await writeJson(path.join(root, CACHE_FILE), {
    version: CACHE_VERSION,
    files: nextCache,
  });
  return entries.length;
}

export async function shrinkOriginals(root: string): Promise<string[]> {
  const shrunk: string[] = [];
  for (const { id, file } of await listPhotos(path.join(root, ALBUM_DIR))) {
    const { width = 0, height = 0 } = await sharp(file).metadata();
    if (Math.max(width, height) <= MAX_EDGE) continue;
    const buffer = await sharp(file)
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside' })
      .keepExif()
      .jpeg({ quality: 86, mozjpeg: true })
      .toBuffer();
    await writeFile(file, buffer);
    shrunk.push(id);
  }
  return shrunk;
}

export async function measureBrightness(
  input: Buffer | string,
): Promise<number> {
  const { channels } = await sharp(input)
    .resize(64, 64, { fit: 'inside' })
    .removeAlpha()
    .stats();
  const [r, g = r, b = r] = channels.map(c => c.mean / 255);
  return Math.round((0.2126 * r + 0.7152 * g + 0.0722 * b) * 1000) / 1000;
}

export function formatShutter(seconds: number): string {
  if (seconds >= 1) return `${Math.round(seconds * 10) / 10}s`;
  return `1/${Math.round(1 / seconds)}s`;
}

async function listPhotos(albumDir: string): Promise<Entry[]> {
  if (!existsSync(albumDir)) return [];
  const entries: Entry[] = [];
  for (const album of await readdir(albumDir, { withFileTypes: true })) {
    if (!album.isDirectory()) continue;
    const dir = path.join(albumDir, album.name);
    for (const name of (await readdir(dir)).sort()) {
      if (IMAGE_EXT.test(name)) {
        entries.push({
          id: `${album.name}/${name}`,
          file: path.join(dir, name),
        });
      }
    }
  }
  return entries;
}

async function analyse(file: string): Promise<PhotoMeta> {
  const {
    width = 0,
    height = 0,
    orientation = 1,
  } = await sharp(file).metadata();
  const small = await sharp(file)
    .rotate()
    .resize(200, 200, { fit: 'inside' })
    .png()
    .toBuffer();
  const palette = await Vibrant.from(small).getPalette();
  const swatch = (name: keyof typeof palette) => palette[name]?.hex ?? null;
  const dominant =
    Object.values(palette)
      .filter(s => s !== null)
      .sort((a, b) => b.population - a.population)[0]?.hex ?? '#777777';
  const rotated = orientation >= 5;
  return {
    width: rotated ? height : width,
    height: rotated ? width : height,
    brightness: await measureBrightness(small),
    palette: {
      vibrant: swatch('Vibrant'),
      muted: swatch('Muted'),
      darkVibrant: swatch('DarkVibrant'),
      darkMuted: swatch('DarkMuted'),
      lightVibrant: swatch('LightVibrant'),
      lightMuted: swatch('LightMuted'),
      dominant,
    },
    exif: await readExif(file),
  };
}

async function readExif(file: string): Promise<Exif> {
  const raw = await exifr
    .parse(file, {
      gps: false,
      pick: [
        'Make',
        'Model',
        'LensModel',
        'FNumber',
        'ExposureTime',
        'ISO',
        'FocalLength',
        'DateTimeOriginal',
      ],
    })
    .catch(() => undefined);
  if (!raw) return {};
  const camera = [raw.Make, raw.Model]
    .filter(Boolean)
    .join(' ')
    .replace(/^(\w+) \1/i, '$1')
    .trim();
  const exif: Exif = {
    camera: camera || undefined,
    lens: raw.LensModel,
    focalLength: raw.FocalLength && `${Math.round(raw.FocalLength)}mm`,
    aperture: raw.FNumber && `f/${raw.FNumber}`,
    shutter: raw.ExposureTime && formatShutter(raw.ExposureTime),
    iso: raw.ISO && `ISO ${raw.ISO}`,
    takenAt:
      raw.DateTimeOriginal instanceof Date
        ? raw.DateTimeOriginal.toISOString()
        : undefined,
  };
  return Object.fromEntries(Object.entries(exif).filter(([, v]) => v)) as Exif;
}

async function readJson<T>(file: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(file, 'utf8')) as T;
  } catch {
    return null;
  }
}

async function writeJson(file: string, data: unknown): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
}
