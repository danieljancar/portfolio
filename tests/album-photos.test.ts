import { describe, expect, it } from 'vitest';
import {
  hasLocation,
  listAlbumPhotos,
} from '../src/integrations/photo-meta/core.ts';

describe('album photos', () => {
  it('carry no GPS location', async () => {
    const photos = await listAlbumPhotos(process.cwd());
    const located = [];
    for (const photo of photos) {
      if (await hasLocation(photo.file)) located.push(photo.id);
    }
    expect(located, 'run `npm run photos -- --clean`').toEqual([]);
  });
});
