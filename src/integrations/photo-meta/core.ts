import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import exifr from 'exifr';
import { Vibrant } from 'node-vibrant/node';
import sharp from 'sharp';
import YAML from 'yaml';

export const PHOTO_DIR = 'src/content/photos';
export const FILES_DIR = 'files';
export const OUTPUT_FILE = 'src/generated/photo-meta.json';

const CACHE_FILE = 'node_modules/.cache/photo-meta.json';
const CACHE_VERSION = 3;
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i;
const MAX_EDGE = 3000;

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
  imagePath: string;
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
  createStubs = true,
}: {
  root: string;
  logger?: Logger;
  createStubs?: boolean;
}): Promise<{ count: number; stubs: string[] }> {
  const photoDir = path.join(root, PHOTO_DIR);
  if (!existsSync(photoDir)) return { count: 0, stubs: [] };

  const entries = await readEntries(photoDir);
  const stubs = createStubs ? await writeMissingEntries(photoDir, entries) : [];
  if (stubs.length) {
    logger.info(`new photo entries: ${stubs.join(', ')}`);
    entries.push(...(await readEntries(photoDir, stubs)));
  }

  const cache = await readJson<Cache>(path.join(root, CACHE_FILE));
  const cached = cache?.version === CACHE_VERSION ? cache.files : {};
  const nextCache: Record<string, CacheEntry> = {};
  const meta: Record<string, PhotoMeta> = {};

  for (const entry of entries) {
    if (!existsSync(entry.imagePath)) {
      logger.warn(`photo ${entry.id}: image not found (${entry.imagePath})`);
      continue;
    }
    const { mtimeMs, size } = await stat(entry.imagePath);
    const key = path.relative(root, entry.imagePath);
    const hit = cached[key];
    const data =
      hit?.mtimeMs === mtimeMs && hit.size === size
        ? hit.data
        : await analyse(entry.imagePath);
    nextCache[key] = { mtimeMs, size, data };
    meta[entry.id] = data;
  }

  await writeJson(path.join(root, OUTPUT_FILE), meta);
  await writeJson(path.join(root, CACHE_FILE), {
    version: CACHE_VERSION,
    files: nextCache,
  });
  return { count: Object.keys(meta).length, stubs };
}

export async function shrinkOriginals(root: string): Promise<string[]> {
  const filesDir = path.join(root, PHOTO_DIR, FILES_DIR);
  const files = (await readdir(filesDir)).filter(f => IMAGE_EXT.test(f));
  const shrunk: string[] = [];
  for (const file of files) {
    const full = path.join(filesDir, file);
    const { width = 0, height = 0 } = await sharp(full).metadata();
    if (Math.max(width, height) <= MAX_EDGE) continue;
    const buffer = await sharp(full)
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside' })
      .keepExif()
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();
    await writeFile(full, buffer);
    shrunk.push(file);
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

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

async function readEntries(
  photoDir: string,
  only?: string[],
): Promise<Entry[]> {
  const names = only ?? (await readdir(photoDir));
  const entries: Entry[] = [];
  for (const name of names) {
    if (!/\.ya?ml$/.test(name)) continue;
    const doc = YAML.parse(await readFile(path.join(photoDir, name), 'utf8'));
    if (typeof doc?.image !== 'string') continue;
    entries.push({
      id: name.replace(/\.ya?ml$/, ''),
      imagePath: path.resolve(photoDir, doc.image),
    });
  }
  return entries;
}

async function writeMissingEntries(
  photoDir: string,
  entries: Entry[],
): Promise<string[]> {
  const filesDir = path.join(photoDir, FILES_DIR);
  if (!existsSync(filesDir)) return [];
  const known = new Set(entries.map(e => e.imagePath));
  const created: string[] = [];
  for (const file of (await readdir(filesDir)).sort()) {
    const imagePath = path.join(filesDir, file);
    if (!IMAGE_EXT.test(file) || known.has(imagePath)) continue;
    const name = `${slugify(file.replace(IMAGE_EXT, ''))}.yaml`;
    const target = path.join(photoDir, name);
    if (existsSync(target)) continue;
    const { takenAt } = await readExif(imagePath);
    const entry = {
      image: `./${FILES_DIR}/${file}`,
      alt: '',
      ...(takenAt && { date: takenAt.slice(0, 10) }),
      category: 'other',
      tags: [],
      featured: false,
    };
    await writeFile(target, YAML.stringify(entry));
    created.push(name);
  }
  return created;
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
