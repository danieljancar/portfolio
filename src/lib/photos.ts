import { getCollection, type CollectionEntry } from 'astro:content';
import rawMeta from '../generated/photo-meta.json';
import type { PhotoMeta } from '../integrations/photo-meta/core';
import { themeFromPalette, type Theme } from './color';

export type { PhotoMeta };

export type Photo = CollectionEntry<'photos'> & {
  meta: PhotoMeta;
  theme: Theme;
};

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

function withMeta(entry: CollectionEntry<'photos'>): Photo {
  const data = meta[entry.id] ?? fallback;
  return { ...entry, meta: data, theme: themeFromPalette(data.palette) };
}

function photoDate(photo: Photo): number {
  const taken = photo.meta.exif.takenAt
    ? Date.parse(photo.meta.exif.takenAt)
    : 0;
  return photo.data.date?.getTime() ?? taken;
}

export async function getPhotos(): Promise<Photo[]> {
  const entries = await getCollection('photos', ({ data }) => !data.hidden);
  return entries.map(withMeta).sort((a, b) => photoDate(b) - photoDate(a));
}

export async function getFeaturedPhotos(limit?: number): Promise<Photo[]> {
  const featured = (await getPhotos()).filter(p => p.data.featured);
  return limit ? featured.slice(0, limit) : featured;
}

export async function getPhotosForEvent(eventId: string): Promise<Photo[]> {
  return (await getPhotos()).filter(p => p.data.event?.id === eventId);
}

export function cameraLine(photo: Photo): string {
  const { focalLength, aperture, shutter, iso } = photo.meta.exif;
  return [focalLength, aperture, shutter, iso].filter(Boolean).join(' · ');
}

export function photoTitle(photo: Photo): string {
  return photo.data.title ?? photo.data.alt ?? 'Photo';
}
