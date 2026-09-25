import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import rawMeta from '../generated/photo-meta.json';
import type { PhotoMeta } from '../integrations/photo-meta/core';
import { themeFromPalette, type Theme } from './color';
import { photoSlug } from './photo-slug';

export type { PhotoMeta };

export interface Photo {
  id: string;
  album: string;
  file: string;
  slug: string;
  href: string;
  image: ImageMetadata;
  meta: PhotoMeta;
  theme: Theme;
}

export type Album = CollectionEntry<'albums'> & { photos: Photo[] };

const images = import.meta.glob<ImageMetadata>(
  '/src/content/albums/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { eager: true, import: 'default' },
);

const meta = rawMeta as Record<string, PhotoMeta>;

const fallback: PhotoMeta = {
  width: 0,
  height: 0,
  brightness: 0.5,
  palette: {
    vibrant: null,
    muted: null,
    darkVibrant: null,
    darkMuted: null,
    lightVibrant: null,
    lightMuted: null,
    dominant: '#777777',
  },
  exif: {},
};

const byTakenAt = (a: Photo, b: Photo) =>
  (a.meta.exif.takenAt ?? a.file).localeCompare(b.meta.exif.takenAt ?? b.file);

function photosIn(album: string): Photo[] {
  const prefix = `/src/content/albums/${album}/`;
  return Object.entries(images)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, image]) => {
      const file = path.slice(prefix.length);
      const slug = photoSlug(file);
      const data = meta[`${album}/${file}`] ?? fallback;
      return {
        id: `${album}/${file}`,
        album,
        file,
        slug,
        href: `/photos/${album}/${slug}`,
        image,
        meta: data,
        theme: themeFromPalette(data.palette),
      };
    })
    .sort(byTakenAt);
}

export async function getAlbums(): Promise<Album[]> {
  const albums = await getCollection('albums');
  return albums
    .map(album => ({ ...album, photos: photosIn(album.id) }))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getAlbum(id: string): Promise<Album | undefined> {
  return (await getAlbums()).find(album => album.id === id);
}

export async function getHighlights(limit?: number): Promise<Photo[]> {
  const albums = (await getAlbums()).filter(album => album.data.featured);
  const lists = albums.map(album =>
    album.data.highlights
      .map(path => path.split('/').pop())
      .map(file => album.photos.find(photo => photo.file === file))
      .filter((photo): photo is Photo => photo !== undefined),
  );
  const mixed = interleave(lists);
  return limit ? mixed.slice(0, limit) : mixed;
}

function interleave<T>(lists: T[][]): T[] {
  const longest = Math.max(0, ...lists.map(list => list.length));
  return Array.from({ length: longest }, (_, i) => lists.map(list => list[i]))
    .flat()
    .filter((item): item is T => item !== undefined);
}

export function cameraLine(photo: Photo): string[] {
  const { camera, focalLength, aperture, shutter, iso } = photo.meta.exif;
  return [camera, focalLength, aperture, shutter, iso].filter(
    (value): value is string => Boolean(value),
  );
}

export function takenAt(photo: Photo): Date | undefined {
  const value = photo.meta.exif.takenAt;
  return value ? new Date(value) : undefined;
}
