import { describe, expect, it } from 'vitest';
import {
  hasLocation,
  listAlbumPhotos,
} from '../src/integrations/photo-meta/core.ts';
import { photoSlug } from '../src/lib/photo-slug.ts';

describe('album photos', () => {
  it('carry no GPS location', async () => {
    const photos = await listAlbumPhotos(process.cwd());
    const located = [];
    for (const photo of photos) {
      if (await hasLocation(photo.file)) located.push(photo.id);
    }
    expect(located, 'run `npm run photos -- --clean`').toEqual([]);
  });

  it('have unique page slugs within their album', async () => {
    const photos = await listAlbumPhotos(process.cwd());
    const slugs = photos.map(photo => {
      const [album, file] = photo.id.split('/');
      return `${album}/${photoSlug(file)}`;
    });
    expect(slugs.length).toBe(new Set(slugs).size);
  });
});
